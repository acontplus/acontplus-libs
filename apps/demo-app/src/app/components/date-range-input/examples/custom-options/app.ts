import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
  AcpDateRangeInput,
  type AcpSelectedDateEvent,
  type IAcpSelectDateOption,
  ACP_DATE_OPTION_TYPE,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-input-custom-options-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, AcpDateRangeInput],
})
export class App {
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  selectedLabel: string | null = null;

  customOptions: IAcpSelectDateOption[] = [
    {
      optionLabel: 'Últimos 3 meses',
      optionType: ACP_DATE_OPTION_TYPE.DATE_DIFF,
      dateDiff: -90,
      isSelected: false,
      isVisible: true,
    },
    {
      optionLabel: 'Últimos 6 meses',
      optionType: ACP_DATE_OPTION_TYPE.DATE_DIFF,
      dateDiff: -180,
      isSelected: false,
      isVisible: true,
    },
    {
      optionLabel: 'Último año',
      optionType: ACP_DATE_OPTION_TYPE.DATE_DIFF,
      dateDiff: -365,
      isSelected: false,
      isVisible: true,
    },
    {
      optionLabel: 'Rango personalizado',
      optionType: ACP_DATE_OPTION_TYPE.CUSTOM,
      isSelected: false,
      isVisible: true,
    },
  ];

  onDateSelectionChanged(event: AcpSelectedDateEvent) {
    this.selectedStartDate = event.range?.start || null;
    this.selectedEndDate = event.range?.end || null;
    this.selectedLabel = event.selectedOption?.optionLabel || null;
  }
}
