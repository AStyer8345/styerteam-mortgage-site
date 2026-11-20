const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const attributionScript = fs.readFileSync('assets/utm.js', 'utf8');
const journeys = fs.readFileSync('situation-journeys.js', 'utf8');
const middleware = fs.readFileSync('middleware.js', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const blocked = fs.readFileSync('api/lib/blocked-paths.json', 'utf8');

function memoryStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
  };
}

test('a prefilled page URL is replaced with the live page', () => {
  const field = { value: 'https://thestyerteam.com/bank-statement-loans.html' };
  const empty = { value: '' };
  const fields = new Map([
    ['cta_source_page', field],
    ['page_url', empty],
  ]);
  const document = {
    readyState: 'complete',
    referrer: 'https://www.google.com/search?q=private',
    querySelectorAll(selector) {
      const name = selector.match(/input\[name="([^"]+)"\]/)?.[1];
      if (name === 'cta_source_page') return [field];
      if (name && fields.has(name)) return [fields.get(name)];
      return [];
    },
    dispatchEvent() {},
  };
  const window = {
    location: new URL('https://styerteam.com/bank-statement-loans.html?utm_source=test'),
    sessionStorage: memoryStorage(),
    localStorage: memoryStorage(),
  };
  vm.runInNewContext(attributionScript, {
    window, document, URL, URLSearchParams, Date,
    CustomEvent: function CustomEvent(type, options) { return { type, ...options }; },
  });
  assert.equal(field.value, 'https://styerteam.com/bank-statement-loans.html');
});

test('journey source keeps a same-page fallback ahead of the referrer', () => {
  const fallback = journeys.indexOf('function pageUrlFallback');
  const reconcile = journeys.indexOf('function reconcileSource()');
  const use = journeys.indexOf('pageUrlFallback(form.elements.cta_source_page');
  const referrer = journeys.indexOf('cleanUrl(root.document.referrer)', use);
  assert.ok(fallback > 0 && reconcile > fallback);
  assert.ok(use > reconcile);
  assert.ok(referrer > use);
});

test('urlencoded POST / and POST /forms.html stay on the capture route', () => {
  const postAt = middleware.indexOf("request.method === 'POST' && type.includes('application/x-www-form-urlencoded')");
  const blockAt = middleware.indexOf("request.method !== 'POST' && blocked.has(url.pathname)");
  assert.ok(postAt > 0 && blockAt > postAt);
  assert.match(blocked, /\/forms\.html/);
  assert.match(script, /fetch\('\/'/);
  assert.match(script, /fetchWithTimeout\('\/forms\.html'/);
  assert.match(script, /function hasSuccessfulCapture\(results\)/);
  assert.match(script, /result\.value && result\.value\.ok/);
  assert.match(fs.readFileSync('situation-journeys.js', 'utf8'), /request\('\/'/);
  assert.match(fs.readFileSync('situation-journeys.js', 'utf8'), /receipt\.captured === true/);
});
