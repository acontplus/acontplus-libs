import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AcpBranding, AcpCard, AcpLogo } from '@acontplus/ng-components';

@Component({
  selector: 'app-logo-page',
  imports: [AcpBranding, AcpCard, AcpLogo],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoPage {
  readonly svg = 'images/logo/acontplus.svg';
  readonly png = 'images/logo/acontplus.png';
  readonly sizes = [24, 44, 72];
}
