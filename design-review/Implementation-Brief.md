# Styer Mortgage premium homepage — Codex implementation handoff

The homepage should communicate a sophisticated, personal mortgage advisory practice within seconds. The implementation combines warm ivory, deep ink, an authentic portrait, clear typography, real scenario evidence, useful tools, and a direct inquiry path. It retains the current company identity and the complete existing homepage content.

## Review location and scope

Local review: http://127.0.0.1:8767/

Worktree: `/Users/adamstyer/.codex/worktrees/premium-homepage-preview/styermortgage.com`

Branch: `codex/premium-homepage-preview`

Base: production commit `f7e9391fc608ac9cd43b965c257e0df2a24b36cd`. Netlify's published deployment was verified as `6ac2c4ce9295b20008466b5c`, ready, for that commit on October 5, 2026. The dirty primary checkout is a different branch and is not the release source.

This review implements the homepage. Existing loan, article, resource, contact, and calculator destinations remain available in the local package; their existing designs and calculations are retained. A wider visual rollout is specified in Design-Strategy.md and requires its own scoped implementation. Nothing has been pushed or deployed.

## Files and responsibilities

| File | Purpose |
| --- | --- |
| index.html | Server-rendered section order, original copy and contracts, original portrait, new tool entry point |
| premium-homepage.css | Opt-in homepage tokens, typography, layout, components, mobile and focus states |
| premium-homepage.js | Payment teaser using CalcSuite, mobile inquiry target, desktop keyboard submenu behavior |
| tests/premium-homepage.test.js | Metadata, JSON-LD, header, footer, FAQ, form, paragraph, link and script preservation |
| tests/editorial-rollout.test.js | Updated assertion for the deliberately new static homepage order |
| tests/lead-flow-regression.test.js | Updated assertion for authentic larger portrait and relocated unchanged inquiry |
| design-review/serve-preview.py | Local review server, injection-only noindex and submission protections; never deploy this server |
| design-review/homepage-baseline.fixture | Unmodified source homepage baseline for review; not a public page |
| design-review/Design-Strategy.md | Complete creative direction, audit, references, and sitewide design system |

No changes to existing capture functions, routing, application portal, assistant, attribution library, calculator suite, redirects, sitemap, or other public pages.

## Final homepage composition

1. **Navigation.** Keep every parent/child destination, current logo, phone, inquiry, partner links, and secure Apply Now action. Solid navy, readable labels, restrained buttons. Preserve the existing mobile menu owner. Desktop submenu focus and Escape behavior are added locally to this homepage.
2. **Hero.** Keep the exact H1, audience and subhead. Use See My Options as the primary action and Browse Mortgage Options as the secondary. Put Adam's role and NMLS identifiers next to the message. Authentic, uncropped-proportion suit portrait on ivory; no generated identity. Mobile message, actions, and identity precede the portrait.
3. **Proof.** Preserve the current site's 1,000+, Google 5.0/99, Zillow 4.98/45 and 40+ claims with their source links. Present static numbers. These are retained published claims, not independently substantiated by this visual work.
4. **Mortgage paths.** Three editorial columns: business/self-employed, assets/complex income, investors. Preserve all nine specialist links and the traditional mortgage, home-equity and buy-before-sell links. Stack with separators on mobile.
5. **Real scenarios.** Deep ink background and three clear stories. Preserve every problem, approach, outcome and the composite/underwriting disclosure. No invented client or outcome.
6. **Tools.** New small P&I estimator makes competence visible without adding a new financial model. It delegates to `window.CalcSuite.monthlyPayment` and `formatCurrency`. Loan amount, illustrative interest rate and term are editable. Link to the full payment, DSCR, asset depletion and offer-comparison tools. Explicitly exclude taxes, insurance, HOA, MI and fees; the example rate is not an executable quote. Invalid/blank inputs show an error and no stale dollar result.
7. **Reviews.** Six stationary, unique reviews with author, context, rating and original Google review links. Remove only the six redundant ticker copies. No auto-scrolling or star counter animation.
8. **Inquiry.** Original contact form, unchanged byte-for-byte, beside the existing final invitation and its application/phone alternatives. Preserve required goal/name/email/consent, optional phone/message/source, honeypot, all attribution fields, status region and fallback action. CTA navigation focuses the form and keeps the source/label contract.
9. **Guides.** Three original article destinations and full summaries. Editorial rows/cards, restrained labels, clear reading actions. Preserve all content and links.
10. **Meet Adam.** Preserve professional and personal biography and both original casual/family photos. These are existing real assets, not fabricated meetings or scenes.
11. **Service area.** Preserve Austin/Texas statement and directory link.
12. **FAQ.** Preserve five complete question/answer pairs and linked specialist routes, with the existing accordion behavior and JSON-LD.
13. **Footer.** Exact shared footer markup and disclosures remain. Use the new visual treatment only on the homepage. Keep the complete mortgage/tools/partners/location directory; do not replace it with a sparse footer.

## Visual system applied

Ink `#142B3A`; deep `#0E202C`; ivory `#F6F4EE`; white `#FFFFFF`; body `#263844`; secondary `#52616B`; text brass `#795D31`; decorative brass `#A8864E`; border `#D8DCD9`; input boundary `#7B878D`; focus `#176B73`; error `#A63B32`.

Source Serif 4 for display headings and testimonial quotations, Inter for body and UI. Existing self-hosted serif files are reused. Desktop hero 64px, mobile 40px/36px at 320; section titles 40px/32px; body 17–19px; input text 16px. Primary content: 1200px usable width within 1256px including 28px gutters; mobile 20px, 16px at 320. Section spacing 80px desktop/52px mobile. Buttons 50px and 4px corners; input controls 48px; real panels 6px corners. Full design system, loan/article/tool families, imagery rules and references are in Design-Strategy.md.

No glass, blobs, decorative moving backgrounds, oversized pill cards, autoplay carousel or page-intro gate. Content is visible on first paint. Hover changes are short color/border changes. Existing reveal decorations are neutralized only on the homepage. Reduced motion remains supported.

## Authentic photograph

Use the existing `/assets/adam-cutout-900.webp`, 46KB. It derives from the existing transparent original, not the imagegen output from the earlier concept. The 3000×3000 original transparent PNG's fully opaque RGB foreground pixels were compared with the original JPG: 100% exact match, mean and maximum difference zero. The 900px delivery image is a resized WebP and is not claimed to be pixel-identical at full resolution. CSS uses `object-fit: contain` and the existing canvas proportions; no facial or body reshaping. The original files are untouched.

## Preservation gates

Automated comparisons against the exact base confirm:

- All original meta tags, canonical, title and JSON-LD scripts unchanged.
- Header, footer, contact form and FAQ markup byte-identical.
- Every original homepage paragraph and existing destination retained. The obsolete homepage stylesheet reference is intentionally replaced; it is not a content destination.
- Every existing external/local capture and tracking script reference retained.
- One H1. All 163 sitemap routes, redirects and existing page families unchanged.
- New code has no transport, contact-data storage or added third-party library. The new teaser uses the existing calculator suite.

Check source contracts separately from local review behavior: the preview server injects noindex, removes analytics loaders and blocks submission/chat mutations. Those protections are not written into production index.html. The production form still has its original Netlify and custom capture contracts. Do not copy injected preview HTML into a release.

## Verification and remaining release boundary

See Verification.md for results, screenshots and limits. Existing tests include lead routing, attribution, capture behavior, calculator mathematics, and assistant safety. Browser checks cover desktop/mobile fit, original images, navigation, CTA focus, local form interaction, FAQ and teaser edge cases.

Local verification does not prove production delivery, owner alerts, inbox receipt or conversion lift. Field Core Web Vitals are not measurable from this isolated review. The source is ready for design review, not a claim of a production business result.

Before a future release: obtain the user's concrete design approval; inspect the then-current production deploy and reconcile any newer technical-audit/release changes; retain the same capture/SEO gates; use an isolated release checkout. Commit and push only the intended files, verify the exact tested commit reaches ready deployment, and inspect live desktop/mobile forms and links. Do not submit fake production inquiries or change crawl/indexing settings merely to test visuals. Keep rollback to the previously deployed commit available. Never deploy the dirty original checkout.

## Review and resume commands

From this worktree, `python3 design-review/serve-preview.py` serves the prepared `.site-dist` package on loopback port 8767. To refresh the package, run `node scripts/package-public-site.mjs` after including new public assets in Git's index. `CONTEXT=deploy-preview npm run build` performs the established build without production indexing submission. Preserve the committed recent-updates fallback if the history-based generator changes it incidentally during local review. Run `npm test`, `npm run seo:audit`, `npm run typecheck` and `git diff --check` before any release.
