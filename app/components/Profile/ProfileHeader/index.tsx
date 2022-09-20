import { Player } from '@common/types'
import styles from './ProfileHeader.module.scss'
import QuoteCard from './QuoteCard'

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
      <QuoteCard text="Voihan juukelispuukelis" author={name} />
    </div>
  )
}

export default ProfileHeader
