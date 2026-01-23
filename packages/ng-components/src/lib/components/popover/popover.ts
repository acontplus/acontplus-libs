import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
} from '@angular/core';
import { _animationsDisabled } from '@angular/material/core';
import { Subject } from 'rxjs';
import { ACP_POPOVER_CONTENT, AcpPopoverContent } from './popover-content';
import {
  throwAcpPopoverInvalidPositionEnd,
  throwAcpPopoverInvalidPositionStart,
} from './popover-errors';
import { AcpPopoverDefaultOptions, AcpPopoverPanel } from './popover-interfaces';
import { AcpPopoverPosition, AcpPopoverTriggerEvent, PopoverCloseReason } from './popover-types';

/** Injection token to be used to override the default options for `acp-popover`. */
export const ACP_POPOVER_DEFAULT_OPTIONS = new InjectionToken<AcpPopoverDefaultOptions>(
  'acp-popover-default-options',
  {
    providedIn: 'root',
    factory: () => ({
      backdropClass: 'cdk-overlay-transparent-backdrop',
    }),
  },
);

let popoverPanelUid = 0;

/** Name of the enter animation `@keyframes`. */
const ENTER_ANIMATION = '_acp-popover-enter';

/** Name of the exit animation `@keyframes`. */
const EXIT_ANIMATION = '_acp-popover-exit';

/**
 * ACP Popover component that displays content in an overlay panel.
 *
 * The popover can be triggered by hover or click events and supports
 * various positioning options. It's built on top of Angular CDK Overlay
 * and provides a flexible way to display contextual information.
 *
 * ## Basic Usage
 * @example
 * ```html
 * <acp-popover #popover="acpPopover" [position]="['below', 'after']">
 *   <div>Popover content goes here</div>
 * </acp-popover>
 *
 * <button [acpPopoverTriggerFor]="popover">Show popover</button>
 * ```
 *
 * ## Closing Explicitly
 *
 * ### 1. Close from within popover content:
 * @example
 * ```html
 * <acp-popover #popover="acpPopover">
 *   <div>
 *     <p>Popover content</p>
 *     <button (click)="popover.close()">Close</button>
 *     <button (click)="popover.close('user-action')">Close with reason</button>
 *   </div>
 * </acp-popover>
 * ```
 *
 * ### 2. Close from component using ViewChild:
 * @example
 * ```typescript
 * @Component({
 *   template: `
 *     <acp-popover #popover="acpPopover">
 *       <div>Content with external close</div>
 *     </acp-popover>
 *     <button [acpPopoverTriggerFor]="popover">Open</button>
 *     <button (click)="closePopover()">Close from outside</button>
 *   `
 * })
 * export class MyComponent {
 *   @ViewChild('popover') popover!: AcpPopover;
 *
 *   closePopover() {
 *     this.popover.close('programmatic');
 *   }
 * }
 * ```
 *
 * ### 3. Close using trigger reference:
 * @example
 * ```html
 * <acp-popover #popover="acpPopover">
 *   <div>Popover content</div>
 * </acp-popover>
 *
 * <button [acpPopoverTriggerFor]="popover" #trigger="acpPopoverTrigger">
 *   Show popover
 * </button>
 * <button (click)="trigger.closePopover()">Close via trigger</button>
 * <button (click)="trigger.closePopoverWithReason('external')">Close with reason</button>
 * ```
 *
 * ## Automatic Closing
 * The popover automatically closes on:
 * - ESC key press
 * - Click outside (backdrop) when `closeOnBackdropClick` is true
 * - Mouse leave after delay when `triggerEvent` is 'hover'
 * - Click on panel when `closeOnPanelClick` is true
 */
@Component({
  selector: 'acp-popover',
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'acpPopover',
  imports: [CdkTrapFocus],
})
export class AcpPopover implements AcpPopoverPanel, OnInit, OnDestroy {
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _elementRef = inject(ElementRef);
  private _unusedNgZone = inject(NgZone);
  private _defaultOptions = inject<AcpPopoverDefaultOptions>(ACP_POPOVER_DEFAULT_OPTIONS);

  private _previousElevation?: string;
  private _elevationPrefix = 'mat-elevation-z';
  private _baseElevation: number | null = null;
  private _exitFallbackTimeout: ReturnType<typeof setTimeout> | undefined;
  private _mouseleaveTimer: ReturnType<typeof setTimeout> | undefined;

  /** Whether animations are currently disabled. */
  protected _animationsDisabled = _animationsDisabled();

  /** Config object to be passed into the popover's class. */
  _classList: Record<string, boolean> = {};

  /** Current state of the panel animation. */
  _panelAnimationState: 'void' | 'enter' = 'void';

  /** Emits whenever an animation on the popover completes. */
  readonly _animationDone = new Subject<'void' | 'enter'>();

  /** Whether the popover is animating. */
  _isAnimating = false;

  /** Closing disabled on popover */
  closeDisabled = false;

  /** Config object to be passed into the popover's arrow style */
  arrowStyles?: Record<string, unknown>;

  /** Layout direction of the popover. */
  direction?: Direction;

  /** Class or list of classes to be added to the overlay panel. */
  overlayPanelClass: string | string[] = this._defaultOptions.overlayPanelClass || '';

  /** Class to be added to the backdrop element. */
  @Input() backdropClass = this._defaultOptions.backdropClass;

  /** aria-label for the popover panel. */
  @Input('aria-label') ariaLabel?: string;

  /** aria-labelledby for the popover panel. */
  @Input('aria-labelledby') ariaLabelledby?: string;

  /** aria-describedby for the popover panel. */
  @Input('aria-describedby') ariaDescribedby?: string;

  /** Popover's trigger event. */
  @Input() triggerEvent: AcpPopoverTriggerEvent = this._defaultOptions.triggerEvent ?? 'hover';

  /** Popover's enter delay. */
  @Input() enterDelay = this._defaultOptions.enterDelay ?? 100;

  /** Popover's leave delay. */
  @Input() leaveDelay = this._defaultOptions.leaveDelay ?? 100;

  /** Popover's position. */
  @Input()
  get position() {
    return this._position;
  }
  set position(value: AcpPopoverPosition) {
    if (!['before', 'after', 'above', 'below'].includes(value[0])) {
      throwAcpPopoverInvalidPositionStart();
    }
    if (!['before', 'after', 'above', 'below', 'center'].includes(value[1])) {
      throwAcpPopoverInvalidPositionEnd();
    }
    this._position = value;
    this.setPositionClasses();
  }
  private _position = this._defaultOptions.position ?? ['below', 'after'];

  /** Popover-panel's X offset. */
  @Input() xOffset = this._defaultOptions.xOffset ?? 0;

  /** Popover-panel's Y offset. */
  @Input() yOffset = this._defaultOptions.yOffset ?? 0;

  /** Popover-arrow's width. */
  @Input() arrowWidth = this._defaultOptions.arrowWidth ?? 16;

  /** Popover-arrow's height. */
  @Input() arrowHeight = this._defaultOptions.arrowHeight ?? 16;

  /** Popover-arrow's X offset. */
  @Input() arrowOffsetX = this._defaultOptions.arrowOffsetX ?? 20;

  /** Popover-arrow's Y offset. */
  @Input() arrowOffsetY = this._defaultOptions.arrowOffsetY ?? 20;

  /** Whether the popover arrow should be hidden. */
  @Input({ transform: booleanAttribute })
  hideArrow = this._defaultOptions.hideArrow ?? false;

  /** Whether popover can be closed when click the popover-panel. */
  @Input({ transform: booleanAttribute })
  closeOnPanelClick = this._defaultOptions.closeOnPanelClick ?? false;

  /** Whether popover can be closed when click the backdrop. */
  @Input({ transform: booleanAttribute })
  closeOnBackdropClick = this._defaultOptions.closeOnBackdropClick ?? true;

  /** Whether enable focus trap using `cdkTrapFocus`. */
  @Input({ transform: booleanAttribute })
  focusTrapEnabled = this._defaultOptions.focusTrapEnabled ?? false;

  /** Whether enable focus trap auto capture using `cdkTrapFocusAutoCapture`. */
  @Input({ transform: booleanAttribute })
  focusTrapAutoCaptureEnabled = this._defaultOptions.focusTrapAutoCaptureEnabled ?? false;

  /** Whether the popover has a backdrop. It will always be false if the trigger event is hover. */
  @Input({ transform: booleanAttribute })
  hasBackdrop = this._defaultOptions.hasBackdrop;

  /**
   * This method takes classes set on the host acp-popover element and applies them on the
   * popover template that displays in the overlay container. Otherwise, it's difficult
   * to style the containing popover from outside the component.
   * @param classes list of class names
   */
  @Input()
  set panelClass(classes: string) {
    const previousPanelClass = this._previousPanelClass;
    const newClassList = { ...this._classList };

    if (previousPanelClass && previousPanelClass.length) {
      previousPanelClass.split(' ').forEach((className: string) => {
        newClassList[className] = false;
      });
    }

    this._previousPanelClass = classes;

    if (classes && classes.length) {
      classes.split(' ').forEach((className: string) => {
        newClassList[className] = true;
      });

      this._elementRef.nativeElement.className = '';

      this.setPositionClasses();
    }

    this._classList = newClassList;
  }
  private _previousPanelClass?: string;

  /**
   * This method takes classes set on the host acp-popover element and applies them on the
   * popover template that displays in the overlay container. Otherwise, it's difficult
   * to style the containing popover from outside the component.
   * @deprecated Use `panelClass` instead.
   * @breaking-change 8.0.0
   */
  @Input()
  get classList(): string {
    return this.panelClass;
  }
  set classList(classes: string) {
    this.panelClass = classes;
  }

  /** Event emitted when the popover is closed. */
  @Output() closed = new EventEmitter<PopoverCloseReason>();

  /**
   * Programmatically closes the popover.
   * @param reason Optional reason for closing
   */
  close(reason?: PopoverCloseReason): void {
    this.closed.emit(reason || 'programmatic');
  }

  /** @docs-private */
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

  /**
   * Popover content that will be rendered lazily.
   * @docs-private
   */
  @ContentChild(ACP_POPOVER_CONTENT) lazyContent?: AcpPopoverContent;

  readonly panelId = `acp-popover-panel-${popoverPanelUid++}`;

  /**
   * Lifecycle hook called when the component is initialized.
   * Sets up the initial position classes for the popover.
   */
  ngOnInit() {
    this.setPositionClasses();
  }

  /**
   * Lifecycle hook called when the component is destroyed.
   * Cleans up subscriptions and timers.
   */
  ngOnDestroy() {
    this.closed.complete();
    clearTimeout(this._exitFallbackTimeout);
    clearTimeout(this._mouseleaveTimer);
  }

  /**
   * Handle a keyboard event from the popover, delegating to the appropriate action.
   * @param event The keyboard event to handle
   */
  _handleKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode;

    switch (keyCode) {
      case ESCAPE:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this.closed.emit('keydown');
        }
        break;
    }
  }

  /**
   * Close popover on click if `closeOnPanelClick` is true.
   */
  _handleClick() {
    if (this.closeOnPanelClick) {
      this.closed.emit('click');
    }
  }

  /**
   * Disables close of popover when leaving trigger element and mouse over the popover.
   */
  _handleMouseOver() {
    if (this.triggerEvent === 'hover') {
      // Cancel any pending close timer
      if (this._mouseleaveTimer) {
        clearTimeout(this._mouseleaveTimer);
        this._mouseleaveTimer = undefined;
      }
      this.closeDisabled = true;
    }
  }

  /**
   * Enables close of popover when mouse leaving popover element.
   */
  _handleMouseLeave() {
    if (this.triggerEvent === 'hover') {
      this._mouseleaveTimer = setTimeout(() => {
        this.closeDisabled = false;
        this.closed.emit();
      }, this.leaveDelay);
    }
  }

  /**
   * Sets the current styles for the popover to allow for dynamically changing settings.
   * @param pos The position to set styles for, defaults to current position
   */
  setCurrentStyles(pos = this.position) {
    const left =
      pos[1] === 'after'
        ? `${this.arrowOffsetX - this.arrowWidth / 2}px`
        : pos[1] === 'center'
          ? `calc(50% - ${this.arrowWidth / 2}px)`
          : '';
    const right = pos[1] === 'before' ? `${this.arrowOffsetX - this.arrowWidth / 2}px` : '';

    const bottom =
      pos[1] === 'above'
        ? `${this.arrowOffsetY - this.arrowHeight / 2}px`
        : pos[1] === 'center'
          ? `calc(50% - ${this.arrowHeight / 2}px)`
          : '';
    const top = pos[1] === 'below' ? `${this.arrowOffsetY - this.arrowHeight / 2}px` : '';

    this.arrowStyles =
      pos[0] === 'above' || pos[0] === 'below'
        ? {
            left: this.direction === 'ltr' ? left : right,
            right: this.direction === 'ltr' ? right : left,
          }
        : { top, bottom };
  }

  /**
   * It's necessary to set position-based classes to ensure the popover panel animation
   * folds out from the correct direction.
   * @param pos The position to set classes for, defaults to current position
   */
  setPositionClasses(pos = this.position): void {
    this._classList = {
      ...this._classList,
      ['acp-popover-before-above']: pos[0] === 'before' && pos[1] === 'above',
      ['acp-popover-before-center']: pos[0] === 'before' && pos[1] === 'center',
      ['acp-popover-before-below']: pos[0] === 'before' && pos[1] === 'below',
      ['acp-popover-after-above']: pos[0] === 'after' && pos[1] === 'above',
      ['acp-popover-after-center']: pos[0] === 'after' && pos[1] === 'center',
      ['acp-popover-after-below']: pos[0] === 'after' && pos[1] === 'below',
      ['acp-popover-above-before']: pos[0] === 'above' && pos[1] === 'before',
      ['acp-popover-above-center']: pos[0] === 'above' && pos[1] === 'center',
      ['acp-popover-above-after']: pos[0] === 'above' && pos[1] === 'after',
      ['acp-popover-below-before']: pos[0] === 'below' && pos[1] === 'before',
      ['acp-popover-below-center']: pos[0] === 'below' && pos[1] === 'center',
      ['acp-popover-below-after']: pos[0] === 'below' && pos[1] === 'after',
    };

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Sets the popover-panel's elevation.
   * Applies Material Design elevation classes based on the base elevation level.
   */
  setElevation(): void {
    // The base elevation depends on which version of the spec
    // we're running so we have to resolve it at runtime.
    if (this._baseElevation === null) {
      const styles =
        typeof getComputedStyle === 'function'
          ? getComputedStyle(this._elementRef.nativeElement)
          : null;
      const value = styles?.getPropertyValue('--acp-popover-base-elevation-level') || '8';
      this._baseElevation = parseInt(value);
    }

    // The elevation starts at the base and increases by one for each level.
    // Capped at 24 because that's the maximum elevation defined in the Material design spec.
    const elevation = Math.min(this._baseElevation, 24);
    const newElevation = `${this._elevationPrefix}${elevation}`;
    const customElevation = Object.keys(this._classList).find(className => {
      return className.startsWith(this._elevationPrefix);
    });
    if (!customElevation || customElevation === this._previousElevation) {
      const newClassList = { ...this._classList };
      if (this._previousElevation) {
        newClassList[this._previousElevation] = false;
      }
      newClassList[newElevation] = true;
      this._previousElevation = newElevation;
      this._classList = newClassList;
    }
  }

  /**
   * Callback that is invoked when the panel animation completes.
   * @param state The animation state that completed
   */
  protected _onAnimationDone(state: string) {
    const isExit = state === EXIT_ANIMATION;

    if (isExit || state === ENTER_ANIMATION) {
      if (isExit) {
        clearTimeout(this._exitFallbackTimeout);
        this._exitFallbackTimeout = undefined;
      }
      this._animationDone.next(isExit ? 'void' : 'enter');
      this._isAnimating = false;
    }
  }

  /**
   * Callback that is invoked when the panel animation starts.
   * @param state The animation state that started
   */
  protected _onAnimationStart(state: string) {
    if (state === ENTER_ANIMATION || state === EXIT_ANIMATION) {
      this._isAnimating = true;
    }
  }

  /**
   * Sets the open state of the popover and manages animations.
   * @param isOpen Whether the popover should be open
   */
  _setIsOpen(isOpen: boolean) {
    this._panelAnimationState = isOpen ? 'enter' : 'void';

    if (isOpen) {
      //
    } else if (!this._animationsDisabled) {
      // Some apps do `* { animation: none !important; }` in tests which will prevent the
      // `animationend` event from firing. Since the exit animation is loading-bearing for
      // removing the content from the DOM, add a fallback timer.
      this._exitFallbackTimeout = setTimeout(() => this._onAnimationDone(EXIT_ANIMATION), 200);
    }

    // Animation events won't fire when animations are disabled so we simulate them.
    if (this._animationsDisabled) {
      setTimeout(() => {
        this._onAnimationDone(isOpen ? ENTER_ANIMATION : EXIT_ANIMATION);
      });
    }

    this._changeDetectorRef.markForCheck();
  }
}
