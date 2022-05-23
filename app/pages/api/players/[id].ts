import type { NextApiRequest, NextApiResponse } from 'next'
import type { Player, PlayerWithStats } from '../../../common/types'
import { playerAPI } from '../../../common/db/players'
import {
  MethodNotAllowedError,
  ObjectNotFoundError,
  ValidationError,
} from '../../../common/exceptions'
import withAPIMiddleware from '../../../common/middleware'

const playerHandler = async (req: NextApiRequest, res: NextApiResponse<PlayerWithStats>) => {
  const {
    query: { id },
    method,
  } = req

  const id_number = Number(id.toString())

  if (isNaN(id_number)) {
    throw new ValidationError('player_id', 'Invalid player id.')
  }
  try {
    var player_result = await playerAPI.getPlayerStatsById(id_number)
  } catch (error) {
    // Catch expected errors from internal API
    if (error instanceof ObjectNotFoundError) {
      throw new ValidationError('player_id', error.message)
    } else {
      throw error // re-throw unexpected errors unchanged
    }
  }

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json(player_result)
      break
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({
        id: id_number,
        firstName: `User ${id_number}`,
        lastName: 'na',
        elo: 0,
        favoriteColor: 'na',
        nickname: 'na',
        emoji: 'na',
      })
      break
    case undefined: // this case is probably not possible but let's keep linter happy
      throw new MethodNotAllowedError('', ['GET', 'PUT'])
    default:
      throw new MethodNotAllowedError(method, ['GET', 'PUT'])
  }
}

export default withAPIMiddleware(playerHandler)
