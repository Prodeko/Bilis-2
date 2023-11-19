import { PlayerModel } from '@server/models'
import { getPlayers } from '.'

import { Player } from '@common/types'

const formatForSeasonal = async (players: PlayerModel[], seasonal?: boolean): Promise<Player[]> => players.map(player => ({
  ...player.toJSON(),
  elo: seasonal ? player.seasonElo : player.elo,
}))

export const getFormattedPlayers = async (amount?: number, seasonal?: boolean): Promise<Player[]> => {
  const players = await getPlayers(amount, seasonal)

  return formatForSeasonal(players, seasonal)
}