import type { NextPage } from 'next'
import Leaderboard from '@organisms/Leaderboard'
import { API_URL } from '../config'

interface Props {
  leaderboard: { position: number; points: number; emoji: string; name: string }[]
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
