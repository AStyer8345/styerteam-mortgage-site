#!/usr/bin/env python3
"""
IndexNow submitter for styermortgage.com.

Pushes URL change notifications to Bing (via IndexNow), which also feeds
AI search engines like ChatGPT search. No OAuth — auth is proven by
hosting /{KEY}.txt at the site root.

Usage:
    python3 indexnow-submit.py --from-sitemap              # submit all sitemap URLs
    python3 indexnow-submit.py --from-git-diff             # submit URLs modified since HEAD~1
    python3 indexnow-submit.py URL1 URL2 ...               # submit explicit URLs
    python3 indexnow-submit.py --from-git-diff --dry-run   # print what would be sent

Exit codes:
    0  — success (HTTP 200 or 202)
    1  — network/API error
    2  — invalid args or nothing to submit
"""
from __future__ import annotations
import sys, os, json, subprocess, argparse, urllib.request, urllib.error
from pathlib import Path

KEY = "acd320ce4aaac882bfb455892bdcf208"
HOST = "styermortgage.com"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/IndexNow"
REPO_ROOT = Path(__file__).resolve().parent.parent

def urls_from_sitemap() -> list[str]:
    import re
    sm = (REPO_ROOT / "sitemap.xml").read_text()
    return re.findall(r"<loc>([^<]+)</loc>", sm)

def urls_from_git_diff(ref: str = "HEAD~1") -> list[str]:
    """Return URLs for HTML files changed between `ref` and working tree."""
    try:
        out = subprocess.check_output(
            ["git", "diff", "--name-only", ref, "--", "*.html"],
            cwd=REPO_ROOT, text=True,
        )
    except subprocess.CalledProcessError:
        return []
    urls = []
    for line in out.splitlines():
        line = line.strip()
        if not line or not line.endswith(".html"): continue
        # Skip pages not meant for public indexing
        if line in {"dashboard.html", "loanos.html", "hero-test.html"}: continue
        if line.startswith("updates/") or line.startswith("netlify/"): continue
        # Root HTML → /page.html; subdirs preserved
        urls.append(f"https://{HOST}/{line}")
    return urls

def submit(urls: list[str], dry_run: bool = False) -> int:
    urls = sorted(set(urls))
    if not urls:
        print("No URLs to submit.", file=sys.stderr)
        return 2
    # IndexNow accepts up to 10,000 per request; we're always well under
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }
    print(f"Submitting {len(urls)} URL(s) to IndexNow:")
    for u in urls: print(f"  {u}")
    if dry_run:
        print("\n[--dry-run] Not sending.")
        return 0
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT, data=data, method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            code = resp.getcode()
            body = resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        code = e.code
        body = e.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"Network error: {e}", file=sys.stderr)
        return 1
    print(f"\nIndexNow response: HTTP {code}")
    if body.strip(): print(body)
    # 200 = accepted, 202 = accepted (async processing).
    # 400 = bad request, 403 = key not valid, 422 = URLs don't belong to host, 429 = rate-limited.
    return 0 if code in (200, 202) else 1

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--from-sitemap", action="store_true", help="Submit every URL in sitemap.xml")
    p.add_argument("--from-git-diff", action="store_true", help="Submit HTML files modified since HEAD~1")
    p.add_argument("--since", default="HEAD~1", help="Git ref to diff against (default HEAD~1)")
    p.add_argument("--dry-run", action="store_true", help="Print URLs without sending")
    p.add_argument("urls", nargs="*", help="Explicit URLs to submit")
    args = p.parse_args()

    urls: list[str] = list(args.urls)
    if args.from_sitemap: urls += urls_from_sitemap()
    if args.from_git_diff: urls += urls_from_git_diff(args.since)

    if not urls:
        print("Nothing to submit. Pass URLs or --from-sitemap / --from-git-diff.", file=sys.stderr)
        return 2
    return submit(urls, dry_run=args.dry_run)

if __name__ == "__main__":
    sys.exit(main())
