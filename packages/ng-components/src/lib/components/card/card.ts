import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  output,
} from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  AcpCardActionsAlign,
  AcpCardAppearance,
  AcpCardColor,
  AcpCardHeadingLevel,
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

let nextId = 0;

@Component({
  selector: 'acp-card',
  exportAs: 'acpCard',
  imports: [MatCardModule, MatProgressBar, NgTemplateOutlet, NgClass, NgStyle, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.title]': 'null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class AcpCard {
  private readonly defaults = inject(ACP_CARD_DEFAULT_OPTIONS, { optional: true }) ?? {};

  /** @internal Id of the content, used to describe the interactive area. */
  readonly contentId = `acp-card-${nextId++}-content`;

  // Content shortcuts (use the slot directives for rich content)
  readonly title = input<string>();
  readonly subtitle = input<string>();
  /** Renders the title as a heading of this level. Without it the title is plain text. */
  readonly headingLevel = input<AcpCardHeadingLevel>();

  // Appearance (fall back to ACP_CARD_DEFAULT_OPTIONS). Shape and shadows come from the theme
  // (`--acp-sys-*`, acontpluspro); per-card overrides use the `--acp-card-*` CSS hooks.
  readonly appearance = input<AcpCardAppearance>();
  readonly color = input<AcpCardColor>();
  readonly padding = input<AcpCardPadding>();
  readonly hoverable = input(undefined, { transform: optionalBoolean });
  readonly actionsAlign = input<AcpCardActionsAlign>();
  /** Aspect ratio applied to the media slot. Media keeps its natural size when unset. */
  readonly imageRatio = input<AcpCardImageRatio>();

  // Interaction
  /** Makes the whole card a native button that emits `clicked`. */
  readonly clickable = input(false, { transform: booleanAttribute });
  /** Makes the whole card a native link. Takes precedence over `clickable`. */
  readonly routerLink = input<string | readonly unknown[] | null>(null);
  /** Accessible name of a clickable or linked card. Defaults to `title`. */
  readonly ariaLabel = input<string>();

  // State
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  // Layout
  readonly fullHeight = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });

  readonly passThrough = input<AcpCardPassThroughOptions>({});

  /** Emitted when a `clickable` card is activated (click, Enter or Space). */
  readonly clicked = output<MouseEvent>();

  private readonly headerSlot = contentChild(AcpCardHeader, { descendants: false });
  private readonly mediaSlot = contentChild(AcpCardMedia, { descendants: false });
  private readonly avatarSlot = contentChild(AcpCardAvatar, { descendants: false });
  private readonly titleSlot = contentChild(AcpCardTitle, { descendants: false });
  private readonly subtitleSlot = contentChild(AcpCardSubtitle, { descendants: false });
  private readonly actionsSlot = contentChild(AcpCardActions, { descendants: false });
  private readonly footerSlot = contentChild(AcpCardFooter, { descendants: false });

  readonly headerTpl = computed(() => this.headerSlot()?.templateRef);
  readonly mediaTpl = computed(() => this.mediaSlot()?.templateRef);
  readonly avatarTpl = computed(() => this.avatarSlot()?.templateRef);
  readonly titleTpl = computed(() => this.titleSlot()?.templateRef);
  readonly subtitleTpl = computed(() => this.subtitleSlot()?.templateRef);
  readonly actionsTpl = computed(() => this.actionsSlot()?.templateRef);
  readonly footerTpl = computed(() => this.footerSlot()?.templateRef);

  /** The title group renders only when there is no custom `acpCardHeader`. */
  readonly hasTitleGroup = computed(
    () =>
      !this.headerTpl() &&
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

  /** `link`, `button` or `null`: the native element that makes the whole card interactive. */
  readonly interaction = computed<'link' | 'button' | null>(() =>
    this.routerLink() != null ? 'link' : this.clickable() ? 'button' : null,
  );

  readonly accessibleName = computed(() => this.ariaLabel() ?? this.title() ?? null);

  readonly hostClasses = computed(() => {
    const classes = [
      'acp-card-wrapper',
      `acp-card--${this.resolvedAppearance()}`,
      `acp-card--padding-${this.resolvedPadding()}`,
    ];
    const color = this.resolvedColor();
    if (color) classes.push(`acp-card--${color}`);
    if (this.resolvedHoverable()) classes.push('acp-card--hover');
    if (this.interaction()) classes.push('acp-card--interactive');
    if (this.disabled()) classes.push('acp-card--disabled');
    if (this.loading()) classes.push('acp-card--loading');
    if (this.fullHeight()) classes.push('acp-card--full-height');
    if (this.fullWidth()) classes.push('acp-card--full-width');
    return classes.join(' ');
  });

  onActivate(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) this.clicked.emit(event);
  }
}
