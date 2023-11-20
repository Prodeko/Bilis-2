import RandomPlayer from 'app/components/Homepage/RandomPlayer'
import Image from 'next/image'
import { ComponentProps } from 'react'

import billiardPic from '@public/images/billiard-balls.jpg'
import { getRandomPlayer } from '@server/db/players'
import { getCurrentSeason } from '@server/db/seasons'

import styles from '../Header.module.scss'
import HeaderTitle from '../HeaderTitle'

type HeaderProps = ComponentProps<'header'>

type Props = HeaderProps & {
  seasonal: boolean
}

export const Header = async ({ seasonal, ...props }: Props) => {
  const randomPlayer = await getRandomPlayer().then(player => player?.toJSON())
  const currentSeason = await getCurrentSeason()
  return (
    <header {...props} className={styles.header}>
      <Image
        src={billiardPic}
        alt="Billiard Table"
        fill={true}
        style={{ objectFit: 'cover' }}
        priority={true}
      />
      <div className={styles.layout}>
        <HeaderTitle
          currentSeason={currentSeason}
          title="Biliskilke"
          style={{ gridColumn: '1 / 2' }}
        />
        <RandomPlayer randomPlayer={randomPlayer} />
      </div>
    </header>
  )
}
