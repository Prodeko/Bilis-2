import type { Player } from '@common/types'

export const LOCAL_QUEUE_NAME = 'prodeko-biliskilke-queue'

const setLocalQueue = (queue: Player[]) =>
  localStorage.setItem(LOCAL_QUEUE_NAME, JSON.stringify(queue))

export type State = Player[]

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_QUEUE':
      const localStorageQueue = localStorage.getItem(LOCAL_QUEUE_NAME)
      return localStorageQueue ? JSON.parse(localStorageQueue) : []
    case 'REMOVE_FROM_QUEUE':
      const filteredQueue = state.filter(({ id }) => action.payload !== id)
      setLocalQueue(filteredQueue)
      return filteredQueue
    case 'ADD_TO_QUEUE':
      if (state.some(p => p.id === action.payload.id)) {
        console.warn(`${action.payload.firstName} ${action.payload.lastName} is already in queue!`)
        return state
      }

      const newQueue = [...state, action.payload]
      setLocalQueue(newQueue)
      return newQueue
    default:
      return state
  }
}

export type Action =
  | {
      type: 'SET_QUEUE'
    }
  | {
      type: 'REMOVE_FROM_QUEUE'
      payload: Player['id']
    }
  | {
      type: 'ADD_TO_QUEUE'
      payload: Player
    }

export const setQueue = (): Action => {
  return { type: 'SET_QUEUE' }
}

export const removeFromQueue = (idToRemove: Player['id']): Action => {
  return { type: 'REMOVE_FROM_QUEUE', payload: idToRemove }
}

export const addToQueue = (player: Player): Action => {
  return { type: 'ADD_TO_QUEUE', payload: player }
}
