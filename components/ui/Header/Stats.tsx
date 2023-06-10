import Image from 'next/image'
import { ReactNode } from 'react'

import billiardPic from '@public/images/billiard.jpg'

import styles from './Header.module.scss'

interface Props {
  TitleComponent: ReactNode
  RightComponent: ReactNode
  leftColumnSpan: number
  rightColumnSpan: number
}

export const Header = ({
  TitleComponent,
  RightComponent,
  leftColumnSpan,
  rightColumnSpan,
}: Props) => {
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
        <div
          style={{
            gridColumn: `1 / ${leftColumnSpan + 1}`,
          }}
        >
          {TitleComponent}
        </div>
        <div
          style={{
            gridColumn: `${-1 - rightColumnSpan} / -1`,
          }}
        >
          {RightComponent}
        </div>
      </div>
    </header>
  )
}
