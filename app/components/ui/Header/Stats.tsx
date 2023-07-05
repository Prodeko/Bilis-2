import Image from 'next/image'
import { ComponentProps } from 'react'

import statsPic from '@public/images/stats-header.jpg'

import { Navigation } from '../Navigation'
import styles from './Header.module.scss'
import HeaderTitle from './HeaderTitle'

type HeaderProps = ComponentProps<'header'>

type Props = HeaderProps

export const Header = ({ ...props }: Props) => {
  return (
    <header {...props} className={styles.statsheader}>
      <Image
        src={statsPic}
        alt="Billiard Table"
        fill={true}
        style={{ objectFit: 'cover' }}
        priority={true}
      />
      <div className={styles.statslayout}>
        <HeaderTitle title="Stats" style={{ gridColumn: '1 / 2' }} />
        <Navigation
          links={[
            {
              href: '/stats',
              linkName: 'main',
            },
            {
              href: '/stats/players',
              linkName: 'players',
            },
            {
              href: '/stats/games',
              linkName: 'games',
            },
          ]}
        />
      </div>
    </header>
  )
}
