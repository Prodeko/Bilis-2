import Card from '@components/utility/Card'
import TitleRow from './TitleRow'
import Table from './Table'
import { RecentGame } from '@common/types'
import { useState } from 'react'

const Recents = ({ recentGames: initialRecentGames }: { recentGames: RecentGame[] }) => {
  const [recentGames, setRecentGames] = useState<RecentGame[]>(initialRecentGames)
  return (
    <Card colspan="2 / 4" rowspan="2 / 3">
      <TitleRow recentGames={recentGames} setRecentGames={setRecentGames} />
      <Table recentGames={recentGames} />
    </Card>
  )
}

export default Recents
