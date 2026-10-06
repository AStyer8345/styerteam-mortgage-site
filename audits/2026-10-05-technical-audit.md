# Remediation follow-through — October 5, 2026

This section supersedes the initial audit's pending recommendations below. Work is isolated from the dirty primary checkout and based on production commit `f7e9391fc608ac9cd43b965c257e0df2a24b36cd`. The final live deployment record will be saved in the external audit report after release.

| Area | Completed change and evidence |
|---|---|
| Administrative access | Nine administrative HTML/JS/CSS/JSON files are excluded from the public package and served through a server-verified gateway. Existing MCC access code is preserved. Signed, eight-hour, HttpOnly/Secure/SameSite cookies replace public password hashes and browser-stored passwords. Anonymous files return 401; authenticated files return 200 with no-store; logout clears access. |
| Publishing endpoints | Newsletter, realtor, rate, correction and unified dispatch accept the signed same-origin administrative session or the existing server bearer contract. Authorization runs before provider work. The current site has no DISPATCH_SECRET configured; anonymous requests fail closed with 503, while the operator session remains functional. No new credential was created. Generated previews render in opaque sandboxed frames; local malicious script/event-handler fixtures did not alter the parent dashboard. |
| Deployment packaging | Shared publishing footer is compiled into the function bundle; a preview caught and resolved its Lambda filesystem-path failure. |
| Command center cloud storage | Legacy handlers initialize Netlify Blobs context before opening the existing mcc-state store. Authenticated preview GET returns 200/null; no stored cloud state existed at that key. Existing local browser state is preserved. No production state was written during verification. |
| Assistant guidance | Twelve expired files reviewed against current primary sources and existing owner-reviewed specialty content. Review attribution is explicitly Codex, with the previous owner review date retained. Updated DU credit guidance, cautious Freddie Mac guidance, Closing Disclosure timing and source records. All 20 files now pass strict date validation. Personalized eligibility and pricing remain with the licensed team. |
| Rate limiting | Assistant, saved-analysis and admin use explicit IP/domain arrays. The generated Netlify manifest confirms both aggregation keys, avoiding a bundler quirk that treated a single string as domain aggregation. No production load test was performed. |
| Public accessibility/performance | Modal keyboard containment and restoration repaired. Homepage disclosure contrast corrected. Above-fold text no longer waits for a reveal animation, and initial mobile CTA geometry matches final CSS. Before-change PageSpeed mobile lab: performance 58, accessibility 97, LCP 6.9s, TBT 410ms, CLS 0. After the stable-CTA correction, preview lab LCP was 2.9s, CLS 0.001 and accessibility 100. Overall score remained 58 because that run recorded 3.81s TBT; an earlier preview recorded score 69 and 230ms TBT. This variability prevents a claim of overall score improvement. No CrUX field data available. |
| Lead capture | Existing durable capture/attribution/consent contracts preserved, with bounded payload/object/email validation. Two October 5 inquiry IDs were confirmed in LoanOS and matched to delivered owner-notification emails. One inquiry was vendor outreach; delivery evidence is not qualified-lead evidence. No fake production lead was submitted. |
| Build/dependencies/cache | Lockfile committed, clean install and audit passed, stable asset cache corrected and local malformed-URI handling repaired. |

Local checks: 268 automated checks pass (138 JavaScript, 130 assistant/TypeScript), typecheck, build, form/attribution/navigation/design/schema audits and diff check. SEO audit: 163 sitemap URLs, zero issues. Native preview verified login, private asset denial, signed operator requests, cloud reads and logout. Preview noindex is intentional and is not a production SEO regression.

Remaining operational limit: the older n8n Web Lead Automation recovery executions most recently recorded on September 26 failed at the account execution limit. Recent notification delivery is independently evidenced, but this does not establish that the old recovery workflow is healthy. Restoring account execution capacity requires an account/billing decision outside the website release; no upgrade or workflow replay was performed.

Remaining measurement limits: Lighthouse tests are single-session lab observations, not real-user Core Web Vitals or an SLA. Google tags contribute substantial transfer/CPU cost; the existing GTM/Ads/GA tracking contract is preserved. Full assistive-technology testing and Safari/Firefox coverage remain unverified. No campaigns, social posts or application accounts were created.

---

# Initial audit snapshot (before follow-through)

# StyerMortgage technical audit — October 5, 2026

The public site's crawl and core journeys are healthy in the checks performed. The highest-priority confirmed defects are unauthenticated content/email HTTP handlers, weak input handling, and incomplete keyboard isolation in the shared contact dialog. Seven focused corrections are implemented locally. They have not been deployed.

This is a broad technical audit with recorded coverage and explicit limits, not a guarantee that every browser, provider, accessibility criterion, or traffic condition is defect-free. No redesign, framework migration, lead submission, campaign send, or social publication was performed.

## Source boundaries and baseline

The original workspace is on `redesign/bank-statement-pilot` at `bad877d`, with extensive pre-existing changes. It is not the code currently deployed. Its build fails on expired knowledge approvals; 38 JavaScript tests pass and 98 of 111 assistant tests pass. Its type check and 144-URL SEO audit pass. Those failures must not be reported as current production regressions.

Netlify's current production deploy is `6ac2c4ce9295b20008466b5c`, state `ready`, serving commit `f7e9391fc608ac9cd43b965c257e0df2a24b36cd`. A managed worktree was created from that exact commit at `/Users/adamstyer/.codex/worktrees/technical-audit/styermortgage.com`. Local fixes are on `codex/technical-audit-20261005`. The original workspace was not reset, reconciled, or deployed.

| Check on production source | Before changes | After changes |
|---|---:|---:|
| Automated JavaScript and assistant tests | 255 passing | 262 passing |
| TypeScript check | Pass | Pass |
| Build, including form/schema/navigation/design gates | Pass | Pass |
| Sitemap SEO audit | 163 URLs, 0 findings | 163 URLs, 0 findings |
| Dependency audit of installed production-source tree | 0 reported vulnerabilities | 0 reported vulnerabilities |
| JavaScript syntax sweep | — | 89 tracked JS/MJS/CJS files, no errors |
| Locked installation | No tracked lockfile | `npm ci --ignore-scripts` passes |

There is no configured ESLint command. Syntax checking, TypeScript checking, and the existing build audits were used; these are not equivalent to a complete semantic lint analysis. The original workspace's older installed dependencies report one moderate `qs` vulnerability. The freshly resolved production-source dependencies do not; the generated lockfile now preserves those tested resolutions.

Build checks ran with `CONTEXT=deploy-preview` to avoid production indexing submissions. The build-generated recent-updates file was restored in the isolated worktree so it is not part of the fix.

## Architecture inventory

| Area | Verified implementation |
|---|---|
| Framework/rendering | Custom static HTML/CSS/JavaScript, no application framework or CMS. Important content is in HTML; no React hydration layer. |
| Hosting/build | Netlify, esbuild-bundled functions, static output in `.site-dist`. Packaging explicitly excludes source, tests, reports, and repository metadata. |
| Routes | Root and `.html` canonicals, directory-style resource indexes, `_redirects` plus Netlify TOML legacy redirects and API routing. |
| Components/styles | Shared scripts/styles, generated navigation, footer and advisory design synchronization; repeated static markup checked by build gates. |
| Dependencies | Anthropic SDK, Mailchimp SDK, Netlify Blobs; TypeScript, tsx, Netlify Functions types. No new runtime dependency was added. |
| Content/data | Tracked HTML and JSON manifests, `rates.json`, recent updates, approved Markdown knowledge bundled into TypeScript for serverless execution. |
| External services | LoanOS durable inquiry capture, n8n outbox dispatch, Mailchimp, model providers, Netlify Blobs, GitHub publishing, Google tags, Calendly and secure application portal. |
| Lead forms | Native Netlify form registrations plus custom intake. Stable inquiry IDs, independent first-touch/self-reported attribution, consent fields and durable capture are preserved. |
| Analytics | GTM `GTM-PQQ6PGLR`, GA4 `G-DDY0H0319S`, Google Ads tags. Shared scripts emit lead/intent events; source tests cover no contact PII in analytics. |
| Authentication | Assistant session/capability handling; private saved-analysis bearer links; MCC server access code; legacy administrative pages have client-side controls. Those controls do not make static files private. |
| Images/fonts | WebP portraits and other optimized images coexist with larger PNG/JPEG assets. Google Fonts preconnections and `display=swap`, async stylesheet loading, lazy below-fold images. |
| SEO/entity layer | Titles, descriptions, self canonicals, robots, XML sitemap, JSON-LD organization/person/articles/breadcrumbs/FAQs, author links and Texas service-area content. |
| Caching/security | Netlify CDN/compression, HSTS, nosniff, referrer and permissions policies; private saved-analysis CSP and no-store headers. |

## Ranked fixes

| Priority | Confirmed defect | Implemented correction | Validation and limits |
|---|---|---|---|
| P1 | `generate-newsletter`, `generate-realtor-content`, and `send-correction` HTTP handlers can reach publishing/email operations without authenticating. Protecting `dispatch` alone does not protect these directly addressable handlers. | Shared, fail-closed bearer guard using existing `DISPATCH_SECRET`, timing-safe comparison and Authorization CORS support. Guard runs before parsing/provider work. Missing configuration returns 503; missing/incorrect credentials return 401. Core generator exports remain callable by the authenticated dispatcher/cron. | Handler tests reject unauthenticated malformed requests before side effects. OPTIONS/GET behavior and valid guard credentials tested. No live destructive probe. Legacy dashboard clients currently omit Authorization and need an authenticated operator flow before these endpoints are used through that UI. |
| P2 | `lead-intake` accepts non-object JSON and calls string methods on unvalidated email values, causing exceptions; oversized payloads can reach downstream processing. | Reject arrays/null, require a bounded email string, and cap request bodies at 64 KiB. Honeypot behavior, consent, field names and durable capture remain unchanged. | Mocked tests prove invalid input causes no external requests. Existing capture/outbox/attribution/marketing-consent tests pass. Email syntax check is intentionally conservative and is not mailbox verification. |
| P2 | Contact dialog advertises `aria-modal` but lets focus reach background controls; Escape handling does not cover the embedded form document. | Preserve/restore sibling inert state, isolate late-added siblings, wrap boundary Tab navigation, handle Escape within same-origin iframe and cancel stale close timers on reopen. | Browser confirms all non-panel body siblings are inert while open, Shift+Tab wraps to the last dialog link, Escape inside the form closes it and focus returns to the initiating link. No form markup or visual design changed. |
| P2 | `/assets/*` and favicons use year-long immutable caching although names such as `og-image.png` and `assets/utm.js` are stable across edits. | Require conditional revalidation for stable asset/favicons. Existing ETags/CDN still support reuse. | TOML reviewed; live baseline proves old immutable policy. New headers are local only. Existing browser entries pinned by old headers may require a versioned URL at release; header changes cannot retroactively expire a previously cached response. |
| P2 | Dependencies resolve afresh because `package-lock.json` is ignored. | Track the generated lockfile and remove its ignore rule. | Clean locked install passes and reports no known vulnerabilities. No deliberate major-version upgrade or new package. |
| P2 | Stored assistant request counters use separate read/write operations; concurrent requests can lose increments. | Add Netlify's native per-IP request limit of 30/minute, supplementing existing session/conversation limits. | Config type check and declaration test pass. Stored counters remain approximate; Netlify enforcement is also subject to platform counting timing. Deployment logs and hosted behavior still require verification. |
| P3 | Malformed percent-encoding throws outside the local server's callback; root-prefix comparison can admit sibling-directory paths. | Return 400 for malformed URI encoding and enforce the root-directory separator boundary. | Malformed request returns 400, followed by a healthy homepage 200; syntax check passes. This is the loopback development server, not Netlify production routing. |

## Crawl, technical SEO and AI discoverability

All 163 URLs in the live sitemap were fetched: 163 final HTTP 200 responses, 163 self-referencing canonicals, one H1 each, no detected meta noindex and no JSON-LD parse errors. No duplicate titles were detected in that set. The source SEO audit also reports zero issues. All 475 source JSON-LD blocks pass the existing class-vocabulary/JSON audit. This is not a claim of eligibility for every Google rich result or a full visible-content parity certification.

The packaged static inventory contains 201 HTML files, including internal, utility and intentionally excluded pages. It has no detected missing image alt attributes or duplicate element IDs. The only path initially reported missing, `/apply-now/`, is a TOML redirect; live verification reaches the secure application portal successfully. Duplicate placeholder newsletter titles occur on three intentionally excluded test pages and are not duplicated sitemap pages.

Extensionless contact redirects to `/contact.html`; `get-preapproved?intent=scenario` retains that query when redirected; an unknown URL returns a real 404. Source and repository metadata probes return 404. Important resources and articles have static readable content, links and author attribution. No speculative AI-ranking mechanism was added.

Robots rules explicitly allow named AI crawlers. Their specific allow groups do not inherit the wildcard group's disallows. This makes the public/private boundary depend on actual access controls and public packaging, not crawler politeness. Do not store private material in any publicly packaged file.

Google's current guidance continues to make crawlability, indexable content, useful page content and accurate visible structured data foundational to AI search visibility; it does not guarantee inclusion. See [Google's AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). The audit leaves existing visible FAQs/entity facts intact rather than inventing schema claims or new business roles.

## Performance observations

The static architecture avoids framework hydration and large framework bundles. Live CSS is Brotli compressed. One homepage transfer measured 21,362 compressed bytes from 96,893 raw HTML bytes, with 0.656-second TTFB; one stylesheet transfer measured 16,115 bytes and 0.371-second TTFB. These are individual requests from this workstation, not mobile field percentiles or a performance SLA. The concurrent sitemap fetch median was 0.576 seconds end-to-end; that includes transfer and is not TTFB.

Shared raw sizes: `script.js` 44,571 bytes, assistant widget 33,392, analytics 5,112, experience 2,437; `style.css` 88,272, advisory design 51,372, editorial system 10,749. Actual loading differs by page and includes third-party tags. Raw file sizes are not unused-byte estimates.

The 847,670-byte OG image is a social preview asset and was not an observed homepage LCP image. Large source assets exist, including a 5 MiB duplicate cutout and original photos; their existence alone does not establish a visitor download or justify deleting them. Below-fold lazy images with `complete=false` were not incorrectly classified as broken.

Google PageSpeed API returned 429. LCP, INP, CLS, mobile CPU/network-throttled traces, long-task attribution, unused CSS/JS coverage and CrUX field distributions were not established. Browser console/layout checks do not substitute for those measurements. Avoid claiming a score improvement from this work. Next performance work should start with field data and a repeatable throttled trace, then optimize measured bottlenecks.

## Functional, accessibility and device QA

The live homepage was checked at 1920, 1366, 768, 390 and 320 pixels. Document width matched viewport width at all five. The animated review track has offscreen cards inside its intended clipped region, not whole-document overflow.

Ten production-source local routes were checked at 1366 and 390 pixels: homepage, contact, products, calculators, payment, affordability, asset depletion, blog, bank statements and preapproval. All had expected primary headings, no document overflow and no detected broken completed images in the visible viewport. The live DSCR calculator and investor intake were also exercised at mobile width. This is representative coverage, not a screenshot review of every page at every size or a Safari/Firefox certification.

Actual interactions verified:

- Mobile navigation opens with expanded state and exposes program/resource/contact links.
- Empty homepage submission is stopped by native validation and focuses the financing-goal control; no lead is sent.
- DSCR default estimate displays approximately $2,797 P&I, $3,755 PITIA and 0.93 DSCR for the displayed assumptions. Changing rent from $3,500 to $4,500 changes DSCR to 1.20 and rent remaining to +$745.
- Calculator review preserves the analysis in investor intake. Continue opens step 2 and focuses First name. The edited rent and result remain present.
- Local dialog focus containment, embedded Escape, close/reopen behavior and restored focus were checked after the fix.
- No console warnings/errors were observed on the inspected live homepage and calculator/intake journey.
- The secure application destination responds 200. No application account was created; phone/email/SMS actions were inspected without contacting anyone.

Source checks cover amortization/zero-rate math, qualified calculator handoff, loading/failure handling, lead capture/delivery boundaries, attribution, assistant output safety, private analysis and focus behavior. Labels, native controls, status regions, skip links and reduced-motion rules are present in sampled interfaces. A full automated axe sweep, manual assistive-technology review, contrast inventory, zoom/reflow audit and full WCAG conformance assessment were not completed. No WCAG certification is claimed.

## Security, privacy and remaining work

A narrow tracked-source scan found no matches for common long API-token/private-key patterns; values were not printed. This does not replace a full repository-history secret scan or authenticated environment audit. Production HSTS/nosniff/referrer/permissions headers were verified. A restrictive CSP already applies to saved analyses; a new broad enforced CSP was not added without testing GTM, fonts, forms, application and embedded booking behavior.

Saved analysis uses encrypted envelopes, hashed capability keys, private no-store/no-referrer responses, an isolated preview store and a native platform rate limit. Assistant code includes sensitive-input filtering, safe-output handling, consent checks, idempotent transcript persistence and retry queues. Mocked tests verify success/failure reporting; they do not prove the owner received an email.

| Remaining item | Priority and concrete next action |
|---|---|
| Production still runs the pre-fix handlers | P1. Review/release this isolated branch, verify required `DISPATCH_SECRET` configuration without exposing its value, then confirm rejected unauthorized requests and deployed commit. No send operation is needed for auth verification. |
| Legacy dashboard requests omit Authorization | P1 operational dependency. Use the already authenticated dispatcher or implement a proper server-backed administrative login before using direct publishing through this UI. Do not embed the dispatch secret in static JavaScript or browser storage. |
| Public administrative data | P2. `task-reports.json` returns HTTP 200 and is explicitly packaged; administrative HTML is public despite noindex/client-side gates. Review its contents for intended public exposure and move private operational data behind server authorization. No sensitive-data claim is made without a content classification review. |
| Twelve expired assistant knowledge approvals | P2. Current runtime excludes purchase/refinance/document/physician/bridge/FAQ/core-program/mortgage-basics/credit/funds/home-equity/common-scenario material with expired dates. Review the actual current guidance and renew only reviewed files. General fallback remains available. Tests intentionally use the prior review-window fixture and do not mean expired content is active. |
| Intake abuse controls | P2. Main ingress now validates shape/size/email and preserves honeypots. Public legacy subscription endpoints and upstream firewall/rate-limit configuration require further anti-abuse review; CORS alone is not authentication or bot protection. Do not introduce a CAPTCHA that breaks no-JS leads without testing the complete flow. |
| Field performance | P2. Obtain CrUX/Search Console CWV data or a usable PageSpeed run and repeatable mobile traces. |
| Delivery/analytics outcomes | P2. Confirm approved staged lead capture, LoanOS visibility, outbox recovery and notification receipt with controlled test infrastructure. No fake production lead, campaign or social post was made. |
| Full accessibility/cross-browser coverage | P2. Run assistive-technology/contrast/zoom testing and additional browser engines; the responsive Chromium checks do not establish this. |
| Original workspace drift | P2. Keep its existing edits separate from production and reconcile intentionally; never copy that entire workspace into a release. |

Native limiter configuration and deployment validation requirements are documented in [Netlify's function API](https://docs.netlify.com/build/functions/api/) and [rate-limiting guidance](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/). Netlify notes that invalid rate-limit rules do not necessarily fail a deploy, so hosted verification is required.

## Deliverables and release status

The fixes are local to the managed worktree. The original workspace and live site remain unchanged. This report does not describe production defects as already fixed live.

Evidence is saved alongside this report in `evidence/`: original and production-source baseline logs, final test/build/dependency logs, the 163-URL live crawl, live sitemap, static inventory, redirect/application checks, PageSpeed 429 result and syntax/secret-pattern scan. Public packaging excludes this report and those evidence files.

Release sequence: review scoped diff; provide authenticated administrative usage; verify configuration and exact base commit; deploy tested changes; inspect Netlify build/rate-limit logs; verify deployed headers/routes and rejection behavior; repeat desktop/mobile contact/calculator checks. Keep campaign sending, social publishing and lead delivery tests separate from technical release verification.
