#!/usr/bin/env python3
"""GoRascal entity + chrome pass (2026-10-27).

Replaces HyperSmart / Kyber / NMLS 2653540 / old Austin HQ address with
The Styer Team · Powered by GoRascal / Go Rascal Inc. / NMLS 2072896 /
Brooklyn corp + Austin branch. Demotes hypersmart.my1003app.com Apply CTAs
to /contact.html (no GoRascal apply URL confirmed). Does not invent domains.
"""
from __future__ import annotations

import pathlib
import re
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[1]

SKIP_DIRS = {
    ".git",
    "node_modules",
    ".site-dist",
    ".netlify",
    "design-review",  # fixtures / audit screenshots — leave historical
}

# Public + generator sources. Skip pure history changelogs handled separately.
INCLUDE_SUFFIXES = {
    ".html",
    ".js",
    ".mjs",
    ".cjs",
    ".ts",
    ".mts",
    ".svg",
    ".json",
    ".md",
    ".txt",
    ".toml",
    ".css",
    ".fixture",
}

SKIP_PATH_PARTS = {
    # Historical narrative — keep HyperSmart mentions as history unless listed below
}

FORCE_INCLUDE_MD = {
    "CONTEXT.md",
    "CLAUDE.md",
    "PHASES.md",
    "ai-knowledge/company-information.md",
}

DISPLAY = "The Styer Team · Powered by GoRascal"
LEGAL = "Go Rascal Inc."
COMPANY_NMLS = "2072896"
AUSTIN_LINE1 = "7600 N Capital of Texas Hwy, Suite 230, Office 105"
AUSTIN_LINE2 = "Austin, TX 78731"
AUSTIN_INLINE = f"{AUSTIN_LINE1}, {AUSTIN_LINE2}"
CORP_INLINE = "185 Wythe Ave, Suite A2, Brooklyn, NY 11249"
CORP_STREET = "185 Wythe Ave, Suite A2"
CORP_CITY = "Brooklyn"
CORP_REGION = "NY"
CORP_POSTAL = "11249"
CONTACT_HREF = "/contact.html"


def should_process(path: pathlib.Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    parts = set(path.parts)
    if parts & SKIP_DIRS:
        return False
    if any(p in SKIP_DIRS for p in path.relative_to(ROOT).parts):
        return False
    if path.suffix.lower() not in INCLUDE_SUFFIXES:
        return False
    # Skip CHANGELOG / run-logs historical docs except forced
    if rel in FORCE_INCLUDE_MD:
        return True
    if path.suffix.lower() == ".md":
        if rel.startswith(("run-logs/", "docs/", "CHANGELOG")):
            return False
        if rel.endswith("CHANGELOG.md") or rel == "CHANGELOG.md":
            return False
        # Process ai-knowledge and other operational md
        if rel.startswith("ai-knowledge/") or rel in FORCE_INCLUDE_MD:
            return True
        # Skip most md history; still scrub if it is operational instructions
        if rel in {"CONTEXT.md", "CLAUDE.md", "PHASES.md", "TODO.md"}:
            return True
        return False
    return True


def demote_apply_anchors(text: str) -> str:
    """Point every hypersmart.my1003app URL at /contact.html (no inventing a portal)."""
    return re.sub(
        r'https://hypersmart\.my1003app\.com/513013/register(?:\?[^"\'\s<>]*)?',
        CONTACT_HREF,
        text,
    )


def polish_demoted_ctas(text: str) -> str:
    # Nav Apply Now that now points to contact
    text = re.sub(
        rf'(<a href="{re.escape(CONTACT_HREF)}"([^>]*class="[^"]*nav-apply[^"]*"[^>]*)>)Apply Now(</a>)',
        r'\1Contact\3',
        text,
    )
    text = re.sub(
        rf'(<a href="{re.escape(CONTACT_HREF)}"[^>]*class="[^"]*nav-apply[^"]*"[^>]*)\s+target="_blank"',
        r"\1",
        text,
    )
    text = re.sub(
        rf'(<a href="{re.escape(CONTACT_HREF)}"[^>]*class="[^"]*nav-apply[^"]*"[^>]*)\s+rel="noopener"',
        r"\1",
        text,
    )
    text = re.sub(
        r'aria-label="Apply Now — opens the secure application portal"',
        'aria-label="Contact Adam Styer"',
        text,
    )
    # Footer / list "Secure application"
    text = re.sub(
        rf'(<a href="{re.escape(CONTACT_HREF)}"[^>]*>)Secure application(</a>)',
        r"\1Contact\2",
        text,
    )
    text = re.sub(
        rf'(<a href="{re.escape(CONTACT_HREF)}"[^>]*>)Start secure application(</a>)',
        r"\1Contact\2",
        text,
        flags=re.I,
    )
    text = re.sub(
        rf'(<a href="{re.escape(CONTACT_HREF)}"[^>]*>)Apply Now(</a>)',
        r"\1Contact\2",
        text,
    )
    # Homepage secondary CTA copy
    text = text.replace(
        "Ready to file? Start Secure 1003 Application",
        "Ready for next steps? Contact Adam",
    )
    text = text.replace("Start Secure 1003 Application", "Contact Adam")
    # Journey / educational copy about My1003 portal
    text = text.replace(
        "Apply Now opens the secure My1003 portal for a formal loan review.",
        "Contact Adam when you are ready for a formal loan review.",
    )
    text = text.replace(
        "Use the secure My1003 application when you are ready to provide the details for a formal loan review.",
        "Contact Adam when you are ready to provide the details for a formal loan review.",
    )
    text = text.replace(
        "When should I start the secure application?",
        "When should I contact Adam for a formal loan review?",
    )
    # JS APPLICATION_URL already rewritten by URL replace
    text = re.sub(
        rf'var APPLICATION_URL = "{re.escape(CONTACT_HREF)}";',
        f'var APPLICATION_URL = "{CONTACT_HREF}";',
        text,
    )
    # Assistant resource labels
    text = text.replace(
        "label: 'Start secure application'",
        "label: 'Contact Adam'",
    )
    text = text.replace(
        'label: "Start secure application"',
        'label: "Contact Adam"',
    )
    return text


def replace_addresses(text: str) -> str:
    # Principal / legal lines first (Brooklyn corp)
    text = text.replace(
        "Principal address 9050 N. Capital of Texas Hwy, Ste 390, Austin, Texas 78759",
        f"Principal address {CORP_INLINE}. Austin branch {AUSTIN_INLINE}",
    )
    text = text.replace(
        "Principal address 9050 N. Capital of Texas Hwy, Suite 390, Austin, Texas 78759",
        f"Principal address {CORP_INLINE}. Austin branch {AUSTIN_INLINE}",
    )

    # Two-line footer / contact blocks (Austin branch — local presence)
    text = text.replace(
        "9050 N. Capital of Texas Hwy, Ste 390<br>Austin, Texas 78759",
        f"{AUSTIN_LINE1}<br>{AUSTIN_LINE2}",
    )
    text = text.replace(
        "9050 N. Capital of Texas Hwy, Ste 390<br>\nAustin, Texas 78759",
        f"{AUSTIN_LINE1}<br>\n{AUSTIN_LINE2}",
    )
    text = text.replace(
        "9050 N. Capital of Texas Hwy, Suite 390<br>Austin, Texas 78759",
        f"{AUSTIN_LINE1}<br>{AUSTIN_LINE2}",
    )
    text = text.replace(
        "9050 N. Capital of Texas Hwy, Ste 390<br>Austin, TX 78759",
        f"{AUSTIN_LINE1}<br>{AUSTIN_LINE2}",
    )

    # Inline single-line office mentions → Austin branch
    text = text.replace(
        "9050 N. Capital of Texas Hwy, Ste 390, Austin, Texas 78759",
        AUSTIN_INLINE,
    )
    text = text.replace(
        "9050 N. Capital of Texas Hwy, Suite 390, Austin, Texas 78759",
        AUSTIN_INLINE,
    )
    text = text.replace(
        "9050 N. Capital of Texas Hwy, Ste 390, Austin, TX 78759",
        AUSTIN_INLINE,
    )

    # JSON-LD streetAddress / addressLocality blocks commonly use Austin HQ
    text = text.replace(
        '"streetAddress": "9050 N. Capital of Texas Hwy, Ste 390"',
        f'"streetAddress": "{AUSTIN_LINE1}"',
    )
    text = text.replace(
        '"streetAddress": "9050 N. Capital of Texas Hwy, Suite 390"',
        f'"streetAddress": "{AUSTIN_LINE1}"',
    )
    text = text.replace('"postalCode": "78759"', '"postalCode": "78731"')
    text = text.replace('"postalCode":"78759"', '"postalCode":"78731"')

    # Bare remaining street (any leftover)
    text = text.replace("9050 N. Capital of Texas Hwy, Ste 390", AUSTIN_LINE1)
    text = text.replace("9050 N. Capital of Texas Hwy, Suite 390", AUSTIN_LINE1)
    text = text.replace("9050 N Capital of Texas Hwy, Ste 390", AUSTIN_LINE1)

    # Orphaned old zip after street already replaced in some broken layouts
    text = text.replace("Austin, Texas 78759", AUSTIN_LINE2)
    text = text.replace("Austin, TX 78759", AUSTIN_LINE2)

    return text


def replace_entity(text: str) -> str:
    # Longest / most specific first
    text = text.replace(
        "Kyber Mortgage Corporation dba HyperSmart Home Loans",
        LEGAL,
    )
    text = text.replace("Kyber Mortgage Corporation", LEGAL)
    text = text.replace("Adam Styer | HyperSmart Home Loans", DISPLAY)
    text = text.replace("HyperSmart Home Loans", DISPLAY)
    # Bare HyperSmart leftovers
    text = re.sub(r"\bHyperSmart\b", "GoRascal", text)
    text = re.sub(r"\bKyber\b", "Go Rascal", text)

    # Company NMLS
    text = text.replace(
        "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2653540",
        f"https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/{COMPANY_NMLS}",
    )
    text = text.replace("NMLS#:</strong> 2653540", f"NMLS#:</strong> {COMPANY_NMLS}")
    text = text.replace("NMLS#:</strong>2653540", f"NMLS#:</strong>{COMPANY_NMLS}")
    text = text.replace("NMLS#: 2653540", f"NMLS#: {COMPANY_NMLS}")
    text = text.replace("NMLS# 2653540", f"NMLS# {COMPANY_NMLS}")
    text = text.replace("NMLS ID 2653540", f"NMLS ID {COMPANY_NMLS}")
    text = text.replace("NMLS #2653540", f"NMLS #{COMPANY_NMLS}")
    text = text.replace("Company: 2653540", f"Company: {COMPANY_NMLS}")
    text = text.replace('"value": "2653540"', f'"value": "{COMPANY_NMLS}"')
    text = text.replace("NMLS 2653540", f"NMLS {COMPANY_NMLS}")
    # Remaining bare company id near NMLS contexts
    text = re.sub(r"(?<!\d)2653540(?!\d)", COMPANY_NMLS, text)

    # JSON-LD name/legalName already covered via string replaces above;
    # ensure legalName field uses LEGAL if something odd remains
    text = text.replace(
        f'"legalName": "{DISPLAY}"',
        f'"legalName": "{LEGAL}"',
    )

    return text


def transform(text: str) -> str:
    text = demote_apply_anchors(text)
    text = polish_demoted_ctas(text)
    text = replace_addresses(text)
    text = replace_entity(text)
    return text


def main() -> None:
    stats = Counter()
    changed: list[str] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if not should_process(path):
            continue
        try:
            original = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        if not any(
            s in original
            for s in (
                "HyperSmart",
                "Kyber",
                "2653540",
                "9050 N",
                "hypersmart.my1003app",
                "78759",
            )
        ):
            continue
        updated = transform(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            rel = path.relative_to(ROOT).as_posix()
            changed.append(rel)
            stats["files"] += 1

    print(f"{stats['files']} files changed")
    for rel in sorted(changed)[:30]:
        print(" ", rel)
    if len(changed) > 30:
        print(f"  ... and {len(changed) - 30} more")


if __name__ == "__main__":
    main()
