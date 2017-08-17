"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const routes_1 = require("./routes");
const app = express();
app.use(bodyParser.json());
app.use(routes_1.routes);
app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map