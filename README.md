# Hamed Ashouri Marketing — Website

The public website for **Hamed Ashouri Marketing**, a strategic marketing consultancy
powered by AI. A multi-page static site hosted free on **GitHub Pages** and pointed at
**hamedmarketing.ca**.

> The website is the front door. The lead engine (intake form → AI → PDF → CRM → email)
> runs in your no-code stack: **Tally → Make.com → OpenAI → PDFMonkey → Google Sheets → Gmail.**
> This repo only hosts the pages, styles, and the sample Blueprint PDF.

---

## Pages

| File | Page |
|------|------|
| `index.html` | Home — platform router (approach, services, blueprint, proof) |
| `about.html` | About & methodology |
| `consulting.html` | Consulting services hub |
| `content.html` | Content-creation services |
| `ai-strategy-blueprint.html` | Signature service + intake form (six-part engagement) |
| `insights.html` | Insights hub (articles, tips, resources, newsletter) |
| `insights-5-second-test.html` | Article — the 5-second homepage test |
| `insights-ai-wont-fix.html` | Article — AI won't fix your marketing |
| `case-studies.html` | Case studies |
| `book.html` | Book a session (Zoho Bookings embed) |
| `contact.html` | Contact |
| `thank-you.html` | Post-submission confirmation (Tally redirect target) |
| `assets/site.css` | Shared design system (Concept A: charcoal + champagne gold) |
| `assets/site.js` | Shared interactions + GA4 analytics loader |
| `Strategy_Report_SAMPLE.pdf` | Sample Blueprint linked from the site |
| `CNAME` | Custom domain — already set to `hamedmarketing.ca` |
| `.nojekyll` | Serve files as-is on GitHub Pages |

---

## Go live (first time)

This folder is already a git repo with an initial commit. To publish:

```bash
# from this folder:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

Then in the repo: **Settings → Pages → Source = Deploy from a branch → main → / (root) → Save.**
Within ~1 minute the site is live. With the `CNAME` file present, GitHub serves it at
**https://hamedmarketing.ca** once DNS is pointed (see below).

### DNS (GoDaddy → hamedmarketing.ca → Manage DNS)

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<your-username>.github.io` |

In **GitHub → Settings → Pages → Custom domain**, enter `hamedmarketing.ca`, Save, then
tick **Enforce HTTPS** once available. (Confirm the current GitHub Pages IPs in GitHub's
docs before saving — they change occasionally.)

## Update later

```bash
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages redeploys automatically within ~1 minute.

---

## Activate analytics (optional, free)

`assets/site.js` (and `thank-you.html`) contain a **GA4** loader that is dormant until you
add your ID. In Google Analytics → **Admin → Data Streams → Web**, create a stream for
`hamedmarketing.ca`, copy the **Measurement ID** (`G-XXXXXXXXXX`), and replace the placeholder
`G-XXXXXXXXXX` in **both** `assets/site.js` and `thank-you.html`. A delivered Blueprint then
logs a `generate_lead` conversion automatically.

---

## Smoke test (run after each deploy)

1. Home loads; nav + footer links all resolve (no 404s).
2. **Blueprint page** intake form appears and accepts a test submission.
3. Test submission lands on **thank-you.html** and a Blueprint email arrives.
4. Both Insight articles open from the Insights grid.
5. Book button opens Zoho Bookings; sample PDF link downloads.
6. Check the site on mobile width (nav toggle works).
