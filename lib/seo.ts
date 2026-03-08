import { type Metadata } from 'next';
import { generalSettings, contactSettings } from './settings';
import { type Product } from './products';
import { getCloudinaryOGImage } from './cloudinary';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tailor-shop.vercel.app';

export function generateHreflangTags(pathname: string) {
    return [
        { rel: 'alternate', hrefLang: 'en', href: `${siteUrl}/en${pathname}` },
        { rel: 'alternate', hrefLang: 'ar', href: `${siteUrl}/ar${pathname}` },
        { rel: 'alternate', hrefLang: 'x-default', href: `${siteUrl}/en${pathname}` },
    ];
}

export function generateBaseMetadata(locale: 'en' | 'ar'): Metadata {
    const shopName = locale === 'ar' ? generalSettings.shop_name_ar : generalSettings.shop_name_en;
    const tagline = locale === 'ar' ? generalSettings.tagline_ar : generalSettings.tagline_en;

    return {
        metadataBase: new URL(siteUrl),
        title: {
            template: `%s | ${shopName}`,
            default: `${shopName} — ${tagline}`,
        },
        description: tagline,
        keywords: locale === 'ar'
            ? 'فساتين أطفال, فساتين للأم والابنة, فساتين مخصصة, دبي, الإمارات'
            : 'kids frocks, mother daughter matching, custom dresses, Dubai, UAE',
        authors: [{ name: shopName }],
        openGraph: {
            type: 'website',
            siteName: shopName,
            locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
            alternateLocale: locale === 'ar' ? 'en_AE' : 'ar_AE',
        },
        twitter: {
            card: 'summary_large_image',
            site: contactSettings.social_links.instagram || undefined,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
    };
}

export function generateProductMetadata(
    product: Product,
    locale: 'en' | 'ar'
): Metadata {
    const shopName = locale === 'ar' ? generalSettings.shop_name_ar : generalSettings.shop_name_en;
    const title = locale === 'ar' ? product.title_ar : product.title_en;
    const description = (locale === 'ar' ? product.description_ar : product.description_en)
        .replace(/[#*\n]/g, ' ')
        .slice(0, 160);

    const ogImage = product.images[0]
        ? getCloudinaryOGImage(product.images[0])
        : `${siteUrl}/og-default.jpg`;

    const productUrl = `${siteUrl}/${locale}/products/${product.slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: productUrl,
            languages: {
                en: `${siteUrl}/en/products/${product.slug}`,
                ar: `${siteUrl}/ar/products/${product.slug}`,
            },
        },
        openGraph: {
            type: 'website',
            title: `${title} — ${shopName}`,
            description,
            url: productUrl,
            images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} — ${shopName}`,
            description,
            images: [ogImage],
        },
    };
}

export function generateProductJsonLd(product: Product, locale: 'en' | 'ar') {
    const name = locale === 'ar' ? product.title_ar : product.title_en;
    const description = (locale === 'ar' ? product.description_ar : product.description_en)
        .replace(/[#*\n]/g, ' ')
        .slice(0, 200);

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image: product.images.map(img => getCloudinaryOGImage(img)),
        offers: {
            '@type': 'Offer',
            priceCurrency: 'AED',
            price: product.sale_price ?? product.price,
            availability: product.in_stock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: generalSettings.shop_name_en,
            },
        },
    };
}
