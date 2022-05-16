import { Game, Player } from '../../../server/models'
import { redisConnection } from '../../../server/utils/redisConf'
import { GameListItem } from '../../types'
import redisKeys from '../../utils/redisKeys'
import { DEFAULT_LATEST_GAMES } from '../../utils/constants'

const addGameToCache = async (game: Game, winner: Player, loser: Player) => {
  await redisConnection(async client => {
    const item: GameListItem = {
      id: game.id,
      winnerElo: game.winnerElo,
      loserElo: game.loserElo,
      underTable: game.underTable,
      datetime: game.createdAt,
      winnerEloBefore: winner.elo,
      loserEloBefore: loser.elo,
      winner: winner.getPlayerWithoutElo(),
      loser: loser.getPlayerWithoutElo(),
    }
    await client.lPush(redisKeys.latestGames, JSON.stringify(item))
    await client.lTrim(redisKeys.latestGames, 0, DEFAULT_LATEST_GAMES - 1)
    await client.hSet(`${redisKeys.playerSearch}:${loser.id}`, 'updatedAt', Date.now())
    await client.hSet(`${redisKeys.playerSearch}:${winner.id}`, 'updatedAt', Date.now() + 1)
    const leaderboardElo = Number(await client.get(redisKeys.leaderboardElo))
    // If winners new elo is smaller than leaderboard elo, so is winners elo before
    // Same with losers elo: If losers old elo is smaller than leaderboard elo, so is losers new elo
    if (game.winnerElo >= leaderboardElo || loser.elo >= leaderboardElo) {
      await client.del(redisKeys.leaderboardCache)
    }
  })
}

const initGameCache = async (games: GameListItem[]) => {
  redisConnection(async client => {
    await client.del(redisKeys.latestGames)
    await client.rPush(
      redisKeys.latestGames,
      games.slice(0, DEFAULT_LATEST_GAMES).map(g => JSON.stringify(g))
    )
  })
}

const getLatestGamesFromCache = async () => {
  const redisRes = await redisConnection(async client => {
    if (await client.exists(redisKeys.latestGames)) {
      return (await client.lRange(redisKeys.latestGames, 0, DEFAULT_LATEST_GAMES - 1)).map(
        (r: string): GameListItem => JSON.parse(r)
      )
    }
    return false
  })
  return redisRes
}

export { addGameToCache, getLatestGamesFromCache, initGameCache }
