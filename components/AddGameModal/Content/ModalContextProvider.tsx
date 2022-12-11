import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import type { NewGame, PlayerWithStats } from '@common/types'
import { createContext } from 'react'

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
  }

  return <ModalContext.Provider value={contextProps}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
