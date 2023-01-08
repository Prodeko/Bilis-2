import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Player } from '@common/types'
import MottoCard from '@components/utility/MottoCard'
import useHydrated from '@hooks/useHydrated'
import billiardPic from '@public/images/billiard.jpg'

import styles from './Header.module.scss'

interface Props {
  randomPlayer: Player
}

const Header = ({ randomPlayer }: Props) => {
  const isHydrated = useHydrated()
  const [currentPlayer, setCurrentPlayer] = useState<Player>(randomPlayer)
  const [upcomingPlayer, setUpcomingPlayer] = useState<Player | undefined>(undefined)
  const [switching, setSwitching] = useState<boolean>(false)

  const setRandomPlayer = async () => {
    const result = await axios.get(`api/player/random`)
    const player = result.data as Player
    setUpcomingPlayer(player)
  }

  // Fetch a new random player on set interval, default every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRandomPlayer()
    }, 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  // Switch the motto while pushing the motto card into the side of the page
  useEffect(() => {
    const switchMotto = () => {
      setTimeout(() => setSwitching(false), 2000)
      setSwitching(true)
      if (upcomingPlayer) setTimeout(() => setCurrentPlayer(upcomingPlayer), 1000)
    }

    if (isHydrated) switchMotto() // Run after hydration (first render)
  }, [upcomingPlayer])

  const author = `${currentPlayer.firstName} "${currentPlayer.nickname}" ${currentPlayer.lastName}`
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
        <h1 className={styles.title}>Biliskilke</h1>
        <MottoCard text={currentPlayer.motto} author={author} switching={switching} />
      </div>
    </header>
  )
}

export default Header
