import { AdvancedApp } from './app';
import hljs from 'highlight.js';
hljs.highlightAll();

const appHtml = `<mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>DateRangePicker - Configuración Avanzada</mat-card-title>
    <mat-card-subtitle>Panel de configuración interactivo similar al configurador web</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <div class="advanced-container">
      <!-- Panel de Configuración -->
      <div class="config-panel">
        <h3>Configuración</h3>

        <!-- Fechas básicas -->
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
            label="Configuración Personalizada"
            hint="Ajusta las opciones en el panel izquierdo"
            (dateRangeSelected)="onDateRangeSelected($event)"
            (checkboxChange)="onCheckboxChange($event)"
          ></acp-date-range-picker>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>`;

const appTs = `import { Component } from '@angular/core';
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
  // Resultado de la selección
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
      'Últimos 7 días': [lastWeek, today] as [Date, Date],
    };
  }
}`;

const appScss = `.example-card {
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
}`;

const dateRangePickerAdvancedExampleConfig = {
  title: 'Configuración Avanzada',
  description: 'Panel interactivo para configurar todas las opciones del DateRangePicker',
  component: AdvancedApp,
  files: [
    {
      file: 'app.html',
      content: hljs.highlightAuto(appHtml).value,
      filecontent: { default: appHtml },
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs).value,
      filecontent: { default: appTs },
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss).value,
      filecontent: { default: appScss },
    },
  ],
};

export { dateRangePickerAdvancedExampleConfig };
