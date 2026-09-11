const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { makePayload, capture } = require('../situation-journeys.js');
const journeys = require('./fixtures/situation-journeys.json');

test('all five journeys retain intent and every initial answer in the existing intake contract', () => {
  for (const journey of journeys) {
    const data = new FormData();
    const questions = journey.fields.map(([name, label], i) => {
      data.set(name, `answer-${i}`);
      return { name, label };
    });
    data.set('situation', 'Additional information');
    data.set('tcpa_consent', 'on');
    data.set('inquiry_id', 'mock-inquiry-1234');
    const payload = makePayload(data, questions, journey.intent, `https://styermortgage.com/${journey.file}`);
    questions.forEach(({ name, label }) => assert.ok(payload.situation.includes(`${label}: ${data.get(name)}`)));
    assert.ok(payload.situation.includes('Additional context: Additional information'));
    assert.equal(payload.intent, journey.intent);
    assert.equal(payload.inquiry_id, 'mock-inquiry-1234');
    assert.equal(payload.tcpa_consent, true);
    assert.equal(payload.sms_opt_in, false);
  }
});

test('both transports use the same inquiry and never accept false primary receipts', async () => {
  const data = new URLSearchParams({ inquiry_id: 'mock-inquiry-1234', situation: 'test locally' });
  const payload = { inquiry_id: 'mock-inquiry-1234', situation: 'test locally' };
  for (const [netlifyOk, primaryOk, captured, accepted] of [
    [true, false, false, true], [false, true, true, true],
    [false, true, false, false], [false, false, false, false]
  ]) {
    const calls = [];
    const request = async (url, options, timeout) => {
      calls.push({ url, options, timeout });
      return { ok: url === '/' ? netlifyOk : primaryOk, json: async () => ({ success: true, captured }) };
    };
    if (accepted) assert.equal((await capture(payload, data, request)).captured, true);
    else await assert.rejects(capture(payload, data, request), /No capture accepted/);
    assert.equal(calls.length, 2);
    assert.equal(new URLSearchParams(calls[0].options.body).get('inquiry_id'), JSON.parse(calls[1].options.body).inquiry_id);
    calls.forEach(call => assert.equal(call.timeout, 20000));
  }
});

test('network errors reject capture and leave retries to the same inquiry', async () => {
  await assert.rejects(capture({}, new URLSearchParams(), async () => { throw new Error('offline'); }), /No capture accepted/);
});

test('homepage choices target the five short journeys without retiring indexed paths', () => {
  const home = fs.readFileSync('index.html', 'utf8');
  for (const journey of journeys) {
    assert.ok(home.includes(`/${journey.file}?intent=${journey.intent}&amp;source=homepage_situations`));
    const html = fs.readFileSync(journey.file, 'utf8');
    assert.ok(html.includes(`name="intent" value="${journey.file === 'get-preapproved.html' ? 'general' : journey.intent}"`));
    assert.ok(html.includes(`https://styermortgage.com/${journey.file}`));
    assert.ok(html.includes('situation-journeys.js'));
    assert.ok(html.includes('assets/utm.js'));
    assert.ok(html.includes('Apply Now'));
    assert.doesNotMatch(html, /Get My Free Quote|Talk With Adam|Run My DSCR Scenario/);
    journey.fields.forEach(([name]) => assert.ok(html.includes(`name="${name}"`), `${journey.file}: ${name}`));
  }
  assert.ok(fs.existsSync('loans/refinance.html'));
  assert.ok(fs.existsSync('dscr-loan-austin-tx.html'));
});
