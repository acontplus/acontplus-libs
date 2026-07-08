import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button-examples',
  imports: [],
  template: `
    <div class="docs-component-viewer-content">
      <h1>Button Examples</h1>
      <p>More interactive examples coming soon...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
      }
    `,
  ],
})
export class ButtonExamples {}
