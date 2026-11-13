import {
  Component,
  ElementRef,
  input,
  model,
  output,
  viewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateRangePicker } from './vanilla-datetimerange-picker';

@Component({
  selector: 'acp-vanilla-date-range-picker',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './vanilla-date-range-picker.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './vanilla-date-range-picker.scss',
})
export class AcpVanillaDateRangePicker implements AfterViewInit {
  showInputMaterial = input(false);
  showMatSuffix = input(false);
  showMatPrefix = input(false);
  checkbox = model(false);
  label = input('Rango Fecha');
  requiredDate = input(false);
  from = input<string | null>(null);
  to = input<string | null>(null);
  inputGroupDateChecked = input(false);
  options = input<{ timePicker: boolean; format: string }>({
    timePicker: false,
    format: 'YYYY-MM-DD',
  });

  checkboxToggled = output<void>();
  valueChangeRequiredDate = output<boolean>();
  dateRangeChange = output<{ from: string; to: string }>();

  dateRangeInput = viewChild<ElementRef>('dateRangeInput');

  public uniqueId = `date-range-${Math.random().toString(36).substring(2, 9)}`;
  private selfDateRef: any;

  ngAfterViewInit() {
    this.setConfigDateRange();
  }

  setConfigDateRange = () => {
    const now = new Date();
    const formatCurrentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    function getDateAddDay(day: number) {
      const d = new Date();
      d.setDate(d.getDate() + day);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    }

    function weekStart(date: Date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 00:00:00`;
    }

    function weekEnd(date: Date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = day === 0 ? 0 : 7 - day;
      d.setDate(d.getDate() + diff);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 23:59:59`;
    }

    function monthStart(date: Date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01 00:00:00`;
    }

    function monthEnd(date: Date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()).padStart(2, '0')} 23:59:59`;
    }

    const rangos = {
      Hoy: [formatCurrentDate, formatCurrentDate],
      Ayer: [getDateAddDay(-1), getDateAddDay(-1)],
      'Últimos 5 días': [getDateAddDay(-4), formatCurrentDate],
      'Últimos 10 días': [getDateAddDay(-9), formatCurrentDate],
      'Últimos 15 días': [getDateAddDay(-14), formatCurrentDate],
      'Últimos 30 días': [getDateAddDay(-29), formatCurrentDate],
      'Esta semana': [weekStart(now), weekEnd(now)],
      'Este mes': [monthStart(now), monthEnd(now)],
      'El mes pasado': [
        (() => {
          const d = new Date(now.getFullYear(), now.getMonth(), 0);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01 00:00:00`;
        })(),
        (() => {
          const d = new Date(now.getFullYear(), now.getMonth(), 0);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 23:59:59`;
        })(),
      ],
    };

    const valorInput = document.getElementById(`${this.uniqueId}`) as any;

    this.selfDateRef = new DateRangePicker(
      valorInput,
      {
        startDate: this.from() ?? undefined,
        endDate: this.to() ?? undefined,
        showDropdowns: true,
        minYear: 2020,
        showWeekNumbers: true,
        timePicker: this.options().timePicker,
        timePicker24Hour: true,
        timePickerSeconds: true,
        alwaysShowCalendars: true,
        opens: 'center',
        drops: 'auto',
        ranges: rangos,
        locale: {
          applyLabel: 'Aplicar',
          cancelLabel: 'Cancelar',
          customRangeLabel: 'Rango Personalizado',
          separator: ' - ',
          format: this.options().format,
        },
      },
      (start: any, end: any) => {
        const dateRange = {
          from: start.format('YYYY-MM-DD HH:mm:ss'),
          to: end.format('YYYY-MM-DD HH:mm:ss'),
        };
        this.dateRangeChange.emit(dateRange);
      },
    );
  };

  // Legacy aliases for backward compatibility
  get onChangeDateRange() {
    return this.dateRangeChange;
  }
  get onCheckboxChange() {
    return this.checkboxToggled;
  }

  onCheckboxClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onChangeRequiredDate() {
    this.valueChangeRequiredDate.emit(this.requiredDate());
  }
}
