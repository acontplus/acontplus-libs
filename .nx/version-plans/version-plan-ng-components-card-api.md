---
ng-components: major
---

Reworked `AcpCard` props: `title`/`subtitle` inputs, `color`, `hoverable`, `loading`, `actionsAlign`, `clicked` output with keyboard support, typed slot directives (`acpCardTitle`, `acpCardActions`, ...) and `provideAcpCardDefaults()`. `appearance`, `elevation`, `imageRatio` and `padding="none"` now take effect.

BREAKING CHANGE: removed `backgroundColor` (use `color`), `hover` (use `hoverable`) and `outlined` (use `appearance="outlined"`) inputs; removed the `default`, `interactive` and `compact` appearances; removed the `AcpCardBadge` and `AcpCardBackgroundColor` types; `AcpCardConfig` no longer accepts per-instance state (`clickable`, `loading`, `disabled`, `fullHeight`, `fullWidth`).
