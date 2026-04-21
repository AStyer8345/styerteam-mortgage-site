# styermortgage.com — Open Work

## Now (this week)

- [x] Rate Check page — `/rate-check.html` created with SEO, form, FAQ (2026-04-12)
- [x] Rate Check n8n workflow — `Pf1zWuKAnD4SznSR` active (2026-04-12)
- [x] Rate Check SEO expansion — 5 city pages + 10 blog posts + internal linking (2026-04-12)
- [x] Add rate-check.html to sitemap.xml (done 2026-04-12, plus 15 new URLs)
- [x] Fix suburb quick-form conversion gap (fixed 2026-04-08)
- [x] Week 6 competitive intelligence run — Hutto/Liberty Hill (2026-04-13)
- [x] Week 7 competitive intelligence run — Round Rock revisit + Bee Cave new (2026-04-20)
- [x] **Hutto page: AEO paragraph + schema review count 91+ + neighborhood names** — VERIFIED 2026-04-18: AEO ✅, reviewCount = 136 ✅, H2s in question format ✅
- [ ] **Liberty Hill page: unique content** — Liberty Hill ISD, Williamson County tax, Orchard Ridge/Santa Rita Ranch, MUD districts
- [ ] **Audit /mortgage-broker-vs-bank.html** — comparison table + FAQPage schema; counter MortgageAustin.com
- [ ] **GSC manual indexing requests** — Bee Cave, Taylor, Smithville, Elgin, Florence, Jarrell (submit in GSC URL Inspection → Request Indexing)
- [ ] **Round Rock #2 → #1** — Add Teravista/Forest Creek/Old Town Round Rock neighborhoods + Round Rock ISD + "beat builder rates" line
- [ ] **Bee Cave AEO + Eanes ISD content** — add answer-first paragraph + Eanes ISD + Rob Roy/Falconhead/Lakes Edge neighborhoods + jumbo angle
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
- [ ] SEO content: "How to Buy a House in Austin" pillar page (exists as standalone page, needs blog post)
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

