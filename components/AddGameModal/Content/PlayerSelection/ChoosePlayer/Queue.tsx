import { useStateValue } from '@state/Queue'
import { round } from 'lodash'
import styles from './ChoosePlayer.module.scss'

type ListProps = { onChoose: (id: number) => void }

const Queue = ({ onChoose }: ListProps) => {
  const [state, _dispatch] = useStateValue()
  const players = state.queue
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
            onClick={() => onChoose(p.id)}
            onKeyDown={() => onChoose(p.id)}
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
