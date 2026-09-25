import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  AcpButton,
  AcpDialog,
  AcpDialogActions,
  AcpDialogContent,
  AcpDialogRef,
  AcpDialogService,
} from '@acontplus/ng-components';

interface DemoData {
  message: string;
}

@Component({
  selector: 'app-dialog-declarative-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButtonModule],
})
export class App {
  private dialogs = inject(AcpDialogService);
  lastResult = '';

  openDeclarative(): void {
    const ref = this.dialogs.open<DeclarativeDialogContent, DemoData, string>(
      DeclarativeDialogContent,
      {
        title: 'OJo',
        data: { message: 'Declarative titlebar and actions' },
      },
    );

    ref.afterClosed().subscribe(result => {
      this.lastResult = result
        ? `Dialog closed with result: "${String(result)}"`
        : 'Dialog closed without result';
    });
  }
}

@Component({
  selector: 'app-declarative-dialog-content',
  template: `
    <acp-dialog>
      <acp-dialog-content>
        <form>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <mat-form-field class="w-100">
                <mat-label>Establecimiento</mat-label>
                <mat-select value="1">
                  <mat-option value="1">Principal</mat-option>
                  <mat-option value="2">Sucursal</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <mat-form-field class="w-100">
                <mat-label>Nombre Equipo</mat-label>
                <input matInput value="PC-01" />
              </mat-form-field>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <mat-form-field class="w-100">
                <mat-label>IP Equipo</mat-label>
                <input matInput value="192.168.1.6:5001" />
              </mat-form-field>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <mat-form-field class="w-100">
                <mat-label>Dominio</mat-label>
                <input matInput value="dominio.com" />
              </mat-form-field>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <mat-form-field class="w-100">
                <mat-label>Tipo Impresora</mat-label>
                <mat-select value="1">
                  <mat-option value="1">Inkjet</mat-option>
                  <mat-option value="2">Laser</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <mat-form-field class="w-100">
                <mat-label>Impresora</mat-label>
                <input matInput value="epson l3150" />
              </mat-form-field>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <mat-slide-toggle checked>Predeterminada</mat-slide-toggle>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
              <mat-slide-toggle checked>Servidor</mat-slide-toggle>
            </div>
          </div>
        </form>
      </acp-dialog-content>

      <acp-dialog-actions align="end">
        <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
        <acp-button text="Save" color="success" (clicked)="ref.close('saved')" />
      </acp-dialog-actions>
    </acp-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    AcpDialog,
    AcpDialogContent,
    AcpDialogActions,
    AcpButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
})
export class DeclarativeDialogContent {
  protected readonly ref = inject(AcpDialogRef<string>);
}
