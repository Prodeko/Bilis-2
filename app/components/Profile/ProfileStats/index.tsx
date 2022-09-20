import { ProfileStatistic } from '@common/types'
import styles from './ProfileStats.module.scss'
import ProfileStat from './ProfileStat'

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
