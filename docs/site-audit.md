# Site audit — July 11, 2026

## Executive summary

Styermortgage.com is a hand-built static HTML/CSS/JavaScript site deployed by Netlify from GitHub. It has no CMS or framework. GA4 and Google Ads run through GTM. Public lead capture uses Netlify Forms plus `/.netlify/functions/lead-intake`, which forwards to LoanOS and the existing web-lead automation; the full application is hosted in the the former employer/Arive portal. The current design system is navy, gold, Inter, and Playfair Display and was preserved.

The site already has strong complex-income coverage and a functional scenario funnel. The most material defects in the requested scope were the Realtor page's unsupported nationwide claim, a mailto-only partner form, incomplete scenario intake choices, inconsistent CTA wording, stale/unsupported performance copy, and no canonical evergreen buy-before-you-sell page at the requested route.

## Company and compliance findings

| Issue | URL or file | Exact text | Severity | Recommended correction | Safe without input? |
|---|---|---|---|---|---|
| Unsupported licensing claim | `/realtors.html` | “Primarily Austin and Texas, but we license nationwide.” | P0 | Limit copy to Austin/Texas and qualify availability | Yes; repository identifies Texas licensing only. Corrected. |
| Insecure/unreliable partner workflow | `/realtors.html` | JavaScript `mailto:` submission | P0 | Use Netlify form + server-validated LoanOS intake | Yes. Corrected. |
| Raw application URL shown publicly | `/realtors.html` | `https://styermortgage.com/contact.html | P1 | Use descriptive secure-application anchor | Yes. Corrected. |
| Scenario intake lacked preferred contact method | `/contact.html