/**
 * Builds the Claude prompt from dashboard form data.
 * @param {Object} formData - The form data from the dashboard
 * @param {string} pageUrl - The full absolute URL for the article page
 * @param {string|null} voiceGuide - Full voice guide text from Supabase (optional)
 */

function buildPrompt(formData, pageUrl, voiceGuide) {
  const {
    topic,
    audiences = [],
    articles = "",
    story = "",
    aiTool = "",
    notes = "",
    category = "",
  } = formData;

  const wantsBorrower = audiences.includes("borrower");
  const wantsRealtor = audiences.includes("realtor");

  // Build voice section — use Supabase voice guide if available, fall back to hardcoded
  const voiceSection = voiceGuide
    ? `## ADAM'S VOICE & PERSONAL FACTS — READ THIS CAREFULLY
The following is Adam's complete voice guide. Follow it exactly. NEVER fabricate personal details — only use facts from this guide.

${voiceGuide}`
    : `## ADAM'S VOICE — READ THIS CAREFULLY
Write as Adam — a real human writing to real people. NOT a marketing email. NOT a newsletter template. A person.

TONE: Casual, direct, like a text or quick email to someone you actually know.
- First person "I" always. Short sentences. Short paragraphs.
- NO buzzwords. NO marketing language. NO hype.
- NEVER use: "leverage", "unlock", "dream home", "exciting", "thrilled", "navigate", "empower", "game-changer", "take advantage", "don't miss out", "act now", "incredible opportunity", "market conditions", "poised for", "seize the moment", "strategic advantage"
- Sound like: "Here's the deal", "Real talk", "The short version", "Let me break it down"`;

  let prompt = `You write weekly blog content for Adam Styer, mortgage loan originator at Mortgage Solutions, LP in Austin, TX (NMLS# 513013, Company NMLS# 2526130).

This content will be published as a blog article on styermortgage.com and indexed by Google. Write for BOTH human readers AND search engines.

${voiceSection}

## SEO GUIDELINES
- PAGE_TITLE must include the primary keyword/topic AND "Austin" when relevant. Max 60 chars.
- PAGE_DESCRIPTION must be 140-160 chars, include the primary keyword, and end with a call to action.
- Use the topic keyword naturally in the first paragraph and in at least 2 <h2> headings.
- Use descriptive <h2> and <h3> subheadings that someone might actually search for.
- Include 3-5 internal links to relevant site pages (use "../" prefix):
  ../products.html (Loan Programs), ../calculators.html (Payment Calculator),
  ../prequal.html (Pre-Qualification), ../contact.html (Contact),
  ../about.html (About Adam), ../realtors.html (For Realtors),
  ../blog.html (More Articles), ../testimonials.html (Testimonials)
- ⚠️ CALCULATOR LINK RULES: ../calculators.html is a PAYMENT calculator — it estimates monthly payments based on numbers the user enters. It does NOT show rates, look up rates, or tell anyone what their rate would be. NEVER say "see your rate", "find your rate", "what your rate would be", or anything implying the calculator shows rates. Correct usage: "Run your payment numbers", "See what your monthly payment could look like", "Estimate your monthly cost". If someone wants to know their actual rate, they need to contact Adam directly.
${category ? `- PAGE_CATEGORY: ${category}` : "- Choose a PAGE_CATEGORY from: Market Update, Homebuying, Refinancing, Rates, Tips & Guides, Austin Market"}

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
- Use proper HTML tags throughout: wrap every paragraph in <p> tags, use <ul>/<li> for bullet points, <a> for links. Never output raw text with literal newlines — browsers collapse whitespace to a single space.
- LOOKS like a plain text email but is structured with HTML. No images, no banners, no hero sections.
- No hero images, no banners, no graphics.
- Background: white. Text: dark gray (#333). Links: blue.
- Open with something personal or a quick hook.${story ? " Reference the personal story briefly." : ""}
- 2-3 bullet points previewing the article.
- CTA link MUST use this exact URL: ${pageUrl}
- Sign off: Adam Styer | Mortgage Solutions LP | NMLS# 513013 | (512) 956-6010

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
The full blog article both emails link to. 800-1200 words total. Two sections.
This article WILL be indexed by Google — write with SEO depth and substance.
CRITICAL: Output ONLY article body HTML fragments — just <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>, <hr>, <img> tags.
DO NOT output <!DOCTYPE>, <html>, <head>, <body>, <style>, <title>, or <meta> tags. DO NOT wrap content in a <div class="container">. The article body gets inserted into an existing page template.

### Section 1: The Main Article
Cover the topic with real substance and depth. Use Adam's voice.
- HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>
- Links use "../" prefix (../products.html, ../calculators.html, ../prequal.html, ../contact.html, ../blog.html)
- Use 3-5 descriptive <h2> subheadings that break up the content
- Include at least 3 internal links to other site pages where relevant
- Write 600-900 words in this section — enough depth that Google considers it valuable

### Section 2: Personal Corner
${story ? `A separate section with an <hr> divider and <h2> header.
- Header should be something like "Personal Corner" or "Off the Clock" or "This Week Outside of Work"
- USE ADAM'S EXACT STORY provided above about: ${story.substring(0, 100)}...
- Write it in Adam's voice — casual, real, like he's sharing with a friend` : `⚠️ NO PERSONAL STORY WAS PROVIDED — SKIP THIS SECTION ENTIRELY.
Do NOT write a Personal Corner section. Do NOT invent personal anecdotes, family stories, or activities.
End the article after the main content — go straight to the sign-off.`}

End the article with: "Talk soon,<br>Adam Styer<br>Adam Styer | Mortgage Solutions LP<br>NMLS# 513013 | (512) 956-6010"

## OUTPUT FORMAT — use these EXACT delimiters
PAGE_TITLE: [max 60 chars, include primary keyword]
PAGE_DESCRIPTION: [140-160 chars, include keyword + call to action]
PAGE_CATEGORY: [one of: Market Update, Homebuying, Refinancing, Rates, Tips & Guides, Austin Market]
${wantsBorrower ? "BORROWER_SUBJECT: [casual subject, not clickbait]\nBORROWER_PREHEADER: [max 90 chars]" : ""}
${wantsRealtor ? "REALTOR_SUBJECT: [professional but casual subject]\nREALTOR_PREHEADER: [max 90 chars]" : ""}

${wantsBorrower ? `---BORROWER_EMAIL_START---
[Plain-text-style HTML email for Mailchimp. No images. CTA links to ${pageUrl}]
---BORROWER_EMAIL_END---` : ""}

${wantsRealtor ? `---REALTOR_EMAIL_START---
[Plain-text-style HTML email for Mailchimp. No images. CTA links to ${pageUrl}]
---REALTOR_EMAIL_END---` : ""}

---WEB_CONTENT_START---
[Article HTML with two sections: market update then personal corner separated by <hr>]
---WEB_CONTENT_END---
`;

  return prompt;
}

module.exports = { buildPrompt };
