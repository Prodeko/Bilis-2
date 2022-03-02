import type { NextPage } from "next";
import List from '../components/List'
import TimeSeriesChart from '../components/TimeSeriesChart'
import PieChart from '../components/PieChart'

const dummyEloData = [
  400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355,
  365, 370, 364, 358, 370, 381, 391, 398, 405, 410, 402,
  413, 425, 433, 440, 437, 444, 431, 425, 437, 425, 421
]

const dummyPlayer1 = {
  name: "Aleks",
  mutualGamesWon: 14
}

const dummyPlayer2 = { 
  name: "Sakari",
  mutualGamesWon: 10
}

const Stats: NextPage = () => {
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center'>
      <h1 className="text-8xl font-bold m-8">Statistiikka</h1>
      <div className='flex flex-grow justify-between flex-wrap'>
        <TimeSeriesChart eloData={dummyEloData} chartName={"All Time Stats"} dataName={"All Time"} />
        <TimeSeriesChart eloData={dummyEloData} chartName={"All Time Stats"} dataName={"All Time"} />
        <TimeSeriesChart eloData={dummyEloData} chartName={"All Time Stats"} dataName={"All Time"} />
        <PieChart player1={dummyPlayer1} player2={dummyPlayer2} />
      </div>
    </div>
  )
}

export default Stats;
