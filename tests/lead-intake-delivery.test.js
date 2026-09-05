const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const filename = path.resolve(__dirname, '../netlify/functions/lead-intake.js');
const configured = { MAILCHIMP_API_KEY: 'test-us1', MAILCHIMP_BORROWER_LIST_ID: 'test-list', LOANOS_URL: 'https://loanos.example', LOANOS_AGENT_SECRET: 'test-only', N8N_WEB_LEAD_URL: 'https://automation.example' };

async function submit({ env = configured, failures = [], body = { email: 'fixture@example.com', first_name: 'Fixture' } } = {}) {
  const calls = [];
  const context = { exports: {}, require: createRequire(filename), process: { env }, Buffer, URLSearchParams,
    console: { warn() {}, error() {} },
    fetch: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return { ok: !failures.some(host => url.includes(host)), status: 503, json: async () => ({}) };
    },
  };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, { filename });
  const response = await context.exports.handler({ httpMethod: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return { ...response, result: JSON.parse(response.body), calls };
}

test('unconfigured capture paths cannot report a captured lead', async () => {
  const r = await submit({ env: { N8N_WEB_LEAD_URL: 'https://automation.example' } });
  assert.equal(r.statusCode, 502);
  assert.equal(r.result.captured, false);
  assert.equal(r.result.success, false);
  assert.equal(r.result.automationAccepted, true);
});
test('webhook acceptance cannot hide failure of both capture stores', async () => {
  const r = await submit({ failures: ['mailchimp.com', 'loanos.example'] });
  assert.equal(r.statusCode, 502);
  assert.equal(r.result.captured, false);
  assert.equal(r.result.ownerNotified, null);
});
test('capture without a notification handoff returns a failure for existing fallback handling', async () => {
  const r = await submit({ failures: ['automation.example'] });
  assert.equal(r.statusCode, 502);
  assert.equal(r.result.captured, true);
  assert.equal(r.result.automationAccepted, false);
});
test('a successful handoff does not claim downstream email delivery', async () => {
  const r = await submit();
  assert.equal(r.statusCode, 200);
  assert.equal(r.result.success, true);
  assert.equal(r.result.webLeadAutomation, 'accepted');
  assert.equal(r.result.ownerNotified, null);
});
for (const store of ['mailchimp.com', 'loanos.example']) test(`the other store protects the lead if ${store} fails`, async () => {
  const r = await submit({ failures: [store] });
  assert.equal(r.statusCode, 200);
  assert.equal(r.result.captured, true);
});
test('resubmission does not overwrite an existing Mailchimp unsubscribe', async () => {
  const r = await submit();
  const member = r.calls.find(c => c.url.includes('/members/') && !c.url.endsWith('/tags'));
  assert.equal(member.body.status_if_new, 'subscribed');
  assert.equal(Object.hasOwn(member.body, 'status'), false);
});
test('honeypot exits without calling any external service', async () => {
  const r = await submit({ body: { email: 'fixture@example.com', 'bot-field': 'filled' } });
  assert.equal(r.statusCode, 200);
  assert.equal(r.calls.length, 0);
});
