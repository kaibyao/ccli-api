"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_1 = require("./signin");
const song_search_1 = require("./song-search");
const router = express_1.Router();
exports.routes = router;
const index = (req, res) => {
    res.send({
        '/lyrics': {
            get: {
                url: 'SongSelect View Lyrics URL',
            },
        },
        '/signin': {
            post: {
                email: 'Login email address',
                password: 'Login password',
                remember: 'true | false',
            },
        },
        '/songsearch': {
            get: {
                text: 'Song text',
            },
        },
    });
};
router.get('/', index);
router.post('/signin', signin_1.signIn);
router.get('/songsearch', song_search_1.songSearch);
//# sourceMappingURL=index.js.map