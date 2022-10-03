import Card from '@components/utility/Card'
import TitleRow from './TitleRow'
import Table from './Table'
import { RecentGame } from '@common/types'

const Recents = ({ recentGames }: { recentGames: RecentGame[] }) => {
  return (
    <Card colspan="2 / 4" rowspan="2 / 3">
      <TitleRow />
      <Table recentGames={recentGames} />
    </Card>
  )
}

export default Recents
