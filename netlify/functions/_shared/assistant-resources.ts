export type AssistantResource = { label: string; url: string; use: string };

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
] as const;

export function isApprovedResource(resource: { label?: unknown; url?: unknown }): resource is { label: string; url: string } {
  if (typeof resource.label !== 'string' || typeof resource.url !== 'string') return false;
  return APPROVED_RESOURCES.some((approved) => approved.url === resource.url);
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
    [/\b(?:current|today|right now|quote|loan estimate)\b.*\b(?:rate|rates|pricing)\b|\b(?:rate|rates|pricing)\b.*\b(?:current|today|right now|quote|loan estimate)\b/, 'Request a rate review'],
  ] as const;
  const labels = matches.filter(([pattern]) => pattern.test(value)).map(([, label]) => label);
  return labels.slice(0, 2).flatMap((label) => {
    const resource = APPROVED_RESOURCES.find((item) => item.label === label);
    return resource ? [{ label: resource.label, url: resource.url }] : [];
  });
}
