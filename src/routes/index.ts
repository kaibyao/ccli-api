import { IRouter, Request, RequestHandler, Response, Router } from 'express';
import { signIn } from './signin';
import { songSearch } from './song-search';

const router: IRouter<any> = Router();

const index: RequestHandler = (req: Request, res: Response) => {
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
router.post('/signin', signIn);
router.get('/songsearch', songSearch);

export { router as routes };
