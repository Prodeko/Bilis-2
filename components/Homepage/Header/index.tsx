import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Player } from '@common/types'
import Filter from '@components/utility/Filter'
import MottoCard from '@components/utility/MottoCard'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import billiardPic from '@public/images/billiard.jpg'

import styles from './Header.module.scss'

interface Props {
  randomPlayer: Player
}

const Header = ({ randomPlayer }: Props) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(randomPlayer)
  const [upcomingPlayer, setUpcomingPlayer] = useState<Player | undefined>(undefined)
  const [switching, setSwitching] = useState<boolean>(false)

  const getRandomPlayer = async () => {
    const result = await axios.get(`${NEXT_PUBLIC_API_URL}/player/random`)
    return result.data as Player
  }

  useEffect(() => {
    const timer = setInterval(async () => setUpcomingPlayer(await getRandomPlayer()), 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const switchMotto = async () => {
      setSwitching(true)
      setTimeout(() => {
        setSwitching(false)
        if (upcomingPlayer) setCurrentPlayer(upcomingPlayer)
      }, 1000)
    }
    switchMotto()
  }, [upcomingPlayer])

  const author = `${currentPlayer.firstName} "${currentPlayer.nickname}" ${currentPlayer.lastName}`

  return (
    <header className={styles.header}>
      <Image src={billiardPic} alt="Billiard Table" layout="fill" objectFit="cover" />
      <Filter>
        <div className={styles.layout}>
          <h1 className={styles.title}>Biliskilke</h1>
          <div className={switching ? styles.motto__switch : styles.motto}>
            <MottoCard text={currentPlayer.motto} author={author} />
          </div>
        </div>
      </Filter>
    </header>
  )
}

export default Header
