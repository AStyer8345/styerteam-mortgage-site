const assert = require('node:assert/strict');
const test = require('node:test');
const { requireDispatchAuth } = require('../netlify/functions/lib/dispatch-auth');

test('content auth fails closed and accepts only the configured bearer', async () => {
  const previous = process.env.DISPATCH_SECRET;
  try {
    delete process.env.DISPATCH_SECRET;
    assert.equal(requireDispatchAuth({}).statusCode, 503);
    process.env.DISPATCH_SECRET = 'test-only-dispatch-key';
    for (const headers of [undefined, {}, { authorization: 'Bearer wrong' }, { authorization: 'Bearer test-only-dispatch-key-extra' }]) {
      assert.equal(requireDispatchAuth({ headers }).statusCode, 401);
    }
    assert.equal(requireDispatchAuth({ headers: { Authorization: 'Bearer test-only-dispatch-key' } }), null);
    for (const name of ['generate-newsletter', 'generate-realtor-content', 'generate-rate-update', 'send-correction', 'dispatch']) {
      const { handler } = require('../netlify/functions/' + name);
      // Malformed body would cause 500/provider work if auth were bypassed.
      const response = await handler({ httpMethod: 'POST', headers: {}, body: '{' });
      assert.equal(response.statusCode, 401, name);
      assert.equal((await handler({ httpMethod: 'GET', headers: {} })).statusCode, 405);
      assert.equal((await handler({ httpMethod: 'OPTIONS', headers: {} })).statusCode, 204);
    }
  } finally {
    if (previous === undefined) delete process.env.DISPATCH_SECRET;
    else process.env.DISPATCH_SECRET = previous;
  }
});
