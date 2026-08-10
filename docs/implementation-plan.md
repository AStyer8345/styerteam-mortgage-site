# Implementation plan — July 11, 2026

## P0 — immediate risk corrections

| Problem | Proposed change | Files | Risk | Test | Expected impact |
|---|---|---|---|---|---|
| Unsupported nationwide claim | Replace with Texas/Austin-qualified language | `realtors.html` | Low | Text regression/search | Reduce licensing risk |
| Partner form used mailto only | Convert to Netlify/LoanOS form with validation and honeypot | `realtors.html`, tests | Medium | Mock endpoint + form structure tests | Reliable referral capture |
| Public form could invite sensitive data | Add privacy acknowledgment and explicit do-not-send guidance | `scenario.html`, `realtors.html` | Low | DOM assertions | Reduce privacy risk |
| Conflicting stale values | Correct only values verified by repository production configuration; document the rest | audit docs | Low | Repository search | Avoid invented compliance copy |

## P1 — conversion and content

| Problem | Proposed change | Files | Risk | Test | Expected impact |
|---|---|---|---|---|---|
| Homepage positioning too broad | Use target audience headline and explicit CTA distinction | `index.html` | Medium | CTA/order regression + responsive review | Better qualified leads |
| Missing evergreen move-up page | Publish complete buy-before-you-sell guide | `buy-before-you-sell-austin.html`, sitemap | Low | route/meta/link checks | Capture move-up search intent |
| Business-owner content lacks requested article route | Publish author/date/schema article | `resources/mortgage-options-for-business-owners.html`, sitemap | Low | route/schema checks | Build specialist authority |
| Referral positioning generic | Reframe around difficult bank-declined scenarios | `realtors.html` | Medium | content/form tests | More useful partner referrals |
| Internal linking incomplete | Link new pages with scenario, application, calculators, relevant pillars, partners | new pages, homepage | Low | link checker | Better discovery and conversion |

## P2 — performance, accessibility, SEO, maintainability

| Problem | Proposed change | Files | Risk | Test | Expected impact |
|---|---|---|---|---|---|
| Incomplete conversion event coverage | Extend existing dataLayer events without sensitive payloads | `analytics.js`, tests | Medium | event unit/browser tests | Cleaner funnel measurement |
| Content pattern inconsistent | Document and test author/date/description/image/body/service/CTA/disclaimer/schema fields | docs, tests | Low | schema parse test | Easier maintenance |
| No dedicated 404 | Add branded 404 and verify Netlify behavior | future `404.html` | Low | unknown route smoke test | Better recovery |
| Security headers incomplete | Add CSP/referrer/frame/content-type headers after embed inventory | `netlify.toml` | Medium | preview smoke tests | Stronger browser security |
| Legacy content has hard-coded facts | Establish quarterly compliance/content review | docs/process | Low | scheduled inventory | Lower staleness risk |

## P0 — qualified-opportunity funnel (August 10, 2026)

This conversion workstream sits alongside SEO/AEO: search growth is not successful unless it produces financeable, economically worthwhile scenarios. The first release remains review-only until Adam approves a preview.

| Problem | Change | Files | Test | Success measure |
|---|---|---|---|---|
| Every lead can reach the calendar | Show scheduling only after a Priority result; route direct Calendly clicks into the short intake | `analytics.js`, `thank-you.html` | Calendar-gate regression | Priority scheduled rate; zero unqualified website bypasses |
| Intake lacks economic-fit fields | Add loan amount, property value, household-income range, property type, occupancy, contract status, credit range, income type, timing, and situation | `get-preapproved.html` | Required-field and route tests | Completed qualification rate without excessive abandonment |
| No consistent qualification logic | Add one configurable server-side scoring module with Priority, Review, and Specialized routes | `netlify/functions/lib/lead-qualification.js`, `lead-intake.js` | Representative A/B/C scenario tests | Qualified-opportunity rate and tier accuracy |
| CRM alerts lack lead quality | Send tier, score, source, landing page, UTM, and economic fields to LoanOS and n8n | `lead-intake.js` | Payload regression | Lead quality by source and landing page |
| Raw lead count drives optimization | Emit `lead_qualified` and `qualification_result_view`; retain scheduling and application events | `get-preapproved.html`, `analytics.js`, `thank-you.html` | Analytics payload test | Priority leads, qualified booked calls, qualified applications |

### Continuous improvement

- Monday Search Opportunity report: add qualified-opportunity rate and tier mix by landing page/query group before selecting a page to refresh.
- Wednesday content draft: assess whether proposed messaging attracts sophisticated complex-income scenarios or distressed/small-loan intent.
- Friday AEO audit: flag wording such as “loans others can't do,” “bad credit solutions,” and unqualified equity-only positioning.
- Monthly executive review: report Priority/Review/Specialized volume, score distribution, calendar exposure, booked-call rate, application rate, and source quality.
- Quarterly strategy review: compare scoring decisions with actual disposition and closed-loan economics, then adjust environment-controlled thresholds—not UI code.

### Approval gate

Before production deployment, review the threshold values, prospect-facing route language, LoanOS/n8n field handling, GTM mappings, and a browser preview of all three routes. No lead is rejected; Review and Specialized leads are retained for follow-up or future referral routing.
