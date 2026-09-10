import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-dialog-new-overview',
  imports: [MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Dialog (New)</app-doc-heading>

      <p class="docs-component-description">
        <code>AcpDialogService</code> is a reusable, strongly-typed dialog service built on Angular
        Material. Every dialog renders inside <code>AcpDialogContainer</code>, so content components
        always work the same way: they read their data with <code>inject(ACP_DIALOG_DATA)</code> and
        close themselves with <code>inject(AcpDialogRef)</code>. The single
        <code>open()</code> method accepts a component, a <code>TemplateRef</code>, a string, or a
        lazy loader.
      </p>

      <h2>Opening a dialog</h2>
      <app-code-example [code]="openCode" [language]="'typescript'" />

      <h2>Content component contract</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <p>
            Content components never touch <code>MAT_DIALOG_DATA</code> or
            <code>MatDialogRef</code>. They inject <code>ACP_DIALOG_DATA</code> for their payload
            and <code>AcpDialogRef&lt;R&gt;</code> to close with a typed result — the contract is
            identical whether the dialog shows a header or not.
          </p>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="contentCode" [language]="'typescript'" />

      <h2>Actions</h2>
      <app-code-example [code]="actionsCode" [language]="'typescript'" />

      <h2>Declarative layout</h2>
      <app-code-example [code]="declarativeCode" [language]="'html'" />

      <h2>Global defaults</h2>
      <app-code-example [code]="defaultsCode" [language]="'typescript'" />
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
export class DialogNewOverview {
  openCode = `import { AcpDialogService } from '@acontplus/ng-components';

private dialogs = inject(AcpDialogService);

openUserDialog() {
  this.dialogs.open(UserForm, {
    title: 'Edit user',
    actions: [
      { text: 'Cancel', appearance: 'text' },
      { text: 'Save', color: 'success' },
    ],
    size: 'lg',
    data: { userId: 42 },
    closeOn: { backdropClick: false, escapeKey: true },
    fullScreenOnMobile: true,
  }).afterClosed().subscribe(user => {
    if (user) {
      // handle the result
    }
  });
}`;

  contentCode = `@Component({
  template: \`
    <p>User form content</p>
  \`,
})
export class UserForm {
  protected data = inject(ACP_DIALOG_DATA);
  protected ref = inject(AcpDialogRef);
}`;

  actionsCode = `// Each action closes the dialog with its optional 'result'
this.dialogs.open(UserForm, {
  title: 'Edit user',
  actions: [
    { text: 'Cancel', appearance: 'text' },
    { text: 'Delete', color: 'error', result: true },
  ],
}).afterClosed().subscribe(user => {
  // user === true when the Delete action is clicked
});`;

  declarativeCode = `<acp-dialog>
  <acp-dialog-titlebar title="Edit user" icon="person" />

  <acp-dialog-content>
    <p>Dialog body</p>
  </acp-dialog-content>

  <acp-dialog-actions align="end">
    <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
    <acp-button text="Save" color="success" (clicked)="ref.close(user)" />
  </acp-dialog-actions>
</acp-dialog>`;

  defaultsCode = `// app.config.ts — application-wide defaults
providers: [
  provideAcpDialogDefaults({
    fullScreenOnMobile: true,
    closeOn: { escapeKey: true },
  }),
]`;
}
