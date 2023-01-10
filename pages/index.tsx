import axios from 'axios'
import type { NextPage } from 'next'
import { KeyboardEventHandler, useState } from 'react'

import type { Player, PlayerWithStats, RecentGame } from '@common/types'
import AddGameButton from '@components/Homepage/AddGame'
import Games from '@components/Homepage/Games'
import Header from '@components/Homepage/Header'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'
import HomeGrid from '@components/Layout/HomeLayout/HomeGrid'
import HomeLayout from '@components/Layout/HomeLayout/HomeLayout'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { QueueProvider, reducer } from '@state/Queue'

interface Props {
  leaderboard: Player[]
  recentPlayers: PlayerWithStats[]
  randomPlayer: Player
  m: Player | undefined
}

const Home: NextPage<Props> = ({ leaderboard, recentPlayers, randomPlayer }: Props) => {
  const [games, setGames] = useState<RecentGame[]>([])
  const [gameModalOpen, setGameModalOpen] = useState(false)
  const closeModal = () => setGameModalOpen(false)
  const openModal = () => setGameModalOpen(true)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.code) {
      case 'Space':
        openModal()
        break

      case 'Escape':
        closeModal()
        document?.getElementById('home-layout')?.focus() // focus on the root element so pressing enter adds a new game
        break

      case 'KeyQ':
        // focus on queue.
        setTimeout(() => document?.getElementById('queue')?.focus(), 1)
        break
    }
  }

  return (
    <HomeLayout onKeyDown={handleKeyDown}>
      <Header randomPlayer={randomPlayer} />
      <QueueProvider reducer={reducer}>
        <HomeGrid>
          <Leaderboard leaderboard={leaderboard} />
          <Queue />
          <AddGameButton
            onClose={closeModal}
            onOpen={openModal}
            open={gameModalOpen}
            setGames={setGames}
            recentPlayers={recentPlayers}
          />
          <Games games={games} setGames={setGames} />
        </HomeGrid>
      </QueueProvider>
    </HomeLayout>
  )
}

export async function getServerSideProps() {
  const [leaderboard, recentPlayers, randomPlayer] = (
    await Promise.all([
      axios.get(`${NEXT_PUBLIC_API_URL}/leaderboard`, {
        params: { amount: 50 },
      }),
      // axios.get(`${NEXT_PUBLIC_API_URL}/game/recents`),
      axios.get(`${NEXT_PUBLIC_API_URL}/player/latest`),
      axios.get(`${NEXT_PUBLIC_API_URL}/player/random`),
    ])
  ).map(result => result.data)

  return { props: { leaderboard, recentPlayers, randomPlayer } }
}

export default Home
