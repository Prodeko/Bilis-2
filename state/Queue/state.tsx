import React, { createContext, useContext, useMemo, useReducer } from 'react'

import { Action, State, LOCAL_QUEUE_NAME } from './reducer'

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
  const localStorageQueue =
    typeof window !== 'undefined' ? localStorage.getItem(LOCAL_QUEUE_NAME) : undefined
  const queue = localStorageQueue ? JSON.parse(localStorageQueue) : []
  const [state, dispatch] = useReducer(reducer, { queue })
  return (
    <QueueContext.Provider value={useMemo(() => [state, dispatch], [state])}>
      {children}
    </QueueContext.Provider>
  )
}
export const useStateValue = () => useContext(QueueContext)
