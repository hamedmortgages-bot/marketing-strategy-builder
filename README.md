# Marketing Strategy Builder — Landing Site

The public front door for ABC Business's Marketing Strategy Builder. A single static page
(`index.html`) that pitches the tool and hosts the intake form. It is hosted free on
**GitHub Pages** and pointed at your **GoDaddy** domain.

> The page is just the front door. The engine (form → AI → PDF) runs in your no-code tools
> (Tally/Typeform → Make.com → PDFMonkey). This repo only hosts the landing page + sample PDF.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | The landing page. Edit the **"EMBED YOUR FORM HERE"** block to paste your Tally/Typeform iframe. |
| `Strategy_Report_SAMPLE.pdf` | The sample strategy the "See a sample" button links to. |
| `CNAME` | Your custom domain. **Replace the placeholder** with your real domain before going live. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |

---

## Step 1 — Put this on GitHub

1. Create a free account at github.com if you don't have one.
2. Click **New repository** → name it e.g. `marketing-strategy-builder` → **Public** → Create.
3. Upload these files (drag-and-drop in the browser is fine), or push from your computer:

```bash
git init
git add .
git commit -m "Landing page v1"
git branch -M main
git remote add origin https://github.com/<your-username>/marketing-strategy-builder.git
git push -u origin main
```

## Step 2 — Turn on GitHub Pages

1. In the repo: **Settings → Pages**.
2. Under *Build and deployment*, Source = **Deploy from a branch**.
3. Branch = **main**, folder = **/ (root)** → **Save**.
4. Wait ~1 minute. Your site goes live at `https://<your-username>.github.io/marketing-strategy-builder/`.

## Step 3 — Point hamedmarketing.ca at it

The `CNAME` file is already set to **hamedmarketing.ca** (your primary/apex domain). No edit needed.

1. Log in to **GoDaddy → Domains → hamedmarketing.ca → DNS → Manage DNS**.
2. Add these records (GoDaddy → Add Record). The four A records point the apex
   (`hamedmarketing.ca`) at GitHub Pages; the CNAME sends `www` to the same place.

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | `@` | `185.199.108.153` | GitHub Pages IP |
| A | `@` | `185.199.109.153` | GitHub Pages IP |
| A | `@` | `185.199.110.153` | GitHub Pages IP |
| A | `@` | `185.199.111.153` | GitHub Pages IP |
| CNAME | `www` | `<your-username>.github.io` | sends www → GitHub Pages |

> Delete any existing parked "A @" record GoDaddy added by default before adding these,
> or the domain may keep showing GoDaddy's parking page.

3. Back in **GitHub → Settings → Pages → Custom domain**, enter `hamedmarketing.ca` and **Save**.
   Tick **Enforce HTTPS** once it's available (can take an hour).
4. DNS changes can take 15 minutes to a few hours to take effect.

> Always confirm the current GitHub Pages IPs in GitHub's official docs before saving —
> they are occasionally updated.

---

## Step 4 — Embed your form

1. In Tally/Typeform: **Share → Embed → copy the `<iframe>`**.
2. Open `index.html`, find `EMBED YOUR FORM HERE`, and replace the placeholder `<div>` with your iframe.
3. Commit and push — GitHub Pages redeploys automatically.

That's it. Visitors land on your domain, read the pitch, and start the form.
