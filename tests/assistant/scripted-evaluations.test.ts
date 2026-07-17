import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { deriveStrategyState, EMPTY_STRATEGY_STATE, strategyConversationReply } from '../../netlify/functions/_shared/mortgage-strategy.ts';
import { parseEstimateAssumptions, parseRateMarketConfig } from '../../netlify/functions/_shared/rate-market.ts';
import { scanSensitiveInput } from '../../netlify/functions/_shared/assistant-safety.ts';

const evaluations = JSON.parse(fs.readFileSync('tests/assistant/fixtures/strategy-evaluations.json', 'utf8')) as Array<{ name: string; messages: string[]; expected: string }>;
const runtime = {
  market: parseRateMarketConfig(JSON.stringify({ enabled: true, conventional30YearRange: { min: 6.25, max: 6.75 }, fha30YearRange: { min: 6, max: 6.5 }, va30YearRange: { min: 5.875, max: 6.375 }, jumbo30YearRange: { min: 6.5, max: 7 }, lastUpdated: '2026-07-17', sourceDescription: 'Reviewed staging snapshot', expiration: '2026-07-24', costStructure: 'unspecified' }), new Date('2026-07-18')),
  assumptions: parseEstimateAssumptions(JSON.stringify({ enabled: true, reviewedOn: '2026-07-17', expiration: '2026-10-15', sourceDescription: 'Reviewed Texas planning assumptions', propertyTaxAnnualRate: 0.018, homeownersInsuranceAnnualRate: 0.006, pmiAnnualRate: 0.006, closingCostsPercentRange: { min: 0.02, max: 0.04 } }), new Date('2026-07-18')),
};

for (const evaluation of evaluations) {
  test(`scripted evaluation: ${evaluation.name}`, () => {
    if (evaluation.expected === 'general_answer') {
      assert.equal(deriveStrategyState(evaluation.messages[0], EMPTY_STRATEGY_STATE).path, null);
      return;
    }
    if (evaluation.expected === 'sensitive_block') {
      assert.equal(scanSensitiveInput(evaluation.messages[0]).blocked, true);
      return;
    }
    let state = { ...EMPTY_STRATEGY_STATE };
    let finalKind = '';
    for (const message of evaluation.messages) {
      state = deriveStrategyState(message, state);
      const reply = strategyConversationReply(message, state, runtime);
      assert.ok(reply, `expected a strategy reply for ${message}`);
      state = reply!.strategy;
      finalKind = reply!.responseKind;
      assert.ok((reply!.message.match(/\?/g) || []).length <= 1, 'responses ask at most one question');
    }
    assert.equal(finalKind, evaluation.expected);
  });
}
