import { Player } from '@common/types'
import React, { createContext, useContext, useMemo, useReducer } from 'react'

import { Action, State } from './reducer'

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
  let queue: Player[] = []
  if (typeof window !== 'undefined') {
    queue = JSON.parse(window.localStorage.getItem('prodeko-biliskilke-queue') ?? '') as Player[]
  }
  const [state, dispatch] = useReducer(reducer, { queue })
  return (
    <QueueContext.Provider value={useMemo(() => [state, dispatch], [state])}>
      {children}
    </QueueContext.Provider>
  )
}
export const useStateValue = () => useContext(QueueContext)
