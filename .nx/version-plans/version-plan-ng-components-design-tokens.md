---
ng-components: minor
---

Added shared design tokens (inspired by MaterialPro) in `core/tokens/_acp-system.scss`.

- Single source for `--acp-sys-surface-raised`, `--acp-sys-shadow-1`, `--acp-sys-shadow-2`,
  `--acp-sys-heading-*`, `--acp-sys-easing-standard` and the layout sizes (`$layout`,
  `acp-system-layout()`), emitted only by acontpluspro.
- Components read them with Material fallbacks, so the prebuilt themes alone keep the Material
  look (Roboto, M3 elevations and corners). The prebuilt themes provide colors only.
