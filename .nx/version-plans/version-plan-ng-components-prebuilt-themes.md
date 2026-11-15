---
ng-components: minor
---

Centralized the prebuilt color themes.

- One map (`$prebuilt-themes` in `core/theming/prebuilt/_themes.scss`) holds the palette and
  brand color of every theme; each `prebuilt-themes/<name>` file is generated from it with the
  same CSS output as before.
- New `@acontplus/ng-components/prebuilt-themes/all` entry loads the 8 themes at once.
- New Sass API: `prebuilt-theme($name)`, `prebuilt-all-themes()` and `$prebuilt-themes`.
