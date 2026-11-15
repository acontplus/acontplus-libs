---
ng-components: major
---

Redesigned `AcpCard` (MaterialPro look) and cleaned up its API.

- Look: elevated and outlined cards use the raised surface (white in light mode) and the soft
  `--acp-sys-*` shadows; title uses the heading scale and subtitle 14px; `padding` is 16, 24
  (default) or 30px and is shared by header, content, actions and footer; the footer has a top
  divider; hoverable and interactive cards lift 2px.
- Removed the `elevation` and `rounded` inputs (and their `AcpCardConfig` keys and the
  `AcpCardElevation` type): shape and shadows come from the theme. Override a single card with
  `--acp-card-shape` / `--acp-card-elevation`.
- Removed the `disabled-bg` color and the `[key: string]: any` index signature of
  `AcpCardPassThroughSection`.
- Removed the legacy `#title`-style template references; use the `ACP_CARD_SLOTS` directives.
  `acpCardHeader` now replaces the avatar/title/subtitle group instead of rendering next to it.
- `clickable` renders a native button and the new `routerLink` input a native link stretched
  over the card, so keyboard activation, Ctrl+click and screen readers work and actions stay
  clickable. The host no longer gets `role="button"`, `role="article"` or `tabindex`. `clicked`
  emits a `MouseEvent`.
- New `headingLevel` input renders the title as a heading.
- New styling hooks: `--acp-card-hover-elevation` and `--acp-card-gap`.
