/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tailor-shop.vercel.app',
    generateRobotsTxt: false, // We use Next.js app/robots.ts
    generateIndexSitemap: false,
    exclude: ['/admin', '/admin/*', '/ar/order-confirmation', '/en/order-confirmation'],
    alternateRefs: [
        {
            href: process.env.NEXT_PUBLIC_SITE_URL + '/en',
            hreflang: 'en',
        },
        {
            href: process.env.NEXT_PUBLIC_SITE_URL + '/ar',
            hreflang: 'ar',
        },
    ],
};
