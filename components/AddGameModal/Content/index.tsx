import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'

import type { RecentGame } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useModalState } from '@state/Modal'
import { removeFromQueue, useQueueState } from '@state/Queue'

import styles from './Content.module.scss'
import GameCreation from './GameCreation'
import PlayerSelection from './PlayerSelection'
import Title from './Title'

type Props = {
  onClose: () => void
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const Content = ({ onClose, setGames }: Props) => {
  const [{ game }] = useModalState()
  const [, dispatch] = useQueueState()

  // TODO validate that all fields are present
  const onSubmit = async () => {
    if (game.winnerId == game.loserId) {
      console.warn('Winner and loser cannot be same')
      // TODO show error msg
      return
    }

    const res = await axios.post(`/api/game`, game)
    dispatch(removeFromQueue(game.winnerId ?? 0))
    dispatch(removeFromQueue(game.loserId ?? 0))
    setGames(prev => [res.data, ...prev])
    console.log(res.data)
    onClose()
    document?.getElementById('home-layout')?.focus() // focus on the root element so pressing enter adds a new game
    // TODO show success msg
  }

  return (
    <div className={styles.cardWrapper}>
      <Title title="New Game" />
      <div className={styles.card}>
        <PlayerSelection playerId={game.winnerId} otherPlayerId={game.loserId} side={'winner'} />
        <GameCreation onSubmit={onSubmit} />
        <PlayerSelection playerId={game.loserId} otherPlayerId={game.winnerId} side={'loser'} />
      </div>
    </div>
  )
}

export default Content
