const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const pages = [
  'referral-partners-self-employed-clients.html',
  'mortgage-strategies-financial-advisors-texas.html',
  'mortgage-resources-for-cpas-texas.html',
  'reverse-mortgage-texas.html',
  'reverse-mortgage-financial-advisors-texas.html',
  'mortgage-case-studies-for-advisors-cpas.html',
  'construction-loan-scenario-review.html',
];

test('professional referral cluster exposes complete metadata and safe Texas licensing copy', () => {
  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8');
    assert.match(html, /<link rel="canonical" href="https:\/\/styermortgage\.com\//, page);
    assert.match(html, /<meta property="og:title"/, page);
    assert.match(html, /logo-light\.svg/, page);
    assert.doesNotMatch(html, /run it through somebody else|Adam (?:originates|is licensed).*Georgia|Adam (?:originates|is licensed).*Washington/i, page);
  }
});

test('professional forms collect routing metadata and protect sensitive data', () => {
  for (const page of pages.filter((page) => !page.includes('case-studies'))) {
    const html = fs.readFileSync(page, 'utf8');
    assert.match(html, /class="professional-referral-form"/, page);
    assert.match(html, /name="property_state"/, page);
    assert.match(html, /name="scenario_category"/, page);
    assert.match(html, /Social Security|sensitive information/, page);
  }
  const script = fs.readFileSync('js/professional-referrals.js', 'utf8');
  assert.match(script, /\.netlify\/functions\/lead-intake/);
  assert.match(script, /generate_lead/);
  assert.match(script, /thank-you\.html\?type=professional-referral/);
});

test('advisor and CPA pages link every alternative documentation path', () => {
  for (const page of ['mortgage-strategies-financial-advisors-texas.html', 'mortgage-resources-for-cpas-texas.html']) {
    const html = fs.readFileSync(page, 'utf8');
    for (const href of ['/bank-statement-loans.html', '/1099-only-mortgage-texas.html', '/p-and-l-mortgage-texas.html', '/asset-depletion-mortgage-texas.html', '/dscr-loans-texas.html']) {
      assert.match(html, new RegExp(`href="${href}"`), `${page}: ${href}`);
    }
    assert.match(html, /eligible retirement assets may support qualification without requiring withdrawals/i, page);
    assert.doesNotMatch(html, /What documents should I not email/i, page);
  }
});

test('professional assistant modes are wired through widget and server retrieval', () => {
  const widget = fs.readFileSync('assistant-widget.js', 'utf8');
  const server = fs.readFileSync('netlify/functions/mortgage-assistant.mts', 'utf8');
  for (const mode of ['advisor', 'advisor_reverse', 'cpa']) {
    assert.match(widget, new RegExp(mode));
    assert.match(server, new RegExp(mode));
  }
  assert.match(widget, /assistantMode: state\.assistantMode/);
  assert.match(fs.readFileSync('thank-you.html', 'utf8'), /appropriately licensed loan originator is available for that state/);
  assert.match(fs.readFileSync('js\/professional-referrals.js', 'utf8'), /styer:professional-referral/);
});

test('new indexable cluster pages are present in sitemap and llms registry', () => {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  const llms = fs.readFileSync('llms.txt', 'utf8');
  for (const page of pages) {
    assert.match(sitemap, new RegExp(page.replaceAll('.', '\\.')));
    assert.match(llms, new RegExp(page.replaceAll('.', '\\.')));
  }
});
