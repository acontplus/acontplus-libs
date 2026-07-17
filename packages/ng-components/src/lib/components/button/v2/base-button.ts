import { booleanAttribute, computed, input, output, Directive } from '@angular/core';

type AcpButtonVariant = 'basic' | 'icon' | 'fab' | 'mini-fab';
type AcpButtonAppearance = 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal';
type AcpButtonType = 'button' | 'submit' | 'reset';
type AcpButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'dark';

@Directive({
  host: {
    '[style.pointer-events]': 'pointerEvents()',
  },
})
export abstract class BaseButton {
  color = input<AcpButtonColor>('primary');
  square = input(false, { transform: booleanAttribute });
  icon = input<string>();
  suffixIcon = input<string>();
  loading = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  disableRipple = input(false, { transform: booleanAttribute });
  variant = input<AcpButtonVariant>('basic');
  appearance = input<AcpButtonAppearance>('filled');
  type = input<AcpButtonType>('button');
  extended = input(false, { transform: booleanAttribute });
  size = input<'small' | 'medium' | 'large'>('large');

  clicked = output<void>();
  focused = output<void>();
  blurred = output<void>();

  isDisabled = computed(() => this.disabled() || this.loading());
  pointerEvents = computed(() => (this.isDisabled() ? 'none' : 'auto'));
}
