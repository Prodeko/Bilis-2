import type { NextPage } from 'next'
import Leaderboard from '../components/Home/Leaderboard/Leaderboard'
import GameFlow from '../components/Home/GameFlow/GameFlow'
import { GameListItem, Player } from '../common/types'

interface Props {
  recents: GameListItem[]
  leaderboard: Player[]
}

const Home: NextPage<Props> = ({ recents, leaderboard }) => {
  console.log(leaderboard)
  return (
    <div className="px-10 py-6 flex flex-col gap-12 h-screen content-center">
      <h1>Biliskilke 2.0</h1>
      <div className="grid grid-cols-2 gap-16 justify-items-center">
        <Leaderboard leaderboard={leaderboard} />
        <GameFlow recents={recents} />
      </div>
    </div>
  )
}

const fetchLeaderboard = async () => {
  const endpoint = `http://localhost:3000/api/players/leaderboard`
  const response = await fetch(endpoint)
  const result = (await response.json()) as Player[]
  return result
}

const fetchLatestGames = async () => {
  const endpoint = `http://localhost:3000/api/games/latest`
  const response = await fetch(endpoint)
  const result = (await response.json()) as GameListItem[]
  return result
}

export async function getServerSideProps() {
  const [leaderboard, recents] = await Promise.all([fetchLeaderboard(), fetchLatestGames()])
  return {
    props: { leaderboard, recents }, // will be passed to the page component as props
  }
}

export default Home
