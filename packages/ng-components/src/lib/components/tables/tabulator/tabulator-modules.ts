import {
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  type EnvironmentProviders,
} from '@angular/core';
import {
  Tabulator,
  AccessorModule,
  ColumnCalcsModule,
  DataTreeModule,
  EditModule,
  FilterModule,
  FormatModule,
  FrozenColumnsModule,
  FrozenRowsModule,
  GroupRowsModule,
  InteractionModule,
  KeybindingsModule,
  MenuModule,
  MoveRowsModule,
  MutatorModule,
  PageModule,
  PopupModule,
  ReactiveDataModule,
  ResizeColumnsModule,
  ResizeTableModule,
  SelectRowModule,
  SortModule,
  TooltipModule,
  ValidateModule,
} from 'tabulator-tables';

/** Any Tabulator module export (`DownloadModule`, `PrintModule`...) */
export type AcpTabulatorModule = Extract<
  Parameters<typeof Tabulator.registerModule>[0],
  unknown[]
>[number];

let registered = false;

/**
 * Tabulator core only renders: the light modules every acontplus table may use are registered
 * once. The heavy ones (download, print, export, clipboard, spreadsheet, ajax, persistence,
 * import, history, responsive layout...) are opt-in with `provideAcpTabulator`.
 */
export function registerAcpTabulatorModules(): void {
  if (registered) return;
  registered = true;
  Tabulator.registerModule([
    AccessorModule,
    ColumnCalcsModule,
    DataTreeModule,
    EditModule,
    FilterModule,
    FormatModule,
    FrozenColumnsModule,
    FrozenRowsModule,
    GroupRowsModule,
    InteractionModule,
    KeybindingsModule,
    MenuModule,
    MoveRowsModule,
    MutatorModule,
    PageModule,
    PopupModule,
    ReactiveDataModule,
    ResizeColumnsModule,
    ResizeTableModule,
    SelectRowModule,
    SortModule,
    TooltipModule,
    ValidateModule,
  ]);
}

export interface AcpTabulatorConfig {
  /** Extra Tabulator modules, e.g. `[DownloadModule, PrintModule]` */
  modules?: AcpTabulatorModule[];
}

/**
 * Registers extra Tabulator modules at bootstrap (they apply to every table created after).
 *
 * @example
 * import { DownloadModule, PrintModule } from 'tabulator-tables';
 * bootstrapApplication(App, {
 *   providers: [provideAcpTabulator({ modules: [DownloadModule, PrintModule] })],
 * });
 */
export function provideAcpTabulator({
  modules = [],
}: AcpTabulatorConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      registerAcpTabulatorModules();
      if (modules.length) Tabulator.registerModule(modules);
    }),
  ]);
}
