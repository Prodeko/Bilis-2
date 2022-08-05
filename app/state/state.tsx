import React, { createContext, useContext, useReducer, useMemo } from 'react'
import { Action } from './actions'

export type State = {
  sidebar: 'normal' | 'partial' | 'full'
}

const initialState: State = {
  sidebar: 'normal',
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

export const reducer = (state: State, action: Action): State => {
  return {
    sidebar: action.payload,
  }
}

type StateProviderProps = {
  _reducer: React.Reducer<State, Action>
  children: React.ReactElement
}

export const StateProvider = ({ _reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(_reducer, initialState)
  return (
    <StateContext.Provider value={useMemo(() => [state, dispatch], [state])}>
      {children}
    </StateContext.Provider>
  )
}
export const useStateValue = () => useContext(StateContext)
