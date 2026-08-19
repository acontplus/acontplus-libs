import { Component, ViewEncapsulation, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'acp-sidebar-user-panel',
  template: `
    <div class="acp-sidebar-user-panel" routerLink="/profile/overview">
      <img class="acp-sidebar-user-panel-avatar" [src]="avatar()" alt="avatar" width="64" />
      <div class="acp-sidebar-user-panel-info">
        <h4>{{ name() }}</h4>
        <h5>{{ email() }}</h5>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
  styles: `
    @use '@angular/material' as mat;

    .acp-sidebar-user-panel {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      margin-bottom: 0.75rem;
      cursor: pointer;
      outline: none;
      //   background-color: var(--acp-user-panel-background-color);
      border-radius: 0.75rem;

      &:hover,
      &:focus {
        background-color: var(--acp-user-panel-hover-background-color);
      }
    }

    // Set default width and height can avoid flashing before avatar image loaded.
    .acp-sidebar-user-panel-avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50rem;
      transform-origin: 0 1.5rem;
      transition: transform mat.$private-swift-ease-out-duration
        mat.$private-swift-ease-out-timing-function;

      [dir='rtl'] & {
        transform-origin: 3rem 1.5rem;
      }
    }

    .acp-sidebar-user-panel-info {
      flex: 1;
      width: 0;
      margin-left: 0.75rem;
      opacity: 1;
      transition: opacity mat.$private-swift-ease-out-duration
        mat.$private-swift-ease-out-timing-function;

      [dir='rtl'] & {
        margin-right: 0.75rem;
        margin-left: 0;
      }

      h4,
      h5 {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      h4 {
        margin-bottom: 4px;
        font-size: 1rem;
        font-weight: 500;
      }

      h5 {
        font-size: 0.75rem;
        font-weight: normal;
      }
    }
  `,
})
export class AcpSidebarUserPanel {
  /**
   * User avatar URL.
   * @default ''
   */
  readonly avatar = input('');

  /**
   * User name.
   * @default ''
   */
  readonly name = input('');

  /**
   * User email.
   * @default ''
   */
  readonly email = input('');
}
