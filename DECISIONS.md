# styermortgage.com — Decisions

## [2026-06-09] — Batch-memo decisions: USDA 1=b, speed claims 2=a, funnel attribution via /thank-you

**Chose:** (1) Reposition all 8 Class-A rural suburb pages OFF USDA — Adam does not originate USDA; pages now lead with conventional/FHA/VA/DPA + OTC construction, keeping the USDA FAQ question with an honest "I don't originate USDA" answer. (2) Kill "24-hour" speed-claim variants sitewide (non-blog), keep "same-day pre-approval" — reconciles GOALS.md ("no performance-metric marketing") with the voice guide (same-day is a true differentiator). (3) Resolve the 0-tracked-LP question at the form layer instead of the link layer: every lead form now lands on /thank-you where the Ads conversion fires, so organic submissions attribute without adding tracked-LP links to 34 pages. /scenarios.html remains the canonical organic LP.
**Over:** (1a) claiming Adam brokers rural USDA, or (1c) soft "ask me" reframe — both leave an advertised product he doesn't originate as page lead. (2b) killing all speed claims — strips a true differentiator. (3b) adding /get-preapproved links across the 34-page cluster — extra nav surface for a problem attribution plumbing already solves.
**Why:** Accuracy/compliance first (TDSML advertising exposure on USDA promotion), then conversion attribution with the smallest content footprint.
**Trade-off:** 8 rural pages may shed some "USDA loans [city]" long-tail rankings; the honest FAQ answer retains the query surface with a redirect-to-strength answer. Client testimonial quotes containing speed claims were left verbatim (2) or removed when product-false (2 USDA quotes) — never rewritten.
**Context:** Decisions captured live from Adam in the 2026-06-09 interactive session, answering run-logs/adam-batch-memo-2026-06-05.md.

## [2026-05-28] — Scenarios are a separate content type from pillar/product pages

**Chose:** Build `/scenarios/` as a parallel content type with its own hub, template, and silo. Scenario pages tell the story of one borrower file (Situation → Obstacle → Strategy → Outcome). They link UP to the relevant pillar page (e.g. `/self-employed-mortgage-austin.html`) and back to `/scenario.html` for conversion. They do not replace, fork, or compete with the existing pillar/product pages.
**Over:** Adding "real borrower story" sections inside the existing pillar pages, or treating scenarios as blog posts under `/blog/`.
**Why:** Pillars are evergreen "what is X" program guides written for organic SERP capture. Scenarios are narrative case-style content written for AEO citation and conversion. Mixing them dilutes both — a pillar page with a long anecdote loses the answer-first structure that wins featured snippets; a scenario inside the blog gets buried by date-based archives and competes with rate-update posts. Keeping the silo strict (scenarios link UP to pillars, not laterally to other scenarios via an automated widget) preserves the topical-authority signal of the pillar cluster while letting scenarios accrue their own AEO surface.
**Trade-off:** Adds maintenance surface (hub + template + each scenario). Requires Adam to supply anonymized facts for every scenario — slower content velocity than a generic blog post. The "no cross-category auto-widget" rule defers a likely-useful "related scenarios" feature until ≥15 scenarios exist; that's a v2 problem.
**Context:** Adam supplied a detailed Prompt A spec calling out the separation explicitly. The CONTEXT.md complicated-income SERP gap (0/5 ranking on self-employed / bank statement / non-QM / DSCR / 1099 Austin) is the motivating SEO context — scenarios are a credibility + AEO play targeting "examples / case studies / stories" intent that the pillar pages currently don't satisfy.

## [2026-05-28] — Scenario template enforces soft claims at the structural level

**Chose:** Bake compliance rules into the template structure itself: mandatory privacy/outcomes-vary line as a full-width footer block, inline `[Hedged category — e.g. ...]` hints inside every At-A-Glance cell, top-of-file compliance checklist as the first comment, noindex meta as a safety net, and "Program availability and guidelines change by investor, occupancy, and loan type" appearing next to every program-specific claim block.
**Over:** Putting compliance rules in a separate `CONTRIBUTING-scenarios.md` doc, or trusting future authors (including future AI sessions) to remember them.
**Why:** The 2026-05-17 audit flagged 8 hedged claims to verify and a sitewide pattern of accidental hard-number claims, performance-metric language, and fabricated testimonials in agent-generated content. A separate compliance doc is something you read once and forget; a structural enforcement (the disclaimer renders or the page doesn't look right; the bracketed hint appears exactly where a literal number would naturally get typed) is something you can't accidentally skip. Cheap to maintain — the rules live where the work happens.
**Trade-off:** Scenarios look slightly more "regulated" than a freeform blog post. Authors lose some narrative flexibility (no hard numbers, no specific cities + neighborhoods together). Acceptable cost: this is a mortgage broker site under TX state licensing where unhedged statements carry real liability.
**Context:** Mirrors the same "structural enforcement over remembered rules" approach used in the rate-shopper blog templates.

## [2026-05-28] — At-A-Glance block carries hedged categorical values only

**Chose:** The At-A-Glance table on every scenario page uses categorical, non-identifying values only — "Self-employed business owner," "Tax write-offs reducing documentable income," "Bank statement income documentation," "Greater Austin." Mirror these into the Article schema's `about` / `abstract` fields so AEO citations get the categorical signal too.
**Over:** Publishing actual loan amounts, LTVs, FICO scores, expense factors, divisors, or specific neighborhood + city combinations in the At-A-Glance table. (Those numbers are what make a scenario feel "real" and would otherwise be the obvious thing to put in a scannable data block.)
**Why:** Two reasons, both load-bearing:
1. **Borrower privacy.** A specific loan amount + neighborhood + employment type combination is identifying for many Austin sub-markets. Combining or changing identifying details (per the privacy disclaimer) means the At-A-Glance block can't honestly publish specifics anyway — categories preserve the truth.
2. **Compliance.** Any specific number ("70% LTV," "640 FICO floor," "50% expense factor") published in a scannable AEO-extractable block reads as a universal program rule to LLMs and SERP scrapers. Programs vary by investor, occupancy, and loan type — a number frozen in a 2026 scenario will be wrong by 2027. Hedged categorical values stay true.
**Trade-off:** The At-A-Glance block is less "wow, look how big the loan was" than it could be. We get scannability without the liability of universal-rule extraction. Adam can still tell the specific numeric story inside the narrative body where context lives — just not in the structured block where context disappears.
**Context:** The 2026-05-17 audit's "8 hedged claims to verify against current wholesale rate sheets" was the precipitating concern. Any specific number in a scenario block becomes the 9th item on that list as soon as wholesale guidelines move.

## [2026-05-17] — Homepage repositioned to private-wealth / non-QM niche

**Chose:** Lead the homepage (title, meta, H1, hero subtitle, MortgageBroker schema description + Offer Catalog, FAQPage) with self-employed / investor / complex-income lending. Demoted "First-Time Buyer Programs" bento card; surfaced DSCR Investor as the wide bento card in its place. Added 6 new niche/pillar pages: mortgage-for-business-owners-austin (pillar), asset-depletion-mortgage-texas, k1-income-mortgage-austin, 1099-only-mortgage-texas, p-and-l-mortgage-texas, one-time-close-construction-loan-texas.
**Over:** Keeping the broad "Austin mortgage broker — 21-day close, 40+ lenders" framing that previously led the site, or building separate niche-only pages without touching homepage positioning.
**Why:** Audit found the site was optimized for commodity searches ("Austin mortgage broker") while the actual book is 1,000+ closings of complex-income deals other LOs can't figure out. The MortgageBroker schema literally listed only Conventional/FHA/VA/Jumbo/Refinance — AI engines and Google had no structural signal for the non-QM niche. Competitor research (sourced in `cowork/scratch/styer-research-competitor-aeo.md`) confirmed K-1 income, asset depletion divisor comparison, and Texas STR-DSCR are underserved keyword universes in Austin.
**Trade-off:** Demoting FTB on the homepage may slightly weaken FTB landing-page CTR (FTB pages remain indexed and ranking organically; only the homepage surfacing changed). 75-page sitewide nav consistency deferred to a future pass — only homepage nav was updated this session. New pillar/niche pages add maintenance surface area (8 → 14 non-QM cluster pages).
**Context:** Adam approved the repositioning audit on 2026-05-17 and explicitly requested deep-research, fact-checked content with multi-agent execution. Three parallel research agents produced sourced research bundles in `cowork/scratch/styer-research-*.md`; four parallel content agents produced the 6 new pages from those bundles; one verification agent fact-checked the output and produced `FLAG_FOR_ADAM.md` with 11 embedded HTML-comment flags on hedged claims (rate premium bps, retirement haircut %, OTC contingency reserves, lender program parameters) that Adam should re-verify against current wholesale matrices before quoting borrowers. Fabricated 5-star testimonials initially generated by content agents were deleted per Adam's "no fabricated personal details" standing rule.

## [2026-04-16] — Rate-check form uses JSON + base64 PDF, not multipart

**Chose:** Form serializes fields as JSON and base64-encodes the PDF before POSTing to the n8n webhook.
**Over:** Native `FormData` / multipart/form-data (the obvious, standard approach for file uploads).
**Why:** n8n's webhook node (both v2 and v2.1) has a broken multipart parser. Testing showed it reliably parses only the first 3 form fields and then mashes everything after — including subsequent text fields AND the file — into a single corrupted binary blob labeled with whatever field name came 4th. This made the notification email useless and would have caused silent data loss on every submission.
**Trade-off:** Slightly larger request payload (base64 inflates binary by ~33%). For typical Loan Estimate PDFs (200KB–1MB) this is a non-issue. On the n8n side, one extra Code node ("Decode PDF") rehydrates the base64 back into a proper `application/pdf` binary for the email attachment.
**Context:** If n8n ever fixes its multipart parser, or if we switch lead capture to a different backend (Supabase Edge Function, Netlify Function), this can be revisited. Until then, JSON + base64 is the reliable path.

## [2026-04-16] — `neverError: false` on all Supabase HTTP nodes in n8n

**Chose:** Let Supabase HTTP node errors fail the workflow and surface in execution history.
**Over:** `neverError: true`, which swallows HTTP 4xx/5xx and reports the execution as successful.
**Why:** The rate-check workflow had `neverError: true` on both its Supabase inserts. NOT NULL constraint violations on `user_id` / `organization_id` were returning 400s that never bubbled up — the workflow reported success while nothing was landing. Found it only by testing with my personal Gmail and noticing no notification, then inspecting the raw HTTP response in execution data.
**Rule going forward:** `neverError` stays off on every Supabase-backed workflow. If a real use case needs tolerance for a single failed insert (e.g., a fan-out where one row can fail without killing the rest), use a dedicated error-handling branch instead of silencing the error globally.

## [2026-03] — Static HTML, No Framework

**Chose:** Vanilla HTML/CSS/JS with no build step.
**Over:** React, Next.js, or any SPA framework.
**Why:** Zero runtime overhead, instant page loads, no framework lock-in. Netlify serves raw files. Content pages don't need client-side routing.

## [2026-03] — Netlify for Hosting + Functions

**Chose:** Netlify with serverless functions (Node.js + esbuild).
**Over:** Vercel, Cloudflare Pages, or self-hosted.
**Why:** Native form handling, edge redirects via `_redirects`, function bundling with zero config. Content generation functions (newsletter, rate updates, realtor content) run as serverless endpoints.

## [2026-03] — Google Ads Conversion on thank_you_page_view Only

**Chose:** Single conversion event fires on /thank-you page load.
**Over:** Counting `generate_lead` as a conversion (which fires on every form submit).
**Why:** Google Ads optimizes bidding around conversions. Counting every form submit (including suburb quick-forms that don't redirect to /thank-you) would inflate conversion numbers and degrade Smart Bidding.
**Context:** This means suburb quick-form submissions are tracked in GA4 but NOT counted as Google Ads conversions. Known trade-off.

## [2026-03] — Landing Pages: Stripped Nav (Logo Only)

**Chose:** /get-preapproved, /refinance-quote, /thank-you show logo only — no site navigation.
**Over:** Full nav on all pages.
**Why:** Conversion optimization — remove exit paths from ad-driven traffic. Once someone is on a lead capture page, the only actions should be: fill the form, call, or book Calendly.

## [2026-03] — AEO Answer-First Paragraphs

**Chose:** Bold `<strong>` answer-first paragraph before the first H2 on every content page.
**Over:** Standard intro paragraphs or jumping straight to H2 sections.
**Why:** AI search engines (Perplexity, Google AI Overview) extract the first definitive statement. A bolded 50-60 word paragraph that directly answers the page's target query gets pulled as a citation.

## [2026-04] — Content Distribution: Two-Tier Auto-Post

**Chose:** Every website content piece auto-distributes twice — Tier 1 (immediate social post via Publer) and Tier 2 (platform-native post 2-3 days later).
**Over:** Manual social posting or single-distribution.
**Why:** Maximizes content ROI. Tier 1 gets fast visibility. Tier 2 adapts format (carousels, Reels) for each platform's algorithm.

## [2026-04-23] — LoanOS is the CRM of record

**Chose:** LoanOS (loanos.html in `AStyer8345/loanos` repo, backed by Supabase project `uuqedsvjlkeszrbwzizl`) as the single source of truth for all contacts, leads, and loan lifecycle data.
**Over:** Salesforce (legacy), Arive (LOS only), or raw Supabase tables as primary record.
**Why:** LoanOS was already being used as the working CRM before this decision was formally logged. Salesforce is decommissioned — no new contacts go there. Arive remains the LOS for pricing, disclosures, and AUS submissions but is not a contact or relationship system. Supabase powers LoanOS under the hood so it IS the data layer, but LoanOS is the record-of-truth interface. All n8n workflows (new-app, contract-received, pre-approval, CD, review-request) log activity to Supabase via LoanOS tables.
**Context:** Decision prompted by fragmentation audit (styer-p3-15): contacts lived in 4 systems depending on lifecycle stage. Commit: LoanOS is authoritative. Other systems sync to it or are reference-only. Salesforce references in any config/docs are legacy and should not be followed.

## [2026-05-05] — Hub-and-spoke 7-page non-QM cluster, not 30+ programmatic state pages

**Chose:** A 7-page hub-and-spoke non-QM cluster with deep, scenario-specific copy (DSCR Texas / Fredericksburg / Dripping Springs, bank-statement, HNW, investor, plus a non-QM hub).
**Over:** Programmatic 30+ state-level near-duplicates ("DSCR loans in [state]" templated pages).
**Why:** Google's helpful-content updates penalize templated near-duplicates. Hub-and-spoke with deep, specific content (named neighborhoods, borrower scenarios, real numbers) wins on both rankings and conversion.
**Context:** Adam's true niche is self-employed + investor non-QM in Austin/Hill Country. Programmatic state pages would also create out-of-state intent we can't legally serve (TX-licensed only).

## [2026-05-05] — Skipped dscr-loans-nationwide.html

**Chose:** No nationwide DSCR landing page. Out-of-state investors land on `dscr-loans-texas.html` instead.
**Over:** A nationwide page that captures search volume and refers out-of-state leads to corporate.
**Why:** Adam is TX-licensed only. Referring out-of-state to corporate is a real workflow, but a public-facing page implying nationwide capability is CFPB/UDAAP risk on state-level licensing claims.
**Context:** Out-of-state investors searching "DSCR loans Texas" are still real targets; the Texas page captures them without the licensing exposure.

## [2026-05-05] — HNW page uses warm conversational tone

**Chose:** Warm conversational voice on `high-net-worth-mortgage.html` — consistent with the rest of the site.
**Over:** Cold, formal "private banking" tone typical of HNW lender pages.
**Why:** Adam's voice is consistent across the site; sophisticated borrowers can read sophistication without being talked down to. Voice consistency also helps E-E-A-T signals — same author across pages.
**Context:** This is a deliberate departure from competitor HNW pages. Bet is that authentic voice converts better than borrowed prestige tone.

## [2026-05-05] — USDA: noindex, don't delete

**Chose:** Add `<meta name="robots" content="noindex">` to `loans/usda.html`; remove from nav and product surfaces.
**Over:** Deleting the page outright or 301-redirecting it.
**Why:** Less disruptive — Google drops it from the index without broken links; reversible if Adam ever does USDA again. No 301 chain to manage.
**Context:** Adam doesn't originate USDA. Multi-run blocker since at least 2026-04. Single decision unblocks ~88-page nav cleanup, the standalone page status, and remaining body/schema/FAQ USDA references on suburb pages.
