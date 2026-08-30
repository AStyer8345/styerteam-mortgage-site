import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

function listHtmlFiles(directory = '.'): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

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

test('the first recorded chat turn forwards its website source page to LoanOS', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  assert.match(gateway, /const sourcePage = boundedText\(body\.sourcePage, 500, false\) \|\| undefined/);
  assert.match(gateway, /policyOutcome, modelRequestId, sourcePage/);
  assert.match(gateway, /sequenceStart, sourcePage/);
});

test('assistant uses contextual conversion actions instead of an always-visible CTA bar', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  const resources = fs.readFileSync('netlify/functions/_shared/assistant-resources.ts', 'utf8');
  assert.doesNotMatch(browser, /class="ma-next-actions"/);
  assert.match(browser, /addContextActions/);
  assert.match(resources, /Start secure application/);
  assert.match(resources, /Compare current rate options/);
  assert.match(browser, /rel = 'noopener noreferrer'/);
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

test('review requests collect contact details before proposing a lead write', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  const widget = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(gateway, /collectContactDetails: true/);
  assert.match(gateway, /incomplete_lead_tool_blocked/);
  assert.match(widget, /data\.collectContactDetails === true/);
  assert.match(widget, /state\.salesState\.visitorName/);
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

test('the assistant panel is isolated from global section and header layout rules', () => {
  const styles = fs.readFileSync('assistant-widget.css', 'utf8');
  assert.match(styles, /\.ma-panel\{[^}]*padding:0/);
  assert.match(styles, /\.ma-header\{[^}]*position:static/);
  assert.match(styles, /\.ma-header\{[^}]*margin:0/);
  assert.match(styles, /\.ma-header\{[^}]*border:0/);
});

test('website pages use an approved cache-busted script loader', () => {
  const versions = listHtmlFiles().flatMap((file) =>
    Array.from(fs.readFileSync(file, 'utf8').matchAll(/script\.js\?v=([\w-]+)/g), (match) => match[1]),
  );
  assert.ok(versions.length > 0, 'at least one page must load the shared site script');
  assert.deepEqual(new Set(versions), new Set(['20260721-assistant-main-v1', '20260830-professional-v1']));
  for (const file of ['referral-partners-self-employed-clients.html', 'mortgage-strategies-financial-advisors-texas.html', 'mortgage-resources-for-cpas-texas.html', 'reverse-mortgage-financial-advisors-texas.html']) {
    assert.match(fs.readFileSync(file, 'utf8'), /script\.js\?v=20260830-professional-v1/, file);
  }
});

test('the widget shows an accessible animated typing indicator while requests are pending', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  const styles = fs.readFileSync('assistant-widget.css', 'utf8');
  assert.match(browser, /showTypingIndicator/);
  assert.match(browser, /hideTypingIndicator/);
  assert.match(browser, /Assistant is typing/);
  assert.match(browser, /index < 3/);
  assert.match(browser, /aria-hidden/);
  assert.match(browser, /if \(wrapper\.children\.length\) \{\s*ui\.messages\.appendChild\(wrapper\);\s*ui\.messages\.scrollTop = ui\.messages\.scrollHeight;\s*\}\s*\}\s*function showTypingIndicator/);
  assert.match(styles, /\.ma-typing-dot/);
  assert.match(styles, /@keyframes ma-typing-bounce/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
});

test('prior turns are redacted again before reaching the model', () => {
  const gateway = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  assert.match(gateway, /scanSensitiveInput\(turn\.text\)\.redacted/);
});

test('outcome-driven opening offers four strategy paths and no early name request', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  const sales = fs.readFileSync('netlify/functions/_shared/sales-conversation.ts', 'utf8');
  assert.match(browser, /Explore your mortgage options/);
  assert.match(browser, /Estimate payment and cash/);
  assert.match(browser, /See what may qualify/);
  assert.match(browser, /Explain my situation/);
  assert.match(browser, /Compare estimated pricing/);
  assert.doesNotMatch(sales, /Before we go further, what should I call you/);
});

test('market ranges and estimate assumptions remain server-side', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  const config = fs.readFileSync('netlify/functions/_shared/rate-market.ts', 'utf8');
  assert.match(config, /MORTGAGE_ASSISTANT_RATE_MARKET_JSON/);
  assert.match(config, /MORTGAGE_ASSISTANT_ESTIMATE_ASSUMPTIONS_JSON/);
  assert.doesNotMatch(browser, /MORTGAGE_ASSISTANT_RATE_MARKET_JSON|conventional30YearRange/);
});

test('lead form asks only for missing identity and contact details', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(browser, /First name/);
  assert.match(browser, /Preferred contact method/);
  assert.doesNotMatch(browser, /name="leadIntent"|name="timeline"|name="lastName"/);
  assert.match(browser, /salesState: state\.salesState/);
});

test('widget traps keyboard focus and restores launcher focus on close', () => {
  const browser = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(browser, /trapFocus/);
  assert.match(browser, /event\.key === 'Tab'/);
  assert.match(browser, /ui\.launcher\.focus\(\)/);
});
