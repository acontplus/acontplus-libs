import { a as y } from './chunk-2H7DIYLF.js';
import { a as l } from './chunk-QJ46N2FA.js';
import { c as v, e as T, j as h } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import { $b as t, Ab as c, Pa as m, ab as i, xb as s, yb as a, zb as e } from './chunk-GV4MRAZ3.js';
var d = class o {
  installCode = `# Using npm
npm install tabulator-tables

# Using pnpm
pnpm add tabulator-tables`;
  basicCode = `import { TabulatorTable } from '@acontplus/ng-components';

<acp-tabulator-table
  [data]="tableData"
  [columns]="columns"
  [height]="400"
  [theme]="{ name: 'materialize' }"
/>`;
  themeCode = `// Import Tabulator Material theme in your styles
@import 'tabulator-tables/dist/css/tabulator_materialize.min.css';

// Row colors automatically adapt to light/dark themes`;
  static ɵfac = function (n) {
    return new (n || o)();
  };
  static ɵcmp = i({
    type: o,
    selectors: [['app-tabulator-table-overview']],
    decls: 44,
    vars: 6,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'docs-example-card'],
      [1, 'features-list'],
      [1, 'section-description'],
      [3, 'code', 'language'],
    ],
    template: function (n, p) {
      (n & 1 &&
        (a(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Tabulator Table'),
        e(),
        a(3, 'p', 1),
        t(
          4,
          ' Advanced table with Tabulator.js integration featuring virtual scrolling, tree data support, advanced filtering, and Material Design theming. ',
        ),
        e(),
        a(5, 'h2'),
        t(6, 'Features'),
        e(),
        a(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'ul', 3)(10, 'li'),
        t(11, '\u2713 Row Styling with theme-aware colors'),
        e(),
        a(12, 'li'),
        t(13, '\u2713 Advanced Filtering and searching'),
        e(),
        a(14, 'li'),
        t(15, '\u2713 Virtual Scrolling for large datasets'),
        e(),
        a(16, 'li'),
        t(17, '\u2713 Tree Data with hierarchical support'),
        e(),
        a(18, 'li'),
        t(19, '\u2713 Custom Themes with Material Design integration'),
        e(),
        a(20, 'li'),
        t(21, '\u2713 Export capabilities (PDF, Excel, CSV)'),
        e(),
        a(22, 'li'),
        t(23, '\u2713 Column grouping and frozen columns'),
        e()()()(),
        a(24, 'h2'),
        t(25, 'Installation'),
        e(),
        a(26, 'p', 4),
        t(27, ' Tabulator tables require '),
        a(28, 'code'),
        t(29, 'tabulator-tables'),
        e(),
        t(30, ' as a peer dependency. '),
        e(),
        c(31, 'app-code-example', 5),
        a(32, 'h2'),
        t(33, 'Coming Soon'),
        e(),
        a(34, 'mat-card', 2)(35, 'mat-card-content')(36, 'p'),
        t(37, 'Interactive examples and detailed documentation are being prepared.'),
        e()()(),
        a(38, 'h2'),
        t(39, 'Basic Usage'),
        e(),
        c(40, 'app-code-example', 5),
        a(41, 'h2'),
        t(42, 'Theme Integration'),
        e(),
        c(43, 'app-code-example', 5),
        e()),
        n & 2 &&
          (m(31),
          s('code', p.installCode)('language', 'bash'),
          m(9),
          s('code', p.basicCode)('language', 'typescript'),
          m(3),
          s('code', p.themeCode)('language', 'styles')));
    },
    dependencies: [h, v, T, l, y],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%], .section-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:24px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}.features-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:12px 0;border-bottom:1px solid var(--mat-sys-outline-variant);font-size:16px}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom:none}code[_ngcontent-%COMP%]{background-color:var(--mat-sys-surface-container);padding:2px 6px;border-radius:4px;font-family:Roboto Mono,monospace;font-size:13px}',
    ],
  });
};
var u = class o {
  static ɵfac = function (n) {
    return new (n || o)();
  };
  static ɵcmp = i({
    type: o,
    selectors: [['app-tabulator-table-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (n, p) {
      n & 1 &&
        (a(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Tabulator Table Examples'),
        e(),
        a(3, 'p'),
        t(4, 'More examples coming soon...'),
        e()());
    },
    dependencies: [l],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var b = class o {
  static ɵfac = function (n) {
    return new (n || o)();
  };
  static ɵcmp = i({
    type: o,
    selectors: [['app-tabulator-table-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (n, p) {
      n & 1 &&
        (a(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Tabulator Table API'),
        e(),
        a(3, 'p'),
        t(4, 'API documentation coming soon...'),
        e()());
    },
    dependencies: [l],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var g = class o {
  static ɵfac = function (n) {
    return new (n || o)();
  };
  static ɵcmp = i({
    type: o,
    selectors: [['app-tabulator-table-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (n, p) {
      n & 1 &&
        (a(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Tabulator Table Styling'),
        e(),
        a(3, 'p'),
        t(4, 'Styling documentation coming soon...'),
        e()());
    },
    dependencies: [l],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var H = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: d },
  { path: 'examples', component: u },
  { path: 'api', component: b },
  { path: 'styling', component: g },
  { path: '**', redirectTo: 'overview' },
];
export { H as routes };
