import { Directive, Input, TemplateRef, output } from '@angular/core';

@Directive({
  selector: '[acpDataGridExpansionToggle]',
  host: {
    '[class.expanded]': 'opened',
    '(click)': 'onClick($event)',
  },
})
export class DataGridExpansionToggle {
  private _opened = false;
  private _row: any;
  private _tplRef!: TemplateRef<any>;

  @Input()
  get opened() {
    return this._opened;
  }
  set opened(newValue: boolean) {
    this._opened = newValue;
    this.openedChange.emit(newValue);
  }
  openedChange = output<boolean>();

  @Input()
  set expandableRow(value: any) {
    if (value !== this._row) {
      this._row = value;
    }
  }

  @Input()
  set expansionRowTpl(value: TemplateRef<any>) {
    if (value !== this._tplRef) {
      this._tplRef = value;
    }
  }

  toggleChange = output<DataGridExpansionToggle>();

  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  toggle() {
    this.opened = !this.opened;
    this.toggleChange.emit(this);
  }
}
