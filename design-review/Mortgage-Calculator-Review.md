# Independent mortgage and calculator review

Reviewed October 5, 2026 for the authorized local preview. No formulas, production inquiries, ads, or live systems were changed. This is a source/math review, not a lender approval or certification of publication readiness.

## Recommendation

Reuse the campaign preview's cash-out calculation core within a distinct rental-property cash-out journey. Keep `/dscr-calculator.html` as the existing purchase/rent-coverage tool and `/dscr-loan-austin-tx.html` as the general DSCR guide. The cash-out experience adds payoff, transaction costs, net cash, and the current-payment tradeoff that those existing tools do not model. Preserve their URLs and existing intake/attribution contracts.

The cash-out arithmetic is sound for its explicitly stated fully amortizing assumptions. Integration should resolve the carryover and input-meaning issues below before treating it as ready for launch. Its default 7.5%, 75% LTV, 2.5% charges, and selectable terms are examples, not current pricing or available program terms.

## Evidence inspected

- Attached implementation brief in `.codex/attachments/9a16f5f4-e4cc-4442-a8cd-438f929e5f4f/Pasted text.txt`.
- `_deliverables/2026-10-04-actual-keyword-data-and-ranking.md` and the earlier paid-acquisition strategy from the primary repository. The actual-data report supersedes the earlier qualitative campaign ranking. It supports testing DSCR demand; it does not validate these calculator defaults, eligibility, acquisition profitability, or funded outcomes.
- Original campaign preview `calculator-core.js`, `preview.js`, `dscr-cash-out.html`, its existing calculator tests, and its saved mobile calculator screenshot.
- Worktree `dscr-calculator.html`, `dscr-loan-austin-tx.html`, `calculator-payment.html`, `calculator-suite.js`, `analysis.js`, `calculator-journey.js`, and `situation-journeys.js`.
- Initial worktree status showed only untracked review-plan/inventory files and a dependency symlink. This review adds only this Markdown file.

## Verified arithmetic

For value V, selected LTV fraction q, payoff P, percentage charge fraction f, other/prepaid costs C, existing penalty E, and desired net cash D:

- Selected-LTV loan L = V × q.
- Target-cash loan L = (P + C + E + D) / (1 − f). Multiplying D plus payoff/costs by 1 + f would understate the loan; the preview correctly divides by 1 − f.
- Percentage charges = L × f. Net cash = L − P − Lf − C − E.
- With monthly rate r and n monthly payments, P&I = L / Σ[(1 + r)^−k], k = 1…n. The preview's numerically stable equivalent agrees with this independent discounted-payment oracle. At 0%, P&I = L/n.
- PITIA = P&I + annual taxes/12 + annual insurance/12 + monthly HOA.
- Illustrative coverage = entered monthly rent / PITIA; zero PITIA correctly gives unavailable coverage.
- Current comparison = entered current P&I + the same taxes, insurance, and HOA. Consequently payment change equals new P&I minus current P&I. It is not a comparison of actual escrow bills or total lifetime cost.

Net proceeds remain negative in the core. The UI correctly displays their absolute amount as **estimated cash needed to close**, rather than showing negative available cash. Rent minus PITIA is labeled **rent remaining before operating expenses**, with a clear statement that it is not profit. Retain both behaviors.

## Independent scenario results

All unspecified inputs use: value $600,000; total payoff $300,000; rent $4,800/month; taxes $7,500/year; insurance $2,100/year; HOA $0/month; rate 7.5%; LTV 75%; percentage charges 2.5%; other/prepaids $1,500; existing penalty $0; current P&I $1,700; 30 years. Dollar figures below round only for display.

| Scenario | New loan | Net cash received / needed | New P&I | New PITIA | Coverage |
|---|---:|---:|---:|---:|---:|
| Selected LTV baseline | $450,000.00 | $137,250.00 received | $3,146.47 | $3,946.47 | 1.216278 |
| Target $100,000 | $411,794.87 | $100,000.00 received | $2,879.33 | $3,679.33 | 1.304586 |
| Target $200,000 | $514,358.97 | $200,000.00 received | $3,596.47 | $4,396.47 | 1.091784 |
| Payoff $500,000 | $450,000.00 | $62,750.00 needed | $3,146.47 | $3,946.47 | 1.216278 |
| Rate 0% | $450,000.00 | $137,250.00 received | $1,250.00 | $2,050.00 | 2.341463 |
| Term 15 years | $450,000.00 | $137,250.00 received | $4,171.56 | $4,971.56 | 0.965493 |
| Term 20 years | $450,000.00 | $137,250.00 received | $3,625.17 | $4,425.17 | 1.084704 |
| HOA $200/month | $450,000.00 | $137,250.00 received | $3,146.47 | $4,146.47 | 1.157612 |
| No percentage or other costs | $450,000.00 | $150,000.00 received | $3,146.47 | $3,946.47 | 1.216278 |
| Penalty $12,000; other costs $5,000 | $450,000.00 | $121,750.00 received | $3,146.47 | $3,946.47 | 1.216278 |
| Target $100,000; charges 20% | $501,875.00 | $100,000.00 received | $3,509.18 | $4,309.18 | 1.113900 |
| Target $0; payoff/costs/taxes/insurance all $0 | $0.00 | $0.00 | $0.00 | $0.00 | unavailable |

Baseline costs total $12,750; comparison payment is $2,500; payment increases $1,446.47/month; rent remaining is $853.53/month before operating expenses. Target $200,000 implies 85.7265% LTV and must retain its above-75%-assumption warning. The 20%-charge target implies 83.6458% LTV and also requires the warning. Zero-loan target is mathematically valid but should say **no new loan modeled** rather than suggesting a $1,700 payment reduction is a refinance benefit.

Verification: existing `node --test tests/calculator.test.cjs` passed 12/12. An independent Node oracle checked loan, proceeds, P&I, and PITIA for all 12 scenarios above to less than $0.000001 difference. These checks do not exercise browser interaction or lender underwriting.

## Material changes required in the local integration

1. **Preserve the complete cash-out snapshot.** `analysis.js` accepts only purchase `dscr` and `refinance` shapes. `calculator-journey.js` carries purchase price/down payment, not payoff/cash-out inputs; `situation-journeys.js` rejects other kinds, renders through `StyerAnalysis`, and appends its summary to `payload.situation`. Do not squeeze cash-out into that purchase shape. Use a versioned cash-out snapshot or a dedicated same-page simulation carrying mode, estimated value, payoff, rent, annual taxes/insurance, monthly HOA, illustrative rate/term, selected LTV, fee percentage, other/prepaid costs, existing penalty, current P&I, desired cash, actual LTV, calculated outputs, warning state, and timestamp. Keep private numbers out of URLs/analytics. Parent should inspect transport limits before adding a future production payload.
2. **Make the simulated inquiry reviewable.** The original preview's `carrySummary()` displays most figures but omits scenario mode, explicit desired cash, and selected LTV. Its submit handler hides the form and displays success; it does not build or persist an inquiry payload. Add these missing assumptions and an inspectable local-only summary. If inputs change, refresh the summary; if inputs become invalid, remove stale results. Distinguish removal/reset from sending. Preserve a path to edit the numbers.
3. **Avoid payoff/penalty double counting.** “Total lien payoff estimate” and a separate existing penalty field can overlap if a payoff quote already includes its penalty. Say: **Enter all liens to be paid off, including accrued interest and payoff fees. Enter a prepayment penalty separately only if it is not already included in that payoff.** Likewise prevent duplication between percentage charges and other costs/prepaids. This is a model-definition fix, not a change to valid arithmetic.
4. **Make the comparison like-for-like.** When paying off multiple liens, current P&I must be the total scheduled payment for all loans being replaced. If a loan is interest-only, use its actual scheduled payment and disclose the difference. The tool currently cannot compare differing tax/insurance assumptions, mortgage insurance, retained subordinate debt, future ARM resets, balloons, or total interest over remaining versus restarted terms. Say the comparison uses the same entered property costs and does not establish savings.
5. **Explain the cost and reserve boundary.** Label percentage charges as a percentage of the **new loan amount**. Other costs/prepaids should include only additional amounts. The model assumes the entered costs are paid from proceeds; it does not distinguish costs paid before closing or lender credits. Keep reserves separate from transaction expenses, and say the displayed cash may include funds the lender requires to remain available. Do not add a reserve deduction as though every lender treats it as a closing fee.
6. **Use estimated rent wording.** Prefer **Estimated monthly rent for this illustration** with a note that the lender determines qualifying rent from the accepted documentation. “Monthly qualifying rent” implies the visitor's entry is already lender accepted. Include any required flood/other property insurance and assessments in entered amounts, or explicitly list their omission. Retain annual versus monthly units.
7. **Keep neutral coverage language.** Coverage thresholds are informational, not approval bands. Do not import the existing purchase calculator's “common investor range,” “strong files can still be very competitive,” or 1.15/short-term-rental eligibility implication into this cash-out tool. A 1.0 ratio only says entered rent equals the modeled payment.

## Current-source boundary for mortgage claims

Pennymac's September 4, 2026 profile defines DSCR using gross rent and the qualifying payment, including property costs. Long-term rent uses lease/appraisal evidence, with conditions for higher lease rent. Its cash-out limits vary with ratio/credit; no-ratio is separate. It restricts occupancy/use of proceeds and requires reserves. This demonstrates lender-specific rules, not Adam's access to the product. Its financed-property cap also means the existing page's universal “no cap” wording needs an investor-specific source. Below-0.75 availability cannot be verified from this profile. [Official Pennymac profile, pages 0–3, 19–21, 26–27](https://corr.pennymac.com/assets/documents/non-qm-resources/Non-QM_DSCR.pdf)

CFPB distinguishes closing costs from cash to close and separately identifies prepaids, initial escrow, and lender credits. Use those distinctions to explain the simplified calculator; the CFPB consumer disclosure examples do not establish which disclosure regime applies to a specific business-purpose DSCR loan. [CFPB Closing Disclosure explainer](https://www.consumerfinance.gov/owning-a-home/closing-disclosure/)

The general DSCR page also states current availability, nationwide financing, down payments, no-ratio/below-0.75 terms, and prepayment pricing tradeoffs. This review found no current originating-channel evidence confirming all those claims. Preserve the existing content during design work; require current program/territory verification before adding or amplifying those claims in new ads/pages. The original preview footer is a draft. Existing company/individual names and NMLS identifiers in repository HTML are source observations, not a fresh license/affiliation verification. Do not assume the prospective DBA/company transition is complete.

## Existing-tool issues to keep separate

- `dscr-calculator.html`'s `num()` returns 0 for blank and malformed input and accepts partial numeric text (`12bad` becomes 12). HTML `min` on text inputs does not provide reliable validation. Source extraction reproduced these results. The validation checks negatives/down-payment size but does not enforce all required, finite, bounded inputs before displaying results.
- Existing inline `monthlyPI()` and shared `CalcSuite.monthlyPayment()` returned Infinity at a 0.000000000000001% positive rate because their power subtraction loses precision. The cash-out core handles that limit correctly. Preserve the stable core; any correction to shared existing formulas should be a separately scoped and tested change.
- General payment calculator math is correct at $400,000/6.5%/30 years: $2,528.27 P&I. It uses monthly tax/insurance slider inputs and excludes HOA/mortgage insurance, as disclosed. Do not carry its output into rental PITIA without adding those required inputs.
- The current analysis transfer retains same-tab storage for two hours, offers edit/remove, and appends the summary to intake narrative. Preserve these useful behaviors and existing goal/source/inquiry-ID/consent fields; storage alone is not proof of successful live delivery.

## Mobile, accessibility, and final acceptance

The saved 375px campaign screenshot shows labeled two-column numeric inputs and a compact cash/payment/coverage summary. Source includes a skip link, error alert, invalid-field flags, a debounced live status, and a reduced-motion-aware carry action. This is limited inspection of saved output/source, not fresh accessibility certification or end-to-end browser verification.

Parent should verify 320/390 mobile, keyboard-only use, visible focus, readable disclosures, zoom, errors linked to inputs, every mode/reset behavior, negative proceeds, above-LTV warnings in both full/mobile results, and complete form carryover. Show unknown/missing inputs as unavailable, not zero. Confirm local submissions make no production request; preview success must explicitly say nothing was sent. Retain CTA/intake/attribution contracts and block both contact and saved-analysis writes in the guarded preview. Final acceptance requires screenshot/browser checks and a future approved intake-delivery verification; this review performed neither live delivery nor publication.
