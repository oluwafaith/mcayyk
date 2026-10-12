# MC AYYK — Official Master Of Ceremonies Website

A production-ready, mobile-first landing website for **MC AYYK**, built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

Designed directly from MC AYYK's official promotional flyer, featuring luxury gold accents, verified checkmark credentials, interactive packages, video showreel showcase, client reviews, FAQ accordion, and dual-mode automated booking delivery.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ✉️ Cost-Effective Email Delivery Setup (Web3Forms & Formspree)

When a client submits the booking form, the site delivers the inquiry directly to **`poniayoyinka@gmail.com`** in the background.

Choose the most cost-effective option for your setup:

### Option 1: Web3Forms (Recommended — 100% Free, Unlimited Forms, No Credit Card)
1. Go to [https://web3forms.com](https://web3forms.com).
2. Enter `poniayoyinka@gmail.com` to instantly receive your free Access Key.
3. Paste the key into `.env.local`:
   ```bash
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```
4. **Done!** Every booking inquiry lands directly in your Gmail inbox with no server or SMTP setup.

### Option 2: Formspree (Free Tier Available)
1. Create a form at [https://formspree.io](https://formspree.io).
2. Paste your endpoint into `.env.local`:
   ```bash
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your_form_id
   ```

### Option 3: Direct Gmail SMTP
If you prefer direct server-to-server delivery:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=poniayoyinka@gmail.com
SMTP_PASS=your-16-character-app-password
```

> **Note:** If no key or endpoint is configured, the website automatically falls back to opening the visitor's native email client with all booking details pre-filled, ensuring **zero lost leads**.

---

## 📋 Content & Placeholders Checklist

All site data is centrally managed in **[`src/lib/site.ts`](src/lib/site.ts)**. Fill in the following:

- [ ] **WhatsApp Number**: Set `whatsapp: "2349169830753"` to activate direct WhatsApp chat buttons.
- [ ] **Location / Service Area**: Set `serviceArea: "Lagos, Nigeria · Available nationwide"` to enable Google Maps links.
- [ ] **Social Media Profiles**: Paste your URLs for Instagram, TikTok, Facebook, and X in `socials`.
- [ ] **Showreel Video**: Add your YouTube or Vimeo embed URL to `showreelUrl`.
- [ ] **Package Pricing & Details**: Add starting rates or custom inclusions for Parties, Weddings, and Corporate Events in `services`.
- [ ] **Client Testimonials**: Update real client reviews in `src/components/Testimonials.tsx`.
- [ ] **About Bio**: Add MC AYYK's background summary and notable achievements in `src/components/About.tsx`.

---

## 📸 Image Replacements

The images in **`src/assets/images/`** are high-quality placeholders. For best results, replace them with actual photos of MC AYYK:

| File | Recommended Replacement | Dimensions |
|---|---|---|
| `hero-placeholder.jpg` | High-res portrait of MC AYYK on stage holding a microphone | 4:5 portrait (e.g. 1200×1500px) |
| `gallery-wedding.jpg` | Real photo of MC AYYK hosting a wedding reception | 4:3 or 16:9 landscape |
| `gallery-party.jpg` | Real photo of MC AYYK energizing a party crowd | 4:3 or 16:9 landscape |
| `gallery-corporate.jpg` | Real photo of MC AYYK at a corporate conference or gala | 4:3 or 16:9 landscape |

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [https://vercel.com/new](https://vercel.com/new) and import the repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` (your production domain)
   - `SMTP_USER` and `SMTP_PASS` (or `RESEND_API_KEY`)
4. Click **Deploy**. Vercel will build and host the app with edge performance.

### Deploying to Netlify
1. Import repository on [https://app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Set the same Environment Variables under **Site Configuration > Environment Variables**.
5. Deploy.

### Deploying to GitHub Pages (Static HTML Export)
1. In `.env.local` or GitHub repository settings, set:
   ```bash
   STATIC_EXPORT=true
   NEXT_PUBLIC_BASE_PATH=/your-repo-name
   ```
2. Run static build:
   ```bash
   STATIC_EXPORT=true npm run build
   ```
3. Deploy the resulting `out/` folder to GitHub Pages.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with Cache Components)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Typography**: Next.js Google Fonts (`Inter_Tight`, `Playfair_Display`, `Inter`)
- **Email Delivery**: Nodemailer (SMTP) + Resend API integration
- **SEO & Social**: Automated Schema.org JSON-LD, Dynamic OG Images (`next/og`), `sitemap.xml`, `robots.txt`
