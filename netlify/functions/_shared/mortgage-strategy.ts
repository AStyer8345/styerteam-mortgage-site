import type { ConversationTurn } from './conversation-context.ts';
import type { ConfigResult, EstimateAssumptions, RateLoanType, RateMarketConfig } from './rate-market.ts';
import { selectRateRange } from './rate-market.ts';

export type StrategyPath = 'payment' | 'qualification' | 'complex' | 'pricing' | null;
export type CreditRange = 'below_580' | '580_619' | '620_679' | '680_739' | '740_plus' | 'unknown';
export type IncomeType = 'w2' | 'self_employed' | '1099_variable' | 'retired_assets' | 'other' | 'unknown';
export type StrategyPending =
  | 'purchase_price' | 'down_payment' | 'location' | 'property_use' | 'credit_range' | 'hoa' | 'assumed_rate'
  | 'employment_type' | 'gross_income' | 'monthly_debts' | 'available_cash' | 'timeline'
  | 'complex_description'
  | 'transaction_purpose' | 'property_value' | 'loan_amount' | 'property_type' | 'occupancy' | 'closing_date' | 'loan_type'
  | null;

export type StrategyState = {
  path: StrategyPath;
  pendingQuestion: StrategyPending;
  clarificationRequested: boolean;
  valueDelivered: boolean;
  targetPrice: number | null;
  downPaymentAmount: number | null;
  downPaymentPercent: number | null;
  location: string | null;
  propertyUse: 'primary' | 'second_home' | 'investment' | 'unknown';
  creditRange: CreditRange;
  hoaMonthly: number | null;
  assumedRate: number | null;
  incomeType: IncomeType;
  grossMonthlyIncome: number | null;
  monthlyDebts: number | null;
  availableCash: number | null;
  timeline: 'within_30_days' | '31_to_90_days' | 'more_than_90_days' | 'unsure' | 'unknown';
  transactionPurpose: 'purchase' | 'refinance' | 'unknown';
  propertyValue: number | null;
  loanAmount: number | null;
  propertyType: 'single_family' | 'condo' | 'multi_unit' | 'manufactured' | 'other' | 'unknown';
  closingDate: string | null;
  loanType: RateLoanType | 'unknown';
  complexFlags: string[];
  pricingRangeViewed: { loanType: RateLoanType; min: number; max: number; lastUpdated: string } | null;
  recommendedNextAction: 'continue_discovery' | 'scenario_review' | 'rate_review' | 'application' | 'none';
};

export const EMPTY_STRATEGY_STATE: StrategyState = {
  path: null, pendingQuestion: null, clarificationRequested: false, valueDelivered: false, targetPrice: null, downPaymentAmount: null, downPaymentPercent: null,
  location: null, propertyUse: 'unknown', creditRange: 'unknown', hoaMonthly: null, assumedRate: null,
  incomeType: 'unknown', grossMonthlyIncome: null, monthlyDebts: null, availableCash: null, timeline: 'unknown',
  transactionPurpose: 'unknown', propertyValue: null, loanAmount: null, propertyType: 'unknown', closingDate: null, loanType: 'unknown',
  complexFlags: [], pricingRangeViewed: null, recommendedNextAction: 'none',
};

export type StrategyRuntime = {
  market: ConfigResult<RateMarketConfig>;
  assumptions: ConfigResult<EstimateAssumptions>;
};

export type StrategyReply = {
  message: string;
  suggestedReplies: string[];
  strategy: StrategyState;
  responseKind: 'estimate_started' | 'estimate_completed' | 'qualification_started' | 'scenario_assessment' | 'complex_started' | 'pricing_started' | 'pricing_range' | 'pricing_unavailable';
  actions: Array<'contact' | 'application' | 'schedule' | 'rate_review'>;
};

const COMPLEX_SCENARIOS: Record<string, { label: string; potential: string; obstacle: string; facts: string; documents: string }> = {
  self_employed: { label: 'self-employed income', potential: 'Tax-return income, bank-statement, or other reviewed self-employed paths may be relevant.', obstacle: 'The usable income can differ sharply from revenue or cash flow.', facts: 'business structure, ownership share, time self-employed, and how income is received', documents: 'personal and business tax returns, K-1s, year-to-date profit-and-loss information, and possibly bank statements' },
  bank_statement: { label: 'bank-statement qualification', potential: 'A bank-statement program may evaluate deposits rather than relying only on taxable income.', obstacle: 'Transfers, one-time deposits, expense factors, and account type can materially change usable income.', facts: 'personal versus business statements, deposit history, ownership, and recurring business expenses', documents: 'the requested statement period, business ownership evidence, and an expense analysis' },
  variable_income: { label: '1099, commission, bonus, or variable income', potential: 'A documented history and current earnings may support an income calculation.', obstacle: 'Declining, short, or irregular history can limit what is usable.', facts: 'income type, history, year-to-date pace, and likelihood of continuance', documents: 'recent pay records, W-2s or 1099s, tax returns when required, and employer verification' },
  short_self_employment: { label: 'short self-employment history', potential: 'Prior experience in the same field can sometimes matter when the business history is short.', obstacle: 'Many programs require a minimum history and evidence that income is stable.', facts: 'start date, prior occupation, business formation, and current earnings', documents: 'business license or formation records, prior employment history, tax records, and year-to-date financials' },
  physician_contract: { label: 'future physician employment', potential: 'Some programs may consider a signed future employment contract.', obstacle: 'Start date, contingencies, reserves, and program rules can determine whether future income is usable.', facts: 'profession, contract start date, base pay, contingencies, and closing date', documents: 'the fully executed employment contract and evidence of required reserves or credentials' },
  asset_depletion: { label: 'asset depletion', potential: 'Eligible assets may be converted into a calculated monthly income stream under certain programs.', obstacle: 'Asset eligibility, discounts, age, and required reserves can materially change the result.', facts: 'asset type, ownership, accessibility, age, and funds needed to close', documents: 'recent account statements and evidence of ownership and access' },
  rsu: { label: 'RSU income', potential: 'Vested RSU history may be considered when program rules and documentation support continuance.', obstacle: 'Unvested awards, price volatility, and a short vesting history can reduce usable income.', facts: 'vesting history, employer, award schedule, and current value', documents: 'award agreements, vesting statements, pay records, and tax forms' },
  dscr: { label: 'investor or DSCR financing', potential: 'A DSCR path may focus more on property cash flow than personal income.', obstacle: 'Rent, taxes, insurance, HOA, property type, and lender coverage requirements drive the result.', facts: 'purchase price, expected rent, property expenses, occupancy, and investor experience', documents: 'lease or market-rent evidence, property insurance and tax estimates, and entity documents when applicable' },
  short_term_rental: { label: 'short-term rental income', potential: 'Some investor programs may consider short-term-rental revenue with specific documentation.', obstacle: 'Seasonality, management costs, market-rent methods, and local restrictions can make income less predictable.', facts: 'rental history, market, management plan, occupancy, and local rules', documents: 'platform statements, tax returns when applicable, expense history, and property-level reports' },
  buy_before_sell: { label: 'buying before selling', potential: 'Bridge, home-equity, delayed-financing, recast, or qualification-with-both-homes strategies may be worth comparing.', obstacle: 'Available equity, current-home payment, reserves, and sale timing determine which paths are practical.', facts: 'estimated equity, current payment, desired purchase timing, and whether the current home will be sold or rented', documents: 'current mortgage statement, property value support, asset statements, and sale or lease information' },
  keep_as_rental: { label: 'keeping the current home as a rental', potential: 'Documented rental income may offset part of the current housing payment in some scenarios.', obstacle: 'Lease timing, rent evidence, equity, reserves, and landlord history can affect treatment.', facts: 'expected rent, current payment, lease status, equity, and property history', documents: 'mortgage statement, lease, deposit evidence, and property tax and insurance records' },
  bridge: { label: 'bridge financing', potential: 'A bridge or equity-access strategy may help connect the sale and purchase timelines.', obstacle: 'Equity, lien position, carrying costs, and the exit plan are critical.', facts: 'current value and debt, purchase timing, expected sale timing, and cash reserves', documents: 'mortgage statement, value support, asset statements, and purchase or listing information' },
  divorce: { label: 'recent divorce', potential: 'The mortgage impact can often be mapped once ownership, debts, support, and title obligations are clear.', obstacle: 'The decree alone may not remove mortgage liability, and support income or debt needs documentation.', facts: 'property disposition, mortgage liability, support terms, and timing', documents: 'final decree or separation agreement, payment history, and current mortgage statements' },
  employment_change: { label: 'recent employment change', potential: 'A move within the same field or a documented new salary may still support a workable path.', obstacle: 'Gaps, probation, variable pay, or a major field change can require more review.', facts: 'start date, compensation structure, field, employment gaps, and closing date', documents: 'offer letter, recent pay records, employment history, and verification of employment' },
  multiple_properties: { label: 'multiple financed properties', potential: 'Conventional, portfolio, or DSCR strategies may be compared across the property set.', obstacle: 'Reserves, financed-property count, rental-income treatment, and entity ownership add complexity.', facts: 'number of properties, ownership, payments, rents, and reserves', documents: 'mortgage statements, leases, tax returns when required, and reserve statements' },
  major_credit_event: { label: 'bankruptcy, foreclosure, or major credit event', potential: 'Some programs permit financing after defined waiting periods or with documented extenuating circumstances.', obstacle: 'Event type, discharge or completion date, housing history, and rebuilt credit determine the available paths.', facts: 'event type, key dates, current housing history, and credit recovery', documents: 'discharge or completion papers, explanatory documentation, and current credit review through a secure application' },
};

export function parseStrategyState(value: unknown): StrategyState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ...EMPTY_STRATEGY_STATE };
  const item = value as Record<string, unknown>;
  const state: StrategyState = { ...EMPTY_STRATEGY_STATE };
  if (['payment', 'qualification', 'complex', 'pricing'].includes(String(item.path))) state.path = item.path as Exclude<StrategyPath, null>;
  if (STRATEGY_PENDING.includes(item.pendingQuestion as StrategyPending)) state.pendingQuestion = item.pendingQuestion as StrategyPending;
  state.clarificationRequested = item.clarificationRequested === true;
  state.valueDelivered = item.valueDelivered === true;
  for (const key of ['targetPrice', 'downPaymentAmount', 'downPaymentPercent', 'hoaMonthly', 'assumedRate', 'grossMonthlyIncome', 'monthlyDebts', 'availableCash', 'propertyValue', 'loanAmount'] as const) {
    if (typeof item[key] === 'number' && Number.isFinite(item[key]) && item[key] >= 0 && item[key] < 100_000_000) state[key] = item[key] as never;
  }
  if (typeof item.location === 'string' && /^[A-Za-z0-9][A-Za-z0-9 .,'-]{1,79}$/.test(item.location)) state.location = item.location;
  if (['primary', 'second_home', 'investment', 'unknown'].includes(String(item.propertyUse))) state.propertyUse = item.propertyUse as StrategyState['propertyUse'];
  if (CREDIT_RANGES.includes(item.creditRange as CreditRange)) state.creditRange = item.creditRange as CreditRange;
  if (INCOME_TYPES.includes(item.incomeType as IncomeType)) state.incomeType = item.incomeType as IncomeType;
  if (TIMELINES.includes(item.timeline as StrategyState['timeline'])) state.timeline = item.timeline as StrategyState['timeline'];
  if (['purchase', 'refinance', 'unknown'].includes(String(item.transactionPurpose))) state.transactionPurpose = item.transactionPurpose as StrategyState['transactionPurpose'];
  if (['single_family', 'condo', 'multi_unit', 'manufactured', 'other', 'unknown'].includes(String(item.propertyType))) state.propertyType = item.propertyType as StrategyState['propertyType'];
  if (typeof item.closingDate === 'string' && item.closingDate.length <= 80) state.closingDate = item.closingDate;
  if (['conventional', 'fha', 'va', 'jumbo', 'unknown'].includes(String(item.loanType))) state.loanType = item.loanType as StrategyState['loanType'];
  if (Array.isArray(item.complexFlags)) state.complexFlags = item.complexFlags.filter((flag): flag is string => typeof flag === 'string' && flag in COMPLEX_SCENARIOS).slice(0, 8);
  if (item.pricingRangeViewed && typeof item.pricingRangeViewed === 'object') {
    const viewed = item.pricingRangeViewed as Record<string, unknown>;
    if (['conventional', 'fha', 'va', 'jumbo'].includes(String(viewed.loanType)) && typeof viewed.min === 'number' && typeof viewed.max === 'number' && typeof viewed.lastUpdated === 'string') {
      state.pricingRangeViewed = viewed as StrategyState['pricingRangeViewed'];
    }
  }
  if (['continue_discovery', 'scenario_review', 'rate_review', 'application', 'none'].includes(String(item.recommendedNextAction))) state.recommendedNextAction = item.recommendedNextAction as StrategyState['recommendedNextAction'];
  return state;
}

const STRATEGY_PENDING: StrategyPending[] = ['purchase_price', 'down_payment', 'location', 'property_use', 'credit_range', 'hoa', 'assumed_rate', 'employment_type', 'gross_income', 'monthly_debts', 'available_cash', 'timeline', 'complex_description', 'transaction_purpose', 'property_value', 'loan_amount', 'property_type', 'occupancy', 'closing_date', 'loan_type', null];
const CREDIT_RANGES: CreditRange[] = ['below_580', '580_619', '620_679', '680_739', '740_plus', 'unknown'];
const INCOME_TYPES: IncomeType[] = ['w2', 'self_employed', '1099_variable', 'retired_assets', 'other', 'unknown'];
const TIMELINES: StrategyState['timeline'][] = ['within_30_days', '31_to_90_days', 'more_than_90_days', 'unsure', 'unknown'];

export function deriveStrategyState(message: string, supplied: unknown): StrategyState {
  let state = parseStrategyState(supplied);
  const current = message.trim();
  const normalized = current.toLowerCase();
  if (/^estimate payment and cash$/i.test(current)) state = { ...EMPTY_STRATEGY_STATE, path: 'payment' };
  else if (/^see what may qualify$/i.test(current)) state = { ...EMPTY_STRATEGY_STATE, path: 'qualification' };
  else if (/^explain my situation$/i.test(current)) state = { ...EMPTY_STRATEGY_STATE, path: 'complex' };
  else if (/^compare estimated pricing$/i.test(current)) state = { ...EMPTY_STRATEGY_STATE, path: 'pricing' };
  else if (!state.path && /\b(?:estimate|calculate|what would).{0,30}(?:payment|cash to close)|\bpayment estimate\b/i.test(current)) state.path = 'payment';
  else if (!state.path && /\b(?:do i|could i|can i|what may) qualif|\bwhat can i afford\b/i.test(current)) state.path = 'qualification';
  else if (!state.path && /\b(?:rates?|pricing).{0,20}(?:today|right now|current|estimate)|\bwhat are (?:your|the) rates\b/i.test(current)) state.path = 'pricing';
  else if (!state.path && detectComplexScenarios(current).length && /\b(?:i|i'm|im|my|we|our|situation|need|have|am)\b/i.test(current)) state.path = 'complex';
  const detectedComplex = detectComplexScenarios(current);
  if (state.path === 'complex' && detectedComplex.length) state.complexFlags = [...new Set([...state.complexFlags, ...detectedComplex])].slice(0, 8);

  const pending = state.pendingQuestion;
  if (pending && isClarificationRequest(current)) {
    state.clarificationRequested = true;
    return state;
  }
  state.clarificationRequested = false;
  const money = parseMoney(current);
  if (pending === 'purchase_price' && money !== null) state.targetPrice = money;
  if (pending === 'down_payment') {
    const percent = parsePercent(current);
    if (percent !== null) state.downPaymentPercent = percent;
    else if (money !== null) state.downPaymentAmount = money;
  }
  if (pending === 'location') state.location = parseLocation(current);
  if (pending === 'property_use' || pending === 'occupancy') state.propertyUse = parsePropertyUse(normalized);
  if (pending === 'credit_range') state.creditRange = parseCreditRange(normalized);
  if (pending === 'hoa') state.hoaMonthly = /\b(?:no|none|n\/a|not applicable)\b/i.test(current) ? 0 : money;
  if (pending === 'assumed_rate') state.assumedRate = parsePercent(current);
  if (pending === 'employment_type') state.incomeType = parseIncomeType(normalized);
  if (pending === 'gross_income' && money !== null) state.grossMonthlyIncome = /year|annual|annually/i.test(current) ? money / 12 : money;
  if (pending === 'monthly_debts') state.monthlyDebts = /\b(?:no|none|zero|debt[- ]?free)\b/i.test(current) ? 0 : money;
  if (pending === 'available_cash' && money !== null) state.availableCash = money;
  if (pending === 'timeline') state.timeline = parseTimeline(normalized);
  if (pending === 'complex_description') state.complexFlags = detectComplexScenarios(current);
  if (pending === 'transaction_purpose') state.transactionPurpose = /refi/.test(normalized) ? 'refinance' : /buy|purchase/.test(normalized) ? 'purchase' : 'unknown';
  if (pending === 'property_value' && money !== null) state.propertyValue = money;
  if (pending === 'loan_amount') {
    const percent = parsePercent(current);
    if (/down/.test(normalized) && percent !== null) state.downPaymentPercent = percent;
    else if (/down/.test(normalized) && money !== null) state.downPaymentAmount = money;
    else if (money !== null) state.loanAmount = money;
  }
  if (pending === 'property_type') state.propertyType = parsePropertyType(normalized);
  if (pending === 'closing_date' && current.length <= 80) state.closingDate = current;
  if (pending === 'loan_type') state.loanType = parseLoanType(normalized);
  state.pendingQuestion = null;
  return state;
}

export function strategyConversationReply(message: string, strategy: StrategyState, runtime: StrategyRuntime): StrategyReply | null {
  if (!strategy.path) return null;
  if (strategy.clarificationRequested && strategy.pendingQuestion) return pendingQuestionClarification(strategy);
  const directQuestion = /\?$/.test(message.trim()) || /^(?:what|why|how|can|could|should|is|are|do|does|will)\b/i.test(message.trim());
  const openingChoice = /^(?:estimate payment and cash|see what may qualify|explain my situation|compare estimated pricing)$/i.test(message.trim());
  if (strategy.valueDelivered && !openingChoice) return null;
  const startingPath = strategy.pendingQuestion === null && !strategy.valueDelivered;
  if (directQuestion && !openingChoice && !startingPath) return null;
  if (strategy.path === 'payment') return paymentReply(strategy, runtime);
  if (strategy.path === 'qualification') return qualificationReply(strategy);
  if (strategy.path === 'complex') return complexReply(strategy);
  return pricingReply(strategy, runtime);
}

export function calculatePrincipalAndInterest(principal: number, annualRatePercent: number, months = 360): number {
  if (principal <= 0 || months <= 0) return 0;
  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return principal * (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
}

export function calculatePaymentEstimate(input: {
  price: number; downPaymentAmount: number; annualRatePercent: number; hoaMonthly: number; assumptions: EstimateAssumptions; includePmi?: boolean;
}): {
  loanAmount: number; principalAndInterest: number; taxes: number; insurance: number; pmi: number; hoa: number; total: number; cashToCloseMin: number; cashToCloseMax: number;
} {
  const down = Math.max(0, Math.min(input.price, input.downPaymentAmount));
  const loanAmount = input.price - down;
  const downPercent = input.price > 0 ? down / input.price : 0;
  const principalAndInterest = calculatePrincipalAndInterest(loanAmount, input.annualRatePercent);
  const taxes = input.price * input.assumptions.propertyTaxAnnualRate / 12;
  const insurance = input.price * input.assumptions.homeownersInsuranceAnnualRate / 12;
  const pmi = downPercent < 0.2 && input.includePmi !== false ? loanAmount * input.assumptions.pmiAnnualRate / 12 : 0;
  const hoa = Math.max(0, input.hoaMonthly);
  return {
    loanAmount, principalAndInterest, taxes, insurance, pmi, hoa,
    total: principalAndInterest + taxes + insurance + pmi + hoa,
    cashToCloseMin: down + input.price * input.assumptions.closingCostsPercentRange.min,
    cashToCloseMax: down + input.price * input.assumptions.closingCostsPercentRange.max,
  };
}

export function detectComplexScenarios(message: string): string[] {
  const value = message.toLowerCase();
  const matches: Array<[RegExp, string]> = [
    [/self.?employed|own (?:a|my) business/, 'self_employed'], [/bank statements?|deposits instead of tax/, 'bank_statement'], [/1099|commission|bonus|variable income/, 'variable_income'],
    [/self.?employed.{0,40}(?:less than|under|only).{0,15}(?:year|month)|started (?:my|a) business/, 'short_self_employment'], [/physician|doctor.{0,30}(?:contract|new job|starting)/, 'physician_contract'],
    [/asset depletion|asset utilization|live off (?:my )?assets/, 'asset_depletion'], [/\brsus?\b|restricted stock/, 'rsu'], [/\bdscr\b|investor loan|rental property/, 'dscr'],
    [/short.?term rental|airbnb|vrbo/, 'short_term_rental'], [/buy before (?:i )?sell|purchase before selling/, 'buy_before_sell'], [/keep.{0,30}(?:current|old) (?:home|house).{0,30}rent|turn.{0,20}rental/, 'keep_as_rental'],
    [/bridge (?:loan|financing)|bridge the gap/, 'bridge'], [/divorc|separation agreement/, 'divorce'], [/new job|changed jobs?|employment change|job offer/, 'employment_change'],
    [/multiple (?:financed )?(?:properties|homes)|\d+ rental properties/, 'multiple_properties'], [/bankrupt|foreclos|short sale|major credit event/, 'major_credit_event'],
  ];
  return [...new Set(matches.filter(([pattern]) => pattern.test(value)).map(([, flag]) => flag))];
}

export function buildStructuredLeadContext(state: { goal: string; propertyUse: string; timeline: string; shoppingStage: string; purchasePrice: number | null; cashAvailable: number | null; concern: string; intentScore: number; strategy: StrategyState }, sourcePage?: string): Record<string, unknown> {
  const strategy = state.strategy;
  return {
    goal: state.goal, propertyUse: strategy.propertyUse !== 'unknown' ? strategy.propertyUse : state.propertyUse, timeline: strategy.timeline !== 'unknown' ? strategy.timeline : state.timeline,
    shoppingStage: state.shoppingStage, targetPrice: strategy.targetPrice ?? state.purchasePrice, downPaymentAmount: strategy.downPaymentAmount,
    downPaymentPercent: strategy.downPaymentPercent, availableCash: strategy.availableCash ?? state.cashAvailable, creditRange: strategy.creditRange,
    incomeType: strategy.incomeType, approximateGrossMonthlyIncome: strategy.grossMonthlyIncome, approximateMonthlyDebts: strategy.monthlyDebts,
    primaryConcern: state.concern, complexSituationFlags: strategy.complexFlags, pricingRangeViewed: strategy.pricingRangeViewed,
    sourcePage: sourcePage?.slice(0, 200), recommendedNextAction: strategy.recommendedNextAction, leadIntentScore: state.intentScore,
    attachConversationTranscript: true, transcriptRedacted: true,
  };
}

function paymentReply(state: StrategyState, runtime: StrategyRuntime): StrategyReply {
  if (state.targetPrice === null) return ask(state, 'purchase_price', 'What purchase price or range would you like me to model?', [], 'estimate_started');
  if (state.downPaymentAmount === null && state.downPaymentPercent === null) return ask(state, 'down_payment', 'How much would you like to put down—either a dollar amount or percentage?', ['10% down', '20% down', 'I have a dollar amount'], 'estimate_started');
  if (!state.location) return ask(state, 'location', 'What ZIP code or county is the property in?', [], 'estimate_started');
  if (state.propertyUse === 'unknown') return ask(state, 'property_use', 'Will this be your primary home, a second home, or an investment property?', ['Primary home', 'Second home', 'Investment property'], 'estimate_started');
  if (state.creditRange === 'unknown') return ask(state, 'credit_range', 'Which broad credit range is closest? No exact score is needed.', ['620–679', '680–739', '740 or higher'], 'estimate_started');
  if (state.hoaMonthly === null) return ask(state, 'hoa', 'Is there a monthly HOA amount to include?', ['No HOA', '$100 a month', '$250 a month'], 'estimate_started');
  if (runtime.assumptions.status !== 'available' || !runtime.assumptions.config) {
    const next = { ...state, valueDelivered: true, recommendedNextAction: 'scenario_review' as const };
    return { message: 'I have the scenario details, but the reviewed tax, insurance, PMI, and closing-cost assumptions are not currently configured, so I won’t manufacture a total. Adam can run a personalized payment and cash-to-close review with current assumptions.', suggestedReplies: [], strategy: next, responseKind: 'pricing_unavailable', actions: ['contact'] };
  }
  let annualRate = state.assumedRate;
  let rateNote = '';
  let disclosure = '';
  if (runtime.market.status === 'available' && runtime.market.config) {
    const loanType: RateLoanType = state.loanType === 'unknown' ? 'conventional' : state.loanType;
    const range = selectRateRange(runtime.market.config, loanType);
    annualRate = (range.min + range.max) / 2;
    rateNote = `The principal-and-interest illustration uses the ${annualRate.toFixed(3)}% illustrative midpoint of the configured ${loanLabel(loanType)} range (${range.min.toFixed(3)}%–${range.max.toFixed(3)}%), updated ${runtime.market.config.lastUpdated} from ${runtime.market.config.sourceDescription}.`;
    disclosure = RATE_DISCLOSURE;
  }
  if (annualRate === null) return ask(state, 'assumed_rate', 'The current market-range configuration is unavailable. What interest-rate assumption would you like me to use only for this illustration?', [], 'estimate_started');
  const down = downPaymentDollars(state);
  const estimate = calculatePaymentEstimate({ price: state.targetPrice, downPaymentAmount: down, annualRatePercent: annualRate, hoaMonthly: state.hoaMonthly, assumptions: runtime.assumptions.config, includePmi: state.propertyUse !== 'investment' });
  const altDown = down / state.targetPrice < 0.2 ? state.targetPrice * 0.2 : state.targetPrice * 0.1;
  const alternative = calculatePaymentEstimate({ price: state.targetPrice, downPaymentAmount: altDown, annualRatePercent: annualRate, hoaMonthly: state.hoaMonthly, assumptions: runtime.assumptions.config, includePmi: state.propertyUse !== 'investment' });
  const next = { ...state, valueDelivered: true, recommendedNextAction: 'rate_review' as const, pendingQuestion: null };
  const message = [
    `Here’s a planning estimate for a ${money(state.targetPrice)} purchase with ${money(down)} down.`,
    rateNote || `The principal-and-interest illustration uses the ${annualRate.toFixed(3)}% rate assumption you supplied; it is not a current market estimate or quote.`,
    `- Estimated principal and interest: ${money(estimate.principalAndInterest)}/month\n- Estimated property taxes: ${money(estimate.taxes)}/month\n- Estimated homeowners insurance: ${money(estimate.insurance)}/month\n- Estimated mortgage insurance: ${money(estimate.pmi)}/month\n- HOA entered: ${money(estimate.hoa)}/month\n- Estimated total housing payment: ${money(estimate.total)}/month`,
    `Estimated cash to close: ${money(estimate.cashToCloseMin)}–${money(estimate.cashToCloseMax)}. That combines the down payment with the configured closing-cost range; prepaid taxes, insurance, inspections, credits, and final lender/title charges can change it.`,
    `For comparison, using ${money(altDown)} down produces an estimated ${money(alternative.total)}/month total under the same assumptions and an estimated cash-to-close range of ${money(alternative.cashToCloseMin)}–${money(alternative.cashToCloseMax)}.`,
    `Assumptions: property taxes ${(runtime.assumptions.config.propertyTaxAnnualRate * 100).toFixed(2)}% of price annually, homeowners insurance ${(runtime.assumptions.config.homeownersInsuranceAnnualRate * 100).toFixed(2)}%, PMI ${(runtime.assumptions.config.pmiAnnualRate * 100).toFixed(2)}% of loan annually when modeled below 20% down, and closing costs ${(runtime.assumptions.config.closingCostsPercentRange.min * 100).toFixed(1)}%–${(runtime.assumptions.config.closingCostsPercentRange.max * 100).toFixed(1)}%. These are estimates, not exact charges. Taxes, insurance, mortgage insurance, and HOA may be additional or differ from these assumptions.`,
    disclosure,
  ].filter(Boolean).join('\n\n');
  return { message, suggestedReplies: [], strategy: next, responseKind: 'estimate_completed', actions: ['rate_review'] };
}

function qualificationReply(state: StrategyState): StrategyReply {
  if (state.incomeType === 'unknown') return ask(state, 'employment_type', 'How is most of your income earned?', ['W-2 salary', 'Self-employed', '1099 or variable'], 'qualification_started');
  if (state.grossMonthlyIncome === null) return ask(state, 'gross_income', 'About how much is the gross household income—monthly or yearly?', [], 'qualification_started');
  if (state.monthlyDebts === null) return ask(state, 'monthly_debts', 'About how much do the recurring monthly debts total, before a new housing payment?', [], 'qualification_started');
  if (state.creditRange === 'unknown') return ask(state, 'credit_range', 'Which broad credit range is closest?', ['620–679', '680–739', '740 or higher'], 'qualification_started');
  if (state.targetPrice === null) return ask(state, 'purchase_price', 'What purchase price or range are you considering?', [], 'qualification_started');
  if (state.propertyUse === 'unknown') return ask(state, 'property_use', 'Will this be a primary home, second home, or investment property?', ['Primary home', 'Second home', 'Investment property'], 'qualification_started');
  const currentDebtRatio = state.grossMonthlyIncome > 0 ? state.monthlyDebts / state.grossMonthlyIncome * 100 : 0;
  const categories = qualificationCategories(state);
  const uncertainty = state.incomeType === 'self_employed' || state.incomeType === '1099_variable'
    ? 'how much income is usable after program-specific documentation and averaging'
    : 'the full new housing payment, credit details, assets, and automated underwriting result';
  const documents = qualificationDocuments(state.incomeType);
  const next = { ...state, valueDelivered: true, recommendedNextAction: 'scenario_review' as const, pendingQuestion: null };
  const message = `Initial scenario assessment—not a preapproval:\n\n- Potentially relevant categories: ${categories.join('; ')}.\n- Payment consideration: the monthly debts you entered are about ${currentDebtRatio.toFixed(1)}% of the gross monthly income before adding the new housing payment. That is a planning observation, not an approval limit.\n- Primary uncertainty: ${uncertainty}.\n- Documents Adam would likely review securely: ${documents}. Do not upload or paste them into chat.\n- Recommended next step: have Adam review the scenario before you rely on a price or payment target.\n\nFinal eligibility requires a completed application, credit review, verified documentation, and underwriting. No category listed here is a promise that a program is available or that you qualify.`;
  return { message, suggestedReplies: [], strategy: next, responseKind: 'scenario_assessment', actions: ['contact'] };
}

function complexReply(state: StrategyState): StrategyReply {
  if (!state.complexFlags.length) return ask(state, 'complex_description', 'Tell me what makes your income, property, credit, or timing situation unusual.', [], 'complex_started');
  const scenarios = state.complexFlags.map((flag) => COMPLEX_SCENARIOS[flag]).filter(Boolean);
  const labels = scenarios.map((item) => item.label).join(', ');
  const next = { ...state, valueDelivered: true, recommendedNextAction: 'scenario_review' as const, pendingQuestion: null };
  const message = `Here’s the initial strategy read for ${labels}:\n\n- What may potentially work: ${scenarios.map((item) => item.potential).join(' ')}\n- What could be the obstacle: ${scenarios.map((item) => item.obstacle).join(' ')}\n- Facts that change the answer: ${scenarios.map((item) => item.facts).join('; ')}.\n- What Adam would need to review securely: ${scenarios.map((item) => item.documents).join('; ')}. Do not send those documents in chat.\n- Does applying now appear reasonable? A secure application or scenario review is reasonable if you are actively shopping, under contract, or need a decision soon. If you are still exploring, a short scenario review can identify the best documentation path before a full application.\n\nThis is not an underwriting decision or a promise that a program is available.`;
  return { message, suggestedReplies: [], strategy: next, responseKind: 'scenario_assessment', actions: ['contact'] };
}

function pricingReply(state: StrategyState, runtime: StrategyRuntime): StrategyReply {
  if (runtime.market.status !== 'available' || !runtime.market.config) {
    const next = { ...state, valueDelivered: true, recommendedNextAction: 'rate_review' as const };
    return { message: 'I can’t provide a current market estimate because the reviewed, date-stamped pricing configuration is missing, disabled, invalid, or expired. I won’t substitute a number from model memory. Adam can verify actual pricing for this scenario.', suggestedReplies: [], strategy: next, responseKind: 'pricing_unavailable', actions: ['rate_review'] };
  }
  if (state.transactionPurpose === 'unknown') return ask(state, 'transaction_purpose', 'Is this for a purchase or refinance?', ['Purchase', 'Refinance'], 'pricing_started');
  if (state.propertyValue === null) return ask(state, 'property_value', state.transactionPurpose === 'purchase' ? 'What is the purchase price?' : 'What is the estimated property value?', [], 'pricing_started');
  if (state.loanAmount === null && state.downPaymentAmount === null && state.downPaymentPercent === null) return ask(state, 'loan_amount', state.transactionPurpose === 'purchase' ? 'What loan amount or down payment are you considering?' : 'About how much would the new loan be?', [], 'pricing_started');
  if (state.creditRange === 'unknown') return ask(state, 'credit_range', 'Which broad credit range is closest?', ['620–679', '680–739', '740 or higher'], 'pricing_started');
  if (state.propertyType === 'unknown') return ask(state, 'property_type', 'What type of property is it?', ['Single-family home', 'Condo', '2–4 unit property'], 'pricing_started');
  if (state.propertyUse === 'unknown') return ask(state, 'occupancy', 'Will it be a primary home, second home, or investment property?', ['Primary home', 'Second home', 'Investment property'], 'pricing_started');
  if (!state.location) return ask(state, 'location', 'What ZIP code or state is the property in?', [], 'pricing_started');
  if (!state.closingDate) return ask(state, 'closing_date', 'When do you expect to close, or how long a rate lock might you need?', [], 'pricing_started');
  if (state.loanType === 'unknown') return ask(state, 'loan_type', 'Which loan type should I compare, if you know?', ['Conventional', 'FHA', 'VA'], 'pricing_started');
  const loanType: RateLoanType = state.loanType;
  const range = selectRateRange(runtime.market.config, loanType);
  const midpoint = (range.min + range.max) / 2;
  const loanAmount = state.loanAmount ?? Math.max(0, state.propertyValue - downPaymentDollars({ ...state, targetPrice: state.propertyValue }));
  const pi = calculatePrincipalAndInterest(loanAmount, midpoint);
  const next: StrategyState = { ...state, valueDelivered: true, recommendedNextAction: 'rate_review', pendingQuestion: null, pricingRangeViewed: { loanType, min: range.min, max: range.max, lastUpdated: runtime.market.config.lastUpdated } };
  const cost = runtime.market.config.costStructure === 'points' ? 'assumes points' : runtime.market.config.costStructure === 'no_points' ? 'assumes no points' : 'uses an unspecified cost structure';
  const message = `Configured estimated market range:\n\n- Date last updated: ${runtime.market.config.lastUpdated}\n- Source: ${runtime.market.config.sourceDescription}\n- Loan type: ${loanLabel(loanType)}\n- Estimated range: ${range.min.toFixed(3)}%–${range.max.toFixed(3)}%\n- Cost structure: ${cost}\n- Illustrative midpoint: ${midpoint.toFixed(3)}%\n- Estimated principal and interest at the illustrative midpoint: ${money(pi)}/month on ${money(loanAmount)}\n\nRates inside the range may carry different points, credits, and closing costs. Taxes, homeowners insurance, mortgage insurance, and HOA are not included in that principal-and-interest amount and may be additional. No APR is shown because the actual associated fees are not known.\n\n${RATE_DISCLOSURE}\n\nThis does not mean you qualify for the range. Adam can verify actual pricing for the full scenario.`;
  return { message, suggestedReplies: [], strategy: next, responseKind: 'pricing_range', actions: ['rate_review'] };
}

const RATE_DISCLOSURE = 'This is a general market estimate, not a rate quote or offer to lend. Actual pricing depends on credit, loan amount, down payment, property, occupancy, loan program, points, lock period and market conditions.';

const PENDING_QUESTION_HELP: Record<Exclude<StrategyPending, null>, { message: string; suggestedReplies: string[] }> = {
  purchase_price: { message: 'A rough target or range is enough—it does not need to be a final offer price. I use it only to model the loan size and costs. What price or range should I use?', suggestedReplies: [] },
  down_payment: { message: 'Use the amount you would realistically consider, not necessarily the smallest possible down payment. A dollar amount or percentage works, and different structures can be compared later. What amount should I model?', suggestedReplies: ['10% down', '20% down', 'I have a dollar amount'] },
  location: { message: 'The ZIP code or county helps account for differences in property taxes, insurance, and loan limits. What property location should I use?', suggestedReplies: [] },
  property_use: { message: 'Primary means you plan to live there most of the year; a second home is for your own occasional use; an investment property is primarily rented or held for income. Which one best describes the property?', suggestedReplies: ['Primary home', 'Second home', 'Investment property'] },
  credit_range: { message: 'A broad estimate is enough, and this chat does not pull credit. The range helps identify which program categories may be worth reviewing. Which range is closest?', suggestedReplies: ['Below 580', '580–619', '620–679', '680–739', '740 or higher'] },
  hoa: { message: 'Only include a required homeowners or condo association payment here—not utilities, taxes, or insurance. What monthly HOA amount should I include?', suggestedReplies: ['No HOA', '$100 a month', '$250 a month'] },
  assumed_rate: { message: 'This is only a planning assumption for the payment calculation, not a quote or promise of pricing. What rate would you like the illustration to use?', suggestedReplies: [] },
  employment_type: { message: 'I am asking how most qualifying income is received—for example W-2 salary, self-employment, 1099 or commission income, retirement income, or assets. Which is the closest fit?', suggestedReplies: ['W-2 salary', 'Self-employed', '1099 or variable', 'Retirement or assets'] },
  gross_income: { message: 'Gross income means income before taxes, insurance, retirement contributions, and other deductions. Use combined household income if more than one borrower will apply; monthly or annual is fine. About how much is it?', suggestedReplies: [] },
  monthly_debts: { message: 'Count recurring obligations that normally appear on credit or must be included in mortgage qualification: minimum credit-card payments, auto, student, and personal loans, alimony or child support, and payments on other mortgages. Usually do not include utilities, groceries, phone, internet, insurance premiums, or subscriptions here. About what do those monthly debt payments total?', suggestedReplies: ['No monthly debts', '$500 a month', '$1,000 a month'] },
  available_cash: { message: 'A rough amount is enough. Think about funds you could realistically use for the down payment and closing while keeping the reserves you want—do not share account numbers or statements here. About how much would you consider using?', suggestedReplies: [] },
  timeline: { message: 'This is the approximate timing for buying, refinancing, or needing a financing decision; an exact closing date is not required. Which timeframe is closest?', suggestedReplies: ['Within 30 days', '1–3 months', 'More than 3 months', 'Just exploring'] },
  complex_description: { message: 'Share the non-sensitive part that makes the scenario harder than a standard loan—income documentation, another property, credit history, property type, or timing. What is the main complication?', suggestedReplies: [] },
  transaction_purpose: { message: 'A purchase finances a home you are acquiring; a refinance replaces or restructures financing on a property you already own. Which are you considering?', suggestedReplies: ['Purchase', 'Refinance'] },
  property_value: { message: 'For a purchase, use the expected purchase price. For a refinance, use a reasonable estimate of the current property value. What amount should I use?', suggestedReplies: [] },
  loan_amount: { message: 'For a purchase, either the expected loan amount or planned down payment works. For a refinance, use the approximate new loan balance you want. What amount should I use?', suggestedReplies: [] },
  property_type: { message: 'Examples include a single-family home, condo, two-to-four-unit property, or manufactured home. Which type is it?', suggestedReplies: ['Single-family home', 'Condo', '2–4 unit property'] },
  occupancy: { message: 'Primary means you plan to live there most of the year; a second home is for your own occasional use; an investment property is primarily rented or held for income. Which one best describes the property?', suggestedReplies: ['Primary home', 'Second home', 'Investment property'] },
  closing_date: { message: 'A rough expected closing date or lock period is enough because timing can affect available pricing. What timing should I use?', suggestedReplies: [] },
  loan_type: { message: 'If you already have a program in mind, choose it; otherwise conventional is a useful comparison starting point and Adam can review alternatives. Which loan type should I model?', suggestedReplies: ['Conventional', 'FHA', 'VA', 'Use conventional as a starting point'] },
};

function isClarificationRequest(message: string): boolean {
  const value = message.trim().toLowerCase();
  return /^(?:what do you mean|(?:can|could|would) you (?:explain|clarify)|(?:please )?(?:explain|clarify)|i(?:'m| am)? not sure what|what (?:exactly )?(?:counts?|should i (?:include|count)|are you (?:asking|looking) for)|which (?:items?|debts?|payments?)|do i (?:need|have) to (?:include|count)|does .{1,80} count|should i (?:include|count)|is that (?:gross|net|before|after))\b/i.test(value);
}

function pendingQuestionClarification(state: StrategyState): StrategyReply {
  const pending = state.pendingQuestion as Exclude<StrategyPending, null>;
  const help = PENDING_QUESTION_HELP[pending];
  const responseKind: StrategyReply['responseKind'] = state.path === 'payment'
    ? 'estimate_started'
    : state.path === 'qualification'
      ? 'qualification_started'
      : state.path === 'complex'
        ? 'complex_started'
        : 'pricing_started';
  return {
    message: help.message,
    suggestedReplies: help.suggestedReplies,
    strategy: { ...state, clarificationRequested: false, recommendedNextAction: 'continue_discovery' },
    responseKind,
    actions: [],
  };
}

function ask(state: StrategyState, pendingQuestion: StrategyPending, message: string, suggestedReplies: string[], responseKind: StrategyReply['responseKind']): StrategyReply {
  return { message, suggestedReplies, strategy: { ...state, pendingQuestion, clarificationRequested: false, recommendedNextAction: 'continue_discovery' }, responseKind, actions: [] };
}

function downPaymentDollars(state: Pick<StrategyState, 'targetPrice' | 'downPaymentAmount' | 'downPaymentPercent'>): number {
  const price = state.targetPrice || 0;
  if (state.downPaymentAmount !== null) return Math.min(price, state.downPaymentAmount);
  if (state.downPaymentPercent !== null) return price * state.downPaymentPercent / 100;
  return 0;
}

function parseMoney(value: string): number | null {
  const match = value.match(/\$?([\d,.]+)\s*(k|m|thousand|million)?\b/i);
  if (!match) return null;
  const base = Number(match[1].replaceAll(',', ''));
  const suffix = match[2]?.toLowerCase();
  const result = base * (suffix === 'm' || suffix === 'million' ? 1_000_000 : suffix === 'k' || suffix === 'thousand' ? 1_000 : 1);
  return Number.isFinite(result) && result >= 0 ? result : null;
}

function parsePercent(value: string): number | null {
  const match = value.match(/(\d+(?:\.\d+)?)\s*%/);
  if (!match) return null;
  const result = Number(match[1]);
  return Number.isFinite(result) && result >= 0 && result <= 100 ? result : null;
}

function parseLocation(value: string): string | null {
  const clean = value.trim().slice(0, 80);
  return /^(?:\d{5}|[A-Za-z][A-Za-z .,'-]{1,79})$/.test(clean) ? clean : null;
}

function parsePropertyUse(value: string): StrategyState['propertyUse'] {
  if (/primary|live in|owner.?occup/.test(value)) return 'primary';
  if (/second|vacation/.test(value)) return 'second_home';
  if (/investment|rental/.test(value)) return 'investment';
  return 'unknown';
}

function parseCreditRange(value: string): CreditRange {
  if (/below|under/.test(value) && /580/.test(value)) return 'below_580';
  if (/580|600|619/.test(value)) return '580_619';
  if (/620|650|679/.test(value)) return '620_679';
  if (/680|700|720|739/.test(value)) return '680_739';
  if (/740|760|780|800|higher|excellent/.test(value)) return '740_plus';
  return 'unknown';
}

function parseIncomeType(value: string): IncomeType {
  if (/self|business owner/.test(value)) return 'self_employed';
  if (/1099|commission|bonus|variable/.test(value)) return '1099_variable';
  if (/retir|asset|social security|pension/.test(value)) return 'retired_assets';
  if (/w-?2|salary|hourly/.test(value)) return 'w2';
  if (/other/.test(value)) return 'other';
  return 'unknown';
}

function parseTimeline(value: string): StrategyState['timeline'] {
  if (/under contract|asap|within 30|this month/.test(value)) return 'within_30_days';
  if (/31|60|90|1.?3 month|two month|three month/.test(value)) return '31_to_90_days';
  if (/more than|over 3|later|next year|no rush/.test(value)) return 'more_than_90_days';
  if (/not sure|unsure/.test(value)) return 'unsure';
  return 'unknown';
}

function parsePropertyType(value: string): StrategyState['propertyType'] {
  if (/single|house|detached|townhome/.test(value)) return 'single_family';
  if (/condo/.test(value)) return 'condo';
  if (/2.?4|duplex|triplex|fourplex|multi/.test(value)) return 'multi_unit';
  if (/manufactured|mobile/.test(value)) return 'manufactured';
  if (/other/.test(value)) return 'other';
  return 'unknown';
}

function parseLoanType(value: string): StrategyState['loanType'] {
  if (/fha/.test(value)) return 'fha';
  if (/\bva\b/.test(value)) return 'va';
  if (/jumbo/.test(value)) return 'jumbo';
  if (/conventional|conforming/.test(value)) return 'conventional';
  return 'unknown';
}

function qualificationCategories(state: StrategyState): string[] {
  const categories: string[] = [];
  if (state.propertyUse === 'investment') categories.push('conventional investment-property financing', 'DSCR or other investor financing when property cash flow is central');
  else categories.push('conventional financing', 'government-backed financing when occupancy, property, and borrower eligibility fit');
  if (state.incomeType === 'self_employed') categories.push('tax-return and bank-statement self-employed paths');
  if (state.incomeType === '1099_variable') categories.push('variable-income review using documented history');
  if (state.incomeType === 'retired_assets') categories.push('retirement-income or asset-depletion review');
  return categories;
}

function qualificationDocuments(type: IncomeType): string {
  if (type === 'self_employed') return 'tax returns when required, K-1s, business financials, and possibly bank statements';
  if (type === '1099_variable') return '1099s or W-2s, recent earnings records, year-to-date income, and employer or contract documentation';
  if (type === 'retired_assets') return 'award letters, retirement statements, and eligible asset statements';
  return 'recent pay records, W-2s, asset statements, and housing or debt documentation';
}

function loanLabel(type: RateLoanType): string {
  return type === 'fha' ? 'FHA 30-year fixed' : type === 'va' ? 'VA 30-year fixed' : type === 'jumbo' ? 'jumbo 30-year fixed' : 'conventional 30-year fixed';
}

function money(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));
}

export function strategySummary(state: StrategyState): string {
  return [
    state.path ? `Strategy path: ${state.path}` : null,
    state.targetPrice !== null ? `Target price: ${money(state.targetPrice)}` : null,
    state.downPaymentAmount !== null ? `Down payment: ${money(state.downPaymentAmount)}` : state.downPaymentPercent !== null ? `Down payment: ${state.downPaymentPercent}%` : null,
    state.creditRange !== 'unknown' ? `Credit range: ${state.creditRange.replace('_', '–').replace('plus', '+')}` : null,
    state.incomeType !== 'unknown' ? `Income type: ${state.incomeType.replaceAll('_', ' ')}` : null,
    state.complexFlags.length ? `Complex flags: ${state.complexFlags.join(', ')}` : null,
    state.recommendedNextAction !== 'none' ? `Recommended next action: ${state.recommendedNextAction.replaceAll('_', ' ')}` : null,
  ].filter(Boolean).join('; ');
}

export function scriptedConversationState(messages: string[], initial: StrategyState = { ...EMPTY_STRATEGY_STATE }): StrategyState {
  return messages.reduce((state, message) => deriveStrategyState(message, state), initial);
}

export function hasUsefulAnswer(conversation: ConversationTurn[]): boolean {
  return conversation.some((turn) => turn.role === 'assistant' && turn.text.trim().length >= 80);
}
