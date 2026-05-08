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

**2026-05-08 — Friday rotation (Content Planning + AEO Review):** No edits this run. **Re-Verify Gate auto-resolved 1 stale carry:** "how-to-buy-a-house USDA cleanup" — both URL variants (`-2026.html` and `.html`) return HTTP 404; page does not exist on site or in repo; phantom for 5+ runs. **1 carry corrected via self-review:** "about.html 91/45" — initial framing as date-span was wrong; actual claim is GBP/Zillow review-count breakdown (lines 576, 755-756) which sums consistently to 136+ but may drift vs live counts; tagged UNVERIFIED:2026-05-08 (Adam's GBP/Zillow access required), stays in FLAG_FOR_ADAM. Audited ALL 31 blog posts for funnel-CTA presence — 31/31 pass (path-agnostic grep covers absolute + relative). 2 sample posts AEO-checked. **Re-framed "why-home-prices structural decision" carry:** post HAS a `/get-preapproved` CTA via relative `../get-preapproved` (yesterday's grep used absolute-only and missed it); actual gap is missing `/refinance-quote` + relative-vs-absolute path inconsistency. Blog cadence Day 11 reset per GOALS.md week-of-04-20 directive ("No new content on any site this week"). Conversion programmatic trace re-passed (15/21/5/14 markers across 4 funnel pages). NotebookLM script 24th miss.

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
| 2026-04-27-why-home-prices CTA structure: relative `../get-preapproved` + missing `/refinance-quote` (re-framed 2026-05-08, 7th recurrence) | MEDIUM |
| NotebookLM SKILL.md retirement diff — diff drafted 2026-04-26, **24 consecutive dead runs**, Adam apply queue | HIGH (Adam queue) |
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
