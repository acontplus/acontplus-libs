import { buildMenuRoute, isMenuItemActive, menuPath, type AcpMenuItem } from './menu';

describe('menu', () => {
  it('builds an absolute route ignoring empty segments and extra slashes', () => {
    expect(buildMenuRoute(['sales/', '', '/invoice'])).toBe('/sales/invoice');
    expect(buildMenuRoute([])).toBe('');
  });

  it('strips query and fragment from the path', () => {
    expect(menuPath('/sales/invoice?id=1#top')).toBe('/sales/invoice');
  });

  describe('isMenuItemActive', () => {
    const sales: AcpMenuItem = {
      route: 'sales',
      name: 'Sales',
      type: 'sub',
      children: [
        { route: 'invoice', name: 'Invoice', type: 'link' },
        { route: 'https://example.com', name: 'Docs', type: 'extLink' },
      ],
    };

    it('matches a leaf route and the routes below it', () => {
      expect(isMenuItemActive(sales, '/sales/invoice')).toBe(true);
      expect(isMenuItemActive(sales, '/sales/invoice/42')).toBe(true);
    });

    it('does not match sibling prefixes or external links', () => {
      expect(isMenuItemActive(sales, '/sales/invoices')).toBe(false);
      expect(isMenuItemActive(sales, '/sales')).toBe(false);
    });

    it('resolves children against the parent route', () => {
      expect(isMenuItemActive(sales.children![0], '/sales/invoice', ['sales'])).toBe(true);
    });
  });
});
