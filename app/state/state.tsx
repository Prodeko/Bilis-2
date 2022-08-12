import React, { createContext, useContext, useReducer, useMemo } from 'react'
import type { HomeLeaderboard } from '@common/types'
import { Action } from './actions'

export type State = {
  players: HomeLeaderboard
}

const initialState: State = {
  players: [],
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
