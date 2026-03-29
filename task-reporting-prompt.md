# Task Reporting — Scheduled Agent Instructions

## Purpose

When you finish a scheduled Claude Code task, append a structured report to `task-reports.json` in the repo root. The Task Command Center dashboard (`task-dashboard.html`) reads this file and displays all task activity across both projects: **Styer Mortgage** and **LoanOS**.

Do this at the **end of every session** before committing and pushing.

---

## Step 1: Read the current file

```bash
cat task-reports.json
```

Do not regenerate the file from scratch. You will append to the existing `reports[]` array and update the top-level `lastUpdated` field only.

---

## Step 2: Build your report object

Use this exact structure:

```json
{
  "id": "rpt-YYYYMMDD-NNN",
  "taskId": "your-task-id",
  "taskName": "Human-Readable Task Name",
  "project": "styer-mortgage | loanos",
  "timestamp": "2026-03-28T09:12:00Z",
  "status": "complete | in-progress | failed",
  "summary": "One sentence. What happened. No filler.",
  "completed": [
    "Past-tense action taken — be specific",
    "Second action taken"
  ],
  "actionItems": [
    {
      "text": "What needs to happen — be specific enough for another agent to act on",
      "priority": "high | medium | low",
      "status": "open | resolved"
    }
  ],
  "nextSteps": [
    "What the next run of this task should do first",
    "Deferred work or dependencies"
  ],
  "metrics": {
    "anyRelevantMetric": "value"
  }
}
```

### Field rules

| Field | Rule |
|-------|------|
| `id` | Format: `rpt-YYYYMMDD-NNN` where NNN is a 3-digit counter for that day. Check existing IDs first. |
| `taskId` | Must match a task `id` in `tasks[]`. If your task is new, add it to `tasks[]` first. |
| `timestamp` | ISO 8601 UTC. Use the actual time you're writing this, not the session start time. |
| `status` | `complete` = all planned work done. `in-progress` = partial. `failed` = blocking error. |
| `summary` | One sentence max. Lead with the result, not the process. |
| `completed` | Past tense. Specific. Include file names, counts, IDs where relevant. |
| `actionItems` | Only include if something requires follow-up. Mark `status: "resolved"` for issues you fixed in this session. |
| `nextSteps` | What the *next scheduled run* should prioritize. Not what you're doing now. |
| `metrics` | Include any quantified outputs: counts, scores, %s. Omit if nothing quantifiable. |

---

## Step 3: Check the inbox

Scan `inbox[]` for items matching your project. If you picked one up:
- Set `"status": "picked-up"` on the item
- Include it in your `completed[]` array

If you completed an inbox item fully:
- Set `"status": "completed"`

If you're adding new items for other tasks or future sessions to pick up:
- Append to `inbox[]` using this structure:

```json
{
  "id": "inbox-NNN",
  "text": "Clear description of what needs to happen",
  "project": "styer-mortgage | loanos",
  "source": "your-task-id",
  "priority": "high | medium | low",
  "status": "pending",
  "createdAt": "2026-03-28T09:12:00Z",
  "notes": "Optional context. Specific enough for another agent to act on without re-reading this session."
}
```

---

## Step 4: Write the updated file

1. Prepend your new report to the **beginning** of `reports[]` (most recent first)
2. Update `lastUpdated` to the current ISO timestamp
3. Write the full updated JSON back to `task-reports.json`
4. Validate: the file must be valid JSON. Run `node -e "JSON.parse(require('fs').readFileSync('task-reports.json','utf8'))"` to confirm.

---

## Step 5: Commit

Include the report update in your session commit:

```
git add task-reports.json
git commit -m "chore: task report — [task name] [date]"
```

Do NOT create a separate commit just for the report. Bundle it with your session's changes.

---

## Task IDs — Reference

| Task ID | Name | Project | Frequency |
|---------|------|---------|-----------|
| `website-daily-audit` | Daily Website Audit | styer-mortgage | daily |
| `content-planner` | Weekly Content Planner | styer-mortgage | weekly (Fri) |
| `google-ads-optimizer` | Google Ads Optimizer | styer-mortgage | weekly (Mon) |
| `seo-performance-check` | SEO Performance Check | styer-mortgage | weekly (Mon) |
| `loanos-daily-audit` | LoanOS Daily Audit | loanos | daily |

If you're a new scheduled task not in this list, add yourself to `tasks[]` before writing your first report.

---

## What makes a good report

**Do:**
- Be specific — file names, commit hashes, row counts, scores
- Flag blockers clearly with enough context for Adam or another agent to act
- Keep `summary` to one tight sentence
- Include metrics if you have them

**Don't:**
- Write filler ("I completed the following tasks today...")
- Leave `actionItems` empty when there are obvious open issues
- Mark `status: "complete"` if you hit a blocker
- Duplicate reports for the same session

---

## Dashboard

Reports are displayed at `task-dashboard.html` — a single-file dashboard that reads `task-reports.json` via `fetch()`. No server needed. Open it locally or view it at your Netlify deploy URL.
