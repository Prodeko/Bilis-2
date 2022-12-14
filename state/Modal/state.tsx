import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'

import { PlayerWithStats } from '@common/types'

import { Action, State } from './reducer'

const initialState: State = {
  playerSearchLists: {
    winner: [],
    loser: [],
  },
  game: {},
  selectedIdx: 0,
  refs: {},
  focus: 'winner',
  recentPlayers: [],
}

export const ModalContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

type ModalProviderProps = {
  recentPlayers: PlayerWithStats[]
  reducer: React.Reducer<State, Action>
  children: React.ReactElement
}

export const ModalProvider = ({ recentPlayers, reducer, children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    refs: {
      winner: useRef<HTMLInputElement>(null),
      loser: useRef<HTMLInputElement>(null),
      addGame: useRef<HTMLButtonElement>(null),
    },
    recentPlayers,
  })

  // keep the focus state and the focused input in sync
  useEffect(() => {
    state?.refs?.[state.focus]?.current?.focus()
  }, [state.focus, state?.refs])

  // when winner and loser are selected, focus on add game -button
  // NOTE: timeout is needed because otherwise when pressing enter to select player, react also consideres the keystroke as pressing the button
  useEffect(() => {
    if (state.game.winnerId && state.game.loserId) {
      setTimeout(() => state?.refs?.addGame?.current?.focus(), 100)
    }
  }, [state])

  // Keep selected item scrolled in view
  useEffect(() => {
    document.getElementById('add-game-list')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  })

  return (
    <ModalContext.Provider value={useMemo(() => [state, dispatch], [state])}>
      {children}
    </ModalContext.Provider>
  )
}
export const useModalState = () => useContext(ModalContext)
