const Anthropic = require("@anthropic-ai/sdk");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { buildRealtorPrompt } = require("./lib/realtor-prompt-builder");
const { buildRealtorPage } = require("./lib/realtor-page-builder");

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
    const { topic, mode } = formData;
    const isPreview = mode === "preview";

    if (!topic) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Topic is required" }) };
    }

    // ----------------------------------------------------------------
    // STEP 0: Compute the page URL FIRST so the AI can embed it
    // ----------------------------------------------------------------
    const today = new Date().toISOString().split("T")[0];
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)
      .replace(/-+$/, "");
    const fullSlug = `${today}-${slug}`;
    const filename = `${fullSlug}.html`;
    const pageUrl = `https://styermortgage.com/realtor-updates/${filename}`;

    // ----------------------------------------------------------------
    // STEP 1: Generate content via Claude API
    // ----------------------------------------------------------------
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildRealtorPrompt(formData, pageUrl);

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
          await new Promise((r) => setTimeout(r, 2000 * attempt));
          continue;
        }
        throw apiErr;
      }
    }

    const aiText = response.content[0].text;

    // Parse the AI response
    const parsed = parseRealtorAIResponse(aiText);

    if (!parsed.webContent) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to parse AI response", raw: aiText.substring(0, 500) }),
      };
    }

    // Force all email links to use absolute URL (safety net)
    if (parsed.realtorEmail) {
      parsed.realtorEmail = forceAbsoluteLinks(parsed.realtorEmail, pageUrl);
    }

    // ----------------------------------------------------------------
    // STEP 2: Build page HTML / Publish (only if live)
    // ----------------------------------------------------------------

    const realtorPageHtml = buildRealtorPage({
      title: parsed.pageTitle || topic,
      description: parsed.pageDescription || `${topic} — partner resources from Adam Styer`,
      date: today,
      slug: fullSlug,
      content: parsed.webContent,
      category: parsed.pageCategory || formData.category || "Market Intel",
    });

    if (!isPreview) {
      // Publish to /realtor-updates/
      await createGitHubFile(`realtor-updates/${filename}`, realtorPageHtml);

      // Update the realtor manifest
      await updateRealtorManifest({
        slug: fullSlug,
        title: parsed.pageTitle || topic,
        description: parsed.pageDescription || `${topic} — partner resources from Adam Styer`,
        date: today,
        category: parsed.pageCategory || formData.category || "Market Intel",
      });
    }

    // ----------------------------------------------------------------
    // STEP 3: Send Mailchimp campaign (only if live)
    // ----------------------------------------------------------------
    const results = { pageUrl, filename, campaigns: [] };

    if (!isPreview) {
      const mcApiKey = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key;
      const mcServer = process.env.MAILCHIMP_SERVER_PREFIX || process.env.mailchimp_server_prefix;
      const realtorListId = process.env.MAILCHIMP_REALTOR_LIST_ID;

      if (mcApiKey && mcServer && realtorListId && parsed.realtorEmail) {
        mailchimp.setConfig({
          apiKey: mcApiKey,
          server: mcServer,
        });

        const campaignResult = await createAndSendCampaign({
          listId: realtorListId,
          subject: parsed.realtorSubject || `${topic} - Adam Styer | Mortgage Solutions LP`,
          preheader: parsed.realtorPreheader || "",
          html: injectPageLink(parsed.realtorEmail, pageUrl),
          fromName: "Adam Styer",
          replyTo: "adam@thestyerteam.com",
        });
        results.campaigns.push({ audience: "realtor", ...campaignResult });
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
        preview: {
          realtorSubject: parsed.realtorSubject,
          realtorPreheader: parsed.realtorPreheader,
          pageTitle: parsed.pageTitle,
          pageDescription: parsed.pageDescription,
          pageCategory: parsed.pageCategory,
          webContent: parsed.webContent,
          realtorEmailHtml: parsed.realtorEmail ? injectPageLink(parsed.realtorEmail, pageUrl) : null,
        },
      }),
    };
  } catch (err) {
    console.error("Realtor content generation error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || "Internal server error" }),
    };
  }
};

// ====================================================================
// PARSE AI RESPONSE (realtor-specific delimiters)
// ====================================================================

function parseRealtorAIResponse(text) {
  const result = {
    realtorEmail: null,
    realtorSubject: null,
    realtorPreheader: null,
    webContent: null,
    pageTitle: null,
    pageDescription: null,
    pageCategory: null,
  };

  // Extract realtor email
  const emailMatch = text.match(
    /---REALTOR_EMAIL_START---([\s\S]*?)---REALTOR_EMAIL_END---/
  );
  if (emailMatch) result.realtorEmail = emailMatch[1].trim();

  // Extract realtor web content
  const webMatch = text.match(
    /---REALTOR_WEB_CONTENT_START---([\s\S]*?)---REALTOR_WEB_CONTENT_END---/
  );
  if (webMatch) result.webContent = stripNestedHtmlDocument(webMatch[1].trim());

  // Extract metadata
  const subjectMatch = text.match(/REALTOR_SUBJECT:\s*(.+)/);
  if (subjectMatch) result.realtorSubject = subjectMatch[1].trim();

  const preheaderMatch = text.match(/REALTOR_PREHEADER:\s*(.+)/);
  if (preheaderMatch) result.realtorPreheader = preheaderMatch[1].trim();

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
    message: `Add realtor content: ${filePath}`,
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
// GITHUB API: Update realtor manifest with new post
// ====================================================================

async function updateRealtorManifest({ slug, title, description, date, category }) {
  const token = process.env.GITHUB_TOKEN || process.env.github_token;
  const repo = process.env.GITHUB_REPO || process.env.Github_repo;
  const manifestPath = "realtor-updates/manifest.json";
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
    console.log("No existing realtor manifest found, creating new one");
  }

  // Add new post at the beginning (newest first)
  posts.unshift({
    slug,
    title,
    description,
    date,
    category,
    url: `/realtor-updates/${slug}.html`,
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
    message: `Update realtor manifest: add ${slug}`,
    content: Buffer.from(manifestContent).toString("base64"),
    branch: "main",
  };

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
    console.error(`Realtor manifest update failed (${putRes.status}): ${errBody}`);
    // Don't throw — the page was already published, manifest is non-critical
  }
}

// ====================================================================
// MAILCHIMP: Create campaign + send
// ====================================================================

async function createAndSendCampaign({ listId, subject, preheader, html, fromName, replyTo }) {
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

  await mailchimp.campaigns.setContent(campaign.id, { html });
  await mailchimp.campaigns.send(campaign.id);

  return { id: campaign.id, status: "sent", subject };
}

// ====================================================================
// HELPER: Inject page URL into email HTML
// ====================================================================

function injectPageLink(html, pageUrl) {
  return html.replace(/\[PAGE_URL\]/g, pageUrl);
}

// ====================================================================
// HELPER: Force all links to absolute URL
// ====================================================================

function forceAbsoluteLinks(html, pageUrl) {
  let result = html.replace(/\[PAGE_URL\]/g, pageUrl);

  result = result.replace(
    /href=["']([^"']*?\.html)["']/gi,
    (match, href) => {
      if (href.startsWith("http") || href.startsWith("../") || href.startsWith("/")) {
        return match;
      }
      return `href="${pageUrl}"`;
    }
  );

  return result;
}

// ====================================================================
// HELPER: Strip nested HTML document tags from AI output
// ====================================================================

function stripNestedHtmlDocument(html) {
  let cleaned = html;

  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, "");
  cleaned = cleaned.replace(/<\/?html[^>]*>/gi, "");
  cleaned = cleaned.replace(/<head[\s\S]*?<\/head>/gi, "");
  cleaned = cleaned.replace(/<\/?body[^>]*>/gi, "");
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, "");
  cleaned = cleaned.replace(/^[\s\n]*<div class="container">\s*/i, "");
  cleaned = cleaned.replace(/\s*<\/div>[\s\n]*$/i, "");

  return cleaned.trim();
}
