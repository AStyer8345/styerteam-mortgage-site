import test from 'node:test';
import assert from 'node:assert/strict';
import { buildContextualQuery, computeSequenceStart, fixedConversationReply } from '../../netlify/functions/_shared/conversation-context.ts';

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

test('thanks and goodbyes receive a warm close instead of the knowledge fallback', () => {
  for (const value of ['thanks', 'Thank you!', 'that helps', "that's all", "I'm good"]) {
    const reply = fixedConversationReply(value);
    assert.ok(reply, `expected a fixed reply for "${value}"`);
    assert.doesNotMatch(reply!.message, /bluff/i);
  }
  assert.equal(fixedConversationReply('thanks, but what about FHA loans?'), null);
});

test('sequence numbers come from the widget turn count and never regress', () => {
  assert.equal(computeSequenceStart(0, 0), 1);
  assert.equal(computeSequenceStart(12, 8), 13);
  // A capped prior-turn list must not shrink the sequence for long conversations.
  assert.equal(computeSequenceStart(40, 16), 41);
  // Missing or invalid turn counts fall back to the prior-turn window.
  assert.equal(computeSequenceStart(undefined, 4), 5);
  assert.equal(computeSequenceStart('9' as unknown, 4), 5);
  assert.equal(computeSequenceStart(-3, 4), 5);
  assert.equal(computeSequenceStart(2.5, 4), 5);
  assert.equal(computeSequenceStart(999999, 4), 5);
  // The prior-turn window still wins when it is larger than a stale count.
  assert.equal(computeSequenceStart(2, 6), 7);
});
