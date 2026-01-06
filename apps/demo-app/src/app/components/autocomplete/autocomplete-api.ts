import { Component } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-autocomplete-api',
  imports: [DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Autocomplete API</app-doc-heading>
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
export class AutocompleteApi {}
