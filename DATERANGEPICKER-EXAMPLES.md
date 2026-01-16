# 📅 DateRangePicker - Ejemplos de Configuración

## 🎯 Configuraciones Completas y Funcionales

### 1. **Configuración Básica (Como el Original)**

```typescript
const picker1 = new DateRangePicker(
  document.getElementById('daterange-input'),
  {
    locale: SPANISH_LOCALE,
    theme: DEFAULT_THEME,
    autoApply: false, // Mostrar botones Aplicar/Cancelar
    showDropdowns: true, // Dropdowns de mes/año
    alwaysShowCalendars: true, // Siempre mostrar calendarios
    ranges: {
      Hoy: [new Date(), new Date()],
      Ayer: [addDay(new Date(), -1), addDay(new Date(), -1)],
      'Últimos 7 días': [addDay(new Date(), -7), new Date()],
      'Últimos 30 días': [addDay(new Date(), -30), new Date()],
      'Este mes': [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
    },
  },
  (startDate, endDate, label) => {
    console.log('Fechas seleccionadas:', { startDate, endDate, label });
  },
);
```

### 2. **Modo Auto-Apply (Sin Botones)**

```typescript
const picker2 = new DateRangePicker(
  document.getElementById('daterange-input-auto'),
  {
    locale: SPANISH_LOCALE,
    theme: BOOTSTRAP_THEME,
    autoApply: true, // ✅ Sin botones, aplica automáticamente
    showDropdowns: true,
    linkedCalendars: true,
    ranges: {
      Hoy: [new Date(), new Date()],
      'Esta semana': [getStartOfWeek(new Date()), new Date()],
      'Este mes': [getStartOfMonth(new Date()), new Date()],
    },
  },
  (startDate, endDate, label) => {
    // Se ejecuta automáticamente al seleccionar
    updateDateDisplay(startDate, endDate, label);
  },
);
```

### 3. **Selector de Fecha Única**

```typescript
const picker3 = new DateRangePicker(
  document.getElementById('single-date-input'),
  {
    locale: SPANISH_LOCALE,
    theme: MATERIAL_THEME,
    singleDatePicker: true, // ✅ Solo una fecha
    autoApply: true,
    showDropdowns: true,
    autoUpdateInput: true,
  },
  (startDate, endDate, label) => {
    console.log('Fecha seleccionada:', startDate);
  },
);
```

### 4. **Con Restricciones de Fechas**

```typescript
const picker4 = new DateRangePicker(document.getElementById('restricted-input'), {
  locale: SPANISH_LOCALE,
  theme: DEFAULT_THEME,
  minDate: addDay(new Date(), -90), // ✅ Máximo 90 días atrás
  maxDate: addDay(new Date(), 30), // ✅ Máximo 30 días adelante
  autoApply: false,
  showDropdowns: true,
  ranges: {
    'Últimos 7 días': [addDay(new Date(), -7), new Date()],
    'Últimos 15 días': [addDay(new Date(), -15), new Date()],
    'Últimos 30 días': [addDay(new Date(), -30), new Date()],
  },
});
```

### 5. **Tema Personalizado Completo**

```typescript
const customTheme = {
  primaryColor: '#8b5cf6', // Púrpura
  secondaryColor: '#6b7280', // Gris
  backgroundColor: '#ffffff', // Blanco
  borderColor: '#e5e7eb', // Gris claro
  textColor: '#111827', // Negro
  hoverColor: '#f3f4f6', // Gris muy claro
  selectedColor: '#8b5cf6', // Púrpura selección
  rangeColor: '#ede9fe', // Púrpura claro rango
  todayColor: '#8b5cf6', // Púrpura hoy
  disabledColor: '#d1d5db', // Gris deshabilitado
  applyButtonColor: '#059669', // Verde aplicar
  cancelButtonColor: '#dc2626', // Rojo cancelar
  borderRadius: '12px', // Bordes redondeados
  fontSize: '14px',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const picker5 = new DateRangePicker(document.getElementById('custom-theme-input'), {
  locale: SPANISH_LOCALE,
  theme: customTheme, // ✅ Tema personalizado
  autoApply: false,
  showDropdowns: true,
  alwaysShowCalendars: true,
  ranges: {
    Hoy: [new Date(), new Date()],
    Mañana: [addDay(new Date(), 1), addDay(new Date(), 1)],
    'Próximos 7 días': [new Date(), addDay(new Date(), 7)],
    'Próximos 14 días': [new Date(), addDay(new Date(), 14)],
  },
});
```

### 6. **Modo Compacto (Solo Rangos)**

```typescript
const picker6 = new DateRangePicker(document.getElementById('compact-input'), {
  locale: SPANISH_LOCALE,
  theme: BOOTSTRAP_THEME,
  autoApply: true,
  alwaysShowCalendars: false, // ✅ Solo mostrar rangos inicialmente
  showCustomRangeLabel: true,
  ranges: {
    Hoy: [new Date(), new Date()],
    Ayer: [addDay(new Date(), -1), addDay(new Date(), -1)],
    'Últimos 3 días': [addDay(new Date(), -3), new Date()],
    'Últimos 7 días': [addDay(new Date(), -7), new Date()],
    'Últimos 15 días': [addDay(new Date(), -15), new Date()],
    'Últimos 30 días': [addDay(new Date(), -30), new Date()],
    'Este mes': [getStartOfMonth(new Date()), new Date()],
    'El mes pasado': [
      getStartOfMonth(addMonth(new Date(), -1)),
      getEndOfMonth(addMonth(new Date(), -1)),
    ],
  },
});
```

### 7. **Configuración Empresarial**

```typescript
const picker7 = new DateRangePicker(
  document.getElementById('business-input'),
  {
    locale: SPANISH_LOCALE,
    theme: {
      primaryColor: '#1f2937', // Gris oscuro corporativo
      selectedColor: '#1f2937',
      rangeColor: '#f3f4f6',
      applyButtonColor: '#059669', // Verde corporativo
      cancelButtonColor: '#6b7280', // Gris neutro
      borderRadius: '6px',
      fontSize: '14px',
      fontFamily: 'system-ui, sans-serif',
    },
    autoApply: false,
    showDropdowns: true,
    linkedCalendars: true,
    autoUpdateInput: true,
    ranges: {
      Hoy: [new Date(), new Date()],
      'Esta semana': [getStartOfWeek(new Date()), new Date()],
      'Semana pasada': [
        getStartOfWeek(addDay(new Date(), -7)),
        getEndOfWeek(addDay(new Date(), -7)),
      ],
      'Este mes': [getStartOfMonth(new Date()), new Date()],
      'Mes pasado': [
        getStartOfMonth(addMonth(new Date(), -1)),
        getEndOfMonth(addMonth(new Date(), -1)),
      ],
      'Este trimestre': [getStartOfQuarter(new Date()), new Date()],
      'Trimestre pasado': [
        getStartOfQuarter(addMonth(new Date(), -3)),
        getEndOfQuarter(addMonth(new Date(), -3)),
      ],
      'Este año': [new Date(new Date().getFullYear(), 0, 1), new Date()],
    },
  },
  (startDate, endDate, label) => {
    // Enviar a analytics o sistema de reportes
    trackDateRangeSelection(startDate, endDate, label);
    updateBusinessReport(startDate, endDate);
  },
);
```

### 8. **Modo Móvil Optimizado**

```typescript
const picker8 = new DateRangePicker(document.getElementById('mobile-input'), {
  locale: SPANISH_LOCALE,
  theme: {
    ...DEFAULT_THEME,
    fontSize: '16px', // ✅ Más grande para móvil
    borderRadius: '8px',
  },
  autoApply: true, // ✅ Mejor UX en móvil
  singleDatePicker: false,
  showDropdowns: true,
  opens: 'center', // ✅ Centrado en móvil
  drops: 'auto', // ✅ Posicionamiento automático
  ranges: {
    Hoy: [new Date(), new Date()],
    'Últimos 7 días': [addDay(new Date(), -7), new Date()],
    'Últimos 30 días': [addDay(new Date(), -30), new Date()],
  },
});
```

## 🔧 Funciones Helper Útiles

```typescript
// Funciones helper para los ejemplos
function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // Monday = 1
  return addDay(date, diff);
}

function getEndOfWeek(date: Date): Date {
  return addDay(getStartOfWeek(date), 6);
}

function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function getStartOfQuarter(date: Date): Date {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), quarter * 3, 1);
}

function getEndOfQuarter(date: Date): Date {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), quarter * 3 + 3, 0);
}

// Cambio dinámico de tema
function changeTheme(picker: DateRangePicker, themeName: string) {
  const themes = {
    default: DEFAULT_THEME,
    bootstrap: BOOTSTRAP_THEME,
    material: MATERIAL_THEME,
    dark: {
      primaryColor: '#6366f1',
      backgroundColor: '#1f2937',
      textColor: '#f9fafb',
      borderColor: '#374151',
      // ... más propiedades
    },
  };

  picker.setTheme(themes[themeName]);
}
```

## 🎯 Características Principales

✅ **Dropdowns funcionando** - Mes y año seleccionables
✅ **Rangos con color** - Se marcan visualmente cuando se seleccionan  
✅ **Hover correcto** - Color de texto se mantiene
✅ **Botones visibles** - Aplicar/Cancelar cuando autoApply: false
✅ **Fecha mostrada** - Display de rango seleccionado
✅ **Temas configurables** - 4 predefinidos + personalización
✅ **Responsive** - Funciona en móvil y desktop
✅ **Accesible** - Navegación por teclado

¡Todas las funcionalidades están restauradas y funcionando! 🚀
