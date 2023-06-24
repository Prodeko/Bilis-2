import styles from './GameCountTracker.module.scss'
import { TrackerStat } from './TrackerStat'

export const TrackerContainer = () => {
  const stats = [
    {
      number: 15,
      timeFrame: 'Today',
    },
    {
      number: 150,
      timeFrame: 'This week',
    },
    {
      number: 1500,
      timeFrame: 'This month',
    },
    {
      number: 15000,
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
