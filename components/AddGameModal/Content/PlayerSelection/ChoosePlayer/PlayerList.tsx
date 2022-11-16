import type { Player } from '@common/types'
import { round } from 'lodash'
import styles from './ChoosePlayer.module.scss'

type ListProps = {
  playerSearchList: Player[]
  onChoose: (id: number) => void
}

const PlayerList = ({ playerSearchList, onChoose }: ListProps) => {
  if (playerSearchList.length === 0) {
    return <div className={styles.noplayers}>No players found</div>
  }
  return (
    <div className={styles.playerList}>
      {playerSearchList.map(p => (
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
