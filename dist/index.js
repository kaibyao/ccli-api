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
const bodyParser = require("body-parser");
const express = require("express");
const signin_1 = require("./utils/signin");
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send({
        '/signin': {
            post: {
                email: 'Login email address',
                password: 'Login password',
                remember: 'true | false',
            },
        },
    });
});
app.post('/signin', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map