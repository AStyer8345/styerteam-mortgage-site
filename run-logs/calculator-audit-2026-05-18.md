# Calculator Audit — 2026-05-18

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, refinance-calculator.html, wrap-mortgage-calculator.html, calculators.html (hub)
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Time:** 2026-05-18
**Run mode:** Read-only — no calculator code modified. No new patch written.

---

## EXECUTIVE SUMMARY

**Week 4 — same 5 P0 issues from 2026-04-20 still UNFIXED.** Now live 28 days. The patch file `patches/calculator-2026-04-20-P0.diff` is still on disk, still applies cleanly, still covers every P0 surfaced here. Nothing material changed in calculator code this week.

**The only calc-file edits since the 2026-05-11 audit:** single-line footer copy swap (`21-Day Avg. Close` → `1,000+ Loans Closed`) on `wrap-mortgage-calculator.html` and `calculators.html`, part of the sitewide 2026-05-17 "private-wealth pivot" commit (`e76a214`). Two-character change. No math, no a11y, no nav.

The wider site shipped a substantial UX/conversion overhaul this week (smart forms, hero redesign, `/scenario` page, quick prequal funnel — commits `0fbee10`, `9954660`, `6238a67`). **None of it touched calc pages.** Calc pages are still the highest-traffic surfaces on the site with no inline lead capture, and they're now visibly out of step with the rest of the site's new conversion posture.

**No new P0 or P1 items this week. No new patch written.**

**Recommendation (4th week in a row):** Apply `patches/calculator-2026-04-20-P0.diff` Monday — 15 minutes. P0-A is actively producing wrong PITI (12× inflated) for any user who toggles tax/ins frequency on the buydown calculator. Every week it stays live is more wrong numbers shipped to real users.

---

## STATUS OF PRIOR P0 ISSUES

All 5 still open. Verified live this run.

| ID | Issue | File | Line(s) | Status |
|----|-------|------|---|---|
| P0-A | `taxFreq === 'annual'` / `insFreq === 'annual'` never true (radio values are `mo`/`yr`) | rate-buydown-calculator.html | 1035–1036 | **OPEN — 28d live** |
| P0-B | On-screen schedule renders Interest in "Principal" column and vice versa | rate-buydown-calculator.html | 902–903 (data) vs 532–533 (header) | **OPEN — 28d live** |
| P0-C | `createSlider()` produces `<span>` label, no `for`/`aria-label` | calculator-suite.js | 71, 74 | **OPEN — 28d live** |
| P0-D | 14 fee-row `<label>` elements have no `for`; inputs have no `id` | refinance-calculator.html | 503–507, 527–535 | **OPEN — 28d live** |
| P0-E | Chart.js loaded in `<head>` without async/defer | rate-buydown-calculator.html | 42 | **OPEN — 28d live** |

Verification grep (this run, 2026-05-18):

```text
$ grep -n "taxFreq ===" rate-buydown-calculator.html
1035:        var taxMo   = taxFreq === 'annual' ? taxRaw / 12 : taxRaw;
$ grep -n "insFreq ===" rate-buydown-calculator.html
1036:        var insMo   = insFreq === 'annual' ? insRaw / 12 : insRaw;

$ grep -n "fmtDollarInt(r.principal)\|fmtDollarInt(r.interest)" rate-buydown-calculator.html
902:            + '<td>' + fmtDollarInt(r.interest) + '</td>'
903:            + '<td>' + fmtDollarInt(r.principal) + '</td>'
1015:                + '<td>' + fmtDollarInt(r.interest) + '</td>'  (print version — header matches, OK)
1016:                + '<td>' + fmtDollarInt(r.principal) + '</td>' (print version — header matches, OK)

$ grep -n "chart.umd" rate-buydown-calculator.html
42:  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>

$ grep -c "fee-row\"><label>" refinance-calculator.html
14

$ grep -n "aria-label" calculator-suite.js
(no matches)
```

---

## P0 — Recap

Full descriptions and fixes documented in 2026-04-20, 2026-05-04, and 2026-05-11 audits. Not duplicated here. Existing patch covers all 5.

| ID | One-line description | LOC change |
|---|---|---|
| P0-A | `'annual'` → `'yr'` (×2) | 2 lines |
| P0-B | Swap two `r.interest` / `r.principal` lines | 2 lines |
| P0-C | `<span>` → `<label for=…>` + `aria-label` in `createSlider` | ~4 lines |
| P0-D | Add `id`/`for` to 14 fee rows | 14 pairs |
| P0-E | Move Chart.js `<script>` from `<head>` to end-of-`<body>` | move 1 line |

---

## P1 — Conversion miss

### P1-A: No inline lead capture form on any calculator (CARRY-OVER → growing more painful)

Verified 2026-05-18: `grep -c "<form\|netlify" *calculator*.html` returns **0** on all 6 calc pages.

The site shipped major conversion work this week — smart forms on `/scenario`, quick prequal funnel, hero conversion overhaul. The calc pages remain the deepest-engagement surfaces on the site with no capture. This is now the single biggest gap between what calc visitors do (deep intent) and what the site captures (nothing).

n8n `Web Lead Automation` workflow (`PiuIsQpBuydtFM4m`) is in place. The decision still pending is product, not infrastructure:
- Where on the page (below result card vs sticky footer vs modal)
- Which 1–3 calcs ship first (suggested order unchanged: payment → affordability → buydown)
- Whether to mirror the new `/scenario` form pattern or use a slim 3-field capture

### P1-B: calculator-affordability — 5% down hardcoded, undisclosed (CARRY-OVER)

`calculator-affordability.html` line 141 still: `var estPrice = maxPrincipal / 0.95;`. Disclosure on line 78 still doesn't mention the 5% down assumption.

---

## P2 — Polish (CARRY-OVERS, no change)

| ID | Issue | File(s) | State |
|---|---|---|---|
| P2-A | `/get-preapproved.html` legacy href; affordability page already canonicalized to `/get-preapproved` | calculator-payment.html:104, calculator-refinance-breakeven.html:110 | unchanged |
| P2-B | Stripped footer omits `Adam Styer | Mortgage Solutions LP` brand line | the three small calc pages | unchanged |
| P2-C | Buydown frequency label vs radio mismatch | rate-buydown-calculator.html | implicitly fixed by P0-A patch |
| P2-D | WRAP — no validation against negative-am inputs | wrap-mortgage-calculator.html | unchanged |
| P2-E | Refi closing-cost — Lender's Title Policy default ($2,119) unexplained (Texas TDI-regulated) | refinance-calculator.html:544 | unchanged |
| P2-F | Hub uses full 4-column footer; calc pages use stripped footer | calculators.html vs others | unchanged |

P2-A verified this run:

```text
calculator-payment.html:104:          <a href="/get-preapproved.html" ...
calculator-refinance-breakeven.html:110:          <a href="/get-preapproved.html" ...
calculator-affordability.html:98:          <a href="/get-preapproved" ...   ← canonical
```

---

## P3 — Feature gaps (no competitor scan this week — covered by `styer-competitive-weekly`)

Working backlog from prior audits, all still open:

| Calculator | Have | Missing vs market | Priority |
|---|---|---|---|
| Payment | P&I + optional T&I | PMI auto-drop at <20% LTV; HOA field | P3 |
| Affordability | DTI + income | User-selectable down %; credit score nudge | P3 (overlaps P1-B) |
| Refi Break-Even | Monthly savings, months to BE | 5-year interest comparison; tax savings note | P3 |
| Buydown | 3/2/1, 2/1, 1/1, 1/0 | — | Ahead of market |
| Refi Closing Cost | Itemized estimate | — | Ahead of market |
| All | — | GA4 `calc_complete` event tracking | P3 |

`grep -n "calc_complete\|calculate_complete\|gtag.*calc"` on all calc pages and `calculator-suite.js` this run: **no matches.** Analytics event tracking on calc completion is still not wired. 5-line `gtag` call per calc.

**Texas-specific gaps (still open):**
- No regional property-tax defaults (Austin ~2.17% vs state ~1.7%)
- No homestead-exemption modeling
- No Texas-homestead/owner-finance disclosure on WRAP page (Texas Property Code §5.062 lien-based finance restrictions on homestead)

---

## Math correctness — reverification

All prior verified math holds. No code changes in any math path since 2026-05-04. The two calc-file edits this week (`e76a214`) were footer text only — confirmed via `git show`. Spot-checks not duplicated.

---

## Mobile perf

PageSpeed/Lighthouse not run — PSI quota issue per CONTEXT.md remains intermittent on Monday morning runs. Static observations unchanged:
- Chart.js still render-blocking in `<head>` on rate-buydown-calculator.html (P0-E)
- All calc pages preload Inter + Playfair Display fonts identically
- All calc pages load `script.js`, `scroll-effects.js`, `analytics.js` with `defer` ✅

---

## Console / runtime errors

Static scan unchanged from 2026-05-11. Known runtime issues:
- P0-A — silent wrong PITI on Annual freq toggle
- P0-B — swapped column display in on-screen schedule

No new runtime issues observed.

---

## Recent file activity (informational)

| File | Last touched | What changed (since 2026-05-11 audit) |
|---|---|---|
| `calculator-payment.html` | 2026-05-05 | (no change) |
| `calculator-affordability.html` | 2026-05-05 | (no change) |
| `calculator-refinance-breakeven.html` | 2026-05-05 | (no change) |
| `rate-buydown-calculator.html` | 2026-05-05 | (no change) |
| `refinance-calculator.html` | 2026-04-28 | (no change in 20 days) |
| `wrap-mortgage-calculator.html` | 2026-05-17 | Footer: `21-Day Avg. Close` → `1,000+ Loans Closed` (1 line) |
| `calculator-suite.js` | 2026-04-01 | (no change in 47 days) |
| `calculators.html` | 2026-05-17 | Footer: same swap (1 line) |
| `calculator-suite.css` | 2026-03-06 | (no change) |

**No calculator math, accessibility, or form code was modified between 2026-05-11 and 2026-05-18.**

Wider site this week shipped (none of which touched calc pages):
- `9954660` UX/conversion overhaul — smart forms, case studies, `/scenario` page
- `6238a67` Quick prequal funnel
- `2b62704` Hero form: optional scenario textarea
- `0fbee10` Hero redesign: remove form, shrink cutout, single-column
- `e76a214` Private-wealth pivot — 6 new niche pages, sitewide `21-Day` → `1,000+` swap

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

4th consecutive Monday. The patch is on disk. Reviewed in 3 prior audits. Suggested order with rough time:

1. **Apply `patches/calculator-2026-04-20-P0.diff`** — 15 min total. Order: P0-A (2 lines) → P0-B (2 lines) → P0-E (move 1 script tag) → P0-D (14 id/for pairs) → P0-C (regress-test 4 pages after).
2. **Decide on P1-A inline lead capture** — render location + which 1–3 calcs ship first. Now disproportionately costly given the site shipped smart forms + prequal funnel + `/scenario` this week and calc pages are still passive.
3. **P2-A** — 2-line `/get-preapproved.html` → `/get-preapproved` href fix.
4. **P2-B** — agree on canonical footer brand line for the 3 stripped-footer calc pages, apply.

P3 (analytics event, Texas-specific gaps) → TODO.md backlog. Not blocking.

---

*No calculator HTML or JS was modified by this audit. No new patch file was written; the existing `patches/calculator-2026-04-20-P0.diff` (28 days old, applies cleanly to today's source) covers every P0 surfaced here.*
