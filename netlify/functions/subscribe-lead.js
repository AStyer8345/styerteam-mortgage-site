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
const _apiKey  = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key || "";
// Derive datacenter from the API key suffix, then fall back to the env var.
// The API key format is "key-dc" where dc is the datacenter prefix.
const DC       = (_apiKey.includes("-") ? _apiKey.split("-").pop() : null)
                 || process.env.MAILCHIMP_SERVER_PREFIX
                 || process.env.mailchimp_server_prefix
                 || "";
const API_BASE = `https://${DC}.api.mailchimp.com/3.0`;

// n8n webhook: sends the guide welcome email via Outlook for ALL subscribers
const N8N_GUIDE_EMAIL_URL = "https://styer.app.n8n.cloud/webhook/ftb-guide-email";

// n8n webhook: sends LO notification for pre-approval funnel leads
const N8N_PA_LEAD_URL = "https://styer.app.n8n.cloud/webhook/pre-approval-lead";

// Supabase direct access for drip enrollment
const SUPABASE_URL  = "https://uuqedsvjlkeszrbwzizl.supabase.co";
const SUPABASE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const PA_CAMPAIGN_ID = "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d";
const ORG_ID         = "18613f82-fdd9-42dd-a09e-f3c577328258";

const LOANOS_URL    = process.env.LOANOS_URL || "";
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

  const apiKey = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key;
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
    loan_goal, lead_source, sms_opt_in, loan_type_tag,
    utm_source, utm_medium, utm_campaign, page_url,
  } = body;

  if (!email || !tag) {
    return respond(400, { error: "Missing required fields: email, tag" });
  }

  const authHeader = buildAuthHeader(apiKey);

  // Run Mailchimp subscribe + Loanos contact creation in parallel
  const [mailchimpResult, loanosResult] = await Promise.allSettled([
    subscribeToMailchimp({ email, authHeader, fname, lname, tag }),
    createLoanosContact({ email, fname, lname, phone, loan_goal, lead_source, utm_source, utm_medium, utm_campaign, page_url }),
  ]);

  if (mailchimpResult.status === "rejected") {
    console.error("[subscribe-lead] Mailchimp failed:", mailchimpResult.reason);
  }
  if (loanosResult.status === "rejected") {
    console.error("[subscribe-lead] Loanos failed:", loanosResult.reason);
  }

  // Send the FTB Guide welcome email via n8n → Outlook only for ftb-guide tag.
  // DPA guide leads (ftb-dpa-guide) use Mailchimp automation instead — do NOT fire this.
  if (tag === "ftb-guide") {
    sendGuideEmail({ email, fname }).catch(err =>
      console.error("[subscribe-lead] Guide email failed:", err.message)
    );
  }

  // Fire LO notification for high-intent leads (PA funnel + DPA guide) — awaited so it completes before function returns
  if (lead_source === "Pre-Approval Funnel" || lead_source === "FTB DPA Guide") {
    const notifyResult = await Promise.allSettled([
      notifyPreApprovalLead({ email, fname, lname, phone, loan_goal, sms_opt_in, utm_source, utm_medium, utm_campaign, page_url }),
    ]);
    if (notifyResult[0].status === "rejected") {
      console.error("[subscribe-lead] Lead notify failed:", notifyResult[0].reason?.message);
    }
  }

  // Enroll in LoanOS drip only for PA funnel — DPA leads use Mailchimp Journey instead
  if (lead_source === "Pre-Approval Funnel") {
    const dripResult = await Promise.allSettled([
      enrollInDrip({ email, fname, lname }),
    ]);
    if (dripResult[0].status === "rejected") {
      console.error("[subscribe-lead] Drip enrollment failed:", dripResult[0].reason?.message);
    }
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

async function sendGuideEmail({ email, fname }) {
  const res = await fetch(N8N_GUIDE_EMAIL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, fname }),
  });
  if (!res.ok) {
    throw new Error(`Guide email webhook failed: ${res.status}`);
  }
}

// ── Loanos ────────────────────────────────────────────────────────────────────

async function notifyPreApprovalLead({ email, fname, lname, phone, loan_goal, sms_opt_in, utm_source, utm_medium, utm_campaign, page_url }) {
  const res = await fetch(N8N_PA_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name:   fname || "",
      last_name:    lname || "",
      email:        email,
      phone:        phone || "",
      loan_goal:    loan_goal || "",
      sms_opt_in:   sms_opt_in || false,
      utm_source:   utm_source || "",
      utm_medium:   utm_medium || "",
      utm_campaign: utm_campaign || "",
      page_url:     page_url || "",
    }),
  });
  if (!res.ok) {
    throw new Error(`PA lead notify webhook failed: ${res.status}`);
  }
}

async function createLoanosContact({ email, fname, lname, phone, loan_goal, lead_source, utm_source, utm_medium, utm_campaign, page_url }) {
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
      lead_source:   lead_source || "Website",
      referral_type: "web_lead",
      campaign:      utm_campaign || utm_source || "",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Loanos API ${res.status}: ${err.error || "unknown"}`);
  }
}

// ── Drip Enrollment ─────────────────────────────────────────────────────────

async function enrollInDrip({ email, fname, lname }) {
  if (!SUPABASE_KEY) {
    console.warn("[subscribe-lead] SUPABASE_SERVICE_ROLE_KEY not set — skipping drip enrollment");
    return;
  }

  // Look up the contact by email to get their contact_id
  const contactRes = await fetch(
    `${SUPABASE_URL}/rest/v1/contacts?email=eq.${encodeURIComponent(email.toLowerCase())}&select=id&limit=1`,
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
    console.warn(`[subscribe-lead] No contact found for ${email} — skipping drip`);
    return;
  }
  const contactId = contacts[0].id;

  // Create drip enrollment — next_send_at = now (step 1 has delay_days = 0)
  const enrollRes = await fetch(`${SUPABASE_URL}/rest/v1/drip_enrollments`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify({
      contact_id: contactId,
      campaign_id: PA_CAMPAIGN_ID,
      organization_id: ORG_ID,
      status: "active",
      current_step: 0,
      next_send_at: new Date().toISOString(),
    }),
  });

  if (!enrollRes.ok) {
    const err = await enrollRes.json().catch(() => ({}));
    throw new Error(`Drip enrollment failed: ${enrollRes.status} ${err.message || ""}`);
  }
  console.log(`[subscribe-lead] Drip enrolled: ${fname} ${lname} (${email})`);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildAuthHeader(apiKey) {
  return "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");
}

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
