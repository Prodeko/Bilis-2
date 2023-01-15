import React, { createContext, useContext, useReducer } from 'react'

import { Player } from '@common/types'

import { Action, State } from './reducer'

const initialState: Player[] = []

const QueueContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

type QueueProviderProps = {
  reducer: React.Reducer<State, Action>
  children: React.ReactElement
}

/**
 * Provides queue to the children of this provider.
 *
 * @remarks Queue is saved to the local storage but the homepage where the queueprovider is used is server-rendered. This means that we can't fetch the initial state on the server and instead we pass an empty array as initial state. We will then fetch the queue from localstorage in the first children of queueprovider in a useEffect call.
 *
 * @param object - Object of Queue-reducer and react childeren
 * @returns Global state provider for queue
 */
export const QueueProvider = ({ reducer, children }: QueueProviderProps) => {
  const [state, dispatch] = useReducer(reducer, [])
  return <QueueContext.Provider value={[state, dispatch]}>{children}</QueueContext.Provider>
}
export const useQueueState = () => useContext(QueueContext)
