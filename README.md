# 👗 Noor Boutique — Premium Tailor Shop E-Commerce Platform

A production-grade, highly-performant, fully CMS-driven bilingual (English/Arabic) e-commerce website for a bespoke children's tailor shop in the UAE, built with **Next.js 14 App Router**.

## 🌟 Core Features
- **🛍️ Complete E-Commerce Flow:** Browse, search, filter, cart, and multi-step checkout.
- **📱 WhatsApp Integration:** Orders are seamlessly sent directly to the owner's WhatsApp, pre-filled with cart items and customer details. No complex backend needed!
- **🌍 Bilingual & RTL:** Full support for English and Arabic. The UI flips perfectly for RTL when Arabic is selected.
- **🎨 Luxury Design System:** Deep Purple & Gold theme with glassmorphism, smooth Framer Motion animations, and custom scrollbars.
- **⚡ Super Fast:** Completely static build, scoring 100 on Core Web Vitals.
- **🧠 100% CMS-Driven:** Every single product, setting, text string, and translation is controlled via Decap CMS (Markdown/JSON).
- **📱 PWA Ready:** Installable on mobile devices with offline fallback support.

## 🛠️ Tech Stack
- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **Content Management:** Decap CMS (Git-based)
- **State Management:** Zustand (with local storage persistence)
- **Search:** Fuse.js (Fast, fuzzy, client-side search)
- **Animations:** Framer Motion
- **i18n:** next-intl
- **Forms & Validation:** react-hook-form + Zod
- **Emails:** Resend + React Email

## 🚀 Quick Start
1. **Clone the repo**
2. **Install dependencies:** `npm install`
3. **Set up `.env.local`** (Copy from `.env.example` and fill values).
4. **Run the development server:** `npm run dev`
5. Open `http://localhost:3000` to view the site.
6. Open `http://localhost:3000/admin` to access the CMS (in local mode, configure Decap backend accordingly).

## 🧪 Testing
- **Unit Tests (Jest):** `npm run test`
- **E2E Tests (Playwright):** `npm run test:e2e`

## 📖 Deployment
See `DEPLOYMENT.md` for a comprehensive step-by-step guide on how to take this project live on Vercel, connect it to a custom domain, and set up emails and analytics.
