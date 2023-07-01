import { round } from 'lodash'

import ProfileStat from '../ProfileStat'

type Props = {
  rating: number
  peakRating: number
}

const FargoStatistics = ({ rating, peakRating }: Props) => {
  return (
    <ProfileStat
      label="Fargo"
      subStatistics={[
        { label: 'Current', value: round(rating, 2).toFixed(2) },
        { label: 'All-time best', value: round(peakRating, 2).toFixed(2) },
      ]}
    />
  )
}

export default FargoStatistics
