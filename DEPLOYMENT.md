# 🚀 Deployment Guide — Noor Boutique

This guide walks you through deploying the Tailor Shop website to Vercel, setting up the CMS, defining environment variables, and going live.

## 1. Prerequisites
- A GitHub account
- A Vercel account
- A Resend account (for emails)
- A Cloudinary account (for images)

## 2. GitHub Setup
1. Push the local repository to a new public or private repository on GitHub.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YourUsername/tailor-shop.git
   git push -u origin main
   ```
2. In `public/admin/config.yml`, make sure the `backend.repo` points to your exact GitHub repo (e.g., `YourUsername/tailor-shop`).

## 3. Vercel Deployment
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import the `tailor-shop` GitHub repository.
3. Keep the default settings (Framework: Next.js).
4. In the **Environment Variables** section, add the following fields (found in `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`: e.g. `https://your-domain.com`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: The UAE phone number without `+` (e.g. `971562392496`)
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name
   - `RESEND_API_KEY`: Your Resend API key
   - `FROM_EMAIL`: Address emails map from (e.g., `orders@your-domain.com`)
   - `OWNER_EMAIL`: Shop owner's email address
   - `CRON_SECRET`: Generate a random string (e.g., `tailorshop2024`)

5. Click **Deploy**. Vercel will build and launch your site.

## 4. Setting up Decap CMS (GitHub OAuth)
To allow the `/admin` panel to save changes directly to GitHub:
1. Go to your GitHub account -> **Developer Settings** -> **OAuth Apps**.
2. Create a new OAuth app:
   - Application Name: `Tailor Shop CMS`
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. We need an authentication provider to handle the OAuth handshake. Since Vercel doesn't have a built-in Netlify Identity alternative, we can use the free **Decap CMS GitHub OAuth backend**.
4. Deploy the [Sveltia CMS Auth provider](https://github.com/sveltia/sveltia-cms-auth) or a similar microservice to Vercel/Render, OR use Netlify Identity by linking the repo to Netlify just for Identity.
5. In `public/admin/config.yml`, set the `base_url` to your auth provider URL.

*(Note: For the simplest setup without complex OAuth brokers, you can deploy the site on Netlify instead of Vercel and enable Netlify Identity + Git Gateway easily from their dashboard).*

## 5. Resend (Email Setup)
1. Go to [Resend](https://resend.com), add your custom domain.
2. Verify the DNS records provided by Resend in your domain registrar.
3. Get the API Key and add it to Vercel environment variables (`RESEND_API_KEY`).

## 6. Daily Summary Cron Job
1. Vercel automatically reads `vercel.json` to configure the cron job.
2. Ensure you have added the `CRON_SECRET` env variable to Vercel so the endpoint `/api/daily-summary` cannot be triggered maliciously.

## 7. Cloudinary
1. Create a Cloudinary account.
2. Retrieve the "Cloud Name" and save it to Vercel (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`).
3. Optionally set up an upload preset from Cloudinary if you directly upload from the frontend, though here Decap CMS uploads to Git and maps via Cloudinary Fetch URL.

## 8. Final Launch Check
- Test the WhatsApp checkout flow on mobile to ensure the URL generates securely.
- Open `/admin`, login, create a test product, and verify the GitHub action correctly triggers a Vercel rebuild.
- Confirm dark mode, localization (AR/EN), and responsive design.
