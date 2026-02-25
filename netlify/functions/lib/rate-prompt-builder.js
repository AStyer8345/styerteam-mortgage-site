/**
 * Builds the Claude prompt for a weekly rate update.
 * Generates: teaser emails (no rates!) + brief web commentary.
 * The rate TABLE is built server-side by rate-page-builder.js — NOT by the AI.
 *
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

  // ──────────────────────────────────────────────
  // EMAIL INSTRUCTIONS
  // ──────────────────────────────────────────────
  prompt += `
## ⚠️  CRITICAL EMAIL RULES — READ BEFORE WRITING ANYTHING

The rate page already has a beautiful table with every rate, APR, assumptions, and disclaimers.
The emails exist for ONE reason: get the reader to click the link and visit the rate page.

ABSOLUTE RULES FOR ALL EMAILS:
1. DO NOT include any specific rate numbers (no "6.875%", no "30-year fixed at X%")
2. DO NOT include any rate tables, grids, or formatted rate data
3. DO NOT list products (no "Conventional", "FHA", "VA" lists)
4. DO NOT summarize the rates in any way — that's what the page is for
5. Keep the email EXTREMELY short — 3-4 sentences max before the CTA link
6. Plain-text style HTML for Mailchimp. White background, dark text (#333), blue links.
7. No images, no banners, no hero sections, no graphics.
8. Sign off: Adam Styer | Mortgage Solutions LP | NMLS# 513013 | (512) 956-6010

The email structure is:
- Line 1: Quick personal hook about rates this week (vague — "rates moved", "good news this week", "some shifts worth noting")
- Line 2: One sentence of context or what it means (still no numbers)
- CTA: Bold link to ${pageUrl} — text like "See this week's rates →" or "Check the numbers →"
- Sign off

That's it. Nothing else. If your email is longer than ~50 words before the CTA, it's too long.
`;

  if (wantsBorrower) {
    prompt += `
### BORROWER EMAIL
- Write like Adam texting a friend: "Hey — rates shifted this week. Put together the latest numbers for you."
- Warm, personal, helpful. NOT salesy.
- The CTA is the star of the email. Everything else is just getting them to click it.
- REMEMBER: zero rate numbers in this email. Zero.
`;
  }

  if (wantsRealtor) {
    prompt += `
### REALTOR EMAIL
- Write like Adam pinging a realtor partner: "Hey — updated rates for the week. Good info for any active buyers."
- Professional but casual. Peer-to-peer.
- Can mention the general direction ("rates came down" / "holding steady") but NO specific numbers.
- The CTA is the star. Everything else just gets them to click.
- REMEMBER: zero rate numbers in this email. Zero.
`;
  }

  // ──────────────────────────────────────────────
  // WEB COMMENTARY INSTRUCTIONS
  // ──────────────────────────────────────────────
  prompt += `
## WEB PAGE COMMENTARY
Write a BRIEF commentary (60-90 words, 1-2 short paragraphs) that appears BELOW the rate table on the web page.
The reader has ALREADY seen all the rates in the table above, so DO NOT repeat or list rates.
- Use Adam's voice. What do these rates mean this week? What's the takeaway?
- Reference the rate direction and any context from the talking points.
- Keep it conversational — this is Adam talking, not a market report.
- End with something casual like "Give me a call if you want to talk numbers" or "Happy to run the numbers for you."
- Output ONLY simple HTML: <p> and <strong> tags. Nothing else. No <div>, no <style>, no wrappers.
- For any links use "../" prefix (../contact.html, ../prequal.html)

## OUTPUT FORMAT — use these EXACT delimiters

PAGE_TITLE: [e.g. "Weekly Rate Update — February 24, 2026" — max 70 chars]
PAGE_DESCRIPTION: [meta description, max 160 chars]
${wantsBorrower ? "BORROWER_SUBJECT: [casual subject — \"Rates this week\", \"Quick rate update\" — NOT clickbait]\nBORROWER_PREHEADER: [max 90 chars, teaser text]" : ""}
${wantsRealtor ? "REALTOR_SUBJECT: [professional but casual subject]\nREALTOR_PREHEADER: [max 90 chars]" : ""}

${wantsBorrower ? `---BORROWER_EMAIL_START---
[Short teaser email. NO RATES. NO TABLES. Just hook + CTA link to ${pageUrl}. Mailchimp-compatible HTML.]
---BORROWER_EMAIL_END---` : ""}

${wantsRealtor ? `---REALTOR_EMAIL_START---
[Short teaser email. NO RATES. NO TABLES. Just hook + CTA link to ${pageUrl}. Mailchimp-compatible HTML.]
---REALTOR_EMAIL_END---` : ""}

---WEB_CONTENT_START---
[1-2 short paragraphs, 60-90 words. DO NOT list rates — the table is already above this on the page.]
---WEB_CONTENT_END---
`;

  return prompt;
}

module.exports = { buildRatePrompt };
