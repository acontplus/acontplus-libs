import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'acp-user-panel',
  template: `
    <div class="acp-user-panel" [routerLink]="profileLink()">
      <img class="acp-user-panel-avatar" [src]="avatar() ?? ''" [alt]="name()" width="64" />
      <div class="acp-user-panel-info">
        <h4>{{ name() }}</h4>
        <h5>{{ email() }}</h5>
      </div>
    </div>
  `,
  styleUrl: './user-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class UserPanel {
  readonly avatar = input<string | null>(null);
  readonly name = input('');
  readonly email = input('');
  readonly profileLink = input('/profile/overview');
}
