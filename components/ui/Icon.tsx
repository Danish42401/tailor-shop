import type { FC, SVGProps, ReactNode } from 'react';

/**
 * Reusable SVG icon wrapper that isolates the React 18 `in` attribute type bug.
 *
 * The SVG `in` attribute is valid for filter primitives but conflicts with
 * React 18's DOM type definitions. We suppress this once here at the component
 * boundary so no other file in the codebase needs a suppression.
 *
 * Usage:
 *   <Icon width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
 *     <line x1={18} y1={6} x2={6} y2={18} />
 *   </Icon>
 */
export function Icon({
  children,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { children?: ReactNode }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {children}
    </svg>
  );
}
