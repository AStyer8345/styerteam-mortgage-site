const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const analysis = require('../analysis.js');

test('investor review page can read the calculator handoff', () => {
  const html = fs.readFileSync('investor-loans.html', 'utf8');
  const analysisAt = html.indexOf('src="/analysis.js"');
  const journeyAt = html.indexOf('src="/situation-journeys.js"');
  assert.ok(analysisAt > -1 && journeyAt > analysisAt, 'analysis.js must load before the journey script');
  assert.match(html, /href="\/review-intake\.css"/);
  assert.match(html, /id="quick-options"[^>]*calculator-review|class="[^"]*calculator-review/);
  const formStart = html.lastIndexOf('<form', html.indexOf('id="form-investment-property-scenario"'));
  const form = html.slice(formStart, html.indexOf('</form>', formStart));
  assert.match(form, /action="\/thank-you"/);
  assert.match(form, /netlify-honeypot="bot-field"/);
  assert.match(form, /name="bot-field"/);
  assert.match(form, /name="form-name" type="hidden" value="investment-property-scenario"|name="form-name"[^>]*value="investment-property-scenario"/);
  for (const name of ['loan_goal', 'income_type', 'readiness', 'property_value', 'down_payment', 'monthly_rent', 'first_name', 'last_name', 'email', 'phone', 'situation', 'tcpa_consent', 'inquiry_id', 'intent']) {
    assert.match(form, new RegExp(`name="${name}"`), name);
  }
  assert.match(html, /No hard credit pull/);
  assert.match(fs.readFileSync('review-intake.css', 'utf8'), /text-transform:\s*none/);
});

test('refinance review page loads the same analysis reader', () => {
  const contact = fs.readFileSync('contact.html', 'utf8');
  const analysisAt = contact.indexOf('src="/analysis.js"');
  const journeyAt = contact.indexOf('/situation-journeys.js');
  assert.ok(analysisAt > -1 && journeyAt > analysisAt);
  assert.match(fs.readFileSync('calculator-refinance-breakeven.html', 'utf8'), /data-review-calculator[^>]*context=calculator|context=calculator[^>]*data-review-calculator/);
  assert.match(fs.readFileSync('calculator-journey.js', 'utf8'), /\/contact\.html\?goal=Refinance&context=calculator#contact-form/);
  assert.match(fs.readFileSync('calculator-journey.js', 'utf8'), /\/investor-loans\.html\?goal=Invest&context=calculator#scenario-review/);
});

test('extensionless investor redirect does not replace the query string', () => {
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const rule = config.redirects.find((entry) => entry.source === '/investor-loans');
  assert.equal(rule.destination, '/investor-loans.html');
  assert.equal(rule.statusCode, 301);
  assert.equal(config.cleanUrls, false);
  assert.doesNotMatch(rule.destination, /\?/);
});

test('DSCR review click stores the typed numbers for the investor form', () => {
  const elements = {
    'dscr-calculator': {},
    'dscr-price': { value: '$640,000', getAttribute: () => null },
    'dscr-down': { value: '25', getAttribute: () => null },
    'dscr-rate': { value: '7.5', getAttribute: () => null },
    'dscr-term': { value: '30', getAttribute: () => null },
    'dscr-tax': { value: '8100', getAttribute: () => null },
    'dscr-ins': { value: '2500', getAttribute: () => null },
    'dscr-hoa': { value: '0', getAttribute: () => null },
    'dscr-rent': { value: '4321', getAttribute: () => null },
    'dscr-down-pct-btn': { classList: { contains: (name) => name === 'is-active' } }
  };
  let transfer;
  let saved;
  const context = {
    window: { StyerAnalysis: analysis },
    location: { search: '' },
    URLSearchParams,
    Date,
    DOMException,
    sessionStorage: { setItem: (key, value) => { saved = { key, value: JSON.parse(value) }; } },
    document: {
      getElementById: (id) => elements[id] || null,
      createElement: () => ({ setAttribute() {}, className: '' }),
      querySelector: (selector) => selector === '[data-calculator-actions]' ? { after() {} } : null,
      querySelectorAll: (selector) => selector === '[data-review-calculator]' ? [{ addEventListener: (_, handler) => { transfer = handler; } }] : []
    }
  };
  vm.runInNewContext(fs.readFileSync('calculator-journey.js', 'utf8'), context);
  transfer({ preventDefault() {} });
  assert.equal(saved.key, 'styer:calculator-review');
  assert.equal(saved.value.kind, 'dscr');
  assert.equal(saved.value.inputs.price, 640000);
  assert.equal(saved.value.inputs.down, 25);
  assert.equal(saved.value.inputs.rent, 4321);
  assert.equal(saved.value.inputs.rate, 7.5);
  assert.equal(saved.value.inputs.downMode, 'pct');
  assert.equal(context.location.href, '/investor-loans.html?goal=Invest&context=calculator#scenario-review');
  const labels = analysis.rows(saved.value).map((row) => row[0]);
  for (const label of ['Purchase price', 'Interest rate', 'Loan amount', 'Monthly principal & interest', 'Monthly PITIA', 'Monthly gross rent', 'Estimated DSCR']) {
    assert.equal(labels.includes(label), true, label);
  }
  const handoff = analysis.summary(saved.value, 'handoff');
  assert.match(handoff, /Interest rate: 7\.5 %/);
  assert.match(handoff, /Monthly principal & interest/);
  assert.match(handoff, /Monthly PITIA/);
  assert.match(handoff, /Estimated DSCR/);
  assert.match(handoff, /Not a quote or offer\./);
  assert.match(fs.readFileSync('situation-journeys.js', 'utf8'), /render\(panel,analysis,'handoff'\)/);
  assert.match(fs.readFileSync('situation-journeys.js', 'utf8'), /summary\(analysis, 'handoff'\)/);
});

test('handoff summary renders the rate and payment rows with the disclaimer line', () => {
  function element() {
    return {
      className: '',
      textContent: '',
      children: [],
      append(...kids) { this.children.push(...kids); },
      appendChild(node) { this.children.push(node); return node; },
      replaceChildren() { this.children = []; }
    };
  }
  const sandbox = {
    document: { createElement: element },
    Intl, Date, Math, Number, isFinite
  };
  sandbox.window = sandbox;
  vm.runInNewContext(fs.readFileSync('analysis.js', 'utf8'), sandbox);
  const panel = element();
  sandbox.StyerAnalysis.render(panel, {
    kind: 'dscr',
    inputs: { price: 640000, down: 25, downMode: 'pct', rate: 7.5, years: 30, tax: 8100, ins: 2500, hoa: 0, rent: 4321 }
  }, 'handoff');
  const terms = panel.children.flatMap((node) => node.children.map((child) => child.textContent));
  assert.equal(terms.includes('Interest rate'), true);
  assert.equal(terms.includes('Monthly principal & interest'), true);
  assert.equal(terms.includes('Monthly PITIA'), true);
  const list = panel.children.find((node) => node.children.length > 2);
  const disclaimer = panel.children.find((node) => node.className === 'journey-summary-disclaimer');
  assert.equal(disclaimer.textContent, 'Not a quote or offer.');
  assert.ok(panel.children.indexOf(disclaimer) > panel.children.indexOf(list));
  for (const file of ['experience.css', 'review-intake.css']) {
    assert.match(fs.readFileSync(file, 'utf8'), /\.journey-summary-disclaimer\{[^}]*font-size:12px|journey-summary-disclaimer \{[\s\S]*font-size: 12px/);
  }
});

test('refinance handoff summary shows the rate and payment rows and the disclaimer', () => {
  const saved = analysis.normalize({
    kind: 'refinance',
    inputs: { balance: 350000, currentRate: 7, currentYears: 30, newRate: 6, newYears: 30, costs: 6000 }
  });
  const labels = analysis.rows(saved).map((row) => row[0]);
  assert.deepEqual(labels, ['Current balance', 'Current rate', 'Current term', 'New rate', 'New term', 'Closing costs paid in cash', 'Current monthly P&I', 'Proposed monthly P&I', 'Monthly payment difference', 'Simple break-even']);
  const handoff = analysis.summary(saved, 'handoff');
  assert.match(handoff, /Current rate: 7 %/);
  assert.match(handoff, /New rate: 6 %/);
  assert.match(handoff, /Current monthly P&I/);
  assert.match(handoff, /Proposed monthly P&I/);
  assert.match(handoff, /Monthly payment difference/);
  assert.match(handoff, /Not a quote or offer\./);
});
