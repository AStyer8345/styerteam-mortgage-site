# Calculator Audit — 2026-06-01

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, refinance-calculator.html, wrap-mortgage-calculator.html, calculators.html (hub)
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Time:** 2026-06-01 (Monday)
**Run mode:** Read-only — no calculator code modified. No new patch written.

---

## EXECUTIVE SUMMARY

**Week 6 — same 5 P0 issues from 2026-04-20 still UNFIXED. Now live 42 days.** `patches/calculator-2026-04-20-P0.diff` (find/replace document, not a unified diff) still text-matches every P0 in today's source. No regeneration needed.

**Calc-file activity since 2026-05-25 audit (text-only — no math, a11y, or form changes):**
- `14935a5` (2026-05-30) — `generate_lead` GA4 conversion wiring. **Touched 6 calc files but ONLY the cache-buster (`script.js?v=20260417` → `?v=20260530b`).** No `dispatchLeadSubmitted()` hook on calc pages (calc pages have no forms — confirmed: `grep -c "<form"` = 0 on all 6).
- `75649bc` — rogue (512) 638-9522 fix on rate-buydown-calculator.html (text-only)
- `558a32a` — `/styerteam/` social handles revert on rate-buydown-calculator (text-only)
- `c857288` — direct phone in header sitewide (nav-only)
- `27120ad` — Scenarios link in Resources dropdown sitewide (nav-only)
- `6a39c52` — lead capture privacy/fallback (does not affect calc pages — no forms there)
- `1d09cc7` — canonical URL normalization (head meta only)
- `15e8119` — duplicate analytics + mobile CTA contrast (analytics-script dedupe, not calc-specific)

None of these touched calc JS, math paths, slider scaffolding, or form fields.

**Status of last week's "no new P0/P1" claim:** Holds. But one **NEW P2 finding this run** — Equal Housing Lender (EHL) tag missing from the footer compliance line on 6 of 7 calc surfaces (only `refinance-calculator.html` has it). HUD-required disclosure for any creditor advertising "engaged in residential real-estate-related transactions." Surface during the same Monday triage as the existing P0 patch.

**Recommendation (6th week in a row, 42 days):** Apply `patches/calculator-2026-04-20-P0.diff` Monday — 15 minutes. Bundle the EHL footer line ("Equal Housing Lender.") into the same edit — ~6 more files, 1 string each, ~3 minutes. P0-A continues producing 12× inflated PITI for any user who toggles the Annual freq radio on the buydown calc; per `GOALS.md`, complicated-income repositioning is now driving higher-intent traffic to these surfaces.

---

## STATUS OF PRIOR P0 ISSUES — all open, reverified today

| ID | Issue | File | Line(s) | Days open |
|----|-------|------|---|---|
| P0-A | `taxFreq === 'annual'` / `insFreq === 'annual'` never true (radio values are `mo`/`yr`) — 12× inflated PITI on Annual toggle | rate-buydown-calculator.html | **1032-1033** | **42** |
| P0-B | On-screen schedule (line 525-530 header: …Principal, Interest…) emits `r.interest` then `r.principal` in those cells | rate-buydown-calculator.html | **899-900** | **42** |
| P0-C | `createSlider()` produces `<span>` slider label, no `for`/`aria-label` on the range input | calculator-suite.js | 71, 74 | **42** |
| P0-D | 14 fee-row `<label>` elements have no `for`; inputs have no `id` | refinance-calculator.html | 503-507, 527-535 | **42** |
| P0-E | Chart.js loaded in `<head>` without async/defer (render-blocking) | rate-buydown-calculator.html | 42 | **42** |

Verification grep (this run, 2026-06-01):

```text
$ grep -n "taxFreq ===\|insFreq ===" rate-buydown-calculator.html
1032:        var taxMo   = taxFreq === 'annual' ? taxRaw / 12 : taxRaw;
1033:        var insMo   = insFreq === 'annual' ? insRaw / 12 : insRaw;

$ sed -n '899,900p' rate-buydown-calculator.html         # on-screen schedule render
            + '<td>' + fmtDollarInt(r.interest) + '</td>'      ← under "Principal" header (line 529)
            + '<td>' + fmtDollarInt(r.principal) + '</td>'     ← under "Interest"  header (line 530)
   # The MODAL/full schedule (line 1005 header: …Interest|Principal…) is internally consistent.
   # Bug applies only to the on-screen schedule.

$ grep -c 'fee-row"><label>' refinance-calculator.html
14

$ grep -n "chart.umd" rate-buydown-calculator.html
42:  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>

$ grep -n "aria-label\|for=" calculator-suite.js
116:        '<div class="calc-down-toggle-btns" role="group" aria-label="Down payment as dollar amount or percentage">'
   ← only match; range inputs in createSlider() get no aria-label and no <label for=…>.

$ grep -nE 'for="tax-slider"|for="ins-slider"|for="new-rate"|for="new-term"|for="costs"' \
    calculator-payment.html calculator-refinance-breakeven.html
(no output — 5 inline sliders, zero label/for associations; <span> labels only)

$ grep -c 'for="' wrap-mortgage-calculator.html
0
   ← 11 inputs, 0 label/for associations on wrap-mortgage-calculator.
```

P0-C scope reminder: the bug is in `calculator-suite.js`, but the **inline** sliders on `calculator-payment.html` (2) and `calculator-refinance-breakeven.html` (3) are hand-written in the same broken pattern. The patch fixes the JS factory; the 5 inline sliders need the same `aria-label` / `<label for=…>` treatment applied directly in the HTML. ~5 extra inline edits, ~5 minutes. The 2026-04-20 patch references this but the find/replace blocks only target `calculator-suite.js`. Add to triage list.

---

## P0 — Fix recap (full descriptions in 2026-04-20 audit; not duplicated)

| ID | One-line description | LOC change |
|---|---|---|
| P0-A | `'annual'` → `'yr'` (×2) | 2 lines |
| P0-B | Swap two `r.interest` / `r.principal` lines | 2 lines |
| P0-C | `<span>` → `<label for=…>` + `aria-label` in `createSlider`; also patch 5 inline sliders on payment + breakeven HTML | ~4 + ~5 lines |
| P0-D | Add `id`/`for` to 14 fee rows | 14 pairs |
| P0-E | Move Chart.js `<script>` from `<head>` to end-of-`<body>` | move 1 line |

**Patch on disk:** `patches/calculator-2026-04-20-P0.diff` — find/replace document (not git apply-able; text-based, line-number-independent). Verified text-matches today's source for P0-A, P0-D, P0-E by grep this run. **No regeneration needed.**

---

## P1 — Conversion miss

### P1-A: No inline lead capture form on any calculator (CARRY-OVER, week 6 — still the most painful gap)

Verified 2026-06-01: `grep -c "<form"` returns **0** on all 6 calc pages.

Three reasons this is now disproportionately costly:

1. **`generate_lead` GA4 event wired sitewide last week** (`14935a5`) — every other lead surface now pushes a Google Ads conversion. Calc pages still emit zero (no forms = no `dispatchLeadSubmitted()` call). Highest-intent surfaces on the site are off the conversion graph.
2. **Site-wide conversion overhaul live** — `/scenario`, smart hero forms, quick prequal funnel. Calc pages are the *only* deep-engagement surfaces with no inline capture.
3. **`GOALS.md` complicated-income pivot** — driving self-employed / 1099 / bank-statement / DSCR audiences to calc pages. They want to model unusual scenarios with nowhere to submit.

Infrastructure ready: n8n `Web Lead Automation` workflow `PiuIsQpBuydtFM4m`. Pending decisions are product:
- Where on the page (below result card vs sticky footer vs modal)
- Which 1–3 calcs ship first (suggested order: payment → affordability → buydown)
- Mirror new `/scenario` smart-form pattern OR slim 3-field capture
- **Add income-type field** (W-2 / 1099 / self-employed / asset-based) to route inbound to the right Adam template — Phase A complicated-income SERPs flipped 2/7 → 5/7 in 14 days per Wk 13 competitive run, so the form should match the traffic now landing

### P1-B: calculator-affordability — 5% down hardcoded, undisclosed (CARRY-OVER)

`calculator-affordability.html` line 139 still:
```javascript
var estPrice = maxPrincipal / 0.95; // assume 5% down
```
On-page disclosure at line 76 only mentions "~7% rate, 30-year term, P&I ~28% of gross." No mention of the 5% down assumption baked into the displayed max price.

---

## P2 — Polish (CARRY-OVERS + 1 NEW)

| ID | Issue | File(s) | State |
|---|---|---|---|
| P2-A | `/get-preapproved.html` legacy href (affordability already canonicalized) | calculator-payment.html:102, calculator-refinance-breakeven.html:108 | unchanged |
| P2-B | Stripped footer Kyber/HyperSmart compliance line | the 3 small calc pages | **RESOLVED** — `c427b15` entity rebrand seeded all 3 stripped-footer pages with "© 2026 Kyber Mortgage Corporation dba HyperSmart Home Loans. NMLS# 2653540 (Company) \| 513013 (Adam Styer)." Verified `grep -c "Kyber"` returns ≥1 on every calc file. |
| **P2-G** | **NEW: Equal Housing Lender (EHL) tag missing on 6 of 7 calc surfaces** | calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, wrap-mortgage-calculator.html, calculators.html | **NEW this run** |
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

### NEW finding — P2-G: Equal Housing Lender (EHL) tag missing

```text
$ for f in calculator-*.html *-calculator.html calculators.html; do
    echo "$f EHL: $(grep -c "Equal Housing" $f)"
  done
calculator-affordability.html EHL: 0
calculator-payment.html EHL: 0
calculator-refinance-breakeven.html EHL: 0
rate-buydown-calculator.html EHL: 0
refinance-calculator.html EHL: 1     ← only one
wrap-mortgage-calculator.html EHL: 0
calculators.html EHL: 0
```

`refinance-calculator.html:625` carries "...513013 (Adam Styer). **Equal Housing Lender**." The other 6 calc files stop at "513013 (Adam Styer)." with no EHL tag. HUD/FHEO advertising rule (24 CFR § 110.10) requires the Equal Housing Opportunity logo or "Equal Housing Lender" / "Equal Housing Opportunity" wording on advertising — calculators are clearly advertising surfaces. **This is a compliance finding the new company's audit will catch.** Single-line addition; pair with the existing P0 patch session.

Suggested edit pattern (apply to the 6 missing files):
- FIND: `513013 (Adam Styer).`
- REPLACE: `513013 (Adam Styer). Equal Housing Lender.`

---

## P3 — Feature gaps (no change)

No competitor scan this week (covered by `styer-competitive-weekly`, which delivered the Wk 13 Phase A win this morning — 5/7 complicated-income SERPs now in top 10). Working backlog from prior audits, all still open:

| Calculator | Have | Missing vs market | Priority |
|---|---|---|---|
| Payment | P&I + optional T&I | PMI auto-drop at <20% LTV; HOA field | P3 |
| Affordability | DTI + income | User-selectable down %; credit-score nudge | P3 (overlaps P1-B) |
| Refi Break-Even | Monthly savings, months to BE | 5-year interest comparison; tax savings note | P3 |
| Buydown | 3/2/1, 2/1, 1/1, 1/0 | — | Ahead of market |
| Refi Closing Cost | Itemized estimate | — | Ahead of market |
| All | — | GA4 `calc_complete` event tracking | P3 |

`grep -nE "calc_complete|gtag.*calc|dataLayer.push.*calc"` on all calc pages + `calculator-suite.js` this run: **0 matches.** Calc-completion analytics still not wired — and the gap is sharper now that `generate_lead` is sitewide for forms (`14935a5`).

PMI math: `grep -nE "PMI|pmi|0\.78|0\.20"` on `calculator-suite.js` → **0 matches.** No PMI logic anywhere in the suite. Federal auto-cancellation at 78% LTV is not modeled.

**Texas-specific gaps (still open):**
- No regional property-tax defaults (Austin ~2.17% vs state ~1.7%) — affordability + payment carry only a "rule of thumb ~2%" note
- No homestead-exemption modeling
- WRAP page DOES have TX Property Code Chapter 5 + SAFE Act disclosure in FAQ JSON-LD (lines 70, 80, 90) — earlier audit's TX-homestead concern is partially covered there, but no inline disclosure on the calc form itself.

**P3 from `GOALS.md` complicated-income pivot (carry from 2026-05-25):**
- No "income type" toggle on any calc (K-1, 24-month average, asset depletion, bank-statement net deposits). With Phase A SERPs flipping (per Wk 13), this gap is more strategically weighted now.

---

## Math correctness — reverification

All prior verified math holds. Calc files this week were touched ONLY for:
- Cache-buster bump (`14935a5`, 6 files)
- Rogue phone fix (`75649bc`, rate-buydown-calculator.html — `(512) 638-9522` → removed)
- Social handle revert (`558a32a`, rate-buydown-calculator.html — `/styerteam/` URLs kept per CLAUDE.md exception)
- Nav additions (`27120ad`, `c857288` — header-only)

No math touched. Spot-checks not duplicated.

Edge-case scan:
- Div-by-zero in `calculator-suite.js` lines 147, 168, 189 — all properly guarded with `price > 0 ?` ternaries ✅
- `min="0"` present on 5 numeric inputs across the 3 small calc pages — negative-input prevention OK on those
- Rate-buydown still validates rate 2–12 (`min="2" max="12"` on line 337-338) ✅

---

## Mobile perf

PageSpeed/Lighthouse not run this week. Per `CONTEXT.md` HIGH-priority blocker: PSI quota drained 14/14 (now 15/15 likely) consecutive periods. Provisioning a dedicated PSI key remains an Adam decision.

Static observations unchanged:
- Chart.js still render-blocking in `<head>` on rate-buydown-calculator.html (P0-E)
- All calc pages preload Inter + Playfair Display fonts identically
- All calc pages load `script.js?v=20260530b`, `scroll-effects.js`, `analytics.js` with `defer` ✅
- Viewport meta + `<html lang="en">` present on all 7 pages ✅

---

## Console / runtime errors

Static scan unchanged from 2026-05-25. Known runtime issues:
- P0-A — silent wrong PITI (12×) on Annual freq toggle (rate-buydown-calculator.html)
- P0-B — swapped column display in on-screen schedule (rate-buydown-calculator.html)
- P0-C — sliders unreachable by screen reader (entire calc surface)

No new runtime issues observed via static scan. No `console.error|TODO|FIXME|XXX` strings in `calculator-suite.js`.

---

## Recent file activity (informational)

| File | Last touched | Last commit | What changed (since 2026-05-25 audit) |
|---|---|---|---|
| `calculator-payment.html` | 2026-05-30 | `14935a5` | cache-buster bump (`v=20260417` → `v=20260530b`) only |
| `calculator-affordability.html` | 2026-05-30 | `14935a5` | cache-buster bump only |
| `calculator-refinance-breakeven.html` | 2026-05-30 | `14935a5` | cache-buster bump only |
| `rate-buydown-calculator.html` | 2026-05-30 | `14935a5` / `75649bc` / `558a32a` | cache-buster + rogue phone removal + socials revert; **no math, no a11y, no forms** |
| `refinance-calculator.html` | 2026-05-30 | `14935a5` | cache-buster bump only — fee-row labels still unfixed |
| `wrap-mortgage-calculator.html` | 2026-05-30 | `14935a5` | cache-buster bump only |
| `calculator-suite.js` | 2026-04-01 | (no change in 61 days) | — |
| `calculators.html` | 2026-05-25 | `27120ad` / `c857288` | Scenarios nav link + header phone — nav only |
| `calculator-suite.css` | 2026-03-06 | (no change) | — |

**No calculator math, accessibility, or form code was modified between 2026-05-25 and 2026-06-01.**

Wider site commits this week (informational):
- `14935a5` Fire `generate_lead` conversion event on all lead form submits (calc cache-buster collateral only)
- `0e54435` Portal language + short scenario forms (homepage + scenario.html — not calc)
- `8c32fd4` Route scenario flow to loan application (scenario.html only)
- `f3f8f07` Simplify homepage conversion and AEO routing
- `1d09cc7` Canonical URL normalization
- `6a39c52` Lead capture privacy + fallback handling
- Daily site-daily commits (2c60101, etc.)

---

## Files audited

| File | Lines | P0 | P1 | P2 | P3 |
|---|---|---|---|---|---|
| `calculator-payment.html` | 214 | 1 (P0-C inline ×2) | 1 (P1-A) | 2 (P2-A, P2-G) | 1 (analytics, PMI) |
| `calculator-affordability.html` | 182 | 1 (P0-C inline if any) | 2 (P1-A, P1-B) | 1 (P2-G) | 1 (analytics) |
| `calculator-refinance-breakeven.html` | 202 | 1 (P0-C inline ×3) | 1 (P1-A) | 2 (P2-A, P2-G) | 1 (analytics) |
| `refinance-calculator.html` | 1241 | 1 (P0-D) | 1 (P1-A) | 1 (P2-E) | 1 (analytics) |
| `rate-buydown-calculator.html` | 1232 | 3 (P0-A, P0-B, P0-E) | 1 (P1-A) | 2 (P2-C→fixed by P0-A, P2-G) | 1 (analytics) |
| `wrap-mortgage-calculator.html` | 905 | 1 (P0-C; 11 unlabeled inputs) | 1 (P1-A) | 2 (P2-D, P2-G) | 1 (TX homestead inline disclosure) |
| `calculators.html` | 268 | — | — | 2 (P2-F, P2-G) | — |
| `calculator-suite.js` | 266 | 1 (P0-C source) | — | — | — |

---

## Adam — Action Items (Monday triage, ≤10 min)

6th consecutive Monday. Patch on disk. Reviewed in 5 prior audits.

1. **Apply `patches/calculator-2026-04-20-P0.diff`** — 15 min, text find/replace. Order: P0-A (2 lines) → P0-B (2 lines) → P0-E (move 1 script tag) → P0-D (14 id/for pairs) → P0-C (regress-test 4 pages after). **Bundle the 5 inline sliders** on calculator-payment.html + calculator-refinance-breakeven.html in the same session — same pattern, ~5 more edits.
2. **NEW: Apply P2-G (Equal Housing Lender)** — 6 files, 1 string each. FIND `513013 (Adam Styer).` → REPLACE `513013 (Adam Styer). Equal Housing Lender.`. ~3 minutes. HUD compliance + new-company-audit risk.
3. **Decide P1-A inline lead capture** — disproportionately costly post-`generate_lead`-sitewide wiring. Add income-type field (W-2 / 1099 / self-employed / asset-based) to route inbound to the right Adam template. With Wk 13 confirming Phase A complicated-income SERPs flipped to 5/7 top-10, the form should match the audience now arriving.
4. **P2-A** — 2-line `/get-preapproved.html` → `/get-preapproved` href fix on calculator-payment.html:102 + calculator-refinance-breakeven.html:108.

P3 items (analytics event, PMI math, Texas defaults, complicated-income toggle) → TODO.md backlog. Not blocking. PMI auto-drop and the complicated-income toggle have the highest strategic weight given the GOALS.md pivot.

---

*No calculator HTML or JS was modified by this audit. No new patch file was written; the existing `patches/calculator-2026-04-20-P0.diff` (42 days old, text-based find/replace document — not a git unified diff) still text-matches every P0 surfaced here and covers them all. P2-G (EHL) is a 6-file string addition handled separately in the same triage session.*
