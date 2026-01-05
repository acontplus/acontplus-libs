# TypeScript DateRangePicker

A modern, TypeScript-based date range picker library using `@formkit/tempo` instead of moment.js. This is a consolidated implementation with improved architecture, better performance, and modern development practices.

## Features

- ✅ **Modern TypeScript**: Full type safety and IntelliSense support
- ✅ **@formkit/tempo**: Lightweight date library instead of moment.js
- ✅ **Clean Architecture**: Consolidated single-file implementation
- ✅ **Theming Support**: Multiple built-in themes and custom theming
- ✅ **Time Picker**: Optional time selection with 12/24 hour formats
- ✅ **Accessibility**: WCAG compliant with keyboard navigation
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Zero Dependencies**: Except for @formkit/tempo

## Installation

```bash
npm install @formkit/tempo
```

## Basic Usage

```typescript
import { DateRangePicker } from './date-range-picker';

// Basic initialization
const picker = new DateRangePicker(
  '#daterange-input',
  {
    startDate: new Date(),
    endDate: new Date(),
    locale: SPANISH_LOCALE,
  },
  (startDate, endDate, label) => {
    console.log('Selected:', startDate, endDate, label);
  },
);
```

## Advanced Usage

```typescript
import {
  DateRangePicker,
  DateRangePickerOptions,
  SPANISH_LOCALE,
  BOOTSTRAP_THEME,
} from './date-range-picker';

const options: DateRangePickerOptions = {
  startDate: new Date(),
  endDate: new Date(),
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2030, 11, 31),
  showDropdowns: true,
  timePicker: true,
  timePicker24Hour: true,
  timePickerSeconds: true,
  autoApply: false,
  linkedCalendars: true,
  showCustomRangeLabel: true,
  alwaysShowCalendars: true,
  theme: BOOTSTRAP_THEME,
  ranges: {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    ],
    'Last 7 Days': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
    'Last 30 Days': [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()],
    'This Month': [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  },
  locale: SPANISH_LOCALE,
  opens: 'center',
  drops: 'auto',
};

const picker = new DateRangePicker('#my-input', options, (start, end, label) => {
  console.log(`Selected: ${start} to ${end} (${label})`);
});
```

## Configuration Options

### DateRangePickerOptions

| Option                | Type                    | Default          | Description                          |
| --------------------- | ----------------------- | ---------------- | ------------------------------------ |
| `startDate`           | `Date`                  | `new Date()`     | Initial start date                   |
| `endDate`             | `Date`                  | `new Date()`     | Initial end date                     |
| `minDate`             | `Date`                  | `null`           | Minimum selectable date              |
| `maxDate`             | `Date`                  | `null`           | Maximum selectable date              |
| `autoApply`           | `boolean`               | `false`          | Auto-apply selection without confirm |
| `singleDatePicker`    | `boolean`               | `false`          | Single date selection mode           |
| `showDropdowns`       | `boolean`               | `true`           | Show month/year dropdowns            |
| `linkedCalendars`     | `boolean`               | `true`           | Link calendar navigation             |
| `autoUpdateInput`     | `boolean`               | `true`           | Auto-update input value              |
| `alwaysShowCalendars` | `boolean`               | `false`          | Always show calendars                |
| `timePicker`          | `boolean`               | `false`          | Enable time selection                |
| `timePicker24Hour`    | `boolean`               | `true`           | 24-hour time format                  |
| `timePickerIncrement` | `number`                | `1`              | Minute increment                     |
| `timePickerSeconds`   | `boolean`               | `false`          | Show seconds                         |
| `ranges`              | `object`                | `{}`             | Predefined ranges                    |
| `opens`               | `string`                | `'right'`        | Picker alignment                     |
| `drops`               | `string`                | `'down'`         | Picker direction                     |
| `locale`              | `DateRangePickerLocale` | `SPANISH_LOCALE` | Localization                         |
| `theme`               | `DateRangePickerTheme`  | `DEFAULT_THEME`  | Visual theme                         |

### Themes

```typescript
import { BOOTSTRAP_THEME, MATERIAL_THEME, DEFAULT_THEME } from './date-range-picker';

// Use built-in themes
const picker = new DateRangePicker('#input', { theme: BOOTSTRAP_THEME });

// Or create custom theme
const customTheme = {
  primaryColor: '#ff6b6b',
  backgroundColor: '#ffffff',
  selectedColor: '#ff6b6b',
  rangeColor: '#ffe0e0',
  borderRadius: '8px',
};

picker.setTheme(customTheme);
```

### Locale Configuration

```typescript
const customLocale: DateRangePickerLocale = {
  format: 'DD/MM/YYYY',
  separator: ' - ',
  applyLabel: 'Apply',
  cancelLabel: 'Cancel',
  customRangeLabel: 'Custom Range',
  daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  firstDay: 0,
  // Time picker labels
  hourLabel: 'Hour',
  minuteLabel: 'Minute',
  secondLabel: 'Second',
  amLabel: 'AM',
  pmLabel: 'PM',
};
```

## Events

```typescript
// Listen to events
element.addEventListener('show.daterangepicker', e => {
  console.log('Picker shown');
});

element.addEventListener('hide.daterangepicker', e => {
  console.log('Picker hidden');
});

element.addEventListener('apply.daterangepicker', e => {
  console.log('Selection applied');
});

element.addEventListener('cancel.daterangepicker', e => {
  console.log('Selection cancelled');
});
```

## Methods

```typescript
const picker = new DateRangePicker('#input', options);

// Show/hide picker
picker.show();
picker.hide();
picker.toggle();

// Get/set dates
const startDate = picker.getStartDate();
const endDate = picker.getEndDate();
picker.setStartDate(new Date());
picker.setEndDate(new Date());

// Change theme dynamically
picker.setTheme(MATERIAL_THEME);

// Cleanup
picker.remove();
```

## Styling

The component includes built-in CSS-in-JS theming. You can also include the SCSS file for additional customization:

```scss
@import './styles/date-range-picker.scss';
```

## Architecture

The library is now consolidated into a single file for better maintainability:

- **`date-range-picker.ts`**: Main implementation with all functionality
- **`index.ts`**: Public API exports
- **`styles/`**: SCSS stylesheets
- **`README.md`**: Documentation

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see LICENSE file for details.
