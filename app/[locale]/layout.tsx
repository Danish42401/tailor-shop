import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB';
import { SearchModal } from '@/components/search/SearchModal';
import { themeSettings, generateThemeCSSVars } from '@/lib/settings';
import { generateBaseMetadata, generateHreflangTags } from '@/lib/seo';
import { getAllProducts } from '@/lib/products';
import type { Metadata } from 'next';

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export async function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale as Locale;
    const base = generateBaseMetadata(locale);
    const hreflang = generateHreflangTags('');

    return {
        ...base,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
            languages: {
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
                ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar`,
            },
        },
        other: Object.fromEntries(hreflang.map(h => [h.hrefLang, h.href])),
    };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = params;
    unstable_setRequestLocale(locale);

    if (!locales.includes(locale as Locale)) notFound();

    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const cssVars = generateThemeCSSVars(themeSettings);
    const allProducts = getAllProducts();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <div
                lang={locale}
                dir={dir}
                style={{ ['--theme-vars' as string]: cssVars } as React.CSSProperties}
            >
                {/* Inject CSS vars from CMS theme */}
                <style>{`:root { ${cssVars} }`}</style>

                <AnnouncementBar locale={locale as Locale} />
                <Header locale={locale as Locale} />

                <main className="min-h-[60vh] pb-20 md:pb-0">
                    {children}
                </main>

                <Footer locale={locale as Locale} />
                <MobileBottomNav locale={locale as Locale} />
                <CartDrawer locale={locale as Locale} />
                <SearchModal locale={locale as Locale} products={allProducts} />
                <WhatsAppFAB />
            </div>
        </NextIntlClientProvider>
    );
}
