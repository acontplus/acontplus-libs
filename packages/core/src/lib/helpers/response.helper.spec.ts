import { describe, it, expect } from 'vitest';
import {
  mapSuccess,
  flatMap,
  matchResponse,
  extractData,
  extractErrors,
  firstErrorMessage,
  firstErrorCode,
  hasErrorCode,
  toApiError,
  successResponse,
  errorResponse,
  singleErrorResponse,
  mapError,
} from './response.helper';
import { ApiResponse, ApiError } from '../models/api-response';

describe('mapSuccess', () => {
  it('transforms data on success responses', () => {
    const response: ApiResponse<number> = successResponse(42);
    const mapped = mapSuccess(response, n => n * 2);
    expect(mapped.data).toBe(84);
    expect(mapped.status).toBe('success');
  });

  it('passes through error responses unchanged', () => {
    const response = singleErrorResponse('TEST_CODE', 'test error');
    const mapped = mapSuccess(response, n => n);
    expect(mapped.status).toBe('error');
  });

  it('passes through when data is undefined', () => {
    const response: ApiResponse<unknown> = {
      status: 'success',
      code: '200',
      timestamp: new Date().toISOString(),
    };
    const mapped = mapSuccess(response, d => d);
    expect(mapped.status).toBe('success');
    expect(mapped.data).toBeUndefined();
  });
});

describe('flatMap', () => {
  it('chains success responses', () => {
    const response: ApiResponse<number> = successResponse(10);
    const result = flatMap(response, n => successResponse(n * 5));
    expect(result.data).toBe(50);
    expect(result.status).toBe('success');
  });

  it('short-circuits on error', () => {
    const response: ApiResponse<number> = singleErrorResponse('ERR', 'failure');
    const result = flatMap(response, n => successResponse(n));
    expect(result.status).toBe('error');
    expect(result.errors?.[0].code).toBe('ERR');
  });
});

describe('matchResponse', () => {
  it('calls onSuccess for success responses', () => {
    const response: ApiResponse<string> = successResponse('hello');
    const result = matchResponse(
      response,
      data => `OK: ${data}`,
      () => 'FAIL',
    );
    expect(result).toBe('OK: hello');
  });

  it('calls onError for error responses', () => {
    const response = singleErrorResponse('NN', 'not found');
    const result = matchResponse(
      response,
      () => 'OK',
      err => `FAIL: ${err.errors?.[0].code}`,
    );
    expect(result).toBe('FAIL: NN');
  });
});

describe('extractData', () => {
  it('extracts data from success', () => {
    expect(extractData(successResponse(123))).toBe(123);
  });

  it('returns undefined for error', () => {
    expect(extractData(singleErrorResponse('X', 'y'))).toBeUndefined();
  });
});

describe('extractErrors', () => {
  it('returns errors array', () => {
    const errors: ApiError[] = [toApiError('A', 'msg1'), toApiError('B', 'msg2')];
    const response = errorResponse(errors);
    expect(extractErrors(response)).toHaveLength(2);
    expect(extractErrors(response)[0].code).toBe('A');
  });

  it('returns empty array for success', () => {
    expect(extractErrors(successResponse('ok'))).toEqual([]);
  });
});

describe('firstErrorMessage', () => {
  it('returns first error message', () => {
    const errors: ApiError[] = [toApiError('E1', 'first error'), toApiError('E2', 'second')];
    expect(firstErrorMessage(errorResponse(errors))).toBe('first error');
  });

  it('falls back to response message when no errors', () => {
    const response: ApiResponse<unknown> = {
      status: 'error',
      code: '500',
      message: 'Server message',
      timestamp: new Date().toISOString(),
    };
    expect(firstErrorMessage(response)).toBe('Server message');
  });

  it('returns undefined for success', () => {
    expect(firstErrorMessage(successResponse('data'))).toBeUndefined();
  });
});

describe('firstErrorCode', () => {
  it('returns first error code', () => {
    const errors: ApiError[] = [toApiError('APP_001', 'msg')];
    expect(firstErrorCode(errorResponse(errors))).toBe('APP_001');
  });

  it('returns undefined for success', () => {
    expect(firstErrorCode(successResponse('ok'))).toBeUndefined();
  });
});

describe('hasErrorCode', () => {
  it('detects matching error code', () => {
    const errors: ApiError[] = [
      toApiError('VAL_001', 'invalid name'),
      toApiError('VAL_002', 'invalid email'),
    ];
    expect(hasErrorCode(errorResponse(errors), 'VAL_001')).toBe(true);
    expect(hasErrorCode(errorResponse(errors), 'VAL_999')).toBe(false);
    expect(hasErrorCode(successResponse('ok'), 'ANY')).toBe(false);
  });
});

describe('toApiError', () => {
  it('creates a valid ApiError', () => {
    const error = toApiError('CUSTOM', 'message', 'field', { detail: 'x' });
    expect(error.code).toBe('CUSTOM');
    expect(error.message).toBe('message');
    expect(error.target).toBe('field');
    expect(error.details).toEqual({ detail: 'x' });
  });

  it('defaults target and details to undefined', () => {
    const error = toApiError('C', 'm');
    expect(error.target).toBeUndefined();
    expect(error.details).toBeUndefined();
  });
});

describe('mapError', () => {
  it('overrides error properties', () => {
    const original: ApiError = { code: 'OLD', message: 'old message' };
    const mapped = mapError(original, { code: 'NEW', severity: 'warning' });
    expect(mapped.code).toBe('NEW');
    expect(mapped.message).toBe('old message');
    expect(mapped.severity).toBe('warning');
  });
});

describe('successResponse', () => {
  it('creates a success envelope', () => {
    const response = successResponse({ id: 1 }, 'created');
    expect(response.status).toBe('success');
    expect(response.code).toBe('200');
    expect(response.data).toEqual({ id: 1 });
    expect(response.message).toBe('created');
    expect(response.timestamp).toBeTruthy();
  });
});

describe('errorResponse', () => {
  it('creates an error envelope with multiple errors', () => {
    const errors: ApiError[] = [toApiError('A', 'msgA'), toApiError('B', 'msgB')];
    const response = errorResponse(errors, '422', 'Validation failed');
    expect(response.status).toBe('error');
    expect(response.code).toBe('422');
    expect(response.errors).toHaveLength(2);
    expect(response.message).toBe('Validation failed');
  });

  it('uses first error message when no message provided', () => {
    const errors: ApiError[] = [toApiError('X', 'default from first')];
    const response = errorResponse(errors);
    expect(response.message).toBe('default from first');
  });
});

describe('singleErrorResponse', () => {
  it('creates a single-error envelope', () => {
    const response = singleErrorResponse('NF', 'Not found', '404');
    expect(response.status).toBe('error');
    expect(response.code).toBe('404');
    expect(response.errors).toHaveLength(1);
    expect(response.errors?.[0].code).toBe('NF');
  });
});
