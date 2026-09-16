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

test('homepage conversation replaces product choices without retiring specialist journeys', () => {
  const home = fs.readFileSync('index.html', 'utf8');
  assert.ok(home.includes('id="form-homepage-contact"'));
  assert.ok(home.includes('href="#contact-form"'));
  assert.ok(home.includes('/products.html'));
  assert.ok(home.includes('/situation-journeys.js'));
  for (const journey of journeys) {
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

test('backup acceptance is immediate even while the primary is pending', async () => {
  let finishPrimary;
  const pending = new Promise(resolve => { finishPrimary = resolve; });
  const result = await capture({inquiry_id:'test-pending-123'}, new URLSearchParams({inquiry_id:'test-pending-123'}), url => url === '/' ? Promise.resolve({ok:true}) : pending);
  assert.equal(result.primary, false);
  finishPrimary({ok:false});
});

test('primary acceptance is immediate even while the backup is pending', async () => {
  let finishBackup;
  const pending = new Promise(resolve => { finishBackup = resolve; });
  const result = await capture({}, new URLSearchParams(), url => url === '/' ? pending : Promise.resolve({ok:true,json:async()=>({captured:true})}));
  assert.equal(result.primary, true);
  finishBackup({ok:false});
});

test('redirected HTML and malformed primary receipts are not capture proof', async () => {
  await assert.rejects(capture({}, new URLSearchParams(), async url => url==='/' ? {ok:true,redirected:true} : {ok:true,json:async()=>{throw Error('HTML response');}}), /No capture accepted/);
});

 test('goal-only homepage inquiries retain their purpose without a required message', () => {
  const data = new URLSearchParams({name:'Local Test',email:'local@example.invalid',loan_goal:'Build','form-name':'contact',message:''});
  const payload = makePayload(data, [], 'construction', 'https://styermortgage.com/');
  assert.equal(payload.loan_goal, 'Build');
  assert.equal(payload.situation, 'Financing goal: Build');
  assert.equal(payload.intent, 'construction');
 });
