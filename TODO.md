# styermortgage.com — Open Work

## Now (this week)

- [ ] **NEEDS ADAM (NEW 2026-05-17) — Verify 8 hedged-claim items in `FLAG_FOR_ADAM.md`** against current wholesale rate sheets before quoting borrowers from the 6 new niche pages: (1) Fannie 360-month asset depletion divisor — sourced via Truss, pull Fannie B3-3.1-09 directly to confirm. (2) Fannie B3-3.4-19 effective date 2026-03-04 + sub-25% documentation easing — confirm against live Selling Guide. (3) Newrez SmartSelf 50% 1099 expense factor — verify against current wholesale rate sheet. (4) A&D Mortgage P&L parameters (660 FICO, 80% CLTV, $2.5M cap, 3-mo reserves). (5) Acra Lending 1099 parameters (600 FICO, 1-year + 2-month BS option). (6) Retirement haircut convention (70%/80% mentioned as industry-typical, not primary-sourced — Adam's standing answer needed). (7) Non-QM rate premium bps over conventional — pages use "competitive" hedged language; no primary lender disclosure publishes this. (8) Hill Country construction tier pricing ($180-$300/sq ft, $900K-$2.5M typical, $1.5M-$15M premium) — confirm against last few builds. All 8 are hedged on live pages with `<!-- FLAG_FOR_ADAM: ... -->` HTML comments — these are matrix verifications, not blocking accuracy issues.
- [ ] **Sitewide nav update (NEW 2026-05-17)** — only `index.html` nav was updated this session to lead with `mortgage-for-business-owners-austin` pillar + surface Asset Depletion / K-1 / non-QM hub. ~75 other pages still have older Loan Programs dropdown order. Bulk sweep deferred (surgical scope this session). Suggest pairing with Adam's pending sitewide compliance sweep (EHL coverage, NMLS Consumer Access link gaps).
- [ ] **Add NMLS Consumer Access sameAs to Article schema on 5 of 6 new pages (NEW 2026-05-17)** — `mortgage-for-business-owners-austin.html` has it; `asset-depletion-mortgage-texas`, `k1-income-mortgage-austin`, `1099-only-mortgage-texas`, `p-and-l-mortgage-texas`, `one-time-close-construction-loan-texas` don't. AEO research flagged this as the highest-value E-E-A-T entity signal for an LO author. 5-min sweep, 5 file edits.
- [ ] **OTC §50(a)(5) page polish (NEW 2026-05-17)** — `one-time-close-construction-loan-texas.html` lists 4 absolute requirements (written contract, spousal joinder, 5-day waiting, 3-day rescission). Research lists 5 — the fifth being "contract executed at lender's office, title company, or attorney's office — not kitchen table." Page mentions this as side note; restructure as "five requirements" to avoid a Texas construction attorney challenge.
- [ ] **NEEDS ADAM (NEW 2026-05-15) — Rate-shopper cluster consolidation (5 posts).** Weekly blog editor found a near-duplicate cluster on the "comparing quotes/offers" angle: `blog/how-many-mortgage-quotes-should-i-get.html`, `blog/how-to-compare-two-mortgage-offers.html`, `blog/what-to-compare-besides-mortgage-rate.html`, `blog/is-the-lowest-rate-the-cheapest-loan.html`, `blog/apr-vs-interest-rate-what-actually-matters.html`. Per SKILL.md, 3+ near-duplicate posts trigger a NEEDS ADAM consolidation decision — weekly editor will not touch them until Adam decides. Options: (a) consolidate into 1–2 canonical pillar posts with 301 redirects from the rest; (b) sharpen each post's unique angle so the cluster differentiates; (c) leave as-is and unblock the editor case-by-case. Decision needed before next rate-shopper edit. Weekly editor 2026-05-15 routed around the cluster and refreshed `blog/local-lender-vs-online-lender-austin-central-texas.html` (standalone, not in cluster) instead.
- [ ] **NEEDS ADAM (NEW 2026-05-15) — Thursday 2026-05-14 styer-site-daily did NOT fire.** No `run-logs/2026-05-14.md`. Internal Linking + Funnel Flow rotation skipped. Action: check scheduled-task scheduler logs to confirm whether the fire was scheduled and silently failed, OR whether it was deliberately skipped. If failed, re-run Thursday rotation manually or wait for next Thursday's natural rotation. **UPDATE 2026-05-15 PM:** Friday 2026-05-15 also had a duplicate same-day fire (AM 09:49 + PM 09:53). Scheduler reliability degrading — worth a manual review of the scheduled-task scheduler.
- [ ] **LOW_RISK bundle (NEW 2026-05-15)** — `2026-04-27-why-home-prices-arent-crashing.html` missing FAQPage schema (gap vs other rate-shopper posts which all have FAQPage). Bundle with existing 18-carry CTA structure fix (relative `../get-preapproved` → absolute, add `/refinance-quote` since post discusses sitting-on-equity audience). Deferred per Adam non-engagement on prior 18 carries; surface again on Friday 2026-05-22 rotation if still untouched.
- [x] **Footer Awards sitewide standardization** — 56 of 57 site files batched 2026-04-25; about.html timeline-date span surfaced as MEDIUM Adam-decision (different element, not in footer-Awards scope)
- [x] **AEO sweep — how-many-mortgage-quotes + local-lender-vs-online** — both fixed 2026-04-25 AM (6/10 rate-shopper posts AEO-clean)
- [x] **AEO sweep — what-delays-closing + how-to-read-a-loan-estimate** — both fixed 2026-04-25 PM (8/10 rate-shopper posts AEO-clean)
- [x] **AEO sweep — final 2 rate-shopper posts** — what-to-compare-besides-mortgage-rate + is-the-lowest-rate-the-cheapest-loan fixed 2026-04-26 AM. **Series 10/10 COMPLETE.**
- [x] **AEO sweep — should-i-refinance** — body `<p><strong>` (56w) added 2026-04-26 PM. **`blog-post-header` template cluster 14/14 COMPLETE** (10 rate-shopper + 4 dated 2026-* posts).
- [ ] **AEO older-template cluster (NEW)** — ~16 dated 2026-* posts using older `<header>` (page-level) + `<article class="blog-article">` template. Audit method needs upgrade: find first body `<p>` after `<h1>` inside `<article>`/`<main>`. First pair: cash-out + fha-vs-conventional. Cadence: 2 posts/AM run paired by topic.
- [ ] **NEEDS ADAM (ESCALATED — 18th run)** — Apply NotebookLM SKILL.md retirement patch. Concrete unified-style diff in `run-logs/2026-04-26.md` (AM) FLAG_FOR_ADAM section. Replaces lines 57-72 of `~/.claude/scheduled-tasks/styer-site-daily/SKILL.md`. One-shot edit retires the broken Python script call and leans on carry-forward NOTEBOOK_INSIGHTS.
- [ ] **NEEDS ADAM (NEW 2026-04-26 PM)** — thank-you.html uncommitted change in working tree: `ty-alt-paths` reveal logic for refi/preapproval thank-you-types. Not from any current scheduled task. Decision: commit (with deploy verification) or revert.
- [ ] **NEEDS ADAM** — about.html timeline-date span: update "91 Google + 45 Zillow Reviews" to "136+ Google + Zillow Reviews", or leave as historical milestone snapshot. Different element from footer Awards.
- [x] Rate Check page — `/rate-check.html` created with SEO, form, FAQ (2026-04-12)
- [x] Rate Check n8n workflow — `Pf1zWuKAnD4SznSR` active (2026-04-12)
- [x] Rate Check SEO expansion — 5 city pages + 10 blog posts + internal linking (2026-04-12)
- [x] Add rate-check.html to sitemap.xml (done 2026-04-12, plus 15 new URLs)
- [x] Fix suburb quick-form conversion gap (fixed 2026-04-08)
- [x] Week 6 competitive intelligence run — Hutto/Liberty Hill (2026-04-13)
- [x] Week 7 competitive intelligence run — Round Rock revisit + Bee Cave new (2026-04-20)
- [x] Week 8 competitive intelligence run — Cedar Park revisit + Lakeway new (2026-04-27)
- [x] Week 9 competitive intelligence run — Leander + Georgetown rotation (2026-05-04). **First Leander top-10 (#6) ★.** Hutto held #2. Two new threats: Arnaiz Mortgage (refi double-up #1 cash-out + #2 refi); ATX Mortgage Lending (NEW #4 core Austin, 9-suburb body coverage, no dedicated pages yet).
- [x] Week 10 competitive intelligence run — Pflugerville + Kyle rotation (2026-05-11). **BREAKOUT: tracked top-10 jumped 2 → 4.** Pflugerville NEW #4, Kyle NEW #8 (both pre-existing — rotation cadence under-measures wins). Hutto held #2, Leander held #6. Joel Richardson reclaimed #1 cash-out; Arnaiz demoted on BOTH refi keywords #1→#3 + #2→#3. ATX sitemap audit: still 0/61 suburb pages.
- [ ] **NEEDS ADAM (NEW 2026-05-11) — NotebookLM CLI auth expired.** `notebooklm login` required. Step 6 push for Week 10 competitive report failed for both SEO notebook (`7f8a80c5-3ffd-442e-880a-f748365a792b`) and Styer Growth Log notebook (`5348ff90-dc61-4604-bcf4-45ff9ac5a26a`). Master log entry persisted on disk at `/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md` but NOT pushed to remote notebooks.
- [ ] **NEEDS ADAM (NEW 2026-05-11) — Bulk suburb audit recommendation.** Pflugerville #4 and Kyle #8 were both ranking pre-measurement — 9-week rotation under-measures wins. Decision: replace rotation with bulk weekly audit of all 18 suburb keywords, OR adopt "movers + new" priority rotation. Current rotation creates 9-11 week detection gaps per suburb.
- [ ] **Pflugerville page deepening (NEW 2026-05-11)** — page NEW #4 for "pflugerville tx mortgage lender". Geneva Financial #1 lists an Arizona address as the "Pflugerville branch" — highest-overtake target ever spotted. Replicate Hutto playbook: add Falcon Pointe, Blackhawk, Highland Park, Bohls Place, Avalon, Sorento, Rowe Lane neighborhoods; Pflugerville ISD by name (Pflugerville HS, Hendrickson HS, Weiss HS); Toll 130 commute corridor + Lake Pflugerville. Goal: #4 → top 2 in 2 cycles.
- [ ] **Kyle page deepening (NEW 2026-05-11)** — page NEW #8 for "kyle tx mortgage lender". Note: Logan Patterson (same parent company Mortgage Solutions LP) at #7 — internal validation, not competition. Replicate Hutto playbook: add Plum Creek, Brookside, Crosswinds, Bunton Creek, Hometown Kyle neighborhoods; Hays CISD by name (Lehman HS, Johnson HS, Hays HS); growth-area angle (Kyle = one of fastest-growing TX cities). Goal: #8 → top 5 in 2-3 cycles.
- [ ] **GSC URL Inspection sweep (BLOCKING — Adam manual, escalated 2026-05-11)** — Submit re-indexing for: bee-cave-mortgage-lender.html (**38+ days, NEVER INDEXED — `site:` returns zero**), **pflugerville-mortgage-lender.html (NEW 2026-05-11)**, **kyle-mortgage-lender.html (NEW 2026-05-11)**, leander-mortgage-lender.html (**push #6 → top 4**, edited 2026-04-28), georgetown-mortgage-lender.html (edited 2026-05-03 — force re-crawl), hutto-mortgage-lender.html (recapture #1 from Big Life), round-rock-mortgage-lender.html (still de-ranked despite indexed), lakeway-mortgage-lender.html (verify schema/AEO).
- [ ] **Refinance page upgrade — refi SERP rotating weekly (UPDATED 2026-05-04)** — Joel Richardson/FCM was #1 cash-out Week 8, demoted to #3 Week 9. Arnaiz Mortgage NEW #1 cash-out + #2 refi Week 9. 2-3 week window where rankings are volatile = opportunity. Audit `/loans/refinance.html` for FAQPage schema with cash-out-specific questions, Texas 80% LTV + 12-month wait, break-even math example. Push now while SERP unstable.
- [ ] **Leander page deepening (NEW 2026-05-04)** — page #6 for "leander tx mortgage lender". Replicate Hutto playbook: add Crystal Falls, Travisso, Caballo Ranch, Bryson, Leander Springs neighborhoods; Leander ISD by name (Tom Glenn HS, Vista Ridge HS, Leander HS); CapMetro Red Line Leander station (commute angle); new construction emphasis. Goal: #6 → top 4 in 2 cycles.
- [ ] **Georgetown "broker beats bank" framing (NEW 2026-05-04)** — Georgetown SERP is most physical-presence-dominated tracked (6 of 10 results have physical Georgetown addresses). Add explicit "Why a broker shopping 40+ lenders beats local Georgetown bank branches" section. Sun City retiree-jumbo angle is the wedge.
- [ ] **ATX Mortgage Lending watchlist (UPDATED 2026-05-11)** — sitemap re-checked 2026-05-11 → 0/61 dedicated suburb pages still. Next re-check 2026-05-25 (biweekly cadence). NEW core-Austin top-5 entrant explicitly targeting Adam's 9-suburb footprint via body-text only. If they add dedicated suburb pages, first-mover advantage erodes.
- [ ] **Lakeway page AEO + jumbo emphasis** — Verify schema, AEO answer paragraph, neighborhood markers (Rough Hollow, The Hills, Lakeway proper, Vineyard Bay), Lake Travis ISD, jumbo loan emphasis. NEXA's "20-year Lakeway resident" line is the local-authority hook to beat.
- [ ] **Pre-approval title rewrite** — `/mortgage-pre-approval-austin.html` — SERP for "get pre-approved austin tx" is contaminated with auto-loan results; an explicit "MORTGAGE pre-approval" hook in the title can capture mortgage-side searcher intent vs MortgageAustin.com #1.
- [x] **Hutto page: AEO paragraph + schema review count 91+ + neighborhood names** — VERIFIED 2026-04-18: AEO ✅, reviewCount = 136 ✅, H2s in question format ✅
- [x] **Liberty Hill page: unique content** — DONE 2026-04-22b (Orchard Ridge, Williamson County tax, H2 question format, footer Awards)
- [x] **Audit /mortgage-broker-vs-bank.html** — comparison table ✅, FAQPage ✅, H2 question format ✅, CTAs fixed → /get-preapproved, title updated 2026-04-22
- [ ] **GSC manual indexing requests** — Bee Cave, Taylor, Smithville, Elgin, Florence, Jarrell (submit in GSC URL Inspection → Request Indexing)
- [ ] **Round Rock #2 → #1** — Add Teravista/Forest Creek/Old Town Round Rock neighborhoods + Round Rock ISD + "beat builder rates" line
- [x] **Bee Cave AEO + ISD content** — AEO ✅ (already present), fixed OG desc "Eanes ISD"→"Lake Travis ISD", added Lakes Edge + calculators link, jumbo ✅ 2026-04-22
- [x] **Pre-approval page AEO audit** — 53-word answer-first paragraph + same-day hook added 2026-04-21
- [x] **Refinance FAQ schema** — "How does a Texas cash-out refinance work in 2026?" added to accordion + FAQPage schema (now 6 questions) 2026-04-21
- [ ] Test rate-check form end-to-end (submit test PDF, verify Supabase + Outlook email)
- [ ] Verify all 15 new pages render on live Netlify deploy
- [ ] Submit updated sitemap to Google Search Console
- [ ] Set up Suburb — Purchase Intent campaign in Google Ads (spec ready, needs manual setup)
- [x] Rename temp/truncated blog slugs — oil-prices → rate-volatility; why-rates-jumped-...-tomo → why-rates-improved-today-bond-rally (2026-04-15); 301s added in _redirects
- [x] Replace placeholder `your-cid` in about.html LocalBusiness sameAs with real CID ChIJYy5uEFPKRIYRmF-k_5gPk74 (2026-04-15)

## Next (before end of April)

- [x] SEO content: condo mortgage guide — DONE 2026-04-03
- [x] SEO content: how-to-buy pillar page — all 24 suburb links added 2026-04-23 (standalone page improved, no duplicate blog needed)
- [x] SEO content: monthly market report series — first post DONE 2026-04-04
- [x] SEO content: FHA Loan Requirements Texas 2026 — DONE 2026-04-10
- [ ] SEO content: "Should I Refinance?" decision guide — next HIGH PRIORITY
- [ ] SEO content: Non-QM expansion page
- [ ] Review `mortgage-pre-approval-austin.html` — has 5 body CTAs in instructional context, may need simplification
- [ ] Re-run PageSpeed mobile audit (last confirmed: 80, 2026-03-20)

## Backlog (someday/maybe)

- [ ] Blog title brand drift — pre-publish lint catches it but root cause is human process
- [x] Homepage hero CTA bypasses tracked funnel — FIXED 2026-04-16 → /get-preapproved
- [ ] Google Ads Refinance campaign (in preparation)
- [ ] Google Ads optimization score push toward 100% (currently 87.9%)
- [x] ~~AEO paragraphs on all 25 suburb pages~~ — DONE 2026-04-12 (run 2) — Kyle, Leander, Pflugerville, Georgetown, Austin-area were last gap

## NEEDS ADAM

Items auto-appended by scheduled remote agents land here. Glance weekly.

- [ ] **FLAG 2026-05-08 — Phase 2 blocked: Phase 1f (Dripping Springs) pre-check failed.** Phase 1f status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 2 can execute. Phase 2 trigger fired today (scheduled 2026-05-08) but bailed without making any content changes. Root cause: Phase 1a (Round Rock) was never executed, blocking the entire Phase 1 chain (1a → 1b → 1c → 1d → 1e → 1f — all six still `pending`). Action required: decide whether to (a) run Phase 1a–1f in sequence, updating PHASES.md to `completed` after each, then re-trigger Phase 2; OR (b) override the pre-check and manually authorize Phase 2 to run independently (Phase 2 content — H2 variation, kill-list merge, llms.txt — does not technically depend on Phase 1 page rebuilds, so independent execution is safe if Adam chooses it).

- [ ] **Bing Webmaster Tools — optional manual setup (2026-04-18 added).** IndexNow is already live (keys + /acd320ce4aaac882bfb455892bdcf208.txt + submitter script + scheduled triggers). IndexNow handles the indexing *mechanism* automatically. Bing Webmaster Tools gives you the *dashboard* — crawl stats, index coverage, manual URL submit, query reports, etc. Not required, but useful observability. Setup, ~10 min:
  1. Go to https://www.bing.com/webmasters → sign in with a Microsoft account
  2. Add site: `https://styermortgage.com`
  3. Verify ownership via one of three options — easiest is "Connect Google Search Console" (imports your GSC-verified ownership in one click)
  4. Once verified, the dashboard lights up. Crawl stats are delayed ~24h on a new property.
  5. Optional: in Settings → IndexNow, paste the key `acd320ce4aaac882bfb455892bdcf208` so Bing associates their dashboard with our IndexNow submissions (gives you submission-log visibility).

- [ ] **IndexNow HTTP 403 — Phase 1a push (2026-05-17).** After pushing Phase 1a rebuild, `python3 _deliverables/indexnow-submit.py --from-git-diff` returned HTTP 403 "Host not in allowlist". URLs attempted: round-rock-mortgage-lender.html, austin-area-mortgage-lender.html, index.html. Likely cause: Bing Webmaster Tools domain not yet verified (see setup note above) — the IndexNow key file exists at `/acd320ce4aaac882bfb455892bdcf208.txt` but Bing hasn't confirmed domain ownership. Fix: complete Bing Webmaster Tools setup, then re-run `python3 _deliverables/indexnow-submit.py https://styermortgage.com/round-rock-mortgage-lender.html`.

- [ ] **FLAG 2026-04-22 — Phase 1b (Cedar Park) blocked: Phase 1a (Round Rock) pre-check failed.** Phase 1a status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 1b can execute. Phase 1b trigger fired today (scheduled 2026-04-22) but bailed without touching cedar-park-mortgage-lender.html. Action required: complete Phase 1a (round-rock-mortgage-lender.html rebuild) and update PHASES.md Phase 1a status to `completed`, then re-trigger Phase 1b.


- [ ] **USDA in how-to-buy loan table (2026-04-23)** — how-to-buy-a-house-in-austin-tx.html loan program table includes `<a href="/loans/usda.html">USDA</a>`. Adam does NOT do USDA. Confirm + remove. Same as Buda/Smithville/Florence/Jarrell USDA blockers.

- [ ] **NotebookLM script path broken (2026-04-23)** — `/Users/adamstyer/loanos/scripts/notebook_advisor.py` not found (loanos/ dir abandoned). Either locate the correct path or retire the NotebookLM step from the daily scheduled task.

- [ ] **FLAG 2026-04-25 — Phase 1c (Leander) blocked: Phase 1b (Cedar Park) pre-check failed.** Phase 1b status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 1c can execute. Phase 1c trigger fired today (scheduled 2026-04-25) but bailed without touching leander-mortgage-lender.html. Action required: complete Phase 1a (round-rock-mortgage-lender.html rebuild) → update Phase 1a to `completed`, then complete Phase 1b (cedar-park-mortgage-lender.html rebuild) → update Phase 1b to `completed`, then re-trigger Phase 1c.

- [ ] **FLAG 2026-04-28 — Phase 1d (Georgetown) blocked: Phase 1c (Leander) pre-check failed.** Phase 1c status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 1d can execute. Phase 1d trigger fired today (scheduled 2026-04-28) but bailed without touching georgetown-mortgage-lender.html. Action required: complete Phase 1a → 1b → 1c in sequence (all three still `pending`), update each to `completed` in PHASES.md, then re-trigger Phase 1d.

- [ ] **FLAG 2026-05-01 — Phase 1e (Pflugerville) blocked: Phase 1d (Georgetown) pre-check failed.** Phase 1d status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 1e can execute. Phase 1e trigger fired today (scheduled 2026-05-01) but bailed without touching pflugerville-mortgage-lender.html. Action required: complete Phase 1a → 1b → 1c → 1d in sequence (all four still `pending`), update each to `completed` in PHASES.md, then re-trigger Phase 1e.

- [ ] **FLAG 2026-05-17 — Phase 1e (Pflugerville) blocked: Phase 1d (Georgetown) pre-check failed.** Phase 1d status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 1e can execute. Phase 1e trigger fired today (interactive session, 2026-05-17) but bailed without touching pflugerville-mortgage-lender.html. Root cause: Phase 1a (Round Rock) was never executed, blocking the entire Phase 1 chain (1a → 1b → 1c → 1d — all four still `pending`). **Decision required:** (a) run Phase 1a → 1b → 1c → 1d in sequence, marking each `completed` in PHASES.md, then re-trigger Phase 1e; OR (b) manually authorize override — update Phase 1a–1d each to `completed` in PHASES.md without rebuilding those pages (accepts that those pages remain in old state), then re-invoke Phase 1e trigger. Option (b) is safe for Pflugerville content quality since the suburb-editor rounds have already differentiated those pages structurally.

- [ ] **FLAG 2026-05-04 — Phase 1f (Dripping Springs) blocked: Phase 1e (Pflugerville) pre-check failed.** Phase 1e status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 1f can execute. Phase 1f trigger fired today (scheduled 2026-05-04) but bailed without touching dripping-springs-mortgage-lender.html. Action required: complete Phase 1a → 1b → 1c → 1d → 1e in sequence (all five still `pending`), update each to `completed` in PHASES.md, then re-trigger Phase 1f. **Root cause:** Phase 1a (Round Rock) was never executed, blocking the entire chain. Resolve 1a first.

## Now (Phase 5 follow-ups — 2026-05-05)

- [ ] **Deploy to Netlify** — `git add` + commit + push (auto-deploys)
- [ ] **Submit 7 new URLs to GSC** — request indexing for `non-qm-loans.html`, `dscr-loans-texas.html`, `dscr-loans-fredericksburg-tx.html`, `dscr-loans-dripping-springs.html`, `bank-statement-loans.html`, `high-net-worth-mortgage.html`, `investor-loans.html`
- [ ] **Mobile nav dropdown test** — verify "Loan Programs" dropdown renders correctly on real mobile device + desktop
- [ ] **FAQ content + FAQPage schema** — add to about.html and calculator hub pages (Phase 5 follow-up)
- [ ] **Audit additional LocalBusiness schemas** — sweep for any other NAP mismatches beyond the about.html fix
- [ ] **Case-study/scenario blocks** — as Adam closes non-QM deals, add to spoke pages for EEAT
- [ ] **Internal linking from blog posts** — wire contextual blog posts to new non-QM pages where natural

## Done (2026-05-05)

- [x] **Phase 1** — SEO audit (`SEO-AUDIT.md`)
- [x] **Phase 2** — SEO plan with deep research (`SEO-PLAN.md`)
- [x] **Phase 3** — Build 7 new non-QM/DSCR pages (hub + 6 spokes)
- [x] **Phase 4** — Site-wide nav restructure (Loan Programs dropdown across 66 files); USDA noindex; about.html NAP fix; internal hub-and-spoke linking
- [x] **Phase 5** — CONTEXT/CHANGELOG/DECISIONS/TODO/sitemap updates + deployment checklist
- [x] **about.html canonical address resolved** — aligned to 5718 Sam Houston Circle (closes 12+ run blocker)
- [x] **USDA cascade decision** — noindex + remove from nav + product card; reversible
- [ ] **Round Rock rebuild live (2026-05-17 — Phase 1a).** Submit https://styermortgage.com/round-rock-mortgage-lender.html to Google Search Console via URL Inspection → Request Indexing.

