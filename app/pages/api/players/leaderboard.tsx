import type { NextApiRequest, NextApiResponse } from 'next'
import { playerAPI } from '../../../common/db/players'
import { MethodNotAllowedError, ParseError } from '../../../common/exceptions'
import withAPIMiddleware from '../../../common/middleware'

const parseRequest = (query: NextApiRequest["query"]): {
  page: number | undefined,
  pageSize: number | undefined,
} => {
  const { page, pageSize } = query;
  if (page !== undefined && typeof page !== "string") {
    throw new ParseError("query parameter page of invalid form");
  } else if ( page && isNaN(parseInt(page)) ) {
    throw new ParseError("query parameter page of invalid form");
  }

  if (pageSize !== undefined && typeof pageSize !== "string") {
    throw new ParseError("query parameter pageSize of invalid form");
  } else if ( pageSize && isNaN(parseInt(pageSize)) ) {
    throw new ParseError("query parameter pageSize of invalid form");
  }

  return {
    page: page ? parseInt(page) : undefined,
    pageSize: pageSize ? parseInt(pageSize) : undefined
  }

}

const leaderboardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { page, pageSize } = parseRequest(req.query);
      const topPlayers = await playerAPI.getTopPlayers(page, pageSize);
      res.json(topPlayers);
      break
    case undefined:
      throw new MethodNotAllowedError('', ['GET'])
    default:
      throw new MethodNotAllowedError(method, ['GET'])
  }
}

export default withAPIMiddleware(leaderboardHandler)
