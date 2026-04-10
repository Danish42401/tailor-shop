import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Removes all scripts and dangerous HTML elements.
 *
 * @param html - Raw HTML content
 * @returns Sanitized HTML safe for rendering
 */
export function sanitizeHtml(html: string): string {
    if (!html) return '';

    // Create a DOMPurify instance if we're in the browser
    // For SSR, we'll create a sanitized version without DOMPurify
    if (typeof window !== 'undefined') {
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [
                'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3', 'h4',
                'h5', 'h6', 'ul', 'ol', 'li', 'a', 'span', 'div', 'img'
            ],
            ALLOWED_ATTR: [
                'href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'style'
            ],
            ALLOW_DATA_ATTR: false,
            SANITIZE_DOM: true,
            ALLOW_ARIA_ATTR: true,
        });
    }

    // Basic sanitization for SSR - remove script tags and dangerous attributes
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/on\w+='[^']*'/gi, '')
        .replace(/javascript:/gi, '');
}

/**
 * Creates a sanitized HTML object for dangerouslySetInnerHTML
 *
 * @param html - Raw HTML content
 * @returns Object with __html property containing sanitized content
 */
export function createSafeHtml(html: string): { __html: string } {
    return { __html: sanitizeHtml(html) };
}
