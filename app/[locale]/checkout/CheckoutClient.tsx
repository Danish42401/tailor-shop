'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cartStore';
import { CheckoutForm, type CheckoutFormValues } from '@/components/checkout/CheckoutForm';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';
import { generalSettings, contactSettings, shopSettings } from '@/lib/settings';
import type { Locale } from '@/i18n';

interface CheckoutClientProps { locale: Locale }

export function CheckoutClient({ locale }: CheckoutClientProps) {
    const t = useTranslations();
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = getTotalPrice();
    const currency = generalSettings.currency;

    const handleSubmit = async (formData: CheckoutFormValues) => {
        setIsSubmitting(true);

        const deliveryMethod = shopSettings.delivery_methods.find(m => m.value === formData.deliveryMethod);
        const deliveryLabel = deliveryMethod
            ? (locale === 'ar' ? deliveryMethod.label_ar : deliveryMethod.label_en)
            : formData.deliveryMethod;

        // Build WhatsApp URL
        const waUrl = buildWhatsAppOrderUrl(
            items,
            formData,
            deliveryLabel,
            locale,
            contactSettings.whatsapp_number
        );

        // Send to owner via API (non-blocking)
        try {
            await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, formData, total, deliveryLabel }),
            });
        } catch { /* email is best-effort */ }

        // Open WhatsApp synchronously to bypass popup blockers
        window.open(waUrl, '_blank');

        // Clear cart then redirect to confirmation page
        clearCart();
        router.push(`/${locale}/order-confirmation`);

        setIsSubmitting(false);
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 mb-6">{t('cart.empty')}</p>
                <a href={`/${locale}/products`} className="btn-primary">{t('cart.continue_shopping')}</a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
                <h2 className="text-xl font-bold mb-6 text-foreground dark:text-foreground-dark">{t('checkout.customer_info')}</h2>
                <CheckoutForm locale={locale} onSubmit={handleSubmit} />
            </div>

            {/* Right: Order Summary */}
            <div>
                <h2 className="text-xl font-bold mb-6 text-foreground dark:text-foreground-dark">{t('checkout.order_summary')}</h2>
                <div className="card p-6 space-y-4">
                    {items.map(item => {
                        const name = locale === 'ar' ? item.name_ar : item.name_en;
                        return (
                            <div key={item.id} className="flex gap-3">
                                <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                    <CloudinaryImage src={item.image} alt={name} width={64} height={80} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground dark:text-foreground-dark truncate">{name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{t('checkout.items_count', { count: item.quantity })}</p>
                                    {item.customization?.ageSize && <p className="text-xs text-purple-500 mt-0.5">Size: {item.customization.ageSize}</p>}
                                    {item.customization?.color && <p className="text-xs text-purple-500 mt-0.5">Color: {item.customization.color}</p>}
                                </div>
                                <span className="text-sm font-bold text-primary dark:text-gold-400 flex-shrink-0">
                                    {currency} {(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        );
                    })}

                    <div className="border-t border-purple-100 dark:border-purple-900/30 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{t('cart.subtotal')}</span>
                            <span className="font-extrabold text-lg text-primary dark:text-gold-400">
                                {currency} {total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* WhatsApp Order Button */}
                    <button
                        form="checkout-form"
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => (document.getElementById('checkout-submit') as HTMLInputElement)?.click()}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl
                       bg-[#25D366] text-white font-bold text-base
                       hover:bg-[#128C7E] disabled:opacity-60 transition-colors mt-2"
                    >
                        {isSubmitting ? (
                            <span className="animate-spin">⏳</span>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        )}
                        {t('checkout.whatsapp_order')}
                    </button>
                </div>
            </div>
        </div>
    );
}
