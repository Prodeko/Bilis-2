import axios from 'axios'
import type { NextPage } from 'next'
import { KeyboardEventHandler, useState } from 'react'

import type { HomeLeaderboard, Player, PlayerWithStats, RecentGame } from '@common/types'
import AddGame from '@components/AddGameModal'
import AddGameButton from '@components/Homepage/AddGameButton'
import Header from '@components/Homepage/Header'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'
import Games from '@components/Homepage/Games'
import HomeGrid from '@components/Layout/HomeLayout/HomeGrid'
import HomeLayout from '@components/Layout/HomeLayout/HomeLayout'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { QueueProvider, reducer } from '@state/Queue'

interface Props {
  leaderboard: HomeLeaderboard
  recentGames: RecentGame[]
  recentPlayers: PlayerWithStats[]
  randomPlayer: Player
}

const Home: NextPage<Props> = ({
  leaderboard,
  recentGames: initialGames,
  recentPlayers,
  randomPlayer,
}: Props) => {
  const [games, setGames] = useState<RecentGame[]>(initialGames)
  const [gameModalOpen, setGameModalOpen] = useState(false)
  const closeModal = () => setGameModalOpen(false)
  const openModal = () => setGameModalOpen(true)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case 'Enter':
        openModal()
        break

      case 'Escape':
        closeModal()
        document?.getElementById('home-layout')?.focus() // focus on the root element so pressing enter adds a new game
        break
    }
  }

  return (
    <HomeLayout onKeyDown={handleKeyDown}>
      <Header randomPlayer={randomPlayer} />
      <QueueProvider reducer={reducer}>
        <HomeGrid>
          {gameModalOpen && (
            <AddGame onClose={closeModal} setGames={setGames} recentPlayers={recentPlayers} />
          )}
          <Leaderboard leaderboard={leaderboard} />
          <Queue />
          <AddGameButton onOpen={openModal} open={gameModalOpen} />
          <Games games={games} setGames={setGames} />
        </HomeGrid>
      </QueueProvider>
    </HomeLayout>
  )
}

export async function getServerSideProps() {
  const [leaderboard, recentGames, recentPlayers, randomPlayer] = (
    await Promise.all([
      axios.get(`${NEXT_PUBLIC_API_URL}/leaderboard`, {
        params: { amount: 50 },
      }),
      axios.get(`${NEXT_PUBLIC_API_URL}/game/recents`),
      axios.get(`${NEXT_PUBLIC_API_URL}/player/latest`),
      axios.get(`${NEXT_PUBLIC_API_URL}/player/random`),
    ])
  ).map(result => result.data)

  return { props: { leaderboard, recentGames, recentPlayers, randomPlayer } }
}

export default Home
