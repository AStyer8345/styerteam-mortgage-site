// Adapt a Node request to the Netlify function event the existing handlers expect.
// The internal backup header is stripped so a browser cannot suppress the auto-reply.

function bridge(handler, req, res) {
  return readBody(req).then(async (body) => {
    const headers = { ...req.headers };
    delete headers["x-styer-internal-backup"];
    delete headers["X-Styer-Internal-Backup"];
    const host = headers.host || "localhost";
    const url = req.url || "/";
    const event = {
      httpMethod: req.method,
      headers,
      body,
      rawUrl: `https://${host}${url}`,
      path: url.split("?")[0],
      queryStringParameters: Object.fromEntries(new URL(`https://${host}${url}`).searchParams),
    };
    const result = await handler(event);
    const responseHeaders = result.headers || {};
    for (const [key, value] of Object.entries(responseHeaders)) {
      if (value != null) res.setHeader(key, value);
    }
    res.status(result.statusCode || 200);
    res.send(result.body == null ? "" : result.body);
  }).catch((error) => {
    console.error("[netlify-bridge]", error && error.message);
    if (!res.headersSent) res.status(500).json({ error: "Function failed" });
  });
}

function readBody(req) {
  if (typeof req.body === "string") return Promise.resolve(req.body);
  if (Buffer.isBuffer(req.body)) return Promise.resolve(req.body.toString("utf8"));
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

module.exports = { bridge };
