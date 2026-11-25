---
ng-components: major
---

Add form control options to the layout: `fieldAppearance` (`outline` / `fill`) and `controlSize`
(`small` / `medium` / `large`: fields 40 / 48 / 56px, select options 33 / 40 / 48px and menu items
36 / 42 / 48px), editable from `acp-customizer` and persisted by
`AcpLayoutSettings`. New exports: `AcpFieldAppearance`, `AcpControlSize` and `ACP_CONTROL_SIZES`.

`provideAcpLayout` now provides `MAT_FORM_FIELD_DEFAULT_OPTIONS` with `fieldAppearance` through the
new `acpFieldDefaults` helper (fields already on screen switch live), and
`AcpLayoutSettings` sets `acp-control-<size>` on `<html>`. acontpluspro maps those classes to the
Material form field density tokens and to `--acp-control-option-height` /
`--acp-control-menu-item-height` (`$acontpluspro-control-sizes`); the classes also work on a
container or a single `mat-form-field`. Unlike Material's density, `fill` fields keep the floating
label at every size (smaller and higher, `--acp-control-fill-label-transform`). Menu item icons
now follow `--mat-menu-item-icon-size` for their font size too (they were cut at 18px). The selected `mat-option` keeps its color on hover, focus and when it is
the active option (Material dropped it, leaving only the near-white acontpluspro hover), and option and menu item hover is tinted with the theme color.

Add M3 color classes (`.acp-text-red-50`, `.acp-bg-blue-90`, `.acp-border-...`), included by
acontpluspro; `acp.color-utilities('')` emits the unprefixed legacy names.
The sidemenu badge also gets the `acp-bg-<color>` class.

Breaking: with `provideAcpLayout`, fields without an explicit `appearance` are now `outline` and
40px high (`small`, Material density -4, as the Acontplus apps), instead of Material's `fill` and 56px. To keep the previous look:

```ts
provideAcpLayout({ defaults: { fieldAppearance: 'fill', controlSize: 'large' } });
```

To use other `MAT_FORM_FIELD_DEFAULT_OPTIONS`, provide them after `provideAcpLayout` with
`acpFieldDefaults(appearance, options)`.
