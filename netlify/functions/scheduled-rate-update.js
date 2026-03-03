// netlify/functions/scheduled-rate-update.js
// Netlify Scheduled Function — runs on a cron schedule defined in netlify.toml.
//
// To activate:
//  1. Uncomment the [[scheduled-functions]] block in netlify.toml
//  2. Set SCHEDULED_RATE_DATA in Netlify env vars (JSON string of the rates payload)
//     Example value:
//       {"rates":"30yr: 7.125% / 7.28% APR\n20yr: 6.875% / 7.04% APR","audiences":["borrower","realtor"],"mode":"live"}
//  3. Deploy — Netlify will invoke this function automatically on the schedule.
//
// The function calls generateRateUpdate() directly (no HTTP overhead, no secret needed).

const { generateRateUpdate } = require("./generate-rate-update");

exports.handler = async () => {
  const raw = process.env.SCHEDULED_RATE_DATA;

  if (!raw) {
    console.error("[scheduled-rate-update] SCHEDULED_RATE_DATA env var is not set — skipping");
    return { statusCode: 200, body: "Skipped: no rate data configured" };
  }

  let formData;
  try {
    formData = JSON.parse(raw);
  } catch (e) {
    console.error("[scheduled-rate-update] Failed to parse SCHEDULED_RATE_DATA:", e.message);
    return { statusCode: 200, body: "Skipped: invalid JSON in SCHEDULED_RATE_DATA" };
  }

  try {
    const result = await generateRateUpdate(formData);
    console.log("[scheduled-rate-update] Done:", JSON.stringify({ pageUrl: result.pageUrl, campaigns: result.campaigns }));
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    console.error("[scheduled-rate-update] Error:", err.message);
    return { statusCode: 500, body: err.message };
  }
};
