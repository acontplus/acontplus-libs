import { Service, inject, signal, NgZone, Type, Injector, InjectionToken } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import {
  AcpContextMenuItem,
  AcpContextMenuOpenConfig,
  AcpContextMenuRef,
  AcpContextMenuItemContext,
} from './context-menu.types';

// Injection tokens for passing data to the component
export const CONTEXT_MENU_ITEMS = new InjectionToken<AcpContextMenuItem[]>('context-menu-items');
export const CONTEXT_MENU_DATA = new InjectionToken<unknown>('context-menu-data');

/**
 * Service to manage context menu instances
 * Handles overlay creation, positioning, and lifecycle management
 */
@Service()
export class AcpContextMenuService {
  private readonly overlay = inject(Overlay);
  private readonly ngZone = inject(NgZone);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  // Signal to track the currently open menu
  private readonly openMenuRef = signal<OverlayRef | null>(null);
  private readonly menuItems = signal<AcpContextMenuItem[]>([]);
  private readonly contextData = signal<unknown>(null);

  // Subject for menu item selection
  private readonly itemSelected$ = new Subject<AcpContextMenuItemContext>();

  constructor() {
    // Auto-close menu when clicking outside
    this.setupOutsideClickHandler();
  }

  /**
   * Open a context menu at the specified position
   */
  async open(
    items: AcpContextMenuItem[],
    config: AcpContextMenuOpenConfig,
  ): Promise<AcpContextMenuRef> {
    // Close any existing menu
    this.closeAll();

    // Dynamically import the component to avoid circular dependency
    const { AcpContextMenuPanel } = await import('./context-menu-panel');

    // Create overlay reference
    const overlayRef = this.createOverlay(config);

    // Create and attach component
    overlayRef.attach(
      new ComponentPortal(
        AcpContextMenuPanel as Type<any>,
        null,
        this.createInjector(items, config),
      ),
    );

    // Store reference
    this.openMenuRef.set(overlayRef);
    this.menuItems.set(items);
    this.contextData.set(config.data);

    // Return menu reference
    return this.createMenuRef(overlayRef);
  }

  /**
   * Close all open context menus
   */
  closeAll(): void {
    const menuRef = this.openMenuRef();
    if (menuRef) {
      menuRef.dispose();
      this.openMenuRef.set(null);
    }
  }

  /**
   * Check if any menu is open
   */
  isOpen(): boolean {
    return this.openMenuRef() !== null;
  }

  /**
   * Get the item selection subject
   */
  getItemSelected$() {
    return this.itemSelected$.asObservable();
  }

  /**
   * Emit item selection
   */
  selectItem(context: AcpContextMenuItemContext): void {
    this.itemSelected$.next(context);

    // Execute command if provided
    if (context.item.command) {
      context.item.command(context);
    }

    // Close menu if configured
    if (context.item.closeOnClick !== false) {
      this.closeAll();
    }
  }

  /**
   * Create overlay reference with position strategy
   */
  private createOverlay(config: AcpContextMenuOpenConfig): OverlayRef {
    const positionStrategy = this.createPositionStrategy(config);

    const panelClasses = ['acp-context-menu-panel'];
    if (Array.isArray(config.panelClass)) {
      panelClasses.push(...config.panelClass);
    } else if (config.panelClass) {
      panelClasses.push(config.panelClass);
    }

    // Add z-index class if provided
    if (config.zIndex) {
      panelClasses.push(`acp-context-menu-z-${config.zIndex}`);
    }

    return this.overlay.create({
      positionStrategy,
      hasBackdrop: config.closeOnOutsideClick !== false,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: panelClasses,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      maxHeight: '80vh',
    });
  }

  /**
   * Create position strategy for the overlay
   */
  private createPositionStrategy(config: AcpContextMenuOpenConfig): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: config.x, y: config.y })
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 0,
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 0,
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 0,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 0,
        },
      ])
      .withFlexibleDimensions(true)
      .withPush(true);

    return positionStrategy;
  }

  /**
   * Create injector for the menu component
   */
  private createInjector(items: AcpContextMenuItem[], config: AcpContextMenuOpenConfig): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: CONTEXT_MENU_ITEMS, useValue: items },
        { provide: CONTEXT_MENU_DATA, useValue: config.data },
      ],
    });
  }

  /**
   * Create menu reference object
   */
  private createMenuRef(overlayRef: OverlayRef): AcpContextMenuRef {
    return {
      close: () => {
        overlayRef.dispose();
        this.openMenuRef.set(null);
      },
      updateItems: (newItems: AcpContextMenuItem[]) => {
        this.menuItems.set(newItems);
      },
      getItems: () => this.menuItems(),
      updateData: (data: unknown) => {
        this.contextData.set(data);
      },
      getData: () => this.contextData(),
      isOpen: () => overlayRef.hasAttached(),
    };
  }

  /**
   * Setup handler for closing menu on outside click
   */
  private setupOutsideClickHandler(): void {
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('click', (event: MouseEvent) => {
        const menuRef = this.openMenuRef();
        if (menuRef && !this.isClickInsideMenu(event)) {
          this.ngZone.run(() => {
            this.closeAll();
          });
        }
      });
    });
  }

  /**
   * Check if click is inside the menu
   */
  private isClickInsideMenu(event: MouseEvent): boolean {
    const menuRef = this.openMenuRef();
    if (!menuRef) return false;

    const menuElement = menuRef.overlayElement;
    return menuElement.contains(event.target as Node);
  }
}
