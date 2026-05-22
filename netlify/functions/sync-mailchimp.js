// netlify/functions/sync-mailchimp.js
//
// One-shot sync: finds LoanOS contacts missing from Mailchimp audiences and adds them.
// Delete this file after use.
//
// GET /.netlify/functions/sync-mailchimp?token=<LOANOS_AGENT_SECRET>&audience=both&dryRun=true
//
// Query params:
//   token     — required, must match LOANOS_AGENT_SECRET
//   audience  — "borrower" | "realtor" | "both" (default: "both")
//   dryRun    — "true" returns counts + samples only; "false" submits the batch (default: "true")
//
// Required env vars (already set on this Netlify project):
//   MAILCHIMP_API_KEY, mailchimp_server_prefix
//   MAILCHIMP_BORROWER_LIST_ID, MAILCHIMP_REALTOR_LIST_ID
//   SUPABASE_SERVICE_ROLE_KEY
//   LOANOS_AGENT_SECRET

const crypto = require("crypto");

const SUPABASE_URL = "https://uuqedsvjlkeszrbwzizl.supabase.co";

const apiKey = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key || "";
const DC = (apiKey.includes("-") ? apiKey.split("-").pop() : null)
  || process.env.MAILCHIMP_SERVER_PREFIX
  || process.env.mailchimp_server_prefix
  || "";
const API_BASE = `https://${DC}.api.mailchimp.com/3.0`;

const BORROWER_LIST = process.env.MAILCHIMP_BORROWER_LIST_ID || "";
const REALTOR_LIST = process.env.MAILCHIMP_REALTOR_LIST_ID || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const TOKEN = process.env.LOANOS_AGENT_SECRET || "";

const JUNK_DOMAINS = new Set([
  "email.com",
  "test.com",
  "example.com",
  "example.org",
  "example.net",
  "fake.com",
  "placeholder.com",
  "noemail.com",
  "none.com",
  "na.com",
  "tbd.com",
]);

function isJunkEmail(email) {
  if (!email || !email.includes("@")) return true;
  const domain = email.split("@").pop();
  if (JUNK_DOMAINS.has(domain)) return true;
  if (email.startsWith("test@") || email.startsWith("noreply@")) return true;
  return false;
}

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};

  if (!TOKEN || params.token !== TOKEN) {
    return respond(401, { error: "Unauthorized" });
  }
  if (!apiKey || !DC || !BORROWER_LIST || !REALTOR_LIST || !SUPABASE_KEY) {
    return respond(500, { error: "Server misconfiguration — missing env vars" });
  }

  const audience = (params.audience || "both").toLowerCase();
  const dryRun = (params.dryRun ?? "true").toString().toLowerCase() !== "false";

  if (!["borrower", "realtor", "both"].includes(audience)) {
    return respond(400, { error: "audience must be borrower, realtor, or both" });
  }

  const auth = "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");
  const result = { dryRun, audience };

  try {
    if (audience === "borrower" || audience === "both") {
      result.borrower = await diffAndMaybeSync({
        listId: BORROWER_LIST,
        audienceLabel: "borrower",
        supabaseQuery:
          "contact_group=eq.Client&email=not.is.null&email=neq.&or=(email_opt_out.is.null,email_opt_out.eq.false)&select=email,first_name,last_name,phone,phone_mobile",
        auth,
        dryRun,
      });
    }
    if (audience === "realtor" || audience === "both") {
      result.realtor = await diffAndMaybeSync({
        listId: REALTOR_LIST,
        audienceLabel: "realtor",
        supabaseQuery:
          "account_name=eq.Realtor%20Database&email=not.is.null&email=neq.&or=(email_opt_out.is.null,email_opt_out.eq.false)&select=email,first_name,last_name,phone,phone_mobile",
        auth,
        dryRun,
      });
    }
  } catch (err) {
    console.error("[sync-mailchimp] failed:", err);
    return respond(500, { error: err.message || "unknown error" });
  }

  return respond(200, result);
};

async function diffAndMaybeSync({ listId, audienceLabel, supabaseQuery, auth, dryRun }) {
  const [mcEmails, supContacts] = await Promise.all([
    fetchAllMailchimpEmails(listId, auth),
    fetchSupabaseContacts(supabaseQuery),
  ]);

  const mcSet = new Set(mcEmails.map((e) => e.toLowerCase()));
  const missing = [];
  const junkSkipped = [];
  const seen = new Set();

  for (const c of supContacts) {
    const email = (c.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) continue;
    if (seen.has(email)) continue;
    seen.add(email);
    if (mcSet.has(email)) continue;
    if (isJunkEmail(email)) {
      junkSkipped.push(email);
      continue;
    }
    missing.push({
      email,
      fname: (c.first_name || "").trim(),
      lname: (c.last_name || "").trim(),
      phone: (c.phone_mobile || c.phone || "").trim(),
    });
  }

  const summary = {
    mailchimp_existing: mcSet.size,
    loanos_total: supContacts.length,
    loanos_unique_emails: seen.size,
    junk_skipped_count: junkSkipped.length,
    sample_junk_skipped: junkSkipped.slice(0, 10),
    missing_count: missing.length,
    sample_missing: missing.slice(0, 15).map((m) => m.email),
  };

  if (dryRun || missing.length === 0) {
    return summary;
  }

  const batchId = await submitMailchimpBatch({ listId, members: missing, auth });
  return { ...summary, batch_id: batchId, batch_status_url: `${API_BASE}/batches/${batchId}` };
}

async function fetchAllMailchimpEmails(listId, auth) {
  const emails = [];
  const pageSize = 1000;
  let offset = 0;
  for (;;) {
    const url = `${API_BASE}/lists/${listId}/members?count=${pageSize}&offset=${offset}&fields=members.email_address,total_items`;
    const res = await fetch(url, { headers: { Authorization: auth } });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Mailchimp list fetch failed (${listId}): ${res.status} ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const members = data.members || [];
    for (const m of members) {
      if (m.email_address) emails.push(m.email_address);
    }
    if (members.length < pageSize) break;
    offset += pageSize;
  }
  return emails;
}

async function fetchSupabaseContacts(query) {
  const all = [];
  const pageSize = 1000;
  let from = 0;
  for (;;) {
    const url = `${SUPABASE_URL}/rest/v1/contacts?${query}`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Range: `${from}-${from + pageSize - 1}`,
        "Range-Unit": "items",
        Prefer: "count=exact",
      },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Supabase fetch failed: ${res.status} ${body.slice(0, 200)}`);
    }
    const rows = await res.json();
    all.push(...rows);
    if (rows.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

async function submitMailchimpBatch({ listId, members, auth }) {
  const operations = members.map((m) => {
    const hash = crypto.createHash("md5").update(m.email).digest("hex");
    return {
      method: "PUT",
      path: `/lists/${listId}/members/${hash}`,
      body: JSON.stringify({
        email_address: m.email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: m.fname,
          LNAME: m.lname,
          PHONE: m.phone,
        },
      }),
    };
  });

  const res = await fetch(`${API_BASE}/batches`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({ operations }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Mailchimp batch submit failed: ${res.status} ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.id;
}

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body, null, 2),
  };
}
