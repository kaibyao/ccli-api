import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Cookie } from 'request';
import { ISigninCookie, ISigninCookieResponse } from './utils/constants';
import { signIn } from './utils/signin';

import { routes } from './routes';

const app: express.Application = express();
app.use(bodyParser.json());

app.use(routes);

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('Example app listening on port 3000!');
});
