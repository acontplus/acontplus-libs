import { b, d as y, e as T } from './chunk-ZFNBSQKI.js';
import { r as E } from './chunk-H5QXEMOA.js';
import './chunk-7JP3HI6F.js';
import './chunk-57Q2UAVZ.js';
import { c as B, d as S, e as k, f as A, h as M, j as P } from './chunk-U7VJQUDE.js';
import { d as x, g as D } from './chunk-XJJY6XHD.js';
import {
  $b as n,
  Kb as o,
  Pa as c,
  ab as u,
  bc as p,
  dd as h,
  f as r,
  ia as f,
  tb as w,
  vb as _,
  wb as C,
  xb as d,
  yb as t,
  zb as e,
} from './chunk-GV4MRAZ3.js';
function L(m, l) {
  if ((m & 1 && (t(0, 'mat-list-option', 2), n(1), e()), m & 2)) {
    let s = l.$implicit;
    (d('value', s), c(), p(' ', s, ' '));
  }
}
var v = class m {
    alert = f(E);
    showSuccess() {
      return r(this, null, function* () {
        yield this.alert.success({
          title: 'Success!',
          message: 'Your operation was completed successfully!',
          confirmText: 'Great!',
          timer: 3e3,
          timerProgressBar: !0,
        });
      });
    }
    showError() {
      return r(this, null, function* () {
        yield this.alert.error({
          title: 'Error!',
          message: 'Something went wrong. Please try again.',
          confirmText: 'OK',
          width: '450px',
        });
      });
    }
    showInfo() {
      return r(this, null, function* () {
        yield this.alert.info({
          title: 'Information',
          message: 'This is an informational message.',
          confirmText: 'Got it!',
          showCancelButton: !0,
          cancelText: 'Not now',
        });
      });
    }
    showConfirm() {
      return r(this, null, function* () {
        (yield this.alert.confirm({
          title: 'Are you sure?',
          message: 'This action cannot be undone.',
          confirmText: 'Yes, delete it!',
          cancelText: 'No, cancel',
          confirmButtonVariant: 'danger',
        })).isConfirmed && (yield this.alert.success('Item deleted successfully!'));
      });
    }
    showDenyConfirm() {
      return r(this, null, function* () {
        let l = yield this.alert.fire({
          title: 'Save changes?',
          message: 'Do you want to save your changes?',
          showConfirmButton: !0,
          showDenyButton: !0,
          showCancelButton: !0,
          confirmText: 'Save',
          denyText: 'Discard',
          cancelText: 'Cancel',
        });
        l.isConfirmed
          ? yield this.alert.success('Changes saved!')
          : l.isDenied && (yield this.alert.info('Changes discarded'));
      });
    }
    showTextPrompt() {
      return r(this, null, function* () {
        let l = yield this.alert.prompt({
          title: 'Enter your name',
          message: 'Please enter your full name',
          input: 'text',
          inputLabel: 'Full Name',
          inputPlaceholder: 'John Doe',
          showCancelButton: !0,
          inputValidator: (s) =>
            s ? (s.length < 3 ? 'Minimum 3 characters' : null) : 'Name is required',
        });
        l.isConfirmed && (yield this.alert.success(`Hello, ${l.value}!`));
      });
    }
    showEmailPrompt() {
      return r(this, null, function* () {
        yield this.alert.prompt({
          title: 'Subscribe to newsletter',
          message: 'Enter your email address',
          input: 'email',
          inputPlaceholder: 'email@example.com',
          showCancelButton: !0,
          inputValidator: (l) =>
            l
              ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)
                ? null
                : 'Invalid email format'
              : 'Email is required',
        });
      });
    }
    showHtmlContent() {
      return r(this, null, function* () {
        yield this.alert.fire({
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
      });
    }
    showImageDialog() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Profile Updated',
          message: 'Your profile picture has been updated',
          imageUrl: 'https://via.placeholder.com/150',
          imageWidth: '150px',
          imageHeight: '150px',
          imageAlt: 'User avatar',
        });
      });
    }
    showSuccessToast() {
      this.alert.toast({
        title: 'Success!',
        message: 'Your changes have been saved',
        type: 'success',
        position: 'top-end',
        timer: 3e3,
        showConfirmButton: !1,
      });
    }
    showErrorToast() {
      this.alert.toast({
        title: 'Error!',
        message: 'Failed to save changes',
        type: 'error',
        position: 'top-end',
        timer: 5e3,
        showConfirmButton: !0,
      });
    }
    showCustomComponent() {
      return r(this, null, function* () {
        let l = null,
          s = yield this.alert.fire({
            title: 'Custom Component',
            message: 'This dialog contains a custom component',
            component: g,
            componentProps: {
              data: {
                name: 'John',
                items: ['Item 1', 'Item 2', 'Item 3'],
                onSelect: (i) => (l = i),
              },
            },
            showCancelButton: !0,
            confirmText: 'Submit',
            width: '600px',
            preConfirm: () => l || 'Please select an item',
          });
        s.isConfirmed && (yield this.alert.success(`You selected: ${s.value}`));
      });
    }
    showGlobalDefaultsExample() {
      return r(this, null, function* () {
        (this.alert.setDefaults({
          confirmButtonColor: '#8b5cf6',
          width: '450px',
          reverseButtons: !0,
        }),
          yield this.alert.success({
            title: 'Global Configuration',
            message: 'This dialog uses global configuration',
          }),
          this.alert.resetDefaults());
      });
    }
    showModernLayout() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Modern Layout',
          message:
            'This dialog uses the modern layout with icon on the left and close button on the right.',
          type: 'info',
          layout: 'modern',
          iconPosition: 'left',
          contentAlignment: 'left',
          showCloseButton: !0,
          animation: 'slide',
          width: '500px',
          showCancelButton: !0,
        });
      });
    }
    showDeleteDialog() {
      return r(this, null, function* () {
        (yield this.alert.delete({
          title: 'Delete Account',
          message: 'This action cannot be undone. All your data will be permanently removed.',
          confirmText: 'Delete Forever',
          cancelText: 'Keep Account',
          layout: 'modern',
          animation: 'bounce',
        })).isConfirmed && (yield this.alert.success('Account deleted successfully'));
      });
    }
    showCenteredDialog() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Centered Content',
          message: 'This dialog has centered content and buttons.',
          type: 'question',
          layout: 'modern',
          iconPosition: 'center',
          contentAlignment: 'center',
          showCancelButton: !0,
          animation: 'zoom',
        });
      });
    }
    showToastSuccess() {
      this.alert.fire({
        title: 'Profile updated successfully',
        type: 'success',
        position: 'top-end',
        timer: 4e3,
        progressBar: !0,
        showCloseButton: !0,
        animation: 'slide',
      });
    }
    showToastError() {
      this.alert.fire({
        title: 'Connection failed',
        message: 'Please check your internet connection and try again.',
        type: 'error',
        position: 'top-end',
        timer: 5e3,
        progressBar: !0,
        showCloseButton: !0,
      });
    }
    showToastInfo() {
      this.alert.fire({
        title: 'New update available',
        message: 'Version 2.1.0 is now available for download.',
        type: 'info',
        position: 'bottom-start',
        timer: 6e3,
        progressBar: !0,
        showCloseButton: !0,
        showConfirmButton: !0,
        confirmText: 'Update Now',
      });
    }
    showToastWarning() {
      this.alert.fire({
        title: 'Storage almost full',
        message: 'You have used 90% of your storage space.',
        type: 'warning',
        position: 'top-start',
        timer: 7e3,
        progressBar: !0,
        showCloseButton: !0,
      });
    }
    showToastDelete() {
      this.alert.fire({
        title: 'File deleted',
        message: 'document.pdf has been moved to trash.',
        type: 'delete',
        position: 'bottom-start',
        timer: 5e3,
        progressBar: !0,
        showCloseButton: !0,
        showConfirmButton: !0,
        confirmText: 'Undo',
      });
    }
    showDraggableDialog() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Draggable Dialog',
          message: 'You can drag this dialog by clicking and holding the title bar!',
          type: 'info',
          draggable: !0,
          width: '450px',
          showCancelButton: !0,
          confirmText: 'Got it!',
          cancelText: 'Close',
        });
      });
    }
    showDraggableWithCustomHandle() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Custom Drag Handle',
          html: `
        <div style="text-align: left;">
          <div style="background: #f0f0f0; padding: 8px; margin: 8px 0; border-radius: 4px; cursor: move;" class="custom-drag-handle">
            <strong>\u{1F504} Drag Handle</strong> - Click here to drag
          </div>
          <p>This dialog uses a custom drag handle instead of the title.</p>
        </div>
      `,
          type: 'question',
          draggable: !0,
          dragHandle: '.custom-drag-handle',
          width: '500px',
          showCancelButton: !0,
        });
      });
    }
    showDefaultLayout() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Default Layout',
          message: 'This is the default layout with standard styling.',
          type: 'info',
          layout: 'default',
          showCancelButton: !0,
          animation: 'fade',
        });
      });
    }
    showModernLayoutLeft() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Modern Layout - Left Aligned',
          message: 'Icon on the left, content aligned to the left.',
          type: 'success',
          layout: 'modern',
          iconPosition: 'left',
          contentAlignment: 'left',
          showCloseButton: !0,
          showCancelButton: !0,
          animation: 'slide',
        });
      });
    }
    showModernLayoutCenter() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Modern Layout - Centered',
          message: 'Everything is centered for a balanced look.',
          type: 'question',
          layout: 'modern',
          iconPosition: 'center',
          contentAlignment: 'center',
          showCloseButton: !0,
          showCancelButton: !0,
          animation: 'zoom',
        });
      });
    }
    showModernLayoutRight() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Modern Layout - Right Aligned',
          message: 'Content aligned to the right for RTL languages.',
          type: 'warning',
          layout: 'modern',
          iconPosition: 'left',
          contentAlignment: 'right',
          showCloseButton: !0,
          showCancelButton: !0,
          animation: 'bounce',
        });
      });
    }
    showFadeAnimation() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Fade Animation',
          message: 'Smooth fade in/out effect.',
          type: 'info',
          animation: 'fade',
          timer: 3e3,
          timerProgressBar: !0,
        });
      });
    }
    showSlideAnimation() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Slide Animation',
          message: 'Slides in from the top.',
          type: 'success',
          animation: 'slide',
          timer: 3e3,
          timerProgressBar: !0,
        });
      });
    }
    showBounceAnimation() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Bounce Animation',
          message: 'Bouncy entrance effect.',
          type: 'warning',
          animation: 'bounce',
          timer: 3e3,
          timerProgressBar: !0,
        });
      });
    }
    showZoomAnimation() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Zoom Animation',
          message: 'Zooms in from center.',
          type: 'error',
          animation: 'zoom',
          timer: 3e3,
          timerProgressBar: !0,
        });
      });
    }
    showButtonVariants() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Button Variants',
          message: 'Different button styles and variants.',
          type: 'question',
          showConfirmButton: !0,
          showCancelButton: !0,
          showDenyButton: !0,
          confirmText: 'Primary',
          cancelText: 'Secondary',
          denyText: 'Danger',
          confirmButtonVariant: 'primary',
          cancelButtonVariant: 'secondary',
          denyButtonVariant: 'danger',
          confirmButtonStyle: 'elevated',
          cancelButtonStyle: 'outlined',
        });
      });
    }
    showButtonIcons() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Buttons with Icons',
          message: 'Buttons can have custom icons.',
          type: 'info',
          showConfirmButton: !0,
          showCancelButton: !0,
          showDenyButton: !0,
          confirmText: 'Save',
          cancelText: 'Cancel',
          denyText: 'Delete',
          confirmButtonIcon: 'save',
          cancelButtonIcon: 'close',
          denyButtonIcon: 'delete',
          confirmButtonVariant: 'success',
          cancelButtonVariant: 'secondary',
          denyButtonVariant: 'danger',
        });
      });
    }
    showVerticalButtons() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Vertical Button Layout',
          message: 'Buttons can be arranged vertically for mobile-friendly design.',
          type: 'question',
          showConfirmButton: !0,
          showCancelButton: !0,
          showDenyButton: !0,
          verticalButtons: !0,
          fullWidthButtons: !0,
          confirmText: 'Confirm Action',
          cancelText: 'Maybe Later',
          denyText: 'Never',
          width: '350px',
        });
      });
    }
    showTimerWithProgress() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Auto-close Timer',
          message: 'This dialog will close automatically in 5 seconds.',
          type: 'info',
          timer: 5e3,
          timerProgressBar: !0,
          showConfirmButton: !1,
          animation: 'slide',
        });
      });
    }
    showTimerWithButton() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Timer with Action',
          message: 'Auto-close in 8 seconds, or click to proceed now.',
          type: 'success',
          timer: 8e3,
          timerProgressBar: !0,
          showConfirmButton: !0,
          confirmText: 'Proceed Now',
          animation: 'fade',
        });
      });
    }
    showTopPosition() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Top Position',
          message: 'Dialog positioned at the top.',
          type: 'info',
          position: 'top',
          timer: 3e3,
        });
      });
    }
    showBottomPosition() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Bottom Position',
          message: 'Dialog positioned at the bottom.',
          type: 'success',
          position: 'bottom',
          timer: 3e3,
        });
      });
    }
    showTopStartPosition() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Top-Left Position',
          message: 'Dialog positioned at top-left corner.',
          type: 'warning',
          position: 'top-start',
          timer: 3e3,
        });
      });
    }
    showBottomEndPosition() {
      return r(this, null, function* () {
        yield this.alert.fire({
          title: 'Bottom-Right Position',
          message: 'Dialog positioned at bottom-right corner.',
          type: 'error',
          position: 'bottom-end',
          timer: 3e3,
        });
      });
    }
    showMultiStepProcess() {
      return r(this, null, function* () {
        let l = [
          { title: 'Step 1', message: 'Validating data...', duration: 1e3 },
          { title: 'Step 2', message: 'Processing information...', duration: 1500 },
          { title: 'Step 3', message: 'Finalizing...', duration: 1e3 },
        ];
        for (let s of l)
          yield this.alert.fire({
            title: s.title,
            message: s.message,
            type: 'info',
            timer: s.duration,
            timerProgressBar: !0,
            showConfirmButton: !1,
            disableClose: !0,
          });
        yield this.alert.success({
          title: 'Completed!',
          message: 'All steps completed successfully',
          timer: 2e3,
        });
      });
    }
    showZIndexTest() {
      return r(this, null, function* () {
        (yield this.alert.fire({
          title: 'Background Dialog',
          message: 'This dialog should stay in the background. Click "Open Alert" to test z-index.',
          type: 'info',
          showConfirmButton: !0,
          showCancelButton: !0,
          confirmText: 'Open Alert',
          cancelText: 'Close',
          width: '500px',
          position: 'center-start',
          disableClose: !0,
        })).isConfirmed &&
          (yield this.alert.fire({
            title: 'Alert on Top',
            message: 'This alert should appear ON TOP of the previous dialog with correct z-index!',
            type: 'success',
            showConfirmButton: !0,
            confirmText: 'Perfect!',
            width: '450px',
            position: 'center-end',
            animation: 'bounce',
          }));
      });
    }
    showSingleAlertMode() {
      return r(this, null, function* () {
        (yield this.alert.fire({
          title: 'Single Alert Mode (Default)',
          message: 'This is the default behavior. Opening another alert will close this one.',
          type: 'info',
          showConfirmButton: !0,
          confirmText: 'Open Another',
          allowMultiple: !1,
        }),
          yield this.alert.fire({
            title: 'Second Alert',
            message: 'The previous alert was automatically closed!',
            type: 'success',
            timer: 3e3,
            timerProgressBar: !0,
          }));
      });
    }
    showMultipleAlertsMode() {
      return r(this, null, function* () {
        (this.alert.fire({
          title: 'Multiple Alerts Enabled',
          message: 'This alert allows multiple instances. Click the buttons below to open more!',
          type: 'info',
          allowMultiple: !0,
          position: 'top-start',
          width: '400px',
          showConfirmButton: !1,
          timer: 1e4,
          timerProgressBar: !0,
        }),
          setTimeout(() => {
            this.alert.fire({
              title: 'Second Alert',
              message: 'Both alerts are open simultaneously!',
              type: 'success',
              allowMultiple: !0,
              position: 'top-end',
              width: '400px',
              showConfirmButton: !1,
              timer: 8e3,
              timerProgressBar: !0,
            });
          }, 1e3),
          setTimeout(() => {
            this.alert.fire({
              title: 'Third Alert',
              message: 'Now we have three alerts open at the same time!',
              type: 'warning',
              allowMultiple: !0,
              position: 'bottom-start',
              width: '400px',
              showConfirmButton: !1,
              timer: 6e3,
              timerProgressBar: !0,
            });
          }, 2e3));
      });
    }
    showMixedMode() {
      return r(this, null, function* () {
        (this.alert.fire({
          title: 'Multiple Mode Alert',
          message: 'This alert allows multiple instances.',
          type: 'info',
          allowMultiple: !0,
          position: 'center-start',
          showConfirmButton: !1,
          timer: 8e3,
          timerProgressBar: !0,
        }),
          setTimeout(() => {
            this.alert.fire({
              title: 'Another Multiple Alert',
              message: 'This is the second alert with multiple mode.',
              type: 'success',
              allowMultiple: !0,
              position: 'center-end',
              showConfirmButton: !1,
              timer: 6e3,
              timerProgressBar: !0,
            });
          }, 1e3),
          setTimeout(() => {
            this.alert.fire({
              title: 'Single Mode Alert',
              message: 'This alert will close all previous alerts because allowMultiple is false!',
              type: 'warning',
              allowMultiple: !1,
              position: 'center',
              showConfirmButton: !0,
              confirmText: 'Got it!',
            });
          }, 3e3));
      });
    }
    static ɵfac = function (s) {
      return new (s || m)();
    };
    static ɵcmp = u({
      type: m,
      selectors: [['app-alert-dialog']],
      decls: 124,
      vars: 0,
      consts: [
        [1, 'demo-container'],
        [1, 'demo-card'],
        [1, 'button-grid'],
        ['mat-raised-button', '', 'color', 'primary', 3, 'click'],
        ['mat-raised-button', '', 'color', 'warn', 3, 'click'],
        ['mat-raised-button', '', 'color', 'accent', 3, 'click'],
        ['mat-raised-button', '', 3, 'click'],
        ['mat-raised-button', '', 2, 'background', 'orange', 'color', 'white', 3, 'click'],
        ['mat-raised-button', '', 2, 'background', '#ef4444', 'color', 'white', 3, 'click'],
      ],
      template: function (s, i) {
        s & 1 &&
          (t(0, 'div', 0)(1, 'mat-card', 1)(2, 'mat-card-header')(3, 'mat-card-title'),
          n(4, '\u{1F3A8} Alert Dialog Demo'),
          e(),
          t(5, 'mat-card-subtitle'),
          n(6, 'Angular + Material Design'),
          e()(),
          t(7, 'mat-card-content')(8, 'h3'),
          n(9, '1. Basic Alerts'),
          e(),
          t(10, 'div', 2)(11, 'button', 3),
          o('click', function () {
            return i.showSuccess();
          }),
          n(12, 'Success Alert'),
          e(),
          t(13, 'button', 4),
          o('click', function () {
            return i.showError();
          }),
          n(14, 'Error Alert'),
          e(),
          t(15, 'button', 5),
          o('click', function () {
            return i.showInfo();
          }),
          n(16, 'Info Alert'),
          e()(),
          t(17, 'h3'),
          n(18, '2. Confirmation Dialogs'),
          e(),
          t(19, 'div', 2)(20, 'button', 4),
          o('click', function () {
            return i.showConfirm();
          }),
          n(21, 'Confirm Dialog'),
          e(),
          t(22, 'button', 5),
          o('click', function () {
            return i.showDenyConfirm();
          }),
          n(23, ' Save/Discard Dialog '),
          e()(),
          t(24, 'h3'),
          n(25, '3. Input Prompts'),
          e(),
          t(26, 'div', 2)(27, 'button', 6),
          o('click', function () {
            return i.showTextPrompt();
          }),
          n(28, 'Text Input'),
          e(),
          t(29, 'button', 6),
          o('click', function () {
            return i.showEmailPrompt();
          }),
          n(30, 'Email Input'),
          e()(),
          t(31, 'h3'),
          n(32, '4. Advanced Usage'),
          e(),
          t(33, 'div', 2)(34, 'button', 6),
          o('click', function () {
            return i.showHtmlContent();
          }),
          n(35, 'HTML Content'),
          e(),
          t(36, 'button', 6),
          o('click', function () {
            return i.showImageDialog();
          }),
          n(37, 'Image Dialog'),
          e(),
          t(38, 'button', 6),
          o('click', function () {
            return i.showCustomComponent();
          }),
          n(39, 'Custom Component'),
          e()(),
          t(40, 'h3'),
          n(41, '5. Toast Notifications'),
          e(),
          t(42, 'div', 2)(43, 'button', 3),
          o('click', function () {
            return i.showToastSuccess();
          }),
          n(44, ' Success Toast '),
          e(),
          t(45, 'button', 4),
          o('click', function () {
            return i.showToastError();
          }),
          n(46, 'Error Toast'),
          e(),
          t(47, 'button', 5),
          o('click', function () {
            return i.showToastInfo();
          }),
          n(48, 'Info Toast'),
          e(),
          t(49, 'button', 7),
          o('click', function () {
            return i.showToastWarning();
          }),
          n(50, ' Warning Toast '),
          e(),
          t(51, 'button', 8),
          o('click', function () {
            return i.showToastDelete();
          }),
          n(52, ' Delete Toast '),
          e()(),
          t(53, 'h3'),
          n(54, '6. Layout Variations'),
          e(),
          t(55, 'div', 2)(56, 'button', 6),
          o('click', function () {
            return i.showDefaultLayout();
          }),
          n(57, 'Default Layout'),
          e(),
          t(58, 'button', 6),
          o('click', function () {
            return i.showModernLayoutLeft();
          }),
          n(59, 'Modern Left'),
          e(),
          t(60, 'button', 6),
          o('click', function () {
            return i.showModernLayoutCenter();
          }),
          n(61, 'Modern Center'),
          e(),
          t(62, 'button', 6),
          o('click', function () {
            return i.showModernLayoutRight();
          }),
          n(63, 'Modern Right'),
          e()(),
          t(64, 'h3'),
          n(65, '7. Animation Examples'),
          e(),
          t(66, 'div', 2)(67, 'button', 6),
          o('click', function () {
            return i.showFadeAnimation();
          }),
          n(68, 'Fade'),
          e(),
          t(69, 'button', 6),
          o('click', function () {
            return i.showSlideAnimation();
          }),
          n(70, 'Slide'),
          e(),
          t(71, 'button', 6),
          o('click', function () {
            return i.showBounceAnimation();
          }),
          n(72, 'Bounce'),
          e(),
          t(73, 'button', 6),
          o('click', function () {
            return i.showZoomAnimation();
          }),
          n(74, 'Zoom'),
          e()(),
          t(75, 'h3'),
          n(76, '8. Button Variations'),
          e(),
          t(77, 'div', 2)(78, 'button', 6),
          o('click', function () {
            return i.showButtonVariants();
          }),
          n(79, 'Button Variants'),
          e(),
          t(80, 'button', 6),
          o('click', function () {
            return i.showButtonIcons();
          }),
          n(81, 'Buttons with Icons'),
          e(),
          t(82, 'button', 6),
          o('click', function () {
            return i.showVerticalButtons();
          }),
          n(83, 'Vertical Buttons'),
          e()(),
          t(84, 'h3'),
          n(85, '9. Timer and Progress'),
          e(),
          t(86, 'div', 2)(87, 'button', 6),
          o('click', function () {
            return i.showTimerWithProgress();
          }),
          n(88, 'Auto-close Timer'),
          e(),
          t(89, 'button', 6),
          o('click', function () {
            return i.showTimerWithButton();
          }),
          n(90, 'Timer with Action'),
          e()(),
          t(91, 'h3'),
          n(92, '10. Positioning'),
          e(),
          t(93, 'div', 2)(94, 'button', 6),
          o('click', function () {
            return i.showTopPosition();
          }),
          n(95, 'Top'),
          e(),
          t(96, 'button', 6),
          o('click', function () {
            return i.showBottomPosition();
          }),
          n(97, 'Bottom'),
          e(),
          t(98, 'button', 6),
          o('click', function () {
            return i.showTopStartPosition();
          }),
          n(99, 'Top-Left'),
          e(),
          t(100, 'button', 6),
          o('click', function () {
            return i.showBottomEndPosition();
          }),
          n(101, 'Bottom-Right'),
          e()(),
          t(102, 'h3'),
          n(103, '11. Advanced Examples'),
          e(),
          t(104, 'div', 2)(105, 'button', 6),
          o('click', function () {
            return i.showMultiStepProcess();
          }),
          n(106, 'Multi-step Process'),
          e(),
          t(107, 'button', 6),
          o('click', function () {
            return i.showDraggableDialog();
          }),
          n(108, 'Draggable Dialog'),
          e(),
          t(109, 'button', 6),
          o('click', function () {
            return i.showDraggableWithCustomHandle();
          }),
          n(110, ' Custom Drag Handle '),
          e(),
          t(111, 'button', 6),
          o('click', function () {
            return i.showGlobalDefaultsExample();
          }),
          n(112, 'Global Defaults'),
          e(),
          t(113, 'button', 5),
          o('click', function () {
            return i.showZIndexTest();
          }),
          n(114, 'Z-Index Test'),
          e()(),
          t(115, 'h3'),
          n(116, '12. Multiple Alerts Control'),
          e(),
          t(117, 'div', 2)(118, 'button', 3),
          o('click', function () {
            return i.showSingleAlertMode();
          }),
          n(119, ' Single Alert Mode (Default) '),
          e(),
          t(120, 'button', 5),
          o('click', function () {
            return i.showMultipleAlertsMode();
          }),
          n(121, ' Multiple Alerts Mode '),
          e(),
          t(122, 'button', 4),
          o('click', function () {
            return i.showMixedMode();
          }),
          n(123, 'Mixed Mode Demo'),
          e()()()()());
      },
      dependencies: [h, P, B, k, M, A, S, D, x],
      styles: [
        '.demo-container[_ngcontent-%COMP%]{padding:2rem;min-height:100vh;background:linear-gradient(135deg,#667eea,#764ba2)}.demo-card[_ngcontent-%COMP%]{max-width:1200px;margin:0 auto}.demo-card[_ngcontent-%COMP%]{max-width:100%;margin:0 auto;border-radius:8px;box-shadow:0 4px 20px #0000001a;overflow:hidden}.demo-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{background-color:#f5f5f5;padding:16px 24px;border-bottom:1px solid #e0e0e0}.demo-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:24px;font-weight:500;color:#3f51b5;margin:0}.demo-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%]{color:#666;margin-top:4px}.demo-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:24px}.button-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:32px}.button-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-height:44px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;transition:all .2s ease}.button-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 4px 8px #0000001a}.button-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:active{transform:translateY(0)}h3[_ngcontent-%COMP%]{margin:32px 0 16px;color:#3f51b5;font-weight:500;font-size:18px;padding-bottom:8px;border-bottom:2px solid #e0e0e0}@media(max-width:768px){.button-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.demo-container[_ngcontent-%COMP%]{padding:12px}.demo-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:16px}}  .custom-dialog-class{border-radius:12px;overflow:hidden}  .custom-panel-class{box-shadow:0 10px 30px #0003}  .custom-backdrop-class{background-color:#0009;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}  .swal2-toast{border-radius:8px!important;padding:12px 20px!important;font-size:14px!important;box-shadow:0 4px 12px #00000026!important}',
      ],
    });
  },
  g = class m {
    data;
    onSelection(l) {
      let s = l.options[0]?.value;
      s && this.data.onSelect(s);
    }
    static ɵfac = function (s) {
      return new (s || m)();
    };
    static ɵcmp = u({
      type: m,
      selectors: [['app-custom-dialog-content']],
      inputs: { data: 'data' },
      decls: 8,
      vars: 2,
      consts: [
        [1, 'p-4'],
        [3, 'selectionChange', 'multiple'],
        [3, 'value'],
      ],
      template: function (s, i) {
        (s & 1 &&
          (t(0, 'div', 0)(1, 'p'),
          n(2),
          e(),
          t(3, 'p'),
          n(4, 'Select an item:'),
          e(),
          t(5, 'mat-selection-list', 1),
          o('selectionChange', function (I) {
            return i.onSelection(I);
          }),
          _(6, L, 2, 2, 'mat-list-option', 2, w),
          e()()),
          s & 2 &&
            (c(2), p('Hello, ', i.data.name, '!'), c(3), d('multiple', !1), c(), C(i.data.items)));
      },
      dependencies: [h, T, y, b],
      encapsulation: 2,
    });
  };
export { v as AlertDialogComponent, g as CustomDialogContentComponent };
