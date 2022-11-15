import type { Player } from '@common/types'

const setLocalQueue = (queue: Player[]) =>
  localStorage.setItem('prodeko-biliskilke-queue', JSON.stringify(queue))

export type State = {
  queue: Player[]
}

export const reducer = (state: State, action: Action): State => {
  let newQueue: Player[] = []
  switch (action.type) {
    case 'SET_QUEUE':
      setLocalQueue(action.payload)
      return {
        queue: action.payload,
      }
    case 'REMOVE_FROM_QUEUE':
      newQueue = state.queue.filter(({ id }) => action.payload !== id)
      setLocalQueue(newQueue)
      return {
        queue: newQueue,
      }
    case 'ADD_TO_QUEUE':
      newQueue = [...state.queue, action.payload]
      setLocalQueue(newQueue)
      return {
        queue: newQueue,
      }
    default:
      return state
  }
}

export type Action =
  | {
      type: 'SET_QUEUE'
      payload: Player[]
    }
  | {
      type: 'REMOVE_FROM_QUEUE'
      payload: Player['id']
    }
  | {
      type: 'ADD_TO_QUEUE'
      payload: Player
    }

export const setQueue = (queue: Player[]): Action => {
  return { type: 'SET_QUEUE', payload: queue }
}

export const removeFromQueue = (idToRemove: Player['id']): Action => {
  return { type: 'REMOVE_FROM_QUEUE', payload: idToRemove }
}

export const addToQueue = (player: Player): Action => {
  return { type: 'ADD_TO_QUEUE', payload: player }
}
