import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { dateRangeInputBasicExampleConfig } from './examples/basic';
import { dateRangeInputCustomOptionsExampleConfig } from './examples/custom-options';
import { dateRangeInputEditableDatesExampleConfig } from './examples/editable-dates';
import { dateRangeInputHumanExpressionsExampleConfig } from './examples/human-expressions';

@Component({
  selector: 'app-date-range-input-overview',
  templateUrl: './date-range-input-overview.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class DateRangeInputOverview {
  route = inject(ActivatedRoute);

  examples: unknown[] = [];
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: DateRangeInputOverview,
    pathMatch: 'full',
    data: {
      examples: [
        dateRangeInputBasicExampleConfig,
        dateRangeInputCustomOptionsExampleConfig,
        dateRangeInputEditableDatesExampleConfig,
        dateRangeInputHumanExpressionsExampleConfig,
      ],
    },
  },
  { path: '**', redirectTo: 'overview' },
];
