const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const script = fs.readFileSync('script.js', 'utf8');
const helper = script.slice(script.indexOf('const LEAD_PARAM_KEYS'), script.indexOf('window.StyerTrackGenerateLead = dispatchLeadSubmitted'));

function loadHelper() {
  const dataLayer = [];
  const events = [];
  const storage = new Map();
  const sandbox = {
    window: { location: { pathname: '/contact.html', origin: 'https://styerteam.com', search: '?email=secret@example.com' } },
    document: { dispatchEvent: (event) => events.push(event) },
    sessionStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
    setTimeout,
    CustomEvent: class CustomEvent {
      constructor(type, init) { this.type = type; this.detail = init && init.detail; }
    },
  };
  sandbox.window.dataLayer = dataLayer;
  vm.runInNewContext(helper + '\nthis.api = { dispatchLeadSubmitted, sanitizeLeadParams };', sandbox);
  return { dataLayer, events, storage, api: sandbox.api };
}

function leadEvents(dataLayer) {
  return dataLayer.filter((entry) => entry.event === 'generate_lead');
}

test('generate_lead carries form and page identifiers and drops contact fields', () => {
  const { dataLayer, events, api } = loadHelper();
  api.dispatchLeadSubmitted({
    lead_type: 'quick_contact',
    form_name: 'contact',
    form_id: 'form-contact',
    inquiry_id: 'inq-123',
    email: 'secret@example.com',
    phone: '5125550100',
    name: 'Ada Borrower',
    page_url: 'https://styerteam.com/contact.html?email=secret@example.com',
  });
  const event = leadEvents(dataLayer)[0];
  assert.equal(leadEvents(dataLayer).length, 1);
  assert.equal(event.lead_type, 'quick_contact');
  assert.equal(event.form_name, 'contact');
  assert.equal(event.form_id, 'form-contact');
  assert.equal(event.inquiry_id, 'inq-123');
  assert.equal(event.page_path, '/contact.html');
  assert.equal(event.page_location, 'https://styerteam.com/contact.html');
  assert.equal(JSON.stringify(event).includes('secret@'), false);
  assert.equal(JSON.stringify(event).includes('512555'), false);
  assert.equal(JSON.stringify(event).includes('Ada'), false);
  assert.equal(events[0].detail.email, undefined);
  assert.equal(dataLayer.some((entry) => entry.event === 'scenario_submit'), true);
});

test('the same inquiry emits generate_lead once', () => {
  const { dataLayer, api } = loadHelper();
  const detail = { lead_type: 'prequal', form_name: 'prequal', form_id: 'prequal-form', inquiry_id: 'same-inquiry' };
  api.dispatchLeadSubmitted(detail);
  api.dispatchLeadSubmitted(detail);
  assert.equal(leadEvents(dataLayer).length, 1);
});

test('a failed capture does not emit generate_lead and a confirmed one does', async () => {
  const hero = script.slice(script.indexOf('function initHeroQuickForm'), script.indexOf('function initTestimonialFilter'));
  const failure = hero.indexOf('if (!hasSuccessfulCapture(quoteCaptureResults))');
  const track = hero.indexOf('dispatchLeadSubmitted');
  assert.ok(failure !== -1 && track !== -1 && failure < track);

  const quick = script.slice(script.indexOf('async function submitForm'), script.indexOf('function initFormValidation'));
  assert.ok(quick.indexOf('if (!hasSuccessfulCapture(captureResults))') < quick.indexOf('dispatchLeadSubmitted'));

  const prequal = script.slice(script.indexOf('function initPrequalForm'), script.indexOf('function initNativeFormErrors'));
  assert.ok(prequal.indexOf('if (!hasSuccessfulCapture(results))') < prequal.indexOf('dispatchLeadSubmitted'));

  const native = script.slice(script.indexOf('function initNativeLeadForms'), script.indexOf('if (document.readyState'));
  assert.match(native, /if \(!response\.ok\) throw new Error\('capture failed'\)/);
  assert.ok(native.indexOf('throw new Error') < native.indexOf('dispatchLeadSubmitted'));
  assert.match(native, /form-ftb/);
});

test('guide, waitlist, buyer guide, journeys, referrals, and the assistant fire one confirmed lead', () => {
  const dpa = fs.readFileSync('ftb-dpa-guide.html', 'utf8');
  assert.doesNotMatch(dpa, /dataLayer\.push\(\{\s*event:\s*'generate_lead'/);
  assert.ok(dpa.indexOf('if (!data.success)') < dpa.indexOf('StyerTrackGenerateLead'));
  assert.match(dpa, /form_id: form\.id \|\| 'form-ftb-dpa-guide'/);
  assert.doesNotMatch(dpa, /gtag\/js\?id=AW-/);

  const waitlist = fs.readFileSync('loanos-waitlist.html', 'utf8');
  assert.doesNotMatch(waitlist, /dataLayer\.push\(\{\s*event:\s*'generate_lead'/);
  assert.ok(waitlist.indexOf('if (!data.success)') < waitlist.indexOf('StyerTrackGenerateLead'));
  assert.match(waitlist, /form_id: form\.id \|\| 'form-lo-waitlist'/);

  const guide = fs.readFileSync('resources/first-time-buyer-guide/index.html', 'utf8');
  assert.ok(guide.indexOf('if (!data.success)') < guide.indexOf('StyerTrackGenerateLead'));
  assert.match(guide, /form_id: form\.id \|\| 'guide-signup-form'/);

  const journeys = fs.readFileSync('situation-journeys.js', 'utf8');
  assert.match(journeys, /name === 'generate_lead' && typeof root\.StyerTrackGenerateLead === 'function'/);
  assert.match(journeys, /page_location: \(root\.location\.origin \|\| ''\) \+ root\.location\.pathname/);

  const referrals = fs.readFileSync('js/professional-referrals.js', 'utf8');
  assert.match(referrals, /await window\.StyerTrackGenerateLead\(leadParams,\{waitForTags:true,scenarioSubmit:false\}\)/);
  assert.ok(referrals.indexOf('StyerTrackGenerateLead') < referrals.indexOf("window.location.href='/thank-you.html?type=professional-referral'"));

  const assistant = fs.readFileSync('assistant-widget.js', 'utf8');
  assert.match(assistant, /if \(needsConsent && data\.toolResult && data\.toolResult\.ok === true\) \{[\s\S]*trackConfirmedWebsiteLead\(\)/);
  assert.match(assistant, /form_id: 'mortgage-assistant-contact'/);
  assert.match(assistant, /if \(state\.leadEventSent\) return/);
  const funnel = assistant.slice(assistant.indexOf('function trackAssistant'), assistant.indexOf('function trackConfirmedWebsiteLead'));
  assert.doesNotMatch(funnel, /event:\s*'generate_lead'/);
  assert.match(funnel, /StyerAfterGoogleTag\(send\)/);
});

test('thank-you does not emit a second generate_lead and queues Ads config after the Google tag', () => {
  const thankYou = fs.readFileSync('thank-you.html', 'utf8');
  assert.doesNotMatch(thankYou, /event:\s*'generate_lead'|event:\s*"generate_lead"/);
  assert.match(thankYou, /StyerAfterGoogleTag\(function \(\) \{\s*gtag\('js', new Date\(\)\);\s*gtag\('config', 'AW-18028490942', \{ send_page_view: false \}\);/);
  assert.equal((thankYou.match(/gtag\/js\?id=AW-18028490942/g) || []).length, 0);
  const scrub = thankYou.indexOf('strip legacy contact parameters');
  const gtm = thankYou.indexOf('StyerAfterGoogleTag=function');
  const ads = thankYou.indexOf("gtag('config', 'AW-18028490942'");
  assert.ok(scrub !== -1 && scrub < gtm && gtm < ads);
});
