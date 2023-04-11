import Image from 'next/image'
import { ReactNode } from 'react'

import billiardPic from '@public/images/billiard.jpg'

import styles from './Header.module.scss'

interface Props {
  TitleComponent: ReactNode
  RightComponent?: ReactNode
}

const Header = ({ TitleComponent, RightComponent }: Props) => {
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
        {TitleComponent}
        {RightComponent}
      </div>
    </header>
  )
}

export default Header
