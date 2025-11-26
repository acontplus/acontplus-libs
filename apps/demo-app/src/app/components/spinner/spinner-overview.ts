import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spinner } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { Button } from '@acontplus/ng-components';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-spinner-overview',
  imports: [CommonModule, Spinner, MatCardModule, Button, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Spinner</app-doc-heading>

      <p class="docs-component-description">
        Loading spinner components for async operations. Provides visual feedback during data
        loading, form submissions, and other asynchronous tasks.
      </p>

      <h2>Basic Spinner</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="spinner-demo">
            <acp-spinner />
          </div>
        </mat-card-content>
      </mat-card>

      <app-code-example [code]="basicSpinnerCode" [language]="'typescript'" />

      <h2>Loading Example</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="loading-demo">
            <acp-button
              [text]="isLoading ? 'Loading...' : 'Load Data'"
              [variant]="'primary'"
              [disabled]="isLoading"
              (handleClick)="loadData()"
            />
            @if (isLoading) {
              <div class="loading-container">
                <acp-spinner />
                <span class="loading-text">Fetching data...</span>
              </div>
            }
            @if (!isLoading && dataLoaded) {
              <div class="success-message">✓ Data loaded successfully!</div>
            }
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 32px;
        color: var(--mat-sys-on-surface-variant);
      }

      h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 32px 0 16px;
        color: var(--mat-sys-on-surface);
      }

      .docs-example-card {
        margin-bottom: 16px;
      }

      .spinner-demo {
        display: flex;
        justify-content: center;
        padding: 24px;
      }

      .spinner-sizes {
        display: flex;
        gap: 48px;
        align-items: flex-end;
        justify-content: center;
        padding: 24px;
      }

      .spinner-size-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .spinner-size-item span {
        font-size: 12px;
        color: var(--mat-sys-on-surface-variant);
      }

      .loading-demo {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .loading-container {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background-color: var(--mat-sys-surface-container);
        border-radius: 8px;
      }

      .loading-text {
        color: var(--mat-sys-on-surface-variant);
      }

      .success-message {
        color: var(--mat-sys-primary);
        padding: 16px;
        background-color: var(--mat-sys-primary-container);
        border-radius: 8px;
      }

      .overlay-demo {
        position: relative;
        min-height: 200px;
      }

      .spinner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        border-radius: 8px;
      }

      .content-area {
        padding: 24px;
        background-color: var(--mat-sys-surface-container-low);
        border-radius: 8px;
      }
    `,
  ],
})
export class SpinnerOverview {
  isLoading = false;
  dataLoaded = false;
  showOverlaySpinner = false;

  basicSpinnerCode = `<acp-spinner />`;

  loadingExampleCode = `export class MyComponent {
  isLoading = false;

  loadData() {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}

// Template
@if (isLoading) {
  <div class="loading-container">
    <acp-spinner />
    <span>Fetching data...</span>
  </div>
}`;

  loadData() {
    this.isLoading = true;
    this.dataLoaded = false;

    setTimeout(() => {
      this.isLoading = false;
      this.dataLoaded = true;
    }, 2000);
  }

  showOverlay() {
    this.showOverlaySpinner = true;

    setTimeout(() => {
      this.showOverlaySpinner = false;
    }, 2000);
  }
}
