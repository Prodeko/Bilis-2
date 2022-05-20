import type { NextPage } from 'next'
import LeaderboardItem from './LeaderboardItem'
import LeaderboardButton from './LeaderboardButton'
import List from '../../Utility/List'
import { useState } from 'react'

const Leaderboard: NextPage = () => {
  const [allTimeSelected, setAllTimeSelected] = useState<Boolean>(false)
  const allTimeText = 'All time'
  const seasonalText = 'Seasonal'

  return (
    <div className="w-full">
      <LeaderboardButton
        setAllTimeSelected={setAllTimeSelected}
        allTimeSelected={allTimeSelected}
        allTimeText={allTimeText}
        seasonalText={seasonalText}
      />
      <List>
        <div className="flex flex-col gap-6 w-full">
          <h2>{allTimeSelected ? allTimeText : seasonalText} leaderboard</h2>
          <div className="flex flex-col gap-4 h-[calc(100vh-23rem)] overflow-y-auto">
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
        </div>
      </List>
    </div>
  )
}

export default Leaderboard
