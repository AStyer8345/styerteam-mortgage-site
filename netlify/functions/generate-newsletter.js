const Anthropic = require("@anthropic-ai/sdk");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { buildPrompt } = require("./lib/prompt-builder");
const { buildWebPage } = require("./lib/page-builder");

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
    const { topic, audiences, mode } = formData;
    const isPreview = mode === "preview";

    if (!topic) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Topic is required" }) };
    }

    // ----------------------------------------------------------------
    // STEP 1: Generate content via Claude API
    // ----------------------------------------------------------------
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildPrompt(formData);

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

    // Parse the AI response into sections
    const parsed = parseAIResponse(aiText);

    if (!parsed.webContent) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to parse AI response", raw: aiText.substring(0, 500) }),
      };
    }

    // Inject photo into the "Personal Corner" section of web content only (no photos in emails)
    if (formData.photo) {
      parsed.webContent = injectPhotoIntoPersonalSection(parsed.webContent, formData.photo);
    }

    // ----------------------------------------------------------------
    // STEP 2: Build page data (always) / Publish (only if live)
    // ----------------------------------------------------------------
    const today = new Date().toISOString().split("T")[0];
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)
      .replace(/-+$/, "");
    const filename = `${today}-${slug}.html`;
    const pageUrl = `https://styermortgage.com/updates/${filename}`;

    const fullPageHtml = buildWebPage({
      title: parsed.pageTitle || topic,
      description: parsed.pageDescription || `Weekly update from Adam Styer - ${topic}`,
      date: today,
      content: parsed.webContent,
      rates: formData.rates || null,
    });

    // In preview mode, skip publishing. In live mode, publish.
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
            subject: parsed.borrowerSubject || `${topic} - The Styer Team`,
            preheader: parsed.borrowerPreheader || "",
            html: injectPageLink(parsed.borrowerEmail, pageUrl),
            fromName: "Adam Styer",
            replyTo: "adam@thestyerteam.com",
          });
          results.campaigns.push({ audience: "borrower", ...borrowerResult });
        }

        if (sendRealtor && parsed.realtorEmail) {
          const realtorResult = await createAndSendCampaign({
            listId: process.env.MAILCHIMP_REALTOR_LIST_ID,
            subject: parsed.realtorSubject || `${topic} - The Styer Team`,
            preheader: parsed.realtorPreheader || "",
            html: injectPageLink(parsed.realtorEmail, pageUrl),
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
  if (webMatch) result.webContent = webMatch[1].trim();

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

  return result;
}

// ====================================================================
// GITHUB API: Create file in repo
// ====================================================================

async function createGitHubFile(filename, content) {
  const token = process.env.GITHUB_TOKEN || process.env.github_token;
  const repo = process.env.GITHUB_REPO || process.env.Github_repo;
  const path = `updates/${filename}`;
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;

  const body = JSON.stringify({
    message: `Add newsletter page: ${filename}`,
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
// MAILCHIMP: Create campaign + send
// ====================================================================

async function createAndSendCampaign({ listId, subject, preheader, html, fromName, replyTo }) {
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

  // Send
  await mailchimp.campaigns.send(campaign.id);

  return { id: campaign.id, status: "sent", subject };
}

// ====================================================================
// HELPER: Inject the page URL into email HTML
// ====================================================================

function injectPageLink(html, pageUrl) {
  return html.replace(/\[PAGE_URL\]/g, pageUrl);
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
