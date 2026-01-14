# DateRangePicker

Un componente Angular que envuelve la librería `datex-ui` para proporcionar un selector de rango de fechas potente y fácil de usar con integración completa a Angular Material.

## Características

- ✅ **Integración con Angular Forms**: Soporte completo para Reactive Forms y Template-driven Forms
- ✅ **Control de Valor Personalizado**: Implementa `ControlValueAccessor` para integración perfecta
- ✅ **Angular Material Integration**: Implementa `MatFormFieldControl` para integración nativa
- ✅ **Temas Predefinidos**: Bootstrap, Material Design y tema por defecto
- ✅ **Rangos Predefinidos**: Incluye rangos en español por defecto
- ✅ **Configuración Flexible**: Más de 20 opciones de configuración
- ✅ **Eventos Personalizados**: Eventos detallados para todas las interacciones
- ✅ **TypeScript Genérico**: Tipado completo con soporte para salida como string o Date
- ✅ **Standalone Component**: Compatible con Angular 17+ standalone components
- ✅ **Signals API**: Usa la nueva API de signals de Angular para mejor rendimiento
- ✅ **Checkbox Integration**: Soporte opcional para checkbox integrado
- ✅ **Formkit Tempo**: Utiliza @formkit/tempo para manejo avanzado de fechas

## Instalación

El componente está incluido en el paquete `@acontplus/ng-components` y requiere `datex-ui` y `@formkit/tempo` como dependencias.

```bash
npm install datex-ui @formkit/tempo
```

## Rangos Predefinidos

El componente incluye por defecto los siguientes rangos en español:

- **Hoy**: Fecha actual
- **Ayer**: Día anterior
- **Últimos 5 días**: Últimos 5 días incluyendo hoy
- **Últimos 10 días**: Últimos 10 días incluyendo hoy
- **Últimos 15 días**: Últimos 15 días incluyendo hoy
- **Últimos 30 días**: Últimos 30 días incluyendo hoy
- **Esta semana**: Desde el lunes hasta hoy
- **Este mes**: Desde el primer día del mes hasta hoy
- **El mes pasado**: Todo el mes anterior completo

## Uso Básico

```typescript
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DateRangePicker],
  template: `
    <acp-date-range-picker
      label="Rango de Fechas"
      placeholderText="Seleccionar rango de fechas"
      (dateRangeSelected)="onDateSelected($event)"
    >
    </acp-date-range-picker>
  `,
})
export class ExampleComponent {
  onDateSelected(event: { from: Date | string; to: Date | string; label?: string }) {
    console.log('Rango seleccionado:', event);
  }
}
```

## Uso con Angular Material

```typescript
import { DateRangePicker } from '@acontplus/ng-components';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-material-example',
  standalone: true,
  imports: [DateRangePicker, MatFormFieldModule],
  template: `
    <acp-date-range-picker
      label="Período de Reporte"
      appearance="outline"
      hint="Selecciona el rango de fechas para el reporte"
      placeholderText="dd/mm/yyyy - dd/mm/yyyy"
      [showCheckbox]="true"
      checkboxAriaLabel="Incluir en reporte"
      (dateRangeSelected)="onDateSelected($event)"
      (checkboxChange)="onCheckboxChange($event)"
    >
    </acp-date-range-picker>
  `,
})
export class MaterialExampleComponent {
  onDateSelected(event: { from: Date | string; to: Date | string; label?: string }) {
    console.log('Rango seleccionado:', event);
  }

  onCheckboxChange(checked: boolean) {
    console.log('Checkbox:', checked);
  }
}
```

## Integración con Angular Forms

```typescript
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateRangePicker, DateRangeValue } from '@acontplus/ng-components';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [DateRangePicker, ReactiveFormsModule],
  template: `
    <form [formGroup]="dateForm">
      <acp-date-range-picker
        formControlName="dateRange"
        label="Rango de Fechas"
        placeholderText="Seleccionar rango"
        [formatOutputAsString]="false"
      >
      </acp-date-range-picker>
    </form>

    <pre>{{ dateForm.value | json }}</pre>
  `,
})
export class FormExampleComponent {
  dateForm = new FormGroup({
    dateRange: new FormControl<DateRangeValue<false> | null>(null),
  });
}
```

## Control de Formato de Salida

El componente soporta dos formatos de salida mediante el parámetro genérico `AsString`:

```typescript
// Salida como strings (por defecto)
@Component({
  template: `
    <acp-date-range-picker
      [formatOutputAsString]="true"
      (dateRangeSelected)="onStringDates($event)"
    >
    </acp-date-range-picker>
  `,
})
export class StringOutputComponent {
  onStringDates(event: DateRangeValue<true>) {
    // event.from y event.to son strings en formato 'YYYY-MM-DD hh:mm:ss A'
    console.log(typeof event.from); // 'string'
  }
}

// Salida como objetos Date
@Component({
  template: `
    <acp-date-range-picker
      [formatOutputAsString]="false"
      (dateRangeSelected)="onDateObjects($event)"
    >
    </acp-date-range-picker>
  `,
})
export class DateOutputComponent {
  onDateObjects(event: DateRangeValue<false>) {
    // event.from y event.to son objetos Date
    console.log(typeof event.from); // 'object'
  }
}
```

## Propiedades de Entrada (Signals)

### Configuración Principal

| Propiedad              | Tipo                                  | Valor por Defecto | Descripción                           |
| ---------------------- | ------------------------------------- | ----------------- | ------------------------------------- |
| `options`              | `InputSignal<DateRangePickerOptions>` | `{}`              | Opciones de configuración de datex-ui |
| `formatOutputAsString` | `InputSignal<AsString>`               | `true`            | Si la salida debe ser string o Date   |

### UI y Apariencia

| Propiedad         | Tipo                               | Valor por Defecto               | Descripción                        |
| ----------------- | ---------------------------------- | ------------------------------- | ---------------------------------- |
| `placeholderText` | `InputSignal<string>`              | `'Seleccionar rango de fechas'` | Texto del placeholder              |
| `label`           | `InputSignal<string \| undefined>` | `undefined`                     | Etiqueta del campo                 |
| `hint`            | `InputSignal<string \| undefined>` | `undefined`                     | Texto de ayuda                     |
| `errorMessage`    | `InputSignal<string \| undefined>` | `undefined`                     | Mensaje de error                   |
| `appearance`      | `InputSignal<'fill' \| 'outline'>` | `'outline'`                     | Apariencia del Material Form Field |
| `isDisabled`      | `InputSignal<boolean>`             | `false`                         | Deshabilitar el componente         |
| `inputReadonly`   | `InputSignal<boolean>`             | `false`                         | Campo de solo lectura              |

### Iconos y Botones

| Propiedad            | Tipo                   | Valor por Defecto | Descripción                 |
| -------------------- | ---------------------- | ----------------- | --------------------------- |
| `calendarIcon`       | `InputSignal<string>`  | `'date_range'`    | Icono del calendario        |
| `showCalendarButton` | `InputSignal<boolean>` | `false`           | Mostrar botón de calendario |

### Funcionalidad de Checkbox

| Propiedad           | Tipo                                | Valor por Defecto    | Descripción                 |
| ------------------- | ----------------------------------- | -------------------- | --------------------------- |
| `showCheckbox`      | `InputSignal<boolean>`              | `false`              | Mostrar checkbox            |
| `checkboxChecked`   | `InputSignal<boolean>`              | `false`              | Estado inicial del checkbox |
| `checkboxReadonly`  | `InputSignal<boolean>`              | `false`              | Checkbox de solo lectura    |
| `checkboxAriaLabel` | `InputSignal<string>`               | `'Toggle selection'` | Etiqueta ARIA del checkbox  |
| `checkboxPosition`  | `InputSignal<'prefix' \| 'suffix'>` | `'suffix'`           | Posición del checkbox       |

## Eventos (Output Signals)

| Evento              | Tipo                                         | Descripción                                   |
| ------------------- | -------------------------------------------- | --------------------------------------------- |
| `dateRangeSelected` | `OutputEmitterRef<DateRangeValue<AsString>>` | Se emite cuando se selecciona un rango        |
| `pickerShow`        | `OutputEmitterRef<void>`                     | Se emite cuando se muestra el picker          |
| `pickerHide`        | `OutputEmitterRef<void>`                     | Se emite cuando se oculta el picker           |
| `pickerApply`       | `OutputEmitterRef<void>`                     | Se emite cuando se aplica la selección        |
| `pickerCancel`      | `OutputEmitterRef<void>`                     | Se emite cuando se cancela la selección       |
| `checkboxChange`    | `OutputEmitterRef<boolean>`                  | Se emite cuando cambia el estado del checkbox |

## Tipos TypeScript

```typescript
// Interfaz principal para opciones
export interface DateRangePickerOptions extends DatexOptions {
  presetTheme?: 'default' | 'bootstrap' | 'material' | 'custom';
}

// Tipo para valores de fecha
export type DateValue<AsString extends boolean> = AsString extends true ? string : Date;

// Interfaz para el valor del rango
export interface DateRangeValue<AsString extends boolean> {
  from: DateValue<AsString>;
  to: DateValue<AsString>;
  label?: string;
}
```

## Métodos Públicos

```typescript
// Obtener referencia al componente
@ViewChild(DateRangePicker) picker!: DateRangePicker;

// Métodos disponibles
this.picker.show();           // Mostrar el picker
this.picker.hide();           // Ocultar el picker
this.picker.toggle();         // Alternar visibilidad
this.picker.focus();          // Enfocar el input
```

## Temas

### Temas Predefinidos

```typescript
// Tema Bootstrap
<acp-date-range-picker [options]="{ presetTheme: 'bootstrap' }">

// Tema Material (por defecto)
<acp-date-range-picker [options]="{ presetTheme: 'material' }">

// Tema por defecto
<acp-date-range-picker [options]="{ presetTheme: 'default' }">
```

### Tema Personalizado

```typescript
const customTheme = {
  primaryColor: '#ff6b6b',
  backgroundColor: '#ffffff',
  selectedColor: '#ff6b6b',
  rangeColor: '#ffe0e0',
  borderRadius: '8px'
};

const customOptions: DateRangePickerOptions = {
  presetTheme: 'custom',
  theme: customTheme
};

<acp-date-range-picker [options]="customOptions">
```

## Estilos

El componente utiliza los estilos integrados de `datex-ui`. Los estilos se aplican automáticamente cuando se usa el componente.

Si necesitas personalizar los estilos, puedes usar las propiedades de tema disponibles o aplicar CSS personalizado al selector `acp-date-range-picker`:

```scss
// Ejemplo de personalización CSS
acp-date-range-picker {
  input {
    border: 2px solid #007bff;
    border-radius: 8px;
    padding: 12px;

    &:focus {
      border-color: #0056b3;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }
}
```

## Ejemplos Avanzados

### Con Selector de Tiempo

```typescript
const timePickerOptions: DateRangePickerOptions = {
  timePicker: true,
  timePicker24Hour: true,
  timePickerSeconds: true
};

<acp-date-range-picker
  [options]="timePickerOptions"
  placeholderText="Seleccionar fecha y hora">
</acp-date-range-picker>
```

### Con Rangos Personalizados

```typescript
const customRanges = {
  'Hoy': [new Date(), new Date()],
  'Ayer': [
    new Date(Date.now() - 24 * 60 * 60 * 1000),
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  ],
  'Últimos 7 días': [
    new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    new Date()
  ],
  'Este mes': [
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  ]
} as Record<string, [Date, Date]>;

const rangeOptions: DateRangePickerOptions = {
  ranges: customRanges
};

<acp-date-range-picker [options]="rangeOptions">
```

### Con Checkbox Integrado

```typescript
@Component({
  template: `
    <acp-date-range-picker
      label="Rango de Fechas del Reporte"
      [showCheckbox]="true"
      checkboxAriaLabel="Incluir en el reporte mensual"
      checkboxPosition="prefix"
      [checkboxChecked]="includeInReport()"
      (dateRangeSelected)="onDateSelected($event)"
      (checkboxChange)="onReportToggle($event)"
    >
    </acp-date-range-picker>
  `,
})
export class CheckboxExampleComponent {
  includeInReport = signal(false);

  onDateSelected(range: DateRangeValue<true>) {
    console.log('Rango seleccionado:', range);
  }

  onReportToggle(checked: boolean) {
    this.includeInReport.set(checked);
    console.log('Incluir en reporte:', checked);
  }
}
```

### Validación con Angular Forms

```typescript
import { Validators } from '@angular/forms';

dateForm = new FormGroup({
  dateRange: new FormControl<DateRangeValue<false> | null>(null, [
    Validators.required,
    this.dateRangeValidator
  ]),
});

// Validador personalizado
dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as DateRangeValue<false>;
  if (!value) return null;

  const diffDays = Math.ceil(
    (value.to.getTime() - value.from.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays > 90 ? { maxRangeExceeded: { maxDays: 90, actualDays: diffDays } } : null;
}
```

### Usando Signals para Reactividad

```typescript
import { signal, computed } from '@angular/core';

@Component({
  template: `
    <acp-date-range-picker
      [isDisabled]="isDisabled()"
      [formatOutputAsString]="false"
      (dateRangeSelected)="onDateSelected($event)"
    >
    </acp-date-range-picker>

    <p>Días seleccionados: {{ daysDifference() }}</p>
    <p>Rango válido: {{ isValidRange() ? 'Sí' : 'No' }}</p>
  `,
})
export class SignalExampleComponent {
  selectedRange = signal<DateRangeValue<false> | null>(null);
  isDisabled = signal(false);

  daysDifference = computed(() => {
    const range = this.selectedRange();
    if (!range) return 0;

    return Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  });

  isValidRange = computed(() => {
    const days = this.daysDifference();
    return days > 0 && days <= 30;
  });

  onDateSelected(range: DateRangeValue<false>) {
    this.selectedRange.set(range);
  }
}
```

## Compatibilidad

- Angular 17+
- TypeScript 5.0+
- datex-ui 1.1.11+
- @formkit/tempo 0.1.2+
- Angular Material 17+

## Dependencias

```json
{
  "dependencies": {
    "datex-ui": "^1.1.11",
    "@formkit/tempo": "^0.1.2"
  },
  "peerDependencies": {
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/material": "^17.0.0"
  }
}
```

## Licencia

MIT
