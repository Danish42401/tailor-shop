import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { generateBaseMetadata } from '@/lib/seo';
import { CheckoutClient } from './CheckoutClient';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';

interface PageProps { params: { locale: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const base = generateBaseMetadata(params.locale as Locale);
    return { ...base, title: params.locale === 'ar' ? 'إتمام الشراء' : 'Checkout', robots: { index: false } };
}

export default async function CheckoutPage({ params }: PageProps) {
    const locale = params.locale as Locale;
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'checkout' });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="section-title mb-8">{t('title')}</h1>
            <CheckoutClient locale={locale} />
        </div>
    );
}
