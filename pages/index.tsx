import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'

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

  return (
    <HomeLayout>
      <Header randomPlayer={randomPlayer} />
      <QueueProvider reducer={reducer}>
        <HomeGrid>
          {gameModalOpen && (
            <AddGame onClose={closeModal} setGames={setGames} recentPlayers={recentPlayers} />
          )}
          <Leaderboard leaderboard={leaderboard} />
          <Queue />
          <AddGameButton onOpen={openModal} />
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
      axios.get(`/api/game/recents`),
      axios.get(`/api/player/latest`),
      axios.get(`/api/player/random`),
    ])
  ).map(result => result.data)

  return { props: { leaderboard, recentGames, recentPlayers, randomPlayer } }
}

export default Home
