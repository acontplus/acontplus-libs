import { Component } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-cards-api',
  imports: [DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Cards API</app-doc-heading>
      <p>API documentation coming soon...</p>
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
export class CardsApi {}
