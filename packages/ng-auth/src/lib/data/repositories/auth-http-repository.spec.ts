// src/lib/data/repositories/auth-http-repository.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthHttpRepository } from './auth-http-repository';
import { AUTH_API } from '@acontplus/ng-config';
import { AuthTokens } from '@acontplus/core';
import { LoginRequest, RegisterRequest } from '../../domain/models/auth';

describe('AuthHttpRepository - JWT Login', () => {
  let repository: AuthHttpRepository;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api/auth/';

  const mockTokens = new AuthTokens('mock.jwt.token', 'mock-refresh-token');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthHttpRepository,
        {
          provide: AUTH_API,
          useValue: { AUTH: baseUrl },
        },
      ],
    });

    repository = TestBed.inject(AuthHttpRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Login', () => {
    it('should send POST request to login endpoint', (done) => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      };

      // Act
      repository.login(loginRequest).subscribe({
        next: (tokens) => {
          // Assert
          expect(tokens).toEqual(mockTokens);
          done();
        },
        error: done.fail,
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${baseUrl}login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginRequest);
      expect(req.request.headers.has('Device-Info')).toBe(true);
      expect(req.request.withCredentials).toBe(true);

      req.flush(mockTokens);
    });

    it('should include device info in headers', (done) => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Act
      repository.login(loginRequest).subscribe({
        next: () => done(),
        error: done.fail,
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}login`);
      const deviceInfo = req.request.headers.get('Device-Info');
      expect(deviceInfo).toBeTruthy();
      expect(deviceInfo).toContain(navigator.platform || 'Unknown');

      req.flush(mockTokens);
    });

    it('should handle 401 unauthorized error', (done) => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const errorResponse = {
        status: 401,
        statusText: 'Unauthorized',
        error: { message: 'Invalid credentials' },
      };

      // Act
      repository.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(401);
          expect(error.error.message).toBe('Invalid credentials');
          done();
        },
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}login`);
      req.flush(errorResponse.error, {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
      });
    });

    it('should handle 400 bad request error', (done) => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: '',
        password: '',
      };

      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
        error: { message: 'Email and password are required' },
      };

      // Act
      repository.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(400);
          done();
        },
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}login`);
      req.flush(errorResponse.error, {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
      });
    });

    it('should handle network error', (done) => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Act
      repository.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.error).toBeInstanceOf(ProgressEvent);
          done();
        },
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}login`);
      req.error(new ProgressEvent('Network error'));
    });

    it('should handle 429 rate limit error', (done) => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      const errorResponse = {
        status: 429,
        statusText: 'Too Many Requests',
        error: { message: 'Too many login attempts. Please try again later.' },
      };

      // Act
      repository.login(loginRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(429);
          expect(error.error.message).toContain('Too many');
          done();
        },
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}login`);
      req.flush(errorResponse.error, {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
      });
    });
  });

  describe('Register', () => {
    it('should send POST request to register endpoint', (done) => {
      // Arrange
      const registerRequest: RegisterRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        displayName: 'New User',
      };

      // Act
      repository.register(registerRequest).subscribe({
        next: (tokens) => {
          // Assert
          expect(tokens).toEqual(mockTokens);
          done();
        },
        error: done.fail,
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${baseUrl}register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(registerRequest);
      expect(req.request.withCredentials).toBe(true);

      req.flush(mockTokens);
    });

    it('should handle 409 conflict error for existing email', (done) => {
      // Arrange
      const registerRequest: RegisterRequest = {
        email: 'existing@example.com',
        password: 'password123',
        displayName: 'Existing User',
      };

      const errorResponse = {
        status: 409,
        statusText: 'Conflict',
        error: { message: 'Email already exists' },
      };

      // Act
      repository.register(registerRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(409);
          expect(error.error.message).toBe('Email already exists');
          done();
        },
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}register`);
      req.flush(errorResponse.error, {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
      });
    });
  });

  describe('Logout', () => {
    it('should send POST request to logout endpoint', (done) => {
      // Arrange
      const email = 'test@example.com';
      const refreshToken = 'mock-refresh-token';

      // Act
      repository.logout(email, refreshToken).subscribe({
        next: () => {
          // Assert - just check the request was made
          done();
        },
        error: done.fail,
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${baseUrl}logout`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email,
        refreshToken,
      });
      expect(req.request.withCredentials).toBe(true);

      req.flush(null);
    });

    it('should handle logout with no refresh token', (done) => {
      // Arrange
      const email = 'test@example.com';
      const refreshToken = '';

      // Act
      repository.logout(email, refreshToken).subscribe({
        next: () => done(),
        error: done.fail,
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}logout`);
      expect(req.request.body.refreshToken).toBeUndefined();

      req.flush(null);
    });
  });

  describe('Refresh Token', () => {
    it('should send POST request to refresh endpoint', (done) => {
      // Arrange
      const refreshRequest = {
        email: 'test@example.com',
        refreshToken: 'mock-refresh-token',
      };

      // Act
      repository.refreshToken(refreshRequest).subscribe({
        next: (tokens) => {
          // Assert
          expect(tokens).toEqual(mockTokens);
          done();
        },
        error: done.fail,
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${baseUrl}refresh`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(refreshRequest);
      expect(req.request.withCredentials).toBe(true);

      req.flush(mockTokens);
    });

    it('should handle 401 error for invalid refresh token', (done) => {
      // Arrange
      const refreshRequest = {
        email: 'test@example.com',
        refreshToken: 'invalid-token',
      };

      const errorResponse = {
        status: 401,
        statusText: 'Unauthorized',
        error: { message: 'Invalid refresh token' },
      };

      // Act
      repository.refreshToken(refreshRequest).subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(401);
          done();
        },
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}refresh`);
      req.flush(errorResponse.error, {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
      });
    });
  });

  describe('Password Management', () => {
    it('should send forgot password request', (done) => {
      // Arrange
      const request = { email: 'test@example.com' };

      // Act
      repository.forgotPassword(request).subscribe({
        next: () => done(),
        error: done.fail,
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}forgot-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(request);

      req.flush(null);
    });

    it('should send reset password request', (done) => {
      // Arrange
      const request = {
        token: 'reset-token',
        newPassword: 'newpassword123',
      };

      // Act
      repository.resetPassword(request).subscribe({
        next: () => done(),
        error: done.fail,
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}reset-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(request);

      req.flush(null);
    });

    it('should send change password request', (done) => {
      // Arrange
      const request = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123',
      };

      // Act
      repository.changePassword(request).subscribe({
        next: () => done(),
        error: done.fail,
      });

      // Assert
      const req = httpMock.expectOne(`${baseUrl}change-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(request);
      expect(req.request.withCredentials).toBe(true);

      req.flush(null);
    });
  });
});
