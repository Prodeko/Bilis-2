import type { NextPage } from 'next'
import List from '../components/Utility/List'
import Leaderboard from '../components/Home/Leaderboard/Leaderboard'
import GameFlow from '../components/Home/GameFlow/GameFlow'
import { GameListItem } from '../common/types'

interface Props {
  recents: GameListItem[]
}

const Home: NextPage<Props> = ({ recents }) => {
  return (
    <div className="px-10 py-6 flex flex-col gap-12 h-screen content-center">
      <h1>Biliskilke 2.0</h1>
      <div className="grid grid-cols-2 gap-16 justify-items-center">
        <Leaderboard />
        <GameFlow recents={recents}/>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const searchUrl = `http://localhost:3000/api/games/latest`
  
  const response = await fetch(searchUrl)
  const result = (await response.json()) as GameListItem[]
  return {
    props: {recents: result}, // will be passed to the page component as props
  }
}

export default Home
