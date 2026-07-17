export type RateLoanType = 'conventional' | 'fha' | 'va' | 'jumbo';

export type RateRange = {
  min: number;
  max: number;
};

export type RateMarketConfig = {
  enabled: true;
  conventional30YearRange: RateRange;
  fha30YearRange: RateRange;
  va30YearRange: RateRange;
  jumbo30YearRange: RateRange;
  lastUpdated: string;
  sourceDescription: string;
  expiration: string;
  costStructure: 'points' | 'no_points' | 'unspecified';
};

export type EstimateAssumptions = {
  enabled: true;
  reviewedOn: string;
  expiration: string;
  sourceDescription: string;
  propertyTaxAnnualRate: number;
  homeownersInsuranceAnnualRate: number;
  pmiAnnualRate: number;
  closingCostsPercentRange: RateRange;
};

export type ConfigResult<T> = {
  status: 'available' | 'missing' | 'disabled' | 'expired' | 'invalid';
  config: T | null;
};

export function loadRateMarketConfig(now = new Date()): ConfigResult<RateMarketConfig> {
  return parseRateMarketConfig(Netlify.env.get('MORTGAGE_ASSISTANT_RATE_MARKET_JSON'), now);
}

export function loadEstimateAssumptions(now = new Date()): ConfigResult<EstimateAssumptions> {
  return parseEstimateAssumptions(Netlify.env.get('MORTGAGE_ASSISTANT_ESTIMATE_ASSUMPTIONS_JSON'), now);
}

export function parseRateMarketConfig(raw: string | undefined, now = new Date()): ConfigResult<RateMarketConfig> {
  if (!raw) return { status: 'missing', config: null };
  let value: Record<string, unknown>;
  try { value = JSON.parse(raw) as Record<string, unknown>; } catch { return { status: 'invalid', config: null }; }
  if (value.enabled !== true) return { status: 'disabled', config: null };
  const costStructure = value.costStructure;
  const ranges = {
    conventional30YearRange: parseRange(value.conventional30YearRange, 0.1, 30),
    fha30YearRange: parseRange(value.fha30YearRange, 0.1, 30),
    va30YearRange: parseRange(value.va30YearRange, 0.1, 30),
    jumbo30YearRange: parseRange(value.jumbo30YearRange, 0.1, 30),
  };
  if (!ranges.conventional30YearRange || !ranges.fha30YearRange || !ranges.va30YearRange || !ranges.jumbo30YearRange) return { status: 'invalid', config: null };
  if (!isIsoDate(value.lastUpdated) || !isIsoDate(value.expiration)) return { status: 'invalid', config: null };
  if (typeof value.sourceDescription !== 'string' || value.sourceDescription.trim().length < 5 || value.sourceDescription.length > 240) return { status: 'invalid', config: null };
  if (!['points', 'no_points', 'unspecified'].includes(String(costStructure))) return { status: 'invalid', config: null };
  if (String(value.expiration) < localDate(now)) return { status: 'expired', config: null };
  return {
    status: 'available',
    config: {
      enabled: true,
      ...ranges as Pick<RateMarketConfig, 'conventional30YearRange' | 'fha30YearRange' | 'va30YearRange' | 'jumbo30YearRange'>,
      lastUpdated: String(value.lastUpdated),
      sourceDescription: value.sourceDescription.trim(),
      expiration: String(value.expiration),
      costStructure: costStructure as RateMarketConfig['costStructure'],
    },
  };
}

export function parseEstimateAssumptions(raw: string | undefined, now = new Date()): ConfigResult<EstimateAssumptions> {
  if (!raw) return { status: 'missing', config: null };
  let value: Record<string, unknown>;
  try { value = JSON.parse(raw) as Record<string, unknown>; } catch { return { status: 'invalid', config: null }; }
  if (value.enabled !== true) return { status: 'disabled', config: null };
  const closing = parseRange(value.closingCostsPercentRange, 0, 0.2);
  const tax = finiteBetween(value.propertyTaxAnnualRate, 0, 0.2);
  const insurance = finiteBetween(value.homeownersInsuranceAnnualRate, 0, 0.1);
  const pmi = finiteBetween(value.pmiAnnualRate, 0, 0.1);
  if (!closing || tax === null || insurance === null || pmi === null) return { status: 'invalid', config: null };
  if (!isIsoDate(value.reviewedOn) || !isIsoDate(value.expiration)) return { status: 'invalid', config: null };
  if (typeof value.sourceDescription !== 'string' || value.sourceDescription.trim().length < 5 || value.sourceDescription.length > 240) return { status: 'invalid', config: null };
  if (String(value.expiration) < localDate(now)) return { status: 'expired', config: null };
  return {
    status: 'available',
    config: {
      enabled: true,
      reviewedOn: String(value.reviewedOn),
      expiration: String(value.expiration),
      sourceDescription: value.sourceDescription.trim(),
      propertyTaxAnnualRate: tax,
      homeownersInsuranceAnnualRate: insurance,
      pmiAnnualRate: pmi,
      closingCostsPercentRange: closing,
    },
  };
}

export function selectRateRange(config: RateMarketConfig, loanType: RateLoanType): RateRange {
  if (loanType === 'fha') return config.fha30YearRange;
  if (loanType === 'va') return config.va30YearRange;
  if (loanType === 'jumbo') return config.jumbo30YearRange;
  return config.conventional30YearRange;
}

function parseRange(value: unknown, minAllowed: number, maxAllowed: number): RateRange | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const item = value as Record<string, unknown>;
  const min = finiteBetween(item.min, minAllowed, maxAllowed);
  const max = finiteBetween(item.max, minAllowed, maxAllowed);
  if (min === null || max === null || min > max) return null;
  return { min, max };
}

function finiteBetween(value: unknown, min: number, max: number): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) return null;
  return value;
}

function isIsoDate(value: unknown): boolean {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function localDate(now: Date): string {
  return now.toISOString().slice(0, 10);
}
