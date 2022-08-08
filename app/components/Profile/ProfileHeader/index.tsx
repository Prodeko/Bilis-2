import styles from './ProfileHeader.module.scss'

const ProfileHeader = () => {
  return (
    <div className={styles.profileheader}>
      <div className={styles.emojiCircle}>🦦</div>
      <div className={styles.profileinfo}>
        <h1 className={styles['profileinfo--primary']}>Teemu Teekkari</h1>
        <div className={styles['profileinfo--secondary']}>
          <p>Bilisking</p>
          <p>#504</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
