import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

import type { Player } from '@common/types'
import billiardPic from '@public/images/billiard–closeup.jpg'
import Settings from '@public/images/settings-01.svg'
import MottoCard from '@ui/MottoCard'

import styles from './Header.module.scss'

type HeaderProps = ComponentProps<'header'>

interface Props extends HeaderProps {
  player: Player
}

export const ProfileHeader = ({ player, ...props }: Props) => {
  const { id, firstName, lastName, nickname, emoji, motto } = player
  const name = `${firstName} "${nickname}" ${lastName}`

  return (
    <header {...props} className={styles.profileheader}>
      <Image
        src={billiardPic}
        alt="Billiard Table"
        fill={true}
        style={{ objectFit: 'cover' }}
        priority={true}
      />
      <div className={styles.profilelayout}>
        <div style={{ gridColumn: '1 / 2' }} className={styles.emojiCircle}>
          <span>{emoji}</span>
          <Link className={styles['profileinfo--secondary']} href={`/player/${id}/edit`}>
            <Image className={styles.icon} src={Settings} alt="Edit player" />
          </Link>
        </div>
        <div style={{ gridColumn: '2 / 5' }} className={styles.profileinfo}>
          <h1 className={styles['profileinfo--primary']}>{name}</h1>
        </div>
        <MottoCard style={{ gridColumn: '5 / -1' }} text={motto} author={name} switching={false} />
      </div>
    </header>
  )
}
