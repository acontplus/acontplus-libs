import { a as Se, b as Ne } from './chunk-O5GYERRZ.js';
import { a as Ce, b as M } from './chunk-TEMGEHUK.js';
import { a as he, b as fe } from './chunk-IS3KC4W2.js';
import { b as z } from './chunk-ZTXRY76I.js';
import './chunk-4JMGPBNX.js';
import {
  $ as Ae,
  N as Pe,
  O as be,
  P as _e,
  R as Me,
  V as Oe,
  Y as ve,
  Z as Re,
  _ as xe,
  aa as we,
  ba as Ee,
  da as Fe,
  e as q,
  ea as De,
  g as w,
  i as K,
  j as Y,
  o as J,
  s as X,
  t as Z,
  w as Q,
  x as ee,
  z as te,
} from './chunk-7JP3HI6F.js';
import './chunk-57Q2UAVZ.js';
import { a as ge } from './chunk-QJ46N2FA.js';
import {
  a as oe,
  b as re,
  c as se,
  d as ce,
  e as de,
  f as pe,
  h as le,
  i as me,
  j as ue,
} from './chunk-U7VJQUDE.js';
import { c as ne, d as ae, g as ie } from './chunk-XJJY6XHD.js';
import {
  $ as W,
  $b as s,
  Ab as f,
  Hb as G,
  Kb as b,
  Mb as _,
  Pa as d,
  Yc as j,
  ab as C,
  ac as L,
  bc as k,
  da as v,
  dd as H,
  ia as m,
  ma as V,
  na as I,
  pc as B,
  qb as u,
  qc as $,
  sb as g,
  ub as R,
  vb as x,
  wb as A,
  xb as h,
  yb as r,
  za as P,
  zb as o,
} from './chunk-GV4MRAZ3.js';
var l = class {
  static extractFileName(e) {
    let t = e.headers?.get('content-disposition');
    if (!t) return this.generateDefaultFileName();
    let n = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(t);
    if (n && n[1]) {
      let c = n[1].replace(/['"]/g, '');
      return ((c = c.replaceAll('+', ' ').trim()), c || this.generateDefaultFileName());
    }
    let a = t.split('filename=')[1];
    return a
      ? a.replace(/['"]/g, '').trim() || this.generateDefaultFileName()
      : this.generateDefaultFileName();
  }
  static fromResponse(e) {
    let t = this.extractFileName(e),
      n = e.headers?.get('content-type') || 'application/octet-stream';
    return new File([e.body], t, { type: n });
  }
  static downloadFile(e, t) {
    let n = URL.createObjectURL(e),
      a = document.createElement('a');
    ((a.href = n),
      (a.download = t),
      (a.style.display = 'none'),
      document.body.appendChild(a),
      a.click(),
      document.body.removeChild(a),
      URL.revokeObjectURL(n));
  }
  static openFile(e, t) {
    let n = URL.createObjectURL(e);
    (window.open(n, t), setTimeout(() => URL.revokeObjectURL(n), 1e3));
  }
  static isLegacyBrowser() {
    let e = navigator.userAgent;
    return !!(e.match(/Edge/g) || e.match(/.NET/g) || e.match(/MSIE/g));
  }
  static generateDefaultFileName() {
    return `document_${Date.now()}.pdf`;
  }
};
var E = class i {
  reportPort = m(Se);
  generate(e) {
    return this.reportPort.generate(e);
  }
  download(e) {
    return this.reportPort.generate(e).pipe(
      W((t) => {
        let n = l.extractFileName(t);
        t.body && l.downloadFile(t.body, n);
      }),
    );
  }
  open(e) {
    return this.reportPort.generate(e).pipe(
      W((t) => {
        let n = l.extractFileName(t);
        t.body && (l.isLegacyBrowser() ? l.downloadFile(t.body, n) : l.openFile(t.body, n));
      }),
    );
  }
  openPDF(e, t = !1) {
    return this.open({ data: e, format: 'pdf', useV1Api: t });
  }
  downloadExcel(e, t = !1) {
    return this.download({ data: e, format: 'excel', useV1Api: t });
  }
  downloadWord(e, t = !1) {
    return this.download({ data: e, format: 'word', useV1Api: t });
  }
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵprov = v({ token: i, factory: i.ɵfac, providedIn: 'root' });
};
var D = class {
  static buildDocumentDeliveryMessages(e) {
    let t = this.buildMainMessage(e),
      n = this.buildPromoMessage(e.establecimiento);
    return { main: t, promo: n };
  }
  static buildWelcomeMessage(e, t) {
    return `\xA1Hola *${e}*! \u{1F44B}

Bienvenido a *${t}*. Estamos aqu\xED para ayudarte.`;
  }
  static buildOrderConfirmationMessage(e, t) {
    return `Estimado(a) *${t}*,

\u2705 Tu pedido #${e} ha sido confirmado.

Te notificaremos cuando est\xE9 listo.`;
  }
  static buildPaymentReminderMessage(e, t, n) {
    return `Estimado(a) *${e}*,

\u{1F4B0} Recordatorio de pago:
Monto: ${t}
Vencimiento: ${n}

Gracias por tu preferencia.`;
  }
  static buildMainMessage(e) {
    let t = this.getDocumentTypeDisplay(e.tipo);
    return `Estimado(a) *${e.comprador}*,

\u{1F4C4} Su ${t} ha sido generado exitosamente.

\u{1F3EA} Establecimiento: *${e.establecimiento}*
\u{1F4CB} Serie: ${e.serie}

Adjunto encontrar\xE1 el documento solicitado.`;
  }
  static buildPromoMessage(e) {
    return `\u{1F4F1} Documento enviado por *${e}*
Powered by *Acontplus* \u{1F680}

\xBFNecesita ayuda? Cont\xE1ctenos.`;
  }
  static getDocumentTypeDisplay(e) {
    return (
      {
        FACTURA: 'factura electr\xF3nica',
        NOTA_ENTREGA: 'nota de entrega',
        PROFORMA: 'proforma',
        COTIZACION: 'cotizaci\xF3n',
        RECIBO: 'recibo',
      }[e] || 'documento'
    );
  }
};
var p = class {
  static cleanPhone(e) {
    return e.replace(/\D/g, '');
  }
  static validateEcuadorianPhone(e) {
    let t = this.cleanPhone(e);
    if (!t)
      return {
        isValid: !1,
        cleanPhone: t,
        errorMessage: 'El n\xFAmero de celular no puede estar vac\xEDo',
      };
    if (t.length < 10)
      return {
        isValid: !1,
        cleanPhone: t,
        errorMessage: 'El n\xFAmero de celular no puede ser menor a diez d\xEDgitos',
      };
    if (t.length > 10)
      return {
        isValid: !1,
        cleanPhone: t,
        errorMessage: 'El n\xFAmero de celular no puede ser mayor a diez d\xEDgitos',
      };
    let n = /^09\d{8}$/.test(t),
      a = /^593\d{9}$/.test(t);
    return !n && !a
      ? { isValid: !1, cleanPhone: t, errorMessage: 'Formato inv\xE1lido. Use: 09xxxxxxxx' }
      : { isValid: !0, cleanPhone: t };
  }
  static toInternationalFormat(e) {
    let t = this.cleanPhone(e);
    return (t.startsWith('0') && (t = '593' + t.slice(1)), t);
  }
  static formatForWhatsAppApi(e) {
    let t = this.toInternationalFormat(e);
    return t.endsWith('@c.us') ? t : `${t}@c.us`;
  }
  static formatForWhatsAppWeb(e) {
    return this.toInternationalFormat(e);
  }
  static formatForDisplay(e) {
    let t = this.cleanPhone(e);
    return t
      ? /^09\d{8}$/.test(t)
        ? `+593 ${t.slice(1, 3)} ${t.slice(3, 6)} ${t.slice(6)}`
        : /^593\d{9}$/.test(t)
          ? `+593 ${t.slice(3, 5)} ${t.slice(5, 8)} ${t.slice(8)}`
          : t.length > 10
            ? `+${t}`
            : e
      : '';
  }
  static isValidInternationalPhone(e) {
    let t = this.cleanPhone(e);
    return /^\+?[1-9]\d{1,14}$/.test(t);
  }
  static getPhoneHint(e) {
    return e
      ? this.validateEcuadorianPhone(e).isValid
        ? `Se enviar\xE1 a: ${this.formatForDisplay(e)}`
        : 'Formato: 09xxxxxxxx'
      : 'Ingrese n\xFAmero ecuatoriano (09xxxxxxxx)';
  }
  static getPhonePlaceholder() {
    return 'Ej: 0987654321';
  }
};
var S = class i {
  messagingPort = m(Ne);
  sendSimpleText(e, t, n = !0) {
    let a = p.formatForWhatsAppApi(e);
    return this.messagingPort.sendText({ to: a, message: t, previewUrl: n });
  }
  sendTemplateText(e, t, n, a = 'es_EC') {
    let c = p.formatForWhatsAppApi(e);
    return this.messagingPort.sendTextTemplate({
      to: c,
      templateName: t,
      languageCode: a,
      bodyParams: n,
    });
  }
  sendDocument(e, t, n, a) {
    let c = p.formatForWhatsAppApi(e);
    return this.messagingPort.sendDocument({ to: c, documentUrl: t, caption: n, filename: a });
  }
  deliverDocument(e) {
    let t = p.formatForWhatsAppApi(e.phone),
      n = D.buildDocumentDeliveryMessages({
        comprador: e.customerName,
        establecimiento: e.establishmentName,
        serie: e.documentSeries,
        tipo: e.documentType,
      });
    return this.messagingPort.sendDocumentTemplate({
      to: t,
      file: e.file,
      templateName: 'notificacion_documento',
      languageCode: 'es_EC',
      bodyParams: [n.main, n.promo],
    });
  }
  sendDocumentWithTemplate(e) {
    let t = p.formatForWhatsAppApi(e.phone);
    return this.messagingPort.sendDocumentTemplate({
      to: t,
      file: e.file,
      templateName: e.templateName,
      languageCode: e.languageCode || 'es_EC',
      bodyParams: e.bodyParams,
      filename: e.filename,
    });
  }
  sendDocumentWithMessages(e) {
    return this.sendDocumentWithTemplate({
      phone: e.phone,
      file: e.file,
      templateName: 'documento_generico',
      bodyParams: [e.messages.main, e.messages.promo],
    });
  }
  getProviderStatus() {
    return this.messagingPort.getStatus();
  }
  isValidPhone(e) {
    return p.isValidInternationalPhone(e);
  }
  toDisplayFormat(e) {
    return p.formatForDisplay(e);
  }
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵprov = v({ token: i, factory: i.ɵfac, providedIn: 'root' });
};
var N = class {
  static reportConfigs = {
    FV: {
      codigo: 'FV',
      hasService: !0,
      useV1Api: !0,
      idField: 'id',
      includeEstabInData: !0,
      includeCodigoInData: !0,
      hasParams: !0,
    },
    NE: {
      codigo: 'NE',
      hasService: !0,
      useV1Api: !0,
      idField: 'id',
      extraDataParams: { tipo: 1 },
      hasParams: !0,
    },
    NORMAL: { codigo: 'OR', hasService: !1, useV1Api: !1, idField: 'id', hasParams: !1 },
    NC: {
      codigo: 'NC',
      hasService: !0,
      useV1Api: !0,
      idField: 'id',
      includeEstabInData: !0,
      hasParams: !0,
    },
    ND: {
      codigo: 'ND',
      hasService: !0,
      useV1Api: !0,
      idField: 'id',
      includeEstabInData: !0,
      hasParams: !0,
    },
    GR: { codigo: 'GR', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !0 },
    FEG: { codigo: 'FEG', hasService: !0, useV1Api: !0, hasParams: !1, hasIdUsuarioRol: !0 },
    NCRG: { codigo: 'NCRG', hasService: !0, useV1Api: !0, hasParams: !1, hasIdUsuarioRol: !0 },
    LCRG: { codigo: 'LCRG', hasService: !0, useV1Api: !0, hasParams: !1, hasIdUsuarioRol: !0 },
    FCRRG: { codigo: 'FCRRG', hasService: !0, useV1Api: !0, hasParams: !1, hasIdUsuarioRol: !0 },
    RGGR: { codigo: 'RGGR', hasService: !0, useV1Api: !0, hasParams: !1, hasIdUsuarioRol: !0 },
    RRC: {
      codigo: 'RRC',
      hasService: !0,
      useV1Api: !0,
      idField: 'idDocumentoElectronico',
      hasParams: !1,
    },
    SRR: { codigo: 'SRR', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    SRRC: { codigo: 'SRRC', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    FG: { codigo: 'FG', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RCNH: { codigo: 'RCNH', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !0 },
    RLC: { codigo: 'RLC', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RRNC: { codigo: 'RRNC', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RRG: { codigo: 'RRG', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RRND: { codigo: 'RRND', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RRF: { codigo: 'RRF', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RCP: { codigo: 'RCP', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RCEGR: { codigo: 'RCEGR', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    ACEDFP: { codigo: 'ACEDFP', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    ACELC: { codigo: 'ACELC', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !1 },
    RMC: { codigo: 'RMC', hasService: !0, useV1Api: !1, hasParams: !1 },
    RAAM: { codigo: 'RAAM', hasService: !0, useV1Api: !1, hasParams: !1, hasIdUsuarioRol: !0 },
    RMIE: { codigo: 'RMIE', hasService: !1, useV1Api: !1 },
    CDCC: { codigo: 'CDCC', hasService: !0, useV1Api: !0, idField: 'id' },
    RCL: { codigo: 'RCL', hasService: !1, useV1Api: !1, idField: 'id', hasParams: !1 },
    RK: {
      codigo: 'RK',
      hasService: !1,
      useV1Api: !1,
      idField: 'id',
      hasParams: !0,
      hasIdUsuarioRol: !0,
    },
    CDAA: { codigo: 'CDAA', hasService: !0, useV1Api: !0, idField: 'id', hasParams: !1 },
    CDA: { codigo: 'CDA', hasService: !0, useV1Api: !0, idField: 'id', hasParams: !1 },
    INVRV: { codigo: 'INVRV', hasService: !0, useV1Api: !0, idField: 'id', hasParams: !1 },
    INVAT: { codigo: 'INVAT', hasService: !0, useV1Api: !0, idField: 'id', hasParams: !1 },
    RAF: { codigo: 'RAF', hasService: !0, useV1Api: !0, idField: 'id', hasParams: !1 },
    RCAA: { codigo: 'RCAA', hasService: !0, useV1Api: !0, idField: 'id', hasParams: !1 },
    RASR: { codigo: 'RASR', hasService: !0, useV1Api: !0, idField: 'id', hasParams: !1 },
    RCD: { codigo: 'RCD', hasService: !1, useV1Api: !1, idField: 'id', hasParams: !0 },
    RTB: { codigo: 'RTB', hasService: !0, useV1Api: !1, idField: 'id', hasParams: !0 },
  };
  static buildParams(e, t, n = 'pdf') {
    let a = this.getReportConfig(e),
      c = {
        hasService: a.hasService,
        reportParams: this.buildReportParams(t, a, n),
        dataParams: this.buildDataParams(t, a),
      };
    return (a.hasIdUsuarioRol !== void 0 && (c.hasIdUsuarioRol = a.hasIdUsuarioRol), c);
  }
  static shouldUseV1Api(e) {
    return this.getReportConfig(e).useV1Api;
  }
  static getReportConfig(e) {
    let t = this.reportConfigs[e];
    if (!t)
      throw new Error(
        `Tipo de reporte no soportado: ${e}. Tipos disponibles: ${Object.keys(this.reportConfigs).join(', ')}`,
      );
    return t;
  }
  static buildReportParams(e, t, n) {
    let a = { codigo: t.codigo, format: n };
    return (
      t.hasParams !== void 0 && (a.hasParams = t.hasParams),
      e.codEstab && (a.codEstab = e.codEstab),
      t.hasService && t.hasParams && (a.aditionalParams = []),
      JSON.stringify(a)
    );
  }
  static buildDataParams(e, t) {
    let n = {};
    return (
      t.idField && e[t.idField] && (n.id = e[t.idField]),
      t.includeEstabInData && e.codEstab && (n.codEstab = e.codEstab),
      t.includeCodigoInData && (n.codigo = t.codigo),
      t.extraDataParams && Object.assign(n, t.extraDataParams),
      Object.keys(e).forEach((a) => {
        !['codEstab', 'id', 'serie'].includes(a) && e[a] !== void 0 && (n[a] = e[a]);
      }),
      JSON.stringify(n)
    );
  }
  static build(e) {
    let { codeReport: t, data: n, format: a = 'pdf' } = e;
    return { data: this.buildParams(t, n, a), format: a, useV1Api: this.shouldUseV1Api(t) };
  }
  static getSupportedDocumentTypes() {
    return Object.keys(this.reportConfigs);
  }
  static isDocumentTypeSupported(e) {
    return e in this.reportConfigs;
  }
  static registerReportType(e, t) {
    this.reportConfigs[e] = t;
  }
};
function Le(i, e) {
  if ((i & 1 && (r(0, 'mat-option', 15), s(1), o()), i & 2)) {
    let t = e.$implicit;
    (h('value', t), d(), L(t));
  }
}
function ke(i, e) {
  if ((i & 1 && (r(0, 'mat-select', 5), x(1, Le, 2, 2, 'mat-option', 15, R), o()), i & 2)) {
    let t = _();
    (d(), A(t.phoneNumbers()));
  }
}
function Ue(i, e) {
  if ((i & 1 && f(0, 'input', 6), i & 2)) {
    let t = _();
    h('placeholder', t.phonePlaceholder);
  }
}
function Ge(i, e) {
  i & 1 && (r(0, 'mat-error'), s(1, 'El n\xFAmero de tel\xE9fono es requerido'), o());
}
function Be(i, e) {
  i & 1 &&
    (r(0, 'mat-error'), s(1, 'Ingrese un n\xFAmero ecuatoriano v\xE1lido (09xxxxxxxx)'), o());
}
function $e(i, e) {
  i & 1 && (r(0, 'mat-error'), s(1, 'El mensaje es requerido'), o());
}
function je(i, e) {
  i & 1 && (r(0, 'mat-icon'), s(1, 'send'), o());
}
function He(i, e) {
  i & 1 && f(0, 'mat-spinner', 12);
}
function ze(i, e) {
  if (i & 1) {
    let t = G();
    (r(0, 'div', 14)(1, 'mat-icon'),
      s(2, 'info'),
      o(),
      r(3, 'span'),
      s(4, '\xBFNo se pudo enviar? Prueba enviando directamente:'),
      o(),
      r(5, 'button', 16),
      b('click', function () {
        V(t);
        let a = _();
        return I(a.openWhatsAppWeb());
      }),
      r(6, 'mat-icon'),
      s(7, 'open_in_new'),
      o(),
      s(8, ' Abrir WhatsApp Web '),
      o(),
      r(9, 'button', 17),
      b('click', function () {
        V(t);
        let a = _();
        return I(a.hideWhatsAppWebLink());
      }),
      r(10, 'mat-icon'),
      s(11, 'close'),
      o()()());
  }
}
var y = class i {
  config;
  fb = m(ee);
  whatsappFacade = m(S);
  reportFacade = m(E);
  snackBar = m(he);
  whatsappForm;
  isLoading = P(!1);
  messageLength = 0;
  phoneNumbers = P([]);
  showWhatsAppWebLink = P(!1);
  whatsAppWebUrl = P('');
  establishmentPhone = '';
  establishmentName = '';
  customerName = '';
  ngOnInit() {
    (this.initializeForm(), this.setupMessageLengthCounter(), this.loadConfigData());
  }
  loadConfigData() {
    this.config &&
      (this.config.phoneNumbers &&
        (this.phoneNumbers.set(this.config.phoneNumbers),
        this.config.phoneNumbers.length > 0 &&
          this.whatsappForm.patchValue({ phoneNumber: this.config.phoneNumbers[0] })),
      this.config.defaultMessage &&
        this.whatsappForm.patchValue({ message: this.config.defaultMessage }),
      (this.establishmentPhone = this.config.establishmentPhone || ''),
      (this.establishmentName = this.config.establishmentName || ''),
      (this.customerName = this.config.customerName || ''));
  }
  initializeForm() {
    this.whatsappForm = this.fb.group({
      phoneNumber: ['', [w.required, this.ecuadorianPhoneValidator.bind(this)]],
      message: ['', [w.required, w.maxLength(500)]],
    });
  }
  ecuadorianPhoneValidator(e) {
    return e.value
      ? p.validateEcuadorianPhone(e.value).isValid
        ? null
        : { invalidPhone: !0 }
      : null;
  }
  setupMessageLengthCounter() {
    this.whatsappForm.get('message')?.valueChanges.subscribe((e) => {
      this.messageLength = e ? e.length : 0;
    });
  }
  sendWhatsApp() {
    if (this.whatsappForm.valid) {
      if (!this.validatePhoneNumber()) return;
      let { phoneNumber: e, message: t } = this.whatsappForm.value;
      this.config?.documentData ? this.sendWithDocument(e, t) : this.sendSimpleMessage(e, t);
    }
  }
  validatePhoneNumber() {
    let e = this.whatsappForm.get('phoneNumber')?.value,
      t = p.validateEcuadorianPhone(e);
    return t.isValid
      ? !0
      : (this.showError(t.errorMessage || 'N\xFAmero de tel\xE9fono inv\xE1lido'), !1);
  }
  sendSimpleMessage(e, t) {
    (this.isLoading.set(!0),
      this.whatsappFacade.sendSimpleText(e, t).subscribe({
        next: (n) => {
          (this.isLoading.set(!1),
            n.success
              ? (this.showSuccess('Mensaje enviado exitosamente'), this.clearForm())
              : (this.showError(n.error?.message || 'Error al enviar mensaje'),
                this.prepareWhatsAppWebLink(e, t)));
        },
        error: (n) => {
          (this.isLoading.set(!1),
            this.showError('Error de conexi\xF3n'),
            this.prepareWhatsAppWebLink(e, t));
        },
      }));
  }
  sendWithDocument(e, t) {
    this.config?.documentData &&
      (this.isLoading.set(!0),
      this.generateReport().subscribe({
        next: (n) => {
          if (n) {
            let { file: a, fileName: c } = this.processReportFile(n);
            this.sendMediaWithMessages(e, t, a, c);
          }
        },
        error: (n) => {
          (this.isLoading.set(!1),
            console.error('Error generando reporte:', n),
            this.showError('Error al generar el documento'));
        },
      }));
  }
  generateReport() {
    let e = this.config.documentData,
      t = N.build({ codeReport: e.codDoc, data: e, format: 'pdf' });
    return this.reportFacade.generate(t);
  }
  processReportFile(e) {
    let t = l.fromResponse(e),
      n = l.extractFileName(e);
    return { file: t, fileName: n };
  }
  sendMediaWithMessages(e, t, n, a) {
    let c = p.formatForWhatsAppApi(e);
    this.whatsappFacade
      .sendDocumentWithTemplate({
        phone: c,
        file: n,
        templateName: 'documento_generico',
        bodyParams: [t],
        filename: a,
      })
      .subscribe({
        next: () => {
          (this.isLoading.set(!1),
            this.showSuccess('Documento enviado correctamente'),
            this.clearForm());
        },
        error: (O) => {
          (this.isLoading.set(!1),
            console.error('Error enviando documento:', O),
            this.showError('Error al enviar el documento'),
            this.prepareWhatsAppWebLink(e, t));
        },
      });
  }
  prepareWhatsAppWebLink(e, t) {
    let n = p.formatForWhatsAppWeb(e),
      a = encodeURIComponent(t),
      c = `https://wa.me/${n}?text=${a}`;
    (this.whatsAppWebUrl.set(c), this.showWhatsAppWebLink.set(!0));
  }
  openWhatsAppWeb() {
    let e = this.whatsAppWebUrl();
    e && window.open(e, '_blank', 'noopener,noreferrer');
  }
  hideWhatsAppWebLink() {
    (this.showWhatsAppWebLink.set(!1), this.whatsAppWebUrl.set(''));
  }
  showSuccess(e) {
    this.snackBar.open(e, 'Cerrar', { duration: 3e3, panelClass: ['success-snackbar'] });
  }
  showError(e) {
    this.snackBar.open(e, 'Cerrar', { duration: 5e3, panelClass: ['error-snackbar'] });
  }
  clearForm() {
    (this.whatsappForm.reset(), (this.messageLength = 0), this.hideWhatsAppWebLink());
  }
  get formattedPhoneDisplay() {
    let e = this.whatsappForm.get('phoneNumber')?.value;
    return p.formatForDisplay(e || '');
  }
  get phonePlaceholder() {
    return p.getPhonePlaceholder();
  }
  get phoneHint() {
    let e = this.whatsappForm.get('phoneNumber')?.value;
    return p.getPhoneHint(e || '');
  }
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = C({
    type: i,
    selectors: [['acp-whatsapp-sender']],
    inputs: { config: 'config' },
    decls: 43,
    vars: 13,
    consts: [
      [1, 'whatsapp-sender-container'],
      [1, 'sender-card'],
      ['mat-card-avatar', '', 1, 'whatsapp-avatar'],
      [3, 'ngSubmit', 'formGroup'],
      ['appearance', 'outline', 1, 'full-width'],
      ['formControlName', 'phoneNumber'],
      ['matInput', '', 'formControlName', 'phoneNumber', 'type', 'tel', 3, 'placeholder'],
      ['matSuffix', ''],
      [
        'matInput',
        '',
        'formControlName',
        'message',
        'placeholder',
        'Escribe tu mensaje aqu\xED...',
        'rows',
        '4',
        'maxlength',
        '500',
      ],
      ['align', 'end'],
      [1, 'action-buttons'],
      [
        'mat-raised-button',
        '',
        'color',
        'primary',
        'type',
        'submit',
        1,
        'send-button',
        3,
        'disabled',
      ],
      ['diameter', '20'],
      ['mat-button', '', 'type', 'button', 3, 'click', 'disabled'],
      [1, 'whatsapp-web-link'],
      [3, 'value'],
      ['mat-button', '', 'color', 'accent', 3, 'click'],
      ['mat-icon-button', '', 'aria-label', 'Cerrar', 3, 'click'],
    ],
    template: function (t, n) {
      if (
        (t & 1 &&
          (r(0, 'div', 0)(1, 'mat-card', 1)(2, 'mat-card-header')(3, 'div', 2)(4, 'mat-icon'),
          s(5, 'chat'),
          o()(),
          r(6, 'mat-card-title'),
          s(7, 'Enviar por WhatsApp'),
          o(),
          r(8, 'mat-card-subtitle'),
          s(9, 'Comparte contenido directamente'),
          o()(),
          r(10, 'mat-card-content')(11, 'form', 3),
          b('ngSubmit', function () {
            return n.sendWhatsApp();
          }),
          r(12, 'mat-form-field', 4)(13, 'mat-label'),
          s(14, 'N\xFAmero de tel\xE9fono'),
          o(),
          u(15, ke, 3, 0, 'mat-select', 5)(16, Ue, 1, 1, 'input', 6),
          r(17, 'mat-icon', 7),
          s(18, 'phone'),
          o(),
          r(19, 'mat-hint'),
          s(20),
          o(),
          u(21, Ge, 2, 0, 'mat-error'),
          u(22, Be, 2, 0, 'mat-error'),
          o(),
          r(23, 'mat-form-field', 4)(24, 'mat-label'),
          s(25, 'Mensaje'),
          o(),
          r(26, 'textarea', 8),
          s(27, '          '),
          o(),
          r(28, 'mat-icon', 7),
          s(29, 'message'),
          o(),
          r(30, 'mat-hint', 9),
          s(31),
          o(),
          u(32, $e, 2, 0, 'mat-error'),
          o(),
          r(33, 'div', 10)(34, 'button', 11),
          u(35, je, 2, 0, 'mat-icon'),
          u(36, He, 1, 0, 'mat-spinner', 12),
          s(37),
          o(),
          r(38, 'button', 13),
          b('click', function () {
            return n.clearForm();
          }),
          r(39, 'mat-icon'),
          s(40, 'clear'),
          o(),
          s(41, ' Limpiar '),
          o()(),
          u(42, ze, 12, 0, 'div', 14),
          o()()()()),
        t & 2)
      ) {
        let a, c, O;
        (d(11),
          h('formGroup', n.whatsappForm),
          d(4),
          g(n.phoneNumbers().length > 1 ? 15 : 16),
          d(5),
          L(n.phoneHint),
          d(),
          g((a = n.whatsappForm.get('phoneNumber')) != null && a.hasError('required') ? 21 : -1),
          d(),
          g(
            (c = n.whatsappForm.get('phoneNumber')) != null && c.hasError('invalidPhone') ? 22 : -1,
          ),
          d(9),
          k('', n.messageLength, '/500 caracteres'),
          d(),
          g((O = n.whatsappForm.get('message')) != null && O.hasError('required') ? 32 : -1),
          d(2),
          h('disabled', n.whatsappForm.invalid || n.isLoading()),
          d(),
          g(n.isLoading() ? -1 : 35),
          d(),
          g(n.isLoading() ? 36 : -1),
          d(),
          k(' ', n.isLoading() ? 'Enviando...' : 'Enviar por WhatsApp', ' '),
          d(),
          h('disabled', n.isLoading()),
          d(4),
          g(n.showWhatsAppWebLink() ? 42 : -1));
      }
    },
    dependencies: [
      H,
      te,
      J,
      q,
      K,
      Y,
      Q,
      Z,
      X,
      ue,
      se,
      me,
      de,
      le,
      pe,
      ce,
      ve,
      Oe,
      Pe,
      _e,
      be,
      Me,
      xe,
      Re,
      ie,
      ae,
      ne,
      re,
      oe,
      we,
      Ae,
      fe,
      De,
      Fe,
      Ee,
    ],
    styles: [
      '.whatsapp-sender-container[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:16px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]{box-shadow:0 4px 8px #0000001a;border-radius:12px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding-bottom:16px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .whatsapp-avatar[_ngcontent-%COMP%]{background:linear-gradient(135deg,#25d366,#128c7e);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:50%;width:40px;height:40px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .whatsapp-avatar[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:24px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{color:#128c7e;font-weight:600}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%]{color:#666}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding-top:0}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{width:100%;margin-bottom:16px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;flex-wrap:wrap}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%]{background:linear-gradient(135deg,#25d366,#128c7e);color:#fff;min-width:180px;height:44px;border-radius:22px;font-weight:500}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%]:hover:not(:disabled){background:linear-gradient(135deg,#128c7e,#25d366);transform:translateY(-1px);box-shadow:0 4px 12px #25d3664d}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%]:disabled{background:#ccc;color:#666}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:8px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-button[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%]{margin-right:8px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]{color:#666;border-radius:22px;height:44px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]:hover:not(:disabled){background-color:#0000000a}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:4px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-top:16px;padding:12px 16px;background-color:#f5f5f5;border-radius:8px;border-left:4px solid #25d366;flex-wrap:wrap}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:first-child{color:#25d366;font-size:20px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#666;font-size:14px;flex:1;min-width:200px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]{color:#25d366;font-weight:500;border-radius:20px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]:hover{background-color:#25d3661a}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:4px;font-size:18px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%]{color:#999;width:32px;height:32px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%]:hover{background-color:#0000001a}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px}@media(max-width:600px){.whatsapp-sender-container[_ngcontent-%COMP%]{padding:8px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;margin-bottom:8px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;gap:12px}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{min-width:auto;width:100%}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]{width:100%;justify-content:center}.whatsapp-sender-container[_ngcontent-%COMP%]   .sender-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .whatsapp-web-link[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%]{align-self:flex-end;position:absolute;top:8px;right:8px}}.whatsapp-sender-container[_ngcontent-%COMP%]   mat-form-field.mat-form-field-appearance-outline[_ngcontent-%COMP%]   .mat-form-field-outline[_ngcontent-%COMP%]{color:#e0e0e0}.whatsapp-sender-container[_ngcontent-%COMP%]   mat-form-field.mat-form-field-appearance-outline.mat-focused[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%]{color:#25d366}.whatsapp-sender-container[_ngcontent-%COMP%]   mat-form-field.mat-form-field-appearance-outline[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:#666}.whatsapp-sender-container[_ngcontent-%COMP%]   mat-form-field.mat-form-field-appearance-outline.mat-focused[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:#25d366}.whatsapp-sender-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   mat-icon[matSuffix][_ngcontent-%COMP%]{color:#25d366}.whatsapp-sender-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   .mat-hint[_ngcontent-%COMP%]{color:#999;font-size:12px}.whatsapp-sender-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   .mat-error[_ngcontent-%COMP%]{color:#f44336;font-size:12px}',
    ],
  });
};
var T = class i {
  static ɵfac = function (t) {
    return new (t || i)();
  };
  static ɵcmp = C({
    type: i,
    selectors: [['app-notification-example']],
    decls: 1,
    vars: 0,
    template: function (t, n) {
      t & 1 && f(0, 'acp-whatsapp-sender');
    },
    dependencies: [y],
    encapsulation: 2,
  });
};
M.highlightAll();
var Te = `<acp-data-grid [data]="list" [columns]="columns" [trackBy]="trackByName"></acp-data-grid>
`,
  We = `
import { DataGrid, DataGridColumn } from '@acontplus/ng-components';
import { Component } from '@angular/core';
import { EXAMPLE_DATA } from '../../data';

@Component({
  selector: 'app-data-grid-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DataGrid],
})
export class App {
  columns: DataGridColumn[] = [
    { header: 'Name', field: 'name' },
    {
      header: 'Weight',
      field: 'weight',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.2-2',
      },
    },
    { header: 'Gender', field: 'gender' },
    { header: 'Mobile', field: 'mobile' },
    { header: 'City', field: 'city' },
    {
      header: 'Date',
      field: 'date',
      type: 'date',
      typeParameter: {
        format: 'yyyy-MM-dd',
      },
    },
  ];

  list = EXAMPLE_DATA;

  trackByName(index: number, item: any) {
    return item.name;
  }
}

`,
  Ve = '/* Estilos espec\xEDficos para el ejemplo de Data Grid b\xE1sico */',
  Ie = {
    title: 'Example',
    component: T,
    files: [
      { file: 'app.html', content: M.highlightAuto(Te).value, filecontent: Te },
      { file: 'app.ts', content: M.highlightAuto(We).value, filecontent: We },
      { file: 'app.styles', content: M.highlightAuto(Ve).value, filecontent: Ve },
    ],
  };
function qe(i, e) {
  if ((i & 1 && f(0, 'app-doc-heading', 0)(1, 'app-example-viewer', 1), i & 2)) {
    let t = e.$implicit;
    (h('text', t.title), d(), h('exampleData', t));
  }
}
function Ke(i, e) {
  (i & 1 && x(0, qe, 2, 2, null, null, R), i & 2 && A(e.examples));
}
var U = class i {
    route = m(z);
    examples = [];
    static ɵfac = function (t) {
      return new (t || i)();
    };
    static ɵcmp = C({
      type: i,
      selectors: [['app-notifications']],
      decls: 4,
      vars: 3,
      consts: [
        [3, 'text'],
        [3, 'exampleData'],
      ],
      template: function (t, n) {
        if (
          (t & 1 && (r(0, 'p'), s(1, 'Notifications Module'), o(), u(2, Ke, 2, 0), B(3, 'async')),
          t & 2)
        ) {
          let a;
          (d(2), g((a = $(3, 1, n.route.data)) ? 2 : -1, a));
        }
      },
      dependencies: [ge, Ce, j],
      encapsulation: 2,
    });
  },
  Qt = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: U, pathMatch: 'full', data: { examples: [Ie] } },
    { path: '**', redirectTo: 'overview' },
  ];
export { U as Notifications, Qt as routes };
