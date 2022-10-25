import { Player } from '@common/types'
import { round } from 'lodash'
import styles from './AddGame.module.scss'

type ListProps = { players: Player[]; onChoose: (id: number) => void }

const PlayerList = ({ players, onChoose }: ListProps) => {
  return (
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
          <p>
            {p.emoji} {p.firstName} {p.lastName}
          </p>
          <p>{round(p.elo)}</p>
        </div>
      ))}
    </div>
  )
}

export default PlayerList
