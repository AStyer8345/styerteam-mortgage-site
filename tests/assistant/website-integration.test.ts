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

test('assistant offers the approved secure application beside human follow-up', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(browser, /Have Adam contact me/);
  assert.match(browser, /Start my application/);
  assert.match(browser, /https:\/\/hypersmart\.my1003app\.com\/513013\/register/);
  assert.match(browser, /class="ma-application-link"/);
  assert.match(browser, /rel="noopener noreferrer"/);
});

test('assistant renders readable paragraphs, lists, and collapsible sources safely', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(browser, /appendFormattedAnswer/);
  assert.match(browser, /document\.createTextNode\(line\)/);
  assert.match(browser, /document\.createElement\('details'\)/);
  assert.doesNotMatch(browser, /innerHTML\s*=\s*text/);
});

test('assistant can recommend only approved website resources as safe links', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  const openai = fs.readFileSync('netlify/functions/_shared/openai-responses.ts', 'utf8');
  assert.match(openai, /recommended_resources/);
  assert.match(openai, /calculator-payment\.html/);
  assert.match(openai, /calculator-affordability\.html/);
  assert.match(openai, /calculator-refinance-breakeven\.html/);
  assert.match(browser, /data\.resources/);
  assert.match(browser, /approvedHost/);
});
