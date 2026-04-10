// This file contains SVG icon components that bypass the React 18 TypeScript `in` attribute bug.
// The `in` attribute is valid in SVG filter primitives but conflicts with React's DOM types.
// We use React.createElement with a type assertion to avoid the type conflict entirely.

import type { FC, SVGProps, ReactNode } from 'react';
import React from 'react';

// Type-safe SVG element creation that bypasses the `in` attribute bug
function createSvgElement(
  props: SVGProps<SVGSVGElement> & { children?: ReactNode }
) {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    ...props,
  } as any) as JSX.Element;
}

/**
 * Base SVG icon component
 */
const SvgIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return createSvgElement(props);
};

/**
 * WhatsApp icon
 */
export const WhatsAppIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 20,
  height = 20,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </SvgIcon>
);

/**
 * Close icon (X)
 */
export const CloseIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 18,
  height = 18,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </SvgIcon>
);

/**
 * Cart icon
 */
export const CartIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 28,
  height = 28,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </SvgIcon>
);

/**
 * Minus icon
 */
export const MinusIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 12,
  height = 12,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </SvgIcon>
);

/**
 * Plus icon
 */
export const PlusIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 12,
  height = 12,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </SvgIcon>
);

/**
 * Trash icon
 */
export const TrashIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 14,
  height = 14,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </SvgIcon>
);

/**
 * Mail icon
 */
export const MailIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 28,
  height = 28,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#4A1D96" strokeWidth="1.5" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </SvgIcon>
);

/**
 * Map pin icon
 */
export const MapPinIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 28,
  height = 28,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </SvgIcon>
);

/**
 * Image icon (for placeholder)
 */
export const ImageIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 64,
  height = 64,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z" />
    <path d="m10 14-1-1-3 4h12l-5-7z" />
  </SvgIcon>
);

/**
 * Search icon
 */
export const SearchIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 20,
  height = 20,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </SvgIcon>
);

/**
 * Sun icon
 */
export const SunIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 18,
  height = 18,
  className,
}) => (
  <SvgIcon
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </SvgIcon>
);

/**
 * Moon icon
 */
export const MoonIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 18,
  height = 18,
  className,
}) => (
  <SvgIcon
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </SvgIcon>
);

/**
 * Share icon
 */
export const ShareIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 16,
  height = 16,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </SvgIcon>
);

/**
 * Check icon
 */
export const CheckIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 16,
  height = 16,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </SvgIcon>
);

/**
 * Image placeholder icon
 */
export const ImagePlaceholderIcon: FC<{ width?: number | string; height?: number | string; className?: string }> = ({
  width = 48,
  height = 48,
  className,
}) => (
  <SvgIcon width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className={className}>
    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </SvgIcon>
);
