import axios from 'axios';
import { UrlProvider } from '../proveders/url.provider';

export const httpClient = axios.create({
  baseURL: UrlProvider.baseURL,
  validateStatus: () => true,
});
