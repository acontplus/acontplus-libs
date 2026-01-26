import { a as L } from './chunk-EL47QAQT.js';
import { a as y, b as C, c as k, d, e as T, f as P } from './chunk-ZTXRY76I.js';
import { c as D, d as I, e as M, f as S } from './chunk-4JMGPBNX.js';
import {
  $b as g,
  Ab as x,
  Mb as b,
  Pa as r,
  Wb as m,
  X as v,
  ab as w,
  bc as _,
  ia as i,
  k as l,
  ub as u,
  vb as f,
  wb as h,
  xb as s,
  yb as a,
  zb as p,
} from './chunk-GV4MRAZ3.js';
function E(n, o) {
  if ((n & 1 && (a(0, 'a', 4, 1), g(2), p()), n & 2)) {
    let e = o.$implicit,
      t = m(1),
      c = b();
    (s('routerLink', c.componentId + '/' + e.toLowerCase())('active', t.isActive),
      r(2),
      _(' ', e, ' '));
  }
}
var A = class n {
  _router = i(d);
  _route = i(C);
  _componentPageTitle = i(L);
  sections = new Set(['overview', 'examples', 'api', 'styling']);
  _destroyed = new l();
  componentId = '';
  constructor() {
    let o = [this._route.params];
    (this._route.parent && o.push(this._route.parent.params),
      this._router.events.pipe(v(this._router)).subscribe((e) => {
        if (e instanceof d || e instanceof y) {
          let t = e.url.split('/');
          ((this.componentId = t[2] ?? t[1]), (this._componentPageTitle.title = this.componentId));
        }
      }));
  }
  ngOnDestroy() {
    (this._destroyed.next(), this._destroyed.complete());
  }
  static ɵfac = function (e) {
    return new (e || n)();
  };
  static ɵcmp = w({
    type: n,
    selectors: [['app-component-viewer']],
    decls: 7,
    vars: 1,
    consts: [
      ['panel', ''],
      ['rla', 'routerLinkActive'],
      [1, 'docs-component-viewer'],
      [
        'mat-tab-nav-bar',
        '',
        'mat-stretch-tabs',
        'false',
        'aria-label',
        'Documentation Sections',
        'id',
        'component-viewer',
        1,
        'docs-component-viewer-tabbed-content',
        3,
        'tabPanel',
      ],
      [
        'mat-tab-link',
        '',
        'routerLinkActive',
        '',
        1,
        'docs-component-viewer-section-tab',
        3,
        'routerLink',
        'active',
      ],
      [1, 'docs-component-viewer-content'],
    ],
    template: function (e, t) {
      if (
        (e & 1 &&
          (a(0, 'div', 2)(1, 'nav', 3),
          f(2, E, 3, 3, 'a', 4, u),
          p(),
          a(4, 'mat-tab-nav-panel', 5, 0),
          x(6, 'router-outlet'),
          p()()),
        e & 2)
      ) {
        let c = m(5);
        (r(), s('tabPanel', c), r(), h(t.sections));
      }
    },
    dependencies: [S, D, M, I, P, T, k],
    styles: [
      `guide-viewer,app-component-viewer{color:var(--mat-sys-on-surface)}app-component-viewer{width:calc(100% - 341px);font-weight:400;line-height:1.5;padding:20px 50px}@media(max-width:959px){app-component-viewer{width:calc(100% - 100px)}}@media(width<=599px){app-component-viewer{width:calc(100% - 30px);padding-left:15px;padding-right:15px}}app-component-viewer .docs-component-viewer-section-tab{min-width:160px;text-transform:uppercase}.docs-component-viewer-tabbed-content{margin-bottom:25px}.docs-component-viewer-content{position:relative;min-height:500px}.docs-component-viewer-content component-overview,.docs-component-viewer-content component-api{display:flex;align-items:flex-start;overflow:visible}@media(max-width:959px){.docs-component-viewer-content component-overview,.docs-component-viewer-content component-api{flex-direction:column}}.docs-component-viewer-content table-of-contents{top:35px;position:sticky}@media(max-width:959px){.docs-component-viewer-content table-of-contents{order:-1;position:inherit;width:auto;padding-left:0}}.docs-component-view-text-content{flex-grow:1;width:100%}.docs-component-api,.docs-component-overview{width:80%}@media(max-width:959px){.docs-component-api,.docs-component-overview{width:100%;margin-right:0}}
`,
    ],
    encapsulation: 2,
  });
};
export { A as a };
