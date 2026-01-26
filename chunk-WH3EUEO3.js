import { a as _ } from './chunk-2H7DIYLF.js';
import { g as O, n as b } from './chunk-H5QXEMOA.js';
import './chunk-7JP3HI6F.js';
import './chunk-57Q2UAVZ.js';
import { a as s } from './chunk-QJ46N2FA.js';
import { c as h, e as M, j as w } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import {
  $b as i,
  Ab as c,
  Kb as C,
  Pa as d,
  ab as r,
  qb as v,
  sb as u,
  xb as x,
  yb as e,
  zb as n,
} from './chunk-GV4MRAZ3.js';
function P(o, p) {
  o & 1 && (e(0, 'div', 7), c(1, 'acp-spinner'), e(2, 'span', 9), i(3, 'Fetching data...'), n()());
}
function E(o, p) {
  o & 1 && (e(0, 'div', 8), i(1, '\u2713 Data loaded successfully!'), n());
}
var m = class o {
  isLoading = !1;
  dataLoaded = !1;
  showOverlaySpinner = !1;
  basicSpinnerCode = '<acp-spinner />';
  loadingExampleCode = `export class MyComponent {
  isLoading = false;

  loadData() {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}

// Template
@if (isLoading) {
  <div class="loading-container">
    <acp-spinner />
    <span>Fetching data...</span>
  </div>
}`;
  loadData() {
    ((this.isLoading = !0),
      (this.dataLoaded = !1),
      setTimeout(() => {
        ((this.isLoading = !1), (this.dataLoaded = !0));
      }, 2e3));
  }
  showOverlay() {
    ((this.showOverlaySpinner = !0),
      setTimeout(() => {
        this.showOverlaySpinner = !1;
      }, 2e3));
  }
  static ɵfac = function (t) {
    return new (t || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-spinner-overview']],
    decls: 20,
    vars: 7,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'docs-example-card'],
      [1, 'spinner-demo'],
      [3, 'code', 'language'],
      [1, 'loading-demo'],
      [3, 'handleClick', 'text', 'variant', 'disabled'],
      [1, 'loading-container'],
      [1, 'success-message'],
      [1, 'loading-text'],
    ],
    template: function (t, a) {
      (t & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Spinner'),
        n(),
        e(3, 'p', 1),
        i(
          4,
          ' Loading spinner components for async operations. Provides visual feedback during data loading, form submissions, and other asynchronous tasks. ',
        ),
        n(),
        e(5, 'h2'),
        i(6, 'Basic Spinner'),
        n(),
        e(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'div', 3),
        c(10, 'acp-spinner'),
        n()()(),
        c(11, 'app-code-example', 4),
        e(12, 'h2'),
        i(13, 'Loading Example'),
        n(),
        e(14, 'mat-card', 2)(15, 'mat-card-content')(16, 'div', 5)(17, 'acp-button', 6),
        C('handleClick', function () {
          return a.loadData();
        }),
        n(),
        v(18, P, 4, 0, 'div', 7),
        v(19, E, 2, 0, 'div', 8),
        n()()()()),
        t & 2 &&
          (d(11),
          x('code', a.basicSpinnerCode)('language', 'typescript'),
          d(6),
          x('text', a.isLoading ? 'Loading...' : 'Load Data')('variant', 'primary')(
            'disabled',
            a.isLoading,
          ),
          d(),
          u(a.isLoading ? 18 : -1),
          d(),
          u(!a.isLoading && a.dataLoaded ? 19 : -1)));
    },
    dependencies: [b, w, h, M, O, s, _],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:32px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}.spinner-demo[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:24px}.spinner-sizes[_ngcontent-%COMP%]{display:flex;gap:48px;align-items:flex-end;justify-content:center;padding:24px}.spinner-size-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:12px}.spinner-size-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.loading-demo[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;padding:16px}.loading-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:16px;background-color:var(--mat-sys-surface-container);border-radius:8px}.loading-text[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.success-message[_ngcontent-%COMP%]{color:var(--mat-sys-primary);padding:16px;background-color:var(--mat-sys-primary-container);border-radius:8px}.overlay-demo[_ngcontent-%COMP%]{position:relative;min-height:200px}.spinner-overlay[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background-color:#00000080;z-index:10;border-radius:8px}.content-area[_ngcontent-%COMP%]{padding:24px;background-color:var(--mat-sys-surface-container-low);border-radius:8px}',
    ],
  });
};
var l = class o {
  static ɵfac = function (t) {
    return new (t || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-spinner-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, a) {
      t & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Spinner Examples'),
        n(),
        e(3, 'p'),
        i(4, 'More examples coming soon...'),
        n()());
    },
    dependencies: [s],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var g = class o {
  static ɵfac = function (t) {
    return new (t || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-spinner-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, a) {
      t & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Spinner API'),
        n(),
        e(3, 'p'),
        i(4, 'API documentation coming soon...'),
        n()());
    },
    dependencies: [s],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var f = class o {
  static ɵfac = function (t) {
    return new (t || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-spinner-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (t, a) {
      t & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Spinner Styling'),
        n(),
        e(3, 'p'),
        i(4, 'Styling documentation coming soon...'),
        n()());
    },
    dependencies: [s],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var U = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: m },
  { path: 'examples', component: l },
  { path: 'api', component: g },
  { path: 'styling', component: f },
  { path: '**', redirectTo: 'overview' },
];
export { U as routes };
