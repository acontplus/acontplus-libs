import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AcpVanillaDateRangePicker } from '@acontplus/ng-components';

@Component({
  selector: 'app-vanilla-date-range-custom-ranges-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [MatCardModule, AcpVanillaDateRangePicker],
})
export class App {
  from: string | null = null;
  to: string | null = null;
  checkbox = false;

  onDateRangeChanged(range: { from: string; to: string }) {
    this.from = range.from;
    this.to = range.to;
  }

  onCheckboxToggled() {
    console.log('Checkbox changed:', this.checkbox);
  }
}
