import {
  c as et,
  e as He,
  g as Ce,
  h as tt,
  i as yi,
  j as Ao,
  k as Fo,
  l as Vo,
  n as Ro,
  q as Io,
} from './chunk-57Q2UAVZ.js';
import { a as Oo } from './chunk-XJJY6XHD.js';
import {
  $b as ge,
  $d as gi,
  Aa as xt,
  Ab as Z,
  B as Qi,
  Ba as _e,
  Bb as di,
  Bd as pi,
  C as Ki,
  Ca as ie,
  Cb as ci,
  Cc as Je,
  Cd as go,
  Da as se,
  Db as hi,
  Dc as mo,
  Ed as Re,
  Fa as C,
  Fd as vo,
  G as Ne,
  Gb as St,
  Gc as he,
  H as De,
  Hb as ke,
  Hd as yo,
  Ia as no,
  Ib as Ee,
  Jc as M,
  Kb as I,
  Kc as Ve,
  Lc as fo,
  Ld as bo,
  M as Ji,
  Mb as P,
  Md as xo,
  Nb as Oe,
  Nd as re,
  Ob as H,
  Oc as mi,
  Od as ue,
  Pa as m,
  Pb as Dt,
  Pd as Co,
  Qb as ae,
  Ra as Me,
  Rb as y,
  Rd as wo,
  S as eo,
  Sa as ro,
  Sb as b,
  Sd as _i,
  Tb as ao,
  Tc as po,
  Td as So,
  Ua as Le,
  Ub as lo,
  Ud as ve,
  Va as oe,
  Vb as ui,
  Vc as Ot,
  Vd as W,
  Wa as f,
  Wb as Ae,
  Wd as R,
  X as Qe,
  Xb as Mt,
  Xc as At,
  Xd as ye,
  Y as ai,
  Ya as Ct,
  Yb as w,
  Z as z,
  Zd as Do,
  _ as to,
  _b as kt,
  a as S,
  aa as bt,
  ab as B,
  ac as Fe,
  ae as vi,
  b as $,
  bb as O,
  bc as co,
  be as Mo,
  ca as Q,
  cb as u,
  ce as be,
  da as j,
  ea as k,
  fb as L,
  g as fe,
  ga as g,
  gb as xe,
  hc as ho,
  he as ko,
  ia as a,
  ic as D,
  ie as Eo,
  jb as wt,
  k as x,
  ka as io,
  kb as so,
  ma as le,
  na as de,
  nb as li,
  o as $i,
  oa as Ke,
  p as Zi,
  pa as oo,
  pb as A,
  pd as ne,
  qa as ee,
  qb as F,
  qd as fi,
  ra as pe,
  sb as V,
  ua as E,
  va as N,
  vc as Et,
  w as Se,
  xb as T,
  xc as ce,
  xd as Be,
  yb as p,
  yc as uo,
  yd as _o,
  za as te,
  zb as v,
  zd as Ft,
} from './chunk-GV4MRAZ3.js';
var it = class {
  _multiple;
  _emitChanges;
  compareWith;
  _selection = new Set();
  _deselectedToEmit = [];
  _selectedToEmit = [];
  _selected;
  get selected() {
    return (
      this._selected || (this._selected = Array.from(this._selection.values())),
      this._selected
    );
  }
  changed = new x();
  constructor(i = !1, e, t = !0, n) {
    ((this._multiple = i),
      (this._emitChanges = t),
      (this.compareWith = n),
      e &&
        e.length &&
        (i ? e.forEach((r) => this._markSelected(r)) : this._markSelected(e[0]),
        (this._selectedToEmit.length = 0)));
  }
  select(...i) {
    (this._verifyValueAssignment(i), i.forEach((t) => this._markSelected(t)));
    let e = this._hasQueuedChanges();
    return (this._emitChangeEvent(), e);
  }
  deselect(...i) {
    (this._verifyValueAssignment(i), i.forEach((t) => this._unmarkSelected(t)));
    let e = this._hasQueuedChanges();
    return (this._emitChangeEvent(), e);
  }
  setSelection(...i) {
    this._verifyValueAssignment(i);
    let e = this.selected,
      t = new Set(i.map((r) => this._getConcreteValue(r)));
    (i.forEach((r) => this._markSelected(r)),
      e
        .filter((r) => !t.has(this._getConcreteValue(r, t)))
        .forEach((r) => this._unmarkSelected(r)));
    let n = this._hasQueuedChanges();
    return (this._emitChangeEvent(), n);
  }
  toggle(i) {
    return this.isSelected(i) ? this.deselect(i) : this.select(i);
  }
  clear(i = !0) {
    this._unmarkAll();
    let e = this._hasQueuedChanges();
    return (i && this._emitChangeEvent(), e);
  }
  isSelected(i) {
    return this._selection.has(this._getConcreteValue(i));
  }
  isEmpty() {
    return this._selection.size === 0;
  }
  hasValue() {
    return !this.isEmpty();
  }
  sort(i) {
    this._multiple && this.selected && this._selected.sort(i);
  }
  isMultipleSelection() {
    return this._multiple;
  }
  _emitChangeEvent() {
    ((this._selected = null),
      (this._selectedToEmit.length || this._deselectedToEmit.length) &&
        (this.changed.next({
          source: this,
          added: this._selectedToEmit,
          removed: this._deselectedToEmit,
        }),
        (this._deselectedToEmit = []),
        (this._selectedToEmit = [])));
  }
  _markSelected(i) {
    ((i = this._getConcreteValue(i)),
      this.isSelected(i) ||
        (this._multiple || this._unmarkAll(),
        this.isSelected(i) || this._selection.add(i),
        this._emitChanges && this._selectedToEmit.push(i)));
  }
  _unmarkSelected(i) {
    ((i = this._getConcreteValue(i)),
      this.isSelected(i) &&
        (this._selection.delete(i), this._emitChanges && this._deselectedToEmit.push(i)));
  }
  _unmarkAll() {
    this.isEmpty() || this._selection.forEach((i) => this._unmarkSelected(i));
  }
  _verifyValueAssignment(i) {
    i.length > 1 && this._multiple;
  }
  _hasQueuedChanges() {
    return !!(this._deselectedToEmit.length || this._selectedToEmit.length);
  }
  _getConcreteValue(i, e) {
    if (this.compareWith) {
      e = e ?? this._selection;
      for (let t of e) if (this.compareWith(i, t)) return t;
      return i;
    } else return i;
  }
};
var lr = (() => {
  class o {
    _listeners = [];
    notify(e, t) {
      for (let n of this._listeners) n(e, t);
    }
    listen(e) {
      return (
        this._listeners.push(e),
        () => {
          this._listeners = this._listeners.filter((t) => e !== t);
        }
      );
    }
    ngOnDestroy() {
      this._listeners = [];
    }
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
  }
  return o;
})();
var bi = class {
  applyChanges(i, e, t, n, r) {
    i.forEachOperation((s, l, d) => {
      let h, c;
      if (s.previousIndex == null) {
        let _ = t(s, l, d);
        ((h = e.createEmbeddedView(_.templateRef, _.context, _.index)), (c = et.INSERTED));
      } else
        d == null
          ? (e.remove(l), (c = et.REMOVED))
          : ((h = e.get(l)), e.move(h, d), (c = et.MOVED));
      r && r({ context: h?.context, operation: c, record: s });
    });
  }
  detach() {}
};
var jo = (() => {
    class o {
      _renderer;
      _elementRef;
      onChange = (e) => {};
      onTouched = () => {};
      constructor(e, t) {
        ((this._renderer = e), (this._elementRef = t));
      }
      setProperty(e, t) {
        this._renderer.setProperty(this._elementRef.nativeElement, e, t);
      }
      registerOnTouched(e) {
        this.onTouched = e;
      }
      registerOnChange(e) {
        this.onChange = e;
      }
      setDisabledState(e) {
        this.setProperty('disabled', e);
      }
      static ɵfac = function (t) {
        return new (t || o)(f(oe), f(C));
      };
      static ɵdir = u({ type: o });
    }
    return o;
  })(),
  Wo = (() => {
    class o extends jo {
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵdir = u({ type: o, features: [L] });
    }
    return o;
  })(),
  ht = new g('');
var dr = { provide: ht, useExisting: Q(() => Go), multi: !0 };
function cr() {
  let o = mi() ? mi().getUserAgent() : '';
  return /android (\d+)/.test(o.toLowerCase());
}
var hr = new g(''),
  Go = (() => {
    class o extends jo {
      _compositionMode;
      _composing = !1;
      constructor(e, t, n) {
        (super(e, t),
          (this._compositionMode = n),
          this._compositionMode == null && (this._compositionMode = !cr()));
      }
      writeValue(e) {
        let t = e ?? '';
        this.setProperty('value', t);
      }
      _handleInput(e) {
        (!this._compositionMode || (this._compositionMode && !this._composing)) && this.onChange(e);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(e) {
        ((this._composing = !1), this._compositionMode && this.onChange(e));
      }
      static ɵfac = function (t) {
        return new (t || o)(f(oe), f(C), f(hr, 8));
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['input', 'formControlName', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControlName', ''],
          ['input', 'formControl', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControl', ''],
          ['input', 'ngModel', '', 3, 'type', 'checkbox'],
          ['textarea', 'ngModel', ''],
          ['', 'ngDefaultControl', ''],
        ],
        hostBindings: function (t, n) {
          t & 1 &&
            I('input', function (s) {
              return n._handleInput(s.target.value);
            })('blur', function () {
              return n.onTouched();
            })('compositionstart', function () {
              return n._compositionStart();
            })('compositionend', function (s) {
              return n._compositionEnd(s.target.value);
            });
        },
        standalone: !1,
        features: [D([dr]), L],
      });
    }
    return o;
  })();
function Si(o) {
  return o == null || Di(o) === 0;
}
function Di(o) {
  return o == null
    ? null
    : Array.isArray(o) || typeof o == 'string'
      ? o.length
      : o instanceof Set
        ? o.size
        : null;
}
var me = new g(''),
  Ie = new g(''),
  ur =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  We = class {
    static min(i) {
      return Yo(i);
    }
    static max(i) {
      return Uo(i);
    }
    static required(i) {
      return mr(i);
    }
    static requiredTrue(i) {
      return fr(i);
    }
    static email(i) {
      return pr(i);
    }
    static minLength(i) {
      return _r(i);
    }
    static maxLength(i) {
      return Xo(i);
    }
    static pattern(i) {
      return gr(i);
    }
    static nullValidator(i) {
      return Rt();
    }
    static compose(i) {
      return Jo(i);
    }
    static composeAsync(i) {
      return en(i);
    }
  };
function Yo(o) {
  return (i) => {
    if (i.value == null || o == null) return null;
    let e = parseFloat(i.value);
    return !isNaN(e) && e < o ? { min: { min: o, actual: i.value } } : null;
  };
}
function Uo(o) {
  return (i) => {
    if (i.value == null || o == null) return null;
    let e = parseFloat(i.value);
    return !isNaN(e) && e > o ? { max: { max: o, actual: i.value } } : null;
  };
}
function mr(o) {
  return Si(o.value) ? { required: !0 } : null;
}
function fr(o) {
  return o.value === !0 ? null : { required: !0 };
}
function pr(o) {
  return Si(o.value) || ur.test(o.value) ? null : { email: !0 };
}
function _r(o) {
  return (i) => {
    let e = i.value?.length ?? Di(i.value);
    return e === null || e === 0
      ? null
      : e < o
        ? { minlength: { requiredLength: o, actualLength: e } }
        : null;
  };
}
function Xo(o) {
  return (i) => {
    let e = i.value?.length ?? Di(i.value);
    return e !== null && e > o ? { maxlength: { requiredLength: o, actualLength: e } } : null;
  };
}
function gr(o) {
  if (!o) return Rt;
  let i, e;
  return (
    typeof o == 'string'
      ? ((e = ''),
        o.charAt(0) !== '^' && (e += '^'),
        (e += o),
        o.charAt(o.length - 1) !== '$' && (e += '$'),
        (i = new RegExp(e)))
      : ((e = o.toString()), (i = o)),
    (t) => {
      if (Si(t.value)) return null;
      let n = t.value;
      return i.test(n) ? null : { pattern: { requiredPattern: e, actualValue: n } };
    }
  );
}
function Rt(o) {
  return null;
}
function qo(o) {
  return o != null;
}
function $o(o) {
  return so(o) ? Zi(o) : o;
}
function Zo(o) {
  let i = {};
  return (
    o.forEach((e) => {
      i = e != null ? S(S({}, i), e) : i;
    }),
    Object.keys(i).length === 0 ? null : i
  );
}
function Qo(o, i) {
  return i.map((e) => e(o));
}
function vr(o) {
  return !o.validate;
}
function Ko(o) {
  return o.map((i) => (vr(i) ? i : (e) => i.validate(e)));
}
function Jo(o) {
  if (!o) return null;
  let i = o.filter(qo);
  return i.length == 0
    ? null
    : function (e) {
        return Zo(Qo(e, i));
      };
}
function Mi(o) {
  return o != null ? Jo(Ko(o)) : null;
}
function en(o) {
  if (!o) return null;
  let i = o.filter(qo);
  return i.length == 0
    ? null
    : function (e) {
        let t = Qo(e, i).map($o);
        return Ki(t).pipe(Se(Zo));
      };
}
function ki(o) {
  return o != null ? en(Ko(o)) : null;
}
function Po(o, i) {
  return o === null ? [i] : Array.isArray(o) ? [...o, i] : [o, i];
}
function tn(o) {
  return o._rawValidators;
}
function on(o) {
  return o._rawAsyncValidators;
}
function xi(o) {
  return o ? (Array.isArray(o) ? o : [o]) : [];
}
function It(o, i) {
  return Array.isArray(o) ? o.includes(i) : o === i;
}
function To(o, i) {
  let e = xi(i);
  return (
    xi(o).forEach((n) => {
      It(e, n) || e.push(n);
    }),
    e
  );
}
function No(o, i) {
  return xi(i).filter((e) => !It(o, e));
}
var Pt = class {
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _composedValidatorFn;
    _composedAsyncValidatorFn;
    _rawValidators = [];
    _rawAsyncValidators = [];
    _setValidators(i) {
      ((this._rawValidators = i || []), (this._composedValidatorFn = Mi(this._rawValidators)));
    }
    _setAsyncValidators(i) {
      ((this._rawAsyncValidators = i || []),
        (this._composedAsyncValidatorFn = ki(this._rawAsyncValidators)));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _onDestroyCallbacks = [];
    _registerOnDestroy(i) {
      this._onDestroyCallbacks.push(i);
    }
    _invokeOnDestroyCallbacks() {
      (this._onDestroyCallbacks.forEach((i) => i()), (this._onDestroyCallbacks = []));
    }
    reset(i = void 0) {
      this.control && this.control.reset(i);
    }
    hasError(i, e) {
      return this.control ? this.control.hasError(i, e) : !1;
    }
    getError(i, e) {
      return this.control ? this.control.getError(i, e) : null;
    }
  },
  X = class extends Pt {
    name;
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  K = class extends Pt {
    _parent = null;
    name = null;
    valueAccessor = null;
  },
  Tt = class {
    _cd;
    constructor(i) {
      this._cd = i;
    }
    get isTouched() {
      return (this._cd?.control?._touched?.(), !!this._cd?.control?.touched);
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return (this._cd?.control?._pristine?.(), !!this._cd?.control?.pristine);
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return (this._cd?.control?._status?.(), !!this._cd?.control?.valid);
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return (this._cd?._submitted?.(), !!this._cd?.submitted);
    }
  };
var Wa = (() => {
    class o extends Tt {
      constructor(e) {
        super(e);
      }
      static ɵfac = function (t) {
        return new (t || o)(f(K, 2));
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['', 'formControlName', ''],
          ['', 'ngModel', ''],
          ['', 'formControl', ''],
        ],
        hostVars: 14,
        hostBindings: function (t, n) {
          t & 2 &&
            w('ng-untouched', n.isUntouched)('ng-touched', n.isTouched)(
              'ng-pristine',
              n.isPristine,
            )('ng-dirty', n.isDirty)('ng-valid', n.isValid)('ng-invalid', n.isInvalid)(
              'ng-pending',
              n.isPending,
            );
        },
        standalone: !1,
        features: [L],
      });
    }
    return o;
  })(),
  Ga = (() => {
    class o extends Tt {
      constructor(e) {
        super(e);
      }
      static ɵfac = function (t) {
        return new (t || o)(f(X, 10));
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['', 'formGroupName', ''],
          ['', 'formArrayName', ''],
          ['', 'ngModelGroup', ''],
          ['', 'formGroup', ''],
          ['', 'formArray', ''],
          ['form', 3, 'ngNoForm', ''],
          ['', 'ngForm', ''],
        ],
        hostVars: 16,
        hostBindings: function (t, n) {
          t & 2 &&
            w('ng-untouched', n.isUntouched)('ng-touched', n.isTouched)(
              'ng-pristine',
              n.isPristine,
            )('ng-dirty', n.isDirty)('ng-valid', n.isValid)('ng-invalid', n.isInvalid)(
              'ng-pending',
              n.isPending,
            )('ng-submitted', n.isSubmitted);
        },
        standalone: !1,
        features: [L],
      });
    }
    return o;
  })();
var ot = 'VALID',
  Vt = 'INVALID',
  ze = 'PENDING',
  nt = 'DISABLED',
  we = class {},
  Nt = class extends we {
    value;
    source;
    constructor(i, e) {
      (super(), (this.value = i), (this.source = e));
    }
  },
  st = class extends we {
    pristine;
    source;
    constructor(i, e) {
      (super(), (this.pristine = i), (this.source = e));
    }
  },
  at = class extends we {
    touched;
    source;
    constructor(i, e) {
      (super(), (this.touched = i), (this.source = e));
    }
  },
  je = class extends we {
    status;
    source;
    constructor(i, e) {
      (super(), (this.status = i), (this.source = e));
    }
  },
  Lt = class extends we {
    source;
    constructor(i) {
      (super(), (this.source = i));
    }
  },
  dt = class extends we {
    source;
    constructor(i) {
      (super(), (this.source = i));
    }
  };
function Ei(o) {
  return (jt(o) ? o.validators : o) || null;
}
function yr(o) {
  return Array.isArray(o) ? Mi(o) : o || null;
}
function Oi(o, i) {
  return (jt(i) ? i.asyncValidators : o) || null;
}
function br(o) {
  return Array.isArray(o) ? ki(o) : o || null;
}
function jt(o) {
  return o != null && !Array.isArray(o) && typeof o == 'object';
}
function nn(o, i, e) {
  let t = o.controls;
  if (!(i ? Object.keys(t) : t).length) throw new bt(1e3, '');
  if (!t[e]) throw new bt(1001, '');
}
function rn(o, i, e) {
  o._forEachChild((t, n) => {
    if (e[n] === void 0) throw new bt(1002, '');
  });
}
var Ge = class {
    _pendingDirty = !1;
    _hasOwnPendingAsyncValidator = null;
    _pendingTouched = !1;
    _onCollectionChange = () => {};
    _updateOn;
    _parent = null;
    _asyncValidationSubscription;
    _composedValidatorFn;
    _composedAsyncValidatorFn;
    _rawValidators;
    _rawAsyncValidators;
    value;
    constructor(i, e) {
      (this._assignValidators(i), this._assignAsyncValidators(e));
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(i) {
      this._rawValidators = this._composedValidatorFn = i;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(i) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = i;
    }
    get parent() {
      return this._parent;
    }
    get status() {
      return _e(this.statusReactive);
    }
    set status(i) {
      _e(() => this.statusReactive.set(i));
    }
    _status = ce(() => this.statusReactive());
    statusReactive = te(void 0);
    get valid() {
      return this.status === ot;
    }
    get invalid() {
      return this.status === Vt;
    }
    get pending() {
      return this.status == ze;
    }
    get disabled() {
      return this.status === nt;
    }
    get enabled() {
      return this.status !== nt;
    }
    errors;
    get pristine() {
      return _e(this.pristineReactive);
    }
    set pristine(i) {
      _e(() => this.pristineReactive.set(i));
    }
    _pristine = ce(() => this.pristineReactive());
    pristineReactive = te(!0);
    get dirty() {
      return !this.pristine;
    }
    get touched() {
      return _e(this.touchedReactive);
    }
    set touched(i) {
      _e(() => this.touchedReactive.set(i));
    }
    _touched = ce(() => this.touchedReactive());
    touchedReactive = te(!1);
    get untouched() {
      return !this.touched;
    }
    _events = new x();
    events = this._events.asObservable();
    valueChanges;
    statusChanges;
    get updateOn() {
      return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
    }
    setValidators(i) {
      this._assignValidators(i);
    }
    setAsyncValidators(i) {
      this._assignAsyncValidators(i);
    }
    addValidators(i) {
      this.setValidators(To(i, this._rawValidators));
    }
    addAsyncValidators(i) {
      this.setAsyncValidators(To(i, this._rawAsyncValidators));
    }
    removeValidators(i) {
      this.setValidators(No(i, this._rawValidators));
    }
    removeAsyncValidators(i) {
      this.setAsyncValidators(No(i, this._rawAsyncValidators));
    }
    hasValidator(i) {
      return It(this._rawValidators, i);
    }
    hasAsyncValidator(i) {
      return It(this._rawAsyncValidators, i);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(i = {}) {
      let e = this.touched === !1;
      this.touched = !0;
      let t = i.sourceControl ?? this;
      (this._parent && !i.onlySelf && this._parent.markAsTouched($(S({}, i), { sourceControl: t })),
        e && i.emitEvent !== !1 && this._events.next(new at(!0, t)));
    }
    markAllAsDirty(i = {}) {
      (this.markAsDirty({ onlySelf: !0, emitEvent: i.emitEvent, sourceControl: this }),
        this._forEachChild((e) => e.markAllAsDirty(i)));
    }
    markAllAsTouched(i = {}) {
      (this.markAsTouched({ onlySelf: !0, emitEvent: i.emitEvent, sourceControl: this }),
        this._forEachChild((e) => e.markAllAsTouched(i)));
    }
    markAsUntouched(i = {}) {
      let e = this.touched === !0;
      ((this.touched = !1), (this._pendingTouched = !1));
      let t = i.sourceControl ?? this;
      (this._forEachChild((n) => {
        n.markAsUntouched({ onlySelf: !0, emitEvent: i.emitEvent, sourceControl: t });
      }),
        this._parent && !i.onlySelf && this._parent._updateTouched(i, t),
        e && i.emitEvent !== !1 && this._events.next(new at(!1, t)));
    }
    markAsDirty(i = {}) {
      let e = this.pristine === !0;
      this.pristine = !1;
      let t = i.sourceControl ?? this;
      (this._parent && !i.onlySelf && this._parent.markAsDirty($(S({}, i), { sourceControl: t })),
        e && i.emitEvent !== !1 && this._events.next(new st(!1, t)));
    }
    markAsPristine(i = {}) {
      let e = this.pristine === !1;
      ((this.pristine = !0), (this._pendingDirty = !1));
      let t = i.sourceControl ?? this;
      (this._forEachChild((n) => {
        n.markAsPristine({ onlySelf: !0, emitEvent: i.emitEvent });
      }),
        this._parent && !i.onlySelf && this._parent._updatePristine(i, t),
        e && i.emitEvent !== !1 && this._events.next(new st(!0, t)));
    }
    markAsPending(i = {}) {
      this.status = ze;
      let e = i.sourceControl ?? this;
      (i.emitEvent !== !1 &&
        (this._events.next(new je(this.status, e)), this.statusChanges.emit(this.status)),
        this._parent &&
          !i.onlySelf &&
          this._parent.markAsPending($(S({}, i), { sourceControl: e })));
    }
    disable(i = {}) {
      let e = this._parentMarkedDirty(i.onlySelf);
      ((this.status = nt),
        (this.errors = null),
        this._forEachChild((n) => {
          n.disable($(S({}, i), { onlySelf: !0 }));
        }),
        this._updateValue());
      let t = i.sourceControl ?? this;
      (i.emitEvent !== !1 &&
        (this._events.next(new Nt(this.value, t)),
        this._events.next(new je(this.status, t)),
        this.valueChanges.emit(this.value),
        this.statusChanges.emit(this.status)),
        this._updateAncestors($(S({}, i), { skipPristineCheck: e }), this),
        this._onDisabledChange.forEach((n) => n(!0)));
    }
    enable(i = {}) {
      let e = this._parentMarkedDirty(i.onlySelf);
      ((this.status = ot),
        this._forEachChild((t) => {
          t.enable($(S({}, i), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: i.emitEvent }),
        this._updateAncestors($(S({}, i), { skipPristineCheck: e }), this),
        this._onDisabledChange.forEach((t) => t(!1)));
    }
    _updateAncestors(i, e) {
      this._parent &&
        !i.onlySelf &&
        (this._parent.updateValueAndValidity(i),
        i.skipPristineCheck || this._parent._updatePristine({}, e),
        this._parent._updateTouched({}, e));
    }
    setParent(i) {
      this._parent = i;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(i = {}) {
      if ((this._setInitialStatus(), this._updateValue(), this.enabled)) {
        let t = this._cancelExistingSubscription();
        ((this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === ot || this.status === ze) && this._runAsyncValidator(t, i.emitEvent));
      }
      let e = i.sourceControl ?? this;
      (i.emitEvent !== !1 &&
        (this._events.next(new Nt(this.value, e)),
        this._events.next(new je(this.status, e)),
        this.valueChanges.emit(this.value),
        this.statusChanges.emit(this.status)),
        this._parent &&
          !i.onlySelf &&
          this._parent.updateValueAndValidity($(S({}, i), { sourceControl: e })));
    }
    _updateTreeValidity(i = { emitEvent: !0 }) {
      (this._forEachChild((e) => e._updateTreeValidity(i)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: i.emitEvent }));
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? nt : ot;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(i, e) {
      if (this.asyncValidator) {
        ((this.status = ze),
          (this._hasOwnPendingAsyncValidator = {
            emitEvent: e !== !1,
            shouldHaveEmitted: i !== !1,
          }));
        let t = $o(this.asyncValidator(this));
        this._asyncValidationSubscription = t.subscribe((n) => {
          ((this._hasOwnPendingAsyncValidator = null),
            this.setErrors(n, { emitEvent: e, shouldHaveEmitted: i }));
        });
      }
    }
    _cancelExistingSubscription() {
      if (this._asyncValidationSubscription) {
        this._asyncValidationSubscription.unsubscribe();
        let i =
          (this._hasOwnPendingAsyncValidator?.emitEvent ||
            this._hasOwnPendingAsyncValidator?.shouldHaveEmitted) ??
          !1;
        return ((this._hasOwnPendingAsyncValidator = null), i);
      }
      return !1;
    }
    setErrors(i, e = {}) {
      ((this.errors = i),
        this._updateControlsErrors(e.emitEvent !== !1, this, e.shouldHaveEmitted));
    }
    get(i) {
      let e = i;
      return e == null || (Array.isArray(e) || (e = e.split('.')), e.length === 0)
        ? null
        : e.reduce((t, n) => t && t._find(n), this);
    }
    getError(i, e) {
      let t = e ? this.get(e) : this;
      return t && t.errors ? t.errors[i] : null;
    }
    hasError(i, e) {
      return !!this.getError(i, e);
    }
    get root() {
      let i = this;
      for (; i._parent; ) i = i._parent;
      return i;
    }
    _updateControlsErrors(i, e, t) {
      ((this.status = this._calculateStatus()),
        i && this.statusChanges.emit(this.status),
        (i || t) && this._events.next(new je(this.status, e)),
        this._parent && this._parent._updateControlsErrors(i, e, t));
    }
    _initObservables() {
      ((this.valueChanges = new E()), (this.statusChanges = new E()));
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? nt
        : this.errors
          ? Vt
          : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(ze)
            ? ze
            : this._anyControlsHaveStatus(Vt)
              ? Vt
              : ot;
    }
    _anyControlsHaveStatus(i) {
      return this._anyControls((e) => e.status === i);
    }
    _anyControlsDirty() {
      return this._anyControls((i) => i.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((i) => i.touched);
    }
    _updatePristine(i, e) {
      let t = !this._anyControlsDirty(),
        n = this.pristine !== t;
      ((this.pristine = t),
        this._parent && !i.onlySelf && this._parent._updatePristine(i, e),
        n && this._events.next(new st(this.pristine, e)));
    }
    _updateTouched(i = {}, e) {
      ((this.touched = this._anyControlsTouched()),
        this._events.next(new at(this.touched, e)),
        this._parent && !i.onlySelf && this._parent._updateTouched(i, e));
    }
    _onDisabledChange = [];
    _registerOnCollectionChange(i) {
      this._onCollectionChange = i;
    }
    _setUpdateStrategy(i) {
      jt(i) && i.updateOn != null && (this._updateOn = i.updateOn);
    }
    _parentMarkedDirty(i) {
      let e = this._parent && this._parent.dirty;
      return !i && !!e && !this._parent._anyControlsDirty();
    }
    _find(i) {
      return null;
    }
    _assignValidators(i) {
      ((this._rawValidators = Array.isArray(i) ? i.slice() : i),
        (this._composedValidatorFn = yr(this._rawValidators)));
    }
    _assignAsyncValidators(i) {
      ((this._rawAsyncValidators = Array.isArray(i) ? i.slice() : i),
        (this._composedAsyncValidatorFn = br(this._rawAsyncValidators)));
    }
  },
  Ye = class extends Ge {
    constructor(i, e, t) {
      (super(Ei(e), Oi(t, e)),
        (this.controls = i),
        this._initObservables(),
        this._setUpdateStrategy(e),
        this._setUpControls(),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator }));
    }
    controls;
    registerControl(i, e) {
      return this.controls[i]
        ? this.controls[i]
        : ((this.controls[i] = e),
          e.setParent(this),
          e._registerOnCollectionChange(this._onCollectionChange),
          e);
    }
    addControl(i, e, t = {}) {
      (this.registerControl(i, e),
        this.updateValueAndValidity({ emitEvent: t.emitEvent }),
        this._onCollectionChange());
    }
    removeControl(i, e = {}) {
      (this.controls[i] && this.controls[i]._registerOnCollectionChange(() => {}),
        delete this.controls[i],
        this.updateValueAndValidity({ emitEvent: e.emitEvent }),
        this._onCollectionChange());
    }
    setControl(i, e, t = {}) {
      (this.controls[i] && this.controls[i]._registerOnCollectionChange(() => {}),
        delete this.controls[i],
        e && this.registerControl(i, e),
        this.updateValueAndValidity({ emitEvent: t.emitEvent }),
        this._onCollectionChange());
    }
    contains(i) {
      return this.controls.hasOwnProperty(i) && this.controls[i].enabled;
    }
    setValue(i, e = {}) {
      (rn(this, !0, i),
        Object.keys(i).forEach((t) => {
          (nn(this, !0, t),
            this.controls[t].setValue(i[t], { onlySelf: !0, emitEvent: e.emitEvent }));
        }),
        this.updateValueAndValidity(e));
    }
    patchValue(i, e = {}) {
      i != null &&
        (Object.keys(i).forEach((t) => {
          let n = this.controls[t];
          n && n.patchValue(i[t], { onlySelf: !0, emitEvent: e.emitEvent });
        }),
        this.updateValueAndValidity(e));
    }
    reset(i = {}, e = {}) {
      (this._forEachChild((t, n) => {
        t.reset(i ? i[n] : null, $(S({}, e), { onlySelf: !0 }));
      }),
        this._updatePristine(e, this),
        this._updateTouched(e, this),
        this.updateValueAndValidity(e),
        e?.emitEvent !== !1 && this._events.next(new dt(this)));
    }
    getRawValue() {
      return this._reduceChildren({}, (i, e, t) => ((i[t] = e.getRawValue()), i));
    }
    _syncPendingControls() {
      let i = this._reduceChildren(!1, (e, t) => (t._syncPendingControls() ? !0 : e));
      return (i && this.updateValueAndValidity({ onlySelf: !0 }), i);
    }
    _forEachChild(i) {
      Object.keys(this.controls).forEach((e) => {
        let t = this.controls[e];
        t && i(t, e);
      });
    }
    _setUpControls() {
      this._forEachChild((i) => {
        (i.setParent(this), i._registerOnCollectionChange(this._onCollectionChange));
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(i) {
      for (let [e, t] of Object.entries(this.controls)) if (this.contains(e) && i(t)) return !0;
      return !1;
    }
    _reduceValue() {
      let i = {};
      return this._reduceChildren(
        i,
        (e, t, n) => ((t.enabled || this.disabled) && (e[n] = t.value), e),
      );
    }
    _reduceChildren(i, e) {
      let t = i;
      return (
        this._forEachChild((n, r) => {
          t = e(t, n, r);
        }),
        t
      );
    }
    _allControlsDisabled() {
      for (let i of Object.keys(this.controls)) if (this.controls[i].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(i) {
      return this.controls.hasOwnProperty(i) ? this.controls[i] : null;
    }
  };
var Ci = class extends Ye {};
var Ue = new g('', { factory: () => Wt }),
  Wt = 'always';
function Gt(o, i) {
  return [...i.path, o];
}
function ct(o, i, e = Wt) {
  (Ai(o, i),
    i.valueAccessor.writeValue(o.value),
    (o.disabled || e === 'always') && i.valueAccessor.setDisabledState?.(o.disabled),
    Cr(o, i),
    Sr(o, i),
    wr(o, i),
    xr(o, i));
}
function Bt(o, i, e = !0) {
  let t = () => {};
  (i.valueAccessor && (i.valueAccessor.registerOnChange(t), i.valueAccessor.registerOnTouched(t)),
    zt(o, i),
    o && (i._invokeOnDestroyCallbacks(), o._registerOnCollectionChange(() => {})));
}
function Ht(o, i) {
  o.forEach((e) => {
    e.registerOnValidatorChange && e.registerOnValidatorChange(i);
  });
}
function xr(o, i) {
  if (i.valueAccessor.setDisabledState) {
    let e = (t) => {
      i.valueAccessor.setDisabledState(t);
    };
    (o.registerOnDisabledChange(e),
      i._registerOnDestroy(() => {
        o._unregisterOnDisabledChange(e);
      }));
  }
}
function Ai(o, i) {
  let e = tn(o);
  i.validator !== null
    ? o.setValidators(Po(e, i.validator))
    : typeof e == 'function' && o.setValidators([e]);
  let t = on(o);
  i.asyncValidator !== null
    ? o.setAsyncValidators(Po(t, i.asyncValidator))
    : typeof t == 'function' && o.setAsyncValidators([t]);
  let n = () => o.updateValueAndValidity();
  (Ht(i._rawValidators, n), Ht(i._rawAsyncValidators, n));
}
function zt(o, i) {
  let e = !1;
  if (o !== null) {
    if (i.validator !== null) {
      let n = tn(o);
      if (Array.isArray(n) && n.length > 0) {
        let r = n.filter((s) => s !== i.validator);
        r.length !== n.length && ((e = !0), o.setValidators(r));
      }
    }
    if (i.asyncValidator !== null) {
      let n = on(o);
      if (Array.isArray(n) && n.length > 0) {
        let r = n.filter((s) => s !== i.asyncValidator);
        r.length !== n.length && ((e = !0), o.setAsyncValidators(r));
      }
    }
  }
  let t = () => {};
  return (Ht(i._rawValidators, t), Ht(i._rawAsyncValidators, t), e);
}
function Cr(o, i) {
  i.valueAccessor.registerOnChange((e) => {
    ((o._pendingValue = e),
      (o._pendingChange = !0),
      (o._pendingDirty = !0),
      o.updateOn === 'change' && sn(o, i));
  });
}
function wr(o, i) {
  i.valueAccessor.registerOnTouched(() => {
    ((o._pendingTouched = !0),
      o.updateOn === 'blur' && o._pendingChange && sn(o, i),
      o.updateOn !== 'submit' && o.markAsTouched());
  });
}
function sn(o, i) {
  (o._pendingDirty && o.markAsDirty(),
    o.setValue(o._pendingValue, { emitModelToViewChange: !1 }),
    i.viewToModelUpdate(o._pendingValue),
    (o._pendingChange = !1));
}
function Sr(o, i) {
  let e = (t, n) => {
    (i.valueAccessor.writeValue(t), n && i.viewToModelUpdate(t));
  };
  (o.registerOnChange(e),
    i._registerOnDestroy(() => {
      o._unregisterOnChange(e);
    }));
}
function an(o, i) {
  (o == null, Ai(o, i));
}
function Dr(o, i) {
  return zt(o, i);
}
function Fi(o, i) {
  if (!o.hasOwnProperty('model')) return !1;
  let e = o.model;
  return e.isFirstChange() ? !0 : !Object.is(i, e.currentValue);
}
function Mr(o) {
  return Object.getPrototypeOf(o.constructor) === Wo;
}
function ln(o, i) {
  (o._syncPendingControls(),
    i.forEach((e) => {
      let t = e.control;
      t.updateOn === 'submit' &&
        t._pendingChange &&
        (e.viewToModelUpdate(t._pendingValue), (t._pendingChange = !1));
    }));
}
function Vi(o, i) {
  if (!i) return null;
  Array.isArray(i);
  let e, t, n;
  return (
    i.forEach((r) => {
      r.constructor === Go ? (e = r) : Mr(r) ? (t = r) : (n = r);
    }),
    n || t || e || null
  );
}
function kr(o, i) {
  let e = o.indexOf(i);
  e > -1 && o.splice(e, 1);
}
var Er = { provide: X, useExisting: Q(() => ut) },
  rt = Promise.resolve(),
  ut = (() => {
    class o extends X {
      callSetDisabledState;
      get submitted() {
        return _e(this.submittedReactive);
      }
      _submitted = ce(() => this.submittedReactive());
      submittedReactive = te(!1);
      _directives = new Set();
      form;
      ngSubmit = new E();
      options;
      constructor(e, t, n) {
        (super(), (this.callSetDisabledState = n), (this.form = new Ye({}, Mi(e), ki(t))));
      }
      ngAfterViewInit() {
        this._setUpdateStrategy();
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      get controls() {
        return this.form.controls;
      }
      addControl(e) {
        rt.then(() => {
          let t = this._findContainer(e.path);
          ((e.control = t.registerControl(e.name, e.control)),
            ct(e.control, e, this.callSetDisabledState),
            e.control.updateValueAndValidity({ emitEvent: !1 }),
            this._directives.add(e));
        });
      }
      getControl(e) {
        return this.form.get(e.path);
      }
      removeControl(e) {
        rt.then(() => {
          let t = this._findContainer(e.path);
          (t && t.removeControl(e.name), this._directives.delete(e));
        });
      }
      addFormGroup(e) {
        rt.then(() => {
          let t = this._findContainer(e.path),
            n = new Ye({});
          (an(n, e), t.registerControl(e.name, n), n.updateValueAndValidity({ emitEvent: !1 }));
        });
      }
      removeFormGroup(e) {
        rt.then(() => {
          let t = this._findContainer(e.path);
          t && t.removeControl(e.name);
        });
      }
      getFormGroup(e) {
        return this.form.get(e.path);
      }
      updateModel(e, t) {
        rt.then(() => {
          this.form.get(e.path).setValue(t);
        });
      }
      setValue(e) {
        this.control.setValue(e);
      }
      onSubmit(e) {
        return (
          this.submittedReactive.set(!0),
          ln(this.form, this._directives),
          this.ngSubmit.emit(e),
          this.form._events.next(new Lt(this.control)),
          e?.target?.method === 'dialog'
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(e = void 0) {
        (this.form.reset(e), this.submittedReactive.set(!1));
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.form._updateOn = this.options.updateOn);
      }
      _findContainer(e) {
        return (e.pop(), e.length ? this.form.get(e) : this.form);
      }
      static ɵfac = function (t) {
        return new (t || o)(f(me, 10), f(Ie, 10), f(Ue, 8));
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['form', 3, 'ngNoForm', '', 3, 'formGroup', '', 3, 'formArray', ''],
          ['ng-form'],
          ['', 'ngForm', ''],
        ],
        hostBindings: function (t, n) {
          t & 1 &&
            I('submit', function (s) {
              return n.onSubmit(s);
            })('reset', function () {
              return n.onReset();
            });
        },
        inputs: { options: [0, 'ngFormOptions', 'options'] },
        outputs: { ngSubmit: 'ngSubmit' },
        exportAs: ['ngForm'],
        standalone: !1,
        features: [D([Er]), L],
      });
    }
    return o;
  })();
function Lo(o, i) {
  let e = o.indexOf(i);
  e > -1 && o.splice(e, 1);
}
function Bo(o) {
  return (
    typeof o == 'object' &&
    o !== null &&
    Object.keys(o).length === 2 &&
    'value' in o &&
    'disabled' in o
  );
}
var lt = class extends Ge {
  defaultValue = null;
  _onChange = [];
  _pendingValue;
  _pendingChange = !1;
  constructor(i = null, e, t) {
    (super(Ei(e), Oi(t, e)),
      this._applyFormState(i),
      this._setUpdateStrategy(e),
      this._initObservables(),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator }),
      jt(e) &&
        (e.nonNullable || e.initialValueIsDefault) &&
        (Bo(i) ? (this.defaultValue = i.value) : (this.defaultValue = i)));
  }
  setValue(i, e = {}) {
    ((this.value = this._pendingValue = i),
      this._onChange.length &&
        e.emitModelToViewChange !== !1 &&
        this._onChange.forEach((t) => t(this.value, e.emitViewToModelChange !== !1)),
      this.updateValueAndValidity(e));
  }
  patchValue(i, e = {}) {
    this.setValue(i, e);
  }
  reset(i = this.defaultValue, e = {}) {
    (this._applyFormState(i),
      this.markAsPristine(e),
      this.markAsUntouched(e),
      this.setValue(this.value, e),
      e.overwriteDefaultValue && (this.defaultValue = this.value),
      (this._pendingChange = !1),
      e?.emitEvent !== !1 && this._events.next(new dt(this)));
  }
  _updateValue() {}
  _anyControls(i) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(i) {
    this._onChange.push(i);
  }
  _unregisterOnChange(i) {
    Lo(this._onChange, i);
  }
  registerOnDisabledChange(i) {
    this._onDisabledChange.push(i);
  }
  _unregisterOnDisabledChange(i) {
    Lo(this._onDisabledChange, i);
  }
  _forEachChild(i) {}
  _syncPendingControls() {
    return this.updateOn === 'submit' &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, { onlySelf: !0, emitModelToViewChange: !1 }), !0)
      : !1;
  }
  _applyFormState(i) {
    Bo(i)
      ? ((this.value = this._pendingValue = i.value),
        i.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = i);
  }
};
var Or = (o) => o instanceof lt,
  Ar = (() => {
    class o extends X {
      _parent;
      ngOnInit() {
        (this._checkParentType(), this.formDirective.addFormGroup(this));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeFormGroup(this);
      }
      get control() {
        return this.formDirective.getFormGroup(this);
      }
      get path() {
        return Gt(this.name == null ? this.name : this.name.toString(), this._parent);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      _checkParentType() {}
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵdir = u({ type: o, standalone: !1, features: [L] });
    }
    return o;
  })();
var Fr = { provide: K, useExisting: Q(() => Vr) },
  Ho = Promise.resolve(),
  Vr = (() => {
    class o extends K {
      _changeDetectorRef;
      callSetDisabledState;
      control = new lt();
      static ngAcceptInputType_isDisabled;
      _registered = !1;
      viewModel;
      name = '';
      isDisabled;
      model;
      options;
      update = new E();
      constructor(e, t, n, r, s, l) {
        (super(),
          (this._changeDetectorRef = s),
          (this.callSetDisabledState = l),
          (this._parent = e),
          this._setValidators(t),
          this._setAsyncValidators(n),
          (this.valueAccessor = Vi(this, r)));
      }
      ngOnChanges(e) {
        if ((this._checkForErrors(), !this._registered || 'name' in e)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let t = e.name.previousValue;
            this.formDirective.removeControl({ name: t, path: this._getPath(t) });
          }
          this._setUpControl();
        }
        ('isDisabled' in e && this._updateDisabled(e),
          Fi(e, this.viewModel) && (this._updateValue(this.model), (this.viewModel = this.model)));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(e) {
        ((this.viewModel = e), this.update.emit(e));
      }
      _setUpControl() {
        (this._setUpdateStrategy(),
          this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this),
          (this._registered = !0));
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        (ct(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 }));
      }
      _checkForErrors() {
        this._checkName();
      }
      _checkName() {
        (this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name);
      }
      _updateValue(e) {
        Ho.then(() => {
          (this.control.setValue(e, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck());
        });
      }
      _updateDisabled(e) {
        let t = e.isDisabled.currentValue,
          n = t !== 0 && M(t);
        Ho.then(() => {
          (n && !this.control.disabled
            ? this.control.disable()
            : !n && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck());
        });
      }
      _getPath(e) {
        return this._parent ? Gt(e, this._parent) : [e];
      }
      static ɵfac = function (t) {
        return new (t || o)(f(X, 9), f(me, 10), f(Ie, 10), f(ht, 10), f(he, 8), f(Ue, 8));
      };
      static ɵdir = u({
        type: o,
        selectors: [['', 'ngModel', '', 3, 'formControlName', '', 3, 'formControl', '']],
        inputs: {
          name: 'name',
          isDisabled: [0, 'disabled', 'isDisabled'],
          model: [0, 'ngModel', 'model'],
          options: [0, 'ngModelOptions', 'options'],
        },
        outputs: { update: 'ngModelChange' },
        exportAs: ['ngModel'],
        standalone: !1,
        features: [D([Fr]), L, ie],
      });
    }
    return o;
  })();
var Ua = (() => {
    class o {
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
        hostAttrs: ['novalidate', ''],
        standalone: !1,
      });
    }
    return o;
  })(),
  Rr = { provide: ht, useExisting: Q(() => Ir), multi: !0 },
  Ir = (() => {
    class o extends Wo {
      writeValue(e) {
        let t = e ?? '';
        this.setProperty('value', t);
      }
      registerOnChange(e) {
        this.onChange = (t) => {
          e(t == '' ? null : parseFloat(t));
        };
      }
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵdir = u({
        type: o,
        selectors: [
          ['input', 'type', 'number', 'formControlName', ''],
          ['input', 'type', 'number', 'formControl', ''],
          ['input', 'type', 'number', 'ngModel', ''],
        ],
        hostBindings: function (t, n) {
          t & 1 &&
            I('input', function (s) {
              return n.onChange(s.target.value);
            })('blur', function () {
              return n.onTouched();
            });
        },
        standalone: !1,
        features: [D([Rr]), L],
      });
    }
    return o;
  })();
var wi = class extends Ge {
  constructor(i, e, t) {
    (super(Ei(e), Oi(t, e)),
      (this.controls = i),
      this._initObservables(),
      this._setUpdateStrategy(e),
      this._setUpControls(),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator }));
  }
  controls;
  at(i) {
    return this.controls[this._adjustIndex(i)];
  }
  push(i, e = {}) {
    (Array.isArray(i)
      ? i.forEach((t) => {
          (this.controls.push(t), this._registerControl(t));
        })
      : (this.controls.push(i), this._registerControl(i)),
      this.updateValueAndValidity({ emitEvent: e.emitEvent }),
      this._onCollectionChange());
  }
  insert(i, e, t = {}) {
    (this.controls.splice(i, 0, e),
      this._registerControl(e),
      this.updateValueAndValidity({ emitEvent: t.emitEvent }));
  }
  removeAt(i, e = {}) {
    let t = this._adjustIndex(i);
    (t < 0 && (t = 0),
      this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
      this.controls.splice(t, 1),
      this.updateValueAndValidity({ emitEvent: e.emitEvent }));
  }
  setControl(i, e, t = {}) {
    let n = this._adjustIndex(i);
    (n < 0 && (n = 0),
      this.controls[n] && this.controls[n]._registerOnCollectionChange(() => {}),
      this.controls.splice(n, 1),
      e && (this.controls.splice(n, 0, e), this._registerControl(e)),
      this.updateValueAndValidity({ emitEvent: t.emitEvent }),
      this._onCollectionChange());
  }
  get length() {
    return this.controls.length;
  }
  setValue(i, e = {}) {
    (rn(this, !1, i),
      i.forEach((t, n) => {
        (nn(this, !1, n), this.at(n).setValue(t, { onlySelf: !0, emitEvent: e.emitEvent }));
      }),
      this.updateValueAndValidity(e));
  }
  patchValue(i, e = {}) {
    i != null &&
      (i.forEach((t, n) => {
        this.at(n) && this.at(n).patchValue(t, { onlySelf: !0, emitEvent: e.emitEvent });
      }),
      this.updateValueAndValidity(e));
  }
  reset(i = [], e = {}) {
    (this._forEachChild((t, n) => {
      t.reset(i[n], $(S({}, e), { onlySelf: !0 }));
    }),
      this._updatePristine(e, this),
      this._updateTouched(e, this),
      this.updateValueAndValidity(e),
      e?.emitEvent !== !1 && this._events.next(new dt(this)));
  }
  getRawValue() {
    return this.controls.map((i) => i.getRawValue());
  }
  clear(i = {}) {
    this.controls.length < 1 ||
      (this._forEachChild((e) => e._registerOnCollectionChange(() => {})),
      this.controls.splice(0),
      this.updateValueAndValidity({ emitEvent: i.emitEvent }));
  }
  _adjustIndex(i) {
    return i < 0 ? i + this.length : i;
  }
  _syncPendingControls() {
    let i = this.controls.reduce((e, t) => (t._syncPendingControls() ? !0 : e), !1);
    return (i && this.updateValueAndValidity({ onlySelf: !0 }), i);
  }
  _forEachChild(i) {
    this.controls.forEach((e, t) => {
      i(e, t);
    });
  }
  _updateValue() {
    this.value = this.controls.filter((i) => i.enabled || this.disabled).map((i) => i.value);
  }
  _anyControls(i) {
    return this.controls.some((e) => e.enabled && i(e));
  }
  _setUpControls() {
    this._forEachChild((i) => this._registerControl(i));
  }
  _allControlsDisabled() {
    for (let i of this.controls) if (i.enabled) return !1;
    return this.controls.length > 0 || this.disabled;
  }
  _registerControl(i) {
    (i.setParent(this), i._registerOnCollectionChange(this._onCollectionChange));
  }
  _find(i) {
    return this.at(i) ?? null;
  }
};
var dn = (() => {
  class o extends X {
    callSetDisabledState;
    get submitted() {
      return _e(this._submittedReactive);
    }
    set submitted(e) {
      this._submittedReactive.set(e);
    }
    _submitted = ce(() => this._submittedReactive());
    _submittedReactive = te(!1);
    _oldForm;
    _onCollectionChange = () => this._updateDomValue();
    directives = [];
    constructor(e, t, n) {
      (super(),
        (this.callSetDisabledState = n),
        this._setValidators(e),
        this._setAsyncValidators(t));
    }
    ngOnChanges(e) {
      this.onChanges(e);
    }
    ngOnDestroy() {
      this.onDestroy();
    }
    onChanges(e) {
      (this._checkFormPresent(),
        e.hasOwnProperty('form') &&
          (this._updateValidators(),
          this._updateDomValue(),
          this._updateRegistrations(),
          (this._oldForm = this.form)));
    }
    onDestroy() {
      this.form &&
        (zt(this.form, this),
        this.form._onCollectionChange === this._onCollectionChange &&
          this.form._registerOnCollectionChange(() => {}));
    }
    get formDirective() {
      return this;
    }
    get path() {
      return [];
    }
    addControl(e) {
      let t = this.form.get(e.path);
      return (
        ct(t, e, this.callSetDisabledState),
        t.updateValueAndValidity({ emitEvent: !1 }),
        this.directives.push(e),
        t
      );
    }
    getControl(e) {
      return this.form.get(e.path);
    }
    removeControl(e) {
      (Bt(e.control || null, e, !1), kr(this.directives, e));
    }
    addFormGroup(e) {
      this._setUpFormContainer(e);
    }
    removeFormGroup(e) {
      this._cleanUpFormContainer(e);
    }
    getFormGroup(e) {
      return this.form.get(e.path);
    }
    getFormArray(e) {
      return this.form.get(e.path);
    }
    addFormArray(e) {
      this._setUpFormContainer(e);
    }
    removeFormArray(e) {
      this._cleanUpFormContainer(e);
    }
    updateModel(e, t) {
      this.form.get(e.path).setValue(t);
    }
    onReset() {
      this.resetForm();
    }
    resetForm(e = void 0, t = {}) {
      (this.form.reset(e, t), this._submittedReactive.set(!1));
    }
    onSubmit(e) {
      return (
        (this.submitted = !0),
        ln(this.form, this.directives),
        this.ngSubmit.emit(e),
        this.form._events.next(new Lt(this.control)),
        e?.target?.method === 'dialog'
      );
    }
    _updateDomValue() {
      (this.directives.forEach((e) => {
        let t = e.control,
          n = this.form.get(e.path);
        t !== n &&
          (Bt(t || null, e), Or(n) && (ct(n, e, this.callSetDisabledState), (e.control = n)));
      }),
        this.form._updateTreeValidity({ emitEvent: !1 }));
    }
    _setUpFormContainer(e) {
      let t = this.form.get(e.path);
      (an(t, e), t.updateValueAndValidity({ emitEvent: !1 }));
    }
    _cleanUpFormContainer(e) {
      if (this.form) {
        let t = this.form.get(e.path);
        t && Dr(t, e) && t.updateValueAndValidity({ emitEvent: !1 });
      }
    }
    _updateRegistrations() {
      (this.form._registerOnCollectionChange(this._onCollectionChange),
        this._oldForm && this._oldForm._registerOnCollectionChange(() => {}));
    }
    _updateValidators() {
      (Ai(this.form, this), this._oldForm && zt(this._oldForm, this));
    }
    _checkFormPresent() {
      this.form;
    }
    static ɵfac = function (t) {
      return new (t || o)(f(me, 10), f(Ie, 10), f(Ue, 8));
    };
    static ɵdir = u({ type: o, features: [L, ie] });
  }
  return o;
})();
var Ri = new g(''),
  Pr = { provide: K, useExisting: Q(() => Tr) },
  Tr = (() => {
    class o extends K {
      _ngModelWarningConfig;
      callSetDisabledState;
      viewModel;
      form;
      set isDisabled(e) {}
      model;
      update = new E();
      static _ngModelWarningSentOnce = !1;
      _ngModelWarningSent = !1;
      constructor(e, t, n, r, s) {
        (super(),
          (this._ngModelWarningConfig = r),
          (this.callSetDisabledState = s),
          this._setValidators(e),
          this._setAsyncValidators(t),
          (this.valueAccessor = Vi(this, n)));
      }
      ngOnChanges(e) {
        if (this._isControlChanged(e)) {
          let t = e.form.previousValue;
          (t && Bt(t, this, !1),
            ct(this.form, this, this.callSetDisabledState),
            this.form.updateValueAndValidity({ emitEvent: !1 }));
        }
        Fi(e, this.viewModel) && (this.form.setValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.form && Bt(this.form, this, !1);
      }
      get path() {
        return [];
      }
      get control() {
        return this.form;
      }
      viewToModelUpdate(e) {
        ((this.viewModel = e), this.update.emit(e));
      }
      _isControlChanged(e) {
        return e.hasOwnProperty('form');
      }
      static ɵfac = function (t) {
        return new (t || o)(f(me, 10), f(Ie, 10), f(ht, 10), f(Ri, 8), f(Ue, 8));
      };
      static ɵdir = u({
        type: o,
        selectors: [['', 'formControl', '']],
        inputs: {
          form: [0, 'formControl', 'form'],
          isDisabled: [0, 'disabled', 'isDisabled'],
          model: [0, 'ngModel', 'model'],
        },
        outputs: { update: 'ngModelChange' },
        exportAs: ['ngForm'],
        standalone: !1,
        features: [D([Pr]), L, ie],
      });
    }
    return o;
  })(),
  Nr = { provide: X, useExisting: Q(() => cn) },
  cn = (() => {
    class o extends Ar {
      name = null;
      constructor(e, t, n) {
        (super(), (this._parent = e), this._setValidators(t), this._setAsyncValidators(n));
      }
      _checkParentType() {
        un(this._parent);
      }
      static ɵfac = function (t) {
        return new (t || o)(f(X, 13), f(me, 10), f(Ie, 10));
      };
      static ɵdir = u({
        type: o,
        selectors: [['', 'formGroupName', '']],
        inputs: { name: [0, 'formGroupName', 'name'] },
        standalone: !1,
        features: [D([Nr]), L],
      });
    }
    return o;
  })(),
  Lr = { provide: X, useExisting: Q(() => hn) },
  hn = (() => {
    class o extends X {
      _parent;
      name = null;
      constructor(e, t, n) {
        (super(), (this._parent = e), this._setValidators(t), this._setAsyncValidators(n));
      }
      ngOnInit() {
        (un(this._parent), this.formDirective.addFormArray(this));
      }
      ngOnDestroy() {
        this.formDirective?.removeFormArray(this);
      }
      get control() {
        return this.formDirective.getFormArray(this);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      get path() {
        return Gt(this.name == null ? this.name : this.name.toString(), this._parent);
      }
      static ɵfac = function (t) {
        return new (t || o)(f(X, 13), f(me, 10), f(Ie, 10));
      };
      static ɵdir = u({
        type: o,
        selectors: [['', 'formArrayName', '']],
        inputs: { name: [0, 'formArrayName', 'name'] },
        standalone: !1,
        features: [D([Lr]), L],
      });
    }
    return o;
  })();
function un(o) {
  return !(o instanceof cn) && !(o instanceof dn) && !(o instanceof hn);
}
var Br = { provide: K, useExisting: Q(() => Hr) },
  Hr = (() => {
    class o extends K {
      _ngModelWarningConfig;
      _added = !1;
      viewModel;
      control;
      name = null;
      set isDisabled(e) {}
      model;
      update = new E();
      static _ngModelWarningSentOnce = !1;
      _ngModelWarningSent = !1;
      constructor(e, t, n, r, s) {
        (super(),
          (this._ngModelWarningConfig = s),
          (this._parent = e),
          this._setValidators(t),
          this._setAsyncValidators(n),
          (this.valueAccessor = Vi(this, r)));
      }
      ngOnChanges(e) {
        (this._added || this._setUpControl(),
          Fi(e, this.viewModel) &&
            ((this.viewModel = this.model), this.formDirective.updateModel(this, this.model)));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      viewToModelUpdate(e) {
        ((this.viewModel = e), this.update.emit(e));
      }
      get path() {
        return Gt(this.name == null ? this.name : this.name.toString(), this._parent);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      _setUpControl() {
        ((this.control = this.formDirective.addControl(this)), (this._added = !0));
      }
      static ɵfac = function (t) {
        return new (t || o)(f(X, 13), f(me, 10), f(Ie, 10), f(ht, 10), f(Ri, 8));
      };
      static ɵdir = u({
        type: o,
        selectors: [['', 'formControlName', '']],
        inputs: {
          name: [0, 'formControlName', 'name'],
          isDisabled: [0, 'disabled', 'isDisabled'],
          model: [0, 'ngModel', 'model'],
        },
        outputs: { update: 'ngModelChange' },
        standalone: !1,
        features: [D([Br]), L, ie],
      });
    }
    return o;
  })();
var zr = { provide: X, useExisting: Q(() => mt) },
  mt = (() => {
    class o extends dn {
      form = null;
      ngSubmit = new E();
      get control() {
        return this.form;
      }
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵdir = u({
        type: o,
        selectors: [['', 'formGroup', '']],
        hostBindings: function (t, n) {
          t & 1 &&
            I('submit', function (s) {
              return n.onSubmit(s);
            })('reset', function () {
              return n.onReset();
            });
        },
        inputs: { form: [0, 'formGroup', 'form'] },
        outputs: { ngSubmit: 'ngSubmit' },
        exportAs: ['ngForm'],
        standalone: !1,
        features: [D([zr]), L],
      });
    }
    return o;
  })();
function jr(o) {
  return typeof o == 'number' ? o : parseInt(o, 10);
}
function mn(o) {
  return typeof o == 'number' ? o : parseFloat(o);
}
var Ii = (() => {
    class o {
      _validator = Rt;
      _onChange;
      _enabled;
      ngOnChanges(e) {
        if (this.inputName in e) {
          let t = this.normalizeInput(e[this.inputName].currentValue);
          ((this._enabled = this.enabled(t)),
            (this._validator = this._enabled ? this.createValidator(t) : Rt),
            this._onChange && this._onChange());
        }
      }
      validate(e) {
        return this._validator(e);
      }
      registerOnValidatorChange(e) {
        this._onChange = e;
      }
      enabled(e) {
        return e != null;
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({ type: o, features: [ie] });
    }
    return o;
  })(),
  Wr = { provide: me, useExisting: Q(() => Gr), multi: !0 },
  Gr = (() => {
    class o extends Ii {
      max;
      inputName = 'max';
      normalizeInput = (e) => mn(e);
      createValidator = (e) => Uo(e);
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵdir = u({
        type: o,
        selectors: [
          ['input', 'type', 'number', 'max', '', 'formControlName', ''],
          ['input', 'type', 'number', 'max', '', 'formControl', ''],
          ['input', 'type', 'number', 'max', '', 'ngModel', ''],
        ],
        hostVars: 1,
        hostBindings: function (t, n) {
          t & 2 && A('max', n._enabled ? n.max : null);
        },
        inputs: { max: 'max' },
        standalone: !1,
        features: [D([Wr]), L],
      });
    }
    return o;
  })(),
  Yr = { provide: me, useExisting: Q(() => Ur), multi: !0 },
  Ur = (() => {
    class o extends Ii {
      min;
      inputName = 'min';
      normalizeInput = (e) => mn(e);
      createValidator = (e) => Yo(e);
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵdir = u({
        type: o,
        selectors: [
          ['input', 'type', 'number', 'min', '', 'formControlName', ''],
          ['input', 'type', 'number', 'min', '', 'formControl', ''],
          ['input', 'type', 'number', 'min', '', 'ngModel', ''],
        ],
        hostVars: 1,
        hostBindings: function (t, n) {
          t & 2 && A('min', n._enabled ? n.min : null);
        },
        inputs: { min: 'min' },
        standalone: !1,
        features: [D([Yr]), L],
      });
    }
    return o;
  })();
var Xr = { provide: me, useExisting: Q(() => qr), multi: !0 },
  qr = (() => {
    class o extends Ii {
      maxlength;
      inputName = 'maxlength';
      normalizeInput = (e) => jr(e);
      createValidator = (e) => Xo(e);
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵdir = u({
        type: o,
        selectors: [
          ['', 'maxlength', '', 'formControlName', ''],
          ['', 'maxlength', '', 'formControl', ''],
          ['', 'maxlength', '', 'ngModel', ''],
        ],
        hostVars: 1,
        hostBindings: function (t, n) {
          t & 2 && A('maxlength', n._enabled ? n.maxlength : null);
        },
        inputs: { maxlength: 'maxlength' },
        standalone: !1,
        features: [D([Xr]), L],
      });
    }
    return o;
  })();
var fn = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({});
  }
  return o;
})();
function zo(o) {
  return !!o && (o.asyncValidators !== void 0 || o.validators !== void 0 || o.updateOn !== void 0);
}
var Xa = (() => {
  class o {
    useNonNullable = !1;
    get nonNullable() {
      let e = new o();
      return ((e.useNonNullable = !0), e);
    }
    group(e, t = null) {
      let n = this._reduceControls(e),
        r = {};
      return (
        zo(t)
          ? (r = t)
          : t !== null && ((r.validators = t.validator), (r.asyncValidators = t.asyncValidator)),
        new Ye(n, r)
      );
    }
    record(e, t = null) {
      let n = this._reduceControls(e);
      return new Ci(n, t);
    }
    control(e, t, n) {
      let r = {};
      return this.useNonNullable
        ? (zo(t) ? (r = t) : ((r.validators = t), (r.asyncValidators = n)),
          new lt(e, $(S({}, r), { nonNullable: !0 })))
        : new lt(e, t, n);
    }
    array(e, t, n) {
      let r = e.map((s) => this._createControl(s));
      return new wi(r, t, n);
    }
    _reduceControls(e) {
      let t = {};
      return (
        Object.keys(e).forEach((n) => {
          t[n] = this._createControl(e[n]);
        }),
        t
      );
    }
    _createControl(e) {
      if (e instanceof lt) return e;
      if (e instanceof Ge) return e;
      if (Array.isArray(e)) {
        let t = e[0],
          n = e.length > 1 ? e[1] : null,
          r = e.length > 2 ? e[2] : null;
        return this.control(t, n, r);
      } else return this.control(e);
    }
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
  }
  return o;
})();
var qa = (() => {
    class o {
      static withConfig(e) {
        return {
          ngModule: o,
          providers: [{ provide: Ue, useValue: e.callSetDisabledState ?? Wt }],
        };
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵmod = O({ type: o });
      static ɵinj = k({ imports: [fn] });
    }
    return o;
  })(),
  $a = (() => {
    class o {
      static withConfig(e) {
        return {
          ngModule: o,
          providers: [
            { provide: Ri, useValue: e.warnOnNgModelWithFormControl ?? 'always' },
            { provide: Ue, useValue: e.callSetDisabledState ?? Wt },
          ],
        };
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵmod = O({ type: o });
      static ɵinj = k({ imports: [fn] });
    }
    return o;
  })();
var pn = (() => {
  class o {
    _animationsDisabled = be();
    state = 'unchecked';
    disabled = !1;
    appearance = 'full';
    constructor() {}
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵcmp = B({
      type: o,
      selectors: [['mat-pseudo-checkbox']],
      hostAttrs: [1, 'mat-pseudo-checkbox'],
      hostVars: 12,
      hostBindings: function (t, n) {
        t & 2 &&
          w('mat-pseudo-checkbox-indeterminate', n.state === 'indeterminate')(
            'mat-pseudo-checkbox-checked',
            n.state === 'checked',
          )('mat-pseudo-checkbox-disabled', n.disabled)(
            'mat-pseudo-checkbox-minimal',
            n.appearance === 'minimal',
          )('mat-pseudo-checkbox-full', n.appearance === 'full')(
            '_mat-animation-noopable',
            n._animationsDisabled,
          );
      },
      inputs: { state: 'state', disabled: 'disabled', appearance: 'appearance' },
      decls: 0,
      vars: 0,
      template: function (t, n) {},
      styles: [
        `.mat-pseudo-checkbox{border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1),background-color 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:"";border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox._mat-animation-noopable{transition:none !important;animation:none !important}.mat-pseudo-checkbox._mat-animation-noopable::after{transition:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{left:1px;opacity:1;border-radius:2px}.mat-pseudo-checkbox-checked::after{left:1px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1;box-sizing:content-box}.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after,.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after{color:var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary))}.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after,.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after{color:var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-pseudo-checkbox-full{border-color:var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));border-width:2px;border-style:solid}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled{border-color:var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate{background-color:var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));border-color:rgba(0,0,0,0)}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after,.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after{color:var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary))}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled{background-color:var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after,.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after{color:var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface))}.mat-pseudo-checkbox{width:18px;height:18px}.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after{width:14px;height:6px;transform-origin:center;top:-4.2426406871px;left:0;bottom:0;right:0;margin:auto}.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after{top:8px;width:16px}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after{width:10px;height:4px;transform-origin:center;top:-2.8284271247px;left:0;bottom:0;right:0;margin:auto}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after{top:6px;width:12px}
`,
      ],
      encapsulation: 2,
      changeDetection: 0,
    });
  }
  return o;
})();
var _n = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({ imports: [W] });
  }
  return o;
})();
var gn = Do();
function Sn(o) {
  return new Yt(o.get(Ce), o.get(pe));
}
var Yt = class {
  _viewportRuler;
  _previousHTMLStyles = { top: '', left: '' };
  _previousScrollPosition;
  _isEnabled = !1;
  _document;
  constructor(i, e) {
    ((this._viewportRuler = i), (this._document = e));
  }
  attach() {}
  enable() {
    if (this._canBeEnabled()) {
      let i = this._document.documentElement;
      ((this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition()),
        (this._previousHTMLStyles.left = i.style.left || ''),
        (this._previousHTMLStyles.top = i.style.top || ''),
        (i.style.left = R(-this._previousScrollPosition.left)),
        (i.style.top = R(-this._previousScrollPosition.top)),
        i.classList.add('cdk-global-scrollblock'),
        (this._isEnabled = !0));
    }
  }
  disable() {
    if (this._isEnabled) {
      let i = this._document.documentElement,
        e = this._document.body,
        t = i.style,
        n = e.style,
        r = t.scrollBehavior || '',
        s = n.scrollBehavior || '';
      ((this._isEnabled = !1),
        (t.left = this._previousHTMLStyles.left),
        (t.top = this._previousHTMLStyles.top),
        i.classList.remove('cdk-global-scrollblock'),
        gn && (t.scrollBehavior = n.scrollBehavior = 'auto'),
        window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top),
        gn && ((t.scrollBehavior = r), (n.scrollBehavior = s)));
    }
  }
  _canBeEnabled() {
    if (
      this._document.documentElement.classList.contains('cdk-global-scrollblock') ||
      this._isEnabled
    )
      return !1;
    let e = this._document.documentElement,
      t = this._viewportRuler.getViewportSize();
    return e.scrollHeight > t.height || e.scrollWidth > t.width;
  }
};
function Dn(o, i) {
  return new Ut(o.get(He), o.get(N), o.get(Ce), i);
}
var Ut = class {
  _scrollDispatcher;
  _ngZone;
  _viewportRuler;
  _config;
  _scrollSubscription = null;
  _overlayRef;
  _initialScrollPosition;
  constructor(i, e, t, n) {
    ((this._scrollDispatcher = i),
      (this._ngZone = e),
      (this._viewportRuler = t),
      (this._config = n));
  }
  attach(i) {
    (this._overlayRef, (this._overlayRef = i));
  }
  enable() {
    if (this._scrollSubscription) return;
    let i = this._scrollDispatcher
      .scrolled(0)
      .pipe(
        De((e) => !e || !this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)),
      );
    this._config && this._config.threshold && this._config.threshold > 1
      ? ((this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top),
        (this._scrollSubscription = i.subscribe(() => {
          let e = this._viewportRuler.getViewportScrollPosition().top;
          Math.abs(e - this._initialScrollPosition) > this._config.threshold
            ? this._detach()
            : this._overlayRef.updatePosition();
        })))
      : (this._scrollSubscription = i.subscribe(this._detach));
  }
  disable() {
    this._scrollSubscription &&
      (this._scrollSubscription.unsubscribe(), (this._scrollSubscription = null));
  }
  detach() {
    (this.disable(), (this._overlayRef = null));
  }
  _detach = () => {
    (this.disable(),
      this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach()));
  };
};
var ft = class {
  enable() {}
  disable() {}
  attach() {}
};
function Pi(o, i) {
  return i.some((e) => {
    let t = o.bottom < e.top,
      n = o.top > e.bottom,
      r = o.right < e.left,
      s = o.left > e.right;
    return t || n || r || s;
  });
}
function vn(o, i) {
  return i.some((e) => {
    let t = o.top < e.top,
      n = o.bottom > e.bottom,
      r = o.left < e.left,
      s = o.right > e.right;
    return t || n || r || s;
  });
}
function Te(o, i) {
  return new Xt(o.get(He), o.get(Ce), o.get(N), i);
}
var Xt = class {
    _scrollDispatcher;
    _viewportRuler;
    _ngZone;
    _config;
    _scrollSubscription = null;
    _overlayRef;
    constructor(i, e, t, n) {
      ((this._scrollDispatcher = i),
        (this._viewportRuler = e),
        (this._ngZone = t),
        (this._config = n));
    }
    attach(i) {
      (this._overlayRef, (this._overlayRef = i));
    }
    enable() {
      if (!this._scrollSubscription) {
        let i = this._config ? this._config.scrollThrottle : 0;
        this._scrollSubscription = this._scrollDispatcher.scrolled(i).subscribe(() => {
          if ((this._overlayRef.updatePosition(), this._config && this._config.autoClose)) {
            let e = this._overlayRef.overlayElement.getBoundingClientRect(),
              { width: t, height: n } = this._viewportRuler.getViewportSize();
            Pi(e, [{ width: t, height: n, bottom: n, right: t, top: 0, left: 0 }]) &&
              (this.disable(), this._ngZone.run(() => this._overlayRef.detach()));
          }
        });
      }
    }
    disable() {
      this._scrollSubscription &&
        (this._scrollSubscription.unsubscribe(), (this._scrollSubscription = null));
    }
    detach() {
      (this.disable(), (this._overlayRef = null));
    }
  },
  Mn = (() => {
    class o {
      _injector = a(ee);
      constructor() {}
      noop = () => new ft();
      close = (e) => Dn(this._injector, e);
      block = () => Sn(this._injector);
      reposition = (e) => Te(this._injector, e);
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })(),
  pt = class {
    positionStrategy;
    scrollStrategy = new ft();
    panelClass = '';
    hasBackdrop = !1;
    backdropClass = 'cdk-overlay-dark-backdrop';
    disableAnimations;
    width;
    height;
    minWidth;
    minHeight;
    maxWidth;
    maxHeight;
    direction;
    disposeOnNavigation = !1;
    usePopover;
    constructor(i) {
      if (i) {
        let e = Object.keys(i);
        for (let t of e) i[t] !== void 0 && (this[t] = i[t]);
      }
    }
  };
var qt = class {
  connectionPair;
  scrollableViewProperties;
  constructor(i, e) {
    ((this.connectionPair = i), (this.scrollableViewProperties = e));
  }
};
var kn = (() => {
    class o {
      _attachedOverlays = [];
      _document = a(pe);
      _isAttached;
      constructor() {}
      ngOnDestroy() {
        this.detach();
      }
      add(e) {
        (this.remove(e), this._attachedOverlays.push(e));
      }
      remove(e) {
        let t = this._attachedOverlays.indexOf(e);
        (t > -1 && this._attachedOverlays.splice(t, 1),
          this._attachedOverlays.length === 0 && this.detach());
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })(),
  En = (() => {
    class o extends kn {
      _ngZone = a(N);
      _renderer = a(Le).createRenderer(null, null);
      _cleanupKeydown;
      add(e) {
        (super.add(e),
          this._isAttached ||
            (this._ngZone.runOutsideAngular(() => {
              this._cleanupKeydown = this._renderer.listen(
                'body',
                'keydown',
                this._keydownListener,
              );
            }),
            (this._isAttached = !0)));
      }
      detach() {
        this._isAttached && (this._cleanupKeydown?.(), (this._isAttached = !1));
      }
      _keydownListener = (e) => {
        let t = this._attachedOverlays;
        for (let n = t.length - 1; n > -1; n--)
          if (t[n]._keydownEvents.observers.length > 0) {
            this._ngZone.run(() => t[n]._keydownEvents.next(e));
            break;
          }
      };
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })(),
  On = (() => {
    class o extends kn {
      _platform = a(ne);
      _ngZone = a(N);
      _renderer = a(Le).createRenderer(null, null);
      _cursorOriginalValue;
      _cursorStyleIsSet = !1;
      _pointerDownEventTarget;
      _cleanups;
      add(e) {
        if ((super.add(e), !this._isAttached)) {
          let t = this._document.body,
            n = { capture: !0 },
            r = this._renderer;
          ((this._cleanups = this._ngZone.runOutsideAngular(() => [
            r.listen(t, 'pointerdown', this._pointerDownListener, n),
            r.listen(t, 'click', this._clickListener, n),
            r.listen(t, 'auxclick', this._clickListener, n),
            r.listen(t, 'contextmenu', this._clickListener, n),
          ])),
            this._platform.IOS &&
              !this._cursorStyleIsSet &&
              ((this._cursorOriginalValue = t.style.cursor),
              (t.style.cursor = 'pointer'),
              (this._cursorStyleIsSet = !0)),
            (this._isAttached = !0));
        }
      }
      detach() {
        this._isAttached &&
          (this._cleanups?.forEach((e) => e()),
          (this._cleanups = void 0),
          this._platform.IOS &&
            this._cursorStyleIsSet &&
            ((this._document.body.style.cursor = this._cursorOriginalValue),
            (this._cursorStyleIsSet = !1)),
          (this._isAttached = !1));
      }
      _pointerDownListener = (e) => {
        this._pointerDownEventTarget = Be(e);
      };
      _clickListener = (e) => {
        let t = Be(e),
          n = e.type === 'click' && this._pointerDownEventTarget ? this._pointerDownEventTarget : t;
        this._pointerDownEventTarget = null;
        let r = this._attachedOverlays.slice();
        for (let s = r.length - 1; s > -1; s--) {
          let l = r[s];
          if (l._outsidePointerEvents.observers.length < 1 || !l.hasAttached()) continue;
          if (yn(l.overlayElement, t) || yn(l.overlayElement, n)) break;
          let d = l._outsidePointerEvents;
          this._ngZone ? this._ngZone.run(() => d.next(e)) : d.next(e);
        }
      };
      static ɵfac = (() => {
        let e;
        return function (n) {
          return (e || (e = se(o)))(n || o);
        };
      })();
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })();
function yn(o, i) {
  let e = typeof ShadowRoot < 'u' && ShadowRoot,
    t = i;
  for (; t; ) {
    if (t === o) return !0;
    t = e && t instanceof ShadowRoot ? t.host : t.parentNode;
  }
  return !1;
}
var An = (() => {
    class o {
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['ng-component']],
        hostAttrs: ['cdk-overlay-style-loader', ''],
        decls: 0,
        vars: 0,
        template: function (t, n) {},
        styles: [
          `.cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed}@layer cdk-overlay{.cdk-overlay-container{z-index:1000}}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute}@layer cdk-overlay{.cdk-global-overlay-wrapper{z-index:1000}}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%}@layer cdk-overlay{.cdk-overlay-pane{z-index:1000}}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:auto;-webkit-tap-highlight-color:rgba(0,0,0,0);opacity:0;touch-action:manipulation}@layer cdk-overlay{.cdk-overlay-backdrop{z-index:1000;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}}@media(prefers-reduced-motion){.cdk-overlay-backdrop{transition-duration:1ms}}.cdk-overlay-backdrop-showing{opacity:1}@media(forced-colors: active){.cdk-overlay-backdrop-showing{opacity:.6}}@layer cdk-overlay{.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}}.cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}.cdk-overlay-backdrop-noop-animation{transition:none}.cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px}@layer cdk-overlay{.cdk-overlay-connected-position-bounding-box{z-index:1000}}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-overlay-popover{background:none;border:none;padding:0;outline:0;overflow:visible;position:fixed;pointer-events:none;white-space:normal;color:inherit;text-decoration:none;width:100%;height:100%;inset:auto;top:0;left:0}.cdk-overlay-popover::backdrop{display:none}.cdk-overlay-popover .cdk-overlay-backdrop{position:fixed;z-index:auto}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })(),
  Fn = (() => {
    class o {
      _platform = a(ne);
      _containerElement;
      _document = a(pe);
      _styleLoader = a(Re);
      constructor() {}
      ngOnDestroy() {
        this._containerElement?.remove();
      }
      getContainerElement() {
        return (
          this._loadStyles(),
          this._containerElement || this._createContainer(),
          this._containerElement
        );
      }
      _createContainer() {
        let e = 'cdk-overlay-container';
        if (this._platform.isBrowser || gi()) {
          let n = this._document.querySelectorAll(
            `.${e}[platform="server"], .${e}[platform="test"]`,
          );
          for (let r = 0; r < n.length; r++) n[r].remove();
        }
        let t = this._document.createElement('div');
        (t.classList.add(e),
          gi()
            ? t.setAttribute('platform', 'test')
            : this._platform.isBrowser || t.setAttribute('platform', 'server'),
          this._document.body.appendChild(t),
          (this._containerElement = t));
      }
      _loadStyles() {
        this._styleLoader.load(An);
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })(),
  Ti = class {
    _renderer;
    _ngZone;
    element;
    _cleanupClick;
    _cleanupTransitionEnd;
    _fallbackTimeout;
    constructor(i, e, t, n) {
      ((this._renderer = e),
        (this._ngZone = t),
        (this.element = i.createElement('div')),
        this.element.classList.add('cdk-overlay-backdrop'),
        (this._cleanupClick = e.listen(this.element, 'click', n)));
    }
    detach() {
      this._ngZone.runOutsideAngular(() => {
        let i = this.element;
        (clearTimeout(this._fallbackTimeout),
          this._cleanupTransitionEnd?.(),
          (this._cleanupTransitionEnd = this._renderer.listen(i, 'transitionend', this.dispose)),
          (this._fallbackTimeout = setTimeout(this.dispose, 500)),
          (i.style.pointerEvents = 'none'),
          i.classList.remove('cdk-overlay-backdrop-showing'));
      });
    }
    dispose = () => {
      (clearTimeout(this._fallbackTimeout),
        this._cleanupClick?.(),
        this._cleanupTransitionEnd?.(),
        (this._cleanupClick = this._cleanupTransitionEnd = this._fallbackTimeout = void 0),
        this.element.remove());
    };
  };
function Ni(o) {
  return o && o.nodeType === 1;
}
var $t = class {
    _portalOutlet;
    _host;
    _pane;
    _config;
    _ngZone;
    _keyboardDispatcher;
    _document;
    _location;
    _outsideClickDispatcher;
    _animationsDisabled;
    _injector;
    _renderer;
    _backdropClick = new x();
    _attachments = new x();
    _detachments = new x();
    _positionStrategy;
    _scrollStrategy;
    _locationChanges = fe.EMPTY;
    _backdropRef = null;
    _detachContentMutationObserver;
    _detachContentAfterRenderRef;
    _disposed;
    _previousHostParent;
    _keydownEvents = new x();
    _outsidePointerEvents = new x();
    _afterNextRenderRef;
    constructor(i, e, t, n, r, s, l, d, h, c = !1, _, G) {
      ((this._portalOutlet = i),
        (this._host = e),
        (this._pane = t),
        (this._config = n),
        (this._ngZone = r),
        (this._keyboardDispatcher = s),
        (this._document = l),
        (this._location = d),
        (this._outsideClickDispatcher = h),
        (this._animationsDisabled = c),
        (this._injector = _),
        (this._renderer = G),
        n.scrollStrategy &&
          ((this._scrollStrategy = n.scrollStrategy), this._scrollStrategy.attach(this)),
        (this._positionStrategy = n.positionStrategy));
    }
    get overlayElement() {
      return this._pane;
    }
    get backdropElement() {
      return this._backdropRef?.element || null;
    }
    get hostElement() {
      return this._host;
    }
    attach(i) {
      if (this._disposed) return null;
      this._attachHost();
      let e = this._portalOutlet.attach(i);
      return (
        this._positionStrategy?.attach(this),
        this._updateStackingOrder(),
        this._updateElementSize(),
        this._updateElementDirection(),
        this._scrollStrategy && this._scrollStrategy.enable(),
        this._afterNextRenderRef?.destroy(),
        (this._afterNextRenderRef = Me(
          () => {
            this.hasAttached() && this.updatePosition();
          },
          { injector: this._injector },
        )),
        this._togglePointerEvents(!0),
        this._config.hasBackdrop && this._attachBackdrop(),
        this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0),
        this._attachments.next(),
        this._completeDetachContent(),
        this._keyboardDispatcher.add(this),
        this._config.disposeOnNavigation &&
          (this._locationChanges = this._location.subscribe(() => this.dispose())),
        this._outsideClickDispatcher.add(this),
        typeof e?.onDestroy == 'function' &&
          e.onDestroy(() => {
            this.hasAttached() &&
              this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()));
          }),
        e
      );
    }
    detach() {
      if (!this.hasAttached()) return;
      (this.detachBackdrop(),
        this._togglePointerEvents(!1),
        this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(),
        this._scrollStrategy && this._scrollStrategy.disable());
      let i = this._portalOutlet.detach();
      return (
        this._detachments.next(),
        this._completeDetachContent(),
        this._keyboardDispatcher.remove(this),
        this._detachContentWhenEmpty(),
        this._locationChanges.unsubscribe(),
        this._outsideClickDispatcher.remove(this),
        i
      );
    }
    dispose() {
      if (this._disposed) return;
      let i = this.hasAttached();
      (this._positionStrategy && this._positionStrategy.dispose(),
        this._disposeScrollStrategy(),
        this._backdropRef?.dispose(),
        this._locationChanges.unsubscribe(),
        this._keyboardDispatcher.remove(this),
        this._portalOutlet.dispose(),
        this._attachments.complete(),
        this._backdropClick.complete(),
        this._keydownEvents.complete(),
        this._outsidePointerEvents.complete(),
        this._outsideClickDispatcher.remove(this),
        this._host?.remove(),
        this._afterNextRenderRef?.destroy(),
        (this._previousHostParent = this._pane = this._host = this._backdropRef = null),
        i && this._detachments.next(),
        this._detachments.complete(),
        this._completeDetachContent(),
        (this._disposed = !0));
    }
    hasAttached() {
      return this._portalOutlet.hasAttached();
    }
    backdropClick() {
      return this._backdropClick;
    }
    attachments() {
      return this._attachments;
    }
    detachments() {
      return this._detachments;
    }
    keydownEvents() {
      return this._keydownEvents;
    }
    outsidePointerEvents() {
      return this._outsidePointerEvents;
    }
    getConfig() {
      return this._config;
    }
    updatePosition() {
      this._positionStrategy && this._positionStrategy.apply();
    }
    updatePositionStrategy(i) {
      i !== this._positionStrategy &&
        (this._positionStrategy && this._positionStrategy.dispose(),
        (this._positionStrategy = i),
        this.hasAttached() && (i.attach(this), this.updatePosition()));
    }
    updateSize(i) {
      ((this._config = S(S({}, this._config), i)), this._updateElementSize());
    }
    setDirection(i) {
      ((this._config = $(S({}, this._config), { direction: i })), this._updateElementDirection());
    }
    addPanelClass(i) {
      this._pane && this._toggleClasses(this._pane, i, !0);
    }
    removePanelClass(i) {
      this._pane && this._toggleClasses(this._pane, i, !1);
    }
    getDirection() {
      let i = this._config.direction;
      return i ? (typeof i == 'string' ? i : i.value) : 'ltr';
    }
    updateScrollStrategy(i) {
      i !== this._scrollStrategy &&
        (this._disposeScrollStrategy(),
        (this._scrollStrategy = i),
        this.hasAttached() && (i.attach(this), i.enable()));
    }
    _updateElementDirection() {
      this._host.setAttribute('dir', this.getDirection());
    }
    _updateElementSize() {
      if (!this._pane) return;
      let i = this._pane.style;
      ((i.width = R(this._config.width)),
        (i.height = R(this._config.height)),
        (i.minWidth = R(this._config.minWidth)),
        (i.minHeight = R(this._config.minHeight)),
        (i.maxWidth = R(this._config.maxWidth)),
        (i.maxHeight = R(this._config.maxHeight)));
    }
    _togglePointerEvents(i) {
      this._pane.style.pointerEvents = i ? '' : 'none';
    }
    _attachHost() {
      if (!this._host.parentElement) {
        let i = this._config.usePopover
          ? this._positionStrategy?.getPopoverInsertionPoint?.()
          : null;
        Ni(i)
          ? i.after(this._host)
          : i?.type === 'parent'
            ? i.element.appendChild(this._host)
            : this._previousHostParent?.appendChild(this._host);
      }
      if (this._config.usePopover)
        try {
          this._host.showPopover();
        } catch {}
    }
    _attachBackdrop() {
      let i = 'cdk-overlay-backdrop-showing';
      (this._backdropRef?.dispose(),
        (this._backdropRef = new Ti(this._document, this._renderer, this._ngZone, (e) => {
          this._backdropClick.next(e);
        })),
        this._animationsDisabled &&
          this._backdropRef.element.classList.add('cdk-overlay-backdrop-noop-animation'),
        this._config.backdropClass &&
          this._toggleClasses(this._backdropRef.element, this._config.backdropClass, !0),
        this._config.usePopover
          ? this._host.prepend(this._backdropRef.element)
          : this._host.parentElement.insertBefore(this._backdropRef.element, this._host),
        !this._animationsDisabled && typeof requestAnimationFrame < 'u'
          ? this._ngZone.runOutsideAngular(() => {
              requestAnimationFrame(() => this._backdropRef?.element.classList.add(i));
            })
          : this._backdropRef.element.classList.add(i));
    }
    _updateStackingOrder() {
      !this._config.usePopover &&
        this._host.nextSibling &&
        this._host.parentNode.appendChild(this._host);
    }
    detachBackdrop() {
      this._animationsDisabled
        ? (this._backdropRef?.dispose(), (this._backdropRef = null))
        : this._backdropRef?.detach();
    }
    _toggleClasses(i, e, t) {
      let n = fi(e || []).filter((r) => !!r);
      n.length && (t ? i.classList.add(...n) : i.classList.remove(...n));
    }
    _detachContentWhenEmpty() {
      let i = !1;
      try {
        this._detachContentAfterRenderRef = Me(
          () => {
            ((i = !0), this._detachContent());
          },
          { injector: this._injector },
        );
      } catch (e) {
        if (i) throw e;
        this._detachContent();
      }
      globalThis.MutationObserver &&
        this._pane &&
        ((this._detachContentMutationObserver ||= new globalThis.MutationObserver(() => {
          this._detachContent();
        })),
        this._detachContentMutationObserver.observe(this._pane, { childList: !0 }));
    }
    _detachContent() {
      (!this._pane || !this._host || this._pane.children.length === 0) &&
        (this._pane &&
          this._config.panelClass &&
          this._toggleClasses(this._pane, this._config.panelClass, !1),
        this._host &&
          this._host.parentElement &&
          ((this._previousHostParent = this._host.parentElement), this._host.remove()),
        this._completeDetachContent());
    }
    _completeDetachContent() {
      (this._detachContentAfterRenderRef?.destroy(),
        (this._detachContentAfterRenderRef = void 0),
        this._detachContentMutationObserver?.disconnect());
    }
    _disposeScrollStrategy() {
      let i = this._scrollStrategy;
      (i?.disable(), i?.detach?.());
    }
  },
  bn = 'cdk-overlay-connected-position-bounding-box',
  $r = /([A-Za-z%]+)$/;
function _t(o, i) {
  return new Zt(i, o.get(Ce), o.get(pe), o.get(ne), o.get(Fn));
}
var Zt = class {
  _viewportRuler;
  _document;
  _platform;
  _overlayContainer;
  _overlayRef;
  _isInitialRender;
  _lastBoundingBoxSize = { width: 0, height: 0 };
  _isPushed = !1;
  _canPush = !0;
  _growAfterOpen = !1;
  _hasFlexibleDimensions = !0;
  _positionLocked = !1;
  _originRect;
  _overlayRect;
  _viewportRect;
  _containerRect;
  _viewportMargin = 0;
  _scrollables = [];
  _preferredPositions = [];
  _origin;
  _pane;
  _isDisposed;
  _boundingBox;
  _lastPosition;
  _lastScrollVisibility;
  _positionChanges = new x();
  _resizeSubscription = fe.EMPTY;
  _offsetX = 0;
  _offsetY = 0;
  _transformOriginSelector;
  _appliedPanelClasses = [];
  _previousPushAmount;
  _popoverLocation = 'global';
  positionChanges = this._positionChanges;
  get positions() {
    return this._preferredPositions;
  }
  constructor(i, e, t, n, r) {
    ((this._viewportRuler = e),
      (this._document = t),
      (this._platform = n),
      (this._overlayContainer = r),
      this.setOrigin(i));
  }
  attach(i) {
    (this._overlayRef && this._overlayRef,
      this._validatePositions(),
      i.hostElement.classList.add(bn),
      (this._overlayRef = i),
      (this._boundingBox = i.hostElement),
      (this._pane = i.overlayElement),
      (this._isDisposed = !1),
      (this._isInitialRender = !0),
      (this._lastPosition = null),
      this._resizeSubscription.unsubscribe(),
      (this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
        ((this._isInitialRender = !0), this.apply());
      })));
  }
  apply() {
    if (this._isDisposed || !this._platform.isBrowser) return;
    if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
      this.reapplyLastPosition();
      return;
    }
    (this._clearPanelClasses(),
      this._resetOverlayElementStyles(),
      this._resetBoundingBoxStyles(),
      (this._viewportRect = this._getNarrowedViewportRect()),
      (this._originRect = this._getOriginRect()),
      (this._overlayRect = this._pane.getBoundingClientRect()),
      (this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect()));
    let i = this._originRect,
      e = this._overlayRect,
      t = this._viewportRect,
      n = this._containerRect,
      r = [],
      s;
    for (let l of this._preferredPositions) {
      let d = this._getOriginPoint(i, n, l),
        h = this._getOverlayPoint(d, e, l),
        c = this._getOverlayFit(h, e, t, l);
      if (c.isCompletelyWithinViewport) {
        ((this._isPushed = !1), this._applyPosition(l, d));
        return;
      }
      if (this._canFitWithFlexibleDimensions(c, h, t)) {
        r.push({
          position: l,
          origin: d,
          overlayRect: e,
          boundingBoxRect: this._calculateBoundingBoxRect(d, l),
        });
        continue;
      }
      (!s || s.overlayFit.visibleArea < c.visibleArea) &&
        (s = { overlayFit: c, overlayPoint: h, originPoint: d, position: l, overlayRect: e });
    }
    if (r.length) {
      let l = null,
        d = -1;
      for (let h of r) {
        let c = h.boundingBoxRect.width * h.boundingBoxRect.height * (h.position.weight || 1);
        c > d && ((d = c), (l = h));
      }
      ((this._isPushed = !1), this._applyPosition(l.position, l.origin));
      return;
    }
    if (this._canPush) {
      ((this._isPushed = !0), this._applyPosition(s.position, s.originPoint));
      return;
    }
    this._applyPosition(s.position, s.originPoint);
  }
  detach() {
    (this._clearPanelClasses(),
      (this._lastPosition = null),
      (this._previousPushAmount = null),
      this._resizeSubscription.unsubscribe());
  }
  dispose() {
    this._isDisposed ||
      (this._boundingBox &&
        Pe(this._boundingBox.style, {
          top: '',
          left: '',
          right: '',
          bottom: '',
          height: '',
          width: '',
          alignItems: '',
          justifyContent: '',
        }),
      this._pane && this._resetOverlayElementStyles(),
      this._overlayRef && this._overlayRef.hostElement.classList.remove(bn),
      this.detach(),
      this._positionChanges.complete(),
      (this._overlayRef = this._boundingBox = null),
      (this._isDisposed = !0));
  }
  reapplyLastPosition() {
    if (this._isDisposed || !this._platform.isBrowser) return;
    let i = this._lastPosition;
    if (i) {
      ((this._originRect = this._getOriginRect()),
        (this._overlayRect = this._pane.getBoundingClientRect()),
        (this._viewportRect = this._getNarrowedViewportRect()),
        (this._containerRect = this._overlayContainer
          .getContainerElement()
          .getBoundingClientRect()));
      let e = this._getOriginPoint(this._originRect, this._containerRect, i);
      this._applyPosition(i, e);
    } else this.apply();
  }
  withScrollableContainers(i) {
    return ((this._scrollables = i), this);
  }
  withPositions(i) {
    return (
      (this._preferredPositions = i),
      i.indexOf(this._lastPosition) === -1 && (this._lastPosition = null),
      this._validatePositions(),
      this
    );
  }
  withViewportMargin(i) {
    return ((this._viewportMargin = i), this);
  }
  withFlexibleDimensions(i = !0) {
    return ((this._hasFlexibleDimensions = i), this);
  }
  withGrowAfterOpen(i = !0) {
    return ((this._growAfterOpen = i), this);
  }
  withPush(i = !0) {
    return ((this._canPush = i), this);
  }
  withLockedPosition(i = !0) {
    return ((this._positionLocked = i), this);
  }
  setOrigin(i) {
    return ((this._origin = i), this);
  }
  withDefaultOffsetX(i) {
    return ((this._offsetX = i), this);
  }
  withDefaultOffsetY(i) {
    return ((this._offsetY = i), this);
  }
  withTransformOriginOn(i) {
    return ((this._transformOriginSelector = i), this);
  }
  withPopoverLocation(i) {
    return ((this._popoverLocation = i), this);
  }
  getPopoverInsertionPoint() {
    return this._popoverLocation === 'global'
      ? null
      : this._popoverLocation !== 'inline'
        ? this._popoverLocation
        : this._origin instanceof C
          ? this._origin.nativeElement
          : Ni(this._origin)
            ? this._origin
            : null;
  }
  _getOriginPoint(i, e, t) {
    let n;
    if (t.originX == 'center') n = i.left + i.width / 2;
    else {
      let s = this._isRtl() ? i.right : i.left,
        l = this._isRtl() ? i.left : i.right;
      n = t.originX == 'start' ? s : l;
    }
    e.left < 0 && (n -= e.left);
    let r;
    return (
      t.originY == 'center'
        ? (r = i.top + i.height / 2)
        : (r = t.originY == 'top' ? i.top : i.bottom),
      e.top < 0 && (r -= e.top),
      { x: n, y: r }
    );
  }
  _getOverlayPoint(i, e, t) {
    let n;
    t.overlayX == 'center'
      ? (n = -e.width / 2)
      : t.overlayX === 'start'
        ? (n = this._isRtl() ? -e.width : 0)
        : (n = this._isRtl() ? 0 : -e.width);
    let r;
    return (
      t.overlayY == 'center' ? (r = -e.height / 2) : (r = t.overlayY == 'top' ? 0 : -e.height),
      { x: i.x + n, y: i.y + r }
    );
  }
  _getOverlayFit(i, e, t, n) {
    let r = Cn(e),
      { x: s, y: l } = i,
      d = this._getOffset(n, 'x'),
      h = this._getOffset(n, 'y');
    (d && (s += d), h && (l += h));
    let c = 0 - s,
      _ = s + r.width - t.width,
      G = 0 - l,
      q = l + r.height - t.height,
      Y = this._subtractOverflows(r.width, c, _),
      J = this._subtractOverflows(r.height, G, q),
      qi = Y * J;
    return {
      visibleArea: qi,
      isCompletelyWithinViewport: r.width * r.height === qi,
      fitsInViewportVertically: J === r.height,
      fitsInViewportHorizontally: Y == r.width,
    };
  }
  _canFitWithFlexibleDimensions(i, e, t) {
    if (this._hasFlexibleDimensions) {
      let n = t.bottom - e.y,
        r = t.right - e.x,
        s = xn(this._overlayRef.getConfig().minHeight),
        l = xn(this._overlayRef.getConfig().minWidth),
        d = i.fitsInViewportVertically || (s != null && s <= n),
        h = i.fitsInViewportHorizontally || (l != null && l <= r);
      return d && h;
    }
    return !1;
  }
  _pushOverlayOnScreen(i, e, t) {
    if (this._previousPushAmount && this._positionLocked)
      return { x: i.x + this._previousPushAmount.x, y: i.y + this._previousPushAmount.y };
    let n = Cn(e),
      r = this._viewportRect,
      s = Math.max(i.x + n.width - r.width, 0),
      l = Math.max(i.y + n.height - r.height, 0),
      d = Math.max(r.top - t.top - i.y, 0),
      h = Math.max(r.left - t.left - i.x, 0),
      c = 0,
      _ = 0;
    return (
      n.width <= r.width
        ? (c = h || -s)
        : (c = i.x < this._getViewportMarginStart() ? r.left - t.left - i.x : 0),
      n.height <= r.height
        ? (_ = d || -l)
        : (_ = i.y < this._getViewportMarginTop() ? r.top - t.top - i.y : 0),
      (this._previousPushAmount = { x: c, y: _ }),
      { x: i.x + c, y: i.y + _ }
    );
  }
  _applyPosition(i, e) {
    if (
      (this._setTransformOrigin(i),
      this._setOverlayElementStyles(e, i),
      this._setBoundingBoxStyles(e, i),
      i.panelClass && this._addPanelClasses(i.panelClass),
      this._positionChanges.observers.length)
    ) {
      let t = this._getScrollVisibility();
      if (
        i !== this._lastPosition ||
        !this._lastScrollVisibility ||
        !Zr(this._lastScrollVisibility, t)
      ) {
        let n = new qt(i, t);
        this._positionChanges.next(n);
      }
      this._lastScrollVisibility = t;
    }
    ((this._lastPosition = i), (this._isInitialRender = !1));
  }
  _setTransformOrigin(i) {
    if (!this._transformOriginSelector) return;
    let e = this._boundingBox.querySelectorAll(this._transformOriginSelector),
      t,
      n = i.overlayY;
    i.overlayX === 'center'
      ? (t = 'center')
      : this._isRtl()
        ? (t = i.overlayX === 'start' ? 'right' : 'left')
        : (t = i.overlayX === 'start' ? 'left' : 'right');
    for (let r = 0; r < e.length; r++) e[r].style.transformOrigin = `${t} ${n}`;
  }
  _calculateBoundingBoxRect(i, e) {
    let t = this._viewportRect,
      n = this._isRtl(),
      r,
      s,
      l;
    if (e.overlayY === 'top') ((s = i.y), (r = t.height - s + this._getViewportMarginBottom()));
    else if (e.overlayY === 'bottom')
      ((l = t.height - i.y + this._getViewportMarginTop() + this._getViewportMarginBottom()),
        (r = t.height - l + this._getViewportMarginTop()));
    else {
      let q = Math.min(t.bottom - i.y + t.top, i.y),
        Y = this._lastBoundingBoxSize.height;
      ((r = q * 2),
        (s = i.y - q),
        r > Y && !this._isInitialRender && !this._growAfterOpen && (s = i.y - Y / 2));
    }
    let d = (e.overlayX === 'start' && !n) || (e.overlayX === 'end' && n),
      h = (e.overlayX === 'end' && !n) || (e.overlayX === 'start' && n),
      c,
      _,
      G;
    if (h)
      ((G = t.width - i.x + this._getViewportMarginStart() + this._getViewportMarginEnd()),
        (c = i.x - this._getViewportMarginStart()));
    else if (d) ((_ = i.x), (c = t.right - i.x - this._getViewportMarginEnd()));
    else {
      let q = Math.min(t.right - i.x + t.left, i.x),
        Y = this._lastBoundingBoxSize.width;
      ((c = q * 2),
        (_ = i.x - q),
        c > Y && !this._isInitialRender && !this._growAfterOpen && (_ = i.x - Y / 2));
    }
    return { top: s, left: _, bottom: l, right: G, width: c, height: r };
  }
  _setBoundingBoxStyles(i, e) {
    let t = this._calculateBoundingBoxRect(i, e);
    !this._isInitialRender &&
      !this._growAfterOpen &&
      ((t.height = Math.min(t.height, this._lastBoundingBoxSize.height)),
      (t.width = Math.min(t.width, this._lastBoundingBoxSize.width)));
    let n = {};
    if (this._hasExactPosition())
      ((n.top = n.left = '0'),
        (n.bottom = n.right = 'auto'),
        (n.maxHeight = n.maxWidth = ''),
        (n.width = n.height = '100%'));
    else {
      let r = this._overlayRef.getConfig().maxHeight,
        s = this._overlayRef.getConfig().maxWidth;
      ((n.width = R(t.width)),
        (n.height = R(t.height)),
        (n.top = R(t.top) || 'auto'),
        (n.bottom = R(t.bottom) || 'auto'),
        (n.left = R(t.left) || 'auto'),
        (n.right = R(t.right) || 'auto'),
        e.overlayX === 'center'
          ? (n.alignItems = 'center')
          : (n.alignItems = e.overlayX === 'end' ? 'flex-end' : 'flex-start'),
        e.overlayY === 'center'
          ? (n.justifyContent = 'center')
          : (n.justifyContent = e.overlayY === 'bottom' ? 'flex-end' : 'flex-start'),
        r && (n.maxHeight = R(r)),
        s && (n.maxWidth = R(s)));
    }
    ((this._lastBoundingBoxSize = t), Pe(this._boundingBox.style, n));
  }
  _resetBoundingBoxStyles() {
    Pe(this._boundingBox.style, {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      height: '',
      width: '',
      alignItems: '',
      justifyContent: '',
    });
  }
  _resetOverlayElementStyles() {
    Pe(this._pane.style, { top: '', left: '', bottom: '', right: '', position: '', transform: '' });
  }
  _setOverlayElementStyles(i, e) {
    let t = {},
      n = this._hasExactPosition(),
      r = this._hasFlexibleDimensions,
      s = this._overlayRef.getConfig();
    if (n) {
      let c = this._viewportRuler.getViewportScrollPosition();
      (Pe(t, this._getExactOverlayY(e, i, c)), Pe(t, this._getExactOverlayX(e, i, c)));
    } else t.position = 'static';
    let l = '',
      d = this._getOffset(e, 'x'),
      h = this._getOffset(e, 'y');
    (d && (l += `translateX(${d}px) `),
      h && (l += `translateY(${h}px)`),
      (t.transform = l.trim()),
      s.maxHeight && (n ? (t.maxHeight = R(s.maxHeight)) : r && (t.maxHeight = '')),
      s.maxWidth && (n ? (t.maxWidth = R(s.maxWidth)) : r && (t.maxWidth = '')),
      Pe(this._pane.style, t));
  }
  _getExactOverlayY(i, e, t) {
    let n = { top: '', bottom: '' },
      r = this._getOverlayPoint(e, this._overlayRect, i);
    if (
      (this._isPushed && (r = this._pushOverlayOnScreen(r, this._overlayRect, t)),
      i.overlayY === 'bottom')
    ) {
      let s = this._document.documentElement.clientHeight;
      n.bottom = `${s - (r.y + this._overlayRect.height)}px`;
    } else n.top = R(r.y);
    return n;
  }
  _getExactOverlayX(i, e, t) {
    let n = { left: '', right: '' },
      r = this._getOverlayPoint(e, this._overlayRect, i);
    this._isPushed && (r = this._pushOverlayOnScreen(r, this._overlayRect, t));
    let s;
    if (
      (this._isRtl()
        ? (s = i.overlayX === 'end' ? 'left' : 'right')
        : (s = i.overlayX === 'end' ? 'right' : 'left'),
      s === 'right')
    ) {
      let l = this._document.documentElement.clientWidth;
      n.right = `${l - (r.x + this._overlayRect.width)}px`;
    } else n.left = R(r.x);
    return n;
  }
  _getScrollVisibility() {
    let i = this._getOriginRect(),
      e = this._pane.getBoundingClientRect(),
      t = this._scrollables.map((n) => n.getElementRef().nativeElement.getBoundingClientRect());
    return {
      isOriginClipped: vn(i, t),
      isOriginOutsideView: Pi(i, t),
      isOverlayClipped: vn(e, t),
      isOverlayOutsideView: Pi(e, t),
    };
  }
  _subtractOverflows(i, ...e) {
    return e.reduce((t, n) => t - Math.max(n, 0), i);
  }
  _getNarrowedViewportRect() {
    let i = this._document.documentElement.clientWidth,
      e = this._document.documentElement.clientHeight,
      t = this._viewportRuler.getViewportScrollPosition();
    return {
      top: t.top + this._getViewportMarginTop(),
      left: t.left + this._getViewportMarginStart(),
      right: t.left + i - this._getViewportMarginEnd(),
      bottom: t.top + e - this._getViewportMarginBottom(),
      width: i - this._getViewportMarginStart() - this._getViewportMarginEnd(),
      height: e - this._getViewportMarginTop() - this._getViewportMarginBottom(),
    };
  }
  _isRtl() {
    return this._overlayRef.getDirection() === 'rtl';
  }
  _hasExactPosition() {
    return !this._hasFlexibleDimensions || this._isPushed;
  }
  _getOffset(i, e) {
    return e === 'x'
      ? i.offsetX == null
        ? this._offsetX
        : i.offsetX
      : i.offsetY == null
        ? this._offsetY
        : i.offsetY;
  }
  _validatePositions() {}
  _addPanelClasses(i) {
    this._pane &&
      fi(i).forEach((e) => {
        e !== '' &&
          this._appliedPanelClasses.indexOf(e) === -1 &&
          (this._appliedPanelClasses.push(e), this._pane.classList.add(e));
      });
  }
  _clearPanelClasses() {
    this._pane &&
      (this._appliedPanelClasses.forEach((i) => {
        this._pane.classList.remove(i);
      }),
      (this._appliedPanelClasses = []));
  }
  _getViewportMarginStart() {
    return typeof this._viewportMargin == 'number'
      ? this._viewportMargin
      : (this._viewportMargin?.start ?? 0);
  }
  _getViewportMarginEnd() {
    return typeof this._viewportMargin == 'number'
      ? this._viewportMargin
      : (this._viewportMargin?.end ?? 0);
  }
  _getViewportMarginTop() {
    return typeof this._viewportMargin == 'number'
      ? this._viewportMargin
      : (this._viewportMargin?.top ?? 0);
  }
  _getViewportMarginBottom() {
    return typeof this._viewportMargin == 'number'
      ? this._viewportMargin
      : (this._viewportMargin?.bottom ?? 0);
  }
  _getOriginRect() {
    let i = this._origin;
    if (i instanceof C) return i.nativeElement.getBoundingClientRect();
    if (i instanceof Element) return i.getBoundingClientRect();
    let e = i.width || 0,
      t = i.height || 0;
    return { top: i.y, bottom: i.y + t, left: i.x, right: i.x + e, height: t, width: e };
  }
};
function Pe(o, i) {
  for (let e in i) i.hasOwnProperty(e) && (o[e] = i[e]);
  return o;
}
function xn(o) {
  if (typeof o != 'number' && o != null) {
    let [i, e] = o.split($r);
    return !e || e === 'px' ? parseFloat(i) : null;
  }
  return o || null;
}
function Cn(o) {
  return {
    top: Math.floor(o.top),
    right: Math.floor(o.right),
    bottom: Math.floor(o.bottom),
    left: Math.floor(o.left),
    width: Math.floor(o.width),
    height: Math.floor(o.height),
  };
}
function Zr(o, i) {
  return o === i
    ? !0
    : o.isOriginClipped === i.isOriginClipped &&
        o.isOriginOutsideView === i.isOriginOutsideView &&
        o.isOverlayClipped === i.isOverlayClipped &&
        o.isOverlayOutsideView === i.isOverlayOutsideView;
}
var wn = 'cdk-global-overlay-wrapper';
function Vn(o) {
  return new Qt();
}
var Qt = class {
    _overlayRef;
    _cssPosition = 'static';
    _topOffset = '';
    _bottomOffset = '';
    _alignItems = '';
    _xPosition = '';
    _xOffset = '';
    _width = '';
    _height = '';
    _isDisposed = !1;
    attach(i) {
      let e = i.getConfig();
      ((this._overlayRef = i),
        this._width && !e.width && i.updateSize({ width: this._width }),
        this._height && !e.height && i.updateSize({ height: this._height }),
        i.hostElement.classList.add(wn),
        (this._isDisposed = !1));
    }
    top(i = '') {
      return (
        (this._bottomOffset = ''),
        (this._topOffset = i),
        (this._alignItems = 'flex-start'),
        this
      );
    }
    left(i = '') {
      return ((this._xOffset = i), (this._xPosition = 'left'), this);
    }
    bottom(i = '') {
      return (
        (this._topOffset = ''),
        (this._bottomOffset = i),
        (this._alignItems = 'flex-end'),
        this
      );
    }
    right(i = '') {
      return ((this._xOffset = i), (this._xPosition = 'right'), this);
    }
    start(i = '') {
      return ((this._xOffset = i), (this._xPosition = 'start'), this);
    }
    end(i = '') {
      return ((this._xOffset = i), (this._xPosition = 'end'), this);
    }
    width(i = '') {
      return (
        this._overlayRef ? this._overlayRef.updateSize({ width: i }) : (this._width = i),
        this
      );
    }
    height(i = '') {
      return (
        this._overlayRef ? this._overlayRef.updateSize({ height: i }) : (this._height = i),
        this
      );
    }
    centerHorizontally(i = '') {
      return (this.left(i), (this._xPosition = 'center'), this);
    }
    centerVertically(i = '') {
      return (this.top(i), (this._alignItems = 'center'), this);
    }
    apply() {
      if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
      let i = this._overlayRef.overlayElement.style,
        e = this._overlayRef.hostElement.style,
        t = this._overlayRef.getConfig(),
        { width: n, height: r, maxWidth: s, maxHeight: l } = t,
        d = (n === '100%' || n === '100vw') && (!s || s === '100%' || s === '100vw'),
        h = (r === '100%' || r === '100vh') && (!l || l === '100%' || l === '100vh'),
        c = this._xPosition,
        _ = this._xOffset,
        G = this._overlayRef.getConfig().direction === 'rtl',
        q = '',
        Y = '',
        J = '';
      (d
        ? (J = 'flex-start')
        : c === 'center'
          ? ((J = 'center'), G ? (Y = _) : (q = _))
          : G
            ? c === 'left' || c === 'end'
              ? ((J = 'flex-end'), (q = _))
              : (c === 'right' || c === 'start') && ((J = 'flex-start'), (Y = _))
            : c === 'left' || c === 'start'
              ? ((J = 'flex-start'), (q = _))
              : (c === 'right' || c === 'end') && ((J = 'flex-end'), (Y = _)),
        (i.position = this._cssPosition),
        (i.marginLeft = d ? '0' : q),
        (i.marginTop = h ? '0' : this._topOffset),
        (i.marginBottom = this._bottomOffset),
        (i.marginRight = d ? '0' : Y),
        (e.justifyContent = J),
        (e.alignItems = h ? 'flex-start' : this._alignItems));
    }
    dispose() {
      if (this._isDisposed || !this._overlayRef) return;
      let i = this._overlayRef.overlayElement.style,
        e = this._overlayRef.hostElement,
        t = e.style;
      (e.classList.remove(wn),
        (t.justifyContent =
          t.alignItems =
          i.marginTop =
          i.marginBottom =
          i.marginLeft =
          i.marginRight =
          i.position =
            ''),
        (this._overlayRef = null),
        (this._isDisposed = !0));
    }
  },
  Rn = (() => {
    class o {
      _injector = a(ee);
      constructor() {}
      global() {
        return Vn();
      }
      flexibleConnectedTo(e) {
        return _t(this._injector, e);
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })(),
  Li = new g('OVERLAY_DEFAULT_CONFIG');
function gt(o, i) {
  o.get(Re).load(An);
  let e = o.get(Fn),
    t = o.get(pe),
    n = o.get(re),
    r = o.get(li),
    s = o.get(ve),
    l = o.get(oe, null, { optional: !0 }) || o.get(Le).createRenderer(null, null),
    d = new pt(i),
    h = o.get(Li, null, { optional: !0 })?.usePopover ?? !0;
  ((d.direction = d.direction || s.value),
    'showPopover' in t.body ? (d.usePopover = i?.usePopover ?? h) : (d.usePopover = !1));
  let c = t.createElement('div'),
    _ = t.createElement('div');
  ((c.id = n.getId('cdk-overlay-')),
    c.classList.add('cdk-overlay-pane'),
    _.appendChild(c),
    d.usePopover && (_.setAttribute('popover', 'manual'), _.classList.add('cdk-overlay-popover')));
  let G = d.usePopover ? d.positionStrategy?.getPopoverInsertionPoint?.() : null;
  return (
    e.getContainerElement().appendChild(_),
    Ni(G) ? G.after(_) : G?.type === 'parent' && G.element.appendChild(_),
    new $t(
      new Ro(c, r, o),
      _,
      c,
      d,
      o.get(N),
      o.get(En),
      t,
      o.get(po),
      o.get(On),
      i?.disableAnimations ?? o.get(no, null, { optional: !0 }) === 'NoopAnimations',
      o.get(io),
      l,
    )
  );
}
var In = (() => {
    class o {
      scrollStrategies = a(Mn);
      _positionBuilder = a(Rn);
      _injector = a(ee);
      constructor() {}
      create(e) {
        return gt(this._injector, e);
      }
      position() {
        return this._positionBuilder;
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })(),
  Qr = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
  ],
  Kr = new g('cdk-connected-overlay-scroll-strategy', {
    providedIn: 'root',
    factory: () => {
      let o = a(ee);
      return () => Te(o);
    },
  }),
  Xe = (() => {
    class o {
      elementRef = a(C);
      constructor() {}
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['', 'cdk-overlay-origin', ''],
          ['', 'overlay-origin', ''],
          ['', 'cdkOverlayOrigin', ''],
        ],
        exportAs: ['cdkOverlayOrigin'],
      });
    }
    return o;
  })(),
  Pn = new g('cdk-connected-overlay-default-config'),
  Jt = (() => {
    class o {
      _dir = a(ve, { optional: !0 });
      _injector = a(ee);
      _overlayRef;
      _templatePortal;
      _backdropSubscription = fe.EMPTY;
      _attachSubscription = fe.EMPTY;
      _detachSubscription = fe.EMPTY;
      _positionSubscription = fe.EMPTY;
      _offsetX;
      _offsetY;
      _position;
      _scrollStrategyFactory = a(Kr);
      _ngZone = a(N);
      origin;
      positions;
      positionStrategy;
      get offsetX() {
        return this._offsetX;
      }
      set offsetX(e) {
        ((this._offsetX = e), this._position && this._updatePositionStrategy(this._position));
      }
      get offsetY() {
        return this._offsetY;
      }
      set offsetY(e) {
        ((this._offsetY = e), this._position && this._updatePositionStrategy(this._position));
      }
      width;
      height;
      minWidth;
      minHeight;
      backdropClass;
      panelClass;
      viewportMargin = 0;
      scrollStrategy;
      open = !1;
      disableClose = !1;
      transformOriginSelector;
      hasBackdrop = !1;
      lockPosition = !1;
      flexibleDimensions = !1;
      growAfterOpen = !1;
      push = !1;
      disposeOnNavigation = !1;
      usePopover;
      matchWidth = !1;
      set _config(e) {
        typeof e != 'string' && this._assignConfig(e);
      }
      backdropClick = new E();
      positionChange = new E();
      attach = new E();
      detach = new E();
      overlayKeydown = new E();
      overlayOutsideClick = new E();
      constructor() {
        let e = a(ro),
          t = a(Ct),
          n = a(Pn, { optional: !0 }),
          r = a(Li, { optional: !0 });
        ((this.usePopover = r?.usePopover === !1 ? null : 'global'),
          (this._templatePortal = new Vo(e, t)),
          (this.scrollStrategy = this._scrollStrategyFactory()),
          n && this._assignConfig(n));
      }
      get overlayRef() {
        return this._overlayRef;
      }
      get dir() {
        return this._dir ? this._dir.value : 'ltr';
      }
      ngOnDestroy() {
        (this._attachSubscription.unsubscribe(),
          this._detachSubscription.unsubscribe(),
          this._backdropSubscription.unsubscribe(),
          this._positionSubscription.unsubscribe(),
          this._overlayRef?.dispose());
      }
      ngOnChanges(e) {
        (this._position &&
          (this._updatePositionStrategy(this._position),
          this._overlayRef?.updateSize({
            width: this._getWidth(),
            minWidth: this.minWidth,
            height: this.height,
            minHeight: this.minHeight,
          }),
          e.origin && this.open && this._position.apply()),
          e.open && (this.open ? this.attachOverlay() : this.detachOverlay()));
      }
      _createOverlay() {
        (!this.positions || !this.positions.length) && (this.positions = Qr);
        let e = (this._overlayRef = gt(this._injector, this._buildConfig()));
        ((this._attachSubscription = e.attachments().subscribe(() => this.attach.emit())),
          (this._detachSubscription = e.detachments().subscribe(() => this.detach.emit())),
          e.keydownEvents().subscribe((t) => {
            (this.overlayKeydown.next(t),
              t.keyCode === 27 &&
                !this.disableClose &&
                !ue(t) &&
                (t.preventDefault(), this.detachOverlay()));
          }),
          this._overlayRef.outsidePointerEvents().subscribe((t) => {
            let n = this._getOriginElement(),
              r = Be(t);
            (!n || (n !== r && !n.contains(r))) && this.overlayOutsideClick.next(t);
          }));
      }
      _buildConfig() {
        let e = (this._position = this.positionStrategy || this._createPositionStrategy()),
          t = new pt({
            direction: this._dir || 'ltr',
            positionStrategy: e,
            scrollStrategy: this.scrollStrategy,
            hasBackdrop: this.hasBackdrop,
            disposeOnNavigation: this.disposeOnNavigation,
            usePopover: !!this.usePopover,
          });
        return (
          (this.height || this.height === 0) && (t.height = this.height),
          (this.minWidth || this.minWidth === 0) && (t.minWidth = this.minWidth),
          (this.minHeight || this.minHeight === 0) && (t.minHeight = this.minHeight),
          this.backdropClass && (t.backdropClass = this.backdropClass),
          this.panelClass && (t.panelClass = this.panelClass),
          t
        );
      }
      _updatePositionStrategy(e) {
        let t = this.positions.map((n) => ({
          originX: n.originX,
          originY: n.originY,
          overlayX: n.overlayX,
          overlayY: n.overlayY,
          offsetX: n.offsetX || this.offsetX,
          offsetY: n.offsetY || this.offsetY,
          panelClass: n.panelClass || void 0,
        }));
        return e
          .setOrigin(this._getOrigin())
          .withPositions(t)
          .withFlexibleDimensions(this.flexibleDimensions)
          .withPush(this.push)
          .withGrowAfterOpen(this.growAfterOpen)
          .withViewportMargin(this.viewportMargin)
          .withLockedPosition(this.lockPosition)
          .withTransformOriginOn(this.transformOriginSelector)
          .withPopoverLocation(this.usePopover === null ? 'global' : this.usePopover);
      }
      _createPositionStrategy() {
        let e = _t(this._injector, this._getOrigin());
        return (this._updatePositionStrategy(e), e);
      }
      _getOrigin() {
        return this.origin instanceof Xe ? this.origin.elementRef : this.origin;
      }
      _getOriginElement() {
        return this.origin instanceof Xe
          ? this.origin.elementRef.nativeElement
          : this.origin instanceof C
            ? this.origin.nativeElement
            : typeof Element < 'u' && this.origin instanceof Element
              ? this.origin
              : null;
      }
      _getWidth() {
        return this.width
          ? this.width
          : this.matchWidth
            ? this._getOriginElement()?.getBoundingClientRect?.().width
            : void 0;
      }
      attachOverlay() {
        this._overlayRef || this._createOverlay();
        let e = this._overlayRef;
        ((e.getConfig().hasBackdrop = this.hasBackdrop),
          e.updateSize({ width: this._getWidth() }),
          e.hasAttached() || e.attach(this._templatePortal),
          this.hasBackdrop
            ? (this._backdropSubscription = e
                .backdropClick()
                .subscribe((t) => this.backdropClick.emit(t)))
            : this._backdropSubscription.unsubscribe(),
          this._positionSubscription.unsubscribe(),
          this.positionChange.observers.length > 0 &&
            (this._positionSubscription = this._position.positionChanges
              .pipe(to(() => this.positionChange.observers.length > 0))
              .subscribe((t) => {
                (this._ngZone.run(() => this.positionChange.emit(t)),
                  this.positionChange.observers.length === 0 &&
                    this._positionSubscription.unsubscribe());
              })),
          (this.open = !0));
      }
      detachOverlay() {
        (this._overlayRef?.detach(),
          this._backdropSubscription.unsubscribe(),
          this._positionSubscription.unsubscribe(),
          (this.open = !1));
      }
      _assignConfig(e) {
        ((this.origin = e.origin ?? this.origin),
          (this.positions = e.positions ?? this.positions),
          (this.positionStrategy = e.positionStrategy ?? this.positionStrategy),
          (this.offsetX = e.offsetX ?? this.offsetX),
          (this.offsetY = e.offsetY ?? this.offsetY),
          (this.width = e.width ?? this.width),
          (this.height = e.height ?? this.height),
          (this.minWidth = e.minWidth ?? this.minWidth),
          (this.minHeight = e.minHeight ?? this.minHeight),
          (this.backdropClass = e.backdropClass ?? this.backdropClass),
          (this.panelClass = e.panelClass ?? this.panelClass),
          (this.viewportMargin = e.viewportMargin ?? this.viewportMargin),
          (this.scrollStrategy = e.scrollStrategy ?? this.scrollStrategy),
          (this.disableClose = e.disableClose ?? this.disableClose),
          (this.transformOriginSelector =
            e.transformOriginSelector ?? this.transformOriginSelector),
          (this.hasBackdrop = e.hasBackdrop ?? this.hasBackdrop),
          (this.lockPosition = e.lockPosition ?? this.lockPosition),
          (this.flexibleDimensions = e.flexibleDimensions ?? this.flexibleDimensions),
          (this.growAfterOpen = e.growAfterOpen ?? this.growAfterOpen),
          (this.push = e.push ?? this.push),
          (this.disposeOnNavigation = e.disposeOnNavigation ?? this.disposeOnNavigation),
          (this.usePopover = e.usePopover ?? this.usePopover),
          (this.matchWidth = e.matchWidth ?? this.matchWidth));
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['', 'cdk-connected-overlay', ''],
          ['', 'connected-overlay', ''],
          ['', 'cdkConnectedOverlay', ''],
        ],
        inputs: {
          origin: [0, 'cdkConnectedOverlayOrigin', 'origin'],
          positions: [0, 'cdkConnectedOverlayPositions', 'positions'],
          positionStrategy: [0, 'cdkConnectedOverlayPositionStrategy', 'positionStrategy'],
          offsetX: [0, 'cdkConnectedOverlayOffsetX', 'offsetX'],
          offsetY: [0, 'cdkConnectedOverlayOffsetY', 'offsetY'],
          width: [0, 'cdkConnectedOverlayWidth', 'width'],
          height: [0, 'cdkConnectedOverlayHeight', 'height'],
          minWidth: [0, 'cdkConnectedOverlayMinWidth', 'minWidth'],
          minHeight: [0, 'cdkConnectedOverlayMinHeight', 'minHeight'],
          backdropClass: [0, 'cdkConnectedOverlayBackdropClass', 'backdropClass'],
          panelClass: [0, 'cdkConnectedOverlayPanelClass', 'panelClass'],
          viewportMargin: [0, 'cdkConnectedOverlayViewportMargin', 'viewportMargin'],
          scrollStrategy: [0, 'cdkConnectedOverlayScrollStrategy', 'scrollStrategy'],
          open: [0, 'cdkConnectedOverlayOpen', 'open'],
          disableClose: [0, 'cdkConnectedOverlayDisableClose', 'disableClose'],
          transformOriginSelector: [
            0,
            'cdkConnectedOverlayTransformOriginOn',
            'transformOriginSelector',
          ],
          hasBackdrop: [2, 'cdkConnectedOverlayHasBackdrop', 'hasBackdrop', M],
          lockPosition: [2, 'cdkConnectedOverlayLockPosition', 'lockPosition', M],
          flexibleDimensions: [2, 'cdkConnectedOverlayFlexibleDimensions', 'flexibleDimensions', M],
          growAfterOpen: [2, 'cdkConnectedOverlayGrowAfterOpen', 'growAfterOpen', M],
          push: [2, 'cdkConnectedOverlayPush', 'push', M],
          disposeOnNavigation: [
            2,
            'cdkConnectedOverlayDisposeOnNavigation',
            'disposeOnNavigation',
            M,
          ],
          usePopover: [0, 'cdkConnectedOverlayUsePopover', 'usePopover'],
          matchWidth: [2, 'cdkConnectedOverlayMatchWidth', 'matchWidth', M],
          _config: [0, 'cdkConnectedOverlay', '_config'],
        },
        outputs: {
          backdropClick: 'backdropClick',
          positionChange: 'positionChange',
          attach: 'attach',
          detach: 'detach',
          overlayKeydown: 'overlayKeydown',
          overlayOutsideClick: 'overlayOutsideClick',
        },
        exportAs: ['cdkConnectedOverlay'],
        features: [ie],
      });
    }
    return o;
  })(),
  vt = (() => {
    class o {
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵmod = O({ type: o });
      static ɵinj = k({ providers: [In], imports: [W, Io, yi, yi] });
    }
    return o;
  })();
var Jr = ['tooltip'],
  es = 20;
var ts = new g('mat-tooltip-scroll-strategy', {
    providedIn: 'root',
    factory: () => {
      let o = a(ee);
      return () => Te(o, { scrollThrottle: es });
    },
  }),
  is = new g('mat-tooltip-default-options', {
    providedIn: 'root',
    factory: () => ({ showDelay: 0, hideDelay: 0, touchendHideDelay: 1500 }),
  });
var Tn = 'tooltip-panel',
  Nn = _o({ passive: !0 }),
  os = 8,
  ns = 8,
  rs = 24,
  ss = 200,
  as = (() => {
    class o {
      _elementRef = a(C);
      _ngZone = a(N);
      _platform = a(ne);
      _ariaDescriber = a(So);
      _focusMonitor = a(go);
      _dir = a(ve);
      _injector = a(ee);
      _viewContainerRef = a(Ct);
      _animationsDisabled = be();
      _defaultOptions = a(is, { optional: !0 });
      _overlayRef;
      _tooltipInstance;
      _overlayPanelClass;
      _portal;
      _position = 'below';
      _positionAtOrigin = !1;
      _disabled = !1;
      _tooltipClass;
      _viewInitialized = !1;
      _pointerExitEventsInitialized = !1;
      _tooltipComponent = Ln;
      _viewportMargin = 8;
      _currentPosition;
      _cssClassPrefix = 'mat-mdc';
      _ariaDescriptionPending;
      _dirSubscribed = !1;
      get position() {
        return this._position;
      }
      set position(e) {
        e !== this._position &&
          ((this._position = e),
          this._overlayRef &&
            (this._updatePosition(this._overlayRef),
            this._tooltipInstance?.show(0),
            this._overlayRef.updatePosition()));
      }
      get positionAtOrigin() {
        return this._positionAtOrigin;
      }
      set positionAtOrigin(e) {
        ((this._positionAtOrigin = ye(e)), this._detach(), (this._overlayRef = null));
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        let t = ye(e);
        this._disabled !== t &&
          ((this._disabled = t),
          t ? this.hide(0) : this._setupPointerEnterEventsIfNeeded(),
          this._syncAriaDescription(this.message));
      }
      get showDelay() {
        return this._showDelay;
      }
      set showDelay(e) {
        this._showDelay = Ft(e);
      }
      _showDelay;
      get hideDelay() {
        return this._hideDelay;
      }
      set hideDelay(e) {
        ((this._hideDelay = Ft(e)),
          this._tooltipInstance && (this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay));
      }
      _hideDelay;
      touchGestures = 'auto';
      get message() {
        return this._message;
      }
      set message(e) {
        let t = this._message;
        ((this._message = e != null ? String(e).trim() : ''),
          !this._message && this._isTooltipVisible()
            ? this.hide(0)
            : (this._setupPointerEnterEventsIfNeeded(), this._updateTooltipMessage()),
          this._syncAriaDescription(t));
      }
      _message = '';
      get tooltipClass() {
        return this._tooltipClass;
      }
      set tooltipClass(e) {
        ((this._tooltipClass = e),
          this._tooltipInstance && this._setTooltipClass(this._tooltipClass));
      }
      _passiveListeners = [];
      _touchstartTimeout = null;
      _destroyed = new x();
      _isDestroyed = !1;
      constructor() {
        let e = this._defaultOptions;
        (e &&
          ((this._showDelay = e.showDelay),
          (this._hideDelay = e.hideDelay),
          e.position && (this.position = e.position),
          e.positionAtOrigin && (this.positionAtOrigin = e.positionAtOrigin),
          e.touchGestures && (this.touchGestures = e.touchGestures),
          e.tooltipClass && (this.tooltipClass = e.tooltipClass)),
          (this._viewportMargin = os));
      }
      ngAfterViewInit() {
        ((this._viewInitialized = !0),
          this._setupPointerEnterEventsIfNeeded(),
          this._focusMonitor
            .monitor(this._elementRef)
            .pipe(z(this._destroyed))
            .subscribe((e) => {
              e
                ? e === 'keyboard' && this._ngZone.run(() => this.show())
                : this._ngZone.run(() => this.hide(0));
            }));
      }
      ngOnDestroy() {
        let e = this._elementRef.nativeElement;
        (this._touchstartTimeout && clearTimeout(this._touchstartTimeout),
          this._overlayRef && (this._overlayRef.dispose(), (this._tooltipInstance = null)),
          this._passiveListeners.forEach(([t, n]) => {
            e.removeEventListener(t, n, Nn);
          }),
          (this._passiveListeners.length = 0),
          this._destroyed.next(),
          this._destroyed.complete(),
          (this._isDestroyed = !0),
          this._ariaDescriber.removeDescription(e, this.message, 'tooltip'),
          this._focusMonitor.stopMonitoring(e));
      }
      show(e = this.showDelay, t) {
        if (this.disabled || !this.message || this._isTooltipVisible()) {
          this._tooltipInstance?._cancelPendingAnimations();
          return;
        }
        let n = this._createOverlay(t);
        (this._detach(),
          (this._portal = this._portal || new Fo(this._tooltipComponent, this._viewContainerRef)));
        let r = (this._tooltipInstance = n.attach(this._portal).instance);
        ((r._triggerElement = this._elementRef.nativeElement),
          (r._mouseLeaveHideDelay = this._hideDelay),
          r
            .afterHidden()
            .pipe(z(this._destroyed))
            .subscribe(() => this._detach()),
          this._setTooltipClass(this._tooltipClass),
          this._updateTooltipMessage(),
          r.show(e));
      }
      hide(e = this.hideDelay) {
        let t = this._tooltipInstance;
        t && (t.isVisible() ? t.hide(e) : (t._cancelPendingAnimations(), this._detach()));
      }
      toggle(e) {
        this._isTooltipVisible() ? this.hide() : this.show(void 0, e);
      }
      _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
      }
      _createOverlay(e) {
        if (this._overlayRef) {
          let s = this._overlayRef.getConfig().positionStrategy;
          if ((!this.positionAtOrigin || !e) && s._origin instanceof C) return this._overlayRef;
          this._detach();
        }
        let t = this._injector.get(He).getAncestorScrollContainers(this._elementRef),
          n = `${this._cssClassPrefix}-${Tn}`,
          r = _t(this._injector, this.positionAtOrigin ? e || this._elementRef : this._elementRef)
            .withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`)
            .withFlexibleDimensions(!1)
            .withViewportMargin(this._viewportMargin)
            .withScrollableContainers(t)
            .withPopoverLocation('global');
        return (
          r.positionChanges.pipe(z(this._destroyed)).subscribe((s) => {
            (this._updateCurrentPositionClass(s.connectionPair),
              this._tooltipInstance &&
                s.scrollableViewProperties.isOverlayClipped &&
                this._tooltipInstance.isVisible() &&
                this._ngZone.run(() => this.hide(0)));
          }),
          (this._overlayRef = gt(this._injector, {
            direction: this._dir,
            positionStrategy: r,
            panelClass: this._overlayPanelClass ? [...this._overlayPanelClass, n] : n,
            scrollStrategy: this._injector.get(ts)(),
            disableAnimations: this._animationsDisabled,
          })),
          this._updatePosition(this._overlayRef),
          this._overlayRef
            .detachments()
            .pipe(z(this._destroyed))
            .subscribe(() => this._detach()),
          this._overlayRef
            .outsidePointerEvents()
            .pipe(z(this._destroyed))
            .subscribe(() => this._tooltipInstance?._handleBodyInteraction()),
          this._overlayRef
            .keydownEvents()
            .pipe(z(this._destroyed))
            .subscribe((s) => {
              this._isTooltipVisible() &&
                s.keyCode === 27 &&
                !ue(s) &&
                (s.preventDefault(), s.stopPropagation(), this._ngZone.run(() => this.hide(0)));
            }),
          this._defaultOptions?.disableTooltipInteractivity &&
            this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),
          this._dirSubscribed ||
            ((this._dirSubscribed = !0),
            this._dir.change.pipe(z(this._destroyed)).subscribe(() => {
              this._overlayRef && this._updatePosition(this._overlayRef);
            })),
          this._overlayRef
        );
      }
      _detach() {
        (this._overlayRef && this._overlayRef.hasAttached() && this._overlayRef.detach(),
          (this._tooltipInstance = null));
      }
      _updatePosition(e) {
        let t = e.getConfig().positionStrategy,
          n = this._getOrigin(),
          r = this._getOverlayPosition();
        t.withPositions([
          this._addOffset(S(S({}, n.main), r.main)),
          this._addOffset(S(S({}, n.fallback), r.fallback)),
        ]);
      }
      _addOffset(e) {
        let t = ns,
          n = !this._dir || this._dir.value == 'ltr';
        return (
          e.originY === 'top'
            ? (e.offsetY = -t)
            : e.originY === 'bottom'
              ? (e.offsetY = t)
              : e.originX === 'start'
                ? (e.offsetX = n ? -t : t)
                : e.originX === 'end' && (e.offsetX = n ? t : -t),
          e
        );
      }
      _getOrigin() {
        let e = !this._dir || this._dir.value == 'ltr',
          t = this.position,
          n;
        t == 'above' || t == 'below'
          ? (n = { originX: 'center', originY: t == 'above' ? 'top' : 'bottom' })
          : t == 'before' || (t == 'left' && e) || (t == 'right' && !e)
            ? (n = { originX: 'start', originY: 'center' })
            : (t == 'after' || (t == 'right' && e) || (t == 'left' && !e)) &&
              (n = { originX: 'end', originY: 'center' });
        let { x: r, y: s } = this._invertPosition(n.originX, n.originY);
        return { main: n, fallback: { originX: r, originY: s } };
      }
      _getOverlayPosition() {
        let e = !this._dir || this._dir.value == 'ltr',
          t = this.position,
          n;
        t == 'above'
          ? (n = { overlayX: 'center', overlayY: 'bottom' })
          : t == 'below'
            ? (n = { overlayX: 'center', overlayY: 'top' })
            : t == 'before' || (t == 'left' && e) || (t == 'right' && !e)
              ? (n = { overlayX: 'end', overlayY: 'center' })
              : (t == 'after' || (t == 'right' && e) || (t == 'left' && !e)) &&
                (n = { overlayX: 'start', overlayY: 'center' });
        let { x: r, y: s } = this._invertPosition(n.overlayX, n.overlayY);
        return { main: n, fallback: { overlayX: r, overlayY: s } };
      }
      _updateTooltipMessage() {
        this._tooltipInstance &&
          ((this._tooltipInstance.message = this.message),
          this._tooltipInstance._markForCheck(),
          Me(
            () => {
              this._tooltipInstance && this._overlayRef.updatePosition();
            },
            { injector: this._injector },
          ));
      }
      _setTooltipClass(e) {
        this._tooltipInstance &&
          ((this._tooltipInstance.tooltipClass = e), this._tooltipInstance._markForCheck());
      }
      _invertPosition(e, t) {
        return (
          this.position === 'above' || this.position === 'below'
            ? t === 'top'
              ? (t = 'bottom')
              : t === 'bottom' && (t = 'top')
            : e === 'end'
              ? (e = 'start')
              : e === 'start' && (e = 'end'),
          { x: e, y: t }
        );
      }
      _updateCurrentPositionClass(e) {
        let { overlayY: t, originX: n, originY: r } = e,
          s;
        if (
          (t === 'center'
            ? this._dir && this._dir.value === 'rtl'
              ? (s = n === 'end' ? 'left' : 'right')
              : (s = n === 'start' ? 'left' : 'right')
            : (s = t === 'bottom' && r === 'top' ? 'above' : 'below'),
          s !== this._currentPosition)
        ) {
          let l = this._overlayRef;
          if (l) {
            let d = `${this._cssClassPrefix}-${Tn}-`;
            (l.removePanelClass(d + this._currentPosition), l.addPanelClass(d + s));
          }
          this._currentPosition = s;
        }
      }
      _setupPointerEnterEventsIfNeeded() {
        this._disabled ||
          !this.message ||
          !this._viewInitialized ||
          this._passiveListeners.length ||
          (this._platformSupportsMouseEvents()
            ? this._passiveListeners.push([
                'mouseenter',
                (e) => {
                  this._setupPointerExitEventsIfNeeded();
                  let t;
                  (e.x !== void 0 && e.y !== void 0 && (t = e), this.show(void 0, t));
                },
              ])
            : this.touchGestures !== 'off' &&
              (this._disableNativeGesturesIfNecessary(),
              this._passiveListeners.push([
                'touchstart',
                (e) => {
                  let t = e.targetTouches?.[0],
                    n = t ? { x: t.clientX, y: t.clientY } : void 0;
                  (this._setupPointerExitEventsIfNeeded(),
                    this._touchstartTimeout && clearTimeout(this._touchstartTimeout));
                  let r = 500;
                  this._touchstartTimeout = setTimeout(() => {
                    ((this._touchstartTimeout = null), this.show(void 0, n));
                  }, this._defaultOptions?.touchLongPressShowDelay ?? r);
                },
              ])),
          this._addListeners(this._passiveListeners));
      }
      _setupPointerExitEventsIfNeeded() {
        if (this._pointerExitEventsInitialized) return;
        this._pointerExitEventsInitialized = !0;
        let e = [];
        if (this._platformSupportsMouseEvents())
          e.push(
            [
              'mouseleave',
              (t) => {
                let n = t.relatedTarget;
                (!n || !this._overlayRef?.overlayElement.contains(n)) && this.hide();
              },
            ],
            ['wheel', (t) => this._wheelListener(t)],
          );
        else if (this.touchGestures !== 'off') {
          this._disableNativeGesturesIfNecessary();
          let t = () => {
            (this._touchstartTimeout && clearTimeout(this._touchstartTimeout),
              this.hide(this._defaultOptions?.touchendHideDelay));
          };
          e.push(['touchend', t], ['touchcancel', t]);
        }
        (this._addListeners(e), this._passiveListeners.push(...e));
      }
      _addListeners(e) {
        e.forEach(([t, n]) => {
          this._elementRef.nativeElement.addEventListener(t, n, Nn);
        });
      }
      _platformSupportsMouseEvents() {
        return !this._platform.IOS && !this._platform.ANDROID;
      }
      _wheelListener(e) {
        if (this._isTooltipVisible()) {
          let t = this._injector.get(pe).elementFromPoint(e.clientX, e.clientY),
            n = this._elementRef.nativeElement;
          t !== n && !n.contains(t) && this.hide();
        }
      }
      _disableNativeGesturesIfNecessary() {
        let e = this.touchGestures;
        if (e !== 'off') {
          let t = this._elementRef.nativeElement,
            n = t.style;
          ((e === 'on' || (t.nodeName !== 'INPUT' && t.nodeName !== 'TEXTAREA')) &&
            (n.userSelect = n.msUserSelect = n.webkitUserSelect = n.MozUserSelect = 'none'),
            (e === 'on' || !t.draggable) && (n.webkitUserDrag = 'none'),
            (n.touchAction = 'none'),
            (n.webkitTapHighlightColor = 'transparent'));
        }
      }
      _syncAriaDescription(e) {
        this._ariaDescriptionPending ||
          ((this._ariaDescriptionPending = !0),
          this._ariaDescriber.removeDescription(this._elementRef.nativeElement, e, 'tooltip'),
          this._isDestroyed ||
            Me(
              {
                write: () => {
                  ((this._ariaDescriptionPending = !1),
                    this.message &&
                      !this.disabled &&
                      this._ariaDescriber.describe(
                        this._elementRef.nativeElement,
                        this.message,
                        'tooltip',
                      ));
                },
              },
              { injector: this._injector },
            ));
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [['', 'matTooltip', '']],
        hostAttrs: [1, 'mat-mdc-tooltip-trigger'],
        hostVars: 2,
        hostBindings: function (t, n) {
          t & 2 && w('mat-mdc-tooltip-disabled', n.disabled);
        },
        inputs: {
          position: [0, 'matTooltipPosition', 'position'],
          positionAtOrigin: [0, 'matTooltipPositionAtOrigin', 'positionAtOrigin'],
          disabled: [0, 'matTooltipDisabled', 'disabled'],
          showDelay: [0, 'matTooltipShowDelay', 'showDelay'],
          hideDelay: [0, 'matTooltipHideDelay', 'hideDelay'],
          touchGestures: [0, 'matTooltipTouchGestures', 'touchGestures'],
          message: [0, 'matTooltip', 'message'],
          tooltipClass: [0, 'matTooltipClass', 'tooltipClass'],
        },
        exportAs: ['matTooltip'],
      });
    }
    return o;
  })(),
  Ln = (() => {
    class o {
      _changeDetectorRef = a(he);
      _elementRef = a(C);
      _isMultiline = !1;
      message;
      tooltipClass;
      _showTimeoutId;
      _hideTimeoutId;
      _triggerElement;
      _mouseLeaveHideDelay;
      _animationsDisabled = be();
      _tooltip;
      _closeOnInteraction = !1;
      _isVisible = !1;
      _onHide = new x();
      _showAnimation = 'mat-mdc-tooltip-show';
      _hideAnimation = 'mat-mdc-tooltip-hide';
      constructor() {}
      show(e) {
        (this._hideTimeoutId != null && clearTimeout(this._hideTimeoutId),
          (this._showTimeoutId = setTimeout(() => {
            (this._toggleVisibility(!0), (this._showTimeoutId = void 0));
          }, e)));
      }
      hide(e) {
        (this._showTimeoutId != null && clearTimeout(this._showTimeoutId),
          (this._hideTimeoutId = setTimeout(() => {
            (this._toggleVisibility(!1), (this._hideTimeoutId = void 0));
          }, e)));
      }
      afterHidden() {
        return this._onHide;
      }
      isVisible() {
        return this._isVisible;
      }
      ngOnDestroy() {
        (this._cancelPendingAnimations(), this._onHide.complete(), (this._triggerElement = null));
      }
      _handleBodyInteraction() {
        this._closeOnInteraction && this.hide(0);
      }
      _markForCheck() {
        this._changeDetectorRef.markForCheck();
      }
      _handleMouseLeave({ relatedTarget: e }) {
        (!e || !this._triggerElement.contains(e)) &&
          (this.isVisible() ? this.hide(this._mouseLeaveHideDelay) : this._finalizeAnimation(!1));
      }
      _onShow() {
        ((this._isMultiline = this._isTooltipMultiline()), this._markForCheck());
      }
      _isTooltipMultiline() {
        let e = this._elementRef.nativeElement.getBoundingClientRect();
        return e.height > rs && e.width >= ss;
      }
      _handleAnimationEnd({ animationName: e }) {
        (e === this._showAnimation || e === this._hideAnimation) &&
          this._finalizeAnimation(e === this._showAnimation);
      }
      _cancelPendingAnimations() {
        (this._showTimeoutId != null && clearTimeout(this._showTimeoutId),
          this._hideTimeoutId != null && clearTimeout(this._hideTimeoutId),
          (this._showTimeoutId = this._hideTimeoutId = void 0));
      }
      _finalizeAnimation(e) {
        e ? (this._closeOnInteraction = !0) : this.isVisible() || this._onHide.next();
      }
      _toggleVisibility(e) {
        let t = this._tooltip.nativeElement,
          n = this._showAnimation,
          r = this._hideAnimation;
        if (
          (t.classList.remove(e ? r : n),
          t.classList.add(e ? n : r),
          this._isVisible !== e && ((this._isVisible = e), this._changeDetectorRef.markForCheck()),
          e && !this._animationsDisabled && typeof getComputedStyle == 'function')
        ) {
          let s = getComputedStyle(t);
          (s.getPropertyValue('animation-duration') === '0s' ||
            s.getPropertyValue('animation-name') === 'none') &&
            (this._animationsDisabled = !0);
        }
        (e && this._onShow(),
          this._animationsDisabled &&
            (t.classList.add('_mat-animation-noopable'), this._finalizeAnimation(e)));
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['mat-tooltip-component']],
        viewQuery: function (t, n) {
          if ((t & 1 && ae(Jr, 7), t & 2)) {
            let r;
            y((r = b())) && (n._tooltip = r.first);
          }
        },
        hostAttrs: ['aria-hidden', 'true'],
        hostBindings: function (t, n) {
          t & 1 &&
            I('mouseleave', function (s) {
              return n._handleMouseLeave(s);
            });
        },
        decls: 4,
        vars: 4,
        consts: [
          ['tooltip', ''],
          [1, 'mdc-tooltip', 'mat-mdc-tooltip', 3, 'animationend', 'ngClass'],
          [1, 'mat-mdc-tooltip-surface', 'mdc-tooltip__surface'],
        ],
        template: function (t, n) {
          if (t & 1) {
            let r = ke();
            (p(0, 'div', 1, 0),
              I('animationend', function (l) {
                return (le(r), de(n._handleAnimationEnd(l)));
              }),
              p(2, 'div', 2),
              ge(3),
              v()());
          }
          t & 2 &&
            (w('mdc-tooltip--multiline', n._isMultiline),
            T('ngClass', n.tooltipClass),
            m(3),
            Fe(n.message));
        },
        dependencies: [Ot],
        styles: [
          `.mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })();
var _d = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({ imports: [xo, vt, W, tt] });
  }
  return o;
})();
var ls = ['notch'],
  ds = ['matFormFieldNotchedOutline', ''],
  cs = ['*'],
  Bn = ['iconPrefixContainer'],
  Hn = ['textPrefixContainer'],
  zn = ['iconSuffixContainer'],
  jn = ['textSuffixContainer'],
  hs = ['textField'],
  us = [
    '*',
    [['mat-label']],
    [
      ['', 'matPrefix', ''],
      ['', 'matIconPrefix', ''],
    ],
    [['', 'matTextPrefix', '']],
    [['', 'matTextSuffix', '']],
    [
      ['', 'matSuffix', ''],
      ['', 'matIconSuffix', ''],
    ],
    [['mat-error'], ['', 'matError', '']],
    [['mat-hint', 3, 'align', 'end']],
    [['mat-hint', 'align', 'end']],
  ],
  ms = [
    '*',
    'mat-label',
    '[matPrefix], [matIconPrefix]',
    '[matTextPrefix]',
    '[matTextSuffix]',
    '[matSuffix], [matIconSuffix]',
    'mat-error, [matError]',
    "mat-hint:not([align='end'])",
    "mat-hint[align='end']",
  ];
function fs(o, i) {
  o & 1 && Z(0, 'span', 21);
}
function ps(o, i) {
  if ((o & 1 && (p(0, 'label', 20), H(1, 1), F(2, fs, 1, 0, 'span', 21), v()), o & 2)) {
    let e = P(2);
    (T('floating', e._shouldLabelFloat())('monitorResize', e._hasOutline())('id', e._labelId),
      A('for', e._control.disableAutomaticLabeling ? null : e._control.id),
      m(2),
      V(!e.hideRequiredMarker && e._control.required ? 2 : -1));
  }
}
function _s(o, i) {
  if ((o & 1 && F(0, ps, 3, 5, 'label', 20), o & 2)) {
    let e = P();
    V(e._hasFloatingLabel() ? 0 : -1);
  }
}
function gs(o, i) {
  o & 1 && Z(0, 'div', 7);
}
function vs(o, i) {}
function ys(o, i) {
  if ((o & 1 && xe(0, vs, 0, 0, 'ng-template', 13), o & 2)) {
    P(2);
    let e = Ae(1);
    T('ngTemplateOutlet', e);
  }
}
function bs(o, i) {
  if ((o & 1 && (p(0, 'div', 9), F(1, ys, 1, 1, null, 13), v()), o & 2)) {
    let e = P();
    (T('matFormFieldNotchedOutlineOpen', e._shouldLabelFloat()),
      m(),
      V(e._forceDisplayInfixLabel() ? -1 : 1));
  }
}
function xs(o, i) {
  o & 1 && (p(0, 'div', 10, 2), H(2, 2), v());
}
function Cs(o, i) {
  o & 1 && (p(0, 'div', 11, 3), H(2, 3), v());
}
function ws(o, i) {}
function Ss(o, i) {
  if ((o & 1 && xe(0, ws, 0, 0, 'ng-template', 13), o & 2)) {
    P();
    let e = Ae(1);
    T('ngTemplateOutlet', e);
  }
}
function Ds(o, i) {
  o & 1 && (p(0, 'div', 14, 4), H(2, 4), v());
}
function Ms(o, i) {
  o & 1 && (p(0, 'div', 15, 5), H(2, 5), v());
}
function ks(o, i) {
  o & 1 && Z(0, 'div', 16);
}
function Es(o, i) {
  o & 1 && (p(0, 'div', 18), H(1, 6), v());
}
function Os(o, i) {
  if ((o & 1 && (p(0, 'mat-hint', 22), ge(1), v()), o & 2)) {
    let e = P(2);
    (T('id', e._hintLabelId), m(), Fe(e.hintLabel));
  }
}
function As(o, i) {
  if (
    (o & 1 &&
      (p(0, 'div', 19), F(1, Os, 2, 2, 'mat-hint', 22), H(2, 7), Z(3, 'div', 23), H(4, 8), v()),
    o & 2)
  ) {
    let e = P();
    (m(), V(e.hintLabel ? 1 : -1));
  }
}
var ti = (() => {
    class o {
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({ type: o, selectors: [['mat-label']] });
    }
    return o;
  })(),
  Bi = new g('MatError'),
  $n = (() => {
    class o {
      id = a(re).getId('mat-mdc-error-');
      constructor() {}
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [['mat-error'], ['', 'matError', '']],
        hostAttrs: [1, 'mat-mdc-form-field-error', 'mat-mdc-form-field-bottom-align'],
        hostVars: 1,
        hostBindings: function (t, n) {
          t & 2 && Ee('id', n.id);
        },
        inputs: { id: 'id' },
        features: [D([{ provide: Bi, useExisting: o }])],
      });
    }
    return o;
  })(),
  ii = (() => {
    class o {
      align = 'start';
      id = a(re).getId('mat-mdc-hint-');
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [['mat-hint']],
        hostAttrs: [1, 'mat-mdc-form-field-hint', 'mat-mdc-form-field-bottom-align'],
        hostVars: 4,
        hostBindings: function (t, n) {
          t & 2 &&
            (Ee('id', n.id), A('align', null), w('mat-mdc-form-field-hint-end', n.align === 'end'));
        },
        inputs: { align: 'align', id: 'id' },
      });
    }
    return o;
  })(),
  Hi = new g('MatPrefix'),
  Zn = (() => {
    class o {
      set _isTextSelector(e) {
        this._isText = !0;
      }
      _isText = !1;
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['', 'matPrefix', ''],
          ['', 'matIconPrefix', ''],
          ['', 'matTextPrefix', ''],
        ],
        inputs: { _isTextSelector: [0, 'matTextPrefix', '_isTextSelector'] },
        features: [D([{ provide: Hi, useExisting: o }])],
      });
    }
    return o;
  })(),
  zi = new g('MatSuffix'),
  Qn = (() => {
    class o {
      set _isTextSelector(e) {
        this._isText = !0;
      }
      _isText = !1;
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['', 'matSuffix', ''],
          ['', 'matIconSuffix', ''],
          ['', 'matTextSuffix', ''],
        ],
        inputs: { _isTextSelector: [0, 'matTextSuffix', '_isTextSelector'] },
        features: [D([{ provide: zi, useExisting: o }])],
      });
    }
    return o;
  })(),
  Kn = new g('FloatingLabelParent'),
  Wn = (() => {
    class o {
      _elementRef = a(C);
      get floating() {
        return this._floating;
      }
      set floating(e) {
        ((this._floating = e), this.monitorResize && this._handleResize());
      }
      _floating = !1;
      get monitorResize() {
        return this._monitorResize;
      }
      set monitorResize(e) {
        ((this._monitorResize = e),
          this._monitorResize ? this._subscribeToResize() : this._resizeSubscription.unsubscribe());
      }
      _monitorResize = !1;
      _resizeObserver = a(Ao);
      _ngZone = a(N);
      _parent = a(Kn);
      _resizeSubscription = new fe();
      constructor() {}
      ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
      }
      getWidth() {
        return Fs(this._elementRef.nativeElement);
      }
      get element() {
        return this._elementRef.nativeElement;
      }
      _handleResize() {
        setTimeout(() => this._parent._handleLabelResized());
      }
      _subscribeToResize() {
        (this._resizeSubscription.unsubscribe(),
          this._ngZone.runOutsideAngular(() => {
            this._resizeSubscription = this._resizeObserver
              .observe(this._elementRef.nativeElement, { box: 'border-box' })
              .subscribe(() => this._handleResize());
          }));
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [['label', 'matFormFieldFloatingLabel', '']],
        hostAttrs: [1, 'mdc-floating-label', 'mat-mdc-floating-label'],
        hostVars: 2,
        hostBindings: function (t, n) {
          t & 2 && w('mdc-floating-label--float-above', n.floating);
        },
        inputs: { floating: 'floating', monitorResize: 'monitorResize' },
      });
    }
    return o;
  })();
function Fs(o) {
  let i = o;
  if (i.offsetParent !== null) return i.scrollWidth;
  let e = i.cloneNode(!0);
  (e.style.setProperty('position', 'absolute'),
    e.style.setProperty('transform', 'translate(-9999px, -9999px)'),
    document.documentElement.appendChild(e));
  let t = e.scrollWidth;
  return (e.remove(), t);
}
var Gn = 'mdc-line-ripple--active',
  ei = 'mdc-line-ripple--deactivating',
  Yn = (() => {
    class o {
      _elementRef = a(C);
      _cleanupTransitionEnd;
      constructor() {
        let e = a(N),
          t = a(oe);
        e.runOutsideAngular(() => {
          this._cleanupTransitionEnd = t.listen(
            this._elementRef.nativeElement,
            'transitionend',
            this._handleTransitionEnd,
          );
        });
      }
      activate() {
        let e = this._elementRef.nativeElement.classList;
        (e.remove(ei), e.add(Gn));
      }
      deactivate() {
        this._elementRef.nativeElement.classList.add(ei);
      }
      _handleTransitionEnd = (e) => {
        let t = this._elementRef.nativeElement.classList,
          n = t.contains(ei);
        e.propertyName === 'opacity' && n && t.remove(Gn, ei);
      };
      ngOnDestroy() {
        this._cleanupTransitionEnd();
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [['div', 'matFormFieldLineRipple', '']],
        hostAttrs: [1, 'mdc-line-ripple'],
      });
    }
    return o;
  })(),
  Un = (() => {
    class o {
      _elementRef = a(C);
      _ngZone = a(N);
      open = !1;
      _notch;
      ngAfterViewInit() {
        let e = this._elementRef.nativeElement,
          t = e.querySelector('.mdc-floating-label');
        t
          ? (e.classList.add('mdc-notched-outline--upgraded'),
            typeof requestAnimationFrame == 'function' &&
              ((t.style.transitionDuration = '0s'),
              this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => (t.style.transitionDuration = ''));
              })))
          : e.classList.add('mdc-notched-outline--no-label');
      }
      _setNotchWidth(e) {
        let t = this._notch.nativeElement;
        !this.open || !e
          ? (t.style.width = '')
          : (t.style.width = `calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`);
      }
      _setMaxWidth(e) {
        this._notch.nativeElement.style.setProperty(
          '--mat-form-field-notch-max-width',
          `calc(100% - ${e}px)`,
        );
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['div', 'matFormFieldNotchedOutline', '']],
        viewQuery: function (t, n) {
          if ((t & 1 && ae(ls, 5), t & 2)) {
            let r;
            y((r = b())) && (n._notch = r.first);
          }
        },
        hostAttrs: [1, 'mdc-notched-outline'],
        hostVars: 2,
        hostBindings: function (t, n) {
          t & 2 && w('mdc-notched-outline--notched', n.open);
        },
        inputs: { open: [0, 'matFormFieldNotchedOutlineOpen', 'open'] },
        attrs: ds,
        ngContentSelectors: cs,
        decls: 5,
        vars: 0,
        consts: [
          ['notch', ''],
          [1, 'mat-mdc-notch-piece', 'mdc-notched-outline__leading'],
          [1, 'mat-mdc-notch-piece', 'mdc-notched-outline__notch'],
          [1, 'mat-mdc-notch-piece', 'mdc-notched-outline__trailing'],
        ],
        template: function (t, n) {
          t & 1 && (Oe(), hi(0, 'div', 1), di(1, 'div', 2, 0), H(3), ci(), hi(4, 'div', 3));
        },
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })(),
  qe = (() => {
    class o {
      value;
      stateChanges;
      id;
      placeholder;
      ngControl;
      focused;
      empty;
      shouldLabelFloat;
      required;
      disabled;
      errorState;
      controlType;
      autofilled;
      userAriaDescribedBy;
      disableAutomaticLabeling;
      describedByIds;
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({ type: o });
    }
    return o;
  })();
var $e = new g('MatFormField'),
  Jn = new g('MAT_FORM_FIELD_DEFAULT_OPTIONS'),
  Xn = 'fill',
  Vs = 'auto',
  qn = 'fixed',
  Rs = 'translateY(-50%)',
  ji = (() => {
    class o {
      _elementRef = a(C);
      _changeDetectorRef = a(he);
      _platform = a(ne);
      _idGenerator = a(re);
      _ngZone = a(N);
      _defaults = a(Jn, { optional: !0 });
      _currentDirection;
      _textField;
      _iconPrefixContainer;
      _textPrefixContainer;
      _iconSuffixContainer;
      _textSuffixContainer;
      _floatingLabel;
      _notchedOutline;
      _lineRipple;
      _iconPrefixContainerSignal = Je('iconPrefixContainer');
      _textPrefixContainerSignal = Je('textPrefixContainer');
      _iconSuffixContainerSignal = Je('iconSuffixContainer');
      _textSuffixContainerSignal = Je('textSuffixContainer');
      _prefixSuffixContainers = ce(() =>
        [
          this._iconPrefixContainerSignal(),
          this._textPrefixContainerSignal(),
          this._iconSuffixContainerSignal(),
          this._textSuffixContainerSignal(),
        ]
          .map((e) => e?.nativeElement)
          .filter((e) => e !== void 0),
      );
      _formFieldControl;
      _prefixChildren;
      _suffixChildren;
      _errorChildren;
      _hintChildren;
      _labelChild = mo(ti);
      get hideRequiredMarker() {
        return this._hideRequiredMarker;
      }
      set hideRequiredMarker(e) {
        this._hideRequiredMarker = ye(e);
      }
      _hideRequiredMarker = !1;
      color = 'primary';
      get floatLabel() {
        return this._floatLabel || this._defaults?.floatLabel || Vs;
      }
      set floatLabel(e) {
        e !== this._floatLabel && ((this._floatLabel = e), this._changeDetectorRef.markForCheck());
      }
      _floatLabel;
      get appearance() {
        return this._appearanceSignal();
      }
      set appearance(e) {
        let t = e || this._defaults?.appearance || Xn;
        this._appearanceSignal.set(t);
      }
      _appearanceSignal = te(Xn);
      get subscriptSizing() {
        return this._subscriptSizing || this._defaults?.subscriptSizing || qn;
      }
      set subscriptSizing(e) {
        this._subscriptSizing = e || this._defaults?.subscriptSizing || qn;
      }
      _subscriptSizing = null;
      get hintLabel() {
        return this._hintLabel;
      }
      set hintLabel(e) {
        ((this._hintLabel = e), this._processHints());
      }
      _hintLabel = '';
      _hasIconPrefix = !1;
      _hasTextPrefix = !1;
      _hasIconSuffix = !1;
      _hasTextSuffix = !1;
      _labelId = this._idGenerator.getId('mat-mdc-form-field-label-');
      _hintLabelId = this._idGenerator.getId('mat-mdc-hint-');
      _describedByIds;
      get _control() {
        return this._explicitFormFieldControl || this._formFieldControl;
      }
      set _control(e) {
        this._explicitFormFieldControl = e;
      }
      _destroyed = new x();
      _isFocused = null;
      _explicitFormFieldControl;
      _previousControl = null;
      _previousControlValidatorFn = null;
      _stateChanges;
      _valueChanges;
      _describedByChanges;
      _outlineLabelOffsetResizeObserver = null;
      _animationsDisabled = be();
      constructor() {
        let e = this._defaults,
          t = a(ve);
        (e &&
          (e.appearance && (this.appearance = e.appearance),
          (this._hideRequiredMarker = !!e?.hideRequiredMarker),
          e.color && (this.color = e.color)),
          xt(() => (this._currentDirection = t.valueSignal())),
          this._syncOutlineLabelOffset());
      }
      ngAfterViewInit() {
        (this._updateFocusState(),
          this._animationsDisabled ||
            this._ngZone.runOutsideAngular(() => {
              setTimeout(() => {
                this._elementRef.nativeElement.classList.add('mat-form-field-animations-enabled');
              }, 300);
            }),
          this._changeDetectorRef.detectChanges());
      }
      ngAfterContentInit() {
        (this._assertFormFieldControl(),
          this._initializeSubscript(),
          this._initializePrefixAndSuffix());
      }
      ngAfterContentChecked() {
        (this._assertFormFieldControl(),
          this._control !== this._previousControl &&
            (this._initializeControl(this._previousControl),
            this._control.ngControl &&
              this._control.ngControl.control &&
              (this._previousControlValidatorFn = this._control.ngControl.control.validator),
            (this._previousControl = this._control)),
          this._control.ngControl &&
            this._control.ngControl.control &&
            this._control.ngControl.control.validator !== this._previousControlValidatorFn &&
            this._changeDetectorRef.markForCheck());
      }
      ngOnDestroy() {
        (this._outlineLabelOffsetResizeObserver?.disconnect(),
          this._stateChanges?.unsubscribe(),
          this._valueChanges?.unsubscribe(),
          this._describedByChanges?.unsubscribe(),
          this._destroyed.next(),
          this._destroyed.complete());
      }
      getLabelId = ce(() => (this._hasFloatingLabel() ? this._labelId : null));
      getConnectedOverlayOrigin() {
        return this._textField || this._elementRef;
      }
      _animateAndLockLabel() {
        this._hasFloatingLabel() && (this.floatLabel = 'always');
      }
      _initializeControl(e) {
        let t = this._control,
          n = 'mat-mdc-form-field-type-';
        (e && this._elementRef.nativeElement.classList.remove(n + e.controlType),
          t.controlType && this._elementRef.nativeElement.classList.add(n + t.controlType),
          this._stateChanges?.unsubscribe(),
          (this._stateChanges = t.stateChanges.subscribe(() => {
            (this._updateFocusState(), this._changeDetectorRef.markForCheck());
          })),
          this._describedByChanges?.unsubscribe(),
          (this._describedByChanges = t.stateChanges
            .pipe(
              Qe([void 0, void 0]),
              Se(() => [t.errorState, t.userAriaDescribedBy]),
              eo(),
              De(([[r, s], [l, d]]) => r !== l || s !== d),
            )
            .subscribe(() => this._syncDescribedByIds())),
          this._valueChanges?.unsubscribe(),
          t.ngControl &&
            t.ngControl.valueChanges &&
            (this._valueChanges = t.ngControl.valueChanges
              .pipe(z(this._destroyed))
              .subscribe(() => this._changeDetectorRef.markForCheck())));
      }
      _checkPrefixAndSuffixTypes() {
        ((this._hasIconPrefix = !!this._prefixChildren.find((e) => !e._isText)),
          (this._hasTextPrefix = !!this._prefixChildren.find((e) => e._isText)),
          (this._hasIconSuffix = !!this._suffixChildren.find((e) => !e._isText)),
          (this._hasTextSuffix = !!this._suffixChildren.find((e) => e._isText)));
      }
      _initializePrefixAndSuffix() {
        (this._checkPrefixAndSuffixTypes(),
          Ne(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
            (this._checkPrefixAndSuffixTypes(), this._changeDetectorRef.markForCheck());
          }));
      }
      _initializeSubscript() {
        (this._hintChildren.changes.subscribe(() => {
          (this._processHints(), this._changeDetectorRef.markForCheck());
        }),
          this._errorChildren.changes.subscribe(() => {
            (this._syncDescribedByIds(), this._changeDetectorRef.markForCheck());
          }),
          this._validateHints(),
          this._syncDescribedByIds());
      }
      _assertFormFieldControl() {
        this._control;
      }
      _updateFocusState() {
        let e = this._control.focused;
        (e && !this._isFocused
          ? ((this._isFocused = !0), this._lineRipple?.activate())
          : !e &&
            (this._isFocused || this._isFocused === null) &&
            ((this._isFocused = !1), this._lineRipple?.deactivate()),
          this._elementRef.nativeElement.classList.toggle('mat-focused', e),
          this._textField?.nativeElement.classList.toggle('mdc-text-field--focused', e));
      }
      _syncOutlineLabelOffset() {
        fo({
          earlyRead: () => {
            if (this._appearanceSignal() !== 'outline')
              return (this._outlineLabelOffsetResizeObserver?.disconnect(), null);
            if (globalThis.ResizeObserver) {
              this._outlineLabelOffsetResizeObserver ||= new globalThis.ResizeObserver(() => {
                this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());
              });
              for (let e of this._prefixSuffixContainers())
                this._outlineLabelOffsetResizeObserver.observe(e, { box: 'border-box' });
            }
            return this._getOutlinedLabelOffset();
          },
          write: (e) => this._writeOutlinedLabelStyles(e()),
        });
      }
      _shouldAlwaysFloat() {
        return this.floatLabel === 'always';
      }
      _hasOutline() {
        return this.appearance === 'outline';
      }
      _forceDisplayInfixLabel() {
        return (
          !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat()
        );
      }
      _hasFloatingLabel = ce(() => !!this._labelChild());
      _shouldLabelFloat() {
        return this._hasFloatingLabel()
          ? this._control.shouldLabelFloat || this._shouldAlwaysFloat()
          : !1;
      }
      _shouldForward(e) {
        let t = this._control ? this._control.ngControl : null;
        return t && t[e];
      }
      _getSubscriptMessageType() {
        return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState
          ? 'error'
          : 'hint';
      }
      _handleLabelResized() {
        this._refreshOutlineNotchWidth();
      }
      _refreshOutlineNotchWidth() {
        !this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()
          ? this._notchedOutline?._setNotchWidth(0)
          : this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());
      }
      _processHints() {
        (this._validateHints(), this._syncDescribedByIds());
      }
      _validateHints() {
        this._hintChildren;
      }
      _syncDescribedByIds() {
        if (this._control) {
          let e = [];
          if (
            (this._control.userAriaDescribedBy &&
              typeof this._control.userAriaDescribedBy == 'string' &&
              e.push(...this._control.userAriaDescribedBy.split(' ')),
            this._getSubscriptMessageType() === 'hint')
          ) {
            let r = this._hintChildren ? this._hintChildren.find((l) => l.align === 'start') : null,
              s = this._hintChildren ? this._hintChildren.find((l) => l.align === 'end') : null;
            (r ? e.push(r.id) : this._hintLabel && e.push(this._hintLabelId), s && e.push(s.id));
          } else this._errorChildren && e.push(...this._errorChildren.map((r) => r.id));
          let t = this._control.describedByIds,
            n;
          if (t) {
            let r = this._describedByIds || e;
            n = e.concat(t.filter((s) => s && !r.includes(s)));
          } else n = e;
          (this._control.setDescribedByIds(n), (this._describedByIds = e));
        }
      }
      _getOutlinedLabelOffset() {
        if (!this._hasOutline() || !this._floatingLabel) return null;
        if (!this._iconPrefixContainer && !this._textPrefixContainer) return ['', null];
        if (!this._isAttachedToDom()) return null;
        let e = this._iconPrefixContainer?.nativeElement,
          t = this._textPrefixContainer?.nativeElement,
          n = this._iconSuffixContainer?.nativeElement,
          r = this._textSuffixContainer?.nativeElement,
          s = e?.getBoundingClientRect().width ?? 0,
          l = t?.getBoundingClientRect().width ?? 0,
          d = n?.getBoundingClientRect().width ?? 0,
          h = r?.getBoundingClientRect().width ?? 0,
          c = this._currentDirection === 'rtl' ? '-1' : '1',
          _ = `${s + l}px`,
          q = `calc(${c} * (${_} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,
          Y = `var(--mat-mdc-form-field-label-transform, ${Rs} translateX(${q}))`,
          J = s + l + d + h;
        return [Y, J];
      }
      _writeOutlinedLabelStyles(e) {
        if (e !== null) {
          let [t, n] = e;
          (this._floatingLabel && (this._floatingLabel.element.style.transform = t),
            n !== null && this._notchedOutline?._setMaxWidth(n));
        }
      }
      _isAttachedToDom() {
        let e = this._elementRef.nativeElement;
        if (e.getRootNode) {
          let t = e.getRootNode();
          return t && t !== e;
        }
        return document.documentElement.contains(e);
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['mat-form-field']],
        contentQueries: function (t, n, r) {
          if (
            (t & 1 &&
              (ao(r, n._labelChild, ti, 5), Dt(r, qe, 5)(r, Hi, 5)(r, zi, 5)(r, Bi, 5)(r, ii, 5)),
            t & 2)
          ) {
            ui();
            let s;
            (y((s = b())) && (n._formFieldControl = s.first),
              y((s = b())) && (n._prefixChildren = s),
              y((s = b())) && (n._suffixChildren = s),
              y((s = b())) && (n._errorChildren = s),
              y((s = b())) && (n._hintChildren = s));
          }
        },
        viewQuery: function (t, n) {
          if (
            (t & 1 &&
              (lo(n._iconPrefixContainerSignal, Bn, 5)(n._textPrefixContainerSignal, Hn, 5)(
                n._iconSuffixContainerSignal,
                zn,
                5,
              )(n._textSuffixContainerSignal, jn, 5),
              ae(hs, 5)(Bn, 5)(Hn, 5)(zn, 5)(jn, 5)(Wn, 5)(Un, 5)(Yn, 5)),
            t & 2)
          ) {
            ui(4);
            let r;
            (y((r = b())) && (n._textField = r.first),
              y((r = b())) && (n._iconPrefixContainer = r.first),
              y((r = b())) && (n._textPrefixContainer = r.first),
              y((r = b())) && (n._iconSuffixContainer = r.first),
              y((r = b())) && (n._textSuffixContainer = r.first),
              y((r = b())) && (n._floatingLabel = r.first),
              y((r = b())) && (n._notchedOutline = r.first),
              y((r = b())) && (n._lineRipple = r.first));
          }
        },
        hostAttrs: [1, 'mat-mdc-form-field'],
        hostVars: 38,
        hostBindings: function (t, n) {
          t & 2 &&
            w('mat-mdc-form-field-label-always-float', n._shouldAlwaysFloat())(
              'mat-mdc-form-field-has-icon-prefix',
              n._hasIconPrefix,
            )('mat-mdc-form-field-has-icon-suffix', n._hasIconSuffix)(
              'mat-form-field-invalid',
              n._control.errorState,
            )('mat-form-field-disabled', n._control.disabled)(
              'mat-form-field-autofilled',
              n._control.autofilled,
            )('mat-form-field-appearance-fill', n.appearance == 'fill')(
              'mat-form-field-appearance-outline',
              n.appearance == 'outline',
            )('mat-form-field-hide-placeholder', n._hasFloatingLabel() && !n._shouldLabelFloat())(
              'mat-primary',
              n.color !== 'accent' && n.color !== 'warn',
            )('mat-accent', n.color === 'accent')('mat-warn', n.color === 'warn')(
              'ng-untouched',
              n._shouldForward('untouched'),
            )('ng-touched', n._shouldForward('touched'))(
              'ng-pristine',
              n._shouldForward('pristine'),
            )('ng-dirty', n._shouldForward('dirty'))('ng-valid', n._shouldForward('valid'))(
              'ng-invalid',
              n._shouldForward('invalid'),
            )('ng-pending', n._shouldForward('pending'));
        },
        inputs: {
          hideRequiredMarker: 'hideRequiredMarker',
          color: 'color',
          floatLabel: 'floatLabel',
          appearance: 'appearance',
          subscriptSizing: 'subscriptSizing',
          hintLabel: 'hintLabel',
        },
        exportAs: ['matFormField'],
        features: [
          D([
            { provide: $e, useExisting: o },
            { provide: Kn, useExisting: o },
          ]),
        ],
        ngContentSelectors: ms,
        decls: 18,
        vars: 21,
        consts: [
          ['labelTemplate', ''],
          ['textField', ''],
          ['iconPrefixContainer', ''],
          ['textPrefixContainer', ''],
          ['textSuffixContainer', ''],
          ['iconSuffixContainer', ''],
          [1, 'mat-mdc-text-field-wrapper', 'mdc-text-field', 3, 'click'],
          [1, 'mat-mdc-form-field-focus-overlay'],
          [1, 'mat-mdc-form-field-flex'],
          ['matFormFieldNotchedOutline', '', 3, 'matFormFieldNotchedOutlineOpen'],
          [1, 'mat-mdc-form-field-icon-prefix'],
          [1, 'mat-mdc-form-field-text-prefix'],
          [1, 'mat-mdc-form-field-infix'],
          [3, 'ngTemplateOutlet'],
          [1, 'mat-mdc-form-field-text-suffix'],
          [1, 'mat-mdc-form-field-icon-suffix'],
          ['matFormFieldLineRipple', ''],
          [
            'aria-atomic',
            'true',
            'aria-live',
            'polite',
            1,
            'mat-mdc-form-field-subscript-wrapper',
            'mat-mdc-form-field-bottom-align',
          ],
          [1, 'mat-mdc-form-field-error-wrapper'],
          [1, 'mat-mdc-form-field-hint-wrapper'],
          ['matFormFieldFloatingLabel', '', 3, 'floating', 'monitorResize', 'id'],
          [
            'aria-hidden',
            'true',
            1,
            'mat-mdc-form-field-required-marker',
            'mdc-floating-label--required',
          ],
          [3, 'id'],
          [1, 'mat-mdc-form-field-hint-spacer'],
        ],
        template: function (t, n) {
          if (t & 1) {
            let r = ke();
            (Oe(us),
              xe(0, _s, 1, 1, 'ng-template', null, 0, Et),
              p(2, 'div', 6, 1),
              I('click', function (l) {
                return (le(r), de(n._control.onContainerClick(l)));
              }),
              F(4, gs, 1, 0, 'div', 7),
              p(5, 'div', 8),
              F(6, bs, 2, 2, 'div', 9),
              F(7, xs, 3, 0, 'div', 10),
              F(8, Cs, 3, 0, 'div', 11),
              p(9, 'div', 12),
              F(10, Ss, 1, 1, null, 13),
              H(11),
              v(),
              F(12, Ds, 3, 0, 'div', 14),
              F(13, Ms, 3, 0, 'div', 15),
              v(),
              F(14, ks, 1, 0, 'div', 16),
              v(),
              p(15, 'div', 17),
              F(16, Es, 2, 0, 'div', 18)(17, As, 5, 1, 'div', 19),
              v());
          }
          if (t & 2) {
            let r;
            (m(2),
              w('mdc-text-field--filled', !n._hasOutline())(
                'mdc-text-field--outlined',
                n._hasOutline(),
              )('mdc-text-field--no-label', !n._hasFloatingLabel())(
                'mdc-text-field--disabled',
                n._control.disabled,
              )('mdc-text-field--invalid', n._control.errorState),
              m(2),
              V(!n._hasOutline() && !n._control.disabled ? 4 : -1),
              m(2),
              V(n._hasOutline() ? 6 : -1),
              m(),
              V(n._hasIconPrefix ? 7 : -1),
              m(),
              V(n._hasTextPrefix ? 8 : -1),
              m(2),
              V(!n._hasOutline() || n._forceDisplayInfixLabel() ? 10 : -1),
              m(2),
              V(n._hasTextSuffix ? 12 : -1),
              m(),
              V(n._hasIconSuffix ? 13 : -1),
              m(),
              V(n._hasOutline() ? -1 : 14),
              m(),
              w('mat-mdc-form-field-subscript-dynamic-size', n.subscriptSizing === 'dynamic'));
            let s = n._getSubscriptMessageType();
            (m(), V((r = s) === 'error' ? 16 : r === 'hint' ? 17 : -1));
          }
        },
        dependencies: [Wn, Un, At, Yn, ii],
        styles: [
          `.mdc-text-field{display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field__input{width:100%;min-width:0;border:none;border-radius:0;background:none;padding:0;-moz-appearance:none;-webkit-appearance:none;height:28px}.mdc-text-field__input::-webkit-calendar-picker-indicator,.mdc-text-field__input::-webkit-search-cancel-button{display:none}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input::placeholder{opacity:0}.mdc-text-field__input::-moz-placeholder{opacity:0}.mdc-text-field__input::-webkit-input-placeholder{opacity:0}.mdc-text-field__input:-ms-input-placeholder{opacity:0}.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder,.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder,.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder{opacity:0}.mdc-text-field--outlined .mdc-text-field__input,.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));caret-color:var(--mat-form-field-filled-caret-color, var(--mat-sys-primary))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));caret-color:var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error))}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error))}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}@media(forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}}.mdc-text-field--filled{height:56px;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));border-top-right-radius:var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small))}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant))}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent))}.mdc-text-field--outlined{height:56px;overflow:visible;padding-right:max(16px,var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));padding-left:max(16px,var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px)}[dir=rtl] .mdc-text-field--outlined{padding-right:max(16px,var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);padding-left:max(16px,var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)))}.mdc-floating-label{position:absolute;left:0;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:auto}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label{left:auto;right:4px}.mdc-text-field--filled .mdc-floating-label{left:16px;right:auto}[dir=rtl] .mdc-text-field--filled .mdc-floating-label{left:auto;right:16px}.mdc-text-field--disabled .mdc-floating-label{cursor:default}@media(forced-colors: active){.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label{color:var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label{color:var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary))}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label{color:var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label{color:var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label{color:var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label{color:var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label{color:var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container))}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label{color:var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label{color:var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary))}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label{color:var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label{color:var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label{color:var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label{color:var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label{color:var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container))}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-floating-label--float-above{cursor:auto;transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1);font-size:.75rem}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline{text-align:right}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mat-mdc-notch-piece{box-sizing:border-box;height:100%;pointer-events:none;border:none;border-top:1px solid;border-bottom:1px solid}.mdc-text-field--focused .mat-mdc-notch-piece{border-width:2px}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece{border-color:var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));border-width:var(--mat-form-field-outlined-outline-width, 1px)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece{border-color:var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece{border-color:var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary))}.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece{border-color:var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece{border-color:var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece{border-color:var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece{border-color:var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece{border-width:var(--mat-form-field-outlined-focus-outline-width, 2px)}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));border-bottom-left-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)))}[dir=rtl] .mdc-notched-outline__leading{border-left:none;border-right:1px solid;border-bottom-left-radius:0;border-top-left-radius:0;border-top-right-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));border-bottom-right-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))}.mdc-notched-outline__trailing{flex-grow:1;border-left:none;border-right:1px solid;border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));border-bottom-right-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))}[dir=rtl] .mdc-notched-outline__trailing{border-left:1px solid;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));border-bottom-left-radius:var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:min(var(--mat-form-field-notch-max-width, 100%),calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2))}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{max-width:min(100%,calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2))}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1;border-bottom-width:var(--mat-form-field-filled-active-indicator-height, 1px)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface))}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before{border-bottom-color:var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container))}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mat-form-field-filled-focus-active-indicator-height, 2px)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary))}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error))}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-text-field--disabled{pointer-events:none}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all;will-change:auto}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto;will-change:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-infix{min-height:var(--mat-form-field-container-height, 56px);padding-top:var(--mat-form-field-filled-with-label-container-padding-top, 24px);padding-bottom:var(--mat-form-field-filled-with-label-container-padding-bottom, 8px)}.mdc-text-field--outlined .mat-mdc-form-field-infix,.mdc-text-field--no-label .mat-mdc-form-field-infix{padding-top:var(--mat-form-field-container-vertical-padding, 16px);padding-bottom:var(--mat-form-field-container-vertical-padding, 16px)}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:calc(var(--mat-form-field-container-height, 56px)/2)}.mdc-text-field--filled .mat-mdc-floating-label{display:var(--mat-form-field-filled-label-display, block)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1)) scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));transform:var(--mat-mdc-form-field-label-transform)}@keyframes _mat-form-field-subscript-animation{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px;opacity:1;transform:translateY(0);animation:_mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color, var(--mat-sys-error))}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));line-height:var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));font-size:var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));letter-spacing:var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));font-weight:var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight))}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface))}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity, 0)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10))}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent))}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant))}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary))}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}@media(forced-colors: active){.mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}}@media(forced-colors: active){.mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}}@media(forced-colors: active){.mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}}@media(forced-colors: active){.mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));line-height:var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));letter-spacing:var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));font-weight:var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%;z-index:0}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:0 12px;box-sizing:content-box}.mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant))}.mat-form-field-disabled .mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant))}.mat-form-field-disabled .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-invalid .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error))}.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container))}.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error))}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field-infix:has(textarea[cols]){width:auto}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper{animation-duration:300ms}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })();
var yt = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({ imports: [yo, ji, W] });
  }
  return o;
})();
var oi = (() => {
  class o {
    isErrorState(e, t) {
      return !!(e && e.invalid && (e.touched || (t && t.submitted)));
    }
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
  }
  return o;
})();
var Ze = class {
  _defaultMatcher;
  ngControl;
  _parentFormGroup;
  _parentForm;
  _stateChanges;
  errorState = !1;
  matcher;
  constructor(i, e, t, n, r) {
    ((this._defaultMatcher = i),
      (this.ngControl = e),
      (this._parentFormGroup = t),
      (this._parentForm = n),
      (this._stateChanges = r));
  }
  updateErrorState() {
    let i = this.errorState,
      e = this._parentFormGroup || this._parentForm,
      t = this.matcher || this._defaultMatcher,
      n = this.ngControl ? this.ngControl.control : null,
      r = t?.isErrorState(n, e) ?? !1;
    r !== i && ((this.errorState = r), this._stateChanges.next());
  }
};
var Is = (() => {
    class o {
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['ng-component']],
        hostAttrs: ['cdk-text-field-style-loader', ''],
        decls: 0,
        vars: 0,
        template: function (t, n) {},
        styles: [
          `textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })(),
  Ps = { passive: !0 },
  er = (() => {
    class o {
      _platform = a(ne);
      _ngZone = a(N);
      _renderer = a(Le).createRenderer(null, null);
      _styleLoader = a(Re);
      _monitoredElements = new Map();
      constructor() {}
      monitor(e) {
        if (!this._platform.isBrowser) return $i;
        this._styleLoader.load(Is);
        let t = pi(e),
          n = this._monitoredElements.get(t);
        if (n) return n.subject;
        let r = new x(),
          s = 'cdk-text-field-autofilled',
          l = (h) => {
            h.animationName === 'cdk-text-field-autofill-start' && !t.classList.contains(s)
              ? (t.classList.add(s),
                this._ngZone.run(() => r.next({ target: h.target, isAutofilled: !0 })))
              : h.animationName === 'cdk-text-field-autofill-end' &&
                t.classList.contains(s) &&
                (t.classList.remove(s),
                this._ngZone.run(() => r.next({ target: h.target, isAutofilled: !1 })));
          },
          d = this._ngZone.runOutsideAngular(
            () => (
              t.classList.add('cdk-text-field-autofill-monitored'),
              this._renderer.listen(t, 'animationstart', l, Ps)
            ),
          );
        return (this._monitoredElements.set(t, { subject: r, unlisten: d }), r);
      }
      stopMonitoring(e) {
        let t = pi(e),
          n = this._monitoredElements.get(t);
        n &&
          (n.unlisten(),
          n.subject.complete(),
          t.classList.remove('cdk-text-field-autofill-monitored'),
          t.classList.remove('cdk-text-field-autofilled'),
          this._monitoredElements.delete(t));
      }
      ngOnDestroy() {
        this._monitoredElements.forEach((e, t) => this.stopMonitoring(t));
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵprov = j({ token: o, factory: o.ɵfac, providedIn: 'root' });
    }
    return o;
  })();
var tr = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({});
  }
  return o;
})();
var ir = new g('MAT_INPUT_VALUE_ACCESSOR');
var Ts = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'],
  Ns = new g('MAT_INPUT_CONFIG'),
  Dc = (() => {
    class o {
      _elementRef = a(C);
      _platform = a(ne);
      ngControl = a(K, { optional: !0, self: !0 });
      _autofillMonitor = a(er);
      _ngZone = a(N);
      _formField = a($e, { optional: !0 });
      _renderer = a(oe);
      _uid = a(re).getId('mat-input-');
      _previousNativeValue;
      _inputValueAccessor;
      _signalBasedValueAccessor;
      _previousPlaceholder;
      _errorStateTracker;
      _config = a(Ns, { optional: !0 });
      _cleanupIosKeyup;
      _cleanupWebkitWheel;
      _isServer;
      _isNativeSelect;
      _isTextarea;
      _isInFormField;
      focused = !1;
      stateChanges = new x();
      controlType = 'mat-input';
      autofilled = !1;
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        ((this._disabled = ye(e)), this.focused && ((this.focused = !1), this.stateChanges.next()));
      }
      _disabled = !1;
      get id() {
        return this._id;
      }
      set id(e) {
        this._id = e || this._uid;
      }
      _id;
      placeholder;
      name;
      get required() {
        return this._required ?? this.ngControl?.control?.hasValidator(We.required) ?? !1;
      }
      set required(e) {
        this._required = ye(e);
      }
      _required;
      get type() {
        return this._type;
      }
      set type(e) {
        ((this._type = e || 'text'),
          this._validateType(),
          !this._isTextarea &&
            vi().has(this._type) &&
            (this._elementRef.nativeElement.type = this._type));
      }
      _type = 'text';
      get errorStateMatcher() {
        return this._errorStateTracker.matcher;
      }
      set errorStateMatcher(e) {
        this._errorStateTracker.matcher = e;
      }
      userAriaDescribedBy;
      get value() {
        return this._signalBasedValueAccessor
          ? this._signalBasedValueAccessor.value()
          : this._inputValueAccessor.value;
      }
      set value(e) {
        e !== this.value &&
          (this._signalBasedValueAccessor
            ? this._signalBasedValueAccessor.value.set(e)
            : (this._inputValueAccessor.value = e),
          this.stateChanges.next());
      }
      get readonly() {
        return this._readonly;
      }
      set readonly(e) {
        this._readonly = ye(e);
      }
      _readonly = !1;
      disabledInteractive;
      get errorState() {
        return this._errorStateTracker.errorState;
      }
      set errorState(e) {
        this._errorStateTracker.errorState = e;
      }
      _neverEmptyInputTypes = [
        'date',
        'datetime',
        'datetime-local',
        'month',
        'time',
        'week',
      ].filter((e) => vi().has(e));
      constructor() {
        let e = a(ut, { optional: !0 }),
          t = a(mt, { optional: !0 }),
          n = a(oi),
          r = a(ir, { optional: !0, self: !0 }),
          s = this._elementRef.nativeElement,
          l = s.nodeName.toLowerCase();
        (r
          ? wt(r.value)
            ? (this._signalBasedValueAccessor = r)
            : (this._inputValueAccessor = r)
          : (this._inputValueAccessor = s),
          (this._previousNativeValue = this.value),
          (this.id = this.id),
          this._platform.IOS &&
            this._ngZone.runOutsideAngular(() => {
              this._cleanupIosKeyup = this._renderer.listen(s, 'keyup', this._iOSKeyupListener);
            }),
          (this._errorStateTracker = new Ze(n, this.ngControl, t, e, this.stateChanges)),
          (this._isServer = !this._platform.isBrowser),
          (this._isNativeSelect = l === 'select'),
          (this._isTextarea = l === 'textarea'),
          (this._isInFormField = !!this._formField),
          (this.disabledInteractive = this._config?.disabledInteractive || !1),
          this._isNativeSelect &&
            (this.controlType = s.multiple ? 'mat-native-select-multiple' : 'mat-native-select'),
          this._signalBasedValueAccessor &&
            xt(() => {
              (this._signalBasedValueAccessor.value(), this.stateChanges.next());
            }));
      }
      ngAfterViewInit() {
        this._platform.isBrowser &&
          this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((e) => {
            ((this.autofilled = e.isAutofilled), this.stateChanges.next());
          });
      }
      ngOnChanges() {
        this.stateChanges.next();
      }
      ngOnDestroy() {
        (this.stateChanges.complete(),
          this._platform.isBrowser &&
            this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),
          this._cleanupIosKeyup?.(),
          this._cleanupWebkitWheel?.());
      }
      ngDoCheck() {
        (this.ngControl &&
          (this.updateErrorState(),
          this.ngControl.disabled !== null &&
            this.ngControl.disabled !== this.disabled &&
            ((this.disabled = this.ngControl.disabled), this.stateChanges.next())),
          this._dirtyCheckNativeValue(),
          this._dirtyCheckPlaceholder());
      }
      focus(e) {
        this._elementRef.nativeElement.focus(e);
      }
      updateErrorState() {
        this._errorStateTracker.updateErrorState();
      }
      _focusChanged(e) {
        if (e !== this.focused) {
          if (!this._isNativeSelect && e && this.disabled && this.disabledInteractive) {
            let t = this._elementRef.nativeElement;
            t.type === 'number'
              ? ((t.type = 'text'), t.setSelectionRange(0, 0), (t.type = 'number'))
              : t.setSelectionRange(0, 0);
          }
          ((this.focused = e), this.stateChanges.next());
        }
      }
      _onInput() {}
      _dirtyCheckNativeValue() {
        let e = this._elementRef.nativeElement.value;
        this._previousNativeValue !== e &&
          ((this._previousNativeValue = e), this.stateChanges.next());
      }
      _dirtyCheckPlaceholder() {
        let e = this._getPlaceholder();
        if (e !== this._previousPlaceholder) {
          let t = this._elementRef.nativeElement;
          ((this._previousPlaceholder = e),
            e ? t.setAttribute('placeholder', e) : t.removeAttribute('placeholder'));
        }
      }
      _getPlaceholder() {
        return this.placeholder || null;
      }
      _validateType() {
        Ts.indexOf(this._type) > -1;
      }
      _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
      }
      _isBadInput() {
        let e = this._elementRef.nativeElement.validity;
        return e && e.badInput;
      }
      get empty() {
        return (
          !this._isNeverEmpty() &&
          !this._elementRef.nativeElement.value &&
          !this._isBadInput() &&
          !this.autofilled
        );
      }
      get shouldLabelFloat() {
        if (this._isNativeSelect) {
          let e = this._elementRef.nativeElement,
            t = e.options[0];
          return (
            this.focused || e.multiple || !this.empty || !!(e.selectedIndex > -1 && t && t.label)
          );
        } else return (this.focused && !this.disabled) || !this.empty;
      }
      get describedByIds() {
        return this._elementRef.nativeElement.getAttribute('aria-describedby')?.split(' ') || [];
      }
      setDescribedByIds(e) {
        let t = this._elementRef.nativeElement;
        e.length
          ? t.setAttribute('aria-describedby', e.join(' '))
          : t.removeAttribute('aria-describedby');
      }
      onContainerClick() {
        this.focused || this.focus();
      }
      _isInlineSelect() {
        let e = this._elementRef.nativeElement;
        return this._isNativeSelect && (e.multiple || e.size > 1);
      }
      _iOSKeyupListener = (e) => {
        let t = e.target;
        !t.value &&
          t.selectionStart === 0 &&
          t.selectionEnd === 0 &&
          (t.setSelectionRange(1, 1), t.setSelectionRange(0, 0));
      };
      _getReadonlyAttribute() {
        return this._isNativeSelect
          ? null
          : this.readonly || (this.disabled && this.disabledInteractive)
            ? 'true'
            : null;
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵdir = u({
        type: o,
        selectors: [
          ['input', 'matInput', ''],
          ['textarea', 'matInput', ''],
          ['select', 'matNativeControl', ''],
          ['input', 'matNativeControl', ''],
          ['textarea', 'matNativeControl', ''],
        ],
        hostAttrs: [1, 'mat-mdc-input-element'],
        hostVars: 21,
        hostBindings: function (t, n) {
          (t & 1 &&
            I('focus', function () {
              return n._focusChanged(!0);
            })('blur', function () {
              return n._focusChanged(!1);
            })('input', function () {
              return n._onInput();
            }),
            t & 2 &&
              (Ee('id', n.id)('disabled', n.disabled && !n.disabledInteractive)(
                'required',
                n.required,
              ),
              A('name', n.name || null)('readonly', n._getReadonlyAttribute())(
                'aria-disabled',
                n.disabled && n.disabledInteractive ? 'true' : null,
              )('aria-invalid', n.empty && n.required ? null : n.errorState)(
                'aria-required',
                n.required,
              )('id', n.id),
              w('mat-input-server', n._isServer)(
                'mat-mdc-form-field-textarea-control',
                n._isInFormField && n._isTextarea,
              )('mat-mdc-form-field-input-control', n._isInFormField)(
                'mat-mdc-input-disabled-interactive',
                n.disabledInteractive,
              )('mdc-text-field__input', n._isInFormField)(
                'mat-mdc-native-select-inline',
                n._isInlineSelect(),
              )));
        },
        inputs: {
          disabled: 'disabled',
          id: 'id',
          placeholder: 'placeholder',
          name: 'name',
          required: 'required',
          type: 'type',
          errorStateMatcher: 'errorStateMatcher',
          userAriaDescribedBy: [0, 'aria-describedby', 'userAriaDescribedBy'],
          value: 'value',
          readonly: 'readonly',
          disabledInteractive: [2, 'disabledInteractive', 'disabledInteractive', M],
        },
        exportAs: ['matInput'],
        features: [D([{ provide: qe, useExisting: o }]), ie],
      });
    }
    return o;
  })(),
  Mc = (() => {
    class o {
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵmod = O({ type: o });
      static ɵinj = k({ imports: [yt, yt, tr, W] });
    }
    return o;
  })();
var Ls = ['determinateSpinner'];
function Bs(o, i) {
  if ((o & 1 && (Ke(), p(0, 'svg', 11), Z(1, 'circle', 12), v()), o & 2)) {
    let e = P();
    (A('viewBox', e._viewBox()),
      m(),
      Mt('stroke-dasharray', e._strokeCircumference(), 'px')(
        'stroke-dashoffset',
        e._strokeCircumference() / 2,
        'px',
      )('stroke-width', e._circleStrokeWidth(), '%'),
      A('r', e._circleRadius()));
  }
}
var Hs = new g('mat-progress-spinner-default-options', {
    providedIn: 'root',
    factory: () => ({ diameter: or }),
  }),
  or = 100,
  zs = 10,
  Bc = (() => {
    class o {
      _elementRef = a(C);
      _noopAnimations;
      get color() {
        return this._color || this._defaultColor;
      }
      set color(e) {
        this._color = e;
      }
      _color;
      _defaultColor = 'primary';
      _determinateCircle;
      constructor() {
        let e = a(Hs),
          t = Mo(),
          n = this._elementRef.nativeElement;
        ((this._noopAnimations = t === 'di-disabled' && !!e && !e._forceAnimations),
          (this.mode =
            n.nodeName.toLowerCase() === 'mat-spinner' ? 'indeterminate' : 'determinate'),
          !this._noopAnimations &&
            t === 'reduced-motion' &&
            n.classList.add('mat-progress-spinner-reduced-motion'),
          e &&
            (e.color && (this.color = this._defaultColor = e.color),
            e.diameter && (this.diameter = e.diameter),
            e.strokeWidth && (this.strokeWidth = e.strokeWidth)));
      }
      mode;
      get value() {
        return this.mode === 'determinate' ? this._value : 0;
      }
      set value(e) {
        this._value = Math.max(0, Math.min(100, e || 0));
      }
      _value = 0;
      get diameter() {
        return this._diameter;
      }
      set diameter(e) {
        this._diameter = e || 0;
      }
      _diameter = or;
      get strokeWidth() {
        return this._strokeWidth ?? this.diameter / 10;
      }
      set strokeWidth(e) {
        this._strokeWidth = e || 0;
      }
      _strokeWidth;
      _circleRadius() {
        return (this.diameter - zs) / 2;
      }
      _viewBox() {
        let e = this._circleRadius() * 2 + this.strokeWidth;
        return `0 0 ${e} ${e}`;
      }
      _strokeCircumference() {
        return 2 * Math.PI * this._circleRadius();
      }
      _strokeDashOffset() {
        return this.mode === 'determinate'
          ? (this._strokeCircumference() * (100 - this._value)) / 100
          : null;
      }
      _circleStrokeWidth() {
        return (this.strokeWidth / this.diameter) * 100;
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['mat-progress-spinner'], ['mat-spinner']],
        viewQuery: function (t, n) {
          if ((t & 1 && ae(Ls, 5), t & 2)) {
            let r;
            y((r = b())) && (n._determinateCircle = r.first);
          }
        },
        hostAttrs: [
          'role',
          'progressbar',
          'tabindex',
          '-1',
          1,
          'mat-mdc-progress-spinner',
          'mdc-circular-progress',
        ],
        hostVars: 18,
        hostBindings: function (t, n) {
          t & 2 &&
            (A('aria-valuemin', 0)('aria-valuemax', 100)(
              'aria-valuenow',
              n.mode === 'determinate' ? n.value : null,
            )('mode', n.mode),
            kt('mat-' + n.color),
            Mt('width', n.diameter, 'px')('height', n.diameter, 'px')(
              '--mat-progress-spinner-size',
              n.diameter + 'px',
            )('--mat-progress-spinner-active-indicator-width', n.diameter + 'px'),
            w('_mat-animation-noopable', n._noopAnimations)(
              'mdc-circular-progress--indeterminate',
              n.mode === 'indeterminate',
            ));
        },
        inputs: {
          color: 'color',
          mode: 'mode',
          value: [2, 'value', 'value', Ve],
          diameter: [2, 'diameter', 'diameter', Ve],
          strokeWidth: [2, 'strokeWidth', 'strokeWidth', Ve],
        },
        exportAs: ['matProgressSpinner'],
        decls: 14,
        vars: 11,
        consts: [
          ['circle', ''],
          ['determinateSpinner', ''],
          ['aria-hidden', 'true', 1, 'mdc-circular-progress__determinate-container'],
          [
            'xmlns',
            'http://www.w3.org/2000/svg',
            'focusable',
            'false',
            1,
            'mdc-circular-progress__determinate-circle-graphic',
          ],
          ['cx', '50%', 'cy', '50%', 1, 'mdc-circular-progress__determinate-circle'],
          ['aria-hidden', 'true', 1, 'mdc-circular-progress__indeterminate-container'],
          [1, 'mdc-circular-progress__spinner-layer'],
          [1, 'mdc-circular-progress__circle-clipper', 'mdc-circular-progress__circle-left'],
          [3, 'ngTemplateOutlet'],
          [1, 'mdc-circular-progress__gap-patch'],
          [1, 'mdc-circular-progress__circle-clipper', 'mdc-circular-progress__circle-right'],
          [
            'xmlns',
            'http://www.w3.org/2000/svg',
            'focusable',
            'false',
            1,
            'mdc-circular-progress__indeterminate-circle-graphic',
          ],
          ['cx', '50%', 'cy', '50%'],
        ],
        template: function (t, n) {
          if (
            (t & 1 &&
              (xe(0, Bs, 2, 8, 'ng-template', null, 0, Et),
              p(2, 'div', 2, 1),
              Ke(),
              p(4, 'svg', 3),
              Z(5, 'circle', 4),
              v()(),
              oo(),
              p(6, 'div', 5)(7, 'div', 6)(8, 'div', 7),
              St(9, 8),
              v(),
              p(10, 'div', 9),
              St(11, 8),
              v(),
              p(12, 'div', 10),
              St(13, 8),
              v()()()),
            t & 2)
          ) {
            let r = Ae(1);
            (m(4),
              A('viewBox', n._viewBox()),
              m(),
              Mt('stroke-dasharray', n._strokeCircumference(), 'px')(
                'stroke-dashoffset',
                n._strokeDashOffset(),
                'px',
              )('stroke-width', n._circleStrokeWidth(), '%'),
              A('r', n._circleRadius()),
              m(4),
              T('ngTemplateOutlet', r),
              m(2),
              T('ngTemplateOutlet', r),
              m(2),
              T('ngTemplateOutlet', r));
          }
        },
        dependencies: [At],
        styles: [
          `.mat-mdc-progress-spinner{--mat-progress-spinner-animation-multiplier: 1;display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mat-progress-spinner-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mat-progress-spinner-reduced-motion{--mat-progress-spinner-animation-multiplier: 1.25}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate calc(1568.2352941176ms*var(--mat-progress-spinner-animation-multiplier)) linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin calc(1333ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin calc(1333ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate calc(5332ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })();
var Hc = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({ imports: [W] });
  }
  return o;
})();
var js = ['text'],
  Ws = [[['mat-icon']], '*'],
  Gs = ['mat-icon', '*'];
function Ys(o, i) {
  if ((o & 1 && Z(0, 'mat-pseudo-checkbox', 1), o & 2)) {
    let e = P();
    T('disabled', e.disabled)('state', e.selected ? 'checked' : 'unchecked');
  }
}
function Us(o, i) {
  if ((o & 1 && Z(0, 'mat-pseudo-checkbox', 3), o & 2)) {
    let e = P();
    T('disabled', e.disabled);
  }
}
function Xs(o, i) {
  if ((o & 1 && (p(0, 'span', 4), ge(1), v()), o & 2)) {
    let e = P();
    (m(), co('(', e.group.label, ')'));
  }
}
var Gi = new g('MAT_OPTION_PARENT_COMPONENT'),
  Yi = new g('MatOptgroup');
var Wi = class {
    source;
    isUserInput;
    constructor(i, e = !1) {
      ((this.source = i), (this.isUserInput = e));
    }
  },
  si = (() => {
    class o {
      _element = a(C);
      _changeDetectorRef = a(he);
      _parent = a(Gi, { optional: !0 });
      group = a(Yi, { optional: !0 });
      _signalDisableRipple = !1;
      _selected = !1;
      _active = !1;
      _mostRecentViewValue = '';
      get multiple() {
        return this._parent && this._parent.multiple;
      }
      get selected() {
        return this._selected;
      }
      value;
      id = a(re).getId('mat-option-');
      get disabled() {
        return (this.group && this.group.disabled) || this._disabled();
      }
      set disabled(e) {
        this._disabled.set(e);
      }
      _disabled = te(!1);
      get disableRipple() {
        return this._signalDisableRipple
          ? this._parent.disableRipple()
          : !!this._parent?.disableRipple;
      }
      get hideSingleSelectionIndicator() {
        return !!(this._parent && this._parent.hideSingleSelectionIndicator);
      }
      onSelectionChange = new E();
      _text;
      _stateChanges = new x();
      constructor() {
        let e = a(Re);
        (e.load(Eo),
          e.load(vo),
          (this._signalDisableRipple = !!this._parent && wt(this._parent.disableRipple)));
      }
      get active() {
        return this._active;
      }
      get viewValue() {
        return (this._text?.nativeElement.textContent || '').trim();
      }
      select(e = !0) {
        this._selected ||
          ((this._selected = !0),
          this._changeDetectorRef.markForCheck(),
          e && this._emitSelectionChangeEvent());
      }
      deselect(e = !0) {
        this._selected &&
          ((this._selected = !1),
          this._changeDetectorRef.markForCheck(),
          e && this._emitSelectionChangeEvent());
      }
      focus(e, t) {
        let n = this._getHostElement();
        typeof n.focus == 'function' && n.focus(t);
      }
      setActiveStyles() {
        this._active || ((this._active = !0), this._changeDetectorRef.markForCheck());
      }
      setInactiveStyles() {
        this._active && ((this._active = !1), this._changeDetectorRef.markForCheck());
      }
      getLabel() {
        return this.viewValue;
      }
      _handleKeydown(e) {
        (e.keyCode === 13 || e.keyCode === 32) &&
          !ue(e) &&
          (this._selectViaInteraction(), e.preventDefault());
      }
      _selectViaInteraction() {
        this.disabled ||
          ((this._selected = this.multiple ? !this._selected : !0),
          this._changeDetectorRef.markForCheck(),
          this._emitSelectionChangeEvent(!0));
      }
      _getTabIndex() {
        return this.disabled ? '-1' : '0';
      }
      _getHostElement() {
        return this._element.nativeElement;
      }
      ngAfterViewChecked() {
        if (this._selected) {
          let e = this.viewValue;
          e !== this._mostRecentViewValue &&
            (this._mostRecentViewValue && this._stateChanges.next(),
            (this._mostRecentViewValue = e));
        }
      }
      ngOnDestroy() {
        this._stateChanges.complete();
      }
      _emitSelectionChangeEvent(e = !1) {
        this.onSelectionChange.emit(new Wi(this, e));
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['mat-option']],
        viewQuery: function (t, n) {
          if ((t & 1 && ae(js, 7), t & 2)) {
            let r;
            y((r = b())) && (n._text = r.first);
          }
        },
        hostAttrs: ['role', 'option', 1, 'mat-mdc-option', 'mdc-list-item'],
        hostVars: 11,
        hostBindings: function (t, n) {
          (t & 1 &&
            I('click', function () {
              return n._selectViaInteraction();
            })('keydown', function (s) {
              return n._handleKeydown(s);
            }),
            t & 2 &&
              (Ee('id', n.id),
              A('aria-selected', n.selected)('aria-disabled', n.disabled.toString()),
              w('mdc-list-item--selected', n.selected)('mat-mdc-option-multiple', n.multiple)(
                'mat-mdc-option-active',
                n.active,
              )('mdc-list-item--disabled', n.disabled)));
        },
        inputs: { value: 'value', id: 'id', disabled: [2, 'disabled', 'disabled', M] },
        outputs: { onSelectionChange: 'onSelectionChange' },
        exportAs: ['matOption'],
        ngContentSelectors: Gs,
        decls: 8,
        vars: 5,
        consts: [
          ['text', ''],
          ['aria-hidden', 'true', 1, 'mat-mdc-option-pseudo-checkbox', 3, 'disabled', 'state'],
          [1, 'mdc-list-item__primary-text'],
          [
            'state',
            'checked',
            'aria-hidden',
            'true',
            'appearance',
            'minimal',
            1,
            'mat-mdc-option-pseudo-checkbox',
            3,
            'disabled',
          ],
          [1, 'cdk-visually-hidden'],
          [
            'aria-hidden',
            'true',
            'mat-ripple',
            '',
            1,
            'mat-mdc-option-ripple',
            'mat-focus-indicator',
            3,
            'matRippleTrigger',
            'matRippleDisabled',
          ],
        ],
        template: function (t, n) {
          (t & 1 &&
            (Oe(Ws),
            F(0, Ys, 1, 2, 'mat-pseudo-checkbox', 1),
            H(1),
            p(2, 'span', 2, 0),
            H(4, 1),
            v(),
            F(5, Us, 1, 1, 'mat-pseudo-checkbox', 3),
            F(6, Xs, 2, 1, 'span', 4),
            Z(7, 'div', 5)),
            t & 2 &&
              (V(n.multiple ? 0 : -1),
              m(5),
              V(!n.multiple && n.selected && !n.hideSingleSelectionIndicator ? 5 : -1),
              m(),
              V(n.group && n.group._inert ? 6 : -1),
              m(),
              T('matRippleTrigger', n._getHostElement())(
                'matRippleDisabled',
                n.disabled || n.disableRipple,
              )));
        },
        dependencies: [pn, ko],
        styles: [
          `.mat-mdc-option{-webkit-user-select:none;user-select:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;min-height:48px;padding:0 16px;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);color:var(--mat-option-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-option-label-text-font, var(--mat-sys-label-large-font));line-height:var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));font-size:var(--mat-option-label-text-size, var(--mat-sys-body-large-size));letter-spacing:var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));font-weight:var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight))}.mat-mdc-option:hover:not(.mdc-list-item--disabled){background-color:var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}.mat-mdc-option:focus.mdc-list-item,.mat-mdc-option.mat-mdc-option-active.mdc-list-item{background-color:var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));outline:0}.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active,.mat-mdc-option-multiple,:focus,:hover){background-color:var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container))}.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active,.mat-mdc-option-multiple,:focus,:hover) .mdc-list-item__primary-text{color:var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container))}.mat-mdc-option .mat-pseudo-checkbox{--mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container))}.mat-mdc-option.mdc-list-item{align-items:center;background:rgba(0,0,0,0)}.mat-mdc-option.mdc-list-item--disabled{cursor:default;pointer-events:none}.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox,.mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text,.mat-mdc-option.mdc-list-item--disabled>mat-icon{opacity:.38}.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple){padding-left:32px}[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple){padding-left:16px;padding-right:32px}.mat-mdc-option .mat-icon,.mat-mdc-option .mat-pseudo-checkbox-full{margin-right:16px;flex-shrink:0}[dir=rtl] .mat-mdc-option .mat-icon,[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full{margin-right:0;margin-left:16px}.mat-mdc-option .mat-pseudo-checkbox-minimal{margin-left:16px;flex-shrink:0}[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal{margin-right:16px;margin-left:0}.mat-mdc-option .mat-mdc-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-option .mdc-list-item__primary-text{white-space:normal;font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;font-family:inherit;text-decoration:inherit;text-transform:inherit;margin-right:auto}[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text{margin-right:0;margin-left:auto}@media(forced-colors: active){.mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}[dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after{right:auto;left:16px}}.mat-mdc-option-multiple{--mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent)}.mat-mdc-option-active .mat-focus-indicator::before{content:""}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })();
function nr(o, i, e) {
  if (e.length) {
    let t = i.toArray(),
      n = e.toArray(),
      r = 0;
    for (let s = 0; s < o + 1; s++) t[s].group && t[s].group === n[r] && r++;
    return r;
  }
  return 0;
}
function rr(o, i, e, t) {
  return o < e ? o : o + i > e + t ? Math.max(0, o - t + i) : e;
}
var Ui = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({ imports: [Oo, _n, si, W] });
  }
  return o;
})();
var Qs = ['trigger'],
  Ks = ['panel'],
  Js = [[['mat-select-trigger']], '*'],
  ea = ['mat-select-trigger', '*'];
function ta(o, i) {
  if ((o & 1 && (p(0, 'span', 4), ge(1), v()), o & 2)) {
    let e = P();
    (m(), Fe(e.placeholder));
  }
}
function ia(o, i) {
  o & 1 && H(0);
}
function oa(o, i) {
  if ((o & 1 && (p(0, 'span', 11), ge(1), v()), o & 2)) {
    let e = P(2);
    (m(), Fe(e.triggerValue));
  }
}
function na(o, i) {
  if ((o & 1 && (p(0, 'span', 5), F(1, ia, 1, 0)(2, oa, 2, 1, 'span', 11), v()), o & 2)) {
    let e = P();
    (m(), V(e.customTrigger ? 1 : 2));
  }
}
function ra(o, i) {
  if (o & 1) {
    let e = ke();
    (p(0, 'div', 12, 1),
      I('keydown', function (n) {
        le(e);
        let r = P();
        return de(r._handleKeydown(n));
      }),
      H(2, 1),
      v());
  }
  if (o & 2) {
    let e = P();
    (kt(ho('mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open ', e._getPanelTheme())),
      w('mat-select-panel-animations-enabled', !e._animationsDisabled),
      T('ngClass', e.panelClass),
      A('id', e.id + '-panel')('aria-multiselectable', e.multiple)(
        'aria-label',
        e.ariaLabel || null,
      )('aria-labelledby', e._getPanelAriaLabelledby()));
  }
}
var sa = new g('mat-select-scroll-strategy', {
    providedIn: 'root',
    factory: () => {
      let o = a(ee);
      return () => Te(o);
    },
  }),
  aa = new g('MAT_SELECT_CONFIG'),
  la = new g('MatSelectTrigger'),
  Xi = class {
    source;
    value;
    constructor(i, e) {
      ((this.source = i), (this.value = e));
    }
  },
  Lh = (() => {
    class o {
      _viewportRuler = a(Ce);
      _changeDetectorRef = a(he);
      _elementRef = a(C);
      _dir = a(ve, { optional: !0 });
      _idGenerator = a(re);
      _renderer = a(oe);
      _parentFormField = a($e, { optional: !0 });
      ngControl = a(K, { self: !0, optional: !0 });
      _liveAnnouncer = a(bo);
      _defaultOptions = a(aa, { optional: !0 });
      _animationsDisabled = be();
      _initialized = new x();
      _cleanupDetach;
      options;
      optionGroups;
      customTrigger;
      _positions = [
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          panelClass: 'mat-mdc-select-panel-above',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          panelClass: 'mat-mdc-select-panel-above',
        },
      ];
      _scrollOptionIntoView(e) {
        let t = this.options.toArray()[e];
        if (t) {
          let n = this.panel.nativeElement,
            r = nr(e, this.options, this.optionGroups),
            s = t._getHostElement();
          e === 0 && r === 1
            ? (n.scrollTop = 0)
            : (n.scrollTop = rr(s.offsetTop, s.offsetHeight, n.scrollTop, n.offsetHeight));
        }
      }
      _positioningSettled() {
        this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
      }
      _getChangeEvent(e) {
        return new Xi(this, e);
      }
      _scrollStrategyFactory = a(sa);
      _panelOpen = !1;
      _compareWith = (e, t) => e === t;
      _uid = this._idGenerator.getId('mat-select-');
      _triggerAriaLabelledBy = null;
      _previousControl;
      _destroy = new x();
      _errorStateTracker;
      stateChanges = new x();
      disableAutomaticLabeling = !0;
      userAriaDescribedBy;
      _selectionModel;
      _keyManager;
      _preferredOverlayOrigin;
      _overlayWidth;
      _onChange = () => {};
      _onTouched = () => {};
      _valueId = this._idGenerator.getId('mat-select-value-');
      _scrollStrategy;
      _overlayPanelClass = this._defaultOptions?.overlayPanelClass || '';
      get focused() {
        return this._focused || this._panelOpen;
      }
      _focused = !1;
      controlType = 'mat-select';
      trigger;
      panel;
      _overlayDir;
      panelClass;
      disabled = !1;
      get disableRipple() {
        return this._disableRipple();
      }
      set disableRipple(e) {
        this._disableRipple.set(e);
      }
      _disableRipple = te(!1);
      tabIndex = 0;
      get hideSingleSelectionIndicator() {
        return this._hideSingleSelectionIndicator;
      }
      set hideSingleSelectionIndicator(e) {
        ((this._hideSingleSelectionIndicator = e), this._syncParentProperties());
      }
      _hideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? !1;
      get placeholder() {
        return this._placeholder;
      }
      set placeholder(e) {
        ((this._placeholder = e), this.stateChanges.next());
      }
      _placeholder;
      get required() {
        return this._required ?? this.ngControl?.control?.hasValidator(We.required) ?? !1;
      }
      set required(e) {
        ((this._required = e), this.stateChanges.next());
      }
      _required;
      get multiple() {
        return this._multiple;
      }
      set multiple(e) {
        (this._selectionModel, (this._multiple = e));
      }
      _multiple = !1;
      disableOptionCentering = this._defaultOptions?.disableOptionCentering ?? !1;
      get compareWith() {
        return this._compareWith;
      }
      set compareWith(e) {
        ((this._compareWith = e), this._selectionModel && this._initializeSelection());
      }
      get value() {
        return this._value;
      }
      set value(e) {
        this._assignValue(e) && this._onChange(e);
      }
      _value;
      ariaLabel = '';
      ariaLabelledby;
      get errorStateMatcher() {
        return this._errorStateTracker.matcher;
      }
      set errorStateMatcher(e) {
        this._errorStateTracker.matcher = e;
      }
      typeaheadDebounceInterval;
      sortComparator;
      get id() {
        return this._id;
      }
      set id(e) {
        ((this._id = e || this._uid), this.stateChanges.next());
      }
      _id;
      get errorState() {
        return this._errorStateTracker.errorState;
      }
      set errorState(e) {
        this._errorStateTracker.errorState = e;
      }
      panelWidth =
        this._defaultOptions && typeof this._defaultOptions.panelWidth < 'u'
          ? this._defaultOptions.panelWidth
          : 'auto';
      canSelectNullableOptions = this._defaultOptions?.canSelectNullableOptions ?? !1;
      optionSelectionChanges = Qi(() => {
        let e = this.options;
        return e
          ? e.changes.pipe(
              Qe(e),
              ai(() => Ne(...e.map((t) => t.onSelectionChange))),
            )
          : this._initialized.pipe(ai(() => this.optionSelectionChanges));
      });
      openedChange = new E();
      _openedStream = this.openedChange.pipe(
        De((e) => e),
        Se(() => {}),
      );
      _closedStream = this.openedChange.pipe(
        De((e) => !e),
        Se(() => {}),
      );
      selectionChange = new E();
      valueChange = new E();
      constructor() {
        let e = a(oi),
          t = a(ut, { optional: !0 }),
          n = a(mt, { optional: !0 }),
          r = a(new uo('tabindex'), { optional: !0 });
        (this.ngControl && (this.ngControl.valueAccessor = this),
          this._defaultOptions?.typeaheadDebounceInterval != null &&
            (this.typeaheadDebounceInterval = this._defaultOptions.typeaheadDebounceInterval),
          (this._errorStateTracker = new Ze(e, this.ngControl, n, t, this.stateChanges)),
          (this._scrollStrategy = this._scrollStrategyFactory()),
          (this.tabIndex = r == null ? 0 : parseInt(r) || 0),
          (this.id = this.id));
      }
      ngOnInit() {
        ((this._selectionModel = new it(this.multiple)),
          this.stateChanges.next(),
          this._viewportRuler
            .change()
            .pipe(z(this._destroy))
            .subscribe(() => {
              this.panelOpen &&
                ((this._overlayWidth = this._getOverlayWidth(this._preferredOverlayOrigin)),
                this._changeDetectorRef.detectChanges());
            }));
      }
      ngAfterContentInit() {
        (this._initialized.next(),
          this._initialized.complete(),
          this._initKeyManager(),
          this._selectionModel.changed.pipe(z(this._destroy)).subscribe((e) => {
            (e.added.forEach((t) => t.select()), e.removed.forEach((t) => t.deselect()));
          }),
          this.options.changes.pipe(Qe(null), z(this._destroy)).subscribe(() => {
            (this._resetOptions(), this._initializeSelection());
          }));
      }
      ngDoCheck() {
        let e = this._getTriggerAriaLabelledby(),
          t = this.ngControl;
        if (e !== this._triggerAriaLabelledBy) {
          let n = this._elementRef.nativeElement;
          ((this._triggerAriaLabelledBy = e),
            e ? n.setAttribute('aria-labelledby', e) : n.removeAttribute('aria-labelledby'));
        }
        t &&
          (this._previousControl !== t.control &&
            (this._previousControl !== void 0 &&
              t.disabled !== null &&
              t.disabled !== this.disabled &&
              (this.disabled = t.disabled),
            (this._previousControl = t.control)),
          this.updateErrorState());
      }
      ngOnChanges(e) {
        ((e.disabled || e.userAriaDescribedBy) && this.stateChanges.next(),
          e.typeaheadDebounceInterval &&
            this._keyManager &&
            this._keyManager.withTypeAhead(this.typeaheadDebounceInterval));
      }
      ngOnDestroy() {
        (this._cleanupDetach?.(),
          this._keyManager?.destroy(),
          this._destroy.next(),
          this._destroy.complete(),
          this.stateChanges.complete(),
          this._clearFromModal());
      }
      toggle() {
        this.panelOpen ? this.close() : this.open();
      }
      open() {
        this._canOpen() &&
          (this._parentFormField &&
            (this._preferredOverlayOrigin = this._parentFormField.getConnectedOverlayOrigin()),
          this._cleanupDetach?.(),
          (this._overlayWidth = this._getOverlayWidth(this._preferredOverlayOrigin)),
          this._applyModalPanelOwnership(),
          (this._panelOpen = !0),
          this._overlayDir.positionChange.pipe(Ji(1)).subscribe(() => {
            (this._changeDetectorRef.detectChanges(), this._positioningSettled());
          }),
          this._overlayDir.attachOverlay(),
          this._keyManager.withHorizontalOrientation(null),
          this._highlightCorrectOption(),
          this._changeDetectorRef.markForCheck(),
          this.stateChanges.next(),
          Promise.resolve().then(() => this.openedChange.emit(!0)));
      }
      _trackedModal = null;
      _applyModalPanelOwnership() {
        let e = this._elementRef.nativeElement.closest(
          'body > .cdk-overlay-container [aria-modal="true"]',
        );
        if (!e) return;
        let t = `${this.id}-panel`;
        (this._trackedModal && _i(this._trackedModal, 'aria-owns', t),
          wo(e, 'aria-owns', t),
          (this._trackedModal = e));
      }
      _clearFromModal() {
        if (!this._trackedModal) return;
        let e = `${this.id}-panel`;
        (_i(this._trackedModal, 'aria-owns', e), (this._trackedModal = null));
      }
      close() {
        this._panelOpen &&
          ((this._panelOpen = !1),
          this._exitAndDetach(),
          this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr'),
          this._changeDetectorRef.markForCheck(),
          this._onTouched(),
          this.stateChanges.next(),
          Promise.resolve().then(() => this.openedChange.emit(!1)));
      }
      _exitAndDetach() {
        if (this._animationsDisabled || !this.panel) {
          this._detachOverlay();
          return;
        }
        (this._cleanupDetach?.(),
          (this._cleanupDetach = () => {
            (t(), clearTimeout(n), (this._cleanupDetach = void 0));
          }));
        let e = this.panel.nativeElement,
          t = this._renderer.listen(e, 'animationend', (r) => {
            r.animationName === '_mat-select-exit' &&
              (this._cleanupDetach?.(), this._detachOverlay());
          }),
          n = setTimeout(() => {
            (this._cleanupDetach?.(), this._detachOverlay());
          }, 200);
        e.classList.add('mat-select-panel-exit');
      }
      _detachOverlay() {
        (this._overlayDir.detachOverlay(), this._changeDetectorRef.markForCheck());
      }
      writeValue(e) {
        this._assignValue(e);
      }
      registerOnChange(e) {
        this._onChange = e;
      }
      registerOnTouched(e) {
        this._onTouched = e;
      }
      setDisabledState(e) {
        ((this.disabled = e), this._changeDetectorRef.markForCheck(), this.stateChanges.next());
      }
      get panelOpen() {
        return this._panelOpen;
      }
      get selected() {
        return this.multiple
          ? this._selectionModel?.selected || []
          : this._selectionModel?.selected[0];
      }
      get triggerValue() {
        if (this.empty) return '';
        if (this._multiple) {
          let e = this._selectionModel.selected.map((t) => t.viewValue);
          return (this._isRtl() && e.reverse(), e.join(', '));
        }
        return this._selectionModel.selected[0].viewValue;
      }
      updateErrorState() {
        this._errorStateTracker.updateErrorState();
      }
      _isRtl() {
        return this._dir ? this._dir.value === 'rtl' : !1;
      }
      _handleKeydown(e) {
        this.disabled ||
          (this.panelOpen ? this._handleOpenKeydown(e) : this._handleClosedKeydown(e));
      }
      _handleClosedKeydown(e) {
        let t = e.keyCode,
          n = t === 40 || t === 38 || t === 37 || t === 39,
          r = t === 13 || t === 32,
          s = this._keyManager;
        if ((!s.isTyping() && r && !ue(e)) || ((this.multiple || e.altKey) && n))
          (e.preventDefault(), this.open());
        else if (!this.multiple) {
          let l = this.selected;
          s.onKeydown(e);
          let d = this.selected;
          d && l !== d && this._liveAnnouncer.announce(d.viewValue, 1e4);
        }
      }
      _handleOpenKeydown(e) {
        let t = this._keyManager,
          n = e.keyCode,
          r = n === 40 || n === 38,
          s = t.isTyping();
        if (r && e.altKey) (e.preventDefault(), this.close());
        else if (!s && (n === 13 || n === 32) && t.activeItem && !ue(e))
          (e.preventDefault(), t.activeItem._selectViaInteraction());
        else if (!s && this._multiple && n === 65 && e.ctrlKey) {
          e.preventDefault();
          let l = this.options.some((d) => !d.disabled && !d.selected);
          this.options.forEach((d) => {
            d.disabled || (l ? d.select() : d.deselect());
          });
        } else {
          let l = t.activeItemIndex;
          (t.onKeydown(e),
            this._multiple &&
              r &&
              e.shiftKey &&
              t.activeItem &&
              t.activeItemIndex !== l &&
              t.activeItem._selectViaInteraction());
        }
      }
      _handleOverlayKeydown(e) {
        e.keyCode === 27 && !ue(e) && (e.preventDefault(), this.close());
      }
      _onFocus() {
        this.disabled || ((this._focused = !0), this.stateChanges.next());
      }
      _onBlur() {
        ((this._focused = !1),
          this._keyManager?.cancelTypeahead(),
          !this.disabled &&
            !this.panelOpen &&
            (this._onTouched(), this._changeDetectorRef.markForCheck(), this.stateChanges.next()));
      }
      _getPanelTheme() {
        return this._parentFormField ? `mat-${this._parentFormField.color}` : '';
      }
      get empty() {
        return !this._selectionModel || this._selectionModel.isEmpty();
      }
      _initializeSelection() {
        Promise.resolve().then(() => {
          (this.ngControl && (this._value = this.ngControl.value),
            this._setSelectionByValue(this._value),
            this.stateChanges.next());
        });
      }
      _setSelectionByValue(e) {
        if (
          (this.options.forEach((t) => t.setInactiveStyles()),
          this._selectionModel.clear(),
          this.multiple && e)
        )
          (Array.isArray(e), e.forEach((t) => this._selectOptionByValue(t)), this._sortValues());
        else {
          let t = this._selectOptionByValue(e);
          t
            ? this._keyManager.updateActiveItem(t)
            : this.panelOpen || this._keyManager.updateActiveItem(-1);
        }
        this._changeDetectorRef.markForCheck();
      }
      _selectOptionByValue(e) {
        let t = this.options.find((n) => {
          if (this._selectionModel.isSelected(n)) return !1;
          try {
            return (
              (n.value != null || this.canSelectNullableOptions) && this._compareWith(n.value, e)
            );
          } catch {
            return !1;
          }
        });
        return (t && this._selectionModel.select(t), t);
      }
      _assignValue(e) {
        return e !== this._value || (this._multiple && Array.isArray(e))
          ? (this.options && this._setSelectionByValue(e), (this._value = e), !0)
          : !1;
      }
      _skipPredicate = (e) => (this.panelOpen ? !1 : e.disabled);
      _getOverlayWidth(e) {
        return this.panelWidth === 'auto'
          ? (e instanceof Xe
              ? e.elementRef
              : e || this._elementRef
            ).nativeElement.getBoundingClientRect().width
          : this.panelWidth === null
            ? ''
            : this.panelWidth;
      }
      _syncParentProperties() {
        if (this.options) for (let e of this.options) e._changeDetectorRef.markForCheck();
      }
      _initKeyManager() {
        ((this._keyManager = new Co(this.options)
          .withTypeAhead(this.typeaheadDebounceInterval)
          .withVerticalOrientation()
          .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr')
          .withHomeAndEnd()
          .withPageUpDown()
          .withAllowedModifierKeys(['shiftKey'])
          .skipPredicate(this._skipPredicate)),
          this._keyManager.tabOut.subscribe(() => {
            this.panelOpen &&
              (!this.multiple &&
                this._keyManager.activeItem &&
                this._keyManager.activeItem._selectViaInteraction(),
              this.focus(),
              this.close());
          }),
          this._keyManager.change.subscribe(() => {
            this._panelOpen && this.panel
              ? this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0)
              : !this._panelOpen &&
                !this.multiple &&
                this._keyManager.activeItem &&
                this._keyManager.activeItem._selectViaInteraction();
          }));
      }
      _resetOptions() {
        let e = Ne(this.options.changes, this._destroy);
        (this.optionSelectionChanges.pipe(z(e)).subscribe((t) => {
          (this._onSelect(t.source, t.isUserInput),
            t.isUserInput && !this.multiple && this._panelOpen && (this.close(), this.focus()));
        }),
          Ne(...this.options.map((t) => t._stateChanges))
            .pipe(z(e))
            .subscribe(() => {
              (this._changeDetectorRef.detectChanges(), this.stateChanges.next());
            }));
      }
      _onSelect(e, t) {
        let n = this._selectionModel.isSelected(e);
        (!this.canSelectNullableOptions && e.value == null && !this._multiple
          ? (e.deselect(),
            this._selectionModel.clear(),
            this.value != null && this._propagateChanges(e.value))
          : (n !== e.selected &&
              (e.selected ? this._selectionModel.select(e) : this._selectionModel.deselect(e)),
            t && this._keyManager.setActiveItem(e),
            this.multiple && (this._sortValues(), t && this.focus())),
          n !== this._selectionModel.isSelected(e) && this._propagateChanges(),
          this.stateChanges.next());
      }
      _sortValues() {
        if (this.multiple) {
          let e = this.options.toArray();
          (this._selectionModel.sort((t, n) =>
            this.sortComparator ? this.sortComparator(t, n, e) : e.indexOf(t) - e.indexOf(n),
          ),
            this.stateChanges.next());
        }
      }
      _propagateChanges(e) {
        let t;
        (this.multiple
          ? (t = this.selected.map((n) => n.value))
          : (t = this.selected ? this.selected.value : e),
          (this._value = t),
          this.valueChange.emit(t),
          this._onChange(t),
          this.selectionChange.emit(this._getChangeEvent(t)),
          this._changeDetectorRef.markForCheck());
      }
      _highlightCorrectOption() {
        if (this._keyManager)
          if (this.empty) {
            let e = -1;
            for (let t = 0; t < this.options.length; t++)
              if (!this.options.get(t).disabled) {
                e = t;
                break;
              }
            this._keyManager.setActiveItem(e);
          } else this._keyManager.setActiveItem(this._selectionModel.selected[0]);
      }
      _canOpen() {
        return !this._panelOpen && !this.disabled && this.options?.length > 0 && !!this._overlayDir;
      }
      focus(e) {
        this._elementRef.nativeElement.focus(e);
      }
      _getPanelAriaLabelledby() {
        if (this.ariaLabel) return null;
        let e = this._parentFormField?.getLabelId() || null,
          t = e ? e + ' ' : '';
        return this.ariaLabelledby ? t + this.ariaLabelledby : e;
      }
      _getAriaActiveDescendant() {
        return this.panelOpen && this._keyManager && this._keyManager.activeItem
          ? this._keyManager.activeItem.id
          : null;
      }
      _getTriggerAriaLabelledby() {
        if (this.ariaLabel) return null;
        let e = this._parentFormField?.getLabelId() || '';
        return (
          this.ariaLabelledby && (e += ' ' + this.ariaLabelledby),
          e || (e = this._valueId),
          e
        );
      }
      get describedByIds() {
        return this._elementRef.nativeElement.getAttribute('aria-describedby')?.split(' ') || [];
      }
      setDescribedByIds(e) {
        let t = this._elementRef.nativeElement;
        e.length
          ? t.setAttribute('aria-describedby', e.join(' '))
          : t.removeAttribute('aria-describedby');
      }
      onContainerClick(e) {
        let t = Be(e);
        (t &&
          (t.tagName === 'MAT-OPTION' ||
            t.classList.contains('cdk-overlay-backdrop') ||
            t.closest('.mat-mdc-select-panel'))) ||
          (this.focus(), this.open());
      }
      get shouldLabelFloat() {
        return this.panelOpen || !this.empty || (this.focused && !!this.placeholder);
      }
      static ɵfac = function (t) {
        return new (t || o)();
      };
      static ɵcmp = B({
        type: o,
        selectors: [['mat-select']],
        contentQueries: function (t, n, r) {
          if ((t & 1 && Dt(r, la, 5)(r, si, 5)(r, Yi, 5), t & 2)) {
            let s;
            (y((s = b())) && (n.customTrigger = s.first),
              y((s = b())) && (n.options = s),
              y((s = b())) && (n.optionGroups = s));
          }
        },
        viewQuery: function (t, n) {
          if ((t & 1 && ae(Qs, 5)(Ks, 5)(Jt, 5), t & 2)) {
            let r;
            (y((r = b())) && (n.trigger = r.first),
              y((r = b())) && (n.panel = r.first),
              y((r = b())) && (n._overlayDir = r.first));
          }
        },
        hostAttrs: ['role', 'combobox', 'aria-haspopup', 'listbox', 1, 'mat-mdc-select'],
        hostVars: 21,
        hostBindings: function (t, n) {
          (t & 1 &&
            I('keydown', function (s) {
              return n._handleKeydown(s);
            })('focus', function () {
              return n._onFocus();
            })('blur', function () {
              return n._onBlur();
            }),
            t & 2 &&
              (A('id', n.id)('tabindex', n.disabled ? -1 : n.tabIndex)(
                'aria-controls',
                n.panelOpen ? n.id + '-panel' : null,
              )('aria-expanded', n.panelOpen)('aria-label', n.ariaLabel || null)(
                'aria-required',
                n.required.toString(),
              )('aria-disabled', n.disabled.toString())('aria-invalid', n.errorState)(
                'aria-activedescendant',
                n._getAriaActiveDescendant(),
              ),
              w('mat-mdc-select-disabled', n.disabled)('mat-mdc-select-invalid', n.errorState)(
                'mat-mdc-select-required',
                n.required,
              )('mat-mdc-select-empty', n.empty)('mat-mdc-select-multiple', n.multiple)(
                'mat-select-open',
                n.panelOpen,
              )));
        },
        inputs: {
          userAriaDescribedBy: [0, 'aria-describedby', 'userAriaDescribedBy'],
          panelClass: 'panelClass',
          disabled: [2, 'disabled', 'disabled', M],
          disableRipple: [2, 'disableRipple', 'disableRipple', M],
          tabIndex: [2, 'tabIndex', 'tabIndex', (e) => (e == null ? 0 : Ve(e))],
          hideSingleSelectionIndicator: [
            2,
            'hideSingleSelectionIndicator',
            'hideSingleSelectionIndicator',
            M,
          ],
          placeholder: 'placeholder',
          required: [2, 'required', 'required', M],
          multiple: [2, 'multiple', 'multiple', M],
          disableOptionCentering: [2, 'disableOptionCentering', 'disableOptionCentering', M],
          compareWith: 'compareWith',
          value: 'value',
          ariaLabel: [0, 'aria-label', 'ariaLabel'],
          ariaLabelledby: [0, 'aria-labelledby', 'ariaLabelledby'],
          errorStateMatcher: 'errorStateMatcher',
          typeaheadDebounceInterval: [
            2,
            'typeaheadDebounceInterval',
            'typeaheadDebounceInterval',
            Ve,
          ],
          sortComparator: 'sortComparator',
          id: 'id',
          panelWidth: 'panelWidth',
          canSelectNullableOptions: [2, 'canSelectNullableOptions', 'canSelectNullableOptions', M],
        },
        outputs: {
          openedChange: 'openedChange',
          _openedStream: 'opened',
          _closedStream: 'closed',
          selectionChange: 'selectionChange',
          valueChange: 'valueChange',
        },
        exportAs: ['matSelect'],
        features: [
          D([
            { provide: qe, useExisting: o },
            { provide: Gi, useExisting: o },
          ]),
          ie,
        ],
        ngContentSelectors: ea,
        decls: 11,
        vars: 9,
        consts: [
          ['fallbackOverlayOrigin', 'cdkOverlayOrigin', 'trigger', ''],
          ['panel', ''],
          ['cdk-overlay-origin', '', 1, 'mat-mdc-select-trigger', 3, 'click'],
          [1, 'mat-mdc-select-value'],
          [1, 'mat-mdc-select-placeholder', 'mat-mdc-select-min-line'],
          [1, 'mat-mdc-select-value-text'],
          [1, 'mat-mdc-select-arrow-wrapper'],
          [1, 'mat-mdc-select-arrow'],
          [
            'viewBox',
            '0 0 24 24',
            'width',
            '24px',
            'height',
            '24px',
            'focusable',
            'false',
            'aria-hidden',
            'true',
          ],
          ['d', 'M7 10l5 5 5-5z'],
          [
            'cdk-connected-overlay',
            '',
            'cdkConnectedOverlayLockPosition',
            '',
            'cdkConnectedOverlayHasBackdrop',
            '',
            'cdkConnectedOverlayBackdropClass',
            'cdk-overlay-transparent-backdrop',
            'cdkConnectedOverlayUsePopover',
            'inline',
            3,
            'detach',
            'backdropClick',
            'overlayKeydown',
            'cdkConnectedOverlayDisableClose',
            'cdkConnectedOverlayPanelClass',
            'cdkConnectedOverlayScrollStrategy',
            'cdkConnectedOverlayOrigin',
            'cdkConnectedOverlayPositions',
            'cdkConnectedOverlayWidth',
            'cdkConnectedOverlayFlexibleDimensions',
          ],
          [1, 'mat-mdc-select-min-line'],
          ['role', 'listbox', 'tabindex', '-1', 3, 'keydown', 'ngClass'],
        ],
        template: function (t, n) {
          if (t & 1) {
            let r = ke();
            (Oe(Js),
              p(0, 'div', 2, 0),
              I('click', function () {
                return (le(r), de(n.open()));
              }),
              p(3, 'div', 3),
              F(4, ta, 2, 1, 'span', 4)(5, na, 3, 1, 'span', 5),
              v(),
              p(6, 'div', 6)(7, 'div', 7),
              Ke(),
              p(8, 'svg', 8),
              Z(9, 'path', 9),
              v()()()(),
              xe(10, ra, 3, 10, 'ng-template', 10),
              I('detach', function () {
                return (le(r), de(n.close()));
              })('backdropClick', function () {
                return (le(r), de(n.close()));
              })('overlayKeydown', function (l) {
                return (le(r), de(n._handleOverlayKeydown(l)));
              }));
          }
          if (t & 2) {
            let r = Ae(1);
            (m(3),
              A('id', n._valueId),
              m(),
              V(n.empty ? 4 : 5),
              m(6),
              T('cdkConnectedOverlayDisableClose', !0)(
                'cdkConnectedOverlayPanelClass',
                n._overlayPanelClass,
              )('cdkConnectedOverlayScrollStrategy', n._scrollStrategy)(
                'cdkConnectedOverlayOrigin',
                n._preferredOverlayOrigin || r,
              )('cdkConnectedOverlayPositions', n._positions)(
                'cdkConnectedOverlayWidth',
                n._overlayWidth,
              )('cdkConnectedOverlayFlexibleDimensions', !0));
          }
        },
        dependencies: [Xe, Jt, Ot],
        styles: [
          `@keyframes _mat-select-enter{from{opacity:0;transform:scaleY(0.8)}to{opacity:1;transform:none}}@keyframes _mat-select-exit{from{opacity:1}to{opacity:0}}.mat-mdc-select{display:inline-block;width:100%;outline:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));font-family:var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));line-height:var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking))}div.mat-mdc-select-panel{box-shadow:var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-select-disabled{color:var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-select-disabled .mat-mdc-select-placeholder{color:var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{height:24px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper{transform:none}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after{color:var(--mat-select-invalid-arrow-color, var(--mat-sys-error))}.mat-mdc-select-arrow{width:10px;height:5px;position:relative;color:var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant))}.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow{color:var(--mat-select-focused-arrow-color, var(--mat-sys-primary))}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow{color:var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-select-open .mat-mdc-select-arrow{transform:rotate(180deg)}.mat-form-field-animations-enabled .mat-mdc-select-arrow{transition:transform 80ms linear}.mat-mdc-select-arrow svg{fill:currentColor;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}@media(forced-colors: active){.mat-mdc-select-arrow svg{fill:CanvasText}.mat-mdc-select-disabled .mat-mdc-select-arrow svg{fill:GrayText}}div.mat-mdc-select-panel{width:100%;max-height:275px;outline:0;overflow:auto;padding:8px 0;border-radius:4px;box-sizing:border-box;position:relative;background-color:var(--mat-select-panel-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-select-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) div.mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above div.mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}.mat-select-panel-animations-enabled{animation:_mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1)}.mat-select-panel-animations-enabled.mat-select-panel-exit{animation:_mat-select-exit 100ms linear}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);color:var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant))}.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder,._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper{cursor:pointer}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label{max-width:calc(100% - 18px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 24px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch{max-width:calc(100% - 24px)}.mat-mdc-select-min-line:empty::before{content:" ";white-space:pre;width:1px;display:inline-block;visibility:hidden}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:var(--mat-select-arrow-transform, translateY(-8px))}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return o;
  })();
var Bh = (() => {
  class o {
    static ɵfac = function (t) {
      return new (t || o)();
    };
    static ɵmod = O({ type: o });
    static ɵinj = k({ imports: [vt, Ui, W, tt, yt, Ui] });
  }
  return o;
})();
export {
  lr as a,
  bi as b,
  it as c,
  ht as d,
  Go as e,
  me as f,
  We as g,
  K as h,
  Wa as i,
  Ga as j,
  Ye as k,
  ut as l,
  lt as m,
  Vr as n,
  Ua as o,
  Ir as p,
  Tr as q,
  cn as r,
  Hr as s,
  mt as t,
  Gr as u,
  Ur as v,
  qr as w,
  Xa as x,
  qa as y,
  $a as z,
  _n as A,
  Sn as B,
  Te as C,
  pt as D,
  Fn as E,
  $t as F,
  _t as G,
  Vn as H,
  gt as I,
  In as J,
  vt as K,
  as as L,
  _d as M,
  ti as N,
  $n as O,
  ii as P,
  Zn as Q,
  Qn as R,
  qe as S,
  $e as T,
  Jn as U,
  ji as V,
  oi as W,
  Ze as X,
  yt as Y,
  Dc as Z,
  Mc as _,
  Bc as $,
  Hc as aa,
  si as ba,
  Ui as ca,
  Lh as da,
  Bh as ea,
};
