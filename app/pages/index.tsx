import type { NextPage } from 'next'
import Leaderboard from '@organisms/Leaderboard'
import { API_URL } from '../config'
import type { HomeLeaderboard } from '@common/types'

interface Props {
  leaderboard: HomeLeaderboard
}

const Home: NextPage<Props> = ({ leaderboard }: Props) => {
  return (
    <>
      <Leaderboard leaderboard={leaderboard} />
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/leaderboard`)
  const leaderboard = await res.json()
  return { props: { leaderboard } }
}

export default Home
