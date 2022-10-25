import type { HomeLeaderboard } from '@common/types'

export type State = {
  players: HomeLeaderboard
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PLAYERS':
      return {
        players: action.payload,
      }
    default:
      return state
  }
}

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
