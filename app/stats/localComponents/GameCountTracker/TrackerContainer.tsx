import { getGamesFromTimeframe } from '@server/db/players/gameTracker'

import styles from './GameCountTracker.module.scss'
import { TrackerStat } from './TrackerStat'

export const TrackerContainer = async () => {
  const stats = [
    {
      number: await getGamesFromTimeframe('day'),
      timeFrame: 'Today',
    },
    {
      number: await getGamesFromTimeframe('week'),
      timeFrame: 'This week',
    },
    {
      number: await getGamesFromTimeframe('month'),
      timeFrame: 'This month',
    },
    {
      number: await getGamesFromTimeframe('year'),
      timeFrame: 'This year',
    },
  ]
  return (
    <div className={styles.trackerContainer}>
      {stats.map(stat => {
        return <TrackerStat key={stat.timeFrame} number={stat.number} timeFrame={stat.timeFrame} />
      })}
    </div>
  )
}
