import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  computed,
  provideEnvironmentInitializer,
} from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { acpFieldDefaults } from './field-defaults';
import { ACP_LAYOUT_CONFIG, type AcpLayoutConfig } from './layout.config';
import { AcpLayoutSettings } from './layout-settings';

/**
 * Configures `acp-layout`, `acp-customizer` and `AcpLayoutSettings`, and provides
 * `MAT_FORM_FIELD_DEFAULT_OPTIONS` with the `fieldAppearance` option. To use other form field
 * defaults, provide `MAT_FORM_FIELD_DEFAULT_OPTIONS` after `provideAcpLayout`.
 *
 * @example
 * provideAcpLayout({ branding: { name: 'AcontPlus' }, defaults: { themeColor: 'pink' } })
 */
export function provideAcpLayout(config: AcpLayoutConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ACP_LAYOUT_CONFIG, useValue: config },
    // Applies theme, color and direction on startup, also on pages outside acp-layout (login).
    provideEnvironmentInitializer(() => inject(AcpLayoutSettings)),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useFactory: () => {
        const settings = inject(AcpLayoutSettings);
        return acpFieldDefaults(computed(() => settings.options().fieldAppearance));
      },
    },
  ]);
}
