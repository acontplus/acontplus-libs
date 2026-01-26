import { a as I } from './chunk-2H7DIYLF.js';
import { a } from './chunk-QJ46N2FA.js';
import { c as v, e as x, j as y } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import { $b as i, Ab as C, Pa as g, ab as o, xb as h, yb as n, zb as e } from './chunk-GV4MRAZ3.js';
var s = class p {
  basicCode = `import { InputChip } from '@acontplus/ng-components';

// Usage example coming soon`;
  static ɵfac = function (t) {
    return new (t || p)();
  };
  static ɵcmp = o({
    type: p,
    selectors: [['app-input-chip-overview']],
    decls: 16,
    vars: 2,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'docs-example-card'],
      [3, 'code', 'language'],
    ],
    template: function (t, m) {
      (t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Input Chip'),
        e(),
        n(3, 'p', 1),
        i(
          4,
          ' Chip input components integrated with Angular Material for tag and chip selection. Perfect for multi-select inputs, tagging systems, and item collections. ',
        ),
        e(),
        n(5, 'h2'),
        i(6, 'Coming Soon'),
        e(),
        n(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'p'),
        i(
          10,
          'Interactive examples and documentation for Input Chip component are being prepared.',
        ),
        e(),
        n(11, 'p'),
        i(
          12,
          ' This component provides Material Design chip inputs with autocomplete and custom chip support. ',
        ),
        e()()(),
        n(13, 'h2'),
        i(14, 'Basic Usage'),
        e(),
        C(15, 'app-code-example', 3),
        e()),
        t & 2 && (g(15), h('code', m.basicCode)('language', 'typescript')));
    },
    dependencies: [y, v, x, a, I],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:32px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}',
    ],
  });
};
var r = class p {
  static ɵfac = function (t) {
    return new (t || p)();
  };
  static ɵcmp = o({
    type: p,
    selectors: [['app-input-chip-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, m) {
      t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Input Chip Examples'),
        e(),
        n(3, 'p'),
        i(4, 'More examples coming soon...'),
        e()());
    },
    dependencies: [a],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var d = class p {
  static ɵfac = function (t) {
    return new (t || p)();
  };
  static ɵcmp = o({
    type: p,
    selectors: [['app-input-chip-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, m) {
      t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Input Chip API'),
        e(),
        n(3, 'p'),
        i(4, 'API documentation coming soon...'),
        e()());
    },
    dependencies: [a],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var l = class p {
  static ɵfac = function (t) {
    return new (t || p)();
  };
  static ɵcmp = o({
    type: p,
    selectors: [['app-input-chip-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, m) {
      t & 1 &&
        (n(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Input Chip Styling'),
        e(),
        n(3, 'p'),
        i(4, 'Styling documentation coming soon...'),
        e()());
    },
    dependencies: [a],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var R = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: s },
  { path: 'examples', component: r },
  { path: 'api', component: d },
  { path: 'styling', component: l },
  { path: '**', redirectTo: 'overview' },
];
export { R as routes };
