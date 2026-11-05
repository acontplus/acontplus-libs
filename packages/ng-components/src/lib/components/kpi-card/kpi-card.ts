import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  LOCALE_ID,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  AcpKpiCardAlign,
  AcpKpiCardColor,
  AcpKpiCardSize,
  AcpKpiCardTrend,
  AcpKpiCardTrendSentiment,
  AcpKpiCardVariant,
} from './kpi-card.types';
import { inferKpiTrend, KPI_CARD_TREND_CONFIGS } from './kpi-card.utils';

const isBlank = (value: unknown): boolean => value === null || value === undefined || value === '';

@Component({
  selector: 'acp-kpi-card',
  exportAs: 'acpKpiCard',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.title]': 'null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class AcpKpiCard {
  private readonly defaultLocale = inject(LOCALE_ID);

  // Content
  readonly title = input<string>();
  readonly subtitle = input<string>();
  /** Numbers are formatted with `Intl.NumberFormat`; strings are shown as-is. */
  readonly value = input<string | number | null>();
  readonly valueFormat = input<Intl.NumberFormatOptions>();
  readonly prefix = input<string>();
  readonly suffix = input<string>();
  readonly description = input<string>();
  readonly footer = input<string>();
  /** BCP 47 locale for number formatting. Defaults to the app `LOCALE_ID`. */
  readonly locale = input<string>();

  // Styling
  readonly variant = input<AcpKpiCardVariant>('default');
  readonly color = input<AcpKpiCardColor>('primary');
  readonly size = input<AcpKpiCardSize>('md');
  readonly align = input<AcpKpiCardAlign>('start');

  // Icons & avatar
  readonly icon = input<string>();
  readonly svgIcon = input<string>();
  readonly avatar = input<string>();
  readonly avatarInitials = input<string>();

  // Change vs. previous period
  readonly percentage = input<number | string | null>();
  readonly percentageFormat = input<'number' | 'percent'>('percent');
  /** Direction of the change. Inferred from the sign of `percentage` when unset. */
  readonly trend = input<AcpKpiCardTrend>();
  /** Invert the badge color for metrics where a decrease is good (costs, churn, errors). */
  readonly lowerIsBetter = input(false, { transform: booleanAttribute });
  /** Comparison context shown next to the change, e.g. "vs last month". */
  readonly trendLabel = input<string>();
  /** Show the trend arrow inside the change badge. */
  readonly showTrendIcon = input(true, { transform: booleanAttribute });

  // Progress
  readonly progress = input<number>();
  readonly progressColor = input<AcpKpiCardColor>();

  // States
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly selected = input(false, { transform: booleanAttribute });

  // Navigation
  readonly routerLink = input<string | any[] | null>(null);

  // Accessibility
  readonly ariaLabel = input<string>();
  readonly menuAriaLabel = input('More options');
  readonly tooltip = input<string>();

  /** Emitted on click, Enter or Space when `clickable`. */
  readonly clicked = output<void>();

  readonly iconTemplate = contentChild('icon', { read: TemplateRef });
  readonly avatarTemplate = contentChild('avatar', { read: TemplateRef });
  readonly footerTemplate = contentChild('footer', { read: TemplateRef });
  readonly actionsTemplate = contentChild('actions', { read: TemplateRef });

  private readonly resolvedLocale = computed(() => this.locale() ?? this.defaultLocale);

  readonly formattedValue = computed(() => {
    const value = this.value();
    if (isBlank(value)) return null;
    if (typeof value !== 'number') return String(value);
    return new Intl.NumberFormat(this.resolvedLocale(), this.valueFormat()).format(value);
  });

  readonly formattedDelta = computed(() => {
    const delta = this.percentage();
    if (isBlank(delta)) return null;
    const isPercent = this.percentageFormat() === 'percent';
    if (typeof delta !== 'number') {
      const text = String(delta);
      return isPercent && !text.endsWith('%') ? `${text}%` : text;
    }
    return new Intl.NumberFormat(this.resolvedLocale(), {
      style: isPercent ? 'percent' : 'decimal',
      maximumFractionDigits: 2,
      signDisplay: 'exceptZero',
    }).format(isPercent ? delta / 100 : delta);
  });

  readonly resolvedTrend = computed(() => this.trend() ?? inferKpiTrend(this.percentage()));

  readonly trendConfig = computed(() => KPI_CARD_TREND_CONFIGS[this.resolvedTrend()]);

  readonly sentiment = computed<AcpKpiCardTrendSentiment>(() => {
    const trend = this.resolvedTrend();
    if (trend !== 'up' && trend !== 'down') return 'neutral';
    return (trend === 'up') !== this.lowerIsBetter() ? 'positive' : 'negative';
  });

  readonly hasHeader = computed(
    () =>
      !!(
        this.title() ||
        this.subtitle() ||
        this.icon() ||
        this.svgIcon() ||
        this.iconTemplate() ||
        this.avatar() ||
        this.avatarInitials() ||
        this.avatarTemplate() ||
        this.actionsTemplate()
      ),
  );

  readonly hasFooter = computed(() => !!(this.footer() || this.footerTemplate()));

  readonly interactive = computed(() => this.clickable() && !this.disabled() && !this.loading());

  readonly hostClasses = computed(() => {
    const classes = [
      'acp-kpi-card',
      `acp-kpi-card--${this.variant()}`,
      `acp-kpi-card--${this.color()}`,
      `acp-kpi-card--${this.size()}`,
      `acp-kpi-card--align-${this.align()}`,
    ];
    if (this.clickable()) classes.push('acp-kpi-card--clickable');
    if (this.disabled()) classes.push('acp-kpi-card--disabled');
    if (this.loading()) classes.push('acp-kpi-card--loading');
    if (this.selected()) classes.push('acp-kpi-card--selected');
    return classes.join(' ');
  });

  onCardClick(): void {
    if (this.interactive()) this.clicked.emit();
  }

  onCardKey(event: Event): void {
    if (!this.interactive() || event.target !== event.currentTarget) return;
    event.preventDefault();
    this.clicked.emit();
  }
}
