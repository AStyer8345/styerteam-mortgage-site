import assert from 'node:assert/strict';
import test from 'node:test';
import { parseEstimateAssumptions, parseRateMarketConfig, selectRateRange } from '../../netlify/functions/_shared/rate-market.ts';

const market = {
  enabled: true,
  conventional30YearRange: { min: 6.25, max: 6.75 },
  fha30YearRange: { min: 6.0, max: 6.5 },
  va30YearRange: { min: 5.875, max: 6.375 },
  jumbo30YearRange: { min: 6.5, max: 7.0 },
  lastUpdated: '2026-07-17',
  sourceDescription: 'Reviewed staging pricing snapshot',
  expiration: '2026-07-24',
  costStructure: 'unspecified',
};

test('accepts complete date-stamped market configuration and selects by loan type', () => {
  const result = parseRateMarketConfig(JSON.stringify(market), new Date('2026-07-18T12:00:00Z'));
  assert.equal(result.status, 'available');
  assert.deepEqual(selectRateRange(result.config!, 'fha'), { min: 6, max: 6.5 });
});

test('rejects missing, disabled, malformed, and expired market configuration', () => {
  assert.equal(parseRateMarketConfig(undefined).status, 'missing');
  assert.equal(parseRateMarketConfig(JSON.stringify({ ...market, enabled: false })).status, 'disabled');
  assert.equal(parseRateMarketConfig('{bad json').status, 'invalid');
  assert.equal(parseRateMarketConfig(JSON.stringify(market), new Date('2026-07-25T00:00:00Z')).status, 'expired');
});

test('estimate assumptions require reviewed non-expired server configuration', () => {
  const assumptions = parseEstimateAssumptions(JSON.stringify({
    enabled: true,
    reviewedOn: '2026-07-17',
    expiration: '2026-10-15',
    sourceDescription: 'Reviewed Texas planning assumptions',
    propertyTaxAnnualRate: 0.018,
    homeownersInsuranceAnnualRate: 0.006,
    pmiAnnualRate: 0.006,
    closingCostsPercentRange: { min: 0.02, max: 0.04 },
  }), new Date('2026-07-18T00:00:00Z'));
  assert.equal(assumptions.status, 'available');
  assert.equal(assumptions.config?.closingCostsPercentRange.max, 0.04);
});
