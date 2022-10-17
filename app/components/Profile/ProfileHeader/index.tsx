import { Player } from '@common/types'
import MottoCard from '@components/utility/MottoCard'

import styles from './ProfileHeader.module.scss'

const ProfileHeader = ({
  id,
  firstName,
  lastName,
  nickname,
  emoji,
}: Pick<Player, 'firstName' | 'lastName' | 'id' | 'nickname' | 'emoji'>) => {
  const name = `${firstName} "${nickname}" ${lastName}`

  return (
    <div className={styles.profileheader}>
      <div className={styles.emojiCircle}>{emoji}</div>
      <div className={styles.profileinfo}>
        <h1 className={styles['profileinfo--primary']}>{name}</h1>
        <div className={styles['profileinfo--secondary']}>
          <p>#{id}</p>
        </div>
      </div>
      <MottoCard text="Voihan juukelispuukelis" author={name} />
    </div>
  )
}

export default ProfileHeader
