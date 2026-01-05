import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { gridBasicExampleConfig } from './examples/basic';
@Component({
  selector: 'app-data-grid-overview',
  templateUrl: './data-grid-overview.html',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class GridOverview {
  route = inject(ActivatedRoute);

  examples = [];
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

  { path: '**', redirectTo: 'overview' },
];
