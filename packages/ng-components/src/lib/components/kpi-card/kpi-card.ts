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
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  AcpKpiCardAlign,
  AcpKpiCardColor,
  AcpKpiCardDeltaFormat,
  AcpKpiCardHeadingLevel,
  AcpKpiCardLabels,
  AcpKpiCardSize,
  AcpKpiCardTrend,
  AcpKpiCardTrendSentiment,
  AcpKpiCardVariant,
} from './kpi-card.types';
import { ACP_KPI_CARD_DEFAULT_OPTIONS } from './kpi-card.tokens';
import {
  AcpKpiCardActions,
  AcpKpiCardAvatar,
  AcpKpiCardFooter,
  AcpKpiCardIcon,
} from './kpi-card-slots';
import { DEFAULT_LABELS, TREND_ICONS, inferTrend } from './kpi-card.utils';

const isBlank = (value: unknown): boolean => value === null || value === undefined || value === '';

const optionalBoolean = (value: unknown): boolean | undefined =>
  value == null ? undefined : booleanAttribute(value);

let nextId = 0;

@Component({
  selector: 'acp-kpi-card',
  exportAs: 'acpKpiCard',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    MatCard,
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
  private readonly defaults = inject(ACP_KPI_CARD_DEFAULT_OPTIONS, { optional: true }) ?? {};

  /** @internal Id of the content, used to describe the interactive area. */
  readonly contentId = `acp-kpi-card-${nextId++}-content`;

  // Content
  readonly title = input<string>();
  readonly subtitle = input<string>();
  /** Renders the title as a heading of this level. Without it the title is plain text. */
  readonly headingLevel = input<AcpKpiCardHeadingLevel>();
  /** Numbers are formatted with `Intl.NumberFormat`; strings are shown as-is. */
  readonly value = input<string | number | null>();
  readonly valueFormat = input<Intl.NumberFormatOptions>();
  readonly prefix = input<string>();
  readonly suffix = input<string>();
  readonly description = input<string>();
  readonly footer = input<string>();
  /** BCP 47 locale for number formatting. Defaults to the app `LOCALE_ID`. */
  readonly locale = input<string>();

  // Styling (fall back to ACP_KPI_CARD_DEFAULT_OPTIONS)
  readonly variant = input<AcpKpiCardVariant>();
  readonly color = input<AcpKpiCardColor>();
  readonly size = input<AcpKpiCardSize>();
  readonly align = input<AcpKpiCardAlign>();

  // Icons & avatar
  readonly icon = input<string>();
  readonly svgIcon = input<string>();
  readonly avatar = input<string>();
  readonly avatarInitials = input<string>();

  // Change vs. previous period
  /** Change vs. the previous period, e.g. `12.5` or `'+12.5'`. */
  readonly delta = input<number | string | null>();
  readonly deltaFormat = input<AcpKpiCardDeltaFormat>();
  /** Direction of the change. Inferred from the sign of `delta` when unset. */
  readonly trend = input<AcpKpiCardTrend>();
  /** Invert the badge color for metrics where a decrease is good (costs, churn, errors). */
  readonly lowerIsBetter = input(false, { transform: booleanAttribute });
  /** Comparison context shown next to the change, e.g. "vs last month". */
  readonly trendLabel = input<string>();
  /** Show the trend arrow inside the change badge. */
  readonly showTrendIcon = input(undefined, { transform: optionalBoolean });

  // Progress
  readonly progress = input<number>();
  readonly progressColor = input<AcpKpiCardColor>();

  // States
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Makes the whole card a button that emits `clicked`. */
  readonly clickable = input(false, { transform: booleanAttribute });
  /** Toggle state of a clickable card (`aria-pressed`). Leave unset for plain action cards. */
  readonly selected = input(undefined, { transform: optionalBoolean });

  /** Makes the whole card a link. Takes precedence over `clickable`. */
  readonly routerLink = input<string | readonly unknown[] | null>(null);

  // Accessibility
  /** Accessible name of a clickable or linked card. Defaults to `title`. */
  readonly ariaLabel = input<string>();
  readonly menuAriaLabel = input<string>();
  readonly tooltip = input<string>();

  /** Emitted when a `clickable` card is activated (click, Enter or Space). */
  readonly clicked = output<void>();

  private readonly iconSlot = contentChild(AcpKpiCardIcon, { descendants: false });
  private readonly avatarSlot = contentChild(AcpKpiCardAvatar, { descendants: false });
  private readonly footerSlot = contentChild(AcpKpiCardFooter, { descendants: false });
  private readonly actionsSlot = contentChild(AcpKpiCardActions, { descendants: false });

  readonly iconTemplate = computed(() => this.iconSlot()?.templateRef);
  readonly avatarTemplate = computed(() => this.avatarSlot()?.templateRef);
  readonly footerTemplate = computed(() => this.footerSlot()?.templateRef);
  readonly actionsTemplate = computed(() => this.actionsSlot()?.templateRef);

  readonly resolvedVariant = computed(() => this.variant() ?? this.defaults.variant ?? 'default');
  readonly resolvedColor = computed(() => this.color() ?? this.defaults.color ?? 'primary');
  readonly resolvedSize = computed(() => this.size() ?? this.defaults.size ?? 'medium');
  readonly resolvedAlign = computed(() => this.align() ?? this.defaults.align ?? 'start');
  readonly resolvedShowTrendIcon = computed(
    () => this.showTrendIcon() ?? this.defaults.showTrendIcon ?? true,
  );
  readonly labels = computed<AcpKpiCardLabels>(() => ({
    ...DEFAULT_LABELS,
    ...this.defaults.labels,
  }));

  private readonly resolvedLocale = computed(() => this.locale() ?? this.defaultLocale);

  readonly formattedValue = computed(() => {
    const value = this.value();
    if (isBlank(value)) return null;
    if (typeof value !== 'number') return String(value);
    return new Intl.NumberFormat(this.resolvedLocale(), this.valueFormat()).format(value);
  });

  readonly formattedDelta = computed(() => {
    const delta = this.delta();
    if (isBlank(delta)) return null;
    const isPercent = (this.deltaFormat() ?? this.defaults.deltaFormat ?? 'percent') === 'percent';
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

  readonly resolvedTrend = computed(() => this.trend() ?? inferTrend(this.delta()));

  readonly trendIcon = computed(() => TREND_ICONS[this.resolvedTrend()]);

  readonly trendAriaLabel = computed(() => {
    const labels = this.labels();
    const trend = this.resolvedTrend();
    return trend === 'up'
      ? labels.increase
      : trend === 'down'
        ? labels.decrease
        : trend === 'neutral'
          ? labels.noChange
          : '';
  });

  readonly sentiment = computed<AcpKpiCardTrendSentiment>(() => {
    const trend = this.resolvedTrend();
    if (trend !== 'up' && trend !== 'down') return 'neutral';
    return (trend === 'up') !== this.lowerIsBetter() ? 'positive' : 'negative';
  });

  readonly hasIconTile = computed(() => !!(this.iconTemplate() || this.svgIcon() || this.icon()));

  readonly hasHeader = computed(
    () =>
      !!(
        this.title() ||
        this.subtitle() ||
        this.hasIconTile() ||
        this.avatar() ||
        this.avatarInitials() ||
        this.avatarTemplate() ||
        this.actionsTemplate()
      ),
  );

  readonly hasFooter = computed(() => !!(this.footer() || this.footerTemplate()));

  /** `link`, `button` or `null`: the native element that makes the whole card interactive. */
  readonly interaction = computed<'link' | 'button' | null>(() =>
    this.routerLink() != null ? 'link' : this.clickable() ? 'button' : null,
  );

  readonly accessibleName = computed(() => this.ariaLabel() ?? this.title() ?? null);

  readonly hostClasses = computed(() => {
    const classes = [
      'acp-kpi-card',
      `acp-kpi-card--${this.resolvedVariant()}`,
      `acp-kpi-card--${this.resolvedColor()}`,
      `acp-kpi-card--${this.resolvedSize()}`,
      `acp-kpi-card--align-${this.resolvedAlign()}`,
    ];
    if (this.interaction()) classes.push('acp-kpi-card--interactive');
    if (this.disabled()) classes.push('acp-kpi-card--disabled');
    if (this.loading()) classes.push('acp-kpi-card--loading');
    if (this.selected()) classes.push('acp-kpi-card--selected');
    return classes.join(' ');
  });

  onActivate(): void {
    if (!this.disabled() && !this.loading()) this.clicked.emit();
  }
}
