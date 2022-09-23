import type { NextPage } from 'next'
import type { HomeLeaderboard } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import HomeLayout from '@components/layouts/HomeLayout/HomeLayout'
import HomeGrid from '@components/layouts/HomeLayout/HomeGrid'
import Header from '@components/Homepage/Header'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'

interface Props {
  leaderboard: HomeLeaderboard
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: NextPage<Props> = ({ leaderboard }: Props) => {
  return (
    <HomeLayout>
      <Header />
      <HomeGrid>
        <Leaderboard leaderboard={leaderboard} />
        <Queue />
      </HomeGrid>
    </HomeLayout>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${NEXT_PUBLIC_API_URL}/leaderboard`)
  const leaderboard = res.data
  return { props: { leaderboard } }
}

export default Home
