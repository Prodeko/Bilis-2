import { Player } from '@common/types'
import styles from './AddGame.module.scss'

type ListProps = { players: Player[]; onChoose: (id: number) => void }

const PlayerList = ({ players, onChoose }: ListProps) => {
  return (
    <div className={styles.playerList}>
      {players.map(p => (
        <div
          key={p.id}
          onClick={() => onChoose(p.id)}
          onKeyDown={() => onChoose(p.id)}
          tabIndex={0}
          role="button"
        >
          <h1>
            {p.firstName} {p.lastName}: {p.elo}
          </h1>
        </div>
      ))}
    </div>
  )
}

export default PlayerList
