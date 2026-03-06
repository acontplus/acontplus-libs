import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { popoverConfigurableExampleConfig } from './examples/configurable';
import { PopoverApi } from './popover-api';

/**
 * Popover demo component that showcases the ACP Popover functionality.
 *
 * This component demonstrates various popover configurations including:
 * - Different trigger events (hover, click)
 * - Various positioning options
 * - Customizable delays and offsets
 * - Backdrop and panel click behaviors
 */
@Component({
  selector: 'app-popover-overview',
  templateUrl: './popover-overview.html',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class PopoverOverview {
  route = inject(ActivatedRoute);
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: PopoverOverview,
    pathMatch: 'full',
    data: {
      examples: [popoverConfigurableExampleConfig],
    },
  },
  {
    path: 'api',
    component: PopoverApi,
  },
  { path: '**', redirectTo: 'overview' },
];
