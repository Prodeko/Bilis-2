import { ProfileStatistic } from '@common/types'

import ProfileStat from './ProfileStat'
import styles from './ProfileStats.module.scss'

const ProfileStats = ({ stats }: { stats: ProfileStatistic[] }) => {
  return (
    <div className={styles.profilestats}>
      {stats.map((stat: ProfileStatistic) => (
        <ProfileStat key={stat.label} {...stat} />
      ))}
    </div>
  )
}

export default ProfileStats
