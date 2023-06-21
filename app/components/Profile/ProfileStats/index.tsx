import { Player, PlayerStats } from '@common/types'

import FargoStatistics from './FargoStatistics'
import styles from './ProfileStats.module.scss'
import TotalGamesStatistics from './TotalGamesStatistics'
import WinLossStatistics from './WinLossStatistics'
import WinPercentageStatistics from './WinPercentageStatistics'

type Props = {
  player: Player
  playerStats: PlayerStats
}

const ProfileStats = ({ player, playerStats }: Props) => {
  return (
    <div className={styles.profilestats}>
      <FargoStatistics {...player} />
      <TotalGamesStatistics {...playerStats} />
      <WinLossStatistics {...playerStats} />
      <WinPercentageStatistics {...playerStats} />
    </div>
  )
}

export default ProfileStats
