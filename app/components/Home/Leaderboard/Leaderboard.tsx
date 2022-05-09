import type { NextPage } from 'next'
import LeaderboardItem from './LeaderboardItem'
import List from '../../Utility/List'
import { useState } from 'react'

const Leaderboard: NextPage = () => {
  const [allTimeSelected, setAllTimeSelected] = useState<Boolean>(false)
  return (
    <List>
          <div className='mt-[-1.8rem] text-lg'>
            <div className='-z-10'>
              <button className='w-[10.08rem] bg-gray-200 mr-1 rounded-t'>All time</button>
              <button className='w-[10.08rem] bg-gray-200 mr-1 rounded-t'>Seasonal</button>
            </div>
            <div className='mt-[-1.65rem] z-10'>
              <button className={`w-40  mr-1 rounded-t ${allTimeSelected ? 'bg-gray-100' : 'bg-gray-200'}`}
                      onClick={() => setAllTimeSelected(true)}>
                All time
              </button>
              <button className={`w-40 mr-1 rounded-t ${!allTimeSelected ? 'bg-gray-100' : 'bg-gray-200'}`}
                      onClick={() => setAllTimeSelected(false)}>
                Seasonal
              </button>
            </div>
          </div>
          <h2 className="pt-8 px-8">{allTimeSelected ? 'All time' : 'Seasonal'} leaderboard</h2>
          <div className="overflow-y-auto mb-4 h-[70vh]">
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
          </div>
    </List>
  )
}

export default Leaderboard
