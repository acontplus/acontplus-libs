import { Component, computed, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { IconRegistryService } from '../icon-registry.service';
import { DEFAULT_ICONS, FALLBACK_ICON } from '@acontplus/ui-kit';

@Component({
  selector: 'acp-svg-icon',
  imports: [],
  templateUrl: './svg-icon.html',
  styleUrl: './svg-icon.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SvgIcon {
  private readonly iconRegistry = inject(IconRegistryService);

  /**
   * Icon name from the registry
   */
  name = input.required<string>();

  /**
   * Icon size (applies to both width and height)
   */
  size = input<string>('24px');

  /**
   * Custom width (overrides size)
   */
  width = input<string | undefined>(undefined);

  /**
   * Custom height (overrides size)
   */
  height = input<string | undefined>(undefined);

  /**
   * Icon color (uses CSS currentColor by default)
   */
  color = input<string>('currentColor');

  /**
   * Show fallback icon instead of empty space when icon is not found
   */
  useFallback = input<boolean>(true);

  /**
   * Computed width value
   */
  protected computedWidth = computed(() => this.width() ?? this.size());

  /**
   * Computed height value
   */
  protected computedHeight = computed(() => this.height() ?? this.size());

  /**
   * Get the icon SVG from the registry
   */
  protected iconSvg = computed(() => {
    const svg = this.iconRegistry.getIcon(this.name());

    // If icon not found and fallback disabled, return empty
    if (!svg && !this.useFallback()) {
      return '';
    }

    return svg;
  });

  constructor() {
    // Register default icons and fallback on first component instantiation
    effect(
      () => {
        const registeredIcons = this.iconRegistry.getRegisteredIcons();

        if (registeredIcons.length === 0) {
          // Register default icons
          this.iconRegistry.registerIcons(DEFAULT_ICONS);

          // Configure with fallback icon
          this.iconRegistry.configure({
            fallbackIcon: FALLBACK_ICON,
            showWarnings: true,
          });
        }
      },
      { allowSignalWrites: true },
    );
  }
}
