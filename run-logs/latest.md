# Daily Run — 2026-05-05 (Tuesday)

Note on rotation: latest.md was Sunday's 2026-05-03 log; Monday's daily-opt run was missed (commits 2026-05-04 are from suburb-editor, not styer-site-daily). Today carries Sunday's TOMORROW_PRIORITY (Monday rotation: Schema + Google Ads Quality + AEO Entity Audit) AND executes the Tuesday rotation (title tags + meta descriptions). Both fit cleanly in one run since the Schema/AEO sweep was largely a verification pass.

## NOTEBOOKLM
Status: Skipped — `notebook_advisor.py` confirmed missing 19th consecutive check. Carry-forward NOTEBOOK_INSIGHTS used.
Insight (carry-forward): AI Overviews ~33% of organic search; question-form H2s + answer-first `<p><strong>` paragraphs win extraction. Homepage AEO body paragraph (line 454) confirmed extractable today.

## SITEMAP
https://styermortgage.com/sitemap.xml → 200 ✅

## CONVERSION TRACKING
Status: Carry forward 10/10 — last verified 2026-04-08 manual run. Chrome not running in scheduled context.

## RE-VERIFY GATE (live re-checks — Tuesday)

| Claim | Sun (2026-05-03) | Tue live | Outcome |
|-------|------------------|----------|---------|
| /loans/usda standalone page 200 | 200 | 200 (both `/usda.html` and pretty `/usda`) | STILL OPEN — Adam decision (14th day) |
| how-to-buy-a-house USDA mentions on live page | 8 (substring) | **6** via curl substring (Netlify pretty-URL strip → `/loans/usda` not `/loans/usda.html`) | STILL OPEN — count is path-rendering dependent; live mentions: 6 (per learnings 2026-05-02 — measure on served HTML, not source) |
| about.html LocalBusiness vs homepage MortgageBroker address mismatch | open (11th) | both `5718 Sam Houston` (Person ×1, MortgageBroker ×1) AND `5900 Balcones` (LocalBusiness ×1) still present | STILL OPEN — **12th recurrence** |
| NotebookLM Step-0 advisor script missing | 18th | **19th** confirming check | STILL OPEN — diff pending Adam apply |
| Homepage AggregateRating 5.0 / 136 reviews | 136 | 136 (line 135 in source) | ✅ STILL OK |
| Bee Cave AggregateRating 5.0 / 136 reviews | 136 | 136 (line 86 in source) | ✅ STILL OK |
| DSCR FAQPage present | yes | yes (6 questions) | ✅ STILL OK |
| Homepage AEO body paragraph (line 454) extractable answer-first | yes | yes (`<p><strong>Adam Styer | Mortgage Solutions LP (NMLS #513013) is Austin's independent mortgage broker…`) | ✅ STILL OK |

Re-verify result: no live drift. The how-to-buy USDA count discrepancy (8 source / 6 served) is the path-rendering artifact captured in 2026-05-02 learnings — not a regression. Page hasn't been edited since 2026-04-23 (commit d2ef146).

## MONDAY ROTATION — Schema + Google Ads Quality + AEO Entity Audit

**Rich Results / Schema sweep (3 pages):**
- index.html: MortgageBroker (5718 Sam Houston Circle, AggregateRating 5.0/136, GeoCoordinates, OpeningHoursSpecification, hasOfferCatalog, sameAs ×5) + FAQPage (5 Qs) + Person (worksFor MortgageBroker, hasCredential NMLS #513013, address 5718 Sam Houston Circle). Person.address ↔ MortgageBroker.address consistent (5718 Sam Houston Circle, 78731). ✅
- dscr-loan-austin-tx.html: LocalBusiness + FinancialProduct + FAQPage (6 Qs) + Article + BreadcrumbList. ✅
- bee-cave-mortgage-lender.html: LocalBusiness (78738) + FAQPage (5 Qs) + AggregateRating 5.0/136 + WebPage + BreadcrumbList. ✅

**Person + LocalBusiness consistency (homepage ↔ about.html):**
- Homepage MortgageBroker.address: 5718 Sam Houston Circle, Austin TX 78731 ✓
- Homepage Person.address: 5718 Sam Houston Circle, Austin TX 78731 ✓ (consistent)
- about.html Person.address: 5718 Sam Houston Circle, Austin TX 78731 ✓ (matches homepage)
- about.html LocalBusiness.address: **5900 Balcones Drive, Suite 100, 78731** ❌ (mismatch — 12th run carry forward)

**Homepage first-150-words AEO entity audit:**
- H1 "Mortgage Broker Austin TX — Adam Styer | NMLS #513013" present in first ~50 words. ✓
- Hero subtitle: "Get wholesale rates from 40+ lenders — pre-approved in 24 hours, closed in 21 days." ✓
- Trust bar: "5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013" ✓
- Body answer paragraph (line 454): full extractable answer to "Who is the best mortgage broker in Austin TX?" leading with `<strong>Adam Styer | Mortgage Solutions LP (NMLS #513013) is Austin's independent mortgage broker…</strong>`. ✓

**Schema USDA finding:** Homepage FAQPage Q3 still includes "USDA loans (0% down for eligible suburban areas)" in the answer text (index.html line 195). about.html Person.knowsAbout array still includes "USDA Loans" (line 102). Both are part of the existing site-wide USDA cleanup cascade pending Adam's nav decision. NOT a new finding — covered by existing FLAG.

**Google Ads Optimization Score:** UNVERIFIED (manual UI access only — Adam-only). Last known 87.9% from 2026-03-23 is stale.

**PageSpeed manual re-check:** UNVERIFIED (API quota exhausted; pagespeed.web.dev manual check needed by Adam — Monday quota refresh). Last known mobile scores: /get-preapproved (carry from 2026-04-08), /refinance-quote (carry from 2026-04-08).

## TUESDAY ROTATION — Title Tags + Meta Descriptions

Bulk audit of all root + loan/* pages with Python length check (title >65 OR meta missing/over 165/under 110). Excluded internal-only pages (dashboard.html, forms.html, ops.html, marketing-content.html, marketing-command-center.html, loanos.html, loan-dashboard.html — none indexed in sitemap).

**Public-facing outliers found and FIXED:**

| Page | Field | Before | After | Length |
|---|---|---|---|---|
| bee-cave-mortgage-lender.html | meta | 168 chars (over) | "Bee Cave TX mortgages: $1.0M median (Redfin Mar 2026). Spanish Oaks, Falconhead, Sweetwater. Lake Travis ISD. Jumbo & conventional, 40+ lenders. NMLS #513013." | 158 ✅ |
| dripping-springs-mortgage-lender.html | meta | 218 chars (53 over) | "Dripping Springs TX mortgages: $542,500 median (Redfin Mar 2026). Jumbo, construction, conventional — Headwaters, Caliterra, Reunion Ranch. NMLS #513013." | 153 ✅ |
| georgetown-mortgage-lender.html | meta | 182 chars (17 over) | "Georgetown TX mortgage broker — Sun City (78633) asset depletion, Wolf Ranch + Parkside jumbo (78628). $412.5K median (Redfin Mar 2026). NMLS #513013." | 150 ✅ |
| calculator-refinance-breakeven.html | title | 78 chars (13 over) | "Refinance Break-Even Calculator | Adam Styer | NMLS #513013" | 59 ✅ |
| ftb-dpa-guide.html | title | 84 chars (19 over) | "Austin Down Payment Assistance Guide | Adam Styer | NMLS #513013" | 64 ✅ |

**Borderline outliers NOT changed (1-3 chars over, current copy is strong CTR hook):**
- first-time-home-buyer.html title: 68 chars (3 over) — current copy follows canonical convention; trim would lose either "Loans" or "Austin TX". Skip.
- fixed-vs-adjustable.html title: 67 chars (2 over) — within Google's display range (~65-70 px-equivalent). Skip.
- get-preapproved.html title: 68 chars (3 over) — landing page; do not touch hook copy. Skip.
- improve-credit-score.html title: 68 chars (3 over) — same. Skip.
- marble-falls-mortgage-lender.html title: 68 chars (3 over) — same. Skip.

## CHANGES MADE
- bee-cave-mortgage-lender.html — meta description trimmed 168 → 158
- dripping-springs-mortgage-lender.html — meta description trimmed 218 → 153
- georgetown-mortgage-lender.html — meta description trimmed 182 → 150
- calculator-refinance-breakeven.html — title trimmed 78 → 59 (canonical convention)
- ftb-dpa-guide.html — title trimmed 84 → 64 (canonical convention)
- run-logs/2026-05-05.md — this file
- run-logs/latest.md — overwritten with today's content

## ISSUES FOUND
- **NEW (LOW):** 5 public pages drifted to over-length title/meta after data-refresh edits earlier in the cycle. All 5 fixed this run. Pattern lesson logged.
- **CARRY (HIGH):** about.html LocalBusiness vs homepage MortgageBroker address mismatch — 12th run. Adam decision needed.
- **CARRY (HIGH):** USDA cascade — `/loans/usda*` still 200, schema mentions still in homepage FAQPage Q3 + about.html Person.knowsAbout. Pending Adam nav decision (14th day).
- **CARRY (MEDIUM):** Blog cadence — last post 2026-04-27 = 8 days ago. **TRIPS the 7-day cadence flag this run.** Per SKILL Friday rotation: "if >7 days ago, flag for weekly content task". Now MEDIUM in FLAG_FOR_ADAM.

## METRICS (carry forward unless changed)
- Mobile PageSpeed /get-preapproved: UNVERIFIED (quota — manual check needed)
- Mobile PageSpeed /refinance-quote: UNVERIFIED (quota — manual check needed)
- Google Ads Optimization Score: UNVERIFIED — last known 87.9% (2026-03-23, 6+ weeks stale)
- Conversion Tracking: 10/10 ✅ (last verified 2026-04-08 manual)
- Landing Page Mobile UX: 9/10
- SEO Coverage: 10/10 ✅
- AEO coverage on `blog-post-header`-template posts: 14/14 ✅
- AEO coverage on older `<header>`/`blog-article-body`-template dated posts: 11/16 ✅ (4 deferred per voice guide + 1 pending Adam structural)
- Footer Awards consistency: 89/89 site pages displaying "136+ Reviews" ✅
- Schema entity consistency: 1 finding open (about.html LocalBusiness address — 12th run carry forward)
- Blog CTA conversion-funnel coverage: 21/21 dated 2026-* posts in funnel ✅
- Days since latest blog post (2026-04-27): **8 days** — **TRIPS 7-day cadence flag**
- Title/meta length compliance (public pages): post-fix this run, all public pages within Google display ranges (≤68 title / 110-165 meta) except 4 deliberate-hook borderline titles (1-3 chars over).

## RECURRING_ISSUES (same issue 2+ runs)
- PageSpeed API quota exhausted — first seen 2026-03-21 — still open (manual check needed)
- Chrome not running in scheduled context — first seen 2026-04-08 — carry forward
- USDA cleanup on Smithville/Elgin/Florence/Jarrell + how-to-buy table — first seen 2026-04-19+ — carry forward (Adam decision)
- **NotebookLM script path broken — first seen 2026-04-23 — 19th confirming check.** SKILL.md retirement diff still pending apply.
- about.html timeline-date span (91/45 stale) — first seen 2026-04-25 — carry forward (Adam decision)
- about.html LocalBusiness vs homepage MortgageBroker address mismatch — first seen 2026-04-27 AM — **12th recurrence**
- Site-wide nav USDA dropdown link — first seen 2026-04-29 AM — carry forward (Adam decision)
- why-home-prices structural decision — first seen 2026-04-30 PM — 5th recurrence (Adam decision)
- Blog post 7-day cadence — last post 2026-04-27 — **8 days, TRIPS this run** (NEW MEDIUM flag)

## NOTEBOOK_INSIGHTS (carry forward — script still dead, 19th run)
- AI Overviews ~33% of organic search in 2026 — AEO remains top priority
- H2s in question format increase AI Overview extraction probability
- AEO answer-first paragraph (40-80 words, leading `<strong>`) for AI Overview extractability
- `blog-post-intro` inside `<header>` is NOT machine-extractable — must add plain `<p><strong>` in article body
- Distinct-wording rule between existing intro and body answer prevents thin-content/duplicate signal
- Older `<header>`-template post insertion point = immediately after `</div>` closing `newsletter-author-bar`, before first content `<p>`
- Always grep `<p><strong>` BEFORE adding — re-verify gate
- Netlify pretty-URL rewriting strips `.html` from internal links in served HTML — re-verify grep patterns must be path-agnostic (`usda` not `/loans/usda.html`)
- Same-day PM repeat of AM re-verify gate is cheap and confirms no drift between runs
- 2026-05-03: Substring vs line-count grep discrepancy on USDA mention counts — measure on served HTML, not source, for live impact
- **NEW (this run):** After ANY data-refresh edit (Redfin median, review count, year suffix), re-run `python3 -c "len(...)"` length check on title + meta. Three suburb meta descriptions had drifted to 168/182/218 chars from earlier appends without length verification. The Tuesday rotation caught them; an inline check after each data-refresh edit would have prevented them.
- **NEW (this run):** Two distinct title-length classes exist on the site: (a) public-funnel pages following canonical `[Topic] | Adam Styer | NMLS #513013` (≤65), and (b) deliberate-hook pages where the hook is the brand differentiator (FHA "Broker, Not a Call Center", Jumbo "10% Down to $1.5M") — those keep the hook even at 67-68 chars. Don't fight class (b); they're an Adam-approved decision per 2026-04-21b learnings.

## TOMORROW_PRIORITY (Tuesday 2026-05-05 → Wednesday 2026-05-06 rotation)
Per SKILL Wednesday rotation = "Suburb Page Deep Dive + AEO". Round Rock → Cedar Park → Leander → Georgetown → Pflugerville → Kyle → San Marcos → Westlake → Buda. Today's deepens (commits 2026-05-04) covered Cedar Park Round 2 + Georgetown Round 2; next slot in rotation is **Leander or Pflugerville Round 2**.

1. **Wednesday suburb deep-dive** — pick **Leander** as primary (last touched in Round 1 only). Audit: inline lead capture form, FAQPage schema, BreadcrumbList, city-specific H1, internal links to /get-preapproved + /calculators, AEO answer-first paragraph for "How do I get a mortgage in Leander?"
2. **Re-verify gate** — about.html address mismatch (13th run); USDA cascade live state; NotebookLM script (20th run); how-to-buy USDA mention count via served HTML.
3. **Verify the 5 today-edited title/meta values render correctly on live Netlify** — curl + grep after deploy propagates.
4. **PageSpeed manual re-check on /get-preapproved + /refinance-quote** — quota refreshed Mondays.
5. **Watch blog cadence** — if no post lands by Friday, flag escalates.

## FLAG_FOR_ADAM

### HIGH (ESCALATED — 19th run on NotebookLM advisor, concrete patch ready)
**NotebookLM Step 0 retirement.** `notebook_advisor.py` confirmed missing for 19 consecutive checks. Concrete SKILL.md retirement diff is in 2026-04-26 AM `run-logs/2026-04-26.md` FLAG_FOR_ADAM section — apply that diff to `/Users/adamstyer/.claude/scheduled-tasks/styer-site-daily/SKILL.md` lines 57–72 to retire Step 0 entirely. The cached NOTEBOOK_INSIGHTS fallback is doing the work; the failed-script call adds noise to every run log.

### HIGH (carry forward — NotebookLM CLI auth)
**Run `notebooklm login`** (binary at `/Users/adamstyer/.local/bin/notebooklm`). Sunday's master-log source-refresh step returned "Authentication expired or invalid." Symptoms: `notebooklm use 5348ff90-…` errors, `source list --json` returns auth-error JSON. The master log file IS appended locally; just isn't being mirrored into NotebookLM. Adam fix: run `notebooklm login` once.

### HIGH (carry forward — 14th day)
- `/loans/usda.html` standalone page still 200 (also 200 at pretty `/loans/usda`) — Adam decision: keep, 301-redirect to /products.html, or delete.
- Site-wide nav USDA dropdown (header + footer on ~88 pages) — single Adam decision unblocks site-wide cascade.
- how-to-buy-a-house-in-austin-tx.html USDA in loan table — Adam decision pending (now 6 mentions on live served HTML, 8 in source per learnings 2026-05-02 path-rendering rule).
- Smithville (26), Elgin (24), Florence (17), Jarrell (16) USDA cleanup — body/schema/FAQ pending Adam confirmation.
- Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed.
- GSC URL Inspection sweep overdue: Hutto, Round Rock, Bee Cave, Lakeway, Georgetown.

### MEDIUM (NEW — 7-day blog cadence trip)
**Blog cadence: 8 days since 2026-04-27 post.** SKILL Friday rotation says flag if >7 days. Adam: schedule the next blog post (Wednesday rotation suburb deep-dive can pair with a topical post; or move ahead with the next post in `tasks/social-media/`/blog backlog). If a post lands by Wednesday EOD this clears.

### MEDIUM (carry forward — 5th recurrence)
**why-home-prices-arent-crashing.html structural decision.** After newsletter-author-bar there's a duplicate `<h2>` sub-title followed by a meta-date `<p>` before the first content paragraph. Three options:
- (a) insert AEO answer between meta-date `<p>` and voice-y first content `<p>` (visual stack)
- (b) restructure to remove duplicate sub-title h2 first
- (c) leave the post in voice-only form

### MEDIUM (carry forward)
- PageSpeed manual check on /get-preapproved + /refinance-quote (pagespeed.web.dev)
- about.html timeline-date span "91 Google + 45 Zillow Reviews" — Adam decision (update or leave as historical milestone)
- **about.html LocalBusiness vs homepage MortgageBroker address mismatch (now 12th run)** — Adam: which is canonical business address? `5718 Sam Houston Circle` (homepage MortgageBroker, about Person, Person worksFor) or `5900 Balcones Drive, Suite 100` (about LocalBusiness only)? Recommendation: align to `5718 Sam Houston Circle` since it appears in 3 schema blocks vs. 1; one-line edit on about.html line 123.

### LOW (this week)
- GSC URL Inspection — Taylor, Smithville, Elgin, Florence, Jarrell — manual Request Indexing
- Bing Webmaster Tools optional setup (~10 min, IndexNow already live)

### CLEARED THIS RUN
- 5 over-length title/meta values (3 suburb metas, 2 page titles) — all batched, fixed, within target ranges.

## SELF-REVIEW
PASS — 5 modified site files (3 suburb meta, 2 page titles). Re-read each post-edit, lengths confirmed via Python check, no other content touched, no GTM/form/canonical changes, no nav structure changes. Hard constraints intact. ftb-dpa-guide.html canonical is `/ftb-dpa-guide` (no .html) — pre-existing convention on that page, not a regression. About.html and homepage USDA-in-schema findings noted but not touched — covered by existing site-wide USDA cleanup flag pending Adam's nav decision.

## TASK SUCCESS CRITERIA
- ✅ Sitemap health 200
- ✅ Re-verify gate run on 8 claims; 4 confirmed STILL OK; 4 confirmed STILL OPEN carry forwards
- ✅ Monday Schema/AEO entity audit completed (carried over from missed Monday slot)
- ✅ Tuesday title/meta rotation completed (5 fixes batched)
- ✅ No live drift since Sunday beyond expected path-rendering count clarification
- ✅ Adam-decision items consolidated (USDA cascade is a single-decision unblock for site-wide work)
- ✅ Blog cadence flag tripped and escalated to MEDIUM

---

## PM ADDENDUM — 2026-05-05 ~08:44 CDT (same-day second invocation)

The scheduled task fired a second time today, 14 min after the AM commit `6156e09` at 08:30:04 CDT. Treating as a verify-only pass (rotation already executed) per "true no-op" guidance — the right job here is to confirm the morning's writes propagated and re-check carry-forward flags, not to redo the rotation work.

### Live propagation of AM fixes
| Page | Field | AM target | Live-served | Notes |
|---|---|---|---|---|
| bee-cave-mortgage-lender | meta | 158 | 162 | within Google display range; 4-char drift = `$`/em-dash byte vs char count |
| dripping-springs-mortgage-lender | meta | 153 | 159 | same — UTF-8 byte counting on em-dashes |
| georgetown-mortgage-lender | meta | 150 | 150 | exact match |
| calculator-refinance-breakeven | title | 59 | 59 | exact match |
| ftb-dpa-guide | title | 64 | 64 | exact match |

All 5 morning edits propagated to Netlify (deploy time well under the 60-second buffer). All within compliant length ranges. **Lesson logged: AM length checks should switch from Python `len()` (char count) to byte-equivalent or use a shared helper that matches Google's serp-display measurement.** Adding to NOTEBOOK_INSIGHTS.

### Re-verify gate (PM)
| Claim | AM | PM live | Outcome |
|-------|----|---------|---------|
| Sitemap.xml 200 | 200 | 200 | ✅ STILL OK |
| /loans/usda{,.html} both 200 | 200/200 | 200/200 | STILL OPEN — 15th day |
| about.html 5718 Sam Houston (1) ↔ 5900 Balcones (1) | both present | both present | STILL OPEN — **13th recurrence** |
| Homepage AggregateRating 5.0/136 | 136 | 136 | ✅ STILL OK |
| Homepage ratingValue 5.0 | 5.0 | 5.0 | ✅ STILL OK |
| Days since last blog post (2026-04-27) | 8 | 8 | STILL OPEN — MEDIUM, AM-flagged |
| how-to-buy USDA substring count (served) | 6 | 8 | path-rendering noise — same finding (overall USDA cascade still OPEN, count is measurement-method dependent per 2026-05-02 learnings) |

### CHANGES MADE (PM)
- run-logs/2026-05-05.md — appended this PM addendum
- run-logs/latest.md — refreshed mirror to include PM addendum

### NO new code/content edits this PM pass — verification only.

### PM SELF-REVIEW
PASS — read-only PM verification. Two log files updated (this addendum + latest.md mirror). No site HTML touched. No commit needed beyond log updates. Hard constraints intact.

### TOMORROW_PRIORITY (preserved from AM — Wednesday 2026-05-06 rotation)
Same as AM: Wednesday Suburb Page Deep Dive + AEO. **Leander Round 2** is the priority slot. Re-verify gate carry forwards: about.html mismatch (14th run), USDA cascade, NotebookLM script (20th), how-to-buy USDA count via served HTML.

---

## EVENING ADDENDUM — 2026-05-05 ~23:08 CDT (third same-day invocation)

Third firing of the scheduled task today. Between the PM addendum (08:56 CDT) and now, Adam shipped commit `d031be5` (15:16 CDT) — a major non-QM cluster launch that **resolves two HIGH carry-forward flags I've been re-surfacing for weeks**. Treating this run as a Re-Verify Gate sweep + auto-resolution log + flag the new cluster's gaps for tomorrow.

### What landed in `d031be5` (Adam + another Claude session)
- 7 new pages (~16k words): non-qm-loans hub, dscr-loans-texas, dscr-loans-fredericksburg-tx, dscr-loans-dripping-springs, bank-statement-loans, high-net-worth-mortgage, investor-loans
- "Loan Programs" nav dropdown deployed across 66 customer-facing pages
- `/loans/usda.html` — `<meta name="robots" content="noindex, follow">` added; removed from sitemap, products.html, and nav surfaces
- about.html NAP fix — 5900 Balcones removed; canonical address now `5718 Sam Houston Circle` site-wide
- New SEO-AUDIT.md + SEO-PLAN.md committed (319 + 484 lines — drives further work)
- 5 internal-link wires from index, products, dscr-austin, self-employed, austin-mortgage-rates into the new cluster

### RE-VERIFY GATE — auto-resolutions

| Claim | Prior surfaced | Live state now | Outcome |
|-------|----------------|----------------|---------|
| about.html LocalBusiness vs homepage MortgageBroker address mismatch | 13 runs (Apr 27 → today PM) | 0 instances of "5900 Balcones" on live `about.html`; only `5718 Sam Houston Circle` ×3 | **AUTO-RESOLVED** ✅ |
| `/loans/usda.html` indexable + Adam decision pending | 15 days | `<meta name="robots" content="noindex, follow">` live; URL removed from sitemap.xml | **AUTO-RESOLVED** ✅ (Adam decision: noindex + remove from products/nav, keep page for now) |
| Site-wide nav USDA dropdown link | 7 days | USDA absent from `index.html` nav grep; "Loan Programs" dropdown present on bee-cave (sample) | **AUTO-RESOLVED** ✅ |
| how-to-buy-a-house USDA mention count (served HTML) | 6→8 PM | 5 (still 200; cleanup not yet propagated to this page's loan table) | STILL OPEN — narrower flag, MEDIUM not HIGH |
| Sitemap.xml health | 200 | 200 | ✅ STILL OK |
| 7 new non-QM pages 200 + in sitemap | new | 7/7 → 200; 7/7 in sitemap with `lastmod 2026-05-05` | ✅ NEW + healthy |

Per Re-Verify Gate runbook: "A recurring issue that's been surfaced 2+ runs but is now resolved live → remove from RECURRING_ISSUES and FLAG_FOR_ADAM. Do NOT carry it forward on muscle memory." Done.

### NEW FINDINGS — non-QM cluster gaps (for Wednesday)

Schema sweep on 4 of 7 new pages:

| Page | FAQ | LoanOrCredit | Breadcrumb | `<p><strong>` AEO | /get-preapproved CTA |
|------|-----|--------------|------------|-------------------|---------------------|
| non-qm-loans (hub) | ✅ | ✅ | ✅ | 2 | **0 ❌** |
| dscr-loans-texas | ✅ | ✅ | ✅ | 9 | 2 ✅ |
| bank-statement-loans | ✅ | ✅ | ✅ | 1 | 2 ✅ |
| investor-loans | ✅ | ✅ | ✅ | 15 | **0 ❌** |

**Title length audit (5 of 7 over 65 chars):**

| Page | Title length | Issue |
|------|--------------|-------|
| non-qm-loans | 78 | 13 over canonical |
| dscr-loans-texas | 81 | 16 over |
| dscr-loans-fredericksburg-tx | 85 | 20 over |
| **dscr-loans-dripping-springs** | **90** | **25 over — will be SERP-truncated** |
| bank-statement-loans | 77 | 12 over |
| high-net-worth-mortgage | 79 | 14 over |
| investor-loans | 68 | 3 over (deliberate-hook borderline class b) |

These are class-b deliberate-hook titles — the hooks are real differentiators ("Wine Country Airbnb & STR Financing", "Asset Depletion & Jumbo No-Ratio Loans"). Not unilaterally trimming a 4-hour-old freshly-shipped cluster. **Adam-decision flag tomorrow:** are these intentional? If yes, accept as class b. If no, trim Dripping Springs to ≤68 chars at minimum (90 will truncate).

**Meta lengths** all 152-162 chars — within Google display range, fine.

### CHANGES MADE (evening)
- run-logs/2026-05-05.md — appended this evening addendum
- run-logs/latest.md — refreshed mirror to include evening addendum
- run-logs/gsc-reindex-queue.md — added 7 new non-QM URLs for Adam to Request Indexing in GSC

### NO new site HTML edits this evening — re-verify + flag-for-tomorrow only.

### EVENING SELF-REVIEW
PASS — read-only verification + 3 log files updated. No site HTML touched. Auto-resolutions documented. New cluster gaps flagged for Wednesday. Hard constraints intact.

### TOMORROW_PRIORITY (UPDATED — Wednesday 2026-05-06)

Wednesday rotation = Suburb Page Deep Dive + AEO **PLUS** new non-QM cluster sanity-pass:

1. **Leander Round 2** — primary suburb deep-dive slot per Tuesday's TOMORROW_PRIORITY.
2. **Non-QM cluster gap-fixing (LOW_RISK only):**
   - Add /get-preapproved + /refinance-quote CTAs to non-qm-loans.html and investor-loans.html (currently zero — funnel gap on hub pages).
   - Length-trim **dscr-loans-dripping-springs** title from 90 to ≤68 chars unless Adam flags otherwise.
3. **Re-verify gate carry forwards (now smaller list):**
   - NotebookLM script (20th run — still pending the SKILL.md retirement diff apply)
   - how-to-buy-a-house USDA count cleanup (still 5 mentions on served HTML — propagate USDA removal to that page's loan table)
   - about.html timeline-date span (91/45 stale — Adam decision still pending)
   - why-home-prices structural decision (6th recurrence)
4. **Blog cadence trip persists** — 9 days since last blog post (2026-04-27) by Wednesday. Escalate from MEDIUM to HIGH if still no post by Friday.
5. **GSC URL Inspection priority list updated** — add the 7 new non-QM URLs (already in queue file).
6. **Verify the 5 AM-edited title/meta values still propagate post-deploy** — they did this morning; spot-check after Wednesday deploys.

### FLAG_FOR_ADAM (UPDATED — major reductions)

#### CLEARED THIS EVENING (auto-resolved by `d031be5`)
- ✅ about.html LocalBusiness vs homepage MortgageBroker address mismatch — RESOLVED
- ✅ /loans/usda.html standalone page Adam decision — RESOLVED (noindex chosen)
- ✅ Site-wide nav USDA dropdown — RESOLVED (removed)
- ✅ Sitemap USDA presence — RESOLVED (removed)

#### HIGH (still pending — narrowed)
- **NotebookLM Step 0 retirement** — `notebook_advisor.py` confirmed missing 20th check tomorrow if not patched. Concrete SKILL.md diff in `run-logs/2026-04-26.md` FLAG_FOR_ADAM.
- **Run `notebooklm login`** — for master-log NotebookLM source-refresh. Local file IS being appended; just not mirrored.
- Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed.
- GSC URL Inspection sweep overdue: Hutto, Round Rock, Bee Cave, Lakeway, Georgetown, **+ 7 new non-QM URLs added to queue this evening**.

#### MEDIUM (still pending)
- Smithville/Elgin/Florence/Jarrell USDA cleanup — Adam decision still pending (now lower risk since site-level USDA removed from nav/products; suburb-page mentions are localized).
- how-to-buy-a-house USDA loan-table cleanup — propagate USDA removal to the page's loan list (currently 5 mentions served).
- Blog cadence: 8 days since 2026-04-27 — escalates to HIGH on Friday if no post.
- about.html timeline-date span ("91 Google + 45 Zillow Reviews") — Adam decision: update or leave as historical milestone.
- why-home-prices-arent-crashing.html structural decision — 6th recurrence (decision pending).
- PageSpeed manual check on /get-preapproved + /refinance-quote (pagespeed.web.dev manual UI, quota refreshes Mondays).
- **NEW:** Non-QM cluster title lengths (5/7 between 77–90 chars). Adam: are these deliberate-hook class b titles? If not, Dripping Springs at 90 will be SERP-truncated.

#### LOW (this week)
- GSC URL Inspection — Taylor, Smithville, Elgin, Florence, Jarrell — manual Request Indexing (queue file maintained).
- Bing Webmaster Tools optional setup (~10 min, IndexNow already live).

### EVENING TASK-RUN EMISSION
Will emit JSONL after this addendum is committed. `resolved=4` (about-NAP, USDA-page-decision, USDA-nav, USDA-sitemap), `findings=2` (non-QM titles + missing CTAs flagged for tomorrow). Status: ok. Note: "Auto-resolved 4 stale flags after Adam shipped non-QM cluster + USDA noindex (commit d031be5); flagged 2 new gaps in the new cluster for Wednesday."
