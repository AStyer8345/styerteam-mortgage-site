const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const pages = [
  '1099-only-mortgage-texas.html',
  'mortgage-for-business-owners-austin.html',
  'self-employed-mortgage-austin.html',
  'non-qm-loans.html',
  'high-net-worth-mortgage.html',
  'asset-depletion-mortgage-texas.html',
  'dscr-loan-austin-tx.html',
  'dscr-loans-dripping-springs.html',
  'dscr-loans-fredericksburg-tx.html',
  'dscr-loans-texas.html',
  'investor-loans.html',
  'k1-income-mortgage-austin.html',
  'one-time-close-construction-loan-texas.html',
  'p-and-l-mortgage-texas.html'
];

test('complex-income pages load the reusable modern program layout', () => {
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /<body class="editorial-page loan-page program-page-modern">/, file);
    assert.match(html, /\/js\/program-page-layout\.js\?v=20260830/, file);
    assert.match(html, /style\.css\?v=20260830-(?:program3|selfemp1)/, file);
  }
});

test('program layout uses accessible progressive disclosure', () => {
  const script = fs.readFileSync('js/program-page-layout.js', 'utf8');

  assert.match(script, /button\.setAttribute\('aria-expanded', 'false'\)/);
  assert.match(script, /button\.setAttribute\('aria-expanded', String\(!expanded\)\)/);
  assert.match(script, /View all FAQs/);
  assert.match(script, /View all related guides/);
  assert.match(script, /program-card-details/);
  assert.match(script, /program-section-details/);
});

test('every warm editorial hero uses a visible navy secondary action', () => {
  const stylesheet = fs.readFileSync('style.css', 'utf8');

  assert.match(stylesheet, /\.editorial-page\.loan-page:not\(\.bsl-page\) \.hero \.btn-hero-ghost,/);
  assert.match(stylesheet, /\.editorial-page\.location-page \.hero \.btn-hero-ghost,/);
  assert.match(stylesheet, /\.editorial-page\.trust-page \.hero \.btn-hero-ghost,/);
  assert.match(stylesheet, /\.editorial-page\.guide-page \.hero \.btn-hero-ghost\{color:#0d2342/);
  assert.match(stylesheet, /\.editorial-page\.loan-page:not\(\.bsl-page\) \.hero \.btn-hero-ghost:hover/);
  assert.match(stylesheet, /\.editorial-page\.guide-page \.hero \.btn-hero-ghost:focus-visible\{color:#fff/);
});

test('modern loan heroes keep scenario review primary and scheduling secondary', () => {
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    const primary = html.match(/<a[^>]+class="btn btn-primary hero-cta-primary hero-cta-btn"[^>]*>([^<]+)<\/a>/);
    const secondary = html.match(/<a[^>]+class="btn btn-hero-ghost hero-cta-btn"[^>]*>([^<]+)<\/a>/);
    assert.ok(primary, `${file} must have a primary hero CTA`);
    assert.ok(secondary, `${file} must have a secondary hero CTA`);
    assert.match(secondary[1], /Schedule Strategy Call/);
  }
});

test('self-employed program cards link to their full guides and use a scenario-first CTA', () => {
  const html = fs.readFileSync('self-employed-mortgage-austin.html', 'utf8');

  for (const href of [
    '/bank-statement-loans.html',
    '/1099-only-mortgage-texas.html',
    '/p-and-l-mortgage-texas.html',
    '/asset-depletion-mortgage-texas.html'
  ]) {
    assert.match(html, new RegExp(`<a class="feature-item program-link-card" href="${href.replaceAll('.', '\\.')}">`), href);
  }
  assert.match(html, /Not sure which income path fits\?/);
  assert.match(html, /<section class="section bg-light program-always-visible">/);
  assert.match(html, /href="\/get-preapproved\.html\?intent=scenario" class="btn btn-primary">Send My Scenario/);
  assert.doesNotMatch(html, /Get Your Self-Employed Rate Quote/);
  assert.doesNotMatch(html, /name="self-employed-quote"/);
  const script = fs.readFileSync('js/program-page-layout.js', 'utf8');
  assert.match(script, /container\.closest\('\.program-always-visible'\)/);
});
