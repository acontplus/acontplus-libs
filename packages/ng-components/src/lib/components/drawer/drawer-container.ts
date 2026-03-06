import { CdkDialogContainer } from '@angular/cdk/dialog';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  ViewEncapsulation,
  inject,
  ANIMATION_MODULE_TYPE,
} from '@angular/core';
import { AcpDrawerConfig } from './drawer-config';

const ENTER_ANIMATION = '_acp-drawer-enter';
const EXIT_ANIMATION = '_acp-drawer-exit';

/**
 * Internal component that wraps user-provided drawer content.
 *
 * This component handles the drawer's animations, positioning, and lifecycle.
 * It extends the CDK's DialogContainer to provide drawer-specific behavior
 * including slide-in/slide-out animations and proper focus management.
 *
 * @docs-private
 */
@Component({
  selector: 'acp-drawer-container',
  templateUrl: 'drawer-container.html',
  styleUrl: 'drawer-container.scss',
  // In Ivy embedded views will be change detected from their declaration place, rather than where
  // they were stamped out. This means that we can't have the drawer container be OnPush,
  // because it might cause the sheets that were opened from a template not to be out of date.
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'acp-drawer-container',
    '[class]': '_drawerPosition',
    '[class.acp-drawer-container-animations-enabled]': '!_animationsDisabled',
    '[class.acp-drawer-container-enter]': '_animationState === "visible"',
    '[class.acp-drawer-container-exit]': '_animationState === "hidden"',
    '[class.acp-drawer-fullscreen]': '_config.fullScreen',
    tabindex: '-1',
    '[id]': '_config.id',
    '[attr.role]': '_config.role',
    '[attr.aria-modal]': '_config.ariaModal',
    '[attr.aria-label]': '_config.ariaLabel',
    '(animationstart)': '_handleAnimationEvent(true, $event.animationName)',
    '(animationend)': '_handleAnimationEvent(false, $event.animationName)',
    '(animationcancel)': '_handleAnimationEvent(false, $event.animationName)',
  },
  imports: [CdkPortalOutlet],
})
export class AcpDrawerContainer extends CdkDialogContainer<AcpDrawerConfig> implements OnDestroy {
  /** Whether animations are disabled in the current environment. */
  protected _animationsDisabled =
    inject(ANIMATION_MODULE_TYPE, { optional: true }) === 'NoopAnimations';

  /** The state of the drawer animations. */
  _animationState: 'void' | 'visible' | 'hidden' = 'void';

  /** Emits whenever the state of the animation changes. */
  _animationStateChanged = new EventEmitter<{
    toState: 'visible' | 'hidden';
    phase: 'start' | 'done';
  }>();

  /** Whether the component has been destroyed. */
  private _destroyed = false;

  /**
   * Gets the CSS class for the drawer position.
   * @returns CSS class name based on the drawer's position
   */
  get _drawerPosition() {
    return `acp-drawer-${this._config.position}`;
  }

  /**
   * Called when content is attached to the container.
   * Initializes the dialog container and starts the entrance animation.
   */
  protected override _contentAttached(): void {
    // Delegate to the original dialog-container initialization (i.e. saving the
    // previous element, setting up the focus trap and moving focus to the container).
    super._contentAttached();

    this.enter();
  }

  /**
   * Begin animation of drawer entrance into view.
   * Sets the animation state to visible and triggers change detection.
   */
  enter(): void {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.markForCheck();
      this._changeDetectorRef.detectChanges();
      if (this._animationsDisabled) {
        this._simulateAnimation(ENTER_ANIMATION);
      }
    }
  }

  /**
   * Begin animation of the drawer exiting from view.
   * Sets the animation state to hidden and triggers the exit animation.
   */
  exit(): void {
    if (!this._destroyed) {
      this._animationState = 'hidden';
      this._changeDetectorRef.markForCheck();
      if (this._animationsDisabled) {
        this._simulateAnimation(EXIT_ANIMATION);
      }
    }
  }

  /**
   * Lifecycle hook called when the component is destroyed.
   * Marks the component as destroyed and calls the parent's ngOnDestroy.
   */
  override ngOnDestroy() {
    super.ngOnDestroy();

    this._destroyed = true;
  }

  /**
   * Simulates animation events when animations are disabled.
   * @param name The animation name to simulate
   */
  private _simulateAnimation(name: typeof ENTER_ANIMATION | typeof EXIT_ANIMATION) {
    this._ngZone.run(() => {
      this._handleAnimationEvent(true, name);
      setTimeout(() => this._handleAnimationEvent(false, name));
    });
  }

  /**
   * Handles animation events for both start and end phases.
   * @param isStart Whether this is the start or end of the animation
   * @param animationName The name of the animation
   */
  protected _handleAnimationEvent(isStart: boolean, animationName: string) {
    const isEnter = animationName === ENTER_ANIMATION;
    const isExit = animationName === EXIT_ANIMATION;

    if (isEnter) {
      this._trapFocus();
    }

    if (isEnter || isExit) {
      this._animationStateChanged.emit({
        toState: isEnter ? 'visible' : 'hidden',
        phase: isStart ? 'start' : 'done',
      });
    }
  }

  /**
   * Override to prevent automatic focus capture.
   * Focus is handled by the enter animation instead.
   */
  protected override _captureInitialFocus(): void {
    // Intentionally empty - focus is handled by the enter animation
  }
}
