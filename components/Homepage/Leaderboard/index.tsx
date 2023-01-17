import type { Player } from '@common/types'
import Card from '@components/utility/Card'

import Table from './Table'
import TitleRow from './TitleRow'

const Leaderboard = ({ leaderboard }: { leaderboard: Player[] }) => {
  return (
    <Card colspan="1 / 2" rowspan="1 / 3">
      <TitleRow />
      <Table leaderboard={leaderboard} />
    </Card>
  )
}

export default Leaderboard
