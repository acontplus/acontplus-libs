# AcpHeader Component

A flexible, enterprise-grade header component following SOLID principles and Clean Architecture. The header is designed as a presentational component that renders content based on configuration and slots.

## Architecture Overview

The AcpHeader component has been refactored to follow enterprise-grade architectural principles:

- **Single Responsibility**: The header only manages layout and rendering of header content
- **Open/Closed**: Extensible via configuration and slots without modifying the component
- **Dependency Inversion**: Removed direct dependencies on screenfull, Branding, and UserMenu components
- **Interface Segregation**: Single `config` input instead of 11+ scattered inputs
- **Composition over Configuration**: Slots allow complete customization of content

## API

### Inputs

| Input    | Type              | Default | Description                              |
| -------- | ----------------- | ------- | ---------------------------------------- |
| `config` | `AcpHeaderConfig` | `{}`    | Main configuration object for the header |

### Outputs

| Output     | Type                         | Description                               |
| ---------- | ---------------------------- | ----------------------------------------- |
| `action`   | `AcpHeaderActionEvent`       | Emitted when a header action is triggered |
| `userMenu` | `AcpHeaderUserMenuItemEvent` | Emitted when a user menu item is selected |
| `branding` | `void`                       | Emitted when branding is selected         |

### Slots

| Slot            | Description              |
| --------------- | ------------------------ |
| `#branding`     | Custom branding content  |
| `#userMenu`     | Custom user menu content |
| `#actions`      | Custom actions content   |
| `[slot-left]`   | Left region content      |
| `[slot-center]` | Center region content    |
| `[slot-right]`  | Right region content     |

## Types

### AcpHeaderConfig

```typescript
interface AcpHeaderConfig {
  actions?: AcpHeaderAction[];
  branding?: AcpHeaderBrandingConfig;
  userMenu?: AcpHeaderUserMenuConfig;
  elevation?: boolean;
  sticky?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}
```

### AcpHeaderAction

```typescript
interface AcpHeaderAction {
  id: string;
  icon?: string;
  label?: string;
  tooltip?: string;
  position?: 'left' | 'right';
  disabled?: boolean;
  visible?: boolean;
  badge?: number | string;
  event: string;
}
```

### AcpHeaderBrandingConfig

```typescript
interface AcpHeaderBrandingConfig {
  logo?: string;
  name?: string;
  showName?: boolean;
  link?: string;
}
```

### AcpHeaderUserMenuConfig

```typescript
interface AcpHeaderUserMenuConfig {
  avatar?: string;
  name?: string;
  email?: string;
  items?: AcpHeaderUserMenuItem[];
}
```

## Usage Examples

### Basic Usage

```typescript
import { Header, type AcpHeaderConfig } from '@acontplus/ng-components';

@Component({
  standalone: true,
  imports: [Header],
  template: ` <acp-header [config]="headerConfig" (action)="onAction($event)" /> `,
})
export class AppComponent {
  headerConfig: AcpHeaderConfig = {
    actions: [
      { id: 'menu', icon: 'menu', event: 'toggleSidenav', position: 'left' },
      { id: 'search', icon: 'search', event: 'search', position: 'right' },
    ],
    branding: {
      logo: '/assets/logo.png',
      name: 'My App',
      showName: true,
      link: '/',
    },
  };

  onAction(event: AcpHeaderActionEvent) {
    console.log('Action triggered:', event);
  }
}
```

### With Custom Branding

```html
<acp-header [config]="headerConfig">
  <ng-template #branding>
    <div class="custom-branding">
      <img src="/custom-logo.png" alt="Logo" />
      <span>Custom Brand</span>
    </div>
  </ng-template>
</acp-header>
```

### With User Menu

```typescript
headerConfig: HeaderConfig = {
  userMenu: {
    avatar: '/assets/avatar.png',
    name: 'John Doe',
    email: 'john@example.com',
    items: [
      { id: 'profile', label: 'Profile', icon: 'person' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
      { id: 'logout', label: 'Logout', icon: 'logout' },
    ],
  },
};
```

### With Actions and Badges

```typescript
headerConfig: HeaderConfig = {
  actions: [
    {
      id: 'notifications',
      icon: 'notifications',
      event: 'notifications',
      position: 'right',
      badge: 5,
    },
    {
      id: 'messages',
      icon: 'mail',
      event: 'messages',
      position: 'right',
      badge: '99+',
    },
  ],
};
```

### With Theme and Elevation

```typescript
headerConfig: HeaderConfig = {
  elevation: true,
  sticky: true,
  theme: 'dark',
  // ... other config
};
```

### Using Slots for Regions

```html
<acp-header [config]="headerConfig">
  <div slot-left>
    <button (click)="toggleMenu()">Menu</button>
  </div>
  <div slot-center>
    <h1>My App</h1>
  </div>
  <div slot-right>
    <button (click)="logout()">Logout</button>
  </div>
</acp-header>
```

## Migration from Old API

### Before (Old API)

```html
<acp-header
  [showToggle]="true"
  [showBranding]="true"
  [showSearch]="true"
  [showFullscreen]="true"
  [showUserMenu]="true"
  [brandingLogo]="'/assets/logo.png'"
  [brandingName]="'My App'"
  [showBrandingName]="true"
  [brandingLink]="'/'"
  [userAvatar]="'/assets/avatar.png'"
  [userMenuItems]="menuItems"
  (toggleSidenav)="onToggle()"
  (searchClick)="onSearch()"
  (userMenuItemClick)="onMenuClick($event)"
/>
```

### After (New API)

```html
<acp-header
  [config]="{
    actions: [
      { id: 'menu', icon: 'menu', event: 'toggleSidenav', position: 'left' },
      { id: 'search', icon: 'search', event: 'search', position: 'right' },
    ],
    branding: {
      logo: '/assets/logo.png',
      name: 'My App',
      showName: true,
      link: '/',
    },
    userMenu: {
      avatar: '/assets/avatar.png',
      items: menuItems,
    },
  }"
  (actionClick)="onAction($event)"
/>
```

## Benefits of Refactored API

1. **Smaller API**: 1 input instead of 11+ inputs
2. **Type Safety**: Full TypeScript support with interfaces
3. **Scalability**: Add new features without modifying the component
4. **Flexibility**: Slots allow complete customization
5. **Maintainability**: Centralized configuration object
6. **Performance**: OnPush change detection strategy
7. **Modern Angular**: Uses signals, computed, and control flow

## Accessibility

The component follows WCAG 2.1 guidelines:

- All buttons have `aria-label` attributes
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

The architecture supports future features without modifying the component:

- Plugin system for third-party extensions
- Dynamic action registration
- Multi-language support
- Advanced user menu with dropdown
- Breadcrumb integration
- Quick actions menu
- Help and documentation integration

## License

Part of the Acontplus ng-components library.
