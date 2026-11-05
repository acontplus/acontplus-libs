import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  output,
} from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  AcpCardActionsAlign,
  AcpCardAppearance,
  AcpCardColor,
  AcpCardElevation,
  AcpCardImageRatio,
  AcpCardPadding,
  AcpCardPassThroughOptions,
} from './card.types';
import { ACP_CARD_DEFAULT_OPTIONS } from './card.tokens';
import {
  AcpCardActions,
  AcpCardAvatar,
  AcpCardFooter,
  AcpCardHeader,
  AcpCardMedia,
  AcpCardSubtitle,
  AcpCardTitle,
} from './card-slots';

const optionalBoolean = (value: unknown): boolean | undefined =>
  value == null ? undefined : booleanAttribute(value);

@Component({
  selector: 'acp-card',
  exportAs: 'acpCard',
  standalone: true,
  imports: [MatCardModule, MatProgressBar, NgTemplateOutlet, NgClass, NgStyle],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[style.--acp-card-shape]': 'shape()',
    '[style.--acp-card-elevation]': 'elevationShadow()',
    '[attr.title]': 'null',
    '[attr.role]': 'clickable() ? "button" : "article"',
    '[attr.tabindex]': 'interactive() ? 0 : null',
    '[attr.aria-label]': 'ariaLabel() ?? null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '(click)': 'onActivate($event)',
    '(keydown.enter)': 'onKeyActivate($event)',
    '(keydown.space)': 'onKeyActivate($event)',
  },
})
export class AcpCard {
  private readonly defaults = inject(ACP_CARD_DEFAULT_OPTIONS, { optional: true }) ?? {};

  // Content shortcuts (use the slot directives for rich content)
  readonly title = input<string>();
  readonly subtitle = input<string>();

  // Appearance
  readonly appearance = input<AcpCardAppearance>();
  readonly color = input<AcpCardColor>();
  readonly elevation = input<AcpCardElevation>();
  /** `true` = theme radius, `false` = square, number = radius in px. */
  readonly rounded = input<boolean | number>();
  readonly padding = input<AcpCardPadding>();
  readonly hoverable = input(undefined, { transform: optionalBoolean });
  readonly actionsAlign = input<AcpCardActionsAlign>();
  /** Aspect ratio applied to the media slot. Media keeps its natural size when unset. */
  readonly imageRatio = input<AcpCardImageRatio>();

  // State
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  // Layout
  readonly fullHeight = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });

  readonly ariaLabel = input<string>();
  readonly passThrough = input<AcpCardPassThroughOptions>({});

  /** Emitted on click, Enter or Space when `clickable` and not disabled/loading. */
  readonly clicked = output<MouseEvent | KeyboardEvent>();

  // Slots: directive (`<ng-template acpCardTitle>`) first, legacy `#title` ref as fallback
  private readonly headerDir = contentChild(AcpCardHeader, { descendants: false });
  private readonly mediaDir = contentChild(AcpCardMedia, { descendants: false });
  private readonly avatarDir = contentChild(AcpCardAvatar, { descendants: false });
  private readonly titleDir = contentChild(AcpCardTitle, { descendants: false });
  private readonly subtitleDir = contentChild(AcpCardSubtitle, { descendants: false });
  private readonly actionsDir = contentChild(AcpCardActions, { descendants: false });
  private readonly footerDir = contentChild(AcpCardFooter, { descendants: false });
  private readonly headerRef = contentChild('header', { read: TemplateRef, descendants: false });
  private readonly mediaRef = contentChild('media', { read: TemplateRef, descendants: false });
  private readonly avatarRef = contentChild('avatar', { read: TemplateRef, descendants: false });
  private readonly titleRef = contentChild('title', { read: TemplateRef, descendants: false });
  private readonly subtitleRef = contentChild('subtitle', {
    read: TemplateRef,
    descendants: false,
  });
  private readonly actionsRef = contentChild('actions', { read: TemplateRef, descendants: false });
  private readonly footerRef = contentChild('footer', { read: TemplateRef, descendants: false });

  readonly headerTpl = computed(() => this.headerDir()?.templateRef ?? this.headerRef());
  readonly mediaTpl = computed(() => this.mediaDir()?.templateRef ?? this.mediaRef());
  readonly avatarTpl = computed(() => this.avatarDir()?.templateRef ?? this.avatarRef());
  readonly titleTpl = computed(() => this.titleDir()?.templateRef ?? this.titleRef());
  readonly subtitleTpl = computed(() => this.subtitleDir()?.templateRef ?? this.subtitleRef());
  readonly actionsTpl = computed(() => this.actionsDir()?.templateRef ?? this.actionsRef());
  readonly footerTpl = computed(() => this.footerDir()?.templateRef ?? this.footerRef());

  readonly hasTitleGroup = computed(
    () =>
      !!(
        this.avatarTpl() ||
        this.titleTpl() ||
        this.subtitleTpl() ||
        this.title() ||
        this.subtitle()
      ),
  );

  readonly resolvedAppearance = computed<AcpCardAppearance>(
    () => this.appearance() ?? this.defaults.appearance ?? 'elevated',
  );

  readonly matAppearance = computed(() => {
    const appearance = this.resolvedAppearance();
    return appearance === 'elevated' ? 'raised' : appearance;
  });

  readonly resolvedPadding = computed<AcpCardPadding>(
    () => this.padding() ?? this.defaults.padding ?? 'medium',
  );

  readonly resolvedColor = computed(() => this.color() ?? this.defaults.color);

  readonly resolvedHoverable = computed(() => this.hoverable() ?? this.defaults.hoverable ?? false);

  readonly resolvedActionsAlign = computed(
    () => this.actionsAlign() ?? this.defaults.actionsAlign ?? 'start',
  );

  readonly mediaRatio = computed(() =>
    (this.imageRatio() ?? this.defaults.imageRatio)?.replace(':', ' / '),
  );

  readonly interactive = computed(() => this.clickable() && !this.disabled() && !this.loading());

  readonly shape = computed(() => {
    const rounded = this.rounded() ?? this.defaults.rounded ?? true;
    if (rounded === true) return null;
    return rounded === false ? '0px' : `${rounded}px`;
  });

  readonly elevationShadow = computed(() => {
    const level = this.elevation() ?? this.defaults.elevation;
    if (level === undefined) return null;
    return level === 0 ? 'none' : `var(--mat-sys-level${level})`;
  });

  readonly hostClasses = computed(() => {
    const classes = [
      'acp-card-wrapper',
      `acp-card--${this.resolvedAppearance()}`,
      `acp-card--padding-${this.resolvedPadding()}`,
    ];
    const color = this.resolvedColor();
    if (color) classes.push(`acp-card--${color}`);
    if (this.resolvedHoverable()) classes.push('acp-card--hover');
    if (this.clickable()) classes.push('acp-card--clickable');
    if (this.disabled()) classes.push('acp-card--disabled');
    if (this.loading()) classes.push('acp-card--loading');
    if (this.fullHeight()) classes.push('acp-card--full-height');
    if (this.fullWidth()) classes.push('acp-card--full-width');
    return classes.join(' ');
  });

  onActivate(event: MouseEvent): void {
    if (!this.interactive()) return;
    const host = event.currentTarget as HTMLElement;
    const nested = (event.target as HTMLElement | null)?.closest(
      '.mat-mdc-card-actions, a, button, input, select, textarea',
    );
    if (nested && nested !== host && host.contains(nested)) return;
    this.clicked.emit(event);
  }

  onKeyActivate(event: Event): void {
    if (!this.interactive() || event.target !== event.currentTarget) return;
    event.preventDefault();
    this.clicked.emit(event as KeyboardEvent);
  }
}
