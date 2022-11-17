import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'

import type { HomeLeaderboard, Player, PlayerWithStats, RecentGame } from '@common/types'
import AddGame from '@components/AddGameModal'
import AddGameButton from '@components/Homepage/AddGameButton'
import Header from '@components/Homepage/Header'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'
import Recents from '@components/Homepage/Recents'
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
  recentGames,
  recentPlayers,
  randomPlayer,
}: Props) => {
  const [gameModalOpen, setGameModalOpen] = useState(false)
  const closeModal = () => setGameModalOpen(false)
  const openModal = () => setGameModalOpen(true)

  return (
    <HomeLayout>
      <Header randomPlayer={randomPlayer} />
      <QueueProvider reducer={reducer}>
        <HomeGrid>
          {gameModalOpen && <AddGame onClose={closeModal} recentPlayers={recentPlayers} />}
          <Leaderboard leaderboard={leaderboard} />
          <Queue />
          <AddGameButton onOpen={openModal} />
          <Recents recentGames={recentGames} />
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
