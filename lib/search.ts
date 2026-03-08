import Fuse, { type IFuseOptions } from 'fuse.js';
import { type Product } from './products';

let fuseInstance: { en: Fuse<Product>; ar: Fuse<Product> } | null = null;

function getFuseOptions(locale: 'en' | 'ar'): IFuseOptions<Product> {
    return {
        keys: [
            { name: locale === 'ar' ? 'title_ar' : 'title_en', weight: 0.7 },
            { name: locale === 'ar' ? 'description_ar' : 'description_en', weight: 0.3 },
            { name: 'category', weight: 0.2 },
        ],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 2,
        shouldSort: true,
        ignoreLocation: true,
    };
}

export function buildSearchIndex(products: Product[]): {
    en: Fuse<Product>;
    ar: Fuse<Product>;
} {
    if (fuseInstance) return fuseInstance;

    fuseInstance = {
        en: new Fuse(products, getFuseOptions('en')),
        ar: new Fuse(products, getFuseOptions('ar')),
    };

    return fuseInstance;
}

export function searchProducts(
    query: string,
    products: Product[],
    locale: 'en' | 'ar' = 'en'
): Product[] {
    if (!query || query.trim().length < 2) return [];

    const index = buildSearchIndex(products);
    const results = index[locale].search(query.trim());

    return results.map(result => result.item);
}

export function invalidateSearchIndex(): void {
    fuseInstance = null;
}
