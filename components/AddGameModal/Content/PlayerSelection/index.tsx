import axios from 'axios'
import { useEffect, useState } from 'react'

import type { PlayerWithStats } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Side } from '@state/Modal'

import ChoosePlayer from './ChoosePlayer'
import styles from './PlayerSelection.module.scss'
import SelectedPlayer from './SelectedPlayer'

interface Props {
  playerId: number | undefined
  otherPlayerId: number | undefined
  side: Side
}

const PlayerSelection = ({ playerId, otherPlayerId, side }: Props) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 500 })
  const [player, setPlayer] = useState<PlayerWithStats | null>(null)

  useEffect(() => {
    axios.get(`/api/player/${playerId}`).then(res => {
      setPlayer(res.data as PlayerWithStats)
    })
  }, [playerId])

  return (
    <div ref={parent} className={playerId ? styles.cardColumn__selected : styles.cardColumn}>
      <h2 className={side === 'winner' ? styles.title__winner : styles.title__loser}>{side}</h2>
      {playerId && player ? (
        <SelectedPlayer player={player} side={side} />
      ) : (
        <ChoosePlayer filterId={otherPlayerId} side={side} />
      )}
    </div>
  )
}

export default PlayerSelection
