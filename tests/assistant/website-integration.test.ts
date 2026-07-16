import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

test('assistant gateway is server-side and feature-gated', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  const openai = fs.readFileSync('netlify/functions/_shared/openai-responses.ts', 'utf8');
  const loanos = fs.readFileSync('netlify/functions/_shared/loanos-client.ts', 'utf8');
  assert.match(gateway, /MORTGAGE_ASSISTANT_ENABLED/);
  assert.match(openai, /OPENAI_API_KEY/);
  assert.match(loanos, /X-Vercel-Protection-Bypass/);
  assert.match(gateway, /scanSensitiveInput\(message\)/);
  assert.match(gateway, /retrieveApprovedKnowledge\(message\)/);
  assert.match(gateway, /confirmation_recorded/);
  assert.match(openai, /store: false/);
  assert.doesNotMatch(gateway, /Access-Control-Allow-Origin/);
});

test('browser code never contains privileged credential names', () => {
  const browser = fs.existsSync('assistant-widget.js') ? fs.readFileSync('assistant-widget.js', 'utf8') : '';
  assert.doesNotMatch(browser, /OPENAI_API_KEY|LOANOS_ASSISTANT_SIGNING_SECRET|LOANOS_ASSISTANT_BYPASS_TOKEN|SUPABASE_SERVICE/);
});
