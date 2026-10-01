# AEO lead recovery — October 1, 2026

User authorized immediate repair with AEO and leads as the priority.

- Homepage: restored explicit Austin mortgage broker positioning and Complex mortgage / Clear path forward heading. Consolidated overlapping promotions into three specialty paths. Approximately 796 visible main words, versus approximately 1523 before the repair; one unchanged inquiry form.
- DSCR: restored Austin/Texas title, description and heading; retained low-ratio and no-ratio coverage; added five omitted borrower questions with conditional, accurate answers.
- High net worth: restored Austin/Texas focus, asset-rich/limited-income description and five omitted comparison/qualification questions.
- Bank statement: restored direct 12/24-month answer in metadata and six borrower questions.
- Self employed: restored qualification/document title and five borrower questions.
- Specialty details and FAQs default open. Visible FAQ questions/answers match JSON-LD. FinancialService remains the valid business type; description identifies mortgage broker.
- Kept corrected eligibility language instead of blindly restoring unsupported historical numeric claims. Preserved existing URLs, canonical targets, tracking, form definitions, consent and capture.
- Added the missing analytics script to the October 1 article. This omission does not explain the earlier slowdown.

Validation: scoped conversion tests 45 pass; broad site suite 127 pass with one pre-existing obsolete sitemap-addition test excluded after confirming failure in unchanged production sitemap inputs. Desktop 1440px and mobile 390px layouts and schema/FAQ parity pass. Full complex-income mocked browser checks at 390/768/1440px pass including primary/backup capture and keyboard disclosures. SEO audit 163 URLs / zero issues. Build checks pass; local build used deploy-preview context to avoid premature IndexNow submission. No fake production leads submitted. Assistant knowledge expiry warnings are pre-existing; no assistant-runtime or notification-capacity fix is claimed by this release.

Traffic recovery remains a hypothesis to measure, not a guaranteed outcome. Deployment and live checks follow the exact pushed commit.

## Verified release

Content commit 73ea06be5f93b9635ab8c79c929ca3375901acd8, Netlify deploy 6abe8bf696a5cc0008598ada ready/published October 1 at 16:36:25 UTC. All five public routes returned 200; 390/1440px live checks confirmed headings, one existing form per page, no horizontal overflow and visible specialty FAQs matching schema. Assistant suite: 119 pass.

Live assistant diagnostic: generic DSCR education request returned HTTP 200 / useful_answer; conversation fe49986b-2342-4d1c-9268-eb6f0d5726a6 was read back in website_conversations, created October 1 at 16:37:05 UTC. Diagnostic source URL was explicitly marked review=aeo-recovery-20261001. No lead request, borrower contact or notification was submitted. Current response and logging work; the earlier zero-usage interval is not explained by this test.

IndexNow initially rejected the script-selected key with 403. Both public key files exist and match their contents. The established acd320… key returned HTTP 200 through both Bing and the configured api.indexnow.org endpoint. Fixed the script to use that accepted key explicitly rather than selecting the first directory entry. Five repaired URLs were submitted successfully through Bing; HTTP 200 means receipt, not confirmed indexing.

## Mobile chat visibility repair

A live browser check found the mobile launcher hidden by advisory-design.css rule `.has-advisory-contact-bar .mortgage-assistant{display:none}`, introduced September 17. This is distinct from the working response/logging service and cannot explain the earlier September 5 record cutoff by itself. Restored the mobile widget above the contact bar; retained hiding during main-form editing and while the scenario panel is open. Desktop and 390px checks confirm launcher and Escape behavior; call, text and scenario remain available. Scoped design/conversion tests: 28 pass.
