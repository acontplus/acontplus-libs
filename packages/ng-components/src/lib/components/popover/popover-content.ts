import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Directive,
  DOCUMENT,
  InjectionToken,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Injection token that can be used to reference instances of `AcpPopoverContent`. It serves
 * as alternative token to the actual `AcpPopoverContent` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const ACP_POPOVER_CONTENT = new InjectionToken<AcpPopoverContent>('AcpPopoverContent');

/**
 * Base class for popover content that provides common functionality.
 *
 * This abstract class handles the attachment and detachment of popover content
 * using Angular CDK portals. It manages the DOM manipulation required to display
 * popover content in an overlay.
 *
 * @docs-private
 */
@Directive()
export abstract class _AcpPopoverContentBase implements OnDestroy {
  private _template = inject(TemplateRef<any>);
  private _appRef = inject(ApplicationRef);
  private _injector = inject(Injector);
  private _viewContainerRef = inject(ViewContainerRef);
  private _document = inject(DOCUMENT);
  private _changeDetectorRef = inject(ChangeDetectorRef, { optional: true });

  private _portal!: TemplatePortal<any>;
  private _outlet!: DomPortalOutlet;

  /** Emits when the popover content has been attached. */
  readonly _attached = new Subject<void>();

  /**
   * Attaches the content with a particular context.
   * @param context Context data to pass to the template
   * @docs-private
   */
  attach(context: any = {}) {
    if (!this._portal) {
      this._portal = new TemplatePortal(this._template, this._viewContainerRef);
    }

    this.detach();

    if (!this._outlet) {
      this._outlet = new DomPortalOutlet(
        this._document.createElement('div'),
        this._appRef,
        this._injector,
      );
    }

    const element: HTMLElement = this._template.elementRef.nativeElement;

    // Because we support opening the same popover from different triggers (which in turn have their
    // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
    // risk it staying attached to a pane that's no longer in the DOM.
    element.parentNode!.insertBefore(this._outlet.outletElement, element);

    // When `AcpPopoverContent` is used in an `OnPush` component, the insertion of the popover
    // content via `createEmbeddedView` does not cause the content to be seen as "dirty"
    // by Angular. This causes the `@ContentChildren` for popover items within the popover to
    // not be updated by Angular. By explicitly marking for check here, we tell Angular that
    // it needs to check for new popover items and update the `@ContentChild` in `AcpPopover`.
    // @breaking-change 9.0.0 Make change detector ref required
    if (this._changeDetectorRef) {
      this._changeDetectorRef.markForCheck();
    }

    this._portal.attach(this._outlet, context);
    this._attached.next();
  }

  /**
   * Detaches the content from the DOM.
   * @docs-private
   */
  detach() {
    if (this._portal.isAttached) {
      this._portal.detach();
    }
  }

  /**
   * Lifecycle hook called when the component is destroyed.
   * Cleans up the portal outlet to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this._outlet) {
      this._outlet.dispose();
    }
  }
}

/**
 * Popover content that will be rendered lazily once the popover is opened.
 *
 * This directive allows you to define content that should be rendered inside
 * a popover panel. The content is only created when the popover is actually
 * opened, which can improve performance for complex content.
 *
 * @example
 * ```html
 * <ng-template acpPopoverContent>
 *   <div>This content will be shown in the popover</div>
 * </ng-template>
 * ```
 */
@Directive({
  selector: 'ng-template[acpPopoverContent]',
  standalone: true,
  providers: [{ provide: ACP_POPOVER_CONTENT, useExisting: AcpPopoverContent }],
})
export class AcpPopoverContent extends _AcpPopoverContentBase {
  constructor() {
    super();
  }
}
