import RandomPlayer from 'app/components/Homepage/RandomPlayer'
import Image from 'next/image'
import { ComponentProps } from 'react'

import billiardPic from '@public/images/billiard-balls.jpg'

import styles from '../Header.module.scss'
import HeaderTitle from '../HeaderTitle'
import { getRandomPlayer } from '@server/db/players'

type HeaderProps = ComponentProps<'header'>

type Props = HeaderProps

export const Header = async ({  ...props }: Props) => {
  const randomPlayer = await getRandomPlayer().then(player => player?.toJSON())
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
        <HeaderTitle title="Biliskilke" style={{ gridColumn: '1 / 2' }} />
        <RandomPlayer randomPlayer={randomPlayer} />
      </div>
    </header>
  )
}
