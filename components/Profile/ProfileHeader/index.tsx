import { useRouter } from 'next/router'
import { BsFillGearFill } from 'react-icons/bs'

import { Player } from '@common/types'
import MottoCard from '@components/utility/MottoCard'

import styles from './ProfileHeader.module.scss'

const ProfileHeader = ({
  id,
  firstName,
  lastName,
  nickname,
  emoji,
  motto,
}: Pick<Player, 'firstName' | 'lastName' | 'id' | 'nickname' | 'emoji' | 'motto'>) => {
  const name = `${firstName} "${nickname}" ${lastName}`

  const router = useRouter()

  const editClicked = () => {
    router.push(`/player/${id}/edit`)
  }

  return (
    <div className={styles.profileheader}>
      <div className={styles.emojiCircle}>{emoji}</div>
      <div className={styles.profileinfo}>
        <h1 className={styles['profileinfo--primary']}>{name}</h1>
        <div className={styles['profileinfo--secondary']}>
          <button type="button" onClick={editClicked}>
            <BsFillGearFill className={styles.icon} />
            Update player
          </button>
        </div>
      </div>
      <MottoCard text={motto} author={name} />
    </div>
  )
}

export default ProfileHeader
