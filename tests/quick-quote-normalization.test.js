const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const script = fs.readFileSync('script.js', 'utf8');

test('legacy quote forms normalize field-name variants before lead intake', () => {
  assert.match(script, /formValue\('loanGoal', 'loan_goal', 'loan-purpose', 'loan_purpose'\)/);
  assert.match(script, /formValue\('purchase_price', 'property_value', 'loan_amount', 'loan-amount'\)/);
  assert.match(script, /formValue\('target_city', 'property_location', 'city'\)/);
  assert.match(script, /formValue\('situation', 'notes'\)/);
});

test('legacy quote forms pass persisted first-touch attribution without contact PII in analytics', () => {
  assert.match(script, /styer:first-touch:v1/);
  assert.match(script, /first_touch_source: firstTouch\.first_touch_source/);
  assert.match(script, /entry_referrer: firstTouch\.first_touch_referrer/);
  assert.match(script, /intent: params\.get\('intent'\) \|\| 'quick_quote'/);
  assert.match(script, /cta_label:/);
});
