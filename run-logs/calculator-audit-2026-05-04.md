# Calculator Audit — 2026-05-04

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, refinance-calculator.html, rate-buydown-calculator.html, wrap-mortgage-calculator.html, calculators.html (hub)
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Time:** 2026-05-04
**Run mode:** Read-only — no calculator code modified.

---

## EXECUTIVE SUMMARY

**All 5 P0 issues from the 2026-04-20 audit are STILL UNFIXED.** The patch file at `patches/calculator-2026-04-20-P0.diff` was drafted but never applied. The most critical of these is the rate-buydown calculator's silent math bug (P0-A) where users selecting "Annual" property tax/insurance frequency get PITI inflated by ~12×, plus a swapped Principal/Interest column header in the on-screen amortization schedule.

This run re-confirmed each prior P0 against current source (mtimes show files were re-touched 2026-04-28 but only for unrelated changes — the buggy lines are still present at the same line numbers). Two new P2 items were identified:

1. **Inconsistent CTA href normalization.** `calculator-affordability.html` was corrected on 2026-04-30 from `/get-preapproved.html` → `/get-preapproved`, but `calculator-payment.html` (line 104) and `calculator-refinance-breakeven.html` (line 110) still use the legacy `/get-preapproved.html`.
2. **Footer drift on stripped-footer pages.** Three calc pages render `© 2026 Mortgage Solutions, LP. NMLS# 2526130 | 513013 (Adam Styer)` without the `Adam Styer | Mortgage Solutions LP` brand line that hub + buydown + WRAP carry. CLAUDE.md rule: "Never use 'The Styer Team' — always 'Adam Styer | Mortgage Solutions LP'." The current stripped footer omits the brand entirely.

**Recommendation:** Apply the existing P0 patch this Monday before any new calculator work. The buydown math bug has now been live for at least 14 days. P0-A is the one that actively misleads users; P0-B is a display-only swap; P0-C/D are accessibility blockers; P0-E is a perf hit on mobile.

---

## STATUS OF PRIOR P0 ISSUES (all from 2026-04-20)

| ID | Issue | File | Line(s) | Status |
|----|-------|------|---------|--------|
| P0-A | Annual freq check `=== 'annual'` never true (radio values are `mo`/`yr`) | rate-buydown-calculator.html | 1035–1036 | **STILL OPEN** |
| P0-B | On-screen schedule renders Interest in "Principal" column and vice versa | rate-buydown-calculator.html | 902–903 (data) vs 532–533 (header) | **STILL OPEN** |
| P0-C | `createSlider()` produces `<span>` label (no `for`/`aria-label`) | calculator-suite.js | 71, 74 | **STILL OPEN** |
| P0-D | 14 fee-row `<label>` elements have no `for` attribute; inputs have no `id` | refinance-calculator.html | 503–507, 527–535 | **STILL OPEN** |
| P0-E | Chart.js loaded in `<head>` without async/defer (render-blocking) | rate-buydown-calculator.html | 42 | **STILL OPEN** |

Verification commands run (results inline):

```text
grep -n "taxFreq ===" rate-buydown-calculator.html
1035:        var taxMo   = taxFreq === 'annual' ? taxRaw / 12 : taxRaw;

grep -n "fmtDollarInt(r.principal)\|fmtDollarInt(r.interest)" rate-buydown-calculator.html
902:            + '<td>' + fmtDollarInt(r.interest) + '</td>'
903:            + '<td>' + fmtDollarInt(r.principal) + '</td>'

grep -n "chart.umd" rate-buydown-calculator.html
42:  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>

grep -n "<label>" refinance-calculator.html | wc -l
15

grep -n "calc-slider-input.*aria-label" calculator-suite.js
(no matches)
```

The patch file `patches/calculator-2026-04-20-P0.diff` is still on disk and remains the correct fix for all 5 issues. **No new P0 patch is being drafted this run** — the existing one is unchanged in scope and applies cleanly to the current source.

---

## P0 — Broken math, JS errors, accessibility blockers

### P0-A: Buydown — Annual tax/insurance frequency silently fails

**File:** `rate-buydown-calculator.html` line 1035–1036
**Severity:** P0 — silent math error. User gets wrong PITI with no warning.

```javascript
var taxMo   = taxFreq === 'annual' ? taxRaw / 12 : taxRaw;
var insMo   = insFreq === 'annual' ? insRaw / 12 : insRaw;
```

Radio values (lines 374–375, 384–385) are `"mo"` and `"yr"` — `=== 'annual'` is never true. When user toggles to "Annual" and enters $6,000/yr taxes, PITI shows that as $6,000/mo (12× too high). Default "Mo" works correctly.

**Fix:** Patch 1 in `patches/calculator-2026-04-20-P0.diff`. One-line change (`'annual'` → `'yr'`).

### P0-B: Buydown — On-screen schedule columns swapped

**File:** `rate-buydown-calculator.html` lines 902–903 (data) vs 532–533 (header)
**Severity:** P0 — table shows interest values under "Principal" column header.

```text
Header: # | Date | Rate | Payment | Principal | Interest | Subsidy | Balance   (line 528-535)
Data:                              ^ r.interest ^ r.principal                  (line 902-903)
```

User reading early-month rows sees mostly small "Principal" and large "Interest" — but the labels imply the opposite. Inverts the standard amortization mental model.

Note: The print summary table (line 1008 / 1015–1016) header is `Interest | Principal` and data matches, so the print version is correct. Only the on-screen schedule is wrong.

**Fix:** Patch 2 in `patches/calculator-2026-04-20-P0.diff`. Swap two lines.

### P0-C: `calculator-suite.js` `createSlider()` — no accessible label

**File:** `calculator-suite.js` line 71 (`<span>` instead of `<label for=`) and line 74 (no `aria-label`)
**Severity:** P0 — WCAG 2.1 Level A failure (1.3.1 Info and Relationships, 4.1.2 Name, Role, Value).

Affects all sliders on:
- `calculator-payment.html` (3 sliders + 2 inline tax/ins sliders that use the same pattern manually at lines 66–67, 71–72)
- `calculator-affordability.html` (3 sliders)
- `calculator-refinance-breakeven.html` (3 generated + 3 hand-coded at lines 67, 71, 75)
- `wrap-mortgage-calculator.html` (every input — `grep <label for=` returns 0 matches in this file)

`rate-buydown-calculator.html` is the exception: 24 `aria-label` attributes attached to its inputs.

**Fix:** Patch 5 in `patches/calculator-2026-04-20-P0.diff`. Adds `aria-label="..."` to the generated `<input type="range">` and converts the wrapper `<span>` to a `<label for=...>`.

**Regression risk:** Shared file used on 4 pages. Visual rendering should not change because the wrapper `<span>` is being replaced 1:1 with `<label>`. Smoke-test all 4 pages after applying.

### P0-D: refinance-calculator.html — 14 fee-row inputs unlabeled

**File:** `refinance-calculator.html` lines 503–507 (lender fees) + 527–535 (third-party fees)
**Severity:** P0 — WCAG 2.1 failure. Screen readers won't announce field names.

```html
<div class="fee-row"><label>Origination Fee</label><input type="number" class="lender-fee" data-name="Origination Fee" value="0" min="0" step="50"></div>
```

14 inputs total. (Plus one `<label>Computed Per-Diem</label>` at line 440 which appears to label a display element rather than an input — not blocking.) Note: the *other* 15 labels in this file (lines 420, 425, 431, 435, 464, 469, 474, 482, 486, 493, 511, 515, 544, 557, 562) are correctly paired with `<label for=...>`. Only the fee-row block is wrong.

**Fix:** Patch 3 in `patches/calculator-2026-04-20-P0.diff`. Adds matched `id`/`for` pairs to all 14 fee rows.

### P0-E: Buydown — Chart.js render-blocking in `<head>`

**File:** `rate-buydown-calculator.html` line 42
**Severity:** P0 — render-blocking external CDN script. Hurts mobile LCP.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
```

No `async`, no `defer`, in `<head>`. Blocks HTML parsing until the CDN script downloads. On a slow 4G connection that's 200–800ms of dead time before first paint. The other Chart.js-using calc (`calculator-payment.html`, line 121) loads it at the end of `<body>` — also without `defer`, but at end-of-body it's effectively non-blocking for first paint.

**Fix:** Patch 4 in `patches/calculator-2026-04-20-P0.diff`. Move script tag to end of `<body>` before the inline IIFE.

---

## P1 — Conversion miss

### P1-A: No inline lead capture form on any calculator (CARRY-OVER)

**Affected:** All 6 calculator pages.
**Status:** Known gap. Verified again 2026-05-04: `grep "<form\|netlify\|name=\"email\"" *.html | grep -i calc` returns nothing.

This is the highest-leverage conversion fix the calculator suite can make. After a user has moved sliders and seen a number that means something to them, they are at peak intent. A minimal 3-field capture (name, phone or email, optional comment) below the result card would tie the calc to a Salesforce lead with the user's exact scenario data captured in the lead notes.

**Suggested priority for rollout (unchanged from 2026-04-20):**
1. `calculator-payment.html` — broadest traffic, broadest audience.
2. `calculator-affordability.html` — pre-purchase research mode.
3. `rate-buydown-calculator.html` — high-intent realtor/seller audience.

**Implementation pattern:** Netlify Form (per CLAUDE.md repo rule: `netlify` attr + hidden `form-name` input). New form name e.g. `calc-payment-quote`. n8n already has webhook-relay patterns from the existing `Web Lead Automation` workflow (`PiuIsQpBuydtFM4m`). Adam-decision-blocked: where to render in DOM (immediately below result card vs sticky footer vs modal on first slider interaction).

### P1-B: calculator-affordability — 5% down hardcoded, undisclosed (CARRY-OVER)

**File:** `calculator-affordability.html` line 141, 78.

```javascript
var estPrice = maxPrincipal / 0.95; // assume 5% down
```

The shown disclaimer ("Estimate assumes ~7% rate, 30-year term, and that P&I is about 28% of gross") doesn't mention the 5% down assumption. The "28% of gross" line is also misleading because the actual computation uses the user's DTI slider (default 43%), not 28%.

**Fix:** Either (a) add a Down Payment % slider and feed it in, or (b) update the disclosure note to honestly read: "Estimate assumes ~7% rate, 30-year term, and 5% down." Option (a) closes a P3 feature gap simultaneously.

### P1-C: calculator-refinance-breakeven — Loan Programs nav drops VA (NEW)

**File:** `calculator-refinance-breakeven.html` line 38.

```html
<li class="nav-has-dropdown"><a href="/products.html">Loan Programs</a><ul class="nav-dropdown"><li><a href="/loans/conventional.html">Conventional</a></li><li><a href="/loans/fha.html">FHA</a></li><li><a href="/loans/jumbo.html">Jumbo</a></li><li><a href="/loans/refinance.html">Refinance</a></li></ul></li>
```

`calculator-payment.html`, `calculator-affordability.html`, and the hub all include VA. This page omits it. Looks like a copy/paste regression. Adam decision on the site-wide USDA cleanup is pending (see CONTEXT.md blocker), so resolving the full nav drift is blocked, but the VA-on-this-one-page omission is unrelated and can be added in the same one-line edit.

---

## P2 — Polish

### P2-A: CTA href normalization not applied site-wide (NEW)

`calculator-affordability.html` line 98 already uses `/get-preapproved` (normalized 2026-04-30 per Step 4B in that day's run-log).

But:
- `calculator-payment.html` line 104 → still `/get-preapproved.html`
- `calculator-refinance-breakeven.html` line 110 → still `/get-preapproved.html`

Both pages should match the normalized canonical extensionless path. Two-line fix; no logic changes.

### P2-B: Stripped footer omits "Adam Styer | Mortgage Solutions LP" brand line (NEW)

The three small calc pages (`calculator-payment.html` 110–116, `calculator-affordability.html` 104–110, `calculator-refinance-breakeven.html` 116–122) carry a single-line footer:

```text
© 2026 Mortgage Solutions, LP. NMLS# 2526130 | 513013 (Adam Styer). Contact | Calculators
```

CLAUDE.md rule: "Never use 'The Styer Team' — always 'Adam Styer | Mortgage Solutions LP'." This footer technically isn't using "The Styer Team" but it IS the canonical brand string that's missing — every other page (hub, buydown, WRAP) leads with "Adam Styer | Mortgage Solutions LP". Suggested minimal fix: lead the line with `<strong>Adam Styer | Mortgage Solutions LP</strong> · NMLS #513013 · ...`.

### P2-C: Buydown frequency label "Annual" doesn't match radio value "yr" (CARRY-OVER)

`rate-buydown-calculator.html` line 375, 385. After fixing P0-A, also consider standardizing the radio value: either rename to `value="annual"` or leave the JS using `'yr'`. Either is fine; current state is the bug surface area.

### P2-D: Wrap calculator — no validation between balance/rate/term and the manually entered P&I (CARRY-OVER)

`wrap-mortgage-calculator.html` lines 364–376. A user can enter $200K balance / 3% rate / 30yr and any P&I. If P&I is below the interest portion (~$500/mo at these inputs), `amortize()` enters its `principal <= 0 → continue` branch, so the underlying balance never decreases and `netAtBalloon` becomes wildly inflated. Add a "calculate from balance/rate/term" helper or a soft warning when P&I < r × balance.

### P2-E: Refinance closing-cost — Lender's Title Policy default ($2,119) is unexplained (CARRY-OVER)

`refinance-calculator.html` line 544. Tooltip explaining Texas title insurance basis (% of loan amount, regulated by TDI) would help users sanity-check the default.

### P2-F: Calculators hub footer is full 4-column; individual calc pages use stripped footer (CARRY-OVER)

`calculators.html` 133–178 vs `calculator-payment.html` 110–116. Inconsistency on back-navigation. Either bring the small calcs up to the full footer or leave intentional. Adam call.

---

## P3 — Feature gaps vs competitors

(WebSearch was not executed this run because the prior 2026-04-20 audit's competitor inventory is still recent and no major calculator product launches from Rocket/Bankrate/NerdWallet/Zillow have surfaced in CONTEXT.md's competitive logs in the past two weeks. Re-running competitor scan would duplicate Week 9's `styer-competitive-weekly` content.)

| Calculator | Have | Missing vs market | Priority |
|---|---|---|---|
| Payment | P&I + optional T&I | PMI auto at <20% LTV; HOA field | P3 |
| Affordability | DTI + income | User-selectable down %; credit score nudge | P3 (overlaps P1-B) |
| Refi Break-Even | Monthly savings, months to BE | 5-year interest comparison; tax savings note | P3 |
| Buydown | 3/2/1, 2/1, 1/1, 1/0 | — | We're ahead |
| Refi Closing Cost | Itemized estimate | — | We're ahead |
| All | — | GA4 `calculate_complete` event tracking | P3 (analytics gap) |

**Texas-specific gaps (still open from 2026-04-20):**
- No regional property-tax defaults (Austin avg ~2.17% vs state ~1.7%).
- No homestead-exemption modeling.
- No Texas-homestead/owner-finance disclosure on the WRAP page (the Texas Property Code §5.062 etc. lien-based finance restrictions on homestead). The 2026-04-25 strategy meeting noted this is a known disclosure gap.

---

## Math correctness — reverification

All previously-verified math still holds. Spot-checked this run:

| File | Check | Status |
|------|-------|--------|
| `calculator-suite.js` `monthlyPayment` | `principal=0` → 0; `r=0` → `principal/n` | ✅ correct |
| `calculator-suite.js` `amortize` | `bal=0` early break; `principal<=0` interest-only loop | ✅ correct (negative-am edge handled, see P2-D) |
| `calculator-suite.js` `computeWrap` | `monthlyMortgagePayment=0` → `coverage=NaN` (handled) | ✅ correct |
| `calculator-affordability.html` | `maxPi=max(0, maxTotal-debts)` | ✅ correct |
| `calculator-refinance-breakeven.html` | `months = costs>0 && savings>0 ? ceil(costs/savings) : 0` | ✅ correct (no upper cap; see note) |
| `rate-buydown-calculator.html` `pmt()` | `rate<=0` → `principal/(years*12)` | ✅ correct |

**Note on break-even:** No upper cap on the months result. With $0.50/mo savings and $6,000 costs, the page will display "12,000 mo" — mathematically correct but absurd. Consider a soft cap that displays "—" or "100+ mo" past, e.g., 360 months. P3, not P0/P1.

---

## Mobile perf

PageSpeed/Lighthouse run blocked by quota (per CONTEXT.md `Active Blockers` row). No automated mobile perf number this run.

Static observations from source:
- Chart.js (~75KB gz) loaded on payment + buydown calculators.
- Buydown still has the render-blocking `<head>` injection (P0-E).
- `calculator-payment.html` loads Chart.js at end of `<body>` without `defer` (line 121) — minor perf miss; effectively non-blocking due to position. Adding `defer` would be a cheap polish but not P0/P1.
- All calc pages preload the Inter + Playfair Display webfonts via `<link rel="preload">`. Same pattern across the site; no anomaly.
- All calc pages load `script.js`, `scroll-effects.js`, `analytics.js` with `defer` ✅.

---

## Console / runtime errors

Static scan of calc page `<script>` blocks revealed no obvious runtime issues beyond P0-A and P0-B above. The chrome-devtools MCP was not exercised this run (would require the Netlify-served URLs and an active browser session — not part of this scheduled task's scope).

---

## Files audited

| File | Lines | P0 | P1 | P2 | P3 |
|---|---|---|---|---|---|
| `calculator-payment.html` | 217 | 1 (P0-C via slider) | 1 (P1-A lead capture) | 2 (P2-A href, P2-B footer brand) | 2 (PMI, HOA) |
| `calculator-affordability.html` | 185 | 1 (P0-C) | 2 (P1-A, P1-B disclosure) | 1 (P2-B footer brand) | 1 (credit score) |
| `calculator-refinance-breakeven.html` | 205 | 1 (P0-C) | 2 (P1-A, P1-C VA nav) | 2 (P2-A href, P2-B footer brand) | 1 (interest compare) |
| `refinance-calculator.html` | 1241 | 1 (P0-D fee labels) | 1 (P1-A) | 1 (P2-E title note) | — |
| `rate-buydown-calculator.html` | 1235 | 3 (P0-A, P0-B, P0-E) | 1 (P1-A) | 1 (P2-C freq label) | — |
| `wrap-mortgage-calculator.html` | 908 | 1 (P0-C; nearly every input unlabeled) | 1 (P1-A) | 1 (P2-D payment validation) | 1 (TX homestead disclosure) |
| `calculators.html` | 184 | — | — | 1 (P2-F footer inconsistency) | — |
| `calculator-suite.js` | 266 | 1 (P0-C source) | — | — | — |

---

## Adam — Action Items (Monday triage, ≤10 min)

1. **Apply `patches/calculator-2026-04-20-P0.diff`.** All 5 P0s are still live. P0-A is actively misleading users; the rest are a11y + perf debt. The patch is already drafted and on disk — no new authoring required from you. Suggested order: P0-A (1 line), P0-B (2 lines), P0-E (move 1 script tag), P0-D (14 id/for pairs), P0-C (regress-test 4 pages). 15 minutes total.
2. **Decide on P1-A inline lead capture.** Where on the page (below result vs sticky footer vs modal)? Which 1-3 calculators ship first? n8n + Netlify Forms infrastructure is already in place.
3. **One-line P2-A href normalization** — apply on payment + break-even pages to match affordability.
4. **Decide on P2-B footer brand line** — agree on a canonical 1-line footer for the small calc pages and apply to all three.

P3 / Texas-specific gaps are not blocking — log to TODO.md backlog.

---

*No calculator HTML or JS was modified by this audit. No new patch file was written; the existing `patches/calculator-2026-04-20-P0.diff` covers every P0 surfaced here.*
