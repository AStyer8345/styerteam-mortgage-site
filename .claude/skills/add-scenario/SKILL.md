---
name: add-scenario
description: Build a new mortgage scenario page on styermortgage.com from a borrower file Adam describes in plain language. Use whenever Adam says "add scenario", "new scenario", "got a scenario", "got a file to add", "run the add scenario skill", "let me tell you about a borrower", "build this into a scenario", or otherwise describes a closed or representative borrower file and clearly wants it written up as a /scenarios/ page. End-to-end workflow that writes the HTML from the existing template, enforces the site's audit-derived compliance rules (no hard FICO/LTV/divisor/rate numbers, no performance-metric claims, no identifying borrower details), updates the hub + sitemap + session docs, then commits and pushes to trigger the Netlify deploy. Use this skill even if Adam mentions it casually mid-conversation or starts narrating a file without explicitly naming the skill — narrating a closed file is the trigger.
---

# Add Scenario

Adam describes a borrower file in plain language. You ship the published scenario page.

## What this skill produces

One new published page at `/scenarios/<slug>.html` on styermortgage.com, plus the supporting updates to the hub, sitemap, and session docs. The page tells the story of one solved or representative file (Situation → Obstacle → Strategy → Outcome), anchored by a scannable At-A-Glance block for AEO extraction, and structurally enforces the site's audit-derived compliance rules so a published scenario can't accidentally publish a borrower's name, a universal-program-rule number, or a performance-metric claim.

## Read these files first — every invocation, no exceptions

These files define the pattern, the rules, and the current state of the system. They evolve. Always read them fresh from disk before writing — never rely on memory of how they "should" look.

1. **`/scenarios/_TEMPLATE.html`** — source-of-truth template. The compliance comment block at the top of this file is the canonical rule list. If anything in this skill conflicts with the template's comment block, the template wins.
2. **`/scenarios/oil-gas-royalty-asset-depletion.html`** — the gold-standard published example. Match its structure, voice, hedging style, and section flow.
3. **`/scenarios.html`** — the hub. Read the current state of the filter-chip block and the scenario-grid to know which chips are already live and where the new card goes.
4. **`CLAUDE.md`** in the repo root — entity strings, deploy workflow, end-of-session checklist, loan app URL, NMLS numbers. Anything Adam writes here overrides the skill.

## Workflow

### 1. Listen and clarify minimally

Adam's narrative will name a borrower type, an obstacle that killed the conventional path, a strategy that worked, and (usually) an outcome. Capture all of it.

Ask only what you genuinely can't infer:

- **Texas region** if not stated. Acceptable values: "Texas," "Greater Austin," "Hill Country," or a named TX metro. Use the most generic that fits — specific city + neighborhood combinations are identifying.
- **Pronoun preference** only if it matters and Adam used a pronoun that could be identifying given other details. Default to whatever pronoun Adam used in narration; offer "the borrower" as neutral if the file is sensitive.
- **Specific numbers Adam mentioned that you'll be omitting** — confirm in one sentence so Adam isn't surprised the number doesn't appear ("I'll describe the strategy without naming the [60-month / specific LTV / FICO floor] since it's the kind of program parameter we keep off scenario pages — OK?").

**Do not ask** about title wording, slug, FAQ questions, schema details, sitemap formatting, or commit message. Make those calls and surface any judgment calls in `FLAG_FOR_ADAM.md` at the end.

### 2. Choose the slug

Slug describes the *strategy that worked* plus the key file hook. No borrower names. No specific cities. No specific dollar amounts.

Good: `oil-gas-royalty-asset-depletion`, `k1-distributions-bank-statement`, `denied-jumbo-non-qm-cross-collateral`, `dscr-short-term-rental-hill-country`.

Bad: `austin-doctor-1.2m-jumbo` (identifying + specific amount), `johnsons-bank-statement-deal` (name), `westlake-asset-depletion-700-fico` (neighborhood + specific FICO).

### 3. Pick categories

Pick from this exact set. Multi-select allowed; render as space-separated in the card's `data-category` attribute on the hub.

- `self-employed` — Self-Employed / Bank Statement (chip label)
- `dscr` — DSCR / Investor
- `jumbo-hnw` — Jumbo / High Net Worth
- `declined` — Denied Elsewhere

Category = *the strategy that worked* + any cross-cutting tag like "declined elsewhere." Not the path Adam tried first.

Examples:
- Self-employed business owner, write-offs killed conventional, bank statement loan closed it → `self-employed`
- Tried bank statement first but borrower isn't self-employed, asset depletion closed it → `jumbo-hnw`
- Investor with rental cash flow, DSCR closed it after a conventional decline → `dscr declined`
- HNW retiree with asset depletion after two prior declines → `jumbo-hnw declined`

### 4. Copy the template and fill it in

Read `_TEMPLATE.html` fresh. Save the new file at `/scenarios/<slug>.html`. Fill each section in order — read `oil-gas-royalty-asset-depletion.html` alongside for voice and hedging style.

**Title** — Format: `[Hook Phrase] | Mortgage Scenario | Adam Styer | NMLS #513013`. Keep under ~80 chars before the pipe-separated suffix. Lead with the strategy or the obstacle, not the borrower. Example: `Oil & Gas Royalty Income, Two Bank Declines, and an Asset-Depletion Solution`.

**Meta description / OG / Twitter** — 1 sentence, ~150 chars, hook + strategy + NMLS attribution.

**Canonical URL** — `https://styermortgage.com/scenarios/<slug>.html`.

**Breadcrumb** — `Home › Scenarios › [Scenario Title]`.

**H1** — same as the title hook phrase, no NMLS suffix.

**Byline** — Use the byline pattern from `oil-gas-royalty-asset-depletion.html`. Date stamp = today.

**Direct Answer block (AEO)** — 40–80 words. Answer-first. Lead with the borrower's situation in one phrase, then the strategy used, then the outcome category. No specific numbers. End with the program-availability disclaimer.

**At-A-Glance table** — 5 rows. Values are categorical only:
- Borrower Type — e.g. "Self-employed business owner with heavy tax write-offs", "Royalty-income earner with substantial investment and retirement assets"
- Primary Challenge — e.g. "Tax write-offs reducing documentable income", "Income continuance documentation; prior declines"
- Strategy Used — name the program family, not a specific lender's product
- Loan Type / Structure — e.g. "Non-QM bank statement loan, primary residence purchase"
- Texas Region — categorical, never specific neighborhood

Below the table: italic disclaimer "Program availability and guidelines change by investor, occupancy, and loan type."

**The Situation** — borrower profile and goal. Specificity from the narrative (income story, real circumstance), not from program numbers.

**The Obstacle** — what made the file hard. Reference categories of friction in plain terms. Do not state AUS overlay parameters, divisors, LTV/FICO thresholds, or named-investor guideline figures as universal rules.

**The Strategy** — program approach and why it fit. Educational, not a guideline sheet. Frame around documentation fit, not specific guideline numbers.

**The Outcome** — factual. Process-language only. No "21-day," "same-day," "24-hour." End with the mandatory "Outcomes vary" paragraph from the template.

**FAQ — 4–6 questions** — Mirror exactly between the visible accordion and the `FAQPage` JSON-LD schema. Answers 40–80 words, answer-first phrasing. Each question should be one a real borrower might ask after reading the page.

**Related** — Link UP to the relevant pillar page(s) for the strategy used (e.g. `/self-employed-mortgage-austin.html`, `/high-net-worth-mortgage.html`, `/dscr-loan-austin-tx.html`, `/asset-depletion-mortgage-texas.html`, `/bank-statement-loans.html`, `/non-qm-loans.html`). Plus a link back to `/scenario.html` for conversion. Leave the `<!-- RELATED: link sibling scenarios when available -->` comment in place for future use.

**CTA** — Keep the existing CTA block exactly as it appears in `_TEMPLATE.html`. Primary button to `/scenario.html`, secondary to Calendly, tertiary tel link. Never the raw 1003 URL as visible link text.

**Schema blocks — all four** — Article (NOT TechArticle/TechReport), FAQPage, BreadcrumbList, Person. The Person block with the NMLS #513013 `sameAs` is mandatory on every scenario page. Update each block's URLs, titles, and dates to match the new file.

### 5. Remove the DRAFT artifacts

Before saving the new file:
- Delete the top `<!-- DRAFT -->` comment block (the box that starts with `╔═══...═╗`) — this only belongs on unfinished drafts.
- Delete the `<meta name="robots" content="noindex">` line in the `<head>`. The template carries it as a safety net; live scenarios are indexable.

If you cannot ship the page live (compliance violation Adam needs to resolve, missing facts that you'd otherwise have to invent), KEEP the DRAFT block and the noindex meta, do NOT add the URL to sitemap, do NOT update the hub. Tell Adam what's blocking and let him decide.

### 6. Update the hub at `/scenarios.html`

- Replace any empty-state placeholder (`scenario-empty` div) with the new card, OR add the new card alongside existing cards in the `.scenario-grid`.
- Card structure (match the existing live card):
  ```html
  <article class="card scenario-card" data-category="<categories>">
    <span class="scenario-tag"><Category Label(s)></span>
    <h3><Scenario Title></h3>
    <p><1-sentence summary. Hedged. No specific numbers.></p>
    <a href="/scenarios/<slug>.html" class="scenario-link">Read the scenario →</a>
  </article>
  ```
- Filter chip activation: if this is the first scenario in a category, uncomment the matching chip in the `.scenario-filter` block. If the chip block was commented out entirely (zero scenarios state), reinstate the live chip block with "All" + every category that now has ≥1 scenario.
- Never render a chip for a category with zero live scenarios — that's an empty doorway and violates the spec.
- Leave the card-stub HTML comment in place at the bottom of the grid as a copy-template for future scenarios.

### 7. Update `sitemap.xml`

Add one new URL entry below the existing `/scenarios.html` line. Format:

```xml
<url><loc>https://styermortgage.com/scenarios/<slug>.html</loc><lastmod>YYYY-MM-DD</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

Use today's date for `lastmod`.

### 8. Update session docs

Per `CLAUDE.md` end-of-session protocol:

- **`CONTEXT.md`** — Replace (don't append to) "Last Worked On" with a new entry describing what shipped. Keep the file under 100 lines total — trim older entries if needed. Update the Site Structure row to reflect the new scenario count. Don't touch other sections.
- **`CHANGELOG.md`** — Prepend a new dated entry at the top following the existing format. Cover: what shipped, slug, categories, the compliance decisions you made (numbers omitted, hedging applied, pronoun choice), and any FLAG_FOR_ADAM items.
- **`FLAG_FOR_ADAM.md`** — Append a short section listing the editorial calls Adam should review: pronoun choice, Texas region precision, any numbers you deliberately omitted from his narrative, anything ambiguous in the story you resolved.

### 9. Commit and push

```bash
git add scenarios/<slug>.html scenarios.html sitemap.xml CONTEXT.md CHANGELOG.md FLAG_FOR_ADAM.md
```

Stage **only** these files. There are usually unrelated modified files in the working tree from the daily scheduled task (TODO.md, run-logs/*) — never include them in a scenario commit. Per CLAUDE.md, prefer named files over `git add -A`.

Commit message format:
```
feat(scenarios): <one-line summary of the scenario>

<2-3 sentence description of the file: borrower type, obstacle, strategy>

Categories: <category-list>. <Compliance decision summary if notable
— e.g. "60-month divisor described conceptually, not published.">

See FLAG_FOR_ADAM.md for review notes.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

Then `git push origin main`. Netlify auto-deploys from the push.

### 10. Verify live

Poll until the new URL returns 200:

```bash
until curl -sL https://styermortgage.com/scenarios/<slug>.html | grep -q "<H1 hook phrase>"; do sleep 5; done
```

Then verify:
- New scenario URL returns 200
- New scenario does NOT contain `<meta name="robots" content="noindex">` (verify with curl + grep)
- `sitemap.xml` includes the new URL
- `/scenarios.html` hub renders the new card (verify the slug appears once in the live HTML)
- Filter chips on the live hub match the live scenario set (use a comment-stripping regex if grepping — the commented-out chip stubs will otherwise show up as false positives)

Report back to Adam with the live URL and the FLAG_FOR_ADAM items.

## Compliance — non-negotiable, structural

These rules come from the 2026-05-17 site audit. They exist because publishing the wrong number or claim in an AEO-extractable page creates real liability and ages badly. Enforce them at the structural level — if a rule would be violated, change the content; don't soften the rule.

**No hard universal program numbers.** No fixed FICO floors, LTV maxes, expense factor percentages, rate premiums, loan caps, asset-depletion divisors, or any number that reads as a universal rule. Frame everything as program/lender-dependent. The disclaimer "Program availability and guidelines change by investor, occupancy, and loan type" appears next to every program-specific claim and below the At-A-Glance table.

**Why this matters:** A divisor or FICO floor stated in 2026 will be wrong when an investor adjusts the program in 2027. Worse, AEO surfaces (ChatGPT, Perplexity, Google AI Overviews) will cite it as universal. Categorical hedging stays true.

**No identifying borrower details.** No names. No specific city + neighborhood combination. No exact dollar amounts. Use Texas region categories ("Texas", "Greater Austin", "Hill Country"). The privacy disclaimer in the template's footer must remain.

**Why this matters:** Several Austin sub-markets are small enough that a specific loan amount + neighborhood + employment type combination identifies one borrower. The privacy disclaimer ("identifying details are changed or combined") only holds if categorical values back it up.

**No performance-metric claims.** No "21-day close," "same-day," "24-hour," "1-hour response," or similar. Use process-language: "the file moved through underwriting and closed."

**Why this matters:** GOALS.md retired performance-metric marketing sitewide. Voice guidance allows mentioning that "same-day pre-approvals happen" inside conversational copy (e.g., scenario form), but scenario pages are publication-credibility surfaces and must hold the harder line.

**No absolutes.** No "guaranteed," "always," "easy approval," "no-doc," "best rate," "beat any rate," "bank can't match."

**No fabricated testimonials.** No invented quotes. No star ratings. Adam's testimonials live on `/testimonials.html` and nowhere else.

**Texas scope only.** Adam is licensed in Texas. Never imply origination outside Texas.

**Entity strings exact.** Display name "Adam Styer | HyperSmart Home Loans". Legal name (where disclaimers/NMLS lines appear) "Kyber Mortgage Corporation dba HyperSmart Home Loans". Company NMLS 2653540. Adam's personal NMLS 513013. Never use "The Styer Team" or "Mortgage Solutions LP" as a display name — the legacy entity was fully retired 2026-05-20. (Exception: `/styerteam/` URL handles on Facebook/Instagram/Nextdoor are retained personal-brand social identities and are unaffected.)

**CTA routing.** All loan-app CTAs route to `/scenario.html` (the tracked landing page). Never the raw 1003 URL (`hypersmart.my1003app.com/513013/register`) as visible link text, even though the nav uses it directly. Calendly link is `https://calendly.com/adamstyer/15minutes`. Phone is `tel:+15129566010`.

**Article schema only.** Not TechArticle. Not TechReport. The rest of the site's entity graph uses Article — stay consistent.

## What Adam controls; what you control

**Adam decides:**
- The story (situation, obstacle, strategy, outcome)
- Whether to ship live or leave as DRAFT
- Editorial calls flagged in FLAG_FOR_ADAM (pronoun choice, region precision, omitted numbers)
- Whether a compliance-tension item is genuinely OK to publish

**You decide:**
- Slug, title wording, FAQ questions, schema details, hedging phrasing, sitemap formatting, commit message, which pillar pages to link
- How to convert any specific number Adam mentions into hedged categorical language

**Stop and ask only if:**
- A compliance rule is in tension with the story Adam told (e.g., the file's whole point depends on a specific number you can't publish)
- A claim in the narrative would be a sitewide policy precedent (e.g., a new program type the site doesn't otherwise cover)
- The categorization is genuinely ambiguous between two filter chips and the choice changes the page's framing

## Hard "do nots"

- Don't touch existing pillar/product pages, the sitewide nav, or `style.css`. Scenarios are additive content; structural changes elsewhere are out of scope.
- Don't invent borrower facts beyond what Adam describes. If you need a detail to tell the story, ask. If you can tell the story without inventing, do that.
- Don't publish a scenario that violates a compliance rule. Pause and surface the conflict.
- Don't run sitewide audits, suburb-page rotations, or anything the daily scheduled task owns. Stay focused on shipping one scenario.
- Don't include the daily-task files (TODO.md, run-logs/*, suburb-editor-queue.md) in the scenario commit even though they'll usually appear as unstaged changes.

## Common pitfalls (read these before your first run)

- **Wrong category from the path tried first.** If Adam tried bank statement and ended on asset depletion, the category is `jumbo-hnw` (asset depletion is the HNW playbook), not `self-employed`. Category = strategy that worked.
- **Slug describing the wrong thing.** Same trap. The slug should name what closed the file, not what was attempted.
- **"It's only one number" temptation.** Specific numbers (a FICO, an LTV, a divisor, an expense factor) feel useful in an At-A-Glance block. They're exactly what the compliance rules prohibit. Convert to a hedged category every time.
- **Forgetting to remove the DRAFT block.** The template's compliance comment box at the top of `_TEMPLATE.html` ships unprintable artifacts (the `╔═══╗` box) — make sure your new file does not start with that.
- **Filter chips for empty categories.** If you uncomment a chip whose category has zero scenarios, you've created an empty doorway. Only activate chips that match a live `data-category`.
- **Grep false positives during verify.** The hub keeps commented-out chip stubs and card stubs as templates for future scenarios. When verifying which chips are live, strip HTML comments first (e.g., `python3 -c "import sys,re; print(re.sub(r'<!--.*?-->','',sys.stdin.read(),flags=re.DOTALL))"`) before grepping for `data-filter="..."`.
- **Committing unrelated files.** The daily scheduled task usually has TODO.md + run-logs/* uncommitted. Stage only the files this skill touched.

## When you're done

Report to Adam in one tight message:
- Live URL
- Slug + categories
- 2-3 editorial calls you made that he should sanity-check (which omitted numbers, pronoun choice, region precision)
- Any compliance tensions you encountered and how you resolved them

That's it.
