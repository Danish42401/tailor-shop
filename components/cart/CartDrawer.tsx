'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { generalSettings } from '@/lib/settings';
import Link from 'next/link';

interface CartDrawerProps {
    locale: 'en' | 'ar';
}

export function CartDrawer({ locale }: CartDrawerProps) {
    const t = useTranslations();
    const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const currency = generalSettings.currency;
    const total = getTotalPrice();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<Element | null>(null);

    // Focus management: store trigger, focus close button on open, restore focus on close
    useEffect(() => {
        if (isOpen) {
            triggerRef.current = document.activeElement;
            // Small delay so the drawer has animated in
            const t = setTimeout(() => closeBtnRef.current?.focus(), 150);
            return () => clearTimeout(t);
        } else {
            // Return focus to the element that opened the drawer
            if (triggerRef.current && 'focus' in triggerRef.current) {
                (triggerRef.current as HTMLElement).focus();
            }
        }
    }, [isOpen]);

    // Keyboard: close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, closeCart]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.aside
                        key="drawer"
                        initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        dir={dir}
                        className={`fixed top-0 ${locale === 'ar' ? 'left-0' : 'right-0'} z-50 h-full w-full max-w-sm
                        bg-white dark:bg-surface-dark shadow-luxury-lg flex flex-col`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-purple-100 dark:border-purple-900/30">
                            <h2 className="font-bold text-lg text-foreground dark:text-foreground-dark">
                                {t('cart.title')}
                            </h2>
                            <button
                                ref={closeBtnRef}
                                onClick={closeCart}
                                aria-label={t('common.close')}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-300">
                                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t('cart.empty')}</p>
                                    <p className="text-gray-400 dark:text-gray-500 text-xs">{t('cart.empty_hint')}</p>
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {items.map(item => {
                                        const name = locale === 'ar' ? item.name_ar : item.name_en;
                                        return (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 40 }}
                                                className="flex gap-3 p-3 rounded-xl bg-surface dark:bg-background-dark"
                                            >
                                                <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0">
                                                    <CloudinaryImage src={item.image} alt={name} width={64} height={80} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-foreground dark:text-foreground-dark truncate">{name}</p>
                                                    <p className="text-xs text-primary dark:text-gold-400 font-bold mt-1">
                                                        {currency} {(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    {item.customization?.ageSize && (
                                                        <p className="text-xs text-gray-400 mt-0.5">Size: {item.customization.ageSize}</p>
                                                    )}
                                                    {item.customization?.standardSize && (
                                                        <p className="text-xs text-gray-400 mt-0.5">Size: {item.customization.standardSize}</p>
                                                    )}

                                                    {/* Qty controls */}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-7 h-7 rounded-full border border-purple-200 dark:border-purple-700 flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors"
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                                        </button>
                                                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-7 h-7 rounded-full border border-purple-200 dark:border-purple-700 flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors"
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                                        </button>

                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="ml-auto text-red-400 hover:text-red-500 transition-colors"
                                                            aria-label={t('cart.remove')}
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-4 border-t border-purple-100 dark:border-purple-900/30 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{t('cart.subtotal')}</span>
                                    <span className="font-bold text-foreground dark:text-foreground-dark">
                                        {currency} {total.toFixed(2)}
                                    </span>
                                </div>
                                <Link
                                    href={`/${locale}/checkout`}
                                    onClick={closeCart}
                                    className="block w-full text-center py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
                                >
                                    {t('cart.proceed_checkout')}
                                </Link>
                                <button
                                    onClick={closeCart}
                                    className="block w-full text-center py-2.5 rounded-xl border border-purple-200 dark:border-purple-700 text-primary dark:text-purple-300 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                                >
                                    {t('cart.continue_shopping')}
                                </button>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
