# Malalang — Web Development for Phalaborwa SMEs

Malalang is a boutique web design and development studio focused on helping small and medium-sized businesses in Phalaborwa and the surrounding Limpopo region get online quickly, affordably, and with zero upfront risk.

This repository contains the codebase for the public site (malalang.vercel.app) which documents services, pricing, portfolio, and the "no deposit — pay on completion" offering.

---

## Table of contents

- [Vision](#vision)
- [Key features](#key-features)
- [Technology stack](#technology-stack)
- [Pricing & business model (public site)](#pricing--business-model-public-site)
- [Project workflow (how we work with clients)](#project-workflow-how-we-work-with-clients)
- [Getting started (local development)](#getting-started-local-development)
- [Build & deployment](#build--deployment)
- [Important files / where to edit content](#important-files--where-to-edit-content)
- [SEO, Local SEO and structured data](#seo-local-seo-and-structured-data)
- [Accessibility & performance](#accessibility--performance)
- [Contributing](#contributing)
- [Contact](#contact)
- [License & credits](#license--credits)

---

## Vision

Malalang exists to lower the financial and technical barriers that often stop small businesses from having an effective online presence. We champion a trust-first model — no deposit and payment only on client satisfaction — and combine in-person onboarding with transparent, collaborative development via live Vercel preview links.

---

## Key features (site highlights)

- Clear, local-first messaging targeted at Phalaborwa SMEs
- Transparent fixed-price packages (Landing page, Base, Standard)
- No deposit / pay-on-completion business model
- Live staging links (Vercel preview URLs) so clients can follow progress
- Portfolio, testimonials and blog / insights authored by the founder
- Mobile-first responsive design
- SEO-friendly metadata and structured content
- WhatsApp click-to-chat CTA for fast onboarding

---

## Technology stack

- Framework: Next.js (App Router)
- UI: React + Tailwind CSS
- Language: TypeScript
- Hosting / Deployment: Vercel
- Analytics: Vercel Web Analytics (optional) / GA
- Content: Static + possible headless CMS (Sanity or similar) patterns used in the repo
- Repo & CI: GitHub (automated deployments to Vercel)

---

## Pricing & business model (public site)

Public-facing pricing (for reference on the website):

- Landing Page — R1,000
- Base Package (5 pages) — R1,500
- Standard Package (feature-rich site) — R2,500
- Add-ons: SEO, ongoing maintenance, launch packs, etc.

No upfront fees; payment requested only after client approval of the finished site.

---

## Project workflow (as documented on the site)

1. Intro / intake — face-to-face meeting or WhatsApp to gather requirements
2. Agreement & scope confirmation
3. Live staging development — client receives a private Vercel preview URL
4. Review & two rounds of revisions (included)
5. Final sign-off and payment
6. Handover of credentials, assets, and optional care plan for post-launch support

---

## Getting started (local development)

These commands assume a typical Next.js / TypeScript project. Adjust the package manager to your preference (npm, pnpm, yarn).

1. Clone the repository
   ```bash
   git clone https://github.com/AEN-Nyathi/Malalang.git
   cd Malalang
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   # pnpm install
   # yarn
   ```

3. Run the dev server
   ```bash
   npm run dev
   # typically: next dev
   ```

4. Build for production
   ```bash
   npm run build
   npm start
   ```

Notes:
- The project uses the Next.js App Router (app directory). The root layout is at `app/layout.tsx`.
- If any environment variables are required for integrations (analytics, CMS, WhatsApp API), they should be defined in `.env.local`. Check the `lib/constants` folder for any constants used by the app.

---

## Build & deployment

This project is designed for Vercel:

- Connect the GitHub repository to Vercel.
- Vercel will create Preview URLs for branches and PRs automatically.
- Production deploys occur when you push to the `main` branch (or whichever branch is configured as production).
- Vercel handles SSL/TLS, CDN, and fast rollbacks.

Deployment checklist:
- Verify `NEXT_PUBLIC_` environment variables on Vercel (analytics IDs, CMS tokens).
- Confirm OG and SEO images are present under `public/images/` and accessible at `https://malalang.vercel.app/images/`.
- Confirm WhatsApp link constant is set correctly (see `lib/constants/site`).

---

## Important files / where to edit content

- app/layout.tsx — global layout, site metadata (title, openGraph, twitter), and JSON-LD Organization snippet.
  - Current path: `app/layout.tsx`
- components/ — site UI components (Header, Footer, Cta, SkipToContent, Toaster, etc.)
- public/images/ — OG images, logo, favicon
- lib/constants/ — site-level constants (e.g., `WHATSAPP_LINK`)
- pages or app/* — route content and pages (home, about, pricing, portfolio, blog)
- README and Research Report — documentation and strategy

If you want to change global metadata, edit `app/layout.tsx`. The JSON-LD script currently injects Organization schema — consider replacing or augmenting with LocalBusiness schema for improved local SEO.

---

## SEO, Local SEO and structured data (recommendations)

- Add LocalBusiness schema (schema.org/LocalBusiness) with:
  - official business name, street address, city (Phalaborwa), postal code, region, country
  - telephone and contactPoint
  - openingHours (if available)
  - geo coordinates (latitude / longitude)
  - sameAs links (social profiles)
- Ensure canonical URLs and hreflang if you add additional locales
- Provide descriptive alt text for portfolio images
- Maintain and publish local-focus blog posts, e.g.,:
  - "Why every Phalaborwa business needs a website in 2025"
  - "Choosing the right website package for your restaurant or tour business"
- Validate structured data using Google Rich Results test

Example: `app/layout.tsx` currently includes an Organization JSON-LD. Consider changing it to LocalBusiness and filling accurate address/phone details.

---

## Accessibility & performance

- The project already follows mobile-first responsive patterns and includes a skip-to-content component.
- Run Lighthouse audits and address top issues:
  - Improve first contentful paint / largest contentful paint if images are heavy
  - Ensure sufficient color contrast (WCAG AA)
  - Ensure all interactive elements are keyboard-accessible and have focus styles
- Optimize images (use next/image or ensure appropriately compressed assets)

---

## Contributing

We welcome improvements. Typical workflow:

1. Fork the repo
2. Create a feature branch
3. Run tests and linting (if configured)
4. Open a pull request with a clear description of the change
5. Link any related issues for tracking

Suggested issues to start:
- Add LocalBusiness JSON-LD (fill with accurate address and hours)
- Add or update OG/Twitter preview images for portfolio items
- Lighthouse: fix top 3 accessibility/performance issues
- Add CI linting and TypeScript checks (if missing)

If you'd like, I can draft those issues for you.

---

## Contact

Founder & maintainer: Abram Ntsako  
GitHub: https://github.com/AEN-Nyathi  
Website: https://malalang.vercel.app  
WhatsApp: (link in site constants)

---

## License & credits

This repository is maintained by Malalang Pty Ltd. Check the LICENSE file in the repo for details (add one if absent—MIT is a common choice for public web content).

---

If you'd like, I can:
- Add a LocalBusiness JSON-LD snippet and a ready-to-apply patch to `app/layout.tsx`.
- Draft GitHub issues for the SEO, accessibility, and image work.
- Produce a short "handover checklist" for client launches (DNS steps, credentials, and maintenance suggestions).

Which would you like me to do next?
