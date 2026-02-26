/**
 * Builds the Claude prompt for realtor-targeted content.
 * Parallel to prompt-builder.js but with peer-to-peer tone,
 * realtor-specific topics, and no rate box.
 *
 * @param {Object} formData - Form data from the dashboard's Realtor Content tab
 * @param {string} pageUrl  - Full absolute URL for the published article
 */

function buildRealtorPrompt(formData, pageUrl) {
  const {
    topic,
    articles = "",
    story = "",
    aiTool = "",
    notes = "",
    category = "",
  } = formData;

  let prompt = `You write weekly content for Adam Styer, mortgage loan originator at Mortgage Solutions, LP in Austin, TX (NMLS# 513013, Company NMLS# 2526130).

This content targets REALTORS — Adam's #1 referral partners. It will be published as an article on styermortgage.com and indexed by Google.

## AUDIENCE: REAL ESTATE AGENTS
You are writing to experienced real estate professionals. NOT homebuyers. NOT consumers.
- They know the market. Don't explain the basics.
- They want actionable intel they can use THIS WEEK with clients.
- They care about: deal flow, market trends, co-marketing ideas, lending insights that help them advise clients, and tech/AI tools that give them an edge.

## ADAM'S VOICE — READ THIS CAREFULLY
Write as Adam — peer to peer with a realtor he works with regularly. Professional but casual.
- First person "I" always. Short sentences. Short paragraphs.
- NOT "dear colleague" formal. NOT slang. NOT consumer education.
- NO buzzwords. NO marketing language. NO hype.
- NEVER use: "leverage", "unlock", "exciting", "thrilled", "navigate", "empower", "game-changer", "take advantage", "don't miss out", "act now", "incredible opportunity", "poised for", "seize the moment", "strategic advantage"
- Sound like: "Quick heads up", "Thought you should know", "Here's something I'm seeing", "Real quick"

## SEO GUIDELINES
- PAGE_TITLE must include the primary keyword/topic AND "Austin" when relevant. Max 60 chars.
- PAGE_DESCRIPTION must be 140-160 chars, include the primary keyword, and end with a call to action.
- Use the topic keyword naturally in the first paragraph and in at least 2 <h2> headings.
- Use descriptive <h2> and <h3> subheadings that a realtor might search for.
- Include 3-5 internal links to relevant site pages (use "../" prefix):
  ../realtors.html (Partner With Adam), ../realtor-resources.html (More Partner Resources),
  ../products.html (Loan Programs), ../calculators.html (Calculators),
  ../prequal.html (Pre-Qualification), ../contact.html (Contact),
  ../about.html (About Adam), ../testimonials.html (Testimonials)
${category ? `- PAGE_CATEGORY: ${category}` : "- Choose a PAGE_CATEGORY from: Market Intel, Co-Marketing, Deal Flow, Tech & Tools, Lending Insights"}

## ARTICLE URL
The full article lives at this exact URL: ${pageUrl}
All email CTA links MUST use this exact URL. Do not make up a different URL.

## TOPIC
${topic}
`;

  if (articles) {
    prompt += `\n## REFERENCE ARTICLES\n${articles}\n`;
  }

  if (story) {
    prompt += `
## ADAM'S PERSONAL NOTE — YOU MUST USE THIS
Adam provided this personal note. Include it naturally — it humanizes the relationship with realtor partners. Use Adam's actual words and details.

Here is Adam's note — use THIS, not something you invent:
---
${story}
---
`;
  }

  if (aiTool) {
    prompt += `
## AI TOOL TIP
Adam wants to highlight this AI tool or tech tip for realtors:
${aiTool}
Include this as a dedicated "Tech Edge" or "AI Corner" section in the web article. Brief but useful — how they can actually use it.
`;
  }

  if (notes) {
    prompt += `\n## ADDITIONAL NOTES\n${notes}\n`;
  }

  prompt += `
## EMAIL RULES
The email should be a SHORT teaser (100-150 words) that gets them to click to the full article.
- Plain-text style. No images. No fancy formatting. Just text with minimal HTML.
- Simple table layout for Mailchimp compatibility, but make it LOOK like a plain text email.
- No hero images, no banners, no graphics.
- Background: white. Text: dark gray (#333). Links: blue.
- Open with a quick, direct hook — something they'd actually read between showings.${story ? " Reference the personal note briefly if it fits." : ""}
- 2-3 bullet points previewing the article content.
- CTA link MUST use this exact URL: ${pageUrl}
- Sign off: Adam Styer | Mortgage Solutions LP | NMLS# 513013 | (512) 956-6010
- Tone: like a quick text to a realtor partner, not a corporate newsletter.

## WEB ARTICLE STRUCTURE
600-1000 words total. Tactical and actionable — realtors are busy.
This article WILL be indexed by Google — write with SEO depth and substance.
CRITICAL: Output ONLY article body HTML fragments — just <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>, <hr>, <img> tags.
DO NOT output <!DOCTYPE>, <html>, <head>, <body>, <style>, <title>, or <meta> tags. DO NOT wrap content in a <div class="container">. The article body gets inserted into an existing page template.

### Main Content
Cover the topic with real substance. Focus on what realtors can DO with this information.
- HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>
- Links use "../" prefix (../realtors.html, ../realtor-resources.html, ../products.html, ../calculators.html, ../prequal.html, ../contact.html)
- Use 3-5 descriptive <h2> subheadings that break up the content
- Include at least 3 internal links to other site pages where relevant
- Keep it practical: "Here's what this means for your clients" / "Here's how to talk about this"
${aiTool ? '- Include a "Tech Edge" or "AI Corner" section about the AI tool tip' : ""}
${story ? `
### Personal Note
A brief section separated by <hr>.
- USE ADAM'S EXACT NOTE provided above
- Keep it short — 2-3 sentences. Realtors appreciate the personal touch but don't need a novel.` : ""}

End the article with: "Let's close some deals together.<br>Adam Styer<br>Adam Styer | Mortgage Solutions LP<br>NMLS# 513013 | <a href=\\"tel:+15129566010\\">(512) 956-6010</a>"

## OUTPUT FORMAT — use these EXACT delimiters
PAGE_TITLE: [max 60 chars, include primary keyword]
PAGE_DESCRIPTION: [140-160 chars, include keyword + call to action]
PAGE_CATEGORY: [one of: Market Intel, Co-Marketing, Deal Flow, Tech & Tools, Lending Insights]
REALTOR_SUBJECT: [direct, professional subject — not clickbait]
REALTOR_PREHEADER: [max 90 chars]

---REALTOR_EMAIL_START---
[Plain-text-style HTML email for Mailchimp. No images. CTA links to ${pageUrl}]
---REALTOR_EMAIL_END---

---REALTOR_WEB_CONTENT_START---
[Article HTML — tactical, actionable content for realtors]
---REALTOR_WEB_CONTENT_END---
`;

  return prompt;
}

module.exports = { buildRealtorPrompt };
