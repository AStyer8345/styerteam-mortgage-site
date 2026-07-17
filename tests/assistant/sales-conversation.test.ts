import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveSalesState, salesStateSummary } from '../../netlify/functions/_shared/sales-conversation.ts';
import { salesPlaybook } from '../../netlify/functions/_shared/sales-playbooks.ts';
import { evaluateConversation } from '../../netlify/functions/_shared/conversation-quality.ts';

test('derives a high-intent purchase state without using protected characteristics', () => {
  const state = deriveSalesState('I am buying a primary home in Texas and hope to make an offer this month. My credit worries me.', [], null);
  assert.equal(state.goal, 'purchase');
  assert.equal(state.propertyUse, 'primary');
  assert.equal(state.timeline, 'within_30_days');
  assert.equal(state.concern, 'credit');
  assert.equal(state.stage, 'ready');
  assert.match(salesStateSummary(state), /Goal: purchase/);
});

test('merges validated prior state when early details leave the recent transcript', () => {
  const state = deriveSalesState('Mostly business bank deposits', [], { goal: 'purchase', propertyUse: 'primary', timeline: '31_to_90_days', concern: 'income', intentScore: 7 });
  assert.equal(state.goal, 'purchase');
  assert.equal(state.concern, 'income');
  assert.equal(state.stage, 'ready');
});

test('selects value-first playbook guidance by stage and concern', () => {
  const state = deriveSalesState('I am self employed and buying an investment property', [], null);
  const playbook = salesPlaybook(state);
  assert.match(playbook, /INVESTMENT/);
  assert.match(playbook, /INCOME CONCERN/);
  assert.doesNotMatch(playbook, /push/i);
});

test('conversation evaluator catches repeated and interrogating answers', () => {
  const result = evaluateConversation([
    { role: 'user', text: 'I want to buy' },
    { role: 'assistant', text: 'When? Where? What price?' },
    { role: 'user', text: 'Soon' },
    { role: 'assistant', text: 'When? Where? What price?' },
  ]);
  assert.ok(result.flags.includes('multiple_questions'));
  assert.ok(result.flags.includes('repeated_answer'));
  assert.ok(result.score < 100);
});
