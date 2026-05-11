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

**2026-05-11 (Monday — Competitive Week 10):** styer-competitive-weekly task. **BREAKOUT: tracked top-10 keywords jumped 2 → 4** (Hutto held #2, Leander held #6, **Pflugerville NEW #4**, **Kyle NEW #8**). Both suburb rotation NEW keywords ranked on first measurement — confirming the 9-week rotation cadence under-measures real progress. Re-Verify Gate processed 14 prior claims (3 cleared/reversed: Joel reclaimed cash-out #1, Arnaiz demoted on BOTH refi keywords #1→#3 + #2→#3, MortgageAustin reclaims #1 when query qualified with "mortgage"). ATX Mortgage Lending sitemap audit confirmed 0/61 dedicated suburb pages — first-mover advantage preserved. **NotebookLM CLI auth expired** — Step 6 push (SEO notebook + Styer Growth Log notebook) failed with "Authentication expired or invalid"; master log appended on disk OK but not pushed to remote notebooks. New Adam-flag: `notebooklm login` required.

**2026-05-10 (Sunday — Manor suburb page Round 2, suburb editor task):** `manor-mortgage-lender.html` deepened (slot 9 of 13 in Round 2). Median **$355K Nov 2025 → $340K Mar 2026 Redfin (-5.7% YoY)**, 98 DOM. **CRITICAL — Whisper Valley = Del Valle ISD, NOT Manor ISD**. Property tax median 1.69% Ownwell + Whisper Valley PID + closing example. **Manor ISD $385M Bond 2025 FAILED Nov 4, 2025**. Round 2 advances to slot 10 (Lakeway) next.

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
| **NotebookLM CLI auth expired (NEW 2026-05-11)** — `notebooklm login` required; Week 10 master log appended on disk but not pushed to remote notebooks | HIGH (Adam) |
| GSC URL Inspection sweep — **add Pflugerville + Kyle** (new top-10s 2026-05-11), Hutto, Round Rock, Bee Cave (38+ days unindexed), Lakeway, Georgetown, Leander, products.html | HIGH (Adam) |
| **Bulk suburb audit recommendation (NEW 2026-05-11)** — replace 9-week rotation with bulk weekly audit; Pflugerville/Kyle wins were untracked for weeks | MEDIUM |
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
