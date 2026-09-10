import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ACP_DIALOG_DATA,
  AcpButton,
  AcpDialog,
  AcpDialogActions,
  AcpDialogContent,
  AcpDialogRef,
  AcpDialogService,
  AcpDialogTitlebar,
} from '@acontplus/ng-components';

interface DemoData {
  message: string;
}

@Component({
  selector: 'app-dialog-declarative-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButtonModule],
})
export class App {
  private dialogs = inject(AcpDialogService);
  lastResult = '';

  openDeclarative(): void {
    const ref = this.dialogs.open<DeclarativeDialogContent, DemoData, string>(
      DeclarativeDialogContent,
      {
        data: { message: 'Declarative titlebar and actions' },
      },
    );

    ref.afterClosed().subscribe(result => {
      this.lastResult = result
        ? `Dialog closed with result: "${String(result)}"`
        : 'Dialog closed without result';
    });
  }
}

@Component({
  selector: 'app-declarative-dialog-content',
  template: `
    <acp-dialog>
      <acp-dialog-titlebar title="Declarative layout" icon="person" />

      <acp-dialog-content>
        <p>{{ data.message }}</p>
      </acp-dialog-content>

      <acp-dialog-actions align="end">
        <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
        <acp-button text="Save" color="success" (clicked)="ref.close('saved')" />
      </acp-dialog-actions>
    </acp-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AcpDialog, AcpDialogContent, AcpDialogTitlebar, AcpDialogActions, AcpButton],
})
export class DeclarativeDialogContent {
  protected readonly data = inject<DemoData>(ACP_DIALOG_DATA);
  protected readonly ref = inject(AcpDialogRef<string>);
}
