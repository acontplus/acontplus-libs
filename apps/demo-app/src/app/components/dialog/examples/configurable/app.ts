import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
        ? `Wrapped dialog closed with result: "${result}"`
        : 'Wrapped dialog closed without result';
    });
  }

  async openDirect() {
    const result = await this.dialog.openAndGetResult<DialogDemoContent, DialogDemoData, string>(
      DialogDemoContent,
      {
        size: this.size,
        data: { message: 'Data passed through MAT_DIALOG_DATA' },
        backdropClickClosable: this.backdropClickClosable,
        isMobileFullScreen: this.isMobileFullScreen,
      },
    );

    this.lastResult = result
      ? `Direct dialog closed with result: "${result}"`
      : 'Direct dialog closed without result';
  }
}

@Component({
  selector: 'app-dialog-demo-content',
  template: `
    <mat-dialog-content>
      <p>{{ message }}</p>
      <p>
        This component is rendered dynamically. When opened through the wrapper, the title, icon and
        close button come from <code>DialogWrapperConfig</code>.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton (click)="close('cancel')">Cancel</button>
      <button matButton="filled" color="primary" (click)="close('save')">Save</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDemoContent {
  /** Set by the DialogWrapper when opened via openInWrapper. */
  data?: DialogDemoData;

  /** Set by MatDialog when opened directly via open / openAndGetResult. */
  private readonly injectedData = inject<DialogDemoData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly dialogRef =
    inject<MatDialogRef<DialogWrapper | DialogDemoContent, string>>(MatDialogRef);

  get message(): string {
    return this.data?.message ?? this.injectedData?.message ?? 'No data provided';
  }

  close(result: string): void {
    this.dialogRef.close(result);
  }
}
