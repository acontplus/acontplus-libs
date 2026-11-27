import { BreakpointObserver } from '@angular/cdk/layout';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { map, switchMap } from 'rxjs';
import { AcpSidePanelItemTemplate } from './side-panel-layout-slots';
import { ACP_SIDE_PANEL_DEFAULT_OPTIONS } from './side-panel-layout.tokens';
import type {
  AcpSidePanelItem,
  AcpSidePanelLabels,
  AcpSidePanelPosition,
} from './side-panel-layout.types';

const DEFAULT_LABELS: AcpSidePanelLabels = { toggle: 'Mostrar opciones' };

/**
 * Page section with a list of options on the side and the content of the selected one, as the
 * MaterialPro apps (email, notes, settings). Below `compactQuery` the panel floats over the content
 * and opens with a menu button in the toolbar; with `toggleable` that button also hides it on wide
 * screens.
 *
 * Slots (attribute on the projected element):
 * - `acpSidePanelActions`: right side of the toolbar.
 * - `acpSidePanelHeader`: above the list (e.g. a search field).
 * - `acpSidePanelFooter`: below the list.
 * - default: the content of the selected item.
 *
 * @example
 * <acp-side-panel-layout title="Reportes" [items]="reports" [(selected)]="report">
 *   <button acpSidePanelActions matButton>PDF</button>
 *   <app-report [type]="report()" />
 * </acp-side-panel-layout>
 */
@Component({
  selector: 'acp-side-panel-layout',
  templateUrl: './side-panel-layout.html',
  styleUrl: './side-panel-layout.scss',
  host: {
    class: 'acp-side-panel-host',
    '[style.--acp-side-panel-width]': 'panelWidth()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule],
})
export class AcpSidePanelLayout<T = string | number> {
  readonly #defaults = inject(ACP_SIDE_PANEL_DEFAULT_OPTIONS, { optional: true }) ?? {};

  /** Title above the list. */
  readonly title = input('');
  readonly items = input.required<AcpSidePanelItem<T>[]>();
  /** Id of the selected item; two-way with `[(selected)]`. */
  readonly selected = model<T | null>(null);
  readonly panelWidth = input(this.#defaults.panelWidth);
  readonly compactQuery = input(this.#defaults.compactQuery ?? '(max-width: 991.98px)');
  readonly position = input<AcpSidePanelPosition>(this.#defaults.position ?? 'start');
  readonly showHeading = input(this.#defaults.showHeading ?? true, {
    transform: booleanAttribute,
  });
  readonly labels = input<Partial<AcpSidePanelLabels>>({});
  /**
   * Menu button in the toolbar that hides and shows the panel also on wide screens (MaterialPro
   * notes). Without it the panel is always visible there.
   */
  readonly toggleable = input(this.#defaults.toggleable ?? false, {
    transform: booleanAttribute,
  });
  /** Panel visible on wide screens with `toggleable`; two-way with `[(panelOpened)]`. */
  readonly panelOpened = model(true);

  protected readonly itemTemplate = contentChild(AcpSidePanelItemTemplate<T>);
  protected readonly text = computed(() => ({
    ...DEFAULT_LABELS,
    ...this.#defaults.labels,
    ...this.labels(),
  }));

  readonly #breakpoints = inject(BreakpointObserver);
  /** Panel floating over the content, below `compactQuery`. */
  readonly compact = toSignal(
    toObservable(this.compactQuery).pipe(
      switchMap(query => this.#breakpoints.observe(query)),
      map(state => state.matches),
    ),
    { initialValue: false },
  );
  readonly #compactOpened = signal(false);
  readonly opened = computed(() =>
    this.compact() ? this.#compactOpened() : !this.toggleable() || this.panelOpened(),
  );
  /** Menu button: always in compact mode, on wide screens only with `toggleable`. */
  protected readonly showToggle = computed(() => this.compact() || this.toggleable());
  readonly current = computed(() => this.items().find(item => item.id === this.selected()));

  select(item: AcpSidePanelItem<T>): void {
    if (item.disabled) return;
    if (item.id !== this.selected()) this.selected.set(item.id);
    this.#compactOpened.set(false);
  }

  /** Opens or closes the panel: the floating one in compact mode, otherwise with `toggleable`. */
  toggle(): void {
    if (this.compact()) this.#compactOpened.update(value => !value);
    else if (this.toggleable()) this.panelOpened.update(value => !value);
  }

  protected onClosed(): void {
    this.#compactOpened.set(false);
  }
}
