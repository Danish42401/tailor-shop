import { searchProducts } from '@/lib/search';
import type { Product } from '@/lib/productUtils';

describe('Search Functionality', () => {
    const mockProducts: Product[] = [
        {
            slug: 'pink-frock',
            title_en: 'Pink Tulle Frock',
            title_ar: 'فستان تول وردي',
            price: 100,
            sale_price: null,
            category: 'kids-frocks',
            images: [],
            in_stock: true,
            is_new: false,
            is_best_seller: false,
            is_custom: false,
            description_en: 'Beautiful pink dress',
            description_ar: 'فستان وردي جميل',
            colors: [] as string[]
        },
        {
            slug: 'blue-dress',
            title_en: 'Navy Blue Dress',
            title_ar: 'فستان كحلي',
            price: 150,
            sale_price: null,
            category: 'mother-daughter',
            images: [],
            in_stock: true,
            is_new: false,
            is_best_seller: false,
            is_custom: false,
            description_en: 'Elegant navy dress for parties',
            description_ar: 'فستان كحلي أنيق للحفلات',
            colors: [] as string[]
        }
    ];

    test('finds English products by title', () => {
        const results = searchProducts('pink', mockProducts, 'en');
        expect(results).toHaveLength(1);
        expect(results[0].slug).toBe('pink-frock');
    });

    test('finds Arabic products by title', () => {
        const results = searchProducts('وردي', mockProducts, 'ar');
        expect(results).toHaveLength(1);
        expect(results[0].slug).toBe('pink-frock');
    });

    test('finds English products by description', () => {
        const results = searchProducts('parties', mockProducts, 'en');
        expect(results).toHaveLength(1);
        expect(results[0].slug).toBe('blue-dress');
    });
});
