import { Card, CardGrid, CardProps } from 'app/components/ui/Card'
import { Table, leaderboardColumns, prepareLeaderboardData } from 'app/components/ui/Table'
import { Title, TitleRow, Variation } from 'app/components/ui/TitleRow'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

import type { Player } from '@common/types'

interface Props {
  leaderboard: Player[]
  cardProps: CardProps
}

export const Leaderboard = ({ leaderboard, cardProps }: Props) => {
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
    <Card {...cardProps}>
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
