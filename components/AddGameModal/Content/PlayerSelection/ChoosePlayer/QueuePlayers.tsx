import { Player } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useStateValue } from '@state/Queue'
import { filter, round } from 'lodash'
import { useContext } from 'react'
import { ModalContext } from '../../ModalContextProvider'
import styles from './ChoosePlayer.module.scss'

type ListProps = {
  onChoose: (id: number) => void
  filterId: number | undefined
  side: 'winner' | 'loser'
  players: Player[]
}

const Queue = ({ onChoose, filterId, side, players }: ListProps) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  const { selectedIdx, focus } = useContext(ModalContext)

  if (players.length === 0) {
    return <div className={styles.noplayers}>No players in queue</div>
  }

  return (
    // Does not work at the moment
    <ul ref={parent} className={styles.playerList}>
      {players.map((p, i) => (
        <li
          className={
            focus === side && i === players.length + selectedIdx
              ? styles.playerRow__selected
              : styles.playerRow
          }
          key={p.id}
          onClick={() => onChoose(p.id)}
          onKeyDown={() => onChoose(p.id)}
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
