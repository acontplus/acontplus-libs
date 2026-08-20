import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgTemplateOutlet,
  PercentPipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  KeyValueChangeRecord,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

import { AcpToObservablePipe } from './../../../../core/pipes';
import {
  AcpGridCellActionBadgePipe,
  AcpGridCellActionDisablePipe,
  AcpGridCellActionTooltipPipe,
  AcpGridCellActionsPipe,
  AcpGridCellSummaryPipe,
} from '../data-grid.pipes';
import { DataGridUtils } from '../grid-utils';
import { DataGridColumn, DataGridColumnButton } from '../interfaces';
import { AcpGridMenu } from '../grid-menu';

@Component({
  selector: 'acp-grid-cell',
  exportAs: 'acpGridCell',
  templateUrl: './cell.html',
  styleUrl: './cell.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    NgTemplateOutlet,
    PercentPipe,
    MatButton,
    MatIconButton,
    MatIcon,
    MatChipListbox,
    MatChip,
    MatTooltip,
    MatBadge,
    MatMenuTrigger,
    AcpToObservablePipe,
    AcpGridCellActionsPipe,
    AcpGridCellSummaryPipe,
    AcpGridCellActionDisablePipe,
    AcpGridCellActionTooltipPipe,
    AcpGridCellActionBadgePipe,
    AcpGridMenu,
  ],
})
export class AcpGridCell implements OnInit, DoCheck {
  private readonly _utils = inject(DataGridUtils);
  private readonly _differs = inject(KeyValueDiffers);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  /** Row data */
  @Input() rowData: Record<string, any> = {};

  /** Column definition */
  @Input() colDef!: DataGridColumn;

  /** Table data */
  @Input() data: any[] = [];

  /** Whether show summary */
  @Input() summary = false;

  /** Placeholder for the empty value (`null`, `''`, `[]`) */
  @Input() placeholder = '--';

  @Output() rowDataChange = new EventEmitter<KeyValueChangeRecord<string, any>>();

  private rowDataDiffer?: KeyValueDiffer<string, any>;

  rowChangeRecord?: KeyValueChangeRecord<string, any>;

  get _value() {
    return this._utils.getCellValue(this.rowData, this.colDef);
  }

  ngOnInit(): void {
    this.rowDataDiffer = this._differs.find(this.rowData).create();
  }

  ngDoCheck(): void {
    const changes = this.rowDataDiffer?.diff(this.rowData);
    if (changes) {
      this._applyChanges(changes);
    }
  }

  private _applyChanges(changes: KeyValueChanges<string, any>) {
    changes.forEachChangedItem(record => {
      this.rowChangeRecord = record;
      this.rowDataChange.emit(record);
      this._changeDetectorRef.markForCheck();
    });
  }

  _getText(value: any) {
    if (value === undefined) {
      return '';
    }
    const isEmpty = this._utils.isEmpty(value);
    return isEmpty ? this.placeholder : value;
  }

  _getTooltip(value: any) {
    return this._utils.isEmpty(value) ? '' : value;
  }

  _getFormatterTooltip(value: any) {
    return this._utils.isContainHTML(value) || this._utils.isEmpty(value) ? '' : value;
  }

  _onActionClick(event: MouseEvent, btn: DataGridColumnButton, rowData: Record<string, any>) {
    event.preventDefault();
    event.stopPropagation();

    btn.click?.(rowData, event);
  }
}
