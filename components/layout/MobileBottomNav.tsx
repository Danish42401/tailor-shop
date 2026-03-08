'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cartStore';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

interface MobileBottomNavProps {
    locale: 'en' | 'ar';
}

export function MobileBottomNav({ locale }: MobileBottomNavProps) {
    const t = useTranslations('nav');
    const { getTotalItems, toggleCart } = useCartStore();
    const totalItems = getTotalItems();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    const navItems = [
        {
            href: `/${locale}`,
            label: t('home'),
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
        },
        {
            href: `/${locale}/products`,
            label: t('shop'),
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
            ),
        },
        {
            href: null,
            label: t('cart'),
            badge: totalItems,
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            ),
            onClick: toggleCart,
        },
        {
            href: `/${locale}/contact`,
            label: t('contact'),
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.16a16 16 0 006.29 6.29l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
            ),
        },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-surface-dark border-t border-purple-100 dark:border-purple-900/50 safe-bottom">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item, i) => {
                    const active = item.href ? isActive(item.href) : false;
                    const content = (
                        <div className="flex flex-col items-center gap-0.5 relative">
                            <span className={clsx(active ? 'text-primary dark:text-gold-400' : 'text-gray-400 dark:text-purple-500')}>
                                {item.icon}
                            </span>
                            <span className={clsx('text-[10px] font-medium', active ? 'text-primary dark:text-gold-400' : 'text-gray-400 dark:text-purple-500')}>
                                {item.label}
                            </span>
                            {(item.badge ?? 0) > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center">
                                    {(item.badge ?? 0) > 9 ? '9+' : item.badge}
                                </span>
                            )}
                        </div>
                    );

                    if (item.onClick) {
                        return (
                            <button key={i} onClick={item.onClick} className="flex flex-col items-center py-2 px-3 min-w-[60px]" aria-label={item.label}>
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link key={i} href={item.href!} className="flex flex-col items-center py-2 px-3 min-w-[60px]">
                            {content}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
