# QWEN.md — Noor Boutique (Tailor Shop E-Commerce)

## Project Overview

**Noor Boutique** is a production-grade, fully CMS-driven bilingual (English/Arabic) e-commerce platform for a bespoke children's tailor shop in the UAE. Built with **Next.js 14 App Router**, it features a complete shopping flow — browse, search, cart, multi-step checkout — with orders delivered via WhatsApp integration.

### Key Characteristics
- **Bilingual + RTL**: Full English/Arabic support with proper RTL layout flipping via `next-intl`.
- **CMS-Driven**: All products, settings, blog posts, FAQs, and translations are managed via **Decap CMS** (Markdown/JSON files in `/content`).
- **WhatsApp Checkout**: Orders are sent directly to the owner's WhatsApp — no payment gateway or complex backend required.
- **Luxury Design**: Deep Purple & Gold theme with glassmorphism, Framer Motion animations, and custom CSS variables.
- **PWA Ready**: Installable on mobile with offline fallback via `@ducanh2912/next-pwa`.
- **Image Pipeline**: Images served through **Cloudinary** with automatic optimization (AVIF/WebP).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4 + CSS variables |
| Animations | Framer Motion |
| State Management | Zustand (with localStorage persistence) |
| i18n | next-intl |
| Forms | react-hook-form + Zod validation |
| Search | Fuse.js (client-side fuzzy search) |
| CMS | Decap CMS (Git-based) |
| Emails | Resend + React Email |
| Testing | Jest + Playwright (E2E) |
| Linting | ESLint (next/core-web-vitals) |
| Deployment | Vercel |

---

## Directory Structure

```
tailor-shop/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-scoped routes (en/ar)
│   │   ├── layout.tsx            # Locale layout with CMS data
│   │   ├── page.tsx              # Home page
│   │   ├── about/                # About page
│   │   ├── blog/                 # Blog listing + detail
│   │   ├── checkout/             # Multi-step checkout flow
│   │   ├── contact/              # Contact page
│   │   ├── order-confirmation/   # Order confirmation page
│   │   └── products/             # Product listing + detail ([slug])
│   ├── api/                      # API routes
│   │   ├── order/route.ts        # Order submission (WhatsApp + email)
│   │   └── daily-summary/route.ts# Cron job for daily order summary
│   ├── globals.css               # Global styles + CSS variables
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── manifest.ts               # PWA manifest
│   ├── not-found.tsx             # 404 page
│   └── robots.ts                 # robots.txt
├── components/                   # React components
├── content/                      # CMS content (Markdown/JSON)
│   ├── blog/                     # Blog posts
│   ├── faq/                      # FAQ entries
│   ├── products/                 # Product definitions
│   ├── settings/                 # Site settings & translations
│   └── testimonials/             # Customer testimonials
├── lib/                          # Utilities & services
│   ├── email/                    # Email templates + Resend integration
│   ├── animations.ts             # Framer Motion variants
│   ├── cloudinary.ts             # Cloudinary URL helpers
│   ├── products.ts               # Product CMS parsers
│   ├── search.ts                 # Fuse.js search config
│   ├── whatsapp.ts               # WhatsApp URL builder
│   └── ...
├── store/                        # Zustand stores
│   ├── cartStore.ts              # Cart state with localStorage persistence
│   └── uiStore.ts                # UI state (modals, toasts, etc.)
├── messages/                     # i18n translation files (en.json, ar.json)
├── types/                        # TypeScript type definitions
├── public/admin/                 # Decap CMS admin panel
├── __tests__/                    # Jest unit tests
├── tests/                        # Playwright E2E tests
└── workflows/                    # n8n-as-code workflow files (if any)
```

---

## Building and Running

### Prerequisites
- Node.js 18+
- npm

### Local Development
```bash
npm install              # Install dependencies
npm run dev              # Start dev server at http://localhost:3000
```

### Access the CMS locally
```
http://localhost:3000/admin
```

### Build for Production
```bash
npm run build            # Next.js production build
npm run start            # Start production server
```

### Testing
```bash
npm run test             # Run Jest unit tests
npm run test:watch       # Jest watch mode
npm run test:e2e         # Run Playwright E2E tests
npm run lint             # Run ESLint
```

### Sitemap Generation
```bash
npm run postbuild        # Auto-generates sitemap (runs after build)
```

---

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Client | Base URL (e.g., `https://tailor-shop.vercel.app`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Client | Owner's WhatsApp number (no `+`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Client | Cloudinary cloud name |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client | Google Analytics ID (optional) |
| `RESEND_API_KEY` | Server | Resend API key for emails |
| `OWNER_EMAIL` | Server | Owner's email for order notifications |
| `FROM_EMAIL` | Server | Sender email (default: `onboarding@resend.dev`) |
| `DAILY_SUMMARY_SECRET` | Server | Secret for cron job authentication |

---

## Architecture Notes

### CMS Data Flow
- Content lives in `/content/` as Markdown/YAML files.
- `lib/products.ts` and similar modules parse CMS files using `gray-matter`.
- Products are loaded at build time (static generation) with `[slug]` dynamic routes.
- Decap CMS (`public/admin/`) provides a UI for editing content, committing to Git.

### Cart & State
- **Zustand** store (`store/cartStore.ts`) manages cart with localStorage persistence.
- Cart items include full customization details (size, fabric, embroidery, etc.).
- Cart ID is generated from product slug + customization hash for deduplication.

### i18n
- `next-intl` with locale-prefixed URLs (`/en/products`, `/ar/products`).
- Messages in `messages/en.json` and `messages/ar.json`.
- RTL handled via CSS logical properties and Tailwind's RTL support.

### Checkout Flow
1. Customer fills checkout form (validated with Zod).
2. Order API sends WhatsApp message to owner with cart details.
3. Order confirmation email sent to owner via Resend.
4. Customer redirected to order confirmation page.

### API Routes
- **`/api/order`** (POST): Processes checkout — sends WhatsApp + email.
- **`/api/daily-summary`** (GET): Cron endpoint for daily order summaries. Protected by `DAILY_SUMMARY_SECRET`.

### Security
- CSP headers configured in `next.config.mjs`.
- Rate limiting utility available in `lib/rateLimit.ts`.
- HTML sanitization via DOMPurify in `lib/sanitize.ts`.

---

## Design System

### Color Palette
- **Primary**: Deep Purple (`#4A1D96`) with hover state (`#3B0764`)
- **Accent**: Gold (`#D4AF37`)
- **Surface**: Light purple-tinted (`#FAF7FF`)
- **Dark backgrounds**: `#0F0A1E`, `#1A1033`

All colors are CSS variable-driven, allowing CMS/theme overrides.

### Tailwind Custom Config
- Extended color palettes: `purple.{50-950}`, `gold.{300-700}`
- Custom animations: `fade-in`, `slide-in-right/left`, `slide-up`, `pulse-slow`, `bounce-subtle`
- Custom shadows: `luxury`, `luxury-lg`, `gold`
- Extra breakpoint: `xs` (375px)

---

## Development Conventions

- **TypeScript strict mode**: `noImplicitAny: true`, `strict: true`
- **Path aliases**: `@/*` maps to project root
- **Component naming**: PascalCase for components, camelCase for utilities
- **No hardcoded secrets**: Use environment variables exclusively
- **CMS-first**: Prefer CMS-driven content over hardcoded values
- **RTL-aware**: Use Tailwind's logical properties (`ms-*`, `me-*`, `start`, `end`)
- **Image optimization**: Always use Cloudinary URLs through `lib/cloudinary.ts` helpers

---

## Deployment

Deployed on **Vercel**. See `DEPLOYMENT.md` for the complete guide covering:
- GitHub + Vercel connection
- Environment variable setup
- Decap CMS OAuth configuration
- Resend domain verification
- Cloudinary setup
- Cron job configuration (`vercel.json`)

---

## Relevant AI Agent Context

This project includes **n8n-as-code** support via `n8nac-config.json`. See `AGENTS.md` for n8n workflow engineering guidelines. The n8n version is **2.9.4** and workflows use the TypeScript decorator pattern.
