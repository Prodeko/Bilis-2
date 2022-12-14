import { PlayerWithStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Side } from '@state/Modal'
import axios from 'axios'
import { useState, useEffect } from 'react'
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
  const [player, setPlayer] = useState<PlayerWithStats | undefined>(undefined)

  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_API_URL}/player/${playerId}`).then(res => {
      if (typeof res.data == 'object') setPlayer(res.data as PlayerWithStats)
    })
  }, [playerId])

  if (!player) return null

  return (
    <div ref={parent} className={playerId ? styles.cardColumn__selected : styles.cardColumn}>
      {playerId ? (
        <SelectedPlayer player={player} side={side} />
      ) : (
        <ChoosePlayer filterId={otherPlayerId} side={side} />
      )}
    </div>
  )
}

export default PlayerSelection
