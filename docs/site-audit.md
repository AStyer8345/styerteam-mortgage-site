# Site audit — July 11, 2026

## Executive summary

Styermortgage.com is a hand-built static HTML/CSS/JavaScript site deployed by Netlify from GitHub. It has no CMS or framework. GA4 and Google Ads run through GTM. Public lead capture uses Netlify Forms plus `/.netlify/functions/lead-intake`, which forwards to LoanOS and the existing web-lead automation; the full application is hosted in the HyperSmart/Arive portal. The current design system is navy, gold, Inter, and Playfair Display and was preserved.

The site already has strong complex-income coverage and a functional scenario funnel. The most material defects in the requested scope were the Realtor page's unsupported nationwide claim, a mailto-only partner form, incomplete scenario intake choices, inconsistent CTA wording, stale/unsupported performance copy, and no canonical evergreen buy-before-you-sell page at the requested route.

## Company and compliance findings

| Issue | URL or file | Exact text | Severity | Recommended correction | Safe without input? |
|---|---|---|---|---|---|
| Unsupported licensing claim | `/realtors.html` | “Primarily Austin and Texas, but we license nationwide.” | P0 | Limit copy to Austin/Texas and qualify availability | Yes; repository identifies Texas licensing only. Corrected. |
| Insecure/unreliable partner workflow | `/realtors.html` | JavaScript `mailto:` submission | P0 | Use Netlify form + server-validated LoanOS intake | Yes. Corrected. |
| Raw application URL shown publicly | `/realtors.html` | `https://hypersmart.my1003app.com/...` | P1 | Use descriptive secure-application anchor | Yes. Corrected. |
| Scenario intake lacked preferred contact method | `/scenario.html` | No field | P1 | Add accessible required select | Yes. Corrected. |
| Scenario privacy instruction incomplete | `/scenario.html` | Consent did not link privacy policy or prohibit sensitive data | P0 | Add privacy acknowledgment and sensitive-data warning | Yes. Corrected. |
| Performance claim conflicts with current goals | `/realtors.html` and other legacy public pages | “Same-day for most applications”; similar timing language | P0/P1 | Remove or qualify after business/compliance review | Partly. Realtor scope should be corrected; sitewide quoted testimonials and historical content require review. |
| Company/application values conflict in global instructions | `/Users/adamstyer/Documents/CLAUDE.md` vs repository `CLAUDE.md`/`ARCHITECTURE.md` | Old `mslp.my1003app.com` in global instruction | P0 | Treat current repository and production values as authoritative; update global instruction separately | No; outside repository and contradictory. |
| Displayed email variants | Public pages | `adam@thestyerteam.com` and `adam.styer@hypersmart.loan` | P1 | Confirm preferred public/contact email, then normalize | No. Both are documented; business input required. |
| Entity naming variants | Public pages/schema | “HyperSmart Loans”, “HyperSmart Home Loans”, legal entity | P1 | Use display name for marketing and full legal entity in disclosures/schema | Mostly; broad sweep needs compliance review. |
| Dynamic rate/program claims | Homepage FAQ and legacy articles | Hard-coded loan limits, ratios, divisors, down payments | P1 | Remove maintained-current framing or establish verified source/expiry process | No; program-by-program review required. |

No GoHighLevel integration was introduced. Untracked local GoHighLevel export scripts were explicitly excluded from scope and deployment.

## Technical audit

- Build: Netlify publishes the repository root; build command regenerates `recent-updates.json` and is fail-safe.
- Dependencies: three runtime packages, used by Netlify functions. No new dependency added.
- Forms: scenario and partner forms use HTTPS in production, browser validation, server validation in `lead-intake.js`, Netlify spam filtering/honeypots, and consent. Production submissions were not tested.
- Security: secrets remain environment variables. Sensitive form values are not sent to analytics. HSTS exists. A future hardening pass should add CSP, `X-Content-Type-Options`, `Referrer-Policy`, and a modern frame policy after testing third-party embeds.
- Error handling: lead forms require an accepted capture endpoint before showing success. Network failure displays an error.
- SEO: sitemap, robots, canonicals, OG, and structured data exist. Route/file conventions mix `.html` and clean URLs but Netlify serves both; canonical values consistently use current file routes.
- Accessibility: skip links, labels, semantic headings, focus styles, responsive nav, and reduced-motion support exist. The new routes use the same system. Remaining risks are accordion ARIA consistency and sitewide contrast checks on legacy inline colors.
- Performance: WebP hero assets, explicit image dimensions, deferred scripts, and cache policies are present. Google Fonts and GTM remain the main external costs.
- Tests: Node regression tests exist but no package scripts or browser test harness were declared in `package.json`.
- 404: no dedicated `404.html` was present at audit time; this remains P2.

## Conversion audit

The revised homepage leads with the target audience and separates the lightweight “Send Your Scenario” action from the secure application. The scenario page explains that users should send a short description first and reserve full application details/documents for Arive. The Realtor page now captures difficult-deal context without forcing email-client behavior. Existing case studies are anonymized but should be periodically reviewed to ensure numbers and outcome language remain qualified.

## Workflow audit

| Path | Destination / handoff | Confirmation / failure | Tracking | Risk or friction |
|---|---|---|---|---|
| General contact | Netlify + lead intake → LoanOS/n8n | `/thank-you`; error on failed capture | `generate_lead` | Multiple legacy form patterns |
| Send Your Scenario | Netlify + `lead-intake` → LoanOS/n8n | Client success state / failure state | scenario click and lead events | Public form must remain non-sensitive |
| Secure application | HyperSmart `my1003app` (Arive) | Managed by secure portal | `secure_application_click` | Raw URL appeared in legacy copy |
| Realtor scenario | Netlify + `lead-intake` → LoanOS/n8n | Client success/failure | realtor CTA + lead events | Borrower consent must be respected |
| Calculators | Varies by calculator; some local-only, some lead capture | Varies | Not uniform | Normalize `calculator_completion` in next phase |
| Newsletter/subscription | Mailchimp + LoanOS through functions | Function response | Existing events vary | Confirm consent and retention settings |

Netlify dashboard notification settings and production environment-variable presence cannot be proven from source alone and must be confirmed during preview/deploy verification.
