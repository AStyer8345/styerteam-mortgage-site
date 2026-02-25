/**
 * Builds the Claude prompt for a weekly rate update.
 * @param {Object} formData - The form data from the dashboard rate tab
 * @param {string} pageUrl  - The full absolute URL for the rate page
 */

function buildRatePrompt(formData, pageUrl) {
  const {
    rates = "",
    direction = "",
    blurb = "",
    notes = "",
    audiences = [],
  } = formData;

  const wantsBorrower = audiences.includes("borrower");
  const wantsRealtor = audiences.includes("realtor");

  const dirLabels = {
    down: "Rates dropped this week",
    up: "Rates went up this week",
    flat: "Rates are flat / unchanged",
    volatile: "Rates have been volatile / mixed",
  };

  let prompt = `You write weekly rate updates for Adam Styer, mortgage loan originator at Mortgage Solutions, LP in Austin, TX (NMLS# 513013, Company NMLS# 2526130).

## ADAM'S VOICE — READ THIS CAREFULLY
Write as Adam — a real human writing to real people. NOT a marketing email. A person.

TONE: Casual, direct, like a text or quick email to someone you actually know.
- First person "I" always. Short sentences. Short paragraphs.
- NO buzzwords. NO marketing language. NO hype.
- NEVER use: "leverage", "unlock", "dream home", "exciting", "thrilled", "navigate", "empower", "game-changer", "take advantage", "don't miss out", "act now", "incredible opportunity", "poised for", "seize the moment"
- Sound like: "Here's the deal", "Real talk", "The short version", "Let me break it down"

## RATE PAGE URL
The full rate page lives at this exact URL: ${pageUrl}
All email CTA links MUST use this exact URL. Do not make up a different URL.

## CURRENT RATES
${rates}
`;

  if (direction && dirLabels[direction]) {
    prompt += `\n## RATE DIRECTION\n${dirLabels[direction]}\n`;
  }

  if (blurb) {
    prompt += `\n## TALKING POINTS / CONTEXT\n${blurb}\n`;
  }

  if (notes) {
    prompt += `\n## ADDITIONAL NOTES\n${notes}\n`;
  }

  prompt += `
## EMAIL RULES — GENERAL
- Plain-text style. No images. No fancy formatting. Just text with minimal HTML.
- Simple table layout for Mailchimp compatibility, but make it LOOK like a plain text email.
- No hero images, no banners, no graphics.
- Background: white. Text: dark gray (#333). Links: blue.
- Sign off: Adam Styer | Mortgage Solutions LP | NMLS# 513013 | (512) 956-6010

${wantsBorrower ? `### BORROWER EMAIL — THIS IS A TEASER, NOT AN UPDATE
The ENTIRE purpose of this email is to get them to click the link. That's it.
- MAX 40-60 words before the CTA link. Shorter is better.
- One punchy sentence about where rates are this week (DO NOT list specific rates in the email).
- One sentence of context or what it means for them.
- Then a bold, clear CTA: a link to ${pageUrl} with text like "See this week's rates →" or "Check the numbers →"
- That's it. No rate tables. No details. No long paragraphs. The rate page has all the details — the email just gets the click.
- Write like Adam texting a past client: "Hey, rates moved this week. Here's the rundown."` : ""}

${wantsRealtor ? `### REALTOR EMAIL
- Slightly more detail than the borrower email, but still SHORT (80-100 words max).
- Write like Adam giving a realtor partner a quick market intel update.
- Professional but casual. Peer-to-peer.
- Mention 1-2 key rates (30-yr fixed at minimum) so realtors have talking points.
- Focus: what to tell buyers this week, how to use this info.
- CTA: "See all rates and details" linking to ${pageUrl}` : ""}

## WEB PAGE COMMENTARY
Write a SHORT market commentary (100-150 words, 1-2 paragraphs) to appear below the rate table on the web page.
- Use Adam's voice. Explain what the rates mean this week.
- Reference the rate direction and any context from the talking points.
- End with something like "Questions? Give me a call" or "Want to know your options? Let's talk."
- Output ONLY HTML fragments: <p>, <strong>, <a> tags. NO <html>, <head>, <body>, <style>, <div> wrappers.
- Links use "../" prefix (../products.html, ../calculators.html, ../prequal.html, ../contact.html)

## OUTPUT FORMAT — use these EXACT delimiters
PAGE_TITLE: [e.g. "Weekly Rate Update - February 24, 2026" — max 70 chars]
PAGE_DESCRIPTION: [max 160 chars]
${wantsBorrower ? "BORROWER_SUBJECT: [casual subject like \"Rates this week\" — not clickbait]\nBORROWER_PREHEADER: [max 90 chars]" : ""}
${wantsRealtor ? "REALTOR_SUBJECT: [professional but casual subject]\nREALTOR_PREHEADER: [max 90 chars]" : ""}

${wantsBorrower ? `---BORROWER_EMAIL_START---
[Plain-text-style HTML email for Mailchimp. No images. CTA links to ${pageUrl}]
---BORROWER_EMAIL_END---` : ""}

${wantsRealtor ? `---REALTOR_EMAIL_START---
[Plain-text-style HTML email for Mailchimp. No images. CTA links to ${pageUrl}]
---REALTOR_EMAIL_END---` : ""}

---WEB_CONTENT_START---
[1-2 paragraph market commentary as HTML fragments]
---WEB_CONTENT_END---
`;

  return prompt;
}

module.exports = { buildRatePrompt };
