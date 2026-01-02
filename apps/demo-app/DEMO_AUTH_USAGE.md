# @acontplus/ng-auth Usage Examples

This document demonstrates real-world usage patterns in the demo app.

## Project Structure

```
apps/demo-app/src/app/
├── pages/
│   ├── auth/               # Authentication page
│   │   ├── auth.page.ts
│   │   └── index.ts
│   └── dashboard/          # Protected dashboard
│       ├── dashboard.page.ts
│       └── index.ts
├── app.config.ts          # App configuration with auth setup
└── app.routes.ts          # Routes with auth guards
```

## Setup in Demo App

### 1. App Configuration

```typescript
// apps/demo-app/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authProviders, authRedirectInterceptor, csrfInterceptor } from '@acontplus/ng-auth';
import { ENVIRONMENT, AUTH_TOKEN } from '@acontplus/ng-config';
import { TokenLocalStorageRepository } from './core/token-local-storage.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    // HTTP Client with auth interceptors
    provideHttpClient(
      withInterceptors([
        authRedirectInterceptor, // Handles 401 errors
        csrfInterceptor, // CSRF protection
      ]),
    ),

    // Auth providers (AuthState, repositories, etc.)
    ...authProviders,

    // Environment configuration
    {
      provide: ENVIRONMENT,
      useValue: {
        tokenKey: 'demo_token',
        refreshTokenKey: 'demo_refresh_token',
        loginRoute: 'auth',
      },
    },

    // Optional: Custom token storage
    {
      provide: AUTH_TOKEN,
      useClass: TokenLocalStorageRepository,
    },
  ],
};
```

### 2. Routes with Guards

```typescript
// apps/demo-app/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@acontplus/ng-auth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth').then(m => m.AuthPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard').then(m => m.DashboardPage),
    canActivate: [authGuard], // 👈 Protected route
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./pages/settings/profile').then(m => m.ProfilePage),
      },
      {
        path: 'password',
        loadComponent: () => import('./pages/settings/password').then(m => m.PasswordPage),
      },
      {
        path: 'mfa',
        loadComponent: () => import('./pages/settings/mfa').then(m => m.MfaPage),
      },
    ],
  },
];
```

## Example Pages

### Auth Page (Login/Register)

```typescript
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
```

### Dashboard Page (Protected)

```typescript
// apps/demo-app/src/app/pages/dashboard/dashboard.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthState } from '@acontplus/ng-auth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <div class="dashboard-page">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Dashboard</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          @if (authState.user(); as user) {
            <h2>Welcome, {{ user.displayName }}!</h2>
            <p>Email: {{ user.email }}</p>

            @if (!authState.emailVerified()) {
              <div class="warning">
                Please verify your email
                <button mat-button (click)="resendVerification()">Resend</button>
              </div>
            }

            <button mat-raised-button color="warn" (click)="logout()">Logout</button>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class DashboardPage {
  protected readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  logout() {
    this.authState.logout().subscribe();
  }

  resendVerification() {
    const email = this.authState.user()?.email;
    if (email) {
      this.authState.resendVerificationEmail({ email }).subscribe();
    }
  }
}
```

## Running the Demo

```bash
# Navigate to workspace root
cd acontplus-libs

# Install dependencies
pnpm install

# Start demo app
pnpm nx serve demo-app

# Navigate to http://localhost:4200
```

## Features Demonstrated

1. **Authentication Flow**
   - Login/Register UI component
   - Auto-redirect after authentication
   - "Remember Me" functionality

2. **Route Protection**
   - Auth guard on protected routes
   - Automatic URL storage and redirect

3. **State Management**
   - Reactive signals for auth state
   - User data display
   - Loading states

4. **Token Management**
   - Automatic token storage
   - Refresh token handling
   - Session persistence

5. **User Actions**
   - Logout functionality
   - Email verification resend
   - Password change
   - MFA setup

## Next Steps

To extend the demo:

1. Add password reset page
2. Add MFA setup/verification flow
3. Add social login buttons
4. Add profile management
5. Add role-based access control examples
