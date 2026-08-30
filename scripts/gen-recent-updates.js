#!/usr/bin/env node
// Generates recent-updates.json from git history so the homepage "Recently Updated"
// strip stays fresh automatically on every Netlify deploy — no manual upkeep.
// Fail-safe: on ANY error it leaves the existing committed recent-updates.json
// untouched and exits 0, so it can never block a deploy.
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "recent-updates.json");
const MAX = 10;
// A sitewide design, compliance, email, or CTA rollout can legitimately touch
// hundreds of pages without turning all of them into fresh editorial content.
// Ignore those bulk HTML commits when choosing each page's display date.
const MAX_HTML_FILES_PER_EDITORIAL_COMMIT = 24;

// Utility / app / legal pages we never surface as "content updates".
const DENY = new Set([
  "index.html", "404.html", "blog.html", "ops.html", "dashboard.html", "loan-dashboard.html",
  "marketing-command-center.html", "marketing-content.html", "task-dashboard.html",
  "loanos.html", "loanos-waitlist.html", "forms.html", "prequal.html", "scenario.html",
  "scenarios.html", "thank-you.html", "privacy.html", "terms.html", "texas-complaint-notice.html",
  "contact.html", "rate-alert.html", "about.html", "realtors.html", "realtor-resources.html",
  "googlea3d746ce1ceb4bff.html", "acd320ce4aaac882bfb455892bdcf208.html"
]);

function sh(cmd) { return execSync(cmd, { cwd: ROOT, encoding: "utf8" }).trim(); }

function titleOf(file) {
  try {
    const html = fs.readFileSync(path.join(ROOT, file), "utf8");
    const m = html.match(/<title>([^<]*)<\/title>/i);
    let t = m ? m[1] : file;
    // First segment before " | " is the clean human label.
    t = t.split("|")[0].trim();
    return t.replace(/&amp;/g, "&");
  } catch (e) { return file; }
}

function isIndexable(file) {
  try {
    const html = fs.readFileSync(path.join(ROOT, file), "utf8");
    return !/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
      && !/<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
  } catch (e) { return false; }
}

function substantiveDates(eligibleFiles) {
  const eligible = new Set(eligibleFiles);
  const dates = new Map();
  const output = sh('git log --format="__COMMIT__%x09%H%x09%cs" --name-only -- "*.html"');
  const commits = [];
  let current = null;

  output.split("\n").forEach(function (line) {
    if (line.indexOf("__COMMIT__\t") === 0) {
      if (current) commits.push(current);
      const parts = line.split("\t");
      current = { hash: parts[1] || "", date: parts[2] || "", files: [] };
    } else if (current && line.trim()) {
      current.files.push(line.trim());
    }
  });
  if (current) commits.push(current);

  commits.forEach(function (commit) {
    const htmlFiles = Array.from(new Set(commit.files.filter(function (file) {
      return file.endsWith(".html");
    })));
    if (htmlFiles.length > MAX_HTML_FILES_PER_EDITORIAL_COMMIT) return;
    htmlFiles.forEach(function (file) {
      if (eligible.has(file) && !dates.has(file)) dates.set(file, commit.date);
    });
  });

  return dates;
}

try {
  // Tracked HTML in root + blog/ only (money + suburb pages live in root).
  let files = sh('git ls-files "*.html"').split("\n").filter(Boolean);
  files = files.filter(function (f) {
    if (f.indexOf("/") !== -1 && f.indexOf("blog/") !== 0) return false; // root or blog/ only
    return !DENY.has(f) && isIndexable(f);
  });

  const dates = substantiveDates(files);
  let items = files.map(function (f) {
    return { url: "/" + f, title: titleOf(f), date: dates.get(f) || "" };
  }).filter(function (it) { return it.date; });

  items.sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  const top = items.slice(0, MAX);

  if (!top.length) { console.error("no items found; leaving existing recent-updates.json"); process.exit(0); }

  const out = { generated: sh("git log -1 --format=%cs"), items: top };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.error("recent-updates.json: wrote " + top.length + " items");
} catch (e) {
  console.error("gen-recent-updates failed (leaving existing file):", e.message);
  process.exit(0); // never fail the build
}
