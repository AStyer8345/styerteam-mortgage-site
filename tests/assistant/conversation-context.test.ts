import test from 'node:test';
import assert from 'node:assert/strict';
import { buildContextualQuery, fixedConversationReply } from '../../netlify/functions/_shared/conversation-context.ts';

test('a short purchase reply retains the visitor previous mortgage topic', () => {
  const query = buildContextualQuery('buy', [
    { role: 'user', text: "I'm self employed and my tax returns don't show my true income" },
    { role: 'assistant', text: 'Are you looking to buy, refinance, or finance an investment property?' },
  ]);
  assert.match(query, /self employed/i);
  assert.match(query, /Follow-up answer: buy/);
});

test('a complete new question is not contaminated by old turns', () => {
  const message = 'What is the max DTI on a conventional loan?';
  assert.equal(buildContextualQuery(message, [{ role: 'user', text: 'Tell me about FHA loans' }]), message);
});

test('identity questions receive a direct and friendly disclosure', () => {
  const reply = fixedConversationReply('are you a bot');
  assert.ok(reply);
  assert.match(reply!.message, /AI mortgage assistant/);
  assert.equal(reply!.suggestedReplies?.length, 3);
});
