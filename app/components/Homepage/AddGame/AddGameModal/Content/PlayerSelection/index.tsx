import { useEffect, useState } from 'react'

import { PlayerWithStats, playerWithStats } from '@common/types'
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
    const fetchAndSetPlayer = async () => {
      const res = await fetch(`api/player/${playerId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const player = await res.json()
      const parsedPlayerWithStats = playerWithStats.parse(player)
      setPlayer(parsedPlayerWithStats)
    }
    fetchAndSetPlayer()
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
