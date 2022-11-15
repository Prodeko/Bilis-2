import type { HomeLeaderboard, Player } from '@common/types'

export type State = {
  queue: Player[]
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_QUEUE':
      return {
        queue: action.payload,
      }
    default:
      return state
  }
}

export type Action = {
  type: 'SET_QUEUE'
  payload: Player[]
}

export const setQueue = (queue: Player[]): Action => {
  window.localStorage.setItem('prodeko-biliskilke-queue', JSON.stringify(queue))
  return { type: 'SET_QUEUE', payload: queue }
}
export const removeFromQueue = (idToRemove: Player['id'], queue: Player[]): Action =>
  setQueue(queue.filter(({ id }) => id !== idToRemove))
