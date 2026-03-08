'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { generalSettings, contactSettings } from '@/lib/settings';

interface FooterProps {
    locale: 'en' | 'ar';
}

export function Footer({ locale }: FooterProps) {
    const t = useTranslations();
    const shopName = locale === 'ar' ? generalSettings.shop_name_ar : generalSettings.shop_name_en;

    const quickLinks = [
        { href: `/${locale}`, label: t('nav.home') },
        { href: `/${locale}/products`, label: t('nav.shop') },
        { href: `/${locale}/about`, label: t('nav.about') },
        { href: `/${locale}/blog`, label: t('nav.blog') },
        { href: `/${locale}/contact`, label: t('nav.contact') },
    ];

    const legalLinks = [
        { href: `/${locale}/privacy-policy`, label: t('footer.privacy_policy') },
        { href: `/${locale}/terms`, label: t('footer.terms') },
    ];

    return (
        <footer className="bg-gradient-dark text-purple-200 pt-12 pb-6 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-3">
                            {shopName}
                        </h2>
                        <p className="text-purple-300 text-sm leading-relaxed max-w-xs">
                            {locale === 'ar' ? generalSettings.tagline_ar : generalSettings.tagline_en}
                        </p>
                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/${contactSettings.whatsapp_number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#128C7E] transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            {contactSettings.phone}
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gold-400 mb-4">{t('footer.quick_links')}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-purple-300 hover:text-gold-400 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-gold-400 mb-4">{t('footer.legal')}</h3>
                        <ul className="space-y-2">
                            {legalLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-purple-300 hover:text-gold-400 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {/* Social */}
                        {(contactSettings.social_links.instagram || contactSettings.social_links.facebook) && (
                            <div className="mt-6">
                                <h3 className="font-semibold text-gold-400 mb-3 text-sm">{t('footer.follow_us')}</h3>
                                <div className="flex gap-3">
                                    {contactSettings.social_links.instagram && (
                                        <a href={contactSettings.social_links.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-gold-400 transition-colors" aria-label="Instagram">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-purple-800/50 pt-6 text-center text-xs text-purple-400">
                    © {new Date().getFullYear()} {shopName}. {t('footer.rights_reserved')}
                </div>
            </div>
        </footer>
    );
}
