import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AcpDrawer, type AcpDrawerRef } from '../../drawer';
import {
  ACP_LAYOUT_RADIUS_RANGE,
  ACP_THEME_COLORS,
  type AcpLayoutOptions,
} from '../layout/layout.config';
import { AcpLayoutSettings } from '../layout/layout-settings';

export interface AcpCustomizerLabels {
  open: string;
  drag: string;
  title: string;
  close: string;
  theme: string;
  light: string;
  dark: string;
  auto: string;
  themeColor: string;
  header: string;
  visible: string;
  hidden: string;
  headerPosition: string;
  above: string;
  fixed: string;
  static: string;
  navigation: string;
  side: string;
  top: string;
  userPanel: string;
  show: string;
  hide: string;
  direction: string;
  cards: string;
  shadow: string;
  border: string;
  container: string;
  full: string;
  boxed: string;
  radius: string;
}

export const ACP_CUSTOMIZER_LABELS: AcpCustomizerLabels = {
  open: 'Configuración',
  drag: 'Arrástrame',
  title: 'Configuración',
  close: 'Cerrar',
  theme: 'Tema',
  light: 'Claro',
  dark: 'Oscuro',
  auto: 'Auto',
  themeColor: 'Color del tema',
  header: 'Encabezado',
  visible: 'Visible',
  hidden: 'Oculto',
  headerPosition: 'Posición del encabezado',
  above: 'Arriba',
  fixed: 'Fijo',
  static: 'Estático',
  navigation: 'Navegación',
  side: 'Lateral',
  top: 'Superior',
  userPanel: 'Panel de usuario',
  show: 'Mostrar',
  hide: 'Ocultar',
  direction: 'Dirección',
  cards: 'Tarjetas',
  shadow: 'Sombra',
  border: 'Borde',
  container: 'Contenedor',
  full: 'Completo',
  boxed: 'Encajonado',
  radius: 'Radio del borde',
};

/** Draggable settings button that opens a drawer to edit the `acp-layout` options. */
@Component({
  selector: 'acp-customizer',
  templateUrl: './customizer.html',
  styleUrl: './customizer.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkDrag,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
  ],
})
export class AcpCustomizer {
  readonly #settings = inject(AcpLayoutSettings);
  readonly #drawer = inject(AcpDrawer);
  #drawerRef?: AcpDrawerRef;
  #dragged = false;

  /** Texts of the panel; Spanish by default. */
  readonly labels = input<Partial<AcpCustomizerLabels>>({});
  /** Width of the panel; MaterialPro uses Material's sidenav width. */
  readonly width = input('360px');

  protected readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  protected readonly text = computed(() => ({ ...ACP_CUSTOMIZER_LABELS, ...this.labels() }));
  protected readonly options = this.#settings.options;
  protected readonly themeColors = ACP_THEME_COLORS;
  protected readonly radiusRange = ACP_LAYOUT_RADIUS_RANGE;

  // Combinations the layout cannot render.
  protected readonly headerAbove = computed(() => this.options().headerPos === 'above');
  protected readonly navTop = computed(() => this.options().navPos === 'top');

  protected set<K extends keyof AcpLayoutOptions>(key: K, value: AcpLayoutOptions[K]): void {
    this.#settings.set({ [key]: value } as Partial<AcpLayoutOptions>);
  }

  protected onDragStarted(): void {
    this.#dragged = true;
  }

  protected open(): void {
    // A drag ends with a click on the button; ignore it.
    if (this.#dragged) {
      this.#dragged = false;
      return;
    }
    this.#drawerRef = this.#drawer.open(this.panel(), {
      position: this.options().dir === 'rtl' ? 'left' : 'right',
      width: this.width(),
      panelClass: 'acp-customizer-pane',
    });
  }

  protected close(): void {
    this.#drawerRef?.dismiss();
  }
}
