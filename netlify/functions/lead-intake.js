// netlify/functions/lead-intake.js
// Unified lead ingress — replaces subscribe-lead.js for the n8n → Workflow DevKit cutover.
//
// Behavior:
//   1. Subscribes contact to Mailchimp list (no journey tagging — Workflow DevKit owns drip now)
//   2. POSTs normalized payload (incl. UTM / source_page / referrer) to LoanOS /api/contacts/web-lead
//
// Accepts BOTH payload shapes (backward-compatible with existing site forms):
//   - legacy: { email, fname, lname, phone, tag, loan_goal, lead_source, utm_*, page_url, referrer }
//   - plan  : { email, first_name, last_name, phone, loan_goal, purchase_price, credit_score,
//               situation, page_url, form-name, utm_*, referrer }
//
// Accepts both application/json and application/x-www-form-urlencoded bodies.
//
// Required Netlify env vars (preserves names from subscribe-lead.js):
//   MAILCHIMP_API_KEY              — datacenter derived from key suffix, with server-prefix fallback
//   MAILCHIMP_BORROWER_LIST_ID     — list ID (no hard-coded fallback)
//   MAILCHIMP_SERVER_PREFIX        — fallback datacenter (e.g. "us1") if key has no suffix
//   LOANOS_URL                     — base URL to LoanOS (e.g. https://app.loanos.io)
//   LOANOS_AGENT_SECRET            — bearer token for /api/contacts/web-lead

const crypto = require("crypto");

const LIST_ID   = process.env.MAILCHIMP_BORROWER_LIST_ID || "";
const _apiKey   = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key || "";
const DC        = (_apiKey.includes("-") ? _apiKey.split("-").pop() : null)
                  || process.env.MAILCHIMP_SERVER_PREFIX
                  || process.env.mailchimp_server_prefix
                  || "";
const API_BASE  = DC ? `https://${DC}.api.mailchimp.com/3.0` : "";

const LOANOS_URL    = process.env.LOANOS_URL || process.env.LOANOS_API_URL || "";
const LOANOS_SECRET = process.env.LOANOS_AGENT_SECRET || "";

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
    const ctype = (event.headers["content-type"] || event.headers["Content-Type"] || "").toLowerCase();
    if (ctype.includes("application/json")) {
      body = JSON.parse(event.body || "{}");
    } else {
      body = Object.fromEntries(new URLSearchParams(event.body || ""));
    }
  } catch {
    return respond(400, { error: "Invalid body" });
  }

  // Honeypot — silently succeed
  if (body["bot-field"] || body.honeypot) {
    return respond(200, { ok: true });
  }

  // Normalize field names (plan shape + legacy shape)
  const firstName  = body.first_name ?? body["first-name"] ?? body.fname ?? "";
  const lastName   = body.last_name  ?? body["last-name"]  ?? body.lname ?? "";
  const email      = (body.email || "").toLowerCase().trim();
  const phone      = body.phone ?? "";
  const loanGoal   = body.loan_goal ?? body.loan_type ?? body.goal ?? "";
  const tag        = body.tag ?? (loanGoal ? `goal-${loanGoal}` : "web-lead");
  const leadSource = body.lead_source ?? "Website";
  const formName   = body["form-name"] ?? body.form_name ?? "unknown";

  if (!email) {
    return respond(400, { error: "email required" });
  }

  // Run Mailchimp + LoanOS in parallel; neither is fatal.
  const [mcResult, loResult] = await Promise.allSettled([
    addToMailchimp({ email, firstName, lastName, tag }),
    createLoanosContact({
      firstName, lastName, email, phone,
      loanGoal, leadSource, formName,
      purchasePrice: body.purchase_price ?? null,
      creditScore:   body.credit_score ?? null,
      situation:     body.situation ?? null,
      sourcePage:    body.page_url ?? body.source_page ?? null,
      utmSource:     body.utm_source ?? null,
      utmMedium:     body.utm_medium ?? null,
      utmCampaign:   body.utm_campaign ?? null,
      referrer:      body.referrer ?? null,
    }),
  ]);

  if (mcResult.status === "rejected") {
    console.error("[lead-intake] Mailchimp error (non-fatal):", mcResult.reason?.message);
  }
  if (loResult.status === "rejected") {
    console.error("[lead-intake] LoanOS error (non-fatal):", loResult.reason?.message);
  }

  return respond(200, {
    success:   true,
    mailchimp: mcResult.status === "fulfilled" ? "ok" : "failed",
    loanos:    loResult.status === "fulfilled" ? "ok" : "failed",
  });
};

// ── Mailchimp ─────────────────────────────────────────────────────────────────
// List add only. No PA/DPA journey tagging — Workflow DevKit owns drip content now.
// We still apply the tag for segmentation/reporting, but it no longer fires a Journey.

async function addToMailchimp({ email, firstName, lastName, tag }) {
  if (!_apiKey || !LIST_ID || !API_BASE) {
    console.warn("[lead-intake] Mailchimp env missing — skipping list add");
    return;
  }

  const authHeader = "Basic " + Buffer.from(`anystring:${_apiKey}`).toString("base64");
  const emailHash  = crypto.createHash("md5").update(email).digest("hex");

  const memberRes = await fetch(`${API_BASE}/lists/${LIST_ID}/members/${emailHash}`, {
    method: "PUT",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      status:        "subscribed",
      merge_fields:  { FNAME: firstName || "", LNAME: lastName || "" },
    }),
  });
  if (!memberRes.ok) {
    const err = await memberRes.json().catch(() => ({}));
    throw new Error(`Mailchimp PUT failed: ${err.detail || memberRes.status}`);
  }

  // Segmentation tag — no Journey tied to it anymore.
  if (tag) {
    const tagRes = await fetch(`${API_BASE}/lists/${LIST_ID}/members/${emailHash}/tags`, {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
    });
    if (!tagRes.ok) {
      const err = await tagRes.json().catch(() => ({}));
      throw new Error(`Mailchimp tag failed: ${err.detail || tagRes.status}`);
    }
  }
}

// ── LoanOS ────────────────────────────────────────────────────────────────────

async function createLoanosContact(p) {
  if (!LOANOS_URL || !LOANOS_SECRET) {
    console.warn("[lead-intake] LOANOS_URL or LOANOS_AGENT_SECRET missing — skipping LoanOS POST");
    return;
  }

  const res = await fetch(`${LOANOS_URL}/api/contacts/web-lead`, {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${LOANOS_SECRET}`,
    },
    body: JSON.stringify({
      org_slug:       "adam-styer-mslp",
      first_name:     p.firstName,
      last_name:      p.lastName,
      email:          p.email,
      phone:          p.phone,
      loan_goal:      p.loanGoal,
      loan_type:      p.loanGoal,
      lead_source:    p.leadSource,
      referral_type:  "web_lead",
      "form-name":    p.formName,
      purchase_price: p.purchasePrice,
      credit_score:   p.creditScore,
      situation:      p.situation,
      source_page:    p.sourcePage,
      utm_source:     p.utmSource,
      utm_medium:     p.utmMedium,
      utm_campaign:   p.utmCampaign,
      campaign:       p.utmCampaign || p.utmSource || "",
      referrer:       p.referrer,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`LoanOS API ${res.status}: ${err.error || "unknown"}`);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
