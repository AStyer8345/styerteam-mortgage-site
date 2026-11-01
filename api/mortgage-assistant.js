// Public assistant config. The conversational runtime stays off, matching the
// current site: MORTGAGE_ASSISTANT_ENABLED is not set, and the widget bails
// unless enabled is true. Disclosure copy matches the Netlify config response.

const DISCLOSURE = {
  enabled: false,
  aiDisclosure: "You’re chatting with an AI mortgage strategy assistant. It can provide general education and planning estimates, but it cannot approve a loan or quote live pricing; Adam can verify your scenario.",
  sensitiveDataNotice: "Don’t send Social Security numbers, full birth dates, financial account or card numbers, passwords, authentication codes, or ID documents.",
  consentPolicyVersion: "privacy-contact-2026-07-15-v1",
  consentText: "By submitting this request, I agree that Adam Styer or his team may contact me by phone, email, or text regarding my mortgage inquiry. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out. I understand this assistant is not a secure place to submit Social Security numbers, full birth dates, financial account information, passwords, authentication codes, or identification documents. See the Privacy Policy at styermortgage.com/privacy.html for more information.",
};

function send(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.status(status).json(body);
}

function handler(req, res) {
  if (req.method === "GET") return send(res, 200, DISCLOSURE);
  if (req.method !== "POST") {
    return send(res, 405, { error: { code: "method_not_allowed", message: "Method not allowed." } });
  }
  return send(res, 404, { error: { code: "disabled", message: "Assistant is not enabled." } });
}

module.exports = handler;
module.exports.DISCLOSURE = DISCLOSURE;
