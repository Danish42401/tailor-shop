const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dyxnglxdj';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

export interface CloudinaryTransformOptions {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'avif';
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'crop';
    gravity?: 'auto' | 'face' | 'center';
    aspectRatio?: string;
}

function buildTransformString(options: CloudinaryTransformOptions): string {
    const parts: string[] = [];

    if (options.width) parts.push(`w_${options.width}`);
    if (options.height) parts.push(`h_${options.height}`);
    if (options.quality) parts.push(`q_${options.quality}`);
    if (options.format) parts.push(`f_${options.format}`);
    if (options.crop) parts.push(`c_${options.crop}`);
    if (options.gravity) parts.push(`g_${options.gravity}`);
    if (options.aspectRatio) parts.push(`ar_${options.aspectRatio}`);

    return parts.join(',');
}

/**
 * Build an optimized Cloudinary URL for a given public ID.
 * Handles both full URLs and bare public IDs.
 */
export function getCloudinaryUrl(
    publicIdOrUrl: string,
    options: CloudinaryTransformOptions = {}
): string {
    if (!publicIdOrUrl) return '/images/placeholder-product.svg';

    try {
        // If it's already a full Cloudinary URL, extract the public ID
        if (publicIdOrUrl.startsWith('http')) {
            const match = publicIdOrUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/);
            if (!match || !match[1]) return '/images/placeholder-product.svg';
            publicIdOrUrl = match[1];
        }

        // Ensure extracted ID is valid
        if (!publicIdOrUrl.trim()) return '/images/placeholder-product.svg';

        const defaults: CloudinaryTransformOptions = {
            format: 'auto',
            quality: 'auto',
            ...options,
        };

        const transform = buildTransformString(defaults);
        const transformSegment = transform ? `/${transform}` : '';

        return `${BASE_URL}/image/upload${transformSegment}/${publicIdOrUrl}`;
    } catch (err) {
        console.error('[cloudinary] Failed to build URL for:', publicIdOrUrl, err);
        return '/images/placeholder-product.svg';
    }
}

/** Generate an OG image (1200x630) from a Cloudinary URL or public ID */
export function getCloudinaryOGImage(publicIdOrUrl: string): string {
    return getCloudinaryUrl(publicIdOrUrl, {
        width: 1200,
        height: 630,
        crop: 'fill',
        gravity: 'auto',
        format: 'auto',
        quality: 85,
    });
}

/** Generate a product thumbnail */
export function getProductThumbnail(publicIdOrUrl: string, size = 400): string {
    return getCloudinaryUrl(publicIdOrUrl, {
        width: size,
        height: size,
        crop: 'fill',
        gravity: 'auto',
        format: 'auto',
        quality: 'auto',
    });
}
