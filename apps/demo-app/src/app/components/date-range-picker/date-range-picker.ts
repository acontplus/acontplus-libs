import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { dateRangePickerBasicExampleConfig } from './examples/basic';
import { dateRangePickerAutoApplyExampleConfig } from './examples/auto-apply';
import { dateRangePickerSingleDateExampleConfig } from './examples/single-date';
import { dateRangePickerDateTimeExampleConfig } from './examples/datetime';
import { dateRangePickerRangesOnlyExampleConfig } from './examples/ranges-only';
import { dateRangePickerNoDropdownsExampleConfig } from './examples/no-dropdowns';
import { dateRangePickerAngularWrapperExampleConfig } from './examples/angular-wrapper';
import { dateRangePickerAdvancedExampleConfig } from './examples/advanced';

@Component({
  selector: 'app-date-range-picker-overview',
  templateUrl: './date-range-picker-overview.html',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class DateRangePickerOverview {
  route = inject(ActivatedRoute);

  examples: unknown[] = [];
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: DateRangePickerOverview,
    pathMatch: 'full',
    data: {
      examples: [
        dateRangePickerAdvancedExampleConfig,
        dateRangePickerAngularWrapperExampleConfig,
        dateRangePickerBasicExampleConfig,
        dateRangePickerAutoApplyExampleConfig,
        dateRangePickerSingleDateExampleConfig,
        dateRangePickerDateTimeExampleConfig,
        dateRangePickerRangesOnlyExampleConfig,
        dateRangePickerNoDropdownsExampleConfig,
      ],
    },
  },
  { path: '**', redirectTo: 'overview' },
];
