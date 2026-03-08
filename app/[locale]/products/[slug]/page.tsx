import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getAllProducts, getProduct, getRelatedProducts } from '@/lib/products';
import { generateProductMetadata, generateProductJsonLd } from '@/lib/seo';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductDetailClient } from './ProductDetailClient';
import { generalSettings } from '@/lib/settings';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';

interface PageProps { params: { locale: string; slug: string } }

export async function generateStaticParams() {
    const products = getAllProducts();
    const locales: Locale[] = ['en', 'ar'];
    return products.flatMap(p => locales.map(locale => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const product = getProduct(params.slug);
    if (!product) return {};
    return generateProductMetadata(product, params.locale as Locale);
}

export default async function ProductDetailPage({ params }: PageProps) {
    const locale = params.locale as Locale;
    unstable_setRequestLocale(locale);
    const product = getProduct(params.slug);
    if (!product) notFound();

    const related = getRelatedProducts(product.slug, product.category, 4);
    const t = await getTranslations({ locale });
    const jsonLd = generateProductJsonLd(product, locale);

    return (
        <div className="container mx-auto px-4 py-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailClient product={product} locale={locale} />

            {/* Related products */}
            {related.length > 0 && (
                <section className="mt-16">
                    <h2 className="section-title mb-8">{t('product.related_products')}</h2>
                    <ProductGrid products={related} locale={locale} />
                </section>
            )}
        </div>
    );
}
