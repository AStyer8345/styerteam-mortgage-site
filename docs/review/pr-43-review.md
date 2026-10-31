# Part 1 — Review of PR #43

Reviewed `9bcb2d8bb7f0e8aaf36d0ad22aaf570f501762cb` against production source `ba618865b60b52269793d5557d3ad89a4bfdc289`. PR #43 remains open; neither branch was merged or deployed.

**Verdict: ready for this accessibility scope.** No clear introduced bug was found, so there is no Part 1 bug-fix commit. Part 2 addresses pre-existing structured-data and wording issues separately.

## Diff hygiene and compliance

- 238 files changed, including 225 HTML files. DOM text comparison found no unexpected body-copy substitutions. The thank-you application CTA changes from “Contact Adam →” to “Start your application,” as intended.
- Additional focus-visible copy to flag: “Skip to main content” was added on pages without a skip link, for example `bank-statement-loans.html:67` at the reviewed head. This is accessibility navigation, not a marketing-copy change.
- Additional screen-reader-only copy to flag: “(opens in a new tab)” appears on external links generally, including NMLS and review links, not only Apply links. This does not alter the underlying compliance wording.
- All 225 changed HTML footers have identical normalized text after excluding the new hidden new-tab hints. The team name, NMLS #2072896 and #513013, “Loans are arranged through third party lenders.”, Brooklyn address, disclosures, and Equal Housing Opportunity text are unchanged.
- Header lockups expose “The Styer Team, Powered by Go Rascal Inc.” exactly once; the separate visible lockup is aria-hidden. GoRascal artwork has no file changes relative to production. Browser measurements on all six checked pages are 96×48 at both 320px and 390px.
- Apply labels, hidden new-tab hints, Contact Adam routing, and the added loan-page header Apply link are consistent with the requested changes.

## Forms and backend

`api/lib/form-post.js:68` and `netlify/functions/lead-intake.js:121` at the reviewed head contain only the preview-sandbox changes relative to production. A nonempty VERCEL_ENV other than production forces test mode and skips n8n/Mailchimp, unless ALLOW_PREVIEW_LIVE_LEADS is exactly true. Unset VERCEL_ENV and production retain the original branches and payload behavior. The six sandbox tests use injected/stubbed transports and pass.

Browser submission and invalid-then-corrected submission results are recorded in `forms-results.json`. Every POST was fulfilled by a local test stub; external requests were blocked. No form was submitted to a real endpoint.

## Repeated verification

- axe-core 4.10.3, WCAG 2 A/AA, 2.1 AA and 2.2 AA tags: zero violations at 1280 and 390 on index, contact, bank-statement, dscr-loans-texas, loans/jumbo, and self-employed-mortgage-austin. Waited for the homepage’s delayed stylesheet and fonts before auditing.
- All six pages have document scrollWidth equal to the viewport at 320 and 390.
- Sequential keyboard traversal found no focused control covered by the sticky header or mobile bottom bar. The skip link is reachable and visible. Automated checks do not constitute a full manual WCAG conformance certification.
- With unmocked network disabled, the production JS suite reports 165 tests, 129 passing, 36 failing. PR #43 reports 171 tests, 135 passing, the same 36 failing test names, and all six additional sandbox tests passing. The stated 38 failures could not be reproduced in this environment; the exact name comparison found zero new failures.
- The package test command uses && and stops on the known JS failures. The assistant TypeScript suite is also run separately for a complete comparison.

See `wcag-browser.json`, `production-failures.json`, and `wcag-failures.json` for detailed evidence. These findings are reported here without posting a separate review or comment to PR #43.

Assistant-suite comparison: production base, PR #43, and the final branch each report 147 tests, 130 passing and the same 17 failing names. The final branch retains the same 36 failing main-JS names as both baselines.
