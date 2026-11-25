import {
  ChangeDetectorRef,
  ElementRef,
  Injector,
  type Signal,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { MatFormField, type MatFormFieldDefaultOptions } from '@angular/material/form-field';
import type { AcpFieldAppearance } from './layout.config';

/**
 * `MAT_FORM_FIELD_DEFAULT_OPTIONS` whose appearance follows `appearance` live. Material reads the
 * default once, while creating each field; this also keeps the existing fields in sync. A field
 * with an `appearance` attribute, or whose bound `[appearance]` differs from the option, keeps
 * its own value.
 *
 * @example
 * { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useFactory: () => acpFieldDefaults(appearance) }
 */
export function acpFieldDefaults(
  appearance: Signal<AcpFieldAppearance>,
  options: Omit<MatFormFieldDefaultOptions, 'appearance'> = {},
): MatFormFieldDefaultOptions {
  return {
    ...options,
    get appearance() {
      const value = untracked(appearance);
      syncField(appearance, value);
      return value;
    },
  };
}

// Runs inside the MatFormField constructor, whose injector gives its host and, once created, the
// field itself.
function syncField(appearance: Signal<AcpFieldAppearance>, initial: AcpFieldAppearance): void {
  let injector: Injector;
  try {
    injector = inject(Injector);
  } catch {
    return;
  }
  const host = injector.get(ElementRef, null)?.nativeElement as HTMLElement | undefined;
  if (!host || host.hasAttribute('appearance')) return;

  let applied = initial;
  effect(
    () => {
      const next = appearance();
      const field = injector.get(MatFormField);
      // A different value comes from an `[appearance]` binding: leave it.
      if (untracked(() => field.appearance) !== applied || next === applied) return;
      applied = next;
      field.appearance = next;
      injector.get(ChangeDetectorRef).markForCheck();
    },
    { injector },
  );
}
