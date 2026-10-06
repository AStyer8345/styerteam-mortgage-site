# Existing calculator preview verification

October 6, 2026, Chicago. Local checkpoint only. The whole-site final audit remains pending.

## Scope and changes

Eight inspected pages opt into premium-interior.css, premium-tools.css and the existing premium keyboard-navigation helper:

- calculator-payment.html
- calculator-affordability.html
- calculator-refinance-breakeven.html
- refinance-calculator.html (separate closing-cost estimator)
- dscr-calculator.html
- asset-depletion-calculator.html
- rate-buydown-calculator.html
- wrap-mortgage-calculator.html

Unified ivory title blocks, centered 1,200px content area, editorial headings, restrained 4px panels, readable 16px numeric controls, consistent focus and smaller mobile spacing. Kept all copy, original headings, metadata/schema, URLs, scripts, fields, destinations, assumptions and calculator-specific controls. No decorative images inside the tools. New calculator styling is screen-scoped to avoid overriding their authored print layouts.

During rendered inspection, repaired white-on-light DSCR result labels and dark-on-dark asset/DSCR figures caused by conflicting older rules; removed decorative result-panel gradients; corrected oversized slider tracks; repaired 320px closing-cost overflow by allowing grid children to shrink and stacking paired inputs; improved cash-to-close spacing and the narrow asset calculator's fixed result bar. Rechecked the affected rendered states after those repairs.

## Narrow math/input repairs

The independent review reproduced power-subtraction loss at tiny positive rates. Updated the equivalent amortizing-payment expression in CalcSuite.monthlyPayment, inline DSCR monthlyPI, and StyerAnalysis.payment to use log1p/expm1. This changes numerical stability, not lending assumptions, program terms or ordinary amortization behavior. Inquiry transfer uses the same stable result as the page.

DSCR parser now requires a complete finite number; blank/malformed input no longer becomes zero. Existing rate maximum of 20% is enforced, zero purchase price is rejected, invalid fields receive aria-invalid and linked existing error messages, and the invalid loan helper displays an em dash. Existing negative/down-payment checks remain. Currency formatting no longer silently strips a minus sign or letters into a different valid amount and no longer truncates typed fractional precision. Switching down-payment units with invalid inputs keeps the error instead of converting invalid data. Existing review/save handlers already honor aria-invalid, so their routing and payload ownership stay intact.

## Automated evidence

- 291 tests pass: 164 site + 127 assistant. Six new tests cover stable shared and inline payments against an independent discounted-payment oracle; blank/partial/nonfinite input; valid zero expenses and rate limits; exact/invalid currency formatting; and carried DSCR/refinance result parity. Existing baseline content/metadata/schema/forms/navigation preservation tests still pass.
- Safe build (`CONTEXT=deploy-preview`), typecheck, forms/attribution/schema/navigation/design and SEO audit pass. SEO: 166 sitemap URLs, zero issues. IndexNow was skipped. No production build/deploy or live submission.
- 40 rendered DOM checks: all eight pages at 320/390/768/1024/1440, one H1, labeled controls, no horizontal overflow after repairs. Saved in tool-responsive-checks.json. Rechecked closing-cost and asset 320px views after the final spacing repair.

## Actual visual and browser coverage

Viewed the saved 320px and 1440px opening/tool screenshots for all eight pages (tool-screenshots/). This covers the title, navigation and visible first calculator panels; it is not a claim that every lower-page FAQ, chart/table row or export was visually audited. Additional live visual review: DSCR desktop and 390px result/error states, 320px asset input/focus/result bar, corrected closing-cost mobile summary. Console check at the final DSCR journey returned no errors.

Exercised and observed:

- DSCR `12bad` and `-100` remain visible invalid input; result clears. Blank tax clears result and shows a linked error. Review CTA stays on-page with correction message while invalid.
- DSCR at 1e-15% gives $1,111 P&I and $2,069 PITIA; the same values arrive in the inquiry and return through Edit. Normal $4,500 rent scenario carries 1.20 coverage and $745 rent remaining. Removed test analyses afterward; no inquiry submitted.
- Payment: adding $500 monthly tax changes $2,528 to $3,028.
- Affordability: $12,000 income produces $4,360 modeled housing allowance under unchanged defaults.
- Buydown: selecting 3/2/1 produces $17,535 modeled subsidy.
- WRAP: 0% on the default $405,000 wrap loan produces $1,125/month.
- Assets: $350,000 checking with other defaults produces $31,250/month in the selected 60-month illustration.
- Refinance: keyboard End on new-rate range sets 10%; unfavorable on-page savings/break-even are unavailable, and existing inquiry carryover explicitly shows proposed $3,072 versus current $2,329, -$743 difference, no payment-based break-even. Removed the analysis afterward.

Representative outputs are saved in tool-browser-journeys.json. Keyboard range interaction and focused-input outline were observed; existing navigation helper remains shared with earlier keyboard checks.

## Remaining boundaries

Print/download/export implementations and established saved-analysis flows were preserved in source; no actual print dialog, encrypted save endpoint or export-download round trip was exercised in this chunk. Guarded preview prevents server mutations. Existing shared slider controls retain their previous valid result while a field is invalid and show an input error; a broader invalid-result-state redesign was not silently introduced. Existing calculator lending-band language and other original program assertions require the current-program review already documented in Mortgage-Calculator-Review.md; this design pass neither validates nor amplifies them as new offers.

This is not a new full financial-model audit of all eight tools, lender eligibility verification, field Core Web Vitals measurement, live delivery proof or a finished sitewide release gate. Next: editorial/scenario and trust/partner families, remaining inventory coverage, then the mandatory fresh final audit and repair loop.
