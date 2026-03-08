export interface Product {
    slug: string;
    title_en: string;
    title_ar: string;
    price: number;
    sale_price: number | null;
    category: 'kids-frocks' | 'mother-daughter' | 'custom' | 'ready-made' | 'special-occasion';
    images: string[];
    is_custom: boolean;
    is_new: boolean;
    is_best_seller: boolean;
    in_stock: boolean;
    colors: string[];
    description_en: string;
    description_ar: string;
}

export function getEffectivePrice(product: Product): number {
    return product.sale_price ?? product.price;
}

export function getDiscountPercent(product: Product): number | null {
    if (!product.sale_price) return null;
    return Math.round(((product.price - product.sale_price) / product.price) * 100);
}

export function getProductColors(product: Product): string[] {
    if (!product.colors) return [];
    if (Array.isArray(product.colors)) return product.colors;
    return String(product.colors).split(',').map(c => c.trim()).filter(Boolean);
}
