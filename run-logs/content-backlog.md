# Content Backlog — styer-blog-writer-weekly

> Topic queue for the weekly blog writer. The writer reads this top-to-bottom,
> picks the highest-priority UNCONSUMED topic that survives the dedup gate, then
> appends it to "Consumed topics" with the publish date + slug.
> Maintained by: styer-competitive-weekly (refreshes Tier A), Adam (any tier), and
> the writer itself (logs consumed + may append discovered gaps to Tier C).

## Tier A — Competitive opportunities (highest priority)
Source of truth: `run-logs/competitive/latest.md` "opportunities" section.
The writer re-reads that file each run; entries below are a manual mirror for weeks
the competitive task hasn't refreshed.

### DSCR cluster — top priority (Adam seeded 2026-06-05)
HyperSmart has best-in-market DSCR pricing. Push this cluster hard — emphasize the
lender-cost / rate-spread advantage where the claim is substantiated by a real lock
or a defensible rate-sheet comparison. NEVER quote a live rate or use "lowest rate"
performance language (compliance — see writer SKILL STEP 4). Frame the advantage
through investor outcomes: cash flow on close, faster qualifying, lower payment
relative to alternatives.

Existing DSCR hub to cross-link from EVERY post below:
`blog/2026-03-31-dscr-loans-austin-tx-2026.html`. Each entry below has a distinct
primary search intent from that hub and from each other — required to pass the
writer's dedup gate.

- **DSCR Loan Requirements Texas 2026** — eligibility deep-dive: credit minimums, reserves, DTI-equivalent ratios, property types, occupancy rules, LLC vs personal titling. Intent: "do I qualify". Cite Fannie/Freddie investor-property guidelines as the conventional baseline (DSCR is non-QM so guidelines differ — be explicit about which rules don't apply). Cross-link to hub.
- **DSCR vs Conventional Investment Property Loan in Texas** — decision-stage comparison: rate, down payment, qualifying basis (property income vs personal DTI), closing speed, reserves, future-property capacity. Intent: "which one do I pick". Highest commercial intent in the cluster — investors actively shopping. Use a real anonymized deal pattern from `memory/people/active-borrowers.md` if a DSCR file fits.
- **DSCR Loan for Short-Term Rental (Airbnb / VRBO) in Texas** — STR-specific income calculation, 12-month projected vs market rents, AirDNA / approved-source data, Hill Country + Austin metro relevance. Intent: "can I finance my Airbnb". Heavy overlap with Hill Country and Adobe Creek-style investor traffic — cite ATTOM / Unlock MLS where available.
- **DSCR Cash-Out Refinance Texas (BRRRR strategy)** — refi mechanics: seasoning requirements, LTV caps, how rate-and-term prices vs cash-out, when to wait. Intent: "pull equity out of a rental I already own". Decision-stage, high-LTV, repeat-investor audience.
- **No-Ratio / Low-DSCR Loans in Texas — when the property cash-flows under 1.0** — sub-1.0 DSCR programs, pricing trade-offs vs standard 1.0+ DSCR, when the math works (appreciation play, value-add, second-home conversion). Intent: niche investor whose deal doesn't pencil at standard DSCR. Low competition, high-margin lead.

### Open Tier A slots (auto-populated by styer-competitive-weekly)
- (auto-populated from competitive/latest.md)

## Tier B — SEO-AUDIT Phase 3 landing/cluster gaps
Source: `/Users/adamstyer/Documents/SEO-AUDIT-2026-05.md`. Blog-post angles that
support the planned landing pages (the pages themselves are a separate effort).

- VA loan basics for Austin buyers — eligibility, funding fee, $0-down reality (supports future VA landing page)
- ~~Physician mortgage in Texas — how doctor loans treat student debt + deferred income~~ — CONSUMED 2026-05-30
- Self-employed underwriting deep-dive — add-backs, 2-year averaging, what underwriters actually want

## Tier C — GSC page-1 / 0-click recovery
Source: most recent GSC export in `~/Downloads/` or `tasks/`. Pages ranking page-1
with zero clicks → a companion blog post that targets the question intent.

- (auto-populated from GSC export when available)

## Consumed topics (append-only log)
Format: `YYYY-MM-DD | <slug> | <tier> | <commit-sha>`

- 2026-05-30 | 2026-05-30-physician-mortgage-texas | B | 4876d86
- 2026-06-05 | 2026-06-05-dscr-cash-out-refinance-texas-brrrr | A (DSCR cluster) | 50d1919
- 2026-06-05 | 2026-06-05-dscr-airbnb-str-loan-texas | A (DSCR cluster) | 50d1919
- 2026-06-14 | 2026-06-14-dscr-vs-conventional-investment-property-loan-texas | A (DSCR cluster) | 8323044
- 2026-06-14 | 2026-06-14-buy-before-you-sell-austin-tx | manual (Adam-directed) | a60395e
- 2026-06-16 | 2026-06-16-dscr-loan-requirements-texas | A (DSCR cluster) | bbe7c05
- 2026-06-23 | 2026-06-23-no-ratio-low-dscr-loans-texas | A (DSCR cluster) | db561c1
- 2026-06-30 | 2026-06-30-bank-statement-loans-texas | A (bank-stmt freshness, Wk16 THREAT #1) | 5c2a2b0
