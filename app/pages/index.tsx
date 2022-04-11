import type { NextPage } from 'next'
import List from '../components/Utility/List'
import Leaderboard from '../components/Home/Leaderboard/Leaderboard'
import GameFlow from '../components/Home/GameFlow/GameFlow'

const Home: NextPage = () => {
  return (
    <div className="ml-8 py-4 flex flex-col h-screen content-center">
      <h1>Biliskilke 2.0</h1>
      <div className="flex justify-around py-10 gap-20">
        <Leaderboard />
        <GameFlow />
      </div>
    </div>
  )
}

export default Home
