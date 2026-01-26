import { a as x } from './chunk-2H7DIYLF.js';
import { s as u } from './chunk-H5QXEMOA.js';
import './chunk-7JP3HI6F.js';
import './chunk-57Q2UAVZ.js';
import { a as c } from './chunk-QJ46N2FA.js';
import { c as p, e as g, j as h } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import { $b as n, Ab as o, Pa as l, ab as d, xb as r, yb as t, zb as e } from './chunk-GV4MRAZ3.js';
var f = class a {
  basicToggleCode = `<!-- Simply add the component to your template -->
<acp-theme-toggle />`;
  serviceCode = `import { ThemeSwitcher } from '@acontplus/ng-components';

export class AppComponent {
  private themeSwitcher = inject(ThemeSwitcher);

  ngOnInit() {
    // Get current theme
    const currentTheme = this.themeSwitcher.currentTheme();
    console.log('Current theme:', currentTheme);

    // Listen to theme changes
    effect(() => {
      console.log('Theme changed to:', this.themeSwitcher.currentTheme());
    });
  }

  toggleTheme() {
    this.themeSwitcher.toggleTheme();
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeSwitcher.setTheme(theme);
  }
}`;
  usageCode = `// In your component
import { Component, inject } from '@angular/core';
import { ThemeToggle, ThemeSwitcher } from '@acontplus/ng-components';

@Component({
  selector: 'app-header',
  template: \`
    <header>
      <h1>My App</h1>
      <acp-theme-toggle />
    </header>
  \`,
  imports: [ThemeToggle]
})
export class HeaderComponent {
  private themeSwitcher = inject(ThemeSwitcher);

  // Access current theme
  get isDarkMode() {
    return this.themeSwitcher.currentTheme() === 'dark';
  }

  // Programmatically toggle
  toggleTheme() {
    this.themeSwitcher.toggleTheme();
  }
}`;
  static ɵfac = function (i) {
    return new (i || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-theme-toggle-overview']],
    decls: 45,
    vars: 6,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'docs-example-card'],
      [1, 'toggle-demo'],
      [3, 'code', 'language'],
      [1, 'section-description'],
      [1, 'features-list'],
    ],
    template: function (i, m) {
      (i & 1 &&
        (t(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Theme Toggle'),
        e(),
        t(3, 'p', 1),
        n(
          4,
          " Dark/light mode toggle component for theme switching. Provides an easy way for users to switch between light and dark themes with automatic persistence of the user's preference. ",
        ),
        e(),
        t(5, 'h2'),
        n(6, 'Basic Theme Toggle'),
        e(),
        t(7, 'mat-card', 2)(8, 'mat-card-content')(9, 'div', 3)(10, 'p'),
        n(11, 'Click the toggle to switch between light and dark themes:'),
        e(),
        o(12, 'acp-theme-toggle'),
        e()()(),
        o(13, 'app-code-example', 4),
        t(14, 'h2'),
        n(15, 'Theme Switcher Service'),
        e(),
        t(16, 'p', 5),
        n(
          17,
          ' The ThemeSwitcher service manages application theme (dark/light mode) with persistence to localStorage. It automatically applies the theme class to the document element. ',
        ),
        e(),
        o(18, 'app-code-example', 4),
        t(19, 'h2'),
        n(20, 'Features'),
        e(),
        t(21, 'mat-card', 2)(22, 'mat-card-content')(23, 'ul', 6)(24, 'li'),
        n(25, '\u{1F313} Seamless dark/light mode switching'),
        e(),
        t(26, 'li'),
        n(27, '\u{1F4BE} Automatic theme preference persistence to localStorage'),
        e(),
        t(28, 'li'),
        n(29, '\u{1F504} Signal-based reactive state management'),
        e(),
        t(30, 'li'),
        n(31, '\u{1F3A8} Material Design 3 theme integration'),
        e(),
        t(32, 'li'),
        n(33, '\u26A1 Instant theme application without page reload'),
        e(),
        t(34, 'li'),
        n(35, '\u{1F4F1} Responsive to system theme preferences'),
        e(),
        t(36, 'li'),
        n(37, '\u267F Fully accessible with ARIA labels and keyboard support'),
        e(),
        t(38, 'li'),
        n(39, '\u{1F39B}\uFE0F Customizable icons and labels for i18n'),
        e(),
        t(40, 'li'),
        n(41, '\u{1F9EA} Test ID support for automated testing'),
        e()()()(),
        t(42, 'h2'),
        n(43, 'Usage Examples'),
        e(),
        o(44, 'app-code-example', 4),
        e()),
        i & 2 &&
          (l(13),
          r('code', m.basicToggleCode)('language', 'typescript'),
          l(5),
          r('code', m.serviceCode)('language', 'typescript'),
          l(26),
          r('code', m.usageCode)('language', 'typescript')));
    },
    dependencies: [u, h, p, g, c, x],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%], .section-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:24px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.docs-example-card[_ngcontent-%COMP%]{margin-bottom:16px}.toggle-demo[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;align-items:center;padding:24px}.features-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:12px 0;border-bottom:1px solid var(--mat-sys-outline-variant);font-size:16px;line-height:1.6}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom:none}',
    ],
  });
};
var C = class a {
  basicCode = '<acp-theme-toggle />';
  customIconsCode = `<acp-theme-toggle
  lightModeIcon="wb_sunny"
  darkModeIcon="nightlight"
/>`;
  customLabelsCode = `<acp-theme-toggle
  lightModeLabel="Cambiar a modo claro"
  darkModeLabel="Cambiar a modo oscuro"
/>`;
  testIdCode = '<acp-theme-toggle testId="header-theme-toggle" />';
  fullCustomCode = `<acp-theme-toggle
  lightModeIcon="brightness_high"
  darkModeIcon="brightness_4"
  lightModeLabel="Activate light theme"
  darkModeLabel="Activate dark theme"
  testId="custom-theme-toggle"
/>`;
  static ɵfac = function (i) {
    return new (i || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-theme-toggle-examples']],
    decls: 46,
    vars: 10,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'example-card'],
      [1, 'example-preview'],
      [3, 'code', 'language'],
      [1, 'example-description'],
      ['lightModeIcon', 'wb_sunny', 'darkModeIcon', 'nightlight'],
      ['lightModeLabel', 'Cambiar a modo claro', 'darkModeLabel', 'Cambiar a modo oscuro'],
      ['testId', 'header-theme-toggle'],
      [
        'lightModeIcon',
        'brightness_high',
        'darkModeIcon',
        'brightness_4',
        'lightModeLabel',
        'Activate light theme',
        'darkModeLabel',
        'Activate dark theme',
        'testId',
        'custom-theme-toggle',
      ],
    ],
    template: function (i, m) {
      (i & 1 &&
        (t(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Theme Toggle Examples'),
        e(),
        t(3, 'h2'),
        n(4, 'Basic Usage'),
        e(),
        t(5, 'mat-card', 1)(6, 'mat-card-content')(7, 'div', 2),
        o(8, 'acp-theme-toggle'),
        e()()(),
        o(9, 'app-code-example', 3),
        t(10, 'h2'),
        n(11, 'Custom Icons'),
        e(),
        t(12, 'p', 4),
        n(13, 'Use different Material icons for the toggle states.'),
        e(),
        t(14, 'mat-card', 1)(15, 'mat-card-content')(16, 'div', 2),
        o(17, 'acp-theme-toggle', 5),
        e()()(),
        o(18, 'app-code-example', 3),
        t(19, 'h2'),
        n(20, 'Custom Labels (i18n)'),
        e(),
        t(21, 'p', 4),
        n(22, ' Customize labels for internationalization or different contexts. '),
        e(),
        t(23, 'mat-card', 1)(24, 'mat-card-content')(25, 'div', 2),
        o(26, 'acp-theme-toggle', 6),
        e()()(),
        o(27, 'app-code-example', 3),
        t(28, 'h2'),
        n(29, 'With Test ID'),
        e(),
        t(30, 'p', 4),
        n(31, ' Add a data-testid for automated testing (E2E, integration tests). '),
        e(),
        t(32, 'mat-card', 1)(33, 'mat-card-content')(34, 'div', 2),
        o(35, 'acp-theme-toggle', 7),
        e()()(),
        o(36, 'app-code-example', 3),
        t(37, 'h2'),
        n(38, 'Fully Customized'),
        e(),
        t(39, 'p', 4),
        n(40, 'Combine all customization options.'),
        e(),
        t(41, 'mat-card', 1)(42, 'mat-card-content')(43, 'div', 2),
        o(44, 'acp-theme-toggle', 8),
        e()()(),
        o(45, 'app-code-example', 3),
        e()),
        i & 2 &&
          (l(9),
          r('code', m.basicCode)('language', 'html'),
          l(9),
          r('code', m.customIconsCode)('language', 'html'),
          l(9),
          r('code', m.customLabelsCode)('language', 'html'),
          l(9),
          r('code', m.testIdCode)('language', 'html'),
          l(9),
          r('code', m.fullCustomCode)('language', 'html')));
    },
    dependencies: [c, x, u, h, p, g],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}h2[_ngcontent-%COMP%]:first-of-type{margin-top:16px}.example-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:16px;color:var(--mat-sys-on-surface-variant)}.example-card[_ngcontent-%COMP%]{margin-bottom:16px}.example-preview[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:24px;min-height:80px}',
    ],
  });
};
var S = class a {
  static ɵfac = function (i) {
    return new (i || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-theme-toggle-api']],
    decls: 123,
    vars: 0,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'api-card'],
      [1, 'api-table'],
      [1, 'a11y-list'],
    ],
    template: function (i, m) {
      i & 1 &&
        (t(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Theme Toggle API'),
        e(),
        t(3, 'h2'),
        n(4, 'Selector'),
        e(),
        t(5, 'p')(6, 'code'),
        n(7, 'acp-theme-toggle'),
        e()(),
        t(8, 'h2'),
        n(9, 'Inputs'),
        e(),
        t(10, 'mat-card', 1)(11, 'mat-card-content')(12, 'table', 2)(13, 'thead')(14, 'tr')(
          15,
          'th',
        ),
        n(16, 'Name'),
        e(),
        t(17, 'th'),
        n(18, 'Type'),
        e(),
        t(19, 'th'),
        n(20, 'Default'),
        e(),
        t(21, 'th'),
        n(22, 'Description'),
        e()()(),
        t(23, 'tbody')(24, 'tr')(25, 'td')(26, 'code'),
        n(27, 'lightModeIcon'),
        e()(),
        t(28, 'td')(29, 'code'),
        n(30, 'string'),
        e()(),
        t(31, 'td')(32, 'code'),
        n(33, "'light_mode'"),
        e()(),
        t(34, 'td'),
        n(35, ' Material icon name displayed when in dark mode (clicking will switch to light) '),
        e()(),
        t(36, 'tr')(37, 'td')(38, 'code'),
        n(39, 'darkModeIcon'),
        e()(),
        t(40, 'td')(41, 'code'),
        n(42, 'string'),
        e()(),
        t(43, 'td')(44, 'code'),
        n(45, "'dark_mode'"),
        e()(),
        t(46, 'td'),
        n(47, ' Material icon name displayed when in light mode (clicking will switch to dark) '),
        e()(),
        t(48, 'tr')(49, 'td')(50, 'code'),
        n(51, 'lightModeLabel'),
        e()(),
        t(52, 'td')(53, 'code'),
        n(54, 'string'),
        e()(),
        t(55, 'td')(56, 'code'),
        n(57, "'Switch to light mode'"),
        e()(),
        t(58, 'td'),
        n(59, 'Accessible label (aria-label and tooltip) when in dark mode'),
        e()(),
        t(60, 'tr')(61, 'td')(62, 'code'),
        n(63, 'darkModeLabel'),
        e()(),
        t(64, 'td')(65, 'code'),
        n(66, 'string'),
        e()(),
        t(67, 'td')(68, 'code'),
        n(69, "'Switch to dark mode'"),
        e()(),
        t(70, 'td'),
        n(71, 'Accessible label (aria-label and tooltip) when in light mode'),
        e()(),
        t(72, 'tr')(73, 'td')(74, 'code'),
        n(75, 'testId'),
        e()(),
        t(76, 'td')(77, 'code'),
        n(78, 'string'),
        e()(),
        t(79, 'td')(80, 'code'),
        n(81, "''"),
        e()(),
        t(82, 'td'),
        n(83, 'Sets data-testid attribute for automated testing. Not rendered if empty.'),
        e()()()()()(),
        t(84, 'h2'),
        n(85, 'Accessibility'),
        e(),
        t(86, 'mat-card', 1)(87, 'mat-card-content')(88, 'ul', 3)(89, 'li')(90, 'strong'),
        n(91, 'aria-label:'),
        e(),
        n(92, ' Dynamic label based on current theme state'),
        e(),
        t(93, 'li')(94, 'strong'),
        n(95, 'aria-pressed:'),
        e(),
        n(96, ' Indicates toggle state (true when dark mode is active) '),
        e(),
        t(97, 'li')(98, 'strong'),
        n(99, 'Tooltip:'),
        e(),
        n(100, ' Shows the action that will be performed on click'),
        e(),
        t(101, 'li')(102, 'strong'),
        n(103, 'Keyboard:'),
        e(),
        n(104, ' Fully accessible via keyboard (Enter/Space to toggle) '),
        e()()()(),
        t(105, 'h2'),
        n(106, 'CSS Classes'),
        e(),
        t(107, 'mat-card', 1)(108, 'mat-card-content')(109, 'table', 2)(110, 'thead')(111, 'tr')(
          112,
          'th',
        ),
        n(113, 'Class'),
        e(),
        t(114, 'th'),
        n(115, 'Description'),
        e()()(),
        t(116, 'tbody')(117, 'tr')(118, 'td')(119, 'code'),
        n(120, '.acp-theme-toggle'),
        e()(),
        t(121, 'td'),
        n(122, 'Applied to the host element for custom styling'),
        e()()()()()()());
    },
    dependencies: [c, h, p, g],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}p[_ngcontent-%COMP%]{margin-bottom:16px;line-height:1.6}code[_ngcontent-%COMP%]{background:var(--mat-sys-surface-container);padding:2px 8px;border-radius:4px;font-family:Roboto Mono,monospace;font-size:14px}.api-card[_ngcontent-%COMP%]{margin-bottom:24px}.api-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:12px 16px;border-bottom:1px solid var(--mat-sys-outline-variant)}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:500;color:var(--mat-sys-on-surface);background:var(--mat-sys-surface-container)}.api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.api-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]{border-bottom:none}.a11y-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.a11y-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:12px 0;border-bottom:1px solid var(--mat-sys-outline-variant);line-height:1.6}.a11y-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom:none}',
    ],
  });
};
var b = class a {
  static ɵfac = function (i) {
    return new (i || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-theme-toggle-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (i, m) {
      i & 1 &&
        (t(0, 'div', 0)(1, 'app-doc-heading'),
        n(2, 'Theme Toggle Styling'),
        e(),
        t(3, 'p'),
        n(4, 'Styling documentation coming soon...'),
        e()());
    },
    dependencies: [c],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var G = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: f },
  { path: 'examples', component: C },
  { path: 'api', component: S },
  { path: 'styling', component: b },
  { path: '**', redirectTo: 'overview' },
];
export { G as routes };
