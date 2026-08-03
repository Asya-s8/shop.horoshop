import { UrlProvider } from '../proveders/url.provider';

export function toFormBody(
  fields: Record<string, string | undefined>,
  csrfToken: string,
): string {
  const body = new URLSearchParams({ CSRFToken: csrfToken });

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      body.set(key, value);
    }
  }

  return body.toString();
}

export function authHeaders(cookie: string, csrfToken: string, referer: string) {
  return {
    'X-CSRF-Token': csrfToken,
    Cookie: cookie,
    Referer: referer,
    Origin: UrlProvider.baseURL,
  };
}
