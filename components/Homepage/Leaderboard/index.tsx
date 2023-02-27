import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import type { GridPosition, Player } from '@common/types'
import { Card, CardGrid } from '@ui/Card'
import { Table, leaderboardColumns, prepareLeaderboardData } from '@ui/Table'
import { Title, TitleRow, Variation } from '@ui/TitleRow'

interface Props {
  leaderboard: Player[]
  gridPosition: GridPosition
}

const Leaderboard = ({ leaderboard, gridPosition }: Props) => {
  const variation: Variation = 'Leaderboard'
  const router = useRouter()

  const onClick = (id: number) => {
    return (e: MouseEvent<HTMLElement>) => {
      e.preventDefault()
      const href = `/player/${id}`
      router.push(href)
    }
  }

  return (
    <Card gridPosition={gridPosition}>
      <CardGrid>
        <TitleRow>
          <Title variation={variation} />
        </TitleRow>
        <Table
          dataRows={prepareLeaderboardData(leaderboard)}
          columns={leaderboardColumns}
          columnStartIndices={[1, 4, 10]}
          rowOnClick={onClick}
        />
      </CardGrid>
    </Card>
  )
}

export default Leaderboard
