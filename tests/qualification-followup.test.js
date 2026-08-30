const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const thankYou = fs.readFileSync('thank-you.html', 'utf8');

test('pre-approval enrichment happens only after the primary lead is captured', () => {
  assert.match(thankYou, /id="ty-qualification-details" hidden/);
  assert.match(thankYou, /name="qualification-followup"/);
  assert.match(thankYou, /name="form-name" value="qualification-followup"/);
  assert.match(thankYou, /type === 'qualification'[\s\S]*qualificationDetails\.hidden = false/);
  assert.match(thankYou, /styer:qualification-contact/);
  assert.match(thankYou, /fetch\('\/'[\s\S]*qualification-followup/);
});

test('optional enrichment captures attribution without adding sensitive document requests', () => {
  assert.match(thankYou, /How did you find Adam\?/);
  assert.match(thankYou, /ChatGPT or another AI assistant/);
  assert.match(thankYou, /name="income_type"/);
  assert.match(thankYou, /name="property_use"/);
  assert.match(thankYou, /name="credit_score"/);
  assert.match(thankYou, /name="documentation_issue"/);
  assert.match(thankYou, /name="preferred_contact"/);
  assert.doesNotMatch(thankYou, /qualification-followup[\s\S]{0,5000}(upload|social security|tax return upload)/i);
});

test('qualification follow-up analytics do not include contact PII', () => {
  const eventBlock = thankYou.match(/event: 'qualification_followup_submitted'[\s\S]*?\}\);/)?.[0] || '';
  assert.match(eventBlock, /referral_source/);
  assert.doesNotMatch(eventBlock, /email|phone|original_name/);
});
