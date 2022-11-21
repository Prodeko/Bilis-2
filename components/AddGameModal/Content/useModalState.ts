import { useState } from 'react'
import type { NewGame, PlayerWithStats } from '@common/types'

const useModalState = (recentPlayers: PlayerWithStats[]) => {
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

  return {
    playerSearchLists,
    game,
    setGameField,
    resetPlayers,
    setPlayers,
  }
}

export default useModalState
