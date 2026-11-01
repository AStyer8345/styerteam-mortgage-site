// Private calculator return links. Same request checks as the Netlify function.
// Storage is Netlify Blobs when that runtime is present. Otherwise the same
// 503 the function returns when the store is unavailable.

const { createHash } = require("node:crypto");

const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};

function createHandler(store, now = Date.now) {
  return async (request) => {
    const respond = (status, body) => new Response(JSON.stringify(body), { status, headers });
    if (!["GET", "POST", "DELETE"].includes(request.method)) return respond(405, { error: "Method not allowed" });
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return respond(403, { error: "Origin not allowed" });
    const token = request.headers.get("authorization")?.match(/^Bearer ([A-Za-z0-9_-]{43})$/)?.[1];
    if (!token) return respond(401, { error: "A private return link is required" });
    const key = createHash("sha256").update(token).digest("hex");
    try {
      if (request.method === "GET") {
        const record = await store.get(key, { type: "json" });
        if (!record) return respond(404, { error: "This saved analysis is unavailable" });
        if (record.expiresAt <= now()) {
          await store.delete(key);
          return respond(410, { error: "This return link has expired" });
        }
        return respond(200, record);
      }
      if (request.method === "DELETE") {
        await store.delete(key);
        return respond(200, { deleted: true });
      }
      if (!request.headers.get("content-type")?.includes("application/json")) return respond(415, { error: "JSON required" });
      const text = await request.text();
      if (text.length > 24000) return respond(413, { error: "Analysis too large" });
      let body;
      try { body = JSON.parse(text); } catch { return respond(400, { error: "Invalid analysis" }); }
      if (body.version !== 1 || typeof body.iv !== "string" || !/^[A-Za-z0-9_-]{16}$/.test(body.iv) || typeof body.ciphertext !== "string" || !/^[A-Za-z0-9_-]{32,20000}$/.test(body.ciphertext)) {
        return respond(400, { error: "Invalid encrypted analysis" });
      }
      const record = { version: 1, iv: body.iv, ciphertext: body.ciphertext, updatedAt: now(), expiresAt: now() + 90 * 24 * 60 * 60 * 1000 };
      await store.setJSON(key, record);
      return respond(200, { saved: true, expiresAt: record.expiresAt, updatedAt: record.updatedAt });
    } catch {
      return respond(503, { error: "Saving is unavailable. Your numbers are still here; please retry." });
    }
  };
}

function blobStore() {
  const { getStore } = require("@netlify/blobs");
  const production = process.env.VERCEL_ENV === "production" || process.env.CONTEXT === "production";
  const name = production ? "saved-analyses-v1" : "saved-analyses-preview-" + (process.env.VERCEL_DEPLOYMENT_ID || "local");
  return getStore({ name, consistency: "strong" });
}

async function handler(req, res) {
  let store;
  try { store = blobStore(); } catch { store = null; }
  if (!store) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "private, no-store");
    res.status(503).json({ error: "Saving is unavailable. Your numbers are still here; please retry." });
    return;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const body = Buffer.concat(chunks);
  const host = req.headers.host || "localhost";
  const request = new Request(`https://${host}${req.url || "/api/saved-analysis"}`, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
  });
  const response = await createHandler(store)(request);
  res.status(response.status);
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.send(Buffer.from(await response.arrayBuffer()));
}

module.exports = handler;
module.exports.createHandler = createHandler;
