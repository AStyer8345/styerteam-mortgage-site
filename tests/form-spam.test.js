const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { handleFormPost } = require('../api/lib/form-post');

const leadIntakePath = path.resolve(__dirname, '../netlify/functions/lead-intake.js');
const configured = {
  MAILCHIMP_API_KEY: 'test-us1',
  MAILCHIMP_BORROWER_LIST_ID: 'test-list',
  LOANOS_URL: 'https://loanos.example',
  LOANOS_AGENT_SECRET: 'test-only',
  N8N_WEB_LEAD_URL: 'https://automation.example',
};
const PASS_SECRET = '1x0000000000000000000000000000000AA';
const FAIL_SECRET = '2x0000000000000000000000000000000AA';
const PASS_TOKEN = 'always-pass-token';

function leadBody(extra = {}) {
  return {
    inquiry_id: 'fixture-inquiry-123',
    email: 'fixture@example.com',
    first_name: 'Fixture',
    form_rendered_at: String(Date.now() - 5000),
    ...extra,
  };
}

async function submitLead({ env = configured, body = leadBody(), fetchImpl } = {}) {
  const calls = [];
  const fetch = fetchImpl || (async (url, options) => {
    const raw = options && options.body;
    let parsed = raw;
    try { parsed = JSON.parse(raw); } catch { parsed = raw; }
    calls.push({ url: String(url), body: parsed });
    if (String(url).includes('challenges.cloudflare.com')) {
      const params = new URLSearchParams(raw);
      const ok = params.get('secret') === PASS_SECRET && params.get('response') === PASS_TOKEN;
      return { ok: true, status: 200, json: async () => ({ success: ok }) };
    }
    return {
      ok: true,
      status: 200,
      json: async () => ({ captured: true, inquiry_id: 'stored-inquiry-123', contact_id: 'contact-1', task_id: 'task-1' }),
    };
  });
  const context = {
    exports: {},
    require: createRequire(leadIntakePath),
    process: { env },
    Buffer,
    URLSearchParams,
    AbortSignal,
    console: { warn() {}, error() {} },
    fetch,
  };
  vm.runInNewContext(fs.readFileSync(leadIntakePath, 'utf8'), context, { filename: leadIntakePath });
  const response = await context.exports.handler({
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { statusCode: response.statusCode, result: JSON.parse(response.body), calls };
}

test('honeypot and a sub-3-second stamp return success without calling LoanOS', async () => {
  const honeypot = await submitLead({ body: leadBody({ 'bot-field': 'robot' }) });
  assert.equal(honeypot.statusCode, 200);
  assert.equal(honeypot.result.success, true);
  assert.equal(honeypot.result.captured, false);
  assert.equal(honeypot.calls.length, 0);

  const fast = await submitLead({ body: leadBody({ form_rendered_at: String(Date.now()) }) });
  assert.equal(fast.statusCode, 200);
  assert.equal(fast.result.captured, false);
  assert.equal(fast.calls.length, 0);
});

test('a missing render stamp still forwards when Turnstile is not configured', async () => {
  const body = leadBody();
  delete body.form_rendered_at;
  const result = await submitLead({ body });
  assert.equal(result.result.captured, true);
  assert.equal(result.calls.some((call) => call.url.includes('/api/intake/inquiries')), true);
});

test('Turnstile failure is a quiet drop and a pass forwards the token', async () => {
  const failed = await submitLead({
    env: { ...configured, TURNSTILE_SECRET_KEY: FAIL_SECRET },
    body: leadBody({ 'cf-turnstile-response': PASS_TOKEN }),
  });
  assert.equal(failed.statusCode, 200);
  assert.equal(failed.result.captured, false);
  assert.equal(failed.calls.some((call) => call.url.includes('loanos.example')), false);
  assert.equal(failed.calls.some((call) => call.url.includes('challenges.cloudflare.com')), true);

  const passed = await submitLead({
    env: { ...configured, TURNSTILE_SECRET_KEY: PASS_SECRET },
    body: leadBody({ 'cf-turnstile-response': PASS_TOKEN }),
  });
  assert.equal(passed.result.captured, true);
  const stored = passed.calls.find((call) => call.url.includes('/api/intake/inquiries'));
  assert.equal(stored.body['cf-turnstile-response'], PASS_TOKEN);

  const skipped = await submitLead({ body: leadBody({ 'cf-turnstile-response': PASS_TOKEN }) });
  const forwarded = skipped.calls.find((call) => call.url.includes('/api/intake/inquiries'));
  assert.equal(forwarded.body['cf-turnstile-response'], PASS_TOKEN);
  assert.equal(skipped.calls.some((call) => call.url.includes('challenges.cloudflare.com')), false);
});

test('the form backup drops a honeypot and a fast post before intake or the notification webhook', async () => {
  const calls = [];
  const honeypot = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'form-name=contact&email=person@example.com&bot-field=robot',
    url: 'https://styerteam.com/',
  }, {
    intake: async () => { throw new Error('should not run'); },
    webhook: 'https://notify.example/form',
    fetch: async () => { calls.push('fetch'); return { ok: true, json: async () => ({ success: true }) }; },
  });
  assert.equal(honeypot.status, 200);
  assert.equal(calls.length, 0);
  assert.equal((await honeypot.json()).captured, false);

  const fast = await handleFormPost({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `form-name=contact&email=person@example.com&form_rendered_at=${Date.now()}`,
    url: 'https://styerteam.com/',
  }, {
    intake: async () => { throw new Error('should not run'); },
    webhook: 'https://notify.example/form',
    fetch: async () => { calls.push('fetch'); return { ok: true, json: async () => ({ success: true }) }; },
  });
  assert.equal(fast.status, 200);
  assert.equal(calls.length, 0);
});

test('lead forms keep an off-screen honeypot and load the guard without a committed site key', () => {
  const guard = fs.readFileSync('js/form-guard.js', 'utf8');
  const config = fs.readFileSync('js/turnstile-config.js', 'utf8');
  assert.match(guard, /MIN_MS = 3000/);
  assert.match(guard, /interaction-only/);
  assert.match(guard, /size: showWidget \? 'flexible' : 'invisible'/);
  assert.match(config, /TURNSTILE_SITE_KEY/);
  assert.match(config, /TURNSTILE_SECRET_KEY/);
  assert.match(config, /"" \/\* turnstile-site-key \*\//);
  assert.doesNotMatch(config, /1x00000000000000000000AA/);
  assert.doesNotMatch(guard, /1x00000000000000000000AA" \/\* turnstile-site-key/);

  for (const file of ['contact.html', 'loans/fha.html', 'dscr-calculator.html', 'first-time-home-buyer.html', 'ftb-dpa-guide.html']) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /js\/form-guard\.js/, file);
    assert.match(html, /js\/turnstile-config\.js/, file);
    const forms = html.match(/<form\b[\s\S]*?<\/form>/gi) || [];
    const leads = forms.filter((form) => /type="email"|name="email"|type="tel"|name="phone"/.test(form));
    assert.ok(leads.length > 0, file);
    for (const form of leads) {
      assert.match(form, /class="styer-hp"/, file);
      assert.match(form, /aria-hidden="true"/, file);
      assert.match(form, /name="bot-field"/, file);
      assert.match(form, /tabindex="-1"/, file);
      assert.match(form, /autocomplete="off"/, file);
      assert.match(form, /left:-10000px/, file);
      const honeypot = form.match(/<p class="styer-hp"[\s\S]*?<\/p>/);
      assert.ok(honeypot, file);
      assert.doesNotMatch(honeypot[0], /\shidden=|display:\s*none/, file);
    }
  }
});
