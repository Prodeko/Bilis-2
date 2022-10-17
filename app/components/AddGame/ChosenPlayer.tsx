import { PlayerStats, Player } from '@common/types'
import styles from './AddGame.module.scss'

type PlayerWithStats = Player & PlayerStats

type Props = { player: PlayerWithStats; onClear: () => void }

const ChosenPlayer = ({ player, onClear }: Props) => {
  return (
    <div className={styles.chosenPlayer}>
      <div className={styles.title}>
        <h3>
          {player.firstName} {player.lastName}
        </h3>
      </div>
      <button type="button" onClick={onClear}>
        clear
      </button>
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
          <h3>{player.winPercentage}%</h3>
        </div>
      </div>
    </div>
  )
}

export default ChosenPlayer
