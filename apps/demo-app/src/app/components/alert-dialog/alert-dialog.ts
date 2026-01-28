import { Component, inject, Input } from '@angular/core';
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
      buttons: {
        confirm: { text: 'Great!' },
      },
      timer: 3000,
      timerProgressBar: true,
    });
  }

  async showError() {
    await this.alert.error({
      title: 'Error!',
      message: 'Something went wrong. Please try again.',
      buttons: {
        confirm: { text: 'OK' },
      },
      width: '450px',
    });
  }

  async showInfo() {
    await this.alert.info({
      title: 'Information',
      message: 'This is an informational message.',
      buttons: {
        confirm: { text: 'Got it!' },
        cancel: { text: 'Not now' },
      },
      showCancelButton: true,
    });
  }

  /* ======================================================
   * 2. CONFIRMATION DIALOGS
   * ====================================================== */

  async showConfirm() {
    const result = await this.alert.confirm({
      title: 'Are you sure?',
      message: 'This action cannot be undone.',
      buttons: {
        confirm: { text: 'Yes, delete it!', variant: 'danger' },
        cancel: { text: 'No, cancel' },
      },
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
      buttons: {
        confirm: { text: 'Save' },
        deny: { text: 'Discard' },
        cancel: { text: 'Cancel' },
      },
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
   * 5. CUSTOM COMPONENT DIALOG
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
      buttons: {
        confirm: { text: 'Submit' },
      },
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
   * 6. GLOBAL / ADVANCED CONFIGURATION
   * ====================================================== */

  async showGlobalDefaultsExample() {
    this.alert.setDefaults({
      width: '450px',
      reverseButtons: true,
      buttons: {
        confirm: { color: '#8b5cf6' },
      },
    });

    await this.alert.success({
      title: 'Global Configuration',
      message: 'This dialog uses global configuration',
    });

    this.alert.resetDefaults();
  }

  /* ======================================================
   * 7. MODERN LAYOUT & DELETE DIALOGS
   * ====================================================== */

  async showModernLayout() {
    await this.alert.fire({
      title: 'Modern Layout',
      message:
        'This dialog uses the modern layout with icon on the left and close button on the right.',
      type: 'info',
      layout: 'modern',
      iconPosition: 'left',
      contentAlignment: 'left',
      showCloseButton: true,
      animation: 'slide',
      width: '500px',
      showCancelButton: true,
    });
  }

  async showDeleteDialog() {
    const result = await this.alert.delete({
      title: 'Delete Account',
      message: 'This action cannot be undone. All your data will be permanently removed.',
      buttons: {
        confirm: { text: 'Delete Forever' },
        cancel: { text: 'Keep Account' },
      },
      layout: 'modern',
      animation: 'bounce',
    });

    if (result.isConfirmed) {
      await this.alert.success('Account deleted successfully');
    }
  }

  async showCenteredDialog() {
    await this.alert.fire({
      title: 'Centered Content',
      message: 'This dialog has centered content and buttons.',
      type: 'question',
      layout: 'modern',
      iconPosition: 'center',
      contentAlignment: 'center',
      showCancelButton: true,
      animation: 'zoom',
    });
  }

  /* ======================================================
   * 8. DRAGGABLE DIALOGS
   * ====================================================== */

  async showDraggableDialog() {
    await this.alert.fire({
      title: 'Draggable Dialog',
      message: 'You can drag this dialog by clicking and holding the title bar!',
      type: 'info',
      draggable: true,
      width: '450px',
      showCancelButton: true,
      buttons: {
        confirm: { text: 'Got it!' },
        cancel: { text: 'Close' },
      },
    });
  }

  async showDraggableWithCustomHandle() {
    await this.alert.fire({
      title: 'Custom Drag Handle',
      html: `
        <div style="text-align: left;">
          <div style="background: #f0f0f0; padding: 8px; margin: 8px 0; border-radius: 4px; cursor: move;" class="custom-drag-handle">
            <strong>🔄 Drag Handle</strong> - Click here to drag
          </div>
          <p>This dialog uses a custom drag handle instead of the title.</p>
        </div>
      `,
      type: 'question',
      draggable: true,
      dragHandle: '.custom-drag-handle',
      width: '500px',
      showCancelButton: true,
    });
  }

  /* ======================================================
   * 9. LAYOUT VARIATIONS
   * ====================================================== */

  async showDefaultLayout() {
    await this.alert.fire({
      title: 'Default Layout',
      message: 'This is the default layout with standard styling.',
      type: 'info',
      layout: 'default',
      showCancelButton: true,
      animation: 'fade',
    });
  }

  async showModernLayoutLeft() {
    await this.alert.fire({
      title: 'Modern Layout - Left Aligned',
      message: 'Icon on the left, content aligned to the left.',
      type: 'success',
      layout: 'modern',
      iconPosition: 'left',
      contentAlignment: 'left',
      showCloseButton: true,
      showCancelButton: true,
      animation: 'slide',
    });
  }

  async showModernLayoutCenter() {
    await this.alert.fire({
      title: 'Modern Layout - Centered',
      message: 'Everything is centered for a balanced look.',
      type: 'question',
      layout: 'modern',
      iconPosition: 'center',
      contentAlignment: 'center',
      showCloseButton: true,
      showCancelButton: true,
      animation: 'zoom',
    });
  }

  async showModernLayoutRight() {
    await this.alert.fire({
      title: 'Modern Layout - Right Aligned',
      message: 'Content aligned to the right for RTL languages.',
      type: 'warning',
      layout: 'modern',
      iconPosition: 'left',
      contentAlignment: 'right',
      showCloseButton: true,
      showCancelButton: true,
      animation: 'bounce',
    });
  }

  /* ======================================================
   * 10. ANIMATION EXAMPLES
   * ====================================================== */

  async showFadeAnimation() {
    await this.alert.fire({
      title: 'Fade Animation',
      message: 'Smooth fade in/out effect.',
      type: 'info',
      animation: 'fade',
      timer: 3000,
      timerProgressBar: true,
    });
  }

  async showSlideAnimation() {
    await this.alert.fire({
      title: 'Slide Animation',
      message: 'Slides in from the top.',
      type: 'success',
      animation: 'slide',
      timer: 3000,
      timerProgressBar: true,
    });
  }

  async showBounceAnimation() {
    await this.alert.fire({
      title: 'Bounce Animation',
      message: 'Bouncy entrance effect.',
      type: 'warning',
      animation: 'bounce',
      timer: 3000,
      timerProgressBar: true,
    });
  }

  async showZoomAnimation() {
    await this.alert.fire({
      title: 'Zoom Animation',
      message: 'Zooms in from center.',
      type: 'error',
      animation: 'zoom',
      timer: 3000,
      timerProgressBar: true,
    });
  }

  /* ======================================================
   * 11. BUTTON VARIATIONS
   * ====================================================== */

  async showButtonVariants() {
    await this.alert.fire({
      title: 'Button Variants',
      message: 'Different button styles and variants.',
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      showDenyButton: true,
      buttons: {
        confirm: { text: 'Primary', variant: 'primary', style: 'elevated' },
        cancel: { text: 'Secondary', variant: 'secondary', style: 'outlined' },
        deny: { text: 'Danger', variant: 'danger' },
      },
    });
  }

  async showButtonIcons() {
    await this.alert.fire({
      title: 'Buttons with Icons',
      message: 'Buttons can have custom icons.',
      type: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      showDenyButton: true,
      buttons: {
        confirm: { text: 'Save', icon: 'save', variant: 'success' },
        cancel: { text: 'Cancel', icon: 'close', variant: 'secondary' },
        deny: { text: 'Delete', icon: 'delete', variant: 'danger' },
      },
    });
  }

  async showVerticalButtons() {
    await this.alert.fire({
      title: 'Vertical Button Layout',
      message: 'Buttons can be arranged vertically for mobile-friendly design.',
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      showDenyButton: true,
      verticalButtons: true,
      fullWidthButtons: true,
      buttons: {
        confirm: { text: 'Confirm Action' },
        cancel: { text: 'Maybe Later' },
        deny: { text: 'Never' },
      },
      width: '350px',
    });
  }

  /* ======================================================
   * 12. TIMER AND PROGRESS EXAMPLES
   * ====================================================== */

  async showTimerWithProgress() {
    await this.alert.fire({
      title: 'Auto-close Timer',
      message: 'This dialog will close automatically in 5 seconds.',
      type: 'info',
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      animation: 'slide',
    });
  }

  async showTimerWithButton() {
    await this.alert.fire({
      title: 'Timer with Action',
      message: 'Auto-close in 8 seconds, or click to proceed now.',
      type: 'success',
      timer: 8000,
      timerProgressBar: true,
      showConfirmButton: true,
      buttons: {
        confirm: { text: 'Proceed Now' },
      },
      animation: 'fade',
    });
  }

  /* ======================================================
   * 13. POSITIONING EXAMPLES
   * ====================================================== */

  async showTopPosition() {
    await this.alert.fire({
      title: 'Top Position',
      message: 'Dialog positioned at the top.',
      type: 'info',
      position: 'top',
      timer: 3000,
    });
  }

  async showBottomPosition() {
    await this.alert.fire({
      title: 'Bottom Position',
      message: 'Dialog positioned at the bottom.',
      type: 'success',
      position: 'bottom',
      timer: 3000,
    });
  }

  async showTopStartPosition() {
    await this.alert.fire({
      title: 'Top-Left Position',
      message: 'Dialog positioned at top-left corner.',
      type: 'warning',
      position: 'top-start',
      timer: 3000,
    });
  }

  async showBottomEndPosition() {
    await this.alert.fire({
      title: 'Bottom-Right Position',
      message: 'Dialog positioned at bottom-right corner.',
      type: 'error',
      position: 'bottom-end',
      timer: 3000,
    });
  }

  /* ======================================================
   * 14. MULTI STEP PROCESS
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

  /* ======================================================
   * 15. Z-INDEX TESTING (Dialog + Alert)
   * ====================================================== */

  async showZIndexTest() {
    // Primero abrir un dialog normal (simulado con alert)
    const dialogPromise = this.alert.fire({
      title: 'Background Dialog',
      message: 'This dialog should stay in the background. Click "Open Alert" to test z-index.',
      type: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      buttons: {
        confirm: { text: 'Open Alert' },
        cancel: { text: 'Close' },
      },
      width: '500px',
      position: 'center-start',
      disableClose: true,
    });

    const result = await dialogPromise;

    if (result.isConfirmed) {
      // Abrir alert que debería aparecer encima
      await this.alert.fire({
        title: 'Alert on Top',
        message: 'This alert should appear ON TOP of the previous dialog with correct z-index!',
        type: 'success',
        showConfirmButton: true,
        buttons: {
          confirm: { text: 'Perfect!' },
        },
        width: '450px',
        position: 'center-end',
        animation: 'bounce',
      });
    }
  }

  /* ======================================================
   * 16. MULTIPLE ALERTS TESTING
   * ====================================================== */

  async showSingleAlertMode() {
    // Modo por defecto: solo un alert a la vez
    await this.alert.fire({
      title: 'Single Alert Mode (Default)',
      message: 'This is the default behavior. Opening another alert will close this one.',
      type: 'info',
      showConfirmButton: true,
      buttons: {
        confirm: { text: 'Open Another' },
      },
      allowMultiple: false, // Explícitamente false (aunque es el default)
    });

    // Este alert cerrará el anterior
    await this.alert.fire({
      title: 'Second Alert',
      message: 'The previous alert was automatically closed!',
      type: 'success',
      timer: 3000,
      timerProgressBar: true,
    });
  }

  async showMultipleAlertsMode() {
    // Permitir múltiples alerts
    this.alert.fire({
      title: 'Multiple Alerts Enabled',
      message: 'This alert allows multiple instances. Click the buttons below to open more!',
      type: 'info',
      allowMultiple: true,
      position: 'top-start',
      width: '400px',
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
    });

    // Esperar un poco y abrir otro
    setTimeout(() => {
      this.alert.fire({
        title: 'Second Alert',
        message: 'Both alerts are open simultaneously!',
        type: 'success',
        allowMultiple: true,
        position: 'top-end',
        width: '400px',
        showConfirmButton: false,
        timer: 8000,
        timerProgressBar: true,
      });
    }, 1000);

    // Y otro más
    setTimeout(() => {
      this.alert.fire({
        title: 'Third Alert',
        message: 'Now we have three alerts open at the same time!',
        type: 'warning',
        allowMultiple: true,
        position: 'bottom-start',
        width: '400px',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      });
    }, 2000);
  }

  async showMixedMode() {
    // Primero abrir con allowMultiple: true
    this.alert.fire({
      title: 'Multiple Mode Alert',
      message: 'This alert allows multiple instances.',
      type: 'info',
      allowMultiple: true,
      position: 'center-start',
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
    });

    setTimeout(() => {
      this.alert.fire({
        title: 'Another Multiple Alert',
        message: 'This is the second alert with multiple mode.',
        type: 'success',
        allowMultiple: true,
        position: 'center-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      });
    }, 1000);

    // Después abrir uno con allowMultiple: false (cerrará los anteriores)
    setTimeout(() => {
      this.alert.fire({
        title: 'Single Mode Alert',
        message: 'This alert will close all previous alerts because allowMultiple is false!',
        type: 'warning',
        allowMultiple: false, // Esto cerrará todos los alerts anteriores
        position: 'center',
        showConfirmButton: true,
        buttons: {
          confirm: { text: 'Got it!' },
        },
      });
    }, 3000);
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
