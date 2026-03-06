import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { drawerConfigurableExampleConfig } from './examples/configurable';
import { DrawerApi } from './drawer-api';

@Component({
  selector: 'app-drawer-overview',
  templateUrl: './drawer-overview.html',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class DrawerOverview {
  route = inject(ActivatedRoute);
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: DrawerOverview,
    pathMatch: 'full',
    data: {
      examples: [drawerConfigurableExampleConfig],
    },
  },
  {
    path: 'api',
    component: DrawerApi,
  },
  { path: '**', redirectTo: 'overview' },
];
