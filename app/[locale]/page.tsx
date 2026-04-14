import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getAllProducts, getNewArrivals, getBestSellers } from '@/lib/products';
import { homepageSettings, generalSettings, contactSettings } from '@/lib/settings';
import { ProductGrid } from '@/components/product/ProductGrid';
import { generateBaseMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';
import Link from 'next/link';

interface PageProps { params: { locale: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return generateBaseMetadata(params.locale as Locale);
}

export default async function HomePage({ params }: PageProps) {
    const locale = params.locale as Locale;
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale });
    const hp = homepageSettings;
    const shopName = locale === 'ar' ? generalSettings.shop_name_ar : generalSettings.shop_name_en;
    const tagline = locale === 'ar' ? generalSettings.tagline_ar : generalSettings.tagline_en;

    const newArrivals = hp.new_arrivals.enabled ? getNewArrivals(hp.new_arrivals.limit) : [];
    const bestSellers = hp.best_sellers.enabled ? getBestSellers(hp.best_sellers.limit) : [];

    const categories = [
        { slug: 'kids-frocks', label_en: 'Kids Frocks', label_ar: 'فساتين الأطفال', emoji: '👗' },
        { slug: 'mother-daughter', label_en: 'Mother-Daughter', label_ar: 'الأم والابنة', emoji: '👩‍👧' },
        { slug: 'custom', label_en: 'Custom Orders', label_ar: 'طلبات خاصة', emoji: '✂️' },
        { slug: 'special-occasion', label_en: 'Special Occasion', label_ar: 'مناسبات خاصة', emoji: '✨' },
    ];

    return (
        <>
            {/* Hero */}
            {hp.hero.enabled && (
                <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-luxury">
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #6D28D9 0%, transparent 50%)' }}
                    />
                    <div className="container mx-auto px-4 py-20 text-center text-white relative z-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                            <span className="bg-gradient-gold bg-clip-text text-transparent">{hp.hero.heading_en}</span>
                            {locale === 'ar' && (
                                <span className="block text-3xl sm:text-4xl mt-2 text-purple-200">{hp.hero.heading_ar}</span>
                            )}
                        </h1>
                        <p className="text-lg sm:text-xl text-purple-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {locale === 'ar' ? hp.hero.subheading_ar : hp.hero.subheading_en}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={`/${locale}${hp.hero.cta_link}`} className="btn-gold text-lg px-8 py-4">
                                {locale === 'ar' ? hp.hero.cta_ar : hp.hero.cta_en}
                            </Link>
                            <a href={`https://wa.me/${contactSettings.whatsapp_number}`} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                {t('contact.whatsapp_us')}
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* How To Order */}
            {hp.how_to_order.enabled && (
                <section className="py-16 bg-surface dark:bg-surface-dark">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title text-center mb-12">
                            {locale === 'ar' ? hp.how_to_order.title_ar : hp.how_to_order.title_en}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {[
                                { num: '01', titleKey: 'step1_title', descKey: 'step1_desc', icon: '🛍️' },
                                { num: '02', titleKey: 'step2_title', descKey: 'step2_desc', icon: '🛒' },
                                { num: '03', titleKey: 'step3_title', descKey: 'step3_desc', icon: '💬' },
                            ].map(step => (
                                <div key={step.num} className="text-center p-6 rounded-2xl bg-white dark:bg-background-dark shadow-sm border border-purple-50 dark:border-purple-900/30">
                                    <div className="text-5xl mb-4">{step.icon}</div>
                                    <div className="text-3xl font-black text-accent mb-2">{step.num}</div>
                                    <h3 className="font-bold text-lg text-foreground dark:text-foreground-dark mb-2">
                                        {t(`how_to_order.${step.titleKey}` as Parameters<typeof t>[0])}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                        {t(`how_to_order.${step.descKey}` as Parameters<typeof t>[0])}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Categories */}
            {hp.categories_grid.enabled && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title text-center mb-10">
                            {locale === 'ar' ? hp.categories_grid.title_ar : hp.categories_grid.title_en}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {categories.map(cat => (
                                <Link
                                    key={cat.slug}
                                    href={`/${locale}/category/${cat.slug}`}
                                    className="group flex flex-col items-center justify-center p-6 rounded-2xl
                             bg-gradient-luxury text-white
                             hover:shadow-luxury-lg hover:scale-[1.02] transition-all duration-200"
                                >
                                    <span className="text-4xl mb-3">{cat.emoji}</span>
                                    <span className="text-sm font-semibold text-center leading-tight">
                                        {locale === 'ar' ? cat.label_ar : cat.label_en}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* New Arrivals */}
            {hp.new_arrivals.enabled && newArrivals.length > 0 && (
                <section className="py-16 bg-surface dark:bg-surface-dark">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="section-title gold-underline">
                                {locale === 'ar' ? hp.new_arrivals.title_ar : hp.new_arrivals.title_en}
                            </h2>
                            <Link href={`/${locale}/products`} className="text-primary dark:text-accent text-sm font-medium hover:underline">
                                {t('common.see_all')}
                            </Link>
                        </div>
                        <ProductGrid products={newArrivals} locale={locale} />
                    </div>
                </section>
            )}

            {/* Best Sellers */}
            {hp.best_sellers.enabled && bestSellers.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="section-title gold-underline">
                                {locale === 'ar' ? hp.best_sellers.title_ar : hp.best_sellers.title_en}
                            </h2>
                            <Link href={`/${locale}/products`} className="text-primary dark:text-accent text-sm font-medium hover:underline">
                                {t('common.see_all')}
                            </Link>
                        </div>
                        <ProductGrid products={bestSellers} locale={locale} />
                    </div>
                </section>
            )}
        </>
    );
}
