import { a as C } from './chunk-2H7DIYLF.js';
import { a } from './chunk-QJ46N2FA.js';
import { c as y, e as h, j as A } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import { $b as n, Ab as x, Pa as g, ab as i, xb as v, yb as o, zb as e } from './chunk-GV4MRAZ3.js';
var s = class p {
  basicCode = `import { AutocompleteWrapperComponent } from '@acontplus/ng-components';

// Usage example coming soon`;
  static ɵfac = function (t) {
    return new (t || p)();
  };
  static ɵcmp = i({
    type: p,
    selectors: [['app-autocomplete-overview']],
    decls: 16,
    vars: 2,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'docs-example-card'],
      [3, 'code', 'language'],
    ],
    template: function (t, c) {
      (t & 1 &&
        (o(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Autocomplete'),
        e(),
        o(3, 'p', 1),
        n(
          4,
          ' Enhanced autocomplete wrapper with custom functionality. Provides advanced filtering, custom templates, and improved UX for searchable dropdowns. ',
        ),
        e(),
        o(5, 'h2'),
        n(6, 'Coming Soon'),
        e(),
        o(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'p'),
        n(
          10,
          ' Interactive examples and documentation for Autocomplete component are being prepared. ',
        ),
        e(),
        o(11, 'p'),
        n(
          12,
          ' This component enhances Material autocomplete with additional features and customization options. ',
        ),
        e()()(),
        o(13, 'h2'),
        n(14, 'Basic Usage'),
        e(),
        x(15, 'app-code-example', 3),
        e()),
        t & 2 && (g(15), v('code', c.basicCode)('language', 'typescript')));
    },
    dependencies: [A, y, h, a, C],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:32px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}',
    ],
  });
};
var r = class p {
  static ɵfac = function (t) {
    return new (t || p)();
  };
  static ɵcmp = i({
    type: p,
    selectors: [['app-autocomplete-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, c) {
      t & 1 &&
        (o(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Autocomplete Examples'),
        e(),
        o(3, 'p'),
        n(4, 'More examples coming soon...'),
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
  static ɵcmp = i({
    type: p,
    selectors: [['app-autocomplete-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, c) {
      t & 1 &&
        (o(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Autocomplete API'),
        e(),
        o(3, 'p'),
        n(4, 'API documentation coming soon...'),
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
  static ɵcmp = i({
    type: p,
    selectors: [['app-autocomplete-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, c) {
      t & 1 &&
        (o(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Autocomplete Styling'),
        e(),
        o(3, 'p'),
        n(4, 'Styling documentation coming soon...'),
        e()());
    },
    dependencies: [a],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var U = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: s },
  { path: 'examples', component: r },
  { path: 'api', component: l },
  { path: 'styling', component: d },
  { path: '**', redirectTo: 'overview' },
];
export { U as routes };
