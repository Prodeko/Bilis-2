import Image from 'next/image'
import Link from 'next/link'

import type { Player } from '@common/types'
import MottoCard from '@components/utility/MottoCard'
import Settings from '@public/images/settings-01.svg'

import styles from './ProfileHeader.module.scss'

interface Props {
  player: Player
}

const ProfileHeader = ({ player }: Props) => {
  const { id, firstName, lastName, nickname, emoji, motto } = player
  const name = `${firstName} "${nickname}" ${lastName}`

  return (
    <div className={styles.profileheader}>
      <div className={styles.emojiCircle}>{emoji}</div>
      <div className={styles.profileinfo}>
        <h1 className={styles['profileinfo--primary']}>{name}</h1>
        <Link className={styles['profileinfo--secondary']} href={`/player/${id}/edit`}>
          <Image className={styles.icon} src={Settings} alt="Edit player" /> Edit player
        </Link>
      </div>
      <MottoCard text={motto} author={name} switching={false} />
    </div>
  )
}

export default ProfileHeader
