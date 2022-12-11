import type { NewGame, PlayerWithStats } from '@common/types'
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

export interface ModalContextType {
  playerSearchLists: {
    winner: PlayerWithStats[]
    loser: PlayerWithStats[]
  }
  game: Partial<NewGame>
  setGameField: (key: keyof NewGame) => (val: any) => void
  resetPlayers: (side: 'winner' | 'loser') => void
  setPlayers: (side: 'winner' | 'loser') => (p: PlayerWithStats[]) => void
  selectedIdx: number
  setSelectedIdx?: Dispatch<SetStateAction<number>>
  refs?: {
    winner: RefObject<HTMLInputElement>
    loser: RefObject<HTMLInputElement>
    addGame?: RefObject<HTMLButtonElement>
  }
  focus: 'winner' | 'loser'
  setFocus?: Dispatch<SetStateAction<'winner' | 'loser'>>
}

export const ModalContext = createContext<ModalContextType>({
  playerSearchLists: {
    winner: [],
    loser: [],
  },
  game: { underTable: false },
  setGameField: (key: keyof NewGame) => (val: any) => null,
  resetPlayers: (side: 'winner' | 'loser') => null,
  setPlayers: (side: 'winner' | 'loser') => (p: PlayerWithStats[]) => null,
  selectedIdx: 0,
  focus: 'winner',
})

const ModalContextProvider = ({
  recentPlayers,
  children,
}: {
  recentPlayers: PlayerWithStats[]
  children: ReactNode
}) => {
  const [playerSearchLists, setPlayerSearchLists] = useState<{
    winner: PlayerWithStats[]
    loser: PlayerWithStats[]
  }>({
    winner: recentPlayers,
    loser: recentPlayers,
  })

  const [game, setGame] = useState<Partial<NewGame>>({
    underTable: false,
  })

  const refs = {
    winner: useRef<HTMLInputElement>(null),
    loser: useRef<HTMLInputElement>(null),
    addGame: useRef<HTMLButtonElement>(null),
  }

  const [focus, setFocus] = useState<'winner' | 'loser'>('winner')

  // keep the focus state and the focused input in sync
  useEffect(() => {
    refs[focus].current?.focus()
  }, [focus])

  // when winner and loser are selected, focus on add game -button
  // NOTE: timeout is needed because otherwise when pressing enter to select player, react also consideres the keystroke as pressing the button
  useEffect(() => {
    if (game.winnerId && game.loserId) {
      setTimeout(() => refs.addGame.current?.focus(), 100)
    }
  }, [game, refs])

  const setGameField = (key: keyof NewGame) => (val: any) => {
    setGame((g: Partial<NewGame>) => ({ ...g, [key]: val }))
  }

  const resetPlayers = (side: 'winner' | 'loser') => () => {
    setPlayerSearchLists(prev => ({ ...prev, [side]: recentPlayers }))
  }

  const setPlayers = (side: 'winner' | 'loser') => (p: PlayerWithStats[]) => {
    setPlayerSearchLists(prev => ({
      ...prev,
      [side]: p,
    }))
  }

  const [selectedIdx, setSelectedIdx] = useState<number>(0)

  const contextProps = {
    playerSearchLists,
    game,
    setGameField,
    resetPlayers,
    setPlayers,
    selectedIdx,
    setSelectedIdx,
    refs,
    focus,
    setFocus,
  }

  return <ModalContext.Provider value={contextProps}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
