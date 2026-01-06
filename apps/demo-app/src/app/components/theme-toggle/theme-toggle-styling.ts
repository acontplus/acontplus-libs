import { Component } from '@angular/core';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-theme-toggle-styling',
  imports: [DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Theme Toggle Styling</app-doc-heading>
      <p>Styling documentation coming soon...</p>
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
export class ThemeToggleStyling {}
