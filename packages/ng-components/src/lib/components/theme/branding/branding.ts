import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'acp-branding',
  template: `
    <a class="branding" [routerLink]="link()" (click)="brandingClick.emit()">
      @if (logo()) {
        <img [src]="logo()" class="branding-logo" alt="logo" />
      }
      @if (showName() && name()) {
        <span class="branding-name">{{ name() }}</span>
      }
    </a>
  `,
  styles: `
    .branding {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
      border-radius: 50rem;
    }

    .branding-logo {
      width: 2rem;
      height: 2rem;
      border-radius: 50rem;
    }

    .branding-name {
      margin: 0 0.5rem;
      font-size: 1rem;
      font-weight: 500;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class Branding {
  readonly logo = input<string | null>(null);
  readonly name = input<string | null>(null);
  readonly showName = input(true);
  readonly link = input('/');

  readonly brandingClick = output<void>();
}
