import styles from './ProfileStats.module.scss'
import ProfileStat from './ProfileStat'
import { stat } from 'fs'

const stats = [
  { value: '400', label: 'Elo' },
  { value: '287', label: 'Won games' },
  { value: '389', label: 'Total games' },
  { value: '74%', label: 'Win rate' },
]

const ProfileStats = () => {
  return (
    <div className={styles.profilestats}>
      {stats.map(stat => (
        <ProfileStat {...stat} />
      ))}
    </div>
  )
}

export default ProfileStats
