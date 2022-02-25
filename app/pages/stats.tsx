import type { NextPage } from "next";
import List from '../components/List'
import TimeSeriesChart from '../components/TimeSeriesChart'

const dummyData = [
  400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355,
  365, 370, 364, 358, 370, 381, 391, 398, 405, 410, 402,
  413, 425, 433, 440, 437, 444, 431, 425, 437, 425, 421
]

const Stats: NextPage = () => {
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center'>
      <h1 className="text-8xl font-bold m-8">Statistiikka</h1>
      <div>
        <List>
          <TimeSeriesChart eloData={dummyData} chartName={"All Time Stats"} dataName={"All Time"} />
        </List>
      </div>
    </div>
  )
}

export default Stats;
