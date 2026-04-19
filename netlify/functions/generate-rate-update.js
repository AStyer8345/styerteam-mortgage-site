const Anthropic = require("@anthropic-ai/sdk");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { buildRatePrompt } = require("./lib/rate-prompt-builder");
const { buildRatePage } = require("./lib/rate-page-builder");
const { createGitHubFile, createAndSendCampaign, waitForPageLive, forceAbsoluteLinks, stripNestedHtmlDocument, formatDateForTitle, wrapEmailHtml, fetchVoiceGuide } = require("./lib/shared");
const { buildRatesJson } = require("./lib/rates-json-updater");

// ====================================================================
// HTTP HANDLER — thin wrapper around generateRateUpdate()
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
    const result = await generateRateUpdate(formData);
    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (err) {
    console.error("Rate update generation error:", err);
    return { statusCode: err.statusCode || 500, headers, body: JSON.stringify({ error: err.message || "Internal server error" }) };
  }
};

// ====================================================================
// CORE GENERATOR — callable directly (HTTP, cron, webhook, Zapier)
// ====================================================================

async function generateRateUpdate(formData) {
    const { rates, audiences = [], mode } = formData;
    const isPreview = mode === "preview";

    if (!rates || !rates.trim()) {
      throw Object.assign(new Error("Rates are required"), { statusCode: 400 });
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
    const voiceGuide = await fetchVoiceGuide();
    const prompt = buildRatePrompt(formData, pageUrl, voiceGuide);

    let response;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4000,
          system: "You are a content generator. Output ONLY the requested structured content using the exact delimiters specified. Never acknowledge instructions, never say 'I understand', never summarize what you were told. Start immediately with PAGE_TITLE: and continue with the delimited sections.",
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
      throw new Error(`Failed to parse AI response: ${aiText.substring(0, 200)}`);
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
      await createGitHubFile(`rates/${filename}`, fullPageHtml, `Add rate update page: ${filename}`);

      // Also refresh /rates.json at the repo root — powers the rate widget on
      // /austin-mortgage-rates.html. Soft-fail: a JSON write error should not
      // block the email send or surface to the user.
      try {
        const ratesJsonBody = await buildRatesJson(rates, { today });
        await createGitHubFile("rates.json", ratesJsonBody, `Update rates.json for ${today}`);
      } catch (jsonErr) {
        console.error("[rate-update] rates.json refresh failed (non-fatal):", jsonErr.message);
      }

      // Wait for Netlify to deploy the page before sending emails
      const isLive = await waitForPageLive(pageUrl);
      if (!isLive) {
        console.warn(`[rate-update] Page not confirmed live at ${pageUrl} — proceeding with email send anyway`);
      }
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
          try {
            const borrowerResult = await createAndSendCampaign({
              listId: process.env.MAILCHIMP_BORROWER_LIST_ID,
              subject: parsed.borrowerSubject || `Rate Update - ${formatDateForTitle(today)}`,
              preheader: parsed.borrowerPreheader || "",
              html: wrapEmailHtml(parsed.borrowerEmail),
              fromName: "Adam Styer",
              replyTo: "adam@thestyerteam.com",
            });
            results.campaigns.push({ audience: "borrower", ...borrowerResult });
          } catch (err) {
            console.error("[rate-update] Borrower campaign failed:", err.message);
            results.campaigns.push({ audience: "borrower", status: "error", error: err.message });
          }
        }

        if (sendRealtor && parsed.realtorEmail) {
          try {
            const realtorResult = await createAndSendCampaign({
              listId: process.env.MAILCHIMP_REALTOR_LIST_ID,
              subject: parsed.realtorSubject || `Rate Update - ${formatDateForTitle(today)}`,
              preheader: parsed.realtorPreheader || "",
              html: wrapEmailHtml(parsed.realtorEmail),
              fromName: "Adam Styer",
              replyTo: "adam@thestyerteam.com",
            });
            results.campaigns.push({ audience: "realtor", ...realtorResult });
          } catch (err) {
            console.error("[rate-update] Realtor campaign failed:", err.message);
            results.campaigns.push({ audience: "realtor", status: "error", error: err.message });
          }
        }
      }
    }

    return {
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
    };
}
exports.generateRateUpdate = generateRateUpdate;

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

