#!/usr/bin/env python3
"""One-off content pass, 2026-09-18: quotable openings, one collapsed
"What actually moves the file" block, and tightened FAQ answers on eight
pages. FAQ questions, headings, URLs and schema structure are unchanged;
FAQ answers are updated in both the visible markup and the FAQPage JSON-LD.
Run from the repo root. Safe to re-run: every edit asserts its anchor.
"""
import json, re, sys, html as H

TODAY_ISO = "2026-09-18"
TODAY_LONG = "September 18, 2026"

def esc(s):  # text -> HTML (keep our own <a> tags)
    out = H.escape(s, quote=False)
    return re.sub(r'&lt;a href=&quot;([^&]*)&quot;&gt;(.*?)&lt;/a&gt;', r'<a href="\1">\2</a>', out).replace('&lt;a href="','<a href="').replace('"&gt;','">').replace('&lt;/a&gt;','</a>')

def link(href, text):
    return f'<a href="{href}">{text}</a>'

def details(title, paras):
    body = ''.join(f'<p>{p}</p>' for p in paras)
    return f'\n<details class="advisory-inside"><summary>{title}</summary><div class="advisory-inside-body">{body}</div></details>\n'

def replace_once(h, old, new, label):
    if old not in h:
        sys.exit(f"ANCHOR MISSING [{label}]: {old[:90]}")
    if h.count(old) > 1:
        sys.exit(f"ANCHOR NOT UNIQUE [{label}]: {old[:90]}")
    return h.replace(old, new, 1)

def set_faq(h, question, answer_html, answer_text):
    """Update accordion/details answer + JSON-LD text for one question."""
    q_html = H.escape(question, quote=False)
    # 1. accordion-item form
    pat = re.compile(r'(<button class="accordion-button"[^>]*>\s*' + re.escape(q_html) + r'\s*</button>\s*<div class="accordion-content">)([\s\S]*?)(</div>)')
    m = pat.search(h)
    if m:
        h = h[:m.start(2)] + f'\n            <p>{answer_html}</p>\n          ' + h[m.end(2):]
    else:
        # 2. details form
        pat2 = re.compile(r'(<details class="ci-faq"><summary>' + re.escape(q_html) + r'</summary>)([\s\S]*?)(</details>)')
        m2 = pat2.search(h)
        if not m2:
            sys.exit(f"FAQ NOT FOUND: {question}")
        inner = m2.group(2)
        wrap = inner.strip().startswith('<div>')
        new_inner = f'<div><p>{answer_html}</p></div>' if wrap else f'<p>{answer_html}</p>'
        h = h[:m2.start(2)] + new_inner + h[m2.end(2):]
    # JSON-LD
    pat3 = re.compile(r'("name":\s*' + re.escape(json.dumps(question)) + r',\s*"acceptedAnswer":\s*\{\s*"@type":\s*"Answer",\s*"text":\s*)"(?:[^"\\]|\\.)*"')
    m3 = pat3.search(h)
    if not m3:
        print(f"  (no JSON-LD entry for: {question})")
        return h
    h = h[:m3.start()] + m3.group(1) + json.dumps(answer_text, ensure_ascii=False) + h[m3.end():]
    return h

def strip_tags(s):
    return H.unescape(re.sub(r'<[^>]+>', '', s))

def apply(path, edits, faqs, date_iso=None, date_long=None, old_iso=None, old_long=None):
    h = open(path, encoding='utf-8').read()
    for old, new, label in edits:
        h = replace_once(h, old, new, label)
    for q, a in faqs:
        h = set_faq(h, q, a, strip_tags(a))
    if old_iso:
        h = h.replace(f'"dateModified": "{old_iso}"', f'"dateModified": "{TODAY_ISO}"')
        h = h.replace(f'Updated {old_iso}', f'Updated {TODAY_ISO}')
    if old_long:
        h = h.replace(f'Updated {old_long}', f'Updated {TODAY_LONG}')
    open(path, 'w', encoding='utf-8').write(h)
    print('updated', path)

CASES = '/mortgage-case-studies-for-advisors-cpas.html'

# ───────────────────────── 1. P&L ─────────────────────────
pl_open = ('<p><strong>A P&amp;L-only mortgage qualifies you on a profit-and-loss statement prepared by an independent tax professional instead of tax returns or a bank-statement deposit review.</strong> '
 'The programs I place require a licensed CPA, an enrolled agent, or a CTEC-registered preparer who filed your most recent business return. '
 'The statement covers 12 or 24 months, not year-to-date alone, and must be signed within 60 to 90 days of closing. '
 'Minimum credit for a true P&amp;L-only file runs 700 to 720 across the programs I use; the 660 floor you see advertised belongs to the hybrid option that pairs the P&amp;L with two or three months of business bank statements. '
 'Maximum loan-to-value is 80% on a primary residence, 75% on a second home or investment property, and loan amounts cap at $1.5 million to $3 million by program. '
 'Two years of self-employment and at least 50% ownership of the business is the common requirement; one program accepts 12 months and 25%.</p>')
pl_inside = details('What actually moves the file', [
 'The P&amp;L number is only half the decision. The other half is which of two structures you choose. A P&amp;L with no bank statements gets you the cleanest documentation and the strictest terms: 700-plus credit, 80% maximum, and at some investors 70% on a refinance. Add two or three months of business statements and the same borrower unlocks the broader Non-QM matrix, but the deposits have to support the P&amp;L: one program requires eligible deposits of at least 80% of P&amp;L gross revenue, another wants them within 10%. When the deposits don&rsquo;t match, the lower number wins.',
 f'So before the CPA writes anything, I look at the bank statements, because they decide which structure is even available. The {link(CASES, "Westlake file on the case-studies page")} is the example: an S-corp owner declined by three banks on tax-return income, closed at $1.2 million on a 24-month deposit review with a documented expense analysis. The P&amp;L route was the alternative I priced against it, and the deposits decided which one won.'])
pl_edits = [
 ('<p><strong>A P&amp;L only mortgage lets self-employed Texans qualify for a home loan using a CPA-prepared (or EA/licensed preparer) profit and loss statement instead of tax returns or 12–24 months of bank statements.</strong> I close these for sole proprietors, single-member LLCs, and S-corp owners across Texas, with loan amounts up to $2.5M, credit scores starting at 660, and access to wholesale Non-QM lenders running both pure-P&amp;L and hybrid P&amp;L + bank statement programs.</p>',
  pl_open + pl_inside, 'pl opening'),
 ('<p>Most lenders also want 2–3 months of bank statements alongside the P&amp;L — not to do bank statement math, but to confirm the P&amp;L isn\'t fiction. The standard tolerance is roughly ±25% between P&amp;L revenue and bank deposits over the same period. At lower LTV tiers (under 70%), some programs don\'t require the bank statements at all, but most lenders still ask for them.</p>',
  '<p>The hybrid programs I place pair the P&amp;L with two or three months of business bank statements, not to do bank-statement math but to confirm the revenue is real. One program requires eligible deposits of at least 80% of the P&amp;L&rsquo;s gross monthly revenue; another requires revenue and deposits within 10% of each other. If the deposits fall short, the lender qualifies you on the deposits. A true P&amp;L-only program skips the statements and caps leverage at 80% instead.</p>', 'pl sanity check'),
]
pl_faqs = [
 ('Who can prepare the P&L?', 'A licensed CPA, an IRS enrolled agent, or a CTEC-registered tax preparer, and that person must have prepared or reviewed your most recent business tax return. The preparer signs the statement on letterhead with their license or PTIN number, and you sign it too.'),
 ("What's a hybrid P&L program?", 'A hybrid pairs the P&amp;L with two or three months of business bank statements, and the deposits have to corroborate the revenue. One program requires eligible deposits of at least 80% of the P&amp;L&rsquo;s gross monthly revenue; another requires revenue and deposits within 10% of each other. If deposits fall short, the lender qualifies you on the deposits. The hybrid is what opens leverage above the P&amp;L-only caps.'),
 ('Does the P&L need YTD coverage?', 'The statement must cover a full 12 or 24 months and be prepared or signed within 60 to 90 days of closing, depending on the program. A year-to-date statement alone does not satisfy a P&amp;L-only program. Where the P&amp;L is more than 90 days old at closing, the preparer re-issues it.'),
 ('What credit score and down payment do I need?', 'P&amp;L-only: 700 to 720 minimum credit across the programs I place, 80% maximum loan-to-value on a primary residence (20% down), 75% on a second home or investment property, and cash-out capped at 70% to 75%. Loan amounts cap at $1.5 million on most P&amp;L-only options and up to $3 million on one. Reserves start at 6 months of the housing payment and step to 9 months above $1 million to $2 million and 12 months above $2 million to $2.5 million.'),
 ('What about partnerships and multi-member LLCs?', 'Most P&amp;L-only programs require at least 50% ownership; one accepts 25%. The P&amp;L is for the whole business and your ownership percentage is applied to the net income. Below 50%, a K-1 analysis on conventional financing is usually the stronger path, and I model both.'),
]
apply('p-and-l-mortgage-texas.html', pl_edits, pl_faqs, old_iso='2026-05-17')

# ───────────────────────── 2. Bank statement ─────────────────────────
bs_open = ('<p class="ci-lead">A bank statement loan qualifies you on 12 or 24 months of deposits instead of the income on your tax returns. '
 'Business deposits are reduced for operating expenses before they count: the default expense factor is 50%, and a P&amp;L or expense letter from an independent tax professional can lower it to a floor of 10% to 15% depending on the program. '
 'Several programs use a schedule instead of the flat 50%: 15%, 30% or 50% for a service business with zero, one-to-five, or more than five employees; 25%, 50% or 80% to 85% for a product business. '
 'Deposits into a personal account from a separately documented business account count at 100%; a commingled account is treated as a business account. '
 'Transfers between your own accounts, loan proceeds and refunds are excluded before any factor is applied. '
 'Primary-residence purchases go to 90% loan-to-value on the strongest files, 80% on cash-out, with loan amounts to $3 million to $4 million and minimum credit of 620 to 660 at reduced leverage.</p>')
bs_inside = details('What actually moves the file', [
 'The expense factor is the whole game, and it is negotiable with paper. A consultant with no employees and no office is a 15% expense business, not a 50% one; on $400,000 of deposits that is the difference between $28,000 and $17,000 of monthly qualifying income. The letter that proves it has to come from the preparer who filed the return, has to address every expense category, and cannot disclaim its own accuracy.',
 'The second lever is the account. Business receipts landing in a personal account count in full only when two or three months of the business account prove the money originated there; if the accounts are mixed, the business factor applies to everything. I sort the accounts and the expense evidence before I pick the program, because the program with the best rate and the program with the best income calculation are rarely the same one.',
 f'The refinance in {link("/scenarios/self-employed-refinance-deposit-review.html", "Which deposits count as income?")} shows the other side: the underwriter excluded a large payment described as a bonus even though it was reported on the borrower&rsquo;s 1099, and the income dropped enough to move the debt ratio. The fix was documenting the payer and the compensation history, not arguing about the factor.'])
bs_edits = [
 ('<p class="ci-lead">A bank statement loan uses eligible personal or business deposits as the primary evidence for a self-employed income calculation. It may help when a tax-return calculation does not support the financing goal. The lender still reviews income stability, credit, debts, funds and the property.</p>',
  bs_open + bs_inside, 'bs opening'),
]
bs_faqs = [
 ('Does every deposit count as income?', 'No. Transfers between your own accounts, borrowed funds, refunds and one-off deposits without a documented business source are removed first. Then the expense factor is applied to what remains: 50% by default on business deposits, lower with a qualified expense letter, or a 15% to 85% schedule based on business type and headcount. Deposits larger than a month&rsquo;s qualifying income get a written explanation.'),
 ('Can I use personal statements instead of business statements?', 'Yes, and deposits that came from a separately documented business account count at 100% with no expense reduction. The lender needs two or three months of the business account to prove the source. If business receipts and personal money share one account, the account is treated as a business account and the expense factor applies. Ownership requirements differ too: 25% for the personal-statement method, 50% for the business-statement method at several programs.'),
 ('Does a 12-month program mean I only need one year in business?', 'No. The programs I place require two years of self-employment; the statement period is separate. One program will look at an additional 12 months of statements when the first 12 don&rsquo;t establish stability.'),
 ('When a P&L or expense statement is relevant', 'An expense statement from an independent CPA, enrolled agent or CTEC preparer replaces the default factor with your actual ratio, subject to a floor of 10% to 15%. It has to be prepared by the person who filed your returns, address all expenses, and carry no disclaimer. A letter that says &ldquo;approximately&rdquo; or &ldquo;to the best of my knowledge&rdquo; gets rejected.'),
]
apply('bank-statement-loans.html', bs_edits, bs_faqs, old_iso='2026-09-17', old_long='September 17, 2026')

# ───────────────────────── 3. Asset depletion ─────────────────────────
ad_open = ('<p class="ci-lead">Asset depletion converts what you own into monthly qualifying income. Depending on the program, eligible assets are divided by 36, 60 or 84 months; the programs I use most divide by 60 or 84, and one uses 36 when your other income already carries most of the payment. '
 'Cash counts at 100%. Stocks, bonds and mutual funds count at 80% to 90%. Retirement accounts count at 70%, or 80% to 90% once you are past 59&frac12; and can access the funds. '
 'Required closing funds and reserves come off the top before the division. Accounts need 4 to 6 months of history, and business assets do not count. '
 'Minimum credit runs 640 to 700, maximum loan-to-value 80% to 85% on a primary residence, and loan amounts reach $3 million. '
 'Some programs let asset income supplement wages or rent; others require assets to be the only income source. I match the program to your income mix before I run a single calculation.</p>')
ad_inside = details('From a real file', [
 'On a $3 million purchase at 90% loan-to-value, qualified entirely on assets, one investor offered the same borrower two structures. The first had a lower rate and required 12 months of the full housing payment in reserves after closing. The second had a higher rate and required 6. A borrower who wants to keep liquidity in the business takes the second and pays for it in rate; a borrower with the cash parked takes the first. That trade, rate against reserves, is the lever I work on nearly every asset file, and it never appears on a published matrix.',
 'The divisor question is the same kind of choice: a 60-month program produces 40% more monthly income from the same balance than an 84-month program, but it usually comes with a lower loan cap and a higher minimum score. Neither is better. One fits your file.',
 f'Three closed files on this site show the range: the {link("/scenarios/oil-gas-royalty-asset-depletion.html", "oil-and-gas royalty borrower")} declined by two banks on income continuance and closed on assets; the {link("/blog/2026-08-06-asset-depletion-loan-case-study-former-cfo.html", "former CFO on sabbatical")} with no W-2 at all; and the {link("/blog/2026-08-21-veteran-asset-depletion-mortgage-case-study.html", "veteran between jobs")} whose Roth IRA counted under 59&frac12; and produced roughly $28,500 a month of calculated income alongside military pay.'])
ad_edits = [
 ('<p class="ci-lead">An asset depletion mortgage uses eligible savings and investments to calculate income for mortgage qualification. It may replace or supplement the recurring income used to evaluate your loan.</p>',
  ad_open + ad_inside, 'ad opening'),
]
ad_faqs = [
 ('Can I qualify before age 62?', 'Yes. Age is not a requirement for the asset programs I place. What age changes is the retirement-account haircut: under 59&frac12; those accounts count at 70%; at 59&frac12; and above, 80% to 90%, because the funds are accessible without penalty.'),
 ('Can I use retirement accounts?', 'Yes, at 70% of the balance under 59&frac12; and 80% to 90% once you are past 59&frac12;, on the programs I use. The account must be vested and in your name, seasoned 4 to 6 months, and any balance already producing income you are also using to qualify cannot be counted twice.'),
 ('How much do I need for a down payment?', '15% to 20% on a primary residence: the asset programs I place cap at 80% to 85% loan-to-value, with the higher cap requiring 640-plus credit and a maximum 50% debt-to-income after the asset income is added. Cash-out is capped lower, at 75%, and two programs allow no cash-out at all on asset-qualified files. Your down payment, closing costs and required reserves are deducted before the remaining assets are divided into income.'),
 ('Can asset depletion supplement my existing income?', 'On some programs yes, on others no, and the answer decides which one you get. Two programs I place treat asset income as supplemental to wages, self-employment or rental income and divide by 36 or 60. Two others require assets to be the primary or only source and disallow employment income alongside it. The asset balance and the income it already produces are never both counted.'),
]
apply('asset-depletion-mortgage-texas.html', ad_edits, ad_faqs, old_iso='2026-09-17', old_long='September 17, 2026')

# ───────────────────────── 4. High net worth ─────────────────────────
hnw_open = ('<p class="ci-lead">A high-net-worth mortgage is a comparison, not a product, and the comparison is usually between three ways to document the same balance sheet. '
 'Asset depletion turns eligible assets into income by dividing by 36, 60 or 84 months, depending on the program. Asset utilization is a coverage test instead: assets have to equal the loan balance plus closing costs plus 60 months of your other obligations, and there is no debt-to-income calculation at all. Bank-statement and P&amp;L programs document business cash flow for owners whose returns understate it. '
 'On the largest loans, the programs I place reach $4 million to $5 million on a primary residence, at 55% to 65% loan-to-value and 720 to 740 credit. Reserves scale with size: 6 months of the housing payment through $1 million to $2 million, 9 months to $2.5 million, 12 months to $3.5 million, and 18 months above $4 million. '
 'Interest-only is available on 30- and 40-year terms with a 10-year interest-only period, capped at 75% to 85% loan-to-value and 680 to 700 credit.</p>')
hnw_inside = details('What actually moves the file', [
 'The labels lie. One investor&rsquo;s &ldquo;asset depletion&rdquo; is a monthly-income calculation; another&rsquo;s &ldquo;asset depletion&rdquo; is a balance-coverage test with no income figure at all, and its &ldquo;asset utilization&rdquo; is the income method. I ignore the name and run the arithmetic each program actually uses, because the same $4 million portfolio qualifies for very different loan amounts under each.',
 'The second lever is reserves at size. A $3.5 million loan carries 12 months of reserves on the programs I place; that is often $250,000 of liquidity that has to sit untouched after closing, and it is the number that surprises borrowers who assumed a large balance sheet made reserves irrelevant. On a recent $3 million file at 90% loan-to-value, the same investor priced 12 months of reserves at a lower rate and 6 months at a higher one. Which structure you take is a liquidity decision, not a credit decision.',
 f'The {link("/blog/2026-08-06-asset-depletion-loan-case-study-former-cfo.html", "former CFO on sabbatical")} is the closed example of the asset route with zero W-2 income.'])
hnw_edits = [
 ('<p class="ci-lead">High-net-worth mortgage planning is a comparison of financing approaches, not one loan type. The right starting point depends on the income you can document, assets you can use, and obligations you are comfortable accepting.</p>',
  hnw_open + hnw_inside, 'hnw opening'),
]
hnw_faqs = [
 ('I just sold my company. How do I qualify for a mortgage with no W-2?', 'On the sale proceeds, once they have seasoned 4 to 6 months in your account. The programs I place convert eligible assets to income by dividing by 36, 60 or 84 months, or test whether assets cover the loan balance plus 60 months of your other obligations. Cash counts at 100%, marketable securities at 80% to 90%. Business assets, restricted stock and funds still inside the sold entity do not count until they are in your name.'),
 ('Do I have to move or pledge my brokerage assets?', 'Not on the Non-QM asset programs I place: they verify balances, they do not take a lien or require a transfer. A bank&rsquo;s relationship-pricing offer is a different product that may require moving accounts or pledging them as collateral. I put both on the table with the conditions spelled out, because a 25-basis-point discount tied to a $2 million transfer is not always the cheaper loan.'),
 ('Is a high-net-worth mortgage always a Non-QM loan?', 'No. A conforming loan up to $832,750 in the Austin-area counties, or an agency-eligible jumbo above it, fits when documented income supports the payment, and it will price better. Non-QM enters when the income is on the balance sheet instead of the tax return. I run both when the file allows it.'),
]
apply('high-net-worth-mortgage.html', hnw_edits, hnw_faqs, old_iso='2026-09-17', old_long='September 17, 2026')

# ───────────────────────── 5. Jumbo post ─────────────────────────
jumbo_new = ('<p>For 2026, FHFA&rsquo;s one-unit conforming limit is $832,750 in every Austin-area county, because none of them is a high-cost county. FHFA will not publish the 2027 limit until late November, but several large lenders have already raised their internal conforming ceiling to $845,000 to $850,000 in anticipation, and I can place loans in that band on conforming pricing today rather than waiting. '
 'Above the line there is no agency rulebook, so the requirements are set by each investor, and on the Non-QM jumbo programs I place they are these: minimum credit of 660 at reduced leverage and 720 to 740 at the top of the loan range; loan-to-value up to 90% on a primary-residence purchase through roughly $1 million to $2 million on 720-plus credit, stepping down to 55% to 65% at $4 million to $5 million; reserves of 6 months of the housing payment through $1 million to $2 million, 9 months to $2.5 million, 12 months to $3.5 million, and 18 months above $4 million. '
 'Self-employed borrowers qualify on full tax returns, on 12 or 24 months of bank statements, on a P&amp;L, or on assets, and the documentation type changes the caps.</p>')
jumbo_inside = details('What actually moves the file', [
 'The matrix has three edges, lowest score, highest loan-to-value, largest loan, and no file gets all three. A 660 score is real, but it lives in the 65% column. A 90% purchase is real, but it lives in the sub-$2 million, 720-plus cell. A $5 million loan is real, at 55% to 65% and 740. When a national article says &ldquo;jumbo loans require 680, 10 to 20 percent down and 6 to 12 months of reserves,&rdquo; it is describing three different borrowers.',
 f'The lever I actually work is documentation type: the same borrower at $1.5 million may cap at 80% on a P&amp;L-only program and reach 90% on a bank-statement program, at a different rate, with a different reserve requirement. Reserves are the second surprise: 12 months at $3 million is a real cash requirement after closing, not a formality. The {link(CASES, "$1.2 million Westlake purchase")} went through on bank statements after three bank declines on tax returns; the same borrower on a P&amp;L-only program would have capped at 80% and $1.5 million.'])
jumbo_old = ('<p>Here\'s the piece almost every national article gets wrong about this market. FHFA assigns higher limits to designated high-cost counties, up to a ceiling of $1,249,125. <strong>Travis County is not one of them.</strong> Neither is Williamson, Hays, Bastrop, or Caldwell &mdash; all five Austin-area counties sit at the baseline. So the "high-balance conforming" product that buyers in coastal metros use as a bridge between conforming and jumbo simply does not exist here.</p>')
jumbo_edits = [(jumbo_old, jumbo_new + jumbo_inside + jumbo_old, 'jumbo opening')]
jumbo_faqs = [
 ('What is the jumbo loan limit in Austin, Texas for 2026?', 'FHFA&rsquo;s 2026 one-unit limit is $832,750 in Travis, Williamson, Hays, Bastrop and Caldwell counties; none is a high-cost county, so there is no high-balance step. That line is moving early: ahead of FHFA&rsquo;s November announcement of the 2027 figure, several lenders have raised their internal conforming ceiling to $845,000 to $850,000, and I can place a loan between $832,750 and that ceiling on conforming pricing now instead of as a jumbo.'),
 ('Is a jumbo loan harder to qualify for than a conforming loan?', 'Not harder, but not standardized, and the numbers are wider apart than most articles admit. On the programs I place, minimum credit runs from 660 at 65% loan-to-value to 740 at the largest loan amounts; maximum loan-to-value runs from 90% on a sub-$2 million primary purchase to 55% at $5 million. Two lenders will give the same file different answers because they are reading different cells.'),
 ('Can a self-employed borrower get a jumbo loan in Texas?', 'Yes, four ways. Full documentation on two years of tax returns with a Fannie-style cash-flow analysis. Bank statements, 12 or 24 months, with a 50% default expense factor or a documented one. A CPA-prepared P&amp;L, capped at 80% loan-to-value and $1.5 million to $3 million by program. Or assets, divided by 36 to 84 months. I have closed jumbo files on every one of them, and the documentation choice moves the cap more than the credit score does.'),
 ('How much do I need in reserves for a jumbo loan?', 'On the programs I place: 6 months of the full housing payment through $1 million to $2 million depending on the investor, 9 months to $2.5 million, 12 months to $3.5 million, and 18 months from $4 million to $5 million. Add 2 months per additional financed property at some investors, and 24 months on certain interest-only structures. Reserves are counted after your down payment and closing costs, and retirement accounts count at a discount.'),
]
apply('blog/2026-08-18-jumbo-loan-requirements-texas-2026.html', jumbo_edits, jumbo_faqs, old_iso='2026-08-18')

# ───────────────────────── 6. K-1 ─────────────────────────
k1_open = ('<p><strong>A K-1 income mortgage qualifies you on your share of a partnership&rsquo;s or S-corporation&rsquo;s income.</strong> The threshold that decides everything is 25% ownership: at 25% or more, Fannie Mae treats you as self-employed and the lender runs the business&rsquo;s cash flow through <a href="https://www.irs.gov/forms-pubs/about-form-1065" target="_blank" rel="noopener">Form 1065</a> or <a href="https://www.irs.gov/forms-pubs/about-form-1120-s" target="_blank" rel="noopener">Form 1120-S</a> returns and Form 1084, reviews the business returns, and tests whether the business could actually pay you the income, a current ratio or quick ratio of 1.0 or better. Below 25%, you document two years of personal returns and the K-1 and the business&rsquo;s books stay closed. '
 'Distributions are evidence, not income; the starting figure is your share of ordinary business income, and counting both is double counting. '
 'When the K-1 is thin because of depreciation or a leveraged operating company, the Non-QM programs I place have their own thresholds that are stricter than Fannie&rsquo;s: a P&amp;L-only file requires 50% ownership at most investors, and a business-bank-statement file requires 50% at several. That gap between 25% and 50% is where most K-1 files get routed.</p>')
k1_inside = details('What actually moves the file', [
 'The liquidity test kills more K-1 files than the income does. A partner with $400,000 of ordinary income and $150,000 of distributions has to show the business holds enough current assets to have paid the other $250,000; if the balance sheet says otherwise, the lender uses the distributions. The fix is not a different lender, it is a different document set.',
 f'On the Non-QM side, the same borrower qualifies on 12 or 24 months of bank statements at a 50% default expense factor, or on a CPA P&amp;L at 700-plus credit and 80% loan-to-value, or on assets divided by 36 to 84 months. Each one has an ownership floor, 25% for personal bank statements, 50% for business statements and P&amp;L, so a 30% partner has two of those doors, not three. I model agency and Non-QM side by side before the first document request. The S-corp owner in the {link(CASES, "Westlake case study")} is the pattern: write-offs pushed the ordinary income below what the house needed, and a 24-month business-statement review at 100% ownership was the door that opened.'])
k1_old = ('<p><strong>A K-1 income mortgage is a conventional, jumbo, or non-QM mortgage where the borrower\'s qualifying income comes from a Schedule K-1 issued by a partnership (<a href="https://www.irs.gov/forms-pubs/about-form-1065" target="_blank" rel="noopener">Form 1065</a>) or S-corporation (<a href="https://www.irs.gov/forms-pubs/about-form-1120-s" target="_blank" rel="noopener">Form 1120-S</a>).</strong> The math runs through Fannie Mae Form 1084, the cash-flow analysis worksheet underwriters use to translate tax-return income into qualifying income. Two variables drive everything: your ownership percentage in the entity, and whether the business has enough liquidity to support paying you.</p>')
k1_edits = [(k1_old, k1_open + k1_inside, 'k1 opening')]
k1_faqs = [
 ('When should I go non-QM instead of agency on K-1 income?', 'When the business fails the liquidity test, when depreciation buried the ordinary income, when the two-year trend is down more than 5%, or when the assets are strong and the returns are messy. The Non-QM programs I place qualify on 12 or 24 months of bank statements at a 50% default expense factor (lower with a qualified expense letter), on a CPA P&amp;L at 700-plus credit and 80% loan-to-value, or on assets divided by 36 to 84 months. Ownership floors are higher than Fannie&rsquo;s 25%: 50% for P&amp;L and business-bank-statement methods at most investors, 25% for the personal-statement method. The rate premium is real; the loan amount usually is not available any other way.'),
 ('How many years of K-1s do I need?', 'Two years of personal returns with all K-1s, and two years of the business return at 25% or more ownership. One year is possible when the income is stable and the profile is strong. Where the second year is more than 5% lower than the first, the lower year is the qualifying figure and the drop needs a documented explanation.'),
]
apply('k1-income-mortgage-austin.html', k1_edits, k1_faqs, old_iso='2026-08-14')

# ───────────────────────── 7. DSCR post ─────────────────────────
dscr_open = ('<p>DSCR stands for debt service coverage ratio: the property&rsquo;s gross rent divided by its full payment, principal, interest, taxes, insurance and association dues. A ratio of 1.00 means rent exactly covers the payment. '
 'Every program I place has a floor of 0.75, and most price their best terms at 1.00 or above. Below 0.75 you need a no-ratio program, which exists at three of my investors with a 680 to 700 minimum score, loan amounts capped at $1.5 million to $3 million, and no interest-only. Short-term rentals carry a higher floor of 1.00 to 1.15 and a 5-point leverage reduction. '
 'Maximum loan-to-value runs 80% to 85% on a purchase and 75% to 80% on cash-out for a 1.00-plus ratio with 700-plus credit; minimum credit is 620 to 660 at reduced leverage, 680 when the ratio is under 1.00. '
 'Reserves run 3 months of the payment under $500,000 to $1 million, 6 months to $2 million, and 12 months above $2 million or whenever the ratio is below 1.00. Loan amounts reach $2 million to $3 million per property.</p>')
dscr_inside = details('What actually moves the file', [
 'Two things move a DSCR file that investors don&rsquo;t expect. First, the rent figure on a short-term rental is not your Airbnb history. On a purchase, the programs I place use the appraiser&rsquo;s rent analysis, which can incorporate a market-data report; on a refinance, they want 12 months of actual receipts from a management platform, and they haircut STR rent 20% at some investors.',
 f'Second, the ratio and the leverage trade against each other. A 0.90 ratio at 75% loan-to-value and a 1.10 ratio at 80% can be the same property at two purchase prices; the second usually prices better and needs half the reserves. When an investor asks me &ldquo;do I qualify,&rdquo; the real answer is &ldquo;at what price and what ratio,&rdquo; and I run both before the offer goes in. {link("/scenarios/two-rental-properties-cash-out-review.html", "Cash-out on two rentals")} is the live example: the combined equity looked like plenty, but on each property the proposed payment exceeded the rent, so the ratio, not the equity, set the cash-out amount. The four-property Austin STR portfolio on the {link(CASES, "case-studies page")} went the other direction: property cash flow carried the file once personal returns stopped supporting conventional.'])
dscr_old = '<p>DSCR stands for Debt Service Coverage Ratio. It\'s a loan where the lender qualifies the deal based on whether the property\'s income covers its own debt — not whether you personally earn enough.</p>'
dscr_edits = [(dscr_old, dscr_open + dscr_inside, 'dscr opening')]
dscr_faqs = [
 ('What credit score do I need for a DSCR loan in Texas?', '620 to 660 minimum on the programs I place, at reduced leverage; 680 when the ratio is below 1.00; 700 for the top purchase leverage and for interest-only; 740 for the best pricing. Score tiers step at 700, 720 and 740, and each step moves rate, loan-to-value and reserves together.'),
 ('How much down payment does a DSCR loan require?', '15% to 20% on a purchase with a ratio of 1.00 or better and 700-plus credit, on the programs I place. 25% or more when the ratio is under 1.00, on a short-term rental, or when credit is under 700. Cash-out refinances cap at 75% to 80% loan-to-value, and 65% to 70% on no-ratio and STR files.'),
 ('What DSCR ratio do I need to qualify?', '0.75 is the floor on every program I place; 1.00 unlocks full leverage and interest-only; 1.15 is the short-term-rental floor at two investors; and a separate no-ratio option covers properties below 0.75 at 680 to 700 credit with loan amounts capped at $1.5 million to $3 million and lower leverage. Lower ratio costs you in rate, down payment and reserves: 12 months of the payment when the ratio is under 1.00, versus 3 to 6 months above it.'),
]
apply('blog/2026-06-16-dscr-loan-requirements-texas.html', dscr_edits, dscr_faqs, old_iso='2026-06-16')

# ───────────────────────── 8. 1099 ─────────────────────────
n_open = ('<p><strong>A 1099-only mortgage qualifies you on gross 1099 income with a 10% expense factor instead of your Schedule C net.</strong> The 10% is standard across every program I place; two of them waive it entirely when the paying company confirms in writing that you carry no job-related expenses, and one allows a lower documented ratio with a CPA certification. '
 'Programs use one or two years of 1099s, but the one-year option still requires a two-year history with the same payer or in the same industry, and year-to-date pay records or two to three months of bank deposits have to show at least 90% of the prior year&rsquo;s pace. '
 'You cannot own the company that issues the 1099; a 1099 paid to your business instead of to you personally needs an expense letter from your tax preparer. '
 'Minimum credit is 660, loan-to-value reaches 90% on a primary-residence purchase with 720-plus credit, and loan amounts run to $3 million to $4 million by program.</p>')
n_inside = details('What actually moves the file', [
 'The expense factor is almost never the lever on a 1099 file; it is 10% nearly everywhere. The lever is the payer. A 1099-NEC issued to you personally from a company you don&rsquo;t own is the clean case. A 1099 issued to your LLC needs a preparer letter and, at some investors, proof you own 100% of that LLC. A 1099-K from a payment processor reports gross flow including refunds and fees, and gets either a 50% factor or a reconciliation to a P&amp;L, at which point a bank-statement or P&amp;L program usually qualifies you for more.',
 f'The second lever is the year-to-date test: if the current year is running below 90% of last year, the lower figure is the qualifying income, and a strong prior year does not rescue it. The refinance in {link("/scenarios/self-employed-refinance-deposit-review.html", "Which deposits count as income?")} turned on exactly this: a large payment reported on the borrower&rsquo;s 1099 was excluded as a one-time bonus until the payer and compensation history were documented. A 1099 is evidence of income; it is not, by itself, proof the income continues.'])
n_old = ('<p><strong>A 1099-only mortgage lets independent contractors, consultants, real estate agents, and gig workers in Texas qualify for a home loan using 1 or 2 years of 1099 income with a flat expense factor — typically 10–20% — instead of tax returns.</strong> I close these loans for clients across Texas with credit scores starting at 660, down payments as low as 10% on stronger files, and access to wholesale Non-QM lenders running both 1-year and 2-year programs.</p>')
n_ranges_old = ('      <ul>\n        <li><strong>Select Non-QM investors:</strong> 10% flat expense factor on standard 1099-NEC. This is the friendliest math available.</li>\n'
 '        <li><strong>Standard Non-QM:</strong> 10–20% range depending on industry. A consultant with no overhead lands on the low end; a contractor buying materials lands higher.</li>\n'
 '        <li><strong>Conservative Non-QM (Newrez SmartSelf):</strong> 50% factor on 1099 income. This is closer to bank-statement math and qualifies you for far less. Worth knowing this exists so we can avoid it for the right files.</li>\n'
 '      </ul>\n      <!-- FLAG_FOR_ADAM: Newrez SmartSelf 50% 1099 factor is from research file but may have changed. Verify against current wholesale matrix before quoting on a deal. -->\n')
n_ranges_new = ('      <ul>\n        <li><strong>Standard:</strong> 10% flat expense factor on a 1099-NEC or 1099-MISC issued to you personally. Every program I place uses this figure.</li>\n'
 '        <li><strong>Waived:</strong> 0% when the paying company confirms in writing that you carry no job-related expenses. Two of my programs allow this.</li>\n'
 '        <li><strong>Documented:</strong> a lower actual ratio supported by a CPA certification, on one program.</li>\n'
 '        <li><strong>1099-K:</strong> payment-processor forms report gross flow including refunds and fees, so they get a 50% factor or a reconciliation to a P&amp;L. If most of your income arrives that way, a bank-statement or P&amp;L program usually qualifies you for more.</li>\n'
 '      </ul>\n')
n_edits = [
 (n_old, n_open + n_inside, '1099 opening'),
 (n_ranges_old, n_ranges_new, '1099 expense ranges'),
 ('<p>The expense factor is the single biggest variable in your qualifying income. It varies meaningfully by lender — shopping the program matters.</p>',
  '<p>The expense factor is simpler than most articles make it. What varies is how the payer is documented.</p>', '1099 ranges intro'),
]
n_faqs = [
 ('What is a 1099-only mortgage?', 'A Non-QM loan that qualifies you on one or two years of 1099-NEC or 1099-MISC income with a flat 10% expense factor, instead of tax returns or Schedule C. Gross 1099 income, less 10%, divided by the months in the period, is your qualifying income. You cannot own the company that pays you.'),
 ('How is income calculated on a 1099-only loan?', 'Gross 1099 income times 0.90, divided by 12 or 24 months. $180,000 of 1099 income over 12 months qualifies at $13,500 a month. Two programs I place waive the 10% when the payer confirms in writing that you have no job-related expenses; one allows a lower documented ratio with a CPA certification. A 1099 issued to your business rather than to you needs a preparer&rsquo;s expense letter.'),
 ('Do I need 1 year or 2 years of 1099 history?', 'Both options exist, and the one-year option is a documentation shortcut, not a history shortcut. It still requires two years with the same payer or in the same industry, tax transcripts, and year-to-date pay records or two to three months of bank deposits showing at least 90% of the prior year&rsquo;s income. If you moved from W-2 to 1099 in the same line of work within the last 12 months, the one-year option is your route.'),
 ('How is a 1099-only loan different from a bank statement loan?', 'Bank statement loans review 12 or 24 months of deposits and apply a 50% default expense factor, or a 15% to 85% schedule by business type, or a documented ratio. 1099-only skips the deposit review and applies a flat 10% to the forms. If your income is clean 1099 from payers you don&rsquo;t own, 1099-only is simpler and qualifies you for more; if it runs through Stripe or PayPal or a company you own, bank statements or a P&amp;L usually win.'),
 ('What credit score do I need?', '660 minimum on the programs I place, at reduced leverage. 700-plus for the one-year option and better pricing; 720-plus for 90% loan-to-value on a primary purchase.'),
 ('How much down payment do I need?', '10% on a primary-residence purchase with 720-plus credit and two years of 1099 history, on the programs I place. 20% is the common entry point and opens the widest pricing. Cash-out caps at 80% loan-to-value. Loan amounts above $2 million require 20% or more and 6 to 12 months of reserves.'),
 ('Is 1099-only ever the wrong choice?', 'Yes. Three cases: (1) most of your income hits a personal bank account from cash or check side work, so bank statements are better. (2) Your true expenses are well above 10% and you need a CPA-prepared P&amp;L to qualify accurately, so <a href="/p-and-l-mortgage-texas.html">P&amp;L only</a> fits. (3) Your conventional qualifying income is actually higher because your write-offs are small, so a conventional loan wins and saves the rate premium.'),
]
apply('1099-only-mortgage-texas.html', n_edits, n_faqs, old_iso='2026-07-24')
print('done')
