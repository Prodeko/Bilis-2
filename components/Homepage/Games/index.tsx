import { Dispatch, SetStateAction, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'

import { GridPosition, RecentGame } from '@common/types'
import { Button } from '@ui/Button'
import { Card, CardGrid } from '@ui/Card'
// import Table from './Table'
import { Table, gameColumns, prepareGamesData } from '@ui/Table'
import { Title, TitleRow } from '@ui/TitleRow'

import Modal from './Modal'

// import TitleRow from './TitleRow'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
  gridPosition: GridPosition
}
const Games = ({ games, setGames, gridPosition }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const closeModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  return (
    <Card gridPosition={gridPosition}>
      <CardGrid>
        <TitleRow>
          <Title variation="Games" />
          <Button
            style={{
              gridColumnStart: '11',
              gridColumnEnd: '-1',
            }}
            variation="destructive"
            text={'Remove Latest'}
            Icon={FiTrash2}
            onClick={showModal}
          />
          {modalVisible && <Modal games={games} setGames={setGames} closeModal={closeModal} />}
        </TitleRow>
        <Table
          dataRows={prepareGamesData(games)}
          columns={gameColumns}
          columnStartIndices={[1, 3, 6, 8, 11]}
          disableRowHoverEffects
        />
      </CardGrid>
    </Card>
  )
}

export default Games
