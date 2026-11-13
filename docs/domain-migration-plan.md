# Domain migration: styermortgage.com to styerteam.com

Verified November 3, 2026. This replaces the obsolete proposal for thestyerteam.com.

## Production source and routing

- Vercel team: `team_aJNpxKvLlNTUiDdWTdhX0Vgf`.
- Project: `styerteam-site` / `prj_oPet4IOgPuN9hDtBFYcfbEi3HJEg`.
- Connected GitHub repository: `AStyer8345/styerteam-mortgage-site`.
- Audit baseline: production deployment `dpl_EfQqukGca2CqZU4HyM3Wm6KRwPcV`, commit `eeee418c64ece1d90ccf4bc6c4a046e932a13d30`, ref `cursor/blog-2026-11-02-refi-out-of-non-qm`. Recheck before each release.
- Canonical origin: `https://styerteam.com` in `site.config.json`, HTML metadata, JSON-LD, sitemap, robots and llms.txt.
- Both `styermortgage.com` and `www.styermortgage.com` return permanent 301 redirects to the corresponding path at `styerteam.com`, preserving query strings. Existing specific legacy mappings remain in place.
- `www.styerteam.com` redirects to the apex (Vercel domain-level 308).
- Redirect source: `_redirects`; compile with `node scripts/vercel-config.mjs` into `vercel.json`. Domain-level `redirect: null` does not mean a host lacks a deployed config redirect.
- Preserve all public paths, detailed-guide noindex decisions, analytics IDs, form names/fields/actions, capture and attribution. Leave DNS and mail records unchanged.

## Verified identity

The Styer Team, Powered by Go Rascal Inc. Legal entity: Go Rascal Inc., company NMLS 2072896. Adam Styer: individual NMLS 513013; 512-956-6010; adamstyer@gorascal.com.

Company license source: https://gorascal.com/government-licensing-disclosures
Secure application: https://gorascal.my1003app.com/513013/register — browser verified to show Adam Styer, NMLS 513013, his direct phone/email, and Go Rascal Inc. NMLS 2072896 on November 3, 2026. Do not replace it with a guessed URL.

## Release verification

1. Inspect the current production deployment and Git source; do not overwrite newer work.
2. Run `CONTEXT=deploy-preview npm run build` and relevant affiliation, routing, SEO and form regressions.
3. Verify a staged/reviewed deployment, then production READY and `/api/version`.
4. Check both old hosts with nested paths and query strings, canonical specialty pages, sitemap, robots and llms.txt.
5. Test capture success, failure, duplicate/attribution and fallback behavior with mocked local tests. Never submit fake production leads. Live rendering and endpoint checks do not prove inbox delivery.

## External follow-up

Former employer team listings and third-party directory profiles are independently managed. Search snippets may remain stale until recrawl. Search Console Change of Address, sitemap ownership and directory edits require separate account verification; do not claim these completed from a successful deployment. Retain the old domain registrations and redirects.
