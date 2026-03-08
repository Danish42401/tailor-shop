import fs from 'fs';
import path from 'path';

import { type Product } from './productUtils';
export type { Product };

const productsDir = path.join(process.cwd(), 'content', 'products');

export function getAllProducts(): Product[] {
    if (!fs.existsSync(productsDir)) return [];

    const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));

    return files.map(file => {
        const slug = file.replace('.json', '');
        const raw = fs.readFileSync(path.join(productsDir, file), 'utf-8');
        const data = JSON.parse(raw) as Omit<Product, 'slug'>;
        return { slug, ...data };
    });
}

export function getProduct(slug: string): Product | undefined {
    const filePath = path.join(productsDir, `${slug}.json`);
    if (!fs.existsSync(filePath)) return undefined;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw) as Omit<Product, 'slug'>;
    return { slug, ...data };
}

export function getProductsByCategory(category: Product['category']): Product[] {
    return getAllProducts().filter(p => p.category === category);
}

export function getNewArrivals(limit = 8): Product[] {
    return getAllProducts()
        .filter(p => p.is_new)
        .slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
    return getAllProducts()
        .filter(p => p.is_best_seller)
        .slice(0, limit);
}

export function getSaleProducts(limit = 8): Product[] {
    return getAllProducts()
        .filter(p => p.sale_price !== null && p.sale_price !== undefined)
        .slice(0, limit);
}

export function getRelatedProducts(currentSlug: string, category: string, limit = 4): Product[] {
    return getAllProducts()
        .filter(p => p.slug !== currentSlug && p.category === category)
        .slice(0, limit);
}

