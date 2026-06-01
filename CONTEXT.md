# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | HyperSmart Home Loans. Static HTML/CSS/JS on Netlify — no framework, no CMS. 75+ public pages live (homepage, loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, resource/guide pages, blog, calculators, realtor hub, plus the 7-page non-QM cluster).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

**2026-06-01 (styer-site-daily Monday rotation): Schema + AEO + Google Ads.** 3-line sitemap.xml lastmod bump (homepage `/` + scenarios.html + scenarios/oil-gas — 2026-05-18/2026-05-28 → 2026-05-31; surfaces Adam's `f3f8f07`+`15e8119`+`0e54435` homepage AEO/conversion rewrite to GSC). Re-Verify Gate clean: sitemap live=local=131, conversion tracking 10/10, legacy entity scrub 0/0/0, title pipe 35/37 (carry holds). Physician post AEO answer-first structure verified at correct date-prefixed URL (Sunday's run log had wrong URL — corrected). Cache-buster rolled `?v=20260530b → ?v=20260531` sitewide. NEW LOW carry: homepage MortgageBroker vs about LocalBusiness schema type inconsistency (Python JSON-LD parse found it; grep would have missed). NotebookLM 60th dead run. TOMORROW_PRIORITY #5 from Sunday closed.

**2026-06-01 (styer-competitive-weekly Wk 13): 0 mutations — research only. MASSIVE Phase A win.** Complicated-income SERPs flipped 2/7 → **5/7** in 14 days (Wk 12 was a skip). **NEW top-10 wins:** self-employed mortgage austin tx **#3** (was NOT RANKED), bank statement loan austin tx **#6** (was NOT RANKED), 1099 mortgage austin texas **#7 via self-employed page** (was NOT RANKED). **Asset depletion mortgage texas: #1 + #5 DOUBLE** (both `/asset-depletion-mortgage-texas` AND `/asset-depletion-mortgage-austin-tx.html` top 5). Remaining Phase A gaps: non-qm + dscr (still not in top 10). **Suburb mix:** Buda **★ NEW #4** first-ever, Hutto **#3→#2 ↑**, San Marcos **#9→#8 ↑**, Pflugerville #2 held, Round Rock #9 held; Leander **#4→#6 ↓** + Kyle **#6→#8 ↓** (Big Life/Movement/Guild new entrants). **Bee Cave page now indexed** — 7-run carry-forward CLEARED via `site:` check. ATX Mortgage Lending sitemap still 0/61 suburb pages (3rd consecutive biweekly verify). LendFriend confirmed #1 strategic threat — new visibility at #3 on cash-out. NotebookLM CLI auth still broken (3rd carry).

**2026-05-31 (styer-site-daily Sunday gap-day recovery): 0 mutations, 2 in-window auto-resolutions, race condition with Adam.** Re-Verify Gate cleared homepage `#contact-form` no-`generate_lead` finding (Adam's `14935a5` + `0a72ac8` sitewide `dispatchLeadSubmitted()` JS bridge) + live↔local sitemap drift (Adam's `1d09cc7` + `f3f8f07`). Race: Adam pushed 8 commits during run; rebase pulled cleanly. New Adam files: `llms.txt`, `tests/aeo-structure-regression.test.js`, `tests/lead-flow-regression.test.js`. Gates green post-pull.

## Active Blockers

| Item | Priority |
|------|----------|
| **NEW 2026-05-26: Homepage title pipe normalization (HIGH_RISK deferred)** — `index.html` line 6, `Adam Styer NMLS #513013` missing pipe + title is 107 chars (over 60-char SERP truncation). Adam decision: simple pipe fix OR fuller rewrite leading with "complicated income" positioning + "Mortgage Broker" vs "Correspondent Lender" copy choice | MEDIUM (Adam) |
| **NEW 2026-05-26: /get-preapproved.html title (MEDIUM_RISK paid LP)** — missing pipe + `24-Hour Turnaround` performance claim. GOALS.md "no performance-metric marketing" vs voice-guide "same-day PA is real differentiator" tension. Suggested replacement: `Mortgage Pre-Approval Letter Austin TX \| Complicated Income Welcome \| Adam Styer \| NMLS #513013` | MEDIUM (Adam) |
| **NEW 2026-05-26: /hutto-mortgage-lender.html title** — Same-Day Pre-Approval claim + missing NMLS tail. Hutto currently #6 ranking; title doing CTR work. Suggested: `Hutto TX Mortgage Lender \| 40+ Wholesale Lenders \| Adam Styer \| NMLS #513013` | LOW (Adam) |
| **NEW 2026-05-26: SKILL.md infrastructure question** — should styer-site-daily own BLOCKERS.md inside `styerteam-mortgage-site/` instead of `loanos-clone/tasks/seo-sem/`? Current path triggers Vercel deploy of paused LoanOS product | LOW (Adam) |
| **Calculator P0-A 12× inflated PITI bug** — `rate-buydown-calculator.html` lines 1032-1033, patch `patches/calculator-2026-04-20-P0.diff` on disk, sister task flagged 5+ weeks | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **47 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **14/14** consecutive periods — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| **NEW: Homepage/mobile CTAs now route to `#contact-form` quick form (Q10).** Hero + mobile sticky both land on the on-site quick form (in-house funnel, not raw 1003). Open: whether to ALSO surface a direct `/get-preapproved` or `/refinance-quote` path. | MEDIUM (Adam) |
| Homepage body-copy still references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (index.html lines 455, 492, 861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (27th carry; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (Bee Cave CLEARED — page indexed per Wk 13 `site:` check) | HIGH (Adam) |
| Complicated-income SERP gap — **5/7 now ranking (Wk 13)**. Remaining gaps: `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` still not in top 10. Audit each side-by-side vs current #1-3 (CMRE/Capital Home/Stephanie Donnell for non-QM; Newfi/Easy Street/TX Premier for DSCR) | HIGH |
| **Hedged claims to verify (NEW 2026-05-17)** — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets before quoting borrowers | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure (27th carry) + missing FAQPage schema (10th carry) | MEDIUM |
| **Sitewide nav inconsistency (2026-05-17)** — ~75 pages still have older nav order vs index.html's pillar-first reorder | MEDIUM |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity (20 pages), suburb `/calculators` linking gap, suburb `About Adam` standalone vs Contact dropdown. Full detail in TODO.md | LOW (Adam) |
| **5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema** | LOW |
| **Scheduler reliability** — Thu 5/14 no-fire (12th carry); Wed 2026-05-20 + Wed 2026-05-27 no-fire; **3 unscheduled weekend fires in 2 weeks** — Sat 2026-05-22 PM, Sat 2026-05-23 AM, Sat 2026-05-23 PM. Document expected cadence in SKILL.md or tune scheduler. | HIGH (Adam) |
| **NEW 2026-05-28: Complicated-income cluster 0 funnel CTAs to tracked LPs** — 8 cluster pages (non-qm-loans, bank-statement-loans-austin-tx, 1099-only, self-employed, asset-depletion, high-net-worth-mortgage, investor-loans, dscr-loan-austin-tx) route conversion CTAs only through raw 1003 / Calendly / contact.html / tel:. Zero direct links to /get-preapproved or /refinance-quote. Generalizes the existing homepage 0-CTAs blocker to the cluster Adam is positioning around per GOALS.md. Decision: per-product 1003 direct, unified tracked LP, or Calendly-first | MEDIUM (Adam) |
| **NEW 2026-05-28: thank-you.html performance-metric claims** — lines 442-443 + 452-453 carry "Same-day review" / "Letter or quote in 24 hrs" / "one business day". GOALS.md "no performance-metric marketing" vs voice-guide "Same-day pre-approvals — real differentiator." Same tension class as /get-preapproved title blocker — suggested batch with that one | MEDIUM (Adam) |

## What's Next

**Tue 2026-06-02 styer-site-daily = Title Tags + Meta Descriptions rotation** per SKILL.md.

Site-daily priorities:
1. **Tuesday rotation execution** — audit all loan-type + suburb + resource page title formats and meta description lengths. 35/37 already pipe-compliant; the 2 non-compliant (index + get-preapproved) are HIGH/MEDIUM_RISK Adam-pivot carries — surface but do not auto-edit.
2. **NEW LOW carry — Schema-type unification:** homepage uses `MortgageBroker`, about uses `LocalBusiness`. Both valid. MortgageBroker is more specific. 2-file fix once Adam picks direction.
3. **`llms.txt` validation** (NEW Adam file) — verify accessible at `/llms.txt`, structure follows spec. Tuesday is the right rotation to do this since it's adjacent to title/meta surfaces.
4. **Phase A complicated-income tail closure** — audit `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` side-by-side vs current #1-3 (CMRE/Capital Home/Stephanie Donnell for non-QM; Newfi/Easy Street/TX Premier for DSCR). Compare word count, FAQPage schema, AggregateRating, inbound internal-links from the 5 Phase A wins.
5. **Cedar Park "broker beats branch" framing** — lone suburb gap; CrossCountry owns 2 of top 10. Apply Hutto playbook.
6. **Leander + Kyle recovery** — both dropped ↓2 in Wk 13. TODO carries "Leander page deepening" + "Kyle page deepening" now urgent.
7. **Asset depletion defense** — Adam's #1 + #5 double moat. Monthly content-refresh cadence on both pages vs Truss/LendFriend.
8. **Cache-buster sweep** — if Adam rolls another `?v=...` overnight, run the 5-sample sweep early (cheap regression catcher).

Audit roadmap (`SEO-AUDIT-2026-05.md`): 3.2 VA Austin · ~~3.3 Physician~~ ✅ · 3.4 ITIN TX · 3.5 Foreign National TX · Phase 2 external (`SEO-PHASE2-CHECKLIST.md`). Scenario #2 candidates: Self-Employed/Bank-Stmt + DSCR/Investor (double-down on Phase A wins).

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors, scenario |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 24 `*-mortgage-lender.html` pages |
| Rate check | hub + 5 city pages |
| Rate shopper blog | 10 posts |
| Resources | first-time-buyer-guide, glossary, how-to-buy, **scenarios (hub + template + 1 live)**, etc. |
| Deprioritized | usda (noindex, kept live) |

## Session Rules

- Voice: short punchy sentences, conversational, raw, no fluff. HNW = warm conversational, not cold private-banking.
- Business name: "Adam Styer | HyperSmart Home Loans" — never "The Styer Team"
- Match existing HTML/CSS patterns exactly when adding pages
- TX-licensed only — never imply Adam originates outside Texas
- No USDA origination — keep removing from product surfaces as found
- Loan application link: https://hypersmart.my1003app.com/513013/register?time=1779291829279 (anchor text only)
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`

## Session Protocol

Read `/Users/adamstyer/Documents/GOALS.md` first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Active Blockers, What's Next only. Keep under 100 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
