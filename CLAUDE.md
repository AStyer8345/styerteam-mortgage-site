# Styer Mortgage + LoanOS — Claude Code Instructions

## Repository

This repo powers **styermortgage.com** (Netlify) and contains build tracking for **LoanOS**.

- Site: https://styermortgage.com
- Owner: Adam Styer | Mortgage Solutions LP | NMLS #513013
- Stack: Static HTML/CSS/JS, Netlify Forms, n8n automation, Google Fonts (async)

## Task Dashboard Reporting (REQUIRED)

Every Claude Code session in this repo — scheduled or manual — **must** update `task-reports.json` before finishing. The Task Command Center (`task-dashboard.html`) reads this file.

See `task-reporting-prompt.md` for the full spec. Quick summary:

1. Read `task-reports.json`
2. Append a report to `reports[]` with: `id`, `taskId`, `timestamp`, `status`, `summary`, `completed[]`, `actionItems[]`, `nextSteps[]`, `metrics{}`
3. Check `inbox[]` for pending items you can pick up
4. Update `lastUpdated`
5. Validate JSON: `node -e "JSON.parse(require('fs').readFileSync('task-reports.json','utf8'))"`
6. Commit with your session changes — don't make a separate commit for the report

### Report format

```json
{
  "id": "rpt-YYYYMMDD-NNN",
  "taskId": "your-task-id",
  "taskName": "Human-Readable Name",
  "project": "styer-mortgage | loanos",
  "timestamp": "ISO 8601 UTC",
  "status": "complete | in-progress | failed",
  "summary": "One sentence. Result first.",
  "completed": ["Specific past-tense actions"],
  "actionItems": [{"text": "...", "priority": "high|medium|low", "status": "open|resolved"}],
  "nextSteps": ["What the next run should do"],
  "metrics": {"key": "value"}
}
```

### Task IDs

| Task ID | Name | Project | Frequency |
|---------|------|---------|-----------|
| `website-daily-audit` | Daily Website Audit | styer-mortgage | daily |
| `content-planner` | Weekly Content Planner | styer-mortgage | weekly (Fri) |
| `google-ads-optimizer` | Google Ads Optimizer | styer-mortgage | weekly (Mon) |
| `seo-performance-check` | SEO Performance Check | styer-mortgage | weekly (Mon) |
| `loanos-daily-audit` | LoanOS Daily Audit | loanos | daily |

New tasks: add yourself to `tasks[]` in `task-reports.json` before writing your first report.

## Code Standards

- Async Google Fonts on all pages (preload + noscript fallback)
- FAQPage + Article + BreadcrumbList + LocalBusiness schema on all public pages
- TCPA consent checkbox on all forms
- noindex on internal pages (dashboard, ops, thank-you)
- SVG icons preferred over emoji
- Netlify Forms require both `netlify` attribute and hidden `form-name` input
- GTM container: GTM-PQQ6PGLR on all public pages
