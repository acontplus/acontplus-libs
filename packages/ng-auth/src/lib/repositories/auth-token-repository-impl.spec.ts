// src/lib/repositories/auth-token-repository-impl.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthTokenRepositoryImpl } from './auth-token-repository-impl';
import { ENVIRONMENT } from '@acontplus/ng-config';
import { AuthTokens, UserData } from '@acontplus/core';

describe('AuthTokenRepositoryImpl - JWT Token Management', () => {
  let repository: AuthTokenRepositoryImpl;
  let localStorageSpy: jest.SpyInstance;
  let sessionStorageSpy: jest.SpyInstance;

  const mockTokens = new AuthTokens(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJkaXNwbGF5TmFtZSI6IlRlc3QgVXNlciIsInJvbGVzIjpbInVzZXIiXSwiZXhwIjo5OTk5OTk5OTk5LCJpYXQiOjE3MDQxMDA4MDB9.mock-signature',
    'mock-refresh-token',
  );

  const mockUserData: UserData = {
    email: 'test@example.com',
    displayName: 'Test User',
    roles: ['user'],
  };

  beforeEach(() => {
    // Mock localStorage and sessionStorage
    const mockStorage: { [key: string]: string } = {};

    localStorageSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      return mockStorage[key] || null;
    });

    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string) => {
      mockStorage[key] = value;
    });

    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation((key: string) => {
      delete mockStorage[key];
    });

    jest.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
      Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
    });

    TestBed.configureTestingModule({
      providers: [
        AuthTokenRepositoryImpl,
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

    repository = TestBed.inject(AuthTokenRepositoryImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Save Tokens', () => {
    it('should save tokens to localStorage when rememberMe is true', () => {
      // Act
      repository.saveTokens(mockTokens, true);

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', mockTokens.token);
      expect(localStorage.setItem).toHaveBeenCalledWith('refresh_token', mockTokens.refreshToken);
      expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'true');
    });

    it('should save tokens to sessionStorage when rememberMe is false', () => {
      // Act
      repository.saveTokens(mockTokens, false);

      // Assert
      expect(sessionStorage.setItem).toHaveBeenCalledWith('auth_token', mockTokens.token);
      expect(sessionStorage.setItem).toHaveBeenCalledWith('refresh_token', mockTokens.refreshToken);
    });

    it('should default to sessionStorage when rememberMe is not specified', () => {
      // Act
      repository.saveTokens(mockTokens);

      // Assert
      expect(sessionStorage.setItem).toHaveBeenCalledWith('auth_token', mockTokens.token);
      expect(sessionStorage.setItem).toHaveBeenCalledWith('refresh_token', mockTokens.refreshToken);
    });
  });

  describe('Get Token', () => {
    it('should retrieve token from localStorage when saved with rememberMe', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);

      // Act
      const token = repository.getToken();

      // Assert
      expect(token).toBe(mockTokens.token);
      expect(localStorage.getItem).toHaveBeenCalledWith('auth_token');
    });

    it('should retrieve token from sessionStorage when saved without rememberMe', () => {
      // Arrange
      repository.saveTokens(mockTokens, false);

      // Act
      const token = repository.getToken();

      // Assert
      expect(token).toBe(mockTokens.token);
      expect(sessionStorage.getItem).toHaveBeenCalledWith('auth_token');
    });

    it('should return null when no token exists', () => {
      // Act
      const token = repository.getToken();

      // Assert
      expect(token).toBeNull();
    });
  });

  describe('Get Refresh Token', () => {
    it('should retrieve refresh token from localStorage', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);

      // Act
      const refreshToken = repository.getRefreshToken();

      // Assert
      expect(refreshToken).toBe(mockTokens.refreshToken);
    });

    it('should retrieve refresh token from sessionStorage', () => {
      // Arrange
      repository.saveTokens(mockTokens, false);

      // Act
      const refreshToken = repository.getRefreshToken();

      // Assert
      expect(refreshToken).toBe(mockTokens.refreshToken);
    });

    it('should return null when no refresh token exists', () => {
      // Act
      const refreshToken = repository.getRefreshToken();

      // Assert
      expect(refreshToken).toBeNull();
    });
  });

  describe('Get User Data', () => {
    it('should decode and return user data from valid JWT', () => {
      // Arrange
      repository.saveTokens(mockTokens, false);

      // Act
      const userData = repository.getUserData();

      // Assert
      expect(userData).not.toBeNull();
      expect(userData?.email).toBe('test@example.com');
      expect(userData?.displayName).toBe('Test User');
      expect(userData?.roles).toEqual(['user']);
    });

    it('should return null when no token exists', () => {
      // Act
      const userData = repository.getUserData();

      // Assert
      expect(userData).toBeNull();
    });

    it('should return null for malformed JWT', () => {
      // Arrange
      const invalidTokens = new AuthTokens('invalid.jwt.token', 'refresh-token');
      repository.saveTokens(invalidTokens, false);

      // Act
      const userData = repository.getUserData();

      // Assert
      expect(userData).toBeNull();
    });

    it('should return null for JWT with invalid base64', () => {
      // Arrange
      const invalidTokens = new AuthTokens(
        'header.!!!invalid-base64!!!.signature',
        'refresh-token',
      );
      repository.saveTokens(invalidTokens, false);

      // Act
      const userData = repository.getUserData();

      // Assert
      expect(userData).toBeNull();
    });
  });

  describe('Clear Tokens', () => {
    it('should clear all tokens from localStorage', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);

      // Act
      repository.clearTokens();

      // Assert
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('rememberMe');
    });

    it('should clear all tokens from sessionStorage', () => {
      // Arrange
      repository.saveTokens(mockTokens, false);

      // Act
      repository.clearTokens();

      // Assert
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    });

    it('should clear from both storages', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);

      // Act
      repository.clearTokens();

      // Assert
      expect(localStorage.removeItem).toHaveBeenCalled();
      expect(sessionStorage.removeItem).toHaveBeenCalled();
    });
  });

  describe('Is Authenticated', () => {
    it('should return true when valid token exists and is not expired', () => {
      // Arrange
      repository.saveTokens(mockTokens, false);

      // Act
      const isAuth = repository.isAuthenticated();

      // Assert
      expect(isAuth).toBe(true);
    });

    it('should return false when no token exists', () => {
      // Act
      const isAuth = repository.isAuthenticated();

      // Assert
      expect(isAuth).toBe(false);
    });

    it('should return false when token is expired', () => {
      // Arrange
      const expiredToken = new AuthTokens(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJkaXNwbGF5TmFtZSI6IlRlc3QgVXNlciIsImV4cCI6MTAwMDAwMDAwMCwiaWF0IjoxMDAwMDAwMDAwfQ.mock-signature',
        'refresh-token',
      );
      repository.saveTokens(expiredToken, false);

      // Act
      const isAuth = repository.isAuthenticated();

      // Assert
      expect(isAuth).toBe(false);
    });

    it('should return false for malformed token', () => {
      // Arrange
      const invalidTokens = new AuthTokens('invalid-token', 'refresh-token');
      repository.saveTokens(invalidTokens, false);

      // Act
      const isAuth = repository.isAuthenticated();

      // Assert
      expect(isAuth).toBe(false);
    });
  });

  describe('Remember Me', () => {
    it('should return true when rememberMe is enabled', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);

      // Act
      const rememberMe = repository.isRememberMeEnabled();

      // Assert
      expect(rememberMe).toBe(true);
    });

    it('should return false when rememberMe is not enabled', () => {
      // Arrange
      repository.saveTokens(mockTokens, false);

      // Act
      const rememberMe = repository.isRememberMeEnabled();

      // Assert
      expect(rememberMe).toBe(false);
    });

    it('should return false when no tokens saved', () => {
      // Act
      const rememberMe = repository.isRememberMeEnabled();

      // Assert
      expect(rememberMe).toBe(false);
    });
  });

  describe('Token Persistence', () => {
    it('should persist tokens across page reloads with rememberMe', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);

      // Simulate page reload by creating new instance
      const newRepository = TestBed.inject(AuthTokenRepositoryImpl);

      // Act
      const token = newRepository.getToken();
      const refreshToken = newRepository.getRefreshToken();

      // Assert
      expect(token).toBe(mockTokens.token);
      expect(refreshToken).toBe(mockTokens.refreshToken);
    });

    it('should not persist tokens without rememberMe after page reload', () => {
      // Arrange
      repository.saveTokens(mockTokens, false);
      sessionStorage.clear(); // Simulate page reload clearing session

      // Act
      const token = repository.getToken();

      // Assert
      expect(token).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle saving tokens with missing refresh token', () => {
      // Arrange
      const tokensWithoutRefresh = new AuthTokens(mockTokens.token, '');

      // Act
      repository.saveTokens(tokensWithoutRefresh, false);
      const savedToken = repository.getToken();
      const savedRefreshToken = repository.getRefreshToken();

      // Assert
      expect(savedToken).toBe(mockTokens.token);
      expect(savedRefreshToken).toBe('');
    });

    it('should handle clearing tokens multiple times', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);

      // Act
      repository.clearTokens();
      repository.clearTokens();
      repository.clearTokens();

      // Assert
      expect(repository.getToken()).toBeNull();
      expect(repository.getRefreshToken()).toBeNull();
    });

    it('should handle switching between localStorage and sessionStorage', () => {
      // Arrange
      repository.saveTokens(mockTokens, true);
      expect(repository.getToken()).toBe(mockTokens.token);

      // Act - save to sessionStorage
      const newTokens = new AuthTokens('new.token.here', 'new-refresh');
      repository.saveTokens(newTokens, false);

      // Assert
      expect(repository.getToken()).toBe(newTokens.token);
    });
  });
});
