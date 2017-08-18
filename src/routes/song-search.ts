import { Request, RequestHandler, Response } from 'express';
import { ISigninCookie, ISigninCookieResponse, ISongSearchResult } from '../utils/constants';
import { songSearch as getSongSearchResults } from '../utils/song-search';

/**
 * Express request handler for searching a song from CCLI.
 *
 * @param {Request} req Server request
 * @param {Response} res Server response
 * @returns {Promise<void>} Function returns undefined, but response returns song search results.
 */
const songSearch: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { text }: { text: string } = req.query;

  const songSearchResults: ISongSearchResult[] = await getSongSearchResults(text, req.cookies);

  res.json(songSearchResults);
};

export { songSearch };
