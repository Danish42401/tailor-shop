'use client';

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

interface CloudinaryImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
    fill?: boolean;
    sizes?: string;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
}

/**
 * Universal image component — uses next-cloudinary for Cloudinary URLs,
 * falls back to next/image for local/external images.
 * Zero <img> tags in the codebase.
 */
export function CloudinaryImage({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    fill = false,
    sizes,
    crop = 'fill',
}: CloudinaryImageProps) {
    // If blank/placeholder, show a purple gradient placeholder
    if (!src) {
        return (
            <div
                className={`bg-gradient-luxury flex items-center justify-center ${className ?? ''}`}
                style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
                aria-label={alt}
            >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        );
    }

    // Cloudinary URLs
    if (src.includes('cloudinary.com') || !src.startsWith('/') && !src.startsWith('http')) {
        const publicId = src.includes('cloudinary.com')
            ? src.replace(/.*\/upload\/(?:v\d+\/)?/, '')
            : src;

        return (
            <CldImage
                src={publicId}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
                priority={priority}
                className={className}
                fill={fill}
                crop={crop}
                format="auto"
                quality="auto"
            />
        );
    }

    // Local or external non-Cloudinary images
    return (
        <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
            priority={priority}
            className={className}
        />
    );
}
