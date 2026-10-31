# Part 2 — Consistent business identity and matching FAQs

Based on PR #43 at `9bcb2d8b`, with the independent accessibility review recorded in `pr-43-review.md`. **212 HTML pages changed.** The changes also include one identity source, maintenance and verification tools, future-page schema helpers, and a branch-specific Vercel deployment exclusion.

## Before and after

| Issue | Before at PR #43 | After |
|---|---|---|
| Domain in JSON-LD | 183 public canonical pages contain URLs on thestyerteam.com | Zero retired-domain URLs in JSON-LD; page URLs and final breadcrumb destinations match canonical tags |
| Company identity | Repeated definitions, with explicit #business and #organization IDs and inline organizations without IDs | One identical, generated Organization/FinancialService at https://styerteam.com/#organization on each page |
| Legal identity | Repeated data made drift possible | Exact team name; legalName Go Rascal Inc.; company NMLS 2072896; only 185 Wythe Ave, Suite A2, Brooklyn, NY 11249; Texas service area |
| Adam | Three job titles; mixed inline and named identities | #adam, Adam Styer, Senior Loan Officer, NMLS 513013, worksFor #organization |
| WebSite | Repeated or missing definitions | Shared #website, published by #organization |
| Business relationships | Inline author/provider/publisher company definitions | Article author #adam and publisher #organization; Service provider #organization and broker #adam |
| Addresses and location | Business geo coordinates, including downtown Austin; employer address on regulator data | Only the shared organization carries a postal address; no business geo coordinates; regulator nodes carry no employer address |
| sameAs | Maps search for Adam Styer Mortgage and LinkedIn /adamstyerloans | Removed; no replacement profile guessed |
| Quantified promotional claims | Rate/APR tables, spreads, savings/payment examples, closing-speed statements, career counts | Qualitative wording, excerpted customer quotes without the offending sentence, and “Request a quote” instead of posted rate/APR table values |
| Pre-qualification | Unverified pre-approval claims and inconsistent definitions | Initial estimates distinguished from conditional approval, which requires verification and underwriting |
| FAQ parity | Markup differs from displayed questions/answers, including the named products, conventional, jumbo, and Taylor pages | 132 FAQPage nodes with 790 displayed questions/answers; zero parity failures |
| Products and Taylor counts | Each advertises five schema questions but displays four | Four matching questions each; no invisible question invented |
| Conventional counts | Five schema questions and six displayed questions, with question/answer mismatches | Six displayed questions and their exact answers in markup |
| Jumbo counts | Nine schema questions and eight displayed questions | Eight matching displayed questions, including a qualitative rate-comparison answer |
| DSCR template serialization | Four pages print Python list delimiters and escaped newlines around FAQ HTML | Valid details/summary HTML, all original answers retained; maintenance code and verifier prevent recurrence |
| Specialty coverage | Bank statement, self-employed, high-net-worth, and jumbo lack linked Service/Breadcrumb coverage | All four have BreadcrumbList and Service nodes linked to the shared identities |
| Texas DSCR article | Missing image/date/author coverage | Image, publication/modification dates from repository history, and author #adam |
| Pages without JSON-LD | 29 canonical pages, including three excluded administrative/withheld pages | All 26 other pages receive a graph; 212 public canonical pages now have markup |
| Accessibility | PR #43 passes the reviewed six-page matrix | Still zero axe violations at 1280/390; no horizontal overflow at 320/390; no focused control covered in the tested Tab sequences |
| Main JS tests | 36 failing names in production base and PR #43 in this environment | Same 36 names; no new failures |
| Assistant TS tests | 17 failing names in production base and PR #43 | Same 17 names; no new failures |

## Every wording change

[wording-changes.md](wording-changes.md) records every changed visible text group and title/description metadata value with old and new text and source lines, followed by every changed FAQ schema question/answer. [wording-changes.json](wording-changes.json) provides the same evidence in a machine-readable form. FAQ corrections that existed only in the old schema are included, so the old jumbo and conventional claims are not lost from the report.

The specialty FAQ sets remain full length: 17 bank-statement, 11 self-employed, 13 high-net-worth, 8 jumbo, and 9 Texas DSCR questions. The other four DSCR pages retain their displayed questions, including the repaired list-generated HTML. The wording changes retain direct answers and local Austin/Texas context.

Future-page templates also replace “This Week’s Rates” / “This Week's Rates” with “Mortgage Pricing Review” and replace interpolated rate/APR figures with “Request a quote.” Their Article nodes use the same shared entity source. These template changes do not modify lead handlers or form payloads.

## Verification and limits

- All 212 JSON-LD blocks parse and pass the repository Schema.org class audit. Shared identities, no retired-domain URLs, FAQ parity, four linked specialty services/breadcrumbs, and DSCR metadata pass the independent verifier.
- The six key pages also pass Schema Markup Validator code validation with zero errors and zero warnings. See `external-validator-results.json` for exact result counts and input hashes. This checks the proposed code; it does not claim Google has crawled, indexed, or granted rich-result eligibility to this branch.
- axe, overflow, logo sizing, keyboard focus, and form evidence are stored alongside this report. No real form endpoint was contacted. Full forms are byte-identical to PR #43.
- Production source: 165 JS tests, 129 passing/36 failing. PR #43 and this branch: 171 JS tests, 135 passing/36 failing. Assistant suite: 147 tests, 130 passing/17 failing on all three versions. The user-reported 38 JS failures were not reproducible with Node 24.19.0; exact failing names were compared instead of assuming a count.
- Unrelated existing failures were left alone. No merge, deployment, production change, or IndexNow submission was performed. The PR targets cursor/wcag-aa-fixes-dd12.

## Exclusions

- Administrative/withheld `dashboard.html`, `loanos.html`, and `loanos-waitlist.html` are excluded from public entity/FAQ generation. Noncanonical utility pages, the footer fragment, and the Google verification file are not treated as content pages. The inventory was wider than the estimated six missing pages, so all 26 other canonical gaps were filled.
- Calculator inputs, formulas, user-driven calculations, and validation bounds remain functional. Tax/HOA figures, reserves, income-calculation examples, program eligibility requirements, statutory waiting periods, and economic indicators are not represented as quoted mortgage rates. Existing disclosures and footer compliance language remain unchanged.
- Legacy URL slugs and anchor IDs containing pre-approval remain so links continue to resolve. The banned-wording check reads visible prose and schema text rather than treating a legacy route as an advertising claim. Email addresses are not domain-rewritten. Ordinary links/OG asset URLs outside JSON-LD were not part of the schema-domain sweep.
- No official Google Rich Results eligibility claim is made. Schema Markup Validator was reachable and used instead of submitting a deployment URL to Google. FAQ markup alone does not guarantee a Google FAQ rich result.
