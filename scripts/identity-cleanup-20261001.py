"""Identity cleanup (2026-10-01).
Adam's stated facts: Senior Loan Officer (not 'independent broker'; 'broker' kept for
SEO), '40+ capital partners' (not wholesale lenders), licensed since 2015 (no
'since 2017' claim). Generic educational sentences about how wholesale lending
works are left intact. Legal/licensing names are not touched."""
import re, glob, sys
from collections import Counter

FILES = [f for f in glob.glob("**/*", recursive=True)
         if f.endswith((".html", ".txt", ".json", ".js", ".mjs"))
         and not f.startswith(("node_modules/", "run-logs/", "docs/", "tests/", "scripts/", ".git/"))
         and "manifest" not in f]

R = [  # (pattern, replacement) applied in order; case-sensitive unless (?i)
 # bylines / self-descriptions
 (r"Independent mortgage broker Adam Styer", "Senior Loan Officer Adam Styer"),
 (r"Independent mortgage broker, NMLS #513013", "Senior Loan Officer, NMLS #513013"),
 (r"Adam Styer, independent mortgage broker", "Adam Styer, Senior Loan Officer"),
 (r"an independent mortgage brokerage", "a mortgage brokerage"),
 (r"as an independent broker shop", "as a mortgage broker shop"),
 # since 2017 (all refer to Adam)
 (r",? (?:working|serving) ([A-Z][A-Za-z ]+? County(?: and the Austin area)?) since 2017", r" serving \1"),
 (r" (buyers in [^.<>]{3,120}?) since 2017", r" \1"),
 (r"(loans? closed) since 2017", r"\1"),
 (r"(1,000\+ loans in Austin) since 2017", r"\1"),
 (r"(Austin,? TX) since 2017", r"\1"),
 (r" since 2017", ""),
 # independent broker (generic phrasing -> mortgage broker; keeps 'broker' for SEO)
 (r"\ban independent mortgage broker\b", "a mortgage broker"),
 (r"\bAn independent mortgage broker\b", "A mortgage broker"),
 (r"\ban independent broker\b", "a mortgage broker"),
 (r"\bAn independent broker\b", "A mortgage broker"),
 (r"\bindependent mortgage brokers?\b", lambda m: m.group(0).replace("independent ", "")),
 (r"\bIndependent Mortgage Broker\b", "Mortgage Broker"),
 (r"\bIndependent Brokers\b", "Mortgage Brokers"),
 (r"\bIndependent Broker\b", "Mortgage Broker"),
 (r"\bIndependent mortgage broker\b", "Mortgage broker"),
 (r"\bIndependent broker\b", "Mortgage broker"),
 (r"\bindependent brokers?\b", lambda m: "mortgage " + m.group(0).split()[1]),
 # lender access -> capital partners
 (r"\b(?:20|40)\+ [Ww]holesale [Ll]ender relationships\b", "40+ capital partner relationships"),
 (r"\b(?:20|40)\+ Wholesale Lenders\b", "40+ Capital Partners"),
 (r"\b(?:20|40)\+ wholesale lenders?\b", "40+ capital partners"),
 (r"\b(?:20|40)\+ Lenders\b", "40+ Capital Partners"),
 (r"\b(?:20|40)\+ lenders\b", "40+ capital partners"),
 (r"\bmultiple wholesale lenders\b", "multiple capital partners"),
 (r"\bdozens of wholesale lenders\b", "dozens of capital partners"),
 (r"\bmy wholesale lender network\b", "my capital partner network"),
 (r"\bwholesale lender network\b", "capital partner network"),
 (r"\bwork directly with wholesale lender underwriters\b", "work directly with my capital partners' underwriters"),
 (r"\bwholesale lender relationships\b", "capital partner relationships"),
 (r"\bfrom 40\+ capital partners\b", "from 40+ capital partners"),
]
R = [(re.compile(p), r) for p, r in R]

stats = Counter(); changed = []
for f in FILES:
    try: s = open(f, encoding="utf-8").read()
    except Exception: continue
    o = s
    for pat, rep in R:
        s, n = pat.subn(rep, s)
        if n: stats[pat.pattern] += n
    if s != o:
        open(f, "w", encoding="utf-8").write(s); changed.append(f)
print(len(changed), "files changed")
for k, v in stats.most_common(): print(f"{v:4d}  {k}")
