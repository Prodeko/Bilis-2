import { Player } from '@common/types'
import styles from './ProfileHeader.module.scss'

const ProfileHeader = ({
  id,
  firstName,
  lastName,
  nickname,
  emoji,
}: Pick<Player, 'firstName' | 'lastName' | 'id' | 'nickname' | 'emoji'>) => {
  return (
    <div className={styles.profileheader}>
      <div className={styles.emojiCircle}>{emoji}</div>
      <div className={styles.profileinfo}>
        <h1 className={styles['profileinfo--primary']}>
          {firstName} {lastName}
        </h1>
        <div className={styles['profileinfo--secondary']}>
          <p>{nickname}</p>
          <p>#{id}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
