import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Cookie } from 'request';
import { IRequestCookie, ISignInCookies } from './utils/constants';
import { signIn } from './utils/signin';

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

app.post('/signin', async (req, res) => {
  const { email, password, remember }: { email: string, password: string, remember: boolean|string } = req.body;

  const cookies: IRequestCookie[] = await signIn(email, password, !!remember);
  const response: ISignInCookies = {};

  let i: number = 0;
  for (i = 0; i < cookies.length; i++) {
    const cookie: IRequestCookie = cookies[i];
    const { key, value }: { key: string, value: string} = cookie;

    res.cookie(key, value);

    response[key] = {
      options: cookie,
      value: cookie.value,
    };
  }

  res.json(response);
});

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('Example app listening on port 3000!');
});
