"use client"

import Image from 'next/image'
import { ComponentProps } from 'react'
import {usePathname } from 'next/navigation'

import billiardPic from '@public/images/billiard–closeup.jpg'

import AddPlayerButton from '../AddPlayerButton'
import styles from './Header.module.scss'
import HeaderTitle from './HeaderTitle'

type HeaderProps = ComponentProps<'header'>

type Props = HeaderProps

const Header = ({ ...props }: Props) => {
  const pathName = usePathname()
  const isLandingPage = !pathName?.toLowerCase()?.endsWith("new")

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
        <HeaderTitle title="Player" style={{ gridColumn: '1 / 2' }} />
        {isLandingPage && (
          <AddPlayerButton
            path="/player/new"
            text="create a new player"
            style={{ gridColumn: '3 / -1' }}
          />
        )}
      </div>
    </header>
  )
}

export default Header
