// netlify/functions/mcc-data.js
// Cloud storage proxy for the Marketing Command Center.
//
// GET  /.netlify/functions/mcc-data  → returns stored state JSON
// POST /.netlify/functions/mcc-data  → saves state JSON
//
// Env vars required:
//   MCC_PASS — the access code for the MCC (set in Netlify → Site config → Environment variables)
//
// Netlify Blobs is built into Netlify — no separate database needed.

const { getStore } = require("@netlify/blobs");

const HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "Content-Type, x-mcc-auth",
  "Content-Type": "application/json",
};

function respond(statusCode, body) {
  return { statusCode, headers: HEADERS, body: JSON.stringify(body) };
}

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: HEADERS, body: "" };
  }

  // ── Auth ──────────────────────────────────────────────────────────────────
  const pass = process.env.MCC_PASS;
  if (!pass) {
    console.error("MCC_PASS env var is not set");
    return respond(500, { error: "Server misconfiguration: MCC_PASS not set" });
  }

  const incoming = event.headers["x-mcc-auth"] || event.headers["X-Mcc-Auth"] || "";
  if (incoming !== pass) {
    return respond(401, { error: "Unauthorized" });
  }

  // ── Storage ───────────────────────────────────────────────────────────────
  const store = getStore("mcc-state");

  // GET — return stored state
  if (event.httpMethod === "GET") {
    try {
      const data = await store.get("current");
      return { statusCode: 200, headers: HEADERS, body: data || "null" };
    } catch (err) {
      console.error("Blob GET failed:", err);
      return respond(500, { error: "Failed to read data" });
    }
  }

  // POST — save state
  if (event.httpMethod === "POST") {
    const body = event.body || "";
    // Validate JSON before storing
    try { JSON.parse(body); } catch {
      return respond(400, { error: "Invalid JSON body" });
    }
    try {
      await store.set("current", body);
      return respond(200, { ok: true });
    } catch (err) {
      console.error("Blob SET failed:", err);
      return respond(500, { error: "Failed to save data" });
    }
  }

  return respond(405, { error: "Method not allowed" });
};
