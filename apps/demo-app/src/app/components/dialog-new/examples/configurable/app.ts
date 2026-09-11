import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
  colors = [
    'primary',
    'secondary',
    'accent',
    'success',
    'warning',
    'info',
    'error',
    'dark',
  ] as const;
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
        ? `Dialog closed with result: "${String(result)}"`
        : 'Dialog closed without result';
    });
  }
}

@Component({
  selector: 'app-dialog-new-content',
  template: `
    <p>{{ data.message }}</p>
    <p>
      This component reads its data via <code>ACP_DIALOG_DATA</code> and closes itself with
      <code>AcpDialogRef</code> — the contract is the same regardless of how it was opened.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DialogNewContent {
  protected readonly data = inject<DemoData>(ACP_DIALOG_DATA);
  protected readonly ref = inject(AcpDialogRef);
}
