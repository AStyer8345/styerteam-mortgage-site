// netlify/functions/lead-intake.js
// Unified lead ingress — replaces subscribe-lead.js for the n8n → Workflow DevKit cutover.
//
// Behavior:
//   1. Subscribes contact to Mailchimp list (no journey tagging — Workflow DevKit owns drip now)
//   2. POSTs normalized payload (including first-touch attribution) to LoanOS /api/contacts/web-lead
//
// Accepts BOTH payload shapes (backward-compatible with existing site forms):
//   - legacy: { email, fname, lname, phone, tag, loan_goal, lead_source, utm_*, page_url, referrer }
//   - plan  : { email, first_name, last_name, phone, loan_goal, purchase_price, down_payment,
//               credit_score, income_type, property_use, target_city, timeline, lender_status,
//               documentation_issue, situation, page_url, form-name, utm_*, entry_referrer,
//               first_touch_*, intent, source, cta_source_page, cta_label }
//
// Accepts both application/json and application/x-www-form-urlencoded bodies.
//
// Required Netlify env vars (preserves names from subscribe-lead.js):
//   MAILCHIMP_API_KEY              — datacenter derived from key suffix, with server-prefix fallback
//   MAILCHIMP_BORROWER_LIST_ID     — list ID (no hard-coded fallback)
//   MAILCHIMP_SERVER_PREFIX        — fallback datacenter (e.g. "us1") if key has no suffix
//   LOANOS_URL                     — base URL to LoanOS (e.g. https://app.loanos.io)
//   LOANOS_AGENT_SECRET            — bearer token for /api/contacts/web-lead
//   N8N_WEB_LEAD_URL               — optional override for active Web Lead Automation webhook

const crypto = require("crypto");
const { qualifyLead } = require("./lib/lead-qualification");

const LIST_ID   = process.env.MAILCHIMP_BORROWER_LIST_ID || "";
const _apiKey   = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key || "";
const DC        = (_apiKey.includes("-") ? _apiKey.split("-").pop() : null)
                  || process.env.MAILCHIMP_SERVER_PREFIX
                  || process.env.mailchimp_server_prefix
                  || "";
const API_BASE  = DC ? `https://${DC}.api.mailchimp.com/3.0` : "";

const LOANOS_URL    = process.env.LOANOS_URL || process.env.LOANOS_API_URL || "";
const LOANOS_SECRET = process.env.LOANOS_AGENT_SECRET || "";
const N8N_WEB_LEAD_URL = process.env.N8N_WEB_LEAD_URL || "https://styer.app.n8n.cloud/webhook/web-lead";
const ADAM_NOTIFICATION_EMAIL = process.env.ADAM_NOTIFICATION_EMAIL || "adam@thestyerteam.com";

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

  const leadPayload = {
    firstName, lastName, email, phone,
    loanGoal, leadSource, formName,
    purchasePrice: body.purchase_price ?? null,
    propertyValue: body.property_value ?? null,
    loanAmount:    body.loan_amount ?? null,
    downPayment:   body.down_payment ?? null,
    householdIncome: body.household_income ?? null,
    creditScore:   body.credit_score ?? null,
    incomeType:    body.income_type ?? body.employment_type ?? null,
    propertyUse:   body.property_use ?? null,
    propertyType:  body.property_type ?? null,
    underContract: body.under_contract ?? null,
    targetCity:    body.target_city ?? body.property_location ?? null,
    timeline:      body.timeline ?? null,
    lenderStatus:  body.lender_status ?? null,
    documentationIssue: body.documentation_issue ?? null,
    situation:     body.situation ?? body.notes ?? null,
    tcpaConsent:   body.tcpa_consent ?? null,
    smsOptIn:      body.sms_opt_in ?? null,
    sourcePage:    body.page_url ?? body.source_page ?? null,
    utmSource:     body.utm_source ?? null,
    utmMedium:     body.utm_medium ?? null,
    utmCampaign:   body.utm_campaign ?? null,
    utmTerm:       body.utm_term ?? null,
    utmContent:    body.utm_content ?? null,
    entryReferrer: body.entry_referrer ?? body.referrer ?? null,
    firstTouchPage: body.first_touch_page ?? null,
    firstTouchReferrer: body.first_touch_referrer ?? null,
    firstTouchAt: body.first_touch_at ?? null,
    firstTouchSource: body.first_touch_source ?? null,
    firstTouchUtmSource: body.first_touch_utm_source ?? null,
    firstTouchUtmMedium: body.first_touch_utm_medium ?? null,
    firstTouchUtmCampaign: body.first_touch_utm_campaign ?? null,
    firstTouchUtmTerm: body.first_touch_utm_term ?? null,
    firstTouchUtmContent: body.first_touch_utm_content ?? null,
    intent: body.intent ?? null,
    attributionSource: body.source ?? null,
    ctaSourcePage: body.cta_source_page ?? null,
    ctaLabel: body.cta_label ?? null,
    audienceType:  body.audience_type ?? null,
    partnerRole:   body.partner_role ?? null,
    scenarioCategory: body.scenario_category ?? null,
    propertyState: body.property_state ?? null,
    assistantMode: body.assistant_mode ?? null,
    clientGoal:    body.client_goal ?? null,
    includeReferrerInFollowUp: body.include_referrer_in_follow_up ?? null,
    preferredFollowUp: body.preferred_follow_up ?? null,
    notificationEmail: ADAM_NOTIFICATION_EMAIL,
  };
  const qualification = qualifyLead({ ...body, ...leadPayload });
  leadPayload.qualificationTier = qualification.tier;
  leadPayload.qualificationScore = qualification.score;

  // Run independent capture paths and request the active n8n notification workflow.
  const [mcResult, loResult, n8nResult] = await Promise.allSettled([
    addToMailchimp({ email, firstName, lastName, tag }),
    createLoanosContact(leadPayload),
    notifyWebLeadAutomation(leadPayload),
  ]);

  if (mcResult.status === "rejected") {
    console.error("[lead-intake] Mailchimp error (non-fatal):", mcResult.reason?.message);
  }
  if (loResult.status === "rejected") {
    console.error("[lead-intake] LoanOS error (non-fatal):", loResult.reason?.message);
  }
  if (n8nResult.status === "rejected") {
    console.error("[lead-intake] Web lead automation error (non-fatal):", n8nResult.reason?.message);
  }

  const automationAccepted = n8nResult.status === "fulfilled";
  const captured = mcResult.status === "fulfilled" || loResult.status === "fulfilled";

  // n8n acknowledges before downstream delivery. A 2xx confirms durable capture
  // plus workflow acceptance, never a delivered email. Independent Netlify form
  // capture remains available when this primary handoff fails.
  const handoffAccepted = captured && automationAccepted;
  return respond(handoffAccepted ? 200 : 502, {
    success: handoffAccepted,
    captured,
    automationAccepted,
    ownerNotified: null, // Unknown until a downstream delivery receipt exists.
    mailchimp: mcResult.status === "fulfilled" ? "ok" : "failed",
    loanos:    loResult.status === "fulfilled" ? "ok" : "failed",
    webLeadAutomation: automationAccepted ? "accepted" : "failed",
    qualification: { tier: qualification.tier, score: qualification.score },
  });
};

// ── Mailchimp ─────────────────────────────────────────────────────────────────
// List add only. No PA/DPA journey tagging — Workflow DevKit owns drip content now.
// We still apply the tag for segmentation/reporting, but it no longer fires a Journey.

async function addToMailchimp({ email, firstName, lastName, tag }) {
  if (!_apiKey || !LIST_ID || !API_BASE) {
    throw new Error("Mailchimp capture is not configured");
  }

  const authHeader = "Basic " + Buffer.from(`anystring:${_apiKey}`).toString("base64");
  const emailHash  = crypto.createHash("md5").update(email).digest("hex");

  const memberRes = await fetch(`${API_BASE}/lists/${LIST_ID}/members/${emailHash}`, {
    method: "PUT",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
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
    throw new Error("LoanOS capture is not configured");
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
      property_value: p.propertyValue,
      loan_amount: p.loanAmount,
      down_payment:   p.downPayment,
      household_income: p.householdIncome,
      credit_score:   p.creditScore,
      income_type:    p.incomeType,
      property_use:   p.propertyUse,
      property_type:  p.propertyType,
      under_contract: p.underContract,
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
      utm_term:       p.utmTerm,
      utm_content:    p.utmContent,
      campaign:       p.utmCampaign || p.utmSource || "",
      entry_referrer: p.entryReferrer,
      referrer:       p.entryReferrer, // Backward-compatible downstream alias; not a Netlify form field.
      first_touch_page: p.firstTouchPage,
      first_touch_referrer: p.firstTouchReferrer,
      first_touch_at: p.firstTouchAt,
      first_touch_source: p.firstTouchSource,
      first_touch_utm_source: p.firstTouchUtmSource,
      first_touch_utm_medium: p.firstTouchUtmMedium,
      first_touch_utm_campaign: p.firstTouchUtmCampaign,
      first_touch_utm_term: p.firstTouchUtmTerm,
      first_touch_utm_content: p.firstTouchUtmContent,
      intent: p.intent,
      source: p.attributionSource,
      cta_source_page: p.ctaSourcePage,
      cta_label: p.ctaLabel,
      audience_type:  p.audienceType,
      partner_role:   p.partnerRole,
      scenario_category: p.scenarioCategory,
      property_state: p.propertyState,
      assistant_mode: p.assistantMode,
      client_goal:    p.clientGoal,
      include_referrer_in_follow_up: p.includeReferrerInFollowUp,
      preferred_follow_up: p.preferredFollowUp,
      qualification_tier: p.qualificationTier,
      qualification_score: p.qualificationScore,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`LoanOS API ${res.status}: ${err.error || "unknown"}`);
  }
}

// ── n8n Web Lead Automation ───────────────────────────────────────────────────
// This active workflow sends Adam's alert and the borrower's immediate
// "Got your info" email. Payload mirrors Netlify form notification shape.

async function notifyWebLeadAutomation(p) {
  if (!N8N_WEB_LEAD_URL) {
    throw new Error("Web lead automation is not configured");
  }

  const fullName = [p.firstName, p.lastName].filter(Boolean).join(" ");
  const data = {
    name: fullName,
    first_name: p.firstName,
    last_name: p.lastName,
    fname: p.firstName,
    lname: p.lastName,
    email: p.email,
    phone: p.phone,
    loanGoal: p.loanGoal,
    loan_goal: p.loanGoal,
    loan_type: p.loanGoal,
    lead_source: p.leadSource,
    form_name: p.formName,
    "form-name": p.formName,
    purchase_price: p.purchasePrice,
    property_value: p.propertyValue,
    loan_amount: p.loanAmount,
    down_payment: p.downPayment,
    household_income: p.householdIncome,
    credit_score: p.creditScore,
    income_type: p.incomeType,
    employment_type: p.incomeType,
    property_use: p.propertyUse,
    property_type: p.propertyType,
    under_contract: p.underContract,
    target_city: p.targetCity,
    timeline: p.timeline,
    lender_status: p.lenderStatus,
    documentation_issue: p.documentationIssue,
    situation: p.situation,
    notes: p.situation,
    tcpa_consent: p.tcpaConsent,
    sms_opt_in: p.smsOptIn,
    page_url: p.sourcePage,
    source_page: p.sourcePage,
    utm_source: p.utmSource,
    utm_medium: p.utmMedium,
    utm_campaign: p.utmCampaign,
    utm_term: p.utmTerm,
    utm_content: p.utmContent,
    entry_referrer: p.entryReferrer,
    referrer: p.entryReferrer, // Backward-compatible downstream alias; not a Netlify form field.
    first_touch_page: p.firstTouchPage,
    first_touch_referrer: p.firstTouchReferrer,
    first_touch_at: p.firstTouchAt,
    first_touch_source: p.firstTouchSource,
    first_touch_utm_source: p.firstTouchUtmSource,
    first_touch_utm_medium: p.firstTouchUtmMedium,
    first_touch_utm_campaign: p.firstTouchUtmCampaign,
    first_touch_utm_term: p.firstTouchUtmTerm,
    first_touch_utm_content: p.firstTouchUtmContent,
    intent: p.intent,
    source: p.attributionSource,
    cta_source_page: p.ctaSourcePage,
    cta_label: p.ctaLabel,
    audience_type: p.audienceType,
    partner_role: p.partnerRole,
    scenario_category: p.scenarioCategory,
    property_state: p.propertyState,
    assistant_mode: p.assistantMode,
    client_goal: p.clientGoal,
    include_referrer_in_follow_up: p.includeReferrerInFollowUp,
    preferred_follow_up: p.preferredFollowUp,
    notification_email: p.notificationEmail,
    recipient_email: p.notificationEmail,
    adam_email: p.notificationEmail,
    qualification_tier: p.qualificationTier,
    qualification_score: p.qualificationScore,
  };

  const res = await fetch(N8N_WEB_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      form_name: p.formName,
      formName: p.formName,
      submitted_at: new Date().toISOString(),
      data,
      ...data,
    }),
  });

  if (!res.ok) {
    throw new Error(`Web Lead Automation ${res.status}`);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
