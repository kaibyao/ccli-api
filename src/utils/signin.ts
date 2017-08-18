import * as _ from 'lodash';
import { Cookie, CookieJar } from 'request';
import * as request from 'request-promise-native';
import { ISigninCookie, URL_COOKIES_MISC, URL_COOKIES_PROFILE, URL_SIGN_IN, USER_AGENT } from './constants';

/**
 * Attempts to sign into CCLI using user-supplied credentials.
 *
 * @export
 * @param {string} email User email address
 * @param {string} password User password
 * @param {boolean} rememberMe Whether CCLI remembers the user based on the returned token string (not sure this works)
 * @returns {Promise<ISigninCookie[]>}
 */
export async function signIn(email: string, password: string, rememberMe: boolean): Promise<ISigninCookie[]> {
  const jar: CookieJar = request.jar();

  const setupRequestVerificationToken: request.RequestPromise = request({
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Host': 'profile.ccli.com',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': USER_AGENT,
    },
    jar,
    method: 'GET',
    resolveWithFullResponse: true,
    simple: false,
    uri: URL_SIGN_IN,
  });

  const response: request.RequestPromise = request({
    formData: {
      EmailAddress: email,
      Password: password,
      RememberMe: String(rememberMe),
    },
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'DNT': '1',
      'Host': 'profile.ccli.com',
      'Origin': 'https://profile.ccli.com',
      'Referer': 'https://profile.ccli.com/account',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': USER_AGENT,
    },
    jar,
    method: 'POST',
    resolveWithFullResponse: true,
    simple: false,
    uri: URL_SIGN_IN,
  });

  const userContext: request.RequestPromise = request({
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'DNT': '1',
      'Host': 'profile.ccli.com',
      'Origin': 'https://profile.ccli.com',
      'Referer': 'https://profile.ccli.com/account',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': USER_AGENT,
    },
    jar,
    method: 'GET',
    uri: URL_COOKIES_PROFILE,
  });

  await Promise.all([setupRequestVerificationToken, response, userContext]);

  const allCookies: ISigninCookie[] = _.concat<ISigninCookie>(
    jar.getCookies(URL_COOKIES_MISC) as ISigninCookie[],
    jar.getCookies(URL_COOKIES_PROFILE) as ISigninCookie[],
  );

  return _.uniqBy<ISigninCookie>(allCookies, 'key');
}
