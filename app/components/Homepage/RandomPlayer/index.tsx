'use client'

import MottoCard from '@ui/MottoCard'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { Player } from '@common/types'

interface Props {
  randomPlayer: Player
}

const RandomPlayer = ({ randomPlayer }: Props) => {
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

    if (upcomingPlayer) switchMotto() // Run after hydration (first render)
  }, [upcomingPlayer])

  const author = `${currentPlayer?.firstName} "${currentPlayer?.nickname}" ${currentPlayer?.lastName}`

  return (
    <MottoCard
      style={{ gridColumn: '2 / -1' }}
      text={currentPlayer?.motto}
      author={author}
      switching={switching}
    />
  )
}

export default RandomPlayer
