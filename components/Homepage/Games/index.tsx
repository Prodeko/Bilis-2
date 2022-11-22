import Card from '@components/utility/Card'
import TitleRow from './TitleRow'
import Table from './Table'
import { RecentGame } from '@common/types'
import { useState } from 'react'

const Recents = ({ games: initialGames }: { games: RecentGame[] }) => {
  const [games, setGames] = useState<RecentGame[]>(initialGames)
  return (
    <Card colspan="2 / 4" rowspan="2 / 3">
      <TitleRow games={games} setGames={setGames} />
      <Table games={games} />
    </Card>
  )
}

export default Recents
