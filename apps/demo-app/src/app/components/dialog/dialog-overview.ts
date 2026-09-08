import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-dialog-overview',
  imports: [MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Dialog Wrapper</app-doc-heading>

      <p class="docs-component-description">
        The <code>AdvancedDialogService</code> opens components inside Angular Material dialogs with
        consistent sizing, mobile full-screen support, accessibility options, and centralized
        z-index management. Use <code>openInWrapper</code> to render a component inside the branded
        <code>DialogWrapper</code>, which adds a draggable header with title, icon, and close
        button.
      </p>

      <h2>Opening a wrapped dialog</h2>
      <app-code-example [code]="wrapperCode" [language]="'typescript'" />

      <h2>Opening a dialog directly</h2>
      <app-code-example [code]="directCode" [language]="'typescript'" />

      <h2>Content component</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>
            Content components receive their payload either through the
            <code>data</code> property (when opened via <code>openInWrapper</code>) or through
            <code>MAT_DIALOG_DATA</code> (when opened directly). They can inject
            <code>MatDialogRef</code> to close the dialog with a result.
          </p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="contentCode" [language]="'typescript'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
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
    `,
  ],
})
export class DialogOverview {
  wrapperCode = `import { AdvancedDialogService } from '@acontplus/ng-components';

private dialog = inject(AdvancedDialogService);

async openUserDialog() {
  const dialogRef = await this.dialog.openInWrapper<{ userId: number }, User>(
    {
      component: UserFormComponent,
      title: 'Edit user',
      icon: 'person',
      data: { userId: 42 },
    },
    {
      size: 'lg',
      isMobileFullScreen: true,
      backdropClickClosable: false,
    },
  );

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // handle the result
    }
  });
}`;

  directCode = `const result = await this.dialog.openAndGetResult<
  ConfirmComponent,
  { message: string },
  boolean
>(ConfirmComponent, {
  size: 'sm',
  data: { message: 'Delete this record?' },
  role: 'alertdialog',
});`;

  contentCode = `@Component({ ... })
export class UserFormComponent {
  // Assigned by DialogWrapper when opened via openInWrapper
  data?: { userId: number };

  // Available when opened directly via open / openAndGetResult
  private injectedData = inject<{ userId: number } | null>(MAT_DIALOG_DATA, {
    optional: true,
  });

  private dialogRef = inject(MatDialogRef);

  save(user: User) {
    this.dialogRef.close(user);
  }
}`;
}
