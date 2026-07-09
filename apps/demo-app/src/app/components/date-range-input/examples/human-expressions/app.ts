import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AcpDateRangeInput, type AcpSelectedDateEvent } from '@acontplus/ng-components';

@Component({
  selector: 'app-date-range-input-human-expressions-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [DatePipe, MatInputModule, MatFormFieldModule, MatCardModule, AcpDateRangeInput],
})
export class App {
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  selectedLabel: string | null = null;
  startExpr: string | null = null;
  endExpr: string | null = null;

  onDateSelectionChanged(event: AcpSelectedDateEvent) {
    this.selectedStartDate = event.range?.start || null;
    this.selectedEndDate = event.range?.end || null;
    this.selectedLabel = event.selectedOption?.optionLabel || null;
    this.startExpr = event.startExpr;
    this.endExpr = event.endExpr;
  }
}
