# Independent campaign review

Reviewed October 5, 2026. Local review only; no ad account changes, submissions, messages, deployment or source edits. This review reads the actual-data report as controlling over the older strategy. The isolated website was inspected at the supplied production-based checkout; findings describe source, not verified live delivery.

## Recommendation

Lead with **a rental cash-out feasibility review**: estimated cash after payoff and costs, the payment on the full replacement loan, and rental coverage. The offer fits Adam's stated priority and the existing preview. “Put your rental property's equity to work” needs the adjacent payment tradeoff and conditional language. Higher intent, better conversion and profitable funding remain hypotheses.

Test DSCR first. Retain $1,800 DSCR / $900 self-employed / $300 assets as **monthly ceilings**, not approved spend or a proven optimal split. Start DSCR after launch gates pass; stage self-employed next and assets last. Do not automatically move unused supporting budgets into broad DSCR or generic cash-out traffic. Leave money unspent when useful demand or evidence is missing.

## Verified evidence and its limits

The preserved UTF-16 tab-delimited Planner exports confirm these historical bid figures and indices. The associated interface ranges are documented in the October 4 report; export values such as 50, 500 and 5,000 are buckets, not independently exact counts. Search demand covers September 2025–August 2026, Google only, all languages. Austin is Nielsen DMA, not city or Census metro.

| Texas phrase | Reported monthly range | Ad competition index | Historical top-of-page bid range |
|---|---:|---:|---:|
| dscr loan | 1,000–10,000 | 65 | $4.27–$15.02 |
| dscr cash out refinance | 10–100 | 56 | $9.19–$54.95 |
| bank statement loans | 100–1,000 | 72 | $13.55–$62.52 |
| asset depletion mortgage | 10–100 | 41 | $5.38–$57.72 |

General DSCR demand supports a first test; it does **not** establish cash-out demand sufficient to spend $1,800. Cash-out has a lower index but higher bid benchmarks than general DSCR. Austin cash-out has a 10–100 range and missing bid/competition data. Missing metrics are unavailable, not zero. Close variants overlap; do not sum phrases into unique borrowers. Advertiser competition is not SEO difficulty, and historical bid percentiles are not expected CPC. [Google's metric definitions](https://support.google.com/google-ads/answer/3022575?hl=en).

The preserved Search Console snapshot confirms 3 clicks / 55 impressions / 9.38 average position for “asset depletion calculator” in September 4–October 1. That is a reason to preserve the organic asset page and calculator even if paid testing is deferred. It proves neither qualified leads nor AI citations. This review did not refresh authenticated Search Console, Analytics, auctions or CRM outcomes.

## Keywords, destinations and ads

Proposed customer destinations use existing URLs except one distinct cash-out addition. These are planned final URLs, not statements that a new page is already public.

| Intent / ad group | Proposed final URL | Decision |
|---|---|---|
| Explicit rental cash-out | `https://styermortgage.com/dscr-cash-out-refinance-texas.html` | Add one focused page with embedded calculator and scenario review. |
| Core DSCR, equity message | Same cash-out URL | Small separate experiment; copy must say rental ownership and cash-out. Report separately from explicit cash-out. |
| General DSCR purchase / refinance, if later tested | `https://styermortgage.com/dscr-loans-texas.html` | Reuse; do not send a general purchase promise to a cash-out-only page. |
| Bank-statement intent | `https://styermortgage.com/bank-statement-loans.html` | Reuse; adapt the existing page in place. |
| Broader self-employed intent | `https://styermortgage.com/self-employed-mortgage-austin.html` | Reuse only if separately tested; keep documentation comparison. |
| Asset-depletion intent | `https://styermortgage.com/asset-depletion-mortgage-texas.html` | Reuse; preserve the existing asset calculator link. |

Use measured `[dscr cash out refinance]` plus a controlled phrase equivalent for explicit intent. Research “rental property cash out refinance,” “investment property cash out refinance,” and Texas variants before giving them numerical demand or CPC claims. Core `[dscr loan]` / `[dscr loan texas]` can bring purchases, education and professional research. Keep those results separate and review search terms; exact match still includes the same meaning or intent. [Google match behavior](https://support.google.com/google-ads/answer/7478529?hl=en).

The preview's ad assets meet the measured 30-character headline and 90-character description limits. Their conditional descriptions align with scenario review. But a rotating RSA can omit the rental cash-out context if it combines generic assets. Require a rental cash-out headline in a guaranteed displayed position, such as **Texas DSCR Cash-Out Refinance**, and check every permitted combination. Preview mockups are illustrative, not Google's actual render or approval. [RSA combinations and limits](https://support.google.com/google-ads/answer/7684791?hl=en).

Reuse DSCR sitelinks to `#calculator` and the actual scenario-review section on the new page. Use existing documentation/FAQ sections for bank and asset sitelinks; verify their exact anchors during implementation. Do not launch preview URLs `bank-statement.html` or `asset-qualification.html`, which duplicate established borrower needs. Keep campaign studio, ad mockups and internal review material outside customer navigation and public indexing.

For self-employed, bank-statement searches deserve a later narrow test; the larger bids and missing funded outcomes do not justify a $12 assumed CPC. Do not imply every deposit qualifies or use “without tax returns” as an unrestricted promise. Asset qualification deserves organic preservation and at most a demand-limited later paid test; sparse data and a low index do not prove cheap qualified borrowers. Defer broad mortgage rates, generic cash-out/HELOC/Non-QM, display, automated expansion and additional paid channels.

## Existing inquiry journey: material integration findings

- Existing specialist forms use named Netlify forms, honeypots, stable `inquiry_id`, source/UTM fields, consent and `/thank-you` paths. `situation-journeys.js` submits the same ID to Netlify backup and `/.netlify/functions/lead-intake`; calculator context can travel through same-tab storage and the supported `situation` field. Preserve these contracts.
- `lead-intake.js` requires **email and stable inquiry ID**. The separate preview's combined “Email or phone” field cannot simply be connected to that endpoint. Use the established form or a reviewed compatible adaptation. Its no-send preview confirmation is appropriate locally.
- `assets/utm.js` retains first-touch navigation and UTMs for up to 90 days in local/session storage. No typed Google click-ID capture was found in the inspected scripts or intake mapping. The older report's generic `click_id` observation does not describe this checkout. Paid identifier persistence and accepted downstream storage remain launch work.
- Backend source persists the inquiry before dispatch; `ownerNotified` remains `null`. Accepted capture or an automation response is not evidence Adam received a notification. Netlify backup acceptance is also distinct from primary CRM delivery.

## Launch gates and measurement

1. Confirm current sponsor/company disclosures, Texas authority, available lender cash-out products and final copy with source evidence. Existing website wording is a reference, not independent verification. Do not assume a company or DBA transition is complete.
2. Obtain a fresh forecast for the **cash-out keyword set**, chosen match types and served geography. Treat it as a forecast. Use presence targeting as a controlled initial choice, qualify Texas collateral explicitly, and report Austin versus rest of Texas without overlapping targets. Apply the relevant housing/consumer-finance targeting restrictions. [Google location options](https://support.google.com/google-ads/answer/1722038?hl=en), [restricted targeting](https://support.google.com/adspolicy/answer/143465?hl=en).
3. Verify one accepted inquiry through controlled, excluded test records: compatible email/name fields, full editable calculator assumptions, stable ID, backup/primary capture, deduplication, notification receipt and CRM/loan linkage. Keep local previews simulated; do not run live tests under the current local-only authorization.
4. Preserve typed click identifiers, original and later source evidence, consent, landing page and inquiry/loan IDs across a return visit and external application/scheduling paths. Keep personal and financial data out of URLs and ordinary ad analytics. Verify the chosen offline milestone import before launch.
5. Report spend → unique legitimate inquiries → **human-qualified** borrowers → completed applications → locks → funded loans and actual retained revenue. Source-code qualification scores are not human approval. Calculator engagement remains diagnostic. Show cohort age, counts and denominators; do not declare one niche superior from a few outcomes.
6. Replace the older $12 CPC, conversion rates, revenue, profit and fixed CPQL/CAC thresholds with actual cohort economics. Pause immediately for broken capture, unusable products or materially irrelevant traffic. A numeric scale/kill rule needs actual retained contribution and downstream conversion evidence.

The local page/ad work can be reviewed before these operational gates pass. Publication, live routing or tracking changes, controlled live tests, campaign activation and media spend require Adam's separate explicit approval. No ranking or AI visibility result is guaranteed.

## Evidence inspected

- `_deliverables/2026-10-04-actual-keyword-data-and-ranking.md` (controls ranking/allocation); original `2026-10-04-paid-acquisition-strategy.md` (superseded assumptions retained only as sensitivity context).
- Original Texas/Austin Planner exports and complete comparison under `keyword-data-2026-10-04/`; preserved `seo-data/gsc/2026-10-01.json`.
- October 4 separate preview: ad assets, cash-out/bank/asset pages, simulated form script and README.
- Isolated website: DSCR Texas/Austin pages, DSCR calculator, bank/asset/self-employed destinations, `assets/utm.js`, `situation-journeys.js`, `script.js`, and `netlify/functions/lead-intake.js`.

No current CPC, conversion advantage, funded profitability, lender eligibility or notification delivery was established by this review.
