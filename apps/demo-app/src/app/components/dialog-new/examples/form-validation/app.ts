import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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

interface UserFormData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-dialog-form-validation-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButtonModule],
})
export class App {
  private dialogs = inject(AcpDialogService);
  lastResult = '';

  openForm(): void {
    const ref = this.dialogs.open(UserFormDialog, {
      title: 'User form',
      size: 'md',
      data: { user: { name: '', email: '' } },
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result
        ? `Dialog closed with result: "${JSON.stringify(result)}"`
        : 'Dialog closed without result';
    });
  }
}

@Component({
  selector: 'app-user-form-dialog',
  template: `
    <acp-dialog>
      <acp-dialog-titlebar title="User form" icon="person" />

      <acp-dialog-content>
        <form [formGroup]="form" (ngSubmit)="save()" id="testSend">
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" />
            @if (form.controls.name.hasError('required')) {
              <mat-error>Name is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field>
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" />
            @if (form.controls.email.hasError('required')) {
              <mat-error>Email is required</mat-error>
            } @else if (form.controls.email.hasError('email')) {
              <mat-error>Invalid email</mat-error>
            }
          </mat-form-field>
        </form>
      </acp-dialog-content>

      <acp-dialog-actions align="end">
        <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
        <acp-button type="submit" form="testSend" text="Save" color="success" />
      </acp-dialog-actions>
    </acp-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AcpDialog,
    AcpDialogContent,
    AcpDialogTitlebar,
    AcpDialogActions,
    AcpButton,
  ],
})
export class UserFormDialog {
  protected readonly data = inject<{ user: UserFormData }>(ACP_DIALOG_DATA);
  protected readonly ref = inject(AcpDialogRef<UserFormData>);

  form = new FormGroup({
    name: new FormControl(this.data.user.name, Validators.required),
    email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
  });

  save(): void {
    if (this.form.valid) {
      this.ref.close(this.form.value as UserFormData);
    }
  }
}
