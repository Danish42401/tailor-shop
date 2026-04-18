# Kids Choice Boutique - Dubai (Next.js Website)

A professional, mobile-first, bespoke fashion website designed for **Kids Choice**, Dubai.

## 🚀 Key Features
- **Mobile-First App UI:** Optimized for 99% mobile traffic with bottom navigation.
- **Bespoke Order Engine:** Custom tailoring form that redirects to WhatsApp.
- **Persistent Cart:** Professional cart logic with local storage persistence.
- **WhatsApp Catalog:** Automatic message generation for easy ordering.
- **Scalable Architecture:** Built with TypeScript and Next.js App Router.

## 📁 Folder Structure
- `/src/types`: TypeScript definitions for AI and developer clarity.
- `/src/data`: Central source of truth for products and site settings.
- `/src/hooks`: Reusable logic (Cart management).
- `/src/lib`: External integrations (WhatsApp, Data Services).
- `/src/components`: Modular UI components.

## 🛠️ How to Manage (For Beginners)

### 1. Adding/Removing Products
Open `src/data/products.ts`.
- To **add** a product, copy an existing object and change the `id`, `name`, and `price`.
- To **update** the shop's WhatsApp number or address, edit the `siteSettings` object at the bottom of the same file.

### 2. Images
Place images in the `public/images` folder and update the `imageUrl` property in `products.ts`.

### 3. Scaling for the Future
- **Database:** Swap the `initialProducts` in `catalog/page.tsx` with a database call (e.g., Supabase or MongoDB).
- **Online Payments:** Add Stripe or Stripe-supported UAE gateways in the checkout flow.
- **Google Sheets:** To use Google Sheets, implement the `lib/data-service.ts` to fetch from the Google Sheets API.

## 📦 Deployment
This project is pre-configured for **Vercel**.
1. Push to GitHub.
2. Link repository to Vercel.
3. Your site is live!

---
*Handcrafted for Excellence - 2026*
