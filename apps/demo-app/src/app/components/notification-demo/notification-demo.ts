import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

/* Services */
import { NotificationService } from '@acontplus/ng-notifications';
import { NotificationProvider } from '@acontplus/ui-kit';
import { AdvancedDialogService } from '@acontplus/ng-components';

/* ======================================================
 * NOTIFICATION DEMO COMPONENT
 * ====================================================== */
@Component({
  selector: 'app-notification-demo',
  standalone: true,
  templateUrl: './notification-demo.html',
  styleUrls: ['./notification-demo.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class NotificationDemoComponent {
  private notificationService = inject(NotificationService);
  private dialogService = inject(AdvancedDialogService);

  // Configuration options
  selectedProvider: NotificationProvider = 'sweetalert';
  customTitle = 'Custom Title';
  customMessage = 'This is a custom message';
  showTimer = false;
  timerDuration = 3000;

  // Snackbar position configuration
  selectedVerticalPosition: 'top' | 'bottom' = 'bottom';
  selectedHorizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'center';
  showIcon = true;
  showCloseIcon = true;
  showProgressBar = true;

  providers: { value: NotificationProvider; label: string; description: string }[] = [
    {
      value: 'sweetalert',
      label: 'SweetAlert2',
      description: 'Beautiful, responsive popup boxes with rich customization',
    },
    {
      value: 'toastr',
      label: 'Toastr',
      description: 'Simple, lightweight toast notifications with positioning',
    },
    {
      value: 'snackbar',
      label: 'Material Snackbar',
      description: 'Angular Material native snackbar component',
    },
  ];

  // Position options for snackbar
  verticalPositions = [
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
  ];

  horizontalPositions = [
    { value: 'start', label: 'Start' },
    { value: 'center', label: 'Center' },
    { value: 'end', label: 'End' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
  ];

  // Available predefined messages
  predefinedMessages = [
    { key: 'SUCCESS.SAVE', value: this.notificationService.messages.SUCCESS.SAVE },
    { key: 'SUCCESS.DELETE', value: this.notificationService.messages.SUCCESS.DELETE },
    { key: 'SUCCESS.UPDATE', value: this.notificationService.messages.SUCCESS.UPDATE },
    { key: 'ERROR.SAVE', value: this.notificationService.messages.ERROR.SAVE },
    { key: 'ERROR.DELETE', value: this.notificationService.messages.ERROR.DELETE },
    { key: 'ERROR.UPDATE', value: this.notificationService.messages.ERROR.UPDATE },
    { key: 'ERROR.NETWORK', value: this.notificationService.messages.ERROR.NETWORK },
    {
      key: 'WARNING.SESSION_EXPIRING',
      value: this.notificationService.messages.WARNING.SESSION_EXPIRING,
    },
  ];

  /* ======================================================
   * 1. BASIC NOTIFICATIONS
   * ====================================================== */

  showSuccess() {
    this.setProvider();
    this.notificationService.success({
      title: 'Success!',
      message: 'Operation completed successfully!',
      config: this.getSnackbarConfig(),
    });
  }

  showError() {
    this.setProvider();
    this.notificationService.error({
      title: 'Error!',
      message: 'Something went wrong. Please try again.',
      config: this.getSnackbarConfig(),
    });
  }

  showWarning() {
    this.setProvider();
    this.notificationService.warning({
      title: 'Warning!',
      message: 'Please review your input before proceeding.',
      config: this.getSnackbarConfig(),
    });
  }

  showInfo() {
    this.setProvider();
    this.notificationService.info({
      title: 'Information',
      message: 'Here is some important information for you.',
      config: this.getSnackbarConfig(),
    });
  }

  /* ======================================================
   * 2. PREDEFINED MESSAGES
   * ====================================================== */

  showPredefinedMessage(type: 'success' | 'error' | 'warning', messageKey: string) {
    this.setProvider();
    const message = this.getMessageByKey(messageKey);

    switch (type) {
      case 'success':
        this.notificationService.success({ message });
        break;
      case 'error':
        this.notificationService.error({ message, title: 'Error' });
        break;
      case 'warning':
        this.notificationService.warning({ message, title: 'Warning' });
        break;
    }
  }

  /* ======================================================
   * 3. QUICK METHODS
   * ====================================================== */

  showQuickSave(type: 'success' | 'error' = 'success') {
    this.setProvider();
    this.notificationService.quickSave(type);
  }

  showQuickDelete(type: 'success' | 'error' = 'success') {
    this.setProvider();
    this.notificationService.quickDelete(type);
  }

  showQuickUpdate(type: 'success' | 'error' = 'success') {
    this.setProvider();
    this.notificationService.quickUpdate(type);
  }

  showNetworkError() {
    this.setProvider();
    this.notificationService.networkError();
  }

  showSessionWarning() {
    this.setProvider();
    this.notificationService.sessionWarning();
  }

  /* ======================================================
   * 4. CONFIRMATION DIALOGS
   * ====================================================== */

  showSimpleConfirmation() {
    this.setProvider();
    this.notificationService
      .confirm({
        title: 'Are you sure?',
        message: 'This action cannot be undone.',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      })
      .subscribe(result => {
        if (result.isConfirmed) {
          this.notificationService.success({
            title: 'Deleted!',
            message: 'Your item has been deleted.',
          });
        }
      });
  }

  showAdvancedConfirmation() {
    this.setProvider();
    this.notificationService
      .confirm({
        title: 'Save changes?',
        message: 'Do you want to save your changes before leaving?',
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      })
      .subscribe(result => {
        if (result.isConfirmed) {
          this.notificationService.success({ message: 'Changes saved!' });
        } else {
          this.notificationService.info({ message: 'Changes not saved' });
        }
      });
  }

  /* ======================================================
   * 5. CUSTOM CONFIGURATION
   * ====================================================== */

  showCustomNotification() {
    this.setProvider();
    // Para SweetAlert, usar timer; para Snackbar, usar duration
    const timerConfig =
      this.selectedProvider === 'sweetalert' && this.showTimer ? { timer: this.timerDuration } : {};
    const config = this.getSnackbarConfig(timerConfig);

    this.notificationService.success({
      title: this.customTitle,
      message: this.customMessage,
      config,
    });
  }

  /* ======================================================
   * 6. PROVIDER-SPECIFIC EXAMPLES
   * ====================================================== */

  showToastrPositions() {
    const positions = [
      { pos: 'toast-top-right', label: 'Top Right' },
      { pos: 'toast-top-left', label: 'Top Left' },
      { pos: 'toast-bottom-right', label: 'Bottom Right' },
      { pos: 'toast-bottom-left', label: 'Bottom Left' },
    ];

    positions.forEach((position, index) => {
      setTimeout(() => {
        this.notificationService.toastr.success({
          message: `${position.label} Position`,
          title: `Toast ${index + 1}`,
          config: {
            positionClass: position.pos,
            timeOut: 4000,
            progressBar: true,
          },
        });
      }, index * 500);
    });
  }

  showSnackbarPositions() {
    const positions = [
      { v: 'top', h: 'center', label: 'Top Center' },
      { v: 'bottom', h: 'center', label: 'Bottom Center' },
      { v: 'top', h: 'start', label: 'Top Start' },
      { v: 'top', h: 'end', label: 'Top End' },
    ];

    positions.forEach((position, index) => {
      setTimeout(() => {
        this.notificationService.snackbar.info({
          message: `${position.label} Position with enhanced styling`,
          title: `Position Demo ${index + 1}`,
          config: {
            verticalPosition: position.v as 'top' | 'bottom',
            horizontalPosition: position.h as 'start' | 'center' | 'end',
            duration: 4000,
            progressBarEnabled: true,
            showCloseIcon: true,
          },
        });
      }, index * 800);
    });
  }

  showSnackbarFeatures() {
    // Demo with all features enabled
    this.notificationService.snackbar.success({
      message:
        'This snackbar shows all features: icon, close button, progress bar, and action button.',
      title: 'Full Features Demo',
      config: {
        duration: 6000,
        progressBarEnabled: true,
        showCloseIcon: true,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      },
    });

    // Demo without icon
    setTimeout(() => {
      this.notificationService.snackbar.info({
        message: 'This snackbar has no icon, but has close button and progress bar.',
        title: 'No Icon Demo',
        config: {
          duration: 5000,
          iconEnabled: false,
          progressBarEnabled: true,
          showCloseIcon: true,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        },
      });
    }, 1000);

    // Demo without progress bar
    setTimeout(() => {
      this.notificationService.snackbar.warning({
        message: 'This snackbar has icon and close button, but no progress bar.',
        title: 'No Progress Bar Demo',
        config: {
          duration: 5000,
          progressBarEnabled: false,
          showCloseIcon: true,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        },
      });
    }, 2000);

    // Demo with only message (minimal)
    setTimeout(() => {
      this.notificationService.snackbar.error({
        message: 'Minimal snackbar with only close button.',
        config: {
          duration: 4000,
          iconEnabled: false,
          progressBarEnabled: false,
          showCloseIcon: true,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        },
      });
    }, 3000);
  }

  showAccessibilityDemo() {
    // Demonstrate accessibility features with different politeness levels
    const demos = [
      {
        type: 'info',
        title: 'Polite Announcement',
        message:
          'This is a polite notification that waits for screen reader to finish current announcement.',
        delay: 0,
      },
      {
        type: 'warning',
        title: 'Assertive Warning',
        message: 'This warning interrupts screen reader to announce immediately.',
        delay: 2000,
      },
      {
        type: 'error',
        title: 'Critical Error',
        message: 'This error has assertive politeness and will interrupt other announcements.',
        delay: 4000,
      },
      {
        type: 'success',
        title: 'Success with Action',
        message: 'Success notification with accessible action button.',
        delay: 6000,
      },
    ];

    demos.forEach(demo => {
      setTimeout(() => {
        this.notificationService.snackbar[demo.type as 'success' | 'error' | 'warning' | 'info']({
          title: demo.title,
          message: demo.message,
          config: {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          },
        });
      }, demo.delay);
    });

    // Show info about accessibility features
    this.notificationService.info({
      title: 'Accessibility Demo Started',
      message:
        'Watch how different notification types handle screen reader announcements with appropriate politeness levels.',
      config: { duration: 3000 },
    });
  }

  showSweetAlertVariations() {
    const variations = [
      { type: 'success', title: 'Success!', message: 'Everything went well!' },
      { type: 'error', title: 'Error!', message: 'Something went wrong!' },
      { type: 'warning', title: 'Warning!', message: 'Please be careful!' },
      { type: 'info', title: 'Info!', message: 'Here is some information!' },
    ];

    variations.forEach((variation, index) => {
      setTimeout(() => {
        const method =
          this.notificationService.sweetAlert[
            variation.type as 'success' | 'error' | 'warning' | 'info'
          ];
        method.call(this.notificationService.sweetAlert, {
          title: variation.title,
          message: variation.message,
          config: {
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          },
        });
      }, index * 600);
    });
  }

  /* ======================================================
   * 7. MODAL + NOTIFICATIONS INTEGRATION
   * ====================================================== */

  showModalWithNotifications() {
    this.dialogService
      .openInWrapper({
        title: 'Modal with Notifications',
        icon: 'notifications',
        component: ModalNotificationDemoComponent,
        data: {
          notificationService: this.notificationService,
          selectedProvider: this.selectedProvider,
        },
      })
      .then(dialogRef => {
        dialogRef.afterClosed().subscribe((result: unknown) => {
          if (result) {
            this.notificationService.success({
              title: 'Modal Closed',
              message: `Modal was closed with result: ${result}`,
            });
          }
        });
      });
  }

  showModalWithConfirmations() {
    this.dialogService
      .openInWrapper({
        title: 'Modal with Confirmations',
        icon: 'help_outline',
        component: ModalConfirmationDemoComponent,
        data: {
          notificationService: this.notificationService,
          selectedProvider: this.selectedProvider,
        },
      })
      .then(dialogRef => {
        dialogRef.afterClosed().subscribe((result: unknown) => {
          if (result === 'saved') {
            this.notificationService.success({
              title: 'Data Saved',
              message: 'Your changes have been saved successfully!',
            });
          } else if (result === 'cancelled') {
            this.notificationService.info({
              title: 'Cancelled',
              message: 'Operation was cancelled by user.',
            });
          }
        });
      });
  }

  /* ======================================================
   * 8. ADVANCED DEMOS
   * ====================================================== */

  showSequentialDemo() {
    this.notificationService.setProvider('toastr');
    this.notificationService.success({
      message: 'Step 1: Starting process...',
      title: 'Process Started',
      config: { timeOut: 2000 },
    });

    setTimeout(() => {
      this.notificationService.setProvider('snackbar');
      this.notificationService.info({
        message: 'Step 2: Processing data...',
        config: { duration: 2000 },
      });
    }, 1000);

    setTimeout(() => {
      this.notificationService.setProvider('sweetalert');
      this.notificationService.success({
        title: 'Complete!',
        message: 'Step 3: Process completed successfully!',
        config: {
          timer: 3000,
          timerProgressBar: true,
        },
      });
    }, 2500);
  }

  showWorkflowDemo() {
    // Simulate a workflow with confirmations and notifications
    this.notificationService
      .confirm({
        title: 'Start Workflow?',
        message: 'This will begin a multi-step process.',
        confirmButtonText: 'Start',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      })
      .subscribe(startResult => {
        if (!startResult.isConfirmed) return;

        // Step 1
        this.notificationService.info({
          title: 'Step 1',
          message: 'Validating input data...',
          config: { timer: 1500, timerProgressBar: true, showConfirmButton: false },
        });

        setTimeout(() => {
          // Step 2 - Ask for confirmation
          this.notificationService
            .confirm({
              title: 'Continue?',
              message: 'Data validation complete. Continue to processing?',
              confirmButtonText: 'Continue',
              cancelButtonText: 'Stop',
              showCancelButton: true,
            })
            .subscribe(continueResult => {
              if (continueResult.isConfirmed) {
                // Step 3
                this.notificationService.info({
                  title: 'Step 2',
                  message: 'Processing data...',
                  config: { timer: 2000, timerProgressBar: true, showConfirmButton: false },
                });

                setTimeout(() => {
                  // Final step
                  this.notificationService.success({
                    title: 'Workflow Complete!',
                    message: 'All steps completed successfully.',
                    config: { timer: 3000, timerProgressBar: true },
                  });
                }, 2000);
              } else {
                this.notificationService.warning({
                  title: 'Workflow Stopped',
                  message: 'Process was cancelled by user.',
                });
              }
            });
        }, 1500);
      });
  }

  /* ======================================================
   * HELPER METHODS
   * ====================================================== */

  private getSnackbarConfig(
    additionalConfig: Record<string, unknown> = {},
  ): Record<string, unknown> {
    if (this.selectedProvider !== 'snackbar') {
      return additionalConfig;
    }

    const config: Record<string, unknown> = {
      verticalPosition: this.selectedVerticalPosition,
      horizontalPosition: this.selectedHorizontalPosition,
      iconEnabled: this.showIcon,
      showCloseIcon: this.showCloseIcon,
      progressBarEnabled: this.showProgressBar,
      ...additionalConfig,
    };

    // Only set duration if timer is enabled
    if (this.showTimer) {
      config['duration'] = this.timerDuration;
    }

    return config;
  }

  private setProvider() {
    this.notificationService.setProvider(this.selectedProvider);
  }

  onProviderChange() {
    this.setProvider();
  }

  private getMessageByKey(key: string): string {
    const parts = key.split('.');
    let message: unknown = this.notificationService.messages;

    for (const part of parts) {
      if (message && typeof message === 'object' && part in message) {
        message = (message as Record<string, unknown>)[part];
      } else {
        return 'Message not found';
      }
    }

    return typeof message === 'string' ? message : 'Message not found';
  }

  getCurrentProviderInfo() {
    return this.providers.find(p => p.value === this.selectedProvider);
  }
}

/* ======================================================
 * MODAL COMPONENTS FOR DEMONSTRATION
 * ====================================================== */

interface ModalData {
  notificationService: NotificationService;
  selectedProvider: NotificationProvider;
}

@Component({
  selector: 'app-modal-notification-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <mat-dialog-content>
      <p>This modal demonstrates how notifications work inside a modal dialog.</p>

      <div class="demo-buttons">
        <button mat-raised-button color="primary" (click)="showSuccessInModal()">
          Success Notification
        </button>
        <button mat-raised-button color="warn" (click)="showErrorInModal()">
          Error Notification
        </button>
        <button mat-raised-button color="accent" (click)="showInfoInModal()">
          Info Notification
        </button>
      </div>

      <h4>Snackbar Demos:</h4>
      <div class="demo-buttons">
        <button
          mat-raised-button
          style="background: #4caf50; color: white"
          (click)="showSnackbarSuccess()"
        >
          Snackbar Success
        </button>
        <button
          mat-raised-button
          style="background: #f44336; color: white"
          (click)="showSnackbarError()"
        >
          Snackbar Error
        </button>
        <button
          mat-raised-button
          style="background: #2196f3; color: white"
          (click)="showSnackbarInfo()"
        >
          Snackbar Info
        </button>
        <button
          mat-raised-button
          style="background: #ff9800; color: white"
          (click)="showSnackbarWarning()"
        >
          Snackbar Warning
        </button>
      </div>

      <div class="form-section">
        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Enter some data</mat-label>
          <input matInput [(ngModel)]="inputData" placeholder="Type something..." />
        </mat-form-field>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .modal-demo {
        min-width: 400px;
      }
      .demo-buttons {
        display: flex;
        gap: 12px;
        margin: 16px 0;
        flex-wrap: wrap;
      }
      .form-section {
        margin: 20px 0;
      }
      mat-dialog-actions {
        margin-top: 20px;
      }
    `,
  ],
})
export class ModalNotificationDemoComponent {
  inputData = '';
  data?: ModalData; // Make it optional and don't inject it

  private dialogRef = inject(MatDialogRef<ModalNotificationDemoComponent>);

  // Remove the constructor that was trying to access this.data
  // The data will be set by DialogWrapper after component creation

  showSuccessInModal() {
    if (this.data?.notificationService) {
      this.data.notificationService.setProvider(this.data.selectedProvider);
      this.data.notificationService.success({
        title: 'Success in Modal!',
        message: 'This notification was triggered from inside the modal.',
      });
    }
  }

  showErrorInModal() {
    if (this.data?.notificationService) {
      this.data.notificationService.setProvider(this.data.selectedProvider);
      this.data.notificationService.error({
        title: 'Error in Modal!',
        message: 'This error notification was triggered from inside the modal.',
      });
    }
  }

  showInfoInModal() {
    if (this.data?.notificationService) {
      this.data.notificationService.setProvider(this.data.selectedProvider);
      this.data.notificationService.info({
        title: 'Info in Modal!',
        message: 'This info notification was triggered from inside the modal.',
      });
    }
  }

  showSnackbarSuccess() {
    if (this.data?.notificationService) {
      this.data.notificationService.snackbar.success({
        title: 'Snackbar Success!',
        message: 'This snackbar was opened from inside the modal.',
        config: {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          progressBarEnabled: true,
          showCloseIcon: true,
        },
      });
    }
  }

  showSnackbarError() {
    if (this.data?.notificationService) {
      this.data.notificationService.snackbar.error({
        title: 'Snackbar Error!',
        message: 'This error snackbar was opened from inside the modal.',
        config: {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
          progressBarEnabled: true,
          showCloseIcon: true,
        },
      });
    }
  }

  showSnackbarInfo() {
    if (this.data?.notificationService) {
      this.data.notificationService.snackbar.info({
        title: 'Snackbar Info!',
        message: 'This info snackbar was opened from inside the modal.',
        config: {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          progressBarEnabled: true,
          showCloseIcon: true,
        },
      });
    }
  }

  showSnackbarWarning() {
    if (this.data?.notificationService) {
      this.data.notificationService.snackbar.warning({
        title: 'Snackbar Warning!',
        message: 'This warning snackbar was opened from inside the modal.',
        config: {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'start',
          progressBarEnabled: true,
          showCloseIcon: true,
        },
      });
    }
  }

  onSave() {
    if (!this.inputData.trim()) {
      if (this.data?.notificationService) {
        this.data.notificationService.warning({
          title: 'Validation Error',
          message: 'Please enter some data before saving.',
        });
      }
      return;
    }

    if (this.data?.notificationService) {
      this.data.notificationService.success({
        title: 'Saving...',
        message: 'Your data is being saved.',
        config: { timer: 1500 },
      });
    }

    setTimeout(() => {
      this.dialogRef.close(this.inputData);
    }, 1500);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-modal-confirmation-demo',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="modal-demo">
      <h2 mat-dialog-title>Modal with Confirmations Demo</h2>

      <mat-dialog-content>
        <p>This modal demonstrates confirmation dialogs triggered from within a modal.</p>
        <p>Try the different confirmation types below:</p>

        <div class="demo-buttons">
          <button mat-raised-button color="warn" (click)="showDeleteConfirmation()">
            Delete Confirmation
          </button>
          <button mat-raised-button color="accent" (click)="showSaveConfirmation()">
            Save Confirmation
          </button>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onClose()">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .modal-demo {
        min-width: 400px;
      }
      .demo-buttons {
        display: flex;
        gap: 12px;
        margin: 20px 0;
        flex-wrap: wrap;
      }
      mat-dialog-actions {
        margin-top: 20px;
      }
    `,
  ],
})
export class ModalConfirmationDemoComponent {
  data?: ModalData; // Make it optional and don't inject it

  private dialogRef = inject(MatDialogRef<ModalConfirmationDemoComponent>);

  // Remove the constructor that was trying to access this.data
  // The data will be set by DialogWrapper after component creation

  showDeleteConfirmation() {
    if (this.data?.notificationService) {
      this.data.notificationService.setProvider(this.data.selectedProvider);
      this.data.notificationService
        .confirm({
          title: 'Delete Item?',
          message: 'This action cannot be undone. Are you sure you want to delete this item?',
          confirmButtonText: 'Yes, Delete',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
        })
        .subscribe(result => {
          if (result.isConfirmed) {
            this.data!.notificationService.success({
              title: 'Deleted!',
              message: 'The item has been deleted successfully.',
            });
          }
        });
    }
  }

  showSaveConfirmation() {
    if (this.data?.notificationService) {
      this.data.notificationService.setProvider(this.data.selectedProvider);
      this.data.notificationService
        .confirm({
          title: 'Save Changes?',
          message: 'Do you want to save your changes before closing?',
          confirmButtonText: 'Save',
          cancelButtonText: "Don't Save",
          showCancelButton: true,
        })
        .subscribe(result => {
          if (result.isConfirmed) {
            this.data!.notificationService.success({
              title: 'Saved!',
              message: 'Your changes have been saved.',
            });
            setTimeout(() => {
              this.dialogRef.close('saved');
            }, 1500);
          }
        });
    }
  }

  onCancel() {
    this.dialogRef.close('cancelled');
  }

  onClose() {
    this.dialogRef.close();
  }
}
