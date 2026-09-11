import { App } from './app';
import hljs from 'highlight.js';

const appHtml = `<h2>Declarative layout</h2>

<p>
  This dialog uses <code>acp-dialog-titlebar</code> and <code>acp-dialog-actions</code> inside the
  content template instead of the configured header and actions.
</p>

<section class="actions">
  <button matButton="elevated" color="primary" (click)="openDeclarative()">
    Open declarative dialog
  </button>
</section>

@if (lastResult) {
<p class="last-result">{{ lastResult }}</p>
}
`;

const appTs = `import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
        ? \`Dialog closed with result: "\${String(result)}"\`
        : 'Dialog closed without result';
    });
  }
}

@Component({
  selector: 'app-declarative-dialog-content',
  template: \`
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
  \`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AcpDialog, AcpDialogContent, AcpDialogTitlebar, AcpDialogActions, AcpButton],
})
export class DeclarativeDialogContent {
  protected readonly data = inject<DemoData>(ACP_DIALOG_DATA);
  protected readonly ref = inject(AcpDialogRef<string>);
}
`;

const appScss = `section {
  margin: 16px 0;
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
`;

const dialogNewDeclarativeExampleConfig = {
  title: 'Declarative layout',
  description:
    'Uses acp-dialog, acp-dialog-titlebar, acp-dialog-content and acp-dialog-actions inside the content template.',
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

export { dialogNewDeclarativeExampleConfig };
