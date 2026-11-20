# styerteam.com

Public mortgage website for The Styer Team · Powered by GoRascal (NMLS #513013). Austin, TX.

## Stack

Static HTML/CSS/JS on **Vercel**, project `styerteam-site`. `scripts/vercel-build.mjs` runs the audited build and packages `.site-dist`. Existing function implementations remain under `netlify/functions/`; Vercel adapters under `api/` preserve their public endpoints.

## Local Dev

```bash
node server.js        # port 8099
# or
node .claude/site-server.js  # port 8766 (with API proxy)
```

## Deploy

Inspect the current Vercel production commit/ref before release; the repository default branch is not proof of deployed source. Run `CONTEXT=deploy-preview npm run build` and relevant tests, deploy the reviewed commit, then verify READY and `/api/version`. See `docs/domain-migration-plan.md` for the current domain contract.

## Environment Variables (deployment platform)

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API for content generation |
| `MAILCHIMP_API_KEY` | Email campaigns |
| `MAILCHIMP_LIST_ID` | Audience ID |
| `GITHUB_TOKEN` | Commit generated pages to repo |
| `DISPATCH_SECRET` | Auth for webhook dispatcher |
| `LOANOS_WEBHOOK_URL` | Web-lead forwarding to LoanOS |
| `LOANOS_WEBHOOK_SECRET` | Auth for LoanOS webhook |

## Docs

| File | Purpose |
|------|---------|
| `CONTEXT.md` | Current state — read before every session |
| `ARCHITECTURE.md` | Tech stack, page inventory, tracking, legal |
| `CHANGELOG.md` | What changed and when |
| `DECISIONS.md` | Architecture decisions (Chose/Over/Why) |
| `TODO.md` | Open work (Now/Next/Backlog) |
| `MAP.md` | Full file-by-file site map |
