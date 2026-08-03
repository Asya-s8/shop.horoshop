import axios from 'axios';
import { UrlProvider } from '../proveders/url.provider';
import { USER_AGENT } from './http.client';

export type PageSession = {
  cookie: string;
  html: string;
  globalCsrf: string;
  status: number;
};

export type FormSession = PageSession & {
  csrf: string;
};

const SIGNUP_CSRF =
  /\.val\(["']([a-f0-9]+)["']\);\$\(["']#signup-form["']\)\.append\(i\)/;
const PROFILE_CSRF =
  /\.val\(["']([a-f0-9]+)["']\);\$\(["']form\[name=\\"profile\\"\]["']\)\.append\(i\)/;

export async function getPageSession(path: string, cookie = ''): Promise<PageSession> {
  return loadPage(path, cookie);
}

export async function getSignupSession(): Promise<FormSession> {
  return getFormSession('/', SIGNUP_CSRF, 'signup');
}

export async function getProfileSession(cookie: string): Promise<FormSession> {
  return getFormSession('/profile/', PROFILE_CSRF, 'profile', cookie);
}

export function mergeCookies(current: string, incoming: string[] = []): string {
  const cookies = new Map(
    current
      .split('; ')
      .filter(Boolean)
      .map((item) => {
        const index = item.indexOf('=');
        return [item.slice(0, index), item.slice(index + 1)] as [string, string];
      }),
  );

  for (const raw of incoming) {
    const [pair] = raw.split(';');
    const index = pair.indexOf('=');
    cookies.set(pair.slice(0, index), pair.slice(index + 1));
  }

  return [...cookies.entries()].map(([key, value]) => `${key}=${value}`).join('; ');
}

async function getFormSession(
  path: string,
  csrfPattern: RegExp,
  formName: string,
  cookie = '',
): Promise<FormSession> {
  const page = await loadPage(path, cookie);
  const csrf = page.html.match(csrfPattern)?.[1];

  if (!csrf || !page.globalCsrf) {
    throw new Error(`Failed to extract ${formName} CSRF token`);
  }

  return { ...page, csrf };
}

async function loadPage(path: string, cookie = ''): Promise<PageSession> {
  let currentCookie = cookie;
  let status = 0;

  const request = async (): Promise<string> => {
    const response = await axios.get(`${UrlProvider.baseURL}${path}`, {
      validateStatus: () => true,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html',
        ...(currentCookie && { Cookie: currentCookie }),
      },
    });
    status = response.status;
    currentCookie = mergeCookies(currentCookie, response.headers['set-cookie']);
    return String(response.data);
  };

  let html = await request();
  const challengeHash = html.match(/defaultHash\s*=\s*"([a-f0-9]+)"/i)?.[1];

  if (challengeHash) {
    currentCookie = mergeCookies(currentCookie, [`challenge_passed=${challengeHash}`]);
    html = await request();
  }

  const globalCsrf = html.match(/GLOBAL_CSRF_TOKEN\s*:\s*['"]([a-f0-9]+)['"]/)?.[1] ?? '';

  return { cookie: currentCookie, html, globalCsrf, status };
}
