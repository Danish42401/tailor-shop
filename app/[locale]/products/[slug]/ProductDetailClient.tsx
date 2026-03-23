'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { type Product, getEffectivePrice, getDiscountPercent, getProductColors } from '@/lib/productUtils';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { ProductBadge } from '@/components/product/ProductBadge';
import { SocialShareButton } from '@/components/ui/SocialShareButton';
import { useCartStore } from '@/store/cartStore';
import { shopSettings, generalSettings, contactSettings, sizeGuideSettings } from '@/lib/settings';
import { buildNotifyMeUrl } from '@/lib/whatsapp';
import { type CartItemCustomization } from '@/store/cartStore';
import type { Locale } from '@/i18n';
import Link from 'next/link';
import { SafeHtml } from '@/components/ui/SafeHtml';

interface ProductDetailClientProps {
    product: Product;
    locale: Locale;
}

export function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
    const t = useTranslations();
    const { addItem } = useCartStore();
    const [selectedImage, setSelectedImage] = useState(0);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // Customization state
    const [sizeType, setSizeType] = useState<'age' | 'standard' | 'custom'>('age');
    const [ageSize, setAgeSize] = useState('');
    const [standardSize, setStandardSize] = useState('');
    const [customChest, setCustomChest] = useState('');
    const [customLength, setCustomLength] = useState('');
    const [customSleeves, setCustomSleeves] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedFabric, setSelectedFabric] = useState('');
    const [selectedSleeve, setSelectedSleeve] = useState('');
    const [selectedEmbroidery, setSelectedEmbroidery] = useState('');
    const [embroideryNote, setEmbroideryNote] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');

    const title = locale === 'ar' ? product.title_ar : product.title_en;
    const description = locale === 'ar' ? product.description_ar : product.description_en;
    const effectivePrice = getEffectivePrice(product);
    const discountPercent = getDiscountPercent(product);
    const colors = getProductColors(product);
    const isOOS = !product.in_stock;
    const currency = generalSettings.currency;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
    const productUrl = `${siteUrl}/${locale}/products/${product.slug}`;

    const handleAddToCart = () => {
        if (isOOS) return;

        const customization: CartItemCustomization = {
            sizeType,
            ageSize: sizeType === 'age' ? ageSize : undefined,
            standardSize: sizeType === 'standard' ? standardSize : undefined,
            customMeasurements: sizeType === 'custom' ? { chest: customChest, length: customLength, sleeves: customSleeves } : undefined,
            color: selectedColor,
            fabric: selectedFabric,
            sleeveStyle: selectedSleeve,
            embroidery: selectedEmbroidery,
            embroideryNote: embroideryNote || undefined,
            specialInstructions: specialInstructions || undefined,
        };

        addItem({
            productId: product.slug,
            name_en: product.title_en,
            name_ar: product.title_ar,
            price: effectivePrice,
            quantity: 1,
            image: product.images[0] ?? '',
            isCustom: product.is_custom,
            customization: product.is_custom ? customization : undefined,
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface dark:bg-surface-dark">
                    <CloudinaryImage
                        src={product.images[selectedImage] ?? ''}
                        alt={title}
                        width={600}
                        height={800}
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {isOOS && <ProductBadge type="out_of_stock" />}
                        {product.is_new && !isOOS && <ProductBadge type="new" />}
                        {product.sale_price && !isOOS && <ProductBadge type="sale" />}
                    </div>
                    {discountPercent && !isOOS && (
                        <span className="absolute top-3 right-3 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                            -{discountPercent}%
                        </span>
                    )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-colors
                  ${selectedImage === i ? 'border-primary' : 'border-transparent'}`}
                            >
                                <CloudinaryImage src={img} alt={`${title} ${i + 1}`} width={64} height={80} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground-dark mb-3">{title}</h1>
                    {/* Price */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-extrabold text-primary dark:text-gold-400">
                            {currency} {effectivePrice.toFixed(2)}
                        </span>
                        {product.sale_price && (
                            <span className="text-lg text-gray-400 line-through">
                                {currency} {product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {/* OOS */}
                {isOOS && (
                    <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-orange-700 dark:text-orange-400">{t('product.oos_message')}</p>
                        <a
                            href={buildNotifyMeUrl(title, contactSettings.whatsapp_number, locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#128C7E] transition-colors"
                        >
                            {t('common.notify_whatsapp')}
                        </a>
                    </div>
                )}

                {/* Color selection */}
                {colors.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-foreground dark:text-foreground-dark mb-3">{t('product.select_color')}</p>
                        <div className="flex flex-wrap gap-2">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 rounded-lg text-sm border-2 transition-colors
                    ${selectedColor === color ? 'border-primary bg-purple-50 dark:bg-purple-900/30 text-primary dark:text-purple-300' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Size / Customization (shown for custom products) */}
                {product.is_custom && (
                    <div className="space-y-4">
                        {/* Size type tabs */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-foreground dark:text-foreground-dark">{t('product.select_size')}</p>
                                <button onClick={() => setShowSizeGuide(true)} className="text-xs text-primary dark:text-gold-400 underline">
                                    {t('product.size_guide')}
                                </button>
                            </div>
                            <div className="flex rounded-xl overflow-hidden border border-purple-200 dark:border-purple-700">
                                {(['age', 'standard', 'custom'] as const).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSizeType(type)}
                                        className={`flex-1 py-2 text-xs font-medium transition-colors
                      ${sizeType === type ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/30'}`}
                                    >
                                        {type === 'age' ? t('product.age_sizes') : type === 'standard' ? t('product.standard_sizes') : t('product.custom_measurements')}
                                    </button>
                                ))}
                            </div>

                            {/* Age sizes */}
                            {sizeType === 'age' && (
                                <div className="grid grid-cols-4 gap-2 mt-3">
                                    {shopSettings.age_sizes.map(({ size }) => (
                                        <button key={size} onClick={() => setAgeSize(size)}
                                            className={`py-2 rounded-lg text-sm border transition-colors ${ageSize === size ? 'border-primary bg-purple-50 dark:bg-purple-900/30 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Standard sizes */}
                            {sizeType === 'standard' && (
                                <div className="grid grid-cols-4 gap-2 mt-3">
                                    {shopSettings.standard_sizes.map(({ size }) => (
                                        <button key={size} onClick={() => setStandardSize(size)}
                                            className={`py-2 rounded-lg text-sm border transition-colors ${standardSize === size ? 'border-primary bg-purple-50 dark:bg-purple-900/30 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Custom measurements */}
                            {sizeType === 'custom' && (
                                <div className="grid grid-cols-3 gap-3 mt-3">
                                    {[
                                        { label: t('customization.custom_chest'), value: customChest, set: setCustomChest },
                                        { label: t('customization.custom_length'), value: customLength, set: setCustomLength },
                                        { label: t('customization.custom_sleeves'), value: customSleeves, set: setCustomSleeves },
                                    ].map(field => (
                                        <div key={field.label}>
                                            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{field.label}</label>
                                            <input
                                                type="number"
                                                value={field.value}
                                                onChange={e => field.set(e.target.value)}
                                                className="input-field py-2 text-sm"
                                                placeholder="cm"
                                                min="10"
                                                max="200"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fabric */}
                        {shopSettings.fabrics.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">{t('product.select_fabric')}</p>
                                <div className="flex flex-wrap gap-2">
                                    {shopSettings.fabrics.map(f => (
                                        <button key={f.value} onClick={() => setSelectedFabric(f.value)}
                                            className={`px-4 py-2 rounded-lg text-sm border-2 transition-colors ${selectedFabric === f.value ? 'border-primary bg-purple-50 dark:bg-purple-900/30 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                            {locale === 'ar' ? f.label_ar : f.label_en}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sleeve style */}
                        {shopSettings.sleeve_styles.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">{t('product.sleeve_style')}</p>
                                <div className="flex flex-wrap gap-2">
                                    {shopSettings.sleeve_styles.map(s => (
                                        <button key={s.value} onClick={() => setSelectedSleeve(s.value)}
                                            className={`px-4 py-2 rounded-lg text-sm border-2 transition-colors ${selectedSleeve === s.value ? 'border-primary bg-purple-50 dark:bg-purple-900/30 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                            {locale === 'ar' ? s.label_ar : s.label_en}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Special instructions */}
                        <div>
                            <label className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2 block">{t('product.special_instructions')}</label>
                            <textarea
                                value={specialInstructions}
                                onChange={e => setSpecialInstructions(e.target.value)}
                                rows={3}
                                placeholder={t('product.special_instructions_placeholder')}
                                className="input-field resize-none text-sm"
                            />
                        </div>
                    </div>
                )}

                {/* Add to cart / notify */}
                {isOOS ? null : (
                    <button
                        onClick={handleAddToCart}
                        className="w-full btn-primary py-4 text-base"
                    >
                        <AnimatePresence mode="wait">
                            {addedToCart ? (
                                <motion.span key="added" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                                    ✓ {t('cart.item_added')}
                                </motion.span>
                            ) : (
                                <motion.span key="add" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                                    {t('common.add_to_cart')}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                )}

                {/* Share */}
                <SocialShareButton
                    productName={title}
                    productUrl={productUrl}
                    price={effectivePrice}
                    shopName={locale === 'ar' ? generalSettings.shop_name_ar : generalSettings.shop_name_en}
                    whatsappNumber={contactSettings.whatsapp_number}
                    locale={locale}
                    className="mt-2"
                />

                {/* Description */}
                <div className="mt-6">
                    <h2 className="font-semibold text-foreground dark:text-foreground-dark mb-3">{t('product.description')}</h2>
                    <SafeHtml
                        html={description}
                        className="text-gray-600 dark:text-gray-300"
                    />
                </div>
            </div>

            {/* Size Guide Modal */}
            <AnimatePresence>
                {showSizeGuide && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={e => { if (e.target === e.currentTarget) setShowSizeGuide(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-luxury-lg max-w-lg w-full max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold">{t('size_guide.title')}</h3>
                                <button onClick={() => setShowSizeGuide(false)} className="p-1 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-lg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            </div>

                            <h4 className="font-medium text-sm mb-2">{t('size_guide.kids_tab')}</h4>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-purple-50 dark:bg-purple-900/30">
                                        <tr>
                                            <th className="px-3 py-2">{t('size_guide.age')}</th>
                                            <th className="px-3 py-2">{t('size_guide.chest')}</th>
                                            <th className="px-3 py-2">{t('size_guide.length')}</th>
                                            <th className="px-3 py-2">{t('size_guide.sleeves')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sizeGuideSettings.age_chart.map((row, i) => (
                                            <tr key={i} className="border-b border-purple-50 dark:border-purple-900/30">
                                                <td className="px-3 py-2 font-medium">{row.age}</td>
                                                <td className="px-3 py-2">{row.chest}</td>
                                                <td className="px-3 py-2">{row.length}</td>
                                                <td className="px-3 py-2">{row.sleeves}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {sizeGuideSettings.note_en && (
                                <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                                    {locale === 'ar' ? sizeGuideSettings.note_ar : sizeGuideSettings.note_en}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
