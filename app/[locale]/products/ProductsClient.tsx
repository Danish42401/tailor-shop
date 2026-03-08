'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAllProducts, type Product } from '@/lib/products';
import { searchProducts } from '@/lib/search';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { Locale } from '@/i18n';

interface ProductsClientProps {
    locale: Locale;
    initialProducts: Product[];
}

export function ProductsClient({ locale, initialProducts }: ProductsClientProps) {
    const t = useTranslations('products');
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') ?? '';

    const [filtered, setFiltered] = useState<Product[]>(initialProducts);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filterAndSort = useCallback(() => {
        let products = query
            ? searchProducts(query, initialProducts, locale)
            : [...initialProducts];

        if (inStockOnly) products = products.filter(p => p.in_stock);
        if (selectedCategory) products = products.filter(p => p.category === selectedCategory);

        switch (sortBy) {
            case 'price_low': products.sort((a, b) => a.price - b.price); break;
            case 'price_high': products.sort((a, b) => b.price - a.price); break;
            case 'best_sellers': products = products.filter(p => p.is_best_seller).concat(products.filter(p => !p.is_best_seller)); break;
            default: products = products.filter(p => p.is_new).concat(products.filter(p => !p.is_new));
        }

        setFiltered(products);
    }, [query, initialProducts, locale, inStockOnly, sortBy, selectedCategory]);

    useEffect(() => { filterAndSort(); }, [filterAndSort]);

    const categories = [
        { value: '', label_en: 'All', label_ar: 'الكل' },
        { value: 'kids-frocks', label_en: 'Kids Frocks', label_ar: 'فساتين الأطفال' },
        { value: 'mother-daughter', label_en: 'Mother-Daughter', label_ar: 'الأم والابنة' },
        { value: 'custom', label_en: 'Custom', label_ar: 'طلبات خاصة' },
        { value: 'ready-made', label_en: 'Ready-Made', label_ar: 'جاهزة' },
        { value: 'special-occasion', label_en: 'Special Occasion', label_ar: 'مناسبات' },
    ];

    return (
        <div>
            {/* Filters bar */}
            <div className="flex flex-wrap gap-3 mb-6 items-center">
                {/* Category pills */}
                <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === cat.value
                                    ? 'bg-primary text-white'
                                    : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100'}`}
                        >
                            {locale === 'ar' ? cat.label_ar : cat.label_en}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="ml-auto px-3 py-2 rounded-xl border border-purple-200 dark:border-purple-700 bg-white dark:bg-surface-dark text-sm text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="newest">{t('sort_newest')}</option>
                    <option value="price_low">{t('sort_price_low')}</option>
                    <option value="price_high">{t('sort_price_high')}</option>
                    <option value="best_sellers">{t('sort_best_sellers')}</option>
                </select>

                {/* In-stock toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={e => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t('in_stock_only')}</span>
                </label>
            </div>

            {/* Count */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t('showing_count', { count: filtered.length, total: initialProducts.length })}
            </p>

            <ProductGrid products={filtered} locale={locale} emptyMessage={t('no_results')} />
        </div>
    );
}
