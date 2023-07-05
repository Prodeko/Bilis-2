import { Button } from 'app/components/ui/Button'
import { Card, CardGrid, CardProps } from 'app/components/ui/Card'
import { Table, gameColumns, prepareGamesData } from 'app/components/ui/Table'
import { Title, TitleRow } from 'app/components/ui/TitleRow'
import { Dispatch, SetStateAction, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'

import { RecentGame } from '@common/types'

import Modal from './Modal'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
  cardProps: CardProps
}
const Games = ({ games, setGames, cardProps }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const closeModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  return (
    <Card {...cardProps}>
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
