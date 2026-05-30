// netlify/functions/lead-intake.js
// Unified lead ingress for site forms.
//
// Behavior (in parallel, none fatal):
//   1. Mailchimp: list add + segmentation tag
//   2. LoanOS:    POST /api/contacts/web-lead (contact record)
//   3. n8n:       fire the appropriate workflow for this lead type:
//                   - tag=ftb-guide      → /webhook/ftb-guide-email   (one-shot welcome)
//                   - tag=ftb-dpa-guide  → /webhook/dpa-nurture       (8-email 52-day drip)
//                   - lead_source=Pre-Approval Funnel → /webhook/pa-nurture (6-email 60-day drip)
//                   - PA/DPA/Refi/Rate-Alert leads → /webhook/pre-approval-lead (Adam notify)
//   4. Supabase:  best-effort drip_enrollments insert for PA + DPA leads
//                 (n8n workflow also enrolls; resolution=ignore-duplicates avoids collision)
//
// Accepts BOTH payload shapes (backward-compatible with existing site forms):
//   - legacy: { email, fname, lname, phone, tag, loan_goal, lead_source, utm_*, page_url, referrer }
//   - plan  : { email, first_name, last_name, phone, loan_goal, purchase_price, down_payment,
//               credit_score, income_type, property_use, target_city, timeline, lender_status,
//               documentation_issue, situation, page_url, form-name, utm_*, referrer }
//
// Accepts both application/json and application/x-www-form-urlencoded bodies.
//
// Required Netlify env vars:
//   MAILCHIMP_API_KEY              — datacenter derived from key suffix, with server-prefix fallback
//   MAILCHIMP_BORROWER_LIST_ID     — list ID (no hard-coded fallback)
//   MAILCHIMP_SERVER_PREFIX        — fallback datacenter (e.g. "us1") if key has no suffix
//   LOANOS_URL                     — base URL to LoanOS (e.g. https://app.loanos.io)
//   LOANOS_AGENT_SECRET            — bearer token for /api/contacts/web-lead
//   SUPABASE_SERVICE_ROLE_KEY      — for direct drip_enrollments insert (PA + DPA backup)

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

// n8n webhook endpoints
const N8N_FTB_GUIDE_URL   = "https://styer.app.n8n.cloud/webhook/ftb-guide-email";
const N8N_PA_NURTURE_URL  = "https://styer.app.n8n.cloud/webhook/pa-nurture";
const N8N_DPA_NURTURE_URL = "https://styer.app.n8n.cloud/webhook/dpa-nurture";
const N8N_PA_LEAD_URL     = "https://styer.app.n8n.cloud/webhook/pre-approval-lead";

// Supabase direct drip_enrollments insert (backup to n8n workflow's internal enrollment)
const SUPABASE_URL    = "https://uuqedsvjlkeszrbwzizl.supabase.co";
const SUPABASE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const PA_CAMPAIGN_ID  = "8b540726-0143-4d96-b1fe-deb65450705d";
const DPA_CAMPAIGN_ID = "46ea4f7b-2f78-444b-b712-fed6ec52da70";
const ORG_ID          = "18613f82-fdd9-42dd-a09e-f3c577328258";

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
      downPayment:   body.down_payment ?? null,
      creditScore:   body.credit_score ?? null,
      incomeType:    body.income_type ?? null,
      propertyUse:   body.property_use ?? null,
      targetCity:    body.target_city ?? null,
      timeline:      body.timeline ?? null,
      lenderStatus:  body.lender_status ?? null,
      documentationIssue: body.documentation_issue ?? null,
      situation:     body.situation ?? null,
      tcpaConsent:   body.tcpa_consent ?? null,
      smsOptIn:      body.sms_opt_in ?? null,
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

  // Route to the right n8n workflow based on tag / lead_source.
  // All n8n calls are fire-and-forget — the function returns before they complete.
  const isPAFunnel  = leadSource === "Pre-Approval Funnel";
  const isDPAGuide  = tag === "ftb-dpa-guide" || tag === "ftb-dpa-guide-form" || leadSource === "FTB DPA Guide";
  const isFTBGuide  = tag === "ftb-guide" || tag === "ftb-lead";
  const isHighIntent = isPAFunnel || isDPAGuide || leadSource === "Refinance Funnel" || leadSource === "Rate Alert Funnel";

  if (isFTBGuide) {
    fireWebhook(N8N_FTB_GUIDE_URL, { email, fname: firstName }).catch(err =>
      console.error("[lead-intake] FTB guide email webhook failed:", err.message)
    );
  }
  if (isPAFunnel) {
    fireWebhook(N8N_PA_NURTURE_URL, { email, first_name: firstName }).catch(err =>
      console.error("[lead-intake] PA nurture webhook failed:", err.message)
    );
  }
  if (isDPAGuide) {
    fireWebhook(N8N_DPA_NURTURE_URL, { email, first_name: firstName }).catch(err =>
      console.error("[lead-intake] DPA nurture webhook failed:", err.message)
    );
  }
  if (isHighIntent) {
    notifyAdam({
      first_name:   firstName,
      last_name:    lastName,
      email,
      phone,
      loan_goal:    loanGoal,
      sms_opt_in:   body.sms_opt_in === true || body.sms_opt_in === "on",
      utm_source:   body.utm_source || "",
      utm_medium:   body.utm_medium || "",
      utm_campaign: body.utm_campaign || "",
      page_url:     body.page_url || "",
    }).catch(err =>
      console.error("[lead-intake] Adam notify failed:", err.message)
    );
  }

  // Direct drip enrollment — best-effort backup to n8n internal enrollment.
  const dripCampaignId = isPAFunnel ? PA_CAMPAIGN_ID : (isDPAGuide ? DPA_CAMPAIGN_ID : null);
  let dripStatus = "skipped";
  if (dripCampaignId) {
    const dripResult = await Promise.allSettled([
      enrollInDrip({ email, campaignId: dripCampaignId }),
    ]);
    if (dripResult[0].status === "rejected") {
      console.error("[lead-intake] Drip enrollment failed:", dripResult[0].reason?.message);
      dripStatus = "failed";
    } else {
      dripStatus = "ok";
    }
  }

  return respond(200, {
    success:   true,
    mailchimp: mcResult.status === "fulfilled" ? "ok" : "failed",
    loanos:    loResult.status === "fulfilled" ? "ok" : "failed",
    drip:      dripStatus,
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
      down_payment:   p.downPayment,
      credit_score:   p.creditScore,
      income_type:    p.incomeType,
      property_use:   p.propertyUse,
      target_city:    p.targetCity,
      timeline:       p.timeline,
      lender_status:  p.lenderStatus,
      documentation_issue: p.documentationIssue,
      situation:      p.situation,
      tcpa_consent:   p.tcpaConsent,
      sms_opt_in:     p.smsOptIn,
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

// ── n8n routing ───────────────────────────────────────────────────────────────

async function fireWebhook(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${url} returned ${res.status}`);
  }
}

async function notifyAdam(payload) {
  const res = await fetch(N8N_PA_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Adam notify webhook returned ${res.status}`);
  }
}

// ── Drip Enrollment ───────────────────────────────────────────────────────────

async function enrollInDrip({ email, campaignId }) {
  if (!SUPABASE_KEY) {
    console.warn("[lead-intake] SUPABASE_SERVICE_ROLE_KEY not set — skipping drip enrollment");
    return;
  }

  // Look up contact_id by email scoped to org
  const contactRes = await fetch(
    `${SUPABASE_URL}/rest/v1/contacts?organization_id=eq.${ORG_ID}&email=eq.${encodeURIComponent(email.toLowerCase())}&select=id&limit=1`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );
  if (!contactRes.ok) {
    throw new Error(`Contact lookup failed: ${contactRes.status}`);
  }
  const contacts = await contactRes.json();
  if (!contacts.length) {
    console.warn(`[lead-intake] No contact found for ${email} — skipping drip`);
    return;
  }
  const contactId = contacts[0].id;

  const enrollRes = await fetch(`${SUPABASE_URL}/rest/v1/drip_enrollments`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify({
      org_id:       ORG_ID,
      campaign_id:  campaignId,
      contact_id:   contactId,
      status:       "active",
      enrolled_by:  "auto",
      current_step: 0,
    }),
  });

  if (!enrollRes.ok) {
    const err = await enrollRes.json().catch(() => ({}));
    throw new Error(`Drip enrollment failed: ${enrollRes.status} ${err.message || ""}`);
  }
  console.log(`[lead-intake] Drip enrolled: ${email} → ${campaignId}`);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
