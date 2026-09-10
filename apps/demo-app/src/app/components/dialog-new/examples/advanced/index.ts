import { App } from './app';
import hljs from 'highlight.js';

const appHtml = `<h2>Advanced configuration</h2>

<section class="row">
  <mat-form-field>
    <mat-label>Size</mat-label>
    <mat-select [(ngModel)]="size">
      @for (option of sizes; track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
      }
    </mat-select>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Scroll strategy</mat-label>
    <mat-select [(ngModel)]="scrollStrategy">
      @for (option of scrollStrategies; track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
      }
    </mat-select>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Direction</mat-label>
    <mat-select [(ngModel)]="direction">
      @for (option of directions; track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
      }
    </mat-select>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Dialog id</mat-label>
    <input matInput [(ngModel)]="id" type="text" />
  </mat-form-field>
</section>

<section class="row">
  <mat-form-field>
    <mat-label>Width (px)</mat-label>
    <input matInput [(ngModel)]="width" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Height (px)</mat-label>
    <input matInput [(ngModel)]="height" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Restore focus</mat-label>
    <mat-select [(ngModel)]="restoreFocus">
      @for (option of restoreFocusOptions; track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
      }
    </mat-select>
  </mat-form-field>

  @if (restoreFocus === 'selector') {
  <mat-form-field>
    <mat-label>Restore focus selector</mat-label>
    <input matInput [(ngModel)]="restoreSelector" type="text" />
  </mat-form-field>
  }
</section>

<section class="row">
  <mat-form-field>
    <mat-label>Position top (px)</mat-label>
    <input matInput [(ngModel)]="positionTop" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Position left (px)</mat-label>
    <input matInput [(ngModel)]="positionLeft" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Position right (px)</mat-label>
    <input matInput [(ngModel)]="positionRight" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Position bottom (px)</mat-label>
    <input matInput [(ngModel)]="positionBottom" type="number" />
  </mat-form-field>
</section>

<section class="checkbox-row">
  <mat-checkbox [(ngModel)]="showHeader">Show header</mat-checkbox>
  <mat-checkbox [(ngModel)]="showActions">Show actions footer</mat-checkbox>
  <mat-checkbox [(ngModel)]="disableClose">Disable close (Escape / backdrop)</mat-checkbox>
  <mat-checkbox [(ngModel)]="closeOnNavigation">Close on navigation</mat-checkbox>
  <mat-checkbox [(ngModel)]="ariaModal">aria-modal</mat-checkbox>
</section>

<section class="actions">
  <button matButton="elevated" color="primary" (click)="openAdvanced()">
    Open advanced dialog
  </button>
  <button matButton="elevated" (click)="updateSize()">Update size</button>
  <button matButton="elevated" (click)="updatePosition()">Update position</button>
  <button matButton="elevated" color="error" (click)="closeById()">Close by id</button>
</section>

<button id="restore-target" class="restore-button">Focus restoration target</button>

@if (lastResult) {
<p class="last-result">{{ lastResult }}</p>
}
`;

const appTs = `import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
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
        { key: 'nota-entrega', text: 'NOta Entrega', color: 'success', result: 'nota-entrega' },
        { key: 'factura', text: 'Factura', color: 'success', result: 'factura' },
        { key: 'orden', text: 'Orden', color: 'success', result: 'orden' },
        { key: 'cancel', text: 'Cancel', appearance: 'text', result: 'cancel' },
        { key: 'confirm', text: 'Confirm', color: 'success', result: 'confirm' },
      ],
      data: { message: 'Opened with advanced configuration' },
    });

    ref.backdropClick().subscribe(() => {
      this.lastResult = 'Backdrop clicked (dialog still open)';
    });
    ref.keydownEvents().subscribe(event => {
      this.lastResult = \`Keydown inside dialog: \${event.key}\`;
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result
        ? \`Dialog closed with result: "\${String(result)}"\`
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
    if (this.positionTop != null) position.top = \`\${this.positionTop}px\`;
    if (this.positionLeft != null) position.left = \`\${this.positionLeft}px\`;
    if (this.positionRight != null) position.right = \`\${this.positionRight}px\`;
    if (this.positionBottom != null) position.bottom = \`\${this.positionBottom}px\`;
    return Object.keys(position).length > 0 ? position : undefined;
  }
}

@Component({
  selector: 'app-advanced-dialog-content',
  template: \`
    <p>{{ data.message }}</p>
    <p>
      Last clicked: <strong>{{ lastClicked }}</strong>
    </p>
  \`,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AdvancedDialogContent implements OnInit {
  protected readonly data = inject<DemoData>(ACP_DIALOG_DATA);
  protected readonly ref = inject(AcpDialogRef);
  lastClicked = '';

  ngOnInit(): void {
    this.ref.clickedResult.subscribe(({ action }) => {
      this.lastClicked = action.key ?? action.text;
      this.ref.close(action.result ?? action.key);
    });
  }
}
`;

const appScss = `section {
  margin: 16px 0;
}

.row,
.checkbox-row,
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.row {
  mat-form-field {
    flex: 1;
    min-width: 180px;
    margin: 0;
  }
}

.checkbox-row {
  mat-checkbox {
    margin: 0;
  }
}

.actions {
  margin-top: 24px;
}

.restore-button {
  margin-top: 16px;
  padding: 12px 16px;
  border: 1px solid var(--mat-sys-outline);
  border-radius: 4px;
  background: transparent;
  color: var(--mat-sys-on-surface);
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--mat-sys-primary);
  }
}

.last-result {
  margin-top: 16px;
  padding: 12px;
  border-radius: 4px;
  background-color: var(--mat-sys-surface-container);
  color: var(--mat-sys-on-surface);
}
`;

const dialogNewAdvancedExampleConfig = {
  title: 'Advanced dialog',
  description:
    'Demonstrates clickedResult, position, scrollStrategy, restoreFocus, disableClose, closeOnNavigation, direction, ariaModal, showHeader, showActions, id, updateSize, updatePosition and getDialogById.',
  component: App,
  files: [
    {
      file: 'app.html',
      content: hljs.highlightAuto(appHtml, ['html']).value,
      filecontent: appHtml,
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs, ['typescript']).value,
      filecontent: appTs,
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss, ['scss']).value,
      filecontent: appScss,
    },
  ],
};

export { dialogNewAdvancedExampleConfig };
