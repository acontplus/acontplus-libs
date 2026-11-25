import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface OptionGroup {
  name: string;
  options: Option[];
}

@Component({
  selector: 'app-select-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPage {
  readonly fruits: Option[] = [
    { value: 'apple', label: 'Manzana' },
    { value: 'banana', label: 'Plátano' },
    { value: 'orange', label: 'Naranja' },
    { value: 'grape', label: 'Uva', disabled: true },
    { value: 'mango', label: 'Mango' },
  ];

  readonly groups: OptionGroup[] = [
    {
      name: 'Costa',
      options: [
        { value: 'gye', label: 'Guayaquil' },
        { value: 'mta', label: 'Manta' },
      ],
    },
    {
      name: 'Sierra',
      options: [
        {
          value: 'uio',
          label:
            'Quito LECrim (Ley de Enjuiciamiento Criminal). Es la norma procesal que regula cómo se investigan, tramitan y juzgan los delitos en España. (Nota: En Ecuador, el procedimiento penal se rige por el Código Orgánico Integral Penal - COIP).',
        },
        { value: 'cue', label: 'Cuenca' },
      ],
    },
    {
      name: 'Oriente',
      options: [{ value: 'tna', label: 'Tena' }],
    },
  ];

  readonly statuses = [
    { value: 'active', label: 'Activo', icon: 'check_circle' },
    { value: 'pending', label: 'Pendiente', icon: 'schedule' },
    { value: 'blocked', label: 'Bloqueado', icon: 'block' },
  ];

  readonly basic = signal('');
  readonly multiple = signal<string[]>(['apple', 'mango']);
  readonly status = signal('active');
  readonly search = signal('Factura 001');
  readonly city = signal('');
  readonly cities = computed(() => {
    const term = this.city().toLowerCase();
    return this.groups
      .flatMap((group) => group.options)
      .filter((option) => option.label.toLowerCase().includes(term));
  });
  readonly hidePassword = signal(true);

  readonly requiredControl = new FormControl<string | null>(null, Validators.required);
  readonly disabledControl = new FormControl({ value: 'banana', disabled: true });

  labelOf(value: string): string {
    return this.fruits.find((f) => f.value === value)?.label ?? '';
  }

  statusOf(value: string) {
    return this.statuses.find((s) => s.value === value);
  }
}
