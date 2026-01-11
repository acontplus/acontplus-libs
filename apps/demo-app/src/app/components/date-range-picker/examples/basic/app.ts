import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DateRangePicker, DateRangePickerOptions } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-picker-basic-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
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
  isSelected: boolean = false;
  checkboxPosition: 'prefix' | 'suffix' = 'prefix';

  // Rangos predefinidos
  ranges = {
    Hoy: [new Date(), new Date()] as [Date, Date],
    Ayer: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    ] as [Date, Date],
    'Últimos 7 días': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
    'Últimos 30 días': [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()] as [
      Date,
      Date,
    ],
    'Este mes': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ] as [Date, Date],
  } as Record<string, [Date, Date]>;

  // Configuración del picker como propiedad
  pickerOptions: DateRangePickerOptions = {
    ranges: this.ranges,
    presetTheme: this.currentTheme,
    autoApply: false,
    showDropdowns: true,
    linkedCalendars: true,
    showCustomRangeLabel: true,
  };

  // Manejador de eventos cuando se selecciona un rango
  onDateRangeSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.selectedLabel = event.label || null;
  }

  // Cambiar tema
  switchTheme(themeName: 'default' | 'bootstrap' | 'material') {
    this.currentTheme = themeName;
    // Actualizar la configuración
    this.pickerOptions = {
      ...this.pickerOptions,
      presetTheme: themeName,
    };
  }

  // Manejar cambio de checkbox
  onCheckboxChange(checked: boolean) {
    this.isSelected = checked;
  }

  // Cambiar posición del checkbox
  switchCheckboxPosition(position: 'prefix' | 'suffix') {
    this.checkboxPosition = position;
  }
}
