import { Player } from '../../../server/models'
import { Player as ReturnPlayer, PlayerMeta } from '../../types/index'
import { redisConnection } from '../../../server/utils/redisConf'
import { DEFAULT_LEADERBOARD_SIZE } from '../../utils/constants'
import redisKeys from '../../utils/redisKeys'

const setPlayerToCache = async (player: Player) => {
  await redisConnection(async client => {
    return client.hSet(`${redisKeys.playerSearch}:${player.id}`, {
      firstName: player.firstName,
      lastName: player.lastName,
      nickname: '',
      id: player.id,
      updatedAt: Date.now(),
    })
  })
}

const setPlayerSearchIndexes = async (players: Player[]) => {
  await redisConnection(async client =>
    Promise.all(
      players.map(p => {
        const { firstName, lastName, id } = p
        const nickname = ''
        const updatedAt = Date.now()
        return client.hSet(`${redisKeys.playerSearch}:${id}`, {
          firstName,
          lastName,
          nickname,
          id,
          updatedAt,
        })
      })
    )
  )
}

const deletePlayerSearchIndexes = async () => {
  redisConnection(async client => {
    const keys = await client.keys(`${redisKeys.playerSearch}:*`)
    if (keys.length === 0) return
    return client.del(keys)
  })
}

const getCachedPlayerMetas = async (
  str: string,
  page: number,
  pageSize: number,
  metaHandler: (metas: (number | string | string[])[]) => PlayerMeta[]
) => {
  return redisConnection(async client => {
    const terms =
      str
        .split(' ')
        .map(a => (a.length === 0 ? '' : `${a}*`))
        .filter(s => s.length > 0)
        .join(' ') || '*'
    const cachedMetas = (await client.sendCommand([
      'FT.SEARCH',
      'idx:nsearch',
      terms,
      'SORTBY',
      'updatedAt',
      'DESC',
      'LIMIT',
      String(page * pageSize),
      String(pageSize),
    ])) as (number | string | string[])[]

    const metas = metaHandler(cachedMetas)
    return metas
  })
}

const getCachedTopPlayers = async () => {
  const players = await redisConnection(async client => {
    if (await client.exists(redisKeys.leaderboardCache)) {
      return (await client.lRange(redisKeys.leaderboardCache, 0, DEFAULT_LEADERBOARD_SIZE - 1)).map(
        (r: string): ReturnPlayer => JSON.parse(r)
      )
    }
    return false
  })
  return players
}

const setTopPlayers = async (players: ReturnPlayer[]) => {
  redisConnection(async client => {
    await client.del(redisKeys.leaderboardCache)
    await client.rPush(
      redisKeys.leaderboardCache,
      players.slice(0, DEFAULT_LEADERBOARD_SIZE).map(r => JSON.stringify(r))
    )
    if (players.length < DEFAULT_LEADERBOARD_SIZE) {
      await client.set(redisKeys.leaderboardElo, 0)
    } else {
      await client.set(redisKeys.leaderboardElo, players[DEFAULT_LEADERBOARD_SIZE - 1].elo)
    }
  })
}

export {
  setPlayerToCache,
  setPlayerSearchIndexes,
  deletePlayerSearchIndexes,
  getCachedPlayerMetas,
  getCachedTopPlayers,
  setTopPlayers,
}
