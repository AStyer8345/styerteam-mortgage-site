# Styer Mortgage Website Design Strategy and Codex Implementation Brief

October 5, 2026 · Design proposal · No website implementation

The recommended direction is a premium mortgage advisory practice with the precision of a financial tool. The site should make Adam's expertise tangible through authentic photography, clear borrower pathways, documented scenarios, and unusually useful calculators. Its substantial content is an asset. Better presentation should make that expertise easier to recognize and use.

The current site is already moving in the right direction: restrained navy and warm neutrals, editorial headings, strong specialty positioning, and personal service. Its next improvement should be a coherent, distinctive visual identity and more deliberate hierarchy. A dramatic new color scheme or decorative effects would deliver less value than better composition, photography, navigation, proof, and tool interfaces.

## Audit scope and evidence

This audit combines current live visual inspection, rendered text and computed styles, live HTML inspection, a current sitemap inventory, local implementation context, and current reference research. The live sitemap contains 163 URLs. This is a representative design audit across page families, not a claim that every URL received a full visual, accessibility, functional, or performance test.

Live visual inspection covered the homepage; Bank Statement, Self-Employed, Asset Depletion, and High-Net-Worth pages; Mortgage Options; Conventional Loans; Round Rock; About Adam; Testimonials; Scenarios; Resources; the mortgage-offer comparison article; Get Preapproved; and Payment, DSCR, Asset Depletion, and Buydown calculators. Mobile inspection covered the homepage, its form, the specialty-page opening, navigation, and payment calculator. Payment calculator document width was verified at 320 pixels; the principal mobile inspection width was 390 pixels.

Live source inspection additionally sampled Contact, Realtors, Blog, and the Austin DSCR page. Local source revealed a static HTML site with shared CSS, page-specific CSS, scripts, Netlify functions, content generators, and existing SEO and lead-flow tests. The local checkout contains extensive pre-existing changes and differs from live presentation in places. Live rendering governs this audit; local files supply implementation context only.

Review totals, lifetime loan totals, capital-partner counts, program figures, and response-time statements below are statements displayed by the website, not independently verified business claims. Preserve them during visual work, and verify their source before republishing or emphasizing them more strongly. No live lead forms were submitted. No conversion lift, field Core Web Vitals result, or complete accessibility conformance is established by this audit.

## Current website audit

### What is already strong

The [homepage](https://styermortgage.com/) tells a specific story: complex-income expertise for business owners, investors, and people with substantial assets. That is a stronger foundation than a broad promise of excellent rates. Keep the existing H1, “Complex mortgage. Clear path forward.” It is short, memorable, and relevant.

The specialty pages have direct answers, author identity, update dates, key facts, tradeoffs, worked examples, links to alternatives, and substantial FAQs. The [Bank Statement page](https://styermortgage.com/bank-statement-loans.html) demonstrates genuine subject knowledge. The [mortgage-offer comparison article](https://styermortgage.com/blog/how-to-compare-two-mortgage-offers.html) already has a useful answer near the top and an on-page contents list. These are assets to design around.

The site also distinguishes a short inquiry from a formal application, links reviews to their originals, labels composite scenarios, and explains calculator assumptions. Those details contribute more to trust than decorative badges.

### Findings and implications

| Area | Current observation | Design implication |
| --- | --- | --- |
| Overall hierarchy | Warm background, serif titles, and dark header are coherent. Many openings still resemble a title, paragraph, two buttons, and a large empty field or form. | Introduce recognizable compositions for advisory, editorial, and tool pages while keeping one shared system. |
| Homepage hero | The desktop inquiry form dominates the right half. Adam's portrait sits below the main text; the submit action extends below common first-screen heights. | Give the message, advisor identity, and next action an intentional first-screen composition. Treat form placement as a conversion hypothesis. |
| Typography | Live specialty H1 computed as Source Serif 4, 52px, weight 400; body uses Inter. Local base CSS still contains older Playfair Display rules. | Retain the live font pairing, improve role-based hierarchy, and prevent fallback to older styling. A font purchase is unnecessary for phase one. |
| Font sizing and weight | Display type is elegant. Form headings use the same serif language as major page headings. Some labels, disclosures, and metadata become visually small beside large titles. | Reserve the serif for major editorial statements. Use strong sans-serif headings for task interfaces and readable metadata. |
| Color | Navy, cream, white, and muted gold already suggest advisory services. Calculator surfaces and legacy styles introduce inconsistent treatments. | Refine the palette into semantic roles; do not introduce a rainbow of program colors. |
| Whitespace | Some About, local, and conventional hero openings leave a broad unused right side; sections elsewhere have generous but repetitive vertical space. | Use whitespace to separate decisions and give imagery room. Avoid padding that merely pushes useful evidence down. |
| Width and layout | Wide outer containers coexist with narrow articles and differently sized tool panels. | Standardize outer width, reading width, tool width, and alignment lines. |
| Navigation | Desktop header contains five groups, phone, inquiry, and application links. At intermediate widths it becomes crowded or switches to a hamburger. | Preserve destinations, use clearer grouping and an earlier compact breakpoint, and keep one primary action. |
| Mobile navigation | The open menu is a tall list in a white panel against navy; inquiry and application actions do not have a particularly strong hierarchy. | Use a readable navigation sheet with clear section controls and a distinct action area. Validate submenu behavior separately. |
| Buttons | Similar dark and outline buttons carry “See My Options,” “Get Pre-Approved,” “Apply Now,” and “Send My Scenario” on different page families. | Standardize appearance and intent categories. Existing labels and routing remain until explicitly approved. |
| Forms | Labels and optional fields are visible. The quick inquiry can occupy most of a screen, particularly on mobile. | Improve grouping, input treatment, helper text, and action prominence without silently removing fields or changing consent. |
| Cards | Repeated white boxes, top accent borders, and equal-column grids produce a familiar template rhythm. | Use editorial rows, definition lists, featured stories, and comparison tables where boxes do not improve grouping. |
| Icons | The core pages benefit from restraint. The floating assistant uses a largely symbolic sparkle-like mark. | Use consistent functional icons and a readable assistant label; explain what the tool does before a visitor opens it. |
| Photography | Adam's circular headshot and family photo supply authenticity, but the first impression has little distinctive environmental photography. | Commission a coherent portrait and working-context set. Keep family imagery in the personal story. |
| Backgrounds and depth | Cream and white are calm; some tools retain gradient/glow treatments and different panel styles. | Use solid surfaces, rules, restrained tonal changes, and subtle shadows for actual overlays. |
| Motion | Homepage ratings visibly count upward through misleading intermediate values. The Testimonials page also initially displays zero-valued counters. | Render evidence at its final value immediately. Accuracy matters more than animation. |
| Calculators | Payment, DSCR, Asset Depletion, and Buydown interfaces have different result treatments and heading conventions. | Establish one tool design system, with a consistent input/result/assumptions relationship. |
| DSCR contrast | “Rent ÷ PITIA” uses white at 70% opacity on a white parent surface; other result explanation is similarly pale. It is visibly difficult to read. | Explicit foreground/background pairs are a high-priority corrective design requirement. |
| Numeric formatting | Payment calculator displays a formatted loan amount beside an unformatted editable number such as 400000. | Format currency clearly while preserving easy editing and numeric accuracy. |
| Trust signals | Review originals, NMLS identity, scenarios, and licensing are present. Evidence is spread among the hero, track record, reviews, and footer. | Give evidence a concise first-screen role, then substantiate it deeper in the page. |
| Reviews | The homepage includes six reviews with source links. Each is a similar visual unit. | Create a featured relevant quote plus a readable static grid; preserve all existing reviews and their links. |
| Program presentation | Mortgage Options routes by situation; specialist pages answer directly. | Strengthen recognition and comparison while preserving distinct page intent. |
| Mobile homepage | The H1, audience, and CTA are readable. Adam's portrait falls low in the opening; the sticky action bar occupies meaningful vertical space. | Bring identity into the opening more compactly and coordinate all fixed UI. |
| Mobile calculator | Payment results have a bottom summary with a link to assumptions. At 320px the current document width matches the viewport. | Preserve this useful result access. Do not repeat the older overflow finding as a current defect. |
| Conversion | Short inquiry, longer review, call/text, scheduling, and external application are all available. | Establish a clear primary path appropriate to readiness; preserve the full set of functioning paths. |
| Authority | Detailed strategy explanations and honest tradeoffs are the strongest authority assets. | Feature how Adam thinks, rather than adding vague claims about technology or excellence. |
| Consistency | Shared navy/cream styling helps, but tool designs, page padding, CTA labels, and hero patterns still vary. Live pages load multiple layers of shared and specialized CSS. | Build maintained shared primitives and a limited template family; avoid another layer of broad cosmetic overrides. |
| Footer | Rich navigation, locality links, contact details, and disclosures support discovery but create a dense ending. | Improve grouping and typography while preserving the existing link graph and legal text. |

### The four questions above the fold

**Who are you and what do you do?** The current site identifies Adam through the logo and portrait caption, and explains mortgage brokerage in the subhead. Improve the prominence of Adam's role and Texas service area without changing the legal brand.

**Why are you different?** The audience specialty is clear. The method—comparing documentation, financing structure, and lender options—should become a more visible supporting statement and then be demonstrated through scenarios and tools. Use existing substantiated wording.

**Who do you help?** Keep business owners, investors, substantial-asset borrowers, and complex-income borrowers prominent. Keep the existing sentence welcoming first-time and straightforward borrowers. Premium should describe quality of service, not implied wealth eligibility.

**What should I do next?** “See My Options” is an appropriate low-pressure primary action. “Browse Mortgage Options” is a useful secondary path. The secure application should remain easy to find, with its greater commitment made explicit.

## A Recommended creative direction

### Premium mortgage expertise with practical financial clarity

The site should feel like an experienced advisor's practice, with the craft and precision of a modern financial interface. It should be personal, composed, technically capable, and specific to Austin and Texas.

The signature combination is deep ink, warm paper, editorial serif headings, crisp sans-serif interfaces, authentic environmental photography, and original explanatory diagrams. The visual impact comes from contrast, confident composition, and useful detail. Gold is a quiet accent. Technology is demonstrated by fast, transparent tools and a helpful assistant.

Use three recurring visual modes:

1. **Advisory pages:** warm surfaces, strong left-aligned statements, Adam's presence, relevant proof, clear next actions.
2. **Editorial pages:** readable text columns, precise tables, author identity, direct answers, source notes, diagrams.
3. **Tools:** orderly inputs, prominent results, transparent assumptions, accessible charts, clear next steps.

They share typography, navigation, spacing, color, and component behavior. Each has a purpose-specific composition.

Brand hierarchy should remain Adam Styer with the existing HyperSmart affiliation and current legal identity. Do not invent a team, imply private-banking services, introduce a new DBA, or elevate a prospective company transition into current branding. Any later rebrand requires its own verified brief.

## B Visual changes ranked by expected impact

The ranking is design judgment, not a measured revenue forecast. Conversion-sensitive changes need comparison against the current experience.

| Rank | Change | Expected impact | Effort | Implementation boundary |
| --- | --- | --- | --- | --- |
| 1 | Recompose the homepage hero around message, advisor identity, strong primary CTA, and authentic photography | Very high first-impression and clarity value | Medium, plus photography | Preserve H1 and audience copy; form position requires an approved experiment |
| 2 | Fix DSCR result contrast and render trust numbers statically | High usability and credibility value | Low | Correct visual behavior; do not change formulas or claimed values |
| 3 | Standardize typography, spacing, width, buttons, labels, and panel surfaces | Very high site-wide perceived quality | Medium to high | Shared system with scoped rollout |
| 4 | Improve desktop navigation and mobile menu/action hierarchy | High findability and action clarity | Medium | Retain destination URLs and contact/application paths |
| 5 | Replace repetitive section grids with editorial story and comparison compositions | High distinctiveness and readability | Medium | Preserve content, links, and semantic headings |
| 6 | Unify calculators as a coherent financial workspace | High expertise and usefulness value | Medium to high | Retain math, defaults, assumptions, share behavior, and existing capture paths |
| 7 | Present scenarios and reviews as relevant evidence with visible provenance | High trust value | Medium | Keep distinction between composite, strategy review, and funded outcome |
| 8 | Improve specialist pages with contents navigation, fact presentation, and original worked-example diagrams | High for visitors entering from search | Medium | Keep direct answers and detailed content |
| 9 | Elevate About Adam with professional portraits and a fuller working context | Medium to high authority value | Medium | Preserve genuine personal content |
| 10 | Redesign resources and articles as a useful editorial library | Medium to high repeat-use value | Medium | Preserve indexable article URLs and internal links |
| 11 | Coordinate mobile sticky actions, result summaries, and assistant | Medium to high usability value | Medium | Keep mobile access to each capability |
| 12 | Restructure footer presentation and refresh icons | Medium polish and discoverability value | Low to medium | Preserve all current destinations and disclosures |
| 13 | Add a small amount of purposeful motion | Low incremental value | Low | Only after accessibility and performance baselines pass |

Photography and hero hierarchy should lead the creative work. Readability defects should lead the corrective work. A full framework migration is not a prerequisite.

## C Homepage redesign specification

### 1 Header

Use a solid ink header with the existing logo and readable affiliation. Desktop height target: 80px. Mobile target: 64–72px, based on the legibility of the supplied logo. Align content to the same grid as the hero.

Keep the five current primary destinations: Mortgage Options, Tools & Guides, Real Scenarios, For Partners, and About Adam. Use a filled “See My Options” action, a quieter secure-application link, and a readable phone link when space permits. Switch to the compact navigation before labels collide; start testing around 1180–1240px rather than forcing a crowded desktop header.

Mortgage Options opens a modest grouped panel organized around the current borrower situations and traditional programs. Tools & Guides separates tools from reading. Keep parent links navigable and use separate disclosure controls, rather than making the same interaction ambiguously navigate and open.

### 2 Hero

At desktop use a 7/5-column composition, 40–56px gap, inside a 1200px maximum container. The left side holds message and action. The right side holds a commissioned environmental portrait of Adam, cropped at 4:5 or an appropriate landscape ratio. Keep the text on a solid surface.

Keep the existing H1 exactly: “Complex mortgage. Clear path forward.” Set it at approximately 60–64px on wide desktop, weight 400, 1.06–1.1 line height. Preserve the existing audience subhead; set it at 19–20px with a comfortable measure. Keep the specialty eyebrow and Google-review link, but give the H1 first visual priority.

Add a compact identity line near the main message: Adam Styer, Senior Loan Officer; existing NMLS and company identity. Reuse existing verified wording about comparing income documentation, financing structure, and lender options. Do not introduce claims such as AI-powered underwriting, guaranteed approvals, lowest rates, or private banking.

Primary button: “See My Options.” Secondary: “Browse Mortgage Options.” Keep the existing welcome for first-home and simple-refinance visitors. Place the current no-application/no-credit-pull explanation near the inquiry action where it accurately describes that path. Preserve any response-time statement exactly until verified.

The full quick inquiry should remain on the homepage in normal document flow immediately after the introductory hero/proof area. The hero button targets the same form anchor. The existing form fields, optionality, attribution question, consent, routing, and submission behavior remain. This changes form exposure, so it is a proposed conversion experiment, not an assumed improvement. First produce an alternative visual mockup that keeps the form beside the message. Choose between the two based on review and subsequently measured inquiry completion.

Desktop target at 1440×900: header, H1, audience, identity, CTA, photo, and compact proof are visible without scrolling; aim for the same clarity at 1366×768. Use content-driven height, not a full-screen hero. At 390px: headline, audience, identity, and primary CTA should fit within the usable opening screen after accounting for fixed UI. Portrait follows the action and identity. No forced line breaks that fail at narrower widths.

### 3 Concise evidence strip

Use a ruled, compact strip rather than large animated statistics. Display current supported ratings with platform names and links. Additional loan and lender-network claims can appear here only with their source and scope checked. Do not animate evidence or roll numbers from zero. Keep the strip legible at 14–16px and wrap cleanly on mobile.

### 4 What are you planning

Preserve the existing quick inquiry and its anchor. Use a 5/7-column layout: brief reassurance and contact alternatives on the left, form on the right. Name and goal occupy clear rows; email and optional phone can share a desktop row; all fields stack on mobile. Keep all optional fields visible for the initial visual pilot. Do not turn them into a new multi-step flow in the same release.

The form should look carefully designed: 16px input text, 48–52px height, explicit labels, subtle but visible borders, one clear submit button, readable consent, and a strong success/error state. Retain the warning against sensitive financial information.

### 5 Mortgages your bank said no to

Preserve the existing section heading, three scenarios, outcome descriptions, disclaimer, and links. Replace three equally weighted boxes with one featured scenario and two companion stories, using editorial rules and consistent problem/approach/outcome roles. If the current outcomes are reformatted as a visual sequence, retain their exact meaning and conditions.

A featured story can use a restrained documentation diagram rather than a stock home photo. Keep the composite-scenario disclosure immediately adjacent. A visitor must not mistake altered illustrative details for named borrower evidence.

### 6 A mortgage that fits your financial picture

Keep the current three audience groups and all specialty links. Present each as a substantial editorial row: situation title, recognition paragraph, and clearly labeled links. Use a small original line diagram where it explains the qualification approach.

Retain the traditional-income sentence, all-mortgage-options path, home-equity link, and buy-before-selling link. Do not replace substantive pages with a wizard or hide them behind tabs.

### 7 Client and partner reviews

Keep the current heading, all six excerpts, names, source labels, and original-review links. Feature the most relevant existing complex-income review in larger type, with the remaining quotes in a calm static layout. Preserve source attribution and excerpt integrity. No automatic horizontal movement.

On mobile, use a readable vertical list. A manually controlled compact presentation can be considered later, but all quotes must remain discoverable and keyboard accessible.

### 8 Practical answers before you apply

Keep the existing three guides and destinations. Present one lead article with two companion entries using topic labels and concise existing descriptions. Use an original comparison graphic for the loan-offer guide and explanatory graphics for income and rental equity. Avoid unrelated thumbnails.

Add a clearly separate tool row linking existing Payment, DSCR, and Asset Depletion calculators. New homepage tools should initially be links or static demonstrations rather than loading multiple calculators above the fold. Adding this row is a later approved content addition.

### 9 Meet Adam Styer

Use an environmental portrait paired with the existing professional explanation. Keep the personal biography and family photograph, but make the professional portrait the principal image. Preserve About, scenarios, and partner links.

The section should communicate personal accountability: visitors know who will help them and why his review is useful. Do not simulate a team or show fabricated client meetings.

### 10 Service area

Preserve “Based in Austin. Serving borrowers across Texas.” and the community hub link. An original small Texas/Austin locator graphic can support this. Use it as orientation, not as a precise service boundary or claim of offices in every city.

### 11 Frequently asked questions

Keep every current question, full answer, internal link, and associated structured data. Use a narrow reading measure, 20–24px row padding, clear expansion controls, and visible focus. Keep primary positioning and answers above the FAQ; do not use accordions as a substitute for the whole page.

### 12 Final contact invitation

Preserve the existing heading and explanation. Use a dark ink section with one prominent inquiry action, the secure application as a clearly distinct alternative, and call/text access. Target the existing inquiry form rather than adding another duplicate form or modal.

### 13 Footer

Preserve all current links, contact details, locality links, social destinations, licensing, legal entity, and disclosures. Separate the contact/identity block, discovery navigation, service-area links, and legal text using strong alignment and restrained rules. The footer remains substantial, but easier to scan.

## D Complete visual design system

### 1 Color palette and usage

| Role | HEX | Usage |
| --- | --- | --- |
| Primary ink | #142B3A | Headlines, body emphasis, dark sections, primary buttons |
| Deep ink | #0E202C | Hover/pressed primary surfaces, footer base |
| Warm paper | #F6F4EE | Advisory hero and selected editorial sections |
| White | #FFFFFF | Reading surfaces, inputs, tool panels |
| Soft stone | #ECE8DF | Secondary surface separation, quiet comparison areas |
| Body text | #263844 | Main paragraphs and labels |
| Secondary text | #52616B | Helper text, metadata, captions |
| Decorative brass | #A8864E | Rules, small decorative details, chart accents |
| Text brass | #795D31 | Accessible small accent labels on warm paper |
| Border | #D8DCD9 | Nonessential section and panel rules |
| Control border | #7B878D | Input boundaries and controls needing stronger visibility |
| Focus and tool accent | #176B73 | Focus rings, selected tool controls, chart emphasis |
| Success | #1F6A4D | Confirmed completion state, paired with text/icon |
| Error | #A63B32 | Errors and negative values, paired with text/icon |
| Warning | #765B16 | Assumption/incomplete-data labels |

Most surfaces should be white or warm paper. Ink anchors the header, primary actions, selected result panels, and final invitation. Brass should occupy a small fraction of the interface; it is not a background for routine buttons.

Calculated contrast: ink on white 14.62:1; ink on paper 13.29:1; secondary text on paper 5.82:1; text brass on paper 5.58:1; teal on white 6.20:1. Decorative brass on paper is 3.09:1 and must not be used for ordinary small text. These are token-pair calculations, not a conformance claim for all rendered components. Test hover, disabled, transparent, image-overlay, and error states separately.

Links in body text should be underlined; color alone does not identify an action. Informational charts must use labels and patterns/line styles where necessary, not only red/green distinctions.

### 2 Typography

Retain **Source Serif 4** for H1/H2, featured quotes, and selected story headings. Retain **Inter** for body copy, navigation, forms, calculators, tables, and UI headings. The live site already uses this combination. Stronger application will create more value than switching typefaces.

| Role | Desktop | Mobile | Weight and line height |
| --- | --- | --- | --- |
| Homepage H1 | 60–64px | 36–40px; 32–36px at 320px | Serif 400; 1.06–1.1 |
| Interior H1 | 48–52px | 32–36px | Serif 400; 1.1–1.15 |
| H2 | 36–40px | 28–32px | Serif 400; 1.15–1.2 |
| H3 editorial | 24–28px | 22–24px | Serif 400 or sans 600 by role |
| UI section heading | 20–24px | 20–22px | Inter 600; 1.3 |
| Hero lead | 19–20px | 17–18px | Inter 400; 1.55 |
| Long-form body | 18px | 17px | Inter 400; 1.65–1.75 |
| UI body and inputs | 16px | 16px | Inter 400; 1.5 |
| Navigation/buttons | 15–16px | 16px | Inter 500–600; 1.25 |
| Labels | 14–16px | 14–16px | Inter 600; 1.4 |
| Metadata/helper/disclosures | 14px | 14px | Inter 400; 1.5 |
| Eyebrow | 12–13px | 12–13px | Inter 600; modest tracking |
| Principal result | 44–56px | 36–44px | Inter 600; tabular numbers |

Avoid all-caps paragraphs, excessive tracking, italicized financial results, or serif form labels. Keep display tracking around -0.02em at most and verify each font/size combination. Use ordinary sentence case for most interface text.

Use no more than the necessary font files: one suitable Latin serif variable file and one sans variable file, or tightly scoped static weights. Self-host only appropriately licensed files. Provide metric-compatible fallbacks, font-display behavior, and preload only what the first screen needs. Retain a legible text-first experience if fonts fail.

### 3 Spacing

Use a 4px foundation with 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, and 120px steps.

Page section padding: typically 80–96px desktop, 48–64px mobile. Dense factual/tool sections: 48–64px desktop, 32–40px mobile. Hero padding: 48–64px below the header on desktop, 28–36px mobile. Do not apply the same 120px spacing to every section.

Heading to lead: 16–24px. Lead to CTA: 24–32px. Label to input: 8px. Field-group spacing: 20–24px. Panel padding: 24–32px desktop, 20–24px mobile. Paragraph separation: about 16–20px. Use spacing to indicate relationships consistently.

### 4 Grid and width

Primary content max-width: 1200px. Broad tool workspace: up to 1280px only where results need it. Article text: 680–720px, approximately 60–75 characters per line. Narrow form: 560–640px. Wide comparison table: 960–1120px within the normal page grid.

Desktop: 12 columns, 24–32px gutters. Tablet: 8 columns, 24px gutters. Mobile: 4 columns, 16–20px gutters. Outer padding: 24–32px desktop, 24px tablet, 20px mobile, 16px at 320px.

Start layout testing at 320, 390, 768, 1024, 1280, and 1440px. Breakpoints respond to content collision, not device labels. Articles keep their text measure even on ultrawide screens. No fixed card heights for text. Tables can scroll within a labeled container; the page itself must not overflow horizontally.

### 5 Navigation

Solid opaque background, restrained bottom rule, no blur dependency. Dropdown panels use white, 6–8px corners, one modest shadow, semantic group labels, and generous link rows. No full-screen mega-menu on desktop.

Mobile menu opens as a clearly bounded sheet below the header, with explicit close behavior, active/expanded state, keyboard operation, and scrollable contents. Touch targets should be at least 44×44px. Preserve all current parent and child destinations. Support escape, focus restoration, and submenu disclosure without relying on hover.

### 6 Hero variants

Standardize three variants: advisory split with photography; specialist answer with fact panel and inquiry access; compact editorial/tool opening. Keep exact page H1s, direct answers, authorship, and topic ownership. A calculator opening should lead quickly into calculation; a blog opening should lead quickly into reading.

### 7 Buttons and CTAs

Primary: ink fill, white label, 4px radius, 48–52px height, 20–24px horizontal padding, Inter 600. Hover deepens to #0E202C. Secondary: transparent/white surface, ink text, visible neutral border. Tertiary: underlined text with a restrained arrow where useful.

On dark sections use a white primary button with ink text; brass remains an accent. Focus uses a visible 2–3px teal ring with offset; choose an alternate high-contrast ring on dark backgrounds. Disabled controls must look disabled and retain sufficient explanatory text. A loading state keeps the label and button dimensions stable.

Intent system: inquiry is the normal primary path; program exploration is secondary; call/text is immediate personal contact; formal application opens the secure portal. Do not relabel all paths “Get started.” Do not change existing labels or destinations under cover of styling.

### 8 Cards and components

Default panel: white, 1px neutral border, 4–8px radius, no shadow. Use 24–32px internal padding. Cards must represent genuine grouped objects, such as an article, scenario, or calculator result. They should not wrap every paragraph.

Editorial rows use thin separators and aligned text. Featured scenario uses a larger heading, explicit status, and a problem/approach/result structure. Key facts use a definition list or table. Financial comparisons use aligned numbers and clear column labels. Do not use nested clickable cards or hide links until hover.

### 9 Photography

Commission an original set: Adam in a credible working environment; relaxed professional portrait; a genuine consultation or explanatory working scene with permission; Austin/Hill Country architecture and material details; a small personal/family set for About.

Direction: natural window light, realistic skin, neutral wardrobe, warm stone/wood, dark blue accents, confident but approachable posture. Compose images with room for separate adjacent copy. Obtain 4:5, 3:2, and wide crops plus mobile-safe compositions. Do not place essential copy over a busy photograph.

No fabricated client meetings, AI-altered identity, fake office/team imagery, keys-in-hand clichés, generic handshakes, random skyline wallpaper, or trophy-property imagery that suggests only wealthy borrowers are welcome. If new photography is unavailable, reuse the authentic existing portrait in a restrained rectangular treatment and reserve a replacement slot.

### 10 Iconography

One consistent outlined SVG family, typically 20–24px, approximately 1.5–2px strokes. Use icons for navigation, contact, documents, expansion, comparison, and state feedback. Keep them paired with text unless the conventional meaning is unmistakable and an accessible label exists. Decorative icons are hidden from assistive technology. Avoid emoji, mixed icon styles, and shields that imply unsupported guarantees.

### 11 Backgrounds and depth

Use paper, white, and ink section changes to organize the page. Warm stone is for secondary grouping. A single subtle tonal gradient can support an original graphic when it explains depth, but is not a recurring brand pattern. No glass cards, blurred blobs, glow halos, rotating 3D objects, or decorative moving lines.

Borders provide most depth. Shadows are reserved for dropdowns, dialogs, and genuinely raised controls: roughly 0 8px 24px with low-opacity ink. Avoid heavy shadows on all cards. Radius: 4px buttons/inputs, 6–8px panels, up to 12px for genuine dialogs. Circular crops only where an avatar is appropriate.

### 12 Motion

Hover/focus transitions: 120–180ms. Disclosure transitions: up to 180–220ms if they do not impede reading. Small hover changes in underline, border, or color are enough. Do not lift whole card grids or move headings.

No animated ratings, number counters, autoplay hero carousel, parallax, scroll hijacking, cursor effects, testimonial marquee, or page-intro sequence. Core text should be visible before JavaScript. Respect prefers-reduced-motion; avoid persistent will-change on many elements. Charts update when inputs change, with stable labels and a concise accessible result announcement after editing settles.

### 13 Mobile

Message and primary action precede imagery. Keep identity near the message. All fields stack; input text remains 16px or larger. No cropped tables pretending to be mobile layouts. Preserve full table content in accessible scroll regions or meaningful stacked equivalents.

Keep one coordinated bottom action area. Contact strip and calculator result strip should not stack on top of each other. Preserve call, text, and inquiry access when the calculator owns the bottom summary. Position the assistant clear of that area and input controls, account for safe areas and the virtual keyboard, and provide page-bottom padding. Sticky UI must not obscure focused elements, consent, errors, or submit actions.

### 14 Trust and authority

Put identity and relevant evidence close to decisions. Ratings display platform, score, and count when verified, with links to source. Case studies display a status: composite illustration, strategy review, or confirmed closed outcome. Keep privacy and underwriting qualifications adjacent.

Author blocks show name, role, NMLS, verified affiliation, and genuine review/update date. Show what Adam reviewed and why the tradeoff mattered. Capital-partner logos require actual relationship evidence and permitted use; do not add an indiscriminate logo wall. Technology claims require a working capability that users can experience.

### 15 Specialist loan pages

Keep each page's primary intent. Self-Employed explains documentation paths; Bank Statement explains eligible deposits; Asset Depletion explains eligible-asset qualification; High-Net-Worth explains complex financing strategy. Their current URLs, H1s, direct answers, examples, FAQs, internal links, and structured data remain.

Use breadcrumb, specialist hero, direct answer, byline, inquiry access, and current key facts. Add a compact on-page contents list on long pages. Then present current material with a reading column and carefully placed illustrations: who it helps; how it works; worked example; constraints/tradeoffs; alternatives; documentation; relevant evidence; FAQs; technical detail; contact.

This is a presentation model, not permission to reorder every page or invent missing sections. Preserve current section order in the first pilot unless a specific reorder is approved. Core answers remain openly readable. Optional detail can use accessible disclosures with content delivered in the HTML; do not hide all substantial content in accordions.

### 16 Blogs and resources

Resource hub: compact introduction, clear tools-versus-reading organization, topic groups, one featured guide, readable archive. Retain every article destination and existing useful link. Filtering enhances discovery but does not make JavaScript the only access path.

Article: existing H1, author/date, direct answer, contents navigation, narrow reading column, strong H2/H3 hierarchy, diagrams, semantic comparison tables, source links, related reading, and contextual inquiry. Place tools alongside relevant explanations. Do not interrupt every few paragraphs with a sales box. Preserve genuine publication and review dates; avoid a blanket “updated today.”

### 17 Calculators and tools

Use a 5/7 or 4/8 desktop input/result split. Inputs are grouped by loan, property costs, and assumptions. Results display the main estimate, its unit, an exact breakdown, and limitations in the same panel. Use Inter and tabular numerals for results. Keep P&I, PITI/PITIA, and other cost categories explicitly distinguished.

Currency fields should support readable separators, clean editing, numeric keyboards, and precision appropriate to the value. Sliders supplement typed inputs. Every unit toggle has a labeled selected state. Errors identify the field and preserve other values.

Payment: distinguish entered-cost payment from a complete payment when taxes/insurance are zero or omitted. DSCR: show rent, PITIA, ratio, and rent remaining after PITIA; do not rename the latter net cash flow. Asset Depletion: show eligible assets, deductions, applied assumptions, period, and illustrative monthly income. Buydown: make full note payment, temporary payment schedule, subsidy, and seller-credit effect easy to compare.

Charts are useful only when they answer a question. Prefer a payment composition bar, buydown timeline, sensitivity table, or two-offer cost comparison. Include an equivalent numeric table. Keep assumptions visible and clearly illustrative. Estimates are not approval or executable pricing.

Preserve current formulas, inputs, defaults, validation, URL sharing, exports, and handoffs in the visual pilot. Any suspected calculation error is a separate corrective task with meaningful numeric tests.

### 18 Footer

Contact and identity first; navigation second; locality discovery third; disclosures last. Desktop uses four or five readable columns, depending on preserved link count. Mobile uses labeled groups with comfortable spacing; collapsible groups are optional only if links remain HTML-delivered and accessible. Legal identity and key disclosures remain visible.

### 19 Additional reusable UI

Standardize breadcrumbs; author blocks; key-fact lists; contents navigation; disclosure/FAQ rows; source notes; review attribution; case-study status labels; assumption/warning callouts; semantic tables; form progress; validation summaries; success states; empty states; assistant launcher/panel; calculator result summaries; and related-resource rows.

The assistant should have a readable name such as “Mortgage questions” alongside its icon where space permits. Preserve its existing capability and lead handling. Do not automatically open it or let it compete with the primary inquiry action. Mark AI-generated guidance appropriately and provide a clear route to Adam.

## Original visual and interactive opportunities

| Opportunity | Recommended visual | Why it helps | Priority |
| --- | --- | --- | --- |
| Compare income paths | Original diagram linking tax returns, eligible deposits, 1099/P&L, and eligible assets to review paths | Makes complex-income expertise understandable without requiring visitors to know program terminology | High |
| Bank statement worked example | Deposits → excluded items → expense treatment → ownership → illustrative monthly income | Turns the existing example into a memorable explanation; assumptions stay visible | High |
| Asset qualification | Eligible assets → closing/reserve deductions → applicable weighting → period → illustrative income | Reveals why a large asset balance alone does not settle qualification | High |
| Investor planning | Rent and PITIA bars with ratio and labeled remainder | Makes the DSCR tool useful at a glance without implying net operating cash flow | High |
| Loan-offer comparison | Original anonymized Loan Estimate annotation plus side-by-side fees/payment/cost table | Demonstrates sophisticated practical advice and gives the article a distinctive visual asset | High |
| Buy before selling | Timeline showing current home, new-home closing, interim structure, and later sale | Explains sequencing and risk clearly | Medium |
| Scenario stories | Situation → obstacle → evidence → approach → outcome/status | Shows reasoning and preserves the distinction between planning and funded results | High |
| Texas service area | Small bespoke Austin/Texas locator illustration | Adds place and personality without a heavy embedded map | Medium |
| New offer comparison tool | User-entered rate, points, fees, balance and holding period, with visible assumptions | Potentially strong evidence of competence; requires a separate scoped product/math brief | Later |

Use lightweight original SVG diagrams with equivalent text. Keep important labels as accessible text, not only pixels. Do not generate stock fintech illustrations to fill space. Static diagrams should come before complex new interactive tools; existing calculators already provide a substantial technology foundation.

## E Current reference websites and transferable patterns

These are pattern references, not endorsements or measured conversion benchmarks. Current pages were inspected in October 2026. Borrow their underlying design logic, not their branding, imagery, claims, or entire layouts.

| Reference | Specific pattern | Why it works | Adaptation for Adam |
| --- | --- | --- | --- |
| [Rothschild & Co Wealth Management](https://www.rothschildandco.com/en/wealth-management/) | Large restrained serif title; architectural photography paired with concise explanatory text; clearly labeled scale figures and dated insights | Composition and real context create institutional confidence while editorial content demonstrates expertise | Use the image/text relationship, precise metadata, and quiet hierarchy for About and specialist storytelling. Retain a clearer mortgage CTA. |
| [J.P. Morgan Private Bank](https://privatebank.jpmorgan.com/nam/en/home.html) | Distinct “What We Do” and “Who We Serve” navigation; major photographic editorial story; substantial specialist insights | Visitors can identify either their situation or needed service. Knowledge contributes to authority | Preserve the current borrower/program pathways and elevate useful guides. Avoid copying the rotating hero and oversized first-screen media. |
| [Bessemer Trust](https://www.bessemertrust.com/) | Consistent institutional green, serif type, real office imagery, prominent Insights & Education | A controlled identity and credible setting create continuity and confidence | Apply the consistency and genuine professional setting to Adam. Its persistent side navigation and full-screen composition are unsuitable for this smaller mortgage journey. |
| [Mercury](https://mercury.com/) | Clear primary action alongside a lower-commitment demo; products grouped by concrete business tasks; customer stories tied to use cases | The visitor can act or explore, and technology is shown through useful capabilities | Pair “See My Options” with tools/program exploration and show practical tool interfaces. Avoid copying its expansive ambient hero effects. |
| [Wealthsimple](https://www.wealthsimple.com/en-ca) | Confident typography, limited color, clear product naming, differentiated product/editorial sections | Strong contrast and deliberate scale make a broad financial offering feel intentional | Borrow the decisiveness of headings and clear interface roles. Its current prize campaign and cinematic media are not appropriate brand directions for Adam. |
| [Savills](https://www.savills.com/) | Clear service-oriented entry, location context, and a substantial research/insights ecosystem | It ties expertise to real property decisions and offers deep content without treating it as clutter | Give Austin/Texas a genuine visual presence and organize the resource library around decisions. Keep the mortgage-specific H1 and simple lead path. |

Additional research included Better, Foster + Partners, and Sotheby's International Realty. Better's homepage remained in a loading state during visual inspection, Foster's principal media did not render reliably in the observed view, and Sotheby's did not return a usable research fetch. They are not used as primary visual evidence here.

The recommended mix is Rothschild's editorial composition, J.P. Morgan's audience/service clarity, Mercury's practical task design, and Adam's own personal credibility. These references do not establish that luxury aesthetics alone increase mortgage inquiries.

## SEO AEO and GEO protection rules

Preserve every indexable URL, redirect, canonical, title, meta description, primary topic, H1, semantic section heading, anchor, FAQ question/answer, and valuable internal link unless a separate explicit change is approved. Preserve robots/noindex behavior, sitemap membership, structured data, author/entity identity, and the assistant knowledge sources.

Keep primary answers, examples, qualifications, and substantial explanations in server-delivered HTML. Presentation can improve using widths, grouping, tables, diagrams, and accessible disclosures. Do not replace the article with a client-rendered summary, make the assistant the only answer source, or load core answers only after interaction.

Visible content and structured data must retain parity. Do not add unsupported review markup, fake ratings, fabricated author credentials, or “AI schema.” Google's current guidance says AI search features use normal SEO fundamentals and have no additional special technical requirements. It also emphasizes keeping important content in text and structured data aligned with visible content. [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)

For this phase, preserve existing FAQ markup rather than changing it to chase a promised rich result. An accordion does not justify deleting the answer from the HTML. Content quality, clear intent, links, and crawlability remain central.

## F Codex implementation brief

### Objective and authorization boundary

When Adam explicitly authorizes implementation, improve the visual design of the existing mortgage site using the approved design strategy above. This document is a design proposal; its existence does not authorize website changes or production deployment. The initial work should create a reviewable preview with preserved content and behavior.

The intended impression is serious, premium, modern, technologically competent, and personally trustworthy. Follow the specified ink/paper palette, Source Serif 4/Inter hierarchy, restrained surfaces, authentic photography, editorial layouts, and precise financial-tool UI. Preserve first-time/traditional borrower access.

### Establish the implementation source

1. Inspect repository instructions, current Git state, attached worktrees, remote history, and the current deployed version. The checkout reviewed for this brief has extensive unrelated changes; do not reset, clean, overwrite, or deploy it as-is.
2. Reuse a suitable clean managed worktree if available, or create an isolated worktree from the verified current base. Establish which maintained sources actually generate current navigation, footer, articles, and forms before editing them.
3. Capture an immutable baseline manifest for all 163 current sitemap URLs, then refresh that count at implementation time. Include URLs/statuses, redirects, canonicals, metadata, H1/H2/H3 text, IDs/anchors, FAQs, structured data, internal links, robots behavior, text content, and meaningful image alt text. Baseline the production version and compare local source separately.
4. Capture desktop/mobile screenshots of each template family and record current tool outputs for selected representative inputs. Record existing response/validation/success states using safe non-production testing.

### Protected functional contracts

Inventory each actual live form and source handler before changing markup. Preserve names/IDs where scripts depend on them, form-name fields, Netlify capture, honeypots, the lead-intake function, field names, required/optional semantics, consent text/state, success destinations, errors, UTM and first-touch attribution, referral questions, program/situation context, and all CRM/notification handoffs. The local Bank Statement source includes `bank-statement-quote`; confirm the deployed contract before relying on that name.

Preserve phone/SMS/email links, Calendly destinations, prequalification paths, secure My1003 application routing, calculators, share URLs, exports, assistant interaction/persistence, analytics events, and intentional noindex pages. Do not submit fake production leads. Do not treat an HTTP success, database write, or accepted dispatch as proof of inbox/CRM delivery.

### First preview scope

Build the shared design primitives and apply them to a small representative set: homepage; Bank Statement or another approved specialist; one article; Payment and DSCR calculators; and shared navigation/footer. Use the existing static architecture. Do not migrate the framework, add a CMS, replace forms, change URLs, or rebuild calculators to implement a visual refresh.

Produce desktop and mobile hero alternatives: one with the inquiry form retained beside the pitch, and the preferred photography composition with that same form immediately below the introductory area. Preserve all content and behavior in both. Adam's chosen alternative defines the later conversion experiment.

Correct result-panel contrast and static evidence rendering. Preserve exact numeric values, formulas, and labels. If a mathematical defect is found, isolate it with evidence and propose a separate correction.

Use approved authentic imagery only. When unavailable, show the existing genuine portrait and clearly identify the asset slot in review notes. Do not create fake people, clients, properties, offices, or awards.

### Component work

Create or maintain shared tokens for colors, type, spacing, widths, borders, radius, focus, and transitions. Implement maintained shared navigation, CTA variants, input groups, validation, key facts, scenario/review attribution, author/source blocks, disclosures, article contents, comparison tables, tool result summaries, and assistant positioning. Scope page-specific components deliberately.

Review the existing stack of shared/page CSS before adding more overrides. Resolve incompatible foreground/background pairs and duplicate styling ownership. Do not run a stale navigation synchronization script merely because it exists; inspect its output against the protected destination manifest. Ensure article generators produce the approved design so later content does not revert to an older template.

### Accessibility acceptance

Target WCAG 2.2 AA. Verify text contrast of at least 4.5:1 for ordinary text and 3:1 for qualifying large text; meaningful control boundaries and states need appropriate non-text contrast. Verify semantic headings, labels, errors, status announcements, visible focus, menu operation, focus restoration, expanded states, reduced motion, keyboard calculator operation, and equivalents for chart content. Use 44px touch targets as the design target and ensure focus is never obscured by sticky UI. [WCAG 2.2 reference](https://www.w3.org/WAI/WCAG22/quickref/)

Test at 200% text zoom and narrow reflow equivalent to 320 CSS pixels. Confirm consent, helper text, errors, and submit controls remain readable. Check screen-reader treatment of currency, percentages, dynamic results, and table headers. Automated scans supplement manual checks.

### Performance acceptance

Establish actual baseline field data and lab measurements before the pilot. The field targets are LCP ≤2.5 seconds, INP ≤200ms, and CLS ≤0.1 at the 75th percentile, assessed for mobile and desktop. Lab tests diagnose problems but do not establish field performance. [Core Web Vitals](https://web.dev/articles/vitals)

Use responsive AVIF/WebP images with width/height reserved. Do not lazy-load the actual LCP image; prioritize it appropriately. Lazy-load below-fold imagery. Initial mobile hero image target: roughly 120–180KB where quality permits; treat this as an asset budget, not an unconditional hard limit. Aim for a small font payload, approximately 150KB or less for the two families if licensed subsets permit. Add no animation library for this refresh. No autoplay video, canvas decoration, or large embed above the fold. Scope calculator and assistant loading without breaking their current availability.

Require no unexplained material performance regression against the baseline and inspect any increase in script/font/image transfer. Validate slow connections, failed fonts/images, and content visibility without JavaScript. Do not promise zero SEO risk or guaranteed metric improvement.

### Preservation and functional acceptance

Compare before/after manifests. Each changed route retains topic, H1, protected headings/IDs, substantive text, FAQs, schema, canonicals, metadata, internal destinations, and indexability, except approved differences. Read and run appropriate existing AEO, SEO-governance, lead-flow, review-count, and assistant tests; inspect scripts before execution to avoid unrelated generated-file mutations. Add meaningful regression checks where the change exposes a real gap.

Numerically verify changed tool interfaces with representative amounts, empty values, decimal rates, term changes, zero/omitted housing costs, and edge conditions appropriate to existing formulas. Check that display formatting does not alter stored numeric values. Preserve share/export behavior and assumptions.

Verify menus, accordions, links, in-page anchors, forms, validation, persistence, consent, and assistant access in a safe preview. Confirm full-page screenshots at 320, 390, 768, 1024, 1280, and 1440px. Review long labels and content, not only the initial viewport. Ensure no overlap between contact bars, calculator summaries, assistant, virtual keyboard, and focused controls.

### Review and release sequence

1. Deliver the first preview with side-by-side baseline/proposal screenshots, a changed-file summary, preserved-contract results, functional checks, and measured performance differences.
2. Identify content, claims, label, order, form placement, or new-component changes separately from styling. Do not silently implement them as visual cleanup.
3. After preview acceptance, extend the system across all public template families, including local pages, traditional programs, partner pages, resource archives, and generators. Preserve existing page-specific intent.
4. When deployment is explicitly authorized, release from the exact tested clean commit using the applicable production-release workflow. Verify deployment readiness and commit identity, then independently verify live visual and functional behavior. Keep a known rollback version.
5. Monitor inquiry starts/completions, qualified inquiries, application starts/completions where measurable, calculator use, mobile errors, search landing-page performance, indexing, and Core Web Vitals. Preserve first-touch attribution. Compare traffic mix and readiness as well as totals.

Use staged measurement. Deploying every visual and conversion-flow change at once makes results difficult to interpret. A/B testing needs sufficient traffic; for a smaller site, use a carefully documented staged comparison and treat causality cautiously. Ranking/citation/lead changes must not be attributed to aesthetics alone.

### Definition of done

The site has one coherent visual system, clear first-screen identity and next action, readable tools, authentic visual assets, accessible interaction, and consistent responsive templates. All approved content and functional contracts are demonstrably preserved. Preview, deployment, and live verification are reported separately. The release is complete only after the authorized live version has been checked; a polished local preview is not a live business outcome.
