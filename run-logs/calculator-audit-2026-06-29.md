# Calculator Audit — 2026-06-29

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, refinance-calculator.html, wrap-mortgage-calculator.html, asset-depletion-calculator.html, dscr-calculator.html, calculators.html (hub), calculator-suite.js, calculator-suite.css
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Run mode:** Read-only — no calculator code modified. Fresh byte-exact P0 patch written this run (see Patch status).

---

## TL;DR — triage in 5 minutes

**One item closed, the rest carry. Code DID change this week** (unlike the prior two zero-change weeks): the `codex/cta-scenario-first` merge (`09803d0` → `864c42d`, Sat 06-27) touched 7 calc surfaces. It added WebApplication/CollectionPage JSON-LD schema, swapped every "Apply Now / Get Pre-Approved" CTA to **"Send Your Scenario"** (`/scenario.html`), and refreshed trust copy. **That merge resolved P2-A** (the legacy `/get-preapproved.html` hrefs are gone — `grep` returns 0). It touched **none** of the math, the mislabeled table, the missing aria-labels, the missing EHL line, or the gated webhooks.

So: **P2-A closed. Two P0s + three lower items still open, re-verified line-by-line against the 06-27 source.**

| ID | Sev | One-liner | Effort | Weeks open |
|----|-----|-----------|--------|-----------|
| **P0-B** | P0 | rate-buydown on-screen schedule: "Principal"/"Interest" headers swapped vs the data borrowers see | 1-line `<th>` swap | 3+ |
| **P0-C-resid** | P0 | 16 hand-coded inputs (2 payment + 3 breakeven + 11 wrap) have no screen-reader label — WCAG AA | 16 `aria-label`s | 3+ |
| P1-A | P1 | asset-depletion + DSCR inline lead forms built but gated on empty `WEBHOOK_URL` | 1 config line ×2 | 3+ |
| P1-B | P1 | affordability hardcodes 5% down in the max-price math, not disclosed | 1 line + 1 disclosure | carry |
| P2-G | P2 | "Equal Housing Lender" missing on 6 of 9 calc surfaces (HUD / new-co audit risk) | 6 string adds | 3+ |
| ~~P2-A~~ | — | ~~legacy `/get-preapproved.html` href on payment + breakeven~~ | **CLOSED by 06-27 merge** | — |

**Fresh, byte-exact patch written: `patches/calculator-2026-06-29-P0.diff`** — covers P0-B + all 16 aria-labels with full-line FIND/REPLACE (the older 06-15 patch abbreviated the 11 wrap inputs as `...>`, which was fragile; this one spells every line out against current source). No math touched. **No new runtime errors, no regressions.**

> ⚠️ **Task-file drift (still unfixed):** the audit SKILL.md still names the business "Adam Styer | Mortgage Solutions LP" — retired 2026-05-20. Site correctly uses **"Adam Styer | HyperSmart Home Loans"** (display) / **"Kyber Mortgage Corporation dba HyperSmart Home Loans"** (legal, NMLS 2653540). Update the SKILL.md `Business name` line.

---

## What changed since the 06-22 audit

`git log --since=2026-06-21 -- '*calculator*' calculator-suite.js calculator-suite.css`:

- `7d5ae9c` — the 06-22 audit report itself.
- `09803d0` "Improve SEO AEO positioning and conversion proof" (Sat 06-27) — the real change.
- `864c42d` — merge of `codex/cta-scenario-first` into main.

**`09803d0` per-file effect (verified by reading the diff):**

| File | What the merge did | Net effect on open findings |
|------|--------------------|------------------------------|
| calculator-payment.html | +WebApplication schema; CTA → "Send Your Scenario"; `/get-preapproved.html` → `/scenario.html` | **P2-A closed**; P0-C/P2-G untouched |
| calculator-affordability.html | +schema; CTA → scenario | P1-B/P2-G untouched |
| calculator-refinance-breakeven.html | +schema; CTA → scenario; `/get-preapproved.html` → `/scenario.html` | **P2-A closed**; P0-C/P2-G untouched |
| calculators.html | +CollectionPage/ItemList schema (6 calcs); CTA → scenario; footer awards line → "5.0 Google · 4.98 Zillow · 137+ Reviews" | P2-G untouched; see review-copy note below |
| rate-buydown-calculator.html | CTA copy only (L641-647) | **P0-B untouched — still open** |
| refinance-calculator.html | +14 lines (trust/proof copy) | already has EHL |
| wrap-mortgage-calculator.html | 1 line (CTA) | **11 P0-C inputs untouched** |

`calculator-suite.js` last changed `f6c4080` (06-09); `asset-depletion`/`dscr` last changed `7cc31e3` (06-10). No math-bearing code moved this week.

---

## Re-verification against current (06-27) source

### P0-B — rate-buydown on-screen amortization columns mislabeled — **CONFIRMED OPEN (3rd week)**

Display bug, not a math bug — but borrowers see visibly wrong numbers.

```
On-screen header (rate-buydown-calculator.html:529-530):  Principal | Interest
On-screen cells   (rate-buydown-calculator.html:902-903):  r.interest | r.principal   ← reversed vs header
Modal/full header (rate-buydown-calculator.html:1008):     ...Interest | Principal...  ← correct & consistent
Modal/full cells  (rate-buydown-calculator.html:1015-16):  r.interest | r.principal   ← matches its header ✓
```

Data convention is interest-then-principal everywhere. Only the on-screen **header** disagrees. In month 1 (interest ≫ principal) the column labeled "Principal" shows the large interest figure. **Fix:** swap the two `<th>` at L529-530 so the header reads Interest, Principal (matching the cells + the modal). 1 line. In patch.

### P0-C-resid — 16 hand-coded inputs unreachable by screen readers — **CONFIRMED OPEN (3rd week)**

The slider *factory* (`calculator-suite.js:62-100`) emits both a `<label for>` **and** an `aria-label`, so every factory-built slider is accessible. The gap is the **hand-coded** inputs that bypass the factory — verified `aria-label` count = **0** on each:

- `calculator-payment.html` — `#tax-slider` (L86), `#ins-slider` (L91)
- `calculator-refinance-breakeven.html` — `#new-rate` (L87), `#new-term` (L91), `#costs` (L95)
- `wrap-mortgage-calculator.html` — 11 `number` inputs (`w-balance` L365, `w-existing-rate` L369, `w-existing-payment` L373, `w-original-term` L377, `w-loan-age` L381, `w-sale-price` L387, `w-closing-pct` L392, `w-wrap-rate` L396, `w-term` L400, `w-appreciation` L412, `w-market-rate` L481). The file's 6 existing `aria-label`s are all on nav/social icons — none on a `w-` input.

WCAG 2.1 AA failure (1.3.1 Info & Relationships, 4.1.2 Name/Role/Value). Fix = one `aria-label` per input. All 16 in patch, with text matching each visible on-page label.

### P1-A — asset-depletion + DSCR inline lead forms gated on empty `WEBHOOK_URL` — **CONFIRMED OPEN (3rd week)**

`asset-depletion-calculator.html:1099` and `dscr-calculator.html:950` both still `var WEBHOOK_URL = "";`. The forms (`#adc-email-form`, `#dscr-lead`) are fully built and `hidden` until the URL is set. Point `WEBHOOK_URL` at the n8n **Web Lead Automation** webhook (workflow `PiuIsQpBuydtFM4m`) to switch on inline capture on the two highest-intent "complicated-income" surfaces. Highest-leverage, lowest-effort conversion win still on the table. (The 6 general calcs have no inline form, but they now all route CTAs to `/scenario.html` + Calendly + phone, so the conversion path there is healthier than it was pre-06-27.)

### P1-B — affordability hardcodes 5% down, undisclosed — **CONFIRMED OPEN**

`calculator-affordability.html:160` → `var estPrice = maxPrincipal / 0.95; // assume 5% down`. The disclosure (L97) discloses ~7% rate, 30-yr term, and the 28%-of-gross P&I assumption, but **says nothing about the 5% down** baked into the displayed max price. A borrower planning 20% down sees a max price ~19% too high. Disclose it in the existing note, or make down% selectable (the factory already ships a `createDownPaymentToggle` helper — `calculator-suite.js:107` — used by other calcs, so parity is cheap). Math-touching → Adam's call, not in patch.

### P2-G — "Equal Housing Lender" missing on 6 of 9 surfaces — **CONFIRMED OPEN (3rd week)**

```
affordability:0  payment:0  breakeven:0  rate-buydown:0  wrap:0  calculators:0   ← missing
refinance:1  asset-depletion:1  dscr:1                                            ← present
```

HUD/FHEO advertising rule (24 CFR §110.10) — calculators are advertising surfaces, and the pending new-company compliance review will flag this. 6-file string add (`513013 (Adam Styer).` → `513013 (Adam Styer). Equal Housing Lender.`). Not in the P0 patch (it's a P2), but trivial to bundle in the same session.

---

## Math correctness — spot re-verification (read-only)

No engine code changed this week, so the 06-22 full pass stands; I re-grepped every load-bearing guard against current source and all are intact:

- `calculator-suite.js` — `monthlyPayment()` guards `principal<=0` (L28) and `r===0` (L29); `amortize()` guards `bal<=0` (L43) and `principal<=0` (L46); `computeWrap()` renders `coverage` as NaN→"—" when existing payment is 0 (L246).
- `rate-buydown` — `if (annualRatePct <= 0) return principal / (years*12)` (L742); `Math.max(0, …)` balance clamp (L773); seller-credit guard `if (credit <= 0) return` (L850); breakeven cost guard (L1053).
- `refinance` — `if (loanAmt <= 0 || noteRate <= 0) return 0` (L693); `isNaN` parse guards (L651/L660); multiple `Math.max(0, …)` escrow clamps (L761/L764/L773).
- `dscr` — payment guard `if (loan <= 0 || n <= 0) return 0` (L997) + `annualRatePct === 0` branch (L998); div-by-zero safe `dscr = pitia > 0 ? rent/pitia : 0` (L1137).
- `asset-depletion` — `if (!periodMonths || periodMonths <= 0) return 0` (L1235); ratio bar clamp `Math.max(0, Math.min(200, …))` (L1316).

**No new edge cases. No silent $0 / NaN / div-by-zero paths found.** Carried P3 gaps unchanged: no PMI auto-cancellation (78% LTV) logic anywhere — confirmed even the Big-4 aggregators don't model auto-drop, so this is a P3 not a defect; no TX-specific property-tax default or homestead-exemption handling (payment + affordability both use a generic "~2% of price" rule-of-thumb note, which is honest but not TX-tailored).

---

## Accessibility / mobile perf / console

- **Console:** static scan only (no live browser in autonomous run). No `console.error|TODO|FIXME|XXX` in suite JS or any calc. The only runtime-visible defects remain P0-B (wrong labels) + P0-C-resid (unlabeled inputs).
- **Tap targets:** `calculator-suite.css:65-70` — slider thumb is **20×20px** (webkit + moz). That's below WCAG 2.2 SC 2.5.8 Target Size (Minimum, Level AA = 24×24 CSS px). Range inputs get some leniency because the full-width track is draggable, but the visible grab target is undersized on mobile. **New P2** (cosmetic, low-risk CSS bump to `height/width:24px` — but it's a calculator visual change, so Adam-gated like all calc edits).
- **Mobile perf:** **Lighthouse/PSI not run — PSI quota still drained** (CONTEXT.md HIGH blocker, now 34+ consecutive periods). Static observations: all calc pages `defer` script.js/scroll-effects/analytics and `preload` fonts; Chart.js still loads **synchronously** mid-body on payment (L140) and the chart pages (no `defer`) — minor render cost, carry as P2-E. `viewport` + `lang="en"` present on all pages. Color contrast of result numbers **UNVERIFIED** (needs a live contrast check; gold `#9A7B2D` result values on white are borderline for AA large-text and should be measured when PSI/browser access returns).

---

## P3 — feature gaps vs market (carry, no change)

The competitive moat holds — none of Rocket / Bankrate / NerdWallet / Zillow ship a buydown, wrap, asset-depletion, or DSCR calculator, and those four map exactly to the "complicated income" positioning. Keep them as SEO/lead-gen assets. Commodity-calc catch-ups, in priority order, unchanged from last week:

1. **HOA field** on the payment calc (universal on the Big 4).
2. **PMI line** that appears under 20% down (a line item, not full 78%-LTV auto-cancellation — nobody ships auto-drop).
3. **Amortization schedule** on the payment calc (Bankrate/NerdWallet/Zillow all have one; rate-buydown already has a full schedule to borrow from).
4. Affordability: front-end vs back-end DTI split, itemized debts, solve-from-payment mode.
5. Highest pivot-aligned add: an **income-type toggle** (W-2 / 1099 / self-employed / asset-based) on payment + affordability.

Strategic read is unchanged: don't out-polish aggregators on commodity calcs; close the three credibility gaps and lean on the four niche calculators.

---

## Observations (not flags)

- **calculators.html footer review copy** (added by Adam's own 06-27 merge): "⭐ 5.0 Google · 4.98 Zillow / 137+ Reviews". This is a fresh, intentional edit — **not drift** — but it's a ratings/review claim on a calculator advertising surface, so it falls under the same review-count verification already tracked in CONTEXT.md (homepage "92 Google / 45 Zillow" trust-strip item). Noting for consistency only; no action requested here.
- **CollectionPage ItemList lists 6 calcs**, omitting asset-depletion + DSCR. Defensible (those are product-specific, linked from their loan pages), but if the goal is full discoverability, adding positions 7-8 would be a one-line each. P3, optional.

---

## Patch status

**Fresh patch written: `patches/calculator-2026-06-29-P0.diff`.** Rationale for a new file rather than re-pointing at the 06-15 patch: that older patch abbreviated the 11 wrap inputs as `FIND: <input ... id="w-balance" ...>` / `INSERT aria-label after id`, which is a manual, error-prone instruction. The new patch is full-line FIND/REPLACE for all 16 inputs **and** P0-B, matched byte-for-byte against the 06-27 source, with aria-label text drawn from each input's visible on-page label. Still a find/replace document (not `git apply`-able by design — it's line-number-independent so it survives future head/CTA edits). **No math changed. Not applied — Adam reviews and applies by hand.**

---

## Adam — Action items (Monday triage, ≤10 min)

1. **Apply `patches/calculator-2026-06-29-P0.diff`** — 2 P0s, 17 edits, pure find/replace, no math. (P0-B header swap + 16 `aria-label`s.) Carried 3 weeks now.
2. **Bundle P2-G** same session — 6 files, 1 string each (`Equal Housing Lender.`). HUD + new-company audit risk.
3. **One-line conversion win:** set `WEBHOOK_URL` on `asset-depletion-calculator.html:1099` + `dscr-calculator.html:950` → n8n `Web Lead Automation` webhook (`PiuIsQpBuydtFM4m`) to turn on the inline forms already built into those pages.
4. **P1-B (your call):** affordability 5% down — disclose it in the L97 note, or wire the existing `createDownPaymentToggle` helper for selectable down%.
5. **P2 (optional, your call):** bump slider thumb 20px → 24px in `calculator-suite.css` for WCAG 2.5.8; add `defer` to the Chart.js `<script>` on payment + chart pages (P2-E).
6. **P3 backlog → TODO.md:** HOA field + PMI line + amortization schedule on payment; income-type toggle; TX tax defaults.
7. **Housekeeping:** update the audit SKILL.md business name off the retired "Mortgage Solutions LP."

---

## Files audited

| File | Lines | P0 | P1 | P2 | P3 |
|------|-------|----|----|----|----|
| calculator-payment.html | 235 | P0-C-resid (×2) | P1-A (no inline form) | P2-G, Chart defer | HOA, PMI line, amort, income toggle |
| calculator-affordability.html | 203 | — | P1-B | P2-G | DTI split, debts, income toggle |
| calculator-refinance-breakeven.html | ~210 | P0-C-resid (×3) | — | P2-G | UX framing |
| refinance-calculator.html | ~1255 | — | — | has EHL | TX defaults |
| rate-buydown-calculator.html | ~1235 | **P0-B** | — | P2-E2 (Chart sync) | ahead of market |
| wrap-mortgage-calculator.html | ~910 | P0-C-resid (×11) | — | P2-G | ahead of market |
| asset-depletion-calculator.html | 1458 | — | P1-A (form gated) | has EHL | ahead of market |
| dscr-calculator.html | 1275 | — | P1-A (form gated) | has EHL | ahead of market |
| calculators.html | ~306 | — | — | P2-G, review-copy note | ItemList 6/8 |
| calculator-suite.js | 266 | — | — | thumb 20px (P2) | no PMI logic |
| calculator-suite.css | 241 | — | — | tap target 20px | — |

---

*No calculator HTML or JS was modified by this audit. P2-A closed by the 06-27 `cta-scenario-first` merge. Fresh byte-exact P0 patch written to `patches/calculator-2026-06-29-P0.diff` — not applied. Adam reviews and picks what to ship Monday.*
