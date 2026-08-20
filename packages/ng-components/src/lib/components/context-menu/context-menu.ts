import { Component, input, output, inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  AcpContextMenuItem,
  AcpContextMenuItemContext,
  AcpContextMenuRef,
} from './context-menu.types';
import { AcpContextMenuService } from './context-menu.service';

/**
 * Declarative context menu component
 *
 * @example
 * ```html
 * <div #trigger>Right-click here</div>
 * <acp-contextmenu #cm [model]="items" [target]="trigger" (onHide)="onHide()" />
 *
 * <button (click)="showMenu(event)">Show Menu</button>
 * ```
 *
 * @example
 * ```html
 * <acp-contextmenu #cm [model]="items" (onHide)="onHide()" />
 *
 * <button (contextmenu)="onContextMenu($event)">Right-click</button>
 * ```
 */
@Component({
  selector: 'acp-contextmenu',
  standalone: true,
  template: '',
  exportAs: 'acpContextMenu',
})
export class AcpContextMenu implements OnDestroy {
  private readonly contextMenuService = inject(AcpContextMenuService);
  private destroy$ = new Subject<void>();
  private menuRef: AcpContextMenuRef | null = null;

  /** Menu items to display */
  readonly model = input.required<AcpContextMenuItem[]>();

  /** Target element to attach the context menu to */
  readonly target = input<HTMLElement>();

  /** Emitted when menu is hidden/closed */
  readonly hide = output<void>();

  /** Emitted when a menu item is selected */
  readonly itemSelected = output<AcpContextMenuItemContext>();

  constructor() {
    // Subscribe to item selection
    this.contextMenuService
      .getItemSelected$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(context => {
        this.itemSelected.emit(context);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.close();
  }

  /**
   * Show the context menu at the specified position
   *
   * @param event - Mouse event or custom event with clientX/clientY
   * @param data - Optional data to pass to menu items (e.g., row data)
   */
  show(event: MouseEvent | { clientX: number; clientY: number }, data?: unknown): void {
    const x = event.clientX;
    const y = event.clientY;

    this.contextMenuService
      .open(this.model(), {
        x,
        y,
        data: data || null,
        element: this.target(),
      })
      .then(menuRef => {
        this.menuRef = menuRef;
      });
  }

  /**
   * Show the context menu positioned relative to an element
   *
   * @param element - Element to position the menu relative to
   * @param data - Optional data to pass to menu items
   */
  showForElement(element: HTMLElement, data?: unknown): void {
    const rect = element.getBoundingClientRect();
    this.contextMenuService
      .open(this.model(), {
        x: rect.right,
        y: rect.top,
        data: data || null,
        element,
      })
      .then(menuRef => {
        this.menuRef = menuRef;
      });
  }

  /**
   * Close the context menu
   */
  close(): void {
    if (this.menuRef) {
      this.menuRef.close();
      this.menuRef = null;
      this.hide.emit();
    }
  }

  /**
   * Check if the menu is currently open
   */
  isOpen(): boolean {
    return this.menuRef?.isOpen() ?? false;
  }

  /**
   * Update the menu items
   */
  updateItems(items: AcpContextMenuItem[]): void {
    if (this.menuRef) {
      this.menuRef.updateItems(items);
    }
  }

  /**
   * Update the context data
   */
  updateData(data: unknown): void {
    if (this.menuRef) {
      this.menuRef.updateData(data);
    }
  }
}
