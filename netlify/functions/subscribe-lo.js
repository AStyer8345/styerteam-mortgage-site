// netlify/functions/subscribe-lo.js
// Handles LO Waitlist form submissions from /loanos-waitlist.html
//
// POST /.netlify/functions/subscribe-lo
// Body: { fname, lname, email, nmls, company, tag, lead_source, utm_source, utm_medium, utm_campaign, page_url }
//
// Actions (in parallel):
//   1. Fire n8n webhook → Supabase activity_log insert + Outlook notify Adam
//   2. Add to Mailchimp "LoanOS Waitlist" list (only if MAILCHIMP_LO_LIST_ID is set)
//
// Required Netlify env vars (already set):
//   (none strictly required — n8n webhook URL is hardcoded)
//
// Optional env vars (set when Mailchimp LO list is created):
//   MAILCHIMP_LO_LIST_ID     — Mailchimp audience ID for "LoanOS Waitlist"
//   MAILCHIMP_API_KEY        — already set for borrower funnel, reused here
//   MAILCHIMP_SERVER_PREFIX  — already set, reused here

const crypto = require("crypto");

// n8n webhook — LO Waitlist Intake workflow
const N8N_LO_WAITLIST_URL = "https://styer.app.n8n.cloud/webhook/loanos-waitlist";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return respond(405, { error: "Method not allowed" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "Invalid JSON" });
  }

  const { fname, lname, email, nmls, company, lead_source, utm_source, utm_medium, utm_campaign, page_url } = body;

  if (!email || !fname || !lname) {
    return respond(400, { error: "Missing required fields: fname, lname, email" });
  }

  // Fire both in parallel — n8n webhook (required) + Mailchimp (optional)
  const tasks = [
    notifyN8n({ fname, lname, email, nmls, company, lead_source, utm_source, utm_medium, utm_campaign, page_url }),
  ];

  const loListId = process.env.MAILCHIMP_LO_LIST_ID || "";
  const apiKey   = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key || "";
  if (loListId && apiKey) {
    tasks.push(addToMailchimp({ email, fname, lname, apiKey, listId: loListId }));
  }

  const results = await Promise.allSettled(tasks);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[subscribe-lo] Task failed:", result.reason?.message || result.reason);
    }
  }

  const n8nOk       = results[0].status === "fulfilled";
  const mailchimpOk = results.length > 1 ? results[1].status === "fulfilled" : null;

  return respond(200, {
    success:   true,
    n8n:       n8nOk ? "ok" : "failed",
    mailchimp: mailchimpOk === null ? "skipped" : (mailchimpOk ? "ok" : "failed"),
  });
};

// ── n8n webhook ──────────────────────────────────────────────────────────────

async function notifyN8n({ fname, lname, email, nmls, company, lead_source, utm_source, utm_medium, utm_campaign, page_url }) {
  const res = await fetch(N8N_LO_WAITLIST_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name:   fname || "",
      last_name:    lname || "",
      email:        email,
      nmls:         nmls || "",
      company:      company || "",
      lead_source:  lead_source || "LoanOS Waitlist",
      utm_source:   utm_source || "",
      utm_medium:   utm_medium || "",
      utm_campaign: utm_campaign || "",
      page_url:     page_url || "",
      submitted_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    throw new Error(`n8n webhook failed: ${res.status}`);
  }
}

// ── Mailchimp (optional — skipped if MAILCHIMP_LO_LIST_ID not set) ──────────

async function addToMailchimp({ email, fname, lname, apiKey, listId }) {
  const dc          = apiKey.includes("-") ? apiKey.split("-").pop() : "";
  const apiBase     = `https://${dc}.api.mailchimp.com/3.0`;
  const authHeader  = "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");
  const emailHash   = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

  const memberRes = await fetch(`${apiBase}/lists/${listId}/members/${emailHash}`, {
    method:  "PUT",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({
      email_address: email.toLowerCase(),
      status_if_new: "subscribed",
      status:        "subscribed",
      merge_fields:  { FNAME: fname || "", LNAME: lname || "" },
    }),
  });
  if (!memberRes.ok) {
    const err = await memberRes.json().catch(() => ({}));
    throw new Error(`Mailchimp PUT failed: ${err.detail || memberRes.status}`);
  }

  const tagRes = await fetch(`${apiBase}/lists/${listId}/members/${emailHash}/tags`, {
    method:  "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ tags: [{ name: "loanos-waitlist", status: "active" }] }),
  });
  if (!tagRes.ok) {
    const err = await tagRes.json().catch(() => ({}));
    throw new Error(`Mailchimp tag failed: ${err.detail || tagRes.status}`);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
