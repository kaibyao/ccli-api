import { Cookie } from 'request';

/**
 * Strings
 */

export const URL_COOKIES_MISC: string = 'https://ccli.com';
export const URL_COOKIES_PROFILE: string = 'https://profile.ccli.com';
export const URL_SIGN_IN: string = 'https://profile.ccli.com/Account/SignIn';
export const URL_SONG_SEARCH: string = 'https://songselect.ccli.com/search/results?SearchText=';
export const URL_SONGSELECT_ROOT: string = 'https://songselect.ccli.com';

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
 * Represents an object of cookie keys and values.
 *
 * @export
 * @interface ISigninCookieObj
 */
export interface ISigninCookieObj {
  [cookieKey: string]: string;
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

export interface ISongSearchResult {
  title: string;
  subtitle: string;
  urlLyrics: string;
}
