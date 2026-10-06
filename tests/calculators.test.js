const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

// Load the shared suite in a minimal window sandbox
const sandbox = { window: {}, Intl, Math, isFinite, document: undefined };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('calculator-suite.js', 'utf8'), sandbox);
const Suite = sandbox.window.CalcSuite;

test('CalcSuite is exposed with the core math helpers', () => {
  assert.equal(typeof Suite.monthlyPayment, 'function');
  assert.equal(typeof Suite.amortize, 'function');
});

test('monthlyPayment: standard 30-year case', () => {
  // 400,000 @ 6.5% / 30y -> 2,528.27
  assert.ok(Math.abs(Suite.monthlyPayment(400000, 6.5, 30) - 2528.27) < 0.01);
});

test('monthlyPayment: zero-rate loan divides evenly', () => {
  assert.equal(Suite.monthlyPayment(120000, 0, 10), 1000);
});

test('monthlyPayment: 15-year case', () => {
  // 350,000 @ 6% / 15y -> 2,953.50
  assert.ok(Math.abs(Suite.monthlyPayment(350000, 6, 15) - 2953.5) < 0.01);
});

test('amortize matches closed-form remaining balance', () => {
  // 405,000 @ 6.5%, payment 2,559.88, 60 months -> 379,124.46
  const res = Suite.amortize(405000, 6.5, 2559.88, 60);
  const r = 6.5 / 100 / 12;
  const closed = 405000 * Math.pow(1 + r, 60) - 2559.88 * ((Math.pow(1 + r, 60) - 1) / r);
  assert.ok(Math.abs(res.balance - closed) < 0.05);
  assert.ok(Math.abs(res.balance - 379124.46) < 1);
});

test('DSCR reference case: rent / PITIA at the documented defaults', () => {
  // 500k, 20% down, 7.5%/30, tax 9000/yr, ins 2500/yr, rent 3500
  const pi = Suite.monthlyPayment(400000, 7.5, 30);
  const pitia = pi + 9000 / 12 + 2500 / 12;
  assert.ok(Math.abs(pitia - 3755.19) < 0.05);
  assert.ok(Math.abs(3500 / pitia - 0.932) < 0.005);
});

test('refinance break-even reference case', () => {
  // 350k, 7% -> 6%, 30y/30y, 6,000 costs -> savings 230.13, break-even 27 months
  const savings = Suite.monthlyPayment(350000, 7, 30) - Suite.monthlyPayment(350000, 6, 30);
  assert.ok(Math.abs(savings - 230.13) < 0.01);
  assert.equal(Math.ceil(6000 / savings), 27);
});

test('buydown reference cases (payment on reduced rate, full term)', () => {
  // 400k @ 6.125%/30: 2-1 subsidy 8,932.05 · 3-2-1 17,535.33 · 1-0 3,029.93
  const base = Suite.monthlyPayment(400000, 6.125, 30);
  const y = (red) => Suite.monthlyPayment(400000, 6.125 - red, 30);
  const twoOne = (base - y(2)) * 12 + (base - y(1)) * 12;
  const threeTwoOne = (base - y(3)) * 12 + (base - y(2)) * 12 + (base - y(1)) * 12;
  const oneZero = (base - y(1)) * 12;
  assert.ok(Math.abs(twoOne - 8932.05) < 0.5);
  assert.ok(Math.abs(threeTwoOne - 17535.33) < 0.5);
  assert.ok(Math.abs(oneZero - 3029.93) < 0.5);
});

test('asset depletion divisors reference case', () => {
  // eligible 1,775,000 -> 60mo 29,583.33 · 240mo 7,395.83 · 360mo 4,930.56
  const eligible = 250000 + 1000000 + 750000 * 0.7;
  assert.equal(eligible, 1775000);
  assert.ok(Math.abs(eligible / 60 - 29583.33) < 0.01);
  assert.ok(Math.abs(eligible / 240 - 7395.83) < 0.01);
  assert.ok(Math.abs(eligible / 360 - 4930.56) < 0.01);
});

// ── Page-level regression nets (house style: assert on served HTML) ──────────

const affordability = fs.readFileSync('calculator-affordability.html', 'utf8');
const buydown = fs.readFileSync('rate-buydown-calculator.html', 'utf8');
const dscrPage = fs.readFileSync('dscr-calculator.html', 'utf8');
const assetPage = fs.readFileSync('asset-depletion-calculator.html', 'utf8');
const hub = fs.readFileSync('calculators.html', 'utf8');

test('affordability: max price accounts for taxes and insurance, not P&I alone', () => {
  // The pre-2026-08-29 model converted the entire housing allowance into
  // principal (maxPrincipal / 0.95), overstating max price by ~$137k at defaults.
  assert.match(affordability, /taxMonthlyRate/);
  assert.match(affordability, /insMonthlyRate/);
  assert.doesNotMatch(affordability, /maxPrincipal \/ 0\.95/);
  // Disclosure names the assumptions instead of a fictional 28% front ratio
  assert.match(affordability, /~2% property tax/);
  assert.doesNotMatch(affordability, /28% of gross/);
});

test('affordability: corrected closed-form gives ~416,483 at documented defaults', () => {
  const r = 7 / 100 / 12;
  const n = 360;
  const pmtFactor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const maxHousing = 10000 * 0.43 - 800;
  const estPrice = maxHousing / (0.95 * pmtFactor + 0.02 / 12 + 0.005 / 12);
  assert.ok(Math.abs(estPrice - 416483) < 1);
});

test('buydown: annual tax/insurance frequency still divides by 12 (12x PITI regression net)', () => {
  assert.match(buydown, /name="bd-tax-freq"[^>]*value="yr"/);
  assert.match(buydown, /taxFreq === 'yr'/);
});

test('buydown: share URL round-trips escrow fields individually', () => {
  assert.match(buydown, /taxfreq/);
  assert.match(buydown, /p\.get\('ins'\)/);
  assert.match(buydown, /p\.get\('hoa'\)/);
  assert.match(buydown, /p\.get\('credit'\)/);
  assert.doesNotMatch(buydown, /escrow: inp\.escrowMo/);
});

test('dscr page: no flattering static placeholder before JS runs', () => {
  assert.doesNotMatch(dscrPage, />1\.08</);
  assert.doesNotMatch(dscrPage, /<strong id="dscr-status-title">Solid coverage<\/strong>/);
});

test('asset depletion: coverage target marker sits where the fill maps 100% (50%)', () => {
  assert.doesNotMatch(assetPage, /left:66%/);
  assert.match(assetPage, /left:50%/);
});

test('calculators hub schema lists all 8 calculators including DSCR + asset depletion', () => {
  assert.match(hub, /dscr-calculator\.html/);
  assert.match(hub, /asset-depletion-calculator\.html/);
});

test('wrap calculator has no dead inputs', () => {
  const wrap = fs.readFileSync('wrap-mortgage-calculator.html', 'utf8');
  assert.doesNotMatch(wrap, /w-original-term/);
  assert.doesNotMatch(wrap, /w-loan-age/);
});

test('currency inputs use comma formatting with comma-tolerant parsers', () => {
  const pages = {
    'dscr-calculator.html': ['dscr-price', 'dscr-rent'],
    'asset-depletion-calculator.html': ['adc-checking', 'adc-target'],
    'rate-buydown-calculator.html': ['bd-loan-input', 'bd-seller-credit'],
    'refinance-calculator.html': ['loan-amount', 'lenders-title'],
  };
  for (const [page, inputs] of Object.entries(pages)) {
    const src = fs.readFileSync(page, 'utf8');
    // formatter present and wired
    assert.match(src, /window\.styerMoney/, `${page} missing styerMoney formatter`);
    assert.match(src, /styerMoney\.attach\(/, `${page} never attaches the formatter`);
    // every parser that reads a currency field strips commas
    assert.match(src, /replace\(\/\[\$,\]\/g/, `${page} parser does not strip commas`);
    for (const id of inputs) {
      const tag = src.match(new RegExp(`<input[^>]*id="${id}"[^>]*>`));
      assert.ok(tag, `${page} missing #${id}`);
      assert.match(tag[0], /type="text"/, `${page} #${id} still type=number (cannot display commas)`);
    }
    // the silent killer: no bare parseFloat directly on a converted currency field
    for (const id of inputs) {
      assert.doesNotMatch(src, new RegExp(`parseFloat\\(document\\.getElementById\\('${id}'\\)\\.value\\)`),
        `${page} #${id} read by comma-blind parseFloat`);
    }
  }
});

test('wrap calculator money inputs keep their existing comma formatting', () => {
  const wrap = fs.readFileSync('wrap-mortgage-calculator.html', 'utf8');
  assert.match(wrap, /wrap-money-input/);
});

test('shared monthlyPayment stays accurate for tiny positive rates',()=>{
 for(const rate of [0,1e-15,1e-10,.01,6.5,20])for(const years of [15,30]){
  let factor=0;for(let month=1;month<=years*12;month++)factor+=Math.pow(1+rate/1200,-month);
  assert.ok(Math.abs(Suite.monthlyPayment(400000,rate,years)-400000/factor)<.000001);
 }
});
// Exercise the actual standalone DSCR helpers without a second implementation.
function dscrFunction(name){const start=dscrPage.indexOf('function '+name+'(');assert.ok(start>=0);let end=dscrPage.indexOf('{',start),depth=1;while(depth){end++;if(dscrPage[end]==='{')depth++;if(dscrPage[end]==='}')depth--;}return dscrPage.slice(start,end+1);}
const dscrHelpers={Math,Number,Intl,isFinite,errors:{},setError(id,msg){this;dscrHelpers.errors[id]=msg;}};
vm.createContext(dscrHelpers);vm.runInContext(['num','monthlyPI','validate'].map(dscrFunction).join('\n'),dscrHelpers);
test('DSCR parser rejects blank, malformed, partial and nonfinite inputs',()=>{
 for(const value of ['', ' ', '12bad', '1.2.3', 'Infinity', '1e999'])assert.ok(Number.isNaN(dscrHelpers.num({value})),value);
 for(const [value,expected]of [['500,000',500000],['0',0],['-10',-10],['1e-15',1e-15]])assert.equal(dscrHelpers.num({value}),expected);
});
test('DSCR validation rejects missing costs and out-of-range rate without discarding valid zero expenses',()=>{
 const i={price:500000,downRaw:20,downAmount:100000,rate:7.5,years:30,tax:9000,ins:2500,hoa:0,rent:3500,loan:400000};
 assert.equal(dscrHelpers.validate(i),true);
 for(const patch of [{tax:NaN},{hoa:NaN},{downRaw:NaN},{rate:21},{price:0},{downAmount:500001},{rent:-1}])assert.equal(dscrHelpers.validate({...i,...patch}),false);
 assert.equal(dscrHelpers.validate({...i,tax:0,ins:0,hoa:0,rent:0,rate:0}),true);
});
test('inline DSCR payment matches independent amortizing payment oracle including near zero',()=>{
 for(const rate of [0,1e-15,7.5,20])for(const years of [15,30]){let factor=0;for(let month=1;month<=years*12;month++)factor+=Math.pow(1+rate/1200,-month);assert.ok(Math.abs(dscrHelpers.monthlyPI(400000,rate,years)-400000/factor)<.000001);}
});
test('DSCR currency formatter preserves invalid signs/text and exact fractional input',()=>{
 const box={document:{activeElement:null}};vm.createContext(box);vm.runInContext(dscrFunction('fmtEl'),box);
 for(const value of ['-100','12bad','1.2.3']){const el={value};box.fmtEl(el);assert.equal(el.value,value);}
 const el={value:'1234.567'};box.fmtEl(el);assert.equal(el.value,'1,234.567');
});
test('carried DSCR and refinance analysis agrees with stable on-page payments',()=>{
 const analysis=require('../analysis.js');
 for(const rate of [0,1e-15,7.5]){
  const d=analysis.normalize({kind:'dscr',inputs:{price:500000,down:20,downMode:'pct',rate,years:30,tax:9000,ins:2500,hoa:0,rent:3500}});
  assert.ok(Math.abs(d.results.pi-Suite.monthlyPayment(400000,rate,30))<.000001);
  const r=analysis.normalize({kind:'refinance',inputs:{balance:400000,currentRate:7.5,currentYears:30,newRate:rate,newYears:30,costs:6000}});
  assert.ok(Math.abs(r.results.proposed-Suite.monthlyPayment(400000,rate,30))<.000001);
  assert.ok(Number.isFinite(r.results.savings));
 }
});
