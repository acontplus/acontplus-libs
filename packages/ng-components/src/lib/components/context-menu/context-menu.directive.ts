import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  AcpContextMenuItem,
  AcpContextMenuOpenConfig,
  AcpContextMenuRef,
  AcpContextMenuTriggerConfig,
  AcpContextMenuItemContext,
} from './context-menu.types';
import { AcpContextMenuService } from './context-menu.service';

/**
 * Directive to attach a context menu to any element
 *
 * @example
 * ```html
 * <div [acpContextMenu]="menuItems" [contextMenuData]="row">
 *   Right-click me
 * </div>
 * ```
 *
 * @example
 * ```html
 * <div
 *   [acpContextMenu]="items"
 *   [contextMenuTrigger]="{ leftClick: true }"
 *   (contextMenuItemSelected)="onItemSelected($event)">
 *   Left-click me
 * </div>
 * ```
 */
@Directive({
  selector: '[acpContextMenu]',
  standalone: true,
  exportAs: 'acpContextMenu',
})
export class AcpContextMenuDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly contextMenuService = inject(AcpContextMenuService);

  private destroy$ = new Subject<void>();
  private menuRef: AcpContextMenuRef | null = null;
  private hoverTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Menu items to display */
  @Input() acpContextMenu: AcpContextMenuItem[] = [];

  /** Custom data to pass to menu items */
  @Input() contextMenuData?: unknown;

  /** Trigger configuration */
  @Input() contextMenuTrigger: AcpContextMenuTriggerConfig = {
    rightClick: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
  };

  /** Emitted when a menu item is selected */
  @Output() contextMenuItemSelected = new EventEmitter<AcpContextMenuItemContext>();

  /** Emitted when menu is opened */
  @Output() contextMenuOpened = new EventEmitter<AcpContextMenuRef>();

  /** Emitted when menu is closed */
  @Output() contextMenuClosed = new EventEmitter<void>();

  constructor() {
    // Subscribe to item selection
    this.contextMenuService
      .getItemSelected$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(context => {
        this.contextMenuItemSelected.emit(context);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  /**
   * Handle right-click
   */
  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    if (!this.contextMenuTrigger.rightClick) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.openMenu(event.clientX, event.clientY, event, this.contextMenuData);
  }

  /**
   * Handle left-click
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.contextMenuTrigger.leftClick) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.openMenu(event.clientX, event.clientY, event);
  }

  /**
   * Handle mouse enter for hover trigger
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.contextMenuTrigger.hover) {
      return;
    }

    const delay = this.contextMenuTrigger.hoverDelay ?? 300;

    this.hoverTimeout = setTimeout(() => {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.openMenu(rect.left, rect.bottom, new MouseEvent('mouseenter'));
    }, delay);
  }

  /**
   * Handle mouse leave for hover trigger
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.contextMenuTrigger.hover) {
      return;
    }

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    const delay = this.contextMenuTrigger.hoverLeaveDelay ?? 300;

    setTimeout(() => {
      if (this.menuRef?.isOpen()) {
        this.menuRef.close();
        this.contextMenuClosed.emit();
      }
    }, delay);
  }

  /**
   * Open the context menu
   */
  openMenu(x: number, y: number, _event: MouseEvent | KeyboardEvent, rowData?: unknown): void {
    if (!this.acpContextMenu || this.acpContextMenu.length === 0) {
      return;
    }

    // Use provided row data or fall back to contextMenuData
    const data = rowData || this.contextMenuData;

    const config: AcpContextMenuOpenConfig = {
      x,
      y,
      element: this.elementRef.nativeElement,
      data,
      closeOnOutsideClick: this.contextMenuTrigger.closeOnOutsideClick !== false,
      closeOnEscape: this.contextMenuTrigger.closeOnEscape !== false,
    };

    this.contextMenuService.open(this.acpContextMenu, config).then(menuRef => {
      this.menuRef = menuRef;
      this.contextMenuOpened.emit(this.menuRef);
    });
  }

  /**
   * Close the context menu
   */
  closeMenu(): void {
    if (this.menuRef) {
      this.menuRef.close();
      this.contextMenuClosed.emit();
    }
  }

  /**
   * Update menu items
   */
  updateItems(items: AcpContextMenuItem[]): void {
    if (this.menuRef) {
      this.menuRef.updateItems(items);
    }
  }

  /**
   * Update context data
   */
  updateData(data: unknown): void {
    if (this.menuRef) {
      this.menuRef.updateData(data);
    }
  }

  /**
   * Check if menu is open
   */
  isOpen(): boolean {
    return this.menuRef?.isOpen() ?? false;
  }
}
