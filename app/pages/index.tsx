import axios from 'axios'
import type { NextPage } from 'next'

import type { HomeLeaderboard, Player, RecentGame } from '@common/types'
import Header from '@components/Homepage/Header'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'
import Recents from '@components/Homepage/Recents'
import HomeGrid from '@components/Layout/HomeLayout/HomeGrid'
import HomeLayout from '@components/Layout/HomeLayout/HomeLayout'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import AddGame from '@components/AddGame'

interface Props {
  leaderboard: HomeLeaderboard
  recentGames: RecentGame[]
  players: Player[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: NextPage<Props> = ({ leaderboard, recentGames, players }: Props) => {
  return (
    <HomeLayout>
      <Header />
      <HomeGrid>
        <AddGame players={players} />
        <Leaderboard leaderboard={leaderboard} />
        <Queue />
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
