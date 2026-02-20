/**
 * Builds the Claude prompt from dashboard form data.
 * Generates 3 outputs: borrower email, realtor email, and web page content.
 */

function buildPrompt(formData) {
  const {
    topic,
    audiences = [],
    rates = "",
    articles = "",
    story = "",
    photo = "",
    aiTool = "",
    notes = "",
  } = formData;

  const wantsBorrower = audiences.includes("borrower");
  const wantsRealtor = audiences.includes("realtor");

  let prompt = `You are a content creator for Adam Styer, a mortgage loan originator at Mortgage Solutions, LP in Austin, TX (NMLS# 513013, Company NMLS# 2526130).

## YOUR TASK
Generate the following outputs based on the topic and details provided:
${wantsBorrower ? "1. A teaser email for BORROWERS / past clients" : ""}
${wantsRealtor ? `${wantsBorrower ? "2" : "1"}. A teaser email for REALTORS / referral partners` : ""}
${wantsBorrower || wantsRealtor ? `${wantsBorrower && wantsRealtor ? "3" : "2"}. ` : "1. "}Full web page article content (the page the email links to)

## ADAM'S VOICE
- Direct, warm, conversational - like texting a friend who happens to know mortgages
- Uses contractions naturally (I'm, you're, don't, here's, that's)
- Short paragraphs, 2-3 sentences max
- Confident but never salesy or pushy
- Uses "I" not "we" - this is personal
- Explains complex concepts simply without being condescending
- NEVER use: "leverage your equity", "unlock savings", "dream home", "exciting news", "I'm thrilled", "navigate the market"
- DO use: "Here's the deal", "Let me break this down", "The math is simple", "Real talk", "What this means for you"

## TOPIC
${topic}
`;

  if (rates) {
    prompt += `
## CURRENT RATES
${rates}
`;
  }

  if (articles) {
    prompt += `
## REFERENCE ARTICLES / DATA
${articles}
`;
  }

  if (story) {
    prompt += `
## PERSONAL STORY / ANECDOTE
${story}
`;
  }

  if (photo) {
    prompt += `
## PHOTO — MUST include this image in web content and emails
Web: <img src="${photo}" alt="Adam Styer" style="max-width:100%;border-radius:8px;margin:1rem 0">
Email: <img src="${photo}" alt="Adam Styer" width="300" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:16px auto">
`;
  }

  if (aiTool && wantsRealtor) {
    prompt += `
## AI TOOL TIP (for realtor version only)
${aiTool}
`;
  }

  if (notes) {
    prompt += `
## ADDITIONAL NOTES
${notes}
`;
  }

  // Email instructions
  prompt += `
## EMAIL FORMAT RULES
The teaser emails should be SHORT (150-250 words max). Their purpose is to get the recipient to click through to the full article on the website. They are NOT the full newsletter - they're teasers.

Each teaser email must:
- Open with a compelling 1-2 sentence hook related to the topic
- Include 2-3 bullet points previewing what they'll learn in the full article
- End with a clear CTA button/link that says "Read the Full Update" linking to [PAGE_URL]
- Be valid HTML that works in Mailchimp (inline styles, table-based layout, no external CSS)
- Use Adam's signature block at the bottom

${wantsBorrower ? `### BORROWER EMAIL
- Tone: Educational, personal, "here's what this means for you"
- Color scheme: Navy (#1B2A4A) headers, Blue (#2563EB) CTA button
- Focus on how this helps them personally (buying, refinancing, saving money)
- CTA: "Read the Full Update" linking to [PAGE_URL]` : ""}

${wantsRealtor ? `### REALTOR EMAIL
- Tone: Peer-to-peer, strategic, "here's how to use this with your clients"
- Color scheme: Navy (#1B2A4A) headers, Amber/Gold (#C9A84C) CTA button
- Focus on how they can use this info to help their clients and win more deals
- Include a brief "AI Edge" tip if one was provided
- CTA: "Read the Full Update" linking to [PAGE_URL]` : ""}

## WEB PAGE CONTENT
Full article for the web page — the valuable content the email teases.
- 400-700 words (be concise, no filler)
- HTML tags: <h2>, <p>, <ul>, <ol>, <li>, <strong>, <a>, <hr>
- Internal links use "../" prefix (../products.html, ../calculators.html, ../prequal.html, ../contact.html)
${rates ? "- Include a rate summary section" : ""}
- End with: "Talk soon,\\nAdam Styer\\nThe Styer Team | Mortgage Solutions, LP\\nNMLS# 513013 | (512) 956-6010"

## OUTPUT FORMAT
You MUST use these exact delimiters to separate your outputs. Do not deviate.

PAGE_TITLE: [title for the web page, max 70 chars]
PAGE_DESCRIPTION: [meta description, max 160 chars]
${wantsBorrower ? "BORROWER_SUBJECT: [email subject line]\nBORROWER_PREHEADER: [email preheader text, max 90 chars]" : ""}
${wantsRealtor ? "REALTOR_SUBJECT: [email subject line]\nREALTOR_PREHEADER: [email preheader text, max 90 chars]" : ""}

${wantsBorrower ? `---BORROWER_EMAIL_START---
[Full HTML email for borrowers - valid Mailchimp-compatible HTML with inline styles]
---BORROWER_EMAIL_END---` : ""}

${wantsRealtor ? `---REALTOR_EMAIL_START---
[Full HTML email for realtors - valid Mailchimp-compatible HTML with inline styles]
---REALTOR_EMAIL_END---` : ""}

---WEB_CONTENT_START---
[Full article HTML content - just the body content, not a full page. Use <h2>, <p>, <ul>, etc.]
---WEB_CONTENT_END---
`;

  return prompt;
}

module.exports = { buildPrompt };
