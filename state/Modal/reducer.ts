import { RefObject } from 'react'

import type { NewGame, Player } from '@common/types'

export type State = {
  playerSearchLists: {
    winner: Player[]
    loser: Player[]
  }
  game: Partial<NewGame>
  selectedIdx: number
  refs: {
    winner?: RefObject<HTMLInputElement>
    loser?: RefObject<HTMLInputElement>
    addGame?: RefObject<HTMLButtonElement>
  }
  focus: Side
  recentPlayers: Player[]
}

export type Side = 'winner' | 'loser'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PLAYER_ID':
      return {
        ...state,
        game: {
          ...state.game,
          [action.payload.key]: action.payload.id,
        },
      }
    case 'SET_UNDERTABLE':
      return {
        ...state,
        game: {
          ...state.game,
          underTable: action.payload,
        },
      }
    case 'RESET_PLAYERS':
      return {
        ...state,
        playerSearchLists: {
          ...state.playerSearchLists,
          [action.payload]: state.recentPlayers,
        },
      }
    case 'SET_PLAYERS':
      return {
        ...state,
        playerSearchLists: {
          ...state.playerSearchLists,
          [action.payload.side]: action.payload.list,
        },
      }
    case 'SET_FOCUS':
      return {
        ...state,
        focus: action.payload,
      }
    case 'SET_SELECTED_IDX':
      return {
        ...state,
        selectedIdx: action.payload,
      }
    case 'ADD_TO_SELECTED_IDX':
      return {
        ...state,
        selectedIdx: state.selectedIdx + action.payload,
      }
    default:
      return state
  }
}

export type Action =
  | {
      type: 'SET_PLAYER_ID'
      payload: {
        key: 'winnerId' | 'loserId'
        id: Player['id'] | undefined
      }
    }
  | {
      type: 'SET_UNDERTABLE'
      payload: boolean
    }
  | {
      type: 'RESET_PLAYERS'
      payload: Side
    }
  | {
      type: 'SET_PLAYERS'
      payload: {
        side: Side
        list: Player[]
      }
    }
  | {
      type: 'SET_FOCUS'
      payload: Side
    }
  | {
      type: 'SET_SELECTED_IDX'
      payload: number
    }
  | {
      type: 'ADD_TO_SELECTED_IDX'
      payload: number
    }

export const setPlayerId = (side: Side, id: Player['id'] | undefined): Action => ({
  type: 'SET_PLAYER_ID',
  payload: {
    key: `${side}Id`,
    id,
  },
})

export const setUndertable = (payload: boolean): Action => ({
  type: 'SET_UNDERTABLE',
  payload,
})

export const resetPlayers = (side: Side): Action => ({
  type: 'RESET_PLAYERS',
  payload: side,
})

export const setPlayers = (side: Side, list: Player[]): Action => ({
  type: 'SET_PLAYERS',
  payload: {
    side,
    list,
  },
})

export const setFocus = (side: Side): Action => ({
  type: 'SET_FOCUS',
  payload: side,
})

export const setSelectedIdx = (n: number): Action => ({
  type: 'SET_SELECTED_IDX',
  payload: n,
})

export const incrementSelectedIdx = (): Action => ({
  type: 'ADD_TO_SELECTED_IDX',
  payload: 1,
})

export const decrementSelectedIdx = (): Action => ({
  type: 'ADD_TO_SELECTED_IDX',
  payload: -1,
})
