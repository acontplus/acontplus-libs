import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  linkedSignal,
  output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  viewChild,
} from '@angular/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DataGridColumn } from '../interfaces';

type EditOption = string | number | { value: string | number; label: string };

@Component({
  selector: 'acp-grid-cell-edit',
  exportAs: 'acpGridCellEdit',
  template: `
    <mat-form-field class="acp-grid-cell-edit-field" appearance="outline">
      @if (hasOptions()) {
        <mat-select
          #selectElement
          [value]="currentValue()"
          (selectionChange)="_onSelectChange($event)"
          (keydown)="_onKeyDown($event)"
          (blur)="_onBlur()"
          (opened)="_panelOpen = true"
          (closed)="_panelOpen = false"
        >
          @for (opt of options(); track opt) {
            <mat-option [value]="optValue(opt)">{{ optLabel(opt) }}</mat-option>
          }
        </mat-select>
      } @else {
        <input
          #inputElement
          matInput
          [value]="value()"
          (input)="_onInput($event)"
          (keydown)="_onKeyDown($event)"
          (blur)="_onBlur()"
          [attr.data-field]="field()"
        />
      }
      @if (error(); as err) {
        <mat-error>{{ err }}</mat-error>
      }
    </mat-form-field>
  `,
  styles: `
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 2px;
      box-sizing: border-box;
    }

    .acp-grid-cell-edit-field {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    .acp-grid-cell-edit-field :where(.mat-mdc-form-field) {
      width: 100%;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatError, MatInput, MatSelectModule],
})
export class AcpGridCellEdit {
  // --- Signal inputs ---
  readonly value = input<any>('');
  readonly field = input('');
  readonly colDef = input<DataGridColumn | undefined>(undefined);
  readonly rowData = input<Record<string, any> | undefined>(undefined);
  /** Validation error message shown under the editor, if any. */
  readonly error = input<string | null>(null);

  // --- Signal outputs ---
  readonly valueChange = output<any>();
  readonly editComplete = output<any>();
  readonly editCancel = output<void>();

  // --- Signal-based view queries ---
  readonly inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');
  readonly selectElementRef = viewChild<ElementRef<HTMLElement>>('selectElement');

  // --- Computed signals ---
  readonly options = computed<EditOption[]>(() => this.colDef()?.editOptions ?? []);
  readonly hasOptions = computed(() => this.options().length > 0);

  /** Value being edited; resets whenever the `value` input changes (new edit session). */
  readonly currentValue = linkedSignal(() => this.value());

  /** Whether the mat-select overlay panel is currently open. */
  _panelOpen = false;

  // --- Auto-focus effect: react when the view query resolves ---
  constructor() {
    effect(() => {
      // Reading the viewChild signal tracks it; once resolved, auto-focus
      const inputRef = this.inputElementRef();
      const selectRef = this.selectElementRef();
      if (inputRef || selectRef) {
        setTimeout(() => this._focusActiveElement(), 0);
      }
    });
  }

  /** Extract the value from an option (string/number passes through, object uses .value) */
  optValue(opt: EditOption): string | number {
    return typeof opt === 'object' && opt !== null ? opt.value : opt;
  }

  /** Extract the display label from an option */
  optLabel(opt: EditOption): string {
    return typeof opt === 'object' && opt !== null ? opt.label : String(opt);
  }

  _onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.currentValue.set(target.value);
    this.valueChange.emit(target.value);
  }

  _onSelectChange(event: any): void {
    this.currentValue.set(event.value);
    this.valueChange.emit(event.value);
  }

  _onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this._confirmEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.editCancel.emit();
    }
  }

  _onBlur(): void {
    // Opening the mat-select panel moves focus and fires blur; do not commit
    // the stale value while the user is still picking an option.
    if (this.hasOptions() && this._panelOpen) {
      return;
    }
    this._confirmEdit();
  }

  private _focusActiveElement(): void {
    if (this.hasOptions() && this.selectElementRef()) {
      this.selectElementRef()!.nativeElement.focus();
    } else if (this.inputElementRef()) {
      this.inputElementRef()!.nativeElement.focus();
      this.inputElementRef()!.nativeElement.select();
    }
  }

  private _confirmEdit(): void {
    if (this.hasOptions()) {
      this.editComplete.emit(this.currentValue());
    } else {
      const input = this.inputElementRef()?.nativeElement;
      if (input) {
        this.editComplete.emit(input.value);
      }
    }
  }

  /** Programmatically focus and select the input */
  focusAndSelect(): void {
    this._focusActiveElement();
  }
}
