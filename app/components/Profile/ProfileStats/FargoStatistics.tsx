import { round } from 'lodash'

import ProfileStat from './ProfileStat'

type Props = {
  elo: number
}

const FargoStatistics = ({ elo }: Props) => {
  return (
    <ProfileStat
      label="Fargo"
      subStatistics={[{ label: 'All time', value: round(elo, 2).toFixed(2) }]}
    />
  )
}

export default FargoStatistics
