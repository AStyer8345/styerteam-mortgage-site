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
