# Style Guide

Design principles, Angular Material theming, component guidelines, and accessibility standards for the `@acontplus/ng-components` library.

---

## Design Principles

1. **Consistency** — components look and behave the same across all applications
2. **Simplicity** — intuitive API, minimal required configuration
3. **Flexibility** — fully customizable without forking
4. **Accessibility** — WCAG AA minimum on all components
5. **Performance** — OnPush change detection, Angular Signals for reactive state

---

## Color System

Built on Angular Material's theming. All components adapt automatically to light/dark mode via the `ThemeSwitcher` service.

| Palette | SCSS variable                      | Use                           |
| ------- | ---------------------------------- | ----------------------------- |
| Primary | `mat.$indigo-palette`              | Main actions, key UI elements |
| Accent  | `mat.$pink-palette` A200/A100/A400 | Secondary actions, highlights |
| Warn    | `mat.$red-palette`                 | Errors, destructive actions   |

### Dark mode detection

Components and `ThemeSwitcher` detect dark mode via the `.dark-theme` CSS class on `<html>`. Toggle it with:

```typescript
import { ThemeSwitcher } from '@acontplus/ng-components';

themeSwitcher.toggle(); // toggles and persists to localStorage
themeSwitcher.isDarkMode(); // Signal<boolean>
```

---

## Typography

Follows Angular Material typography system using the **Roboto** font family.

| Level      | Use case                          |
| ---------- | --------------------------------- |
| Display    | Page titles, hero text            |
| Headline   | Section headings (`<h1>`, `<h2>`) |
| Title      | Card titles, dialog titles        |
| Subheading | Secondary headings (`<h3>`)       |
| Body       | Main content                      |
| Caption    | Labels, hints, metadata           |
| Button     | Button text                       |

---

## Spacing Scale

Base unit: **8px (0.5rem)**

| Name | px   | rem     |
| ---- | ---- | ------- |
| xs   | 4px  | 0.25rem |
| sm   | 8px  | 0.5rem  |
| md   | 16px | 1rem    |
| lg   | 24px | 1.5rem  |
| xl   | 32px | 2rem    |
| 2xl  | 48px | 3rem    |
| 3xl  | 64px | 4rem    |

Minimum touch target: **48px**

---

## Component Guidelines

### Cards — `<acp-dynamic-card>`

```html
<acp-dynamic-card
  [cardTitle]="'Product Details'"
  [cardSubtitle]="'Premium Package'"
  [isHeaderVisible]="true"
  [areActionsVisible]="true"
  [primaryButtonText]="'Buy Now'"
  (primaryButtonClicked)="onPurchase()"
>
  Card content here
</acp-dynamic-card>
```

- Use cards for **discrete pieces of content** — one topic per card
- Maintain **16px padding** inside card content
- Limit to **2-3 actions** per card maximum

### Buttons — `<acp-button>`

```html
<!-- Standard button -->
<acp-button variant="primary" text="Save" icon="save" (handleClick)="onSave()" />

<!-- Report/export button — auto icon, color, tooltip from format -->
<acp-button [reportFormat]="REPORT_FORMAT.PDF" text="Export" (handleClick)="export()" />
```

| `variant`   | Use                              |
| ----------- | -------------------------------- |
| `primary`   | Main action on a page or section |
| `secondary` | Alternative action               |
| `success`   | Confirmation, save, approve      |
| `danger`    | Delete, reject, destructive      |
| `warning`   | Caution actions                  |
| `info`      | Neutral informational actions    |

**Button placement:** Primary actions on the **right** in dialogs and forms. Consistent order: Cancel → Confirm.

### Dialogs

```typescript
import { AdvancedDialogService } from '@acontplus/ng-components';

dialogService.openInWrapper({
  component: YourDialogContentComponent,
  title: 'Dialog Title',
  icon: 'info',
  data: {
    /* ... */
  },
});
```

- Keep dialogs focused on **one task**
- Use **24px padding** inside dialog content
- Always provide a clear cancel/close action

### DataGrid — `<acp-data-grid>`

```typescript
columns: DataGridColumn[] = [
  { field: 'id',     header: 'ID',     type: 'number', sortable: true },
  { field: 'name',   header: 'Name',   sortable: true },
  { field: 'status', header: 'Status', cellTemplate: statusTemplate },
];
```

```html
<acp-data-grid
  [data]="items"
  [columns]="columns"
  [rowSelectable]="true"
  [showPaginator]="true"
  [pageOnFront]="false"
  [length]="totalCount"
  (page)="onPageChange($event)"
  (rowSelectedChange)="onSelect($event)"
/>
```

- Use for **tabular data with pagination and sorting**
- Enable `pageOnFront="false"` for server-side pagination
- Use `cellTemplate` for custom cell rendering
- Column pinning available via `pinned: 'left' | 'right'`

### Theme Toggle — `<acp-theme-toggle>`

```html
<acp-theme-toggle lightModeLabel="Switch to light mode" darkModeLabel="Switch to dark mode" />
```

- Place in app header or navigation bar
- Always include accessible `lightModeLabel` and `darkModeLabel` for screen readers

---

## Component Selector Convention

All library components use the `acp-` prefix:

```typescript
@Component({ selector: 'acp-dynamic-card', ... })
@Component({ selector: 'acp-data-grid', ... })
@Component({ selector: 'acp-theme-toggle', ... })
```

Demo app components use `app-` prefix.

---

## Accessibility Guidelines

- **Color contrast**: WCAG AA minimum (4.5:1 for text, 3:1 for UI components)
- **Keyboard navigation**: All interactive elements reachable via Tab, operated via Enter/Space
- **Screen readers**: ARIA labels on icon-only buttons, `role` attributes on custom widgets
- **Touch targets**: Minimum 48×48px for all interactive elements
- **Motion**: Respect `prefers-reduced-motion` — disable animations for users who prefer it

```typescript
// Animation example following the guidelines
animations: [
  trigger('fadeIn', [
    transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in', style({ opacity: 1 }))]),
  ]),
];
```

---

## Responsive Design

- **Mobile-first**: design for smallest viewport, enhance for larger
- **Breakpoints**: follow Angular Material breakpoints (`xs`, `sm`, `md`, `lg`, `xl`)
- Test components at 320px, 768px, 1024px, 1440px minimum

---

## SCSS Imports

```scss
// Import all ng-components styles
@use '@acontplus/ng-components/styles';

// For Tabulator Material theme
@import 'tabulator-tables/dist/css/tabulator_materialize.min.css';

// For notifications
@import 'ngx-toastr/toastr';
@import 'sweetalert2/themes/material-ui.css';
```
