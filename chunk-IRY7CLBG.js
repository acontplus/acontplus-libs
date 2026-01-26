import { a as b } from './chunk-2H7DIYLF.js';
import { a as S } from './chunk-H5QXEMOA.js';
import './chunk-7JP3HI6F.js';
import './chunk-57Q2UAVZ.js';
import { a as s } from './chunk-QJ46N2FA.js';
import { j as h } from './chunk-U7VJQUDE.js';
import './chunk-XJJY6XHD.js';
import {
  $b as i,
  Ab as m,
  Kb as g,
  Pa as r,
  ab as d,
  xb as o,
  yb as e,
  zb as t,
} from './chunk-GV4MRAZ3.js';
var l = class a {
  basicCardCode = `<acp-dynamic-card
  [cardTitle]="'Basic Card'"
  [cardSubtitle]="'This is a subtitle'"
  [isHeaderVisible]="true"
>
  <p>This is the card content.</p>
</acp-dynamic-card>`;
  cardWithActionsCode = `<acp-dynamic-card
  [cardTitle]="'Product Details'"
  [cardSubtitle]="'Premium Package'"
  [isHeaderVisible]="true"
  [areActionsVisible]="true"
  [primaryButtonText]="'Buy Now'"
  [secondaryButtonText]="'Learn More'"
  (primaryButtonClicked)="onPrimaryAction()"
  (secondaryButtonClicked)="onSecondaryAction()"
>
  <p><strong>Price:</strong> $99.99/month</p>
</acp-dynamic-card>`;
  noHeaderCardCode = `<acp-dynamic-card
  [isHeaderVisible]="false"
  [areActionsVisible]="true"
  [primaryButtonText]="'Confirm'"
  (primaryButtonClicked)="onConfirm()"
>
  <h3>Custom Content Card</h3>
  <p>This card has no header.</p>
</acp-dynamic-card>`;
  gridCardsCode = `<div class="cards-grid">
  <acp-dynamic-card
    [cardTitle]="'Dashboard'"
    [isHeaderVisible]="true"
  >
    <p>Quick stats</p>
  </acp-dynamic-card>
  
  <acp-dynamic-card
    [cardTitle]="'Analytics'"
    [isHeaderVisible]="true"
  >
    <p>Performance data</p>
  </acp-dynamic-card>
</div>`;
  onPrimaryAction() {
    alert('Primary action clicked');
  }
  onSecondaryAction() {
    alert('Secondary action clicked');
  }
  onConfirm() {
    alert('Confirmed');
  }
  static ɵfac = function (n) {
    return new (n || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-cards-overview']],
    decls: 57,
    vars: 29,
    consts: [
      [1, 'docs-component-viewer-content'],
      [1, 'docs-component-description'],
      [1, 'example-container'],
      [3, 'cardTitle', 'cardSubtitle', 'isHeaderVisible'],
      [3, 'code', 'language'],
      [
        3,
        'primaryButtonClicked',
        'secondaryButtonClicked',
        'cardTitle',
        'cardSubtitle',
        'isHeaderVisible',
        'areActionsVisible',
        'primaryButtonText',
        'secondaryButtonText',
      ],
      [1, 'card-content'],
      [3, 'primaryButtonClicked', 'isHeaderVisible', 'areActionsVisible', 'primaryButtonText'],
      [2, 'margin-top', '0'],
      [1, 'cards-grid'],
    ],
    template: function (n, c) {
      (n & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Cards'),
        t(),
        e(3, 'p', 1),
        i(
          4,
          " Versatile card component wrapping Angular Material's mat-card with additional functionality including configurable headers, actions, and button integration. ",
        ),
        t(),
        e(5, 'h2'),
        i(6, 'Basic Card'),
        t(),
        e(7, 'div', 2)(8, 'acp-dynamic-card', 3)(9, 'p'),
        i(10, 'This is the card content. You can place any content here.'),
        t(),
        e(11, 'p'),
        i(12, 'Cards are surfaces that display content and actions on a single topic.'),
        t()()(),
        m(13, 'app-code-example', 4),
        e(14, 'h2'),
        i(15, 'Card with Actions'),
        t(),
        e(16, 'div', 2)(17, 'acp-dynamic-card', 5),
        g('primaryButtonClicked', function () {
          return c.onPrimaryAction();
        })('secondaryButtonClicked', function () {
          return c.onSecondaryAction();
        }),
        e(18, 'div', 6)(19, 'p')(20, 'strong'),
        i(21, 'Price:'),
        t(),
        i(22, ' $99.99/month'),
        t(),
        e(23, 'p')(24, 'strong'),
        i(25, 'Features:'),
        t()(),
        e(26, 'ul')(27, 'li'),
        i(28, 'Unlimited access'),
        t(),
        e(29, 'li'),
        i(30, 'Priority support'),
        t(),
        e(31, 'li'),
        i(32, 'Advanced analytics'),
        t()()()()(),
        m(33, 'app-code-example', 4),
        e(34, 'h2'),
        i(35, 'Card Without Header'),
        t(),
        e(36, 'div', 2)(37, 'acp-dynamic-card', 7),
        g('primaryButtonClicked', function () {
          return c.onConfirm();
        }),
        e(38, 'div', 6)(39, 'h3', 8),
        i(40, 'Custom Content Card'),
        t(),
        e(41, 'p'),
        i(42, 'This card has no header but includes action buttons at the bottom.'),
        t()()()(),
        m(43, 'app-code-example', 4),
        e(44, 'h2'),
        i(45, 'Multiple Cards Grid'),
        t(),
        e(46, 'div', 9)(47, 'acp-dynamic-card', 3)(48, 'p'),
        i(49, 'Quick stats and metrics'),
        t()(),
        e(50, 'acp-dynamic-card', 3)(51, 'p'),
        i(52, 'Data visualization'),
        t()(),
        e(53, 'acp-dynamic-card', 3)(54, 'p'),
        i(55, 'Generated reports'),
        t()()(),
        m(56, 'app-code-example', 4),
        t()),
        n & 2 &&
          (r(8),
          o('cardTitle', 'Basic Card')('cardSubtitle', 'This is a subtitle')('isHeaderVisible', !0),
          r(5),
          o('code', c.basicCardCode)('language', 'typescript'),
          r(4),
          o('cardTitle', 'Product Details')('cardSubtitle', 'Premium Package')(
            'isHeaderVisible',
            !0,
          )('areActionsVisible', !0)('primaryButtonText', 'Buy Now')(
            'secondaryButtonText',
            'Learn More',
          ),
          r(16),
          o('code', c.cardWithActionsCode)('language', 'typescript'),
          r(4),
          o('isHeaderVisible', !1)('areActionsVisible', !0)('primaryButtonText', 'Confirm'),
          r(6),
          o('code', c.noHeaderCardCode)('language', 'typescript'),
          r(4),
          o('cardTitle', 'Dashboard')('cardSubtitle', 'Overview')('isHeaderVisible', !0),
          r(3),
          o('cardTitle', 'Analytics')('cardSubtitle', 'Performance')('isHeaderVisible', !0),
          r(3),
          o('cardTitle', 'Reports')('cardSubtitle', 'Monthly')('isHeaderVisible', !0),
          r(3),
          o('code', c.gridCardsCode)('language', 'typescript')));
    },
    dependencies: [S, h, s, b],
    styles: [
      '.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px;max-width:1200px}.docs-component-description[_ngcontent-%COMP%]{font-size:16px;line-height:1.6;margin-bottom:32px;color:var(--mat-sys-on-surface-variant)}h2[_ngcontent-%COMP%]{font-size:24px;font-weight:500;margin:32px 0 16px;color:var(--mat-sys-on-surface)}.example-container[_ngcontent-%COMP%]{margin-bottom:24px;max-width:600px}.cards-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;margin-bottom:24px}.card-content[_ngcontent-%COMP%]{line-height:1.6}.card-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:8px 0;padding-left:24px}',
    ],
  });
};
var u = class a {
  static ɵfac = function (n) {
    return new (n || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-cards-examples']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (n, c) {
      n & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Cards Examples'),
        t(),
        e(3, 'p'),
        i(4, 'More examples coming soon...'),
        t()());
    },
    dependencies: [s],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var y = class a {
  static ɵfac = function (n) {
    return new (n || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-cards-api']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (n, c) {
      n & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Cards API'),
        t(),
        e(3, 'p'),
        i(4, 'API documentation coming soon...'),
        t()());
    },
    dependencies: [s],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var C = class a {
  static ɵfac = function (n) {
    return new (n || a)();
  };
  static ɵcmp = d({
    type: a,
    selectors: [['app-cards-styling']],
    decls: 5,
    vars: 0,
    consts: [[1, 'docs-component-viewer-content']],
    template: function (n, c) {
      n & 1 &&
        (e(0, 'div', 0)(1, 'app-doc-heading'),
        i(2, 'Cards Styling'),
        t(),
        e(3, 'p'),
        i(4, 'Styling documentation coming soon...'),
        t()());
    },
    dependencies: [s],
    styles: ['.docs-component-viewer-content[_ngcontent-%COMP%]{padding:24px}'],
  });
};
var F = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: l },
  { path: 'examples', component: u },
  { path: 'api', component: y },
  { path: 'styling', component: C },
  { path: '**', redirectTo: 'overview' },
];
export { F as routes };
