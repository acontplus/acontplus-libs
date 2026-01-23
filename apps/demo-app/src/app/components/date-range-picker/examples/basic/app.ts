import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  DateRangePicker,
  DateRangePickerOptions,
  DateRangeValue,
  SPANISH_LOCALE,
  MATERIAL_LIGHT_THEME,
} from '@acontplus/ng-components';

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
  // Propiedades para mostrar los valores seleccionados usando signals
  selectedStartDate = signal<Date>(new Date());
  selectedEndDate = signal<Date>(new Date());
  selectedLabel = signal<string | null>(null);
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
    theme: MATERIAL_LIGHT_THEME,
    locale: SPANISH_LOCALE,
    autoApply: false,
    showDropdowns: true,
    linkedCalendars: true,
  };

  // Manejador de eventos cuando se selecciona un rango
  onDateRangeSelected(event: DateRangeValue<false> | null) {
    if (event && event.from && event.to) {
      this.selectedStartDate.set(event.from);
      this.selectedEndDate.set(event.to);
      this.selectedLabel.set(event.label || null);
    }
  }

  // Cambiar tema
  switchTheme(themeName: 'default' | 'bootstrap' | 'material') {
    this.currentTheme = themeName;
    // Actualizar la configuración
    this.pickerOptions = {
      ...this.pickerOptions,
      theme: MATERIAL_LIGHT_THEME, // Usar siempre el tema material
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
