# styer-blog-writer-weekly Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a scheduled task that auto-publishes one net-new, compliance-gated blog post to styermortgage.com every Tuesday, with an FYI notification and one-command revert, plus the safety nets to catch a silently dead writer.

**Architecture:** A new prose SKILL (`styer-blog-writer-weekly/SKILL.md`) is run by the cron scheduler each Tuesday 8:00 AM CT. It creates content in the git repo (`styerteam-mortgage-site`), registers it across four surfaces, atomic-commits, pushes, verifies live, and notifies. A repo-tracked `run-logs/content-backlog.md` feeds topic selection. The Friday editor (`styer-content-weekly`) is untouched except a one-line brand-name bug fix. The `daily-briefing` task gains an 8-day net-new-post staleness alarm.

**Tech Stack:** Markdown SKILL prose (no code framework); git/Netlify static deploy; `mcp__scheduled-tasks` for cron registration; NotebookLM CLI for grounding; existing `blog/*.html` JSON-LD patterns.

**Two storage locations (critical):**
- SKILL.md files live in `/Users/adamstyer/.claude/scheduled-tasks/<taskId>/SKILL.md` — **machine-local, NOT git-tracked.**
- Content + backlog queue live in `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site/` (`blog/`, `run-logs/`, blog.html, manifest.json, sitemap.xml) — **git-tracked, committed by explicit filename.**

**Verification model:** No unit-test framework exists on this static site. "Tests" are grep assertions, file-existence checks, and a controlled first-run observation. Every task ends with an explicit verify step.

**Standing constraints (apply to every task):**
- Stage git changes by explicit filename. NEVER `git add -A` (the editor and Adam commit to this repo concurrently).
- Display name: "Adam Styer | HyperSmart Home Loans". Never "The Styer Team" or "Mortgage Solutions LP".
- Legal entity if cited: Kyber Mortgage Corporation dba HyperSmart Home Loans. Adam NMLS 513013, company NMLS 2653540, phone (512) 956-6010.
- Loan application link anchor-text only, never the raw URL: `https://hypersmart.my1003app.com/513013/register?time=1779291829279`.
- TX-licensed only; no USDA product surface.
- Commits co-authored: `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`.
- Do NOT commit unless the human has approved (this plan's execution is the approval for plan-driven commits).

---

## File Structure

| File | Location | Responsibility | Git-tracked |
|------|----------|----------------|-------------|
| `run-logs/content-backlog.md` | repo | Prioritized topic queue + consumed-topic log | Yes (create) |
| `styer-blog-writer-weekly/SKILL.md` | `~/.claude/scheduled-tasks/` | The writer task prose | No (create) |
| Scheduler registration | scheduler store | Cron `0 8 * * 2`, enabled, notifyOnCompletion | n/a (create) |
| `styer-content-weekly/SKILL.md` | `~/.claude/scheduled-tasks/` | Editor task — line 53 brand fix only | No (modify) |
| `daily-briefing/SKILL.md` | `~/.claude/scheduled-tasks/` | Add 8-day net-new-post staleness check | No (modify) |
| `blog/YYYY-MM-DD-<slug>.html` | repo | Each net-new post (produced at runtime) | Yes (runtime) |
| `blog.html`, `manifest.json`, `sitemap.xml` | repo | Registration surfaces (updated at runtime) | Yes (runtime) |
| `run-logs/content-YYYY-MM-DD.md` | repo | Per-run brief (produced at runtime) | Yes (runtime) |

---

## Task 1: Seed the topic backlog file

**Files:**
- Create: `run-logs/content-backlog.md`

- [ ] **Step 1: Define the verification**

Success = file exists at `run-logs/content-backlog.md`, contains the three priority tiers (competitive opportunities, SEO-AUDIT Phase 3, GSC page-1/0-click), a "Consumed topics" log section, and at least 3 seed topics drawn from the existing roadmap so the very first run has something to pick.

- [ ] **Step 2: Write the file**

Write `run-logs/content-backlog.md` with exactly this content:

```markdown
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
- Physician mortgage in Texas — how doctor loans treat student debt + deferred income (supports future physician page)
- Self-employed underwriting deep-dive — add-backs, 2-year averaging, what underwriters actually want

## Tier C — GSC page-1 / 0-click recovery
Source: most recent GSC export in `~/Downloads/` or `tasks/`. Pages ranking page-1
with zero clicks → a companion blog post that targets the question intent.

- (auto-populated from GSC export when available)

## Consumed topics (append-only log)
Format: `YYYY-MM-DD | <slug> | <tier> | <commit-sha>`

- (none yet)
```

- [ ] **Step 3: Verify**

Run: `cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site && grep -c "^## Tier" run-logs/content-backlog.md && grep -c "^- " run-logs/content-backlog.md`
Expected: first number `3` (three tiers), second number `>=3` (seed topics present).

- [ ] **Step 4: Commit**

```bash
cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site
git add run-logs/content-backlog.md
git commit -m "$(cat <<'EOF'
Seed content backlog queue for weekly blog writer

Three-tier topic queue (competitive opportunities, SEO-AUDIT Phase 3,
GSC page-1/0-click) plus an append-only consumed-topics log.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Write the writer SKILL.md

**Files:**
- Create: `/Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly/SKILL.md`

This file is the entire writer. It is machine-local (not git). Write it complete — a scheduled run starts with zero memory of this conversation.

- [ ] **Step 1: Define the verification**

Success = file exists with valid YAML frontmatter (`name`, `description`); contains all six design sections as runnable instructions; the compliance gate lists all 7 hard stops; the publish step stages by explicit filename and forbids `git add -A`; the verify step uses slug-substring matching; the skip path is loud, not silent.

- [ ] **Step 2: Create the directory**

```bash
mkdir -p /Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly
```

- [ ] **Step 3: Write the SKILL.md**

Write `/Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly/SKILL.md` with exactly this content:

````markdown
---
name: styer-blog-writer-weekly
description: Styermortgage blog WRITER (not editor) — auto-publishes ONE net-new, compliance-gated blog post per week (Tuesday). Creates URLs. Sibling to the Friday editor, which only refreshes existing posts.
---

You are the weekly blog WRITER for styermortgage.com. You create ONE net-new post per run and publish it automatically. The Friday editor (`styer-content-weekly`) only polishes existing posts — you are the only task that creates URLs. Guarantee: a post ships every week unless a hard gate fails, and a failed week is announced loudly, never silent.

Repo: `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` (static HTML on Netlify, auto-deploys on push). All `cd` into this repo first.

## Read first
- `/Users/adamstyer/Documents/GOALS.md`
- `/Users/adamstyer/Documents/loanos-clone/tasks/social-media/adam-voice-and-workflow.md` — AUTHORITATIVE Styer voice guide (Styer mortgage only).
- `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site/CONTEXT.md`
- `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site/CLAUDE.md`
- `/Users/adamstyer/Documents/CLAUDE.md` (global conventions)
- `run-logs/content-backlog.md`
- `run-logs/competitive/latest.md` (Tier A topics — opportunities section)

## STEP 0 — Double-fire guard (run before anything else)

```bash
cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site
# Newest net-new blog post by add-date in git history:
LAST_NEW=$(git log --diff-filter=A --name-only --pretty=format:%cI -- 'blog/2*.html' \
  | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}T' | head -1 | cut -dT -f1)
echo "Last net-new blog post added: ${LAST_NEW:-none}"
```

If `LAST_NEW` is within the last 5 days, a post already shipped this cycle (scheduler hiccup or manual run). Log "SKIP: double-fire guard, last post $LAST_NEW <5 days ago" and exit cleanly. Do NOT publish.

## STEP 1 — Select the topic

Read `run-logs/content-backlog.md` and `run-logs/competitive/latest.md`. Choose the highest-priority UNCONSUMED topic:
1. **Tier A** — opportunities in `run-logs/competitive/latest.md`.
2. **Tier B** — SEO-AUDIT Phase 3 angles in the backlog.
3. **Tier C** — GSC page-1 / 0-click recovery (read newest GSC export in `~/Downloads/` or `tasks/` if present).

Bias toward the complex-income clusters (self-employed, DSCR/investor, jumbo/HNW, bank-statement, 1099, non-QM, Austin/Texas) over generic rate-shopper angles.

### Dedup gate (can change the topic, never skips the week)
Before committing to a topic, check it is not a near-duplicate of an existing post:

```bash
ls blog/ | sed 's/\.html$//'
grep -li "<title>" blog/*.html | xargs grep -h "<title>" 2>/dev/null
```

- If the chosen topic substantially overlaps an existing post (same primary query intent), do NOT write a near-duplicate. Move to the next backlog topic. Repeat until you find a distinct topic.
- If the new topic is adjacent to an existing hub (e.g., a DSCR sub-angle), keep it distinct AND plan a cross-link to the canonical hub in STEP 4.
- The gate forces a different TOPIC, never a different angle on the same one, and never skips the week. Only a fully exhausted backlog (no distinct topic anywhere) is a legitimate skip — that is a loud skip per STEP 6.

## STEP 2 — Research & ground (no AI slop)

Ground every factual claim in NotebookLM against approved sources ONLY:
- Fannie Mae (Selling Guide, LLPA matrix), Freddie Mac (PMMS, Seller-Servicer Guide)
- IRS (Schedule C, Schedule K-1, Form 1040 guidance)
- CFPB (ATR/QM, 12 CFR 1026.43), FDIC (deposit/bank-statement guidance), HUD/FHA handbook (cross-product comparisons only)
- ATTOM, Unlock MLS/ACTRIS, FRED (Austin market data)

Use the NotebookLM CLI (`/Users/adamstyer/.local/bin/notebooklm`, always `--json`). If NotebookLM auth is expired or the CLI fails, fall back to WebSearch against the SAME approved-source domains. If you cannot verify a claim from an approved source, cut the claim — never pad with non-authoritative links.

**Mandatory: 3–5 inline citations to approved sources.** No rate quotes ("rates are X today"). No "current rates."

## STEP 3 — Draft the post

- **Length:** 1,200–1,600 words.
- **Voice:** short punchy sentences, first person as Adam, conversational, raw. NO filler ("nestled", "in today's market", "picture-perfect", "unforgettable"). Specific over abstract. Match the voice guide.
- **Anecdote without fabrication:** you MAY reference a REAL, anonymized deal pattern from `memory/people/active-borrowers.md` or `memory/people/realtors.md` ("a self-employed borrower in Cedar Park") using real initials/specifics. You may NEVER invent a borrower, a number, a testimonial, or a personal detail. No fitting real anecdote → write from principle instead.
- **Schema:** include Article + FAQPage + BreadcrumbList JSON-LD, copying the exact block shape from a recent `blog/*.html` (open one and mirror its structure, `@type`, breadcrumb list, author/publisher). FAQPage = 3–5 real Q&As drawn from the body, not bolted on.
- **Sign off:** "Talk soon, Adam Styer" or "— Adam". NMLS #513013 | (512) 956-6010.
- File path: `blog/YYYY-MM-DD-<kebab-slug>.html` using today's date.

## STEP 4 — Compliance & quality gate (ALL must pass before commit)

Run every check against the new file. ANY failure → do NOT commit; go to STEP 6 (loud skip).

1. **Brand name** — "Adam Styer | HyperSmart Home Loans" present; ZERO occurrences of "The Styer Team" or "Mortgage Solutions LP".
   `grep -c "HyperSmart Home Loans" blog/NEWFILE.html` (>=1) and `grep -Ec "The Styer Team|Mortgage Solutions LP" blog/NEWFILE.html` (==0).
2. **NMLS / entity** — if cited, Adam 513013 / company 2653540 / Kyber Mortgage Corporation dba HyperSmart Home Loans are correct.
3. **No performance-metric marketing** — default to STRIP. No "24-hour", "same-day", "fastest", "guaranteed approval". `grep -Eic "24-hour|same.day|fastest|guaranteed approval" blog/NEWFILE.html` (==0).
4. **No raw 1003 URL** — application link is anchor text only. `grep -c "my1003app.com" blog/NEWFILE.html` may be >0 ONLY inside an `<a href>`; the visible text must never be the bare URL.
5. **Title lint** — `grep "<title>" blog/*.html | grep -v "Adam Styer"` returns nothing for the new file.
6. **TX-only / no USDA** — no out-of-state origination implication; no USDA product surface.
7. **Cluster wiring + registration** — ≥2 in-body contextual links into relevant hub/spoke pages, AND the post is registered in all four surfaces (STEP 5). Missing any registration = FAIL (an orphaned post is worse than no post).

## STEP 5 — Register across four surfaces (part of the same atomic change)

1. **`blog.html` noscript block** — add the post's `<li>`/card entry in the noscript list, matching the existing pattern.
2. **`blog.html` CollectionPage schema** — add the post to the `itemListElement` / `hasPart` array in the page's JSON-LD.
3. **`manifest.json`** — add the post entry matching existing shape.
4. **`sitemap.xml`** — add a `<url>` with `<loc>` (pretty URL, no `.html`) and today's `<lastmod>`.
5. **Cluster cross-links** — if you added a reciprocal in-body link FROM an existing hub/spoke page TO this post, that edited page is part of this commit too.

## STEP 6 — Publish, verify, notify (or loud skip)

**On gate pass — atomic commit (stage by explicit filename, NEVER `git add -A`):**

```bash
cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site
git add blog/NEWFILE.html blog.html manifest.json sitemap.xml run-logs/content-backlog.md [any-edited-cluster-pages]
git commit -m "$(cat <<'EOF'
Publish: <post title>

Net-new blog post — <topic>. Grounded in <sources>. Registered in
blog.html (noscript + CollectionPage), manifest.json, sitemap.xml; wired
into <cluster> with N in-body links.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
SHA=$(git rev-parse --short HEAD)
git push origin main
```

**Verify live (slug-substring match, NOT exact-string — Netlify strips `.html` and normalizes quotes):**

```bash
SLUG="YYYY-MM-DD-<kebab-slug>"
sleep 60   # let Netlify deploy
curl -s -o /dev/null -w "%{http_code}" "https://styermortgage.com/blog/$SLUG"
```

Expect `200`. If 404 after a second retry (wait + re-curl once), the commit still exists — fire a publish-failure FYI (below) noting "committed $SHA but not live yet, check Netlify deploy".

**FYI notification (no action needed).** End the run with this exact block as your final output (notifyOnCompletion surfaces it to Adam):

```
BLOG PUBLISHED — <post title>
Live: https://styermortgage.com/blog/<slug>
Words: <count> | Tier: <A/B/C> | Citations: <n>
No action needed. To undo: git revert <SHA> && git push
```

**Append the consumed topic** to `run-logs/content-backlog.md` Consumed-topics log: `YYYY-MM-DD | <slug> | <tier> | <SHA>` (this edit is included in the commit above).

**Write the run brief** `run-logs/content-YYYY-MM-DD.md`: topic, tier, sources cited, gate results (each check pass/fail), commit SHA, live URL, word count. Append a one-line CHANGELOG.md entry. Both files staged in the same commit.

**On gate FAIL or exhausted backlog — loud skip:** do NOT commit. Write `run-logs/content-YYYY-MM-DD.md` recording which gate failed and why. End the run with:

```
BLOG SKIPPED THIS WEEK — <reason>
No post published. Nothing to revert. Next attempt: next Tuesday.
Detail: run-logs/content-YYYY-MM-DD.md
```

## Hard stops (never do these)
- Never `git add -A` / `git add .` — the editor and Adam commit concurrently; stage only your named files.
- Never publish a near-duplicate of an existing post.
- Never fabricate a borrower, number, testimonial, or personal detail.
- Never quote live rates or make performance-time claims.
- Never display the raw 1003 URL as visible text.
- Never touch GTM/analytics snippets or form field names.
- Never add a CSS framework, JS library, or npm package.
- Never originate outside Texas; never surface USDA.

## Task-run emission (end of every run)
After push (or after a skip), emit one JSONL row for the dashboard:

```bash
echo '{
  "task": "styer-blog-writer-weekly",
  "status": "ok",
  "duration_s": <wall-clock seconds>,
  "findings": 1,
  "resolved": 0,
  "note": "<published <slug> | or skipped: <reason>>"
}' | /Users/adamstyer/Documents/client-ops/bin/append-task-run.sh
```

Use `status:"error"` if the run failed to publish AND failed to record a clean skip; `status:"ok"` for both a successful publish and a clean intentional skip.
````

- [ ] **Step 4: Verify the file**

```bash
cd /Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly
head -4 SKILL.md
grep -c "git add -A" SKILL.md            # expect 0 occurrences as an instruction to DO it (only appears in "Never git add -A")
grep -c "slug-substring" SKILL.md         # expect >=1
grep -c "BLOG SKIPPED THIS WEEK" SKILL.md # expect 1 (loud skip path present)
grep -c "HyperSmart Home Loans" SKILL.md  # expect >=1
grep -Ec "Mortgage Solutions LP" SKILL.md # expect 0 except inside the prohibition line
```

Expected: frontmatter shows `name: styer-blog-writer-weekly`; the loud-skip block, slug-substring verify, and brand name are all present.

- [ ] **Step 5: No commit**

This file is outside the git repo; nothing to commit. Proceed to Task 3.

---

## Task 3: Register the scheduled task

**Files:**
- Scheduler store (via `mcp__scheduled-tasks__create_scheduled_task`)

- [ ] **Step 1: Define the verification**

Success = a task `styer-blog-writer-weekly` appears in `list_scheduled_tasks` with `cronExpression: "0 8 * * 2"`, `enabled: true`, and a future `nextRunAt` on a Tuesday.

- [ ] **Step 2: Create the registration**

Call `mcp__scheduled-tasks__create_scheduled_task` with:
- `taskId`: `styer-blog-writer-weekly`
- `cronExpression`: `0 8 * * 2`  (Tuesday 8:00 AM local CT — clear of acr-gbp-weekly @7AM Tue, styer-site-daily @7AM, editor @Fri 9AM)
- `notifyOnCompletion`: `true`
- `description`: `Styermortgage blog WRITER — auto-publishes one net-new compliance-gated post every Tuesday. Sibling to the Friday editor.`
- `prompt`: `Run the styer-blog-writer-weekly task exactly as written in /Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly/SKILL.md. Follow every step in order, honor all hard stops, and end with the FYI or loud-skip notification block.`

Note: `create_scheduled_task` writes its own SKILL.md from the prompt. Since Task 2 already wrote the authoritative SKILL.md, after creation confirm the file still contains the full instructions; if the tool overwrote it with just the short prompt, re-write the Task 2 content over it (the runner reads the file, so the full content must win).

- [ ] **Step 3: Verify**

Call `mcp__scheduled-tasks__list_scheduled_tasks`, find `styer-blog-writer-weekly`, confirm `cronExpression == "0 8 * * 2"`, `enabled == true`, `nextRunAt` falls on a Tuesday. Then:
`grep -c "STEP 0 — Double-fire guard" /Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly/SKILL.md` → expect `1` (full content survived registration).

---

## Task 4: Fix the editor's brand-name bug

**Files:**
- Modify: `/Users/adamstyer/.claude/scheduled-tasks/styer-content-weekly/SKILL.md:53`

- [ ] **Step 1: Confirm the bug**

```bash
grep -n "Mortgage Solutions LP" /Users/adamstyer/.claude/scheduled-tasks/styer-content-weekly/SKILL.md
```
Expected: line 53 — `- Business name: "Adam Styer | Mortgage Solutions LP" — NEVER "The Styer Team"`.

- [ ] **Step 2: Apply the fix**

Edit line 53. Replace:
```
- Business name: "Adam Styer | Mortgage Solutions LP" — NEVER "The Styer Team"
```
with:
```
- Business name: "Adam Styer | HyperSmart Home Loans" — NEVER "The Styer Team" or "Mortgage Solutions LP"
```

- [ ] **Step 3: Verify**

```bash
grep -c "Adam Styer | HyperSmart Home Loans" /Users/adamstyer/.claude/scheduled-tasks/styer-content-weekly/SKILL.md   # expect 1
grep -Ec 'Business name: "Adam Styer \| Mortgage Solutions LP"' /Users/adamstyer/.claude/scheduled-tasks/styer-content-weekly/SKILL.md  # expect 0
```

- [ ] **Step 4: No commit**

Outside the git repo. Done.

---

## Task 5: Add the 8-day staleness alarm to daily-briefing

**Files:**
- Modify: `/Users/adamstyer/.claude/scheduled-tasks/daily-briefing/SKILL.md` (insert a sub-step in STEP 2a reconciliation)

- [ ] **Step 1: Define the verification**

Success = daily-briefing's reconciliation step computes days since the last net-new styermortgage blog post and, if ≥8, surfaces a `styer-mortgage` flag into the briefing's stale/needs-Adam content so a silently dead writer is caught within a week.

- [ ] **Step 2: Locate the insertion point**

Open `/Users/adamstyer/.claude/scheduled-tasks/daily-briefing/SKILL.md`. Find the end of section `### 2a — Reconcile tracking files across all four repos` (it ends just before `### 2b — Regenerate the Operations Map`).

- [ ] **Step 3: Insert the check**

Immediately before `### 2b`, add this sub-section:

```markdown
### 2a.1 — Blog writer liveness check (styermortgage only)

Confirm the weekly blog writer is actually producing net-new posts. A silently dead
writer is the exact failure that killed the April cadence — catch it within a week.

```bash
cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site
LAST_NEW=$(git log --diff-filter=A --name-only --pretty=format:%cI -- 'blog/2*.html' \
  | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}T' | head -1 | cut -dT -f1)
if [ -n "$LAST_NEW" ]; then
  DAYS=$(( ( $(date +%s) - $(date -j -f "%Y-%m-%d" "$LAST_NEW" +%s) ) / 86400 ))
  echo "BLOG_WRITER: last net-new post $LAST_NEW (${DAYS}d ago)"
else
  DAYS=999; echo "BLOG_WRITER: no net-new posts found"
fi
```

If `DAYS >= 8`, surface a `STALE-ITEMS` entry with `data-item-system="styer-mortgage"`,
id `styer-blog-writer-stale`, titled "Blog writer hasn't published in ${DAYS} days —
check styer-blog-writer-weekly" and link to
`vscode://file/Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly/SKILL.md`
and the latest `run-logs/content-*.md`. If `DAYS < 8`, do not surface anything (healthy).
```

- [ ] **Step 4: Verify**

```bash
grep -c "2a.1 — Blog writer liveness check" /Users/adamstyer/.claude/scheduled-tasks/daily-briefing/SKILL.md  # expect 1
grep -c "styer-blog-writer-stale" /Users/adamstyer/.claude/scheduled-tasks/daily-briefing/SKILL.md            # expect 1
```

- [ ] **Step 5: No commit**

Outside the git repo. Done.

---

## Task 6: Controlled first-run verification

**Files:** none modified — observation only.

- [ ] **Step 1: Dry-read the SKILL for contradictions**

Re-read `styer-blog-writer-weekly/SKILL.md` end to end. Confirm: the double-fire guard runs before topic selection; the dedup gate can change topic but the only legitimate skip is an exhausted backlog or a failed gate; the commit stages named files only; the verify uses slug-substring; both the FYI and the loud-skip end-blocks are present and mutually exclusive.

- [ ] **Step 2: Trigger one real run**

Manually run the task (via the scheduler "run now" or by executing the SKILL in a session). Observe the run end-to-end. Because "always publish weekly" is the rule, expect a published post unless the backlog is genuinely exhausted.

- [ ] **Step 3: Verify the published artifact**

```bash
cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site
NEW=$(git log --diff-filter=A --name-only --pretty=format: -1 -- 'blog/2*.html' | grep -E 'blog/2.*\.html' | head -1)
echo "New post: $NEW"
test -f "$NEW" && wc -w "$NEW"                                  # 1200-1600 words
grep -c "HyperSmart Home Loans" "$NEW"                          # >=1
grep -Ec "The Styer Team|Mortgage Solutions LP" "$NEW"          # ==0
grep -c "FAQPage" "$NEW"; grep -c "BreadcrumbList" "$NEW"       # both >=1
SLUG=$(basename "$NEW" .html)
grep -c "$SLUG" blog.html sitemap.xml manifest.json            # registered in all three
curl -s -o /dev/null -w "%{http_code}\n" "https://styermortgage.com/blog/$SLUG"  # 200
```

Expected: word count in band; brand correct; schema present; registered in all surfaces; live 200.

- [ ] **Step 4: Verify the notification + revert path**

Confirm the run's final output was the `BLOG PUBLISHED` block with a working `git revert <SHA> && git push` line. Confirm `run-logs/content-YYYY-MM-DD.md` exists and the consumed topic was appended to `run-logs/content-backlog.md`.

- [ ] **Step 5: Verify the safety net (simulated)**

Confirm Task 5's check would fire: if the most recent net-new post were ≥8 days old, `daily-briefing` STEP 2a.1 surfaces `styer-blog-writer-stale`. (No need to fake the date — confirm the bash block is syntactically present and the threshold is `>= 8`.)

---

## Self-Review

**Spec coverage:**
- §1 Architecture & lifecycle → Tasks 2 (run loop, double-fire guard), 3 (Tuesday cron). ✓
- §2 Topic selection & dedup → Task 1 (backlog file), Task 2 STEP 1 (selection + dedup gate). ✓
- §3 Content spec & grounding → Task 2 STEPs 2–3 (1,200–1,600 words, schema, voice, no-fabrication, NotebookLM grounding, 3–5 citations). ✓
- §4 Compliance gate → Task 2 STEP 4 (all 7 hard stops). ✓
- §5 Publish/verify/notify/revert → Task 2 STEPs 5–6 (atomic commit by filename, slug-match verify, FYI block, revert line, run brief + changelog). ✓
- §6 Failure handling & editor coexistence → Task 2 STEP 0 (double-fire), Task 4 (editor brand fix), Task 5 (8-day alarm), Task 6 STEP 5 (safety-net verify). ✓

**Placeholder scan:** Runtime-only values (`NEWFILE`, `<slug>`, `<SHA>`, `<post title>`) are intentional fill-ins the running task computes — not plan gaps. All static content (backlog file, full SKILL.md, edit strings, grep assertions) is concrete.

**Type/name consistency:** `styer-blog-writer-weekly` taskId, `run-logs/content-backlog.md`, `run-logs/content-YYYY-MM-DD.md`, cron `0 8 * * 2`, and the brand string "Adam Styer | HyperSmart Home Loans" are used identically across Tasks 1–6 and match the spec. Slug verification uses substring match everywhere. ✓
