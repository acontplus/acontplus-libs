// src/lib/services/auth-state.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthState } from './auth-state';
import { AuthRepository } from '../domain/repositories/auth-repository';
import { AuthTokenRepositoryImpl } from '../repositories/auth-token-repository-impl';
import { AuthUrlRedirect } from './auth-url-redirect';
import { ENVIRONMENT } from '@acontplus/ng-config';
import { AuthTokens, UserData } from '@acontplus/core';

describe('AuthState - JWT Login', () => {
  let authState: AuthState;
  let authRepository: jest.Mocked<AuthRepository>;
  let tokenRepository: jest.Mocked<AuthTokenRepositoryImpl>;
  let router: jest.Mocked<Router>;
  let urlRedirectService: jest.Mocked<AuthUrlRedirect>;

  const mockTokens = new AuthTokens('mock.jwt.token', 'mock-refresh-token');

  const mockUserData: UserData = {
    email: 'test@example.com',
    displayName: 'Test User',
    roles: ['user'],
  };

  beforeEach(() => {
    // Create mocks
    const authRepositoryMock = {
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      changePassword: jest.fn(),
    } as any;

    const tokenRepositoryMock = {
      saveTokens: jest.fn(),
      getToken: jest.fn(),
      getRefreshToken: jest.fn(),
      getUserData: jest.fn(),
      clearTokens: jest.fn(),
      isAuthenticated: jest.fn(),
      isRememberMeEnabled: jest.fn(),
    } as any;

    const routerMock = {
      navigate: jest.fn(),
    } as any;

    const urlRedirectServiceMock = {
      redirectToIntendedUrl: jest.fn(),
      storeIntendedUrl: jest.fn(),
      clearIntendedUrl: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        AuthState,
        { provide: AuthRepository, useValue: authRepositoryMock },
        { provide: AuthTokenRepositoryImpl, useValue: tokenRepositoryMock },
        { provide: Router, useValue: routerMock },
        { provide: AuthUrlRedirect, useValue: urlRedirectServiceMock },
        {
          provide: ENVIRONMENT,
          useValue: {
            tokenKey: 'auth_token',
            refreshTokenKey: 'refresh_token',
            loginRoute: 'auth/login',
          },
        },
      ],
    });

    authState = TestBed.inject(AuthState);
    authRepository = TestBed.inject(AuthRepository) as jest.Mocked<AuthRepository>;
    tokenRepository = TestBed.inject(
      AuthTokenRepositoryImpl,
    ) as jest.Mocked<AuthTokenRepositoryImpl>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    urlRedirectService = TestBed.inject(AuthUrlRedirect) as jest.Mocked<AuthUrlRedirect>;

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('Login', () => {
    it('should successfully login with valid credentials', (done) => {
      // Arrange
      const loginRequest = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      };

      authRepository.login.mockReturnValue(of(mockTokens));
      tokenRepository.getUserData.mockReturnValue(mockUserData);

      // Act
      authState.login(loginRequest).subscribe({
        next: (tokens) => {
          // Assert
          expect(tokens).toEqual(mockTokens);
          expect(authRepository.login).toHaveBeenCalledWith(loginRequest);
          expect(tokenRepository.saveTokens).toHaveBeenCalledWith(mockTokens, false);
          expect(authState.isAuthenticated()).toBe(true);
          expect(urlRedirectService.redirectToIntendedUrl).toHaveBeenCalledWith('/');
          done();
        },
        error: done.fail,
      });
    });

    it('should login with rememberMe enabled', (done) => {
      // Arrange
      const loginRequest = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      };

      authRepository.login.mockReturnValue(of(mockTokens));
      tokenRepository.getUserData.mockReturnValue(mockUserData);

      // Act
      authState.login(loginRequest).subscribe({
        next: () => {
          // Assert
          expect(tokenRepository.saveTokens).toHaveBeenCalledWith(mockTokens, true);
          done();
        },
        error: done.fail,
      });
    });

    it('should set loading state during login', (done) => {
      // Arrange
      const loginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      authRepository.login.mockReturnValue(of(mockTokens));
      tokenRepository.getUserData.mockReturnValue(mockUserData);

      // Act
      expect(authState.isLoading()).toBe(false);

      authState.login(loginRequest).subscribe({
        next: () => {
          // Assert - loading should be false after completion
          expect(authState.isLoading()).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('should handle login failure with invalid credentials', (done) => {
      // Arrange
      const loginRequest = {
        email: 'test@example.com',
        password: 'wrong-password',
      };

      const errorResponse = {
        status: 401,
        error: { message: 'Invalid credentials' },
      };

      authRepository.login.mockReturnValue(throwError(() => errorResponse));

      // Act
      authState.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error).toEqual(errorResponse);
          expect(tokenRepository.saveTokens).not.toHaveBeenCalled();
          expect(authState.isAuthenticated()).toBe(false);
          expect(authState.isLoading()).toBe(false);
          done();
        },
      });
    });

    it('should handle network errors during login', (done) => {
      // Arrange
      const loginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      const networkError = new Error('Network error');
      authRepository.login.mockReturnValue(throwError(() => networkError));

      // Act
      authState.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error).toEqual(networkError);
          expect(authState.isLoading()).toBe(false);
          done();
        },
      });
    });

    it('should update user signal after successful login', (done) => {
      // Arrange
      const loginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      authRepository.login.mockReturnValue(of(mockTokens));
      tokenRepository.getUserData.mockReturnValue(mockUserData);

      // Act
      authState.login(loginRequest).subscribe({
        next: () => {
          // Assert
          expect(authState.user()).toEqual(mockUserData);
          done();
        },
        error: done.fail,
      });
    });

    it('should handle login with empty email', (done) => {
      // Arrange
      const loginRequest = {
        email: '',
        password: 'password123',
      };

      const errorResponse = {
        status: 400,
        error: { message: 'Email is required' },
      };

      authRepository.login.mockReturnValue(throwError(() => errorResponse));

      // Act
      authState.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(400);
          done();
        },
      });
    });

    it('should handle login with empty password', (done) => {
      // Arrange
      const loginRequest = {
        email: 'test@example.com',
        password: '',
      };

      const errorResponse = {
        status: 400,
        error: { message: 'Password is required' },
      };

      authRepository.login.mockReturnValue(throwError(() => errorResponse));

      // Act
      authState.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(400);
          done();
        },
      });
    });
  });

  describe('Logout', () => {
    it('should successfully logout authenticated user', (done) => {
      // Arrange
      tokenRepository.getUserData.mockReturnValue(mockUserData);
      tokenRepository.getRefreshToken.mockReturnValue('mock-refresh-token');
      authRepository.logout.mockReturnValue(of(void 0));

      // Act
      authState.logout().subscribe({
        next: () => {
          // Assert
          expect(authRepository.logout).toHaveBeenCalledWith(
            'test@example.com',
            'mock-refresh-token',
          );
          expect(tokenRepository.clearTokens).toHaveBeenCalled();
          expect(authState.isAuthenticated()).toBe(false);
          expect(authState.user()).toBeNull();
          done();
        },
        error: done.fail,
      });
    });

    it('should logout even if backend call fails', (done) => {
      // Arrange
      tokenRepository.getUserData.mockReturnValue(mockUserData);
      tokenRepository.getRefreshToken.mockReturnValue('mock-refresh-token');
      authRepository.logout.mockReturnValue(throwError(() => new Error('Backend error')));

      // Act
      authState.logout().subscribe({
        next: () => {
          // Assert - should still clear local tokens
          expect(tokenRepository.clearTokens).toHaveBeenCalled();
          expect(authState.isAuthenticated()).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('should handle logout when no tokens exist', (done) => {
      // Arrange
      tokenRepository.getUserData.mockReturnValue(null);
      tokenRepository.getRefreshToken.mockReturnValue(null);

      // Act
      authState.logout().subscribe({
        next: () => {
          // Assert - should not call backend but still clear
          expect(authRepository.logout).not.toHaveBeenCalled();
          expect(tokenRepository.clearTokens).toHaveBeenCalled();
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('Token Refresh', () => {
    it('should successfully refresh expired token', (done) => {
      // Arrange
      const refreshRequest = {
        email: 'test@example.com',
        refreshToken: 'mock-refresh-token',
      };

      tokenRepository.getUserData.mockReturnValue(mockUserData);
      tokenRepository.getRefreshToken.mockReturnValue('mock-refresh-token');
      tokenRepository.isRememberMeEnabled.mockReturnValue(true);
      authRepository.refreshToken.mockReturnValue(of(mockTokens));

      // Act
      authState.refreshToken().subscribe({
        next: (tokens) => {
          // Assert
          expect(tokens).toEqual(mockTokens);
          expect(authRepository.refreshToken).toHaveBeenCalledWith(refreshRequest);
          expect(tokenRepository.saveTokens).toHaveBeenCalledWith(mockTokens, true);
          done();
        },
        error: done.fail,
      });
    });

    it('should logout user if refresh fails', (done) => {
      // Arrange
      tokenRepository.getUserData.mockReturnValue(mockUserData);
      tokenRepository.getRefreshToken.mockReturnValue('invalid-token');
      authRepository.refreshToken.mockReturnValue(
        throwError(() => ({ status: 401, error: 'Invalid refresh token' })),
      );

      // Act
      authState.refreshToken().subscribe({
        next: (result) => {
          // Assert
          expect(result).toBeNull();
          expect(tokenRepository.clearTokens).toHaveBeenCalled();
          expect(authState.isAuthenticated()).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('should return null if no refresh token exists', (done) => {
      // Arrange
      tokenRepository.getUserData.mockReturnValue(null);
      tokenRepository.getRefreshToken.mockReturnValue(null);

      // Act
      authState.refreshToken().subscribe({
        next: (result) => {
          // Assert
          expect(result).toBeNull();
          expect(authRepository.refreshToken).not.toHaveBeenCalled();
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('Authentication State', () => {
    it('should correctly report authenticated state', () => {
      // Arrange
      tokenRepository.isAuthenticated.mockReturnValue(true);

      // Act
      const isAuth = authState.checkAuthentication();

      // Assert
      expect(isAuth).toBe(true);
      expect(authState.isAuthenticated()).toBe(true);
    });

    it('should correctly report unauthenticated state', () => {
      // Arrange
      tokenRepository.isAuthenticated.mockReturnValue(false);

      // Act
      const isAuth = authState.checkAuthentication();

      // Assert
      expect(isAuth).toBe(false);
      expect(authState.isAuthenticated()).toBe(false);
    });

    it('should clear state when authentication check fails', () => {
      // Arrange
      tokenRepository.isAuthenticated.mockReturnValue(false);

      // Act
      authState.checkAuthentication();

      // Assert
      expect(tokenRepository.clearTokens).toHaveBeenCalled();
      expect(authState.user()).toBeNull();
    });
  });

  describe('Register', () => {
    it('should successfully register new user', (done) => {
      // Arrange
      const registerRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        displayName: 'New User',
      };

      authRepository.register.mockReturnValue(of(mockTokens));
      tokenRepository.getUserData.mockReturnValue(mockUserData);

      // Act
      authState.register(registerRequest).subscribe({
        next: (tokens) => {
          // Assert
          expect(tokens).toEqual(mockTokens);
          expect(authRepository.register).toHaveBeenCalledWith(registerRequest);
          expect(tokenRepository.saveTokens).toHaveBeenCalled();
          expect(authState.isAuthenticated()).toBe(true);
          expect(authState.emailVerified()).toBe(false); // New users need verification
          expect(router.navigate).toHaveBeenCalledWith(['/']);
          done();
        },
        error: done.fail,
      });
    });

    it('should handle registration with existing email', (done) => {
      // Arrange
      const registerRequest = {
        email: 'existing@example.com',
        password: 'password123',
        displayName: 'Existing User',
      };

      const errorResponse = {
        status: 409,
        error: { message: 'Email already exists' },
      };

      authRepository.register.mockReturnValue(throwError(() => errorResponse));

      // Act
      authState.register(registerRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(409);
          expect(tokenRepository.saveTokens).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('Password Management', () => {
    it('should successfully request password reset', (done) => {
      // Arrange
      const forgotPasswordRequest = {
        email: 'test@example.com',
      };

      authRepository.forgotPassword.mockReturnValue(of(void 0));

      // Act
      authState.forgotPassword(forgotPasswordRequest).subscribe({
        next: () => {
          // Assert
          expect(authRepository.forgotPassword).toHaveBeenCalledWith(forgotPasswordRequest);
          done();
        },
        error: done.fail,
      });
    });

    it('should successfully reset password with token', (done) => {
      // Arrange
      const resetPasswordRequest = {
        token: 'reset-token',
        newPassword: 'newpassword123',
      };

      authRepository.resetPassword.mockReturnValue(of(void 0));

      // Act
      authState.resetPassword(resetPasswordRequest).subscribe({
        next: () => {
          // Assert
          expect(authRepository.resetPassword).toHaveBeenCalledWith(resetPasswordRequest);
          done();
        },
        error: done.fail,
      });
    });

    it('should successfully change password for authenticated user', (done) => {
      // Arrange
      const changePasswordRequest = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123',
      };

      authRepository.changePassword.mockReturnValue(of(void 0));

      // Act
      authState.changePassword(changePasswordRequest).subscribe({
        next: () => {
          // Assert
          expect(authRepository.changePassword).toHaveBeenCalledWith(changePasswordRequest);
          done();
        },
        error: done.fail,
      });
    });
  });
});
