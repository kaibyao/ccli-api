import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { Cookie, CookieJar } from 'request';
import * as request from 'request-promise-native';
import {
  ISigninCookieObj,
  ISongSearchResult,
  URL_COOKIES_MISC,
  URL_SONG_SEARCH,
  URL_SONGSELECT_ROOT,
  USER_AGENT,
} from './constants';

/**
 * Attempts to search for a song from CCLI using provided cookies.
 *
 * @export
 * @param {string} songSearchText Text of song
 * @param {ISigninCookieObj} cookies Cookie key:value hash object
 * @returns {Promise<void>}
 */
export async function songSearch(songSearchText: string, cookies: ISigninCookieObj): Promise<ISongSearchResult[]> {
  const jar: CookieJar = request.jar();
  const cookieKeys: string[] = Object.keys(cookies);
  let i: number = 0;
  for (i = 0; i < cookieKeys.length; i++) {
    const cookieKey: string = cookieKeys[i];
    const cookie: Cookie = request.cookie(`${cookieKey}=${cookies[cookieKey]}`);
    jar.setCookie(cookie, URL_COOKIES_MISC);
  }

  const songResultsHtml: string = await request({
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Host': 'songselect.ccli.com',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': USER_AGENT,
    },
    jar,
    method: 'GET',
    uri: generateSongSearchUrl(songSearchText),
  });
  const $: CheerioStatic = cheerio.load(songResultsHtml);

  const $songResults: Cheerio = $('.song-result');
  const songResults: ISongSearchResult[] = [];
  $songResults.each((index: number, el: CheerioElement) => {
    const $el: Cheerio = cheerio(el);
    const $title: Cheerio = $el.find('.song-result-title');

    songResults.push({
      subtitle: $el.find('.song-result-subtitle').text().trim(),
      title: $title.text(),
      urlLyrics: `${URL_SONGSELECT_ROOT}${$title.children('a').attr('href')}/viewlyrics`,
    });
  });

  return songResults;
}

function generateSongSearchUrl(songSearchText: string): string {
  return `${URL_SONG_SEARCH}${encodeURIComponent(songSearchText)}`;
}
