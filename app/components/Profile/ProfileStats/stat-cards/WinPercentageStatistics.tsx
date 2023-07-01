import { round } from 'lodash'

import ProfileStat from '../ProfileStat'

type Props = {
  winPercentage: number
}

const WinPercentageStatistics = ({ winPercentage }: Props) => {
  return (
    <ProfileStat
      label="Win %"
      subStatistics={[{ label: 'All time', value: `${round(winPercentage, 2).toFixed(2)}%` }]}
    />
  )
}

export default WinPercentageStatistics
