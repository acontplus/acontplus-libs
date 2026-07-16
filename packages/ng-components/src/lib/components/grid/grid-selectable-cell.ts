import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[acpGridSelectableCell]',
  host: {
    '[class.selected]': 'selected',
    '(click)': 'onClick($event)',
  },
})
export class AcpGridSelectableCell {
  ctrlKeyPressed = false;
  shiftKeyPressed = false;

  get selected() {
    return this._selected;
  }
  private _selected = false;

  @Input() cellSelectable = true;

  @Output() cellSelectedChange = new EventEmitter<AcpGridSelectableCell>();

  onClick(event: MouseEvent) {
    this.ctrlKeyPressed = event.ctrlKey;
    this.shiftKeyPressed = event.shiftKey;

    if (this.cellSelectable) {
      this.select();
    }
  }

  select() {
    this._selected = true;
    this.cellSelectedChange.emit(this);
  }

  deselect() {
    this._selected = false;
    this.cellSelectedChange.emit(this);
  }

  toggle() {
    this._selected = !this._selected;
    this.cellSelectedChange.emit(this);
  }
}
