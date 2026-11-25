import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** Contenido de `AcpDialogService`: acordeón con las secciones de un producto. */
@Component({
  selector: 'app-expansion-dialog-content',
  imports: [MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  template: `
    <mat-accordion>
      <mat-expansion-panel expanded>
        <mat-expansion-panel-header>
          <mat-panel-title><mat-icon>badge</mat-icon> General</mat-panel-title>
          <mat-panel-description>Código y descripción</mat-panel-description>
        </mat-expansion-panel-header>
        <div class="fields">
          <mat-form-field>
            <mat-label>Código</mat-label>
            <input matInput value="PRD-0045" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Descripción</mat-label>
            <input matInput value="Teclado inalámbrico" />
          </mat-form-field>
        </div>
      </mat-expansion-panel>

      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title><mat-icon>sell</mat-icon> Precios e impuestos</mat-panel-title>
          <mat-panel-description>PVP e IVA</mat-panel-description>
        </mat-expansion-panel-header>
        <div class="fields">
          <mat-form-field>
            <mat-label>Precio</mat-label>
            <span matTextPrefix>$&nbsp;</span>
            <input matInput type="number" value="25.90" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>IVA</mat-label>
            <mat-select value="15">
              <mat-option value="0">0%</mat-option>
              <mat-option value="5">5%</mat-option>
              <mat-option value="15">15%</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-expansion-panel>

      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title><mat-icon>inventory_2</mat-icon> Inventario</mat-panel-title>
          <mat-panel-description>Stock mínimo y bodega</mat-panel-description>
        </mat-expansion-panel-header>
        <div class="fields">
          <mat-form-field>
            <mat-label>Stock mínimo</mat-label>
            <input matInput type="number" value="10" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Bodega</mat-label>
            <mat-select value="matriz">
              <mat-option value="matriz">Matriz</mat-option>
              <mat-option value="sucursal">Sucursal norte</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: `
    mat-panel-title {
      flex: 1 0 auto;
      gap: 8px;
      align-items: center;
    }

    .fields {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionDialogContent {}
