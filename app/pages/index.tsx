import type { NextPage } from 'next'
import type { HomeLeaderboard, PlayerWithStats, RecentGame } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'

import Header from '@components/Homepage/Header'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'
import Recents from '@components/Homepage/Recents'
import HomeGrid from '@components/Layout/HomeLayout/HomeGrid'
import HomeLayout from '@components/Layout/HomeLayout/HomeLayout'
import AddGame from '@components/AddGame'
import { useState } from 'react'
import AddGameButton from '@components/Homepage/AddGameButton'

interface Props {
  leaderboard: HomeLeaderboard
  recentGames: RecentGame[]
  players: PlayerWithStats[]
}

const Home: NextPage<Props> = ({ leaderboard, recentGames, players }: Props) => {
  const [gameModalOpen, setGameModalOpen] = useState(false)
  const closeModal = () => setGameModalOpen(false)
  const openModal = () => setGameModalOpen(true)

  return (
    <HomeLayout>
      <Header />
      <HomeGrid>
        {gameModalOpen && <AddGame onClose={closeModal} players={players} />}
        <Leaderboard leaderboard={leaderboard} />
        <Queue />
        <AddGameButton onOpen={openModal} />
        <Recents recentGames={recentGames} />
      </HomeGrid>
    </HomeLayout>
  )
}

export async function getServerSideProps() {
  const [leaderboard, recentGames, players] = (
    await Promise.all([
      axios.get(`${NEXT_PUBLIC_API_URL}/leaderboard`),
      axios.get(`${NEXT_PUBLIC_API_URL}/game/recents`),
      axios.get(`${NEXT_PUBLIC_API_URL}/player/latest`),
    ])
  ).map(result => result.data)

  return { props: { leaderboard, recentGames, players } }
}

export default Home
