const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');

const page = fs.readFileSync('asset-depletion-calculator.html', 'utf8');
const shared = fs.readFileSync('script.js', 'utf8');

test('asset depletion email form posts through lead-intake and stays off the empty webhook', () => {
  assert.doesNotMatch(page, /var WEBHOOK_URL/);
  assert.match(page, /LEAD_INTAKE_URL = "\/\.netlify\/functions\/lead-intake"/);
  assert.match(page, /id="adc-email"(?! hidden)/);
  assert.match(page, /name="asset-depletion-calculator"/);
  assert.match(page, /name="name"/);
  assert.match(page, /name="email"/);
  assert.match(page, /name="bot-field"/);
  assert.doesNotMatch(page, /name="phone"|type="tel"|name="tcpa_consent"/);
  assert.match(page, /lead_type: 'asset_depletion_calculator'/);
  assert.match(page, /scenarioSubmit: false/);
  assert.doesNotMatch(page, /dataLayer\.push\(\{\s*event:\s*'generate_lead'/);
  const confirmed = page.indexOf('data.captured === true');
  const tracked = page.indexOf("lead_type: 'asset_depletion_calculator'");
  assert.ok(confirmed !== -1 && tracked !== -1 && confirmed < tracked);
  assert.match(page, /Something went wrong\. Please try again or call Adam at \(512\) 956-6010\./);
});

function matchSelector(element, selector) {
  return selector.split(',').some((part) => {
    const tokens = part.trim().match(/([#.][\w-]+|\[[^\]]+\]|[a-zA-Z][\w-]*)/g) || [];
    return tokens.length > 0 && tokens.every((token) => {
      if (token[0] === '#') return element.id === token.slice(1);
      if (token[0] === '.') return element.classList.contains(token.slice(1));
      if (token[0] === '[') {
        const attr = token.match(/^\[([^\]=~]+)(?:="([^"]*)")?\]$/);
        if (!attr) return false;
        const actual = element.getAttribute(attr[1]);
        return attr[2] == null ? actual != null : actual === attr[2];
      }
      return element.tagName === token.toUpperCase();
    });
  });
}

function createElement(tag) {
  const element = {
    tagName: String(tag || 'div').toUpperCase(),
    id: '',
    className: '',
    hidden: false,
    value: '',
    defaultValue: '',
    textContent: '',
    disabled: false,
    parentNode: null,
    children: [],
    attributes: {},
    style: {},
    listeners: {},
  };
  const classes = new Set();
  const syncClass = () => { element.className = [...classes].join(' '); element.attributes.class = element.className; };
  element.classList = {
    add(...names) { names.forEach((name) => classes.add(name)); syncClass(); },
    remove(...names) { names.forEach((name) => classes.delete(name)); syncClass(); },
    toggle(name) { const on = !classes.has(name); if (on) classes.add(name); else classes.delete(name); syncClass(); return on; },
    contains(name) { return classes.has(name); },
  };
  element.setAttribute = (name, value) => {
    element.attributes[name] = String(value);
    if (name === 'id') element.id = String(value);
    if (name === 'class') {
      classes.clear();
      String(value).split(/\s+/).filter(Boolean).forEach((item) => classes.add(item));
      syncClass();
    }
    if (name === 'hidden') element.hidden = true;
  };
  element.getAttribute = (name) => (Object.prototype.hasOwnProperty.call(element.attributes, name) ? element.attributes[name] : null);
  element.removeAttribute = (name) => { delete element.attributes[name]; };
  element.addEventListener = (type, fn) => { (element.listeners[type] ||= []).push(fn); };
  element.dispatchEvent = async (event) => {
    event.target ||= element;
    for (const fn of element.listeners[event.type] || []) await fn(event);
  };
  element.appendChild = (child) => { child.parentNode = element; element.children.push(child); return child; };
  element.matches = (selector) => matchSelector(element, selector);
  element.closest = (selector) => {
    let node = element;
    while (node) {
      if (node.matches && node.matches(selector)) return node;
      node = node.parentNode;
    }
    return null;
  };
  element.querySelector = (selector) => {
    for (const child of walk(element)) if (child !== element && matchSelector(child, selector)) return child;
    return null;
  };
  element.querySelectorAll = (selector) => walk(element).filter((child) => child !== element && matchSelector(child, selector));
  element.reset = function reset() {
    walk(element).forEach((child) => {
      if (child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') child.value = child.defaultValue;
    });
  };
  return element;
}

function walk(node, list = []) {
  list.push(node);
  node.children.forEach((child) => walk(child, list));
  return list;
}

function parsePage(html) {
  const source = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const root = createElement('document');
  const stack = [root];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
  const re = /<!--[\s\S]*?-->|<\/([a-zA-Z0-9]+)>|<([a-zA-Z0-9]+)([^>]*?)(\/?)>|([^<]+)/g;
  let match;
  while ((match = re.exec(source))) {
    if (match[0].startsWith('<!--')) continue;
    if (match[1]) {
      while (stack.length > 1 && stack.at(-1).tagName !== match[1].toUpperCase()) stack.pop();
      if (stack.length > 1) stack.pop();
      continue;
    }
    if (match[2]) {
      const element = createElement(match[2]);
      const attrRe = /([^\s=\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
      let attr;
      while ((attr = attrRe.exec(match[3] || ''))) {
        const value = attr[2] ?? attr[3] ?? attr[4] ?? '';
        element.setAttribute(attr[1], value);
        if (attr[1] === 'value') {
          element.value = value;
          element.defaultValue = value;
        }
      }
      stack.at(-1).appendChild(element);
      if (!match[4] && !voidTags.has(match[2].toLowerCase())) stack.push(element);
      continue;
    }
    const text = match[5].replace(/\s+/g, ' ').trim();
    if (text && stack.length > 1) stack.at(-1).textContent += (stack.at(-1).textContent ? ' ' : '') + text;
  }
  root.getElementById = (id) => walk(root).find((node) => node.id === id) || null;
  root.querySelector = (selector) => root.querySelectorAll(selector)[0] || null;
  root.querySelectorAll = (selector) => walk(root).filter((node) => node !== root && matchSelector(node, selector));
  return root;
}

function loadCalculator(fetchImpl) {
  const document = parsePage(page);
  const storage = new Map();
  const calls = [];
  const sandbox = {
    console,
    crypto,
    Intl,
    URL,
    URLSearchParams,
    Promise,
    setTimeout,
    clearTimeout,
    AbortController,
    document,
    location: {
      href: 'https://styerteam.com/asset-depletion-calculator.html?email=secret@example.com',
      origin: 'https://styerteam.com',
      pathname: '/asset-depletion-calculator.html',
      search: '?email=secret@example.com',
    },
    sessionStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
    CustomEvent: class CustomEvent {
      constructor(type, init) { this.type = type; this.detail = init && init.detail; }
    },
    dataLayer: [],
    validateCalculatorInputs: () => true,
    fetch: async (url, options) => {
      calls.push({ url: String(url), options });
      return fetchImpl(url, options);
    },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const helperStart = shared.indexOf('function styerInquiryId');
  const helperEnd = shared.indexOf('window.StyerTrackGenerateLead = dispatchLeadSubmitted') + 'window.StyerTrackGenerateLead = dispatchLeadSubmitted'.length;
  const timeoutStart = shared.indexOf('async function fetchWithTimeout');
  const timeoutEnd = shared.indexOf('window.StyerFetchWithTimeout = fetchWithTimeout') + 'window.StyerFetchWithTimeout = fetchWithTimeout'.length;
  const calculatorStart = page.indexOf('START ASSET DEPLETION CALCULATOR MODULE — SCRIPT');
  const calculatorEnd = page.indexOf('END ASSET DEPLETION CALCULATOR MODULE — SCRIPT');
  const calculator = page.slice(page.indexOf('<script>', calculatorStart) + '<script>'.length, page.lastIndexOf('</script>', calculatorEnd));
  vm.runInNewContext(`${shared.slice(helperStart, helperEnd)};\n${shared.slice(timeoutStart, timeoutEnd)};\n${calculator}`, sandbox, { filename: 'asset-depletion-calculator.html' });
  return { document, sandbox, calls };
}

function jsonResponse(body, ok = true) {
  return { ok, status: ok ? 200 : 502, json: async () => body };
}

async function submit(document, values) {
  const form = document.getElementById('adc-email-form');
  if (values.name != null) document.getElementById('adc-email-name').value = values.name;
  if (values.email != null) document.getElementById('adc-email-addr').value = values.email;
  if (values.notes != null) document.getElementById('adc-email-notes').value = values.notes;
  if (values.honeypot != null) form.querySelector('[name="bot-field"]').value = values.honeypot;
  if (values.utm != null) form.querySelector('[name="utm_source"]').value = values.utm;
  await form.dispatchEvent({ type: 'submit', preventDefault() {}, target: form });
  return form;
}

test('a confirmed calculator submission sends the intake payload and one generate_lead', async () => {
  const { document, sandbox, calls } = loadCalculator(async () => jsonResponse({
    success: true,
    captured: true,
    inquiry_id: 'stored-inquiry-123',
  }));
  const form = await submit(document, {
    name: 'Ada Borrower',
    email: 'ada@example.com',
    notes: 'Planning from savings',
    utm: 'newsletter',
  });

  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, '/');
  assert.equal(calls[0].options.headers['Content-Type'], 'application/x-www-form-urlencoded');
  assert.equal(calls[1].url, '/.netlify/functions/lead-intake');
  assert.equal(calls[1].options.headers['Content-Type'], 'application/json');
  const payload = JSON.parse(calls[1].options.body);
  const backup = new URLSearchParams(calls[0].options.body);
  assert.equal(payload['form-name'], 'asset-depletion-calculator');
  assert.equal(payload.name, 'Ada Borrower');
  assert.equal(payload.email, 'ada@example.com');
  assert.equal(payload.intent, 'asset_depletion_calculator');
  assert.equal(payload.lead_source, 'Asset Depletion Calculator');
  assert.equal(payload.preferred_follow_up, 'Email');
  assert.equal(payload.page_url, 'https://styerteam.com/asset-depletion-calculator.html');
  assert.equal(payload.utm_source, 'newsletter');
  assert.equal(payload.phone, undefined);
  assert.equal(payload.tcpa_consent, undefined);
  assert.match(payload.inquiry_id, /^[A-Za-z0-9:_-]{8,200}$/);
  assert.equal(backup.get('inquiry_id'), payload.inquiry_id);
  assert.match(payload.situation, /checking \$250,000/);
  assert.match(payload.situation, /Selected illustration period: 60 months/);
  assert.match(payload.situation, /Visitor notes: Planning from savings/);
  assert.doesNotMatch(payload.situation, /secret@example.com|rate|promise/i);
  assert.equal(JSON.stringify(payload).includes('secret@'), false);
  const leadEvents = sandbox.dataLayer.filter((entry) => entry.event === 'generate_lead');
  assert.equal(leadEvents.length, 1);
  assert.equal(leadEvents[0].lead_type, 'asset_depletion_calculator');
  assert.equal(leadEvents[0].form_id, 'adc-email-form');
  assert.equal(leadEvents[0].form_name, 'asset-depletion-calculator');
  assert.equal(leadEvents[0].inquiry_id, payload.inquiry_id);
  assert.equal(leadEvents[0].page_path, '/asset-depletion-calculator.html');
  assert.equal(leadEvents[0].page_location, 'https://styerteam.com/asset-depletion-calculator.html');
  assert.equal(JSON.stringify(leadEvents[0]).includes('ada@'), false);
  assert.equal(JSON.stringify(leadEvents[0]).includes('Ada'), false);
  assert.equal(sandbox.dataLayer.some((entry) => entry.event === 'scenario_submit'), false);
  assert.equal(document.getElementById('adc-email-msg').textContent, 'Thanks — Adam will follow up shortly.');
  assert.equal(document.getElementById('adc-email-name').value, '');
  assert.equal(form.querySelector('[type="submit"]').disabled, false);
});

test('calculator success waits for captured:true and a failed or empty receipt does not emit generate_lead', async () => {
  const failed = loadCalculator(async () => jsonResponse({ captured: false }, false));
  await submit(failed.document, { name: 'Ada Borrower', email: 'ada@example.com' });
  assert.equal(failed.sandbox.dataLayer.filter((entry) => entry.event === 'generate_lead').length, 0);
  assert.equal(failed.document.getElementById('adc-email-msg').textContent, 'Something went wrong. Please try again or call Adam at (512) 956-6010.');
  assert.equal(failed.document.getElementById('adc-email-name').value, 'Ada Borrower');

  const unconfirmed = loadCalculator(async () => jsonResponse({ ok: true }));
  await submit(unconfirmed.document, { name: 'Ada Borrower', email: 'ada@example.com' });
  assert.equal(unconfirmed.calls.length, 2);
  assert.equal(unconfirmed.sandbox.dataLayer.filter((entry) => entry.event === 'generate_lead').length, 0);
  assert.match(unconfirmed.document.getElementById('adc-email-msg').textContent, /Something went wrong/);

  const honeypot = loadCalculator(async () => jsonResponse({ captured: true }));
  await submit(honeypot.document, { name: 'Ada Borrower', email: 'ada@example.com', honeypot: 'robot' });
  assert.equal(honeypot.calls.length, 0);
  assert.equal(honeypot.sandbox.dataLayer.length, 0);
  assert.equal(honeypot.document.getElementById('adc-email-msg').textContent, '');
});
