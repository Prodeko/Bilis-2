import { Player } from '@common/types'
import React, { createContext, useContext, useMemo, useReducer } from 'react'

import { Action, State } from './reducer'

const queue = JSON.parse(window.localStorage.getItem('prodeko-biliskilke-queue') ?? '') as Player[]
const initialState = {
  queue,
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

type StateProviderProps = {
  reducer: React.Reducer<State, Action>
  children: React.ReactElement
}

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={useMemo(() => [state, dispatch], [state])}>
      {children}
    </StateContext.Provider>
  )
}
export const useStateValue = () => useContext(StateContext)
