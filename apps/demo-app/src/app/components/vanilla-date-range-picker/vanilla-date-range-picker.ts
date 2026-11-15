import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { vanillaDateRangeBasicExampleConfig } from './examples/basic';
import { vanillaDateRangeTimePickerExampleConfig } from './examples/time-picker';
import { vanillaDateRangeCustomRangesExampleConfig as vanillaDateRangeCheckboxExampleConfig } from './examples/custom-ranges';

@Component({
  selector: 'app-vanilla-date-range-picker-overview',
  templateUrl: './vanilla-date-range-picker-overview.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class VanillaDateRangePickerOverview {
  route = inject(ActivatedRoute);

  examples: unknown[] = [];
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: VanillaDateRangePickerOverview,
    pathMatch: 'full',
    data: {
      examples: [
        vanillaDateRangeBasicExampleConfig,
        vanillaDateRangeTimePickerExampleConfig,
        vanillaDateRangeCheckboxExampleConfig,
      ],
    },
  },
  { path: '**', redirectTo: 'overview' },
];
