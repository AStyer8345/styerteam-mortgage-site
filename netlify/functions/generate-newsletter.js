const Anthropic = require("@anthropic-ai/sdk");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { buildPrompt } = require("./lib/prompt-builder");
const { buildWebPage } = require("./lib/page-builder");
const { buildBlogPage } = require("./lib/blog-page-builder");
const { generateAndPostSocial, generateSocialPostsText } = require("./lib/social-poster");
const { createGitHubFile, createAndSendCampaign, waitForPageLive, injectPageLink, forceAbsoluteLinks, injectPhotoIntoPersonalSection, stripNestedHtmlDocument, wrapEmailHtml, fetchVoiceGuide } = require("./lib/shared");

// ====================================================================
// HTTP HANDLER — thin wrapper around generateNewsletter()
// ====================================================================

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  try {
    const formData = JSON.parse(event.body);
    const result = await generateNewsletter(formData);
    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (err) {
    console.error("Newsletter generation error:", err);
    return { statusCode: err.statusCode || 500, headers, body: JSON.stringify({ error: err.message || "Internal server error" }) };
  }
};

// ====================================================================
// CORE GENERATOR — callable directly (HTTP, cron, webhook, Zapier)
// ====================================================================

async function generateNewsletter(formData) {
    const { topic, audiences, mode, source, scheduleTime } = formData;
    const isPreview = mode === "preview";
    const isPaste = source === "paste";

    // Validate
    if (isPaste) {
      if (!formData.title) throw Object.assign(new Error("Title is required for paste mode"), { statusCode: 400 });
      if (!formData.emailHtml) throw Object.assign(new Error("Teaser Email HTML is required for paste mode"), { statusCode: 400 });
      if (!formData.webContent) throw Object.assign(new Error("Webpage Content HTML is required for paste mode"), { statusCode: 400 });
    } else if (!topic && !formData.customPrompt) {
      throw Object.assign(new Error("Topic is required"), { statusCode: 400 });
    }

    // Validate schedule time if provided (must be 15+ min in the future)
    if (scheduleTime) {
      const scheduled = new Date(scheduleTime);
      const minTime = new Date(Date.now() + 15 * 60 * 1000);
      if (isNaN(scheduled.getTime())) throw Object.assign(new Error("Invalid schedule time"), { statusCode: 400 });
      if (scheduled < minTime) throw Object.assign(new Error("Schedule time must be at least 15 minutes in the future"), { statusCode: 400 });
    }

    // ----------------------------------------------------------------
    // STEP 0: Compute the page URL FIRST so the AI can use it directly
    // ----------------------------------------------------------------
    const today = new Date().toISOString().split("T")[0];

    // For custom prompt mode, we don't have a clean topic yet — use a temp slug.
    // After Claude responds, we'll re-derive from PAGE_TITLE and swap URLs.
    const isCustomPrompt = !isPaste && !topic && !!formData.customPrompt;
    const tempSlug = isCustomPrompt ? "temp-placeholder" : null;

    const slugSource = isPaste
      ? (formData.title || "untitled")
      : (topic || "newsletter");
    const slug = (tempSlug || slugSource)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)
      .replace(/-+$/, "");
    const blogSlug = `${today}-${slug}`;
    const filename = `${blogSlug}.html`;
    const pageUrl = `https://styermortgage.com/blog/${filename}`;

    // ----------------------------------------------------------------
    // STEP 1: Generate or assemble content
    // ----------------------------------------------------------------
    let parsed;

    if (formData.preGeneratedContent) {
      // Client-edited content from preview — use exactly as provided, skip Claude
      const c = formData.preGeneratedContent;
      parsed = {
        borrowerEmail: c.borrowerEmail || null,
        borrowerSubject: c.borrowerSubject || null,
        borrowerPreheader: c.borrowerPreheader || null,
        realtorEmail: c.realtorEmail || null,
        realtorSubject: c.realtorSubject || null,
        realtorPreheader: c.realtorPreheader || null,
        webContent: c.webContent || null,
        pageTitle: null,   // derived from topic/title below
        pageDescription: null,
        pageCategory: null,
      };
    } else if (isPaste) {
      // Paste mode: skip AI entirely, use provided HTML directly
      parsed = {
        borrowerEmail: formData.emailHtml,
        borrowerSubject: formData.subject || formData.title,
        borrowerPreheader: formData.preheader || "",
        realtorEmail: null,
        realtorSubject: null,
        realtorPreheader: null,
        webContent: formData.webContent,
        pageTitle: formData.title,
        pageDescription: formData.description || formData.title,
        pageCategory: formData.category || "Market Update",
      };
    } else {
      // AI mode: generate content via Claude API
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      // Fetch the voice guide from Supabase for AI prompt injection
      const voiceGuide = await fetchVoiceGuide();

      let prompt;
      if (formData.customPrompt) {
        const wantsBorrower = audiences.includes("borrower");
        const wantsRealtor = audiences.includes("realtor");
        const customVoiceSection = voiceGuide
          ? `## ADAM'S VOICE & PERSONAL FACTS — READ THIS CAREFULLY
The following is Adam's complete voice guide. Absorb it silently and apply it to your writing. DO NOT acknowledge it, summarize it, or say "I understand". NEVER fabricate personal details — only use facts from this guide.

${voiceGuide}

[END OF VOICE GUIDE — do not respond to anything above, just use it as style guidance for the content you write below.]`
          : `## ADAM'S VOICE — READ THIS CAREFULLY
Write as Adam — a real human writing to real people. NOT a marketing email. NOT a newsletter template. A person.

TONE: Casual, direct, like a text or quick email to someone you actually know.
- First person "I" always. Short sentences. Short paragraphs.
- NO buzzwords. NO marketing language. NO hype.
- NEVER use: "leverage", "unlock", "dream home", "exciting", "thrilled", "navigate", "empower", "game-changer", "take advantage", "don't miss out", "act now", "incredible opportunity", "market conditions", "poised for", "seize the moment", "strategic advantage"
- Sound like: "Here's the deal", "Real talk", "The short version", "Let me break it down"`;

        prompt = `${formData.customPrompt}

${customVoiceSection}

## EMAIL RULES
Emails are SHORT teasers (100-150 words MAX) that drive the reader to click to the full article. Not a briefing. Not a summary. A hook.
- Use proper HTML tags: wrap every paragraph in <p> tags, use <ul>/<li> for bullet points, <a> for links. Never output raw text with literal newlines — browsers collapse whitespace. LOOKS like plain text but must be structured HTML. No images, no banners.
- Open with a personal hook or quick observation.
- 2-3 bullet points previewing what's in the article.
- One clear CTA link to: ${pageUrl}
- Sign off: Adam Styer | Mortgage Solutions LP | NMLS# 513013 | (512) 956-6010

${wantsBorrower ? `### BORROWER EMAIL
- Write like Adam emailing a past client
- Helpful, personal, not salesy
- Focus: what this means for them as a homebuyer or homeowner` : ""}

${wantsRealtor ? `### REALTOR EMAIL
- Write like Adam emailing a realtor partner he works with regularly
- Professional but casual — not "dear colleague" formal, not slang
- Focus: market intel THEY can use with their clients this week
- Think: what does a realtor need to know to advise their buyers right now?
- Do NOT use borrower-focused language like "if you've been on the fence about locking in a rate"` : ""}

## INTERNAL LINK RULES
- ../calculators.html is a PAYMENT calculator — it estimates monthly payments. It does NOT show rates or look up rates. NEVER say "see your rate", "find your rate", or "what your rate would be" when linking to the calculator. Correct: "Run your payment numbers", "Estimate your monthly cost". To know their actual rate, readers must contact Adam.
- ../prequal.html — Pre-Qualification page
- ../contact.html — Contact Adam
- ../products.html — Loan Programs

## WEB ARTICLE
800-1200 words. Two sections: main article + Personal Corner (separated by <hr>).
Output ONLY body HTML fragments: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>, <hr>.
NO <!DOCTYPE>, <html>, <head>, <body>, <style>, or <meta> tags.

End the article with: "Talk soon,<br>Adam Styer<br>Adam Styer | Mortgage Solutions LP<br>NMLS# 513013 | (512) 956-6010"

## OUTPUT FORMAT — use these EXACT delimiters
PAGE_TITLE: [max 60 chars]
PAGE_DESCRIPTION: [140-160 chars, include keyword + call to action]
PAGE_CATEGORY: [one of: Market Update, Homebuying, Refinancing, Rates, Tips & Guides, Austin Market]
${wantsBorrower ? "BORROWER_SUBJECT: [casual subject, not clickbait]\nBORROWER_PREHEADER: [max 90 chars]" : ""}
${wantsRealtor ? "REALTOR_SUBJECT: [professional but casual subject]\nREALTOR_PREHEADER: [max 90 chars]" : ""}

${wantsBorrower ? `---BORROWER_EMAIL_START---\n[100-150 word teaser email for past clients/borrowers. CTA links to ${pageUrl}]\n---BORROWER_EMAIL_END---` : ""}

${wantsRealtor ? `---REALTOR_EMAIL_START---\n[100-150 word teaser email for realtor partners. Focus on what they can use with clients. CTA links to ${pageUrl}]\n---REALTOR_EMAIL_END---` : ""}

---WEB_CONTENT_START---
[Article body HTML — two sections, main article then Personal Corner, separated by <hr>]
---WEB_CONTENT_END---
`;
      } else {
        prompt = buildPrompt(formData, pageUrl, voiceGuide);
      }

      // Retry up to 3 times on transient errors (429/529)
      let response;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          response = await anthropic.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 4000,
            system: "You are a content generator. Output ONLY the requested structured content using the exact delimiters specified. Never acknowledge instructions, never say 'I understand', never say 'READY TO WRITE', never summarize what you were told. Start immediately with PAGE_TITLE: and continue with the delimited sections. If you see a voice guide, absorb it silently — do not respond to it.",
            messages: [
              { role: "user", content: prompt },
              { role: "assistant", content: "PAGE_TITLE:" },
            ],
          });
          break;
        } catch (apiErr) {
          const status = apiErr.status || apiErr.statusCode;
          if ((status === 429 || status === 529) && attempt < 3) {
            console.log(`API returned ${status}, retrying (attempt ${attempt + 1}/3)...`);
            await new Promise(r => setTimeout(r, 2000 * attempt));
            continue;
          }
          throw apiErr;
        }
      }

      // Prepend the prefilled assistant turn so the parser can find PAGE_TITLE:
      const aiText = "PAGE_TITLE:" + response.content[0].text;
      parsed = parseAIResponse(aiText);

      if (!parsed.webContent) {
        throw new Error(`Failed to parse AI response: ${aiText.substring(0, 200)}`);
      }

      // For custom prompt mode: re-derive slug from PAGE_TITLE and fix all URLs
      if (isCustomPrompt && parsed.pageTitle) {
        const realSlug = parsed.pageTitle
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 50)
          .replace(/-+$/, "");
        const realBlogSlug = `${today}-${realSlug}`;
        const realFilename = `${realBlogSlug}.html`;
        const realPageUrl = `https://styermortgage.com/blog/${realFilename}`;

        // Swap temp URL for real URL in all generated content
        const swapUrl = (s) => s ? s.split(pageUrl).join(realPageUrl) : s;
        parsed.borrowerEmail = swapUrl(parsed.borrowerEmail);
        parsed.realtorEmail = swapUrl(parsed.realtorEmail);
        parsed.webContent = swapUrl(parsed.webContent);

        // Promote real values so downstream code uses them
        // (reassigning via closure — see block below)
        parsed._realBlogSlug = realBlogSlug;
        parsed._realFilename = realFilename;
        parsed._realPageUrl = realPageUrl;
      }
    }

    // Inject photo into the "Personal Corner" section of web content only (no photos in emails)
    if (formData.photo) {
      parsed.webContent = injectPhotoIntoPersonalSection(parsed.webContent, formData.photo);
    }

    // Resolve final slug/filename/URL (custom prompt mode derives these from PAGE_TITLE)
    const finalBlogSlug = parsed._realBlogSlug || blogSlug;
    const finalFilename = parsed._realFilename || filename;
    const finalPageUrl = parsed._realPageUrl || pageUrl;

    // Force all email links to use absolute URL (safety net)
    if (parsed.borrowerEmail) {
      parsed.borrowerEmail = forceAbsoluteLinks(parsed.borrowerEmail, finalPageUrl);
    }
    if (parsed.realtorEmail) {
      parsed.realtorEmail = forceAbsoluteLinks(parsed.realtorEmail, finalPageUrl);
    }

    // ----------------------------------------------------------------
    // STEP 2: Build page data (always) / Publish (only if live)
    // ----------------------------------------------------------------

    const effectiveTitle = parsed.pageTitle || topic || formData.title || "Newsletter";

    const blogPageHtml = buildBlogPage({
      title: effectiveTitle,
      description: parsed.pageDescription || `${effectiveTitle} — Austin mortgage insights from Adam Styer`,
      date: today,
      slug: finalBlogSlug,
      content: parsed.webContent,
      category: parsed.pageCategory || formData.category || "Market Update",
    });

    // Also build the old /updates/ page for backward compatibility
    const updatesPageHtml = buildWebPage({
      title: effectiveTitle,
      description: parsed.pageDescription || `Weekly update from Adam Styer - ${effectiveTitle}`,
      date: today,
      content: parsed.webContent,
    });

    // In preview mode, skip publishing. In live mode, publish.
    if (!isPreview) {
      // Publish to /blog/ (SEO-optimized, indexed by Google)
      await createGitHubFile(`blog/${finalFilename}`, blogPageHtml);

      // Also publish to /updates/ for backward compat with old email links
      await createGitHubFile(`updates/${finalFilename}`, updatesPageHtml);

      // Update the blog manifest so blog.html can list this post
      await updateBlogManifest({
        slug: blogSlug,
        title: effectiveTitle,
        description: parsed.pageDescription || `${effectiveTitle} — Austin mortgage insights from Adam Styer`,
        date: today,
        category: parsed.pageCategory || formData.category || "Market Update",
      });

      // Wait for Netlify to deploy the page before sending emails
      const isLive = await waitForPageLive(finalPageUrl);
      if (!isLive) {
        console.warn(`[newsletter] Page not confirmed live at ${finalPageUrl} — proceeding with email send anyway`);
      }
    }

    // ----------------------------------------------------------------
    // STEP 3: Send Mailchimp campaigns (only if live)
    // ----------------------------------------------------------------
    const results = { pageUrl: finalPageUrl, filename: finalFilename, campaigns: [] };

    if (!isPreview) {
      const mcApiKey = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key;
      const mcServer = process.env.MAILCHIMP_SERVER_PREFIX || process.env.mailchimp_server_prefix;

      if (mcApiKey && mcServer) {
        mailchimp.setConfig({
          apiKey: mcApiKey,
          server: mcServer,
        });

        const sendBorrower = audiences.includes("borrower") && process.env.MAILCHIMP_BORROWER_LIST_ID;
        const sendRealtor = audiences.includes("realtor") && process.env.MAILCHIMP_REALTOR_LIST_ID;

        const effectiveTopic = topic || formData.title || "Newsletter";

        if (sendBorrower && parsed.borrowerEmail) {
          try {
            const borrowerResult = await createAndSendCampaign({
              listId: process.env.MAILCHIMP_BORROWER_LIST_ID,
              subject: parsed.borrowerSubject || `${effectiveTopic} - Adam Styer | Mortgage Solutions LP`,
              preheader: parsed.borrowerPreheader || "",
              html: wrapEmailHtml(injectPageLink(parsed.borrowerEmail, finalPageUrl)),
              fromName: "Adam Styer",
              replyTo: "adam@thestyerteam.com",
              scheduleTime: scheduleTime || null,
            });
            results.campaigns.push({ audience: "borrower", ...borrowerResult });
          } catch (err) {
            console.error("[newsletter] Borrower campaign failed:", err.message);
            results.campaigns.push({ audience: "borrower", status: "error", error: err.message });
          }
        }

        if (sendRealtor && parsed.realtorEmail) {
          try {
            const realtorResult = await createAndSendCampaign({
              listId: process.env.MAILCHIMP_REALTOR_LIST_ID,
              subject: parsed.realtorSubject || `${effectiveTopic} - Adam Styer | Mortgage Solutions LP`,
              preheader: parsed.realtorPreheader || "",
              html: wrapEmailHtml(injectPageLink(parsed.realtorEmail, finalPageUrl)),
              fromName: "Adam Styer",
              replyTo: "adam@thestyerteam.com",
              scheduleTime: scheduleTime || null,
            });
            results.campaigns.push({ audience: "realtor", ...realtorResult });
          } catch (err) {
            console.error("[newsletter] Realtor campaign failed:", err.message);
            results.campaigns.push({ audience: "realtor", status: "error", error: err.message });
          }
        }
      }

      // ----------------------------------------------------------------
      // STEP 4: Social media posts — generate AND publish (live mode)
      // ----------------------------------------------------------------
      try {
        const socialTopic = topic || formData.title || parsed.pageTitle || "Newsletter";
        results.socialPosts = await generateAndPostSocial({
          webContent: parsed.webContent,
          pageUrl: finalPageUrl,
          topic: socialTopic,
          preGeneratedText: formData.preGeneratedSocial || null,
        });
        console.log("[social-poster] Result:", JSON.stringify(results.socialPosts));
      } catch (socialErr) {
        console.error("[social-poster] Failed (non-blocking):", socialErr.message);
        results.socialPosts = { error: socialErr.message };
      }
    }

    // ----------------------------------------------------------------
    // STEP 4b: Social post text generation for preview (non-blocking)
    // ----------------------------------------------------------------
    if (isPreview && parsed.webContent) {
      try {
        const socialTopic = topic || formData.title || parsed.pageTitle || "Newsletter";
        const socialTexts = await generateSocialPostsText({
          webContent: parsed.webContent,
          pageUrl,
          topic: socialTopic,
        });
        results.socialPostsPreview = socialTexts;
      } catch (socialErr) {
        console.error("[social-poster] Preview text generation failed (non-blocking):", socialErr.message);
        results.socialPostsPreview = null;
      }
    }

    return {
      success: true,
      mode: isPreview ? "preview" : "live",
      pageUrl: finalPageUrl,
      filename: finalFilename,
      campaigns: results.campaigns,
      socialPosts: results.socialPosts || null,
      preview: {
        borrowerSubject: parsed.borrowerSubject,
        borrowerPreheader: parsed.borrowerPreheader,
        realtorSubject: parsed.realtorSubject,
        realtorPreheader: parsed.realtorPreheader,
        pageTitle: parsed.pageTitle,
        pageDescription: parsed.pageDescription,
        pageCategory: parsed.pageCategory,
        webContent: parsed.webContent,
        borrowerEmailHtml: parsed.borrowerEmail ? injectPageLink(parsed.borrowerEmail, finalPageUrl) : null,
        realtorEmailHtml: parsed.realtorEmail ? injectPageLink(parsed.realtorEmail, finalPageUrl) : null,
        linkedinPost: results.socialPostsPreview?.linkedin || null,
        facebookPost: results.socialPostsPreview?.facebook || null,
      },
    };
}
exports.generateNewsletter = generateNewsletter;

// ====================================================================
// PARSE AI RESPONSE
// ====================================================================

function parseAIResponse(text) {
  const result = {
    borrowerEmail: null,
    borrowerSubject: null,
    borrowerPreheader: null,
    realtorEmail: null,
    realtorSubject: null,
    realtorPreheader: null,
    webContent: null,
    pageTitle: null,
    pageDescription: null,
    pageCategory: null,
  };

  // Extract borrower email
  const borrowerMatch = text.match(
    /---BORROWER_EMAIL_START---([\s\S]*?)---BORROWER_EMAIL_END---/
  );
  if (borrowerMatch) result.borrowerEmail = borrowerMatch[1].trim();

  // Extract realtor email
  const realtorMatch = text.match(
    /---REALTOR_EMAIL_START---([\s\S]*?)---REALTOR_EMAIL_END---/
  );
  if (realtorMatch) result.realtorEmail = realtorMatch[1].trim();

  // Extract web page content
  const webMatch = text.match(
    /---WEB_CONTENT_START---([\s\S]*?)---WEB_CONTENT_END---/
  );
  if (webMatch) result.webContent = stripNestedHtmlDocument(webMatch[1].trim());

  // Extract metadata
  const subjectBMatch = text.match(/BORROWER_SUBJECT:\s*(.+)/);
  if (subjectBMatch) result.borrowerSubject = subjectBMatch[1].trim();

  const subjectRMatch = text.match(/REALTOR_SUBJECT:\s*(.+)/);
  if (subjectRMatch) result.realtorSubject = subjectRMatch[1].trim();

  const preheaderBMatch = text.match(/BORROWER_PREHEADER:\s*(.+)/);
  if (preheaderBMatch) result.borrowerPreheader = preheaderBMatch[1].trim();

  const preheaderRMatch = text.match(/REALTOR_PREHEADER:\s*(.+)/);
  if (preheaderRMatch) result.realtorPreheader = preheaderRMatch[1].trim();

  const titleMatch = text.match(/PAGE_TITLE:\s*(.+)/);
  if (titleMatch) result.pageTitle = titleMatch[1].trim();

  const descMatch = text.match(/PAGE_DESCRIPTION:\s*(.+)/);
  if (descMatch) result.pageDescription = descMatch[1].trim();

  const catMatch = text.match(/PAGE_CATEGORY:\s*(.+)/);
  if (catMatch) result.pageCategory = catMatch[1].trim();

  return result;
}

// ====================================================================
// GITHUB API: Update blog manifest with new post
// ====================================================================

async function updateBlogManifest({ slug, title, description, date, category }) {
  const token = process.env.GITHUB_TOKEN || process.env.github_token;
  const repo = process.env.GITHUB_REPO || process.env.Github_repo;
  const blogHtmlPath = "blog.html";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${blogHtmlPath}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "User-Agent": "StyerTeam-Newsletter-Bot",
  };

  // Fetch blog.html from GitHub
  const getRes = await fetch(apiUrl, { headers });
  if (!getRes.ok) {
    console.error(`Failed to fetch blog.html for manifest update (${getRes.status})`);
    return;
  }

  const data = await getRes.json();
  const existingSha = data.sha;
  const blogHtml = Buffer.from(data.content, "base64").toString("utf8");

  // Extract inline manifest JSON from blog.html
  const manifestMatch = blogHtml.match(
    /(<script type="application\/json" id="blog-manifest">\s*)([\s\S]*?)(\s*<\/script>)/
  );
  if (!manifestMatch) {
    console.error("Could not find inline blog-manifest in blog.html");
    return;
  }

  let posts = [];
  try {
    const manifest = JSON.parse(manifestMatch[2]);
    posts = manifest.posts || [];
  } catch (e) {
    console.error("Failed to parse inline blog manifest JSON:", e.message);
    return;
  }

  // Add new post at the beginning (newest first), dedupe by slug
  posts.unshift({ slug, title, description, date, category, url: `/blog/${slug}.html` });
  const seen = new Set();
  posts = posts.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  // Replace the inline manifest JSON in blog.html
  const newManifestJson = JSON.stringify({ posts });
  const updatedHtml = blogHtml.replace(
    /(<script type="application\/json" id="blog-manifest">\s*)([\s\S]*?)(\s*<\/script>)/,
    `$1${newManifestJson}$3`
  );

  // Write updated blog.html back to GitHub
  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `Update blog manifest: add ${slug}`,
      content: Buffer.from(updatedHtml).toString("base64"),
      sha: existingSha,
      branch: "main",
    }),
  });

  if (!putRes.ok) {
    const errBody = await putRes.text();
    console.error(`Blog manifest update failed (${putRes.status}): ${errBody}`);
    // Don't throw — blog post already published, manifest is non-critical
  }
}

