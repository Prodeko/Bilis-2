import { ProfileStatistic } from '@common/types'
import { Card } from '@components/ui/Card'

import styles from './ProfileStats.module.scss'

const ProfileStat = ({ label, subStatistics }: ProfileStatistic) => {
  return (
    <Card>
      <div className={styles['profilestat']}>
        <h2 className={styles['profilestat--label']}>{label}</h2>
        {subStatistics.map(({ label, value }) => (
          <p key={label} className={styles['profilestat--value']}>
            {label}: {value}
          </p>
        ))}
      </div>
    </Card>
  )
}

export default ProfileStat
