# Website mortgage strategy assistant

The public assistant is progressively loaded by `script.js`. It first calls `GET /api/mortgage-assistant`; when the default-off feature flag is disabled, no widget is rendered. The browser never receives OpenAI, LoanOS, Supabase, market-range, messaging, or scheduling credentials.

## What changed

The previous flow opened as a generic mortgage FAQ, asked for a name early in guided discovery, linked visitors to calculators, and displayed contact/application actions throughout the conversation. The strategy flow now:

1. Opens with four outcomes: payment and cash, initial qualification, complex situation, or estimated pricing.
2. Preserves facts in one validated conversation state and asks at most one question per response.
3. Produces deterministic in-chat calculations and scenario assessments before requesting contact details.
4. Uses server-reviewed, expiring configuration for all market ranges and estimate assumptions.
5. Shows only a contextually appropriate next action.
6. Collects only first name, one contact method, preferred contact method, and required consent.
7. Sends a compact structured JSON summary plus the conversation ID to LoanOS. LoanOS already stores every redacted turn under that conversation ID, so the full redacted transcript remains attached without retransmitting unredacted browser text in analytics.

The model writes grounded or general educational language. It does not select the deterministic payment, qualification, complex-scenario, pricing, confirmation, or lead-capture process.

## Current conversation flow

### Payment and cash

The assistant collects only missing values, one at a time: price, down payment, ZIP/county, use, broad credit range, and HOA. It uses reviewed server-side assumptions to return principal and interest, taxes, insurance, applicable PMI, HOA, total housing payment, cash-to-close range, and a useful alternative down-payment comparison.

If the reviewed market configuration is available, principal and interest uses only its illustrative midpoint. If it is unavailable, a visitor may supply a rate purely as a planning assumption; the assistant does not describe that number as current pricing.

### Initial qualification

The assistant collects broad non-sensitive inputs and returns an “initial scenario assessment,” never a preapproval. It identifies potentially relevant categories, calculates the existing-debt share of gross income as a planning observation, names the main uncertainty and likely documents, recommends one next step, and states that final eligibility requires an application, credit review, documentation, and underwriting.

### Complex situation

The deterministic detector supports self-employment, bank statements, 1099/commission/bonus income, short self-employment, physicians with future contracts, asset depletion, RSUs, DSCR, short-term rentals, buy-before-sell, keeping a home as a rental, bridge financing, divorce, employment changes, multiple financed properties, and major credit events. The response covers possible paths, obstacles, answer-changing facts, secure document review, and whether applying now appears reasonable.

### Estimated pricing

The assistant gathers transaction purpose, value/price, loan amount or down payment/equity, broad credit range, property type, occupancy, location, closing/lock timing, and desired loan type. It displays a range only when the reviewed market configuration is enabled, valid, and unexpired. It never asks the model to generate a current rate.

Every displayed range includes the update date, source, loan type, range, cost structure, illustrative midpoint, principal-and-interest illustration, excluded-cost warning, required disclosure, and Adam’s rate-review action. APR is not displayed because actual fees are unknown.

## Market-range maintenance

Store `MORTGAGE_ASSISTANT_RATE_MARKET_JSON` only as a server-side Netlify environment variable. The JSON shape is:

```json
{
  "enabled": true,
  "conventional30YearRange": { "min": "<reviewed percentage>", "max": "<reviewed percentage>" },
  "fha30YearRange": { "min": "<reviewed percentage>", "max": "<reviewed percentage>" },
  "va30YearRange": { "min": "<reviewed percentage>", "max": "<reviewed percentage>" },
  "jumbo30YearRange": { "min": "<reviewed percentage>", "max": "<reviewed percentage>" },
  "lastUpdated": "YYYY-MM-DD",
  "sourceDescription": "<reviewed source and methodology>",
  "expiration": "YYYY-MM-DD",
  "costStructure": "points | no_points | unspecified"
}
```

The rate values must be JSON numbers, not strings; the placeholders above deliberately prevent accidental use as live configuration. Update the source, date, expiration, ranges, and cost structure together. Review the result in staging before enabling it. When disabled, missing, malformed, or expired, the assistant refuses to show a current estimate and offers Adam’s personalized rate review.

The required disclosure is fixed in server code:

> This is a general market estimate, not a rate quote or offer to lend. Actual pricing depends on credit, loan amount, down payment, property, occupancy, loan program, points, lock period and market conditions.

## Estimate-assumption maintenance

Store `MORTGAGE_ASSISTANT_ESTIMATE_ASSUMPTIONS_JSON` server-side with reviewed planning assumptions:

```json
{
  "enabled": true,
  "reviewedOn": "YYYY-MM-DD",
  "expiration": "YYYY-MM-DD",
  "sourceDescription": "<reviewed source and geography>",
  "propertyTaxAnnualRate": "<decimal rate>",
  "homeownersInsuranceAnnualRate": "<decimal rate>",
  "pmiAnnualRate": "<decimal rate>",
  "closingCostsPercentRange": { "min": "<decimal rate>", "max": "<decimal rate>" }
}
```

All rate fields must be JSON numbers. These are planning assumptions, not exact charges. Review geography and expiry before staging. If this configuration is unavailable, the assistant preserves the collected scenario but declines to manufacture a total.

## Lead and LoanOS flow

The visitor sees the privacy language and confirmation before any lead mutation. The lead request contains only first name, email and/or phone, preferred contact method, consent evidence, conversation ID, source page, and a compact structured summary containing:

- Goal, property use, timeline, and shopping stage
- Target price and down payment/cash
- Broad credit range and income type
- Approximate income and debts when voluntarily provided
- Primary concern and complex-situation flags
- Viewed pricing range
- Recommended next action and intent score
- Transcript-attachment and redaction markers

LoanOS owns the durable redacted transcript and links it by conversation ID. The browser never sends contact information, income, debts, credit range, or conversation text into general analytics.

## Analytics events

The widget pushes these events into the existing `dataLayer`:

| Event | When it fires |
|---|---|
| `assistant_impression` | Widget renders |
| `assistant_opened` | First open |
| `conversation_started` | First visitor message |
| `opening_choice_selected` | One of the four opening paths is selected |
| `useful_answer_delivered` | Estimate, assessment, pricing result, or substantive answer is returned |
| `estimate_started` / `estimate_completed` | Estimate intake starts / deterministic estimate completes |
| `pricing_range_viewed` | Valid configured range is displayed |
| `complex_scenario_started` | Complex-situation discovery starts |
| `scenario_assessment_completed` | Initial qualification or complex assessment completes |
| `contact_form_opened` / `contact_submitted` | Contact capture opens / LoanOS confirms success |
| `application_clicked` | Secure application action is clicked |
| `scheduling_clicked` | Calendly action is clicked |
| `rate_review_clicked` | Rate-review action is clicked |
| `assistant_error` | Browser-visible request failure |
| `conversation_abandoned` | A started conversation leaves the page without a measured conversion |

Allowed properties are source page path, opening choice, conversation stage, goal, concern category, visitor-message count, and CTA type. Do not add names, contact details, income, debts, credit information, URLs containing query data, or transcript text.

## Knowledge and model behavior

Approved Markdown remains the source for reviewed company, product, program, and policy claims. A general educational fallback can explain broadly accepted mortgage concepts but cannot invent live rates, lender overlays, eligibility, approvals, or personalized financial advice. Responses API requests use `store: false`; prior turns are redacted again before any model request.

## Local verification

Use staging-only credentials and keep `MORTGAGE_ASSISTANT_ENABLED=false` unless deliberately testing the widget.

- `npm run validate:knowledge`
- `npm test`
- `npm run typecheck`
- `npm run build`
- `node --check assistant-widget.js`

The scripted evaluation suite is in `tests/assistant/fixtures/strategy-evaluations.json` and covers the ten required borrower conversations.

## Safety and accessibility

The gateway scans prohibited sensitive information before model use, redacts again before persistence, blocks common prompt injection, validates model output, enforces persistent rate limits, and requires signed confirmations for mutations. Detection is pattern-based; unusual or obfuscated identifiers can still evade it. Document and image uploads remain unsupported.

The widget uses a labeled dialog, status and conversation live regions, Escape-to-close, focus restoration, a keyboard focus trap, visible focus styles, reduced-motion support, and safe text-node rendering.

## Staging review plan

1. Add staging-only LoanOS, OpenAI, rate-market, and estimate-assumption variables.
2. Keep the assistant feature flag off for the first deploy and verify that no credential or market configuration appears in browser assets or responses.
3. Enable the flag only on staging and run all ten scripted conversations manually on desktop and mobile.
4. Verify calculations independently, including 10% versus 20% down, zero HOA, PMI applicability, and cash-to-close ranges.
5. Test missing, disabled, malformed, and expired market configuration.
6. Submit a consented test lead and verify the contact, task, structured summary, source page, and full redacted transcript in LoanOS.
7. Simulate OpenAI, LoanOS, notification, and rate-limit failures; verify that no success is claimed.
8. Validate keyboard-only navigation and screen-reader labels.
9. Inspect GTM preview to confirm event names and ensure no sensitive properties are present.
10. Review the complete diff, calculation assumptions, disclosure, consent language, and compliance decisions before any production deployment.

## Remaining business and compliance decisions

- Approve the market-range source, update cadence, expiration window, and cost-structure convention.
- Approve geography-specific property-tax, insurance, PMI, and closing-cost assumptions.
- Confirm whether investment-property estimates should require a minimum down-payment assumption before showing a comparison.
- Confirm the LoanOS retention period and who may view transcripts and approximate financial ranges.
- Obtain final advertising, fair-lending, privacy, consent, and licensing review.

Production deployment requires explicit approval after the complete diff and staging evidence are reviewed.
