const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const stylesheet = fs.readFileSync('style.css', 'utf8');
function findHtmlFiles(directory = '.') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      return ['.git', '.netlify', '.site-dist', 'node_modules'].includes(entry.name) ? [] : findHtmlFiles(file);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [file.replace(/^\.\//, '')] : [];
  });
}

const publicPages = findHtmlFiles();

test('editorial public pages load the current rollout stylesheet', () => {
  const editorialPages = publicPages.filter((file) =>
    /<body class="[^"]*\beditorial-page\b/.test(fs.readFileSync(file, 'utf8'))
  );

  assert.equal(editorialPages.length, 96);
  for (const file of editorialPages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(
      html,
      /(?:style\.css\?v=(?:20260830-cta1|20260830-reviews1|20260830-program3|20260830-selfemp1|20260830-lp2)|editorial-system\.css\?v=20260829-audit1)/,
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

test('every indexable nested loan page retains its public header and loan identity', () => {
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
    const classes = new Set(html.match(/<body[^>]*class="([^"]*)"/)[1].split(/\s+/));
    for (const name of ['public-header-page', 'legacy-loan-page']) assert.ok(classes.has(name), `${file}: ${name}`);
    assert.match(html, /style\.css\?v=20260830-loanfix1/, file);
    assert.doesNotMatch(html, /\beditorial-page\b/, file);
  }
});

test('the shared stylesheet owns the approved public header treatment', () => {
  assert.match(stylesheet, /\.editorial-page>header:where\(body > header\)\{background:#0d2342/);
  assert.match(stylesheet, /content:url\('\/assets\/logo-light\.svg'\)/);
  assert.match(stylesheet, /\.editorial-page>header:where\(body > header\) \.nav-cta\{background:#d1b568/);
  assert.match(stylesheet, /\.editorial-page>header:where\(body > header\) \.nav-links\.active\{background:#fff/);
  assert.match(stylesheet, /\.public-header-page>header:where\(body > header\)\{background:#0d2342/);
  assert.match(stylesheet, /\.legacy-loan-page \.hero-two-col\{display:grid/);
});

test('wide guide tables use accessible horizontal scroll regions', () => {
  const guide = fs.readFileSync('how-to-buy-a-house-in-austin-tx.html', 'utf8');
  const regions = guide.match(/class="editorial-table-scroll" role="region"[^>]+tabindex="0"/g) || [];

  assert.equal(regions.length, 3);
  assert.match(stylesheet, /\.editorial-table-scroll\{max-width:100%;overflow-x:auto/);
});

test('homepage planning examples preserve paths to specialist financing', () => {
  const homepage = fs.readFileSync('index.html', 'utf8');
  assert.match(homepage, /id="case-studies"/);
  for (const target of ['mortgage-for-business-owners-austin.html', 'high-net-worth-mortgage.html', 'buy-before-you-sell-austin.html']) assert.ok(homepage.includes(target));
  assert.doesNotMatch(homepage, /Deals Banks Said No To|3 banks declined|Closed at a rate within/);
});

test('homepage reviews move directly below case studies with compact spacing', () => {
  const homepage = fs.readFileSync('index.html', 'utf8');

  assert.match(homepage, /id="case-studies"/);
  assert.match(homepage, /class="home-reviews-section" id="client-reviews"/);
  assert.match(homepage, /caseStudies\.insertAdjacentElement\('afterend', reviews\)/);
  assert.match(stylesheet, /\.home-pilot \.home-reviews-section\{padding:clamp\(3rem,4\.5vw,4\.5rem\) 0\}/);
});
