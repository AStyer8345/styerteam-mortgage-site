/**
 * Builds the Claude prompt from dashboard form data.
 */

function buildPrompt(formData) {
  const {
    topic,
    audiences = [],
    rates = "",
    articles = "",
    story = "",
    aiTool = "",
    notes = "",
  } = formData;

  const wantsBorrower = audiences.includes("borrower");
  const wantsRealtor = audiences.includes("realtor");

  let prompt = `You write weekly content for Adam Styer, mortgage loan originator at Mortgage Solutions, LP in Austin, TX (NMLS# 513013, Company NMLS# 2526130).

## ADAM'S VOICE — READ THIS CAREFULLY
Write as Adam — a real human writing to real people. NOT a marketing email. NOT a newsletter template. A person.

TONE: Casual, direct, like a text or quick email to someone you actually know.
- First person "I" always. Short sentences. Short paragraphs.
- NO buzzwords. NO marketing language. NO hype.
- NEVER use: "leverage", "unlock", "dream home", "exciting", "thrilled", "navigate", "empower", "game-changer", "take advantage", "don't miss out", "act now", "incredible opportunity", "market conditions", "poised for", "seize the moment", "strategic advantage"
- Sound like: "Here's the deal", "Real talk", "The short version", "Let me break it down"

## TOPIC
${topic}
`;

  if (rates) {
    prompt += `\n## CURRENT RATES\n${rates}\n`;
  }

  if (articles) {
    prompt += `\n## REFERENCE ARTICLES\n${articles}\n`;
  }

  if (story) {
    prompt += `
## ADAM'S PERSONAL STORY — YOU MUST USE THIS EXACT STORY
Adam provided this personal story. You MUST include it — do NOT make up a different story or ignore it. Use Adam's actual words and details. This goes in the "Personal Corner" section of the web article and should be referenced briefly in the email teasers too.

Here is Adam's story — use THIS, not something you invent:
---
${story}
---
`;
  }

  if (aiTool && wantsRealtor) {
    prompt += `\n## AI TOOL TIP (realtor email only)\n${aiTool}\n`;
  }

  if (notes) {
    prompt += `\n## ADDITIONAL NOTES\n${notes}\n`;
  }

  prompt += `
## EMAIL RULES
Emails should be SHORT teasers (100-150 words) that get them to click to the full article.
- Plain-text style. No images. No fancy formatting. Just text with minimal HTML.
- Simple table layout for Mailchimp compatibility, but make it LOOK like a plain text email.
- No hero images, no banners, no graphics.
- Background: white. Text: dark gray (#333). Links: blue.
- Open with something personal or a quick hook.${story ? " Reference the personal story briefly." : ""}
- 2-3 bullet points previewing the article.
- CTA: a simple text link or small button "Read the full update" linking to [PAGE_URL]
- Sign off: Adam Styer | The Styer Team | NMLS# 513013 | (512) 956-6010

${wantsBorrower ? `### BORROWER EMAIL
- Write like Adam emailing a past client
- Helpful, personal, not salesy
- Focus: what this means for them` : ""}

${wantsRealtor ? `### REALTOR EMAIL
- Write like Adam emailing a realtor he works with regularly
- Professional but casual. NOT "dear colleague" formal. NOT slang.
- Focus: market intel they can use with clients this week
${aiTool ? "- Include a brief 'AI Edge' section" : ""}` : ""}

## WEB ARTICLE STRUCTURE
The full article both emails link to. 400-600 words total. Two sections:

### Section 1: The Market Update
Cover the topic with real substance. Use Adam's voice.
- HTML: <h2>, <p>, <ul>, <li>, <strong>, <a>
- Links use "../" prefix (../products.html, ../calculators.html, ../prequal.html, ../contact.html)
${rates ? "- Include a rate snapshot" : ""}

### Section 2: Personal Corner
A separate section with an <hr> divider and <h2> header.${story ? `
- Header should be something like "Personal Corner" or "Off the Clock" or "This Week Outside of Work"
- USE ADAM'S EXACT STORY provided above about: ${story.substring(0, 80)}...
- Write it in Adam's voice — casual, real, like he's sharing with a friend` : `
- Header: "Personal Corner"
- A brief personal note about faith, family, fitness, or finance`}

End the article with: "Talk soon,<br>Adam Styer<br>The Styer Team | Mortgage Solutions, LP<br>NMLS# 513013 | (512) 956-6010"

## OUTPUT FORMAT — use these EXACT delimiters
PAGE_TITLE: [max 70 chars]
PAGE_DESCRIPTION: [max 160 chars]
${wantsBorrower ? "BORROWER_SUBJECT: [casual subject, not clickbait]\nBORROWER_PREHEADER: [max 90 chars]" : ""}
${wantsRealtor ? "REALTOR_SUBJECT: [professional but casual subject]\nREALTOR_PREHEADER: [max 90 chars]" : ""}

${wantsBorrower ? `---BORROWER_EMAIL_START---
[Plain-text-style HTML email for Mailchimp. No images. Keep it simple.]
---BORROWER_EMAIL_END---` : ""}

${wantsRealtor ? `---REALTOR_EMAIL_START---
[Plain-text-style HTML email for Mailchimp. No images. Keep it simple.]
---REALTOR_EMAIL_END---` : ""}

---WEB_CONTENT_START---
[Article HTML with two sections: market update then personal corner separated by <hr>]
---WEB_CONTENT_END---
`;

  return prompt;
}

module.exports = { buildPrompt };
