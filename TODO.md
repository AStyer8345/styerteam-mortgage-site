# styermortgage.com — Open Work

## Now (this week)

- [x] **Footer Awards sitewide standardization** — 56 of 57 site files batched 2026-04-25; about.html timeline-date span surfaced as MEDIUM Adam-decision (different element, not in footer-Awards scope)
- [x] **AEO sweep — how-many-mortgage-quotes + local-lender-vs-online** — both fixed 2026-04-25 (6/10 rate-shopper posts now AEO-clean)
- [ ] **NEEDS ADAM** — about.html timeline-date span: update "91 Google + 45 Zillow Reviews" to "136+ Google + Zillow Reviews", or leave as historical milestone snapshot. Different element from footer Awards.
- [ ] **NEEDS ADAM** — NotebookLM Step 0 dead 3rd run: restore `notebook_advisor.py` to a known path OR approve removing Step 0 from styer-site-daily SKILL.md. Sunday's run will propose the SKILL edit by default.
- [ ] **AEO sweep — final 4 rate-shopper posts** — what-delays-closing, how-to-read-a-loan-estimate, what-to-compare-besides-rate, is-the-lowest-rate-the-cheapest. Same anti-pattern; 2-per-run cadence completes the series in 2 rotations.
- [x] Rate Check page — `/rate-check.html` created with SEO, form, FAQ (2026-04-12)
- [x] Rate Check n8n workflow — `Pf1zWuKAnD4SznSR` active (2026-04-12)
- [x] Rate Check SEO expansion — 5 city pages + 10 blog posts + internal linking (2026-04-12)
- [x] Add rate-check.html to sitemap.xml (done 2026-04-12, plus 15 new URLs)
- [x] Fix suburb quick-form conversion gap (fixed 2026-04-08)
- [x] Week 6 competitive intelligence run — Hutto/Liberty Hill (2026-04-13)
- [x] Week 7 competitive intelligence run — Round Rock revisit + Bee Cave new (2026-04-20)
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

- [ ] **Bing Webmaster Tools — optional manual setup (2026-04-18 added).** IndexNow is already live (keys + /acd320ce4aaac882bfb455892bdcf208.txt + submitter script + scheduled triggers). IndexNow handles the indexing *mechanism* automatically. Bing Webmaster Tools gives you the *dashboard* — crawl stats, index coverage, manual URL submit, query reports, etc. Not required, but useful observability. Setup, ~10 min:
  1. Go to https://www.bing.com/webmasters → sign in with a Microsoft account
  2. Add site: `https://styermortgage.com`
  3. Verify ownership via one of three options — easiest is "Connect Google Search Console" (imports your GSC-verified ownership in one click)
  4. Once verified, the dashboard lights up. Crawl stats are delayed ~24h on a new property.
  5. Optional: in Settings → IndexNow, paste the key `acd320ce4aaac882bfb455892bdcf208` so Bing associates their dashboard with our IndexNow submissions (gives you submission-log visibility).

- [ ] **FLAG 2026-04-22 — Phase 1b (Cedar Park) blocked: Phase 1a (Round Rock) pre-check failed.** Phase 1a status is still `pending` in PHASES.md — it must reach `status: completed` before Phase 1b can execute. Phase 1b trigger fired today (scheduled 2026-04-22) but bailed without touching cedar-park-mortgage-lender.html. Action required: complete Phase 1a (round-rock-mortgage-lender.html rebuild) and update PHASES.md Phase 1a status to `completed`, then re-trigger Phase 1b.


- [ ] **USDA in how-to-buy loan table (2026-04-23)** — how-to-buy-a-house-in-austin-tx.html loan program table includes `<a href="/loans/usda.html">USDA</a>`. Adam does NOT do USDA. Confirm + remove. Same as Buda/Smithville/Florence/Jarrell USDA blockers.

- [ ] **NotebookLM script path broken (2026-04-23)** — `/Users/adamstyer/loanos/scripts/notebook_advisor.py` not found (loanos/ dir abandoned). Either locate the correct path or retire the NotebookLM step from the daily scheduled task.
