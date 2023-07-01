import { round } from 'lodash'
import { FiPlay } from 'react-icons/fi'

import ProfileStat from '../ProfileStat'

type Props = {
  totalGames: number
  wonGames: number
  longestWinStreak: number
  winPercentage: number
}

const GamesStatistics = ({ totalGames, wonGames, longestWinStreak, winPercentage }: Props) => {
  const winsValue = `${wonGames.toString()} (${round(winPercentage, 2).toFixed(2)}%)`
  return (
    <ProfileStat
      label="Games"
      Icon={FiPlay}
      subStatistics={[
        { label: 'Total', value: totalGames.toString() },
        { label: 'Wins', value: winsValue },
        { label: 'Longest winning streak', value: longestWinStreak.toString() },
      ]}
    />
  )
}

export default GamesStatistics
