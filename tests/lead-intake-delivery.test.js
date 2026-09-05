const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const filename = path.resolve(__dirname, '../netlify/functions/lead-intake.js');
const configured = { MAILCHIMP_API_KEY: 'test-us1', MAILCHIMP_BORROWER_LIST_ID: 'test-list', LOANOS_URL: 'https://loanos.example', LOANOS_AGENT_SECRET: 'test-only', N8N_WEB_LEAD_URL: 'https://automation.example' };

async function submit({ env = configured, failures = [], body = { inquiry_id: 'fixture-inquiry-123', email: 'fixture@example.com', first_name: 'Fixture' } } = {}) {
  const calls = [];
  const context = { exports: {}, require: createRequire(filename), process: { env }, Buffer, URLSearchParams,
    console: { warn() {}, error() {} },
    fetch: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return { ok: !failures.some(host => url.includes(host)), status: 503, json: async () => ({ captured: true, inquiry_id: 'stored-inquiry-123', contact_id: 'contact-1', task_id: 'task-1' }) };
    },
  };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, { filename });
  const response = await context.exports.handler({ httpMethod: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return { ...response, result: JSON.parse(response.body), calls };
}

test('unconfigured durable capture cannot report success or notify', async () => {
  const r = await submit({ env: { N8N_WEB_LEAD_URL: 'https://automation.example' } });
  assert.equal(r.statusCode, 502); assert.equal(r.result.captured, false); assert.equal(r.calls.length, 0);
});
test('capture failure stops all downstream effects', async () => {
  const r = await submit({ failures: ['loanos.example'] });
  assert.equal(r.statusCode, 502); assert.equal(r.result.captured, false); assert.equal(r.calls.length, 1);
});
test('failed immediate dispatch leaves a captured, recoverable outbox', async () => {
  const r = await submit({ failures: ['automation.example'] });
  assert.equal(r.statusCode, 200); assert.equal(r.result.captured, true);
  assert.equal(r.result.automationAccepted, false); assert.equal(r.result.webLeadAutomation, 'pending-recovery');
});
test('handoff supplies one stored inquiry ID and never claims delivered email', async () => {
  const r = await submit(); assert.equal(r.statusCode, 200); assert.equal(r.result.ownerNotified, null);
  const dispatch = r.calls.filter(c=>c.url==='https://automation.example');
  assert.equal(dispatch.length, 1); assert.deepEqual(dispatch[0].body, {dispatch_inquiry_id:'stored-inquiry-123'});
});
test('marketing failure cannot erase the stored inquiry', async () => {
  const r = await submit({ failures: ['mailchimp.com'] });
  assert.equal(r.result.captured, true); assert.equal(r.result.mailchimp, 'failed');
});
test('internal tests skip every marketing request', async () => {
  const r = await submit({body:{inquiry_id:'internal-test-1234',email:'adam.styerassistant@gmail.com',test_mode:true}});
  assert.equal(r.result.mailchimp, 'skipped-test'); assert.equal(r.calls.some(c=>c.url.includes('mailchimp.com')),false);
});
test('test mode cannot target a borrower', async () => {
  const r = await submit({body:{inquiry_id:'internal-test-1234',email:'borrower@example.com',test_mode:true}});
  assert.equal(r.statusCode,400); assert.equal(r.calls.length,0);
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
