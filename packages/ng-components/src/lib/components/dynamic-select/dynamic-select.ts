import {
  Component,
  effect,
  input,
  OnDestroy,
  OnInit,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import type { SelectOption } from '@acontplus/ui-kit';

@Component({
  selector: 'acp-dynamic-select',
  imports: [NgSelectModule, ReactiveFormsModule],
  templateUrl: './dynamic-select.html',
  styleUrl: './dynamic-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSelect implements OnInit, OnDestroy {
  // Basic inputs
  label = input<string>('Seleccione una opción');
  options = input.required<SelectOption[]>();
  selectedValue = input<string | number | null>();
  className = input<string>('w-100');
  placeholder = input<string>();
  disabled = input<boolean>(false);
  clearable = input<boolean>(true);
  searchable = input<boolean>(true);

  // Advanced ng-select inputs
  virtualScroll = input<boolean>(false);
  dropdownPosition = input<'bottom' | 'top' | 'auto'>('auto');
  closeOnSelect = input<boolean>(true);
  hideSelected = input<boolean>(false);
  multiple = input<boolean>(false);
  selectOnTab = input<boolean>(false);
  openOnEnter = input<boolean>(true);
  selectableGroup = input<boolean>(false);
  selectableGroupAsModel = input<boolean>(true);
  clearOnBackspace = input<boolean>(true);
  readonly = input<boolean>(false);
  searchWhileComposing = input<boolean>(true);
  minTermLength = input<number>(0);
  editableSearchTerm = input<boolean>(false);
  typeToSearchText = input<string>('Type to search');
  addTagText = input<string>('Add item');
  loadingText = input<string>('Loading...');
  clearAllText = input<string>('Clear all');
  notFoundText = input<string>('No items found');

  // Output
  selectionChange = output<string | number | null>();

  public selectControl = new FormControl<string | number | null>(null);
  public filteredOptions: SelectOption[] = [];
  public loading = false;

  private _onDestroy = new Subject<void>();

  constructor() {
    // Sincroniza las opciones
    effect(() => {
      const opts = this.options();
      this.filteredOptions = opts ?? [];
    });

    // Sincroniza el valor seleccionado externamente
    effect(() => {
      const value = this.selectedValue();
      if (value !== undefined && value !== null) {
        const selectedOption = this.options().find(option => option.value === value);
        if (selectedOption && this.selectControl.value !== selectedOption.value) {
          this.selectControl.setValue(selectedOption.value, {
            emitEvent: false,
          });
        }
      }
    });
  }

  ngOnInit() {
    // Handle initial value if provided
    if (this.selectedValue() !== undefined && this.selectedValue() !== null) {
      const selectedOption = this.options().find(opt => opt.value === this.selectedValue());
      if (selectedOption) {
        this.selectControl.setValue(selectedOption.value, { emitEvent: false });
      }
    }
  }

  onSelectionChange(selectedItem: any) {
    // Extract just the value from the selected item
    const value = selectedItem?.value ?? selectedItem;

    // Emit only the value
    this.selectionChange.emit(value);

    // Update the form control to keep it in sync
    this.selectControl.setValue(value, { emitEvent: false });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
