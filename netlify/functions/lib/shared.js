// netlify/functions/lib/shared.js
// Shared utilities used by all content generator functions.
// Import what you need: const { createGitHubFile, ... } = require('./lib/shared');

// ====================================================================
// GITHUB API: Create a file in the repo (triggers Netlify redeploy)
// filePath  — full path from repo root, e.g. "blog/2026-03-03-spring.html"
// content   — raw string content to write
// commitMessage — optional; defaults to "Add file: {filePath}"
// ====================================================================

async function createGitHubFile(filePath, content, commitMessage) {
  const token = process.env.GITHUB_TOKEN || process.env.github_token;
  const repo = process.env.GITHUB_REPO || process.env.Github_repo;
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  const body = JSON.stringify({
    message: commitMessage || `Add file: ${filePath}`,
    content: Buffer.from(content).toString("base64"),
    branch: "main",
  });

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "StyerTeam-Bot",
    },
    body,
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${errBody}`);
  }

  return res.json();
}

// ====================================================================
// MAILCHIMP: Create campaign + send immediately or schedule
// Requires mailchimp.setConfig() to have been called by the caller first.
// scheduleTime — ISO 8601 string; if omitted, sends immediately
// ====================================================================

async function createAndSendCampaign({ listId, subject, preheader, html, fromName, replyTo, scheduleTime }) {
  const mailchimp = require("@mailchimp/mailchimp_marketing");

  const campaign = await mailchimp.campaigns.create({
    type: "regular",
    recipients: { list_id: listId },
    settings: {
      subject_line: subject,
      preview_text: preheader,
      from_name: fromName,
      reply_to: replyTo,
    },
  });

  await mailchimp.campaigns.setContent(campaign.id, { html });

  if (scheduleTime) {
    await mailchimp.campaigns.schedule(campaign.id, { schedule_time: scheduleTime });
    return { id: campaign.id, status: "scheduled", subject, scheduledFor: scheduleTime };
  } else {
    await mailchimp.campaigns.send(campaign.id);
    return { id: campaign.id, status: "sent", subject };
  }
}

// ====================================================================
// HELPER: Replace [PAGE_URL] placeholder in email HTML
// ====================================================================

function injectPageLink(html, pageUrl) {
  return html.replace(/\[PAGE_URL\]/g, pageUrl);
}

// ====================================================================
// HELPER: Force all relative .html links to an absolute URL
// Also replaces any [PAGE_URL] placeholders.
// ====================================================================

function forceAbsoluteLinks(html, pageUrl) {
  let result = html.replace(/\[PAGE_URL\]/g, pageUrl);

  result = result.replace(
    /href=["']([^"']*?\.html)["']/gi,
    (match, href) => {
      if (href.startsWith("http") || href.startsWith("../") || href.startsWith("/")) {
        return match;
      }
      return `href="${pageUrl}"`;
    }
  );

  return result;
}

// ====================================================================
// HELPER: Inject a floated photo near the Personal Corner section
// ====================================================================

function injectPhotoIntoPersonalSection(html, photoUrl) {
  const imgHtml = `<img src="${photoUrl}" alt="Adam Styer" style="float: left; width: 150px; height: auto; border-radius: 8px; margin: 0 1rem 0.5rem 0;">`;

  // Prefer a recognizable Personal Corner heading
  const personalMatch = html.match(/<h2[^>]*>.*?(Personal|Corner|Family|Faith|Fitness|Finance|Off the Clock|This Week|Life Update).*?<\/h2>/i);
  if (personalMatch) {
    const idx = personalMatch.index + personalMatch[0].length;
    return html.slice(0, idx) + "\n" + imgHtml + "\n" + html.slice(idx);
  }

  // Fallback: after an <hr> divider
  const hrMatch = html.match(/<hr\s*\/?>/i);
  if (hrMatch) {
    const idx = hrMatch.index + hrMatch[0].length;
    return html.slice(0, idx) + "\n" + imgHtml + "\n" + html.slice(idx);
  }

  // Last resort: after the last <h2> in the document
  const allH2 = [...html.matchAll(/<\/h2>/gi)];
  if (allH2.length > 0) {
    const lastH2 = allH2[allH2.length - 1];
    const idx = lastH2.index + lastH2[0].length;
    return html.slice(0, idx) + "\n" + imgHtml + "\n" + html.slice(idx);
  }

  return html;
}

// ====================================================================
// HELPER: Strip outer HTML document wrapper tags (AI sometimes adds them)
// ====================================================================

function stripNestedHtmlDocument(html) {
  let cleaned = html;
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, "");
  cleaned = cleaned.replace(/<\/?html[^>]*>/gi, "");
  cleaned = cleaned.replace(/<head[\s\S]*?<\/head>/gi, "");
  cleaned = cleaned.replace(/<\/?body[^>]*>/gi, "");
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, "");
  cleaned = cleaned.replace(/^[\s\n]*<div class="container">\s*/i, "");
  cleaned = cleaned.replace(/\s*<\/div>[\s\n]*$/i, "");
  return cleaned.trim();
}

// ====================================================================
// HELPER: Format a YYYY-MM-DD date string for display in titles
// ====================================================================

function formatDateForTitle(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

module.exports = {
  createGitHubFile,
  createAndSendCampaign,
  injectPageLink,
  forceAbsoluteLinks,
  injectPhotoIntoPersonalSection,
  stripNestedHtmlDocument,
  formatDateForTitle,
};
