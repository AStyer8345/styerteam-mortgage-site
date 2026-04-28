## 2026-04-28 — Re-Verify-Before-Write Saves a Whole AEO Insertion + Em-Dash Char-Count Gotcha + Auto-Compliance USDA Removal

### Patterns
- **Re-verify-before-write rule for AEO body answers: grep `<p><strong>` BEFORE inserting.** TOMORROW_PRIORITY #4 from yesterday's PM run lined up the next pair: DSCR + how-to-choose-lender. Both posts use the newsletter-author-bar template, so the insertion path was identical. But when I read how-to-choose-lender to plan the AEO insertion, I found it already had a `<p><strong>` answer at line 190 ("To choose a mortgage lender in Austin TX, compare independent brokers…"). Likely added in an earlier session that wasn't tracked in the cluster audit. Saved an entire insertion + commit + dedup-risk. Lesson: before any AEO insertion, run `grep -A2 'newsletter-author-bar' <file> | grep -A1 'p><strong'` (or equivalent) to confirm the post is actually missing an AEO answer. The audit-script-derived list of "16 needing fix" is a snapshot in time and may be stale by the time it's worked through. Re-verify each individual file at insertion time, not only at audit time.
- **Em-dash byte vs. char gotcha when targeting 160-char meta descriptions.** `wc -c` counts bytes, not chars. UTF-8 em dash (—) = 3 bytes = 1 char; en dash (–) = 3 bytes = 1 char. So a meta description with 1 em dash and "162 bytes" is actually 160 chars (right at the cap). After my first pass, two pages (first-time-home-buyer + rate-check) showed `wc -c` outputs of 162-163; raw byte count put them under-cap, but I trimmed conservatively to 152-160 chars to absorb future em-dash inflation. Validation rule: when meta is "over 160 by a hair," use `python3 -c 'print(len(<string>))'` to get the actual char count. Don't waste a trim cycle on byte-count phantom-overage.
- **USDA removal on meta descriptions is auto-doable; body USDA removal still requires Adam decision.** Voice guide explicitly says Adam does NOT do USDA. So removing "USDA" from a meta description is just enforcing the existing rule — no judgment call, low risk, fully reversible. But on body copy, USDA references can be in: loan-program tables (potential broken link if "/loans/usda.html" referenced); FAQ schema entries (rebuild required); supporting-product narratives (substantive rewrite). Each touches reader-facing product menu in ways that affect perceived offering. Decision split: meta auto-fix; body Adam-decision. Today's first-time-home-buyer.html meta change was the small-surface auto-fix. The body USDA cleanup on how-to-buy + Smithville/Elgin/Florence/Jarrell remains carry-forward in FLAG_FOR_ADAM.
- **`how-to-choose-lender` already had AEO answer in v1 → audit script was missing a "leading p+strong in article body" detection mode for newsletter-author-bar posts.** The "16 NEEDS_FIX" count is one too many. Should now be "15 NEEDS_FIX, 1 already done." Next audit script pass should improve detection: walk DOM `<article class="blog-post"> > <section> > <div.container-narrow> > <div.article-body> > <div.newsletter-author-bar>` then check the next `<p>` for leading `<strong>` and 40-80 word count. If yes → already done. If no → NEEDS_FIX. The current script only looked at "first `<p>` after `<h1>` in `<article>`," which missed the case where the AEO `<p><strong>` was inserted as the actual first content paragraph after the author block.
- **TOMORROW_PRIORITY's "do this FIRST" instruction works under the re-verify gate even when the gate cancels the work.** Yesterday's PM run wrote `TOMORROW_PRIORITY #4 = DSCR + how-to-choose-lender pair`. Today's run picked it up first, executed the re-verify gate, and the gate canceled half the work (lender already done) — but the OTHER half (DSCR) still got done. Net result: TOMORROW_PRIORITY drove correct prioritization, the gate saved redundant work, and the cluster still advanced (4/16 → 6/16). This pairing of "directive priority" + "re-verify gate" is the right structure for sprint-style serial work.
- **NotebookLM 9th consecutive dead run.** Same pattern. Diff still pending Adam's apply. CONTEXT.md WAITING_ON_ADAM section suggested in 2026-04-27 AM learnings still hasn't been added; that suggestion remains worth implementing.

---

## 2026-04-27 PM — Older-Template AEO Cluster: 4/16 Closed + Second Insertion Pattern Confirmed (`blog-article-body`)

### Patterns
- **Second older-template insertion pattern confirmed: `blog-article-body` posts.** FTB (`2026-03-30-first-time-home-buyer-programs-austin-tx-2026.html`) does NOT use `newsletter-author-bar` — instead it uses `<article class="blog-article">` containing `<div class="blog-article-header">` (with `blog-article-meta`, `blog-article-title`, `blog-article-subtitle`, `blog-article-author`) followed by `<div class="blog-article-body">` with the article paragraphs. The author block closes inside `blog-article-header`, so there's no need to walk past it. Insertion point: immediately after the opening `<div class="blog-article-body">`, before the first `<p>`. Cleaner than the newsletter-author-bar pattern because it requires no "skip past author block" logic.
- **Voice-extraction layering: when existing first `<p>` is voice-y/casual, DON'T replace — add an extraction layer above.** FTB's existing first paragraph is "If you're buying your first home in Austin in 2026, there's money on the table most buyers leave behind." That's voice. It hooks human readers. Replacing it with a machine-extractable answer would weaken the human funnel. Solution: add the AEO answer as a distinct paragraph ABOVE the voice-y opener. Both serve different audiences. Two-layer extraction-then-voice works whether the existing paragraph already contains the answer (fha-vs-conv pattern) OR has voice but no extraction (FTB pattern). Rule unifies: AEO answer paragraph always goes ABOVE the existing first paragraph; existing paragraph is preserved untouched.
- **Voice-y casual openers like "there's money on the table most buyers leave behind" are exactly what the AEO answer paragraph should NOT try to be.** The job is division of labor: voice paragraph builds trust, answer paragraph gets indexed by AI Overviews. Trying to merge them produces stilted prose that does neither job well.
- **VA template = newsletter-author-bar (older `<header>` pattern). FTB template = blog-article-body.** Both are in the "older `<header>`-template" cluster but they have structurally different insertion points. Future audit script should detect which pattern each post uses and emit the correct insertion point. Likely most older-template posts are one of these two patterns; DSCR + how-to-choose-lender + self-employed need a quick template-check before the next run inserts.
- **Pair cadence updated:** ~~cash-out + fha-vs-conv~~ ✅ → ~~va-eligibility + ftb-programs~~ ✅ → dscr + how-to-choose-lender (next) → self-employed + DPA → how-long-pre-approval + market-report → rate-volatility / life-devotional (separate pass).
- **NotebookLM 8th consecutive dead run.** Same as 7th-run note above: SKILL.md retirement diff still pending Adam's apply; cached-learnings fallback continues to work. No new info to surface.
- **PM run note (process):** the daily task fired twice today (08:04 AM + 23:08 PM). The PM firing is not a normal pattern but worked cleanly because the AM run's `TOMORROW_PRIORITY #4` line provided a self-contained next-task description (the next AEO pair). Lesson: TOMORROW_PRIORITY is also serving as "if a second run fires today, here's exactly what to do" — keep it concrete and self-contained.

---

## 2026-04-27 AM — Older `<header>`-Template AEO Cluster: 2/16 Closed + about.html Address Schema Mismatch Discovered

### Patterns
- **Older-template AEO insertion point confirmed: after `</div>` of newsletter-author-bar, before first content `<p>`.** Both posts in this run had identical structure: `<section class="section"><div class="container container-narrow"><div class="article-body"><div class="newsletter-author-bar">...</div>` followed by the first content paragraph. The clean insertion point is between the closing `</div>` of newsletter-author-bar and the first `<p>`. This is the pattern for all 14 remaining older-template posts.
- **When the existing first paragraph already contains the answer (mid-paragraph `<strong>`), DON'T replace — add a distinct-angle paragraph above.** fha-vs-conventional already had `<strong>if your credit score is below 640... start with FHA</strong>` embedded in "The short answer:" — replacing would lose the conversational warmth. Adding a new answer-first paragraph above with a distinct angle (decision-frame + MIP-vs-PMI life-of-loan distinction) preserves human voice AND satisfies machine extractability AND avoids duplication. This is a refinement of the distinct-wording rule from the rate-shopper series.
- **Use the post's own numbers/examples in the body answer — eliminates compliance risk and avoids reader-confusion.** Cash-out body answer used 22% credit-card → 7% mortgage / $8K–$12K closing costs / Texas 80% LTV — all already in the post body. Fha-vs-conv body answer used 640/680 credit / 5%+ down / PMI cancels at 20% / MIP stays for <10% down — all already in the post FAQ + table. Rule: scan post body for existing illustrative numbers before writing the body answer; reuse them.
- **NEW second audit script for older-template posts works correctly.** Logic: find `<article>` (or `<main>`) → find first `<h1>` inside → find first `<p>` after that `<h1>` → HAS_AEO if leading `<strong>` and 40-80 words. Skip posts using `blog-post-header` template (already audited). Found 16 posts needing fix (1 already had it: 2026-04-03-condo-mortgage). After this run: 2/16 closed, 14 remaining. Cadence: 2/AM-run paired by topic.
- **Pair cadence by topic for older-template AEO sprint:** ✅ cash-out + fha-vs-conv (refi+FHA cluster) → va-eligibility + ftb-programs (loan-type/buyer-segment) → dscr + how-to-choose-lender (investor+advisor) → self-employed + DPA → how-long-pre-approval + market-report. Rate-volatility / life-devotional posts (oil-prices, austin-rates-march, why-rates-improved, spring-market-update, ai-trap, surrender-it) get a separate pass at the end — they have a different question framing (event-driven vs evergreen-question). Topic pairing keeps each session focused on a single vocabulary cluster.
- **NEW: Schema entity-consistency audit caught a real address mismatch on about.html.** Homepage MortgageBroker schema = `5718 Sam Houston Circle, Austin TX 78731` (matches the about.html Person schema). About.html LocalBusiness schema = `5900 Balcones Drive, Suite 100, Austin TX 78731`. Two different streets in the same ZIP. Likely the about.html LocalBusiness was added later and used the company HQ address while the homepage uses Adam's office address. Either is defensible but they MUST match for AEO/local-pack signals. Adam decision item — do not auto-fix without confirmation. Lesson: schema audits should compare addresses across MortgageBroker, LocalBusiness, and Person entities — not just check that each one is "valid" in isolation.
- **Re-Verify Gate is now catching same flags 2-3 runs in a row that don't change state because they require Adam decision.** USDA cleanup, about.html timeline-date, thank-you.html alt-paths, and now about.html LocalBusiness address — all reach the gate but stay carry-forward because the resolution path is "Adam decides." This is correct behavior (no muscle-memory drift) but suggests a meta-improvement: a "WAITING_ON_ADAM" section in CONTEXT.md so these don't keep cycling through ISSUES FOUND each run as if they were new.
- **NotebookLM 7th consecutive dead run.** Pattern is now: SKILL.md edit drafted 6 days ago, still pending Adam's apply, falling-back-to-cached-learnings working fine. The flag is no longer telling Adam anything new — it's telling future-me "the patch is still pending." Suggestion for next time: fold this into CONTEXT.md WAITING_ON_ADAM and remove from FLAG_FOR_ADAM HIGH-ESCALATED tier until status changes.

---

## 2026-04-27 — Competitive Week 8: SERP-Wide Snapback + Hutto #1 Lost + Round Rock Dropped

### Patterns
- **First negative-direction week in 4 weeks of suburb-page tracking — and it was algorithmic, not regression**: styermortgage.com went from 2 keywords in top 3 (Hutto #1, Round Rock #2) to 1 keyword in top 3 (Hutto #2). Both pages still have correct schema (136 reviews) and recent edits (Hutto 2026-04-25, RR 2026-04-23). Big Life reclaimed Hutto #1 without measurable content updates — no neighborhood names added, no 2026 dates, no schema changes, still ~25 reviews. This means our content advantage is intact but algorithmic factors (freshness, click-through, possibly inbound link gain) tilted toward Big Life this week. Defense move: GSC URL Inspection re-indexing request to push our updated schema to next crawl, not more content rewrites.
- **The "content velocity" thesis got a sharp counter-example**: Last week (2026-04-20), Nest Mortgaging was the headline new threat — 6+ keywords ranking, 10+ 2026-dated posts, "content machine" out of Kyle TX. This week: zero appearances in any tracked keyword. Total disappearance in 7 days. AsertaLoans (last week's new #1 cash-out refi entrant) also gone. Old incumbents re-emerged: AustinHomeLoans.com back at #1 home loan, Vista Lending back at #5 lender, Highlander back at #2 broker, Sente back at #10 home loan. The SERP snapped back ~3-4 weeks toward older/established domains. Lesson: pure content velocity without domain authority is brittle. Our suburb-first strategy is structurally more durable than competing on head-term content velocity.
- **Round Rock #2 → not found fits "new page sandbox" pattern**: Round Rock page deepened 2026-04-19, ranked #2 the very next Monday (2026-04-20), gone from top 10 by 2026-04-27. Classic Google sandbox-bounce for newly-deepened pages — they appear, get tested by clicks/dwell, then drop while Google re-evaluates. Recovery path: GSC URL Inspection (forces re-crawl) + don't over-rewrite (let Google re-stabilize the ranking). Don't add 5 new sections in panic — you'll trigger another sandbox cycle.
- **CrossCountry Mortgage 2-branch dominance on Cedar Park is structural**: Cedar Park SERP has CrossCountry at #1 AND #3 with two physical branch listings. This is a structural advantage we cannot match (we don't have physical branches). For any suburb where CrossCountry has 2 branches, the realistic ceiling is #4-#6. Cedar Park strategy must shift from "out-content" to: (1) realtor preferred-lender placements (cedarparktxliving.com is #2 — relationship play), (2) hyper-local content depth (Cedar Park ISD, Brushy Creek Lake, Twin Creeks, Buttercup Creek), (3) "no branch needed — we're an independent broker" positioning.
- **Lone Star Financing is the structural suburb leader**: Has #1 Round Rock + #1 Lakeway with dedicated `/round-rock/` and `/lakeway/` pages. Same template, multi-suburb expansion, well-tenured domain. They are the suburb competitor to model and the structural leader to displace one suburb at a time with hyper-local depth.
- **AustinHomeLoans.com re-emerged with 40-year tenure moat**: Schutze Brothers, "native Austin feel", 2,000+ closed loans, 245+ 5-star reviews, A+ BBB, 40+ Years. Back at #1 for "home loan austin tx." Confirms: don't waste resources targeting head-term Austin keywords. Suburb-first is the correct strategic call.
- **"Get pre-approved austin tx" SERP is contaminated with auto-loan results — this is itself an opportunity**: Half the top 10 are car dealerships and credit union auto loan pages (Roger Beasley Mazda, Long Motors, Bentley Austin, etc.). MortgageAustin.com still holds #1 for the mortgage interpretation, but the title-tag battle is winnable by anyone who explicitly hooks "MORTGAGE pre-approval" vs auto. Title rewrite opportunity for `/mortgage-pre-approval-austin.html`.
- **NotebookLM Step 0/4 — 6th consecutive run dead**: `notebook_advisor.py` still absent from disk (verified 2026-04-27). The 5th-run patch drafted on 2026-04-26 has not been applied. Pattern continues — falling back to cached learnings + direct strategic reasoning works fine. The skill needs a SKILL.md edit; flagging again creates noise.
- **Re-verify gate caught 9 prior claims this week — record number**: Hutto #1 (downgraded), Round Rock #2 (cleared), AsertaLoans (cleared), Nest 3-position dominance (cleared), Vista cleared (reversed), Highlander cleared (reversed), AustinHomeLoans cleared (reversed), Sente "not appearing" (partially updated), Nest #1 home loan (cleared). The gate is doing its job — without it, this report would have been a graveyard of last week's now-false claims. Pattern: in a high-volatility SERP week, the re-verify gate is the single most important step.

---

## 2026-04-26 PM — should-i-refinance AEO Body Answer + blog-post-header Template 14/14 Complete

### Patterns
- **`blog-post-header` template AEO cluster now 14/14 complete** — Tonight's PM run closed the last gap: `2026-04-17-should-i-refinance-austin-tx-2026.html`. The post used the exact same `<header class="blog-post-header"> → <p class="blog-post-intro"><strong>... → </header>` anti-pattern as the rate-shopper series. Same fix worked: body `<p><strong>` (56 words) inserted after `</header>`, distinct angle from the intro. Cluster total: 10 rate-shopper posts (closed 2026-04-23 → 2026-04-26 AM) + 4 dated 2026-* posts (3 already done pre-audit + tonight's 1) = 14 posts. The `blog-post-header` template is now AEO-clean.
- **All 6 H2s already in question form on should-i-refinance — no statement→question conversion needed**: This is the first post in the AEO series where every single H2 was already a question. The post was apparently authored after the AEO question-H2 pattern was internalized. Lesson: scan H2s before assuming a conversion is needed; sometimes the only gap is the body answer paragraph itself.
- **Audit method needs a second pass for the older `<header>` template (~16 dated 2026-* posts)**: The `<header class="blog-post-header">` audit script returns NO_BLOG_HEADER for posts that use the older `<header>` (page nav) + `<article class="blog-article">` template. Inspecting 5 representative posts (cash-out, fha-vs-conventional, va-eligibility, ftb-programs, dscr) shows they have `<p><strong>` paragraphs throughout the body but NOT as the answer-first leadoff after `<h1>`. They need a different audit method: find first `<p>` after `<h1>` inside `<article>`/`<main>`, check if it starts with `<strong>` and is 40-70 words.
- **Same-day double-run pattern continues to compound progress** — Today's morning run + tonight's PM run combined to: (1) complete the rate-shopper series (10/10), (2) close the last `blog-post-header`-template gap, (3) audit + propose the next AEO target cluster with cadence. Three discrete deliverables in one calendar day. The morning-PM rhythm is now the proven pattern for accelerating cluster work.
- **Next AEO sprint cadence proposed: 2 posts per AM run, paired by topical cluster**: cash-out + fha-vs-conventional → va-eligibility + ftb-programs → dscr + how-to-choose-lender → self-employed + (next loose thread). Pairing keeps each session focused on a single topic family and lets the body-answer wording reuse vocabulary across the pair.
- **thank-you.html uncommitted change discovered tonight (not from this scheduled task)**: `git diff` showed an unstaged modification to thank-you.html exposing `ty-alt-paths` for refinance + preapproval thank-you-types. Not staged in tonight's commit. Logged in FLAG_FOR_ADAM. Lesson for future PM runs: always run `git diff` and `git status` before staging, and only stage the files you actually touched this session — never `git add .` or `git add -A` even when "everything looks fine."

---

## 2026-04-26 — Rate-Shopper AEO Series Complete (10/10) + NotebookLM 5th-Run Concrete Patch

### Patterns
- **Rate-shopper AEO series 10/10 milestone — anti-pattern fully closed**: Today's run knocked out the final two posts (`what-to-compare-besides-mortgage-rate.html` + `is-the-lowest-rate-the-cheapest-loan.html`). Both had the predicted `blog-post-intro`-in-`<header>` anti-pattern. The body `<p><strong>` after `</header>` fix worked cleanly. The full series of 10 rate-shopper posts now has machine-extractable answer paragraphs in the article body, distinct from the styled `<header>` intros. This is the largest single-anti-pattern AEO sweep the site has completed — 10 posts, 4 runs, ~20 minutes per run.
- **AEO body-paragraph word-count zone — 50-70 words confirmed across all 10 posts**: Today's two new body answers landed at 60 and 64 words. All ten posts in the series fall in the 50-70 range. The "lead with answer in the first 12-15 words" rule held in every case. This is now the canonical word-count target for any future AEO body paragraph on this site.
- **Distinct-wording rule prevents thin-content/duplicate signal — 10/10 examples**: Every post in the series paired a styled `blog-post-intro` (factor list / total-cost frame / general statement) with a body answer that picked a different angle (practical method / time-horizon focus / specific dollar example). For a future series sweep on a different post cluster: scan the existing intro first, then write the body answer to attack the question from a complementary angle.
- **Aligning illustrative numbers to the post's own example builds consistency**: For the is-the-lowest-rate-cheapest body answer, used the post's existing Lender A (6.375%/$8,500) vs Lender B (6.5%/$3,000) numbers from line 196-204 instead of inventing new ones. This eliminates compliance risk (no new rate quotes), reads as a preview of the post's own argument, and avoids reader-confusion if numbers diverged. Rule: when adding an AEO body answer that includes illustrative figures, scan the post body first and reuse its own example numbers.
- **NotebookLM Step 0 — 5th-run concrete diff drafted instead of recurring flag**: After 4 runs of carrying NotebookLM as an escalating flag, today's run wrote a unified-style diff Adam can apply to SKILL.md as a one-shot edit. Rule for any agent-spec problem that has carried forward 4+ runs without resolution: stop re-flagging the abstract issue and write the concrete patch instead. The `notebooklm` binary at `/Users/adamstyer/.local/bin/notebooklm` exists but is a source-management CLI (used in Step 8) — not a Q&A advisor — so the cleanest patch retires Step 0 entirely and leans on the carry-forward NOTEBOOK_INSIGHTS pattern that's already working.
- **Re-Verify Gate — claims I don't own (no live verification path) carry forward without re-checking**: USDA cleanup on Smithville/Elgin/Florence/Jarrell/Liberty Hill and the how-to-buy loan table all depend on Adam's confirmation of his actual product offering, not on a live state I can curl. The Re-Verify Gate explicitly carves these out ("Claims this task does NOT own"). Carrying them forward without re-verification is correct behavior, not muscle-memory drift.

---

## 2026-04-25 PM — Rate-Shopper AEO 8/10 + NotebookLM 4th-Run Escalation

### Patterns
- **Rate-shopper AEO 8/10 milestone — only 2 posts remaining**: Today's PM run knocked out `what-delays-closing-when-you-switch-lenders.html` and `how-to-read-a-loan-estimate.html`. Both had the predicted `blog-post-intro` inside `<header>` anti-pattern. The body `<p><strong>` after `</header>` fix continues to work cleanly. Remaining 2 rate-shopper posts: `what-to-compare-besides-mortgage-rate.html` + `is-the-lowest-rate-the-cheapest.html` (or whichever is in the remaining set — confirm by grepping `blog-post-intro` inside `<header>` on each rate-shopper post). Sunday's run should finish the series.
- **AEO body-paragraph word-count zone — 50-70 words is the sweet spot**: Today's two new body answers landed at 56 and 66 words. Yesterday's were 60 and 54. All four read as direct answers without overflowing the visible viewport on mobile. Word-count target for the remaining 2 posts: 50-70 words, lead with the answer in the first 12-15 words.
- **Distinct-wording rule prevents thin-content/duplicate signal**: The `blog-post-intro` and the body `<p><strong>` answer cover the same question but from different angles. delays-closing intro emphasized "appraisal + waiting too long" — body emphasized "start within first week, here's why timeline holds." loan-estimate intro listed the 5 numbers — body emphasized "don't read every line, focus on five." This pattern keeps both paragraphs useful without triggering duplicate-content signals or feeling repetitive to a human reader.
- **Two-runs-same-day cadence proven again — same-day TOMORROW_PRIORITY can be executed by a same-day second run**: This is the second instance (also happened 2026-04-24) where the morning run set TOMORROW_PRIORITY for "Sunday" but the schedule fired again the same day, the second run executed it cleanly, and progress accelerated from 2/week to 4/week on the rate-shopper AEO series.
- **NotebookLM Step 0 — 4th consecutive run confirms dead, remediation patch should be drafted**: Step 0 has now been a no-op for 4 runs (2026-04-23, 04-24 AM, 04-24 PM, 04-25 AM, 04-25 PM = arguably 5 runs). Sunday's run should write the concrete SKILL.md diff — not just keep flagging — so Adam can approve a one-shot edit. Proposed replacement: detect `/Users/adamstyer/.local/bin/notebooklm` (which DOES exist), use it via the `notebooklm` skill, and otherwise fall back to cached `NOTEBOOK_INSIGHTS` from learnings.md.
- **Git rebase needed before push — sister scheduled task wrote between commit and push**: After commit, `git push` was rejected because `046948a` (suburb-deepener Phase 1c flag) had landed on remote during this run. `git pull --rebase origin main` cleanly replayed today's AEO commit on top. Pattern for future runs: when push is rejected, always check `git log HEAD..origin/main` first to see what landed, then rebase. Never force-push.

---

## 2026-04-25 — Footer Awards Sitewide Batch + Two Indent Variants + Pattern A vs Pattern B Discrimination

### Patterns
- **Two indent variants required two regex passes — single-line variant was the surprise**: Initial multi-line regex (`(\s*)star1<br>\n\s*star2`) caught 47 of 56 files. Inspecting the 9 remaining files revealed they all use a single-line variant: `<p>star1<br>star2</p>` with both stars on the same line, no internal newline. These are the auto-generated/minified-style root pages (austin-housing-market-2025, austin-down-payment-assistance, austin-mortgage-rates, calculators, closing-costs-texas, how-much-house-can-i-afford-austin, mortgage-glossary, mortgage-pre-approval-austin, rate-check-cedar-park). Lesson for future template fixes: always grep first with the broadest possible content match (`91 Google Reviews`), then inspect a sample from each "missing" group to detect formatting variants. Don't assume one regex catches all variants.
- **Pattern A (footer `<p>` Awards) and Pattern B (timeline `<span>` milestone) are NOT the same drift vector — discriminate before batching**: `grep -l "91 Google Reviews"` returns 57 files. 56 of those are footer Awards `<p>` blocks; 1 is about.html's milestone timeline `<span class="timeline-date">91 Google Reviews &bull; 45 Zillow Reviews</span>`. The timeline-date span is contextually different — it sits next to `<h4>5.0 Star Google Rating</h4>` as a record of when that milestone was reached. The TOMORROW_PRIORITY explicitly scoped to the `<p>` form, and the timeline span carries a "this is when this happened" implication that may be intentional. Rule: when a sitewide grep returns a file with a different surrounding structure than the rest, audit it separately and surface as a discrete decision rather than batching.
- **`\g<lead>` named capture group is the cleanest way to preserve indent in Python regex `.sub()` replacement**: `re.sub(r'(?P<lead>[ \t]*)pattern', r'\g<lead>replacement', text)` works across all indent levels (8-space and 10-space variants both passed the same regex). Avoids the brittle `\1` numeric backref + escape concerns.
- **88 pages now display "136+ Reviews" format after the batch**: Sitewide consistency check `grep -l "136+ Reviews" *.html blog/*.html | wc -l` returned 88. This is the new reference number for any future AggregateRating drift audit. If this number drops below 88 in a future run, a regression has been introduced.
- **6-of-10 rate-shopper AEO milestone reached**: After today's run, 6 of 10 rate-shopper blog posts have the AEO-correct `<p><strong>` body paragraph pattern (can-i-switch, how-to-compare, apr-vs-interest-rate, are-mortgage-lender-fees-negotiable, how-many-mortgage-quotes, local-lender-vs-online). Remaining 4: what-delays-closing, how-to-read-a-loan-estimate, what-to-compare-besides-rate, is-the-lowest-rate-the-cheapest. Same anti-pattern likely; same fix. Two-per-run cadence completes the series in 2 more Friday rotations.
- **NotebookLM Step 0 — 3rd consecutive run confirms dead**: `notebook_advisor.py` not at `/Users/adamstyer/loanos/scripts/` or anywhere on disk. The `loanos/` directory itself is gone (replaced by `loanos-clone/`). 3rd run = officially escalated. Sunday's run should propose the SKILL.md edit removing Step 0 outright if Adam hasn't restored the script.

---

## 2026-04-24 PM — Rate-Shopper AEO Continued + Footer Awards Sitewide Drift Discovery

### Patterns
- **Rate-shopper AEO anti-pattern is consistent across the entire 10-post series**: 4 posts now confirmed to have answer-first text only inside `<p class="blog-post-intro">` within `<header>` — can-i-switch (fixed AM), how-to-compare (fixed AM), apr-vs-interest-rate (fixed PM), are-mortgage-lender-fees-negotiable (fixed PM). Pattern: every rate-shopper post created in this series uses the same template. The remaining 6 posts (how-many-mortgage-quotes-should-i-get, local-lender-vs-online-lender, what-delays-closing, how-to-read-a-loan-estimate, what-to-compare-besides-rate, is-the-lowest-rate-the-cheapest) almost certainly have the same gap. Future Friday rotations should batch through these 2-at-a-time.
- **Footer Awards sitewide drift discovered — suburb-only fix on 2026-04-23 missed root pages and blog posts**: `grep -l "91 Google Reviews"` reveals 28 blog posts + 29 root pages still carry the old `★ 5.0 Stars · 91 Google Reviews / ★ 4.98 Stars · 45 Zillow Reviews` two-line format. Suburb pages were already fixed (round-rock spot-check confirmed standard format). The April 23 batch was scoped to `*-mortgage-lender.html`. Rule for future sitewide template fixes: ALWAYS run `grep -l "<old-string>" *.html blog/*.html *-mortgage-lender.html` to confirm the fix is truly complete across all directories. Class-name or filename-pattern globs miss whole categories.
- **Friday rotation discipline — DECISION TEST said batch the 57-file footer fix; CLAUDE.md "surgical changes" said don't**: The DECISION TEST in SKILL.md says "If you cannot answer YES to all three, you MUST attempt the work" and treats "do all 25 of them" as a non-blocker. CLAUDE.md says "touch only what the request requires." When TOMORROW_PRIORITY explicitly says "Pick 2 blog posts and check," that's the contract for the session — adjacent batch work goes into the next TOMORROW_PRIORITY rather than expanding scope mid-session. The 57 files are queued for the next run as a ZERO_RISK batch.
- **Two-runs-same-day pattern — preserve AM run via master log, write PM run as canonical 2026-04-24.md**: When a second run fires on the same date, the AM run's content already lives in the master `Styer_Growth_Log.md` via the bash append at end of step 8. The dated run-logs/YYYY-MM-DD.md and run-logs/latest.md should reflect the most recent run. No data loss; downstream agents reading latest.md get the freshest TOMORROW_PRIORITY.
- **Buda USDA cross-task confirmation — RESOLVED via parallel suburb-editor-daily**: Yesterday's run carried Buda USDA as HIGH carry-forward. Today's CONTEXT.md confirms suburb-editor-daily fixed it (commit 4755b70: schema, FAQ, tile, stat, process, CTA all removed). Re-Verify Gate caught only 1 USDA hit remaining (likely "Adam does not do USDA" disclaimer text). Cleared from FLAG_FOR_ADAM. Pattern: always re-grep at start of every run before flagging — parallel tasks may have closed the issue while you weren't looking.

---

## 2026-04-24 — Rate-Shopper AEO Gap + about.html CTA Pattern

### Patterns
- **`blog-post-intro` inside `<header>` is the same AEO anti-pattern as `hero-subtitle`**: Two rate-shopper posts (can-i-switch, how-to-compare) had strong answer-first text in `<p class="blog-post-intro"><strong>` inside the `<header>` block. This pattern was documented as an anti-pattern in April 10 + April 12 learnings but still appeared in newer posts. The `<p><strong>` AEO fix must go directly in the article body, after `</header>`. There are now 10 rate-shopper posts — audit the remaining 8 for this same gap in future Friday rotations.
- **about.html body CTAs survived batch CTA sweeps because the page uses a different template**: The raw app URL persisted on about.html's body "Get Pre-Approved Today" CTA (line 300) and CTA section "Get Pre-Approved" (line 729). Both were missed in all prior sweeps because sweeps targeted `*-mortgage-lender.html` and loan pages. The nav-cta and hero-cta-primary on about.html are intentionally left as raw URL (direct application path). Only body and CTA section CTAs were converted to /get-preapproved.
- **notebook_advisor.py does not exist on disk**: `find /` for the script returned empty. The `loanos/scripts/` path in SKILL.md was always stale (the `loanos/` directory was abandoned months ago). Step 0 cannot be executed. Adam must either restore the script at a known path or the step must be retired from SKILL.md. Until resolved, every run skips Step 0 and uses cached NOTEBOOK_INSIGHTS.

---

# styermortgage.com — Accumulated Learnings

## 2026-04-23 — Footer Awards Two-Template Pattern + Pillar Page Suburb Link Gap

### Patterns
- **Two distinct template variants for the stale "91 Google / 45 Zillow" footer**: 12 suburb pages use `<p>&#11088; 5.0 Stars &middot; 91 Google Reviews<br>&#11088; 4.98 Stars &middot; 45 Zillow Reviews</p>` inside the footer Awards `<div>`. Three older pages (florence, jarrell, marble-falls) use a trust strip pattern `<p style="font-size:0.95rem;...">91 Google Reviews &middot; 45 Zillow Reviews</p>` inside a testimonial section. The grep pattern `91 Google Reviews` catches both, but the Python `str.replace()` must target the full literal string for each variant. The footer Awards section and the testimonial trust strip are two independently maintained review-count locations.
- **Pillar pages can have zero suburb links even if suburb pages exist**: how-to-buy-a-house-in-austin-tx.html (713 lines, written 2026-04-03) had zero internal links to any suburb page despite being the site's top-of-funnel pillar page. A Python `re.findall` for `-mortgage-lender.html` in the content is the reliable way to audit suburb link coverage. The natural insertion point is the home search section (Step 4 in this case) where location-specific content is already discussed.
- **TOMORROW_PRIORITY "write blog post" can mean "improve existing page" when the content already exists**: The April 22b run log said "Blog post due April 24 — How to Buy a House in Austin." Re-Verify Gate found the page existed at 713 lines. The correct interpretation was to improve it (add suburb links) rather than create a duplicate. The GOALS.md constraint "no new content" was also resolved by improving existing. Pattern: always grep for the target page before executing a "write" instruction from TOMORROW_PRIORITY.
- **USDA can appear in loan program comparison tables in addition to meta/schema/FAQ/body**: The how-to-buy loan table included USDA with a link to /loans/usda.html. This is a fourth location (separate from meta, schema, and body feature items) where USDA can appear. When doing the USDA cleanup after Adam confirms, audit ALL of: (1) meta description, (2) LocalBusiness schema description, (3) body feature items/FAQs, (4) loan comparison tables.

---

---

## 2026-04-22b — Liberty Hill Content Enrichment + Footer Awards Audit

### Patterns
- **Footer Awards "91 Google + 45 Zillow" is a separate stale vector from the hero trust badge**: Liberty Hill's hero trust badge was correct (136+ Reviews) but the footer Awards section still had the old split format (91 Google + 45 Zillow). These are independently maintained. The standard footer format is: `&#11088; 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas` — no platform split, no 4.98 Zillow stars. When auditing trust bar consistency, always check BOTH the hero trust badge AND the footer Awards section independently.
- **Footer Awards old format is likely systemic across older suburb pages**: Liberty Hill, and possibly other pages created before the standard was set, may still have the 91/45 split format. Run `grep -l "91 Google Reviews" *-mortgage-lender.html` at the start of any session to find all remaining stale footers.
- **USDA in LocalBusiness schema description is a separate USDA vector from FAQ and body**: The Liberty Hill schema description says "Conventional, FHA, VA, USDA, and new construction loans." This requires the same Adam confirmation as the Buda FAQ content. These are four independent places USDA can appear: (1) meta description, (2) LocalBusiness schema description, (3) body feature item, (4) FAQ. Each must be audited independently.

---

## 2026-04-20 — CTR Title Batch Complete: All 24 Suburb Pages + USDA Meta Discovery

### Patterns
- **Second-run same-day: TOMORROW_PRIORITY from morning run was already done**: Round Rock, Cedar Park, Georgetown were listed as "remaining" in the morning run's CTR status but were already updated in prior sessions. Second run verified live files first (grep title), found all three already done, and moved to the next batch (Buda through Taylor). Pattern: always grep actual file titles before acting on a TOMORROW_PRIORITY list.
- **USDA claims in meta descriptions discovered on Smithville, Elgin, Florence, Jarrell**: All four pages had USDA in their current meta descriptions. The Buda USDA issue (active blocker) was not an isolated error — it's a systemic pattern across all rural/east-Austin pages. These pages likely have USDA in body/schema/FAQ too. Removing from meta is safe (reversible), but body cleanup requires Adam's confirmation (product offering question). The correct action when rewriting metas: simply exclude USDA rather than asking permission — you're replacing, not removing a specific claim from existing content.
- **CTR title differentiation by market type is now fully systematized**: The differentiation pattern is consistent — each city's hook matches what a buyer in that specific market is searching for. Urban-adjacent affordable (Manor, Elgin) = "FHA & TSAHC." Hill Country/lake (Marble Falls, Spicewood) = "Hill Country & Lake LBJ" or "Rural Land & Lake Travis." New construction corridors (Jarrell, Taylor) = "Beat Builder Rates." Luxury (Westlake) = "Jumbo & Eanes ISD." Rural/acreage (Smithville, Florence) = "Rural & Acreage Land OK." This pattern is now the playbook for any future suburb pages.
- **All 24 suburb pages with CTR-hook titles is a SEO milestone**: The full batch took ~8 runs over 4 days (April 17-20). Google's indexer should pick up the title rewrites in the next crawl cycle. Expected CTR improvement should show in GSC within 2-3 weeks for already-ranking pages.

---

## 2026-04-20 — Batch H2 Conversion: Same 4 Patterns Across All Suburb Pages

### Patterns
- **All remaining suburb pages used identical label-format H2s**: "Why [City] Buyers Work With an Independent Broker", "Loan Options for [City] Buyers", "How to Get Pre-Approved for a [City] Home", "[City] Mortgage FAQ" — exact same 4 patterns across Lakeway, Bee Cave, Bastrop, New Braunfels, and the Austin-area hub. This confirms the template is consistent. The question-format conversion is therefore batchable: the same 4 sed patterns work for any remaining suburb page.
- **CTR-hook title differentiation follows market position**: Lakeway = "Jumbo & Luxury Specialist" (jumbo is the unique loan type for this price tier), Bee Cave = "Luxury & Jumbo Expert" (same tier, Eanes ISD angle), Bastrop = "Acreage & Rural OK" (rural land loans are the differentiator for this market). Each hook matches what a buyer in that city is actually searching for, not a generic loan type.
- **sed fails when the replacement string contains the delimiter character**: Used `|` as sed delimiter but the NMLS pipe character (`|`) in strings like "Mortgage Lender Lakeway TX | Adam Styer | NMLS #513013" caused sed to fail silently (no error message, no change). Fix: use Python str.replace() for any string replacement that contains pipes, special regex characters, or HTML entities. This is the definitive pattern for this codebase.
- **NotebookLM schema recommendations are now consistently stale for already-fixed items**: Fourth Monday in a row where NotebookLM recommended something already done (homepage H1 rewrite, Hutto reviewCount). The notebook IS correctly tracking ranking wins and new competitive threats. Pattern: use NotebookLM for directional insight on rankings and competitors, not for specific on-page fix recommendations. Verify all schema/content recommendations against live files.

---

## 2026-04-20 — Hutto #1 Confirmed + Round Rock Content Depth → #2 + MortgageAustin.com Threat Upgrade

### Patterns
- **Content depth on suburb pages directly caused Round Rock to appear at #2 this week**: The 2026-04-19 "Suburb editor" commit deepened the Round Rock page with first-party content. The very next Monday SERP check showed Round Rock at #2. The causal link between page depth and suburb keyword ranking is confirmed twice now (Hutto: schema + AEO → #1; Round Rock: content depth → #2). The pattern: generic suburb pages don't rank; hyper-local, first-person, neighborhood-specific pages do.
- **MortgageAustin.com must now be tracked as primary independent broker competitor**: Anthony Ferrando, same independent broker positioning, same "low overhead, no kickbacks" pitch. Now #1 for "get pre-approved austin tx" — the highest-conversion keyword for an independent broker. This is the same threat posture that Sente held for "mortgage lender austin tx" but for the conversion-intent keyword cluster. The counter is AEO structure on /mortgage-pre-approval-austin.html + a step-by-step guide blog post.
- **Nest Mortgaging (Kyle TX) revealed the content volume threshold needed for multi-keyword organic dominance**: 10+ 2026-specific posts are ranking simultaneously across 6+ keywords. They appear for "home loan austin tx" (#1), "refinance" (3 positions), "mortgage lender", "mortgage broker", "cash out refi". This is not luck — it's content velocity. Rule: to own multiple core Austin keywords organically as an independent broker, you need a minimum of 8-10 well-optimized, 2026-dated posts. Currently at approximately 5-6. The pillar page (April 24) + 2 more posts would close this gap.
- **Re-verify gate prevented 5 stale claims from entering this week's report**: Prior claims about Vista Lending (#1 for "mortgage lender austin tx"), Lone Star (#1 for "get pre-approved"), and MortgageAustin.com's broker keyword position were all outdated. The gate caught all 5 and either upgraded or cleared them. This is the gate working as designed.

---

## 2026-04-19 — CTR Title Optimization: Generic → Specific Hooks + Buda USDA Accuracy Issue

### Patterns
- **8 suburb pages had identical generic title format "Mortgage Lender [City] TX | Adam Styer | NMLS #513013"**: This format ranks (keyword-dense) but doesn't differentiate for click-through. GOALS.md flagged CTR as the week's SEO priority. The fix: rewrite titles with a specific hook after the colon — "Beat Builder Rates", "Same-Day Pre-Approval", "FHA & VA Expert", "TXST Area Expert", etc. These hooks match specific user intents within the category keyword. This is the same pattern that's already working on Round Rock, Cedar Park, Georgetown, and FHA pages.
- **Meta description first-person + neighborhood-specific copy outperforms generic brand copy**: Compare old Leander meta "Leander TX mortgage lender Adam Styer — home loans, pre-approval, and refinancing for Leander homebuyers. Independent broker, 40+ lenders, NMLS #513013." vs new "Leander: Crystal Falls, Travisso, Mason Hills — new builds where I beat preferred-builder rates most weeks. 40+ lenders, same-day pre-approval. NMLS #513013." The new version gives the searcher a reason to click. The neighborhoods are local signal. The claim ("I beat those rates most weeks") is specific and credible.
- **Buda page contains USDA claims that conflict with Adam's actual product offering**: buda-mortgage-lender.html line 7 (meta description), line 35 (LocalBusiness schema description), lines 98-101 (FAQ "Are USDA loans available in Buda TX?"), and line 125 (down payment comparison answer) all mention USDA as something Adam offers. The voice guide says Adam "Does NOT do: USDA loans." Do NOT fix this without Adam's explicit confirmation — it's a product-offering question. Flag it and leave the file unchanged until confirmed.

---

## 2026-04-18b — Sitemap Gap: 5 Suburb Pages Never Added + H2 Class Attribute Grep Trap

### Patterns
- **5 suburb pages (taylor, smithville, elgin, florence, jarrell) were never added to sitemap.xml**: The March 26 sitemap batch added 15 pages but missed these 5. These pages have been live and fully optimized since March/April 2026 but are invisible to Google's structured sitemap signal. Root cause: the "DONE" note for the March 26 sitemap update was written against the batch count (15) without auditing what was still missing. Rule: after any sitemap update, diff the actual file URLs against the full list of live suburb pages. Quick check: `grep "mortgage-lender" sitemap.xml | wc -l` should match `ls *-mortgage-lender.html | wc -l`.
- **`grep "<h2>"` misses H2 tags with class attributes**: Simple `<h2>` grep catches only bare H2 tags. Tags like `<h2 class="text-center">` and `<h2 class="text-center mb-3xl">` are invisible to this pattern. Always use `grep "<h2"` (no closing angle bracket) to catch all H2 variants. This is especially important for this codebase where section-header H2s often have `text-center` or `mb-3xl` classes.
- **Second-run same-day pattern applied correctly**: latest.md showed today's date (2026-04-18), so the run skipped NotebookLM and rotation steps and went directly to TOMORROW_PRIORITY items. Worked as intended — no duplicate work, maximum throughput.

---

## 2026-04-18 — DSCR Loan Page Missed Prior CTA Sweeps + about.html CID Was Already Fixed

### Patterns
- **DSCR page (dscr-loan-austin-tx.html) was missed in ALL prior CTA sweep rounds**: The March 31 suburb batch fix, April 1 loan page fix, and subsequent audits all targeted `*-mortgage-lender.html` and `/loans/*.html` files. The DSCR page sits at the root level with a different naming convention — it falls through every glob pattern. Rule: after any batch CTA sweep, explicitly grep ALL html files in the root for `mslp.my1003app.com` count > 1. The body CTA and hero CTA had never been fixed.
- **about.html sameAs CID "placeholder" was already resolved on 2026-04-15**: The recurring issue had been carried forward for 11+ runs after it was actually fixed. Live grep showed `cid=ChIJYy5uEFPKRIYRmF-k_5gPk74` — real CID, not placeholder. This is the clearest example of the stale FLAG_FOR_ADAM anti-pattern: the TODO.md entry (`2026-04-15`) explicitly logged the fix, but the recurring issue list kept surfacing it. Rule: before logging a "recurring issue," check TODO.md for a completed fix entry. If it exists, mark resolved.
- **Westlake suburb page body + footer CTAs were both still pointing to raw app URL**: The March 31 batch fix used a `btn-lg` class grep to catch body CTAs. Westlake's body CTA uses `btn btn-primary` (no `btn-lg`), and its footer Apply Now is inside a `<li>` without any button class. Both are invisible to class-based grep patterns. Confirmed rule: always grep for the raw domain URL itself, not by class name, when auditing CTAs.

---

## 2026-04-17 — Footer Awards Section Is a Separate Drift Vector + NotebookLM Staleness Pattern

### Patterns
- **Footer "Awards & Recognition" section is a separate brand drift vector from the hero trust bar**: The Buda page hero trust bar was correct (updated April 16) but the footer Awards section still had the old content ("Top Producing Broker — Austin 2023", "1,000+ Loans Closed"). These two sections are independent — fixing the hero trust bar does NOT update the footer. When auditing trust bar consistency, always check BOTH the hero section AND the footer Awards section. The standard for the footer: "5.0 ★ Google Rating · 136+ Reviews", "21-Day Avg. Close", "Licensed in Texas · NMLS #513013".
- **"Additional Documents — X" H2s in the document checklist are a non-question label format**: These section headers describe what the section contains (label) instead of asking the user's question. The AEO-correct format is "What Documents Do X Borrowers Need?" — which matches the conversational query someone would type or speak. The original content H2s ("What Documents Do W-2 Employees Need?") were already correct; only the supplemental type-specific sections had the old pattern.
- **NotebookLM is running 2-3 weeks behind actual site state by April 2026**: Recommendations today included homepage H1 rewrite (done March 26) and hero CTA fix (done April 16). The notebook sources are not being refreshed often enough. Action: after any major content milestone, push updated CONTEXT.md + most recent 3 run logs to NotebookLM as sources. Until then, treat NotebookLM output as directional context, not task direction.

---

## 2026-04-16 — Buda Old-Template CTA Gap + Wednesday H2 Rotation Complete

### Patterns
- **Buda uses the older `city-hero` / `quick-quote-form` template, not the standard glass-card hero**: The March 31 batch CTA sweep targeted `*-mortgage-lender.html` files using the standard `hero-cta-primary` and `btn-lg` class patterns. Buda's older template uses a `<div class="quick-quote-form">` form with a submit button (not a standalone CTA button) — and its body CTA section used class `btn btn-primary` (no `hero-cta-primary`). Both the body CTA and footer Apply Now survived the sweep undetected until today. **Rule: always grep for the raw domain URL (`mslp.my1003app.com`) across ALL suburb pages after any batch CTA fix — not just by class name.**
- **Wednesday suburb H2 question-format rotation is now complete for all 7 checked cities**: Round Rock ✅ (Apr 14), Cedar Park ✅ (Apr 15), Leander ✅ (Apr 15), Georgetown ✅ (Apr 15b), Pflugerville ✅ (Apr 15b), Kyle ✅ (Apr 16), Buda ✅ (Apr 16). Remaining suburb pages not yet audited for H2 format: San Marcos, Westlake, Dripping Springs, Hutto, Liberty Hill, Manor, Lakeway, Bee Cave, New Braunfels, Taylor, Bastrop, Spicewood, Smithville, Elgin, Jarrell, Florence, Marble Falls, Austin-area hub.
- **NotebookLM may return stale recommendations weeks after fixes are applied**: Today's query recommended fixing the homepage H1 (done March 26) and Hutto schema to 91 reviews (schema already at 136). The query DID correctly flag the homepage hero CTA issue (still open as of today's run). Pattern: use NotebookLM for directional insight, always verify claimed issues against actual file state before acting. Stale recommendations are easy to filter once you read the file.
- **Homepage hero CTA raw app URL persisted as a LOW blocker for 3+ weeks after suburb pages were fixed**: The March 31 batch fix was scoped to `*-mortgage-lender.html` files. The homepage was out of scope. DECISION TEST confirmed it was safe to fix (reversible, no judgment call needed, same fix as 24 suburb pages). Fixed today. **Rule: after any sitewide batch fix, explicitly check the homepage and loan pages for the same pattern — they're not covered by `*-mortgage-lender.html` globs.**

---

## 2026-04-15 — TEA Rating Language Update + Hutto Schema Already Correct

### Patterns
- **Texas TEA "Exemplary/Recognized" is definitively outdated — use "A-rated"**: Cedar Park's page used "Exemplary" (old system) and "consistently rated among the top" (generic). Fixed to "A-rated by the Texas Education Agency." This applies to any suburb page that references school quality. Scan for "Exemplary" and "Recognized" in all suburb pages and replace with "A-rated" or "highly-rated."
- **Before acting on NotebookLM schema recommendations, verify the schema first**: NotebookLM recommended updating Hutto's AggregateRating to 91 reviews. A quick grep showed it already reads "136" — the notebook's reference to "91" was Google-only reviews, but combined (91 Google + 45 Zillow = 136) is already in the schema. Always grep the actual file before making schema changes based on AI recommendations.
- **Leander H2s were not yet in question format despite at-a-glance block being present**: A page can have a rich at-a-glance block (from a prior session) and still have informational-label H2s. These are two separate AEO improvements. The Wednesday rotation should now check both independently.

---

## 2026-04-14 — H2 Question Format as AEO Structure + City At-a-Glance Pattern for Tier-1 Suburb Pages

### Patterns
- **H2s in question format ("Why Should X?" vs "Why X") are a structural AEO signal**: AI crawlers and AI Overviews extract Q&A patterns from heading structure. Converting content H2s from informational labels ("Loan Options for Round Rock Buyers") to searchable questions ("What Loan Programs Are Available for Round Rock TX Homebuyers?") aligns with how AI systems parse page content for citation. Confirmed as a priority via NotebookLM.
- **Tier-1 suburb pages (Round Rock, Cedar Park, Leander, Georgetown) were missing explicit city at-a-glance blocks despite having natural local content**: The content within body paragraphs doesn't carry the same local signal density as a structured `<p><strong>City at a glance:</strong> [facts]</p>` block. These blocks should include: county context (Williamson vs Travis tax rate), school district name + top high school names, 3-4 major employers, 5+ neighborhood names. Round Rock added 2026-04-14.
- **Wednesday suburb rotation prioritization**: Within the Wednesday rotation, tier-1 cities (Round Rock, Cedar Park, Leander, Georgetown, Pflugerville) should be prioritized over tier-2 (Kyle, Buda, San Marcos) for H2 question format audits and at-a-glance enrichment.
- **"TEA Exemplary" is outdated rating language**: Texas TEA now uses A-F ratings, not the old Exemplary/Recognized/Acceptable system. When describing school quality, use "highly-rated" or "A-rated" not "Exemplary."

---

## 2026-04-13 — First Suburb Ranking + Competitor Review Gap Strategy

### Patterns
- **First top-10 ranking achieved via suburb pages, not core Austin keywords**: "hutto tx mortgage lender" → #3 in Week 6. Core Austin keywords remain at 0/7. Suburb-first SEO is the correct sequence: get indexed, rank locally, then leverage suburb authority to climb core terms.
- **Review count in schema is a direct ranking lever vs. competitors**: Big Life's Hutto page shows only 25 reviews in AggregateRating schema despite being #1. Our 91+ reviews — if properly surfaced in schema — is a significant algorithmic advantage. Schema review count ≠ actual review count if schema is stale or misconfigured.
- **Physical branch presence makes map pack unwinnable for competitors without local address**: Guild Mortgage's Liberty Hill branch (#1 and #2 for "liberty hill tx mortgage lender") demonstrates why independent brokers cannot target map pack for suburbs where competitors have a physical location. Organic-only targeting is the correct strategy in those cases.
- **Templated competitor pages are beatable with hyper-local content**: Big Life's Hutto page has no Hutto neighborhood names, no Hays County specifics, no school district reference. A page with Star Ranch, Brushy Creek, Cottonwood Creek, HISD, Williamson County context will outperform a template page — even if the template is currently ranking higher.
- **Rising content competitors should be tracked by blog post URL, not just domain**: MortgageAustin.com gained visibility via a specific blog post ("mortgage broker vs bank austin"). Tracking competitor domains is insufficient — track their individual ranking pages so you know what content to outcompete.

---

## 2026-04-12 — Blog Post AEO Anti-Pattern: Styled Header Paragraphs + DSCR BreadcrumbList

### Patterns
- **Styled header paragraphs (`<p style="border-left:...">` or `<p class="blog-post-intro">` inside `<header>`) do NOT satisfy AEO requirements**: The condo post had answer-first text inside a styled `<header>` section. AI crawlers extract `<article>` body paragraphs. The fix is always to add a plain `<p><strong>...</strong></p>` as the FIRST element inside `<div class="article-body">` — after `</header>`. Two posts had this gap (condo + choose-lender).
- **DSCR page was missing BreadcrumbList JSON-LD despite having a visual breadcrumb**: The visual `<ol class="breadcrumb-list">` in HTML is NOT the same as `@type: BreadcrumbList` JSON-LD schema. Rich Results Test and Google both require the JSON-LD version for breadcrumb SERP display. Always add both: visual HTML + JSON-LD block in `<head>`.
- **Monday schema audit should grep for JSON-LD BreadcrumbList separately from visual breadcrumbs**: Use `grep -n '"@type": "BreadcrumbList"'` not just `grep breadcrumb` — the latter catches the visual HTML and gives a false positive.
- **codex branch isolation pattern**: When daily-opt commits land on a non-main branch, use `git checkout <branch> -- <files>` to selectively bring only the session's changed files to main. Do NOT merge or cherry-pick when the branch also contains Adam's unreviewed work.

---

## 2026-04-11 — AEO Applies to Loan Type Pages Too + Second-Run Backlog Pattern

### Patterns
- **Loan type pages need AEO answer-first paragraphs, not just blog posts**: construction.html opened directly with an H2 ("How Construction Loans Work") with no extractable opening paragraph. The AEO requirement applies to all pages that should appear in AI Overviews — loan pages are high-intent targets. Fix: insert `<p><strong>[40-60 word direct answer]</strong></p>` as the first element in the main content section, before any H2.
- **Second-run on the same day: go straight to backlog**: When latest.md shows today's date, skip re-doing the rotation and go directly to the SEO/SEM backlog for the next available LOW_RISK or ZERO_RISK item. Don't repeat work already logged this morning.
- **Construction pages benefit from named local builders**: Using real Austin-area builder names (Lennar, David Weekley, Milestone Community Builders, Scott Felder) in the process walkthrough adds local relevance signal and is more credible to readers than generic "production builder" language. Verify builder names are accurate before publishing.

---

## 2026-04-10 — Suburb Pages ARE Indexed + Stale FLAG_FOR_ADAM Rule

### Patterns
- **Suburb pages are indexed — confirmed 2026-04-10**: Leander shows "URL is on Google" with HTTPS + Breadcrumbs + FAQ all green in GSC. The "week 5 emergency" was resolved by the sitemap fix (March 26). The agent kept carrying forward the GSC URL Inspection flag for 2+ weeks without re-verifying. **Rule: before adding any flag to FLAG_FOR_ADAM, grep the run-logs for the same flag. If it's been there 3+ runs with no evidence it's still unresolved, verify the current state before flagging again.**
- **"Stale flag" pattern**: A concern that was real at one point (pages unindexed, March–early April) became false after the fix. Adam had to correct this manually. The agent should never carry forward a FLAG_FOR_ADAM item beyond 2 runs without re-verifying it's still valid.

---

## 2026-04-10 — blog-post-intro Class Is an AEO Anti-Pattern

### Patterns
- **`<p class="blog-post-intro">` inside `<header>` is not a machine-extractable AEO paragraph**: The document checklist post had the answer-first text wrapped in `blog-post-intro` inside a `<header>` element. Like `hero-subtitle`, this is a styled UI class — AI crawlers extract `<article>` body paragraphs, not header-section elements. Fix: add a plain `<p><strong>...</strong></p>` directly in the article body after `</header>`. The styled class can remain for visual design; the body paragraph is what gets extracted.
- **City enrichment via "at a glance" check: grep for "at a glance" not just "commute"**: Some pages mention commute casually in prose without having the structured "City at a glance:" paragraph. After today: New Braunfels (0→✅) and Lakeway (0→✅) confirmed done. Florence and Marble Falls show 2-3 markers each — likely done. Liberty Hill and Elgin remain.
- **City enrichment order of value**: Prioritize by search volume — New Braunfels (large city, high search volume) and Lakeway (high-value jumbo market) were higher-priority than smaller Hill Country cities. When choosing next enrichment cities, pick higher-traffic markets first.

---

## 2026-04-08b — AEO Batch: Elgin, Florence, Jarrell, Marble Falls + Funnel Audit

### Patterns
- **Pages missing a content-narrow section need one created, not just a `<p>` injected**: Elgin, Florence, Jarrell, and Marble Falls had no `<section><div class="container content-narrow">` block after the hero — only the feature grid and process steps. The AEO answer-first paragraph requires its own content-narrow section inserted between the hero `</section>` and the "Why [City]" feature grid. Pattern: insert `<section><div class="container content-narrow"><p><strong>...</strong></p></div></section>` targeting the `<!-- Why [City] -->` comment as anchor.
- **AEO coverage is now 11/25 suburb pages confirmed**: Cedar Park, New Braunfels, Bastrop, Bee Cave, Hutto, Elgin, Florence, Jarrell, Marble Falls (added this run), Spicewood, Liberty Hill, Lakeway (pre-existing). Remaining ~13 pages to audit: San Marcos, Georgetown, Round Rock, Leander, Pflugerville, Kyle, Buda, Dripping Springs, Taylor, Manor, Westlake, Smithville, Austin-area.
- **Second-run pattern confirmed again**: When TOMORROW_PRIORITY says "Thursday" but today is Tuesday, execute the TOMORROW_PRIORITY items rather than repeating the current-day rotation. The PM interactive session already completed Tuesday work; the morning scheduled run should advance to the next priority.
- **Funnel is clean end-to-end**: Homepage→/get-preapproved (3 links), /get-preapproved→/thank-you (action attr), thank-you has Calendly + phone. contact.html has Netlify form + dataLayer event. Only gap is about.html + dscr CTAs pointing to raw app URL (LOW, known, carry forward).

---

## 2026-04-08 — AEO Answer-First Batch: Cedar Park, New Braunfels, Bastrop, Bee Cave

### Patterns
- **Four suburb pages were missing AEO answer-first paragraphs despite having other schema complete**: Cedar Park, New Braunfels, Bastrop, and Bee Cave all had LocalBusiness + FAQPage + BreadcrumbList schema, city-specific H1, internal links — but the first `<p>` in the main content section was still narrative, not a machine-extractable answer. Schema is not the same as AEO content structure.
- **"At a glance" `<strong>` blocks are not AEO answer-first paragraphs**: Bastrop and Bee Cave had `<strong>Bastrop at a glance:</strong>` city enrichment paragraphs from prior runs. These are mid-section factual blocks, not opening answer-first paragraphs. The AEO requirement is specifically the *first* paragraph of the main content section, answering the page's primary query (e.g., "How do I get a mortgage in [City]?").
- **Batch AEO is efficient when done by city cluster**: Four pages updated in one run. Future runs can continue the rotation: Spicewood, Florence, Jarrell, Marble Falls, Liberty Hill, Lakeway, Elgin — check each for missing answer-first paragraph before first H2.
- **Chrome not running in scheduled context**: Control Chrome MCP tools require Chrome to be open. Scheduled runs cannot perform live conversion tracking verification. Carry forward from last manual verification — flag if more than 3 days without a live check.

---

## 2026-04-07 — Person Schema Was Added to Homepage (Learnings Stale) + LocalBusiness Gap on About Page

### Patterns
- **Learnings.md schema entry was stale**: The 2026-04-06 entry noted "No Person schema on homepage." By 2026-04-07, Person schema (Block 3) was present. Monday schema audits should always verify live via grep, not rely on prior run notes. If a schema block exists and the type matches, mark it clean.
- **About page was the real schema gap**: Homepage had MortgageBroker + FAQPage + Person. About page had only Person — no LocalBusiness. The fix (a minimal LocalBusiness block with address, phone, aggregateRating) took one Edit call. Note: sameAs CID is a placeholder until Adam provides the real Google Maps CID.
- **Monday schema audit order matters**: Check homepage first (most important for AEO), then DSCR (FAQPage verification), then one rotating suburb. Track which suburb was last checked in TOMORROW_PRIORITY.
- **NotebookLM Google Ads query (Monday-only) returned successfully on sync call after background call failed**: Background process exits 127 (not found) sometimes due to path issues in scheduled context. Always have a sync fallback.

---

## 2026-04-06 — AEO Hero-Subtitle vs. Body Paragraph + Blog Title Drift at 10 Instances

### Patterns
- **Hero-subtitle class is NOT the same as an AEO body paragraph**: Suburb pages like Liberty Hill had answer-first text in `<p class="hero-subtitle">` in the hero section, but AI crawlers extract body content paragraphs, not hero UI elements. The Monday AEO audit now explicitly checks for a `<strong>` paragraph in the main content section (after `<!-- WHY [CITY] -->` comment, before first H2). A clean hero-subtitle does NOT satisfy the AEO requirement.
- **Blog title drift has now reached 10 confirmed instances — this is a systemic process failure**: The blog post creation template has never been corrected at the source despite 10+ fixes after-the-fact. The correct pre-publish lint command is: `grep "<title>" blog/YYYY-MM-DD-*.html | grep -v "Adam Styer"` — any hit = broken title. Until the template is fixed, run this grep at the start of every run against ALL blog/*.html files to catch same-day posts.
- **Homepage schema has two gaps worth tracking**: (1) No Person schema on homepage — only MortgageBroker/LocalBusiness + FAQPage. (2) No LocalBusiness schema on about page — only Person. Monday schema audit should flag if either of these diverges further. Adding Person schema to the homepage is a 1-block JSON-LD addition and would satisfy the "both pages have both schemas" target.
- **NotebookLM has timed out on two consecutive scheduled runs (Apr 5 + Apr 6)**: The cached insights are sufficient for daily decision-making but the timeout pattern suggests either network latency or library issues. When timed out, always log the cached NOTEBOOK_INSIGHTS block verbatim from the prior run so the next run inherits them.

---

## 2026-04-06 — Sente Mortgage Is the New Review Benchmark + Dripping Springs Wide Open

### Patterns
- **Sente Mortgage (1,448+ reviews) displaced Barton Creek Lending (506) as the Austin review leader**: They jumped to #1 for "mortgage lender austin tx" from nowhere. Review volume at this scale creates self-reinforcing authority — Google rewards review signals in local/YMYL verticals. The benchmark for competitive review count is now 3x higher than previously assessed.
- **Lone Star Financing is surging across multiple keywords simultaneously**: Appeared in top 3 for "mortgage broker" (#3), "home loan" (#2), and "refinance" (#2) — all keywords where they were absent last week. This pattern (multi-keyword jump in one week) suggests either a site-wide authority boost (new backlinks, domain age threshold) or coordinated on-page optimization. Monitor for new content or backlink activity.
- **Dripping Springs is the widest-open suburb keyword found in 5 weeks**: Zero dedicated mortgage lender pages in results — only individual LOs at banks and a realtor recommendation page. Compare to Buda (Big Life has a page), San Marcos (3 dedicated pages), or Westlake Hills (Quantum Loans). If our Dripping Springs page gets indexed first, it has the highest probability of any suburb keyword to rank immediately.
- **Suburb indexing at 5 weeks with 0 pages is now a confirmed technical emergency, not a patience issue**: Standard indexing for new pages on an established domain is 1-3 weeks. 5 weeks with zero suburb pages indexed — despite sitemap fix (commit 9313067, ~March 26) — suggests either (a) internal linking is too weak for Googlebot to discover and prioritize these URLs, (b) crawl budget is exhausted on higher-priority pages, or (c) there's a technical blocker (noindex, robots.txt, canonical issues). Must audit all three.

---

## 2026-04-05b — Suburb Hero CTA Class Was Missed in All Batch Fixes

### Patterns
- **`hero-cta-primary` is a distinct class from body CTAs and footer Apply Now links**: The 2026-03-31 batch fix (and prior manual fixes) targeted body CTAs with `btn-lg` class and footer `<li>Apply Now</li>` links, but completely missed the hero section's primary CTA button which uses class `hero-cta-primary hero-cta-btn`. This was live on 16 suburb pages until today (Apr 5). **Rule: when auditing CTAs, always grep separately for `hero-cta-primary`, `btn-lg`, `nav-cta`, and footer Apply Now — these are four distinct placement categories.**
- **The hero CTA suppresses Google Ads conversion tracking differently than body CTAs**: Body CTAs going to raw app URL skip the `generate_lead` event. The hero CTA going to raw app URL does the same — but the hero CTA is likely the highest-intent click on the page (above the fold, primary position). Fixing the hero CTA matters more per-click than body CTA fixes.
- **Verify grep patterns exhaustively before declaring a batch fix complete**: After any batch CTA sweep, run: (1) `grep -l 'mslp.my1003app' *-mortgage-lender.html` for any remaining raw URL, (2) check count per file — nav-cta (1) + hero-cta-primary (1) = 2 intentional raw URLs max per suburb page (nav is intentional, hero is now /get-preapproved). Zero remaining after today's fix.

---

## 2026-04-05 — AEO Answer-First on Suburb Pages + Blog Title Drift Persists

### Patterns
- **AEO answer-first applies to suburb pages too, not just blog posts**: The pattern (`<p><strong>[40–60 word direct answer]</strong> [1 context sentence]</p>`) was previously applied only to blog posts. Suburb pages open with narrative ("Hutto is one of the fastest-growing cities in Texas...") which AI crawlers skip. The answer-first paragraph should be the very first `<p>` inside the main content section, before the intro H2. Applied to Hutto today.
- **Blog title brand drift is now 9+ instances — it's the creation template, not operator error**: Three more posts (self-employed, housing market, spring market) were missing "Adam Styer |" in the `<title>` tag despite prior fixes. No post created outside a daily-opt run has ever had the correct format on first publish. The only reliable fix is a creation-time grep lint check.
- **In-body calculators link pattern**: Insert inline in the "Home Prices in [City]" paragraph as: "Use our [mortgage calculator](/calculators.html) to estimate your monthly payment at current rates for any [City] price point." Natural placement, adds value, no content disruption.

---

## 2026-04-04b — AEO: Blockquote + Bold = Best of Both Worlds

### Patterns
- **Combining blockquote-style + `<strong>` is the optimal AEO pattern**: The condo post had a properly-styled intro (border-left, 49 words, directly answers the title query) but was missing `<strong>` bold wrapping. Adding `<strong>` costs nothing visually — the border-left styling dominates — but sends an explicit semantic signal to AI crawlers. Rule: every blog post intro should have BOTH a visual pull-quote style AND `<strong>` wrapping on the direct-answer portion.
- **NotebookLM source refresh latency is real**: styermortgage-context.md was added as a source on April 4 morning, but the April 4 afternoon query still returned stale recommendations (H1 fix, GSC submission — both done weeks ago). Sources take more than one run to propagate into recommendations. Don't conclude that a refresh failed just because one query still returns old advice — check again in 2-3 runs.
- **Second-run pattern**: When the same day triggers two runs (e.g., manual trigger + scheduled), check latest.md first — if the major priority items are already done, focus on any outstanding TOMORROW_PRIORITY items rather than re-doing work.

---

## 2026-04-04 — "Serving" H1 Inventory Correction + AEO Applied to 2 Posts

### Patterns
- **Context file "Serving" H1 list was stale in both directions**: bastrop + bee-cave were listed as needing fixes but were already clean; taylor + new-braunfels were NOT listed but had "Serving" H1. After today's batch fix, zero suburb pages have the "Serving" anti-pattern. **Rule: always grep `Mortgage Lender Serving` across all suburb pages rather than relying on the context's list.**
- **Blog post title brand drift is now confirmed at 7+ instances**: The April 4 post was published with no brand in the title. This is not a one-off error — it's the blog post creation template. Until the template is fixed, grep every new post immediately: `grep "<title>" blog/YYYY-MM-DD-*.html | grep -v "Adam Styer"`.
- **AEO answer-first paragraph applied to spring market + April 4 market report**: Both posts now open with a 50-60 word bolded direct answer before the first H2/narrative. Pattern confirmed effective — apply to any new post at time of creation.
- **NotebookLM source deletion doesn't support --json flag**: `notebooklm source delete <id> --yes` works; `--yes --json` errors. Deletion itself succeeds.

---

## 2026-04-03b — AEO Answer-First Pattern Applied + San Marcos 3-Fix

### Patterns
- **Answer-first paragraph template**: Add a bolded 40-60 word direct answer as the FIRST paragraph of every blog post, before any narrative. Format: `<p><strong>[Direct answer to the title's implied question, 1-2 sentences.]</strong> [1 sentence of context/nuance.]</p>`. This is the extractable anchor for AI Overviews — narrative openers are skipped.
- **Question-format H2 conversion pattern**: Statement H2s ("What Lenders Actually Look At") → question H2s ("What Do Lenders Look At for Self-Employed Borrowers?"). Conversion increases AI citation likelihood and matches conversational search queries. Apply to all new posts going forward; retrofit in rotation.
- **Blog title tag brand drift is confirmed systemic**: April 2 (self-employed) and April 1 (spring market) posts both published missing "Adam Styer |" or "NMLS #513013". This is the 6th+ instance. The post creation template is the root cause — not a one-time error. Any new post must be grepped immediately: `grep "<title>" blog/YYYY-MM-DD-*.html | grep -v "Adam Styer"`.
- **San Marcos 3-fix pattern complete**: H1 "Serving" removal + hero CTA → /get-preapproved + /calculators body link. Same 3-fix pattern should be applied to remaining 6 suburbs: bastrop, bee-cave, hutto, lakeway, liberty-hill, manor.

---

## 2026-04-03 — Sitemap Never Submitted — 4-Week Indexing Gap

### Patterns
- **Sitemap must be verified in GSC on day one of any new site**: styermortgage.com had 24 suburb pages live and fully optimized for 4+ weeks before any were indexed, because sitemap.xml was never submitted to GSC. All SEO work during that period was real but produced zero ranking signal until today (Apr 3). GSC "Submitted sitemaps" showing 0–0 of 0 is an immediate red flag — check this the first run of any new site.
- **Monday rotation must include GSC sitemap status check**: Add to Monday checklist — verify sitemap.xml is submitted and returning Success in GSC. If status is "Couldn't fetch" or missing, fix before any other work.
- **Page quality work was not wasted — just delayed**: All schema, H1 fixes, CTAs, FAQPage markup is intact and will matter once indexing completes. The 4-week gap delayed the ranking clock, not the work itself.

---

## 2026-04-03 — AEO Blog Audit + Dripping Springs Suburb Fix

### Patterns
- **Blog posts lack answer-first intros for AI extraction**: Both audited posts (self-employed, spring market) open with storytelling/context instead of a direct 40-60 word answer to the primary query. AI Overviews and SGE extract the first clear, direct answer on a page — narrative openers get skipped. Rule: every blog post intro should open with 1-2 sentences that directly answer the title's implicit question, then expand.
- **H2s as statements vs. questions**: Post H2s like "What Lenders Actually Look At" and "The Problem With Writing Everything Off" are informative but not in the question format that AI engines use to match conversational queries. Reformatting as "What Do Lenders Look At for Self-Employed Borrowers?" increases AI citation likelihood. Apply to new posts going forward.
- **NotebookLM source refresh cadence**: After 3 consecutive runs recommending already-fixed items (H1 keyword, trust bar), the notebook sources are confirmed stale. Sources should be refreshed after major site changes complete — add updated context.md + recent run logs. Refresh frequency: monthly or post-major-milestone.
- **Dripping Springs suburb fixes now follow established pattern**: All three suburb improvements (H1 "Serving" removal, hero CTA → /get-preapproved, /calculators body link) were applied in one run. Same 3-fix pattern should be applied to remaining 7 suburbs.

---

## 2026-04-02b — Resource Page CTA Audit Complete + Netlify 503

### Patterns
- **Resource pages with raw nav CTAs are acceptable**: improve-credit-score.html and fixed-vs-adjustable.html only have raw loan app URL in the `nav-cta` anchor (standard site-wide nav pattern). Only body CTAs (`.btn.btn-primary` in article or section content) need to be converted to /get-preapproved. Nav CTAs are deliberate — they send high-intent readers directly to the 1003.
- **mortgage-pre-approval-austin.html is a borderline case**: This article specifically explains how to complete the 1003 application and has 5 body CTAs linking to the raw URL in instructional context ("Start here"). Unlike other resource pages, these links are embedded in instructional copy about the application itself. Decision deferred to Adam.
- **Netlify 503 pattern**: After push, site returned 503 for 2.5+ minutes on all pages including homepage. This may be a build failure OR a Netlify platform outage. Cannot diagnose from CLI — must check Netlify dashboard. If 503 persists >5 min after push, escalate to FLAG_FOR_ADAM immediately.
- **NotebookLM sources go stale**: The notebook still referenced "Your Austin Home Loan Simplified" H1 (fixed March 26) as an open issue. Sources should be refreshed monthly or when major site changes complete. Use `notebooklm source add` to push updated context docs.

---

## 2026-04-02 — Raw App URL Still Present on Resource Pages + Batch Fix Gaps

### Patterns
- **Batch CTA sweep (2026-03-31) missed non-suburb pages**: The suburb CTA batch fix caught all 24 suburb pages but did not audit resource/guide pages. The first-time-buyer-guide final CTA and Cedar Park hero CTA were still pointing to the raw loan app URL today. Rule: after any batch fix, explicitly audit the adjacent page categories (loan pages, resource pages, guide pages) for the same pattern — not just the target category.
- **Cedar Park hero "Apply Now" survived two batch fix rounds**: Cedar Park was included in the 2026-03-31 suburb batch fix AND the 2026-04-01 loan page fix, but neither caught this hero CTA. The hero CTA used the same class and URL as other suburb pages. Root cause: sed patterns in the batch fix may have been run with wrong file glob. When verifying batch fixes, grep each file individually rather than trusting the batch count.
- **Thursday funnel trace is a fast health check**: The full funnel (homepage → /get-preapproved → /thank-you) can be verified in <2 min via grep. contact.html, thank-you.html, and the three ad landing pages are all clean. This check is low-friction and should stay in Thursday rotation.

---

## 2026-04-01b — Suburb H1 "Serving" Pattern + 24-Page Count Correction

### Patterns
- **"Mortgage Lender Serving [City], TX" is a systemic H1 anti-pattern**: 12+ suburb pages use "Serving" in their H1 while the title tag says "Mortgage Lender [City] TX" (no "Serving"). This creates a title-H1 mismatch that dilutes keyword density and breaks message match. Fix in rotation: one page per run, drop "Serving" from H1. First fixed: Round Rock.
- **Suburb page count is 24, not 9**: Context file listed only 9 suburb pages (the original Tier 1 cities). The repo actually has 24: bastrop, bee-cave, buda, cedar-park, dripping-springs, elgin, florence, georgetown, hutto, jarrell, kyle, lakeway, leander, liberty-hill, manor, marble-falls, new-braunfels, pflugerville, round-rock, san-marcos, smithville, spicewood, taylor, westlake. ALL 24 need GSC URL submission, not just 9. Context file suburb inventory needs updating.
- **In-body calculators link is absent from all suburb pages (nav-only)**: Suburb pages link to /calculators only via site navigation. The task checklist requires both /get-preapproved AND /calculators as in-body links. A natural insertion point is the "Home Prices in [City]" section — "Use our mortgage calculator to estimate your monthly payment at current rates for any [City] price point." Apply this pattern to each suburb page as you rotate through them.

---

## 2026-04-01 — Context File Staleness + Loan Page CTA Pattern

### Patterns
- **Context file "FIXED" entries cannot be trusted without file verification**: Two items marked "✅ FIXED" in `styermortgage-context.md` (loans/conventional + fha hero CTAs, thank-you 3-step section) were NOT present in the actual files. Root cause unknown — likely a session that logged the fix before confirming, or a subsequent session overwrote the file. **Rule: always grep the actual file before assuming context is accurate.**
- **All 8 loan pages had hero CTAs pointing to raw app URL**: The pattern was consistent — `class="btn btn-primary hero-cta-primary hero-cta-btn" target="_blank" rel="noopener">Apply Now` → raw loan app. Only conventional + fha were ever supposed to be fixed (2026-03-24) but weren't. When fixing one loan page, audit all remaining pages for the same pattern immediately.
- **Refinance page hero CTA should go to /refinance-quote, not /get-preapproved**: When batch-fixing loan page CTAs, make an exception for the refinance page — its conversion funnel is /refinance-quote. All other loan pages → /get-preapproved.
- **TCPA suburb forms appeared in context as open but were already present**: All 24 suburb pages already had TCPA checkbox before today's run. The TOMORROW_PRIORITY note was stale. Pattern: verify file state before doing work, not after.

---

## 2026-03-31b — Suburb CTA Sweep: All 24 Pages Fixed in One Batch

### Patterns
- **The raw loan app URL pattern was sitewide, not page-by-page**: After fixing Round Rock (2026-03-31) and Cedar Park + Leander + Georgetown individually, a count-based audit revealed 18+ remaining suburb pages still had body CTAs pointing to raw loan app URL. Batching the fix via `sed` across all `*-mortgage-lender.html` files took 2 minutes vs. the 24 days it would have taken at one page per day.
- **Two URL variants existed**: Most pages used the `?time=1767737197980` version; 6 newer suburb pages (elgin, florence, etc.) used the base URL without timestamp. Both required a separate sed pattern — always check for both variants when doing batch URL replacements.
- **Footer "Apply Now" links also bypass conversion tracking**: 6 suburb pages had an `<a>Apply Now</a>` inside a `<li>` in the footer contact section. These were missed by the body CTA sweep because they didn't have `btn-lg` class. Lesson: grep for the full domain URL, then audit by context — not just by class name.
- **Instance count after batch fix = 2 is the clean baseline**: nav "Apply Now" (class=nav-cta) + hero "Apply Now" (class=hero-cta-primary) are intentional. Any suburb page with count > 2 after the fix has a remaining issue.
- **Suburb hero quick-forms missing TCPA checkbox**: TCPA was added to /get-preapproved and /refinance-quote in 2026-03-24 but suburb pages were not updated. Discovered on Cedar Park today. Likely affects all 24 suburb pages — flag for tomorrow's run.

---

## 2026-03-31 — Suburb CTAs + Two-Manifest Resolution + Title Pattern Persists

### Patterns
- **Suburb pages CTAs link to raw loan app URL, bypassing conversion tracking**: Round Rock had both "Start Your Pre-Approval" and "Start Your Application" CTAs pointing to the 1003 app URL directly. This means those clicks are invisible to Google Ads and GA4 (generate_lead doesn't fire). Fixed by changing to /get-preapproved. Likely affects all 9 suburb pages — audit one per run in rotation.
- **blog.html now dynamically fetches manifest.json**: The recurring two-manifest divergence issue is RESOLVED. blog.html uses `fetch("blog/manifest.json")` — only one file needs updating when new posts are added. Going forward, only update blog/manifest.json.
- **New blog posts (created outside daily-opt runs) consistently miss "Adam Styer |" in title**: DSCR post and Rates post were both created between runs with "| NMLS #513013" instead of "| Adam Styer | NMLS #513013". This is now confirmed a template-level problem. Always grep new blog files for `NMLS #513013` without preceding "Adam Styer |" at the start of each run: `grep -l "| NMLS #513013" blog/*.html | xargs grep -L "Adam Styer | NMLS"`.
- **Temp-placeholder files persist silently**: A new 2026-03-30-temp-placeholder.html appeared with noindex + canonical to proper URL. Pattern: temp files are created during drafting, the proper-named version is deployed, but the temp file is left behind. These accumulate. Need Adam to authorize deletion policy.

---

## 2026-03-30 — Title Tag Length + Blog Manifest Pattern

### Patterns
- **Suburb page title tags can silently creep above 60-70 chars**: Westlake (99 chars) and Buda (104 chars) had rich descriptive titles that were too long for Google to display without truncation. The standard format "Mortgage Lender [City] TX | Adam Styer | NMLS #513013" is always safe. When creating suburb pages, verify title length before publishing.
- **New blog posts inherit the "missing Adam Styer |" pattern**: The March 30 post had "First-Time Buyer Programs Austin TX 2026 | NMLS #513013" — missing "Adam Styer |". This is now the 5th+ occurrence. Pattern: whoever creates new pages is likely copying from a template that omits the brand. Correct format: "[Title] | Adam Styer | NMLS #513013".
- **blog.html manifest divergence is now confirmed systemic (4 runs)**: Will not self-resolve. Either blog.html needs to fetch manifest.json dynamically, or a checklist step must be added to the post-publish workflow. Flag to Adam is escalated.
- **Temp-placeholder filenames create ongoing risk**: Two temp files remain in repo (`2026-03-06-temp-placeholder.html`, `2026-03-10-temp-placeholder.html`). The March 10 one has both a temp version and a properly-named version — duplicate content risk. The March 06 one has real content at a temp URL. These need a decision from Adam before cleanup.
- **noindex regression watch**: /get-preapproved noindex was confirmed present again today. Pattern: check this EVERY run as the first verification step, not just after changes.

---

## 2026-03-30 — Suburb Indexing Emergency + New Competitor Discovery

### Patterns
- **Suburb pages are NOT indexed after 4 weeks**: `site:styermortgage.com` returns zero results for any suburb keyword (Kyle, Pflugerville, Leander, Georgetown, Round Rock, Cedar Park). Homepage and product pages ARE indexed. Root cause: 15 pages were missing from sitemap.xml until ~March 26 fix. Even after fix, indexing takes time — but manual GSC submission is required NOW.
- **Barton Creek Lending Group has 506 reviews at 4.9 stars**: This is the largest review count found in the Austin mortgage market — 3x Highlander (~168), 2x Big Life Georgetown (~265). They currently have NO suburb-specific pages, but their domain authority and social proof make them a latent threat for any keyword they target.
- **Joel Richardson/FCM is actively rising**: Gained positions on multiple keywords simultaneously — now #4 for "mortgage lender austin tx" AND #1 for "cash out refinance austin tx" (displacing Austin Capital Mortgage). This signals active SEO investment. Needs a deep competitive analysis.
- **San Marcos is more competitive than Kyle**: 3 lenders have dedicated San Marcos pages (Capital Home Mortgage, Lone Star, Big Life) vs. Kyle where zero lenders had dedicated pages. San Marcos page must differentiate harder.
- **Westlake Hills is a luxury market**: Quantum Loans leads with jumbo/luxury emphasis. Barton Creek Lending dominates via reviews but has no dedicated page. Our Westlake page must emphasize jumbo loans, Rob Roy/Davenport Ranch, Eanes ISD. NotebookLM flagged title (96 chars → needs ≤60) and meta desc (193 chars → needs ≤155) as too long.
- **Big Life is expanding**: Added San Marcos page since last check (not present in Week 3). Their suburb rollout is accelerating — window to establish first-mover advantage is narrowing.
- **SERPs are shifting**: Multiple position changes this week — SouthStar Bank took #1 for refinance (new), CMG moved to #2 for broker, Max Leaman to #2 for home loan. More volatility than prior 3 weeks.

---

## 2026-03-29b — Noindex Regression + Title Pipe Pattern

### Patterns
- **noindex tags can silently disappear**: /get-preapproved was confirmed noindex,nofollow on 2026-03-22 but the tag was absent today. Likely caused by a file being overwritten or a new session rebuilding the page from scratch. Always grep for `noindex` on both landing pages at the start of every run, not just after changes.
- **Title tag pipe separator is a consistent failure mode**: "Adam Styer NMLS #513013" (missing pipe) appeared in 4+ blog posts and the /get-preapproved title/OG tags. The correct format is "Adam Styer | NMLS #513013". When generating new pages, always use the pipe format. Run a grep for `Adam Styer NMLS` (without pipe) monthly to catch this.
- **blog.html manifest divergence is a systemic problem**: Now missed 3 runs in a row. The two-manifest architecture (blog.html inline + blog/manifest.json) is fragile. Every new post needs both files updated. If this keeps happening, consider refactoring blog.html to dynamically fetch manifest.json instead of duplicating data inline.
- **Server-side tracking is becoming necessary in 2026**: NotebookLM flagged that standard browser-based tracking may lose 20-40% of conversion data due to ad blockers, iOS privacy changes, and cookieless browsers. Worth flagging to Adam for a future architecture decision.

---

## 2026-03-29 — Two-Manifest Problem on Blog

### Patterns
- **blog.html has its own inline manifest** separate from `blog/manifest.json`. Both must be updated when adding new posts. Prior sessions were only updating `manifest.json` — the blog listing page (`blog.html`) was missing the two newest March 28 posts entirely. Rule: any time a new blog post is added, grep for `"posts":[` in both `blog.html` AND `blog/manifest.json` and update BOTH.
- **Blog post URL drift from temp-placeholder filenames**: Surrender post was linked from blog.html as `/blog/2026-03-10-temp-placeholder.html` instead of the real slug. When a post outgrows its placeholder filename, the blog listing must be updated immediately. Watch for `temp-placeholder` in `blog.html` manifest as a red flag.
- **Title tag brand consistency**: Blog post titles should follow pattern "[Topic] | Adam Styer | NMLS #513013" — not just "| NMLS #513013". FHA post was missing "Adam Styer |". Check new posts before declaring them complete.

---

## 2026-03-28 — Sitewide Async Font Loading Fix

### Patterns
- **Async font fix must be applied to ALL pages, not just landing pages**: When fixing render-blocking Google Fonts on landing pages, always grep for remaining `rel="stylesheet"` font loads across the full repo. Found 90 pages still had sync loading even after landing pages were fixed. The one-line pattern change (preload + noscript fallback) is safe to batch across all pages.
- **Multiple font URL variants exist in the repo**: Most pages use `Inter:wght@400;500;600;700&family=Playfair+Display` but internal/old pages use `Inter:wght@300;400;500;600;700` (no Playfair). Use regex matching when batch-processing, not string matching, to catch both variants.
- **Internal pages get the same fix**: ops.html, dashboard.html, marketing pages — even though they're noindexed, fixing fonts improves load time for Adam's own use.
- **Thank-you redesigns often drop noindex**: Already noted in previous run, but confirmed again — monitor anytime thank-you.html is touched.

---

## 2026-03-27 — Weekly Content: Down Payment Assistance Texas 2026

### Patterns
- **NotebookLM recommendation vs. keyword gap**: NotebookLM recommended Spring Market + Pre-Approval. Pivoted to DPA keyword gap instead because the existing /austin-down-payment-assistance.html is dated 2025 and the 2026 version is an uncontested search target. When NotebookLM recommendation overlaps with an existing page, favor the keyword gap.
- **DPA content drives pre-approval submissions**: Down payment assistance posts are high-intent — someone reading about DPA is ready to apply. CTA to /get-preapproved is the natural next step; include it prominently.
- **Meta description 160-char limit is easy to miss**: Wrote 176-char meta initially. Always count before publishing. Trim the attribution ("Adam Styer, NMLS #513013") from the meta desc — the title tag already carries that.
- **NotebookLM import must happen after deploy**: URL-based source import fails if the page isn't live yet. Flag for follow-up import once Netlify builds (usually 2-4 min after push).
- **Keyword clusters covered so far**: Austin mortgage rates (March 2026), cash-out refinance Austin, down payment assistance Texas 2026. Remaining gaps: Kyle TX mortgage guide, Austin spring market 2026, self-employed mortgage Austin 2026, DSCR loan requirements Texas 2026.


This file is updated by every daily run. Each entry is a pattern or insight worth remembering.
Newest entries at the top.

---

## 2026-03-27 — New Suburb Pages Verified + Blog Meta Cleanup

### Patterns
- **Thank-you page redesigns often drop noindex**: When redesigning /thank-you, always verify `<meta name="robots" content="noindex, nofollow">` is present. Organic visitors landing there without submitting a form pollutes conversion data and bounce rate. Check this any time thank-you.html is modified.
- **Blog manifest title drift**: Blog manifest JSON (inline in blog.html) can diverge from actual post content — check titles match the H1/content when auditing. Found "Newsletter" pointing to the surrender story, and lowercase "the ai trap" in manifest while HTML title was properly cased.
- **Double FAQPage count in grep is not a duplicate**: When grepping for "FAQPage" count, `FAQPage:2` on a page means there's a comment `<!-- FAQPage Schema -->` AND the actual `"@type": "FAQPage"` — both are on adjacent lines. Not a structural duplicate.
- **Prior session uncommitted changes**: Check `git status` early in every run. Uncommitted changes from prior sessions can carry important improvements (TCPA, layout) that need to be committed even when not the focus of today's run.
- **TCPA best practice**: 2026 FCC one-to-one consent rules require SMS opt-in to be a SEPARATE checkbox from general contact consent. SMS opt-in should be optional (not required). Main TCPA consent must include "Consent is not a condition of purchase."

---

## 2026-03-26 — Trust Bar Audit + H1 SEO Fix

### Patterns
- **Trust bar drift is a real maintenance problem**: 39 pages had "#1 Austin Mortgage Team" instead of the standard "Licensed in Texas | NMLS #513013". These had diverged silently over many sessions. Run a grep for `#1 Austin Mortgage Team` at the start of any design audit to catch future drift.
- **Homepage H1 was keyword-weak**: "Your Austin Home Loan Simplified" has zero searchable keywords. Changed to "Mortgage Broker Austin TX — Adam Styer | NMLS #513013" per NotebookLM recommendation. Front-loading the primary geo keyword is the highest single SEO ROI change confirmed by research.
- **Suburb forms don't feed Google Ads conversions**: suburb quick-forms show inline success (no redirect to /thank-you). Only `thank_you_page_view` triggers Google Ads conversion, so suburb lead form completions are invisible to Google Ads bidding algorithm. This suppresses Quality Score and ROAS tracking.
- **Answer-First formatting matters more every month**: NotebookLM confirmed 25%+ of searches now have AI Overviews. Pages with a 40–60 word direct answer in the first paragraph get extracted for citations. This is increasingly competitive.
- **Form fields and conversion rates**: 5 fields is the recommended maximum for mortgage initial contact. Research benchmark: 11 → 4 fields = 120% conversion lift. Consider combining first/last → full name on /get-preapproved.

---

## 2026-03-25 (Week 3) — Pflugerville & Kyle Suburb Analysis

### Competitive Notes
- **Kyle is the most open suburb keyword found to date** — NO dedicated lender page ranks in top 3. All positions held by directories (Greater Texas CU, Zillow, Yelp). First lender with a dedicated page could own this keyword.
- **Big Life now ranks #1 for 3 suburbs** (Pflugerville, Leander, Georgetown) — all with generic templated content. They do NOT have a Kyle page (gap).
- **Lone Star's Austin metro blind spot is massive**: Only 6 pages in Austin metro (Austin, Round Rock, Lakeway, San Marcos, Killeen, Waco) out of 35+ total city pages. Missing: Pflugerville, Kyle, Cedar Park, Leander, Georgetown, Buda, Dripping Springs, Westlake, Hutto, Liberty Hill.
- **Arnaiz Mortgage uses FAQPage schema** — first competitor found with this. Also uses LocalBusiness, MortgageLoan, Service, BreadcrumbList. Multi-state templated operation (50+ city pages). FAQPage is no longer an uncontested opportunity — it's urgent.
- **Geneva Financial Pflugerville page has Arizona address** — worst quality #3 ranking seen. Trivially displaceable.
- **Nest Mortgaging (Kyle)**: Erica Bille, local Kyle broker with strong personal branding and 5-star reviews. Uses my1003app.com (same platform as Adam). Weak SEO now but could improve — potential future threat for Kyle keyword.
- **No Google Ads competition** on suburb keywords (Pflugerville, Kyle) — zero paid competition, cheap CPCs available.
- **Kyle market data for future pages**: ~$350-380K median home price, Hays County, I-35 corridor, 90%+ population growth last decade, Plum Creek and Steeplechase key neighborhoods, Kyle ISD.
- **Pflugerville market data for future pages**: Key neighborhoods include Blackhawk, Falcon Pointe, Meadows of Blackhawk, Wells Branch. PISD (Pflugerville ISD). Travis/Williamson County overlap. Growing tech corridor.

### Suburb Keyword Patterns (Pflugerville + Kyle)
- Kyle: Directories completely dominate — no mortgage lender has a dedicated page ranking. Easiest suburb keyword to win.
- Pflugerville: Big Life ranks #1 with generic content (25 reviews). Geneva ranks #3 with wrong-state address. Both beatable with localized content.
- Credit unions (Greater Texas CU, Austin Telco) rank well for suburb keywords — they're trusted local brands but rarely have dedicated suburb landing pages.
- Review counts on suburb pages matter: Big Life's 25 reviews on Pflugerville page vs 265 on Georgetown page correlate with ranking strength.

---

## 2026-03-24 (Week 2) — Suburb Keyword Deep Dive

### Competitive Notes
- **NEW competitor: Big Life Home Loan Group** — ranks top 3 for both "leander mortgage lender" and "georgetown mortgage lender". Uses AggregateRating schema (265 reviews on Georgetown page). Templated but localized content. Parent: Cornerstone Capital Bank.
- **Lone Star has NO Leander or Georgetown pages** — despite having 30+ suburb pages elsewhere. Major gap in Williamson County suburbs.
- **Review benchmark raised**: Big Life claims 265 reviews on Georgetown page (up from Highlander's ~168 as the reference). Review gap is widening.
- **Arnaiz Mortgage and LendFriend Mortgage** are new entrants in refinance keywords — refinance SERP getting more competitive.
- **Templated city pages at scale** (JVM Lending model) are becoming common — national lenders auto-generating pages. Must differentiate with genuinely local content (market stats, neighborhoods, school districts).
- **Directory dominance growing**: WalletHub "2026's Best" list now ranking for commercial keywords alongside Zillow and Yelp.
- **Lone Star updating content**: Austin page shows Feb 2026 market data ($572,479 avg price). Content freshness is a ranking signal they're investing in.
- **Big Life weakness**: Their suburb pages are generic mortgage education with city name swapped in. No local market data, no neighborhood info. Beatable with better localization.
- **Schema triple play opportunity**: No competitor uses LocalBusiness + FAQPage + AggregateRating together on suburb pages. First to do all three wins rich snippet real estate.

### Suburb Keyword Patterns (Leander + Georgetown)
- Zillow and local directories rank #1 for suburb keywords — organic lender pages compete for positions 2-5
- Dedicated suburb pages with schema markup outrank generic "serving all of Austin" pages
- Content that mentions specific neighborhoods, school districts, and local data ranks better than templated pages
- Georgetown Mortgage Bank benefits from exact-match domain — hard to displace but niche

---

## 2026-03-24 — Initial Setup

### Patterns
- Google Fonts loaded synchronously block render on mobile — always use async preload pattern
- Form must render ABOVE headline on mobile via `order: -1` in CSS media query
- Ad landing pages (/get-preapproved, /refinance-quote) must NEVER have site navigation
- Netlify Forms require both `netlify` attribute AND hidden `form-name` input

### NotebookLM Insights (cached)
- Suburb pages are the #1 priority — Lone Star has 30+ and dominates suburb keyword SERPs
- FAQPage schema is an uncontested opportunity — neither Lone Star nor Highlander uses it
- Answer Engine Optimization (AEO): lead every page with a direct 40-60 word answer to the primary query
- Atomic paragraphs (2-4 sentences) + bulleted lists get extracted by AI search engines
- E-E-A-T is non-negotiable in YMYL: NMLS#, license badges, author bios on every page

### Competitive Notes
- **Baseline (2026-03-24):** 0/9 target keywords in top 10
- **Primary threat:** Lone Star Financing — 30+ suburb pages, LocalBusiness schema, since 2007
- **Secondary threat:** Highlander Mortgage — 168+ reviews at 4.9 stars, ranks #1 for "mortgage broker austin tx"
- **Schema gap:** Neither top competitor uses FAQPage schema — first mover advantage available
- **Suburb page gap:** We have 0 suburb pages vs. Lone Star's 30+ — this is the biggest SEO deficit
- **Review gap:** Highlander has ~168 reviews — we need a systematic review solicitation campaign
- **"Cash out refinance austin tx"** — winnable keyword, current #1 is a small player (Austin Capital Mortgage)
- **"Get pre-approved austin tx"** — auto lenders dominate, mortgage-specific modifier could own this
- **Directory profiles matter:** Zillow and Yelp directories rank in top 3 for multiple keywords — optimize those profiles too
- **Low Google Ads competition** on target keywords — potential for cheap CPCs
- **Key competitors to track:** Lone Star Financing, Highlander Mortgage, Austin Capital Mortgage, Max Leaman/Loan People, CrossCountry Mortgage

### Content Strategy
- Keyword clusters not yet covered: cash out refinance Austin, DSCR loan requirements Texas 2026, down payment assistance Texas 2026
- Blog should publish weekly minimum for SEO freshness signals
- Every blog post needs CTA to /get-preapproved or /refinance-quote

### GBP Notes
- Posts rotate on 5-theme cycle: Rate Commentary → Loan Product → Homebuyer Tip → Misconception Buster → Client Story

---

## 2026-04-06b — Blog Template Confirmed Correct; AEO Homepage + Person Schema

### Patterns
- **Blog title drift root cause is human process, NOT the template**: `_template.html` line 28 already has `<title>@@POST_TITLE@@ | Adam Styer | NMLS #513013</title>` with a prominent enforcement comment block. The template was correct. Authors publishing new posts without using the template is the only explanation. Pre-publish lint (`grep "<title>" blog/*.html | grep -v "Adam Styer"`) is the only automated defense. Add this to the start of every run as a non-negotiable step.
- **Homepage AEO paragraph placement**: The correct injection point is before the first H2 in a non-hero content section — specifically before the "Why Choose Adam Styer" H2 inside the `<section>` after the stats strip. Adding `<p class="text-center" style="max-width:760px;margin:0 auto 2rem;"><strong>...</strong></p>` at that position ensures the paragraph is both structurally early and visually coherent as a section intro.
- **Person schema + MortgageBroker schema co-existence**: Both should live on the homepage. The `worksFor` relationship in Person schema pointing to the MortgageBroker entity creates a named-entity graph connection that helps Google treat Adam Styer as a real licensed professional rather than an anonymous business. `sameAs` with LinkedIn/Zillow/Facebook is the cross-domain entity validation signal.
- **GSC "Request Indexing" vs. sitemap submission**: Sitemap submission tells Google pages exist. Manual "Request Indexing" in URL Inspection signals urgency and puts pages in the crawl priority queue. For a 24-page suburb URL set with a 5-week indexing lag, manual request indexing for the top 5-10 pages is the recommended acceleration path. Adam must do this in GSC — not automatable.
- **NotebookLM timeout pattern**: Run 1 (early AM) timed out; Run 2 (later) succeeded. Likely an initialization/cold-start issue. If a scheduled run hits timeout, cached NOTEBOOK_INSIGHTS are sufficient to proceed. No action needed beyond logging.


---

## 2026-04-07 — Meta Description Length Audit: va.html Was Over-Length

### Patterns
- **va.html had the only over-length meta description at 181 chars**: All other loan pages were short (142-149), construction/jumbo/investment were already in range (150-156). The over-length va.html description crept in from the April 1 meta expansion that added "Get pre-approved in 24 hours" to an already full description. Rule: after any meta description edit, verify character count with Python before committing.
- **Tuesday meta audit revealed 6 of 10 loan pages needed fixes**: Not all pages got attention in the same pass. The pattern now: run `python3 -c "..."` to bulk-check all loan page meta lengths at the start of every Tuesday rotation rather than reading files one by one.
- **AEO suburb coverage progress**: Taylor, Smithville, Spicewood added 2026-04-07. Remaining suburb pages without confirmed AEO body paragraphs (needs audit): New Braunfels, Bastrop, Bee Cave, Marble Falls, Elgin, Florence, Jarrell. Next Wednesday rotation should pick up from alphabetical order.


---

## 2026-04-09 — AEO Grep Pattern Clarification + San Marcos Added

### Patterns
- **`content-narrow + <p><strong>` multiline grep hits footer — not reliable for AEO detection**: The grep pattern `content-narrow.*\n.*<p><strong>` matched san-marcos because the footer section in some files has a `<div class="footer-section">` that is a sibling inside the same content-narrow parent, or because the multiline match spans beyond the intended section. **More reliable check: grep for `<strong>To get a mortgage in`** which is the exact AEO pattern used on all suburb pages. Only Round Rock matched — confirming all others use `<p><strong>` for other purposes (footer company name, etc.). Use this exact pattern for future AEO coverage audits.
- **AEO coverage: 13/25 suburb pages confirmed as of 2026-04-09**: Confirmed with answer-first paragraph: Round Rock, Georgetown, Leander, Pflugerville, Cedar Park, New Braunfels, Bastrop, Bee Cave, Elgin, Florence, Jarrell, Marble Falls, Hutto, Spicewood, Liberty Hill, Lakeway, Smithville, Manor, Taylor, Kyle, Austin-area, Dripping Springs, San Marcos (added today). Remaining: Buda, Westlake.
- **San Marcos AEO angle: USDA + investment**: San Marcos has two unique differentiators vs. other Austin suburbs — (1) USDA eligibility throughout Hays County (zero-down) and (2) Texas State University rental market for DSCR investors. These are the two points most banks don't lead with. The AEO paragraph used this angle rather than the generic "40+ lenders" opener to improve specificity for AI extraction.

---

## 2026-04-12b — AEO Completion: Last 5 Suburb Pages + Template Pattern Differences

### Patterns
- **"AEO done 2026-04-09b" in TODO.md was wrong — 5 pages still missing**: Kyle, Leander, Pflugerville, Georgetown, and austin-area all lacked AEO answer-first paragraphs. The TODO entry was premature. **Rule: don't mark AEO as "all done" until you've explicitly grepped every page for `<p><strong>To get a mortgage` or equivalent. A count-based check (`<p><strong>` ≥ 2) is insufficient because some strong blocks are city enrichment or footer text.**
- **Two distinct templates require different AEO insertion points**: The newer template (buda, westlake, san-marcos, etc.) uses a dedicated `<!-- AEO Answer -->` section with its own `<section>` block. The older template (leander, pflugerville, georgetown) uses a single `<!-- Intro Content -->` section where the AEO paragraph goes as the first element inside `content-narrow`, before the H2. Never insert AEO text inside a `<header>` tag or after an H2 — always the FIRST child of the content-narrow div.
- **Austin-area hub page also needs AEO**: The `/austin-area-mortgage-lender.html` hub page listing all 24 cities had no answer-first paragraph. Hub pages that answer broad queries (e.g., "mortgage broker Austin area") are high-value AEO targets too — treat them the same as suburb pages.
- **"At a glance" blocks are not AEO — confirmed again**: Georgetown and Leander both had `<p><strong>[City] at a glance:</strong>` enrichment blocks. These are mid-section factual summaries, not answer-first paragraphs. The AEO requirement is specifically the opening answer to the primary query, before any H2 or narrative prose.

---

## 2026-04-21b — Loan Page Title Audit: Two Fixes + NMLS in Hook Titles

### Patterns
- **DSCR and Refinance titles were over 65 chars — simple redundancy trim resolved both**: DSCR had "| Investor Mortgage" after the product name (redundant — DSCR already implies investor mortgage). Refinance had "Mortgage" after "Refinance" (redundant) plus title order buried the product keyword. Fix: remove redundant segment, reorder "Cash-Out Refinance" to lead. Both now under 60 chars.
- **FHA and Jumbo use deliberate hook titles that exclude NMLS (too long to include)**: "Austin FHA Loans: Broker, Not a Call Center | Adam Styer" and "Jumbo Loan Austin: 10% Down to $1.5M | Adam Styer" both have strong CTR hooks but no NMLS in the title. Adding NMLS pushes them over 65 chars. Decision: NMLS is in meta description + page body, which satisfies compliance. Hooks are deliberate differentiators — do not change.
- **Second-run same-day correctly defaults to the skipped rotation**: Morning run overrode Tuesday rotation in favor of TOMORROW_PRIORITY items. Second run correctly executed the skipped Tuesday rotation (loan page title/meta audit) rather than repeating the morning work or jumping to Wednesday.

## 2026-04-21 — AEO Paragraph on Pre-Approval Page + Refinance FAQ Expansion

### Patterns
- **TOMORROW_PRIORITY items correctly override Tuesday rotation when set**: The pre-approval AEO + refinance FAQ schema items from yesterday's TOMORROW_PRIORITY took precedence over the Tuesday title/meta rotation per the SKILL instructions. Both were directly aligned with GOALS.md ("SEO fixes: high impressions, low CTR" + "content quality"). Pattern: always check if TOMORROW_PRIORITY aligns with weekly GOALS before deciding whether to override or complete both.
- **Duplicate sitemap entry discovered for mortgage-pre-approval-austin.html**: Page appears at line 49 (priority 0.9) and line 95 (priority 0.8). These were both updated to 2026-04-21. Duplicates in sitemap.xml can cause Google to treat one entry as canonical and ignore the other — or send mixed signals. Safe to remove the lower-priority duplicate (line 95). Flag for cleanup when ZERO_RISK items are needed.
- **NotebookLM now 3-4 weeks stale on already-fixed items**: Five consecutive Monday runs have returned at least one recommendation that was already completed weeks prior. Strategy: treat NotebookLM as a competitive/ranking intelligence tool only. Never use it for specific on-page fix recommendations without verifying against live files first.
- **Refinance FAQPage schema can have 6 questions without Rich Results Test issues**: Google's FAQPage rich results support unlimited questions. Adding a 2026-dated, process-specific question ("How does a Texas cash-out refinance work in 2026?") differentiates from competitors who have the same generic "What is a Texas cash-out refi?" question. Process-oriented questions have higher AI Overview extraction probability.

---

## 2026-04-22 — Bee Cave OG Description ISD Error + broker-vs-bank AEO H2 Pattern

### Patterns
- **OG description can contain factual errors invisible to on-page audits**: Bee Cave's OG description said "near Eanes ISD" despite the page body and schema consistently saying "Lake Travis ISD". Eanes ISD covers Westlake Hills/Rollingwood (78746 ZIP), NOT Bee Cave (78738 ZIP). OG descriptions are visible to social share previews and LinkedIn/Facebook previews — a wrong ISD claim can undermine trust for buyers doing their homework. Rule: when auditing suburb pages, always check OG description for ISD name against the page body.
- **TOMORROW_PRIORITY checklist can contain items already done**: Bee Cave TOMORROW_PRIORITY said "AEO paragraph present?" and "comparison table + FAQPage schema" for mortgage-broker-vs-bank — both were already complete. Confirmed via live grep before touching anything. The Re-Verify Gate cleared all three items as already resolved. Pattern: always re-verify TOMORROW_PRIORITY items against live files before executing.
- **mortgage-broker-vs-bank CTAs pointed to /prequal.html (noindexed, in robots.txt Disallow)**: 3 CTAs all linked to /prequal.html. Changing these to /get-preapproved aligns all CTAs with the primary conversion tracking flow (generate_lead event). The /prequal.html page still exists and is functional but the indexed comparison page should funnel to the primary tracked conversion page. Rule: after any batch CTA audit, check resource/article pages (not just suburb pages) for stale /prequal.html or other non-tracked landing page links.
