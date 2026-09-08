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
    <mat-label>Header icon</mat-label>
    <input matInput [(ngModel)]="icon" type="text" />
  </mat-form-field>
</section>

<section class="checkbox-controls">
  <mat-checkbox [(ngModel)]="hideHeader">Hide Header</mat-checkbox>
  <mat-checkbox [(ngModel)]="showCloseButton">Show Close Button</mat-checkbox>
  <mat-checkbox [(ngModel)]="backdropClickClosable">Backdrop Click Closable</mat-checkbox>
  <mat-checkbox [(ngModel)]="isMobileFullScreen">Mobile Full Screen</mat-checkbox>
</section>

<h2>Result</h2>

<section class="actions">
  <button matButton="elevated" color="primary" (click)="openWrapped()">
    Open Wrapped Dialog
  </button>
  <button matButton="elevated" (click)="openDirect()">Open Direct Dialog</button>
</section>

@if (lastResult) {
<p class="last-result">{{ lastResult }}</p>
}
`;

const appTs = `import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdvancedDialogService, DialogSize, DialogWrapper } from '@acontplus/ng-components';

interface DialogDemoData {
  message: string;
}

@Component({
  selector: 'app-dialog-configurable-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
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
  private dialog = inject(AdvancedDialogService);

  sizes: DialogSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'];
  size: DialogSize = 'md';
  icon = 'info';
  hideHeader = false;
  showCloseButton = true;
  backdropClickClosable = true;
  isMobileFullScreen = true;
  lastResult = '';

  async openWrapped() {
    const dialogRef = await this.dialog.openInWrapper<DialogDemoData, string>(
      {
        component: DialogDemoContent,
        title: 'Dialog Wrapper',
        icon: this.icon || undefined,
        hideHeader: this.hideHeader,
        showCloseButton: this.showCloseButton,
        data: { message: 'Data passed through DialogWrapperConfig.data' },
      },
      {
        size: this.size,
        backdropClickClosable: this.backdropClickClosable,
        isMobileFullScreen: this.isMobileFullScreen,
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      this.lastResult = result
        ? \`Wrapped dialog closed with result: "\${result}"\`
        : 'Wrapped dialog closed without result';
    });
  }

  async openDirect() {
    const result = await this.dialog.openAndGetResult<
      DialogDemoContent,
      DialogDemoData,
      string
    >(DialogDemoContent, {
      size: this.size,
      data: { message: 'Data passed through MAT_DIALOG_DATA' },
      backdropClickClosable: this.backdropClickClosable,
      isMobileFullScreen: this.isMobileFullScreen,
    });

    this.lastResult = result
      ? \`Direct dialog closed with result: "\${result}"\`
      : 'Direct dialog closed without result';
  }
}

@Component({
  selector: 'app-dialog-demo-content',
  template: \`
    <mat-dialog-content>
      <p>{{ message }}</p>
      <p>
        This component is rendered dynamically. When opened through the wrapper, the title, icon
        and close button come from <code>DialogWrapperConfig</code>.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton (click)="close('cancel')">Cancel</button>
      <button matButton="filled" color="primary" (click)="close('save')">Save</button>
    </mat-dialog-actions>
  \`,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDemoContent {
  /** Set by the DialogWrapper when opened via openInWrapper. */
  data?: DialogDemoData;

  /** Set by MatDialog when opened directly via open / openAndGetResult. */
  private readonly injectedData = inject<DialogDemoData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly dialogRef = inject<MatDialogRef<DialogWrapper | DialogDemoContent, string>>(
    MatDialogRef,
  );

  get message(): string {
    return this.data?.message ?? this.injectedData?.message ?? 'No data provided';
  }

  close(result: string): void {
    this.dialogRef.close(result);
  }
}
`;

const appScss = `section {
  margin: 16px 0;
}

.size-controls {
  display: flex;
  gap: 16px;
  align-items: center;

  mat-form-field {
    flex: 1;
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
  .size-controls {
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

const dialogConfigurableExampleConfig = {
  title: 'Configurable dialog',
  description:
    'Open a component inside the DialogWrapper or directly, with configurable size, header and close behavior.',
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

export { dialogConfigurableExampleConfig };
