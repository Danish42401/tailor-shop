'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { type Product, getEffectivePrice, getDiscountPercent } from '@/lib/productUtils';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { ProductBadge } from './ProductBadge';
import { useCartStore } from '@/store/cartStore';
import { generalSettings, contactSettings } from '@/lib/settings';
import { buildNotifyMeUrl } from '@/lib/whatsapp';

interface ProductCardProps {
    product: Product;
    locale: 'en' | 'ar';
}

export function ProductCard({ product, locale }: ProductCardProps) {
    const t = useTranslations();
    const { addItem } = useCartStore();

    const title = locale === 'ar' ? product.title_ar : product.title_en;
    const effectivePrice = getEffectivePrice(product);
    const discountPercent = getDiscountPercent(product);
    const isOOS = !product.in_stock;
    const currency = generalSettings.currency;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isOOS || product.is_custom) return;
        addItem({
            productId: product.slug,
            name_en: product.title_en,
            name_ar: product.title_ar,
            price: effectivePrice,
            quantity: 1,
            image: product.images[0] ?? '',
            isCustom: false,
        });
    };

    const notifyUrl = buildNotifyMeUrl(
        title,
        contactSettings.whatsapp_number,
        locale
    );

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative flex flex-col rounded-2xl overflow-hidden
                 bg-white dark:bg-surface-dark
                 shadow-sm hover:shadow-luxury
                 border border-purple-50 dark:border-purple-900/30
                 transition-shadow duration-300"
        >
            {/* Image */}
            <Link
                href={isOOS ? '#' : `/${locale}/products/${product.slug}`}
                className={`relative aspect-[3/4] overflow-hidden ${isOOS ? 'cursor-default' : ''}`}
                tabIndex={isOOS ? -1 : 0}
            >
                <CloudinaryImage
                    src={product.images[0] ?? ''}
                    alt={title}
                    width={400}
                    height={533}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105
                     ${isOOS ? 'grayscale opacity-50' : ''}`}
                />

                {/* OOS Overlay */}
                {isOOS && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="bg-black/70 text-white text-sm font-bold px-4 py-2 rounded-full">
                            {t('common.out_of_stock')}
                        </span>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 rtl:right-2 ltr:left-2 flex flex-col gap-1">
                    {isOOS && <ProductBadge type="out_of_stock" />}
                    {!isOOS && product.is_new && <ProductBadge type="new" />}
                    {!isOOS && product.is_best_seller && <ProductBadge type="best_seller" />}
                    {!isOOS && product.sale_price && <ProductBadge type="sale" />}
                    {!isOOS && product.is_custom && <ProductBadge type="custom" />}
                </div>

                {/* Discount % */}
                {discountPercent && !isOOS && (
                    <span className="absolute top-2 rtl:left-2 ltr:right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        -{discountPercent}%
                    </span>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col p-3 gap-2 flex-1">
                <Link href={isOOS ? '#' : `/${locale}/products/${product.slug}`} tabIndex={isOOS ? -1 : 0}>
                    <h3 className="text-sm font-semibold text-foreground dark:text-foreground-dark leading-tight line-clamp-2 hover:text-primary dark:hover:text-gold-400 transition-colors">
                        {title}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className={`font-bold text-primary dark:text-gold-400 ${isOOS ? 'line-through text-gray-400 dark:text-gray-600' : ''}`}>
                        {currency} {effectivePrice.toFixed(2)}
                    </span>
                    {product.sale_price && !isOOS && (
                        <span className="text-sm text-gray-400 line-through">
                            {currency} {product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                    {isOOS ? (
                        <a
                            href={notifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4
                         rounded-xl border-2 border-gray-200 dark:border-gray-700
                         text-gray-500 dark:text-gray-400 text-sm font-medium
                         hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                        >
                            {t('common.notify_me')}
                        </a>
                    ) : product.is_custom ? (
                        <Link
                            href={`/${locale}/products/${product.slug}`}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4
                         rounded-xl bg-purple-50 dark:bg-purple-900/30
                         text-primary dark:text-purple-300 text-sm font-medium
                         hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                        >
                            {t('common.view_details')}
                        </Link>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4
                         rounded-xl bg-primary text-white text-sm font-medium
                         hover:bg-primary-hover active:scale-95 transition-all duration-150"
                        >
                            {t('common.add_to_cart')}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
