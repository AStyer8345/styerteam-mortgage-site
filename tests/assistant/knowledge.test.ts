import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test, { afterEach, beforeEach, mock } from 'node:test';
import { __resetKnowledgeCacheForTests, retrieveApprovedKnowledge } from '../../netlify/functions/_shared/knowledge.ts';

// Ranking tests use the corpus's known review window, not the wall clock.
// This does not extend an approval: the separate boundary test below checks
// the production loader's expiry rule against the file's actual metadata.
const REVIEW_WINDOW_FIXTURE = new Date('2026-08-30T12:00:00.000Z');

beforeEach(() => {
  mock.timers.enable({ apis: ['Date'], now: REVIEW_WINDOW_FIXTURE });
  __resetKnowledgeCacheForTests();
});

afterEach(() => {
  mock.timers.reset();
  __resetKnowledgeCacheForTests();
});

test('approved knowledge is eligible for grounded substantive answers', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge('What is a bank statement loan?');
  assert.ok(result.results.length > 0);
  assert.ok(result.results.some((item) => item.source === 'bank-statement-loans.md'));
  assert.match(result.version, /^approved-/);
});

test('company identity is retrievable for natural employer questions', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge('Who does Adam work for and what company is this?');
  const company = result.results.find((item) => item.source === 'company-information.md');
  assert.ok(company);
  assert.match(company!.text, /Kyber Mortgage Corporation/i);
  assert.match(company!.text, /HyperSmart Home Loans/i);
  assert.match(company!.text, /Do not say that his company or employer is unknown/i);
});

test('core FHA credit-score guidance is retrievable', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge("What's the minimum credit score on an FHA loan?");
  assert.ok(result.results.some((item) => item.source === 'core-loan-programs.md' && item.section === 'FHA loans'));
  assert.match(result.results.find((item) => item.section === 'FHA loans')?.text || '', /580/);
});

test('conventional DTI guidance is retrievable using the failed live wording', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge('what is the max dti on a conventional loan');
  assert.ok(result.results.some((item) => /50%|45%/.test(item.text)));
});

test('VA credit guidance is retrievable using conversational wording', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge('what is a good credit score on a va loan');
  assert.ok(result.results.some((item) => /no universal minimum/i.test(item.text)));
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

test('knowledge loader excludes expired content after its final approved UTC day', async () => {
  const filename = 'bank-statement-loans.md';
  const source = await fs.readFile(path.join(process.cwd(), 'ai-knowledge', filename), 'utf8');
  const expiry = source.match(/^review_expires_on:\s*(\d{4}-\d{2}-\d{2})\s*$/m);
  assert.ok(expiry, 'The expiry check requires a dated approved knowledge file');
  const lastApprovedMillisecond = new Date(`${expiry[1]}T23:59:59.999Z`).getTime();

  mock.timers.setTime(lastApprovedMillisecond);
  __resetKnowledgeCacheForTests();
  const onExpiryDate = await retrieveApprovedKnowledge('What is a bank statement loan?', 100);
  assert.ok(onExpiryDate.results.some((item) => item.source === filename));

  mock.timers.setTime(lastApprovedMillisecond + 1);
  __resetKnowledgeCacheForTests();
  const afterExpiryDate = await retrieveApprovedKnowledge('What is a bank statement loan?', 100);
  assert.ok(afterExpiryDate.results.every((item) => item.source !== filename), 'Expired content must be excluded even when it directly matches the question');
});
