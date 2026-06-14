# Blog Writer Run Brief — 2026-06-14 (manual, Adam-directed)

**Note:** This is a MANUAL, Adam-directed writer run, distinct from the same-day scheduled DSCR
post (`content-2026-06-14.md`, commit 8323044). STEP 0 double-fire guard and STEP 1 topic
selection were intentionally overridden. Topic was fixed by Adam; dedup gate confirmed no existing
or backlogged post on the buy-before-you-sell intent.

## Topic
How to Buy Your Next Home Before Selling Your Current One (Austin, TX) — buy-before-you-sell
strategy: pending-sale DTI relief, bridge financing, home-sale contingency strategy.

- **Tier:** manual (Adam-directed)
- **Slug:** 2026-06-14-buy-before-you-sell-austin-tx
- **File:** blog/2026-06-14-buy-before-you-sell-austin-tx.html
- **Live URL:** https://styermortgage.com/blog/2026-06-14-buy-before-you-sell-austin-tx.html
- **Word count:** 1,399 prose (intro through "How I Help You Pick"), excl. FAQ accordion,
  related-links list, and signature. Within 1,200–1,600 target.

## Sources cited (approved-source grounding)
NotebookLM was DOWN (CLI --json unsupported + auth expired) — used SKILL-sanctioned WebSearch
fallback against approved-source domains only.

1. Fannie Mae Selling Guide **B3-6-06** — pending-sale principal residence PITIA excluded from
   DTI with (a) executed sales contract + (b) cleared financing contingencies. (Load-bearing claim.)
2. Fannie Mae Selling Guide **B3-6-05** — bridge-loan contingent liability handling.
3. **CFPB 12 CFR 1026.43** — bridge-loan definition (temporary loan, ~12 months or less, to buy a
   new dwelling when selling the current one).

3 inline citations, all anchor-linked to approved-source URLs.

## Compliance & quality gate results (STEP 4)
- [PASS] Brand "HyperSmart Home Loans" present (10×); ZERO "The Styer Team" / "Mortgage Solutions LP" / "Styer Mortgage".
- [PASS] NMLS/entity correct — Adam 513013, company 2653540, Kyber Mortgage Corporation dba HyperSmart Home Loans.
- [PASS] No performance-metric marketing ("24-hour", "same-day", "fastest", "guaranteed approval") — 0.
- [PASS] No raw 1003 URL (my1003app.com count = 0; CTAs route to /scenario.html + /get-preapproved.html).
- [PASS] Title lint — `<title>` contains "Adam Styer"; grep -v returns empty.
- [PASS] TX-only / no USDA — 0 USDA occurrences; TX-only origination framing.
- [PASS] Cluster wiring — 5 in-body internal links (get-preapproved, scenario, loans/refinance, cash-out refi guide, refi decision guide); all targets verified to exist. No bridge-loan hub page exists, so none was invented.
- [PASS] Schema — all 3 JSON-LD blocks parse (Article + FAQPage[5 Q&As] + BreadcrumbList pos-3 → new post).
- [PASS] Registration — all 4 surfaces (blog.html noscript + CollectionPage, blog/manifest.json, sitemap.xml). manifest JSON + sitemap XML validated well-formed.

## Live verification
- HTTP 200 at the slug URL (Netlify strips .html).
- Slug-substring content match confirmed ("Buy Your Next Home Before Selling").

## Commits
- **Commit A (publish, revert target):** a60395e — post + 4 registration surfaces.
- **Commit B (bookkeeping):** this brief + backlog consumed-log + CHANGELOG.

## Could-not-verify / notes
- Voice guide file (`adam-voice-and-workflow.md`) still shows the legacy entity name in one line;
  CLAUDE.md override is authoritative and was followed (HyperSmart display name throughout).
- Bridge-loan pricing/cost intentionally NOT quoted (compliance: no live rates, no named proprietary
  programs). Mechanics grounded only; product specifics framed as "evaluate which fits."
