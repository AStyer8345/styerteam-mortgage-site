## 2026-05-23 PM (styer-site-daily, Saturday — SECOND unscheduled fire) — Re-verify gate + audit sweep surfacing

- **0 site files modified** — second-fire discipline: re-verify only, no piling sweeping copy changes on AM commit. Per CONTEXT.md TOMORROW_PRIORITY for weekend fires + Decision Test (brand positioning is Adam territory).
- **Re-Verify Gate** — sitemap 200, robots 200, conversion 10/10, AM Kyber fixes (buda + ftb-dpa-guide) both still 2× live, legacy entity scrub holds (0/0/0 for "Mortgage Solutions LP" / "Styer Team" / NMLS 2526130).
- **1 audit finding auto-resolved:** 2026-05-17 audit Issue #6 (HNW "~30 states") — 0 occurrences live, likely Adam-cleared between audit publication and now. Removed from future surface.
- **NEW finding for Adam batch approval:** Audit Issue #5 "bank can't match" + "beat builder rates" superlative sweep — 9 files, 12 edits, full file:line table in `run-logs/2026-05-23-pm.md`. Includes index.html H1 + hero subtitle, about.html hero subtitle, 5 suburb pages (georgetown, kyle, leander×2, round-rock×2, taylor×2). Will unblock Phase A "superlatives cleanup" weekly priority.
- **3rd unscheduled weekend fire flagged** — 2026-05-22 PM, 2026-05-23 AM, 2026-05-23 PM. Pattern not anomaly; document expected cadence in SKILL.md.
- NotebookLM 51st dead-check; PSI 17/17 drain (both carry).

## 2026-05-23 (styer-site-daily, Saturday — unscheduled fire) — Phase A entity coverage gap sweep

- **Phase A EHL/NMLS coverage compliance:** `83ad1d4` fixed 2 public-facing footer disclosures missing the new "Kyber Mortgage Corporation dba HyperSmart Home Loans" legal entity name (post-2026-05-20 entity transition). `buda-mortgage-lender.html` (in sitemap, ranked) — copyright + `.footer-disclaimer` rewritten to match site-wide pattern; added NMLS Consumer Access link. `ftb-dpa-guide.html` (DPA landing page) — `.lp-nmls` rewritten with Kyber legal entity in copyright + Consumer Access link in same one-line landing-page footer style.
- **Gap audit via `comm -23`:** identified 7 pages with `HyperSmart Home Loans` but missing `Kyber Mortgage`. Triaged via `noindex` + sitemap intersection — 5 admin/internal pages (dashboard, loan-dashboard, marketing-command-center, marketing-content, loanos-waitlist, thank-you) are noindexed and out of sitemap, so not crawler-facing — deferred. 2 public pages fixed.
- **Re-Verify Gate:** legacy entity "Mortgage Solutions LP" + "Styer Team" + legacy NMLS 2526130 all 0 occurrences sitewide. Yesterday's `a8d565c` Phase B title fixes (/investor-loans + /high-net-worth-mortgage) still hold live.
- **Health:** sitemap.xml 200, robots.txt 200, conversion tracking 10/10 (GTM-PQQ6PGLR + generate_lead + purchase_prequal/refi_quote + thank_you_page_view all verified live).
- **Sister-task working-tree changes** (TODO.md, run-logs/suburb-editor-queue.md, 4 untracked suburb-editor run logs) intentionally NOT staged — file-specific `git add` only, per orphan-file rule from 2026-05-06 learnings.
- NotebookLM 50th dead-check; PSI quota 16-of-16 drain (both carry).

## 2026-05-22 (styer-site-daily, Friday) — Phase B title swap + 8 meta description trims

- **Phase B title cleanup DONE (15-run carry resolved):** /investor-loans now reads "Investor Loans Austin TX | Adam Styer | NMLS #513013" (52 chars); /high-net-worth-mortgage now reads "High-Net-Worth Mortgage Austin TX | Adam Styer | NMLS #513013" (61 chars). og:title and twitter:title intentionally left as their shorter social variants per prior carry-over insight.
- **8 meta description trims to ≤160 chars across complicated-income pages** — all aligned with GOALS.md weekly priority (repositioning around complicated income). Lengths: bank-statement-loans 187→157, bank-statement-loans-austin-tx 169→142, dscr-loan-austin-tx 187→137, dscr-loans-texas 181→155, self-employed-mortgage-austin 182→131, k1-income-mortgage-austin 193→151, mortgage-for-business-owners-austin 203→159, one-time-close-construction-loan-texas 185→149.
- **Misleading "broker" wording removed** from mortgage-for-business-owners-austin meta — Adam is correspondent lender per voice guide; trimmed "Austin's mortgage broker for X" → "Austin mortgage for X".
- **Friday rotation: Content Planning + AEO Review** — 2026-04-17 refinance post strong AEO (FAQPage + 8 question H2s + 8 CTAs); 2026-04-27 home-prices post still missing FAQPage schema (10th carry, paused per GOALS.md no-content rule). Blog stale 25 days, flagged but paused.
- **Single commit `a8d565c`, 10 files**, pushed and verified live (10× HTTP 200 + title + meta spot-checks). Self-review PASS — no hard-constraint violations.
- Re-Verify Gate: prior `276b894` realtors.html alt-text scrub still holds; 0 banned phrases sitewide.
- NotebookLM 48th dead-check; PSI quota 15-of-15 drain (both carry).

## 2026-05-18 EVENING (styer-site-daily pass-3) — Re-Verify Gate only, no auto-edits

- **Verification-only run** — 0 files modified. Third Monday fire of the day (after AM rotation pass + same-day Phase A AggregateRating cleanup pass).
- **Re-Verify Gate** swept 22 claims: 11 STILL OK, 9 STILL OPEN carries deferred to Adam, 2 NEW open findings.
- **Validated Adam's two same-day commits live:** `6e27eb5` nav consolidation (3-page spot-check passes; soft inconsistency on suburb `About Adam` standalone vs nested) + `53b4733` scenario differentiation (4 JSON-LD blocks live, sitemap entry present, get-preapproved tracking preserved post-rewrite).
- **NEW HIGH escalation:** Calculator P0-A (12× inflated PITI bug on `rate-buydown-calculator.html` lines 1035–1036). Sister task `styer-calculator-audit-weekly` flagged 4 weeks running with `patches/calculator-2026-04-20-P0.diff` on disk — escalating from this surface so it doesn't fall through the cracks.
- **NEW LOW finding:** Adam's nav-consolidation commit description claims `About Adam` should nest under Contact dropdown, but suburb pages render it as standalone `<li>`. consolidate-nav.py per-template gap. Logged for tomorrow's spot-audit.
- Conversion tracking 10/10 critical tokens survived Adam's `/get-preapproved` rewrite cleanly.

## 2026-05-18 LATE — SEO/AEO fixes per audit: scenario schema, sitemap, differentiation

Audit findings: /scenario.html had zero structured data and wasn't in
sitemap.xml; 91 recently-touched URLs in sitemap had stale lastmod;
/scenario and /get-preapproved overlapped in positioning (keyword
cannibalization risk).

- **scenario.html:** Added 4 JSON-LD schema blocks: MortgageBroker
  (with Person/Adam, NMLS sameAs), LoanOrCreditService (the scenario
  review offering, $0 price), BreadcrumbList, and a 6-question
  FAQPage covering the page's core AEO questions. Added byline
  with NMLS link + `<time datetime>` updated date. Added
  differentiation callout linking to /get-preapproved for users
  whose intent is actually pre-approval not scenario review. Fixed
  canonical to match served URL (was `/scenario`, now
  `/scenario.html` since `_redirects` keeps both routes valid).

- **get-preapproved.html:** Repositioned as the pre-approval letter
  funnel for active home shoppers (vs scenario review for
  complex/declined files). Title: "Quick Mortgage Pre-Qual Review"
  → "Mortgage Pre-Approval Letter Austin TX | 24-Hour Turnaround".
  Meta description rewritten to lead with "active home shoppers"
  and pre-approval letter. H1 + form heading updated. Added byline
  + differentiation callout linking to /scenario.

- **sitemap.xml:** Added /scenario.html entry (priority 0.9,
  changefreq monthly). Bulk-bumped lastmod to 2026-05-18 for 91
  URLs corresponding to HTML files modified in the last 24h via
  git log lookup. 31 URLs with older dates left untouched (blog
  posts, location pages not modified this session).

Verified: scenario.html now has 23 schema entries (was 0); both
pages have cross-link differentiation callouts; canonical points
to the .html URL.

## 2026-05-18 PM — Week 11 competitive intel run (styer-competitive-weekly)

- **Tracked top-10 jumped 4 → 6 suburbs.** Round Rock ★ #9 (FIRST top-10 ever, breaks 6+ month carry), San Marcos ★ #9 (first measurement). Pflugerville #4 → #2 (Geneva Financial demoted #1 → #3). Leander #6 → #4. Kyle #8 → #6. Hutto demoted #2 → #3 (Zillow directory insertion at #2). Westlake formally dropped from rotation — SERP doesn't disambiguate to TX (returns Westlake Village CA / NJ).
- **NEW STRATEGIC DIMENSION: complicated-income SERPs** per GOALS.md 2026-05-18 repositioning. Adam ranks **#2 jumbo mortgage Austin** (LendFriend #1) and **#4 asset depletion Austin** (via jumbo page). Ranks **0 of 5** on self-employed / bank statement / non-QM / DSCR / 1099 Austin despite having dedicated pages for each.
- **Head-to-head audit: Adam's `/non-qm-loans.html` (NOT ranking) vs LendFriend `/non-qm` (#5).** Adam wins on 4 dimensions (word count, suburb depth, 2026 freshness, internal cluster). LendFriend wins on 2 (FAQPage schema, topic-cluster broader-Texas footprint). **The fix is schema, not content** — fits Phase A "no new content" rule.
- **LendFriend Mortgage is the NEW #1 strategic competitor** — multiple top-3 on jumbo / asset depletion / self-employed / non-QM. Stephanie Donnell (independent broker, personal-brand domain, #1 non-QM Austin) flagged as closest 1:1 competitor profile — deep audit scheduled Week 12.
- **ATX Mortgage Lending sitemap re-fetched: 0 of 61 URLs are dedicated suburb pages** (2nd consecutive biweekly verification). First-mover advantage preserved. Next check 2026-06-01.
- **Joel Richardson / FCM #1 → #4 cash-out**; Austin Capital Mortgage new #1. SouthStar Bank #1 → #2 refi (Yelp displaced to #1). MortgageAustin #1 → #2 get-pre-approved (Kelsey Easton realtor blog new #1 — informational intent beating transactional).
- Wrote report: `run-logs/competitive/2026-05-18.md` (364 lines). Copied to `latest.md`. Appended weekly entry to `/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md`. NotebookLM CLI auth still expired since 2026-05-11 — Step 6 source upload to SEO + Growth Log notebooks could not execute. NotebookLM advisor script 43rd consecutive dead run (no `notebook_advisor.py` at `/Users/adamstyer/loanos/scripts/`).
- TOMORROW_PRIORITY (8 items) filtered through GOALS.md "no new content" rule — top picks: FAQPage + AggregateRating schema audit on 5 complicated-income pages + jumbo page; GSC URL Inspection sweep on 5 suburb pages.

## 2026-05-18 AM — Residual "Close in 21 Days" H3 sweep + Re-Verify Gate auto-resolutions

- **Phase A compliance cleanup (commit `a317f1b`):** Adam's Sunday EVENING sitewide "21-Day Avg. Close" sweep missed 6 suburb pages where the claim lived inside a "How I Work" Step 4 H3 heading. Replaced "Close in 21 Days" → "Coordinated Close" on buda, elgin, florence, jarrell, marble-falls, smithville mortgage-lender pages. Replacement matches each page's existing body copy ("I manage the timeline proactively") so no body rewrite needed. All 6 pages live-verified HTTP 200 with new copy post-Netlify deploy.
- **Lesson:** marketing-phrase audits should grep across ALL `.html` (not just `<meta>` + JSON-LD blocks) and resolve every match with context. Sub-headings in body content are the easiest miss.
- **Re-Verify Gate — 2 auto-resolutions:** (1) style.css working-tree carry (23 prior runs of being uncommitted) — clean tree confirmed today; Adam committed nav-dropdown fix between Sun and Mon. (2) Homepage AggregateRating + 136+ Reviews badge — confirmed REMOVED at schema level by Adam's Sunday EVENING sweep (audit finding #4 schema-level satisfaction). 5.0/45 Zillow text still appears in body copy 2× on homepage — body-copy level audit item remains open.
- **PSI Monday refresh test:** quota STILL drained on `project_number:583797351490` even on Monday 5/18 (10-of-10 consecutive drain). Carry now reframed from "may restore on Monday" to "Monday refresh does NOT restore quota." Confirms permanent throttle theory; provision dedicated key or accept permanent UNVERIFIED.
- **Scheduler-anomaly streak:** Mon 5/18 fired exactly once at normal time. First non-anomaly day after a 4-day, 7-anomaly, 4-distinct-type streak (Thu 5/14 no-fire → Fri 5/15 triple → Sat 5/16 double → Sun 5/17 weekend). HIGH flag stays until 3 clean days in a row.
- **Tuesday 5/19 self-execute preview:** `/investor-loans` (11th carry) + `/high-net-worth-mortgage` (11th carry) title rewrites to insert "Adam Styer" before "NMLS #513013" — Decision Test PASSES (reversible, audit-supported, no legal judgment). Will execute MEDIUM_RISK during Tuesday rotation's Title Tags + Meta Descriptions step.

## 2026-05-17 LATE — UX/conversion overhaul (homepage + /scenario page)

- **Hero CTA cleanup:** Secondary CTA label "Schedule Strategy Call" → "Book 15-Min Call". Both hero CTAs (`Send My Scenario`, mobile sticky bar, final-CTA section) now route to new `/scenario.html` instead of `/get-preapproved`.
- **Mobile hero photo:** Added 96px circular headshot at top of mobile hero authority column. Uses existing `assets/adam-cutout-900.webp` cropped object-position:top-center. Desktop cutout unchanged.
- **Hero quick form:** Added Timeline qualifying field (full-width). New trust line under submit button: "Reply within 1 business hour · 5.0 ★ from 92 Google reviews · 1,000+ loans closed".
- **Stats strip:** Replaced ratings slot with explicit review counts. Now shows 1,000+ Loans / 5.0 ★ from 92 Google reviews / 4.98 ★ from 45 Zillow reviews / 40+ Wholesale Lenders Shopped.
- **Quick Contact form (smart form upgrade):** Renamed "Quick Contact" → "Tell Me About Your Loan". Added 8 qualifying fields: Employment/Income Type, Property Use, Estimated Credit Range, Timeline, Estimated Loan Amount, Annual Household Income, expanded Loan Goal options (DSCR/VA/not-sure added), and free-text "Tell me more" textarea. Submit button: "Send Message" → "Send My Details". Trust line added under submit.
- **"Why Choose Adam" section → 3 composite case studies:** Replaced the generic 6-card feature grid with 3 anonymized case-study cards (Self-Employed Jumbo Westlake $1.2M, DSCR STR Portfolio 4-property, FTB Pflugerville $485K rescue). Added CTA button to /scenario at bottom of section. Composite framing disclosed in section subtitle.
- **Sticky mobile CTA:** Now reveals at 120px scroll OR 2-second timeout (was 30% scroll). Effectively persistent after page load. CTA href updated to /scenario.html.
- **New page: `/scenario.html`** — dedicated long-form qualifying intake landing page. Modeled on `get-preapproved.html` layout but tailored to scenario-review positioning. Form fields: contact info + loan goal + employment type + property use + loan amount + credit range + timeline + income range + city + "bank said" status + free-text situation + optional file upload (multipart, PDF/JPG/PNG up to 8MB). TCPA + SMS opt-in checkboxes preserved. Trust line + 3-step "what happens next" + secondary phone CTA. Form name: `scenario`. Netlify auto-detection via hidden template form at top of file.
- **`_redirects`:** Added `/scenario → /scenario.html 301` for extensionless URL parity.
- **Note on file uploads:** Scenario form does NOT post to `/.netlify/functions/lead-intake` (Mailchimp/LoanOS) because multipart form data can't be JSON-encoded. Native Netlify submission only. Future: Netlify function subscribing to scenario-form webhook can pick up server-side if Mailchimp tagging is needed.

## 2026-05-17 EVENING — Repositioning sweep + "21-Day Avg. Close" claim retired sitewide

- **Goal context:** Adam moving to new company. New-employer compliance audit incoming. Pre-emptive cleanup of styermortgage.com so the audit clears on first read. Positioning shifted to "the loans your bank said no to" + wholesale-pricing leg.
- **Homepage hero:** H1 → "The loans your bank said no to. The pricing your bank can't match." Subtitle rewritten: complicated income / wholesale pricing two-leg pitch. Stats strip slot 4: "21 Days / Avg. Close Time" → "Non-QM / & Self-Employed Specialist". Boilerplate intro paragraph rewritten to lead with complicated-income specialty. Homepage FAQ schema + accordion: stripped the "21 days average close time" claim.
- **about.html:** H1 → "Hi, I'm Adam Styer. I close the loans your bank can't." Subtitle rewritten around specialty + wholesale pricing.
- **Sitewide find-and-replace:** "21-Day Avg. Close" → "1,000+ Loans Closed" across trust badges (~80 files), footer Awards & Recognition blocks (~30 files), `lp-trust-chip` spans (ad LPs), inline spans, list items.
- **Boilerplate body-copy:** "and an average 21-day close" → "and 1,000+ loans closed since 2017" on index, austin-area, dripping-springs, elgin, florence, jarrell, liberty-hill, manor, marble-falls.
- **san-marcos testimonial:** specific "closed in 21 days" claim stripped from fabricated-looking testimonial pending full testimonial audit per 2026-05-17 compliance review.
- **Files touched:** ~95 HTML files. All edits via exact-string Edit with `replace_all=true` — surrounding context preserved.
- **3 acceptable 21-day mentions left as-is:** generic advice paragraph in `blog/2026-04-01-how-to-choose-a-mortgage-lender`, internal `dashboard.html` placeholder text, historical `updates/2026-02-20-fast-closes-teamwork-and-spring-market-momentum.html` (dated post about one specific deal).
- **GOALS.md fully rewritten** at /Users/adamstyer/Documents/Daily Operating System/GOALS.md — loan-officer-first, LoanOS/Client Ops/portfolio paused.
- **2026-05-17_compliance-audit** delivered to workspace folder with 21-finding pre-audit review and prioritized remediation plan. Critical findings: rate widget APR missing on austin-mortgage-rates.html (Reg Z §1026.24(c)), apparent fabricated testimonials (FTC 16 CFR Part 255), GLBA privacy policy gap.
- **Open compliance follow-ups (not done this session):** testimonial authenticity audit (Adam call), rate widget APR fix, privacy policy GLBA rewrite, sitewide superlative cleanup ("award-winning" in schema, "Austin's Top-Rated", "best/lowest"), EHL coverage gaps on ~60 pages, NMLS Consumer Access link gaps on ~53 pages, standard footer partial build.
- **Deploy:** uncommitted in working tree. Adam to run git add/commit/push when ready.

---

## 2026-05-17 — Private-wealth / non-QM expansion (6 new niche pages + homepage schema/FAQ rewrite)

**Driver:** Adam-approved strategic SEO/AEO audit + multi-agent execution. Audit found the site was schema-optimized for commodity searches ("Austin mortgage broker, 21-day close, 40+ lenders") while the actual book is 1,000+ closings of complex-income / private-wealth deals. Goal: add high-value niche pages and reposition homepage structured data to dominate `bank statement Austin`, `DSCR Texas`, `K-1 mortgage`, `asset depletion`, `1099-only`, `P&L mortgage`, and `OTC construction Texas` — keyword universes competitor research confirmed nobody owns.

**Note re session overlap:** This work ran earlier on 2026-05-17 (daytime). Adam's EVENING repositioning sweep (above entry) ran after, replacing the homepage hero H1 + subtitle with sharper "loans your bank said no to" framing and stripping the 21-day claim sitewide. My homepage schema/FAQ/nav/Offer-Catalog edits and the 6 new niche pages survived clean. The Q5 FAQ "21 days average close time" sentence was removed by Adam's sweep — schema and visible accordion still match verbatim.

**Process:**
- **3 parallel research agents** produced sourced research bundles in `cowork/scratch/styer-research-{nonqm-mechanics,austin-market,competitor-aeo}.md` (~9,000 words, primary-source citations: FHFA, Fannie Selling Guide, Freddie §5307.1, Census ACS, ABoR, NAR International Transactions, Angel Oak/Acra/Newrez/A&D lender matrices).
- **4 parallel content agents** built 6 new HTML pages off the research bundles + `bank-statement-loans.html` pattern. [UNCERTAIN] research items hedged with embedded `<!-- FLAG_FOR_ADAM: ... -->` comments.
- **1 fact-check verification agent** cross-referenced all 7 changed files against research and produced `FLAG_FOR_ADAM.md`. Verdict YELLOW → blocker (fabricated 5-star testimonials on all 6 new pages) → testimonials deleted per Adam decision → effectively GREEN.

**Homepage schema/structure changes that survived Adam's EVENING sweep:**
- Title, meta description, OG, Twitter Card — all reframed to niche
- `MortgageBroker` schema description rewritten + Offer Catalog reordered (12 programs, non-QM first, conventional/FHA/VA last)
- `Person` schema upgraded: `description`, `knowsAbout` array (12 specialties), expanded `sameAs` to include NMLS Consumer Access + Yelp + Instagram, added `url` to `hasCredential`
- `FAQPage` schema rewritten — 5 niche citation-grade Q&As replacing commodity questions; visible accordion HTML updated to match schema verbatim; FAQ answers trimmed to ~50w AEO target with internal links to the 6 new pages
- Bento loan grid: "First-Time Buyer Programs" wide card → "DSCR Investor Loans" wide card
- Nav (header + footer): leads with "Business Owners & Self-Employed" pillar link; surfaces Asset Depletion + K-1 Income + non-QM hub
- Sitemap.xml: 6 new URLs added with 2026-05-17 lastmod (0.9 pillar, 0.8 niches); homepage lastmod bumped

**Homepage changes that were OVERRIDDEN by Adam's EVENING sweep (kept his):**
- H1 (mine: "Mortgages for Business Owners, Investors & Complex Deals" → his: "The loans your bank said no to. The pricing your bank can't match.")
- Hero subtitle (mine niche-specific → his: wholesale-pricing two-leg pitch)
- Stats strip slot 4 (mine: trust badge already updated → his: "Non-QM & Self-Employed Specialist" replaces "21 Days Avg. Close")

**New pages (6, all in repo root):**
- `mortgage-for-business-owners-austin.html` (pillar, ~759 lines, 12 FAQs, 5 illustrative deal archetypes labeled as illustrative)
- `asset-depletion-mortgage-texas.html` — divisor comparison table (Fannie 360 / Freddie §5307.1 240 / non-QM 60-120), worked $3M founder example, retirement haircut hedged per [UNCERTAIN]
- `k1-income-mortgage-austin.html` — Fannie B3-3.4-19 (effective 2026-03-04) sub-25% framing, Form 1084 mechanics, business liquidity test (current ratio ≥1.0), worked law-firm partner example
- `1099-only-mortgage-texas.html` — expense factor methodology, multiple-1099 handling, 1-yr vs 2-yr history comparison
- `p-and-l-mortgage-texas.html` — CPA-prepared P&L requirements, who can prepare (CPA/EA/CTEC), hybrid deposit validation
- `one-time-close-construction-loan-texas.html` — Texas §50(a)(5) construction-lien rules (5-day waiting, 3-day rescission, spousal joinder, written contract), Hill Country pricing tiers ($180-$300/sq ft, $900K-$2.5M typical), 7-county target grid

**Schema coverage on every new page:** LocalBusiness + LoanOrCreditService + FAQPage + Article (Person author with NMLS identifier) + BreadcrumbList. 12 FAQs each (13 on P&L), 40-60w answers, schema/visible accordion verbatim match. Fabricated 5-star testimonials deleted per Adam decision.

**Fact-check baseline checks all PASS:** zero "Styer Team" / "nationwide" / raw URL violations; 231 internal links resolve; NMLS/GTM/CSS/phone/address identical across all files. `style.css` deliberately not touched (Adam's 22nd carry preserved).

**Items requiring Adam to verify against current wholesale matrices before quoting borrowers** (all hedged on live pages, full list in `FLAG_FOR_ADAM.md`): Fannie 360-month divisor (sourced via Truss, not primary Fannie text), Newrez SmartSelf 50% 1099 factor, A&D P&L parameters (660 FICO, $2.5M cap), Acra 1099 parameters, retirement haircut convention, non-QM rate premium bps, OTC contingency reserve %, Hill Country pricing tiers.

---

## 2026-05-17 — suburb-editor Round 3 slot 2: georgetown-mortgage-lender.html

- **Lighter-touch refresh** following 2026-05-03 Round 2 deep renovation (page was already first-party-dense).
- Redfin direct fetch 403-blocked (same as Round Rock 5/16); WebSearch re-confirmed March 2026 Redfin median $413K +1.9% YoY = preserved page's $412.5K figure rather than swap for an Orchard/Zillow methodology mismatch.
- **NEW H3: Cimarron Hills (78628) — Guard-Gated Golf + Second ISD Split** — Jack Nicklaus Signature 1,000+ acre community opened Jan 2003 with clubhouse at 200 Cimarron Hills Trail W ([cimarronhills.com](https://www.cimarronhills.com/about-us/our-location-200-cimarron-hills-trail-west-georgetown-tx-78628)). 4-tier pricing ladder per [Cimarron Hills real-estate page](https://www.cimarronhills.com/real-estate): Villas 1,550–2,600 sqft / 2–4BR low-$300s; Homes on the Fairway low-$450s; Country Club Homes $558,900+; Estates ½–1 acre $700s+. Current new-construction inventory: 5 active listings at $1.23M median list ([Redfin](https://www.redfin.com/neighborhood/199061/TX/Georgetown/Cimarron-Hills/new-homes)); 12-month resale median $1,150,000.
- **CRITICAL — SECOND LHISD-Georgetown-mailing-address split surfaced** — Cimarron Hills is split between GISD (northern half: San Gabriel Elem → Benold MS → East View HS) and Liberty Hill ISD (southern half: Rancho Sienna Elem → Santa Rita MS → Legacy Ranch HS / Liberty Hill HS) per [austinrealestatehomesblog](https://www.austinrealestatehomesblog.com/georgetown/cimarron-hills/) + [Liberty Hill ISD zone tool](https://www.libertyhill.txed.net/zones). MorningStar pattern repeats; now both LHISD traps documented on the page.
- **Historic-district filler paragraph rewritten** — was generic "popular with buyers who want character architecture" → Old Town District 78626 specifics: FHA 203(k) renovation framework + 2026 Williamson County FHA limit $571,550 + non-conforming-lot Texas appraiser callout + live [Redfin Old Town District tracker](https://www.redfin.com/neighborhood/176391/TX/Georgetown/Old-Town-District/housing-market) link.
- **Why-card "Experience with Georgetown's Diverse Market" de-templated** → "ISD-Zoning Verification Before You Offer" card naming MorningStar (entire community) + Cimarron Hills (southern half) as the two LHISD traps with underwriting-tax-escrow rationale.
- LocalBusiness schema description expanded with Cimarron Hills + clubhouse address + GISD/LHISD split.
- FAQ home-price schema + accordion answer updated with Cimarron Hills 4-tier ladder + $1.15M resale median.
- WebPage dateModified bumped 2026-05-03 → 2026-05-17.
- Sitemap.xml lastmod bumped 2026-05-03 → 2026-05-17.
- **5 new inline source URLs added.** All 4 JSON-LD blocks validated clean.

---

## 2026-05-16 — suburb-editor Round 3 kickoff: round-rock-mortgage-lender.html

- **Round 3 begins** — Round 2 completed 2026-05-15 (westlake). Round 3 #1 = round-rock-mortgage-lender.html.
- **Lighter-touch refresh** following the 2026-05-02 deep renovation (page was already first-party-dense).
- April 2026 Redfin data attempted via WebFetch (403-blocked); WebSearch surfaced Orchard $415K–$419K — different methodology, didn't swap in unverified Redfin figure. Preserved well-sourced Mar 2026 Redfin $367,500 baseline.
- **NEW H3: Chandler Creek 78664 spotlight** — Palm Valley east-side community, built late-1990s through early-2000s by KB Homes/Lennar/Centex/Brighton ([austinrealestatehomesblog.com](https://www.austinrealestatehomesblog.com/round-rock/chandler-creek/)). Floor plans 1,120 → ~4,000 sqft on lots up to 0.435 acres. RRISD: Double File Trail Elementary @ 2400 Chandler Creek Blvd → Hernandez Middle → Stony Point HS ([roundrockisd.org](https://www.roundrockisd.org/o/rrisd/page/chandler-oaks-elementary-school)). HOA <$400/yr — pool, ½-mile lit ADA trails, playgrounds, ball fields, Compass Rose Veterans Memorial ([chandlercreekhoa.org](https://www.chandlercreekhoa.org)). Memorial reinforces page-wide VA narrative.
- **Step-4 process narrative de-templatized** — was verbatim on 8 suburb pages → now Round Rock 78664/78665/78681-specific (38+ DOM reality, seller concessions returning, builder-preferred-lender contingency framing, RRISD on-time-close reputation).
- WebPage schema dateModified bumped 2026-05-02 → 2026-05-16.
- Sitemap.xml lastmod bumped 2026-05-02 → 2026-05-16.
- **3 new inline source URLs added.** All 4 JSON-LD blocks left validated-clean (no schema edits in this pass).

---

## 2026-05-16 — daily-opt Saturday UNSCHEDULED FIRE (abbreviated playbook)

- **Saturday weekend fire @ 07:12 CDT** — Saturday is NOT in the Mon–Fri rotation. Friday NIGHT's TOMORROW_PRIORITY explicitly anticipated this as scheduler-anomaly evidence; now confirmed. **4th scheduler anomaly in 3 days** (Thu no-fire / Fri triple-fire / Sat weekend fire = 3 distinct anomaly types).
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens hold across all 4 pages (GTM single-container `GTM-PQQ6PGLR` hex verified).
- PSI 8-of-8 consecutive drain — retry skipped to preserve Monday 5/18 refresh window. Already at HIGH ceiling.
- NotebookLM script: 39th consecutive missing check.
- Re-Verify Gate sweep on 16 carries — all STILL OK / STILL OPEN with no false regressions or new auto-resolutions.
- Scheduler reliability HIGH flag held + evidence expanded (3 distinct anomaly types in 3 consecutive days). Strongly recommend manual scheduler-log review.
- 0 site files edited.

## 2026-05-15 — Suburb Editor: westlake-mortgage-lender Round 2 (Round 2 closeout)

- **Last Round 2 page in the priority queue** — westlake-mortgage-lender.html Round 2 deepening + Round 2 rotation complete (13/13 pages).
- **Median triple-snapshot reconciliation:** Round 1 had only Redfin $1.6M (city of WLH, Mar 2026, +40.9% YoY). Round 2 adds **TeamPrice 78746 zip YTD $2,394,287** + **Neuhaus 2026 luxury slice $3.5–3.6M @ $756/sqft, 54–85 day DOM, 9.0 mo. supply** + sales-tier breakdown $1M–$2M 45% / $2M–$3M 28% / $3M–$5M 18% / $5M+ 9%. New H3 explains why three sources show three different medians (geography slice, not data conflict).
- **CRITICAL Lost Creek Country Club correction (Crestline/MorningStar/Star Ranch/Reunion Ranch pattern):** Round 1 linked `lostcreekcc.com` which now points to Lost Creek Custom Cabinetry (East Tennessee — broken first-party reference); the club itself **rebranded to Westlake Country Club in 2022** under Invited and completed a three-year multimillion-dollar transformation in **December 2025** (Lanny Wadkins-redesigned 18-hole course unveiled Nov 2023, tennis/racquet/pool/clubhouse rebuilds, restaurant relaunched as "Veranda"). Address 2612 Lost Creek Blvd. Lost Creek bullet rewritten; Westlake Country Club promoted to named-employer H3 slot.
- **Eanes ISD update — district past the budget cliff:** new superintendent **Kirk Koennecke** (started Jan 1, 2026); $9.6M FY 2026-27 deficit projection **reversed to $1.6M projected surplus** after $2.8M Right Size Plan + 69 FTE attrition + virtual academy + transfer enrollment expansion (Community Impact Apr 29 2026). 480 teachers qualify for $2,500–$5,000 retention allotments. **5 new Westlake HS 2026-27 courses** (AP Business + Personal Finance, AP Cybersecurity, Fundamentals of Real Estate, Dual Credit English 1301/1302 via ACC, Dual Enrollment Statistics via UT OnRamps).
- **New first-party comp:** 4312 Amarra Drive (Heyl Homes) sold $3.5M Oct 28, 2025 — Austin's priciest spec sale that week at $1,000/sqft on 3,300 sqft / 3-2 (The Real Deal cited).
- **New Barton Creek sub-community pricing breakdown** (Seely Properties 2026): Barton Creek West $3M–$7M+ / Estates $1.5M–$2.5M / Villas $1.2M–$1.8M / Sections 1–8 $1.4M–$2.8M.
- **New Omni Barton Creek Resort employer slot** — $150M renovation completed 2019 (13,000 sqft Mokara Spa, 17 treatment rooms, adults-only rooftop pool) + active Beck Group expansion (180-room new guest tower, ballroom, conference, event pavilion).
- **3 of 4 Process Steps de-templated** — Step 2 verbatim shared with spicewood ("Your file goes to multiple jumbo and portfolio investors simultaneously. You get competing offers — not just one bank's rate") rewritten with Rob Roy K-1 / Davenport Ranch asset-depletion / Barton Creek RSU differentiation + $300–$700/mo investor-spread math on $2M loans; Step 3 generic "soft pre-qual" rewritten with Westlake listing-agent verification at Rob Roy gate + Barton Creek sub-neighborhoods; Step 4 generic "jumbo can take longer" rewritten with Day-1 appraisal-ordering + HOA-estoppel-ordering at Rob Roy/Barton Creek/Davenport Ranch as actual delay points.
- **FAQ schema** "median home price" rewritten with three-snapshot reconciliation; **NEW Q added** "Is Eanes ISD's budget stable for 2026-27?" anchoring the $1.6M FY26-27 surplus + Koennecke + August 2026 tax-rate adoption. FAQ accordion synced verbatim.
- **LocalBusiness schema description** rewritten with 3 median snapshots + 9.0 mo supply + tax stack + Koennecke + Right Size Plan + $1.6M surplus.
- **WebPage dateModified** 2026-05-01 → 2026-05-15. Meta description refreshed. Sitemap lastmod bumped 2026-05-01 → 2026-05-15.
- All 4 JSON-LD blocks (LocalBusiness/FAQPage/BreadcrumbList/WebPage) validated clean via python json.loads.
- **18 new inline source URLs** (combined with Round 1 = 30+ total citations on the page).
- Queue log updated. Suburb editor queue position rolls over to Round 3 start next run.

## 2026-05-15 PM — daily-opt duplicate same-day fire (bonus drift sweep)

- **Same-day duplicate fire** 4 min after AM cleanup (09:49 → 09:53). No rotation re-do. Every-run checks idempotent.
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens hold across all 4 pages. GTM single-container hex verified.
- PSI 8-of-8 consecutive drain locked in (no new escalation — already at HIGH ceiling).
- NotebookLM script: 37th consecutive missing check.
- Re-Verify Gate sweep on 16 carries — all STILL OK / STILL OPEN with no false regressions or new auto-resolutions.
- **NEW operational MEDIUM flag for Adam:** scheduler reliability degrading (Thursday 5/14 no-fire + Friday 5/15 duplicate same-day fire).
- Zero site files modified. Zero commits.

## 2026-05-15 — Weekly Blog Editor: local-lender-vs-online-lender correspondent-lender repositioning

- **Refreshed `blog/local-lender-vs-online-lender-austin-central-texas.html`.** Slug + H1 + title preserved (protect existing rankings). dateModified bumped 2026-04-25 → 2026-05-15. Sitemap lastmod bumped.
- **Core fix: "broker" → "correspondent lender" positioning** (per Adam's voice guide: "We're a correspondent lender — that's different from a broker, and it matters"). Body recast in 7 places: lead bold, intro paragraph, TSAHC line, "Third Option" H2 + 4 body paragraphs, final H2 + closing. Visible FAQ + FAQPage JSON-LD rewritten (3 Q&As, including new "What's a correspondent lender?" Q replacing the broker-advantage Q). TX regulatory footer "Licensed Mortgage Broker" preserved (legal designation).
- **Same fix pattern as 2026-04-24 DPA editor run** (`"broker" → correspondent lender`). Adam's flexibility — "can also broker deals when wholesale pricing wins" — preserved as a beat in the positioning.
- **3 of 5 SKILL.md improvements:**
  - Austin data point: $445K Austin–RR–SM MSA median (April 2026, Unlock MLS) + 16K+ active listings — added to "Why Austin Buyers" section with inline citation.
  - Updated rate/program data: Freddie Mac PMMS mid-6% range with `freddiemac.com/pmms` citation; LLPA matrix cited to `singlefamily.fanniemae.com`; TSAHC + TDHCA URLs added (replacing un-linked program names); internal links added to `/austin-down-payment-assistance.html`, `/dscr-loan-austin-tx.html`, `/bank-statement-loans.html`, `/non-qm-loans.html`.
  - Tighter CTA in Adam's voice: signature reworded to "Got a quote from an online lender or a bank? Send it over. I'll line it up against my pricing... Same-day pre-approval if you want to move on it." Same-day pre-approval differentiator per voice guide.
- **NOT done (skipped per SKILL.md "never fabricate" rule):** No `/Users/adamstyer/.claude/projects/-Users-adamstyer-Documents/memory/people/` directory exists — no verifiable borrower anecdote available, did not invent one. Photo addition deferred (no verified asset path).
- **Related Guides anchor updated:** `Mortgage Broker vs Bank` → `Correspondent Lender vs Broker vs Bank` (URL `/mortgage-broker-vs-bank.html` preserved; future redirect/rename is Adam's call).
- **Blog title lint passed** (`grep "<title>" blog/*.html | grep -v "Adam Styer"` returns empty).
- **Queued for GSC URL Inspection reindex.**
- **NEEDS ADAM (NEW 2026-05-15) — rate-shopper cluster consolidation review:** 5-post near-duplicate cluster on "comparing quotes/offers" angle: `how-many-mortgage-quotes-should-i-get.html`, `how-to-compare-two-mortgage-offers.html`, `what-to-compare-besides-mortgage-rate.html`, `is-the-lowest-rate-the-cheapest-loan.html`, `apr-vs-interest-rate-what-actually-matters.html`. Per SKILL.md, posts in a 3+ near-duplicate cluster are not edited unilaterally — consolidation decision (merge into 1–2 canonical posts with 301s, or differentiate angles further) is Adam's call. Logged to TODO.md.

## 2026-05-15 — daily-opt Friday (Content Planning + AEO Review rotation)

- **First fire since Wed PM. Thursday 2026-05-14 styer-site-daily DID NOT FIRE — Internal Linking + Funnel Flow rotation skipped.** Logged as operational MEDIUM flag for Adam (check scheduler). No site edits this session — Friday rotation collapsed correctly per GOALS.md "no new content this week" guidance.
- **Sitemap 200 ✅. Conversion tracking 10/10 critical tokens** across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`. GTM single-container hex-verified (`GTM-PQQ6PGLR`). PSI 7-of-7 consecutive drain locked in (HIGH escalation ceiling — no new bump).
- **Blog audit:** Latest post 18 days old (2026-04-27-why-home-prices-arent-crashing, deferred per GOALS.md). Audited 2 most recent: `should-i-refinance-austin-tx-2026` clean AEO (6/9 H2 questions, FAQPage schema, balanced /get-preapproved + /refinance-quote CTAs); `why-home-prices-arent-crashing` declarative H2s flagged voice-vs-AEO tradeoff (keep declarative, matches Adam's voice). **NEW finding:** same post missing FAQPage schema — LOW_RISK, bundled with existing 18-carry CTA structure decision.
- **Re-Verify Gate 15 carries — all hold.** AM Tue/Wed meta fixes (FTB/DPA/Pflugerville) STILL LIVE on Netlify; products.html 10 in-card 1003 (18th carry); style.css working-tree (18th carry); `/investor-loans` + `/high-net-worth-mortgage` titles missing "Adam Styer" (5th run carry); NotebookLM script missing (36th carry).
- NOTEBOOK_INSIGHT captured: `GTM-` naive substring count ≠ container count (head + noscript references inflate); hex-unique grep is authoritative.

---

## 2026-05-14 — Suburb Editor Round 2 #12 (Dripping Springs)

- **dripping-springs-mortgage-lender.html Round 2.** Median dual-snapshot — Round 1 Mar 2026 Redfin $542,500 (+4.7% YoY) supplemented with **April 2026 ACTRIS pull via Neuhaus: 50 closings at $575,750 (-19.5% YoY)** — gap reconciled as mix-shift from 2026 new-construction flood.
- **CRITICAL Reunion Ranch correction surfaced** (Crestline/MorningStar/Star Ranch pattern): Round 1 framed Reunion Ranch as horse-friendly acreage with $1M+ resales; reality is **Taylor Morrison master-planned, 437 SFH, 0.25–0.8 ac lots (NOT acreage), 2,199–5,425 sqft, 2012 groundbreak / 2022 build-out + luxury infill**, pool/sport courts/business center. Single-builder, suburban MPC.
- **2 NEW H3 sections (~75 lines):** **2026 Construction Flood** — Big Sky Ranch (Meritage ~700 homes $350K-$600K), Wild Ridge (900+ homes), **Double L Ranch (1,600 ac / 2,200+ luxury homes / 500 ac parkland / four-lane RM-12 to US-290 arterial / late 2026)**, Village Grove (100 ac / 531 units); **DSISD Second High School ($402.3M Prop A bond, opens 2028-29)** — broke ground April 2026 on Darden Hill Rd next to Cypress Springs Elem, 482,800 sqft / 2,500-student capacity, $298.78M of bond, DSHS projected 3,000 students by 2026-27 over 2,500 cap.
- **FAQ schema swapped** — generic pre-approval Q → "Will my Dripping Springs home be zoned to DSHS or the new High School No. 2"; accordion synced.
- **Headwaters builder roster correction** — Round 1 had 2 builders; current 2025-26 roster is **4 active: Ashton Woods + David Weekley + Toll Brothers + Coventry**, Coventry's new model opened, Toll Brothers' "Lady Bird" debuted. **Caliterra Phase 2 deepened** — $40M expansion, 232 homesites (39 custom + 193 production from the $700,000s), 14 plans 3,400-5,350 sqft on 80-100 ft lots, builders David Weekley + Drees + Scott Felder, December 2026 first move-ins; most of band crosses 2026 conforming line. **NEW Big Sky Ranch spotlight** — Meritage 126 Bartlett Peak Lane.
- **Treaty Oak status correction** — Round 1 listed as active; **acquired Nov 13, 2024 by High Basin Brands in $4M seed round**, Yelp flags walk-in closed → flagged as not buyer-facing. **DSISD confirmed 7th-largest Hays Co employer at ~1,100 employees**; **NEW Garrison Brothers** (Hye TX 25-min west, 50K+ annual visitors).
- **Property Tax refreshed** — Hays County FY 2025-26 **$0.3999/$100 adopted 4-1 on Sept 16, 2025 (+11.27% YoY revenue)** added; DSISD $1.1052 + City of DS $0.2267 unchanged; ~1.71% effective Ownwell.
- **Schools H3 expanded** — DSHS 2,564 students, 99% grad rate (US News), ~93% post-secondary, top 20% of TX (Public School Review); DSISD ~8,800 enrollment.
- **Templated paragraphs removed:** Step 1 "No credit pull happens until you are ready to move forward" verbatim duplicate (12-page match) replaced; Step 4 "Take your pre-approval letter to any Dripping Springs listing. Sellers and their agents know a pre-approval from Adam Styer means the deal will close on time" verbatim duplicate (9-page match) replaced with DSISD HS#2 boundary-draw strategy + acreage well/septic/OSSF coordination.
- **LocalBusiness schema description** + meta + WebPage dateModified + sitemap lastmod all bumped 2026-04-30 → 2026-05-14. All 4 JSON-LD blocks validated clean. **18 unique inline source URLs.**

---

## 2026-05-13 PM — daily-opt Wednesday PM (styer-site-daily, no-rotation drift sweep)

- **Wednesday PM bonus run — no site edits.** Same-day no-rotation precedent (Sun PM + Mon PM + Tue PM extended). Sitemap (200), conversion tracking 10/10 critical tokens across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`, PSI retry (429 on both landing pages — **6-of-6 consecutive drain period** on project 583797351490), Re-Verify Gate on 15 AM carries (all STILL OK / STILL OPEN with no false regressions), seo-sem backlog 0 open items.
- **AM Wed Pflugerville meta fix verified STILL LIVE on Netlify** — 151 chars, "Adam Styer" before NMLS, Blackhawk/Falcon Pointe/Windermere intact (commit `13f8cd5`).
- **Methodology note captured to NOTEBOOK_INSIGHTS:** sibling-agent commits between AM/PM runs can shift `dataLayer` counts (today AM 5/7/7/8 → PM 7/10/10/14 from `30fe26a` Bee Cave R2 + `90bf131` session-end docs). Critical-token methodology survives — `generate_lead`, `lead_type`, `lead-intake`, `form-name`, `thank_you_page_view` are the load-bearing checks, not raw `dataLayer` count.
- NotebookLM 35th consecutive missing-script check; PSI escalation already at HIGH ceiling (no further bump).

---

## 2026-05-13 — Suburb Editor Round 2 #11 (Bee Cave)

- **`bee-cave-mortgage-lender.html` Round 2 ship.** Last touched 2026-04-29 (Round 1). Round 2 adds: (1) **CesiumAstro $500M global HQ expansion** as headline employer signal — ~270K sqft three-building campus near SH-71/Sweetwater Village Drive, 500+ new jobs, operations 2027, 1,000+ employees by 2030, anchors Element satellite platform + Vireo multi-beam payloads (Community Impact Jan 15 2026, CesiumAstro press release, Office of the Governor cited; Mayor Kara King quote integrated). (2) **NEW Lake Pointe (78738) neighborhood spotlight** — 825 homes off Bee Caves Rd / RM 2244, dev started 1994, subdivisions The Settling/The Landing/The Estate/Vista Pointe/gated Pointe at end of Resaca Blvd, $350K-$1M+, Napa Park, LCRA Lake Austin day dock via HOA (movetoaustin.org). (3) **NEW Lake Pointe Elementary 9/10 GreatSchools** (11801 Sonoma Dr, 748 PK-5) added to schools list; Bee Cave Elementary updated with Falconhead/Sweetwater feeder note. (4) **Tax stack expanded** with LT Fire / Travis County ESD No. 6 line $0.090399/$100 (M&O 0.085646 + I&S 0.003753, TY2025, LTFR Resolution 2025-01 cited); Spanish Oaks no-MUD/no-PID callout added (1,200-acre, 462 custom homesites, only Travis County + LTISD apply).
- **Process steps fully de-templated.** Step 1 "No credit pull happens until you are ready to move forward" verbatim duplicate (grep-confirmed across 11 other suburb pages) removed. All 4 steps rewritten Bee Cave/jumbo-specific with conforming-line math, RSU/K-1 jumbo doc checklist, side-by-side conv-vs-jumbo rate-sheet language, and listing-agent phone-call differentiator at Spanish Oaks/Falconhead Phase 6/Pointe section.
- **Schema + accordion sync.** LocalBusiness description rewritten with 78738 + 4 named neighborhoods + CesiumAstro signal + conforming-line context. FAQ schema home-price + schools answers expanded with Lake Pointe range + Spanish Oaks no-MUD detail + Lake Pointe Elementary 9/10. Accordion FAQ verbatim-synced.
- WebPage dateModified 04-29 → 05-13. Meta description rewritten with Lake Pointe + Lake Pointe Elem + CesiumAstro. Sitemap lastmod 04-29 → 05-13. All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads. **16 inline source URLs** on the page.

---

## 2026-05-13 — daily-opt Wednesday (styer-site-daily, Suburb Deep Dive + AEO rotation)

- **Wednesday rotation — Pflugerville suburb deep dive.** New top-10 ranker per Competitive Week 10. Page audited against SKILL.md Wednesday rotation checklist: H1 city-specific ✅, FAQPage + BreadcrumbList + LocalBusiness + AggregateRating + City schema all present ✅, inline lead capture form ✅, internal links to `/get-preapproved` ✅ (2), AEO answer-first body intro ✅ ("To get a mortgage in Pflugerville TX, work with an independent broker like Adam Styer..."), H2s as conversational questions ✅ (5 of 7), voice match ✅.
- **One LOW_RISK fix shipped (commit `13f8cd5`):** `pflugerville-mortgage-lender.html` meta description trimmed 174 → 151 chars; added "Adam Styer" before NMLS #513013. Dropped "Mar 2026 Redfin" wording and Hendrickson HS 8/10 rating to fit Google's 160-char display window. High-value tokens preserved (city+state, FHA/VA/conventional, Blackhawk/Falcon Pointe/Windermere, $355K median, 40+ lenders, NMLS).
- **NEW LOW finding flagged for Adam:** 4 of 5 sampled suburb pages (round-rock, leander, hutto, georgetown, pflugerville) have 0 internal `/calculators` links; only cedar-park has 1. Roster-wide pattern. Not implemented as a 24-page cross-cutting fix without Adam's decision.
- **PSI 5-of-5 consecutive drain locked in.** Mon AM + Mon PM + Tue AM + Tue PM + Wed AM all 429 on project 583797351490. Metric now permanently UNVERIFIED until Adam provisions dedicated PSI API key.
- **Re-Verify Gate on 13 prior carries:** all STILL OK / STILL OPEN with no false regressions. AM Tuesday meta fixes (`/first-time-home-buyer` + `/austin-down-payment-assistance`) verified STILL LIVE on Netlify.
- **NotebookLM 34th consecutive missing-script check.** Adam queue bottleneck continues on retirement diff (drafted 2026-04-26).
- Methodology note captured to NOTEBOOK_INSIGHTS: audit suburb body intro paragraphs at the first `<section class="section">` after the hero (`<!-- Intro Content -->` marker), NOT raw `<p>` after `<h1>` — the latter pulls hero-subtitle + Call CTA + form labels.

---

## 2026-05-12 PM — daily-opt Tuesday PM (styer-site-daily, no-rotation drift sweep)

- **Tuesday PM re-fire — no site edits.** Following Sunday PM + Monday PM no-rotation precedent: sitemap (200, freshest lastmod 2026-05-12 — AM Title+Meta commits + Lakeway suburb-editor R2 rolled into Netlify sitemap regen), conversion tracking 10/10 critical tokens across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`, PSI retry (429 on both landing pages — **4-of-4 consecutive drain period** on project 583797351490), Re-Verify Gate on 14 AM carries (all STILL OK / STILL OPEN with no false regressions), seo-sem backlog 0 open items.
- **Methodology correction captured:** the why-home-prices-arent-crashing CTA "2 + 2" carry was a substring-overlap double-count (relative `../get-preapproved` contains the substring `/get-preapproved`, so bare-grep counted each href twice). Live file has 2 total CTAs (both relative). Switched to `href="`-anchored patterns in NOTEBOOK_INSIGHTS for future audits.
- **PM-live verification of AM Tuesday meta fixes:** `/first-time-home-buyer` serving "24-hour pre-approval" + `/austin-down-payment-assistance` serving "Travis & Williamson Counties" — both meta-fix commits live on Netlify.
- NotebookLM 33rd consecutive missing-script check; PSI escalation already at HIGH ceiling, no further bump.

---

## 2026-05-12 — Suburb Editor Round 2 #10 (Lakeway)

- **`lakeway-mortgage-lender.html` Round 2 ship.** Last touched 2026-04-28 (Round 1). Round 2 adds: (1) **April 2026 ACTRIS MLS data via Neuhaus Realty** alongside Feb Redfin — 15 SFH closings at $868K median, 6.3 mo supply, 94.9% close-to-list, 12-day median list-to-contract (reconciled the Redfin/Neuhaus methodology gap inline). (2) **City of Lakeway's own employer ranking** — LTISD #1 / BSW #2 / Lakeway Resort & Spa #3 (lakeway-tx.gov About) — replaces Round 1's BSW self-citation. (3) **NEW H3 "Lakeway Neighborhoods Inside Lake Travis ISD"** — Rough Hollow expanded with **Legend Communities + 22 distinct neighborhoods + Yacht Club & Marina MAX awards + Highland Village waterpark + The Point/The District new builds**, **NEW Serene Hills 78738 spotlight** (456-acre / 339 homesites / 342 preserved acres / Weston Dean+Brohn+Sitterle / Serene Hills Elem 9/10 INSIDE community), Flintrock/The Hills/Lakeway Highlands/Cardinal Hills consolidated.
- **Process Step 4 de-templated.** Round 1 had verbatim "Take your pre-approval letter to any Lakeway listing. In the luxury segment..." — grep-confirmed across 10 suburb pages. Rewrote Lakeway-specific (listing-agent gate-verification calls + 12-day ACTRIS list-to-contract signal).
- **FAQ home-prices** (schema + accordion synced) rewritten with reconciled Redfin/Neuhaus data + Serene Hills + 22-neighborhoods detail.
- WebPage dateModified 04-28 → 05-12. Sitemap lastmod 04-28 → 05-12. All 4 JSON-LD blocks validated clean via python json.loads. **6 new inline source URLs** (~20 total on page).
- Working-tree carries preserved untouched (style.css 14th-carry).

---

## 2026-05-12 — daily-opt Tuesday (styer-site-daily, Title+Meta rotation)

- **Tuesday Step 4 rotation complete.** Title Tags + Meta Descriptions audit on 12 loan-type pages — all present, none missing/duplicate/generic. 2 LOW_RISK length fixes shipped (commit `7091c5e`); 2 MEDIUM findings (investor-loans + high-net-worth title brand presence) surfaced for Adam.
- **Site edits:** `first-time-home-buyer.html` meta 162→158 chars (`Pre-approved in 24 hours.` → `24-hour pre-approval.` — matches og:description on same page, intra-page consistency win). `austin-down-payment-assistance.html` meta 145→161 chars (added Williamson County — reflects TSAHC/TDHCA service area). Netlify deploy verified live with `Williamson Counties` marker poll.
- **Loan-type roster correction captured:** `/loans/conventional`, `/loans/fha`, `/loans/va`, `/loans/jumbo` are canonical paths — not the SKILL.md-aspirational `/conventional-loan-austin-tx` root variants (404). NOTEBOOK_INSIGHTS updated so future rotations don't waste cycles on the 404s.
- **PSI multi-day-drain confirmed.** Mon AM + Mon PM + Tue AM all 429 on project 583797351490. FLAG_FOR_ADAM HIGH escalated: dedicated PSI key needed, or accept permanent UNVERIFIED on weekly PSI metric.
- **Methodology lessons:** (1) Polling for Netlify deploy via `until grep` requires a marker UNIQUE to the new content — first poll matched og:description's pre-existing "24-hour pre-approval" and exited early; re-polled with "Williamson Counties" (added phrase only in DPA edit) and got accurate signal. (2) OG ↔ meta description intra-page consistency check is a free win on meta rewrites — match og:description text when possible.
- **Re-Verify Gate:** 7 carry claims, all STILL OK or STILL OPEN with no false regressions, 0 new auto-resolutions. NotebookLM script 32nd consecutive missing.
- **Hard constraints intact.** 2 file edits, 0 issues. Working-tree carries preserved untouched (style.css, sibling-task log files).

---

## 2026-05-11 PM — daily-opt Monday PM (styer-site-daily, no-rotation drift sweep)

- **PM same-day re-fire, no-rotation pattern.** Followed Sunday PM 2026-05-10 precedent: 0 site HTML/CSS/JS edits, 0 loanos-clone edits. Always-on checks (sitemap, conversion tracking, re-verify carries) + PSI retry + backlog sweep.
- **Conversion tracking 10/10 (PM).** Switched canonical Netlify-fn grep token from hyphen-form `netlify-lead-intake` (AM label, doesn't appear literally in HTML) to slash-form `/.netlify/functions/lead-intake` (actual served token). All critical tokens hold parity vs AM and Sunday PM.
- **PSI 429 confirmed all day Monday.** AM and PM both blocked. Pattern now: daily-drained, not "refreshes Mondays". No new escalation (AM already HIGH-flagged).
- **Re-Verify Gate: 11 claims, 9 STILL OK, 3 STILL OPEN (Adam decisions), 1 STILL UNVERIFIED (about.html review counts), 2 methodology learnings.** Methodology fixes: (1) canonical Netlify-fn token is slash-form not hyphen; (2) `/how-to-buy-a-house-in-austin-tx` lives at root path, NOT under `/blog/` — `/blog/`-prefixed URL produces a 404 false-regression. Both captured in NOTEBOOK_INSIGHTS.
- **NotebookLM script 31st consecutive missing.** Retirement diff still queued in FLAG_FOR_ADAM HIGH from 2026-04-26 AM.
- **No site HTML/CSS/JS modifications this run.** Self-review PASS. Hard constraints intact (GTM untouched, form field names untouched, no nav changes, no "Styer Team" copy, no raw 1003 in new content).

---

## 2026-05-11 — daily-opt Monday (styer-site-daily, full rotation)

- **Step 4 Monday rotation complete.** Schema audit on homepage + DSCR + Manor — all rotation targets clean and full template coverage intact. AEO entity check passes: Person + LocalBusiness/MortgageBroker present on homepage + about pages; first 150 words of homepage answer "Who is the best mortgage broker in Austin TX?" via H1 + P1 (15w concise) + P6 (57w entity-rich).
- **PSI quota 429 on Monday AM** — drained before this run fired (recurring-issue pattern, 2nd consecutive Monday). Surfaced HIGH FLAG_FOR_ADAM: provision dedicated PSI API key OR accept UNVERIFIED weekly.
- **Manor R2 dropped from active sanity table** — 24h+ post-deploy, propagation clean (4 funnel CTAs, DVISD:3/MISD:1, FAQ 5q intact).
- **Re-Verify Gate: 13 claims, 1 auto-resolved.** SMS opt-in backlog L79 was a stale duplicate of completed L107 (commit `6fb8883`, 2026-04-06) — struck through with cleanup note after live-verifying `sms_opt_in` attr on 25/25 suburb files. Working-tree edit in `loanos-clone/tasks/seo-sem/backlog.md` (not pushed; markdown-only bookkeeping).
- **Methodology insight:** `grep -E "a\|b"` is literal-pipe, NOT alternation. Today's first conversion-trace returned 0 for `consent\|TCPA` and `netlify-lead-intake`; re-running with `grep -E "a|b"` (no backslash) returned the expected 9 and 1. Defensive pattern captured in NOTEBOOK_INSIGHTS.
- **Conversion tracking 9/10** — all critical tokens hold parity. Sitemap 200, lastmod 2026-05-10 (Adam's Manor R2 still freshest).
- **Carries open:** NotebookLM script 30th consecutive missing; products.html 7 in-card 1003 (12th carry, Adam decision); why-home-prices-arent-crashing CTA structure (12th carry, deferred); about.html 91/45 breakdown UNVERIFIED:2026-05-08; Smithville/Elgin/Florence/Jarrell USDA cleanup; style.css working-tree change preserved untouched.
- **No site HTML/CSS/JS modifications this run.** Self-review PASS. Hard constraints intact.

---

## 2026-05-11 — Competitive Week 10 (styer-competitive-weekly task)

- **Tracked top-10 keywords jumped 2 → 4.** Hutto held #2, Leander held #6, **Pflugerville NEW #4**, **Kyle NEW #8**. Both new entries appeared on first SERP rotation measurement — indicating ranking pre-dates measurement.
- **Re-Verify Gate:** Processed 14 prior claims. Held: Hutto #2, Leander #6, Round Rock not-found, BoA #1, AustinHomeLoans #1 home loan, SouthStar #1 refi, Lone Star #1 Round Rock, ATX 0 suburb pages, Big Life template gap. Cleared/reversed: Joel Richardson reclaimed #1 cash-out (Arnaiz demoted #1→#3); Arnaiz also demoted on refi #2→#3; MortgageAustin reclaims #1 on mortgage-qualified pre-approval query.
- **ATX Mortgage Lending sitemap audit:** Fetched live `atxmortgagelending.com/sitemap.xml` — 0/61 URLs contain dedicated suburb pages. First-mover advantage preserved at least through 2026-05-25 recheck.
- **Competitor spotlight — Geneva Financial:** New #1 Pflugerville with **Arizona address** (180 S. Arizona Ave, Chandler AZ 85225) listed as the "Pflugerville branch." No FAQPage/AggregateRating schema, no local references, no Pflugerville ISD mentions. Highest overtake opportunity surfaced this run.
- **Highlander Mortgage NEW #1** for "mortgage broker austin tx" (was #2; Yelp demoted to #2).
- **Master log appended** at `/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md`.
- **NotebookLM CLI auth expired (NEW BLOCKER):** Step 6 push to SEO notebook + Styer Growth Log notebook failed with "Authentication expired or invalid." `notebooklm login` required. Master log entry persisted on disk but NOT pushed to remote.
- **No site edits** — research-only task per SKILL.md rules.

---

## 2026-05-10 — Manor suburb page Round 2 (suburb editor task)

- **`manor-mortgage-lender.html`** — Round 2 deepening (slot 9 of 13).
- **Median refreshed:** Round 1 had $355K Nov 2025 (+6.6% YoY) → **$340K Mar 2026 Redfin (-5.7% YoY)**, 98 days on market vs 91 prior year. Sharp negative flip; market has cooled, not appreciated.
- **CRITICAL school-district correction surfaced — Whisper Valley = Del Valle ISD, NOT Manor ISD.** Round 1 implied all four named neighborhoods sit in Manor ISD. Reality per Whisper Valley + Spectrum News: Whisper Valley feeds **Gilbert Elementary → Dailey Middle → Del Valle High School** today; DVISD has purchased two sites inside Whisper Valley (78.1 ac high school + 71.1 ac elementary/middle); **new in-community DVISD high school opens for 2026-27 school year**. This is a buyer-decision-grade fact (property tax math, school ratings, resale story all change) — promoted to AEO opener + dedicated FAQ Q + LocalBusiness schema description + Schools H3 + Neighborhoods section.
- **Manor ISD has 4 high schools, not 1** (Round 1 implied Manor HS only). New Schools H3 breaks them out: **Manor HS** (default zoned, GreatSchools 2/10, ~2,422 students), **Manor New Tech** (lottery, **GreatSchools 4/10**, project-based), **Manor Early College** (lottery, ACC partnership), **Manor Senior HS** (jr/sr-only Career &amp; Tech, ~1K-1.2K students, walking distance from Mustang Valley).
- **FAQ schema fully reworked:**
  - "What is the average home price" → "What is the median home price" w/ refreshed Mar 2026 Redfin + 5 builder/neighborhood price callouts.
  - **"How does Manor compare to Pflugerville" Q swapped for "Will my Manor home be zoned to Manor ISD or Del Valle ISD?" Q** — biggest 78653 buyer concern, anchors the DVISD callout.
  - "First-time buyer programs" rewritten with **2026 FHA Travis County limit $571,550** (Round 1 had stale $524,225) + TSAHC 2025 income ceiling $167,250 non-targeted / $187,320 targeted.
  - "Tesla Gigafactory impacted" → "How is Tesla's Gigafactory affecting Manor housing in 2026?" — rewritten with current Tesla headcount **16,506 EOY 2025 (down 22%)** + early-2026 ~22% additional cut announcement (KXAN, TechBuzz). Round 1's 22,777 figure (Electrek April 2024) was 18 months stale.
  - "Property tax rate" rewritten with **median 1.69% per Ownwell** (Round 1 had 2.27% which is actually the 75th percentile) + Manor ISD $1.0814 held + Travis County FY26 $0.375845 + **Manor ISD $385M Bond 2025 FAILED Nov 4, 2025** + Whisper Valley PID $1,480-$2,004/yr replacing City of Austin ad valorem.
- **3 NEW neighborhood spotlights** beyond Round 1's 4:
  - **Lagos (78653 — Manor ISD)** — 1104 S. San Marcos, Ashton Woods primary + Pulte/Tri Pointe/Milestone, mid-$300s to high-$400s, on-site Lagos Elementary.
  - **Mustang Valley (78653 — Manor ISD)** — KB Home, 90 SFH planned, **$299,995–$345,000 starting** (BusinessWire grand opening 2024), walking distance to Manor Senior HS — one of few sub-$300K-floor new-construction options in Travis County.
  - **Manor acreage (78653)** — Outside the master-planneds: 14815 Johnson Road Trail $700K/2.57 ac; 20217 Engelmann Ln $725K/40 ac; **median list $847,450 — above 2026 Texas conforming line $832,750**, jumbo callout.
- **Existing 4 neighborhoods deepened:**
  - **ShadowGlen** — Builder roster updated: **Meritage now lead** of new ~690-home expansion phase (Round 1 had Terrata/Perry/Meritage/LGI as equal); Terrata starting $439,900; ShadowGlen Golf Club address (12801 Lexington Street, 7,174-yard 18-hole) + 4-acre water park + 202 acres Wilberger Creek trails added.
  - **Whisper Valley** — Builder roster expanded from 2 to 7 (added GFO Home, Terrata, CastleRock, AHA Dream Homes, Thurman Homes); 2,065 → **2,066 acres** correction; **$1,480.46–$2,003.66/year PID** by lot size + **$55–$70/month EcoSmart geothermal ESS fee** disclosed; **DVISD school-zoning callout** (the big one).
  - **Carillon** — **$25,000 builder flex cash** promo (March 22 → Dec 31 2026 contracts, close by Jan 31 2027) added; M/I Homes added as second active builder; full amenity-center inventory.
  - **Presidential Meadows** — **1,670 SFH at full build-out** (Jome) added; transitioning from new construction to resale.
- **Loan tiles fully de-templated** (Round 1 left FHA/Conventional/VA/DPA tiles as 1-page orphans of templated language):
  - **FHA tile** — $571,550 Travis County 2026 limit (Round 1 had $524,225 stale) + Manor-specific gift-fund/DTI math.
  - **Conventional tile** — 2026 $832,750 conforming limit + acreage-jumbo callout for the $847K median list.
  - **VA tile DE-TEMPLATED** (was generic boilerplate) — Manor-specific framing: $340K median + 1.69% effective tax stretching VA budgets, **100% disabled-veteran homestead exemption ~$5,750/year erased** at Manor's median, Camp Mabry ~25min + JBSA via I-35 commute, Whisper Valley exemption-only-on-ad-valorem caveat (PID + ESS still apply).
  - **TSAHC/TDHCA tile** — 2025 $167,250 / $187,320 income limits added; $340K-under-TDHCA-purchase-ceiling math.
- **Major Employers H3 EXPANDED:**
  - **OPmobility (formerly Plastic Omnium)** — corrected "Plastic Omnium" → "OPmobility" rebrand; updated from "350K sqft / 800 jobs" announced specs to current operational status: **inaugurated April 2024, 400+ employees by 2025, 800-job announced ceiling** (OPmobility press release).
  - **NEW: Mustang Crossing** — 127-acre, 6-building, **1.2M-sqft Class A industrial park** at 13754 Gregg Manor Rd by Ryan Companies + DWS Group; Phase 1 (4 buildings, ~$59M) under construction since Dec 2024 finishing March 2026; Building 1 came online with 291,200 sqft available Feb 2026 (Urbanize Austin, Commercial Property Executive).
  - **NEW: Manor Crossing retail** — 18-acre 150,000-sqft retail at US-290 + FM 973, full center 2026; **H-E-B opened late 2025**; tenants include TJ Maxx, Burlington, Planet Fitness, Five Below, James Avery, McAlister's, Mattress Firm, Tropical Smoothie, Tomlinson's Feed (KVUE, The Retail Connection) — the long-missing local-amenity stack.
  - **Samsung Taylor** — updated mass-production target to **early 2027** (delayed); risk production 2026 SF2/SF3P at 50K WSPM (Tom's Hardware); ~1,000 SAS employees relocating into Taylor offices over next two quarters; 10K-job full build-out target.
  - **Tesla** — corrected from 22,777 (Electrek April 2024) to **16,506 EOY 2025** with 2026 layoffs underway flag.
- **NEW dedicated H3 — Manor Property Tax &amp; Closing Costs:** Full cited stack (Manor ISD $1.0814 + Travis County $0.375845 + ESD 12 + City of Manor); median 1.69% effective per Ownwell with explicit MUD/PID overlay disclosure for Whisper Valley + ShadowGlen (75th-90th percentile 2.24%-2.52%); Whisper Valley PID $1,480-$2,004/yr + ESS $55-$70/mo line-item; itemized 6-line closing-cost example at $340K w/ 5% down ($323K loan): **$6,300-$8,800 total** + jumbo 6-12mo PITI reserve callout for acreage; Whisper Valley PID-into-DTI warning ($123-$167/mo effective payment add).
- **Templated paragraphs removed:**
  - Process intro "Manor's new construction market moves fast. Builders release lots on a schedule..." (verbatim shared with Hutto pre-edit) → rewritten Manor-specific with the 3 active builder incentives (Carillon $25K flex, Whisper Valley 4.99% buydown, Mustang Valley sub-$300K floor).
  - **AEO opener** — generic "sub-$400K + sub-$5K out of pocket" pitch replaced with school-district-line lede (the actual Manor differentiator nobody else surfaces).
- **Schema updates:**
  - LocalBusiness `description` rewritten with 78653 + 6 named neighborhoods (4 Manor ISD + 1 DVISD + acreage tier) + full tax stack + median + DPA programs.
  - WebPage `dateModified` 2026-04-27 → 2026-05-10.
  - Meta description rewritten with median + MISD/DVISD school-zoning split + FHA $571,550 limit.
- **Validation:** All 4 JSON-LD blocks (LocalBusiness/FAQPage/BreadcrumbList/WebPage) parse cleanly via `python3 json.loads`.
- **Sitemap lastmod bumped:** 2026-04-28 → 2026-05-10.
- **23 inline source URLs** (Round 1 had 7).

## 2026-05-09 — Liberty Hill suburb page Round 2 (suburb editor task)

- **`liberty-hill-mortgage-lender.html`** — Round 2 deepening (slot 8 of 13).
- **Median refreshed:** Feb 2026 $485K (-6.3% YoY) → **$510K Mar 2026 Redfin (+11.0% YoY)** — sharp positive flip; $/sqft $229 (+14.5% YoY). Closed sales **+45% YoY April 2026** (Community Impact, April 2026).
- **Inventory: 8.0 months of supply** (424 active listings on Feb 2026 sales pace per Neuhaus Realty Group / Unlock MLS) — **strongest buyer's market across the entire 13-suburb queue this round.** Above the 6-mo balanced-market line.
- **CRITICAL — LHISD rezoning surfaced (Crestline/MorningStar/Star Ranch pattern):** Round 1 said "Liberty Hill ISD covers the entire city" with no zoning detail. Reality per Community Impact Feb 2026: LHISD board adopted new 2026-27 attendance zones on Feb. 16, 2026, using **US-183 as a clean east–west divider** for high schools. Homes **west of US-183** feed Liberty Hill MS → Liberty Hill HS. Homes **east of US-183** feed either Legacy Ranch MS (between US-183 and Ronald Reagan Blvd) or Santa Rita MS (east of Ronald Reagan Blvd) — both feed the new Legacy Ranch HS. Two new elementaries opening: Lariat Trails (fall 2026), Saddleback (fall 2027).
- **Legacy Ranch HS opens fall 2026** — 454,000-sqft campus, 1,000–1,200 student capacity, adding one grade per year (Joeris General Contractors, KXAN). Round 1 had this as "planned" — now imminent and zone-driving.
- **FAQ schema swapped:** "What school district serves Liberty Hill" Q (templated/generic) → **"Will my Liberty Hill home be zoned to Liberty Hill HS or the new Legacy Ranch HS?"** — biggest current buyer concern given rezoning. Schema and accordion synced verbatim.
- **Santa Rita Ranch correction:** Round 1 listed Pulte (primary) + Perry + Highland builders. Reality: also includes **GFO Home + Scott Felder Homes** as active builders. **Saddleback at Santa Rita Ranch starts $349,900** (Pulte); main sections from $380,990. **Paddock Amenity Center opens Summer 2026** as new Saddleback Village centerpiece. Sources: GFO Home, Scott Felder, Pulte, NewHomeSource.
- **Northgate Ranch deepened:** acreage-style luxury community **started in 2019**, located ~2 miles north of SH-29 off CR 214; **acre-plus lots**, **3,000–5,000 sqft homes**; Liberty Porch Community Pavilion (no community pool); upper-tier custom builds routinely cross the $832,750 jumbo line. Source: Austin Real Estate Homes Blog.
- **Orchard Ridge refreshed with current pricing:** Pacesetter Homes primary at **$450,000–$534,900** on plans 1,699–2,557 sqft. Other active builders Lennar, Ashton Woods, Dream Finders, Buffington. Sources: Pacesetter Homes Texas, Freehold Communities.
- **Schools H3 expanded** — Liberty Hill HS 7/10 GreatSchools (98% grad vs 90% TX state); Legacy Ranch HS new 454K-sqft campus; **Rancho Sienna Elementary 9/10 GreatSchools** (top-rated LHISD elementary, 751 Bonnet Blvd); LHISD 8 campuses serving ~7,869 students (SchoolDigger); LHISD address-zone-finder linked.
- **Major Employers H3 EXPANDED** — Two anchor retailers just landed:
  - **Costco DEBUTED March 11, 2026** — 160,000-sqft warehouse + gas station on Hwy 183, **chain's 45th Texas location**, first Costco between Cedar Park (~17 mi) and Hill Country (Community Impact, Mar 2026). Round 1 had this as "$75M Costco under construction" — now LIVE.
  - **Target — fall 2026 opening** at 351 US-183, $22M, 148,000 sqft + 50,000 sqft attached commercial + ~10 outparcels (Liberty Hill Independent).
  - **Platform 183 x 29** — 120-acre mixed-use at 10728 W. SH-29, **Phase 1 (3 buildings, 48,000 sqft) DELIVERED**; full buildout could reach 1.3M sqft industrial + 325 multifamily + 175,000 sqft retail (Williamson County EDP). Round 1 had this as "set to deliver more than 1 million square feet" with no phase-1 detail.
  - LHISD ~600 employees (Liberty Hill EDC); Samsung Taylor / Apple Parmer / Dell Round Rock / Tesla all in commuter range.
- **Property Tax & Closing Costs promoted to dedicated H3** with full cited stack: LHISD $1.2389 + City of Liberty Hill $0.469407 + **Williamson County $0.413776 FY 2025-26 (voter-approval rate, +8.82%)** per WilCo CivicAlerts AID=665. ~$2.12/$100 nominal / 2.0%–2.4% effective. Itemized 6-line closing-cost example at $510K w/ 5% down ($484,500 loan): $11K-$13.5K + jumbo 6-12mo PITI reserve callout for Northgate Ranch + upper-tier Santa Rita Ranch. **8.0-mo-supply seller-concessions leverage callout** with rate-buy-down vs. closing-cost-credit vs. cash-back framing.
- **VA tile de-templated** (was verbatim w/ manor-mortgage-lender.html): Camp Mabry 35 min south + **100% disabled-veteran homestead exemption math = $10,400–$12,250/yr at Liberty Hill's 2.0%–2.4% effective on $510K** + LHISD east/west US-183 split callout for vet families.
- **One-Time Close Construction tile de-templated** (was verbatim w/ dripping-springs-mortgage-lender.html): SH-29 + FM-1869 + Northgate Ranch acre-plus lots specific + 9-12 month build window rate-lock + well/septic/distance items framing.
- **Meta description rewritten** with median + 8.0-mo supply + 3 named neighborhoods + LHISD rezoning hook.
- **LocalBusiness schema description rewritten** with 78642 + 3 named neighborhoods + full tax stack + 8.0-mo supply + Mar 2026 median.
- **WebPage dateModified bumped 04-26 → 05-09.** All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads.
- **Sitemap lastmod bumped 04-22 → 05-09.**
- **Templated phrase audit:** VA tile and construction tile both removed from liberty-hill (each was a 2-page duplicate with manor and dripping-springs respectively); both now appear on only 1 other page each — flagged as targets for those pages' Round 2 slots.
- **18 unique source URLs** inline (Redfin 78642, Neuhaus, Community Impact ×4, Pulte ×2, GFO Home, Scott Felder, NewHomeSource, Austin RE Homes Blog, Northgate Ranch, Pacesetter Homes Texas, Freehold Communities, GreatSchools, SchoolDigger, Joeris, KXAN, LHISD Zone-Finder, Williamson County FY25-26 Budget, Williamson County EDP, Liberty Hill Independent, Liberty Hill EDC).
- **Round 2 advances to slot 9 (Manor) next** on 2026-05-10. Manor's VA tile is now a 1-page orphan and is the obvious target to de-template next.

## 2026-05-08 — Hutto suburb page Round 2 (suburb editor task)

- **`hutto-mortgage-lender.html`** — Round 2 deepening (slot 7 of 13).
- Median refreshed: Feb $340K (-9.3% YoY) → **$366,166 Mar 2026 Redfin (+1.1% YoY)** sharp flip from negative; $/sqft $170 (-7.6% YoY); 3.9 mo supply Apr 2026 (Neuhaus Realty Group).
- **Star Ranch correction (Crestline/MorningStar pattern):** Round 1 said "Clark Wilson Builder is sold out" with HISD-only feeders. Reality: 1,000-acre golf community building since 2003, 7 active/recent builders (Meritage, Perry, KB Home, Wilshire, Pacesetter, Streetman, Clark Wilson) + Villas at Star Ranch + condos/townhomes/SFRs, 1,402–4,150 sqft, $250K–$400K range. **Critical school-zoning correction: community straddles Gattis School Road — homes north feed HISD (Kerley/Hutto MS/Hutto HS); homes south feed Pflugerville ISD.** Source: Star Ranch Real Estate, Pacesetter, Zillow.
- 2 new neighborhood spotlights added:
  - **Brooklands (78634)** — 203 Pinkerton Drive, master-planned, multi-builder: CastleRock from $295,990 (active), Gray Point Homes, Pacesetter Homes; Chesmar sold out. 1,297–2,730 sqft, 0.1–0.2 acre lots. Sources: Jome master-planned profile, CastleRock at NewHomeSource.
  - **Lookout at Brushy Creek (78634)** — premier custom community SE Hutto on 1–8 acre lots near FM 1660 + Brushy Creek; lake-fronted; ~3,300 sqft avg; built 1999–2008 with sporadic infill custom. Upper tier crosses 2026 conforming line $832,750 → jumbo callout. Sources: Bramlett Partners, Austin Real Estate Homes Blog.
- Riverwalk refreshed: 12-month median $379,154 (+4% YoY), D.R. Horton + Continental + Centex builders, started 2006, 1,295–2,999 sqft, 0.13–0.35 ac lots.
- Emory Crossing updated: Yardly Emory Crossing Taylor Morrison "Coming Soon" + David Weekley townhomes "next phase coming soon" (sources: Taylor Morrison, David Weekley News, Jome).
- 2 new H3 sections (~110 lines):
  - **Hutto Schools** — Hutto HS 6/10 GreatSchools, B- Niche, 2,133 students, 16:1 student-teacher, 73% minority, 40% econ disadvantaged, 94% grad rate, 32% AP, PLTW + GT, ranked 1,104th TX. HISD 10,035 students PK-12 / 11 schools. **$522M bond approved 2023 zero-tax-rate-increase.** PISD-zoning callout for Star Ranch south-of-Gattis.
  - **Hutto Major Employers EXPANDED** — Samsung Taylor $17B fab targeting 1,500 perm employees by EOY 2026 + 2nm risk production at 50K WSPM + 1,500+ ASML/Lam/KLA engineers during ramp; **Hutto Megasite 1,400 acres / $18M spine road complete** unlocking PowerCampus by Skybox+Prologis (600MW, up to 6 buildings, 3.9M sqft, **$10B+ minimum capital investment**) + Project Strat3 by Live Oak+Riverside (52-acre Samsung supply chain) + Project Flex by Headwater (242K sqft, 3 shallow-bay buildings) + Hutto Mega TechCenter by Titan (188 acres / 2M sqft); Tesla 35K sqft service/distribution; HISD 10,035 students; H-E-B Plus #696 at 5000 Gattis School Rd.
- Property Tax & Closing Costs promoted from buried paragraph to dedicated H3 section: full cited stack HISD $1.2052 + City of Hutto $0.385928 FY 2025-26 + WilCo $0.413776 FY 2025-26 (+3.4%) ≈ $2.005 nominal / 1.93%–2.00% effective per Ownwell. 6-line itemized closing-cost example at $366K w/ 5% down ($347,858 loan): $8.5K-$10.5K + jumbo 6-12mo PITI reserve callout. **3.9-mo-supply seller-concessions leverage callout** (didn't exist when supply was 1.6 mo a year ago).
- FAQ schema rewritten: "What is the average home price" → "What is the median home price" (Mar 2026 + builder corrections + Gattis School Road note); "How does new construction financing work" rewritten Hutto-specific (removed inaccurate "Lennar active" claim from Round 1 — current research shows CastleRock/Gray Point/Pacesetter active, not Lennar); "What first-time buyer programs are available" rewritten with WilCo income limits $99K-$118K + $12,810 FHA-3.5% math; **"How does Hutto compare to Round Rock" Q swapped for "What is the property tax rate" Q** (biggest Hutto buyer concern). FAQ accordion fully synced verbatim.
- VA tile de-templated: was generic "Hutto's growing veteran population" → Camp Mabry 30 min SW + Joint Base San Antonio 75 min S + **100% disabled-veteran homestead exemption math: ~$7,300/year at 1.93%-2.00% effective on $366K median**.
- DPA tile de-templated: WilCo income limits $99K-$118K + cooler 3.9-mo-supply market = seller-concessions stack on top of DPA.
- LocalBusiness schema description rewritten with 78634 + 5 named neighborhoods + full tax stack.
- WebPage dateModified bumped 04-25 → 05-08. Meta description rewritten with median + 5 neighborhoods.
- All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads.
- Sitemap lastmod bumped 04-19 → 05-08.
- 22 unique source URLs across the page.

## 2026-05-08 — Weekly blog editor refresh

- **Refreshed `blog/2026-04-04-austin-housing-market-report-april-2026.html`** — highest-leverage CTR target from GSC 2026-04-18 export: 7,249 impressions / 5 clicks (0.07% CTR) at position 4.05.
- Title rewrite: `Austin Housing Market Report — April 2026 | Adam Styer | NMLS #513013` → `Austin Housing Market: 16K+ Listings, $445K Median, 6.37% Rates | Adam Styer`. Concrete-number CTR hook; 76 chars.
- Meta description rewrite to lead with verified April 2026 numbers + LO voice.
- Body data corrections (with inline source citations):
  - Median sale price: vague `$412–$425K` → **$445,000** (Apr 2026, Unlock MLS / ABoR)
  - Active listings: `10,000+` → **16,064** (late Apr 2026)
  - 30-year rate: `mid-to-upper 6%` → **6.37%** (Freddie Mac PMMS, week ending May 7, 2026)
  - DOM: `55–70 days` → **~82 days**
  - Sold-to-list ratio added (97.5%); price-reduction share added (48.5%)
  - YTD closed sales (+5.2% YoY, 9,311 cumulative through April) added
- Author bar updated: "Published April 4, 2026 · Updated May 8, 2026 with end-of-April MLS data and current PMMS rates".
- Hero subtitle rewritten to lead with concrete data instead of "tariff shock" framing.
- Table refreshed: 6 metrics × YoY columns + inline sources footnote (Unlock MLS, Freddie Mac PMMS).
- FAQPage JSON-LD schema fully rewritten (6 Q&As) to match new data; visible accordion FAQ rewritten to match schema verbatim with inline source links.
- CTA tightened: "See What You Can Afford in April's Market" → "Real Numbers at Today's 6.37%"; sub-CTA in body rewritten to reference 6.37%.
- Schema `dateModified` bumped 2026-04-04 → 2026-05-08; sitemap.xml `lastmod` bumped to match.
- URL slug + H1 preserved to protect existing page-1 ranking.
- Title lint passed (`grep "<title>" blog/*.html | grep -v "Adam Styer"` returns empty).
- Queued for GSC URL Inspection in `run-logs/gsc-reindex-queue.md`.
- Editor queue updated; logged a follow-up note that monthly-series cadence may need a NEEDS ADAM decision (April post stays canonical until/unless a May entry is created).

Sources cited inline in the post:
- [Unlock MLS / ABoR Q1 2026 Central Texas Housing Report](https://www.unlockmls.com/news/march-q1-2026-central-texas-housing-report)
- [Freddie Mac PMMS](https://www.freddiemac.com/pmms)

---

## 2026-05-07 PM — daily-opt same-day re-run (no edits)

- Sitemap 200 ✅, all 4 funnel pages 200, conversion tracking marker counts unchanged from AM (11/7/4/13).
- Re-verified AM products.html commit (`cf905c9`) is still propagated on Netlify — line 236 hero + line 867 bottom both `/get-preapproved`, no drift.
- Re-Verify Gate run on 9 persistent claims; 5 STILL OK, 4 STILL OPEN with no drift since AM (USDA on how-to-buy live=5/local=5, blog cadence Day 10, NotebookLM script 23rd missing, style.css working-tree pre-existing change).
- Zero file modifications this run — correct outcome since AM rotation already completed all actionable ZERO/LOW-RISK items. Backlog has nothing else pickable; remaining open items are Adam-decision MEDIUM/HIGH.
- TOMORROW_PRIORITY (Friday Content Planning + AEO Review) re-asserted from AM run unchanged.

## 2026-05-07 — Buda Round 2 deepened (suburb-editor — slot 6/13)

- **Median confirmed $382,337 Feb 2026 Houzeo (-0.21% YoY)** + rolling 30-day ~$339K April 2026 Orchard (-11.3% YoY); **months of supply 5.1 (April 2026) up from 2.7 a year ago — strongest buyer-leverage shift since Pflugerville**. Buda is cooling faster than the Hays metro average.
- **Sunfield builder roster correction (5 → 7 active builders)**: Round 1 listed Taylor Morrison, Pulte, Chesmar, David Weekley, Brightland. Per [official Sunfield builder roster](https://www.sunfieldtexas.com/builders/) + [Jome MPC profile](https://jome.com/master-planned-community/tx/309-sunfield), 7 builders are currently active: Taylor Morrison, Pulte Homes, Chesmar Homes, Centex, **CastleRock Communities (added)**, David Weekley Homes, **DRB Homes (added)**. Brightland presence unconfirmed in current roster — removed pending verification.
- **Garlic Creek correction (2 → 3 builders)**: Round 1 had Centex + Mercedes Homes 2007–2015. Per [Austin Real Estate Homes Blog](https://www.austinrealestatehomesblog.com/buda/garlic_creek/), **Meritage Homes finished build-out in 2016** — 3 builders, build years 2007–2016. Avg sale price $303K (1,494–3,404 sqft, 2,469 sqft avg).
- **Ruby Ranch correction**: Round 1 had vague "larger lots, lower density"; replaced with **1–7 acre custom homesites** + Seven Custom Homes builder cite + 2,000–5,000 sqft + $500K–$900K+ range with jumbo-line callout for the upper tier crossing $832,750.
- **VA tile de-templated** ("I-35 military commuter corridor" → Camp Mabry ~25 min north + Camp Swift ~50 min east + 100% disabled-veteran exemption stack at Buda's 1.91% effective rate).
- **DPA tile de-templated** (generic "TSAHC and TDHCA programs offer grants" → Hays County-specific income limits ~$99K–$118K + FHA + DPA stack framing for the cooler 5.1-mo-supply market).
- **2 new H3 sections**:
  - **Major Employers EXPANDED** — Texas Lehigh Cement HQ in Buda since 1986 (201–500 employees per LinkedIn); Heaven Hill / Deep Eddy Vodka **Buda is sole distilling and bottling operation** (production consolidated 2017 per The Spirits Business; Dripping Springs tasting-room closure April 2026 explicitly does NOT affect Buda staffing/output); US Foods I-35 distribution (Buda EDC); Cabela's flagship retail (only Austin-metro location); **H-E-B incoming on long-vacant landfill site** I-35 southbound access road north of Main, **$12.1M city/EDC reimbursement** (~two-thirds of $30M remediation cost) over 30 years per [Community Impact Mar 11 2026](https://communityimpact.com/austin/san-marcos-buda-kyle/development/2026/03/11/long-vacant-buda-landfill-could-get-new-life-with-h-e-b/) + [CBS Austin](https://cbsaustin.com/news/local/h-e-b-scores-20m-partnership-incentive-to-turn-buda-landfill-site-into-new-store), 50+ FTE jobs within a year of opening; Tesla Gigafactory ~20–25 min via I-35; HCISD largest public-sector.
  - **Property Tax & Closing Costs** — 4 cited rate sources (Ballard Property Tax Protest + Community Impact HCISD + Community Impact city + Hays County Truth in Taxation + Ownwell trends); itemized 6-line closing-cost example at $382K with 5% down ($362,900 loan): $9K–$10.5K range; 5.1-mo-supply seller-concessions leverage callout + jumbo 6–12mo PITI reserve callout for Ruby Ranch upper-tier.
- **Schools H3 expanded** — Jack C Hays HS 6/10 GreatSchools + 92% grad rate (US News) + math 58% / reading 54% proficiency + ranked #2,142 of 8,096 TX public schools (top 30%, Public School Review); **Eric Dahlstrom Middle School** (first appearance on this page) above-district-average 67% math / 71% reading per GreatSchools; Sunfield Elementary 3/5 SchoolDigger + average GreatSchools (in-MPC walk-to-school benefit framed).
- **FAQ schema swap** — "How does living near the Tesla Gigafactory affect Buda home values?" → "What is the property tax rate in Buda TX?" (biggest Buda buyer concern; matches the property-tax-Q swap pattern from Pflugerville Round 2).
- **FAQ schema rewrites** — "What are home prices like" → "What is the median home price" with refreshed median + months-of-supply signal; "What new home builders" rewritten with corrected 7-builder Sunfield roster + Garlic Creek 3-builder build years; FAQ schema + accordion fully synced verbatim.
- **At-a-glance updated** with 1.91% effective rate (cited "lowest in Hays County" framing) + median + months-of-supply + Texas Lehigh HQ + Heaven Hill sole-operation framing + H-E-B 50 FTE callout.
- **WebPage dateModified** bumped 2026-04-24 → 2026-05-07. Meta description rewritten with median + 7-builder Sunfield + Ruby Ranch acreage + tax stack.
- **All 4 JSON-LD blocks** (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via `python json.loads`. Sitemap lastmod bumped 2026-04-20 → 2026-05-07. **33 unique source URLs.**
- Round 2 advances to slot 7 (Hutto) next.

## 2026-05-07 AM — daily-opt Thursday rotation (Internal Linking + Funnel Flow)

- **products.html funnel-CTA swap on the loan programs hub.** Same pattern Adam accepted on 4 cluster pages 2026-05-06; the parent hub was missed. Hero CTA (line 228) + bottom "Start Your Pre-Approval" CTA (line 859) swapped from raw 1003 URL → `/get-preapproved`. Removed `target="_blank"` + `rel="noopener"` on the internal hero link per the 2026-05-06 internal-link learning.
- **Programmatic funnel trace verified end-to-end** via curl + grep — no Chrome MCP dependency. Homepage (4 links to /get-preapproved, GTM + dataLayer present), /get-preapproved (form attrs ✓, generate_lead+lead_type+purchase_prequal ✓, tel: ✓, TCPA ✓, trust bar ✓), /refinance-quote (generate_lead+refi_quote ✓), /thank-you (thank_you_page_view ✓, calendly ✓, tel: ✓, robots noindex ✓). Replaces the long-running "Chrome unavailable in scheduled context" carry-forward; conversion-tracking score lifts from carry-forward 10/10 to verified 9/10 (full 10/10 still requires manual form-submit).
- **Re-Verify Gate auto-resolved stale own-backlog framing.** Drafted a "20-page footer link to /prequal.html (noindexed orphan)" backlog entry, then ran the gate against the claim's premise. Result: /prequal.html is currently HTTP 200, has no `<meta name="robots">`, IS in sitemap.xml — the 2026-03-28 robots.txt Disallow entry was apparently removed during AEO crawler allowlist expansion. Corrected backlog wording in same session: it's a conversion-tracking parity gap (prequal.html shares Netlify form-name with /get-preapproved but lacks the dataLayer push) not an orphan-cleanup gap.
- **Yesterday's 3 PM cluster cross-link edits re-verified live** — all 9 new sibling links still propagated on Netlify (no drift in CDN cache).
- **Loanos-clone backlog.md updated** — completed item marked + 2 new MEDIUM/LOW follow-ups (products.html in-card CTAs + footer prequal parity). Pre-push build hit a Next.js stale-cache ENOENT on first try; clean `rm -rf .next && npm run build` then push succeeded. Logged to learnings as a recovery pattern.

## 2026-05-06 PM — daily-opt PM run: non-QM cluster internal-linking sweep

- **3 cluster pages were at 3/6 cross-cluster links** — non-qm-loans.html (the hub), bank-statement-loans.html, high-net-worth-mortgage.html. All missing the same 3 sibling pages (DSCR Texas, DSCR Fredericksburg, DSCR Dripping Springs).
- Added 3 `<li>` per page into each page's existing Related Programs / Other Programs section, matching each page's voice cadence and the existing investor-loans.html / DSCR-cluster pattern.
- All 7 non-QM cluster pages now at **6/6 cross-cluster link coverage**.
- Re-Verify Gate (PM repeat of AM): all 7 cluster CTA hrefs to /get-preapproved still propagated; Dripping Springs title still 65 chars; Leander Round 2 paragraph still live. No drift between AM and PM runs.
- Live propagation verified post-deploy via curl on all 3 modifications.
- **Surfaced for Adam:** uncommitted style.css change in working tree (header.scrolled .nav-dropdown a color rules — likely needed nav-restructure follow-up). Left untouched, flagged in run log.

## 2026-05-06 — Pflugerville Round 2 deepened (suburb-editor — slot 5/13)

- **Median confirmed $355K Mar 2026 Redfin (-10.2% YoY)**, $193/sqft (+8.7% YoY), 5 mo. supply (up from 1.6 mo. last year — strongest buyer-leverage shift in the queue).
- **LocalBusiness schema description rewritten** — 78660 + Blackhawk/Falcon Pointe/Windermere/Heatherwilde + Hendrickson 8/10 + Pflugerville HS 6/10 + full tax stack (PISD $1.1069 + City $0.5350 FY 2025-26 + Travis County + ESD 2 $0.092765 ≈ $2.04 nominal / 1.82% effective per Ownwell).
- **FAQ schema rewritten** — "What are typical home prices" → "What is the median home price" w/ Falcon Pointe Newland MPC builder roster + $500K April 2026 median list integrated; **"How is the mortgage process different" Q swapped for "What is the property tax rate"** (full cited tax stack — biggest Pflugerville buyer concern, weakest existing Q replaced).
- **2 new neighborhood spotlight H3s** added after Blackhawk:
  - Falcon Pointe (78660) — Newland Communities 1,400-acre MPC built 2002–2017, builders Lennar/Chesmar/Taylor Morrison/Meritage/Newmark/Highland, $500K Apr 2026 median list (Regent), $400s-$600s resale range, Hendrickson HS feeder.
  - Windermere & Heatherwilde combined "established 78660 value tier" — Windermere ~$326K median (Centex/Buffington/Hampton, 1,200-2,800 sqft, late 1980s-early 2000s), Heatherwilde ~$372K average (same builders, 1,200-3,200 sqft, 1986+), $279,900-$419,999 listing range. FHA-strong framing with $11,375 down on $325K.
- **Schools H3 expanded** with student counts/grad rates/SAT — Hendrickson 19201 Colorado Sand Dr 78660 (8/10, 2,106 students, 98% grad, 1170 SAT, US News) + Pflugerville HS 1301 W. Pecan St 78660 (6/10, 1,851 students, 95% grad). Resale-velocity correlation w/ school zone surfaced.
- **Major Employers H3 EXPANDED** — Amazon Project Charm 3.8M sqft fulfillment center on E. Pecan St (KVUE rezoning + PCDC $250M / 1,000 jobs), **Stone Hill Town Center** (Target/Kohl's/Best Buy anchors + Daiso 8,500 sqft + Miniso 2025 openings — Community Impact Jul 2025), Costco (185 active postings ZipRecruiter), Baylor Scott & White, Samsung Taylor 30 min east via SH-130, PISD largest public-sector employer.
- **Property Tax & Closing Costs H3** rewritten with full citations — itemized PISD $1.1069 (M&O 0.7869 + I&S 0.3200 Community Impact) + City of Pflugerville $0.5350 FY 2025-26 down from $0.5428 (Community Impact + city.gov) + Travis County ~$0.304 (Truth in Taxation) + ESD 2 $0.092765 (ESD 2 notice). $355K w/ 5% down ($337,250 loan) closing-cost breakdown — 6 itemized line items at 1.82% effective + 5 mo. supply leverage callout for seller concessions.
- **Templated paragraphs removed:**
  - "Diverse Income Types" Why-grid card (generic — "hourly, salary, gig economy, self-employed, military") swapped for **PISD School-Zone Strategy** card (Hendrickson 8/10 vs Pflugerville HS 6/10 — same price, different attendance zones depending on Wells Branch Pkwy / Pecan St boundaries).
  - **VA tile de-templated** — was verbatim w/ georgetown + leander ("Zero down for eligible veterans, active duty, and surviving spouses. No monthly PMI. A significant number of [suburb] residents have military background"); rewrote w/ Pflugerville-specific framing — Camp Mabry ~25 min south, VA-relocating families landing in Hendrickson feeders (Falcon Pointe / Blackhawk), disabled-veteran exemption stack at 1.82% effective rate.
  - **Older closing-costs paragraph block removed** — superseded by deeper Property Tax & Closing Costs H3 above (5-line `<ul>` removed).
- **Meta description rewritten** w/ median + Hendrickson rating + named neighborhoods.
- WebPage dateModified bumped 04-23 → 05-06. All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads. Sitemap lastmod bumped 04-19 → 05-06. **15 inline source URLs.**

## 2026-05-06 — Wednesday daily-opt: non-QM CTA fix + Dripping Springs title trim + Leander Round 2 (cluster gap-fixing)

- Swapped 4 non-QM cluster pages' CTAs from external 1003 (untracked) → `/get-preapproved` (tracked landing): non-qm-loans, investor-loans, dscr-loans-fredericksburg-tx, high-net-worth-mortgage. Tue eve only flagged 2/4; today's full sweep caught all 4. HNW preserved Calendly-primary (consultation-first pattern); only secondary CTAs swapped.
- Trimmed dscr-loans-dripping-springs `<title>` 90 → 65 chars (preserves "Wedding Venue STR" wedge while killing SERP-truncation risk). OG/Twitter titles untouched.
- Leander Round 2 deepening — added h3 "Emerging Communities: Bryson, Caballo Ranch & Leander Springs" + 1 paragraph (~690 chars) covering the three named gap-neighborhoods + CapMetro Red Line Leander Station commute angle. Inserted between Mason Hills and Northline spotlights.
- Updated `run-logs/gsc-reindex-queue.md` with 6 new URLs for Adam's manual GSC URL Inspection.
- Re-verify gate confirmed Tue evening's auto-resolutions still hold (about.html NAP, USDA noindex, sitemap USDA removal). Blog cadence trip now 9 days (escalates HIGH on Friday).

## 2026-05-05 — Leander Round 2 deepened (suburb-editor — slot 4/13)

- **Median refreshed $438K Feb +7.6% YoY → $411K Mar 2026 Redfin (-8.7% YoY)**, $197/sqft — sharp price flip. Steepest YoY drop across the 13-suburb queue this round.
- **WilCo rate corrected** $0.3999 → $0.413776 FY 2025-26 (3.44% increase per WilCo CivicAlerts AID=665) — current LISD + WilCo stack now $1.500676/$100.
- **Internal duplicate DPA paragraph removed**: page had verbatim "TSAHC or TDHCA programs that provide 3–5%" copy in BOTH the Why grid AND the Loan Programs grid. Loan Programs DPA tile swapped to **Jumbo & Construction tile** (Travisso Verona / gated Crystal Falls Cap Rock + Fairways + Grand Mesa cross the $832,750 Texas conforming line).
- **VA tile re-targeted** off generic veteran framing → Camp Mabry 35 mi south + 620/183A retiree migration toward LISD.
- **AEO opener rewritten** — generic "conventional + jumbo $600K+" → 78641 + Mason Hills $400K-$650K conventional 5-10% down + Travisso Verona/gated Crystal Falls jumbo wedge + industrial pivot (Tech Park, Titan 1.3M sqft, Northline).
- **5 new H3 sections (~150 lines):**
  - Travisso EXPANDED — 5 collections by lot width (Capri 50' / Siena 60' / Naples 70' / Florence 80' / Verona 100'), 9 model homes (5 Toll / 4 Taylor), Olimpico Way addresses 4901+4917 Siena, 4909+4913 Naples, final-phase 50' Capri lots flag.
  - Crystal Falls 78641 spotlight — 5,000 acres, 7 named subsections (Bluffs/Boulders/Cap Rock/Highlands/Fairways/Wild Rock/Grand Mesa), 3 gated (Cap Rock+Fairways+Grand Mesa), public 18-hole golf, mid-$200s-$1M+, Group Three Builders Grand Mesa Hill Country lots up to 7 acres.
  - Mason Hills 78641 spotlight — 1,000+ homes built on Mason Ranch grounds 2012-2014-2021, 7 builders (Toll/Highland/Pulte/Gehan/GFO/KB/Ashton Woods), Highland 2104 Cotton Farm Trail + KB 1600 Abbott Cove specific addresses, Whitestone Elementary <2 mi all LISD.
  - Northline 116-acre TOD spotlight — SH-183/San Gabriel Pkwy downtown district, 85K sqft retail Phase 1 Endeavor under construction, $4M city loan Feb 2026 + 1-acre municipal land dedication library/cultural center, Community Impact May 4 2026 tax-reimbursement structure update.
  - Leander Industrial Boom — Leander183 Commerce Center + National Aero Stands, Leander Tech Park (St. John Properties, 8 buildings 270K sqft Phase 1 2026), Titan Development 115-ac/1.3M sqft Class-A flex, EastGroup Heritage Grove 600K sqft, LISD ~6,000 employees + commute-tier Apple/Oracle/IBM Cedar Park ~15min + Dell/HP Round Rock ~20min.
- **Schools H3 expanded** — Tom Glenn HS 6/10 (2,129 students, 97% grad, 1,140 SAT — US News + GreatSchools cited) + Leander HS 6/10 (2,202 students, 96% grad, AP+IB+PLTW — Niche cited 42,593 LISD-wide enrollment) + Vista Ridge HS 8/10.
- **Closing-cost section** refreshed $438K → $411K w/ 10% down ($369,900 loan): $8K-$11.5K itemized 6 line items + jumbo $14K-$22K + 6-12mo PITI reserve callout for Verona/Cap Rock/Fairways/Grand Mesa + 8.7% YoY drop = builder buydown leverage framing.
- WebPage dateModified bumped 04-22 → 05-05. Meta description rewritten. All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads. Sitemap lastmod bumped 04-19 → 05-05. **20 inline source URLs.**

## 2026-05-05 — Tuesday rotation: Schema/AEO carry-over + 5 title/meta fixes (daily-opt)

- **Sunday's Monday-rotation TOMORROW_PRIORITY (Schema + Google Ads + AEO Entity Audit) carried into today** — Monday daily-opt slot was missed (commits 2026-05-04 are suburb-editor + competitive). Schema sweep + AEO entity audit batched with Tuesday title/meta rotation in one run since Schema/AEO portion was largely verification-class.
- **Schema sweep (3 pages):** index.html (MortgageBroker 5718 Sam Houston Circle / AggregateRating 5.0/136 / FAQPage 5Qs / Person worksFor MortgageBroker — all internally consistent), DSCR (LocalBusiness + FinancialProduct + FAQPage 6Qs + Article + BreadcrumbList), Bee Cave (LocalBusiness 78738 + FAQPage 5Qs + AggregateRating 5.0/136). All structurally valid.
- **Person + LocalBusiness consistency check:** 5718 Sam Houston Circle appears in 3 schema blocks (homepage MortgageBroker, homepage Person, about.html Person+worksFor); about.html LocalBusiness 5900 Balcones Drive Suite 100 appears in 1 — 12th-run mismatch. Recommend aligning to 5718 (3:1 weight-of-evidence). One-line edit on about.html line 123 once Adam confirms canonical address.
- **Homepage AEO entity audit:** body answer paragraph at index.html line 454 (`<p><strong>Adam Styer | Mortgage Solutions LP (NMLS #513013) is Austin's independent mortgage broker…`) is the canonical extractable answer to "Who is the best mortgage broker in Austin TX?" — present and correct.
- **Tuesday rotation: 5 over-length title/meta values batched and FIXED** (all reversible, LOW_RISK):
  - `bee-cave-mortgage-lender.html` meta 168 → 158 (reworded "Lake Travis HS 9/10" → "Lake Travis ISD" + reordered)
  - `dripping-springs-mortgage-lender.html` meta 218 → 153 (removed "21-day close" + "buyers" filler, used em-dash for community list)
  - `georgetown-mortgage-lender.html` meta 182 → 150 (consolidated zip-coverage callouts; replaced "136+ reviews" with "NMLS #513013")
  - `calculator-refinance-breakeven.html` title 78 → 59 (canonical `[Topic] | Adam Styer | NMLS #513013` convention)
  - `ftb-dpa-guide.html` title 84 → 64 (canonical convention)
- **Five borderline titles 67-68 chars deliberately skipped** — fixed-vs-adjustable, first-time-home-buyer, get-preapproved (landing page), improve-credit-score, marble-falls-mortgage-lender. All are 1-3 chars over and follow convention; trim would lose keyword density. Per 2026-04-21b learnings, FHA/Jumbo "hook-class" titles are similarly preserved at 49-56 chars even without NMLS.
- **Re-verify gate (8 claims):** 4 STILL OK (homepage AggregateRating 5.0/136, Bee Cave AggregateRating 5.0/136, DSCR FAQPage, homepage AEO body paragraph); 4 STILL OPEN carry-forwards (about.html address mismatch 12th run, /loans/usda 200 14th day, USDA cascade pending Adam, NotebookLM script missing 19th confirming check).
- **Blog cadence trip:** last post 2026-04-27 = 8 days as of today = trips 7-day cadence flag. Escalates to MEDIUM in FLAG_FOR_ADAM. Suburb deep-dive (Wednesday) can pair with topical post.
- **PageSpeed manual + GSC URL Inspection + Google Ads Optimization Score** — all UNVERIFIED (manual UI access, Adam-only). Last known scores stale 6+ weeks.
- Run log → `run-logs/2026-05-05.md` (mirrored to `latest.md`); learnings appended (5 new patterns).

## 2026-05-04 — Cedar Park deepened (Round 2 slot 3) (styer-suburb-editor-daily)

- **Median refreshed** $492K Mar 2026 → **$496K Mar 2026 Redfin (-8.0% YoY)**, $228/sqft. Round 1's $492K was slightly below Redfin's true closing-period median.
- **USDA removed from LocalBusiness schema description.** Adam doesn't originate USDA. Replaced with 78613 + named neighborhoods (Buttercup Creek, Ranch at Brushy Creek, Twin Creeks, Block House Creek, Crestline at Brushy Creek RRISD-zoned) + tax stack (WilCo $0.413776 + City of Cedar Park $0.36 FY 2025-26 + LISD $1.0869).
- **Crestline at Brushy Creek = Round Rock ISD correction surfaced (school-zoning detail, Georgetown-MorningStar-style fix).** Round 1 placed Crestline within the Twin Creeks paragraph, implying it shared LISD attendance. Per <a href="https://www.tollbrothers.com/luxury-homes-for-sale/Texas/Crestline-at-Brushy-Creek">Toll Brothers' community page</a> + <a href="https://www.globenewswire.com/news-release/2026/03/19/3259243/1924/en/Crestline-at-Brushy-Creek-by-Toll-Brothers-Now-Open-in-Cedar-Park-Texas.html">March 19, 2026 grand-opening release</a>, Crestline is zoned to **RRISD** (Sommer Elementary, Cedar Valley Middle, Round Rock High) — not Leander ISD — even though the mailing address is Cedar Park. Crestline is now its own H3 spotlight with the school-zoning correction front-and-center, plus accurate pricing (mid-$900Ks+, not the prior page's "$1.2M+"), 60-70ft homesite split (Cypress Collection 60ft / Juniper Collection 70ft), 12 home designs, 2,800-4,700+ sqft, 3-6 BR.
- **VA tile de-templated** — removed `Cedar Park's veteran community has excellent access to VA financing — zero down, no PMI, and the lowest rates of any program. If you or your spouse served in the military, this is almost always the best loan available.` (generic 4-suburb match) → replaced with Cedar Park-specific framing tied to LISD 8/10 schools + RRISD zone along Brushy Creek + Joint Base San Antonio relocation pipeline.
- **2 new body H3 sections (~30 lines):**
  - **Cedar Park Major Employers** — broken out from Round 1's inline "How Do I Buy" paragraph. Cedar Park EDC sourced anchor list (Cedar Park Regional Medical Center / ETS-Lindgren / NOV / Firefly Aerospace) plus the **Firefly Blue Ghost lunar landing March 2025 update** (first commercial company to fully soft-land on the Moon — verifiable, dated milestone, separate from the prior page's $1.1B Northrop Grumman 2024 contract framing). Apple Parmer 5,000 phase-1 → 15,000 full-buildout cited via KVUE. Dell HQ ~15 mi east.
  - **Property Tax & Closing Costs in Cedar Park** — broken out from inline closing-cost paragraph. Cited tax stack (3 inline sources: WilCo CivicAlerts FY 2025-26 + Community Impact City of Cedar Park Sept 2025 + LISD tax information) + Ownwell effective rate + refreshed closing-cost breakdown at $496K w/ 10% down ($446,400 loan): 6 itemized line items including origination/processing tier; jumbo 6-12mo PITI reserve callout for Twin Creeks / Ranch at Brushy Creek / Crestline Juniper Collection.
- **2 new neighborhood spotlights:**
  - **Crestline at Brushy Creek (78613)** — Toll Brothers, RRISD-zoned. 907 Walsh Glen Dr. Cypress vs Juniper Collection split. Mid-$900s+ from globenewswire 2026 release.
  - **Block House Creek (78613)** — established western-edge MPC. 12-mo median $340,500 ($290K-$450K range) per Homes.com. Strong FHA territory framing tied to 3.5% down on $375K = $13,125. 44-day average DOM.
- **FAQ schema** home-prices Q rewritten with Mar 2026 Redfin -8.0% YoY median + per-neighborhood price ranges; loan-programs Q de-templated to remove generic TSAHC/TDHCA boilerplate (replaced with FHA/VA/jumbo/DSCR matched to specific Cedar Park price tiers + Crestline RRISD reference).
- **FAQ accordion** home-prices + loan-programs answers synced verbatim with new schema (out-of-sync since Round 1).
- **At-a-glance updated** — full tax stack with 3 inline cited sources + RRISD-zoned Crestline flag in named-neighborhoods list + 1.86% nominal / 1.52% effective.
- **Schools H3 expanded** — added RRISD's Round Rock HS for Crestline + linked RRISD boundary tool alongside LISD's.
- **WebPage dateModified** bumped 2026-04-21 → 2026-05-04. **Meta description rewritten** with Mar 2026 median + named neighborhoods (Twin Creeks / Ranch at Brushy Creek / Crestline). **Sitemap lastmod** bumped 2026-04-15 → 2026-05-04.
- **All 4 JSON-LD blocks** (LocalBusiness/FAQPage/WebPage/BreadcrumbList) parse-validated clean via python json.loads.
- **15 inline source URLs** (Redfin Cedar Park / WilCo CivicAlerts FY2025-26 / Community Impact City Cedar Park Sept 2025 / LISD tax info / GreatSchools Cedar Park HS / GreatSchools Vista Ridge HS / LISD attendance zones / RRISD school boundaries / Toll Brothers Crestline community / globenewswire Crestline grand-opening / Homes.com Block House Creek / Cedar Park EDC / Firefly Aerospace Blue Ghost release / KVUE Apple Parmer / Ownwell WilCo Cedar Park).

## 2026-05-04 — Week 9 competitive intel (styer-competitive-weekly)

- **First Leander top-10 ranking ★** — `leander-mortgage-lender.html` (last edited 2026-04-28; FAQPage + AggregateRating schema verified on disk) appeared at **#6 for "leander tx mortgage lender"**. First top-10 ranking for Leander since tracking began. Same Hutto-playbook trajectory: deepen + schema → indexed → ranks within 1-2 SERP cycles.
- **Hutto held #2** — Big Life still #1; live audit confirms NO 2026 dates, NO neighborhoods, NO review schema visible — content gap intact.
- **Bee Cave 31 days unindexed** — `site:styermortgage.com bee cave` returns zero results. Escalated from "overdue" to "BLOCKING" — manual GSC URL Inspection only Adam can take.
- **Two new threats this week:** (a) Arnaiz Mortgage NEW #1 cash-out + #2 refi (multi-state lender NMLS #2033319, generic `/refinance/texas/austin/` template, no suburb pages, no review counts visible — pure license-footprint play); (b) ATX Mortgage Lending NEW #4 core "mortgage lender austin tx" (NMLS #2445761 very recent license; explicitly lists 9 Adam suburbs in body text — Leander/Cedar Park/Liberty Hill/Georgetown/Round Rock/Hutto/Pflugerville/Kyle/Buda — but no dedicated suburb pages yet).
- Re-verify gate auto-resolved 1 stale claim (Vista Lending dropped from "home loan austin tx" top 10) and downgraded 2 (MortgageAustin demoted #1 → #2 mortgage interp; Joel Richardson/FCM demoted #1 → #3 cash-out).
- Auto-loan SERP contamination on "get pre-approved austin tx" intensifying (3 → 5 auto results in 2 weeks).
- Top-10 hit rate 9% (1/11) → **17% (2/12)**. First positive-direction movement in 2 weeks.
- Reports written: `run-logs/competitive/2026-05-04.md` + `latest.md`; learnings.md +1 entry; master `Styer_Growth_Log.md` appended (NotebookLM mirror skipped — CLI auth still expired, 19th run dead).
- 0 site mutations — research-only run per skill rules. Findings carried as TOMORROW_PRIORITY for daily site task + new TODO items.

## 2026-05-03 — Sunday: Sitemap + Re-Verify Only (daily-opt)

- Sitemap health check: https://styermortgage.com/sitemap.xml → 200 ✅
- Re-Verify Gate run on 7 live claims: 3 STILL OK, 4 STILL OPEN carry forwards (no actionable items unblocked)
- **Count-method correction:** how-to-buy USDA mention count restated from 6 (Sat PM) to 8 (today). Page hasn't been edited since 2026-04-23 (commit d2ef146); Sat PM `grep -oi "usda"` was undercounted. Each `<a href='/loans/usda'>USDA</a>` link contains "usda" twice (URL slug + visible text), so 2 link locations = 4 substring matches + 4 body content mentions = 8. Standardizing on substring-count going forward.
- NotebookLM script (`notebook_advisor.py`) missing for 18th consecutive check — SKILL.md retirement diff still pending Adam apply
- **NEW finding (HIGH):** NotebookLM CLI auth expired — `/Users/adamstyer/.local/bin/notebooklm` returned "Authentication expired or invalid." Separate problem from the missing python script. Adam fix: run `notebooklm login`. Master Styer_Growth_Log appended locally; only the NotebookLM mirror is stale until re-auth.
- Cleaned up yesterday's untracked PM run-log (`run-logs/2026-05-02b.md`) + uncommitted `run-logs/latest.md` modifications, rolled into today's bookkeeping commit
- Updated CONTEXT.md Last Worked On + 11th-run address mismatch carry forward + 18th-run NotebookLM escalation; learnings.md +1 lesson on grep substring-vs-line counting; appended to master Styer_Growth_Log
- Self-review: PASS — 0 modified site files. Bookkeeping-only Sunday run. Hard constraints not at risk.

## 2026-05-03 — Georgetown deepened (Round 2 slot 2) (styer-suburb-editor-daily)

- **Median refreshed** $395K Feb 2026 → $412,500 Mar 2026 Redfin (+1.9% YoY) — flip from February's negative print as the market firms.
- **USDA fully removed from page** (Adam doesn't originate): FAQ schema USDA Q → property-tax Q; FAQ accordion USDA item → property-tax item; loan-tile USDA → Asset Depletion / Asset-Based Income (first-class entry for Sun City retirees, mirrors body's existing asset-depletion FAQ); AEO opener `USDA programs for outer Williamson County` → `asset-depletion programs for Sun City retirees and jumbo financing for Wolf Ranch and Parkside`. Footer + nav USDA links untouched (sitewide cleanup blocker per CONTEXT).
- **VA tile re-targeted** off Fort Cavazos overreach (~73 mi from Georgetown, same problem Kyle analysis flagged for Round Rock). New framing: WilCo retired-military population + GISD-zoned communities (Wolf Ranch, Sun City, Parkside) as VA-eligible buyer pool. No more `proximity to Fort Cavazos`.
- **LocalBusiness schema description rewritten** with 78626/78628/78633 zips + Sun City (Del Webb/Pulte 55+) + Wolf Ranch (Hillwood, San Gabriel River) + Parkside on the River (1,500-acre MPC, 6 builders) + Saddlecreek (100 Furlong Dr, Pacesetter+Lennar) + Morningstar (Liberty Hill ISD, north of Hwy 29) named + WilCo 1.68% Ownwell tax stack + GISD $1.0506 + City of Georgetown $0.3532.
- **FAQ schema** "average home price" → "median home price" w/ 5 neighborhood price ranges integrated (Wolf Ranch $400s-$1M+ across 9 builders / Parkside $540s-$840s+ / Sun City 12-mo $396K + 157 active April 2026 / Saddlecreek mid-$300s-$500s / Morningstar Liberty Hill ISD callout). USDA Q replaced with property-tax Q citing GISD + City + WilCo Ownwell.
- **4 new body H3 sections (~80 lines):**
  - **Sun City Georgetown (78633) — 55+ Active Adult Spotlight** — Del Webb/Pulte largest active-adult community in TX per Redfin Sun City neighborhood; 12-mo median $396K + ~157 active listings April 2026 per Cain Realty Group; 3 financing structures called out: conventional 80% LTV with retirement-account drawdown / asset-depletion 60-120 mo amortization / jumbo for golf-course upper tier; out-of-state equity proceeds → delayed-financing pivot disclosed.
  - **MorningStar — Mailing Address Georgetown, but Liberty Hill ISD** — biggest-missed school-zoning detail in Georgetown. Round 1 wrongly implied GISD; corrected per livingmorningstar.com community overview. North of Hwy 29 / Kauffman Loop. Meritage $300s-$400s + Saratoga $350s-$500s. Liberty Hill HS 7/10 GreatSchools flagged. Buyers regularly assume Georgetown HS and discover otherwise mid-contract.
  - **Saddlecreek (78626) + Parkside on the River (78628)** — combined H3. Saddlecreek: 100 Furlong Drive, southeast Georgetown, Pacesetter Homes + Lennar primary, prior phases by CastleRock/Century/Gehan/Chesmar/D.R. Horton, 830 SFH + 230 cluster + 150 townhome buildout, amenities cited. Parkside: 1,500-acre MPC on San Gabriel River, 6 builders (Chesmar/Coventry/Highland/M/I/Perry/Taylor Morrison) per parksideontheriver.com; $540s 50ft → $690s 60ft → $840s+ 70ft per Highland Homes — upper tier crosses $832,750 Texas conforming line into jumbo.
  - **Major Employers in Georgetown** — broken out from Round 1's at-a-glance. AirBorn (Molex) 3500 Airborn Circle 78626 + St. David's Georgetown Hospital + Loram Technologies + Southwestern University ~1,500 students + SportClips HQ + GISD + Round Rock Dell HQ ~12 mi south down I-35.
- **At-a-glance updated** — all 5 community zips + Liberty Hill ISD MorningStar flag + WilCo 1.68% effective + new median + tax stack with 3 cited inline sources (Community Impact GISD, Hello Georgetown City, Ownwell WilCo).
- **Closing-cost section refreshed** $395K → $412.5K with 6 itemized line items + jumbo 6-12 mo PITI reserve callout (Parkside 70ft + Wolf Ranch upper-tier crossing $832,750 conforming line) + Sun City asset-depletion documentation pivot + internal link to /rate-check-georgetown.html.
- **FAQ accordion** home-prices + property-tax answers synced verbatim with new schema.
- **WebPage dateModified** bumped 2026-04-20 → 2026-05-03. **Meta description rewritten** with Mar 2026 median + zips + Sun City asset depletion + Wolf Ranch jumbo. **Sitemap lastmod** bumped 2026-04-15 → 2026-05-03.
- **All 4 JSON-LD blocks** (LocalBusiness/FAQPage/BreadcrumbList/WebPage) parse-validated clean via python json.loads.
- **18 inline source URLs** — Round Rock Round 2 had 14, Georgetown beats it.
- **Active blocker added to CONTEXT What's Next #6**: Georgetown joins Hutto + Round Rock for GSC URL Inspection re-indexing nudge after Round 2 deltas.
- Next queue slot: Cedar Park (Round 2 slot 3).

## 2026-05-03 — GBP weekly post: Homebuyer Tip — Week 18 (styer-gbp-weekly agent)

- GBP post (262 words, Homebuyer Tip theme) auto-published to Publer GBP account, job ID: `69f757ac2fb3758a0935c4b5`
- Topic: counter-intuitive offer-writing tip — ask sellers for concessions toward a 2-1 temporary buydown instead of price reduction; better near-term cash flow when buyers are most stretched. Frames the soft Austin spring market as the leverage window.
- IG/FB/LI drafts NOT generated (per scheduled-task revision 2026-04-19, this task is GBP-only; IG/FB/LI is owned by styer-social-am/pm orchestrator)
- `social_drafts` insert: skipped — schema check constraint still rejects `platform=google` (3rd recurrence; matches 2026-04-19 + 2026-04-26 pattern, not re-flagging per stale-flag rule). Publer is source of truth for the publish.
- `social_activity` insert: SUCCESS — `posted` action logged (id `9fc4b273-57a4-4143-98bf-1f71872df8e6`)
- Post saved to `run-logs/gbp-posts/2026-05-03.md`
- Master growth log appended (`/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md`)
- NotebookLM source refresh: FAILED (auth expired — `notebooklm login` required); pre-existing carry-forward issue, NotebookLM advisor script also still missing — both already in TODO/NEEDS ADAM, not re-flagging
- No HTML/site mutations — run-log + CHANGELOG entries only

## 2026-05-02 — Round Rock deepened (Round 2 slot 1) (styer-suburb-editor-daily)

- **Round 2 of suburb editor begins.** Round Rock is the first slot of Round 2 (Round 1 closed yesterday with Westlake — 13/13 complete).
- **Median refreshed** $388K Feb 2026 → $367,500 Mar 2026 Redfin (-7.1% YoY); $191/sqft (-5.2% YoY).
- **Tax stack baked into LocalBusiness schema description**: RRISD $0.8931 (M&O 0.7101 + I&S 0.1830) + City of Round Rock $0.372 + Williamson County $0.413776 — all per $100; combined ~1.68%.
- **VA tile re-targeted off Fort Cavazos** (Kyle analysis flagged the 90+ minute drive as marketing overreach). New angle: military families relocating from out-of-state postings drawn to RRISD ratings — verifiable in Round Rock VA purchase data.
- **Loan tile #4 swapped DPA → Jumbo.** DPA tile copy was verbatim with Kyle and Taylor (`Texas programs like TSAHC and TDHCA offer grants and forgivable second loans...`). New Jumbo tile is Round Rock-specific (upper Brushy Creek 78681, golf-course Forest Creek/Teravista). DPA still mentioned in FAQ schema/accordion.
- **3 new body H3 sections (~50 lines):**
  - *Forest Creek (78664) spotlight* — 1,200 homes mid-90s/mid-00s; original builders Toll Brothers/David Weekley/Scott Felder/Taylor Morrison/Meritage/Drees/D.R. Horton/Standard Pacific (Austin Home Seeker); $500K Mar 2026 median + $538,216 12-mo avg (Redfin); avg 3,100+ sqft; Forest Creek Elementary inside community.
  - *Brushy Creek + Sendero Springs (78681) combined spotlight* — Brushy Creek $578.5K 12-mo median + Coventry Homes/MileStone Community Builders new construction $800K-$1M+ (Homes.com); Sendero Springs 632 homes / 42-acre greenbelt / FM 1431 / Standard Pacific + Streetman builders (Sendero Springs HOA).
  - *Round Rock Major Employers* — Dell global HQ (since 1990s), Emerson Automation Solutions 1100 W. Louis Henna Blvd semiconductor software hub, TECO-Westinghouse 1,000+ Round Rock employees industrial motors, Amazon 149-acre 2025 last-mile + data center campus, 60,000+ STEM jobs ~7% annual growth (Round Rock Chamber).
  - *Property Tax & Closing Costs* — full cited tax stack + $367,500 closing-cost breakdown (lender's title $1,664, escrow $600, recording $125 WilCo, ~$6,174/yr tax proration credit, prepaids $3K-$4.5K, origination $1.5K-$2.5K).
- **At-a-glance lede updated** with full tax stack + neighborhood roster (78664/78665/78681) + first internal link to `/rate-check-round-rock.html` (Kyle analysis flagged this as missing).
- **FAQ accordion home-price + loan-programs answers synced** with new schema language; "average" → "median"; loan-programs answer now explicit on conforming limit + jumbo trigger zones.
- All 4 JSON-LD blocks (LocalBusiness / FAQPage / BreadcrumbList / WebPage) validated clean post-edit. WebPage `dateModified` 2026-04-29 → 2026-05-02. Sitemap `lastmod` bumped.
- **14 inline source URLs** on the page: Redfin city + Redfin Forest Creek + City-Data Teravista + GreatSchools Westwood + Round Rock ISD article + Round Rock Chamber major-employers + Round Rock Chamber target-industries + CitizenPortal RRISD 2025 rate + Community Impact City rate FY 25-26 + KXAN WilCo rate + Austin Home Seeker Forest Creek + Homes.com Brushy Creek + Sendero Springs HOA.
- Modified: `round-rock-mortgage-lender.html`, `sitemap.xml`, `run-logs/suburb-editor-queue.md`, this CHANGELOG, `CONTEXT.md`.
- **Next queue slot:** Georgetown (Round 2 slot 2).

## 2026-05-02 — Saturday: Sitemap + Re-Verify Only (daily-opt)

- Sitemap.xml health check: 200 ✅
- Re-verify gate run on 9 live claims; 5 confirmed STILL OK; 4 confirmed STILL OPEN carry forwards.
- 2026-04-27 post fixes (commit e0a1d9f) confirmed propagated to live a second day: canonical `/get-preapproved` CTA + canonical `136+ Reviews` footer.
- Homepage schema entity stack confirmed healthy live: MortgageBroker (×2), Person, AggregateRating, FAQPage all present.
- about.html LocalBusiness vs homepage MortgageBroker address mismatch — 9th run open (Adam decision required).
- NotebookLM `notebook_advisor.py` confirmed missing 16th consecutive check; SKILL.md retirement diff still pending Adam apply.
- **New learning logged:** Netlify pretty-URL config strips `.html` from served HTML, so re-verify gate `grep` patterns must search by resource name (`usda`), not literal file path (`/loans/usda.html`). Initial gate run nearly auto-cleared the how-to-buy USDA blocker as resolved; widening the grep caught 6 USDA mentions still live. Pattern added to `run-logs/learnings.md`.
- No HTML / schema / sitemap mutations. Saturday is sitemap + re-verify only per yesterday's plan.
- Modified: `run-logs/2026-05-02.md` (new), `run-logs/latest.md` (refreshed), `run-logs/learnings.md` (one new pattern entry), `CHANGELOG.md` (this entry), `CONTEXT.md` (Last Worked On + counters).

## 2026-05-01 PM — Bookkeeping + Re-Verify Gate (daily-opt)

- Re-verify gate confirmed AM commit e0a1d9f propagated to live: 2026-04-27 post CTA shows `../get-preapproved` (was legacy `../prequal.html`); footer Awards block shows canonical `136+ Reviews / 21-Day Avg. Close / Licensed in Texas` (was legacy `91 Google + 45 Zillow Reviews`).
- HTTP 200 + sitemap.xml entry (single, no duplicate) verified for `blog/2026-04-27-why-home-prices-arent-crashing.html`.
- FHA blog refresh (commit 89b9de3) verified live — Travis County + FHFA references propagated.
- NotebookLM `notebook_advisor.py` confirmed missing 15th consecutive check; SKILL.md retirement diff still pending Adam apply (concrete patch in 2026-04-26 AM `latest.md`).
- about.html LocalBusiness (5900 Balcones Dr) vs homepage MortgageBroker (5718 Sam Houston Cir) address mismatch live unchanged — 8th run open, Adam decision required.
- No HTML / schema / sitemap mutations. Bookkeeping-only run per "AM was thorough" pattern.
- Modified: `run-logs/2026-05-01b.md` (new), `run-logs/latest.md` (refreshed), `CHANGELOG.md` (this entry), `CONTEXT.md` (Last Worked On + counters).

## 2026-05-01 — Westlake Hills suburb page deepened — **Round 1 closeout 13/13** (styer-suburb-editor-daily)

- Final slot in Round 1 priority queue. All 13 high-volume Austin-area suburbs touched between 2026-04-19 and 2026-05-01.
- **Median refreshed** $1.2M+ → **$1.6M Mar 2026 Redfin** (+40.9% YoY) with inline cite to redfin.com/city/19594.
- **LocalBusiness schema description rewritten** with 78746 + Rob Roy / Davenport Ranch / Lost Creek / Barton Creek + Eanes ISD $0.8322 + WLH $0.176783 + Travis County 1.65% effective.
- **FAQ schema** "What are home prices like" → "What is the median home price" with tiered ranges (Davenport / Lost Creek $1.5M–$3M; Rob Roy / Barton Creek $4.5M–$15M+); jumbo limit body line `(2025 conforming limit)` corrected to `(2026 FHFA conforming limit, all Texas counties)`.
- **WebPage schema added** with `dateModified: 2026-05-01` and `about: Place containedInPlace Travis County`. All 4 JSON-LD blocks (LocalBusiness/FAQPage/BreadcrumbList/WebPage) validated clean via Python json.loads.
- **De-duped Portfolio loan card** — was verbatim with Spicewood (`Held by the lender on their books — more flexible underwriting...`); rewritten Westlake-specific (HNW + Rob Roy / Davenport Ranch / Barton Creek; bank-statement 12–24 mo + asset-depletion programs).
- **4 new H3 sections in body (~75 lines):**
  1. **Westlake Hills Neighborhoods (78746)** — 4 spotlights: Rob Roy 78746 (six subdivisions inc. Rob Roy West, $3M–$15M+, 1–5 acre lots, austinluxurygroup cite), Davenport Ranch 78746/78733 (~500 homes, Loop 360 + Westlake Drive, Austin Country Club inside, moreland.com cite), Lost Creek 78746 (~1,200 homes, Lost Creek Boulevard, Lost Creek Country Club, Forest Trail Elementary feeder, lostcreekld.org cite), Barton Creek 78735/78746 (16 sub-neighborhoods each gated, Barton Creek Country Club at 8212 Barton Club Drive 78735, four golf courses inc. Crenshaw/Coore).
  2. **Eanes ISD Schools** — Westlake HS 9/10 + Hill Country MS 10/10 + Eanes Elementary 10/10 (all GreatSchools links). Disclosed all 5 elementary feeders (Forest Trail / Barton Creek / Bridge Point / Cedar Creek / Valley View) feeding Westlake HS.
  3. **Major Employers** — Eanes ISD ~7,700 students/9 schools (Wikipedia + Westlake Chamber); 3 country clubs (Austin CC inside Davenport, Lost Creek CC, Barton Creek CC at 8212 Barton Club Drive 78735); HEB Westlake; Data USA cite for Professional/Scientific/Technical Services as #1 industry. **Honest disclosure:** 78746 is bedroom community for downtown Austin (10 mi).
  4. **Property Tax & Closing Costs** — Eanes ISD $0.8322/$100 ($0.7122 M&O + $0.12 I&S, Aug 19 2025 adoption per Community Impact); City of West Lake Hills $0.176783/$100 (-1.02% per city's Notice of Tax Rates document); Travis County 1.65% effective per Ownwell. **Closing-cost example at $1.6M w/ 20% down ($320K → $1.28M loan):** $20K–$28K itemized (title $5.5K–$7K, lender fees $2.5K–$3.5K, survey + HOI $3.5K–$5.5K, 3–4 mo escrow at 1.65% = $6.6K–$8.8K) + 6–12mo PITI reserve callout for jumbo at 10% down ($80K–$150K liquid).
- **Footer standardized** — this was the **last suburb page** still on the legacy `Top Producing Broker — Austin 2023 / 5-Star Zillow Reviews / Google Rating: 5.0 ⭐ / 1,000+ Loans Closed` block. Replaced with canonical `⭐ 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas` + 5718 Sam Houston Circle / Austin TX 78731 NAP + NMLS Consumer Access link + Mortgage Solutions, LP licensing disclaimer. Wrapped grid in `.container` and fixed `<script src="script.js">` → `<script src="/script.js" defer>`.
- **Stat card:** `$1.2M+ Median` → `$1.6M Median (Redfin Mar 2026)`.
- **Internal links added:** /rate-check.html, /loans/jumbo.html (new contextual link from closing-cost section).
- **18 inline source URLs** added across body — Redfin, FHFA, Wikipedia (Eanes ISD), 3 GreatSchools, Community Impact (Eanes tax rate), West Lake Hills city Notice of Tax Rates document, Ownwell (Travis County), 4 neighborhood guides, 3 country club sites, Westlake Chamber, Data USA.
- Sitemap `lastmod` 2026-04-20 → 2026-05-01.
- **Round 2 begins next eligible run at slot 1: round-rock-mortgage-lender.html.**
- Modified: `westlake-mortgage-lender.html`, `sitemap.xml`, `run-logs/suburb-editor-queue.md`. New: `run-logs/2026-05-01-suburb-editor.md`.

## 2026-05-01 — Weekly blog editor refresh: FHA vs Conventional (styer-content-weekly)

- Picked next-up post per editor queue: `blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html` (45 imp / 0 clicks GSC, page 1).
- **Stale 2026 program data → corrected with verifiable citations.** Replaced vague "mid-$500K range" + repeated "$524K" placeholder references (2025-era figure) with the actual 2026 Travis County FHA one-unit limit of **$571,550** and the 2026 conventional conforming one-unit limit of **$832,750**. Sourced inline to homebuyer.com/mortgage-loan-limits/travis-county-texas (cross-verified via JVM Lending and HUD's hicostlook search interface). Updated 5 places: body "When Conventional Wins" paragraph, body "What Austin Buyers Specifically Should Know" paragraph + example ($540K vs $524K → $585K vs $571,550), visible FAQ "What are the FHA loan limits in Austin TX?" answer, JSON-LD FAQPage answers for both "FHA loan limits in Austin" + "Is FHA or conventional better for first-time buyers in Austin", and JSON-LD answer for "Is FHA or conventional better for first-time buyers in Austin TX?".
- **Austin-specific data point added with citation.** Inserted Austin-Round Rock-San Marcos median sale price of **$426,220 (March 2026)** per Unlock MLS Q1 2026 Central Texas Housing Report, with inline link to unlockmls.com/news/march-q1-2026-central-texas-housing-report. The data point reframes the post's narrative usefully: median price is well *under* the FHA ceiling, so for the typical Austin buyer FHA is on the table — the constraint shows up at the top of specific neighborhoods (West Austin, Tarrytown, Rollingwood). Replaces what had been a directionally-true but unsourced "Austin's price range creates a real constraint" framing.
- **CTA copy tightened in Adam's voice.** Bottom CTA H2 "See Which Loan Is Right for You" → "FHA or Conventional? I'll Show You Both." Body copy reworked from passive "I'll run FHA and conventional side by side..." to direct "Send me your numbers — credit, income, down payment — and I'll run FHA vs. conventional side by side. Same-day pre-approvals are routine. You see the math before you tour houses, not after you're under contract." Voice-guide aligned (same-day pre-approvals as differentiator, short punchy sentences, "Schedule a Call" → "15-Minute Call" tightened to match the calendly URL).
- 0 new URLs created (per task hard-stop rule). 0 fabricated borrowers (active-borrowers memory file not present at expected path; voice guide rule "no fabrication" prevailed over "Adam anecdote" item — substituted with Austin median data citation as the 3rd required refresh element). Photo addition skipped — site convention does not include body photos in blog posts (verified across 2026-03 cluster).
- JSON-LD `dateModified` 2026-04-27 → 2026-05-01. sitemap.xml `lastmod` 2026-04-27 → 2026-05-01.
- Blog title lint clean (`grep "<title>" blog/*.html | grep -v "Adam Styer"` returned zero results).
- editor-queue.md updated: row added to Completed; next-up advanced to oldest post (2026-03-06 oil-prices) since voice-guide defers rate-volatility post AEO insertion (the FHA post was the only Next-Up item with a clean refresh path).
- Modified: `blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html`, `sitemap.xml`, `run-logs/editor-queue.md`, `run-logs/gsc-reindex-queue.md`, `CHANGELOG.md`.

## 2026-05-01 — Friday Content Planning + AEO Review rotation (daily-opt)

- Friday rotation executed in full. Latest blog post 2026-04-27 (4 days ago, under 7-day flag — no weekly content escalation).
- **Blog CTA conversion-funnel audit (21 dated 2026-* posts):** caught the only outlier — `blog/2026-04-27-why-home-prices-arent-crashing.html` with **0 links** to `/get-preapproved` or `/refinance-quote`. Bottom CTA was using legacy `../prequal.html` instead of canonical `../get-preapproved` extensionless path used by 20 of 21 dated posts. Fixed: CTA href + button label "Get Pre-Qualified" → "Get Pre-Approved" (matches the link target and Adam's correspondent-lender voice — he issues PA letters himself).
- **Footer Awards drift caught + fixed:** the same 2026-04-27 post was published 2 days after the 2026-04-25 sitewide footer Awards sweep (88/88), so it imported the legacy 2-line `91 Google + 45 Zillow Reviews` block. Standardized to canonical `136+ Reviews | 21-Day Avg. Close | Licensed in Texas`. Footer Awards consistency 88/88 → **89/89 sitewide**.
- JSON-LD `dateModified` and sitemap.xml `lastmod` bumped 2026-04-27 → 2026-05-01 on the corrected post.
- AEO 2-post spot-check: `2026-04-17-should-i-refinance-austin-tx-2026.html` PASS (6 question-form H2s + leading body `<p><strong>` + multiple CTAs); `2026-04-27-why-home-prices-arent-crashing.html` voice-first essay format using H3-only sectioning + no FAQ — explicitly deferred per voice guide pending Adam's structural decision (now 2nd recurrence).
- Two new learnings captured: (a) Friday CTA audit pattern catches conversion-funnel breakage that title/meta audits miss — every Friday run should `grep -c "get-preapproved\\|refinance-quote"` per dated post and fix any zero-result post immediately; (b) sitewide sweeps go stale by ONE the moment a post is published with the legacy template — future blog publishes need a footer-block lint at publish time, not waiting for the next sweep cycle.
- Re-verify gate: 5 claims checked. Sitemap 200 ✅. NotebookLM script missing 14th run (carry forward). about.html LocalBusiness address mismatch 7th run (carry forward — Adam decision). 1 new finding caught and resolved in-run (footer drift).
- Modified: `blog/2026-04-27-why-home-prices-arent-crashing.html`, `sitemap.xml`. New: `run-logs/2026-05-01.md`, `run-logs/latest.md` overwrite.

## 2026-04-30 PM — Bookkeeping commit + cluster correction (daily-opt)

- run-logs/2026-04-30b.md — PM run log written. Same-day second run on Thursday 2026-04-30; AM run was thorough (Internal Linking + Funnel Flow rotation + AEO p-strong on pre-approval-take + calc-affordability link normalization).
- Re-verify gate auto-resolved 2 stale claims: (a) Friday TOMORROW_PRIORITY pair (DSCR + how-to-choose-lender) — both already shipped with leading `<p><strong>` from prior sessions (DSCR added 2026-04-28 commit; lender already had pre-cluster); (b) older-template AEO denominator drift — corrected from "9/16, 7 remaining" to **11/16 OK, 5 remaining** (audit method missed FTB blog-article-body + 2 silently-fixed posts).
- Of the 5 remaining older-template posts, 4 are explicitly deferred per voice-guide reasoning (rate-volatility / life-devotional cluster: oil-prices, surrender-it stolen-car, ai-trap, why-rates-improved-bond-rally — adding answer-first paragraphs would dilute voice for marginal AEO gain) and 1 needs Adam's structural decision (why-home-prices-arent-crashing — has duplicate `<h2>` sub-title + meta-date `<p>` between author-bar and first content; AEO insertion would compete visually with sub-title h2).
- Older-template AEO sweep is **effectively complete** pending Adam structural call on why-home-prices.
- run-logs/latest.md — overwritten to PM run.
- CONTEXT.md — Last Worked On + What's Next item 5 corrected. Line count 115 (under 150 cap).
- learnings.md — appended PM-run pattern: TOMORROW_PRIORITY *pairs* need live-verified completeness state (not just filename) at AM run time; cluster-completeness re-statement; deferred-cluster discipline.
- No HTML/code changes this run — bookkeeping only.
- NotebookLM Step 0 dead 13th run (carry forward).
- about.html LocalBusiness address mismatch 6th run open (carry forward — Adam decision).

## 2026-04-30 — Dripping Springs suburb deepened (Round 1 slot 12/13) (styer-suburb-editor-daily)

- dripping-springs-mortgage-lender.html — Round 1 slot 12 of 13. Median refreshed from $500K-$900K range to **$542,500 March 2026 Redfin (+4.7% YoY)** with inline source URL. LocalBusiness schema description rewritten with 78620 + named neighborhoods + DSISD tax rate.
- FAQ schema + accordion: "average home price" → "median home price" with Redfin cite. "Hill Country land/acreage" Q swapped → "What is the property tax rate in Dripping Springs TX?" Q with DSISD $1.1052/$100 (Community Impact Sep 2025) + City of DS $0.2267/$100 (Community Impact Sep 2025) + Hays effective 1.71% (Ownwell), with $9,275/yr property tax example on median home.
- Removed templated paragraph: "A big bank will give you one product and one rate. As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders..." (verbatim match across 5+ suburb pages — confirmed via grep).
- Removed USDA from "VA & USDA Loans" tile per Adam's no-USDA stance — replaced with VA-only tile that calls out well/septic distance + potability requirements citing VA Circular 26-24-05 (benefits.va.gov source).
- Body neighborhood spotlights with builders + 78620 zip:
  - Headwaters — David Weekley + Toll Brothers, $500s-$1.5M+, has DSISD elementary onsite (liveheadwaters.com cited)
  - Caliterra — Drees Custom Homes + David Weekley + Scott Felder, $700K-$1.2M+ Ranch at Caliterra phase, Onion Creek corridor (caliterraliving.com cited)
  - Reunion Ranch — acreage/custom $1M+, horse-friendly, low HOA, gravity-fed septic
  - Arrowhead Ranch — west DS along Fitzhugh Rd, 1+ acre lots, no production builders
- Belterra disclosure added — technically zip 78737 not 78620 + different ISD boundary parts; warns reader before assuming DSISD enrollment.
- Schools H3 with all GreatSchools links: Dripping Springs HS 7/10, Dripping Springs Middle 8/10, Sycamore Springs Middle 8/10, Sycamore Springs Elem 8/10, Walnut Springs Elem 6/10.
- Major Employers H3: DSISD ~1,100 (Dripping Springs News cited) + Dripping Springs Distilling (19 states, founded 2005, drippingspringsdistilling.com cited) + Treaty Oak (Waterloo Gin, Red Handed Bourbon) + Desert Door (only US sotol distillery, destinationdrippingsprings.com cited) + H-E-B/US-290 retail. Honest framing: "small relative to Round Rock — most buyers commute to Austin or work remote."
- Property Tax + Closing Costs H3: cited rate stack + closing-cost example $11K-$14K at $542K with 20% down + jumbo example $18K-$22K at $900K with 10% down + escrow + jumbo reserves callout.
- Hill Country Construction H3: Hays County OSSF (septic) permit link + 2-yr aerobic maintenance contract requirement + well/septic potability + FHA/VA distance setbacks. Internal link added to /rate-check.html.
- WebPage schema added with dateModified 2026-04-30. Meta description rewritten with median + named neighborhoods + jumbo/construction angle. OG description tightened.
- All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated via JSON parse — clean.
- sitemap.xml — lastmod bumped 2026-04-19 → 2026-04-30.
- run-logs/suburb-editor-queue.md — slot 12/13 marked Done. Final Round 1 slot is Westlake.
- USDA in header/footer nav dropdown remains (2 hits site-wide) — site-wide nav cleanup blocked on Adam's USDA cascade decision per CONTEXT.md Active Blockers.

## 2026-04-30 — Thursday Internal Linking + Funnel Flow rotation + AEO continuation (daily-opt)

- Thursday rotation: Internal Linking + Funnel Flow audit on 3 pages — DSCR (28+ internal links), Round Rock (30+ internal links), calculator-affordability (17+ internal links). All PASS — well above 2+ relevant link threshold. No internal-linking gaps.
- contact.html form wiring verified: both forms (hero-quick-form + contact) correctly wired with data-netlify, hidden form-name input, GTM container, dataLayer push for `generate_lead { lead_type: 'contact_form' }`.
- thank-you.html audit verified: noindex/nofollow set, tel: link to (512) 956-6010, Calendly inline widget @ calendly.com/adamstyer/15minutes, 3-step "What Happens Next" section (`#ty-steps`), thank_you_page_view dataLayer push.
- blog/2026-03-28-how-long-does-mortgage-pre-approval-take.html — added answer-first `<p><strong>` paragraph (~67 words). File-type breakdown distinct from existing range-based P1: W-2 with all docs = same business day; self-employed with 2-yr returns + YTD P&L = same-day or next-day; missing documents or recent credit events = three business days. Closing line: "The variable isn't underwriting speed — it's documentation readiness. Get the file complete, get the letter." Uses post's own framing throughout (no new compliance risk).
- calculator-affordability.html — normalized `/get-preapproved.html` → `/get-preapproved` to match site-wide pattern. Every other page on the site uses extensionless; `_redirects` resolves both. LOW_RISK consistency fix.
- sitemap.xml — bumped lastmod on both modified pages to 2026-04-30.
- AEO older-template cluster: 8/16 → 9/16. Remaining 7: TBD on Friday/next-week rotations.
- Re-verify gate (4 claims): Sitemap 200 STILL OK; NotebookLM script missing 12th run STILL OPEN; about.html LocalBusiness vs MortgageBroker address mismatch 5th-run STILL OPEN (Adam decision); pre-approval-take `<p><strong>` claim RESOLVED via implementation.
- Step 4B SEO/SEM backlog: all P1/P2 ZERO_RISK + LOW_RISK items already complete; remaining items are P3 Adam-decision-blocked or P4 GSC-blocked. Picked up 1 LOW_RISK consistency fix (calc-affordability link) found via Internal Linking audit.
- Self-review PASS: NMLS preserved (6 occurrences on blog post), GTM intact (2 occurrences each), no "Styer Team", no new rate quotes, voice-guide compliant.
- Commit 5782c7d on top of d7689e0; pushed to main; Netlify deploy verified live (HTTP 200 on both pages + sitemap; curl grep confirms `<p><strong>A complete W-2 application` shipped + `/get-preapproved` extensionless on calc page + both 2026-04-30 sitemap lastmod entries).

## 2026-04-29 PM — AEO older-template cluster +2 (daily-opt PM)

- blog/2026-03-20-austin-mortgage-rates-march-2026.html — added answer-first `<p><strong>` paragraph (~67 words). Lead clause: "30-year fixed mortgage rates in Austin TX for March 2026 are running in the mid-to-upper 6% range for well-qualified buyers." Followed by structured VA/FHA/15-yr/DSCR rate breakdown using post's own numbers. Inserted at `<header>`/newsletter-author-bar pattern: after `</div>` closing newsletter-author-bar, before existing P1 voice-y hook.
- blog/2026-03-27-down-payment-assistance-texas-2026.html — added answer-first `<p><strong>` paragraph (~77 words). Distinct angle from existing P1 (which already led with "3% to 5% available"): TDHCA vs TSAHC program comparison, including stack-with-FHA/VA/conventional, deferred-second-lien-vs-grant trade-off, 620 credit floor, county income limits.
- sitemap.xml — bumped lastmod on both posts to 2026-04-29.
- AEO older-template cluster: 6/16 → 8/16. Remaining: 2026-03-28-how-long-does-mortgage-pre-approval-take.html (next), plus 7 others.
- Re-verify gate: 2 TOMORROW_PRIORITY items resolved via implementation; about.html LocalBusiness vs MortgageBroker address mismatch confirmed STILL OPEN (4th run, Adam decision); NotebookLM script confirmed missing 11th consecutive run.
- Caught typo in morning's TOMORROW_PRIORITY: "2026-03-28-how-to-take-mortgage-pre-approval" → actual file is "2026-03-28-how-long-does-mortgage-pre-approval-take.html". Filename corrected for Thursday's run.
- Self-review PASS: NMLS preserved, GTM intact, no rate quotes beyond post's own numbers, no "Styer Team", voice-guide compliant.
- Commit 57e40d3 on top of f079441; pushed to main; Netlify deploy verified live (HTTP 200 + curl grep confirms `<p><strong>` openers shipped + sitemap lastmods updated).

## 2026-04-29 — Bee Cave page deepened (styer-suburb-editor-daily, Round 1 slot 11/13)

- bee-cave-mortgage-lender.html — Round 1 slot 11. Median refreshed: $1.0M March 2026 Redfin (+6.9% YoY, $293/sqft, -7.0% per-sqft) replacing vague "$500K–$1.2M" range used in body + FAQ + accordion + meta description.
- Removed templated "As an independent mortgage broker, Adam Styer shops rates across 40+" paragraph (verbatim match w/ kyle-mortgage-lender.html + san-marcos-mortgage-lender.html — duplication confirmed via grep).
- New H3 "Bee Cave Neighborhoods Adam Closes In" w/ 3 cited spotlights:
  - Spanish Oaks (78738) — 13001 Spanish Oaks Club Dr, gated golf w/ two 24-hr staffed gatehouses, 2,500–10,000+ sqft, custom builders Weston Dean / Camelot / Bella Vita / Heyl / Russell Eppright / Stadler (spanishoaks.com cited).
  - Sweetwater (78738) — 1,400-acre Newland MPC off Hwy 71 west of RR 620 (Bee Creek Rd / Bee Cave Pkwy), upper $300s entry tier, Westin/Newmark/Chesmar product, 10-acre Sweetwater Club w/ 3 pools (sweetwaterliving.com cited).
  - Falconhead (78738) — Drees / Meritage / Taylor Morrison + Prestige Custom + Callahan Custom, $650K–$1.5M+, 1,550–6,200 sqft, gated sub-sections (austinhomeseeker.com cited).
- New H3 "Bee Cave Schools (Lake Travis ISD)" — Lake Travis HS 9/10 GreatSchools (3324 RR 620 South 78738, AP/PLTW/G&T) + Bee Cave Elementary 8/10 GreatSchools (14300 Hamilton Pool Rd, Pre-K–5, A on Niche). Both rating links cited.
- New H3 "Bee Cave Major Employers & Commute Anchors" — Hill Country Galleria 152 acres / 100+ retailers anchored by Dillard's, Whole Foods, Cinemark, Barnes & Noble + on-site Class A office (Regus listing cited) + Spanish Oaks Golf Club hospitality. Commute notes: ~25 min downtown via SH-71, ~20 min Domain via RR 620+US-183, ~30 min AUS via SH-71.
- New H3 "Bee Cave Property Tax & Closing Costs at the Median" — LTISD $1.0397/$100 (M&O 0.7122 + I&S 0.3275, lowest in district history per CitizenPortal) + City of Bee Cave $0.02/$100 FY25-26 (Community Impact, $153.97/yr on $769,846 avg homestead) + Bee Cave Road District No. 1 28.9176¢/$100 (Travis County). Closing-cost breakdown at $1.0M w/ 20% down ($800K loan): $20K–$25K itemized (origination/title/escrow/recording/survey/HOI/3-4mo tax escrow at ~1.7% effective per Ownwell) + jumbo 6-12 mo PITI reserve callout.
- FAQ schema + accordion: "average home price" → "median home price" w/ Redfin citation; schools answer rewritten w/ both GreatSchools cited ratings + addresses.
- WebPage schema added (dateModified 2026-04-29, isPartOf WebSite, about Place Bee Cave). All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) parse clean.
- Meta description rewritten: "$1.0M median (Redfin March 2026). Spanish Oaks, Falconhead, Sweetwater. Lake Travis HS 9/10."
- Sitemap lastmod bumped 2026-04-22 → 2026-04-29.
- Queue: Bee Cave done. Next slot 12/13: Dripping Springs.

## 2026-04-29 — Round Rock USDA cleanup + rate-alert sitemap entry (daily-opt, Wednesday rotation)

- round-rock-mortgage-lender.html — voice-guide compliance: removed USDA from 3 surfaces (LocalBusiness schema description; FAQPage schema "loan programs" answer; visible accordion same answer). DSCR / bank-statement loans substituted in compensating positions for self-employed and investor buyers. dateModified bumped 2026-04-19 → 2026-04-29.
- sitemap.xml — added rate-alert.html (`<lastmod>2026-04-29</lastmod>`, weekly, priority 0.7); bumped round-rock-mortgage-lender.html lastmod 2026-04-14 → 2026-04-29.
- Wednesday rotation suburb deep dive (Round Rock): structural audit 15/15 pass (form, all schemas, AEO answer-first paragraph, question-form H2/H3, internal links, trust bar, NMLS, GTM, TCPA + SMS opt-in).
- Re-Verify Gate cleared 2 stale flags: (1) thank-you.html "uncommitted" 4-run HIGH carry-forward → `git diff` returned empty, claim auto-resolved; (2) rate-alert.html missing-from-sitemap → resolved via implementation in same run.
- Consolidated multiple per-page USDA flags into 1 Adam-decision flag covering site-wide nav dropdown (header + footer on ~88 pages link to `/loans/usda.html`).
- Commit ac042b4. Netlify deploy verified live; round-rock + rate-alert + sitemap all HTTP 200; round-rock body confirms USDA only remains in global nav (intended scope boundary).
- NotebookLM Step 0 dead 10th run; SKILL.md retirement diff still pending Adam apply.

## 2026-04-28 — Lakeway page deepened (styer-suburb-editor-daily, Round 1 slot 10/13)

- lakeway-mortgage-lender.html — Round 1 slot 10. Median refreshed: $704K February 2026 Redfin (-11.2% YoY, $258/sqft, 104 days on market). Removed templated 6-sentence "Home Prices in Lakeway" paragraph + at-a-glance schools list; replaced with cited Redfin median, builder roster (Drees / David Weekley / Newmark / Scott Felder / Westin) across Rough Hollow's Vista Ridge Estates / Las Brisas / Canyon Pass / The District (78738), and Estates of Flintrock 2017–2023 (Ashton Woods + Mercury). Cardinal Hills tagged as 78734 entry tier.
- New H3 "Lakeway Major Employers & Commute Anchors" — Baylor Scott & White Lakeway (106-bed Magnet hospital, "one of the largest employers in the area" per BSW careers page) + Hill Country Galleria 1.3M sqft / 285K sqft Class A office anchored by Dillard's, Whole Foods, Cinemark, Dick's Sporting Goods, Barnes & Noble (SH-71 / RM 620 / Bee Cave Rd junction).
- New H3 "Lakeway Property Tax & Closing Costs at the Median" — LTISD adopted $1.0397/$100 for 2025-26 ("lowest in district history" per CitizenPortal + LTISD voter-approval-tax-rate-election page); City of Lakeway adopted $0.16964/$100 FY 2025-26 per Community Impact (6.2% increase, average bill $1,435); Travis County effective 1.7%–2.0% per Ownwell. Closing-cost breakdown at $704K w/ 20% down ($563.2K loan): $14K–$18K itemized — origination/title/recording/insurance/3-4 mo tax escrow + jumbo 6-12 mo PITI reserve callout.
- Schools added inline to "at a glance": Lake Travis HS 9/10 GreatSchools (3324 Ranch Road 620 South, 78738) + Serene Hills Elementary 9/10 GreatSchools + 97% graduation rate per US News.
- LocalBusiness schema description rewritten with 78734/78738 zips + named neighborhoods. FAQ schema "What are home prices" + "Construction loan" rewritten Lakeway-specific (de-duplicated construction-loan paragraph that was verbatim with bee-cave-mortgage-lender.html). Construction-loan accordion rewritten to Hill Country topography specifics (rock blasting, retaining walls, septic/non-MUD draws).
- WebPage schema added with dateModified 2026-04-28; meta description rewritten (153 char): "Lakeway TX jumbo loans: Rough Hollow (78738), Lakeway Highlands, Flintrock Falls. $704K median Feb 2026. LTISD 9/10 GreatSchools. 40+ lenders. NMLS #513013."
- All 4 JSON-LD blocks (LocalBusiness / FAQPage / WebPage / BreadcrumbList) parsed clean via Python json.loads validation.
- sitemap.xml lastmod 2026-04-20 → 2026-04-28.
- Queue: round 1 slot 10/13 done; next slot 11 = Bee Cave (note: Bee Cave still not indexed per CONTEXT blockers — manual GSC URL Inspection overdue regardless of next deepening pass).

## 2026-04-28 — Meta descriptions + DSCR AEO body answer (daily-opt)

- 10 meta descriptions rewritten to 150-160 char spec on key indexed pages: calculator-affordability (119→157), rate-alert (124→150), how-to-buy-a-house (127→154), about (131→159), first-time-home-buyer (132→160 — USDA removed per voice-guide rule), calculator-payment (135→156), rate-check (135→152), calculators (137→155), fixed-vs-adjustable (139→150), manor-mortgage-lender (173→159 trim).
- blog/2026-03-31-dscr-loans-austin-tx-2026.html — body `<p><strong>` AEO answer (66w, mechanics/qualification math angle: DSCR formula, 1.0/1.25 thresholds, 680/740 credit floors, 20–25% down, no W-2/no tax returns, LLC title). Numbers all sourced from post body (PITI table, lender requirements, comparison table). Distinct from existing investor pain-point/scenario intro. dateModified 2026-03-31 → 2026-04-28.
- Re-verify gate auto-resolved how-to-choose-a-mortgage-lender — already had `<p><strong>` AEO answer at line 190 from earlier session. No edit required.
- sitemap.xml — lastmod 2026-04-28 on 10 in-sitemap pages + DSCR. Added missing `<lastmod>` attributes to calculator-affordability + calculator-payment.
- New finding logged: rate-alert.html missing from sitemap.xml. Verify indexability and add next run.
- thank-you.html uncommitted state escalated MEDIUM → HIGH (4th run carry forward, Adam decision required).
- Older-template AEO cluster: 4/16 → 6/16 closed, 10 remaining. Next pair: self-employed + DPA.
- Commit 6db2ebe; live ~0s after push; all 12 URLs HTTP 200 verified via curl.
- New learnings: (1) re-verify-before-write rule for AEO body answers — grep `<p><strong>` BEFORE inserting, prevents duplicate/redundant work; (2) em-dash byte/char gotcha when targeting 160-char meta descriptions — wc -c overcounts by 2 per em dash, validate with `python3 print(len(...))`; (3) USDA removal on small surfaces (meta) is auto-doable; body removal still requires Adam confirmation.

## 2026-04-27 PM — AEO body answers: VA + FTB (daily-opt)

- blog/2026-03-29-va-loan-eligibility-texas.html — body `<p><strong>` AEO answer (79w) inserted after `</div>` of newsletter-author-bar, before existing first `<p>`. Distinct angle from existing eligibility/service-test paragraph: leads with **benefit/economics** (zero down + no PMI + capped closing costs the seller can pay + $150–300/mo savings vs <20% down conventional + Funding Fee 1.25–3.3% waived for veterans with 10%+ service-connected disability). Numbers all sourced from post body. dateModified 2026-03-29 → 2026-04-27.
- blog/2026-03-30-first-time-home-buyer-programs-austin-tx-2026.html — body `<p><strong>` AEO answer (81w) inserted inside `<div class="blog-article-body">`, before existing first `<p>`. Distinct angle from existing voice-y casual hook: leads with **four-program stack inventory** (TSAHC 3–5% grants, TDHCA My First Texas Home up to 5% as 30-year deferred lien, MCC $2,000/year federal tax credit for life of loan, City of Austin American Dream up to 10% for buyers <80% AMI) + Texas first-time definition (no primary-residence ownership in past 3 years). Numbers all sourced from post body. dateModified 2026-03-30 → 2026-04-27.
- sitemap.xml — lastmod 2026-04-27 on both posts (was 2026-03-29 / 2026-03-30).
- New insertion pattern documented in learnings.md: `blog-article-body`-template posts (FTB pattern) — insert immediately after the opening `<div class="blog-article-body">`, before the first `<p>`. Author block already closed inside `<div class="blog-article-header">`.
- New layering insight: when existing first `<p>` is voice-y/casual (FTB), AEO answer paragraph serves as machine-extractable layer above; existing voice opener still functions as human hook below. Don't replace voice with extraction — add extraction above voice.
- Commit 998c920; live verified via curl in 75s.
- Older-template AEO cluster: was 14 remaining → now 12. Next pair: DSCR + how-to-choose-lender.

## 2026-04-27 — Manor suburb deepened (styer-suburb-editor-daily)

- manor-mortgage-lender.html — Round 1, slot 9. Removed all Manor-specific USDA copy (LocalBusiness schema description, FAQ schema Q + accordion Q, body "even USDA financing" line) — header/footer nav `/loans/usda.html` left as sitewide concern (separate Adam decision). Replaced USDA FAQ Q with property-tax Q citing Manor ISD $1.0814/$100 (M&O 0.7113 + I&S 0.3701, Prop A approved Nov 2024) + Ownwell ~2.27% combined effective.
- Removed templated "As an independent mortgage broker, Adam Styer shops rates across 40+ wholesale lenders" + "Adam works for you — not for a lender or a builder" paragraph (verbatim 4-page match: bee-cave, kyle, manor, san-marcos — Manor now removed). Removed templated DPA paragraph. Loan-tile #4 rewritten as Manor-specific TSAHC/TDHCA tile linking tsahc.org + tdhca.texas.gov.
- Added 4 verified neighborhood spotlights with builders + 78653 zip: ShadowGlen (Terrata/Perry/Meritage/LGI, $499K-$555K top tier — 18-hole golf course + 4-acre water park), Whisper Valley (Pacesetter + Avi, geothermal+solar via Taurus Investment Holdings, $200s-$400s), Carillon (D.R. Horton at 13407 Eppright Trace, $299,990-$416,990, 1,574-2,677 sqft), Presidential Meadows (KB Home, sold-out resale, Presidential Meadows Elementary at 13252 George Bush St).
- Manor Schools H3 — honest disclosure: Manor High School 2/10 GreatSchools cited inline. Recommended buyers verify specific elementary/middle attendance before writing offers.
- Major Employers H3: Tesla Gigafactory 22,777+ employees (Electrek), ~15 min via SH-130 (Wikipedia confirms 2,500-acre site); Plastic Omnium 350K-sqft Tesla supplier plant + 800 jobs (Connect CRE); Samsung Austin Semiconductor Taylor fab; Manor ISD as local employer.
- Median home price refreshed to $355,000 Nov 2025 (+6.6% YoY, Redfin) replacing $270K-$400K templated range. FAQ + accordion home-price Q + first-time-buyer Q + Tesla Q all rewritten with verified data + inline source links.
- Closing cost example at $355K with 5% down: $7,500-$9,500 range itemized (title $1,800-$2,400, lender $1,200-$1,800, recording/survey $300-$500, prepaids $1,200-$1,800, 3-4 mo tax escrow $2,000-$2,700 at 2.27% effective).
- Added WebPage schema with dateModified 2026-04-27. Meta description rewritten with neighborhood list + Redfin median. Internal links: /rate-check.html, /get-preapproved, Wikipedia Gigafactory, plus 7 source URLs.
- All 4 JSON-LD blocks validated parse-clean.

## 2026-04-27 — AEO body answers: cash-out + fha-vs-conv (daily-opt)

- blog/2026-03-24-cash-out-refinance-austin-tx.html — body `<p><strong>` AEO answer (69w, "three things line up" frame using post's own numbers). dateModified 2026-04-27.
- blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html — body `<p><strong>` AEO answer (79w, decision-frame + MIP-vs-PMI life-of-loan distinction). dateModified 2026-04-27.
- sitemap.xml — lastmod 2026-04-27 on both posts.
- Wrote second audit script (find first `<p>` after `<h1>` in `<article>` body, check leading `<strong>` and 40-80w body). 16 older-template posts identified — 2 closed this run, 14 remaining.
- Schema audit (Monday rotation): homepage MortgageBroker + Person ✅, DSCR FAQPage ✅, Hutto full stack ✅, about.html Person matches homepage. NEW finding logged in CONTEXT.md Active Blockers: about.html LocalBusiness address (5900 Balcones Drive) ≠ homepage MortgageBroker (5718 Sam Houston Circle). Adam decision needed.
- Commit 984d1b0; live in 75s; verified via curl.

## 2026-04-27 — Week 8 competitive intel: SERP-wide snapback (styer-competitive-weekly)

- run-logs/competitive/2026-04-27.md + latest.md — Week 8 report. SERP rankings: 2 → 1 in top 10. Hutto demoted #1→#2 (Big Life reclaimed with no content updates — algorithmic refresh, not on-page regression; both Hutto + Round Rock pages verified to have correct 136-review schema and recent edits). Round Rock #2 → not in top 10 (sandbox bounce on page deepened 2026-04-19). Bee Cave still not indexed (24 days). New top 3 across 11 tracked keywords logged with full re-verify gate.
- Re-Verify Gate caught record 9 prior claims this week: Hutto #1 (downgraded), Round Rock #2 (cleared), AsertaLoans (cleared), Nest 3-position dominance (cleared), Vista cleared (reversed), Highlander cleared (reversed), AustinHomeLoans cleared (reversed), Sente "not appearing" (partially updated), Nest #1 home loan (cleared).
- Big competitor moves: Nest Mortgaging vanished entirely from all 7 core keywords (last week's headline new threat — total disappearance in 7 days). AsertaLoans gone from cash-out refi #1. AustinHomeLoans.com (Schutze Brothers, 40+ years, 245+ reviews, 2,000+ closed loans) re-emerged #1 home loan. Joel Richardson/FCM new #1 cash-out refi. Lone Star added Lakeway #1 to Round Rock #1 — structural suburb leader.
- run-logs/learnings.md — Prepended 2026-04-27 entry. Patterns: first negative-direction week (algorithmic, not regression); content velocity without authority is brittle (Nest counter-example); Round Rock fits new-page sandbox; CrossCountry 2-Cedar-Park-branches is structural; AustinHomeLoans tenure moat reaffirms suburb-first strategy; re-verify gate critical in volatile weeks.
- NotebookLM Step 0 dead 6th run — `notebook_advisor.py` still missing; cached-learnings fallback worked. The 5th-run SKILL.md retirement patch (drafted 2026-04-26) still pending Adam's apply.
- NotebookLM source push: SEO notebook (7f8a80c5) added 2026-04-27.md as new source. Styer Mortgage notebook (5348ff90) refreshed Styer_Growth_Log.md (deleted old, re-added). Master log appended at /Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md.
- Action items for Adam: GSC URL Inspection sweep (Hutto, Round Rock, Bee Cave, Lakeway — all overdue); consider "10-minute response, guaranteed" trust signal (none of top competitors claim this — aligns with this week's GOALS.md "speed to lead" priority); apply NotebookLM SKILL.md retirement patch.
- thank-you.html uncommitted change in working tree (carried forward from 2026-04-26 PM run; `ty-alt-paths` reveal logic for refi/preapproval) — NOT modified by this run, NOT staged. Still pending Adam's commit-or-revert decision.

## 2026-04-26 PM — should-i-refinance AEO body answer + blog-post-header template 14/14 complete (daily-opt)

- blog/2026-04-17-should-i-refinance-austin-tx-2026.html — Added body `<p><strong>` AEO answer paragraph (56 words) immediately after `</header>` of `blog-post-header`, before existing first body `<p>`. Distinct angle from `blog-post-intro` inside header (intro: 3 conditions / body: run-the-formula + Austin median tenure ~6 yrs + 30/48-month examples drawn from post's own break-even math). All 6 H2s already in question form on this post — no statement→question conversion needed. dateModified 2026-04-17 → 2026-04-26 in schema.org Article.
- sitemap.xml — lastmod 2026-04-17 → 2026-04-26 for the same post.
- Commit 0c60b27 on top of cbddcc0. Pushed to main; Netlify deploy live within ~75s. Body answer + dateModified + sitemap lastmod confirmed live via curl.
- AEO loose-thread audit: completed for `blog-post-header` template — 14/14 posts now have body `<p><strong>` answer (10 rate-shopper + 4 dated 2026-* posts using this template). Identified next AEO target cluster: ~16 dated 2026-* posts using the older `<header>` (page-level) + `<article class="blog-article">` template. Audit method needs upgrade to find first body `<p>` after `<h1>` inside `<article>`/`<main>`. Proposed cadence: 2 posts per AM run, paired by topic.
- thank-you.html: discovered uncommitted change in working tree (`ty-alt-paths` reveal logic for refi/preapproval thank-you-types). Not from any current scheduled task — explicitly NOT staged. Logged for Adam decision (commit or revert).
- NotebookLM Step 0 dead 6th run — concrete unified-diff SKILL.md retirement patch is in 2026-04-26 AM run-log FLAG_FOR_ADAM, still pending Adam's apply.

## 2026-04-26 — Liberty Hill suburb deepened (styer-suburb-editor-daily)

- liberty-hill-mortgage-lender.html — Removed USDA from 5 locations: LocalBusiness schema description, FAQ schema Q (replaced with "What is the property tax rate in Liberty Hill TX?"), FAQ accordion (matching), loan-options card (swapped to Jumbo Loans card with SH-29/FM-1869 acreage hook), and Step 3 pre-approval text (swapped "USDA or DPA" → "Texas DPA or VA"). Adam doesn't originate USDA.
- Removed templated `<p>As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders…</p>` paragraph — verbatim duplicate across 5 pages (bastrop, dripping-springs, austin-mortgage-rates, taylor, liberty-hill).
- Added WebPage schema with `dateModified: 2026-04-26` after the BreadcrumbList JSON-LD block.
- Replaced generic "$350K–$600K" home price lede with sourced February 2026 median $485K (53 closings, down 6.3% YoY from $517,500) — [Neuhaus Realty Group/Unlock MLS](https://neuhausre.com/liberty-hill-real-estate-market-update-march-2026/). Trimmed at-a-glance line by removing redundant neighborhood price ranges (now broken out into spotlight H3s).
- Added 3 verified neighborhood spotlight paragraphs: **Santa Rita Ranch (78642)** — Pulte primary + Perry/Highland sections, 112 Leon Loop ([Pulte](https://www.pulte.com/homes/texas/austin/liberty-hill/santa-rita-ranch-209566)); **Northgate Ranch (78642)** — Drees/Giddens/Hill Country Artisan/Monticello, 508 Bizzell Cove ([Northgate Ranch](https://northgateranch.com/) | [NewHomeSource](https://www.newhomesource.com/community/tx/liberty-hill/northgate-ranch-by-drees-custom-homes/186201)); **Orchard Ridge (78642)** — Pacesetter primary + Lennar/Ashton Woods/Dream Finders/Buffington, Freehold Communities masterplan, 105 Orchard Park Drive ([Pacesetter](https://www.pacesetterhomestexas.com/new-homes-for-sale-austin/liberty-hill-tx/orchard-ridge) | [Freehold Communities](https://freeholdcommunities.com/orchard-ridge-masterplan-in-liberty-hill-texas-announces-two-new-builders/)).
- Added Liberty Hill Schools H3 — Liberty Hill HS [7/10 GreatSchools](https://www.greatschools.org/texas/liberty-hill/4341-Liberty-Hill-High-School/), 98% graduation rate vs. 90% TX average; Prop A passed Nov 2025 raising M&O to $0.7389 ([Community Impact, Nov 2025](https://communityimpact.com/austin/leander-liberty-hill/election/2025/11/04/liberty-hill-isds-tax-rate-election-passes-unofficial-voting-results-show/)); combined LHISD school rate $1.2389/$100; $23M HS upgrade + planned new Legacy Ranch HS.
- Added Major Employers & Local Economy H3 — LHISD ~600 staff (largest single employer per [Liberty Hill EDC](https://www.libertyhilledc.com/workforce/major-employers/)); $75M Costco + $22M Target under construction; Platform 183 x 29 industrial mixed-use 1M+ sqft along US-183/SH-29 corridor ([Liberty Hill Digest, Aug 2025](https://issuu.com/fidelispublish/docs/liberty_hill_digest_august_2025)); ~42 mi to ABIA; Samsung Taylor/Tesla/Apple/Dell within commute.
- Added Closing Cost Example H3 — $485K, 5% down ($460,750 loan); typical Texas closing costs $10,500–$13,000 (excl. down payment) broken down (TX promulgated title ~$2,500, lender fees ~$1,400, appraisal ~$650, survey ~$500, prepaids ~$5,200+); annual property taxes $9,700–$11,600 at 2.0%–2.4% combined ([Community Impact, Aug 2025 — city rate $0.469407](https://communityimpact.com/austin/leander-liberty-hill/government/2025/08/28/liberty-hill-adopts-741m-fy-2025-26-budget-sets-property-tax-rate/)).
- Internal link added: `/loans/jumbo.html` (replaces former USDA-tile dead end with relevant high-end-acreage upsell path).
- run-logs/suburb-editor-queue.md — Liberty Hill marked Done; next: Manor.
- 4+ unique first-party elements per task spec: 3 named neighborhoods with zip+builder+address, school w/ rating+source, employer list with sources, closing-cost example with TX numbers + sources. ✅
- Templated paragraph removed: "As an independent mortgage broker…" — pre-removal grep confirmed verbatim 5-page match. ✅

## 2026-04-26 — Rate-shopper AEO series 10/10 COMPLETE + NotebookLM 5th-run patch (styer-site-daily)

- blog/what-to-compare-besides-mortgage-rate.html — added body `<p><strong>` AEO answer paragraph (60w) after `</header>`, distinct from blog-post-intro (intro lists 6 factors; body leads with practical Section A side-by-side method + identical-rate $4,000+ spread example + rate=monthly/fees=upfront frame). Statement H2 "Origination Charges — The Biggest Variable" → question "Are Origination Charges the Biggest Variable in Loan Cost?". dateModified 2026-04-12 → 2026-04-26.
- blog/is-the-lowest-rate-the-cheapest-loan.html — added body `<p><strong>` AEO answer paragraph (64w) after `</header>`, distinct from blog-post-intro (intro: total-cost frame; body leads with "compare loans over the time you'll keep them" + 6.375%/$8,500 vs 6.5%/$3,000 example aligned with post's existing Lender A/B numbers). Statement H2 "Why Buyers Fixate on the Rate" → question "Why Do Buyers Fixate on the Rate?". dateModified 2026-04-12 → 2026-04-26.
- sitemap.xml — lastmod 2026-04-12 → 2026-04-26 for both posts.
- Self-review PASS: GTM=2/2 on both, NMLS=4/4 each, no Styer-Team, distinct-wording rule satisfied, illustrative rates aligned with post's own Lender A/B example (no new compliance risk).
- Live verify after Netlify deploy: both posts 200, body answers + question H2s + sitemap lastmod confirmed live.
- **Rate-shopper AEO series 10/10 COMPLETE** — full anti-pattern (`blog-post-intro` inside `<header>` only) closed across all 10 posts after 4 days, ~20 min/run, 2-per-run cadence (commits de08af6, c6df081 PM, then today's 23d00c7).
- NotebookLM Step 0 dead 5th consecutive run — concrete unified-style SKILL.md retirement diff drafted in run-log FLAG_FOR_ADAM (replaces lines 57-72 of `~/.claude/scheduled-tasks/styer-site-daily/SKILL.md`). One-shot edit Adam can apply.
- Monday 2026-04-27 GSC sitemap status reminder logged in FLAG_FOR_ADAM (Step 1 weekly cadence).
- Commit: 23d00c7. learnings.md appended with rate-shopper series complete pattern + 5th-run concrete-patch rule.

## 2026-04-25 PM — Rate-shopper AEO 8/10 reached (styer-site-daily)

- blog/what-delays-closing-when-you-switch-lenders.html — added body `<p><strong>` AEO answer paragraph (56w) after `</header>`, distinct from blog-post-intro inside header. Statement H2 "How a Broker Speeds Up the Process" → question "How Does a Broker Speed Up the Process?". dateModified 2026-04-12 → 2026-04-25.
- blog/how-to-read-a-loan-estimate.html — added body `<p><strong>` AEO answer paragraph (66w) after `</header>`. Statement H2 "What to Do After You Read Your Loan Estimate" → question "What Should You Do After You Read Your Loan Estimate?". dateModified 2026-04-12 → 2026-04-25.
- sitemap.xml — lastmod 2026-04-12 → 2026-04-25 for both posts.
- Self-review PASS: GTM=2/2, NMLS intact, no Styer-Team, distinct-wording rule satisfied (both intros and body answers cover same question from different angles).
- Live verify after Netlify deploy: both posts 200, body answers + question H2s + sitemap lastmod confirmed live.
- Rate-shopper AEO coverage: 8/10 (was 6/10). Remaining: what-to-compare-besides-mortgage-rate, is-the-lowest-rate-the-cheapest-loan. Sunday finishes the series.
- NotebookLM Step 0 dead 4th consecutive run — Sunday will draft the SKILL.md retirement patch.

## 2026-04-25 — Hutto suburb page deepened (styer-suburb-editor-daily)

- Removed templated paragraph "As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders..." — confirmed verbatim on 6 pages via grep (austin-mortgage-rates, bastrop, dripping-springs, hutto, liberty-hill, taylor).
- Removed USDA from LocalBusiness schema description — Adam does not originate USDA loans.
- Added WebPage schema with datePublished 2025-08-01 / dateModified 2026-04-25, isPartOf WebSite, about City+AdministrativeArea (Williamson County).
- Refreshed FAQ Q1 + body home-price anchors to $340,000 median (Feb 2026, [Redfin](https://www.redfin.com/city/9075/TX/Hutto/housing-market) — down 9.3% YoY).
- New H3 "Hutto Neighborhoods Where I Close Loans" — Star Ranch (78634, Clark Wilson Builder, sold-out, golf-course community off W Highfield), Emory Crossing (78634, 304 Stinchcomb Rd, Taylor Morrison + David Weekley townhomes, currently selling, [Jome](https://jome.com/community/tx/1029-emory-crossing-50s-by-taylor-morrison-304-stinchcomb-road-hutto-tx-78634)), Riverwalk (78634, established south-of-US-79).
- New H3 "Top Hutto-Area Employers" — Samsung Austin Semiconductor in Taylor (~10 min via SH-130, 1,800 direct jobs targeted, [Community Impact Oct 2025](https://communityimpact.com/austin/georgetown/development/2025/10/08/samsung-employees-to-move-into-office-building-on-taylor-campus-this-november/)), Tesla Hutto 35,000 sq ft service/distribution facility ([FOX 7 Austin](https://www.fox7austin.com/news/tesla-hutto-austin-expansion)), Hutto ISD.
- New H3 "Closing Cost Example — $340K Hutto Home" — typical $8,500–$10,500 closing costs at 5% down with breakdown: TX-promulgated title (~$2,200), lender fees ($1,500–$2,500), survey ($500), appraisal ($600–$700), property-tax escrow against ~1.93% combined rate (HISD $1.2052 + City of Hutto $0.385928 + Wilco). Both rates Community Impact sourced.
- Added Hutto HS 6/10 [GreatSchools](https://www.greatschools.org/texas/hutto/3723-Hutto-High-School/) rating with direct URL.
- Added internal link to /rate-check-georgetown.html (the rate-check page that covers Hutto).
- Rewrote AEO opener with FHA + conventional + new-construction wedge (no DPA-grant-covers-everything overclaim).

## 2026-04-25 — Footer Awards sitewide standardization + AEO sweep continued (styer-site-daily)

- 56 of 57 site files (28 root + 28 blog) standardized: footer Awards `<p>` updated from `★ 5.0 Stars · 91 Google Reviews / ★ 4.98 Stars · 45 Zillow Reviews` → `★ 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas`. Two indent variants (multi-line and single-line) handled in two regex passes. Indentation preserved via `\g<lead>` capture group. Final `136+ Reviews` count across site: 88 pages (some pages have it in both hero trust badge and footer).
- about.html intentionally excluded — its stale review-count instance is a `<span class="timeline-date">` inside a milestone timeline, not the footer `<p>` Awards block. Surfaced as MEDIUM Adam-decision flag (update vs. leave as historical milestone).
- blog/how-many-mortgage-quotes-should-i-get.html: added 60-word `<p><strong>` AEO body paragraph after `</header>` (distinct from existing `blog-post-intro` in header). H2 "Why Most Buyers Only Get One Quote" → "Why Do Most Buyers Only Get One Quote?". dateModified 2026-04-12 → 2026-04-25.
- blog/local-lender-vs-online-lender-austin-central-texas.html: added 54-word `<p><strong>` AEO body paragraph after `</header>`. H2 "How to Decide" → "How Do You Decide Between an Online, Local, or Broker Lender?". dateModified bumped.
- sitemap.xml: lastmod bumped to 2026-04-25 for both rate-shopper posts.
- Rate-shopper AEO progress: 6/10 posts now have machine-extractable answer-first paragraphs in article body.
- NotebookLM Step 0 confirmed dead for the 3rd run — escalated to ESCALATED in FLAG_FOR_ADAM.
- Commit b0f1dc6.

## 2026-04-24 PM — Rate-shopper AEO sweep continued (styer-site-daily)

- blog/apr-vs-interest-rate-what-actually-matters.html: added 57-word `<p><strong>` AEO answer-first paragraph after `</header>` (existing `blog-post-intro` inside `<header>` was not machine-extractable). dateModified 2026-04-12 → 2026-04-24.
- blog/are-mortgage-lender-fees-negotiable.html: added 55-word `<p><strong>` AEO answer-first paragraph after `</header>`. Converted statement-form H2 "Why a Mortgage Broker Already Has Lower Fees" → question form "Why Does a Mortgage Broker Already Have Lower Fees?". dateModified bumped.
- sitemap.xml: lastmod bumped to 2026-04-24 for both posts.
- Re-Verify Gate cleared Buda USDA flag (suburb-editor closed it earlier today via commit 4755b70).
- New finding logged: stale "91 Google + 45 Zillow" footer Awards on 28 blog posts + 29 root pages — suburb pages were standardized 2026-04-23 but the batch missed everything else. Queued ZERO_RISK fix for next run.
- NotebookLM Step 0 confirmed dead for the 2nd run; recommended retirement.
- Commit 748ba68 (rebased onto incoming rate-update commits 1858bfa + 9fe6008).

## 2026-04-24 — Buda suburb page deepened (styer-suburb-editor-daily)

- buda-mortgage-lender.html: USDA removed from 7 locations (LocalBusiness schema description, FAQPage schema USDA FAQ replaced with schools FAQ, loan tile swapped USDA→DPA, stat card "$0 Down USDA"→"$0 Down VA eligible", process step 1 USDA check removed, CTA USDA mention removed, down payment FAQ USDA removed)
- Removed templated USDA loan tile paragraph confirmed verbatim in jarrell + florence pages
- Added neighborhood spotlights: Garlic Creek (78610, Centex/Mercedes 2007–15, $310K–$390K), Sunfield (78610, 2700ac, Taylor Morrison/Pulte/Chesmar/David Weekley/Brightland, lazy river, $350K–$470K), Ruby Ranch (78610, larger lots, $375K–$550K+)
- Added schools H3: Jack C. Hays HS 6/10 GreatSchools, 2,191 students, 89–91% grad rate, sources inline
- Added employers H3: US Foods, Heaven Hill/Deep Eddy Vodka ($12.5M+ investment), Cabela's, Texas Lehigh Cement, incoming H-E-B (City of Buda March 2026 + Buda EDC sourced)
- Added closing cost breakdown at $370K: HCISD $1.1546/$100 + City of Buda $0.3576/$100 (both Community Impact sourced), ~$9K–$12K total
- Updated median price stat to $382K (Feb 2026, Houzeo)
- Updated at-a-glance with real tax rates, school name, employer list, median price
- Added rate-check-buda-kyle.html internal link in Why section
- Added WebPage schema with dateModified 2026-04-24
- Meta description updated with school/employer specifics
- Queue: Buda → Done; Next: Hutto

## 2026-04-24 — DPA post refresh: title/meta CTR fix + accuracy corrections (weekly-blog-editor)

- blog/2026-03-27-down-payment-assistance-texas-2026.html: title rewritten to include "Austin TX" + benefit-driven headline (was "What Still Works" — vague, not geo-targeted)
- Meta description rewritten: leads with $40K / $160K income angle instead of acronym list
- H1 + hero subtitle updated to match new angle
- USDA removed from TDHCA eligibility list (Adam does not do USDA)
- "broker" corrected to "correspondent lender" in FAQ
- Travis County TSAHC income limit added with inline cite ($167,250, TSAHC PDF)
- City of Austin DPA details updated: $40K, 10-year forgivable, 80% AMI limit
- Austin median home price ($450K, April 2026) added with inline ACTRIS cite
- Income limit paragraph updated: removed fabricated "$90K–$120K" range, replaced with verified $167,250 figure
- dateModified bumped to 2026-04-24
- Blog title lint: pass (all titles include "Adam Styer")

## 2026-04-24 — AEO body paragraphs + about.html CTAs (daily-opt)

- blog/can-i-switch-lenders: AEO body paragraph added (blog-post-intro inside header is not machine-extractable); H2 question format
- blog/how-to-compare-two-mortgage-offers: AEO body paragraph added; H2 question format
- about.html: 2 body CTAs changed from raw app URL to /get-preapproved
- sitemap.xml: lastmod updated for about.html + 2 blog posts to 2026-04-24
- NotebookLM script confirmed missing on disk — escalated to HIGH blocker

## 2026-04-23 — Footer Awards standardized + how-to-buy suburb links (daily-opt)

- Footer Awards updated to standard "136+ Reviews / 21-Day Avg. Close / Licensed in Texas" across 12 suburb pages (standard template variant)
- Trust strip review count updated to "136+ Reviews · 5.0 Stars" on 3 pages (florence, jarrell, marble-falls — older template variant)
- how-to-buy-a-house-in-austin-tx.html: added internal links to all 24 Austin suburb mortgage pages between Step 4 and Step 5
- sitemap.xml: how-to-buy lastmod updated 2026-04-03 → 2026-04-23
- Liberty Hill 2026-04-22b changes confirmed live on Netlify

# styermortgage.com — Changelog

## 2026-04-22 — Leander page deepened (suburb-editor-daily round 1, #4)

- `leander-mortgage-lender.html` — 10 targeted changes:
  - Added Travisso neighborhood spotlight (78641, off TX-1431, Taylor Morrison/Toll Brothers/Highland/Drees, $600s–$2M+, Olimpico Way — travisso.com + taylormorrison.com sources)
  - Added school ratings with GreatSchools links: Glenn HS 6/10, Leander HS 6/10, Vista Ridge HS 8/10
  - Added employer section: LISD 6,000+ (leanderisd.org/careers), National Aero Stands 2024 (leandertx.gov), Austin tech corridor commute context
  - Added closing cost breakdown at $440K median: title ~$1,837, escrow ~$600, recording ~$125, tax proration ~$3,278 (LISD source)
  - Updated median price throughout to $438K Feb 2026 (Redfin) with citation; replaced vague "$380K–$450K"
  - Added LISD + Williamson County tax rate citations ($1.0869 + $0.3999 per $100) in intro and body
  - Removed USDA Loans feature-item (Adam does not do USDA per voice guide)
  - Removed templated DPA paragraph (confirmed verbatim duplicate with pflugerville page); replaced with Leander-specific DPA card
  - Fixed LocalBusiness schema description to remove USDA
  - Added WebPage schema + dateModified 2026-04-22

## 2026-04-22b — Liberty Hill content enrichment + footer audit (daily-opt)

- `liberty-hill-mortgage-lender.html` — H2 "Loan Options for Liberty Hill Buyers" → question format for AEO
- `liberty-hill-mortgage-lender.html` — At-a-glance: added Orchard Ridge to neighborhood list; added Williamson County property tax context (1.9–2.4% vs Travis County 2.2–2.7%)
- `liberty-hill-mortgage-lender.html` — Footer Awards updated from old 91 Google/45 Zillow split to standard 136+ / 21-Day Avg. Close
- `sitemap.xml` — liberty-hill lastmod updated to 2026-04-22

## 2026-04-22 — Bee Cave AEO audit + broker-vs-bank AEO/SEO pass (daily-opt)

- `bee-cave-mortgage-lender.html` — Fixed OG description "near Eanes ISD" → "Lake Travis ISD" (factual error); added Lakes Edge neighborhood + inline /calculators.html link; footer Awards updated to 136+ standard
- `mortgage-broker-vs-bank.html` — Added "Adam Styer |" to title; converted 4 statement H2s to question format for AEO; fixed CTAs /prequal.html → /get-preapproved (3 places); updated Article schema dateModified; footer Awards updated
- `sitemap.xml` — lastmod updated for both changed pages to 2026-04-22

## 2026-04-21b — Title tag audit + sitemap dedup (daily-opt second run)

- `dscr-loan-austin-tx.html` — title trimmed 68→48 chars (removed redundant "| Investor Mortgage"), OG title updated
- `loans/refinance.html` — title reordered/trimmed 67→56 chars ("Cash-Out Refinance Austin TX" now leads keyword), OG title updated
- `sitemap.xml` — removed duplicate mortgage-pre-approval-austin.html entry (kept priority 0.9, removed 0.8 duplicate)

## 2026-04-21 — Cedar Park page deepened (suburb-editor-daily round 1, #3)

- `cedar-park-mortgage-lender.html` — 9 targeted changes:
  - Rewrote AEO opener: FHA + jumbo program hooks tied to Leander ISD buyers and Twin Creeks/Ranch at Brushy Creek price range
  - Replaced 2 generic body paragraphs with employer section: Cedar Park Regional Medical Center (Ascension), ETS-Lindgren, National Oilwell Varco, Firefly Aerospace ($1.1B NOC contract 2024) — Cedar Park EDC source
  - Updated at-a-glance: real tax rate 1.86% nominal / 1.52% effective with WilCo + LISD source URLs; removed unverified IBM reference; corrected Apple distance
  - Updated home prices H3: $492K March 2026 Redfin median replacing vague $400-500K range; added Block House Creek low end + Twin Creeks upper end
  - Added school ratings H3: Cedar Park HS 8/10 + Vista Ridge HS 8/10 (GreatSchools links + physical addresses)
  - Added 3 neighborhood spotlights: Buttercup Creek ($420K-$650K, 78613), Ranch at Brushy Creek ($500K-$850K, 78613), Twin Creeks ($700K-$1.1M+, Toll Brothers Crestline 2026)
  - Added closing cost breakdown at $492K: lender title ~$2,100, escrow $650, recording $125, tax proration at 1.86% combined rate (~$4,575 mid-year), prepaids $3,500-$4,500
  - Removed generic "Why Should Cedar Park Homebuyers Use an Independent Mortgage Broker?" H3 (templated boilerplate, confirmed pattern across Leander + Round Rock pages)
  - Added internal link to rate-check-cedar-park.html; added WebPage schema; updated FAQ schema home price answer with Redfin $492K + LISD school ratings
- `run-logs/suburb-editor-queue.md` updated: Cedar Park marked done, Leander is next

## 2026-04-20 — Georgetown page deepened (suburb-editor-daily round 1, #2)

- `georgetown-mortgage-lender.html` — 6 targeted changes:
  - Updated FAQ schema + accordion: $395K median Feb 2026 with Redfin source (was vague ranges)
  - Added WebPage schema with dateModified 2026-04-20
  - "Georgetown at a glance" paragraph: added Redfin median price citation + named employers (AirBorn, St. David's, Loram Technologies, Southwestern University, SportClips HQ) with Chamber of Commerce source
  - Added Wolf Ranch Neighborhood Spotlight: 129 Canyon View Road, 78628, Hillwood Communities, Highland Homes builder, with source link
  - Replaced sourceless "Schools" paragraph with Georgetown ISD school ratings: Georgetown High 7/10 GreatSchools + East View 5/10 GreatSchools, both with source URLs
  - Added closing cost breakdown: $1,762 title insurance, $600 escrow, $125 recording, ~$7,200/yr taxes (GISD $1.0506 + Georgetown city $0.3532 per $100, Community Impact + Hello Georgetown sources)
- `run-logs/suburb-editor-queue.md` updated: Georgetown marked done, Cedar Park is next

## 2026-04-20 — CTR titles complete: all 24 suburb pages + H2 audit done (daily-opt run 2)

- CTR-hook titles + neighborhood-specific meta descriptions: Buda, Westlake, Manor, Marble Falls, Spicewood, Smithville, Elgin, Florence, Jarrell, Taylor
- USDA removed from meta descriptions: Smithville, Elgin, Florence, Jarrell (voice guide: Adam does not do USDA)
- Manor H2s fixed to question format (2 remaining label-format H2s)
- H2 format audit confirmed: ALL 24 suburb pages now in question format ✅
- CTR-hook titles: ALL 24 suburb pages complete ✅ (milestone)
- sitemap.xml lastmod updated for all 10 pages to 2026-04-20
- Self-review: PASS — 10 HTML files + sitemap, GTM=2, no USDA in metas, no Styer Team

## 2026-04-20 — H2 question format + CTR titles, 5 suburb pages (daily-opt run 1)

- 20 content H2s converted to question format: Lakeway, Bee Cave, Bastrop, New Braunfels, Austin-area hub
- CTR-hook titles + neighborhood-specific meta descriptions: Lakeway (jumbo/luxury), Bee Cave (luxury/jumbo), Bastrop (acreage/rural)
- sitemap.xml lastmod updated for all 5 pages to 2026-04-20
- Schema Monday audit: all clean — AggregateRating, FAQPage, Person all ✅
- Hutto reviewCount verified at 136 ✅; blog title lint clean ✅
- 11 of ~24 suburb pages now have CTR-optimized titles (up from 8 after yesterday's run)

## 2026-04-20 — Weekly competitive intel run 7 (Monday)

- SERP check: 10 keywords tracked (7 core Austin + 2 suburb + 1 revisit)
- styermortgage.com upgraded to #1 for "hutto tx mortgage lender" (was #3)
- styermortgage.com new #2 for "round rock tx mortgage lender" (first appearance in top 3)
- Two new competitive threats identified: MortgageAustin.com (#1 for pre-approval) + Nest Mortgaging (6+ keyword positions)
- AsertaLoans new entrant at #1 for "cash out refinance austin tx"
- Report written to run-logs/competitive/2026-04-20.md + latest.md updated
- NotebookLM SEO notebook updated with Week 7 report + master growth log refreshed
- Re-verify gate: 5 prior claims cleared/upgraded (Vista dropped, Lone Star #1 pre-approval cleared, MortgageAustin.com broker claim updated, Hutto #3→#1 upgraded)
- No site changes this run (research only)

## 2026-04-19 — H2 audit (Marble Falls + Elgin) + CTR title/meta rewrites (run 2)

- marble-falls-mortgage-lender.html — 4 H2s → question format for AEO extraction
- elgin-mortgage-lender.html — 4 H2s → question format for AEO extraction
- 8 suburb pages — generic titles → specific intent-matching hooks (per GOALS.md CTR priority)
- 8 suburb pages — generic meta descriptions → first-person, neighborhood-specific copy
- 8 suburb pages — og:title updated to match new titles
- sitemap.xml — lastmod updated for all 10 changed pages to 2026-04-19
- commit d4c2705 — 11 files, 42 insertions, 42 deletions

## 2026-04-19 — GBP weekly post: Rate Commentary — Week 16 (styer-gbp-weekly agent)

- GBP post (184 words, Rate Commentary theme) auto-published to Publer, job ID: 69e4e36dfa57756880b5ecae
- FB, Instagram, LinkedIn platform-adapted drafts inserted into social_drafts (status: draft, awaiting Adam approval)
- 4 activity log entries created in social_activity table
- Post saved to run-logs/gbp-posts/2026-04-19.md
- Master growth log updated; NotebookLM source refreshed

## 2026-04-19 — Suburb editor run 1: Round Rock deepened (suburb-editor-daily agent)

- round-rock-mortgage-lender.html — removed templated "As an independent mortgage broker" paragraph (confirmed on 5 pages); updated home price to $388K Feb 2026 median (Redfin, cited); updated property tax rate to specific ~1.68% combined (Texas Property Calculator, cited); added employer list with sources (Dell HQ, Emerson HQ, Toppan Photomasks HQ, Amazon 149-acre campus — Round Rock Chamber); added Teravista neighborhood spotlight with zip 78626, University Blvd/Westinghouse Rd location, builders, price range, City-Data source; added Westwood High School 9/10 GreatSchools + A+ Niche + 99% grad rate with source links; added closing cost breakdown ($390K example: title ~$1,741, escrow ~$600, recording ~$125, property tax proration ~$3,276 mid-year); updated FAQ schema + accordion answer with real 2026 data; added WebPage schema with dateModified 2026-04-19
- run-logs/suburb-editor-queue.md — created, Round 1 queue initialized

## 2026-04-19 — AEO H2 audit (Spicewood + Florence + Jarrell) + blog title fix

- spicewood-mortgage-lender.html — 4 H2s → question format for AEO extraction (preserved lakefront angle)
- florence-mortgage-lender.html — 4 H2s → question format for AEO extraction
- jarrell-mortgage-lender.html — 4 H2s → question format for AEO extraction
- blog/2026-04-04-austin-housing-market-report-april-2026.html — title + og:title brand fix (added "Adam Styer | NMLS #513013")

## 2026-04-18e — AEO H2 audit (Taylor + Smithville) + sitemap gap fix

- taylor-mortgage-lender.html — 4 H2s → question format for AEO extraction
- smithville-mortgage-lender.html — 4 H2s → question format for AEO extraction
- sitemap.xml — added 5 suburb pages missing since March 2026: taylor, smithville, elgin, florence, jarrell
- Hutto verified: AEO ✅, reviewCount = 136 ✅, H2s ✅

## 2026-04-18d — SEO: rewrite titles + metas on 8 page-1-0-click pages

Adam-approved title and meta description rewrites pushed to 8 high-impression / low-CTR pages flagged by GSC. Body content already supports each claim.

- 3 blog posts: `blog/2026-04-04-austin-housing-market-report-april-2026.html`, `blog/2026-03-27-down-payment-assistance-texas-2026.html`, `blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html` — title + meta description + og:title + og:description + twitter:title + twitter:description + Article JSON-LD `headline` + `description` all updated to match
- 3 city pages: `round-rock-mortgage-lender.html`, `georgetown-mortgage-lender.html`, `cedar-park-mortgage-lender.html` — title + meta description + og:title + og:description updated. Added missing `twitter:card` + `twitter:title` + `twitter:description` tags (city pages previously had only `twitter:image`)
- 2 loan pages: `loans/fha.html`, `loans/jumbo.html` — all 6 title/description tag pairs updated
- New angles: Round Rock = "beat builder rates"; Cedar Park = FHA in Leander ISD; Georgetown = Sun City + asset-depletion; FHA = "broker not a call center" w/ 2026 Travis limit $524,225; Jumbo = 10% down to $1.5M w/ bank-statement
- Blog title lint passed (`grep "<title>" blog/*.html | grep -v "Adam Styer"` → 0 lines)
- Body content, H1s, canonicals, GTM, analytics, and all other head tags untouched

## 2026-04-18c — Mobile perf fix: compress + picture-wrap 3 huge images

Fix for the GSC desktop-vs-mobile ranking gap (desktop avg 9.25 vs mobile 36.47). Huge unoptimized hero images were the prime CWV suspect on all non-homepage pages.

- Compressed 3 images to WebP (cwebp 1.6.0, q=80, 1200–1600 px long edge):
  - `assets/family2.jpg`: 8.1 MB → 108 KB WebP (+ 332 KB JPG fallback)
  - `assets/adam-cutout.png`: 5.0 MB → 64 KB WebP (+ 1.1 MB PNG fallback; PNG with alpha at 1200 px is inherently large without pngquant)
  - `assets/headshot.jpg`: 2.0 MB → 68 KB WebP (+ 264 KB JPG fallback)
  - Total primary-path savings: 15.1 MB → 240 KB (98.4%)
  - Originals moved to `assets/originals/` for rollback
- Wrapped 42 `<img>` tags across 48 HTML files in `<picture>` elements with WebP source + JPG/PNG fallback. Preserved alt, class, width/height, fetchpriority, decoding, loading, and inline style attributes. Skipped already-wrapped index.html and austin-mortgage-rates.html. Structured-data JSON references to headshot.jpg left as-is.
- Mobile Lighthouse audit + perf diagnosis written to `tasks/mobile-perf-2026-04-18.md`. Top non-auto-fix issues flagged for Adam: calculator slider tap targets 20×20 px (need ≥44), calculator form inputs missing labels, blog hero-bg.webp missing preload (1.1 s load delay).

## 2026-04-18b — Dead file cleanup + sitemap suburb prune

- Deleted `blog/_template.html` (dev-only template; referenced only in run-logs — historical, no code dependency)
- Deleted `blog/2026-04-01-test.html` (test file, publicly reachable per robots disallow, never linked)
- Deleted `hero-test.html` (glassmorphism hero prototype, not linked)
- Deleted `updates/2026-03-18-the-ai-trap-i-walked-right-into.html` (duplicate of `/blog/` canonical version — duplicate content risk)
- Deleted `blog/2026-03-30-temp-placeholder.html` (meta-refresh redirect stub, noindexed — dead weight)
- sitemap.xml: removed 5 low-volume suburb URLs (jarrell, florence, smithville, taylor, elgin) — pages remain in repo pending cut/defer decision
- No references found in blog.html noscript or CollectionPage schema for any deleted file; no sitemap changes beyond the 5 suburb removals



- New post: `blog/2026-04-17-should-i-refinance-austin-tx-2026.html` — ~1,350 words, FAQPage + Article + BreadcrumbList schema, targets "refinance mortgage Austin" (Moderate/High-opportunity keyword from SEO audit)
- Break-even math framing with real-client anecdote (radical transparency voice); internal links to /refinance-quote, /loans/refinance.html, /blog/2026-03-24-cash-out-refinance-austin-tx.html
- Updated blog.html noscript block + CollectionPage JSON-LD schema, blog/manifest.json, sitemap.xml
- Queued 3 platform-tailored social drafts (LinkedIn/Facebook/Instagram) to `social_drafts` for Adam's dashboard approval; logged `social_activity` entries

## 2026-04-18 — Monday rotation: Schema audits + AEO + H2 question format (6 pages)

- dscr-loan-austin-tx.html: AEO answer-first paragraph added; 7 H2s converted to question format; hero + body CTAs → /get-preapproved (missed in prior loan page sweep)
- westlake-mortgage-lender.html: 3 content H2s → question format; body + footer CTAs → /get-preapproved
- dripping-springs-mortgage-lender.html: 3 content H2s → question format (AEO was already present)
- hutto/liberty-hill/manor -mortgage-lender.html: 2 H2s each → question format (prior session, committed today)
- Schema audit: homepage ✅ MortgageBroker+Person+FAQPage+AggregateRating(136); about ✅ LocalBusiness+Person; DSCR ✅ FAQPage(6)+BreadcrumbList; Westlake ✅ all schemas
- about.html sameAs CID: confirmed real (ChIJYy5uEFPKRIYRmF-k_5gPk74), stale flag auto-resolved
- sitemap.xml: lastmod updated for all 6 changed pages → 2026-04-18

## 2026-04-17 — Friday AEO rotation: Buda footer, doc-checklist H2s, San Marcos H2s

- buda-mortgage-lender.html: footer Awards & Recognition updated — removed stale "1,000+ Loans Closed" / "Top Producing Broker 2023" → current "5.0 ★ Google Rating · 136+ Reviews | 21-Day Avg. Close | Licensed in Texas · NMLS #513013"
- blog/2026-04-06-mortgage-document-checklist-austin-tx.html: 4 H2s converted from label format ("Additional Documents — X") to AEO question format
- san-marcos-mortgage-lender.html: 2 content H2s converted to question format
- sitemap.xml: lastmod updated for buda (→ 04-17), san-marcos (03-06 → 04-17), doc-checklist (04-10 → 04-17)

## 2026-04-17 — GTM tracking fix (Version 5) + Buda trust bar

- GTM container GTM-PQQ6PGLR published as Version 5 "Version 5 - Tracking Fix"
- Deleted malware-paused tags: `GA4 Configuration` (tag 3, paused Feb 24) and `Google Ads - Thank You Page Conversion` (tag 9, paused Mar 21)
- Added replacement `GA4 Configuration` (tag 12, Google Tag G-DDY0H0319S, Initialization - All Pages)
- Added replacement `Google Ads - Thank You Page Conversion` (tag 13, Conversion ID 18028490942, Label XYcDCMqh64wcEL7h05RD, fires on thank_you_page_view)
- Added `Google Tag AW-18028490942` (tag 11, base Google Ads tag, Initialization - All Pages) via Fix banner
- Added **new** `GA4 Event - generate_lead` (tag 14, GA4 Event, event name: generate_lead, fires on CE - generate_lead) — fixes suburb quick-form conversion tracking gap (existing since form launch)
- Added **new** `Conversion Linker` (tag 15, Conversion Linker, All Pages) — resolves container quality "Missing conversion linker" warning
- buda-mortgage-lender.html: trust bar updated from old template "⭐ 5.0 Google Rating | 1,000+ Loans Closed | NMLS #513013" to standard "5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013"

## 2026-04-16c — Homepage Lighthouse perf fix (72 → 90+ target)

- index.html: GTM loader wrapped in a deferred invoker. Container snippet itself is preserved verbatim (GTM-PQQ6PGLR, same body, same function); only the *timing* of invocation changes. Fires on first user interaction (scroll / mousemove / touchstart / keydown / click) OR after `requestIdleCallback` with a 3.5s timeout fallback. Removes GTM download + parse from the critical path.
- index.html: inline critical CSS — removed now-useless `background-size:200% 200%` on `.hero-gradient-text` (no animation to run against).
- style.css: removed `animation: gradient-shimmer 4s ease-in-out 1` from `.hero-gradient-text`. Was animating `background-position` (non-composited) during LCP measurement window. Static gold gradient kept — same look, no paint churn.
- style.css: removed `animation: hero-cta-glow 1.5s ease-in-out infinite` from `.hero-cta-primary:hover`. Was animating `box-shadow` (non-composited) on hover. Static enhanced hover shadow kept.
- style.css: removed unused `@keyframes gradient-shimmer` and `@keyframes hero-cta-glow` and the stale `will-change:box-shadow` / `will-change:background-position` declarations. Size: 65295 → 64814 bytes.
- Root cause of the 72 score: GTM on the critical path (long tasks + 202 KiB unused JS) + two non-composited keyframe animations on hero elements. Both now addressed.
- Files touched: `index.html`, `style.css`. Other working-tree changes (blog posts, loanos-waitlist, _redirects, etc.) left untouched — not part of this perf pass.

## 2026-04-16b — Rate-check form fix (end-to-end pipeline restored)

- rate-check.html: submit handler rewritten — reads PDF via FileReader, base64-encodes it, POSTs as `application/json` instead of multipart/form-data. No UX change (still upload PDF + submit).
- n8n workflow `Pf1zWuKAnD4SznSR` (LoanOS — Rate Check Form Submission):
  - Webhook upgraded to typeVersion 2.1; removed `binaryData: true`; now receives JSON body with all 11 form fields intact.
  - Added "Decode PDF" Code node between Set Fields and downstream nodes — rehydrates `loan_estimate_base64` into a proper `application/pdf` binary attachment.
  - Insert Contact body: added `user_id` and `organization_id` (tenancy fields required by NOT NULL constraint).
  - Log Activity body: added `organization_id`.
  - Both Supabase HTTP nodes: flipped `neverError` from true → false so future failures surface in execution history instead of silently reporting success.
- Root cause: three stacked bugs. (1) n8n webhook v2 + multipart was dropping fields 4–10 and mashing the PDF into a corrupt binary blob. (2) Missing tenancy fields caused silent `23502` NOT NULL violations on every insert. (3) `neverError: true` masked both so the workflow reported success while nothing landed.
- Verified end-to-end on exec 5213: contact row in `contacts`, activity row in `activity_log`, Outlook notification with PDF attached received at adam@thestyerteam.com. 5 synthetic test rows cleaned from Supabase.

## 2026-04-16 — Daily optimization (TOMORROW_PRIORITY: Kyle + Buda H2 audit + homepage hero CTA fix)

- kyle-mortgage-lender.html: 3 H2s converted to question format; at-a-glance block added (Hays County, Kyle ISD, Amazon + Tesla corridor, Plum Creek/6 Creeks/Anthem/Crosswinds/Steeplechase, $280K–$380K)
- buda-mortgage-lender.html: 3 H2s converted to question format; at-a-glance block added (Hays County, Hays CISD + Hays HS, Tesla corridor, Garlic Creek/Sunfield/Ruby Ranch, $300K–$440K); /calculators body link added; body CTA + footer Apply Now fixed raw app URL → /get-preapproved
- index.html: Homepage hero "Apply Now" CTA fixed from raw app URL → /get-preapproved (LOW blocker resolved — closes active CONTEXT.md blocker)
- sitemap.xml: Kyle lastmod 2026-04-12 → 2026-04-16; Buda lastmod 2026-03-27 → 2026-04-16
- Thursday funnel audit: contact.html ✅, thank-you.html ✅, 3 pages internal links ✅
- Self-review: PASS — 4 files, 0 issues. Deploy verified: kyle 200 ✅, buda 200 ✅

## 2026-04-15b — Daily optimization (Wednesday rotation: Georgetown + Pflugerville suburb AEO)

- georgetown-mortgage-lender.html: 5 H2s converted to question format ("Why Work With?", "Why Should...Use?", "What Loan Programs?", "What Should...Know?", "How Does the Process Work?")
- georgetown-mortgage-lender.html: Added /calculators body link in New Construction paragraph
- pflugerville-mortgage-lender.html: 4 H2s converted to question format (5th "How to Get a Mortgage" already correct)
- pflugerville-mortgage-lender.html: Added Pflugerville at-a-glance block (Travis/Williamson split, PISD, Amazon+Samsung+NE Austin employers, 6 neighborhoods, commutes, $320K–$420K)
- pflugerville-mortgage-lender.html: Added /calculators body link in Price Range paragraph
- sitemap.xml: Georgetown + Pflugerville lastmods 2026-04-12 → 2026-04-15
- Deploy verified: both pages 200 ✅. Self-review: PASS — 3 files, 0 issues.

## 2026-04-15 — Daily optimization (Wednesday rotation: Cedar Park + Leander suburb AEO)

- cedar-park-mortgage-lender.html: 3 H2s + 2 H3s converted to AEO question format
- cedar-park-mortgage-lender.html: Added Cedar Park at-a-glance block (Williamson/Travis split, Leander ISD A-rated, Apple/Dell/IBM employers, 183A, neighborhoods: Buttercup Creek, Twin Creeks, Anderson Mill, Riviera Ridge, Carriage Hills)
- cedar-park-mortgage-lender.html: Corrected TEA rating language from outdated "Exemplary" → "A-rated"
- leander-mortgage-lender.html: 5 H2s converted to AEO question format (at-a-glance block already present)
- sitemap.xml: cedar-park lastmod 2026-03-27 → 2026-04-15; leander lastmod 2026-04-12 → 2026-04-15
- Full Cedar Park audit: all core checks PASS — form, FAQPage, BreadcrumbList, H1, /get-preapproved links, AEO paragraph
- Self-review: PASS — 4 files, 0 issues

## 2026-04-14 — Daily optimization (Wednesday rotation: Round Rock suburb deep dive)

- round-rock-mortgage-lender.html: H2s/H3 converted to question format for AEO ("Why Should...?", "What Loan Programs...?", "What Are Home Prices...?")
- round-rock-mortgage-lender.html: Added "Round Rock at a glance" city enrichment (RRISD schools, Williamson County tax context, employer list, neighborhoods)
- sitemap.xml: round-rock-mortgage-lender.html lastmod updated 2026-03-27 → 2026-04-14
- Round Rock full audit: all core checks PASS — form, FAQPage, BreadcrumbList, H1, /get-preapproved links, AEO paragraph, answer-first FAQs
- Self-review: PASS — 2 files, 0 issues

## 2026-04-14 — Daily optimization (Tuesday title/meta audit)

- Title tag audit: 6 loan/resource pages standardized to "[Loan Type] in Austin TX | Adam Styer | NMLS #513013"
- Fixed: first-time-home-buyer.html (NMLS added), austin-down-payment-assistance.html (Adam Styer added), fixed-vs-adjustable.html (Adam Styer added), how-to-buy-a-house-in-austin-tx.html (Adam Styer added + meta updated), closing-costs-texas.html (Adam Styer added), improve-credit-score.html (NMLS + format corrected)
- mortgage-broker-vs-bank.html: Article schema dateModified updated 2026-02-26 → 2026-04-14
- Sitemap: 200 ✅ | Self-review: PASS — 7 files, 0 issues

## 2026-04-14 — Homepage form wiring to subscribe-lead.js

- Quick Quote form (hero): now calls `/.netlify/functions/subscribe-lead` in parallel with Netlify POST → Mailchimp tag `quick-quote-lead` + LoanOS contact creation on submit
- Quick Contact form (bottom): same pattern → Mailchimp tag `quick-contact-lead` + LoanOS contact creation
- Netlify backup POST preserved on both forms; UTM params forwarded; error handling non-blocking
- Commit `1bb1ef1` deployed to Netlify

## 2026-04-13 — Daily optimization (Monday schema + Hutto Kingmaker)

- Schema audit: homepage, about, Hutto, DSCR all clean; AggregateRating 136 confirmed
- hutto-mortgage-lender.html: added Cottonwood Creek + Brushy Creek trail mentions — hyper-local depth vs Big Life template
- mortgage-broker-vs-bank.html: added BreadcrumbList JSON-LD schema (was missing despite visual breadcrumb)
- sitemap.xml: fixed pre-existing domain typo on hutto entry (styremortgage→styermortgage); hutto lastmod updated
- Commit 9559a14 — 3 files, both pages verified 200 post-deploy
- Blog title lint: CLEAN

## 2026-04-13 — Week 6 competitive intelligence run

- SERP check: 9 keywords (7 core Austin + Hutto + Liberty Hill)
- **FIRST TOP-10 RANKING: styermortgage.com #3 for "hutto tx mortgage lender"** — suburb page indexing confirmed working
- Confirmed Big Life's Hutto page is weak (25 reviews schema, no local neighborhoods) — beatable
- Liberty Hill: Guild Mortgage holds #1 + #2 with physical branch at 13563 Hwy 29 W — organic-only target
- New threat: MortgageAustin.com ranking #3 for "mortgage broker austin tx" with "broker vs bank" blog content
- Sente Mortgage dropped from #1 "mortgage lender austin tx" (Vista Lending new #1)
- Lone Star Financing now #1 for "get pre-approved austin tx"
- Full report: `run-logs/competitive/2026-04-13.md`
- Updated learnings.md with suburb ranking + review schema patterns
- Updated TODO.md with Hutto page strengthening + Liberty Hill content priorities

## 2026-04-12 — Rate Check SEO expansion: 5 city pages + 10 blog posts

### City rate-check landing pages (Phase 2)
- `/rate-check-round-rock.html` — Round Rock + Pflugerville (I-35 corridor, new construction, tech relocations)
- `/rate-check-cedar-park.html` — Cedar Park + Leander (183A corridor, LISD, Apple campus proximity)
- `/rate-check-georgetown.html` — Georgetown + Hutto (Sun City, USDA-eligible areas, GISD)
- `/rate-check-buda-kyle.html` — Buda + Kyle + San Marcos (south corridor, affordability, first-time buyers)
- `/rate-check-new-braunfels.html` — New Braunfels (Comal County growth, flood zones, Vintage Oaks)
- Each page: same upload form + n8n webhook, hidden `source` field for attribution, unique content, MortgageLender + FAQPage + BreadcrumbList JSON-LD, dataLayer events with city-specific lead_source

### Rate shopper blog content cluster (Phase 3)
- `blog/can-i-switch-lenders-after-going-under-contract-texas.html`
- `blog/how-to-compare-two-mortgage-offers.html`
- `blog/apr-vs-interest-rate-what-actually-matters.html`
- `blog/are-mortgage-lender-fees-negotiable.html`
- `blog/how-many-mortgage-quotes-should-i-get.html`
- `blog/local-lender-vs-online-lender-austin-central-texas.html`
- `blog/what-delays-closing-when-you-switch-lenders.html`
- `blog/how-to-read-a-loan-estimate.html`
- `blog/what-to-compare-besides-mortgage-rate.html`
- `blog/is-the-lowest-rate-the-cheapest-loan.html`
- Each post: Article + FAQPage + BreadcrumbList schema, AEO intro, CTAs to rate-check hub/city pages, 600-1400 words

### Internal linking (Phase 4)
- Added "Serving All of Central Texas" section to rate-check.html with links to all 5 city pages
- Added "Rate Shopping Resources" section to rate-check.html with links to 4 key blog posts
- Updated blog.html CollectionPage schema with 10 new posts
- Updated blog.html noscript block with 10 new posts
- All blog posts cross-link to rate-check hub + adjacent posts
- All city pages link back to rate-check hub

### Sitemap + infrastructure
- Added 5 city pages + 10 blog posts to sitemap.xml (15 new URLs)

## 2026-04-12 — Rate Check page + n8n workflow

- Created `/rate-check.html` — "Get a Second Opinion on Your Mortgage Rate" landing page
- Full SEO: MortgageLender, FAQPage (5 Qs), BreadcrumbList JSON-LD schemas
- OG tags, Twitter cards, canonical, meta description
- Upload form (7 fields + PDF upload + optional notes) → n8n webhook via `fetch()` + `FormData`
- Client-side validation with inline error messages, `generate_lead` GTM event on success
- Hero with dual CTAs (Calendly + form anchor), How It Works 3-step section, FAQ section, trust bar
- Added "Rate Check" nav link to 102 pages (between "About Adam" and "For Realtors")
- n8n workflow `Pf1zWuKAnD4SznSR` created and activated:
  - Webhook (POST, binary data) → Set Fields → Insert Contact (Supabase) + Log Activity (Supabase) + Send Notification Email (Outlook) → Respond to Webhook (200 JSON)
  - Supabase nodes: `neverError: true` for continue-on-error behavior
  - Webhook URL: `https://styer.app.n8n.cloud/webhook/rate-check-submission`

## 2026-04-12 (scheduled) — GBP Weekly: Client Story (Week 15)

- GBP post published to Publer (GBP only, job 69dba83df50f031661e715a0) — 199 words, Client Story theme, Week 15
- FB/IG/LI platform adaptations inserted as status:draft in social_drafts (awaiting Adam's approval)
- 4 activity entries logged in social_activity
- Master growth log appended + NotebookLM source refreshed (source 1b4db2f3)
- Saved to run-logs/gbp-posts/2026-04-12.md
- Schema note: social_drafts platform check constraint does not include google/gbp — GBP recorded via activity log only

## 2026-04-12 (scheduled) — Monday rotation: AEO body paragraphs + DSCR BreadcrumbList

- dscr-loan-austin-tx.html — Added BreadcrumbList JSON-LD schema (Home → Investment Loans → DSCR Loans Austin TX)
- blog/2026-04-01-how-to-choose-a-mortgage-lender-austin-tx.html — Added AEO answer-first paragraph (was missing entirely)
- blog/2026-04-03-condo-mortgage-austin-tx.html — Added AEO answer-first paragraph to article-body (styled header paragraph didn't qualify)
- sitemap.xml — Updated lastmod to 2026-04-12 for all 3 changed files
- Commit 7b8906e — all 3 pages verified 200 ✅ post-deploy

## 2026-04-11b (scheduled) — Construction page AEO + builder process walkthrough

- loans/construction.html — Added AEO answer-first paragraph (one-time close, down payment summary, interest-only payments during build)
- loans/construction.html — Added "The Build Process: What to Expect" section (6-step walkthrough from pre-approval through CO + loan conversion, Austin builder examples)
- loans/construction.html — Updated schema dateModified: 2026-02-25 → 2026-04-11
- sitemap.xml — Added lastmod 2026-04-11 to construction.html entry
- Commit 811028f — verified 200 ✅ post-deploy
- Blog QA: 2026-04-10-fha-loan-requirements-texas-2026.html — PASS (title 60 chars, meta ~153 chars, canonical ✅, body AEO ✅, synced to sitemap/manifest/blog.html)

## 2026-04-11 (scheduled) — City enrichment: Marble Falls at a glance

- marble-falls-mortgage-lender.html — Added "Marble Falls at a glance" paragraph: Marble Falls ISD (3 campuses), commute times via US-281, neighborhood price ranges ($280K–$1.2M+ lakefront)
- sitemap.xml — lastmod updated for marble-falls-mortgage-lender.html (2026-03-27 → 2026-04-11)
- Florence confirmed already had "at a glance" section — no changes needed
- All 25 suburb pages now complete with city enrichment ✅
- Commit fbb0dd6 — marble-falls page verified 200 ✅ post-deploy

## 2026-04-10c (scheduled) — City enrichment: Liberty Hill + Elgin

- liberty-hill-mortgage-lender.html — "Liberty Hill at a glance" paragraph: Liberty Hill ISD campuses, SH-183A/US-183 commutes, 4 community price ranges
- elgin-mortgage-lender.html — "Elgin at a glance" section: Elgin ISD campuses, US-290/SH-130 commutes, 4 neighborhood price ranges
- sitemap.xml — lastmod updated for both pages
- Commit 9c4ef30 — both pages 200 ✅ post-deploy

## 2026-04-10b (scheduled) — Weekly content: FHA Loan Requirements

- New blog post: `blog/2026-04-10-fha-loan-requirements-texas-2026.html` — 1,050 words, 6-question FAQPage schema, AEO answer-first paragraph, question-format H2s, blog title lint PASS
- Updated blog/manifest.json, blog.html noscript + CollectionPage schema (position 1), sitemap.xml
- Queued 3 social drafts to LoanOS Marketing Dashboard (LinkedIn, Facebook, Instagram) — status: draft, pending Adam's review
- Commit dae4128 — Netlify deploy triggered

## 2026-04-10 (scheduled) — Friday AEO audit + city enrichment

- Doc checklist blog post: added answer-first `<p><strong>` body paragraph (blog-post-intro class is AEO anti-pattern — fixed)
- Doc checklist: converted 2 statement H2s to question format ("What Documents Do W-2 Employees Need?" + "What Are the 5 Things That Slow Down a Mortgage Closing?")
- New Braunfels: added "at a glance" paragraph (dual ISD campuses, commute times, neighborhood prices)
- Lakeway: added "at a glance" paragraph (Lake Travis ISD campuses, commute times, neighborhood prices)
- sitemap.xml: lastmod updated for all 3 files to 2026-04-10
- Commit c098541 — all 3 pages verified 200 post-deploy ✅

## 2026-04-09b (scheduled) — AEO completion + Thursday funnel audit

- Added AEO answer-first paragraph to buda-mortgage-lender.html (Hays County affordability + FHA/conventional angle)
- Added AEO answer-first paragraph to westlake-mortgage-lender.html (jumbo + portfolio lenders angle)
- AEO coverage: 25/25 suburb pages complete ✅
- Added /calculators.html link to first-time-home-buyer.html pillar section (was 1 body link → now 2)
- Funnel audit: homepage → /get-preapproved → /thank-you all clean; contact.html dataLayer event ✅; thank-you 3-step section ✅
- Commit 7e3b2fa — all 3 pages verified 200 post-deploy ✅

## 2026-04-09 (scheduled) — AEO: San Marcos + Wednesday suburb audit

- Audited Round Rock: all clean — H1, FAQPage, BreadcrumbList, hero quick-form, trust badge, AEO ✅
- AEO grep across all 25 suburb pages: confirmed 13/25 have answer-first paragraph
- Added AEO answer-first paragraph to san-marcos-mortgage-lender.html (USDA + investment angle)
- Identified Buda + Westlake as remaining AEO gaps — deferred to Thursday run
- Blog title lint: CLEAN (only temp-placeholder + template show up)
- Sitemap: 200 ✅ — Commit 55d6797, San Marcos 200 post-deploy ✅

## 2026-04-09 AM — City enrichment at-a-glance paragraphs

- Added at-a-glance paragraph to spicewood-mortgage-lender.html (Lake Travis ISD, SH-71 commutes, price ranges $400K–$3M+)
- Added at-a-glance paragraph to florence-mortgage-lender.html (Florence ISD, FM 487/I-35 commutes, acreage $260K–$460K)
- Added at-a-glance paragraph to jarrell-mortgage-lender.html (Jarrell ISD, I-35 commutes, new construction $280K–$430K)
- Fixed pre-existing Spicewood meta description (156→155 chars — trailing period removed)
- Commit 06fbfad — 3 pages updated, QA clean ✅

## 2026-04-08 (morning) — AEO answer-first paragraphs + funnel audit

- Added AEO answer-first paragraphs to Elgin, Florence, Jarrell, Marble Falls (new content-narrow section between hero and feature grid on each)
- Funnel audit clean: homepage→/get-preapproved→/thank-you, contact.html form + dataLayer verified
- Internal linking audit: about.html, dscr, austin-mortgage-rates all have 20+ internal links ✅
- AEO coverage now 11/25+ suburb pages confirmed
- Commit c3967c4, all 4 pages 200 post-deploy ✅

## 2026-04-08 — Conversion tracking fix + blog slug cleanup

- Fixed suburb quick-form conversion tracking: broadened analytics.js form selector to catch all `data-netlify="true"` forms, moved `thank_you_page_view` dataLayer push into script.js success handler (fires after confirmed Netlify submission, before redirect)
- Added fallback form detection in script.js `initHeroQuickForm()` for suburb pages without `#hero-quick-form`
- Converted `blog/2026-03-30-temp-placeholder.html` to meta-refresh redirect → canonical URL (noindex, nofollow)
- Google Ads conversion tracking now fires correctly: `generate_lead` on submit → `thank_you_page_view` on success

## 2026-04-08 PM — AEO answer-first paragraphs (Cedar Park, New Braunfels, Bastrop, Bee Cave)

- Added AEO answer-first `<strong>` paragraph to cedar-park-mortgage-lender.html (before first H2)
- Added AEO answer-first `<strong>` paragraph to new-braunfels-mortgage-lender.html
- Added AEO answer-first `<strong>` paragraph to bastrop-mortgage-lender.html
- Added AEO answer-first `<strong>` paragraph to bee-cave-mortgage-lender.html
- Tuesday title/meta audit: all 8 loan pages + homepage clean, no regressions
- Blog title lint: clean — no posts missing brand
- Commit f8ca0f3 — 4 files, 8 insertions, deploy verified ✅

## 2026-04-08 AM — Glossary nav + loan page links + city enrichment

- Added mortgage-glossary.html to Resources nav dropdown across 64 pages (batch Python replace)
- Added glossary internal link to "Helpful articles" on conventional.html, fha.html, va.html
- Added glossary link to DSCR page investment section ("Unfamiliar with terms like DSCR, LTV...")
- City enrichment "at a glance" paragraphs: Bee Cave (Lake Travis ISD, commutes, neighborhood ranges), Manor (Manor ISD, Tesla/Samsung commutes, ShadowGlen/Presidential prices), Smithville (Smithville ISD, commutes, in-town vs acreage prices)
- Commit e4ee80b — 65 files, 83 insertions

## 2026-04-07 (Monday run) — Schema audit + Round Rock AEO

- Added LocalBusiness schema block to about.html (was missing; Person-only was the gap)
- Added AEO answer-first paragraph to round-rock-mortgage-lender.html
- Homepage Person schema confirmed present (learnings.md entry was stale)
- Sitemap 200 ✅, blog lint clean ✅
- NotebookLM returned Google Ads optimization advice (RSA assets, negative keywords, radius targeting)

## 2026-04-07 — Meta description fixes + suburb AEO paragraphs

- Fixed 6 loan page meta descriptions (va LONG 181→153, conventional/fha/refinance/usda/products all expanded to 150-160 range)
- Added AEO paragraphs to Taylor, Smithville, Spicewood suburb pages

## 2026-04-06 — Homepage AEO + Person schema + suburb AEO batch

- Added 54-word answer-first paragraph to homepage before "Why Choose" section
- Added Person schema JSON-LD (Adam Styer, NMLS, sameAs links)
- Added AEO paragraphs to Manor, Dripping Springs suburb pages
- Liberty Hill AEO body paragraph added (hero-subtitle alone doesn't satisfy AEO)

## 2026-04-05 — Suburb hero CTA batch fix + AEO additions

- Patched 17 suburb hero-cta-primary buttons to /get-preapproved (prior fix missed hero CTAs)
- Added AEO paragraph + /calculators link to Lakeway
- Added AEO paragraph + /calculators link to Hutto
- Fixed blog title tags: self-employed, housing market, spring market posts

## 2026-04-04 — Suburb H1 audit complete

- Verified all 24 suburb pages: zero have "Serving" H1 anti-pattern

## 2026-04-03 — Sitemap submitted to GSC

- sitemap.xml submitted to Google Search Console, status: Success

## 2026-04-02 — CTA audit + resource page fixes

- first-time-buyer-guide final CTA → /get-preapproved (was raw app URL)
- Cedar Park hero "Apply Now" → /get-preapproved
- austin-down-payment-assistance: 2 body CTAs fixed

## 2026-04-01 — Major CTA + schema + content distribution overhaul

- All 8 loan page hero + bottom CTAs routed to /get-preapproved (/refinance for refinance page)
- All 24 suburb body + footer CTAs routed to /get-preapproved
- thank-you.html: 3-step "What Happens Next" section added
- Confirmed TCPA checkboxes present on all 24 suburb pages
- Content distribution system activated (Tier 1 + Tier 2 auto-posting)
- Suburb page inventory in context updated from 9 → 24

## 2026-03-30 — Blog manifest + title fixes

- Blog manifest updated with March 30 FTB post
- Title tag fixes: refinance-quote pipe, FTB post brand name
- Westlake title trimmed 99→61 chars, Buda title trimmed 104→51 chars

## 2026-03-29 — VA loan eligibility blog post

- Published: VA Loan Eligibility Texas 2026 with Article + FAQPage schema

## 2026-03-26 — Homepage H1 + trust bar standardization

- H1 changed from "Your Austin Home Loan Simplified" → keyword-rich NMLS title
- Trust bar standardized to "Licensed in Texas | NMLS #513013" across 39 pages

## 2026-03-25 — Austin mortgage rates evergreen page

- New /austin-mortgage-rates page with Article + FAQPage + BreadcrumbList schema

## 2026-03-24 — Contact form + homepage FAQ + conversion tracking

- Contact form wired to Netlify Forms with generate_lead event
- Homepage FAQPage schema (5 questions) + accordion section
- TCPA consent checkbox on /get-preapproved and /refinance-quote
- Thank-you fonts converted to async preload
- NMLS# standardized across title tags (# symbol, consistent format)

## 2026-03-23 — Google Ads sitelinks + schema batch

- Sitelinks applied to Search-1 campaign
- BreadcrumbList schema added to 9 suburb + 7 loan pages
- FAQPage schema added to surrender + AI trap blog posts
- Phone chip added to trust bar on landing pages
- "What happens next" 3-step section on both landing pages
- Loan page title tags: NMLS# added to all 6 remaining + 9 suburb pages

## 2026-03-22 — Mobile optimization + compliance

- Landing page forms: `order: -1` on mobile (form above headline)
- noindex added to /get-preapproved + /refinance-quote
- Copyright year updated 2025→2026 on 7 pages
- Thank-you page: phone number added

## 2026-03-21 — Performance + schema verification

- Homepage LCP fix: adam-cutout.png 5MB → picture element with media query (mobile data URI, desktop 46KB WebP)
- hero-bg.jpg compressed 1.7MB → 146KB
- Google Fonts async on landing pages
- FAQPage schema verified on Round Rock + Cedar Park (Rich Results Test passed)
- /mortgage-pre-approval-austin confirmed exists

## 2026-03-20 — GTM + GA4 + conversion tracking rollout

- GTM-PQQ6PGLR installed on all 54 public pages
- GA4 (G-DDY0H0319S) firing via GTM
- Conversion events verified: generate_lead, thank_you_page_view, phone_click
- /get-preapproved, /refinance-quote, /thank-you pages live
- Homepage final CTA linked to /get-preapproved
- DSCR page: calculators link added, CTA fixed
- Refinance page: "Get a Refi Quote" button added
- Blog manifest: ai-trap post added

## 2026-03-19 — Lead capture pages + initial tracking

- /get-preapproved and /refinance-quote pages built and verified
- /thank-you page with thank_you_page_view event
- phone_click global handler wired in script.js

## 2026-04-12 (run 2) — AEO answer-first paragraphs: 5 suburb pages

- `kyle-mortgage-lender.html` — Added AEO answer-first section (new dedicated section before WHY KYLE)
- `leander-mortgage-lender.html` — Added AEO answer-first paragraph before H2 in intro section
- `pflugerville-mortgage-lender.html` — Added AEO answer-first paragraph before H2 in intro section
- `georgetown-mortgage-lender.html` — Added AEO answer-first paragraph before H2 in intro section
- `austin-area-mortgage-lender.html` — Added AEO answer-first paragraph before intro paragraph
- `sitemap.xml` — Updated lastmod to 2026-04-12 for all 5 changed pages
- Commit 32c2ae3 — all 5 pages verified 200 ✅

## 2026-04-21 — Pre-approval AEO + Refinance Texas cash-out FAQ (daily-opt)

- `mortgage-pre-approval-austin.html` — added 53-word AEO answer-first paragraph before first H2 with same-day pre-approval hook; dateModified 2026-04-21
- `loans/refinance.html` — added "How does a Texas cash-out refinance work in 2026?" to FAQ accordion + FAQPage schema (6 questions total); dateModified 2026-04-21
- `sitemap.xml` — lastmod updated to 2026-04-21 for both pages
- Blog title lint: CLEAN; self-review: PASS

## 2026-04-23 — Pflugerville suburb editor (daily-opt, queue #5)

- `pflugerville-mortgage-lender.html` — Blackhawk neighborhood spotlight (78660, GFO/Chesmar/Coventry builders, $465K+ new construction, sourced Homes.com); school ratings H3 (Hendrickson HS 8/10, Pflugerville HS 6/10, GreatSchools linked); employer list H3 (Amazon 1,000 jobs PCDC cited, Costco, Baylor Scott & White, Samsung Taylor via US-130); closing cost breakdown at $355K median (Travis County recording ~$150, PISD $1.1069/$100 cited, ~2.0–2.1% combined rate); updated median price to $355K Mar 2026 (Redfin, cited in intro + market context + FAQ); removed "Down Payment Assistance" loan card (verbatim match Georgetown + Smithville — confirmed via grep); fixed USDA from LocalBusiness schema description; added WebPage schema + dateModified 2026-04-23

## 2026-05-05 — Non-QM SEO expansion (Phases 1–5)

- **7 new pages built** with deep research-backed copy: `non-qm-loans.html` (hub), `dscr-loans-texas.html`, `dscr-loans-fredericksburg-tx.html`, `dscr-loans-dripping-springs.html`, `bank-statement-loans.html`, `high-net-worth-mortgage.html`, `investor-loans.html`. Hub-and-spoke architecture; each spoke targets a specific borrower scenario or geography rather than templated near-duplicates.
- **Nav restructured site-wide** — added "Loan Programs" dropdown across 66 files. Header + footer normalized.
- **USDA deprioritized** — page noindexed (not deleted); removed from nav dropdown across all 66 files; removed from `products.html` loan card grid. Less disruptive than 301/delete; reversible if Adam ever does USDA again.
- **about.html NAP fix** — LocalBusiness schema address aligned to canonical 5718 Sam Houston Circle (was 5900 Balcones, multi-run flagged blocker now closed).
- **Internal linking** — hub-and-spoke pattern wired into `index.html`, `products.html`, `dscr-loan-austin-tx.html`, `self-employed-mortgage-austin.html`, `austin-mortgage-rates.html`.
- **Sitemap updated** — 7 new URLs added with 2026-05-05 lastmod (hub priority 0.9, spokes 0.8). USDA URL removed since noindexed.
- **Skipped:** `dscr-loans-nationwide.html`. Adam is TX-licensed only; CFPB/UDAAP risk on state-level licensing claims. Out-of-state investors find `dscr-loans-texas.html` instead.
- **Voice decision:** HNW page = warm conversational (consistent with rest of site), not cold private-banking tone. Sophisticated borrowers can read sophistication without being talked down to.

## 2026-05-08 — daily-opt Friday (Content Planning + AEO Review)

- Re-Verify Gate auto-resolved 1 stale carry: `how-to-buy-a-house USDA cleanup` — both URL variants (`-2026.html` and `.html`) return HTTP 404, page does not exist on site or in repo, phantom for 5+ runs.
- Self-review correction: initial auto-resolution of `about.html 91/45` claim under date-span framing was wrong. Real claim is GBP/Zillow review-count breakdown (lines 576, 755-756) — sums to 136+ stated elsewhere (internally consistent) but may drift vs live counts. Tagged UNVERIFIED:2026-05-08; stays in FLAG_FOR_ADAM (Adam's GBP/Zillow access required).
- Audited all 31 blog posts for funnel-CTA presence (path-agnostic grep covers absolute + relative); 31/31 pass.
- AEO sample audit on `2026-04-27-why-home-prices` + `2026-04-17-should-i-refinance`. Re-framed "why-home-prices structural decision" carry: post HAS `/get-preapproved` via relative `../get-preapproved`; actual gap is missing `/refinance-quote` + relative-vs-absolute path inconsistency.
- Blog cadence Day 11 reset per GOALS.md week-of-04-20 directive ("No new content on any site this week"); will re-evaluate Mon 2026-05-11 GOALS refresh.
- Conversion programmatic trace re-passed (15/21/5/14 markers across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`); sitemap 200; products.html hero+bottom CTAs still propagated.
- 0 file modifications; self-review PASS; NotebookLM script 24th miss.

## 2026-05-09 — daily-opt Saturday (no-rotation drift sweep)

- Saturday no-rotation by design: Re-Verify Gate + sitemap + conversion + Step 4B sweep + Adam Friday-commit propagation check at 24h. Zero file modifications to repo.
- Sitemap 200; conversion 9/10 across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you` with all critical tokens (generate_lead, purchase_prequal/refi_quote, TCPA, Netlify Functions wired, GTM, dataLayer).
- Re-Verify Gate: 11 carries checked — 6 STILL OK, 4 STILL OPEN (products.html 7 in-card 1003, working-tree style.css, NotebookLM script, why-home-prices CTA structure 8th recurrence), 1 STILL UNVERIFIED (about.html 91/45). No drift, no auto-resolutions.
- Adam's 2 Friday commits sanity-checked at 24h: `0230947` April housing post (3 `/get-preapproved` + 1 `/refinance-quote`), `3daf874` Hutto Round 2 (4 `/get-preapproved`). Both holding live, sitemap lastmod fresh.
- Blog CTA coverage 31/31 ✅; SEO/SEM ZERO/LOW_RISK queue still empty.
- NotebookLM script 26th consecutive missing; auth expired on master-log source refresh (known carry, HIGH FLAG_FOR_ADAM).
- Self-review PASS — 0 modifications, hard constraints intact.

## 2026-05-15 NIGHT — daily-opt (Friday — THIRD same-day fire 23:09)
- Third Friday fire on 2026-05-15 (AM 09:49, PM 09:53, NIGHT 23:09; PM→NIGHT gap = 13.3h). Friday rotation already done twice today. Third-fire bonus drift sweep — every-run non-negotiables only.
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens across 4 pages (homepage / get-preapproved / refinance-quote / thank-you). GTM single-container hex `GTM-PQQ6PGLR` verified.
- Re-Verify Gate: 16 carries — all STILL OK / STILL OPEN. No drift, no auto-resolutions, no false regressions. AM Tuesday meta fixes (FTB 158c, DPA 161c, Pflugerville 151c) STILL LIVE.
- PSI quota 8-of-8 drain held; skipped retry to preserve potential Monday-refresh window. NotebookLM script 38th consecutive missing check.
- Scheduler reliability escalated MEDIUM → HIGH FLAG_FOR_ADAM: Thursday 2026-05-14 no-fire + Friday 5/15 triple same-day fires confirms pattern, not flakiness. Manual scheduler review warranted.
- Self-review PASS — 0 site files modified, hard constraints intact, style.css working-tree (Adam's nav-dropdown fix) preserved untouched.

## 2026-05-18 (Monday 07:09 CDT — styer-site-daily second pass)
- **Phase A residual:** Retired fabricated AggregateRating JSON-LD blocks on 6 loan-type pages + Dripping Springs (`loans/{construction,jumbo,usda,va,fha,investment}.html`, `dripping-springs-mortgage-lender.html`). Commit `0cc148a` deployed and live-verified on all 7 URLs (HTTP 200, AggregateRating=0, reviewCount136=0). JSON-LD validity confirmed via Python `json.loads` on all blocks post-edit. Site-wide user-facing AggregateRating exposure now 0/8.
- **Auto-resolved:** about.html "91 Google / 98 Zillow / 45 Zillow" body-copy — all three tokens now 0× live. Audit finding #4 body-copy fully cleared on about.html.
- **Deferred:** `/investor-loans` + `/high-net-worth-mortgage` title rewrites (12-run carry). Previous pass approved Tuesday self-execute; this pass declined per GOALS.md Phase B impending name swap. Adam decision required: rewrite now for SEO consistency or wait for the name swap?
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens across 4 pages. GTM single-container hex verified.
- Self-review PASS — 7 site files modified, all JSON-LD block removals + 1 trailing-comma trim. Hard constraints intact.

## 2026-05-21 (styer-site-daily — Thursday rotation)

- **Phase B residual scrub:** Removed last "Styer Team" wording sitewide. `realtors.html:189` team-office.jpg alt attribute now reads "Adam Styer at his Kyber Mortgage Corporation dba HyperSmart Home Loans office in Austin, Texas". Commit `276b894` deployed; verified live in ~1s, HTTP 200.
- **Site-wide entity scrub confirmed clean:** 0 "Mortgage Solutions LP", 0 NMLS 2526130, 0 "Styer Team" sitewide. Adoption of HyperSmart + Kyber + NMLS #2653540 healthy across homepage + /get-preapproved + /refinance-quote + /thank-you.
- **Thursday rotation — Internal Linking + Funnel Flow:** 3 complicated-income pages audited (self-employed, DSCR, bank-statement). All hit ≥2 high-intent CTAs (/scenarios + /calculators + /contact). thank-you.html structure intact (Calendly + tel + 3 next-step markers). contact.html wiring intact (Netlify + form-name + dataLayer).
- **New finding:** homepage has 0 direct CTAs to `/get-preapproved` or `/refinance-quote` post-`71b8590` hero cleanup. Routes go direct to loan-app URL + tel:. Flagged for Adam.
- **Sitemap + robots 200 ✅. Conversion tracking 10/10 ✅.**
- **NotebookLM script missing — 47th consecutive dead check.** PSI quota drain — 14th consecutive.
