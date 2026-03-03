// netlify/functions/dispatch.js
// Unified webhook dispatcher — routes to the right content generator.
// Callable by Zapier, Make, cron tools, or any HTTP client.
//
// POST /.netlify/functions/dispatch
// Headers:  Authorization: Bearer <DISPATCH_SECRET>
// Body:     { "type": "newsletter" | "realtor" | "rate", ...formData }
//
// The DISPATCH_SECRET env var must be set in Netlify → Site configuration →
// Environment variables.  Keep it secret — anyone with it can trigger sends.

const { generateNewsletter }     = require("./generate-newsletter");
const { generateRealtorContent } = require("./generate-realtor-content");
const { generateRateUpdate }     = require("./generate-rate-update");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  // ── CORS preflight ──────────────────────────────────────────────────────────
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return respond(405, { error: "Method not allowed" });
  }

  // ── Auth ────────────────────────────────────────────────────────────────────
  const secret = process.env.DISPATCH_SECRET;
  if (!secret) {
    console.error("DISPATCH_SECRET env var is not set");
    return respond(500, { error: "Server misconfiguration: DISPATCH_SECRET not set" });
  }

  const authHeader = event.headers["authorization"] || event.headers["Authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || token !== secret) {
    return respond(401, { error: "Unauthorized" });
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "Invalid JSON body" });
  }

  const { type, ...formData } = body;

  if (!type) {
    return respond(400, { error: "Missing required field: type (newsletter | realtor | rate)" });
  }

  // ── Route ───────────────────────────────────────────────────────────────────
  try {
    let result;

    switch (type) {
      case "newsletter":
        result = await generateNewsletter(formData);
        break;

      case "realtor":
        result = await generateRealtorContent(formData);
        break;

      case "rate":
        result = await generateRateUpdate(formData);
        break;

      default:
        return respond(400, { error: `Unknown type: "${type}". Must be newsletter | realtor | rate` });
    }

    return respond(200, result);

  } catch (err) {
    console.error(`Dispatch error (type=${type}):`, err);
    return respond(err.statusCode || 500, { error: err.message || "Internal server error" });
  }
};

// ── Utility ──────────────────────────────────────────────────────────────────

function respond(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}
