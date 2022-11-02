import type { Player } from '@common/types'
import { round } from 'lodash'
import styles from './ChoosePlayer.module.scss'

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
          <span>
            {p.emoji} {p.firstName} {p.lastName}
          </span>
          <span>{round(p.elo)}</span>
        </div>
      ))}
    </div>
  )
}

export default PlayerList
