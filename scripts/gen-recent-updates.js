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

// Utility / app / legal pages we never surface as "content updates".
const DENY = new Set([
  "index.html", "blog.html", "ops.html", "dashboard.html", "loan-dashboard.html",
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

try {
  // Tracked HTML in root + blog/ only (money + suburb pages live in root).
  let files = sh('git ls-files "*.html"').split("\n").filter(Boolean);
  files = files.filter(function (f) {
    if (f.indexOf("/") !== -1 && f.indexOf("blog/") !== 0) return false; // root or blog/ only
    return !DENY.has(f);
  });

  let items = files.map(function (f) {
    let date = "";
    try { date = sh('git log -1 --format=%cs -- "' + f + '"'); } catch (e) {}
    return { url: "/" + f, title: titleOf(f), date: date };
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
