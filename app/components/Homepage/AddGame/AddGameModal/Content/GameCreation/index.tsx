import { Dispatch, SetStateAction } from 'react'

import { RecentGame } from '@common/types'
import { setUndertable, useModalState } from '@state/Modal'
import { removeFromQueue, useQueueState } from '@state/Queue'

import styles from './GameCreation.module.scss'
import SubmitButton from './SubmitButton'
import UnderTableInput from './UnderTableInput'

interface Props {
  setGames: Dispatch<SetStateAction<RecentGame[]>>
  onClose: () => void
}

const GameCreation = ({ setGames, onClose }: Props) => {
  const [{ game }, dispatchModal] = useModalState()
  const [_, dispatchQueue] = useQueueState()

  const isActive = Boolean(game.winnerId && game.loserId)
  const onSubmit = async () => {
    if (game.winnerId == game.loserId) {
      console.warn('Winner and loser cannot be same')
      return
    }

    const res = await fetch(`/api/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(game)
    })
    const data = await res.json()
    if (game.winnerId) dispatchQueue(removeFromQueue(game.winnerId))
    if (game.loserId) dispatchQueue(removeFromQueue(game.loserId))
    setGames((prev: RecentGame[]) => [data as RecentGame, ...prev])
    onClose()
    document?.getElementById('home-layout')?.focus() // focus on the root element so pressing enter adds a new game
  }
  return (
    <div className={styles.buttonWrapper}>
      <SubmitButton isActive={isActive} onSubmit={onSubmit} />
      <UnderTableInput onChange={c => dispatchModal(setUndertable(c))} />
    </div>
  )
}

export default GameCreation
