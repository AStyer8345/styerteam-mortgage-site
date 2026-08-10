// Legitimate mortgage/business-fit scoring only. Do not add protected traits or proxies.
const DEFAULTS = Object.freeze({
  minPriorityLoanAmount: 250000,
  highValueLoanAmount: 750000,
  jumboThreshold: 832750,
  lowLoanAmount: 100000,
  lowCreditThreshold: 600,
  lowIncomeThreshold: 40000,
  highIncomeThreshold: 200000,
  minDirectSchedulingScore: 6,
  maxSpecializedScore: -3,
});

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
}

function getQualificationConfig() {
  return {
    minPriorityLoanAmount: envNumber('MIN_PRIORITY_LOAN_AMOUNT', DEFAULTS.minPriorityLoanAmount),
    highValueLoanAmount: envNumber('HIGH_VALUE_LOAN_AMOUNT', DEFAULTS.highValueLoanAmount),
    jumboThreshold: envNumber('JUMBO_THRESHOLD', DEFAULTS.jumboThreshold),
    lowLoanAmount: envNumber('LOW_LOAN_AMOUNT', DEFAULTS.lowLoanAmount),
    lowCreditThreshold: envNumber('LOW_CREDIT_THRESHOLD', DEFAULTS.lowCreditThreshold),
    lowIncomeThreshold: envNumber('LOW_INCOME_THRESHOLD', DEFAULTS.lowIncomeThreshold),
    highIncomeThreshold: envNumber('HIGH_INCOME_THRESHOLD', DEFAULTS.highIncomeThreshold),
    minDirectSchedulingScore: envNumber('MIN_DIRECT_SCHEDULING_SCORE', DEFAULTS.minDirectSchedulingScore),
    maxSpecializedScore: envNumber('MAX_SPECIALIZED_SCORE', DEFAULTS.maxSpecializedScore),
  };
}

function amount(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  const normalized = String(value || '').toLowerCase().replace(/[$,\s]/g, '');
  const match = normalized.match(/([0-9]+(?:\.[0-9]+)?)([km]?)/);
  if (!match) return 0;
  const multiplier = match[2] === 'm' ? 1000000 : match[2] === 'k' ? 1000 : 1;
  return Number(match[1]) * multiplier;
}

function creditFloor(value) {
  const match = String(value || '').match(/\d{3}/);
  return match ? Number(match[0]) : 0;
}

function qualifyLead(input, config = getQualificationConfig()) {
  const loanAmount = amount(input.loan_amount || input.loanAmount || input.purchase_price);
  const income = amount(input.household_income || input.householdIncome);
  const credit = creditFloor(input.credit_score || input.creditScore);
  const goal = String(input.loan_goal || input.loanGoal || '').toLowerCase();
  const incomeType = String(input.income_type || input.incomeType || '').toLowerCase();
  const occupancy = String(input.property_use || input.propertyUse || '').toLowerCase();
  const notes = String(input.situation || input.notes || '').toLowerCase();
  const underContract = /^(yes|true|under contract)/i.test(String(input.under_contract || input.underContract || input.timeline || ''));
  let score = 0;
  const reasons = [];

  if (loanAmount >= config.jumboThreshold) { score += 4; reasons.push('jumbo-sized financing'); }
  else if (loanAmount >= config.highValueLoanAmount) { score += 3; reasons.push('high-value financing'); }
  else if (loanAmount >= config.minPriorityLoanAmount) { score += 2; reasons.push('commercially viable loan size'); }
  else if (loanAmount && loanAmount < config.lowLoanAmount) { score -= 4; reasons.push('small requested loan amount'); }

  if (income >= config.highIncomeThreshold) { score += 3; reasons.push('strong household income'); }
  else if (income >= 100000) { score += 1; reasons.push('documented income capacity'); }
  else if (income && income < config.lowIncomeThreshold) { score -= 3; reasons.push('limited documented income'); }

  if (credit >= 720) score += 2;
  else if (credit >= 680) score += 1;
  else if (credit && credit < config.lowCreditThreshold) score -= 2;

  if (/jumbo|investor|dscr|bank statement|self-employed|construction|high net worth/.test(goal)) score += 2;
  if (/self-employed|business owner|1099|k-1|asset|investor|mixed/.test(incomeType)) score += 2;
  if (/investment/.test(occupancy)) score += 1;
  if (underContract) score += 1;
  if (/bridge|asset depletion|buy before|large portfolio/.test(notes)) score += 2;
  if (/tax lien|property tax lien|foreclosure|bankruptcy/.test(notes) && score < 4) score -= 2;

  const distressedCombination = loanAmount > 0 && loanAmount < config.lowLoanAmount
    && credit > 0 && credit < config.lowCreditThreshold
    && income > 0 && income < config.lowIncomeThreshold;
  if (distressedCombination) { score -= 4; reasons.push('combined low-economics profile'); }

  const economicallyViable = loanAmount >= config.minPriorityLoanAmount
    || income >= config.highIncomeThreshold
    || /jumbo|investor|dscr|bank statement|construction|high net worth/.test(goal);

  let tier = 'review';
  if (score >= config.minDirectSchedulingScore && economicallyViable) tier = 'priority';
  else if (score <= config.maxSpecializedScore || distressedCombination) tier = 'specialized';

  return { tier, score, loanAmount, reasons };
}

module.exports = { DEFAULTS, amount, qualifyLead, getQualificationConfig };
