# styer-blog-writer-weekly — Design

**Date:** 2026-05-30
**Status:** Approved design, pending implementation plan
**Author:** Adam Styer (design) + Claude (drafting)

## Problem

styermortgage.com has no enabled scheduled task that writes **net-new** blog content. The proven writer (`styer-content-weekly`) was silently converted to an **editor-only** task with a hard stop ("net-new needed → log NEEDS ADAM and exit"). The last real net-new post shipped **2026-04-17**; an auto-publish pipeline attempt on 2026-04-28 was abandoned mid-debug. Adam will "get busy and forget" — content must keep coming with zero involvement from him.

## Goal

A new scheduled SKILL task, `styer-blog-writer-weekly`, that **auto-publishes one net-new blog post per week** with no approval gate, an FYI notification (no action needed), and a one-command revert. Blog posts only — landing pages come later. It revives the proven pre-04-17 writer behavior with modernized brand and guardrails.

## Non-Goals

- Landing pages (VA Loan Austin, Physician, ITIN, Foreign National) — separate future effort.
- Social auto-publish beyond GBP/blog (IG/FB/LI stay behind Adam's approval per two-tier policy).
- Replacing or merging the editor task — the two coexist.

## Decisions locked with Adam

- **Autonomy:** auto-publish, no approval gate.
- **Cadence:** weekly, **guaranteed** ("always publish weekly" — a skip is the only acceptable non-publish, and it must be loud).
- **Visibility:** FYI notification, no action needed, plus one-line revert command.
- **Scope:** blog posts first.
- **Architecture:** new scheduled SKILL task (Approach A), sibling to the untouched editor.

---

## Section 1 — Architecture & lifecycle

New `styer-blog-writer-weekly/SKILL.md`, scheduler-run, sibling to the untouched `styer-content-weekly` editor.

- **Cadence:** weekly, **Tuesday ~8:00 AM CT** (writer Tuesday; editor stays Friday — different days, no same-repo collision).
- **Run loop:** read context → select topic → research + ground in NotebookLM → draft → compliance/voice/dedup gate → register in blog.html noscript + CollectionPage schema + manifest.json + sitemap.xml + wire cluster links → single atomic commit → push → verify live (slug-match) → fire FYI notification → write run brief to `run-logs/content-YYYY-MM-DD.md` + append CHANGELOG.
- **Double-fire guard:** skip if a net-new post dated <5 days ago exists.
- **Missed-fire safety net:** daily-briefing staleness flag fires if no net-new post in 8+ days.

## Section 2 — Topic selection & dedup gate

- **Backlog priority:** (a) `run-logs/competitive/latest.md` opportunities, (b) `SEO-AUDIT-2026-05.md` Phase 3, (c) GSC page-1 / 0-click pages. Maintained in a new `run-logs/content-backlog.md`.
- **Dedup gate** can override the topic choice but **never skips the week** — it forces a different topic, not a different angle, and cross-links to the canonical hub when the new topic is adjacent to an existing one.
- **Cluster-first bias** over generic rate-shopper angles (self-employed, DSCR/investor, jumbo/HNW, complex income, denied-loan second opinions, non-QM, Austin/Texas).

## Section 3 — Content spec & grounding

- **Length:** 1,200–1,600 words (dead writer hit ~1,350 — target band).
- **Schema:** Article + FAQPage + BreadcrumbList, matching existing `blog/*.html` JSON-LD pattern. FAQPage = 3–5 real Q&As drawn from the body.
- **Voice:** short punchy sentences, conversational, raw — guide voice, not AI slop. Gate enforces it (Section 4).
- **Anecdote without fabrication:** may reference *real, anonymized* deal patterns from `memory/people/` ("a self-employed borrower in Cedar Park"); may **never invent** a borrower, number, or personal detail. No fitting real anecdote → write from principle.
- **Grounding:** facts grounded in NotebookLM against approved sources only (Fannie/Freddie/IRS/CFPB/FDIC/HUD/ATTOM/FRED). **3–5 inline citations mandatory.** No rate quotes.

## Section 4 — Compliance & quality gate (hard stops before commit)

Post does not publish unless every check passes. On failure → log it, skip the commit, fire an FYI ("skipped this week, here's why"), exit clean. A skip is the only acceptable non-publish, and it is loud.

1. **Brand name** — "Adam Styer | HyperSmart Home Loans" present; zero "The Styer Team" / "Mortgage Solutions LP".
2. **NMLS / entity** — Adam 513013, company 2653540, Kyber Mortgage Corporation dba HyperSmart Home Loans (if cited).
3. **No performance-metric marketing** — no "24-hour," "same-day," "fastest"; gate defaults to **strip**.
4. **No raw 1003 URL** — application link anchor-text only.
5. **Title lint** — `grep "<title>" blog/*.html | grep -v "Adam Styer"` clean for the new file.
6. **TX-only / no USDA** — no out-of-state origination implication, no USDA surface.
7. **Cluster wiring** — ≥2 in-body contextual links into relevant hub/spoke pages, AND registered in blog.html noscript + CollectionPage + manifest.json + sitemap.xml. Missing registration = fail (orphaned post worse than no post).

## Section 5 — Publish, verify, notify, revert

- **Atomic commit:** new post + blog.html + manifest.json + sitemap.xml + any reciprocally-linked cluster pages in **one commit, staged by explicit filename** (never `git add -A` — editor and Adam commit concurrently). One commit = one clean revert target.
- **Push, then verify live:** poll production Netlify URL, confirm render via **slug-substring matching** (Netlify strips `.html` and normalizes quotes at deploy — exact match throws false negatives). 404 after reasonable wait → publish-failure FYI (commit still exists; nothing lost).
- **FYI notification:** one push — title, slug, word count, live URL, and literal revert line `git revert <sha> && git push`. No action needed.
- **Run brief + changelog:** `run-logs/content-YYYY-MM-DD.md` (topic, sources, gate results, sha, URL) + CHANGELOG line.

## Section 6 — Failure handling & editor coexistence

- **Double-fire guard:** skip if net-new post <5 days old.
- **Missed-fire safety net:** daily-briefing flags if no net-new post in 8+ days (catches a silently dead writer within a week, not six).
- **Editor coexistence:** writer (Tuesday, creates) and editor (Friday, polishes existing, forbidden from creating) are separate SKILLs that never touch each other's files mid-run. Editor's hard-stop stays — now an actual writer satisfies the need.
- **Latent-bug fix rolled in:** editor `styer-content-weekly/SKILL.md` line 53 currently names the prohibited "Mortgage Solutions LP" as the brand — fix to "Adam Styer | HyperSmart Home Loans".

## Verification

- First run: produces a live, indexable post matching the band/schema/voice, registered in all four surfaces, with ≥2 cluster links and 3–5 citations; FYI fires with working revert command.
- Skip path: forced failure (e.g., dedup collision with no alternate topic) produces a loud "skipped, here's why" FYI and zero commit.
- Coexistence: a Tuesday writer run and a Friday editor run in the same week leave a clean git history with no file collisions.
- Safety net: simulated 8-day gap raises the daily-briefing staleness flag.
