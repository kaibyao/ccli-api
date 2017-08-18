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
const signin_1 = require("../utils/signin");
/**
 * Express request handler for Logging into CCLI and returning the authentication cookies.
 *
 * @param {Request} req Server request
 * @param {Response} res Server response
 * @returns {Promise<void>} Returns undefined, but sets a response cookie and returns cookie values + options.
 */
const signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password, remember } = req.body;
    const cookies = yield signin_1.signIn(email, password, !!remember);
    const response = {};
    let i = 0;
    for (i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const { key, value } = cookie;
        res.cookie(key, value);
        response[key] = {
            options: cookie,
            value: cookie.value,
        };
    }
    res.json(response);
});
exports.signIn = signIn;
//# sourceMappingURL=signin.js.map