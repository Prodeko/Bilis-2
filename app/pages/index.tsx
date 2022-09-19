import type { NextPage } from 'next'
import type { HomeLeaderboard } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'

interface Props {
  leaderboard: HomeLeaderboard
}

const Home: NextPage<Props> = ({ leaderboard }: Props) => {
  return <></>
}

export async function getServerSideProps() {
  const res = await axios.get(`${NEXT_PUBLIC_API_URL}/leaderboard`)
  const leaderboard = res.data
  return { props: { leaderboard } }
}

export default Home
