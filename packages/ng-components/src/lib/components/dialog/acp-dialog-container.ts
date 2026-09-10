import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  Signal,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AcpDialogRef } from './dialog-ref';
import { AcpDialogActions } from './acp-dialog-actions';
import { AcpDialogTitlebar } from './acp-dialog-titlebar';
import { ACP_DIALOG_ACTIONS, ACP_DIALOG_DATA, ACP_DIALOG_TITLEBAR } from './dialog.tokens';
import {
  AcpDialogActionsOutlet,
  AcpDialogContainerData,
  AcpDialogHeaderConfig,
  AcpDialogTitlebarOutlet,
} from './dialog.interfaces';

/**
 * Shell that hosts any content inside an `AcpDialog`. Renders the optional
 * branded header (draggable title bar with icon, title and close button) and
 * optional footer actions.
 *
 * Content can be a component class, a `TemplateRef`, or a plain string. It is
 * created with a child `Injector` that provides `ACP_DIALOG_DATA` (the caller's
 * `config.data`) and `AcpDialogRef` (a typed handle to close the dialog).
 *
 * Opened exclusively through `AcpDialogService`; not meant to be used in templates.
 */
@Component({
  selector: 'acp-dialog-container',
  imports: [MatDialogModule, AcpDialogTitlebar, AcpDialogActions],
  templateUrl: './acp-dialog-container.html',
  styleUrl: './acp-dialog-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AcpDialogContainer implements AfterViewInit {
  private readonly parentInjector = inject(Injector);
  private readonly containerData = inject<AcpDialogContainerData>(MAT_DIALOG_DATA);
  private readonly actionClicks = this.containerData.actionClicks;
  private readonly dialogRef = new AcpDialogRef(inject(MatDialogRef), this.actionClicks);

  /** Outlet where the configured content is rendered. */
  private readonly contentHost: Signal<ViewContainerRef> = viewChild.required('contentHost', {
    read: ViewContainerRef,
  });

  /** Outlet where declarative `acp-dialog-actions` content is rendered. */
  private readonly actionOutlet = viewChild('actionOutlet', { read: ViewContainerRef });

  /** Outlet where declarative `acp-dialog-titlebar` content is rendered. */
  private readonly titlebarOutletRef = viewChild('titlebarOutlet', { read: ViewContainerRef });

  /** Template used to render a plain string content. */
  private readonly stringTemplate: Signal<TemplateRef<{ content: string }>> = viewChild.required(
    'stringContent',
    { read: TemplateRef },
  );

  /** Whether the content has registered a declarative `acp-dialog-actions` template. */
  protected readonly hasDeclarativeActions = signal(false);

  /** Whether the content has registered a declarative `acp-dialog-titlebar` template. */
  protected readonly hasDeclarativeTitlebar = signal(false);

  /** Pending declarative actions template, captured before the outlet is ready. */
  private readonly pendingActionTemplate = signal<TemplateRef<unknown> | undefined>(undefined);

  /** Pending declarative titlebar template, captured before the outlet is ready. */
  private readonly pendingTitlebarTemplate = signal<TemplateRef<unknown> | undefined>(undefined);

  /** Alignment requested by a declarative actions template. */
  protected readonly declarativeActionsAlign = signal<'start' | 'center' | 'end' | undefined>(
    undefined,
  );

  /** Title requested by a declarative titlebar template. */
  protected readonly declarativeTitle = signal<string | undefined>(undefined);

  /** Outlet object provided to content so `acp-dialog-actions` can register itself. */
  private readonly actionsOutlet: AcpDialogActionsOutlet = {
    register: (template, align) => {
      this.pendingActionTemplate.set(template);
      this.hasDeclarativeActions.set(true);
      this.declarativeActionsAlign.set(align);
    },
    hasActions: this.hasDeclarativeActions.asReadonly(),
  };

  /** Outlet object provided to content so `acp-dialog-titlebar` can register itself. */
  private readonly titlebarOutlet: AcpDialogTitlebarOutlet = {
    register: (template, title) => {
      this.pendingTitlebarTemplate.set(template);
      this.hasDeclarativeTitlebar.set(true);
      this.declarativeTitle.set(title);
    },
    hasTitlebar: this.hasDeclarativeTitlebar.asReadonly(),
  };

  /** Exposed header configuration, including the `title` shortcut. */
  protected readonly headerConfig = computed<AcpDialogHeaderConfig | undefined>(() => {
    if (this.config.header) {
      return this.config.header;
    }
    if (this.config.title) {
      return { title: this.config.title };
    }
    return undefined;
  });

  /** Title used for the actions footer label. */
  protected readonly resolvedDialogTitle = computed(
    () => this.headerConfig()?.title ?? this.declarativeTitle(),
  );

  /** Alignment used for the actions footer. */
  protected readonly resolvedActionsAlign = computed(
    () => this.declarativeActionsAlign() ?? this.config.actionsAlign ?? 'end',
  );

  /** Whether the current content is a plain string. */
  protected readonly isStringContent = signal(false);

  get config() {
    return this.containerData.config;
  }

  get content() {
    return this.containerData.content;
  }

  constructor() {
    effect(() => {
      const outlet = this.actionOutlet();
      const template = this.pendingActionTemplate();
      if (outlet && template) {
        outlet.clear();
        outlet.createEmbeddedView(template);
      }
    });
    effect(() => {
      const outlet = this.titlebarOutletRef();
      const template = this.pendingTitlebarTemplate();
      if (outlet && template) {
        outlet.clear();
        outlet.createEmbeddedView(template);
      }
    });
  }

  ngAfterViewInit(): void {
    const content = this.content;
    const injector = this.createContentInjector();

    this.contentHost().clear();
    this.isStringContent.set(false);

    if (typeof content === 'string') {
      this.isStringContent.set(true);
      this.contentHost().createEmbeddedView(this.stringTemplate(), { content });
    } else if (content instanceof TemplateRef) {
      this.contentHost().createEmbeddedView(
        content,
        {
          $implicit: this.config.data,
          data: this.config.data,
          ref: this.dialogRef,
        },
        { injector },
      );
    } else {
      this.contentHost().createComponent(content, { injector, bindings: this.config.bindings });
    }
  }

  private createContentInjector(): Injector {
    return Injector.create({
      parent: this.parentInjector,
      providers: [
        { provide: ACP_DIALOG_DATA, useValue: this.config.data },
        { provide: AcpDialogRef, useValue: this.dialogRef },
        { provide: ACP_DIALOG_ACTIONS, useValue: this.actionsOutlet },
        { provide: ACP_DIALOG_TITLEBAR, useValue: this.titlebarOutlet },
      ],
    });
  }
}
