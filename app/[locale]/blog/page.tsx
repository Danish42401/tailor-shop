import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { generateBaseMetadata } from '@/lib/seo';
import { getBlogPosts } from '@/lib/blog';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import Link from 'next/link';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';

interface PageProps { params: { locale: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const base = generateBaseMetadata(params.locale as Locale);
    return { ...base, title: params.locale === 'ar' ? 'المدونة' : 'Blog' };
}

export default async function BlogPage({ params }: PageProps) {
    const locale = params.locale as Locale;
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale });

    const posts = getBlogPosts();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-primary dark:text-gold-400 mb-12 text-center fade-in">
                {t('blog.title')}
            </h1>

            {posts.length === 0 ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    <p>{locale === 'ar' ? 'لا توجد مقالات حالياً' : 'No posts available yet.'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => {
                        const title = locale === 'ar' ? post.title_ar : post.title_en;
                        const dateObj = new Date(post.date);
                        const formattedDate = new Intl.DateTimeFormat(locale, {
                            year: 'numeric', month: 'long', day: 'numeric'
                        }).format(dateObj);

                        return (
                            <Link
                                href={`/${locale}/blog/${post.slug}`}
                                key={post.slug}
                                className="group block card overflow-hidden hover:shadow-2xl transition-all duration-300"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="relative aspect-[4/3] bg-purple-50 dark:bg-purple-900/20 overflow-hidden">
                                    {post.cover_image ? (
                                        <CloudinaryImage
                                            src={post.cover_image}
                                            alt={title}
                                            width={600}
                                            height={450}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-purple-200 dark:text-purple-800">
                                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z" /><path d="m10 14-1-1-3 4h12l-5-7z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <p className="text-xs font-semibold text-primary/70 dark:text-gold-400/80 mb-2 uppercase tracking-wider">
                                        {formattedDate}
                                    </p>
                                    <h2 className="text-xl font-bold text-foreground dark:text-foreground-dark group-hover:text-primary dark:group-hover:text-gold-400 mb-3 line-clamp-2 transition-colors">
                                        {title}
                                    </h2>
                                    <div className="flex items-center text-sm font-semibold text-primary dark:text-gold-400 gap-1 mt-4">
                                        {t('blog.read_more')}
                                        <span className={`transform transition-transform group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>→</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
