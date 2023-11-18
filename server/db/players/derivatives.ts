import { getPlayers } from '.'

import { Player, elo } from '@common/types'

export const getFormattedPlayers = async (amount?: number, seasonal?: boolean): Promise<Player[]> => {
  const players = await getPlayers(amount, seasonal)

  return players.map(player => ({
    ...player.toJSON(),
    elo: seasonal ? player.seasonElo : player.elo,
  }))
}
