import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MatChip,
  MatChipAvatar,
  MatChipRemove,
  MatChipSet,
  MatChipTrailingIcon,
} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import {
  AcpBadgeColor,
  AcpBadgeShape,
  AcpBadgeSize,
  AcpBadgeTrend,
  AcpBadgeVariant,
} from './badge.types';
import { TREND_CONFIGS } from './badge.utils';

@Component({
  selector: 'acp-badge',
  exportAs: 'acpBadge',
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    MatChipSet,
    MatChip,
    MatChipAvatar,
    MatChipTrailingIcon,
    MatChipRemove,
    MatIconModule,
  ],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class AcpBadge {
  label = input<string>();
  value = input<string>();

  variant = input<AcpBadgeVariant>('filled');
  color = input<AcpBadgeColor>('primary');
  size = input<AcpBadgeSize>('md');
  shape = input<AcpBadgeShape>('rounded');

  icon = input<string>();
  trailingIcon = input<string>();
  svgIcon = input<string>();
  trailingSvgIcon = input<string>();

  trend = input<AcpBadgeTrend>('none');

  clickable = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });
  selected = input(false, { transform: booleanAttribute });
  highlighted = input(false, { transform: booleanAttribute });
  removable = input(false, { transform: booleanAttribute });

  routerLink = input<string | any[] | null>(null);
  href = input<string | null>(null);
  ariaLabelOverride = input<string | null>(null);

  clicked = output<void>();
  removed = output<void>();

  iconTemplate = contentChild('icon', { read: TemplateRef });
  trailingIconTemplate = contentChild('trailingIcon', { read: TemplateRef });

  private isTrending = computed(() => this.trend() !== 'none');

  private trendConfig = computed(() => TREND_CONFIGS[this.trend()]);

  effectiveColor = computed<AcpBadgeColor>(() => {
    if (this.isTrending()) return this.trendConfig().color;
    return this.color();
  });

  effectiveIcon = computed<string | undefined>(() => {
    if (this.isTrending()) return this.trendConfig().icon;
    return this.icon();
  });

  effectiveSvgIcon = computed<string | undefined>(() => {
    if (this.isTrending()) return undefined;
    return this.svgIcon();
  });

  effectiveTrailingIcon = computed<string | undefined>(() => {
    if (this.removable()) return undefined;
    return this.trailingIcon();
  });

  effectiveTrailingSvgIcon = computed<string | undefined>(() => {
    if (this.removable()) return undefined;
    return this.trailingSvgIcon();
  });

  effectiveValue = computed<string | undefined>(() => {
    if (this.isTrending()) return this.value() ?? this.trendConfig().value;
    return this.value();
  });

  isLink = computed(() => this.href() !== null || this.routerLink() !== null);

  isInteractive = computed(() => this.clickable() || this.removable() || this.isLink());

  isDisabled = computed(() => this.disabled() || this.loading());

  isHighlighted = computed(() => this.highlighted() || this.selected());

  chipClasses = computed(() =>
    [
      `acp-badge--${this.variant()}`,
      `acp-badge--${this.size()}`,
      `acp-badge--${this.shape()}`,
    ].join(' '),
  );

  hostClasses = computed(() => {
    const classes = [
      'acp-badge',
      `acp-badge--${this.variant()}`,
      `acp-badge--${this.effectiveColor()}`,
      `acp-badge--${this.size()}`,
      `acp-badge--${this.shape()}`,
    ];
    if (this.isInteractive()) classes.push('acp-badge--interactive');
    if (this.isDisabled()) classes.push('acp-badge--disabled');
    if (this.selected()) classes.push('acp-badge--selected');
    if (this.loading()) classes.push('acp-badge--loading');
    if (this.removable()) classes.push('acp-badge--removable');
    if (this.isTrending()) classes.push('acp-badge--trend');
    return classes.join(' ');
  });

  ariaLabel = computed(() => {
    const override = this.ariaLabelOverride();
    if (override) return override;
    const label = this.label() ?? '';
    const value = this.effectiveValue() ?? '';
    const separator = label && value ? ' ' : '';
    return `${label}${separator}${value}`.trim() || null;
  });

  onChipClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit();
  }

  onRemove(_event: any): void {
    if (this.isDisabled()) return;
    this.removed.emit();
  }
}
