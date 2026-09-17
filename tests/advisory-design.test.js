const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

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
