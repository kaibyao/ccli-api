import { IRouter, Request, RequestHandler, Response, Router } from 'express';
import { signIn } from './signin';

const router: IRouter<any> = Router();

const index: RequestHandler = (req: Request, res: Response) => {
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
router.post('/signin', signIn);

export { router as routes };
