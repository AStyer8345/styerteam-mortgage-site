# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. Netlify Functions handle content generation, email automation, and lead capture. 54+ public pages live (homepage, 8 loan pages, 24 suburb SEO pages, 12+ resource/guide pages, blog, calculators, realtor hub).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

2026-04-12 — Rate Check page + n8n workflow. Created `/rate-check.html` with full SEO (MortgageLender, FAQPage, BreadcrumbList JSON-LD), upload form posting to n8n webhook, 5 FAQs, trust bar. Added "Rate Check" to main nav on all 102 pages. Built and activated n8n workflow `Pf1zWuKAnD4SznSR` (Webhook → Set Fields → Insert Contact + Log Activity + Send Notification Email → Respond to Webhook). Webhook URL: `https://styer.app.n8n.cloud/webhook/rate-check-submission`.

## Active Blockers

| Issue | Priority |
|-------|----------|
| ~~Suburb quick-forms fire `generate_lead` but not `thank_you_page_view`~~ | ~~FIXED 2026-04-08~~ |
| Homepage hero "Apply Now" links to raw 1003 app (bypasses tracked funnel) | LOW |
| `2026-03-06-temp-placeholder.html` — "Oil Prices" post still at temp URL, needs rename decision | MEDIUM |
| `2026-03-30-temp-placeholder.html` — rates post at temp slug, noindexed | LOW |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |

## What's Next

1. Test rate-check form end-to-end (submit test PDF, verify Supabase insert + Outlook email)
2. Rename temp placeholder blog posts to permanent slugs
3. Update about.html LocalBusiness sameAs with real Google CID (placeholder inserted)
4. Tuesday: title tag + meta description audit on all loan type pages
5. Add rate-check.html to sitemap.xml

## Known Issues

- GTM (GTM-PQQ6PGLR) + GA4 (G-DDY0H0319S) installed on all public pages
- Google Ads: Search-1 paused, Suburb campaign spec ready (needs manual setup)
- Content distribution: blog/rates/newsletters auto-post to GBP + FB + IG + LI via n8n + Publer
- SEO: FAQPage + BreadcrumbList schema on all suburb + loan pages, AEO paragraphs on most pages
- All conversion tracking verified: generate_lead, thank_you_page_view, phone_click, calendly_click
- No `.env.local` present locally — expected, not a bug

## Session Protocol

Read /Users/adamstyer/Documents/GOALS.md first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Active Blockers, What's Next only. Never append. Keep under 150 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
