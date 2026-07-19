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
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

import {
  AcpKpiCardColor,
  AcpKpiCardSize,
  AcpKpiCardTrend,
  AcpKpiCardVariant,
} from './kpi-card.types';
import { KPI_CARD_TREND_CONFIGS } from './kpi-card.utils';

@Component({
  selector: 'acp-kpi-card',
  exportAs: 'acpKpiCard',
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class AcpKpiCard {
  // Content
  title = input<string>();
  subtitle = input<string>();
  value = input<string | number>();
  description = input<string>();
  footer = input<string>();

  // Styling
  variant = input<AcpKpiCardVariant>('default');
  color = input<AcpKpiCardColor>('primary');
  size = input<AcpKpiCardSize>('md');

  // Icons & Avatar
  icon = input<string>();
  svgIcon = input<string>();
  avatar = input<string>();
  avatarInitials = input<string>();

  // Trend & Metrics
  trend = input<AcpKpiCardTrend>('none');
  percentage = input<number | string>();
  percentageFormat = input<'number' | 'percent'>('percent');

  // Progress
  progress = input<number>();
  progressColor = input<AcpKpiCardColor>('primary');

  // States
  loading = input(false, { transform: booleanAttribute });
  disabled = input(false, { transform: booleanAttribute });
  clickable = input(false, { transform: booleanAttribute });
  selected = input(false, { transform: booleanAttribute });

  // Navigation
  routerLink = input<string | any[] | null>(null);
  href = input<string | null>(null);

  // Aria
  ariaLabel = input<string>();

  // Outputs
  clicked = output<void>();
  actionClicked = output<string>();

  // Content children
  iconTemplate = contentChild('icon', { read: TemplateRef });
  avatarTemplate = contentChild('avatar', { read: TemplateRef });
  footerTemplate = contentChild('footer', { read: TemplateRef });
  actionsTemplate = contentChild('actions', { read: TemplateRef });

  // Computed properties
  isTrending = computed(() => this.trend() !== 'none');

  trendConfig = computed(() => KPI_CARD_TREND_CONFIGS[this.trend()]);

  effectiveColor = computed<AcpKpiCardColor>(() => {
    if (this.isTrending()) return this.trendConfig().color;
    return this.color();
  });

  effectiveIcon = computed<string | undefined>(() => {
    if (this.isTrending()) return this.trendConfig().icon;
    return this.icon();
  });

  hasHeader = computed(() => !!(this.title() || this.subtitle() || this.icon() || this.avatar()));

  hasFooter = computed(
    () => !!(this.footer() || this.footerTemplate() || this.progress() !== undefined),
  );

  hostClasses = computed(() => {
    const classes = [
      'acp-kpi-card',
      `acp-kpi-card--${this.variant()}`,
      `acp-kpi-card--${this.effectiveColor()}`,
      `acp-kpi-card--${this.size()}`,
    ];

    if (this.clickable()) classes.push('acp-kpi-card--clickable');
    if (this.disabled()) classes.push('acp-kpi-card--disabled');
    if (this.loading()) classes.push('acp-kpi-card--loading');
    if (this.selected()) classes.push('acp-kpi-card--selected');

    return classes.join(' ');
  });

  onCardClick(): void {
    if (!this.disabled() && this.clickable()) {
      this.clicked.emit();
    }
  }

  onActionClick(action: string, event: Event): void {
    event.stopPropagation();
    this.actionClicked.emit(action);
  }
}
