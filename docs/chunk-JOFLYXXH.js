import { a as Fe, b as g } from './chunk-TEMGEHUK.js';
import './chunk-IS3KC4W2.js';
import { b as he } from './chunk-ZTXRY76I.js';
import './chunk-4JMGPBNX.js';
import {
  F as Ye,
  G as Be,
  M as L,
  N as S,
  O as C,
  P as h,
  j as K,
  k as Q,
  l as X,
} from './chunk-H5QXEMOA.js';
import {
  N as Ie,
  V as He,
  Y as k,
  Z as Ne,
  _ as w,
  ba as Le,
  da as ze,
  e as Ce,
  ea as Ve,
  i as E,
  j as _e,
  k as Pe,
  m as R,
  n as De,
  o as Oe,
  p as be,
  q as U,
  s as ye,
  t as ve,
  u as ke,
  v as we,
  y as Se,
  z as N,
} from './chunk-7JP3HI6F.js';
import './chunk-57Q2UAVZ.js';
import { a as Te } from './chunk-QJ46N2FA.js';
import {
  a as J,
  b as Re,
  c as P,
  d as D,
  e as O,
  f as b,
  g as A,
  h as y,
  j as v,
} from './chunk-U7VJQUDE.js';
import { d as Ee, g as Ae } from './chunk-XJJY6XHD.js';
import {
  $b as n,
  $c as B,
  Ab as I,
  Ec as Me,
  Kb as s,
  Mb as Y,
  Pa as r,
  Yc as xe,
  _c as _,
  a as j,
  ab as x,
  ac as u,
  b as G,
  cc as q,
  dc as Z,
  ia as se,
  pc as f,
  qb as T,
  qc as H,
  rc as M,
  sb as F,
  sc as W,
  ub as me,
  vb as ge,
  wb as ue,
  xb as c,
  xc as fe,
  yb as t,
  za as p,
  zb as e,
} from './chunk-GV4MRAZ3.js';
var ee = class m {
  selectedStartDate = p(new Date());
  selectedEndDate = p(new Date());
  selectedLabel = p(null);
  currentTheme = 'material';
  isSelected = !1;
  checkboxPosition = 'prefix';
  ranges = {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 1440 * 60 * 1e3), new Date(Date.now() - 1440 * 60 * 1e3)],
    '\xDAltimos 7 d\xEDas': [new Date(Date.now() - 8640 * 60 * 1e3), new Date()],
    '\xDAltimos 30 d\xEDas': [new Date(Date.now() - 696 * 60 * 60 * 1e3), new Date()],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  };
  pickerOptions = {
    ranges: this.ranges,
    theme: C,
    locale: S,
    autoApply: !1,
    showDropdowns: !0,
    linkedCalendars: !0,
  };
  onDateRangeSelected(o) {
    (console.log(o, 'event rango seleccionado'),
      o &&
        o.from &&
        o.to &&
        (this.selectedStartDate.set(o.from),
        this.selectedEndDate.set(o.to),
        this.selectedLabel.set(o.label || null)));
  }
  switchTheme(o) {
    ((this.currentTheme = o), (this.pickerOptions = G(j({}, this.pickerOptions), { theme: C })));
  }
  onCheckboxChange(o) {
    this.isSelected = o;
  }
  switchCheckboxPosition(o) {
    this.checkboxPosition = o;
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-basic-example']],
    decls: 53,
    vars: 19,
    consts: [
      [1, 'example-card'],
      [1, 'example-container'],
      [
        'label',
        'Seleccionar rango de fechas',
        'placeholderText',
        'Selecciona un rango de fechas',
        'calendarIcon',
        'date_range',
        3,
        'dateRangeSelected',
        'checkboxChange',
        'options',
        'showCheckbox',
        'checkboxChecked',
        'checkboxPosition',
      ],
      [1, 'result-display'],
      [1, 'result-grid'],
      [1, 'result-item'],
      [1, 'theme-controls'],
      [1, 'theme-buttons'],
      ['mat-raised-button', '', 3, 'click', 'color'],
      [1, 'checkbox-controls'],
      [1, 'checkbox-buttons'],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'mat-card', 0)(1, 'mat-card-header')(2, 'mat-card-title'),
        n(3, 'DateRangePicker B\xE1sico'),
        e(),
        t(4, 'mat-card-subtitle'),
        n(5, 'Ejemplo b\xE1sico usando el componente Angular'),
        e()(),
        t(6, 'mat-card-content')(7, 'div', 1)(8, 'acp-date-range-picker', 2),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        })('checkboxChange', function (i) {
          return a.onCheckboxChange(i);
        }),
        e(),
        t(9, 'div', 3)(10, 'h4'),
        n(11, 'Resultado de la selecci\xF3n:'),
        e(),
        t(12, 'div', 4)(13, 'div', 5)(14, 'strong'),
        n(15, 'Fecha inicio:'),
        e(),
        t(16, 'span'),
        n(17),
        f(18, 'date'),
        e()(),
        t(19, 'div', 5)(20, 'strong'),
        n(21, 'Fecha fin:'),
        e(),
        t(22, 'span'),
        n(23),
        f(24, 'date'),
        e()(),
        t(25, 'div', 5)(26, 'strong'),
        n(27, 'Etiqueta:'),
        e(),
        t(28, 'span'),
        n(29),
        e()(),
        t(30, 'div', 5)(31, 'strong'),
        n(32, 'Seleccionado:'),
        e(),
        t(33, 'span'),
        n(34),
        e()()()(),
        t(35, 'div', 6)(36, 'h4'),
        n(37, 'Cambiar tema:'),
        e(),
        t(38, 'div', 7)(39, 'button', 8),
        s('click', function () {
          return a.switchTheme('default');
        }),
        n(40, ' Default '),
        e(),
        t(41, 'button', 8),
        s('click', function () {
          return a.switchTheme('bootstrap');
        }),
        n(42, ' Bootstrap '),
        e(),
        t(43, 'button', 8),
        s('click', function () {
          return a.switchTheme('material');
        }),
        n(44, ' Material '),
        e()()(),
        t(45, 'div', 9)(46, 'h4'),
        n(47, 'Posici\xF3n del checkbox:'),
        e(),
        t(48, 'div', 10)(49, 'button', 8),
        s('click', function () {
          return a.switchCheckboxPosition('prefix');
        }),
        n(50, ' Prefix (Izquierda) '),
        e(),
        t(51, 'button', 8),
        s('click', function () {
          return a.switchCheckboxPosition('suffix');
        }),
        n(52, ' Suffix (Derecha) '),
        e()()()()()()),
        l & 2 &&
          (r(8),
          c('options', a.pickerOptions)('showCheckbox', !0)('checkboxChecked', a.isSelected)(
            'checkboxPosition',
            a.checkboxPosition,
          ),
          r(9),
          u(M(18, 13, a.selectedStartDate(), 'dd/MM/yyyy')),
          r(6),
          u(M(24, 16, a.selectedEndDate(), 'dd/MM/yyyy')),
          r(6),
          u(a.selectedLabel() || 'Personalizado'),
          r(5),
          u(a.isSelected ? 'S\xED' : 'No'),
          r(5),
          c('color', a.currentTheme === 'default' ? 'primary' : ''),
          r(2),
          c('color', a.currentTheme === 'bootstrap' ? 'primary' : ''),
          r(2),
          c('color', a.currentTheme === 'material' ? 'primary' : ''),
          r(6),
          c('color', a.checkboxPosition === 'prefix' ? 'accent' : ''),
          r(2),
          c('color', a.checkboxPosition === 'suffix' ? 'accent' : '')));
    },
    dependencies: [w, k, v, P, O, y, b, D, Ae, Ee, h, _],
    styles: [
      '.example-card[_ngcontent-%COMP%]{max-width:800px;margin:20px auto}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]{padding:16px 0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]{display:block;width:100%;margin-bottom:30px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{margin-top:20px;padding:16px;background-color:#f5f5f5;border-radius:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#333;font-size:16px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #e0e0e0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#666;font-weight:500}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#333;font-weight:600}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .theme-controls[_ngcontent-%COMP%]{margin-top:30px;padding:20px;background-color:#fff3e0;border-radius:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .theme-controls[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:16px;color:#ef6c00}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .theme-controls[_ngcontent-%COMP%]   .theme-buttons[_ngcontent-%COMP%]{display:flex;gap:12px;flex-wrap:wrap}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .theme-controls[_ngcontent-%COMP%]   .theme-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-width:100px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .checkbox-controls[_ngcontent-%COMP%]{margin-top:20px;padding:20px;background-color:#e8f5e8;border-radius:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .checkbox-controls[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:16px;color:#2e7d32}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .checkbox-controls[_ngcontent-%COMP%]   .checkbox-buttons[_ngcontent-%COMP%]{display:flex;gap:12px;flex-wrap:wrap}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .checkbox-controls[_ngcontent-%COMP%]   .checkbox-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-width:140px}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#fff;font-size:14px}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:4px;padding:12px;margin:0;overflow-x:auto}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Monaco,Menlo,Ubuntu Mono,monospace;font-size:12px;color:#495057;line-height:1.4}',
    ],
  });
};
g.highlightAll();
var Ue = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>DateRangePicker B\xE1sico</mat-card-title>
    <mat-card-subtitle>Ejemplo b\xE1sico usando el componente Angular</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <!-- Componente DateRangePicker -->
      <acp-date-range-picker
        [ranges]="ranges"
        [presetTheme]="currentTheme"
        [autoApply]="false"
        [showDropdowns]="true"
        [linkedCalendars]="true"
        [showCustomRangeLabel]="true"
        placeholderText="Selecciona un rango de fechas"
        (dateRangeSelected)="onDateRangeSelected($event)"
      ></acp-date-range-picker>

      <!-- Resultado de la selecci\xF3n -->
      <div class="result-display">
        <h4>Resultado de la selecci\xF3n:</h4>
        <div class="result-grid">
          <div class="result-item">
            <strong>Fecha inicio:</strong>
            <span>{{ selectedStartDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="result-item">
            <strong>Fecha fin:</strong>
            <span>{{ selectedEndDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="result-item">
            <strong>Etiqueta:</strong>
            <span>{{ selectedLabel || 'Personalizado' }}</span>
          </div>
        </div>
      </div>

      <!-- Controles de tema -->
      <div class="theme-controls">
        <h4>Cambiar tema:</h4>
        <div class="theme-buttons">
          <button
            mat-raised-button
            [color]="currentTheme === 'default' ? 'primary' : ''"
            (click)="switchTheme('default')"
          >
            Default
          </button>
          <button
            mat-raised-button
            [color]="currentTheme === 'bootstrap' ? 'primary' : ''"
            (click)="switchTheme('bootstrap')"
          >
            Bootstrap
          </button>
          <button
            mat-raised-button
            [color]="currentTheme === 'material' ? 'primary' : ''"
            (click)="switchTheme('material')"
          >
            Material
          </button>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`,
  $e = `import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.styles',
  imports: [
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    DateRangePicker,
  ],
})
export class App {
  // Propiedades para mostrar los valores seleccionados
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;
  currentTheme: 'default' | 'bootstrap' | 'material' = 'material';

  // Rangos predefinidos
  ranges = {
    'Hoy': [new Date(), new Date()] as [Date, Date],
    'Ayer': [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date(Date.now() - 24 * 60 * 60 * 1000)] as [Date, Date],
    '\xDAltimos 7 d\xEDas': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
    '\xDAltimos 30 d\xEDas': [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ] as [Date, Date],
  } as Record<string, [Date, Date]>;

  // Manejador de eventos cuando se selecciona un rango
  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
  }

  // Cambiar tema
  switchTheme(themeName: 'default' | 'bootstrap' | 'material') {
    this.currentTheme = themeName;
  }
}`,
  je = `.example-card {
  max-width: 800px;
  margin: 20px auto;

  .example-container {
    padding: 16px 0;

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    .form-section {
      margin: 30px 0;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;

      h4 {
        margin-bottom: 16px;
        color: #495057;
      }

      .form-value {
        margin-top: 16px;

        h5 {
          margin-bottom: 8px;
          color: #6c757d;
        }

        pre {
          background-color: #fff;
          padding: 12px;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          font-size: 12px;
          overflow-x: auto;
        }
      }
    }

    .result-display {
      margin: 30px 0;
      padding: 20px;
      background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
      border-radius: 12px;

      h4 {
        margin-bottom: 16px;
        color: #1976d2;
      }

      .result-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;

        .result-item {
          padding: 12px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          border-left: 4px solid #1976d2;

          strong {
            display: block;
            color: #1565c0;
            margin-bottom: 4px;
          }

          span {
            color: #424242;
            font-size: 14px;
          }
        }
      }
    }

    .theme-controls {
      margin-top: 30px;
      padding: 20px;
      background-color: #fff3e0;
      border-radius: 8px;

      h4 {
        margin-bottom: 16px;
        color: #ef6c00;
      }

      .theme-buttons {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;

        button {
          min-width: 100px;
        }
      }
    }
  }
}`,
  Ge = {
    title: 'B\xE1sico',
    component: ee,
    files: [
      { file: 'app.html', content: g.highlightAuto(Ue).value, filecontent: { default: Ue } },
      { file: 'app.ts', content: g.highlightAuto($e).value, filecontent: { default: $e } },
      { file: 'app.styles', content: g.highlightAuto(je).value, filecontent: { default: je } },
    ],
  };
var te = class m {
  dateRangeControl = new R({ startDate: new Date(), endDate: new Date() });
  selectedStartDate = p(new Date());
  selectedEndDate = p(new Date());
  selectedLabel = p('Hoy');
  ranges = {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 1440 * 60 * 1e3), new Date(Date.now() - 1440 * 60 * 1e3)],
    '\xDAltimos 7 d\xEDas': [new Date(Date.now() - 8640 * 60 * 1e3), new Date()],
    '\xDAltimos 30 d\xEDas': [new Date(Date.now() - 696 * 60 * 60 * 1e3), new Date()],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  };
  autoApplyOptions = {
    ranges: this.ranges,
    theme: C,
    locale: S,
    autoApply: !0,
    showDropdowns: !0,
    linkedCalendars: !0,
    alwaysShowCalendars: !1,
  };
  onDateRangeSelected(o) {
    o &&
      o.from &&
      o.to &&
      (this.selectedStartDate.set(o.from),
      this.selectedEndDate.set(o.to),
      this.selectedLabel.set(o.label || null));
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-auto-apply-example']],
    decls: 43,
    vars: 14,
    consts: [
      [1, 'example-card'],
      [1, 'example-container'],
      [
        'placeholderText',
        'Haz clic para seleccionar',
        3,
        'dateRangeSelected',
        'formControl',
        'options',
      ],
      [1, 'result-display'],
      [1, 'result-grid'],
      [1, 'result-item'],
      [1, 'form-values'],
      [1, 'config-info'],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'mat-card', 0)(1, 'mat-card-header')(2, 'mat-card-title'),
        n(3, 'Auto-Apply DateRangePicker'),
        e(),
        t(4, 'mat-card-subtitle'),
        n(
          5,
          'Selecci\xF3n autom\xE1tica sin botones Aplicar/Cancelar usando el componente Angular',
        ),
        e()(),
        t(6, 'mat-card-content')(7, 'div', 1)(8, 'acp-date-range-picker', 2),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        }),
        e(),
        t(9, 'div', 3)(10, 'h4'),
        n(11, 'Resultado:'),
        e(),
        t(12, 'div', 4)(13, 'div', 5)(14, 'strong'),
        n(15, 'Fecha inicio:'),
        e(),
        t(16, 'span'),
        n(17),
        f(18, 'date'),
        e()(),
        t(19, 'div', 5)(20, 'strong'),
        n(21, 'Fecha fin:'),
        e(),
        t(22, 'span'),
        n(23),
        f(24, 'date'),
        e()(),
        t(25, 'div', 5)(26, 'strong'),
        n(27, 'Etiqueta:'),
        e(),
        t(28, 'span'),
        n(29),
        e()()()(),
        t(30, 'div', 6)(31, 'h4'),
        n(32, 'Valor del FormControl:'),
        e(),
        t(33, 'pre'),
        n(34),
        f(35, 'json'),
        e()()()(),
        t(36, 'mat-card-actions')(37, 'div', 7)(38, 'h4'),
        n(39, 'Configuraci\xF3n del Componente:'),
        e(),
        t(40, 'pre')(41, 'code'),
        n(
          42,
          `<acp-date-range-picker
  [options]="autoApplyOptions"
  placeholderText="Haz clic para seleccionar"
  (dateRangeSelected)="onDateRangeSelected($event)">
</acp-date-range-picker>`,
        ),
        e()()()()()),
        l & 2 &&
          (r(8),
          c('formControl', a.dateRangeControl)('options', a.autoApplyOptions),
          r(9),
          u(M(18, 6, a.selectedStartDate(), 'dd/MM/yyyy')),
          r(6),
          u(M(24, 9, a.selectedEndDate(), 'dd/MM/yyyy')),
          r(6),
          u(a.selectedLabel() || 'Personalizado'),
          r(5),
          u(H(35, 12, a.dateRangeControl.value))));
    },
    dependencies: [w, k, v, P, A, O, y, b, D, h, N, E, U, _, B],
    styles: [
      '.example-card[_ngcontent-%COMP%]{max-width:600px;margin:20px auto}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]{padding:16px 0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{margin-top:20px;padding:16px;background-color:#f5f5f5;border-radius:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#333;font-size:16px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #e0e0e0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#666;font-weight:500}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-grid[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#333;font-weight:600}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#fff;font-size:14px}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:4px;padding:12px;margin:0;overflow-x:auto}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Monaco,Menlo,Ubuntu Mono,monospace;font-size:12px;color:#495057;line-height:1.4}',
    ],
  });
};
g.highlightAll();
var We = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Auto-Apply DateRangePicker</mat-card-title>
    <mat-card-subtitle>Selecci\xF3n autom\xE1tica sin botones Aplicar/Cancelar</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Seleccionar rango de fechas</mat-label>
        <input
          matInput
          id="auto-apply-input"
          placeholder="Haz clic para seleccionar"
          readonly
        />
        <mat-hint>La selecci\xF3n se aplica autom\xE1ticamente</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Resultado:</h4>
        <div class="result-grid">
          <div class="result-item">
            <strong>Fecha inicio:</strong>
            <span>{{ selectedStartDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="result-item">
            <strong>Fecha fin:</strong>
            <span>{{ selectedEndDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="result-item">
            <strong>Etiqueta:</strong>
            <span>{{ selectedLabel || 'Personalizado' }}</span>
          </div>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`,
  qe = `import { Component, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
  DateRangePicker,
  SPANISH_LOCALE,
  BOOTSTRAP_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-auto-apply-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule],
})
export class AutoApplyApp implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeDateRangePicker();
    }, 0);
  }

  ngOnDestroy() {
    if (this.dateRangePicker) {
      this.dateRangePicker.remove();
    }
  }

  private initializeDateRangePicker() {
    const input = document.getElementById('auto-apply-input') as HTMLInputElement;

    if (!input) return;

    const today = new Date();
    const yesterday = addDay(today, -1);
    const last7Days = addDay(today, -7);

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        autoApply: true, // Sin botones
        showDropdowns: true,
        theme: BOOTSTRAP_THEME,
        ranges: {
          Hoy: [today, today],
          Ayer: [yesterday, yesterday],
          '\xDAltimos 7 d\xEDas': [last7Days, today],
        },
      },
      (startDate: Date, endDate: Date, label?: string) => {
        this.ngZone.run(() => {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.selectedLabel = label || null;
        });
      },
    );
  }
}`,
  Ze = `.example-card {
  max-width: 600px;
  margin: 20px auto;

  .example-container {
    padding: 16px 0;

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    .result-display {
      margin-top: 20px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
  }
}`,
  Je = {
    title: 'Auto-Apply',
    component: te,
    files: [
      { file: 'app.html', content: g.highlightAuto(We).value, filecontent: { default: We } },
      { file: 'app.ts', content: g.highlightAuto(qe).value, filecontent: { default: qe } },
      { file: 'app.styles', content: g.highlightAuto(Ze).value, filecontent: { default: Ze } },
    ],
  };
var ae = class m {
  singleDateControl = new R(new Date());
  selectedDate = p(new Date());
  singleDateOptions = {
    singleDatePicker: !0,
    autoApply: !0,
    showDropdowns: !0,
    linkedCalendars: !1,
    alwaysShowCalendars: !0,
    locale: S,
    theme: C,
  };
  onDateRangeSelected(o) {
    o && o.from && this.selectedDate.set(o.from);
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-single-date-example']],
    decls: 32,
    vars: 14,
    consts: [
      [1, 'example-card'],
      [1, 'example-container'],
      ['placeholderText', 'Selecciona una fecha', 3, 'dateRangeSelected', 'formControl', 'options'],
      [1, 'result-display'],
      [1, 'selected-date'],
      [1, 'date-value'],
      [1, 'date-format'],
      [1, 'form-values'],
      [1, 'config-info'],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'mat-card', 0)(1, 'mat-card-header')(2, 'mat-card-title'),
        n(3, 'Single Date Picker'),
        e(),
        t(4, 'mat-card-subtitle'),
        n(5, 'Selector de fecha \xFAnica usando el componente Angular'),
        e()(),
        t(6, 'mat-card-content')(7, 'div', 1)(8, 'acp-date-range-picker', 2),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        }),
        e(),
        t(9, 'div', 3)(10, 'h4'),
        n(11, 'Fecha seleccionada:'),
        e(),
        t(12, 'div', 4)(13, 'span', 5),
        n(14),
        f(15, 'date'),
        e(),
        t(16, 'span', 6),
        n(17),
        f(18, 'date'),
        e()()(),
        t(19, 'div', 7)(20, 'h4'),
        n(21, 'Valor del FormControl:'),
        e(),
        t(22, 'pre'),
        n(23),
        f(24, 'json'),
        e()()()(),
        t(25, 'mat-card-actions')(26, 'div', 8)(27, 'h4'),
        n(28, 'Configuraci\xF3n del Componente:'),
        e(),
        t(29, 'pre')(30, 'code'),
        n(
          31,
          `<acp-date-range-picker
  [options]="singleDateOptions"
  placeholderText="Selecciona una fecha"
  (dateRangeSelected)="onDateRangeSelected($event)">
</acp-date-range-picker>`,
        ),
        e()()()()()),
        l & 2 &&
          (r(8),
          c('formControl', a.singleDateControl)('options', a.singleDateOptions),
          r(6),
          u(W(15, 5, a.selectedDate(), 'EEEE, dd MMMM yyyy', 'es')),
          r(3),
          u(M(18, 9, a.selectedDate(), 'dd/MM/yyyy')),
          r(6),
          u(H(24, 12, a.singleDateControl.value))));
    },
    dependencies: [w, k, v, P, A, O, y, b, D, h, N, E, U, _, B],
    styles: [
      '.example-card[_ngcontent-%COMP%]{max-width:600px;margin:20px auto}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]{padding:16px 0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{margin-top:20px;padding:20px;background:linear-gradient(135deg,#e3f2fd,#f3e5f5);border-radius:12px;text-align:center}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 16px;color:#333;font-size:16px;font-weight:500}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .selected-date[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .selected-date[_ngcontent-%COMP%]   .date-value[_ngcontent-%COMP%]{font-size:18px;font-weight:600;color:#1976d2;text-transform:capitalize}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .selected-date[_ngcontent-%COMP%]   .date-format[_ngcontent-%COMP%]{font-size:14px;color:#666;background-color:#fffc;padding:4px 12px;border-radius:16px;font-family:Monaco,Menlo,Ubuntu Mono,monospace}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#fff;font-size:14px}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:4px;padding:12px;margin:0;overflow-x:auto}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Monaco,Menlo,Ubuntu Mono,monospace;font-size:12px;color:#495057;line-height:1.4}',
    ],
  });
};
g.highlightAll();
var Ke = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Single Date Picker</mat-card-title>
    <mat-card-subtitle>Selector de fecha \xFAnica con Material Design</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <acp-date-range-picker
        [singleDatePicker]="true"
        [autoApply]="true"
        [showDropdowns]="true"
        [alwaysShowCalendars]="true"
        [options]="options"
        label="Seleccionar fecha"
        placeholderText="Selecciona una fecha"
        (dateRangeSelected)="onDateRangeSelected($event)"
      ></acp-date-range-picker>

      <div class="result-display">
        <h4>Fecha seleccionada:</h4>
        <div class="selected-date">
          <span class="date-value">{{ selectedDate() | date:'EEEE, dd MMMM yyyy':'es' }}</span>
          <span class="date-format">{{ selectedDate() | date:'dd/MM/yyyy' }}</span>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`,
  Qe = `import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
  DateRangePicker,
  DateRangeValue,
  SPANISH_LOCALE,
  MATERIAL_LIGHT_THEME,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-single-date-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, DateRangePicker],
})
export class SingleDateApp {
  selectedDate = signal<Date>(new Date());

  // Configuraci\xF3n para el date picker
  readonly options = {
    locale: SPANISH_LOCALE,
    theme: MATERIAL_LIGHT_THEME,
  };

  onDateRangeSelected(range: DateRangeValue<false> | null) {
    if (range && range.from) {
      this.selectedDate.set(range.from);
    }
  }
}`,
  Xe = `.example-card {
  max-width: 600px;
  margin: 20px auto;

  .result-display {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
    border-radius: 12px;
    text-align: center;

    .selected-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .date-value {
        font-size: 18px;
        font-weight: 600;
        color: #1976d2;
        text-transform: capitalize;
      }
    }
  }
}`,
  et = {
    title: 'Fecha \xDAnica',
    component: ae,
    files: [
      { file: 'app.html', content: g.highlightAuto(Ke).value, filecontent: { default: Ke } },
      { file: 'app.ts', content: g.highlightAuto(Qe).value, filecontent: { default: Qe } },
      { file: 'app.styles', content: g.highlightAuto(Xe).value, filecontent: { default: Xe } },
    ],
  };
function Dt(m, o) {
  if ((m & 1 && (t(0, 'div', 10)(1, 'mat-chip-set')(2, 'mat-chip', 13), n(3), e()()()), m & 2)) {
    let l = Y();
    (r(3), u(l.selectedLabel()));
  }
}
var oe = class m {
  dateTimeControl = new R({ startDate: new Date(), endDate: new Date() });
  selectedStartDate = p(new Date());
  selectedEndDate = p(new Date());
  selectedLabel = p('Hoy');
  ranges = {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 1440 * 60 * 1e3), new Date(Date.now() - 1440 * 60 * 1e3)],
    '\xDAltimos 7 d\xEDas': [new Date(Date.now() - 8640 * 60 * 1e3), new Date()],
  };
  dateTimeOptions = {
    locale: S,
    theme: C,
    timePicker: !0,
    timePicker24Hour: !0,
    timePickerSeconds: !0,
    timePickerIncrement: 15,
    ranges: this.ranges,
    autoApply: !1,
    showDropdowns: !0,
    linkedCalendars: !0,
    alwaysShowCalendars: !0,
  };
  onDateRangeSelected(o) {
    o &&
      o.from &&
      o.to &&
      (this.selectedStartDate.set(o.from),
      this.selectedEndDate.set(o.to),
      this.selectedLabel.set(o.label || null));
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-datetime-example']],
    decls: 51,
    vars: 24,
    consts: [
      [1, 'example-card'],
      [1, 'example-container'],
      [
        'placeholderText',
        'Selecciona fecha y hora',
        3,
        'dateRangeSelected',
        'formControl',
        'options',
      ],
      [1, 'result-display'],
      [1, 'datetime-grid'],
      [1, 'datetime-item'],
      [1, 'datetime-values'],
      [1, 'date'],
      [1, 'time'],
      [1, 'datetime-separator'],
      [1, 'label-display'],
      [1, 'form-values'],
      [1, 'config-info'],
      ['color', 'accent', 'selected', ''],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'mat-card', 0)(1, 'mat-card-header')(2, 'mat-card-title'),
        n(3, 'DateTime Range Picker'),
        e(),
        t(4, 'mat-card-subtitle'),
        n(5, 'Selector de fecha y hora usando el componente Angular'),
        e()(),
        t(6, 'mat-card-content')(7, 'div', 1)(8, 'acp-date-range-picker', 2),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        }),
        e(),
        t(9, 'div', 3)(10, 'h4'),
        n(11, 'Resultado:'),
        e(),
        t(12, 'div', 4)(13, 'div', 5)(14, 'mat-chip-set')(15, 'mat-chip'),
        n(16, 'Inicio'),
        e()(),
        t(17, 'div', 6)(18, 'span', 7),
        n(19),
        f(20, 'date'),
        e(),
        t(21, 'span', 8),
        n(22),
        f(23, 'date'),
        e()()(),
        t(24, 'div', 9),
        n(25, '\u2192'),
        e(),
        t(26, 'div', 5)(27, 'mat-chip-set')(28, 'mat-chip'),
        n(29, 'Fin'),
        e()(),
        t(30, 'div', 6)(31, 'span', 7),
        n(32),
        f(33, 'date'),
        e(),
        t(34, 'span', 8),
        n(35),
        f(36, 'date'),
        e()()()(),
        T(37, Dt, 4, 1, 'div', 10),
        e(),
        t(38, 'div', 11)(39, 'h4'),
        n(40, 'Valor del FormControl:'),
        e(),
        t(41, 'pre'),
        n(42),
        f(43, 'json'),
        e()()()(),
        t(44, 'mat-card-actions')(45, 'div', 12)(46, 'h4'),
        n(47, 'Configuraci\xF3n del Componente:'),
        e(),
        t(48, 'pre')(49, 'code'),
        n(
          50,
          `<acp-date-range-picker
  [options]="dateTimeOptions"
  placeholderText="Selecciona fecha y hora"
  (dateRangeSelected)="onDateRangeSelected($event)">
</acp-date-range-picker>`,
        ),
        e()()()()()),
        l & 2 &&
          (r(8),
          c('formControl', a.dateTimeControl)('options', a.dateTimeOptions),
          r(11),
          u(W(20, 8, a.selectedStartDate(), 'EEEE, dd MMM', 'es')),
          r(3),
          u(M(23, 12, a.selectedStartDate(), 'HH:mm')),
          r(10),
          u(W(33, 15, a.selectedEndDate(), 'EEEE, dd MMM', 'es')),
          r(3),
          u(M(36, 19, a.selectedEndDate(), 'HH:mm')),
          r(2),
          F(a.selectedLabel() ? 37 : -1),
          r(5),
          u(H(43, 22, a.dateTimeControl.value))));
    },
    dependencies: [w, k, v, P, A, O, y, b, D, X, K, Q, h, N, E, U, _, B],
    styles: [
      '.example-card[_ngcontent-%COMP%]{max-width:700px;margin:20px auto}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]{padding:16px 0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{margin-top:20px;padding:20px;background:linear-gradient(135deg,#fff3e0,#e8f5e8);border-radius:12px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 20px;color:#333;font-size:16px;text-align:center}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:center;margin-bottom:20px}@media(max-width:600px){.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:12px;text-align:center}}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]   .datetime-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:12px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]   .datetime-item[_ngcontent-%COMP%]   mat-chip-set[_ngcontent-%COMP%]{margin-bottom:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]   .datetime-item[_ngcontent-%COMP%]   .datetime-values[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]   .datetime-item[_ngcontent-%COMP%]   .datetime-values[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{font-size:14px;color:#666;text-transform:capitalize;font-weight:500}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]   .datetime-item[_ngcontent-%COMP%]   .datetime-values[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#2e7d32;font-family:Monaco,Menlo,Ubuntu Mono,monospace;background-color:#fffc;padding:8px 16px;border-radius:20px;border:2px solid #4caf50}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]   .datetime-separator[_ngcontent-%COMP%]{font-size:24px;font-weight:700;color:#4caf50;text-align:center}@media(max-width:600px){.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .datetime-grid[_ngcontent-%COMP%]   .datetime-separator[_ngcontent-%COMP%]{transform:rotate(90deg);font-size:20px}}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .label-display[_ngcontent-%COMP%]{text-align:center;padding-top:16px;border-top:1px solid rgba(0,0,0,.1)}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .label-display[_ngcontent-%COMP%]   mat-chip-set[_ngcontent-%COMP%]{justify-content:center}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#fff;font-size:14px}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:4px;padding:12px;margin:0;overflow-x:auto}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Monaco,Menlo,Ubuntu Mono,monospace;font-size:12px;color:#495057;line-height:1.4}',
    ],
  });
};
g.highlightAll();
var tt = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>DateTime Range Picker</mat-card-title>
    <mat-card-subtitle>Selector de fecha y hora con formato 24h</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Seleccionar fecha y hora</mat-label>
        <input
          matInput
          id="datetime-input"
          placeholder="Selecciona fecha y hora"
          readonly
        />
        <mat-hint>Incluye selector de tiempo con incrementos de 15 minutos</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Resultado:</h4>
        <div class="datetime-grid">
          <div class="datetime-item">
            <mat-chip-set>
              <mat-chip>Inicio</mat-chip>
            </mat-chip-set>
            <div class="datetime-values">
              <span class="date">{{ selectedStartDate | date:'EEEE, dd MMM':'es' }}</span>
              <span class="time">{{ selectedStartDate | date:'HH:mm' }}</span>
            </div>
          </div>

          <div class="datetime-separator">\u2192</div>

          <div class="datetime-item">
            <mat-chip-set>
              <mat-chip>Fin</mat-chip>
            </mat-chip-set>
            <div class="datetime-values">
              <span class="date">{{ selectedEndDate | date:'EEEE, dd MMM':'es' }}</span>
              <span class="time">{{ selectedEndDate | date:'HH:mm' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`,
  nt = `import { Component, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateRangePicker,
  SPANISH_LOCALE_WITH_TIME,
  DEFAULT_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-datetime-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatChipsModule],
})
export class DateTimeApp implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeDateRangePicker();
    }, 0);
  }

  ngOnDestroy() {
    if (this.dateRangePicker) {
      this.dateRangePicker.remove();
    }
  }

  private initializeDateRangePicker() {
    const input = document.getElementById('datetime-input') as HTMLInputElement;
    if (!input) return;

    const today = new Date();

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE_WITH_TIME,
        timePicker: true, // Habilitar tiempo
        timePicker24Hour: true, // 24 horas
        timePickerIncrement: 15, // 15 min
        autoApply: false,
        showDropdowns: true,
        theme: DEFAULT_THEME,
      },
      (startDate: Date, endDate: Date, label?: string) => {
        this.ngZone.run(() => {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.selectedLabel = label || null;
        });
      },
    );
  }
}`,
  at = `.example-card {
  max-width: 700px;
  margin: 20px auto;

  .result-display {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #fff3e0 0%, #e8f5e8 100%);
    border-radius: 12px;

    .datetime-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 16px;
      align-items: center;

      .datetime-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        .time {
          font-size: 20px;
          font-weight: 700;
          color: #2e7d32;
          font-family: monospace;
        }
      }
    }
  }
}`,
  ot = {
    title: 'DateTime',
    component: oe,
    files: [
      { file: 'app.html', content: g.highlightAuto(tt).value, filecontent: { default: tt } },
      { file: 'app.ts', content: g.highlightAuto(nt).value, filecontent: { default: nt } },
      { file: 'app.styles', content: g.highlightAuto(at).value, filecontent: { default: at } },
    ],
  };
var ie = class m {
  selectedStartDate = p(new Date());
  selectedEndDate = p(new Date());
  selectedLabel = p(null);
  rangesOnlyOptions = {
    autoApply: !0,
    alwaysShowCalendars: !1,
    theme: C,
    ranges: this.getRanges(),
    locale: S,
  };
  ngAfterViewInit() {
    let o = new Date();
    (this.selectedStartDate.set(o), this.selectedEndDate.set(o), this.selectedLabel.set('Hoy'));
  }
  onDateRangeSelected(o) {
    o &&
      o.from &&
      o.to &&
      (this.selectedStartDate.set(o.from),
      this.selectedEndDate.set(o.to),
      this.selectedLabel.set(o.label || null));
  }
  getRanges() {
    let o = new Date(),
      l = L(o, -1),
      a = L(o, -3),
      d = L(o, -7),
      i = L(o, -15),
      ce = new Date(o.getFullYear(), o.getMonth(), 1);
    return {
      Hoy: [o, o],
      Ayer: [l, l],
      '\xDAltimos 3 d\xEDas': [a, o],
      '\xDAltimos 7 d\xEDas': [d, o],
      '\xDAltimos 15 d\xEDas': [i, o],
      'Este mes': [ce, o],
    };
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-ranges-only-example']],
    decls: 38,
    vars: 18,
    consts: [
      [1, 'example-card'],
      [1, 'example-container'],
      ['placeholderText', 'Elige un rango predefinido', 3, 'dateRangeSelected', 'options'],
      [1, 'result-display'],
      [1, 'range-info'],
      ['color', 'primary', 'selected', ''],
      [1, 'date-range'],
      [1, 'date-item'],
      [1, 'label'],
      [1, 'value'],
      [1, 'date-separator'],
      [1, 'config-info'],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'mat-card', 0)(1, 'mat-card-header')(2, 'mat-card-title'),
        n(3, 'Ranges Only Picker'),
        e(),
        t(4, 'mat-card-subtitle'),
        n(5, 'Solo rangos predefinidos con opci\xF3n personalizada'),
        e()(),
        t(6, 'mat-card-content')(7, 'div', 1)(8, 'acp-date-range-picker', 2),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        }),
        e(),
        t(9, 'div', 3)(10, 'h4'),
        n(11, 'Rango seleccionado:'),
        e(),
        t(12, 'div', 4)(13, 'mat-chip-set')(14, 'mat-chip', 5),
        n(15),
        e()(),
        t(16, 'div', 6)(17, 'div', 7)(18, 'span', 8),
        n(19, 'Desde:'),
        e(),
        t(20, 'span', 9),
        n(21),
        f(22, 'date'),
        e()(),
        t(23, 'div', 10),
        n(24, '\u2192'),
        e(),
        t(25, 'div', 7)(26, 'span', 8),
        n(27, 'Hasta:'),
        e(),
        t(28, 'span', 9),
        n(29),
        f(30, 'date'),
        e()()()()()()(),
        t(31, 'mat-card-actions')(32, 'div', 11)(33, 'h4'),
        n(34, 'Configuraci\xF3n:'),
        e(),
        t(35, 'pre')(36, 'code'),
        n(37),
        e()()()()()),
        l & 2 &&
          (r(8),
          c('options', a.rangesOnlyOptions),
          r(7),
          u(a.selectedLabel() || 'Personalizado'),
          r(6),
          u(M(22, 12, a.selectedStartDate(), 'dd/MM/yyyy')),
          r(8),
          u(M(30, 15, a.selectedEndDate(), 'dd/MM/yyyy')),
          r(8),
          Z(
            '',
            '{',
            '',
            '{',
            `
  autoApply: true,
  alwaysShowCalendars: false,
  theme: MATERIAL_LIGHT_THEME,
  ranges: `,
            '{',
            '',
            '{',
            `
    'Hoy': [today, today],
    'Ayer': [yesterday, yesterday],
    '\xDAltimos 3 d\xEDas': [last3Days, today],
    '\xDAltimos 7 d\xEDas': [last7Days, today],
    '\xDAltimos 15 d\xEDas': [last15Days, today],
    'Este mes': [thisMonthStart, today]
  `,
            '}',
            '',
            '}',
            `
`,
            '}',
            '',
            '}',
          )));
    },
    dependencies: [w, k, v, P, A, O, y, b, D, X, K, Q, h, _],
    styles: [
      '.example-card[_ngcontent-%COMP%]{max-width:600px;margin:20px auto}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]{padding:16px 0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]{display:block;width:100%;margin-bottom:20px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{margin-top:20px;padding:20px;background:linear-gradient(135deg,#e8eaf6,#f3e5f5);border-radius:12px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 16px;color:#333;font-size:16px;text-align:center}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:16px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   mat-chip-set[_ngcontent-%COMP%]{margin-bottom:8px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   .date-range[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:center;width:100%;max-width:400px}@media(max-width:500px){.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   .date-range[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:8px;text-align:center}}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   .date-range[_ngcontent-%COMP%]   .date-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   .date-range[_ngcontent-%COMP%]   .date-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:12px;color:#666;font-weight:500;text-transform:uppercase;letter-spacing:.5px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   .date-range[_ngcontent-%COMP%]   .date-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:16px;font-weight:600;color:#1976d2;background-color:#fffc;padding:8px 12px;border-radius:8px;border:1px solid #1976d2;font-family:Monaco,Menlo,Ubuntu Mono,monospace}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   .date-range[_ngcontent-%COMP%]   .date-separator[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#1976d2;text-align:center}@media(max-width:500px){.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .range-info[_ngcontent-%COMP%]   .date-range[_ngcontent-%COMP%]   .date-separator[_ngcontent-%COMP%]{transform:rotate(90deg);font-size:16px}}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#fff;font-size:14px}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:4px;padding:12px;margin:0;overflow-x:auto}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Monaco,Menlo,Ubuntu Mono,monospace;font-size:12px;color:#495057;line-height:1.4}',
    ],
  });
};
g.highlightAll();
var it = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>Ranges Only Picker</mat-card-title>
    <mat-card-subtitle>Solo rangos predefinidos con opci\xF3n personalizada</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <!-- Componente DateRangePicker -->
      <acp-date-range-picker
        [options]="rangesOnlyOptions"
        placeholderText="Elige un rango predefinido"
        (dateRangeSelected)="onDateRangeSelected($event)"
      ></acp-date-range-picker>

      <div class="result-display">
        <h4>Rango seleccionado:</h4>
        <div class="range-info">
          <mat-chip-set>
            <mat-chip color="primary" selected>{{ selectedLabel() || 'Personalizado' }}</mat-chip>
          </mat-chip-set>

          <div class="date-range">
            <div class="date-item">
              <span class="label">Desde:</span>
              <span class="value">{{ selectedStartDate() | date:'dd/MM/yyyy' }}</span>
            </div>
            <div class="date-separator">\u2192</div>
            <div class="date-item">
              <span class="label">Hasta:</span>
              <span class="value">{{ selectedEndDate() | date:'dd/MM/yyyy' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </mat-card-content>

  <mat-card-actions>
    <div class="config-info">
      <h4>Configuraci\xF3n:</h4>
      <pre><code>{{'{'}}{{'{'}}
  autoApply: true,
  alwaysShowCalendars: false,
  theme: MATERIAL_LIGHT_THEME,
  ranges: {{'{'}}{{'{'}}
    'Hoy': [today, today],
    'Ayer': [yesterday, yesterday],
    '\xDAltimos 3 d\xEDas': [last3Days, today],
    '\xDAltimos 7 d\xEDas': [last7Days, today],
    '\xDAltimos 15 d\xEDas': [last15Days, today],
    'Este mes': [thisMonthStart, today]
  {{'}'}}{{'}'}}
{{'}'}}{{'}'}}</code></pre>
    </div>
  </mat-card-actions>
</mat-card>`,
  rt = `import { Component, AfterViewInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateRangePicker,
  DateRangePickerOptions,
  DateRangeValue,
  SPANISH_LOCALE,
  MATERIAL_LIGHT_THEME
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-ranges-only-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    DateRangePicker,
  ],
})
export class RangesOnlyApp implements AfterViewInit {
  selectedStartDate = signal<Date>(new Date());
  selectedEndDate = signal<Date>(new Date());
  selectedLabel = signal<string | null>(null);

  // Configuraci\xF3n del picker
  rangesOnlyOptions: DateRangePickerOptions = {
    autoApply: true,
    alwaysShowCalendars: false,
    theme: MATERIAL_LIGHT_THEME,
    ranges: this.getRanges(),
    locale: SPANISH_LOCALE,
  };

  ngAfterViewInit() {
    const today = new Date();
    this.selectedStartDate.set(today);
    this.selectedEndDate.set(today);
    this.selectedLabel.set('Hoy');
  }

  onDateRangeSelected(event: DateRangeValue<false> | null) {
    if (event && event.from && event.to) {
      this.selectedStartDate.set(event.from);
      this.selectedEndDate.set(event.to);
      this.selectedLabel.set(event.label || null);
    }
  }

  private getRanges(): Record<string, [Date, Date]> {
    const today = new Date();
    const yesterday = addDay(today, -1);
    const last3Days = addDay(today, -3);
    const last7Days = addDay(today, -7);
    const last15Days = addDay(today, -15);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      'Hoy': [today, today] as [Date, Date],
      'Ayer': [yesterday, yesterday] as [Date, Date],
      '\xDAltimos 3 d\xEDas': [last3Days, today] as [Date, Date],
      '\xDAltimos 7 d\xEDas': [last7Days, today] as [Date, Date],
      '\xDAltimos 15 d\xEDas': [last15Days, today] as [Date, Date],
      'Este mes': [thisMonthStart, today] as [Date, Date],
    };
  }
}`,
  lt = `.example-card {
  max-width: 600px;
  margin: 20px auto;

  .result-display {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%);
    border-radius: 12px;

    .range-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      .date-range {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 16px;
        align-items: center;

        .date-item .value {
          font-size: 16px;
          font-weight: 600;
          color: #1976d2;
          font-family: monospace;
        }
      }
    }
  }
}`,
  dt = {
    title: 'Solo Rangos',
    component: ie,
    files: [
      { file: 'app.html', content: g.highlightAuto(it).value, filecontent: { default: it } },
      { file: 'app.ts', content: g.highlightAuto(rt).value, filecontent: { default: rt } },
      { file: 'app.styles', content: g.highlightAuto(lt).value, filecontent: { default: lt } },
    ],
  };
function Ot(m, o) {
  if (
    (m & 1 &&
      (t(0, 'div', 5)(1, 'mat-icon'),
      n(2, 'label'),
      e(),
      t(3, 'div', 6)(4, 'strong'),
      n(5, 'Etiqueta:'),
      e(),
      t(6, 'span'),
      n(7),
      e()()()),
    m & 2)
  ) {
    let l = Y();
    (r(7), u(l.selectedLabel()));
  }
}
var re = class m {
  selectedStartDate = p(new Date());
  selectedEndDate = p(new Date());
  selectedLabel = p(null);
  noDropdownsOptions = {
    showDropdowns: !1,
    autoApply: !1,
    linkedCalendars: !0,
    alwaysShowCalendars: !0,
    theme: C,
    ranges: this.getRanges(),
    locale: S,
  };
  ngAfterViewInit() {
    let o = new Date();
    (this.selectedStartDate.set(o), this.selectedEndDate.set(o), this.selectedLabel.set('Hoy'));
  }
  onDateRangeSelected(o) {
    o &&
      o.from &&
      o.to &&
      (this.selectedStartDate.set(o.from),
      this.selectedEndDate.set(o.to),
      this.selectedLabel.set(o.label || null));
  }
  getRanges() {
    let o = new Date(),
      l = L(o, -1),
      a = L(o, -7),
      d = new Date(o.getFullYear(), o.getMonth(), 1);
    return { Hoy: [o, o], Ayer: [l, l], '\xDAltimos 7 d\xEDas': [a, o], 'Este mes': [d, o] };
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-no-dropdowns-example']],
    decls: 39,
    vars: 18,
    consts: [
      [1, 'example-card'],
      [1, 'example-container'],
      ['placeholderText', 'Solo navegaci\xF3n con flechas', 3, 'dateRangeSelected', 'options'],
      [1, 'result-display'],
      [1, 'navigation-info'],
      [1, 'info-item'],
      [1, 'info-content'],
      [1, 'config-info'],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'mat-card', 0)(1, 'mat-card-header')(2, 'mat-card-title'),
        n(3, 'No Dropdowns Picker'),
        e(),
        t(4, 'mat-card-subtitle'),
        n(5, 'Navegaci\xF3n solo con flechas, sin selectores de mes/a\xF1o'),
        e()(),
        t(6, 'mat-card-content')(7, 'div', 1)(8, 'acp-date-range-picker', 2),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        }),
        e(),
        t(9, 'div', 3)(10, 'h4'),
        n(11, 'Navegaci\xF3n simplificada:'),
        e(),
        t(12, 'div', 4)(13, 'div', 5)(14, 'mat-icon'),
        n(15, 'touch_app'),
        e(),
        t(16, 'div', 6)(17, 'strong'),
        n(18, 'Navegaci\xF3n:'),
        e(),
        t(19, 'span'),
        n(20, 'Solo flechas \u2190 \u2192 para cambiar mes/a\xF1o'),
        e()()(),
        t(21, 'div', 5)(22, 'mat-icon'),
        n(23, 'event'),
        e(),
        t(24, 'div', 6)(25, 'strong'),
        n(26, 'Selecci\xF3n:'),
        e(),
        t(27, 'span'),
        n(28),
        f(29, 'date'),
        f(30, 'date'),
        e()()(),
        T(31, Ot, 8, 1, 'div', 5),
        e()()()(),
        t(32, 'mat-card-actions')(33, 'div', 7)(34, 'h4'),
        n(35, 'Configuraci\xF3n:'),
        e(),
        t(36, 'pre')(37, 'code'),
        n(38),
        e()()()()()),
        l & 2 &&
          (r(8),
          c('options', a.noDropdownsOptions),
          r(20),
          q(
            '',
            M(29, 12, a.selectedStartDate(), 'dd/MM/yyyy'),
            ' - ',
            M(30, 15, a.selectedEndDate(), 'dd/MM/yyyy'),
          ),
          r(3),
          F(a.selectedLabel() ? 31 : -1),
          r(7),
          Z(
            '',
            '{',
            '',
            '{',
            `
  showDropdowns: false,
  autoApply: false,
  linkedCalendars: true,
  alwaysShowCalendars: true,
  theme: MATERIAL_LIGHT_THEME,
  ranges: `,
            '{',
            '',
            '{',
            `
    'Hoy': [today, today],
    'Ayer': [yesterday, yesterday],
    '\xDAltimos 7 d\xEDas': [last7Days, today],
    'Este mes': [thisMonthStart, today]
  `,
            '}',
            '',
            '}',
            `
`,
            '}',
            '',
            '}',
          )));
    },
    dependencies: [w, k, v, P, A, O, y, b, D, Re, J, h, _],
    styles: [
      '.example-card[_ngcontent-%COMP%]{max-width:600px;margin:20px auto}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]{padding:16px 0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]{display:block;width:100%;margin-bottom:20px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{margin-top:20px;padding:20px;background:linear-gradient(135deg,#fff8e1,#f3e5f5);border-radius:12px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 16px;color:#333;font-size:16px;text-align:center}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .navigation-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .navigation-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:12px;background-color:#fffc;border-radius:8px;border-left:4px solid #ff9800}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .navigation-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ff9800;font-size:20px;width:20px;height:20px;flex-shrink:0}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .navigation-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px;flex:1}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .navigation-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:14px;color:#333;font-weight:600}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .navigation-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:13px;color:#666}.example-card[_ngcontent-%COMP%]   .example-container[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .navigation-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{font-weight:500;color:#ff9800}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 12px;color:#fff;font-size:14px}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:4px;padding:12px;margin:0;overflow-x:auto}.example-card[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Monaco,Menlo,Ubuntu Mono,monospace;font-size:12px;color:#495057;line-height:1.4}',
    ],
  });
};
g.highlightAll();
var ct = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>No Dropdowns Picker</mat-card-title>
    <mat-card-subtitle>Navegaci\xF3n solo con flechas, sin selectores de mes/a\xF1o</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="example-container">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Navegaci\xF3n con flechas</mat-label>
        <input
          matInput
          id="no-dropdowns-input"
          placeholder="Solo navegaci\xF3n con flechas"
          readonly
        />
        <mat-icon matSuffix>keyboard_arrow_left</mat-icon>
        <mat-hint>Usa las flechas \u2190 \u2192 para navegar entre meses</mat-hint>
      </mat-form-field>

      <div class="result-display">
        <h4>Navegaci\xF3n simplificada:</h4>
        <div class="navigation-info">
          <div class="info-item">
            <mat-icon>touch_app</mat-icon>
            <div class="info-content">
              <strong>Navegaci\xF3n:</strong>
              <span>Solo flechas \u2190 \u2192 para cambiar mes/a\xF1o</span>
            </div>
          </div>

          <div class="info-item">
            <mat-icon>event</mat-icon>
            <div class="info-content">
              <strong>Selecci\xF3n:</strong>
              <span>{{ selectedStartDate | date:'dd/MM/yyyy' }} - {{ selectedEndDate | date:'dd/MM/yyyy' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`,
  pt = `import { Component, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  DateRangePicker,
  SPANISH_LOCALE,
  BOOTSTRAP_THEME,
} from '@acontplus/ng-components';
import { addDay } from '@formkit/tempo';

@Component({
  selector: 'app-date-range-picker-no-dropdowns-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule],
})
export class NoDropdownsApp implements AfterViewInit, OnDestroy {
  private dateRangePicker!: DateRangePicker;

  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeDateRangePicker();
    }, 0);
  }

  ngOnDestroy() {
    if (this.dateRangePicker) {
      this.dateRangePicker.remove();
    }
  }

  private initializeDateRangePicker() {
    const input = document.getElementById('no-dropdowns-input') as HTMLInputElement;
    if (!input) return;

    const today = new Date();

    this.dateRangePicker = new DateRangePicker(
      input,
      {
        startDate: today,
        endDate: today,
        locale: SPANISH_LOCALE,
        showDropdowns: false, // Sin dropdowns
        autoApply: false,
        linkedCalendars: true,
        theme: BOOTSTRAP_THEME,
        ranges: {
          Hoy: [today, today],
          '\xDAltimos 7 d\xEDas': [addDay(today, -7), today],
        },
      },
      (startDate: Date, endDate: Date, label?: string) => {
        this.ngZone.run(() => {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.selectedLabel = label || null;
        });
      },
    );
  }
}`,
  st = `.example-card {
  max-width: 600px;
  margin: 20px auto;

  .result-display {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #fff8e1 0%, #f3e5f5 100%);
    border-radius: 12px;

    .navigation-info {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .info-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        border-left: 4px solid #ff9800;
      }
    }
  }
}`,
  mt = {
    title: 'Sin Dropdowns',
    component: re,
    files: [
      { file: 'app.html', content: g.highlightAuto(ct).value, filecontent: { default: ct } },
      { file: 'app.ts', content: g.highlightAuto(pt).value, filecontent: { default: pt } },
      { file: 'app.styles', content: g.highlightAuto(st).value, filecontent: { default: st } },
    ],
  };
var le = class m {
  dateForm = new Pe({
    dateRange: new R({ startDate: new Date(), endDate: new Date(Date.now() + 10080 * 60 * 1e3) }),
    singleDate: new R(new Date()),
  });
  ranges = {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 1440 * 60 * 1e3), new Date(Date.now() - 1440 * 60 * 1e3)],
    '\xDAltimos 7 d\xEDas': [new Date(Date.now() - 8640 * 60 * 1e3), new Date()],
    '\xDAltimos 30 d\xEDas': [new Date(Date.now() - 696 * 60 * 60 * 1e3), new Date()],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  };
  basicOptions = { autoApply: !1, ranges: this.ranges };
  bootstrapOptions = { presetTheme: 'bootstrap', autoApply: !0, ranges: this.ranges };
  materialOptions = {
    presetTheme: 'material',
    showDropdowns: !0,
    linkedCalendars: !0,
    ranges: this.ranges,
  };
  timePickerOptions = { timePicker: !0, timePicker24Hour: !0, timePickerSeconds: !0 };
  singleDateOptions = { singleDatePicker: !0, autoApply: !0 };
  onDateRangeSelected(o) {
    console.log('Rango seleccionado:', o);
  }
  get formValue() {
    return JSON.stringify(this.dateForm.value, null, 2);
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-angular-wrapper-example']],
    decls: 89,
    vars: 7,
    consts: [
      [1, 'angular-wrapper-demo'],
      [1, 'example-section'],
      [1, 'form-example', 3, 'formGroup'],
      [1, 'form-group'],
      ['for', 'dateRange'],
      [
        'formControlName',
        'dateRange',
        'placeholderText',
        'Seleccionar rango b\xE1sico',
        3,
        'dateRangeSelected',
        'options',
      ],
      ['for', 'singleDate'],
      [
        'formControlName',
        'singleDate',
        'placeholderText',
        'Selector de fecha \xFAnica',
        3,
        'dateRangeSelected',
        'options',
      ],
      [1, 'form-values'],
      [1, 'theme-examples'],
      [1, 'theme-example'],
      ['placeholderText', 'Rango con tema Bootstrap', 3, 'options'],
      ['placeholderText', 'Rango con tema Material', 3, 'options'],
      ['placeholderText', 'Rango con selector de tiempo', 3, 'options'],
      [1, 'config-info'],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'div', 0)(1, 'h3'),
        n(2, 'Componente Angular para DateRangePicker'),
        e(),
        t(3, 'p'),
        n(4, ' Este ejemplo muestra c\xF3mo usar el componente Angular '),
        t(5, 'code'),
        n(6, 'DateRangePicker'),
        e(),
        n(7, ' que utiliza la librer\xEDa '),
        t(8, 'code'),
        n(9, 'ngx-datex'),
        e(),
        n(10, '. '),
        e(),
        t(11, 'div', 1)(12, 'h4'),
        n(13, 'Integraci\xF3n con Angular Forms'),
        e(),
        t(14, 'form', 2)(15, 'div', 3)(16, 'label', 4),
        n(17, 'Rango de Fechas:'),
        e(),
        t(18, 'acp-date-range-picker', 5),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        }),
        e()(),
        t(19, 'div', 3)(20, 'label', 6),
        n(21, 'Fecha \xDAnica:'),
        e(),
        t(22, 'acp-date-range-picker', 7),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        }),
        e()()(),
        t(23, 'div', 8)(24, 'h5'),
        n(25, 'Valores del Formulario:'),
        e(),
        t(26, 'pre'),
        n(27),
        e()()(),
        t(28, 'div', 1)(29, 'h4'),
        n(30, 'Diferentes Temas'),
        e(),
        t(31, 'div', 9)(32, 'div', 10),
        I(33, 'acp-date-range-picker', 11),
        e(),
        t(34, 'div', 10),
        I(35, 'acp-date-range-picker', 12),
        e()()(),
        t(36, 'div', 1)(37, 'h4'),
        n(38, 'Con Selector de Tiempo'),
        e(),
        I(39, 'acp-date-range-picker', 13),
        e(),
        t(40, 'div', 1)(41, 'h4'),
        n(42, 'Opciones de Configuraci\xF3n'),
        e(),
        t(43, 'div', 14)(44, 'h5'),
        n(45, 'Propiedades Principales:'),
        e(),
        t(46, 'ul')(47, 'li')(48, 'code'),
        n(49, '[singleDatePicker]'),
        e(),
        n(50, ' - Modo de fecha \xFAnica'),
        e(),
        t(51, 'li')(52, 'code'),
        n(53, '[autoApply]'),
        e(),
        n(54, ' - Aplicar autom\xE1ticamente la selecci\xF3n'),
        e(),
        t(55, 'li')(56, 'code'),
        n(57, '[timePicker]'),
        e(),
        n(58, ' - Habilitar selector de tiempo'),
        e(),
        t(59, 'li')(60, 'code'),
        n(61, '[ranges]'),
        e(),
        n(62, ' - Rangos predefinidos'),
        e(),
        t(63, 'li')(64, 'code'),
        n(65, '[presetTheme]'),
        e(),
        n(66, " - Tema predefinido ('default', 'bootstrap', 'material')"),
        e(),
        t(67, 'li')(68, 'code'),
        n(69, '[minDate]'),
        e(),
        n(70, ' / '),
        t(71, 'code'),
        n(72, '[maxDate]'),
        e(),
        n(73, ' - Fechas l\xEDmite'),
        e(),
        t(74, 'li')(75, 'code'),
        n(76, '[locale]'),
        e(),
        n(77, ' - Configuraci\xF3n de idioma'),
        e()(),
        t(78, 'h5'),
        n(79, 'Eventos:'),
        e(),
        t(80, 'ul')(81, 'li')(82, 'code'),
        n(83, '(dateRangeSelected)'),
        e(),
        n(84, ' - Cuando se selecciona un rango'),
        e(),
        t(85, 'li')(86, 'code'),
        n(87, '(checkboxChange)'),
        e(),
        n(88, ' - Cuando cambia el estado del checkbox'),
        e()()()()()),
        l & 2 &&
          (r(14),
          c('formGroup', a.dateForm),
          r(4),
          c('options', a.basicOptions),
          r(4),
          c('options', a.singleDateOptions),
          r(5),
          u(a.formValue),
          r(6),
          c('options', a.bootstrapOptions),
          r(2),
          c('options', a.materialOptions),
          r(4),
          c('options', a.timePickerOptions)));
    },
    dependencies: [h, N, Oe, E, _e, ve, ye],
    styles: [
      '.angular-wrapper-demo[_ngcontent-%COMP%]{padding:20px;max-width:1000px;margin:0 auto}.angular-wrapper-demo[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#2c3e50;margin-bottom:15px;border-bottom:2px solid #3498db;padding-bottom:10px}.angular-wrapper-demo[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#34495e;margin:25px 0 15px;font-size:1.2em}.angular-wrapper-demo[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{color:#7f8c8d;margin:15px 0 10px;font-size:1em}.angular-wrapper-demo[_ngcontent-%COMP%]   .example-section[_ngcontent-%COMP%]{margin-bottom:30px;padding:20px;border:1px solid #ecf0f1;border-radius:8px;background-color:#fafbfc}.angular-wrapper-demo[_ngcontent-%COMP%]   .example-section[_ngcontent-%COMP%]:hover{box-shadow:0 2px 8px #0000001a;transition:box-shadow .3s ease}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%], .angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:20px}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:8px;font-weight:600;color:#2c3e50}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]{display:block;width:100%}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:10px 15px;border:2px solid #bdc3c7;border-radius:6px;font-size:14px;transition:border-color .3s ease}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none;border-color:#3498db;box-shadow:0 0 0 3px #3498db1a}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{border-color:#95a5a6}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-values[_ngcontent-%COMP%]{background-color:#2c3e50;color:#ecf0f1;padding:15px;border-radius:6px;margin-top:15px}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-values[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{color:#ecf0f1;margin-top:0}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-values[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background-color:#34495e;padding:10px;border-radius:4px;overflow-x:auto;font-size:12px;line-height:1.4;margin:0}.angular-wrapper-demo[_ngcontent-%COMP%]   .theme-examples[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:15px}.angular-wrapper-demo[_ngcontent-%COMP%]   .theme-example[_ngcontent-%COMP%]{padding:15px;border:1px solid #d5dbdb;border-radius:6px;background-color:#fff}.angular-wrapper-demo[_ngcontent-%COMP%]   .theme-example[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:10px;font-weight:600;color:#2c3e50}.angular-wrapper-demo[_ngcontent-%COMP%]   .theme-example[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]{display:block}.angular-wrapper-demo[_ngcontent-%COMP%]   .theme-example[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:8px 12px;border:1px solid #bdc3c7;border-radius:4px;font-size:14px}.angular-wrapper-demo[_ngcontent-%COMP%]   .theme-example[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none;border-color:#3498db}.angular-wrapper-demo[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]{background-color:#fff;padding:20px;border-radius:6px;border-left:4px solid #3498db}.angular-wrapper-demo[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:10px 0;padding-left:20px}.angular-wrapper-demo[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:8px;line-height:1.5}.angular-wrapper-demo[_ngcontent-%COMP%]   .config-info[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background-color:#ecf0f1;padding:2px 6px;border-radius:3px;font-family:Courier New,monospace;font-size:13px;color:#e74c3c}@media(max-width:768px){.angular-wrapper-demo[_ngcontent-%COMP%]{padding:15px}.angular-wrapper-demo[_ngcontent-%COMP%]   .theme-examples[_ngcontent-%COMP%]{grid-template-columns:1fr}.angular-wrapper-demo[_ngcontent-%COMP%]   .form-example[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   acp-date-range-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:16px}}',
    ],
  });
};
g.highlightAll();
var gt = `<div class="angular-wrapper-demo">
  <h3>Componente Angular para DateRangePicker</h3>
  <p>
    Este ejemplo muestra c\xF3mo usar el componente Angular <code>acp-date-range-picker</code>
    que utiliza la librer\xEDa <code>ngx-datex</code>.
  </p>

  <!-- Form Integration Example -->
  <div class="example-section">
    <h4>Integraci\xF3n con Angular Forms</h4>
    <form [formGroup]="dateForm" class="form-example">
      <div class="form-group">
        <label for="dateRange">Rango de Fechas:</label>
        <acp-date-range-picker
          formControlName="dateRange"
          [placeholder]="basicConfig.placeholder"
          [autoApply]="basicConfig.autoApply"
          [ranges]="ranges"
          (dateRangeSelected)="onDateRangeSelected($event)"
          (pickerShow)="onPickerShow()"
          (pickerHide)="onPickerHide()"
          (pickerApply)="onPickerApply()"
          (pickerCancel)="onPickerCancel()">
        </acp-date-range-picker>
      </div>

      <div class="form-group">
        <label for="singleDate">Fecha \xDAnica:</label>
        <acp-date-range-picker
          formControlName="singleDate"
          [placeholder]="singleDateConfig.placeholder"
          [singleDatePicker]="singleDateConfig.singleDatePicker"
          [autoApply]="singleDateConfig.autoApply"
          (dateRangeSelected)="onDateRangeSelected($event)">
        </acp-date-range-picker>
      </div>
    </form>

    <div class="form-values">
      <h5>Valores del Formulario:</h5>
      <pre>{{ formValue }}</pre>
    </div>
  </div>

  <!-- Theme Examples -->
  <div class="example-section">
    <h4>Diferentes Temas</h4>

    <div class="theme-examples">
      <div class="theme-example">
        <label>Tema Bootstrap:</label>
        <acp-date-range-picker
          [placeholder]="bootstrapConfig.placeholder"
          [presetTheme]="bootstrapConfig.presetTheme"
          [autoApply]="bootstrapConfig.autoApply"
          [ranges]="ranges">
        </acp-date-range-picker>
      </div>

      <div class="theme-example">
        <label>Tema Material:</label>
        <acp-date-range-picker
          [placeholder]="materialConfig.placeholder"
          [presetTheme]="materialConfig.presetTheme"
          [showDropdowns]="materialConfig.showDropdowns"
          [linkedCalendars]="materialConfig.linkedCalendars"
          [ranges]="ranges">
        </acp-date-range-picker>
      </div>
    </div>
  </div>

  <!-- Time Picker Example -->
  <div class="example-section">
    <h4>Con Selector de Tiempo</h4>
    <acp-date-range-picker
      [placeholder]="timePickerConfig.placeholder"
      [timePicker]="timePickerConfig.timePicker"
      [timePicker24Hour]="timePickerConfig.timePicker24Hour"
      [timePickerSeconds]="timePickerConfig.timePickerSeconds"
      [autoApply]="false">
    </acp-date-range-picker>
  </div>
</div>`,
  ut = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-angular-wrapper-example',
  standalone: true,
  imports: [DateRangePicker, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.styles',
})
export class DateRangePickerAngularWrapperExample {
  // Form integration example
  dateForm = new FormGroup({
    dateRange: new FormControl({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    }),
    singleDate: new FormControl(new Date()),
  });

  // Configuration examples
  basicConfig = {
    placeholder: 'Seleccionar rango b\xE1sico',
    autoApply: false,
  };

  bootstrapConfig = {
    placeholder: 'Rango con tema Bootstrap',
    presetTheme: 'bootstrap' as const,
    autoApply: true,
  };

  materialConfig = {
    placeholder: 'Rango con tema Material',
    presetTheme: 'material' as const,
    showDropdowns: true,
    linkedCalendars: true,
  };

  timePickerConfig = {
    placeholder: 'Rango con selector de tiempo',
    timePicker: true,
    timePicker24Hour: true,
    timePickerSeconds: true,
  };

  singleDateConfig = {
    placeholder: 'Selector de fecha \xFAnica',
    singleDatePicker: true,
    autoApply: true,
  };

  // Predefined ranges
  ranges = {
    'Hoy': [new Date(), new Date()],
    'Ayer': [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    ],
    '\xDAltimos 7 d\xEDas': [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      new Date(),
    ],
    '\xDAltimos 30 d\xEDas': [
      new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      new Date(),
    ],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  } as Record<string, [Date, Date]>;

  // Event handlers
  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    console.log('Rango seleccionado:', event);
  }

  onPickerShow() {
    console.log('Picker mostrado');
  }

  onPickerHide() {
    console.log('Picker ocultado');
  }

  onPickerApply() {
    console.log('Selecci\xF3n aplicada');
  }

  onPickerCancel() {
    console.log('Selecci\xF3n cancelada');
  }

  // Form value display
  get formValue() {
    return JSON.stringify(this.dateForm.value, null, 2);
  }
}`,
  ft = `.angular-wrapper-demo {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;

  h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }

  h4 {
    color: #34495e;
    margin: 25px 0 15px 0;
    font-size: 1.2em;
  }

  .example-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    background-color: #fafbfc;
  }

  .form-example {
    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #2c3e50;
      }

      acp-date-range-picker input {
        width: 100%;
        padding: 10px 15px;
        border: 2px solid #bdc3c7;
        border-radius: 6px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #3498db;
        }
      }
    }
  }

  .theme-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .theme-example {
    padding: 15px;
    border: 1px solid #d5dbdb;
    border-radius: 6px;
    background-color: #ffffff;

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 600;
    }
  }

  .form-values {
    margin-top: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 6px;
    border: 1px solid #e1e8ed;

    h5 {
      margin-bottom: 10px;
      color: #2c3e50;
    }

    pre {
      background-color: #f8f9fa;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #dee2e6;
      font-size: 12px;
      overflow-x: auto;
    }
  }
}`,
  Mt = {
    title: 'Componente Angular',
    component: le,
    files: [
      { file: 'app.html', content: g.highlightAuto(gt).value, filecontent: { default: gt } },
      { file: 'app.ts', content: g.highlightAuto(ut).value, filecontent: { default: ut } },
      { file: 'app.styles', content: g.highlightAuto(ft).value, filecontent: { default: ft } },
    ],
  };
function bt(m, o) {
  if (
    (m & 1 &&
      (t(0, 'div', 41)(1, 'mat-icon'),
      n(2, 'info'),
      e(),
      t(3, 'span')(4, 'strong'),
      n(5, 'Formato combinado:'),
      e(),
      n(6, ' Cuando el time picker est\xE1 habilitado, el formato final es: '),
      t(7, 'code'),
      n(8),
      e()()()),
    m & 2)
  ) {
    let l = Y();
    (r(8), q('', l.dateFormat(), ' ', l.timeFormat()));
  }
}
var de = class m {
  selectedStartDate = new Date();
  selectedEndDate = new Date();
  selectedLabel = null;
  isSelected = !1;
  startDateValue = p(this.formatDateForInput(new Date()));
  endDateValue = p(this.formatDateForInput(new Date()));
  minDateValue = p('');
  maxDateValue = p('');
  dateFormat = p('DD/MM/YYYY');
  timeFormat = p('HH:mm');
  showDropdowns = p(!0);
  showWeekNumbers = p(!1);
  showISOWeekNumbers = p(!1);
  singleDatePicker = p(!1);
  timePicker = p(!1);
  timePicker24Hour = p(!0);
  timePickerSeconds = Me(!1);
  autoApply = p(!1);
  ranges = p(!0);
  alwaysShowCalendars = p(!1);
  showCustomRangeLabel = p(!0);
  linkedCalendars = p(!0);
  autoUpdateInput = p(!0);
  timePickerIncrement = p(1);
  opens = p('right');
  drops = p('down');
  checkboxPosition = p('suffix');
  buttonClasses = p('btn btn-sm');
  applyButtonClasses = p('btn-primary');
  cancelButtonClasses = p('btn-default');
  onDateRangeSelected(o) {
    o &&
      o.from &&
      o.to &&
      ((this.selectedStartDate = o.from),
      (this.selectedEndDate = o.to),
      (this.selectedLabel = o.label || null));
  }
  onCheckboxChange(o) {
    this.isSelected = o;
  }
  formatDateForInput(o) {
    return o.toISOString().split('T')[0];
  }
  getStartDate() {
    return this.startDateValue() ? new Date(this.startDateValue()) : void 0;
  }
  getEndDate() {
    return this.endDateValue() ? new Date(this.endDateValue()) : void 0;
  }
  getMinDate() {
    return this.minDateValue() ? new Date(this.minDateValue()) : null;
  }
  getMaxDate() {
    return this.maxDateValue() ? new Date(this.maxDateValue()) : null;
  }
  pickerOptions = fe(() => {
    let o = this.timePicker() ? `${this.dateFormat()} ${this.timeFormat()}` : this.dateFormat();
    return {
      locale: G(j({}, S), { format: o }),
      theme: C,
      minDate: this.getMinDate(),
      maxDate: this.getMaxDate(),
      singleDatePicker: this.singleDatePicker(),
      timePicker: this.timePicker(),
      timePicker24Hour: this.timePicker24Hour(),
      timePickerSeconds: this.timePickerSeconds(),
      timePickerIncrement: this.timePickerIncrement(),
      autoApply: this.autoApply(),
      showDropdowns: this.showDropdowns(),
      linkedCalendars: this.linkedCalendars(),
      alwaysShowCalendars: this.alwaysShowCalendars(),
      ranges: this.getRanges(),
    };
  });
  getConfigurationCode() {
    let o = {
        startDate: this.startDateValue() || void 0,
        endDate: this.endDateValue() || void 0,
        minDate: this.minDateValue() || void 0,
        maxDate: this.maxDateValue() || void 0,
        dateFormat: this.dateFormat(),
        timeFormat: this.timeFormat(),
        showDropdowns: this.showDropdowns(),
        singleDatePicker: this.singleDatePicker(),
        timePicker: this.timePicker(),
        timePicker24Hour: this.timePicker24Hour(),
        timePickerSeconds: this.timePickerSeconds(),
        timePickerIncrement: this.timePickerIncrement(),
        autoApply: this.autoApply(),
        ranges: this.ranges() ? 'predefinedRanges' : void 0,
        alwaysShowCalendars: this.alwaysShowCalendars(),
        showCustomRangeLabel: this.showCustomRangeLabel(),
        linkedCalendars: this.linkedCalendars(),
        autoUpdateInput: this.autoUpdateInput(),
        opens: this.opens(),
        drops: this.drops(),
        buttonClasses: this.buttonClasses(),
        applyButtonClasses: this.applyButtonClasses(),
        cancelButtonClasses: this.cancelButtonClasses(),
      },
      l = Object.entries(o)
        .filter(([d, i]) => i !== void 0 && i !== !1 && i !== '')
        .reduce((d, [i, ce]) => G(j({}, d), { [i]: ce }), {});
    return `<acp-date-range-picker
  ${Object.entries(l).map(([d, i]) =>
    typeof i == 'boolean'
      ? `[${d}]="${i}"`
      : typeof i == 'string'
        ? `${d}="${i}"`
        : typeof i == 'number'
          ? `[${d}]="${i}"`
          : `[${d}]="${d}"`,
  ).join(`
  `)}
  [showCheckbox]="true"
  [checkboxChecked]="isSelected"
  [showCalendarButton]="true"
  [inputReadonly]="false"
  label="Seleccionar rango de fechas"
  placeholderText="Selecciona fechas"
  (dateRangeSelected)="onDateRangeSelected($event)"
  (checkboxChange)="onCheckboxChange($event)"
></acp-date-range-picker>

// Configuraci\xF3n del locale con formato personalizado:
const fullFormat = timePicker ? '${this.dateFormat()} ${this.timeFormat()}' : '${this.dateFormat()}';
const customLocale = {
  ...SPANISH_LOCALE,
  format: fullFormat
};

// Opciones del picker:
const pickerOptions: DateRangePickerOptions = {
  locale: customLocale,
  theme: MATERIAL_LIGHT_THEME,
  // ... otras opciones configuradas
};`;
  }
  getRanges() {
    if (!this.ranges()) return;
    let o = new Date(),
      l = new Date(o.getTime() - 1440 * 60 * 1e3),
      a = new Date(o.getTime() - 10080 * 60 * 1e3),
      d = new Date(o.getTime() - 720 * 60 * 60 * 1e3),
      i = new Date(o.getFullYear(), o.getMonth(), 1);
    return {
      Hoy: [o, o],
      Ayer: [l, l],
      '\xDAltimos 7 d\xEDas': [a, o],
      '\xDAltimos 30 d\xEDas': [d, o],
      'Este mes': [i, o],
    };
  }
  static ɵfac = function (l) {
    return new (l || m)();
  };
  static ɵcmp = x({
    type: m,
    selectors: [['app-date-range-picker-advanced-example']],
    inputs: { timePickerSeconds: [1, 'timePickerSeconds'] },
    outputs: { timePickerSeconds: 'timePickerSecondsChange' },
    decls: 197,
    vars: 47,
    consts: [
      [1, 'example-card'],
      [1, 'advanced-container'],
      [1, 'config-panel'],
      [1, 'config-section'],
      [1, 'config-row'],
      ['appearance', 'outline'],
      [3, 'ngModelChange', 'ngModel'],
      ['value', 'DD/MM/YYYY'],
      ['value', 'MM/DD/YYYY'],
      ['value', 'YYYY-MM-DD'],
      ['value', 'DD-MM-YYYY'],
      ['value', 'DD.MM.YYYY'],
      ['value', 'YYYY/MM/DD'],
      ['value', 'DD MMM YYYY'],
      ['value', 'MMM DD, YYYY'],
      ['matInput', '', 'type', 'date', 3, 'ngModelChange', 'ngModel'],
      [1, 'checkbox-grid'],
      [3, 'ngModelChange', 'ngModel', 'disabled'],
      ['value', 'HH:mm'],
      ['value', 'hh:mm A'],
      ['value', 'HH:mm:ss'],
      ['value', 'hh:mm:ss A'],
      ['matInput', '', 'type', 'number', 'min', '1', 'max', '60', 3, 'ngModelChange', 'ngModel'],
      ['value', 'prefix'],
      ['value', 'suffix'],
      ['value', 'left'],
      ['value', 'right'],
      ['value', 'center'],
      ['value', 'down'],
      ['value', 'up'],
      ['value', 'auto'],
      ['matInput', '', 'placeholder', 'btn btn-sm', 3, 'ngModelChange', 'ngModel'],
      ['matInput', '', 'placeholder', 'btn-primary', 3, 'ngModelChange', 'ngModel'],
      ['matInput', '', 'placeholder', 'btn-default', 3, 'ngModelChange', 'ngModel'],
      [1, 'preview-panel'],
      [1, 'picker-container'],
      [
        'label',
        'Configuraci\xF3n Personalizada',
        'placeholderText',
        'Selecciona fechas con configuraci\xF3n personalizada',
        3,
        'dateRangeSelected',
        'checkboxChange',
        'timePicker',
        'options',
        'showCheckbox',
        'checkboxChecked',
        'checkboxPosition',
        'showCalendarButton',
        'inputReadonly',
      ],
      [1, 'result-section'],
      [1, 'result-display'],
      [1, 'result-item'],
      [1, 'config-copy-section'],
      [1, 'format-info'],
      ['appearance', 'outline', 1, 'full-width'],
      ['matInput', '', 'readonly', '', 'rows', '20', 3, 'value'],
    ],
    template: function (l, a) {
      (l & 1 &&
        (t(0, 'mat-card', 0)(1, 'mat-card-header')(2, 'mat-card-title'),
        n(3, 'DateRangePicker - Configuraci\xF3n Avanzada'),
        e(),
        t(4, 'mat-card-subtitle'),
        n(5, 'Panel de configuraci\xF3n interactivo similar al configurador web'),
        e()(),
        t(6, 'mat-card-content')(7, 'div', 1)(8, 'div', 2)(9, 'h3'),
        n(10, 'Configuraci\xF3n'),
        e(),
        t(11, 'div', 3)(12, 'h4'),
        n(13, 'Fechas'),
        e(),
        t(14, 'div', 4)(15, 'mat-form-field', 5)(16, 'mat-label'),
        n(17, 'Formato de Fecha'),
        e(),
        t(18, 'mat-select', 6),
        s('ngModelChange', function (i) {
          return a.dateFormat.set(i);
        }),
        t(19, 'mat-option', 7),
        n(20, 'DD/MM/YYYY (Espa\xF1ol - 25/12/2024)'),
        e(),
        t(21, 'mat-option', 8),
        n(22, 'MM/DD/YYYY (Americano - 12/25/2024)'),
        e(),
        t(23, 'mat-option', 9),
        n(24, 'YYYY-MM-DD (ISO - 2024-12-25)'),
        e(),
        t(25, 'mat-option', 10),
        n(26, 'DD-MM-YYYY (Guiones - 25-12-2024)'),
        e(),
        t(27, 'mat-option', 11),
        n(28, 'DD.MM.YYYY (Puntos - 25.12.2024)'),
        e(),
        t(29, 'mat-option', 12),
        n(30, 'YYYY/MM/DD (Japon\xE9s - 2024/12/25)'),
        e(),
        t(31, 'mat-option', 13),
        n(32, 'DD MMM YYYY (Texto - 25 Dic 2024)'),
        e(),
        t(33, 'mat-option', 14),
        n(34, 'MMM DD, YYYY (Ingl\xE9s - Dec 25, 2024)'),
        e()()()(),
        t(35, 'div', 4)(36, 'mat-form-field', 5)(37, 'mat-label'),
        n(38, 'Fecha Inicio'),
        e(),
        t(39, 'input', 15),
        s('ngModelChange', function (i) {
          return a.startDateValue.set(i);
        }),
        e()(),
        t(40, 'mat-form-field', 5)(41, 'mat-label'),
        n(42, 'Fecha Fin'),
        e(),
        t(43, 'input', 15),
        s('ngModelChange', function (i) {
          return a.endDateValue.set(i);
        }),
        e()()(),
        t(44, 'div', 4)(45, 'mat-form-field', 5)(46, 'mat-label'),
        n(47, 'Fecha M\xEDnima'),
        e(),
        t(48, 'input', 15),
        s('ngModelChange', function (i) {
          return a.minDateValue.set(i);
        }),
        e()(),
        t(49, 'mat-form-field', 5)(50, 'mat-label'),
        n(51, 'Fecha M\xE1xima'),
        e(),
        t(52, 'input', 15),
        s('ngModelChange', function (i) {
          return a.maxDateValue.set(i);
        }),
        e()()()(),
        t(53, 'div', 3)(54, 'h4'),
        n(55, 'Opciones de Interfaz'),
        e(),
        t(56, 'div', 16)(57, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.showDropdowns.set(i);
        }),
        n(58, 'showDropdowns'),
        e(),
        t(59, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.showWeekNumbers.set(i);
        }),
        n(60, 'showWeekNumbers'),
        e(),
        t(61, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.showISOWeekNumbers.set(i);
        }),
        n(62, 'showISOWeekNumbers'),
        e(),
        t(63, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.singleDatePicker.set(i);
        }),
        n(64, 'singleDatePicker'),
        e(),
        t(65, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.timePicker.set(i);
        }),
        n(66, 'timePicker'),
        e(),
        t(67, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.timePicker24Hour.set(i);
        }),
        n(68, 'timePicker24Hour'),
        e(),
        t(69, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.timePickerSeconds.set(i);
        }),
        n(70, 'timePickerSeconds'),
        e(),
        t(71, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.autoApply.set(i);
        }),
        n(72, 'autoApply'),
        e(),
        t(73, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.ranges.set(i);
        }),
        n(74, 'ranges (with example predefined ranges)'),
        e(),
        t(75, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.alwaysShowCalendars.set(i);
        }),
        n(76, 'alwaysShowCalendars'),
        e(),
        t(77, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.showCustomRangeLabel.set(i);
        }),
        n(78, 'showCustomRangeLabel'),
        e(),
        t(79, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.linkedCalendars.set(i);
        }),
        n(80, 'linkedCalendars'),
        e(),
        t(81, 'mat-checkbox', 6),
        s('ngModelChange', function (i) {
          return a.autoUpdateInput.set(i);
        }),
        n(82, 'autoUpdateInput'),
        e()()(),
        t(83, 'div', 3)(84, 'h4'),
        n(85, 'Configuraci\xF3n de Tiempo'),
        e(),
        t(86, 'div', 4)(87, 'mat-form-field', 5)(88, 'mat-label'),
        n(89, 'Formato de Tiempo'),
        e(),
        t(90, 'mat-select', 17),
        s('ngModelChange', function (i) {
          return a.timeFormat.set(i);
        }),
        t(91, 'mat-option', 18),
        n(92, 'HH:mm (24h - 14:30)'),
        e(),
        t(93, 'mat-option', 19),
        n(94, 'hh:mm A (12h - 02:30 PM)'),
        e(),
        t(95, 'mat-option', 20),
        n(96, 'HH:mm:ss (24h con segundos - 14:30:45)'),
        e(),
        t(97, 'mat-option', 21),
        n(98, 'hh:mm:ss A (12h con segundos - 02:30:45 PM)'),
        e()()(),
        t(99, 'mat-form-field', 5)(100, 'mat-label'),
        n(101, 'Incremento (minutos)'),
        e(),
        t(102, 'input', 22),
        s('ngModelChange', function (i) {
          return a.timePickerIncrement.set(i);
        }),
        e()()(),
        t(103, 'div', 4)(104, 'mat-form-field', 5)(105, 'mat-label'),
        n(106, 'Posici\xF3n del Checkbox'),
        e(),
        t(107, 'mat-select', 6),
        s('ngModelChange', function (i) {
          return a.checkboxPosition.set(i);
        }),
        t(108, 'mat-option', 23),
        n(109, 'Prefix (Izquierda)'),
        e(),
        t(110, 'mat-option', 24),
        n(111, 'Suffix (Derecha)'),
        e()()()()(),
        t(112, 'div', 3)(113, 'h4'),
        n(114, 'Posicionamiento'),
        e(),
        t(115, 'div', 4)(116, 'mat-form-field', 5)(117, 'mat-label'),
        n(118, 'Opens'),
        e(),
        t(119, 'mat-select', 6),
        s('ngModelChange', function (i) {
          return a.opens.set(i);
        }),
        t(120, 'mat-option', 25),
        n(121, 'left'),
        e(),
        t(122, 'mat-option', 26),
        n(123, 'right'),
        e(),
        t(124, 'mat-option', 27),
        n(125, 'center'),
        e()()(),
        t(126, 'mat-form-field', 5)(127, 'mat-label'),
        n(128, 'Drops'),
        e(),
        t(129, 'mat-select', 6),
        s('ngModelChange', function (i) {
          return a.drops.set(i);
        }),
        t(130, 'mat-option', 28),
        n(131, 'down'),
        e(),
        t(132, 'mat-option', 29),
        n(133, 'up'),
        e(),
        t(134, 'mat-option', 30),
        n(135, 'auto'),
        e()()()()(),
        t(136, 'div', 3)(137, 'h4'),
        n(138, 'Clases CSS'),
        e(),
        t(139, 'div', 4)(140, 'mat-form-field', 5)(141, 'mat-label'),
        n(142, 'Button Classes'),
        e(),
        t(143, 'input', 31),
        s('ngModelChange', function (i) {
          return a.buttonClasses.set(i);
        }),
        e()()(),
        t(144, 'div', 4)(145, 'mat-form-field', 5)(146, 'mat-label'),
        n(147, 'Apply Button Classes'),
        e(),
        t(148, 'input', 32),
        s('ngModelChange', function (i) {
          return a.applyButtonClasses.set(i);
        }),
        e()(),
        t(149, 'mat-form-field', 5)(150, 'mat-label'),
        n(151, 'Cancel Button Classes'),
        e(),
        t(152, 'input', 33),
        s('ngModelChange', function (i) {
          return a.cancelButtonClasses.set(i);
        }),
        e()()()()(),
        t(153, 'div', 34)(154, 'h3'),
        n(155, 'Vista Previa'),
        e(),
        t(156, 'div', 35)(157, 'acp-date-range-picker', 36),
        s('dateRangeSelected', function (i) {
          return a.onDateRangeSelected(i);
        })('checkboxChange', function (i) {
          return a.onCheckboxChange(i);
        }),
        e()(),
        t(158, 'div', 37)(159, 'h4'),
        n(160, 'Resultado de la Selecci\xF3n:'),
        e(),
        t(161, 'div', 38)(162, 'div', 39)(163, 'strong'),
        n(164, 'Formato configurado:'),
        e(),
        t(165, 'span'),
        n(166),
        e()(),
        t(167, 'div', 39)(168, 'strong'),
        n(169, 'Fecha inicio:'),
        e(),
        t(170, 'span'),
        n(171),
        f(172, 'date'),
        e()(),
        t(173, 'div', 39)(174, 'strong'),
        n(175, 'Fecha fin:'),
        e(),
        t(176, 'span'),
        n(177),
        f(178, 'date'),
        e()(),
        t(179, 'div', 39)(180, 'strong'),
        n(181, 'Etiqueta:'),
        e(),
        t(182, 'span'),
        n(183),
        e()(),
        t(184, 'div', 39)(185, 'strong'),
        n(186, 'Checkbox:'),
        e(),
        t(187, 'span'),
        n(188),
        e()()()(),
        t(189, 'div', 40)(190, 'h4'),
        n(191, 'Tu Configuraci\xF3n para Copiar:'),
        e(),
        T(192, bt, 9, 2, 'div', 41),
        t(193, 'mat-form-field', 42)(194, 'mat-label'),
        n(195, 'C\xF3digo HTML y Configuraci\xF3n'),
        e(),
        I(196, 'textarea', 43),
        e()()()()()()),
        l & 2 &&
          (r(18),
          c('ngModel', a.dateFormat()),
          r(21),
          c('ngModel', a.startDateValue()),
          r(4),
          c('ngModel', a.endDateValue()),
          r(5),
          c('ngModel', a.minDateValue()),
          r(4),
          c('ngModel', a.maxDateValue()),
          r(5),
          c('ngModel', a.showDropdowns()),
          r(2),
          c('ngModel', a.showWeekNumbers()),
          r(2),
          c('ngModel', a.showISOWeekNumbers()),
          r(2),
          c('ngModel', a.singleDatePicker()),
          r(2),
          c('ngModel', a.timePicker()),
          r(2),
          c('ngModel', a.timePicker24Hour()),
          r(2),
          c('ngModel', a.timePickerSeconds()),
          r(2),
          c('ngModel', a.autoApply()),
          r(2),
          c('ngModel', a.ranges()),
          r(2),
          c('ngModel', a.alwaysShowCalendars()),
          r(2),
          c('ngModel', a.showCustomRangeLabel()),
          r(2),
          c('ngModel', a.linkedCalendars()),
          r(2),
          c('ngModel', a.autoUpdateInput()),
          r(9),
          c('ngModel', a.timeFormat())('disabled', !a.timePicker()),
          r(12),
          c('ngModel', a.timePickerIncrement()),
          r(5),
          c('ngModel', a.checkboxPosition()),
          r(12),
          c('ngModel', a.opens()),
          r(10),
          c('ngModel', a.drops()),
          r(14),
          c('ngModel', a.buttonClasses()),
          r(5),
          c('ngModel', a.applyButtonClasses()),
          r(4),
          c('ngModel', a.cancelButtonClasses()),
          r(5),
          c('timePicker', a.timePicker())('options', a.pickerOptions())('showCheckbox', !0)(
            'checkboxChecked',
            a.isSelected,
          )('checkboxPosition', a.checkboxPosition())('showCalendarButton', !0)(
            'inputReadonly',
            !1,
          ),
          r(9),
          u(a.timePicker() ? a.dateFormat() + ' ' + a.timeFormat() : a.dateFormat()),
          r(5),
          u(M(172, 41, a.selectedStartDate, a.timePicker() ? 'dd/MM/yyyy HH:mm:ss' : 'dd/MM/yyyy')),
          r(6),
          u(M(178, 44, a.selectedEndDate, a.timePicker() ? 'dd/MM/yyyy HH:mm:ss' : 'dd/MM/yyyy')),
          r(6),
          u(a.selectedLabel || 'Personalizado'),
          r(5),
          u(a.isSelected ? 'Seleccionado' : 'No seleccionado'),
          r(4),
          F(a.timePicker() ? 192 : -1),
          r(4),
          c('value', a.getConfigurationCode())));
    },
    dependencies: [
      Se,
      Ce,
      be,
      E,
      we,
      ke,
      De,
      v,
      P,
      O,
      y,
      b,
      D,
      k,
      He,
      Ie,
      w,
      Ne,
      Ve,
      ze,
      Le,
      Be,
      Ye,
      h,
      J,
      _,
    ],
    styles: [
      '.example-card[_ngcontent-%COMP%]{max-width:1200px;margin:20px auto}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:20px 0}@media(max-width:768px){.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:20px}}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]{background-color:#f8f9fa;padding:20px;border-radius:12px;border:1px solid #e9ecef}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;margin-bottom:20px;color:#495057;font-size:18px;font-weight:600}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   .config-section[_ngcontent-%COMP%]{margin-bottom:25px}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   .config-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:15px;color:#6c757d;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   .config-section[_ngcontent-%COMP%]   .config-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px}@media(max-width:480px){.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   .config-section[_ngcontent-%COMP%]   .config-row[_ngcontent-%COMP%]{grid-template-columns:1fr}}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   .config-section[_ngcontent-%COMP%]   .config-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   .config-section[_ngcontent-%COMP%]   .checkbox-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(max-width:480px){.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%]   .config-section[_ngcontent-%COMP%]   .checkbox-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;margin-bottom:20px;color:#495057;font-size:18px;font-weight:600}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .picker-container[_ngcontent-%COMP%]{margin-bottom:25px;padding:20px;background-color:#fff;border:2px dashed #dee2e6;border-radius:8px;text-align:center}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .result-section[_ngcontent-%COMP%]{margin-bottom:25px}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .result-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:15px;color:#495057;font-size:16px;font-weight:600}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .result-section[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:15px;background:linear-gradient(135deg,#e3f2fd,#f3e5f5);border-radius:8px}@media(max-width:480px){.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .result-section[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]{grid-template-columns:1fr}}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .result-section[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]{padding:10px;background-color:#ffffffe6;border-radius:6px;border-left:3px solid #1976d2}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .result-section[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#1565c0;margin-bottom:4px;font-size:12px;text-transform:uppercase;letter-spacing:.5px}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .result-section[_ngcontent-%COMP%]   .result-display[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#424242;font-size:14px;font-weight:500}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .config-copy-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:15px;color:#495057;font-size:16px;font-weight:600}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .config-copy-section[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{width:100%}.example-card[_ngcontent-%COMP%]   .advanced-container[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]   .config-copy-section[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{font-family:Courier New,monospace;font-size:12px;line-height:1.4;background-color:#f8f9fa}',
    ],
  });
};
g.highlightAll();
var xt = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>DateRangePicker - Configuraci\xF3n Avanzada</mat-card-title>
    <mat-card-subtitle>Panel de configuraci\xF3n interactivo similar al configurador web</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="advanced-container">
      <!-- Panel de Configuraci\xF3n -->
      <div class="config-panel">
        <h3>Configuraci\xF3n</h3>

        <!-- Fechas b\xE1sicas -->
        <div class="config-section">
          <h4>Fechas</h4>
          <div class="config-row">
            <mat-form-field appearance="outline">
              <mat-label>Fecha Inicio</mat-label>
              <input matInput type="date" [(ngModel)]="startDateValue">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Fecha Fin</mat-label>
              <input matInput type="date" [(ngModel)]="endDateValue">
            </mat-form-field>
          </div>
        </div>

        <!-- Opciones de UI -->
        <div class="config-section">
          <h4>Opciones de Interfaz</h4>
          <div class="checkbox-grid">
            <mat-checkbox [(ngModel)]="showDropdowns">showDropdowns</mat-checkbox>
            <mat-checkbox [(ngModel)]="singleDatePicker">singleDatePicker</mat-checkbox>
            <mat-checkbox [(ngModel)]="timePicker">timePicker</mat-checkbox>
            <mat-checkbox [(ngModel)]="autoApply">autoApply</mat-checkbox>
            <mat-checkbox [(ngModel)]="ranges">ranges</mat-checkbox>
            <mat-checkbox [(ngModel)]="alwaysShowCalendars">alwaysShowCalendars</mat-checkbox>
            <mat-checkbox [(ngModel)]="linkedCalendars">linkedCalendars</mat-checkbox>
          </div>
        </div>
      </div>

      <!-- Vista Previa del Componente -->
      <div class="preview-panel">
        <h3>Vista Previa</h3>

        <div class="picker-container">
          <acp-date-range-picker
            [showDropdowns]="showDropdowns"
            [singleDatePicker]="singleDatePicker"
            [timePicker]="timePicker"
            [autoApply]="autoApply"
            [ranges]="getRanges()"
            [alwaysShowCalendars]="alwaysShowCalendars"
            [linkedCalendars]="linkedCalendars"
            [showCheckbox]="true"
            [checkboxChecked]="isSelected"
            label="Configuraci\xF3n Personalizada"
            hint="Ajusta las opciones en el panel izquierdo"
            (dateRangeSelected)="onDateRangeSelected($event)"
            (checkboxChange)="onCheckboxChange($event)"
          ></acp-date-range-picker>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`,
  ht = `import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-advanced-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    DatePipe,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    DateRangePicker,
  ],
})
export class AdvancedApp {
  // Resultado de la selecci\xF3n
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedLabel: string | null = null;
  isSelected: boolean = false;

  // Opciones de UI
  showDropdowns: boolean = true;
  singleDatePicker: boolean = false;
  timePicker: boolean = false;
  autoApply: boolean = false;
  ranges: boolean = true;
  alwaysShowCalendars: boolean = false;
  linkedCalendars: boolean = true;

  // Eventos
  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
  }

  onCheckboxChange(checked: boolean) {
    this.isSelected = checked;
  }

  getRanges(): Record<string, [Date, Date]> | undefined {
    if (!this.ranges) return undefined;

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      'Hoy': [today, today] as [Date, Date],
      'Ayer': [yesterday, yesterday] as [Date, Date],
      '\xDAltimos 7 d\xEDas': [lastWeek, today] as [Date, Date],
    };
  }
}`,
  Ct = `.example-card {
  max-width: 1200px;
  margin: 20px auto;

  .advanced-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding: 20px 0;

    .config-panel {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 12px;

      .config-section {
        margin-bottom: 25px;

        .checkbox-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;

          mat-checkbox {
            font-size: 13px;
          }
        }
      }
    }

    .preview-panel {
      .picker-container {
        margin-bottom: 25px;
        padding: 20px;
        background-color: #ffffff;
        border: 2px dashed #dee2e6;
        border-radius: 8px;
        text-align: center;
      }
    }
  }
}`,
  _t = {
    title: 'Configuraci\xF3n Avanzada',
    description: 'Panel interactivo para configurar todas las opciones del DateRangePicker',
    component: de,
    files: [
      { file: 'app.html', content: g.highlightAuto(xt).value, filecontent: { default: xt } },
      { file: 'app.ts', content: g.highlightAuto(ht).value, filecontent: { default: ht } },
      { file: 'app.styles', content: g.highlightAuto(Ct).value, filecontent: { default: Ct } },
    ],
  };
function yt(m, o) {
  if ((m & 1 && I(0, 'app-doc-heading', 0)(1, 'app-example-viewer', 1), m & 2)) {
    let l = o.$implicit;
    (c('text', l.title), r(), c('exampleData', l));
  }
}
function vt(m, o) {
  (m & 1 && ge(0, yt, 2, 2, null, null, me), m & 2 && ue(o.examples));
}
var pe = class m {
    route = se(he);
    examples = [];
    static ɵfac = function (l) {
      return new (l || m)();
    };
    static ɵcmp = x({
      type: m,
      selectors: [['app-date-range-picker-overview']],
      decls: 10,
      vars: 3,
      consts: [
        [3, 'text'],
        [3, 'exampleData'],
      ],
      template: function (l, a) {
        if (
          (l & 1 &&
            (t(0, 'p'),
            n(1, ' El '),
            t(2, 'code'),
            n(3, 'NgDateRangePickerComponent'),
            e(),
            n(4, ' es un componente Angular que utiliza la potente librer\xEDa '),
            t(5, 'code'),
            n(6, 'ngx-datex'),
            e(),
            n(
              7,
              ` para selecci\xF3n de rangos de fechas. Proporciona integraci\xF3n completa con Angular Forms, soporte para temas personalizables, selecci\xF3n de fechas individuales, rangos de fechas, selector de tiempo, rangos predefinidos, localizaci\xF3n y muchas otras funciones avanzadas.
`,
            ),
            e(),
            T(8, vt, 2, 0),
            f(9, 'async')),
          l & 2)
        ) {
          let d;
          (r(8), F((d = H(9, 1, a.route.data)) ? 8 : -1, d));
        }
      },
      dependencies: [Te, Fe, xe],
      encapsulation: 2,
    });
  },
  no = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    {
      path: 'overview',
      component: pe,
      pathMatch: 'full',
      data: { examples: [_t, Mt, Ge, Je, et, ot, dt, mt] },
    },
    { path: '**', redirectTo: 'overview' },
  ];
export { pe as DateRangePickerOverview, no as routes };
