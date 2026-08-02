/**
 * Navigation position of the sidenav.
 * - `side`: sidebar always visible alongside content
 * - `top`:  navigation rendered in a top menu bar instead
 */
export type AcpNavPos = 'side' | 'top';

/**
 * Position of the header relative to the sidenav container.
 * - `above`: header spans full width above the sidenav container
 * - `fixed`: header is sticky inside the content area
 * - `below`: header scrolls with content
 */
export type AcpHeaderPos = 'above' | 'fixed' | 'below' | 'static';

/**
 * Layout direction (RTL/LTR support).
 */
export type AcpDir = 'ltr' | 'rtl';
