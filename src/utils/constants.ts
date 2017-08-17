import { Cookie } from 'request';

/**
 * Strings
 */

export const URL_SIGN_IN: string = 'https://profile.ccli.com/Account/SignIn';

// tslint:disable-next-line:max-line-length
export const USER_AGENT: string = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36';

/**
 * Interfaces
 */

/**
 * Extends the Cookie interface with the missing key and value props.
 *
 * @export
 * @interface ISigninCookie
 * @extends {Cookie}
 */
export interface ISigninCookie extends Cookie {
  key: string;
  value: string;
}

/**
 * Represents the cookies returned from a successful sign-in.
 *
 * @interface ISigninCookieResponse
 */
export interface ISigninCookieResponse {
  [cookieKey: string]: {
    options: ISigninCookie;
    value: string;
  };
}
