---
ng-components: major
---

Replaced the shell components with `acp-layout`, the admin layout of acontplus-frontend.

- New `acp-layout`: header, collapsible sidebar with `acp-sidemenu`, `acp-topmenu` (`navPos:
'top'`) and the page. Handles mobile (overlay sidenav closed after navigating), the collapsed
  rail, header positions (`fixed`, `static`, `above`) and scrolling to the top. Apps project their
  widgets with the `acpHeaderStart`, `acpHeaderEnd`, `acpSidebarUser` and `acpSidebarFooter`
  attributes and the page as default content.
- New `AcpLayoutSettings` (signals, persisted in `localStorage`) and `provideAcpLayout({ defaults,
storageKey, branding, mobileQuery, fullscreenButton })`. It applies `color-scheme`,
  `theme-dark`, `theme-<color>`, `dir`, `acp-card-border` and `acp-boxed` on `<html>`.
- New `acp-customizer`: draggable settings button with a drawer to edit the layout options
  (Spanish labels by default, `[labels]` to override).
- New header and sidebar widgets from acontplus-frontend: `acp-apps-button` (`AcpAppShortcut`),
  `acp-notifications-button` (`AcpNotificationItem`, pulsing dot, Spanish labels by default) and
  `acp-user-panel` (`AcpUserPanel`, replaces `UserPanel`: inputs `title`, `subtitle`, `avatar`,
  `link` and `details` instead of `name`, `email` and `profileLink`; avatar and link are
  optional).
- Rebuilt the user menu as `AcpUserMenu` (replaces `UserMenu`) with the acontplus-frontend profile
  menu: avatar or initials, header with name, role chip, subtitle and caption, and plain items.
  `AcpUserMenuUser` (`name`, `subtitle`, `caption`, `role`, `avatar`) replaces `UserProfile`
  (`email` and `plan`); `AcpUserMenuItem` takes `route` instead of `routerLink`, items without
  route emit the new `selected` output instead of a `click` callback, and `badge` was removed.
  `UserMenuSelectedEvent` was removed.
- New `AcpMenuItem`, `buildMenuRoute`, `menuPath` and `isMenuItemActive`.
- Removed `AcpShellLayout` and its slot directives, the `AcpSidebar*` components and the
  `AcpHeader*` components (`AcpHeaderActions`, `AcpHeaderNotifications`, `AcpHeaderWorkspace`,
  `AcpHeaderLanguage`, `AcpHeaderTheme`...). Use `acp-layout` with projected widgets.
- Renamed `SidemenuComponent` to `AcpSidemenu` (input `menuItems` → `items`), `Branding` to
  `AcpBranding`, and the accordion directives to `AcpNavAccordion`, `AcpNavAccordionItem` and
  `AcpNavAccordionToggle`. Removed `MenuItem`, `MenuTag`, `MenuPermissions` and the
  `AcpTopmenu*Item` types (use `AcpMenuItem`) and the `buildRoute` input of `acp-topmenu`.
- `acp-sidemenu` and `acp-topmenu` no longer filter by `permissions` (they imported
  `ngx-permissions`, which was not a declared dependency); filter the items before passing them.
  The top menu marks a dropdown as active from the current URL instead of the `active` signal.
- CSS classes: `acp-layout*`, `acp-layout-header`, `acp-layout-sidebar__*` and
  `acp-topmenu-panel` replace `acontplus-container*`, `acontplus-header`, `acontplus-sidenav`,
  `acontplus-sidebar-*`, `acontplus-page-content` and `acontplus-topmenu-panel`; acontpluspro
  targets the new classes.
- Docs: `AcpDrawerConfig.panelClass` goes on the overlay pane (`.cdk-overlay-pane`), not on the
  drawer container; the comment said otherwise.
