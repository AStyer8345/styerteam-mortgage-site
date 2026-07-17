import assert from 'node:assert/strict';
import test from 'node:test';
import { buildStructuredLeadContext, calculatePaymentEstimate, calculatePrincipalAndInterest, deriveStrategyState, detectComplexScenarios, EMPTY_STRATEGY_STATE, strategyConversationReply, type StrategyRuntime, type StrategyState } from '../../netlify/functions/_shared/mortgage-strategy.ts';
import { parseEstimateAssumptions, parseRateMarketConfig } from '../../netlify/functions/_shared/rate-market.ts';

const marketRaw = JSON.stringify({
  enabled: true, conventional30YearRange: { min: 6.25, max: 6.75 }, fha30YearRange: { min: 6, max: 6.5 }, va30YearRange: { min: 5.875, max: 6.375 }, jumbo30YearRange: { min: 6.5, max: 7 },
  lastUpdated: '2026-07-17', sourceDescription: 'Reviewed staging snapshot', expiration: '2026-07-24', costStructure: 'unspecified',
});
const assumptionsRaw = JSON.stringify({
  enabled: true, reviewedOn: '2026-07-17', expiration: '2026-10-15', sourceDescription: 'Reviewed Texas planning assumptions',
  propertyTaxAnnualRate: 0.018, homeownersInsuranceAnnualRate: 0.006, pmiAnnualRate: 0.006, closingCostsPercentRange: { min: 0.02, max: 0.04 },
});
const runtime: StrategyRuntime = { market: parseRateMarketConfig(marketRaw, new Date('2026-07-18')), assumptions: parseEstimateAssumptions(assumptionsRaw, new Date('2026-07-18')) };

test('monthly principal and interest uses deterministic amortization math', () => {
  assert.equal(Math.round(calculatePrincipalAndInterest(400_000, 6.5)), 2528);
});

test('payment estimate returns itemized payment and cash-to-close range', () => {
  const result = calculatePaymentEstimate({ price: 500_000, downPaymentAmount: 50_000, annualRatePercent: 6.5, hoaMonthly: 100, assumptions: runtime.assumptions.config! });
  assert.equal(Math.round(result.principalAndInterest), 2844);
  assert.equal(Math.round(result.taxes), 750);
  assert.equal(Math.round(result.insurance), 250);
  assert.equal(Math.round(result.pmi), 225);
  assert.equal(Math.round(result.total), 4169);
  assert.equal(result.cashToCloseMin, 60_000);
  assert.equal(result.cashToCloseMax, 70_000);
});

test('payment path asks one question at a time, never asks for a name, and does not repeat known facts', () => {
  let state = deriveStrategyState('Estimate payment and cash', EMPTY_STRATEGY_STATE);
  let reply = strategyConversationReply('Estimate payment and cash', state, runtime)!;
  assert.equal(reply.strategy.pendingQuestion, 'purchase_price');
  assert.doesNotMatch(reply.message, /name|call you/i);

  state = deriveStrategyState('$500,000', reply.strategy);
  reply = strategyConversationReply('$500,000', state, runtime)!;
  assert.equal(reply.strategy.pendingQuestion, 'down_payment');
  assert.doesNotMatch(reply.message, /purchase price/i);

  state = deriveStrategyState('10% down', reply.strategy);
  reply = strategyConversationReply('10% down', state, runtime)!;
  assert.equal(reply.strategy.pendingQuestion, 'location');
});

test('completed payment estimate identifies every assumption and compares down-payment approaches', () => {
  const state: StrategyState = {
    ...EMPTY_STRATEGY_STATE, path: 'payment', targetPrice: 500_000, downPaymentPercent: 10, location: '78704', propertyUse: 'primary', creditRange: '740_plus', hoaMonthly: 0,
  };
  const reply = strategyConversationReply('No HOA', state, runtime)!;
  assert.equal(reply.responseKind, 'estimate_completed');
  assert.match(reply.message, /principal and interest/i);
  assert.match(reply.message, /property taxes/i);
  assert.match(reply.message, /mortgage insurance/i);
  assert.match(reply.message, /cash to close/i);
  assert.match(reply.message, /For comparison/i);
  assert.match(reply.message, /general market estimate, not a rate quote or offer to lend/i);
});

test('pricing refuses missing or expired configuration and never invents a rate', () => {
  const state: StrategyState = { ...EMPTY_STRATEGY_STATE, path: 'pricing', transactionPurpose: 'purchase', propertyValue: 500_000, downPaymentPercent: 20, creditRange: '740_plus', propertyType: 'single_family', propertyUse: 'primary', location: '78704', closingDate: '45 days', loanType: 'conventional' };
  const missing = strategyConversationReply('Conventional', state, { ...runtime, market: { status: 'missing', config: null } })!;
  assert.equal(missing.responseKind, 'pricing_unavailable');
  assert.match(missing.message, /won’t substitute a number from model memory/i);
  assert.doesNotMatch(missing.message, /\d+\.\d+%/);
});

test('configured pricing uses only an illustrative midpoint, required disclosure, and no APR calculation', () => {
  const state: StrategyState = { ...EMPTY_STRATEGY_STATE, path: 'pricing', transactionPurpose: 'purchase', propertyValue: 500_000, downPaymentPercent: 20, creditRange: '740_plus', propertyType: 'single_family', propertyUse: 'primary', location: '78704', closingDate: '45 days', loanType: 'conventional' };
  const reply = strategyConversationReply('Conventional', state, runtime)!;
  assert.equal(reply.responseKind, 'pricing_range');
  assert.match(reply.message, /Date last updated: 2026-07-17/);
  assert.match(reply.message, /Illustrative midpoint: 6\.500%/);
  assert.doesNotMatch(reply.message, /your rate/i);
  assert.match(reply.message, /No APR is shown because the actual associated fees are not known/);
  assert.match(reply.message, /Taxes, homeowners insurance, mortgage insurance, and HOA.*may be additional/);
});

test('detects all required complex-situation families', () => {
  const samples = [
    ['I am self-employed', 'self_employed'], ['I need bank statements instead of tax returns', 'bank_statement'], ['My income is 1099 and commission', 'variable_income'],
    ['I started my business six months ago', 'short_self_employment'], ['I am a physician starting a new job with a contract', 'physician_contract'], ['Can asset depletion work?', 'asset_depletion'],
    ['Most of my compensation is RSUs', 'rsu'], ['I am an investor asking about DSCR', 'dscr'], ['This will be an Airbnb short-term rental', 'short_term_rental'],
    ['I need to buy before I sell', 'buy_before_sell'], ['I want to keep my current home and rent it', 'keep_as_rental'], ['Could bridge financing work?', 'bridge'],
    ['My divorce was recent', 'divorce'], ['I changed jobs last month', 'employment_change'], ['I have multiple financed properties', 'multiple_properties'], ['I had a bankruptcy', 'major_credit_event'],
  ] as const;
  for (const [message, expected] of samples) assert.ok(detectComplexScenarios(message).includes(expected), `${expected} was not detected`);
});

test('complex assessment explains paths, obstacles, facts, documents, and applying now', () => {
  const state = deriveStrategyState('I need to buy before I sell', { ...EMPTY_STRATEGY_STATE, path: 'complex', pendingQuestion: 'complex_description' });
  const reply = strategyConversationReply('I need to buy before I sell', state, runtime)!;
  assert.equal(reply.responseKind, 'scenario_assessment');
  assert.match(reply.message, /What may potentially work/);
  assert.match(reply.message, /What could be the obstacle/);
  assert.match(reply.message, /Facts that change the answer/);
  assert.match(reply.message, /What Adam would need to review/);
  assert.match(reply.message, /Does applying now appear reasonable/);
  assert.doesNotMatch(reply.message, /you qualify|you are approved/i);
});

test('qualification result is explicitly an initial assessment, not a preapproval', () => {
  const state: StrategyState = { ...EMPTY_STRATEGY_STATE, path: 'qualification', incomeType: 'self_employed', grossMonthlyIncome: 20_000, monthlyDebts: 2_000, creditRange: '680_739', targetPrice: 700_000, propertyUse: 'primary' };
  const reply = strategyConversationReply('$700,000', state, runtime)!;
  assert.equal(reply.responseKind, 'scenario_assessment');
  assert.match(reply.message, /Initial scenario assessment—not a preapproval/);
  assert.match(reply.message, /Potentially relevant categories/);
  assert.match(reply.message, /Final eligibility requires a completed application/);
});

test('structured lead context contains strategy facts and transcript attachment instructions', () => {
  const state: StrategyState = { ...EMPTY_STRATEGY_STATE, path: 'complex', targetPrice: 700_000, creditRange: '680_739', incomeType: 'self_employed', grossMonthlyIncome: 20_000, monthlyDebts: 2_000, complexFlags: ['self_employed'], recommendedNextAction: 'scenario_review' };
  const context = buildStructuredLeadContext({ goal: 'purchase', propertyUse: 'primary', timeline: '31_to_90_days', shoppingStage: 'actively_shopping', purchasePrice: 700_000, cashAvailable: 150_000, concern: 'income', intentScore: 8, strategy: state }, 'https://adamstyer.com/self-employed');
  assert.equal(context.targetPrice, 700_000);
  assert.equal(context.creditRange, '680_739');
  assert.deepEqual(context.complexSituationFlags, ['self_employed']);
  assert.equal(context.attachConversationTranscript, true);
  assert.equal(context.transcriptRedacted, true);
  assert.equal(context.leadIntentScore, 8);
});
