import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { generateBaseMetadata } from '@/lib/seo';
import { generalSettings, contactSettings } from '@/lib/settings';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';

interface PageProps { params: { locale: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const base = generateBaseMetadata(params.locale as Locale);
    return { ...base, title: params.locale === 'ar' ? 'من نحن' : 'About Us' };
}

export default async function AboutPage({ params }: PageProps) {
    const locale = params.locale as Locale;
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale });
    const shopName = locale === 'ar' ? generalSettings.shop_name_ar : generalSettings.shop_name_en;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="section-title mb-8">{t('about.title')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl">
                {/* Story */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-primary dark:text-gold-400">{t('about.our_story')}</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {locale === 'ar' ? (
                            <>
                                <p>في <strong className="text-foreground dark:text-foreground-dark">{shopName}</strong>، نؤمن بأن كل طفلة تستحق فستاناً يجعلها تتألق في كل مناسبة.</p>
                                <p>بدأنا رحلتنا من شغف عميق بالتصميم والخياطة الدقيقة، لنقدم لك أجمل تشكيلات الفساتين من فساتين الأطفال الرائعة إلى تصاميم الأم والابنة المتناسقة.</p>
                                <p>كل قطعة نصنعها تحمل لمسة يدوية ودقة عالية في التفاصيل، لأن أطفالكم يستحقون الأفضل دائمًا.</p>
                            </>
                        ) : (
                            <>
                                <p>At <strong className="text-foreground dark:text-foreground-dark">{shopName}</strong>, we believe every child deserves to shine at every occasion.</p>
                                <p>Our journey began from a deep passion for design and meticulous tailoring. From stunning children's frocks to coordinated mother-daughter matching outfits, we craft each piece with love.</p>
                                <p>Every garment is handcrafted with the highest attention to detail, because your children deserve only the best.</p>
                            </>
                        )}
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {[
                            { icon: '✂️', text_en: 'Handcrafted Quality', text_ar: 'جودة يدوية' },
                            { icon: '🎨', text_en: 'Custom Designs', text_ar: 'تصاميم خاصة' },
                            { icon: '💛', text_en: 'Made With Love', text_ar: 'صنع بحب' },
                            { icon: '🚀', text_en: 'Fast Delivery', text_ar: 'توصيل سريع' },
                        ].map(val => (
                            <div key={val.icon} className="flex items-center gap-3 p-3 rounded-xl bg-surface dark:bg-surface-dark">
                                <span className="text-2xl">{val.icon}</span>
                                <span className="text-sm font-medium text-foreground dark:text-foreground-dark">
                                    {locale === 'ar' ? val.text_ar : val.text_en}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-luxury rounded-2xl p-8 text-white text-center">
                    <div className="text-6xl mb-4">👗</div>
                    <h3 className="text-xl font-bold mb-3">{locale === 'ar' ? 'هل تريدين طلباً مخصصاً؟' : 'Want a Custom Order?'}</h3>
                    <p className="text-purple-200 text-sm mb-6 leading-relaxed">
                        {locale === 'ar'
                            ? 'تواصلي معنا عبر واتساب وسنصمم لك الفستان المثالي بمقاسك وذوقك.'
                            : 'Contact us on WhatsApp and we\'ll design the perfect dress to your measurements and taste.'}
                    </p>
                    <a
                        href={`https://wa.me/${contactSettings.whatsapp_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors"
                    >
                        {locale === 'ar' ? 'تواصل الآن' : 'Chat Now'}
                    </a>
                </div>
            </div>
        </div>
    );
}
