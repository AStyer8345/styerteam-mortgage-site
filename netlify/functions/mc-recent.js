// netlify/functions/mc-recent.js
// One-shot: list Mailchimp members added since a given timestamp.
// GET /.netlify/functions/mc-recent?token=<LOANOS_AGENT_SECRET>&audience=realtor&hours=2

const apiKey = process.env.MAILCHIMP_API_KEY || process.env.mailchimp_api_key || "";
const DC = (apiKey.includes("-") ? apiKey.split("-").pop() : null)
  || process.env.MAILCHIMP_SERVER_PREFIX
  || process.env.mailchimp_server_prefix
  || "";
const API_BASE = `https://${DC}.api.mailchimp.com/3.0`;

const BORROWER_LIST = process.env.MAILCHIMP_BORROWER_LIST_ID || "";
const REALTOR_LIST = process.env.MAILCHIMP_REALTOR_LIST_ID || "";
const TOKEN = process.env.LOANOS_AGENT_SECRET || "";

exports.handler = async (event) => {
  const p = event.queryStringParameters || {};
  if (!TOKEN || p.token !== TOKEN) return respond(401, { error: "Unauthorized" });

  const audience = (p.audience || "realtor").toLowerCase();
  const listId = audience === "borrower" ? BORROWER_LIST : REALTOR_LIST;
  if (!listId) return respond(400, { error: "no list id" });

  const hours = parseInt(p.hours || "2", 10);
  const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();

  const auth = "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");
  const members = [];
  const pageSize = 1000;
  let offset = 0;

  for (;;) {
    const url = `${API_BASE}/lists/${listId}/members?count=${pageSize}&offset=${offset}&since_timestamp_opt=${encodeURIComponent(since)}&fields=members.email_address,members.merge_fields,members.timestamp_opt`;
    const res = await fetch(url, { headers: { Authorization: auth } });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return respond(500, { error: `Mailchimp ${res.status}: ${body.slice(0, 200)}` });
    }
    const data = await res.json();
    const batch = data.members || [];
    for (const m of batch) {
      members.push({
        email: m.email_address,
        fname: m.merge_fields?.FNAME || "",
        lname: m.merge_fields?.LNAME || "",
        opted_in_at: m.timestamp_opt,
      });
    }
    if (batch.length < pageSize) break;
    offset += pageSize;
  }

  return respond(200, {
    audience,
    since,
    count: members.length,
    members: members.sort((a, b) => a.email.localeCompare(b.email)),
  });
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body, null, 2),
  };
}
