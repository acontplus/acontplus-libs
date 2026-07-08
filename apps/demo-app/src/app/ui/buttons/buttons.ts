import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Button, DynamicCard } from '@acontplus/ng-components';
import { REPORT_FORMAT } from '@acontplus/ui-kit';

@Component({
  selector: 'app-buttons',
  imports: [Button, DynamicCard],
  templateUrl: './buttons.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './buttons.css',
})
export class Buttons {
  ReportFormat = REPORT_FORMAT;
}
