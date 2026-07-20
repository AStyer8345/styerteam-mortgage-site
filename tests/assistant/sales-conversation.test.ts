import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveSalesState, guidedConversationReply, salesNextStepReply, salesStateSummary } from '../../netlify/functions/_shared/sales-conversation.ts';
import { salesPlaybook } from '../../netlify/functions/_shared/sales-playbooks.ts';
import { evaluateConversation } from '../../netlify/functions/_shared/conversation-quality.ts';
import { allowsResourceRecommendation, checkDiscoveryLanguage, checkGeneralAnswerLanguage } from '../../netlify/functions/_shared/conversation-policy.ts';

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

test('high-intent next-step questions produce a direct handoff instead of a fallback', () => {
  const state = deriveSalesState('I am buying in Texas this month and I am worried about credit', [], null);
  const reply = salesNextStepReply('What should I do next?', state);
  assert.ok(reply);
  assert.match(reply!.message, /scenario review/i);
  assert.match(reply!.message, /review form/i);
  assert.doesNotMatch(reply!.message, /What outcome are you hoping for/i);
});

test('purchase discovery advances one question at a time without assuming a program or calculator', () => {
  let state = deriveSalesState('Buying a home', [], null);
  let reply = guidedConversationReply('Buying a home', state)!;
  assert.equal(reply.salesState.pendingQuestion, 'shopping_stage');
  assert.doesNotMatch(reply.message, /name|call you/i);
  assert.doesNotMatch(reply.message, /3%|FHA|calculator/i);

  state = deriveSalesState("I'm still figuring it out", [], reply.salesState);
  reply = guidedConversationReply("I'm still figuring it out", state, 'shopping_stage')!;
  assert.equal(reply.salesState.pendingQuestion, 'property_use');
  assert.doesNotMatch(reply.message, /calculator/i);

  state = deriveSalesState('My primary residence', [], reply.salesState);
  reply = guidedConversationReply('My primary residence', state, 'property_use')!;
  assert.equal(reply.salesState.pendingQuestion, 'timeline');

  state = deriveSalesState('More than 3 months from now', [], reply.salesState);
  assert.equal(state.timeline, 'more_than_90_days');
  reply = guidedConversationReply('More than 3 months from now', state, 'timeline')!;
  assert.doesNotMatch(reply.message, /bluff|outcome are you hoping|calculator/i);
});

test('high-price high-cash discovery explores strategy instead of minimum down payment', () => {
  let state = deriveSalesState('$2 million', [], {
    ...deriveSalesState('Buying a primary home', [], null),
    visitorName: 'Sarah', shoppingStage: 'price_range', pendingQuestion: 'price_range',
  });
  assert.equal(state.purchasePrice, 2_000_000);
  state.timeline = 'more_than_90_days';
  let reply = guidedConversationReply('$2 million', state, 'price_range')!;
  assert.equal(reply.salesState.pendingQuestion, 'cash_strategy');
  assert.doesNotMatch(reply.message, /minimum|3%|calculator|afford/i);

  state = deriveSalesState('$1 million', [], reply.salesState);
  assert.equal(state.cashAvailable, 1_000_000);
  reply = guidedConversationReply('$1 million', state, 'cash_strategy')!;
  assert.equal(reply.salesState.pendingQuestion, 'priority');
  assert.match(reply.message, /keeping more cash|monthly payment|long-term cost/i);
});

test('cash choices advance and direct mortgage questions escape guided discovery', () => {
  const base = { ...deriveSalesState('Buying a primary home', [], null), shoppingStage: 'price_range' as const, purchasePrice: 500_000, timeline: '31_to_90_days' as const, pendingQuestion: 'cash_strategy' as const };
  let state = deriveSalesState('I have an amount in mind', [], base);
  let reply = guidedConversationReply('I have an amount in mind', state, 'cash_strategy')!;
  assert.equal(reply.salesState.pendingQuestion, 'cash_amount');
  assert.match(reply.message, /roughly how much cash/i);

  state = deriveSalesState('I want to preserve cash', [], base);
  reply = guidedConversationReply('I want to preserve cash', state, 'cash_strategy')!;
  assert.notEqual(reply.salesState.pendingQuestion, 'cash_strategy');

  const direct = 'I want to know how much I need to put down and what the minimum credit score is';
  state = deriveSalesState(direct, [], base);
  assert.equal(guidedConversationReply(direct, state, 'cash_strategy'), null);
});

test('a goal answer to a topical question stays with the knowledge path', () => {
  // Regression: "I'm self employed…" then "buy" must continue the
  // self-employed discussion, not restart scripted discovery.
  const state = deriveSalesState('buy', [
    { role: 'user', text: "I'm self employed and my tax returns don't show my true income." },
    { role: 'assistant', text: 'Are you looking to buy, refinance, or finance an investment property?' },
  ], null);
  assert.equal(state.concern, 'income');
  assert.equal(guidedConversationReply('buy', state), null);
  // Concern-free goal choices still enter the guided conversation.
  const fresh = deriveSalesState('Buying a home', [], null);
  assert.ok(guidedConversationReply('Buying a home', fresh));
});

test('the assumption checker blocks products, calculators, CTAs, and invented rates during discovery', () => {
  assert.deepEqual(checkDiscoveryLanguage('That helps. When would you like to move?', 'timeline'), { safe: true });
  assert.equal(checkDiscoveryLanguage('An FHA loan may fit. When would you like to move?', 'timeline').safe, false);
  assert.equal(checkDiscoveryLanguage('Try the calculator. When would you like to move?', 'timeline').safe, false);
  assert.equal(checkDiscoveryLanguage('You can put 3% down. When would you like to move?', 'timeline').safe, false);
  assert.equal(checkDiscoveryLanguage('When are you moving? What price?', 'timeline').safe, false);
});

test('general answers must use the director question and cannot invent a rate-and-payment illustration', () => {
  const required = 'What purchase price are you considering?';
  assert.deepEqual(checkGeneralAnswerLanguage(`A co-borrower may help if their qualifying income is included.\n\n${required}`, required), { safe: true });
  assert.equal(checkGeneralAnswerLanguage(`Would your mom live there?\n\n${required}`, required).safe, false);
  assert.equal(checkGeneralAnswerLanguage(`A $300,000 loan at 7% would have a payment near $1,996.\n\n${required}`, required).safe, false);
  assert.equal(checkGeneralAnswerLanguage('A co-borrower may help. What matters most?', required).safe, false);
});

test('calculator gate opens only when the visitor asks for numbers', () => {
  assert.equal(allowsResourceRecommendation('I am buying a home'), false);
  assert.equal(allowsResourceRecommendation('Can you estimate my monthly payment?'), true);
});

test('refinance and investment use separate deterministic discovery maps', () => {
  let state = deriveSalesState('Refinancing', [], null);
  state.visitorName = 'Sarah';
  let reply = guidedConversationReply('Refinancing', state)!;
  assert.equal(reply.salesState.pendingQuestion, 'refinance_goal');
  state = deriveSalesState('Lower my monthly payment', [], reply.salesState);
  assert.equal(state.concern, 'payment');

  state = deriveSalesState('Investment property', [], null);
  state.visitorName = 'Sarah';
  reply = guidedConversationReply('Investment property', state)!;
  assert.equal(reply.salesState.pendingQuestion, 'investment_goal');
  state = deriveSalesState('Simpler income documentation', [], reply.salesState);
  assert.equal(state.concern, 'income');
});
