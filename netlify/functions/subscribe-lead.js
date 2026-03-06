// netlify/functions/subscribe-lead.js
// Subscribes a contact to Mailchimp and applies a tag to trigger a Journey.
//
// POST /.netlify/functions/subscribe-lead
// Body: { "email": "...", "fname": "...", "tag": "ftb-lead" }
//
// Required env var: MAILCHIMP_API_KEY (set in Netlify → Site config → Env vars)
//
// Flow:
//   1. PUT /lists/{id}/members/{md5_hash}  → subscribe or update existing contact
//   2. POST /lists/{id}/members/{md5_hash}/tags → apply tag → fires Journey trigger

const crypto = require("crypto");

const LIST_ID  = "5053c57af2";
const DC       = "us13";
const API_BASE = `https://${DC}.api.mailchimp.com/3.0`;

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

  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey) {
    console.error("MAILCHIMP_API_KEY env var is not set");
    return respond(500, { error: "Server misconfiguration" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "Invalid JSON" });
  }

  const { email, fname, tag } = body;

  if (!email || !tag) {
    return respond(400, { error: "Missing required fields: email, tag" });
  }

  const emailHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
  const authHeader = "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");

  // ── 1. Subscribe / update member ─────────────────────────────────────────────
  const memberRes = await fetch(`${API_BASE}/lists/${LIST_ID}/members/${emailHash}`, {
    method: "PUT",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({
      email_address: email.toLowerCase(),
      status_if_new: "subscribed",
      status: "subscribed",
      merge_fields: { FNAME: fname || "" },
    }),
  });

  if (!memberRes.ok) {
    const err = await memberRes.json();
    console.error("Mailchimp member PUT failed:", err);
    return respond(502, { error: "Failed to subscribe contact", detail: err.detail });
  }

  // ── 2. Apply tag → fires Journey trigger ─────────────────────────────────────
  const tagRes = await fetch(`${API_BASE}/lists/${LIST_ID}/members/${emailHash}/tags`, {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
  });

  if (!tagRes.ok) {
    const err = await tagRes.json();
    console.error("Mailchimp tag POST failed:", err);
    return respond(502, { error: "Subscribed but tag failed", detail: err.detail });
  }

  return respond(200, { success: true, message: "Subscribed and tagged." });
};

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
