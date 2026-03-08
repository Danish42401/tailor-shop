import { getEffectivePrice, getDiscountPercent } from '@/lib/productUtils';
import type { Product } from '@/lib/productUtils';

describe('Products Utilities', () => {
    const baseProduct = {
        slug: 'test',
        title_en: 'Test',
        title_ar: 'Test',
        category: 'custom' as const,
        images: [] as string[],
        in_stock: true,
        is_new: false,
        is_best_seller: false,
        is_custom: false,
        description_en: 'Test',
        description_ar: 'Test',
        colors: [] as string[]
    };

    test('getEffectivePrice returns sale price if available', () => {
        const p: Product = { ...baseProduct, price: 100, sale_price: 80 };
        expect(getEffectivePrice(p)).toBe(80);
    });

    test('getEffectivePrice returns regular price if no sale', () => {
        const p: Product = { ...baseProduct, price: 100, sale_price: null };
        expect(getEffectivePrice(p)).toBe(100);
    });

    test('getDiscountPercent calculates correctly', () => {
        const p: Product = { ...baseProduct, price: 100, sale_price: 75 };
        expect(getDiscountPercent(p)).toBe(25);
    });

    test('getDiscountPercent returns null if no sale', () => {
        const p: Product = { ...baseProduct, price: 100, sale_price: null };
        expect(getDiscountPercent(p)).toBeNull();
    });
});
