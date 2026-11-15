---
name: acp-component
description: Crear o modificar componentes, estilos y temas de @acontplus/ng-components (acp-*, acontpluspro, layout, customizer). Usar al tocar SCSS, tokens, temas, API publica de ng-components o el demo-app.
---

# Componentes de @acontplus/ng-components

Complementa `AGENTS.md` (Nx, version plans, Prettier). Aqui van las reglas de estilo y tema que
no se deducen leyendo un solo archivo.

## Antes de cambiar

1. Leer `packages/ng-components/README.md` (seccion del componente) y el `project.json`.
2. Buscar el componente vecino mas parecido y copiar su patron: standalone, `inject()`,
   `ViewEncapsulation.None` en widgets de layout, `ChangeDetectionStrategy` explicito, textos
   en espanol por defecto con input `labels` (`ACP_<COMPONENTE>_LABELS`).
3. Si el cambio es visual, comprobar si ya existe un token antes de escribir un valor fijo.

## Tokens y temas

- Colores, radios y sombras salen de variables CSS, nunca de valores fijos:
  - `--mat-sys-*`: sistema M3 (Material).
  - `--acp-skin-*`: paleta de acontpluspro (`border`, `field-border`, `radius`, `surface`...),
    definida en `src/core/theming/acontpluspro/_acontpluspro.scss` (`$palette`).
  - `--acp-<componente>-*`: tokens propios, leidos con `token-utils.slot(<token>, $fallbacks)`
    y con su fallback M3 en `_m3-<componente>.scss`.
- Un valor fijo solo si es intencional (pildoras, circulos). Si debe seguir al tema usar
  `var(--acp-skin-radius, <valor-material>)` para no cambiar el aspecto sin acontpluspro.
- Modo oscuro: `light-dark()` en la paleta; la clase en `<html>` es `theme-dark` (la pone
  `AcpLayoutSettings`). `dark-theme` es legado: si un estilo la usa, anadir tambien `.theme-dark`.
- Orden de carga en las apps: prebuilt themes primero, luego
  `@use '@acontplus/ng-components/acontpluspro'`.
- Cuidado en `_acontpluspro.scss`: `mat.theme()` vuelve a emitir los tokens `--mat-sys-*` por
  defecto (p. ej. `corner-small: 8px`). Cualquier override de `--mat-sys-*` que `mat.theme()`
  tambien emita debe ir despues de esa llamada.
- Verificar el resultado en el CSS compilado, no solo en el SCSS:
  `pnpm exec nx build acontplus-erp` y buscar la variable en
  `dist/apps/acontplus-erp/browser/styles-*.css` (el ultimo valor dentro de `html:root` gana).

## Layout y customizer

- Estado unico del layout: `AcpLayoutSettings` (signals, `localStorage`, aplica clases y
  variables en `<html>`). No crear servicios paralelos de tema.
- Opcion nueva del layout:
  1. Campo en `AcpLayoutOptions` y valor en `ACP_LAYOUT_DEFAULTS` (`layout.config.ts`).
  2. Aplicarla en `AcpLayoutSettings.#apply` y cubrirla en `layout-settings.spec.ts`.
  3. Control en `acp-customizer` (html, label en `ACP_CUSTOMIZER_LABELS`).
  4. Mismo control en el customizer del demo-app
     (`apps/demo-app/src/app/components/customizer/customizer.ts` y `core/settings*.ts`),
     reutilizando constantes exportadas por la libreria.
  5. Documentarla en la seccion de layout del README.
- Widgets del header se proyectan con `acpHeaderStart` / `acpHeaderEnd`.

## API publica

- Exportar desde el `index.ts` de la carpeta y del padre hasta `src/index.ts`.
- Quitar o renombrar un export, o cambiar un comportamiento por defecto, es `major`. Anadir es
  `minor`. Arreglos y ajustes visuales, `patch`.
- Al eliminar algo, buscar referencias en todo el repo (`git grep`), incluidas
  `apps/`, `docs/wiki/`, READMEs, `package.json` (keywords) y otros paquetes que dependan de
  clases CSS o servicios eliminados (p. ej. `ng-notifications`).

## Cierre

1. Version plan en `.nx/version-plans/`: front matter YAML solo con `proyecto: bump`, y el texto
   (con guia de migracion si es `major`) despues del segundo `---`. Validar con
   `pnpm exec nx release plan:check`.
2. README del paquete y pagina del demo-app si cambia el uso.
3. `pnpm exec prettier --check <archivos>` y
   `pnpm exec nx run-many -t lint test build -p ng-components <consumidores>`.
4. Indicar al usuario que no se reviso en el navegador si no se hizo.
