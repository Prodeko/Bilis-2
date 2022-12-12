import { round } from 'lodash'

import type { PlayerWithStats } from '@common/types'

import styles from './SelectedPlayer.module.scss'

const TableBody = ({ player }: { player: PlayerWithStats }) => {
  return (
    <tbody className={styles.body}>
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
