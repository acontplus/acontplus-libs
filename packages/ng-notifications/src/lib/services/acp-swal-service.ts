import { Injectable, InjectionToken, inject } from '@angular/core';
import Swal, {
  type SweetAlertIcon,
  type SweetAlertOptions,
  type SweetAlertResult,
} from 'sweetalert2';
import { ThemeDetector } from './theme-detector';

/** Same colors as `acp-button`; `danger` is an alias of `error`. */
export type AcpSwalButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'error'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';
export type AcpSwalButtonAppearance = 'filled' | 'tonal' | 'outlined' | 'elevated' | 'text';
export type AcpSwalButtonSize = 'small' | 'medium' | 'large';

export interface AcpSwalButton {
  text?: string;
  color?: AcpSwalButtonColor;
  appearance?: AcpSwalButtonAppearance;
  size?: AcpSwalButtonSize;
  square?: boolean;
}

/** Setting `cancel` or `deny` shows that button. */
export interface AcpSwalButtons {
  confirm?: AcpSwalButton;
  cancel?: AcpSwalButton;
  deny?: AcpSwalButton;
}

export type AcpSwalOptions = SweetAlertOptions & { buttons?: AcpSwalButtons };

export interface AcpSwalMessage {
  title?: string;
  text?: string;
  /** Escape user text with `acpEscapeHtml` before interpolating it. */
  html?: string;
  buttons?: AcpSwalButtons;
}

export interface AcpSwalConfirm extends AcpSwalMessage {
  icon?: Extract<SweetAlertIcon, 'warning' | 'question' | 'info'>;
  /** Red confirm button and focus on cancel. */
  danger?: boolean;
}

export interface AcpSwalToast {
  title?: string;
  icon?: SweetAlertIcon;
  position?: SweetAlertOptions['position'];
  timer?: number;
}

/** Default text and style of each button; Spanish by default. */
export const ACP_SWAL_BUTTONS = new InjectionToken<Required<AcpSwalButtons>>('ACP_SWAL_BUTTONS', {
  factory: () => ({
    confirm: { text: 'Aceptar', color: 'primary', appearance: 'filled' },
    cancel: { text: 'Cancelar', color: 'dark', appearance: 'text' },
    deny: { text: 'No', color: 'error', appearance: 'tonal' },
  }),
});

/** Text of the `confirm()` button. */
export const ACP_SWAL_CONFIRM_TEXT = new InjectionToken<string>('ACP_SWAL_CONFIRM_TEXT', {
  factory: () => 'Confirmar',
});

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escapes user text before interpolating it in the `html` option. */
export const acpEscapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

const buttonClass = ({
  color = 'primary',
  appearance = 'filled',
  size = 'large',
  square,
}: AcpSwalButton): string =>
  [
    'acp-swal-btn',
    `acp-swal-btn--${appearance}`,
    `acp-swal-btn--${size}`,
    `acp-swal-c-${color === 'danger' ? 'error' : color}`,
    square ? 'acp-swal-btn--square' : '',
  ]
    .filter(Boolean)
    .join(' ');

const joinClass = (...values: (string | readonly string[] | undefined)[]): string =>
  values.flat().filter(Boolean).join(' ');

/**
 * SweetAlert2 with `acp-button` styled buttons (Material 3) and the light/dark theme of the app
 * (`theme-dark` on `<html>`). Needs the `@acontplus/ng-notifications` styles and the SweetAlert2
 * CSS.
 */
@Injectable({ providedIn: 'root' })
export class AcpSwalService {
  readonly #theme = inject(ThemeDetector);
  readonly #buttons = inject(ACP_SWAL_BUTTONS);
  readonly #confirmText = inject(ACP_SWAL_CONFIRM_TEXT);

  fire({ buttons = {}, customClass = {}, ...options }: AcpSwalOptions): Promise<SweetAlertResult> {
    const [confirm, cancel, deny] = (['confirm', 'cancel', 'deny'] as const).map((key) => ({
      ...this.#buttons[key],
      ...buttons[key],
    }));

    return Swal.fire({
      theme: this.#theme.getCurrentTheme().endsWith('dark') ? 'dark' : 'light',
      showCancelButton: !!buttons.cancel,
      showDenyButton: !!buttons.deny,
      confirmButtonText: confirm.text,
      cancelButtonText: cancel.text,
      denyButtonText: deny.text,
      ...options,
      buttonsStyling: false,
      customClass: {
        ...customClass,
        actions: joinClass('acp-swal-actions', customClass.actions),
        confirmButton: joinClass(buttonClass(confirm), customClass.confirmButton),
        cancelButton: joinClass(buttonClass(cancel), customClass.cancelButton),
        denyButton: joinClass(buttonClass(deny), customClass.denyButton),
      },
    });
  }

  /**
   * Confirmation with confirm and cancel buttons, always: a confirmation needs a way to decline.
   * Resolves `true` when the user confirms.
   */
  async confirm({ danger, buttons, ...options }: AcpSwalConfirm): Promise<boolean> {
    const { isConfirmed } = await this.fire({
      icon: 'question',
      focusCancel: !!danger,
      ...options,
      buttons: {
        ...buttons,
        confirm: {
          text: this.#confirmText,
          ...(danger && { color: 'error' }),
          ...buttons?.confirm,
        },
        // Always shown (see above); `buttons.cancel` only restyles it.
        cancel: { ...buttons?.cancel },
      },
    });
    return isConfirmed;
  }

  success({ timer = 2000, ...options }: AcpSwalMessage & { timer?: number }) {
    return this.fire({ icon: 'success', showConfirmButton: false, timer, ...options });
  }

  error(options: AcpSwalMessage) {
    return this.fire({ icon: 'error', ...options });
  }

  warning(options: AcpSwalMessage) {
    return this.fire({ icon: 'warning', ...options });
  }

  info(options: AcpSwalMessage) {
    return this.fire({ icon: 'info', ...options });
  }

  toast({ icon = 'success', position = 'top-end', timer = 3000, title }: AcpSwalToast) {
    return this.fire({
      toast: true,
      icon,
      position,
      title,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
}
