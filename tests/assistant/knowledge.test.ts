import assert from 'node:assert/strict';
import test from 'node:test';
import { __resetKnowledgeCacheForTests, retrieveApprovedKnowledge } from '../../netlify/functions/_shared/knowledge.ts';

test('placeholder knowledge is never eligible for substantive answers', async () => {
  __resetKnowledgeCacheForTests();
  const result = await retrieveApprovedKnowledge('What is a bank statement loan?');
  assert.equal(result.results.length, 0);
  assert.match(result.version, /^placeholder-/);
});
