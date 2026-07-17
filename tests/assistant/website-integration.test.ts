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
  assert.match(gateway, /buildContextualQuery\(message, priorTurns\)/);
  assert.match(gateway, /retrieveApprovedKnowledge\(contextualQuery\)/);
  assert.match(gateway, /confirmation_recorded/);
  assert.match(openai, /store: false/);
  assert.doesNotMatch(gateway, /Access-Control-Allow-Origin/);
});

test('browser code never contains privileged credential names', () => {
  const browser = fs.existsSync('assistant-widget.js') ? fs.readFileSync('assistant-widget.js', 'utf8') : '';
  assert.doesNotMatch(browser, /OPENAI_API_KEY|LOANOS_ASSISTANT_SIGNING_SECRET|LOANOS_ASSISTANT_BYPASS_TOKEN|SUPABASE_SERVICE/);
});

test('confirmed chatbot leads report LoanOS notification and acknowledgment failures', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  assert.match(gateway, /ownerNotified/);
  assert.match(gateway, /visitorAcknowledged/);
  assert.match(gateway, /email notification could not be sent/);
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
  const resources = fs.readFileSync('netlify/functions/_shared/assistant-resources.ts', 'utf8');
  assert.match(openai, /recommended_resources/);
  assert.match(openai, /suggested_replies/);
  assert.match(openai, /CURRENT CONVERSATION STATE/);
  assert.match(browser, /salesState/);
  assert.match(resources, /calculator-payment\.html/);
  assert.match(resources, /calculator-affordability\.html/);
  assert.match(resources, /calculator-refinance-breakeven\.html/);
  assert.match(browser, /data\.resources/);
  assert.match(browser, /approvedHost/);
});

test('assistant permits the approved Calendly scheduling link', () => {
  const widget = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(widget, /calendly\.com/);
});

test('transcript sequencing uses the widget turn count end to end', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  assert.match(browser, /turnCount: priorTurnCount/);
  assert.match(browser, /turnCount: state\.turnCount/);
  assert.match(gateway, /computeSequenceStart\(body\.turnCount/);
  assert.doesNotMatch(gateway, /priorTurnCount \* 2/);
});

test('conversations persist across page navigation in the same tab', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(browser, /sessionStorage\.getItem/);
  assert.match(browser, /sessionStorage\.setItem/);
  assert.match(browser, /loadStoredConversation/);
});

test('the widget loader and stylesheet share one cache-busting version', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  const site = fs.readFileSync('script.js', 'utf8');
  const cssVersion = browser.match(/assistant-widget\.css\?v=([\w-]+)/);
  const jsVersion = site.match(/assistant-widget\.js\?v=([\w-]+)/);
  assert.ok(cssVersion && jsVersion, 'both asset references must be versioned');
  assert.equal(cssVersion![1], jsVersion![1]);
});

test('prior turns are redacted again before reaching the model', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  assert.match(gateway, /scanSensitiveInput\(turn\.text\)\.redacted/);
});
