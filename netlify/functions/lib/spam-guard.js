// Quiet spam drops for lead intake. A drop returns success and does not call LoanOS.
// TURNSTILE_SECRET_KEY is optional. When it is unset, token verification is skipped.

const MIN_SUBMIT_MS = 3000;
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function text(value) {
  if (typeof value === "string") return value.trim();
  if (value == null) return "";
  return String(value).trim();
}

function honeypotTripped(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  return text(body["bot-field"]) !== "" || text(body.honeypot) !== "";
}

function submittedTooFast(body, now = Date.now()) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const raw = body.form_rendered_at ?? body.formRenderedAt;
  if (raw == null || raw === "") return false;
  const rendered = Number(raw);
  if (!Number.isFinite(rendered)) return false;
  const elapsed = now - rendered;
  if (elapsed < 0) return false;
  return elapsed < MIN_SUBMIT_MS;
}

function turnstileToken(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "";
  return text(body["cf-turnstile-response"] || body.cf_turnstile_response);
}

function quietBody() {
  return { success: true, ok: true, captured: false };
}

async function turnstileRejected(body, fetchImpl, env = process.env) {
  const secret = env && env.TURNSTILE_SECRET_KEY ? String(env.TURNSTILE_SECRET_KEY) : "";
  if (!secret) return false;
  const token = turnstileToken(body);
  if (!token || typeof fetchImpl !== "function") return true;
  try {
    const response = await fetchImpl(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
    });
    const data = await response.json();
    return !data || data.success !== true;
  } catch {
    return true;
  }
}

async function spamDrop(body, fetchImpl, env = process.env, now = Date.now()) {
  if (honeypotTripped(body) || submittedTooFast(body, now)) return true;
  return turnstileRejected(body, fetchImpl, env);
}

module.exports = {
  MIN_SUBMIT_MS,
  VERIFY_URL,
  honeypotTripped,
  submittedTooFast,
  turnstileToken,
  turnstileRejected,
  spamDrop,
  quietBody,
};
