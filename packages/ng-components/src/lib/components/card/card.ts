import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  booleanAttribute,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  AcpCardAppearance,
  AcpCardElevation,
  AcpCardPadding,
  AcpCardImageRatio,
} from './card.types';

@Component({
  selector: 'acp-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'acp-card-wrapper',
    '[class.acp-card--rounded]': 'rounded() === true',
    '[class.acp-card--rounded-4]': 'rounded() === 4',
    '[class.acp-card--rounded-8]': 'rounded() === 8',
    '[class.acp-card--rounded-12]': 'rounded() === 12',
    '[class.acp-card--rounded-16]': 'rounded() === 16',
    '[class.acp-card--rounded-20]': 'rounded() === 20',
    '[class.acp-card--rounded-24]': 'rounded() === 24',
    '[class.acp-card--hover]': 'hover()',
    '[class.acp-card--clickable]': 'clickable()',
    '[class.acp-card--disabled]': 'disabled()',
    '[class.acp-card--padding-small]': 'padding() === "small"',
    '[class.acp-card--padding-medium]': 'padding() === "medium"',
    '[class.acp-card--padding-large]': 'padding() === "large"',
    '[class.acp-card--full-height]': 'fullHeight()',
    '[class.acp-card--full-width]': 'fullWidth()',
  },
})
export class AcpCard {
  // Appearance variant
  readonly appearance = input<AcpCardAppearance>('default');

  // Elevation level (0-5)
  readonly elevation = input<AcpCardElevation>(1);

  // Border radius (true for default, or specific pixel value)
  readonly rounded = input<boolean | number>(true);

  // Hover effect
  readonly hover = input(false, { transform: booleanAttribute });

  // Clickable card
  readonly clickable = input(false, { transform: booleanAttribute });

  // Outlined style
  readonly outlined = input(false, { transform: booleanAttribute });

  // Disabled state
  readonly disabled = input(false, { transform: booleanAttribute });

  // Padding size
  readonly padding = input<AcpCardPadding>('medium');

  // Image aspect ratio
  readonly imageRatio = input<AcpCardImageRatio>('16:9');

  // Full height
  readonly fullHeight = input(false, { transform: booleanAttribute });

  // Full width
  readonly fullWidth = input(false, { transform: booleanAttribute });

  @HostBinding('attr.role') get role(): string {
    return this.clickable() ? 'button' : 'article';
  }

  @HostBinding('attr.tabindex') get tabindex(): string | null {
    return this.clickable() && !this.disabled() ? '0' : null;
  }

  @HostBinding('attr.aria-disabled') get ariaDisabled(): string | null {
    return this.disabled() ? 'true' : null;
  }
}
