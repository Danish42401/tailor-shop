import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getAllProducts } from '@/lib/products';
import { generateBaseMetadata } from '@/lib/seo';
import { ProductsClient } from './ProductsClient';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';

interface PageProps { params: { locale: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const base = generateBaseMetadata(params.locale as Locale);
    return { ...base, title: params.locale === 'ar' ? 'جميع المنتجات' : 'All Products' };
}

export default async function ProductsPage({ params }: PageProps) {
    const locale = params.locale as Locale;
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'products' });
    const products = getAllProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="section-title mb-8">{t('title')}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductsClient locale={locale} initialProducts={products} />
            </Suspense>
        </div>
    );
}
