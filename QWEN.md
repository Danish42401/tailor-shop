# Kids Choice Boutique — Next.js Project Guide

## Project Overview

A professional, mobile-first bespoke fashion e-commerce website for **Emirates Deep Collection** (Kids Choice Boutique) in Abu Dhabi, UAE. The site powers a product catalog, cart system, and bespoke tailoring order flow — all funneling orders through WhatsApp.

**Live URL:** https://tailor-shop-inky.vercel.app/ (Vercel) / Cloudflare Pages

**Key business domain:** Children's frocks, ladies' abayas, mom-daughter matching sets, and bespoke tailoring.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js **15.5.2** (App Router) |
| Language | TypeScript **5.9.3** |
| Styling | Tailwind CSS **v4** + PostCSS |
| Icons | Lucide React **1.8.0** |
| Fonts | Inter (sans), Playfair Display (serif) via next/font/google |
| Runtime | **Edge Runtime** (Cloudflare / Vercel Edge) |
| Build for CF | `@cloudflare/next-on-pages` |
| Linting | ESLint 9 + `eslint-config-next` (core-web-vitals + TypeScript) |

**⚠️ Next.js version note (from `AGENTS.md`):** This project uses Next.js 15.5.2. Some APIs, conventions, and file structure may differ from the latest version. Before writing any code, read the relevant guide at `node_modules/next/dist/docs/`. Heed deprecation notices.

---

## Project Structure

```
kids-choice-boutique/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Edge Runtime, fonts, metadata)
│   │   ├── page.tsx            # Home page (hero, featured pairs, trust section)
│   │   ├── globals.css         # Tailwind imports + custom classes
│   │   ├── catalog/page.tsx    # Product catalog (client: "use client")
│   │   ├── custom/page.tsx     # Bespoke order page
│   │   └── contact/page.tsx    # Contact/location page
│   ├── components/features/    # Feature-specific components
│   │   ├── Navigation.tsx      # BottomNav, MobileHeader, DesktopHeader
│   │   ├── ClientLayout.tsx    # Client wrapper (CartProvider + layout shell)
│   │   ├── CartDrawer.tsx      # Slide-in cart drawer
│   │   ├── LuxuryBespokeForm.tsx  # 10-point measurement form
│   │   └── BespokeMeasurements.tsx # SVG measurement visual diagrams
│   ├── context/
│   │   └── CartContext.tsx      # Global cart state (React Context + localStorage)
│   ├── hooks/
│   │   └── useCart.ts          # Re-export of useCart from CartContext
│   ├── data/
│   │   └── products.ts         # Static product data + siteSettings (fallback)
│   ├── lib/
│   │   ├── data-service.ts     # Google Sheets CSV fetcher (Edge-compatible)
│   │   ├── whatsapp.ts         # WhatsApp link generator
│   │   └── cloudflare-env.d.ts # Cloudflare env type definitions
│   └── types/
│       └── index.ts            # Shared TypeScript interfaces
├── public/                     # Static assets (images, etc.)
├── next.config.ts              # Cloudflare-compatible config
├── postcss.config.mjs          # PostCSS + Tailwind v4
├── eslint.config.mjs           # ESLint 9 flat config
├── tailwind.config.ts          # (v4 uses CSS-based config; this may not exist)
├── tsconfig.json               # TypeScript config (@/* path alias)
├── .npmrc                      # legacy-peer-deps=true (Cloudflare)
├── AGENTS.md                   # Next.js agent rules (see note above)
├── CLAUDE.md                   # Pointer to AGENTS.md
├── GEMINI.md                   # Session log (previous work history)
└── README.md                   # User-facing docs
```

---

## Architecture & Key Patterns

### 1. Edge Runtime
- Root `layout.tsx` sets `export const runtime = 'edge'` for Cloudflare Edge compatibility.
- `next.config.ts` ignores build errors (`ignoreBuildErrors: true`) and lint during builds (`ignoreDuringBuilds: true`) as recommended for Cloudflare.
- `data-service.ts` uses native `fetch()` (no Node APIs) and avoids `fs`/`path` modules.

### 2. Data Flow
- **Catalog page** calls `getProductsFromSheet()` (Google Sheets CSV) on mount (client-side fetch in a `useEffect`).
- **Fallback:** Static product data in `src/data/products.ts` (`initialProducts`) is used when Sheets fetch fails or returns empty.
- **Sheet URL** is hardcoded in `data-service.ts` (or could be via `process.env.GOOGLE_SHEET_CSV_URL` per `cloudflare-env.d.ts`).

### 3. Cart State
- Global state via `CartContext.tsx` (React Context + `useReducer`-like pattern with `useState`).
- Persisted to `localStorage` under key `kids_choice_cart`.
- `isCartOpen` boolean toggles the slide-in `CartDrawer`.
- `useCart()` hook is re-exported from `src/hooks/useCart.ts` — import from `@/hooks/useCart`.

### 4. WhatsApp Integration
- `generateWhatsAppLink()` in `src/lib/whatsapp.ts` builds a formatted message with cart items, customer info, measurements, and notes.
- Uses `encodeURIComponent` for URL-safe parameters.
- Opens `wa.me` link in new tab.

### 5. Forms
- **Bespoke form** (`LuxuryBespokeForm.tsx`): 10-point measurement form with dual-language (English/Arabic) labels, local auto-save (`bespoke_studio_draft_v2`), inch/cm toggle, and WhatsApp submission.
- **BespokeMeasurements.tsx**: Alternative measurement form with SVG diagrams (frock silhouettes with measurement lines).

### 6. Styling
- Tailwind CSS **v4** (imported via `@import "tailwindcss"` in `globals.css` — no `tailwind.config.js` needed).
- Custom CSS classes in `globals.css`:
  - `.glass-card`, `.glass-input` — glassmorphism effects
  - `.luxury-gradient` — gold gradient (`#c9a84c`)
  - `.shimmer-text`, `.gold-text` — gold text effects
  - `.step-active` — bespoke form step indicator
  - Custom scrollbar (gold thin scrollbar)

### 7. Responsive Behavior
- **Mobile-first:** Bottom navigation bar (visible `md:hidden`), floating cart button.
- **Desktop:** Top header with full nav links + cart icon.
- Breakpoints: `md:` (768px), `lg:` (1024px).

---

## Building & Running

```bash
# Development
npm run dev              # next dev

# Production build
npm run build            # next build

# Production start
npm run start            # next start

# Lint
npm run lint             # eslint

# Cloudflare Pages (dev + deploy)
npm run pages:dev        # npx wrangler pages dev
npm run pages:deploy     # build + wrangler pages deploy
```

> **Note:** Use `--legacy-peer-deps` when installing new packages (already set in `.npmrc`).

---

## Conventions

### Code Style
- **TypeScript strict mode** enabled (`strict: true` in `tsconfig.json`).
- **Path alias:** `@/` maps to `src/` (e.g., `import { Product } from "@/types"`).
- **Client vs Server components:** Interactive components use `"use client"` directive. Server components (like the Home page) are async and fetch data directly.
- **Naming:** PascalCase for components and types, camelCase for functions/variables, kebab-case for files/folders.
- **Arrow functions** preferred for components (exported as `export default function` or `export const Component = () => ...`).

### Testing
- No test runner is currently configured.

### Git
- Commit messages should be clear and descriptive (past tense for fixes, present tense for features).
- Example style (from GEMINI.md history): `Fixed Cart Navigation & Global State`, `Prepared for Cloudflare Pages Deployment`.

### Adding Products
- **Primary source:** Google Sheets CSV (edit the sheet directly).
- **Fallback/static source:** Edit `src/data/products.ts` and add/remove objects from `initialProducts`.
- Each product needs: `id`, `name`, `price`, `category`, `description`, `icon` (emoji or image URL), `rating`, `isPair`, `stockStatus`.
- Images go in `public/images/` and reference via `imageUrl` property.

### Site Settings
- Edit `siteSettings` object at the bottom of `src/data/products.ts`:
  - `whatsappNumber`, `shopAddress`, `heroTitle`, `heroSubtitle`.

### Deployment
- Default: **Vercel** (push to GitHub, link repo).
- Alternative: **Cloudflare Pages** (`npm run pages:deploy`).

---

## Dependency Management Notes

- `next` is pinned to **15.5.2** via `overrides` in `package.json` (Cloudflare compatibility).
- `.npmrc` sets `legacy-peer-deps=true` to avoid peer-dependency conflicts during `npm ci` on Cloudflare.
- Key packages to avoid (not Edge-compatible): `fs`, `path`, `child_process`, `crypto` (Node modules).

---

## Editing This File

Keep this file up to date as the project evolves — update the structure, conventions, and commands as they change.
