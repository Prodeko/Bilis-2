import { Dispatch, SetStateAction, useState } from 'react'

import { RecentGame } from '@common/types'
import Card from '@components/utility/Card'

import Table from './Table'
import TitleRow from './TitleRow'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}
const Games = ({ games, setGames }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)

  const closeModal = () => setVisible(false)
  const showModal = () => setVisible(true)

  return (
    <Card colspan="2 / 4" rowspan="2 / 3">
      <TitleRow
        games={games}
        setGames={setGames}
        visible={visible}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table games={games} setGames={setGames} visible={visible} />
    </Card>
  )
}

export default Games
