import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import { routes } from './routes';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(routes);

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('Example app listening on port 3000!');
});
