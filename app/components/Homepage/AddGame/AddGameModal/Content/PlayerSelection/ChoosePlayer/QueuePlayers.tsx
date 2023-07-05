import { round } from 'lodash'

import { Player, SmoothScrollId } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Side, setFocus, setSelectedIdx, useModalState } from '@state/Modal'

import styles from './ChoosePlayer.module.scss'

type ListProps = {
  onChoose: (id: number) => void
  side: Side
  players: Player[]
}

const Queue = ({ onChoose, side, players }: ListProps) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  const [{ selectedIdx, focus }, dispatch] = useModalState()

  if (players.length === 0) {
    return <div className={styles.noplayers}>No players in queue</div>
  }

  const isSelected = (i: number) => i === players.length + selectedIdx && focus === side
  const onHover = (i: number) => {
    return () => {
      dispatch(setFocus(side))
      dispatch(setSelectedIdx(i - players.length))
    }
  }

  return (
    // Does not work at the moment
    <ul ref={parent} className={styles.playerList}>
      {players.map((p, i) => (
        <li
          id={isSelected(i) ? SmoothScrollId.Addgame : ''}
          className={isSelected(i) ? styles.playerRow__selected : styles.playerRow}
          key={p.id}
          onClick={() => onChoose(p.id)}
          onMouseMove={onHover(i)}
          tabIndex={0}
          role="button"
        >
          <span>
            {p.emoji} {p.firstName} {p.lastName}
          </span>
          <span>{round(p.elo)}</span>
        </li>
      ))}
    </ul>
  )
}

export default Queue
