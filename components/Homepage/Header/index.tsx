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
  const [player, setPlayer] = useState<Player>(randomPlayer)

  const getRandomPlayer = async () => {
    const result = await axios.get(`${NEXT_PUBLIC_API_URL}/player/random`)
    return result.data as Player
  }

  useEffect(() => {
    const timer = setInterval(async () => setPlayer(await getRandomPlayer()), 60 * 1000)
    return () => clearInterval(timer)
  })

  return (
    <header className={styles.header}>
      {/* BUG This image kills the container at the moment */}
      {/* <Image src={billiardPic} alt="Billiard Table" layout="fill" objectFit="cover" /> */}
      <Filter>
        <div className={styles.layout}>
          <h1 className={styles.title}>Biliskilke</h1>
          <MottoCard
            text={player.motto}
            author={`${player.firstName} "${player.nickname}" ${player.lastName}`}
          />
        </div>
      </Filter>
    </header>
  )
}

export default Header
