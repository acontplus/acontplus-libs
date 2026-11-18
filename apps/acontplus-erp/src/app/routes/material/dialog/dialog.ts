import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  AcpDialogService,
  AcpDialogRef,
  ACP_DIALOG_DATA,
  AcpCard,
  AcpDialogActions,
  AcpDialogTitlebar,
  AcpButton,
} from '@acontplus/ng-components';

@Component({
  selector: 'app-dialog-page',
  imports: [AcpCard, MatButtonModule, MatIconModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPage {
  private dialogs = inject(AcpDialogService);

  openSimple() {
    this.dialogs.open(DialogSimpleContent, {
      header: {
        title: 'Diálogo simple',
        icon: 'info',
      },
      size: 'sm',
    });
  }

  openWithActions() {
    this.dialogs
      .open(DialogActionsContent, {
        header: {
          title: 'Diálogo con acciones',
          icon: 'settings',
        },
        size: 'md',
        actions: [
          { text: 'Cancelar', appearance: 'text' },
          { text: 'Guardar', color: 'success', result: 'saved' },
        ],
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'saved') {
          console.log('Guardado exitosamente');
        }
      });
  }

  openConfirmation() {
    this.dialogs
      .open(DialogConfirmContent, {
        header: {
          title: 'Confirmar acción',
          icon: 'warning',
          color: 'warning',
        },
        size: 'sm',
        data: {
          message: '¿Está seguro de que desea eliminar este registro?',
        },
        actions: [
          { text: 'Cancelar', appearance: 'text' },
          { text: 'Eliminar', color: 'error', result: true },
        ],
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed === true) {
          console.log('Registro eliminado');
        }
      });
  }

  openFullScreen() {
    this.dialogs.open(DialogFullScreenContent, {
      header: {
        title: 'Diálogo pantalla completa',
        icon: 'fullscreen',
      },
      size: 'full',
      actions: [
        { text: 'Cancelar', appearance: 'text' },
        { text: 'Guardar', color: 'primary', result: 'saved' },
      ],
    });
  }

  openWithHeaderColor() {
    console.log('hola');
    this.dialogs.open(DialogHeaderColorContent, {
      header: {
        title: 'Header con color',
        subtitle: 'Este diálogo usa un header con color primario',
        icon: 'palette',
        color: 'primary',
      },
      size: 'sm',
      actions: [{ text: 'Entendido', color: 'primary' }],
    });
  }

  openWithCustomData() {
    this.dialogs.open(DialogDataContent, {
      header: {
        title: 'Datos personalizados',
        icon: 'data_object',
      },
      size: 'md',
      data: {
        user: { name: 'María Torres', email: 'maria@ejemplo.com', role: 'Administradora' },
      },
      actions: [{ text: 'Cerrar' }],
    });
  }

  openDisabledClose() {
    this.dialogs.open(DialogDisabledCloseContent, {
      header: {
        title: 'No se puede cerrar',
        icon: 'lock',
      },
      size: 'sm',
      disableClose: true,
      actions: [
        { text: 'Cancelar', appearance: 'text' },
        { text: 'Aceptar', color: 'success', result: 'accepted' },
      ],
    });
  }

  openWithSizes() {
    this.dialogs.open(DialogSizesContent, {
      header: {
        title: 'Tamaños de diálogo',
        icon: 'tune',
      },
      size: 'lg',
      actions: [{ text: 'Cerrar' }],
    });
  }

  openInvoiceForm() {
    this.dialogs.open(DialogInvoiceFormContent, {
      size: 'md',
      showHeader: false,
      showActions: false,
    });
  }
}

/* ------------------------------------------------------------------ */
/* Content components                                                 */
/* ------------------------------------------------------------------ */

@Component({
  selector: 'app-dialog-simple-content',
  standalone: true,
  template: `
    <p>Este es un diálogo simple con contenido de texto.</p>
    <p>Puede contener cualquier contenido HTML o componentes Angular.</p>
  `,
})
export class DialogSimpleContent {}

@Component({
  selector: 'app-dialog-actions-content',
  standalone: true,
  template: `
    <p>Este diálogo tiene acciones configuradas en el footer.</p>
    <p>Las acciones se definen en la configuración del diálogo.</p>
  `,
})
export class DialogActionsContent {}

@Component({
  selector: 'app-dialog-confirm-content',
  standalone: true,
  template: ` <p>{{ message }}</p> `,
})
export class DialogConfirmContent {
  private raw = inject(ACP_DIALOG_DATA, { optional: true });
  protected readonly message = (this.raw as { message: string } | null)?.message ?? '';
}

@Component({
  selector: 'app-dialog-full-screen-content',
  standalone: true,
  imports: [AcpCard],
  template: `
    <div class="full-screen-content">
      <h2>Contenido en pantalla completa</h2>
      <p>Este diálogo ocupa toda la pantalla.</p>
      <acp-card title="Ejemplo de contenido" subtitle="Puede contener cualquier componente">
        El contenido puede ser tan complejo como sea necesario.
      </acp-card>
      <div class="scrollable-content">
        @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track i) {
          <acp-card [title]="'Elemento ' + i">
            Este es un elemento de ejemplo para demostrar el scroll en pantalla completa.
          </acp-card>
        }
      </div>
    </div>
  `,
  styles: `
    .full-screen-content {
      padding: 24px;
    }
    .scrollable-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
  `,
})
export class DialogFullScreenContent {}

@Component({
  selector: 'app-dialog-header-color-content',
  standalone: true,
  template: `
    <p>Este diálogo demuestra un header con color personalizado.</p>
    <p>
      Los colores disponibles son: primary, secondary, accent, error, success, warning, info, dark.
    </p>
  `,
})
export class DialogHeaderColorContent {}

@Component({
  selector: 'app-dialog-data-content',
  standalone: true,
  imports: [AcpCard],
  template: `
    <acp-card title="Información del usuario">
      <div class="user-info">
        <p><strong>Nombre:</strong> {{ user?.name }}</p>
        <p><strong>Email:</strong> {{ user?.email }}</p>
        <p><strong>Rol:</strong> {{ user?.role }}</p>
      </div>
    </acp-card>
  `,
  styles: `
    .user-info p {
      margin: 8px 0;
    }
  `,
})
export class DialogDataContent {
  private raw = inject(ACP_DIALOG_DATA, { optional: true });
  protected readonly user = (
    this.raw as {
      user: { name: string; email: string; role: string };
    } | null
  )?.user;
}

@Component({
  selector: 'app-dialog-disabled-close-content',
  standalone: true,
  template: `
    <p>Este diálogo no se puede cerrar haciendo clic fuera o presionando Escape.</p>
    <p>Debe usar uno de los botones de acción para cerrar.</p>
  `,
})
export class DialogDisabledCloseContent {}

@Component({
  selector: 'app-dialog-sizes-content',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <p>Este diálogo usa el tamaño grande (lg).</p>
    <p>Tamaños disponibles: xs, sm, md, lg, xl, xxl, full.</p>
    <div class="sizes-demo">
      <button matButton="outlined" (click)="openSize('xs')">XS (320px)</button>
      <button matButton="outlined" (click)="openSize('sm')">SM (450px)</button>
      <button matButton="outlined" (click)="openSize('md')">MD (600px)</button>
      <button matButton="outlined" (click)="openSize('lg')">LG (800px)</button>
      <button matButton="outlined" (click)="openSize('xl')">XL (1000px)</button>
      <button matButton="outlined" (click)="openSize('xxl')">XXL (1280px)</button>
    </div>
  `,
  styles: `
    .sizes-demo {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
  `,
})
export class DialogSizesContent {
  private dialogs = inject(AcpDialogService);
  private dialogRef = inject(AcpDialogRef, { optional: true });

  openSize(size: string) {
    this.dialogs.open(DialogSimpleContent, {
      header: {
        title: `Tamaño ${size.toUpperCase()}`,
        icon: 'tune',
      },
      size: size as any,
    });
  }
}

/**
 * Ejemplo de formulario de factura con `beforeClose` en el titlebar.
 * El botón X del header no cierra si el precio calculado no coincide.
 * El botón "Guardar" cierra manualmente sin pasar por el guard.
 */
@Component({
  selector: 'app-dialog-invoice-form',
  standalone: true,
  imports: [AcpDialogTitlebar, AcpDialogActions, AcpButton],
  template: `
    <acp-dialog-titlebar title="Factura" icon="receipt" [beforeClose]="canClose" />

    <div class="invoice-form">
      <p>
        Este formulario demuestra <code>beforeClose</code> en el titlebar. El botón X no cierra si
        el precio total no coincide.
      </p>

      <div class="form-field">
        <label for="quantity">Cantidad:</label>
        <input
          id="quantity"
          type="number"
          [value]="quantity()"
          (input)="quantity.set(+$any($event.target).value)"
          min="0"
        />
      </div>

      <div class="form-field">
        <label for="unitPrice">Precio unitario:</label>
        <input
          id="unitPrice"
          type="number"
          [value]="unitPrice()"
          (input)="unitPrice.set(+$any($event.target).value)"
          min="0"
        />
      </div>

      <div class="form-field">
        <label for="totalPrice">Precio total (calculado):</label>
        <input
          id="totalPrice"
          type="number"
          [value]="totalPrice()"
          (input)="totalPrice.set(+$any($event.target).value)"
          min="0"
        />
      </div>

      @if (priceMismatch()) {
        <div class="warning">⚠️ El precio total no coincide con cantidad × precio unitario.</div>
      } @else if (quantity() > 0 || unitPrice() > 0 || totalPrice() > 0) {
        <div class="success">✓ El precio total coincide.</div>
      }

      <p class="hint">
        Intenta cerrar con el botón X cuando el precio no coincide: no se cerrará. El botón
        "Guardar" cierra manualmente sin validación.
      </p>
    </div>

    <acp-dialog-actions align="end">
      <acp-button text="Cancelar" appearance="text" (clicked)="closeDialog()" />
      <acp-button text="Guardar" color="success" (clicked)="save()" />
    </acp-dialog-actions>
  `,
  styles: `
    .invoice-form {
      padding: 16px;
    }
    .form-field {
      margin: 12px 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .form-field label {
      font-weight: 500;
      font-size: 0.875rem;
    }
    .form-field input {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
    .warning {
      background: #fff3e0;
      color: #e65100;
      padding: 10px 14px;
      border-radius: 4px;
      margin: 12px 0;
      font-size: 0.875rem;
    }
    .success {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 10px 14px;
      border-radius: 4px;
      margin: 12px 0;
      font-size: 0.875rem;
    }
    .hint {
      font-size: 0.8rem;
      color: #666;
      margin-top: 16px;
      line-height: 1.5;
    }
    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.85rem;
    }
  `,
})
export class DialogInvoiceFormContent {
  protected ref = inject(AcpDialogRef);

  protected quantity = signal(0);
  protected unitPrice = signal(0);
  protected totalPrice = signal(0);

  protected priceMismatch = signal(false);

  /**
   * Guard que se ejecuta cuando el usuario hace clic en el botón X del header.
   * Si el precio no coincide, muestra la advertencia y no cierra.
   */
  canClose(): boolean | void {
    console.log(true, 'eeueueu');
    return true;
  }

  /** Cierra el diálogo directamente sin pasar por el guard del header. */
  closeDialog(): void {
    this.ref.close();
  }

  /**
   * El botón "Guardar" cierra manualmente sin pasar por el guard.
   * Aquí el componente tiene control total: puede guardar los datos
   * y luego cerrar, o hacer su propia validación.
   */
  save(): void {
    // El componente decide: guarda y cierra sin pasar por beforeClose.
    this.ref.close({
      quantity: this.quantity(),
      unitPrice: this.unitPrice(),
      totalPrice: this.totalPrice(),
    });
  }
}
