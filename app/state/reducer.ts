import { State } from './state'
import { Action } from './actions'

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
