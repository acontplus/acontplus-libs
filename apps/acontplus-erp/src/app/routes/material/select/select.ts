import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
        { value: 'uio', label: 'Quito' },
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
