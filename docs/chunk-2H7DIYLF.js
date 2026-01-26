import { a as u, b as g, c as f, e as x, j as C } from './chunk-U7VJQUDE.js';
import { c as s, g as m } from './chunk-XJJY6XHD.js';
import {
  $b as i,
  Kb as d,
  Pa as t,
  _b as l,
  ab as p,
  ac as r,
  yb as o,
  zb as n,
} from './chunk-GV4MRAZ3.js';
var M = class c {
  code = '';
  language = 'typescript';
  copied = !1;
  copyCode() {
    (navigator.clipboard.writeText(this.code),
      (this.copied = !0),
      setTimeout(() => {
        this.copied = !1;
      }, 2e3));
  }
  static ɵfac = function (a) {
    return new (a || c)();
  };
  static ɵcmp = p({
    type: c,
    selectors: [['app-code-example']],
    inputs: { code: 'code', language: 'language' },
    decls: 11,
    vars: 5,
    consts: [
      [1, 'code-example-card'],
      [1, 'code-header'],
      [1, 'code-language'],
      ['mat-icon-button', '', 'title', 'Copy code', 3, 'click'],
    ],
    template: function (a, e) {
      (a & 1 &&
        (o(0, 'mat-card', 0)(1, 'mat-card-content')(2, 'div', 1)(3, 'span', 2),
        i(4),
        n(),
        o(5, 'button', 3),
        d('click', function () {
          return e.copyCode();
        }),
        o(6, 'mat-icon'),
        i(7),
        n()()(),
        o(8, 'pre')(9, 'code'),
        i(10),
        n()()()()),
        a & 2 &&
          (t(4),
          r(e.language),
          t(3),
          r(e.copied ? 'check' : 'content_copy'),
          t(2),
          l('language-' + e.language),
          t(),
          r(e.code)));
    },
    dependencies: [C, f, x, m, s, g, u],
    styles: [
      '.code-example-card[_ngcontent-%COMP%]{margin-bottom:24px;background-color:var(--mat-sys-surface-container-low)}.code-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding:8px 0;border-bottom:1px solid var(--mat-sys-outline-variant)}.code-language[_ngcontent-%COMP%]{font-size:12px;font-weight:500;text-transform:uppercase;color:var(--mat-sys-primary)}pre[_ngcontent-%COMP%]{margin:0;padding:16px;overflow-x:auto;background-color:var(--mat-sys-surface-container);border-radius:4px}code[_ngcontent-%COMP%]{font-family:Roboto Mono,monospace;font-size:14px;line-height:1.6;color:var(--mat-sys-on-surface)}',
    ],
  });
};
export { M as a };
