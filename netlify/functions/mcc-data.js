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

const { getStore, connectLambda } = require("@netlify/blobs");

const { equal, sessionAuthorization } = require('./lib/admin-session');
const HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "Content-Type, x-mcc-auth",
  "Content-Type": "application/json",
  "Cache-Control": "private, no-store",
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
    return respond(503, { error: "Service unavailable" });
  }

  const incoming = event.headers["x-mcc-auth"] || event.headers["X-Mcc-Auth"] || "";
  if (!sessionAuthorization(event) && !equal(incoming, pass)) {
    return respond(401, { error: "Unauthorized" });
  }

  // ── Storage ───────────────────────────────────────────────────────────────
  let store;
  try {
    // Legacy Lambda handlers receive Blobs context on the event, not ambient globals.
    if (event.blobs) connectLambda(event);
    store = getStore({ name: 'mcc-state' });
  } catch {
    return respond(503, {error:'Cloud storage unavailable'});
  }

  // GET — return stored state
  if (event.httpMethod === "GET") {
    try {
      const data = await store.get("current");
      return { statusCode: 200, headers: HEADERS, body: data || "null" };
    } catch (err) {
      console.error("MCC cloud read failed");
      return respond(500, { error: "Failed to read data" });
    }
  }

  // POST — save state
  if (event.httpMethod === "POST") {
    const body = event.body || "";
    // Validate JSON before storing
    if (Buffer.byteLength(body, 'utf8') > 1048576) return respond(413, {error:'Body too large'});
    try { const data = JSON.parse(body); if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid shape'); } catch {
      return respond(400, { error: "Invalid JSON body" });
    }
    try {
      await store.set("current", body);
      return respond(200, { ok: true });
    } catch (err) {
      console.error("MCC cloud save failed");
      return respond(500, { error: "Failed to save data" });
    }
  }

  return respond(405, { error: "Method not allowed" });
};
