"""
Social Media Automation — First-Time Homebuyer Campaign
========================================================
Creates 3 branded graphics via Canva API and schedules them
as Buffer drafts with pre-written captions.

Author: Adam Styer | The Styer Team
Campaign: First-Time Homebuyer Guide Lead Gen

Requirements:
  pip install requests python-dotenv

Setup:
  1. Create a .env file in this directory with:
       CANVA_API_TOKEN=your_canva_token
       BUFFER_ACCESS_TOKEN=your_buffer_token
       BUFFER_PROFILE_ID=your_buffer_profile_id
       CANVA_BRAND_TEMPLATE_ID=your_template_id
  2. Run: python social_automation.py

Canva API docs: https://www.canva.dev/docs/connect/
Buffer API docs: https://publish.buffer.com/docs/api
"""

import os
import sys
import time
import json
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# ─── Configuration ────────────────────────────────────────

CANVA_API_TOKEN = os.getenv("CANVA_API_TOKEN")
CANVA_BASE_URL = "https://api.canva.com/rest/v1"
CANVA_BRAND_TEMPLATE_ID = os.getenv("CANVA_BRAND_TEMPLATE_ID")

BUFFER_ACCESS_TOKEN = os.getenv("BUFFER_ACCESS_TOKEN")
BUFFER_PROFILE_ID = os.getenv("BUFFER_PROFILE_ID")
BUFFER_BASE_URL = "https://api.bufferapp.com/1"

LANDING_PAGE_URL = "https://styermortgage.com/resources/first-time-buyer-guide/"

# Brand colors for reference (used in Canva template)
BRAND = {
    "navy":  "#0A1F3F",
    "gold":  "#C9A84C",
    "white": "#FFFFFF",
}

# ─── Post Definitions ────────────────────────────────────

POSTS = [
    {
        "id": "post_1_myth_buster",
        "headline": "You DON'T Need\n20% Down",
        "subtext": "First-time buyers can put\nas little as 3% down.",
        "cta": "Free Guide — Link in Bio",
        "caption": (
            "Stop waiting to save $70,000. \U0001F6D1\n\n"
            "As a first-time buyer, you can put as little as 3% down "
            "on a conventional loan.\n\n"
            "On a $350K home? That\u2019s $10,500 \u2014 not $70,000.\n\n"
            "I wrote a free guide breaking down the 12 things every "
            "Austin buyer needs to know before signing anything.\n\n"
            "PMI tiers, seller concessions, income rules, Texas programs "
            "\u2014 it\u2019s all in there.\n\n"
            "\U0001F449 Grab it free: {url}\n\n"
            "#AustinRealEstate #FirstTimeHomeBuyer #AustinTX "
            "#HomeBuyingTips #MortgageTips #AustinHomes"
        ),
    },
    {
        "id": "post_2_concessions",
        "headline": "Make the Seller\nPay Your Costs",
        "subtext": "Seller concessions can cover\nclosing costs & buy down your rate.",
        "cta": "Free Guide — Link in Bio",
        "caption": (
            "What if the seller paid your closing costs? \U0001F914\n\n"
            "It\u2019s called a seller concession \u2014 and on a $350K home, "
            "the seller can contribute $10,500\u2013$21,000 toward your costs.\n\n"
            "Even better: leftover dollars can buy down your interest rate. "
            "Temporarily (2-1 buydown) or permanently (discount points).\n\n"
            "Most buyers never ask for this. You should.\n\n"
            "I break it all down in my free First-Time Homebuyer Guide.\n\n"
            "\U0001F449 Get it here: {url}\n\n"
            "#SellerConcessions #HomeBuyerTips #AustinRealEstate "
            "#FirstTimeHomeBuyer #MortgageHacks #AustinTX"
        ),
    },
    {
        "id": "post_3_ready_check",
        "headline": "Are You Actually\nReady to Buy?",
        "subtext": "3 things that separate\n\u2018thinking\u2019 from \u2018doing.\u2019",
        "cta": "Free Guide — Link in Bio",
        "caption": (
            "Thinking about buying a home in Austin? Here\u2019s a quick gut check. \u2705\n\n"
            "You\u2019re ready if:\n"
            "1\uFE0F\u20E3 You know what you can actually afford (not a guess \u2014 a real number)\n"
            "2\uFE0F\u20E3 You have some money saved (you might need less than you think)\n"
            "3\uFE0F\u20E3 You have someone in your corner who picks up the phone\n\n"
            "I wrote a free 12-section guide covering everything from "
            "down payments to seller concessions to Texas-specific programs.\n\n"
            "No fluff. No sales pitch. Just the truth about buying in Austin.\n\n"
            "\U0001F449 Download free: {url}\n\n"
            "#AustinHomeBuyer #FirstTimeHomeBuyer #AustinTX "
            "#HomeBuyingGuide #RealEstateTips #MortgageAdvice"
        ),
    },
]


# ─── Canva API ────────────────────────────────────────────

def canva_headers():
    return {
        "Authorization": f"Bearer {CANVA_API_TOKEN}",
        "Content-Type": "application/json",
    }


def create_canva_design(post: dict) -> dict:
    """
    Create a Canva design from a brand template with text autofill.

    Uses the Canva Connect API autofill endpoint to generate a
    branded graphic from a template, replacing placeholder text
    fields with the post's headline, subtext, and CTA.

    Returns the design metadata including design_id and URLs.
    """
    print(f"  [Canva] Creating design: {post['id']}...")

    payload = {
        "brand_template_id": CANVA_BRAND_TEMPLATE_ID,
        "title": f"FTHB Campaign — {post['id']}",
        "data": {
            # These keys must match your Canva template's
            # autofill text placeholders. Update if your
            # template uses different placeholder names.
            "headline": {"type": "text", "text": post["headline"]},
            "subtext":  {"type": "text", "text": post["subtext"]},
            "cta":      {"type": "text", "text": post["cta"]},
        },
    }

    resp = requests.post(
        f"{CANVA_BASE_URL}/autofills",
        headers=canva_headers(),
        json=payload,
    )
    resp.raise_for_status()
    job = resp.json()["job"]

    # Poll until autofill job completes
    design = poll_canva_job(job["id"])
    print(f"  [Canva] Design created: {design['design']['id']}")
    return design


def poll_canva_job(job_id: str, timeout: int = 60) -> dict:
    """Poll a Canva autofill job until it completes or times out."""
    start = time.time()
    while time.time() - start < timeout:
        resp = requests.get(
            f"{CANVA_BASE_URL}/autofills/{job_id}",
            headers=canva_headers(),
        )
        resp.raise_for_status()
        job = resp.json()["job"]

        if job["status"] == "success":
            return job["result"]
        elif job["status"] == "failed":
            raise RuntimeError(f"Canva autofill failed: {job}")

        time.sleep(2)

    raise TimeoutError(f"Canva job {job_id} timed out after {timeout}s")


def export_canva_design(design_id: str) -> str:
    """
    Export a Canva design as a PNG and return the download URL.

    Triggers an export job, polls until complete, then returns
    the temporary download URL for the exported image.
    """
    print(f"  [Canva] Exporting design {design_id} as PNG...")

    payload = {
        "design_id": design_id,
        "format": {"type": "png", "width": 1080, "height": 1080},
    }

    resp = requests.post(
        f"{CANVA_BASE_URL}/exports",
        headers=canva_headers(),
        json=payload,
    )
    resp.raise_for_status()
    job = resp.json()["job"]

    # Poll until export completes
    start = time.time()
    while time.time() - start < 60:
        resp = requests.get(
            f"{CANVA_BASE_URL}/exports/{job['id']}",
            headers=canva_headers(),
        )
        resp.raise_for_status()
        job_data = resp.json()["job"]

        if job_data["status"] == "success":
            url = job_data["result"]["urls"][0]
            print(f"  [Canva] Export ready: {url[:80]}...")
            return url
        elif job_data["status"] == "failed":
            raise RuntimeError(f"Canva export failed: {job_data}")

        time.sleep(2)

    raise TimeoutError(f"Canva export timed out for design {design_id}")


def download_image(url: str, filename: str) -> str:
    """Download an image from a URL to a local file."""
    print(f"  [Download] Saving {filename}...")
    resp = requests.get(url)
    resp.raise_for_status()

    filepath = os.path.join("social_images", filename)
    os.makedirs("social_images", exist_ok=True)

    with open(filepath, "wb") as f:
        f.write(resp.content)

    print(f"  [Download] Saved: {filepath} ({len(resp.content):,} bytes)")
    return filepath


# ─── Buffer API ───────────────────────────────────────────

def buffer_headers():
    return {
        "Authorization": f"Bearer {BUFFER_ACCESS_TOKEN}",
        "Content-Type": "application/x-www-form-urlencoded",
    }


def upload_to_buffer(image_path: str) -> str:
    """
    Upload an image to Buffer's media endpoint.
    Returns the media thumbnail/upload object for use in create_update.
    """
    print(f"  [Buffer] Uploading {image_path}...")

    with open(image_path, "rb") as img:
        resp = requests.post(
            f"{BUFFER_BASE_URL}/media/upload.json",
            headers={"Authorization": f"Bearer {BUFFER_ACCESS_TOKEN}"},
            files={"media": img},
            data={"profile_id": BUFFER_PROFILE_ID},
        )
    resp.raise_for_status()
    media = resp.json()
    print(f"  [Buffer] Upload complete.")
    return media


def create_buffer_draft(caption: str, media: dict) -> dict:
    """
    Create a Buffer draft (not immediately scheduled).

    The post is saved as a draft so Adam can review and approve
    timing before it goes live. No posts are auto-published.
    """
    print(f"  [Buffer] Creating draft...")

    payload = {
        "text": caption,
        "profile_ids[]": BUFFER_PROFILE_ID,
        "media[thumbnail]": media.get("thumbnail", ""),
        "media[photo]": media.get("uploaded", {}).get("photo", ""),
        "draft": "true",  # <-- DRAFT MODE: requires manual approval
    }

    resp = requests.post(
        f"{BUFFER_BASE_URL}/updates/create.json",
        headers={"Authorization": f"Bearer {BUFFER_ACCESS_TOKEN}"},
        data=payload,
    )
    resp.raise_for_status()
    update = resp.json()
    print(f"  [Buffer] Draft created: {update.get('updates', [{}])[0].get('id', 'N/A')}")
    return update


# ─── Main Pipeline ────────────────────────────────────────

def validate_env():
    """Check that all required environment variables are set."""
    required = [
        "CANVA_API_TOKEN",
        "CANVA_BRAND_TEMPLATE_ID",
        "BUFFER_ACCESS_TOKEN",
        "BUFFER_PROFILE_ID",
    ]
    missing = [var for var in required if not os.getenv(var)]
    if missing:
        print("ERROR: Missing required environment variables:")
        for var in missing:
            print(f"  - {var}")
        print("\nCreate a .env file with these values. See script header for details.")
        sys.exit(1)


def run():
    """
    Full pipeline:
    1. Create 3 branded Canva designs from template
    2. Export each as 1080x1080 PNG
    3. Upload to Buffer
    4. Create Buffer drafts with pre-written captions
    """
    validate_env()

    print("=" * 60)
    print("FIRST-TIME HOMEBUYER — SOCIAL MEDIA AUTOMATION")
    print("=" * 60)
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Posts to create: {len(POSTS)}")
    print(f"Landing page: {LANDING_PAGE_URL}")
    print()

    results = []

    for i, post in enumerate(POSTS, 1):
        print(f"\n{'─' * 50}")
        print(f"POST {i}/{len(POSTS)}: {post['id']}")
        print(f"{'─' * 50}")

        try:
            # Step 1: Create Canva design from template
            design_result = create_canva_design(post)
            design_id = design_result["design"]["id"]

            # Step 2: Export as PNG
            image_url = export_canva_design(design_id)

            # Step 3: Download locally
            image_path = download_image(image_url, f"{post['id']}.png")

            # Step 4: Upload to Buffer
            media = upload_to_buffer(image_path)

            # Step 5: Create Buffer draft with caption
            caption = post["caption"].format(url=LANDING_PAGE_URL)
            draft = create_buffer_draft(caption, media)

            results.append({
                "post_id": post["id"],
                "status": "success",
                "canva_design_id": design_id,
                "image_path": image_path,
                "buffer_draft_id": draft.get("updates", [{}])[0].get("id"),
            })
            print(f"\n  ✓ {post['id']} — DONE")

        except Exception as e:
            print(f"\n  ✗ {post['id']} — FAILED: {e}")
            results.append({
                "post_id": post["id"],
                "status": "failed",
                "error": str(e),
            })

    # ─── Summary ──────────────────────────────────────────

    print(f"\n\n{'=' * 60}")
    print("RESULTS SUMMARY")
    print(f"{'=' * 60}")

    success = [r for r in results if r["status"] == "success"]
    failed = [r for r in results if r["status"] == "failed"]

    print(f"  Succeeded: {len(success)}/{len(POSTS)}")
    print(f"  Failed:    {len(failed)}/{len(POSTS)}")

    if success:
        print(f"\n  Canva designs created:")
        for r in success:
            print(f"    - {r['post_id']}: {r['canva_design_id']}")

        print(f"\n  Buffer drafts (review in Buffer dashboard):")
        for r in success:
            print(f"    - {r['post_id']}: {r['buffer_draft_id']}")

        print(f"\n  Local images saved to: ./social_images/")

    if failed:
        print(f"\n  Errors:")
        for r in failed:
            print(f"    - {r['post_id']}: {r['error']}")

    print(f"\nCompleted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"\nNEXT STEPS:")
    print(f"  1. Open Buffer dashboard and review the 3 drafts")
    print(f"  2. Set your preferred publish dates/times")
    print(f"  3. Approve each draft to schedule it")
    print()


if __name__ == "__main__":
    run()
