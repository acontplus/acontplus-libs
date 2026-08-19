/**
 * Returns whether a URL already identifies an external origin.
 *
 * Protocol-relative URLs are included because browsers resolve `//host/path`
 * against the current page protocol.
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^(https?:)?\/\//i.test(url);
}

/**
 * Joins an API base URL and an endpoint path without changing URL protocols.
 *
 * This deliberately does not use `new URL(path, baseUrl)`: this function joins
 * an API prefix and endpoint, while the URL standard resolves relative
 * references and can discard a base path that does not end in `/`.
 */
export function joinApiUrl(baseUrl: string, path?: string): string {
  if (!path) {
    return baseUrl.replace(/\/+$/, '');
  }

  if (isAbsoluteUrl(path)) {
    return path;
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  if (!normalizedBaseUrl) {
    return path;
  }

  return `${normalizedBaseUrl}/${path.replace(/^\/+/, '')}`;
}
