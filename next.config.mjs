import createPWA from '@ducanh2912/next-pwa';
import createNextIntlPlugin from 'next-intl/plugin';

const withPWA = createPWA({
    dest: 'public',
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === 'development',
    workboxOptions: {
        disableDevLogs: true,
    },
});

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const securityHeaders = [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    {
        key: 'Content-Security-Policy',
        value: [
            "default-src 'self'",
            "img-src 'self' res.cloudinary.com data: blob: https:",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' www.googletagmanager.com",
            "connect-src 'self' api.resend.com www.google-analytics.com vitals.vercel-insights.com",
            "font-src 'self' fonts.gstatic.com",
            "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
            "worker-src 'self' blob:",
        ].join('; '),
    },
];

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
    experimental: {
        optimizePackageImports: ['framer-motion', '@headlessui/react'],
    },
};

export default withPWA(withNextIntl(nextConfig));
