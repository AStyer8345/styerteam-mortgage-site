# Premium homepage verification

Completed October 5–6, 2026, in the isolated `codex/premium-homepage-preview` worktree. Production was inspected read-only; no push, deploy, public indexing submission or production inquiry was performed.

## Automated checks

- Full test suite: **259 passing** (132 site checks and 127 assistant checks), zero failures.
- Four new preservation checks compare against production base `f7e9391fc608ac9cd43b965c257e0df2a24b36cd`.
- Build: passed using `CONTEXT=deploy-preview`. Form, attribution, schema, navigation, design sync, knowledge bundling and public packaging checks passed. The existing expired knowledge approvals are reported and excluded by the assistant runtime; this work does not change them.
- TypeScript check: passed.
- SEO audit: **163 sitemap URLs, zero issues**.
- Form notification audit: 68 contact forms; 60 Netlify and 8 approved custom.
- Attribution check: 47 forms, zero pending changes.
- Schema audit: 479 JSON-LD blocks validated, zero corrections.
- Shared navigation: 195 HTML files pass.
- `git diff --check`: passed.

Metadata/canonical/JSON-LD, header, footer, FAQ and the inquiry form were checked against the base. Header/footer/FAQ/form markup are byte-identical. Every original paragraph, destination and capture script reference remains. Only the obsolete homepage stylesheet reference is deliberately replaced. The only removed text copies were six animation-only duplicate reviews; all six unique original reviews remain.

## Browser checks

| Width | H1 size | Horizontal page overflow | Original reviews visible |
| --- | --- | --- | --- |
| 320px | 36px | None | 6 |
| 390px | 40px | None | 6 |
| 768px | 37px | None | 6 |
| 1024px | 56px | None | 6 |
| 1280px | 56px | None | 6 |
| 1440px | 64px | None | 6 |

After the hero alignment revision, at 390×844 the primary hero CTA ends at y=530px, including the preview-only banner and navigation. Message and actions precede the portrait; one identity/NMLS caption is placed beneath the portrait. Equal outer grid margins were verified at 320, 390, 768, 1024, 1280, 1440 and 1920px. Desktop column centers match within 0.004px; the mobile columns stack intentionally. No horizontal overflow at any checked width. The targeted preservation/lead-flow/editorial suite passed again: 35 checks. The full-suite result above predates this presentation-only revision. The mobile contact bar is one shared Call/Text/inquiry bar, with the inquiry targeting the original inline contact form. It hides while form inputs have focus.

Mobile menu opens; its mortgage submenu expands; Escape closes the menu. Desktop Tab exposes the submenu, and Escape closes it and returns focus to its parent. FAQ opens with matching visible/ARIA state. Clicking the hero inquiry focuses `#contact-form`. Original CTA source/label fields remain present and are updated by the existing handler.

The illustrative P&I teaser updates using the existing CalcSuite. Browser checks include a $600,000, 0%, 20-year loan returning $2,500/month; blank rate exposes an error; defaults restore $2,528/month on $400,000 at 6.5% for 30 years. Full existing calculator mathematics remain covered by the original suite.

Local form interaction passed with synthetic `example.invalid` data; the preview guard displays “Preview only. Nothing was submitted or saved.” This is intentionally not a production-capture test. All input fields were cleared after the check.

Original suit portrait, casual portrait, family image, and logo loaded. The authentic original PNG's opaque RGB pixels exactly match the original JPG. The delivery WebP reuses the previously existing resized cutout. No imagegen output is used in the implementation.

## Screenshots

- [Desktop first screen](homepage-desktop.jpg)
- [Full desktop homepage](homepage-desktop-full.jpg)
- [Mobile first screen](homepage-mobile.jpg)
- [Full mobile homepage](homepage-mobile-full.jpg)

## Page weight and practical limits

Source homepage HTML decreases from 96,656 to 71,594 bytes (approximately 21,111 to 17,219 compressed bytes). New scoped CSS is 31,544 bytes, approximately 5,793 compressed, replacing the old homepage-specific stylesheet. New homepage JavaScript is 3,128 bytes, approximately 1,187 compressed. The teaser also loads the existing calculator suite; the hero reuses a 46KB WebP. These are file-size observations, not real-user Core Web Vitals measurements.

This is a functional local implementation review. It does not establish production notification delivery, inbox receipt, applicant outcomes, conversion improvement, field LCP/INP/CLS, or complete accessibility conformance. A release should be evaluated on the then-current production base and followed by live visual/link checks and legitimate lead-outcome monitoring. The complete wider site redesign remains specified rather than implemented.
