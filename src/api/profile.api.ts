import { type AxiosResponse } from 'axios';
import type { ProfileData } from '../dto/profile.dto';
import { UrlProvider } from '../proveders/url.provider';
import { authHeaders, toFormBody } from './form';
import { httpClient } from './http.client';
import { getProfileSession } from './session';

type ProfileSaveOptions = {
  csrfToken?: string;
};

export class ProfileApi {
  async save(
    cookie: string,
    data: Partial<ProfileData> = {},
    options: ProfileSaveOptions = {},
  ): Promise<AxiosResponse> {
    const session = await getProfileSession(cookie);
    const csrfToken = options.csrfToken ?? session.csrf;
    const globalCsrf = options.csrfToken ?? session.globalCsrf;

    return httpClient.post(
      UrlProvider.profileSave(),
      toFormBody(
        {
          'user[title]': data.title,
          'user[email]': data.email,
          'user[phone]': data.phone,
          'user[city]': data.city,
          'user[city_id]': data.cityId,
          'user[address]': data.address,
        },
        csrfToken,
      ),
      {
        headers: authHeaders(session.cookie, globalCsrf, UrlProvider.profile()),
      },
    );
  }
}
