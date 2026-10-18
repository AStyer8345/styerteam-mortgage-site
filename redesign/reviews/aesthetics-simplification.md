# Aesthetics and simplification review

Agent roles: 4 — Aesthetic design; 7 — Simplification.

## Scope and result

Extended the approved Option 2 navy/bronze stylesheet in `components/styer-visual-overhaul.css`. The alternate emerald palette was removed. The existing `work/orchestration` source tree was not modified.

The stylesheet supports the new homepage and bank-statement template plus original pages marked `body.orchestration-page.legacy-page`. The shared header and navigation drawer remain the UX agent's responsibility. Calculator values, formulas, event handlers, dataset labels, and canvas/SVG geometry were not changed.

Source-level ruling: **approved for assembly**. A rendered 390px/1440px sign-off is **not claimed**. The earlier browser review established that local `file://` navigation is blocked, and no new build has been observed in a rendered browser in this review.

## Visual rules implemented

- White canvas, slate bands, zinc proof surface, navy structural text; bronze reserved for primary action controls. Status badges and ordinary link hovers remain neutral.
- Primary buttons: bronze `#b45309` with white text; hover `#92400e`. Secondary buttons: white with a slate border and navy text. No emerald comparison option.
- Body and technical prose: 16px with 1.7 line-height. Long-form containers use a 780px maximum; direct prose paragraphs/lists inside the reading containers use a 70ch maximum.
- Headings use controlled responsive sizes; original explanatory content and anchors remain present. No line clamps, clipped summaries, or CSS ellipses hide technical substance.
- Interactive buttons, summary controls, and input controls have at least a 44px target height; principal buttons are 48px. Range input hit areas are 44px with a separate 6px visual track, avoiding a thick 44px slider track.
- Home proof cards retain topic, status, obstacle/question, review/strategy, and outcome/stage distinctions. The repeated groups have 18px spacing; the final outcome group carries the visible left rule. Natural height accommodates the full copy.
- The dual contact component gives supporting Tiffany coordination text a light divider and readable supporting scale.
- Bank-statement arithmetic uses a two-column grid on desktop and one column below 900px. Definition lists align labels and values; code/formula text wraps.
- Shared footer uses four columns, two below 1000px, one below 600px. Legal links and disclosures remain visible, with 44px link targets and wrapping email addresses.
- Reduced motion disables nonessential animation/transition/animated scrolling. Legacy animated content is visible without requiring a scroll animation to finish; marquee testimonials become static content.

## Computed contrast ratios

Computed from the sRGB WCAG relative-luminance formula. These are exact flat-color pair calculations, not browser-computed or screenshot-sampled measurements.

| Use | Foreground | Background | Ratio | Interpretation |
|---|---|---|---:|---|
| Navy text on white | `#0f172a` | `#ffffff` | 17.85:1 | Exceeds AA normal text |
| Body copy on white | `#475569` | `#ffffff` | 7.58:1 | Exceeds AA normal text |
| Body copy on slate | `#475569` | `#f8fafc` | 7.24:1 | Exceeds AA normal text |
| Body copy on zinc | `#475569` | `#f4f4f5` | 6.89:1 | Exceeds AA normal text |
| Primary CTA | `#ffffff` | `#b45309` | 5.02:1 | Exceeds AA normal text |
| Primary CTA hover | `#ffffff` | `#92400e` | 7.09:1 | Exceeds AA normal text |
| Control boundary on white | `#64748b` | `#ffffff` | 4.76:1 | Exceeds 3:1 boundary contrast |
| Footer | `#ffffff` | `#0f172a` | 17.85:1 | Exceeds AA normal text |
| Blue chart series on white | `#1d4ed8` | `#ffffff` | 6.70:1 | Clear against the canvas; labels remain required |
| Slate chart series on white | `#334155` | `#ffffff` | 10.35:1 | Clear against the canvas; labels remain required |
| Quiet card divider | `#e2e8f0` | `#ffffff` | 1.23:1 | Decorative only; not used as an input boundary or sole affordance |

## Legacy integration and limits

Legacy pages contain overlapping stylesheets and inline presentation rules. The bridge overrides known hero, card, form, prose, CTA, and table classes. `!important` is limited to presentation properties where legacy code already has important or inline declarations. It does not reset all descendant styles or apply global SVG fill filters.

The builder can mark otherwise unclassified layout panels with `data-sm-surface="white"`, `"slate"`, or `"zinc"`. Old controls without reusable classes can use `data-sm-control="primary"` or another value for outlined secondary treatment. These markers do not change their links or behavior.

The orchestrator was advised to normalize remaining literal green color values in **generated CSS and inline style declarations**, leaving original reference files and behavior-related class names intact. This is needed because the original network contains many template families; a hand-maintained selector list alone cannot prove every old literal has been removed.

CSS-based calculator green accents are mapped to navy/slate. Legacy variable/class names such as `--calc-emerald`, `band-green`, and `tone-green` remain because calculator code uses them as hooks. DSCR status labels and threshold values stay unchanged. Its dynamically styled DOM status dot is overridden with navy; the text continues to convey the status.

Known residual requiring calculator-owner review: `calculator-suite.js` contains a default canvas color array with `#059669`. CSS cannot recolor pixels painted by JavaScript. The stylesheet does not claim to eradicate that canvas color; the orchestrator was informed. Any replacement should change only the palette entry, preserving dataset order, labels, and arithmetic.

## Simplification decisions

| Decision | Why |
|---|---|
| One fixed palette | Prevents alternate-theme branches from remaining in the build |
| Clear primary/secondary button treatment | Keeps contact, browsing, and calculation actions from competing equally |
| Neutral case cards with one outcome rule | Makes the problem and result scannable without three equally emphatic decorations |
| Natural card heights | Avoids cutting facts to force visual symmetry |
| Visible calculator labels and numbers | Meaning never depends on green/red/blue alone |
| Static testimonials and visible animated content | Removes waiting, motion, and hidden-content dependencies |
| Readable footer directory | Preserves crawl paths without turning the homepage into a complete sitemap |
| Local table scrolling | Keeps wide underwriting comparisons intact without forcing whole-page overflow |

## Verification evidence and remaining gates

- The final component parsed through the installed CSS parser without syntax errors during authoring. This is a syntax check, not proof of browser layout or full cascade resolution.
- The contrast pairs above were calculated programmatically.
- Review read the original calculator, specialty, and article markup and their existing CSS. It did not alter or execute loan calculations.
- A real visual pass remains necessary at 390px and 1440px, including one long guide, all calculator result states, both modal states, header/drawer, and footer.
- Browser verification must confirm focus visibility, keyboard operation, absence of horizontal page overflow, legible inherited inline content, and chart label contrast after the orchestrator's generated-color normalization.

Final ruling: **source and palette implementation approved; rendered visual/accessibility approval remains open until observed**.

## Final integration cascade review

After assembly, added explicit static positioning and block layout for `nav.ledger-breadcrumb`, with a wrapping flex list, 16px text, and 44px links. This prevents the inherited global mobile `nav` rule from placing breadcrumbs at the menu's absolute `top:76px` position or hiding them.

Reset `main header:not(.site-header)` on legacy pages to block, static, automatic height, transparent background, and zero inherited chrome padding. This preserves an asset-calculator or article's internal heading instead of applying the site header's fixed container-relative height and flex layout.

Updated the footer directory heading rule to cover the actual H3 markup as well as H2. Shared site-header and drawer geometry remain untouched. CSS parsing still reports zero errors after these changes.

Flagged one assembly cleanup to the orchestrator: the Dallas page still contained its original `.city-breadcrumb` in addition to the new ledger breadcrumb. The duplicated old breadcrumb should be removed or separately reset; the new breadcrumb rule cannot neutralize a differently named old navigation element.

The final navigation scan also identified content navigations (`.page-contents`, `.map-jumps`, `.dscr-jumps`, `.borrower-jumps`, `.city-related`, and unclassed “On this page”/“Next steps” navigation) affected by the old global mobile menu rule. Added a separate scoped `main nav` reset: static positioning, automatic dimensions, wrapping layout, 16px link labels, and 44px targets. Table-of-contents navigations use block layout and keep their original ordered/unordered lists. Explicit `hidden` attributes remain honored. This closes the known source-level risk of hiding crawl paths through the inherited header-menu styling; it still requires rendered confirmation.

## Head Orchestrator integration closure

The calculator owner replaced the shared canvas palette's remaining green entry with slate; arithmetic and dataset ordering are unchanged. The generated-site CSS/inline-style scan reports zero remaining green hex/rgb declaration values. All 70 referenced stylesheet and inline-style blocks parse after fixing one pre-existing unmatched brace in legacy style.css. Tokens are defined on both :root and .orchestration-page, as requested. The completed content-nav and inner-header resets are included in the assembled build. These close the reported source findings; rendered approval is still explicitly open.
