import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { generateBaseMetadata } from '@/lib/seo';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';

interface PageProps { params: { locale: string; slug: string } }

export async function generateStaticParams() {
    const posts = getBlogPosts();
    const locales = ['en', 'ar'];
    const params: { locale: string; slug: string }[] = [];

    locales.forEach(locale => {
        posts.forEach(post => {
            params.push({ locale, slug: post.slug });
        });
    });

    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug);
    if (!post) return generateBaseMetadata(params.locale as Locale);

    const base = generateBaseMetadata(params.locale as Locale);
    const title = params.locale === 'ar' ? post.title_ar : post.title_en;
    return { ...base, title: `${title} | Noor Boutique Blog` };
}

export default async function BlogPostPage({ params }: PageProps) {
    const locale = params.locale as Locale;
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale });

    const post = getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const title = locale === 'ar' ? post.title_ar : post.title_en;
    const body = locale === 'ar' ? post.body_ar : post.body_en;

    const dateObj = new Date(post.date);
    const formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric', month: 'long', day: 'numeric'
    }).format(dateObj);

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl fade-in">
            {/* Breadcrumb / Back */}
            <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary/70 hover:text-primary dark:text-gold-400/80 dark:hover:text-gold-400 mb-8 transition-colors"
            >
                <span className={`transform ${locale === 'ar' ? 'rotate-180' : ''}`}>←</span>
                {t('blog.back_to_blog')}
            </Link>

            {/* Header */}
            <header className="mb-12 text-center">
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-4">
                    {t('blog.published')} • {formattedDate}
                </p>
                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground dark:text-foreground-dark leading-tight mb-8">
                    {title}
                </h1>
            </header>

            {/* Cover Image */}
            {post.cover_image && (
                <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] rounded-2xl overflow-hidden mb-12 shadow-xl bg-purple-50 dark:bg-purple-900/20">
                    <CloudinaryImage
                        src={post.cover_image}
                        alt={title}
                        width={1280}
                        height={480}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Content Body */}
            <div className="prose prose-lg prose-purple dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:text-primary dark:prose-headings:text-gold-400
                            prose-a:text-primary dark:prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-xl prose-img:shadow-md">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {body}
                </ReactMarkdown>
            </div>

            {/* Footer / Share (Optional Extension) */}
            <div className="mt-16 pt-8 border-t border-purple-100 dark:border-purple-900/50 flex justify-center">
                <Link href={`/${locale}/products`} className="btn-primary">
                    {t('not_found.browse_products')}
                </Link>
            </div>
        </article>
    );
}
