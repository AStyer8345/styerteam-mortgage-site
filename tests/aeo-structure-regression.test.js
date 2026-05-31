const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const redirects = fs.readFileSync('_redirects', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const housingMarket = fs.readFileSync('austin-housing-market.html', 'utf8');
const dpaGuide = fs.readFileSync('ftb-dpa-guide.html', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');

test('thin AEO overlap pages redirect into canonical hubs', () => {
  assert.match(redirects, /\/bank-statement-loans-austin-tx\s+\/bank-statement-loans\.html\s+301!/);
  assert.match(redirects, /\/bank-statement-loans-austin-tx\.html\s+\/bank-statement-loans\.html\s+301!/);
  assert.match(redirects, /\/non-qm-loans-self-employed-austin\s+\/non-qm-loans\.html\s+301!/);
  assert.match(redirects, /\/non-qm-loans-self-employed-austin\.html\s+\/non-qm-loans\.html\s+301!/);
});

test('legacy buyer and housing URLs are removed from sitemap', () => {
  assert.doesNotMatch(sitemap, /bank-statement-loans-austin-tx\.html/);
  assert.doesNotMatch(sitemap, /non-qm-loans-self-employed-austin\.html/);
  assert.doesNotMatch(sitemap, /first-time-buyer-guide\.html/);
  assert.doesNotMatch(sitemap, /austin-housing-market-2025\.html/);
  assert.match(sitemap, /austin-housing-market\.html/);
  assert.match(sitemap, /resources\/first-time-buyer-guide\//);
});

test('rolling Austin housing market page self-canonicalizes', () => {
  assert.match(housingMarket, /<link rel="canonical" href="https:\/\/styermortgage\.com\/austin-housing-market\.html">/);
  assert.match(housingMarket, /"url": "https:\/\/styermortgage\.com\/austin-housing-market\.html"/);
  assert.doesNotMatch(housingMarket, /austin-housing-market-2025/);
});

test('paid DPA guide is isolated from organic indexation', () => {
  assert.match(dpaGuide, /<meta name="robots" content="noindex, follow">/);
});

test('llms.txt exposes canonical answer-engine paths', () => {
  assert.match(llms, /Adam Styer Mortgage/);
  assert.match(llms, /mortgage-for-business-owners-austin\.html/);
  assert.match(llms, /non-qm-loans\.html/);
  assert.match(llms, /bank-statement-loans\.html/);
  assert.match(llms, /dscr-loan-austin-tx\.html/);
  assert.match(llms, /resources\/first-time-buyer-guide\//);
  assert.doesNotMatch(llms, /ftb-dpa-guide/);
});
