# styermortgage.com — Accumulated Learnings

This file is updated by every daily run. Each entry is a pattern or insight worth remembering.
Newest entries at the top.

---

## 2026-03-25 (Week 3) — Pflugerville & Kyle Suburb Analysis

### Competitive Notes
- **Kyle is the most open suburb keyword found to date** — NO dedicated lender page ranks in top 3. All positions held by directories (Greater Texas CU, Zillow, Yelp). First lender with a dedicated page could own this keyword.
- **Big Life now ranks #1 for 3 suburbs** (Pflugerville, Leander, Georgetown) — all with generic templated content. They do NOT have a Kyle page (gap).
- **Lone Star's Austin metro blind spot is massive**: Only 6 pages in Austin metro (Austin, Round Rock, Lakeway, San Marcos, Killeen, Waco) out of 35+ total city pages. Missing: Pflugerville, Kyle, Cedar Park, Leander, Georgetown, Buda, Dripping Springs, Westlake, Hutto, Liberty Hill.
- **Arnaiz Mortgage uses FAQPage schema** — first competitor found with this. Also uses LocalBusiness, MortgageLoan, Service, BreadcrumbList. Multi-state templated operation (50+ city pages). FAQPage is no longer an uncontested opportunity — it's urgent.
- **Geneva Financial Pflugerville page has Arizona address** — worst quality #3 ranking seen. Trivially displaceable.
- **Nest Mortgaging (Kyle)**: Erica Bille, local Kyle broker with strong personal branding and 5-star reviews. Uses my1003app.com (same platform as Adam). Weak SEO now but could improve — potential future threat for Kyle keyword.
- **No Google Ads competition** on suburb keywords (Pflugerville, Kyle) — zero paid competition, cheap CPCs available.
- **Kyle market data for future pages**: ~$350-380K median home price, Hays County, I-35 corridor, 90%+ population growth last decade, Plum Creek and Steeplechase key neighborhoods, Kyle ISD.
- **Pflugerville market data for future pages**: Key neighborhoods include Blackhawk, Falcon Pointe, Meadows of Blackhawk, Wells Branch. PISD (Pflugerville ISD). Travis/Williamson County overlap. Growing tech corridor.

### Suburb Keyword Patterns (Pflugerville + Kyle)
- Kyle: Directories completely dominate — no mortgage lender has a dedicated page ranking. Easiest suburb keyword to win.
- Pflugerville: Big Life ranks #1 with generic content (25 reviews). Geneva ranks #3 with wrong-state address. Both beatable with localized content.
- Credit unions (Greater Texas CU, Austin Telco) rank well for suburb keywords — they're trusted local brands but rarely have dedicated suburb landing pages.
- Review counts on suburb pages matter: Big Life's 25 reviews on Pflugerville page vs 265 on Georgetown page correlate with ranking strength.

---

## 2026-03-24 (Week 2) — Suburb Keyword Deep Dive

### Competitive Notes
- **NEW competitor: Big Life Home Loan Group** — ranks top 3 for both "leander mortgage lender" and "georgetown mortgage lender". Uses AggregateRating schema (265 reviews on Georgetown page). Templated but localized content. Parent: Cornerstone Capital Bank.
- **Lone Star has NO Leander or Georgetown pages** — despite having 30+ suburb pages elsewhere. Major gap in Williamson County suburbs.
- **Review benchmark raised**: Big Life claims 265 reviews on Georgetown page (up from Highlander's ~168 as the reference). Review gap is widening.
- **Arnaiz Mortgage and LendFriend Mortgage** are new entrants in refinance keywords — refinance SERP getting more competitive.
- **Templated city pages at scale** (JVM Lending model) are becoming common — national lenders auto-generating pages. Must differentiate with genuinely local content (market stats, neighborhoods, school districts).
- **Directory dominance growing**: WalletHub "2026's Best" list now ranking for commercial keywords alongside Zillow and Yelp.
- **Lone Star updating content**: Austin page shows Feb 2026 market data ($572,479 avg price). Content freshness is a ranking signal they're investing in.
- **Big Life weakness**: Their suburb pages are generic mortgage education with city name swapped in. No local market data, no neighborhood info. Beatable with better localization.
- **Schema triple play opportunity**: No competitor uses LocalBusiness + FAQPage + AggregateRating together on suburb pages. First to do all three wins rich snippet real estate.

### Suburb Keyword Patterns (Leander + Georgetown)
- Zillow and local directories rank #1 for suburb keywords — organic lender pages compete for positions 2-5
- Dedicated suburb pages with schema markup outrank generic "serving all of Austin" pages
- Content that mentions specific neighborhoods, school districts, and local data ranks better than templated pages
- Georgetown Mortgage Bank benefits from exact-match domain — hard to displace but niche

---

## 2026-03-24 — Initial Setup

### Patterns
- Google Fonts loaded synchronously block render on mobile — always use async preload pattern
- Form must render ABOVE headline on mobile via `order: -1` in CSS media query
- Ad landing pages (/get-preapproved, /refinance-quote) must NEVER have site navigation
- Netlify Forms require both `netlify` attribute AND hidden `form-name` input

### NotebookLM Insights (cached)
- Suburb pages are the #1 priority — Lone Star has 30+ and dominates suburb keyword SERPs
- FAQPage schema is an uncontested opportunity — neither Lone Star nor Highlander uses it
- Answer Engine Optimization (AEO): lead every page with a direct 40-60 word answer to the primary query
- Atomic paragraphs (2-4 sentences) + bulleted lists get extracted by AI search engines
- E-E-A-T is non-negotiable in YMYL: NMLS#, license badges, author bios on every page

### Competitive Notes
- **Baseline (2026-03-24):** 0/9 target keywords in top 10
- **Primary threat:** Lone Star Financing — 30+ suburb pages, LocalBusiness schema, since 2007
- **Secondary threat:** Highlander Mortgage — 168+ reviews at 4.9 stars, ranks #1 for "mortgage broker austin tx"
- **Schema gap:** Neither top competitor uses FAQPage schema — first mover advantage available
- **Suburb page gap:** We have 0 suburb pages vs. Lone Star's 30+ — this is the biggest SEO deficit
- **Review gap:** Highlander has ~168 reviews — we need a systematic review solicitation campaign
- **"Cash out refinance austin tx"** — winnable keyword, current #1 is a small player (Austin Capital Mortgage)
- **"Get pre-approved austin tx"** — auto lenders dominate, mortgage-specific modifier could own this
- **Directory profiles matter:** Zillow and Yelp directories rank in top 3 for multiple keywords — optimize those profiles too
- **Low Google Ads competition** on target keywords — potential for cheap CPCs
- **Key competitors to track:** Lone Star Financing, Highlander Mortgage, Austin Capital Mortgage, Max Leaman/Loan People, CrossCountry Mortgage

### Content Strategy
- Keyword clusters not yet covered: cash out refinance Austin, DSCR loan requirements Texas 2026, down payment assistance Texas 2026
- Blog should publish weekly minimum for SEO freshness signals
- Every blog post needs CTA to /get-preapproved or /refinance-quote

### GBP Notes
- Posts rotate on 5-theme cycle: Rate Commentary → Loan Product → Homebuyer Tip → Misconception Buster → Client Story
