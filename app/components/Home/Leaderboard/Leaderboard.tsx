import type { NextPage } from 'next'
import LeaderboardItem from './LeaderboardItem'
import List from '../../Utility/List'

const Leaderboard: NextPage = () => {
  return (
    <List>
      <div className="box-border h-full">
        <h2 className="p-8">All time leaderboard</h2>
        <div className="h-[70vh] overflow-y-auto my-4">
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
  )
}

export default Leaderboard
