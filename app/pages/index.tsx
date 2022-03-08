import type { NextPage } from "next"
import List from "../components/Utility/List"
import Leaderboard from "../components/Home/Leaderboard"
import Queue from "../components/Home/Queue"
import WinnerSelectionBox from "../components/Home/WinnerSelectionBox"
import Recents from "../components/Home/Recents"


const Home: NextPage = () => {
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center'>
      <h1>Biliskilke 2.0</h1>
      <div className='flex justify-around p-10 gap-52'>
        <List>
          <Leaderboard />
        </List>
        <List>
          <Queue />
          <WinnerSelectionBox />
          <Recents />
        </List>
      </div>
    </div>
  )
}

export default Home
