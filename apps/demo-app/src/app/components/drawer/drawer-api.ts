import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

interface ApiProperty {
  name: string;
  type: string;
  description: string;
  default?: string;
}

@Component({
  selector: 'app-drawer-api',
  imports: [MatTableModule, DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Drawer API</app-doc-heading>

      <h2>AcpDrawer Service</h2>
      <table mat-table [dataSource]="serviceMethods" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Method</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.name }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Return Type</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.type }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <h2>AcpDrawerConfig</h2>
      <table mat-table [dataSource]="configProperties" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Property</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.name }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.type }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>

        <ng-container matColumnDef="default">
          <th mat-header-cell *matHeaderCellDef>Default</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.default || '-' }}</code>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumnsWithDefault"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumnsWithDefault"></tr>
      </table>

      <h2>AcpDrawerRef</h2>
      <table mat-table [dataSource]="drawerRefMethods" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Method</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.name }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Return Type</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.type }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <h2>Injection Tokens</h2>
      <table mat-table [dataSource]="injectionTokens" class="api-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Token</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.name }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">
            <code>{{ element.type }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1400px;
      }

      h2 {
        margin-top: 32px;
        margin-bottom: 16px;
      }

      .api-table {
        width: 100%;
        margin-bottom: 24px;

        th,
        td {
          padding: 12px 16px;
        }

        code {
          background: var(--mat-sys-surface-container);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
        }
      }
    `,
  ],
})
export class DrawerApi {
  displayedColumns = ['name', 'type', 'description'];
  displayedColumnsWithDefault = ['name', 'type', 'description', 'default'];

  serviceMethods: ApiProperty[] = [
    {
      name: 'open<T, D, R>(component, config?)',
      type: 'AcpDrawerRef<T, R>',
      description: 'Abre un drawer con el componente o template especificado',
    },
    {
      name: 'dismissAll()',
      type: 'void',
      description: 'Cierra todos los drawers abiertos',
    },
    {
      name: 'getDrawerById(id)',
      type: 'AcpDrawerRef | undefined',
      description: 'Busca un drawer abierto por su ID',
    },
  ];

  configProperties: ApiProperty[] = [
    {
      name: 'position',
      type: "'top' | 'right' | 'bottom' | 'left'",
      description: 'Posición del drawer',
      default: "'right'",
    },
    {
      name: 'width',
      type: 'string',
      description: 'Ancho del drawer (para posiciones left/right)',
      default: '-',
    },
    {
      name: 'height',
      type: 'string',
      description: 'Alto del drawer (para posiciones top/bottom)',
      default: '-',
    },
    {
      name: 'hasBackdrop',
      type: 'boolean',
      description: 'Si el drawer tiene fondo oscuro',
      default: 'true',
    },
    {
      name: 'disableClose',
      type: 'boolean',
      description: 'Si se puede cerrar haciendo clic fuera o presionando escape',
      default: 'false',
    },
    {
      name: 'data',
      type: 'any',
      description: 'Datos a pasar al componente del drawer',
      default: 'null',
    },
    {
      name: 'id',
      type: 'string',
      description: 'ID único para el drawer',
      default: '-',
    },
    {
      name: 'panelClass',
      type: 'string | string[]',
      description: 'Clases CSS adicionales para el drawer',
      default: '-',
    },
    {
      name: 'backdropClass',
      type: 'string',
      description: 'Clase CSS para el fondo',
      default: '-',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'Etiqueta ARIA para el drawer',
      default: '-',
    },
    {
      name: 'closeOnNavigation',
      type: 'boolean',
      description: 'Si se cierra al navegar',
      default: 'true',
    },
    {
      name: 'autoFocus',
      type: 'AutoFocusTarget | string | boolean',
      description: 'Dónde enfocar al abrir',
      default: "'first-tabbable'",
    },
    {
      name: 'restoreFocus',
      type: 'boolean',
      description: 'Si restaurar el foco al cerrar',
      default: 'true',
    },
    {
      name: 'fullScreen',
      type: 'boolean',
      description: 'Si el drawer debe ocupar toda la pantalla',
      default: 'false',
    },
  ];

  drawerRefMethods: ApiProperty[] = [
    {
      name: 'dismiss(result?)',
      type: 'void',
      description: 'Cierra el drawer con un resultado opcional',
    },
    {
      name: 'afterDismissed()',
      type: 'Observable<R | undefined>',
      description: 'Observable que emite cuando el drawer se cierra',
    },
    {
      name: 'afterOpened()',
      type: 'Observable<void>',
      description: 'Observable que emite cuando el drawer se abre completamente',
    },
    {
      name: 'backdropClick()',
      type: 'Observable<MouseEvent>',
      description: 'Observable que emite cuando se hace clic en el fondo',
    },
    {
      name: 'keydownEvents()',
      type: 'Observable<KeyboardEvent>',
      description: 'Observable que emite eventos de teclado',
    },
  ];

  injectionTokens: ApiProperty[] = [
    {
      name: 'ACP_DRAWER_DATA',
      type: 'any',
      description: 'Token para inyectar datos pasados al drawer',
    },
    {
      name: 'ACP_DRAWER_DEFAULT_OPTIONS',
      type: 'AcpDrawerConfig',
      description: 'Token para proporcionar opciones por defecto del drawer',
    },
  ];
}
