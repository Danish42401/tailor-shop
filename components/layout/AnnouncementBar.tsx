'use client';

import { useUIStore } from '@/store/uiStore';
import { announcementSettings } from '@/lib/settings';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface AnnouncementBarProps {
    locale: 'en' | 'ar';
}

export function AnnouncementBar({ locale }: AnnouncementBarProps) {
    const { isAnnouncementDismissed, dismissAnnouncement } = useUIStore();
    const t = useTranslations('common');
    const s = announcementSettings;

    if (!s.enabled || isAnnouncementDismissed) return null;

    const message = locale === 'ar' ? s.text_ar : s.text_en;

    return (
        <div
            className="relative py-2 px-4 text-center text-sm font-medium"
            style={{ backgroundColor: s.backgroundColor, color: s.textColor }}
        >
            {s.linkUrl ? (
                <Link href={s.linkUrl} className="hover:underline">{message}</Link>
            ) : (
                <span>{message}</span>
            )}
        </div>
    );
}
