# Accumulated Learnings — Daily Optimization Runs

## Template Drift
- Westlake and Buda suburb pages were built from a different template than the other 7 suburb pages. This causes recurring standardization issues (trust bar format, disclaimer text, OG tags, title format). Consider rebuilding from the same template.
- **Runs flagged:** 2026-03-25 (3+ occurrences across runs)

## Trust Bar Standard
- The verbatim trust bar is: `5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013`
- Never use "#1 Austin Mortgage Team" (violates business name rules — company is "Adam Styer | Mortgage Solutions LP")
- Homepage trust bar was fixed 2026-03-24; suburb pages fixed 2026-03-25

## Meta Descriptions
- Keep under 160 characters. Westlake and Buda both exceeded this (178 and 192 chars respectively) before fix.
- Include: city name, "mortgage lender" or loan type, phone number, differentiator (independent broker)

## NMLS Disclaimer
- Always use the full verbatim disclaimer from styermortgage-context.md
- Short disclaimers ("This is not a commitment to lend") are insufficient
- Must include NMLS Consumer Access link

## Schema Markup
- All suburb pages now have: FAQPage (5 Qs each), BreadcrumbList, LocalBusiness
- All loan pages have FAQPage schema
- Homepage has FAQPage + MortgageBroker + AggregateRating

## Content Strategy
- Cash-out refi is high-intent keyword — Texas Section 50(a)(6) rules are unique differentiator
- All 8 primary keyword clusters now have dedicated content (as of 2026-03-24)
- Next content opportunities: VA loan deep dive, investment property financing, suburb-specific blog posts

## Conversion Tracking
- Events confirmed firing: generate_lead (purchase_prequal + refi_quote + quick_quote), thank_you_page_view, phone_click, calendly_click
- GTM container GTM-PQQ6PGLR installed on all public pages
- Google Ads conversion fires on thank_you_page_view

## Infrastructure Notes
- NotebookLM script at `/Users/adamstyer/loanos/scripts/notebook_advisor.py` — not available on all machines
- Netlify auto-deploys on push to master
- Google Fonts async pattern prevents render-blocking (fixed 2026-03-21)
