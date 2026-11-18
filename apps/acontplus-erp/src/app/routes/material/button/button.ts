import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AcpButton } from '@acontplus/ng-components';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-button-page',
  imports: [AcpButton, MatTooltipModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPage {}
