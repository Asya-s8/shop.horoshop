import { type AxiosResponse } from 'axios';
import { httpClient } from './http.client';
import { UrlProvider } from '../proveders/url.provider';

export class CatalogApi {
  getElectronics(): Promise<AxiosResponse> {
    return httpClient.get(UrlProvider.electronics());
  }
}
