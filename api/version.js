// Public deploy identity. Only the Vercel git and environment fields below
// are read. Nothing else from the environment is returned.

const builtAt = new Date().toISOString();

function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).json({ error: "Method not allowed." });
  }
  return res.status(200).json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
    ref: process.env.VERCEL_GIT_COMMIT_REF || null,
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID || null,
    env: process.env.VERCEL_ENV || null,
    builtAt,
  });
}

module.exports = handler;
