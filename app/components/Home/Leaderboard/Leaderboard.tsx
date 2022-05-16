import type { NextPage } from 'next'
import { useState } from 'react'
import LeaderboardItem from './LeaderboardItem'
import LeaderboardButton from './LeaderboardButton'
import List from '../../Utility/List'

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
        <div className="flex flex-col gap-8 w-full">
          <h2>{allTimeSelected ? allTimeText : seasonalText} leaderboard</h2>
          <div className="flex flex-col gap-6 h-[65vh] overflow-y-auto">
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
