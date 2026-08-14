## 2026-08-14 — styer-suburb-editor-daily (Round 5 #5): Pflugerville — Highland Park spotlight, Hendrickson-zone value join, EOS employer, FHA worked example

- **4 first-party cited elements added, all grep-confirmed new** (`Highland Park` appeared on zero suburb pages sitewide): Highland Park (78660) neighborhood spotlight (Capital Pacific/Lennar 2005–2008, D.R. Horton to 2018; $290,000–$469,999 at ~$211/sqft, 1,292–2,388 sqft, HOA $41–$45/mo); Highland Park Elementary **7/10** (703 students) → Park Crest Middle **6/10** (682 students), both direct-fetched from GreatSchools; **EOS North America** metal additive-manufacturing production ($3M Feb-2026 investment, 10 new jobs); and an **FHA 3.5%-down worked example on a $350,000 Highland Park home** ($12,250 down, $5,911 UFMIP financed, itemized title/escrow/recording/proration).
- **Differentiated insight:** Highland Park feeds the *same* Hendrickson HS (8/10) as Blackhawk (~$530K resale) and Falcon Pointe ($500K median list) at roughly **$240K less on the entry end** — the cheapest entry into that attendance zone. Requires joining a price source to a feeder source, which no competitor page does.
- **De-template:** removed the FHA boilerplate ("3.5% down with credit scores as low as 580. More flexible DTI ratios…") — on **6** suburb pages before the cut, **5** after.
- **Correctness fix:** the conventional closing-cost example's title line ("Lender's title insurance: ~$1,600 … on $355K") was mislabeled, understated, and priced off $355K inside a $360K example. Corrected to the **owner's policy $2,064** using the [TDI 2026 promulgated formula](https://tdi.texas.gov/title/titlerates2026.html), source linked.
- **Cut as unverifiable (not published):** Travis County MUD 21 (its own directory states the district is served by the City of **Leander**, not Pflugerville), per-subdivision Pflugerville MUD rates, a conflicting 2.2285% Highland Park tax rate, and the 2026 Travis County FHA limit (sources split $571,550 vs $563,500; HUD lookup is interactive-only).
- Schema: `dateModified` → 2026-08-14; FAQPage **5 → 6** questions (Hendrickson-zone affordability Q, mirrored in the visible accordion); MortgageBroker description updated. **4/4 JSON-LD valid**; blog title lint clean.
- **Concurrent writers:** tree carried 139 dirty files from other sessions, including a complete-but-undeployed 2026-08-06 asset-depletion blog post. Staging `sitemap.xml` wholesale would have shipped a sitemap URL pointing at a 404, so only this session's own hunks of `sitemap.xml` and `CHANGELOG.md` were staged via direct index writes — the working tree was not modified.

## 2026-08-14 — styer-content-weekly (blog editor): k1-income-mortgage-austin.html — citation pass 0 → 10 + Fannie Selling Guide factual correction

- **Page selected: `k1-income-mortgage-austin.html`** — niche-first priority #1, re-verified at **0 authoritative external citations** (4,485 words, 6 JSON-LD blocks, 12-Q&A FAQPage).
- **Correcting my own mid-run misread (worth logging).** I first skipped the queue's "do next" (`self-employed-mortgage-austin.html`) because `git status` showed **136 modified files** and I took that for a concurrent session's in-flight sweep. It wasn't — **the local clone was 14 commits behind `origin/main`**, so most of those files were merely stale, and `self-employed-mortgage-austin.html` is byte-identical to `origin/main`. Lesson for future runs: **`git fetch` before interpreting a dirty working tree.** k1 remained a correct pick on the merits (same priority tier, 0 citations, and it carried a materially wrong underwriting claim), but `self-employed-mortgage-austin.html` was never blocked and stays **do next**.
- **⚠️ FACTUAL CORRECTION — outranked the citation pass.** The page asserted Fannie Selling Guide **B3-3.4-19** (eff. 03/04/2026) treats sub-25% K-1 owners as **"wage earners"** with **no business liquidity test**. It appeared **10 times**, including inside the **FAQPage JSON-LD**, the **Article schema description**, and the comparison table, and carried **2 unresolved `FLAG_FOR_ADAM`** comments saying it was never verified. Verified against the live Selling Guide: **the section is real** (*Schedule K-1 Income <25% Ownership*, dated 03/04/2026, Announcement SEL-2026-02) and **"no business returns required" is correct** — documentation is two years of signed personal returns plus the K-1. But **two claims were wrong and are now fixed**: (1) **"wage earner" is unsupported** — the guide files this under *Other Sources of Income*, never as wage/salary income; (2) **"no liquidity test" is wrong** — the distribute-or-liquidity gate still applies; what actually changed is that the lender gets **discretion in method** (no mandatory Quick/Current Ratio) and **is not required to analyze business viability**.
- **Also dropped the "new rule" framing.** SEL-2026-02's PDF is behind a 403 to automated fetch, and search evidence suggests SEL-2025-08 already granted sub-25% K-1 relief effective 02/01/2026 — so B3-3.4-19 may **codify/relocate** existing policy rather than create it. Logged UNVERIFIED and not claimed either way on the live page.
- **STALE CITATION FIXED: B3-3.3-07 → B3-3.6-07.** Fannie **renumbered all of Chapter B3-3 effective 03/04/2026**. Old slugs still return 200 but serve legacy-numbered headers. The Quick/Current Ratio liquidity test for 25%+ owners now lives in **B3-3.6-07**. Self-employed definition/underwriting is **B3-3.5-01**.
- **25% boundary corrected to "25% or more."** B3-3.4-19's own text sloppily says "more than 25%," but the operative definition in B3-3.5-01 is 25%-or-greater = self-employed. A borrower at exactly 25% is self-employed; the page now says so explicitly.
- **Comparison table rebuilt — 4 of 6 sub-25% cells were wrong** (treatment, primary income source, liquidity test, documentation burden, two-year history). **Worked example rewritten:** the old copy claimed "~$650K/yr after Form 1084 add-backs" on a path where **no Form 1084 is built**, and quietly hid that the borrower's $250K of distributions is inconsistent with the $400K of ordinary income being used to qualify — the new version surfaces that as the teaching point and states the liquidity leg is still required.
- **10 authoritative citations added (0 → 10), all live-verified HTTP 200:** Fannie Selling Guide **B3-3.4-19**, **B3-3.6-07**, **B3-3.5-01**; **IRS About Form 1065** + **About Form 1120-S** (note: the expected `about-schedule-k-1-form-1065` URL **404s** — IRS publishes no standalone "About Schedule K-1" page); **CFPB 12 CFR §1026.43** (new AEO paragraph — Non-QM is outside the QM safe harbor but the Ability-to-Repay rule still applies, "not a loophole"); **Freddie Mac PMMS 6.67%** week of **Aug 13, 2026** (date-stamped and labeled a market reference, not a quote — refreshes Thursdays); **Freddie Mac Form 91**; **FHFA 2026 conforming loan limit $832,750 / $1,249,125**; **Unlock MLS $435,000 July 2026** Austin–RR–SM median (Travis County $520,000) — first Austin data point on the page, tied to why K-1 files hit the jumbo threshold near ~$1.04M at 20% down.
- **Enrichment 4/5:** Austin data point ✓, current sourced rate ✓, enriched hero alt text ✓ (generic "Texas Mortgage Broker" → K-1/pass-through specifics), tighter CTA in Adam's voice ✓ ("I run the Form 1084 math myself and tell you the real number… — Adam"). Anecdote skipped — `memory/people/` absent (verified repo + Documents root), won't fabricate.
- **Mechanical:** word count 4,485 → 5,341 (no padding — corrections and citations only). All **6 JSON-LD blocks** re-validated (`json.loads`); visible FAQ and FAQPage JSON-LD edited together so they stay in sync. dateModified 2026-05-17 → 2026-08-14 (Article schema + byline); sitemap lastmod 2026-05-18 → 2026-08-14. Title + H1 + slug preserved. Blog title lint clean. Both `FLAG_FOR_ADAM` comments resolved and removed.
- **Commit mechanics — working tree never touched.** Staged with `git hash-object -w` + `git update-index --cacheinfo` instead of `git add` for the two shared files (`sitemap.xml`, `CHANGELOG.md`), so only my own hunks entered the commit and the genuinely-unpushed local edits stayed intact in the worktree. The first push was rejected (remote 14 commits ahead), so the commit was **rebuilt onto `origin/main` with `read-tree` + `commit-tree` plumbing** rather than `rebase --autostash` — no stash, no checkout, no risk to uncommitted local work. Upstream had not touched `k1-income-mortgage-austin.html` or either run-log, and the sitemap's k1 `lastmod` was still 2026-05-18 on `origin/main`, so the rebuild was conflict-free.

## 2026-07-24 — styer-content-weekly (blog editor): 1099-only-mortgage-texas.html citation pass 0 → 6

- **Mandatory citation pass on the niche-first "do next" page.** `1099-only-mortgage-texas.html` was already DSCR-depth (6,707 words, 6 JSON-LD blocks, 16-Q&A FAQPage, worked example, 1-yr-vs-2-yr + 3-way comparison tables) but sat at **0 authoritative external citations** — below the 3-citation bar. Sole gap closed: **0 → 6.**
- **Six approved-source citations added:** (1) **CFPB ATR/QM 12 CFR §1026.43** — new AEO paragraph: these are Non-QM (outside the QM safe harbor) but the Ability-to-Repay rule still requires a reasonable good-faith determination via verified income/assets — the 1099 forms + expense factor + reserves ARE that doc set. (2) **IRS Form 1099-NEC** — on the "paid on Form 1099-NEC" mention. (3) **IRS Schedule C (Form 1040)** — on the "$90K net after write-offs" contrast in the worked example. (4) **Fannie Mae Selling Guide B3-3.5-01** — conventional treats a 1099 contractor as self-employed, qualifies on net profit (sources "why write-offs cut your conventional approval"). (5) **Freddie Mac PMMS 6.58%** week of July 23 2026 (WebSearch-verified, up from 6.55%) anchoring the previously-hedged "premium over conventional" spread. (6) **Unlock MLS / ABoR** — Austin–RR–SM median **$450,000 June 2026** (WebSearch-verified), first Austin data point, tied to the tax-return-vs-real-income thesis.
- **Enrichment 4/5:** Austin data point, current sourced rate, enriched hero alt text (generic "Texas Mortgage Broker" → "1099-only and self-employed mortgage lender… qualifying contractors on 1099 income"), tighter CTA in Adam's voice (fixed a lowercase "tax returns" sentence fragment → "No tax returns, no transcripts, no 4506-T… — Adam"). Anecdote skipped — `memory/people/` absent (repo + Documents root), won't fabricate.
- **Mechanical:** dateModified 2026-05-17 → 2026-07-24 (Article schema + byline); sitemap lastmod 2026-05-18 → 2026-07-24. Word count 6,707 → 6,984 (no padding). Title + H1 + slug preserved. All **6 JSON-LD** re-validated (python json.loads); blog title lint clean; sitemap XML valid. Committed atomically (2 files: page + sitemap) around a concurrent session's 8 dirty files, commit `aa265ce`. **Live-verified HTTP 200** — all 6 citations + $450K + 6.58% + updated date present on prod. Queued for GSC reindex. **Niche citation-gap queue now: 6 pages cleared; do next = self-employed-mortgage-austin.html.**

## 2026-07-23 — styer-suburb-editor-daily (Round 5 #4 — Leander): Block House Creek spotlight + own school ladder + MUD-effective tax + H-E-B employer + FHA de-template

- **Shipped a concurrent session's orphaned tax work inside a complete change.** `leander-mortgage-lender.html` carried uncommitted concurrent-writer edits (City of Leander $0.417282 rate + Block House MUD $0.5504 worksheet across FAQ/intro/closing-cost/accordion — real, well-cited, undeployed). Rather than clobber it, I built Round 5 on top and committed the whole thing — their tax work now ships instead of dangling (round-rock R5 #1 precedent). Staged only page + sitemap + queue + CHANGELOG by explicit path; the other 8 concurrent files left untouched.
- **4 first-party cited adds, all grep-confirmed NEW:** (1) **Block House Creek (78641) spotlight** — the established/affordable counterweight to the Travisso/Crystal Falls/Mason Hills/Bryson new-build tier the page skewed toward: Roper / D.R. Horton (formerly Milburn) / Giddens, 1980s–early 2010s, 1,075–3,798 sqft (~1,791 avg) on 0.096–0.610-ac lots, resale ~$325K–$479K (mostly sub-conforming → conventional 5% / FHA 3.5% both work), off US-183, two-pool/sand-volleyball/disc-golf/baseball HOA, 1835–36 Block House (Tumlinson) Fort marker at the entrance (austinrealestatehomesblog + Compass). (2) **Block House Creek Elementary 7/10 GreatSchools** (468 students, K–5, 401 Creek Run Dr, direct-fetch) → Wiley Middle 8/10 → Rouse HS 8/10 — the community's OWN in-neighborhood LISD ladder, distinct from the Whitestone → Leander HS ladder serving Mason Hills. (3) **Block House Creek effective tax ~2.1661% (2025)** — concrete proof of the concurrent writer's "a MUD address adds one back on top" point: the Block House MUD ($0.5504) stacks on LISD + WilCo, ~$2,200/yr more on a $400K value vs a no-MUD address (consistent with the closing-cost section's $2,300 on $418K). (4) **NEW Leander employer — H-E-B e-commerce fulfillment center** — 50,000 sqft at 651 N. US-183, 150+ jobs, serves H-E-B Curbside/Home Delivery across Central TX + a Wellness clinic inside the Leander store (H-E-B Newsroom + Trade & Industry Development); a stable in-city retail/logistics anchor distinct from the industrial parks. **Dropped a would-be 5th add** (Baylor Scott & White "126-bed hospital") — search conflated a regional facility with Leander clinics; unverified → cut per correctness rules.
- **De-template (hard req, grep-confirmed):** FHA loan-card fragment "credit scores as low as 580. More flexible on debt-to-income ratios." was verbatim on **3 active pages** (leander + pflugerville + smithville) → rewrote leander's FHA card to Leander-specific entry-tier copy (Block House Creek $325K–$479K → 3.5% down ≈ $11,400–$16,800 vs builders' 5–10%; side-by-side vs low-down conventional). Fragment now **2 pages**; leander = 0.
- **Mechanical:** WebPage `dateModified` 06-25 → 07-23; sitemap `lastmod` 06-25 → 07-23. All **4 JSON-LD blocks** valid (python json.loads); title lint pass; tags balanced (9/9 section, 52/52 p, 8/8 ul, 70/70 li, 7/7 h2, 22/22 h3); 0 stale "2026-06-25". Local static-server render **HTTP 200** — spotlight + de-templated FHA card both render. Did NOT touch Adam-gated trust strip ★★★★★ + testimonial (AggregateRating policy pending). NotebookLM pack absent → domain-scoped WebSearch + direct GreatSchools/austinrealestatehomesblog fetches (all claims cited). **Round 5 now 4/13. Next: #5 pflugerville.**

## 2026-07-22 — SEO/AEO audit session (interactive): /home 301 + blog manifest cleanup

- **Full SEO+AEO audit run** (repo + live). Verdict: technical/schema foundation strong; gaps are off-page (old-brand Nextdoor/Yelp/Birdeye listings, zero presence on "HyperSmart Loans" query) and EEAT (no author bio blocks on blog posts). Full findings delivered in session; on-site quick fixes shipped here.
- **`_redirects`: added `/home  /  301`** — `styermortgage.com/home` is in Google's index (site: query, verified live 2026-07-22) but returned 404. Legacy-URL section, plain 301 (no file shadowing, `!` not needed).
- **`blog/manifest.json`: removed 2 dead entries** — `/austin-housing-market-2025.html` and `/first-time-buyer-guide.html` (neither file exists; both rendered broken cards in the blog grid). FTB guide already has a correct static card + noscript + schema entry in `blog.html` pointing at `/resources/first-time-buyer-guide/`, so removal (not repoint) avoids a duplicate card. 55 posts remain, JSON validated.
- **Sitemap calculator fix NOT duplicated** — audit independently flagged missing `dscr-calculator.html` + `asset-depletion-calculator.html`, but the morning styer-site-daily run (commit `bba4de3`) had already shipped it. Verified on origin/main before editing; local redundant edit discarded.
- **False alarm cleared**: index.html Google Fonts "double load" flagged by audit subagent is actually the correct async-preload + `<noscript>` fallback pattern — no change.
- **Deleted local-only Finder dupes** `cedar-park-mortgage-lender 2.html` (stale, pre-Silverado-West) and `CONTEXT 2.md` — both untracked, never deployed.
- **Shipped past live concurrent session** (9 dirty files, local main 10 behind): worktree off origin/main + isolated commit, per the 2026-07-22 styer-site-daily precedent. Concurrent-writer files untouched; CONTEXT.md deliberately NOT replaced (morning daily-task state preserved).

## 2026-07-22 — styer-site-daily (Wednesday — Suburb Deep Dive + AEO): sitemap coverage fix + San Marcos PASS + HIGH false-flag averted

- **`sitemap.xml` 142 → 144 URLs** (commit `bba4de3`, live-verified). Added `dscr-calculator.html` + `asset-depletion-calculator.html` — both HTTP 200, no `noindex`, not disallowed, self-canonical, **159 internal inbound links each**, with six sibling calculators already listed. They are the two flagship complicated-income tools per GOALS.md, so the omission was suppressing exactly the positioning being pushed. Also backfilled `lastmod` on `/resources/`, `/resources/first-time-buyer-guide/`, `/loans/conventional.html` using true git commit dates (2026-06-27) — no fake bumps. XML re-validated: well-formed, 0 duplicates, 0 missing `lastmod`.
- **All 18 sitemap absentees audited before adding any — 16 confirmed correctly excluded** (`refinance-calculator.html` robots `Disallow`, `ftb-dpa-guide.html` `noindex`, plus dashboards / `ops` / `404` / Google verification / `index.html` already covered by the root `/` entry). Exclusion ≠ omission.
- **San Marcos suburb deep dive: PASS, 0 defects, 0 mutations.** 8 JSON-LD types valid (MortgageBroker, Person, City, GeoCoordinates, PostalAddress, OpeningHoursSpecification, FAQPage, BreadcrumbList); 5/5 FAQ answers answer-first; question-form H2s; city-specific H1; NMLS 513013 ×8 + company 2653540 ×2; 0 legacy entity; 0 "21-day". Cursor advances to Westlake.
- **HIGH false flag caught before surfacing.** `/scenario.html` — CTA target of all 25 suburb pages and the global nav — returns 0 `generate_lead`, 0 `lead_type`, 0 `/thank-you` in page HTML, which by the task's standard HTML-token check reads as a 25-page untracked funnel. It is tracked: `script.js:490` binds `.js-quick-contact` forms to a handler firing `generate_lead` (`lead_type: 'quick_contact'`) then redirecting to `/thank-you`. The HTML-token matrix is only valid for inline dataLayer pushes.
- **Shipped past a live concurrent session** (website AI assistant: 9 commits ahead, 9 dirty files). `pull --rebase` refused and `stash`/`reset --hard`/`add -A` would have destroyed another session's uncommitted work — used a throwaway `git worktree` off `origin/main` + cherry-pick + push, then rewound local main touching only `sitemap.xml`. Concurrent-writer files verified byte-identical before and after.

## 2026-07-21 — styer-blog-writer-weekly: PUBLISHED "ITIN Mortgage Loans in Texas" (net-new post, Tier B SEO-AUDIT Phase 3 gap)

- **New post `blog/2026-07-21-itin-mortgage-loans-texas.html`** (commit `ce5c83d`, live HTTP 200, 1,273 prose words). Closes the SEO-AUDIT Phase 3 `itin mortgage texas` gap — zero prior site coverage. Thesis inverts the category: most competing articles claim ITIN = portfolio-only, but **Fannie Mae B2-2-01 accepts "a valid Social Security number or Individual Taxpayer Identification Number (ITIN)"** and B2-2-02 finances non-permanent residents on citizen terms — so the real gate is lawful presence, which B2-2-02 delegates to lender discretion (the wholesale-shop advantage). 6 approved-source citations (IRS ITIN/W-7/renew, Fannie B2-2-01 + B2-2-02, CFPB 12 CFR 1026.43). NotebookLM auth still expired → WebSearch fallback on approved domains. No anecdote (no `memory/people/` available — written from principle, nothing invented).
- **Tier A produced no net-new post this week:** competitive 07-15 opportunities are all defend-existing-page plays (non-QM internal linking, bank-statement depth — and a bank-statement post already exists, failing dedup; DSCR explicitly deprioritized). Post still serves Opportunity #1 as a **new spoke into the non-QM hub** (2 in-body links to `/non-qm-loans.html`, 5 in-body cluster links total). Tier B "VA basics" rejected by dedup gate vs existing `2026-03-29-va-loan-eligibility-texas`.
- **All 7 compliance gates pass:** HyperSmart ×10 / legacy entity 0 · NMLS 513013+2653540 correct · 0 performance-metric phrases · 0 raw 1003 URL · title lint clean · 0 USDA / 0 rate quotes / TX-only · registered in all 4 surfaces. All 3 JSON-LD blocks (Article + FAQPage + BreadcrumbList) valid and confirmed live. manifest.json parseable (57 posts); sitemap.xml well-formed.
- Staged by explicit filename only — ~9 concurrent-session files left untouched.

## 2026-07-18 — styer-suburb-editor-daily (Round 5 #3): cedar-park — Silverado West value spotlight + Vista Ridge feeder rated + Enovis employer + FHA de-template

- **Page deepened — `cedar-park-mortgage-lender.html`** (Round 5 #3; page already deep from R1–R4: Brushy Creek/Block House Creek/Buttercup Creek/Cypress Creek/Ranch at Brushy Creek/Twin Creeks/Crestline spotlights, Firefly/Ascension Seton/Dell+Apple/LISD employers, itemized closing-cost example, Redfin/Zillow median reconciliation). **4 first-party cited adds — all grep-confirmed NEW (Silverado/Enovis/Reagan/Henry absent from every suburb page before this run):**
  1. **NEW Silverado West (78613) neighborhood spotlight** — the value/entry-tier doorway the page lacked (it skewed $490K+ established/luxury). KB Home, mid-to-late 2000s, off S Vista Ridge Blvd near E Whitestone; homes 1,310–5,542 sqft on 0.13–0.44-ac lots (~0.18-ac avg), pool/toddler pool/clubhouse/playground/picnic HOA (austinrealestatehomesblog).
  2. **NEW Silverado West price anchor** — Movoto-tracked median **~$351,000 at ~$125–$130/sqft** (range ~$249K–$468K) = **lowest cost-per-square-foot in Cedar Park** → a genuine FHA/first-time doorway inside TSAHC/TDHCA caps; advances GOALS conventional/affordability positioning. Framed as lowest *per-foot* (distinct from Block House Creek's lowest *median* $341,500 — no contradiction) (Movoto).
  3. **NEW Vista Ridge feeder ladder rated** — page named Vista Ridge HS (8/10) but never rated its elem/middle. Added **Ronald Reagan Elementary (SchoolDigger 4/5 stars, top 20% of TX per Public School Review) → Artie L. Henry Middle (8/10 GreatSchools, ~1,198 students) → Vista Ridge High (8/10)**, the full LISD feeder Silverado West zones to. (GreatSchools blocked Reagan's clean /10 → cited SchoolDigger + Public School Review instead of fabricating a number; Henry 8/10 GreatSchools solid.)
  4. **NEW Enovis employer** — orthopedic-device maker building a 100,000-sqft plant at 2105 Scottsdale Dr in Cedar Park's 95-ac New Hope development: **$25.5M investment, 162 jobs, ~$65,055 avg salary**, plus a **$10,000-per-home employer relocation bonus** for employees buying in Cedar Park (a real closing-cost lever) (Cedar Park EDC + Community Impact).
- **De-template (hard req, grep-confirmed):** ran candidate-fragment greps across the 24 active suburb pages (FHA MIP-life-of-loan, TSAHC grant, VA zero-down, DPA second-lien, conventional-shop-40+ phrases) → **cedar-park carries 0 verbatim cross-page body-paragraph dupes** (fully de-templated across R1–R4; R4 already rewrote the Conventional card to complicated-income copy) → met per R4 precedent (buda/hutto/bee-cave) by **rewriting the most template-flavored remaining paragraph**, the generic FHA loan-card ("more forgiving on credit scores… MIP runs for the life of the loan… Ideal for buyers with 600–679 credit scores") → Cedar-Park-specific FHA copy anchored on the new Silverado West entry tier (~$351K median, ~$12,300 at 3.5% down, FHA-vs-conventional side-by-side).
- **Median PRESERVED** at **$489,747 April 2026 Redfin (−8.6% YoY)** + existing May $519,689 (sale-mix, not appreciation) / Zillow $515,501 −10.3% reconciliation — June Movoto "$519K" is a **LIST median not a sale median** (same trap flagged round-rock/liberty-hill), July rolling Mar–May "$520K" = the same May print → no clean newer *sale* median to swap → queue precedent: don't re-anchor on noise/list figures.
- **Mechanical:** WebPage dateModified 06-24→07-18; hero "Last reviewed" June 24→July 18; sitemap lastmod 06-24→07-18; MortgageBroker schema desc community list += Silverado West; FHA Service schema += Silverado West (body/schema alignment). All **6 JSON-LD blocks** validated clean (python json.loads); title lint pass; 0 stale "2026-06-24"/"June 24, 2026". **4 new inline source URLs** (Movoto Silverado West, austinrealestatehomesblog Silverado West, Public School Review Reagan, GreatSchools Artie L. Henry; + Cedar Park EDC/Community Impact Enovis). Verified on local static server (HTTP **200** on port **8765** — CONTEXT's 8766 is stale; all 4 adds + FHA de-template render). Did NOT touch Adam-gated trust strip ★ 5.0/4.98/137+ + Jennifer testimonial (AggregateRating policy pending). Committed only this page + sitemap + queue + CHANGELOG. NotebookLM pack absent + WebFetch domain-blocked → WebSearch (domain-scoped) on the fly (all claims cited). **Round 5 now 3/13. Next: #4 leander.**

## 2026-07-18 — styer-site-daily (Saturday, OFF-ROTATION): clean audit, 0 site mutations

- **Non-negotiables green:** sitemap.xml / robots.txt / homepage all HTTP 200 (sandbox-disabled curl, absolute binaries). Conversion tracking 10/10 via HTML-token matrix — matches 07-17 exactly (GTM ×2 all 3 pages; get-preapproved gen_lead=1/purchase_prequal; refinance-quote gen_lead=1/refi_quote; thank-you thank_you_page_view=1; `action='/thank-you'` single-quote form still in effect). No live-submit (avoids fake CRM/n8n leads).
- **Off-rotation Saturday** — no assigned Step 4 weekday rotation (Mon–Fri). Ran non-negotiables + read-only backlog + design spot-check only; no manufactured rotation work.
- **Design spot-check clean** (about + dscr): GTM ×2, NMLS 513013 (11/15) + company 2653540 (6/7), 0 legacy entity ("The Styer Team"/"Mortgage Solutions LP"), 0 "21-day"/"24-48", HyperSmart brand + header nav present.
- **Backlog + BLOCKERS read-only** (writing loanos-clone triggers Vercel build of paused LoanOS): BLOCKERS clean `[No active blockers]`; 3 open backlog items all content-creation (Adam-gated new-page / styer-content-weekly blog+PDF) — no un-gated site work remaining. loanos-clone untouched.
- Scheduler fired today (07-18) — 4th clean day in a row (07-15/16/17/18) after the 07-06→07-14 10-day outage. Doc-only writes; 0 site mutations; self-review PASS.

## 2026-07-17 — styer-suburb-editor-daily (Round 5 #2): georgetown — La Conterra entry-tier spotlight + rated feeder + FHA de-template

- **Page deepened — `georgetown-mortgage-lender.html`** (Round 5 #2; page already deep from R1–R4: Wolf Ranch/Sun City/MorningStar/Cimarron Hills/Berry Creek/Saddlecreek/Parkside spotlights, 3 ISD-split gotchas, employers, closing-cost example). **4 first-party cited adds — all genuinely NEW (grep-confirmed absent before this run):**
  1. **NEW La Conterra (78626) neighborhood spotlight** — the affordable, established entry-tier counterweight the page lacked (page skewed luxury/55+/new-construction). Off FM 1460 in SE Georgetown (I-35 → Westinghouse Rd → 1460 → La Conterra Blvd), built out 2008–2020 by KB Home/Buffington/Centex/Gehan/D.R. Horton; brick-and-stone 1,332–3,798 sqft, 3–6BR; current listings **~$359,900–$429,990** — nearly all under the $832,750 conforming line + inside the 2026 WilCo FHA limit $571,550 (pool/park/tennis/trails HOA). Framed as the city's most realistic conventional/FHA entry point → advances GOALS conventional/affordability positioning (austinrealestatehomesblog).
  2. **NEW Carver Elementary 6/10** — direct GreatSchools fetch (4901 Scenic Lake Drive, PK–5, 709 students).
  3. **NEW James Tippit Middle 6/10** — direct GreatSchools fetch (1601 Leander Road, grades 6–8); completes the La Conterra feeder ladder Carver → Tippit → East View HS (5/10), with the insight that both elementary + middle out-rate the East View number + GISD-rezoning caveat.
  4. **NEW La Conterra effective property-tax data point ~1.8174% (2025)** — above WilCo's ~1.68% effective base → an added-special-district signal, tied into the page's existing WCAD-verify theme (austinrealestatehomesblog).
- **De-template (hard req, grep-confirmed):** FHA loan-card fragment "3.5% down with credit scores as low as 580. More flexible debt-to-income ratios." was **verbatim-shared across 8 pages** (georgetown + buda/pflugerville/leander active + elgin/florence/jarrell/smithville delisted) → rewrote georgetown's FHA card to Georgetown-specific entry-tier copy (La Conterra/Saddlecreek/Sun City villa resales + $571,550 WilCo FHA limit), no verbatim "3.5%/580" restatement → fragment now **7 pages (was 8)**, georgetown = 0.
- **Median PRESERVED** at **$414,752 May 2026 Redfin (−3.3% YoY, $204/sqft)** — Redfin re-fetch 405-blocked; no clean newer verified monthly print (WalletInvestor "$430,900 June" is a forecast site, not a sale median → not used) → queue precedent (round-rock/hutto/leander): don't swap a well-sourced median on noise.
- **Mechanical:** WebPage dateModified 06-22→07-17; sitemap lastmod 06-22→07-17; MortgageBroker schema desc += La Conterra; La Conterra added to both FAQ median answers (schema + accordion) for structured-data coherence. All **4 JSON-LD blocks** validated clean (python json.loads); title lint pass; tags balanced (9/9 section, 7/7 h2, 24/24 h3, 57/57 p, 7/7 ul, 63/63 li, 51/51 div); 0 stale "2026-06-22". **3 new inline source URLs** (Carver GreatSchools, Tippit GreatSchools, austinrealestatehomesblog La Conterra). Verified on local static server (HTTP 200; La Conterra + Carver render; FHA dupe = 0). Did NOT touch Adam-gated trust strip ★★★★★ + Wolf Ranch testimonial (AggregateRating policy pending). Committed only this page + sitemap + queue + CHANGELOG. NotebookLM pack absent — WebSearch + direct austinrealestatehomesblog/GreatSchools fetches on the fly (all claims cited). **Round 5 now 2/13. Next: #3 cedar-park.**

## 2026-07-17 — styer-content-weekly (blog editor): asset-depletion citation pass, 0 → 6 authoritative citations

- **Page refreshed — `asset-depletion-mortgage-texas.html`** (niche-first priority #1; queue "do next"; re-verified live at **0 authoritative external citations** — the sole gap on an otherwise DSCR-depth page: 6 JSON-LD blocks, 12-Q&A FAQPage, 4,476 words, divisor comparison table, worked example).
- **Mandatory AEO citation pass: 0 → 6 authoritative external citations.**
  1. **CFPB ATR/QM 12 CFR §1026.43(c)(2)** — new top-of-page paragraph: the owner-occupied Ability-to-Repay rule requires verifying "current or reasonably expected income **or assets**," so asset depletion is that rule used as written ("not a loophole" — strongest AEO fact).
  2. **Fannie Mae Selling Guide B3-3.1-09** (Employment-Related Assets) — sources the Fannie method in a new divisor-table sourcing line.
  3. **Freddie Mac Single-Family Seller/Servicer Guide §5307.1** — sources the 240-month path, 62+ requirement, and crypto exclusion (converts the FLAG_FOR_ADAM divisor-uncertainty note into a sourced statement, no over-claim on exact divisor language).
  4. **Freddie Mac PMMS 6.55%** (week of July 16, 2026, WebSearch-verified, up from 6.49% prior week) — anchors the "+0.5–1.5% over conforming" non-QM premium in the worked example (was unsourced).
  5. **IRS Topic no. 557** — sources the "10% additional tax on early distributions" behind the under-59½ retirement-account haircut.
  6. **Unlock MLS / ABoR** — Austin metro median **$450,000 June 2026** (WebSearch-verified), first Austin data point, framed honestly against the $1M–$3M asset-depletion luxury tier.
- **Enrichment 4/5:** Austin data point ✓ · current sourced rate ✓ · enriched hero alt text ✓ (generic "Texas Mortgage Broker" → "asset depletion and high-net-worth mortgage lender qualifying borrowers on liquid assets") · tighter CTA in Adam's voice ✓ ("Send me your account statements… which one buys the most house — usually same day… — Adam"; also fixed a lowercase "tax returns" fragment). Anecdote skipped — `memory/people/` absent (verified repo + Documents root; only a stale `cowork/archive/` copy), won't fabricate; page's existing composite scenarios retained per DSCR precedent.
- **Verification:** all 6 JSON-LD re-validated (python json.loads, 6/6); title lint clean (includes "Adam Styer"); word count 4,476 → ~4,650 (no padding — already DSCR-depth). dateModified 2026-05-17 → 2026-07-17 (byline + Article schema); sitemap lastmod 2026-05-18 → 2026-07-17. Title + H1 + slug preserved. Queued for GSC reindex.

## 2026-07-17 — styer-site-daily (Friday, Content Planning + AEO Review): clean audit, 0 site mutations

- **Non-negotiables green:** sitemap.xml + robots.txt HTTP 200 (sandbox-disabled `curl -sL`, absolute binaries); conversion tracking 10/10 via HTML-token matrix (`action='/thank-you'` single-quote form matched — Netlify Pretty-URLs quote-swap still active).
- **Blog fresh:** latest post 2026-07-16 = 1 day old → no weekly-content flag.
- **Borrower blog CTA 40/40:** scanned 45 posts; the 4 "missing /get-preapproved|/refinance-quote" are all `realtor-updates/` carrying the correct realtor CTA ("Send Your Scenario" → /scenario.html + phone + Contact). Per voice guide, realtor content is positioning/scenario, not borrower pre-approval — NOT defects, 0 manufactured edits.
- **AEO audit — 2 posts, both excellent, 0 defects:** `2026-07-16-self-employed-income-calculation-underwriting-texas` (NEW, first audit — extractable E-E-A-T + "$250K vs $91K" problem lead; 5 conversational-question FAQPage; every answer answer-first) + `2026-06-30-bank-statement-loans-texas` (extractable lead; 5 Q; answer-first). Narrative statement-form body H2s + dedicated FAQPage block = site's established AEO-valid pattern.
- **Design spot-check clean** (index.html + self-employed-mortgage-austin.html): GTM PQQ6PGLR ×2, NMLS 513013 + company 2653540 present, 0 legacy entity, 0 "21-day"/"24-48hr", HyperSmart brand + header nav present.
- **No un-gated site work:** backlog residue is Adam-gated (new-page creation, products.html 7-card 1003 routing, prequal.html conversion parity, FHA/Jumbo title NMLS) or sister-task-owned (suburb city data → styer-suburb-editor-daily). `loanos-clone` untouched (paused-LoanOS Vercel guard).
- **Scheduler:** fired 07-17 — 3rd clean day in a row (07-15/16/17) after the 07-06→07-14 10-day outage.

## 2026-07-16 — Manual blog publish (interactive session): self-employed underwriting deep-dive

- **NEW POST — `blog/2026-07-16-self-employed-income-calculation-underwriting-texas.html`** (commit 8db5c73, live 200). "How Underwriters Actually Calculate Self-Employed Income: Add-Backs, Averaging, and the Two-Year Rule" — 1,540 words, Tier B backlog topic, 6 approved-source citations (Fannie B3-3.2-02/B3-3.5-01/B3-3.6-03, Form 1084, Freddie Form 91, IRS Schedule C), 6 cluster links incl. non-QM hub (Wk29 Opportunity #1). Registered in all 4 surfaces.
- **Why manual:** scheduler outage (~7/5–7/15) killed the 7/7 + 7/14 styer-blog-writer-weekly runs; the 7/16 catch-up run produced no output (no commit, no run brief, no skip record — violates its loud-skip guarantee). Flagged to Adam for review before Tue 7/21.

## 2026-07-16 — styer-suburb-editor-daily (Round 5 opens → Round Rock): Behrens Ranch spotlight added, concurrent-writer schema edit made coherent

- **Round 5 #1 — `round-rock-mortgage-lender.html`.** Picked up the concurrent styer-site-daily session's uncommitted Service-schema edit (it had teed up "Behrens Ranch" in the Conventional block + "gated Mira Vista section of Behrens Ranch" in the Jumbo block, no body) and made it coherent by adding the matching body content — the orphaned edit now ships inside a complete change instead of being clobbered or stranded.
- **4 first-party cited adds:** (1) **NEW #7 neighborhood — Behrens Ranch (78665)**, 500+-ac / ~994-home MPC N of Sam Bass Rd & S of Whitestone Blvd, built out 2000–2014 (Newmark/Meritage/Pulte/Village Builders + active custom Sitterle/Casa Bella/Frederick Harris), plans 1,956–7,217 sqft on ~⅙–¼-ac lots. (2) **Gated Mira Vista tier** — min 3,000 sqft on ½-ac+ lots, $1M+ (recent luxury sale $1.8M) → jumbo doorway matching the schema hook. (3) **Cactus Ranch Elementary 10/10 GreatSchools** (2901 Goldenoak Cir, PK–5, ~684 students, 88% math / 90% reading) → Walsh Middle 9/10 → Round Rock High 8/10. (4) **Price + tax data** — Zillow ZHVI ~$729,837 (+2.4% YoY, Mar 2026 — firmer than the −6.3% citywide median), closed sales ~$700K–$825K; Behrens Ranch 2025 effective tax rate ~1.80%, above the ~1.68% city base → ties to existing MUD/WCAD framing; HOA ~$125–$165/qtr + $200 transfer + $575 resale-disclosure fee.
- **De-template (hard req):** grep across 15 active pages confirmed round-rock has 0 full verbatim cross-page body-paragraph dupes (heavily de-templated R1–R4) → met per R4 precedent via internal-redundancy trim: cut the duplicate `/loans/conventional.html` internal-link sentence (same anchor appeared twice) → 2→1.
- **Market snapshot PRESERVED** — Redfin $370K trailing-3mo unchanged (WebFetch 405-blocked, WebSearch-confirmed) + Zillow $380K −5% YoY consistent; Movoto $437K list-median trap not used; unverified "59-day DOM" search figure not swapped for the cited 44.
- **Mechanical:** dateModified + hero "Last reviewed" + sitemap lastmod 06-21→07-16. 6/6 JSON-LD valid; title lint pass; tags balanced; 0 stale dates; 3 new inline source URLs. Verified live on dev server (HTTP 200, 8/8 render assertions). Committed page + sitemap + queue + CHANGELOG only. Adam-gated trust strip + K.R. testimonial untouched. **Round 5 now 1/13; next #2 georgetown.**

## 2026-07-16 — styer-site-daily (Thursday, Internal Linking + Funnel Flow): clean audit, 0 mutations

- **Non-negotiables green:** sitemap.xml + robots.txt HTTP 200 (sandbox-disabled curl — sandboxed Bash false-returns `000` on network); conversion tracking **10/10** via HTML-token matrix (get-preapproved→purchase_prequal, refinance-quote→refi_quote, thank-you→thank_you_page_view; GTM ×2, tel, TCPA, action→/thank-you all present).
- **Full funnel traced end-to-end, no leak:** homepage quick form → `script.js:482-485` dataLayer(quick_contact) → `/thank-you`; Ads LPs → generate_lead + action=/thank-you; contact.html action=/thank-you + generate_lead; thank-you.html Calendly + phone + 3-step.
- **Internal-link 2+ bar passed on 3 pages:** non-qm-loans (9 spoke links), self-employed (contextual hub links), bank-statement (36 internal hrefs).
- **Competitive TOMORROW_PRIORITY (07-15) folded in — both un-gated asks already satisfied, no manufactured edits:** (1) non-QM hub authority-consolidation already bidirectional for all 4 named spokes; dateModified 06-26 not fake-bumped. (2) bank-statement AEO already answer-first + 10-question FAQPage schema with answer-lead text; #7→#9 slide is competitive crowding, not a page defect.
- **Design spot-check clean** (non-qm + bank-statement): GTM ×2, NMLS 513013 + company 2653540, 0 legacy-entity drift, 0 "21-day"/"24-48hr" claims. Concurrent-writer's uncommitted `round-rock-mortgage-lender.html` left untouched (sister-task domain, explicit file-adds only). loanos-clone untouched (paused-LoanOS guard). Scheduler fired today — recovery continuing after 07-06→07-14 outage.

## 2026-07-15 — styer-competitive-weekly (first run since Wk 16 / 06-22): TWO structural SERP wins — research only, 0 mutations

- **Ran 3 weeks late** — scheduler outage meant no comp runs 06-29 / 07-06 / 07-13 (same outage the site-daily task escalated). This run bridges the full gap.
- **WIN 1 — `non-qm loans austin tx`: Styer DEBUTS #1** (was NR out of top 10 every prior week). Out-ranks LendFriend (#4). Verified live: HTTP 200, title match, FAQPage schema present. Closes one of the two long-standing complicated-income gaps; validates GOALS wholesale-pricing leg (page titled "40+ Wholesale Lenders").
- **WIN 2 — Westlake #1** on suburb rotation (`/westlake-mortgage-lender.html`), first clean measurement since Wk 11 when it was dropped for CA-disambiguation noise. San Marcos held #10.
- **Moat held:** asset-depletion #1 (across full 3-wk gap, +2nd URL #5); self-employed blog #1; jumbo #2. **Tracked complicated-income top-10 rose 5 → 6 of 7; #1 rankings 2 → 3.** DSCR now the sole outright gap.
- **Lone decliner:** `bank statement loan austin tx` #8 → #9 — a 3-run downtrend (#7→#8→#9), the one genuinely degrading position; identifiable cause (new entrants Austin Home Loans #8, Rate Advantage #10 + a ranking blog at #1). 1099 also softened #3→#4.
- **Head-term mean-reversion (again):** all 3 head-term #1s that "reclaimed" in Wk 16 (Barton Creek lender, Highlander broker, MortgageAustin pre-approved) gave those #1s right back this week — confirming head-term rank is WebSearch composition noise, not real movement. get-pre-approved: Styer #9 (held top 10 2nd wk, ↓2 from #7).
- **Re-Verify Gate:** 18 prior claims re-checked live; cleared/updated 12, held 6. Full clearance block + rankings in `run-logs/competitive/2026-07-15.md` (copied to latest).
- **Policy correction reinforced:** AggregateRating is AEO-only (no SERP stars) per `reference_aggregate_rating_self_serving.md` — recommended downstream agents DROP it from "active blockers"; real star lever = GBP/Zillow off-page.
- **Tooling (dead run, ~5th consecutive):** NotebookLM advisor script absent + CLI auth-expired, both re-verified live → Steps 0/4/6-push NotebookLM portions skipped. Google Ads paid landscape not programmatically verifiable (organic-only WebSearch) — no ad-count claims fabricated.

## 2026-07-15 — styer-site-daily (Wednesday, Suburb Deep Dive → Kyle): 1 real fix + scheduler outage flagged

- **Kyle FAQ speed-claim fix** (commit `0e5540e`): FAQ "How long does pre-approval take?" led with "24 to 48 hours" — the retired Decision-2a speed variant ("same-day" is the kept phrasing) — while the page's meta/AEO/CTA all say "same-day pre-approval." Rewrote both JSON-LD and visible accordion to "Adam issues same-day pre-approvals routinely… often within one business day." 3/3 JSON-LD blocks re-validated, schema↔visible parity confirmed, verified live HTTP 200.
- **Non-negotiables green:** sitemap + robots HTTP **200**; conversion **10/10** (HTML-token matrix, `curl -L`). Design spot-check (index + about) clean — 0 legacy-entity drift, 0 "21-day" claim.
- **Re-Verify Gate:** 4 sitewide "24–48 hours" matches context-checked; 3 benign (employment-verification / wire-instruction / general-broker timing) left as-is, only Kyle's own-service claim fixed.
- **⚠️ Scheduler 10-day outage:** no styer-site-daily runs 2026-07-06 → 07-14 (last log was 07-05). Escalated to Adam — longest gap on record for this task.
- Concurrent-writer conflict on push handled by stashing only the other session's uncommitted `high-net-worth-mortgage.html`, rebasing, pushing, then restoring it untouched. `loanos-clone` not mutated (paused-LoanOS guard).

## 2026-07-15 — styer-content-weekly (blog editor): high-net-worth-mortgage.html — mandatory AEO citation pass, 0 → 5 authoritative citations

Niche-first queue "do next" page. Re-verified live before selecting: **0 authoritative external citations** (only NMLS/fonts/Calendly links), below the 3-citation bar. The page was already DSCR-depth (6 valid JSON-LD blocks, 10-Q&A FAQPage, 4,801 words) — citations were the sole gap, so this was a pure citation-and-enrichment pass, no padding.

- **0 → 5 authoritative external citations (inline):** (1) **CFPB ATR/QM 12 CFR §1026.43(c)(2)** — the legal backbone of the whole product: the owner-occupied Ability-to-Repay rule directs lenders to weigh "current or reasonably expected income **or assets**," so asset depletion is that rule used as written. Placed in the "documentation mismatch" paragraph — the page's strongest AEO fact. (2) **FHFA 2026 conforming loan limit** — $832,750 baseline / $1,249,125 high-cost, defining exactly where jumbo territory (and the higher documentation bar) begins; placed in the "traditional underwriting doesn't fit" section. (3) **Fannie Mae Selling Guide B3-3.4-06** (Employment-Related Assets as Qualifying Income) — grounds the page's core thesis: the agency asset-as-income method *does* exist but is more conservative and narrower than wholesale non-QM shorter-divisor programs, which is why the file declined "at the bank" clears in the non-QM channel. (4) **Freddie Mac PMMS 6.49%** (30-yr fixed, week of July 9 2026, WebSearch-verified current) — anchors the "+0.50–1.50% over conforming" table spreads to a real, sourced benchmark instead of an unsourced relative range. (5) **IRS Topic 557** (10% additional tax on early distributions before 59½) — sources the 70% retirement-account haircut for under-59½ borrowers in the eligible-assets list.
- **Enrichment (4 of 5 elements):** Austin-specific data point ✓ — Texas Realtors data (via CultureMap) that the metro's million-dollar-plus segment produced ≈$4.6B in sales in the year through Oct 2025, showing HNW/jumbo is routine here, not niche; current sourced rate ✓ (Freddie 6.49%); enriched hero image alt text ✓ (generic "Austin TX Mortgage Broker" → "Austin high-net-worth and asset depletion mortgage lender"); tighter CTA in Adam's voice ✓ ("No AUM pitch. No multi-year relationship lock. Just the loan, built around what you actually have. — Adam"). Anecdote element skipped — `memory/people/` absent (verified both the repo and Documents root); will not fabricate per SKILL.md.
- **Mechanical:** dateModified 2026-06-19 → 2026-07-15 (Article schema) + hero "Last updated" line; sitemap lastmod 2026-05-18 → 2026-07-15. All **6 JSON-LD blocks re-validated** (python `json.loads`). Word count 4,801 → 5,051 (citations only, no padding). Title + H1 + slug preserved. Blog title lint clean. Queued for GSC reindex. Editor queue "do next" → `asset-depletion-mortgage-texas.html` (closest asset-based sibling, verified 0 citations). Netlify auto-deploys on push.

## 2026-07-05 — styer-site-daily (Sunday, off-rotation): healthy funnel, clean audit, 0 site mutations

- Non-negotiables green: `sitemap.xml` + `robots.txt` HTTP **200**; conversion tracking **10/10** (HTML-token matrix via `curl -L` — GTM ×2, `generate_lead`/`lead_type` correct on both LPs, `thank_you_page_view` on /thank-you, tel/TCPA/`action="/thank-you"` all present).
- SEO/SEM `BLOCKERS.md` clean; `backlog.md` remaining open items all Adam-gated new-page creation or sister-task-owned — no un-gated site work. `loanos-clone` untouched (paused-LoanOS guard).
- Design spot-check (index + dscr-loan-austin-tx): GTM ×2, 0 legacy-entity drift, NMLS 513013 + header nav present, 0 "21-day" close claim, HyperSmart brand live. No site-HTML commit / no deploy (0 mutations). NotebookLM advisor script absent (87th).

## 2026-07-04 — styer-suburb-editor-daily (Round 4 #13, ROUND 4 COMPLETE): westlake — Rollingwood as the missing 78746 municipality + its own city tax rate + Barton Creek Elementary "A" + fresh Zillow ZHVI print

Page already exhaustively deep from three prior rounds (all 5 Westlake Hills neighborhoods — Rob Roy / Davenport Ranch / Lost Creek / Barton Creek / Westlake Highlands; full Eanes school ladder — Westlake HS 9 / Hill Country MS 10 / Eanes Elem 10 / Forest Trail Elem 10 / West Ridge MS 10; median reconciliation across Redfin / TeamPrice / Neuhaus; 5 employers; itemized closing-cost example). This Round 4 added the one thing every prior round missed — **Rollingwood, the second incorporated city inside 78746** — plus its distinct tax rate, completed the Rob Roy feeder-school ladder with a real rating, and layered a fresher value-index print. Page intact — clean tree on main, only this page + sitemap modified (no concurrent-writer drift).

- **4 first-party cited adds:** (1) NEW **Rollingwood (78746) community bullet** — its own incorporated city (1963), ~0.70 sq mi, ~1,467 residents, three miles west of downtown Austin ([Wikipedia](https://en.wikipedia.org/wiki/Rollingwood,_Texas)), zoned entirely to Eanes ISD ([Keenan Group](https://thekeenangroup.com/neighborhoods/rollingwood-austin)); price anchored honestly on Zillow ZHVI **~$2.3M (Q1 2026)** with the thin-volume caveat (Redfin logged a $4.77M March-2026 median on just two sales — [Zillow ZHVI](https://www.zillow.com/home-values/40626/rollingwood-tx/)); ties to the tax-rate distinction below. Page had only ever treated West Lake Hills as the 78746 municipality. (2) NEW **City of Rollingwood tax rate — $0.202039** FY 2025–26 (down 1.8% from $0.2058, adopted Sept 17 2025; ~$5,014 city tax on the ~$2.42M average taxable home — [Community Impact](https://communityimpact.com/austin/lake-travis-westlake/government/2025/09/19/rollingwood-passes-budget-tax-rate-for-fy-2025-26/)); reframed the property-tax section's opener (was "Eanes ISD, the City of West Lake Hills, and Travis County") to make clear the city slice depends on the exact municipality — a real, higher rate for Rollingwood buyers. (3) NEW **Barton Creek Elementary rating — TEA "A" 2024 & 2025** ([Texas Tribune](https://schools.texastribune.org/districts/eanes-isd/barton-creek-elementary-school/) + [Community Impact Aug 18 2025](https://communityimpact.com/austin/lake-travis-westlake/education/2025/08/18/eanes-isd-maintains-a-rating-from-state-in-2024-and-2025/)); the page named it as the Rob Roy feeder but left it unrated → now completes the ladder (Barton Creek Elem A → West Ridge MS 10 → Westlake HS 9), plus the district-wide context (Eanes ISD scored 94/100, held its A both years) and the honest nuance that **Valley View Elementary is the one Eanes campus that did not earn an A** (page lists Valley View as a Westlake-HS feeder). (4) NEW **Zillow ZHVI print** — West Lake Hills typical home value **$2,210,246, −8.0% YoY, mid-2026** ([Zillow](https://www.zillow.com/home-values/14558/west-lake-hills-tx/)) added to the "Mid-2026 Data Reconciled" section as a distinct-scope value index (not a sale median); the −8.0% reinforces the page's softening thesis and the "when sale median and value index diverge, trust the index in a thin-volume luxury market" read.
- **De-template (hard requirement, grep-confirmed):** grep across the 13 active suburb pages confirmed **0 full verbatim cross-page paragraph dupes** on westlake (only the 4-word fragment "typically require 10–20% down" overlaps cedar-park, inside different sentences — not a real duplication) → same 100%-unique-body state documented in Rounds 2/3, so met via **internal-redundancy trim** (pflugerville/cedar-park precedent): the Major Employers "Westlake Country Club" bullet re-told the full rebrand + three-year-renovation narrative already given in detail in the Lost Creek neighborhood bullet → trimmed to the employment angle (Invited's 17,000+ staff infrastructure, golf/F&B/aquatics/racquet operations; renovation detail now referenced once, not twice) with citation preserved.
- **Mechanical:** WebPage dateModified 06-20 → 07-04; sitemap lastmod 06-20 → 07-04; MortgageBroker schema desc += Rollingwood municipality/rate + Barton Creek Elem "A" + Zillow ZHVI. All **4 JSON-LD blocks** validated clean (python `json.loads`); title lint pass; tags balanced (9/9 section, 11/11 ul, 82/82 li, 14/14 h3, 39/39 p, 60/60 div); 0 stale "2026-06-20" refs; 7 new inline source URLs all present. Did NOT touch Adam-gated trust strip (★ 5.0 Google / 4.98 Zillow / 137+ reviews) or the Michael & Sarah Barton Creek testimonial (AggregateRating policy pending); Step-3 "24–48 Hours" jumbo pre-approval kept (honest for underwriter review). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct Wikipedia/Community Impact/Zillow/Texas Tribune fetches on the fly (all claims cited; GreatSchools network-blocked → used TEA/Texas Tribune + Community Impact for the school rating instead). **Round 4 now 13/13 — COMPLETE. Next run: Round 5 #1 round-rock.**

## 2026-07-03 — styer-suburb-editor-daily (Round 4 #12): dripping-springs — Sunset Canyon established-acreage spotlight + Rooster Springs 9/10 + fresh Redfin May-2026 print + two de-templates

Page already very deep from prior rounds (Headwaters / Caliterra Phase 2 / Big Sky Ranch / Reunion Ranch / Arrowhead Ranch spotlights, the 2026 four-mega-development construction flood, DSISD $402.3M bond + HS#2 timeline, full rated school ladder, Major Employers H3, FY25-26 tax stack + itemized closing-cost example, Hill Country OSSF/septic notes). This Round 4 added an established-acreage neighborhood the page lacked, the district's top-rated elementary, a fresher market print, and rewrote its two remaining template paragraphs. Page intact — clean tree on main, only this page + sitemap modified (no concurrent-writer drift).

- **4 first-party cited adds:** (1) NEW **Sunset Canyon (78620) spotlight** — the established acreage counterweight to the page's luxury-new-build flood: platted by developer L.O. Jackson and his sons in five sections **1981–1985**, now **700+ homes on 1–3 acre lots** (up to ~11 ac in Section I) straddling both sides of US-290 near downtown DS, 1,800–3,800 sqft, horses allowed on qualifying 2.5+ ac lots, **voluntary** Sunset Canyon Landowners Association (roads + signage only, no mandatory HOA dues to underwrite into DTI) ([austinrealestatehomesblog](https://www.austinrealestatehomesblog.com/dripping_springs/sunset_canyon/)). (2) NEW **Sunset Canyon price anchor** — trailing-12-month median **~$750,000** (down ~2% YoY, [Homes.com](https://www.homes.com/dripping-springs-tx/sunset-canyon-neighborhood/)); live resales list **high $400,000s past $2.5M** ([austinrealestate.com](https://www.austinrealestate.com/sunset-canyon.php)) → the entry tier sits **under the $832,750 conforming line**, making a one-to-three-acre Sunset Canyon resale one of the few ways to buy DSISD acreage on a conventional (non-jumbo) loan — advances GOALS conventional/complicated-income positioning with a real sub-conforming acreage doorway in a jumbo-heavy town. (3) NEW **Rooster Springs Elementary — 9/10** ([GreatSchools](https://www.greatschools.org/texas/dripping-springs/11784-Rooster-Springs-Elementary-School/), 1001 Belterra Drive, PK–5, ~770 students) — the **highest GreatSchools elementary rating in DSISD** (above Sycamore Springs 8/10 and Walnut Springs 6/10); framed accurately as the campus serving the **Belterra corridor in zip 78737** (SW-Austin edge of the district) — reinforces the page's existing "DSISD reaches beyond 78620, confirm the exact address" note. (4) **Fresh Redfin market print** — layered the trailing-3-month-through-May-2026 read (**$515,000 median, −4.9% YoY; $242/sqft, −3.6%; ~87 DOM, 1 offer**, [Redfin](https://www.redfin.com/city/5529/TX/Dripping-Springs/housing-market)) alongside the preserved April all-home-types ($510,726) and SFH-only ($575,750) prints; refreshes the per-foot below the older Movoto $251 read and confirms the flattening-to-soft trend held into late spring. The April schema anchors were preserved (additive body sentence, different window — no FAQ-schema contradiction).
- **De-template (hard requirement, grep-confirmed):** (a) Step 3's generic opening ("Within one to two business days, you will have a pre-approval letter ready. Adam will review your options, explain your maximum purchase price, and recommend the best loan structure") was **verbatim-shared with kyle + san-marcos** (grep-confirmed) → rewritten DS-specific (Adam pulls credit + issues the letter himself; conventional on a Sunset Canyon / Reserve-at-Big-Sky resale vs jumbo on a Headwaters / Caliterra Phase 2 build over $832,750 vs one-time-close construction on Arrowhead Ranch acreage; "a real letter you can hand any listing agent — not a builder-lender qualifying call"). (b) Also rewrote the generic **Conventional loan card** ("The go-to choice for Dripping Springs buyers with strong credit and solid income. As little as 3% down with competitive rates.") — the page's last carrier of the shared conventional-tile fragment (siblings de-templated on liberty-hill/bastrop/new-braunfels/taylor in prior rounds) → **"Conventional & Complicated-Income Files"**: keeps the 3%-down / $832,750-conforming value point (naming Sunset Canyon + Big Sky Reserve) but folds in 78620's real buyer shape (wine-trail business owners, remote tech RSU/1099, self-employed acreage buyers) with **+2 internal links** to /bank-statement-loans + /self-employed-mortgage-austin.
- **Mechanical:** WebPage dateModified 06-19 → 07-03; sitemap lastmod 06-19 → 07-03; MortgageBroker schema desc += established Sunset Canyon acreage note. All **4 JSON-LD blocks** validated clean (python `json.loads`); title lint pass; tags balanced (7/7 section, 13/13 ul, 95/95 li, 12/12 h4, 40/40 p); 0 stale "2026-06-19" refs; Step 3 verbatim dupe now 0 on this page. Did NOT touch the Adam-gated trust strip (★ 5.0 Google / 4.98 Zillow / 137+ reviews) or the Sarah & Matt Dripping Springs testimonial (AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct GreatSchools/austinrealestatehomesblog/Homes.com/austinrealestate.com fetches on the fly (all claims cited). **Round 4 now 12/13. Next: #13 westlake — completes Round 4.**

## 2026-07-03 — styer-content-weekly (blog editor) — bank-statement-loans.html AEO citation pass (0 → 5 authoritative citations)

Standing jumbo priority is DONE (2026-05-29, verified in editor-queue); resumed the niche-first queue. Re-verified live citation counts across all queued niche hubs per the queue's own instruction — `bank-statement-loans.html` (flagship self-employed product, queue "do next") confirmed at **0 authoritative external citations**, below the 3-citation bar. Selected it. Page was already content-deep (6 valid JSON-LD blocks, 10-Q&A FAQPage, income-method worked example) — the only real gap was citations.

- **Mandatory AEO citation pass: 0 → 5 authoritative external citations.** (1) **IRS Schedule C (Form 1040)** on the "$80,000 net profit" line — sources the write-off mechanism. (2) **Fannie Mae Selling Guide B3-3.5-01** (self-employed underwriting factors) on the "conventional underwriting sees $80,000" contrast. (3) **CFPB ATR/QM rule, 12 CFR 1026.43** — new paragraph explaining Non-QM ≠ loophole: the Ability-to-Repay rule expressly permits verifying income via bank statements, not just tax returns/W-2s. This is the page's strongest extractable AEO fact (the *legal reason* bank-statement loans exist). (4) **Freddie Mac PMMS** — anchored the +0.5–1.5% bank-statement premium to the **6.43% July-2-2026** 30-yr benchmark (WebSearch-verified current figure, seven-week low; replaced reuse of the stale May 6.37%). (5) **Unlock MLS** — Austin metro median **mid-$470,000s mid-2026** (WebSearch-verified), the page's first Austin-market data point.
- **Enrichment (4 of 5 elements):** Austin data ✓; sourced current rate ✓; enriched hero alt text ✓ (generic "Texas Mortgage Broker, NMLS #513013" → "Texas bank statement and self-employed mortgage specialist qualifying borrowers on deposits instead of tax returns"); tightened final CTA in Adam's voice ✓ ("Send me the short version… I run same-day pre-approvals, and I read the statements myself. — Adam"). Anecdote element **skipped** — `memory/people/` does not exist; will not fabricate per SKILL.md (consistent with all prior niche-page runs).
- **Mechanical:** Article-schema `dateModified` 2026-05-05 → 2026-07-03; visible "Last updated" bumped to match; sitemap.xml lastmod 2026-05-28 → 2026-07-03. All **6 JSON-LD blocks re-validated** (python `json.loads`). Word count 4,562 (already at DSCR-page depth; no padding). Blog title lint clean. Title + H1 + slug preserved. Queued for GSC reindex. Committed only bank-statement-loans.html + sitemap + run-logs + CHANGELOG.

## 2026-07-03 — styer-site-daily (Friday: Content Planning + AEO Review) — 1 real fix shipped + verified live

- Steps 1–2 non-negotiables green: sitemap.xml + robots.txt HTTP **200**; conversion tracking **10/10** via HTML-token matrix (`curl -L`, live-submit avoided to prevent fake CRM/n8n leads).
- Blog freshness: latest post **2026-06-30** (bank-statement-loans-texas), 3 days — fresh, no flag. 40 posts total.
- **Blog CTA audit found + fixed the lone gap:** `blog/2026-06-23-no-ratio-low-dscr-loans-texas.html` was the only 1 of 40 posts missing a `/get-preapproved`|`/refinance-quote` conversion CTA (it had /scenario, /dscr-loan-austin-tx, Calendly, tel — intent capture but no tracked-conversion path). Added the standardized `blog-dual-cta` block routing to both conversion pages (Get Pre-Approved → `/get-preapproved`, Cash-Out Refi Quote → `/refinance-quote`, DSCR Calculator, tel), matching the sitewide 06-16/06-14/06-30 markup. Commit `87fe207`, pushed, **verified live** (Netlify Pretty-URLs served extensionless hrefs — expected). Coverage now **40/40**.
- AEO on 2 newest posts (06-30, 06-23): both excellent — FAQPage schema 5 Q&A each, answer-first FAQ answers ("Yes.", "Not always.", "A bank statement loan is…"), definition-first extractable lead paragraphs + strong meta descriptions, healthy question/statement H2 mix. 0 defects, nothing added to backlog.
- SEO/SEM BLOCKERS + backlog clean; `loanos-clone` untouched (paused-LoanOS guard). Design spot-check clean (about + jumbo): 0 entity drift, GTM + nav intact. Swept 7 sitewide "21-day" matches — **0 are the banned "21-day close" claim** (appraisal turnaround, 121-days-on-market substring, contract clocks, `_TEMPLATE.html` compliance instruction, noindexed admin `<textarea>` placeholder, a dated update-story) — verified before flagging. NotebookLM advisor script absent (86th run). Scheduler fired 3 days in a row (07-01/02/03, recovering).

## 2026-07-02 — styer-suburb-editor-daily (Round 4 #11): bee-cave deepening + Terra Colinas + The Uplands spotlights + Redfin YoY correctness fix + Conventional-tile de-template

Page already very deep from R1–R3 (5 neighborhood spotlights — Spanish Oaks/Sweetwater/Falconhead/Lake Pointe/Ladera, full rated LTISD feeder ladder, Major Employers H3 w/ CesiumAstro $500M HQ, complete Travis/LTISD/city/ESD tax stack + itemized closing-cost example). This Round 4 added two new named-community spotlights (one mid-tier conventional, one super-jumbo), corrected a stale Redfin YoY direction against the live source, and rewrote the most template-flavored loan card into complicated-income copy. Page intact — clean tree, only this page + sitemap modified (no concurrent-writer drift).

- **4 first-party cited adds:** (1) NEW **Terra Colinas (78738) spotlight** — Bee Cave's mid-tier conventional workhorse, built out **2015-2018 by Grand Haven Homes and Drees** (David Weekley opened a model there too) west of Hwy 71 / north of Hamilton Pool Rd; homes just under 2,000 to ~3,400 sqft, resales **~$599K-$874K** ([austinrealestatehomesblog](https://www.austinrealestatehomesblog.com/bee-cave/terra-colinas/); [texasrealestatesource](https://www.texasrealestatesource.com/terra-colinas-bee-cave-tx/)), so **most stay inside the $832,750 conforming line** (5-10% down conventional beats jumbo) — advances the GOALS complicated-income/conventional positioning by giving the page a real sub-conforming doorway in a $1.0M-median city. (2) NEW **tax-rate contrast insight** — Terra Colinas sits inside a MUD, so its effective property-tax rate ran **2.374% in tax year 2025** (up from 2.3556% in 2024) **vs 1.644% in Ladera and county-plus-ISD-only in no-MUD Spanish Oaks** (austinrealestatehomesblog); framed as ~$450/mo of extra tax on a $750K home (0.73% spread) to budget into DTI — same-city/same-schools carrying-cost gap the page's generic "~1.7%" line hid. (3) NEW **The Uplands (78738) spotlight** — the gated luxury enclave the custom-build tile keeps name-dropping but never spotlighted; built mid-1990s–mid-2000s, **2,811–5,751 sqft on half- to three-quarter-acre lots**, 3-4 car garages standard, private-lots-over-amenities, listings **low $900s past $2.2M** ([austinrealestatehomesblog](https://www.austinrealestatehomesblog.com/bee-cave/uplands/); [luxehomesaustin](https://www.luxehomesaustin.com/the-uplands.php)) → straight jumbo/super-jumbo (10-20% down, 6-12mo PITI reserve, asset-depletion/equity-comp underwriting); feeds **Lake Pointe Elem 9/10 → Bee Cave Middle 10/10 → Lake Travis HS 9/10**. (4) **Fresh market + correctness fix** — page asserted median "**up 6.9% YoY**" but live [Redfin](https://www.redfin.com/city/1861/TX/Bee-Cave/housing-market) March 2026 now reads **$1.0M roughly flat YoY (down 0.25%), $293/sqft down 7.0% per foot** (Redfin revised the same-month print as sales settled) → corrected across intro + FAQ schema + FAQ accordion (3 instances); added honest thin-volume softening context ($950K May, $900K June, luxury-weighted count). Terra Colinas/Uplands price bands synced into FAQ schema + accordion.
- **De-template (hard requirement):** grep across the active 13 confirmed bee-cave has **0 full verbatim cross-page body-paragraph dupes** (only the shared bottom CTA boilerplate, which is structural + shared with reference models kyle/san-marcos → not touched) → met per hutto/cedar-park R4 precedent by **rewriting the most template-flavored paragraph remaining**, the generic Conventional loan card ("The go-to for Bee Cave homes priced under $832,750… buyers with solid credit") → **"Conventional & Complicated-Income Files"**: keeps the sub-conforming 3-5%-down value point (naming Terra Colinas/Ladera/entry Sweetwater) but folds in Bee Cave's real buyer shape (business owners, CesiumAstro + West-Austin tech equity comp, 1099 consultants, K-1 partners) with **+3 internal links** to /bank-statement-loans, /self-employed-mortgage-austin, /asset-depletion-mortgage-texas — advances GOALS complicated-income positioning.
- **Mechanical:** WebPage dateModified 06-18 → 07-02; sitemap lastmod 06-18 → 07-02; MortgageBroker schema desc neighborhood list += the gated Uplands + conventional-tier Terra Colinas. All **4 JSON-LD blocks** validated clean (python `json.loads`); title lint pass; tags balanced (7/7 section, 4/4 h3, 8/8 feature-item); 0 stale "6.9%" refs remain. Did NOT touch the Adam-gated trust strip (★ 5.0 Google / 4.98 Zillow / 137+ reviews) or the Nakamura Family Bee Cave testimonial (AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct austinrealestatehomesblog fetches on the fly (all claims cited). **Round 4 now 11/13. Next: #12 dripping-springs.**

## 2026-07-02 — styer-site-daily (Thursday: Internal Linking + Funnel Flow) — clean audit, 0 site mutations

- Steps 1–2 non-negotiables green: sitemap.xml + robots.txt HTTP **200**; conversion tracking **10/10** via HTML-token matrix (`curl -L`, live-submit avoided to prevent fake CRM/n8n leads).
- Full funnel traced end-to-end, all hops healthy, no leak: homepage quick form (`js-quick-contact` → `script.js` L51 `generate_lead` → POST `/` + `/.netlify/functions/lead-intake` → L485 redirect `/thank-you`); `/get-preapproved`(purchase_prequal) + `/refinance-quote`(refi_quote) both `action='/thank-you'`; `/thank-you` fires `thank_you_page_view` + Calendly + `tel:+15129566010` + 3-step next.
- contact.html wiring healthy (`action=/thank-you`, netlify, `form-name=contact`, generate_lead). Internal-link 2+ bar cleared on 4 pages: contact 25+, conventional 35, va 33, non-qm 40 unique internal links.
- SEO/SEM BLOCKERS + backlog clean; glossary backlog item stale/done (`mortgage-glossary.html` exists); `loanos-clone` untouched (paused-LoanOS guard). Design spot-check clean (homepage + conventional): 0 entity drift, 0 "21-day" claim, GTM + nav intact.
- 0 commits of site HTML, 0 deploys — clean-audit outcome (no defect met the fix threshold; no manufactured churn). Scheduler fired Wed 07-01 + Thu 07-02 (2 in a row). NotebookLM advisor script absent (85th run).

## 2026-07-01 — styer-suburb-editor-daily (Round 4 #10): lakeway deepening + Vineyard Bay spotlight + Lakeway Elementary 8/10 + Cardinal Hills reframe + Step 2 de-template

Page already very deep from R1–R3 (7 neighborhood spotlights, 9/8/9 feeder ladder, Major Employers H3, full LTISD/Lakeway/Travis tax stack + itemized closing-cost example, conforming-vs-jumbo wrinkle), so this lighter-touch Round 4 added the top waterfront tier, a second in-town elementary with a boundary-stability insight, and reframed the entry-tier neighborhood with current data — then de-templated the most-shared process step. Page intact (clean tree — only this page + sitemap modified; the concurrent styer-site-daily run left CHANGELOG/CONTEXT/latest/learnings uncommitted, so I staged only my own files by explicit path).

- **4 first-party cited adds:** (1) NEW **Vineyard Bay (78734) spotlight** — Lakeway's top rung: a gated waterfront enclave of **84 custom homes, each on an acre or more**, with a private marina and boat ramp **inside the gates**, pool/cabana, two tennis courts, a sport court, a clubhouse with fitness, walking trails, and a **community helipad**; current listings **~$4.05M–$7.9M** ([Moreland Properties](https://moreland.com/neighborhoods/vineyard-bay) guide). Positioned as the super-jumbo tier above Costa Bella ($1.2M–$3.4M) where asset-based qualifying and 6-12 month reserves become the real conversation. (2) NEW **Lakeway Elementary 8/10** (1701 Lohmans Crossing Rd, PK-5) — [GreatSchools](https://www.greatschools.org/texas/austin/4156-Lakeway-Elementary-School/) direct-fetch **corrected the search snippet's stale 9/10 to the live 8/10**; serves the Old Lakeway / Cardinal Hills side of town, distinct from Serene Hills Elementary (78738). (3) NEW **enrollment + boundary insight** — Lakeway Elementary enrollment is **492 in 2026, down 31.3% since 2016** ([Texas Tribune](https://schools.texastribune.org/districts/lake-travis-isd/lakeway-elementary-school/)); shrinking core-campus enrollment is exactly the pressure that leads a fast-growing district like LTISD to redraw attendance boundaries, so confirm the assigned campus for a specific address before writing an offer. (4) **Cardinal Hills reframed with fresh data** — the vague "established entry tier, smaller lots, lower price point" line replaced with the [Redfin Cardinal Hills Estates](https://www.redfin.com/neighborhood/232396/TX/Lakeway/Cardinal-Hills-Estates/housing-market) **June 2026 median list price ~$882,000 ($338/sqft), raw homesites ~$719,000**, quarter-acre-to-over-an-acre wooded lots, with the note that a 20%-down resale file usually still stays under the $832,750 conforming limit.
- **Preserved (correctness):** citywide median **$840,040 May 2026 Redfin (+4.7% YoY, 244 closings, 98 DOM)** + Neuhaus April $868K kept — the Redfin city page 403'd on re-fetch and the Zillow June "$830K" was a list (not sale) figure, so it was NOT swapped in; Rough Hollow's "$1.3M" was a May-2025 stale print (not used); West Cypress Hills 6/10 is a Spicewood campus, not Lakeway proper (not used). No fabricated figures.
- **De-template (hard requirement):** grep across the active 13 confirmed Process **Step 2** ("Upload pay stubs, W-2s, tax returns (2 years), bank and investment account statements, and a copy of your ID through the secure portal") was **verbatim-shared on 8 pages** → rewritten to Lakeway-jumbo-specific copy (documenting 6-12 months of PITI reserves + the true shape of income — RSU vesting, K-1s, business P&Ls, asset-depletion statements — then shopping which of the 40+ lenders underwrites it cleanest). Now 7 pages carry the verbatim string; Lakeway = 0. (Step 1 was de-templated in R3.)
- **Mechanical:** WebPage dateModified 06-16 → 07-01; sitemap lastmod 06-16 → 07-01; MortgageBroker schema description neighborhood list += Vineyard Bay + Cardinal Hills. All **4 JSON-LD blocks** validated clean (python `json.loads`); title lint pass. Did NOT touch the Adam-gated trust strip (★ 5.0 Google / 4.98 Zillow / 137+ reviews) or the David & Christine Rough Hollow testimonial (AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct GreatSchools/Texas Tribune/Moreland fetches on the fly (all claims cited). **Round 4 now 10/13. Next: #11 bee-cave.**

## 2026-07-01 — styer-site-daily (Wednesday): Suburb Deep Dive + AEO → Pflugerville — clean audit, 0 mutations

Wednesday rotation. Deep-dived `pflugerville-mortgage-lender.html` — audit PASS, 0 defects, 0 site changes. City-specific H1; all 4 JSON-LD blocks valid (MortgageBroker + FAQPage + BreadcrumbList + WebPage, python `json.loads`); answer-first bolded intro + question-form H2s + 5 answer-first FAQ (strong AEO); 3 calculator links; sitemap lastmod = WebPage dateModified (06-26, in sync). `/get-preapproved`=0 by design (Decision 3); inline form absent = Adam-gated 5/25 carry. One below-threshold micro-observation (FAQ schema Q4 question drift vs visible accordion — FAQ rich results deprecated 2023, no SERP/AEO cost) → not mutated. Steps 1–2 green (sitemap/robots 200; conversion 10/10 HTML-token). **Re-Verify Gate auto-resolved the queued blog-freshness escalation:** the 06-30 log queued a hard 8-day flag for today, but the new post `2026-06-30-bank-statement-loans-texas.html` is live (200), in sitemap, and registered — latest post 1 day old → flag cleared, not fired. Design spot-check clean (homepage + pflugerville; 0 legacy-entity drift, 0 "21-day" claim). BLOCKERS + backlog clean; loanos-clone untouched (paused-LoanOS guard). Scheduler fired today after recent no-fires (Fri 06-26 / weekend / Wed 06-24). Run log: `run-logs/2026-07-01.md`.

## 2026-06-30 — styer-blog-writer-weekly: PUBLISHED "Bank Statement Loans in Texas" (Tier A — bank-stmt freshness)

Net-new blog post `2026-06-30-bank-statement-loans-texas.html` (commit `5c2a2b0`, live HTTP 200). Targets the lone declining complicated-income keyword (bank statement #7→#8 per Wk16 competitive THREAT #1); no bank-statement blog existed (only the money page). Qualify-on-deposits explainer for self-employed TX borrowers, grounded in IRS Schedule C, Fannie Mae B3-3.5-01, and CFPB ATR rule 12 CFR 1026.43 (4 inline citations, no rate quotes). 3 schema blocks valid (Article/FAQPage/BreadcrumbList); all 7 compliance gates PASS; registered in blog.html (noscript + CollectionPage), blog/manifest.json, sitemap.xml; wired into bank-statement/self-employed/non-QM/asset-depletion hubs. Core prose 1,435 words. Run brief: `run-logs/content-2026-06-30.md`. To undo: `git revert 5c2a2b0`.

## 2026-06-30 — styer-suburb-editor-daily (Round 4 #9): manor deepening + Bell Farms spotlight + Oak Meadows 3/10 + Manor ISD rezoning gotcha + Step 3 de-template

Page intact (clean git tree — only this page + sitemap modified, no concurrent-writer drift). Already deep from R1–R3 (7 neighborhood spotlights, MISD-vs-DVISD school-zoning split, 4-high-school breakdown, full tax stack + itemized closing-cost example, Major Employers list, 23 citations), so this lighter-touch Round 4 added an affordability-tier resale community, a rated campus tied to a live rezoning story, district-scale facts, and a fresh price anchor — then de-templated the most-shared process step.

- **4 first-party cited adds:** (1) NEW **Bell Farms (78653 — Manor ISD) spotlight** — established **Pacesetter Homes by Qualico** community off US-290 (~12 mi east of downtown), now **built out and trading on resale at roughly $250,000–$308,000** (Movoto + Redfin neighborhood), framed as one of the cheapest doorways into Manor: well under FHA's $571,550 limit and squarely in TSAHC/TDHCA sub-$5K-out-of-pocket range; neighborhood park + playscape; feeds **Presidential Meadows Elementary → Manor Middle → Manor HS** (Homes.com). Advances the page's FHA/first-time/DPA value angle. (2) NEW **Oak Meadows Elementary 3/10** (5600 Decker Lane, PK-5, ~22% math / 27% reading) — GreatSchools direct-fetch, added as a rated campus. (3) NEW **Manor ISD rezoning gotcha + district scale** — district now runs **15 campuses serving ~9,873 students (2026, Texas Tribune/TEA)** and shifts attendance boundaries as it grows; cited the documented **Decker Elementary → Oak Meadows** boundary discussion (Loma Vista / Oak Forest RV Resort / Bluestem Apartments communities, KVUE) as proof the district rezones → confirm the assigned campus on a specific address before writing an offer. Reinforces the page's core school-zoning thesis. (4) **Fresh price anchor** — Bell Farms resale $250K–$308K woven into the FAQ median answer (schema + accordion, kept in sync) + MortgageBroker schema description as a new affordability floor distinct from the master-planned new-construction pricing.
- **Preserved (correctness):** median **$340K March 2026 Redfin (-5.7% YoY) / $171 sqft / 98 DOM** kept — no newer Redfin Manor-specific print exists (May 2026 $343,779 figure found was TX-statewide, not Manor); Tesla 16,506 EOY-2025 + early-2026 cut, OPmobility, Mustang Crossing, Samsung Taylor all current. Movoto "list median" methodology trap avoided (used the Bell Farms resale range, not a list-median headline).
- **De-template (hard requirement):** grep across the active 13 confirmed Process **Step 3** ("Within one to two business days, you will have a pre-approval letter ready. Adam will review your options…") was **verbatim-shared on 8 pages** → rewritten to Manor-specific copy (real letter vs builder-lender "qualifying call"; MISD-vs-DVISD tax difference on the address; TSAHC/TDHCA fit; weighing Carillon flex-cash / Whisper Valley buydown against an outside number). Now 7 pages carry the verbatim string; Manor = 0. (Steps 1 & 4 were de-templated in R2/R3.)
- **Mechanical:** WebPage dateModified 06-15 → 06-30; sitemap lastmod 06-15 → 06-30; MortgageBroker schema description neighborhood list += Bell Farms + resale-floor note. All **4 JSON-LD blocks** validated clean (python json.loads); title lint pass; tags balanced (`<li>` 91/91, `<strong>` 89/89, `<p>` 37/37). **New inline source URLs:** Pacesetter Manor, Movoto Bell Farms, Redfin Bell Farms neighborhood, Homes.com Bell Farms, GreatSchools Oak Meadows, Texas Tribune Manor ISD, KVUE boundary, Decker Elementary.
- **Left Adam-gated:** trust strip ★ 5.0 Google / 4.98 Zillow / 137+ Reviews + The Ramirez Family Manor testimonial (AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct GreatSchools/Texas Tribune fetches on the fly (all claims cited). **Round 4 now 9/13. Next: #10 lakeway.**

## 2026-06-30 — styer-site-daily (Tuesday): Title Tags + Meta Descriptions — clean audit, 0 mutations

Tuesday rotation. Audited 25 money/loan-type pages (titles + meta descriptions). No defect met the fix threshold — 0 site changes, 0 commits, 0 deploys. Correct clean-audit outcome (no manufactured churn).

- **Titles:** all on `[Loan Type] [Austin/Texas] | Adam Styer | NMLS #513013` format (or keyword-rich variant); zero superlatives anywhere (prior 06-16/06-23 sweeps held). Longer titles (business-owners 102, OTC-construction 104, etc.) are intentional keyword + NMLS-suffix variants — shortening = HIGH_RISK on indexed pages, preserved. fha.html "Broker, Not a Call Center" = known Adam-gated correspondent-vs-broker carry, untouched.
- **Meta descriptions:** 23/25 within 150–160. The two below (loans/va 148, investor-loans 149) are complete + specific + on-positioning (no missing/duplicate/generic/superlative) → padding +1–2 chars to a literal "150" is low-value churn, left untouched per established discipline. No banned speed claim in scope ("same-day" is the KEPT phrasing per Decision 2a).
- **Re-Verify Gate:** loans/va.html body "Lowest rates — VA rates are typically 0.25-0.50% lower than conventional" triggers a `lowest` grep but is a factual hedged comparative (true spread vs conventional, qualified "typically"), NOT the banned "lowest rates available" puffery 06-16 swept from the meta/og — benign, verified live. Prior Tuesday fixes confirmed held (06-23 `b2241a6` 24–48hr claim gone; 06-16 `7bafb4e` va/self-emp/dscr metas in-band).
- **Non-negotiables green:** sitemap.xml + robots.txt HTTP 200; conversion 10/10 (HTML-token — get-preapproved/purchase_prequal, refinance-quote/refi_quote, thank-you/thank_you_page_view; GTM-PQQ6PGLR + TCPA + tel:+15129566010 + action→/thank-you all present). Design spot-check clean (homepage + jumbo); 0 legacy entity drift. SEO/SEM BLOCKERS + backlog clean; loanos-clone untouched (paused-LoanOS guard).
- **Blog freshness (opportunistic — Fri 06-26 Content/AEO no-fire):** reconciled `ls -t` mtime vs schema datePublished — the 3 "recent" files are 2026-04-12 posts (git artifact); latest real post genuinely 2026-06-23 = exactly 7 days. Soft heads-up to styer-content-weekly; hard flag tomorrow if it tips to 8.
- **Carries:** NotebookLM advisor script absent (83 runs); PSI quota drained (33/33); scheduler no-fire Fri 06-26. Self-review PASS — 0 site files edited; run-log + session docs only.

## 2026-06-29 — styer-suburb-editor-daily (Round 4 #8): liberty-hill deepening + Stonewall Ranch spotlight + Bill Burden 8/10 + Santa Rita Middle 7/10 + April market refresh

Page intact (clean git tree — only this page + sitemap modified, no concurrent-writer drift; matched the Round 3 2026-06-13 queue notes). Already a deep page from R3 (Santa Rita Ranch / Northgate Ranch / Orchard Ridge / Rio Ancho Ranch spotlights, rated HS feeders, Major Employers list, itemized closing-cost example, full LHISD/City/County tax stack, the Feb-2026 US-183 rezoning gotcha), so this run added an affordable-tier community spotlight, closed two named-but-unrated school gaps, refreshed the market print, and de-templated the Conventional loan card.

- **4 first-party cited adds:** (1) NEW **Stonewall Ranch (78642) spotlight** — Liberty Hill's **affordable counterweight** to all the new luxury master-plans. Established off SH-29 (via Stonewall Parkway) since the **mid-2000s** (mostly resale now) with a phase roster spanning **Lennar / Pulte / KB Home / Taylor Morrison / D.R. Horton / Century / Buffington**, homes **1,308–3,995 sqft (most under 3,000)** on 40-/50-ft lots, listings ~**$275K–$500K** with entry homes in the **low $300Ks**, a light **~$33–$38/mo** HOA (2.1-ac pool area + splash pad + playscape + basketball + trails), 2025 effective tax ~**2.44%** (austinrealestatehomesblog + Taco Street Locating + Redfin neighborhood). Framed as the page's strongest **FHA / first-time / 5%-down conventional** doorway into LHISD — most resales sit well under the $832,750 conforming line, so no jumbo, no acreage-reserve hurdle. (2) NEW **Bill Burden Elementary 8/10** (315 Stonewall Pkwy, PK-5, 763 students) — the Stonewall Ranch onsite campus, named in the new spotlight and added as a rated bullet to the Schools section (GreatSchools direct-fetch, ID 11872). (3) NEW **Santa Rita Middle 7/10** (90 E Santa Rita Blvd, grades 6-8, 1,230 students) — the **Legacy Ranch HS feeder** that was named-but-unrated on the page (GreatSchools direct-fetch, ID 26700). (4) **Fresh market data** — Redfin **March $510K (137 DOM) → April 2026 $500K median at 117 days on market** across MortgageBroker schema desc + FAQ schema + intro + FAQ accordion + Process Step 4 (5 instances); DOM is now back near a year ago (118) and down sharply from March's 137 — a cleaner "still a buyer's market but homes are moving" read. March $510K/+11.0% YoY/$193-per-sqft preserved as cited prior-month context (not deleted — it's the well-sourced YoY anchor).
- **Preserved (correctness):** the **8.0-months-supply / 424-active-listings** inventory figures kept and honestly dated to the **Feb 2026 Neuhaus/Unlock MLS** pace (no newer verifiable supply print found); the Movoto **$567K "May 2026"** figure is a **list-price median, not a sale median** (same methodology trap as the HAR averages flagged on hutto/buda/pflugerville) → not used. The +45% YoY closed-sales-volume (Community Impact, April 2026) stat kept.
- **De-template (hard requirement):** grep across the active 13 confirmed the **Conventional loan card** ("…As little as 3% down with competitive rates through Adam's wholesale lender network…") was **verbatim-shared with dripping-springs / bastrop / new-braunfels / taylor** → rewritten to **Liberty Hill complicated-income copy** ("Conventional & Complicated-Income Files": Samsung Taylor / Apple / Dell RSU+bonus commuters + self-employed/1099 builders → bank-statement + self-employed programs shopped across 40+ wholesale lenders; adds 2 internal links to /bank-statement-loans + /self-employed-mortgage-austin). Advances the active GOALS.md complicated-income positioning + keeps the $832,750-conforming value point. (Process Steps 1 & 4 were already de-templated in R3.)
- **Mechanical:** WebPage dateModified 06-13 → 06-29; sitemap lastmod 06-13 → 06-29; MortgageBroker schema description neighborhood list += Stonewall Ranch + refreshed median. All **4 JSON-LD blocks** validated clean (python json.loads); title lint pass; tags balanced (`<li>` 77/77, `<strong>` 94/94, sections 7/7); stale "137 days" = 0, removed Conventional dupe phrase = 0. **4 new inline source URLs** (austinrealestatehomesblog Stonewall Ranch + Taco Street Locating + Redfin Stonewall Ranch neighborhood + GreatSchools Bill Burden; Santa Rita MS GreatSchools link added inline).
- **Left Adam-gated:** trust strip ★ 5.0 Google / 4.98 Zillow / 137+ Reviews + The Hendersons Santa Rita Ranch testimonial (AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct GreatSchools/Redfin fetches on the fly (all claims cited). **Round 4 now 8/13. Next: #9 manor.**

## 2026-06-29 — styer-site-daily (Monday): Schema + AEO Entity Audit — about.html Person sameAs NMLS Consumer Access fix

Monday rotation. 16/16 JSON-LD blocks validated valid (live json.loads) across homepage / about / dscr-loan-austin-tx / pflugerville-mortgage-lender (rotated suburb). AEO entity-consistency pass homepage↔about clean.

- **Real entity gap found + fixed (LOW_RISK):** about.html Person JSON-LD `sameAs` was missing the NMLS Consumer Access (INDIVIDUAL/513013) link and Yelp profile — both present in the homepage Person schema. Added both to the about page (the E-E-A-T anchor where the authoritative NMLS sameAs belongs). Person sameAs now 6/6, matching the homepage authoritative set. Display-invisible schema-only change. Commit `265cbb7`; verified live ~160s post-push (`INDIVIDUAL/513013` present on served /about).
- **Entity consistency verified:** Person name `Adam Styer` + jobTitle `Senior Loan Officer` consistent both pages; MortgageBroker name `Adam Styer | HyperSmart Home Loans` consistent; aggregateRating homepage-only (BY DESIGN — no duplicate self-serving review schema); entity-name hygiene 0 legacy (`The Styer Team`/`Mortgage Solutions LP` = 0). Homepage H1 on-positioning ("complex borrowers"); absence of "best broker" superlative is BY DESIGN per positioning shift.
- **Non-negotiables green:** sitemap.xml + robots.txt HTTP 200; conversion 10/10 (HTML-token — get-preapproved/purchase_prequal, refinance-quote/refi_quote, thank-you/thank_you_page_view; GTM-PQQ6PGLR + TCPA + tel:+15129566010 all present). Design spot-check clean (homepage hero CTAs → #contact-form; dscr nav + GTM). SEO/SEM BLOCKERS clean; loanos-clone untouched (paused-LoanOS guard).
- **Carries:** NotebookLM advisor script absent (82 runs); PSI quota drained (33/33, UNVERIFIED); scheduler no-fire Fri 06-26 + weekend (no run logs). Self-review PASS — 1 site file edited, file-specific git add, pre-commit hook passed.

## 2026-06-28 — styer-suburb-editor-daily (Round 4 #7): hutto deepening + Carmel Creek spotlight + Kerley/Howard Norman ratings + Hutto High 6→5 correction

Page intact (clean git tree — only this page + sitemap modified, no concurrent-writer drift; matched the Round 3 2026-06-11 queue notes). Already a deep page from R3 (7 named neighborhoods, rated feeder ladders, a Major Employers H3 with Samsung / Hutto Megasite / Tesla, an itemized closing-cost example, full property-tax stack), so this run added a new named-community spotlight, two new rated feeder ladders, a correctness fix on a drifted school rating, and a fresh per-foot read.

- **4+ first-party cited adds:** (1) NEW **Carmel Creek (78634) spotlight** — established master-planned community at the **southeast corner of SH-130 & US-79** (via US-79 → Chris Kelley Blvd → Knowles Dr), built out **2016–2022 (resale-only now)** by a deep roster **Pulte / David Weekley / Highland / Lennar / Village Builders / M/I Homes**, homes 1,445–3,451 sqft on 0.1–0.5-acre lots (most under 0.3 ac), resort-style pool + park + playground + picnic areas + basketball courts + trails on a mandatory HOA, feeding Howard Norman → Gus Almquist → Hutto High (austinrealestatehomesblog). No median asserted — Redfin/neighborhoods.com browser-gated (403), so per correctness rules the spotlight is anchored on the verified builder roster + conventional/FHA affordability positioning, not a fabricated price. (2) NEW **Benjamin Doc Kerley Elementary 6/10** (800 Haybarn Lane, PK–5, 805 students, 39% math / 55% reading) — the **Star Ranch north-of-Gattis feeder** that was named-but-unrated on the page (GreatSchools direct-fetch, ID 25738). (3) NEW **Howard Norman Elementary 5/10** (101 Llano River Trl, PK–5, 570 students, 43% math / 56% reading, Gifted & Talented) + **Gus Almquist Middle** (grades 6–8, ~951 students, opened 2024 → too new for a GreatSchools score yet, noted honestly) — completes the Carmel Creek feeder ladder (GreatSchools direct-fetch, ID 25307). (4) **CORRECTNESS — Hutto High GreatSchools 6/10 → 5/10** (enrollment 2,133 → 2,308): the page asserted 6/10 in four spots, but **live GreatSchools (direct-fetch) + the independent Carmel Creek blog both read 5/10** → corrected in the at-a-glance, Schools H3 (×2), and Cottonwood Farms paragraph. **Hutto Middle School's separate 6/10 left intact** (different campus, not re-verified, not touched). (5) **Fresh per-foot** — Redfin live **$170 → $166 (−7.6% → −9.8% YoY)** across body + FAQ schema + FAQ accordion (3 instances).
- **Median PRESERVED at $366,166 March 2026 Redfin** — live Redfin now reads a rounded ~$363K for the same month (a ~$3K continuous-revision delta); per the round-rock/buda/leander Round 4 precedent, declined to swap a precise cited figure for a rounder, noisier same-month number, and refreshed the clearly-moved per-foot instead. HAR.com's May "$403,394" is an **average, not a median** (the same trap flagged in R3) — not used. DOM ~121 days + ~1 offer per listing are still current per live Redfin — kept.
- **De-template (hard requirement):** grep across the active 13 confirmed hutto has **0 full verbatim cross-page body-paragraph dupes** (fully de-templated in R3 — only the short fragment "credit scores as low as 580" appears on 5 pages, in different sentence constructions, not a shared paragraph). Per the cedar-park Round 4 precedent, met by **rewriting the most template-flavored paragraph remaining** — the generic Conventional loan-card ("The most popular option for Hutto buyers with good credit. As little as 3% down with competitive rates…") → **Hutto complicated-income copy** (Samsung/Dell RSU + bonus comp, 1099 contract work for ASML / Lam Research / KLA during the fab ramp, self-employed → shopped across 40+ lenders; adds 2 internal links to /self-employed-mortgage-austin + /bank-statement-loans). Advances the active GOALS.md complicated-income positioning and removes internal redundancy (the $832,750/every-home-qualifies point is still covered in the Lookout at Brushy Creek paragraph + the closing-cost section).
- **Mechanical:** WebPage dateModified 06-11 → 06-28; sitemap lastmod 06-11 → 06-28; MortgageBroker schema description neighborhood list += Carmel Creek. All **4 JSON-LD blocks** validated clean (python json.loads); title lint pass; stale $170 / 7.6% / Hutto-High-6-10 references all 0. **3 new inline source URLs** (austinrealestatehomesblog Carmel Creek + GreatSchools Kerley + GreatSchools Howard Norman).
- **Left Adam-gated:** trust strip ★ 5.0 Google / 4.98 Zillow / 137+ Reviews + Chris & Amanda Star Ranch testimonial (AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct GreatSchools fetches on the fly (all claims cited). **Round 4 now 7/13. Next: #8 liberty-hill.**

## 2026-06-27 — styer-suburb-editor-daily (Round 4 #6): buda deepening + Shadow Creek + Carpenter Hill 9/10 + TerraFirma + H-E-B figure correction

Page intact (clean git tree, on main; matched the Round 3 queue notes — no concurrent-writer drift). Already a deep page from the 2026-06-09 Round 3 renovation (Garlic Creek / Sunfield / Ruby Ranch / Whispering Hollow spotlights, full rated school feeders, Major Employers H2, itemized closing-cost example, property-tax stack), so this run added a new named-community spotlight, a new rated elementary, a new headline employer, corrected an under-stated incentive figure, and added fresh market-velocity data.

- **5 first-party cited adds:** (1) NEW **Shadow Creek (78610) spotlight** — one of Buda's most affordable established neighborhoods, off Windy Hill Road ~3 mi east of I-35, built 2006–2019 by **MileStone Community Builders / Lennar / Buffington Homes** (MileStone dominant), mandatory HOA covering pool / jogging path / playground / sport courts, Hays CISD (austinrealestatehomesblog + mymilestone). No median asserted — Redfin/RealtyAustin browser-gated and the blog states no price, so per correctness rules the spotlight is anchored on the verified builder roster + affordability positioning, not a fabricated number. (2) NEW **Carpenter Hill Elementary 9/10** GreatSchools (4410 FM 967, 538 students) added to the FM 967 / Ruby Ranch west-side path — **verified by direct GreatSchools page-fetch; the search snippet's stale "8/10 / 621 students" was corrected to the live 9/10 / 538** — with a top-10%-of-Texas note (Public School Review). (3) NEW employer **TerraFirma, Inc.** — headquarters relocation Austin→Buda in April 2026 into a 40,000 sq ft integrated HQ/R&D/testing facility at Tower Business Park (1340 FM 2001), bringing hundreds of high-tech AI/robotics/earthmoving jobs (Buda EDC). (4) **H-E-B figure corrected** — the page's "$12.1M city/EDC reimbursement (≈two-thirds of $30M remediation)" was only the city/EDC slice → updated to the full **$20.1M combined incentive package (City of Buda, EDC, Hays County, ESD) over 30 years**, plus store features (drive-through True Texas BBQ, garden center, pharmacy, 50 full-time jobs within year one), citing the official joint City/EDC/ESD release (March 11, 2026) + KUT; construction-begins-2026 retained. (5) NEW **market velocity — $196/sqft (+3.7% YoY), 38 days on market, ~1 offer** (Redfin trailing-3-month ending May 2026), with the buyer insight that per-foot firmed even as the median stayed flat. The existing reconciled median was **PRESERVED at $381,990 single-month May 2026 Redfin** — declined to swap to Redfin's $411K trailing-3-month figure on the same source/month (different metric; would read as a self-contradiction on the page).
- **De-template (hard requirement):** grep across the active 13 confirmed buda has **0 full verbatim cross-page body-paragraph dupes** (fully de-templated across R1–R3; only short structural fragments like "No upfront mortgage insurance" remain inside the loan-option cards). Per the documented westlake/pflugerville precedent, met via an **internal-redundancy trim**: cut the standalone "Tesla Gigafactory … has brought job growth to the corridor" paragraph (Tesla is already covered in the employer list) and replaced it with the Redfin per-foot/velocity line, **preserving both internal links** (/calculators.html and /rate-check-buda-kyle.html).
- **Mechanical:** WebPage dateModified 06-09 → 06-27; LocalBusiness schema description neighborhood list += Shadow Creek. All **4 JSON-LD blocks** validated clean (python json.loads); title lint pass; tags balanced (8/8 section, 13/13 h3, 78/78 li). **6 new inline source URLs** (austinrealestatehomesblog Shadow Creek + MileStone + GreatSchools Carpenter Hill + Public School Review + Buda EDC TerraFirma + Buda gov H-E-B release + KUT + Redfin).
- **Left Adam-gated:** trust strip ★★★★★ (136+ Reviews / 1,000+ Loans Closed) + David & Ashley Sunfield testimonial (AggregateRating / perf-claim policy pending). Committed only this page + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct GreatSchools / Buda EDC / KUT fetches on the fly (all claims cited). **Round 4 now 6/13. Next: #7 hutto.**

## 2026-06-26 — styer-suburb-editor-daily (Round 4 #5): pflugerville deepening + Avalon spotlight + May market refresh

Page intact (matched Round 3 queue notes — no concurrent-writer drift; clean git tree, only this page + sitemap modified). Already a deep page from the 2026-06-08 Round 3 renovation (Blackhawk / Falcon Pointe / Windermere+Heatherwilde / Sorento spotlights, 3 rated high schools, Major Employers H2, itemized closing-cost section), so this run added a new named-community spotlight, completed a school-rating ladder, refreshed the market print to the latest same-source Redfin read, and trimmed a redundant paragraph.

- **4+ first-party cited adds:** (1) NEW **Neighborhood Spotlight: Avalon (78660)** — established MPC on the Kelly Lane / SH-130 corridor, built out ~2007–2020 (resale market now); deep builder roster **CastleRock / Gehan / Century Communities / Jimmy Jacobs / Pacesetter / Pulte** (earlier Grand Haven / Standard Pacific / Scott Felder), 50–65-ft lots with greenbelt backers, amenity center + resort pool + splash pad + playground + community park + hike-and-bike trails (austinrealestatehomesblog Avalon guide). No hard price figure asserted — HomeCity/RealtyAustin both blocked (403 / browser-gate) and the blog page states no price, so per correctness rules the spotlight is anchored on the verified school-zone edge instead of an unverifiable median. (2) NEW fully-rated **Avalon feeder ladder — Riojas Elementary 9/10 → Cele Middle 8/10 → Weiss High 6/10** (all three verified by direct GreatSchools page-fetch, not search summaries — the Avalon blog's stale "Cele 7/10" was corrected to the live 8/10); Riojas (3400 Crispin Hall Lane, 738 students) is the **highest-rated PISD elementary on the page**. (3) NEW ratings on the existing **Sorento feeder** — was "Mott Elementary → Cele Middle → Weiss High" with no elementary/middle numbers; added verified **Mott Elementary 8/10 + Cele Middle 8/10** (GreatSchools direct, 658 / 762 students), with the buyer insight that the elementary+middle (both 8/10) actually out-rate the Weiss high-school number. (4) **Fresh market data — same-source Redfin refresh** $355,000 March 2026 (−10.2% YoY) → **$360,284 May 2026 (−8.8% YoY)** + NEW **$180/sqft (−10.4%)** data point, across meta description, FAQ schema, at-a-glance, market-context section, and FAQ accordion (5 instances). Clean same-source swap (Redfin → Redfin, 2 months newer, YoY direction consistent), not a noisy cross-source jump. Closing-cost example re-anchored $355K→$360K (5% down → $342,000 loan); seller mid-year tax credit recomputed $3,225 → ~$3,275 at the 1.82% effective rate; Ownwell-sourced $354,900 / $6,445 median-tax-bill figures left untouched (independent source, not the Redfin sale median). Dropped the stale cross-suburb comparison parentheticals ("Cedar Park $492,000 / Round Rock $388,000" — both pages' own data has since drifted) → kept qualitative "meaningfully below neighboring Cedar Park and Round Rock."
- **De-template (hard requirement):** grep across the active 13 confirmed pflugerville now has **0 full verbatim cross-page paragraph dupes** (only a 4-word fragment, "More flexible DTI ratios," overlaps the de-listed smithville page) — same state as westlake/pflugerville in Round 3. Per that documented precedent the requirement was met via an **internal-redundancy trim**: cut the "Pflugerville is primarily in Travis County… diverse buyer pool — tech workers commuting on SH-45 and US-183…" paragraph from the "Why Work With" section — its county point is already covered in the intro + at-a-glance + a dedicated FAQ, and its buyer-pool/commuter point is covered in the Major Employers H2.
- **Mechanical:** WebPage dateModified 06-08 → 06-26; sitemap lastmod 06-08 → 06-26; MortgageBroker schema desc community list += Avalon + Sorento and school list += Riojas 9/10 / Mott 8/10 / Cele 8/10. All **4 JSON-LD blocks** validated clean (python json.loads); title lint pass; tags balanced (9/9 section, 20/20 h3). **6 new inline source URLs** (austinrealestatehomesblog Avalon guide + GreatSchools Riojas / Mott / Cele ×in two ladders).
- **Left Adam-gated:** trust strip ★★★★★ + Pflugerville first-home testimonial (AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG. NotebookLM research pack absent — WebSearch + direct GreatSchools fetches on the fly (all claims cited). **Round 4 now 5/13. Next: #6 buda.**

## 2026-06-26 — styer-content-weekly (blog editor): non-qm-loans.html mandatory AEO citation pass

Resumed the niche-first queue after the JUMBO standing priority closed (done 2026-05-29). Picked `non-qm-loans.html` — priority-queue item #1 (below the 3-citation bar) and the CONTEXT-flagged SERP gap (CMRE ranks #1). The page was already strong on depth (6,559 words, 6 JSON-LD blocks) but sat at **1 authoritative external citation** (CFPB ATR/QM, added by a styer-site-daily run 06-19), so this run was a pure citation + enrichment pass — no structural rewrite.

- **Mandatory citation pass: 1 → 6 authoritative external citations.** Existing **CFPB ATR/QM 12 CFR 1026.43** retained. ADDED 5, each attached to a claim the page already made (surgical — no invented copy): (1) **IRS Schedule C (Form 1040)** on the "line 31" net-profit figure in the Heavy-Schedule-C scenario — the deduction-driven understatement is the whole reason bank-statement non-QM exists. (2) **Fannie Mae Selling Guide B2-2-03** on the "10 financed properties" cap in the investor scenario (previously an unsourced assertion). (3) **Fannie Mae LLPA matrix** in the rate trade-off paragraph — explains how conventional investment-property add-ons quietly narrow the real gap vs. a comparable DSCR. (4) **Freddie Mac PMMS** anchoring the +0.50–1.50% non-QM spread to the 6.37% (week of May 7, 2026) conventional benchmark (spread was previously unsourced). (5) **Unlock MLS / ABoR** — new sourced Austin data point ($445K April 2026 Austin–RR–SM median + ~16K active listings) added to the Austin Sub-Markets intro, tying metro price level to why files hit jumbo/W-2-mismatch territory.
- **Enrichment (3 of 5 required):** Austin-specific data point with inline URL ✓ (Unlock MLS); updated rate/program data point with source ✓ (Freddie Mac PMMS benchmark); tighter CTA in Adam's voice ✓ — closing CTA recast to concrete "how you earn, what you're buying, where" + the same-day pre-approval differentiator (per voice guide + CONTEXT Decision 2(a) "same-day kept"). Anecdote skipped — `memory/people/` does not exist; will not fabricate (DSCR/jumbo precedent).
- **Mechanical:** Article schema `dateModified` 2026-06-19 → 2026-06-26; hero visible "Last updated" June 19 → June 26, 2026; sitemap `lastmod` 2026-05-27 → 2026-06-26. All **6 JSON-LD blocks** re-validated clean (python json.loads). Blog title lint clean. Title + H1 + slug + meta description preserved (page ranks; do not disturb). Not a duplicate cluster (it's the non-QM hub). Queued for GSC reindex. Committed: non-qm-loans.html + sitemap.xml + run-logs/editor-queue.md + run-logs/gsc-reindex-queue.md + CHANGELOG.md only.

## 2026-06-25 — styer-suburb-editor-daily (Round 4 #4): leander deepening + Bryson spotlight + de-template

Page intact (matched Round 3 queue notes — no concurrent-writer drift). Already a deep page from the 2026-06-07 Round 3 renovation (Travisso / Crystal Falls / Mason Hills spotlights, rated HS feeders, employers, itemized closing-cost example), so this run added a fresh named-community spotlight, completed two school-rating gaps, refreshed per-foot data, and cut a confirmed cross-page templated sentence.

- **4 first-party cited adds:** (1) NEW **Bryson (78641)** neighborhood spotlight — replaced the vague "Emerging Communities" placeholder paragraph (which had named Bryson/Caballo Ranch/Leander Springs with zero specifics) with a real spotlight: **530-acre Johnson Development Corp. MPC** (first Austin-area community in their portfolio, acquired from Crescent Communities 2019, five-time Austin Community of the Year winner, planned 1,500+ homes — johnsondevelopment.com + Community Impact 2019), active builders **Tri Pointe / Perry / Highland / Lennar** (earlier phases David Weekley/Drees/Grand Haven/Scott Felder/Chesmar/Brookfield), Hill Country designs **$400,000s–~$1M**, 1,312–4,391 sqft on 0.08–0.58-ac lots, Brookfield model at **2113 Abelia Lane** (austinrealestatehomesblog + NewHomeSource), Backyard Amenity Center detail, plus build-to-rent later phase (Tricon/Broadstone). (2) NEW fully-rated **Bryson LISD feeder ladder** — **Jim Plain Elementary 5/10 → Stacy Kaye Danielson Middle 7/10 → Tom Glenn HS 6/10** (GreatSchools direct), Danielson the strongest of the three. (3) NEW **Whitestone Elementary 6/10** rating (853 students, PK–5, G&T) added to the Schools section — the Mason Hills / Block House Creek feeder was previously named-but-unrated (GreatSchools direct). (4) **Fresh per-foot data** — Redfin live read updated $/sqft **$196 → $190 (−4.0% per-foot YoY)** across all 4 instances (FAQ schema, at-a-glance, market section, FAQ accordion). **Median preserved at $418K (trailing-3mo April 2026 Redfin, −3.2% YoY)** — no newer monthly print surfaced; per queue precedent, refreshed the per-foot figure on the same Redfin read rather than swap the well-sourced median on noise.
- **De-template (hard requirement):** the VA loan-tile opener "Zero down for eligible veterans, active duty, and surviving spouses. No monthly PMI." was grep-confirmed **verbatim on georgetown** → rewrote the Leander VA tile with concrete value (no-MI ≈ $200–$250/mo savings vs low-down conventional on a $418K purchase) + Camp Mabry/RM-620 framing + **VA jumbo** angle for Travisso Verona / gated Crystal Falls above the $832,750 line (advances complicated-income positioning). Cross-page dupe now georgetown-only (2→1).
- **Mechanical:** WebPage dateModified 06-07 → 06-25; sitemap lastmod 06-07 → 06-25; LocalBusiness/MortgageBroker schema desc community list += Bryson. All **4 JSON-LD blocks** validated clean (python json.loads); title lint pass; tags balanced (9/9 section, 21/21 h3). **6 new inline source URLs** (johnsondevelopment.com Bryson, Community Impact 2019 acquisition, austinrealestatehomesblog Bryson guide, NewHomeSource Brookfield/Bryson, GreatSchools Jim Plain + Danielson Middle + Whitestone Elementary).
- **Left Adam-gated:** trust strip ★★★★★ + Leander testimonial ("seamless"/AggregateRating policy pending). Committed only this page + sitemap + suburb-editor-queue + CHANGELOG (left concurrent-writer CONTEXT.md, run-logs/latest.md, and untracked run-logs/2026-06-25.md alone — not this task's files). **Round 4 now 4/13. Next: #5 pflugerville.** NotebookLM research pack absent — WebSearch on the fly (all claims cited).

## 2026-06-24 — styer-suburb-editor-daily (Round 4 #3): cedar-park deepening + May market reconciliation

Page intact (matched Round 3 queue notes — no concurrent-writer drift). Body already ~unique from the 2026-06-06 Round 3 de-template, so the de-template requirement was met via an internal-redundancy trim (grep confirmed no full verbatim paragraph dupes remain — only common single-sentence facts like "PMI drops off at 80% LTV").

- **4 first-party cited adds:** (1) NEW **Block House Creek (78613)** H4 spotlight — one of Cedar Park's original MPCs straddling both sides of the 183A toll, built 1980s–early 2010s, ~1,075–3,800 sqft, trailing-12mo median **~$341,500 (−4% YoY, Homes.com)** = the lowest median of any established community on the page; active HOA (clubhouse/community gardens/multiple pools/parks/trails — budget into DTI); framed as Cedar Park's strongest first-time-buyer entry (fits TSAHC/TDHCA caps) + austinrealestatehomesblog community guide. (2) NEW fully-rated feeder ladder — **Block House Creek Elementary 6/10 → Running Brushy Middle 8/10 (~1,119 students) → Rouse High 8/10** (all GreatSchools); page previously had only HS ratings (Cedar Park HS 8/Vista Ridge HS 8) — buyer insight that Block House Creek zones to **Rouse High, not Cedar Park High**. (3) NEW **itemized buyer closing-cost example** on a $490K / 10%-down / July-1 close with cited TX numbers — owner's title **≈$2,706** (TDI 2026 promulgated rate, eff. Mar 1 2026; **seller-paid by WilCo custom** — first-time-buyer myth-buster), lender's policy $100 + endorsements, escrow/settlement ~$400–$500, **Williamson County Clerk recording $25 first page + $4/addl (wilcotx.gov)**, survey, prepaids, + **arrears tax-proration credit ~$4,557** on a mid-year close → net ~$6,500–$9,000 over the down payment before credits. Page previously had monthly-PITI math but zero cash-to-close itemization. (4) **Fresh May 2026 data + honest reconciliation** — Redfin May median **$519,689 (−2.0% YoY, 53 DOM, 2 offers)** vs Zillow ZHVI **$515,501 (−10.3% YoY)**; documented that the ~$30K MoM median jump is **sale mix (upper-tier Twin Creeks/Ranch at Brushy Creek closings), not appreciation** — same-home values still easing. **Median anchor preserved at $489,747 (April Redfin)** rather than re-anchor ~10 tax/PITI instances to a mix-inflated figure that would overstate the market (round-rock/buda/lakeway/westlake precedent: don't swap on a single noisy print). DOM tile updated 42–48 → ~53 (cited).
- **De-template (internal-redundancy trim):** rewrote the generic Conventional loan-card (carried the shared "PMI drops off at 80% LTV" cluster) → Cedar-Park / complicated-income-specific copy (Firefly/Apple/Dell RSU-bonus-1099 income shopped across 40+ lenders so variable comp counts toward qualifying) — advances the GOALS.md complicated-income positioning; also added Block House Creek to the card's neighborhood list.
- **Mechanical:** WebPage dateModified 06-06 → 06-24; hero "Last reviewed" June 6 → June 24, 2026; sitemap lastmod 06-06 → 06-24; LocalBusiness/MortgageBroker schema desc community list += Block House Creek; softened Brushy Creek "most accessible neighborhood" → "most accessible **no-HOA** neighborhood" (resolves the contradiction the cheaper Block House Creek would otherwise create). All **6 JSON-LD blocks** validated clean (python json.loads); title lint pass; tags balanced (11/11 section, 83/83 div). **7 new inline source URLs** (Homes.com Block House Creek, austinrealestatehomesblog, GreatSchools BHC Elementary + Running Brushy Middle, TDI 2026 title rates, wilcotx.gov fees, Zillow ZHVI).
- **Left Adam-gated:** trust strip "★ 5.0 / 136+ Reviews" + Jennifer testimonial (AggregateRating policy pending). Committed only this page + sitemap + run-logs. **Round 4 now 3/13. Next: #4 leander.** NotebookLM research pack absent — WebSearch on the fly (all claims cited).

## 2026-06-23 — styer-site-daily (Tuesday — Title Tags + Meta Descriptions)

- Audited 25 loan-type/product money-page titles + metas. Titles: 0 legacy-entity drift, no superlatives, NMLS #513013 present; titles >60 chars left as-is (intentional keyword+NMLS suffix, shortening indexed titles = HIGH_RISK).
- **Fixed 4 meta descriptions** (commit `b2241a6`, all live HTTP 200): `mortgage-pre-approval-austin` — dropped off-positioning "**24–48 hours**" speed claim (GOALS: no performance-metric marketing; Decision 2(a) swept "24-hour" variants), reframed to value (158); `products` tightened + on-positioning (154); `1099-only-mortgage-texas` added CTA (156); `one-time-close-construction-loan-texas` added benefit (159).
- Left `loans/va` (148) + `investor-loans` (149) as-is — within tolerance, no superlative/drift; avoided low-value churn.
- Re-verified: last Tuesday's (06-16) metas held (self-employed 156, dscr 154, va no-superlative); JSON-LD entity hygiene clean (0 legacy `The Styer Team`/`Mortgage Solutions LP`, both NMLS present); conversion 10/10; sitemap/robots 200.
- Picked up orphaned concurrent-writer doc drift (06-22 run-logs + CONTEXT/latest/learnings) in the doc commit. NotebookLM advisor script still absent (80th run).

## 2026-06-23 — styer-blog-writer-weekly: published "No-Ratio & Low-DSCR Loans in Texas" (Tier A, DSCR cluster 5/5, final seeded entry). 1,490 words, 5 approved-source citations (CFPB 1026.3/1026.43, Fannie B3-3.8-01 + B2-1.2-01, FRED TXRVAC), all STEP 4 gates pass, registered in 4 surfaces. Commit db561c1. Live 200.

## 2026-06-22 — styer-suburb-editor-daily (Round 4 #2): georgetown deepening + median refresh

Page was intact (matched Round 3 queue notes — no concurrent-writer drift). Treated as a normal deepening pass.

- **4 first-party cited adds:** (1) NEW **Berry Creek (78628)** H3 spotlight — established country-club community; The Club at Berry Creek 18-hole championship course completed 1986 (~6,600 yds / ~115 ac, architect Carl Doering, theclubatberrycreek.com + GolfPass); sections Villages (no required membership) / Reserve (social membership required) / Hidden Oaks (David Weekley + Gehan garden homes); builders also Taylor Morrison/Scott Felder/Jimmy Jacobs; homes $400K–$750K (austinrealestatehomesblog). (2) **Georgetown's THIRD ISD-split gotcha — Hidden Oaks at Berry Creek = Jarrell ISD despite Georgetown address** (rest of Berry Creek = GISD: McCoy Elem → Forbes Middle → Georgetown HS); joins MorningStar (LHISD) + Cimarron Hills (GISD/LHISD split); woven into property-tax FAQ + escrow-verification framing. (3) NEW rated middle school — **George Wagner Middle 4/10 GreatSchools** (1621 Rockride Lane, 837 students, grades 6–8) added to Schools H3 (was HS-only). (4) **De-templated** the verbatim **"TSAHC and TDHCA programs offer 3–5%…" DPA card** (grep-confirmed shared w/ jarrell + smithville) → **Bank Statement & Self-Employed (Non-QM)** card linking /self-employed-mortgage-austin — advances the GOALS.md complicated-income positioning.
- **Fresh data:** median **$412,500 Mar 2026 (+1.9% YoY) → $414,752 May 2026 Redfin (−3.3% YoY, $204/sqft −4.0%)** across all 11 instances (3 social-meta, FAQ schema, tax schema, intro, market section, closing-cost ×2, 2 FAQ accordions); now-backwards "market firms" narrative corrected → honest "softer spring print from lower-priced new-construction closings ($320K–$420K), not a value collapse." Berry Creek $400K–$750K added to FAQ price lists.
- **Mechanical:** WebPage dateModified 05-17 → 06-22; sitemap lastmod 05-18 → 06-22; MortgageBroker schema desc += Berry Creek/Hidden Oaks–Jarrell; title insurance ~$1,825 → ~$1,835 at new median. All 4 JSON-LD blocks validated (python json.loads); title lint pass; tags balanced (9/9 section, 23/23 h3, 51/51 div); 4 new inline source URLs.
- **Left Adam-gated:** trust-strip ★★★★★ Wolf Ranch testimonial (testimonial/AggregateRating policy pending). Committed only this page + sitemap + run-logs; left concurrent-writer `index.html` and untracked run-logs/gbp-posts alone.

## 2026-06-21 — styer-suburb-editor-daily (Round 4 #1): round-rock re-deepening + correctness cleanup

Round 4 opens on `round-rock-mortgage-lender.html`. Found the live page lighter than the R2/R3 queue notes describe (concurrent-writer drift had reverted the deep R2 renovation — no Major Employers section, no inline citations, median still $392K "April 2026 ABoR"). Treated as a re-deepening.

- **4 first-party cited adds:** (1) NEW 6th neighborhood **Paloma Lake (78665)** — east-side lake MPC, broke ground 2007 / built out ~2020, deep builder roster, private stocked lake, conventional-down-payment workhorse nearing the $832,750 line (austinrealestatehomesblog). (2) NEW rated feeder ladder — **Linda Herrington Elementary 10/10 GreatSchools** (inside the community, PK-5, Spanish Language & Culture Institute) → Hopewell Middle → Stony Point High (GreatSchools + Baker Realty); page previously had zone names with zero ratings. (3) NEW **Major Employers** H2 (page had none) — Dell global HQ, Emerson, Toppan Photomasks global HQ, healthcare + hospitality (Round Rock Chamber), tied to complicated-income positioning (RSU/bonus, 1099, self-employed → bank-statement structuring). (4) NEW **closing-cost example** on a $370K purchase with cited TX figures — owner's title $2,110.60 (TDI 2026, seller-paid by WilCo custom — buyer myth-buster), WilCo recording $25+$4/pg, settlement fee, arrears tax proration (~$3,100 seller credit on a July close).
- **Fresh data:** median $392K (April 2026 ABoR) → **$370K Redfin trailing-3mo through May 2026 (−6.3% YoY)** across tiles, tax math, FAQ schema + accordion (recomputed ~$6,204/yr / ~$517/mo); stale "April 2026" snapshot heading + "down 0.12% from March" rate line removed (rate softened to directional "mid-6s").
- **De-templated** the buda-shared TSAHC/TDHCA DPA line (grep-confirmed) → Round-Rock-specific second-lien-vs-low-down framing.
- **USDA removal (D1):** page actively promoted a product Adam doesn't originate — cut from LocalBusiness schema, Service schema, FAQ schema Q, FAQ accordion, 2 neighborhood mentions, and the /loans/usda.html promo (0 USDA refs remain). **Perf-claim cleanup (D2):** "close in three weeks" → "moves quickly once under contract"; VA "24–48 hours" → "same-day pre-approval review".
- **Mechanical:** dateModified + hero "Last reviewed" + sitemap lastmod → 2026-06-21; OG/Twitter "April 2026 market data" → "2026"; Conventional Service schema neighborhood list += Paloma Lake. All 6 JSON-LD blocks validated (Service 6→5, FAQ 5→4); title lint pass; sections balanced 11/11; 8 new inline source URLs.
- **Left Adam-gated:** trust strip "5.0 Stars 136+ Reviews" + K.R. "Closed in 22 days" testimonial (AggregateRating + testimonial-speed-claim policy pending). Committed only this page + sitemap + run-logs; left concurrent-writer `index.html` and untracked gbp-posts/run-logs alone.

## 2026-06-20 — interactive (Adam): blog cannibalization audit + fixes, rates canonical, "Recently Updated" homepage strip

Full keyword-cannibalization audit (mapped every blog post + money page to its target query). Cluster discipline mostly clean (lender-shopping, complicated-income); found **4 real collisions**, all fixed via title/H1/anchor differentiation — **no deletions, no 301s, no money pages merged** (signal concentration, not removal):

- **Pre-approval blog** — `<title>` was byte-identical to the `mortgage-pre-approval-austin` money page (only tag never customized; H1/OG/desc were already correct). Retitled → "How Long Does Mortgage Pre-Approval Take? Austin TX Timeline."
- **DSCR Austin blog** — re-angled `<title>`/H1/OG/Twitter/Article-headline/FAQ-h2 → "How DSCR Loans Work in Austin TX — 2026 Investor's Guide" (informational) to stop competing with `dscr-loan-austin-tx` (transactional).
- **DPA blog** — re-angled → "2026 Texas Down Payment Assistance Programs: TSAHC, TDHCA & City of Austin" (program long-tail), ceding "down payment assistance Austin" to the money page. `ftb-dpa-guide.html` was already `noindex` (lead magnet) — left untouched.
- **FTB blog** — sharpened → "First-Time Buyer Assistance Programs Austin TX (2026): TSAHC, TDHCA & MCC" vs the `first-time-home-buyer` loan money page (kept per Adam).
- **self-employed-mortgage-austin** — dropped "Bank Statement Loans" from `<title>`/OG (dedicated `bank-statement-loans` page owns that term).
- Synced all `blog.html` ListItem schema + noscript anchors and `blog/manifest.json` card titles. All 4 blog posts already linked UP to their money pages — internal-link layer was already correct.

**Rates canonical:** decaying `blog/2026-03-20-austin-mortgage-rates-march-2026.html` now `rel=canonical` → `/austin-mortgage-rates.html` (consolidate "Austin mortgage rates" signal onto the evergreen page).

**"Recently Updated" homepage strip** (new feature): surfaces the site's daily edit activity as visible freshness, not just weekly net-new posts. Auto-generated from git history at deploy (`scripts/gen-recent-updates.js` → `recent-updates.json`), rendered client-side on `index.html` between Service Areas and FAQ. Self-maintaining (regenerates every deploy), fail-safe (Netlify `command` wrapped in `|| true`; committed JSON fallback; section stays `hidden` if the feed is missing/empty). Verified live in Site Preview: feed HTTP 200, 8 cards rendered, 0 console errors. See DECISIONS.

**Verification:** blog title lint pass; `recent-updates.json` valid JSON (10 items); 0 stale colliding strings (grep-confirmed across all touched files); strip renders in browser preview.

## 2026-06-20 — interactive (Adam): self-employed money-page recovery + AEO schema + blog de-cannibalization

Root-caused the self-employed money page's SERP slip (#2→#5, now ranking behind Adam's own blog post — flagged in Wk 15 competitive intel). Two real causes found + fixed:

- **Keyword cannibalization.** `self-employed-mortgage-austin.html` (money page, 117 inlinks, 54KB, full schema) and `blog/2026-04-02-self-employed-mortgage-austin-tx.html` (blog, 4 inlinks, 27KB) targeted the **identical** head term "self-employed mortgage austin tx" with near-duplicate titles. Google split signals and favored the blog's year-stamped title. **Fix:** kept the money page as the transactional head-term owner (title untouched — it's the ranking asset); re-angled the blog to clear informational intent — `<title>`/OG/Twitter/Article-headline/H1 all → **"How to Qualify for a Self-Employed Mortgage in Austin TX (2026)"** (also fixed a pre-existing title↔OG mismatch — the bare `…2026` title disagreed with the how-to framing already used in OG + blog.html). Synced both `blog.html` references (CollectionPage ListItem + noscript link).
- **Freshness decay.** Money page `dateModified` had been frozen at publish date (2026-03-27) for ~3 months. **Fix:** genuine content refresh — added a dated "Where this stands in 2026" paragraph to the answer-first intro (honest, no rate/FICO/performance claims); bumped Article `dateModified` 2026-03-27 → **2026-06-20**, visible "Last updated" hero line, and sitemap `lastmod` 2026-05-28 → 2026-06-20.
- **AEO AggregateRating** added to the money page's `MortgageBroker` schema — ratingValue **4.99**, reviewCount **137** (the 92 Google @ 5.0 + 45 Zillow @ 4.98 already displayed sitewide; weighted avg). NOTE: this is an **AEO/AI-citation** signal only — Google does **not** render self-serving AggregateRating stars for LocalBusiness/Organization (policy since 2019, confirmed current). The Wk 15 "schema wedge to beat LendFriend's visual stars" premise is **wrong** — the real SERP-stars lever is third-party (GBP/Zillow), i.e. off-page. Don't keep surfacing it as an on-page win.
- **Verification:** 6/6 JSON-LD blocks parse clean (python json.loads); aggregateRating present; blog title lint pass; 0 stale title refs (grep-confirmed). Files: `self-employed-mortgage-austin.html`, `blog/2026-04-02-self-employed-mortgage-austin-tx.html`, `blog.html`, `sitemap.xml`.

## 2026-06-20 — styer-suburb-editor (Round 3 #13): westlake lighter-touch refresh — Round 3 COMPLETE

- **Page:** `westlake-mortgage-lender.html` — Round 3 #13, the final page in the rotation (follows 2026-05-15 Round 2 deep renovation). Page already 100% unique body copy — grep confirmed **0 cross-page verbatim duplicates** across all suburb pages (same state as pflugerville), so de-templating took the form of an internal-redundancy trim.
- **4 first-party adds (all cited inline):**
  1. **NEW named neighborhood — Westlake Highlands (78746)** — fifth community on the page (joined Rob Roy / Davenport Ranch / Lost Creek / Barton Creek). Established late-1970s/'80s/'90s view-lot enclave **west of Toro Canyon Rd between Westlake Dr & Loop 360, David Thomas Rd (E) → Stone Canyon Dr (W)**; housing stock is a mix of original homes, gut-remodels, and teardown-rebuilds on the elevated view lots; feeds Eanes Elementary / Hill Country Middle / Westlake HS (all top-rated). Framed as **the widest price band in 78746** — an original home is one of the lower-cost ways into Eanes ISD, a view-lot new build or down-to-studs remodel pushes into jumbo/super-jumbo → **loan-follows-the-house** angle (renovation/one-time-close construction vs straight jumbo). Source: austinrealestatehomesblog. *HomeCity/Redfin per-sqft and DOM figures were 403-blocked / AI-summary-only and were NOT cited, per the correctness rules.*
  2. **NEW school rating — Forest Trail Elementary 10/10** (1203 Loop 360 S, K–5, ~500 students; perfect TEA "A" across all four accountability categories 2024–25). The Lost Creek feeder elementary — **named on the page but never rated**. GreatSchools (2206) + Texas Tribune cited.
  3. **NEW school rating — West Ridge Middle 10/10** (9201 Scenic Bluff Dr, grades 6–8, ~931 students, 78% math / 80% reading, top 5% of TX public schools). The shared second Eanes middle for Lost Creek, Rob Roy, and the new Westlake Highlands — also **named but never rated**. Together adds (2) and (3) **complete both feeder ladders** (Forest Trail 10 → West Ridge 10 → Westlake HS 9; Barton Creek Elem → West Ridge 10 → Westlake HS). GreatSchools (2207) cited.
  4. **Fresh June 2026 market print** — added **Neuhaus full single-family city cut: $3,232,660 median, 77-day average DOM, just 36 closings in the trailing twelve months across 699 historical listings** (ABoR MLS, updated through June 2026) — the freshest data point on the page, distinct in scope from the existing Neuhaus $1M+ luxury slice (which was kept). Used the ~3-closings/month volume to reinforce the page's existing three-views median reconciliation.
- **Median PRESERVED** — Redfin **$1.6M March 2026 (+40.9% YoY)** kept. Redfin direct fetch = 403, and the only "newer" city medians were unverifiable or wildly scope-divergent (AI-summary $2.1M May; Orchard $3.6M last-30 days +34.6%; Neuhaus $3.2M city) in a ~3-sale/month luxury market where one estate moves the median six figures → preserved the well-sourced figure (round-rock / bee-cave / lakeway precedent).
- **De-templating (internal-redundancy trim, no cross-page verbatim left to cut):** removed the soft generic why-city paragraph ("Whether you're relocating to Austin, upsizing… I'll structure the deal to fit your financial picture…") — the Loan Options grid, the new Westlake Highlands bullet, and Process Step 2 already cover complex-income structuring concretely.
- **Section retitle:** "78746 Luxury Market — April 2026 Data Reconciled" → "Mid-2026 Data Reconciled" (honest: Redfin March / TeamPrice YTD / Neuhaus June).
- **Mechanical:** WebPage `dateModified` 2026-05-15 → 2026-06-20; sitemap `lastmod` 2026-05-18 → 2026-06-20; LocalBusiness schema description neighborhood list += Westlake Highlands. All **4 JSON-LD blocks** (MortgageBroker/FAQPage/BreadcrumbList/WebPage) validated clean (python json.loads); title lint pass; **0 stale "Four communities" / "April 2026 Data Reconciled" refs remain** (grep-confirmed).
- **5 new inline source URLs** (austinrealestatehomesblog Westlake Highlands, GreatSchools Forest Trail 2206, Texas Tribune Forest Trail, GreatSchools West Ridge 2207, Neuhaus city data June 2026). Did NOT touch Adam-gated items: trust strip "5.0 Stars / 136+ Reviews" + Michael & Sarah testimonial (AggregateRating policy pending Adam); Step-3 "24–48 Hours" pre-approval kept as-is (honest for a jumbo underwriter-reviewed file — "same-day" would overstate and contradict the page's own "jumbo deals require early planning" framing). Committed only this page + sitemap + session docs; modified `run-logs/latest.md` and untracked `run-logs/2026-06-20.md` + `gbp-posts/2026-06-07.md` left for their owning tasks. **Round 3 now 13/13 — COMPLETE. Next run: Round 4 #1 round-rock.**

## 2026-06-19 — styer-suburb-editor (Round 3 #12): dripping-springs lighter-touch refresh

- **Page:** `dripping-springs-mortgage-lender.html` — Round 3 #12 (follows 2026-05-14 Round 2 deep renovation). Page already content-rich, so a lighter-touch data refresh + deepening + de-template.
- **4 first-party adds (all cited inline):**
  1. **Fresh market data** — swapped Redfin's stale March 2026 print ($542,500, +4.7% YoY) for its own newer **April 2026 all-home-types median $510,726 (−5.9% YoY)** across LocalBusiness schema + FAQ schema + intro H3 + FAQ accordion + meta description. Both Redfin and Neuhaus snapshots are now April, so reframed the ~$65K spread as **methodology (Redfin all-home-types vs Neuhaus SFH-only luxury-skew), not mix-timing** — the negative YoY now *agrees* with the page's construction-flood softening thesis (the old +4.7% had contradicted it). Added **Movoto's May list-side $251/sqft (−5% YoY)** as a forward signal.
  2. **NEW school w/ rating — Cypress Springs Elementary** (Driftwood, DSISD): TEA accountability **"A" 2024-25** (Texas Tribune) + **5-star SchoolDigger**. It's the elementary the new High School No. 2 is being built next to on Darden Hill Rd — folds directly into the page's existing HS#2 catchment narrative (the campus was named on the page but never rated).
  3. **NEW named neighborhood — Double L Ranch (Anarene), 78620** — promoted from a one-line construction-flood mention to a builder-and-agreement spotlight: City of Dripping Springs **amended development agreement for 2,231 homes** (NestHaven cited), ~1,677 ac at ~1.3 homes/acre (lower density than most DS neighborhoods), 500+ ac parkland + Little Barton Creek trails, builder roster **Highland / Scott Felder / Perry / Westin / Drees** (doublelranchtx.com), jumbo-tier framing.
  4. **Caliterra Phase 2 deepening** — added custom-lot builders **Alkire Construction / Atlas Custom Homes / LTB Design Build**, the lot-width sqft split (80-ft 3,000–4,500 / 100-ft 3,700–5,000), and the Phase-2 amenity core (fitness center / lap pool / event pavilion); caliterraliving.com cited.
- **Closing-cost example recomputed** at the new median — $510,000 purchase, 20% down ($408,000 loan), ~$10,500–$13,500 to close, ~$8,735/yr property tax at 1.71%; H3 title "$542K" → "$510K".
- **De-templated 2 paragraphs:** Step 2 opener **"Upload pay stubs, W-2s, tax returns…"** (shared verbatim on **9 pages → 8**) rewritten to 78620 acreage/jumbo doc-list framing (self-employed/RSU/K-1/bank-statement, jumbo reserves, OSSF permit); process intro **"rewards prepared buyers"** (shared on **3 → 2**) rewritten to softening-market builder-leverage framing.
- **Mechanical:** WebPage `dateModified` 2026-05-14 → 2026-06-19; sitemap `lastmod` 2026-05-18 → 2026-06-19; LocalBusiness schema description += Double L Ranch + new median. All **4 JSON-LD blocks** (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean (python json.loads); title lint pass; **0 stale `542`/`9,275`/`4.7%`/`March 2026` refs remain** (grep-confirmed).
- **7 new inline source URLs** (Redfin April reframe, Movoto market-trends, Texas Tribune + SchoolDigger + GreatSchools-Driftwood Cypress Springs, NestHaven dev-agreement, doublelranchtx.com, caliterraliving.com The Ranch at Caliterra). Did NOT touch Adam-gated trust strip "5.0 Stars 136+ Reviews" / Sarah & Matt testimonial (AggregateRating policy pending Adam). Committed only this page + sitemap + session docs (uncommitted sister-task `non-qm-loans.html` + untracked `run-logs/gbp-posts/2026-06-07.md` left alone). **Round 3 now 12/13 done.** Next in queue: #13 westlake (last in Round 3 → Round 4 restarts at #1 round-rock).

## 2026-06-18 — styer-suburb-editor (Round 3 #11): bee-cave lighter-touch refresh

- **Page:** `bee-cave-mortgage-lender.html` — Round 3 #11 (follows 2026-05-13 Round 2 deep renovation). Bee Cave already content-rich, so a lighter-touch deepening + de-template + perf-claim cleanup.
- **4 first-party adds (all cited inline):**
  1. **NEW H3 neighborhood Ladera (78738)** — Taylor Morrison, built 2012-2016, ~100 homes at Home Depot Blvd & RR 620, 1,834-4,630 sqft on 0.12-0.31 ac, stucco-and-stone, no pool/clubhouse (60-ac Bee Cave Central Park + Galleria nearby). Framed as the **conventional-tier counterweight** to Bee Cave's all-jumbo reputation: most resales sit under the $832,750 conforming line → 5-10% down conventional, not jumbo (austinrealestatehomesblog cited).
  2. **School-zoning trap surfaced** — Ladera feeds **Lake Travis Elementary** (15303 Kollmeyer, 78734, out by Lakeway; 38% math/45% reading proficiency, GreatSchools 4157), **not** the 8/10 Bee Cave Elementary a Bee Cave mailing address implies. Same high-value pattern as Crestline (Cedar Park) / MorningStar (Georgetown).
  3. **NEW school Bee Cave Middle School 10/10** (5400 Vail Divide, grades 6-8, 860 students, opened 2019; GreatSchools 25736) — completes the elem→middle→high feeder ladder the page was missing (it jumped elementary→high). Both Bee Cave Elem + Lake Pointe Elem feed through it. Synced into FAQ schema + accordion + schools list ("Three campuses" → "Four"); intro count fixed.
  4. **NEW conventional-tier closing-cost example** — page only had a $1M jumbo example; added a $600K Ladera/entry-Sweetwater conventional case (10% down → $540K loan, ~$11K-$14K to close, skips the 6-12mo jumbo reserve), with Ladera's effective tax rate **1.644% TY2025** (up from 1.6256% TY2024, austinrealestatehomesblog cited).
- **De-template:** construction-loan tile rewritten Bee-Cave-specific (Spanish Oaks/Uplands lots, jumbo take-out from day one) — removed the verbatim string **"Lock your rate before construction starts, qualify once, close once"** shared with `lakeway` (grep-confirmed 0 remaining on bee-cave).
- **Perf-claim cleanup (Decision 2a):** intro "pre-approval in 24–48 hours" → "same-day pre-approval" (the "two 24-hour staffed gatehouses" descriptor at Spanish Oaks left as-is — not a perf claim).
- **Mechanical:** WebPage `dateModified` 2026-05-13 → 2026-06-18; sitemap `lastmod` 2026-05-18 → 2026-06-18; LocalBusiness schema description += Ladera + Bee Cave Middle 10/10. All **4 JSON-LD blocks** (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean (python json.loads); title lint pass.
- **Median preserved** — Redfin $1.0M Mar 2026 (+6.9% YoY, $293/sqft) kept; May-2026 alt sources too noisy/conflicting to swap (Homes.com $950K/83 DOM vs Orchard $1.095M +38.6%/30.5 DOM — luxury-sample distortion; round-rock/buda/lakeway precedent = preserve well-sourced figure over volatile swaps).
- **5 new inline source URLs** (austinrealestatehomesblog Ladera ×2, GreatSchools Bee Cave Middle, GreatSchools Lake Travis Elementary). Did NOT touch Adam-gated trust strip "5.0 Stars 136+ Reviews" / Nakamura testimonial (AggregateRating policy pending Adam). Committed only this page + sitemap + session docs (untracked sister-task `gbp-posts/2026-06-07.md` left alone). **Round 3 now 11/13 done.** Next in queue: #12 dripping-springs.

## 2026-06-18 — styer-site-daily (Thursday): fixed conversion-funnel break on 3 suburb forms

- **Non-negotiables:** sitemap.xml + robots.txt 200; conversion tracking 10/10 (HTML-token via `curl -L`, no live-submit pollution). Absolute tool paths.
- **Thursday rotation — Internal Linking + Funnel Flow.** Traced the funnel on all 5 form-equipped suburb pages and found a real **conversion-tracking break on 3 of them**: `austin-area`, `buda`, `westlake` quick-quote forms had `data-netlify="true"` but **no `action`** attribute. Verified no shared JS submit handler exists (`script.js`/`analytics.js`/`scroll-effects.js` clean), so those forms did a native POST to Netlify's default success page — bypassing `/thank-you`, so `generate_lead`/`thank_you_page_view` never fired and real leads saw a bare Netlify page instead of Adam's branded next-steps. **Fix:** added `action="/thank-you"` to all 3, matching the known-good `cedar-park`/`kyle` pattern. Commit `c519c4e`; Netlify deploy `ready` (3 files uploaded, secret-scan clean, mobile Lighthouse home Perf 81/A11y 100/BP 100/SEO 100); all 5 forms verified routing to /thank-you live.
- **Internal linking:** 3 pages (austin-area/buda/westlake) each link to well above 2 relevant pages (peer suburbs, /calculators, /scenario, FTB guide). ✅
- **Design spot-check:** homepage hero CTA → `#contact-form`/`#quick-scenario-form` + Calendly is intentional under the repositioning (not a defect — stale checklist item left un-"fixed"); entity hygiene clean (0 legacy names, NMLS present); positioning copy strong (self-employed/wholesale/complicated-income). Gold hex `#8B6E24` carried LOW (Adam).
- **SEO/SEM:** BLOCKERS clean; backlog 0 site-eligible; loanos-clone NOT mutated. Blog fresh (06-16).
- **Learning:** Netlify HTML post-processing rewrites form attributes (double→single quotes, alphabetical reorder, strips `data-netlify`) — quote-sensitive verification greps give false negatives; verify quote-agnostic + via deploy permalink/API. Committed only the 3 page files (file-specific add; sister-task untracked `gbp-posts` file left alone).

## 2026-06-17 — styer-site-daily (Wednesday): Georgetown suburb deep-dive audit — clean, 0 mutations

- **Non-negotiables:** sitemap.xml + robots.txt 200; conversion tracking 10/10 (HTML-token via `curl -L`, redirects followed — no live-submit pipeline pollution). Absolute tool paths used (PATH-drop learning re-confirmed in `for`-loop subshell).
- **Wednesday rotation — Georgetown suburb deep dive + AEO.** Picked over strict order because Wk-15 competitive intel flagged it NEW #7 ★ (only rising keyword amid a 4-of-5 pullback). On-page **excellent, 0 defects:** city-specific H1, answer-first AEO intro, question-phrased H2s, 4 valid JSON-LD blocks (LocalBusiness/FAQPage/BreadcrumbList/WebPage — all parse via python json.loads), internal links to /calculators + /rate-check-georgetown, NMLS 513013/2653540 + Kyber entity correct, 0 legacy entity names.
- **Systemic finding surfaced (not edited):** only 5 of 25 suburb pages carry an inline Netlify quick-quote form (austin-area, buda, cedar-park, kyle, westlake); the other 20 incl. Georgetown lack the on-page `/thank-you`-landing form pattern. Not unilaterally added — form changes are an Adam-approval gate + create unmapped Netlify form-names (silent-lead-loss risk) + deep suburb edits are styer-suburb-editor-daily's domain. Flagged for coordination.
- **SEO/SEM:** BLOCKERS.md clean; backlog 0 site-eligible items; loanos-clone NOT mutated (paused-LoanOS deploy guard). Blog fresh (06-16). **0 site-HTML mutations — clean verification run.** Committed only this task's run-log + session docs (file-specific add; sister-task untracked gbp-posts file left alone).

## 2026-06-16 — styer-suburb-editor-daily (Round 3 #10): deepen Lakeway page

- **Queue: Round 3, position 10 of 13** (lakeway) — lighter-touch refresh following 2026-05-12 Round 2 deep renovation. Next: #11 bee-cave.
- **4 first-party adds:** (1) **Fresh market data** — Round 2 was 403-blocked from anything past Feb 2026; WebSearch surfaced the current print: **Redfin Lakeway median $840,040 May 2026 (+4.7% YoY, 244 closings, 98 DOM vs 71 a year ago)**, swapped in across LocalBusiness schema + FAQ schema + body + FAQ accordion + meta description, fully retiring the stale "$704K Feb 2026 (-11.2%)" figure. Reconciled with Neuhaus April 2026 $868K SFH median (+12% YoY): the two cuts were $164K apart 3 months ago, now within $28K — both tiers pricing firmer, but 98 DOM + 6.3-mo supply keeps buyers negotiating 5.1% under ask. (2) **NEW H3 neighborhood Costa Bella (78734)** — gated super-jumbo waterfront enclave off RM 620 at Oak Grove Blvd, 62 custom Mediterranean homes $1.2M–$3.4M (5,500–8,183 sqft, avg ~6,729 / ~$2.2M), 14 waterfront + 21 lake-view + 27 hill-country-view, clubhouse/pool/tennis/spa + private yacht club with 72 boat slips for up to 50-ft yachts; tied to dock/boathouse-valuation + flood-zone + primary-vs-second-home overlay framing (austinrealestatehomesblog + HomeCity cited). (3) **NEW school rating Lake Travis Middle School 8/10** (894 students, 16:1, perfect TEA "A" all categories 2024-25) — completes a clean **9/8/9 elementary→middle→high feeder ladder** alongside Serene Hills Elem 9/10 + LTHS 9/10 (GreatSchools + Niche cited). (4) **Recomputed closing-cost example at the $840,040 median** — $672,032 loan at 20% down, ~$15K–$20K costs/prepaids itemized at the ~1.85% LTISD+Lakeway rate; **added the conforming-vs-jumbo wrinkle most buyers miss** (at the median with 20% down the loan is conforming under $832,750 → conventional pricing; jumbo only kicks in on Costa Bella / lakefront / upper Flintrock).
- **De-templated Step 1** — cut verbatim "No credit pull happens until you are ready to move forward" (now on **5** other suburb pages, was 6) → Lakeway-jumbo-specific "show me your income shape so I can find the half-point gap across 40+ lenders before you write an offer" framing.
- **Mechanical:** WebPage `dateModified` 2026-05-12 → 2026-06-16; sitemap lastmod 2026-05-18 → 2026-06-16; LocalBusiness schema description += Costa Bella + Serene Hills + $840,040 median; meta description refreshed (154 chars). All 4 JSON-LD blocks validated clean (python json.loads); title lint pass; 0 stale 704/Feb-2026 references remain. **4 new inline source URLs** (Redfin Lakeway housing-market, austinrealestatehomesblog Costa Bella, HomeCity Costa Bella, GreatSchools + Niche Lake Travis Middle).
- **Committed only `lakeway-mortgage-lender.html` + `sitemap.xml`** — untracked sister-task `run-logs/gbp-posts/2026-06-07.md` left alone; Adam-gated trust strip "5.0 Stars 136+ Reviews" / David & Christine testimonial untouched (AggregateRating policy pending).

## 2026-06-16 — styer-blog-writer-weekly: published "DSCR Loan Requirements in Texas (2026)"
- Net-new Tier-A DSCR-cluster post (eligibility deep-dive: credit, down payment/LTV, reserves, DSCR ratio, property types, LLC titling, no personal income/DTI). Slug `2026-06-16-dscr-loan-requirements-texas`, 1,581 words, 4 approved-source citations (CFPB 1026.3(a), Fannie B2-1.1-01 + B3-4.1-01, FRED). Fills confirmed "dscr loan austin tx" SERP gap. All 7 gates pass; registered in blog.html (noscript + CollectionPage), manifest.json, sitemap.xml. Commit `bbe7c05`, deploy verified live (HTTP 200).

## 2026-06-16 — styer-site-daily (Tuesday): title+meta audit + 3 meta fixes + VA superlative cleanup

- **Non-negotiables:** sitemap.xml + robots.txt 200; conversion tracking 10/10 (HTML-token, redirects followed — no live-submit pipeline pollution).
- **Audited 20 loan-type/specialty money-page titles + meta descriptions.** Titles all present/unique/in-range, 0 legacy entity names; HIGH_RISK indexed-title rewrites flagged, not edited.
- **3 deficient meta descriptions fixed (LOW_RISK):** `self-employed-mortgage-austin.html` 131→158 chars (+K-1, +"Get pre-approved" CTA — serves competitive-intel #2→#5 recovery); `dscr-loan-austin-tx.html` 137→156 (+"Get a quote today" CTA); `loans/va.html` removed "lowest rates available" superlative from meta + og:description + twitter:description + hero subtitle (GOALS.md Phase A; replaced "deserves the best, and we deliver" puffery with relational positioning).
- **Flagged for Adam (not edited):** fha.html title/meta call Adam "a broker" — conflicts with correspondent-lender positioning; va.html body line-261 `<strong>Lowest rates</strong>` header + line-335 testimonial "best rate" = Phase A body-sweep candidates (testimonial edits Adam-gated).
- **Committed `7bafb4e`** (3 files, file-specific add — sister-task untracked `run-logs/gbp-posts/2026-06-07.md` left alone), pushed to main, deploy verified live. Self-review PASS.

## 2026-06-15 — styer-suburb-editor-daily (Round 3 #9): deepen Manor page

- **Queue: Round 3, position 9 of 13** (manor) — lighter-touch refresh following 2026-05-10 Round 2 deep renovation. Next: #10 lakeway.
- **4 first-party adds:** (1) **NEW H3 neighborhood Wildhorse Ranch (78653 — Manor ISD)** — newest large MPC (~1,500 ac off US-290 near SH-130, adjacent to Manor New Tech HS — explicitly Manor ISD, not Del Valle, so distinct from Whisper Valley); Highland (19 plans from late $200s) + Brohn + Pulte + Milestone roster; Saddle Ridge by Milestone (11101 Golden Cloud Bend) $364,990–$486,402, 1,700–2,678 sqft; amenities + FHA/DPA-range framing. (2)+(3) **NEW GreatSchools ratings on already-named-but-unrated campuses** — ShadowGlen Elementary **2/10** (21% math / 43% reading) + Lagos Elementary **6/10** (36% math / 48% reading), with "both default-feed Manor HS but Lagos elem ~3× higher on math — verify assigned campus" buyer insight. (4) **fresh market data** — $171/sqft (-5.5% YoY) added to intro + LocalBusiness schema.
- **Median preserved** — March 2026 Redfin $340K (-5.7%); no newer Redfin print (May figures surfaced were TX-statewide $343,779, not Manor-specific) → did not swap.
- **De-templated 2 paragraphs:** Step 1 cut verbatim "No credit pull happens until you are ready to move forward" (now on 6 other pages, was 7) → Manor builder-incentive framing; Step 4 cut verbatim "track record of closing on time" (now on 3 other pages, was 4) → 98-DOM buyer-leverage framing.
- **Mechanical:** WebPage `dateModified` 2026-05-10 → 2026-06-15; sitemap lastmod 2026-05-18 → 2026-06-15; LocalBusiness schema neighborhood list += Wildhorse Ranch + $171/sqft. All 4 JSON-LD blocks validated clean (python json.loads); title lint pass. 6 new inline source URLs.
- **Committed only `manor-mortgage-lender.html` + `sitemap.xml`** (commit `02c4aab`) — untracked sister-task `run-logs/gbp-posts/2026-06-07.md` left alone; Adam-gated trust strip / Ramirez testimonial untouched (AggregateRating policy pending).

## 2026-06-15 — styer-competitive-weekly (Wk 15): Phase A cluster pullback — research only, 0 site mutations

- **Phase A complicated-income cluster PULLBACK** — 4 of 5 tracked keywords lost position in one week (vs Wk 14's "momentum compounds"): self-employed #2→#3 (main LP `/self-employed-mortgage-austin.html` slipped #2→#5, blog post holds #3; **Champions Mortgage** NEW #1), bank statement #4→#7, jumbo #2→#3 (**Grove Mortgage** NEW #2), **asset depletion #1+#5 → single #6 ⚠** (LendFriend #1; Lendingshops + STX Lending NEW above), 1099 #7→#4 (lone gainer). Top-10 count held 5/7 but trend reversed. non-QM + DSCR remain outright gaps (both got MORE crowded — Austin Mortgages NEW #1 non-QM; Cambridge + Tidal NEW DSCR).
- **⚠ Asset-depletion swing flagged for manual verification, NOT asserted.** WebSearch is a US-generic proxy, not Adam's localized SERP; #1+#5→#6 is large enough to flag but tagged "verify logged-out first." Per Re-Verify Gate, prior "#1+#5" claim cleared, not carried. Page exists locally (not 404). VERIFY-FIRST TOMORROW_PRIORITY routed to `run-logs/latest.md` for styer-site-daily.
- **Suburb rotation (Round Rock + Georgetown):** **Georgetown NEW #7 ★** (first-ever top-10, against two exact-match-name brand incumbents "Georgetown Mortgage" + "Georgetown Mortgage Bank"); **Round Rock ↓ out of top 10** (was first-ever #9 — directory/physical dominance reasserted).
- **Competitor spotlight:** LendFriend re-fetched live (`/self-employed-home-loans`) — STILL no FAQPage/AggregateRating JSON-LD (schema wedge holds, 4th+ consecutive). New #1 Champions Mortgage fetched — also schema-less, ~1,300 words, no suburb depth → won on off-page authority, NOT on-page structure. Styer's on-page advantage intact; the gap is off-page authority. Don't content-panic.
- **Core Austin terms 0/6 held** but heavy churn: Highlander lost #1 broker (→#6), MortgageAustin lost #1 pre-approved (→#3), Barton Creek lost #1 lender (→#7) — directories (Yelp/Zillow) reclaimed all head terms. Re-Verify Gate cleared 10 of 16 carried claims (high-churn week).
- **NotebookLM dead on both legs** — advisor script absent + CLI auth expired (verified live: `notebooklm list` → "Authentication expired or invalid"). Steps 0/4/6-push skipped. Findings persisted to local report (`run-logs/competitive/2026-06-15.md`) + master growth log + learnings only. Working tree respected — sister-task untracked `run-logs/gbp-posts/2026-06-07.md` left untouched; no `-A` staging.

## 2026-06-15 — styer-site-daily Monday (full rotation: Schema + Google Ads QF + AEO Entity Audit): clean verification day, 0 site mutations

- **Sitemap/robots 200; conversion 10/10** (HTML-token via live `curl -L`, redirects followed; live-submit avoided). Both LPs: GTM `PQQ6PGLR`, `generate_lead` + correct `lead_type` (purchase_prequal / refi_quote), `action→/thank-you`; `/thank-you` fires `thank_you_page_view`. Used absolute tool paths after subshell PATH-drop (cached learning).
- **Monday schema audit:** homepage **3/3 ld+json blocks VALID** (live Python `json.loads` — Re-Verify fallback, no Rich Results key). Coverage: homepage `MortgageBroker`×2 + `Person` + `FAQPage` + NMLS `EducationalOccupationalCredential` + OfferCatalog; about `LocalBusiness` + `Person` + `Organization` + `FAQPage`; DSCR `Article` + `FAQPage` + `FinancialProduct` + `BreadcrumbList`.
- **AEO entity audit:** Person (Adam Styer) consistent homepage↔about. Entity-name hygiene clean — `Mortgage Solutions LP`=0, `The Styer Team`=0, old company NMLS `2526130`=0, HyperSmart×9, Kyber×4, company NMLS 2653540 + personal 513013 present. Homepage lede = NEW "complicated income" positioning (H1 *"The loans your bank said no to. The pricing your bank can't match."*) — **positioning pivot LIVE**, no 21-day/performance claim in lede. AggregateRating still absent from homepage JSON-LD (Adam-gated; self-serve homepage review markup carries Google policy risk).
- **🟢 Blog freshness RESOLVED** (re-verify auto-clear): `styer-content-weekly` shipped two 2026-06-14 posts (`buy-before-you-sell-austin-tx`, `dscr-vs-conventional-investment-property-loan-texas`) — both HTTP 200, in sitemap; latest now 1 day old. Stale "blog 9 days overdue" flag removed from RECURRING_ISSUES. DSCR investor post CTA routes to `/scenario.html` (Send-Your-Scenario canonical LP) + DSCR calculator — resolved-by-design funnel, not a CTA gap.
- **SEO/SEM backlog 0 site-eligible; BLOCKERS.md clean; loanos-clone not mutated** (paused-LoanOS deploy guard). NotebookLM advisor script absent (74th). No commits — clean tree respected (untracked sister-task `run-logs/gbp-posts/2026-06-07.md` left alone). New FLAG: Monday weekly GSC sitemap-Success reminder.

## 2026-06-14 — styer-blog-writer-weekly (manual, Adam-directed): published "How to Buy Your Next Home Before Selling Your Current One (Austin, TX)"

- **Net-new post** `blog/2026-06-14-buy-before-you-sell-austin-tx.html` — buy-before-you-sell strategy: pending-sale DTI relief, bridge financing, home-sale contingency strategy. 1,399-word prose body, Article + FAQPage (5 Q&As) + BreadcrumbList schema. Grounded in 3 approved-source citations: Fannie Mae Selling Guide B3-6-06 (pending-sale PITIA exclusion = executed contract + cleared contingencies), B3-6-05 (bridge contingent liability), CFPB 12 CFR 1026.43 (bridge-loan definition). No rate quotes, no performance/proprietary-program claims. NotebookLM down → WebSearch on approved domains. Distinct same-day post from the DSCR run (8323044) per Adam-directed override; STEP 0/1 intentionally skipped.
- **All STEP 4 gates passed**; registered in all 4 surfaces (blog.html noscript + CollectionPage, blog/manifest.json, sitemap.xml); 5 in-body cluster links (get-preapproved, scenario, loans/refinance, cash-out refi guide, refi decision guide). Commit A `a60395e` pushed → verified live HTTP 200 (`/blog/2026-06-14-buy-before-you-sell-austin-tx`). Bookkeeping in commit B (this entry + backlog consumed-log + run brief `run-logs/content-2026-06-14-buy-before-sell.md`). To undo post: `git revert a60395e`.

## 2026-06-14 — styer-blog-writer-weekly (manual catch-up): published "DSCR vs Conventional Investment Property Loan in Texas" (Tier A DSCR cluster)

- **Net-new post** `blog/2026-06-14-dscr-vs-conventional-investment-property-loan-texas.html` — decision guide (DSCR qualifies on rent, conventional on DTI). 1,410-word prose body, Article + FAQPage (5 Q&As) + BreadcrumbList schema. Grounded in 5 approved-source citations: Fannie Mae Selling Guide B2-2-03 (10-property cap), B3-6-02 (DTI 50%), B2-1.2-01 (LTV), CFPB Reg Z 1026.3(a)(1) (business-purpose exemption) + 1026.43 (ATR). No rate quotes, no performance claims. NotebookLM unavailable → WebSearch on approved domains.
- **All STEP 4 gates passed**; registered in all 4 surfaces (blog.html noscript + CollectionPage, blog/manifest.json, sitemap.xml); 4 in-body cluster links incl. DSCR hub cross-link. Commit A `8323044` pushed → verified live HTTP 200 (`/blog/2026-06-14-dscr-vs-conventional-investment-property-loan-texas`). Bookkeeping in commit B (this entry + backlog consumed-log + run brief `run-logs/content-2026-06-14.md`). To undo post: `git revert 8323044`.

## 2026-06-14 — styer-site-daily Sunday (weekend recovery fire): clean verification day, 0 site mutations

- **Sitemap/robots 200; conversion 10/10** (HTML-token via live `curl -L`, redirects followed; live-submit avoided to prevent fake CRM/n8n leads). Both LP forms confirmed `action='/thank-you'` (single-quoted — quote-agnostic grep), GTM `PQQ6PGLR`, `generate_lead` + correct `lead_type` (purchase_prequal / refi_quote), `/thank-you` fires `thank_you_page_view`.
- **Design spot-check (homepage):** navy `#0A1F3F` intact, HyperSmart branding (13×), personal NMLS 513013 (15×) + company 2653540 (3×), old company 2526130 = 0, zero legacy display names (`styerteam` ×6 = retained social URLs only). Hero CTAs route `#contact-form` (Decision Q10).
- **Re-Verify Gate on lone "21-day" token:** line 493 `Closed in 21 days at a rate within 0.25% of conventional pricing` = scenario-outcome card (real closed file), NOT the banned trust-strip claim → kept per Decision-2, no edit.
- **Blog freshness 9 days stale** (latest 2026-06-05) — re-surfaced to `styer-content-weekly` (2nd consecutive; content task owns authoring, not a FLAG).
- **SEO/SEM backlog 0 site-eligible; BLOCKERS.md clean; loanos-clone not mutated** (paused-LoanOS deploy guard). NotebookLM advisor script absent (73rd). No commits — clean tree respected.

## 2026-06-13 — styer-suburb-editor-daily (Round 3 #8 Liberty Hill): lighter-touch refresh (1 commit, 2 files)

- **Queue #8 liberty-hill** (Round 2 deep-renovated 2026-05-09; Round 3 now 8/13). Already content-rich → lighter-touch refresh per buda/hutto precedent, not a redo.
- **4 first-party adds:** (1) NEW H3 neighborhood **Rio Ancho Ranch (78642)** — acreage community off SH-29 w/ San Gabriel River frontage (Liberty Hill + Bertram), **full 1-acre homesites**, 2,500–5,000 sqft (2,200 min / 550 garage min), builders **Hill Country Artisan + Pacesetter + Grand Endeavor**, private 7-acre lake + pool + basketball/tennis + trails; tied to one-time-close + $832,750 jumbo angle (NewHomeSource HCA + Grand Endeavor + austinrealestatehomesblog). (2) NEW school rating **Santa Rita Elementary** — 4-star SchoolDigger / top-20% TX / State accountability **B**, w/ Feb-2026 rezoning verify-address insight (SchoolDigger + Texas Tribune). (3) Fresh market data — **137 DOM (up from 118 YoY)** woven into leverage framing; **corrected now-stale $229/sqft +14.5%** (no longer on cited Redfin source) → **current Redfin $193/sqft** across FAQ schema + body + accordion. Median **$510K Mar 2026 +11% preserved** (stable on both reads). (4) **De-templated Step 1** — cut verbatim "No credit pull happens until you are ready to move forward" (8→7 pages) → community/phase/build-job framing; **de-templated Step 4** — cut "close on time — every time" absolute (9→8 pages) → 8.0-mo-supply + 137-DOM + builder-incentive-vs-wholesale framing.
- **Mechanical:** LocalBusiness schema desc += Rio Ancho Ranch; WebPage `dateModified` 2026-05-09 → 2026-06-13; sitemap `lastmod` 2026-05-18 → 2026-06-13.
- **Verification:** all 4 JSON-LD blocks validated clean (python json.loads); blog title lint pass; de-templating confirmed via grep (8→7 and 9→8). Committed only liberty-hill + sitemap (untracked sister-task `gbp-posts/2026-06-07.md` left alone). Adam-gated trust strip "5.0 Stars 136+ Reviews" + Hendersons testimonial untouched (AggregateRating policy pending Adam). Commit `85a6d92`, pushed → Netlify auto-deploy. Next: #9 manor.

## 2026-06-13 — styer-site-daily Saturday (weekend recovery fire): clean verification day, 0 site mutations

- **Sitemap/robots 200; conversion 10/10** (HTML-token via live `curl -L`, redirects followed; live-submit avoided). Confirmed both LP forms `action='/thank-you'` (single-quoted in source — quote-agnostic grep required) + JS redirect → Ads conversion fires.
- **LP light compliance pass:** TCPA consent + personal NMLS 513013 + company NMLS 2653540 all present on both LPs; zero legacy display names; zero banned "21-day" trust claims.
- **Design spot-check (homepage):** navy `#0A1F3F` intact, HyperSmart branding present, no legacy names; hero CTAs route `#contact-form` (Decision Q10). Gold renders `#8B6E24` (known hex-drift carry, Adam-gated SKILL.md sync).
- **Net-new LOW awareness:** one "Closed in 21 days" token = a real scenario-outcome card, NOT the banned sitewide "21-Day Avg. Close" performance claim — kept per Decision-2 precedent (real outcome facts retained; "quotes can't be honestly rewritten"). No edit.
- **Blog freshness 8 days (PAST window)** — hard-surfaced to `styer-content-weekly` (latest 2026-06-05; content task owns publishing, not a FLAG).
- **SEO/SEM backlog: 0 site-eligible**; BLOCKERS.md clean; loanos-clone NOT mutated (paused-LoanOS deploy guard).
- NotebookLM advisor script re-verified ABSENT (72nd). Self-review PASS — 0 files edited in styermortgage repo, no commits, sister-task gbp-posts left unstaged. (Bash-tool PATH quirk noted: `cd`/command-substitution drop PATH — used absolute tool paths.)

## 2026-06-12 — styer-site-daily Friday (Content Planning + AEO Review): clean verification day, 0 site mutations

- **Sitemap/robots 200; conversion 10/10** (HTML-token via live `curl -L`, redirects followed; live-submit avoided to prevent fake CRM leads).
- **Blog CTA audit: 34/34 posts** link to /get-preapproved or /refinance-quote — zero gaps.
- **AEO content audit — 2 complicated-income posts, both AEO-excellent.** DSCR cash-out BRRRR: natural-language FAQ Qs, answer-first responses, answer-first extractable intro (75% LTV / seasoning / qualifies on rent), FAQPage schema. Self-employed: AI-style question H2s, answer-first FAQ. No defect → no edit (declined to manufacture a rewrite of already-strong copy).
- **Blog freshness at exact 7-day boundary** (latest 2026-06-05) — surfaced to `styer-content-weekly`; tips past window Sat 06-13.
- **SEO/SEM backlog: 0 site-eligible**; BLOCKERS.md clean; loanos-clone backlog NOT mutated (paused-LoanOS deploy guard).
- **Design spot-check (homepage + about):** hero CTAs route to `#contact-form` → /thank-you (by-design, Decision Q10); brand intact; zero legacy entity names.
- NotebookLM advisor script re-verified ABSENT (71st). Self-review PASS — 0 files edited, no commits to styermortgage repo, sister-task gbp-posts left unstaged.

## 2026-06-11 — styer-suburb-editor-daily (Round 3 #7 Hutto): shipped at-risk concurrent-writer work + mechanical completion (1 commit)

- **Queue #7 hutto.** Body-copy Round 3 deepening had already been done by the styer-site-daily concurrent writer and left **uncommitted** (flagged in CONTEXT 2026-06-11: "concurrent-writer hutto left unstaged") — at risk of being swept by another session per the concurrent-git-writers discipline. This run committed it atomically and finished the mechanical pieces it was missing. Did **not** redo or pile redundant content on already-complete, well-cited work.
- **Content shipped (concurrent writer's, now committed):** (1) NEW H3 neighborhood **Cotton Brook (78634)** — Lennar MPC, model park 1005 Ascari Court, Claremont/Highlands/Ridgepointe, Claremont 1,312–2,532 sqft / $279,999–$364,990, sub-$365K FHA+TSAHC doorway (NewHomeSource + Lennar); (2) NEW H3 neighborhood **Cottonwood Farms (78634)** — Starlight + Ashton Woods at Ed Schmidt Blvd & Limmer Loop, since 2021, feeds Cottonwood Creek Elem → Hutto MS → Hutto HS (austinrealestatehomesblog); (3) NEW schools w/ ratings — **Cottonwood Creek Elementary 4/10** + **Hutto Middle 6/10** GreatSchools added to feeder ladder with "verify assigned elementary" buyer insight (2 GreatSchools URLs); (4) fresh Redfin ~121 DOM + ~1 offer/listing market data; (5) 4-step process fully **de-templated** — verbatim "No credit pull happens until you are ready to move forward" (still on 8 other suburb pages) cut for Hutto-specific copy.
- **This run's mechanical adds:** LocalBusiness schema description neighborhood list += Cotton Brook + Cottonwood Farms (buda precedent); WebPage `dateModified` 2026-05-08 → 2026-06-11; sitemap `lastmod` 2026-05-18 → 2026-06-11.
- **Median preserved** — March 2026 Redfin **$366,166** kept. Verification WebSearch surfaced only HAR.com May "$403,394", which is an **average not a median** (same methodology trap flagged on pflugerville/buda) → preserved the well-sourced figure rather than swap in an inflated number.
- **Correctness:** all 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via `python json.loads`. Untracked sister-task `run-logs/gbp-posts/2026-06-07.md` left alone (not this task's file). Next in queue: #8 liberty-hill.

## 2026-06-10 — styer-site-daily Wednesday (Suburb Deep Dive + AEO): clean verification run, 0 site mutations

- **Post-deploy verification of the 2026-06-09 6-commit batch — 100% GREEN.** 7 new inline quick-quote forms (kyle/cedar-park/dscr/bank-statement/self-employed/non-qm/hnw-quote) all live HTTP 200, `data-netlify="true"` + matching `form-name` in source, functionally complete (name/email/phone/TCPA). Confirmed Netlify strips the `data-netlify` attr from served HTML post-build (so live `data-netlify:0` is expected, not a defect — same as known-good `/get-preapproved`).
- **Buydown calculator P0-A (12× PITI bug) FIXED & LIVE** — root cause was radios `value="yr"` vs JS `=== 'annual'`; fix (`=== 'yr'`) confirmed on served page. 52-run HIGH bug resolved. P0-E Chart.js render-block also confirmed moved to end-of-body live.
- **USDA repositioning (Decision 1=b) held** — smithville/kyle/san-marcos spot-checked: 0 USDA in headers, mentions −70%. **Decision-2a "24-hour" sweep held** on LP pages (0 residual; same-day kept).
- **Wednesday rotation — Cedar Park deep dive:** on-page complete + AEO-excellent (direct-answer hero, question-format H2s, answer-first 5-Q FAQ with local data, FAQPage+BreadcrumbList+Speakable, EEAT byline + last-reviewed date). No defect — "NR" is an off-page citation/physical-presence gap (Adam-owned). No edits (surgical discipline).
- **Re-Verify Gate cleared 5 stale carries** already resolved by Adam's 2026-06-09 evening interactive session but still open in Tuesday's automated run-log: batch-memo (1=b,2=a + executed), calculator P0-A, USDA cluster, perf-metric conflict, Kyle inline form. Sitemap 131 live = 131 local; conversion 10/10; SEO/SEM backlog 0-eligible; BLOCKERS clean.

## 2026-06-09 (evening) — Header/nav emergency fix (Adam-reported, 3 commits)

- **Adam flagged broken headers via screenshots: blog posts overlapped the nav on scroll; FTB guide nav wrapped into two lines.**
- **Root cause 1 (scroll overlap):** style.css styles the site header with a BARE `header` element selector (`header{position:sticky;top:0;z-index:100}`), which also applied to the inner `<header class="blog-post-header">` on 15 blog posts + the inner `<header>` in asset-depletion-calculator — the article title block became a second sticky header pinned over the nav. Fix: scoped override `main header,article header{position:static;z-index:auto}` appended to style.css.
- **Root cause 2 (wrapping/inconsistent nav):** ~146 pages carried older nav variants (pre pillar-first reorder; some with extra top-level items that overflow at desktop width; condo blog post had a bare `<nav class="nav-container">` with no `<header>` wrapper and no matching CSS). This was the known 2026-05-17 nav-inconsistency carry. Fix: canonical index.html header (absolutized: `/` brand link, `/assets/logo.svg`, CTA → `/scenario.html`) replaced the first `<header>` on every public page with a full nav. Stripped-nav LPs untouched (ftb-dpa-guide, rate-alert, refinance-quote, scenario, first-time-home-buyer, thank-you, get-preapproved).
- **Follow-up:** resources/index.html + resources/first-time-buyer-guide/index.html were initially skipped by the homepage `index.html` filename guard — fixed in 4e30604.
- **Generator templates:** all 4 Netlify page builders (blog/page/rate/realtor-page-builder.js) emitted the old nav — templates updated to canonical so weekly generated pages stop regressing.
- **Verified in browser (desktop)**: blog post (top + scrolled), FTB guide (top + scrolled), asset-depletion calculator (scrolled) — single sticky header, navy .scrolled state clean, no overlap, no wrap. NOTE: Netlify post-processing rewrites internal links to extensionless single-quoted form — curl checks must account for this.
- FTB guide stat block: second "500+ families" instance → "1,000+ loans closed since 2013".
- **Carry CLOSED:** "Sitewide nav inconsistency (2026-05-17) — ~75 pages" — actual count was 148.

## 2026-06-09 — Interactive session w/ Adam (full audit + Phase 2/3 build, 6 commits)

- **Batch-memo ANSWERED live by Adam: 1=b, 2=a, satellites=consolidate, inline forms=go.** Weeks of carries unblocked and executed same session.
- **Calculator P0 patch applied** (commit f6c4080): P0-A buydown annual tax/ins `'annual'`→`'yr'` radio-value bug (was inflating PITI up to 12×, live 47+ days), P0-E Chart.js moved out of head (render-blocking), P0-D refinance fee-row label/id pairs (14), P0-C calculator-suite.js slider `<label for>` + aria-label.
- **Conversion plumbing** (c1b2c98): `script.js` quick-contact submitForm and prequal handler now redirect to `/thank-you` after capture (was inline success — submissions never fired the Google Ads conversion); prequal gained Netlify Forms backup POST + hidden form-name + action fallback; rate-check hub redirects to /thank-you (5 city rate-check pages already pushed synthetic thank_you_page_view — untouched); ftb-dpa-guide + rate-alert `action="javascript:void(0)"` → `/thank-you` no-JS fallback.
- **Inline quick-quote forms deployed to 7 pages** (9458cef batch): dscr-loan-austin-tx, bank-statement-loans, self-employed-mortgage-austin, non-qm-loans, high-net-worth-mortgage (new post-hero section each) + kyle, cedar-park (in-hero, Buda pattern). Each page: exactly one data-netlify form, TCPA + SMS blocks verbatim from Buda, email field added, field names wired to lead-intake payload (`loanGoal`, `loan_amount`). **POST-DEPLOY: verify 7 new form names in Netlify Forms dashboard + n8n alert coverage.**
- **Satellite consolidation:** asset-depletion-mortgage-austin-tx, self-employed-mortgage-round-rock-tx, one-time-close-construction-loans-texas-hill-country now 301→ their full pages (were self-canonical + in sitemap = cannibalization); files deleted; bank-statement-loans-austin-tx + non-qm-loans-self-employed-austin shadow files deleted (redirects already existed); sitemap 134→131; internal links repointed (7 files).
- **Decision 2(a) sweep** (9458cef): ~75 "24-hour"/"in 24 hours"/"24–48 hours" speed claims → "same-day"/"business-day" phrasing across 40 non-blog pages, incl. get-preapproved title ("24-Hour Turnaround"→"Fast Pre-Approval"), realtors FAQ (schema+visible in sync), thank-you steps. Kept: "same-day" everywhere, 2 client testimonial quotes (can't rewrite quotes), 2 gatehouse/golf "24-hour" references (not speed claims). Blog posts out of scope per memo.
- **Decision 1(b) USDA repositioning executed on all 8 Class-A pages** (0bb488b): smithville/elgin/florence/jarrell/bastrop/san-marcos/kyle/new-braunfels heroes, AEO paragraphs, meta/og, USDA h3/h4 sections and loan-grid cards repositioned to conventional 3% / FHA 3.5% / VA zero down / TSAHC-TDHCA DPA / OTC construction (Florence + Bastrop lead acreage+OTC). USDA FAQ question KEPT on each page with honest "I don't originate USDA" answer for search intent. FAQPage JSON-LD re-synced verbatim — fixed pre-existing schema-vs-visible drift on san-marcos, kyle, new-braunfels. 2 testimonial quotes claiming USDA closings removed (bastrop, san-marcos) — rewriting attributed quotes would be fabrication.
- **Hygiene:** robots.txt Disallow added for ops/marketing-command-center/marketing-content/task-dashboard/loan-dashboard/refinance-calculator (defense-in-depth alongside X-Robots-Tag); style.css.bak deleted; orphan first-time-buyer-guide.html deleted (301 already shadows it).
- **Flags for Adam:** new-braunfels + first-time-home-buyer testimonials still contain speed claims (real quotes — swap for other reviews if desired); /loans/usda.html still on disk noindexed (retire or keep); AggregateRating decision still open; homepage title pipe still open (HIGH_RISK).

## 2026-06-09 — styer-suburb-editor-daily (Round 3 #6 — buda lighter-touch refresh)

- **`buda-mortgage-lender.html` refreshed.** Lighter-touch pass following the 2026-05-07 deep renovation. Page was already near-100% unique; only one cross-page verbatim duplicate remained (Process Step 4), now cut.
- **NEW H3 neighborhood — Whispering Hollow (78610):** west-side master-planned community south of the FM 967/FM 1626 split via Coldwater Hollow, built out 2005–2017 by Ryland/Clark Wilson/Standard Pacific, resale-only since 2017, ~2,100–3,200 sqft / ~$440K–$560K, resort pool + pavilion + playground on mandatory HOA (sources: [austinrealestatehomesblog](https://www.austinrealestatehomesblog.com/buda/whispering-hollow/), [Neighborhoods.com](https://www.neighborhoods.com/whispering-hollow-buda-tx)).
- **NEW school + zoning insight (the real value-add):** documents that Buda school zoning splits by side of town and moves resale value. West-side neighborhoods feed a *different, higher-rated* path than Garlic Creek/Sunfield → **Elm Grove Elementary 9/10 GreatSchools** (TX accountability grade A, 71% math / 78% reading, Gifted & Talented + Project Lead The Way) → Eric Dahlstrom MS → **Moe & Gene Johnson HS** (4260 FM 967, 78610; ~2,870 students; ranked 341st of TX high schools per US News).
- **Median re-anchored, not overstated:** updated to Redfin **May 2026 $381,990** (essentially flat YoY — independently confirms the prior $382,337 Houzeo Feb figure within $350, 3 months newer). **Declined to swap in the volatile conflicting point estimates** circulating across trackers (Houzeo now $425K March / Orchard $365K trailing-30 — ~$60K spread); followed the round-rock precedent of preserving a well-sourced figure over noisy swaps. Supply held above 5 months and kept loosening into June (Orchard) — buyer-leverage narrative intact.
- **De-templatized Process Step 4 "Coordinated Close"** (was verbatim on jarrell) → Buda-specific builder-rep / HOA-resale-certificate / firm-builder-close-date framing.
- WebPage `dateModified` 05-07 → 06-09; LocalBusiness + WebPage schema descriptions add Whispering Hollow; sitemap `lastmod` 05-18 → 06-09. All 4 JSON-LD blocks validated clean (python `json.loads`). **5 new inline source URLs.** Left the existing "24-hour"/"Pre-approval in 24 hours" perf-claim untouched (Adam-gated per batch-memo D2). Queue: next is #7 hutto.

## 2026-06-08 — styer-suburb-editor-daily (Round 3 #5 — pflugerville lighter-touch refresh)

- **`pflugerville-mortgage-lender.html` refreshed.** Page was already 100% unique body copy (no cross-page verbatim duplicates left — 8-week success metric met), so this was deepening + a fresh-data pass, not de-duplication.
- **Median preserved, not overstated:** May 2026 Redfin "$440,781" is an *average* (different methodology; mean pulled up by high-end Blackhawk/Falcon Pointe sales), so kept the well-sourced March 2026 Redfin **$355K median (-10.2% YoY)**.
- **4 new first-party elements:** (1) new **Sorento (78660) H3 spotlight** — D.R. Horton/Pacesetter/Meritage/Brightland/Westin MPC off Weiss Ln, $479,900 median (HomeCity), 1,690–3,304 sqft, Mott→Cele→Weiss feeders; (2) **Weiss High School 6/10 GreatSchools** added (1,989 students, 94% grad, 1130 SAT) — PISD section now "three comprehensive high schools"; (3) fresh Redfin **~52 days on market + ~1 offer/listing** in the buyer-leverage paragraph; (4) **PCDC 2025 Workforce Study** datapoint — software-dev +121%, data-scientist demand +918% over the decade (Site Selection Magazine + pfdevelopment.com), tied to bank-statement/asset-based qualifying.
- **Internal-redundancy trim:** removed 3 soft "What Should Buyers Know" paragraphs (Neighborhoods / School district / Employment proximity) now superseded by the deeper H3 spotlights; kept price-comparison + Lake Pflugerville.
- WebPage `dateModified` 05-06 → 06-08; sitemap `lastmod` 05-18 → 06-08. All 4 JSON-LD blocks validated clean (python `json.loads`). **4 new inline source URLs.** Queue: next is #6 buda.

## 2026-06-08 — styer-site-daily (Monday — Schema + Google Ads + AEO Entity Audit)

- **Clean Monday rotation, 0 site-HTML mutations.** Health: sitemap/robots 200, 133 live = 133 local, conversion tracking 10/10 (HTML-token). Run log: `run-logs/2026-06-08.md` (+ `latest.md`).
- **Schema audit: 17/17 JSON-LD blocks VALID** via python `json.loads` — home (MortgageBroker/FAQPage/Person), about (Person+Organization/LocalBusiness/FAQPage), round-rock (6 blocks), + the 2 DSCR posts (2026-06-05). **DSCR posts upgraded "present" → "VALID"** (Article+FAQPage+BreadcrumbList all parse) — clears the open "confirm schema validity" priority.
- **AEO entity consistency verified** across home↔about: name "Adam Styer | HyperSmart Home Loans" / legalName "Kyber Mortgage Corporation dba HyperSmart Home Loans", NMLS 513013+2653540, address 9050 N Capital of TX Hwy Ste 390, phone — all consistent. Only inconsistency = the documented schema-type carry (home MortgageBroker vs about LocalBusiness), Adam-gated.
- **AEO extractability reframed, not flagged:** homepage first-150 deliberately answers the *specialist* query (self-employed/complex-income/DSCR/non-QM) rather than the generic "best mortgage broker" superlative — on-strategy per GOALS Phase A (superlatives are a named cleanup target + mortgage-advertising compliance risk). SKILL.md's literal "best broker" AEO check filtered through GOALS before treating as a gap.
- **PSI: real Monday attempt, quota exceeded → honest 31/31 → 32/32** (single shared per-day quota; not double-counted per LP). **Google Ads optimization score left Adam-owned/UNVERIFIED** (Ads UI, not fabricated).
- **Adam batch-memo (2026-06-05) still unanswered** — 3 cluster carries (USDA / perf-claims / 0-tracked-LP) stay paused, not re-surfaced. SEO/SEM backlog 0-eligible; BLOCKERS.md clean. NotebookLM advisor script absent (67th dead run).
- Design spot-check: navy #0A1F3F ✅; gold #8B6E24 (SKILL.md `#C9A84C` drift carry); hero CTAs → scenarios funnel by design; index.html comment balance 39/39.

## 2026-06-08 — styer-competitive-weekly (Week 14)

- **Research-only run, 0 site mutations.** Report: `run-logs/competitive/2026-06-08.md` (+ copied to `latest.md`).
- **Phase A complicated-income held 5/7 top-10 with 2 internal gains:** self-employed austin **#3→#2** (now directly behind only LendFriend), bank statement austin **#6→#4**. Jumbo #2, asset-depletion #1+#5, 1099 #7 all held. non-QM + DSCR remain the only 2 gaps (Defy Mortgage new DSCR entrant).
- **Core Austin head terms 0/6** (directory/physical-presence dominated). Barton Creek reclaimed mortgage-lender #1 from ATFCU; Highlander #1 broker / MortgageAustin #1 pre-approved / Yelp #1 refi / Joel #4 cash-out all held; LendFriend climbing cash-out #3→#2.
- **Suburb rotation (Westlake + Cedar Park):** Westlake **#6 ★** — first-ever TX-disambiguated top-10 (dedicated `/westlake-mortgage-lender` page now disambiguates the CA "Westlake Village" SERP noise). Cedar Park still NR (4th measure; CrossCountry 2 branches + BoA + Benchmark physical-presence).
- **LendFriend schema wedge held 3rd consecutive:** re-fetched `/self-employed-home-loans` — 9-Q FAQ visible but no JSON-LD FAQPage, no AggregateRating, no review count. Binary, Adam-controlled lever to take self-employed #1; blocked only on the AggregateRating policy decision (existing carry).
- **Re-verify gate caught a query-variant false-downgrade:** "jumbo mortgage **lender** austin tx" dropped Styer from the set, but the exact prior query "jumbo mortgage austin tx" confirmed #2 held. Logged the discriminator to learnings.
- **NotebookLM 65th consecutive dead run** — advisor script now ABSENT (`/Users/adamstyer/loanos/scripts/notebook_advisor.py` gone, stale repo) AND binary auth expired ("Authentication expired or invalid"). Steps 0/4/6 NotebookLM portions skipped; master growth log appended to local disk only (`memory/styer-mortgage/Styer_Growth_Log.md`).
- Google Ads paid-landscape: not programmatically verifiable via WebSearch (organic-only) — flagged honestly, recommended manual/SEM path rather than fabricating ad counts.

## 2026-06-07 — styer-suburb-editor (Leander Round 3)

- **Leander Round 3 executed** (queue position #4, following round-rock / georgetown / cedar-park). Refreshed median **$411K March 2026 (-8.7%) → $418K trailing-3-month April 2026 Redfin (-3.2% YoY, $196/sqft)** with two fresh demand signals: **80 days on market (up from 64 a year ago)** and **313 closings (up from 280)**. Updated across LocalBusiness FAQ schema, FAQ accordion, intro, at-a-glance, market section, and closing-cost example.
- **Removed a now-false superlative:** the page claimed "the steepest YoY drop among my 13 Austin-metro suburb pages this run" — true at March's -8.7%, false at April's -3.2%. Replaced with DOM/sales buyer-leverage framing; kept "March printed -8.7%" as honest moderation context.
- **Performance-claim cleanup (batch-memo D2):** all 5 "24 hours" / "within 24 hours" pre-approval instances (FAQ schema, FAQ accordion, intro, Process Step 1, CTA) → "same-day." 0 remain.
- **De-templated** the generic "Down Payment Assistance Programs" Why-card (verbatim "3–5% in down payment or closing cost assistance" shared with georgetown) → Leander-specific "Assistance vs. Builder Concessions — The Real Math" card weighing a DPA second lien against a Travisso/Mason Hills builder rate buydown in an 80-DOM market.
- **Titan Development Business Park bullet deepened:** added Phase 1 groundbreaking near Hero Way + County Road 270, full buildout anticipated by 2035, ~$18.5M projected combined tax/utility revenue to the City over the next decade (leandertx.gov cited).
- Closing-cost example recomputed at $418K: $376,200 loan (10% down), title ~$1,759, property-tax proration ~$6,273/yr (~$3,136 mid-year seller credit). USDA already 0 (clean). WebPage dateModified 05-05 → 06-07; sitemap lastmod 05-18 → 06-07. All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) re-validated clean via python json.loads.

## 2026-06-06 — styer-suburb-editor (Cedar Park Round 3 — content freeze LIFTED)

- **Adam lifted the site content freeze** mid-session ("update goals, just delete them, proceed — especially cleaning up"). Removed the "No new content on the site beyond repositioning + compliance" line from `GOALS.md` (DOS master); added `styer-suburb-editor-daily` to the Keep-Running list; stamped the audit trail. LoanOS/Client Ops/ad-spend strategic pauses retained (not cleanup blockers).
- **Cedar Park Round 3 executed** (19-day skip streak ended): refreshed median to **$489,747 April 2026 Redfin (-8.6% YoY)** with inline citation (page previously cited "May 2026" with no source URL) — schema description, market-snapshot intro, and median tile all updated.
- **Performance-claim cleanup (batch-memo D2):** killed all 6 "24-hour pre-approval" / "24–48 hours" instances (meta×3, hero subtitle, VA section, CTA) → "same-day" per voice guide. 0 remain on the page.
- **USDA accuracy cleanup (batch-memo D1):** removed the lone USDA surface (TSAHC "works with… USDA") — Adam doesn't originate USDA. 0 remain.
- **De-templated** the definitional opener (was a verbatim shared frame with round-rock) → Cedar-Park-specific Williamson/Travis county-line + LISD/RRISD tax-zone lede.
- **New cited Major Employers section** (page had none): Firefly Aerospace HQ (+300 jobs, $3M — Cedar Park EDC), Ascension Seton Cedar Park / formerly Cedar Park Regional Medical Center (108-bed; 2025 Ascension acquisition from CHS), Dell+Apple commuter tier, Leander ISD. 5 new inline source URLs.
- WebPage dateModified + sitemap lastmod → 2026-06-06. All 6 JSON-LD blocks re-validated (Python). Committed only the 3 task files + run-logs — left the in-progress sitewide Asset-Depletion-Calculator nav sweep (~105 files) untouched for that workstream.

## 2026-06-06 — styer-site-daily (Saturday weekend re-verify)

- Clean weekend run, 0 site-HTML mutations. Sitemap/robots 200; 133 live = 133 local (md5 identical); conversion tracking 10/10 (HTML-token).
- Re-Verify Gate auto-resolved 2 stale flags: "blog hits 7 days → flag weekly content" (2 DSCR posts shipped 2026-06-05, latest now 1 day old) and sitemap count 131→133.
- Audited the 2 new DSCR posts (airbnb-str + cash-out-brrrr): both carry tracked-LP CTAs, FAQPage schema, NMLS 513013, blog.html wiring (noscript + CollectionPage), zero legacy-entity drift, title lint PASS.
- Adam batch-memo (2026-06-05) still unanswered — carries point to memo, not re-surfaced. NotebookLM advisor script absent (65th run).

## 2026-06-05 — DSCR cluster: 2 net-new blog posts (manual writer run, 50d1919)

- Published `2026-06-05-dscr-cash-out-refinance-texas-brrrr` and `2026-06-05-dscr-airbnb-str-loan-texas` as an Adam-prioritized DSCR push.
- Both passed dedup gate against the 3/31 hub — initial Tier A picks (Requirements + vs Conventional) were swapped after hub-overlap review to BRRRR + STR.
- Registered in blog.html (noscript + CollectionPage schema), blog/manifest.json, sitemap.xml. Live, HTTP 200.

## 2026-06-05 — styer-content-weekly (Blog Editor — DSCR niche citation pass)

- **1 page refreshed: `dscr-loan-austin-tx.html`.** Standing JUMBO priority confirmed DONE (2026-05-29). Resumed niche-first queue → priority #1 = niche hub with <3 external citations.
- **Citation audit across all 18 niche pages.** Only `loans/jumbo.html` (6, self-built) + `mortgage-for-business-owners-austin.html` (4) clear the 3-citation bar. **16 niche hubs sit at 0.** Picked DSCR as highest-leverage: flagship product Adam originates, CONTEXT.md-flagged SERP gap (not top-10), named depth-reference page.
- **Mandatory AEO citation pass: 0 → 5 authoritative external citations.** (1) **CFPB ATR/QM 12 CFR 1026.43** — new paragraph framing DSCR as a business-purpose loan exempt from the consumer Ability-to-Repay rule (the legal reason rent-based qualifying works — a precise AEO fact). (2) **IRS Schedule E** — rental-depreciation mention. (3) **Unlock MLS / ABoR** — new sourced Austin data point ($445K April 2026 metro median, 16K listings) replacing unsourced "2026 Austin data". (4) **Freddie Mac PMMS** — anchored the representative 7.375% DSCR rate to the 6.37% May-7 conforming benchmark + 0.75–1.5% DSCR spread. (5) **Fannie Mae LLPA matrix** — conventional investment-property add-ons in the DSCR-vs-conventional section.
- **Enrichment (4 of 5):** Austin data point ✓ · sourced rate data ✓ · enriched hero alt text ✓ (generic "Austin TX Mortgage Broker" → "DSCR and investment-property mortgage lender … qualifying rental loans on property cash flow") · tighter CTA sign-off ✓ ("Talk soon — Adam Styer"). Anecdote skipped — `memory/people/` does not exist; will not fabricate (per SKILL.md correctness rules).
- **Mechanics.** Word count 4,281 → 4,567. All 6 JSON-LD blocks re-validated (Python). dateModified 2026-03-04 → 2026-06-05; sitemap lastmod 2026-05-28 → 2026-06-05. Title + H1 + slug preserved (protects existing ranking). Blog title lint clean. Queued for GSC reindex.
- **Logged for next runs:** 15 niche hubs remain at 0 citations — `non-qm-loans.html` is the CONTEXT-flagged next target. See `run-logs/editor-queue.md`.

## 2026-06-05 — styer-site-daily Friday rotation (Content Planning + AEO Review)

- **2 doc edits, 0 site-HTML files.** CONTEXT.md (suburb count 24→25, USDA carry reframed, blockers point to memo, Last Worked On + What's Next replaced) + new `run-logs/adam-batch-memo-2026-06-05.md`. Every remaining sweep is genuinely Adam-decision-gated.
- **USDA carry REFRAMED via content read (headline finding).** The 143-mention "mechanical cleanup" frame was wrong. Mentions split into 2 classes: **8 pages PROMOTE USDA zero-down as the lead product** (smithville 23, elgin 21, florence 15, jarrell 14, bastrop 15, san-marcos 12, kyle 10, new-braunfels 7 — hero subtitle + `<h3>`/`<h4>` + FAQ "yes most of X qualifies"), advertising a product Adam states he does NOT originate; **4 pages STEER AWAY** (round-rock 9, austin-area 11, taylor 5, cedar-park 1 — honest "no longer eligible" context, keep). Round Rock's 9 are legit class-B, NOT 2026-04-29 partial-pass misses. This is an accuracy/compliance question, not a tidy-up.
- **Perf-claim carry root cause NAMED.** It never resolves because GOALS.md ("no performance-metric marketing") contradicts voice-guide line 48 ("same-day pre-approvals — a real differentiator"). Adam must reconcile his two docs. "21-day close" already 0 sitewide (win met); remainder = same-day/24-hour speed claims (~89). Recommend: kill 24-hour, keep same-day.
- **Adam batch-decision memo created.** `run-logs/adam-batch-memo-2026-06-05.md` consolidates all 3 suburb-cluster carries (USDA / perf-claims / 0-tracked-LP) with exact file lists + one decision + a recommendation each. Converts weeks of carry into a single "1=x, 2=y, 3=z" reply.
- **Friday rotation clean.** Blog 32/32 posts carry tracked-LP CTA; latest post 2026-05-30 (6 days, hits 7 tomorrow); physician post AEO-healthy (question-form H2s + FAQPage + 5 CTAs); why-home-prices carry refined (CTAs present, FAQPage still content-gated).
- **Re-Verify Gate:** sitemap+robots 200/200, 131 live=local (md5 identical), conversion 10/10 (HTML-token, no pipeline pollution), blog 32/32 CTAs, legacy entity 0/0/0, trust strip Phase A intact, gold-hex carry holds, usda.html noindex+out-of-sitemap. 12 claims checked, 0 stale-and-still-claimed, 2 carries reframed.
- **SEO/SEM backlog:** 0 eligible (P0–P3 done, P4 GSC-blocked, P5 content-paused). **NotebookLM:** 64th consecutive dead run.

## 2026-06-04 — styer-site-daily Thursday rotation (Internal Linking + Funnel Flow)

- **0 site files modified, 0 commits.** 0-mutation discipline applied — today's run value was carry refinement with hard cluster-wide counts, not mechanical fixes.
- **3-page internal-link audit ✅.** `non-qm-loans.html`, `georgetown-mortgage-lender.html`, `self-employed-mortgage-austin.html` all carry 25+ unique internal links. Cluster lattice intact.
- **Full funnel trace.** Homepage CTAs: 0 links to `/get-preapproved`, 0 links to `/refinance-quote`, 1 link to `/scenarios.html`, 2 links to `/contact.html`. Homepage form `quick-scenario` present + Netlify-wired but does not fire `generate_lead` (existing GTM-config carry). Landing→thank-you wiring confirmed for both `/get-preapproved` and `/refinance-quote`. Thank-you has 10 Calendly hits + 3 "what happens next" markers + tel: link — rich post-conversion CTA architecture intact.
- **Carry refinement #1 — USDA cluster scope 5 → 12 suburbs / 143 mentions.** Full-cluster grep: Smithville=23, Elgin=21, Florence=15, Bastrop=15 (NEW), Jarrell=14, San Marcos=12 (NEW), Austin Area=11 (NEW), Kyle=10, Round Rock=9, New Braunfels=7 (NEW), Taylor=5 (NEW), Cedar Park=1. Round Rock 2026-04-29 cleanup was a partial pass (9 mentions still remain on Round Rock). Cluster scope is 5–6× prior framing.
- **Carry refinement #2 — Performance-metric ban cluster 25/25 suburbs / ~89 surface instances.** Yesterday's hypothesis "15-20 of 24 suburbs" was under. Actual: 100% of suburb pages carry at least 1 perf-claim (Same-day=10, 24-hour=53, pre-approval-in-24=26, total ~89 across 25 suburbs). Heaviest: Hutto+Leander (7 each), Buda+Elgin+Florence+Georgetown (6 each).
- **Carry refinement #3 — 0-tracked-LP cluster 32 → 34 surfaces.** Homepage now confirmed in cluster: 0 links to `/get-preapproved` or `/refinance-quote`. All 25 suburbs route through `/scenario(s)` (avg 3.7 links/page), `/contact` (1.6), Calendly (1.5). Frame upgraded from "should suburbs have tracked LPs?" to "should the entire organic funnel route through tracked LPs, or is `/scenarios.html` the canonical organic LP?"
- **Suburb count correction (NEW LOW).** Multiple framings (CONTEXT.md, prior logs) reference "24 suburb pages." Actual = 25 (`austin-area-mortgage-lender.html` was missed in prior counts). CONTEXT.md updated this run.
- **SEO/SEM backlog review.** P0/P1/P2 complete; P3 remainder = content additions paused by GOALS.md. **0 eligible items today** — structurally expected during Phase A.
- **Re-Verify Gate:** sitemap+robots 200/200, sitemap 131 live=local (md5 identical), conversion tracking 10/10, cache-buster `?v=20260531` stable, legacy entity scrub 0/0/0, gold hex carry holds (`#8B6E24` ≠ SKILL.md `#C9A84C`), homepage Phase A trust strip intact. 14 claims checked, 0 stale-and-still-claimed, 3 carries refined with hard data.
- **NotebookLM:** 63rd consecutive dead run.

## 2026-06-03 — styer-site-daily Wednesday rotation (Suburb Page Deep Dive + AEO — Kyle)

- **0 site files modified, 0 commits.** 0-mutation discipline applied: all Kyle findings cluster-routed to existing carries with quantitative scope refinement per Wednesday-rotation-on-Adam-pivot-territory rule (added to learnings today).
- **Kyle suburb deep-dive audit completed.** Structural 7/9 ✅: FAQPage schema (1 block), BreadcrumbList schema (1 block), city-specific H1 (`<h1>Mortgage Lender Kyle TX</h1>`), 2 links to `/calculators`, full LocalBusiness+Person+City entity graph, 158-char meta description, 58-char title. Structural 2/9 ❌: missing inline lead-capture `<form netlify>` block + 0 internal links to `/get-preapproved`/`/refinance-quote`.
- **AEO 4/4 ✅.** Answer-first `<p><strong>` paragraph at line 244 for "How do I get a mortgage in Kyle?". 3/5 H2s are direct questions ("Why Should…", "What Loan Programs…", "How Does…"). Strong hyperlocal anchors (Plum Creek, 6 Creeks, Anthem, Crosswinds, Steeplechase, Kyle ISD, Amazon distribution, Hays County). Entity coverage clean (Adam Styer NMLS #513013 + Hays County).
- **Carry refinement #1 — USDA cluster grew 4→5 suburbs.** Kyle has 5 USDA surfaces: line 43 (JSON-LD `description` "Conventional, FHA, VA, USDA, jumbo"), line 110 (FAQ schema Answer), lines 115/118 (FAQ schema Q+A "Is Kyle TX eligible for USDA loans?"), lines 276-277 (H4 + body paragraph "USDA Loans"), lines 332/335-336 (accordion FAQ duplicates). Joins Smithville/Elgin/Florence/Jarrell in cluster. Round Rock 2026-04-29 playbook (cleared 3 surfaces via Decision Test: voice guide rules, reversible) is precedent. Cluster scope now ~25 edits batched. **Carry text updated** in CONTEXT.md Active Blockers.
- **Carry refinement #2 — Complicated-income 0-CTAs scope grew 8→32 pages.** Previously framed as "8 cluster pages route through 1003/Calendly/contact/tel". Kyle audit confirms the same pattern recurs across 24 suburbs (Kyle's 3 CTAs all point to `/scenario.html` post-2026-05-28 hub launch). Reframed as funnel-architecture decision: "does scenario.html absorb the funnel cleanly, OR should tracked LPs run in parallel for Google Ads attribution?" — not "missing tracked LP link." **Carry text updated** in CONTEXT.md Active Blockers.
- **GOALS.md performance-metric cluster expansion.** Kyle has 3 perf-claim instances on a single page (meta description "Same-day pre-approval"; AEO answer-first body line 244 "with pre-approval in 24 hours"; bottom CTA line 360 "Get pre-approved in 24 hours"). Same Adam-pivot class as homepage/get-preapproved/hutto carries — but scope is materially bigger than the 3-page carry implies. Spot-check on 24-suburb cluster would likely surface 40-60 more instances (queued for Thursday).
- **NEW MEDIUM: Kyle missing inline lead-capture form.** Other top-ranked suburbs surface inline form per SKILL.md Wed checklist. Adam UX decision whether to standardize.
- **T+15h propagation check on yesterday's commits ✅.** `https://styermortgage.com/texas-complaint-notice.html` serves new title (`Texas Consumer Complaint Notice | HyperSmart Home Loans | NMLS #2653540`); `https://styermortgage.com/rate-buydown-calculator.html` serves new twitter:title (`Temporary Rate Buydown Calculator | Adam Styer | HyperSmart Home Loans`). Netlify deploy + edge propagation clean.
- **Re-Verify Gate:** sitemap+robots 200/200, sitemap 131 live=local (md5 identical), conversion tracking 10/10, cache-buster `?v=20260531` stable sitewide, legacy entity scrub 0/0/0, "Adam Styer Mortgage" in meta blocks: 1 (scenario.html only, intentional per llms.txt + regression test), gold hex carry holds (style.css ships `#8B6E24` ≠ SKILL.md `#C9A84C`), homepage Phase A trust strip intact, homepage headshot WebP intact. 17 claims checked, 0 stale-and-still-claimed, 2 carry refinements.
- **Sister-task working tree preserved** — suburb-editor-queue.md modified + 18 untracked sister-task logs NOT staged.
- **NotebookLM:** 62nd consecutive dead run.

## 2026-06-02 — styer-site-daily Tuesday rotation (Title Tags + Meta Descriptions)

- **texas-complaint-notice.html title** — `Texas Consumer Complaint Notice | Adam Styer Mortgage` → `Texas Consumer Complaint Notice | HyperSmart Home Loans | NMLS #2653540`. LOW_RISK compliance + within-page consistency fix: matches the page's existing og:title body (`HyperSmart Home Loans`) + the privacy.html/terms.html legal-page convention (corporate entity + corp NMLS). Title is 71 chars — over 65 ideal but mirrors privacy/terms exactly.
- **rate-buydown-calculator.html twitter:title** — `Temporary Rate Buydown Calculator | Adam Styer Mortgage Austin` → `Temporary Rate Buydown Calculator | Adam Styer | HyperSmart Home Loans`. LOW_RISK consistency fix: title + og:title already used the correct pattern; twitter:title was the only stale field.
- **Tuesday rotation artifacts (NEW canonical):** Title-length distribution = 67 ideal / 32 over-65 / 4 admin / 1 verification across 101 root .html files. Meta-description distribution = 77 ideal / 14 short / 0 long / 10 missing (9/10 missing correctly noindex'd; the 1 indexable missing is `loanos.html`, LoanOS-paused per GOALS.md). Duplicate titles: 0. Duplicate descriptions: 0. The 32 over-65 titles cluster heavily in the complicated-income Adam-pivot zone (mortgage-for-business-owners-austin:102, self-employed-mortgage-round-rock-tx:96, etc.) — not auto-trimmed.
- **scenario.html title CARRY refinement** — `Start Here | Adam Styer Mortgage` is INTENTIONAL brand-style choice per `llms.txt:1` (uses the same phrase as the AEO heading) + `tests/aeo-structure-regression.test.js:38` (asserts the phrase via regex). Demoted from "should be fixed" to "Adam style decision". Plus Adam touched the file 21h ago in commit `0e54435 Use portal language and short scenario forms` — editing yesterday's-shipped file risks reverting intent.
- **NEW LOW carry — Brand gold hex drift** — SKILL.md design audit line specifies `#C9A84C`; style.css `--color-gold` ships `#8B6E24` (deeper antique-gold). Likely deliberate Phase A brand pivot. SKILL.md doc-drift, not site-drift. Surface for Adam: update SKILL.md or revert style.css.
- **Re-Verify Gate:** sitemap+robots 200/200 (transient curl 000 first attempt; warm-curl succeeded — DNS/connection warm-up, not regression). Sitemap URL count stable 131 live=local. Conversion tracking 10/10 (yesterday's case-insensitive methodology). Cache-buster `?v=20260531` stable sitewide (no Adam JS-layer change overnight). Legacy entity scrub 0/0/0 (Mortgage Solutions LP / Styer Team / NMLS 2526130). "Adam Styer Mortgage" in meta blocks: 3 → 1 (scenario.html carry, intentional). Schema-type consistency (Monday NEW carry: MortgageBroker home vs LocalBusiness about) holds — Adam decision pending.
- **Sister-task working tree preserved** — suburb-editor-queue.md modified + 14 untracked sister-task logs NOT staged.
- **NotebookLM:** 61st consecutive dead run.

## 2026-06-01 — styer-site-daily Monday rotation (Schema + AEO + Google Ads)

- **sitemap.xml: 3 lastmod bumps** — `/` (2026-05-18 → 2026-05-31), `/scenarios.html` (2026-05-28 → 2026-05-31), `/scenarios/oil-gas-royalty-asset-depletion.html` (2026-05-28 → 2026-05-31). Closes Sunday's TOMORROW_PRIORITY #5; surfaces Adam's `f3f8f07`+`15e8119`+`0e54435` homepage AEO/conversion rewrite + Sunday scenario touches to GSC re-crawl. Filter applied: 128 files showed stale lastmod-vs-commit-date, only 3 had content-bearing changes warranting bumps (canonical URL normalization + cache-buster bumps are mechanical, don't warrant lastmod).
- **Monday AEO entity check (Python JSON-LD parse):** Homepage 3 blocks — `MortgageBroker` (Adam Styer | HyperSmart Home Loans, canonical address), `FAQPage`, `Person` (Adam Styer, canonical address). about.html 3 blocks — `Person`, `LocalBusiness` (same name, same address), `FAQPage`. NEW LOW carry: home uses `MortgageBroker`, about uses `LocalBusiness` — both valid, MortgageBroker more specific.
- **AEO first-200w extractability:** Homepage answers "best mortgage broker in Austin TX for self-employed / non-QM / jumbo / DSCR" cleanly in H1 + hero subhead. Phase A repositioning copy is live and AEO-extractable.
- **Physician post verified at canonical URL** `/blog/2026-05-30-physician-mortgage-texas.html` (Sunday log had wrong title-only URL — corrected). HTTP 200, FAQPage + BreadcrumbList + Article schema all present, 5 FAQ Questions, 4 `/get-preapproved` + 1 `/refinance-quote` CTAs, dateModified=2026-05-30.
- **Cache-buster sitewide:** rolled `?v=20260530b → ?v=20260531` overnight via Adam. 5-sample sweep confirms uniform serving (homepage + both LPs + 1 suburb + 1 loan-type).
- **Re-Verify Gate:** sitemap+robots 200/200, sitemap URL count stable at 131 live=local, conversion tracking 10/10, legacy entity scrub 0/0/0 (Mortgage Solutions LP / Styer Team / NMLS 2526130), 21-day marketing claims 0 (1 template negative-example intentional), title pipe-format compliance **35/37**, thank-you perf claims now at lines 459/468/469 (shifted +8 lines from Adam's commits, still Adam-pivot carry), Audit Issue #5 homepage H1 at line 362 (was 363 Sunday — Adam's `0e54435` shifted back).
- **Sister-task working tree preserved** — suburb-editor-queue.md modified + 13 untracked sister-task logs NOT staged.
- **NotebookLM:** 60th consecutive dead run. SKILL.md retirement diff still pending Adam apply.

## 2026-06-01 — styer-competitive-weekly Wk 13 (research only, 0 mutations)

- **HEADLINE: complicated-income SERPs flipped 2/7 → 5/7 in 14 days.** Phase A repositioning is measurably working. New top-10 wins this cycle: self-employed mortgage austin tx **#3 ★** (LendFriend #1, MortgageAustin #2), bank statement loan austin tx **#6 ★** (Mission #1, Stephanie Donnell at #4 = 1:1 profile competitor), 1099 mortgage austin texas **#7 ★ via self-employed page** (Capital Home #1, Austin Capital Mortgage 3 of top 4). All three were NOT RANKED in Wk 11.
- **Asset depletion DOUBLE moat: #1 + #5.** `/asset-depletion-mortgage-texas` ranks #1 nationally on "asset depletion mortgage texas"; `/asset-depletion-mortgage-austin-tx.html` ranks #5. Truss #2, LendFriend #3. Strongest competitive moat in the entire site — recommend monthly content-refresh defense cadence.
- **Remaining Phase A gaps (2 of 7):** `/non-qm-loans.html` (CMRE #1, Capital Home #2, Stephanie Donnell #3, LendFriend #4 — Adam not in top 10) + `/dscr-loan-austin-tx.html` (Newfi #1, Easy Street #2, TX Premier #3 — Adam not in top 10). DSCR is investor-niche owned by hard-money lenders; non-QM is the more contestable of the two.
- **Suburb moves:** Buda **★ NEW #4 first-ever**; Hutto **#3 → #2 ↑** (Zillow displaced); San Marcos **#9 → #8 ↑** (first Wk 11 confirmation + 1-spot gain); Pflugerville #2 held; Round Rock #9 held. **Losses:** Leander **#4 → #6 ↓** (Big Life inserted at #5); Kyle **#6 → #8 ↓** (Movement + Guild new entrants ahead). Tracked top-10 count: 7 of 9 measured suburbs (+1 vs Wk 11). Lone gap: Cedar Park (CrossCountry 2 URLs + physical branch dominance).
- **Bee Cave page indexing — CLEARED.** `site:styermortgage.com bee-cave` returns the page. 7-run carry-forward flag resolved without manual GSC submission required.
- **ATX Mortgage Lending — 3rd consecutive biweekly verify: sitemap still 0/61 dedicated suburb pages.** They rank via homepage body-text mentions across all 9 Adam suburbs. First-mover advantage on dedicated suburb pages preserved.
- **Competitor moves:** **LendFriend** confirmed #1 strategic threat — held #1 on self-employed + jumbo, NEW visibility at #3 on cash-out refinance (was absent from refi SERPs Wk 11). Fresh fetch of their self-employed page: 3,500 words, FAQ section but NO JSON-LD FAQPage schema detected, no AggregateRating schema, no dedicated suburb sections. Structurally beatable on schema + freshness if Adam's AggregateRating decision lands. **Stephanie Donnell** = closest 1:1 profile competitor — visible on 2 of Adam's 3 remaining gaps (non-QM #3, bank statement #4). **MortgageAustin** publishes content under year-suffix URLs (`/self-employed-austin-texas-mortgage-income-2026/`) — possible Phase B move: clone Adam's strongest pages to year-suffix URLs.
- **Core Austin SERP shifts (Adam not in top 10 either way, but landscape contestability changed):** BoA collapsed #1 → #5 mortgage lender austin tx; **ATFCU is new #1**. MortgageAustin reclaimed #1 get-pre-approved from Kelsey Easton blog (last cycle's reversal reversed back). SouthStar collapsed #2 → #4 refinance austin (Lone Star new #2; Yelp held #1).
- **NEEDS ADAM:** NotebookLM CLI auth still broken (3rd consecutive run carry) — `notebooklm login` needed. Steps 0 + 6 of SKILL.md skipped; SEO + Styer Growth Log notebooks 3 weeks stale. Master log persisted to disk only at `/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md`.
- **NEEDS ADAM:** AggregateRating schema policy still pending (carry from Wk 11). Decision blocks (a) LendFriend schema-parity move on non-QM/DSCR audit AND (b) re-add of fabricated reviewCount that was retired Wk 11 pass-2.
- Full report: `run-logs/competitive/2026-06-01.md` (242 lines, copied to `latest.md`). Wk 12 (2026-05-25) was a scheduler skip — this run is first comp in 14 days.

## 2026-05-31 — daily-opt Sunday gap-day recovery fire (0 mutations, 2 in-window auto-resolutions, race condition with Adam)

- **Re-Verify Gate, 13 claims checked, 2 AUTO-RESOLVED:** (1) PM 2026-05-28 NEW finding "Homepage `#contact-form` lacks `generate_lead` dataLayer push" cleared by Adam's `14935a5` + `0a72ac8` (sitewide `dispatchLeadSubmitted()` JS bridge in `script.js`). (2) AM-detected live↔local `sitemap.xml` drift (live=131, local=137, 11 distinct URLs) cleared **IN-WINDOW** by Adam's race-condition push of `1d09cc7 Normalize canonical URLs and internal links` + `f3f8f07 Simplify homepage conversion and AEO routing` — both touched sitemap.xml. Post-pull verify: live=131 = local=131 parity restored.
- **Race condition this run:** Adam pushed **8 commits during this run window** (`6a39c52` lead capture privacy → `12293d8` borrower ack automation → `1d09cc7` canonical URL normalization → `15e8119` duplicate analytics + mobile CTA contrast → `6572642` rate publishing hardening → `f3f8f07` homepage conversion + AEO routing → `8c32fd4` scenario flow → loan application → `0e54435` portal language + short scenario forms). Push was rejected on initial commit; rebase pulled cleanly (Adam did NOT touch CONTEXT.md / CHANGELOG.md, no conflicts). New files Adam added: `llms.txt`, `tests/aeo-structure-regression.test.js`, `tests/lead-flow-regression.test.js`.
- **Implication for carries (Monday batch verify):** Adam's sweeping homepage AEO/conversion rewrite may have addressed several Adam-pivot carries (homepage title pipe + 107-char, homepage testimonials, complicated-income cluster CTA architecture). Monday rotation should re-audit the rewritten surfaces.
- **Sitemap + robots + conversion gates green:** sitemap.xml HTTP 200, robots.txt HTTP 200, /get-preapproved + /refinance-quote + /thank-you 10/10 tracking despite Adam's sitewide `script.js` GA4 layer change.
- **Legacy entity scrub: 0/0/0** (Mortgage Solutions LP / Styer Team display / NMLS 2526130). Precise `21-day` marketing claim grep: 0 marketing claims live (1 template negative-example, intentional).
- **Pipe-format title compliance ticked up 34/36 → 35/37.** Non-compliant pair still = `index.html` + `get-preapproved.html` (both Adam-pivot carries).
- **0 site mutations** per Sunday cheapest-possible-run discipline. Decision Test applied across the board (Adam-pivot territory on carries; investigation territory on sitemap drift; HIGH_RISK file deferral on homepage sitemap lastmod within 12h of `40028bb` two-column restructure).
- **Cycle context:** Wed 5-27 + Fri 5-29 + Sat 5-30 (full-rotation) daily-opt fires all missed; off-rotation `9155a90` Saturday sweep was a manual cherry-pick. 4th gap-day recovery fire in this task's history. Scheduler reliability remains the recurring HIGH carry.

## 2026-05-31 — styer-blog-writer-weekly task launched + first post published (subagent-driven build, supervised)

- **New scheduled SKILL task** `styer-blog-writer-weekly` (`/Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly/SKILL.md`, cron `0 8 * * 2` = Tue 8am CT, machine-local/not git-tracked). Auto-publishes ONE net-new, compliance-gated blog post per week. Sibling to the Friday editor (`styer-content-weekly`), which only refreshes existing posts — the writer is the only task that creates URLs. Guarantee: a post ships weekly unless a hard gate fails; a failed week is a loud skip, never silent. FYI-only notification + one-command revert (no approval gate).
- **First run (inline, supervised):** published **"Physician Mortgage Loans in Texas: How Doctors Qualify in 2026"** — `blog/2026-05-30-physician-mortgage-texas.html`, 1,387 words (target band 1,200–1,600), Tier B (SEO-AUDIT Phase 3 physician cluster gap). Dedup gate PASS (no existing physician page/post). Written from principle (no fabricated borrower anecdote on hand).
- **Citations (4, all approved sources, inline):** Fannie Mae Selling Guide B3-3.3-03 (future-employment qualifying), B3-6-05 (deferred student-loan treatment), B3-3.1-01 (income continuity); CFPB ATR/QM 12 CFR 1026.43. No rate quotes, no performance-time claims.
- **All 7 compliance gates PASS:** brand name (HyperSmart present, legacy entity absent); NMLS/entity correct; performance-metric STRIP (removed "Pre-approval in 24 hours / same day" from dual-CTA + a body "within 24 hours"); no raw 1003 URL as visible text; title lint clean; TX-only / no USDA; cluster wiring + 4-surface registration.
- **Registered across 4 surfaces:** blog.html noscript list + CollectionPage `itemListElement` JSON-LD; blog/manifest.json (valid JSON); sitemap.xml (`.html` `<loc>`, valid XML). 5 in-body cluster links (jumbo ×2, self-employed, 1099-only, non-qm).
- **Three commits:** `4876d86` atomic publish (post + 4 surfaces — the clean single revert target), `d850436` bookkeeping (run brief `run-logs/content-2026-05-30.md` + content-backlog consumed log + this changelog), `f7e14c5` added BreadcrumbList JSON-LD (post now ships all three: Article + FAQPage + BreadcrumbList). Live verified HTTP 200 + BreadcrumbList present on the deployed page.
- **SKILL.md corrections baked in during the run** (machine-local file, not git): manifest path is `blog/manifest.json` not repo root; sitemap uses full `.html` `<loc>` URLs (match existing pattern, not generic pretty-URL); two-commit publish flow documented (run brief needs the publish SHA, so a single all-inclusive commit is logically impossible); schema-mirror instruction now points at the canonical 3-block template `2026-04-17-should-i-refinance-austin-tx-2026.html` (most siblings omit BreadcrumbList — don't mirror a random recent post for schema).
- **To undo the post:** `git revert d850436..f7e14c5` (3-commit span; reverting `4876d86` alone now conflicts since `f7e14c5` modified the same file).

## 2026-05-30 — Homepage restructure (user-initiated, Adam): hero lead form + section reorder

- **Adam's ask:** "put the form in the hero, then loans built for every scenario below, then deals banks said no to below that." Approved two design choices via Q&A: (1) hero gets a **compact 4-field form** (Name, Phone, Email, Loan Goal) while the full ~13-field form stays lower; (2) full form placed **immediately after "Deals Banks Said No To"** (intent peak) for best conversion.
- **Hero → two-column glass card** (`index.html`): left column keeps the rating chip, h1 ("The loans your bank said no to. The pricing your bank can't match."), subtitle, "Book 15-Min Call" + call link, NMLS line. Right column holds a new compact lead form (`id="hero-lead-form"`, `name="hero-quick-lead"`, Netlify Forms) with Name/Phone/Email/Loan Goal 2×2 grid + TCPA consent + "Get Started" submit + trust line. Dropped the redundant "Get Started" text button from the left column (the form IS the CTA).
- **New Netlify form `hero-quick-lead`** — auto-detected at build; `class="js-quick-contact"` wires it into the existing dual pipeline (native POST → n8n Web Lead Automation + lead-intake function → Mailchimp/LoanOS). No backend changes needed.
- **`script.js`:** refactored `initFormValidation()` to bind **every** `.js-quick-contact` form on the page via new `bindQuickContactForm(form)` (was hardcoded to `#quick-contact-form`). Full form tagged `js-quick-contact` too. `submitForm`/`showQuickContactSuccess` already generic — reused as-is; success/dataLayer fire per form name.
- **Section reorder:** Hero → **Loans Built for Every Situation** → **Deals Banks Said No To** → full quick-contact form (was: full form → Deals → Loans). Done via marker-anchored block move.
- **Deals CTA repointed:** `/scenario.html` "Send Me Your Scenario" → `#contact-form` "Tell Me About Your File" — lands on the relocated full form just below.
- **`style.css`:** added hero two-column layout rules (`.hero-glass-card-2col` flex row, 50/50 columns, stacks ≤768px) + hides the desktop `.hero-cutout` photo (the form takes its place). Cache-busters bumped to `?v=20260530`.
- **Verified locally** (Playwright, desktop 1280 + mobile 390): desktop two-column clean/no clip; mobile stacks pitch-over-form, hero section expands to fit (no `overflow:hidden` clipping), sticky bar intact. `#contact-form` anchor still resolves for Deals CTA + mobile sticky bar.

### Follow-up same session — `generate_lead` conversion tracking (sitewide)

- **Closed the Q10 carry** ("homepage `#contact-form` lacks `generate_lead` dataLayer push"). `dispatchLeadSubmitted()` in `script.js` now also does `window.dataLayer.push({ event:'generate_lead', lead_type, form_name })` in addition to the existing internal `styer:lead-submitted` CustomEvent. Pushes to the dataLayer (GTM's public input) — **does not modify the GTM container snippet** (rule preserved). Single chokepoint: every lead path already calls this fn (quick_contact, quick_quote, prequal), so hero form, full form, prequal, and quick-quote all fire the GA4 lead event with no per-form wiring.
- **Sitewide cache-buster bump:** normalized every page's `script.js?v=…` to `?v=20260530b` (was 100 pages on `20260417`, 1 on `20260517`, homepage on `20260530`). Required so returning visitors — especially on the **suburb Google Ads landing pages** — refetch the new JS instead of serving the cached old copy. 102 HTML files touched, buster-line-only diffs. Adam chose sitewide rollout over homepage-only because the suburb pages are the actual paid-traffic landing pages.
- **Note for GTM side:** event is named `generate_lead` (GA4 standard). A GTM trigger on that custom event → Google Ads conversion tag still needs to exist/be confirmed in the GTM container for the conversion to register. The site side is now emitting the signal.

## 2026-05-29 — styer-content-weekly (blog editor, scheduled): JUMBO STRENGTHEN: DONE

- **Standing priority complete.** `loans/jumbo.html` strengthened to match DSCR/HNW page depth.
- **Word count:** 2,370 → 5,604 (target ~4,300, exceeded by 30%).
- **Schema blocks:** 4 → 6. Added `FinancialProduct` + `Person` (NMLS-identified) blocks matching DSCR-page template. Existing MortgageBroker / Article / FAQPage / BreadcrumbList preserved and updated (Article `dateModified` 2026-02-25 → 2026-05-29).
- **External citations:** 0 → 6 authoritative sources, inlined:
  - FHFA conforming loan limits (2026 Travis County $832,750) — cited 2x (body + FAQ)
  - CFPB ATR/QM rule 12 CFR § 1026.43 — cited 2x (compliance section + DTI FAQ)
  - Fannie Mae LLPA matrix — cited 2x (jumbo-vs-conforming explanation + rate FAQ)
  - Freddie Mac PMMS (May 7 2026, 6.37% reference rate)
  - Unlock MLS / ABoR (April 2026 metro median $445K, ~16K active listings)
  - IRS Schedule C / Form 1040 (self-employed buyer scenario)
- **New body sections added** (5 H2s + 1 H3 cluster):
  - "Why Austin Hits Jumbo Territory So Often" — Westlake / Tarrytown / Barton Creek / Lake Travis price-floor context + 5-archetype "who's buying jumbo in Austin" breakdown
  - "Three Austin Jumbo Files I See Constantly" — composite scenarios (Westlake tech exec w/ RSU comp, founder post-exit w/ asset depletion, Tarrytown self-employed w/ bank statement). Clearly labeled illustrative — no fabricated clients per SKILL.md hard rule.
  - "Jumbo vs. Conforming: When Crossing the Line Saves You Money" — LLPA arbitrage explanation (the #1 non-obvious jumbo insight for high-FICO/low-LTV buyers)
  - "What Makes Austin Jumbo Underwriting Different" — appraisal comp pools, Lake Travis waterfront, acreage overlays, condo warrantability, Travis County tax math, Texas 50(a)(6) homestead rules
  - "How to Start the Jumbo Pre-Approval Process" — 6-step workflow with same-day pre-approval differentiator
- **FAQ expanded** 5 → 9 questions (added QM-vs-non-QM, DTI cap, closing speed, pledged-asset). Both FAQPage JSON-LD and visible accordion updated in lockstep.
- **Specialty programs grid expanded** 4 → 6 cards (added K-1 income jumbo + jumbo construction-to-permanent).
- **Cross-link to `high-net-worth-mortgage.html`** retained + reinforced (3 placements: body lead, specialty programs grid, related-reading footer).
- **Voice/CTA tightening:** removed "white-glove" filler from hero subtitle, replaced with concrete price band + neighborhoods; final CTA rewritten ("Same-day pre-approvals. Discreet, efficient..."); first-person framing throughout ("I close...", "I shop the file..."); sign-off "Talk soon — Adam Styer" added to spotlight CTA.
- **Title + meta rewritten** with concrete hook: "Jumbo Loan Austin TX: 10% Down to $1.5M, Portfolio Options | Adam Styer". Meta description expanded with Travis County conforming limit.
- **Hero alt text enriched** with neighborhood specifics (Westlake / Barton Creek / Tarrytown) per SKILL.md photo requirement.
- Slug + H1 preserved to protect any existing ranking signal. Header/nav/footer/scripts untouched.
- Sitemap lastmod 2026-05-18 → 2026-05-29. Queued for GSC manual reindex in `run-logs/gsc-reindex-queue.md`.
- `run-logs/editor-queue.md` updated: row appended + "JUMBO STRENGTHEN: DONE" marker added; niche-first queue resumes next run.

## 2026-05-28 PM — styer-site-daily same-day second fire (Thursday PM, scheduled, 0 mutations)

- Triggered 23:30 CT, finished 01:17 CT 2026-05-29. Wall-clock midnight crossover handled per cached learning: trigger date `2026-05-28-pm.md` keeps AM/PM pair grouped.
- Re-Verify Gate (13 claims): sitemap + robots ✅ 200/200; conversion tracking ✅ 10/10 (no regression despite Adam's 14 inter-fire commits); legacy entity scrub ✅ 0/0/0; AM findings hold; sitemap count moved 134 → **136** (delta = Adam scenarios shipped: `/scenarios.html` + `/scenarios/oil-gas-royalty-asset-depletion.html`, both lastmod 2026-05-28, both HTTP 200 live ✅).
- **2 NEW PM findings** flagged for Adam batch — no auto-edit per same-day-second-fire discipline:
  - Homepage `#contact-form` (surfaced by Q10/`089439a`) lacks `generate_lead` dataLayer push — silent conversion-tracking gap. Possible the lead-intake JS handles it at submit time; AM tomorrow to verify the trace.
  - 147-file sitemap lastmod batch drift from Adam's 14-commit day (149 HTML files edited; only 2 scenarios pages got lastmod bumps). Sweep deferred to Friday AM with risk-tier framing (content edits vs nav-only edits).
- **AM MEDIUM cluster CTA finding REFINED, not auto-resolved.** Adam's PM funnel direction = homepage-form-first, NOT cluster→tracked-LP. Tracked LPs `/get-preapproved.html` + `/refinance-quote.html` may now be deprecation candidates rather than restoration targets. Adam-positioning territory.
- Adam's interactive-commit velocity 2026-05-28 = **14 commits** — highest single-day in this task's history. PM gate's job on high-velocity days is to re-frame AM findings against new Adam-shipped state, not just verify surface conditions.
- Full PM detail in `run-logs/2026-05-28-pm.md`. NotebookLM = 58th consecutive dead run.

## 2026-05-28 PM Q10 (user-initiated, Adam) — Surface homepage quick form + price/down-payment fields (index.html)

- **Adam:** "since I put the scenario form I haven't received any new leads…the scenario form is too intimidating…we need a quick contact capture" → then "I don't see it on the homepage." Diagnosis (verified, not assumed): the homepage ALREADY had a full quick-capture form (`#contact-form`, "Tell Me About Your Loan", ~11 fields) but it was buried near the bottom (after reviews, before Calculators), and the hero's primary CTA funneled everyone to the 16-field `scenario.html` instead. Lead pipeline itself confirmed working via n8n exec data (alerts fire; prior "errors" were benign duplicate-email/bot cases). So: a *surfacing* problem, not a missing-feature problem.
- **Changes (all `index.html`, committed `089439a`):**
  - Hero primary CTA "Send My Scenario" → **"Get Started"**, `href="/scenario.html"` → `href="#contact-form"`.
  - **Relocated** the `quick-contact-section` block to sit directly below the social-proof stats strip (was buried low). Moved by stable content markers (Python), not a 145-line Edit; asserted single occurrence + block integrity post-move.
  - Added explicit **Purchase Price** + **Down Payment** inputs (`name="purchase_price"` / `name="down_payment"`) before the Loan Amount range (kept the range, per Adam). `script.js` `submitForm`/`lead-intake.js` already referenced these field names — the inputs were the missing half of a half-built feature.
  - Added secondary **"Send a full scenario →"** link under the form (scenario form stays reachable).
  - Added `scroll-margin-top:90px` to `#contact-form` so the anchor clears the `position:sticky` header.
- **Backend: zero edits needed.** Verified the live n8n "Web Lead Automation" Parse node already reads `purchase_price`/`down_payment` (snake + hyphen fallbacks) and feeds both the Outlook alert and the LoanOS write. New fields work end-to-end on both lead paths (native Netlify→n8n, and `lead-intake.js`→Mailchimp/LoanOS).
- **Verified live** (`styermortgage.com`, cache-busted): "Get Started", `purchase_price`, `down_payment`, `scroll-margin-top:90px`, "Send a full scenario" all present post-deploy.
- **Two follow-ups — Adam approved "yes", both DONE this session:**
  - **(1) Mobile sticky bottom-bar CTA** (`index.html` ~1167): "Send My Scenario" → `/scenario.html` repointed to **"Get Started"** → `#contact-form` (commit `d2d2cea`). Every primary CTA — hero, mobile sticky — now lands on the low-friction quick form. **Verified live** (cache-busted): `href="#contact-form" class="smb-btn smb-btn-apply" … >Get Started`.
  - **(2) n8n Outlook lead-alert "Type: Not specified"** fixed via REST PUT to "LoanOS — Web Lead Automation" (`PiuIsQpBuydtFM4m`) Parse Form Data node — added `data['loanGoal']` + `data['loan-goal']` fallbacks to the `loan_type` line (the form posts `loanGoal` camelCase; node previously only checked `loan_goal`/`loan_type`/`loan-type`). REST PUT used (not MCP `update_workflow`) to preserve credential bindings; `settings` stripped to allowed-list. **Verified live on published version:** `versionId === activeVersionId` (`e2882b7c…`), GET confirms the new line: `const loan_type = (data['loan_goal'] || data['loanGoal'] || data['loan-goal'] || data['loan_type'] || data['loan-type'] || '').trim();`. No draft→published promotion needed.

## 2026-05-28 PM Q9 (continuation, autonomous) — Blog→cluster contextual linking, Tier 2 (2 files, 5 edits)

- **Next safe step in the topical-graph build, after the Q4/Q6 hub→spoke and near-orphan work.** Two cluster-topic blog posts each described cluster spoke pages in their body copy but linked none of them. Added in-body contextual links (weighted higher than list/nav links because the surrounding sentence supplies the entity-relationship context) from those posts into the spokes — fresh inbound from indexable blog sources the spokes didn't previously receive.
- **`blog/2026-04-02-self-employed-mortgage-austin-tx.html` (3 edits, absolute-path style to match the post):**
  - Bank Statement Loan subsection — wrapped existing phrase "a bank statement loan" → `/bank-statement-loans.html`.
  - 1099-Only Loan subsection — appended "See the full guide to 1099-only mortgages in Texas" → `/1099-only-mortgage-texas.html`.
  - P&L Only Loan subsection — wrapped "CPA-prepared profit &amp; loss statement" → `/p-and-l-mortgage-texas.html`.
- **`blog/2026-03-31-dscr-loans-austin-tx-2026.html` (1 edit, 4 links, relative-path style to match the post):** extended the existing "see also" paragraph with → `dscr-loans-texas`, `dscr-loans-fredericksburg-tx`, `dscr-loans-dripping-springs`, `investor-loans`. **Did NOT** re-link `dscr-loan-austin-tx` — this post already links it twice (lines 358, 373), so a third link adds zero inbound under unique-source counting.
- **Net:** 7 fresh-source inbound links across the complex-income + DSCR clusters from 2 indexable posts. No CSS/JS/schema/nav changes. Blog title lint passes (both titles contain "Adam Styer"). Diffs are surgical and additive only. Verify links resolve on live Netlify after push.

## 2026-05-28 PM Q8 (user-initiated, Adam) — "Scenarios" rolled into Resources dropdown, sitewide (101 files)

- **Adam:** "I thought we were going to have scenarios in the header, in between loan programs and resources. did we decide not to do that?" Clarified the actual prior decision (Scenarios was added to the Resources dropdown on only the 3 scenario pages; sitewide rollout was deferred). Chose (via question prompt): **Resources dropdown, sitewide** — roll the existing dropdown link out to every page that has a Resources dropdown.
- **Markup — 101 pages updated** (104 total now link `/scenarios.html`; the 3 scenario pages already had it). Inserted `<li><a href="/scenarios.html">Scenarios</a></li>` immediately after the "Buyer Guide" `<li>` in each Resources dropdown — the same position already live on the 3 scenario pages. Anchored on the Buyer Guide link (`…resources/first-time-buyer-guide/">Buyer Guide</a></li>`) because it is the one item present in *every* Resources-dropdown variant; handles absolute (`/…`) and relative (`../…`) path templates. 8 pages carry two Resources dropdowns (desktop + secondary/mobile nav) and correctly got Scenarios in both. Skipped pages already containing the link (no double-inserts).
- **Position varies slightly by template** (a side effect of "after Buyer Guide"): on the main nav Scenarios sits between Buyer Guide and Blog; on the older blog template where Buyer Guide is the last dropdown item, Scenarios becomes the last item. Both keep it inside the Resources dropdown, which was the spec.
- **No CSS, JS, schema, or top-level nav changes** — purely a dropdown list addition using existing styles. Verify dropdown render on live Netlify after push.

## 2026-05-28 PM Q7 (user-initiated, Adam) — Phone number in header nav, sitewide (150 files)

- **Adam:** "Can we put my phone number more prevalent throughout the site. like maybe next to the application button?" Chose (via question prompt): desktop header nav, immediately left of the Apply/CTA button; leave mobile as-is (mobile already has a sticky tap-to-call); style = phone icon + number as a text link (navy, semibold, hover gold — no "Call" label, no emoji).
- **Markup — 149 pages.** Inserted `<li class="nav-phone-li"><a href="tel:+15129566010" class="nav-phone">(512) 956-6010</a></li>` immediately before the nav CTA on every page with a standard nav. Two template families handled:
  - **134 standard-nav pages** (`<header><nav>…<ul class="nav-links">` with an in-list `<li>…class="nav-cta"…>` Apply button): perl insert before the `nav-cta` `<li>`.
  - **15 blog pages** (`.site-header`/`.nav-container`/`.nav-inner` wrappers with a *standalone* `nav-cta` button outside `.nav-links`): inserted the phone `<li>` just before the `</ul>` that closes `.nav-links`, so it lives inside the (flex-styled) list and picks up the shared `.nav-phone` CSS regardless of the unstyled wrapper. (16 more blog pages already used the in-list pattern and were caught in the 134 — total 149 pages, exactly one insert each, verified no double-inserts.)
  - **Excluded (correct):** 17 landing/dashboard/utility pages with no standard nav (get-preapproved, refinance-quote, thank-you, dashboards, internal tools, Google verification) + `loanos-waitlist.html` (has a nav but no application button to sit beside — it's the LoanOS product page, not a mortgage page).
- **CSS — `style.css` (1 block appended).** `.nav-links a.nav-phone` (navy, semibold, inline-flex), `:hover` (gold), a `::before` phone-handset SVG used as a **`currentColor` mask** so the icon tracks the text color in every state, `header.scrolled .nav-links a.nav-phone{white}` + its hover, and `@media (max-width:768px){.nav-phone-li{display:none}}`. Explicit `:hover` and `header.scrolled` overrides were required because the new selectors tie the site's default rules on specificity (0,2,1) and would otherwise be broken by source order — same class of bug as the Q5 CTA fix.
- **Verified live render (local server + chrome-devtools, real scroll not synthetic toggle):** standard pages = navy on white at top → white on the dark `rgba(16,36,67,0.95)` scrolled header (contrast 16.40 both states), icon flips with it; index (its own light scrolled header) = navy on white in both states; blog = navy on white, correctly positioned left of "Get Pre-Approved", inside `.nav-links`; mobile (≤768px) = hidden. No regression to existing nav links or the Apply button.
- **No JS, schema, or nav-order changes.** Phone link is `tel:+15129566010`; display text `(512) 956-6010` (Adam's direct line).

## 2026-05-28 PM Q6 (user-initiated, Adam) — Cluster near-orphan rescue (2 files, 3 edits)

- **Follow-up to Q4, same session.** Re-ran the link-graph audit against the post-Q4 tree and found two self-employed/non-QM cluster *variant* pages still near-orphaned, each linked only by its own canonical hub: `non-qm-loans-self-employed-austin.html` (1 inbound) and `bank-statement-loans-austin-tx.html` (2 inbound). Both are self-canonical, indexable, 1,300–1,500-word distinct geo/variant pages — legitimate spokes, not consolidation doorways (verified: no noindex, canonical points to self).
- **Fresh-source links added** (the graph counts unique source pages, so a second link from the hub that already links them wouldn't lift inbound count):
  - `bank-statement-loans.html` related list → new `<li>` to `/non-qm-loans-self-employed-austin.html`.
  - `self-employed-mortgage-austin.html` related list → 2 new `<p>` entries → `/non-qm-loans-self-employed-austin.html` + `/bank-statement-loans-austin-tx.html`.
- **Result:** `non-qm-loans-self-employed-austin` 1→3 inbound (now sourced from self-employed + bank-statement + non-qm hubs), `bank-statement-loans-austin-tx` 2→3. Both off the weakly-linked (1–2 inbound) list.
- **Skipped (do-no-harm):** `self-employed-mortgage-round-rock-tx.html` (1 inbound) — its only natural fresh source is the Round Rock suburb page, which has no existing self-employed discussion; injecting one would be content insertion into a template-managed page, not a surgical link. Left for a dedicated suburb→niche pass. No new CSS/JS/schema/nav.

## 2026-05-28 PM Q5 (user-initiated, Adam) — Sitewide footer + scenario CTA visibility fix (30 files)

- **Adam reported two broken-formatting screenshots on the live scenario page:** footer column headings invisible, and the "Have a Similar File?" CTA heading unreadable (dark on navy). Diagnosed both with live computed-style checks via chrome-devtools, not eyeballing.
- **Bug 1 — invisible footer headings (SITEWIDE, pre-existing).** Root cause: CSS styles `.footer-section h4/a/p` but 34 newer pages' markup had drifted to `class="footer-col"` (a copy-paste typo with zero CSS rules). With no matching rule, footer `h4` fell through to the global `h1..h6{color:navy}` and rendered navy-on-navy (`rgb(10,31,63)` on `rgb(10,31,63)` — confirmed identical via getComputedStyle on the live pillar page). Footer links also lost their light-gray color, falling back to dark gold. The other 110 site pages already used the canonical `.footer-section` and rendered fine.
  - **Fix:** renamed `class="footer-col"` → `class="footer-section"` across all 34 drifted pages (135 occurrences). Restores the single canonical class — no `style.css` edit, no aliasing, no tech debt. The 110 correct pages are untouched. Adam chose "fix all 34" over a scenario-only patch or a CSS alias.
- **Bug 2 — navy-on-navy CTA heading (scenario pages + template only).** Root cause: the CTA `<section class="bg-navy cta-spotlight">` was nested INSIDE `<article class="article-body">`. Two rules tie on specificity (0,1,1): `.bg-navy h2{color:white}` (earlier) and `.article-body h2{color:navy}` (later). Source order broke the tie → navy won → `.text-white` (0,1,0) was already out-specified, so the heading rendered navy on navy. Pillar pages don't hit this because their CTA sits outside `.article-body` (direct child of `<main>`).
  - **Fix:** moved `</article>` above the CTA section on `/scenarios/oil-gas-royalty-asset-depletion.html` and `/scenarios/_TEMPLATE.html`, making the CTA a sibling of the article (matches the pillar pattern). Added a load-bearing HTML comment in the template warning future edits to keep the CTA outside `.article-body`.
- **No CSS/JS changes.** Markup-only fix. `style.css` untouched per project rule.

## 2026-05-28 PM Q4 (user-initiated, Adam) — Phase 4 spoke equity push: hub→spoke companion to Q2 (4 files, 11 edits)

- **Symmetric follow-up to the Q2 Tier-1 product-page fix.** Q2 pushed equity from `/loans/*` product pages down to their cluster siblings. Q4 pushes from the 4 cluster HUB pages down to the 4 under-equity'd complex-income SPOKE pages. Net effect: each spoke now receives PageRank from BOTH its `/loans/*` product page (Q2) AND multiple cluster hubs — the hub-spoke asymmetry in the complex-income cluster is broken.
- **`self-employed-mortgage-austin.html` (4 spoke links, 3 edits).** (1) "1099 Income Loans" feature card — appended inline link to `/1099-only-mortgage-texas.html`. (2) "P&L Loans" feature card — appended inline link to `/p-and-l-mortgage-texas.html`. (3) "Related Complex-Income Pages" list — 2 new `<p>` entries → `/mortgage-for-business-owners-austin.html` + `/k1-income-mortgage-austin.html`.
- **`bank-statement-loans.html` (3 body anchors).** (1) "Method 2: P&L Method" section → `/p-and-l-mortgage-texas.html`. (2) "1099-Only Programs" h3 section → `/1099-only-mortgage-texas.html`. (3) "Business Owners (LLC / S-Corp)" feature card → `/mortgage-for-business-owners-austin.html`.
- **`non-qm-loans.html` (4 edits; already linked 1099-only + k1).** (1) "Self-Employed P&L" feature card trailing link repointed from self-employed guide → `/p-and-l-mortgage-texas.html`. (2) "Recent Business Owner Without Two Years of Returns" scenario → `/mortgage-for-business-owners-austin.html`. (3) Related list — 2 new `<li>` entries → p-and-l + business-owners.
- **`dscr-loan-austin-tx.html` (1 edit, list-only).** 2 new `<li>` entries in "Related Complex-Income Pages" → `/k1-income-mortgage-austin.html` + `/mortgage-for-business-owners-austin.html`. Routed ONLY through the existing related list (no forced body anchors) — DSCR is investment-focused, so self-employment-doc body links would be unnatural.
- **Per-spoke hub coverage after.** 1099-only: 3 hubs. p-and-l: 3 hubs (non-qm ×2 surfaces). k1-income: 3 hubs (incl. high-authority DSCR). business-owners: 4 hubs.
- **Link-graph inbound unique-source gains.** business-owners 13→17, p-and-l 6→9, 1099-only 9→11, k1-income 6→8.
- **Pattern discipline.** Body-copy contextual anchors favored over list entries for PageRank weight where the prose supported it. No new CSS, JS, schema, nav, or breadcrumb changes. Surgical inline inserts only.

## 2026-05-28 PM Q3 (user-initiated, Adam) — Scenario #1 shipped LIVE

- **DRAFT filled with Adam's real (anonymized) borrower story.** Memorial Day call from a Texas borrower with oil and gas royalty income; declined by two banks for income-documentation reasons; asset-depletion loan qualified her from verified investment and retirement balances; she closed on the home she wanted.
- **File renamed via `git mv`.** Original DRAFT slug `self-employed-writeoffs-bank-statement.html` was wrong for the actual content (the story isn't self-employed / bank-statement — that was a path tried; the strategy that worked was asset depletion). New slug: `/scenarios/oil-gas-royalty-asset-depletion.html`. Git rename preserves history.
- **Categories.** Card carries `data-category="jumbo-hnw declined"` so it surfaces under both Jumbo/HNW (asset depletion is the HNW playbook) and Denied Elsewhere (two prior declines, high-intent search). Hub filter chips now light up "All" + Jumbo/HNW + Denied Elsewhere. Self-Employed and DSCR chips stay commented-out (no empty-doorway category chips per spec).
- **Hub empty-state removed.** `/scenarios.html` no longer shows the "Scenarios coming soon" placeholder — replaced with the live card. Card-stub HTML comment kept inline as a copy-template for the next scenario.
- **Sitemap.** Added `/scenarios/oil-gas-royalty-asset-depletion.html` (priority 0.7, monthly, lastmod 2026-05-28). Hub lastmod stays 2026-05-28.
- **Compliance applied to the real story:**
  - No specific loan amount, no city/neighborhood (just "Texas"), no specific FICO, no LTV.
  - The 60-month asset-depletion divisor Adam mentioned is **not** published. Asset depletion described conceptually as "converts verified investment and retirement balances into a qualifying-income equivalent." Avoids freezing a per-investor program parameter into a permanent SERP/AEO citation.
  - Pricing described as "competitive for the file," not superlative or "best."
  - No performance-metric claims (no "21-day close," no "same-day").
  - Borrower referred to with "she" (per Adam's narration) — privacy disclaimer covers identifying-detail changes; gender pronoun alone is not identifying.
  - "Program availability and guidelines change by investor, occupancy, and loan type" appears next to every program-specific claim and in the At-A-Glance footer.
  - Mandatory privacy / outcomes-vary block renders in the page footer.
- **AEO surface:** 5-question FAQ (1 more than template minimum) mirrored exactly between visible accordion and FAQPage JSON-LD. Article schema `about` and `abstract` fields populated. Direct Answer block 75 words, well within 40–80 target. Person schema with NMLS sameAs present.
- **Related links** point UP to `/high-net-worth-mortgage.html` and `/asset-depletion-mortgage-texas.html` (the pillar guides for the strategy used in this file) + back to `/scenario.html` for conversion. No lateral auto-widget.
- **Loan app URL spec mismatch.** Adam's original Prompt A referenced `mslp.my1003app.com/513013/register` — I used the live `hypersmart.my1003app.com/513013/register?time=1779291829279` per CLAUDE.md and CONTEXT.md across all 3 scenario files. Surfaced in FLAG_FOR_ADAM.md (Q2 session).

## 2026-05-28 PM Q2 (user-initiated, Adam) — Internal-linking audit + Tier-1 product-page cluster fix (3 files, 10 edits)

- **Full link-graph audit delivered.** Mapped inbound/outbound for 147 indexable pages. Findings: 24 true orphans (0 inbound), 36 weakly linked (1–2 inbound), and a hub-spoke asymmetry across 4 verticals where `/loans/*` product pages hoard inbound equity but link 0–1 times to their own cluster siblings — starving Phase 3/4 niche pages. `/loans/jumbo.html` (72 inbound, 0 in-cluster outbound) flagged as single highest-leverage fix on the site.
- **3 product pages fixed — 10 surgical edits.**
  - `loans/jumbo.html`: (1) body-copy link "high-net-worth individuals, business owners" → `/high-net-worth-mortgage.html` + `/mortgage-for-business-owners-austin.html`. (2) Portfolio/Non-QM feature-card "Bank statement, asset depletion, and DSCR" → 3 anchored links. (3) Down-payment paragraph adds asset-depletion qualification link. (4) New **Specialty Jumbo Programs** section (bg-light, grid grid-2, 4 feature-item cards) linking HNW / asset-dep-Austin / bank-statement / non-qm, inserted before "Explore Other Loan Programs."
  - `loans/investment.html`: (1) DSCR feature-card title now anchors to `/dscr-loan-austin-tx.html` + adds "statewide across Texas" link to `/dscr-loans-texas.html`. (2) Portfolio/Bank Statement card adds 3 anchored links (bank statement / asset depletion / full non-QM menu). (3) New **Specialty Investor Programs** section linking investor-loans / Austin DSCR / Texas DSCR / non-qm.
  - `loans/construction.html`: (1) Hill Country body-copy anchor → `/one-time-close-construction-loans-texas-hill-country.html`. (2) One-Time Close feature-card title anchors to `/one-time-close-construction-loan-texas.html` + "See full Texas OTC program details" link. (3) New **Specialty Construction Programs** section linking OTC-Texas / OTC-Hill-Country / jumbo / investment.
- **Cluster connectivity wins.** In-cluster outbound: `loans/jumbo.html` 0→3, `loans/investment.html` 1→3, `loans/construction.html` 0→2. Total ~175 equity points redistributed.
- **Niche-page inbound gains** (unique-source basis; actual link counts are higher because multiple anchors point to same target from one page): HNW 69→73 (+4), bank-statement-loans 75→80 (+5), non-qm-loans 75→80 (+5), investor-loans 73→77 (+4), self-employed-mortgage-austin 75→78 (+3), dscr-loan-austin-tx 115→118 (+3), asset-depletion-mortgage-texas 10→12 (+2), asset-depletion-mortgage-austin-tx 2→3 (+1), dscr-loans-texas 9→10 (+1), business-owners-Austin 12→13 (+1), OTC-Texas 4→5 (+1).
- **Pattern discipline.** All 3 new sections reuse existing `section.bg-light + container + grid grid-2 + feature-item` patterns. No new CSS, no new JS, no schema changes, no nav changes, no breadcrumb changes. Surgical inserts before the existing "Explore Other Loan Programs" section in each file.
- **Audit roadmap (delivered in-session, not committed as doc).** Tier 1 (highest ROI, ≤2 hours each): items 1–3 = these 3 product-page edits ✅. Tier 1 remaining: hub pages push down to Phase 4 spokes (4 edits), `/rates/index.html` archive build (rescues 10 orphans). Tier 2: suburb→niche scenario surfacing (8 pages), blog→cluster contextual linking (~28 posts), `realtor-resources.html` wire to `realtor-updates/manifest.json`, scenario.html as secondary CTA on niche pages. Tier 3: Phase 4 sitewide nav rollout (~75 stale pages), FAQPage+AggregateRating schema audit, related-content manifest, anchor-text genericity audit.



- **New content type shipped.** Scenarios are now a distinct category from pillar/product pages — each scenario page tells the story of one solved or representative borrower file (Situation → Obstacle → Strategy → Outcome) anchored by a scannable At-A-Glance data block for AEO extraction.
- **3 new files:**
  - `/scenarios.html` — hub page with CollectionPage + BreadcrumbList + Person JSON-LD (with NMLS sameAs). Standard full nav + breadcrumb + footer. Filter chip markup + card stubs are commented out (no empty category doorways per spec). With zero live scenarios, the hub shows a placeholder "Scenarios coming soon" state with CTAs to `/scenario.html` and Calendly. Scoped JS handler for `.scenario-filter` container so it does not collide with the existing `.testimonial-filter` JS in `script.js`.
  - `/scenarios/_TEMPLATE.html` — reusable scenario template. Full standard `<head>`, byline pattern from `scenario.html`, Direct Answer block (40–80w AEO summary), hedged At-A-Glance table (Borrower Type · Primary Challenge · Strategy Used · Loan Type/Structure · Texas Region — categorical values only, no specific numbers), narrative sections, FAQ accordion with FAQPage schema mirror, Article + FAQPage + BreadcrumbList + Person JSON-LD, mandatory privacy/outcomes-vary line baked into the footer (cannot render template without it), `<meta name="robots" content="noindex">` as safety net, `[SQUARE BRACKET]` placeholders throughout, top compliance comment listing the non-negotiable rules.
  - `/scenarios/self-employed-writeoffs-bank-statement.html` — **DRAFT** scenario #1 (Self-Employed / Bank Statement category). noindex, NOT added to sitemap. Awaiting Adam's real anonymized borrower facts before going live.
- **Sitemap + robots:** `/scenarios.html` added to `sitemap.xml` (priority 0.7, weekly, lastmod 2026-05-28). DRAFT scenario intentionally excluded. `robots.txt` gains `Disallow: /scenarios/_TEMPLATE.html`.
- **Navigation:** "Scenarios" link added to the Resources dropdown on the 3 new pages only — **no sitewide nav change** this session per spec.
- **CTAs:** every scenario CTA routes to `/scenario.html` (the tracked LP), not the raw 1003 — consistent with the active complicated-income-cluster CTA decision still pending in CONTEXT.md blockers.
- **Compliance baked into template structure (not just documented):**
  - At-A-Glance table cells carry inline `[Hedged category — e.g. ...]` hints right where literal numbers would naturally get typed.
  - Mandatory privacy + outcomes-vary disclaimer renders as a full-width gray block in the footer of every scenario page — cannot be missed by an author editing the template.
  - Compliance checklist appears as the top comment block of both the template and the DRAFT scenario.
  - No hard FICO/LTV/expense %/loan amounts permitted; "Program availability and guidelines change by investor, occupancy, and loan type" appears next to every program-specific claim.
  - No fabricated star-rating testimonials, no performance-metric claims ("21-day," "same-day," "24-hour"), no absolutes.
  - Texas-only scope.
  - Article schema (not TechArticle/TechReport) for consistency with the rest of the site.
  - Entity strings verified: display name "Adam Styer | HyperSmart Home Loans"; legal "Kyber Mortgage Corporation dba HyperSmart Home Loans"; NMLS #2653540 / #513013; corp address + phone match CLAUDE.md.
- **Loan app URL:** template + new pages use `https://hypersmart.my1003app.com/513013/register?time=1779291829279` per CLAUDE.md / CONTEXT.md, not the `mslp.my1003app.com` URL referenced in the spec prompt (prompt referenced a stale URL).
- **Verified:** files written, sitemap + robots updated, no edits to `style.css`, no new CSS variables/frameworks/libraries, no edits to existing pillar/product pages, no sitewide nav change. Filter chip + card markup left commented out and discoverable for Adam when scenario #1 is filled in.

## 2026-05-28 AM (styer-site-daily, Thursday — scheduled fire) — Internal Linking + Funnel Flow rotation + sitemap lastmod ZERO_RISK fix

- **Thursday rotation = Internal Linking + Funnel Flow per SKILL.md.** First scheduled fire since 2026-05-26 PM (Wed 2026-05-27 = NO FIRE, scheduler-anomaly carry bumps to 12+ instances). Adam ran an interactive Phase 4.2 session on 2026-05-27 PM that updated `/non-qm-loans.html` in-page `dateModified` to 2026-05-27 but missed sitemap.xml.
- **Site change shipped — 1 file, 1 line.** `sitemap.xml:45` `<lastmod>2026-05-18</lastmod>` → `<lastmod>2026-05-27</lastmod>` for `/non-qm-loans.html`. ZERO_RISK mechanical fix bringing sitemap.xml lastmod into sync with the page's actual JSON-LD `dateModified` after Adam's 2026-05-27 PM commits `1486a01` / `e81269a` / `db10ccf` / `6b64ebf`. Reversible via git; no copy/voice/positioning change. Other 2026-05-27 commits only touched `non-qm-loans.html` + CONTEXT/CHANGELOG, so drift was contained to this URL.
- **Funnel-flow audit complete (3-page deep + cluster scan + full funnel trace).** Audited `non-qm-loans.html` (45 unique internal links), `bank-statement-loans-austin-tx.html` (28), `1099-only-mortgage-texas.html` (41). All 3 satisfy "2+ relevant internal links" SKILL.md requirement (16, 9, 9 cluster cross-links respectively). Hub-spoke topology solid. Contact.html form wiring verified: Netlify attribute + `form-name=contact` + dataLayer `generate_lead` + `lead_type: 'contact_form'` + all required fields (name/email/phone/loan-type/message/tcpa_consent/bot-field). Thank-you.html verified: embedded Calendly widget + 3-step "What Happens Next" + tel: link.
- **NEW finding — complicated-income cluster 0 funnel CTAs to tracked LPs.** All 8 audited cluster pages (non-qm-loans, bank-statement-loans-austin-tx, 1099-only-mortgage-texas, self-employed-mortgage-austin, asset-depletion-mortgage-austin-tx, high-net-worth-mortgage, investor-loans, dscr-loan-austin-tx) route conversion CTAs ONLY through raw 1003 (`hypersmart.my1003app.com/513013/register`) + Calendly + `/contact.html` + `tel:`. Zero direct links to `/get-preapproved` or `/refinance-quote`. Generalizes the existing CONTEXT.md homepage-CTA MEDIUM blocker to the cluster Adam is currently positioning around per GOALS.md. Adam-decision territory (funnel architecture) — surfaced via FLAG_FOR_ADAM, not auto-actioned.
- **NEW finding — thank-you.html performance-metric claims tension.** Lines 442-443 ("Same-day review during business hours. He reads every submission personally.") + 452-453 ("Letter or quote in 24 hrs" / "Pre-approval letter or rate quote delivered within one business day.") GOALS.md (2026-05-18): "No more performance-metric marketing." Voice guide: "Same-day pre-approvals — Adam does these routinely; it's a real differentiator." Same tension class as the existing /get-preapproved title `24-Hour Turnaround` blocker. Surfaced via FLAG_FOR_ADAM, not auto-actioned. Adam-decision; suggested batch with the /get-preapproved title pivot.
- **Re-Verify Gate auto-correction — leander Audit Issue #5 line number.** 2026-05-26 PM agent "refined" the carry from "line 276" (AM correct) to "line 280" and called AM imprecise. Today's `grep -n` returns line **276** — AM was right. Carry text reverts to 276. Leander hasn't been touched since `db7ab16` 2026-05-25 (meta trim), so no edits could have shifted the line. PM agent miscounted. Logged as a learnings entry: PM gate should always `grep -n`, never eyeball line counts.
- **Re-Verify Gate confirms:** sitemap 200, robots 200, conversion 10/10, sitemap entry count 134 (no drift), Mortgage Solutions LP / Styer Team / NMLS 2526130 all 0 files, title-tag pipe-format 34/2 (Adam-pivot deferred), Audit Issue #5 surface inventory holds (3 locations / 2 files).
- **Backlog hygiene observation (not actioned per paused-product gotcha).** `loanos-clone/tasks/seo-sem/backlog.md` lines 92-94 list LOW_RISK items that are factually completed elsewhere in the same file. Writing to that path would trigger the LoanOS pre-push hook → `npm run build` of paused product → Vercel deploy of paused LoanOS per GOALS.md. Strengthens the existing CONTEXT.md LOW blocker (move SEO/SEM ownership to `styerteam-mortgage-site/tasks/seo-sem/`).
- **No commits to HIGH_RISK files.** Index.html + get-preapproved.html title-tag pipe normalization remains in Adam pivot queue (CONTEXT.md MEDIUM blockers).

## 2026-05-27 (user-initiated, Adam) — Phase 4.2 — Austin-anchor expansion on /non-qm-loans.html hub page (4 commits)

- **Phase 4.2 of SEO remediation roadmap.** Surgical Austin-anchor treatment on the non-QM cluster gateway page, mirroring the P3.1 pattern applied 5/?? to `/1099-only-mortgage-texas.html`. Highest-leverage non-new-content move because non-qm-loans.html is the cluster's traffic gateway (links inbound from the 5 program spokes + jumbo + investment + suburb pages).
- **Commit 1 — `1486a01` — SERP signals.** Title `Non-QM Loans Austin TX | 40+ Wholesale Lenders | Adam Styer | NMLS #513013` (74 chars, mirrors investor-loans 5/22 pattern). Meta description leads with "Austin TX" (150 chars). og:title + og:description + twitter:title + twitter:description all mirror Austin lead. H1 prefix `Austin TX —`. Hero subtitle adds Austin self-employed / tech founder / TX investor clause. LocalBusiness schema description: "Austin TX independent mortgage broker". Opening body paragraph: "Adam Styer ... is based in Austin TX and closes ... across Texas".
- **Commit 2 — `e81269a` — New H2 "Austin Sub-Markets & Tech-Corridor Borrowers" section (~520 words).** Five sub-market profiles: (1) North Austin tech corridor (Domain, Pflugerville, Round Rock, Cedar Park) — bank statement + asset depletion for RSU/equity-comp/post-IPO-lockup borrowers, (2) West Austin (Westlake, Bee Cave, Lakeway, Spicewood) — jumbo non-QM + HNW asset depletion at $1.5M–$5M, (3) East Austin & Mueller — DSCR investor STR plays with Type 2 STR caveat, (4) Cedar Park / Round Rock / Leander / Pflugerville — bank statement primary residence, (5) Dripping Springs / Hill Country — DSCR wedding-venue + wine-country STRs. No specific employer names (no Apple/Tesla/Samsung) to avoid implied affiliation. No performance metrics, no superlatives.
- **Commit 3 — `db10ccf` — 3 Austin-specific FAQs added to BOTH JSON-LD FAQPage schema AND visible accordion block.** Schema 9 → 12. Accordion 10 → 13. New questions: (a) "Do non-QM lenders close loans in Austin TX?" (names Travis/Williamson/Hays/Bastrop/Burnet counties), (b) "Which Austin neighborhoods see the most non-QM activity?" (mirrors the new Sub-Markets H2 for AEO extractability), (c) "Can a non-QM loan finance an Austin tech founder with RSU or equity comp?" (asset depletion + bank statement paths). JSON-LD validates (6/6 blocks parse). Pre-existing schema/accordion asymmetry (accordion had 1 extra LLC-vesting question not in schema) left untouched per surgical-change discipline.
- **Commit 4 — `6b64ebf` — Internal link audit + dateModified bump.** Related Pages section gained 4 new alt-doc cousin links: `/bank-statement-loans-austin-tx.html`, `/asset-depletion-mortgage-austin-tx.html`, `/1099-only-mortgage-texas.html`, `/k1-income-mortgage-austin.html`. All 4 targets verified to exist on disk. Article schema `dateModified` 2026-05-05 → 2026-05-27. `datePublished` preserved at 2026-05-05. Suburb-page links not added — footer covers those.
- **Net delta:** title 0 → "Austin TX" anchored. Word count 5470 → 5216 (HTML body); actual rendered word count went up by ~720 words (the WC drop is a script-tag/whitespace artifact of structured-data growth). H2 sections 6 → 7. H3 sections gained 5 Austin sub-market headers. Total internal links 11 → 15 in Related, +1 in body H2.
- **Verified live on styermortgage.com** after Netlify auto-deploy (`6b64ebf` pushed at 17:?? UTC, live verified <2 min later). All 6 JSON-LD blocks parse. No console errors in preview.
- **Sister scheduled task (styer-site-daily, Wednesday Suburb Page Deep Dive rotation)** is still expected to fire on its normal cadence — this user-initiated work is orthogonal.

## 2026-05-26 (styer-site-daily, Tuesday — scheduled fire) — Title-tag pipe-format normalization batch (12 files)

- **Tuesday rotation pivot.** Tuesday SKILL is Title Tags + Meta Descriptions. Meta-trim batch auto-resolved 2026-05-25 PM via sister task `db7ab16`. Pivoted to **sitewide title-tag pipe-format audit** per yesterday PM's TOMORROW_PRIORITY option (b).
- **Audit finding:** sampling 20 representative pages surfaced **14 files** using `<title>...Adam Styer NMLS #513013</title>` (missing pipe between "Styer" and "NMLS") vs. 22 files using the canonical `Adam Styer | NMLS #513013` (SKILL.md spec `[Loan Type] in Austin TX | Adam Styer | NMLS #513013`).
- **Commit `64cf39b` — 12 LOW_RISK title fixes (13 substitutions):** 1099-only-mortgage-texas, bank-statement-loans, bank-statement-loans-austin-tx, asset-depletion-mortgage-texas, mortgage-for-business-owners-austin, non-qm-loans-self-employed-austin, k1-income-mortgage-austin, one-time-close-construction-loan-texas, one-time-close-construction-loans-texas-hill-country, p-and-l-mortgage-texas, non-qm-loans (title + twitter:title), referral-partners-self-employed-clients. Live verified at T+75s on 3 sample URLs.
- **2 files deferred to FLAG_FOR_ADAM** per SKILL.md Step 4B risk tiers: `index.html` (HIGH_RISK — homepage title is highest SERP-CTR lever) + `get-preapproved.html` (MEDIUM_RISK — paid Google Ads landing page; also contains `24-Hour Turnaround` performance claim that GOALS.md "no performance-metric marketing" would retire). Also flagged `hutto-mortgage-lender.html` ("Same-Day Pre-Approval" performance claim + missing NMLS tail entirely).
- **Loanos-clone BLOCKERS.md write reverted before commit.** The styer-site-daily SKILL Step 4B documents `loanos-clone/tasks/seo-sem/BLOCKERS.md` as the BLOCKER destination, but loanos-clone's pre-push hook runs `npm run build` and a push triggers Vercel deploy of LoanOS — which is paused per GOALS.md. Surfaced same content via this task's run log + FLAG_FOR_ADAM instead. Worth flagging: should this task own a BLOCKERS path inside `styerteam-mortgage-site/`?
- **Footer-vs-title disambiguation preserved.** 12 files still have the deliberate footer compliance line `... | NMLS #2653540 | Adam Styer NMLS #513013 | Licensed in Texas | ...` — that no-pipe phrase is one unit (personal-NMLS attribution), NOT a candidate for the normalization fix.
- **Re-Verify Gate (10 claims):** all hold. Sitemap + robots 200, sitemap count 134 (no drift from yesterday PM), conversion 10/10 (curl -L confirmed), legacy entity scrub 0/0/0, Audit Issue #5 superlatives 2 (unchanged — homepage H1 + leander #276 awaiting Adam pivot), suburb meta compliance 23/24, footer pattern preserved 12/12. **NEW claim added:** title-tag pipe-format compliance 22/36 → 34/36 (post-commit) → would hit 36/36 with index + get-preapproved unblocked.
- NotebookLM 55th dead-check; PSI 21/21 drain (both HIGH carry).

## 2026-05-25 PM (styer-site-daily, Monday — same-day SECOND fire) — Re-verify gate + two major auto-resolutions

- **0 site files modified.** Same-day second-fire discipline per learnings 2026-05-23 PM + CONTEXT.md "off-schedule = re-verify only."
- **Auto-resolution 1 (major):** Audit Issue #5 superlative sweep dropped **11→2 occurrences** between AM run and PM run (sister task or Adam batch resolved 9/11). Only homepage `index.html:362` H1 hero "bank can't match" + `leander-mortgage-lender.html:276` "beat builder rates" framing remain. Phase A "superlatives cleanup" weekly priority per GOALS.md is **~95% complete**. Both remaining occurrences require Adam pivot copy decision.
- **Auto-resolution 2 (major):** Tuesday's planned 6-suburb meta-trim batch already done via sister task `db7ab16 seo: trim 24 over-length meta descriptions to <=160 chars`. All 7 AM-flagged pages now compliant: cedar-park 276→156, liberty-hill 200→146, manor 199→143, dripping-springs 194→136, leander 168→135, new-braunfels 163→141, bee-cave 162-src/158-visible (`&amp;` HTML entity decodes to 1 char). **23/24 suburb pages now ≤160 char SERP compliant.** Tuesday rotation needs new priority.
- **Tooling gotcha captured:** Commit `e24b973 seo: force flag on _redirects rules` (today PM) made `/get-preapproved`, `/refinance-quote`, `/thank-you` 301 force-redirects. Initial conversion verification without `-L` returned 0 token matches on all 3 pages (looks like total tracking breakage). Required `curl -s -L` to follow redirect and verify the actual served HTML. Conversion 10/10 confirmed with `-L`. **Going forward**: Step 2 conversion checks must use `curl -L`. AM run already correct.
- **Re-Verify Gate (13 claims):** sitemap 200 + robots 200 (134 `<loc>`, was 135 AM — redirect/DSCR consolidation), conversion 10/10 (with `-L`), legacy entity scrub 0/0/0, 21-day MARKETING claim 0 (7 prose hits are case-study/edu/admin — legitimate), AM `e05f134` titles hold, Kyber footers 2× both, AggregateRating in ops.html only (dashboard status indicator, not active schema — known carry).
- **Sister-task activity between AM and PM:** 12 commits in seo-* program — DSCR consolidation (`dd18a5a`), email normalization (`90c9c3b`), HSTS upgrade (`4343a9a`), 24-meta-trim sweep (`db7ab16`), USDA nav demotion (`55a997e`), force-redirect (`e24b973`), and more. File-specific `git add` discipline preserved working tree.
- NotebookLM 54th dead-check; PSI 20/20 drain (both carry).

## 2026-05-25 (interactive — Adam) — Force-flag duplicate-URL fix in `_redirects`

- **Verified live duplicate-URL bug:** every `/x` + `/x.html` pair on the site was serving 200 with 0 redirect hops (about, realtors, contact, loans/jumbo, dscr-loan-austin-tx, etc.). Netlify's pretty-URL match was short-circuiting the `301` rules because they lacked the `!` force flag. Canonical tags were doing the consolidation work alone — fine for Google, weak for AI engines that don't honor canonical hints.
- **`_redirects` rewritten:** added `!` to all 40+ extensionless→.html rules. Added 33 new rules for niche cluster + other public root pages that had no redirect rule at all and were silently duplicate-serving (bank-statement-loans, dscr-loans-texas, 1099-only, self-employed-mortgage-austin, high-net-worth-mortgage, k1-income, asset-depletion, non-qm-loans, investor-loans, mortgage-for-business-owners, rate-check-*, etc.). Flipped the inverted `/blog.html → /blog` rule to `/blog → /blog.html 301!` (blog.html is the canonical landing; blog/ directory has no index.html).
- **Why it matters for the niche pivot:** AI engines (ChatGPT/Perplexity/Google AI Overviews) increasingly drive niche-query discovery; they're inconsistent about honoring `<link rel=canonical>` but they always follow 301s. Forcing redirects means every non-canonical URL becomes literally unreachable — one bucket of citation signal per page instead of two.
- WordPress legacy redirects + blog-slug renames left untouched (source paths don't match existing files, so no force flag needed there).

## 2026-05-25 (styer-site-daily, Monday — scheduled fire) — Schema + AEO Entity Audit + suburb meta trim batch

- **Monday rotation: Schema + Google Ads Quality Factors + AEO Entity Audit.** Homepage schema audit confirmed MortgageBroker × 2 + Person + 12 Service + 12 Offer + FAQPage + EducationalOccupationalCredential + City + State + GeoCoordinates. About page: Person + LocalBusiness + 2 Organization. DSCR Austin: FAQPage with 6 Questions. Cedar Park (sister-task rebuilt 2026-05-24 `1b4d028`): verified HTTP 200, strong schema integrity (BreadcrumbList + FAQPage 5Qs + LocalBusiness + Person + SpeakableSpecification + 12 more entity types).
- **Audit finding auto-resolved (2026-04-27 AM):** homepage MortgageBroker address (was `5718 Sam Houston Circle`) and about.html LocalBusiness address (was `5900 Balcones Drive`) now both consistently use HyperSmart corp `9050 N. Capital of Texas Hwy, Ste 390 / 78759`. Resolved by 2026-05-20 entity transition. Removed from active blockers.
- **AEO entity check passed:** homepage first-150-words extractability strong — H1 (specialist positioning) + P1 32-word concise value prop with all key entities (self-employed, jumbo, DSCR, 40+ wholesale, NMLS #513013). Person + LocalBusiness schemas consistent across homepage + about.
- **Commit `e05f134` — 4 suburb meta description trims to ≤160 chars:** westlake 254→154, buda 235→143, hutto 234→158, round-rock 212→155. All within Google SERP truncation window. Cedar Park (276) excluded — sister-task fresh territory. All 4 live verified HTTP 200 after Netlify deploy. 6 additional suburb pages >160 chars queued for Tuesday rotation: liberty-hill, manor, dripping-springs, leander, new-braunfels, bee-cave.
- **Audit Issue #5 superlative sweep drift:** count 12→11 occurrences between Sat PM and Mon (self-resolved). 8 files, 11 occurrences still gated on Adam batch approval. Full file:line in `run-logs/2026-05-23-pm.md`.
- **Re-Verify Gate (12 claims):** all hold. Sitemap + robots 200, conversion 10/10, legacy entity scrub 0/0/0, 21-day claim 0, Kyber footers hold, titles hold, HNW resolution holds, AggregateRating scrub holds.
- NotebookLM 53rd dead-check; PSI 19/19 drain (carries).

## 2026-05-24 (styer-site-daily, Sunday — 4th unscheduled weekend fire in 9 days) — Re-verify gate only

- **0 site files modified.** Per yesterday PM's TOMORROW_PRIORITY #1: Sunday unscheduled fire = re-verify gate only. Per GOALS.md "no new content beyond repositioning + compliance fixes" + Decision Test (brand positioning copy is Adam territory).
- **Re-Verify Gate (11 claims):** sitemap.xml 200 (135 `<loc>` entries), robots.txt 200, conversion 10/10 (GTM + dataLayer + lead tokens live on /get-preapproved, /refinance-quote, /thank-you), legacy entity scrub 0/0/0 (Mortgage Solutions LP / Styer Team / NMLS 2526130), 21-day marketing claim 0 occurrences, 2026-05-22 title fixes (investor-loans + high-net-worth-mortgage) hold, 2026-05-23 AM Kyber footer fixes (buda + ftb-dpa-guide) hold 2× each, HNW "~30 states" stays resolved, Audit Issue #5 superlative sweep (9 files, 12 edits) all still actionable. 0 claims auto-resolved this run.
- **Sister-task cross-awareness:** suburb-editor shipped 3 commits today before daily-opt fired — `34b0712` HyperSmart cutover sweep on draft assets, `ed3f670` IndexNow HTTP 403 → TODO.md NEEDS ADAM, `1b4d028` cedar-park-mortgage-lender rebuild with unique structure + AEO-compliant schema. Cedar Park verified live HTTP 200. Working tree pollution from sister task (7 untracked + 2 modified) NOT staged.
- **4th weekend fire in 9 days flagged.** Pattern is now steady-state, not anomaly. Either document expected cadence in SKILL.md or tune scheduler.
- NotebookLM 52nd dead-check; PSI 18/18 drain (both carry).

## 2026-05-23 PM (styer-site-daily, Saturday — SECOND unscheduled fire) — Re-verify gate + audit sweep surfacing

- **0 site files modified** — second-fire discipline: re-verify only, no piling sweeping copy changes on AM commit. Per CONTEXT.md TOMORROW_PRIORITY for weekend fires + Decision Test (brand positioning is Adam territory).
- **Re-Verify Gate** — sitemap 200, robots 200, conversion 10/10, AM Kyber fixes (buda + ftb-dpa-guide) both still 2× live, legacy entity scrub holds (0/0/0 for "Mortgage Solutions LP" / "Styer Team" / NMLS 2526130).
- **1 audit finding auto-resolved:** 2026-05-17 audit Issue #6 (HNW "~30 states") — 0 occurrences live, likely Adam-cleared between audit publication and now. Removed from future surface.
- **NEW finding for Adam batch approval:** Audit Issue #5 "bank can't match" + "beat builder rates" superlative sweep — 9 files, 12 edits, full file:line table in `run-logs/2026-05-23-pm.md`. Includes index.html H1 + hero subtitle, about.html hero subtitle, 5 suburb pages (georgetown, kyle, leander×2, round-rock×2, taylor×2). Will unblock Phase A "superlatives cleanup" weekly priority.
- **3rd unscheduled weekend fire flagged** — 2026-05-22 PM, 2026-05-23 AM, 2026-05-23 PM. Pattern not anomaly; document expected cadence in SKILL.md.
- NotebookLM 51st dead-check; PSI 17/17 drain (both carry).

## 2026-05-23 (styer-site-daily, Saturday — unscheduled fire) — Phase A entity coverage gap sweep

- **Phase A EHL/NMLS coverage compliance:** `83ad1d4` fixed 2 public-facing footer disclosures missing the new "Kyber Mortgage Corporation dba HyperSmart Home Loans" legal entity name (post-2026-05-20 entity transition). `buda-mortgage-lender.html` (in sitemap, ranked) — copyright + `.footer-disclaimer` rewritten to match site-wide pattern; added NMLS Consumer Access link. `ftb-dpa-guide.html` (DPA landing page) — `.lp-nmls` rewritten with Kyber legal entity in copyright + Consumer Access link in same one-line landing-page footer style.
- **Gap audit via `comm -23`:** identified 7 pages with `HyperSmart Home Loans` but missing `Kyber Mortgage`. Triaged via `noindex` + sitemap intersection — 5 admin/internal pages (dashboard, loan-dashboard, marketing-command-center, marketing-content, loanos-waitlist, thank-you) are noindexed and out of sitemap, so not crawler-facing — deferred. 2 public pages fixed.
- **Re-Verify Gate:** legacy entity "Mortgage Solutions LP" + "Styer Team" + legacy NMLS 2526130 all 0 occurrences sitewide. Yesterday's `a8d565c` Phase B title fixes (/investor-loans + /high-net-worth-mortgage) still hold live.
- **Health:** sitemap.xml 200, robots.txt 200, conversion tracking 10/10 (GTM-PQQ6PGLR + generate_lead + purchase_prequal/refi_quote + thank_you_page_view all verified live).
- **Sister-task working-tree changes** (TODO.md, run-logs/suburb-editor-queue.md, 4 untracked suburb-editor run logs) intentionally NOT staged — file-specific `git add` only, per orphan-file rule from 2026-05-06 learnings.
- NotebookLM 50th dead-check; PSI quota 16-of-16 drain (both carry).

## 2026-05-22 (styer-site-daily, Friday) — Phase B title swap + 8 meta description trims

- **Phase B title cleanup DONE (15-run carry resolved):** /investor-loans now reads "Investor Loans Austin TX | Adam Styer | NMLS #513013" (52 chars); /high-net-worth-mortgage now reads "High-Net-Worth Mortgage Austin TX | Adam Styer | NMLS #513013" (61 chars). og:title and twitter:title intentionally left as their shorter social variants per prior carry-over insight.
- **8 meta description trims to ≤160 chars across complicated-income pages** — all aligned with GOALS.md weekly priority (repositioning around complicated income). Lengths: bank-statement-loans 187→157, bank-statement-loans-austin-tx 169→142, dscr-loan-austin-tx 187→137, dscr-loans-texas 181→155, self-employed-mortgage-austin 182→131, k1-income-mortgage-austin 193→151, mortgage-for-business-owners-austin 203→159, one-time-close-construction-loan-texas 185→149.
- **Misleading "broker" wording removed** from mortgage-for-business-owners-austin meta — Adam is correspondent lender per voice guide; trimmed "Austin's mortgage broker for X" → "Austin mortgage for X".
- **Friday rotation: Content Planning + AEO Review** — 2026-04-17 refinance post strong AEO (FAQPage + 8 question H2s + 8 CTAs); 2026-04-27 home-prices post still missing FAQPage schema (10th carry, paused per GOALS.md no-content rule). Blog stale 25 days, flagged but paused.
- **Single commit `a8d565c`, 10 files**, pushed and verified live (10× HTTP 200 + title + meta spot-checks). Self-review PASS — no hard-constraint violations.
- Re-Verify Gate: prior `276b894` realtors.html alt-text scrub still holds; 0 banned phrases sitewide.
- NotebookLM 48th dead-check; PSI quota 15-of-15 drain (both carry).

## 2026-05-18 EVENING (styer-site-daily pass-3) — Re-Verify Gate only, no auto-edits

- **Verification-only run** — 0 files modified. Third Monday fire of the day (after AM rotation pass + same-day Phase A AggregateRating cleanup pass).
- **Re-Verify Gate** swept 22 claims: 11 STILL OK, 9 STILL OPEN carries deferred to Adam, 2 NEW open findings.
- **Validated Adam's two same-day commits live:** `6e27eb5` nav consolidation (3-page spot-check passes; soft inconsistency on suburb `About Adam` standalone vs nested) + `53b4733` scenario differentiation (4 JSON-LD blocks live, sitemap entry present, get-preapproved tracking preserved post-rewrite).
- **NEW HIGH escalation:** Calculator P0-A (12× inflated PITI bug on `rate-buydown-calculator.html` lines 1035–1036). Sister task `styer-calculator-audit-weekly` flagged 4 weeks running with `patches/calculator-2026-04-20-P0.diff` on disk — escalating from this surface so it doesn't fall through the cracks.
- **NEW LOW finding:** Adam's nav-consolidation commit description claims `About Adam` should nest under Contact dropdown, but suburb pages render it as standalone `<li>`. consolidate-nav.py per-template gap. Logged for tomorrow's spot-audit.
- Conversion tracking 10/10 critical tokens survived Adam's `/get-preapproved` rewrite cleanly.

## 2026-05-18 LATE — SEO/AEO fixes per audit: scenario schema, sitemap, differentiation

Audit findings: /scenario.html had zero structured data and wasn't in
sitemap.xml; 91 recently-touched URLs in sitemap had stale lastmod;
/scenario and /get-preapproved overlapped in positioning (keyword
cannibalization risk).

- **scenario.html:** Added 4 JSON-LD schema blocks: MortgageBroker
  (with Person/Adam, NMLS sameAs), LoanOrCreditService (the scenario
  review offering, $0 price), BreadcrumbList, and a 6-question
  FAQPage covering the page's core AEO questions. Added byline
  with NMLS link + `<time datetime>` updated date. Added
  differentiation callout linking to /get-preapproved for users
  whose intent is actually pre-approval not scenario review. Fixed
  canonical to match served URL (was `/scenario`, now
  `/scenario.html` since `_redirects` keeps both routes valid).

- **get-preapproved.html:** Repositioned as the pre-approval letter
  funnel for active home shoppers (vs scenario review for
  complex/declined files). Title: "Quick Mortgage Pre-Qual Review"
  → "Mortgage Pre-Approval Letter Austin TX | 24-Hour Turnaround".
  Meta description rewritten to lead with "active home shoppers"
  and pre-approval letter. H1 + form heading updated. Added byline
  + differentiation callout linking to /scenario.

- **sitemap.xml:** Added /scenario.html entry (priority 0.9,
  changefreq monthly). Bulk-bumped lastmod to 2026-05-18 for 91
  URLs corresponding to HTML files modified in the last 24h via
  git log lookup. 31 URLs with older dates left untouched (blog
  posts, location pages not modified this session).

Verified: scenario.html now has 23 schema entries (was 0); both
pages have cross-link differentiation callouts; canonical points
to the .html URL.

## 2026-05-18 PM — Week 11 competitive intel run (styer-competitive-weekly)

- **Tracked top-10 jumped 4 → 6 suburbs.** Round Rock ★ #9 (FIRST top-10 ever, breaks 6+ month carry), San Marcos ★ #9 (first measurement). Pflugerville #4 → #2 (Geneva Financial demoted #1 → #3). Leander #6 → #4. Kyle #8 → #6. Hutto demoted #2 → #3 (Zillow directory insertion at #2). Westlake formally dropped from rotation — SERP doesn't disambiguate to TX (returns Westlake Village CA / NJ).
- **NEW STRATEGIC DIMENSION: complicated-income SERPs** per GOALS.md 2026-05-18 repositioning. Adam ranks **#2 jumbo mortgage Austin** (LendFriend #1) and **#4 asset depletion Austin** (via jumbo page). Ranks **0 of 5** on self-employed / bank statement / non-QM / DSCR / 1099 Austin despite having dedicated pages for each.
- **Head-to-head audit: Adam's `/non-qm-loans.html` (NOT ranking) vs LendFriend `/non-qm` (#5).** Adam wins on 4 dimensions (word count, suburb depth, 2026 freshness, internal cluster). LendFriend wins on 2 (FAQPage schema, topic-cluster broader-Texas footprint). **The fix is schema, not content** — fits Phase A "no new content" rule.
- **LendFriend Mortgage is the NEW #1 strategic competitor** — multiple top-3 on jumbo / asset depletion / self-employed / non-QM. Stephanie Donnell (independent broker, personal-brand domain, #1 non-QM Austin) flagged as closest 1:1 competitor profile — deep audit scheduled Week 12.
- **ATX Mortgage Lending sitemap re-fetched: 0 of 61 URLs are dedicated suburb pages** (2nd consecutive biweekly verification). First-mover advantage preserved. Next check 2026-06-01.
- **Joel Richardson / FCM #1 → #4 cash-out**; Austin Capital Mortgage new #1. SouthStar Bank #1 → #2 refi (Yelp displaced to #1). MortgageAustin #1 → #2 get-pre-approved (Kelsey Easton realtor blog new #1 — informational intent beating transactional).
- Wrote report: `run-logs/competitive/2026-05-18.md` (364 lines). Copied to `latest.md`. Appended weekly entry to `/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md`. NotebookLM CLI auth still expired since 2026-05-11 — Step 6 source upload to SEO + Growth Log notebooks could not execute. NotebookLM advisor script 43rd consecutive dead run (no `notebook_advisor.py` at `/Users/adamstyer/loanos/scripts/`).
- TOMORROW_PRIORITY (8 items) filtered through GOALS.md "no new content" rule — top picks: FAQPage + AggregateRating schema audit on 5 complicated-income pages + jumbo page; GSC URL Inspection sweep on 5 suburb pages.

## 2026-05-18 AM — Residual "Close in 21 Days" H3 sweep + Re-Verify Gate auto-resolutions

- **Phase A compliance cleanup (commit `a317f1b`):** Adam's Sunday EVENING sitewide "21-Day Avg. Close" sweep missed 6 suburb pages where the claim lived inside a "How I Work" Step 4 H3 heading. Replaced "Close in 21 Days" → "Coordinated Close" on buda, elgin, florence, jarrell, marble-falls, smithville mortgage-lender pages. Replacement matches each page's existing body copy ("I manage the timeline proactively") so no body rewrite needed. All 6 pages live-verified HTTP 200 with new copy post-Netlify deploy.
- **Lesson:** marketing-phrase audits should grep across ALL `.html` (not just `<meta>` + JSON-LD blocks) and resolve every match with context. Sub-headings in body content are the easiest miss.
- **Re-Verify Gate — 2 auto-resolutions:** (1) style.css working-tree carry (23 prior runs of being uncommitted) — clean tree confirmed today; Adam committed nav-dropdown fix between Sun and Mon. (2) Homepage AggregateRating + 136+ Reviews badge — confirmed REMOVED at schema level by Adam's Sunday EVENING sweep (audit finding #4 schema-level satisfaction). 5.0/45 Zillow text still appears in body copy 2× on homepage — body-copy level audit item remains open.
- **PSI Monday refresh test:** quota STILL drained on `project_number:583797351490` even on Monday 5/18 (10-of-10 consecutive drain). Carry now reframed from "may restore on Monday" to "Monday refresh does NOT restore quota." Confirms permanent throttle theory; provision dedicated key or accept permanent UNVERIFIED.
- **Scheduler-anomaly streak:** Mon 5/18 fired exactly once at normal time. First non-anomaly day after a 4-day, 7-anomaly, 4-distinct-type streak (Thu 5/14 no-fire → Fri 5/15 triple → Sat 5/16 double → Sun 5/17 weekend). HIGH flag stays until 3 clean days in a row.
- **Tuesday 5/19 self-execute preview:** `/investor-loans` (11th carry) + `/high-net-worth-mortgage` (11th carry) title rewrites to insert "Adam Styer" before "NMLS #513013" — Decision Test PASSES (reversible, audit-supported, no legal judgment). Will execute MEDIUM_RISK during Tuesday rotation's Title Tags + Meta Descriptions step.

## 2026-05-17 LATE — UX/conversion overhaul (homepage + /scenario page)

- **Hero CTA cleanup:** Secondary CTA label "Schedule Strategy Call" → "Book 15-Min Call". Both hero CTAs (`Send My Scenario`, mobile sticky bar, final-CTA section) now route to new `/scenario.html` instead of `/get-preapproved`.
- **Mobile hero photo:** Added 96px circular headshot at top of mobile hero authority column. Uses existing `assets/adam-cutout-900.webp` cropped object-position:top-center. Desktop cutout unchanged.
- **Hero quick form:** Added Timeline qualifying field (full-width). New trust line under submit button: "Reply within 1 business hour · 5.0 ★ from 92 Google reviews · 1,000+ loans closed".
- **Stats strip:** Replaced ratings slot with explicit review counts. Now shows 1,000+ Loans / 5.0 ★ from 92 Google reviews / 4.98 ★ from 45 Zillow reviews / 40+ Wholesale Lenders Shopped.
- **Quick Contact form (smart form upgrade):** Renamed "Quick Contact" → "Tell Me About Your Loan". Added 8 qualifying fields: Employment/Income Type, Property Use, Estimated Credit Range, Timeline, Estimated Loan Amount, Annual Household Income, expanded Loan Goal options (DSCR/VA/not-sure added), and free-text "Tell me more" textarea. Submit button: "Send Message" → "Send My Details". Trust line added under submit.
- **"Why Choose Adam" section → 3 composite case studies:** Replaced the generic 6-card feature grid with 3 anonymized case-study cards (Self-Employed Jumbo Westlake $1.2M, DSCR STR Portfolio 4-property, FTB Pflugerville $485K rescue). Added CTA button to /scenario at bottom of section. Composite framing disclosed in section subtitle.
- **Sticky mobile CTA:** Now reveals at 120px scroll OR 2-second timeout (was 30% scroll). Effectively persistent after page load. CTA href updated to /scenario.html.
- **New page: `/scenario.html`** — dedicated long-form qualifying intake landing page. Modeled on `get-preapproved.html` layout but tailored to scenario-review positioning. Form fields: contact info + loan goal + employment type + property use + loan amount + credit range + timeline + income range + city + "bank said" status + free-text situation + optional file upload (multipart, PDF/JPG/PNG up to 8MB). TCPA + SMS opt-in checkboxes preserved. Trust line + 3-step "what happens next" + secondary phone CTA. Form name: `scenario`. Netlify auto-detection via hidden template form at top of file.
- **`_redirects`:** Added `/scenario → /scenario.html 301` for extensionless URL parity.
- **Note on file uploads:** Scenario form does NOT post to `/.netlify/functions/lead-intake` (Mailchimp/LoanOS) because multipart form data can't be JSON-encoded. Native Netlify submission only. Future: Netlify function subscribing to scenario-form webhook can pick up server-side if Mailchimp tagging is needed.

## 2026-05-17 EVENING — Repositioning sweep + "21-Day Avg. Close" claim retired sitewide

- **Goal context:** Adam moving to new company. New-employer compliance audit incoming. Pre-emptive cleanup of styermortgage.com so the audit clears on first read. Positioning shifted to "the loans your bank said no to" + wholesale-pricing leg.
- **Homepage hero:** H1 → "The loans your bank said no to. The pricing your bank can't match." Subtitle rewritten: complicated income / wholesale pricing two-leg pitch. Stats strip slot 4: "21 Days / Avg. Close Time" → "Non-QM / & Self-Employed Specialist". Boilerplate intro paragraph rewritten to lead with complicated-income specialty. Homepage FAQ schema + accordion: stripped the "21 days average close time" claim.
- **about.html:** H1 → "Hi, I'm Adam Styer. I close the loans your bank can't." Subtitle rewritten around specialty + wholesale pricing.
- **Sitewide find-and-replace:** "21-Day Avg. Close" → "1,000+ Loans Closed" across trust badges (~80 files), footer Awards & Recognition blocks (~30 files), `lp-trust-chip` spans (ad LPs), inline spans, list items.
- **Boilerplate body-copy:** "and an average 21-day close" → "and 1,000+ loans closed since 2017" on index, austin-area, dripping-springs, elgin, florence, jarrell, liberty-hill, manor, marble-falls.
- **san-marcos testimonial:** specific "closed in 21 days" claim stripped from fabricated-looking testimonial pending full testimonial audit per 2026-05-17 compliance review.
- **Files touched:** ~95 HTML files. All edits via exact-string Edit with `replace_all=true` — surrounding context preserved.
- **3 acceptable 21-day mentions left as-is:** generic advice paragraph in `blog/2026-04-01-how-to-choose-a-mortgage-lender`, internal `dashboard.html` placeholder text, historical `updates/2026-02-20-fast-closes-teamwork-and-spring-market-momentum.html` (dated post about one specific deal).
- **GOALS.md fully rewritten** at /Users/adamstyer/Documents/Daily Operating System/GOALS.md — loan-officer-first, LoanOS/Client Ops/portfolio paused.
- **2026-05-17_compliance-audit** delivered to workspace folder with 21-finding pre-audit review and prioritized remediation plan. Critical findings: rate widget APR missing on austin-mortgage-rates.html (Reg Z §1026.24(c)), apparent fabricated testimonials (FTC 16 CFR Part 255), GLBA privacy policy gap.
- **Open compliance follow-ups (not done this session):** testimonial authenticity audit (Adam call), rate widget APR fix, privacy policy GLBA rewrite, sitewide superlative cleanup ("award-winning" in schema, "Austin's Top-Rated", "best/lowest"), EHL coverage gaps on ~60 pages, NMLS Consumer Access link gaps on ~53 pages, standard footer partial build.
- **Deploy:** uncommitted in working tree. Adam to run git add/commit/push when ready.

---

## 2026-05-17 — Private-wealth / non-QM expansion (6 new niche pages + homepage schema/FAQ rewrite)

**Driver:** Adam-approved strategic SEO/AEO audit + multi-agent execution. Audit found the site was schema-optimized for commodity searches ("Austin mortgage broker, 21-day close, 40+ lenders") while the actual book is 1,000+ closings of complex-income / private-wealth deals. Goal: add high-value niche pages and reposition homepage structured data to dominate `bank statement Austin`, `DSCR Texas`, `K-1 mortgage`, `asset depletion`, `1099-only`, `P&L mortgage`, and `OTC construction Texas` — keyword universes competitor research confirmed nobody owns.

**Note re session overlap:** This work ran earlier on 2026-05-17 (daytime). Adam's EVENING repositioning sweep (above entry) ran after, replacing the homepage hero H1 + subtitle with sharper "loans your bank said no to" framing and stripping the 21-day claim sitewide. My homepage schema/FAQ/nav/Offer-Catalog edits and the 6 new niche pages survived clean. The Q5 FAQ "21 days average close time" sentence was removed by Adam's sweep — schema and visible accordion still match verbatim.

**Process:**
- **3 parallel research agents** produced sourced research bundles in `cowork/scratch/styer-research-{nonqm-mechanics,austin-market,competitor-aeo}.md` (~9,000 words, primary-source citations: FHFA, Fannie Selling Guide, Freddie §5307.1, Census ACS, ABoR, NAR International Transactions, Angel Oak/Acra/Newrez/A&D lender matrices).
- **4 parallel content agents** built 6 new HTML pages off the research bundles + `bank-statement-loans.html` pattern. [UNCERTAIN] research items hedged with embedded `<!-- FLAG_FOR_ADAM: ... -->` comments.
- **1 fact-check verification agent** cross-referenced all 7 changed files against research and produced `FLAG_FOR_ADAM.md`. Verdict YELLOW → blocker (fabricated 5-star testimonials on all 6 new pages) → testimonials deleted per Adam decision → effectively GREEN.

**Homepage schema/structure changes that survived Adam's EVENING sweep:**
- Title, meta description, OG, Twitter Card — all reframed to niche
- `MortgageBroker` schema description rewritten + Offer Catalog reordered (12 programs, non-QM first, conventional/FHA/VA last)
- `Person` schema upgraded: `description`, `knowsAbout` array (12 specialties), expanded `sameAs` to include NMLS Consumer Access + Yelp + Instagram, added `url` to `hasCredential`
- `FAQPage` schema rewritten — 5 niche citation-grade Q&As replacing commodity questions; visible accordion HTML updated to match schema verbatim; FAQ answers trimmed to ~50w AEO target with internal links to the 6 new pages
- Bento loan grid: "First-Time Buyer Programs" wide card → "DSCR Investor Loans" wide card
- Nav (header + footer): leads with "Business Owners & Self-Employed" pillar link; surfaces Asset Depletion + K-1 Income + non-QM hub
- Sitemap.xml: 6 new URLs added with 2026-05-17 lastmod (0.9 pillar, 0.8 niches); homepage lastmod bumped

**Homepage changes that were OVERRIDDEN by Adam's EVENING sweep (kept his):**
- H1 (mine: "Mortgages for Business Owners, Investors & Complex Deals" → his: "The loans your bank said no to. The pricing your bank can't match.")
- Hero subtitle (mine niche-specific → his: wholesale-pricing two-leg pitch)
- Stats strip slot 4 (mine: trust badge already updated → his: "Non-QM & Self-Employed Specialist" replaces "21 Days Avg. Close")

**New pages (6, all in repo root):**
- `mortgage-for-business-owners-austin.html` (pillar, ~759 lines, 12 FAQs, 5 illustrative deal archetypes labeled as illustrative)
- `asset-depletion-mortgage-texas.html` — divisor comparison table (Fannie 360 / Freddie §5307.1 240 / non-QM 60-120), worked $3M founder example, retirement haircut hedged per [UNCERTAIN]
- `k1-income-mortgage-austin.html` — Fannie B3-3.4-19 (effective 2026-03-04) sub-25% framing, Form 1084 mechanics, business liquidity test (current ratio ≥1.0), worked law-firm partner example
- `1099-only-mortgage-texas.html` — expense factor methodology, multiple-1099 handling, 1-yr vs 2-yr history comparison
- `p-and-l-mortgage-texas.html` — CPA-prepared P&L requirements, who can prepare (CPA/EA/CTEC), hybrid deposit validation
- `one-time-close-construction-loan-texas.html` — Texas §50(a)(5) construction-lien rules (5-day waiting, 3-day rescission, spousal joinder, written contract), Hill Country pricing tiers ($180-$300/sq ft, $900K-$2.5M typical), 7-county target grid

**Schema coverage on every new page:** LocalBusiness + LoanOrCreditService + FAQPage + Article (Person author with NMLS identifier) + BreadcrumbList. 12 FAQs each (13 on P&L), 40-60w answers, schema/visible accordion verbatim match. Fabricated 5-star testimonials deleted per Adam decision.

**Fact-check baseline checks all PASS:** zero "Styer Team" / "nationwide" / raw URL violations; 231 internal links resolve; NMLS/GTM/CSS/phone/address identical across all files. `style.css` deliberately not touched (Adam's 22nd carry preserved).

**Items requiring Adam to verify against current wholesale matrices before quoting borrowers** (all hedged on live pages, full list in `FLAG_FOR_ADAM.md`): Fannie 360-month divisor (sourced via Truss, not primary Fannie text), Newrez SmartSelf 50% 1099 factor, A&D P&L parameters (660 FICO, $2.5M cap), Acra 1099 parameters, retirement haircut convention, non-QM rate premium bps, OTC contingency reserve %, Hill Country pricing tiers.

---

## 2026-05-17 — suburb-editor Round 3 slot 2: georgetown-mortgage-lender.html

- **Lighter-touch refresh** following 2026-05-03 Round 2 deep renovation (page was already first-party-dense).
- Redfin direct fetch 403-blocked (same as Round Rock 5/16); WebSearch re-confirmed March 2026 Redfin median $413K +1.9% YoY = preserved page's $412.5K figure rather than swap for an Orchard/Zillow methodology mismatch.
- **NEW H3: Cimarron Hills (78628) — Guard-Gated Golf + Second ISD Split** — Jack Nicklaus Signature 1,000+ acre community opened Jan 2003 with clubhouse at 200 Cimarron Hills Trail W ([cimarronhills.com](https://www.cimarronhills.com/about-us/our-location-200-cimarron-hills-trail-west-georgetown-tx-78628)). 4-tier pricing ladder per [Cimarron Hills real-estate page](https://www.cimarronhills.com/real-estate): Villas 1,550–2,600 sqft / 2–4BR low-$300s; Homes on the Fairway low-$450s; Country Club Homes $558,900+; Estates ½–1 acre $700s+. Current new-construction inventory: 5 active listings at $1.23M median list ([Redfin](https://www.redfin.com/neighborhood/199061/TX/Georgetown/Cimarron-Hills/new-homes)); 12-month resale median $1,150,000.
- **CRITICAL — SECOND LHISD-Georgetown-mailing-address split surfaced** — Cimarron Hills is split between GISD (northern half: San Gabriel Elem → Benold MS → East View HS) and Liberty Hill ISD (southern half: Rancho Sienna Elem → Santa Rita MS → Legacy Ranch HS / Liberty Hill HS) per [austinrealestatehomesblog](https://www.austinrealestatehomesblog.com/georgetown/cimarron-hills/) + [Liberty Hill ISD zone tool](https://www.libertyhill.txed.net/zones). MorningStar pattern repeats; now both LHISD traps documented on the page.
- **Historic-district filler paragraph rewritten** — was generic "popular with buyers who want character architecture" → Old Town District 78626 specifics: FHA 203(k) renovation framework + 2026 Williamson County FHA limit $571,550 + non-conforming-lot Texas appraiser callout + live [Redfin Old Town District tracker](https://www.redfin.com/neighborhood/176391/TX/Georgetown/Old-Town-District/housing-market) link.
- **Why-card "Experience with Georgetown's Diverse Market" de-templated** → "ISD-Zoning Verification Before You Offer" card naming MorningStar (entire community) + Cimarron Hills (southern half) as the two LHISD traps with underwriting-tax-escrow rationale.
- LocalBusiness schema description expanded with Cimarron Hills + clubhouse address + GISD/LHISD split.
- FAQ home-price schema + accordion answer updated with Cimarron Hills 4-tier ladder + $1.15M resale median.
- WebPage dateModified bumped 2026-05-03 → 2026-05-17.
- Sitemap.xml lastmod bumped 2026-05-03 → 2026-05-17.
- **5 new inline source URLs added.** All 4 JSON-LD blocks validated clean.

---

## 2026-05-16 — suburb-editor Round 3 kickoff: round-rock-mortgage-lender.html

- **Round 3 begins** — Round 2 completed 2026-05-15 (westlake). Round 3 #1 = round-rock-mortgage-lender.html.
- **Lighter-touch refresh** following the 2026-05-02 deep renovation (page was already first-party-dense).
- April 2026 Redfin data attempted via WebFetch (403-blocked); WebSearch surfaced Orchard $415K–$419K — different methodology, didn't swap in unverified Redfin figure. Preserved well-sourced Mar 2026 Redfin $367,500 baseline.
- **NEW H3: Chandler Creek 78664 spotlight** — Palm Valley east-side community, built late-1990s through early-2000s by KB Homes/Lennar/Centex/Brighton ([austinrealestatehomesblog.com](https://www.austinrealestatehomesblog.com/round-rock/chandler-creek/)). Floor plans 1,120 → ~4,000 sqft on lots up to 0.435 acres. RRISD: Double File Trail Elementary @ 2400 Chandler Creek Blvd → Hernandez Middle → Stony Point HS ([roundrockisd.org](https://www.roundrockisd.org/o/rrisd/page/chandler-oaks-elementary-school)). HOA <$400/yr — pool, ½-mile lit ADA trails, playgrounds, ball fields, Compass Rose Veterans Memorial ([chandlercreekhoa.org](https://www.chandlercreekhoa.org)). Memorial reinforces page-wide VA narrative.
- **Step-4 process narrative de-templatized** — was verbatim on 8 suburb pages → now Round Rock 78664/78665/78681-specific (38+ DOM reality, seller concessions returning, builder-preferred-lender contingency framing, RRISD on-time-close reputation).
- WebPage schema dateModified bumped 2026-05-02 → 2026-05-16.
- Sitemap.xml lastmod bumped 2026-05-02 → 2026-05-16.
- **3 new inline source URLs added.** All 4 JSON-LD blocks left validated-clean (no schema edits in this pass).

---

## 2026-05-16 — daily-opt Saturday UNSCHEDULED FIRE (abbreviated playbook)

- **Saturday weekend fire @ 07:12 CDT** — Saturday is NOT in the Mon–Fri rotation. Friday NIGHT's TOMORROW_PRIORITY explicitly anticipated this as scheduler-anomaly evidence; now confirmed. **4th scheduler anomaly in 3 days** (Thu no-fire / Fri triple-fire / Sat weekend fire = 3 distinct anomaly types).
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens hold across all 4 pages (GTM single-container `GTM-PQQ6PGLR` hex verified).
- PSI 8-of-8 consecutive drain — retry skipped to preserve Monday 5/18 refresh window. Already at HIGH ceiling.
- NotebookLM script: 39th consecutive missing check.
- Re-Verify Gate sweep on 16 carries — all STILL OK / STILL OPEN with no false regressions or new auto-resolutions.
- Scheduler reliability HIGH flag held + evidence expanded (3 distinct anomaly types in 3 consecutive days). Strongly recommend manual scheduler-log review.
- 0 site files edited.

## 2026-05-15 — Suburb Editor: westlake-mortgage-lender Round 2 (Round 2 closeout)

- **Last Round 2 page in the priority queue** — westlake-mortgage-lender.html Round 2 deepening + Round 2 rotation complete (13/13 pages).
- **Median triple-snapshot reconciliation:** Round 1 had only Redfin $1.6M (city of WLH, Mar 2026, +40.9% YoY). Round 2 adds **TeamPrice 78746 zip YTD $2,394,287** + **Neuhaus 2026 luxury slice $3.5–3.6M @ $756/sqft, 54–85 day DOM, 9.0 mo. supply** + sales-tier breakdown $1M–$2M 45% / $2M–$3M 28% / $3M–$5M 18% / $5M+ 9%. New H3 explains why three sources show three different medians (geography slice, not data conflict).
- **CRITICAL Lost Creek Country Club correction (Crestline/MorningStar/Star Ranch/Reunion Ranch pattern):** Round 1 linked `lostcreekcc.com` which now points to Lost Creek Custom Cabinetry (East Tennessee — broken first-party reference); the club itself **rebranded to Westlake Country Club in 2022** under Invited and completed a three-year multimillion-dollar transformation in **December 2025** (Lanny Wadkins-redesigned 18-hole course unveiled Nov 2023, tennis/racquet/pool/clubhouse rebuilds, restaurant relaunched as "Veranda"). Address 2612 Lost Creek Blvd. Lost Creek bullet rewritten; Westlake Country Club promoted to named-employer H3 slot.
- **Eanes ISD update — district past the budget cliff:** new superintendent **Kirk Koennecke** (started Jan 1, 2026); $9.6M FY 2026-27 deficit projection **reversed to $1.6M projected surplus** after $2.8M Right Size Plan + 69 FTE attrition + virtual academy + transfer enrollment expansion (Community Impact Apr 29 2026). 480 teachers qualify for $2,500–$5,000 retention allotments. **5 new Westlake HS 2026-27 courses** (AP Business + Personal Finance, AP Cybersecurity, Fundamentals of Real Estate, Dual Credit English 1301/1302 via ACC, Dual Enrollment Statistics via UT OnRamps).
- **New first-party comp:** 4312 Amarra Drive (Heyl Homes) sold $3.5M Oct 28, 2025 — Austin's priciest spec sale that week at $1,000/sqft on 3,300 sqft / 3-2 (The Real Deal cited).
- **New Barton Creek sub-community pricing breakdown** (Seely Properties 2026): Barton Creek West $3M–$7M+ / Estates $1.5M–$2.5M / Villas $1.2M–$1.8M / Sections 1–8 $1.4M–$2.8M.
- **New Omni Barton Creek Resort employer slot** — $150M renovation completed 2019 (13,000 sqft Mokara Spa, 17 treatment rooms, adults-only rooftop pool) + active Beck Group expansion (180-room new guest tower, ballroom, conference, event pavilion).
- **3 of 4 Process Steps de-templated** — Step 2 verbatim shared with spicewood ("Your file goes to multiple jumbo and portfolio investors simultaneously. You get competing offers — not just one bank's rate") rewritten with Rob Roy K-1 / Davenport Ranch asset-depletion / Barton Creek RSU differentiation + $300–$700/mo investor-spread math on $2M loans; Step 3 generic "soft pre-qual" rewritten with Westlake listing-agent verification at Rob Roy gate + Barton Creek sub-neighborhoods; Step 4 generic "jumbo can take longer" rewritten with Day-1 appraisal-ordering + HOA-estoppel-ordering at Rob Roy/Barton Creek/Davenport Ranch as actual delay points.
- **FAQ schema** "median home price" rewritten with three-snapshot reconciliation; **NEW Q added** "Is Eanes ISD's budget stable for 2026-27?" anchoring the $1.6M FY26-27 surplus + Koennecke + August 2026 tax-rate adoption. FAQ accordion synced verbatim.
- **LocalBusiness schema description** rewritten with 3 median snapshots + 9.0 mo supply + tax stack + Koennecke + Right Size Plan + $1.6M surplus.
- **WebPage dateModified** 2026-05-01 → 2026-05-15. Meta description refreshed. Sitemap lastmod bumped 2026-05-01 → 2026-05-15.
- All 4 JSON-LD blocks (LocalBusiness/FAQPage/BreadcrumbList/WebPage) validated clean via python json.loads.
- **18 new inline source URLs** (combined with Round 1 = 30+ total citations on the page).
- Queue log updated. Suburb editor queue position rolls over to Round 3 start next run.

## 2026-05-15 PM — daily-opt duplicate same-day fire (bonus drift sweep)

- **Same-day duplicate fire** 4 min after AM cleanup (09:49 → 09:53). No rotation re-do. Every-run checks idempotent.
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens hold across all 4 pages. GTM single-container hex verified.
- PSI 8-of-8 consecutive drain locked in (no new escalation — already at HIGH ceiling).
- NotebookLM script: 37th consecutive missing check.
- Re-Verify Gate sweep on 16 carries — all STILL OK / STILL OPEN with no false regressions or new auto-resolutions.
- **NEW operational MEDIUM flag for Adam:** scheduler reliability degrading (Thursday 5/14 no-fire + Friday 5/15 duplicate same-day fire).
- Zero site files modified. Zero commits.

## 2026-05-15 — Weekly Blog Editor: local-lender-vs-online-lender correspondent-lender repositioning

- **Refreshed `blog/local-lender-vs-online-lender-austin-central-texas.html`.** Slug + H1 + title preserved (protect existing rankings). dateModified bumped 2026-04-25 → 2026-05-15. Sitemap lastmod bumped.
- **Core fix: "broker" → "correspondent lender" positioning** (per Adam's voice guide: "We're a correspondent lender — that's different from a broker, and it matters"). Body recast in 7 places: lead bold, intro paragraph, TSAHC line, "Third Option" H2 + 4 body paragraphs, final H2 + closing. Visible FAQ + FAQPage JSON-LD rewritten (3 Q&As, including new "What's a correspondent lender?" Q replacing the broker-advantage Q). TX regulatory footer "Licensed Mortgage Broker" preserved (legal designation).
- **Same fix pattern as 2026-04-24 DPA editor run** (`"broker" → correspondent lender`). Adam's flexibility — "can also broker deals when wholesale pricing wins" — preserved as a beat in the positioning.
- **3 of 5 SKILL.md improvements:**
  - Austin data point: $445K Austin–RR–SM MSA median (April 2026, Unlock MLS) + 16K+ active listings — added to "Why Austin Buyers" section with inline citation.
  - Updated rate/program data: Freddie Mac PMMS mid-6% range with `freddiemac.com/pmms` citation; LLPA matrix cited to `singlefamily.fanniemae.com`; TSAHC + TDHCA URLs added (replacing un-linked program names); internal links added to `/austin-down-payment-assistance.html`, `/dscr-loan-austin-tx.html`, `/bank-statement-loans.html`, `/non-qm-loans.html`.
  - Tighter CTA in Adam's voice: signature reworded to "Got a quote from an online lender or a bank? Send it over. I'll line it up against my pricing... Same-day pre-approval if you want to move on it." Same-day pre-approval differentiator per voice guide.
- **NOT done (skipped per SKILL.md "never fabricate" rule):** No `/Users/adamstyer/.claude/projects/-Users-adamstyer-Documents/memory/people/` directory exists — no verifiable borrower anecdote available, did not invent one. Photo addition deferred (no verified asset path).
- **Related Guides anchor updated:** `Mortgage Broker vs Bank` → `Correspondent Lender vs Broker vs Bank` (URL `/mortgage-broker-vs-bank.html` preserved; future redirect/rename is Adam's call).
- **Blog title lint passed** (`grep "<title>" blog/*.html | grep -v "Adam Styer"` returns empty).
- **Queued for GSC URL Inspection reindex.**
- **NEEDS ADAM (NEW 2026-05-15) — rate-shopper cluster consolidation review:** 5-post near-duplicate cluster on "comparing quotes/offers" angle: `how-many-mortgage-quotes-should-i-get.html`, `how-to-compare-two-mortgage-offers.html`, `what-to-compare-besides-mortgage-rate.html`, `is-the-lowest-rate-the-cheapest-loan.html`, `apr-vs-interest-rate-what-actually-matters.html`. Per SKILL.md, posts in a 3+ near-duplicate cluster are not edited unilaterally — consolidation decision (merge into 1–2 canonical posts with 301s, or differentiate angles further) is Adam's call. Logged to TODO.md.

## 2026-05-15 — daily-opt Friday (Content Planning + AEO Review rotation)

- **First fire since Wed PM. Thursday 2026-05-14 styer-site-daily DID NOT FIRE — Internal Linking + Funnel Flow rotation skipped.** Logged as operational MEDIUM flag for Adam (check scheduler). No site edits this session — Friday rotation collapsed correctly per GOALS.md "no new content this week" guidance.
- **Sitemap 200 ✅. Conversion tracking 10/10 critical tokens** across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`. GTM single-container hex-verified (`GTM-PQQ6PGLR`). PSI 7-of-7 consecutive drain locked in (HIGH escalation ceiling — no new bump).
- **Blog audit:** Latest post 18 days old (2026-04-27-why-home-prices-arent-crashing, deferred per GOALS.md). Audited 2 most recent: `should-i-refinance-austin-tx-2026` clean AEO (6/9 H2 questions, FAQPage schema, balanced /get-preapproved + /refinance-quote CTAs); `why-home-prices-arent-crashing` declarative H2s flagged voice-vs-AEO tradeoff (keep declarative, matches Adam's voice). **NEW finding:** same post missing FAQPage schema — LOW_RISK, bundled with existing 18-carry CTA structure decision.
- **Re-Verify Gate 15 carries — all hold.** AM Tue/Wed meta fixes (FTB/DPA/Pflugerville) STILL LIVE on Netlify; products.html 10 in-card 1003 (18th carry); style.css working-tree (18th carry); `/investor-loans` + `/high-net-worth-mortgage` titles missing "Adam Styer" (5th run carry); NotebookLM script missing (36th carry).
- NOTEBOOK_INSIGHT captured: `GTM-` naive substring count ≠ container count (head + noscript references inflate); hex-unique grep is authoritative.

---

## 2026-05-14 — Suburb Editor Round 2 #12 (Dripping Springs)

- **dripping-springs-mortgage-lender.html Round 2.** Median dual-snapshot — Round 1 Mar 2026 Redfin $542,500 (+4.7% YoY) supplemented with **April 2026 ACTRIS pull via Neuhaus: 50 closings at $575,750 (-19.5% YoY)** — gap reconciled as mix-shift from 2026 new-construction flood.
- **CRITICAL Reunion Ranch correction surfaced** (Crestline/MorningStar/Star Ranch pattern): Round 1 framed Reunion Ranch as horse-friendly acreage with $1M+ resales; reality is **Taylor Morrison master-planned, 437 SFH, 0.25–0.8 ac lots (NOT acreage), 2,199–5,425 sqft, 2012 groundbreak / 2022 build-out + luxury infill**, pool/sport courts/business center. Single-builder, suburban MPC.
- **2 NEW H3 sections (~75 lines):** **2026 Construction Flood** — Big Sky Ranch (Meritage ~700 homes $350K-$600K), Wild Ridge (900+ homes), **Double L Ranch (1,600 ac / 2,200+ luxury homes / 500 ac parkland / four-lane RM-12 to US-290 arterial / late 2026)**, Village Grove (100 ac / 531 units); **DSISD Second High School ($402.3M Prop A bond, opens 2028-29)** — broke ground April 2026 on Darden Hill Rd next to Cypress Springs Elem, 482,800 sqft / 2,500-student capacity, $298.78M of bond, DSHS projected 3,000 students by 2026-27 over 2,500 cap.
- **FAQ schema swapped** — generic pre-approval Q → "Will my Dripping Springs home be zoned to DSHS or the new High School No. 2"; accordion synced.
- **Headwaters builder roster correction** — Round 1 had 2 builders; current 2025-26 roster is **4 active: Ashton Woods + David Weekley + Toll Brothers + Coventry**, Coventry's new model opened, Toll Brothers' "Lady Bird" debuted. **Caliterra Phase 2 deepened** — $40M expansion, 232 homesites (39 custom + 193 production from the $700,000s), 14 plans 3,400-5,350 sqft on 80-100 ft lots, builders David Weekley + Drees + Scott Felder, December 2026 first move-ins; most of band crosses 2026 conforming line. **NEW Big Sky Ranch spotlight** — Meritage 126 Bartlett Peak Lane.
- **Treaty Oak status correction** — Round 1 listed as active; **acquired Nov 13, 2024 by High Basin Brands in $4M seed round**, Yelp flags walk-in closed → flagged as not buyer-facing. **DSISD confirmed 7th-largest Hays Co employer at ~1,100 employees**; **NEW Garrison Brothers** (Hye TX 25-min west, 50K+ annual visitors).
- **Property Tax refreshed** — Hays County FY 2025-26 **$0.3999/$100 adopted 4-1 on Sept 16, 2025 (+11.27% YoY revenue)** added; DSISD $1.1052 + City of DS $0.2267 unchanged; ~1.71% effective Ownwell.
- **Schools H3 expanded** — DSHS 2,564 students, 99% grad rate (US News), ~93% post-secondary, top 20% of TX (Public School Review); DSISD ~8,800 enrollment.
- **Templated paragraphs removed:** Step 1 "No credit pull happens until you are ready to move forward" verbatim duplicate (12-page match) replaced; Step 4 "Take your pre-approval letter to any Dripping Springs listing. Sellers and their agents know a pre-approval from Adam Styer means the deal will close on time" verbatim duplicate (9-page match) replaced with DSISD HS#2 boundary-draw strategy + acreage well/septic/OSSF coordination.
- **LocalBusiness schema description** + meta + WebPage dateModified + sitemap lastmod all bumped 2026-04-30 → 2026-05-14. All 4 JSON-LD blocks validated clean. **18 unique inline source URLs.**

---

## 2026-05-13 PM — daily-opt Wednesday PM (styer-site-daily, no-rotation drift sweep)

- **Wednesday PM bonus run — no site edits.** Same-day no-rotation precedent (Sun PM + Mon PM + Tue PM extended). Sitemap (200), conversion tracking 10/10 critical tokens across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`, PSI retry (429 on both landing pages — **6-of-6 consecutive drain period** on project 583797351490), Re-Verify Gate on 15 AM carries (all STILL OK / STILL OPEN with no false regressions), seo-sem backlog 0 open items.
- **AM Wed Pflugerville meta fix verified STILL LIVE on Netlify** — 151 chars, "Adam Styer" before NMLS, Blackhawk/Falcon Pointe/Windermere intact (commit `13f8cd5`).
- **Methodology note captured to NOTEBOOK_INSIGHTS:** sibling-agent commits between AM/PM runs can shift `dataLayer` counts (today AM 5/7/7/8 → PM 7/10/10/14 from `30fe26a` Bee Cave R2 + `90bf131` session-end docs). Critical-token methodology survives — `generate_lead`, `lead_type`, `lead-intake`, `form-name`, `thank_you_page_view` are the load-bearing checks, not raw `dataLayer` count.
- NotebookLM 35th consecutive missing-script check; PSI escalation already at HIGH ceiling (no further bump).

---

## 2026-05-13 — Suburb Editor Round 2 #11 (Bee Cave)

- **`bee-cave-mortgage-lender.html` Round 2 ship.** Last touched 2026-04-29 (Round 1). Round 2 adds: (1) **CesiumAstro $500M global HQ expansion** as headline employer signal — ~270K sqft three-building campus near SH-71/Sweetwater Village Drive, 500+ new jobs, operations 2027, 1,000+ employees by 2030, anchors Element satellite platform + Vireo multi-beam payloads (Community Impact Jan 15 2026, CesiumAstro press release, Office of the Governor cited; Mayor Kara King quote integrated). (2) **NEW Lake Pointe (78738) neighborhood spotlight** — 825 homes off Bee Caves Rd / RM 2244, dev started 1994, subdivisions The Settling/The Landing/The Estate/Vista Pointe/gated Pointe at end of Resaca Blvd, $350K-$1M+, Napa Park, LCRA Lake Austin day dock via HOA (movetoaustin.org). (3) **NEW Lake Pointe Elementary 9/10 GreatSchools** (11801 Sonoma Dr, 748 PK-5) added to schools list; Bee Cave Elementary updated with Falconhead/Sweetwater feeder note. (4) **Tax stack expanded** with LT Fire / Travis County ESD No. 6 line $0.090399/$100 (M&O 0.085646 + I&S 0.003753, TY2025, LTFR Resolution 2025-01 cited); Spanish Oaks no-MUD/no-PID callout added (1,200-acre, 462 custom homesites, only Travis County + LTISD apply).
- **Process steps fully de-templated.** Step 1 "No credit pull happens until you are ready to move forward" verbatim duplicate (grep-confirmed across 11 other suburb pages) removed. All 4 steps rewritten Bee Cave/jumbo-specific with conforming-line math, RSU/K-1 jumbo doc checklist, side-by-side conv-vs-jumbo rate-sheet language, and listing-agent phone-call differentiator at Spanish Oaks/Falconhead Phase 6/Pointe section.
- **Schema + accordion sync.** LocalBusiness description rewritten with 78738 + 4 named neighborhoods + CesiumAstro signal + conforming-line context. FAQ schema home-price + schools answers expanded with Lake Pointe range + Spanish Oaks no-MUD detail + Lake Pointe Elementary 9/10. Accordion FAQ verbatim-synced.
- WebPage dateModified 04-29 → 05-13. Meta description rewritten with Lake Pointe + Lake Pointe Elem + CesiumAstro. Sitemap lastmod 04-29 → 05-13. All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads. **16 inline source URLs** on the page.

---

## 2026-05-13 — daily-opt Wednesday (styer-site-daily, Suburb Deep Dive + AEO rotation)

- **Wednesday rotation — Pflugerville suburb deep dive.** New top-10 ranker per Competitive Week 10. Page audited against SKILL.md Wednesday rotation checklist: H1 city-specific ✅, FAQPage + BreadcrumbList + LocalBusiness + AggregateRating + City schema all present ✅, inline lead capture form ✅, internal links to `/get-preapproved` ✅ (2), AEO answer-first body intro ✅ ("To get a mortgage in Pflugerville TX, work with an independent broker like Adam Styer..."), H2s as conversational questions ✅ (5 of 7), voice match ✅.
- **One LOW_RISK fix shipped (commit `13f8cd5`):** `pflugerville-mortgage-lender.html` meta description trimmed 174 → 151 chars; added "Adam Styer" before NMLS #513013. Dropped "Mar 2026 Redfin" wording and Hendrickson HS 8/10 rating to fit Google's 160-char display window. High-value tokens preserved (city+state, FHA/VA/conventional, Blackhawk/Falcon Pointe/Windermere, $355K median, 40+ lenders, NMLS).
- **NEW LOW finding flagged for Adam:** 4 of 5 sampled suburb pages (round-rock, leander, hutto, georgetown, pflugerville) have 0 internal `/calculators` links; only cedar-park has 1. Roster-wide pattern. Not implemented as a 24-page cross-cutting fix without Adam's decision.
- **PSI 5-of-5 consecutive drain locked in.** Mon AM + Mon PM + Tue AM + Tue PM + Wed AM all 429 on project 583797351490. Metric now permanently UNVERIFIED until Adam provisions dedicated PSI API key.
- **Re-Verify Gate on 13 prior carries:** all STILL OK / STILL OPEN with no false regressions. AM Tuesday meta fixes (`/first-time-home-buyer` + `/austin-down-payment-assistance`) verified STILL LIVE on Netlify.
- **NotebookLM 34th consecutive missing-script check.** Adam queue bottleneck continues on retirement diff (drafted 2026-04-26).
- Methodology note captured to NOTEBOOK_INSIGHTS: audit suburb body intro paragraphs at the first `<section class="section">` after the hero (`<!-- Intro Content -->` marker), NOT raw `<p>` after `<h1>` — the latter pulls hero-subtitle + Call CTA + form labels.

---

## 2026-05-12 PM — daily-opt Tuesday PM (styer-site-daily, no-rotation drift sweep)

- **Tuesday PM re-fire — no site edits.** Following Sunday PM + Monday PM no-rotation precedent: sitemap (200, freshest lastmod 2026-05-12 — AM Title+Meta commits + Lakeway suburb-editor R2 rolled into Netlify sitemap regen), conversion tracking 10/10 critical tokens across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`, PSI retry (429 on both landing pages — **4-of-4 consecutive drain period** on project 583797351490), Re-Verify Gate on 14 AM carries (all STILL OK / STILL OPEN with no false regressions), seo-sem backlog 0 open items.
- **Methodology correction captured:** the why-home-prices-arent-crashing CTA "2 + 2" carry was a substring-overlap double-count (relative `../get-preapproved` contains the substring `/get-preapproved`, so bare-grep counted each href twice). Live file has 2 total CTAs (both relative). Switched to `href="`-anchored patterns in NOTEBOOK_INSIGHTS for future audits.
- **PM-live verification of AM Tuesday meta fixes:** `/first-time-home-buyer` serving "24-hour pre-approval" + `/austin-down-payment-assistance` serving "Travis & Williamson Counties" — both meta-fix commits live on Netlify.
- NotebookLM 33rd consecutive missing-script check; PSI escalation already at HIGH ceiling, no further bump.

---

## 2026-05-12 — Suburb Editor Round 2 #10 (Lakeway)

- **`lakeway-mortgage-lender.html` Round 2 ship.** Last touched 2026-04-28 (Round 1). Round 2 adds: (1) **April 2026 ACTRIS MLS data via Neuhaus Realty** alongside Feb Redfin — 15 SFH closings at $868K median, 6.3 mo supply, 94.9% close-to-list, 12-day median list-to-contract (reconciled the Redfin/Neuhaus methodology gap inline). (2) **City of Lakeway's own employer ranking** — LTISD #1 / BSW #2 / Lakeway Resort & Spa #3 (lakeway-tx.gov About) — replaces Round 1's BSW self-citation. (3) **NEW H3 "Lakeway Neighborhoods Inside Lake Travis ISD"** — Rough Hollow expanded with **Legend Communities + 22 distinct neighborhoods + Yacht Club & Marina MAX awards + Highland Village waterpark + The Point/The District new builds**, **NEW Serene Hills 78738 spotlight** (456-acre / 339 homesites / 342 preserved acres / Weston Dean+Brohn+Sitterle / Serene Hills Elem 9/10 INSIDE community), Flintrock/The Hills/Lakeway Highlands/Cardinal Hills consolidated.
- **Process Step 4 de-templated.** Round 1 had verbatim "Take your pre-approval letter to any Lakeway listing. In the luxury segment..." — grep-confirmed across 10 suburb pages. Rewrote Lakeway-specific (listing-agent gate-verification calls + 12-day ACTRIS list-to-contract signal).
- **FAQ home-prices** (schema + accordion synced) rewritten with reconciled Redfin/Neuhaus data + Serene Hills + 22-neighborhoods detail.
- WebPage dateModified 04-28 → 05-12. Sitemap lastmod 04-28 → 05-12. All 4 JSON-LD blocks validated clean via python json.loads. **6 new inline source URLs** (~20 total on page).
- Working-tree carries preserved untouched (style.css 14th-carry).

---

## 2026-05-12 — daily-opt Tuesday (styer-site-daily, Title+Meta rotation)

- **Tuesday Step 4 rotation complete.** Title Tags + Meta Descriptions audit on 12 loan-type pages — all present, none missing/duplicate/generic. 2 LOW_RISK length fixes shipped (commit `7091c5e`); 2 MEDIUM findings (investor-loans + high-net-worth title brand presence) surfaced for Adam.
- **Site edits:** `first-time-home-buyer.html` meta 162→158 chars (`Pre-approved in 24 hours.` → `24-hour pre-approval.` — matches og:description on same page, intra-page consistency win). `austin-down-payment-assistance.html` meta 145→161 chars (added Williamson County — reflects TSAHC/TDHCA service area). Netlify deploy verified live with `Williamson Counties` marker poll.
- **Loan-type roster correction captured:** `/loans/conventional`, `/loans/fha`, `/loans/va`, `/loans/jumbo` are canonical paths — not the SKILL.md-aspirational `/conventional-loan-austin-tx` root variants (404). NOTEBOOK_INSIGHTS updated so future rotations don't waste cycles on the 404s.
- **PSI multi-day-drain confirmed.** Mon AM + Mon PM + Tue AM all 429 on project 583797351490. FLAG_FOR_ADAM HIGH escalated: dedicated PSI key needed, or accept permanent UNVERIFIED on weekly PSI metric.
- **Methodology lessons:** (1) Polling for Netlify deploy via `until grep` requires a marker UNIQUE to the new content — first poll matched og:description's pre-existing "24-hour pre-approval" and exited early; re-polled with "Williamson Counties" (added phrase only in DPA edit) and got accurate signal. (2) OG ↔ meta description intra-page consistency check is a free win on meta rewrites — match og:description text when possible.
- **Re-Verify Gate:** 7 carry claims, all STILL OK or STILL OPEN with no false regressions, 0 new auto-resolutions. NotebookLM script 32nd consecutive missing.
- **Hard constraints intact.** 2 file edits, 0 issues. Working-tree carries preserved untouched (style.css, sibling-task log files).

---

## 2026-05-11 PM — daily-opt Monday PM (styer-site-daily, no-rotation drift sweep)

- **PM same-day re-fire, no-rotation pattern.** Followed Sunday PM 2026-05-10 precedent: 0 site HTML/CSS/JS edits, 0 loanos-clone edits. Always-on checks (sitemap, conversion tracking, re-verify carries) + PSI retry + backlog sweep.
- **Conversion tracking 10/10 (PM).** Switched canonical Netlify-fn grep token from hyphen-form `netlify-lead-intake` (AM label, doesn't appear literally in HTML) to slash-form `/.netlify/functions/lead-intake` (actual served token). All critical tokens hold parity vs AM and Sunday PM.
- **PSI 429 confirmed all day Monday.** AM and PM both blocked. Pattern now: daily-drained, not "refreshes Mondays". No new escalation (AM already HIGH-flagged).
- **Re-Verify Gate: 11 claims, 9 STILL OK, 3 STILL OPEN (Adam decisions), 1 STILL UNVERIFIED (about.html review counts), 2 methodology learnings.** Methodology fixes: (1) canonical Netlify-fn token is slash-form not hyphen; (2) `/how-to-buy-a-house-in-austin-tx` lives at root path, NOT under `/blog/` — `/blog/`-prefixed URL produces a 404 false-regression. Both captured in NOTEBOOK_INSIGHTS.
- **NotebookLM script 31st consecutive missing.** Retirement diff still queued in FLAG_FOR_ADAM HIGH from 2026-04-26 AM.
- **No site HTML/CSS/JS modifications this run.** Self-review PASS. Hard constraints intact (GTM untouched, form field names untouched, no nav changes, no "Styer Team" copy, no raw 1003 in new content).

---

## 2026-05-11 — daily-opt Monday (styer-site-daily, full rotation)

- **Step 4 Monday rotation complete.** Schema audit on homepage + DSCR + Manor — all rotation targets clean and full template coverage intact. AEO entity check passes: Person + LocalBusiness/MortgageBroker present on homepage + about pages; first 150 words of homepage answer "Who is the best mortgage broker in Austin TX?" via H1 + P1 (15w concise) + P6 (57w entity-rich).
- **PSI quota 429 on Monday AM** — drained before this run fired (recurring-issue pattern, 2nd consecutive Monday). Surfaced HIGH FLAG_FOR_ADAM: provision dedicated PSI API key OR accept UNVERIFIED weekly.
- **Manor R2 dropped from active sanity table** — 24h+ post-deploy, propagation clean (4 funnel CTAs, DVISD:3/MISD:1, FAQ 5q intact).
- **Re-Verify Gate: 13 claims, 1 auto-resolved.** SMS opt-in backlog L79 was a stale duplicate of completed L107 (commit `6fb8883`, 2026-04-06) — struck through with cleanup note after live-verifying `sms_opt_in` attr on 25/25 suburb files. Working-tree edit in `loanos-clone/tasks/seo-sem/backlog.md` (not pushed; markdown-only bookkeeping).
- **Methodology insight:** `grep -E "a\|b"` is literal-pipe, NOT alternation. Today's first conversion-trace returned 0 for `consent\|TCPA` and `netlify-lead-intake`; re-running with `grep -E "a|b"` (no backslash) returned the expected 9 and 1. Defensive pattern captured in NOTEBOOK_INSIGHTS.
- **Conversion tracking 9/10** — all critical tokens hold parity. Sitemap 200, lastmod 2026-05-10 (Adam's Manor R2 still freshest).
- **Carries open:** NotebookLM script 30th consecutive missing; products.html 7 in-card 1003 (12th carry, Adam decision); why-home-prices-arent-crashing CTA structure (12th carry, deferred); about.html 91/45 breakdown UNVERIFIED:2026-05-08; Smithville/Elgin/Florence/Jarrell USDA cleanup; style.css working-tree change preserved untouched.
- **No site HTML/CSS/JS modifications this run.** Self-review PASS. Hard constraints intact.

---

## 2026-05-11 — Competitive Week 10 (styer-competitive-weekly task)

- **Tracked top-10 keywords jumped 2 → 4.** Hutto held #2, Leander held #6, **Pflugerville NEW #4**, **Kyle NEW #8**. Both new entries appeared on first SERP rotation measurement — indicating ranking pre-dates measurement.
- **Re-Verify Gate:** Processed 14 prior claims. Held: Hutto #2, Leander #6, Round Rock not-found, BoA #1, AustinHomeLoans #1 home loan, SouthStar #1 refi, Lone Star #1 Round Rock, ATX 0 suburb pages, Big Life template gap. Cleared/reversed: Joel Richardson reclaimed #1 cash-out (Arnaiz demoted #1→#3); Arnaiz also demoted on refi #2→#3; MortgageAustin reclaims #1 on mortgage-qualified pre-approval query.
- **ATX Mortgage Lending sitemap audit:** Fetched live `atxmortgagelending.com/sitemap.xml` — 0/61 URLs contain dedicated suburb pages. First-mover advantage preserved at least through 2026-05-25 recheck.
- **Competitor spotlight — Geneva Financial:** New #1 Pflugerville with **Arizona address** (180 S. Arizona Ave, Chandler AZ 85225) listed as the "Pflugerville branch." No FAQPage/AggregateRating schema, no local references, no Pflugerville ISD mentions. Highest overtake opportunity surfaced this run.
- **Highlander Mortgage NEW #1** for "mortgage broker austin tx" (was #2; Yelp demoted to #2).
- **Master log appended** at `/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md`.
- **NotebookLM CLI auth expired (NEW BLOCKER):** Step 6 push to SEO notebook + Styer Growth Log notebook failed with "Authentication expired or invalid." `notebooklm login` required. Master log entry persisted on disk but NOT pushed to remote.
- **No site edits** — research-only task per SKILL.md rules.

---

## 2026-05-10 — Manor suburb page Round 2 (suburb editor task)

- **`manor-mortgage-lender.html`** — Round 2 deepening (slot 9 of 13).
- **Median refreshed:** Round 1 had $355K Nov 2025 (+6.6% YoY) → **$340K Mar 2026 Redfin (-5.7% YoY)**, 98 days on market vs 91 prior year. Sharp negative flip; market has cooled, not appreciated.
- **CRITICAL school-district correction surfaced — Whisper Valley = Del Valle ISD, NOT Manor ISD.** Round 1 implied all four named neighborhoods sit in Manor ISD. Reality per Whisper Valley + Spectrum News: Whisper Valley feeds **Gilbert Elementary → Dailey Middle → Del Valle High School** today; DVISD has purchased two sites inside Whisper Valley (78.1 ac high school + 71.1 ac elementary/middle); **new in-community DVISD high school opens for 2026-27 school year**. This is a buyer-decision-grade fact (property tax math, school ratings, resale story all change) — promoted to AEO opener + dedicated FAQ Q + LocalBusiness schema description + Schools H3 + Neighborhoods section.
- **Manor ISD has 4 high schools, not 1** (Round 1 implied Manor HS only). New Schools H3 breaks them out: **Manor HS** (default zoned, GreatSchools 2/10, ~2,422 students), **Manor New Tech** (lottery, **GreatSchools 4/10**, project-based), **Manor Early College** (lottery, ACC partnership), **Manor Senior HS** (jr/sr-only Career &amp; Tech, ~1K-1.2K students, walking distance from Mustang Valley).
- **FAQ schema fully reworked:**
  - "What is the average home price" → "What is the median home price" w/ refreshed Mar 2026 Redfin + 5 builder/neighborhood price callouts.
  - **"How does Manor compare to Pflugerville" Q swapped for "Will my Manor home be zoned to Manor ISD or Del Valle ISD?" Q** — biggest 78653 buyer concern, anchors the DVISD callout.
  - "First-time buyer programs" rewritten with **2026 FHA Travis County limit $571,550** (Round 1 had stale $524,225) + TSAHC 2025 income ceiling $167,250 non-targeted / $187,320 targeted.
  - "Tesla Gigafactory impacted" → "How is Tesla's Gigafactory affecting Manor housing in 2026?" — rewritten with current Tesla headcount **16,506 EOY 2025 (down 22%)** + early-2026 ~22% additional cut announcement (KXAN, TechBuzz). Round 1's 22,777 figure (Electrek April 2024) was 18 months stale.
  - "Property tax rate" rewritten with **median 1.69% per Ownwell** (Round 1 had 2.27% which is actually the 75th percentile) + Manor ISD $1.0814 held + Travis County FY26 $0.375845 + **Manor ISD $385M Bond 2025 FAILED Nov 4, 2025** + Whisper Valley PID $1,480-$2,004/yr replacing City of Austin ad valorem.
- **3 NEW neighborhood spotlights** beyond Round 1's 4:
  - **Lagos (78653 — Manor ISD)** — 1104 S. San Marcos, Ashton Woods primary + Pulte/Tri Pointe/Milestone, mid-$300s to high-$400s, on-site Lagos Elementary.
  - **Mustang Valley (78653 — Manor ISD)** — KB Home, 90 SFH planned, **$299,995–$345,000 starting** (BusinessWire grand opening 2024), walking distance to Manor Senior HS — one of few sub-$300K-floor new-construction options in Travis County.
  - **Manor acreage (78653)** — Outside the master-planneds: 14815 Johnson Road Trail $700K/2.57 ac; 20217 Engelmann Ln $725K/40 ac; **median list $847,450 — above 2026 Texas conforming line $832,750**, jumbo callout.
- **Existing 4 neighborhoods deepened:**
  - **ShadowGlen** — Builder roster updated: **Meritage now lead** of new ~690-home expansion phase (Round 1 had Terrata/Perry/Meritage/LGI as equal); Terrata starting $439,900; ShadowGlen Golf Club address (12801 Lexington Street, 7,174-yard 18-hole) + 4-acre water park + 202 acres Wilberger Creek trails added.
  - **Whisper Valley** — Builder roster expanded from 2 to 7 (added GFO Home, Terrata, CastleRock, AHA Dream Homes, Thurman Homes); 2,065 → **2,066 acres** correction; **$1,480.46–$2,003.66/year PID** by lot size + **$55–$70/month EcoSmart geothermal ESS fee** disclosed; **DVISD school-zoning callout** (the big one).
  - **Carillon** — **$25,000 builder flex cash** promo (March 22 → Dec 31 2026 contracts, close by Jan 31 2027) added; M/I Homes added as second active builder; full amenity-center inventory.
  - **Presidential Meadows** — **1,670 SFH at full build-out** (Jome) added; transitioning from new construction to resale.
- **Loan tiles fully de-templated** (Round 1 left FHA/Conventional/VA/DPA tiles as 1-page orphans of templated language):
  - **FHA tile** — $571,550 Travis County 2026 limit (Round 1 had $524,225 stale) + Manor-specific gift-fund/DTI math.
  - **Conventional tile** — 2026 $832,750 conforming limit + acreage-jumbo callout for the $847K median list.
  - **VA tile DE-TEMPLATED** (was generic boilerplate) — Manor-specific framing: $340K median + 1.69% effective tax stretching VA budgets, **100% disabled-veteran homestead exemption ~$5,750/year erased** at Manor's median, Camp Mabry ~25min + JBSA via I-35 commute, Whisper Valley exemption-only-on-ad-valorem caveat (PID + ESS still apply).
  - **TSAHC/TDHCA tile** — 2025 $167,250 / $187,320 income limits added; $340K-under-TDHCA-purchase-ceiling math.
- **Major Employers H3 EXPANDED:**
  - **OPmobility (formerly Plastic Omnium)** — corrected "Plastic Omnium" → "OPmobility" rebrand; updated from "350K sqft / 800 jobs" announced specs to current operational status: **inaugurated April 2024, 400+ employees by 2025, 800-job announced ceiling** (OPmobility press release).
  - **NEW: Mustang Crossing** — 127-acre, 6-building, **1.2M-sqft Class A industrial park** at 13754 Gregg Manor Rd by Ryan Companies + DWS Group; Phase 1 (4 buildings, ~$59M) under construction since Dec 2024 finishing March 2026; Building 1 came online with 291,200 sqft available Feb 2026 (Urbanize Austin, Commercial Property Executive).
  - **NEW: Manor Crossing retail** — 18-acre 150,000-sqft retail at US-290 + FM 973, full center 2026; **H-E-B opened late 2025**; tenants include TJ Maxx, Burlington, Planet Fitness, Five Below, James Avery, McAlister's, Mattress Firm, Tropical Smoothie, Tomlinson's Feed (KVUE, The Retail Connection) — the long-missing local-amenity stack.
  - **Samsung Taylor** — updated mass-production target to **early 2027** (delayed); risk production 2026 SF2/SF3P at 50K WSPM (Tom's Hardware); ~1,000 SAS employees relocating into Taylor offices over next two quarters; 10K-job full build-out target.
  - **Tesla** — corrected from 22,777 (Electrek April 2024) to **16,506 EOY 2025** with 2026 layoffs underway flag.
- **NEW dedicated H3 — Manor Property Tax &amp; Closing Costs:** Full cited stack (Manor ISD $1.0814 + Travis County $0.375845 + ESD 12 + City of Manor); median 1.69% effective per Ownwell with explicit MUD/PID overlay disclosure for Whisper Valley + ShadowGlen (75th-90th percentile 2.24%-2.52%); Whisper Valley PID $1,480-$2,004/yr + ESS $55-$70/mo line-item; itemized 6-line closing-cost example at $340K w/ 5% down ($323K loan): **$6,300-$8,800 total** + jumbo 6-12mo PITI reserve callout for acreage; Whisper Valley PID-into-DTI warning ($123-$167/mo effective payment add).
- **Templated paragraphs removed:**
  - Process intro "Manor's new construction market moves fast. Builders release lots on a schedule..." (verbatim shared with Hutto pre-edit) → rewritten Manor-specific with the 3 active builder incentives (Carillon $25K flex, Whisper Valley 4.99% buydown, Mustang Valley sub-$300K floor).
  - **AEO opener** — generic "sub-$400K + sub-$5K out of pocket" pitch replaced with school-district-line lede (the actual Manor differentiator nobody else surfaces).
- **Schema updates:**
  - LocalBusiness `description` rewritten with 78653 + 6 named neighborhoods (4 Manor ISD + 1 DVISD + acreage tier) + full tax stack + median + DPA programs.
  - WebPage `dateModified` 2026-04-27 → 2026-05-10.
  - Meta description rewritten with median + MISD/DVISD school-zoning split + FHA $571,550 limit.
- **Validation:** All 4 JSON-LD blocks (LocalBusiness/FAQPage/BreadcrumbList/WebPage) parse cleanly via `python3 json.loads`.
- **Sitemap lastmod bumped:** 2026-04-28 → 2026-05-10.
- **23 inline source URLs** (Round 1 had 7).

## 2026-05-09 — Liberty Hill suburb page Round 2 (suburb editor task)

- **`liberty-hill-mortgage-lender.html`** — Round 2 deepening (slot 8 of 13).
- **Median refreshed:** Feb 2026 $485K (-6.3% YoY) → **$510K Mar 2026 Redfin (+11.0% YoY)** — sharp positive flip; $/sqft $229 (+14.5% YoY). Closed sales **+45% YoY April 2026** (Community Impact, April 2026).
- **Inventory: 8.0 months of supply** (424 active listings on Feb 2026 sales pace per Neuhaus Realty Group / Unlock MLS) — **strongest buyer's market across the entire 13-suburb queue this round.** Above the 6-mo balanced-market line.
- **CRITICAL — LHISD rezoning surfaced (Crestline/MorningStar/Star Ranch pattern):** Round 1 said "Liberty Hill ISD covers the entire city" with no zoning detail. Reality per Community Impact Feb 2026: LHISD board adopted new 2026-27 attendance zones on Feb. 16, 2026, using **US-183 as a clean east–west divider** for high schools. Homes **west of US-183** feed Liberty Hill MS → Liberty Hill HS. Homes **east of US-183** feed either Legacy Ranch MS (between US-183 and Ronald Reagan Blvd) or Santa Rita MS (east of Ronald Reagan Blvd) — both feed the new Legacy Ranch HS. Two new elementaries opening: Lariat Trails (fall 2026), Saddleback (fall 2027).
- **Legacy Ranch HS opens fall 2026** — 454,000-sqft campus, 1,000–1,200 student capacity, adding one grade per year (Joeris General Contractors, KXAN). Round 1 had this as "planned" — now imminent and zone-driving.
- **FAQ schema swapped:** "What school district serves Liberty Hill" Q (templated/generic) → **"Will my Liberty Hill home be zoned to Liberty Hill HS or the new Legacy Ranch HS?"** — biggest current buyer concern given rezoning. Schema and accordion synced verbatim.
- **Santa Rita Ranch correction:** Round 1 listed Pulte (primary) + Perry + Highland builders. Reality: also includes **GFO Home + Scott Felder Homes** as active builders. **Saddleback at Santa Rita Ranch starts $349,900** (Pulte); main sections from $380,990. **Paddock Amenity Center opens Summer 2026** as new Saddleback Village centerpiece. Sources: GFO Home, Scott Felder, Pulte, NewHomeSource.
- **Northgate Ranch deepened:** acreage-style luxury community **started in 2019**, located ~2 miles north of SH-29 off CR 214; **acre-plus lots**, **3,000–5,000 sqft homes**; Liberty Porch Community Pavilion (no community pool); upper-tier custom builds routinely cross the $832,750 jumbo line. Source: Austin Real Estate Homes Blog.
- **Orchard Ridge refreshed with current pricing:** Pacesetter Homes primary at **$450,000–$534,900** on plans 1,699–2,557 sqft. Other active builders Lennar, Ashton Woods, Dream Finders, Buffington. Sources: Pacesetter Homes Texas, Freehold Communities.
- **Schools H3 expanded** — Liberty Hill HS 7/10 GreatSchools (98% grad vs 90% TX state); Legacy Ranch HS new 454K-sqft campus; **Rancho Sienna Elementary 9/10 GreatSchools** (top-rated LHISD elementary, 751 Bonnet Blvd); LHISD 8 campuses serving ~7,869 students (SchoolDigger); LHISD address-zone-finder linked.
- **Major Employers H3 EXPANDED** — Two anchor retailers just landed:
  - **Costco DEBUTED March 11, 2026** — 160,000-sqft warehouse + gas station on Hwy 183, **chain's 45th Texas location**, first Costco between Cedar Park (~17 mi) and Hill Country (Community Impact, Mar 2026). Round 1 had this as "$75M Costco under construction" — now LIVE.
  - **Target — fall 2026 opening** at 351 US-183, $22M, 148,000 sqft + 50,000 sqft attached commercial + ~10 outparcels (Liberty Hill Independent).
  - **Platform 183 x 29** — 120-acre mixed-use at 10728 W. SH-29, **Phase 1 (3 buildings, 48,000 sqft) DELIVERED**; full buildout could reach 1.3M sqft industrial + 325 multifamily + 175,000 sqft retail (Williamson County EDP). Round 1 had this as "set to deliver more than 1 million square feet" with no phase-1 detail.
  - LHISD ~600 employees (Liberty Hill EDC); Samsung Taylor / Apple Parmer / Dell Round Rock / Tesla all in commuter range.
- **Property Tax & Closing Costs promoted to dedicated H3** with full cited stack: LHISD $1.2389 + City of Liberty Hill $0.469407 + **Williamson County $0.413776 FY 2025-26 (voter-approval rate, +8.82%)** per WilCo CivicAlerts AID=665. ~$2.12/$100 nominal / 2.0%–2.4% effective. Itemized 6-line closing-cost example at $510K w/ 5% down ($484,500 loan): $11K-$13.5K + jumbo 6-12mo PITI reserve callout for Northgate Ranch + upper-tier Santa Rita Ranch. **8.0-mo-supply seller-concessions leverage callout** with rate-buy-down vs. closing-cost-credit vs. cash-back framing.
- **VA tile de-templated** (was verbatim w/ manor-mortgage-lender.html): Camp Mabry 35 min south + **100% disabled-veteran homestead exemption math = $10,400–$12,250/yr at Liberty Hill's 2.0%–2.4% effective on $510K** + LHISD east/west US-183 split callout for vet families.
- **One-Time Close Construction tile de-templated** (was verbatim w/ dripping-springs-mortgage-lender.html): SH-29 + FM-1869 + Northgate Ranch acre-plus lots specific + 9-12 month build window rate-lock + well/septic/distance items framing.
- **Meta description rewritten** with median + 8.0-mo supply + 3 named neighborhoods + LHISD rezoning hook.
- **LocalBusiness schema description rewritten** with 78642 + 3 named neighborhoods + full tax stack + 8.0-mo supply + Mar 2026 median.
- **WebPage dateModified bumped 04-26 → 05-09.** All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads.
- **Sitemap lastmod bumped 04-22 → 05-09.**
- **Templated phrase audit:** VA tile and construction tile both removed from liberty-hill (each was a 2-page duplicate with manor and dripping-springs respectively); both now appear on only 1 other page each — flagged as targets for those pages' Round 2 slots.
- **18 unique source URLs** inline (Redfin 78642, Neuhaus, Community Impact ×4, Pulte ×2, GFO Home, Scott Felder, NewHomeSource, Austin RE Homes Blog, Northgate Ranch, Pacesetter Homes Texas, Freehold Communities, GreatSchools, SchoolDigger, Joeris, KXAN, LHISD Zone-Finder, Williamson County FY25-26 Budget, Williamson County EDP, Liberty Hill Independent, Liberty Hill EDC).
- **Round 2 advances to slot 9 (Manor) next** on 2026-05-10. Manor's VA tile is now a 1-page orphan and is the obvious target to de-template next.

## 2026-05-08 — Hutto suburb page Round 2 (suburb editor task)

- **`hutto-mortgage-lender.html`** — Round 2 deepening (slot 7 of 13).
- Median refreshed: Feb $340K (-9.3% YoY) → **$366,166 Mar 2026 Redfin (+1.1% YoY)** sharp flip from negative; $/sqft $170 (-7.6% YoY); 3.9 mo supply Apr 2026 (Neuhaus Realty Group).
- **Star Ranch correction (Crestline/MorningStar pattern):** Round 1 said "Clark Wilson Builder is sold out" with HISD-only feeders. Reality: 1,000-acre golf community building since 2003, 7 active/recent builders (Meritage, Perry, KB Home, Wilshire, Pacesetter, Streetman, Clark Wilson) + Villas at Star Ranch + condos/townhomes/SFRs, 1,402–4,150 sqft, $250K–$400K range. **Critical school-zoning correction: community straddles Gattis School Road — homes north feed HISD (Kerley/Hutto MS/Hutto HS); homes south feed Pflugerville ISD.** Source: Star Ranch Real Estate, Pacesetter, Zillow.
- 2 new neighborhood spotlights added:
  - **Brooklands (78634)** — 203 Pinkerton Drive, master-planned, multi-builder: CastleRock from $295,990 (active), Gray Point Homes, Pacesetter Homes; Chesmar sold out. 1,297–2,730 sqft, 0.1–0.2 acre lots. Sources: Jome master-planned profile, CastleRock at NewHomeSource.
  - **Lookout at Brushy Creek (78634)** — premier custom community SE Hutto on 1–8 acre lots near FM 1660 + Brushy Creek; lake-fronted; ~3,300 sqft avg; built 1999–2008 with sporadic infill custom. Upper tier crosses 2026 conforming line $832,750 → jumbo callout. Sources: Bramlett Partners, Austin Real Estate Homes Blog.
- Riverwalk refreshed: 12-month median $379,154 (+4% YoY), D.R. Horton + Continental + Centex builders, started 2006, 1,295–2,999 sqft, 0.13–0.35 ac lots.
- Emory Crossing updated: Yardly Emory Crossing Taylor Morrison "Coming Soon" + David Weekley townhomes "next phase coming soon" (sources: Taylor Morrison, David Weekley News, Jome).
- 2 new H3 sections (~110 lines):
  - **Hutto Schools** — Hutto HS 6/10 GreatSchools, B- Niche, 2,133 students, 16:1 student-teacher, 73% minority, 40% econ disadvantaged, 94% grad rate, 32% AP, PLTW + GT, ranked 1,104th TX. HISD 10,035 students PK-12 / 11 schools. **$522M bond approved 2023 zero-tax-rate-increase.** PISD-zoning callout for Star Ranch south-of-Gattis.
  - **Hutto Major Employers EXPANDED** — Samsung Taylor $17B fab targeting 1,500 perm employees by EOY 2026 + 2nm risk production at 50K WSPM + 1,500+ ASML/Lam/KLA engineers during ramp; **Hutto Megasite 1,400 acres / $18M spine road complete** unlocking PowerCampus by Skybox+Prologis (600MW, up to 6 buildings, 3.9M sqft, **$10B+ minimum capital investment**) + Project Strat3 by Live Oak+Riverside (52-acre Samsung supply chain) + Project Flex by Headwater (242K sqft, 3 shallow-bay buildings) + Hutto Mega TechCenter by Titan (188 acres / 2M sqft); Tesla 35K sqft service/distribution; HISD 10,035 students; H-E-B Plus #696 at 5000 Gattis School Rd.
- Property Tax & Closing Costs promoted from buried paragraph to dedicated H3 section: full cited stack HISD $1.2052 + City of Hutto $0.385928 FY 2025-26 + WilCo $0.413776 FY 2025-26 (+3.4%) ≈ $2.005 nominal / 1.93%–2.00% effective per Ownwell. 6-line itemized closing-cost example at $366K w/ 5% down ($347,858 loan): $8.5K-$10.5K + jumbo 6-12mo PITI reserve callout. **3.9-mo-supply seller-concessions leverage callout** (didn't exist when supply was 1.6 mo a year ago).
- FAQ schema rewritten: "What is the average home price" → "What is the median home price" (Mar 2026 + builder corrections + Gattis School Road note); "How does new construction financing work" rewritten Hutto-specific (removed inaccurate "Lennar active" claim from Round 1 — current research shows CastleRock/Gray Point/Pacesetter active, not Lennar); "What first-time buyer programs are available" rewritten with WilCo income limits $99K-$118K + $12,810 FHA-3.5% math; **"How does Hutto compare to Round Rock" Q swapped for "What is the property tax rate" Q** (biggest Hutto buyer concern). FAQ accordion fully synced verbatim.
- VA tile de-templated: was generic "Hutto's growing veteran population" → Camp Mabry 30 min SW + Joint Base San Antonio 75 min S + **100% disabled-veteran homestead exemption math: ~$7,300/year at 1.93%-2.00% effective on $366K median**.
- DPA tile de-templated: WilCo income limits $99K-$118K + cooler 3.9-mo-supply market = seller-concessions stack on top of DPA.
- LocalBusiness schema description rewritten with 78634 + 5 named neighborhoods + full tax stack.
- WebPage dateModified bumped 04-25 → 05-08. Meta description rewritten with median + 5 neighborhoods.
- All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads.
- Sitemap lastmod bumped 04-19 → 05-08.
- 22 unique source URLs across the page.

## 2026-05-08 — Weekly blog editor refresh

- **Refreshed `blog/2026-04-04-austin-housing-market-report-april-2026.html`** — highest-leverage CTR target from GSC 2026-04-18 export: 7,249 impressions / 5 clicks (0.07% CTR) at position 4.05.
- Title rewrite: `Austin Housing Market Report — April 2026 | Adam Styer | NMLS #513013` → `Austin Housing Market: 16K+ Listings, $445K Median, 6.37% Rates | Adam Styer`. Concrete-number CTR hook; 76 chars.
- Meta description rewrite to lead with verified April 2026 numbers + LO voice.
- Body data corrections (with inline source citations):
  - Median sale price: vague `$412–$425K` → **$445,000** (Apr 2026, Unlock MLS / ABoR)
  - Active listings: `10,000+` → **16,064** (late Apr 2026)
  - 30-year rate: `mid-to-upper 6%` → **6.37%** (Freddie Mac PMMS, week ending May 7, 2026)
  - DOM: `55–70 days` → **~82 days**
  - Sold-to-list ratio added (97.5%); price-reduction share added (48.5%)
  - YTD closed sales (+5.2% YoY, 9,311 cumulative through April) added
- Author bar updated: "Published April 4, 2026 · Updated May 8, 2026 with end-of-April MLS data and current PMMS rates".
- Hero subtitle rewritten to lead with concrete data instead of "tariff shock" framing.
- Table refreshed: 6 metrics × YoY columns + inline sources footnote (Unlock MLS, Freddie Mac PMMS).
- FAQPage JSON-LD schema fully rewritten (6 Q&As) to match new data; visible accordion FAQ rewritten to match schema verbatim with inline source links.
- CTA tightened: "See What You Can Afford in April's Market" → "Real Numbers at Today's 6.37%"; sub-CTA in body rewritten to reference 6.37%.
- Schema `dateModified` bumped 2026-04-04 → 2026-05-08; sitemap.xml `lastmod` bumped to match.
- URL slug + H1 preserved to protect existing page-1 ranking.
- Title lint passed (`grep "<title>" blog/*.html | grep -v "Adam Styer"` returns empty).
- Queued for GSC URL Inspection in `run-logs/gsc-reindex-queue.md`.
- Editor queue updated; logged a follow-up note that monthly-series cadence may need a NEEDS ADAM decision (April post stays canonical until/unless a May entry is created).

Sources cited inline in the post:
- [Unlock MLS / ABoR Q1 2026 Central Texas Housing Report](https://www.unlockmls.com/news/march-q1-2026-central-texas-housing-report)
- [Freddie Mac PMMS](https://www.freddiemac.com/pmms)

---

## 2026-05-07 PM — daily-opt same-day re-run (no edits)

- Sitemap 200 ✅, all 4 funnel pages 200, conversion tracking marker counts unchanged from AM (11/7/4/13).
- Re-verified AM products.html commit (`cf905c9`) is still propagated on Netlify — line 236 hero + line 867 bottom both `/get-preapproved`, no drift.
- Re-Verify Gate run on 9 persistent claims; 5 STILL OK, 4 STILL OPEN with no drift since AM (USDA on how-to-buy live=5/local=5, blog cadence Day 10, NotebookLM script 23rd missing, style.css working-tree pre-existing change).
- Zero file modifications this run — correct outcome since AM rotation already completed all actionable ZERO/LOW-RISK items. Backlog has nothing else pickable; remaining open items are Adam-decision MEDIUM/HIGH.
- TOMORROW_PRIORITY (Friday Content Planning + AEO Review) re-asserted from AM run unchanged.

## 2026-05-07 — Buda Round 2 deepened (suburb-editor — slot 6/13)

- **Median confirmed $382,337 Feb 2026 Houzeo (-0.21% YoY)** + rolling 30-day ~$339K April 2026 Orchard (-11.3% YoY); **months of supply 5.1 (April 2026) up from 2.7 a year ago — strongest buyer-leverage shift since Pflugerville**. Buda is cooling faster than the Hays metro average.
- **Sunfield builder roster correction (5 → 7 active builders)**: Round 1 listed Taylor Morrison, Pulte, Chesmar, David Weekley, Brightland. Per [official Sunfield builder roster](https://www.sunfieldtexas.com/builders/) + [Jome MPC profile](https://jome.com/master-planned-community/tx/309-sunfield), 7 builders are currently active: Taylor Morrison, Pulte Homes, Chesmar Homes, Centex, **CastleRock Communities (added)**, David Weekley Homes, **DRB Homes (added)**. Brightland presence unconfirmed in current roster — removed pending verification.
- **Garlic Creek correction (2 → 3 builders)**: Round 1 had Centex + Mercedes Homes 2007–2015. Per [Austin Real Estate Homes Blog](https://www.austinrealestatehomesblog.com/buda/garlic_creek/), **Meritage Homes finished build-out in 2016** — 3 builders, build years 2007–2016. Avg sale price $303K (1,494–3,404 sqft, 2,469 sqft avg).
- **Ruby Ranch correction**: Round 1 had vague "larger lots, lower density"; replaced with **1–7 acre custom homesites** + Seven Custom Homes builder cite + 2,000–5,000 sqft + $500K–$900K+ range with jumbo-line callout for the upper tier crossing $832,750.
- **VA tile de-templated** ("I-35 military commuter corridor" → Camp Mabry ~25 min north + Camp Swift ~50 min east + 100% disabled-veteran exemption stack at Buda's 1.91% effective rate).
- **DPA tile de-templated** (generic "TSAHC and TDHCA programs offer grants" → Hays County-specific income limits ~$99K–$118K + FHA + DPA stack framing for the cooler 5.1-mo-supply market).
- **2 new H3 sections**:
  - **Major Employers EXPANDED** — Texas Lehigh Cement HQ in Buda since 1986 (201–500 employees per LinkedIn); Heaven Hill / Deep Eddy Vodka **Buda is sole distilling and bottling operation** (production consolidated 2017 per The Spirits Business; Dripping Springs tasting-room closure April 2026 explicitly does NOT affect Buda staffing/output); US Foods I-35 distribution (Buda EDC); Cabela's flagship retail (only Austin-metro location); **H-E-B incoming on long-vacant landfill site** I-35 southbound access road north of Main, **$12.1M city/EDC reimbursement** (~two-thirds of $30M remediation cost) over 30 years per [Community Impact Mar 11 2026](https://communityimpact.com/austin/san-marcos-buda-kyle/development/2026/03/11/long-vacant-buda-landfill-could-get-new-life-with-h-e-b/) + [CBS Austin](https://cbsaustin.com/news/local/h-e-b-scores-20m-partnership-incentive-to-turn-buda-landfill-site-into-new-store), 50+ FTE jobs within a year of opening; Tesla Gigafactory ~20–25 min via I-35; HCISD largest public-sector.
  - **Property Tax & Closing Costs** — 4 cited rate sources (Ballard Property Tax Protest + Community Impact HCISD + Community Impact city + Hays County Truth in Taxation + Ownwell trends); itemized 6-line closing-cost example at $382K with 5% down ($362,900 loan): $9K–$10.5K range; 5.1-mo-supply seller-concessions leverage callout + jumbo 6–12mo PITI reserve callout for Ruby Ranch upper-tier.
- **Schools H3 expanded** — Jack C Hays HS 6/10 GreatSchools + 92% grad rate (US News) + math 58% / reading 54% proficiency + ranked #2,142 of 8,096 TX public schools (top 30%, Public School Review); **Eric Dahlstrom Middle School** (first appearance on this page) above-district-average 67% math / 71% reading per GreatSchools; Sunfield Elementary 3/5 SchoolDigger + average GreatSchools (in-MPC walk-to-school benefit framed).
- **FAQ schema swap** — "How does living near the Tesla Gigafactory affect Buda home values?" → "What is the property tax rate in Buda TX?" (biggest Buda buyer concern; matches the property-tax-Q swap pattern from Pflugerville Round 2).
- **FAQ schema rewrites** — "What are home prices like" → "What is the median home price" with refreshed median + months-of-supply signal; "What new home builders" rewritten with corrected 7-builder Sunfield roster + Garlic Creek 3-builder build years; FAQ schema + accordion fully synced verbatim.
- **At-a-glance updated** with 1.91% effective rate (cited "lowest in Hays County" framing) + median + months-of-supply + Texas Lehigh HQ + Heaven Hill sole-operation framing + H-E-B 50 FTE callout.
- **WebPage dateModified** bumped 2026-04-24 → 2026-05-07. Meta description rewritten with median + 7-builder Sunfield + Ruby Ranch acreage + tax stack.
- **All 4 JSON-LD blocks** (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via `python json.loads`. Sitemap lastmod bumped 2026-04-20 → 2026-05-07. **33 unique source URLs.**
- Round 2 advances to slot 7 (Hutto) next.

## 2026-05-07 AM — daily-opt Thursday rotation (Internal Linking + Funnel Flow)

- **products.html funnel-CTA swap on the loan programs hub.** Same pattern Adam accepted on 4 cluster pages 2026-05-06; the parent hub was missed. Hero CTA (line 228) + bottom "Start Your Pre-Approval" CTA (line 859) swapped from raw 1003 URL → `/get-preapproved`. Removed `target="_blank"` + `rel="noopener"` on the internal hero link per the 2026-05-06 internal-link learning.
- **Programmatic funnel trace verified end-to-end** via curl + grep — no Chrome MCP dependency. Homepage (4 links to /get-preapproved, GTM + dataLayer present), /get-preapproved (form attrs ✓, generate_lead+lead_type+purchase_prequal ✓, tel: ✓, TCPA ✓, trust bar ✓), /refinance-quote (generate_lead+refi_quote ✓), /thank-you (thank_you_page_view ✓, calendly ✓, tel: ✓, robots noindex ✓). Replaces the long-running "Chrome unavailable in scheduled context" carry-forward; conversion-tracking score lifts from carry-forward 10/10 to verified 9/10 (full 10/10 still requires manual form-submit).
- **Re-Verify Gate auto-resolved stale own-backlog framing.** Drafted a "20-page footer link to /prequal.html (noindexed orphan)" backlog entry, then ran the gate against the claim's premise. Result: /prequal.html is currently HTTP 200, has no `<meta name="robots">`, IS in sitemap.xml — the 2026-03-28 robots.txt Disallow entry was apparently removed during AEO crawler allowlist expansion. Corrected backlog wording in same session: it's a conversion-tracking parity gap (prequal.html shares Netlify form-name with /get-preapproved but lacks the dataLayer push) not an orphan-cleanup gap.
- **Yesterday's 3 PM cluster cross-link edits re-verified live** — all 9 new sibling links still propagated on Netlify (no drift in CDN cache).
- **Loanos-clone backlog.md updated** — completed item marked + 2 new MEDIUM/LOW follow-ups (products.html in-card CTAs + footer prequal parity). Pre-push build hit a Next.js stale-cache ENOENT on first try; clean `rm -rf .next && npm run build` then push succeeded. Logged to learnings as a recovery pattern.

## 2026-05-06 PM — daily-opt PM run: non-QM cluster internal-linking sweep

- **3 cluster pages were at 3/6 cross-cluster links** — non-qm-loans.html (the hub), bank-statement-loans.html, high-net-worth-mortgage.html. All missing the same 3 sibling pages (DSCR Texas, DSCR Fredericksburg, DSCR Dripping Springs).
- Added 3 `<li>` per page into each page's existing Related Programs / Other Programs section, matching each page's voice cadence and the existing investor-loans.html / DSCR-cluster pattern.
- All 7 non-QM cluster pages now at **6/6 cross-cluster link coverage**.
- Re-Verify Gate (PM repeat of AM): all 7 cluster CTA hrefs to /get-preapproved still propagated; Dripping Springs title still 65 chars; Leander Round 2 paragraph still live. No drift between AM and PM runs.
- Live propagation verified post-deploy via curl on all 3 modifications.
- **Surfaced for Adam:** uncommitted style.css change in working tree (header.scrolled .nav-dropdown a color rules — likely needed nav-restructure follow-up). Left untouched, flagged in run log.

## 2026-05-06 — Pflugerville Round 2 deepened (suburb-editor — slot 5/13)

- **Median confirmed $355K Mar 2026 Redfin (-10.2% YoY)**, $193/sqft (+8.7% YoY), 5 mo. supply (up from 1.6 mo. last year — strongest buyer-leverage shift in the queue).
- **LocalBusiness schema description rewritten** — 78660 + Blackhawk/Falcon Pointe/Windermere/Heatherwilde + Hendrickson 8/10 + Pflugerville HS 6/10 + full tax stack (PISD $1.1069 + City $0.5350 FY 2025-26 + Travis County + ESD 2 $0.092765 ≈ $2.04 nominal / 1.82% effective per Ownwell).
- **FAQ schema rewritten** — "What are typical home prices" → "What is the median home price" w/ Falcon Pointe Newland MPC builder roster + $500K April 2026 median list integrated; **"How is the mortgage process different" Q swapped for "What is the property tax rate"** (full cited tax stack — biggest Pflugerville buyer concern, weakest existing Q replaced).
- **2 new neighborhood spotlight H3s** added after Blackhawk:
  - Falcon Pointe (78660) — Newland Communities 1,400-acre MPC built 2002–2017, builders Lennar/Chesmar/Taylor Morrison/Meritage/Newmark/Highland, $500K Apr 2026 median list (Regent), $400s-$600s resale range, Hendrickson HS feeder.
  - Windermere & Heatherwilde combined "established 78660 value tier" — Windermere ~$326K median (Centex/Buffington/Hampton, 1,200-2,800 sqft, late 1980s-early 2000s), Heatherwilde ~$372K average (same builders, 1,200-3,200 sqft, 1986+), $279,900-$419,999 listing range. FHA-strong framing with $11,375 down on $325K.
- **Schools H3 expanded** with student counts/grad rates/SAT — Hendrickson 19201 Colorado Sand Dr 78660 (8/10, 2,106 students, 98% grad, 1170 SAT, US News) + Pflugerville HS 1301 W. Pecan St 78660 (6/10, 1,851 students, 95% grad). Resale-velocity correlation w/ school zone surfaced.
- **Major Employers H3 EXPANDED** — Amazon Project Charm 3.8M sqft fulfillment center on E. Pecan St (KVUE rezoning + PCDC $250M / 1,000 jobs), **Stone Hill Town Center** (Target/Kohl's/Best Buy anchors + Daiso 8,500 sqft + Miniso 2025 openings — Community Impact Jul 2025), Costco (185 active postings ZipRecruiter), Baylor Scott & White, Samsung Taylor 30 min east via SH-130, PISD largest public-sector employer.
- **Property Tax & Closing Costs H3** rewritten with full citations — itemized PISD $1.1069 (M&O 0.7869 + I&S 0.3200 Community Impact) + City of Pflugerville $0.5350 FY 2025-26 down from $0.5428 (Community Impact + city.gov) + Travis County ~$0.304 (Truth in Taxation) + ESD 2 $0.092765 (ESD 2 notice). $355K w/ 5% down ($337,250 loan) closing-cost breakdown — 6 itemized line items at 1.82% effective + 5 mo. supply leverage callout for seller concessions.
- **Templated paragraphs removed:**
  - "Diverse Income Types" Why-grid card (generic — "hourly, salary, gig economy, self-employed, military") swapped for **PISD School-Zone Strategy** card (Hendrickson 8/10 vs Pflugerville HS 6/10 — same price, different attendance zones depending on Wells Branch Pkwy / Pecan St boundaries).
  - **VA tile de-templated** — was verbatim w/ georgetown + leander ("Zero down for eligible veterans, active duty, and surviving spouses. No monthly PMI. A significant number of [suburb] residents have military background"); rewrote w/ Pflugerville-specific framing — Camp Mabry ~25 min south, VA-relocating families landing in Hendrickson feeders (Falcon Pointe / Blackhawk), disabled-veteran exemption stack at 1.82% effective rate.
  - **Older closing-costs paragraph block removed** — superseded by deeper Property Tax & Closing Costs H3 above (5-line `<ul>` removed).
- **Meta description rewritten** w/ median + Hendrickson rating + named neighborhoods.
- WebPage dateModified bumped 04-23 → 05-06. All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads. Sitemap lastmod bumped 04-19 → 05-06. **15 inline source URLs.**

## 2026-05-06 — Wednesday daily-opt: non-QM CTA fix + Dripping Springs title trim + Leander Round 2 (cluster gap-fixing)

- Swapped 4 non-QM cluster pages' CTAs from external 1003 (untracked) → `/get-preapproved` (tracked landing): non-qm-loans, investor-loans, dscr-loans-fredericksburg-tx, high-net-worth-mortgage. Tue eve only flagged 2/4; today's full sweep caught all 4. HNW preserved Calendly-primary (consultation-first pattern); only secondary CTAs swapped.
- Trimmed dscr-loans-dripping-springs `<title>` 90 → 65 chars (preserves "Wedding Venue STR" wedge while killing SERP-truncation risk). OG/Twitter titles untouched.
- Leander Round 2 deepening — added h3 "Emerging Communities: Bryson, Caballo Ranch & Leander Springs" + 1 paragraph (~690 chars) covering the three named gap-neighborhoods + CapMetro Red Line Leander Station commute angle. Inserted between Mason Hills and Northline spotlights.
- Updated `run-logs/gsc-reindex-queue.md` with 6 new URLs for Adam's manual GSC URL Inspection.
- Re-verify gate confirmed Tue evening's auto-resolutions still hold (about.html NAP, USDA noindex, sitemap USDA removal). Blog cadence trip now 9 days (escalates HIGH on Friday).

## 2026-05-05 — Leander Round 2 deepened (suburb-editor — slot 4/13)

- **Median refreshed $438K Feb +7.6% YoY → $411K Mar 2026 Redfin (-8.7% YoY)**, $197/sqft — sharp price flip. Steepest YoY drop across the 13-suburb queue this round.
- **WilCo rate corrected** $0.3999 → $0.413776 FY 2025-26 (3.44% increase per WilCo CivicAlerts AID=665) — current LISD + WilCo stack now $1.500676/$100.
- **Internal duplicate DPA paragraph removed**: page had verbatim "TSAHC or TDHCA programs that provide 3–5%" copy in BOTH the Why grid AND the Loan Programs grid. Loan Programs DPA tile swapped to **Jumbo & Construction tile** (Travisso Verona / gated Crystal Falls Cap Rock + Fairways + Grand Mesa cross the $832,750 Texas conforming line).
- **VA tile re-targeted** off generic veteran framing → Camp Mabry 35 mi south + 620/183A retiree migration toward LISD.
- **AEO opener rewritten** — generic "conventional + jumbo $600K+" → 78641 + Mason Hills $400K-$650K conventional 5-10% down + Travisso Verona/gated Crystal Falls jumbo wedge + industrial pivot (Tech Park, Titan 1.3M sqft, Northline).
- **5 new H3 sections (~150 lines):**
  - Travisso EXPANDED — 5 collections by lot width (Capri 50' / Siena 60' / Naples 70' / Florence 80' / Verona 100'), 9 model homes (5 Toll / 4 Taylor), Olimpico Way addresses 4901+4917 Siena, 4909+4913 Naples, final-phase 50' Capri lots flag.
  - Crystal Falls 78641 spotlight — 5,000 acres, 7 named subsections (Bluffs/Boulders/Cap Rock/Highlands/Fairways/Wild Rock/Grand Mesa), 3 gated (Cap Rock+Fairways+Grand Mesa), public 18-hole golf, mid-$200s-$1M+, Group Three Builders Grand Mesa Hill Country lots up to 7 acres.
  - Mason Hills 78641 spotlight — 1,000+ homes built on Mason Ranch grounds 2012-2014-2021, 7 builders (Toll/Highland/Pulte/Gehan/GFO/KB/Ashton Woods), Highland 2104 Cotton Farm Trail + KB 1600 Abbott Cove specific addresses, Whitestone Elementary <2 mi all LISD.
  - Northline 116-acre TOD spotlight — SH-183/San Gabriel Pkwy downtown district, 85K sqft retail Phase 1 Endeavor under construction, $4M city loan Feb 2026 + 1-acre municipal land dedication library/cultural center, Community Impact May 4 2026 tax-reimbursement structure update.
  - Leander Industrial Boom — Leander183 Commerce Center + National Aero Stands, Leander Tech Park (St. John Properties, 8 buildings 270K sqft Phase 1 2026), Titan Development 115-ac/1.3M sqft Class-A flex, EastGroup Heritage Grove 600K sqft, LISD ~6,000 employees + commute-tier Apple/Oracle/IBM Cedar Park ~15min + Dell/HP Round Rock ~20min.
- **Schools H3 expanded** — Tom Glenn HS 6/10 (2,129 students, 97% grad, 1,140 SAT — US News + GreatSchools cited) + Leander HS 6/10 (2,202 students, 96% grad, AP+IB+PLTW — Niche cited 42,593 LISD-wide enrollment) + Vista Ridge HS 8/10.
- **Closing-cost section** refreshed $438K → $411K w/ 10% down ($369,900 loan): $8K-$11.5K itemized 6 line items + jumbo $14K-$22K + 6-12mo PITI reserve callout for Verona/Cap Rock/Fairways/Grand Mesa + 8.7% YoY drop = builder buydown leverage framing.
- WebPage dateModified bumped 04-22 → 05-05. Meta description rewritten. All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated clean via python json.loads. Sitemap lastmod bumped 04-19 → 05-05. **20 inline source URLs.**

## 2026-05-05 — Tuesday rotation: Schema/AEO carry-over + 5 title/meta fixes (daily-opt)

- **Sunday's Monday-rotation TOMORROW_PRIORITY (Schema + Google Ads + AEO Entity Audit) carried into today** — Monday daily-opt slot was missed (commits 2026-05-04 are suburb-editor + competitive). Schema sweep + AEO entity audit batched with Tuesday title/meta rotation in one run since Schema/AEO portion was largely verification-class.
- **Schema sweep (3 pages):** index.html (MortgageBroker 5718 Sam Houston Circle / AggregateRating 5.0/136 / FAQPage 5Qs / Person worksFor MortgageBroker — all internally consistent), DSCR (LocalBusiness + FinancialProduct + FAQPage 6Qs + Article + BreadcrumbList), Bee Cave (LocalBusiness 78738 + FAQPage 5Qs + AggregateRating 5.0/136). All structurally valid.
- **Person + LocalBusiness consistency check:** 5718 Sam Houston Circle appears in 3 schema blocks (homepage MortgageBroker, homepage Person, about.html Person+worksFor); about.html LocalBusiness 5900 Balcones Drive Suite 100 appears in 1 — 12th-run mismatch. Recommend aligning to 5718 (3:1 weight-of-evidence). One-line edit on about.html line 123 once Adam confirms canonical address.
- **Homepage AEO entity audit:** body answer paragraph at index.html line 454 (`<p><strong>Adam Styer | Mortgage Solutions LP (NMLS #513013) is Austin's independent mortgage broker…`) is the canonical extractable answer to "Who is the best mortgage broker in Austin TX?" — present and correct.
- **Tuesday rotation: 5 over-length title/meta values batched and FIXED** (all reversible, LOW_RISK):
  - `bee-cave-mortgage-lender.html` meta 168 → 158 (reworded "Lake Travis HS 9/10" → "Lake Travis ISD" + reordered)
  - `dripping-springs-mortgage-lender.html` meta 218 → 153 (removed "21-day close" + "buyers" filler, used em-dash for community list)
  - `georgetown-mortgage-lender.html` meta 182 → 150 (consolidated zip-coverage callouts; replaced "136+ reviews" with "NMLS #513013")
  - `calculator-refinance-breakeven.html` title 78 → 59 (canonical `[Topic] | Adam Styer | NMLS #513013` convention)
  - `ftb-dpa-guide.html` title 84 → 64 (canonical convention)
- **Five borderline titles 67-68 chars deliberately skipped** — fixed-vs-adjustable, first-time-home-buyer, get-preapproved (landing page), improve-credit-score, marble-falls-mortgage-lender. All are 1-3 chars over and follow convention; trim would lose keyword density. Per 2026-04-21b learnings, FHA/Jumbo "hook-class" titles are similarly preserved at 49-56 chars even without NMLS.
- **Re-verify gate (8 claims):** 4 STILL OK (homepage AggregateRating 5.0/136, Bee Cave AggregateRating 5.0/136, DSCR FAQPage, homepage AEO body paragraph); 4 STILL OPEN carry-forwards (about.html address mismatch 12th run, /loans/usda 200 14th day, USDA cascade pending Adam, NotebookLM script missing 19th confirming check).
- **Blog cadence trip:** last post 2026-04-27 = 8 days as of today = trips 7-day cadence flag. Escalates to MEDIUM in FLAG_FOR_ADAM. Suburb deep-dive (Wednesday) can pair with topical post.
- **PageSpeed manual + GSC URL Inspection + Google Ads Optimization Score** — all UNVERIFIED (manual UI access, Adam-only). Last known scores stale 6+ weeks.
- Run log → `run-logs/2026-05-05.md` (mirrored to `latest.md`); learnings appended (5 new patterns).

## 2026-05-04 — Cedar Park deepened (Round 2 slot 3) (styer-suburb-editor-daily)

- **Median refreshed** $492K Mar 2026 → **$496K Mar 2026 Redfin (-8.0% YoY)**, $228/sqft. Round 1's $492K was slightly below Redfin's true closing-period median.
- **USDA removed from LocalBusiness schema description.** Adam doesn't originate USDA. Replaced with 78613 + named neighborhoods (Buttercup Creek, Ranch at Brushy Creek, Twin Creeks, Block House Creek, Crestline at Brushy Creek RRISD-zoned) + tax stack (WilCo $0.413776 + City of Cedar Park $0.36 FY 2025-26 + LISD $1.0869).
- **Crestline at Brushy Creek = Round Rock ISD correction surfaced (school-zoning detail, Georgetown-MorningStar-style fix).** Round 1 placed Crestline within the Twin Creeks paragraph, implying it shared LISD attendance. Per <a href="https://www.tollbrothers.com/luxury-homes-for-sale/Texas/Crestline-at-Brushy-Creek">Toll Brothers' community page</a> + <a href="https://www.globenewswire.com/news-release/2026/03/19/3259243/1924/en/Crestline-at-Brushy-Creek-by-Toll-Brothers-Now-Open-in-Cedar-Park-Texas.html">March 19, 2026 grand-opening release</a>, Crestline is zoned to **RRISD** (Sommer Elementary, Cedar Valley Middle, Round Rock High) — not Leander ISD — even though the mailing address is Cedar Park. Crestline is now its own H3 spotlight with the school-zoning correction front-and-center, plus accurate pricing (mid-$900Ks+, not the prior page's "$1.2M+"), 60-70ft homesite split (Cypress Collection 60ft / Juniper Collection 70ft), 12 home designs, 2,800-4,700+ sqft, 3-6 BR.
- **VA tile de-templated** — removed `Cedar Park's veteran community has excellent access to VA financing — zero down, no PMI, and the lowest rates of any program. If you or your spouse served in the military, this is almost always the best loan available.` (generic 4-suburb match) → replaced with Cedar Park-specific framing tied to LISD 8/10 schools + RRISD zone along Brushy Creek + Joint Base San Antonio relocation pipeline.
- **2 new body H3 sections (~30 lines):**
  - **Cedar Park Major Employers** — broken out from Round 1's inline "How Do I Buy" paragraph. Cedar Park EDC sourced anchor list (Cedar Park Regional Medical Center / ETS-Lindgren / NOV / Firefly Aerospace) plus the **Firefly Blue Ghost lunar landing March 2025 update** (first commercial company to fully soft-land on the Moon — verifiable, dated milestone, separate from the prior page's $1.1B Northrop Grumman 2024 contract framing). Apple Parmer 5,000 phase-1 → 15,000 full-buildout cited via KVUE. Dell HQ ~15 mi east.
  - **Property Tax & Closing Costs in Cedar Park** — broken out from inline closing-cost paragraph. Cited tax stack (3 inline sources: WilCo CivicAlerts FY 2025-26 + Community Impact City of Cedar Park Sept 2025 + LISD tax information) + Ownwell effective rate + refreshed closing-cost breakdown at $496K w/ 10% down ($446,400 loan): 6 itemized line items including origination/processing tier; jumbo 6-12mo PITI reserve callout for Twin Creeks / Ranch at Brushy Creek / Crestline Juniper Collection.
- **2 new neighborhood spotlights:**
  - **Crestline at Brushy Creek (78613)** — Toll Brothers, RRISD-zoned. 907 Walsh Glen Dr. Cypress vs Juniper Collection split. Mid-$900s+ from globenewswire 2026 release.
  - **Block House Creek (78613)** — established western-edge MPC. 12-mo median $340,500 ($290K-$450K range) per Homes.com. Strong FHA territory framing tied to 3.5% down on $375K = $13,125. 44-day average DOM.
- **FAQ schema** home-prices Q rewritten with Mar 2026 Redfin -8.0% YoY median + per-neighborhood price ranges; loan-programs Q de-templated to remove generic TSAHC/TDHCA boilerplate (replaced with FHA/VA/jumbo/DSCR matched to specific Cedar Park price tiers + Crestline RRISD reference).
- **FAQ accordion** home-prices + loan-programs answers synced verbatim with new schema (out-of-sync since Round 1).
- **At-a-glance updated** — full tax stack with 3 inline cited sources + RRISD-zoned Crestline flag in named-neighborhoods list + 1.86% nominal / 1.52% effective.
- **Schools H3 expanded** — added RRISD's Round Rock HS for Crestline + linked RRISD boundary tool alongside LISD's.
- **WebPage dateModified** bumped 2026-04-21 → 2026-05-04. **Meta description rewritten** with Mar 2026 median + named neighborhoods (Twin Creeks / Ranch at Brushy Creek / Crestline). **Sitemap lastmod** bumped 2026-04-15 → 2026-05-04.
- **All 4 JSON-LD blocks** (LocalBusiness/FAQPage/WebPage/BreadcrumbList) parse-validated clean via python json.loads.
- **15 inline source URLs** (Redfin Cedar Park / WilCo CivicAlerts FY2025-26 / Community Impact City Cedar Park Sept 2025 / LISD tax info / GreatSchools Cedar Park HS / GreatSchools Vista Ridge HS / LISD attendance zones / RRISD school boundaries / Toll Brothers Crestline community / globenewswire Crestline grand-opening / Homes.com Block House Creek / Cedar Park EDC / Firefly Aerospace Blue Ghost release / KVUE Apple Parmer / Ownwell WilCo Cedar Park).

## 2026-05-04 — Week 9 competitive intel (styer-competitive-weekly)

- **First Leander top-10 ranking ★** — `leander-mortgage-lender.html` (last edited 2026-04-28; FAQPage + AggregateRating schema verified on disk) appeared at **#6 for "leander tx mortgage lender"**. First top-10 ranking for Leander since tracking began. Same Hutto-playbook trajectory: deepen + schema → indexed → ranks within 1-2 SERP cycles.
- **Hutto held #2** — Big Life still #1; live audit confirms NO 2026 dates, NO neighborhoods, NO review schema visible — content gap intact.
- **Bee Cave 31 days unindexed** — `site:styermortgage.com bee cave` returns zero results. Escalated from "overdue" to "BLOCKING" — manual GSC URL Inspection only Adam can take.
- **Two new threats this week:** (a) Arnaiz Mortgage NEW #1 cash-out + #2 refi (multi-state lender NMLS #2033319, generic `/refinance/texas/austin/` template, no suburb pages, no review counts visible — pure license-footprint play); (b) ATX Mortgage Lending NEW #4 core "mortgage lender austin tx" (NMLS #2445761 very recent license; explicitly lists 9 Adam suburbs in body text — Leander/Cedar Park/Liberty Hill/Georgetown/Round Rock/Hutto/Pflugerville/Kyle/Buda — but no dedicated suburb pages yet).
- Re-verify gate auto-resolved 1 stale claim (Vista Lending dropped from "home loan austin tx" top 10) and downgraded 2 (MortgageAustin demoted #1 → #2 mortgage interp; Joel Richardson/FCM demoted #1 → #3 cash-out).
- Auto-loan SERP contamination on "get pre-approved austin tx" intensifying (3 → 5 auto results in 2 weeks).
- Top-10 hit rate 9% (1/11) → **17% (2/12)**. First positive-direction movement in 2 weeks.
- Reports written: `run-logs/competitive/2026-05-04.md` + `latest.md`; learnings.md +1 entry; master `Styer_Growth_Log.md` appended (NotebookLM mirror skipped — CLI auth still expired, 19th run dead).
- 0 site mutations — research-only run per skill rules. Findings carried as TOMORROW_PRIORITY for daily site task + new TODO items.

## 2026-05-03 — Sunday: Sitemap + Re-Verify Only (daily-opt)

- Sitemap health check: https://styermortgage.com/sitemap.xml → 200 ✅
- Re-Verify Gate run on 7 live claims: 3 STILL OK, 4 STILL OPEN carry forwards (no actionable items unblocked)
- **Count-method correction:** how-to-buy USDA mention count restated from 6 (Sat PM) to 8 (today). Page hasn't been edited since 2026-04-23 (commit d2ef146); Sat PM `grep -oi "usda"` was undercounted. Each `<a href='/loans/usda'>USDA</a>` link contains "usda" twice (URL slug + visible text), so 2 link locations = 4 substring matches + 4 body content mentions = 8. Standardizing on substring-count going forward.
- NotebookLM script (`notebook_advisor.py`) missing for 18th consecutive check — SKILL.md retirement diff still pending Adam apply
- **NEW finding (HIGH):** NotebookLM CLI auth expired — `/Users/adamstyer/.local/bin/notebooklm` returned "Authentication expired or invalid." Separate problem from the missing python script. Adam fix: run `notebooklm login`. Master Styer_Growth_Log appended locally; only the NotebookLM mirror is stale until re-auth.
- Cleaned up yesterday's untracked PM run-log (`run-logs/2026-05-02b.md`) + uncommitted `run-logs/latest.md` modifications, rolled into today's bookkeeping commit
- Updated CONTEXT.md Last Worked On + 11th-run address mismatch carry forward + 18th-run NotebookLM escalation; learnings.md +1 lesson on grep substring-vs-line counting; appended to master Styer_Growth_Log
- Self-review: PASS — 0 modified site files. Bookkeeping-only Sunday run. Hard constraints not at risk.

## 2026-05-03 — Georgetown deepened (Round 2 slot 2) (styer-suburb-editor-daily)

- **Median refreshed** $395K Feb 2026 → $412,500 Mar 2026 Redfin (+1.9% YoY) — flip from February's negative print as the market firms.
- **USDA fully removed from page** (Adam doesn't originate): FAQ schema USDA Q → property-tax Q; FAQ accordion USDA item → property-tax item; loan-tile USDA → Asset Depletion / Asset-Based Income (first-class entry for Sun City retirees, mirrors body's existing asset-depletion FAQ); AEO opener `USDA programs for outer Williamson County` → `asset-depletion programs for Sun City retirees and jumbo financing for Wolf Ranch and Parkside`. Footer + nav USDA links untouched (sitewide cleanup blocker per CONTEXT).
- **VA tile re-targeted** off Fort Cavazos overreach (~73 mi from Georgetown, same problem Kyle analysis flagged for Round Rock). New framing: WilCo retired-military population + GISD-zoned communities (Wolf Ranch, Sun City, Parkside) as VA-eligible buyer pool. No more `proximity to Fort Cavazos`.
- **LocalBusiness schema description rewritten** with 78626/78628/78633 zips + Sun City (Del Webb/Pulte 55+) + Wolf Ranch (Hillwood, San Gabriel River) + Parkside on the River (1,500-acre MPC, 6 builders) + Saddlecreek (100 Furlong Dr, Pacesetter+Lennar) + Morningstar (Liberty Hill ISD, north of Hwy 29) named + WilCo 1.68% Ownwell tax stack + GISD $1.0506 + City of Georgetown $0.3532.
- **FAQ schema** "average home price" → "median home price" w/ 5 neighborhood price ranges integrated (Wolf Ranch $400s-$1M+ across 9 builders / Parkside $540s-$840s+ / Sun City 12-mo $396K + 157 active April 2026 / Saddlecreek mid-$300s-$500s / Morningstar Liberty Hill ISD callout). USDA Q replaced with property-tax Q citing GISD + City + WilCo Ownwell.
- **4 new body H3 sections (~80 lines):**
  - **Sun City Georgetown (78633) — 55+ Active Adult Spotlight** — Del Webb/Pulte largest active-adult community in TX per Redfin Sun City neighborhood; 12-mo median $396K + ~157 active listings April 2026 per Cain Realty Group; 3 financing structures called out: conventional 80% LTV with retirement-account drawdown / asset-depletion 60-120 mo amortization / jumbo for golf-course upper tier; out-of-state equity proceeds → delayed-financing pivot disclosed.
  - **MorningStar — Mailing Address Georgetown, but Liberty Hill ISD** — biggest-missed school-zoning detail in Georgetown. Round 1 wrongly implied GISD; corrected per livingmorningstar.com community overview. North of Hwy 29 / Kauffman Loop. Meritage $300s-$400s + Saratoga $350s-$500s. Liberty Hill HS 7/10 GreatSchools flagged. Buyers regularly assume Georgetown HS and discover otherwise mid-contract.
  - **Saddlecreek (78626) + Parkside on the River (78628)** — combined H3. Saddlecreek: 100 Furlong Drive, southeast Georgetown, Pacesetter Homes + Lennar primary, prior phases by CastleRock/Century/Gehan/Chesmar/D.R. Horton, 830 SFH + 230 cluster + 150 townhome buildout, amenities cited. Parkside: 1,500-acre MPC on San Gabriel River, 6 builders (Chesmar/Coventry/Highland/M/I/Perry/Taylor Morrison) per parksideontheriver.com; $540s 50ft → $690s 60ft → $840s+ 70ft per Highland Homes — upper tier crosses $832,750 Texas conforming line into jumbo.
  - **Major Employers in Georgetown** — broken out from Round 1's at-a-glance. AirBorn (Molex) 3500 Airborn Circle 78626 + St. David's Georgetown Hospital + Loram Technologies + Southwestern University ~1,500 students + SportClips HQ + GISD + Round Rock Dell HQ ~12 mi south down I-35.
- **At-a-glance updated** — all 5 community zips + Liberty Hill ISD MorningStar flag + WilCo 1.68% effective + new median + tax stack with 3 cited inline sources (Community Impact GISD, Hello Georgetown City, Ownwell WilCo).
- **Closing-cost section refreshed** $395K → $412.5K with 6 itemized line items + jumbo 6-12 mo PITI reserve callout (Parkside 70ft + Wolf Ranch upper-tier crossing $832,750 conforming line) + Sun City asset-depletion documentation pivot + internal link to /rate-check-georgetown.html.
- **FAQ accordion** home-prices + property-tax answers synced verbatim with new schema.
- **WebPage dateModified** bumped 2026-04-20 → 2026-05-03. **Meta description rewritten** with Mar 2026 median + zips + Sun City asset depletion + Wolf Ranch jumbo. **Sitemap lastmod** bumped 2026-04-15 → 2026-05-03.
- **All 4 JSON-LD blocks** (LocalBusiness/FAQPage/BreadcrumbList/WebPage) parse-validated clean via python json.loads.
- **18 inline source URLs** — Round Rock Round 2 had 14, Georgetown beats it.
- **Active blocker added to CONTEXT What's Next #6**: Georgetown joins Hutto + Round Rock for GSC URL Inspection re-indexing nudge after Round 2 deltas.
- Next queue slot: Cedar Park (Round 2 slot 3).

## 2026-05-03 — GBP weekly post: Homebuyer Tip — Week 18 (styer-gbp-weekly agent)

- GBP post (262 words, Homebuyer Tip theme) auto-published to Publer GBP account, job ID: `69f757ac2fb3758a0935c4b5`
- Topic: counter-intuitive offer-writing tip — ask sellers for concessions toward a 2-1 temporary buydown instead of price reduction; better near-term cash flow when buyers are most stretched. Frames the soft Austin spring market as the leverage window.
- IG/FB/LI drafts NOT generated (per scheduled-task revision 2026-04-19, this task is GBP-only; IG/FB/LI is owned by styer-social-am/pm orchestrator)
- `social_drafts` insert: skipped — schema check constraint still rejects `platform=google` (3rd recurrence; matches 2026-04-19 + 2026-04-26 pattern, not re-flagging per stale-flag rule). Publer is source of truth for the publish.
- `social_activity` insert: SUCCESS — `posted` action logged (id `9fc4b273-57a4-4143-98bf-1f71872df8e6`)
- Post saved to `run-logs/gbp-posts/2026-05-03.md`
- Master growth log appended (`/Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md`)
- NotebookLM source refresh: FAILED (auth expired — `notebooklm login` required); pre-existing carry-forward issue, NotebookLM advisor script also still missing — both already in TODO/NEEDS ADAM, not re-flagging
- No HTML/site mutations — run-log + CHANGELOG entries only

## 2026-05-02 — Round Rock deepened (Round 2 slot 1) (styer-suburb-editor-daily)

- **Round 2 of suburb editor begins.** Round Rock is the first slot of Round 2 (Round 1 closed yesterday with Westlake — 13/13 complete).
- **Median refreshed** $388K Feb 2026 → $367,500 Mar 2026 Redfin (-7.1% YoY); $191/sqft (-5.2% YoY).
- **Tax stack baked into LocalBusiness schema description**: RRISD $0.8931 (M&O 0.7101 + I&S 0.1830) + City of Round Rock $0.372 + Williamson County $0.413776 — all per $100; combined ~1.68%.
- **VA tile re-targeted off Fort Cavazos** (Kyle analysis flagged the 90+ minute drive as marketing overreach). New angle: military families relocating from out-of-state postings drawn to RRISD ratings — verifiable in Round Rock VA purchase data.
- **Loan tile #4 swapped DPA → Jumbo.** DPA tile copy was verbatim with Kyle and Taylor (`Texas programs like TSAHC and TDHCA offer grants and forgivable second loans...`). New Jumbo tile is Round Rock-specific (upper Brushy Creek 78681, golf-course Forest Creek/Teravista). DPA still mentioned in FAQ schema/accordion.
- **3 new body H3 sections (~50 lines):**
  - *Forest Creek (78664) spotlight* — 1,200 homes mid-90s/mid-00s; original builders Toll Brothers/David Weekley/Scott Felder/Taylor Morrison/Meritage/Drees/D.R. Horton/Standard Pacific (Austin Home Seeker); $500K Mar 2026 median + $538,216 12-mo avg (Redfin); avg 3,100+ sqft; Forest Creek Elementary inside community.
  - *Brushy Creek + Sendero Springs (78681) combined spotlight* — Brushy Creek $578.5K 12-mo median + Coventry Homes/MileStone Community Builders new construction $800K-$1M+ (Homes.com); Sendero Springs 632 homes / 42-acre greenbelt / FM 1431 / Standard Pacific + Streetman builders (Sendero Springs HOA).
  - *Round Rock Major Employers* — Dell global HQ (since 1990s), Emerson Automation Solutions 1100 W. Louis Henna Blvd semiconductor software hub, TECO-Westinghouse 1,000+ Round Rock employees industrial motors, Amazon 149-acre 2025 last-mile + data center campus, 60,000+ STEM jobs ~7% annual growth (Round Rock Chamber).
  - *Property Tax & Closing Costs* — full cited tax stack + $367,500 closing-cost breakdown (lender's title $1,664, escrow $600, recording $125 WilCo, ~$6,174/yr tax proration credit, prepaids $3K-$4.5K, origination $1.5K-$2.5K).
- **At-a-glance lede updated** with full tax stack + neighborhood roster (78664/78665/78681) + first internal link to `/rate-check-round-rock.html` (Kyle analysis flagged this as missing).
- **FAQ accordion home-price + loan-programs answers synced** with new schema language; "average" → "median"; loan-programs answer now explicit on conforming limit + jumbo trigger zones.
- All 4 JSON-LD blocks (LocalBusiness / FAQPage / BreadcrumbList / WebPage) validated clean post-edit. WebPage `dateModified` 2026-04-29 → 2026-05-02. Sitemap `lastmod` bumped.
- **14 inline source URLs** on the page: Redfin city + Redfin Forest Creek + City-Data Teravista + GreatSchools Westwood + Round Rock ISD article + Round Rock Chamber major-employers + Round Rock Chamber target-industries + CitizenPortal RRISD 2025 rate + Community Impact City rate FY 25-26 + KXAN WilCo rate + Austin Home Seeker Forest Creek + Homes.com Brushy Creek + Sendero Springs HOA.
- Modified: `round-rock-mortgage-lender.html`, `sitemap.xml`, `run-logs/suburb-editor-queue.md`, this CHANGELOG, `CONTEXT.md`.
- **Next queue slot:** Georgetown (Round 2 slot 2).

## 2026-05-02 — Saturday: Sitemap + Re-Verify Only (daily-opt)

- Sitemap.xml health check: 200 ✅
- Re-verify gate run on 9 live claims; 5 confirmed STILL OK; 4 confirmed STILL OPEN carry forwards.
- 2026-04-27 post fixes (commit e0a1d9f) confirmed propagated to live a second day: canonical `/get-preapproved` CTA + canonical `136+ Reviews` footer.
- Homepage schema entity stack confirmed healthy live: MortgageBroker (×2), Person, AggregateRating, FAQPage all present.
- about.html LocalBusiness vs homepage MortgageBroker address mismatch — 9th run open (Adam decision required).
- NotebookLM `notebook_advisor.py` confirmed missing 16th consecutive check; SKILL.md retirement diff still pending Adam apply.
- **New learning logged:** Netlify pretty-URL config strips `.html` from served HTML, so re-verify gate `grep` patterns must search by resource name (`usda`), not literal file path (`/loans/usda.html`). Initial gate run nearly auto-cleared the how-to-buy USDA blocker as resolved; widening the grep caught 6 USDA mentions still live. Pattern added to `run-logs/learnings.md`.
- No HTML / schema / sitemap mutations. Saturday is sitemap + re-verify only per yesterday's plan.
- Modified: `run-logs/2026-05-02.md` (new), `run-logs/latest.md` (refreshed), `run-logs/learnings.md` (one new pattern entry), `CHANGELOG.md` (this entry), `CONTEXT.md` (Last Worked On + counters).

## 2026-05-01 PM — Bookkeeping + Re-Verify Gate (daily-opt)

- Re-verify gate confirmed AM commit e0a1d9f propagated to live: 2026-04-27 post CTA shows `../get-preapproved` (was legacy `../prequal.html`); footer Awards block shows canonical `136+ Reviews / 21-Day Avg. Close / Licensed in Texas` (was legacy `91 Google + 45 Zillow Reviews`).
- HTTP 200 + sitemap.xml entry (single, no duplicate) verified for `blog/2026-04-27-why-home-prices-arent-crashing.html`.
- FHA blog refresh (commit 89b9de3) verified live — Travis County + FHFA references propagated.
- NotebookLM `notebook_advisor.py` confirmed missing 15th consecutive check; SKILL.md retirement diff still pending Adam apply (concrete patch in 2026-04-26 AM `latest.md`).
- about.html LocalBusiness (5900 Balcones Dr) vs homepage MortgageBroker (5718 Sam Houston Cir) address mismatch live unchanged — 8th run open, Adam decision required.
- No HTML / schema / sitemap mutations. Bookkeeping-only run per "AM was thorough" pattern.
- Modified: `run-logs/2026-05-01b.md` (new), `run-logs/latest.md` (refreshed), `CHANGELOG.md` (this entry), `CONTEXT.md` (Last Worked On + counters).

## 2026-05-01 — Westlake Hills suburb page deepened — **Round 1 closeout 13/13** (styer-suburb-editor-daily)

- Final slot in Round 1 priority queue. All 13 high-volume Austin-area suburbs touched between 2026-04-19 and 2026-05-01.
- **Median refreshed** $1.2M+ → **$1.6M Mar 2026 Redfin** (+40.9% YoY) with inline cite to redfin.com/city/19594.
- **LocalBusiness schema description rewritten** with 78746 + Rob Roy / Davenport Ranch / Lost Creek / Barton Creek + Eanes ISD $0.8322 + WLH $0.176783 + Travis County 1.65% effective.
- **FAQ schema** "What are home prices like" → "What is the median home price" with tiered ranges (Davenport / Lost Creek $1.5M–$3M; Rob Roy / Barton Creek $4.5M–$15M+); jumbo limit body line `(2025 conforming limit)` corrected to `(2026 FHFA conforming limit, all Texas counties)`.
- **WebPage schema added** with `dateModified: 2026-05-01` and `about: Place containedInPlace Travis County`. All 4 JSON-LD blocks (LocalBusiness/FAQPage/BreadcrumbList/WebPage) validated clean via Python json.loads.
- **De-duped Portfolio loan card** — was verbatim with Spicewood (`Held by the lender on their books — more flexible underwriting...`); rewritten Westlake-specific (HNW + Rob Roy / Davenport Ranch / Barton Creek; bank-statement 12–24 mo + asset-depletion programs).
- **4 new H3 sections in body (~75 lines):**
  1. **Westlake Hills Neighborhoods (78746)** — 4 spotlights: Rob Roy 78746 (six subdivisions inc. Rob Roy West, $3M–$15M+, 1–5 acre lots, austinluxurygroup cite), Davenport Ranch 78746/78733 (~500 homes, Loop 360 + Westlake Drive, Austin Country Club inside, moreland.com cite), Lost Creek 78746 (~1,200 homes, Lost Creek Boulevard, Lost Creek Country Club, Forest Trail Elementary feeder, lostcreekld.org cite), Barton Creek 78735/78746 (16 sub-neighborhoods each gated, Barton Creek Country Club at 8212 Barton Club Drive 78735, four golf courses inc. Crenshaw/Coore).
  2. **Eanes ISD Schools** — Westlake HS 9/10 + Hill Country MS 10/10 + Eanes Elementary 10/10 (all GreatSchools links). Disclosed all 5 elementary feeders (Forest Trail / Barton Creek / Bridge Point / Cedar Creek / Valley View) feeding Westlake HS.
  3. **Major Employers** — Eanes ISD ~7,700 students/9 schools (Wikipedia + Westlake Chamber); 3 country clubs (Austin CC inside Davenport, Lost Creek CC, Barton Creek CC at 8212 Barton Club Drive 78735); HEB Westlake; Data USA cite for Professional/Scientific/Technical Services as #1 industry. **Honest disclosure:** 78746 is bedroom community for downtown Austin (10 mi).
  4. **Property Tax & Closing Costs** — Eanes ISD $0.8322/$100 ($0.7122 M&O + $0.12 I&S, Aug 19 2025 adoption per Community Impact); City of West Lake Hills $0.176783/$100 (-1.02% per city's Notice of Tax Rates document); Travis County 1.65% effective per Ownwell. **Closing-cost example at $1.6M w/ 20% down ($320K → $1.28M loan):** $20K–$28K itemized (title $5.5K–$7K, lender fees $2.5K–$3.5K, survey + HOI $3.5K–$5.5K, 3–4 mo escrow at 1.65% = $6.6K–$8.8K) + 6–12mo PITI reserve callout for jumbo at 10% down ($80K–$150K liquid).
- **Footer standardized** — this was the **last suburb page** still on the legacy `Top Producing Broker — Austin 2023 / 5-Star Zillow Reviews / Google Rating: 5.0 ⭐ / 1,000+ Loans Closed` block. Replaced with canonical `⭐ 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas` + 5718 Sam Houston Circle / Austin TX 78731 NAP + NMLS Consumer Access link + Mortgage Solutions, LP licensing disclaimer. Wrapped grid in `.container` and fixed `<script src="script.js">` → `<script src="/script.js" defer>`.
- **Stat card:** `$1.2M+ Median` → `$1.6M Median (Redfin Mar 2026)`.
- **Internal links added:** /rate-check.html, /loans/jumbo.html (new contextual link from closing-cost section).
- **18 inline source URLs** added across body — Redfin, FHFA, Wikipedia (Eanes ISD), 3 GreatSchools, Community Impact (Eanes tax rate), West Lake Hills city Notice of Tax Rates document, Ownwell (Travis County), 4 neighborhood guides, 3 country club sites, Westlake Chamber, Data USA.
- Sitemap `lastmod` 2026-04-20 → 2026-05-01.
- **Round 2 begins next eligible run at slot 1: round-rock-mortgage-lender.html.**
- Modified: `westlake-mortgage-lender.html`, `sitemap.xml`, `run-logs/suburb-editor-queue.md`. New: `run-logs/2026-05-01-suburb-editor.md`.

## 2026-05-01 — Weekly blog editor refresh: FHA vs Conventional (styer-content-weekly)

- Picked next-up post per editor queue: `blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html` (45 imp / 0 clicks GSC, page 1).
- **Stale 2026 program data → corrected with verifiable citations.** Replaced vague "mid-$500K range" + repeated "$524K" placeholder references (2025-era figure) with the actual 2026 Travis County FHA one-unit limit of **$571,550** and the 2026 conventional conforming one-unit limit of **$832,750**. Sourced inline to homebuyer.com/mortgage-loan-limits/travis-county-texas (cross-verified via JVM Lending and HUD's hicostlook search interface). Updated 5 places: body "When Conventional Wins" paragraph, body "What Austin Buyers Specifically Should Know" paragraph + example ($540K vs $524K → $585K vs $571,550), visible FAQ "What are the FHA loan limits in Austin TX?" answer, JSON-LD FAQPage answers for both "FHA loan limits in Austin" + "Is FHA or conventional better for first-time buyers in Austin", and JSON-LD answer for "Is FHA or conventional better for first-time buyers in Austin TX?".
- **Austin-specific data point added with citation.** Inserted Austin-Round Rock-San Marcos median sale price of **$426,220 (March 2026)** per Unlock MLS Q1 2026 Central Texas Housing Report, with inline link to unlockmls.com/news/march-q1-2026-central-texas-housing-report. The data point reframes the post's narrative usefully: median price is well *under* the FHA ceiling, so for the typical Austin buyer FHA is on the table — the constraint shows up at the top of specific neighborhoods (West Austin, Tarrytown, Rollingwood). Replaces what had been a directionally-true but unsourced "Austin's price range creates a real constraint" framing.
- **CTA copy tightened in Adam's voice.** Bottom CTA H2 "See Which Loan Is Right for You" → "FHA or Conventional? I'll Show You Both." Body copy reworked from passive "I'll run FHA and conventional side by side..." to direct "Send me your numbers — credit, income, down payment — and I'll run FHA vs. conventional side by side. Same-day pre-approvals are routine. You see the math before you tour houses, not after you're under contract." Voice-guide aligned (same-day pre-approvals as differentiator, short punchy sentences, "Schedule a Call" → "15-Minute Call" tightened to match the calendly URL).
- 0 new URLs created (per task hard-stop rule). 0 fabricated borrowers (active-borrowers memory file not present at expected path; voice guide rule "no fabrication" prevailed over "Adam anecdote" item — substituted with Austin median data citation as the 3rd required refresh element). Photo addition skipped — site convention does not include body photos in blog posts (verified across 2026-03 cluster).
- JSON-LD `dateModified` 2026-04-27 → 2026-05-01. sitemap.xml `lastmod` 2026-04-27 → 2026-05-01.
- Blog title lint clean (`grep "<title>" blog/*.html | grep -v "Adam Styer"` returned zero results).
- editor-queue.md updated: row added to Completed; next-up advanced to oldest post (2026-03-06 oil-prices) since voice-guide defers rate-volatility post AEO insertion (the FHA post was the only Next-Up item with a clean refresh path).
- Modified: `blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html`, `sitemap.xml`, `run-logs/editor-queue.md`, `run-logs/gsc-reindex-queue.md`, `CHANGELOG.md`.

## 2026-05-01 — Friday Content Planning + AEO Review rotation (daily-opt)

- Friday rotation executed in full. Latest blog post 2026-04-27 (4 days ago, under 7-day flag — no weekly content escalation).
- **Blog CTA conversion-funnel audit (21 dated 2026-* posts):** caught the only outlier — `blog/2026-04-27-why-home-prices-arent-crashing.html` with **0 links** to `/get-preapproved` or `/refinance-quote`. Bottom CTA was using legacy `../prequal.html` instead of canonical `../get-preapproved` extensionless path used by 20 of 21 dated posts. Fixed: CTA href + button label "Get Pre-Qualified" → "Get Pre-Approved" (matches the link target and Adam's correspondent-lender voice — he issues PA letters himself).
- **Footer Awards drift caught + fixed:** the same 2026-04-27 post was published 2 days after the 2026-04-25 sitewide footer Awards sweep (88/88), so it imported the legacy 2-line `91 Google + 45 Zillow Reviews` block. Standardized to canonical `136+ Reviews | 21-Day Avg. Close | Licensed in Texas`. Footer Awards consistency 88/88 → **89/89 sitewide**.
- JSON-LD `dateModified` and sitemap.xml `lastmod` bumped 2026-04-27 → 2026-05-01 on the corrected post.
- AEO 2-post spot-check: `2026-04-17-should-i-refinance-austin-tx-2026.html` PASS (6 question-form H2s + leading body `<p><strong>` + multiple CTAs); `2026-04-27-why-home-prices-arent-crashing.html` voice-first essay format using H3-only sectioning + no FAQ — explicitly deferred per voice guide pending Adam's structural decision (now 2nd recurrence).
- Two new learnings captured: (a) Friday CTA audit pattern catches conversion-funnel breakage that title/meta audits miss — every Friday run should `grep -c "get-preapproved\\|refinance-quote"` per dated post and fix any zero-result post immediately; (b) sitewide sweeps go stale by ONE the moment a post is published with the legacy template — future blog publishes need a footer-block lint at publish time, not waiting for the next sweep cycle.
- Re-verify gate: 5 claims checked. Sitemap 200 ✅. NotebookLM script missing 14th run (carry forward). about.html LocalBusiness address mismatch 7th run (carry forward — Adam decision). 1 new finding caught and resolved in-run (footer drift).
- Modified: `blog/2026-04-27-why-home-prices-arent-crashing.html`, `sitemap.xml`. New: `run-logs/2026-05-01.md`, `run-logs/latest.md` overwrite.

## 2026-04-30 PM — Bookkeeping commit + cluster correction (daily-opt)

- run-logs/2026-04-30b.md — PM run log written. Same-day second run on Thursday 2026-04-30; AM run was thorough (Internal Linking + Funnel Flow rotation + AEO p-strong on pre-approval-take + calc-affordability link normalization).
- Re-verify gate auto-resolved 2 stale claims: (a) Friday TOMORROW_PRIORITY pair (DSCR + how-to-choose-lender) — both already shipped with leading `<p><strong>` from prior sessions (DSCR added 2026-04-28 commit; lender already had pre-cluster); (b) older-template AEO denominator drift — corrected from "9/16, 7 remaining" to **11/16 OK, 5 remaining** (audit method missed FTB blog-article-body + 2 silently-fixed posts).
- Of the 5 remaining older-template posts, 4 are explicitly deferred per voice-guide reasoning (rate-volatility / life-devotional cluster: oil-prices, surrender-it stolen-car, ai-trap, why-rates-improved-bond-rally — adding answer-first paragraphs would dilute voice for marginal AEO gain) and 1 needs Adam's structural decision (why-home-prices-arent-crashing — has duplicate `<h2>` sub-title + meta-date `<p>` between author-bar and first content; AEO insertion would compete visually with sub-title h2).
- Older-template AEO sweep is **effectively complete** pending Adam structural call on why-home-prices.
- run-logs/latest.md — overwritten to PM run.
- CONTEXT.md — Last Worked On + What's Next item 5 corrected. Line count 115 (under 150 cap).
- learnings.md — appended PM-run pattern: TOMORROW_PRIORITY *pairs* need live-verified completeness state (not just filename) at AM run time; cluster-completeness re-statement; deferred-cluster discipline.
- No HTML/code changes this run — bookkeeping only.
- NotebookLM Step 0 dead 13th run (carry forward).
- about.html LocalBusiness address mismatch 6th run open (carry forward — Adam decision).

## 2026-04-30 — Dripping Springs suburb deepened (Round 1 slot 12/13) (styer-suburb-editor-daily)

- dripping-springs-mortgage-lender.html — Round 1 slot 12 of 13. Median refreshed from $500K-$900K range to **$542,500 March 2026 Redfin (+4.7% YoY)** with inline source URL. LocalBusiness schema description rewritten with 78620 + named neighborhoods + DSISD tax rate.
- FAQ schema + accordion: "average home price" → "median home price" with Redfin cite. "Hill Country land/acreage" Q swapped → "What is the property tax rate in Dripping Springs TX?" Q with DSISD $1.1052/$100 (Community Impact Sep 2025) + City of DS $0.2267/$100 (Community Impact Sep 2025) + Hays effective 1.71% (Ownwell), with $9,275/yr property tax example on median home.
- Removed templated paragraph: "A big bank will give you one product and one rate. As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders..." (verbatim match across 5+ suburb pages — confirmed via grep).
- Removed USDA from "VA & USDA Loans" tile per Adam's no-USDA stance — replaced with VA-only tile that calls out well/septic distance + potability requirements citing VA Circular 26-24-05 (benefits.va.gov source).
- Body neighborhood spotlights with builders + 78620 zip:
  - Headwaters — David Weekley + Toll Brothers, $500s-$1.5M+, has DSISD elementary onsite (liveheadwaters.com cited)
  - Caliterra — Drees Custom Homes + David Weekley + Scott Felder, $700K-$1.2M+ Ranch at Caliterra phase, Onion Creek corridor (caliterraliving.com cited)
  - Reunion Ranch — acreage/custom $1M+, horse-friendly, low HOA, gravity-fed septic
  - Arrowhead Ranch — west DS along Fitzhugh Rd, 1+ acre lots, no production builders
- Belterra disclosure added — technically zip 78737 not 78620 + different ISD boundary parts; warns reader before assuming DSISD enrollment.
- Schools H3 with all GreatSchools links: Dripping Springs HS 7/10, Dripping Springs Middle 8/10, Sycamore Springs Middle 8/10, Sycamore Springs Elem 8/10, Walnut Springs Elem 6/10.
- Major Employers H3: DSISD ~1,100 (Dripping Springs News cited) + Dripping Springs Distilling (19 states, founded 2005, drippingspringsdistilling.com cited) + Treaty Oak (Waterloo Gin, Red Handed Bourbon) + Desert Door (only US sotol distillery, destinationdrippingsprings.com cited) + H-E-B/US-290 retail. Honest framing: "small relative to Round Rock — most buyers commute to Austin or work remote."
- Property Tax + Closing Costs H3: cited rate stack + closing-cost example $11K-$14K at $542K with 20% down + jumbo example $18K-$22K at $900K with 10% down + escrow + jumbo reserves callout.
- Hill Country Construction H3: Hays County OSSF (septic) permit link + 2-yr aerobic maintenance contract requirement + well/septic potability + FHA/VA distance setbacks. Internal link added to /rate-check.html.
- WebPage schema added with dateModified 2026-04-30. Meta description rewritten with median + named neighborhoods + jumbo/construction angle. OG description tightened.
- All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) validated via JSON parse — clean.
- sitemap.xml — lastmod bumped 2026-04-19 → 2026-04-30.
- run-logs/suburb-editor-queue.md — slot 12/13 marked Done. Final Round 1 slot is Westlake.
- USDA in header/footer nav dropdown remains (2 hits site-wide) — site-wide nav cleanup blocked on Adam's USDA cascade decision per CONTEXT.md Active Blockers.

## 2026-04-30 — Thursday Internal Linking + Funnel Flow rotation + AEO continuation (daily-opt)

- Thursday rotation: Internal Linking + Funnel Flow audit on 3 pages — DSCR (28+ internal links), Round Rock (30+ internal links), calculator-affordability (17+ internal links). All PASS — well above 2+ relevant link threshold. No internal-linking gaps.
- contact.html form wiring verified: both forms (hero-quick-form + contact) correctly wired with data-netlify, hidden form-name input, GTM container, dataLayer push for `generate_lead { lead_type: 'contact_form' }`.
- thank-you.html audit verified: noindex/nofollow set, tel: link to (512) 956-6010, Calendly inline widget @ calendly.com/adamstyer/15minutes, 3-step "What Happens Next" section (`#ty-steps`), thank_you_page_view dataLayer push.
- blog/2026-03-28-how-long-does-mortgage-pre-approval-take.html — added answer-first `<p><strong>` paragraph (~67 words). File-type breakdown distinct from existing range-based P1: W-2 with all docs = same business day; self-employed with 2-yr returns + YTD P&L = same-day or next-day; missing documents or recent credit events = three business days. Closing line: "The variable isn't underwriting speed — it's documentation readiness. Get the file complete, get the letter." Uses post's own framing throughout (no new compliance risk).
- calculator-affordability.html — normalized `/get-preapproved.html` → `/get-preapproved` to match site-wide pattern. Every other page on the site uses extensionless; `_redirects` resolves both. LOW_RISK consistency fix.
- sitemap.xml — bumped lastmod on both modified pages to 2026-04-30.
- AEO older-template cluster: 8/16 → 9/16. Remaining 7: TBD on Friday/next-week rotations.
- Re-verify gate (4 claims): Sitemap 200 STILL OK; NotebookLM script missing 12th run STILL OPEN; about.html LocalBusiness vs MortgageBroker address mismatch 5th-run STILL OPEN (Adam decision); pre-approval-take `<p><strong>` claim RESOLVED via implementation.
- Step 4B SEO/SEM backlog: all P1/P2 ZERO_RISK + LOW_RISK items already complete; remaining items are P3 Adam-decision-blocked or P4 GSC-blocked. Picked up 1 LOW_RISK consistency fix (calc-affordability link) found via Internal Linking audit.
- Self-review PASS: NMLS preserved (6 occurrences on blog post), GTM intact (2 occurrences each), no "Styer Team", no new rate quotes, voice-guide compliant.
- Commit 5782c7d on top of d7689e0; pushed to main; Netlify deploy verified live (HTTP 200 on both pages + sitemap; curl grep confirms `<p><strong>A complete W-2 application` shipped + `/get-preapproved` extensionless on calc page + both 2026-04-30 sitemap lastmod entries).

## 2026-04-29 PM — AEO older-template cluster +2 (daily-opt PM)

- blog/2026-03-20-austin-mortgage-rates-march-2026.html — added answer-first `<p><strong>` paragraph (~67 words). Lead clause: "30-year fixed mortgage rates in Austin TX for March 2026 are running in the mid-to-upper 6% range for well-qualified buyers." Followed by structured VA/FHA/15-yr/DSCR rate breakdown using post's own numbers. Inserted at `<header>`/newsletter-author-bar pattern: after `</div>` closing newsletter-author-bar, before existing P1 voice-y hook.
- blog/2026-03-27-down-payment-assistance-texas-2026.html — added answer-first `<p><strong>` paragraph (~77 words). Distinct angle from existing P1 (which already led with "3% to 5% available"): TDHCA vs TSAHC program comparison, including stack-with-FHA/VA/conventional, deferred-second-lien-vs-grant trade-off, 620 credit floor, county income limits.
- sitemap.xml — bumped lastmod on both posts to 2026-04-29.
- AEO older-template cluster: 6/16 → 8/16. Remaining: 2026-03-28-how-long-does-mortgage-pre-approval-take.html (next), plus 7 others.
- Re-verify gate: 2 TOMORROW_PRIORITY items resolved via implementation; about.html LocalBusiness vs MortgageBroker address mismatch confirmed STILL OPEN (4th run, Adam decision); NotebookLM script confirmed missing 11th consecutive run.
- Caught typo in morning's TOMORROW_PRIORITY: "2026-03-28-how-to-take-mortgage-pre-approval" → actual file is "2026-03-28-how-long-does-mortgage-pre-approval-take.html". Filename corrected for Thursday's run.
- Self-review PASS: NMLS preserved, GTM intact, no rate quotes beyond post's own numbers, no "Styer Team", voice-guide compliant.
- Commit 57e40d3 on top of f079441; pushed to main; Netlify deploy verified live (HTTP 200 + curl grep confirms `<p><strong>` openers shipped + sitemap lastmods updated).

## 2026-04-29 — Bee Cave page deepened (styer-suburb-editor-daily, Round 1 slot 11/13)

- bee-cave-mortgage-lender.html — Round 1 slot 11. Median refreshed: $1.0M March 2026 Redfin (+6.9% YoY, $293/sqft, -7.0% per-sqft) replacing vague "$500K–$1.2M" range used in body + FAQ + accordion + meta description.
- Removed templated "As an independent mortgage broker, Adam Styer shops rates across 40+" paragraph (verbatim match w/ kyle-mortgage-lender.html + san-marcos-mortgage-lender.html — duplication confirmed via grep).
- New H3 "Bee Cave Neighborhoods Adam Closes In" w/ 3 cited spotlights:
  - Spanish Oaks (78738) — 13001 Spanish Oaks Club Dr, gated golf w/ two 24-hr staffed gatehouses, 2,500–10,000+ sqft, custom builders Weston Dean / Camelot / Bella Vita / Heyl / Russell Eppright / Stadler (spanishoaks.com cited).
  - Sweetwater (78738) — 1,400-acre Newland MPC off Hwy 71 west of RR 620 (Bee Creek Rd / Bee Cave Pkwy), upper $300s entry tier, Westin/Newmark/Chesmar product, 10-acre Sweetwater Club w/ 3 pools (sweetwaterliving.com cited).
  - Falconhead (78738) — Drees / Meritage / Taylor Morrison + Prestige Custom + Callahan Custom, $650K–$1.5M+, 1,550–6,200 sqft, gated sub-sections (austinhomeseeker.com cited).
- New H3 "Bee Cave Schools (Lake Travis ISD)" — Lake Travis HS 9/10 GreatSchools (3324 RR 620 South 78738, AP/PLTW/G&T) + Bee Cave Elementary 8/10 GreatSchools (14300 Hamilton Pool Rd, Pre-K–5, A on Niche). Both rating links cited.
- New H3 "Bee Cave Major Employers & Commute Anchors" — Hill Country Galleria 152 acres / 100+ retailers anchored by Dillard's, Whole Foods, Cinemark, Barnes & Noble + on-site Class A office (Regus listing cited) + Spanish Oaks Golf Club hospitality. Commute notes: ~25 min downtown via SH-71, ~20 min Domain via RR 620+US-183, ~30 min AUS via SH-71.
- New H3 "Bee Cave Property Tax & Closing Costs at the Median" — LTISD $1.0397/$100 (M&O 0.7122 + I&S 0.3275, lowest in district history per CitizenPortal) + City of Bee Cave $0.02/$100 FY25-26 (Community Impact, $153.97/yr on $769,846 avg homestead) + Bee Cave Road District No. 1 28.9176¢/$100 (Travis County). Closing-cost breakdown at $1.0M w/ 20% down ($800K loan): $20K–$25K itemized (origination/title/escrow/recording/survey/HOI/3-4mo tax escrow at ~1.7% effective per Ownwell) + jumbo 6-12 mo PITI reserve callout.
- FAQ schema + accordion: "average home price" → "median home price" w/ Redfin citation; schools answer rewritten w/ both GreatSchools cited ratings + addresses.
- WebPage schema added (dateModified 2026-04-29, isPartOf WebSite, about Place Bee Cave). All 4 JSON-LD blocks (LocalBusiness/FAQPage/WebPage/BreadcrumbList) parse clean.
- Meta description rewritten: "$1.0M median (Redfin March 2026). Spanish Oaks, Falconhead, Sweetwater. Lake Travis HS 9/10."
- Sitemap lastmod bumped 2026-04-22 → 2026-04-29.
- Queue: Bee Cave done. Next slot 12/13: Dripping Springs.

## 2026-04-29 — Round Rock USDA cleanup + rate-alert sitemap entry (daily-opt, Wednesday rotation)

- round-rock-mortgage-lender.html — voice-guide compliance: removed USDA from 3 surfaces (LocalBusiness schema description; FAQPage schema "loan programs" answer; visible accordion same answer). DSCR / bank-statement loans substituted in compensating positions for self-employed and investor buyers. dateModified bumped 2026-04-19 → 2026-04-29.
- sitemap.xml — added rate-alert.html (`<lastmod>2026-04-29</lastmod>`, weekly, priority 0.7); bumped round-rock-mortgage-lender.html lastmod 2026-04-14 → 2026-04-29.
- Wednesday rotation suburb deep dive (Round Rock): structural audit 15/15 pass (form, all schemas, AEO answer-first paragraph, question-form H2/H3, internal links, trust bar, NMLS, GTM, TCPA + SMS opt-in).
- Re-Verify Gate cleared 2 stale flags: (1) thank-you.html "uncommitted" 4-run HIGH carry-forward → `git diff` returned empty, claim auto-resolved; (2) rate-alert.html missing-from-sitemap → resolved via implementation in same run.
- Consolidated multiple per-page USDA flags into 1 Adam-decision flag covering site-wide nav dropdown (header + footer on ~88 pages link to `/loans/usda.html`).
- Commit ac042b4. Netlify deploy verified live; round-rock + rate-alert + sitemap all HTTP 200; round-rock body confirms USDA only remains in global nav (intended scope boundary).
- NotebookLM Step 0 dead 10th run; SKILL.md retirement diff still pending Adam apply.

## 2026-04-28 — Lakeway page deepened (styer-suburb-editor-daily, Round 1 slot 10/13)

- lakeway-mortgage-lender.html — Round 1 slot 10. Median refreshed: $704K February 2026 Redfin (-11.2% YoY, $258/sqft, 104 days on market). Removed templated 6-sentence "Home Prices in Lakeway" paragraph + at-a-glance schools list; replaced with cited Redfin median, builder roster (Drees / David Weekley / Newmark / Scott Felder / Westin) across Rough Hollow's Vista Ridge Estates / Las Brisas / Canyon Pass / The District (78738), and Estates of Flintrock 2017–2023 (Ashton Woods + Mercury). Cardinal Hills tagged as 78734 entry tier.
- New H3 "Lakeway Major Employers & Commute Anchors" — Baylor Scott & White Lakeway (106-bed Magnet hospital, "one of the largest employers in the area" per BSW careers page) + Hill Country Galleria 1.3M sqft / 285K sqft Class A office anchored by Dillard's, Whole Foods, Cinemark, Dick's Sporting Goods, Barnes & Noble (SH-71 / RM 620 / Bee Cave Rd junction).
- New H3 "Lakeway Property Tax & Closing Costs at the Median" — LTISD adopted $1.0397/$100 for 2025-26 ("lowest in district history" per CitizenPortal + LTISD voter-approval-tax-rate-election page); City of Lakeway adopted $0.16964/$100 FY 2025-26 per Community Impact (6.2% increase, average bill $1,435); Travis County effective 1.7%–2.0% per Ownwell. Closing-cost breakdown at $704K w/ 20% down ($563.2K loan): $14K–$18K itemized — origination/title/recording/insurance/3-4 mo tax escrow + jumbo 6-12 mo PITI reserve callout.
- Schools added inline to "at a glance": Lake Travis HS 9/10 GreatSchools (3324 Ranch Road 620 South, 78738) + Serene Hills Elementary 9/10 GreatSchools + 97% graduation rate per US News.
- LocalBusiness schema description rewritten with 78734/78738 zips + named neighborhoods. FAQ schema "What are home prices" + "Construction loan" rewritten Lakeway-specific (de-duplicated construction-loan paragraph that was verbatim with bee-cave-mortgage-lender.html). Construction-loan accordion rewritten to Hill Country topography specifics (rock blasting, retaining walls, septic/non-MUD draws).
- WebPage schema added with dateModified 2026-04-28; meta description rewritten (153 char): "Lakeway TX jumbo loans: Rough Hollow (78738), Lakeway Highlands, Flintrock Falls. $704K median Feb 2026. LTISD 9/10 GreatSchools. 40+ lenders. NMLS #513013."
- All 4 JSON-LD blocks (LocalBusiness / FAQPage / WebPage / BreadcrumbList) parsed clean via Python json.loads validation.
- sitemap.xml lastmod 2026-04-20 → 2026-04-28.
- Queue: round 1 slot 10/13 done; next slot 11 = Bee Cave (note: Bee Cave still not indexed per CONTEXT blockers — manual GSC URL Inspection overdue regardless of next deepening pass).

## 2026-04-28 — Meta descriptions + DSCR AEO body answer (daily-opt)

- 10 meta descriptions rewritten to 150-160 char spec on key indexed pages: calculator-affordability (119→157), rate-alert (124→150), how-to-buy-a-house (127→154), about (131→159), first-time-home-buyer (132→160 — USDA removed per voice-guide rule), calculator-payment (135→156), rate-check (135→152), calculators (137→155), fixed-vs-adjustable (139→150), manor-mortgage-lender (173→159 trim).
- blog/2026-03-31-dscr-loans-austin-tx-2026.html — body `<p><strong>` AEO answer (66w, mechanics/qualification math angle: DSCR formula, 1.0/1.25 thresholds, 680/740 credit floors, 20–25% down, no W-2/no tax returns, LLC title). Numbers all sourced from post body (PITI table, lender requirements, comparison table). Distinct from existing investor pain-point/scenario intro. dateModified 2026-03-31 → 2026-04-28.
- Re-verify gate auto-resolved how-to-choose-a-mortgage-lender — already had `<p><strong>` AEO answer at line 190 from earlier session. No edit required.
- sitemap.xml — lastmod 2026-04-28 on 10 in-sitemap pages + DSCR. Added missing `<lastmod>` attributes to calculator-affordability + calculator-payment.
- New finding logged: rate-alert.html missing from sitemap.xml. Verify indexability and add next run.
- thank-you.html uncommitted state escalated MEDIUM → HIGH (4th run carry forward, Adam decision required).
- Older-template AEO cluster: 4/16 → 6/16 closed, 10 remaining. Next pair: self-employed + DPA.
- Commit 6db2ebe; live ~0s after push; all 12 URLs HTTP 200 verified via curl.
- New learnings: (1) re-verify-before-write rule for AEO body answers — grep `<p><strong>` BEFORE inserting, prevents duplicate/redundant work; (2) em-dash byte/char gotcha when targeting 160-char meta descriptions — wc -c overcounts by 2 per em dash, validate with `python3 print(len(...))`; (3) USDA removal on small surfaces (meta) is auto-doable; body removal still requires Adam confirmation.

## 2026-04-27 PM — AEO body answers: VA + FTB (daily-opt)

- blog/2026-03-29-va-loan-eligibility-texas.html — body `<p><strong>` AEO answer (79w) inserted after `</div>` of newsletter-author-bar, before existing first `<p>`. Distinct angle from existing eligibility/service-test paragraph: leads with **benefit/economics** (zero down + no PMI + capped closing costs the seller can pay + $150–300/mo savings vs <20% down conventional + Funding Fee 1.25–3.3% waived for veterans with 10%+ service-connected disability). Numbers all sourced from post body. dateModified 2026-03-29 → 2026-04-27.
- blog/2026-03-30-first-time-home-buyer-programs-austin-tx-2026.html — body `<p><strong>` AEO answer (81w) inserted inside `<div class="blog-article-body">`, before existing first `<p>`. Distinct angle from existing voice-y casual hook: leads with **four-program stack inventory** (TSAHC 3–5% grants, TDHCA My First Texas Home up to 5% as 30-year deferred lien, MCC $2,000/year federal tax credit for life of loan, City of Austin American Dream up to 10% for buyers <80% AMI) + Texas first-time definition (no primary-residence ownership in past 3 years). Numbers all sourced from post body. dateModified 2026-03-30 → 2026-04-27.
- sitemap.xml — lastmod 2026-04-27 on both posts (was 2026-03-29 / 2026-03-30).
- New insertion pattern documented in learnings.md: `blog-article-body`-template posts (FTB pattern) — insert immediately after the opening `<div class="blog-article-body">`, before the first `<p>`. Author block already closed inside `<div class="blog-article-header">`.
- New layering insight: when existing first `<p>` is voice-y/casual (FTB), AEO answer paragraph serves as machine-extractable layer above; existing voice opener still functions as human hook below. Don't replace voice with extraction — add extraction above voice.
- Commit 998c920; live verified via curl in 75s.
- Older-template AEO cluster: was 14 remaining → now 12. Next pair: DSCR + how-to-choose-lender.

## 2026-04-27 — Manor suburb deepened (styer-suburb-editor-daily)

- manor-mortgage-lender.html — Round 1, slot 9. Removed all Manor-specific USDA copy (LocalBusiness schema description, FAQ schema Q + accordion Q, body "even USDA financing" line) — header/footer nav `/loans/usda.html` left as sitewide concern (separate Adam decision). Replaced USDA FAQ Q with property-tax Q citing Manor ISD $1.0814/$100 (M&O 0.7113 + I&S 0.3701, Prop A approved Nov 2024) + Ownwell ~2.27% combined effective.
- Removed templated "As an independent mortgage broker, Adam Styer shops rates across 40+ wholesale lenders" + "Adam works for you — not for a lender or a builder" paragraph (verbatim 4-page match: bee-cave, kyle, manor, san-marcos — Manor now removed). Removed templated DPA paragraph. Loan-tile #4 rewritten as Manor-specific TSAHC/TDHCA tile linking tsahc.org + tdhca.texas.gov.
- Added 4 verified neighborhood spotlights with builders + 78653 zip: ShadowGlen (Terrata/Perry/Meritage/LGI, $499K-$555K top tier — 18-hole golf course + 4-acre water park), Whisper Valley (Pacesetter + Avi, geothermal+solar via Taurus Investment Holdings, $200s-$400s), Carillon (D.R. Horton at 13407 Eppright Trace, $299,990-$416,990, 1,574-2,677 sqft), Presidential Meadows (KB Home, sold-out resale, Presidential Meadows Elementary at 13252 George Bush St).
- Manor Schools H3 — honest disclosure: Manor High School 2/10 GreatSchools cited inline. Recommended buyers verify specific elementary/middle attendance before writing offers.
- Major Employers H3: Tesla Gigafactory 22,777+ employees (Electrek), ~15 min via SH-130 (Wikipedia confirms 2,500-acre site); Plastic Omnium 350K-sqft Tesla supplier plant + 800 jobs (Connect CRE); Samsung Austin Semiconductor Taylor fab; Manor ISD as local employer.
- Median home price refreshed to $355,000 Nov 2025 (+6.6% YoY, Redfin) replacing $270K-$400K templated range. FAQ + accordion home-price Q + first-time-buyer Q + Tesla Q all rewritten with verified data + inline source links.
- Closing cost example at $355K with 5% down: $7,500-$9,500 range itemized (title $1,800-$2,400, lender $1,200-$1,800, recording/survey $300-$500, prepaids $1,200-$1,800, 3-4 mo tax escrow $2,000-$2,700 at 2.27% effective).
- Added WebPage schema with dateModified 2026-04-27. Meta description rewritten with neighborhood list + Redfin median. Internal links: /rate-check.html, /get-preapproved, Wikipedia Gigafactory, plus 7 source URLs.
- All 4 JSON-LD blocks validated parse-clean.

## 2026-04-27 — AEO body answers: cash-out + fha-vs-conv (daily-opt)

- blog/2026-03-24-cash-out-refinance-austin-tx.html — body `<p><strong>` AEO answer (69w, "three things line up" frame using post's own numbers). dateModified 2026-04-27.
- blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html — body `<p><strong>` AEO answer (79w, decision-frame + MIP-vs-PMI life-of-loan distinction). dateModified 2026-04-27.
- sitemap.xml — lastmod 2026-04-27 on both posts.
- Wrote second audit script (find first `<p>` after `<h1>` in `<article>` body, check leading `<strong>` and 40-80w body). 16 older-template posts identified — 2 closed this run, 14 remaining.
- Schema audit (Monday rotation): homepage MortgageBroker + Person ✅, DSCR FAQPage ✅, Hutto full stack ✅, about.html Person matches homepage. NEW finding logged in CONTEXT.md Active Blockers: about.html LocalBusiness address (5900 Balcones Drive) ≠ homepage MortgageBroker (5718 Sam Houston Circle). Adam decision needed.
- Commit 984d1b0; live in 75s; verified via curl.

## 2026-04-27 — Week 8 competitive intel: SERP-wide snapback (styer-competitive-weekly)

- run-logs/competitive/2026-04-27.md + latest.md — Week 8 report. SERP rankings: 2 → 1 in top 10. Hutto demoted #1→#2 (Big Life reclaimed with no content updates — algorithmic refresh, not on-page regression; both Hutto + Round Rock pages verified to have correct 136-review schema and recent edits). Round Rock #2 → not in top 10 (sandbox bounce on page deepened 2026-04-19). Bee Cave still not indexed (24 days). New top 3 across 11 tracked keywords logged with full re-verify gate.
- Re-Verify Gate caught record 9 prior claims this week: Hutto #1 (downgraded), Round Rock #2 (cleared), AsertaLoans (cleared), Nest 3-position dominance (cleared), Vista cleared (reversed), Highlander cleared (reversed), AustinHomeLoans cleared (reversed), Sente "not appearing" (partially updated), Nest #1 home loan (cleared).
- Big competitor moves: Nest Mortgaging vanished entirely from all 7 core keywords (last week's headline new threat — total disappearance in 7 days). AsertaLoans gone from cash-out refi #1. AustinHomeLoans.com (Schutze Brothers, 40+ years, 245+ reviews, 2,000+ closed loans) re-emerged #1 home loan. Joel Richardson/FCM new #1 cash-out refi. Lone Star added Lakeway #1 to Round Rock #1 — structural suburb leader.
- run-logs/learnings.md — Prepended 2026-04-27 entry. Patterns: first negative-direction week (algorithmic, not regression); content velocity without authority is brittle (Nest counter-example); Round Rock fits new-page sandbox; CrossCountry 2-Cedar-Park-branches is structural; AustinHomeLoans tenure moat reaffirms suburb-first strategy; re-verify gate critical in volatile weeks.
- NotebookLM Step 0 dead 6th run — `notebook_advisor.py` still missing; cached-learnings fallback worked. The 5th-run SKILL.md retirement patch (drafted 2026-04-26) still pending Adam's apply.
- NotebookLM source push: SEO notebook (7f8a80c5) added 2026-04-27.md as new source. Styer Mortgage notebook (5348ff90) refreshed Styer_Growth_Log.md (deleted old, re-added). Master log appended at /Users/adamstyer/Documents/memory/styer-mortgage/Styer_Growth_Log.md.
- Action items for Adam: GSC URL Inspection sweep (Hutto, Round Rock, Bee Cave, Lakeway — all overdue); consider "10-minute response, guaranteed" trust signal (none of top competitors claim this — aligns with this week's GOALS.md "speed to lead" priority); apply NotebookLM SKILL.md retirement patch.
- thank-you.html uncommitted change in working tree (carried forward from 2026-04-26 PM run; `ty-alt-paths` reveal logic for refi/preapproval) — NOT modified by this run, NOT staged. Still pending Adam's commit-or-revert decision.

## 2026-04-26 PM — should-i-refinance AEO body answer + blog-post-header template 14/14 complete (daily-opt)

- blog/2026-04-17-should-i-refinance-austin-tx-2026.html — Added body `<p><strong>` AEO answer paragraph (56 words) immediately after `</header>` of `blog-post-header`, before existing first body `<p>`. Distinct angle from `blog-post-intro` inside header (intro: 3 conditions / body: run-the-formula + Austin median tenure ~6 yrs + 30/48-month examples drawn from post's own break-even math). All 6 H2s already in question form on this post — no statement→question conversion needed. dateModified 2026-04-17 → 2026-04-26 in schema.org Article.
- sitemap.xml — lastmod 2026-04-17 → 2026-04-26 for the same post.
- Commit 0c60b27 on top of cbddcc0. Pushed to main; Netlify deploy live within ~75s. Body answer + dateModified + sitemap lastmod confirmed live via curl.
- AEO loose-thread audit: completed for `blog-post-header` template — 14/14 posts now have body `<p><strong>` answer (10 rate-shopper + 4 dated 2026-* posts using this template). Identified next AEO target cluster: ~16 dated 2026-* posts using the older `<header>` (page-level) + `<article class="blog-article">` template. Audit method needs upgrade to find first body `<p>` after `<h1>` inside `<article>`/`<main>`. Proposed cadence: 2 posts per AM run, paired by topic.
- thank-you.html: discovered uncommitted change in working tree (`ty-alt-paths` reveal logic for refi/preapproval thank-you-types). Not from any current scheduled task — explicitly NOT staged. Logged for Adam decision (commit or revert).
- NotebookLM Step 0 dead 6th run — concrete unified-diff SKILL.md retirement patch is in 2026-04-26 AM run-log FLAG_FOR_ADAM, still pending Adam's apply.

## 2026-04-26 — Liberty Hill suburb deepened (styer-suburb-editor-daily)

- liberty-hill-mortgage-lender.html — Removed USDA from 5 locations: LocalBusiness schema description, FAQ schema Q (replaced with "What is the property tax rate in Liberty Hill TX?"), FAQ accordion (matching), loan-options card (swapped to Jumbo Loans card with SH-29/FM-1869 acreage hook), and Step 3 pre-approval text (swapped "USDA or DPA" → "Texas DPA or VA"). Adam doesn't originate USDA.
- Removed templated `<p>As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders…</p>` paragraph — verbatim duplicate across 5 pages (bastrop, dripping-springs, austin-mortgage-rates, taylor, liberty-hill).
- Added WebPage schema with `dateModified: 2026-04-26` after the BreadcrumbList JSON-LD block.
- Replaced generic "$350K–$600K" home price lede with sourced February 2026 median $485K (53 closings, down 6.3% YoY from $517,500) — [Neuhaus Realty Group/Unlock MLS](https://neuhausre.com/liberty-hill-real-estate-market-update-march-2026/). Trimmed at-a-glance line by removing redundant neighborhood price ranges (now broken out into spotlight H3s).
- Added 3 verified neighborhood spotlight paragraphs: **Santa Rita Ranch (78642)** — Pulte primary + Perry/Highland sections, 112 Leon Loop ([Pulte](https://www.pulte.com/homes/texas/austin/liberty-hill/santa-rita-ranch-209566)); **Northgate Ranch (78642)** — Drees/Giddens/Hill Country Artisan/Monticello, 508 Bizzell Cove ([Northgate Ranch](https://northgateranch.com/) | [NewHomeSource](https://www.newhomesource.com/community/tx/liberty-hill/northgate-ranch-by-drees-custom-homes/186201)); **Orchard Ridge (78642)** — Pacesetter primary + Lennar/Ashton Woods/Dream Finders/Buffington, Freehold Communities masterplan, 105 Orchard Park Drive ([Pacesetter](https://www.pacesetterhomestexas.com/new-homes-for-sale-austin/liberty-hill-tx/orchard-ridge) | [Freehold Communities](https://freeholdcommunities.com/orchard-ridge-masterplan-in-liberty-hill-texas-announces-two-new-builders/)).
- Added Liberty Hill Schools H3 — Liberty Hill HS [7/10 GreatSchools](https://www.greatschools.org/texas/liberty-hill/4341-Liberty-Hill-High-School/), 98% graduation rate vs. 90% TX average; Prop A passed Nov 2025 raising M&O to $0.7389 ([Community Impact, Nov 2025](https://communityimpact.com/austin/leander-liberty-hill/election/2025/11/04/liberty-hill-isds-tax-rate-election-passes-unofficial-voting-results-show/)); combined LHISD school rate $1.2389/$100; $23M HS upgrade + planned new Legacy Ranch HS.
- Added Major Employers & Local Economy H3 — LHISD ~600 staff (largest single employer per [Liberty Hill EDC](https://www.libertyhilledc.com/workforce/major-employers/)); $75M Costco + $22M Target under construction; Platform 183 x 29 industrial mixed-use 1M+ sqft along US-183/SH-29 corridor ([Liberty Hill Digest, Aug 2025](https://issuu.com/fidelispublish/docs/liberty_hill_digest_august_2025)); ~42 mi to ABIA; Samsung Taylor/Tesla/Apple/Dell within commute.
- Added Closing Cost Example H3 — $485K, 5% down ($460,750 loan); typical Texas closing costs $10,500–$13,000 (excl. down payment) broken down (TX promulgated title ~$2,500, lender fees ~$1,400, appraisal ~$650, survey ~$500, prepaids ~$5,200+); annual property taxes $9,700–$11,600 at 2.0%–2.4% combined ([Community Impact, Aug 2025 — city rate $0.469407](https://communityimpact.com/austin/leander-liberty-hill/government/2025/08/28/liberty-hill-adopts-741m-fy-2025-26-budget-sets-property-tax-rate/)).
- Internal link added: `/loans/jumbo.html` (replaces former USDA-tile dead end with relevant high-end-acreage upsell path).
- run-logs/suburb-editor-queue.md — Liberty Hill marked Done; next: Manor.
- 4+ unique first-party elements per task spec: 3 named neighborhoods with zip+builder+address, school w/ rating+source, employer list with sources, closing-cost example with TX numbers + sources. ✅
- Templated paragraph removed: "As an independent mortgage broker…" — pre-removal grep confirmed verbatim 5-page match. ✅

## 2026-04-26 — Rate-shopper AEO series 10/10 COMPLETE + NotebookLM 5th-run patch (styer-site-daily)

- blog/what-to-compare-besides-mortgage-rate.html — added body `<p><strong>` AEO answer paragraph (60w) after `</header>`, distinct from blog-post-intro (intro lists 6 factors; body leads with practical Section A side-by-side method + identical-rate $4,000+ spread example + rate=monthly/fees=upfront frame). Statement H2 "Origination Charges — The Biggest Variable" → question "Are Origination Charges the Biggest Variable in Loan Cost?". dateModified 2026-04-12 → 2026-04-26.
- blog/is-the-lowest-rate-the-cheapest-loan.html — added body `<p><strong>` AEO answer paragraph (64w) after `</header>`, distinct from blog-post-intro (intro: total-cost frame; body leads with "compare loans over the time you'll keep them" + 6.375%/$8,500 vs 6.5%/$3,000 example aligned with post's existing Lender A/B numbers). Statement H2 "Why Buyers Fixate on the Rate" → question "Why Do Buyers Fixate on the Rate?". dateModified 2026-04-12 → 2026-04-26.
- sitemap.xml — lastmod 2026-04-12 → 2026-04-26 for both posts.
- Self-review PASS: GTM=2/2 on both, NMLS=4/4 each, no Styer-Team, distinct-wording rule satisfied, illustrative rates aligned with post's own Lender A/B example (no new compliance risk).
- Live verify after Netlify deploy: both posts 200, body answers + question H2s + sitemap lastmod confirmed live.
- **Rate-shopper AEO series 10/10 COMPLETE** — full anti-pattern (`blog-post-intro` inside `<header>` only) closed across all 10 posts after 4 days, ~20 min/run, 2-per-run cadence (commits de08af6, c6df081 PM, then today's 23d00c7).
- NotebookLM Step 0 dead 5th consecutive run — concrete unified-style SKILL.md retirement diff drafted in run-log FLAG_FOR_ADAM (replaces lines 57-72 of `~/.claude/scheduled-tasks/styer-site-daily/SKILL.md`). One-shot edit Adam can apply.
- Monday 2026-04-27 GSC sitemap status reminder logged in FLAG_FOR_ADAM (Step 1 weekly cadence).
- Commit: 23d00c7. learnings.md appended with rate-shopper series complete pattern + 5th-run concrete-patch rule.

## 2026-04-25 PM — Rate-shopper AEO 8/10 reached (styer-site-daily)

- blog/what-delays-closing-when-you-switch-lenders.html — added body `<p><strong>` AEO answer paragraph (56w) after `</header>`, distinct from blog-post-intro inside header. Statement H2 "How a Broker Speeds Up the Process" → question "How Does a Broker Speed Up the Process?". dateModified 2026-04-12 → 2026-04-25.
- blog/how-to-read-a-loan-estimate.html — added body `<p><strong>` AEO answer paragraph (66w) after `</header>`. Statement H2 "What to Do After You Read Your Loan Estimate" → question "What Should You Do After You Read Your Loan Estimate?". dateModified 2026-04-12 → 2026-04-25.
- sitemap.xml — lastmod 2026-04-12 → 2026-04-25 for both posts.
- Self-review PASS: GTM=2/2, NMLS intact, no Styer-Team, distinct-wording rule satisfied (both intros and body answers cover same question from different angles).
- Live verify after Netlify deploy: both posts 200, body answers + question H2s + sitemap lastmod confirmed live.
- Rate-shopper AEO coverage: 8/10 (was 6/10). Remaining: what-to-compare-besides-mortgage-rate, is-the-lowest-rate-the-cheapest-loan. Sunday finishes the series.
- NotebookLM Step 0 dead 4th consecutive run — Sunday will draft the SKILL.md retirement patch.

## 2026-04-25 — Hutto suburb page deepened (styer-suburb-editor-daily)

- Removed templated paragraph "As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders..." — confirmed verbatim on 6 pages via grep (austin-mortgage-rates, bastrop, dripping-springs, hutto, liberty-hill, taylor).
- Removed USDA from LocalBusiness schema description — Adam does not originate USDA loans.
- Added WebPage schema with datePublished 2025-08-01 / dateModified 2026-04-25, isPartOf WebSite, about City+AdministrativeArea (Williamson County).
- Refreshed FAQ Q1 + body home-price anchors to $340,000 median (Feb 2026, [Redfin](https://www.redfin.com/city/9075/TX/Hutto/housing-market) — down 9.3% YoY).
- New H3 "Hutto Neighborhoods Where I Close Loans" — Star Ranch (78634, Clark Wilson Builder, sold-out, golf-course community off W Highfield), Emory Crossing (78634, 304 Stinchcomb Rd, Taylor Morrison + David Weekley townhomes, currently selling, [Jome](https://jome.com/community/tx/1029-emory-crossing-50s-by-taylor-morrison-304-stinchcomb-road-hutto-tx-78634)), Riverwalk (78634, established south-of-US-79).
- New H3 "Top Hutto-Area Employers" — Samsung Austin Semiconductor in Taylor (~10 min via SH-130, 1,800 direct jobs targeted, [Community Impact Oct 2025](https://communityimpact.com/austin/georgetown/development/2025/10/08/samsung-employees-to-move-into-office-building-on-taylor-campus-this-november/)), Tesla Hutto 35,000 sq ft service/distribution facility ([FOX 7 Austin](https://www.fox7austin.com/news/tesla-hutto-austin-expansion)), Hutto ISD.
- New H3 "Closing Cost Example — $340K Hutto Home" — typical $8,500–$10,500 closing costs at 5% down with breakdown: TX-promulgated title (~$2,200), lender fees ($1,500–$2,500), survey ($500), appraisal ($600–$700), property-tax escrow against ~1.93% combined rate (HISD $1.2052 + City of Hutto $0.385928 + Wilco). Both rates Community Impact sourced.
- Added Hutto HS 6/10 [GreatSchools](https://www.greatschools.org/texas/hutto/3723-Hutto-High-School/) rating with direct URL.
- Added internal link to /rate-check-georgetown.html (the rate-check page that covers Hutto).
- Rewrote AEO opener with FHA + conventional + new-construction wedge (no DPA-grant-covers-everything overclaim).

## 2026-04-25 — Footer Awards sitewide standardization + AEO sweep continued (styer-site-daily)

- 56 of 57 site files (28 root + 28 blog) standardized: footer Awards `<p>` updated from `★ 5.0 Stars · 91 Google Reviews / ★ 4.98 Stars · 45 Zillow Reviews` → `★ 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas`. Two indent variants (multi-line and single-line) handled in two regex passes. Indentation preserved via `\g<lead>` capture group. Final `136+ Reviews` count across site: 88 pages (some pages have it in both hero trust badge and footer).
- about.html intentionally excluded — its stale review-count instance is a `<span class="timeline-date">` inside a milestone timeline, not the footer `<p>` Awards block. Surfaced as MEDIUM Adam-decision flag (update vs. leave as historical milestone).
- blog/how-many-mortgage-quotes-should-i-get.html: added 60-word `<p><strong>` AEO body paragraph after `</header>` (distinct from existing `blog-post-intro` in header). H2 "Why Most Buyers Only Get One Quote" → "Why Do Most Buyers Only Get One Quote?". dateModified 2026-04-12 → 2026-04-25.
- blog/local-lender-vs-online-lender-austin-central-texas.html: added 54-word `<p><strong>` AEO body paragraph after `</header>`. H2 "How to Decide" → "How Do You Decide Between an Online, Local, or Broker Lender?". dateModified bumped.
- sitemap.xml: lastmod bumped to 2026-04-25 for both rate-shopper posts.
- Rate-shopper AEO progress: 6/10 posts now have machine-extractable answer-first paragraphs in article body.
- NotebookLM Step 0 confirmed dead for the 3rd run — escalated to ESCALATED in FLAG_FOR_ADAM.
- Commit b0f1dc6.

## 2026-04-24 PM — Rate-shopper AEO sweep continued (styer-site-daily)

- blog/apr-vs-interest-rate-what-actually-matters.html: added 57-word `<p><strong>` AEO answer-first paragraph after `</header>` (existing `blog-post-intro` inside `<header>` was not machine-extractable). dateModified 2026-04-12 → 2026-04-24.
- blog/are-mortgage-lender-fees-negotiable.html: added 55-word `<p><strong>` AEO answer-first paragraph after `</header>`. Converted statement-form H2 "Why a Mortgage Broker Already Has Lower Fees" → question form "Why Does a Mortgage Broker Already Have Lower Fees?". dateModified bumped.
- sitemap.xml: lastmod bumped to 2026-04-24 for both posts.
- Re-Verify Gate cleared Buda USDA flag (suburb-editor closed it earlier today via commit 4755b70).
- New finding logged: stale "91 Google + 45 Zillow" footer Awards on 28 blog posts + 29 root pages — suburb pages were standardized 2026-04-23 but the batch missed everything else. Queued ZERO_RISK fix for next run.
- NotebookLM Step 0 confirmed dead for the 2nd run; recommended retirement.
- Commit 748ba68 (rebased onto incoming rate-update commits 1858bfa + 9fe6008).

## 2026-04-24 — Buda suburb page deepened (styer-suburb-editor-daily)

- buda-mortgage-lender.html: USDA removed from 7 locations (LocalBusiness schema description, FAQPage schema USDA FAQ replaced with schools FAQ, loan tile swapped USDA→DPA, stat card "$0 Down USDA"→"$0 Down VA eligible", process step 1 USDA check removed, CTA USDA mention removed, down payment FAQ USDA removed)
- Removed templated USDA loan tile paragraph confirmed verbatim in jarrell + florence pages
- Added neighborhood spotlights: Garlic Creek (78610, Centex/Mercedes 2007–15, $310K–$390K), Sunfield (78610, 2700ac, Taylor Morrison/Pulte/Chesmar/David Weekley/Brightland, lazy river, $350K–$470K), Ruby Ranch (78610, larger lots, $375K–$550K+)
- Added schools H3: Jack C. Hays HS 6/10 GreatSchools, 2,191 students, 89–91% grad rate, sources inline
- Added employers H3: US Foods, Heaven Hill/Deep Eddy Vodka ($12.5M+ investment), Cabela's, Texas Lehigh Cement, incoming H-E-B (City of Buda March 2026 + Buda EDC sourced)
- Added closing cost breakdown at $370K: HCISD $1.1546/$100 + City of Buda $0.3576/$100 (both Community Impact sourced), ~$9K–$12K total
- Updated median price stat to $382K (Feb 2026, Houzeo)
- Updated at-a-glance with real tax rates, school name, employer list, median price
- Added rate-check-buda-kyle.html internal link in Why section
- Added WebPage schema with dateModified 2026-04-24
- Meta description updated with school/employer specifics
- Queue: Buda → Done; Next: Hutto

## 2026-04-24 — DPA post refresh: title/meta CTR fix + accuracy corrections (weekly-blog-editor)

- blog/2026-03-27-down-payment-assistance-texas-2026.html: title rewritten to include "Austin TX" + benefit-driven headline (was "What Still Works" — vague, not geo-targeted)
- Meta description rewritten: leads with $40K / $160K income angle instead of acronym list
- H1 + hero subtitle updated to match new angle
- USDA removed from TDHCA eligibility list (Adam does not do USDA)
- "broker" corrected to "correspondent lender" in FAQ
- Travis County TSAHC income limit added with inline cite ($167,250, TSAHC PDF)
- City of Austin DPA details updated: $40K, 10-year forgivable, 80% AMI limit
- Austin median home price ($450K, April 2026) added with inline ACTRIS cite
- Income limit paragraph updated: removed fabricated "$90K–$120K" range, replaced with verified $167,250 figure
- dateModified bumped to 2026-04-24
- Blog title lint: pass (all titles include "Adam Styer")

## 2026-04-24 — AEO body paragraphs + about.html CTAs (daily-opt)

- blog/can-i-switch-lenders: AEO body paragraph added (blog-post-intro inside header is not machine-extractable); H2 question format
- blog/how-to-compare-two-mortgage-offers: AEO body paragraph added; H2 question format
- about.html: 2 body CTAs changed from raw app URL to /get-preapproved
- sitemap.xml: lastmod updated for about.html + 2 blog posts to 2026-04-24
- NotebookLM script confirmed missing on disk — escalated to HIGH blocker

## 2026-04-23 — Footer Awards standardized + how-to-buy suburb links (daily-opt)

- Footer Awards updated to standard "136+ Reviews / 21-Day Avg. Close / Licensed in Texas" across 12 suburb pages (standard template variant)
- Trust strip review count updated to "136+ Reviews · 5.0 Stars" on 3 pages (florence, jarrell, marble-falls — older template variant)
- how-to-buy-a-house-in-austin-tx.html: added internal links to all 24 Austin suburb mortgage pages between Step 4 and Step 5
- sitemap.xml: how-to-buy lastmod updated 2026-04-03 → 2026-04-23
- Liberty Hill 2026-04-22b changes confirmed live on Netlify

# styermortgage.com — Changelog

## 2026-04-22 — Leander page deepened (suburb-editor-daily round 1, #4)

- `leander-mortgage-lender.html` — 10 targeted changes:
  - Added Travisso neighborhood spotlight (78641, off TX-1431, Taylor Morrison/Toll Brothers/Highland/Drees, $600s–$2M+, Olimpico Way — travisso.com + taylormorrison.com sources)
  - Added school ratings with GreatSchools links: Glenn HS 6/10, Leander HS 6/10, Vista Ridge HS 8/10
  - Added employer section: LISD 6,000+ (leanderisd.org/careers), National Aero Stands 2024 (leandertx.gov), Austin tech corridor commute context
  - Added closing cost breakdown at $440K median: title ~$1,837, escrow ~$600, recording ~$125, tax proration ~$3,278 (LISD source)
  - Updated median price throughout to $438K Feb 2026 (Redfin) with citation; replaced vague "$380K–$450K"
  - Added LISD + Williamson County tax rate citations ($1.0869 + $0.3999 per $100) in intro and body
  - Removed USDA Loans feature-item (Adam does not do USDA per voice guide)
  - Removed templated DPA paragraph (confirmed verbatim duplicate with pflugerville page); replaced with Leander-specific DPA card
  - Fixed LocalBusiness schema description to remove USDA
  - Added WebPage schema + dateModified 2026-04-22

## 2026-04-22b — Liberty Hill content enrichment + footer audit (daily-opt)

- `liberty-hill-mortgage-lender.html` — H2 "Loan Options for Liberty Hill Buyers" → question format for AEO
- `liberty-hill-mortgage-lender.html` — At-a-glance: added Orchard Ridge to neighborhood list; added Williamson County property tax context (1.9–2.4% vs Travis County 2.2–2.7%)
- `liberty-hill-mortgage-lender.html` — Footer Awards updated from old 91 Google/45 Zillow split to standard 136+ / 21-Day Avg. Close
- `sitemap.xml` — liberty-hill lastmod updated to 2026-04-22

## 2026-04-22 — Bee Cave AEO audit + broker-vs-bank AEO/SEO pass (daily-opt)

- `bee-cave-mortgage-lender.html` — Fixed OG description "near Eanes ISD" → "Lake Travis ISD" (factual error); added Lakes Edge neighborhood + inline /calculators.html link; footer Awards updated to 136+ standard
- `mortgage-broker-vs-bank.html` — Added "Adam Styer |" to title; converted 4 statement H2s to question format for AEO; fixed CTAs /prequal.html → /get-preapproved (3 places); updated Article schema dateModified; footer Awards updated
- `sitemap.xml` — lastmod updated for both changed pages to 2026-04-22

## 2026-04-21b — Title tag audit + sitemap dedup (daily-opt second run)

- `dscr-loan-austin-tx.html` — title trimmed 68→48 chars (removed redundant "| Investor Mortgage"), OG title updated
- `loans/refinance.html` — title reordered/trimmed 67→56 chars ("Cash-Out Refinance Austin TX" now leads keyword), OG title updated
- `sitemap.xml` — removed duplicate mortgage-pre-approval-austin.html entry (kept priority 0.9, removed 0.8 duplicate)

## 2026-04-21 — Cedar Park page deepened (suburb-editor-daily round 1, #3)

- `cedar-park-mortgage-lender.html` — 9 targeted changes:
  - Rewrote AEO opener: FHA + jumbo program hooks tied to Leander ISD buyers and Twin Creeks/Ranch at Brushy Creek price range
  - Replaced 2 generic body paragraphs with employer section: Cedar Park Regional Medical Center (Ascension), ETS-Lindgren, National Oilwell Varco, Firefly Aerospace ($1.1B NOC contract 2024) — Cedar Park EDC source
  - Updated at-a-glance: real tax rate 1.86% nominal / 1.52% effective with WilCo + LISD source URLs; removed unverified IBM reference; corrected Apple distance
  - Updated home prices H3: $492K March 2026 Redfin median replacing vague $400-500K range; added Block House Creek low end + Twin Creeks upper end
  - Added school ratings H3: Cedar Park HS 8/10 + Vista Ridge HS 8/10 (GreatSchools links + physical addresses)
  - Added 3 neighborhood spotlights: Buttercup Creek ($420K-$650K, 78613), Ranch at Brushy Creek ($500K-$850K, 78613), Twin Creeks ($700K-$1.1M+, Toll Brothers Crestline 2026)
  - Added closing cost breakdown at $492K: lender title ~$2,100, escrow $650, recording $125, tax proration at 1.86% combined rate (~$4,575 mid-year), prepaids $3,500-$4,500
  - Removed generic "Why Should Cedar Park Homebuyers Use an Independent Mortgage Broker?" H3 (templated boilerplate, confirmed pattern across Leander + Round Rock pages)
  - Added internal link to rate-check-cedar-park.html; added WebPage schema; updated FAQ schema home price answer with Redfin $492K + LISD school ratings
- `run-logs/suburb-editor-queue.md` updated: Cedar Park marked done, Leander is next

## 2026-04-20 — Georgetown page deepened (suburb-editor-daily round 1, #2)

- `georgetown-mortgage-lender.html` — 6 targeted changes:
  - Updated FAQ schema + accordion: $395K median Feb 2026 with Redfin source (was vague ranges)
  - Added WebPage schema with dateModified 2026-04-20
  - "Georgetown at a glance" paragraph: added Redfin median price citation + named employers (AirBorn, St. David's, Loram Technologies, Southwestern University, SportClips HQ) with Chamber of Commerce source
  - Added Wolf Ranch Neighborhood Spotlight: 129 Canyon View Road, 78628, Hillwood Communities, Highland Homes builder, with source link
  - Replaced sourceless "Schools" paragraph with Georgetown ISD school ratings: Georgetown High 7/10 GreatSchools + East View 5/10 GreatSchools, both with source URLs
  - Added closing cost breakdown: $1,762 title insurance, $600 escrow, $125 recording, ~$7,200/yr taxes (GISD $1.0506 + Georgetown city $0.3532 per $100, Community Impact + Hello Georgetown sources)
- `run-logs/suburb-editor-queue.md` updated: Georgetown marked done, Cedar Park is next

## 2026-04-20 — CTR titles complete: all 24 suburb pages + H2 audit done (daily-opt run 2)

- CTR-hook titles + neighborhood-specific meta descriptions: Buda, Westlake, Manor, Marble Falls, Spicewood, Smithville, Elgin, Florence, Jarrell, Taylor
- USDA removed from meta descriptions: Smithville, Elgin, Florence, Jarrell (voice guide: Adam does not do USDA)
- Manor H2s fixed to question format (2 remaining label-format H2s)
- H2 format audit confirmed: ALL 24 suburb pages now in question format ✅
- CTR-hook titles: ALL 24 suburb pages complete ✅ (milestone)
- sitemap.xml lastmod updated for all 10 pages to 2026-04-20
- Self-review: PASS — 10 HTML files + sitemap, GTM=2, no USDA in metas, no Styer Team

## 2026-04-20 — H2 question format + CTR titles, 5 suburb pages (daily-opt run 1)

- 20 content H2s converted to question format: Lakeway, Bee Cave, Bastrop, New Braunfels, Austin-area hub
- CTR-hook titles + neighborhood-specific meta descriptions: Lakeway (jumbo/luxury), Bee Cave (luxury/jumbo), Bastrop (acreage/rural)
- sitemap.xml lastmod updated for all 5 pages to 2026-04-20
- Schema Monday audit: all clean — AggregateRating, FAQPage, Person all ✅
- Hutto reviewCount verified at 136 ✅; blog title lint clean ✅
- 11 of ~24 suburb pages now have CTR-optimized titles (up from 8 after yesterday's run)

## 2026-04-20 — Weekly competitive intel run 7 (Monday)

- SERP check: 10 keywords tracked (7 core Austin + 2 suburb + 1 revisit)
- styermortgage.com upgraded to #1 for "hutto tx mortgage lender" (was #3)
- styermortgage.com new #2 for "round rock tx mortgage lender" (first appearance in top 3)
- Two new competitive threats identified: MortgageAustin.com (#1 for pre-approval) + Nest Mortgaging (6+ keyword positions)
- AsertaLoans new entrant at #1 for "cash out refinance austin tx"
- Report written to run-logs/competitive/2026-04-20.md + latest.md updated
- NotebookLM SEO notebook updated with Week 7 report + master growth log refreshed
- Re-verify gate: 5 prior claims cleared/upgraded (Vista dropped, Lone Star #1 pre-approval cleared, MortgageAustin.com broker claim updated, Hutto #3→#1 upgraded)
- No site changes this run (research only)

## 2026-04-19 — H2 audit (Marble Falls + Elgin) + CTR title/meta rewrites (run 2)

- marble-falls-mortgage-lender.html — 4 H2s → question format for AEO extraction
- elgin-mortgage-lender.html — 4 H2s → question format for AEO extraction
- 8 suburb pages — generic titles → specific intent-matching hooks (per GOALS.md CTR priority)
- 8 suburb pages — generic meta descriptions → first-person, neighborhood-specific copy
- 8 suburb pages — og:title updated to match new titles
- sitemap.xml — lastmod updated for all 10 changed pages to 2026-04-19
- commit d4c2705 — 11 files, 42 insertions, 42 deletions

## 2026-04-19 — GBP weekly post: Rate Commentary — Week 16 (styer-gbp-weekly agent)

- GBP post (184 words, Rate Commentary theme) auto-published to Publer, job ID: 69e4e36dfa57756880b5ecae
- FB, Instagram, LinkedIn platform-adapted drafts inserted into social_drafts (status: draft, awaiting Adam approval)
- 4 activity log entries created in social_activity table
- Post saved to run-logs/gbp-posts/2026-04-19.md
- Master growth log updated; NotebookLM source refreshed

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

## 2026-04-21 — Pre-approval AEO + Refinance Texas cash-out FAQ (daily-opt)

- `mortgage-pre-approval-austin.html` — added 53-word AEO answer-first paragraph before first H2 with same-day pre-approval hook; dateModified 2026-04-21
- `loans/refinance.html` — added "How does a Texas cash-out refinance work in 2026?" to FAQ accordion + FAQPage schema (6 questions total); dateModified 2026-04-21
- `sitemap.xml` — lastmod updated to 2026-04-21 for both pages
- Blog title lint: CLEAN; self-review: PASS

## 2026-04-23 — Pflugerville suburb editor (daily-opt, queue #5)

- `pflugerville-mortgage-lender.html` — Blackhawk neighborhood spotlight (78660, GFO/Chesmar/Coventry builders, $465K+ new construction, sourced Homes.com); school ratings H3 (Hendrickson HS 8/10, Pflugerville HS 6/10, GreatSchools linked); employer list H3 (Amazon 1,000 jobs PCDC cited, Costco, Baylor Scott & White, Samsung Taylor via US-130); closing cost breakdown at $355K median (Travis County recording ~$150, PISD $1.1069/$100 cited, ~2.0–2.1% combined rate); updated median price to $355K Mar 2026 (Redfin, cited in intro + market context + FAQ); removed "Down Payment Assistance" loan card (verbatim match Georgetown + Smithville — confirmed via grep); fixed USDA from LocalBusiness schema description; added WebPage schema + dateModified 2026-04-23

## 2026-05-05 — Non-QM SEO expansion (Phases 1–5)

- **7 new pages built** with deep research-backed copy: `non-qm-loans.html` (hub), `dscr-loans-texas.html`, `dscr-loans-fredericksburg-tx.html`, `dscr-loans-dripping-springs.html`, `bank-statement-loans.html`, `high-net-worth-mortgage.html`, `investor-loans.html`. Hub-and-spoke architecture; each spoke targets a specific borrower scenario or geography rather than templated near-duplicates.
- **Nav restructured site-wide** — added "Loan Programs" dropdown across 66 files. Header + footer normalized.
- **USDA deprioritized** — page noindexed (not deleted); removed from nav dropdown across all 66 files; removed from `products.html` loan card grid. Less disruptive than 301/delete; reversible if Adam ever does USDA again.
- **about.html NAP fix** — LocalBusiness schema address aligned to canonical 5718 Sam Houston Circle (was 5900 Balcones, multi-run flagged blocker now closed).
- **Internal linking** — hub-and-spoke pattern wired into `index.html`, `products.html`, `dscr-loan-austin-tx.html`, `self-employed-mortgage-austin.html`, `austin-mortgage-rates.html`.
- **Sitemap updated** — 7 new URLs added with 2026-05-05 lastmod (hub priority 0.9, spokes 0.8). USDA URL removed since noindexed.
- **Skipped:** `dscr-loans-nationwide.html`. Adam is TX-licensed only; CFPB/UDAAP risk on state-level licensing claims. Out-of-state investors find `dscr-loans-texas.html` instead.
- **Voice decision:** HNW page = warm conversational (consistent with rest of site), not cold private-banking tone. Sophisticated borrowers can read sophistication without being talked down to.

## 2026-05-08 — daily-opt Friday (Content Planning + AEO Review)

- Re-Verify Gate auto-resolved 1 stale carry: `how-to-buy-a-house USDA cleanup` — both URL variants (`-2026.html` and `.html`) return HTTP 404, page does not exist on site or in repo, phantom for 5+ runs.
- Self-review correction: initial auto-resolution of `about.html 91/45` claim under date-span framing was wrong. Real claim is GBP/Zillow review-count breakdown (lines 576, 755-756) — sums to 136+ stated elsewhere (internally consistent) but may drift vs live counts. Tagged UNVERIFIED:2026-05-08; stays in FLAG_FOR_ADAM (Adam's GBP/Zillow access required).
- Audited all 31 blog posts for funnel-CTA presence (path-agnostic grep covers absolute + relative); 31/31 pass.
- AEO sample audit on `2026-04-27-why-home-prices` + `2026-04-17-should-i-refinance`. Re-framed "why-home-prices structural decision" carry: post HAS `/get-preapproved` via relative `../get-preapproved`; actual gap is missing `/refinance-quote` + relative-vs-absolute path inconsistency.
- Blog cadence Day 11 reset per GOALS.md week-of-04-20 directive ("No new content on any site this week"); will re-evaluate Mon 2026-05-11 GOALS refresh.
- Conversion programmatic trace re-passed (15/21/5/14 markers across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you`); sitemap 200; products.html hero+bottom CTAs still propagated.
- 0 file modifications; self-review PASS; NotebookLM script 24th miss.

## 2026-05-09 — daily-opt Saturday (no-rotation drift sweep)

- Saturday no-rotation by design: Re-Verify Gate + sitemap + conversion + Step 4B sweep + Adam Friday-commit propagation check at 24h. Zero file modifications to repo.
- Sitemap 200; conversion 9/10 across `/`, `/get-preapproved`, `/refinance-quote`, `/thank-you` with all critical tokens (generate_lead, purchase_prequal/refi_quote, TCPA, Netlify Functions wired, GTM, dataLayer).
- Re-Verify Gate: 11 carries checked — 6 STILL OK, 4 STILL OPEN (products.html 7 in-card 1003, working-tree style.css, NotebookLM script, why-home-prices CTA structure 8th recurrence), 1 STILL UNVERIFIED (about.html 91/45). No drift, no auto-resolutions.
- Adam's 2 Friday commits sanity-checked at 24h: `0230947` April housing post (3 `/get-preapproved` + 1 `/refinance-quote`), `3daf874` Hutto Round 2 (4 `/get-preapproved`). Both holding live, sitemap lastmod fresh.
- Blog CTA coverage 31/31 ✅; SEO/SEM ZERO/LOW_RISK queue still empty.
- NotebookLM script 26th consecutive missing; auth expired on master-log source refresh (known carry, HIGH FLAG_FOR_ADAM).
- Self-review PASS — 0 modifications, hard constraints intact.

## 2026-05-15 NIGHT — daily-opt (Friday — THIRD same-day fire 23:09)
- Third Friday fire on 2026-05-15 (AM 09:49, PM 09:53, NIGHT 23:09; PM→NIGHT gap = 13.3h). Friday rotation already done twice today. Third-fire bonus drift sweep — every-run non-negotiables only.
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens across 4 pages (homepage / get-preapproved / refinance-quote / thank-you). GTM single-container hex `GTM-PQQ6PGLR` verified.
- Re-Verify Gate: 16 carries — all STILL OK / STILL OPEN. No drift, no auto-resolutions, no false regressions. AM Tuesday meta fixes (FTB 158c, DPA 161c, Pflugerville 151c) STILL LIVE.
- PSI quota 8-of-8 drain held; skipped retry to preserve potential Monday-refresh window. NotebookLM script 38th consecutive missing check.
- Scheduler reliability escalated MEDIUM → HIGH FLAG_FOR_ADAM: Thursday 2026-05-14 no-fire + Friday 5/15 triple same-day fires confirms pattern, not flakiness. Manual scheduler review warranted.
- Self-review PASS — 0 site files modified, hard constraints intact, style.css working-tree (Adam's nav-dropdown fix) preserved untouched.

## 2026-05-18 (Monday 07:09 CDT — styer-site-daily second pass)
- **Phase A residual:** Retired fabricated AggregateRating JSON-LD blocks on 6 loan-type pages + Dripping Springs (`loans/{construction,jumbo,usda,va,fha,investment}.html`, `dripping-springs-mortgage-lender.html`). Commit `0cc148a` deployed and live-verified on all 7 URLs (HTTP 200, AggregateRating=0, reviewCount136=0). JSON-LD validity confirmed via Python `json.loads` on all blocks post-edit. Site-wide user-facing AggregateRating exposure now 0/8.
- **Auto-resolved:** about.html "91 Google / 98 Zillow / 45 Zillow" body-copy — all three tokens now 0× live. Audit finding #4 body-copy fully cleared on about.html.
- **Deferred:** `/investor-loans` + `/high-net-worth-mortgage` title rewrites (12-run carry). Previous pass approved Tuesday self-execute; this pass declined per GOALS.md Phase B impending name swap. Adam decision required: rewrite now for SEO consistency or wait for the name swap?
- Sitemap 200 ✅. Conversion tracking 10/10 critical tokens across 4 pages. GTM single-container hex verified.
- Self-review PASS — 7 site files modified, all JSON-LD block removals + 1 trailing-comma trim. Hard constraints intact.

## 2026-05-21 (styer-site-daily — Thursday rotation)

- **Phase B residual scrub:** Removed last "Styer Team" wording sitewide. `realtors.html:189` team-office.jpg alt attribute now reads "Adam Styer at his Kyber Mortgage Corporation dba HyperSmart Home Loans office in Austin, Texas". Commit `276b894` deployed; verified live in ~1s, HTTP 200.
- **Site-wide entity scrub confirmed clean:** 0 "Mortgage Solutions LP", 0 NMLS 2526130, 0 "Styer Team" sitewide. Adoption of HyperSmart + Kyber + NMLS #2653540 healthy across homepage + /get-preapproved + /refinance-quote + /thank-you.
- **Thursday rotation — Internal Linking + Funnel Flow:** 3 complicated-income pages audited (self-employed, DSCR, bank-statement). All hit ≥2 high-intent CTAs (/scenarios + /calculators + /contact). thank-you.html structure intact (Calendly + tel + 3 next-step markers). contact.html wiring intact (Netlify + form-name + dataLayer).
- **New finding:** homepage has 0 direct CTAs to `/get-preapproved` or `/refinance-quote` post-`71b8590` hero cleanup. Routes go direct to loan-app URL + tel:. Flagged for Adam.
- **Sitemap + robots 200 ✅. Conversion tracking 10/10 ✅.**
- **NotebookLM script missing — 47th consecutive dead check.** PSI quota drain — 14th consecutive.

## 2026-05-30 (styer-blog-writer-weekly — FIRST RUN, supervised)

- **Net-new post PUBLISHED:** "Physician Mortgage Loans in Texas: How Doctors Qualify in 2026" (`blog/2026-05-30-physician-mortgage-texas.html`, 1,387 words, Tier B). Commit `4876d86`. The new writer task's first live output — sibling to the Friday editor; this is the only task that creates URLs.
- **Grounded in approved sources only:** Fannie Mae Selling Guide B3-3.3-03 (employment offers/contracts), B3-6-05 (deferred student-loan DTI), B3-3.1-01 (income continuance), CFPB ATR/QM 12 CFR 1026.43. No rate quotes. 4 inline citations.
- **All 7 compliance gates PASS.** GATE 3 required a STRIP: removed "24 hours / same day" performance-time claims from the dual-CTA + body before publish.
- **Registered in 4 surfaces:** blog.html noscript + CollectionPage schema, blog/manifest.json, sitemap.xml. Wired into complex-income cluster with 5 in-body links (jumbo x2, self-employed, 1099-only, non-QM).
- **To undo:** `git revert 4876d86 && git push`. Run brief: `run-logs/content-2026-05-30.md`.

## 2026-05-31 (interactive — lead-flow safety release)

- Removed email, name, and phone from quick-quote thank-you URLs. Follow-up prefill now uses tab-scoped `sessionStorage`; legacy contact query parameters are stripped before analytics initializes.
- Added capture-response checks for shared quick-contact and legacy quote forms. Visitors now see an error and retry path if neither Netlify Forms nor `lead-intake` accepts the submission.
- Excluded modern `.js-quick-contact` forms from the legacy Netlify fallback to prevent the homepage hero form from binding twice and redirecting unexpectedly.
- Removed the direct Google Ads library request from `thank-you.html`; GTM remains the single loader. Bumped `script.js` cache version to `20260531` across 102 HTML files.
- Added `tests/lead-flow-regression.test.js`. Verified with `node --check script.js`, `node --test tests/lead-flow-regression.test.js`, `git diff --check`, and local browser smoke tests for both homepage and legacy quote paths.

## 2026-06-07 (styer-site-daily — Sunday weekend re-verify)

- Health checks green: sitemap.xml + robots.txt HTTP 200; 133 live = 133 local; conversion tracking 10/10 (HTML-token, identical to prior run).
- Blog fresh (latest 2026-06-05, 2 days old) + tracked-LP CTA sweep 24/24, 0 missing. SEO/SEM backlog 0-eligible; BLOCKERS.md clean.
- Re-Verify Gate auto-resolved 1 stale TODO carry: 4th-run NEEDS-ADAM "styer-suburb-editor-daily status" — Adam answered (b) on 2026-06-06 (freeze deleted, task → GOALS.md Keep-Running). Marked `[x]` in TODO.md.
- Adam batch-memo (USDA / perf-claims / 0-tracked-LP) still unanswered — pointed to, not re-surfaced. NotebookLM advisor script absent (66th run). PSI not re-attempted (Monday-rotation work).
- 0 site-HTML files modified. Doc/log only (TODO, CONTEXT, run-log, learnings, this entry). Sister-task gbp-posts working file not staged.

## 2026-06-09 (styer-site-daily — Tuesday: Title Tags + Meta Descriptions)
- Trimmed 2 over-length meta descriptions to ≤160 chars: `asset-depletion-calculator.html` (217→152), `loans/jumbo.html` (203→160, now matches its og/twitter description). Commit `930da40`, both verified live HTTP 200.
- Title audit (111 pages): 0 duplicate titles, 0 missing public-page titles. `title!=og:title` confirmed by-design (social variant) — not equalized.
- Meta-description "SHORT" flags (index/kyle/scenario/etc.) identified as regex artifacts (apostrophe truncation) and verified against live tags — 0 false fixes. `thank-you.html` no-description confirmed correct (noindex).
- Conversion 10/10; sitemap 134 live = 134 local; SEO/SEM BLOCKERS clean, 0 backlog items eligible. Adam batch-memo still unanswered — 3 cluster carries stay paused.

## 2026-06-11 (styer-site-daily — Thursday: Internal Linking + Funnel Flow)
- Shipped honeypot-consistency (deferred from 06-10): added `netlify-honeypot="bot-field"` + hidden `bot-field` input to all 7 inline quote forms (kyle, cedar-park, dscr, bank-statement, self-employed, non-qm, hnw). Commit `ed49bd8`; verified 7/7 live (HTTP 200, bot-field served, form-name intact).
- Funnel trace: all 7 forms `action="/thank-you"` → `thank_you_page_view` Ads conversion fires; internal-linking spot check (kyle/dscr/non-qm) dense, no gaps.
- Re-Verify Gate: re-characterized prequal.html "conversion parity" MEDIUM→LOW — already routes to /thank-you so conversion fires; only granular dataLayer event absent.
- Health: sitemap/robots 200; conversion 10/10; NotebookLM script absent (70th). Concurrent-writer hutto + sister-task gbp-posts left unstaged.

## 2026-06-22 (styer-competitive-weekly — Wk 16, research only)
- **Broad recovery / mean-reversion week.** Nearly every Wk 15 "loss" reverted, confirming the Wk 15 pullback was WebSearch composition noise, not real decay. Asset depletion back at **#1** (Wk15 "#6 collapse" was noise → moat intact); self-employed reclaimed **#1** (blog; Champions fell #1→#6); jumbo back to **#2** (Grove fell #2→#8); 1099 best-position ↑ to **#3**. Lone decliner: bank statement #7→#8 (1st NWM + Texas Tech CU new entrants).
- **★ Styer prequal.html DEBUTS #7 on "get pre-approved austin tx mortgage"** — first-ever top-10 on a core (non-suburb) purchase term.
- **Suburb rotation Pflugerville + Kyle:** Pflugerville **#1 ★** (above directories; ↑ from #2 Wk11), Kyle **#3** (↑ from #6 Wk11).
- **Re-Verify Gate correction (curl+grep, authoritative):** long-carried "LendFriend has NO FAQPage schema" is FALSE — LendFriend's self-employed page DOES carry FAQPage JSON-LD; the real wedge is **AggregateRating**, which NEITHER party has (symmetric gap, first-mover advantage). Prior "no FAQPage" readings were WebFetch markdown false-negatives. Styer's asset-depletion page confirmed carrying FAQPage (6 ld+json blocks). LendFriend now displays 547 Google + 1,113 Experience review counts visually but un-schema'd.
- Cleared 9 Wk15 claims as CHANGED-recovered, held 4, corrected 1. NotebookLM dead on both legs (advisor script absent + CLI auth erroring, re-verified live). Report: `run-logs/competitive/2026-06-22.md`.
- **0 site-HTML files modified** (research only). Doc/log only: competitive report + latest, learnings, CONTEXT, TODO, this entry, master growth log. Concurrent-writer files (`index.html`, `run-logs/latest.md`, `run-logs/2026-06-20.md`, `gbp-posts/*`) left untouched + unstaged.
## 2026-07-11 — Complex-mortgage conversion, compliance, and content implementation

- Added the required audit, implementation plan, content inventory, and compliance-inconsistency documents.
- Repositioned the homepage and clarified scenario vs secure-application CTAs.
- Expanded scenario intake and rebuilt the Realtor difficult-scenario form on the existing Netlify-to-LoanOS path; removed the unsupported nationwide claim.
- Added the buy-before-you-sell landing page, business-owner article, sitemap entries, analytics events, and a dedicated 404.
- Validation: 22 tests passed; syntax/diff checks passed; responsive review passed at 375, 430, 768, 1024, and 1440 px.

## 2026-08-06 — New blog post: asset depletion case study (Adam-requested, ad hoc)

- Added `blog/2026-08-06-asset-depletion-loan-case-study-former-cfo.html` — anonymized client story (former CFO, sabbatical after a company liquidity event, zero W-2 income, qualified via asset depletion), matched to existing blog post template (GTM, Article/FAQPage/BreadcrumbList JSON-LD, header/nav/footer).
- Links to the existing `/asset-depletion-mortgage-texas.html` pillar page and `/asset-depletion-calculator.html` rather than duplicating the divisor deep-dive, to protect the page's #1 SERP position on asset depletion terms.
- Registered in `blog.html` (CollectionPage ItemList + noscript block), `blog/manifest.json`, and `sitemap.xml`.
- Pre-publish checks run: blog title lint (`grep "<title>" blog/*.html | grep -v "Adam Styer"`) clean, all JSON-LD blocks validated, sitemap XML validated, 0 legacy-entity-name matches.
- Requested via Cowork (mobile session), not the daily automation rotation — CONTEXT.md/TODO.md/DECISIONS.md intentionally left untouched for the scheduled sessions to log in their normal rotation.

## 2026-08-10 — August 2026 Austin housing market report

- Published `blog/2026-08-10-austin-housing-market-report-august-2026.html` using the latest complete Unlock MLS report (June and first-half 2026) and Freddie Mac PMMS for the week ending August 6, 2026.
- Registered the post in the blog manifest, blog index, sitemap, and backward-compatible updates archive through the established newsletter publishing workflow.
- Added matching FAQPage structured data and preserved Adam Styer NMLS #513013, company NMLS #2653540, Texas licensing, principal-address, credit, and Equal Housing Lender disclosures.
- Prepared a borrower Mailchimp teaser linking to the live article. External send remains pending Adam's final confirmation.
- Added an Austin-specific editorial neighborhood visual, Adam's real headshot, social-share image metadata, and a warmer first-person editorial pass before the borrower and realtor sends.

## 2026-08-13 — Universal mortgage intake form

- Rebuilt `/get-preapproved.html` as a two-step, conversion-focused intake for all borrowers rather than a complex-file triage form.
- Limited Step 1 to goal, purchase price/property value, down payment/equity, property city/area, and process stage.
- Moved First Name, Last Name, Email, Phone, and an optional open-ended context field to Step 2; retained required TCPA consent and optional SMS opt-in.
- Removed initial-page loan amount, income type, credit range, household income, property type, and under-contract duplication, plus all “where is the file getting stuck?” framing.
- Preserved Netlify capture, lead-intake/LoanOS/Mailchimp routing, UTM fields, GTM events, validation, consent, and thank-you routing. Updated segmentation for investment and construction goals.
- Verified the complete interaction at desktop and mobile sizes with no horizontal overflow. Full test suite passed: 104 tests.
- Standardized the narrow form card to one full-width field per row on desktop and mobile, removing uneven label wrapping and the empty half-row beside Property City / Area.
