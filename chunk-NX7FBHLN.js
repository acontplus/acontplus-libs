import { a as E } from './chunk-2H7DIYLF.js';
import { h as O, i as P } from './chunk-H5QXEMOA.js';
import './chunk-7JP3HI6F.js';
import './chunk-57Q2UAVZ.js';
import { a as m } from './chunk-QJ46N2FA.js';
import { c as S, e as z, j as M } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import {
  $b as t,
  Ab as c,
  Pa as p,
  ab as r,
  ac as I,
  ia as u,
  ub as y,
  vb as w,
  wb as C,
  xb as l,
  yb as e,
  zb as n,
} from './chunk-GV4MRAZ3.js';
function b(o, a) {
  if ((o & 1 && (e(0, 'div', 4), c(1, 'acp-svg-icon', 25), e(2, 'span', 26), t(3), n()()), o & 2)) {
    let i = a.$implicit;
    (p(), l('name', i), p(2), I(i));
  }
}
var d = class o {
  iconRegistry = u(O);
  defaultIcons = [
    'home',
    'user',
    'settings',
    'search',
    'close',
    'check',
    'arrow-right',
    'arrow-left',
    'menu',
    'info',
    'warning',
    'error',
    'heart',
    'star',
  ];
  basicIconCode = `<!-- Basic usage -->
<acp-svg-icon name="home" />

<!-- With size -->
<acp-svg-icon name="user" size="32px" />`;
  sizeIconCode = `<acp-svg-icon name="home" size="16px" />
<acp-svg-icon name="home" size="24px" />
<acp-svg-icon name="home" size="32px" />
<acp-svg-icon name="home" size="48px" />`;
  colorIconCode = `<acp-svg-icon name="heart" size="48px" color="#e91e63" />
<acp-svg-icon name="star" size="48px" color="#ffc107" />
<acp-svg-icon name="check" size="48px" color="#4caf50" />`;
  dimensionsIconCode = `<acp-svg-icon name="menu" width="20px" height="40px" />
<acp-svg-icon name="menu" width="40px" height="20px" />`;
  registryCode = `import { IconRegistryService } from '@acontplus/ng-components';

export class AppComponent implements OnInit {
  private iconRegistry = inject(IconRegistryService);

  ngOnInit() {
    // Configure registry
    this.iconRegistry.configure({
      fallbackIcon: \`<svg>...</svg>\`,
      showWarnings: true,
      iconBaseUrl: 'https://cdn.example.com/icons'
    });

    // Register custom icon
    this.iconRegistry.registerIcon(
      'custom-icon',
      \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10l10 5 10-5V7z"/>
      </svg>\`
    );

    // Load icon from URL
    await this.iconRegistry.loadIconFromUrl(
      'github',
      'https://example.com/github.svg'
    );
  }
}`;
  ngOnInit() {
    this.iconRegistry.registerIcons([
      {
        name: 'heart',
        data: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`,
      },
      {
        name: 'star',
        data: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>`,
      },
    ]);
  }
  static ɵfac = function (i) {
    return new (i || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-icons-overview']],
    decls: 65,
    vars: 10,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'docs-example-card'],
      [1, 'icon-grid'],
      [1, 'icon-item'],
      [3, 'code', 'language'],
      [1, 'icon-sizes'],
      [1, 'icon-size-item'],
      ['name', 'home', 'size', '16px'],
      ['name', 'home', 'size', '24px'],
      ['name', 'home', 'size', '32px'],
      ['name', 'home', 'size', '48px'],
      ['name', 'home', 'size', '64px'],
      [1, 'icon-colors'],
      ['name', 'heart', 'size', '48px', 'color', '#e91e63'],
      ['name', 'star', 'size', '48px', 'color', '#ffc107'],
      ['name', 'check', 'size', '48px', 'color', '#4caf50'],
      ['name', 'info', 'size', '48px', 'color', '#2196f3'],
      ['name', 'warning', 'size', '48px', 'color', '#ff9800'],
      ['name', 'error', 'size', '48px', 'color', '#f44336'],
      [1, 'icon-dimensions'],
      ['name', 'menu', 'width', '20px', 'height', '40px'],
      ['name', 'menu', 'width', '40px', 'height', '20px'],
      ['name', 'menu', 'width', '60px', 'height', '30px'],
      [1, 'section-description'],
      ['size', '32px', 3, 'name'],
      [1, 'icon-name'],
    ],
    template: function (i, s) {
      (i & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Icons'),
        n(),
        e(3, 'p', 1),
        t(
          4,
          ' Type-safe SVG icon system with registry service, fallback support, and online icon loading. Features tree-shakable icons, SSR-friendly design, and signal-based reactive primitives. ',
        ),
        n(),
        e(5, 'h2'),
        t(6, 'Basic Icons'),
        n(),
        e(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'div', 3),
        w(10, b, 4, 2, 'div', 4, y),
        n()()(),
        c(12, 'app-code-example', 5),
        e(13, 'h2'),
        t(14, 'Icon Sizes'),
        n(),
        e(15, 'mat-card', 2)(16, 'mat-card-content')(17, 'div', 6)(18, 'div', 7),
        c(19, 'acp-svg-icon', 8),
        e(20, 'span'),
        t(21, '16px'),
        n()(),
        e(22, 'div', 7),
        c(23, 'acp-svg-icon', 9),
        e(24, 'span'),
        t(25, '24px'),
        n()(),
        e(26, 'div', 7),
        c(27, 'acp-svg-icon', 10),
        e(28, 'span'),
        t(29, '32px'),
        n()(),
        e(30, 'div', 7),
        c(31, 'acp-svg-icon', 11),
        e(32, 'span'),
        t(33, '48px'),
        n()(),
        e(34, 'div', 7),
        c(35, 'acp-svg-icon', 12),
        e(36, 'span'),
        t(37, '64px'),
        n()()()()(),
        c(38, 'app-code-example', 5),
        e(39, 'h2'),
        t(40, 'Colored Icons'),
        n(),
        e(41, 'mat-card', 2)(42, 'mat-card-content')(43, 'div', 13),
        c(44, 'acp-svg-icon', 14)(45, 'acp-svg-icon', 15)(46, 'acp-svg-icon', 16)(
          47,
          'acp-svg-icon',
          17,
        )(48, 'acp-svg-icon', 18)(49, 'acp-svg-icon', 19),
        n()()(),
        c(50, 'app-code-example', 5),
        e(51, 'h2'),
        t(52, 'Custom Dimensions'),
        n(),
        e(53, 'mat-card', 2)(54, 'mat-card-content')(55, 'div', 20),
        c(56, 'acp-svg-icon', 21)(57, 'acp-svg-icon', 22)(58, 'acp-svg-icon', 23),
        n()()(),
        c(59, 'app-code-example', 5),
        e(60, 'h2'),
        t(61, 'Registry Configuration'),
        n(),
        e(62, 'p', 24),
        t(
          63,
          ' The icon registry allows you to register custom icons, configure fallbacks, and load icons from URLs. ',
        ),
        n(),
        c(64, 'app-code-example', 5),
        n()),
        i & 2 &&
          (p(10),
          C(s.defaultIcons),
          p(2),
          l('code', s.basicIconCode)('language', 'typescript'),
          p(26),
          l('code', s.sizeIconCode)('language', 'typescript'),
          p(12),
          l('code', s.colorIconCode)('language', 'typescript'),
          p(9),
          l('code', s.dimensionsIconCode)('language', 'typescript'),
          p(5),
          l('code', s.registryCode)('language', 'typescript')));
    },
    dependencies: [P, M, S, z, m, E],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%], .section-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:24px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}.icon-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:24px}.icon-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px;border-radius:8px;transition:background-color .2s}.icon-item[_ngcontent-%COMP%]:hover{background-color:var(--mat-sys-surface-container-highest)}.icon-name[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant);text-align:center}.icon-sizes[_ngcontent-%COMP%]{display:flex;align-items:flex-end;gap:32px;flex-wrap:wrap}.icon-size-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px}.icon-size-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.icon-colors[_ngcontent-%COMP%]{display:flex;gap:24px;flex-wrap:wrap}.icon-dimensions[_ngcontent-%COMP%]{display:flex;gap:24px;align-items:center;flex-wrap:wrap}',
    ],
  });
};
var g = class o {
  static ɵfac = function (i) {
    return new (i || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-icons-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (i, s) {
      i & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Icons Examples'),
        n(),
        e(3, 'p'),
        t(4, 'More examples coming soon...'),
        n()());
    },
    dependencies: [m],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var v = class o {
  static ɵfac = function (i) {
    return new (i || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-icons-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (i, s) {
      i & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Icons API'),
        n(),
        e(3, 'p'),
        t(4, 'API documentation coming soon...'),
        n()());
    },
    dependencies: [m],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var x = class o {
  static ɵfac = function (i) {
    return new (i || o)();
  };
  static ɵcmp = r({
    type: o,
    selectors: [['app-icons-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (i, s) {
      i & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        t(2, 'Icons Styling'),
        n(),
        e(3, 'p'),
        t(4, 'Styling documentation coming soon...'),
        n()());
    },
    dependencies: [m],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var K = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: d },
  { path: 'examples', component: g },
  { path: 'api', component: v },
  { path: 'styling', component: x },
  { path: '**', redirectTo: 'overview' },
];
export { K as routes };
