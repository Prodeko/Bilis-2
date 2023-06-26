import _ from 'lodash'

import { Player, PlayerStats, TimeSeriesGame } from '@common/types'

import FargoStatistics from './FargoStatistics'
import styles from './ProfileStats.module.scss'
import TotalGamesStatistics from './TotalGamesStatistics'
import WinLossStatistics from './WinLossStatistics'
import WinPercentageStatistics from './WinPercentageStatistics'

type Props = {
  player: Player
  playerStats: PlayerStats
  gameData: TimeSeriesGame[]
}

const ProfileStats = ({ player, playerStats, gameData }: Props) => {
  const { elo } = player
  const maxElo = _.max(gameData.map(g => g.currentElo)) ?? elo

  return (
    <div className={styles.profilestats}>
      <FargoStatistics rating={elo} peakRating={maxElo} />
      <TotalGamesStatistics {...playerStats} />
      <WinLossStatistics {...playerStats} />
      <WinPercentageStatistics {...playerStats} />
    </div>
  )
}

export default ProfileStats
