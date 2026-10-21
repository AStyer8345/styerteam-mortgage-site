# Shared navigation — UX and conversion review

Scope: local-only shared header, navigation styles, and navigation controller. No deployment, routing change, form transport, or notification change.

## Delivered

- `components/header.html`: one shared header with Buy, Refinance, Invest, and Resources disclosures; direct Call / Text links; bronze Apply Online; mobile navigation control.
- `components/navigation.css`: sticky header, desktop dropdowns, mobile navigation panel, focus/touch targets, and existing `--sm-*` token usage.
- `components/navigation.js`: progressive enhancement, Escape/outside dismissal, focus return, breakpoint handling, and active-page support.

## UX decisions

**Apply Online remains visible in the mobile header.** It leads to the existing ledger route `/apply-now/`. The header does not imply an application has been submitted, and the application route's current behavior is unchanged.

**Call and Text are separate direct actions.** Both use `+15129566010`, found in the previously inspected Styer source homepage/contact links. They are visible on desktop and inside the mobile panel. There is no ambiguous combined contact button.

**Buy routes by borrower situation.** Self-employed and asset-rich borrowers can reach their hubs directly. Jumbo and construction remain visible choices. Investor and DSCR pathways have their own disclosure, including the established DSCR cash-out route. Resources exposes calculators, scenarios, guides, team, and reviews without putting every program in the header.

**The menu is ordinary site navigation.** Native `<details>` and `<summary>` provide disclosure behavior. No inappropriate application-style menu roles or custom arrow-key model were introduced. Desktop groups open intentionally with pointer/keyboard activation; opening one group closes its siblings when JavaScript is available.

**The mobile panel appears below the sticky header.** At 1100px and below, the menu toggle exposes the panel and moves focus to its first summary. Its height follows the remaining viewport and it can scroll independently. This is an expanded navigation region, not a modal dialog; it does not trap focus. Moving focus into the page closes it. Apply and the close control remain in the header.

**Escape closes the current layer.** First Escape closes the open program group and returns focus to its summary. A subsequent Escape closes the mobile panel and returns focus to the toggle. Outside pointer/focus dismisses navigation without stealing focus from the outside target. Breakpoint changes do not leave focus inside hidden navigation.

**No JavaScript is required to reach the links.** The unenhanced markup hides the inactive toggle, exposes navigation in document flow, and retains working native disclosures. At mobile widths, the unenhanced header is static so a long menu cannot consume the viewport as sticky content.

**Sticky navigation has anchor clearance.** The controller measures header height, and scoped document scroll padding leaves room above anchor destinations. The brand can wrap at narrow widths instead of forcing horizontal overflow. All principal navigation controls have at least 44px declared target height.

## Integration contract

1. Replace the old header with `header.html`; do not nest both headers.
2. Load `navigation.css` after baseline styles, `orchestration.css`, and `styer-visual-overhaul.css` so legacy generic `header`/`nav` rules are neutralized only for this component.
3. Load `navigation.js` with `defer`.
4. Keep the existing `.orchestration-page` body class and `--sm-*` tokens. This component introduces no replacement color palette or button radius.
5. The script uses `.site-header`, `.nav-toggle`, and `#site-nav-drawer`. It does not share `.mobile-menu` or `#nav`, so existing `interaction.js` listeners do not operate this header.
6. Exact navigation destinations automatically receive `aria-current="page"`. For spoke pages absent from the short menu, set `data-active-nav="buy"`, `"refinance"`, `"invest"`, or `"resources"` on the header or body from the page's known hierarchy. This marks the parent group without falsely marking its hub link as the current page. `/apply.html` is recognized as the existing application alias for highlighting only; no redirect is created.

## Verification

`node work/full-site-buildout/reviews/navigation-dom-check.mjs` passes **12 checks**. All **22 internal header links** are present in the 173-route ledger. The checks cover the unenhanced markup, unique integration selectors, mobile visibility/focus requests, sibling disclosure closure, layered Escape behavior, outside dismissal, contact-link closure, breakpoint focus handling, exact/current-parent highlighting, repeated initialization, and zero network calls. `node --check` passed for the navigation controller.

The DOM test explicitly mocks native details events, media queries, focus, and geometry. It does not establish browser rendering or native accessibility behavior. Hosted/local rendered verification still needs to inspect the assembled page at 390px, intermediate widths, and 1440px, including menu scrolling, sticky positioning, actual focus visibility, keyboard traversal, and contrast. No rendered pass or full WCAG AA claim is made here.

**Roles 3 and 5 ruling: approved for integration on structure, conversion hierarchy, and tested controller behavior.** No outstanding source-level correction remains in the owned navigation files.
