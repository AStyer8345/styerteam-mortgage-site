const mailchimp = require("@mailchimp/mailchimp_marketing");

const CORRECTION_HTML = `
<div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
  <p>Hey &mdash;</p>
  <p>I messed up the link in my last email. Technology, right?</p>
  <p>Here's the actual article: <a href="https://styermortgage.com/updates/2026-02-20-fast-closes-teamwork-and-spring-market-momentum.html" style="color: #1a73e8; text-decoration: underline;">Fast Closes and Spring Market Momentum</a></p>
  <p>Sorry about that. Talk soon,</p>
  <p>
    Adam Styer<br>
    Adam Styer | Mortgage Solutions LP<br>
    NMLS# 513013 | (512) 956-6010
  </p>
</div>
`;

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
    const mcApiKey = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key;
    const mcServer = process.env.MAILCHIMP_SERVER_PREFIX || process.env.mailchimp_server_prefix;

    if (!mcApiKey || !mcServer) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Mailchimp not configured" }) };
    }

    mailchimp.setConfig({ apiKey: mcApiKey, server: mcServer });

    const results = [];

    // Send to borrower list
    const borrowerListId = process.env.MAILCHIMP_BORROWER_LIST_ID;
    if (borrowerListId) {
      const campaign = await mailchimp.campaigns.create({
        type: "regular",
        recipients: { list_id: borrowerListId },
        settings: {
          subject_line: "That link didn't work — here's the right one",
          preview_text: "Sorry about that! Here's the correct article link.",
          from_name: "Adam Styer",
          reply_to: "adam@thestyerteam.com",
        },
      });
      await mailchimp.campaigns.setContent(campaign.id, { html: CORRECTION_HTML });
      await mailchimp.campaigns.send(campaign.id);
      results.push({ audience: "borrower", id: campaign.id, status: "sent" });
    }

    // Send to realtor list
    const realtorListId = process.env.MAILCHIMP_REALTOR_LIST_ID;
    if (realtorListId) {
      const campaign = await mailchimp.campaigns.create({
        type: "regular",
        recipients: { list_id: realtorListId },
        settings: {
          subject_line: "That link didn't work — here's the right one",
          preview_text: "Sorry about that! Here's the correct article link.",
          from_name: "Adam Styer",
          reply_to: "adam@thestyerteam.com",
        },
      });
      await mailchimp.campaigns.setContent(campaign.id, { html: CORRECTION_HTML });
      await mailchimp.campaigns.send(campaign.id);
      results.push({ audience: "realtor", id: campaign.id, status: "sent" });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, campaigns: results }),
    };
  } catch (err) {
    console.error("Correction email error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || "Failed to send correction" }),
    };
  }
};
