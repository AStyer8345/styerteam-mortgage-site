const Anthropic = require("@anthropic-ai/sdk");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { buildPrompt } = require("./lib/prompt-builder");
const { buildWebPage } = require("./lib/page-builder");
const { buildBlogPage } = require("./lib/blog-page-builder");
const { generateAndPostSocial, generateSocialPostsText } = require("./lib/social-poster");
const { createGitHubFile, createAndSendCampaign, injectPageLink, forceAbsoluteLinks, injectPhotoIntoPersonalSection, stripNestedHtmlDocument } = require("./lib/shared");

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
    const slugSource = isPaste ? (formData.title || "untitled") : (topic || formData.customPrompt || "newsletter");
    const slug = slugSource
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
      let prompt;
      if (formData.customPrompt) {
        const wantsBorrower = audiences.includes("borrower");
        const wantsRealtor = audiences.includes("realtor");
        prompt = `${formData.customPrompt}

## OUTPUT FORMAT — you MUST use these EXACT delimiters in your response
PAGE_TITLE: [max 60 chars]
PAGE_DESCRIPTION: [140-160 chars, include keyword + call to action]
PAGE_CATEGORY: [one of: Market Update, Homebuying, Refinancing, Rates, Tips & Guides, Austin Market]
${wantsBorrower ? "BORROWER_SUBJECT: [casual subject, not clickbait]\nBORROWER_PREHEADER: [max 90 chars]" : ""}
${wantsRealtor ? "REALTOR_SUBJECT: [professional but casual subject]\nREALTOR_PREHEADER: [max 90 chars]" : ""}

${wantsBorrower ? `---BORROWER_EMAIL_START---\n[Plain-text-style HTML email. CTA links to ${pageUrl}]\n---BORROWER_EMAIL_END---` : ""}

${wantsRealtor ? `---REALTOR_EMAIL_START---\n[Plain-text-style HTML email. CTA links to ${pageUrl}]\n---REALTOR_EMAIL_END---` : ""}

---WEB_CONTENT_START---
[Article body HTML only — no <!DOCTYPE>, <html>, <head>, or <body> tags]
---WEB_CONTENT_END---
`;
      } else {
        prompt = buildPrompt(formData, pageUrl);
      }

      // Retry up to 3 times on transient errors (429/529)
      let response;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          response = await anthropic.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 4000,
            messages: [{ role: "user", content: prompt }],
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

      const aiText = response.content[0].text;
      parsed = parseAIResponse(aiText);

      if (!parsed.webContent) {
        throw new Error(`Failed to parse AI response: ${aiText.substring(0, 200)}`);
      }
    }

    // Inject photo into the "Personal Corner" section of web content only (no photos in emails)
    if (formData.photo) {
      parsed.webContent = injectPhotoIntoPersonalSection(parsed.webContent, formData.photo);
    }

    // Force all email links to use absolute URL (safety net)
    if (parsed.borrowerEmail) {
      parsed.borrowerEmail = forceAbsoluteLinks(parsed.borrowerEmail, pageUrl);
    }
    if (parsed.realtorEmail) {
      parsed.realtorEmail = forceAbsoluteLinks(parsed.realtorEmail, pageUrl);
    }

    // ----------------------------------------------------------------
    // STEP 2: Build page data (always) / Publish (only if live)
    // ----------------------------------------------------------------

    const effectiveTitle = parsed.pageTitle || topic || formData.title || "Newsletter";

    const blogPageHtml = buildBlogPage({
      title: effectiveTitle,
      description: parsed.pageDescription || `${effectiveTitle} — Austin mortgage insights from Adam Styer`,
      date: today,
      slug: blogSlug,
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
      await createGitHubFile(`blog/${filename}`, blogPageHtml);

      // Also publish to /updates/ for backward compat with old email links
      await createGitHubFile(`updates/${filename}`, updatesPageHtml);

      // Update the blog manifest so blog.html can list this post
      await updateBlogManifest({
        slug: blogSlug,
        title: effectiveTitle,
        description: parsed.pageDescription || `${effectiveTitle} — Austin mortgage insights from Adam Styer`,
        date: today,
        category: parsed.pageCategory || formData.category || "Market Update",
      });
    }

    // ----------------------------------------------------------------
    // STEP 3: Send Mailchimp campaigns (only if live)
    // ----------------------------------------------------------------
    const results = { pageUrl, filename, campaigns: [] };

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
          const borrowerResult = await createAndSendCampaign({
            listId: process.env.MAILCHIMP_BORROWER_LIST_ID,
            subject: parsed.borrowerSubject || `${effectiveTopic} - Adam Styer | Mortgage Solutions LP`,
            preheader: parsed.borrowerPreheader || "",
            html: injectPageLink(parsed.borrowerEmail, pageUrl),
            fromName: "Adam Styer",
            replyTo: "adam@thestyerteam.com",
            scheduleTime: scheduleTime || null,
          });
          results.campaigns.push({ audience: "borrower", ...borrowerResult });
        }

        if (sendRealtor && parsed.realtorEmail) {
          const realtorResult = await createAndSendCampaign({
            listId: process.env.MAILCHIMP_REALTOR_LIST_ID,
            subject: parsed.realtorSubject || `${effectiveTopic} - Adam Styer | Mortgage Solutions LP`,
            preheader: parsed.realtorPreheader || "",
            html: injectPageLink(parsed.realtorEmail, pageUrl),
            fromName: "Adam Styer",
            replyTo: "adam@thestyerteam.com",
            scheduleTime: scheduleTime || null,
          });
          results.campaigns.push({ audience: "realtor", ...realtorResult });
        }
      }

      // ----------------------------------------------------------------
      // STEP 4: Social media posts — generate AND publish (live mode)
      // ----------------------------------------------------------------
      try {
        const socialTopic = topic || formData.title || parsed.pageTitle || "Newsletter";
        results.socialPosts = await generateAndPostSocial({
          webContent: parsed.webContent,
          pageUrl,
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
      pageUrl,
      filename,
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
        borrowerEmailHtml: parsed.borrowerEmail ? injectPageLink(parsed.borrowerEmail, pageUrl) : null,
        realtorEmailHtml: parsed.realtorEmail ? injectPageLink(parsed.realtorEmail, pageUrl) : null,
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
  const manifestPath = "blog/manifest.json";
  const url = `https://api.github.com/repos/${repo}/contents/${manifestPath}`;

  // Fetch existing manifest (if it exists)
  let posts = [];
  let existingSha = null;

  try {
    const getRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "StyerTeam-Newsletter-Bot",
      },
    });

    if (getRes.ok) {
      const data = await getRes.json();
      existingSha = data.sha;
      const decoded = Buffer.from(data.content, "base64").toString("utf8");
      const manifest = JSON.parse(decoded);
      posts = manifest.posts || [];
    }
  } catch (e) {
    console.log("No existing manifest found, creating new one");
  }

  // Add new post at the beginning (newest first)
  posts.unshift({
    slug,
    title,
    description,
    date,
    category,
    url: `/blog/${slug}.html`,
  });

  // Remove duplicates by slug (in case of re-publish)
  const seen = new Set();
  posts = posts.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  const manifestContent = JSON.stringify({ posts }, null, 2);

  const body = {
    message: `Update blog manifest: add ${slug}`,
    content: Buffer.from(manifestContent).toString("base64"),
    branch: "main",
  };

  // Include sha if updating existing file
  if (existingSha) {
    body.sha = existingSha;
  }

  const putRes = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "StyerTeam-Newsletter-Bot",
    },
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const errBody = await putRes.text();
    console.error(`Blog manifest update failed (${putRes.status}): ${errBody}`);
    // Don't throw — the blog post was already published, manifest is non-critical
  }
}

