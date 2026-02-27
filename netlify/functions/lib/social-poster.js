/**
 * Social Media Post Generator + Buffer Queue
 *
 * Generates LinkedIn and Facebook posts from newsletter content using Claude,
 * then queues them via Buffer's Publish API.
 *
 * Designed to be non-blocking: failures here should NEVER break the
 * newsletter publish + email pipeline. Callers should wrap in try/catch.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY          — already set (shared with newsletter generation)
 *   BUFFER_ACCESS_TOKEN        — Buffer API access token
 *   BUFFER_LINKEDIN_PROFILE_ID — Buffer profile ID for LinkedIn
 *   BUFFER_FACEBOOK_PROFILE_ID — Buffer profile ID for Facebook
 */

const Anthropic = require("@anthropic-ai/sdk");

// ====================================================================
// MAIN ENTRY POINT
// ====================================================================

/**
 * Generate social posts from newsletter content and queue them in Buffer.
 *
 * @param {Object} opts
 * @param {string} opts.webContent  — The HTML article content from the newsletter
 * @param {string} opts.pageUrl     — The published URL of the article
 * @param {string} opts.topic       — The newsletter topic/title
 * @returns {Object} Results with linkedin and facebook post statuses
 */
async function generateAndPostSocial({ webContent, pageUrl, topic }) {
  const bufferToken = process.env.BUFFER_ACCESS_TOKEN;
  const linkedinId = process.env.BUFFER_LINKEDIN_PROFILE_ID;
  const facebookId = process.env.BUFFER_FACEBOOK_PROFILE_ID;

  if (!bufferToken) {
    console.log("[social-poster] Skipped: BUFFER_ACCESS_TOKEN not set");
    return { skipped: true, reason: "Missing BUFFER_ACCESS_TOKEN" };
  }

  if (!linkedinId && !facebookId) {
    console.log("[social-poster] Skipped: No Buffer profile IDs configured");
    return { skipped: true, reason: "No Buffer profile IDs configured" };
  }

  // Strip HTML tags to get plain text for the AI prompt
  const plainText = stripHtml(webContent);

  // ── Step 1: Generate social posts via Claude ──────────────────────
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = buildSocialPrompt(plainText, pageUrl, topic);

  let aiResponse;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      aiResponse = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      });
      break;
    } catch (apiErr) {
      const status = apiErr.status || apiErr.statusCode;
      if ((status === 429 || status === 529) && attempt < 3) {
        console.log(`[social-poster] Claude API ${status}, retry ${attempt + 1}/3`);
        await new Promise((r) => setTimeout(r, 2000 * attempt));
        continue;
      }
      throw apiErr;
    }
  }

  const aiText = aiResponse.content[0].text;
  const posts = parseSocialResponse(aiText);

  if (!posts.linkedin && !posts.facebook) {
    console.error("[social-poster] Failed to parse social posts from AI response");
    return { error: "Failed to parse AI response", raw: aiText.substring(0, 300) };
  }

  // ── Step 2: Queue posts to Buffer ─────────────────────────────────
  const results = {
    linkedin: null,
    facebook: null,
    timestamp: new Date().toISOString(),
  };

  if (linkedinId && posts.linkedin) {
    try {
      results.linkedin = await postToBuffer(bufferToken, linkedinId, posts.linkedin);
      console.log(`[social-poster] LinkedIn queued: ${results.linkedin.status}`);
    } catch (err) {
      console.error(`[social-poster] LinkedIn Buffer error: ${err.message}`);
      results.linkedin = { error: err.message };
    }
  }

  if (facebookId && posts.facebook) {
    try {
      results.facebook = await postToBuffer(bufferToken, facebookId, posts.facebook);
      console.log(`[social-poster] Facebook queued: ${results.facebook.status}`);
    } catch (err) {
      console.error(`[social-poster] Facebook Buffer error: ${err.message}`);
      results.facebook = { error: err.message };
    }
  }

  return results;
}

// ====================================================================
// SOCIAL PROMPT BUILDER
// ====================================================================

function buildSocialPrompt(articleText, pageUrl, topic) {
  return `You are writing social media posts for Adam Styer based on a newsletter he just published.

## WHO IS ADAM STYER
Senior mortgage broker, Austin TX. Independent brokerage. Faith-driven, straight shooter, blue collar work ethic. He educates, he doesn't sell. Known for being direct and cutting through the noise.

## THE ARTICLE
Topic: ${topic}
URL: ${pageUrl}

Article content:
---
${articleText.substring(0, 3000)}
---

## WRITE TWO POSTS

### LINKEDIN POST
Voice: Direct, confident, educational. Short punchy sentences. No corporate tone. Position Adam as a trusted mortgage advisor who sees around corners.
- Open with a hook — bold statement, surprising number, or question
- No emojis. Ever.
- Max 2 hashtags at the very end
- Under 200 words
- End with the article link on its own line
- Do NOT use phrases like "In today's market" or "As your trusted advisor"
- Sound like a person, not a press release

### FACEBOOK POST
Voice: Warm but direct. Real talk, not salesy. Short paragraphs. Written for past clients and homeowners in Austin TX. Feels like advice from a trusted friend who happens to be a mortgage expert.
- No emojis
- Under 150 words
- End with a direct question to the reader (to drive comments)
- Include the article link before the question
- Keep it casual — this is Facebook, not a boardroom

## OUTPUT FORMAT — use these EXACT delimiters

---LINKEDIN_POST_START---
[LinkedIn post text here]
---LINKEDIN_POST_END---

---FACEBOOK_POST_START---
[Facebook post text here]
---FACEBOOK_POST_END---`;
}

// ====================================================================
// PARSE SOCIAL RESPONSE
// ====================================================================

function parseSocialResponse(text) {
  const result = { linkedin: null, facebook: null };

  const linkedinMatch = text.match(
    /---LINKEDIN_POST_START---([\s\S]*?)---LINKEDIN_POST_END---/
  );
  if (linkedinMatch) result.linkedin = linkedinMatch[1].trim();

  const facebookMatch = text.match(
    /---FACEBOOK_POST_START---([\s\S]*?)---FACEBOOK_POST_END---/
  );
  if (facebookMatch) result.facebook = facebookMatch[1].trim();

  return result;
}

// ====================================================================
// BUFFER API: Queue a post
// ====================================================================

async function postToBuffer(accessToken, profileId, text) {
  // Buffer Publish API v1 — create an update (queues to next slot)
  const url = `https://api.bufferapp.com/1/updates/create.json`;

  const body = new URLSearchParams();
  body.append("access_token", accessToken);
  body.append("text", text);
  body.append("profile_ids[]", profileId);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    const errMsg = data.message || data.error || `Buffer API error (${res.status})`;
    throw new Error(errMsg);
  }

  return {
    status: "queued",
    bufferId: data.updates?.[0]?.id || null,
    scheduledAt: data.updates?.[0]?.scheduled_at || null,
  };
}

// ====================================================================
// HELPER: Strip HTML to plain text
// ====================================================================

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&middot;/g, "·")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

module.exports = { generateAndPostSocial };
