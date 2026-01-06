// apps/demo-app/src/app/pages/dashboard/dashboard.page.ts
import { Component, inject } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { AuthState } from '@acontplus/ng-auth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule],
  template: `
    <div class="dashboard-page">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Dashboard</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          @if (authState.user(); as user) {
            <div class="user-info">
              <h2>Welcome, {{ user.displayName }}!</h2>
              <p><strong>Email:</strong> {{ user.email }}</p>

              @if (user.roles && user.roles.length > 0) {
                <p><strong>Roles:</strong> {{ user.roles.join(', ') }}</p>
              }

              @if (user.companyId) {
                <p><strong>Company ID:</strong> {{ user.companyId }}</p>
              }
            </div>

            @if (!authState.emailVerified()) {
              <div class="warning-banner">
                <p>⚠️ Please verify your email</p>
                <button mat-raised-button color="primary" (click)="resendVerification()">
                  Resend Verification Email
                </button>
              </div>
            }

            <div class="actions">
              <button mat-raised-button color="accent" (click)="changePassword()">
                Change Password
              </button>

              <button mat-raised-button (click)="setupMfa()">Setup 2FA</button>

              <button mat-raised-button color="warn" (click)="logout()">Logout</button>
            </div>
          }

          @if (authState.isLoading()) {
            <div class="loading">Loading...</div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-page {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      .user-info {
        margin: 1rem 0;
      }

      .warning-banner {
        background: #fff3cd;
        border: 1px solid #ffc107;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 4px;
      }

      .actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
      }

      .loading {
        text-align: center;
        padding: 2rem;
      }
    `,
  ],
})
export class DashboardPage {
  protected readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  logout() {
    this.authState.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: err => {
        console.error('Logout failed', err);
      },
    });
  }

  resendVerification() {
    const email = this.authState.user()?.email;
    if (email) {
      this.authState.resendVerificationEmail({ email }).subscribe({
        next: () => alert('Verification email sent!'),
        error: _err => alert('Failed to send verification email'),
      });
    }
  }

  changePassword() {
    // Navigate to change password page or open dialog
    this.router.navigate(['/settings/password']);
  }

  setupMfa() {
    // Navigate to MFA setup page
    this.router.navigate(['/settings/mfa']);
  }
}
