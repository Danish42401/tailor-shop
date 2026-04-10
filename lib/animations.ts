import type { TargetAndTransition } from 'framer-motion';

/**
 * Type-safe Framer Motion animation variants.
 * Eliminates the need for `as any` casts on motion component props.
 */

/**
 * Common animation presets for reuse across the application.
 * All presets are typed as TargetAndTransition for Framer Motion compatibility.
 */
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideInRight: (distance: string = '100%') => ({
    initial: { x: distance },
    animate: { x: 0 },
    exit: { x: distance },
  }),
  slideInLeft: (distance: string = '-100%') => ({
    initial: { x: distance },
    animate: { x: 0 },
    exit: { x: distance },
  }),
  scaleIn: {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
    exit: { scale: 0.9 },
  },
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
};
