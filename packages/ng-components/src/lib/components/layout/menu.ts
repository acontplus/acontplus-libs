export interface AcpMenuTag {
  /** Suffix of the `bg-*` class of the tag. */
  color: string;
  value: string;
}

export type AcpMenuItemType = 'link' | 'sub' | 'extLink' | 'extTabLink';

/**
 * Navigation item shared by `acp-sidemenu`, `acp-topmenu` and `acp-layout`. `route` is a segment
 * relative to the parent item (`sub` items without route use `''`); external links use the URL.
 * Filter the items by permission before passing them.
 */
export interface AcpMenuItem {
  route: string;
  name: string;
  type: AcpMenuItemType;
  icon?: string;
  label?: AcpMenuTag;
  badge?: AcpMenuTag;
  children?: AcpMenuItem[];
}

/** Absolute path from route segments, ignoring empty ones: `['sales/', '/invoice']` → `/sales/invoice`. */
export function buildMenuRoute(segments: readonly string[]): string {
  return segments
    .filter(segment => segment?.trim())
    .map(segment => '/' + segment.replace(/^\/+|\/+$/g, ''))
    .join('');
}

/** Path of a url without query params or fragment. */
export function menuPath(url: string): string {
  return url.split(/[?#]/)[0];
}

/**
 * Whether `path` is one of the item's leaf routes or below it. `sub` items count through their
 * children; external links are never active.
 */
export function isMenuItemActive(
  item: AcpMenuItem,
  path: string,
  parentRoute: readonly string[] = [],
): boolean {
  const route = [...parentRoute, item.route];
  if (item.type === 'sub') {
    return (item.children ?? []).some(child => isMenuItemActive(child, path, route));
  }
  if (item.type !== 'link') return false;
  const target = buildMenuRoute(route);
  return path === target || path.startsWith(`${target}/`);
}
