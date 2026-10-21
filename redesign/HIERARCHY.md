# Approved hierarchy — Netlify Preview #28

The homepage positions Adam Styer as an Austin mortgage broker for buying,
refinancing and investing, with particular expertise in complex income.

Navigation: Loan Programs, Who We Serve, Resources, About; persistent Call and
Apply actions. Public reviews follow the hero. Five audience paths precede
six featured loan programs. Two documented funded examples sit with the team
introduction. The four-field contact form closes the homepage.

`hierarchy.py` is the source of truth for 15 program pages, five primary audience
pages and the existing business-owner page. `products.html` is the program
directory; `who-we-serve.html` is the borrower directory. All use the original
Tiffany visual stylesheet and scoped layout adapters in `hierarchy.css`.

The affected long explanations are preserved under `guides/`, linked from each
short overview. Original snapshots and hashes are recorded in
`components/preserved-depth/` and `hierarchy-manifest.json`. Historic fragment
links are rewritten to their detailed guide, with fallback section anchors at
the original URL. Every original ledger URL remains available.

USDA and construction are excluded from active program menus and overview
pages. Their original URLs carry a legacy educational notice and remain in
the full resource directory. FHA, VA, reverse mortgages and buy-before-you-sell
remain in the public programme offering.

`route-manifest.json` and the 173-route ledger remain the historical inventory.
`hierarchy-manifest.json` records approved parent and label changes and new
supporting URLs. The route verifier reconciles those parents while retaining
the strict 173 original-URL count. The hierarchy verifier checks all new links,
canonical ownership and preservation of substantive original paragraphs.

Preview forms remain non-transmitting. Production source, main, Netlify live
routing, server functions, n8n and notification recipients are outside this
change. Sponsoring-company release review remains a production gate.
