import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { gridBasicExampleConfig } from './examples/basic';
import { DataGridExamples } from './examples/data-grid-examples';
import { DataGridApi } from './data-grid-api';
import { DataGridStyling } from './data-grid-styling';

@Component({
  selector: 'app-data-grid-overview',
  templateUrl: './data-grid-overview.html',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class GridOverview {
  route = inject(ActivatedRoute);

  examples: any[] = [];
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: GridOverview,
    pathMatch: 'full',
    data: {
      examples: [gridBasicExampleConfig],
    },
  },
  {
    path: 'examples',
    component: DataGridExamples,
  },
  {
    path: 'api',
    component: DataGridApi,
  },
  {
    path: 'styling',
    component: DataGridStyling,
  },
  { path: '**', redirectTo: 'overview' },
];
