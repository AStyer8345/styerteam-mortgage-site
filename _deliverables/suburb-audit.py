#!/usr/bin/env python3
"""
Suburb page audit — quantifies boilerplate vs unique content across the
24 {city}-mortgage-lender.html pages.

Output: ranked table, highest boilerplate % first = highest rewrite priority.
"""
from __future__ import annotations
import re, sys, glob, os
from html.parser import HTMLParser
from collections import Counter

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCLUDE = {"austin-area-mortgage-lender.html"}

# City slug -> display name map (so we can normalize "Round Rock", "Round-Rock", etc.)
CITY_SLUGS = {
    "bastrop":"Bastrop","bee-cave":"Bee Cave","buda":"Buda","cedar-park":"Cedar Park",
    "dripping-springs":"Dripping Springs","elgin":"Elgin","florence":"Florence",
    "georgetown":"Georgetown","hutto":"Hutto","jarrell":"Jarrell","kyle":"Kyle",
    "lakeway":"Lakeway","leander":"Leander","liberty-hill":"Liberty Hill",
    "manor":"Manor","marble-falls":"Marble Falls","new-braunfels":"New Braunfels",
    "pflugerville":"Pflugerville","round-rock":"Round Rock","san-marcos":"San Marcos",
    "smithville":"Smithville","spicewood":"Spicewood","taylor":"Taylor",
    "westlake":"Westlake",
}

class TextExtractor(HTMLParser):
    SKIP = {"script","style","header","footer","nav","noscript","svg"}
    def __init__(self):
        super().__init__()
        self.parts, self.skipping = [], 0
    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP: self.skipping += 1
    def handle_endtag(self, tag):
        if tag in self.SKIP and self.skipping: self.skipping -= 1
    def handle_data(self, data):
        if not self.skipping:
            t = data.strip()
            if t: self.parts.append(t)
    def text(self): return " ".join(self.parts)

def normalize(text: str, city_name: str) -> list[str]:
    """Return list of normalized sentences with city name replaced by {CITY}."""
    # Replace city name (and variants) with placeholder
    for name in [city_name, city_name.replace(" ","-"), city_name.lower(),
                 city_name.upper(), city_name.replace(" ","")]:
        text = re.sub(re.escape(name), "{CITY}", text, flags=re.IGNORECASE)
    # Also strip city-specific numbers (lat/lng, prices) to reduce noise
    # Split into sentences (rough but fine)
    parts = re.split(r"(?<=[.!?])\s+", text)
    # Keep only non-trivial sentences
    return [p.strip() for p in parts if len(p.strip()) > 25]

def load(path: str):
    slug = os.path.basename(path).replace("-mortgage-lender.html","")
    city = CITY_SLUGS[slug]
    with open(path, encoding="utf-8") as f: html = f.read()
    ex = TextExtractor(); ex.feed(html)
    sents = normalize(ex.text(), city)
    return slug, city, sents

def main():
    files = sorted(glob.glob(os.path.join(REPO, "*-mortgage-lender.html")))
    files = [f for f in files if os.path.basename(f) not in EXCLUDE]

    pages = [load(f) for f in files]

    # Count how many pages each normalized sentence appears on
    sent_freq: Counter = Counter()
    for _, _, sents in pages:
        for s in set(sents): sent_freq[s] += 1

    N = len(pages)
    # A sentence is "boilerplate" if it appears on >=50% of pages
    boilerplate_threshold = max(2, N // 2)

    rows = []
    for slug, city, sents in pages:
        total_sent = len(sents)
        if total_sent == 0: continue
        boiler = sum(1 for s in sents if sent_freq[s] >= boilerplate_threshold)
        unique_to_page = sum(1 for s in sents if sent_freq[s] == 1)
        total_words = sum(len(s.split()) for s in sents)
        boiler_words = sum(len(s.split()) for s in sents if sent_freq[s] >= boilerplate_threshold)
        unique_words = sum(len(s.split()) for s in sents if sent_freq[s] == 1)
        rows.append({
            "slug": slug, "city": city,
            "total_sent": total_sent, "boiler_sent": boiler, "unique_sent": unique_to_page,
            "total_words": total_words, "boiler_words": boiler_words,
            "unique_words": unique_words,
            "boiler_pct": round(100*boiler_words/total_words, 1) if total_words else 0,
            "unique_pct": round(100*unique_words/total_words, 1) if total_words else 0,
        })

    # Rank by boilerplate % descending (worst offenders first)
    rows.sort(key=lambda r: -r["boiler_pct"])

    print(f"Pages analyzed: {N}")
    print(f"Boilerplate threshold: sentence appears on >= {boilerplate_threshold} pages\n")
    print(f"{'slug':<22} {'city':<18} {'words':>6} {'boiler%':>8} {'unique%':>8}")
    print("-"*68)
    for r in rows:
        print(f"{r['slug']:<22} {r['city']:<18} {r['total_words']:>6} "
              f"{r['boiler_pct']:>7}% {r['unique_pct']:>7}%")

    # Aggregate
    avg_boiler = sum(r["boiler_pct"] for r in rows) / len(rows)
    avg_unique = sum(r["unique_pct"] for r in rows) / len(rows)
    print(f"\nAverage boilerplate: {avg_boiler:.1f}%")
    print(f"Average unique:      {avg_unique:.1f}%")

    # Emit machine-readable for the markdown writer
    import json
    with open(os.path.join(REPO, "_deliverables", "suburb-audit-data.json"), "w") as f:
        json.dump({
            "pages": rows,
            "avg_boiler_pct": avg_boiler,
            "avg_unique_pct": avg_unique,
            "threshold": boilerplate_threshold,
            "n": N,
        }, f, indent=2)

if __name__ == "__main__":
    main()
