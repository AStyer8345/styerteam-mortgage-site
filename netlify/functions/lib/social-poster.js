/**
 * Social Media Post Generator — Direct LinkedIn + Facebook APIs
 *
 * Generates LinkedIn and Facebook posts from newsletter content using Claude,
 * then publishes directly via LinkedIn Posts API and Facebook Graph API.
 *
 * Designed to be non-blocking: failures here should NEVER break the
 * newsletter publish + email pipeline. Callers should wrap in try/catch.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY          — shared with newsletter generation
 *
 * LinkedIn (personal profile):
 *   LINKEDIN_ACCESS_TOKEN      — OAuth 2.0 access token (expires ~60 days)
 *   LINKEDIN_REFRESH_TOKEN     — OAuth 2.0 refresh token (expires ~365 days)
 *   LINKEDIN_CLIENT_ID         — App client ID (for token refresh)
 *   LINKEDIN_CLIENT_SECRET     — App client secret (for token refresh)
 *   LINKEDIN_PERSON_URN        — e.g. "urn:li:person:AbCdEf123"
 *
 * Facebook (business page):
 *   FACEBOOK_PAGE_ACCESS_TOKEN — Long-lived page token (permanent)
 *   FACEBOOK_PAGE_ID           — Numeric page ID
 */

const Anthropic = require("@anthropic-ai/sdk");

// ====================================================================
// MAIN ENTRY POINT
// ====================================================================

/**
 * Generate social posts from newsletter content and publish them.
 *
 * @param {Object} opts
 * @param {string} opts.webContent  — The HTML article content
 * @param {string} opts.pageUrl     — The published URL of the article
 * @param {string} opts.topic       — The newsletter topic/title
 * @returns {Object} Results with linkedin and facebook post statuses
 */
async function generateAndPostSocial({ webContent, pageUrl, topic }) {
  // ── Check credentials ───────────────────────────────────────────
  const linkedinToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const linkedinUrn = process.env.LINKEDIN_PERSON_URN;
  const fbPageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const fbPageId = process.env.FACEBOOK_PAGE_ID;

  const hasLinkedIn = linkedinToken && linkedinUrn;
  const hasFacebook = fbPageToken && fbPageId;

  if (!hasLinkedIn && !hasFacebook) {
    console.log("[social-poster] Skipped: No LinkedIn or Facebook credentials configured");
    return { skipped: true, reason: "No social media credentials configured" };
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

  // ── Step 2: Publish posts directly ──────────────────────────────
  const results = {
    linkedin: null,
    facebook: null,
    timestamp: new Date().toISOString(),
  };

  if (hasLinkedIn && posts.linkedin) {
    try {
      results.linkedin = await postToLinkedIn(
        linkedinToken,
        linkedinUrn,
        posts.linkedin,
        pageUrl,
        topic || "New Article"
      );
      console.log(`[social-poster] LinkedIn published: ${results.linkedin.status}`);
    } catch (err) {
      console.error(`[social-poster] LinkedIn error: ${err.message}`);

      // If 401 (token expired), attempt one refresh + retry
      if (err.message.includes("401") || err.message.includes("Unauthorized")) {
        console.log("[social-poster] LinkedIn token may be expired, attempting refresh...");
        try {
          const newToken = await refreshLinkedInToken();
          if (newToken) {
            results.linkedin = await postToLinkedIn(
              newToken,
              linkedinUrn,
              posts.linkedin,
              pageUrl,
              topic || "New Article"
            );
            console.log(`[social-poster] LinkedIn published after token refresh: ${results.linkedin.status}`);
            results.linkedin.tokenRefreshed = true;
            results.linkedin.newToken = newToken; // Log for manual env var update
          }
        } catch (refreshErr) {
          console.error(`[social-poster] LinkedIn token refresh failed: ${refreshErr.message}`);
          results.linkedin = {
            error: "Token expired and refresh failed. Update LINKEDIN_ACCESS_TOKEN manually.",
            refreshError: refreshErr.message,
          };
        }
      } else {
        results.linkedin = { error: err.message };
      }
    }
  }

  if (hasFacebook && posts.facebook) {
    try {
      results.facebook = await postToFacebook(
        fbPageToken,
        fbPageId,
        posts.facebook,
        pageUrl
      );
      console.log(`[social-poster] Facebook published: ${results.facebook.status}`);
    } catch (err) {
      console.error(`[social-poster] Facebook error: ${err.message}`);
      results.facebook = { error: err.message };
    }
  }

  return results;
}

// ====================================================================
// LINKEDIN POSTS API
// ====================================================================

/**
 * Publish a post to LinkedIn as a personal profile.
 * Uses the new REST Posts API with article content for link previews.
 */
async function postToLinkedIn(accessToken, personUrn, text, articleUrl, articleTitle) {
  const url = "https://api.linkedin.com/rest/posts";

  const body = {
    author: personUrn,
    commentary: text,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content: {
      article: {
        source: articleUrl,
        title: articleTitle,
      },
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      "LinkedIn-Version": "202501",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`LinkedIn API error (${res.status}): ${errorText.substring(0, 300)}`);
  }

  // LinkedIn returns 201 with post ID in the x-restli-id header
  const postId = res.headers.get("x-restli-id") || null;

  return {
    status: "published",
    postId,
    platform: "linkedin",
  };
}

// ====================================================================
// LINKEDIN TOKEN REFRESH
// ====================================================================

/**
 * Attempt to refresh the LinkedIn OAuth access token.
 * Returns the new access token string, or null if refresh is not configured.
 *
 * NOTE: In a serverless environment, we cannot persist the new token.
 * The new token is returned in the results so it can be logged and
 * manually updated in Netlify env vars. A scheduled function could
 * automate this in the future.
 */
async function refreshLinkedInToken() {
  const refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    console.log("[social-poster] Cannot refresh LinkedIn token: missing refresh credentials");
    return null;
  }

  const body = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", refreshToken);
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);

  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(
      `LinkedIn token refresh failed (${res.status}): ${data.error_description || data.error || "Unknown error"}`
    );
  }

  console.log(
    `[social-poster] LinkedIn token refreshed successfully. ` +
      `Expires in ${data.expires_in}s. ` +
      `ACTION REQUIRED: Update LINKEDIN_ACCESS_TOKEN in Netlify env vars.`
  );

  return data.access_token;
}

// ====================================================================
// FACEBOOK GRAPH API
// ====================================================================

/**
 * Publish a post to a Facebook Business Page.
 * Uses Graph API v19.0 with page access token.
 */
async function postToFacebook(pageAccessToken, pageId, text, link) {
  const url = `https://graph.facebook.com/v19.0/${pageId}/feed`;

  const body = new URLSearchParams();
  body.append("access_token", pageAccessToken);
  body.append("message", text);
  if (link) {
    body.append("link", link);
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    const errMsg =
      data.error?.message || data.error || `Facebook API error (${res.status})`;
    throw new Error(errMsg);
  }

  return {
    status: "published",
    postId: data.id || null,
    platform: "facebook",
  };
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
    .replace(/&mdash;/g, "\u2014")
    .replace(/&middot;/g, "\u00B7")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

module.exports = { generateAndPostSocial };
