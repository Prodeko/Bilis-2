import { RecentGame } from '@common/types'
import Card from '@components/utility/Card'
import { Dispatch, SetStateAction } from 'react'
import Table from './Table'
import TitleRow from './TitleRow'
interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}
const Recents = ({ games, setGames }: Props) => {
  return (
    <Card colspan="2 / 4" rowspan="2 / 3">
      <TitleRow games={games} setGames={setGames} />
      <Table games={games} setGames={setGames} />
    </Card>
  )
}

export default Recents
