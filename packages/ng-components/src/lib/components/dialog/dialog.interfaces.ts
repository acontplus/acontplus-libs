import { Binding, Injector, Signal, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { DialogPosition } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

/** Layout direction for a dialog's content. Mirrors `Direction` from `@angular/cdk/bidi`. */
export type AcpDialogDirection = 'ltr' | 'rtl';

/**
 * Focus restoration behavior. Mirrors `RestoreFocusValue` from `@angular/cdk/dialog`.
 * - `boolean`: restore focus to the previously-focused element.
 * - `string`: restore focus to the first element matching the CSS selector.
 * - `HTMLElement`: restore focus to the specific element.
 */
export type AcpDialogRestoreFocus = boolean | string | HTMLElement;

/**
 * Named width presets for dialogs opened through {@link AcpDialogService}.
 * `full` forces a full-screen dialog regardless of the viewport.
 */
export type AcpDialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';

/**
 * Header configuration. When `header` is present in {@link AcpDialogConfig},
 * the content is rendered inside the branded shell: a draggable
 * title bar with an optional icon and a close button.
 *
 * As a shortcut, {@link AcpDialogConfig.title} can be used instead of
 * `header.title`.
 */
export interface AcpDialogHeaderConfig {
  /** Title text shown in the header. */
  title: string;
  /** Optional subtitle shown below the title. */
  subtitle?: string;
  /** Optional Material icon name displayed before the title. */
  icon?: string;
  /** Whether the header shows a close button. @default true */
  closable?: boolean;
  /** Accessible label for the close button. @default 'Close dialog' */
  closeLabel?: string;
  /** Whether the dialog can be dragged by its header. @default true */
  draggable?: boolean;

  /** Predefined color theme for the header. */
  color?: AcpButtonColor;

  /** Additional CSS class names to apply to the header for custom styling. */
  colorClass?: string;

  /** Color of the close icon. Defaults to a contrasting value based on `color`. */
  closeColor?: 'dark' | 'light';
}

/**
 * Outlet used by the declarative `<acp-dialog-actions>` component to register
 * its content with `AcpDialogContainer`. The container then renders that
 * content inside `<mat-dialog-actions>` instead of the configured `actions` list.
 */
export interface AcpDialogActionsOutlet {
  /** Registers the declarative action template and its desired alignment. */
  register(template: TemplateRef<unknown>, align?: 'start' | 'center' | 'end'): void;
  /** Whether a declarative actions template has been registered. */
  readonly hasActions: Signal<boolean>;
}

/**
 * Outlet used by the declarative `<acp-dialog-titlebar>` component to register
 * its template with `AcpDialogContainer`. The container renders it in the
 * header area, outside the scrollable content.
 */
export interface AcpDialogTitlebarOutlet {
  /** Registers the declarative titlebar template and its title. */
  register(template: TemplateRef<unknown>, title?: string): void;
  /** Whether a declarative titlebar template has been registered. */
  readonly hasTitlebar: Signal<boolean>;
}

/**
 * Which gestures are allowed to close the dialog. Both default to `true`.
 */
export interface AcpDialogCloseConfig {
  /** Whether clicking the backdrop closes the dialog. @default true */
  backdropClick?: boolean;
  /** Whether pressing Escape closes the dialog. @default true */
  escapeKey?: boolean;
}

/** Reactive state that can be bound to an action button. */
export type AcpDialogActionState = boolean | Signal<boolean> | Observable<boolean>;

/** Payload emitted when a configured footer action is clicked. */
export interface AcpDialogActionClick<R = unknown> {
  /** The action that was clicked. */
  action: AcpDialogAction<R>;
  /** The original click event. Callers may call `event.preventDefault()` to stop the default close. */
  event: MouseEvent;
}

/** Color variants supported by `acp-button`. */
export type AcpButtonColor =
  'primary' | 'secondary' | 'accent' | 'error' | 'danger' | 'success' | 'warning' | 'info' | 'dark';

/** Button variants supported by `acp-button`. */
export type AcpButtonVariant = 'basic' | 'icon' | 'fab' | 'mini-fab';

/** Button appearances supported by `acp-button`. */
export type AcpButtonAppearance = 'text' | 'filled' | 'elevated' | 'outlined' | 'tonal';

/** Button types supported by `acp-button`. */
export type AcpButtonType = 'button' | 'submit' | 'reset';

/** Button sizes supported by `acp-button`. */
export type AcpButtonSize = 'small' | 'medium' | 'large';

/**
 * Action button rendered in the dialog footer.
 * Uses the same property names as `acp-button`.
 */
export interface AcpDialogAction<R = unknown> {
  /** Label shown in the button. */
  text: string;
  /** Unique key to identify this action in `actionClicked` or `afterClosed`. */
  key?: string;
  /** Color variant. */
  color?: AcpButtonColor;
  /** Button variant. @default 'basic' */
  variant?: AcpButtonVariant;
  /** Button appearance. @default 'filled' */
  appearance?: AcpButtonAppearance;
  /** Optional Material icon name. */
  icon?: string;
  /** Optional Material icon name displayed after the text. */
  suffixIcon?: string;
  /** Whether the action is disabled. Accepts a boolean, a signal or an observable. @default false */
  disabled?: AcpDialogActionState;
  /** Whether the action shows a loading state. Accepts a boolean, a signal or an observable. @default false */
  loading?: AcpDialogActionState;
  /** Accessible label for the button. */
  ariaLabel?: string;
  /** Button size. @default 'large' */
  size?: AcpButtonSize;
  /** Whether the button spans the full width. @default false */
  block?: boolean;
  /** Whether the FAB button is extended. @default false */
  extended?: boolean;
  /** HTML button type. @default 'button' */
  type?: AcpButtonType;
  /** ID of the form the button is associated with. */
  form?: string;
  /** Value returned when the dialog closes after clicking this action. */
  result?: R;
}

/**
 * Lazy loader for a dialog content component. Lets callers split the component
 * into its own bundle and only load it when the dialog is actually opened.
 *
 * Usage:
 * ```ts
 * this.dialogs.open({ loadComponent: () => import('./edit-form').then(m => m.EditForm) }, {
 *   title: 'Edit',
 *   data: { id: 5 },
 * });
 * ```
 * @template C Type of the content component class.
 */
export interface AcpDialogComponentLoader<C = unknown> {
  loadComponent: () => Promise<Type<C>>;
}

/**
 * Factory that returns dialog content (a component class, a `TemplateRef`,
 * a string, another factory, or a lazy loader).
 */
export type AcpDialogContentFunction<C = unknown> = (
  data?: unknown,
) => AcpDialogContentInput<C> | Promise<AcpDialogContentInput<C>>;

/**
 * Accepted `content` values for {@link AcpDialogService.open}.
 *
 * - `Type<C>`: a component class to render inside the dialog.
 * - `AcpDialogComponentLoader<C>`: a lazy loader that resolves to a component.
 * - `TemplateRef<unknown>`: an inline template rendered with dialog context.
 * - `string`: a plain text/HTML message rendered in the content area.
 * - `AcpDialogContentFunction<C>`: a function returning any of the above.
 */
export type AcpDialogContentInput<C = unknown> =
  | Type<C>
  | AcpDialogComponentLoader<C>
  | TemplateRef<unknown>
  | string
  | AcpDialogContentFunction<C>;

/**
 * Content after {@link AcpDialogService} has resolved lazy loaders and factories.
 * @internal
 */
export type AcpDialogResolvedContent<C = unknown> = Type<C> | TemplateRef<unknown> | string;

/**
 * Main configuration object for {@link AcpDialogService.open}.
 *
 * `content` can also be supplied here when calling `open()` with a single
 * config object.
 *
 * @template D Type of the data delivered to the content component.
 */
export interface AcpDialogConfig<D = unknown> {
  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /**
   * Data delivered to the content component. The component always reads it by
   * injecting `ACP_DIALOG_DATA`, whether it renders bare or inside the shell.
   */
  data?: D;

  /** Optional header. When present, the content renders inside the shell. */
  header?: AcpDialogHeaderConfig;

  /** Shortcut for `header.title`. Ignored when `header` is provided. */
  title?: string;

  /** Whether to show the branded header/titlebar. Set to `false` to hide it. @default true */
  showHeader?: boolean;

  /** Optional footer actions rendered as `acp-button` instances. */
  actions?: AcpDialogAction[];

  /** Whether to show the configured footer actions. Set to `false` to hide them. @default true */
  showActions?: boolean;

  /** Alignment of the footer actions. @default 'end' */
  actionsAlign?: 'start' | 'center' | 'end';

  // --- Sizing ---
  /** Named size preset. Ignored when `width` is set. @default 'md' */
  size?: AcpDialogSize;
  /** Explicit width, takes precedence over `size`. Numbers are treated as pixels. */
  width?: string | number;
  /** Dialog height. Numbers are treated as pixels. */
  height?: string | number;
  /** Minimum width. Numbers are treated as pixels. */
  minWidth?: string | number;
  /** Minimum height. Numbers are treated as pixels. */
  minHeight?: string | number;
  /** @default '95vw' */
  maxWidth?: string | number;
  /** Maximum height. Numbers are treated as pixels. */
  maxHeight?: string | number;
  /** Whether the dialog goes full-screen on handset viewports. @default false */
  fullScreenOnMobile?: boolean;
  position?: DialogPosition;

  // --- Styling ---
  /** Extra panel classes. `acp-dialog` and `acp-dialog-{size}` are always added. */
  panelClass?: string | string[];
  backdropClass?: string | string[];

  // --- Behavior ---
  /** @default true */
  hasBackdrop?: boolean;
  /**
   * Whether the user can use Escape or backdrop click to close the dialog.
   * When set, it overrides `closeOn` for both gestures.
   */
  disableClose?: boolean;
  /** Independent close gestures. @default { backdropClick: true, escapeKey: true } */
  closeOn?: AcpDialogCloseConfig;
  /** Whether the dialog closes on browser back/forward navigation. @default true */
  closeOnNavigation?: boolean;
  /** Layout direction for the dialog's content. @default 'ltr' */
  direction?: AcpDialogDirection;
  /**
   * Function used to determine whether the dialog is allowed to close.
   * Receives the attempted result, the config and the component instance.
   */
  closePredicate?: <
    Result = unknown,
    Component = unknown,
    Config extends AcpDialogConfig = AcpDialogConfig,
  >(
    result: Result | undefined,
    config: Config,
    componentInstance: Component | null,
  ) => boolean;

  // --- Injection / logical tree ---
  /**
   * Where the dialog component should live in Angular's logical component tree.
   * Forwarded to `MatDialogConfig.viewContainerRef`; use this when the dialog
   * needs access to providers scoped to a lazy-loaded feature or route.
   */
  viewContainerRef?: ViewContainerRef;
  /** Injector used to instantiate the content component. Takes precedence over `viewContainerRef`. */
  injector?: Injector;
  /** Bindings to apply to a component rendered inside the dialog. Does nothing for template-based content. */
  bindings?: Binding[];

  // --- Focus management ---
  /** @default 'first-tabbable' */
  autoFocus?: boolean | 'first-tabbable' | 'dialog' | 'first-heading';
  /** Whether to wait for the opening animation before trapping focus. @default false */
  delayFocusTrap?: boolean;
  /** @default true */
  restoreFocus?: AcpDialogRestoreFocus;

  // --- Accessibility ---
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  /** Whether to set `aria-modal` on the dialog element. @default false */
  ariaModal?: boolean;
  role?: 'dialog' | 'alertdialog';

  // --- Advanced ---
  /** Scroll behavior: a CDK ScrollStrategy or a shortcut name ('block', 'close', 'noop'). */
  scrollStrategy?: ScrollStrategy | 'block' | 'close' | 'noop';
  /** @default '300ms' */
  enterAnimationDuration?: number | string;
  /** @default '200ms' */
  exitAnimationDuration?: number | string;
}

/**
 * Payload delivered through `MAT_DIALOG_DATA` to {@link AcpDialogContainer}.
 * @internal Not part of the public API contract.
 */
export interface AcpDialogContainerData<D = unknown> {
  /** The resolved content rendered inside the shell. */
  content: AcpDialogResolvedContent<unknown>;
  /** The public configuration provided by the caller. */
  config: AcpDialogConfig<D>;
  /** Shared action-click stream so the caller and content observe the same events. */
  actionClicks?: Subject<AcpDialogActionClick>;
}
