const test = require('node:test');
const assert = require('node:assert/strict');
const assistant = require('../api/mortgage-assistant');
const { createHandler } = require('../api/saved-analysis');
const { bridge } = require('../api/lib/netlify-bridge');

function mockResponse() {
  return {
    statusCode: 0,
    body: '',
    headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
    send(body) { this.body = body; return this; },
  };
}

test('mortgage assistant stays disabled', () => {
  const res = mockResponse();
  assistant({ method: 'GET' }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.enabled, false);
  assert.match(res.body.aiDisclosure, /Adam can verify your scenario/);

  const post = mockResponse();
  assistant({ method: 'POST' }, post);
  assert.equal(post.statusCode, 404);
  assert.equal(post.body.error.code, 'disabled');
  assert.equal(post.body.error.message, 'Assistant is not enabled.');
});

test('saved analysis keeps the private-link checks without calling a store service', async () => {
  const store = {
    async get() { return null; },
    async setJSON() {},
    async delete() {},
  };
  const missing = await createHandler(store)(new Request('https://styerteam.com/api/saved-analysis'));
  assert.equal(missing.status, 401);
  const token = 'a'.repeat(43);
  const saved = await createHandler(store)(new Request('https://styerteam.com/api/saved-analysis', {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ version: 1, iv: 'a'.repeat(16), ciphertext: 'b'.repeat(32) }),
  }));
  assert.equal(saved.status, 200);
  assert.equal((await saved.json()).saved, true);
});

test('the public function bridge drops the internal backup header', async () => {
  let seen;
  const res = mockResponse();
  await bridge(async (event) => {
    seen = event.headers['x-styer-internal-backup'];
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: '{"ok":true}' };
  }, {
    method: 'POST',
    url: '/api/lead-intake',
    headers: { host: 'styerteam.com', 'x-styer-internal-backup': '1', 'content-type': 'application/json' },
    body: '{}',
  }, res);
  assert.equal(seen, undefined);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body, '{"ok":true}');
});
