const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const redirects = fs.readFileSync('_redirects', 'utf8');
const analytics = fs.readFileSync('analytics.js', 'utf8');
const mainScript = fs.readFileSync('script.js', 'utf8');
const recentUpdatesGenerator = fs.readFileSync('scripts/gen-recent-updates.js', 'utf8');

test('canonical extensionless variants are force-redirected', () => {
  for (const path of ['/about', '/products', '/asset-depletion-mortgage-texas', '/one-time-close-construction-loan-texas', '/kyle-mortgage-lender']) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(redirects, new RegExp(`^${escaped}\\s+\\S+\\s+301!$`, 'm'));
  }
});

test('qualified conversion events use the shared measurement vocabulary', () => {
  assert.match(mainScript, /event: 'scenario_submit'/);
  assert.match(analytics, /book_call_click/);
  assert.match(analytics, /secure_application_click/);
  assert.match(analytics, /email_click/);
});

test('recent updates never promotes error or noindex pages', () => {
  assert.match(recentUpdatesGenerator, /"404\.html"/);
  assert.match(recentUpdatesGenerator, /isIndexable/);
  assert.match(recentUpdatesGenerator, /noindex/);
});

test('recent updates ignores bulk sitewide HTML rollouts', () => {
  assert.match(recentUpdatesGenerator, /MAX_HTML_FILES_PER_EDITORIAL_COMMIT/);
  assert.match(recentUpdatesGenerator, /htmlFiles\.length > MAX_HTML_FILES_PER_EDITORIAL_COMMIT/);
});
