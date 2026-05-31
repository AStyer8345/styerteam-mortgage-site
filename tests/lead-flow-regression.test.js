const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const script = fs.readFileSync('script.js', 'utf8');
const thankYou = fs.readFileSync('thank-you.html', 'utf8');

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
