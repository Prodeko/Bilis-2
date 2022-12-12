import { useAutoAnimate } from '@formkit/auto-animate/react'
import ChoosePlayer from './ChoosePlayer'
import styles from './PlayerSelection.module.scss'
import SelectedPlayer from './SelectedPlayer'

interface Props {
  playerId: number | undefined
  otherPlayerId: number | undefined
  side: 'winner' | 'loser'
}

const PlayerSelection = ({ playerId, otherPlayerId, side }: Props) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 500 })
  return (
    <div ref={parent} className={playerId ? styles.cardColumn__selected : styles.cardColumn}>
      {playerId ? (
        <SelectedPlayer playerId={playerId} side={side} />
      ) : (
        <ChoosePlayer filterId={otherPlayerId} side={side} />
      )}
    </div>
  )
}

export default PlayerSelection
