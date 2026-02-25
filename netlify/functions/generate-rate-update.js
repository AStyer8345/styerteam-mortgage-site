const Anthropic = require("@anthropic-ai/sdk");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { buildRatePrompt } = require("./lib/rate-prompt-builder");
const { buildRatePage } = require("./lib/rate-page-builder");

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
    const { rates, audiences = [], mode } = formData;
    const isPreview = mode === "preview";

    if (!rates || !rates.trim()) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Rates are required" }) };
    }

    // ----------------------------------------------------------------
    // STEP 0: Compute the page URL (date-based, no slug needed)
    // ----------------------------------------------------------------
    const today = new Date().toISOString().split("T")[0];
    const filename = `${today}.html`;
    const pageUrl = `https://styermortgage.com/rates/${filename}`;

    // ----------------------------------------------------------------
    // STEP 1: Generate content via Claude API
    // ----------------------------------------------------------------
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildRatePrompt(formData, pageUrl);

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
    const parsed = parseAIResponse(aiText);

    if (!parsed.webContent) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to parse AI response", raw: aiText.substring(0, 500) }),
      };
    }

    // Force all email links to use absolute URL
    if (parsed.borrowerEmail) {
      parsed.borrowerEmail = forceAbsoluteLinks(parsed.borrowerEmail, pageUrl);
    }
    if (parsed.realtorEmail) {
      parsed.realtorEmail = forceAbsoluteLinks(parsed.realtorEmail, pageUrl);
    }

    // ----------------------------------------------------------------
    // STEP 2: Build rate page HTML / Publish (only if live)
    // ----------------------------------------------------------------
    const fullPageHtml = buildRatePage({
      title: parsed.pageTitle || `Weekly Rate Update - ${formatDateForTitle(today)}`,
      description: parsed.pageDescription || "This week's mortgage rates from Adam Styer at Mortgage Solutions LP",
      date: today,
      rates,
      direction: formData.direction || null,
      commentary: parsed.webContent,
    });

    if (!isPreview) {
      await createGitHubFile(filename, fullPageHtml);
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

        if (sendBorrower && parsed.borrowerEmail) {
          const borrowerResult = await createAndSendCampaign({
            listId: process.env.MAILCHIMP_BORROWER_LIST_ID,
            subject: parsed.borrowerSubject || `Rate Update - ${formatDateForTitle(today)}`,
            preheader: parsed.borrowerPreheader || "",
            html: parsed.borrowerEmail,
            fromName: "Adam Styer",
            replyTo: "adam@thestyerteam.com",
          });
          results.campaigns.push({ audience: "borrower", ...borrowerResult });
        }

        if (sendRealtor && parsed.realtorEmail) {
          const realtorResult = await createAndSendCampaign({
            listId: process.env.MAILCHIMP_REALTOR_LIST_ID,
            subject: parsed.realtorSubject || `Rate Update - ${formatDateForTitle(today)}`,
            preheader: parsed.realtorPreheader || "",
            html: parsed.realtorEmail,
            fromName: "Adam Styer",
            replyTo: "adam@thestyerteam.com",
          });
          results.campaigns.push({ audience: "realtor", ...realtorResult });
        }
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
          borrowerSubject: parsed.borrowerSubject,
          borrowerPreheader: parsed.borrowerPreheader,
          realtorSubject: parsed.realtorSubject,
          realtorPreheader: parsed.realtorPreheader,
          pageTitle: parsed.pageTitle,
          pageDescription: parsed.pageDescription,
          webContent: parsed.webContent,
          borrowerEmailHtml: parsed.borrowerEmail || null,
          realtorEmailHtml: parsed.realtorEmail || null,
        },
      }),
    };
  } catch (err) {
    console.error("Rate update generation error:", err);
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
  };

  const borrowerMatch = text.match(/---BORROWER_EMAIL_START---([\s\S]*?)---BORROWER_EMAIL_END---/);
  if (borrowerMatch) result.borrowerEmail = borrowerMatch[1].trim();

  const realtorMatch = text.match(/---REALTOR_EMAIL_START---([\s\S]*?)---REALTOR_EMAIL_END---/);
  if (realtorMatch) result.realtorEmail = realtorMatch[1].trim();

  const webMatch = text.match(/---WEB_CONTENT_START---([\s\S]*?)---WEB_CONTENT_END---/);
  if (webMatch) result.webContent = stripNestedHtmlDocument(webMatch[1].trim());

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

  return result;
}

// ====================================================================
// GITHUB API: Create file in repo
// ====================================================================

async function createGitHubFile(filename, content) {
  const token = process.env.GITHUB_TOKEN || process.env.github_token;
  const repo = process.env.GITHUB_REPO || process.env.Github_repo;
  const path = `rates/${filename}`;
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;

  const body = JSON.stringify({
    message: `Add rate update page: ${filename}`,
    content: Buffer.from(content).toString("base64"),
    branch: "main",
  });

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "StyerTeam-RateUpdate-Bot",
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
// HELPER: Force all links to use absolute URL
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
// HELPER: Strip nested HTML document tags
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

// ====================================================================
// HELPER: Format date for fallback titles
// ====================================================================

function formatDateForTitle(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
