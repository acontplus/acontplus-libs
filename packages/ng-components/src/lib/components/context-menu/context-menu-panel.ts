import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  signal,
  computed,
  HostListener,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { AcpContextMenuItem, AcpContextMenuItemContext } from './context-menu.types';
import {
  AcpContextMenuService,
  CONTEXT_MENU_ITEMS,
  CONTEXT_MENU_DATA,
} from './context-menu.service';

/**
 * Internal component that renders the context menu panel
 * Not meant to be used directly - use ContextMenuService or ngContextMenu directive
 */
@Component({
  selector: 'acp-context-menu-panel',
  templateUrl: './context-menu-panel.html',
  styleUrl: './context-menu-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, CdkTrapFocus],
  host: {
    class: 'acp-context-menu-panel-host',
    role: 'menu',
    '[attr.aria-label]': '"Context Menu"',
  },
})
export class AcpContextMenuPanel implements OnInit, OnDestroy {
  private readonly contextMenuService = inject(AcpContextMenuService);
  private readonly ngZone = inject(NgZone);
  private readonly elementRef = inject(ElementRef);

  @ViewChild('menuContainer', { read: ElementRef }) menuContainer?: ElementRef;

  // Input signals - initialized from injected tokens
  items = signal<AcpContextMenuItem[]>(inject(CONTEXT_MENU_ITEMS, { optional: true }) || []);
  contextData = signal<unknown>(inject(CONTEXT_MENU_DATA, { optional: true }) || null);

  // State signals
  selectedIndex = signal<number>(-1);
  expandedIndex = signal<number>(-1);
  private destroy$ = new Subject<void>();

  // Computed signals
  visibleItems = computed(() => this.items().filter(item => item.visible !== false));

  ngOnInit(): void {
    // Focus the menu container for keyboard navigation
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.menuContainer?.nativeElement?.focus();
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle keyboard navigation
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.expandSelected();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.collapseSelected();
        break;
      case 'Enter':
        event.preventDefault();
        this.activateSelected();
        break;
      case 'Escape':
        event.preventDefault();
        this.contextMenuService.closeAll();
        break;
      case 'Home':
        event.preventDefault();
        this.selectFirst();
        break;
      case 'End':
        event.preventDefault();
        this.selectLast();
        break;
    }
  }

  /**
   * Handle item click
   */
  onItemClick(item: AcpContextMenuItem, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (item.disabled || item.separator) {
      return;
    }

    if (item.children && item.children.length > 0) {
      this.expandedIndex.set(
        this.expandedIndex() === this.items().indexOf(item) ? -1 : this.items().indexOf(item),
      );
      return;
    }

    const context: AcpContextMenuItemContext = {
      item,
      event,
      element: this.elementRef.nativeElement,
      data: this.contextData(),
    };

    this.contextMenuService.selectItem(context);
  }

  /**
   * Handle item hover
   */
  onItemHover(index: number): void {
    this.selectedIndex.set(index);
  }

  /**
   * Check if item has children
   */
  hasChildren(item: AcpContextMenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  /**
   * Get item classes
   */
  getItemClasses(item: AcpContextMenuItem, index: number): Record<string, boolean> {
    return {
      'acp-context-menu-item': true,
      'acp-context-menu-item--disabled': item.disabled || false,
      'acp-context-menu-item--separator': item.separator || false,
      'acp-context-menu-item--danger': item.danger || false,
      'acp-context-menu-item--selected': this.selectedIndex() === index,
      'acp-context-menu-item--expanded': this.expandedIndex() === index && this.hasChildren(item),
      [item.class || '']: !!item.class,
    };
  }

  /**
   * Select next item
   */
  private selectNext(): void {
    const items = this.visibleItems();
    const currentIndex = this.selectedIndex();
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    this.selectedIndex.set(nextIndex);
  }

  /**
   * Select previous item
   */
  private selectPrevious(): void {
    const items = this.visibleItems();
    const currentIndex = this.selectedIndex();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    this.selectedIndex.set(prevIndex);
  }

  /**
   * Select first item
   */
  private selectFirst(): void {
    this.selectedIndex.set(0);
  }

  /**
   * Select last item
   */
  private selectLast(): void {
    const items = this.visibleItems();
    this.selectedIndex.set(Math.max(0, items.length - 1));
  }

  /**
   * Expand selected item
   */
  private expandSelected(): void {
    const selectedItem = this.visibleItems()[this.selectedIndex()];
    if (selectedItem && this.hasChildren(selectedItem)) {
      this.expandedIndex.set(this.selectedIndex());
    }
  }

  /**
   * Collapse selected item
   */
  private collapseSelected(): void {
    if (this.expandedIndex() === this.selectedIndex()) {
      this.expandedIndex.set(-1);
    }
  }

  /**
   * Activate selected item
   */
  private activateSelected(): void {
    const selectedItem = this.visibleItems()[this.selectedIndex()];
    if (selectedItem && !selectedItem.disabled && !selectedItem.separator) {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      this.onItemClick(selectedItem, event as any);
    }
  }

  /**
   * Track by function for items
   */
  trackByIndex(index: number): number {
    return index;
  }
}
