# TapToReview.in — Static Website

This repository contains a static, responsive single-page website for TapToReview.in.

Files:
- index.html — main page
- css/styles.css — styles
- js/app.js — lightweight interactions (no data storage)
- assets/taptoreview-logo.svg — site logo
- assets/taptoreview-google-review-card.svg — Google Review card artwork
- CNAME — custom domain for GitHub Pages

Important placeholders you must replace before publishing:
- [PRICE], [PRICE_RANGE] — set your pricing values in index.html or via CSS/HTML edits

How this site handles orders:
- The order form opens WhatsApp with a prefilled message; the site does not collect or store form data.

Local testing:
- Serve the folder locally:
  - Python 3: `python -m http.server 8000` then open http://localhost:8000
  - Or use a live-server extension in your editor.

Deploy via GitHub Pages:
1. Push these files to the repo root (branch main).
2. In your repository settings -> Pages:
   - Source: Deploy from branch `main` (root).
  - Custom domain: `taptoreview.in`
   - Save. GitHub will create TLS after DNS is configured.

DNS configuration (for apex domain taptoreview.in):
- Add four A records pointing to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Add a CNAME for `www` pointing to `vish2009.github.io` (optional) OR in many providers create a CNAME for `www` to `taptoreview.in`
- Add the CNAME file (already present) to the repo root.

Wait for DNS propagation (can take up to 24-48 hours), then enable "Enforce HTTPS" in Pages settings.

Git commands to push:
```bash
git clone <repository-url>
cd taptoreview
# create files from this guide, then:
git add .
git commit -m "Update static site branding"
git push origin main
