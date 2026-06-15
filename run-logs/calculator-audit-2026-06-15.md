# Calculator Audit — 2026-06-15

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, refinance-calculator.html, wrap-mortgage-calculator.html, **asset-depletion-calculator.html (NEW)**, **dscr-calculator.html (NEW)**, calculators.html (hub), calculator-suite.js, calculator-suite.css
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Run mode:** Read-only — no calculator code modified. One optional P0 patch written to `patches/calculator-2026-06-15-P0.diff` (NOT applied).

---

## TL;DR — triage in 5 minutes

**Big change since the last audit (2026-06-01).** Commit `f6c4080` (2026-06-09) finally shipped the long-stalled P0 patch and resolved **3 of the 5** P0s that had been live 42+ days. Two **new, well-built calculators** (asset-depletion, DSCR) also shipped — both are clean (good a11y, guarded math, working CTAs). The conversion picture improved too: every calc page now routes to `/scenario` + Calendly.

**What's actually left:**

| ID | Sev | One-liner | Effort |
|----|-----|-----------|--------|
| **P0-B** | P0 | rate-buydown **on-screen** schedule: Principal/Interest column headers swapped vs the data (`f6c4080` didn't touch this) | 1 line swap |
| **P0-C-resid** | P0 | 5 inline sliders + 11 wrap inputs still have no screen-reader label (WCAG AA) | ~16 `aria-label`s |
| P1-A | P1 | No inline lead form on the 6 original calcs (CTAs now exist, so less severe). 2 new calcs have form scaffolding **gated on an empty `WEBHOOK_URL`** | 1 config line to activate |
| P1-B | P1 | affordability hardcodes 5% down, undisclosed | 1 line + 1 disclosure |
| P2-G | P2 | "Equal Housing Lender" missing on 6 of 9 calc surfaces (HUD/new-co audit risk) | 6 string adds |
| P2-A | P2 | legacy `/get-preapproved.html` href on payment + breakeven | 2 hrefs |

Both remaining P0s are in `patches/calculator-2026-06-15-P0.diff` (find/replace doc, not applied).

> ⚠️ **Task-file drift, not a site issue:** the audit task definition still says the business name is "Adam Styer | Mortgage Solutions LP." That entity was **retired 2026-05-20**. The site correctly uses **"Adam Styer | HyperSmart Home Loans"** (display) / **"Kyber Mortgage Corporation dba HyperSmart Home Loans"** (legal, NMLS 2653540). No site copy uses the old name. The SKILL.md task file should be updated.

---

## STATUS OF PRIOR P0 ISSUES — reverified against current source (2026-06-15)

| ID | Issue | Status | Evidence |
|----|-------|--------|----------|
| P0-A | buydown `taxFreq/insFreq === 'annual'` 12× PITI bug | ✅ **FIXED** (`f6c4080`, verified live 06-10) | lines 1035-1036 now `=== 'yr'` |
| P0-B | on-screen schedule emits interest/principal under Principal/Interest headers | ❌ **STILL OPEN** | header L530-531 = `Principal, Interest`; cells L902-903 emit `r.interest, r.principal` |
| P0-C | `createSlider()` factory missing label/aria | ✅ **FIXED** in JS (`f6c4080`) | calculator-suite.js L71/74 now `<label for>` + `aria-label` |
| P0-C-resid | 5 inline sliders + 11 wrap inputs NOT covered by the JS fix | ❌ **STILL OPEN** | see P0-C-resid below |
| P0-D | 14 refinance fee-row labels missing `for`/`id` | ✅ **FIXED** (`f6c4080`) | `grep -c 'fee-row"><label>'` = 0; 29 `for=` pairs, all fee rows associated |
| P0-E | Chart.js render-blocking in `<head>` | ✅ **RESOLVED** → demoted to P2 | moved to L725 (body, after `</head>` L257). Still synchronous mid-body — see P2-E2 |

### P0-B — Buydown on-screen amortization columns are mislabeled (CONFIRMED OPEN)

The **math engine is correct** — this is a display/label bug only, but it shows borrowers visibly wrong information.

```
On-screen schedule header (rate-buydown-calculator.html:527-533):
  #  Date  Rate  Payment  [Principal]  [Interest]  Subsidy  Balance
On-screen schedule cells (L899-904):
  month date rate payment  [r.interest][r.principal] subsidy balance   ← SWAPPED
```

In month 1 of any loan, interest >> principal, so the column **labeled "Principal" displays the large interest figure** and vice-versa. The **modal/full schedule** (header L1008 `…Interest, Principal…`, cells L1015-1016 `r.interest, r.principal`) is internally consistent — so the data convention is interest-then-principal everywhere; only the on-screen *header* is wrong.

**Fix (lowest-risk):** swap the two `<th>` labels at L530-531 to `Interest` then `Principal` so the header matches the data and the modal. 1-line swap. In patch.

### P0-C-resid — Hand-written sliders/inputs still unreachable by screen readers (CONFIRMED OPEN)

The JS factory was fixed, but these inputs are hand-coded in the old pattern (`<span>` label inside a div, no `for`, no `aria-label`):

- `calculator-payment.html`: `#tax-slider` (L73), `#ins-slider` (L78)
- `calculator-refinance-breakeven.html`: `#new-rate` (L74), `#new-term` (L78), `#costs` (L82)
- `wrap-mortgage-calculator.html`: **11 inputs** — `w-balance, w-existing-rate, w-existing-payment, w-original-term, w-loan-age, w-sale-price, w-closing-pct, w-wrap-rate, w-term, w-appreciation, w-market-rate` (the `<label class="calc-slider-label">` elements carry no `for`; the `<span>` labels aren't associated at all)

WCAG 2.1 AA failure (1.3.1 Info & Relationships, 4.1.2 Name/Role/Value). Fix = add `aria-label` to each (16 inputs). All in patch.

---

## P1 — Conversion

### P1-A — Inline lead capture (severity REDUCED, not closed)

- `grep -c "<form"` = **0** on all 6 original calc pages (payment, affordability, breakeven, buydown, refinance, wrap). Still no inline capture there.
- **But the "unclear CTA" half of this finding is now resolved:** every calc page has visible CTAs — nav "Send Your Scenario" → `/scenario.html`, plus in-page buttons. Calc CTAs were rerouted off the raw 1003 to `/scenario` + Calendly in `35336e4`.
- **The two NEW calcs already have inline lead-form scaffolding** (`#adc-email-form`, `#dscr-lead`) — but both are `hidden` because `WEBHOOK_URL = ""`. **Activating inline capture on those two is a one-line config change** (set `WEBHOOK_URL` to the n8n `Web Lead Automation` webhook, workflow `PiuIsQpBuydtFM4m`). Lowest-effort, highest-intent capture win on the site.

Recommended order if Adam wants inline forms: turn on the two existing ones (asset-dep, DSCR — the complicated-income surfaces) first, then add to payment/affordability/buydown.

### P1-B — Affordability hardcodes 5% down, undisclosed (CARRY-OVER)

`calculator-affordability.html:147` still `var estPrice = maxPrincipal / 0.95; // assume 5% down`. The on-page disclosure (L84) says "~7% rate, 30-year term, P&I ~28% of gross" — **no mention of the 5% down baked into the displayed max price.** Either disclose it or (better, per competitor scan) make down % user-selectable. Not in the P0 patch (P1, math-touching — Adam's call).

---

## P2 — Polish / compliance

| ID | Issue | Files | State |
|----|-------|-------|-------|
| **P2-G** | "Equal Housing Lender" missing | affordability, payment, breakeven, rate-buydown, wrap, calculators (6 of 9) | **OPEN** — refinance, asset-depletion, dscr have it |
| P2-A | legacy `/get-preapproved.html` href (canonical is `/get-preapproved`) | calculator-payment.html:110, calculator-refinance-breakeven.html:116 | **OPEN** (affordability already fixed → `/scenario.html`) |
| P2-E1 | Refi "Lender's Title Policy" default unexplained (TX TDI-regulated rate) | refinance-calculator.html | OPEN (unchanged) |
| P2-E2 | Chart.js synchronous mid-body — add `defer` (was P0-E, now de-escalated) | rate-buydown-calculator.html:725 | NEW state — no longer head-blocking, still blocks ~500 lines below it |
| P2-D | WRAP no validation against negative-am inputs | wrap-mortgage-calculator.html | OPEN — does **not** crash (amortize() handles it; coverage NaN → "—"), just allows odd scenarios |

**P2-G verification (this run):**
```
affordability:0  payment:0  breakeven:0  rate-buydown:0  wrap:0  calculators:0
refinance:1  asset-depletion:1  dscr:1
```
HUD/FHEO advertising rule (24 CFR §110.10) — calculators are advertising surfaces. The new-company compliance review will flag this. 6-file string add: FIND `513013 (Adam Styer).` → REPLACE `513013 (Adam Styer). Equal Housing Lender.` (kept OUT of the P0 patch — bundle into the same Monday triage session).

---

## NEW CALCULATORS — fresh audit (asset-depletion, DSCR)

Both shipped since the last audit. **Both are high quality — no P0 or P1.**

**asset-depletion-calculator.html (1458 lines)**
- ✅ a11y: every input has `<label for>`; segmented controls use `role="tablist"`/`role="group"` + `aria-label`; coverage meter uses `aria-live`
- ✅ math guarded: `num()` clamps negatives to 0, `pct()` clamps 0–100, `monthlyFromAssets()` guards `periodMonths <= 0`, coverage ratio guards `target > 0`
- ✅ haircuts editable per asset class (checking 100 / brokerage 100 / retirement 70 / other 100 defaults); selectable depletion periods (36/60/84 primary + longer reference) — **this already covers the competitor scan's "selectable term" suggestion**
- ✅ CTAs: "Send Your Scenario" + "Book 15-Min Call" (Calendly); EHL + full Kyber/HyperSmart compliance footer present
- ◽ inline email form built but `hidden` (`WEBHOOK_URL=""`) — see P1-A

**dscr-calculator.html (1275 lines)**
- ✅ a11y: all `<label for>`; error hints via `aria-describedby`; `aria-live` status
- ✅ math guarded: `monthlyPI()` guards `loan<=0 || n<=0` and `rate===0`; **`dscr = pitia > 0 ? rent/pitia : 0`** (div-by-zero safe); `validate()` catches negatives and `downAmount > price`
- ✅ already outputs a **pass/fail band** (strong / solid / tight thresholds) — **covers the competitor scan's "DSCR pass/fail indicator" suggestion**
- ✅ CTAs + EHL + compliance footer; DSCR-is-investment-only disclaimer present
- ◽ inline lead form built but `hidden` (`WEBHOOK_URL=""`) — see P1-A

---

## Math correctness — full reverification

**`calculator-suite.js` (shared engine) — clean:**
- `monthlyPayment()`: guards `principal<=0` → 0 and `r===0` → `principal/n`. One latent edge: `years===0` → `n===0` → `Infinity`, but UI sliders enforce `min` terms (breakeven `min=10`, etc.) so unreachable. P3 note only.
- `amortize()`: guards `bal<=0` (break) and `principal<=0` (negative-am continue) — bounded by `months`. Safe.
- `computeWrap()`: `coverage` → `NaN` only if `monthlyMortgagePayment<=0`, rendered as "—". No div-by-zero.
- down-payment toggle: all `price > 0 ?` guards present.
- **No PMI logic anywhere** — federal auto-cancellation at 78% LTV is not modeled (P3, carry).

**Per-calc input guards:** all numeric inputs carry `min="0"`; rate inputs bounded (buydown 2–12, dscr 0–20, wrap 0–15); terms bounded. Negative/zero-input crashes not reachable through the UI.

**Texas-specific:** no regional property-tax defaults (Austin ~2.17% vs state ~1.7%); payment/affordability carry only a "~2% rule of thumb" note. No homestead-exemption modeling. WRAP page carries TX Property Code Ch. 5 + SAFE Act disclosure in FAQ JSON-LD. (P3, carry.)

---

## Mobile perf

Lighthouse/PSI **not run** — PSI quota remains drained (CONTEXT.md HIGH blocker, now 33+ consecutive periods); no live browser in this autonomous run. Static observations:
- ✅ Chart.js no longer render-blocking in `<head>` (P0-E resolved) — but still synchronous at body L725 (add `defer` → P2-E2)
- ✅ all calc pages load `script.js`, `scroll-effects.js`, `analytics.js` with `defer`; viewport meta + `<html lang="en">` present
- ◽ no `calc_complete` / GA4 calc-engagement event on any calc page or in the suite JS (P3, carry) — sharper gap now that `generate_lead` is sitewide

---

## Console / runtime errors

Static scan only (no live browser this run). No `console.error|TODO|FIXME|XXX` in calculator-suite.js or the two new calcs. Known runtime-visible issues: **P0-B** (mislabeled buydown columns) and **P0-C-resid** (unlabeled controls → screen-reader failure). No new runtime issues surfaced via static scan.

---

## P3 — Feature gaps vs market (Rocket / Bankrate / NerdWallet / Zillow — fresh scan this run)

**The moat holds.** None of the Big 4 offer a **buydown, wrap, asset-depletion, or DSCR** calculator — these four are pure differentiators and map exactly to the GOALS.md "complicated income" positioning. Treat them as SEO/lead-gen assets. Two suggested refinements (asset-dep selectable term, DSCR pass/fail) **are already implemented**.

**Where Adam is behind (commodity calcs, P3 catch-up):**
- **Payment**: HOA field; PMI line + auto-drop at 78–80% LTV; full amortization schedule + chart; extra-payment / biweekly modeling (Rocket, Bankrate, Zillow)
- **Affordability**: front-end vs back-end DTI split; itemized monthly-debts input; dual-mode (solve from payment or from income) (NerdWallet, Zillow)
- **Refi break-even** & **closing-cost estimator**: at parity; minor UX/regional polish only (TX-specific closing-cost defaults would edge ahead)

Strategic read (from scan): don't out-polish the aggregators on commodity calcs; close only the credibility gaps (HOA + PMI auto-drop + amortization on Payment), and lean on the four niche calculators. Highest strategic weight given the pivot: **PMI auto-drop** and an **income-type toggle** (W-2 / 1099 / self-employed / asset-based) on the commodity calcs.

---

## Adam — Action items (Monday triage, ≤10 min)

1. **Apply `patches/calculator-2026-06-15-P0.diff`** — 2 P0s, ~17 lines total, find/replace, no math touched:
   - P0-B: swap 2 `<th>` labels on rate-buydown (1 visual swap)
   - P0-C-resid: add `aria-label` to 5 inline sliders + 11 wrap inputs
2. **Bundle P2-G (Equal Housing Lender)** in the same session — 6 files, 1 string each, ~3 min. HUD + new-company-audit risk.
3. **One-line conversion win:** set `WEBHOOK_URL` on asset-depletion + DSCR to the n8n `Web Lead Automation` webhook (`PiuIsQpBuydtFM4m`) to switch on the inline lead forms already built into those pages.
4. **P2-A:** `/get-preapproved.html` → `/get-preapproved` on calculator-payment.html:110 + calculator-refinance-breakeven.html:116.
5. **P1-B (your call):** affordability 5% down — disclose it or make down % selectable.
6. P3 backlog → TODO.md: PMI auto-drop, amortization schedule on Payment, income-type toggle, `calc_complete` analytics, TX tax defaults.

*Also: update the audit SKILL.md business name from the retired "Mortgage Solutions LP" to "Adam Styer | HyperSmart Home Loans."*

---

## Files audited

| File | Lines | P0 | P1 | P2 | P3 |
|------|-------|----|----|----|----|
| calculator-payment.html | 222 | P0-C-resid (×2) | P1-A | P2-A | PMI, HOA, amort |
| calculator-affordability.html | 190 | — | P1-A, P1-B | P2-G | DTI split, debts |
| calculator-refinance-breakeven.html | 210 | P0-C-resid (×3) | P1-A | P2-A, P2-G | UX framing |
| refinance-calculator.html | 1241 | — (P0-D fixed) | P1-A | P2-E1, P2-G | TX defaults |
| rate-buydown-calculator.html | 1235 | **P0-B** | P1-A | P2-E2, P2-G | ahead of market |
| wrap-mortgage-calculator.html | 910 | P0-C-resid (×11) | P1-A | P2-D, P2-G | ahead of market |
| asset-depletion-calculator.html | 1458 | — | (form gated) | P2-G | ahead of market |
| dscr-calculator.html | 1275 | — | (form gated) | — | ahead of market |
| calculators.html | 282 | — | — | P2-G | — |
| calculator-suite.js | 266 | — | — | — | no PMI logic |
| calculator-suite.css | 241 | — | — | — | — |

---

*No calculator HTML or JS was modified by this audit. `patches/calculator-2026-06-15-P0.diff` (find/replace document, NOT git-apply-able, NOT applied) covers P0-B + P0-C-resid only. Adam reviews and picks what to ship Monday.*
