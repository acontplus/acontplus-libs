# @acontplus/ui-kit

Framework-agnostic UI Kit library for AcontPlus applications, providing reusable design assets, icon definitions, and design system elements.

## Installation

```bash
# Using npm
npm install @acontplus/ui-kit

# Using pnpm
pnpm add @acontplus/ui-kit
```

## Features

- **Icon Definitions**: Framework-agnostic SVG icon collection
- **Design System**: Button types, select options, and UI component types
- **Notification Constants**: Messages, durations, and icon mappings
- **Framework Agnostic**: Pure TypeScript/JavaScript - works with any framework
- **TypeScript Support**: Full type safety with comprehensive interfaces

## Icon Definitions

The library provides a collection of SVG icons as pure data that can be used with any framework.

### Available Icons

**Navigation & Layout:**

- `home` - Home icon
- `menu` - Hamburger menu icon
- `dashboard` - Dashboard/grid layout icon
- `arrow-right` - Right arrow
- `arrow-left` - Left arrow
- `arrow-up` - Up arrow
- `arrow-down` - Down arrow

**User & Security:**

- `user` - User profile icon
- `lock` - Lock icon
- `unlock` - Unlock icon
- `visibility` - Show/eye icon
- `visibility-off` - Hide/eye-off icon

**Actions:**

- `search` - Search/magnifying glass icon
- `add` - Plus/add icon
- `remove` - Minus/remove icon
- `edit` - Edit/pencil icon
- `delete` - Delete/trash icon
- `save` - Save/floppy disk icon
- `refresh` - Refresh/reload icon
- `close` - Close/X icon
- `check` - Checkmark icon
- `filter` - Filter icon
- `sort` - Sort icon

**Files & Data:**

- `file` - File/document icon
- `folder` - Folder icon
- `download` - Download icon
- `upload` - Upload icon
- `copy` - Copy icon
- `print` - Print icon

**Communication:**

- `mail` - Email/mail icon
- `phone` - Phone icon
- `notification` - Bell/notification icon
- `share` - Share icon
- `link` - Link icon
- `external-link` - External link icon

**Feedback & Status:**

- `info` - Information icon
- `warning` - Warning triangle icon
- `error` - Error circle icon
- `help` - Help/question icon
- `star` - Star/favorite icon
- `heart` - Heart/like icon

**Time & Location:**

- `calendar` - Calendar icon
- `clock` - Clock/time icon
- `location` - Location/map pin icon

**Settings:**

- `settings` - Settings gear icon

### Usage

```typescript
import { DEFAULT_ICONS, FALLBACK_ICON, IconDefinition, IconName } from '@acontplus/ui-kit';

// Access all default icons
console.log(DEFAULT_ICONS); // Array of IconDefinition objects

// Get a specific icon
const homeIcon = DEFAULT_ICONS.find((icon) => icon.name === 'home');
console.log(homeIcon?.data); // SVG string

// Use fallback icon
console.log(FALLBACK_ICON); // Question mark SVG string

// Type-safe icon names
const iconName: IconName = 'search'; // Autocomplete works!
```

### Icon Definition Interface

```typescript
interface IconDefinition {
  name: string;
  data: string; // SVG markup as string
}
```

### Using with Angular

If you're using Angular, install `@acontplus/ng-components` which provides ready-to-use Angular components that consume these icon definitions.

```bash
pnpm add @acontplus/ng-components
```

```typescript
import { SvgIcon } from '@acontplus/ng-components';

// The SvgIcon component automatically uses icons from @acontplus/ui-kit
<acp-svg-icon name="home" size="24px" />
```

### Using with Other Frameworks

Since these are pure SVG strings, you can use them with any framework:

**React:**

```typescript
import { DEFAULT_ICONS } from '@acontplus/ui-kit';

function Icon({ name }) {
  const icon = DEFAULT_ICONS.find(i => i.name === name);
  return <div dangerouslySetInnerHTML={{ __html: icon?.data || '' }} />;
}
```

**Vue:**

```vue
<script setup>
import { DEFAULT_ICONS } from '@acontplus/ui-kit';

const props = defineProps(['name']);
const icon = DEFAULT_ICONS.find((i) => i.name === props.name);
</script>

<template>
  <div v-html="icon?.data"></div>
</template>
```

**Svelte:**

```svelte
<script>
  import { DEFAULT_ICONS } from '@acontplus/ui-kit';
  export let name;

  $: icon = DEFAULT_ICONS.find(i => i.name === name);
</script>

{@html icon?.data}
```

## Design System Types

### Button Types

```typescript
import { ButtonType, ButtonVariant, MaterialButtonStyle } from '@acontplus/ui-kit';

// Button HTML types
type ButtonType = 'button' | 'submit' | 'reset';

// Color variants
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

// Material Design button styles
type MaterialButtonStyle = 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab' | 'elevated';
```

### Report Format Enum

```typescript
import { REPORT_FORMAT } from '@acontplus/ui-kit';

// Available export formats
enum REPORT_FORMAT {
  PDF = 'PDF',
  EXCEL = 'Excel',
  WORD = 'Word',
  IMAGE = 'Image',
  XML = 'XML',
  CSV = 'CSV',
  MHTML = 'MHTML',
  HTML = 'HTML',
}
```

### Select Options

```typescript
import { SelectOption } from '@acontplus/ui-kit';

interface SelectOption<T = any> {
  value: T;
  viewValue: string;
}

// Usage
const countries: SelectOption<string>[] = [
  { value: 'us', viewValue: 'United States' },
  { value: 'ca', viewValue: 'Canada' },
];
```

## Notification Constants

```typescript
import { PagedResult } from '@acontplus/ui-kit';

interface PagedResult<T> {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  metadata?: Record<string, any>;
}

// Usage
const result: PagedResult<Product> = {
  items: products,
  pageIndex: 1,
  pageSize: 25,
  totalCount: 100,
  totalPages: 4,
  hasPreviousPage: false,
  hasNextPage: true,
};
```

## Notification Constants

### Messages

```typescript
import { NOTIFICATION_MESSAGES } from '@acontplus/ui-kit';

// Pre-defined notification messages
NOTIFICATION_MESSAGES.SUCCESS.SAVE; // 'Data saved successfully'
NOTIFICATION_MESSAGES.ERROR.NETWORK; // 'Network error occurred'
NOTIFICATION_MESSAGES.WARNING.UNSAVED_CHANGES; // 'You have unsaved changes'
NOTIFICATION_MESSAGES.INFO.LOADING; // 'Loading data...'
```

### Durations

```typescript
import { NOTIFICATION_DURATIONS } from '@acontplus/ui-kit';

// Standard durations in milliseconds
NOTIFICATION_DURATIONS.SHORT; // 3000
NOTIFICATION_DURATIONS.MEDIUM; // 5000
NOTIFICATION_DURATIONS.LONG; // 8000
NOTIFICATION_DURATIONS.PERSISTENT; // 0
```

### Icon Mappings

```typescript
import { NOTIFICATION_ICONS } from '@acontplus/ui-kit';

// Material icon names for notification types
NOTIFICATION_ICONS.success; // 'check_circle'
NOTIFICATION_ICONS.error; // 'error'
NOTIFICATION_ICONS.warning; // 'warning'
NOTIFICATION_ICONS.info; // 'info'
```

## Status

✅ **Icons Module** - Framework-agnostic icon definitions  
✅ **Design System Types** - Button types, select options, report formats  
✅ **Notification Constants** - Messages, durations, icon mappings

All modules are production-ready!

> **Note**: Domain models like `BaseEntity` and `PagedResult` have been moved to `@acontplus/core` as they represent business domain concerns. See the core package for entity interfaces, pagination, and business logic types.

## Development

```bash
# Build the library
nx build ui-kit

# Run tests
nx test ui-kit

# Lint code
nx lint ui-kit
```

## Contributing

This library follows the same patterns and conventions as other packages in the
AcontPlus monorepo. Please refer to the main project documentation for
contribution guidelines.
