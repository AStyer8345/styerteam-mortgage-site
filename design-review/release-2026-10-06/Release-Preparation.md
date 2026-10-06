# Approved premium website release — October 6, 2026

User explicitly requested “push and deploy” after reviewing the completed local design. Release from the isolated `codex/premium-homepage-preview` worktree; primary dirty checkout remains untouched.

Production before release: commit `35cc54578e808d5fdbf3ae69826bd5a282a985c0`, Netlify deploy `6ac45f35fd7f11000904cea0`, state ready. This is the rollback reference.

Merged current production into the approved preview before release. Preserved all intervening admin authentication, publishing authorization, lead-input validation, knowledge refresh, caching, lockfile, modal/focus and competitor-link changes. The single index.html conflict involved old critical CSS for the replaced hero: retained the approved premium stylesheet and composition; the production reveal-script first-paint fix remains. Infrastructure, functions, assistant knowledge, attribution/capture scripts, package scripts and lockfile match current production.

Preservation tests now compare against the current production release (`releaseBaseline` in Page-Inventory.json), while retaining the original design baseline as historical evidence. This protects the newer authorized competitor-link replacements rather than restoring the removed links.

Replaced the worktree-only dependency symlink with an isolated npm ci install from the production lockfile. Local final release verification: 304 tests pass (174 site, 130 assistant), safe build, typecheck, 166-URL SEO audit, diff whitespace check. Desktop 1440 and mobile 390 hero/portrait inspected and mobile navigation exercised after the merge. Public packaging excludes review materials, guards and protected admin files. Knowledge refresh from production resolves the older preview's expired-approval warnings.

Release includes the approved website presentation, authentic portrait, contextual stock photography, Dallas/San Antonio pages and public DSCR cash-out calculator/inquiry path. Private campaign dashboard stays excluded. No advertising, social publishing, messages, fake production inquiries, or new tracking configuration is part of this release.

Retained historical market/program/review claims remain separately documented in Final-Reaudit.md; this release does not certify them or claim measured ranking/conversion gains. Live verification must match the pushed commit to a ready deploy and inspect the resulting public routes. Production delivery/notification testing requires a real authorized lead; do not submit synthetic inquiries.
