import type { NextPage } from "next"
import List from "../components/List"

const Home: NextPage = () => {
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center'>
      <h1>Biliskilke 2.0</h1>
      <div className='flex flex-grow justify-around p-10 gap-16'>
        <List title='All time leaderboard'/>
        <List title='All time leaderboard'/>
      </div>
    </div>
  )
}

export default Home
