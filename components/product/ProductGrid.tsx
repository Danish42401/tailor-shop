'use client';

import { type Product } from '@/lib/productUtils';
import { ProductCard } from './ProductCard';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';

interface ProductGridProps {
    products: Product[];
    locale: 'en' | 'ar';
    loading?: boolean;
    emptyMessage?: string;
}

export function ProductGrid({ products, locale, loading = false, emptyMessage }: ProductGridProps) {
    if (loading) {
        return <SkeletonGrid count={8} />;
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-300">
                        <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{emptyMessage ?? 'No products found'}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map(product => (
                <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
        </div>
    );
}
