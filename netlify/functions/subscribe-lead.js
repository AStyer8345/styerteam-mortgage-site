// netlify/functions/subscribe-lead.js
// Called by the JS submit handler on /get-preapproved and /refinance-quote.
//
// POST /.netlify/functions/subscribe-lead
// Body: { email, fname, lname, phone, tag, loan_goal, utm_source, utm_medium, utm_campaign, page_url }
//
// Does two things in parallel:
//   1. Subscribes contact to Mailchimp + applies tag → fires Journey auto-responder
//   2. Creates a contact record in Loanos (POST /api/contacts/web-lead)
//
// Required Netlify env vars:
//   MAILCHIMP_API_KEY
//   MAILCHIMP_BORROWER_LIST_ID
//   MAILCHIMP_SERVER_PREFIX  (set in Netlify → Site config → Env vars)
//   LOANOS_AGENT_SECRET      (set in Netlify → Site config → Env vars)

const crypto = require("crypto");

// List ID read exclusively from env — no hard-coded fallback
const LIST_ID  = process.env.MAILCHIMP_BORROWER_LIST_ID || "";
const _apiKey  = process.env.MAILCHIMP_API_KEY || "";
// Derive datacenter from the API key suffix, then fall back to the env var.
// The API key format is "key-dc" where dc is the datacenter prefix.
const DC       = (_apiKey.includes("-") ? _apiKey.split("-").pop() : null)
                 || process.env.MAILCHIMP_SERVER_PREFIX
                 || "";
const API_BASE = `https://${DC}.api.mailchimp.com/3.0`;

// Journey 56 "First-Time Buyer Guide Drip" — signup trigger fires for new contacts,
// but we also call the step trigger directly so re-subscribers get it too.
const JOURNEY_ID          = 56;
const JOURNEY_FIRST_STEP  = 215; // step 215 = first send_email step (immediate)

const LOANOS_URL    = "https://loanos.vercel.app";
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

  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey || !LIST_ID) {
    console.error("Missing env vars: MAILCHIMP_API_KEY or MAILCHIMP_BORROWER_LIST_ID");
    return respond(500, { error: "Server misconfiguration" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "Invalid JSON" });
  }

  const {
    email, fname, lname, phone, tag,
    loan_goal, utm_source, utm_medium, utm_campaign, page_url,
  } = body;

  if (!email || !tag) {
    return respond(400, { error: "Missing required fields: email, tag" });
  }

  const authHeader = buildAuthHeader(apiKey);

  // Run Mailchimp subscribe + Loanos contact creation in parallel
  const [mailchimpResult, loanosResult] = await Promise.allSettled([
    subscribeToMailchimp({ email, authHeader, fname, lname, tag }),
    createLoanosContact({ email, fname, lname, phone, loan_goal, utm_source, utm_medium, utm_campaign, page_url }),
  ]);

  if (mailchimpResult.status === "rejected") {
    console.error("[subscribe-lead] Mailchimp failed:", mailchimpResult.reason);
  }
  if (loanosResult.status === "rejected") {
    console.error("[subscribe-lead] Loanos failed:", loanosResult.reason);
  }

  // After subscribing, trigger the follow-up journey directly.
  // Journey 56 "First-Time Buyer Guide Drip" fires automatically for NEW
  // subscribers via the signup trigger. We also call the step trigger for
  // contacts who already exist in the list (re-subscribers) so they always
  // receive the sequence.
  const wasNewSubscriber = mailchimpResult.status === "fulfilled" &&
    mailchimpResult.value?.isNew === true;

  if (!wasNewSubscriber && mailchimpResult.status === "fulfilled") {
    // Existing contact — manually trigger the journey so they don't miss it
    triggerJourney(email, authHeader).catch(err =>
      console.error("[subscribe-lead] Journey trigger failed:", err.message)
    );
  }

  return respond(200, {
    success:   true,
    mailchimp: mailchimpResult.status === "fulfilled" ? "ok" : "failed",
    loanos:    loanosResult.status    === "fulfilled" ? "ok" : "failed",
  });
};

// ── Mailchimp ─────────────────────────────────────────────────────────────────

async function subscribeToMailchimp({ email, authHeader, fname, lname, tag }) {
  const emailHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

  // Subscribe or update the member — PUT is upsert (creates if new, updates if existing)
  const memberRes = await fetch(`${API_BASE}/lists/${LIST_ID}/members/${emailHash}`, {
    method: "PUT",
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
  // 201 = newly created, 200 = existing contact updated
  const isNew = memberRes.status === 201;

  // Apply tag → used for segmentation and reporting
  const tagRes = await fetch(`${API_BASE}/lists/${LIST_ID}/members/${emailHash}/tags`, {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
  });
  if (!tagRes.ok) {
    const err = await tagRes.json().catch(() => ({}));
    throw new Error(`Mailchimp tag failed: ${err.detail || tagRes.status}`);
  }

  return { isNew };
}

async function triggerJourney(email, authHeader) {
  // Trigger journey 56, step 215 (first email) for contacts who don't get the
  // signup event (because they already existed in the list).
  const res = await fetch(
    `${API_BASE}/customer-journeys/journeys/${JOURNEY_ID}/steps/${JOURNEY_FIRST_STEP}/actions/trigger`,
    {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ email_address: email.toLowerCase() }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Journey trigger failed: ${err.detail || res.status}`);
  }
}

// ── Loanos ────────────────────────────────────────────────────────────────────

async function createLoanosContact({ email, fname, lname, phone, loan_goal, utm_source, utm_medium, utm_campaign, page_url }) {
  if (!LOANOS_SECRET) {
    console.warn("[subscribe-lead] LOANOS_AGENT_SECRET not set — skipping Loanos contact creation");
    return;
  }

  const res = await fetch(`${LOANOS_URL}/api/contacts/web-lead`, {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${LOANOS_SECRET}`,
    },
    body: JSON.stringify({
      first_name:    fname || "",
      last_name:     lname || "",
      email:         email,
      phone:         phone || "",
      loan_type:     loan_goal || "",
      lead_source:   "Website",
      referral_type: "web_lead",
      campaign:      utm_campaign || utm_source || "",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Loanos API ${res.status}: ${err.error || "unknown"}`);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildAuthHeader(apiKey) {
  return "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");
}

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
