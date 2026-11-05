import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  AcpSearchSelectAccessor,
  AcpSearchSelectOptionContext,
  AcpSearchSelectSelection,
} from './search-select.types';

interface OptionVm<T> {
  key: string;
  label: string;
  value: unknown;
  source: T;
  group: T | null;
}

/** `label === null` holds loose options rendered without `mat-optgroup`. */
interface GroupVm<T> {
  label: string | null;
  options: OptionVm<T>[];
}

const read = <T, R>(item: T, accessor: AcpSearchSelectAccessor<T, R>): R =>
  typeof accessor === 'function' ? accessor(item) : (item[accessor] as R);

const toKey = (v: unknown): string | null =>
  typeof v === 'string' || typeof v === 'number' ? String(v).trim() : null;

/** Matches `1` with `'1'`, useful when ids come as strings from forms or query params. */
export const acpSearchSelectLooseEquals = (a: unknown, b: unknown): boolean =>
  a === b || (toKey(a) !== null && toKey(a) === toKey(b));

/** Lowercase and strip accents, so "camion" matches "Camión". */
export const acpSearchSelectNormalize = (text: string): string =>
  text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();

/**
 * Searchable select built on `mat-autocomplete`. Accepts flat or one-level tree lists:
 * an item whose `children` is an array renders as a group.
 * Works with `ngModel`, reactive forms and `[(value)]`.
 */
@Component({
  selector: 'acp-search-select',
  exportAs: 'acpSearchSelect',
  imports: [
    NgTemplateOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './search-select.html',
  styles: `
    :host {
      display: block;
    }
    .acp-search-select__field {
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'acp-search-select', '[attr.title]': 'null' },
})
export class AcpSearchSelect<T = any> implements ControlValueAccessor, DoCheck {
  private readonly document = inject(DOCUMENT);
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly parentForm = inject(NgForm, { optional: true });
  private readonly parentFormGroup = inject(FormGroupDirective, { optional: true });

  // Data
  readonly items = input.required<T[] | null | undefined>();
  readonly bindLabel = input<AcpSearchSelectAccessor<T, string>>('value' as keyof T);
  readonly bindValue = input<AcpSearchSelectAccessor<T, unknown>>('id' as keyof T);
  readonly children = input<AcpSearchSelectAccessor<T, T[] | undefined>>('children' as keyof T);
  readonly groupLabel = input<AcpSearchSelectAccessor<T, string>>('value' as keyof T);
  readonly compareWith = input<(a: unknown, b: unknown) => boolean>(acpSearchSelectLooseEquals);
  /** Custom match. Receives the item and the normalized query. */
  readonly filterFn = input<((item: T, query: string) => boolean) | null>(null);
  /** Set to `false` when `items` already come filtered from the server (see `searchChange`). */
  readonly localFilter = input(true, { transform: booleanAttribute });
  /** Value written when the field is cleared, e.g. `0` for "all". */
  readonly emptyValue = input<unknown>(null);

  // Field
  readonly label = input('');
  readonly placeholder = input('Buscar...');
  readonly hint = input('');
  readonly errorText = input('');
  readonly noResultsText = input('Sin resultados');
  readonly loadingText = input('Buscando...');
  readonly clearLabel = input('Limpiar');
  readonly appearance = input<MatFormFieldAppearance>('outline');
  readonly required = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly clearable = input(true, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly value = model<unknown>(null);
  readonly optionSelected = output<AcpSearchSelectSelection<T>>();
  readonly cleared = output<void>();
  /** Raw text typed by the user; debounce it in the consumer for server-side search. */
  readonly searchChange = output<string>();

  private readonly input = viewChild(MatInput);
  private readonly trigger = viewChild(MatAutocompleteTrigger);
  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('field');

  readonly optionTemplate = contentChild<TemplateRef<AcpSearchSelectOptionContext<T>>>('option');

  /** Text typed by the user; `null` while not searching. */
  protected readonly query = signal<string | null>(null);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: () => {
      const control = this.ngControl;
      if (!control?.invalid) return false;
      const submitted = this.parentFormGroup?.submitted || this.parentForm?.submitted;
      return !!(control.touched || submitted);
    },
  };

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  /** The inner `matInput` has no `NgControl`, so it never refreshes its error state by itself. */
  ngDoCheck(): void {
    this.input()?.updateErrorState();
  }

  private readonly groups = computed<GroupVm<T>[]>(() => {
    const children = this.children();
    const groupLabel = this.groupLabel();
    const bindLabel = this.bindLabel();
    const bindValue = this.bindValue();
    const toOption = (item: T, group: T | null, index: number): OptionVm<T> => {
      const value = read(item, bindValue);
      return {
        key: toKey(value) ?? `#${index}`,
        label: String(read(item, bindLabel) ?? ''),
        value,
        source: item,
        group,
      };
    };

    const result: GroupVm<T>[] = [];
    let index = 0;
    for (const item of this.items() ?? []) {
      const nested = read(item, children);
      if (Array.isArray(nested)) {
        result.push({
          label: String(read(item, groupLabel) ?? ''),
          options: nested.map(child => toOption(child, item, index++)),
        });
        continue;
      }
      const last = result.at(-1);
      const option = toOption(item, null, index++);
      if (last && last.label === null) last.options.push(option);
      else result.push({ label: null, options: [option] });
    }
    return result;
  });

  protected readonly filteredGroups = computed<GroupVm<T>[]>(() => {
    const query = acpSearchSelectNormalize(this.query() ?? '');
    if (!query || !this.localFilter()) return this.groups();
    const custom = this.filterFn();
    const match = (option: OptionVm<T>) =>
      custom
        ? custom(option.source, query)
        : acpSearchSelectNormalize(option.label).includes(query);
    return this.groups()
      .map(group => ({ ...group, options: group.options.filter(match) }))
      .filter(group => group.options.length > 0);
  });

  private readonly selected = computed(() => {
    const value = this.value();
    const compare = this.compareWith();
    return this.groups()
      .flatMap(group => group.options)
      .find(option => compare(option.value, value));
  });

  protected readonly text = computed(() => this.query() ?? this.selected()?.label ?? '');

  protected readonly hasValue = computed(() => {
    const value = this.value();
    return value !== null && value !== undefined && value !== this.emptyValue();
  });

  protected readonly displayWith = (option: OptionVm<T> | string | null): string =>
    typeof option === 'string' ? option : (option?.label ?? '');

  /** Clears the selection and the search text. */
  clear(): void {
    this.query.set(null);
    this.setValue(this.emptyValue());
    this.cleared.emit();
  }

  protected selectAll(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.query.set(text);
    this.searchChange.emit(text);
    if (!text.trim() && this.hasValue()) {
      this.setValue(this.emptyValue());
      this.cleared.emit();
    }
  }

  /** Leaving the field without picking drops the typed text and shows the selection again. */
  protected onBlur(): void {
    this.onTouched();
    if (!this.trigger()?.panelOpen) this.query.set(null);
  }

  /** The panel also closes while typing (e.g. no results yet); keep the text in that case. */
  protected onClosed(): void {
    if (this.document.activeElement !== this.inputEl()?.nativeElement) this.query.set(null);
  }

  protected onSelected(event: MatAutocompleteSelectedEvent): void {
    const option = event.option.value as OptionVm<T>;
    this.query.set(null);
    this.setValue(option.value);
    this.optionSelected.emit({ value: option.value, item: option.source, group: option.group });
  }

  writeValue(value: unknown): void {
    this.query.set(null);
    this.value.set(value ?? this.emptyValue());
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private setValue(value: unknown): void {
    if (value === this.value()) return;
    this.value.set(value);
    this.onChange(value);
  }
}
