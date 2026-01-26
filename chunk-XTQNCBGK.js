import { a as w } from './chunk-2H7DIYLF.js';
import { a as p } from './chunk-QJ46N2FA.js';
import { c as D, e as h, j as y } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import { $b as n, Ab as u, Pa as v, ab as a, xb as x, yb as o, zb as e } from './chunk-GV4MRAZ3.js';
var r = class i {
  basicCode = `import { DialogWrapper, AdvancedDialogService } from '@acontplus/ng-components';

// Usage example coming soon`;
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = a({
    type: i,
    selectors: [['app-dialog-overview']],
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
        n(2, 'Dialog Wrapper'),
        e(),
        o(3, 'p', 1),
        n(
          4,
          ' Enhanced dialog components with wrapper functionality for consistent dialog management. Provides advanced features for creating and managing Material dialogs with custom configurations. ',
        ),
        e(),
        o(5, 'h2'),
        n(6, 'Coming Soon'),
        e(),
        o(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'p'),
        n(
          10,
          ' Interactive examples and documentation for Dialog Wrapper component are being prepared. ',
        ),
        e(),
        o(11, 'p'),
        n(12, 'This component provides enhanced dialog management with the AdvancedDialogService.'),
        e()()(),
        o(13, 'h2'),
        n(14, 'Basic Usage'),
        e(),
        u(15, 'app-code-example', 3),
        e()),
        t & 2 && (v(15), x('code', c.basicCode)('language', 'typescript')));
    },
    dependencies: [y, D, h, p, w],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:32px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}',
    ],
  });
};
var s = class i {
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = a({
    type: i,
    selectors: [['app-dialog-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, c) {
      t & 1 &&
        (o(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Dialog Examples'),
        e(),
        o(3, 'p'),
        n(4, 'More examples coming soon...'),
        e()());
    },
    dependencies: [p],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var l = class i {
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = a({
    type: i,
    selectors: [['app-dialog-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, c) {
      t & 1 &&
        (o(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Dialog API'),
        e(),
        o(3, 'p'),
        n(4, 'API documentation coming soon...'),
        e()());
    },
    dependencies: [p],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var d = class i {
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = a({
    type: i,
    selectors: [['app-dialog-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, c) {
      t & 1 &&
        (o(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Dialog Styling'),
        e(),
        o(3, 'p'),
        n(4, 'Styling documentation coming soon...'),
        e()());
    },
    dependencies: [p],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var z = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: r },
  { path: 'examples', component: s },
  { path: 'api', component: l },
  { path: 'styling', component: d },
  { path: '**', redirectTo: 'overview' },
];
export { z as routes };
