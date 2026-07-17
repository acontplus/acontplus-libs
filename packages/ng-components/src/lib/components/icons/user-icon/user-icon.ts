import { Component, input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'acp-user-icon',
  imports: [],
  templateUrl: './user-icon.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
})
export class UserIcon {
  size = input('35');
}
