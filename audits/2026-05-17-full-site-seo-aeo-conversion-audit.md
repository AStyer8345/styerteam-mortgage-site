# styermortgage.com Full-Site SEO, AEO, Accuracy, Positioning, and Conversion Audit

Date: 2026-05-17  
Site folder: `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site`  
Scope: full static site, recent Claude repositioning work, non-QM/private wealth research, SEO/AEO, conversion, and compliance-sensitive accuracy.

## Executive Summary

The site is moving in the right strategic direction. The newest Claude work created a real complex-lending cluster: business owners, asset depletion, K-1, 1099-only, P&L-only, one-time-close construction, bank statement, Non-QM, DSCR, investor, and high-net-worth pages. That is the right moat. This is the lane where Adam can look different from every commodity "Austin mortgage lender" page.

The main problem is not lack of content. It is focus, claim risk, and conversion friction. There are 155 HTML pages, but the site still carries a lot of old commodity positioning: first-time buyer, FHA, DPA, generic pre-approval, generic "Apply Now" CTAs, and suburb pages that often lead with standard purchase loans instead of complex-borrower scenarios. That does not need to be deleted, but it needs to be demoted and connected to the new complex-income hub.

The biggest risks I found:

- "21-day" close claims survived in multiple high-visibility places even though the current business goal says to remove performance-metric marketing.
- "Apply Now" appears 176 times and "Get Pre-Approved" appears 130 times. For self-employed and previously-declined borrowers, that is too aggressive and too generic.
- Some new complex-loan pages include highly specific program claims: FICO floors, LTVs, divisors, loan caps, rate premiums, entity vesting, and named investor parameters. Several may be true, but they should be either verified against current wholesale guidelines or softened.
- Review/testimonial proof is powerful but exposed. "136+ reviews," "91 Google / 45 Zillow," "5.0 stars," and fabricated-looking location testimonials need verification or removal before the new company compliance review.
- AEO structure is unusually strong for a local mortgage site: 101 pages have FAQPage schema, and the homepage now has strong entity/schema work. But schema quality is uneven, 41 pages have no JSON-LD, and the new niche pages mostly lack the same NMLS Consumer Access `sameAs` entity signal that the business-owner pillar has.

Bottom line: keep the niche pivot, clean the claims, replace application-first CTAs with scenario-review CTAs, build product + location pages carefully, and create a referral-partner page for CPAs/advisors/agents.

## Full-Site Inventory

Observed site shape:

- 155 HTML pages.
- 18 complex/niche pages or posts: `bank-statement-loans.html`, `self-employed-mortgage-austin.html`, `non-qm-loans.html`, `dscr-loan-austin-tx.html`, `dscr-loans-texas.html`, `investor-loans.html`, `high-net-worth-mortgage.html`, `mortgage-for-business-owners-austin.html`, `asset-depletion-mortgage-texas.html`, `k1-income-mortgage-austin.html`, `1099-only-mortgage-texas.html`, `p-and-l-mortgage-texas.html`, `one-time-close-construction-loan-texas.html`, and related DSCR/local investor pages.
- 19 commodity/supporting pages: conventional, FHA, VA, USDA, first-time buyer, DPA, affordability, credit, glossary, pre-approval, and standard buyer resources.
- 33 location or rate-check pages.
- 101 pages contain `FAQPage` schema.
- 44 pages contain `LocalBusiness` schema.
- 41 HTML pages have no JSON-LD. Some are fine as tools/internal pages, but `get-preapproved.html`, `refinance-quote.html`, `privacy.html`, calculator pages, and resources pages deserve at least basic schema or intentional noindex decisions.
- Sitemap includes the new non-QM expansion pages. Good.
- `robots.txt` explicitly allows major AI crawlers. Good AEO move.

Recommended categorization:

| Category | Keep / Fix | Notes |
|---|---|---|
| Core niche authority | Keep and improve | `mortgage-for-business-owners-austin.html`, `non-qm-loans.html`, `bank-statement-loans.html`, `self-employed-mortgage-austin.html`, `dscr-loans-texas.html`, `asset-depletion-mortgage-texas.html`. |
| Supporting standard loans | Keep but demote | Conventional/FHA/VA/refi pages should prove Adam can handle normal loans, but not dominate navigation or homepage. |
| Local SEO pages | Keep, tighten | Strong suburb footprint, but many pages still lead with commodity programs and old speed claims. Add complex-borrower angles by city. |
| Conversion pages | Rewrite | `get-preapproved.html`, `contact.html`, `prequal.html`, and nav CTAs still assume the visitor is ready to apply. Complex borrowers need a lower-pressure scenario review path. |
| Thin/internal/noindex | Clean up | `updates/`, rate archives, internal dashboards, LoanOS pages, placeholder newsletter pages should remain noindex or be removed from sitemap. |

## Recent Claude-Created / Modified Page Audit

Recent commit: `e76a214 repositioning: private-wealth pivot — 6 new niche pages + sitewide 21-day claim retired`.

High-priority new pages:

| Page | Strategic Role | Assessment | Priority |
|---|---|---|---|
| `mortgage-for-business-owners-austin.html` | Pillar page for complex-income Austin/Texas borrowers | Strongest new page. Good problem/solution framing and internal links. Too many exact program claims and still uses `Apply Now`. | Critical polish |
| `asset-depletion-mortgage-texas.html` | HNW/retiree/founder asset qualification | Excellent niche. Needs more private-wealth tone and softer wording around divisors/eligibility. | High |
| `k1-income-mortgage-austin.html` | Partners, S-corp owners, K-1 borrowers | Valuable and differentiated. Needs verification/softening on Fannie update and 25% ownership interpretation. | High |
| `1099-only-mortgage-texas.html` | Contractor/consultant/commission borrower | Good keyword opportunity. "No tax returns" is strong but should be framed as program-dependent. | High |
| `p-and-l-mortgage-texas.html` | CPA-prepared P&L loans | Good product gap. Needs advisor/CPA trust framing and less absolute "no bank statement review" language. | High |
| `one-time-close-construction-loan-texas.html` | Custom home / Hill Country construction | Strong local niche. Needs legal-claim cleanup around Texas Constitution requirements. | Medium-high |

Recently modified supporting pages:

- `index.html`: directionally strong, but the hero is too sharp in a way that may overpromise: "The loans your bank said no to. The pricing your bank can't match." It also still uses `Apply Now` as the primary CTA.
- `about.html`: strong voice, but it still has multiple "21-day" claims and stale metadata.
- `products.html`: still too generic and commodity-centered. It should become a routing hub, not "Mortgage Programs for Every Situation."
- `sitemap.xml`: correctly includes new niche pages.

## Highest-Risk Accuracy Issues

### 1. 21-day close claims remain

Examples:

- `about.html:7` meta description includes "21-day average close."
- `about.html:176`, `about.html:335`, `about.html:434`, `about.html:466`, `about.html:600`, `about.html:801` repeat the 21-day framing.
- `mortgage-for-business-owners-austin.html:171` says Non-QM-type loans typically close in 21-30 days and repeats "My average close time across all program types is 21 days."
- `products.html:761` says "we often close in 21 days."
- Many suburb and blog pages still carry similar language.

Why it matters: the current weekly goals explicitly say "No more 21-day close claim. No more performance-metric marketing." This is also a compliance review risk if not documented and consistently qualified.

Fix: replace performance claims with process claims:

- "I move quickly, communicate clearly, and flag issues early."
- "Clean files and fast document responses help keep closing on track."
- "Timeline depends on loan type, appraisal, underwriting, property, and borrower documentation."

### 2. Highly specific program claims need verification or hedging

Examples:

- `mortgage-for-business-owners-austin.html:394`: "90% LTV is available at 720+."
- `mortgage-for-business-owners-austin.html:397`: P&L loan amount "to $2.5M on the program I use most often."
- `mortgage-for-business-owners-austin.html:400`: named Acra 1099 parameters down to 600 FICO.
- `mortgage-for-business-owners-austin.html:406`: non-QM divisors "as aggressive as 60 months" and retirement haircut language.
- `1099-only-mortgage-texas.html:139` and `:702`: exact FICO tiers and LTV/pricing claims.
- `non-qm-loans.html:113` and `:548`: exact floors for non-QM pricing.

Why it matters: these details can become wrong quickly by investor, channel, state, occupancy, loan amount, property type, and market. They are useful for AEO, but should not read as universal eligibility rules.

Fix: keep the expertise, soften the absolutes:

> Some 1099-only programs start around the mid-600s, with stronger pricing and lower down payment options typically reserved for stronger credit profiles. A few investors may consider lower scores with larger down payments and stronger compensating factors, but guidelines change by lender.

### 3. "No tax returns required" is effective but overused as absolute language

Examples:

- `index.html:186` and visible FAQ repeats "no tax returns required."
- `bank-statement-loans.html` meta says "no tax returns required."
- `1099-only-mortgage-texas.html`, `p-and-l-mortgage-texas.html`, `dscr-loan-austin-tx.html`, and `dscr-loans-texas.html` repeat no-tax-return language.

Why it matters: strong hook, but program-dependent. It can also trigger "no-doc/subprime" associations if not paired with "creditworthy borrower," "documented cash flow," and "program-specific guidelines."

Fix:

> Many programs can evaluate your file without using personal tax returns as the primary income document. Depending on the investor, loan type, and occupancy, additional documentation may still be required.

### 4. Review/testimonial claims require a hard proof pass

Examples:

- `index.html:572`, `:583`, `:593`: 136 reviews, 91 Google, 45 Zillow.
- `about.html:576`, `:755`, `:756`: same breakdown.
- Trust strips across many pages say `5.0 Stars`, `136+ Reviews`, `1,000+ Loans Closed`.
- Some location testimonials read fabricated or too perfect, such as a Bee Cave quote claiming a 0.75% lower rate than a California lender.

Why it matters: review counts and testimonials are high-value trust signals, but if they cannot be verified, they are compliance and reputation liabilities.

Fix: keep review proof only where the count and quotes are verified. Replace invented quotes with either real reviews or category-level proof:

> Reviewed by buyers, investors, and self-employed borrowers across Central Texas. Ask Adam for examples of similar files he has helped structure.

### 5. "Often beats bank quotes" / "bank can't match" needs careful framing

Examples:

- `index.html:378`: "The pricing your bank can't match."
- `index.html:379`: "the easy files usually beat the bank quote too."
- `about.html:238`: "the rate usually beats your bank too."
- Multiple suburb pages use "beat builder rates."

Why it matters: compelling, but too absolute unless documented and qualified. The safer point is access to multiple wholesale lenders, not a universal price guarantee.

Fix:

> I shop 40+ wholesale lenders, so you can compare more than one bank's rate sheet before you commit.

Or:

> On straightforward files, wholesale pricing often gives us a real shot at beating a bank quote. I will show you the numbers side by side.

### 6. Texas-only scope vs national/multi-state language

Examples:

- `high-net-worth-mortgage.html` meta includes "~30 states."
- Site rules say "TX-licensed only — never imply Adam originates outside Texas."
- User's strategy may eventually expand beyond Austin/Texas, but current licensing/business scope must control live copy.

Fix: until licensing is confirmed, use:

> Austin-based and Texas-licensed. If your scenario involves property outside Texas, ask Adam what is possible before assuming availability.

### 7. Commodity pages still contain USDA surface area despite "No USDA origination"

Examples:

- `loans/usda.html` is noindex but still linked in older nav/footer sections.
- `florence-mortgage-lender.html`, `san-marcos-mortgage-lender.html`, `austin-housing-market-2025.html`, and older loan pages still promote USDA.

Fix: keep `loans/usda.html` noindex for legacy reference if needed, but remove USDA from current nav, footer, and primary conversion copy unless Adam explicitly wants referral-only language.

## Generic Content and Positioning Problems

The site is not generic overall. It has much more detail than most local mortgage sites. The generic problem is inconsistent positioning.

What works:

- The homepage and new complex cluster now have a clear "banks decline / I structure complex files" theme.
- The new pages use scenario-specific language: K-1 partners, S-corp owners, founders, retirees, investors, bank statements, DSCR, P&L, asset depletion.
- The DSCR pages have strong location/product specificity.

What weakens the positioning:

- `products.html` still says "Mortgage Programs for Every Situation." That is broad and forgettable.
- Many old page titles still lead with generic "Austin TX Mortgage" terms.
- CTAs are not differentiated by borrower anxiety.
- Commodity pages still have hero-level prominence in navigation across many pages.
- A lot of location pages are highly detailed but are optimized for "mortgage lender [city]" instead of "complex borrower in [city]."

Recommended positioning line:

> Strong borrower. Complicated file. Clear path forward.

Alternative homepage taglines:

- "When your income is complex, your mortgage strategy should be smarter."
- "For business owners, investors, and complex borrowers who need more than a rate quote."
- "Your finances may not fit a bank's checkbox. That does not mean the deal is dead."
- "Austin-based. Texas-licensed. Built for borrowers with complicated income."
- "I help strong borrowers with complicated files find the right mortgage path."

Best version for Adam's voice:

> Strong borrower. Complicated file. Clear path forward.

It is plain, not cheesy, and avoids overpromising.

## Full-Site SEO Findings

### Strengths

- The new niche cluster gives the site a topical authority base most local competitors will not have.
- Homepage title is now aligned with self-employed/investor/non-QM intent.
- Sitemap includes the new cluster.
- The site has a lot of local pages, useful for Austin suburbs and Central Texas.
- Many pages have canonical tags and FAQ schema.
- Blog cluster around rate shopping is useful for conversion and second-opinion leads.

### Weaknesses

- Cannibalization risk: `self-employed-mortgage-austin.html`, `blog/2026-04-02-self-employed-mortgage-austin-tx.html`, `bank-statement-loans.html`, `mortgage-for-business-owners-austin.html`, and `non-qm-loans.html` overlap heavily. Each needs a distinct intent.
- Product + location pages are missing for the highest-intent terms.
- Several URL formats are inconsistent: some sitemap URLs omit `.html` while file canonicals include or omit it. Standardize preferred URLs.
- `products.html` is too broad and still commodity-first.
- Location pages should link up to niche service pages more aggressively.
- Page titles on some high-value pages are too long or missing brand terms.
- Old "Austin" language should be preserved as authority but not as a boundary.

Recommended intent map:

- `mortgage-for-business-owners-austin.html`: Austin business-owner pillar.
- `self-employed-mortgage-austin.html`: consumer-facing self-employed Austin page.
- `bank-statement-loans.html`: Texas bank statement product page. Consider renaming/canonicalizing to `/bank-statement-loans-texas.html` if URLs can change.
- `non-qm-loans.html`: Non-QM hub across Texas.
- `dscr-loans-texas.html`: statewide investor/DSCR hub.
- `asset-depletion-mortgage-texas.html`: HNW/retiree/founder asset page.
- `k1-income-mortgage-austin.html`: partner/S-corp/K-1 technical authority page.
- `get-preapproved.html`: split into "scenario review" for complex borrowers and classic preapproval for standard files.

## Full-Site AEO Findings

### Strengths

- `robots.txt` explicitly allows AI crawlers: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, and others.
- The homepage has strong visible FAQs and matching FAQPage schema.
- New complex pages include multiple JSON-LD blocks.
- The site contains concise Q&A language that answer engines can extract.
- The business-owner pillar has a strong NMLS Consumer Access `sameAs` signal.

### Weaknesses

- Schema is inconsistent across the cluster. The business-owner pillar has better entity linking than the other five new pages.
- Some FAQ answers contain overly specific, program-dependent claims.
- Several pages have FAQ schema but the actual answers are not always the best concise answer to the query.
- Some important conversion/tool pages have no schema.
- AEO wants "answer first, nuance second." Several pages bury the actual answer under long narrative.

Fixes:

- Add `Person` schema with `sameAs` NMLS Consumer Access and `knowsAbout` to all core niche pages.
- Add short "Direct Answer" blocks near top of key pages.
- Add "Program availability changes by investor" disclaimers near product-specific FAQs.
- Use FAQ answers that are 40-80 words, then expand below.
- Avoid exact rate/pricing claims inside schema unless verified and current.

Priority AEO questions to own:

- Can I get a mortgage if I am self-employed in Texas?
- How do bank statement loans work in Texas?
- What if my bank declined me because of tax write-offs?
- Can I qualify for a mortgage with K-1 income?
- Can I use business bank statements for a mortgage?
- Can real estate investors qualify without personal income?
- How does asset depletion work for a mortgage?
- What documents does a self-employed borrower need?
- Does Adam Styer help borrowers outside Austin?

## Geographic Expansion Findings

The site currently has deep Austin and Central Texas coverage. That is an asset. But Austin is sometimes framed as the service boundary instead of the credibility base.

Recommended geographic architecture:

1. Austin as authority base:
   - `self-employed-mortgage-austin.html`
   - `mortgage-for-business-owners-austin.html`
   - `dscr-loan-austin-tx.html`

2. Central Texas product/location pages:
   - `bank-statement-loans-austin-tx.html`
   - `non-qm-loans-austin-tx.html`
   - `dscr-loans-central-texas.html`
   - `construction-loans-hill-country-texas.html`

3. Texas statewide product pages:
   - `bank-statement-loans-texas.html`
   - `self-employed-mortgage-texas.html`
   - `non-qm-loans-texas.html`
   - `asset-depletion-mortgage-texas.html`
   - `dscr-loans-texas.html`

4. Suburb pages as local proof:
   - Add one complex-borrower block to each relevant suburb page.
   - Example: Georgetown should mention Sun City asset depletion and self-employed Williamson County business owners.
   - Bee Cave/Lakeway/Westlake should mention HNW, jumbo, asset utilization, and advisor-friendly mortgage strategy.
   - Dripping Springs/Spicewood/Marble Falls should mention construction, acreage, investor, and bank statement buyers.

Do not create national pages until licensing/business scope is confirmed. For now, use "Texas-wide" and "Austin-based, Texas-licensed."

## Research-Backed Messaging Recommendations

Best practices extracted from the research file:

- The strongest non-QM LO brands combine a search-friendly keyword with an emotional borrower hook.
- Private wealth language works when it is warm and practical: discreet, advisor-friendly, strategic partner, complex income, portfolio-based qualification, wealth-building.
- CPAs, financial advisors, and agents are upstream lead sources. The site currently under-speaks to them.
- Product + location pages are the practical SEO expansion path.
- Non-QM needs to be reframed as "creditworthy but documentation-complex," not "alternative" or "subprime."

Add a problem/solution section to the homepage, business-owner page, self-employed page, bank statement page, and Non-QM page:

> Your tax write-offs may protect your income, but they can also make a standard mortgage approval harder. The issue is not always affordability. Sometimes it is how the income is documented, averaged, and interpreted.

Then list:

- Bank statement loans using 12-24 months of deposits.
- P&L-based qualification where available.
- 1099-based qualification.
- Asset depletion or asset utilization.
- DSCR loans for investor properties.
- Portfolio-based qualification for high-net-worth borrowers.

Add advisor-facing copy:

> For CPAs and advisors with clients whose tax strategy complicates mortgage approval.

> If your client has strong cash flow, meaningful assets, or complex income but low taxable income, I can review the scenario before they waste time with the wrong lender.

Avoid:

- "Alternative"
- "Non-traditional"
- "Bad credit"
- "No-doc"
- "Guaranteed"
- "Easy approval"

Use:

- "Complex income"
- "Cash-flow-based qualification"
- "Portfolio-based qualification"
- "Discreet scenario review"
- "Advisor-friendly mortgage strategy"
- "Creditworthy borrowers outside standard agency guidelines"

## Conversion Findings

The site currently asks too many anxious complex borrowers to "Apply Now."

Counts:

- `Apply Now`: 176 occurrences.
- `Get Pre-Approved`: 130 occurrences.

Problem: a self-employed borrower who was just rejected by a bank does not want to "apply now." They want to know if the file is even possible before submitting a full application and getting judged again.

Recommended CTA system:

| Audience | Primary CTA | Secondary CTA |
|---|---|---|
| Self-employed borrower | "Have Adam review your income scenario" | "Book a 15-minute strategy call" |
| Bank-declined borrower | "Talk through your real options" | "See what may still be possible" |
| Investor / DSCR | "Run the DSCR math" | "Review a property scenario" |
| HNW / asset depletion | "Model your asset-based options" | "Schedule a discreet strategy call" |
| CPA/advisor/agent | "Discuss a client scenario" | "Send a scenario for review" |
| Standard borrower | "Compare your loan options" | "Get pre-approved" |

Replace primary complex-page CTAs:

- From: "Apply Now"
- To: "Review My Scenario"

- From: "Get Pre-Approved"
- To: "See What May Be Possible"

- From: "Get a Rate Quote"
- To: "Compare Real Options"

Add microcopy near complex forms:

> No pressure and no judgment. Start with the basics. Adam will tell you whether the file looks workable and what documents would actually matter.

Form improvement:

- Current quick forms ask name/email/phone/loan goal. Add one optional field:
  - "What makes your income or property scenario complex?"
- Use conditional dropdown values:
  - Self-employed
  - 1099
  - K-1 / partnership income
  - Bank statement loan
  - DSCR / investor property
  - Asset-based qualification
  - Bank declined me
  - Standard purchase/refi

## Homepage Positioning Recommendations

Current homepage hero:

> The loans your bank said no to. The pricing your bank can't match.

Assessment: memorable, but a little too absolute. Good energy, compliance-sensitive phrasing.

Recommended hero:

> Strong borrower. Complicated file. Clear path forward.

Subheadline:

> Austin-based and Texas-licensed, I help self-employed borrowers, investors, business owners, and high-net-worth clients find mortgage options when standard underwriting does not tell the full story. I handle conventional loans well too, but complex files are where the strategy matters most.

Primary CTA:

> Review My Scenario

Secondary CTA:

> Book a 15-Minute Strategy Call

Supporting proof:

> 40+ wholesale lender relationships. Bank statement, DSCR, asset depletion, P&L, 1099, jumbo, construction, FHA/VA/conventional. NMLS #513013.

Add a visitor-routing strip:

- "I am self-employed"
- "I was declined by a bank"
- "I am buying an investment property"
- "I have assets but complex income"
- "I am building a custom home"
- "I need a standard mortgage"

## Page-by-Page Recommendations

### `index.html`

- Replace `Apply Now` hero/nav/mobile CTAs with scenario-review language.
- Soften "pricing your bank can't match."
- Keep the complex lending focus.
- Add problem/solution section near top.
- Keep review section only if counts are verified.
- Replace "challenging credit" language at `index.html:517`; it attracts a different borrower than "complex income."

### `about.html`

- Critical: remove remaining 21-day claims.
- Rewrite meta description.
- Add advisor-friendly/private-client tone without going cold.
- Replace "Every scenario has an answer" with "Most scenarios have a path worth reviewing."
- Keep Adam's personal/direct voice.

### `products.html`

- Rebuild as a routing hub:
  - "Complex Income & Investor Loans"
  - "Standard Purchase & Refinance Loans"
  - "Construction & Jumbo"
  - "Tools and Scenario Reviews"
- Put Non-QM, bank statement, DSCR, asset depletion, K-1, P&L, 1099 above FHA/DPA.
- Keep FHA/VA/conventional present but not dominant.
- Remove 21-day claims and "best rates" absolutes.

### `mortgage-for-business-owners-austin.html`

- Keep as the main Austin business-owner pillar.
- Replace `Apply Now` with "Review My Business-Owner Scenario."
- Move advisor/referral partner language higher.
- Soften exact program claims.
- Add short "Standard loans still fit some business owners" paragraph.

### `bank-statement-loans.html`

- Consider adding `/bank-statement-loans-texas.html` as preferred URL long-term, or at least optimize title/H1 for Texas.
- Add Austin/Texas product + location sections.
- Add an answer block: "How bank statement loans work in Texas."
- Make "no tax returns" program-dependent.

### `self-employed-mortgage-austin.html`

- Make this the emotional/self-employed borrower page.
- Add the tax write-off problem/solution section.
- Link to bank statement, P&L, 1099, K-1, asset depletion.
- CTA: "Have Adam review your self-employed income."

### `non-qm-loans.html`

- Strong hub. Keep.
- Avoid leading with CFPB/Dodd-Frank definition too hard. Borrowers care first about "I have income but the bank said no."
- Add myth-busting: "Non-QM does not mean unqualified."
- Add "standard loan check" language to avoid over-niching.

### `asset-depletion-mortgage-texas.html`

- Best private wealth opportunity.
- Add words like "discreet," "liquidity-conscious," "portfolio-based qualification," and "advisor-friendly."
- Remove/soften "no income required" in meta/hero unless program-specific and verified.
- CTA: "Model Asset-Based Options."

### `high-net-worth-mortgage.html`

- Fix "~30 states" unless licensing is verified.
- Tone should be less "AUM negotiations" and more "preserve liquidity / align financing with portfolio strategy."
- Link strongly to asset depletion page.

### `k1-income-mortgage-austin.html`

- Strong niche.
- Verify Fannie/Freddie claims and effective dates.
- Add CPA/advisor language.
- CTA: "Review My K-1 Income."

### `1099-only-mortgage-texas.html`

- Good page but high claim-risk.
- Remove named investor parameters unless Adam wants them public and current.
- CTA: "Review My 1099 Income."

### `p-and-l-mortgage-texas.html`

- Make it more CPA-friendly.
- Explain when P&L is cleaner than bank statements.
- Add "CPA-prepared" but avoid implying every CPA-prepared P&L qualifies.

### `one-time-close-construction-loan-texas.html`

- Good Texas/Hill Country fit.
- Verify all Texas Constitution / lien / rescission details.
- Add builder/realtor/referral partner angle.
- CTA: "Talk Through the Build Scenario."

### `get-preapproved.html`

- Current H1 is "Get Pre-Approved for an Austin Home Loan."
- Create two paths:
  - "I have a standard purchase/refi"
  - "I have a complex income or investor scenario"
- Add scenario-review form field.
- Consider H1: "Find Out What Your Mortgage Options Really Look Like."

### `contact.html`

- Make it less generic.
- Add "Start with a scenario review" above phone/email.
- Include advisor/referral partner path.

### Suburb pages

- Keep them, but add one complex-borrower module by market:
  - Westlake/Bee Cave/Lakeway: HNW, jumbo, asset depletion, liquidity.
  - Georgetown/Sun City: retiree asset depletion, portfolio income.
  - Dripping Springs/Spicewood/Marble Falls: construction, acreage, bank statement business owners.
  - Round Rock/Cedar Park/Leander: business owners, 1099 tech contractors, builder second opinions.
  - San Marcos/New Braunfels/Fredericksburg: DSCR/investor/STR.

## Product + Location Landing Page Plan

Build these first. Do not make thin doorway pages; each should have a unique borrower scenario and local proof.

| Priority | URL | Primary Keyword | H1 | Meta Description | CTA |
|---|---|---|---|---|---|
| 1 | `/bank-statement-loans-austin-tx.html` | bank statement loans Austin TX | Bank Statement Loans in Austin, TX | Bank statement loans for Austin self-employed borrowers and business owners. Qualify using deposits instead of tax returns, program permitting. Adam Styer, NMLS #513013. | Review My Bank Statements |
| 2 | `/self-employed-mortgage-texas.html` | self-employed mortgage Texas | Self-Employed Mortgages in Texas | Texas mortgage options for self-employed borrowers, 1099 earners, K-1 partners, and business owners with complex income. | Review My Income Scenario |
| 3 | `/non-qm-loans-austin-tx.html` | Non-QM loans Austin TX | Non-QM Loans in Austin, TX | Non-QM mortgage options for Austin borrowers with complex income, bank statements, DSCR properties, assets, or P&L documentation. | Talk Through Options |
| 4 | `/dscr-loans-central-texas.html` | DSCR loans Central Texas | DSCR Loans in Central Texas | DSCR rental property financing for Austin, San Antonio, Hill Country, and Central Texas investors. Qualify on property cash flow. | Run the DSCR Math |
| 5 | `/asset-depletion-mortgage-austin.html` | asset depletion mortgage Austin | Asset Depletion Mortgages in Austin | Portfolio-based mortgage qualification for Austin retirees, founders, and high-net-worth borrowers with assets but complex income. | Model Asset-Based Options |
| 6 | `/mortgage-for-cpas-clients.html` or `/referral-partners.html` | mortgage partner for CPAs / advisors | Mortgage Scenario Reviews for CPAs, Advisors, and Agents | A strategic mortgage partner for CPAs, financial advisors, and agents with self-employed or high-net-worth clients whose tax strategy complicates approval. | Discuss a Client Scenario |
| 7 | `/one-time-close-construction-loans-hill-country.html` | one-time-close construction loans Hill Country | One-Time-Close Construction Loans in the Texas Hill Country | Construction-to-permanent mortgage options for custom homes in Dripping Springs, Lakeway, Spicewood, Marble Falls, and nearby Hill Country markets. | Talk Through the Build |
| 8 | `/mortgage-after-bank-decline-texas.html` | mortgage after bank decline Texas | Mortgage Options After a Bank Decline in Texas | If a bank declined your mortgage because of tax returns, complex income, investor property, or assets, Adam can review the scenario and explain possible next steps. | See What May Still Be Possible |

## Referral Partner Messaging

Create a dedicated page or major section:

Suggested URL: `/referral-partners.html`

Suggested H1:

> Mortgage Scenario Reviews for CPAs, Advisors, and Agents

Suggested copy:

> Your client may have strong cash flow, meaningful assets, and a smart tax strategy, but still look weak to a standard mortgage underwriter. I help CPAs, financial advisors, wealth managers, and real estate agents evaluate those scenarios before the client wastes time with the wrong lender.

Partner audiences:

- CPAs with clients showing low taxable income.
- Financial advisors who want clients to preserve liquidity.
- Wealth managers with asset-rich borrowers.
- Agents representing business owners, investors, or jumbo/HNW buyers.
- Builders/custom home agents with one-time-close construction scenarios.

Partner CTAs:

- "Discuss a Client Scenario"
- "Send a Scenario for Review"
- "Talk Through Options Before Your Client Applies"

## Internal Linking and Funnel Recommendations

### Current issue

The site has plenty of pages, but the funnel is too application-driven and not scenario-driven.

### Recommended funnel

1. Homepage routes by borrower type.
2. Borrower type pages explain the problem.
3. Product pages explain available paths.
4. Location pages provide local proof.
5. Conversion pages ask for a scenario, not a full commitment.

### Internal link fixes

- Homepage should link directly to all core niche pages above commodity pages.
- Every suburb page should link to:
  - `mortgage-for-business-owners-austin.html`
  - `bank-statement-loans.html`
  - `dscr-loans-texas.html`
  - `asset-depletion-mortgage-texas.html` where HNW/local fit exists.
- Every complex page should link to:
  - `non-qm-loans.html`
  - `get-preapproved.html` or future scenario-review page.
  - `contact.html` with scenario-review anchor.
- Blog posts about self-employed, document checklists, and DSCR should link to the new product pages.

## Prioritized Implementation Roadmap

### Critical fixes

1. Remove all remaining 21-day/performance-metric claims from live pages and metadata.
2. Verify or remove review counts, review splits, and suspicious testimonials.
3. Replace the most exposed `Apply Now` CTAs on homepage, about, products, and all complex pages.
4. Soften exact non-QM program claims unless current investor guidelines are verified.
5. Fix any multi-state implication until licensing is confirmed.

### Quick wins

1. Add `Person` schema with NMLS `sameAs` and `knowsAbout` to all core niche pages.
2. Add a problem/solution section to homepage, self-employed, bank statement, Non-QM, and business-owner pages.
3. Rewrite homepage hero and CTAs.
4. Add "scenario complexity" field to quick contact forms.
5. Add internal links from all new niche pages to one another.

### SEO/AEO improvements

1. Build the eight product + location pages listed above.
2. Tighten FAQ answers to answer-first, 40-80 word blocks.
3. Add direct-answer blocks to core niche pages.
4. Standardize URL/canonical strategy for `.html` vs extensionless paths.
5. Keep Austin authority but create Texas statewide versions for the highest-value product terms.

### Conversion improvements

1. Create a "Review My Scenario" conversion path.
2. Split standard borrower and complex borrower paths on `get-preapproved.html`.
3. Add advisor/referral partner conversion path.
4. Add trust microcopy near forms.
5. Add product-specific CTAs on each niche page.

### Strategic content improvements

1. Create `/referral-partners.html`.
2. Create `/mortgage-after-bank-decline-texas.html`.
3. Create `/bank-statement-loans-austin-tx.html`.
4. Create `/self-employed-mortgage-texas.html`.
5. Add one complex-borrower module to each top suburb page.

## Verification Notes

Official sources checked during this audit:

- FHFA announced the 2026 baseline conforming loan limit for one-unit properties as $832,750, matching the site's frequent conforming-limit references.
- HUD/FHA publishes 2026 FHA limits by county through the official FHA mortgage limits tool and announcement; any county-specific FHA numbers should be checked against HUD before publication.
- Texas Constitution Article XVI, Section 50(a)(5) includes construction-lien execution/location and waiting/rescission requirements; the construction page should present these carefully and not as legal advice.

## Recommended Next Work Session

Do not build new pages first. Fix the trust and conversion foundation first:

1. Sweep and replace remaining 21-day claims.
2. Replace homepage/about/products/core-niche CTAs from "Apply Now" to scenario-review language.
3. Verify review/testimonial claims.
4. Soften program-specific non-QM claims.
5. Add NMLS/entity schema to the core niche cluster.

After that, build product + location pages.
