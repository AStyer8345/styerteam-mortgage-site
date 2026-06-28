const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const script = fs.readFileSync('script.js', 'utf8');
const thankYou = fs.readFileSync('thank-you.html', 'utf8');
const leadIntake = fs.readFileSync('netlify/functions/lead-intake.js', 'utf8');
const analytics = fs.readFileSync('analytics.js', 'utf8');
const generateRateUpdate = fs.readFileSync('netlify/functions/generate-rate-update.js', 'utf8');
const ratesJsonUpdater = fs.readFileSync('netlify/functions/lib/rates-json-updater.js', 'utf8');
const austinRates = fs.readFileSync('austin-mortgage-rates.html', 'utf8');
const homepage = fs.readFileSync('index.html', 'utf8');
const scenarioPage = fs.readFileSync('scenario.html', 'utf8');
const stylesheet = fs.readFileSync('style.css', 'utf8');

test('quick quote redirect does not put contact details in the URL', () => {
  assert.doesNotMatch(script, /tyParams\.set\('(email|name|phone)'/);
  assert.doesNotMatch(thankYou, /URLSearchParams\(window\.location\.search\)\.get\('(email|name|phone)'\)/);
});

test('lead forms only report success after a capture endpoint accepts the lead', () => {
  assert.match(script, /function hasSuccessfulCapture\(results\)/);
  assert.match(script, /if \(!hasSuccessfulCapture\(captureResults\)\)/);
  assert.match(script, /if \(!hasSuccessfulCapture\(quoteCaptureResults\)\)/);
});

test('legacy hero fallback does not bind modern quick-contact forms twice', () => {
  assert.match(script, /form\[data-netlify="true"\]:not\(\.js-quick-contact\)/);
});

test('homepage leads with lightweight scenario contact paths before the full application', () => {
  const heroCtas = homepage.match(/<div class="hero-ctas">([\s\S]*?)<\/div>/)?.[1] || '';
  const heroButtonLabels = Array.from(heroCtas.matchAll(/class="[^"]*\bhero-cta-btn\b[^"]*"[^>]*>([^<]+)<\/a>/g)).map((match) => match[1]);
  const introActions = homepage.match(/<div class="quick-contact-actions">([\s\S]*?)<\/div>/)?.[1] || '';
  const introActionLabels = Array.from(introActions.matchAll(/class="[^"]*\bbtn\b[^"]*"[^>]*>([^<]+)<\/a>/g)).map((match) => match[1]);

  assert.match(homepage, /<a href="#contact-form"[^>]*class="[^"]*\bbtn-primary\b[^"]*"[^>]*>Send Your Scenario<\/a>/);
  assert.deepEqual(heroButtonLabels, ['Send Your Scenario', 'Book 15-Min Call']);
  assert.deepEqual(introActionLabels, ['Send Your Scenario', 'Book 15-Min Call', 'Email Adam']);
  assert.match(homepage, /id="quick-scenario-form"/);
  assert.match(homepage, /name="quick-scenario"/);
  assert.match(homepage, /Tell me about the scenario/);
  assert.match(homepage, /Email Adam Instead/);
  assert.match(homepage, /Already talked with Adam or ready for the Secure Portal\?/);
  assert.match(homepage, /<a href="https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279"[^>]*target="_blank"[^>]*>Open Secure Portal<\/a>/);
  assert.doesNotMatch(homepage, /Start Full Loan Application/);
  assert.doesNotMatch(homepage, /Start Loan Application/);
  assert.doesNotMatch(homepage, /Start Here/);
  assert.match(homepage, /href="https:\/\/calendly\.com\/adamstyer\/15minutes"[^>]*>Book 15-Min Call<\/a>/);
  assert.match(homepage, /href="tel:\+15129566010"/);
  assert.match(homepage, /<footer[\s\S]*href="\/texas-complaint-notice\.html"[\s\S]*Texas Complaint Notice[\s\S]*<\/footer>/);
});

test('homepage keeps Adam cutout visible on desktop hero', () => {
  assert.match(homepage, /class="hero-cutout"/);
  assert.match(homepage, /assets\/adam-cutout\.webp/);
  assert.doesNotMatch(stylesheet, /@media\s*\(min-width:769px\)\s*\{\.hero-cutout\{display:none\}\}/);
});

test('scenario page uses portal language and keeps a short note fallback', () => {
  assert.match(scenarioPage, /Start Here/);
  assert.match(scenarioPage, /Start in the Secure Portal/);
  assert.match(scenarioPage, /https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279/);
  assert.match(scenarioPage, /id="scenario-note-form"/);
  assert.match(scenarioPage, /name="scenario-note"/);
  assert.match(scenarioPage, /Send the short version/);
  assert.match(scenarioPage, /Email Adam Instead/);
  assert.doesNotMatch(scenarioPage, /id="form-scenario"/);
  assert.doesNotMatch(scenarioPage, /Start Secure Loan Application/);
  assert.doesNotMatch(scenarioPage, /Start Your Loan Application/);
  assert.doesNotMatch(scenarioPage, /lead_type: 'scenario_review'/);
  assert.doesNotMatch(scenarioPage, /"@type": "FAQPage"/);
});

test('thank-you page lets GTM load the Google Ads library', () => {
  const adsLoaderMatches = thankYou.match(
    /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=AW-18028490942/g
  ) || [];

  assert.equal(adsLoaderMatches.length, 0);
});

test('thank-you page strips legacy contact parameters before GTM initializes', () => {
  const scrubIndex = thankYou.indexOf('strip legacy contact parameters');
  const gtmIndex = thankYou.indexOf('<!-- Google Tag Manager -->');

  assert.notEqual(scrubIndex, -1);
  assert.ok(scrubIndex < gtmIndex);
  assert.match(thankYou, /\['email', 'name', 'phone'\]/);
  assert.match(thankYou, /history\.replaceState/);
});

test('lead-intake restores the active web lead acknowledgment automation', () => {
  assert.match(leadIntake, /N8N_WEB_LEAD_URL/);
  assert.match(leadIntake, /styer\.app\.n8n\.cloud\/webhook\/web-lead/);
  assert.match(leadIntake, /notifyWebLeadAutomation/);
  assert.match(leadIntake, /form_name: p\.formName/);
  assert.match(leadIntake, /const data = \{/);
  assert.match(leadIntake, /\n\s+data,/);
  assert.doesNotMatch(leadIntake, /ftb-guide-email/);
});

test('analytics.js does not duplicate lead or phone events already emitted by script.js', () => {
  assert.doesNotMatch(analytics, /styer:lead-submitted/);
  assert.doesNotMatch(analytics, /phone_click/);
  assert.doesNotMatch(analytics, /a\[href\^="tel:"\]/);
});

test('direct rate publishing endpoint requires the dispatch secret', () => {
  assert.match(generateRateUpdate, /requireDispatchAuth\(event\)/);
  assert.match(generateRateUpdate, /DISPATCH_SECRET/);
  assert.match(generateRateUpdate, /Unauthorized/);
  assert.match(generateRateUpdate, /timingSafeEqual/);
  assert.match(generateRateUpdate, /Content-Type, Authorization/);
});

test('rate JSON updater refuses to stamp incomplete pasted rates as fresh', () => {
  assert.match(generateRateUpdate, /validateRequiredRates\(rates\)/);
  assert.match(ratesJsonUpdater, /missingKeys/);
  assert.match(ratesJsonUpdater, /missing required products/);
  assert.doesNotMatch(ratesJsonUpdater, /fall back to previous rates\.json/);
  assert.doesNotMatch(ratesJsonUpdater, /prev\.adam_rate \?\? null/);
});

test('Austin rates page handles stale public rate data honestly', () => {
  assert.match(austinRates, /"dateModified": "2026-05-31"/);
  assert.match(austinRates, /Austin Mortgage Rate Snapshot/);
  assert.match(austinRates, /Rate Δ/);
  assert.match(austinRates, /daysSince/);
  assert.match(austinRates, /Call for quote/);
  assert.match(austinRates, /Rate snapshot from/);
  assert.doesNotMatch(austinRates, /Today's Austin Mortgage Rates/);
  assert.doesNotMatch(austinRates, /delivered every Friday/);
});
