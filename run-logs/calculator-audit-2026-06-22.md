# Calculator Audit — 2026-06-22

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, refinance-calculator.html, wrap-mortgage-calculator.html, asset-depletion-calculator.html, dscr-calculator.html, calculators.html (hub), calculator-suite.js, calculator-suite.css
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Run mode:** Read-only — no calculator code modified. No new patch written (see "Patch status" below).

---

## TL;DR — triage in 5 minutes

**Nothing moved this week.** `git log` shows **zero calculator code commits since the 2026-06-15 audit** — the only commit touching this area was the audit report itself (`3431a9e`). I re-verified all six open items line-by-line against current source: **all six are still open, unchanged.**

The actionable headline is the same one as last Monday, now carried a second week: a **ready, no-math, line-independent P0 patch (`patches/calculator-2026-06-15-P0.diff`) is sitting unapplied.** It still matches current source exactly — apply it as-is.

| ID | Sev | One-liner | Effort | Weeks open |
|----|-----|-----------|--------|-----------|
| **P0-B** | P0 | rate-buydown on-screen schedule: "Principal"/"Interest" headers swapped vs the data borrowers see | 1-line `<th>` swap | 2+ |
| **P0-C-resid** | P0 | 16 hand-coded inputs (2 payment + 3 breakeven + 11 wrap) have no screen-reader label — WCAG AA | 16 `aria-label`s | 2+ |
| P1-A | P1 | 2 new calcs have inline lead forms built but gated on empty `WEBHOOK_URL` | 1 config line | 2+ |
| P1-B | P1 | affordability hardcodes 5% down, not disclosed | 1 line + 1 disclosure | carry |
| P2-G | P2 | "Equal Housing Lender" missing on 6 of 9 calc surfaces (HUD / new-co audit risk) | 6 string adds | 2+ |
| P2-A | P2 | legacy `/get-preapproved.html` href on payment + breakeven | 2 hrefs | 2+ |

Both P0s and P2-G are pre-written in the existing patch. **No P0 surprises, no regressions, no new runtime errors.**

> ⚠️ **Task-file drift (unchanged, still worth one fix):** the audit SKILL.md still names the business "Adam Styer | Mortgage Solutions LP" — retired 2026-05-20. Site correctly uses **"Adam Styer | HyperSmart Home Loans"** (display) / **"Kyber Mortgage Corporation dba HyperSmart Home Loans"** (legal, NMLS 2653540). Update the SKILL.md.

---

## Re-verification against current source (2026-06-22)

`git log --since=2026-06-14 -- '*calculator*' calculator-suite.js calculator-suite.css` → only `3431a9e` (the 06-15 report). **No code change in 7 days.** Each item below was re-grepped against live files this run, not carried on faith.

### P0-B — rate-buydown on-screen amortization columns mislabeled — **CONFIRMED OPEN**

Display bug, not a math bug — but borrowers see visibly wrong numbers.

```
On-screen header (rate-buydown-calculator.html:530-531):  Principal | Interest
On-screen cells   (rate-buydown-calculator.html:902-903):  r.interest | r.principal   ← reversed vs header
Modal/full header (rate-buydown-calculator.html:1008):     ...Interest | Principal...  ← correct & consistent
```

Data convention is interest-then-principal everywhere; only the on-screen **header** is wrong. In month 1 (interest ≫ principal) the column labeled "Principal" shows the big interest figure. **Fix:** swap the two `<th>` at L530-531. 1 line. In patch.

### P0-C-resid — 16 hand-coded inputs unreachable by screen readers — **CONFIRMED OPEN**

`label … for=` count is **0** in all three files; the visible labels are bare `<span>`s inside a `<div class="calc-slider-label">` with no association, and the inputs carry no `aria-label`:

- `calculator-payment.html` — `#tax-slider` (L73), `#ins-slider` (L78)
- `calculator-refinance-breakeven.html` — `#new-rate` (L74), `#new-term` (L78), `#costs` (L82)
- `wrap-mortgage-calculator.html` — 11 inputs (`w-balance, w-existing-rate, w-existing-payment, w-original-term, w-loan-age, w-sale-price, w-closing-pct, w-wrap-rate, w-term, w-appreciation, w-market-rate`). Verified: the 6 `aria-label`s in this file are all on nav/social icons, **none on a `w-` input**.

WCAG 2.1 AA failure (1.3.1, 4.1.2). Fix = one `aria-label` per input. All 16 in patch.

### P1-A — inline lead forms gated on empty `WEBHOOK_URL` — **CONFIRMED OPEN**

`asset-depletion-calculator.html:1099` and `dscr-calculator.html:950` both still `var WEBHOOK_URL = "";`. The forms (`#adc-email-form`, `#dscr-lead`) are fully built and `hidden`. Setting `WEBHOOK_URL` to the n8n **Web Lead Automation** webhook (workflow `PiuIsQpBuydtFM4m`) switches on inline capture on the two highest-intent "complicated-income" surfaces. Highest-leverage, lowest-effort conversion win on the site. (No inline form on the 6 original calcs — CTAs to `/scenario` + Calendly do exist, so this is the weaker half of the finding.)

### P1-B — affordability hardcodes 5% down, undisclosed — **CONFIRMED OPEN**

`calculator-affordability.html:147` → `var estPrice = maxPrincipal / 0.95; // assume 5% down`. The disclosure (L84) discloses rate/term/28%-DTI but **says nothing about the 5% down** baked into the displayed max price. Disclose it, or make down% selectable (competitor parity). Math-touching → Adam's call, not in patch.

### P2-G — "Equal Housing Lender" missing on 6 of 9 surfaces — **CONFIRMED OPEN**

```
affordability:0  payment:0  breakeven:0  rate-buydown:0  wrap:0  calculators:0   ← missing
refinance:1  asset-depletion:1  dscr:1                                            ← present
```

HUD/FHEO advertising rule (24 CFR §110.10) — calculators are advertising surfaces, and the new-company compliance review will flag this. 6-file string add (`513013 (Adam Styer).` → `513013 (Adam Styer). Equal Housing Lender.`). In patch.

### P2-A — legacy `/get-preapproved.html` href — **CONFIRMED OPEN**

`calculator-payment.html:110` and `calculator-refinance-breakeven.html:116` still link `/get-preapproved.html` (canonical is extension-less `/get-preapproved`). affordability already fixed. 2 hrefs.

---

## Math correctness — spot re-verification

No engine change since 06-15, so the prior full pass stands. Re-confirmed the load-bearing guards still present in `calculator-suite.js`: `monthlyPayment()` guards `principal<=0` and `r===0`; `amortize()` guards `bal<=0` / `principal<=0`; `computeWrap()` renders `coverage` NaN as "—". New calcs: DSCR `dscr = pitia > 0 ? rent/pitia : 0` (div-by-zero safe); asset-depletion clamps negatives and guards `periodMonths<=0`. **No new edge cases. No PMI auto-cancellation logic anywhere (P3, carry). No TX-specific property-tax or homestead defaults (P3, carry).**

## Accessibility / console / mobile perf

- Console: static scan only (no live browser in autonomous run). No `console.error|TODO|FIXME|XXX` in the suite JS or new calcs. Only runtime-visible defects are P0-B + P0-C-resid.
- Mobile perf: **Lighthouse/PSI not run — PSI quota still drained** (CONTEXT.md HIGH blocker, now 33+ consecutive periods). Static: Chart.js no longer head-blocking (P0-E resolved 06-09) but still synchronous mid-body on rate-buydown (P2-E2, add `defer`); all calc pages `defer` script.js/scroll-effects/analytics; viewport + `lang` present.

---

## P3 — feature gaps vs market (refreshed scan, 2026-06-22)

Re-scanned Bankrate / NerdWallet / Zillow / aggregator round-ups. **The moat holds** — none of the Big 4 offer a buydown, wrap, asset-depletion, or DSCR calculator; those four map exactly to the "complicated income" positioning. Keep them as SEO/lead-gen assets.

**One correction to last week's P3 framing:** this week's scan confirms even the leaders do **not** model PMI *auto-drop / auto-cancellation* — they show a PMI **line item** that appears when down payment < 20%, plus HOA fields and amortization tables. So the realistic Payment-calc catch-up is narrower than "PMI auto-drop":
1. **HOA field** (universal on Big 4)
2. **PMI line** that appears under 20% down (not full 78%-LTV auto-cancellation modeling — nobody ships that)
3. **Amortization schedule** on the Payment calc (Bankrate/NerdWallet/Zillow all have it)

Affordability commodity gaps unchanged: front-end vs back-end DTI split, itemized debts, solve-from-payment mode. Strategic read is the same — don't out-polish aggregators on commodity calcs; close the three credibility gaps above and lean on the four niche calculators. Highest pivot-aligned add remains an **income-type toggle** (W-2 / 1099 / self-employed / asset-based).

---

## Patch status

**No new patch written this run.** `patches/calculator-2026-06-15-P0.diff` is a line-number-independent find/replace document and current source is byte-for-byte identical to when it was authored — it **still applies verbatim**. It covers P0-B + P0-C-resid (and the report references P2-G's one-string edit). Writing a duplicate dated copy would add nothing. Apply the existing file.

---

## Adam — Action items (Monday triage, ≤10 min)

1. **Apply `patches/calculator-2026-06-15-P0.diff`** — 2 P0s, ~17 lines, find/replace, no math. (P0-B header swap + 16 `aria-label`s.) This has now carried 2 weeks unapplied.
2. **Bundle P2-G** in the same session — 6 files, 1 string each (`Equal Housing Lender`). HUD + new-company audit risk.
3. **One-line conversion win:** set `WEBHOOK_URL` on asset-depletion + DSCR → n8n `Web Lead Automation` webhook (`PiuIsQpBuydtFM4m`) to turn on the inline forms already built into those pages.
4. **P2-A:** `/get-preapproved.html` → `/get-preapproved` on calculator-payment.html:110 + calculator-refinance-breakeven.html:116.
5. **P1-B (your call):** affordability 5% down — disclose it or make down% selectable.
6. **P3 backlog → TODO.md:** HOA field + PMI line (under-20% display, not auto-drop) + amortization schedule on Payment; income-type toggle; `calc_complete` analytics; TX tax defaults.
7. **Housekeeping:** update the audit SKILL.md business name off the retired "Mortgage Solutions LP."

---

## Files audited

| File | Lines | P0 | P1 | P2 | P3 |
|------|-------|----|----|----|----|
| calculator-payment.html | 222 | P0-C-resid (×2) | P1-A | P2-A | HOA, PMI line, amort |
| calculator-affordability.html | 190 | — | P1-A, P1-B | P2-G | DTI split, debts |
| calculator-refinance-breakeven.html | 210 | P0-C-resid (×3) | P1-A | P2-A, P2-G | UX framing |
| refinance-calculator.html | 1241 | — | P1-A | P2-E1, P2-G(has EHL) | TX defaults |
| rate-buydown-calculator.html | 1235 | **P0-B** | P1-A | P2-E2, P2-G | ahead of market |
| wrap-mortgage-calculator.html | 910 | P0-C-resid (×11) | P1-A | P2-D, P2-G | ahead of market |
| asset-depletion-calculator.html | 1458 | — | P1-A (form gated) | — (has EHL) | ahead of market |
| dscr-calculator.html | 1275 | — | P1-A (form gated) | — (has EHL) | ahead of market |
| calculators.html | 282 | — | — | P2-G | — |
| calculator-suite.js | 266 | — | — | — | no PMI logic |
| calculator-suite.css | 241 | — | — | — | — |

---

*No calculator HTML or JS was modified by this audit. No new patch written — the existing `patches/calculator-2026-06-15-P0.diff` still applies verbatim to unchanged source. Adam reviews and picks what to ship Monday.*
