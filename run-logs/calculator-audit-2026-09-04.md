# Calculator Audit — 2026-09-04

**Pages audited:** calculator-payment.html, calculator-affordability.html, calculator-refinance-breakeven.html, rate-buydown-calculator.html, refinance-calculator.html, wrap-mortgage-calculator.html, asset-depletion-calculator.html, dscr-calculator.html, calculators.html (hub), calculator-suite.js, calculator-suite.css, assistant-widget.js (sitewide, surfaced here)
**Report by:** Scheduled automated audit (styer-calculator-audit-weekly)
**Run mode:** Read-only — no calculator code modified. Byte-exact P0 patch written: `patches/calculator-2026-09-04-P0.diff`.
**Scheduler note:** last calculator audit was **2026-06-29 — a 9-week gap** for a weekly task. Feeds the existing "scheduler reliability" HIGH blocker in CONTEXT.md.

---

## TL;DR — triage in 5 minutes

The 08-30 editorial redesign made real progress on the June findings (11 of 16 missing aria-labels fixed, affordability math rebuilt + disclosed, 19 calculator tests added, hub schema now lists all 8) — **and introduced the single worst defect this audit has ever logged: the H1 and subhead on 3 calculator pages are invisible.** White text on the new cream hero background, 1.13:1 contrast, **verified live by screenshot and computed style.** Same `.lead-page`-style override-gap class of bug you caught on the LPs post-deploy; the calculator family just never got the same pass.

| ID | Sev | One-liner | Status | Effort |
|----|-----|-----------|--------|--------|
| **P0-1** | P0 | **Hero H1 + subhead invisible (white-on-cream) on payment, affordability, breakeven** — live since the 08-30 rollout | **NEW** | 2 CSS edits |
| **P0-2** | P0 | rate-buydown on-screen schedule: "Principal"/"Interest" headers still swapped vs the cells | carry (12+ wks) | 1-line `<th>` swap |
| **P0-3** | P0 | 7 unlabeled controls remain (5 wrap + 2 refinance) — was 16 in June | carry, shrunk | 7 `aria-label`s |
| **P0-4** | P0 | Floating assistant button has **no accessible name at ≤1600px** — every page that loads the widget | **NEW** | 1 `aria-label` |
| P1-A | P1 | Inline lead capture still 0/9 calculators — `WEBHOOK_URL = ""` on asset-depletion + DSCR (forms fully built, dark) | carry (12+ wks) | 1 config line ×2 |
| P1-C | P1 | refinance-calculator: zero scenario/Calendly CTAs **and** robots-blocked while hub-promoted | carry (Adam-gated) | decision |
| P2 | P2 | Result numbers fail AA: emerald `#059669` on white = 3.05:1 at 13.5px (wrap metrics); footer gold links 3.39:1 | NEW | color tweak |
| P2-G | P2 | "Equal Housing Lender" still missing on 6 of 9 calc surfaces | carry | 6 string adds |
| ~~P1-B~~ | — | ~~affordability 5% down undisclosed~~ — **CLOSED**: rebuilt model discloses 5% down, ~2% tax, ~0.5% ins, MI exclusion | closed 08-30 | — |

**All four P0s are in one find/replace patch: `patches/calculator-2026-09-04-P0.diff` — 11 edits, 4 files, zero math.** Not applied.

---

## What changed since 06-29 (why this audit re-verified everything)

`git log` shows 16 commits touching calc surfaces, dominated by the 08-30 editorial redesign (`cf1a372`…`a29ce29`) plus two dedicated calculator commits:

- `46519ed` fix(calculators): affordability model bug + math/a11y/schema fixes + **first test coverage** — this closed P1-B, added 11 of the 16 missing aria-labels, and created `tests/calculators.test.js`
- `50d44f1` feat(calculators): comma-formatted currency inputs on all calculators

**Every June finding was re-verified against current source rather than carried.** Results: P1-B closed, P0-C shrunk 16→7 (and 2 of the 7 are new finds my June extractor missed — the refinance escrow switch and per-diem display), P0-B untouched, P1-A untouched, P2-G untouched.

---

## P0 detail

### P0-1 — Invisible hero on 3 calculator pages (NEW, live in production)

**Mechanism:** `calculator-suite.css:111` sets `.calc-tool-hero h1{color:#fff}` (built for the old navy gradient). The editorial rollout's `.calculator-page .calc-tool-hero{background:var(--editorial-warm)...}` block (style.css:52) recolors the background to cream but overrides only `font-size`/`margin` on the h1 and p — **not `color`**. Net: `#fff` on `#f3f0e8` = **1.13:1**. The subhead compounds it with `opacity:0.9`.

**Affected (all verified):** `calculator-payment.html`, `calculator-affordability.html`, `calculator-refinance-breakeven.html` — the three pages carrying both `class="editorial-page calculator-page"` and a `.calc-tool-hero` with no inline style. **Not affected:** asset-depletion (inline navy gradient `style=` attribute beats the class override), and the other 4 calcs use different hero classes.

**Evidence:** live screenshots of payment + affordability show blank hero bands; `getComputedStyle` on affordability returns h1 `rgb(255,255,255)` on hero background `rgb(243,240,232)`. Lighthouse flags both at 1.13:1/1.12:1. Every sighted visitor since 08-30 has seen an empty cream band where "Payment Calculator" should be.

**Fix (in patch):** append `color:var(--color-navy)` to the existing h1 override and `color:#536172;opacity:1` to the p override — `#536172` is the editorial system's own `.hero-subtitle` color, so this matches the redesign's intent exactly. Bump `style.css?v=` after applying.

### P0-2 — rate-buydown schedule headers swapped (carry, 12+ weeks)

Unchanged from June, re-verified at current line numbers: on-screen header (L531-532) says Principal|Interest; the renderer (L903-904) emits `r.interest` then `r.principal`; the full-schedule modal (L1009) is correct. Month 1 shows the big interest number under "Principal". 1-line swap, in patch.

### P0-3 — 7 unlabeled form controls (carry, shrunk from 16)

Ran a fresh accessible-name audit (accname order: aria-labelledby > aria-label > label[for] > wrapping label > title, comments stripped, hidden controls excluded) across all 9 surfaces, then **cross-validated against live Lighthouse — both methods name the identical 5 wrap inputs:**

- `wrap-mortgage-calculator.html` — `#w-existing-rate`, `#w-closing-pct`, `#w-wrap-rate`, `#w-term`, `#w-appreciation` (visible text sits in sibling `<span>`s or `for`-less labels; never associated)
- `refinance-calculator.html` — `#escrow-toggle` (checkbox inside a **text-free** `<label class="switch">` — announces as bare "checkbox") and `#computed-perdiem` (display field, `for`-less label) — *new finds; June's grep-based check couldn't see empty wrapping labels*

Payment, affordability, breakeven, rate-buydown, asset-depletion, DSCR, and the hub are now **fully labeled** — 0 unlabeled controls. All 7 fixes in patch.

### P0-4 — assistant launcher has no accessible name on real screens (NEW, sitewide)

`assistant-widget.js:68` builds the launcher with visible text… but `assistant-widget.css:15` hides that span at **≤1600px** (`​.ma-launcher span:last-child{display:none}`) and the icon span is `aria-hidden="true"`. Below 1600px — i.e., most laptops and every phone — the button's accessible name is empty. Lighthouse `button-name` fails on every calc page audited. One static `aria-label` in the JS template fixes it site-wide (widget is injected by script.js on all pages). In patch; bump the `?v=` on the widget src after applying.

---

## Math correctness (read-only) — strongest week on record

1. **The new test suite passes: 19/19** (`node --test tests/calculators.test.js`) — covers zero-rate, closed-form amortization parity, DSCR/breakeven/buydown/asset-depletion reference cases, the affordability closed-form (416,483 at defaults), the 12× PITI regression net, and share-URL round-trips.
2. **Independent engine probe** (Node, engine loaded as-is): zero rate ✓, zero/negative principal → $0 ✓, `years=0` → `Infinity` → renders "—" ✓, `NaN` → "—" ✓, 99% rate and $50M loans compute sanely ✓, negative-am `amortize` holds balance without corruption ✓, zero-month and negative-balance calls safe ✓. **No silent $0/NaN path found anywhere.**
3. **Affordability model reproduced exactly** (my independent implementation matches the page's 416,483 at documented defaults). Debts ≥ DTI cap correctly floors at $0/$0 via `Math.max(0,…)`.
4. Quantified the disclosed-but-real MI gap: at 5% down with typical ~0.5% PMI, the max price is overstated ~$18.7k (~4.5%). The disclosure ("Excludes HOA and mortgage insurance") makes this honest — leaving as P3 context for the income-toggle idea, not a defect.
5. PMI 78%-LTV auto-drop: still absent, still matching the Big-4 (nobody ships it) — P3, unchanged.

---

## Mobile perf — first verified data in 34+ weeks

PSI quota is still drained (CONTEXT blocker), but the chrome-devtools MCP now provides local Lighthouse + tracing, which ends the perf blackout:

- **calculator-payment, mobile, Fast 3G + 4× CPU throttle: LCP 1,533ms (green), CLS 0.00 (perfect), TTFB 164ms.** Render-blocking insight estimates ~0ms savings available. No CrUX field data (page below threshold — expected).
- Chart.js still loads synchronously on payment + rate-buydown, but it sits at end-of-body and the trace shows no LCP impact → **June's P2-E downgraded to observation.**
- Lighthouse category scores (mobile): payment A11y 90 / BP 77 / SEO 100; wrap A11y 81 / BP 77 / SEO 100. The a11y deltas are exactly the P0-3/P0-4 items above. BP 77 on both = third-party cookies (GTM/Calendly ecosystem) — sitewide, not calculator-specific.
- **Console: zero errors/warnings** on live payment + wrap (real browser, full load).

**Recommendation:** this audit can carry a Lighthouse pass weekly now — consider marking the PSI-quota blocker "worked around" for calculator purposes.

---

## Accessibility — beyond the P0s

- **Result-number contrast (the thing this task explicitly asks about): FAIL on wrap.** `#w-out-monthly-income`, `#w-out-exist-paydown`, `#w-out-equity-capture` render emerald `rgb(5,150,105)` on white at 13.5px/600 ≈ **3.05:1** (AA small-text needs 4.5:1). The green-means-good coding is right; the shade is ~one step too light. Darkening `--calc-emerald` `#047857` → `#065f46` (or bumping these to large-text size) clears AA. **P2, Adam-gated** (calculator visual change).
- `#w-down-amount` placeholder-gray value text `#64748b` on `#f1f5f9` ≈ 4.36:1 — marginal fail; balloon toggle unselected state `#6b7280` on `#e5e7eb` ≈ 3.3:1 — P2.
- Footer gold links `#8B6E24` on navy `#0a1f3f` = 3.39:1 — **sitewide** footer pattern, not calc-specific; belongs with the existing brand-gold-drift blocker in CONTEXT.md.
- Slider thumb still 20×20px vs WCAG 2.5.8's 24×24 (carry, P2); full-width track keeps this minor.
- Footer `<h4>` after `<h2>` heading-order skip (Lighthouse, wrap) — cosmetic P3.
- Keyboard nav: all interactive controls are native `input`/`button` elements — reachable via Tab. Factory sliders have visible focus (`:focus-visible` outline in widget + suite CSS).

---

## Conversion (P1)

**Inline lead capture is still 0 of 9 calculators** — the known gap, and the two forms that already exist remain dark:

- **P1-A (12+ weeks):** `asset-depletion-calculator.html:1100` and `dscr-calculator.html:951` still read `var WEBHOOK_URL = "";`. Fully-built email-capture forms stay `hidden` on the two highest-intent complicated-income surfaces. One line each pointed at the n8n **Web Lead Automation** webhook (`PiuIsQpBuydtFM4m`) turns them on. Given GOALS' "close loans, build the pipeline," this remains the highest-leverage single edit in the calculator family. *(Caveat: n8n execution-cap outage is an active memory item — verify quota health before flipping these on, or the leads will fire into a capped instance.)*
- **P1-C (carry, decision needed):** `refinance-calculator.html` — the richest refi tool — has **no** scenario link, **no** Calendly, one `tel:` and one `/refinance-quote.html` link, **and** is `robots.txt`-Disallowed while being the hub's featured solid card. Either unblock + add the standard CTA block, or demote the card. (Already an Adam-gated CONTEXT.md item; calculator-side effect re-confirmed.)
- Every other calc routes CTA → `/scenario.html` (+ tel, + Calendly on 4) — the 06-27 pattern held through the redesign.

---

## Compliance (feeds the pre-audit cleanup in GOALS)

- **P2-G carry:** "Equal Housing" appears on only refinance / asset-depletion / DSCR (all as "Equal Housing **Lender**"). Missing on the other 6 calc surfaces. Sitewide the split is 85 files "Lender" / 12 "Opportunity" — worth settling the correct term for a **licensed broker** with compliance counsel during the new-company review, then sweeping once. The 6 calc adds can ride that sweep.
- Disclaimer Variant C split (3 short-form calc footers lack address + TX Complaint Notice vs the full Variant B on asset-depletion/DSCR/refinance) — already an Adam-gated CONTEXT.md item; unchanged.
- NMLS ID coverage: **9/9** calc surfaces carry company NMLS 2653540 ✓. GTM container: **9/9** at ×2 ✓ (the 08-31 sitewide 153/153 holds on calcs).

---

## Features vs competitors (P3 — no material market movement)

Re-checked [NerdWallet's payment calculator](https://www.nerdwallet.com/mortgages/calculators/mortgage-calculator) and [Bankrate's](https://www.bankrate.com/mortgages/mortgage-calculator/): both still lead with PMI-under-20%-down line items, HOA fields, and [amortization schedules](https://www.nerdwallet.com/mortgages/calculators/amortization). Unchanged gaps on the commodity calcs, in the same priority order as June: HOA field → conditional PMI line → payment-calc amortization table (buydown already has one to borrow) → income-type toggle (the pivot-aligned differentiator). The moat also holds: none of the Big 4 ship buydown/wrap/asset-depletion/DSCR tools.

---

## False findings killed before surfacing (3)

1. **"Card headings invisible too"** — screenshots showed "Loan details"/"Your numbers" faint; computed style says navy `rgb(10,31,63)`. The faintness is the scroll-`reveal` animation mid-fade at screenshot time. Hero-only defect; scoping the patch to card titles would have been wrong.
2. **"Asset-depletion hero also broken"** — same classes, but its hero carries an inline navy `style=` attribute that beats the editorial class override. Verified before scoping P0-1 to 3 pages, not 4.
3. **"Launcher button lacks a name" (as authored)** — the JS template *does* include visible text; only CSS analysis revealed the ≤1600px `display:none` that empties the accname. The defect is real but lives in the CSS/JS interaction, not the markup — matters for where the fix goes.

---

## Adam — Monday triage (≤10 min)

1. **Apply `patches/calculator-2026-09-04-P0.diff`** — 11 find/replace edits, 4 files, no math. Restores 3 invisible heroes, fixes the 12-week buydown header swap, finishes the aria-label work `46519ed` started, names the sitewide assistant button. Bump `style.css?v=` + `assistant-widget.js?v=` per the patch header.
2. **Decide P1-A:** set the two `WEBHOOK_URL`s → n8n `PiuIsQpBuydtFM4m` (after confirming n8n quota health). Two lines; turns on lead capture already built on your two best complicated-income calculators.
3. **Decide P1-C:** refinance-calculator — unblock + CTA block, or demote the hub card.
4. **P2 batch (one session, your call):** emerald result color → `#065f46`; 6× "Equal Housing" adds (settle Lender-vs-Opportunity first); slider thumb 24px.
5. **Housekeeping:** 9-week gap on this weekly task — add to the scheduler-reliability investigation.

---

## Files audited

| File | P0 | P1 | P2 | Notes |
|------|----|----|----|-------|
| calculator-payment.html | **P0-1** (invisible hero) | — | P2-G | a11y labels now clean ✓ |
| calculator-affordability.html | **P0-1** | — | P2-G | P1-B closed; model rebuilt + tested ✓ |
| calculator-refinance-breakeven.html | **P0-1** | — | P2-G | labels clean ✓ |
| rate-buydown-calculator.html | **P0-2** (header swap) | — | P2-G, thumb | labels clean ✓ |
| refinance-calculator.html | P0-3 (×2) | **P1-C** | has EHL | robots-blocked + no CTAs |
| wrap-mortgage-calculator.html | P0-3 (×5) | — | P2-G, result contrast | 11 of 16 labels fixed since June |
| asset-depletion-calculator.html | — | **P1-A** | has EHL | inline navy hero = safe from P0-1 |
| dscr-calculator.html | — | **P1-A** | has EHL | labels clean ✓ |
| calculators.html | — | — | P2-G | ItemList now 8/8 ✓ (June P3 closed) |
| calculator-suite.js / .css | — | — | thumb 20px | engine edge-probe clean; 19/19 tests |
| assistant-widget.js (sitewide) | **P0-4** | — | — | 1 aria-label |

---

*No calculator HTML or JS was modified by this audit. Verification: static accessible-name parser cross-checked against live Lighthouse (agreement on all findings); heroes verified by screenshot + getComputedStyle; math via test suite + independent engine probe; perf via throttled trace on the live site. Patch written, not applied — Adam reviews and picks what to ship.*

Sources: [NerdWallet Mortgage Calculator](https://www.nerdwallet.com/mortgages/calculators/mortgage-calculator) · [Bankrate Mortgage Calculator](https://www.bankrate.com/mortgages/mortgage-calculator/) · [NerdWallet Amortization Calculator](https://www.nerdwallet.com/mortgages/calculators/amortization)
