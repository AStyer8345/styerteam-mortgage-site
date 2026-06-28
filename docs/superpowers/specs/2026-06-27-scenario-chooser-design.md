# Scenario Chooser Design

## Goal

Add a scenario chooser that makes Adam Styer's strongest positioning obvious: Austin private wealth mortgage bank for self-employed, investor, and complex-income borrowers. The chooser must still welcome traditional purchase and refinance borrowers so the site does not feel exclusive only to complicated files.

## Placement

Add the chooser to the homepage above the existing lightweight scenario form. The homepage hero can continue sending users to `#contact-form`, but the contact section should first help visitors identify their lane before they submit.

The same chooser can later be reused on `scenario.html`, but the first implementation should stay focused on the homepage to reduce risk.

## Lanes

Show six choices:

- Self-employed / business owner
- Investor / DSCR
- Complex income / high net worth
- Buying a primary home
- Refinance or cash-out
- Not sure where I fit

The first three are the core niche and should appear first. The traditional purchase and refinance lanes should look equally valid, just not lead the hierarchy.

## Copy

Use direct, scenario-first language:

- Heading: "What kind of mortgage scenario are we solving?"
- Support copy: "Pick the closest lane. If it is messy, that is usually where I can help the most."
- CTA after selection: "Continue to the short form"

Avoid language that implies borrowers must be declined, complicated, or wealthy to reach out.

## Behavior

Each lane acts as a button/card. When selected:

- Set a hidden field on the existing homepage form named `scenario_type`.
- Update the textarea placeholder with a lane-specific prompt.
- Scroll to the existing `quick-scenario-form`.
- Preserve the existing Netlify form attributes and lead-intake pipeline.

No new backend, database, or third-party integration is required.

## Form Safety

The existing homepage form must remain:

- `name="quick-scenario"`
- `data-netlify="true"`
- hidden `form-name="quick-scenario"`
- submitted through the current JavaScript capture flow and `/.netlify/functions/lead-intake`

The chooser only adds context to the submission; it must not replace the current lead capture path.

## Visual Direction

Use the existing site design system: restrained cards, compact labels, navy/gold accents, and no marketing-style oversized hero. The chooser should feel like a useful routing tool, not a separate landing page.

Desktop: 3-column grid.

Mobile: single-column cards with stable tap targets.

## Testing

Update the existing lead-flow regression test to verify:

- The chooser renders all six lanes.
- Selecting a lane does not remove the existing `quick-scenario` Netlify form markers.
- The form includes the new `scenario_type` field.
- Existing lead-flow tests still pass.

Run:

```bash
node --test tests/lead-flow-regression.test.js
```

Also run a static scan for conflict markers before completion.
