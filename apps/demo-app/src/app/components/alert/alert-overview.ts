import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AcpAlert, AcpAlertType, AcpAlertVariant } from '@acontplus/ng-components';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-alert-overview',
  imports: [AcpAlert, MatButtonModule, MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Alert</app-doc-heading>

      <p class="docs-component-description">
        Inline message with a type (<code>default</code>, <code>info</code>, <code>success</code>,
        <code>warning</code>, <code>danger</code>), three variants, an optional heading, icon and
        actions, and a close button. Colors match <code>acp-badge</code> and adapt to light and dark
        themes.
      </p>

      <h2>Types</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="alert-column">
            <acp-alert type="default">Tu sesión se cerrará en 10 minutos de inactividad.</acp-alert>
            <acp-alert type="info">Hay una nueva versión del sistema disponible.</acp-alert>
            <acp-alert type="success">La factura 001-001-000123 se autorizó en el SRI.</acp-alert>
            <acp-alert type="warning"
              >El certificado de firma electrónica vence en 15 días.</acp-alert
            >
            <acp-alert type="danger">No se pudo conectar con el SRI. Intenta nuevamente.</acp-alert>
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="typesCode" [language]="'html'" />

      <h2>Variants</h2>
      <p>
        <code>soft</code> (default) for everyday messages, <code>outlined</code> for a lighter look
        on busy screens and <code>filled</code> for high-emphasis messages.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="variant-grid">
            @for (variant of variants; track variant) {
              <div class="alert-column">
                <h3>{{ variant }}</h3>
                @for (type of types; track type) {
                  <acp-alert [type]="type" [variant]="variant">{{ type }}</acp-alert>
                }
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="variantsCode" [language]="'html'" />

      <h2>Heading and Actions</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="alert-column">
            <acp-alert type="warning" heading="Certificado por vencer">
              Renueva tu firma electrónica antes del 20/11/2026 para seguir emitiendo comprobantes.
              <div acpAlertActions>
                <button matButton="filled">Renovar ahora</button>
                <button matButton>Recordar después</button>
              </div>
            </acp-alert>
            <acp-alert type="danger" variant="outlined" heading="3 comprobantes rechazados">
              Revisa los errores de validación y vuelve a enviarlos.
              <div acpAlertActions>
                <button matButton="outlined">Ver comprobantes</button>
              </div>
            </acp-alert>
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="actionsCode" [language]="'html'" />

      <h2>Dismissible</h2>
      <p>The close button hides the alert and emits <code>closed</code>.</p>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="alert-column">
            <acp-alert
              #dismissAlert
              type="info"
              dismissible
              (closed)="closedCount.set(closedCount() + 1)"
            >
              Puedes cerrar este mensaje.
            </acp-alert>
            @if (!dismissAlert.isOpen()) {
              <div>
                <button matButton="outlined" (click)="dismissAlert.open()">Mostrar de nuevo</button>
                <span class="hint">Cerrado {{ closedCount() }} vez/veces</span>
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="dismissibleCode" [language]="'html'" />

      <h2>Custom Icon</h2>
      <mat-card class="docs-example-card">
        <mat-card-content>
          <div class="alert-column">
            <acp-alert type="info" icon="cloud_sync"
              >Sincronizando inventario con el servidor…</acp-alert
            >
            <acp-alert type="success" [showIcon]="false">Alert without icon.</acp-alert>
          </div>
        </mat-card-content>
      </mat-card>
      <app-code-example [code]="iconCode" [language]="'html'" />
    </div>
  `,
  styles: `
    .alert-column {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .variant-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
    }

    h3 {
      margin: 0;
      text-transform: capitalize;
    }

    .hint {
      margin-left: 12px;
      color: var(--mat-sys-on-surface-variant);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertOverview {
  readonly types: AcpAlertType[] = ['default', 'info', 'success', 'warning', 'danger'];
  readonly variants: AcpAlertVariant[] = ['soft', 'outlined', 'filled'];
  readonly closedCount = signal(0);

  typesCode = `<acp-alert type="default">Tu sesión se cerrará en 10 minutos de inactividad.</acp-alert>
<acp-alert type="info">Hay una nueva versión del sistema disponible.</acp-alert>
<acp-alert type="success">La factura 001-001-000123 se autorizó en el SRI.</acp-alert>
<acp-alert type="warning">El certificado de firma electrónica vence en 15 días.</acp-alert>
<acp-alert type="danger">No se pudo conectar con el SRI. Intenta nuevamente.</acp-alert>`;

  variantsCode = `<acp-alert type="success">Soft (default)</acp-alert>
<acp-alert type="success" variant="outlined">Outlined</acp-alert>
<acp-alert type="success" variant="filled">Filled</acp-alert>`;

  actionsCode = `<acp-alert type="warning" heading="Certificado por vencer">
  Renueva tu firma electrónica antes del 20/11/2026 para seguir emitiendo comprobantes.
  <div acpAlertActions>
    <button matButton="filled">Renovar ahora</button>
    <button matButton>Recordar después</button>
  </div>
</acp-alert>`;

  dismissibleCode = `<acp-alert #alert type="info" dismissible (closed)="onClosed()">
  Puedes cerrar este mensaje.
</acp-alert>

<!-- Show it again -->
@if (!alert.isOpen()) {
  <button matButton (click)="alert.open()">Mostrar de nuevo</button>
}`;

  iconCode = `<acp-alert type="info" icon="cloud_sync">Sincronizando inventario…</acp-alert>
<acp-alert type="success" [showIcon]="false">Alert without icon.</acp-alert>`;
}
