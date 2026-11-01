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

test('version endpoint reports only the public deploy fields', () => {
  const keys = ['VERCEL_GIT_COMMIT_SHA', 'VERCEL_GIT_COMMIT_REF', 'VERCEL_DEPLOYMENT_ID', 'VERCEL_ENV', 'MCC_PASS'];
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  process.env.VERCEL_GIT_COMMIT_SHA = 'abc123';
  process.env.VERCEL_GIT_COMMIT_REF = 'preview/claims-docpaths-source-2026-10-28';
  process.env.VERCEL_DEPLOYMENT_ID = 'dpl_test';
  process.env.VERCEL_ENV = 'preview';
  process.env.MCC_PASS = 'do-not-leak';
  try {
    const version = require('../api/version');
    const res = mockResponse();
    version({ method: 'GET' }, res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.headers['Cache-Control'], 'no-store');
    assert.equal(res.headers['Content-Type'], 'application/json; charset=utf-8');
    assert.equal(res.body.commit, 'abc123');
    assert.equal(res.body.ref, 'preview/claims-docpaths-source-2026-10-28');
    assert.equal(res.body.deploymentId, 'dpl_test');
    assert.equal(res.body.env, 'preview');
    assert.match(res.body.builtAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    assert.deepEqual(Object.keys(res.body).sort(), ['builtAt', 'commit', 'deploymentId', 'env', 'ref']);
    assert.equal(JSON.stringify(res.body).includes('do-not-leak'), false);

    delete process.env.VERCEL_DEPLOYMENT_ID;
    const missing = mockResponse();
    version({ method: 'GET' }, missing);
    assert.equal(missing.body.deploymentId, null);
    assert.equal(missing.body.commit, 'abc123');

    const denied = mockResponse();
    version({ method: 'POST' }, denied);
    assert.equal(denied.statusCode, 405);
    assert.equal(denied.headers.Allow, 'GET, HEAD');
  } finally {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
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
