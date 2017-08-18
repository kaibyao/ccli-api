"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const request = require("request-promise-native");
const constants_1 = require("./constants");
/**
 * Attempts to search for a song from CCLI using provided cookies.
 *
 * @export
 * @param {string} songSearchText Text of song
 * @param {ISigninCookieObj} cookies Cookie key:value hash object
 * @returns {Promise<void>}
 */
function songSearch(songSearchText, cookies) {
    return __awaiter(this, void 0, void 0, function* () {
        const jar = request.jar();
        const cookieKeys = Object.keys(cookies);
        let i = 0;
        for (i = 0; i < cookieKeys.length; i++) {
            const cookieKey = cookieKeys[i];
            const cookie = request.cookie(`${cookieKey}=${cookies[cookieKey]}`);
            jar.setCookie(cookie, constants_1.URL_COOKIES_MISC);
        }
        const songResultsHtml = yield request({
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
                'User-Agent': constants_1.USER_AGENT,
            },
            jar,
            method: 'GET',
            uri: generateSongSearchUrl(songSearchText),
        });
        const $ = cheerio.load(songResultsHtml);
        const $songResults = $('.song-result');
        const songResults = [];
        $songResults.each((index, el) => {
            const $el = cheerio(el);
            const $title = $el.find('.song-result-title');
            songResults.push({
                subtitle: $el.find('.song-result-subtitle').text().trim(),
                title: $title.text(),
                urlLyrics: `${constants_1.URL_SONGSELECT_ROOT}${$title.children('a').attr('href')}/viewlyrics`,
            });
        });
        return songResults;
    });
}
exports.songSearch = songSearch;
function generateSongSearchUrl(songSearchText) {
    return `${constants_1.URL_SONG_SEARCH}${encodeURIComponent(songSearchText)}`;
}
//# sourceMappingURL=song-search.js.map