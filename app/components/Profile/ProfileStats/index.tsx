import { max, round } from 'lodash'
import { ComponentProps } from 'react'
import { FiCalendar, FiFolder, FiPlay, FiTrendingUp } from 'react-icons/fi'

import { formatIsoStringToDate } from '@common/utils/helperFunctions'
import { getPlayerDetailedGames, getPlayerStats } from '@server/db/games/derivatives'
import { getPlayerById } from '@server/db/players'
import { PlayerModel } from '@server/models'

import ProfileStat from './ProfileStat'
import styles from './ProfileStats.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  playerId: number
}

const ProfileStats = async ({ playerId, ...props }: Props) => {
  const [player, playerStats, gameData] = await Promise.all([
    getPlayerById(playerId).then(player => player?.toJSON()) as Promise<PlayerModel>,
    getPlayerStats(playerId),
    getPlayerDetailedGames(playerId),
  ])
  const { elo } = player
  const maxElo = max(gameData.map(g => g.currentElo)) ?? elo
  const winsValue = `${playerStats.wonGames.toString()} (${round(
    playerStats.winPercentage,
    2
  ).toFixed(2)}%)`

  return (
    <div {...props} className={styles.profilestats}>
      <ProfileStat
        label="Fargo"
        Icon={FiTrendingUp}
        subStatistics={[
          { label: 'Current', value: round(elo, 2).toFixed(2) },
          { label: 'All-time best', value: round(maxElo, 2).toFixed(2) },
          { label: 'Seasonal best', value: 'TBD' },
        ]}
      />
      <ProfileStat
        label="Games"
        Icon={FiPlay}
        subStatistics={[
          { label: 'Total', value: playerStats.totalGames.toString() },
          { label: 'Wins', value: winsValue },
          { label: 'Longest win streak', value: playerStats.longestWinStreak.toString() },
        ]}
      />
      <ProfileStat
        Icon={FiFolder}
        label="History"
        subStatistics={[
          { label: 'ID', value: playerId.toString() },
          { label: 'Created', value: formatIsoStringToDate(player.createdAt) },
          { label: 'Updated', value: formatIsoStringToDate(player.updatedAt) },
        ]}
      />
      <ProfileStat
        Icon={FiCalendar}
        label="Seasonal"
        subStatistics={[{ label: 'Coming Soon', value: `TBD` }]}
      />
    </div>
  )
}

export default ProfileStats
