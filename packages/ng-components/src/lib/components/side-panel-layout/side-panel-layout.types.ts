export interface AcpSidePanelItem<T = string | number> {
  id: T;
  label: string;
  icon?: string;
  /** Second line below the label. */
  description?: string;
  disabled?: boolean;
  /** Counter or short text at the end of the item. */
  badge?: string | number;
}

/** Side of the panel: `start` (left in LTR) or `end`. */
export type AcpSidePanelPosition = 'start' | 'end';

export interface AcpSidePanelLabels {
  /** Accessible label of the menu button that shows and hides the panel. */
  toggle: string;
}

export interface AcpSidePanelConfig {
  /** Width of the panel, any CSS length. @default '16rem' */
  panelWidth?: string;
  /** Media query below which the panel floats over the content. @default '(max-width: 991.98px)' */
  compactQuery?: string;
  /** @default 'start' */
  position?: AcpSidePanelPosition;
  /** Shows the selected item label in the toolbar. @default true */
  showHeading?: boolean;
  /** Menu button that hides and shows the panel also on wide screens. @default false */
  toggleable?: boolean;
  labels?: Partial<AcpSidePanelLabels>;
}
