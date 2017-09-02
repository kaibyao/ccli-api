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
const song_search_1 = require("../api/song-search");
/**
 * Express request handler for searching a song from CCLI.
 *
 * @param {Request} req Server request
 * @param {Response} res Server response
 * @returns {Promise<void>} Function returns undefined, but response returns song search results.
 */
const songSearch = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { text } = req.query;
    const songSearchResults = yield song_search_1.songSearch(text, req.cookies);
    res.json(songSearchResults);
});
exports.songSearch = songSearch;
//# sourceMappingURL=song-search.js.map