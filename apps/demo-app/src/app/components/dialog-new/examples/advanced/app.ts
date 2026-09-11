import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogPosition } from '@angular/material/dialog';
import {
  ACP_DIALOG_DATA,
  AcpDialogRef,
  AcpDialogService,
  AcpDialogSize,
} from '@acontplus/ng-components';

interface DemoData {
  message: string;
}

@Component({
  selector: 'app-dialog-new-advanced-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class App {
  private dialogs = inject(AcpDialogService);

  sizes: AcpDialogSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'];
  scrollStrategies: ('block' | 'close' | 'noop')[] = ['block', 'close', 'noop'];
  directions: ('ltr' | 'rtl')[] = ['ltr', 'rtl'];
  restoreFocusOptions: ('default' | 'selector' | 'none')[] = ['default', 'selector', 'none'];

  size: AcpDialogSize = 'md';
  scrollStrategy: 'block' | 'close' | 'noop' = 'block';
  disableClose = false;
  closeOnNavigation = true;
  direction: 'ltr' | 'rtl' = 'ltr';
  restoreFocus: 'default' | 'selector' | 'none' = 'default';
  restoreSelector = '#restore-target';
  id = 'advanced-dialog';
  ariaModal = false;
  showHeader = true;
  showActions = true;
  width: number | null = null;
  height: number | null = null;
  positionTop: number | null = null;
  positionLeft: number | null = null;
  positionRight: number | null = null;
  positionBottom: number | null = null;
  lastResult = '';

  openAdvanced(): void {
    const ref = this.dialogs.open(AdvancedDialogContent, {
      title: 'Advanced options',
      size: this.size,
      width: this.width ?? undefined,
      height: this.height ?? undefined,
      position: this.buildPosition(),
      showHeader: this.showHeader,
      showActions: this.showActions,
      id: this.id,
      scrollStrategy: this.scrollStrategy,
      disableClose: this.disableClose,
      closeOnNavigation: this.closeOnNavigation,
      direction: this.direction,
      restoreFocus: this.resolveRestoreFocus(),
      ariaModal: this.ariaModal,
      actions: [
        { key: 'nota-entrega', text: 'NOta Entrega', color: 'info', result: 'nota-entrega' },
        { key: 'factura', text: 'Factura', color: 'danger', result: 'factura' },
        { key: 'orden', text: 'Orden', color: 'error', result: 'orden' },
        { key: 'cancel', text: 'Cancel', appearance: 'text', result: 'cancel' },
        { key: 'confirm', text: 'Confirm', color: 'success', result: 'confirm' },
      ],
      data: { message: 'Opened with advanced configuration' },
    });

    ref.backdropClick().subscribe(() => {
      this.lastResult = 'Backdrop clicked (dialog still open)';
    });
    ref.keydownEvents().subscribe(event => {
      this.lastResult = `Keydown inside dialog: ${event.key}`;
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result
        ? `Dialog closed with result: "${String(result)}"`
        : 'Dialog closed without result';
    });
  }

  updateSize(): void {
    this.dialogs.getDialogById(this.id)?.updateSize('900px', '700px');
  }

  updatePosition(): void {
    this.dialogs.getDialogById(this.id)?.updatePosition({ top: '40px' });
  }

  closeById(): void {
    this.dialogs.getDialogById(this.id)?.close('closed-by-id');
  }

  private resolveRestoreFocus(): boolean | string {
    if (this.restoreFocus === 'selector') {
      return this.restoreSelector;
    }
    return this.restoreFocus !== 'none';
  }

  private buildPosition(): DialogPosition | undefined {
    const position: DialogPosition = {};
    if (this.positionTop != null) position.top = `${this.positionTop}px`;
    if (this.positionLeft != null) position.left = `${this.positionLeft}px`;
    if (this.positionRight != null) position.right = `${this.positionRight}px`;
    if (this.positionBottom != null) position.bottom = `${this.positionBottom}px`;
    return Object.keys(position).length > 0 ? position : undefined;
  }
}

@Component({
  selector: 'app-advanced-dialog-content',
  template: `
    <p>{{ data.message }}</p>
    <p>
      Last clicked: <strong>{{ lastClicked }}</strong>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AdvancedDialogContent implements OnInit {
  protected readonly data = inject<DemoData>(ACP_DIALOG_DATA);
  protected readonly ref = inject(AcpDialogRef);
  lastClicked = '';

  ngOnInit(): void {
    this.ref.clickedResult.subscribe(ev => {
      if (ev.action.key === 'cancel') {
        this.ref.close('cancelled');
      }
      console.log(ev);
    });
  }
}
