const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const pages = [
  'mortgage-for-business-owners-austin.html',
  'self-employed-mortgage-austin.html',
  'non-qm-loans.html',
  'high-net-worth-mortgage.html',
  'asset-depletion-mortgage-texas.html'
];

test('complex-income pages load the reusable modern program layout', () => {
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /<body class="editorial-page loan-page program-page-modern">/, file);
    assert.match(html, /\/js\/program-page-layout\.js\?v=20260830/, file);
    assert.match(html, /style\.css\?v=20260830-program1/, file);
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
