// Fix for React 18 TypeScript SVG `in` attribute type conflict
// This augments React's SVGProps to allow the `in` attribute

import 'react';

declare module 'react' {
  interface SVGProps<T> {
    /** SVG `in` attribute - valid for filter primitives */
    in?: string;
  }
}

export {};
