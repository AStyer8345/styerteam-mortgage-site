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

**2026-05-16 (Saturday — UNSCHEDULED FIRE @ 07:12 CDT, abbreviated playbook):** Saturday is NOT in the Mon–Fri rotation; Friday NIGHT explicitly anticipated weekend fires as scheduler-anomaly evidence — now confirmed. **4th anomaly in 3 days** (Thu no-fire, Fri triple-fire, Sat weekend fire). Every-run checks only; no rotation. Sitemap 200, conversion 10/10. PSI 8-of-8 drain preserved. NotebookLM 39th missing. Re-Verify Gate: 16 carries all hold. 0 site edits. Scheduler-reliability HIGH flag maintained with expanded evidence (3 distinct anomaly types).

**2026-05-15 NIGHT (Friday — third same-day fire 23:09, bonus drift sweep):** AM 09:49, PM 09:53, NIGHT 23:09. PM→NIGHT gap = 13.3h. Sitemap 200, conversion 10/10. PSI 8-of-8 drain held. NotebookLM 38th. Re-Verify Gate: 16 carries all hold. Scheduler MEDIUM → HIGH.

**2026-05-15 AM (Friday — Content Planning + AEO Review rotation):** Thursday 5/14 did NOT fire (operational flag — Internal Linking rotation skipped). No site edits. GTM single-container hex verified (`GTM-PQQ6PGLR`). PSI 7-of-7 drain. Blog cadence 18 days (deferred). Audited 2 recent posts: `should-i-refinance` clean AEO; `why-home-prices-arent-crashing` declarative H2s + **NEW: missing FAQPage schema**.

**Surfaced for Adam (still):** Uncommitted style.css change in working tree (nav-dropdown scrolled-state fix, 21st carry). `/investor-loans` + `/high-net-worth-mortgage` title brand-vs-length tradeoff (8th run carry). Suburb roster `/calculators` linking gap (5th carry). Scheduler reliability HIGH FLAG — Thu 5/14 no-fire + Fri 5/15 triple-fire + Sat 5/16 weekend fire.

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
| Blog cadence: 19 days since last post (2026-04-27) — **deferred per GOALS.md "no new content this week"** | DEFERRED |
| products.html 10 in-card "Get Pre-Approved" buttons still route to raw 1003 (Adam decision; 21st carry) | MEDIUM |
| Site-wide footer `/prequal.html` link in 20 pages — parity gap | LOW |
| Uncommitted style.css change in working tree (Adam's nav-dropdown scrolled-state fix, 21st carry) | MEDIUM |
| Suburb roster `/calculators` linking gap (5th carry) | LOW (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| about.html "91 Google + 45 Zillow" review breakdown (UNVERIFIED:2026-05-08; Adam GBP/Zillow access) | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure (21st carry) + missing FAQPage schema (4th carry) | MEDIUM |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **39 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained 8/8 consecutive periods — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| `/investor-loans` (T=68) + `/high-net-worth-mortgage` (T=79) titles missing "Adam Styer" — 8th run carry | MEDIUM (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| GSC URL Inspection sweep — Pflugerville + Kyle (new top-10s), Hutto, Round Rock, Bee Cave, Lakeway, Georgetown, Leander, products.html | HIGH (Adam) |
| Bulk suburb audit recommendation — replace 9-week rotation with weekly audit | MEDIUM |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Verify NAP fix across remaining LocalBusiness/Person schemas | HIGH |
| **Scheduler reliability HIGH FLAG** — Thu 5/14 no-fire + Fri 5/15 triple same-day (09:49/09:53/23:09) + **NEW: Sat 5/16 weekend fire @ 07:12** — 4 anomalies in 3 days, 3 distinct types | HIGH (Adam) |

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
