import assert from 'node:assert/strict';
import test from 'node:test';
import { __resetKnowledgeCacheForTests, retrieveApprovedKnowledge } from '../../netlify/functions/_shared/knowledge.ts';

test('approved knowledge is eligible for grounded substantive answers', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge('What is a bank statement loan?');
  assert.ok(result.results.length > 0);
  assert.ok(result.results.some((item) => item.source === 'bank-statement-loans.md'));
  assert.match(result.version, /^approved-/);
});

test('core FHA credit-score guidance is retrievable', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge("What's the minimum credit score on an FHA loan?");
  assert.ok(result.results.some((item) => item.source === 'core-loan-programs.md' && item.section === 'FHA loans'));
  assert.match(result.results.find((item) => item.section === 'FHA loans')?.text || '', /580/);
});

const commonQuestions = [
  ["What's the difference between interest rate and APR?", 'mortgage-basics.md'],
  ['What is debt-to-income ratio?', 'credit-income-and-underwriting.md'],
  ['Can I use gift funds for my down payment?', 'funds-closing-and-escrow.md'],
  ['What happens if the appraisal is low?', 'property-appraisal-and-insurance.md'],
  ['How does a cash-out refinance work?', 'refinance-and-home-equity.md'],
  ['Do I need 20% down?', 'common-borrower-scenarios.md'],
  ['Why did mortgage rates change today?', 'mortgage-basics.md'],
  ['Should I lock my mortgage rate or float?', 'mortgage-basics.md'],
  ['What happens if my rate lock expires?', 'mortgage-basics.md'],
  ['Why is APR different from the interest rate?', 'mortgage-basics.md'],
] as const;

for (const [question, expectedSource] of commonQuestions) {
  test(`retrieves approved guidance for: ${question}`, async () => {
    __resetKnowledgeCacheForTests();
    const result = await retrieveApprovedKnowledge(question);
    assert.ok(result.results.some((item) => item.source === expectedSource), `${expectedSource} was not retrieved`);
  });
}
