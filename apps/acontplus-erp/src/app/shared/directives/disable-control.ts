import { Directive, OnChanges, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]',
})
export class DisableControl implements OnChanges {
  private readonly ngControl = inject(NgControl, { optional: true });

  readonly disableControl = input(false);

  ngOnChanges(): void {
    if (this.disableControl()) {
      this.ngControl?.control?.disable();
    } else {
      this.ngControl?.control?.enable();
    }
  }
}
