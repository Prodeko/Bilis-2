// Common middleware for API or other requests

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { MethodNotAllowedError, ValidationError } from '../exceptions'

const withAPIMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res) // run the handler
    } catch (error) {
      // catch outward facing API errors.
      if (error instanceof ValidationError) {
        res.status(400).json(error.to_json())
      } else if (error instanceof MethodNotAllowedError) {
        res.setHeader('Allow', error.allowed_methods)
        res.status(405).json(error.to_json())
      } else {
        throw error
      }
    }
    return res
  }
}

export default withAPIMiddleware
