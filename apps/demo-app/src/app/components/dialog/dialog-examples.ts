import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleType, ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { dialogConfigurableExampleConfig } from './examples/configurable';

@Component({
  selector: 'app-dialog-examples',
  imports: [DocHeading, ExampleViewer],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Dialog Examples</app-doc-heading>
      <app-example-viewer [exampleData]="configurable" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }
    `,
  ],
})
export class DialogExamples {
  configurable = dialogConfigurableExampleConfig as unknown as ExampleType;
}
