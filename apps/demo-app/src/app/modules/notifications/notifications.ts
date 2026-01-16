import { Component, inject } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { notificationBasicExampleConfig } from './notification-example';

@Component({
  selector: 'app-notifications',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
  templateUrl: './notifications.html',
})
export class Notifications {
  route = inject(ActivatedRoute);

  examples: any[] = [];
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: Notifications,
    pathMatch: 'full',
    data: {
      examples: [notificationBasicExampleConfig],
    },
  },

  { path: '**', redirectTo: 'overview' },
];
