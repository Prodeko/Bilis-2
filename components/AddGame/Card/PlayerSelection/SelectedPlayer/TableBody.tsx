import type { PlayerStats, Player } from '@common/types'
import styles from './SelectedPlayer.module.scss'
import { round } from 'lodash'

type PlayerWithStats = Player & PlayerStats
type Props = {
  player: PlayerWithStats
}

const TableBody = ({ player }: Props) => {
  return (
    <tbody className={styles.table}>
      <tr>
        <td>Games</td>
        <td>{player.totalGames}</td>
      </tr>
      <tr>
        <td>Wins</td>
        <td>{player.wonGames}</td>
      </tr>
      <tr>
        <td>Win percentage</td>
        <td>{round(player.winPercentage, 2)}%</td>
      </tr>
    </tbody>
  )
}

export default TableBody
