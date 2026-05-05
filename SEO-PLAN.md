# styermortgage.com — Phase 2 SEO Build Plan

**Date:** 2026-05-05
**Repo:** `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site/`
**Inputs:** `SEO-AUDIT.md` (Phase 1), `dscr-loan-austin-tx.html` (gold-standard template), `self-employed-mortgage-austin.html` (secondary template)
**Output Pages:** 8 new flat-root `.html` pages + nav update across all existing pages + sitemap + cross-link refresh.

---

## Section 1: Design System Reference (Build Subagents Copy Verbatim)

Every new page MUST mirror the structure of `dscr-loan-austin-tx.html`. Match all `<head>` patterns, schema blocks, font preloads, GTM, footer, and sticky mobile CTA.

### CSS Variables (already in `style.css`)

| Token | Value |
|-------|-------|
| `--color-navy` | `#0A1F3F` |
| `--color-gold` | `#8B6E24` |
| `--color-white` | `#FFFFFF` |
| `--color-light-gray` | `#F7F7F7` |
| `--color-gray` | `#6B7280` |
| `--color-text` | `#1F2937` |
| `--color-border` | `#E5E7EB` |
| `--font-primary` | `'Inter', -apple-system, ...` |
| `--font-display` | `'Playfair Display', serif` |

Hard-coded button colors (NOT vars — use as written):
- `.btn-primary` background `#F2C840`, color `#0D1F3C`
- `.nav-cta` background `#3F2F0F`, color white

### Stylesheet Include (paste verbatim)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"></noscript>
<link rel="stylesheet" href="/style.css?v=20260417">
```

### GTM (paste verbatim in `<head>` and after `<body>`)

```html
<script>window.dataLayer = window.dataLayer || [];</script>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PQQ6PGLR');</script>
```

### Page Skeleton

Reference `dscr-loan-austin-tx.html` lines 1–200 for `<head>`. Reference any deepened suburb page (e.g., `westlake-mortgage-lender.html`) for footer block. Sticky mobile CTA pattern at bottom: copy from `dscr-loan-austin-tx.html`.

### Adam's Identity (drop-in everywhere)

- NMLS #513013
- Phone: (512) 956-6010 / `+15129566010`
- Email: Adam@thestyerteam.com
- Business name: Adam Styer | Mortgage Solutions LP
- Apply: https://mslp.my1003app.com/513013/register
- Calendly: https://calendly.com/adamstyer/15minutes
- Address (canonical): 5718 Sam Houston Circle, Austin, TX 78731
- AggregateRating: 5.0, 136 reviews
- Author Person URL: https://styermortgage.com/about.html

---

## Section 2: Nav Update Spec (applies to ALL existing + new HTML files)

**Current nav** has loan products buried under one dropdown with 9 mixed items. **Replacement nav** adds a clean "Loan Programs" item with a curated dropdown promoting non-QM positioning. Existing `/loans/*` items move under a separate "Conventional" subgroup if needed — but for v1 keep the dropdown simple and link the new pages prominently.

### New Nav Block (replace existing `<ul class="nav-links">` site-wide)

```html
<ul class="nav-links">
  <li class="nav-has-dropdown"><a href="/products.html">Loan Programs</a><ul class="nav-dropdown">
    <li><a href="/non-qm-loans.html"><strong>Non-QM Loans (Hub)</strong></a></li>
    <li><a href="/dscr-loans-nationwide.html">DSCR Loans</a></li>
    <li><a href="/bank-statement-loans.html">Bank Statement Loans</a></li>
    <li><a href="/self-employed-mortgage-austin.html">Self-Employed Mortgage</a></li>
    <li><a href="/high-net-worth-mortgage.html">High-Net-Worth / Asset Depletion</a></li>
    <li><a href="/investor-loans.html">Investor Loans</a></li>
    <li><a href="/loans/conventional.html">Conventional</a></li>
    <li><a href="/loans/fha.html">FHA</a></li>
    <li><a href="/loans/va.html">VA</a></li>
    <li><a href="/loans/jumbo.html">Jumbo</a></li>
    <li><a href="/loans/construction.html">Construction</a></li>
    <li><a href="/loans/refinance.html">Refinance</a></li>
    <li><a href="/loans/investment.html">Investment</a></li>
  </ul></li>
  <li><a href="/blog.html">Blog</a></li>
  <li class="nav-has-dropdown"><a href="/resources/">Resources</a><ul class="nav-dropdown"><li><a href="/calculators.html">Calculators</a></li><li><a href="/rate-buydown-calculator.html">Buydown Calculator</a></li><li><a href="/wrap-mortgage-calculator.html">WRAP Calculator</a></li><li><a href="/blog.html">Blog</a></li><li><a href="/mortgage-glossary.html">Mortgage Glossary</a></li><li><a href="/resources/first-time-buyer-guide/">Buyer Guide</a></li></ul></li>
  <li><a href="/testimonials.html">Testimonials</a></li>
  <li><a href="/about.html">About Adam</a></li>
  <li><a href="/rate-check.html">Rate Check</a></li>
  <li class="nav-has-dropdown"><a href="/realtors.html">For Realtors</a><ul class="nav-dropdown"><li><a href="/realtor-resources">Realtor Blog</a></li></ul></li>
  <li><a href="/contact.html">Contact</a></li>
  <li><a href="https://mslp.my1003app.com/513013/register" class="nav-cta" target="_blank" rel="noopener">Apply Now</a></li>
</ul>
```

**Notes:**
- USDA removed from nav (per CONTEXT.md HIGH blocker — Adam confirmed nav decision in Phase 2 brief).
- DSCR Austin TX no longer needs its own nav item — it's reachable via the Non-QM hub.
- Nav update applies to **all 79+ root `.html` files** plus `/loans/*.html`. Lead-capture stripped pages (`get-preapproved.html`, `refinance-quote.html`, `thank-you.html`) keep stripped logo-only nav unchanged.

---

## Section 3: New Page Specs

### Page 1: `non-qm-loans.html` — HUB

- **URL slug:** `non-qm-loans.html`
- **Primary keyword:** "non-QM loans" (~12K/mo national)
- **Secondary:** "non-qualified mortgage", "non-QM lender Texas", "alternative documentation mortgage"
- **Title:** `Non-QM Loans | DSCR, Bank Statement, Asset Depletion | Adam Styer NMLS #513013`
- **Meta description:** `Non-QM loans for self-employed, investors, and high-net-worth borrowers. DSCR, bank statement, asset depletion, jumbo. Adam Styer, NMLS #513013, 40+ lenders.`
- **H1:** `Non-QM Loans — Mortgages for Borrowers Banks Don't Understand`
- **Hero subhead:** Short, punchy. "If your tax returns don't tell the whole story — or you're an investor scaling a portfolio — Non-QM is how you actually close. 40+ wholesale lenders, one application."
- **Page sections (H2):**
  1. **What Non-QM Means (and what it doesn't)** — Define non-QM as loans outside the CFPB's Qualified Mortgage rule. Clarify it does NOT mean subprime. Cite: born from Dodd-Frank 2014, now ~5% of total origination volume in 2025.
  2. **The 5 Non-QM Programs Adam Originates** — Card grid linking out: DSCR, Bank Statement, Self-Employed (P&L), Asset Depletion / HNW, Investor Portfolio. 1-paragraph description each. Each card links to its dedicated page.
  3. **Who Non-QM Actually Serves** — 4 borrower archetypes with specific scenarios: (a) self-employed with $300K AGI but heavy Schedule C deductions, (b) investor with 5+ properties hitting Fannie's 10-financed-property cap, (c) retiree with $2M in brokerage but no W-2, (d) recent business owner without 2 years of returns yet.
  4. **How Non-QM Differs from Conventional Pricing** — Cite: rates typically 0.50%–1.50% above conventional (per Defy/HomeAbroad May 2026), 20–25% down standard, 640+ FICO floor, faster underwriting because no tax-return scrutiny.
  5. **Why Use a Broker for Non-QM** — Wholesale-only programs (Angel Oak, Verus, Deephaven, Acra, Newrez Smart Series, Sprout, A&D) aren't available retail. 40+ lender access lets Adam shop the same scenario across 8+ non-QM investors.
  6. **Texas + ~30 States Footprint** — List licensed states explicitly. Anchor: most non-QM scenarios benefit non-residents buying TX/FL/TN rentals.
  7. **FAQ** (see below)
  8. **CTA section**
- **FAQ (8 questions):**
  1. What is a non-QM loan and is it the same as subprime? (Answer: No — non-QM ≠ subprime. Define ATR/QM.)
  2. What credit score do I need for a non-QM loan? (640 floor, 700+ for best pricing.)
  3. Are non-QM loan rates higher than conventional? (Yes, typically 0.50%–1.50% over.)
  4. Can I refinance out of a non-QM loan into a conventional later? (Yes — explain seasoning.)
  5. Do non-QM loans require tax returns? (Most don't — bank statement, DSCR, asset depletion all skip them.)
  6. What's the maximum loan amount on a non-QM? ($3M+ on jumbo non-QM, varies.)
  7. How long does non-QM underwriting take? (15–25 days typical when documentation is clean.)
  8. Are non-QM loans available in all states? (Adam's licensed in ~30 states — list them.)
- **Schema:** FAQPage, FinancialProduct (umbrella), CollectionPage (it's a hub), BreadcrumbList, Article.
- **Internal links (5 existing + 7 new):** `/dscr-loan-austin-tx.html`, `/self-employed-mortgage-austin.html`, `/loans/jumbo.html`, `/loans/investment.html`, `/about.html`, plus all 7 other new pages.
- **CTA:** Primary = Apply (mslp link). Secondary = Calendly 15-min strategy call.
- **Word count target:** 1800+ (hub).
- **Differentiation note:** This page is the umbrella. Build subagent should treat it as a navigational doorway — readers come here unsure which program they need. The page must EDUCATE on the differences clearly, then funnel them. Lean Adam's voice: direct, no fluff, "if you've been told no by a bank, this is the door that opens."

---

### Page 2: `dscr-loans-nationwide.html`

- **URL slug:** `dscr-loans-nationwide.html`
- **Primary keyword:** "DSCR loans" (~22K/mo national)
- **Secondary:** "DSCR loan rates", "DSCR mortgage", "investment property loan no tax returns"
- **Title:** `DSCR Loans Nationwide | Investment Property Mortgage No Tax Returns | NMLS #513013`
- **Meta description:** `DSCR loans in ~30 states. Qualify on rental income — no W-2s, no tax returns. 20% down, 640+ FICO. Adam Styer, NMLS #513013, 40+ wholesale lenders.`
- **H1:** `DSCR Loans — Qualify on the Rent, Not Your Tax Returns`
- **Hero subhead:** "If the property cash-flows, you can buy it. DSCR loans across ~30 states — no W-2s, no Schedule E, no two years of returns."
- **Page sections (H2):**
  1. **DSCR in 90 Seconds (AEO answer-first)** — Bold first paragraph: "A DSCR loan is an investment-property mortgage that qualifies you on the property's rental income, not your personal income. The lender divides projected rent by the proposed PITIA payment. Hit 1.0 or higher and you're in." Cite: rate range May 2026 = 6.12%–6.37% per HomeAbroad data, 0.50%–1.50% above conventional.
  2. **DSCR Ratio Tiers Explained** — Table showing No-Ratio (0–0.99 DSCR, 30–35% down, +0.5–1.5% rate), Standard 1.0, 1.25 (best pricing), 1.5+ (top tier). Cite Grafton Funding 2026 minimums.
  3. **What You Need to Qualify** — 640 minimum FICO (700+ for 80% LTV), 20–25% down, 6 months PITIA reserves, property non-owner-occupied, market-rent appraisal (Form 1007) or current lease.
  4. **Property Types Eligible** — Single-family rental, 2–4 unit, condo (warrantable + non-warrantable), short-term rental (with AirDNA report), small mixed-use 5–8 unit on some programs.
  5. **States Adam Lends In** — List the ~30 states with TX/FL/TN/GA/CO/AZ/NC/SC/NV bolded as primary investor markets.
  6. **The Out-of-State Investor Playbook** — Case study format: California or NY investor buying a $400K Texas SFR rental. Walk through DSCR math: $2,800 rent ÷ $2,400 PITIA = 1.17 DSCR. Approved at standard tier.
  7. **DSCR vs. Conventional Investment Loan** — Side-by-side comparison: DSCR uses rent only; conventional Fannie/Freddie investment loan uses Schedule E + 75% rent factor + caps you at 10 financed properties. DSCR has no property cap.
  8. **FAQ**
  9. **CTA**
- **FAQ (10 questions):**
  1. What's the minimum DSCR ratio I need to qualify in 2026?
  2. Can I get a DSCR loan with a 0.85 DSCR (no-ratio)?
  3. What's the minimum credit score for a DSCR loan?
  4. Are DSCR loans available for short-term rentals like Airbnb?
  5. Can I close a DSCR loan in an LLC?
  6. How are DSCR loan rates different from conventional rates today?
  7. Do DSCR loans have a limit on how many properties I can finance?
  8. Can I do cash-out refinance with a DSCR loan?
  9. Are DSCR prepayment penalties standard?
  10. Can an out-of-state investor buy a Texas rental with a DSCR loan?
- **Schema:** FAQPage, FinancialProduct, BreadcrumbList, Article. (No LocalBusiness — nationwide page.)
- **Internal links:** `/non-qm-loans.html`, `/dscr-loans-texas.html`, `/dscr-loan-austin-tx.html`, `/dscr-loans-fredericksburg-tx.html`, `/dscr-loans-dripping-springs.html`, `/investor-loans.html`, `/loans/investment.html`, `/about.html`.
- **CTA:** Apply + Calendly.
- **Word count target:** 1500+.
- **Differentiation note:** This is the national doorway — DO NOT geo-anchor to Austin/Texas in the H1, hero, or first 3 sections. Out-of-state investors searching "DSCR loan" must feel addressed. Lean into "30-state footprint" as the differentiator vs. local-only competitors.

---

### Page 3: `dscr-loans-texas.html`

- **URL slug:** `dscr-loans-texas.html`
- **Primary keyword:** "DSCR loans Texas" (~2.4K/mo)
- **Secondary:** "Texas DSCR loan", "DSCR mortgage Texas", "Texas investment property loan no income"
- **Title:** `DSCR Loans Texas | Investor Mortgage No State Income Tax Advantage | NMLS #513013`
- **Meta description:** `DSCR loans across Texas — Austin, Houston, DFW, San Antonio, Hill Country. No state income tax means more cash-flow. Adam Styer, NMLS #513013, Texas-licensed.`
- **H1:** `DSCR Loans in Texas — Where the Cash-Flow Math Just Works Better`
- **Hero subhead:** "No state income tax. 4th-fastest population growth. Out-of-state capital pouring in. Texas is where DSCR investors are scaling — here's how to fund it."
- **Page sections (H2):**
  1. **Why Texas Cash-Flows Better Than CA/NY** (AEO answer block) — 0% state income tax = ~9–13% effective tax savings vs. California (Kiplinger 2026 migration data: billions shifting from high-tax to no-tax states). Higher property tax (1.6–2.2%) but offset by lower purchase prices and depreciation.
  2. **Where Out-of-State Investors Are Buying Now** — Specific markets: San Antonio (sub-$300K SFR cash-flow), Killeen (Fort Cavazos rentals), Lubbock (Texas Tech off-campus), McAllen RGV (border industry), Tyler (East TX value plays). Texas + Florida lead 2026 investor migration per Norada.
  3. **DSCR Math in Texas** — Worked example using TX numbers: $325K SFR purchase, 25% down, $2,250 rent, $1,950 PITIA = 1.15 DSCR. Walk through escrow + insurance differences (Texas has no state tax but high property tax — show the actual $/mo).
  4. **DSCR + Texas LLC Structure** — Non-resident investors closing in TX series LLC. Note: Texas LLC formation $300, no franchise tax for entities under $1.18M revenue.
  5. **STR vs. LTR DSCR in Texas** — Hill Country (Fredericksburg, Dripping Springs, Wimberley) = STR plays. Big-city suburbs = LTR plays. Different DSCR documentation paths.
  6. **What's Different About Texas DSCR Underwriting** — Texas Home Equity 50(a)(6) rules don't apply to investment property — but lenders still want a clean title commitment. Property tax escrow shock — explain the escrow setup at first appraisal.
  7. **Texas Cities Adam Originates In** — Link list: Austin, Round Rock, Cedar Park, Georgetown, Leander, San Antonio, Houston, DFW, Fredericksburg, Dripping Springs, Wimberley, New Braunfels, San Marcos, Buda, Kyle.
  8. **FAQ**
  9. **CTA**
- **FAQ (8 questions):**
  1. Why are out-of-state investors buying so much Texas real estate in 2026?
  2. Can I get a Texas DSCR loan if I live in California?
  3. Does Texas have any restrictions on DSCR investor loans?
  4. How does Texas property tax affect my DSCR ratio?
  5. Can I close my Texas DSCR loan in an LLC?
  6. What's the minimum down payment on a Texas DSCR loan?
  7. Are DSCR loan rates higher in Texas than other states?
  8. Can I use a Texas DSCR loan for a short-term rental in Fredericksburg or Wimberley?
- **Schema:** FAQPage, FinancialProduct, LocalBusiness (areaServed: Texas), BreadcrumbList, Article.
- **Internal links:** `/dscr-loans-nationwide.html`, `/dscr-loan-austin-tx.html`, `/dscr-loans-fredericksburg-tx.html`, `/dscr-loans-dripping-springs.html`, `/non-qm-loans.html`, `/investor-loans.html`, all 24 suburb pages footer-linked.
- **CTA:** Apply + Calendly.
- **Word count target:** 1500+.
- **Differentiation note:** This page's angle is **Texas as the destination, not Adam as the local broker.** Hook out-of-state capital with the no-income-tax + migration story. Cite specific cities by name — generic "Texas markets" loses the search. Adam's voice: "California money is pouring into San Antonio because the math is unbeatable. Here's how to finance it."

---

### Page 4: `dscr-loans-fredericksburg-tx.html`

- **URL slug:** `dscr-loans-fredericksburg-tx.html`
- **Primary keyword:** "Fredericksburg TX investment property loan" / "Fredericksburg Airbnb loan"
- **Secondary:** "Fredericksburg short term rental financing", "Hill Country DSCR loan", "Texas Wine Country investment property"
- **Title:** `DSCR Loans Fredericksburg TX | Wine Country Airbnb & STR Financing | NMLS #513013`
- **Meta description:** `DSCR loans for Fredericksburg TX short-term rentals. Wine country Airbnb financing using AirDNA projections — no tax returns. Adam Styer, NMLS #513013.`
- **H1:** `DSCR Loans for Fredericksburg STR Investors — Wine Country Cash-Flow, Funded`
- **Hero subhead:** "Main Street, Wine Road 290, weekend wedding traffic — Fredericksburg STRs run a real business. DSCR loans qualify on Airbnb projections, not your day job."
- **Page sections (H2):**
  1. **The Fredericksburg STR Market in Numbers** (AEO answer block) — Cite: ~1,928 active STR listings (AirDNA 2025), average annual revenue ~$67,944 per active listing, ADR ~$341 across 2025 (peak summer ADRs higher), annual occupancy ~47% with summer (Jun–Aug) at 56% and winter dipping to 34%. Source: AirDNA, Rabbu, Airbtics.
  2. **Why Fredericksburg Cash-Flows the Way It Does** — Wine country tourism (60+ wineries on Wine Road 290), weddings (Hill Country venue capital), Oktoberfest, peach season, hunting season. 4-quarter demand calendar = unusually consistent cash-flow vs. coastal STRs.
  3. **Gillespie County + City of Fredericksburg STR Permits** — City of Fredericksburg requires STR permits (3 categories: Accessory, B&B, Unoccupied) — homestead exemption ties some categories. County (outside city limits) has lighter regulation. Lenders want to see the STR permit in place at closing — cite fbgtx.org permit FAQ.
  4. **DSCR Math on a Fredericksburg STR** — Worked example: $1.1M Hill Country SFR, 25% down ($275K), $5,800/mo PITIA, $5,200 projected monthly net rental from AirDNA STR report (from $67K annual revenue, less seasonality smoothing) = ~0.90 DSCR → No-Ratio program, 30% down, +0.75% rate. Or: hit 1.0 by going 30% down.
  5. **What Fredericksburg STR Lenders Want to See** — AirDNA / Rabbu STR Income Report OR 12-month trailing Airbnb statements. Fully-furnished sale (with personal property addendum) common. Reserves: 6–12 months PITIA on STR vs. 6 on LTR.
  6. **Hill Country Property Types That Pencil** — Main Street walkable cottages ($600K–$1.2M, top ADR), countryside acreage homes ($900K–$2.5M, family-group bookings), historic Sunday Houses (premium repeat bookings), guesthouse/casita combos (multi-stream income).
  7. **Working with an Out-of-State Buyer** — California / Colorado / Florida buyer scenario: closing remotely, LLC structure, Texas property-tax escrow shock at first appraisal, insurance considerations (windstorm not required inland but wildfire/liability matters).
  8. **FAQ**
  9. **CTA**
- **FAQ (9 questions):**
  1. Can I use projected Airbnb income to qualify for a DSCR loan in Fredericksburg?
  2. What's the average ADR and occupancy on a Fredericksburg STR right now?
  3. Do I need a Fredericksburg STR permit before I can close my DSCR loan?
  4. Can I buy a Fredericksburg STR in my LLC with a DSCR loan?
  5. What if my Fredericksburg property doesn't hit 1.0 DSCR with off-season averages?
  6. Are wedding-friendly Hill Country properties harder to finance?
  7. How is property tax handled on a $1M+ Fredericksburg DSCR loan?
  8. Can I get a DSCR loan on a Fredericksburg property outside city limits in Gillespie County?
  9. Is the furniture / personal property included in the DSCR loan amount?
- **Schema:** FAQPage, FinancialProduct, LocalBusiness (areaServed: Fredericksburg TX + Gillespie County), BreadcrumbList, Article.
- **Internal links:** `/dscr-loans-texas.html`, `/dscr-loans-nationwide.html`, `/dscr-loans-dripping-springs.html`, `/non-qm-loans.html`, `/loans/jumbo.html`, `/about.html`, `/contact.html`.
- **CTA:** Apply + Calendly.
- **Word count target:** 1400+.
- **Differentiation note:** **This page lives or dies on specificity.** Generic "Hill Country charm" copy = fail. Build subagent must cite ADR $341, occupancy 47%, ~1,928 listings, $67K avg revenue, 60+ wineries on 290, the 3 permit categories. Buyers Googling this query are sophisticated — they know AirDNA. Show you do too. Adam's voice: "If you can't read an AirDNA report, you shouldn't be buying a Fredericksburg STR. If you can — let's run the math."

---

### Page 5: `dscr-loans-dripping-springs.html`

- **URL slug:** `dscr-loans-dripping-springs.html`
- **Primary keyword:** "Dripping Springs investment property loan" / "Dripping Springs DSCR"
- **Secondary:** "Dripping Springs Airbnb financing", "Hays County investment loan", "wedding venue financing Texas"
- **Title:** `DSCR Loans Dripping Springs TX | Wedding Venue & Hill Country STR Financing | NMLS #513013`
- **Meta description:** `DSCR loans for Dripping Springs wedding-venue STRs and Hill Country rentals. 25 mi west of Austin, TX wine trail. Adam Styer, NMLS #513013, Texas-licensed.`
- **H1:** `DSCR Loans in Dripping Springs — Where Wedding Capital Meets Hill Country STR`
- **Hero subhead:** "Camp Lucy, Vista West, Lucky Arrow — the venue economy here moves $7K–$11K per Saturday night. Surrounding STRs feed it. DSCR loans fund both sides."
- **Page sections (H2):**
  1. **Dripping Springs in 2026** (AEO) — 25 miles west of Austin in Hays County, "Wedding Capital of Texas" branding, on the Highway 290 wine trail (overlapping with Fredericksburg corridor). Population ~7,000 city + Dripping Springs ISD reach 30K+. Drove Texas Hill Country STR demand top-five since 2020 per AirDNA market data.
  2. **The Venue Economy Drives the STR Market** — Camp Lucy, Vista West Ranch, Lucky Arrow Retreat, Prospect House, Paniolo Ranch — major venues with $7K–$11K Saturday rates. Wedding parties book 3–8 surrounding STRs per event. Friday-Sunday occupancy spikes drive the cash-flow profile.
  3. **DSCR Math on a Wedding-Friendly STR** — Worked example: $850K 4BR Hill Country SFR within 5 mi of 3 venues, 25% down, $4,400 PITIA, $4,800 projected monthly rental on AirDNA STR report (heavy weekend skew) = 1.09 DSCR. Standard tier.
  4. **Hays County STR Permitting** — Dripping Springs ETJ vs. city limits. County lighter than city. Lenders increasingly want to see permit + zoning compliance docs.
  5. **Wedding Venue Properties Themselves (Commercial Side)** — Note: 5+ acre venue properties with event commercial use are NOT residential DSCR — they're SBA 504 / commercial portfolio. But host-residence + accessory event lodging may still fit residential DSCR up to 4 units.
  6. **What's Different About Dripping Springs vs. Fredericksburg** — Closer to Austin (employment market reach), younger demographic, wine trail overlap but less saturation, easier weekday rentals from Austin tech corporate retreats.
  7. **Property Types That Fund** — 4BR–6BR SFR for wedding-party rentals, glamping cabin clusters (where zoned), guesthouse/casita combos, larger parcels with Hill Country views (premium ADR).
  8. **FAQ**
  9. **CTA**
- **FAQ (8 questions):**
  1. Can I get a DSCR loan on a property near Camp Lucy or Vista West Ranch?
  2. Will lenders count wedding-weekend bookings differently than nightly Airbnb?
  3. Do I need a Hays County STR permit to qualify for a DSCR loan in Dripping Springs?
  4. Can I finance a wedding venue itself with a DSCR loan?
  5. What's the typical DSCR property price range in Dripping Springs in 2026?
  6. Are out-of-state investors buying Dripping Springs STRs?
  7. How does the Hill Country wildfire / insurance situation affect DSCR underwriting?
  8. Can I close a Dripping Springs DSCR loan in an LLC?
- **Schema:** FAQPage, FinancialProduct, LocalBusiness (areaServed: Dripping Springs / Hays County), BreadcrumbList, Article.
- **Internal links:** `/dscr-loans-fredericksburg-tx.html`, `/dscr-loans-texas.html`, `/dscr-loans-nationwide.html`, `/dripping-springs-mortgage-lender.html` (existing suburb), `/non-qm-loans.html`, `/loans/jumbo.html`, `/about.html`.
- **CTA:** Apply + Calendly.
- **Word count target:** 1300+.
- **Differentiation note:** Lean into the **wedding venue economy** as the unique angle. Other Hill Country STR towns don't have this gravity. Drop venue names by name (Camp Lucy, Vista West, Lucky Arrow, Prospect House, Paniolo) — these are the search terms wedding-investor-buyers are already chasing. Adam's voice: "If you bought near Camp Lucy in 2020, you're already up. Here's how to fund the next one."

---

### Page 6: `bank-statement-loans.html`

- **URL slug:** `bank-statement-loans.html`
- **Primary keyword:** "bank statement loans" (~14K/mo)
- **Secondary:** "12-month bank statement mortgage", "self-employed mortgage no tax returns", "1099 mortgage Texas"
- **Title:** `Bank Statement Loans | 12 & 24 Month Programs for Self-Employed | NMLS #513013`
- **Meta description:** `Bank statement loans for self-employed borrowers. 12 or 24 months of statements, no tax returns. 50% expense ratio standard. Adam Styer, NMLS #513013, ~30 states.`
- **H1:** `Bank Statement Loans — When Your Schedule C Lies About Your Income`
- **Hero subhead:** "You wrote off everything legal — now your tax return says you can't afford a house. Bank statement loans use deposits, not net income. 12 or 24 months. No 1040s."
- **Page sections (H2):**
  1. **Bank Statement Loan in 90 Seconds** (AEO) — Self-employed borrowers qualify based on deposits to personal or business bank accounts over the last 12 or 24 months. Lender averages deposits, applies an expense ratio (typically 50% on business accounts, sometimes 0% on personal), and that's qualifying income. No tax returns. No P&L unless requested.
  2. **12-Month vs. 24-Month: Which One You Want** — 12-month = better for borrowers with rising income (current trajectory captured). 24-month = better for borrowers with one strong year + one modest year (averaging up). Cite: if income drops 20%+ year-over-year, lender may force the lower 12-month figure.
  3. **The Expense Ratio Trap** — Personal bank statements: lender takes 100% of deposits as income (no expense haircut). Business statements: 40–60% expense ratio applied (depends on industry — services lower, retail higher). Switching account types can swing qualifying income by 50%.
  4. **What Counts as a Qualifying Deposit** — Customer payments, Stripe/Square deposits, contract payments, 1099 income hitting personal account. Excluded: transfers between own accounts, loan proceeds, tax refunds, investment income (use asset depletion for that).
  5. **Documentation Adam Will Need** — 12 or 24 months of statements, business license / DBA / EIN, P&L (some lenders), 2 months reserves, current credit pull. NO tax returns. NO W-2s. NO 4506-C IRS transcripts.
  6. **Pricing & LTV** — 660+ FICO floor (700+ for best pricing), 10–15% down on owner-occupied (with strong credit), 20% on second home, 25% on investment, rate ~0.75%–1.50% over conventional.
  7. **Who This Is Built For** — 5 archetypes: real estate agent (1099 commission swings), business owner with $400K AGI but $80K taxable income, contractor/tradesman, gig-economy / consultant, recently-launched practice (doctor, attorney, accountant) without 2 years filed yet.
  8. **FAQ**
  9. **CTA**
- **FAQ (10 questions):**
  1. Can I qualify for a mortgage with bank statements only — no tax returns?
  2. Should I use 12 or 24 months of bank statements?
  3. Will lenders accept my personal bank statements or do they need business?
  4. What expense ratio will the lender use on my statements?
  5. What credit score do I need for a bank statement loan?
  6. Can I do a bank statement loan on a primary residence or only investment?
  7. How is a bank statement loan different from a stated-income loan?
  8. Will my big one-time deposits be counted?
  9. Can I do a bank statement cash-out refinance?
  10. How long does bank statement loan underwriting take?
- **Schema:** FAQPage, FinancialProduct, BreadcrumbList, Article.
- **Internal links:** `/non-qm-loans.html`, `/self-employed-mortgage-austin.html`, `/dscr-loans-nationwide.html`, `/high-net-worth-mortgage.html`, `/loans/jumbo.html`, `/about.html`.
- **CTA:** Apply + Calendly.
- **Word count target:** 1500+.
- **Differentiation note:** Avoid the generic "self-employed loan" treatment. This page must teach the **12 vs. 24 strategy** and the **personal vs. business expense ratio strategy**. Borrowers reading this Google query are sophisticated — they want the math, not platitudes. Adam's voice: "Your CPA optimized for taxes, not for getting approved. Here's how to win both."

---

### Page 7: `high-net-worth-mortgage.html`

- **URL slug:** `high-net-worth-mortgage.html`
- **Primary keyword:** "high net worth mortgage" / "asset depletion mortgage" (~3K/mo combined)
- **Secondary:** "asset based mortgage", "no income mortgage retired", "jumbo no ratio loan", "private banking mortgage alternative"
- **Title:** `High-Net-Worth Mortgage | Asset Depletion & Jumbo No-Ratio Loans | NMLS #513013`
- **Meta description:** `Asset depletion mortgages for HNW borrowers, retirees, and pre-IPO. Qualify on $1M+ assets — no income required. Adam Styer, NMLS #513013, ~30 states.`
- **H1:** `High-Net-Worth Mortgage — When You Have the Money but Not the W-2`
- **Hero subhead:** "$2M in your brokerage and a private bank that wants to lock you into 18 months of AUM negotiations. Or — close in 21 days with asset depletion underwriting. No income required."
- **Page sections (H2):**
  1. **What Asset Depletion Underwriting Is** (AEO) — A non-QM program that converts your liquid assets into qualifying income by dividing them by a fixed period. Most common divisors: 60 months (5 years), 84 months (7 years), 120 months, or full loan term (240–360 months). Shorter divisor = more qualifying income.
  2. **The Math, with Real Numbers** — Worked example: $2,000,000 brokerage + $500,000 retirement (× 70% factor for retirement) = $2,350,000 eligible. Less $200K closing/down. = $2,150,000. Divided by 84 months = $25,595/mo qualifying income. Supports a ~$1.5M loan at 6.5%.
  3. **Eligible Assets (and Haircuts)** — 100% of cash & checking, 100% of brokerage (stocks, bonds, mutual funds), 70% of retirement accounts (401k, IRA, pension) if borrower under 59.5, 100% of retirement if over 59.5. Crypto: 70% of 12-month average value at most lenders, fewer accept. Restricted stock units (RSU): vested only.
  4. **No-Ratio Jumbo (the cousin program)** — For borrowers with $5M+ liquid assets — some lenders waive DTI calculation entirely. Used by tech executives pre-/post-IPO, founders with low salary + high equity, professional athletes, retirees with 8-figure portfolios.
  5. **Why HNW Borrowers Use This Over Their Private Bank** — Private bank pledged-asset programs require AUM commitment (often $5M+ moved into their RIA), 30–60 day timelines, ongoing relationship requirements. Asset depletion: no AUM required, 21-day close, brokerage stays where it is.
  6. **Privacy & Tax-Return-Free** — No 4506-C IRS transcript pull on most programs. No tax returns reviewed. Critical for HNW borrowers with complex partnership returns, K-1s with negative passive income, or privacy concerns about real-estate holdings.
  7. **Use Cases** — (a) Tech founder pre-IPO with low W-2 + high RSU. (b) Recently retired CEO with $4M portfolio. (c) Family-office trustee buying real estate in a trust. (d) Foreign-national-adjacent: US asset, complex global income. (e) Professional with malpractice / liability shielding.
  8. **FAQ**
  9. **CTA (Calendly-first — HNW prefers calls over forms)**
- **FAQ (10 questions):**
  1. How does an asset depletion mortgage actually calculate qualifying income?
  2. What divisor do lenders use — 60, 84, or 360 months?
  3. Can I include my retirement account if I'm under 59.5?
  4. Will a lender accept crypto holdings as qualifying assets?
  5. How is this different from a pledged-asset mortgage from a private bank?
  6. Do I have to provide tax returns at all?
  7. What's the minimum asset balance to qualify?
  8. Can I do this on a primary residence, second home, or investment property?
  9. What's the maximum loan amount on a no-ratio jumbo?
  10. Will this affect my brokerage account or do my assets stay liquid?
- **Schema:** FAQPage, FinancialProduct, Service, BreadcrumbList, Article.
- **Internal links:** `/non-qm-loans.html`, `/loans/jumbo.html`, `/bank-statement-loans.html`, `/dscr-loans-nationwide.html`, `/about.html`, `/westlake-mortgage-lender.html` (jumbo-targeted suburb), `/contact.html`.
- **CTA:** Calendly primary (HNW prefers a call), Apply secondary.
- **Word count target:** 1500+.
- **Differentiation note:** Voice shift slightly here. HNW borrowers are skeptical of marketing copy. Lead with **math and discretion**, not enthusiasm. Build subagent should treat this like a private-banking rate sheet, not a consumer mortgage page. Adam's voice: short sentences, direct, presumes the reader knows what an RSU is. No "we'll guide you through every step" copy.

---

### Page 8: `investor-loans.html`

- **URL slug:** `investor-loans.html`
- **Primary keyword:** "investor loans" / "investment property loans" (~18K/mo combined)
- **Secondary:** "portfolio loan real estate", "fix and flip financing Texas", "BRRRR loan", "5+ unit investment financing"
- **Title:** `Investor Loans | DSCR, Portfolio, Fix-and-Flip, BRRRR | NMLS #513013`
- **Meta description:** `Investor loan programs: DSCR, portfolio (5+ properties one loan), fix-and-flip, BRRRR refi, 5–8 unit. Adam Styer, NMLS #513013, ~30 states.`
- **H1:** `Investor Loans — From First Rental to 50-Property Portfolio`
- **Hero subhead:** "DSCR. Portfolio loans. Fix-and-flip. BRRRR. 5–8 unit. Whatever play you're running, there's a non-QM program that funds it. 40+ wholesale lenders, one application."
- **Page sections (H2):**
  1. **The Investor Loan Landscape** (AEO) — Quick map: DSCR (single property, no income docs), Portfolio (multiple properties one blanket loan), Fix-and-Flip (12–24 month bridge), BRRRR (rehab → DSCR refi), 5–8 unit (small commercial), Foreign National (non-US borrower).
  2. **DSCR — the workhorse** — Brief recap. Link to `/dscr-loans-nationwide.html`.
  3. **Portfolio / Blanket Loans** — One loan secured by 5–25 properties, single payment, single appraisal-package, release clauses for selling individual properties. Common 70% LTV, 7–10 yr term, 30-yr am, balloon. Use case: 1031 reset, refi 8 properties at once, scale past Fannie's 10-financed-property cap.
  4. **Fix-and-Flip Loans** — 12–24 month bridge financing, up to 90% LTC + 100% rehab, 12–14% interest typical 2026, points 2–3, rehab disbursed in draws. 660+ FICO floor, experience tier matters (first flip vs. 5th).
  5. **BRRRR — The Refi Side** — After purchase + rehab, season 3–6 months, refi into DSCR at 75% LTV of new appraised value. The cash-out funds the next deal. Most common BRRRR mistake: rehab cost overruns kill the cash-out at refi appraisal.
  6. **5–8 Unit Small Multifamily** — Sits between conventional 4-unit and full commercial. Few residential lenders touch it; non-QM small-balance commercial fills the gap. 25–30% down, 5/1 or 7/1 ARM, full-doc OR DSCR-style underwriting.
  7. **Foreign National Investor** — Non-US citizens with no SSN buying US rentals. ITIN or passport, 30–40% down, no US credit needed at some lenders, source-of-funds documentation key. Common for Mexico/Canada/UK buyers in TX/FL.
  8. **What Stage You're At Determines What You Need** — 1st deal = DSCR. 5th deal = DSCR or starting portfolio. 15th = portfolio + 1031 stacks. 30+ = portfolio + small-balance commercial. Build the matching loan stack to the strategy.
  9. **FAQ**
  10. **CTA**
- **FAQ (9 questions):**
  1. What's the best loan type for my first investment property?
  2. When does it make sense to switch from DSCR to a portfolio loan?
  3. Can I get a fix-and-flip loan on my first deal with no experience?
  4. How does the BRRRR refi work — what's the seasoning period?
  5. Can I finance a 5-unit or 6-unit property?
  6. Do investor loans show up on my personal credit report?
  7. What's the typical down payment range across these programs?
  8. Can a foreign national buy a US rental property without a SSN?
  9. How many investment properties can I have financed at once?
- **Schema:** FAQPage, FinancialProduct, CollectionPage (sub-hub), BreadcrumbList, Article.
- **Internal links:** `/non-qm-loans.html`, `/dscr-loans-nationwide.html`, `/dscr-loans-texas.html`, `/dscr-loans-fredericksburg-tx.html`, `/dscr-loans-dripping-springs.html`, `/loans/investment.html`, `/loans/jumbo.html`, `/about.html`.
- **CTA:** Apply + Calendly.
- **Word count target:** 1500+.
- **Differentiation note:** This is a strategy page, not a product page. The investor reading it is comparing themselves to the staircase: "where am I, what's next?" Build subagent should write each program section with a **stage-of-investor lens**, not a feature lens. Adam's voice: "If you've done 3 deals, you don't need DSCR explained. You need to know when to switch to portfolio."

---

## Section 4: Existing-Page Updates

Run AFTER all 8 new pages are built (subagent #9).

### Universal (apply to ALL HTML files at root + `/loans/*.html`)

1. **Replace nav block** with new version from Section 2. Skip lead-capture stripped pages (`get-preapproved.html`, `refinance-quote.html`, `thank-you.html`).
2. **Verify footer NAP** says `5718 Sam Houston Circle` (not `5900 Balcones`). One-line fix where stale.

### Targeted edits

| File | Edit |
|------|------|
| `index.html` | Add Non-QM mention to hero or 2nd section. Link "Non-QM Loans" → `/non-qm-loans.html`. Add `/non-qm-loans.html`, `/dscr-loans-nationwide.html` to homepage internal-link block. Update `areaServed` JSON-LD to list ~30 licensed states (separate sub-task — request list from Adam). |
| `about.html` | Fix LocalBusiness `streetAddress` → `5718 Sam Houston Circle`. Add link to `/non-qm-loans.html` in body. Add FAQPage schema (3–4 Qs about Adam's specialties, including non-QM). |
| `products.html` | Add 6 new entries to product grid: Non-QM Hub, DSCR Nationwide, Bank Statement, HNW/Asset Depletion, Investor Loans, Self-Employed (already linked). Update CollectionPage schema accordingly. |
| `dscr-loan-austin-tx.html` | Add cross-links in body to `/dscr-loans-nationwide.html`, `/dscr-loans-texas.html`, `/dscr-loans-fredericksburg-tx.html`, `/dscr-loans-dripping-springs.html`, `/non-qm-loans.html`. Add to BreadcrumbList: `Non-QM Loans` parent above `DSCR Loans Austin TX`. |
| `self-employed-mortgage-austin.html` | Add cross-links to `/bank-statement-loans.html`, `/non-qm-loans.html`, `/high-net-worth-mortgage.html`. |
| `loans/investment.html` | Cross-link to `/investor-loans.html`, `/dscr-loans-nationwide.html`, `/non-qm-loans.html`. |
| `loans/jumbo.html` | Cross-link to `/high-net-worth-mortgage.html`, `/non-qm-loans.html`. |
| `westlake-mortgage-lender.html` | Cross-link to `/high-net-worth-mortgage.html` (Westlake = jumbo/HNW positioning). |
| `dripping-springs-mortgage-lender.html` | Cross-link to `/dscr-loans-dripping-springs.html`. |
| `austin-housing-market-2025.html` | Rebrand to `austin-housing-market.html` (rolling) OR update title/H1/canonical to 2026. Out of scope for this phase if Adam wants — flag in TODO. |
| `calculators.html` | Add `WebApplication` schema. Out of scope here — flag for next phase. |
| `realtors.html` | Add link "DSCR & Non-QM for Investors" → `/non-qm-loans.html` in services list (realtors send investor referrals). |

### USDA Cleanup (HIGH BLOCKER per audit)

Adam's nav decision in Phase 2 brief implicitly removes USDA from the Loan Programs dropdown (it's not listed in new nav). Subagent #9 must also:
- Add a `<meta name="robots" content="noindex">` to `/loans/usda.html` OR delete + 301 redirect to `/products.html` (Adam to confirm — flag in TODO).

---

## Section 5: Sitemap.xml Updates

Add these 8 entries to `sitemap.xml`:

| URL | priority | changefreq |
|-----|----------|------------|
| `/non-qm-loans.html` | 0.9 | monthly |
| `/dscr-loans-nationwide.html` | 0.9 | monthly |
| `/dscr-loans-texas.html` | 0.85 | monthly |
| `/dscr-loans-fredericksburg-tx.html` | 0.8 | monthly |
| `/dscr-loans-dripping-springs.html` | 0.8 | monthly |
| `/bank-statement-loans.html` | 0.85 | monthly |
| `/high-net-worth-mortgage.html` | 0.85 | monthly |
| `/investor-loans.html` | 0.85 | monthly |

`<lastmod>` = build date (2026-05-XX).

---

## Section 6: Build Subagent Dispatch Order

**Wave 1 (parallel — all 8 page-build subagents fire simultaneously):**
- Subagent A: `non-qm-loans.html`
- Subagent B: `dscr-loans-nationwide.html`
- Subagent C: `dscr-loans-texas.html`
- Subagent D: `dscr-loans-fredericksburg-tx.html`
- Subagent E: `dscr-loans-dripping-springs.html`
- Subagent F: `bank-statement-loans.html`
- Subagent G: `high-net-worth-mortgage.html`
- Subagent H: `investor-loans.html`

Each Wave 1 subagent receives: this plan + Section 1 design system + their specific page spec + paths to template files (`dscr-loan-austin-tx.html`, `self-employed-mortgage-austin.html`).

**Wave 2 (sequential, after Wave 1 complete):**
- Subagent I: existing-page updates (nav swap site-wide, cross-link insertions, about.html NAP fix, products.html grid update, USDA noindex).

**Wave 3 (sequential, after Wave 2):**
- Subagent J: sitemap.xml + CONTEXT.md / CHANGELOG.md / DECISIONS.md / TODO.md update + git commit + push + Netlify verification.

---

**End of plan.**
