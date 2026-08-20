import { Component, input } from '@angular/core';

@Component({
  selector: 'acp-sidebar-branding',
  template: `
    <a class="branding" href="/">
      <img src="images/acontplus.png" class="branding-logo" alt="logo" />
      @if (showName()) {
        <span class="branding-name">ACONTPLUS</span>
      }
    </a>
  `,
  standalone: true,
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
})
export class AcpSidebarBranding {
  readonly showName = input(true);
}
