import type { Player } from '@common/types'
import { removeFromQueue } from '@state/reducer'
import { StateContext } from '@state/state'
import { round } from 'lodash'
import { useContext } from 'react'
import styles from './ChoosePlayer.module.scss'

type ListProps = { players: Player[]; onChoose: (id: number) => void }

const Queue = ({ onChoose }: ListProps) => {
  const [state, dispatch] = useContext(StateContext)
  const players = state.queue

  const handleChange = (id: Player['id']) => {
    dispatch(removeFromQueue(id))
    onChoose(id)
  }

  return (
    <>
      <div className={styles.queueLabel}>
        <h3>Queue</h3>
      </div>
      <div className={styles.playerList}>
        {players.map(p => (
          <div
            className={styles.playerRow}
            key={p.id}
            onClick={() => handleChange(p.id)}
            onKeyDown={() => handleChange(p.id)}
            tabIndex={0}
            role="button"
          >
            <span>
              {p.emoji} {p.firstName} {p.lastName}
            </span>
            <span>{round(p.elo)}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Queue
