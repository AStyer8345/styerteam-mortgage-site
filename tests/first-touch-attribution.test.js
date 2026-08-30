const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const attributionScript = fs.readFileSync('assets/utm.js', 'utf8');
const analyticsScript = fs.readFileSync('analytics.js', 'utf8');
const preapprovalPage = fs.readFileSync('get-preapproved.html', 'utf8');
const leadIntake = fs.readFileSync('netlify/functions/lead-intake.js', 'utf8');

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
  };
}

test('form attribution reuses first touch and recovers the clicked CTA without PII', () => {
  const now = new Date().toISOString();
  const firstTouch = {
    first_touch_page: 'https://styermortgage.com/bank-statement-loans.html',
    first_touch_referrer: 'https://www.google.com/search',
    first_touch_at: now,
    first_touch_source: 'google',
    first_touch_utm_source: 'google',
    first_touch_utm_medium: 'organic',
    first_touch_utm_campaign: '',
    first_touch_utm_term: '',
    first_touch_utm_content: '',
  };
  const lastCta = {
    cta_source_page: 'https://styermortgage.com/bank-statement-loans.html',
    cta_label: 'Send Your Scenario',
    intent: 'scenario',
    source: '/bank-statement-loans.html',
    at: now,
  };
  const sessionStorage = memoryStorage({
    'styer:first-touch:v1': JSON.stringify(firstTouch),
    'styer:last-cta:v1': JSON.stringify(lastCta),
  });
  const localStorage = memoryStorage();
  const fields = new Map();
  [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'page_url', 'entry_referrer', 'first_touch_page', 'first_touch_referrer',
    'first_touch_at', 'first_touch_source', 'first_touch_utm_source',
    'first_touch_utm_medium', 'first_touch_utm_campaign', 'first_touch_utm_term',
    'first_touch_utm_content', 'intent', 'source', 'cta_source_page', 'cta_label',
  ].forEach((name) => fields.set(name, { value: '' }));

  const location = new URL('https://styermortgage.com/get-preapproved.html?intent=scenario');
  const document = {
    readyState: 'complete',
    referrer: 'https://styermortgage.com/bank-statement-loans.html?private=discarded',
    querySelectorAll(selector) {
      const name = selector.match(/input\[name="([^"]+)"\]/)?.[1];
      return name && fields.has(name) ? [fields.get(name)] : [];
    },
    dispatchEvent() {},
  };
  const window = { location, sessionStorage, localStorage };
  const sandbox = {
    window, document, URL, URLSearchParams, Date,
    CustomEvent: function CustomEvent(type, options) { return { type, ...options }; },
  };
  vm.runInNewContext(attributionScript, sandbox);

  assert.equal(fields.get('first_touch_page').value, firstTouch.first_touch_page);
  assert.equal(fields.get('first_touch_source').value, 'google');
  assert.equal(fields.get('utm_source').value, 'google');
  assert.equal(fields.get('entry_referrer').value, 'https://styermortgage.com/bank-statement-loans.html');
  assert.equal(fields.get('cta_source_page').value, lastCta.cta_source_page);
  assert.equal(fields.get('cta_label').value, 'Send Your Scenario');
  assert.equal(fields.get('intent').value, 'scenario');
});

test('pre-approval keeps the proven visible form while adding reliable attribution', () => {
  assert.doesNotMatch(preapprovalPage, /name="referrer"/);
  assert.match(preapprovalPage, /name="entry_referrer"/);
  assert.match(preapprovalPage, /name="first_touch_page"/);
  assert.match(preapprovalPage, /name="cta_source_page"/);
  assert.match(preapprovalPage, /name="cta_label"/);
  assert.match(preapprovalPage, /<form[\s\S]*name="bot-field"[\s\S]*<\/form>/);
  assert.match(preapprovalPage, /attributionEvent\('qualification_funnel_view'\)/);
  assert.match(preapprovalPage, /attributionEvent\('form_start'\)/);
  assert.match(preapprovalPage, /attributionEvent\('step_1_complete'\)/);
  assert.match(preapprovalPage, /attributionEvent\('accepted_submit'\)/);
  assert.match(preapprovalPage, /styer:qualification-contact/);
  assert.match(preapprovalPage, /Talk With Adam &rarr;/);
});

test('sitewide analytics records first touch and CTA context for later submission', () => {
  assert.match(analyticsScript, /styer:first-touch:v1/);
  assert.match(analyticsScript, /styer:last-cta:v1/);
  assert.match(analyticsScript, /chatgpt/);
  assert.match(analyticsScript, /rememberQualificationCta/);
  assert.match(analyticsScript, /first_touch_referrer/);
});

test('every sitemap landing page loads first-touch analytics', () => {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const missing = [];

  for (const value of urls) {
    const pathname = new URL(value).pathname;
    let file = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    if (file.endsWith('/')) file += 'index.html';
    if (!fs.existsSync(file)) continue;
    if (!/analytics\.js(?:\?[^"']*)?["']/.test(fs.readFileSync(file, 'utf8'))) missing.push(file);
  }

  assert.deepEqual(missing, []);
});

test('lead intake propagates first-touch and CTA attribution to downstream systems', () => {
  for (const field of [
    'entry_referrer', 'first_touch_page', 'first_touch_referrer',
    'first_touch_source', 'first_touch_utm_source', 'intent',
    'cta_source_page', 'cta_label',
  ]) {
    const occurrences = leadIntake.match(new RegExp(field, 'g')) || [];
    assert.ok(occurrences.length >= 3, `${field} should be normalized and sent to both downstream systems`);
  }
});

test('lead intake sends normalized attribution in the live notification payload', async () => {
  const envNames = [
    'MAILCHIMP_API_KEY', 'MAILCHIMP_BORROWER_LIST_ID', 'MAILCHIMP_SERVER_PREFIX',
    'LOANOS_URL', 'LOANOS_API_URL', 'LOANOS_AGENT_SECRET', 'N8N_WEB_LEAD_URL',
  ];
  const previousEnv = Object.fromEntries(envNames.map((name) => [name, process.env[name]]));
  const previousFetch = global.fetch;
  const requests = [];

  try {
    envNames.forEach((name) => delete process.env[name]);
    process.env.N8N_WEB_LEAD_URL = 'https://example.test/web-lead';
    global.fetch = async (url, options = {}) => {
      requests.push({ url: String(url), options });
      return { ok: true, json: async () => ({}) };
    };
    const modulePath = require.resolve('../netlify/functions/lead-intake.js');
    delete require.cache[modulePath];
    const { handler } = require(modulePath);
    const response = await handler({
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'person@example.test',
        first_name: 'Test',
        'form-name': 'get-preapproved',
        entry_referrer: 'https://styermortgage.com/bank-statement-loans.html',
        first_touch_page: 'https://styermortgage.com/',
        first_touch_source: 'chatgpt',
        first_touch_utm_source: 'chatgpt',
        intent: 'scenario',
        source: '/bank-statement-loans.html',
        cta_source_page: 'https://styermortgage.com/bank-statement-loans.html',
        cta_label: 'Send Your Scenario',
      }),
    });

    assert.equal(response.statusCode, 200);
    assert.equal(requests.length, 1);
    const payload = JSON.parse(requests[0].options.body);
    assert.equal(payload.data.entry_referrer, 'https://styermortgage.com/bank-statement-loans.html');
    assert.equal(payload.data.first_touch_source, 'chatgpt');
    assert.equal(payload.data.first_touch_utm_source, 'chatgpt');
    assert.equal(payload.data.intent, 'scenario');
    assert.equal(payload.data.cta_label, 'Send Your Scenario');
  } finally {
    global.fetch = previousFetch;
    envNames.forEach((name) => {
      if (previousEnv[name] === undefined) delete process.env[name];
      else process.env[name] = previousEnv[name];
    });
  }
});
