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
