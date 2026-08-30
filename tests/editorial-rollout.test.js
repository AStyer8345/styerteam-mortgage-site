const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const stylesheet = fs.readFileSync('style.css', 'utf8');
function findHtmlFiles(directory = '.') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      return ['.git', '.netlify', 'node_modules'].includes(entry.name) ? [] : findHtmlFiles(file);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [file.replace(/^\.\//, '')] : [];
  });
}

const publicPages = findHtmlFiles();

test('editorial public pages load the current rollout stylesheet', () => {
  const editorialPages = publicPages.filter((file) =>
    /<body class="[^"]*\beditorial-page\b/.test(fs.readFileSync(file, 'utf8'))
  );

  assert.equal(editorialPages.length, 85);
  for (const file of editorialPages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(
      html,
      /(?:style\.css\?v=(?:20260829-audit1|20260830-cases1|20260830-program2)|editorial-system\.css\?v=20260829-audit1)/,
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

  assert.doesNotMatch(fs.readFileSync('loans/usda.html', 'utf8'), /\beditorial-page\b/);
});

test('every indexable nested loan page receives the header-only treatment', () => {
  for (const file of [
    'loans/construction.html',
    'loans/conventional.html',
    'loans/fha.html',
    'loans/investment.html',
    'loans/jumbo.html',
    'loans/refinance.html',
    'loans/va.html'
  ]) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /<body class="public-header-page legacy-loan-page">/, file);
    assert.match(html, /style\.css\?v=20260830-loanfix1/, file);
    assert.doesNotMatch(html, /\beditorial-page\b/, file);
  }
});

test('the shared stylesheet owns the approved public header treatment', () => {
  assert.match(stylesheet, /\.editorial-page>header\{background:#0d2342/);
  assert.match(stylesheet, /content:url\('\/assets\/logo-light\.svg'\)/);
  assert.match(stylesheet, /\.editorial-page>header \.nav-cta\{background:#d1b568/);
  assert.match(stylesheet, /\.editorial-page>header \.nav-links\.active\{background:#fff/);
  assert.match(stylesheet, /\.public-header-page>header\{background:#0d2342/);
  assert.match(stylesheet, /\.legacy-loan-page \.hero-two-col\{display:grid/);
});

test('wide guide tables use accessible horizontal scroll regions', () => {
  const guide = fs.readFileSync('how-to-buy-a-house-in-austin-tx.html', 'utf8');
  const regions = guide.match(/class="editorial-table-scroll" role="region"[^>]+tabindex="0"/g) || [];

  assert.equal(regions.length, 3);
  assert.match(stylesheet, /\.editorial-table-scroll\{max-width:100%;overflow-x:auto/);
});

test('homepage case studies align and expose the long third story on demand', () => {
  const homepage = fs.readFileSync('index.html', 'utf8');

  assert.equal((homepage.match(/class="card home-case-card/g) || []).length, 3);
  assert.match(homepage, /id="move-up-case-rest" class="home-case-rest" hidden/);
  assert.match(homepage, /class="home-case-continue" aria-expanded="false" aria-controls="move-up-case-rest">Continue/);
  assert.match(homepage, /button\.setAttribute\('aria-expanded', String\(!expanded\)\)/);
  assert.match(stylesheet, /\.home-case-card\{display:flex;flex-direction:column;width:100%\}/);
  assert.match(homepage, /classList\.toggle\('is-expanded', !expanded\)/);
});
