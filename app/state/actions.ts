import type { HomeLeaderboard } from '@common/types'

export type Action = {
  type: 'SET_PLAYERS'
  payload: HomeLeaderboard
}
// | {
//     type: 'REMOVE_PLAYERS'
//     payload: []
//   }

export const setPlayers = (players: HomeLeaderboard): Action => {
  return { type: 'SET_PLAYERS', payload: players }
}
