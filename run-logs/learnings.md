# styermortgage.com — Accumulated Learnings

---

## 2026-04-07 — Person Schema Was Added to Homepage (Learnings Stale) + LocalBusiness Gap on About Page

### Patterns
- **Learnings.md schema entry was stale**: The 2026-04-06 entry noted "No Person schema on homepage." By 2026-04-07, Person schema (Block 3) was present. Monday schema audits should always verify live via grep, not rely on prior run notes. If a schema block exists and the type matches, mark it clean.
- **About page was the real schema gap**: Homepage had MortgageBroker + FAQPage + Person. About page had only Person — no LocalBusiness. The fix (a minimal LocalBusiness block with address, phone, aggregateRating) took one Edit call. Note: sameAs CID is a placeholder until Adam provides the real Google Maps CID.
- **Monday schema audit order matters**: Check homepage first (most important for AEO), then DSCR (FAQPage verification), then one rotating suburb. Track which suburb was last checked in TOMORROW_PRIORITY.
- **NotebookLM Google Ads query (Monday-only) returned successfully on sync call after background call failed**: Background process exits 127 (not found) sometimes due to path issues in scheduled context. Always have a sync fallback.

---

## 2026-04-06 — AEO Hero-Subtitle vs. Body Paragraph + Blog Title Drift at 10 Instances

### Patterns
- **Hero-subtitle class is NOT the same as an AEO body paragraph**: Suburb pages like Liberty Hill had answer-first text in `<p class="hero-subtitle">` in the hero section, but AI crawlers extract body content paragraphs, not hero UI elements. The Monday AEO audit now explicitly checks for a `<strong>` paragraph in the main content section (after `<!-- WHY [CITY] -->` comment, before first H2). A clean hero-subtitle does NOT satisfy the AEO requirement.
- **Blog title drift has now reached 10 confirmed instances — this is a systemic process failure**: The blog post creation template has never been corrected at the source despite 10+ fixes after-the-fact. The correct pre-publish lint command is: `grep "<title>" blog/YYYY-MM-DD-*.html | grep -v "Adam Styer"` — any hit = broken title. Until the template is fixed, run this grep at the start of every run against ALL blog/*.html files to catch same-day posts.
- **Homepage schema has two gaps worth tracking**: (1) No Person schema on homepage — only MortgageBroker/LocalBusiness + FAQPage. (2) No LocalBusiness schema on about page — only Person. Monday schema audit should flag if either of these diverges further. Adding Person schema to the homepage is a 1-block JSON-LD addition and would satisfy the "both pages have both schemas" target.
- **NotebookLM has timed out on two consecutive scheduled runs (Apr 5 + Apr 6)**: The cached insights are sufficient for daily decision-making but the timeout pattern suggests either network latency or library issues. When timed out, always log the cached NOTEBOOK_INSIGHTS block verbatim from the prior run so the next run inherits them.

---

## 2026-04-06 — Sente Mortgage Is the New Review Benchmark + Dripping Springs Wide Open

### Patterns
- **Sente Mortgage (1,448+ reviews) displaced Barton Creek Lending (506) as the Austin review leader**: They jumped to #1 for "mortgage lender austin tx" from nowhere. Review volume at this scale creates self-reinforcing authority — Google rewards review signals in local/YMYL verticals. The benchmark for competitive review count is now 3x higher than previously assessed.
- **Lone Star Financing is surging across multiple keywords simultaneously**: Appeared in top 3 for "mortgage broker" (#3), "home loan" (#2), and "refinance" (#2) — all keywords where they were absent last week. This pattern (multi-keyword jump in one week) suggests either a site-wide authority boost (new backlinks, domain age threshold) or coordinated on-page optimization. Monitor for new content or backlink activity.
- **Dripping Springs is the widest-open suburb keyword found in 5 weeks**: Zero dedicated mortgage lender pages in results — only individual LOs at banks and a realtor recommendation page. Compare to Buda (Big Life has a page), San Marcos (3 dedicated pages), or Westlake Hills (Quantum Loans). If our Dripping Springs page gets indexed first, it has the highest probability of any suburb keyword to rank immediately.
- **Suburb indexing at 5 weeks with 0 pages is now a confirmed technical emergency, not a patience issue**: Standard indexing for new pages on an established domain is 1-3 weeks. 5 weeks with zero suburb pages indexed — despite sitemap fix (commit 9313067, ~March 26) — suggests either (a) internal linking is too weak for Googlebot to discover and prioritize these URLs, (b) crawl budget is exhausted on higher-priority pages, or (c) there's a technical blocker (noindex, robots.txt, canonical issues). Must audit all three.

---

## 2026-04-05b — Suburb Hero CTA Class Was Missed in All Batch Fixes

### Patterns
- **`hero-cta-primary` is a distinct class from body CTAs and footer Apply Now links**: The 2026-03-31 batch fix (and prior manual fixes) targeted body CTAs with `btn-lg` class and footer `<li>Apply Now</li>` links, but completely missed the hero section's primary CTA button which uses class `hero-cta-primary hero-cta-btn`. This was live on 16 suburb pages until today (Apr 5). **Rule: when auditing CTAs, always grep separately for `hero-cta-primary`, `btn-lg`, `nav-cta`, and footer Apply Now — these are four distinct placement categories.**
- **The hero CTA suppresses Google Ads conversion tracking differently than body CTAs**: Body CTAs going to raw app URL skip the `generate_lead` event. The hero CTA going to raw app URL does the same — but the hero CTA is likely the highest-intent click on the page (above the fold, primary position). Fixing the hero CTA matters more per-click than body CTA fixes.
- **Verify grep patterns exhaustively before declaring a batch fix complete**: After any batch CTA sweep, run: (1) `grep -l 'mslp.my1003app' *-mortgage-lender.html` for any remaining raw URL, (2) check count per file — nav-cta (1) + hero-cta-primary (1) = 2 intentional raw URLs max per suburb page (nav is intentional, hero is now /get-preapproved). Zero remaining after today's fix.

---

## 2026-04-05 — AEO Answer-First on Suburb Pages + Blog Title Drift Persists

### Patterns
- **AEO answer-first applies to suburb pages too, not just blog posts**: The pattern (`<p><strong>[40–60 word direct answer]</strong> [1 context sentence]</p>`) was previously applied only to blog posts. Suburb pages open with narrative ("Hutto is one of the fastest-growing cities in Texas...") which AI crawlers skip. The answer-first paragraph should be the very first `<p>` inside the main content section, before the intro H2. Applied to Hutto today.
- **Blog title brand drift is now 9+ instances — it's the creation template, not operator error**: Three more posts (self-employed, housing market, spring market) were missing "Adam Styer |" in the `<title>` tag despite prior fixes. No post created outside a daily-opt run has ever had the correct format on first publish. The only reliable fix is a creation-time grep lint check.
- **In-body calculators link pattern**: Insert inline in the "Home Prices in [City]" paragraph as: "Use our [mortgage calculator](/calculators.html) to estimate your monthly payment at current rates for any [City] price point." Natural placement, adds value, no content disruption.

---

## 2026-04-04b — AEO: Blockquote + Bold = Best of Both Worlds

### Patterns
- **Combining blockquote-style + `<strong>` is the optimal AEO pattern**: The condo post had a properly-styled intro (border-left, 49 words, directly answers the title query) but was missing `<strong>` bold wrapping. Adding `<strong>` costs nothing visually — the border-left styling dominates — but sends an explicit semantic signal to AI crawlers. Rule: every blog post intro should have BOTH a visual pull-quote style AND `<strong>` wrapping on the direct-answer portion.
- **NotebookLM source refresh latency is real**: styermortgage-context.md was added as a source on April 4 morning, but the April 4 afternoon query still returned stale recommendations (H1 fix, GSC submission — both done weeks ago). Sources take more than one run to propagate into recommendations. Don't conclude that a refresh failed just because one query still returns old advice — check again in 2-3 runs.
- **Second-run pattern**: When the same day triggers two runs (e.g., manual trigger + scheduled), check latest.md first — if the major priority items are already done, focus on any outstanding TOMORROW_PRIORITY items rather than re-doing work.

---

## 2026-04-04 — "Serving" H1 Inventory Correction + AEO Applied to 2 Posts

### Patterns
- **Context file "Serving" H1 list was stale in both directions**: bastrop + bee-cave were listed as needing fixes but were already clean; taylor + new-braunfels were NOT listed but had "Serving" H1. After today's batch fix, zero suburb pages have the "Serving" anti-pattern. **Rule: always grep `Mortgage Lender Serving` across all suburb pages rather than relying on the context's list.**
- **Blog post title brand drift is now confirmed at 7+ instances**: The April 4 post was published with no brand in the title. This is not a one-off error — it's the blog post creation template. Until the template is fixed, grep every new post immediately: `grep "<title>" blog/YYYY-MM-DD-*.html | grep -v "Adam Styer"`.
- **AEO answer-first paragraph applied to spring market + April 4 market report**: Both posts now open with a 50-60 word bolded direct answer before the first H2/narrative. Pattern confirmed effective — apply to any new post at time of creation.
- **NotebookLM source deletion doesn't support --json flag**: `notebooklm source delete <id> --yes` works; `--yes --json` errors. Deletion itself succeeds.

---

## 2026-04-03b — AEO Answer-First Pattern Applied + San Marcos 3-Fix

### Patterns
- **Answer-first paragraph template**: Add a bolded 40-60 word direct answer as the FIRST paragraph of every blog post, before any narrative. Format: `<p><strong>[Direct answer to the title's implied question, 1-2 sentences.]</strong> [1 sentence of context/nuance.]</p>`. This is the extractable anchor for AI Overviews — narrative openers are skipped.
- **Question-format H2 conversion pattern**: Statement H2s ("What Lenders Actually Look At") → question H2s ("What Do Lenders Look At for Self-Employed Borrowers?"). Conversion increases AI citation likelihood and matches conversational search queries. Apply to all new posts going forward; retrofit in rotation.
- **Blog title tag brand drift is confirmed systemic**: April 2 (self-employed) and April 1 (spring market) posts both published missing "Adam Styer |" or "NMLS #513013". This is the 6th+ instance. The post creation template is the root cause — not a one-time error. Any new post must be grepped immediately: `grep "<title>" blog/YYYY-MM-DD-*.html | grep -v "Adam Styer"`.
- **San Marcos 3-fix pattern complete**: H1 "Serving" removal + hero CTA → /get-preapproved + /calculators body link. Same 3-fix pattern should be applied to remaining 6 suburbs: bastrop, bee-cave, hutto, lakeway, liberty-hill, manor.

---

## 2026-04-03 — Sitemap Never Submitted — 4-Week Indexing Gap

### Patterns
- **Sitemap must be verified in GSC on day one of any new site**: styermortgage.com had 24 suburb pages live and fully optimized for 4+ weeks before any were indexed, because sitemap.xml was never submitted to GSC. All SEO work during that period was real but produced zero ranking signal until today (Apr 3). GSC "Submitted sitemaps" showing 0–0 of 0 is an immediate red flag — check this the first run of any new site.
- **Monday rotation must include GSC sitemap status check**: Add to Monday checklist — verify sitemap.xml is submitted and returning Success in GSC. If status is "Couldn't fetch" or missing, fix before any other work.
- **Page quality work was not wasted — just delayed**: All schema, H1 fixes, CTAs, FAQPage markup is intact and will matter once indexing completes. The 4-week gap delayed the ranking clock, not the work itself.

---

## 2026-04-03 — AEO Blog Audit + Dripping Springs Suburb Fix

### Patterns
- **Blog posts lack answer-first intros for AI extraction**: Both audited posts (self-employed, spring market) open with storytelling/context instead of a direct 40-60 word answer to the primary query. AI Overviews and SGE extract the first clear, direct answer on a page — narrative openers get skipped. Rule: every blog post intro should open with 1-2 sentences that directly answer the title's implicit question, then expand.
- **H2s as statements vs. questions**: Post H2s like "What Lenders Actually Look At" and "The Problem With Writing Everything Off" are informative but not in the question format that AI engines use to match conversational queries. Reformatting as "What Do Lenders Look At for Self-Employed Borrowers?" increases AI citation likelihood. Apply to new posts going forward.
- **NotebookLM source refresh cadence**: After 3 consecutive runs recommending already-fixed items (H1 keyword, trust bar), the notebook sources are confirmed stale. Sources should be refreshed after major site changes complete — add updated context.md + recent run logs. Refresh frequency: monthly or post-major-milestone.
- **Dripping Springs suburb fixes now follow established pattern**: All three suburb improvements (H1 "Serving" removal, hero CTA → /get-preapproved, /calculators body link) were applied in one run. Same 3-fix pattern should be applied to remaining 7 suburbs.

---

## 2026-04-02b — Resource Page CTA Audit Complete + Netlify 503

### Patterns
- **Resource pages with raw nav CTAs are acceptable**: improve-credit-score.html and fixed-vs-adjustable.html only have raw loan app URL in the `nav-cta` anchor (standard site-wide nav pattern). Only body CTAs (`.btn.btn-primary` in article or section content) need to be converted to /get-preapproved. Nav CTAs are deliberate — they send high-intent readers directly to the 1003.
- **mortgage-pre-approval-austin.html is a borderline case**: This article specifically explains how to complete the 1003 application and has 5 body CTAs linking to the raw URL in instructional context ("Start here"). Unlike other resource pages, these links are embedded in instructional copy about the application itself. Decision deferred to Adam.
- **Netlify 503 pattern**: After push, site returned 503 for 2.5+ minutes on all pages including homepage. This may be a build failure OR a Netlify platform outage. Cannot diagnose from CLI — must check Netlify dashboard. If 503 persists >5 min after push, escalate to FLAG_FOR_ADAM immediately.
- **NotebookLM sources go stale**: The notebook still referenced "Your Austin Home Loan Simplified" H1 (fixed March 26) as an open issue. Sources should be refreshed monthly or when major site changes complete. Use `notebooklm source add` to push updated context docs.

---

## 2026-04-02 — Raw App URL Still Present on Resource Pages + Batch Fix Gaps

### Patterns
- **Batch CTA sweep (2026-03-31) missed non-suburb pages**: The suburb CTA batch fix caught all 24 suburb pages but did not audit resource/guide pages. The first-time-buyer-guide final CTA and Cedar Park hero CTA were still pointing to the raw loan app URL today. Rule: after any batch fix, explicitly audit the adjacent page categories (loan pages, resource pages, guide pages) for the same pattern — not just the target category.
- **Cedar Park hero "Apply Now" survived two batch fix rounds**: Cedar Park was included in the 2026-03-31 suburb batch fix AND the 2026-04-01 loan page fix, but neither caught this hero CTA. The hero CTA used the same class and URL as other suburb pages. Root cause: sed patterns in the batch fix may have been run with wrong file glob. When verifying batch fixes, grep each file individually rather than trusting the batch count.
- **Thursday funnel trace is a fast health check**: The full funnel (homepage → /get-preapproved → /thank-you) can be verified in <2 min via grep. contact.html, thank-you.html, and the three ad landing pages are all clean. This check is low-friction and should stay in Thursday rotation.

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

---

## 2026-04-06b — Blog Template Confirmed Correct; AEO Homepage + Person Schema

### Patterns
- **Blog title drift root cause is human process, NOT the template**: `_template.html` line 28 already has `<title>@@POST_TITLE@@ | Adam Styer | NMLS #513013</title>` with a prominent enforcement comment block. The template was correct. Authors publishing new posts without using the template is the only explanation. Pre-publish lint (`grep "<title>" blog/*.html | grep -v "Adam Styer"`) is the only automated defense. Add this to the start of every run as a non-negotiable step.
- **Homepage AEO paragraph placement**: The correct injection point is before the first H2 in a non-hero content section — specifically before the "Why Choose Adam Styer" H2 inside the `<section>` after the stats strip. Adding `<p class="text-center" style="max-width:760px;margin:0 auto 2rem;"><strong>...</strong></p>` at that position ensures the paragraph is both structurally early and visually coherent as a section intro.
- **Person schema + MortgageBroker schema co-existence**: Both should live on the homepage. The `worksFor` relationship in Person schema pointing to the MortgageBroker entity creates a named-entity graph connection that helps Google treat Adam Styer as a real licensed professional rather than an anonymous business. `sameAs` with LinkedIn/Zillow/Facebook is the cross-domain entity validation signal.
- **GSC "Request Indexing" vs. sitemap submission**: Sitemap submission tells Google pages exist. Manual "Request Indexing" in URL Inspection signals urgency and puts pages in the crawl priority queue. For a 24-page suburb URL set with a 5-week indexing lag, manual request indexing for the top 5-10 pages is the recommended acceleration path. Adam must do this in GSC — not automatable.
- **NotebookLM timeout pattern**: Run 1 (early AM) timed out; Run 2 (later) succeeded. Likely an initialization/cold-start issue. If a scheduled run hits timeout, cached NOTEBOOK_INSIGHTS are sufficient to proceed. No action needed beyond logging.


---

## 2026-04-07 — Meta Description Length Audit: va.html Was Over-Length

### Patterns
- **va.html had the only over-length meta description at 181 chars**: All other loan pages were short (142-149), construction/jumbo/investment were already in range (150-156). The over-length va.html description crept in from the April 1 meta expansion that added "Get pre-approved in 24 hours" to an already full description. Rule: after any meta description edit, verify character count with Python before committing.
- **Tuesday meta audit revealed 6 of 10 loan pages needed fixes**: Not all pages got attention in the same pass. The pattern now: run `python3 -c "..."` to bulk-check all loan page meta lengths at the start of every Tuesday rotation rather than reading files one by one.
- **AEO suburb coverage progress**: Taylor, Smithville, Spicewood added 2026-04-07. Remaining suburb pages without confirmed AEO body paragraphs (needs audit): New Braunfels, Bastrop, Bee Cave, Marble Falls, Elgin, Florence, Jarrell. Next Wednesday rotation should pick up from alphabetical order.

