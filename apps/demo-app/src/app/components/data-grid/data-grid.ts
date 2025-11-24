import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { gridBasicExampleConfig } from './examples/basic';
@Component({
  selector: 'app-data-grid-overview',
  templateUrl: './data-grid-overview.html',
  imports: [DocHeading, ExampleViewer, AsyncPipe],
})
export class GridOverview implements OnInit {
  route = inject(ActivatedRoute);

  examples: any[] = [];

  async ngOnInit() {}
}

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: GridOverview,
    pathMatch: 'full',
    data: {
      examples: [
        gridBasicExampleConfig,
        // gridColumnResizeExampleConfig,
        // gridContextMenuExampleConfig,
        // gridLoadingStatusExampleConfig,
        // gridHidePaginationExampleConfig,
        // gridSortableExampleConfig,
        // gridRowSelectableExampleConfig,
        // gridExpandableRowExampleConfig,
        // gridColumnHidingMovingExampleConfig,
        // gridColumnPinnableExampleConfig,
        // gridHoverStripedExampleConfig,
        // gridRowWithButtonsExampleConfig,
        // gridCustomCellTemplateExampleConfig,
        // gridCustomCellTemplate2ExampleConfig,
        // gridDataFormattingExampleConfig,
        // gridRowColumnClassExampleConfig,
        // gridNoResultExampleConfig,
        // gridCustomHeaderTemplateExampleConfig,
        // gridCustomFooterTemplateExampleConfig,
        // gridCustomToolbarTemplateExampleConfig,
        // gridI18nExampleConfig,
        // gridRemoteDataExampleConfig,
      ],
    },
  },

  { path: '**', redirectTo: 'overview' },
];
