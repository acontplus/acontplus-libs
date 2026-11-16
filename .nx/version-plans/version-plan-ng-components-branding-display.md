---
ng-components: minor
---

`provideAcpLayout({ branding })` (and the `acp-branding` inputs) can show the logo and the name,
only the logo or only the name with `display: 'logo-name' | 'logo' | 'name'`, and choose the logo
shape with `logoShape`: `'circle'` (default, the `2rem` round logo as before) or `'rectangle'`
(`2rem` high, up to `10rem` wide, keeps the aspect ratio and shrinks to fit the sidebar or the
header). `--acp-branding-logo-height` and `--acp-branding-logo-max-width` change the rectangle size.
The name is cut with an ellipsis instead of overflowing, and the link takes the app name as
accessible name.

The collapse slide toggle of `acp-layout` is hidden on the collapsed rail, which shows only the
logo, and appears when the rail expands on hover (or with keyboard focus) so it can be turned off.

On the collapsed rail `acp-user-panel` keeps its avatar at half size and hides only the title,
subtitle and details (as ng-matero); the hover restores it. In acontpluspro the panel
background is now the skin `background` (was `surface-muted`), so it stands out from the sidebar.
