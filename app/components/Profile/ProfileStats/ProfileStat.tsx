import styles from './ProfileStats.module.scss'

interface Props {
  label: string
  value: string
}

const ProfileStat = ({ label, value }: Props) => {
  return (
    <div className={styles.profilestat}>
      <p className={styles['profilestat--value']}>{value}</p>
      <h2 className={styles['profilestat--label']}>{label}</h2>
    </div>
  )
}

export default ProfileStat
