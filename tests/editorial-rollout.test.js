const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const stylesheet = fs.readFileSync('style.css', 'utf8');
const publicPages = fs.readdirSync('.').filter((file) => file.endsWith('.html'));

test('editorial public pages load the current rollout stylesheet', () => {
  const editorialPages = publicPages.filter((file) =>
    /<body class="[^"]*\beditorial-page\b/.test(fs.readFileSync(file, 'utf8'))
  );

  assert.equal(editorialPages.length, 85);
  for (const file of editorialPages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(
      html,
      /(?:style\.css\?v=20260829-audit1|editorial-system\.css\?v=20260829-audit1)/,
      `${file} must load a cache-busted rollout stylesheet`
    );
  }
});

test('internal and noindex utility pages remain outside the editorial rollout', () => {
  for (const file of [
    '404.html',
    'dashboard.html',
    'forms.html',
    'ftb-dpa-guide.html',
    'loan-dashboard.html',
    'marketing-command-center.html',
    'marketing-content.html',
    'ops.html',
    'task-dashboard.html',
    'thank-you.html'
  ]) {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /\beditorial-page\b/, file);
  }
});

test('the shared stylesheet owns the approved public header treatment', () => {
  assert.match(stylesheet, /\.editorial-page>header\{background:#0d2342/);
  assert.match(stylesheet, /content:url\('\/assets\/logo-light\.svg'\)/);
  assert.match(stylesheet, /\.editorial-page>header \.nav-cta\{background:#d1b568/);
  assert.match(stylesheet, /\.editorial-page>header \.nav-links\.active\{background:#fff/);
});

test('wide guide tables use accessible horizontal scroll regions', () => {
  const guide = fs.readFileSync('how-to-buy-a-house-in-austin-tx.html', 'utf8');
  const regions = guide.match(/class="editorial-table-scroll" role="region"[^>]+tabindex="0"/g) || [];

  assert.equal(regions.length, 3);
  assert.match(stylesheet, /\.editorial-table-scroll\{max-width:100%;overflow-x:auto/);
});
