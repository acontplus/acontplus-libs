import { da as r, ia as a, nd as l } from './chunk-GV4MRAZ3.js';
var s = class e {
  bodyTitle = a(l);
  _title = '';
  _originalTitle = 'AcontPlus Angular Material library';
  get title() {
    return this._title;
  }
  set title(t) {
    ((this._title = t && this.capitalizeTitle(t)),
      t !== '' ? (t = `${this._title} | AcontPlus Angular Material `) : (t = this._originalTitle),
      this.bodyTitle.setTitle(t));
  }
  capitalizeTitle(t) {
    return t
      .split('-')
      .join(' ')
      .replace(/\b\w+\b/g, (i) => i.substring(0, 1).toUpperCase() + i.substring(1));
  }
  static ɵfac = function (i) {
    return new (i || e)();
  };
  static ɵprov = r({ token: e, factory: e.ɵfac, providedIn: 'root' });
};
export { s as a };
