import Image from 'next/image'

import { Player } from '@common/types'
import RandomPlayer from '@components/Homepage/RandomPlayer'
import billiardPic from '@public/images/billiard-balls.jpg'

import styles from './Header.module.scss'
import HeaderTitle from './HeaderTitle'

interface Props {
  randomPlayer: Player
}

const Header = ({ randomPlayer }: Props) => {
  return (
    <header className={styles.header}>
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

export default Header
