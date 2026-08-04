import { ApiResponse, ApiError, isSuccessResponse, isErrorResponse } from '../models/api-response';

export type ResponseResult<T> = ApiResponse<T>;

export function mapSuccess<T, U>(response: ApiResponse<T>, mapper: (data: T) => U): ApiResponse<U> {
  if (isSuccessResponse(response) && response.data !== undefined && response.data !== null) {
    return {
      ...response,
      data: mapper(response.data),
    };
  }
  return response as unknown as ApiResponse<U>;
}

export function flatMap<T, U>(
  response: ApiResponse<T>,
  mapper: (data: T) => ApiResponse<U>,
): ApiResponse<U> {
  if (isSuccessResponse(response) && response.data !== undefined && response.data !== null) {
    return mapper(response.data);
  }
  return response as unknown as ApiResponse<U>;
}

export function matchResponse<T, U>(
  response: ApiResponse<T>,
  onSuccess: (data: T) => U,
  onError: (response: ApiResponse<T>) => U,
): U {
  if (isSuccessResponse(response) && response.data !== undefined && response.data !== null) {
    return onSuccess(response.data);
  }
  return onError(response);
}

export function matchResponseAsync<T, U>(
  response: ApiResponse<T>,
  onSuccess: (data: T) => Promise<U>,
  onError: (response: ApiResponse<T>) => Promise<U>,
): Promise<U> {
  if (isSuccessResponse(response) && response.data !== undefined && response.data !== null) {
    return onSuccess(response.data);
  }
  return onError(response);
}

export function mapError(error: ApiError, overrides: Partial<ApiError>): ApiError {
  return { ...error, ...overrides };
}

export function extractData<T>(response: ApiResponse<T>): T | undefined {
  return isSuccessResponse(response) ? response.data : undefined;
}

export function extractErrors(response: ApiResponse<unknown>): ApiError[] {
  return response.errors ?? [];
}

export function firstErrorMessage(response: ApiResponse<unknown>): string | undefined {
  return response.errors?.[0]?.message ?? response.message ?? undefined;
}

export function firstErrorCode(response: ApiResponse<unknown>): string | undefined {
  return response.errors?.[0]?.code ?? undefined;
}

export function hasErrorCode(response: ApiResponse<unknown>, code: string): boolean {
  return response.errors?.some(e => e.code === code) ?? false;
}

export function toApiError(
  code: string,
  message: string,
  target?: string,
  details?: Record<string, unknown>,
): ApiError {
  return { code, message, target, details };
}

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    status: 'success',
    code: '200',
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(
  errors: ApiError[],
  statusCode = '400',
  message?: string,
): ApiResponse<never> {
  return {
    status: 'error',
    code: statusCode,
    message: message ?? errors[0]?.message ?? 'An error occurred',
    errors,
    timestamp: new Date().toISOString(),
  };
}

export function singleErrorResponse(
  code: string,
  message: string,
  statusCode = '400',
): ApiResponse<never> {
  return errorResponse([toApiError(code, message)], statusCode, message);
}
