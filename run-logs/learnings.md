# styermortgage.com — Accumulated Learnings

---

## 2026-04-01b — Suburb H1 "Serving" Pattern + 24-Page Count Correction

### Patterns
- **"Mortgage Lender Serving [City], TX" is a systemic H1 anti-pattern**: 12+ suburb pages use "Serving" in their H1 while the title tag says "Mortgage Lender [City] TX" (no "Serving"). This creates a title-H1 mismatch that dilutes keyword density and breaks message match. Fix in rotation: one page per run, drop "Serving" from H1. First fixed: Round Rock.
- **Suburb page count is 24, not 9**: Context file listed only 9 suburb pages (the original Tier 1 cities). The repo actually has 24: bastrop, bee-cave, buda, cedar-park, dripping-springs, elgin, florence, georgetown, hutto, jarrell, kyle, lakeway, leander, liberty-hill, manor, marble-falls, new-braunfels, pflugerville, round-rock, san-marcos, smithville, spicewood, taylor, westlake. ALL 24 need GSC URL submission, not just 9. Context file suburb inventory needs updating.
- **In-body calculators link is absent from all suburb pages (nav-only)**: Suburb pages link to /calculators only via site navigation. The task checklist requires both /get-preapproved AND /calculators as in-body links. A natural insertion point is the "Home Prices in [City]" section — "Use our mortgage calculator to estimate your monthly payment at current rates for any [City] price point." Apply this pattern to each suburb page as you rotate through them.

---

## 2026-04-01 — Context File Staleness + Loan Page CTA Pattern

### Patterns
- **Context file "FIXED" entries cannot be trusted without file verification**: Two items marked "✅ FIXED" in `styermortgage-context.md` (loans/conventional + fha hero CTAs, thank-you 3-step section) were NOT present in the actual files. Root cause unknown — likely a session that logged the fix before confirming, or a subsequent session overwrote the file. **Rule: always grep the actual file before assuming context is accurate.**
- **All 8 loan pages had hero CTAs pointing to raw app URL**: The pattern was consistent — `class="btn btn-primary hero-cta-primary hero-cta-btn" target="_blank" rel="noopener">Apply Now` → raw loan app. Only conventional + fha were ever supposed to be fixed (2026-03-24) but weren't. When fixing one loan page, audit all remaining pages for the same pattern immediately.
- **Refinance page hero CTA should go to /refinance-quote, not /get-preapproved**: When batch-fixing loan page CTAs, make an exception for the refinance page — its conversion funnel is /refinance-quote. All other loan pages → /get-preapproved.
- **TCPA suburb forms appeared in context as open but were already present**: All 24 suburb pages already had TCPA checkbox before today's run. The TOMORROW_PRIORITY note was stale. Pattern: verify file state before doing work, not after.

---

## 2026-03-31b — Suburb CTA Sweep: All 24 Pages Fixed in One Batch

### Patterns
- **The raw loan app URL pattern was sitewide, not page-by-page**: After fixing Round Rock (2026-03-31) and Cedar Park + Leander + Georgetown individually, a count-based audit revealed 18+ remaining suburb pages still had body CTAs pointing to raw loan app URL. Batching the fix via `sed` across all `*-mortgage-lender.html` files took 2 minutes vs. the 24 days it would have taken at one page per day.
- **Two URL variants existed**: Most pages used the `?time=1767737197980` version; 6 newer suburb pages (elgin, florence, etc.) used the base URL without timestamp. Both required a separate sed pattern — always check for both variants when doing batch URL replacements.
- **Footer "Apply Now" links also bypass conversion tracking**: 6 suburb pages had an `<a>Apply Now</a>` inside a `<li>` in the footer contact section. These were missed by the body CTA sweep because they didn't have `btn-lg` class. Lesson: grep for the full domain URL, then audit by context — not just by class name.
- **Instance count after batch fix = 2 is the clean baseline**: nav "Apply Now" (class=nav-cta) + hero "Apply Now" (class=hero-cta-primary) are intentional. Any suburb page with count > 2 after the fix has a remaining issue.
- **Suburb hero quick-forms missing TCPA checkbox**: TCPA was added to /get-preapproved and /refinance-quote in 2026-03-24 but suburb pages were not updated. Discovered on Cedar Park today. Likely affects all 24 suburb pages — flag for tomorrow's run.

---

## 2026-03-31 — Suburb CTAs + Two-Manifest Resolution + Title Pattern Persists

### Patterns
- **Suburb pages CTAs link to raw loan app URL, bypassing conversion tracking**: Round Rock had both "Start Your Pre-Approval" and "Start Your Application" CTAs pointing to the 1003 app URL directly. This means those clicks are invisible to Google Ads and GA4 (generate_lead doesn't fire). Fixed by changing to /get-preapproved. Likely affects all 9 suburb pages — audit one per run in rotation.
- **blog.html now dynamically fetches manifest.json**: The recurring two-manifest divergence issue is RESOLVED. blog.html uses `fetch("blog/manifest.json")` — only one file needs updating when new posts are added. Going forward, only update blog/manifest.json.
- **New blog posts (created outside daily-opt runs) consistently miss "Adam Styer |" in title**: DSCR post and Rates post were both created between runs with "| NMLS #513013" instead of "| Adam Styer | NMLS #513013". This is now confirmed a template-level problem. Always grep new blog files for `NMLS #513013` without preceding "Adam Styer |" at the start of each run: `grep -l "| NMLS #513013" blog/*.html | xargs grep -L "Adam Styer | NMLS"`.
- **Temp-placeholder files persist silently**: A new 2026-03-30-temp-placeholder.html appeared with noindex + canonical to proper URL. Pattern: temp files are created during drafting, the proper-named version is deployed, but the temp file is left behind. These accumulate. Need Adam to authorize deletion policy.

---

## 2026-03-30 — Title Tag Length + Blog Manifest Pattern

### Patterns
- **Suburb page title tags can silently creep above 60-70 chars**: Westlake (99 chars) and Buda (104 chars) had rich descriptive titles that were too long for Google to display without truncation. The standard format "Mortgage Lender [City] TX | Adam Styer | NMLS #513013" is always safe. When creating suburb pages, verify title length before publishing.
- **New blog posts inherit the "missing Adam Styer |" pattern**: The March 30 post had "First-Time Buyer Programs Austin TX 2026 | NMLS #513013" — missing "Adam Styer |". This is now the 5th+ occurrence. Pattern: whoever creates new pages is likely copying from a template that omits the brand. Correct format: "[Title] | Adam Styer | NMLS #513013".
- **blog.html manifest divergence is now confirmed systemic (4 runs)**: Will not self-resolve. Either blog.html needs to fetch manifest.json dynamically, or a checklist step must be added to the post-publish workflow. Flag to Adam is escalated.
- **Temp-placeholder filenames create ongoing risk**: Two temp files remain in repo (`2026-03-06-temp-placeholder.html`, `2026-03-10-temp-placeholder.html`). The March 10 one has both a temp version and a properly-named version — duplicate content risk. The March 06 one has real content at a temp URL. These need a decision from Adam before cleanup.
- **noindex regression watch**: /get-preapproved noindex was confirmed present again today. Pattern: check this EVERY run as the first verification step, not just after changes.

---

## 2026-03-30 — Suburb Indexing Emergency + New Competitor Discovery

### Patterns
- **Suburb pages are NOT indexed after 4 weeks**: `site:styermortgage.com` returns zero results for any suburb keyword (Kyle, Pflugerville, Leander, Georgetown, Round Rock, Cedar Park). Homepage and product pages ARE indexed. Root cause: 15 pages were missing from sitemap.xml until ~March 26 fix. Even after fix, indexing takes time — but manual GSC submission is required NOW.
- **Barton Creek Lending Group has 506 reviews at 4.9 stars**: This is the largest review count found in the Austin mortgage market — 3x Highlander (~168), 2x Big Life Georgetown (~265). They currently have NO suburb-specific pages, but their domain authority and social proof make them a latent threat for any keyword they target.
- **Joel Richardson/FCM is actively rising**: Gained positions on multiple keywords simultaneously — now #4 for "mortgage lender austin tx" AND #1 for "cash out refinance austin tx" (displacing Austin Capital Mortgage). This signals active SEO investment. Needs a deep competitive analysis.
- **San Marcos is more competitive than Kyle**: 3 lenders have dedicated San Marcos pages (Capital Home Mortgage, Lone Star, Big Life) vs. Kyle where zero lenders had dedicated pages. San Marcos page must differentiate harder.
- **Westlake Hills is a luxury market**: Quantum Loans leads with jumbo/luxury emphasis. Barton Creek Lending dominates via reviews but has no dedicated page. Our Westlake page must emphasize jumbo loans, Rob Roy/Davenport Ranch, Eanes ISD. NotebookLM flagged title (96 chars → needs ≤60) and meta desc (193 chars → needs ≤155) as too long.
- **Big Life is expanding**: Added San Marcos page since last check (not present in Week 3). Their suburb rollout is accelerating — window to establish first-mover advantage is narrowing.
- **SERPs are shifting**: Multiple position changes this week — SouthStar Bank took #1 for refinance (new), CMG moved to #2 for broker, Max Leaman to #2 for home loan. More volatility than prior 3 weeks.

---

## 2026-03-29b — Noindex Regression + Title Pipe Pattern

### Patterns
- **noindex tags can silently disappear**: /get-preapproved was confirmed noindex,nofollow on 2026-03-22 but the tag was absent today. Likely caused by a file being overwritten or a new session rebuilding the page from scratch. Always grep for `noindex` on both landing pages at the start of every run, not just after changes.
- **Title tag pipe separator is a consistent failure mode**: "Adam Styer NMLS #513013" (missing pipe) appeared in 4+ blog posts and the /get-preapproved title/OG tags. The correct format is "Adam Styer | NMLS #513013". When generating new pages, always use the pipe format. Run a grep for `Adam Styer NMLS` (without pipe) monthly to catch this.
- **blog.html manifest divergence is a systemic problem**: Now missed 3 runs in a row. The two-manifest architecture (blog.html inline + blog/manifest.json) is fragile. Every new post needs both files updated. If this keeps happening, consider refactoring blog.html to dynamically fetch manifest.json instead of duplicating data inline.
- **Server-side tracking is becoming necessary in 2026**: NotebookLM flagged that standard browser-based tracking may lose 20-40% of conversion data due to ad blockers, iOS privacy changes, and cookieless browsers. Worth flagging to Adam for a future architecture decision.

---

## 2026-03-29 — Two-Manifest Problem on Blog

### Patterns
- **blog.html has its own inline manifest** separate from `blog/manifest.json`. Both must be updated when adding new posts. Prior sessions were only updating `manifest.json` — the blog listing page (`blog.html`) was missing the two newest March 28 posts entirely. Rule: any time a new blog post is added, grep for `"posts":[` in both `blog.html` AND `blog/manifest.json` and update BOTH.
- **Blog post URL drift from temp-placeholder filenames**: Surrender post was linked from blog.html as `/blog/2026-03-10-temp-placeholder.html` instead of the real slug. When a post outgrows its placeholder filename, the blog listing must be updated immediately. Watch for `temp-placeholder` in `blog.html` manifest as a red flag.
- **Title tag brand consistency**: Blog post titles should follow pattern "[Topic] | Adam Styer | NMLS #513013" — not just "| NMLS #513013". FHA post was missing "Adam Styer |". Check new posts before declaring them complete.

---

## 2026-03-28 — Sitewide Async Font Loading Fix

### Patterns
- **Async font fix must be applied to ALL pages, not just landing pages**: When fixing render-blocking Google Fonts on landing pages, always grep for remaining `rel="stylesheet"` font loads across the full repo. Found 90 pages still had sync loading even after landing pages were fixed. The one-line pattern change (preload + noscript fallback) is safe to batch across all pages.
- **Multiple font URL variants exist in the repo**: Most pages use `Inter:wght@400;500;600;700&family=Playfair+Display` but internal/old pages use `Inter:wght@300;400;500;600;700` (no Playfair). Use regex matching when batch-processing, not string matching, to catch both variants.
- **Internal pages get the same fix**: ops.html, dashboard.html, marketing pages — even though they're noindexed, fixing fonts improves load time for Adam's own use.
- **Thank-you redesigns often drop noindex**: Already noted in previous run, but confirmed again — monitor anytime thank-you.html is touched.

---

## 2026-03-27 — Weekly Content: Down Payment Assistance Texas 2026

### Patterns
- **NotebookLM recommendation vs. keyword gap**: NotebookLM recommended Spring Market + Pre-Approval. Pivoted to DPA keyword gap instead because the existing /austin-down-payment-assistance.html is dated 2025 and the 2026 version is an uncontested search target. When NotebookLM recommendation overlaps with an existing page, favor the keyword gap.
- **DPA content drives pre-approval submissions**: Down payment assistance posts are high-intent — someone reading about DPA is ready to apply. CTA to /get-preapproved is the natural next step; include it prominently.
- **Meta description 160-char limit is easy to miss**: Wrote 176-char meta initially. Always count before publishing. Trim the attribution ("Adam Styer, NMLS #513013") from the meta desc — the title tag already carries that.
- **NotebookLM import must happen after deploy**: URL-based source import fails if the page isn't live yet. Flag for follow-up import once Netlify builds (usually 2-4 min after push).
- **Keyword clusters covered so far**: Austin mortgage rates (March 2026), cash-out refinance Austin, down payment assistance Texas 2026. Remaining gaps: Kyle TX mortgage guide, Austin spring market 2026, self-employed mortgage Austin 2026, DSCR loan requirements Texas 2026.


This file is updated by every daily run. Each entry is a pattern or insight worth remembering.
Newest entries at the top.

---

## 2026-03-27 — New Suburb Pages Verified + Blog Meta Cleanup

### Patterns
- **Thank-you page redesigns often drop noindex**: When redesigning /thank-you, always verify `<meta name="robots" content="noindex, nofollow">` is present. Organic visitors landing there without submitting a form pollutes conversion data and bounce rate. Check this any time thank-you.html is modified.
- **Blog manifest title drift**: Blog manifest JSON (inline in blog.html) can diverge from actual post content — check titles match the H1/content when auditing. Found "Newsletter" pointing to the surrender story, and lowercase "the ai trap" in manifest while HTML title was properly cased.
- **Double FAQPage count in grep is not a duplicate**: When grepping for "FAQPage" count, `FAQPage:2` on a page means there's a comment `<!-- FAQPage Schema -->` AND the actual `"@type": "FAQPage"` — both are on adjacent lines. Not a structural duplicate.
- **Prior session uncommitted changes**: Check `git status` early in every run. Uncommitted changes from prior sessions can carry important improvements (TCPA, layout) that need to be committed even when not the focus of today's run.
- **TCPA best practice**: 2026 FCC one-to-one consent rules require SMS opt-in to be a SEPARATE checkbox from general contact consent. SMS opt-in should be optional (not required). Main TCPA consent must include "Consent is not a condition of purchase."

---

## 2026-03-26 — Trust Bar Audit + H1 SEO Fix

### Patterns
- **Trust bar drift is a real maintenance problem**: 39 pages had "#1 Austin Mortgage Team" instead of the standard "Licensed in Texas | NMLS #513013". These had diverged silently over many sessions. Run a grep for `#1 Austin Mortgage Team` at the start of any design audit to catch future drift.
- **Homepage H1 was keyword-weak**: "Your Austin Home Loan Simplified" has zero searchable keywords. Changed to "Mortgage Broker Austin TX — Adam Styer | NMLS #513013" per NotebookLM recommendation. Front-loading the primary geo keyword is the highest single SEO ROI change confirmed by research.
- **Suburb forms don't feed Google Ads conversions**: suburb quick-forms show inline success (no redirect to /thank-you). Only `thank_you_page_view` triggers Google Ads conversion, so suburb lead form completions are invisible to Google Ads bidding algorithm. This suppresses Quality Score and ROAS tracking.
- **Answer-First formatting matters more every month**: NotebookLM confirmed 25%+ of searches now have AI Overviews. Pages with a 40–60 word direct answer in the first paragraph get extracted for citations. This is increasingly competitive.
- **Form fields and conversion rates**: 5 fields is the recommended maximum for mortgage initial contact. Research benchmark: 11 → 4 fields = 120% conversion lift. Consider combining first/last → full name on /get-preapproved.

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
