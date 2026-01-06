import { Component } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-cards-examples',
  imports: [DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Cards Examples</app-doc-heading>
      <p>More examples coming soon...</p>
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
      }
    `,
  ],
})
export class CardsExamples {}
