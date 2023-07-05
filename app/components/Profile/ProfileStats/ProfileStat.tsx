import { IconType } from 'react-icons'

import { ProfileStatistic } from '@common/types'
import { Card } from '@components/ui/Card'

import styles from './ProfileStats.module.scss'

type Props = ProfileStatistic & {
  Icon: IconType
}

const ProfileStat = ({ label, Icon, subStatistics }: Props) => {
  return (
    <Card>
      <div className={styles['profilestat']}>
        <h2 className={styles['profilestat--label']}>
          {label} <Icon />
        </h2>
        <div className={styles['profilestat--container']}>
          {subStatistics.map(({ label, value }) => (
            <p key={label} className={styles['profilestat--value']}>
              {label}: {value}
            </p>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ProfileStat
