import {
  Bd as U,
  Fa as C,
  H as v,
  I as y,
  Mc as H,
  Sa as z,
  Ua as M,
  Ud as Z,
  V as E,
  Va as W,
  Vd as F,
  Ya as R,
  Yd as d,
  Z as x,
  Za as V,
  Zd as G,
  _d as h,
  bb as p,
  cb as _,
  da as u,
  ea as f,
  fb as S,
  ga as k,
  i as g,
  ia as s,
  j as I,
  k as a,
  ka as B,
  pd as P,
  q as j,
  qa as O,
  ra as w,
  ua as L,
  va as c,
} from './chunk-GV4MRAZ3.js';
var $ = class {};
function ie(r) {
  return r && typeof r.connect == 'function' && !(r instanceof I);
}
var K = (function (r) {
    return (
      (r[(r.REPLACED = 0)] = 'REPLACED'),
      (r[(r.INSERTED = 1)] = 'INSERTED'),
      (r[(r.MOVED = 2)] = 'MOVED'),
      (r[(r.REMOVED = 3)] = 'REMOVED'),
      r
    );
  })(K || {}),
  se = new k('_ViewRepeater');
var J = 20,
  ee = (() => {
    class r {
      _ngZone = s(c);
      _platform = s(P);
      _renderer = s(M).createRenderer(null, null);
      _cleanupGlobalListener;
      constructor() {}
      _scrolled = new a();
      _scrolledCount = 0;
      scrollContainers = new Map();
      register(e) {
        this.scrollContainers.has(e) ||
          this.scrollContainers.set(
            e,
            e.elementScrolled().subscribe(() => this._scrolled.next(e)),
          );
      }
      deregister(e) {
        let t = this.scrollContainers.get(e);
        t && (t.unsubscribe(), this.scrollContainers.delete(e));
      }
      scrolled(e = J) {
        return this._platform.isBrowser
          ? new g((t) => {
              this._cleanupGlobalListener ||
                (this._cleanupGlobalListener = this._ngZone.runOutsideAngular(() =>
                  this._renderer.listen('document', 'scroll', () => this._scrolled.next()),
                ));
              let n = e > 0 ? this._scrolled.pipe(y(e)).subscribe(t) : this._scrolled.subscribe(t);
              return (
                this._scrolledCount++,
                () => {
                  (n.unsubscribe(),
                    this._scrolledCount--,
                    this._scrolledCount ||
                      (this._cleanupGlobalListener?.(), (this._cleanupGlobalListener = void 0)));
                }
              );
            })
          : j();
      }
      ngOnDestroy() {
        (this._cleanupGlobalListener?.(),
          (this._cleanupGlobalListener = void 0),
          this.scrollContainers.forEach((e, t) => this.deregister(t)),
          this._scrolled.complete());
      }
      ancestorScrolled(e, t) {
        let n = this.getAncestorScrollContainers(e);
        return this.scrolled(t).pipe(v((o) => !o || n.indexOf(o) > -1));
      }
      getAncestorScrollContainers(e) {
        let t = [];
        return (
          this.scrollContainers.forEach((n, o) => {
            this._scrollableContainsElement(o, e) && t.push(o);
          }),
          t
        );
      }
      _scrollableContainsElement(e, t) {
        let n = U(t),
          o = e.getElementRef().nativeElement;
        do if (n == o) return !0;
        while ((n = n.parentElement));
        return !1;
      }
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵprov = u({ token: r, factory: r.ɵfac, providedIn: 'root' });
    }
    return r;
  })(),
  nt = (() => {
    class r {
      elementRef = s(C);
      scrollDispatcher = s(ee);
      ngZone = s(c);
      dir = s(Z, { optional: !0 });
      _scrollElement = this.elementRef.nativeElement;
      _destroyed = new a();
      _renderer = s(W);
      _cleanupScroll;
      _elementScrolled = new a();
      constructor() {}
      ngOnInit() {
        ((this._cleanupScroll = this.ngZone.runOutsideAngular(() =>
          this._renderer.listen(this._scrollElement, 'scroll', (e) =>
            this._elementScrolled.next(e),
          ),
        )),
          this.scrollDispatcher.register(this));
      }
      ngOnDestroy() {
        (this._cleanupScroll?.(),
          this._elementScrolled.complete(),
          this.scrollDispatcher.deregister(this),
          this._destroyed.next(),
          this._destroyed.complete());
      }
      elementScrolled() {
        return this._elementScrolled;
      }
      getElementRef() {
        return this.elementRef;
      }
      scrollTo(e) {
        let t = this.elementRef.nativeElement,
          n = this.dir && this.dir.value == 'rtl';
        (e.left == null && (e.left = n ? e.end : e.start),
          e.right == null && (e.right = n ? e.start : e.end),
          e.bottom != null && (e.top = t.scrollHeight - t.clientHeight - e.bottom),
          n && h() != d.NORMAL
            ? (e.left != null && (e.right = t.scrollWidth - t.clientWidth - e.left),
              h() == d.INVERTED
                ? (e.left = e.right)
                : h() == d.NEGATED && (e.left = e.right ? -e.right : e.right))
            : e.right != null && (e.left = t.scrollWidth - t.clientWidth - e.right),
          this._applyScrollToOptions(e));
      }
      _applyScrollToOptions(e) {
        let t = this.elementRef.nativeElement;
        G()
          ? t.scrollTo(e)
          : (e.top != null && (t.scrollTop = e.top), e.left != null && (t.scrollLeft = e.left));
      }
      measureScrollOffset(e) {
        let t = 'left',
          n = 'right',
          o = this.elementRef.nativeElement;
        if (e == 'top') return o.scrollTop;
        if (e == 'bottom') return o.scrollHeight - o.clientHeight - o.scrollTop;
        let l = this.dir && this.dir.value == 'rtl';
        return (
          e == 'start' ? (e = l ? n : t) : e == 'end' && (e = l ? t : n),
          l && h() == d.INVERTED
            ? e == t
              ? o.scrollWidth - o.clientWidth - o.scrollLeft
              : o.scrollLeft
            : l && h() == d.NEGATED
              ? e == t
                ? o.scrollLeft + o.scrollWidth - o.clientWidth
                : -o.scrollLeft
              : e == t
                ? o.scrollLeft
                : o.scrollWidth - o.clientWidth - o.scrollLeft
        );
      }
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵdir = _({
        type: r,
        selectors: [
          ['', 'cdk-scrollable', ''],
          ['', 'cdkScrollable', ''],
        ],
      });
    }
    return r;
  })(),
  te = 20,
  ot = (() => {
    class r {
      _platform = s(P);
      _listeners;
      _viewportSize;
      _change = new a();
      _document = s(w);
      constructor() {
        let e = s(c),
          t = s(M).createRenderer(null, null);
        e.runOutsideAngular(() => {
          if (this._platform.isBrowser) {
            let n = (o) => this._change.next(o);
            this._listeners = [
              t.listen('window', 'resize', n),
              t.listen('window', 'orientationchange', n),
            ];
          }
          this.change().subscribe(() => (this._viewportSize = null));
        });
      }
      ngOnDestroy() {
        (this._listeners?.forEach((e) => e()), this._change.complete());
      }
      getViewportSize() {
        this._viewportSize || this._updateViewportSize();
        let e = { width: this._viewportSize.width, height: this._viewportSize.height };
        return (this._platform.isBrowser || (this._viewportSize = null), e);
      }
      getViewportRect() {
        let e = this.getViewportScrollPosition(),
          { width: t, height: n } = this.getViewportSize();
        return {
          top: e.top,
          left: e.left,
          bottom: e.top + n,
          right: e.left + t,
          height: n,
          width: t,
        };
      }
      getViewportScrollPosition() {
        if (!this._platform.isBrowser) return { top: 0, left: 0 };
        let e = this._document,
          t = this._getWindow(),
          n = e.documentElement,
          o = n.getBoundingClientRect(),
          l = -o.top || e.body.scrollTop || t.scrollY || n.scrollTop || 0,
          X = -o.left || e.body.scrollLeft || t.scrollX || n.scrollLeft || 0;
        return { top: l, left: X };
      }
      change(e = te) {
        return e > 0 ? this._change.pipe(y(e)) : this._change;
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _updateViewportSize() {
        let e = this._getWindow();
        this._viewportSize = this._platform.isBrowser
          ? { width: e.innerWidth, height: e.innerHeight }
          : { width: 0, height: 0 };
      }
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵprov = u({ token: r, factory: r.ɵfac, providedIn: 'root' });
    }
    return r;
  })();
var Y = (() => {
    class r {
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵmod = p({ type: r });
      static ɵinj = f({});
    }
    return r;
  })(),
  st = (() => {
    class r {
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵmod = p({ type: r });
      static ɵinj = f({ imports: [F, Y, F, Y] });
    }
    return r;
  })();
var T = class {
    _box;
    _destroyed = new a();
    _resizeSubject = new a();
    _resizeObserver;
    _elementObservables = new Map();
    constructor(i) {
      ((this._box = i),
        typeof ResizeObserver < 'u' &&
          (this._resizeObserver = new ResizeObserver((e) => this._resizeSubject.next(e))));
    }
    observe(i) {
      return (
        this._elementObservables.has(i) ||
          this._elementObservables.set(
            i,
            new g((e) => {
              let t = this._resizeSubject.subscribe(e);
              return (
                this._resizeObserver?.observe(i, { box: this._box }),
                () => {
                  (this._resizeObserver?.unobserve(i),
                    t.unsubscribe(),
                    this._elementObservables.delete(i));
                }
              );
            }).pipe(
              v((e) => e.some((t) => t.target === i)),
              E({ bufferSize: 1, refCount: !0 }),
              x(this._destroyed),
            ),
          ),
        this._elementObservables.get(i)
      );
    }
    destroy() {
      (this._destroyed.next(),
        this._destroyed.complete(),
        this._resizeSubject.complete(),
        this._elementObservables.clear());
    }
  },
  ft = (() => {
    class r {
      _cleanupErrorListener;
      _observers = new Map();
      _ngZone = s(c);
      constructor() {
        typeof ResizeObserver < 'u';
      }
      ngOnDestroy() {
        for (let [, e] of this._observers) e.destroy();
        (this._observers.clear(), this._cleanupErrorListener?.());
      }
      observe(e, t) {
        let n = t?.box || 'content-box';
        return (
          this._observers.has(n) || this._observers.set(n, new T(n)),
          this._observers.get(n).observe(e)
        );
      }
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵprov = u({ token: r, factory: r.ɵfac, providedIn: 'root' });
    }
    return r;
  })();
var m = class {
    _attachedHost;
    attach(i) {
      return ((this._attachedHost = i), i.attach(this));
    }
    detach() {
      let i = this._attachedHost;
      i != null && ((this._attachedHost = null), i.detach());
    }
    get isAttached() {
      return this._attachedHost != null;
    }
    setAttachedHost(i) {
      this._attachedHost = i;
    }
  },
  N = class extends m {
    component;
    viewContainerRef;
    injector;
    projectableNodes;
    constructor(i, e, t, n) {
      (super(),
        (this.component = i),
        (this.viewContainerRef = e),
        (this.injector = t),
        (this.projectableNodes = n));
    }
  },
  b = class extends m {
    templateRef;
    viewContainerRef;
    context;
    injector;
    constructor(i, e, t, n) {
      (super(),
        (this.templateRef = i),
        (this.viewContainerRef = e),
        (this.context = t),
        (this.injector = n));
    }
    get origin() {
      return this.templateRef.elementRef;
    }
    attach(i, e = this.context) {
      return ((this.context = e), super.attach(i));
    }
    detach() {
      return ((this.context = void 0), super.detach());
    }
  },
  A = class extends m {
    element;
    constructor(i) {
      (super(), (this.element = i instanceof C ? i.nativeElement : i));
    }
  },
  D = class {
    _attachedPortal;
    _disposeFn;
    _isDisposed = !1;
    hasAttached() {
      return !!this._attachedPortal;
    }
    attach(i) {
      if (i instanceof N) return ((this._attachedPortal = i), this.attachComponentPortal(i));
      if (i instanceof b) return ((this._attachedPortal = i), this.attachTemplatePortal(i));
      if (this.attachDomPortal && i instanceof A)
        return ((this._attachedPortal = i), this.attachDomPortal(i));
    }
    attachDomPortal = null;
    detach() {
      (this._attachedPortal &&
        (this._attachedPortal.setAttachedHost(null), (this._attachedPortal = null)),
        this._invokeDisposeFn());
    }
    dispose() {
      (this.hasAttached() && this.detach(), this._invokeDisposeFn(), (this._isDisposed = !0));
    }
    setDisposeFn(i) {
      this._disposeFn = i;
    }
    _invokeDisposeFn() {
      this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
    }
  },
  Q = class extends D {
    outletElement;
    _appRef;
    _defaultInjector;
    constructor(i, e, t) {
      (super(), (this.outletElement = i), (this._appRef = e), (this._defaultInjector = t));
    }
    attachComponentPortal(i) {
      let e;
      if (i.viewContainerRef) {
        let t = i.injector || i.viewContainerRef.injector,
          n = t.get(V, null, { optional: !0 }) || void 0;
        ((e = i.viewContainerRef.createComponent(i.component, {
          index: i.viewContainerRef.length,
          injector: t,
          ngModuleRef: n,
          projectableNodes: i.projectableNodes || void 0,
        })),
          this.setDisposeFn(() => e.destroy()));
      } else {
        let t = this._appRef,
          n = i.injector || this._defaultInjector || O.NULL,
          o = n.get(B, t.injector);
        ((e = H(i.component, {
          elementInjector: n,
          environmentInjector: o,
          projectableNodes: i.projectableNodes || void 0,
        })),
          t.attachView(e.hostView),
          this.setDisposeFn(() => {
            (t.viewCount > 0 && t.detachView(e.hostView), e.destroy());
          }));
      }
      return (
        this.outletElement.appendChild(this._getComponentRootNode(e)),
        (this._attachedPortal = i),
        e
      );
    }
    attachTemplatePortal(i) {
      let e = i.viewContainerRef,
        t = e.createEmbeddedView(i.templateRef, i.context, { injector: i.injector });
      return (
        t.rootNodes.forEach((n) => this.outletElement.appendChild(n)),
        t.detectChanges(),
        this.setDisposeFn(() => {
          let n = e.indexOf(t);
          n !== -1 && e.remove(n);
        }),
        (this._attachedPortal = i),
        t
      );
    }
    attachDomPortal = (i) => {
      let e = i.element;
      e.parentNode;
      let t = this.outletElement.ownerDocument.createComment('dom-portal');
      (e.parentNode.insertBefore(t, e),
        this.outletElement.appendChild(e),
        (this._attachedPortal = i),
        super.setDisposeFn(() => {
          t.parentNode && t.parentNode.replaceChild(e, t);
        }));
    };
    dispose() {
      (super.dispose(), this.outletElement.remove());
    }
    _getComponentRootNode(i) {
      return i.hostView.rootNodes[0];
    }
  },
  Ct = (() => {
    class r extends b {
      constructor() {
        let e = s(z),
          t = s(R);
        super(e, t);
      }
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵdir = _({
        type: r,
        selectors: [['', 'cdkPortal', '']],
        exportAs: ['cdkPortal'],
        features: [S],
      });
    }
    return r;
  })(),
  Rt = (() => {
    class r extends D {
      _moduleRef = s(V, { optional: !0 });
      _document = s(w);
      _viewContainerRef = s(R);
      _isInitialized = !1;
      _attachedRef;
      constructor() {
        super();
      }
      get portal() {
        return this._attachedPortal;
      }
      set portal(e) {
        (this.hasAttached() && !e && !this._isInitialized) ||
          (this.hasAttached() && super.detach(),
          e && super.attach(e),
          (this._attachedPortal = e || null));
      }
      attached = new L();
      get attachedRef() {
        return this._attachedRef;
      }
      ngOnInit() {
        this._isInitialized = !0;
      }
      ngOnDestroy() {
        (super.dispose(), (this._attachedRef = this._attachedPortal = null));
      }
      attachComponentPortal(e) {
        e.setAttachedHost(this);
        let t = e.viewContainerRef != null ? e.viewContainerRef : this._viewContainerRef,
          n = t.createComponent(e.component, {
            index: t.length,
            injector: e.injector || t.injector,
            projectableNodes: e.projectableNodes || void 0,
            ngModuleRef: this._moduleRef || void 0,
          });
        return (
          t !== this._viewContainerRef && this._getRootNode().appendChild(n.hostView.rootNodes[0]),
          super.setDisposeFn(() => n.destroy()),
          (this._attachedPortal = e),
          (this._attachedRef = n),
          this.attached.emit(n),
          n
        );
      }
      attachTemplatePortal(e) {
        e.setAttachedHost(this);
        let t = this._viewContainerRef.createEmbeddedView(e.templateRef, e.context, {
          injector: e.injector,
        });
        return (
          super.setDisposeFn(() => this._viewContainerRef.clear()),
          (this._attachedPortal = e),
          (this._attachedRef = t),
          this.attached.emit(t),
          t
        );
      }
      attachDomPortal = (e) => {
        let t = e.element;
        t.parentNode;
        let n = this._document.createComment('dom-portal');
        (e.setAttachedHost(this),
          t.parentNode.insertBefore(n, t),
          this._getRootNode().appendChild(t),
          (this._attachedPortal = e),
          super.setDisposeFn(() => {
            n.parentNode && n.parentNode.replaceChild(t, n);
          }));
      };
      _getRootNode() {
        let e = this._viewContainerRef.element.nativeElement;
        return e.nodeType === e.ELEMENT_NODE ? e : e.parentNode;
      }
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵdir = _({
        type: r,
        selectors: [['', 'cdkPortalOutlet', '']],
        inputs: { portal: [0, 'cdkPortalOutlet', 'portal'] },
        outputs: { attached: 'attached' },
        exportAs: ['cdkPortalOutlet'],
        features: [S],
      });
    }
    return r;
  })(),
  St = (() => {
    class r {
      static ɵfac = function (t) {
        return new (t || r)();
      };
      static ɵmod = p({ type: r });
      static ɵinj = f({});
    }
    return r;
  })();
export {
  $ as a,
  ie as b,
  K as c,
  se as d,
  ee as e,
  nt as f,
  ot as g,
  Y as h,
  st as i,
  ft as j,
  N as k,
  b as l,
  D as m,
  Q as n,
  Ct as o,
  Rt as p,
  St as q,
};
