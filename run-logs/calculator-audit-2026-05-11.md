# Calculator Audit — 2026-05-11

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, refinance-calculator.html, rate-buydown-calculator.html, wrap-mortgage-calculator.html, calculators.html (hub)
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Time:** 2026-05-11
**Run mode:** Read-only — no calculator code modified.

---

## EXECUTIVE SUMMARY

**Same 5 P0 issues from 2026-04-20 are STILL UNFIXED — now live 21 days.** The patch file `patches/calculator-2026-04-20-P0.diff` (6.1KB, dated Apr 20 08:49) is still on disk and still applies cleanly to the current source. No code in any of the 5 P0 locations has changed since the 2026-05-04 audit.

File mtimes show the calc pages were edited 2026-05-05 (nav redesign — see below), but the P0 lines are untouched. This is the third consecutive week these 5 P0s appear unchanged in this report.

**One P1 from prior audit RESOLVED:**
- P1-C (`calculator-refinance-breakeven.html` Loan Programs dropdown missing VA) — RESOLVED by a site-wide nav redesign on 2026-05-05. All calc pages now carry the same Non-QM / DSCR / Self-Employed / Bank Statement / HNW / Investor dropdown. The VA/Conventional/FHA/Jumbo/Refinance items were removed from the dropdown across the entire site (not a calc-only change). This is consistent with the broader "Loan Programs nav → headline products only" pattern; flagging only because the prior audit treated VA-on-this-page as a regression.

**Carry-over open items (no change since 2026-05-04):**
- P0-A through P0-E — see "Status" table below
- P1-A inline lead capture (unchanged; still highest-leverage conversion fix)
- P1-B 5% down hardcoded disclosure (`calculator-affordability.html` line 141, 78)
- P2-A `/get-preapproved.html` legacy href on payment + break-even (still drifted from affordability)
- P2-B Footer brand line missing on stripped-footer pages
- P2-C Buydown frequency label ↔ radio value mismatch (fixed by P0-A patch)
- P2-D WRAP no validation against negative-am
- P2-E Refinance closing-cost — Lender's Title Policy default unexplained
- P2-F Hub footer vs stripped footer inconsistency

**No new P0/P1 items this week.** One small new P3 item (analytics) is noted at the bottom.

**Recommendation:** Apply the existing P0 patch this Monday. P0-A is actively producing wrong PITI for any user who toggles tax/ins frequency to Annual (12× inflated). Estimated apply-time: 15 minutes (see "Adam — Action Items" at bottom).

---

## STATUS OF PRIOR P0 ISSUES

All 5 still open. Verified live this run (today 2026-05-11):

| ID | Issue | File | Current line(s) | Status |
|----|-------|------|---|---|
| P0-A | `taxFreq === 'annual'` never true (radio values are `mo`/`yr`) | rate-buydown-calculator.html | 1035–1036 | **OPEN — 21d live** |
| P0-B | On-screen schedule renders Interest in "Principal" column and vice versa | rate-buydown-calculator.html | 902–903 (data) vs 532–533 (header) | **OPEN — 21d live** |
| P0-C | `createSlider()` produces `<span>` label, no `for`/`aria-label` | calculator-suite.js | 71, 74 | **OPEN — 21d live** |
| P0-D | 14 fee-row `<label>` elements have no `for`; inputs have no `id` | refinance-calculator.html | 503–507, 527–535 | **OPEN — 21d live** |
| P0-E | Chart.js loaded in `<head>` without async/defer | rate-buydown-calculator.html | 42 | **OPEN — 21d live** |

Verification (grep results this run):

```text
$ grep -n "taxFreq ===" rate-buydown-calculator.html
1035:        var taxMo   = taxFreq === 'annual' ? taxRaw / 12 : taxRaw;
1036:        var insMo   = insFreq === 'annual' ? insRaw / 12 : insRaw;

$ grep -n "fmtDollarInt(r.principal)\|fmtDollarInt(r.interest)" rate-buydown-calculator.html
902:            + '<td>' + fmtDollarInt(r.interest) + '</td>'
903:            + '<td>' + fmtDollarInt(r.principal) + '</td>'
1015:                + '<td>' + fmtDollarInt(r.interest) + '</td>'  (print version — header matches, OK)
1016:                + '<td>' + fmtDollarInt(r.principal) + '</td>' (print version — header matches, OK)

$ grep -n "chart.umd" rate-buydown-calculator.html
42:  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>

$ grep -n "fee-row\"><label>" refinance-calculator.html | wc -l
14

$ grep -n "calc-slider-input.*aria-label" calculator-suite.js
(no matches)
```

**No new P0 patch is being drafted.** The existing `patches/calculator-2026-04-20-P0.diff` is unchanged in scope and applies cleanly to the current source.

---

## P0 — Broken math, JS errors, accessibility blockers

(Full descriptions and fixes documented in 2026-04-20 and 2026-05-04 audits. Not duplicated here. Patch covers all 5.)

### Brief recap

| ID | One-line description | Patch # | LOC change |
|---|---|---|---|
| P0-A | `'annual'` → `'yr'` | Patch 1 | 1 line × 2 |
| P0-B | Swap two `r.interest` / `r.principal` lines | Patch 2 | 2 lines |
| P0-C | `<span>` → `<label for=...>` + `aria-label` in createSlider | Patch 5 | ~4 lines |
| P0-D | Add `id`/`for` to 14 fee rows | Patch 3 | 14 pairs |
| P0-E | Move Chart.js `<script>` from `<head>` to end-of-`<body>` | Patch 4 | move 1 line |

---

## P1 — Conversion miss

### P1-A: No inline lead capture form on any calculator (CARRY-OVER)

Unchanged from 2026-04-20 and 2026-05-04. `grep "<form\|netlify" *.html | grep -i calc` returns nothing on any of the 7 calc files. This is the highest-leverage conversion gap. Adam decision still pending on:
- Render location (below result card vs sticky footer vs modal)
- Which 1–3 calcs ship first (suggested: payment → affordability → buydown)

n8n `Web Lead Automation` workflow (`PiuIsQpBuydtFM4m`) infrastructure is in place.

### P1-B: calculator-affordability — 5% down hardcoded, undisclosed (CARRY-OVER)

`calculator-affordability.html` line 141 still: `var estPrice = maxPrincipal / 0.95;`. Disclosure note on line 78 still doesn't mention the 5% down assumption.

### P1-C: calculator-refinance-breakeven Loan Programs dropdown — RESOLVED

Prior audit (2026-05-04) flagged this page's `Loan Programs` dropdown as missing VA. Verified 2026-05-11: a site-wide nav redesign (2026-05-05) replaced the legacy Conventional/FHA/VA/Jumbo/Refinance dropdown with Non-QM / DSCR / Self-Employed / Bank Statement / HNW / Investor across **all** calc pages (and elsewhere). The dropdown on this page now matches every other calc page. Not a regression — drop from active list.

---

## P2 — Polish

### P2-A: `/get-preapproved.html` legacy href not normalized (CARRY-OVER)

Same state as 2026-05-04. Two pages still drifted from canonical extensionless path:

```text
calculator-payment.html:104:          <a href="/get-preapproved.html" ...>Get Pre-Approved</a>
calculator-refinance-breakeven.html:110:          <a href="/get-preapproved.html" ...>Get Pre-Approved</a>
calculator-affordability.html:98:          <a href="/get-preapproved" ...>Get Pre-Approved</a>   ← canonical
```

Two-line fix. No logic change.

### P2-B: Stripped footer omits "Adam Styer | Mortgage Solutions LP" brand line (CARRY-OVER)

Same state as 2026-05-04. The three small calc pages still render:

```text
© 2026 Mortgage Solutions, LP. NMLS# 2526130 (Company) | 513013 (Adam Styer). Contact | Calculators
```

Hub + buydown + WRAP pages lead with `Adam Styer | Mortgage Solutions LP`. CLAUDE.md global rule: canonical business name. Suggested fix unchanged: `<strong>Adam Styer | Mortgage Solutions LP</strong> · NMLS #513013 · …`.

### P2-C: Buydown frequency label "Annual" vs radio value "yr" (carry-over → fixed by P0-A patch)

Fixed implicitly by Patch 1 (P0-A).

### P2-D: Wrap calculator — no validation against negative-amortization (CARRY-OVER)

`wrap-mortgage-calculator.html` lines 364–376 still allow user to enter balance + rate + a P&I below the interest portion. `amortize()` then enters its `principal <= 0 → continue` branch indefinitely. No soft warning. No "calculate from balance/rate/term" helper button.

### P2-E: Refinance closing-cost — Lender's Title Policy default ($2,119) is unexplained (CARRY-OVER)

`refinance-calculator.html` line 544. Texas-specific tooltip would clarify the regulated-by-TDI basis. P2.

### P2-F: Calculators hub footer is full 4-column; individual calc pages use stripped footer (CARRY-OVER)

`calculators.html` 133–178 vs `calculator-payment.html` 110–116. Inconsistency on back-navigation. Adam call.

---

## P3 — Feature gaps vs competitors

No competitor scan re-run this week (per CONTEXT.md, recent `styer-competitive-weekly` runs cover this surface area). Feature-gap table from 2026-04-20 / 2026-05-04 remains the working backlog:

| Calculator | Have | Missing vs market | Priority |
|---|---|---|---|
| Payment | P&I + optional T&I | PMI auto-drop at <20% LTV; HOA field | P3 |
| Affordability | DTI + income | User-selectable down %; credit score nudge | P3 (overlaps P1-B) |
| Refi Break-Even | Monthly savings, months to BE | 5-year interest comparison; tax savings note | P3 |
| Buydown | 3/2/1, 2/1, 1/1, 1/0 | — | We're ahead |
| Refi Closing Cost | Itemized estimate | — | We're ahead |
| All | — | GA4 `calculate_complete` event tracking | **P3 (NEW emphasis 2026-05-11)** |

**P3 NEW note 2026-05-11 — analytics tracking on calc completion:**

Adam's website push this week is *speed-to-lead* and *making the site work harder* (per GOALS.md). The calc pages are 7 of the site's deepest-engagement surfaces. Currently they fire a generic GA4 page view and `analytics.js` is included with `defer`, but I see no `gtag('event', 'calculate_complete', …)` or equivalent custom event in any calc page. A 5-line `gtag` call on the calc-completion handler in each calc would:
- Let Adam see *which* calcs are used and how often
- Make conversion math possible once P1-A inline lead capture ships
- Cost effectively nothing to add

Suggested event name: `calc_complete` with parameters `{ calc_type: 'payment' | 'affordability' | 'break_even' | 'buydown' | 'refi_cost' | 'wrap', principal: <number> }`. P3 — not blocking. Logging here so it doesn't get forgotten.

**Texas-specific gaps (still open from prior audits):**
- No regional property-tax defaults (Austin avg ~2.17% vs state ~1.7%)
- No homestead-exemption modeling
- No Texas-homestead/owner-finance disclosure on the WRAP page (Texas Property Code §5.062 lien-based finance restrictions on homestead)

---

## Math correctness — reverification

All previously-verified math still holds. No code changes in any of the math paths since 2026-05-04. Spot-checks not duplicated this run.

---

## Mobile perf

PageSpeed/Lighthouse not run — PSI quota issue per CONTEXT.md is recurring on Monday mornings. Static observations:
- Chart.js still render-blocking in `<head>` on rate-buydown-calculator.html (P0-E)
- All calc pages preload Inter + Playfair Display fonts identically (no per-page anomaly)
- All calc pages load `script.js`, `scroll-effects.js`, `analytics.js` with `defer` ✅

---

## Console / runtime errors

Static scan unchanged from 2026-05-04. No new runtime issues beyond the known P0-A (silent wrong PITI on Annual freq) and P0-B (swapped column display).

---

## Recent file activity (informational, no action required)

| File | Last touched | What changed (inferred from diffs since 2026-05-04 audit) |
|---|---|---|
| `calculator-payment.html` | 2026-05-05 | Nav `Loan Programs` dropdown swapped to headline-products list |
| `calculator-affordability.html` | 2026-05-05 | Same nav swap |
| `calculator-refinance-breakeven.html` | 2026-05-05 | Same nav swap (resolved P1-C) |
| `rate-buydown-calculator.html` | 2026-05-05 | Same nav swap (P0 lines untouched) |
| `wrap-mortgage-calculator.html` | 2026-05-05 | Same nav swap |
| `refinance-calculator.html` | 2026-04-28 | Not touched this week |
| `calculator-suite.js` | 2026-04-01 | Not touched in 40 days |
| `calculators.html` | (not in scan) | Hub file in expected state |

**No calculator math or accessibility code was modified between 2026-05-04 and 2026-05-11.**

---

## Files audited

| File | Lines | P0 | P1 | P2 | P3 |
|---|---|---|---|---|---|
| `calculator-payment.html` | 217 | 1 (P0-C via slider) | 1 (P1-A) | 2 (P2-A, P2-B) | 1 (analytics) |
| `calculator-affordability.html` | 185 | 1 (P0-C) | 2 (P1-A, P1-B) | 1 (P2-B) | 1 (analytics) |
| `calculator-refinance-breakeven.html` | 205 | 1 (P0-C) | 1 (P1-A) | 2 (P2-A, P2-B) | 1 (analytics) |
| `refinance-calculator.html` | 1241 | 1 (P0-D) | 1 (P1-A) | 1 (P2-E) | 1 (analytics) |
| `rate-buydown-calculator.html` | 1235 | 3 (P0-A, P0-B, P0-E) | 1 (P1-A) | 1 (P2-C → fixed by P0-A) | 1 (analytics) |
| `wrap-mortgage-calculator.html` | 908 | 1 (P0-C; nearly every input unlabeled) | 1 (P1-A) | 1 (P2-D) | 1 (TX homestead) |
| `calculators.html` | 184 | — | — | 1 (P2-F) | — |
| `calculator-suite.js` | 266 | 1 (P0-C source) | — | — | — |

---

## Adam — Action Items (Monday triage, ≤10 min)

This week is the third consecutive Monday these P0s have surfaced. **The patch already exists** on disk and was reviewed in two prior audits (2026-04-20 author, 2026-05-04 re-verifier). Suggested apply order with rough time:

1. **Apply `patches/calculator-2026-04-20-P0.diff`** — 15 min total. Order: P0-A (1 line) → P0-B (2 lines) → P0-E (move 1 script tag) → P0-D (14 id/for pairs) → P0-C (regress-test 4 pages after).
2. **Decide on P1-A inline lead capture** — render location + which 1–3 calcs ship first. Open question, not a code edit.
3. **One-line P2-A href normalization** — 2 file edits.
4. **Decide on P2-B footer brand line** — agree on canonical 1-line footer for the small calc pages, apply to all three.

P3 (incl. analytics event) and Texas-specific gaps → log to TODO.md backlog. Not blocking.

---

*No calculator HTML or JS was modified by this audit. No new patch file was written; the existing `patches/calculator-2026-04-20-P0.diff` covers every P0 surfaced here.*
