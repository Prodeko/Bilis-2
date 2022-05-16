import type { NextApiRequest, NextApiResponse } from 'next'
import { playerAPI } from '../../../common/db/players'
import { getMutualGames } from '../../../common/db/services/gameService'
import withAPIMiddleware from '../../../common/middleware'
import { validateMutualPlayersQuery } from '../../../common/validators'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const [id1, id2] = validateMutualPlayersQuery(req.query)
  const [games, player1, player2] = await Promise.all([
    await getMutualGames(id1, id2),
    await playerAPI.getById(id1),
    await playerAPI.getById(id2),
  ])
  const { rows, count } = games
  const wins1 = rows.reduce((acc, game) => +(game.winnerId === id1) + acc, 0)
  const wins2 = count - wins1
  res.json({
    player1: {
      mutualGamesWon: wins1,
      name: `${player1.firstName} ${player1.lastName}`,
    },
    player2: {
      mutualGamesWon: wins2,
      name: `${player2.firstName} ${player2.lastName}`,
    },
  })
}

export default withAPIMiddleware(handler)
