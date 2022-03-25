import type { NextPage } from "next"
import List from "../components/Utility/List"
import Leaderboard from "../components/Home/Leaderboard"
import Queue from "../components/Home/Queue"
import WinnerSelectionBox from "../components/Home/WinnerSelectionBox"
import Recents from "../components/Home/Recents"
import { QueueInfo } from "../common/types"
import { useState } from "react"


const Home: NextPage = () => {
  const [queue, setQueue] = useState<QueueInfo[]>([])
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center'>
      <h1>Biliskilke 2.0</h1>
      <div className='flex justify-around py-10 gap-20'>
        <List>
          <Leaderboard />
        </List>
        <List>
          <Queue queue={queue} setQueue={setQueue}/>
          <WinnerSelectionBox queue={queue} setQueue={setQueue}/>
          <Recents queue={queue} setQueue={setQueue}/>
        </List>
      </div>
    </div>
  )
}

export default Home
