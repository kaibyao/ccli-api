import * as _ from 'lodash';
import { Cookie } from 'request';
import * as request from 'request-promise-native';
import { IRequestCookie, URL_SIGN_IN, USER_AGENT } from './constants';

/**
 * Attempts to sign into CCLI using user-supplied credentials.
 *
 * @export
 * @param {string} email User email address
 * @param {string} password User password
 * @param {boolean} rememberMe Whether CCLI remembers the user based on the returned token string (not sure this works)
 * @returns {Promise<IRequestCookie[]>}
 */
export async function signIn(email: string, password: string, rememberMe: boolean): Promise<IRequestCookie[]> {
  const jar = request.jar();

  const setupRequestVerificationToken = await request({
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

  const response = await request({
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

  return jar.getCookies('https://profile.ccli.com') as IRequestCookie[];
}
