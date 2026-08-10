const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const { qualifyLead } = require('../netlify/functions/lib/lead-qualification');

test('routes a large bank-statement business-owner scenario to priority', () => {
  const result = qualifyLead({
    loan_amount: '$900,000', household_income: '$250,000', credit_score: '680-719',
    loan_goal: 'Bank Statement/Self-Employed', income_type: 'Self-employed business owner',
    property_use: 'Primary residence', under_contract: 'No',
  });
  assert.equal(result.tier, 'priority');
  assert.ok(result.score >= 6);
});

test('does not reject a lower-credit but economically strong investor scenario', () => {
  const result = qualifyLead({
    loan_amount: '$700,000', household_income: '$125,000', credit_score: '580-599',
    loan_goal: 'DSCR/Investor', income_type: 'Investor/DSCR', property_use: 'Investment property',
  });
  assert.equal(result.tier, 'priority');
});

test('routes the low-loan low-income distressed combination to specialized review', () => {
  const result = qualifyLead({
    loan_amount: '$40,000', household_income: '$25,000', credit_score: '580-599',
    loan_goal: 'Cash-Out Refinance', situation: 'Need to pay off a property tax lien',
  });
  assert.equal(result.tier, 'specialized');
});

test('keeps a middle scenario in human review', () => {
  const result = qualifyLead({
    loan_amount: '$225,000', household_income: '$75,000', credit_score: '640-679',
    loan_goal: 'Purchase', income_type: 'W-2 employee',
  });
  assert.equal(result.tier, 'review');
});

test('calendar routing is gated behind qualification', () => {
  const analytics = fs.readFileSync('analytics.js', 'utf8');
  const thankYou = fs.readFileSync('thank-you.html', 'utf8');
  assert.match(analytics, /qualification_started/);
  assert.match(analytics, /get-preapproved\.html\?intent=schedule/);
  assert.match(thankYou, /qualification\.tier === 'priority'/);
  assert.match(thankYou, /id="ty-calendly" hidden/);
});

test('scoring uses only legitimate mortgage and transaction fields', () => {
  const source = fs.readFileSync('netlify/functions/lib/lead-qualification.js', 'utf8');
  assert.doesNotMatch(source, /\b(race|religion|gender|sex|marital|familial|disability|age)\b|national origin/i);
});
