import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Removes all scripts and dangerous HTML elements.
 *
 * @param html - Raw HTML content
 * @returns Sanitized HTML safe for rendering
 */
export function sanitizeHtml(html: string): string {
    if (!html) return '';

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

/**
 * Creates a sanitized HTML object for dangerouslySetInnerHTML
 *
 * @param html - Raw HTML content
 * @returns Object with __html property containing sanitized content
 */
export function createSafeHtml(html: string): { __html: string } {
    return { __html: sanitizeHtml(html) };
}
