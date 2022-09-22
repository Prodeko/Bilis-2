import Card from '@components/utility/Card'
import type { HomeLeaderboard } from '@common/types'
import TitleRow from './TitleRow'
import Table from './Table'

const Leaderboard = ({ leaderboard }: { leaderboard: HomeLeaderboard }) => {
  return (
    <Card colspan="1 / 2" rowspan="1 / 3">
      <TitleRow />
      <Table leaderboard={leaderboard} />
    </Card>
  )
}

export default Leaderboard
