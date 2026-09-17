const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { refineAdvisoryDesign } = require('../netlify/functions/lib/refine-advisory-design');
const { buildBlogPage } = require('../netlify/functions/lib/blog-page-builder');
const { buildRealtorPage } = require('../netlify/functions/lib/realtor-page-builder');
const { buildWebPage } = require('../netlify/functions/lib/page-builder');
const { buildRatePage } = require('../netlify/functions/lib/rate-page-builder');
const analysis = require('../analysis');

const page = fs.readFileSync('rate-buydown-calculator.html', 'utf8');
function calculator() {
  const elements = {};
  const context = vm.createContext({ Intl, Date, Math, SHOW_MONTHS_DEFAULT: 36, document: {
    getElementById(id) { return elements[id] ||= { style: {}, innerHTML: '', textContent: '' }; }
  }});
  for (const name of ['pmt', 'fmtDollar', 'fmtDollarInt', 'fmtPct', 'buildSchedule', 'renderSchedule', 'renderPrintSummary']) {
    const source = page.match(new RegExp('      function ' + name + '\\([^]*?\\n      \\}'));
    assert.ok(source, name);
    vm.runInContext(source[0], context);
  }
  return { context, elements };
}
test('buydown schedule labels match actual principal and interest, including print', () => {
  const { context, elements } = calculator();
  const rows = context.buildSchedule(400000, 6.125, 30, [2, 1], new Date(2026, 8, 1));
  assert.ok(Math.abs(rows[0].interest - 2041.6666667) < .01);
  assert.ok(Math.abs(400000 - rows[0].balance - rows[0].principal) < .01);
  context.renderSchedule(rows, false, false, 0);
  const headers = [...page.match(/<table class="bd-schedule-table"[^]*?<\/thead>/)[0].matchAll(/<th[^>]*>([^<]+)<\/th>/g)].map(m => m[1]);
  const firstRow = elements['bd-schedule-tbody'].innerHTML.match(/<tr[^>]*>([^]*?)<\/tr>/)[1];
  const cells = [...firstRow.matchAll(/<td>([^<]+)<\/td>/g)].map(m => m[1]);
  assert.equal(cells[headers.indexOf('Interest')], '$2,042');
  assert.equal(cells[headers.indexOf('Principal')], context.fmtDollarInt(rows[0].principal));
  context.renderPrintSummary({noteRate:6.125, basePmt:rows[0].basePmt, yr1Rate:4.125, yr1Pmt:rows[0].basePmt-rows[0].subsidy, moSavings:rows[0].subsidy, totalSubsidy:8932, creditLeft:-8932}, rows, '2/1');
  const printed = Object.values(elements).map(e=>e.innerHTML).join('');
  assert.match(printed, /<th>Interest<\/th><th>Principal<\/th>/);
  assert.match(printed, /-\$8,932/);
  assert.doesNotMatch(printed, /\$-8,932/);
});

test('all four publishing builders inherit the advisory shell without rewriting dates or destinations', () => {
  const content = '<h2 id="existing-answer">Income</h2><p>Existing answer.</p><h2>Costs</h2><h2>Documents</h2><h2>Timing</h2>';
  const input = { title: 'Example guide', description: 'Example', date: '2026-09-01', slug: 'example-guide', category: 'Guide', content, commentary: content, rates: '', direction: 'flat' };
  for (const build of [buildBlogPage, buildRealtorPage, buildWebPage, buildRatePage]) {
    const html = build(input);
    assert.match(html, /<body[^>]*class="[^"]*\badvisory-site\b/);
    assert.equal((html.match(/href="\/advisory-design\.css/g) || []).length, 1);
    assert.match(html, /class="nav-cta nav-apply"/);
    assert.match(html, /href="\/self-employed-mortgage-austin\.html"/);
    assert.match(html, /href="\/investor-loans\.html"/);
    assert.match(html, /src="(?:\.\.\/|\/)script\.js"/);
    assert.match(html, /id="existing-answer"/);
    assert.match(html, /2026-09-01/);
    assert.doesNotMatch(html, /Awards &amp; Recognition/);
    assert.equal(refineAdvisoryDesign(html), html, `${build.name} must be idempotent`);
  }
});

function handoffFixture(invalid = false) {
  const elements = {};
  const values = { balance: '350000', 'balance-exact': '357891.23', 'current-rate': '7', 'current-rate-exact': '6.987', 'current-term': '30', 'current-term-exact': '30', 'new-rate': '6', 'new-term': '30', costs: '6000' };
  for (const [id, value] of Object.entries(values)) elements[id] = { value, getAttribute: () => invalid && id === 'balance-exact' ? 'true' : null };
  let transfer, status, saved;
  const context = { window: { StyerAnalysis: analysis }, location: { search: '' }, URLSearchParams, Date, DOMException,
    sessionStorage: { setItem: (key, value) => { saved = JSON.parse(value); } },
    document: {
      getElementById: id => elements[id] || null,
      createElement: () => status = { setAttribute() {} },
      querySelector: selector => selector === '[data-calculator-actions]' ? { after() {} } : null,
      querySelectorAll: selector => selector === '[data-review-calculator]' ? [{ addEventListener: (_, handler) => { transfer = handler; } }] : []
    }
  };
  vm.runInNewContext(fs.readFileSync('calculator-journey.js', 'utf8'), context);
  transfer({ preventDefault() {} });
  return { saved, status, location: context.location };
}
test('refinance handoff carries exact typed inputs, calculated results and date', () => {
  const { saved, location } = handoffFixture();
  assert.equal(saved.inputs.balance, 357891.23);
  assert.equal(saved.inputs.currentRate, 6.987);
  assert.equal(saved.version, 1);
  assert.ok(saved.at > 0);
  assert.equal(saved.results.current, analysis.calculate(saved.inputs, 'refinance').current);
  assert.equal(location.href, '/refinance-quote.html?goal=Refinance&context=calculator');
});
test('refinance handoff does not send an invalid entry or silently substitute a rounded slider value', () => {
  const { saved, status, location } = handoffFixture(true);
  assert.equal(saved, undefined);
  assert.equal(location.href, undefined);
  assert.match(status.textContent, /Correct the highlighted number/);
});
