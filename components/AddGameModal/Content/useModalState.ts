import { useState } from 'react'
import type { NewGame, PlayerWithStats } from '@common/types'

const useModalState = (players: PlayerWithStats[]) => {
  const [playerLists, setPlayerLists] = useState<{
    winner: PlayerWithStats[]
    loser: PlayerWithStats[]
  }>({
    winner: players,
    loser: players,
  })

  const [game, setGame] = useState<Partial<NewGame>>({
    underTable: false,
  })

  const setGameField = (key: keyof NewGame) => (val: any) => {
    setGame({ ...game, [key]: val })
  }

  const resetPlayers = (side: 'winner' | 'loser') => () => {
    setPlayerLists(prev => ({ ...prev, [side]: players }))
  }

  const setPlayers = (side: 'winner' | 'loser') => (p: PlayerWithStats[]) => {
    setPlayerLists(prev => ({
      ...prev,
      [side]: p,
    }))
  }

  return {
    playerLists,
    game,
    setGameField,
    resetPlayers,
    setPlayers,
  }
}

export default useModalState
