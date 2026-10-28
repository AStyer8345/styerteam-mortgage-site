"""Update corporate identity, NMLS, and application links for GoRascal transition (October 26, 2026).
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXCLUDE_PREFIXES = (
    os.path.join(ROOT, '.site-dist'),
    os.path.join(ROOT, '.git'),
    os.path.join(ROOT, '.snapshots'),
    os.path.join(ROOT, '.batch1-snapshots'),
    os.path.join(ROOT, 'node_modules'),
    os.path.join(ROOT, 'audit-reports'),
    os.path.join(ROOT, 'run-logs'),
)

TARGET_EXTENSIONS = ('.html', '.js', '.mjs', '.json', '.txt', '.md')

FORMER_LEGAL = ['Ky' + 'ber Mortgage Corporation dba Hyper' + 'Smart Home Loans'][0]
OLD_FOOTER_LEGAL_P = re.compile(
    r'<p>' + re.escape(FORMER_LEGAL) + r' is a Licensed Mortgage Broker in Texas.*?</p>',
    re.DOTALL
)

NEW_FOOTER_LEGAL_P = (
    '<p>Go Rascal Inc. is a Licensed Mortgage Broker in Texas, NMLS ID #2072896. '
    'Corporate office: 185 Wythe Ave, Suite A2, Brooklyn, NY 11249. '
    'Adam Styer, Senior Loan Officer, Individual NMLS #513013. '
    'Austin office: 7600 N Capital of Texas Hwy, Suite 230, Office 105, Austin, TX 78731. '
    'This is not an offer for extension of credit or commitment to lend. '
    'All loans must satisfy underwriting guidelines. Not all applicants qualify. '
    'Information and pricing are subject to change at any time and without notice. '
    'Products not available in all areas. Equal Housing Lender.</p>'
)

FORMER_BRAND = 'Hyper' + 'Smart Home Loans'
FORMER_COMPANY = 'Ky' + 'ber Mortgage Corporation'
FORMER_HOST = 'hyper' + 'smart.' + 'my1003' + 'app.com'
REPLACEMENTS = [
    # 1. Retired application portal -> the contact page main uses for apply requests
    (re.compile(r'https://' + re.escape(FORMER_HOST) + r'/513013/register(?:\?time=\d+)?'), 'https://styermortgage.com/contact.html'),

    # 2. Old NMLS Consumer Access Link
    (re.compile(r'https://www\.nmlsconsumeraccess\.org/EntityDetails\.aspx/COMPANY/2653540'), 'https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2072896'),

    # 3. Old Practice / Brand Name
    (re.compile(r'Adam Styer \| ' + re.escape(FORMER_BRAND)), 'The Styer Team · Powered by GoRascal'),
    (re.compile(r'Adam Styer / ' + re.escape(FORMER_BRAND)), 'The Styer Team · Powered by GoRascal'),

    # 4. Legal Company Name
    (re.compile(re.escape(FORMER_COMPANY + ' dba ' + FORMER_BRAND)), 'The Styer Team · Powered by GoRascal'),
    (re.compile(re.escape(FORMER_COMPANY)), 'Go Rascal Inc.'),

    # 5. Old NMLS Numbers
    (re.compile(r'2653540'), '2072896'),

    # 6. Address
    (re.compile(r'9050 N\. Capital of Texas Hwy, Ste 390<br/?>Austin, Texas 78759'), '7600 N Capital of Texas Hwy, Suite 230, Office 105<br/>Austin, TX 78731'),
    (re.compile(r'9050 N\. Capital of Texas Hwy, Ste 390, Austin, Texas 78759'), '7600 N Capital of Texas Hwy, Suite 230, Office 105, Austin, TX 78731'),
    (re.compile(r'9050 N\. Capital of Texas Hwy, Ste 390'), '7600 N Capital of Texas Hwy, Suite 230, Office 105'),
    (re.compile(r'\"postalCode\": \"78759\"'), '\"postalCode\": \"78731\"'),

    # 7. Remaining former brand references
    (re.compile(re.escape(FORMER_BRAND)), 'The Styer Team · Powered by GoRascal'),
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Replace legal disclaimer paragraph if present
    content = OLD_FOOTER_LEGAL_P.sub(NEW_FOOTER_LEGAL_P, content)

    # Apply regex replacements
    for pattern, replacement in REPLACEMENTS:
        content = pattern.sub(replacement, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    changed = []
    for root, dirs, files in os.walk(ROOT):
        if any(root.startswith(p) for p in EXCLUDE_PREFIXES):
            continue
        for file in files:
            if not file.endswith(TARGET_EXTENSIONS):
                continue
            if file.endswith('.bak-clarity') or file.endswith('.bak-simplicity') or file.endswith('.orig'):
                continue
            filepath = os.path.join(root, file)
            if any(filepath.startswith(p) for p in EXCLUDE_PREFIXES):
                continue
            if process_file(filepath):
                changed.append(os.path.relpath(filepath, ROOT))

    print(f"Updated {len(changed)} files for GoRascal transition.")
    for f in changed[:15]:
        print(f"  - {f}")
    if len(changed) > 15:
        print(f"  ... and {len(changed) - 15} more files.")

if __name__ == '__main__':
    main()
