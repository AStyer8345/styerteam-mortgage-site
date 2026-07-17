import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { toolResultMessage } from '../../netlify/functions/mortgage-assistant.mts';

test('LoanOS failures never produce a success claim', () => {
  const message = toolResultMessage('create_or_update_website_lead', { ok: false, status: 'unavailable', error: { message: 'LoanOS is temporarily unavailable.' } });
  assert.equal(message, 'LoanOS is temporarily unavailable.');
  assert.doesNotMatch(message, /saved|notified|completed/i);
});

test('lead success reports notification failures honestly', () => {
  const message = toolResultMessage('create_or_update_website_lead', { ok: true, status: 'created', data: { ownerNotified: false } });
  assert.match(message, /notification could not be sent/i);
  assert.match(message, /call or text/i);
});

test('gateway has deterministic fallbacks for model failures', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  assert.match(gateway, /general_answer_fallback/);
  assert.match(gateway, /grounded_fallback_to_general/);
  assert.match(gateway, /final_safe_fallback/);
  assert.match(gateway, /response generation failed/);
});

test('gateway enforces persistent rate limiting and lead consent', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  assert.match(gateway, /checkPersistentRateLimit/);
  assert.match(gateway, /rate_limited/);
  assert.match(gateway, /consent_required/);
  assert.match(gateway, /consentAccepted !== true/);
});
