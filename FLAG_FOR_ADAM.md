# FLAG_FOR_ADAM — Pre-Publication Review (2026-05-17)

## Verdict

**YELLOW — Ship with one fix before push.** The pages are factually clean, well-hedged on uncertain claims, schema-rich, and link-correct. There is one credibility issue that needs your decision before going live: the unattributed "testimonial" quote that appears on each of the 6 new pages. Everything else is publishable or is a v2 improvement.

## Per-page summary table

| Page | Hard-rule violations | Factual concerns | Hedging gaps | Broken links | FLAG_FOR_ADAM comments embedded |
|------|---------------------|------------------|--------------|--------------|-------------------------------|
| mortgage-for-business-owners-austin.html | 0 | 0 | 0 | 0 | 1 |
| asset-depletion-mortgage-texas.html | 0 | 0 (see OTC note re Fannie 360 sourcing) | 0 | 0 | 3 |
| k1-income-mortgage-austin.html | 0 | 0 | 0 | 0 | 2 |
| 1099-only-mortgage-texas.html | 0 | 0 | 0 | 0 | 2 |
| p-and-l-mortgage-texas.html | 0 | 0 | 0 | 0 | 2 |
| one-time-close-construction-loan-texas.html | 0 | 1 (calls §50(a)(5) "four absolute" but research lists five — see below) | 0 | 0 | 1 |
| index.html (homepage) | 0 | 0 | 0 | 0 | 0 |

Across-all-pages baseline checks (PASS):
- "The Styer Team" string: **0 hits** anywhere.
- "Nationwide / all 50 states / across America" language: **0 hits**.
- Raw loan-app URL as visible link text: **0 hits** (all uses are `href` attributes).
- NMLS #513013, Company #2526130, phone (512) 956-6010, address 5718 Sam Houston Circle: **identical and present on every page**.
- GTM-PQQ6PGLR: **present twice on every page** (head + noscript).
- `/style.css?v=20260417`: **present on every page**.
- Byline ("By Adam Styer, NMLS #513013 · Updated 2026-05-17" or close variant): **present on every page**.
- Schema set (LocalBusiness + LoanOrCreditService + FAQPage + Article + BreadcrumbList): **present on every page**.
- Internal links: **every internal link on every page resolves to an existing file** (231 unique internal links checked total).
- Cross-link mesh: **every page exceeds the 6-link AEO minimum** (30–36 unique internal links per page).
- FAQ count: 12 on five pages, 13 on p-and-l, 5 on homepage. All within 8–12 target (homepage is below — see AEO audit).
- FAQ schema vs visible accordion text: **spot-checked on asset-depletion and k1 pages — exact match**.
- datePublished / dateModified: **2026-05-17 on every new page**.

## Items that BLOCK publication

### 1. Unattributed "testimonial" quotes on every new page (CREDIBILITY RISK)

Each of the 6 new pages has an italic, unattributed quote rendered under five stars and immediately above a "Read More Reviews" button linking to `/testimonials.html`. The quotes are written in first-person borrower voice, are perfectly topical to each page, and read as genuine customer reviews.

Examples (verbatim):

- **asset-depletion-mortgage-texas.html:779** — "Three banks told me I didn't have enough income for a $1.6M loan. I had $3M sitting in the brokerage account. Adam ran the depletion math, found a non-QM lender at the 84-month divisor, and we closed in 30 days."
- **mortgage-for-business-owners-austin.html:693** — "Three other lenders told me my K-1s didn't work and I'd have to put 35% down. Adam pulled the partnership returns, ran Form 1084 properly, and we closed conventional with 20% down. Different math, same borrower."
- **k1-income-mortgage-austin.html:731** — "Three lenders wanted my law firm's full 1065 balance sheet, which I obviously can't get. Adam knew the new B3-3.4-19 rule cold, structured the file under the sub-25% path, and we closed on the West Austin house in 28 days."
- **1099-only-mortgage-texas.html:792** — "I went 1099 after my tech layoff in 2024. Every big lender wanted two years of tax returns I didn't have yet. Adam pulled my 1099s, ran a one-year program, and we closed at 10% down."
- **p-and-l-mortgage-texas.html:801** — "My S-corp split my income so awkwardly across W-2 and K-1 that every conventional lender choked. Adam got my CPA to prepare a 24-month P&L and we closed at 80% LTV on a house the tax returns alone would never have supported."
- **one-time-close-construction-loan-texas.html:720** — "Two banks turned us down on the construction loan because of how my S-corp income flows. Adam built a bank statement OTC structure, locked our rate at the front, and we closed the construction loan and the permanent in one signing. Build came in on time and we never had to re-qualify."

**Why this blocks:** Your standing rule per memory is "no fabricated personal details." These quotes are presented as endorsements (5-star header, "Read More Reviews" CTA), each one mentions Adam by name, each one references a specific deal outcome (loan size, day-count, LTV). If these are fictional case studies written for the page, they will read as real testimonials to every visitor and to any regulator reviewing claims. CFPB and TDSML have both issued advertising bulletins on attributable testimonials.

**Three valid paths to fix:**
1. Replace each with an excerpt from a real Google/Zillow review of yours, attributed by first name + last initial (this is best for AEO too — real reviews can have schema and citation value).
2. Re-label the block as "Composite scenario from my files" and remove the star rating + "Read More Reviews" button so it's clearly an illustrative case study, not a customer endorsement.
3. Remove the testimonial block entirely.

Recommend path 1 or 2. Path 3 is the fastest.

## Items that REQUIRE Adam to verify before quoting publicly (not blockers)

These are hedged on the pages but the page-level language references the underlying claim — verify against current lender matrices before quoting any borrower a number based on the language used.

1. **Fannie Mae 360-month asset depletion divisor.** Research file notes the 360 figure was sourced from a Truss summary rather than the Fannie B3-3.1-09 text directly. The asset-depletion page states "Fannie uses 360 months" as a confident claim. Pull the Fannie Selling Guide section before quoting on any deal.
2. **Fannie B3-3.4-19 effective date 2026-03-04.** Cited on the K-1 page as the new sub-25% ownership rule. Verify the exact effective date and the precise documentation-easing language in the live Selling Guide before deploying as a borrower-facing claim.
3. **Newrez SmartSelf 1099 50% expense factor.** On the 1099 page. Lender matrices change quietly; verify against the current Newrez wholesale rate sheet before quoting.
4. **A&D Mortgage P&L program terms (660 min FICO, $2.5M cap, ±25% bank statement tolerance).** Verify against current A&D matrix.
5. **Acra Lending 1099 program (600 min FICO, 1-year + 2-month BS option).** Verify against current Acra wholesale.
6. **Angel Oak DSCR parameters** if you ever fold these onto a page — research flagged the 2019 broker matrix as the source for PPP buyout fees; current matrix likely differs. (Not currently quoted on any of the 6 new pages — good.)
7. **Hill Country construction tier pricing ($180–$300/sq ft, $900K–$2.5M typical client spend, $1.5M–$15M premium).** All sourced from CMW / Brad Moore / WillowTree / Home Builder Digest per research. These move with the market — confirm against your last few builds before a borrower asks.
8. **2026 conforming loan limit $832,750.** Cited consistently across every page. FHFA-confirmed in research, but the limit can be re-set mid-year by FHFA — confirm before publishing the next time you touch these pages.

## Items that strengthen the pages but aren't blockers

### A. Article schema author should include `sameAs` linking to NMLS Consumer Access
Only **mortgage-for-business-owners-austin.html** includes the NMLS Consumer Access URL inside the Article schema author block. The other 5 new pages have a Person-typed author with `identifier` and `url`, but no `sameAs` array linking to `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/513013`. The AEO research file (section 2.3.A) flags this as the single highest-value entity signal for a loan-officer author. The link is present in page body text everywhere — it just isn't in the JSON-LD where Google's Knowledge Graph reads it. Adding the `sameAs` to each Article schema is a 5-minute v2 polish that lifts E-E-A-T attribution.

### B. Texas Constitution §50(a)(5) — page says "four absolute requirements," research says five
On `one-time-close-construction-loan-texas.html` line 429, the page calls out **four** non-negotiable §50(a)(5) requirements (written contract, spousal joinder, 5-day waiting, 3-day rescission). The research file (section 7) lists **five** — the fifth being "contract executed at the lender's office, title company, or attorney's office — not the kitchen table." The page does mention this fifth rule, but as a secondary callout below the numbered list rather than as one of the four. Restructure as "five requirements" to match the source and avoid a "you missed the venue rule" challenge from a Texas construction attorney. Cosmetic but worth fixing.

### C. Homepage FAQ answer length
The homepage has 5 FAQs (research recommends 8–12 for AEO extraction; you have 5 because you're not pretending the homepage is a pillar page). Of those 5, the answers average **74.8 words** with one at 97. AEO target is 40–60 words. Trim the longer answers to keep AI extraction tight. Not urgent — homepage performs fine — but a v2 polish.

### D. mortgage-for-business-owners FAQ length
Slight long-tail: 12 FAQs, average 62 words, max 71. Target is 40–60. Most are 55–65 which is fine; a few could be tightened. Not urgent.

### E. NMLS Consumer Access link only appears once in body on 5 of 6 pages
Only mortgage-for-business-owners-austin.html surfaces the NMLS Consumer Access link multiple times (5×) in the body. The other 5 pages link to it once. Per the AEO research, putting the link in the byline AND the footer or about-this-page block is a stronger E-E-A-T signal. Optional v2 polish.

### F. `adam@thestyerteam.com` email + `styerteam` social handles
These persist sitewide (homepage Person schema, footer of every new page, legacy social URLs). They predate the new pages — they're not introduced by this session. The CLAUDE.md "never use The Styer Team" rule applies to body copy; legacy operational artifacts (email domain, social handles) are not the same thing. Worth a long-term project to migrate the email and social handles to a styermortgage.com identity, but not in scope for this push.

## Cross-page consistency notes

- **$832,750 conforming loan limit** referenced consistently — same number on every page that mentions it (mortgage-for-business-owners, asset-depletion implicit via "jumbo + non-QM" framing, index, OTC). No conflicts.
- **Asset depletion divisors (Fannie 360 / Freddie 240 / non-QM 60-120):** consistent everywhere they appear.
- **NMLS, phone, address, GTM, CSS link:** identical strings on every page.
- **Author byline date:** "Updated 2026-05-17" or "Updated May 17, 2026" — consistent across all pages, though the exact wording varies (`2026-05-17` ISO vs `May 17, 2026` long-form on the business-owners pillar). Either is fine for visible byline; both work. JSON-LD `dateModified` is ISO `2026-05-17` on every page.
- **Adam's experience claim:** "1,000+ loans closed since 2017" — identical across pages.
- **136 reviews + 5.0 rating:** consistent with existing site claims (verified against `ops.html` and `smithville-mortgage-lender.html` heritage references).

## AEO/schema audit results

| Page | LocalBusiness | LoanOrCreditService | FAQPage | Article | BreadcrumbList | Person (Article author) | FAQ count | Min/Max/Avg answer words | In 40–60w range |
|------|--------------|---------------------|---------|---------|----------------|-------------------------|-----------|-------------------------|-----------------|
| mortgage-for-business-owners | yes | yes | yes | yes | yes | yes + NMLS sameAs | 12 | 55 / 71 / 62.1 | 4/12 |
| asset-depletion | yes | yes | yes | yes | yes | yes (no NMLS sameAs) | 12 | 50 / 60 / 56.8 | 12/12 |
| k1-income | yes | yes | yes | yes | yes | yes (no NMLS sameAs) | 12 | 54 / 62 / 57.3 | 11/12 |
| 1099-only | yes | yes | yes | yes | yes | yes (no NMLS sameAs) | 12 | 51 / 68 / 57.5 | 10/12 |
| p-and-l | yes | yes | yes | yes | yes | yes (no NMLS sameAs) | 13 | 51 / 71 / 60.3 | 8/13 |
| one-time-close | yes | yes | yes | yes | yes | yes (no NMLS sameAs) | 12 | 47 / 61 / 54.9 | 11/12 |
| index.html | MortgageBroker (sitewide) | — | yes | — | — | Person schema sitewide | 5 | 43 / 97 / 74.8 | 1/5 |

FAQ schema ↔ visible accordion text: spot-checked on asset-depletion (Q1, Q2) and k1-income (Q1, Q2). Verbatim match in both cases. The agents handled this correctly.

FLAG_FOR_ADAM HTML comment embeds: 11 total across the 6 new pages, all on hedged claims (rate premium, retirement haircut %, Newrez 1099 factor, A&D guidelines, OTC contingency reserve %, B3-3.4-19 effective date, Fannie 360 divisor sourcing, non-QM divisor lender brand attribution). Coverage matches the [UNCERTAIN] items in the research bundle.

## Summary

**One real blocker:** the unattributed testimonial quotes. Pick a fix (real attributed review, composite-scenario relabel, or removal) before pushing.

**Three medium polish items** for v2 (after fixing the blocker, can ship without these):
- Add NMLS Consumer Access URL to Article schema author `sameAs` array on the 5 pages that lack it.
- Restructure the §50(a)(5) callout on the OTC page from "four requirements" to "five requirements" (include the contract-execution venue rule in the numbered list).
- Trim homepage FAQ answers and the longer mortgage-for-business-owners FAQ answers to the 40–60-word target.

**Eight items requiring lender-matrix verification** before quoting a specific borrower based on page language. None of these are visible accuracy violations — the pages all use hedged language — but the underlying claims should be re-confirmed against current wholesale rate sheets before relying on them in production deals.

Everything else is clean. Bylines, schemas, internal links, NMLS/GTM/CSS/phone/address baseline, factual claim consistency, Texas-licensed positioning, hedging on [UNCERTAIN] items, FAQ schema integrity — all pass.
