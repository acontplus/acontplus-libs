import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseButton } from './base-button';
import { ButtonLoaderDirective } from './button-loader.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'acp-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  imports: [
    NgClass,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ButtonLoaderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcpButton extends BaseButton {}
