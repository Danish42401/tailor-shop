import { sanitizeHtml } from '@/lib/sanitize';
import { cn } from '@/lib/utils';

interface SafeHtmlProps {
    /** Raw HTML content to render */
    html: string;
    /** Additional CSS classes */
    className?: string;
    /** HTML tag to render as (default: div) */
    as?: 'div' | 'span' | 'p' | 'article' | 'section';
}

/**
 * SafeHtml Component
 *
 * Renders HTML content safely by sanitizing it first.
 * Prevents XSS attacks by removing scripts and dangerous elements.
 *
 * Usage:
 * ```tsx
 * <SafeHtml html={product.description} />
 * ```
 */
export function SafeHtml({ html, className, as: Component = 'div' }: SafeHtmlProps) {
    if (!html) return null;

    const sanitized = sanitizeHtml(html);

    return (
        <Component
            className={cn('prose prose-sm dark:prose-invert prose-purple max-w-none', className)}
            dangerouslySetInnerHTML={{ __html: sanitized }}
        />
    );
}
