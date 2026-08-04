import { isAbsoluteUrl, joinApiUrl } from './url';

describe('joinApiUrl', () => {
  it('joins canonical base URLs and endpoint paths', () => {
    expect(joinApiUrl('https://host/gateway', 'auth/login')).toBe(
      'https://host/gateway/auth/login',
    );
  });

  it('normalizes slashes at the join boundary without corrupting the protocol', () => {
    expect(joinApiUrl('https://host/gateway///', '/auth/login')).toBe(
      'https://host/gateway/auth/login',
    );
  });

  it('preserves an empty path and a root path', () => {
    expect(joinApiUrl('https://host/gateway/', '')).toBe('https://host/gateway');
    expect(joinApiUrl('https://host/gateway', '/')).toBe('https://host/gateway/');
  });

  it('preserves query strings in endpoint paths', () => {
    expect(joinApiUrl('https://host/gateway', 'auth/login?redirect=true')).toBe(
      'https://host/gateway/auth/login?redirect=true',
    );
  });

  it('does not prefix absolute or protocol-relative URLs', () => {
    expect(joinApiUrl('https://host/gateway', 'https://api.example.com/users')).toBe(
      'https://api.example.com/users',
    );
    expect(joinApiUrl('https://host/gateway', '//cdn.example.com/asset.js')).toBe(
      '//cdn.example.com/asset.js',
    );
  });
});

describe('isAbsoluteUrl', () => {
  it('recognizes HTTP(S) and protocol-relative URLs only', () => {
    expect(isAbsoluteUrl('https://api.example.com')).toBe(true);
    expect(isAbsoluteUrl('http://api.example.com')).toBe(true);
    expect(isAbsoluteUrl('//cdn.example.com/asset.js')).toBe(true);
    expect(isAbsoluteUrl('/api/users')).toBe(false);
    expect(isAbsoluteUrl('api/users')).toBe(false);
  });
});
