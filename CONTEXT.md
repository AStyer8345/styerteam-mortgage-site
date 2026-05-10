# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. 75+ public pages live (homepage, loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, resource/guide pages, blog, calculators, realtor hub, plus the 7-page non-QM cluster as of 2026-05-05).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

**2026-05-10 (Sunday — Manor suburb page Round 2, suburb editor task):** `manor-mortgage-lender.html` deepened (slot 9 of 13 in Round 2). Median **$355K Nov 2025 → $340K Mar 2026 Redfin (-5.7% YoY)**, 98 DOM. **CRITICAL — Whisper Valley = Del Valle ISD, NOT Manor ISD** (Round 1 implied all 4 named neighborhoods sit in MISD); new in-community DVISD high school opens 2026-27; promoted to AEO opener + dedicated FAQ + schema + Schools H3. **Manor ISD has 4 high schools** (not 1): Manor HS 2/10, Manor New Tech 4/10, Manor Early College, Manor Senior Career &amp; Tech. **3 NEW neighborhoods** (Lagos, Mustang Valley, acreage tier); 4 existing deepened. **All 4 loan tiles de-templated** (FHA/Conventional/VA — orphans of templated copy from Round 1). **Major Employers EXPANDED**: OPmobility 400+ by 2025, NEW Mustang Crossing 1.2M-sqft Class A industrial, NEW Manor Crossing retail w/ H-E-B opened late 2025, Tesla 22,777 → 16,506 EOY 2025 corrected. **NEW Property Tax &amp; Closing Costs H3** w/ median 1.69% Ownwell (Round 1's 2.27% was 75th percentile not median) + Whisper Valley PID $1,480-$2,003/yr + ESS $55-$70/mo line-items + $340K closing example $6,300-$8,800. **Manor ISD $385M Bond 2025 FAILED Nov 4, 2025** flag added. 23 source URLs (Round 1 had 7). Sitemap 04-28 → 05-10. All 4 JSON-LD blocks validated clean. Round 2 advances to slot 10 (Lakeway) next.

**2026-05-10 (Sunday — no-rotation drift sweep, earlier today):** Re-Verify Gate + sitemap + conversion + Step 4B sweep + Adam Sat-commit propagation check at 27h+. **Zero edits to repo.** All 10 carries drift-free; sitemap 200; conversion 9/10 across 4 pages with all critical tokens at parity; Adam's Sat 09:22 Liberty Hill R2 commit (6762662) holding live; SEO/SEM ZERO/LOW_RISK queue still empty; 31/31 blog CTA coverage holds; NotebookLM script **28th consecutive missing**. Monday 2026-05-11 resumes full Schema + Google Ads + AEO Entity rotation and refreshes GOALS.md.

**Surfaced for Adam (still):** Uncommitted style.css change in working tree (Adam's pending nav-dropdown scrolled-state fix). Untouched.

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 24 `*-mortgage-lender.html` pages |
| Rate check | hub + 5 city pages |
| Rate shopper blog | 10 posts |
| Resources | first-time-buyer-guide, glossary, how-to-buy, etc. |
| Deprioritized | usda (noindex, kept live) |

## Open Items

| Item | Priority |
|------|----------|
| Blog cadence: 11 days since last post (2026-04-27) — **deferred per GOALS.md "no new content this week" until Mon 2026-05-11 refresh** | DEFERRED |
| products.html 7 in-card "Get Pre-Approved" buttons still route to raw 1003 (Adam decision: unify or preserve) | MEDIUM |
| Site-wide footer `/prequal.html` link in 20 pages — parity gap not orphan cleanup | LOW |
| Uncommitted style.css change in working tree (Adam's pending nav-dropdown scrolled-state fix) | MEDIUM |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| about.html "91 Google + 45 Zillow" review breakdown (UNVERIFIED:2026-05-08; Adam GBP/Zillow access needed) | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure: relative `../get-preapproved` (2) + missing `/refinance-quote` (10th recurrence; full slug corrected 2026-05-10) | MEDIUM |
| NotebookLM SKILL.md retirement diff — diff drafted 2026-04-26, **28 consecutive dead runs**, Adam apply queue | HIGH (Adam queue) |
| GSC URL Inspection sweep (Hutto, Round Rock, Bee Cave, Lakeway, Georgetown, Leander, products.html) | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Verify NAP fix across remaining LocalBusiness/Person schemas (audit for additional 5900 Balcones references) | HIGH |

## Session Rules

- Voice: short punchy sentences, conversational, raw, no fluff. HNW = warm conversational, not cold private-banking.
- Business name: "Adam Styer | Mortgage Solutions LP" — never "The Styer Team"
- Match existing HTML/CSS patterns exactly when adding pages
- TX-licensed only — never imply Adam originates outside Texas
- No USDA origination — keep removing from product surfaces as found
- Loan application link: https://mslp.my1003app.com/513013/register (anchor text only)
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`

## Session Protocol

Read `/Users/adamstyer/Documents/GOALS.md` first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Open Items only. Keep under 150 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
