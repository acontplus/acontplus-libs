import { a as h } from './chunk-2H7DIYLF.js';
import { a } from './chunk-QJ46N2FA.js';
import { c as u, e as S, j as D } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import { $b as o, Ab as x, Pa as g, ab as c, xb as v, yb as n, zb as e } from './chunk-GV4MRAZ3.js';
var s = class i {
  basicCode = `import { DynamicSelect } from '@acontplus/ng-components';

// Usage example coming soon`;
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = c({
    type: i,
    selectors: [['app-dynamic-select-overview']],
    decls: 16,
    vars: 2,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'docs-example-card'],
      [3, 'code', 'language'],
    ],
    template: function (t, p) {
      (t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        o(2, 'Dynamic Select'),
        e(),
        n(3, 'p', 1),
        o(
          4,
          ' Dynamic select dropdown components with enhanced functionality. Supports dynamic option loading, custom templates, and advanced filtering capabilities. ',
        ),
        e(),
        n(5, 'h2'),
        o(6, 'Coming Soon'),
        e(),
        n(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'p'),
        o(
          10,
          ' Interactive examples and documentation for Dynamic Select component are being prepared. ',
        ),
        e(),
        n(11, 'p'),
        o(
          12,
          ' This component provides Material select with dynamic data loading and custom features. ',
        ),
        e()()(),
        n(13, 'h2'),
        o(14, 'Basic Usage'),
        e(),
        x(15, 'app-code-example', 3),
        e()),
        t & 2 && (g(15), v('code', p.basicCode)('language', 'typescript')));
    },
    dependencies: [D, u, S, a, h],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:32px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}',
    ],
  });
};
var l = class i {
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = c({
    type: i,
    selectors: [['app-dynamic-select-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, p) {
      t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        o(2, 'Dynamic Select Examples'),
        e(),
        n(3, 'p'),
        o(4, 'More examples coming soon...'),
        e()());
    },
    dependencies: [a],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var r = class i {
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = c({
    type: i,
    selectors: [['app-dynamic-select-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, p) {
      t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        o(2, 'Dynamic Select API'),
        e(),
        n(3, 'p'),
        o(4, 'API documentation coming soon...'),
        e()());
    },
    dependencies: [a],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var d = class i {
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = c({
    type: i,
    selectors: [['app-dynamic-select-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, p) {
      t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        o(2, 'Dynamic Select Styling'),
        e(),
        n(3, 'p'),
        o(4, 'Styling documentation coming soon...'),
        e()());
    },
    dependencies: [a],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var R = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: s },
  { path: 'examples', component: l },
  { path: 'api', component: r },
  { path: 'styling', component: d },
  { path: '**', redirectTo: 'overview' },
];
export { R as routes };
