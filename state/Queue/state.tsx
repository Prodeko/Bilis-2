import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'

import { Player } from '@common/types'

import { Action, LOCAL_QUEUE_NAME, State } from './reducer'

const initialState = {
  queue: [],
}

export const QueueContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

type QueueProviderProps = {
  reducer: React.Reducer<State, Action>
  children: React.ReactElement
}

export const QueueProvider = ({ reducer, children }: QueueProviderProps) => {
  const [queue, setQueue] = useState<Player[]>([])
  useEffect(() => {
    const localStorageQueue = localStorage.getItem(LOCAL_QUEUE_NAME)
    const parsedQueue: Player[] = localStorageQueue ? JSON.parse(localStorageQueue) : []
    setQueue(parsedQueue)
  }, [])
  const [state, dispatch] = useReducer(reducer, { queue })

  return (
    <QueueContext.Provider value={useMemo(() => [state, dispatch], [state])}>
      {children}
    </QueueContext.Provider>
  )
}
export const useQueueState = () => useContext(QueueContext)
