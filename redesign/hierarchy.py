"""Approved borrower/program hierarchy. Local assembly only; no network or routing writes."""
from pathlib import Path
from bs4 import BeautifulSoup
from html import escape as e
import json, hashlib, re
from urllib.parse import urljoin, urlsplit

ROOT=Path(__file__).resolve().parent
SITE=ROOT/'site'
C=ROOT/'components'

def soup(text): return BeautifulSoup(text,'html.parser')
def path_for(route): return SITE/('index.html' if route=='/' else route.lstrip('/')+('index.html' if route.endswith('/') else ''))
def link(route,label): return f'<a href="{e(route,quote=True)}">{e(label)}</a>'

# One source of truth for menus, directories, program pages and their relationships.
PROGRAMS=[
 dict(route='/loans/conventional.html',name='Conventional Loans',group='Conventional & Government',intro='For buying or refinancing a home using documented income. We compare the loan terms, down payment and mortgage insurance together.',fits=['Buyers with documented employment or self-employed income','Primary homes, second homes and eligible investment properties','Borrowers comparing down-payment and mortgage-insurance options'],facts=['Income and debts are reviewed together.','Credit, down payment and property type affect the options.','Self-employment does not automatically require a specialty loan.','Compare total costs as well as the interest rate.'],guide='Conventional loan qualification and costs',more=[('/blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html','FHA versus conventional loans')],calc='/calculator-payment.html',audience='/first-time-home-buyer.html'),
 dict(route='/loans/jumbo.html',name='Jumbo Loans',group='Conventional & Government',intro='Financing for loan amounts above the applicable conforming limit. I compare how lenders review income, assets and reserves for the property you want.',fits=['Buyers financing higher-priced homes','Borrowers with salary, business income or eligible stock compensation','Homeowners refinancing a larger mortgage'],facts=['Loan limits depend on the property location and unit count.','Reserve requirements and eligible income differ by lender.','Stock compensation needs its own documentation review.','Liquidity matters alongside the down payment.'],guide='Jumbo loan income, assets and reserve requirements',more=[('/blog/2026-08-18-jumbo-loan-requirements-texas-2026.html','Texas jumbo loan requirements')],calc='/calculator-payment.html',audience='/high-net-worth-mortgage.html'),
 dict(route='/loans/fha.html',name='FHA Loans',group='Conventional & Government',intro='An FHA-insured mortgage may be worth comparing with conventional financing. The useful comparison includes the payment, mortgage insurance and cash needed to close.',fits=['Buyers considering a lower-down-payment mortgage','Borrowers comparing FHA and conventional qualification','Eligible homeowners reviewing an FHA refinance'],facts=['FHA loans include mortgage insurance.','The property and borrower must meet program requirements.','Loan limits vary by location and property type.','A smaller down payment does not necessarily mean a lower total cost.'],guide='FHA eligibility, mortgage insurance and property requirements',more=[('/blog/2026-04-10-fha-loan-requirements-texas-2026.html','FHA loan requirements in Texas')],calc='/calculator-affordability.html',audience='/first-time-home-buyer.html'),
 dict(route='/loans/va.html',name='VA Loans',group='Conventional & Government',intro='Home financing for eligible veterans, service members and qualifying surviving spouses. We review entitlement, the property and your full loan costs before choosing a lender.',fits=['Eligible veterans and active-duty service members','Qualifying surviving spouses','Eligible homeowners considering a VA refinance'],facts=['Eligibility and available entitlement must be confirmed.','Occupancy and property requirements apply.','Funding-fee treatment depends on the borrower and transaction.','Compare the complete loan estimate, including lender fees.'],guide='VA eligibility, entitlement and loan costs',more=[('/blog/2026-03-29-va-loan-eligibility-texas.html','VA loan eligibility in Texas')],calc='/calculator-payment.html',audience='/first-time-home-buyer.html'),
 dict(route='/bank-statement-loans.html',name='Bank Statement Loans',group='Income & Asset Qualification',intro='For self-employed borrowers whose tax returns do not support the loan they need. Eligible bank deposits may provide another way to calculate qualifying income.',fits=['Business owners with consistent deposits','1099 contractors reviewing alternatives to tax-return qualification','Self-employed buyers or homeowners considering a refinance'],facts=['The lender reviews eligible deposits, not just the account balance.','Transfers and unusual deposits need to be separated from income.','Business expenses affect the qualifying calculation.','We compare conventional financing when your tax returns support it.'],guide='Bank statement income calculations and documentation',more=[('/blog/2026-06-30-bank-statement-loans-texas.html','How lenders review bank statements')],calc='/calculator-payment.html',audience='/self-employed-mortgage-austin.html'),
 dict(route='/1099-only-mortgage-texas.html',name='1099 Loans',group='Income & Asset Qualification',intro='Some lenders offer a qualification path using eligible 1099 earnings. I compare the income calculation and documentation with bank-statement and tax-return options.',fits=['Independent contractors receiving 1099 income','Borrowers with an established history in their work','Buyers comparing different ways to document self-employed income'],facts=['A 1099 does not by itself establish qualifying income.','Work history and current earnings still need review.','Expense treatment and documentation vary by lender.','Rates, down payment and reserves belong in the comparison.'],guide='1099 income qualification and documentation',more=[('/bank-statement-loans.html','Compare bank statement loans')],calc='/calculator-affordability.html',audience='/self-employed-mortgage-austin.html'),
 dict(route='/p-and-l-mortgage-texas.html',name='P&L Loans',group='Income & Asset Qualification',intro='A lender may consider a qualifying profit-and-loss statement as an alternative income document. The preparer, business history and supporting records matter.',fits=['Established business owners','Borrowers with current business earnings to document','Self-employed buyers comparing income-documentation options'],facts=['Not every profit-and-loss statement meets lender requirements.','The preparer and reporting period need to be confirmed.','Supporting records may still be required.','Compare this approach with tax returns and bank statements.'],guide='P&L mortgage documentation and income review',more=[('/resources/mortgage-options-for-business-owners.html','Prepare your business records for a mortgage review')],calc='/calculator-payment.html',audience='/self-employed-mortgage-austin.html'),
 dict(route='/asset-depletion-mortgage-texas.html',name='Asset Depletion Loans',group='Income & Asset Qualification',intro='Eligible assets may help establish qualifying income. We review which accounts count, what must be deducted and how the lender converts the remaining assets into income.',fits=['Borrowers with substantial eligible assets and limited regular income','Retirees or people between businesses','Buyers comparing financing with a larger cash purchase'],facts=['Account type, access and ownership affect eligibility.','Closing funds and required reserves can reduce the usable pool.','Lenders use different adjustments and calculation periods.','Using assets as income is different from pledging them as collateral.'],guide='Asset depletion calculations, eligible accounts and pledged assets',more=[('/reverse-mortgage-texas.html','Compare reverse mortgage considerations')],calc='/asset-depletion-calculator.html',audience='/high-net-worth-mortgage.html'),
 dict(route='/dscr-loans-texas.html',name='DSCR Loans',group='Investment Property',intro='Investment-property financing that reviews rental income against the property payment. We work through the rent, expenses, equity and loan terms before relying on a ratio.',fits=['Investors buying or refinancing rental property','Borrowers comparing property-based and personal-income qualification','Long-term or eligible short-term rental owners'],facts=['Rental income and the full payment must be calculated consistently.','Credit, equity, reserves and property requirements still apply.','Short-term rental treatment depends on the lender and property.','Prepayment provisions and total loan costs deserve a close look.'],guide='DSCR calculations, rental income and lender requirements',more=[('/blog/2026-06-16-dscr-loan-requirements-texas.html','Texas DSCR loan requirements'),('/blog/2026-06-05-dscr-airbnb-str-loan-texas.html','DSCR financing for short-term rentals')],calc='/dscr-calculator.html',audience='/investor-loans.html'),
 dict(route='/loans/investment.html',name='Conventional Investment Property Loans',group='Investment Property',intro='A conventional mortgage can be a useful option for a rental purchase or refinance when your documented income and the property meet the requirements.',fits=['Investors with documented personal income','Buyers comparing conventional financing with DSCR','Owners refinancing an eligible rental property'],facts=['Your income, debts and financed properties need review.','Rental-income treatment depends on the file.','Down-payment and reserve requirements differ from a primary home.','Compare costs and qualification with DSCR financing.'],guide='Conventional rental-property financing requirements',more=[('/blog/2026-06-14-dscr-vs-conventional-investment-property-loan-texas.html','DSCR versus conventional investment financing')],calc='/dscr-calculator.html',audience='/investor-loans.html'),
 dict(route='/dscr-cash-out-refinance-texas.html',name='DSCR Cash-Out Refinance',group='Investment Property',intro='Review how much equity a rental property may release after the new loan, existing payoff and closing costs. Property value alone does not determine the available cash.',fits=['Rental owners reviewing an equity withdrawal','Investors comparing a cash-out refinance across properties','Owners planning another purchase or a portfolio change'],facts=['Both rental coverage and equity affect the result.','Payoffs and closing costs reduce the cash delivered.','Seasoning and lender requirements need to be confirmed.','The appraisal and underwriting can change an initial estimate.'],guide='DSCR cash-out limits, costs and rental-coverage review',more=[('/blog/2026-06-05-dscr-cash-out-refinance-texas-brrrr.html','Cash-out refinance and BRRRR considerations')],calc='/dscr-calculator.html',audience='/investor-loans.html'),
 dict(route='/loans/refinance.html',name='Mortgage Refinance',group='Refinance & Equity',intro='A refinance should solve a specific problem: a different payment, term, loan structure or access to equity. I compare the costs with what you expect to gain.',fits=['Homeowners comparing a new payment or term','Borrowers reviewing cash-out options','Owners deciding whether to keep their current mortgage'],facts=['Closing costs and the time you expect to keep the loan matter.','A lower payment can come from extending the repayment term.','Cash-out changes the balance and available equity.','Compare the new loan with keeping the mortgage you have.'],guide='Refinance costs, break-even and cash-out options',more=[('/blog/2026-04-17-should-i-refinance-austin-tx-2026.html','Refinance break-even and costs'),('/blog/2026-03-24-cash-out-refinance-austin-tx.html','Cash-out refinance trade-offs')],calc='/calculator-refinance-breakeven.html',audience='/move-up-buyers.html'),
 dict(route='/home-equity-loans-texas.html',name='Home Equity Loans',group='Refinance & Equity',intro='Review ways to borrow against home equity, including whether a separate loan makes sense alongside your existing first mortgage. Texas requirements need particular attention.',fits=['Homeowners reviewing access to equity','Borrowers who want to compare keeping their first mortgage','Owners considering a lump sum versus other financing'],facts=['Available equity is only one part of qualification.','The combined payment and closing costs need review.','Texas home-equity rules affect eligible transactions.','A home-equity loan and a cash-out first mortgage are different structures.'],guide='Texas home-equity rules and financing comparisons',more=[('/loans/refinance.html','Compare a first-mortgage refinance')],calc='/calculator-payment.html',audience='/move-up-buyers.html'),
 dict(route='/reverse-mortgage-texas.html',name='Reverse Mortgages',group='Refinance & Equity',intro='A reverse mortgage is a significant decision about your home and equity. We start with the purpose, ongoing obligations, costs and alternatives before discussing a specific loan.',fits=['Eligible homeowners reviewing retirement cash flow','Borrowers comparing home equity with other assets','Families or advisors evaluating the long-term trade-offs'],facts=['Age, property and program eligibility must be confirmed.','Property taxes, insurance and maintenance obligations continue.','Loan costs and the effect on remaining equity matter.','Counseling requirements and repayment events need careful review.'],guide='Reverse mortgage obligations, costs and alternatives',more=[('/reverse-mortgage-financial-advisors-texas.html','Reverse mortgage considerations for financial advisors')],calc='/asset-depletion-calculator.html',audience='/high-net-worth-mortgage.html'),
 dict(route='/buy-before-you-sell-austin.html',name='Buy Before You Sell',group='Refinance & Equity',intro='Buying the next home before selling the current one starts with a review of both properties, available funds and your ability to carry the obligations.',fits=['Homeowners planning their next purchase','Buyers comparing sale timing and financing options','Borrowers with equity tied up in their current home'],facts=['We review both payments and any documented rental plan.','Equity is not automatically available cash for closing.','Timing, reserves and an exit plan matter.','Any bridge or alternative structure needs a separate terms review.'],guide='Buying before selling: qualification and timing',more=[('/blog/2026-06-14-buy-before-you-sell-austin-tx.html','How to buy before selling your current home')],calc='/calculator-affordability.html',audience='/move-up-buyers.html'),
]
AUDIENCES=[
 dict(route='/self-employed-mortgage-austin.html',name='Self-Employed & Business Owners',intro='Your tax return is one way to document income. We compare it with other available methods before deciding which loan makes sense.',photo='porch-home-800.webp',programs=['/loans/conventional.html','/bank-statement-loans.html','/1099-only-mortgage-texas.html','/p-and-l-mortgage-texas.html'],review=['How you earn and how long you have been doing it','The property, timing and cash available','Which records best support your current income'],more=[('/k1-income-mortgage-austin.html','Qualifying with K-1 income'),('/mortgage-for-business-owners-austin.html','Business-owner mortgage planning')],example='/scenarios/self-employed-refinance-deposit-review.html',example_text='A 1099 borrower could not qualify using tax returns. A bank-statement review supported a funded cash-out refinance.',guide='Self-employed mortgage income and documentation'),
 dict(route='/high-net-worth-mortgage.html',name='High-Net-Worth & Asset-Rich Borrowers',intro='A strong balance sheet does not always translate into qualifying income. We compare documented income, eligible assets and the cash you want to keep available.',photo='contemporary-home-800.webp',programs=['/loans/jumbo.html','/asset-depletion-mortgage-texas.html','/reverse-mortgage-texas.html'],review=['Which assets are accessible and how they are held','Your income and the proposed property payment','The liquidity you want to retain after closing'],more=[('/asset-depletion-calculator.html','Explore an asset-depletion estimate'),('/reverse-mortgage-financial-advisors-texas.html','Planning considerations for advisors')],example='/scenarios/oil-gas-royalty-asset-depletion.html',example_text='After two bank declines tied to royalty-income documentation, a borrower closed using eligible assets for qualification.',guide='Asset-rich borrower financing: income, liquidity and loan comparisons'),
 dict(route='/investor-loans.html',name='Real Estate Investors',intro='The financing needs to work with the property and your plans for it. We compare rental cash flow, personal-income qualification, loan costs and access to equity.',photo='rental-home-dusk-800.webp',programs=['/dscr-loans-texas.html','/loans/investment.html','/dscr-cash-out-refinance-texas.html'],review=['The property and its current or expected rent','Your purchase, refinance or cash-out goal','Equity, reserves and how long you plan to keep the loan'],more=[('/blog/2026-06-14-dscr-vs-conventional-investment-property-loan-texas.html','DSCR versus conventional financing'),('/blog/2026-06-05-dscr-airbnb-str-loan-texas.html','Short-term rental financing')],example='/scenarios/two-rental-properties-cash-out-review.html',example_text='A review of two rentals showed less available cash than requested once coverage, payoffs and costs were considered. This was a financing review, not a closed loan.',guide='Investment-property financing and rental cash-flow review'),
 dict(route='/first-time-home-buyer.html',name='First-Time Homebuyers',intro='Start with a payment and cash-to-close range you understand. Then compare the loan options and work through what you need before making an offer.',photo='porch-home-800.webp',programs=['/loans/conventional.html','/loans/fha.html','/loans/va.html'],review=['A payment range that works with your budget','Available down-payment and closing funds','Income, credit and your purchase timeline'],more=[('/resources/first-time-buyer-guide/','The first-time homebuyer guide'),('/blog/2026-03-30-first-time-home-buyer-programs-austin-tx-2026.html','Austin first-time buyer assistance')],guide='First-time buyer planning, qualification and closing costs'),
 dict(route='/move-up-buyers.html',name='Repeat & Move-Up Buyers',intro='Your next purchase may involve a current mortgage, equity and a sale to coordinate. We compare the financing with the timing of both homes.',photo='contemporary-home-800.webp',programs=['/loans/conventional.html','/loans/jumbo.html','/buy-before-you-sell-austin.html','/home-equity-loans-texas.html'],review=['What needs to happen with your current home','Cash available before and after a sale','The payment and timing for your next purchase'],more=[('/blog/2026-06-14-buy-before-you-sell-austin-tx.html','Buying before selling'),('/calculator-affordability.html','Estimate a purchase range')],guide=None),
 # Existing business-owner URL stays distinct and useful, under the broader audience.
 dict(route='/mortgage-for-business-owners-austin.html',name='Mortgages for Business Owners',intro='Business cash, personal income and tax planning do different jobs. We review the financing without assuming every dollar in the business is available for a home purchase.',photo='porch-home-800.webp',programs=['/loans/conventional.html','/bank-statement-loans.html','/p-and-l-mortgage-texas.html'],review=['Ownership and how you pay yourself','Business records and access to closing funds','The effect of the purchase on business liquidity'],more=[('/resources/mortgage-options-for-business-owners.html','Business records to prepare'),('/k1-income-mortgage-austin.html','K-1 income review')],guide='Business-owner income, compensation and liquidity planning',secondary=True),
]
PROGRAM_BY={p['route']:p for p in PROGRAMS}
AUDIENCE_BY={p['route']:p for p in AUDIENCES}
GUIDE_MAP={p['route']:'/guides/'+p['route'].strip('/').replace('/','-').removesuffix('.html')+'-guide.html' for p in PROGRAMS+AUDIENCES if p.get('guide')}
EXCLUDED=['/loans/usda.html','/loans/construction.html','/one-time-close-construction-loan-texas.html']

def card(route,title,description,photo=None):
 image=f'<div class="hi-card-image"><img src="/assets/stock/{photo}" alt="" width="800" height="533" loading="lazy" decoding="async"></div>' if photo else ''
 return f'<a class="hi-card" href="{e(route)}">{image}<div class="hi-card-copy"><h3>{e(title)}</h3><p>{e(description)}</p><span class="hi-card-link">Explore options <span aria-hidden="true">→</span></span></div></a>'

def actions(): return '<div class="hi-actions"><a class="button gold" href="#contact" data-contact="Review my scenario">Review My Scenario →</a><a class="button outline" href="tel:+15129566010">Call (512) 956-6010</a></div>'
def trust(): return '<p class="hi-trust"><a href="/testimonials.html"><span aria-hidden="true">★★★★★</span> Read client reviews</a><span>Adam Styer · NMLS #513013</span></p>'
def hero(title,intro,label='Loan Program',photo='contemporary-home-800.webp'):
 return f'<section class="hi-hero"><div><p class="eyebrow">{label} · Austin &amp; Central Texas</p><h1>{e(title)}</h1><p class="hi-intro">{e(intro)}</p>{actions()}{trust()}</div><figure><img src="/assets/stock/{photo}" alt="" width="800" height="533" fetchpriority="high"></figure></section>'
def section(title,content,extra='',id=None): return f'<section class="hi-section {extra}"'+(f' id="{id}"' if id else '')+f'><div class="hi-section-heading"><h2>{e(title)}</h2></div>{content}</section>'
def listing(items): return '<ul class="hi-facts">'+''.join(f'<li>{e(x)}</li>' for x in items)+'</ul>'
def cta(): return '<section class="hi-section hi-cta"><div><p class="eyebrow">Talk it through</p><h2>Tell me what you’re trying to do.</h2><p>A few sentences are enough to start. Call, text, or use the short scenario form.</p></div>'+actions()+'<p><a href="sms:+15129566010">Text Adam</a> · <a href="/apply-now/">Apply Online</a></p></section>'
def reading(p):
 items=[(GUIDE_MAP[p['route']],p['guide'])] if p.get('guide') else []
 items+=p.get('more',[])
 return '<ul class="hi-reading">'+''.join('<li>'+link(r,t)+' <span aria-hidden="true">↗</span></li>' for r,t in items)+'</ul>'

def faq(p,audience=False):
 if audience:
  data=[('Do I need to choose a loan before contacting you?','No. Start with your situation. I’ll compare the relevant programs and explain what needs review.'),('What should I share first?','Your goal, approximate timing and the part that needs a closer look. Please do not send sensitive financial records through the inquiry form.'),('Does an initial conversation mean I am approved?','No. Approval depends on a complete application, supporting documents, the property and the lender’s review.')]
 else:
  data=[('How do I know if this program fits?', 'We compare your income, assets, property and plans with the lender’s requirements. Another program may be a better fit.'),('What will you need to review first?',p['facts'][0]+' Start with a short description of your situation; we’ll identify the records needed for the next step.'),('Where can I find the detailed requirements?', 'The guides below explain documentation, calculations and trade-offs. Specific terms and availability depend on the lender and your complete file.')]
 return section('A few questions before we talk','<div class="hi-faq">'+''.join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q,a in data)+'</div>','',id='faq')

def program_main(p):
 process=['Review your goal, income, assets and property.','Compare lender requirements, rates, fees and loan structure.','Choose an option to document and submit for underwriting.']
 return '<main id="main" class="hi-main">'+hero(p['name'],p['intro'])+section('Who this may fit',listing(p['fits']))+section('How it works','<ol class="hi-steps">'+''.join('<li><span>'+str(i+1).zfill(2)+'</span><p>'+e(x)+'</p></li>' for i,x in enumerate(process))+'</ol>','hi-band')+section('What matters for qualification',listing(p['facts']))+faq(p)+section('Go deeper when you’re ready',reading(p)+f'<div class="hi-related">{link(p["calc"],"Open the calculator")} · {link(p["audience"],"See related borrower options")}</div>','hi-band',id='program-guides')+cta()+'</main>'

def audience_main(p):
 cards=''.join(card(r,PROGRAM_BY[r]['name'],PROGRAM_BY[r]['intro'].split('. ')[0]+'.') for r in p['programs'])
 example='<aside class="hi-example"><p class="eyebrow">Borrower example</p><p>'+e(p['example_text'])+'</p>'+link(p['example'],'Read the full scenario →')+'</aside>' if p.get('example') else ''
 return '<main id="main" class="hi-main">'+hero(p['name'],p['intro'],'Who We Serve',p['photo'])+section('Loan options to compare','<div class="hi-card-grid">'+cards+'</div>')+section('What we review first',listing(p['review'])+example,'hi-band')+faq(p,True)+section('Explore the details',reading(p),'',id='program-guides')+cta()+'</main>'

def shell(route,title,main,description):
 return soup('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+e(title)+' | Adam Styer, Austin Mortgage Broker</title><meta name="description" content="'+e(description,quote=True)+'"><link rel="canonical" href="https://styermortgage.com'+route+'"><meta property="og:title" content="'+e(title,quote=True)+'"><meta property="og:description" content="'+e(description,quote=True)+'"><meta property="og:url" content="https://styermortgage.com'+route+'"><meta property="og:image" content="https://styermortgage.com/assets/og-image.png"><meta name="robots" content="noindex,nofollow,noarchive"><meta http-equiv="Content-Security-Policy" content="connect-src \'none\'; form-action \'none\'; object-src \'none\'; base-uri \'none\'"><link rel="icon" href="/favicon.ico"></head><body class="orchestration-page hi-page">'+main+'</body></html>')

def install_schema(doc,route,title,old=None):
 # Keep identity entities; page-specific FAQ and breadcrumb schema are regenerated.
 retained=[]
 if old:
  for node in old.select('script[type="application/ld+json"]'):
   value=json.loads(node.get_text())
   if isinstance(value,dict) and value.get('@type') in ['FinancialService','Person','Organization']: retained.append(value)
 retained.append({'@context':'https://schema.org','@type':'WebPage','name':title,'url':'https://styermortgage.com'+route,'about':{'@type':'Person','name':'Adam Styer','identifier':'NMLS #513013'}})
 faq_entries=[{'@type':'Question','name':d.summary.get_text(' ',strip=True),'acceptedAnswer':{'@type':'Answer','text':d.p.get_text(' ',strip=True)}} for d in doc.select('.hi-faq details')]
 if faq_entries:retained.append({'@context':'https://schema.org','@type':'FAQPage','mainEntity':faq_entries})
 for obj in retained:
  tag=doc.new_tag('script',type='application/ld+json');tag.string=json.dumps(obj,ensure_ascii=False);doc.head.append(tag)

def write_doc(route,title,main,description,old=None):
 d=shell(route,title,main,description);install_schema(d,route,title,old)
 path=path_for(route);path.parent.mkdir(parents=True,exist_ok=True);path.write_text(str(d))
 return d

def directories():
 blocks=''
 for group in dict.fromkeys(p['group'] for p in PROGRAMS):
  blocks+=section(group,'<div class="hi-card-grid">'+''.join(card(p['route'],p['name'],p['intro']) for p in PROGRAMS if p['group']==group)+'</div>')
 blocks+=section('Not sure which program to start with?','<p>Start with '+link('/who-we-serve.html','Who We Serve')+' or tell me what you want to do. You do not need to pick the product first.</p>')
 write_doc('/products.html','Loan Programs', '<main id="main" class="hi-main">'+hero('Loan programs. Clear choices.','Conventional, jumbo and specialty financing for buying, refinancing and investing. Start with a program or explore the options for your situation.','Loan Programs')+blocks+cta()+'</main>','Explore conventional, jumbo, FHA, VA, bank statement, asset depletion, DSCR, refinance and home equity financing with Austin mortgage broker Adam Styer.')
 main='<main id="main" class="hi-main">'+hero('Who we serve.','First homes, next homes, business income, investment assets and rental properties. Find the situation closest to yours.','Who We Serve')+section('Start with your situation','<div class="hi-card-grid hi-audience-directory">'+''.join(card(p['route'],p['name'],p['intro'],p['photo']) for p in AUDIENCES if not p.get('secondary'))+'</div>')+section('Already know the loan you want?','<p>'+link('/products.html','Browse all loan programs →')+'</p>','hi-band')+cta()+'</main>'
 write_doc('/who-we-serve.html','Who We Serve',main,'Mortgage options for first-time buyers, move-up buyers, self-employed business owners, asset-rich borrowers and real estate investors.')
 # Preserve the original resource directory at a clear, optional second level.
 blocks=''
 resources=[('/calculators.html','Mortgage Calculators','Eight tools for payments, affordability, refinancing, rental cash flow and more.'),('/mortgage-guides.html','Mortgage Guides','Detailed explanations organized by the loan or borrower situation.'),('/scenarios.html','Borrower Scenarios','Documented funded loans, financing reviews and clearly identified illustrations.'),('/austin-area-mortgage-lender.html','Austin & Central Texas','Local mortgage and property guides.'),('/blog.html','Articles & Market Updates','The article archive and ongoing mortgage updates.'),('/referral-partners-self-employed-clients.html','Professional Partners','Resources for real estate agents, CPAs and financial advisors.')]
 write_doc('/resources/','Mortgage Resources','<main id="main" class="hi-main">'+hero('Tools when you need numbers. Guides when you want detail.','Start with the resource that helps you make the next decision.','Resources')+section('Explore the resources','<div class="hi-card-grid">'+''.join(card(*x) for x in resources)+'</div>')+section('Looking for a specific page?','<p>'+link('/resources/full-directory.html','Open the complete mortgage resource directory →')+'</p>','hi-band')+cta()+'</main>','Mortgage calculators, detailed loan guides, borrower scenarios and Austin resources from Adam Styer.')
 # Existing Non-QM URL becomes a short category page, not a competing full product.
 selected=[p for p in PROGRAMS if p['group']=='Income & Asset Qualification']+[PROGRAM_BY['/dscr-loans-texas.html']]
 write_doc('/non-qm-loans.html','Alternative Income & Specialty Mortgage Options','<main id="main" class="hi-main">'+hero('When standard documentation does not fit.','Compare specialty mortgage programs alongside conventional options. Different documentation can change costs and requirements, so the full comparison matters.','Loan Programs')+section('Options to compare','<div class="hi-card-grid">'+''.join(card(p['route'],p['name'],p['intro']) for p in selected)+'</div>')+section('Read the full explanation',reading({'route':'/non-qm-loans.html','guide':'Alternative income and Non-QM documentation','more':[]})) +cta()+'</main>','Compare bank statement, 1099, P&L, asset depletion and DSCR mortgage options.')


def assemble():
 preserved=C/'preserved-depth';preserved.mkdir(exist_ok=True)
 snapshots=[]
 pairs=[(p['route'],p['guide']) for p in PROGRAMS+AUDIENCES if p.get('guide')]+[('/non-qm-loans.html','Alternative income and Non-QM documentation'),('/resources/','Complete Mortgage Resource Directory'),('/products.html','Mortgage options and Texas lending reference')]
 GUIDE_MAP['/non-qm-loans.html']='/guides/non-qm-loans-guide.html'
 GUIDE_MAP['/resources/']='/resources/full-directory.html'
 GUIDE_MAP['/products.html']='/guides/mortgage-options-reference.html'
 for route,title in pairs:
  source=preserved/(route.strip('/').replace('/','-') or 'home')
  if not source.suffix:source=source.with_suffix('.html')
  if not source.exists():source.write_text(path_for(route).read_text())
  old=soup(source.read_text());destination=GUIDE_MAP[route]
  # Relative asset/link paths are resolved against the original URL before a
  # technical page moves into /guides/. In-page fragments remain local.
  for node in old.select('[href],[src]'):
   for attr in ['href','src']:
    raw=node.get(attr,'')
    if not raw or raw.startswith(('/','#','data:','mailto:','tel:','sms:','https:','http:','//')):continue
    u=urlsplit(urljoin('https://styermortgage.com'+route,raw))
    node[attr]=u.path+('?' + u.query if u.query else '')+('#'+u.fragment if u.fragment else '')
  # Change page identity, preserving every original main-body element and script.
  old.title.string=title+' | Adam Styer'
  old.select_one('link[rel="canonical"]')['href']='https://styermortgage.com'+destination
  for node in old.select('meta[property="og:url"]'):node['content']='https://styermortgage.com'+destination
  for node in old.select('meta[property="og:title"],meta[name="twitter:title"]'):node['content']=title
  if old.main.h1:old.main.h1.string=title
  for node in list(old.main.select('.migration-links,.migration-parent,.ledger-breadcrumb')):node.decompose()
  intro=soup('<aside class="hi-guide-return"><p>Detailed guide · '+link(route,'Back to the short overview →')+'</p></aside>').aside
  old.main.insert(0,intro)
  # Article/FAQ ownership follows the preserved page; identity entities stay intact.
  for node in old.select('script[type="application/ld+json"]'):
   def move(v):
    if isinstance(v,list):return [move(x) for x in v]
    if isinstance(v,dict):return {k:move(x) for k,x in v.items()}
    if isinstance(v,str):return v.replace('https://styermortgage.com'+route,'https://styermortgage.com'+destination) if v.startswith('https://styermortgage.com'+route) else v
    return v
   data=json.loads(node.get_text())
   if isinstance(data,dict) and data.get('@type') not in ['FinancialService','Person','Organization']:node.string=json.dumps(move(data),ensure_ascii=False)
  dest=path_for(destination);dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(str(old))
  snapshots.append({'route':route,'guide':destination,'title':title,'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'preserved_file':source.relative_to(ROOT).as_posix()})
 for p in PROGRAMS+AUDIENCES:
  current=soup(path_for(p['route']).read_text()) if path_for(p['route']).exists() else None
  write_doc(p['route'],p['name'],program_main(p) if p['route'] in PROGRAM_BY else audience_main(p),p['intro'],current)
 directories()
 # Catalogue of technical reading: the preserved explanations and existing guides.
 groups=''
 for label,items in [('Loan program guides',[p for p in PROGRAMS]),('Borrower planning guides',[p for p in AUDIENCES if p.get('guide')])]:
  groups+=section(label,'<ul class="hi-reading">'+''.join('<li>'+link(GUIDE_MAP[p['route']],p['guide'])+'</li>' for p in items)+'</ul>')
 write_doc('/mortgage-guides.html','Mortgage Guides','<main id="main" class="hi-main">'+hero('The details behind the loan.','Documentation, calculations and trade-offs, organized so you can read what matters to your file.','Resources')+groups+section('More reference material','<p>'+link('/guides/mortgage-options-reference.html','Mortgage options and Texas lending reference')+'</p>')+cta()+'</main>','Detailed mortgage qualification, documentation and loan comparison guides.')
 # Original fragment links continue to reach the preserved technical explanation.
 fragment_map={}
 for item in snapshots:
  d=soup(path_for(item['guide']).read_text())
  fragment_map[item['route']]={n['id']:item['guide']+'#'+n['id'] for n in d.main.select('[id]')}
  target=soup(path_for(item['route']).read_text())
  # Small fallback anchors retain incoming historic URLs with fragments.
  target_ids={n['id'] for n in target.main.select('[id]')}
  old_ids=[x for x in fragment_map[item['route']] if x not in target_ids]
  if old_ids:
   panel=soup('<details class="migration-links hi-legacy-links"><summary>Looking for a section from the full guide?</summary><ul>'+''.join(f'<li id="{e(id,quote=True)}">'+link(fragment_map[item['route']][id],'Continue to '+id.replace('-',' ')+' →')+'</li>' for id in old_ids)+'</ul></details>').details
   target.main.append(panel);path_for(item['route']).write_text(str(target))
 # All internal fragment links use the technical page directly, preserving context.
 for path in SITE.rglob('*.html'):
  d=soup(path.read_text());changed=False
  for a in d.select('a[href]'):
   href=a['href']
   if '#' not in href:continue
   base,fragment=href.split('#',1)
   if base.startswith('https://styermortgage.com'):base=base[len('https://styermortgage.com'):]
   if base in fragment_map and fragment in fragment_map[base]:
    # Main overview FAQ and contact links intentionally stay local.
    if fragment in ['faq','contact','scenario-review','program-guides']:continue
    a['href']=fragment_map[base][fragment];changed=True
  if changed:path.write_text(str(d))
 parents={p['route']:'/products.html' for p in PROGRAMS}
 parents.update({p['route']:'/who-we-serve.html' for p in AUDIENCES})
 parents['/mortgage-for-business-owners-austin.html']='/self-employed-mortgage-austin.html'
 parents.update({item['guide']:item['route'] for item in snapshots})
 parents.update({'/who-we-serve.html':'/','/products.html':'/','/resources/':'/','/mortgage-guides.html':'/resources/','/non-qm-loans.html':'/products.html'})
 parents.update({route:'/resources/full-directory.html' for route in EXCLUDED})
 labels={p['route']:p['name'] for p in PROGRAMS+AUDIENCES}
 labels.update({item['guide']:item['title'] for item in snapshots})
 labels.update({'/who-we-serve.html':'Who We Serve','/products.html':'Loan Programs','/resources/':'Resources','/mortgage-guides.html':'Mortgage Guides','/non-qm-loans.html':'Alternative Income & Specialty Options'})
 labels.update({'/loans/usda.html':'USDA loans — legacy educational page','/loans/construction.html':'Construction loans — legacy educational page','/one-time-close-construction-loan-texas.html':'One-time-close construction — legacy educational page'})
 # Retain the original resource overview as optional background, with the full
 # ledger directory presented separately from actively offered products.
 full=path_for('/resources/full-directory.html');d=soup(full.read_text())
 original=d.main.extract()
 original.attrs.pop('id',None)
 for n in list(original.select('.migration-links,.migration-parent,.ledger-breadcrumb,.hi-guide-return')):n.decompose()
 if original.h1:original.h1.decompose()
 ledger=json.loads((ROOT/'route-manifest.json').read_text())
 directory=''
 for cluster in dict.fromkeys(r['cluster'] for r in ledger['routes']):
  rows=[r for r in ledger['routes'] if r['cluster']==cluster and r['route'] not in EXCLUDED]
  directory+=section(cluster.split(': ',1)[-1],'<ul class="hi-reading">'+''.join('<li>'+link(r['route'] if r['route']!='/index.html' else '/',r['anchor'])+'</li>' for r in rows)+'</ul>')
 directory+=section('Legacy educational pages','<p>USDA and construction loans are not part of Adam’s current offered services. These pages remain available as reference material.</p><ul class="hi-reading">'+''.join('<li>'+link(r,labels[r])+'</li>' for r in EXCLUDED)+'</ul>')
 archive='<details class="hi-original-directory"><summary>Original resource overview</summary>'+str(original).replace('<main','<div',1).rsplit('</main>',1)[0]+'</div></details>'
 write_doc('/resources/full-directory.html','Complete Mortgage Resource Directory','<main id="main" class="hi-main">'+hero('The full resource directory.','Every route in the migration inventory remains accessible here. Start with the main program or borrower pages if you want a shorter overview.','Resources')+directory+archive+'</main>','Complete directory of mortgage programs, guides, calculators and legacy educational pages.')
 for route in EXCLUDED:
  p=path_for(route);d=soup(p.read_text())
  for node in list(d.select('.hi-legacy-notice')):node.decompose()
  d.main.insert(0,soup('<aside class="hi-legacy-notice"><strong>Legacy educational page.</strong> Adam does not currently offer '+('USDA' if 'usda' in route else 'construction')+' loans. '+link('/products.html','View currently offered loan programs →')+'</aside>').aside)
  p.write_text(str(d))
 record={'preserved_routes':173,'programs':[p['route'] for p in PROGRAMS],'audiences':[p['route'] for p in AUDIENCES],'excluded_from_promotion':EXCLUDED,'preserved_depth':snapshots,'parents':parents,'labels':labels}
 # New supporting URLs join the preview sitemap; historical entries stay intact.
 import xml.etree.ElementTree as ET
 sitemap=SITE/'sitemap.xml'
 if sitemap.exists():
  ns='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',ns)
  tree=ET.parse(sitemap);root=tree.getroot();existing={n.text for n in root.findall('{'+ns+'}url/{'+ns+'}loc')}
  for route in parents:
   url='https://styermortgage.com'+route
   if url not in existing and path_for(route).exists():
    node=ET.SubElement(root,'{'+ns+'}url');ET.SubElement(node,'{'+ns+'}loc').text=url
  tree.write(sitemap,encoding='unicode',xml_declaration=True)
 (ROOT/'hierarchy-manifest.json').write_text(json.dumps(record,indent=2))
 return record
