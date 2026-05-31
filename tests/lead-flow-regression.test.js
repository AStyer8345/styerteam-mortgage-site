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
