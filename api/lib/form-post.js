// Netlify Forms replacement. URL-encoded posts keep the same fields.
// LoanOS and the web-lead auto-reply stay in lead-intake. The optional
// FORM_NOTIFICATION_WEBHOOK_URL receives the submission Netlify emailed.

const crypto = require("crypto");

const INQUIRY = /^[A-Za-z0-9:_-]{8,200}$/;

function header(headers, name) {
  if (!headers) return "";
  if (typeof headers.get === "function") return headers.get(name) || "";
  const lower = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lower) return Array.isArray(value) ? value.join(",") : String(value ?? "");
  }
  return "";
}

// Match situation-journeys.js: a single name field becomes first and last
// before LoanOS sees the backup, so it agrees with the JSON copy.
function applyNameSplit(fields) {
  const next = { ...fields };
  const existingFirst = next.first_name || next["first-name"] || next.fname || "";
  if (String(existingFirst).trim()) return next;
  const source = next.name || next.full_name || "";
  if (!String(source).trim()) return next;
  const parts = String(source).trim().split(/\s+/);
  next.first_name = parts.shift() || "";
  next.last_name = parts.join(" ");
  return next;
}

function stableId(fields) {
  const raw = [fields.email || "", fields["form-name"] || "", fields.phone || "", fields.name || "", fields.details || "", fields.submitted_at || ""].join("|");
  return "formbackup-" + crypto.createHash("sha256").update(raw).digest("hex").slice(0, 24);
}

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function safePath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("://")) return "";
  return value;
}

async function handleFormPost(input, deps = {}) {
  const method = input.method || "GET";
  const headers = input.headers || {};
  const url = new URL(input.url || "https://styerteam.com/");
  const bodyText = typeof input.body === "string"
    ? input.body
    : typeof input.text === "function"
      ? await input.text()
      : "";

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" } });
  }
  if (method !== "POST") return json(405, { error: "Method not allowed" });
  if (Buffer.byteLength(bodyText, "utf8") > 65536) return json(413, { error: "Body too large" });
  const type = header(headers, "content-type").toLowerCase();
  if (!type.includes("application/x-www-form-urlencoded")) return json(415, { error: "Form body required" });

  const fields = applyNameSplit(Object.fromEntries(new URLSearchParams(bodyText)));
  if (fields["bot-field"] || fields.honeypot) return json(200, { ok: true });

  const mode = (header(headers, "sec-fetch-mode") || "").toLowerCase();
  const navigate = mode === "navigate";
  const formName = fields["form-name"] || "";
  const hasInquiry = INQUIRY.test(fields.inquiry_id || "");
  // A page script that already calls lead-intake also posts the raw form here.
  // Both copies may dispatch the web-lead webhook. LoanOS treats the second
  // claim for the same inquiry as a duplicate, which is still a success.
  const soleCapture = navigate || (!hasInquiry && formName !== "notification-backup");
  if (!hasInquiry) fields.inquiry_id = stableId(fields);

  const intake = deps.intake || defaultIntake;
  const fetchImpl = deps.fetch || globalThis.fetch;
  const webhook = deps.webhook === undefined ? (process.env.FORM_NOTIFICATION_WEBHOOK_URL || "") : deps.webhook;

  let intakeResult = { statusCode: 502, body: JSON.stringify({ captured: false }) };
  try {
    intakeResult = await intake({
      httpMethod: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        ...(soleCapture ? {} : { "x-styer-internal-backup": "1" }),
      },
      body: new URLSearchParams(fields).toString(),
    });
  } catch (error) {
    intakeResult = { statusCode: 502, body: JSON.stringify({ captured: false, error: "Primary capture unavailable" }) };
  }

  let webhookOk = false;
  if (webhook) {
    const payload = { ...fields };
    delete payload["bot-field"];
    delete payload.honeypot;
    try {
      const response = await fetchImpl(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_name: formName,
          data: payload,
          created_at: new Date().toISOString(),
          site: "styerteam.com",
        }),
      });
      webhookOk = Boolean(response && response.ok);
    } catch {
      webhookOk = false;
    }
  }

  const accepted = intakeResult.statusCode === 200 || webhookOk;
  if (navigate) {
    if (!accepted) {
      return new Response(intakeResult.body || "", { status: intakeResult.statusCode || 502, headers: { "Content-Type": "application/json" } });
    }
    const location = safePath(url.searchParams.get("return")) || safePath(url.pathname) || "/thank-you";
    return new Response(null, { status: 303, headers: { Location: location } });
  }
  if (!accepted) {
    return new Response(intakeResult.body || JSON.stringify({ captured: false }), {
      status: intakeResult.statusCode || 502,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(intakeResult.body || JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function defaultIntake(event) {
  return require("../../netlify/functions/lead-intake").handler(event);
}

module.exports = { handleFormPost, stableId, applyNameSplit };
