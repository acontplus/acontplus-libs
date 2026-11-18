import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tooltip-page',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPage {}
