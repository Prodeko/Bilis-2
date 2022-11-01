import { ProfileStatistic } from '@common/types'

import styles from './ProfileStats.module.scss'

const ProfileStat = ({ label, value }: ProfileStatistic) => {
  return (
    <div className={styles.profilestat}>
      <p className={styles['profilestat--value']}>{value}</p>
      <h2 className={styles['profilestat--label']}>{label}</h2>
    </div>
  )
}

export default ProfileStat
