import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';

/* Services */
import { AlertDialogService } from '@acontplus/ng-components';

/* ======================================================
 * ALERT DIALOG COMPONENT
 * ====================================================== */
@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  templateUrl: './alert-dialog.html',
  styleUrls: ['./alert-dialog.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class AlertDialogComponent {
  private readonly alert = inject(AlertDialogService);

  /* ======================================================
   * 1. BASIC ALERTS
   * ====================================================== */

  async showSuccess() {
    await this.alert.success({
      title: 'Success!',
      message: 'Your operation was completed successfully!',
      confirmText: 'Great!',
      timer: 3000,
      timerProgressBar: true,
    });
  }

  async showError() {
    await this.alert.error({
      title: 'Error!',
      message: 'Something went wrong. Please try again.',
      confirmText: 'OK',
      width: '450px',
    });
  }

  async showInfo() {
    await this.alert.info({
      title: 'Information',
      message: 'This is an informational message.',
      confirmText: 'Got it!',
      showCancelButton: true,
      cancelText: 'Not now',
    });
  }

  /* ======================================================
   * 2. CONFIRMATION DIALOGS
   * ====================================================== */

  async showConfirm() {
    const result = await this.alert.confirm({
      title: 'Are you sure?',
      message: 'This action cannot be undone.',
      confirmText: 'Yes, delete it!',
      cancelText: 'No, cancel',
      confirmButtonVariant: 'danger',
    });

    if (result.isConfirmed) {
      await this.alert.success('Item deleted successfully!');
    }
  }

  async showDenyConfirm() {
    const result = await this.alert.fire({
      title: 'Save changes?',
      message: 'Do you want to save your changes?',
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmText: 'Save',
      denyText: 'Discard',
      cancelText: 'Cancel',
    });

    if (result.isConfirmed) {
      await this.alert.success('Changes saved!');
    } else if (result.isDenied) {
      await this.alert.info('Changes discarded');
    }
  }

  /* ======================================================
   * 3. INPUT PROMPTS
   * ====================================================== */

  async showTextPrompt() {
    const result = await this.alert.prompt({
      title: 'Enter your name',
      message: 'Please enter your full name',
      input: 'text',
      inputLabel: 'Full Name',
      inputPlaceholder: 'John Doe',
      showCancelButton: true,
      inputValidator: value => {
        if (!value) return 'Name is required';
        if (value.length < 3) return 'Minimum 3 characters';
        return null;
      },
    });

    if (result.isConfirmed) {
      await this.alert.success(`Hello, ${result.value}!`);
    }
  }

  async showEmailPrompt() {
    await this.alert.prompt({
      title: 'Subscribe to newsletter',
      message: 'Enter your email address',
      input: 'email',
      inputPlaceholder: 'email@example.com',
      showCancelButton: true,
      inputValidator: value => {
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Invalid email format';
        }
        return null;
      },
    });
  }

  /* ======================================================
   * 4. ADVANCED CONTENT
   * ====================================================== */

  async showHtmlContent() {
    await this.alert.fire({
      title: 'HTML Content',
      html: `
        <div style="text-align:left">
          <p><strong>Features:</strong></p>
          <ul>
            <li>HTML support</li>
            <li>Custom styles</li>
            <li>Lists and formatting</li>
          </ul>
        </div>
      `,
      width: '500px',
    });
  }

  async showImageDialog() {
    await this.alert.fire({
      title: 'Profile Updated',
      message: 'Your profile picture has been updated',
      imageUrl: 'https://via.placeholder.com/150',
      imageWidth: '150px',
      imageHeight: '150px',
      imageAlt: 'User avatar',
    });
  }

  /* ======================================================
   * 5. TOAST NOTIFICATIONS
   * ====================================================== */

  showSuccessToast() {
    this.alert.toast({
      title: 'Success!',
      message: 'Your changes have been saved',
      type: 'success',
      position: 'top-end',
      timer: 3000,
      showConfirmButton: false,
    });
  }

  showErrorToast() {
    this.alert.toast({
      title: 'Error!',
      message: 'Failed to save changes',
      type: 'error',
      position: 'top-end',
      timer: 5000,
      showConfirmButton: true,
    });
  }

  /* ======================================================
   * 6. CUSTOM COMPONENT DIALOG
   * ====================================================== */

  async showCustomComponent() {
    let selectedItem: string | null = null;

    const result = await this.alert.fire({
      title: 'Custom Component',
      message: 'This dialog contains a custom component',
      component: CustomDialogContentComponent,
      componentProps: {
        data: {
          name: 'John',
          items: ['Item 1', 'Item 2', 'Item 3'],
          onSelect: (item: string) => (selectedItem = item),
        },
      },
      showCancelButton: true,
      confirmText: 'Submit',
      width: '600px',
      preConfirm: () => {
        if (!selectedItem) return 'Please select an item';
        return selectedItem;
      },
    });

    if (result.isConfirmed) {
      await this.alert.success(`You selected: ${result.value}`);
    }
  }

  /* ======================================================
   * 7. GLOBAL / ADVANCED CONFIGURATION
   * ====================================================== */

  async showGlobalDefaultsExample() {
    this.alert.setDefaults({
      confirmButtonColor: '#8b5cf6',
      width: '450px',
      reverseButtons: true,
    });

    await this.alert.success({
      title: 'Global Configuration',
      message: 'This dialog uses global configuration',
    });

    this.alert.resetDefaults();
  }

  /* ======================================================
   * 8. MULTI STEP PROCESS
   * ====================================================== */

  async showMultiStepProcess() {
    const steps = [
      { title: 'Step 1', message: 'Validating data...', duration: 1000 },
      { title: 'Step 2', message: 'Processing information...', duration: 1500 },
      { title: 'Step 3', message: 'Finalizing...', duration: 1000 },
    ];

    for (const step of steps) {
      await this.alert.fire({
        title: step.title,
        message: step.message,
        type: 'info',
        timer: step.duration,
        timerProgressBar: true,
        showConfirmButton: false,
        disableClose: true,
      });
    }

    await this.alert.success({
      title: 'Completed!',
      message: 'All steps completed successfully',
      timer: 2000,
    });
  }
}

/* ======================================================
 * CUSTOM DIALOG COMPONENT
 * ====================================================== */

interface CustomDialogData {
  name: string;
  items: string[];
  onSelect: (item: string) => void;
}

@Component({
  selector: 'app-custom-dialog-content',
  standalone: true,
  imports: [CommonModule, MatListModule],
  template: `
    <div class="p-4">
      <p>Hello, {{ data.name }}!</p>
      <p>Select an item:</p>

      <mat-selection-list [multiple]="false" (selectionChange)="onSelection($event)">
        @for (item of data.items; track $index) {
          <mat-list-option [value]="item">
            {{ item }}
          </mat-list-option>
        }
      </mat-selection-list>
    </div>
  `,
})
export class CustomDialogContentComponent {
  @Input() data!: CustomDialogData;

  onSelection(event: MatSelectionListChange) {
    const value = event.options[0]?.value;
    if (value) {
      this.data.onSelect(value);
    }
  }
}
