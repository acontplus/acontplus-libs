// apps/demo-app/src/app/pages/auth/auth.page.ts
import { Component, inject } from '@angular/core';
import { Login, AuthState } from '@acontplus/ng-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [Login],
  template: `
    <div class="auth-page">
      <acp-login title="Acontplus Demo" [showRegisterButton]="true" [showRememberMe]="true" />
    </div>
  `,
  styles: [
    `
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
    `,
  ],
})
export class AuthPage {
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  constructor() {
    // Navigate to dashboard if already authenticated
    if (this.authState.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
}
