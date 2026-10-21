# Code QA and interactive tools review

**Local component sign-off:** passed 22 numerical/DOM test groups covering all eight calculator engines. No network calls or persistent storage access occurred in the harness. Final assembled-site checks are recorded below when the integration build is available.

This sign-off covers executable arithmetic, validation branches, disclosure state and source integration. It does not certify rendering at 390–1440 px, real native form behavior, keyboard focus trapping, screen-reader output, contrast, WCAG AA, external application delivery or live deployment. Browser access remains blocked by the environment; no alternative public host or browser workaround was used.

## Delivery and integration contract

- `components/calculator.html` is the complete replacement **main element** for `/asset-depletion-calculator.html`. Insert it before shared site decoration. Retain original scoped styles, structured data and source scripts. The introductory hero is deliberately rewritten; the source calculator module, input/output IDs, assumption paragraphs, educational sections, links and migration parent remain.
- `components/calculator-fixes/patches.json` declares one shared asset replacement and six exact-source inline script replacements. Match each original script by SHA-256 before replacement; mismatch is a hard error. Apply before palette normalization. No entire HTML page is replaced by a calculator fix.
- `qa/build-calculator-fixes.mjs` regenerates those patches from `work/orchestration/site` using exact string matches. Every intended source replacement fails if its target is absent.
- No source reference files, live routing, server functions, destination emails, webhook URLs, or deployed assets were changed by this work.

## Actual formulas and scope

Let `P` be principal, `r = annual percentage / 1200`, and `n = years × 12`. The shared monthly principal-and-interest formula is `P × r / [1 − (1+r)^−n]`; for zero interest it is `P/n`. The implemented `log1p`/`expm1` form avoids cancellation for small positive rates.

| Tool | Implemented model | Limits retained in the interface/content |
|---|---|---|
| Payment | Monthly P&I + entered monthly taxes + monthly insurance. | Does not add PMI, HOA, maintenance or utilities unless explicitly represented by supplied costs. |
| Affordability | Housing budget = `max(0, gross income × DTI − other monthly debt)`. Illustrative price = budget divided by `[0.95 × payment on $1 at 7% for 30 years + 0.025/12]`. | Assumes 5% down, 7% note rate, 30 years, property tax 2% of price/year and insurance 0.5%/year. Excludes PMI and HOA. This is a fixed illustrative inversion, not approval or a verified rate. |
| Refinance break-even | Current P&I less proposed P&I. Positive savings: `ceil(cash closing costs / monthly savings)`. Zero costs with positive savings yields 0 months. Zero/negative savings yields no payment break-even. | Payment-only comparison; extending the term can reduce monthly payment while increasing lifetime interest. Costs financed into principal, loan holding period and tax effects are not automatically modeled. |
| DSCR | Loan = purchase price − down payment. PITIA = P&I + annual taxes/12 + annual insurance/12 + monthly HOA. Ratio = gross rent/PITIA. Rent remaining = rent − PITIA. | Operating costs, vacancy, management and repairs are not deducted. Zero PITIA means undefined ratio. Coverage bands are planning labels, not current lender eligibility. |
| Asset depletion | Illustrative pool = sum of each asset category × its entered inclusion percentage. Asset income = pool/selected months. Combined income = that result + entered other income. | 36/60/84 and advanced 120/180/240/360 views are adjustable illustrations. Default retirement inclusion 70% is not a universal lender rule. Closing funds, reserves, taxes, penalties and account liens are not automatically deducted. The income/payment ratio is not DTI or mortgage eligibility. |
| Closing costs | Lender fees + points + third-party fees + title + prepaid interest/insurance + modeled initial escrow − credits. Per diem = principal × note rate/365 unless manually overridden; days include closing through month end. | First payment assumed first of second month after closing. Tax escrow assumes one annual December 31 bill, scheduled deposits through November, a two-month cushion and a one-month capped negative adjustment. Those are source estimation assumptions, not an actual servicer escrow analysis or legally verified requirement. Negative modeled net cost is not a promise of permitted cash back. |
| Temporary buydown | Amortization continues at full note rate. Borrower payment in reduced years uses payment at `max(0, note rate − reduction)`. Monthly subsidy is the difference; total subsidy sums schedule rows. | 2–1, 3–2–1, 1–1 and 1–0 reductions; taxes/insurance/HOA remain separate. The comparison's price-reduction alternative assumes each dollar reduces loan principal by one dollar. Seller contribution limits and availability require review. |
| Wrap | Separate monthly schedules for wrap and underlying debt. Interest accrues on opening balance; actual payment is capped at balance plus interest; unpaid interest increases balance. Cumulative spread = actual wrap receipts − actual underlying payments. Balloon equity = wrap balance − underlying balance. | Balloon model assumes payment as scheduled and full payoff; seller net = closing cash + cumulative spread + net balloon. With no balloon, seller net deducts any underlying debt remaining at wrap maturity. Excludes default, servicing/tax/legal costs unless separately entered. Home-value growth is an assumption. |

## Intentional change log

1. **Shared math:** reject non-finite/negative principal/rates and nonpositive term. Preserve valid zero-interest and zero-principal behavior. Fix negative amortization, cap payoff payments and expose actual total cash paid. Chart colors move to slate. Invalid exact slider entries clearly state that results still use the last valid value until corrected.
2. **Asset tool:** reject partial/blank/negative/malformed amounts and inclusion percentages above 100; clear invalid result rather than silently treating input as zero. Preserve original calculation assumptions and every advanced period. Keep results ungated.
3. **Break-even:** show immediate 0-month break-even for zero costs and positive savings; distinguish no savings; invalidate incomplete/invalid input instead of retaining an apparently current number.
4. **DSCR:** zero PITIA has no denominator and now gets a neutral explanation rather than the lowest coverage band.
5. **Closing costs:** reject invalid numeric values and missing closing date, clear stale summary/breakdown, and clear auto-calculated points when the percentage returns to zero. Manual dollar points persist until the user intentionally changes percentage/loan inputs. Correct the stale code comment to match the existing two-month first-payment assumption.
6. **Buydown:** zero rate no longer silently becomes the example 6.125%; blank loan no longer becomes $400,000. Promotional rates cannot fall below zero. Invalid custom term/amounts hide stale summary, charts and schedule. Stable P&I formula used.
7. **Wrap:** preserve cents in currency fields instead of turning 100.50 into 10,050; preserve invalid signs for validation instead of stripping them. Correct cumulative results and annual table after early underlying payoff. Table labels its changing annual cash flow as average monthly spread. Capitalize unpaid interest, disclose negative amortization, cap projection to wrap maturity and deduct residual debt in no-balloon net proceeds. Invalid input clears summary/table/print scenario.
8. **Asset master hero:** direct explanation of local, ungated calculation; secondary calculator action; primary scenario review with root-page fallback; Adam strategy/Tiffany execution roles. Original module and technical sections remain.

## Verification evidence

Run from project root:

```sh
CALCULATOR_SITE_DIR=work/orchestration/site CALCULATOR_USE_OVERRIDES=1 node work/full-site-buildout/qa/build-calculator-fixes.mjs
CALCULATOR_SITE_DIR=work/orchestration/site CALCULATOR_USE_OVERRIDES=1 node work/full-site-buildout/qa/calculator-numerics.mjs
```

`qa/calculator-numerics-results.json`: 22 passing groups, zero failing. The tests execute actual scripts in a DOM fixture, use an independent cash-flow schedule and independent closed-form payment formula, and assert rounded display values plus raw computation values where available. Cases include zero principal/rate/cost, debt budget exhaustion, negative amortization, early payoff, undefined DSCR, inclusion percentages over 100, empty/negative/invalid edits, points reset, date boundaries, buydown zero-rate floor, cents preservation and disclosure state. Some boundary values are injected programmatically; these do not claim a native range input can be typed beyond its browser constraints.

The fixture stubs Chart canvas rendering, viewport geometry and native validity. It has no live delivery credentials; fetch/storage throw if invoked. Tests check disclosure/ARIA state, not actual assistive-technology output.

To execute the same vectors against the assembled site's actual scripts, without substituting override files:

```sh
CALCULATOR_SITE_DIR=work/full-site-buildout/site CALCULATOR_USE_OVERRIDES=0 CALCULATOR_RESULTS_FILE=work/full-site-buildout/qa/calculator-assembled-results.json node work/full-site-buildout/qa/calculator-numerics.mjs
```

## Release holds

Native browser review at 390, 768, 1024 and 1440 pixels; keyboard tab order, Escape/focus return and native dialog trapping; actual screen-reader announcements; computed contrast and zoom/reflow; mobile chart/table scroll and print layout remain unverified. Local numerical sign-off does not validate mortgage eligibility, current loan programs, legal wrap documentation or live form delivery. The preview remains non-transmitting and does not claim submissions were delivered.

## Final assembled build evidence and portable rerun

The final assembled build passes **22 numerical/disclosure groups, 13 contact-controller checks, 5 preview-safety checks and 7 shared-navigation checks**. These execute `site/` scripts; calculator overrides are disabled by default. Shared navigation covers open/close, category exclusivity, Escape state/focus requests, outside pointer dismissal, breakpoint transitions and header/footer/dialog coexistence.

Static QA resolves **173/173 ledger routes** with **zero issues**, finds **80 referenced assets**, parses **211 JavaScript blocks/files** and **567 JSON-LD blocks**, and confirms **200 public HTML pages** each contain one shared header/footer/contact dialog with no duplicate IDs or dangling local fragments. The separate Google verification file is retained and excluded from borrower-page component assertions. All runtime fixtures report zero network and storage calls.

QA scripts now resolve files relative to their own package, so the archive does not require this workspace path. Tested with **Node.js 24.14.0 and linkedom 0.18.13**. After installing `linkedom@0.18.13` locally in the extracted package, run from that package:

```sh
node qa/calculator-numerics.mjs
node qa/interaction-dom.mjs
node qa/preview-safety-dom.mjs
node qa/navigation-dom.mjs
node qa/assembled-verify.mjs
node qa/asset-verify.mjs
node qa/static-verify.mjs
```

`qa/runtime.mjs` uses local package dependencies first; the current workspace has a sibling dependency directory fallback. No live services are required. Source patch regeneration additionally requires the unmodified migration snapshot and an explicit `CALCULATOR_SITE_DIR`; do not regenerate patches from the already patched site.

**Final ruling:** signed off for local review of the migrated code and calculator functionality. Browser rendering/accessibility and live delivery remain explicit release holds, not implied passes.

Final FAQ reconciliation refresh: static/component verification rerun after schema and navigation CSS integration; 173/173 routes, 200 public pages, 211 JavaScript blocks/files and 567 schema blocks pass with zero issues. Numerical scripts were unchanged, so their existing 22 passing groups were not rerun.
