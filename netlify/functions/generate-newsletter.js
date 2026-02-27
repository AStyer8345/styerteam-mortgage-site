const Anthropic = require("@anthropic-ai/sdk");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { buildPrompt } = require("./lib/prompt-builder");
const { buildWebPage } = require("./lib/page-builder");
const { buildBlogPage } = require("./lib/blog-page-builder");
const { generateAndPostSocial } = require("./lib/social-poster");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const formData = JSON.parse(event.body);
    const { topic, audiences, mode, source, scheduleTime } = formData;
    const isPreview = mode === "preview";
    const isPaste = source === "paste";

    // Validate: AI mode needs topic, paste mode needs title + emailHtml + webContent
    if (isPaste) {
      if (!formData.title) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Title is required for paste mode" }) };
      }
      if (!formData.emailHtml) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Teaser Email HTML is required for paste mode" }) };
      }
      if (!formData.webContent) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Webpage Content HTML is required for paste mode" }) };
      }
    } else if (!topic) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Topic is required" }) };
    }

    // Validate schedule time if provided (must be 15+ min in the future)
    if (scheduleTime) {
      const scheduled = new Date(scheduleTime);
      const minTime = new Date(Date.now() + 15 * 60 * 1000);
      if (isNaN(scheduled.getTime())) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid schedule time" }) };
      }
      if (scheduled < minTime) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Schedule time must be at least 15 minutes in the future" }) };
      }
    }

    // ----------------------------------------------------------------
    // STEP 0: Compute the page URL FIRST so the AI can use it directly
    // ----------------------------------------------------------------
    const today = new Date().toISOString().split("T")[0];
    const slugSource = isPaste ? (formData.title || "untitled") : topic;
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

    if (isPaste) {
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
      const prompt = buildPrompt(formData, pageUrl);

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
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to parse AI response", raw: aiText.substring(0, 500) }),
        };
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
      rates: formData.rates || null,
      category: parsed.pageCategory || formData.category || "Market Update",
    });

    // Also build the old /updates/ page for backward compatibility
    const updatesPageHtml = buildWebPage({
      title: effectiveTitle,
      description: parsed.pageDescription || `Weekly update from Adam Styer - ${effectiveTitle}`,
      date: today,
      content: parsed.webContent,
      rates: formData.rates || null,
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
      // STEP 4: Queue social media posts via Buffer (non-blocking)
      // ----------------------------------------------------------------
      try {
        const socialTopic = topic || formData.title || "Newsletter";
        results.socialPosts = await generateAndPostSocial({
          webContent: parsed.webContent,
          pageUrl,
          topic: socialTopic,
        });
        console.log("[social-poster] Result:", JSON.stringify(results.socialPosts));
      } catch (socialErr) {
        console.error("[social-poster] Failed (non-blocking):", socialErr.message);
        results.socialPosts = { error: socialErr.message };
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
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
        },
      }),
    };
  } catch (err) {
    console.error("Newsletter generation error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || "Internal server error" }),
    };
  }
};

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
// GITHUB API: Create file in repo
// ====================================================================

async function createGitHubFile(filePath, content) {
  const token = process.env.GITHUB_TOKEN || process.env.github_token;
  const repo = process.env.GITHUB_REPO || process.env.Github_repo;
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  const body = JSON.stringify({
    message: `Add blog post: ${filePath}`,
    content: Buffer.from(content).toString("base64"),
    branch: "main",
  });

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "StyerTeam-Newsletter-Bot",
    },
    body,
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${errBody}`);
  }

  return res.json();
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

// ====================================================================
// MAILCHIMP: Create campaign + send
// ====================================================================

async function createAndSendCampaign({ listId, subject, preheader, html, fromName, replyTo, scheduleTime }) {
  // Create campaign
  const campaign = await mailchimp.campaigns.create({
    type: "regular",
    recipients: { list_id: listId },
    settings: {
      subject_line: subject,
      preview_text: preheader,
      from_name: fromName,
      reply_to: replyTo,
    },
  });

  // Set content
  await mailchimp.campaigns.setContent(campaign.id, { html });

  // Schedule or send immediately
  if (scheduleTime) {
    await mailchimp.campaigns.schedule(campaign.id, { schedule_time: scheduleTime });
    return { id: campaign.id, status: "scheduled", subject, scheduledFor: scheduleTime };
  } else {
    await mailchimp.campaigns.send(campaign.id);
    return { id: campaign.id, status: "sent", subject };
  }
}

// ====================================================================
// HELPER: Inject the page URL into email HTML
// ====================================================================

function injectPageLink(html, pageUrl) {
  return html.replace(/\[PAGE_URL\]/g, pageUrl);
}

// ====================================================================
// HELPER: Force all links to use absolute URL (catches AI-generated relative links)
// ====================================================================

function forceAbsoluteLinks(html, pageUrl) {
  // First replace [PAGE_URL] placeholders
  let result = html.replace(/\[PAGE_URL\]/g, pageUrl);

  // Replace any relative .html links that look like newsletter pages
  // e.g. href="spring-market.html" or href="2026-02-20-spring.html"
  result = result.replace(
    /href=["']([^"']*?\.html)["']/gi,
    (match, href) => {
      // Skip if already absolute
      if (href.startsWith("http") || href.startsWith("../") || href.startsWith("/")) {
        return match;
      }
      // Replace relative newsletter URL with the correct absolute URL
      return `href="${pageUrl}"`;
    }
  );

  return result;
}

// ====================================================================
// HELPER: Inject a small floated photo into the Personal Corner section
// ====================================================================

function injectPhotoIntoPersonalSection(html, photoUrl) {
  const imgHtml = `<img src="${photoUrl}" alt="Adam Styer" style="float: left; width: 150px; height: auto; border-radius: 8px; margin: 0 1rem 0.5rem 0;">`;

  // Look for the Personal Corner section header (generated by AI)
  const personalMatch = html.match(/<h2[^>]*>.*?(Personal|Corner|Family|Faith|Fitness|Finance|Off the Clock|This Week|Life Update).*?<\/h2>/i);
  if (personalMatch) {
    // Insert photo right after the Personal Corner <h2>
    const idx = personalMatch.index + personalMatch[0].length;
    return html.slice(0, idx) + "\n" + imgHtml + "\n" + html.slice(idx);
  }

  // Fallback: look for an <hr> (section divider before the personal section)
  const hrMatch = html.match(/<hr\s*\/?>/i);
  if (hrMatch) {
    const idx = hrMatch.index + hrMatch[0].length;
    return html.slice(0, idx) + "\n" + imgHtml + "\n" + html.slice(idx);
  }

  // Last fallback: insert after the last <h2> in the content
  const allH2 = [...html.matchAll(/<\/h2>/gi)];
  if (allH2.length > 0) {
    const lastH2 = allH2[allH2.length - 1];
    const idx = lastH2.index + lastH2[0].length;
    return html.slice(0, idx) + "\n" + imgHtml + "\n" + html.slice(idx);
  }

  return html;
}

// ====================================================================
// HELPER: Strip nested HTML document tags (AI sometimes generates full pages)
// ====================================================================

function stripNestedHtmlDocument(html) {
  let cleaned = html;

  // Remove <!DOCTYPE ...>
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, "");

  // Remove <html> and </html>
  cleaned = cleaned.replace(/<\/?html[^>]*>/gi, "");

  // Remove entire <head>...</head> block (includes <style>, <meta>, <title>)
  cleaned = cleaned.replace(/<head[\s\S]*?<\/head>/gi, "");

  // Remove <body> and </body>
  cleaned = cleaned.replace(/<\/?body[^>]*>/gi, "");

  // Remove any leftover <style>...</style> blocks
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, "");

  // Remove wrapper <div class="container"> that AI adds (keep inner content)
  cleaned = cleaned.replace(/^[\s\n]*<div class="container">\s*/i, "");
  cleaned = cleaned.replace(/\s*<\/div>[\s\n]*$/i, "");

  return cleaned.trim();
}
