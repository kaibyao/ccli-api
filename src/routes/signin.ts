import { Request, RequestHandler, Response } from 'express';
import { ISigninCookie, ISigninCookieResponse } from '../utils/constants';
import { signIn as getSignInCookie } from '../utils/signin';

/**
 * Express request handler for Logging into CCLI and returning the authentication cookies.
 *
 * @param {Request} req Server request
 * @param {Response} res Server response
 * @returns {Promise<void>} Returns undefined, but sets a response cookie and returns cookie values + options.
 */
const signIn: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password, remember }: { email: string, password: string, remember: boolean|string } = req.body;

  const cookies: ISigninCookie[] = await getSignInCookie(email, password, !!remember);
  const response: ISigninCookieResponse = {};

  let i: number = 0;
  for (i = 0; i < cookies.length; i++) {
    const cookie: ISigninCookie = cookies[i];
    const { key, value }: { key: string, value: string} = cookie;

    res.cookie(key, value);

    response[key] = {
      options: cookie,
      value: cookie.value,
    };
  }

  res.json(response);
};

export { signIn };
