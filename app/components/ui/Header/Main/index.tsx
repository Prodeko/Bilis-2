"use client"

import RandomPlayer from 'app/components/Homepage/RandomPlayer'
import Image from 'next/image'
import { ComponentProps } from 'react'

import { Player } from '@common/types'
import billiardPic from '@public/images/billiard-balls.jpg'

import styles from '../Header.module.scss'
import HeaderTitle from '../HeaderTitle'

type HeaderProps = ComponentProps<'header'>

interface Props extends HeaderProps {
  randomPlayer: Player
}

export const Header = ({ randomPlayer, ...props }: Props) => {
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
