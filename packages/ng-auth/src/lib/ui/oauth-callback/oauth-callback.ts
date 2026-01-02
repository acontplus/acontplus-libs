// src/lib/ui/oauth-callback/oauth-callback.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthState } from '../../services/auth-state';
import { SocialProvider } from '../../domain/models/auth';

/**
 * OAuth Callback Component
 *
 * This component handles the OAuth callback after user authenticates with external provider.
 * It extracts the authorization code and state from URL parameters, verifies them,
 * and completes the authentication flow.
 *
 * Usage:
 * 1. Register this component in your routes:
 * ```typescript
 * {
 *   path: 'auth/callback/:provider',
 *   component: OAuthCallbackComponent
 * }
 * ```
 *
 * 2. Configure OAuth redirect URI in your backend:
 * ```
 * https://your-app.com/auth/callback/google
 * https://your-app.com/auth/callback/microsoft
 * ```
 *
 * The component will:
 * - Extract provider from route params
 * - Extract code and state from query params
 * - Validate state for CSRF protection
 * - Complete OAuth login flow
 * - Redirect to intended URL or home page
 * - Show error message if authentication fails
 */
@Component({
  selector: 'acp-oauth-callback',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="oauth-callback-container">
      @if (loading) {
        <mat-spinner diameter="48"></mat-spinner>
        <p>Completing authentication...</p>
      }

      @if (error) {
        <div class="error-message">
          <h2>Authentication Failed</h2>
          <p>{{ error }}</p>
          <button (click)="goToLogin()">Return to Login</button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .oauth-callback-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
      }

      mat-spinner {
        margin-bottom: 1.5rem;
      }

      p {
        font-size: 1rem;
        color: #666;
        margin: 0;
      }

      .error-message {
        max-width: 400px;
      }

      .error-message h2 {
        color: #d32f2f;
        margin-bottom: 1rem;
      }

      .error-message p {
        color: #666;
        margin-bottom: 2rem;
      }

      .error-message button {
        padding: 0.75rem 2rem;
        background-color: #1976d2;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .error-message button:hover {
        background-color: #1565c0;
      }
    `,
  ],
})
export class OAuthCallbackComponent implements OnInit {
  private readonly authState = inject(AuthState);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.handleCallback();
  }

  private handleCallback(): void {
    // Get provider from route params
    const provider = this.route.snapshot.paramMap.get('provider') as SocialProvider;

    // Get OAuth callback params from query string
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');
    const error = this.route.snapshot.queryParamMap.get('error');
    const errorDescription = this.route.snapshot.queryParamMap.get('error_description');

    // Check for OAuth errors
    if (error) {
      this.loading = false;
      this.error = errorDescription || `OAuth error: ${error}`;
      console.error('OAuth error:', { error, errorDescription });
      return;
    }

    // Validate required parameters
    if (!provider) {
      this.loading = false;
      this.error = 'Missing provider in callback URL';
      console.error('OAuth callback error: Missing provider');
      return;
    }

    if (!code || !state) {
      this.loading = false;
      this.error = 'Missing authorization code or state parameter';
      console.error('OAuth callback error: Missing code or state');
      return;
    }

    // Complete OAuth flow
    this.authState.handleOAuthCallback(provider, code, state).subscribe({
      next: () => {
        this.loading = false;
        // AuthState will handle redirect via urlRedirectService
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || err.message || 'Authentication failed';
        console.error('OAuth callback error:', err);
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
