# DateRangePicker

Un componente Angular que envuelve la librería `datex-ui` para proporcionar un selector de rango de fechas potente y fácil de usar.

## Características

- ✅ **Integración con Angular Forms**: Soporte completo para Reactive Forms y Template-driven Forms
- ✅ **Control de Valor Personalizado**: Implementa `ControlValueAccessor` para integración perfecta
- ✅ **Temas Predefinidos**: Bootstrap, Material Design y tema por defecto
- ✅ **Configuración Flexible**: Más de 20 opciones de configuración
- ✅ **Eventos Personalizados**: Eventos detallados para todas las interacciones
- ✅ **TypeScript**: Tipado completo para mejor experiencia de desarrollo
- ✅ **Standalone Component**: Compatible con Angular 14+ standalone components
- ✅ **Signals API**: Usa la nueva API de signals de Angular para mejor rendimiento

## Instalación

El componente está incluido en el paquete `@acontplus/ng-components` y requiere `datex-ui` como dependencia.

```bash
npm install datex-ui
```

## Uso Básico

```typescript
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DateRangePicker],
  template: `
    <acp-date-range-picker
      placeholder="Seleccionar rango de fechas"
      [autoApply]="false"
      (dateRangeSelected)="onDateSelected($event)"
    >
    </acp-date-range-picker>
  `,
})
export class ExampleComponent {
  onDateSelected(event: { startDate: Date; endDate: Date; label?: string }) {
    console.log('Rango seleccionado:', event);
  }
}
```

## Integración con Angular Forms

```typescript
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [DateRangePicker, ReactiveFormsModule],
  template: `
    <form [formGroup]="dateForm">
      <acp-date-range-picker
        formControlName="dateRange"
        placeholder="Seleccionar rango"
        [ranges]="predefinedRanges"
      >
      </acp-date-range-picker>
    </form>
  `,
})
export class FormExampleComponent {
  dateForm = new FormGroup({
    dateRange: new FormControl({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }),
  });

  predefinedRanges = {
    Hoy: [new Date(), new Date()],
    'Últimos 7 días': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
  } as Record<string, [Date, Date]>;
}
```

## Propiedades de Entrada (Signals)

| Propiedad          | Tipo                                                              | Valor por Defecto               | Descripción                          |
| ------------------ | ----------------------------------------------------------------- | ------------------------------- | ------------------------------------ |
| `startDate`        | `InputSignal<Date>`                                               | `undefined`                     | Fecha de inicio inicial              |
| `endDate`          | `InputSignal<Date>`                                               | `undefined`                     | Fecha de fin inicial                 |
| `minDate`          | `InputSignal<Date \| null>`                                       | `null`                          | Fecha mínima seleccionable           |
| `maxDate`          | `InputSignal<Date \| null>`                                       | `null`                          | Fecha máxima seleccionable           |
| `autoApply`        | `InputSignal<boolean>`                                            | `false`                         | Aplicar automáticamente la selección |
| `singleDatePicker` | `InputSignal<boolean>`                                            | `false`                         | Modo de fecha única                  |
| `showDropdowns`    | `InputSignal<boolean>`                                            | `true`                          | Mostrar dropdowns de mes/año         |
| `timePicker`       | `InputSignal<boolean>`                                            | `false`                         | Habilitar selector de tiempo         |
| `timePicker24Hour` | `InputSignal<boolean>`                                            | `true`                          | Formato de 24 horas                  |
| `ranges`           | `InputSignal<Record<string, [Date, Date]>>`                       | `{}`                            | Rangos predefinidos                  |
| `presetTheme`      | `InputSignal<'default' \| 'bootstrap' \| 'material' \| 'custom'>` | `'default'`                     | Tema predefinido                     |
| `placeholder`      | `InputSignal<string>`                                             | `'Seleccionar rango de fechas'` | Texto del placeholder                |
| `disabled`         | `InputSignal<boolean>`                                            | `false`                         | Deshabilitar el componente           |

## Eventos (Output Signals)

| Evento              | Tipo                                                                   | Descripción                             |
| ------------------- | ---------------------------------------------------------------------- | --------------------------------------- |
| `dateRangeSelected` | `OutputEmitterRef<{ startDate: Date; endDate: Date; label?: string }>` | Se emite cuando se selecciona un rango  |
| `pickerShow`        | `OutputEmitterRef<void>`                                               | Se emite cuando se muestra el picker    |
| `pickerHide`        | `OutputEmitterRef<void>`                                               | Se emite cuando se oculta el picker     |
| `pickerApply`       | `OutputEmitterRef<void>`                                               | Se emite cuando se aplica la selección  |
| `pickerCancel`      | `OutputEmitterRef<void>`                                               | Se emite cuando se cancela la selección |

## Métodos Públicos

```typescript
// Obtener referencia al componente
@ViewChild(DateRangePicker) picker!: DateRangePicker;

// Métodos disponibles
this.picker.show();           // Mostrar el picker
this.picker.hide();           // Ocultar el picker
this.picker.toggle();         // Alternar visibilidad
this.picker.getStartDate();   // Obtener fecha de inicio
this.picker.getEndDate();     // Obtener fecha de fin
this.picker.setStartDate(new Date()); // Establecer fecha de inicio
this.picker.setEndDate(new Date());   // Establecer fecha de fin
this.picker.updateTheme(customTheme); // Actualizar tema
this.picker.updateRanges(newRanges);  // Actualizar rangos
```

## Temas

### Temas Predefinidos

```typescript
// Tema Bootstrap
<acp-date-range-picker presetTheme="bootstrap">

// Tema Material
<acp-date-range-picker presetTheme="material">

// Tema por defecto
<acp-date-range-picker presetTheme="default">
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

<acp-date-range-picker
  presetTheme="custom"
  [theme]="customTheme">
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
<acp-date-range-picker
  [timePicker]="true"
  [timePicker24Hour]="true"
  [timePickerSeconds]="true"
  placeholder="Seleccionar fecha y hora">
</acp-date-range-picker>
```

### Con Rangos Predefinidos

```typescript
const ranges = {
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
};

<acp-date-range-picker [ranges]="ranges">
```

### Validación con Angular Forms

```typescript
import { Validators } from '@angular/forms';

dateForm = new FormGroup({
  dateRange: new FormControl(null, [Validators.required]),
});
```

### Usando Signals para Reactividad

```typescript
import { signal, computed } from '@angular/core';

@Component({
  template: `
    <acp-date-range-picker
      [startDate]="startDate()"
      [endDate]="endDate()"
      [disabled]="isDisabled()"
      (dateRangeSelected)="onDateSelected($event)"
    >
    </acp-date-range-picker>

    <p>Días seleccionados: {{ daysDifference() }}</p>
  `,
})
export class SignalExampleComponent {
  startDate = signal(new Date());
  endDate = signal(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  isDisabled = signal(false);

  daysDifference = computed(() => {
    const start = this.startDate();
    const end = this.endDate();
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  });

  onDateSelected(event: { startDate: Date; endDate: Date }) {
    this.startDate.set(event.startDate);
    this.endDate.set(event.endDate);
  }
}
```

## Compatibilidad

- Angular 17+
- TypeScript 5.0+
- datex-ui 1.1.11+

## Licencia

MIT
