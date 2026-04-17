# Suburb SEO Rebuild — Phase State Machine

**Goal:** Move 6 Tier 1 suburb pages out of Google's "Discovered – currently not indexed" bucket by:
1. Varying page structure per city (H2 outlines, FAQ stems, section order)
2. Adding freshness signals (monthly market snapshots)
3. Adding depth signals (named neighborhoods, real closing stories, property tax data)
4. Merging 5 low-value pages into one

**Full context:** see [_deliverables/suburb-audit.md](_deliverables/suburb-audit.md)

**Automation:** each phase below runs as a scheduled remote Claude trigger. Triggers fire on the dates shown. Each trigger:
1. Reads this file to confirm prior phase is `status: completed`
2. Executes its phase
3. Updates its entry in this file (status, actual date, notes)
4. Commits and pushes

If a trigger finds the prior phase is `status: pending` or `status: blocked`, it bails and appends a FLAG to TODO.md NEEDS ADAM section instead of executing.

---

## Phase 0 — Audit (one-time)

**Scheduled:** n/a (executed in-session 2026-04-16)
**Status:** completed
**Actual:** 2026-04-16
**Output:** [_deliverables/suburb-audit.md](_deliverables/suburb-audit.md), [_deliverables/suburb-audit-data.json](_deliverables/suburb-audit-data.json), [_deliverables/suburb-audit.py](_deliverables/suburb-audit.py)

**Finding:** Boilerplate % is low (7%) but structural H2 templates are highly duplicated (11-13 of 24 pages share same H2s). Rebuild focus = structural variation + freshness + depth, not more unique prose.

---

## AEO Requirements — applies to every Phase 1 rebuild, the Phase 2 merged page, and any hub-page work

These are **Answer Engine Optimization** requirements. Goal: make page content extractable and citable by AI answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews, voice assistants). These are additive to the Phase 1 content requirements below — every rebuilt page must satisfy all of these in addition to the per-phase specifics.

1. **Direct-answer summary block.** A 2-3 sentence TL;DR paragraph placed directly after the H1 (inside the hero or immediately below), answering "Who should I use as a mortgage lender in {City}, TX?". Must name Adam Styer, cite NMLS #513013, and include one city-specific hook (neighborhood, loan program, tax nuance, local quirk). This is the block AI engines preferentially quote.

2. **Question-form H2s.** At least 4 of the 6+ H2 headings must be phrased as questions. Mix in one or two declarative H2s for flow if needed. Question-form H2s match user queries verbatim in AI engines.

3. **Definitional paragraph.** Include exactly one sentence of the form "A {City} mortgage lender is..." or "Refinancing in {City} works this way..." — a clean, extractable definition for AI Overviews. Place it in the opening or immediately after the direct-answer block.

4. **Bulleted or numbered answers inside FAQ.** Each FAQ answer that naturally supports a list (3-5 items) should use a `<ul>` or `<ol>`. Don't force it — use judgment. AI engines extract lists more cleanly than prose walls.

5. **Full schema stack.** Every rebuilt page must emit all of the following JSON-LD:
   - `LocalBusiness` — existing; update `areaServed` to match the city.
   - `Person` schema for Adam Styer with: `name`, `jobTitle` ("Senior Loan Officer"), `identifier` as `{"@type":"PropertyValue","propertyID":"NMLS","value":"513013"}`, `worksFor` (referencing the LocalBusiness `@id`), `url`.
   - `Service` (or `FinancialProduct`) schema for each loan program featured on the page (Conventional, FHA, VA, USDA, Jumbo, Construction, DSCR — whichever apply to that city). Each gets `name`, `provider` (Person or LocalBusiness @id), `areaServed`, short `description`.
   - `FAQPage` — existing; add a `speakable` property of type `SpeakableSpecification` listing CSS selectors for the direct-answer block and each FAQ answer element.
   - `BreadcrumbList` — existing; keep intact.

6. **Byline + last-reviewed date.** Visible on-page near the H1 (or in a sidebar/metabox): *"By Adam Styer, NMLS #513013, independent mortgage broker in Austin TX since 2017. Last reviewed: YYYY-MM-DD."* Also emit `author` (Person @id) and `dateModified` on the page's primary schema. AI engines weight on-page credential bylines heavily.

7. **Topical cluster linking.** Include 2-3 outbound internal links to topically-related pages/posts with **descriptive** anchor text (not "click here" or "learn more"). Example anchor: *"how USDA loans work in rural Williamson County"* → `/loans/usda.html` or a relevant blog post. Builds topical authority in AI entity graphs.

8. **Entity consistency.** Across every rebuild, Adam is referenced identically: *"Adam Styer, NMLS #513013, independent mortgage broker."* Same address, same phone, same business name *"Adam Styer | Mortgage Solutions LP"* — never "The Styer Team". Inconsistent entity strings dilute AI entity resolution.

---

## Phase 1 — Tier 1 city rebuilds (6 triggers, one per city)

For each city, the rebuild must include:

1. **Unique H2 outline** — no H2 shared with any other Tier 1 page. See city-specific angles below.
2. **Market Snapshot block** — median price, avg DOM, active inventory, property tax rate, month-over-month rate movement. Data from Austin Board of Realtors and current rate sheet.
3. **3-5 named neighborhoods** — with price range, typical loan profile, HOA/MUD notes, flood zones.
4. **One closed-loan story** — 2-3 sentences, scrubbed (initials + general price range).
5. **City-specific FAQ** — 5 questions unique to that city. No shared question stems with other cities.
6. **Structured data updates** — keep LocalBusiness + BreadcrumbList schema; update FAQ schema to match new questions.

**After rebuild:**
- Submit URL to GSC via [https://search.google.com/search-console](https://search.google.com/search-console) → Inspect URL → Request Indexing. (Manual step — flag in TODO.md NEEDS ADAM; Google doesn't allow automated indexing requests.)
- Add 2-3 internal links from homepage (`index.html`) and `austin-area-mortgage-lender.html` pointing to this page.
- Update sitemap `<lastmod>` for the rebuilt URL.
- `git commit`, `git push`, verify Netlify deploy.

### Phase 1a — Round Rock

**Scheduled:** 2026-04-19 (Sun)
**Status:** pending
**File:** `round-rock-mortgage-lender.html`
**Angle:** "Round Rock's Teravista vs Forest Creek: Two Different Loan Conversations"
**Pre-check:** Phase 0 status == completed
**Post-check:** boilerplate % for this page drops below 3%, H2s share no pattern with other Tier 1 pages

### Phase 1b — Cedar Park

**Scheduled:** 2026-04-22 (Wed)
**Status:** pending
**File:** `cedar-park-mortgage-lender.html`
**Angle:** "Why Leander ISD Premium Changes Your Mortgage Math in Cedar Park"
**Pre-check:** Phase 1a status == completed

### Phase 1c — Leander

**Scheduled:** 2026-04-25 (Sat)
**Status:** pending
**File:** `leander-mortgage-lender.html`
**Angle:** "Buying New Construction in Leander: What Builder-Preferred Lenders Don't Tell You"
**Pre-check:** Phase 1b status == completed

### Phase 1d — Georgetown

**Scheduled:** 2026-04-28 (Tue)
**Status:** pending
**File:** `georgetown-mortgage-lender.html`
**Angle:** "Georgetown Water Districts and MUD Taxes: How They Affect Your DTI"
**Pre-check:** Phase 1c status == completed

### Phase 1e — Pflugerville

**Scheduled:** 2026-05-01 (Fri)
**Status:** pending
**File:** `pflugerville-mortgage-lender.html`
**Angle:** "Pflugerville Property Tax Rate: Why Your Pre-Approval Amount Is Smaller Here"
**Pre-check:** Phase 1d status == completed

### Phase 1f — Dripping Springs

**Scheduled:** 2026-05-04 (Mon)
**Status:** pending
**File:** `dripping-springs-mortgage-lender.html`
**Angle:** "Dripping Springs Well Water, Septic, and Rural Loans: What to Check Before You Close"
**Pre-check:** Phase 1e status == completed

---

## Phase 2 — Structural fixes + kill list

**Scheduled:** 2026-05-08 (Fri)
**Status:** pending
**Pre-check:** Phase 1f status == completed

**Actions:**

1. **Vary remaining suburb H2s.** For the 18 non-Tier-1 suburb pages that survive (i.e. not on the kill list), rotate H2s so no pattern appears on more than 3 pages. Script: `_deliverables/vary-h2s.py` (to be created in this phase).
2. **Execute kill list.** Create `small-town-central-texas-mortgages.html` merging:
   - florence-mortgage-lender.html
   - smithville-mortgage-lender.html
   - jarrell-mortgage-lender.html
   - spicewood-mortgage-lender.html
   - elgin-mortgage-lender.html
   Each of the 5 originals gets a 301 in `_redirects` pointing to the merged page with an anchor.
3. **Update sitemap.xml** — remove the 5 killed URLs, add the merged URL.
4. **Delete the 5 original HTML files.**
5. **Remove the 5 city names from any internal nav / footer / related-city blocks on surviving pages.**
6. **Apply AEO Requirements** to the new `small-town-central-texas-mortgages.html` — all 8 items from the AEO Requirements section above.
7. **Create `/llms.txt`** at repo root. Format per the emerging llmstxt.org spec: a markdown file listing key site pages (the 6 Tier 1 city pages, the hub `austin-area-mortgage-lender.html`, the new `small-town-central-texas-mortgages.html`, the mortgage glossary, the blog index) with one-line descriptions. Include one short paragraph at the top identifying Adam Styer as NMLS #513013, independent mortgage broker in Austin TX.
8. **Submit merged page to GSC** — flag in TODO.md NEEDS ADAM.

---

## Phase 3 — Backlinks & internal link circulation (weekly recurring)

**Scheduled:** weekly, Mondays, starting 2026-05-11
**Status:** recurring
**Pre-check:** Phase 2 status == completed (stop rotating until Phase 2 is done)

Each Monday run rotates through the 6 Tier 1 cities (Round Rock → Cedar Park → Leander → Georgetown → Pflugerville → Dripping Springs, then back to Round Rock).

**Actions per run:**

1. Pick the next city in rotation (track via `PHASES.md` field `phase_3_rotation_index`).
2. Draft a Google Business Profile post (150-250 words) referencing the target city's mortgage-lender page. Commit to `_deliverables/gbp-posts/` as a dated markdown file.
3. Add 2-3 new internal links to the target page from:
   - The homepage `index.html` "featured cities" block (rotating)
   - A recent blog post (topically relevant one)
   - The hub page `austin-area-mortgage-lender.html` if not already linked
4. Update `PHASES.md` rotation index, commit, push.
5. Flag in TODO.md NEEDS ADAM: "Publish the GBP post saved to `_deliverables/gbp-posts/YYYY-MM-DD-{city}.md`."

---

## Phase 4 — Measurement & Tier 2 decision

**Scheduled:** 2026-06-15 (Mon) — 6 weeks after Phase 1f
**Status:** pending
**Pre-check:** Phase 1f status == completed AND current date >= 2026-06-15

**Actions:**

1. Pull GSC indexing status via the site's Search Console export (flag for Adam if manual export needed).
2. Re-run `python3 _deliverables/suburb-audit.py` to verify content targets hit: avg boilerplate < 3%, avg unique > 88%, no H2 on more than 3 pages.
3. **AEO schema coverage check.** For each of the 6 Tier 1 pages, grep/parse the file and verify presence of: `Person` schema with NMLS identifier, at least 2 `Service` or `FinancialProduct` schema blocks, `SpeakableSpecification` inside `FAQPage`, the byline string matching `NMLS #513013`, at least one question-form H2 (ending in `?`), and a definitional paragraph (regex: `A [A-Z][a-z ]+ mortgage lender is` or `Refinancing in [A-Z][a-z ]+ works`). Report per-page coverage and flag any gaps.
4. Count Tier 1 pages now in "Indexed" bucket.
5. Decision tree:
   - **≥4 of 6 indexed:** content approach is working. Append a new Phase 5 section to this file queuing Tier 2 rebuilds (13 non-Tier-1 surviving pages, prioritized by current traffic and business value). Flag in TODO.md NEEDS ADAM for Adam to approve Phase 5 scope.
   - **≤3 of 6 indexed:** content approach is insufficient. Append to TODO.md NEEDS ADAM: "Phase 1 did not move the needle. Root cause is likely site authority, not content. Pivot to backlink campaign and pause further page rebuilds." Include the indexed count and content metrics for reference.
6. Write a full summary to `_deliverables/phase-4-report-YYYY-MM-DD.md` including the AEO coverage matrix from step 3.
7. Commit, push.

---

## How each scheduled trigger behaves

Each scheduled trigger prompt points at this file. The prompt tells the trigger:

1. `cd /Users/adamstyer/Documents/Claude/styerteam-mortgage-site`
2. Read `PHASES.md`, find its phase entry, check the Pre-check
3. If Pre-check fails: append to `TODO.md` under `## NEEDS ADAM` and exit without committing changes to site files
4. If Pre-check passes: execute the phase's Actions
5. Update this file: set `Status: completed`, `Actual: YYYY-MM-DD`, append any notes
6. Commit all changes with message `Phase {ID}: {brief summary}`
7. `git push`
8. Report summary back (visible only in the trigger's log since there's no live session)

## Phase 3 rotation index

phase_3_rotation_index: 0

(0 = round-rock, 1 = cedar-park, 2 = leander, 3 = georgetown, 4 = pflugerville, 5 = dripping-springs. Incremented and mod-6'd each run.)
