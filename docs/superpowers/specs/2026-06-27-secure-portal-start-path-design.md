# Secure Portal Start Path Design

## Goal

Increase the number of ready borrowers who answer questions in Adam's secure online portal without weakening the low-friction scenario path that works well for self-employed, investor, traditional, and complex-income borrowers.

## Positioning

Use `/scenario.html` as the main start page with two clear paths:

1. Send Adam the short version.
2. Answer a few questions in Adam's secure online portal.

The portal should not be framed as the only correct next step. The site should keep the consultative message: Adam can review the situation first, then direct the borrower to the cleanest path. For ready borrowers, the portal is a helpful way to make the first call more efficient.

## Copy Direction

Use plain, Adam-like language:

- "Answer a few questions in my secure online portal."
- "It usually takes 7-9 minutes and helps make our first call more efficient."
- "If you are not sure where to start, send me the short version first."

Avoid leading with "complete a loan application" or "apply now" as the primary language. Those phrases can feel heavier than necessary and may reduce scenario submissions from borrowers who want guidance first.

## Page Placement

### Scenario Page

Make the upper section of `/scenario.html` a two-path start area:

- Primary path: send the scenario.
- Secondary but visually strong path: answer questions in the secure portal.

Both paths should be visible without scrolling on desktop and near the top on mobile. The portal card should mention the 7-9 minute estimate and first-call efficiency.

### Homepage

Keep the homepage hero focused on "Send Your Scenario" and "Book 15-Min Call." Add a clear portal option in the existing contact/start section so ready borrowers see it after the lower-friction introduction.

### Thank-You Page

After a scenario submission, offer the portal as the best next step for borrowers who want to move faster. The wording should reinforce that the portal helps Adam review the file before the call.

### Navigation

Keep the main nav CTA as "Send Your Scenario" for now. Do not switch it to "Apply Now." The nav should preserve the consultative positioning and avoid making cautious borrowers feel forced into a full application.

## Conversion Rationale

This design creates a clearer application path for ready borrowers while preserving the current lower-friction lead capture. It should increase qualified portal starts without sacrificing complex-file conversations or traditional borrowers who are earlier in the decision process.

## Implementation Scope

- Update `/scenario.html` copy and layout to make the two-path choice clearer.
- Strengthen the secure portal option in the homepage contact section.
- Strengthen the portal next step on `/thank-you.html`.
- Add or update regression checks for the portal wording and placement.

## Non-Goals

- Do not add a new multi-step wizard.
- Do not replace scenario submission with the portal.
- Do not change Netlify form handling or lead notification logic.
- Do not make "Apply Now" the dominant site-wide CTA.
