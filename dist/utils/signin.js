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
const request = require("request-promise-native");
const constants_1 = require("./constants");
/**
 * Attempts to sign into CCLI using user-supplied credentials.
 *
 * @export
 * @param {string} email User email address
 * @param {string} password User password
 * @param {boolean} rememberMe Whether CCLI remembers the user based on the returned token string (not sure this works)
 * @returns {Promise<IRequestCookie[]>}
 */
function signIn(email, password, rememberMe) {
    return __awaiter(this, void 0, void 0, function* () {
        const jar = request.jar();
        const setupRequestVerificationToken = yield request({
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'DNT': '1',
                'Host': 'profile.ccli.com',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': constants_1.USER_AGENT,
            },
            jar,
            method: 'GET',
            resolveWithFullResponse: true,
            simple: false,
            uri: constants_1.URL_SIGN_IN,
        });
        const response = yield request({
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
                'User-Agent': constants_1.USER_AGENT,
            },
            jar,
            method: 'POST',
            resolveWithFullResponse: true,
            simple: false,
            uri: constants_1.URL_SIGN_IN,
        });
        return jar.getCookies('https://profile.ccli.com');
    });
}
exports.signIn = signIn;
//# sourceMappingURL=signin.js.map