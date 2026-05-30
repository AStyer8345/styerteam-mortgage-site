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
