import _ from 'lodash'

import { Player, PlayerStats, TimeSeriesGame } from '@common/types'

import styles from './ProfileStats.module.scss'
import FargoStatistics from './stat-cards/FargoStatistics'
import GamesStatistics from './stat-cards/TotalGamesStatistics'
import WinPercentageStatistics from './stat-cards/WinPercentageStatistics'

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
      <GamesStatistics {...playerStats} />
      <WinPercentageStatistics {...playerStats} />
    </div>
  )
}

export default ProfileStats
