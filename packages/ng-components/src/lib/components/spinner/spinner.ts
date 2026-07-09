import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'acp-spinner',
  imports: [MatProgressSpinner],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
})
export class Spinner {}
