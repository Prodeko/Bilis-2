import type { NextPage } from 'next'
import type { HomeLeaderboard } from '@common/types'
import { API_URL } from '../config'
import Leaderboard from '@components/Leaderboard'

interface Props {
  leaderboard: HomeLeaderboard
}

const Home: NextPage<Props> = ({ leaderboard }: Props) => {
  return <Leaderboard leaderboard={leaderboard} />
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/leaderboard`)
  const leaderboard = await res.json()
  return { props: { leaderboard } }
}

export default Home
