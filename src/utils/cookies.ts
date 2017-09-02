import { Cookie, CookieJar } from 'request';
import * as request from 'request-promise-native';
import {
  ISigninCookieObj,
  URL_COOKIES_MISC,
} from '../utils/constants';

/**
 * Takes a cookie key:value object and returns a Request CookieJar.
 *
 * @export
 * @param {ISigninCookieObj} cookies key:value cookie hash
 * @returns {CookieJar} A CookieJar instance ready to be used by Request.
 */
export function generateCookieJar(cookies: ISigninCookieObj): CookieJar {
  const jar: CookieJar = request.jar();
  const cookieKeys: string[] = Object.keys(cookies);
  let i: number = 0;
  for (i = 0; i < cookieKeys.length; i++) {
    const cookieKey: string = cookieKeys[i];
    const cookie: Cookie = request.cookie(`${cookieKey}=${cookies[cookieKey]}`);
    jar.setCookie(cookie, URL_COOKIES_MISC);
  }

  return jar;
}
