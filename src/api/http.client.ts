import axios from 'axios';
import { UrlProvider } from '../proveders/url.provider';

export const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export const httpClient = axios.create({
  baseURL: UrlProvider.baseURL,
  validateStatus: () => true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': USER_AGENT,
  },
});
