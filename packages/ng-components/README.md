# @acontplus/ng-components

Angular Material UI component library with dynamic tables, theming support, dialog wrappers, and comprehensive styling utilities for AcontPlus applications.

## Installation

```bash
# Using npm
npm install @acontplus/ng-components

# Using pnpm
pnpm add @acontplus/ng-components
```

## Features

- **UI Components**: Cards, KPI cards, dialogs, icons, input chips, buttons, spinners, dynamic/tabulator tables, theme toggle, search select
- **Directives**: Text transformation (to-upper-case)
- **Pipes**: Data transformation (get-total, status-display)
- **Services**: Dialog management, overlay, theme management (dark/light mode), autocomplete
- **Form Controls**: Dynamic input components
- **Models**: Table models, pagination, autocomplete wrapper models
- **Types**: Tabulator table type definitions
- **Styling**: Custom SCSS mixins, variables, dialog styles, and theme support
- **Angular Material Integration**: Built on Angular Material for consistent design
- **TypeScript Support**: Full type safety with comprehensive definitions

## Components

### Cards

#### AcpCard

Card built on `mat-card` with the MaterialPro look (acontpluspro tokens). Props come from, lowest
to highest priority: injected defaults, inputs and slot templates for rich content.

```typescript
import { ACP_CARD_SLOTS, AcpCard, provideAcpCardDefaults } from '@acontplus/ng-components';

// app.config.ts (optional, application-wide defaults)
providers: [provideAcpCardDefaults({ appearance: 'outlined', padding: 'small' })];

@Component({
  template: `
    <acp-card
      title="Order #1024"
      subtitle="Pending"
      [headingLevel]="2"
      imageRatio="16:9"
      actionsAlign="end"
      routerLink="/orders/1024"
    >
      <ng-template acpCardMedia><img src="cover.jpg" alt="" /></ng-template>
      <p>Card content goes here</p>
      <ng-template acpCardActions><acp-button text="Pay" /></ng-template>
    </acp-card>
  `,
  imports: [AcpCard, ACP_CARD_SLOTS],
})
export class OrderComponent {}
```

- Inputs: `title`, `subtitle`, `headingLevel` (1-6; without it the title is plain text),
  `appearance` (`elevated` | `outlined` | `filled`), `color` (M3 container roles such as
  `primary-container` or `surface-container`), `padding` (`none` | `small` | `medium` | `large`),
  `hoverable`, `imageRatio`, `actionsAlign`, `fullHeight`, `fullWidth`, `disabled`, `loading`
  and `passThrough` (per-section `class`/`style`).
- Interaction: `routerLink` makes the whole card a native link; `clickable` makes it a native
  button that emits `clicked`. The content describes the link or button; `ariaLabel` overrides
  its name (defaults to `title`). Actions and footer stay clickable.
- Slots (`ACP_CARD_SLOTS`): `acpCardHeader` (replaces avatar, title and subtitle),
  `acpCardMedia`, `acpCardAvatar`, `acpCardTitle`, `acpCardSubtitle`, `acpCardActions` and
  `acpCardFooter`. Slot templates win over `title`/`subtitle`.
- Shape and shadows come from the theme (`corner-small`, `--acp-sys-shadow-*`). Per-card hooks:
  `--acp-card-shape`, `--acp-card-elevation`, `--acp-card-hover-elevation`, `--acp-card-padding`,
  `--acp-card-gap`, `--acp-card-container-color`, `--acp-card-on-color`,
  `--acp-card-subtitle-color` and `--acp-card-outline-color`.
- `padding` is 16, 24 (default) or 30px and is shared by header, content, actions and footer.
  `hoverable` and interactive cards lift 2px with a larger soft shadow (no motion with
  `prefers-reduced-motion`). For bordered cards app-wide use
  `provideAcpCardDefaults({ appearance: 'outlined' })` or the acontpluspro `acp-card-border`
  class.

#### AcpKpiCard

Metric card for dashboards with the MaterialPro look. Numeric values and changes are formatted
with `Intl.NumberFormat` using the app `LOCALE_ID` (or `locale`).

```html
<acp-kpi-card
  title="Expenses"
  icon="payments"
  [value]="45900"
  [valueFormat]="{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }"
  [delta]="-4.1"
  lowerIsBetter
  trendLabel="vs last month"
  routerLink="/expenses"
/>
```

- `delta` is the change vs. the previous period; `deltaFormat` is `percent` (default, `12.5` →
  `+12.5%`) or `number`. `trend` is inferred from its sign. The badge color comes from the trend
  sentiment, not from `color`; set `lowerIsBetter` for costs, churn or error rates.
- `variant`: `default` (raised surface, soft shadow, tinted icon tile), `elevated`, `outlined`,
  `tonal` (15% tint of `color`) or `filled` (solid `color`). `color`: `primary`, `secondary`,
  `success`, `warning`, `error`, `info`, `neutral` or `custom`. `size`: `xs-small`, `small`,
  `medium` (default) or `large`; text sizes follow the theme typescale. `align`: `start`,
  `center` or `end`.
- Interaction: `routerLink` makes the whole card a native link; `clickable` makes it a native
  button that emits `clicked` (`selected` sets `aria-pressed`). The card value describes the link
  or button; `ariaLabel` overrides its name (defaults to `title`). The menu and footer stay
  clickable.
- `headingLevel` (1-6) renders the title as a heading; without it the title is plain text.
- Other inputs: `subtitle`, `prefix`, `suffix`, `description`, `footer`, `showTrendIcon`, `icon`,
  `svgIcon`, `avatar`, `avatarInitials`, `progress`, `progressColor`, `loading`, `disabled`,
  `menuAriaLabel` and `tooltip`.
- Slots (`ACP_KPI_CARD_SLOTS`): `acpKpiCardIcon`, `acpKpiCardAvatar`, `acpKpiCardFooter` and
  `acpKpiCardActions` (menu items).
- Defaults and screen reader texts: `provideAcpKpiCardDefaults({ size: 'small', labels: {
increase: 'Aumento', decrease: 'Disminución', noChange: 'Sin cambio', moreOptions: 'Más
opciones' } })` or `ACP_KPI_CARD_DEFAULT_OPTIONS` at component level.
- Theme tokens (`kpi-card-overrides`): `container-shape`, `<color>-bg` / `-fg` / `-accent` and
  `delta-<positive|negative|neutral>-bg` / `-fg`. For `color="custom"` set
  `--acp-kpi-card-custom-bg`, `--acp-kpi-card-custom-fg` and `--acp-kpi-card-custom-accent`.

#### AcpBadge

Status label, counter or filter chip with the MaterialPro look (15% tinted pill by default).

```html
<acp-badge label="Paid" color="success" />
<acp-badge label="Churn" value="1.9%" trend="down" lowerIsBetter />
<acp-badge label="Angular" removable (removed)="removeTag('angular')" />
<acp-badge label="Open orders" value="12" routerLink="/orders" />
```

- `variant`: `tonal` (default), `filled`, `outlined` or `text`. `color`: `primary`, `secondary`,
  `tertiary`, `success`, `warning`, `error`, `info`, `neutral` or `custom`. `size`: `xs-small`,
  `small`, `medium` (default) or `large` (theme typescale). `shape`: `pill` (default), `rounded` or
  `square`.
- `trend` (`up` | `down` | `neutral`) shows the trend icon, picks the color (`up` = success) and
  announces the change; `lowerIsBetter` inverts the color.
- Interaction: `routerLink` or `href` render a native link, `clickable` a native button that
  emits `clicked` (`selected` sets `aria-pressed`), and `removable` adds a remove button that
  emits `removed`. Static badges render a `<span>`.
- Other inputs: `value`, `icon`, `svgIcon`, `trailingIcon`, `trailingSvgIcon`, `disabled`,
  `loading` and `ariaLabel`. Slots (`ACP_BADGE_SLOTS`): `acpBadgeIcon`, `acpBadgeTrailingIcon`.
- Defaults and screen reader texts: `provideAcpBadgeDefaults({ labels: { remove: 'Quitar
{label}', increase: 'Aumento', decrease: 'Disminución', noChange: 'Sin cambio' } })`.
- Theme tokens (`badge-overrides`): `container-shape`, `pill-shape` and `<color>-bg` / `-fg` /
  `-accent`. For `color="custom"` set `--acp-badge-custom-bg`, `--acp-badge-custom-fg` and
  `--acp-badge-custom-accent`. `ACP_BADGE_COLORS`, `ACP_BADGE_VARIANTS`, `ACP_BADGE_SIZES` and
  `ACP_BADGE_SHAPES` list the allowed values.

### Buttons

> **The legacy `Button` component is deprecated.** New code should import and
> use `AcpButton` (v2) instead. The legacy `Button` will be removed in a future
> major release.

#### AcpButton (v2)

Current button implementation with `input()` signals, loading state, form
association and full Material Design variants.

```typescript
import { AcpButton } from '@acontplus/ng-components';

@Component({
  template: ` <acp-button text="Save" color="success" (clicked)="save()" /> `,
  imports: [AcpButton],
})
export class SaveComponent {
  save() {
    // handle click
  }
}
```

### AcpDialog

Reusable, strongly-typed dialog service built on Angular Material. Every dialog
renders inside `AcpDialogContainer`, so content components always read data with
`inject(ACP_DIALOG_DATA)` and close with `inject(AcpDialogRef<R>)`.

The service is `AcpDialogService`; `acp-dialog` is the declarative layout
wrapper used inside content components.

#### Imperative usage

```typescript
import { Component, inject } from '@angular/core';
import { AcpDialogRef, AcpDialogService } from '@acontplus/ng-components';

@Component({ ... })
export class UserListComponent {
  private dialogs = inject(AcpDialogService);

  openEdit(userId: number) {
    const ref = this.dialogs.open<UserForm, { id: number }, boolean>(UserForm, {
      title: 'Edit user',
      size: 'lg',
      data: { id: userId },
      actions: [
        { text: 'Cancel', appearance: 'text', result: false },
        { text: 'Save', color: 'success', result: true },
      ],
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        // user saved
      }
    });
  }
}
```

Clicking a configured action emits `ref.clickedResult` and then closes the
dialog with `action.result` (or `action.key` when `result` is not set). To
intercept the click without closing, call `event.preventDefault()` inside a
`clickedResult` subscriber.

#### Reactive action state

`AcpDialogAction.disabled` and `AcpDialogAction.loading` accept a boolean, a
`Signal<boolean>` or an `Observable<boolean>`:

```typescript
actions: [
  { text: 'Cancel', appearance: 'text' },
  {
    text: 'Save',
    color: 'success',
    disabled: this.canSave, // signal<boolean>
    loading: this.saving, // signal<boolean>
  },
],
```

#### Declarative layout

For full control inside a dialog content template, use `acp-dialog` with
`acp-dialog-titlebar`, `acp-dialog-content` and `acp-dialog-actions`:

```html
<acp-dialog>
  <acp-dialog-titlebar title="Edit user" icon="person" />

  <acp-dialog-content>
    <p>Dialog body</p>
  </acp-dialog-content>

  <acp-dialog-actions align="end">
    <acp-button text="Cancel" appearance="text" (clicked)="ref.close()" />
    <acp-button
      text="Save"
      color="success"
      [disabled]="form.invalid"
      (clicked)="ref.close(form.value)"
    />
  </acp-dialog-actions>
</acp-dialog>
```

#### Defaults

```typescript
import { provideAcpDialogDefaults } from '@acontplus/ng-components';

providers: [
  provideAcpDialogDefaults({
    fullScreenOnMobile: true,
    closeOn: { escapeKey: true, backdropClick: false },
  }),
],
```

#### API

- `AcpDialogService.open(component, config)` / `open({ content, ...config })`
- `AcpDialogRef.afterClosed()`, `close(result)`, `clickedResult`, `actionClicked$`
- `AcpDialogConfig` supports `size`, `width`, `height`, `title`, `header`,
  `actions`, `actionsAlign`, `closeOn`, `fullScreenOnMobile`, `bindings`,
  `ariaLabel`, `role`, etc.
- `AcpDialog`, `AcpDialogContent`, `AcpDialogTitlebar` and `AcpDialogActions` for
  declarative headers, body and footers.

### Dialog Wrapper

> **The `DialogWrapper` component is deprecated.** Use `AcpDialogService` and
> the `AcpDialog` declarative layout components instead. The wrapper will be
> removed in a future major release.

Enhanced dialog components with wrapper functionality for consistent dialog management.

```typescript
import { DialogWrapper } from '@acontplus/ng-components';
```

### AcpAlert

Inline message with a `type` (`default`, `info`, `success`, `warning`, `danger`), a `variant`
(`soft`, `outlined`, `filled`), an optional `heading`, a per-type icon and an actions slot.
`dismissible` adds a close button that hides the alert and emits `closed`; call `open()` to show
it again. Warnings and errors use `role="alert"`; the rest use `role="status"`.

```html
<acp-alert type="warning" heading="Certificado por vencer" dismissible>
  Renueva tu firma electrónica antes del 20/11/2026.
  <div acpAlertActions>
    <button matButton="filled">Renovar ahora</button>
  </div>
</acp-alert>
```

Inputs: `type`, `variant`, `heading`, `icon` (Material icon name), `showIcon`, `dismissible`,
`closeLabel` (default `Cerrar`), `elevation`.

### Input Chip

Chip input components integrated with Angular Material for tag/chip selection.

```typescript
import { InputChip } from '@acontplus/ng-components';
```

### AcpLogo

App logo loaded from an image URL, so changing it only means replacing the file. SVG files are
inlined: fills with `currentColor` or `var(--acp-logo-color, <default>)` follow the theme. PNG, JPG
and WebP render as `<img>`. Without an image, or when it fails to load, it shows the name as text: `label`,
`provideAcpLogo({ label })` or `provideAcpLayout({ branding: { name } })`. Size it with `height`
(default `44px`); the width follows the image.

```typescript
import { AcpLogo, provideAcpLogo } from '@acontplus/ng-components';

// app.config.ts
provideAcpLogo({ src: '/images/logo/logo.svg', label: 'AcontPlus' });
```

```html
<acp-logo style="height: 32px; --acp-logo-color: #ffffff" src="/images/logo/other.svg" />
```

### Spinner

Loading spinner components for async operations.

```typescript
import { Spinner } from '@acontplus/ng-components';
```

### Tables

- **DataGrid**: Advanced data grid with Material table integration, signals, and modern Angular patterns
- **TabulatorTable**: Advanced table with Tabulator.js integration

```typescript
import { DataGrid, AcpDataGridColumn, TabulatorTable } from '@acontplus/ng-components';
```

Grid types use the `Acp` prefix (`AcpDataGridColumn`, `AcpDataGridDefaultOptions`, ...). The
previous names (`DataGridColumn`, ...) remain as deprecated aliases and will be removed in a future
major version.

#### Data Grid Features

The DataGrid is the primary table component, built with modern Angular 22+ patterns:

- **Signals Architecture**: Uses `signal()`, `computed()`, `effect()` for reactive state
- **Modern APIs**: Uses `input()` and `output()` functions
- **Row Selection**: Single/multiple selection with formatter support
- **Row Highlighting**: Visual highlighting with `highlightedRowIndex`
- **Keyboard Navigation**: Opt-in with `keyboardNavigation="true"` (or globally with
  `DATA_GRID_DEFAULT_OPTIONS: { keyboardNavigation: true }`). Arrows, Home/End, PageUp/PageDown, Enter (row click),
  Space (toggle selection) and Ctrl+A (select all). Add `[acpGridNavigationFor]="grid"` to a
  search input to drive the rows while the focus stays in the input (no `keyboardNavigation`
  needed). For an autocomplete, the grid can live in a `cdkConnectedOverlay` `ng-template`: pass
  `viewChild<DataGrid>('grid')()` to the directive; keys are ignored while the grid is not rendered
- **Column Pinning**: Sticky left/right columns
- **Infinite Scroll**: Load more data on scroll
- **Server-side Support**: `pageOnFront`/`sortOnFront` toggles for backend pagination
- **Custom Templates**: Cell, header, and expansion templates
- **Sorting & Pagination**: Full Material integration

```typescript
// Basic usage
@Component({
  imports: [DataGrid],
  template: `
    <acp-data-grid
      [data]="items"
      [columns]="columns"
      [rowSelectable]="true"
      [multiSelectable]="true"
      [showPaginator]="true"
      [pageOnFront]="false"
      [length]="totalCount"
      [pageIndex]="currentPage"
      [pageSize]="pageSize"
      [loading]="isLoading"
      (rowSelectedChange)="onSelect($event)"
      (page)="onPageChange($event)"
    />
  `,
})
export class MyComponent {
  columns: AcpDataGridColumn[] = [
    { field: 'id', header: 'ID', type: 'number', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'status', header: 'Status', cellTemplate: statusTemplate },
    { field: 'actions', header: 'Actions', cellTemplate: actionsTemplate },
  ];
}
```

#### Scroll Height

Use `scrollHeight` to limit the height of the rows area. The header and footer rows stay fixed
while the rows scroll. It is opt-in: without it, the grid grows with its content as before.

```html
<!-- Maximum height; the grid shrinks when there are fewer rows -->
<acp-data-grid [data]="items" [columns]="columns" scrollHeight="400px" />

<!-- Fill the parent's height (the parent must have a height) -->
<div style="height: calc(100vh - 160px)">
  <acp-data-grid [data]="items" [columns]="columns" scrollHeight="flex" />
</div>
```

The same value can be set from a component stylesheet without `::ng-deep`, or globally through
`DATA_GRID_DEFAULT_OPTIONS` (`{ scrollHeight: '60vh' }`):

```scss
acp-data-grid {
  --acp-grid-scroll-height: 60vh;
}
```

#### Expandable Rows

The expanded state is tracked per row, so it follows the row when sorting or changing pages.
Set `dataKey` to keep it across data reloads (new row objects with the same id):

```html
<acp-data-grid
  [data]="orders"
  [columns]="columns"
  [expandable]="true"
  [expansionTemplate]="detailTpl"
  dataKey="id"
/>
```

```typescript
grid.isRowExpanded(row); // boolean
grid.toggleRowExpansion(row); // toggles; honors closeOthersOnExpand
grid.toggleRowExpansion(row, true); // expands
```

`toggleExpansion(index)` and `expansionRowStates` are deprecated; they still work and use the
position in `data`.

#### Row Groups

Set `rowGroupMode="subheader"` and `groupRowsBy` (a field name or a function) to render rows under
a header row per group. Rows of a group are kept together; groups follow the order of `data`, unless
the grid is sorted by the grouping field itself. Sorting by any other column sorts rows inside each
group.

```html
<acp-data-grid
  [data]="stock"
  [columns]="columns"
  rowGroupMode="subheader"
  groupRowsBy="warehouse"
  [expandableRowGroups]="true"
  [(collapsedRowGroups)]="collapsedWarehouses"
  [showRowGroupFooter]="true"
/>
```

- `expandableRowGroups` adds a toggle to each group header. `collapsedRowGroups` holds the keys of
  collapsed groups and supports two-way binding; `rowGroupToggle` emits `{ key, expanded }`.
- `showRowGroupFooter` adds a footer row after each group with each column's `summary` computed
  over the group rows (subtotals). `summary(values, colDef, rows)` receives the column values and
  the summarized rows, so computed columns can total other fields. `summaryTemplate` receives the group rows as `data` and the
  group as `group`.
- `rowGroupHeaderTemplate` replaces the header label; its context is `AcpDataGridRowGroupContext`
  (`key`, `rows`, `count`, `expanded`).
- Methods: `isRowGroupExpanded(key)` and `toggleRowGroup(key, expanded?)`.
- With front-end paging, a group split across pages repeats its header on the next page; the
  footer shows on the page with the group's last row and always totals the whole group.
- With server-side paging (`pageOnFront=false`), groups are built from the current page only.

#### Merged Cells (rowspan)

`mergeRows` on a column merges consecutive cells with equal values into one cell. It also accepts
a comparer `(previous, current) => boolean`. Merging is nested: a column only merges inside the
merged blocks of the merged columns to its left. `rowGroupMode="rowspan"` keeps the rows of each
`groupRowsBy` group together (also when sorting by another column) and merges that column.

```typescript
columns: AcpDataGridColumn<Row>[] = [
  { field: 'establishment', header: 'Establishment' },
  { field: 'warehouse', header: 'Warehouse', mergeRows: true },
  { field: 'product', header: 'Product', sortable: true },
];
```

```html
<acp-data-grid
  [data]="stock"
  [columns]="columns"
  rowGroupMode="rowspan"
  groupRowsBy="establishment"
/>
```

- Blocks are computed on the rendered page: a block split across pages starts again on the next
  page. They never cross row-group headers or footers.
- Only consecutive rows merge. Without `rowGroupMode`, sort or order the data so equal values are
  together.
- `mergeRows` is ignored when the grid is `expandable`, since detail rows would split the cells.
- Clicking a merged cell acts on its first row; consider leaving `rowStriped` off.

#### Tree Table

Set `treeChildren` (a field name or a function) to render nested rows, like PrimeNG's TreeTable.
`data` holds the root nodes and rows keep their own fields, so columns work as usual.

```html
<acp-data-grid
  #grid
  [data]="accounts"
  [columns]="columns"
  treeChildren="children"
  [(expandedTreeKeys)]="expanded"
  dataKey="code"
  [rowSelectable]="true"
  [multiSelectable]="true"
/>
```

- The indentation and toggle render in the column with `treeToggle: true` (the first displayed
  column by default); indent size: `--acp-grid-tree-indent` (20px).
- Nodes start collapsed. `expandedTreeKeys` holds the keys (`dataKey`, or the row itself) of the
  expanded nodes and supports two-way binding. Methods: `isTreeNodeExpanded(row)`,
  `toggleTreeNode(row, expanded?)`, `expandAll()`, `collapseAll()`.
- Paging counts root nodes, so children never split from their parent. Sorting sorts the siblings
  of each level.
- With multiple selection, selecting a node selects its loaded descendants and a parent is
  selected when all its children are (indeterminate when only some are). Disable with
  `[treePropagateSelection]="false"`. The master checkbox selects every loaded node.
- Lazy loading: return `true` from `treeHasChildren` for nodes whose children are not loaded
  (`undefined`). Expanding one shows a spinner and emits `treeNodeExpand`; assign the children
  and update `data` or call `grid.refreshTree()`.
- Accessibility: `role="treegrid"`, `aria-level` and `aria-expanded` on rows; with
  `keyboardNavigation`, → expands, ← collapses or moves to the parent.
- `rowGroupMode` and `mergeRows` are ignored in tree mode.

#### Gridlines

`showGridlines` adds vertical borders between all cells (header, body, footer and
group rows), like PrimeNG's `showGridlines`. Enable it for every grid with
`DATA_GRID_DEFAULT_OPTIONS: { showGridlines: true }` and change the color with
`--acp-grid-gridline-color`.

```html
<acp-data-grid [data]="data" [columns]="columns" showGridlines />
```

#### Row Selection Formatting

```typescript
// Disable selection for specific rows
<acp-data-grid
  [rowSelectable]="true"
  [rowSelectionFormatter]="{
    disabled: (row, index) => row.status === 'locked',
    hideCheckbox: (row, index) => row.isSystem
  }"
/>
```

#### Column Configuration

```typescript
const columns: AcpDataGridColumn[] = [
  {
    field: 'price',
    header: 'Price',
    type: 'currency',
    typeParameter: { currencyCode: 'USD' },
    sortable: true,
    pinned: 'left',
    width: '120px',
  },
  {
    field: 'date',
    header: 'Created',
    type: 'date',
    typeParameter: { format: 'yyyy-MM-dd' },
  },
];
```

#### Column Groups

Consecutive columns that share the same `group` path are merged under group
headers — one header row per level, so nested groups are supported. The header
of an ungrouped column (or of a column with fewer levels) spans the remaining
header rows (`rowspan`), like a PrimeNG column group; sorting, pinning and the
selection checkbox keep working from that cell. With `columnResizable`, headers
stay in the column header row with empty cells above them, because the resize
handles live on that row.

Each level of `group` accepts:

- a `string` or `Observable<string>` used as both key and label;
- a function `(data) => string | Observable<string>` resolved against the grid
  `data`, for dynamic titles taken from the rows;
- a `{ key, label? }` descriptor when the grouping value differs from the
  displayed text (e.g. group by `warehouseId` but show `warehouseName`).
  `label` defaults to the resolved `key`.

Strings are compared by value; `Observable`s are compared by instance.

`groupColor` colors a group without `::ng-deep` or global CSS: it takes any CSS
color (`'var(--mat-sys-tertiary)'`, `'#1976d2'`) or a function
`(group, memberColumns) => color`. The group header gets a top border in that
color and the member columns' header, data and footer cells a light tint
(`--acp-grid-group-tint`, 10% by default). With nested groups each header uses
its own level's color and the cells use the innermost one.

```typescript
const colors: Record<string, string> = {
  Entradas: 'var(--mat-sys-tertiary)',
  Salidas: 'var(--mat-sys-error)',
};
{ field: 'in', header: 'Qty', group: ['Kardex', 'Entradas'],
  groupColor: g => (typeof g === 'string' ? colors[g] : undefined) },
```

For full control, `groupClass` accepts a CSS class string or a formatter
`(group, memberColumns) => class`. The resolved classes are applied to each
group header cell and propagated to every member column's header and data
cells, so the whole column block can be styled (e.g. color entradas/salidas in
a kardex).

Use `summaryColspan` to make a summary (footer) cell span several columns, e.g. a
`'Total'` label over the first two columns. It applies to the grid footer and to
row-group footers, and stops at the first column with a different `pinned` value.

```typescript
{ field: 'description', header: 'Description', summary: 'Total', summaryColspan: 2 },
```

```typescript
const kardexGroupClass = (group: string | Observable<string>) =>
  typeof group === 'string'
    ? `kardex-group-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    : undefined;

// Groups by establecimientoId but shows establecimiento in the header.
const establecimiento = {
  key: (data: KardexRow[]) => data[0]?.establecimientoId ?? '',
  label: (data: KardexRow[]) => data[0]?.establecimiento ?? 'Establecimiento',
};

const columns: AcpDataGridColumn<KardexRow>[] = [
  { field: 'item', header: 'Item' },
  {
    field: 'warehouseA',
    header: 'Warehouse A',
    group: [establecimiento, 'Entradas'],
    groupClass: kardexGroupClass,
  },
  {
    field: 'warehouseB',
    header: 'Warehouse B',
    group: [establecimiento, 'Salidas'],
    groupClass: kardexGroupClass,
  },
  { field: 'total', header: 'Total' },
];
```

#### Inline Cell Editing

Mark a column with `editable: true` to enable inline editing. Clicking an
editable cell opens an overlay editor; press `Enter` or click outside to
confirm, `Escape` to cancel. Editable cells show a pointer cursor.

```typescript
const columns: AcpDataGridColumn<Product>[] = [
  { field: 'name', header: 'Name', editable: true },
  { field: 'price', header: 'Price', type: 'currency', editable: true },
  {
    field: 'quantity',
    header: 'Qty',
    type: 'number',
    editable: true,
    editValidator: value => {
      const num = Number(value);
      return Number.isInteger(num) && num >= 0 ? true : 'Must be a non-negative integer';
    },
  },
];

<acp-data-grid
  [data]="products"
  [columns]="columns"
  (cellEditChange)="onCellEdit($event)"
/>

// event: { row, field, oldValue, newValue }
onCellEdit(event: { row: Product; field: string; oldValue: any; newValue: any }) {
  // persist the change...
}
```

- `editValidator(value, rowData)` returns `true` to accept the value or a `string`
  error message to reject it. On failure the editor stays open, the message is
  shown under the field, and other cells cannot be edited until the value is
  fixed or the edit is cancelled.
- `editOptions` renders a dropdown (`mat-select`) instead of a text input. Each
  option can be a `string`/`number` or an object `{ value, label }`.
- Fields support nested paths (`'a.b.c'`), mirroring the cell value resolution.

#### Tabulator Table Features

- **Row Styling**: Same rowStyle property support as Dynamic Table
- **Advanced Filtering**: Built-in Tabulator filtering
- **Virtual Scrolling**: Performance optimization for large datasets
- **Tree Data**: Hierarchical data support
- **Custom Themes**: Material Design integration

```typescript
// Tabulator with row styling
<acp-tabulator-table
  [data]="tableData"
  [columns]="columns"
  [height]="400"
  [theme]="{ name: 'materialize' }"
/>
```

**Note**: Tabulator tables require `tabulator-tables` as a peer dependency:

```bash
# Using npm
npm install tabulator-tables

# Using pnpm
pnpm add tabulator-tables
```

#### Theme Integration

Both table components support automatic theme adaptation:

```scss
// Import Tabulator Material theme
@import 'tabulator-tables/dist/css/tabulator_materialize.min.css';
```

Row colors automatically adapt to light/dark themes using Material Design tokens or custom theme detection.

### Layout

`acp-layout` is the admin layout of the apps (MaterialPro style): header, collapsible sidebar with
the side menu, optional top menu and the page. It also handles mobile (overlay sidenav, closed after
navigating), the collapsed rail and scrolling to the top on navigation. Its options live in
`AcpLayoutSettings` (signals, persisted in `localStorage`) and `acp-customizer` edits them.

```typescript
// app.config.ts
provideAcpLayout({
  storageKey: 'acontplus-settings', // `null` keeps the options in memory
  branding: { name: 'AcontPlus', logo: 'images/logo.png' },
  defaults: { themeColor: 'pink', headerPos: 'fixed' },
});
```

`branding` controls `acp-branding` in the sidebar and the header:

| Option      | Description                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | App name, shown as text and used as the link's accessible name                                                                                 |
| `logo`      | Logo URL                                                                                                                                       |
| `display`   | `'logo-name'` (default), `'logo'` or `'name'`                                                                                                  |
| `logoShape` | `'circle'` (default, `2rem` round, as ng-matero) or `'rectangle'` (`2rem` high, up to `10rem` wide, keeps the aspect ratio and shrinks to fit) |
| `link`      | Route of the link (default `'/'`)                                                                                                              |

```typescript
// Only a wide logo, without the name
branding: { name: 'AcontPlus', logo: 'images/logo/acontplus.svg', display: 'logo', logoShape: 'rectangle' },
```

`--acp-branding-logo-height` and `--acp-branding-logo-max-width` change the rectangle size.

```html
<!-- admin-layout.html -->
<acp-layout [menu]="menu()">
  <acp-apps-button acpHeaderStart [apps]="apps" />
  <acp-theme-toggle acpHeaderEnd />
  <acp-notifications-button acpHeaderEnd [items]="notices()" footerLabel="Ver en el inicio" />
  <acp-user-menu acpHeaderEnd [user]="user()" [items]="userItems" (selected)="onUserItem($event)" />
  <acp-user-panel
    acpSidebarUser
    [title]="company()"
    [subtitle]="username()"
    [details]="defaults()"
  />
  <router-outlet />
</acp-layout>

<acp-customizer />
```

| Slot               | Where                                                  |
| ------------------ | ------------------------------------------------------ |
| `acpHeaderStart`   | Header, after the menu button and branding             |
| `acpHeaderEnd`     | Header, right side (after the fullscreen button)       |
| `acpSidebarUser`   | Top of the sidebar; hidden with `showUserPanel: false` |
| `acpSidebarFooter` | Bottom of the sidebar                                  |
| default            | Page content (`<router-outlet />`)                     |

- `menu` takes `AcpMenuItem[]` (`route`, `name`, `type`: `link` / `sub` / `extLink` /
  `extTabLink`, `icon`, `label`, `badge`, `children`). Routes are segments relative to the parent.
  Filter the items by permission before passing them; the library does not depend on a
  permissions package.
- Options (`AcpLayoutOptions`): `navPos` (`side` / `top`), `headerPos` (`fixed` / `static` /
  `above`), `showHeader`, `showUserPanel`, `sidenavOpened`, `sidenavCollapsed`, `dir`, `theme`
  (`light` / `dark` / `auto`), `themeColor` (a prebuilt theme), `cardBorder`, `boxed` and `radius` (px, 4-24, default 10).
- `AcpLayoutSettings` applies them to `<html>`: `color-scheme` and `theme-dark`, `theme-<color>`,
  `dir`, `acp-card-border`, `acp-boxed` and `--acp-skin-radius`. Read them with `settings.options()` / `isDark()` and
  change them with `settings.set({ ... })`. `provideAcpLayout` creates it on startup, so pages
  outside the layout (login) get the theme too.
- `acp-customizer` labels are Spanish by default; override them with `[labels]`. The panel is
  360px wide (Material's sidenav width, as in MaterialPro); change it with `[width]`.
- Header and sidebar widgets (data comes from the app):
  - `acp-apps-button`: dropdown grid of `AcpAppShortcut` (`title`, `subtitle`, `icon`, `color`,
    `route` or `href`).
  - `acp-theme-toggle`: light/dark button synced with `AcpLayoutSettings` and `acp-customizer`
    (see Theme Toggle).
  - `acp-notifications-button`: bell with a pulsing dot while `items` (`AcpNotificationItem`:
    `icon`, `tone` `primary`/`success`/`warning`/`error`, `title`, `text`, `route` +
    `queryParams` or `href`) is not empty; optional `footerLabel` / `footerRoute`; Spanish
    `[labels]` by default.
  - `acp-user-menu`: avatar (or initials) with a profile dropdown. `user`
    (`AcpUserMenuUser`: `name`, `subtitle`, `caption`, `role`, `avatar`) and `items`
    (`AcpUserMenuItem`: `id`, `label`, `icon`, `route`, `danger`); items without `route` emit
    `selected` (logout, reload...).
  - `acp-user-panel`: `title`, `subtitle`, optional `avatar`, `link` and `details`
    (`AcpUserPanelDetail`: `icon`, `value`, `tooltip`).
- `acp-sidemenu`, `acp-topmenu` and `acp-branding` can be used on their own. `buildMenuRoute` and
  `isMenuItemActive` are exported for app menus.
- Look: structural styles only (Material fallbacks). With acontpluspro the header takes the brand
  color, the sidebar header the surface, and the menus the pill style.

### Theme Toggle

Dark/light mode toggle component for theme switching. Provides accessible theme switching with customizable icons and labels.

**Features:**

- ✅ Accessible - ARIA labels and pressed state
- ✅ Customizable icons and labels
- ✅ Signal-based reactive state
- ✅ Shares state with `acp-layout` and `acp-customizer` through `AcpLayoutSettings` (persisted)
- ✅ `auto` follows the system preference; the toggle switches to the opposite of the effective mode
- ✅ OnPush change detection for performance

```typescript
import { ThemeToggle } from '@acontplus/ng-components';

@Component({
  template: `
    <!-- Basic usage -->
    <acp-theme-toggle />

    <!-- With custom labels (i18n ready) -->
    <acp-theme-toggle lightModeLabel="Switch to light mode" darkModeLabel="Switch to dark mode" />

    <!-- With custom icons -->
    <acp-theme-toggle lightModeIcon="wb_sunny" darkModeIcon="nightlight" />

    <!-- With test ID for automated testing -->
    <acp-theme-toggle testId="header-theme-toggle" />
  `,
  imports: [ThemeToggle],
})
export class HeaderComponent {}
```

**Theme Toggle API:**

| Input            | Type     | Default         | Description                                   |
| ---------------- | -------- | --------------- | --------------------------------------------- |
| `lightModeIcon`  | `string` | `'light_mode'`  | Icon shown when in dark mode (Material icon)  |
| `darkModeIcon`   | `string` | `'dark_mode'`   | Icon shown when in light mode (Material icon) |
| `lightModeLabel` | `string` | `'Modo claro'`  | Accessible label when in dark mode            |
| `darkModeLabel`  | `string` | `'Modo oscuro'` | Accessible label when in light mode           |
| `testId`         | `string` | `''`            | data-testid attribute for testing             |

### AcpSearchSelect

Searchable select built on `mat-autocomplete`. Accepts flat lists or one-level
groups (items with a `children` array), ignores accents when searching and works
with `ngModel`, reactive forms (including the `required` error state) and `[(value)]`.

```html
<acp-search-select [items]="cities" [(ngModel)]="cityId" [emptyValue]="0" label="Ciudad" />

<!-- Server-side search: debounce in the consumer and pass the results back -->
<acp-search-select
  [items]="customers()"
  [localFilter]="false"
  [loading]="loading()"
  (searchChange)="search($event)"
  label="Cliente"
/>
```

- Defaults match the backend lookup shape `{ id, value, children? }`:
  `bindValue="id"`, `bindLabel="value"`, `groupLabel="value"`. Each accessor
  also accepts a function, e.g. `[bindLabel]="labelOf"`.
- Inputs: `items`, `bindLabel`, `bindValue`, `children`, `groupLabel`,
  `compareWith` (matches `1` and `'1'` by default), `filterFn`, `localFilter`,
  `emptyValue`, `label`, `placeholder`, `hint`, `errorText`, `noResultsText`,
  `clearLabel`, `appearance`, `required`, `disabled`, `clearable` and `loading`.
- Outputs: `optionSelected` (`{ value, item, group }`), `cleared` and
  `searchChange`.
- Custom option content: `<ng-template #option let-item let-group="group">`.
- Typed text that is not selected is discarded when the panel closes, so the
  field always shows the current value.

### AcpFileUpload

File picker and uploader similar to PrimeNG's FileUpload: toolbar (choose, upload, cancel),
drag-and-drop zone, image previews, upload progress, validation and a single-button `basic` mode.
Files are uploaded with `HttpClient` as `multipart/form-data`, so the app interceptors apply.

```typescript
import { AcpFileUpload } from '@acontplus/ng-components';
```

```html
<!-- Advanced: images and PDF up to 1 MB, at most 5 files -->
<acp-file-upload
  url="/api/attachments"
  name="files"
  [multiple]="true"
  accept="image/*,.pdf"
  [maxFileSize]="1048576"
  [fileLimit]="5"
  (uploadSuccess)="onUploaded($event)"
  (uploadError)="onError($event)"
/>

<!-- Basic: one button that uploads as soon as a file is chosen -->
<acp-file-upload
  mode="basic"
  url="/api/sri/xml"
  accept=".xml"
  [auto]="true"
  chooseLabel="Cargar XML"
/>

<!-- Custom upload through your own service -->
<acp-file-upload #upload [customUpload]="true" (uploadHandler)="save($event.files, upload)" />

<!-- Forms: the value is File[] or null -->
<acp-file-upload [formControl]="attachments" [multiple]="true" />
```

- **Upload:** `url`, `method` (`post`/`put`), `name` (multipart field, `files` by default),
  `headers`, `withCredentials`. `beforeUpload` exposes the `FormData` to append fields.
  `uploadProgress`, `uploadSuccess` and `uploadError` report the request. Without `url`, or with
  `customUpload`, `uploadHandler` is emitted instead; call `completeUpload(files)` when done.
- **Validation:** `accept` (same format as the input attribute), `maxFileSize` in bytes and
  `fileLimit` (counting uploaded files). Rejected files show a dismissible message and are listed
  in `filesSelect.rejected`. A file with the same name, type and size is not added twice.
- **Behavior:** `mode` (`advanced`/`basic`), `multiple`, `auto`, `disabled`, `showUploadButton`,
  `showCancelButton`, `previewWidth`.
- **Texts** (Spanish by default): `chooseLabel`, `uploadLabel`, `cancelLabel`, `removeLabel`,
  `emptyText`, `pendingLabel`, `uploadedLabel`, `dismissLabel`, and the messages
  `invalidFileSizeMessage` (`{0}` name, `{1}` size), `invalidFileTypeMessage` (`{0}` name,
  `{1}` types) and `invalidFileLimitMessage` (`{0}` limit).
- **Templates:** `<ng-template #file let-file let-status="status" let-remove="remove">` for each
  row (`AcpFileUploadFileContext`), `#empty` for the drop zone, `#toolbar` for extra actions.
- **Methods:** `choose()`, `upload()`, `clear()` (also cancels an upload in progress),
  `remove(file)`, `completeUpload(files?)`. Signals: `files`, `uploadedFiles`, `progress`,
  `uploading`.
- **Styling:** `--acp-file-upload-border-color`, `--acp-file-upload-radius` and
  `--acp-file-upload-dragover-color`. Helpers `acpFileUploadFormatSize(bytes)` and
  `acpFileUploadAccepts(file, accept)` are exported.

## Directives

### ToUpperCase

Transforms input text to uppercase automatically.

```typescript
import { ToUpperCase } from '@acontplus/ng-components';
```

## Pipes

### GetTotalPipe

Calculates totals from arrays of objects.

```typescript
import { GetTotalPipe } from '@acontplus/ng-components';
```

### StatusDisplayPipe

Formats status values for display.

```typescript
import { StatusDisplayPipe } from '@acontplus/ng-components';
```

## Services

### AdvancedDialogService

Manages dialog creation and lifecycle with advanced features.

```typescript
import { AdvancedDialogService } from '@acontplus/ng-components';
```

### OverlayService

Manages overlay components and positioning.

```typescript
import { OverlayService } from '@acontplus/ng-components';
```

### AutocompleteWrapperService

Provides autocomplete functionality and data management.

```typescript
import { AutocompleteWrapperService } from '@acontplus/ng-components';
```

## Form Controls

### DynamicInput

Dynamic form input components for flexible form creation.

```typescript
import { DynamicInput } from '@acontplus/ng-components';
```

## Models

Exported models for type safety:

- **Mat Table Models**: Material table configuration models
- **Pagination**: Pagination models and interfaces
- **Autocomplete Wrapper**: Autocomplete configuration models

```typescript
import { PaginationModel, AutocompleteWrapperModel } from '@acontplus/ng-components';
```

## Types

### Tabulator Types

TypeScript definitions for Tabulator table configurations.

```typescript
import { TabulatorTypes } from '@acontplus/ng-components';
```

## Styling

The library includes custom SCSS files:

- **\_mixins.scss**: Reusable SCSS mixins
- **\_variables.scss**: Theme variables and constants
- **\_custom-dialog.scss**: Custom dialog styles
- **index.scss**: Main stylesheet entry point

Import styles in your application:

```scss
@import '@acontplus/ng-components/styles';
// For Tabulator Material theme
@import 'tabulator-tables/dist/css/tabulator_materialize.min.css';
```

### Prebuilt Themes

Color themes (`blue`, `aqua`, `purple`, `green`, `cyan`, `orange`, `pink`, `rose`), each a
`.theme-<name>` class to put on `<html>`. They provide colors only (M3 palette and the brand color
`--acp-theme-primary-color`); the look comes from acontpluspro. All of them are defined in one map,
`$prebuilt-themes` (`core/theming/prebuilt/_themes.scss`).

```scss
@use '@acontplus/ng-components/prebuilt-themes/all'; // the 8 themes
@use '@acontplus/ng-components/prebuilt-themes/blue'; // or only the ones you need
```

Or generate them in Sass: `@include acp.prebuilt-theme('blue')` / `acp.prebuilt-all-themes()`.

### Design Tokens

The shared look of every component (inspired by MaterialPro) is defined once in
`core/tokens/_acp-system.scss` and emitted as `--acp-sys-*` CSS variables
only by acontpluspro. Components read them with an M3 fallback, so they also work with a plain
`mat.theme()` or a prebuilt theme alone (Material look).

| Token                                               | Use                                         |
| --------------------------------------------------- | ------------------------------------------- |
| `--acp-sys-surface-raised`                          | Cards and panels (white in light mode)      |
| `--acp-sys-shadow-1` / `--acp-sys-shadow-2`         | Soft resting shadow / raised (hover) shadow |
| `--acp-sys-heading-size`, `-line-height`, `-weight` | Card, panel and dialog titles (18px/600)    |
| `--acp-sys-easing-standard`                         | Transitions                                 |

The prebuilt themes provide colors only (Roboto, Material look). acontpluspro switches the font to
**Poppins** (`Poppins, Roboto, 'Helvetica Neue', sans-serif`). The library does not load fonts;
add Poppins to your app, e.g. in `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Override tokens with CSS, e.g. `--acp-sys-heading-weight: 600`.

### acontpluspro

`acontpluspro` holds the global styles that every component (Material and acontplus) inherits,
inspired by MaterialPro: typography (Poppins, 14px body), elevations (`--mat-sys-level1/2`),
borders, corner radius (10px) and surfaces (white on a blue-gray background). Prebuilt themes only
provide colors; acontpluspro provides the look. It only sets tokens (`--mat-sys-*`, Material
component overrides, `--acp-sys-*` and `--acp-*` component tokens) plus a few structural rules
(select/menu panels, side and top menu pills, header and sidenav shadows, sidebar header on the
surface). Load it after the themes:

```scss
@use '@acontplus/ng-components/prebuilt-themes/blue';
@use '@acontplus/ng-components/acontpluspro';
```

acontpluspro is the single global style layer: besides the look it emits the layout sizes
(`--acp-gutter`, `--acp-spacing`, `--acp-sidenav-width`, `--acp-sidenav-collapsed-width`) and the
body, code, link, header, top menu, side menu and user panel variables. Components read all of
them with a fallback (Material values, or `acp-system.$layout` defaults), so they also work
without it.

Text utilities (MaterialPro / Tailwind scale), backed by `--acp-sys-text-*` and
`--acp-sys-font-weight-*`:

| Class                                                       | Size / line height                                       |
| ----------------------------------------------------------- | -------------------------------------------------------- |
| `acp-text-xs` · `sm` · `base` · `lg` · `xl` · `2xl` · `3xl` | 12/16 · 14/20 · 16/24 · 18/28 · 20/28 · 24/32 · 30/36 px |
| `acp-font-normal` · `medium` · `semibold` · `bold`          | 400 · 500 · 600 · 700                                    |

```html
<h4 class="acp-text-lg acp-font-semibold">Revenue</h4>
```

For MaterialPro/Tailwind class names without prefix (`text-sm`, `font-semibold`), include
`@include acp.acontpluspro-utilities('')`. In component styles, use the tokens instead of the
classes: `font-size: acp.acp-system-text-size(sm)`.

Or with your own values:

```scss
@use '@acontplus/ng-components' as acp;

@include acp.acontpluspro-apply(
  (
    radius: 8px,
    background: light-dark(#f4f7fb, #141a21),
  )
);
```

- Variables: `--acp-skin-background`, `-surface`, `-surface-muted`, `-text`, `-text-muted`,
  `-border`, `-field-border`, `-field-background`, `-radius`, `-shadow-card`, `-shadow-popup`,
  `-shadow-nav` and `-accent`. Use them in app screens instead of literal colors.
- Top menu (`navPos: 'top'`): white bar with pill items, aligned with the header to the boxed
  width (1300px).
- Opt-in classes: `acp-card-border` on `<html>` (borders instead of card shadows), `acp-boxed` on
  `<html>` (centered page content, max 1300px) and `acp-page-boxed` on a page root.
- Dark values use `light-dark()`, so the app must set `color-scheme: dark` in dark mode.
- The library does not load fonts: add Poppins to the app (see Design Tokens).
- App-specific styles (Bootstrap `.card`/`.table`/`.form-control`, global `h1`-`h6` resets,
  `.text-muted`) are not part of acontpluspro; keep them in the app.

### Theme-Aware Row Styling

Components support dynamic row styling that adapts to Material Design themes:

```typescript
// Theme detection utility
const isDark = inject(AcpLayoutSettings).isDark();

// Status-based styling
function getStatusStyle(status: string) {
  switch (status) {
    case 'success':
      return isDark
        ? { backgroundColor: '#1b5e20', color: '#81c784' }
        : { backgroundColor: '#e8f5e8', color: '#2e7d32' };
    case 'error':
      return isDark
        ? { backgroundColor: '#b71c1c', color: '#ffcdd2' }
        : { backgroundColor: '#ffebee', color: '#c62828' };
    default:
      return {};
  }
}
```

### AcpVanillaDateRangePicker

Picker de rango de fechas basado en la librería vanilla original. Mantiene la misma UI y funcionalidad: calendarios duales, rangos predefinidos, time picker y botones aplicar/cancelar.

**Los scripts JS y estilos se cargan automáticamente** al usar el componente. No necesitas copiar archivos ni agregar script tags manualmente.

#### Uso

```typescript
import { AcpVanillaDateRangePicker } from '@acontplus/ng-components';

@Component({
  standalone: true,
  imports: [AcpVanillaDateRangePicker],
  // ...
})
export class MiComponente {
  from: string | null = null;
  to: string | null = null;

  onDateRangeChanged(range: { from: string; to: string }) {
    this.from = range.from;
    this.to = range.to;
  }
}
```

```html
<!-- Uso básico -->
<acp-vanilla-date-range-picker
  label="Selecciona un rango"
  [from]="from"
  [to]="to"
  [options]="{ timePicker: false, format: 'YYYY-MM-DD' }"
  (dateRangeChange)="onDateRangeChanged($event)"
/>

<!-- Con time picker -->
<acp-vanilla-date-range-picker
  [options]="{ timePicker: true, format: 'YYYY-MM-DD HH:mm:ss' }"
  (dateRangeChange)="onDateRangeChanged($event)"
/>

<!-- Con checkbox -->
<acp-vanilla-date-range-picker
  [showMatPrefix]="true"
  [(checkbox)]="isRequired"
  (checkboxToggled)="onCheckboxToggled()"
  (dateRangeChange)="onDateRangeChanged($event)"
/>
```

- Inputs: `from`, `to` (strings), `options` (`{ timePicker: boolean, format: string }`),
  `label`, `showMatPrefix`, `showMatSuffix`, `checkbox`, `requiredDate`.
- Outputs: `dateRangeChange` emite `{ from: string, to: string }`,
  `checkboxToggled`, `valueChangeRequiredDate`.
- Los rangos predefinidos incluyen: Hoy, Ayer, Últimos 5/10/15/30 días, Esta semana, Este mes, El mes pasado.

## Peer Dependencies

- `@angular/cdk`: ^22.1.0
- `@angular/common`: ^22.1.0
- `@angular/core`: ^22.1.0
- `@angular/forms`: ^22.1.0
- `@angular/material`: ^22.1.0
- `@angular/platform-browser`: ^22.1.0
- `@angular/router`: ^22.1.0
- `tabulator-tables`: ^6.5.2
