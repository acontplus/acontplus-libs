import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-examples',
  imports: [CommonModule],
  template: `
    <div class="docs-component-viewer-content">
      <h1>Button Examples</h1>
      <p>More interactive examples coming soon...</p>
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
export class ButtonExamples {}
