const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { handleFormPost } = require('../api/lib/form-post');

const leadIntakePath = path.resolve(__dirname, '../netlify/functions/lead-intake.js');
const liveEnv = {
  MAILCHIMP_API_KEY: 'test-us1',
  MAILCHIMP_BORROWER_LIST_ID: 'test-list',
  LOANOS_URL: 'https://loanos.example',
  LOANOS_AGENT_SECRET: 'test-only',
  N8N_WEB_LEAD_URL: 'https://automation.example',
  N8N_SEND_TEST_LEADS: 'true',
};

function runLeadIntake(env, body) {
  const calls = [];
  const context = {
    exports: {},
    require: createRequire(leadIntakePath),
    process: { env },
    Buffer,
    URLSearchParams,
    AbortSignal,
    console: { warn() {}, error() {} },
    fetch: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return {
        ok: true,
        status: 200,
        json: async () => ({ captured: true, inquiry_id: 'stored-inquiry-123', contact_id: 'contact-1', task_id: 'task-1' }),
      };
    },
  };
  vm.runInNewContext(fs.readFileSync(leadIntakePath, 'utf8'), context, { filename: leadIntakePath });
  return context.exports.handler({
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => ({ ...response, result: JSON.parse(response.body), calls }));
}

const borrower = {
  inquiry_id: 'fixture-inquiry-123',
  email: 'borrower@example.com',
  first_name: 'Pat',
  last_name: 'Lee',
  marketing_opt_in: true,
};

test('production Vercel still sends live leads, Mailchimp, and the n8n webhook', async () => {
  const r = await runLeadIntake({ ...liveEnv, VERCEL_ENV: 'production' }, borrower);
  assert.equal(r.statusCode, 200);
  assert.equal(r.result.mailchimp, 'ok');
  assert.equal(r.result.webLeadAutomation, 'accepted');
  const loanos = r.calls.find((call) => call.url.includes('/api/intake/inquiries'));
  assert.equal(loanos.body.test_mode, false);
  assert.equal(r.calls.filter((call) => call.url === 'https://automation.example').length, 1);
  assert.equal(r.calls.some((call) => call.url.includes('mailchimp.com')), true);
});

test('a non-production Vercel deploy forces test mode and skips Mailchimp and n8n', async () => {
  const r = await runLeadIntake({ ...liveEnv, VERCEL_ENV: 'preview' }, borrower);
  assert.equal(r.statusCode, 200);
  assert.equal(r.result.mailchimp, 'skipped-test');
  assert.equal(r.result.webLeadAutomation, 'skipped-test');
  const loanos = r.calls.find((call) => call.url.includes('/api/intake/inquiries'));
  assert.equal(loanos.body.test_mode, true);
  assert.equal(r.calls.some((call) => call.url === 'https://automation.example'), false);
  assert.equal(r.calls.some((call) => call.url.includes('mailchimp.com')), false);
});

test('ALLOW_PREVIEW_LIVE_LEADS restores live delivery on a preview deploy', async () => {
  const r = await runLeadIntake({ ...liveEnv, VERCEL_ENV: 'preview', ALLOW_PREVIEW_LIVE_LEADS: 'true' }, borrower);
  assert.equal(r.result.mailchimp, 'ok');
  assert.equal(r.result.webLeadAutomation, 'accepted');
  const loanos = r.calls.find((call) => call.url.includes('/api/intake/inquiries'));
  assert.equal(loanos.body.test_mode, false);
  assert.equal(r.calls.filter((call) => call.url === 'https://automation.example').length, 1);
});

test('an unset VERCEL_ENV keeps the live Netlify path', async () => {
  const r = await runLeadIntake(liveEnv, borrower);
  assert.equal(r.result.webLeadAutomation, 'accepted');
  const loanos = r.calls.find((call) => call.url.includes('/api/intake/inquiries'));
  assert.equal(loanos.body.test_mode, false);
  assert.equal(r.calls.some((call) => call.url.includes('mailchimp.com')), true);
});

function withEnv(values, fn) {
  const previous = {};
  for (const key of Object.keys(values)) previous[key] = process.env[key];
  Object.assign(process.env, values);
  return Promise.resolve()
    .then(fn)
    .finally(() => {
      for (const [key, value] of Object.entries(previous)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    });
}

test('preview form posts are marked test mode and do not call the notification webhook', async () => {
  await withEnv({ VERCEL_ENV: 'preview', ALLOW_PREVIEW_LIVE_LEADS: undefined }, async () => {
    delete process.env.ALLOW_PREVIEW_LIVE_LEADS;
    const events = [];
    const calls = [];
    const response = await handleFormPost({
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', 'sec-fetch-mode': 'cors' },
      body: 'form-name=contact&email=person@example.com&inquiry_id=inquiry-123456&name=Pat',
      url: 'https://styerteam.com/',
    }, {
      intake(event) {
        events.push(event);
        return { statusCode: 200, body: JSON.stringify({ captured: true, inquiry_id: 'inquiry-123456' }) };
      },
      webhook: 'https://notify.example/form',
      fetch: async (url) => {
        calls.push(url);
        return { ok: true };
      },
    });
    assert.equal(response.status, 200);
    assert.equal(new URLSearchParams(events[0].body).get('test_mode'), 'true');
    assert.equal(calls.length, 0);
  });
});

test('production form posts keep live notification delivery', async () => {
  await withEnv({ VERCEL_ENV: 'production' }, async () => {
    const events = [];
    const calls = [];
    const response = await handleFormPost({
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', 'sec-fetch-mode': 'cors' },
      body: 'form-name=contact&email=person@example.com&inquiry_id=inquiry-123456&name=Pat',
      url: 'https://styerteam.com/',
    }, {
      intake(event) {
        events.push(event);
        return { statusCode: 200, body: JSON.stringify({ captured: true, inquiry_id: 'inquiry-123456' }) };
      },
      webhook: 'https://notify.example/form',
      fetch: async (url) => {
        calls.push(url);
        return { ok: true };
      },
    });
    assert.equal(response.status, 200);
    assert.equal(new URLSearchParams(events[0].body).get('test_mode'), null);
    assert.deepEqual(calls, ['https://notify.example/form']);
  });
});
