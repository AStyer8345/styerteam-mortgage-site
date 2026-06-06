# Calculator Audit — 2026-05-25

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, refinance-calculator.html, wrap-mortgage-calculator.html, calculators.html (hub)
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Time:** 2026-05-25 (Monday)
**Run mode:** Read-only — no calculator code modified. No new patch written.

---

## EXECUTIVE SUMMARY

**Week 5 — same 5 P0 issues from 2026-04-20 still UNFIXED. Now live 35 days.** The patch file `patches/calculator-2026-04-20-P0.diff` is still on disk, still applies cleanly to today's source, still covers every P0 surfaced here.

**Calc-file activity since 2026-05-18 audit (text-only — no math, a11y, or form changes):**
- `c427b15` (2026-05-20) — Sitewide compliance entity rebrand (Mortgage Solutions LP → Kyber Mortgage Corporation dba HyperSmart Home Loans, NMLS 2526130 → 2653540, address swap). Touched all 7 calc files for footer/disclosure copy only. **Line numbers shifted slightly on rate-buydown-calculator.html — P0-A is now lines 1032-1033 (was 1035-1036). Patch still applies by text match.**
- `efd26fe` — loan app URL swap (mslp → hypersmart subdomain)
- `6e27eb5` — nav consolidation (8 items → 5)
- `71b8590` — sitewide hero cleanup

None of these touched calc JS, math paths, slider scaffolding, or form fields.

**No new P0 or P1 items this week. No new patch written. CONTEXT.md "Active Blockers" already lists P0-A as HIGH/Adam.**

**Recommendation (5th week in a row, 35 days):** Apply `patches/calculator-2026-04-20-P0.diff` Monday — 15 minutes. P0-A continues producing 12× inflated PITI for any user who toggles the Annual freq radio on the buydown calc. Every week shipped is more wrong numbers landing with real users — especially relevant given the wider site shipped its "complicated income" repositioning this week per `GOALS.md`, which is sending higher-intent traffic to these surfaces.

---

## STATUS OF PRIOR P0 ISSUES — all open, reverified today

| ID | Issue | File | Line(s) | Days open |
|----|-------|------|---|---|
| P0-A | `taxFreq === 'annual'` / `insFreq === 'annual'` never true (radio values are `mo`/`yr`) — 12× inflated PITI on Annual toggle | rate-buydown-calculator.html | **1032-1033** (shifted from 1035-1036) | **35** |
| P0-B | On-screen schedule renders Interest in "Principal" column and vice versa | rate-buydown-calculator.html | 899-900 | **35** |
| P0-C | `createSlider()` produces `<span>` slider label, no `for`/`aria-label` on the range input | calculator-suite.js | 71, 74 | **35** |
| P0-D | 14 fee-row `<label>` elements have no `for`; inputs have no `id` | refinance-calculator.html | 503-507, 527-535 | **35** |
| P0-E | Chart.js loaded in `<head>` without async/defer (render-blocking) | rate-buydown-calculator.html | 42 | **35** |

Verification grep (this run, 2026-05-25):

```text
$ grep -n "taxFreq ===\|insFreq ===" rate-buydown-calculator.html
1032:        var taxMo   = taxFreq === 'annual' ? taxRaw / 12 : taxRaw;
1033:        var insMo   = insFreq === 'annual' ? insRaw / 12 : insRaw;

$ sed -n '899,900p' rate-buydown-calculator.html
            + '<td>' + fmtDollarInt(r.interest) + '</td>'    ← under "Principal" header
            + '<td>' + fmtDollarInt(r.principal) + '</td>'   ← under "Interest" header

$ grep -c 'fee-row"><label>' refinance-calculator.html
14

$ grep -n "chart.umd" rate-buydown-calculator.html
42:  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>

$ grep -n "aria-label\|for=" calculator-suite.js
116:        '<div class="calc-down-toggle-btns" role="group" aria-label="Down payment as dollar amount or percentage">'
   ← that's the $/% toggle wrapper. Slider inputs themselves still get NO aria-label.
```

---

## P0 — Fix recap (full descriptions in 2026-04-20 audit; not duplicated)

| ID | One-line description | LOC change |
|---|---|---|
| P0-A | `'annual'` → `'yr'` (×2) | 2 lines |
| P0-B | Swap two `r.interest` / `r.principal` lines | 2 lines |
| P0-C | `<span>` → `<label for=…>` + `aria-label` in `createSlider` | ~4 lines |
| P0-D | Add `id`/`for` to 14 fee rows | 14 pairs |
| P0-E | Move Chart.js `<script>` from `<head>` to end-of-`<body>` | move 1 line |

**Patch on disk:** `patches/calculator-2026-04-20-P0.diff` — text-based find/replace, line-number-independent. Verified applies cleanly to today's source. **No regeneration needed.**

---

## P1 — Conversion miss

### P1-A: No inline lead capture form on any calculator (CARRY-OVER, week 5 — most painful gap on the site right now)

Verified 2026-05-25: `grep -c "<form\|netlify"` returns **0** on all 6 calc pages.

Two reasons this is now disproportionately costly:

1. **Site-wide conversion overhaul shipped last 2 weeks** — `/scenario` page, smart hero forms, quick prequal funnel. Calc pages are now the *only* deep-engagement surfaces with no inline capture.
2. **`GOALS.md` repositioning pivot to "complicated income"** — drives higher-intent traffic to calc pages from self-employed / 1099 / bank-statement / DSCR audiences. These users want to model unusual scenarios but have nowhere to submit one.

Infrastructure ready: n8n `Web Lead Automation` workflow `PiuIsQpBuydtFM4m`. Pending decisions are product:
- Where on the page (below result card vs sticky footer vs modal)
- Which 1–3 calcs ship first (suggested order: payment → affordability → buydown)
- Mirror new `/scenario` smart-form pattern OR slim 3-field capture
- **NEW consideration:** given the "complicated income" pivot, the calc capture form should ask for income type (W-2 / 1099 / self-employed / asset-based) to route the inbound to the right Adam-response template

### P1-B: calculator-affordability — 5% down hardcoded, undisclosed (CARRY-OVER)

`calculator-affordability.html` line 139 still:
```javascript
var estPrice = maxPrincipal / 0.95; // assume 5% down
```
Disclosure on the page does not mention the 5% down assumption. User sees a "max price" number that bakes in an undisclosed financing assumption.

---

## P2 — Polish (CARRY-OVERS, no change)

| ID | Issue | File(s) | State |
|---|---|---|---|
| P2-A | `/get-preapproved.html` legacy href (affordability already canonicalized) | calculator-payment.html:102, calculator-refinance-breakeven.html:108 | unchanged |
| P2-B | Stripped footer omits HyperSmart brand line (now needs Kyber legal entity line post-2026-05-20 rebrand) | the 3 small calc pages | unchanged — and **NEW URGENCY** post compliance rebrand |
| P2-C | Buydown frequency label vs radio mismatch | rate-buydown-calculator.html | implicitly fixed by P0-A patch |
| P2-D | WRAP — no validation against negative-am inputs | wrap-mortgage-calculator.html | unchanged |
| P2-E | Refi closing-cost — Lender's Title Policy default ($2,119) unexplained (TX TDI-regulated) | refinance-calculator.html:544 | unchanged |
| P2-F | Hub uses full 4-column footer; calc pages use stripped footer | calculators.html vs others | unchanged |

P2-A verified this run:

```text
calculator-payment.html:102:          <a href="/get-preapproved.html" ...
calculator-refinance-breakeven.html:108:          <a href="/get-preapproved.html" ...
calculator-affordability.html: canonical /get-preapproved (no .html)
```

**P2-B note added this audit:** Per `CLAUDE.md` post-2026-05-20 entity rebrand, every footer/disclaimer surface now needs "Kyber Mortgage Corporation dba HyperSmart Home Loans, NMLS 2653540, Adam NMLS #513013, 9050 N. Capital of Texas Hwy, Ste 390, Austin TX 78759". The 3 stripped-footer calc pages currently omit this. Likely a compliance audit finding when the new company reviews the site. **Recommend bundling P2-B fix with the P0 patch run for the same 15-min session.**

---

## P3 — Feature gaps

No competitor scan this week (covered by `styer-competitive-weekly`). Working backlog from prior audits, all still open:

| Calculator | Have | Missing vs market | Priority |
|---|---|---|---|
| Payment | P&I + optional T&I | PMI auto-drop at <20% LTV; HOA field | P3 |
| Affordability | DTI + income | User-selectable down %; credit-score nudge | P3 (overlaps P1-B) |
| Refi Break-Even | Monthly savings, months to BE | 5-year interest comparison; tax savings note | P3 |
| Buydown | 3/2/1, 2/1, 1/1, 1/0 | — | Ahead of market |
| Refi Closing Cost | Itemized estimate | — | Ahead of market |
| All | — | GA4 `calc_complete` event tracking | P3 |

`grep -nE "calc_complete|gtag.*calc|dataLayer.push.*calc"` on all calc pages + suite.js this run: **0 matches.** Analytics event tracking on calc completion still not wired.

**Texas-specific gaps (still open):**
- No regional property-tax defaults (Austin ~2.17% vs state ~1.7%)
- No homestead-exemption modeling
- No Texas-homestead / owner-finance disclosure on WRAP page (TX Property Code §5.062 lien-based finance restrictions on homestead)

**NEW P3 candidate (from `GOALS.md` complicated-income pivot):**
- No "self-employed income" toggle anywhere — none of the calcs let a user model qualifying income off K-1, 24-month average, asset depletion, or bank-statement net deposits. Marketing positions Adam as the complicated-income expert; calcs assume W-2. Closest fit is `calculator-affordability.html` (DTI-based). Flag for product backlog.

---

## Math correctness — reverification

All prior verified math holds. The single substantive change in calc files this week was the entity-rebrand text swap (commit `c427b15`) — text only, no math touched. Confirmed via `git show c427b15 -- rate-buydown-calculator.html` (diff is `<head>` meta and footer copy). Spot-checks not duplicated.

---

## Mobile perf

PageSpeed/Lighthouse not run this week. Per `CONTEXT.md` HIGH-priority blocker: PSI quota drained 14/14 consecutive periods; provisioning a dedicated PSI key remains an Adam decision.

Static observations unchanged:
- Chart.js still render-blocking in `<head>` on rate-buydown-calculator.html (P0-E)
- All calc pages preload Inter + Playfair Display fonts identically
- All calc pages load `script.js`, `scroll-effects.js`, `analytics.js` with `defer` ✅

---

## Console / runtime errors

Static scan unchanged from 2026-05-18. Known runtime issues:
- P0-A — silent wrong PITI (12×) on Annual freq toggle
- P0-B — swapped column display in on-screen schedule

No new runtime issues observed.

---

## Recent file activity (informational)

| File | Last touched | Last commit | What changed (since 2026-05-18 audit) |
|---|---|---|---|
| `calculator-payment.html` | 2026-05-20 | `c427b15` | Entity rebrand text swap only |
| `calculator-affordability.html` | 2026-05-20 | `c427b15` | Entity rebrand text swap only |
| `calculator-refinance-breakeven.html` | 2026-05-20 | `c427b15` | Entity rebrand text swap only |
| `rate-buydown-calculator.html` | 2026-05-25 (today) | `c427b15` / `efd26fe` | Entity rebrand + loan-app URL host swap; **no math, no a11y, no forms** |
| `refinance-calculator.html` | 2026-05-20 | `c427b15` | Entity rebrand + 4-line touch — fee-row labels still unfixed |
| `wrap-mortgage-calculator.html` | 2026-05-20 | `c427b15` | Entity rebrand text swap only |
| `calculator-suite.js` | 2026-04-01 | (no change in 54 days) | — |
| `calculators.html` | 2026-05-20 | `c427b15` | Entity rebrand text swap only |
| `calculator-suite.css` | 2026-03-06 | (no change) | — |

**No calculator math, accessibility, or form code was modified between 2026-05-18 and 2026-05-25.**

Wider site commits this week:
- `c427b15` Compliance: full Kyber/HyperSmart entity rebrand sitewide (180 files)
- `efd26fe` Loan application URL: mslp → hypersmart subdomain
- `6e27eb5` Nav: 8 items → 5 (dropdown consolidation)
- `71b8590` Sitewide hero cleanup
- Various Monday daily-site rotation commits (suburb meta trims, etc.)

---

## Files audited

| File | Lines | P0 | P1 | P2 | P3 |
|---|---|---|---|---|---|
| `calculator-payment.html` | 214 | 1 (P0-C via slider) | 1 (P1-A) | 2 (P2-A, P2-B) | 1 (analytics) |
| `calculator-affordability.html` | 182 | 1 (P0-C) | 2 (P1-A, P1-B) | 1 (P2-B) | 1 (analytics) |
| `calculator-refinance-breakeven.html` | 202 | 1 (P0-C) | 1 (P1-A) | 2 (P2-A, P2-B) | 1 (analytics) |
| `refinance-calculator.html` | 1241 | 1 (P0-D) | 1 (P1-A) | 1 (P2-E) | 1 (analytics) |
| `rate-buydown-calculator.html` | 1232 | 3 (P0-A, P0-B, P0-E) | 1 (P1-A) | 1 (P2-C → fixed by P0-A) | 1 (analytics) |
| `wrap-mortgage-calculator.html` | 905 | 1 (P0-C; nearly every input unlabeled) | 1 (P1-A) | 1 (P2-D) | 1 (TX homestead) |
| `calculators.html` | 268 | — | — | 1 (P2-F) | — |
| `calculator-suite.js` | 266 | 1 (P0-C source) | — | — | — |

---

## Adam — Action Items (Monday triage, ≤10 min)

5th consecutive Monday. Patch on disk. Reviewed in 4 prior audits.

1. **Apply `patches/calculator-2026-04-20-P0.diff`** — 15 min. Order: P0-A (2 lines) → P0-B (2 lines) → P0-E (move 1 script tag) → P0-D (14 id/for pairs) → P0-C (regress-test 4 pages after). **Apply P2-B in the same session** — add the canonical Kyber/HyperSmart compliance footer line to the 3 stripped-footer calc pages. ~3 extra minutes. Bundles the calc-page compliance fix in with the math fix.
2. **Decide P1-A inline lead capture** — disproportionately costly post-pivot. Add income-type field (W-2 / 1099 / self-employed / asset-based) to route inbound to the right Adam template.
3. **P2-A** — 2-line `/get-preapproved.html` → `/get-preapproved` href fix.

P3 items (analytics event, Texas defaults, complicated-income toggle) → TODO.md backlog. Not blocking. The "complicated-income toggle" is the only P3 with new strategic weight given the GOALS.md pivot.

---

*No calculator HTML or JS was modified by this audit. No new patch file was written; the existing `patches/calculator-2026-04-20-P0.diff` (35 days old, applies cleanly to today's source by text match — line numbers shifted ±3 on P0-A but find/replace is line-independent) covers every P0 surfaced here.*
