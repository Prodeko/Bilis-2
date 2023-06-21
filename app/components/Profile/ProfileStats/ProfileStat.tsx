import { ProfileStatistic } from '@common/types'
import { Card } from '@components/ui/Card'

import styles from './ProfileStats.module.scss'

const ProfileStat = ({ label, value }: ProfileStatistic) => {
  return (
    <Card>
      <div className={styles['profilestat']}>
        <h2 className={styles['profilestat--label']}>{label}</h2>
        <p className={styles['profilestat--value']}>{value}</p>
      </div>
    </Card>
  )
}

export default ProfileStat
