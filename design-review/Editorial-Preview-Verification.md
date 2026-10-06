# Editorial preview verification — October 6, 2026

Local-only checkpoint, approximately 1:58 a.m. Chicago. This completes the inspected editorial batch, not the overnight scope or required final sitewide audit. Baseline: `f7e9391fc608ac9cd43b965c257e0df2a24b36cd`.

## Implemented

62 existing pages now opt into `premium-reading.css`, the existing premium interior primitives and shared premium navigation. Exact list: `editorial-pages.json`. This includes 51 existing articles, the blog and scenarios directories, six public scenario stories, closing costs, the glossary and the first-time buyer guide. The remaining unusual article and partner/newsletter templates are outside this batch.

The shared treatment provides readable text measure, consistent serif headings, quieter author/date details, direct-answer panels, compact two-column desktop contents, plain bordered filters, restrained scenario cards, readable tables and focused signup presentation. All original content remains. The blog directory reuses one licensed residential photograph; no stock imagery was added beside a real borrower outcome. Original diagrams, charts and supplied imagery remain.

Visual inspection led to repairs for an inherited dark buyer-guide hero behind dark text, cramped active blog filter, competing article heading rules, oversized case-study byline, inconsistent scenario introduction alignment, and the October 1 article's two-column Treasury table. That table originally needed horizontal scrolling at 320px; it now wraps both columns and the caption readably within the screen. No financial values were changed.

## Exact coverage

**Automated browser geometry and labeling:** all 62 pages at 320, 390, 768, 1024 and 1440 pixels, 310 page/viewport checks. No page-level horizontal overflow, exactly one H1, and no unlabeled visible form controls. Cases affected by later CSS repairs were rechecked at all five widths. The Treasury table also fits its own container at all five widths. Results: `editorial-responsive-checks.json`.

**Actually viewed screenshots:** opening desktop 1440px and mobile 320px views of all twelve representatives below. This is representative visual coverage, not a claim that every part of all 62 pages was visually inspected.

- Blog directory and scenarios directory.
- `blog/is-the-lowest-rate-the-cheapest-loan.html`.
- `blog/2026-10-01-why-mortgage-rates-are-rising.html`.
- `blog/2026-06-05-dscr-cash-out-refinance-texas-brrrr.html`.
- `blog/2026-03-18-the-ai-trap-i-walked-right-into.html`.
- `resources/blog/2026-03-04-wait-for-rates-realtor.html`.
- Self-employed deposit-review and oil/gas asset-depletion scenario pages.
- Mortgage glossary, closing costs and first-time buyer guide.

Additional mobile views: repaired Treasury table and keyboard-navigated rate comparison section. Images saved in `editorial-screenshots/`. Scenario opening captures were replaced after metadata/alignment repairs.

**Browser journeys exercised:** blog Rate Shopping filter shows ten matching articles and updates its category URL; All restores the directory; author FAQ expands with `aria-expanded=true`. Scenario Rental investors filter announces one result and its card opens the existing two-rental story. Article contents opens with Enter and its link scrolls the target heading below the header on desktop and mobile. Existing smooth-scroll behavior leaves focus on the contents link; full focus-movement improvements are not claimed. Buyer-guide name/email entry and submit were exercised with synthetic `.test` data on loopback; the guard displayed “Preview only. No inquiry was sent. Entries may remain in this browser tab.” Both entries were cleared afterward. No guide delivery, signup, production inquiry or external application was attempted.

## Preservation and checks after final repairs

- 291 tests pass: 164 site and 127 assistant. Existing protected-contract checks cover the baseline interior metadata, canonical/social tags, JSON-LD, complete forms, original prose/headings, destinations, header/footer and existing script references; homepage has separate checks. This batch changes no form contracts, calculators, routing, tracking or financial claims.
- Safe `CONTEXT=deploy-preview npm run build` passes forms, attribution, schema, navigation and design audits. 478 JSON-LD blocks checked; 47 inquiry forms; 198 navigation documents. IndexNow explicitly skipped.
- Typecheck passes. SEO audit checks 166 sitemap URLs with zero issues.
- Static resolution of 8,360 internal link/fragment occurrences across the 62 pages finds no missing targets. External destinations and dynamically created fragments are outside this check. See `editorial-link-checks.json`.
- Incidental `recent-updates.json` build output restored; final public package rebuilt. Preview remains guarded loopback on 8767. No live changes, deployment, push, ads or messages.

## Limitations and next work

This is a presentation and preservation pass, not fresh verification of every historical article claim. The buyer-guide body still lists 91 Google + 45 Zillow reviews while its shared footer lists 144 published reviews; its anonymous quoted review also needs source traceability. Preserve the source record and verify counts/quote before changing this evidence. Historical rates, program thresholds, lender-fee examples and eligibility claims must be reviewed against dated primary sources before launch. Do not present them as verified by this visual work.

Next: About, Reviews, Contact and partner templates, then inspect remaining inventory and carry out the required fresh full-family audit. Review lower-page sections, current claim evidence, keyboard/focus behavior and unresolved export coverage during that final gate. Local checks do not establish live delivery, field Core Web Vitals, search ranking or AI citation improvements.

Morning review order for this batch: blog photo/directory → category filter → long article answer/contents/body → scenario filter/story → buyer-guide signup. Any eventual release remains separately authorized and must reconcile the dirty primary checkout safely.
