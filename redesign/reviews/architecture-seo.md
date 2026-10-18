# Architecture and SEO/AEO review — local full-site build

**Decision: PASS for the final assembled local candidate’s 173-route mapping, crawlable hierarchy, retained technical content, metadata and structured-data agreement.** Roles 2 and 9 sign off within the offline scope below. This is not a deployment or production-launch sign-off.

| Check | Final result | Evidence |
| --- | --- | --- |
| Master ledger | 173 distinct routes accounted for | `route-manifest.json`, `qa/architecture-route-audit.json` |
| Parent links and exact anchors | Zero missing; each checked parent link also appears outside the global header/footer | `qa/architecture-route-audit.json` |
| Child return paths and reachability | Zero missing backlinks or unreachable ledger destinations | `qa/architecture-route-audit.json` |
| Internal targets and fragments | Zero unresolved targets or fragment IDs in the checked HTML link graph | `qa/architecture-route-audit.json` |
| Historical path rules | All 247 patterns retained in configuration; config hash rechecked after final build | `qa/historical-route-audit.json` |
| Technical-content preservation | 170 distinct source HTML files; 10,907 tested nodes; zero unexplained omissions | `qa/content-preservation-audit.json` |
| Titles, descriptions, canonicals | Zero changes across the 170 source HTML files | `qa/seo-aeo-audit.json` |
| Headings, breadcrumbs, preview indexing | One H1 per checked page; matching visible/schema parent chains; no missing local-preview noindex | `qa/seo-aeo-audit.json` |
| JSON-LD | Zero parse errors | `qa/seo-aeo-audit.json` |
| FAQ agreement | All 760 schema questions and all 760 answers match delivered HTML text | `qa/seo-aeo-audit.json` |
| Other schema and social metadata | Unchanged on 168 files; only the previously documented home/bank exceptions | `qa/nonfaq-schema-comparison.json`, `qa/seo-aeo-audit.json` |

## Architecture ruling

`architecture.md` supplies the full 173-row route/parent/anchor table, the six core clusters, progressive-disclosure rules, and breadcrumb contract. The six clusters contain 72 routes; the 101 supplemental site, local, partner and legal/alias routes remain in scope. Cluster 1 correctly retains ten routes, even though the initial shorthand described a hub plus eight spokes. The resource directory, contextual parent links and breadcrumbs preserve access to the deep technical network without replacing established URLs.

The route count includes canonical aliases and the application entry. The 173 entries correspond to 170 distinct production HTML files. `/index.html` points toward the homepage, and the extensionless June 14 buy-before-sell article points toward its `.html` canonical destination. Both application aliases intentionally resolve to the local application gate. The four production-domain alias rules remain recorded outside the local preview’s authority.

## Changes required by the critique

The first full-site review found four missing or mismatched exact ledger anchors. Those links are now present. The initial FAQ scan also found 359 inherited answer mismatches; these were investigated rather than passed as unchanged source behavior.

The final reproducible build applies 84 logged schema-only changes: 76 visible FAQ inventory reconstructions, five removals of unsupported FAQPage markup, and three question-name alignments. The old JSON-LD is preserved in `qa/faq-original-schema-archive.json`; each exact before/after object appears in `qa/faq-sync-apply-log.json`. These schema corrections changed zero visible body text. Relevant non-FAQ schema remains intact.

The five pages without identifiable visible FAQ groups are `austin-housing-market.html`, `austin-down-payment-assistance.html`, `improve-credit-score.html`, `mortgage-glossary.html`, and `blog/2026-04-01-spring-market-update.html`. Only their unsupported FAQPage markup was omitted. Their articles, explanations and other schema remain. The final inventory has 760 visible questions and answers represented in FAQ markup; it does not preserve inaccurate structured claims merely to preserve their former count.

Source-content comparison permits only exact documented copy corrections from the preceding bank-statement review and the four entries in `text-corrections.json`. The latter make the DSCR local-save status honest and revise the asset calculator’s introductory copy. The test applies the bank corrections only to the bank page, avoiding false exceptions elsewhere. The original homepage FAQ remains in the resource hub; the newly designed homepage body is separately reviewed. Obsolete bank form/picker UI and form/navigation elements are outside the substantive text comparison. All other checked paragraphs, headings, list items, table cells, definitions and disclosure summaries remain present.

Titles, descriptions and canonical relationships are unchanged. The two existing home/bank social and identity-schema changes remove unverified former affiliation/contact fields and use the new site identity. Breadcrumb schema is deliberately rebuilt to match the actual parent chains. No other non-FAQ/non-breadcrumb structured-data change was found across the source inventory.

## Scope of sign-off

These checks read local HTML, route configuration and recorded source snapshots. They do not verify actual HTTP status codes, rendered browser behavior, JavaScript calculator execution, live applications, forms, uploads, email delivery, n8n or Netlify services. No such service was changed by this architecture/SEO work. Technical QA owns separate runtime evidence.

The site is intentionally a non-indexable local preview. Production indexing, canonical-host responses, sitemap publication and real integration behavior require separately authorized release work. Existing historical articles and underwriting explanations were preserved; this audit does not claim that every dated financial figure was newly validated against current program rules.

The preservation evidence supports continuity of routes and discovery signals. It does not promise future rankings, traffic, rich results or citations in generated answers. Unknown historical URLs beyond the supplied ledger and archived configuration remain outside the measured inventory.

The final artifact hashes and review boundary are recorded in `qa/architecture-seo-signoff.json`.
