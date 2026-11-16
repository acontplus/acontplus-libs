---
ng-components: minor
---

New `AcpLogo` (`acp-logo`): app logo loaded from an image URL, set per instance with `src` or
app-wide with `provideAcpLogo({ src, label })`, so replacing the logo does not need a new library
release. SVG files are inlined (scripts and event handlers removed) so `currentColor` and
`var(--acp-logo-color)` fills follow the theme; other formats render as `<img>`. Without an image, or when it fails to load, it shows the name as text (`label`,
`provideAcpLogo` or `provideAcpLayout({ branding: { name } })`). Size it with
`height` (default `44px`).
