import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-code-example',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="code-example-card">
      <mat-card-content>
        <div class="code-header">
          <span class="code-language">{{ language }}</span>
          <button mat-icon-button (click)="copyCode()" title="Copy code">
            <mat-icon>{{ copied ? 'check' : 'content_copy' }}</mat-icon>
          </button>
        </div>
        <pre><code [class]="'language-' + language">{{ code }}</code></pre>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .code-example-card {
        margin-bottom: 24px;
        background-color: var(--mat-sys-surface-container-low);
      }

      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        padding: 8px 0;
        border-bottom: 1px solid var(--mat-sys-outline-variant);
      }

      .code-language {
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--mat-sys-primary);
      }

      pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
        background-color: var(--mat-sys-surface-container);
        border-radius: 4px;
      }

      code {
        font-family: 'Roboto Mono', monospace;
        font-size: 14px;
        line-height: 1.6;
        color: var(--mat-sys-on-surface);
      }
    `,
  ],
})
export class CodeExample {
  @Input() code = '';
  @Input() language = 'typescript';

  copied = false;

  copyCode() {
    navigator.clipboard.writeText(this.code);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
