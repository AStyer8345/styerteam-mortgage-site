# Calculator Audit — 2026-04-20

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, refinance-calculator.html, rate-buydown-calculator.html, wrap-mortgage-calculator.html, calculators.html (hub)
**Report by:** Scheduled automated audit
**Time:** 2026-04-20

---

## EXECUTIVE SUMMARY

5 P0 issues found across the calculator suite. The most critical is a **silent math bug** in `rate-buydown-calculator.html` where the "Annual" frequency toggle for property taxes and insurance is non-functional — annual amounts are always treated as monthly, inflating PITI by ~12× when users enter annual figures. A second critical issue is **missing accessible labels** on all sliders created by `calculator-suite.js`, making the payment, affordability, and break-even calculators screen reader inaccessible. All calculators have CTAs; no inline lead capture (known gap).

---

## P0 — Broken math, JS errors, accessibility blockers

### P0-A: `rate-buydown-calculator.html` — Annual tax/insurance frequency selector silently fails

**File:** `rate-buydown-calculator.html` lines 1032–1035  
**Severity:** P0 — Silent math error. User gets wrong numbers with no warning.

The "Annual / Mo" toggle for property taxes and insurance uses radio values `"mo"` and `"yr"`, but the JS checks for `=== 'annual'`:

```javascript
// radio values in HTML:
// <input type="radio" name="bd-tax-freq" value="mo" checked>
// <input type="radio" name="bd-tax-freq" value="yr">

var taxFreq = document.querySelector('input[name="bd-tax-freq"]:checked').value;
var taxMo   = taxFreq === 'annual' ? taxRaw / 12 : taxRaw;  // NEVER true — "yr" !== "annual"
```

`taxFreq` will be `"mo"` or `"yr"`. The check `=== 'annual'` is **never true**. So when the user selects "Annual" and enters $6,000/year for taxes:
- Expected: $6,000 / 12 = $500/mo added to PITI
- Actual: $6,000/mo added to PITI (12× too high)

Same bug applies to `insFreq === 'annual'` for homeowners insurance.

**Impact:** PITI display is wildly wrong when annual frequency is selected. The "Mo" default is correct, but any user who changes to "Annual" gets a misleading result.

**Proposed patch:** `patches/calculator-2026-04-20-P0.diff`

---

### P0-B: `rate-buydown-calculator.html` — Amortization schedule Interest/Principal columns swapped

**File:** `rate-buydown-calculator.html` ~line 893–904  
**Severity:** P0 — Table shows wrong data under wrong headers.

The full amortization schedule table header defines columns as: `#, Date, Rate, Payment, **Principal**, **Interest**, Subsidy, Balance`

But the row-rendering code puts `r.interest` first (under "Principal") then `r.principal` second (under "Interest"):

```javascript
// Header: Principal | Interest
// Data:
+ '<td>' + fmtDollarInt(r.interest) + '</td>'   // ← interest in "Principal" column
+ '<td>' + fmtDollarInt(r.principal) + '</td>'  // ← principal in "Interest" column
```

A user reading the schedule sees, e.g., "$2,000 Principal / $300 Interest" when the actual values are reversed. On a new loan, early rows are mostly interest — so a user reading the schedule would think they're paying mostly principal upfront, which is incorrect.

**Note:** The print summary table in the same file has the headers as `Interest | Principal` (correct order), so only the main on-screen schedule is affected.

**Proposed patch:** `patches/calculator-2026-04-20-P0.diff`

---

### P0-C: `calculator-suite.js` — `createSlider()` generates range inputs with no accessible label

**File:** `calculator-suite.js` line 73–74  
**Severity:** P0 — WCAG 2.1 Level A failure (1.3.1 Info and Relationships, 4.1.2 Name, Role, Value).

Every slider created by the shared `createSlider()` function uses a `<span>` as the label — not a `<label for="id">`. Screen readers cannot associate the label text with the range input.

```javascript
// Generated HTML:
'<div class="calc-slider-label">' +
  '<span>' + (config.label || '') + '</span>' +  // ← span, not <label>
  '...' +
'</div>' +
'<input type="range" ... id="' + id + '">'  // ← no aria-label, no aria-labelledby
```

**Affected pages:**
- `calculator-payment.html`: Loan amount, Interest rate, Loan term sliders (plus inline tax/insurance sliders)
- `calculator-affordability.html`: Gross monthly income, Max DTI, Monthly debts sliders
- `calculator-refinance-breakeven.html`: Current balance, Current rate, Current term sliders; plus 3 additional hand-coded sliders with same problem (new-rate, new-term, costs)
- `wrap-mortgage-calculator.html`: All number inputs have label text in `<span>` elements not linked via `for`/`aria-labelledby`

**Note:** `rate-buydown-calculator.html` is the exception — it was built separately and correctly uses `aria-label` attributes on its slider inputs.

**Proposed patch:** `patches/calculator-2026-04-20-P0.diff`

---

### P0-D: `refinance-calculator.html` — Fee row labels not associated with inputs

**File:** `refinance-calculator.html` lines ~503–536  
**Severity:** P0 — WCAG 2.1 failure. Screen readers won't announce field names for fee inputs.

Every fee-row `<label>` has no `for` attribute and the `<input>` has no `id`:

```html
<div class="fee-row">
  <label>Origination Fee</label>  <!-- no for="" -->
  <input type="number" class="lender-fee" data-name="Origination Fee" ...>  <!-- no id -->
</div>
```

This affects: Origination Fee, Underwriting Fee, Processing Fee, Application Fee, Admin Fee (lender fees), and Appraisal, Credit Report, Doc Prep, Flood Cert, TX Attorney, Settlement Agent, Title Search, Title Endorsements, Recording Fee (third-party fees) — 14 inputs total.

**Proposed patch:** `patches/calculator-2026-04-20-P0.diff`

---

### P0-E: `rate-buydown-calculator.html` — Chart.js loaded in `<head>` without async/defer

**File:** `rate-buydown-calculator.html` line 42  
**Severity:** P0 — Render-blocking external CDN script on mobile.

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  <!-- ^ RENDER BLOCKING — blocks HTML parsing until CDN download completes -->
```

`calculator-payment.html` loads Chart.js at the end of `<body>` (correct pattern). `rate-buydown-calculator.html` loads it in `<head>` with no `async` or `defer` attribute. On a slow mobile connection this delays first paint.

**Fix:** Move the `<script>` tag to end of `<body>` or add `defer` attribute.

**Proposed patch:** `patches/calculator-2026-04-20-P0.diff`

---

## P1 — Conversion miss (no lead capture, unclear CTA)

### P1-A: No inline lead capture form on any calculator

**Affected:** All 6 calculator pages  
**Status:** Known gap per CONTEXT.md

None of the calculators have a form that captures name/email/phone directly on the page after the user gets a result. Current CTAs link away to a full application (`mslp.my1003app.com`) or contact page.

The highest-converting pattern in the market: after a result renders, display a 3-field form (Name, Phone/Email, "Get a quote with these numbers →"). The user has already engaged with their numbers — this is the moment of peak intent.

**Priority order for lead capture:**
1. `calculator-payment.html` — highest traffic, broadest audience
2. `calculator-affordability.html` — users here are in research mode pre-purchase
3. `rate-buydown-calculator.html` — realtor/seller audience, high-intent

---

### P1-B: `calculator-affordability.html` — Down payment assumption (5%) undisclosed

**File:** `calculator-affordability.html` line 78, 140

The result card says "Estimate assumes ~7% rate, 30-year term, and that P&I is about 28% of gross." But the price estimate uses `maxPrincipal / 0.95` — implying 5% down — without disclosing this. A buyer with 10% or 20% down would calculate a materially different max home price.

```javascript
var estPrice = maxPrincipal / 0.95; // assume 5% down — undisclosed
```

Also the `28%` P&I ratio mentioned in the note is cosmetic text; the actual max payment computation uses the DTI slider, not a 28% cap. The note should be removed or corrected to avoid confusing users.

---

## P2 — Polish (tap targets, labeling, UX)

### P2-A: `rate-buydown-calculator.html` — Frequency label "Annual" doesn't match radio value "yr"

Even after fixing the silent math bug (P0-A), the label reads "Annual" on screen but the radio value is `"yr"`. This mismatch is the root cause of the P0-A bug. When fixing, standardize the value to match the label: either `value="annual"` or change the JS check to `=== 'yr'`.

### P2-B: `wrap-mortgage-calculator.html` — Existing payment field allows inconsistent values

The user manually enters their existing monthly P&I payment. There's no validation or auto-compute from the existing balance + rate + term they also enter. A user could enter an inconsistent payment (e.g., $0) which would produce wildly inflated spread numbers with no warning. Consider adding a "calculate" button or auto-populating from the other fields.

### P2-C: `refinance-calculator.html` — Lender's Title Policy default ($2,119) is unexplained

The title policy defaults to $2,119 but the hint says "Enter manually; rate-table lookup can be plugged in later." This is technically accurate but may confuse users who don't know this is an estimate. A brief tooltip explaining Texas title insurance is computed from loan amount would help.

### P2-D: `calculators.html` (hub) — Footer not updated to match calculator page footers

The hub page has a full 4-column footer. Individual calculator pages (payment, affordability, break-even) use a stripped 1-row footer. Inconsistency could confuse users navigating back from a calculator to the hub.

---

## P3 — Feature gaps (competitor has X, we don't)

Based on Bankrate, Rocket Mortgage, NerdWallet, and Zillow mortgage tools:

| Calculator | We Have | Competitors Have | Gap |
|---|---|---|---|
| Payment | P&I + optional T&I | P&I + T&I + PMI auto | No PMI estimate at <20% LTV |
| Payment | — | HOA field | No HOA field |
| Affordability | DTI + income | DTI + income + down % + credit score | No credit score slider |
| Affordability | 5% down hardcoded | User-selectable down % | Can't model different down scenarios |
| Refi Break-Even | Monthly savings, months to break-even | + Total interest comparison, + Tax savings | No lifetime/5yr interest comparison |
| All calculators | — | GA4 `calculate_complete` events | No calculator interaction events tracked |
| Buydown | 3/2/1, 2/1, 1/1, 1/0 | Same or less | We're ahead here |
| Refi Closing Cost | Full itemized estimate | Usually just an aggregate | We're ahead here |

**Note:** The buydown calculator and refinance closing cost calculator are **stronger than most competitors**. Focus competitor-gap work on the payment and affordability calculators first.

---

## Math Correctness Audit

### Verified as correct:

| Calculator | Function | Edge Cases Verified |
|---|---|---|
| All | `monthlyPayment(principal, rate, years)` | principal=0 → 0 ✓; rate=0 → principal/n ✓ |
| Affordability | Reverse price estimate | rate=0 handled ✓; maxPi=0 returns $0 ✓ |
| Refi Break-Even | Break-even months | savings≤0 → shows `—` ✓; costs=0 → shows `—` ✓ |
| Refi Closing Cost | `calcPerDiem` | loanAmt=0 or rate=0 → 0 ✓ |
| Refi Closing Cost | `calcTaxEscrow` | no closingDate → zeros ✓; annualTax=0 → zeros ✓ |
| Buydown | `pmt(principal, rate, years)` | rate≤0 → principal/(years×12) ✓ |
| Buydown | Subsidy calculation | effectiveRate < noteRate always when reduction>0 → subsidy≥0 ✓ |
| WRAP | `remainingBalance` | P≤0 → 0 ✓; k≥n → 0 ✓; rate=0 → linear paydown ✓ |

### Confirmed bugs (P0):

| Calculator | Function | Bug |
|---|---|---|
| Buydown | `getInputs()` tax/ins frequency | `'annual'` !== `'yr'` → annual amounts treated as monthly |
| Buydown | `renderSchedule()` | Interest/Principal column data swapped vs headers |

### Texas-specific gaps (P3):

- No property tax region defaults (Austin avg ~2.17% vs state ~1.7%) — all calculators use generic "~2% rule of thumb"
- No homestead exemption modeling (first $100K of assessed value exempt from school taxes)
- No Texas homestead law note on the wrap/WRAP calculator regarding primary residence owner-finance restrictions

---

## Proposed P0 Patch

Patch file: `patches/calculator-2026-04-20-P0.diff`

The patch covers 4 of the 5 P0 issues (P0-A, P0-B, P0-D, P0-E). P0-C (`createSlider` ARIA) is noted but requires a JS refactor in `calculator-suite.js` with regression testing across all pages — patch is included but Adam should review before applying.

**Adam: review patches/ on Monday. P0-A (buydown frequency bug) is the most urgent — it produces wrong PITI numbers silently.**

---

## Files Audited

| File | Lines | P0 | P1 | P2 | P3 |
|---|---|---|---|---|---|
| `calculator-payment.html` | 215 | 1 (ARIA) | 1 (lead capture) | — | 2 (PMI, HOA) |
| `calculator-affordability.html` | 183 | 1 (ARIA) | 2 (lead capture, disclosure) | — | 1 (credit score) |
| `calculator-refinance-breakeven.html` | 203 | 1 (ARIA) | 1 (lead capture) | — | 1 (interest compare) |
| `refinance-calculator.html` | 1241 | 1 (labels) | 1 (lead capture) | 1 (title note) | — |
| `rate-buydown-calculator.html` | 1234 | 3 (freq bug, cols, Chart.js) | 1 (lead capture) | 1 (freq label) | — |
| `wrap-mortgage-calculator.html` | 908 | 1 (ARIA) | 1 (lead capture) | 1 (payment validation) | 1 (homestead) |
| `calculators.html` | 183 | — | — | 1 (footer inconsistency) | — |
| `calculator-suite.js` | 266 | 1 (createSlider ARIA) | — | — | — |
