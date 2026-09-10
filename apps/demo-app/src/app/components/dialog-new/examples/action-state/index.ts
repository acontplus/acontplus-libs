import { App } from './app';
import hljs from 'highlight.js';

const appHtml = `<h2>Reactive action state</h2>

<p>
  The dialog uses a <code>Signal</code> for <code>disabled</code> and <code>loading</code>, so the
  Save button follows the form validity and a pending async operation.
</p>

<section class="actions">
  <button matButton="elevated" color="primary" (click)="openActionState()">
    Open action state dialog
  </button>
</section>

@if (lastResult) {
<p class="last-result">{{ lastResult }}</p>
}
`;

const appTs = `import { Component, inject, ChangeDetectionStrategy, Injector, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ACP_DIALOG_DATA, AcpDialogRef, AcpDialogService } from '@acontplus/ng-components';

interface ActionStateData {
  form: FormGroup;
}

@Component({
  selector: 'app-dialog-action-state-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButtonModule],
})
export class App {
  private dialogs = inject(AcpDialogService);
  private injector = inject(Injector);

  form = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  saveDisabled = toSignal(this.form.statusChanges.pipe(map(() => this.form.invalid)), {
    injector: this.injector,
    initialValue: this.form.invalid,
  });

  saving = signal(false);
  lastResult = '';

  openActionState(): void {
    const ref = this.dialogs.open<ActionStateDialogContent, ActionStateData, string>(
      ActionStateDialogContent,
      {
        title: 'Reactive action state',
        data: { form: this.form },
        actions: [
          { text: 'Cancel', appearance: 'text', result: 'cancel' },
          {
            text: 'Save',
            color: 'success',
            disabled: this.saveDisabled,
            loading: this.saving,
            result: 'save',
          },
        ],
      },
    );

    ref.clickedResult.subscribe(({ action, event }) => {
      if (action.key === 'save') {
        event.preventDefault();
        this.saving.set(true);
        setTimeout(() => {
          this.saving.set(false);
          ref.close('saved');
        }, 1000);
      }
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result
        ? \`Dialog closed with result: "\${String(result)}"\`
        : 'Dialog closed without result';
    });
  }
}

@Component({
  selector: 'app-action-state-dialog-content',
  template: \`
    <p>Enter a code to enable the Save action.</p>
    <form [formGroup]="data.form">
      <mat-form-field>
        <mat-label>Code</mat-label>
        <input matInput formControlName="code" />
        @if (data.form.get('code')?.hasError('required')) {
          <mat-error>Code is required</mat-error>
        }
      </mat-form-field>
    </form>
  \`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class ActionStateDialogContent {
  protected readonly data = inject<ActionStateData>(ACP_DIALOG_DATA);
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

const dialogNewActionStateExampleConfig = {
  title: 'Reactive action state',
  description:
    'Config actions driven by Signal/Observable state: Save is disabled while the form is invalid and shows a loading state during the async save.',
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

export { dialogNewActionStateExampleConfig };
