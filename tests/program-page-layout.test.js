const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

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
    assert.match(html, /<body class="editorial-page loan-page program-page-modern"[^>]*>/, file);
    if (file === 'dscr-loan-austin-tx.html') {
      assert.match(html, /dscr-investor\.css/);
      assert.doesNotMatch(html, /src="\/js\/program-page-layout/);
    } else {
      assert.match(html, /src="\/js\/program-page-layout\.js(?:\?[^\"]*)?"/, file);
    }
    assert.match(html, /style\.css\?v=20260830-(?:program3|selfemp1)/, file);
  }
});

// A small DOM fixture executes the real enhancement script without requiring a
// browser in the unit suite. Full browser behavior is covered by the local-only
// complex-income-browser.cjs regression.
class Element {
  constructor(tag, text = '') {
    this.tagName = tag.toUpperCase();
    this.ownText = text;
    this.children = [];
    this.parentNode = null;
    this.className = '';
    this.attributes = {};
    this.classList = {
      contains: value => this.className.split(/\s+/).includes(value),
      add: value => { if (!this.classList.contains(value)) this.className += ' ' + value; }
    };
  }
  get textContent() { return this.ownText + this.children.map(child => child.textContent).join(''); }
  get nextElementSibling() { return this.parentNode?.children[this.parentNode.children.indexOf(this) + 1] || null; }
  get caption() { return this.children.find(child => child.tagName === 'CAPTION') || null; }
  setAttribute(name, value) { this.attributes[name] = value; }
  hasAttribute(name) { return Object.hasOwn(this.attributes, name); }
  detach(child) { if (child.parentNode) child.parentNode.children.splice(child.parentNode.children.indexOf(child), 1); }
  appendChild(child) { this.detach(child); this.children.push(child); child.parentNode = this; return child; }
  insertBefore(child, before) { this.detach(child); this.children.splice(this.children.indexOf(before), 0, child); child.parentNode = this; }
  matches(selector) { return selector.startsWith('.') ? this.classList.contains(selector.slice(1)) : this.tagName === selector.toUpperCase(); }
  closest(selector) {
    for (let node = this; node; node = node.parentNode) {
      if (selector.split(',').some(part => node.matches(part.trim()))) return node;
    }
    return null;
  }
  querySelectorAll(selector) {
    return this.children.flatMap(child => [child, ...child.querySelectorAll('*')]).filter(child => selector === '*' || child.matches(selector));
  }
  querySelector(selector) {
    if (selector === ':scope > .container') return this.children.find(child => child.classList.contains('container')) || null;
    return this.querySelectorAll(selector)[0] || null;
  }
}

function fixture(authored = false) {
  const body = new Element('body');
  body.className = 'program-page-modern';
  if (authored) body.setAttribute('data-complex-income', 'true');
  const section = body.appendChild(new Element('section'));
  const container = section.appendChild(new Element('div'));
  container.className = 'container';
  const document = {
    body,
    readyState: 'complete',
    createElement: tag => new Element(tag),
    querySelectorAll: () => [section]
  };
  const run = () => vm.runInNewContext(fs.readFileSync('js/program-page-layout.js', 'utf8'), { document });
  return { body, section, container, run };
}

test('legacy program enhancements preserve full answers, later FAQs and related links', () => {
  const { container, run } = fixture();
  const originals = [];
  for (let i = 0; i < 3; i++) {
    originals.push(container.appendChild(new Element('h3', `Option ${i}`)));
    originals.push(container.appendChild(new Element('p', ('Detailed qualification and important limitation. ').repeat(80) + `Unique ending ${i}`)));
  }
  const list = container.appendChild(new Element('ul'));
  for (let i = 0; i < 9; i++) originals.push(list.appendChild(new Element('li', `Related guide ${i}`)));
  for (let i = 0; i < 8; i++) {
    const faq = container.appendChild(new Element('div', `FAQ ${i}`));
    faq.className = 'accordion-item';
    originals.push(faq);
  }
  const textBefore = container.textContent;
  run();
  assert.equal(container.textContent, textBefore, 'No text may be shortened or omitted');
  assert.equal(container.querySelectorAll('.program-option-card').length, 3);
  for (const original of originals) {
    assert.ok(original.closest('.container'), 'Authored node remains in the document');
    assert.equal(original.hidden, undefined, 'Later answers and links are not automatically hidden');
  }
  assert.equal(container.querySelectorAll('details').length, 0, 'Enhancement must not create word-count disclosures');
  assert.equal(container.querySelectorAll('button').length, 0, 'No extra reveal gate is needed for later content');
});

test('comparison scroll regions wrap only tables and expose a keyboard label', () => {
  const { container, run } = fixture();
  const explanation = container.appendChild(new Element('p', 'This condition must remain outside the scroll region.'));
  const table = container.appendChild(new Element('table'));
  table.appendChild(new Element('caption', 'Income documentation comparison'));
  run();
  const wrapper = table.parentNode;
  assert.equal(explanation.parentNode, container);
  assert.equal(wrapper.className, 'program-table-scroll');
  assert.deepEqual(wrapper.children, [table]);
  assert.deepEqual(wrapper.attributes, { role: 'region', tabindex: '0', 'aria-label': 'Income documentation comparison' });
  run();
  assert.equal(container.querySelectorAll('.program-table-scroll').length, 1, 'No nested scroll wrappers on a second enhancement');
});

test('authored complex-income guides keep their chosen structure and native disclosures', () => {
  const { container, run } = fixture(true);
  for (let i = 0; i < 3; i++) container.appendChild(new Element('h3', `Authored heading ${i}`));
  const details = container.appendChild(new Element('details'));
  details.appendChild(new Element('summary', 'Optional technical detail'));
  details.appendChild(new Element('p', 'An intentionally optional explanation.'));
  const wrapper = container.appendChild(new Element('div'));
  wrapper.className = 'ci-table-wrap';
  const table = wrapper.appendChild(new Element('table'));
  const childrenBefore = [...container.children];
  run();
  assert.deepEqual(container.children, childrenBefore, 'Authored reading order remains intact');
  assert.equal(table.parentNode, wrapper, 'Existing accessible wrapper is retained');
  assert.equal(container.querySelectorAll('.program-option-card').length, 0);
  assert.equal(container.querySelectorAll('details')[0], details);
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
    if (/data-situation-page=/.test(html)) {
      assert.match(html, /journey-primary[^>]*>(?:Send Your Scenario|Structure My Financing)/);
      assert.match(html, /journey-secondary[^>]*>(?:Book a Call|Apply Now)/);
      assert.match(html, /nav-cta nav-apply/);
      continue;
    }
    const primary = html.match(/<a[^>]+class="btn btn-primary hero-cta-primary hero-cta-btn"[^>]*>([^<]+)<\/a>/);
    const secondary = html.match(/<a[^>]+class="btn btn-hero-ghost hero-cta-btn"[^>]*>([^<]+)<\/a>/);
    assert.ok(primary, `${file} must have a primary hero CTA`);
    assert.ok(secondary, `${file} must have a secondary hero CTA`);
    assert.match(secondary[1], /Book a Call/);
  }
});

test('self-employed qualification paths link to full guides and preserve scenario intake', () => {
  const html = fs.readFileSync('self-employed-mortgage-austin.html', 'utf8');
  const main = html.match(/<main\b[\s\S]*?<\/main>/)[0];
  for (const href of ['/bank-statement-loans.html', '/1099-only-mortgage-texas.html', '/p-and-l-mortgage-texas.html', '/asset-depletion-mortgage-texas.html']) {
    assert.ok(main.includes('href="' + href + '"'), href);
  }
  assert.match(main, /href="\/mortgage-for-business-owners-austin\.html"/);
  assert.match(main, /id="income-documents"/);
  assert.match(main, /id="prepare-your-file"/);
  assert.match(main, /id="qualification-steps"/);
  assert.match(main, /<a\b[^>]*href="#scenario-review"[^>]*>Send Your Scenario<\/a>/);
  assert.match(main, /name="scenario-review"/);
  assert.equal((main.match(/<form\b/g) || []).length, 1);
  assert.doesNotMatch(main, /name="self-employed-quote"/);
});
