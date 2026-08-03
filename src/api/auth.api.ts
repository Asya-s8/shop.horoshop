import type { SignUpData, SignUpOptions, SignUpResult } from '../dto/sign-up.dto';
import { UrlProvider } from '../proveders/url.provider';
import { authHeaders, toFormBody } from './form';
import { httpClient } from './http.client';
import { getSignupSession, mergeCookies } from './session';

export class AuthApi {
  async signUp(
    data: Partial<SignUpData> = {},
    options: SignUpOptions = {},
  ): Promise<SignUpResult> {
    const session = await getSignupSession();
    const csrfToken = options.csrfToken ?? session.csrf;
    const globalCsrf = options.csrfToken ?? session.globalCsrf;

    const response = await httpClient.post(
      UrlProvider.signUp(),
      toFormBody(
        {
          'user[title]': data.title,
          'user[email]': data.email,
          'user[pass]': data.password,
        },
        csrfToken,
      ),
      {
        headers: authHeaders(session.cookie, globalCsrf, UrlProvider.home()),
      },
    );

    return {
      response,
      cookie: mergeCookies(session.cookie, response.headers['set-cookie']),
    };
  }
}
