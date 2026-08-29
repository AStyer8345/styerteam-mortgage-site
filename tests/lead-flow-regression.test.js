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
const nonQmPage = fs.readFileSync('non-qm-loans.html', 'utf8');
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

test('FAQ accordions toggle hidden panels open and closed', () => {
  assert.match(script, /nextElementSibling\.hidden = true/);
  assert.match(script, /nextElementSibling\.hidden = isActive/);
});

test('Non-QM quote form uses primary notification capture path', () => {
  assert.match(nonQmPage, /<form[^>]+name="non-qm-quote"[^>]+class="[^"]*\bjs-quick-contact\b[^"]*"/);
  assert.match(nonQmPage, /<input type="hidden" name="form-name" value="non-qm-quote">/);
  assert.match(nonQmPage, /\/script\.js\?v=20260721-assistant-main-v1/);
  assert.match(script, /'form-name': formData\.get\('form-name'\) \|\| form\.getAttribute\('name'\) \|\| ''/);
});

test('homepage prioritizes the secure application and preserves the scenario fallback', () => {
  const heroCtas = homepage.match(/<div class="hero-ctas">([\s\S]*?)<\/div>/)?.[1] || '';
  const heroButtonLabels = Array.from(heroCtas.matchAll(/class="[^"]*\bhero-cta-btn\b[^"]*"[^>]*>([^<]+)<\/a>/g)).map((match) => match[1]);
  const introActions = homepage.match(/<div id="quick-scenario-form" class="quick-contact-actions"[^>]*>([\s\S]*?)<\/div>/)?.[1] || '';
  const introActionLabels = Array.from(introActions.matchAll(/class="[^"]*\bbtn\b[^"]*"[^>]*>([^<]+)<\/a>/g)).map((match) => match[1]);

  assert.match(homepage, /data-track="secure_application_click"[^>]*>Start a Secure Loan Application<\/a>/);
  assert.match(homepage, /<a href="\/get-preapproved\.html\?intent=scenario"[^>]*>Send Your Scenario Instead<\/a>/);
  assert.deepEqual(heroButtonLabels, ['Start a Secure Loan Application', 'Send Your Scenario Instead']);
  assert.deepEqual(introActionLabels, ['Start Secure Application', 'Send Your Scenario']);
  assert.match(homepage, /id="quick-scenario-form"/);
  assert.doesNotMatch(homepage, /name="quick-scenario"/);
  assert.doesNotMatch(homepage, /Strong-fit scenarios can schedule immediately/);
  assert.doesNotMatch(homepage, /Book 15-Min Call/);
  assert.doesNotMatch(homepage, /Email Adam Instead/);
  assert.doesNotMatch(homepage, /Start Full Loan Application/);
  assert.doesNotMatch(homepage, /Start Loan Application/);
  assert.doesNotMatch(homepage, /Start Here/);
  assert.match(homepage, /Complex mortgage\. Clear path forward\./);
  assert.match(homepage, /Austin business owners · investors · move-up buyers/);
  assert.match(homepage, /href="tel:\+15129566010"/);
  assert.match(homepage, /<footer[\s\S]*href="\/texas-complaint-notice\.html"[\s\S]*Texas Complaint Notice[\s\S]*<\/footer>/);
});

test('homepage image-free hero avoids the oversized photo treatment', () => {
  const hero = homepage.match(/<section class="hero">([\s\S]*?)<\/section>/)?.[1] || '';
  assert.doesNotMatch(hero, /<picture|<img/);
  assert.match(homepage, /class="hero-glass-card home-hero-layout"/);
  assert.match(homepage, /\.home-pilot \.hero\{[^}]*background-image:none/);
});

test('scenario page uses portal language and keeps a short note fallback', () => {
  assert.match(scenarioPage, /Choose the easiest way to start/);
  assert.match(scenarioPage, /Send Your Scenario for a Structured Review/);
  assert.match(scenarioPage, /Answer a few questions in my secure online portal/);
  assert.match(scenarioPage, /Start a Secure Loan Application/);
  assert.match(scenarioPage, /usually takes 7-9 minutes/);
  assert.match(scenarioPage, /make our first call more efficient/);
  assert.match(scenarioPage, /https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279/);
  assert.match(scenarioPage, /get-preapproved\.html\?intent=scenario/);
  assert.doesNotMatch(scenarioPage, /id="scenario-note-form"/);
  assert.match(scenarioPage, /Email Adam Instead/);
  assert.doesNotMatch(scenarioPage, /id="form-scenario"/);
  assert.doesNotMatch(scenarioPage, /Start Secure Loan Application/);
  assert.doesNotMatch(scenarioPage, /Start Your Loan Application/);
  assert.doesNotMatch(scenarioPage, /Start the full application/);
  assert.doesNotMatch(scenarioPage, /lead_type: 'scenario_review'/);
  assert.doesNotMatch(scenarioPage, /"@type": "FAQPage"/);
});

test('thank-you page offers portal as an efficient next step without application-first wording', () => {
  assert.match(thankYou, /Answer a few questions in my secure online portal/);
  assert.match(thankYou, /usually takes 7-9 minutes/);
  assert.match(thankYou, /first call more efficient/);
  assert.match(thankYou, /https:\/\/hypersmart\.my1003app\.com\/513013\/register\?time=1779291829279/);
  assert.match(thankYou, /type === 'quick-contact'[\s\S]*ty-alt-paths/);
  assert.doesNotMatch(thankYou, /Start the full application/);
  assert.doesNotMatch(thankYou, /full 1003/);
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

test('required complex-mortgage routes and metadata exist', () => {
  const buyBeforeSell = fs.readFileSync('buy-before-you-sell-austin.html', 'utf8');
  const businessOwner = fs.readFileSync('resources/mortgage-options-for-business-owners.html', 'utf8');
  const realtor = fs.readFileSync('realtors.html', 'utf8');
  const notFound = fs.readFileSync('404.html', 'utf8');
  assert.match(buyBeforeSell, /<link rel="canonical" href="https:\/\/styermortgage\.com\/buy-before-you-sell-austin\.html">/);
  assert.match(buyBeforeSell, /Bridge financing/);
  assert.match(businessOwner, /"@type":"Article"/);
  assert.match(businessOwner, /Bank-statement programs/);
  assert.match(realtor, /name="realtor-scenario"/);
  assert.match(realtor, /netlify-honeypot="bot-field"/);
  assert.doesNotMatch(realtor, /license nationwide/i);
  assert.match(notFound, /<meta name="robots" content="noindex">/);
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
  assert.match(austinRates, /"dateModified": "2026-08-28"/);
  assert.match(austinRates, /Austin Mortgage Rate Snapshot/);
  assert.match(austinRates, /Rate Δ/);
  assert.match(austinRates, /daysSince/);
  assert.match(austinRates, /Call for quote/);
  assert.match(austinRates, /Rate snapshot from/);
  assert.doesNotMatch(austinRates, /Today's Austin Mortgage Rates/);
  assert.doesNotMatch(austinRates, /delivered every Friday/);
});
