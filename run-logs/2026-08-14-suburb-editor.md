# styer-suburb-editor-daily — 2026-08-14

**Target:** `pflugerville-mortgage-lender.html` — Round 5 #5 (last touched 2026-06-26, Round 4).

## Scheduler gap

Last suburb-editor run logged: **2026-07-23** (Leander, R5 #4). That's a **22-day gap**. Cross-checked `git log` against run-log filenames: no unlogged suburb-editor commits exist in that window (last repo commits are `83b4e1e` / `aa265ce`, both styer-content-weekly 2026-07-24). This is a genuine task outage, not a fired-but-unlogged run. Escalated to the queue file + CONTEXT scheduler blocker.

## Research — all claims direct-fetched and cited

| Claim | Source | Note |
|---|---|---|
| Highland Park builders/build years/style | austinrealestatehomesblog Highland Park guide | Capital Pacific + Lennar 2005–2008; D.R. Horton to 2018, "Hyde Park" front-porch plans |
| Highland Park price/sqft/HOA | Neighborhoods.com | $290,000–$469,999; ~$211/sqft; 1,292–2,388 sqft; HOA $41–$45/mo |
| Highland Park Elementary 7/10, 703 students, 528 Kingston Lacy Blvd | GreatSchools (direct fetch) | Aggregators said 6/10 — direct source overrode |
| Park Crest Middle 6/10, 682 students, 1500 N Railroad Ave | GreatSchools (direct fetch) | Aggregators said 5/10 — direct source overrode |
| EOS North America, $3M, 10 jobs, M 290-1/M 290-2/M 400-4 | Community Impact 2026-02-02 + EOS press release | Roles: operations, QA, engineering, machine commissioning |
| TX title basic premium formula, eff. 2026-03-01 | TDI titlerates2026 | (face − $100,000) × 0.00494 + $780 |

### Claims CUT (unverifiable — not published)

- **Travis County MUD No. 21 ($0.375/$100).** Surfaced under a Pflugerville query, but the district's own directory page states water/sewer is provided by the **City of Leander**. Not a Pflugerville MUD. Cut.
- **Per-subdivision MUD rates for Pflugerville.** Could not source to an authoritative document. Cut rather than approximated.
- **Highland Park "2.2285% tax rate."** Single aggregator claim that conflicts with the page's already-sourced ~2.04% nominal / 1.82% effective stack. Cut; used the established Ownwell-cited 1.82% for all escrow math.
- **2026 Travis County FHA loan limit.** Sources conflicted ($571,550 vs $563,500) and HUD's lookup is interactive-only. No specific limit published — FHA copy states the qualitative relationship only.

## Changes shipped

**4 first-party elements, all grep-confirmed new (0 prior hits on the page; "Highland Park" appeared on zero suburb pages sitewide):**

1. **NEW neighborhood spotlight — Highland Park (78660).** Heatherwilde Blvd at Kingston Lacy Blvd, SW of the SH-45/SH-130 interchange. Full builder/vintage/sqft/HOA detail. **The differentiated insight:** Highland Park feeds the *same* Hendrickson HS 8/10 as Blackhawk (~$530K resale) and Falcon Pointe ($500K median list), at ~$240K less on the entry end with $41–45/mo HOA — i.e. the cheapest door into that attendance zone. No competitor page states this; it requires joining a price source to a feeder source.
2. **NEW schools — Highland Park Elementary 7/10 + Park Crest Middle 6/10** (direct GreatSchools, with enrollment + street addresses). Page previously had no Park Crest or Highland Park campus.
3. **NEW employer — EOS North America.** Metal additive-manufacturing production in Pflugerville; $3M Feb-2026 investment, 10 new jobs. Directly substantiates the PCDC Workforce Study additive-manufacturing line the page already carried but never evidenced with a named firm.
4. **NEW closing-cost example — FHA 3.5% down on a $350,000 Highland Park home.** $12,250 down / $337,750 base / $5,911 UFMIP financed / ~$343,661 balance; itemized title ($2,015, TDI formula), escrow, Travis County recording, survey/appraisal/credit/flood, HOI, and 3–4 mo tax escrow at 1.82%; mid-year proration credit ~$3,185. Total $12,250 down + $8,250–$9,300 closing.

**De-template (required step):** removed the FHA loan-program boilerplate *"3.5% down with credit scores as low as 580. More flexible DTI ratios…"* — grep-confirmed on **6** suburb pages before the cut, **5** after. Replaced with Pflugerville/Highland-Park-specific FHA math plus an honest FHA-vs-conventional tradeoff (monthly MI doesn't fall off like PMI).

**Correctness fix (pre-existing error).** The conventional example's title line read *"Lender's title insurance: ~$1,600 (Texas DOI-promulgated rate on $355K)"* — mislabeled and understated, and priced off $355K in a $360K example. Corrected to the **owner's policy at $2,064** on a $360,000 sale using the TDI 2026 promulgated formula, with the TDI source linked and a note that who pays is negotiated.

**Schema:** `dateModified` 2026-06-26 → 2026-08-14. FAQPage 5 → 6 questions (added the Hendrickson-zone affordability Q, mirrored in the visible accordion). MortgageBroker description updated with Highland Park + both new campuses. All 4 JSON-LD blocks validated.

## Concurrent-writer handling

Working tree arrived with **139 dirty files** from other sessions: a sitewide footer review-link change (137 files), an `about.html` enhancement, and — critically — a **complete but undeployed 2026-08-06 asset-depletion blog post**: untracked `blog/2026-08-06-…html` plus its registrations in `blog.html`, `blog/manifest.json`, `sitemap.xml`, and a `CHANGELOG.md` entry. Dangling 8 days.

Staging `sitemap.xml` wholesale would have published a sitemap URL pointing at a **404** (entry present, HTML file untracked). So rather than the Leander-precedent "adopt the orphaned work" route — publishing another session's blog post is outside this task's scope and is an outward-facing publish — I staged **only my own hunks** of `sitemap.xml` and `CHANGELOG.md` by writing blobs built from `HEAD` + my single change directly into the index. The working tree was never modified, so all 139 concurrent files remain exactly as the other sessions left them.

**FLAG_FOR_ADAM:** the 08-06 asset-depletion blog post is complete, checked, and has sat undeployed for 8 days. Its CHANGELOG entry says pre-publish checks passed. It needs one `git add` of the blog file + blog.html + manifest.json + its sitemap line to go live. Not mine to publish.

## Verification

- 4/4 JSON-LD valid (MortgageBroker, FAQPage ×6 Q, WebPage, BreadcrumbList).
- FHA boilerplate: 6 pages → 5 (Pflugerville now 0).
- `#fha-example` anchor target exists and resolves.
- Blog title lint clean.
- Arithmetic re-checked: 3.5% of $350K = $12,250; UFMIP 1.75% × $337,750 = $5,911; TDI $350K = $2,015; TDI $360K = $2,064; 1.82% × $350K = $6,370/yr = $531/mo; itemized low sum $8,255 → published range corrected $8,300 → **$8,250**.
- Dev-server preview unavailable (unattended session blocks server start) — verified against the live Netlify deploy post-push instead.
