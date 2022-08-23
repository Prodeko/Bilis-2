import styles from './ProfileStats.module.scss'
import ProfileStat from './ProfileStat'
import { ProfileStatistic } from '@common/types'

const ProfileStats = ({ stats }: { stats: ProfileStatistic[] }) => {
  return (
    <div className={styles.profilestats}>
      {stats.map((stat: ProfileStatistic) => (
        <ProfileStat {...stat} />
      ))}
    </div>
  )
}

export default ProfileStats
