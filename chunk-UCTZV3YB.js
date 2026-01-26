import {
  a as P,
  b as Te,
  da as Ie,
  ga as G,
  ia as he,
  jd as Ce,
  w as de,
} from './chunk-GV4MRAZ3.js';
var qi = new G('CUSTOMER_SRI_HTTP_TOKEN'),
  Se = new G('COMPANY_CUSTOMER_MAPPER'),
  Li = new G('COMPANY_CUSTOMER_FORM_CONFIG'),
  Hi = new G('COMPANY_CUSTOMER_HTTP_TOKEN');
var ie = class {
  tipoIdentificacion = [];
  tipoContribuyentes = [];
  tiempoCreditos = [];
  ciudades = [];
  tiposCliente = [];
  empresas = [];
  cargos = [];
  formasPagoSri = [];
  housingTypes = [];
  maritalStatuses = [];
  employees = [];
};
var te = class {
  toModelFormData(e) {
    let t = new ie();
    if (e.code === '1') {
      let n = JSON.parse(e.payload);
      (console.log(n),
        (t.tipoIdentificacion = n[0]),
        (t.tipoContribuyentes = n[1]),
        (t.tiempoCreditos = n[2] || []));
      let r = n[3];
      ((t.ciudades = r.reduce((s, o) => {
        let u = s.find((l) => l.idProvincia === o.idProvincia);
        return (
          u
            ? u.ciudades.push({ idCiudad: o.idCiudad, nombre: o.ciudad })
            : s.push({
                idProvincia: o.idProvincia,
                nombre: o.provincia,
                ciudades: [{ idCiudad: o.idCiudad, nombre: o.ciudad }],
              }),
          s
        );
      }, [])),
        (t.tiposCliente = n[4] || []),
        (t.empresas = n[5] || []),
        (t.cargos = n[6] || []),
        (t.formasPagoSri = n[7] || []),
        (t.housingTypes = n[8] || []),
        (t.maritalStatuses = n[9] || []),
        (t.employees = n[10] || []));
    }
    return t;
  }
  toModel(e) {
    return {
      name: `Esto de mapper default - ${e.name}`,
      id: e.id,
      idCliente: e.id_cliente,
      idEmpresa: e.id_empresa,
      idCargo: e.id_cargo,
      idFormaPagoSri: e.id_forma_pago_sri,
      idTipoClienteProveedor: e.id_tipo_cliente_proveedor,
      idTipoIdentificacion: e.id_tipo_identificacion,
      idSubContribuyente: e.id_sub_contribuyente,
      idTiempoCredito: e.id_tiempo_credito,
      idCiudad: e.id_ciudad,
      idEmpleado: e.id_empleado,
      numeroIdentificacion: e.numero_identificacion,
      nombreFiscal: e.nombre_fiscal,
      nombreComercial: e.nombre_comercial,
      direccion: e.direccion,
      correo: e.correo,
      telefono: e.telefono,
      placa: e.placa,
      nota: e.nota,
      birthDate: e.birth_date ? new Date(e.birth_date) : null,
      estado: e.estado,
      validationSri: e.validation_sri,
      configValorBruto: e.config_valor_bruto,
      dataInfoCred: e.data_info_cred
        ? {
            maritalStatusId: e.data_info_cred.marital_status_id,
            conyugeNombre: e.data_info_cred.conyuge_nombre,
            conyugeTel: e.data_info_cred.conyuge_tel,
            refFamNombre: e.data_info_cred.ref_fam_nombre,
            refFamTel: e.data_info_cred.ref_fam_tel,
            housingTypeId: e.data_info_cred.housing_type_id,
            dirVivienda: e.data_info_cred.dir_vivienda,
            refDomicilio: e.data_info_cred.ref_domicilio,
            sector: e.data_info_cred.sector,
            barrio: e.data_info_cred.barrio,
            calle: e.data_info_cred.calle,
          }
        : void 0,
    };
  }
  toModelList(e) {
    let t = JSON.parse(e.payload),
      n = Array.isArray(t) ? t[0] : t.Table;
    console.log(n);
    let r = (u, l) => ({
        index: l + 1,
        clientId: u.idCliente,
        identificationTypeId: u.idTipoIdentificacion,
        idCard: u.numeroIdentificacion,
        tradeName: u.nombreComercial,
        legalName: u.nombreFiscal,
        address: u.direccion,
        phone: u.telefono,
        email: u.correo,
        finalConsumer: u.consumidorFinal,
        sriValidation: u.validationSri,
        identificationType: u.tipoIdentificacion,
        identificationTypeCode: u.codTipoIdentificacion,
        status: u.estado,
        totalRecords: u.totalRecords,
      }),
      s = n.map((u, l) => r(u, l)),
      o = e.totalRecords ?? (s[0]?.totalRecords || 0);
    return { data: s, pagination: { totalRecords: o } };
  }
  toCreateDTO(e) {
    return {
      id_tipo_identificacion: e.idTipoIdentificacion,
      numero_identificacion: e.numeroIdentificacion,
      nombre_fiscal: e.nombreFiscal,
      nombre_comercial: e.nombreComercial,
      direccion: e.direccion,
      correo: e.correo,
      telefono: e.telefono,
      placa: e.placa,
      nota: e.nota,
      birth_date: e.birthDate?.toISOString(),
      estado: e.estado,
      validation_sri: e.validationSri,
      config_valor_bruto: e.configValorBruto,
      id_forma_pago_sri: e.idFormaPagoSri,
      id_tipo_cliente_proveedor: e.idTipoClienteProveedor,
      id_sub_contribuyente: e.idSubContribuyente,
      id_tiempo_credito: e.idTiempoCredito,
      id_ciudad: e.idCiudad,
      id_cargo: e.idCargo,
      id_empleado: e.idEmpleado,
      data_info_cred: e.dataInfoCred
        ? {
            marital_status_id: e.dataInfoCred.maritalStatusId,
            conyuge_nombre: e.dataInfoCred.conyugeNombre,
            conyuge_tel: e.dataInfoCred.conyugeTel,
            ref_fam_nombre: e.dataInfoCred.refFamNombre,
            ref_fam_tel: e.dataInfoCred.refFamTel,
            housing_type_id: e.dataInfoCred.housingTypeId,
            dir_vivienda: e.dataInfoCred.dirVivienda,
            ref_domicilio: e.dataInfoCred.refDomicilio,
            sector: e.dataInfoCred.sector,
            barrio: e.dataInfoCred.barrio,
            calle: e.dataInfoCred.calle,
          }
        : null,
    };
  }
  toUpdateDTO(e) {
    return P({ id: e.id }, this.toCreateDTO(e));
  }
};
var _e = class i {
  apiUrl = '/FactElect/CompanyCustomer/';
  http = he(Ce);
  mapper = he(Se, { optional: !0 }) ?? new te();
  getFormData() {
    let e = JSON.stringify({ tipo: 2 });
    return this.http
      .get(`${this.apiUrl}?json=${e}`)
      .pipe(de((t) => this.mapper.toModelFormData(t)));
  }
  list(e) {
    console.log(e);
    let t = JSON.stringify(
      P({ pageIndex: e.pageIndex || 1, pageSize: e.pageSize || 10, tipo: 1 }, e),
    );
    return this.http.get(`${this.apiUrl}?json=${t}`).pipe(de((n) => this.mapper.toModelList(n)));
  }
  create(e) {
    return this.http.post(this.apiUrl, e);
  }
  update(e, t) {
    return this.http.put(`${this.apiUrl}/${e}`, t);
  }
  getById(e) {
    return this.http.get(`${this.apiUrl}/${e}`);
  }
  search(e) {
    return this.http.get(`${this.apiUrl}/search?q=${e}`);
  }
  validate(e) {
    let t = {};
    return (
      (!e.email || !this.isValidEmail(e.email)) && (t.email = 'Email inv\xE1lido'),
      e.phone && !this.isValidPhone(e.phone) && (t.phone = 'Tel\xE9fono inv\xE1lido'),
      Object.keys(t).length > 0 ? t : null
    );
  }
  isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }
  isValidPhone(e) {
    return /^\d{10}$/.test(e.replace(/\D/g, ''));
  }
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵprov = Ie({ token: i, factory: i.ɵfac, providedIn: 'root' });
};
var nt = (i) => {
  let e = i;
  return (typeof i == 'string' && (e = i.trim()), ['', null, void 0, 0].includes(e) ? null : e);
};
var V = 9e15,
  Z = 1e9,
  ge = '0123456789abcdef',
  se =
    '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
  oe =
    '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
  be = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -V,
    maxE: V,
    crypto: !1,
  },
  Ue,
  L,
  b = !0,
  ae = '[DecimalError] ',
  B = ae + 'Invalid argument: ',
  Fe = ae + 'Precision limit exceeded',
  Ae = ae + 'crypto unavailable',
  Re = '[object Decimal]',
  M = Math.floor,
  I = Math.pow,
  Be = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  Ze = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  Ke = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  Pe = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  x = 1e7,
  g = 7,
  Ve = 9007199254740991,
  je = se.length - 1,
  De = oe.length - 1,
  p = { toStringTag: Re };
p.absoluteValue = p.abs = function () {
  var i = new this.constructor(this);
  return (i.s < 0 && (i.s = 1), h(i));
};
p.ceil = function () {
  return h(new this.constructor(this), this.e + 1, 2);
};
p.clampedTo = p.clamp = function (i, e) {
  var t,
    n = this,
    r = n.constructor;
  if (((i = new r(i)), (e = new r(e)), !i.s || !e.s)) return new r(NaN);
  if (i.gt(e)) throw Error(B + e);
  return ((t = n.cmp(i)), t < 0 ? i : n.cmp(e) > 0 ? e : new r(n));
};
p.comparedTo = p.cmp = function (i) {
  var e,
    t,
    n,
    r,
    s = this,
    o = s.d,
    u = (i = new s.constructor(i)).d,
    l = s.s,
    a = i.s;
  if (!o || !u) return !l || !a ? NaN : l !== a ? l : o === u ? 0 : !o ^ (l < 0) ? 1 : -1;
  if (!o[0] || !u[0]) return o[0] ? l : u[0] ? -a : 0;
  if (l !== a) return l;
  if (s.e !== i.e) return (s.e > i.e) ^ (l < 0) ? 1 : -1;
  for (n = o.length, r = u.length, e = 0, t = n < r ? n : r; e < t; ++e)
    if (o[e] !== u[e]) return (o[e] > u[e]) ^ (l < 0) ? 1 : -1;
  return n === r ? 0 : (n > r) ^ (l < 0) ? 1 : -1;
};
p.cosine = p.cos = function () {
  var i,
    e,
    t = this,
    n = t.constructor;
  return t.d
    ? t.d[0]
      ? ((i = n.precision),
        (e = n.rounding),
        (n.precision = i + Math.max(t.e, t.sd()) + g),
        (n.rounding = 1),
        (t = We(n, Le(n, t))),
        (n.precision = i),
        (n.rounding = e),
        h(L == 2 || L == 3 ? t.neg() : t, i, e, !0))
      : new n(1)
    : new n(NaN);
};
p.cubeRoot = p.cbrt = function () {
  var i,
    e,
    t,
    n,
    r,
    s,
    o,
    u,
    l,
    a,
    c = this,
    f = c.constructor;
  if (!c.isFinite() || c.isZero()) return new f(c);
  for (
    b = !1,
      s = c.s * I(c.s * c, 1 / 3),
      !s || Math.abs(s) == 1 / 0
        ? ((t = S(c.d)),
          (i = c.e),
          (s = (i - t.length + 1) % 3) && (t += s == 1 || s == -2 ? '0' : '00'),
          (s = I(t, 1 / 3)),
          (i = M((i + 1) / 3) - (i % 3 == (i < 0 ? -1 : 2))),
          s == 1 / 0
            ? (t = '5e' + i)
            : ((t = s.toExponential()), (t = t.slice(0, t.indexOf('e') + 1) + i)),
          (n = new f(t)),
          (n.s = c.s))
        : (n = new f(s.toString())),
      o = (i = f.precision) + 3;
    ;
  )
    if (
      ((u = n),
      (l = u.times(u).times(u)),
      (a = l.plus(c)),
      (n = v(a.plus(c).times(u), a.plus(l), o + 2, 1)),
      S(u.d).slice(0, o) === (t = S(n.d)).slice(0, o))
    )
      if (((t = t.slice(o - 3, o + 1)), t == '9999' || (!r && t == '4999'))) {
        if (!r && (h(u, i + 1, 0), u.times(u).times(u).eq(c))) {
          n = u;
          break;
        }
        ((o += 4), (r = 1));
      } else {
        (!+t || (!+t.slice(1) && t.charAt(0) == '5')) &&
          (h(n, i + 1, 1), (e = !n.times(n).times(n).eq(c)));
        break;
      }
  return ((b = !0), h(n, i, f.rounding, e));
};
p.decimalPlaces = p.dp = function () {
  var i,
    e = this.d,
    t = NaN;
  if (e) {
    if (((i = e.length - 1), (t = (i - M(this.e / g)) * g), (i = e[i]), i))
      for (; i % 10 == 0; i /= 10) t--;
    t < 0 && (t = 0);
  }
  return t;
};
p.dividedBy = p.div = function (i) {
  return v(this, new this.constructor(i));
};
p.dividedToIntegerBy = p.divToInt = function (i) {
  var e = this,
    t = e.constructor;
  return h(v(e, new t(i), 0, 1, 1), t.precision, t.rounding);
};
p.equals = p.eq = function (i) {
  return this.cmp(i) === 0;
};
p.floor = function () {
  return h(new this.constructor(this), this.e + 1, 3);
};
p.greaterThan = p.gt = function (i) {
  return this.cmp(i) > 0;
};
p.greaterThanOrEqualTo = p.gte = function (i) {
  var e = this.cmp(i);
  return e == 1 || e === 0;
};
p.hyperbolicCosine = p.cosh = function () {
  var i,
    e,
    t,
    n,
    r,
    s = this,
    o = s.constructor,
    u = new o(1);
  if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);
  if (s.isZero()) return u;
  ((t = o.precision),
    (n = o.rounding),
    (o.precision = t + Math.max(s.e, s.sd()) + 4),
    (o.rounding = 1),
    (r = s.d.length),
    r < 32
      ? ((i = Math.ceil(r / 3)), (e = (1 / ce(4, i)).toString()))
      : ((i = 16), (e = '2.3283064365386962890625e-10')),
    (s = j(o, 1, s.times(e), new o(1), !0)));
  for (var l, a = i, c = new o(8); a--; )
    ((l = s.times(s)), (s = u.minus(l.times(c.minus(l.times(c))))));
  return h(s, (o.precision = t), (o.rounding = n), !0);
};
p.hyperbolicSine = p.sinh = function () {
  var i,
    e,
    t,
    n,
    r = this,
    s = r.constructor;
  if (!r.isFinite() || r.isZero()) return new s(r);
  if (
    ((e = s.precision),
    (t = s.rounding),
    (s.precision = e + Math.max(r.e, r.sd()) + 4),
    (s.rounding = 1),
    (n = r.d.length),
    n < 3)
  )
    r = j(s, 2, r, r, !0);
  else {
    ((i = 1.4 * Math.sqrt(n)),
      (i = i > 16 ? 16 : i | 0),
      (r = r.times(1 / ce(5, i))),
      (r = j(s, 2, r, r, !0)));
    for (var o, u = new s(5), l = new s(16), a = new s(20); i--; )
      ((o = r.times(r)), (r = r.times(u.plus(o.times(l.times(o).plus(a))))));
  }
  return ((s.precision = e), (s.rounding = t), h(r, e, t, !0));
};
p.hyperbolicTangent = p.tanh = function () {
  var i,
    e,
    t = this,
    n = t.constructor;
  return t.isFinite()
    ? t.isZero()
      ? new n(t)
      : ((i = n.precision),
        (e = n.rounding),
        (n.precision = i + 7),
        (n.rounding = 1),
        v(t.sinh(), t.cosh(), (n.precision = i), (n.rounding = e)))
    : new n(t.s);
};
p.inverseCosine = p.acos = function () {
  var i = this,
    e = i.constructor,
    t = i.abs().cmp(1),
    n = e.precision,
    r = e.rounding;
  return t !== -1
    ? t === 0
      ? i.isNeg()
        ? k(e, n, r)
        : new e(0)
      : new e(NaN)
    : i.isZero()
      ? k(e, n + 4, r).times(0.5)
      : ((e.precision = n + 6),
        (e.rounding = 1),
        (i = new e(1).minus(i).div(i.plus(1)).sqrt().atan()),
        (e.precision = n),
        (e.rounding = r),
        i.times(2));
};
p.inverseHyperbolicCosine = p.acosh = function () {
  var i,
    e,
    t = this,
    n = t.constructor;
  return t.lte(1)
    ? new n(t.eq(1) ? 0 : NaN)
    : t.isFinite()
      ? ((i = n.precision),
        (e = n.rounding),
        (n.precision = i + Math.max(Math.abs(t.e), t.sd()) + 4),
        (n.rounding = 1),
        (b = !1),
        (t = t.times(t).minus(1).sqrt().plus(t)),
        (b = !0),
        (n.precision = i),
        (n.rounding = e),
        t.ln())
      : new n(t);
};
p.inverseHyperbolicSine = p.asinh = function () {
  var i,
    e,
    t = this,
    n = t.constructor;
  return !t.isFinite() || t.isZero()
    ? new n(t)
    : ((i = n.precision),
      (e = n.rounding),
      (n.precision = i + 2 * Math.max(Math.abs(t.e), t.sd()) + 6),
      (n.rounding = 1),
      (b = !1),
      (t = t.times(t).plus(1).sqrt().plus(t)),
      (b = !0),
      (n.precision = i),
      (n.rounding = e),
      t.ln());
};
p.inverseHyperbolicTangent = p.atanh = function () {
  var i,
    e,
    t,
    n,
    r = this,
    s = r.constructor;
  return r.isFinite()
    ? r.e >= 0
      ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN)
      : ((i = s.precision),
        (e = s.rounding),
        (n = r.sd()),
        Math.max(n, i) < 2 * -r.e - 1
          ? h(new s(r), i, e, !0)
          : ((s.precision = t = n - r.e),
            (r = v(r.plus(1), new s(1).minus(r), t + i, 1)),
            (s.precision = i + 4),
            (s.rounding = 1),
            (r = r.ln()),
            (s.precision = i),
            (s.rounding = e),
            r.times(0.5)))
    : new s(NaN);
};
p.inverseSine = p.asin = function () {
  var i,
    e,
    t,
    n,
    r = this,
    s = r.constructor;
  return r.isZero()
    ? new s(r)
    : ((e = r.abs().cmp(1)),
      (t = s.precision),
      (n = s.rounding),
      e !== -1
        ? e === 0
          ? ((i = k(s, t + 4, n).times(0.5)), (i.s = r.s), i)
          : new s(NaN)
        : ((s.precision = t + 6),
          (s.rounding = 1),
          (r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan()),
          (s.precision = t),
          (s.rounding = n),
          r.times(2)));
};
p.inverseTangent = p.atan = function () {
  var i,
    e,
    t,
    n,
    r,
    s,
    o,
    u,
    l,
    a = this,
    c = a.constructor,
    f = c.precision,
    m = c.rounding;
  if (a.isFinite()) {
    if (a.isZero()) return new c(a);
    if (a.abs().eq(1) && f + 4 <= De) return ((o = k(c, f + 4, m).times(0.25)), (o.s = a.s), o);
  } else {
    if (!a.s) return new c(NaN);
    if (f + 4 <= De) return ((o = k(c, f + 4, m).times(0.5)), (o.s = a.s), o);
  }
  for (c.precision = u = f + 10, c.rounding = 1, t = Math.min(28, (u / g + 2) | 0), i = t; i; --i)
    a = a.div(a.times(a).plus(1).sqrt().plus(1));
  for (b = !1, e = Math.ceil(u / g), n = 1, l = a.times(a), o = new c(a), r = a; i !== -1; )
    if (
      ((r = r.times(l)),
      (s = o.minus(r.div((n += 2)))),
      (r = r.times(l)),
      (o = s.plus(r.div((n += 2)))),
      o.d[e] !== void 0)
    )
      for (i = e; o.d[i] === s.d[i] && i--; );
  return (
    t && (o = o.times(2 << (t - 1))),
    (b = !0),
    h(o, (c.precision = f), (c.rounding = m), !0)
  );
};
p.isFinite = function () {
  return !!this.d;
};
p.isInteger = p.isInt = function () {
  return !!this.d && M(this.e / g) > this.d.length - 2;
};
p.isNaN = function () {
  return !this.s;
};
p.isNegative = p.isNeg = function () {
  return this.s < 0;
};
p.isPositive = p.isPos = function () {
  return this.s > 0;
};
p.isZero = function () {
  return !!this.d && this.d[0] === 0;
};
p.lessThan = p.lt = function (i) {
  return this.cmp(i) < 0;
};
p.lessThanOrEqualTo = p.lte = function (i) {
  return this.cmp(i) < 1;
};
p.logarithm = p.log = function (i) {
  var e,
    t,
    n,
    r,
    s,
    o,
    u,
    l,
    a = this,
    c = a.constructor,
    f = c.precision,
    m = c.rounding,
    d = 5;
  if (i == null) ((i = new c(10)), (e = !0));
  else {
    if (((i = new c(i)), (t = i.d), i.s < 0 || !t || !t[0] || i.eq(1))) return new c(NaN);
    e = i.eq(10);
  }
  if (((t = a.d), a.s < 0 || !t || !t[0] || a.eq(1)))
    return new c(t && !t[0] ? -1 / 0 : a.s != 1 ? NaN : t ? 0 : 1 / 0);
  if (e)
    if (t.length > 1) s = !0;
    else {
      for (r = t[0]; r % 10 === 0; ) r /= 10;
      s = r !== 1;
    }
  if (
    ((b = !1),
    (u = f + d),
    (o = Y(a, u)),
    (n = e ? ue(c, u + 10) : Y(i, u)),
    (l = v(o, n, u, 1)),
    J(l.d, (r = f), m))
  )
    do
      if (((u += 10), (o = Y(a, u)), (n = e ? ue(c, u + 10) : Y(i, u)), (l = v(o, n, u, 1)), !s)) {
        +S(l.d).slice(r + 1, r + 15) + 1 == 1e14 && (l = h(l, f + 1, 0));
        break;
      }
    while (J(l.d, (r += 10), m));
  return ((b = !0), h(l, f, m));
};
p.minus = p.sub = function (i) {
  var e,
    t,
    n,
    r,
    s,
    o,
    u,
    l,
    a,
    c,
    f,
    m,
    d = this,
    w = d.constructor;
  if (((i = new w(i)), !d.d || !i.d))
    return (
      !d.s || !i.s
        ? (i = new w(NaN))
        : d.d
          ? (i.s = -i.s)
          : (i = new w(i.d || d.s !== i.s ? d : NaN)),
      i
    );
  if (d.s != i.s) return ((i.s = -i.s), d.plus(i));
  if (((a = d.d), (m = i.d), (u = w.precision), (l = w.rounding), !a[0] || !m[0])) {
    if (m[0]) i.s = -i.s;
    else if (a[0]) i = new w(d);
    else return new w(l === 3 ? -0 : 0);
    return b ? h(i, u, l) : i;
  }
  if (((t = M(i.e / g)), (c = M(d.e / g)), (a = a.slice()), (s = c - t), s)) {
    for (
      f = s < 0,
        f ? ((e = a), (s = -s), (o = m.length)) : ((e = m), (t = c), (o = a.length)),
        n = Math.max(Math.ceil(u / g), o) + 2,
        s > n && ((s = n), (e.length = 1)),
        e.reverse(),
        n = s;
      n--;
    )
      e.push(0);
    e.reverse();
  } else {
    for (n = a.length, o = m.length, f = n < o, f && (o = n), n = 0; n < o; n++)
      if (a[n] != m[n]) {
        f = a[n] < m[n];
        break;
      }
    s = 0;
  }
  for (f && ((e = a), (a = m), (m = e), (i.s = -i.s)), o = a.length, n = m.length - o; n > 0; --n)
    a[o++] = 0;
  for (n = m.length; n > s; ) {
    if (a[--n] < m[n]) {
      for (r = n; r && a[--r] === 0; ) a[r] = x - 1;
      (--a[r], (a[n] += x));
    }
    a[n] -= m[n];
  }
  for (; a[--o] === 0; ) a.pop();
  for (; a[0] === 0; a.shift()) --t;
  return a[0] ? ((i.d = a), (i.e = le(a, t)), b ? h(i, u, l) : i) : new w(l === 3 ? -0 : 0);
};
p.modulo = p.mod = function (i) {
  var e,
    t = this,
    n = t.constructor;
  return (
    (i = new n(i)),
    !t.d || !i.s || (i.d && !i.d[0])
      ? new n(NaN)
      : !i.d || (t.d && !t.d[0])
        ? h(new n(t), n.precision, n.rounding)
        : ((b = !1),
          n.modulo == 9
            ? ((e = v(t, i.abs(), 0, 3, 1)), (e.s *= i.s))
            : (e = v(t, i, 0, n.modulo, 1)),
          (e = e.times(i)),
          (b = !0),
          t.minus(e))
  );
};
p.naturalExponential = p.exp = function () {
  return we(this);
};
p.naturalLogarithm = p.ln = function () {
  return Y(this);
};
p.negated = p.neg = function () {
  var i = new this.constructor(this);
  return ((i.s = -i.s), h(i));
};
p.plus = p.add = function (i) {
  var e,
    t,
    n,
    r,
    s,
    o,
    u,
    l,
    a,
    c,
    f = this,
    m = f.constructor;
  if (((i = new m(i)), !f.d || !i.d))
    return (!f.s || !i.s ? (i = new m(NaN)) : f.d || (i = new m(i.d || f.s === i.s ? f : NaN)), i);
  if (f.s != i.s) return ((i.s = -i.s), f.minus(i));
  if (((a = f.d), (c = i.d), (u = m.precision), (l = m.rounding), !a[0] || !c[0]))
    return (c[0] || (i = new m(f)), b ? h(i, u, l) : i);
  if (((s = M(f.e / g)), (n = M(i.e / g)), (a = a.slice()), (r = s - n), r)) {
    for (
      r < 0 ? ((t = a), (r = -r), (o = c.length)) : ((t = c), (n = s), (o = a.length)),
        s = Math.ceil(u / g),
        o = s > o ? s + 1 : o + 1,
        r > o && ((r = o), (t.length = 1)),
        t.reverse();
      r--;
    )
      t.push(0);
    t.reverse();
  }
  for (o = a.length, r = c.length, o - r < 0 && ((r = o), (t = c), (c = a), (a = t)), e = 0; r; )
    ((e = ((a[--r] = a[r] + c[r] + e) / x) | 0), (a[r] %= x));
  for (e && (a.unshift(e), ++n), o = a.length; a[--o] == 0; ) a.pop();
  return ((i.d = a), (i.e = le(a, n)), b ? h(i, u, l) : i);
};
p.precision = p.sd = function (i) {
  var e,
    t = this;
  if (i !== void 0 && i !== !!i && i !== 1 && i !== 0) throw Error(B + i);
  return (t.d ? ((e = xe(t.d)), i && t.e + 1 > e && (e = t.e + 1)) : (e = NaN), e);
};
p.round = function () {
  var i = this,
    e = i.constructor;
  return h(new e(i), i.e + 1, e.rounding);
};
p.sine = p.sin = function () {
  var i,
    e,
    t = this,
    n = t.constructor;
  return t.isFinite()
    ? t.isZero()
      ? new n(t)
      : ((i = n.precision),
        (e = n.rounding),
        (n.precision = i + Math.max(t.e, t.sd()) + g),
        (n.rounding = 1),
        (t = Je(n, Le(n, t))),
        (n.precision = i),
        (n.rounding = e),
        h(L > 2 ? t.neg() : t, i, e, !0))
    : new n(NaN);
};
p.squareRoot = p.sqrt = function () {
  var i,
    e,
    t,
    n,
    r,
    s,
    o = this,
    u = o.d,
    l = o.e,
    a = o.s,
    c = o.constructor;
  if (a !== 1 || !u || !u[0]) return new c(!a || (a < 0 && (!u || u[0])) ? NaN : u ? o : 1 / 0);
  for (
    b = !1,
      a = Math.sqrt(+o),
      a == 0 || a == 1 / 0
        ? ((e = S(u)),
          (e.length + l) % 2 == 0 && (e += '0'),
          (a = Math.sqrt(e)),
          (l = M((l + 1) / 2) - (l < 0 || l % 2)),
          a == 1 / 0
            ? (e = '5e' + l)
            : ((e = a.toExponential()), (e = e.slice(0, e.indexOf('e') + 1) + l)),
          (n = new c(e)))
        : (n = new c(a.toString())),
      t = (l = c.precision) + 3;
    ;
  )
    if (
      ((s = n),
      (n = s.plus(v(o, s, t + 2, 1)).times(0.5)),
      S(s.d).slice(0, t) === (e = S(n.d)).slice(0, t))
    )
      if (((e = e.slice(t - 3, t + 1)), e == '9999' || (!r && e == '4999'))) {
        if (!r && (h(s, l + 1, 0), s.times(s).eq(o))) {
          n = s;
          break;
        }
        ((t += 4), (r = 1));
      } else {
        (!+e || (!+e.slice(1) && e.charAt(0) == '5')) && (h(n, l + 1, 1), (i = !n.times(n).eq(o)));
        break;
      }
  return ((b = !0), h(n, l, c.rounding, i));
};
p.tangent = p.tan = function () {
  var i,
    e,
    t = this,
    n = t.constructor;
  return t.isFinite()
    ? t.isZero()
      ? new n(t)
      : ((i = n.precision),
        (e = n.rounding),
        (n.precision = i + 10),
        (n.rounding = 1),
        (t = t.sin()),
        (t.s = 1),
        (t = v(t, new n(1).minus(t.times(t)).sqrt(), i + 10, 0)),
        (n.precision = i),
        (n.rounding = e),
        h(L == 2 || L == 4 ? t.neg() : t, i, e, !0))
    : new n(NaN);
};
p.times = p.mul = function (i) {
  var e,
    t,
    n,
    r,
    s,
    o,
    u,
    l,
    a,
    c = this,
    f = c.constructor,
    m = c.d,
    d = (i = new f(i)).d;
  if (((i.s *= c.s), !m || !m[0] || !d || !d[0]))
    return new f(
      !i.s || (m && !m[0] && !d) || (d && !d[0] && !m) ? NaN : !m || !d ? i.s / 0 : i.s * 0,
    );
  for (
    t = M(c.e / g) + M(i.e / g),
      l = m.length,
      a = d.length,
      l < a && ((s = m), (m = d), (d = s), (o = l), (l = a), (a = o)),
      s = [],
      o = l + a,
      n = o;
    n--;
  )
    s.push(0);
  for (n = a; --n >= 0; ) {
    for (e = 0, r = l + n; r > n; )
      ((u = s[r] + d[n] * m[r - n - 1] + e), (s[r--] = (u % x) | 0), (e = (u / x) | 0));
    s[r] = ((s[r] + e) % x) | 0;
  }
  for (; !s[--o]; ) s.pop();
  return (e ? ++t : s.shift(), (i.d = s), (i.e = le(s, t)), b ? h(i, f.precision, f.rounding) : i);
};
p.toBinary = function (i, e) {
  return Ne(this, 2, i, e);
};
p.toDecimalPlaces = p.toDP = function (i, e) {
  var t = this,
    n = t.constructor;
  return (
    (t = new n(t)),
    i === void 0
      ? t
      : (F(i, 0, Z), e === void 0 ? (e = n.rounding) : F(e, 0, 8), h(t, i + t.e + 1, e))
  );
};
p.toExponential = function (i, e) {
  var t,
    n = this,
    r = n.constructor;
  return (
    i === void 0
      ? (t = $(n, !0))
      : (F(i, 0, Z),
        e === void 0 ? (e = r.rounding) : F(e, 0, 8),
        (n = h(new r(n), i + 1, e)),
        (t = $(n, !0, i + 1))),
    n.isNeg() && !n.isZero() ? '-' + t : t
  );
};
p.toFixed = function (i, e) {
  var t,
    n,
    r = this,
    s = r.constructor;
  return (
    i === void 0
      ? (t = $(r))
      : (F(i, 0, Z),
        e === void 0 ? (e = s.rounding) : F(e, 0, 8),
        (n = h(new s(r), i + r.e + 1, e)),
        (t = $(n, !1, i + n.e + 1))),
    r.isNeg() && !r.isZero() ? '-' + t : t
  );
};
p.toFraction = function (i) {
  var e,
    t,
    n,
    r,
    s,
    o,
    u,
    l,
    a,
    c,
    f,
    m,
    d = this,
    w = d.d,
    D = d.constructor;
  if (!w) return new D(d);
  if (
    ((a = t = new D(1)),
    (n = l = new D(0)),
    (e = new D(n)),
    (s = e.e = xe(w) - d.e - 1),
    (o = s % g),
    (e.d[0] = I(10, o < 0 ? g + o : o)),
    i == null)
  )
    i = s > 0 ? e : a;
  else {
    if (((u = new D(i)), !u.isInt() || u.lt(a))) throw Error(B + u);
    i = u.gt(e) ? (s > 0 ? e : a) : u;
  }
  for (
    b = !1, u = new D(S(w)), c = D.precision, D.precision = s = w.length * g * 2;
    (f = v(u, e, 0, 1, 1)), (r = t.plus(f.times(n))), r.cmp(i) != 1;
  )
    ((t = n),
      (n = r),
      (r = a),
      (a = l.plus(f.times(r))),
      (l = r),
      (r = e),
      (e = u.minus(f.times(r))),
      (u = r));
  return (
    (r = v(i.minus(t), n, 0, 1, 1)),
    (l = l.plus(r.times(a))),
    (t = t.plus(r.times(n))),
    (l.s = a.s = d.s),
    (m =
      v(a, n, s, 1)
        .minus(d)
        .abs()
        .cmp(v(l, t, s, 1).minus(d).abs()) < 1
        ? [a, n]
        : [l, t]),
    (D.precision = c),
    (b = !0),
    m
  );
};
p.toHexadecimal = p.toHex = function (i, e) {
  return Ne(this, 16, i, e);
};
p.toNearest = function (i, e) {
  var t = this,
    n = t.constructor;
  if (((t = new n(t)), i == null)) {
    if (!t.d) return t;
    ((i = new n(1)), (e = n.rounding));
  } else {
    if (((i = new n(i)), e === void 0 ? (e = n.rounding) : F(e, 0, 8), !t.d)) return i.s ? t : i;
    if (!i.d) return (i.s && (i.s = t.s), i);
  }
  return (
    i.d[0] ? ((b = !1), (t = v(t, i, 0, e, 1).times(i)), (b = !0), h(t)) : ((i.s = t.s), (t = i)),
    t
  );
};
p.toNumber = function () {
  return +this;
};
p.toOctal = function (i, e) {
  return Ne(this, 8, i, e);
};
p.toPower = p.pow = function (i) {
  var e,
    t,
    n,
    r,
    s,
    o,
    u = this,
    l = u.constructor,
    a = +(i = new l(i));
  if (!u.d || !i.d || !u.d[0] || !i.d[0]) return new l(I(+u, a));
  if (((u = new l(u)), u.eq(1))) return u;
  if (((n = l.precision), (s = l.rounding), i.eq(1))) return h(u, n, s);
  if (((e = M(i.e / g)), e >= i.d.length - 1 && (t = a < 0 ? -a : a) <= Ve))
    return ((r = ke(l, u, t, n)), i.s < 0 ? new l(1).div(r) : h(r, n, s));
  if (((o = u.s), o < 0)) {
    if (e < i.d.length - 1) return new l(NaN);
    if (((i.d[e] & 1) == 0 && (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1))
      return ((u.s = o), u);
  }
  return (
    (t = I(+u, a)),
    (e =
      t == 0 || !isFinite(t)
        ? M(a * (Math.log('0.' + S(u.d)) / Math.LN10 + u.e + 1))
        : new l(t + '').e),
    e > l.maxE + 1 || e < l.minE - 1
      ? new l(e > 0 ? o / 0 : 0)
      : ((b = !1),
        (l.rounding = u.s = 1),
        (t = Math.min(12, (e + '').length)),
        (r = we(i.times(Y(u, n + t)), n)),
        r.d &&
          ((r = h(r, n + 5, 1)),
          J(r.d, n, s) &&
            ((e = n + 10),
            (r = h(we(i.times(Y(u, e + t)), e), e + 5, 1)),
            +S(r.d).slice(n + 1, n + 15) + 1 == 1e14 && (r = h(r, n + 1, 0)))),
        (r.s = o),
        (b = !0),
        (l.rounding = s),
        h(r, n, s))
  );
};
p.toPrecision = function (i, e) {
  var t,
    n = this,
    r = n.constructor;
  return (
    i === void 0
      ? (t = $(n, n.e <= r.toExpNeg || n.e >= r.toExpPos))
      : (F(i, 1, Z),
        e === void 0 ? (e = r.rounding) : F(e, 0, 8),
        (n = h(new r(n), i, e)),
        (t = $(n, i <= n.e || n.e <= r.toExpNeg, i))),
    n.isNeg() && !n.isZero() ? '-' + t : t
  );
};
p.toSignificantDigits = p.toSD = function (i, e) {
  var t = this,
    n = t.constructor;
  return (
    i === void 0
      ? ((i = n.precision), (e = n.rounding))
      : (F(i, 1, Z), e === void 0 ? (e = n.rounding) : F(e, 0, 8)),
    h(new n(t), i, e)
  );
};
p.toString = function () {
  var i = this,
    e = i.constructor,
    t = $(i, i.e <= e.toExpNeg || i.e >= e.toExpPos);
  return i.isNeg() && !i.isZero() ? '-' + t : t;
};
p.truncated = p.trunc = function () {
  return h(new this.constructor(this), this.e + 1, 1);
};
p.valueOf = p.toJSON = function () {
  var i = this,
    e = i.constructor,
    t = $(i, i.e <= e.toExpNeg || i.e >= e.toExpPos);
  return i.isNeg() ? '-' + t : t;
};
function S(i) {
  var e,
    t,
    n,
    r = i.length - 1,
    s = '',
    o = i[0];
  if (r > 0) {
    for (s += o, e = 1; e < r; e++)
      ((n = i[e] + ''), (t = g - n.length), t && (s += H(t)), (s += n));
    ((o = i[e]), (n = o + ''), (t = g - n.length), t && (s += H(t)));
  } else if (o === 0) return '0';
  for (; o % 10 === 0; ) o /= 10;
  return s + o;
}
function F(i, e, t) {
  if (i !== ~~i || i < e || i > t) throw Error(B + i);
}
function J(i, e, t, n) {
  var r, s, o, u;
  for (s = i[0]; s >= 10; s /= 10) --e;
  return (
    --e < 0 ? ((e += g), (r = 0)) : ((r = Math.ceil((e + 1) / g)), (e %= g)),
    (s = I(10, g - e)),
    (u = (i[r] % s) | 0),
    n == null
      ? e < 3
        ? (e == 0 ? (u = (u / 100) | 0) : e == 1 && (u = (u / 10) | 0),
          (o = (t < 4 && u == 99999) || (t > 3 && u == 49999) || u == 5e4 || u == 0))
        : (o =
            (((t < 4 && u + 1 == s) || (t > 3 && u + 1 == s / 2)) &&
              ((i[r + 1] / s / 100) | 0) == I(10, e - 2) - 1) ||
            ((u == s / 2 || u == 0) && ((i[r + 1] / s / 100) | 0) == 0))
      : e < 4
        ? (e == 0
            ? (u = (u / 1e3) | 0)
            : e == 1
              ? (u = (u / 100) | 0)
              : e == 2 && (u = (u / 10) | 0),
          (o = ((n || t < 4) && u == 9999) || (!n && t > 3 && u == 4999)))
        : (o =
            (((n || t < 4) && u + 1 == s) || (!n && t > 3 && u + 1 == s / 2)) &&
            ((i[r + 1] / s / 1e3) | 0) == I(10, e - 3) - 1),
    o
  );
}
function ne(i, e, t) {
  for (var n, r = [0], s, o = 0, u = i.length; o < u; ) {
    for (s = r.length; s--; ) r[s] *= e;
    for (r[0] += ge.indexOf(i.charAt(o++)), n = 0; n < r.length; n++)
      r[n] > t - 1 &&
        (r[n + 1] === void 0 && (r[n + 1] = 0), (r[n + 1] += (r[n] / t) | 0), (r[n] %= t));
  }
  return r.reverse();
}
function We(i, e) {
  var t, n, r;
  if (e.isZero()) return e;
  ((n = e.d.length),
    n < 32
      ? ((t = Math.ceil(n / 3)), (r = (1 / ce(4, t)).toString()))
      : ((t = 16), (r = '2.3283064365386962890625e-10')),
    (i.precision += t),
    (e = j(i, 1, e.times(r), new i(1))));
  for (var s = t; s--; ) {
    var o = e.times(e);
    e = o.times(o).minus(o).times(8).plus(1);
  }
  return ((i.precision -= t), e);
}
var v = (function () {
  function i(n, r, s) {
    var o,
      u = 0,
      l = n.length;
    for (n = n.slice(); l--; ) ((o = n[l] * r + u), (n[l] = (o % s) | 0), (u = (o / s) | 0));
    return (u && n.unshift(u), n);
  }
  function e(n, r, s, o) {
    var u, l;
    if (s != o) l = s > o ? 1 : -1;
    else
      for (u = l = 0; u < s; u++)
        if (n[u] != r[u]) {
          l = n[u] > r[u] ? 1 : -1;
          break;
        }
    return l;
  }
  function t(n, r, s, o) {
    for (var u = 0; s--; ) ((n[s] -= u), (u = n[s] < r[s] ? 1 : 0), (n[s] = u * o + n[s] - r[s]));
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function (n, r, s, o, u, l) {
    var a,
      c,
      f,
      m,
      d,
      w,
      D,
      U,
      T,
      A,
      N,
      y,
      z,
      q,
      fe,
      X,
      W,
      me,
      R,
      Q,
      ee = n.constructor,
      pe = n.s == r.s ? 1 : -1,
      E = n.d,
      O = r.d;
    if (!E || !E[0] || !O || !O[0])
      return new ee(
        !n.s || !r.s || (E ? O && E[0] == O[0] : !O)
          ? NaN
          : (E && E[0] == 0) || !O
            ? pe * 0
            : pe / 0,
      );
    for (
      l ? ((d = 1), (c = n.e - r.e)) : ((l = x), (d = g), (c = M(n.e / d) - M(r.e / d))),
        R = O.length,
        W = E.length,
        T = new ee(pe),
        A = T.d = [],
        f = 0;
      O[f] == (E[f] || 0);
      f++
    );
    if (
      (O[f] > (E[f] || 0) && c--,
      s == null
        ? ((q = s = ee.precision), (o = ee.rounding))
        : u
          ? (q = s + (n.e - r.e) + 1)
          : (q = s),
      q < 0)
    )
      (A.push(1), (w = !0));
    else {
      if (((q = (q / d + 2) | 0), (f = 0), R == 1)) {
        for (m = 0, O = O[0], q++; (f < W || m) && q--; f++)
          ((fe = m * l + (E[f] || 0)), (A[f] = (fe / O) | 0), (m = (fe % O) | 0));
        w = m || f < W;
      } else {
        for (
          m = (l / (O[0] + 1)) | 0,
            m > 1 && ((O = i(O, m, l)), (E = i(E, m, l)), (R = O.length), (W = E.length)),
            X = R,
            N = E.slice(0, R),
            y = N.length;
          y < R;
        )
          N[y++] = 0;
        ((Q = O.slice()), Q.unshift(0), (me = O[0]), O[1] >= l / 2 && ++me);
        do
          ((m = 0),
            (a = e(O, N, R, y)),
            a < 0
              ? ((z = N[0]),
                R != y && (z = z * l + (N[1] || 0)),
                (m = (z / me) | 0),
                m > 1
                  ? (m >= l && (m = l - 1),
                    (D = i(O, m, l)),
                    (U = D.length),
                    (y = N.length),
                    (a = e(D, N, U, y)),
                    a == 1 && (m--, t(D, R < U ? Q : O, U, l)))
                  : (m == 0 && (a = m = 1), (D = O.slice())),
                (U = D.length),
                U < y && D.unshift(0),
                t(N, D, y, l),
                a == -1 &&
                  ((y = N.length), (a = e(O, N, R, y)), a < 1 && (m++, t(N, R < y ? Q : O, y, l))),
                (y = N.length))
              : a === 0 && (m++, (N = [0])),
            (A[f++] = m),
            a && N[0] ? (N[y++] = E[X] || 0) : ((N = [E[X]]), (y = 1)));
        while ((X++ < W || N[0] !== void 0) && q--);
        w = N[0] !== void 0;
      }
      A[0] || A.shift();
    }
    if (d == 1) ((T.e = c), (Ue = w));
    else {
      for (f = 1, m = A[0]; m >= 10; m /= 10) f++;
      ((T.e = f + c * d - 1), h(T, u ? s + T.e + 1 : s, o, w));
    }
    return T;
  };
})();
function h(i, e, t, n) {
  var r,
    s,
    o,
    u,
    l,
    a,
    c,
    f,
    m,
    d = i.constructor;
  e: if (e != null) {
    if (((f = i.d), !f)) return i;
    for (r = 1, u = f[0]; u >= 10; u /= 10) r++;
    if (((s = e - r), s < 0))
      ((s += g), (o = e), (c = f[(m = 0)]), (l = ((c / I(10, r - o - 1)) % 10) | 0));
    else if (((m = Math.ceil((s + 1) / g)), (u = f.length), m >= u))
      if (n) {
        for (; u++ <= m; ) f.push(0);
        ((c = l = 0), (r = 1), (s %= g), (o = s - g + 1));
      } else break e;
    else {
      for (c = u = f[m], r = 1; u >= 10; u /= 10) r++;
      ((s %= g), (o = s - g + r), (l = o < 0 ? 0 : ((c / I(10, r - o - 1)) % 10) | 0));
    }
    if (
      ((n = n || e < 0 || f[m + 1] !== void 0 || (o < 0 ? c : c % I(10, r - o - 1))),
      (a =
        t < 4
          ? (l || n) && (t == 0 || t == (i.s < 0 ? 3 : 2))
          : l > 5 ||
            (l == 5 &&
              (t == 4 ||
                n ||
                (t == 6 && ((s > 0 ? (o > 0 ? c / I(10, r - o) : 0) : f[m - 1]) % 10) & 1) ||
                t == (i.s < 0 ? 8 : 7)))),
      e < 1 || !f[0])
    )
      return (
        (f.length = 0),
        a ? ((e -= i.e + 1), (f[0] = I(10, (g - (e % g)) % g)), (i.e = -e || 0)) : (f[0] = i.e = 0),
        i
      );
    if (
      (s == 0
        ? ((f.length = m), (u = 1), m--)
        : ((f.length = m + 1),
          (u = I(10, g - s)),
          (f[m] = o > 0 ? (((c / I(10, r - o)) % I(10, o)) | 0) * u : 0)),
      a)
    )
      for (;;)
        if (m == 0) {
          for (s = 1, o = f[0]; o >= 10; o /= 10) s++;
          for (o = f[0] += u, u = 1; o >= 10; o /= 10) u++;
          s != u && (i.e++, f[0] == x && (f[0] = 1));
          break;
        } else {
          if (((f[m] += u), f[m] != x)) break;
          ((f[m--] = 0), (u = 1));
        }
    for (s = f.length; f[--s] === 0; ) f.pop();
  }
  return (
    b && (i.e > d.maxE ? ((i.d = null), (i.e = NaN)) : i.e < d.minE && ((i.e = 0), (i.d = [0]))),
    i
  );
}
function $(i, e, t) {
  if (!i.isFinite()) return qe(i);
  var n,
    r = i.e,
    s = S(i.d),
    o = s.length;
  return (
    e
      ? (t && (n = t - o) > 0
          ? (s = s.charAt(0) + '.' + s.slice(1) + H(n))
          : o > 1 && (s = s.charAt(0) + '.' + s.slice(1)),
        (s = s + (i.e < 0 ? 'e' : 'e+') + i.e))
      : r < 0
        ? ((s = '0.' + H(-r - 1) + s), t && (n = t - o) > 0 && (s += H(n)))
        : r >= o
          ? ((s += H(r + 1 - o)), t && (n = t - r - 1) > 0 && (s = s + '.' + H(n)))
          : ((n = r + 1) < o && (s = s.slice(0, n) + '.' + s.slice(n)),
            t && (n = t - o) > 0 && (r + 1 === o && (s += '.'), (s += H(n)))),
    s
  );
}
function le(i, e) {
  var t = i[0];
  for (e *= g; t >= 10; t /= 10) e++;
  return e;
}
function ue(i, e, t) {
  if (e > je) throw ((b = !0), t && (i.precision = t), Error(Fe));
  return h(new i(se), e, 1, !0);
}
function k(i, e, t) {
  if (e > De) throw Error(Fe);
  return h(new i(oe), e, t, !0);
}
function xe(i) {
  var e = i.length - 1,
    t = e * g + 1;
  if (((e = i[e]), e)) {
    for (; e % 10 == 0; e /= 10) t--;
    for (e = i[0]; e >= 10; e /= 10) t++;
  }
  return t;
}
function H(i) {
  for (var e = ''; i--; ) e += '0';
  return e;
}
function ke(i, e, t, n) {
  var r,
    s = new i(1),
    o = Math.ceil(n / g + 4);
  for (b = !1; ; ) {
    if ((t % 2 && ((s = s.times(e)), Ee(s.d, o) && (r = !0)), (t = M(t / 2)), t === 0)) {
      ((t = s.d.length - 1), r && s.d[t] === 0 && ++s.d[t]);
      break;
    }
    ((e = e.times(e)), Ee(e.d, o));
  }
  return ((b = !0), s);
}
function ye(i) {
  return i.d[i.d.length - 1] & 1;
}
function $e(i, e, t) {
  for (var n, r, s = new i(e[0]), o = 0; ++o < e.length; ) {
    if (((r = new i(e[o])), !r.s)) {
      s = r;
      break;
    }
    ((n = s.cmp(r)), (n === t || (n === 0 && s.s === t)) && (s = r));
  }
  return s;
}
function we(i, e) {
  var t,
    n,
    r,
    s,
    o,
    u,
    l,
    a = 0,
    c = 0,
    f = 0,
    m = i.constructor,
    d = m.rounding,
    w = m.precision;
  if (!i.d || !i.d[0] || i.e > 17)
    return new m(i.d ? (i.d[0] ? (i.s < 0 ? 0 : 1 / 0) : 1) : i.s ? (i.s < 0 ? 0 : i) : NaN);
  for (e == null ? ((b = !1), (l = w)) : (l = e), u = new m(0.03125); i.e > -2; )
    ((i = i.times(u)), (f += 5));
  for (
    n = ((Math.log(I(2, f)) / Math.LN10) * 2 + 5) | 0,
      l += n,
      t = s = o = new m(1),
      m.precision = l;
    ;
  ) {
    if (
      ((s = h(s.times(i), l, 1)),
      (t = t.times(++c)),
      (u = o.plus(v(s, t, l, 1))),
      S(u.d).slice(0, l) === S(o.d).slice(0, l))
    ) {
      for (r = f; r--; ) o = h(o.times(o), l, 1);
      if (e == null)
        if (a < 3 && J(o.d, l - n, d, a))
          ((m.precision = l += 10), (t = s = u = new m(1)), (c = 0), a++);
        else return h(o, (m.precision = w), d, (b = !0));
      else return ((m.precision = w), o);
    }
    o = u;
  }
}
function Y(i, e) {
  var t,
    n,
    r,
    s,
    o,
    u,
    l,
    a,
    c,
    f,
    m,
    d = 1,
    w = 10,
    D = i,
    U = D.d,
    T = D.constructor,
    A = T.rounding,
    N = T.precision;
  if (D.s < 0 || !U || !U[0] || (!D.e && U[0] == 1 && U.length == 1))
    return new T(U && !U[0] ? -1 / 0 : D.s != 1 ? NaN : U ? 0 : D);
  if (
    (e == null ? ((b = !1), (c = N)) : (c = e),
    (T.precision = c += w),
    (t = S(U)),
    (n = t.charAt(0)),
    Math.abs((s = D.e)) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && t.charAt(1) > 3); )
      ((D = D.times(i)), (t = S(D.d)), (n = t.charAt(0)), d++);
    ((s = D.e), n > 1 ? ((D = new T('0.' + t)), s++) : (D = new T(n + '.' + t.slice(1))));
  } else
    return (
      (a = ue(T, c + 2, N).times(s + '')),
      (D = Y(new T(n + '.' + t.slice(1)), c - w).plus(a)),
      (T.precision = N),
      e == null ? h(D, N, A, (b = !0)) : D
    );
  for (f = D, l = o = D = v(D.minus(1), D.plus(1), c, 1), m = h(D.times(D), c, 1), r = 3; ; ) {
    if (
      ((o = h(o.times(m), c, 1)),
      (a = l.plus(v(o, new T(r), c, 1))),
      S(a.d).slice(0, c) === S(l.d).slice(0, c))
    )
      if (
        ((l = l.times(2)),
        s !== 0 && (l = l.plus(ue(T, c + 2, N).times(s + ''))),
        (l = v(l, new T(d), c, 1)),
        e == null)
      )
        if (J(l.d, c - w, A, u))
          ((T.precision = c += w),
            (a = o = D = v(f.minus(1), f.plus(1), c, 1)),
            (m = h(D.times(D), c, 1)),
            (r = u = 1));
        else return h(l, (T.precision = N), A, (b = !0));
      else return ((T.precision = N), l);
    ((l = a), (r += 2));
  }
}
function qe(i) {
  return String((i.s * i.s) / 0);
}
function re(i, e) {
  var t, n, r;
  for (
    (t = e.indexOf('.')) > -1 && (e = e.replace('.', '')),
      (n = e.search(/e/i)) > 0
        ? (t < 0 && (t = n), (t += +e.slice(n + 1)), (e = e.substring(0, n)))
        : t < 0 && (t = e.length),
      n = 0;
    e.charCodeAt(n) === 48;
    n++
  );
  for (r = e.length; e.charCodeAt(r - 1) === 48; --r);
  if (((e = e.slice(n, r)), e)) {
    if (
      ((r -= n), (i.e = t = t - n - 1), (i.d = []), (n = (t + 1) % g), t < 0 && (n += g), n < r)
    ) {
      for (n && i.d.push(+e.slice(0, n)), r -= g; n < r; ) i.d.push(+e.slice(n, (n += g)));
      ((e = e.slice(n)), (n = g - e.length));
    } else n -= r;
    for (; n--; ) e += '0';
    (i.d.push(+e),
      b &&
        (i.e > i.constructor.maxE
          ? ((i.d = null), (i.e = NaN))
          : i.e < i.constructor.minE && ((i.e = 0), (i.d = [0]))));
  } else ((i.e = 0), (i.d = [0]));
  return i;
}
function Ge(i, e) {
  var t, n, r, s, o, u, l, a, c;
  if (e.indexOf('_') > -1) {
    if (((e = e.replace(/(\d)_(?=\d)/g, '$1')), Pe.test(e))) return re(i, e);
  } else if (e === 'Infinity' || e === 'NaN')
    return (+e || (i.s = NaN), (i.e = NaN), (i.d = null), i);
  if (Ze.test(e)) ((t = 16), (e = e.toLowerCase()));
  else if (Be.test(e)) t = 2;
  else if (Ke.test(e)) t = 8;
  else throw Error(B + e);
  for (
    s = e.search(/p/i),
      s > 0 ? ((l = +e.slice(s + 1)), (e = e.substring(2, s))) : (e = e.slice(2)),
      s = e.indexOf('.'),
      o = s >= 0,
      n = i.constructor,
      o && ((e = e.replace('.', '')), (u = e.length), (s = u - s), (r = ke(n, new n(t), s, s * 2))),
      a = ne(e, t, x),
      c = a.length - 1,
      s = c;
    a[s] === 0;
    --s
  )
    a.pop();
  return s < 0
    ? new n(i.s * 0)
    : ((i.e = le(a, c)),
      (i.d = a),
      (b = !1),
      o && (i = v(i, r, u * 4)),
      l && (i = i.times(Math.abs(l) < 54 ? I(2, l) : _.pow(2, l))),
      (b = !0),
      i);
}
function Je(i, e) {
  var t,
    n = e.d.length;
  if (n < 3) return e.isZero() ? e : j(i, 2, e, e);
  ((t = 1.4 * Math.sqrt(n)),
    (t = t > 16 ? 16 : t | 0),
    (e = e.times(1 / ce(5, t))),
    (e = j(i, 2, e, e)));
  for (var r, s = new i(5), o = new i(16), u = new i(20); t--; )
    ((r = e.times(e)), (e = e.times(s.plus(r.times(o.times(r).minus(u))))));
  return e;
}
function j(i, e, t, n, r) {
  var s,
    o,
    u,
    l,
    a = 1,
    c = i.precision,
    f = Math.ceil(c / g);
  for (b = !1, l = t.times(t), u = new i(n); ; ) {
    if (
      ((o = v(u.times(l), new i(e++ * e++), c, 1)),
      (u = r ? n.plus(o) : n.minus(o)),
      (n = v(o.times(l), new i(e++ * e++), c, 1)),
      (o = u.plus(n)),
      o.d[f] !== void 0)
    ) {
      for (s = f; o.d[s] === u.d[s] && s--; );
      if (s == -1) break;
    }
    ((s = u), (u = n), (n = o), (o = s), a++);
  }
  return ((b = !0), (o.d.length = f + 1), o);
}
function ce(i, e) {
  for (var t = i; --e; ) t *= i;
  return t;
}
function Le(i, e) {
  var t,
    n = e.s < 0,
    r = k(i, i.precision, 1),
    s = r.times(0.5);
  if (((e = e.abs()), e.lte(s))) return ((L = n ? 4 : 1), e);
  if (((t = e.divToInt(r)), t.isZero())) L = n ? 3 : 2;
  else {
    if (((e = e.minus(t.times(r))), e.lte(s))) return ((L = ye(t) ? (n ? 2 : 3) : n ? 4 : 1), e);
    L = ye(t) ? (n ? 1 : 4) : n ? 3 : 2;
  }
  return e.minus(r).abs();
}
function Ne(i, e, t, n) {
  var r,
    s,
    o,
    u,
    l,
    a,
    c,
    f,
    m,
    d = i.constructor,
    w = t !== void 0;
  if (
    (w
      ? (F(t, 1, Z), n === void 0 ? (n = d.rounding) : F(n, 0, 8))
      : ((t = d.precision), (n = d.rounding)),
    !i.isFinite())
  )
    c = qe(i);
  else {
    for (
      c = $(i),
        o = c.indexOf('.'),
        w ? ((r = 2), e == 16 ? (t = t * 4 - 3) : e == 8 && (t = t * 3 - 2)) : (r = e),
        o >= 0 &&
          ((c = c.replace('.', '')),
          (m = new d(1)),
          (m.e = c.length - o),
          (m.d = ne($(m), 10, r)),
          (m.e = m.d.length)),
        f = ne(c, 10, r),
        s = l = f.length;
      f[--l] == 0;
    )
      f.pop();
    if (!f[0]) c = w ? '0p+0' : '0';
    else {
      if (
        (o < 0
          ? s--
          : ((i = new d(i)),
            (i.d = f),
            (i.e = s),
            (i = v(i, m, t, n, 0, r)),
            (f = i.d),
            (s = i.e),
            (a = Ue)),
        (o = f[t]),
        (u = r / 2),
        (a = a || f[t + 1] !== void 0),
        (a =
          n < 4
            ? (o !== void 0 || a) && (n === 0 || n === (i.s < 0 ? 3 : 2))
            : o > u ||
              (o === u && (n === 4 || a || (n === 6 && f[t - 1] & 1) || n === (i.s < 0 ? 8 : 7)))),
        (f.length = t),
        a)
      )
        for (; ++f[--t] > r - 1; ) ((f[t] = 0), t || (++s, f.unshift(1)));
      for (l = f.length; !f[l - 1]; --l);
      for (o = 0, c = ''; o < l; o++) c += ge.charAt(f[o]);
      if (w) {
        if (l > 1)
          if (e == 16 || e == 8) {
            for (o = e == 16 ? 4 : 3, --l; l % o; l++) c += '0';
            for (f = ne(c, r, e), l = f.length; !f[l - 1]; --l);
            for (o = 1, c = '1.'; o < l; o++) c += ge.charAt(f[o]);
          } else c = c.charAt(0) + '.' + c.slice(1);
        c = c + (s < 0 ? 'p' : 'p+') + s;
      } else if (s < 0) {
        for (; ++s; ) c = '0' + c;
        c = '0.' + c;
      } else if (++s > l) for (s -= l; s--; ) c += '0';
      else s < l && (c = c.slice(0, s) + '.' + c.slice(s));
    }
    c = (e == 16 ? '0x' : e == 2 ? '0b' : e == 8 ? '0o' : '') + c;
  }
  return i.s < 0 ? '-' + c : c;
}
function Ee(i, e) {
  if (i.length > e) return ((i.length = e), !0);
}
function ze(i) {
  return new this(i).abs();
}
function Xe(i) {
  return new this(i).acos();
}
function Qe(i) {
  return new this(i).acosh();
}
function ei(i, e) {
  return new this(i).plus(e);
}
function ii(i) {
  return new this(i).asin();
}
function ti(i) {
  return new this(i).asinh();
}
function ni(i) {
  return new this(i).atan();
}
function ri(i) {
  return new this(i).atanh();
}
function si(i, e) {
  ((i = new this(i)), (e = new this(e)));
  var t,
    n = this.precision,
    r = this.rounding,
    s = n + 4;
  return (
    !i.s || !e.s
      ? (t = new this(NaN))
      : !i.d && !e.d
        ? ((t = k(this, s, 1).times(e.s > 0 ? 0.25 : 0.75)), (t.s = i.s))
        : !e.d || i.isZero()
          ? ((t = e.s < 0 ? k(this, n, r) : new this(0)), (t.s = i.s))
          : !i.d || e.isZero()
            ? ((t = k(this, s, 1).times(0.5)), (t.s = i.s))
            : e.s < 0
              ? ((this.precision = s),
                (this.rounding = 1),
                (t = this.atan(v(i, e, s, 1))),
                (e = k(this, s, 1)),
                (this.precision = n),
                (this.rounding = r),
                (t = i.s < 0 ? t.minus(e) : t.plus(e)))
              : (t = this.atan(v(i, e, s, 1))),
    t
  );
}
function oi(i) {
  return new this(i).cbrt();
}
function ui(i) {
  return h((i = new this(i)), i.e + 1, 2);
}
function ai(i, e, t) {
  return new this(i).clamp(e, t);
}
function li(i) {
  if (!i || typeof i != 'object') throw Error(ae + 'Object expected');
  var e,
    t,
    n,
    r = i.defaults === !0,
    s = [
      'precision',
      1,
      Z,
      'rounding',
      0,
      8,
      'toExpNeg',
      -V,
      0,
      'toExpPos',
      0,
      V,
      'maxE',
      0,
      V,
      'minE',
      -V,
      0,
      'modulo',
      0,
      9,
    ];
  for (e = 0; e < s.length; e += 3)
    if (((t = s[e]), r && (this[t] = be[t]), (n = i[t]) !== void 0))
      if (M(n) === n && n >= s[e + 1] && n <= s[e + 2]) this[t] = n;
      else throw Error(B + t + ': ' + n);
  if (((t = 'crypto'), r && (this[t] = be[t]), (n = i[t]) !== void 0))
    if (n === !0 || n === !1 || n === 0 || n === 1)
      if (n)
        if (typeof crypto < 'u' && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[t] = !0;
        else throw Error(Ae);
      else this[t] = !1;
    else throw Error(B + t + ': ' + n);
  return this;
}
function ci(i) {
  return new this(i).cos();
}
function fi(i) {
  return new this(i).cosh();
}
function He(i) {
  var e, t, n;
  function r(s) {
    var o,
      u,
      l,
      a = this;
    if (!(a instanceof r)) return new r(s);
    if (((a.constructor = r), Me(s))) {
      ((a.s = s.s),
        b
          ? !s.d || s.e > r.maxE
            ? ((a.e = NaN), (a.d = null))
            : s.e < r.minE
              ? ((a.e = 0), (a.d = [0]))
              : ((a.e = s.e), (a.d = s.d.slice()))
          : ((a.e = s.e), (a.d = s.d ? s.d.slice() : s.d)));
      return;
    }
    if (((l = typeof s), l === 'number')) {
      if (s === 0) {
        ((a.s = 1 / s < 0 ? -1 : 1), (a.e = 0), (a.d = [0]));
        return;
      }
      if ((s < 0 ? ((s = -s), (a.s = -1)) : (a.s = 1), s === ~~s && s < 1e7)) {
        for (o = 0, u = s; u >= 10; u /= 10) o++;
        b
          ? o > r.maxE
            ? ((a.e = NaN), (a.d = null))
            : o < r.minE
              ? ((a.e = 0), (a.d = [0]))
              : ((a.e = o), (a.d = [s]))
          : ((a.e = o), (a.d = [s]));
        return;
      }
      if (s * 0 !== 0) {
        (s || (a.s = NaN), (a.e = NaN), (a.d = null));
        return;
      }
      return re(a, s.toString());
    }
    if (l === 'string')
      return (
        (u = s.charCodeAt(0)) === 45
          ? ((s = s.slice(1)), (a.s = -1))
          : (u === 43 && (s = s.slice(1)), (a.s = 1)),
        Pe.test(s) ? re(a, s) : Ge(a, s)
      );
    if (l === 'bigint') return (s < 0 ? ((s = -s), (a.s = -1)) : (a.s = 1), re(a, s.toString()));
    throw Error(B + s);
  }
  if (
    ((r.prototype = p),
    (r.ROUND_UP = 0),
    (r.ROUND_DOWN = 1),
    (r.ROUND_CEIL = 2),
    (r.ROUND_FLOOR = 3),
    (r.ROUND_HALF_UP = 4),
    (r.ROUND_HALF_DOWN = 5),
    (r.ROUND_HALF_EVEN = 6),
    (r.ROUND_HALF_CEIL = 7),
    (r.ROUND_HALF_FLOOR = 8),
    (r.EUCLID = 9),
    (r.config = r.set = li),
    (r.clone = He),
    (r.isDecimal = Me),
    (r.abs = ze),
    (r.acos = Xe),
    (r.acosh = Qe),
    (r.add = ei),
    (r.asin = ii),
    (r.asinh = ti),
    (r.atan = ni),
    (r.atanh = ri),
    (r.atan2 = si),
    (r.cbrt = oi),
    (r.ceil = ui),
    (r.clamp = ai),
    (r.cos = ci),
    (r.cosh = fi),
    (r.div = mi),
    (r.exp = pi),
    (r.floor = di),
    (r.hypot = hi),
    (r.ln = gi),
    (r.log = bi),
    (r.log10 = wi),
    (r.log2 = Di),
    (r.max = Ni),
    (r.min = vi),
    (r.mod = Oi),
    (r.mul = Ti),
    (r.pow = Ii),
    (r.random = Ci),
    (r.round = Si),
    (r.sign = _i),
    (r.sin = yi),
    (r.sinh = Ei),
    (r.sqrt = Mi),
    (r.sub = Ui),
    (r.sum = Fi),
    (r.tan = Ai),
    (r.tanh = Ri),
    (r.trunc = Pi),
    i === void 0 && (i = {}),
    i && i.defaults !== !0)
  )
    for (
      n = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'],
        e = 0;
      e < n.length;
    )
      i.hasOwnProperty((t = n[e++])) || (i[t] = this[t]);
  return (r.config(i), r);
}
function mi(i, e) {
  return new this(i).div(e);
}
function pi(i) {
  return new this(i).exp();
}
function di(i) {
  return h((i = new this(i)), i.e + 1, 3);
}
function hi() {
  var i,
    e,
    t = new this(0);
  for (b = !1, i = 0; i < arguments.length; )
    if (((e = new this(arguments[i++])), e.d)) t.d && (t = t.plus(e.times(e)));
    else {
      if (e.s) return ((b = !0), new this(1 / 0));
      t = e;
    }
  return ((b = !0), t.sqrt());
}
function Me(i) {
  return i instanceof _ || (i && i.toStringTag === Re) || !1;
}
function gi(i) {
  return new this(i).ln();
}
function bi(i, e) {
  return new this(i).log(e);
}
function Di(i) {
  return new this(i).log(2);
}
function wi(i) {
  return new this(i).log(10);
}
function Ni() {
  return $e(this, arguments, -1);
}
function vi() {
  return $e(this, arguments, 1);
}
function Oi(i, e) {
  return new this(i).mod(e);
}
function Ti(i, e) {
  return new this(i).mul(e);
}
function Ii(i, e) {
  return new this(i).pow(e);
}
function Ci(i) {
  var e,
    t,
    n,
    r,
    s = 0,
    o = new this(1),
    u = [];
  if ((i === void 0 ? (i = this.precision) : F(i, 1, Z), (n = Math.ceil(i / g)), this.crypto))
    if (crypto.getRandomValues)
      for (e = crypto.getRandomValues(new Uint32Array(n)); s < n; )
        ((r = e[s]),
          r >= 429e7 ? (e[s] = crypto.getRandomValues(new Uint32Array(1))[0]) : (u[s++] = r % 1e7));
    else if (crypto.randomBytes) {
      for (e = crypto.randomBytes((n *= 4)); s < n; )
        ((r = e[s] + (e[s + 1] << 8) + (e[s + 2] << 16) + ((e[s + 3] & 127) << 24)),
          r >= 214e7 ? crypto.randomBytes(4).copy(e, s) : (u.push(r % 1e7), (s += 4)));
      s = n / 4;
    } else throw Error(Ae);
  else for (; s < n; ) u[s++] = (Math.random() * 1e7) | 0;
  for (
    n = u[--s], i %= g, n && i && ((r = I(10, g - i)), (u[s] = ((n / r) | 0) * r));
    u[s] === 0;
    s--
  )
    u.pop();
  if (s < 0) ((t = 0), (u = [0]));
  else {
    for (t = -1; u[0] === 0; t -= g) u.shift();
    for (n = 1, r = u[0]; r >= 10; r /= 10) n++;
    n < g && (t -= g - n);
  }
  return ((o.e = t), (o.d = u), o);
}
function Si(i) {
  return h((i = new this(i)), i.e + 1, this.rounding);
}
function _i(i) {
  return ((i = new this(i)), i.d ? (i.d[0] ? i.s : 0 * i.s) : i.s || NaN);
}
function yi(i) {
  return new this(i).sin();
}
function Ei(i) {
  return new this(i).sinh();
}
function Mi(i) {
  return new this(i).sqrt();
}
function Ui(i, e) {
  return new this(i).sub(e);
}
function Fi() {
  var i = 0,
    e = arguments,
    t = new this(e[i]);
  for (b = !1; t.s && ++i < e.length; ) t = t.plus(e[i]);
  return ((b = !0), h(t, this.precision, this.rounding));
}
function Ai(i) {
  return new this(i).tan();
}
function Ri(i) {
  return new this(i).tanh();
}
function Pi(i) {
  return h((i = new this(i)), i.e + 1, 1);
}
p[Symbol.for('nodejs.util.inspect.custom')] = p.toString;
p[Symbol.toStringTag] = 'Decimal';
var _ = (p.constructor = He(be));
se = new _(se);
oe = new _(oe);
var C = class extends Error {
  constructor(t, n) {
    super(t);
    this.operation = n;
    this.name = 'DecimalError';
  }
};
var xi = {
    precision: 6,
    rounding: _.ROUND_HALF_UP,
    returnAsNumber: !0,
    throwOnInfinity: !0,
    throwOnNaN: !0,
  },
  K = class {
    static defaultConfig = xi;
    static configure(e) {
      if (e.precision !== void 0 && (e.precision < 0 || e.precision > 100))
        throw new C('Precision must be between 0 and 100');
      this.defaultConfig = P(P({}, this.defaultConfig), e);
    }
    static getConfig() {
      return P({}, this.defaultConfig);
    }
    static createDecimal(e, t = 'unknown') {
      if (e instanceof _) return e;
      try {
        let n = new _(e);
        if (this.defaultConfig.throwOnNaN && n.isNaN())
          throw new C(`Invalid number: NaN detected in ${t}`, t);
        if (this.defaultConfig.throwOnInfinity && !n.isFinite())
          throw new C(`Invalid number: Infinity detected in ${t}`, t);
        return n;
      } catch {
        throw new C(`Failed to create decimal from value: ${e} in ${t}`, t);
      }
    }
    static processResult(e, t = {}, n = 'unknown') {
      let r = P(P({}, this.defaultConfig), t);
      if (r.throwOnNaN && e.isNaN()) throw new C(`Operation ${n} resulted in NaN`, n);
      if (r.throwOnInfinity && !e.isFinite()) throw new C(`Operation ${n} resulted in Infinity`, n);
      let s = e;
      return (
        r.precision >= 0 &&
          (s =
            r.rounding !== void 0
              ? s.toDecimalPlaces(r.precision, r.rounding)
              : s.toDecimalPlaces(r.precision)),
        r.returnAsNumber ? s.toNumber() : s
      );
    }
    static add(e, t, n) {
      let r = this.createDecimal(e, 'addition'),
        s = this.createDecimal(t, 'addition'),
        o = r.plus(s);
      return this.processResult(o, n, 'addition');
    }
    static subtract(e, t, n) {
      let r = this.createDecimal(e, 'subtraction'),
        s = this.createDecimal(t, 'subtraction'),
        o = r.minus(s);
      return this.processResult(o, n, 'subtraction');
    }
    static multiply(e, t, n) {
      let r = this.createDecimal(e, 'multiplication'),
        s = this.createDecimal(t, 'multiplication'),
        o = r.mul(s);
      return this.processResult(o, n, 'multiplication');
    }
    static divide(e, t, n) {
      let r = this.createDecimal(e, 'division'),
        s = this.createDecimal(t, 'division');
      if (s.isZero()) throw new C('Division by zero is not allowed', 'division');
      let o = r.div(s);
      return this.processResult(o, n, 'division');
    }
    static power(e, t, n) {
      let r = this.createDecimal(e, 'power'),
        s = this.createDecimal(t, 'power'),
        o = r.pow(s);
      return this.processResult(o, n, 'power');
    }
    static sqrt(e, t) {
      let n = this.createDecimal(e, 'sqrt');
      if (n.isNegative()) throw new C('Square root of negative number is not supported', 'sqrt');
      let r = n.sqrt();
      return this.processResult(r, t, 'sqrt');
    }
    static mod(e, t, n) {
      let r = this.createDecimal(e, 'modulo'),
        s = this.createDecimal(t, 'modulo');
      if (s.isZero()) throw new C('Modulo by zero is not allowed', 'modulo');
      let o = r.mod(s);
      return this.processResult(o, n, 'modulo');
    }
    static percentage(e, t, n) {
      let r = this.createDecimal(e, 'percentage'),
        s = this.createDecimal(t, 'percentage'),
        o = r.mul(s).div(100);
      return this.processResult(o, n, 'percentage');
    }
    static applyDiscount(e, t, n) {
      let r = this.createDecimal(e, 'discount'),
        s = this.percentage(e, t, { returnAsNumber: !1 }),
        o = r.minus(s);
      return this.processResult(o, n, 'discount');
    }
    static addTax(e, t, n) {
      let r = this.createDecimal(e, 'tax'),
        s = this.percentage(e, t, { returnAsNumber: !1 }),
        o = r.plus(s);
      return this.processResult(o, n, 'tax');
    }
    static simpleInterest(e, t, n, r) {
      let s = this.createDecimal(e, 'simple_interest'),
        o = this.createDecimal(t, 'simple_interest'),
        u = this.createDecimal(n, 'simple_interest'),
        l = s.mul(o).mul(u).div(100);
      return this.processResult(l, r, 'simple_interest');
    }
    static compoundInterest(e, t, n, r = 1, s) {
      let o = this.createDecimal(e, 'compound_interest'),
        u = this.createDecimal(t, 'compound_interest').div(100),
        l = this.createDecimal(n, 'compound_interest'),
        a = this.createDecimal(r, 'compound_interest'),
        c = u.div(a).plus(1),
        f = a.mul(l),
        d = o.mul(c.pow(f)).minus(o);
      return this.processResult(d, s, 'compound_interest');
    }
    static compare(e, t) {
      let n = this.createDecimal(e, 'comparison'),
        r = this.createDecimal(t, 'comparison');
      return n.comparedTo(r);
    }
    static equals(e, t) {
      return this.compare(e, t) === 0;
    }
    static greaterThan(e, t) {
      return this.compare(e, t) === 1;
    }
    static lessThan(e, t) {
      return this.compare(e, t) === -1;
    }
    static greaterThanOrEqual(e, t) {
      let n = this.compare(e, t);
      return n === 1 || n === 0;
    }
    static lessThanOrEqual(e, t) {
      let n = this.compare(e, t);
      return n === -1 || n === 0;
    }
    static abs(e, t) {
      let r = this.createDecimal(e, 'absolute').abs();
      return this.processResult(r, t, 'absolute');
    }
    static min(e, t) {
      if (e.length === 0) throw new C('Cannot find minimum of empty array', 'minimum');
      let n = this.createDecimal(e[0], 'minimum');
      for (let r = 1; r < e.length; r++) {
        let s = this.createDecimal(e[r], 'minimum');
        s.lessThan(n) && (n = s);
      }
      return this.processResult(n, t, 'minimum');
    }
    static max(e, t) {
      if (e.length === 0) throw new C('Cannot find maximum of empty array', 'maximum');
      let n = this.createDecimal(e[0], 'maximum');
      for (let r = 1; r < e.length; r++) {
        let s = this.createDecimal(e[r], 'maximum');
        s.greaterThan(n) && (n = s);
      }
      return this.processResult(n, t, 'maximum');
    }
    static round(e, t = 0, n, r) {
      let s = this.createDecimal(e, 'rounding'),
        o = n !== void 0 ? s.toDecimalPlaces(t, n) : s.toDecimalPlaces(t);
      return this.processResult(o, Te(P({}, r), { precision: t, rounding: n }), 'rounding');
    }
    static ceil(e, t = 0, n) {
      return this.round(e, t, _.ROUND_UP, n);
    }
    static floor(e, t = 0, n) {
      return this.round(e, t, _.ROUND_DOWN, n);
    }
    static sum(e, t) {
      if (e.length === 0) return this.processResult(new _(0), t, 'sum');
      let n = e.reduce((r, s) => {
        let o = this.createDecimal(s, 'sum');
        return r.plus(o);
      }, new _(0));
      return this.processResult(n, t, 'sum');
    }
    static average(e, t) {
      if (e.length === 0) throw new C('Cannot calculate average of empty array', 'average');
      let r = this.sum(e, { returnAsNumber: !1 }).div(e.length);
      return this.processResult(r, t, 'average');
    }
    static median(e, t) {
      if (e.length === 0) throw new C('Cannot calculate median of empty array', 'median');
      let n = e.map((o) => this.createDecimal(o, 'median')).sort((o, u) => o.comparedTo(u)),
        r = Math.floor(n.length / 2),
        s;
      return (
        n.length % 2 === 0 ? (s = n[r - 1].plus(n[r]).div(2)) : (s = n[r]),
        this.processResult(s, t, 'median')
      );
    }
    static chain(e) {
      return new ve(e);
    }
    static addAsNumber(e, t, n) {
      return this.add(e, t, { precision: n, returnAsNumber: !0 });
    }
    static subtractAsNumber(e, t, n) {
      return this.subtract(e, t, { precision: n, returnAsNumber: !0 });
    }
    static multiplyAsNumber(e, t, n) {
      return this.multiply(e, t, { precision: n, returnAsNumber: !0 });
    }
    static divideAsNumber(e, t, n) {
      return this.divide(e, t, { precision: n, returnAsNumber: !0 });
    }
    static addAsDecimal(e, t, n) {
      return this.add(e, t, { precision: n, returnAsNumber: !1 });
    }
    static subtractAsDecimal(e, t, n) {
      return this.subtract(e, t, { precision: n, returnAsNumber: !1 });
    }
    static multiplyAsDecimal(e, t, n) {
      return this.multiply(e, t, { precision: n, returnAsNumber: !1 });
    }
    static divideAsDecimal(e, t, n) {
      return this.divide(e, t, { precision: n, returnAsNumber: !1 });
    }
    static isValid(e) {
      try {
        let t = new _(e);
        return t.isFinite() && !t.isNaN();
      } catch {
        return !1;
      }
    }
    static format(e, t = {}) {
      let {
          precision: n = 2,
          thousandsSeparator: r = ',',
          decimalSeparator: s = '.',
          prefix: o = '',
          suffix: u = '',
        } = t,
        a = this.createDecimal(e, 'format').toFixed(n);
      if ((s !== '.' && (a = a.replace('.', s)), r)) {
        let c = a.split(s);
        ((c[0] = c[0].replace(/\B(?=(\d{3})+(?!\d))/g, r)), (a = c.join(s)));
      }
      return `${o}${a}${u}`;
    }
  },
  ve = class {
    value;
    operations = [];
    constructor(e) {
      ((this.value = new _(e)), this.operations.push(`Started with: ${e}`));
    }
    add(e) {
      return ((this.value = this.value.plus(e)), this.operations.push(`Added: ${e}`), this);
    }
    subtract(e) {
      return ((this.value = this.value.minus(e)), this.operations.push(`Subtracted: ${e}`), this);
    }
    multiply(e) {
      return ((this.value = this.value.mul(e)), this.operations.push(`Multiplied by: ${e}`), this);
    }
    divide(e) {
      if (new _(e).isZero()) throw new C('Division by zero is not allowed', 'chain_division');
      return ((this.value = this.value.div(e)), this.operations.push(`Divided by: ${e}`), this);
    }
    power(e) {
      return (
        (this.value = this.value.pow(e)),
        this.operations.push(`Raised to power: ${e}`),
        this
      );
    }
    sqrt() {
      if (this.value.isNegative())
        throw new C('Square root of negative number is not supported', 'chain_sqrt');
      return ((this.value = this.value.sqrt()), this.operations.push('Square root applied'), this);
    }
    percentage(e) {
      return (
        (this.value = this.value.mul(e).div(100)),
        this.operations.push(`Applied percentage: ${e}%`),
        this
      );
    }
    applyDiscount(e) {
      let t = this.value.mul(e).div(100);
      return (
        (this.value = this.value.minus(t)),
        this.operations.push(`Applied discount: ${e}%`),
        this
      );
    }
    addTax(e) {
      let t = this.value.mul(e).div(100);
      return ((this.value = this.value.plus(t)), this.operations.push(`Added tax: ${e}%`), this);
    }
    abs() {
      return (
        (this.value = this.value.abs()),
        this.operations.push('Absolute value applied'),
        this
      );
    }
    round(e = 0, t) {
      return (
        (this.value =
          t !== void 0 ? this.value.toDecimalPlaces(e, t) : this.value.toDecimalPlaces(e)),
        this.operations.push(`Rounded to ${e} decimal places`),
        this
      );
    }
    ceil(e = 0) {
      return (
        (this.value = this.value.toDecimalPlaces(e, _.ROUND_UP)),
        this.operations.push(`Ceiling applied with ${e} decimal places`),
        this
      );
    }
    floor(e = 0) {
      return (
        (this.value = this.value.toDecimalPlaces(e, _.ROUND_DOWN)),
        this.operations.push(`Floor applied with ${e} decimal places`),
        this
      );
    }
    toNumber() {
      return this.value.toNumber();
    }
    toDecimal() {
      return this.value;
    }
    toString() {
      return this.value.toString();
    }
    valueOf(e) {
      return K.processResult(this.value, e);
    }
    getOperationHistory() {
      return [...this.operations];
    }
    getCurrentValue() {
      return this.value;
    }
    format(e) {
      return K.format(this.value, e);
    }
  },
  dt = K.add,
  ht = K.subtract,
  gt = K.multiply,
  bt = K.divide;
export { Li as a, Hi as b, _e as c, nt as d };
