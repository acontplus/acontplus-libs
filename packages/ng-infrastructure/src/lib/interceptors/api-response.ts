import { HttpResponse } from '@angular/common/http';
import { ApiResponse, getLocalizedAppMessage, AppMessageKey } from '@acontplus/core';
import { LanguageInfo } from '../services/language-info';

// ---------------------------------------------------------------------------
// Standardisation
// ---------------------------------------------------------------------------

export function standardizeApiResponse(
  body: unknown,
  languageInfo: LanguageInfo,
): ApiResponse<unknown> {
  if (isValidApiResponse(body)) return body;

  if (body !== null && body !== undefined) {
    return wrapSuccess(body, languageInfo);
  }

  return wrapSuccess(undefined, languageInfo);
}

function wrapSuccess(data: unknown, languageInfo: LanguageInfo): ApiResponse<unknown> {
  return {
    status: 'success',
    code: '200',
    message: getLocalizedAppMessage(
      AppMessageKey.OPERATION_COMPLETED,
      languageInfo.getCurrentLanguage(),
    ),
    data,
    timestamp: new Date().toISOString(),
  };
}

function isValidApiResponse(response: unknown): response is ApiResponse<unknown> {
  if (response === null || typeof response !== 'object') return false;
  const r = response as Record<string, unknown>;
  return (
    'status' in r &&
    'code' in r &&
    typeof r['status'] === 'string' &&
    ['success', 'error', 'warning'].includes(r['status'] as string)
  );
}

// ---------------------------------------------------------------------------
// Response transformation
// ---------------------------------------------------------------------------

export function transformResponseForConsumers(
  response: ApiResponse<unknown>,
  originalEvent: HttpResponse<unknown>,
): HttpResponse<unknown> {
  switch (response.status) {
    case 'success':
    case 'warning':
      // Unwrap data for consumers; fall back to full envelope when no data
      return response.data !== undefined && response.data !== null
        ? originalEvent.clone({ body: response.data })
        : originalEvent.clone({ body: response });

    case 'error':
    default:
      return originalEvent.clone({ body: response });
  }
}
