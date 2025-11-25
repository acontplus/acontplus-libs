import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderLink } from './header-link';

@Component({
  selector: 'app-doc-heading',
  template: `
    <h3 [id]="id">
      <app-header-link [example]="text"></app-header-link>
      <span>{{ text }}</span>
    </h3>
  `,
  encapsulation: ViewEncapsulation.None,
  imports: [HeaderLink],
})
export class DocHeading implements OnInit {
  @Input() text = '';

  id = '';

  constructor() {}

  ngOnInit() {
    this.id = this.text
      .toLowerCase()
      .split(' ')
      .filter(s => s !== '&')
      .join('-');
  }
}
