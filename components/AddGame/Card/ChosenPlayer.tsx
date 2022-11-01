import type { PlayerStats, Player } from '@common/types'
import { round } from 'lodash'
import styles from './Card.module.scss'

type PlayerWithStats = Player & PlayerStats

type Props = { player: PlayerWithStats; onClear: () => void }

const ChosenPlayer = ({ player, onClear }: Props) => {
  return (
    <div className={styles.chosenPlayer}>
      <div className={styles.title}>
        <h3>
          {player.firstName} {player.lastName}
        </h3>
        <button onClick={onClear} type="button">
          <img src="/images/edit-pencil.svg" alt="edit pencil" />
        </button>
      </div>
      <div className={styles.table}>
        <div>
          <h3>Games</h3>
          <h3>{player.totalGames}</h3>
        </div>
        <div>
          <h3>Wins</h3>
          <h3>{player.wonGames}</h3>
        </div>
        <div>
          <h3>Win percentage</h3>
          <h3>{round(player.winPercentage, 2)}%</h3>
        </div>
      </div>
    </div>
  )
}

export default ChosenPlayer
