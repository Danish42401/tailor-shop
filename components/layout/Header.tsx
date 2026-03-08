'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import { generalSettings } from '@/lib/settings';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    locale: 'en' | 'ar';
}

export function Header({ locale }: HeaderProps) {
    const t = useTranslations();
    const { getTotalItems, toggleCart } = useCartStore();
    const { openSearch } = useUIStore();
    const totalItems = getTotalItems();
    const shopName = locale === 'ar' ? generalSettings.shop_name_ar : generalSettings.shop_name_en;

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/30 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo / Shop Name */}
                <Link
                    href={`/${locale}`}
                    className="font-bold text-xl text-primary dark:text-purple-300 shrink-0 tracking-tight"
                >
                    {generalSettings.logo ? (
                        <span>{shopName}</span>
                    ) : (
                        <span className="bg-gradient-luxury bg-clip-text text-transparent">{shopName}</span>
                    )}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href={`/${locale}`} className="text-foreground dark:text-foreground-dark hover:text-primary dark:hover:text-gold-400 transition-colors">{t('nav.home')}</Link>
                    <Link href={`/${locale}/products`} className="text-foreground dark:text-foreground-dark hover:text-primary dark:hover:text-gold-400 transition-colors">{t('nav.shop')}</Link>
                    <Link href={`/${locale}/blog`} className="text-foreground dark:text-foreground-dark hover:text-primary dark:hover:text-gold-400 transition-colors">{t('nav.blog')}</Link>
                    <Link href={`/${locale}/about`} className="text-foreground dark:text-foreground-dark hover:text-primary dark:hover:text-gold-400 transition-colors">{t('nav.about')}</Link>
                    <Link href={`/${locale}/contact`} className="text-foreground dark:text-foreground-dark hover:text-primary dark:hover:text-gold-400 transition-colors">{t('nav.contact')}</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Search */}
                    <button
                        onClick={openSearch}
                        aria-label={t('common.search')}
                        className="w-9 h-9 rounded-full flex items-center justify-center
                       bg-purple-50 dark:bg-purple-900/50
                       text-purple-700 dark:text-purple-300
                       hover:bg-purple-100 dark:hover:bg-purple-800
                       transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    </button>

                    {/* Language switcher */}
                    <Link
                        href={locale === 'en' ? '/ar' : '/en'}
                        className="px-3 py-1.5 rounded-full text-xs font-bold
                       bg-purple-50 dark:bg-purple-900/50
                       text-purple-700 dark:text-purple-300
                       hover:bg-purple-100 dark:hover:bg-purple-800
                       transition-colors"
                    >
                        {locale === 'en' ? 'عربي' : 'EN'}
                    </Link>

                    {/* Dark mode */}
                    <DarkModeToggle />

                    {/* Cart */}
                    <button
                        onClick={toggleCart}
                        aria-label={t('nav.cart')}
                        className="relative w-9 h-9 rounded-full flex items-center justify-center
                       bg-primary text-white
                       hover:bg-primary-hover transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    key="badge"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center"
                                >
                                    {totalItems > 9 ? '9+' : totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </header>
    );
}
