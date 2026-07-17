export type AssistantResource = { label: string; url: string; use: string };
export type AssistantAction = { type: 'contact' | 'application' | 'schedule' | 'rate_review'; label: string; url?: string };

export const APPROVED_RESOURCES: readonly AssistantResource[] = [
  { label: 'Mortgage payment calculator', url: 'https://adamstyer.com/calculator-payment.html', use: 'estimating principal, interest, taxes, insurance, or a monthly housing payment' },
  { label: 'Home affordability calculator', url: 'https://adamstyer.com/calculator-affordability.html', use: 'exploring a comfortable price range based on income and monthly debts' },
  { label: 'Refinance break-even calculator', url: 'https://adamstyer.com/calculator-refinance-breakeven.html', use: 'comparing refinance costs, monthly savings, and estimated break-even time' },
  { label: 'DSCR calculator', url: 'https://adamstyer.com/dscr-calculator.html', use: 'estimating an investment property rent-to-PITIA ratio' },
  { label: 'Asset depletion calculator', url: 'https://adamstyer.com/asset-depletion-calculator.html', use: 'exploring how eligible assets may translate into estimated monthly income' },
  { label: 'Temporary rate buydown calculator', url: 'https://adamstyer.com/rate-buydown-calculator.html', use: 'comparing 2-1 or 3-2-1 buydown payments and subsidy costs' },
  { label: 'Wrap mortgage calculator', url: 'https://adamstyer.com/wrap-mortgage-calculator.html', use: 'exploring seller-financing or wraparound mortgage cash flow' },
  { label: 'All mortgage calculators', url: 'https://adamstyer.com/calculators.html', use: 'when the visitor broadly asks what calculators or tools are available' },
  { label: 'Request a rate review', url: 'https://adamstyer.com/rate-check.html', use: 'reviewing a current Loan Estimate or getting scenario-specific live pricing' },
  { label: 'Start secure application', url: 'https://hypersmart.my1003app.com/513013/register', use: 'when the visitor is ready to apply or request a full scenario review' },
  { label: 'Schedule a 15-minute call', url: 'https://calendly.com/adamstyer/15minutes', use: 'when the visitor wants to schedule time with Adam' },
  { label: 'Send Adam my scenario', url: 'https://adamstyer.com/scenario.html', use: 'when the visitor wants Adam to review a scenario or provide contact details' },
] as const;

export function isApprovedResource(resource: { label?: unknown; url?: unknown }): resource is { label: string; url: string } {
  if (typeof resource.label !== 'string' || typeof resource.url !== 'string') return false;
  return APPROVED_RESOURCES.some((approved) => approved.url === resource.url);
}

export function conversionResources(stage: string, message = ''): Array<{ label: string; url: string }> {
  const value = message.toLowerCase();
  if (/\b(?:apply|application|pre.?approv|get started)\b/.test(value)) return [{ label: 'Start secure application', url: 'https://hypersmart.my1003app.com/513013/register' }];
  if (/\b(?:schedule|book|calendly|appointment|call)\b/.test(value)) return [{ label: 'Schedule a 15-minute call', url: 'https://calendly.com/adamstyer/15minutes' }];
  if (/\b(?:contact|reach|email|text|scenario)\b/.test(value)) return [{ label: 'Send Adam my scenario', url: 'https://adamstyer.com/scenario.html' }];
  void stage;
  return [];
}

export function resolveAssistantActions(actions: Array<'contact' | 'application' | 'schedule' | 'rate_review'>): AssistantAction[] {
  const definitions: Record<AssistantAction['type'], AssistantAction> = {
    contact: { type: 'contact', label: 'Have Adam review this' },
    application: { type: 'application', label: 'Start secure application', url: 'https://hypersmart.my1003app.com/513013/register' },
    schedule: { type: 'schedule', label: 'Schedule a 15-minute call', url: 'https://calendly.com/adamstyer/15minutes' },
    rate_review: { type: 'rate_review', label: 'Have Adam verify pricing', url: 'https://adamstyer.com/rate-check.html' },
  };
  return [...new Set(actions)].map((action) => definitions[action]);
}

export function recommendApprovedResources(question: string): Array<{ label: string; url: string }> {
  const value = question.toLowerCase();
  const matches = [
    [/\b(?:afford|affordability|price range|how much house|home budget)\b/, 'Home affordability calculator'],
    [/\b(?:monthly payment|mortgage payment|piti|payment estimate)\b/, 'Mortgage payment calculator'],
    [/\b(?:refinance|refi)\b.*\b(?:break.?even|saving|worth|cost)\b|\bbreak.?even\b.*\b(?:refinance|refi)\b/, 'Refinance break-even calculator'],
    [/\bdscr\b|debt service coverage/, 'DSCR calculator'],
    [/asset depletion|asset utilization/, 'Asset depletion calculator'],
    [/\b(?:2[- ]?1|3[- ]?2[- ]?1|temporary)\b.*buydown|rate buydown/, 'Temporary rate buydown calculator'],
    [/wraparound|wrap mortgage|seller financ/, 'Wrap mortgage calculator'],
    [/\b(?:calculator|calculators|tools)\b/, 'All mortgage calculators'],
    [/\b(?:current|today|right now|quote|loan estimate)\b.*\b(?:rate|rates|pricing)\b|\b(?:rate|rates|pricing)\b.*\b(?:current|today|right now|quote|loan estimate)\b|\byour rates?\b/, 'Request a rate review'],
  ] as const;
  const labels = matches.filter(([pattern]) => pattern.test(value)).map(([, label]) => label);
  return labels.slice(0, 2).flatMap((label) => {
    const resource = APPROVED_RESOURCES.find((item) => item.label === label);
    return resource ? [{ label: resource.label, url: resource.url }] : [];
  });
}
