"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_1 = require("./signin");
const router = express_1.Router();
exports.routes = router;
const index = (req, res) => {
    res.send({
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
//# sourceMappingURL=index.js.map