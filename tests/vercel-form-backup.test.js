const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { handleFormPost } = require('../api/lib/form-post');

function intakeSpy() {
  const events = [];
  return {
    events,
    async intake(event) {
      events.push(event);
      const params = new URLSearchParams(event.body);
      if (!params.get('email')) return { statusCode: 400, body: JSON.stringify({ error: 'Valid email required' }) };
      return { statusCode: 200, body: JSON.stringify({ captured: true, inquiry_id: params.get('inquiry_id') }) };
    },
  };
}

test('parallel form backup stores the inquiry and notifies the form webhook', async () => {
  const spy = intakeSpy();
  const calls = [];
  const response = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'sec-fetch-mode': 'cors' },
    body: 'form-name=contact&email=person@example.com&inquiry_id=inquiry-123456&name=Pat',
    url: 'https://styerteam.com/',
  }, {
    intake: spy.intake,
    webhook: 'https://notify.example/form',
    fetch: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return { ok: true };
    },
  });
  assert.equal(response.status, 200);
  assert.equal(spy.events[0].headers['x-styer-internal-backup'], '1');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://notify.example/form');
  assert.equal(calls[0].body.form_name, 'contact');
  assert.equal(calls[0].body.data.email, 'person@example.com');
  assert.equal(calls[0].body.data['bot-field'], undefined);
});

test('a browser form post without a script still reaches intake and the thank-you page', async () => {
  const spy = intakeSpy();
  const response = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'sec-fetch-mode': 'navigate' },
    body: 'form-name=contact&email=person@example.com&name=Pat',
    url: 'https://styerteam.com/contact-thank-you.html',
  }, { intake: spy.intake, webhook: '' });
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/contact-thank-you.html');
  assert.equal(spy.events[0].headers['x-styer-internal-backup'], undefined);
  assert.match(new URLSearchParams(spy.events[0].body).get('inquiry_id'), /^formbackup-[a-f0-9]{24}$/);
});

test('honeypot and failed intake do not call a notification webhook', async () => {
  const calls = [];
  const fetch = async () => { calls.push('webhook'); return { ok: true }; };
  const honeypot = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'email=person@example.com&bot-field=robot',
    url: 'https://styerteam.com/',
  }, { intake: async () => { throw new Error('should not run'); }, webhook: 'https://notify.example/form', fetch });
  assert.equal(honeypot.status, 200);
  assert.equal(calls.length, 0);

  const rejected = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'form-name=contact&email=',
    url: 'https://styerteam.com/',
  }, {
    intake: async () => ({ statusCode: 400, body: JSON.stringify({ error: 'Valid email required' }) }),
    webhook: '',
    fetch,
  });
  assert.equal(rejected.status, 400);
});

test('a single name field is split the same way for the raw-form copy', async () => {
  const spy = intakeSpy();
  await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'sec-fetch-mode': 'cors' },
    body: 'form-name=contact&email=person@example.com&inquiry_id=inquiry-123456&name=Pat%20Lee',
    url: 'https://styerteam.com/',
  }, { intake: spy.intake, webhook: '' });
  const sent = new URLSearchParams(spy.events[0].body);
  assert.equal(sent.get('first_name'), 'Pat');
  assert.equal(sent.get('last_name'), 'Lee');
  assert.equal(sent.get('name'), 'Pat Lee');
});

test('lead-intake backup copy still dispatches the web-lead webhook', async () => {
  const filename = path.resolve('netlify/functions/lead-intake.js');
  const calls = [];
  const context = {
    exports: {},
    require: createRequire(filename),
    process: { env: { LOANOS_URL: 'https://loanos.example', LOANOS_AGENT_SECRET: 'test-only', N8N_WEB_LEAD_URL: 'https://automation.example' } },
    Buffer,
    URLSearchParams,
    AbortSignal,
    console: { warn() {}, error() {} },
    fetch: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return { ok: true, status: 200, json: async () => ({ captured: true, inquiry_id: 'stored-inquiry-123', contact_id: 'c', task_id: 't', duplicate: false }) };
    },
  };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, { filename });
  const response = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'sec-fetch-mode': 'cors' },
    body: 'form-name=contact&email=person@example.com&inquiry_id=inquiry-123456&name=Pat%20Lee',
    url: 'https://styerteam.com/',
  }, { intake: context.exports.handler, webhook: '' });
  const result = await response.json();
  assert.equal(response.status, 200);
  assert.equal(result.captured, true);
  assert.equal(result.webLeadAutomation, 'accepted');
  assert.equal(result.mailchimp, 'skipped-backup');
  const loanos = calls.find((call) => call.url === 'https://loanos.example/api/intake/inquiries');
  const webhook = calls.find((call) => call.url === 'https://automation.example');
  assert.equal(loanos.body.first_name, 'Pat');
  assert.equal(loanos.body.last_name, 'Lee');
  assert.deepEqual(webhook.body, { dispatch_inquiry_id: 'stored-inquiry-123' });
  assert.equal(webhook.optionsIgnored, undefined);
});

test('a sole follow-up post forwards to LoanOS and the web-lead auto-reply', async () => {
  const filename = path.resolve('netlify/functions/lead-intake.js');
  const calls = [];
  const context = {
    exports: {},
    require: createRequire(filename),
    process: { env: { LOANOS_URL: 'https://loanos.example', LOANOS_AGENT_SECRET: 'test-only', N8N_WEB_LEAD_URL: 'https://automation.example' } },
    Buffer,
    URLSearchParams,
    AbortSignal,
    console: { warn() {}, error() {} },
    fetch: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return { ok: true, status: 200, json: async () => ({ captured: true, inquiry_id: 'stored-inquiry-456', contact_id: 'c', task_id: 't', duplicate: false }) };
    },
  };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, { filename });
  const response = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'sec-fetch-mode': 'cors' },
    body: 'form-name=quick-quote-followup&email=person@example.com&name=Pat',
    url: 'https://styerteam.com/',
  }, { intake: context.exports.handler, webhook: '' });
  const result = await response.json();
  assert.equal(result.webLeadAutomation, 'accepted');
  assert.equal(calls.filter((call) => call.url === 'https://automation.example').length, 1);
  assert.deepEqual(calls.find((call) => call.url === 'https://automation.example').body, { dispatch_inquiry_id: 'stored-inquiry-456' });
  assert.equal(calls[0].url, 'https://loanos.example/api/intake/inquiries');
  assert.equal(response.status, 200);
});
