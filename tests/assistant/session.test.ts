import assert from 'node:assert/strict';
import test from 'node:test';
import { createSessionToken, verifySessionToken } from '../../netlify/functions/_shared/session.ts';

test('session tokens are signed and expire', () => {
  const token = createSessionToken('secret', 'session-1', 1_000);
  assert.equal(verifySessionToken('secret', token, 2_000)?.id, 'session-1');
  assert.equal(verifySessionToken('wrong', token, 2_000), null);
  assert.equal(verifySessionToken('secret', token, 1_000 + 24 * 60 * 60_000 + 1), null);
});
