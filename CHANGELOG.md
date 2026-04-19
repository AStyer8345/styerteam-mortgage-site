# styermortgage.com — Changelog

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
