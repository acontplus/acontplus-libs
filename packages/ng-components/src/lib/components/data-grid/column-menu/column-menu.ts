import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import {
  DataGridButtonType,
  DataGridColumn,
  DataGridColumnPinOption,
  DataGridColumnPinValue,
} from './../interfaces';
import { AcpToObservablePipe } from '../../../../core/pipes';

@Component({
  selector: 'acp-grid-column-menu',
  exportAs: 'acpGridColumnMenu',
  templateUrl: './column-menu.html',
  styleUrl: './column-menu.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    FormsModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatCheckbox,
    CdkDrag,
    CdkDropList,
    AcpToObservablePipe,
  ],
})
export class AcpGridColumnMenu {
  @ViewChild(MatMenu, { static: true }) menuPanel!: MatMenu;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  @Input() columns: DataGridColumn[] = [];
  @Input() selectable = true;
  @Input() selectableChecked: 'show' | 'hide' = 'show';
  @Input() sortable = true;
  @Input() pinnable = true;

  @Input()
  get buttonText() {
    const defaultText = `Columns ${this.selectableChecked === 'show' ? 'Shown' : 'Hidden'}`;
    return this._buttonText ? this._buttonText : defaultText;
  }
  set buttonText(value: string) {
    this._buttonText = value;
  }
  private _buttonText = '';

  @Input() buttonType: DataGridButtonType = 'outlined';
  @Input() buttonColor: ThemePalette;
  @Input() buttonClass = '';
  @Input() buttonIcon = '';
  @Input() buttonFontIcon = '';
  @Input() buttonSvgIcon = '';

  @Input() showHeader = false;
  @Input() headerText = 'Columns Header';
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() showFooter = false;
  @Input() footerText = 'Columns Footer';
  @Input() footerTemplate!: TemplateRef<any>;

  @Output() columnChange = new EventEmitter<DataGridColumn[]>();

  @Input()
  get pinOptions() {
    return this._pinOptions;
  }
  set pinOptions(value: DataGridColumnPinOption[]) {
    if (value.length > 0) {
      this._pinOptions = value;
    }
  }
  private _pinOptions: DataGridColumnPinOption[] = [
    { label: 'Pin Left', value: 'left' },
    { label: 'Pin Right', value: 'right' },
    { label: 'No Pin', value: null },
  ];

  _handleDroped(e: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, e.previousIndex, e.currentIndex);
    this.columnChange.emit(this.columns);
  }

  _handleChecked(col: DataGridColumn) {
    if (this.selectableChecked === 'show') {
      col.hide = !col.show;
    } else {
      col.show = !col.hide;
    }
    this.columnChange.emit(this.columns);
  }

  _handlePinSelect(col: DataGridColumn, val: DataGridColumnPinValue) {
    if (col.pinned != val) {
      col.pinned = val;
      this.columnChange.emit(this.columns);
    }
  }
}
