import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import {
  AcpBadgeColor,
  AcpBadgeLabels,
  AcpBadgeShape,
  AcpBadgeSize,
  AcpBadgeTrend,
  AcpBadgeVariant,
} from './badge.types';
import { ACP_BADGE_DEFAULT_OPTIONS } from './badge.tokens';
import { AcpBadgeIcon, AcpBadgeTrailingIcon } from './badge-slots';
import { DEFAULT_LABELS, TREND_ICONS } from './badge.utils';

const optionalBoolean = (value: unknown): boolean | undefined =>
  value == null ? undefined : booleanAttribute(value);

/**
 * Status label, counter or filter chip (MaterialPro look). Renders a native `<a>` for
 * `routerLink`/`href`, a native `<button>` for `clickable` and a `<span>` otherwise.
 */
@Component({
  selector: 'acp-badge',
  exportAs: 'acpBadge',
  imports: [NgTemplateOutlet, RouterLink, MatIconModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class AcpBadge {
  private readonly defaults = inject(ACP_BADGE_DEFAULT_OPTIONS, { optional: true }) ?? {};

  readonly label = input<string>();
  readonly value = input<string | number>();

  // Styling (fall back to ACP_BADGE_DEFAULT_OPTIONS)
  readonly variant = input<AcpBadgeVariant>();
  /** Ignored when `trend` is set: the trend sentiment picks the color. */
  readonly color = input<AcpBadgeColor>();
  readonly size = input<AcpBadgeSize>();
  readonly shape = input<AcpBadgeShape>();

  readonly icon = input<string>();
  readonly svgIcon = input<string>();
  readonly trailingIcon = input<string>();
  readonly trailingSvgIcon = input<string>();

  /** Direction of a change: shows the trend icon and colors the badge (up = success). */
  readonly trend = input<AcpBadgeTrend>();
  /** Invert the trend color for metrics where a decrease is good (costs, churn, errors). */
  readonly lowerIsBetter = input(false, { transform: booleanAttribute });

  // Interaction
  /** Makes the badge a native button that emits `clicked`. */
  readonly clickable = input(false, { transform: booleanAttribute });
  /** Makes the badge a native link (router). Takes precedence over `clickable`. */
  readonly routerLink = input<string | readonly unknown[] | null>(null);
  /** Makes the badge a native link (URL). Takes precedence over `clickable`. */
  readonly href = input<string | null>(null);
  /** Toggle state of a clickable badge (`aria-pressed`). Leave unset for plain buttons. */
  readonly selected = input(undefined, { transform: optionalBoolean });
  /** Adds a remove button that emits `removed`. */
  readonly removable = input(false, { transform: booleanAttribute });

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  /** Accessible name. Defaults to the visible label and value. */
  readonly ariaLabel = input<string>();

  readonly clicked = output<MouseEvent>();
  readonly removed = output<void>();

  private readonly iconSlot = contentChild(AcpBadgeIcon, { descendants: false });
  private readonly trailingIconSlot = contentChild(AcpBadgeTrailingIcon, { descendants: false });

  readonly iconTemplate = computed(() => this.iconSlot()?.templateRef);
  readonly trailingIconTemplate = computed(() => this.trailingIconSlot()?.templateRef);

  readonly labels = computed<AcpBadgeLabels>(() => ({
    ...DEFAULT_LABELS,
    ...this.defaults.labels,
  }));

  readonly resolvedVariant = computed(() => this.variant() ?? this.defaults.variant ?? 'tonal');
  readonly resolvedSize = computed(() => this.size() ?? this.defaults.size ?? 'medium');
  readonly resolvedShape = computed(() => this.shape() ?? this.defaults.shape ?? 'pill');

  readonly resolvedColor = computed<AcpBadgeColor>(() => {
    const trend = this.trend();
    if (trend === 'up' || trend === 'down') {
      return (trend === 'up') !== this.lowerIsBetter() ? 'success' : 'error';
    }
    if (trend === 'neutral') return 'neutral';
    return this.color() ?? this.defaults.color ?? 'primary';
  });

  readonly leadingIcon = computed(() => {
    const trend = this.trend();
    return trend ? TREND_ICONS[trend] : this.icon();
  });

  readonly trendText = computed(() => {
    const labels = this.labels();
    switch (this.trend()) {
      case 'up':
        return labels.increase;
      case 'down':
        return labels.decrease;
      case 'neutral':
        return labels.noChange;
      default:
        return null;
    }
  });

  readonly isDisabled = computed(() => this.disabled() || this.loading());

  /** Native element that renders the badge body. Disabled links render as plain text. */
  readonly element = computed<'router-link' | 'link' | 'button' | 'text'>(() => {
    if (this.routerLink() != null) return this.isDisabled() ? 'text' : 'router-link';
    if (this.href() != null) return this.isDisabled() ? 'text' : 'link';
    return this.clickable() ? 'button' : 'text';
  });

  readonly removeLabel = computed(() =>
    this.labels()
      .remove.replace('{label}', String(this.label() ?? this.value() ?? ''))
      .trim(),
  );

  readonly hostClasses = computed(() => {
    const classes = [
      'acp-badge',
      `acp-badge--${this.resolvedVariant()}`,
      `acp-badge--${this.resolvedColor()}`,
      `acp-badge--${this.resolvedSize()}`,
      `acp-badge--${this.resolvedShape()}`,
    ];
    if (this.element() !== 'text') classes.push('acp-badge--interactive');
    if (this.isDisabled()) classes.push('acp-badge--disabled');
    if (this.selected()) classes.push('acp-badge--selected');
    if (this.removable()) classes.push('acp-badge--removable');
    return classes.join(' ');
  });

  onClick(event: MouseEvent): void {
    if (!this.isDisabled()) this.clicked.emit(event);
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isDisabled()) this.removed.emit();
  }
}
