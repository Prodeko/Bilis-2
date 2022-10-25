import axios from 'axios'
import type { NextPage } from 'next'

import type { HomeLeaderboard, RecentGame } from '@common/types'
import Header from '@components/Homepage/Header'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'
import Recents from '@components/Homepage/Recents'
import HomeGrid from '@components/Layout/HomeLayout/HomeGrid'
import HomeLayout from '@components/Layout/HomeLayout/HomeLayout'
import { NEXT_PUBLIC_API_URL } from '@config/index'

interface Props {
  leaderboard: HomeLeaderboard
  recentGames: RecentGame[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: NextPage<Props> = ({ leaderboard, recentGames }: Props) => {
  return (
    <HomeLayout>
      <Header />
      <HomeGrid>
        <Leaderboard leaderboard={leaderboard} />
        <Queue />
        <Recents recentGames={recentGames} />
      </HomeGrid>
    </HomeLayout>
  )
}

export async function getServerSideProps() {
  const [leaderboard, recentGames] = (
    await Promise.all([
      axios.get(`${NEXT_PUBLIC_API_URL}/leaderboard`),
      axios.get(`${NEXT_PUBLIC_API_URL}/game/recents`),
    ])
  ).map(result => result.data)

  return { props: { leaderboard, recentGames } }
}

export default Home
