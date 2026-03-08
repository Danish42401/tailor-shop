'use client';

import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

type BadgeType = 'new' | 'sale' | 'best_seller' | 'custom' | 'out_of_stock';

interface ProductBadgeProps {
    type: BadgeType;
    className?: string;
}

export function ProductBadge({ type, className }: ProductBadgeProps) {
    const t = useTranslations('common');

    const config: Record<BadgeType, { label: string; class: string }> = {
        new: { label: t('new'), class: 'bg-emerald-500 text-white' },
        sale: { label: t('sale'), class: 'bg-rose-500 text-white' },
        best_seller: { label: t('best_seller'), class: 'bg-amber-500 text-white' },
        custom: { label: t('custom'), class: 'bg-purple-600 text-white' },
        out_of_stock: { label: t('out_of_stock'), class: 'bg-gray-500 text-white' },
    };

    const { label, class: badgeClass } = config[type];

    return (
        <span
            className={clsx(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                badgeClass,
                className
            )}
        >
            {label}
        </span>
    );
}
