import { App } from './app';
import hljs from 'highlight.js';

const appHtml = `<h2>Dialog configuration</h2>

<section class="size-controls">
  <mat-form-field>
    <mat-label>Size</mat-label>
    <mat-select [(ngModel)]="size">
      @for (option of sizes; track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
      }
    </mat-select>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Title</mat-label>
    <input matInput [(ngModel)]="title" type="text" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Header color</mat-label>
    <mat-select [(ngModel)]="color">
      <mat-option value="">Default</mat-option>
      @for (option of colors; track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
      }
    </mat-select>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Custom header class</mat-label>
    <input matInput [(ngModel)]="colorClass" type="text" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Actions align</mat-label>
    <mat-select [(ngModel)]="actionsAlign">
      @for (option of alignments; track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
      }
    </mat-select>
  </mat-form-field>
</section>

<section class="dimension-controls">
  <mat-form-field>
    <mat-label>Width (px)</mat-label>
    <input matInput [(ngModel)]="width" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Height (px)</mat-label>
    <input matInput [(ngModel)]="height" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Min width</mat-label>
    <input matInput [(ngModel)]="minWidth" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Min height</mat-label>
    <input matInput [(ngModel)]="minHeight" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Max width</mat-label>
    <input matInput [(ngModel)]="maxWidth" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Max height</mat-label>
    <input matInput [(ngModel)]="maxHeight" type="number" />
  </mat-form-field>
</section>

<section class="checkbox-controls">
  <mat-checkbox [(ngModel)]="backdropClick">Close on backdrop click</mat-checkbox>
  <mat-checkbox [(ngModel)]="escapeKey">Close on Escape</mat-checkbox>
  <mat-checkbox [(ngModel)]="fullScreenOnMobile">Full screen on mobile</mat-checkbox>
</section>

<h2>Open</h2>

<section class="actions">
  <button matButton="elevated" color="primary" (click)="openContent()">Open Content Dialog</button>
</section>

@if (lastResult) {
<p class="last-result">{{ lastResult }}</p>
}
`;

const appTs = `import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  ACP_DIALOG_DATA,
  AcpButtonColor,
  AcpDialogRef,
  AcpDialogService,
  AcpDialogSize,
} from '@acontplus/ng-components';

interface DemoData {
  message: string;
}

@Component({
  selector: 'app-dialog-new-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class App {
  private dialogs = inject(AcpDialogService);

  sizes: AcpDialogSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'];
  alignments: ('start' | 'center' | 'end')[] = ['start', 'center', 'end'];
  colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error', 'dark'] as const;
  size: AcpDialogSize = 'md';
  actionsAlign: 'start' | 'center' | 'end' = 'end';
  color = '';
  colorClass = '';
  title = 'AcpDialog';
  backdropClick = true;
  escapeKey = true;
  fullScreenOnMobile = false;
  width: number | null = null;
  height: number | null = null;
  minWidth: number | null = null;
  minHeight: number | null = null;
  maxWidth: number | null = null;
  maxHeight: number | null = null;
  lastResult = '';

  openContent(): void {
    const ref = this.dialogs.open({
      content: DialogNewContent,
      header: {
        title: this.title,
        color: (this.color || undefined) as AcpButtonColor | undefined,
        colorClass: this.colorClass || undefined,
      },
      size: this.size,
      width: this.width ?? undefined,
      height: this.height ?? undefined,
      minWidth: this.minWidth ?? undefined,
      minHeight: this.minHeight ?? undefined,
      maxWidth: this.maxWidth ?? undefined,
      maxHeight: this.maxHeight ?? undefined,
      actionsAlign: this.actionsAlign,
      actions: [
        { text: 'Cancel', appearance: 'text', result: 'cancel' },
        { text: 'Save', color: 'success', result: 'save' },
      ],
      data: { message: 'Data received through ACP_DIALOG_DATA' },
      closeOn: { backdropClick: this.backdropClick, escapeKey: this.escapeKey },
      fullScreenOnMobile: this.fullScreenOnMobile,
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result
        ? \`Dialog closed with result: "\${String(result)}"\`
        : 'Dialog closed without result';
    });
  }
}

@Component({
  selector: 'app-dialog-new-content',
  template: \`
    <p>{{ data.message }}</p>
    <p>
      This component reads its data via <code>ACP_DIALOG_DATA</code> and closes itself with
      <code>AcpDialogRef</code> — the contract is the same regardless of how it was opened.
    </p>
  \`,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DialogNewContent {
  protected readonly data = inject<DemoData>(ACP_DIALOG_DATA);
  protected readonly ref = inject(AcpDialogRef);
}
`;

const appScss = `section {
  margin: 16px 0;
}

.size-controls,
.dimension-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  mat-form-field {
    flex: 1;
    min-width: 140px;
    margin: 0;
  }
}

.checkbox-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  mat-checkbox {
    margin: 0;
  }
}

.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.last-result {
  margin-top: 16px;
  padding: 12px;
  border-radius: 4px;
  background-color: var(--mat-sys-surface-container);
  color: var(--mat-sys-on-surface);
}

@media (max-width: 768px) {
  .size-controls,
  .dimension-controls {
    flex-direction: column;
    align-items: stretch;

    mat-form-field {
      flex: none;
    }
  }

  .checkbox-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }
}
`;

const dialogNewConfigurableExampleConfig = {
  title: 'Configurable dialog',
  description:
    'Open a content component through AcpDialogService with a typed data/result contract and config actions.',
  component: App,
  files: [
    {
      file: 'app.html',
      content: hljs.highlightAuto(appHtml, ['html']).value,
      filecontent: appHtml,
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs, ['typescript']).value,
      filecontent: appTs,
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss, ['scss']).value,
      filecontent: appScss,
    },
  ],
};

export { dialogNewConfigurableExampleConfig };
