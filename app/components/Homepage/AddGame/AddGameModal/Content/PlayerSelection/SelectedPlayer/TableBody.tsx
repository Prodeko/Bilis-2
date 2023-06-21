import { round } from 'lodash'

import type { PlayerWithStats } from '@common/types'

import styles from './SelectedPlayer.module.scss'

const TableBody = ({ player }: { player: PlayerWithStats }) => {
  return (
    <div className={styles.body}>
      <div className={styles.row}>
        <span>Games</span>
        <span>{player.totalGames}</span>
      </div>
      <div className={styles.row}>
        <span>Wins</span>
        <span>{player.wonGames}</span>
      </div>
      <div className={styles.row}>
        <span>Win percentage</span>
        <span>{round(player.winPercentage, 2)}%</span>
      </div>
    </div>
  )
}

export default TableBody
