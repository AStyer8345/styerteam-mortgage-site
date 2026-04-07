# styermortgage.com

Public mortgage website for Adam Styer | Mortgage Solutions LP (NMLS #513013). Austin, TX.

## Stack

Static HTML/CSS/JS on **Netlify**. No framework, no build step. Netlify Functions (Node.js) for content generation, email automation, and lead capture.

## Local Dev

```bash
node server.js        # port 8099
# or
node .claude/site-server.js  # port 8766 (with API proxy)
```

## Deploy

Push to `main` → Netlify auto-builds and deploys.

## Environment Variables (Netlify)

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
