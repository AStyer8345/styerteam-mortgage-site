const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

function readPage(file) {
  return fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
}

test('Austin market pages use the complete July 2026 Unlock MLS snapshot', () => {
  const market = readPage('austin-housing-market.html');
  const dscr = readPage('dscr-loan-austin-tx.html');
  const assetDepletion = readPage('asset-depletion-mortgage-texas.html');

  for (const value of ['$435,000', '2,739', '13,796', '4.7 months']) {
    assert.match(market, new RegExp(value.replace('$', '\\$')));
    assert.match(dscr, new RegExp(value.replace('$', '\\$')));
  }

  for (const page of [market, dscr, assetDepletion]) {
    assert.match(page, /july-2026-central-texas-housing-report/);
    assert.doesNotMatch(page, /June 2026/);
  }
});

test('priority pages keep approved conditional product language', () => {
  const pages = [
    'austin-mortgage-rates.html',
    'self-employed-mortgage-austin.html',
    'asset-depletion-mortgage-texas.html',
    'dscr-loan-austin-tx.html',
    'one-time-close-construction-loan-texas.html',
    'loans/construction.html',
    'mortgage-for-business-owners-austin.html',
  ].map(readPage);

  const retiredClaims = [
    /skips your personal income entirely/i,
    /DSCR rates typically run 0\.75–1\.5%/i,
    /Non-QM asset depletion \(60–84 mo\)/i,
    /Virtually all non-QM asset depletion programs/i,
    /Single closing, one rate lock/i,
    /clean approval/i,
    /Jumbo OTC programs cover \$1M–\$5M\+/i,
    /10% down is achievable on bank statement loans/i,
    /rates run 0\.50%–1\.50% above conventional/i,
  ];

  for (const source of pages) {
    for (const claim of retiredClaims) {
      assert.doesNotMatch(source, claim);
    }
  }
});

test('asset-depletion page cites current agency calculation sources', () => {
  const source = readPage('asset-depletion-mortgage-texas.html');

  assert.match(source, /b3-3\.4-06\/employment-related-assets-qualifying-income/);
  assert.match(source, /guide\/section\/5307\.1/);
  assert.match(source, /loan's amortization term in months/);
  assert.match(source, /divides net eligible assets by 240/);
});
