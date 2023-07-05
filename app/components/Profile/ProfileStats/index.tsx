import { max, round } from 'lodash'
import { FiPercent, FiPlay, FiTrendingUp } from 'react-icons/fi'

import { Player, PlayerStats, TimeSeriesGame } from '@common/types'

import ProfileStat from './ProfileStat'
import styles from './ProfileStats.module.scss'

type Props = {
  player: Player
  playerStats: PlayerStats
  gameData: TimeSeriesGame[]
}

const ProfileStats = ({ player, playerStats, gameData }: Props) => {
  const { elo } = player
  const maxElo = max(gameData.map(g => g.currentElo)) ?? elo
  const winsValue = `${playerStats.wonGames.toString()} (${round(
    playerStats.winPercentage,
    2
  ).toFixed(2)}%)`

  return (
    <div className={styles.profilestats}>
      <ProfileStat
        label="Fargo"
        Icon={FiTrendingUp}
        subStatistics={[
          { label: 'Current', value: round(elo, 2).toFixed(2) },
          { label: 'All-time best', value: round(maxElo, 2).toFixed(2) },
        ]}
      />
      <ProfileStat
        label="Games"
        Icon={FiPlay}
        subStatistics={[
          { label: 'Total', value: playerStats.totalGames.toString() },
          { label: 'Wins', value: winsValue },
          { label: 'Longest winning streak', value: playerStats.longestWinStreak.toString() },
        ]}
      />
      <ProfileStat
        Icon={FiPercent}
        label="Win %"
        subStatistics={[
          { label: 'All time', value: `${round(playerStats.winPercentage, 2).toFixed(2)}%` },
        ]}
      />
    </div>
  )
}

export default ProfileStats
