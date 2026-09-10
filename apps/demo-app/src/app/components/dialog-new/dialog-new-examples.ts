import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { ExampleType, ExampleViewer } from '../../shared/example-viewer/example-viewver';
import { dialogNewAdvancedExampleConfig } from './examples/advanced';
import { dialogNewConfigurableExampleConfig } from './examples/configurable';
import { dialogNewDeclarativeExampleConfig } from './examples/declarative';
import { dialogNewFormValidationExampleConfig } from './examples/form-validation';
import { dialogNewActionStateExampleConfig } from './examples/action-state';

@Component({
  selector: 'app-dialog-new-examples',
  imports: [DocHeading, ExampleViewer],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Dialog Examples</app-doc-heading>
      <app-example-viewer [exampleData]="configurable" />
      <app-example-viewer [exampleData]="declarative" />
      <app-example-viewer [exampleData]="formValidation" />
      <app-example-viewer [exampleData]="actionState" />
      <app-example-viewer [exampleData]="advanced" />
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
export class DialogNewExamples {
  configurable = dialogNewConfigurableExampleConfig as unknown as ExampleType;
  declarative = dialogNewDeclarativeExampleConfig as unknown as ExampleType;
  formValidation = dialogNewFormValidationExampleConfig as unknown as ExampleType;
  actionState = dialogNewActionStateExampleConfig as unknown as ExampleType;
  advanced = dialogNewAdvancedExampleConfig as unknown as ExampleType;
}
