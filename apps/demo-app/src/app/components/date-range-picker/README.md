# Date Range Picker Demo

Este demo muestra el uso del componente `DateRangePicker` de la librería `@acontplus/ng-components`.

## Características

- **Selector de rango de fechas**: Permite seleccionar fechas de inicio y fin
- **Rangos predefinidos**: Incluye opciones como "Hoy", "Ayer", "Últimos 7 días", etc.
- **Localización**: Configurado en español con `SPANISH_LOCALE`
- **Interfaz moderna**: Basado en TypeScript con `@formkit/tempo`
- **Eventos**: Callback para manejar cambios de selección

## Archivos del Demo

- `date-range-picker.ts` - Componente principal con rutas
- `date-range-picker-overview.html` - Template de la página de overview
- `examples/basic/` - Ejemplo básico de uso
  - `app.ts` - Lógica del componente de ejemplo
  - `app.html` - Template del ejemplo
  - `app.scss` - Estilos del ejemplo
  - `index.ts` - Configuración del ejemplo para el viewer

## Uso

El componente se inicializa en `ngOnInit` y se limpia en `ngOnDestroy`:

```typescript
this.dateRangePicker = new DateRangePicker(
  input,
  {
    startDate: today,
    endDate: today,
    locale: SPANISH_LOCALE,
    ranges: {
      Hoy: [today, today],
      Ayer: [yesterday, yesterday],
      // ... más rangos
    },
  },
  (startDate, endDate, label) => {
    // Callback cuando se selecciona un rango
  },
);
```

## Navegación

El demo está integrado en la navegación principal de la aplicación demo bajo "Form Controls".
