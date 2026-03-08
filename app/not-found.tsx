import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { contactSettings } from '@/lib/settings';

export default function NotFoundPage() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-md mx-auto">
                <div className="text-8xl font-black text-purple-100 dark:text-purple-900 mb-2 select-none">404</div>
                <h1 className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-3">Page Not Found</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/en/products" className="btn-primary">Browse All Products</Link>
                    <a
                        href={`https://wa.me/${contactSettings.whatsapp_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#25D366] text-[#25D366] font-semibold hover:bg-[#25D366] hover:text-white transition-colors"
                    >
                        Contact via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
